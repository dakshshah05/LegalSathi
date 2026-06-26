import { motion } from 'framer-motion';

const wipeVariants = {
  initial: {
    x: "0%"
  },
  animate: {
    x: "100%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  exit: {
    x: "0%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

export default function PageTransition({ children }) {
  // Respect prefers-reduced-motion settings
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Wipe Overlay Panel */}
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen bg-[#7C3AED] z-[999] pointer-events-none"
        initial="initial"
        animate="animate"
        exit={{ x: "0%" }} // Wait, when exiting, we want to slide in from left (-100%) to center (0%)
        // So we can set initial position to -100% for exit phase. In Framer Motion, 
        // to slide in from left on exit, we can define a separate motion div that enters or just slide this one.
        // Let's use two keyframes for exit: x: ["-100%", "0%"]
        variants={{
          initial: { x: "0%" },
          animate: { x: "100%" },
          exit: { x: ["-100%", "0%"] }
        }}
        transition={{
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1]
        }}
      />
      {/* Page Content */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </div>
  );
}
