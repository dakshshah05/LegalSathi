import { motion, useSpring } from 'framer-motion';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { useEffect } from 'react';

export default function MagneticButton({ children, className = '', ...props }) {
  const { ref, position } = useMagneticButton(0.3);

  // Configure springs with stiffness 150 and damping 15 as requested
  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    springX.set(position.x);
    springY.set(position.y);
  }, [position, springX, springY]);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className="inline-block cursor-pointer"
    >
      <div className={className} {...props}>
        {children}
      </div>
    </motion.div>
  );
}
