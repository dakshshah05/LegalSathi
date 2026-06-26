import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        className={`max-w-[90%] md:max-w-[80%] px-5 py-3.5 shadow-xl text-sm md:text-base leading-relaxed tracking-wide ${
          isUser
            ? 'bg-[#7C3AED] text-[#F9F5FF] rounded-2xl rounded-tr-none border border-[#8B5CF6]/30'
            : 'glass-panel border-l-4 border-l-[#F472B6] border-y-[1px] border-y-white/10 border-r-[1px] border-r-white/10 text-[#F9F5FF] rounded-2xl rounded-tl-none w-full'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-line">{content}</p>
        ) : (
          <div className="text-white/95 text-sm md:text-base leading-relaxed space-y-1">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({node, ...props}) => <p className="mb-3 leading-relaxed last:mb-0" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="mb-0.5" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-[#F472B6]" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#F472B6] pl-4 italic my-3 text-[#C4B5FD] bg-white/5 py-2 pr-2 rounded-r-lg" {...props} />,
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-4 rounded-xl border border-white/10 bg-[#13152A]/50">
                    <table className="w-full border-collapse text-xs md:text-sm text-left" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-white/5 border-b border-white/10 text-[#F9F5FF] font-semibold" {...props} />,
                tbody: ({node, ...props}) => <tbody className="divide-y divide-white/5" {...props} />,
                tr: ({node, ...props}) => <tr className="hover:bg-white/5 transition-colors" {...props} />,
                th: ({node, ...props}) => <th className="px-4 py-3 font-medium border-r border-white/5 last:border-r-0" {...props} />,
                td: ({node, ...props}) => <td className="px-4 py-3 text-white/80 border-r border-white/5 last:border-r-0" {...props} />,
                code: ({node, ...props}) => <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs text-[#F472B6]" {...props} />
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}
