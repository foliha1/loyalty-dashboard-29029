import { useEffect, useState, useCallback, useRef } from 'react';
import { useIsMobile } from './use-mobile';

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const isMobile = useIsMobile();
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.pageYOffset;
      
      // Skip if scroll position hasn't changed significantly (reduces state updates)
      if (Math.abs(scrollY - lastScrollRef.current) < 2) {
        return;
      }
      
      lastScrollRef.current = scrollY;
      
      // Reduce parallax intensity on mobile for smoother performance
      const effectiveSpeed = isMobile ? speed * 0.3 : speed;
      setOffset(scrollY * effectiveSpeed);
    });
  }, [speed, isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return offset;
};
