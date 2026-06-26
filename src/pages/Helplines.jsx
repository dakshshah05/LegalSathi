import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Copy, Check, Info, ShieldAlert } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';

const helplinesData = [
  {
    id: 1,
    name: "Women Helpline (National)",
    number: "181",
    desc: "Provides immediate support, advice, and referrals for women facing any form of violence, abuse, or harassment across India.",
    availability: "24/7 Available",
    category: "Emergency"
  },
  {
    id: 2,
    name: "Police Response",
    number: "100",
    desc: "National emergency line to contact local police units for immediate physical protection or reporting of ongoing crimes.",
    availability: "24/7 Available",
    category: "Emergency"
  },
  {
    id: 3,
    name: "NALSA Free Legal Aid",
    number: "15100",
    desc: "National Legal Services Authority helpline. Offers free legal representation, advice, and assistance to women, children, and marginalised groups.",
    availability: "24/7 Available",
    category: "Legal Aid"
  },
  {
    id: 4,
    name: "Childline Support",
    number: "1098",
    desc: "National helpline dedicated to protection, rescue, and rehabilitation of children under 18 facing abuse or abandonment.",
    availability: "24/7 Available",
    category: "Child Protection"
  },
  {
    id: 5,
    name: "National Commission for Women (NCW)",
    number: "7827170170",
    desc: "NCW cells. Helps register complaints against domestic violence, sexual harassment, dowry demand, and other violations of women's rights.",
    availability: "24/7 Available",
    category: "Legal Aid"
  },
  {
    id: 6,
    name: "Domestic Violence Cell",
    number: "181",
    desc: "Dedicated unit under the DV Act to report physical, economic, or emotional abuse inside home and dispatch protection officers.",
    availability: "24/7 Available",
    category: "Emergency"
  },
  {
    id: 7,
    name: "iCall Counselling (TISS)",
    number: "9152987821",
    desc: "Mental health helpline run by Tata Institute of Social Sciences. Provides free telephone-based psychological counselling and emotional support.",
    availability: "Mon-Sat (10 AM - 8 PM)",
    category: "Counselling"
  },
  {
    id: 8,
    name: "One Stop Centre (Sakhi)",
    number: "181",
    desc: "A single window service providing medical aid, legal counselling, temporary shelter, and police support to women victims of violence.",
    availability: "24/7 Available",
    category: "Emergency"
  }
];

const tabs = ["All", "Emergency", "Legal Aid", "Counselling", "Child Protection"];

export default function Helplines() {
  const [activeTab, setActiveTab] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (number, id) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredHelplines = activeTab === "All"
    ? helplinesData
    : helplinesData.filter(item => item.category === activeTab);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0D0F1A] pt-32 pb-24 relative w-full">
        {/* Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#F472B6] text-xs font-semibold uppercase tracking-widest mb-3 animate-pulse"
            >
              Emergency & Legal Support
            </motion.div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F9F5FF] mb-4">
              <AnimatedText>National Helplines.</AnimatedText>
            </h1>
            <p className="text-sm sm:text-base text-[#C4B5FD] leading-relaxed">
              If you are in immediate danger, please dial the numbers below. Click any helpline number to copy it to your clipboard for quick dialing.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-white/5 pb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide uppercase cursor-pointer border transition-all ${
                  activeTab === tab
                    ? 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                    : 'glass-panel border-white/5 text-[#C4B5FD] hover:text-[#F9F5FF] hover:border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Helpline Cards Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredHelplines.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 border border-white/5 flex flex-col justify-between shadow-xl relative hover:border-[#7C3AED]/30"
                >
                  <div className="flex flex-col gap-4">
                    {/* Header: Name and Category Badge */}
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-display font-bold text-lg text-[#F9F5FF]">
                        {item.name}
                      </h3>
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
                        item.category === 'Emergency'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : item.category === 'Legal Aid'
                          ? 'bg-[#7C3AED]/10 text-[#C4B5FD] border border-[#7C3AED]/20'
                          : 'bg-[#F472B6]/10 text-[#F472B6] border border-[#F472B6]/20'
                      }`}>
                        {item.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#C4B5FD] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Number & Copy Actions */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#F472B6]">
                      <Phone size={14} className="animate-bounce" />
                      <span className="font-display text-2xl font-black tracking-wider text-[#F9F5FF]">
                        {item.number}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(item.number, item.id)}
                      className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-[#7C3AED]/30 text-[#C4B5FD] hover:text-[#F9F5FF] transition-all cursor-pointer"
                      aria-label="Copy helpline number"
                    >
                      {copiedId === item.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Availability Stamp */}
                  <div className="absolute top-2 right-2 text-[9px] text-[#6B7280]">
                    {item.availability}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Copy Toast Feedbacks */}
          <AnimatePresence>
            {copiedId && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 right-6 px-4 py-3 bg-[#7C3AED] border border-[#8B5CF6]/30 text-white text-xs font-semibold rounded-lg shadow-2xl flex items-center gap-2 z-50"
              >
                <Check size={14} /> Number copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer section */}
          <div className="mt-16 p-5 glass-panel border-l-4 border-l-[#F472B6] border-y-rgba(255,255,255,0.08) border-r-rgba(255,255,255,0.08) rounded-xl flex gap-3 text-xs sm:text-sm text-[#C4B5FD] max-w-4xl">
            <Info className="text-[#F472B6] shrink-0 mt-0.5" size={18} />
            <p className="leading-relaxed">
              <strong>Crucial Info:</strong> If you are experiencing emergency threats, physical abuse, or immediate danger, call 100 or 181 immediately. Do not rely on digital applications or messaging portals during crises.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
