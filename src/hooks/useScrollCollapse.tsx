import { useState, useEffect, useCallback, useRef } from 'react';

export const useScrollCollapse = (threshold: number = 300) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastStateRef = useRef(false);

  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const shouldCollapse = scrollTop > threshold;
      
      // Only update state if it actually changed
      if (shouldCollapse !== lastStateRef.current) {
        lastStateRef.current = shouldCollapse;
        setIsCollapsed(shouldCollapse);
      }
    });
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return isCollapsed;
};
