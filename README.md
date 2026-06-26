# LegalSaathi (⚖️ Women's Legal Rights Chatbot)

LegalSaathi is a dark, premium, and trustworthy web application designed to empower women across India with direct, private, and plain-language access to legal guidance on constitutional and penal code safeguards.

## Architecture & Tech Stack

- **Frontend (React 18 + Vite)**: Styling via Tailwind CSS, page transitions with Framer Motion, parallax/horizontal scrolls/timelines via GSAP + ScrollTrigger, and scrolling smoothing via Lenis.
- **Backend (Python + FastAPI + LangChain RAG)**: Document loader and chunking via LangChain, retrieval indexing via `TFIDFRetriever` (scikit-learn), and conversational synthesis via `ChatGoogleGenerativeAI` (gemini-1.5-flash). Falls back to exact keyword match logic if no API keys are present.

---

## Folder Structure

```
LegalSaathi/
├── index.html                  # Main entry page with Google Fonts
├── tailwind.config.js          # Custom theme tokens & overrides
├── postcss.config.js           # PostCSS configuration
├── src/                        # React source files
│   ├── main.jsx                # Lenis setup & ticker binding
│   ├── App.jsx                 # Lazy loading routes & AnimatePresence
│   ├── index.css               # Core styling, glassmorphism, noise overlays
│   ├── api/client.js           # Axios client with offline intercepts
│   ├── hooks/                  # Custom hooks (typewriter, magnetic, scroll)
│   ├── components/             # Reusable UI elements (Navbar, Glow, etc.)
│   └── pages/                  # Pages (Home, Chat, Topics, Helplines, About)
└── backend/                    # Python FastAPI Backend
    ├── main.py                 # FastAPI server & RAG engine
    ├── requirements.txt        # Backend dependencies
    └── documents/              # Legal knowledge files (.txt sources)
```

---

## Local Setup & Development

### 1. Run the RAG Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Initialize the virtual environment:
   ```bash
   python -m venv .venv
   ```
3. Activate the virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     .venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux**:
     ```bash
     source .venv/bin/activate
     ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Create a `.env` file inside `backend/` and configure:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=8000
   ```
   *(Note: If no API key is provided, the chatbot will fallback to context-matching retrieval without AI summaries, running completely offline and free)*
6. Start the FastAPI server:
   ```bash
   python main.py
   ```
   The backend will be running at `http://localhost:8000`. You can verify status by visiting `http://localhost:8000/health`.

### 2. Run the Frontend

1. Navigate to the root directory:
   ```bash
   cd ..
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Deployment Guide

### 1. Deferring the Backend

To make the chatbot query work in production, you must deploy the `backend/` directory first to get a public URL.

- **Option A: Render (Easiest & Free Tier)**
  1. Create a free account on [Render](https://render.com/).
  2. Create a new **Web Service** and connect your GitHub repository.
  3. Set the following settings:
     - **Root Directory**: `backend`
     - **Runtime**: `Python`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
  4. Under **Environment Variables**, add:
     - `GEMINI_API_KEY` = `[your real key]`
     - `PORT` = `8000`
  5. Copy your deployed Render URL (e.g., `https://legalsaathi-backend.onrender.com`).

---

### 2. Deploying Frontend on Vercel

1. Log in to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
2. Import your GitHub repository: `https://github.com/dakshshah05/LegalSathi.git`.
3. Configure the Project Settings:
   - **Framework Preset**: Choose **Vite** (Vercel auto-detects this).
   - **Root Directory**: Keep it as the root `./` (do not choose `backend`).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `[Your deployed Backend URL from Render]` (e.g. `https://legalsaathi-backend.onrender.com`)
5. Click **Deploy**. Vercel will build the frontend assets and host the application!

---

## Accessibility & Performance Highlights

- **Prefers-Reduced-Motion**: Wraps all Framer Motion and GSAP ticker handlers in checks, dynamically falling back to simple opacity fades if the user prefers reduced motion.
- **Confidentiality**: Chat records are session-scoped and processed completely in-memory, ensuring no logs are stored.
- **Copy-to-Dial**: Helpline numbers can be copied to the clipboard with one tap, including local Toast triggers.
