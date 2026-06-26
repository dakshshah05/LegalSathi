import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#7C3AED] z-[1000] origin-left pointer-events-none"
      style={{ scaleX: progress }}
    />
  );
}
