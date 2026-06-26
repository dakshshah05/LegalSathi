import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import Shared Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';

// Lazy load all pages for code-splitting
const Home = React.lazy(() => import('./pages/Home'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Topics = React.lazy(() => import('./pages/Topics'));
const TopicDetail = React.lazy(() => import('./pages/TopicDetail'));
const Helplines = React.lazy(() => import('./pages/Helplines'));
const About = React.lazy(() => import('./pages/About'));

// Page Fallback Loader
function PageLoader() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#0D0F1A] text-[#F9F5FF]">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-[#7C3AED]/20 border-t-[#7C3AED] rounded-full animate-spin" />
        <div className="w-2 h-2 bg-[#F472B6] rounded-full animate-ping" />
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C4B5FD] mt-4 animate-pulse">
        Securing Resources...
      </span>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Scroll indicator at the very top */}
      <ScrollProgress />

      {/* Global interactive cursor glowing light */}
      <CursorGlow />

      {/* Primary header bar */}
      <Navbar />

      {/* Route Switch with wait transitions */}
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topics/:slug" element={<TopicDetail />} />
              <Route path="/helplines" element={<Helplines />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Global site footer */}
      <Footer />
    </div>
  );
}
