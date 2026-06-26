import { useState, useRef, useEffect } from 'react';

export function useMagneticButton(pullFactor = 0.3) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Check distance from center to trigger effect
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const triggerRadius = Math.max(width, height) * 1.2;

      if (distance < triggerRadius) {
        setPosition({ x: distanceX * pullFactor, y: distanceY * pullFactor });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pullFactor]);

  return { ref, position };
}
