import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App.jsx';
import './index.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false
});

// Update ScrollTrigger on scroll event
lenis.on('scroll', ScrollTrigger.update);

// Sync Lenis with GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Create Lenis Context
export const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LenisContext.Provider value={lenis}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LenisContext.Provider>
  </React.StrictMode>
);
