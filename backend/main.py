import os
import glob
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.retrievers import TFIDFRetriever
from langchain_openai import ChatOpenAI
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# Load environment variables
load_dotenv()

app = FastAPI(title="LegalSaathi RAG Backend", version="1.0.0")

# Enable CORS for frontend cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load legal knowledge documents
documents = []
doc_paths = glob.glob("documents/*.txt")

if not doc_paths:
    # Check if we are running from root or child directory
    doc_paths = glob.glob("backend/documents/*.txt")

for path in doc_paths:
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            filename = os.path.basename(path)
            documents.append(Document(page_content=content, metadata={"source": filename}))
    except Exception as e:
        print(f"Error loading document {path}: {e}")

# Split documents into chunks for retrieval
text_splitter = RecursiveCharacterTextSplitter(chunk_size=600, chunk_overlap=120)
chunks = text_splitter.split_documents(documents) if documents else []

# Setup TF-IDF retriever (purely in-memory, lightweight, no large downloads required)
if chunks:
    retriever = TFIDFRetriever.from_documents(chunks)
else:
    retriever = None
    print("Warning: No document chunks loaded. RAG retrieval will be disabled.")

# Configure LLM and RAG chain if OpenAI API key is present
openai_key = os.getenv("OPENAI_API_KEY", "").strip() or None
rag_chain = None

if openai_key and retriever:
    try:
        # Define LLM
        llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3, api_key=openai_key)
        
        # Define Prompt Template
        system_prompt = (
            "You are LegalSaathi, a supportive, confidential, and expert legal advisor for women in India.\n"
            "Answer the user's question clearly and comforting, based strictly on the retrieved context below. "
            "Refer to relevant section numbers, laws, and help numbers from the context when explaining.\n"
            "If the context does not contain the answer, say: 'I'm sorry, I don't have information on that specific scenario. Please consult a qualified advocate or lawyer.'\n\n"
            "Retrieved Legal Context:\n{context}"
        )
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{input}"),
        ])
        
        # Combine documents into prompt context
        question_answer_chain = create_stuff_documents_chain(llm, prompt)
        # Create retrieval chain
        rag_chain = create_retrieval_chain(retriever, question_answer_chain)
        print("Success: RAG pipeline configured with OpenAI ChatOpenAI.")
    except Exception as e:
        print(f"Error configuring OpenAI chain: {e}")

# Fallback retrieval matching function (runs offline/without API keys)
def fallback_retrieval(query: str):
    if not retriever:
        return "Legal knowledge documents are currently loading or unavailable. Please consult a legal expert."
    
    # Retrieve top 2 matches
    docs = retriever.invoke(query)
    if not docs:
        return "I'm sorry, I couldn't find matching information in our database. Please consult a lawyer for advice."
    
    response = "Based on our verified Indian legal documents, here is the relevant legal guidance:\n\n"
    for doc in docs[:2]:
        response += f"⚖️ {doc.page_content.strip()}\n\n"
    response += "*(Note: Add an OPENAI_API_KEY in the backend .env to enable conversational AI-synthesized responses)*"
    return response

# Pydantic models for type safety
class ChatRequest(BaseModel):
    query: str
    session_id: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    query_text = request.query.strip()
    if not query_text:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    try:
        if rag_chain:
            # Execute LangChain OpenAI retrieval
            result = rag_chain.invoke({"input": query_text})
            answer = result.get("answer")
        else:
            # Fallback search matching
            answer = fallback_retrieval(query_text)
            
        return {"response": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_endpoint():
    return {
        "status": "healthy",
        "openai_enabled": openai_key is not None,
        "loaded_documents_count": len(documents),
        "total_chunks": len(chunks)
    }

if __name__ == "__main__":
    import uvicorn
    # Read port from environment, defaulting to 8000
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
