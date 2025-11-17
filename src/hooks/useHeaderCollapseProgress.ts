import { useEffect, useState } from "react";

export const useHeaderCollapseProgress = (distance = 300) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const raw = Math.min(Math.max(y / distance, 0), 1);
        const eased = 1 - Math.pow(1 - raw, 3); // easeOutCubic
        setProgress(eased);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [distance]);

  const isCollapsed = progress >= 0.98;
  return { progress, isCollapsed };
};
