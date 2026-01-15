import { useEffect, useState, useCallback, useRef } from 'react';
import { useIsMobile } from './use-mobile';

export const useScrollVignette = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(window.pageYOffset / totalHeight, 1) : 0;
      
      // On mobile, update less frequently (larger threshold) for smoother scrolling
      const threshold = isMobile ? 0.03 : 0.01;
      
      if (Math.abs(progress - lastProgressRef.current) < threshold) {
        return;
      }
      
      lastProgressRef.current = progress;
      setScrollProgress(progress);
    });
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return scrollProgress;
};
