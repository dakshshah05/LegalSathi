import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Shield, Phone, Sparkles, HelpCircle, 
  ChevronUp, X, RefreshCw, AlertTriangle 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ChatBubble from '../components/ChatBubble';
import client from '../api/client';

const suggestedPrompts = [
  "Can daughters inherit equal ancestral property?",
  "What qualifies as emotional abuse under the DV Act?",
  "How does POCSO protect the child's identity?",
  "What is Section 125 CrPC maintenance?",
  "How do I access a One Stop Centre?",
  "Can I file a domestic abuse complaint online?"
];

const quickHelplines = [
  { name: "Women Helpline", phone: "181" },
  { name: "Police Emergency", phone: "100" },
  { name: "NALSA Legal Aid", phone: "15100" }
];

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-5 py-4 glass-panel border-l-4 border-l-[#F472B6] border-y-rgba(255,255,255,0.08) border-r-rgba(255,255,255,0.08) rounded-2xl rounded-tl-none w-fit self-start mb-4 shadow-md">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-[#F472B6]"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export default function Chat() {
  const [sessionId] = useState(() => {
    try {
      return crypto.randomUUID();
    } catch {
      return Math.random().toString(36).substring(2, 15);
    }
  });

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lastQuery, setLastQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm();
  const scrollRef = useRef(null);

  // Auto scroll to bottom of the messages container
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const submitQuery = async (data) => {
    const queryText = data.query?.trim();
    if (!queryText) return;

    // Reset input immediately
    reset();
    setErrorMsg(null);
    setLastQuery(queryText);
    setIsLoading(true);

    // Append user message
    setMessages(prev => [...prev, { role: 'user', content: queryText }]);

    try {
      const response = await client.post('/chat', {
        query: queryText,
        session_id: sessionId
      });
      
      // Assume server response returns a property 'response' or similar, fallback appropriately
      const reply = response.response || response.reply || response.text || "I've processed your query. Let me know if you need specific advice.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setErrorMsg(err.message || "Failed to deliver message. The server might be unreachable.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestClick = (prompt) => {
    setValue('query', prompt);
    // Auto-focus isn't strictly necessary but helpful. We can also submit directly.
    submitQuery({ query: prompt });
  };

  const handleRetry = () => {
    if (lastQuery) {
      submitQuery({ query: lastQuery });
    }
  };

  return (
    <PageTransition>
      <div className="flex h-[calc(100vh-80px)] mt-20 overflow-hidden relative w-full bg-[#0D0F1A]">
        {/* SIDEBAR (Desktop) */}
        <aside className="hidden md:flex flex-col w-80 bg-[#13152A] border-r border-white/5 p-6 justify-between overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-display font-bold text-lg text-[#F9F5FF] mb-1">
                Suggested Guide
              </h3>
              <p className="text-xs text-[#6B7280]">
                Explore related topics or quickly trigger prompts below.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {suggestedPrompts.slice(0, 4).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestClick(prompt)}
                  className="text-left text-xs bg-white/5 hover:bg-white/10 text-[#C4B5FD] hover:text-[#F9F5FF] p-3 rounded-xl border border-white/5 transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
            <h4 className="font-display font-semibold text-sm text-[#F9F5FF] flex items-center gap-2">
              <Phone size={16} className="text-[#F472B6]" />
              Quick Support
            </h4>
            <div className="flex flex-col gap-2">
              {quickHelplines.map((line, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/5 text-xs text-[#C4B5FD]">
                  <span>{line.name}:</span>
                  <span className="font-bold text-[#F472B6]">{line.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CHAT AREA */}
        <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 flex flex-col space-y-4">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
                <div className="p-4 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] mb-4">
                  <Sparkles size={32} />
                </div>
                <h2 className="font-display font-bold text-2xl text-[#F9F5FF] mb-2">
                  Welcome to LegalSaathi
                </h2>
                <p className="text-sm text-[#C4B5FD] leading-relaxed mb-8">
                  I can guide you on women's legal rights in India. Your conversations are anonymous and private. Tap any prompt to start:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestClick(prompt)}
                      className="text-left text-xs bg-white/5 hover:bg-white/10 text-[#C4B5FD] hover:text-[#F9F5FF] p-3 rounded-xl border border-white/5 transition-all cursor-pointer hover:border-[#7C3AED]/30"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto w-full flex flex-col">
                {messages.map((msg, index) => (
                  <ChatBubble key={index} role={msg.role} content={msg.content} />
                ))}

                {isLoading && <TypingIndicator />}

                {/* Graceful Connection Error State */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 glass-panel border-l-4 border-l-red-500 rounded-xl max-w-lg self-start flex gap-3 mb-4 shadow-lg text-sm text-[#F9F5FF] items-start"
                  >
                    <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                    <div className="flex flex-col gap-2">
                      <p className="leading-relaxed">{errorMsg}</p>
                      <button
                        onClick={handleRetry}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F472B6] hover:text-[#7C3AED] transition-colors cursor-pointer"
                      >
                        <RefreshCw size={12} /> Retry Send
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 md:p-6 border-t border-white/5 bg-[#0D0F1A]/80 backdrop-blur-md">
            <div className="max-w-3xl mx-auto flex items-end gap-3 bg-[#13152A] rounded-2xl border border-white/5 p-2 px-3 shadow-2xl relative">
              <form onSubmit={handleSubmit(submitQuery)} className="flex-1 flex items-end">
                <textarea
                  {...register("query")}
                  rows="1"
                  placeholder="Ask a question (e.g. Can daughters inherit ancestral property?)..."
                  className="flex-1 bg-transparent border-0 outline-none text-[#F9F5FF] placeholder-[#6B7280] text-sm py-2.5 px-2 resize-none max-h-32 min-h-[38px] leading-relaxed scrollbar-thin"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(submitQuery)();
                    }
                  }}
                />
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 mb-1"
                  aria-label="Send query"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
            
            {/* Quick Mobile Drawer Toggle */}
            <div className="md:hidden flex justify-center mt-3">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-1.5 text-xs text-[#C4B5FD] bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
              >
                <HelpCircle size={12} /> Quick Aids & Topics <ChevronUp size={12} />
              </button>
            </div>
          </div>
        </main>

        {/* MOBILE DRAWER (Slide Up) */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="md:hidden fixed inset-0 bg-[#0D0F1A] z-30"
              />
              
              {/* Drawer Container */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="md:hidden fixed bottom-0 left-0 right-0 bg-[#13152A] rounded-t-3xl border-t border-white/10 z-40 p-6 max-h-[60vh] overflow-y-auto flex flex-col gap-6 shadow-2xl"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <h3 className="font-display font-bold text-lg text-[#F9F5FF]">
                    Quick Guides & Helplines
                  </h3>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 rounded-full bg-white/5 text-[#C4B5FD] cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h4 className="text-xs uppercase font-semibold text-[#6B7280] tracking-wider mb-1">
                    Prompts to Try
                  </h4>
                  {suggestedPrompts.slice(0, 3).map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsDrawerOpen(false);
                        handleSuggestClick(prompt);
                      }}
                      className="text-left text-xs bg-white/5 p-3 rounded-xl border border-white/5 text-[#C4B5FD] cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-xs uppercase font-semibold text-[#6B7280] tracking-wider flex items-center gap-1.5">
                    <Phone size={12} className="text-[#F472B6]" />
                    Urgent Helplines
                  </h4>
                  <div className="flex flex-col gap-2">
                    {quickHelplines.map((line, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl text-xs text-[#C4B5FD]">
                        <span>{line.name}:</span>
                        <span className="font-bold text-[#F472B6]">{line.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
