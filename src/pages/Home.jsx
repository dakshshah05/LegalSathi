import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  ArrowRight, Shield, BookOpen, Users, HelpCircle, 
  MessageSquare, ChevronDown, CheckCircle, Award, PhoneCall 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';
import MagneticButton from '../components/MagneticButton';
import { useTypewriter } from '../hooks/useTypewriter';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Helper Stat Counter Component
function StatCounter({ value, label, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (val) => Math.round(val).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, { duration: 2, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [isInView, value, motionVal]);

  return (
    <div ref={ref} className="glass-card p-6 flex flex-col items-center justify-center text-center">
      <motion.span className="text-3xl md:text-4xl font-display font-bold text-[#7C3AED] mb-2">
        {rounded}
      </motion.span>
      <span className="text-xs md:text-sm text-[#C4B5FD] font-medium tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

// Live Typewriter Chatbot Component
const demoPairs = [
  { q: "What is the protection available under the POCSO Act?", a: "Under POCSO, any sexual assault, abuse, or harassment against a child (under 18) is a severe, non-bailable offense. The law guarantees victim confidentiality, fast-track court procedures, and child-friendly recording environment." },
  { q: "Can I get immediate protection from domestic violence?", a: "Yes. Under the DV Act 2005, you can get protection orders, residence orders, and shelter support. Contact a Protection Officer or dial 181 for immediate legal and safety intervention." },
  { q: "Do daughters have equal property rights in India?", a: "Yes. Under the Hindu Succession (Amendment) Act 2005, daughters are coparceners by birth and have the exact same rights to ancestral property as sons, irrespective of marital status." }
];

function LiveChatDemo() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0); // 0: Q1-typing, 1: A1-typing, 2: Q2-typing, 3: A2-typing...

  const pairIndex = Math.min(Math.floor(step / 2), demoPairs.length - 1);
  const isQuestion = step % 2 === 0;
  const currentText = isQuestion ? demoPairs[pairIndex].q : demoPairs[pairIndex].a;

  // Use the typewriter hook with 25ms per char
  const { text: typingText, isFinished } = useTypewriter(currentText, 20);

  useEffect(() => {
    if (isFinished) {
      const delayTime = isQuestion ? 800 : 3500;
      const timeout = setTimeout(() => {
        // Add current typing message to history
        setMessages(prev => [
          ...prev,
          { role: isQuestion ? 'user' : 'bot', content: currentText }
        ]);
        
        // Loop back or move to next step
        if (step === demoPairs.length * 2 - 1) {
          // Finished all pairs, pause and restart
          setTimeout(() => {
            setMessages([]);
            setStep(0);
          }, 2000);
        } else {
          setStep(prev => prev + 1);
        }
      }, delayTime);

      return () => clearTimeout(timeout);
    }
  }, [isFinished, step, currentText, isQuestion]);

  return (
    <div className="glass-panel rounded-2xl border border-white/5 shadow-2xl h-[420px] flex flex-col overflow-hidden max-w-xl mx-auto w-full">
      {/* Header */}
      <div className="bg-[#13152A] px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-[#7C3AED] animate-pulse" />
        <span className="font-display font-bold text-sm tracking-wider text-[#F9F5FF]">
          LegalSaathi AI Assistant (Demo)
        </span>
      </div>
      
      {/* Body */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col justify-start">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 text-xs sm:text-sm leading-relaxed rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-[#7C3AED] text-white rounded-tr-none'
                  : 'glass-panel border-l-4 border-l-[#F472B6] text-[#C4B5FD] rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Current typing message */}
        {currentText && (
          <div className={`flex w-full ${isQuestion ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-4 py-2.5 text-xs sm:text-sm leading-relaxed rounded-2xl ${
                isQuestion
                  ? 'bg-[#7C3AED] text-white rounded-tr-none'
                  : 'glass-panel border-l-4 border-l-[#F472B6] text-[#C4B5FD] rounded-tl-none'
              }`}
            >
              {typingText}
              <span className="inline-block w-1.5 h-4 bg-white/70 ml-0.5 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subHeadlineRef = useRef(null);
  const ctaBtnRef = useRef(null);

  const horizontalSectionRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  const stepsRef = useRef(null);
  const svgLinePathRef = useRef(null);

  // Parallax Hero Section Animations (GSAP)
  useGSAP(() => {
    if (!headlineRef.current) return;

    // Headline moves slightly upward slower than scroll
    gsap.to(headlineRef.current, {
      y: "-20%",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    // Sub-headline & Buttons move slower
    gsap.to([subHeadlineRef.current, ctaBtnRef.current], {
      y: "-10%",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
  }, { scope: heroRef });

  // Horizontal Scroll Section Pin (GSAP)
  useGSAP(() => {
    const scrollEl = horizontalScrollRef.current;
    const container = horizontalSectionRef.current;
    if (!scrollEl || !container) return;

    const cards = gsap.utils.toArray('.horizontal-card');

    const pin = gsap.to(scrollEl, {
      x: () => -(scrollEl.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${scrollEl.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      }
    });

    // Staggered card scaling as they enter viewport
    cards.forEach((card) => {
      gsap.fromTo(card, 
        { scale: 0.9, opacity: 0.7 },
        { 
          scale: 1, 
          opacity: 1,
          scrollTrigger: {
            trigger: card,
            containerAnimation: pin,
            start: "left 80%",
            end: "left 40%",
            scrub: true
          }
        }
      );
    });

    return () => {
      pin.scrollTrigger?.kill();
      pin.kill();
    };
  }, { scope: horizontalSectionRef });

  // SVG Path Draw Scroll Animation (GSAP)
  useGSAP(() => {
    const path = svgLinePathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const timeline = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 40%",
        end: "bottom 70%",
        scrub: 1
      }
    });

    // Light up circles and text fade-in
    const stepNodes = gsap.utils.toArray('.step-node');
    stepNodes.forEach((node, i) => {
      gsap.fromTo(node, 
        { fill: "#13152A", stroke: "rgba(124, 58, 237, 0.2)" },
        {
          fill: "#7C3AED",
          stroke: "#F472B6",
          scrollTrigger: {
            trigger: `.step-content-${i}`,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(`.step-content-${i}`, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: `.step-content-${i}`,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, { scope: stepsRef });

  // Particle positions
  const particles = [
    { top: '15%', left: '10%', size: 40 },
    { top: '25%', left: '80%', size: 60 },
    { top: '65%', left: '5%', size: 50 },
    { top: '75%', left: '85%', size: 70 },
    { top: '45%', left: '70%', size: 30 },
  ];

  return (
    <PageTransition>
      <div className="relative overflow-hidden w-full">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* SVG Noise Texture */}
        <div className="noise-overlay" />

        {/* HERO SECTION */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12 overflow-hidden"
        >
          {/* Animated Particles */}
          {particles.map((p, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full pointer-events-none bg-gradient-to-br from-[#7C3AED]/20 to-transparent"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                filter: 'blur(4px)'
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 6 + idx * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          <div className="max-w-4xl text-center flex flex-col items-center gap-6 relative z-10">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="px-4 py-1.5 rounded-full glass-panel border border-[#7C3AED]/30 text-xs font-semibold uppercase tracking-widest text-[#C4B5FD] mb-2"
            >
              👩⚖️ India's Dedicated Women's Legal Saathi
            </motion.div>

            {/* Headline */}
            <h1 ref={headlineRef} className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F9F5FF] leading-tight">
              <AnimatedText>Know your rights. Find your voice.</AnimatedText>
            </h1>

            {/* Sub-headline */}
            <p 
              ref={subHeadlineRef}
              className="text-base sm:text-xl text-[#C4B5FD] max-w-2xl leading-relaxed font-sans font-light mt-2"
            >
              LegalSaathi gives every woman in India instant access to legal guidance — in plain language, completely private, and available 24/7.
            </p>

            {/* CTAs */}
            <div ref={ctaBtnRef} className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <MagneticButton
                onClick={() => navigate('/chat')}
                className="px-8 py-3.5 rounded-full bg-[#7C3AED] text-white font-medium tracking-wide uppercase transition-all shadow-lg hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] cursor-pointer text-sm"
              >
                Start Chatting
              </MagneticButton>
              <button
                onClick={() => {
                  const el = document.getElementById('stats-anchor');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full glass-panel hover:bg-white/5 border border-white/10 text-[#F9F5FF] font-medium tracking-wide uppercase text-sm cursor-pointer transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Animated Bounce Scroll Arrow */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => {
              const el = document.getElementById('stats-anchor');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-xs text-[#6B7280] uppercase tracking-widest font-medium">Scroll down</span>
            <ChevronDown className="text-[#7C3AED]" size={20} />
          </motion.div>
        </section>

        {/* STATS SECTION */}
        <section id="stats-anchor" className="py-24 bg-[#13152A]/40 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCounter value={10000} label="Women Helped" suffix="+" />
              <StatCounter value={4} label="Legal Domains" suffix="" />
              <StatCounter value={24} label="Hours Available" suffix="/7" />
              <StatCounter value={100} label="Completely Free" suffix="%" />
            </div>
          </div>
        </section>

        {/* HORIZONTAL SCROLL: LEGAL TOPICS */}
        <section ref={horizontalSectionRef} className="relative bg-[#0D0F1A] overflow-hidden min-h-screen">
          <div className="w-full h-screen flex flex-col justify-center">
            {/* Header Sticky Container */}
            <div className="max-w-7xl mx-auto w-full px-6 mb-12">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F9F5FF]">
                Major Legal Pillars We Support
              </h2>
              <p className="text-sm sm:text-base text-[#C4B5FD] mt-2">
                Scroll to explore critical domains of protection under Indian law.
              </p>
            </div>

            {/* Horizontal Track */}
            <div ref={horizontalScrollRef} className="flex gap-8 px-[10vw] w-[400vw] items-stretch">
              {[
                { 
                  icon: <Shield size={40} className="text-[#F472B6]" />, 
                  title: "Domestic Violence", 
                  desc: "Understand your safeguards against physical, mental, emotional, and financial abuse under the Domestic Violence Act, 2005.",
                  slug: "domestic-violence"
                },
                { 
                  icon: <BookOpen size={40} className="text-[#7C3AED]" />, 
                  title: "Child Protection (POCSO)", 
                  desc: "Learn how the law strictly protects children under 18 from sexual assault, and guarantees non-bailable trials.",
                  slug: "pocso"
                },
                { 
                  icon: <Users size={40} className="text-[#F472B6]" />, 
                  title: "Property & Ancestral Rights", 
                  desc: "Indian daughters hold absolute equal rights to inherit coparcenary ancestral property just like sons.",
                  slug: "property-rights"
                },
                { 
                  icon: <HelpCircle size={40} className="text-[#7C3AED]" />, 
                  title: "Divorce & Custody Support", 
                  desc: "Gain guidance on divorce filings, maintenance rights (Section 125 CrPC), alimony structure, and child custody norms.",
                  slug: "divorce"
                }
              ].map((topic, index) => (
                <div 
                  key={index} 
                  className="horizontal-card w-[80vw] max-w-[420px] glass-panel rounded-2xl p-8 flex flex-col justify-between border border-white/5"
                >
                  <div className="flex flex-col gap-6">
                    <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 shadow-inner">
                      {topic.icon}
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#F9F5FF]">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-[#C4B5FD] leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>

                  <Link 
                    to={`/topics/${topic.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F472B6] hover:text-[#7C3AED] transition-colors mt-8 group"
                  >
                    Explore Resources
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section ref={stepsRef} className="py-32 bg-[#13152A]/20 relative z-10 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F9F5FF]">
                How LegalSaathi Works
              </h2>
              <p className="text-sm sm:text-base text-[#C4B5FD] mt-3">
                Simple, secure steps to clarify your concerns and discover resolution pathways.
              </p>
            </div>

            {/* Layout combining SVG path and steps */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Side: SVG line animation */}
              <div className="hidden md:flex justify-center h-[500px] relative">
                <svg className="absolute w-[60px] h-full" viewBox="0 0 60 500" fill="none">
                  {/* Background Track Line */}
                  <line x1="30" y1="30" x2="30" y2="470" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  {/* Foreground Animated Drawing Line */}
                  <path
                    ref={svgLinePathRef}
                    d="M30,30 L30,470"
                    stroke="#7C3AED"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Step Circles */}
                  <circle className="step-node" cx="30" cy="30" r="10" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="4" fill="#13152A" />
                  <circle className="step-node" cx="30" cy="176" r="10" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="4" fill="#13152A" />
                  <circle className="step-node" cx="30" cy="323" r="10" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="4" fill="#13152A" />
                  <circle className="step-node" cx="30" cy="470" r="10" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="4" fill="#13152A" />
                </svg>
              </div>

              {/* Right Side: Step Contents */}
              <div className="flex flex-col gap-10 md:gap-14">
                {[
                  { title: "1. Ask your question", desc: "Type in your legal question privately. Our chatbot uses natural language matching to identify your legal context." },
                  { title: "2. AI searches legal resources", desc: "LegalSaathi parses the Indian Penal Code, POCSO rules, DV statutes, and legal FAQs instantly." },
                  { title: "3. Get clear explanations", desc: "Read a plain-language answer explaining what laws apply to your concern, without complex jargon." },
                  { title: "4. Find local helplines", desc: "Get connected with state agencies, emergency numbers, and free legal aid organisations near you." }
                ].map((step, idx) => (
                  <div key={idx} className={`step-content-${idx} flex flex-col gap-2`}>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F9F5FF]">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#C4B5FD] leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LIVE DEMO PREVIEW */}
        <section className="py-24 bg-[#13152A]/40 relative z-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F9F5FF] leading-tight">
                Try LegalSaathi,
                <br />
                Completely Privately.
              </h2>
              <p className="text-sm sm:text-base text-[#C4B5FD] leading-relaxed max-w-lg">
                Our chatbot requires no login, saves no logs of your questions, and guarantees secure, instant guidance on sensitive matters under Indian law.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <MagneticButton
                  onClick={() => navigate('/chat')}
                  className="px-8 py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-medium text-sm uppercase tracking-wide cursor-pointer transition-shadow hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                >
                  Ask Your Question
                </MagneticButton>
              </div>
            </div>

            {/* Chatbot preview visual */}
            <div className="relative">
              {/* Blur accent glow */}
              <div className="absolute inset-0 bg-[#7C3AED]/10 blur-[100px] rounded-full pointer-events-none" />
              <LiveChatDemo />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-[#0D0F1A] relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F9F5FF]">
                Trusted by Fictional Women
              </h2>
              <p className="text-sm sm:text-base text-[#C4B5FD] mt-2">
                Sharing simulated impacts to represent how women find path of rescue and security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { quote: "LegalSaathi helped me understand what counted as domestic violence. Finding out I had rights to a protection officer gave me courage to take action.", author: "Priya S.", location: "Mumbai" },
                { quote: "Our family was denying my inheritance share after my father passed. LegalSaathi explained my coparcenary rights clearly in a second.", author: "Ritu M.", location: "Delhi" },
                { quote: "I wanted to know if child abuse support keeps the reporter's name confidential. LegalSaathi explained POCSO protections with extreme clarity.", author: "Asha K.", location: "Kolkata" }
              ].map((test, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-card p-8 flex flex-col justify-between relative"
                >
                  <p className="text-sm text-[#C4B5FD] italic leading-relaxed mb-8">
                    "{test.quote}"
                  </p>
                  <div>
                    <h4 className="font-display font-bold text-[#F9F5FF] text-sm">
                      {test.author}
                    </h4>
                    <span className="text-xs text-[#6B7280]">
                      {test.location}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-24 bg-gradient-to-t from-[#13152A] to-transparent relative z-10 border-t border-white/5 flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-3xl flex flex-col items-center gap-6">
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F9F5FF]">
              Ready to Know Your Rights?
            </h2>
            <p className="text-sm sm:text-base text-[#C4B5FD] max-w-md leading-relaxed">
              Step forward safely. Ask any legal question and receive clear guidance, right this minute.
            </p>
            <div className="mt-4">
              <MagneticButton
                onClick={() => navigate('/chat')}
                className="px-10 py-4 rounded-full bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-semibold uppercase tracking-wider transition-shadow hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] cursor-pointer text-sm"
              >
                Launch Chatbot
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
