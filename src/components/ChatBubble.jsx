import { motion } from 'framer-motion';

export default function ChatBubble({ role, content }) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] px-5 py-3.5 shadow-xl text-sm md:text-base leading-relaxed tracking-wide ${
          isUser
            ? 'bg-[#7C3AED] text-[#F9F5FF] rounded-2xl rounded-tr-none border border-[#8B5CF6]/30'
            : 'glass-panel border-l-4 border-l-[#F472B6] border-y-rgba(255,255,255,0.08) border-r-rgba(255,255,255,0.08) text-[#F9F5FF] rounded-2xl rounded-tl-none'
        }`}
      >
        <p className="whitespace-pre-line">{content}</p>
      </div>
    </motion.div>
  );
}
