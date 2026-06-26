import { motion } from 'framer-motion';
import { Shield, BookOpen, AlertCircle, HelpCircle, Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0D0F1A] pt-32 pb-24 relative w-full">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Mission Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#F472B6] text-xs font-semibold uppercase tracking-widest mb-4"
            >
              Our Mission
            </motion.div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F9F5FF] leading-relaxed max-w-4xl mx-auto">
              <AnimatedText>Empowering every woman in India with clear, immediate, and private access to her legal rights.</AnimatedText>
            </h1>
          </div>

          {/* Problem & Solution Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            {/* The Problem */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 shadow-xl flex flex-col gap-5">
              <h3 className="font-display font-bold text-2xl text-red-400 flex items-center gap-2">
                <AlertCircle size={22} />
                The Problem
              </h3>
              <p className="text-sm sm:text-base text-[#C4B5FD] leading-relaxed font-light">
                Indian legal literature is dense, filled with complex jargon, and difficult to parse. Many women facing threats, inheritance bias, or domestic abuse do not know their baseline statutory rights, nor do they have a private, secure, and pressure-free channel to search for them.
              </p>
            </div>

            {/* The Solution */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 shadow-xl flex flex-col gap-5">
              <h3 className="font-display font-bold text-2xl text-green-400 flex items-center gap-2">
                <Shield size={22} />
                The Solution
              </h3>
              <p className="text-sm sm:text-base text-[#C4B5FD] leading-relaxed font-light">
                LegalSaathi acts as a confidential digital companion. It translates complex legal provisions (like the Protection of Women from Domestic Violence Act, the Hindu Succession Act, and POCSO) into plain language answers, matching queries without saving data or tracking IP details.
              </p>
            </div>
          </section>

          {/* How It Works (Brief version) */}
          <section className="mb-24 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F9F5FF] mb-12">
              Workflow Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { title: "1. Query Private", desc: "User inputs a specific concern completely anonymously, without registration." },
                { title: "2. Legal Parsing", desc: "Our engine maps the concern against established Indian laws and statutes." },
                { title: "3. Direct Guide", desc: "User receives legal options and a list of local rescue/legal aid organizations." }
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-6 border border-white/5 flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-[#7C3AED]/10 text-[#C4B5FD] flex items-center justify-center font-bold text-sm mb-4 border border-[#7C3AED]/20">
                    {idx + 1}
                  </span>
                  <h4 className="font-display font-bold text-[#F9F5FF] text-base mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#C4B5FD] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimer Box */}
          <section className="p-6 glass-panel border-l-4 border-l-[#F472B6] border-y-rgba(255,255,255,0.08) border-r-rgba(255,255,255,0.08) rounded-xl flex gap-4 text-xs sm:text-sm text-[#C4B5FD] mb-16 shadow-2xl">
            <AlertCircle className="text-[#F472B6] shrink-0 mt-0.5" size={20} />
            <div className="flex flex-col gap-2">
              <strong className="text-[#F9F5FF] font-semibold">Important Legal Disclaimer</strong>
              <p className="leading-relaxed">
                LegalSaathi is a guide providing general information regarding the Indian Penal Code and women-oriented laws. It does not provide formal legal advice, and its outputs do not establish an attorney-client relationship. Please consult a qualified advocate or lawyer to handle your specific case or represent you in legal proceedings.
              </p>
            </div>
          </section>

          {/* Contributor Section */}
          <footer className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#6B7280]">
            <div className="flex items-center gap-1.5">
              <span>Made with</span>
              <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
              <span>for women across India.</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#F9F5FF] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg> GitHub Repository
              </a>
            </div>
          </footer>

        </div>
      </div>
    </PageTransition>
  );
}
