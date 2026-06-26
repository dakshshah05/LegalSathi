import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, Users, HelpCircle, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';

function TiltCard({ icon, title, desc, slug }) {
  const cardRef = useRef(null);
  
  // Motion values for tilt degrees
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Coordinates for the radial shine overlay
  const shineX = useMotionValue(0);
  const shineY = useMotionValue(0);
  const [showShine, setShowShine] = useState(false);

  // Springs for smooth snapping
  const springConfig = { damping: 20, stiffness: 150 };
  const rX = useSpring(rotateX, springConfig);
  const rY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Cursor position relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Calculate degree shifts (limit to max ±12deg)
    const degX = -(y / (height / 2)) * 12; 
    const degY = (x / (width / 2)) * 12;

    rotateX.set(degX);
    rotateY.set(degY);

    // Calculate percentage coords for shine center
    const px = ((e.clientX - rect.left) / width) * 100;
    const py = ((e.clientY - rect.top) / height) * 100;
    shineX.set(px);
    shineY.set(py);
  };

  const handleMouseEnter = () => setShowShine(true);
  const handleMouseLeave = () => {
    setShowShine(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: rX,
        rotateY: rY,
        perspective: 1000
      }}
      className="glass-card relative p-8 flex flex-col justify-between border border-white/5 overflow-hidden h-[320px] transition-glow hover:border-[#7C3AED]/40 cursor-pointer shadow-2xl"
    >
      {/* Dynamic Shine Overlay */}
      {showShine && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background: `radial-gradient(circle 200px at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`
          }}
        />
      )}

      {/* Inner Elements with Z-Translate to lift off background */}
      <div style={{ transform: 'translateZ(40px)' }} className="flex flex-col gap-5">
        <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 text-[#7C3AED]">
          {icon}
        </div>
        <h3 className="font-display font-bold text-2xl text-[#F9F5FF]">
          {title}
        </h3>
        <p className="text-sm text-[#C4B5FD] leading-relaxed">
          {desc}
        </p>
      </div>

      <div style={{ transform: 'translateZ(20px)' }} className="mt-8">
        <Link
          to={`/topics/${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F472B6] hover:text-[#7C3AED] transition-colors group"
        >
          Explore Resources
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Topics() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0D0F1A] pt-32 pb-24 relative w-full">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#F472B6] text-xs font-semibold uppercase tracking-widest mb-3"
            >
              Resources & Rights
            </motion.div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F9F5FF] mb-4">
              <AnimatedText>Legal Guides for Every Woman.</AnimatedText>
            </h1>
            <p className="text-sm sm:text-base text-[#C4B5FD] leading-relaxed">
              Explore primary legislation, legal guides, protective pathways, and child/family rights under the Indian legal system. Learn what actions you can legally take.
            </p>
          </div>

          {/* Grid Layout (2x2 Desktop, 1 Column Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TiltCard
              icon={<Shield size={32} className="text-[#F472B6]" />}
              title="Domestic Violence"
              desc="Safeguards against physical, emotional, sexual, and economic abuse under the DV Act, 2005. Understand protection officers and magistrate orders."
              slug="domestic-violence"
            />
            <TiltCard
              icon={<BookOpen size={32} className="text-[#7C3AED]" />}
              title="Child Protection (POCSO)"
              desc="Comprehensive child safeguards for minors under 18 against sexual offenses. Includes legal proceedings and victim anonymity laws."
              slug="pocso"
            />
            <TiltCard
              icon={<Users size={32} className="text-[#F472B6]" />}
              title="Property & Inheritances"
              desc="Deep dive into the Hindu Succession (Amendment) Act, 2005. Understand ancestral coparcenary rights for daughters and mothers."
              slug="property-rights"
            />
            <TiltCard
              icon={<HelpCircle size={32} className="text-[#7C3AED]" />}
              title="Divorce & Maintenance"
              desc="Detailed guide on filing for divorce, securing alimony support, custody rights, and quick details on Section 125 CrPC maintenance claims."
              slug="divorce"
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
