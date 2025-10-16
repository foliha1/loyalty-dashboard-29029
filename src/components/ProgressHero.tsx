import { useEffect, useState } from "react";
import { getCurrentTier } from "@/lib/tierConfig";

export const ProgressHero = () => {
  const [mounted, setMounted] = useState(false);
  const currentEP = 880;
  const nextTierEP = 1000;
  const percentage = 88;
  
  const currentTierName = "Ridge";
  const nextTierName = "Peak";
  const currentTier = getCurrentTier(currentTierName);
  const nextTier = getCurrentTier(nextTierName);
  const CurrentTierIcon = currentTier?.icon;
  
  // Circle calculations - responsive sizing
  const radius = 90; // Increased for prominence
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider">
        Elevation Progress
      </h2>
      
      <div className="gradient-card border border-border rounded-2xl p-4 md:p-8 lg:p-12 relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: `radial-gradient(circle at top right, hsl(var(--${currentTier?.color})) 0%, transparent 60%)` }}
        />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
          {/* Circular Progress */}
          <div className="relative flex-shrink-0 w-full max-w-[280px]">
            <svg className="transform -rotate-90 w-full h-auto" viewBox="0 0 220 220">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: `hsl(var(--${currentTier?.color}))` }} />
                  <stop offset="50%" style={{ stopColor: `hsl(var(--${currentTier?.color}-glow))` }} />
                  <stop offset="100%" style={{ stopColor: `hsl(var(--${currentTier?.color}))` }} />
                </linearGradient>
              </defs>
              {/* Background circle */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="hsl(var(--muted))"
                strokeWidth="11"
                fill="none"
              />
              {/* Progress circle with smooth animation */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="url(#progressGradient)"
                strokeWidth="11"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={mounted ? strokeDashoffset : circumference}
                strokeLinecap="round"
                className="transition-all duration-[2000ms] ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {CurrentTierIcon && (
                <CurrentTierIcon 
                  className="w-8 h-8 md:w-10 md:h-10 mb-2" 
                  style={{ color: `hsl(var(--${currentTier?.color}))` }}
                />
              )}
              <div 
                className="text-3xl sm:text-4xl md:text-5xl font-bold"
                style={{ color: `hsl(var(--${currentTier?.color}))` }}
              >
                {percentage}%
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Complete
              </div>
            </div>
          </div>

          {/* Progress Details */}
          <div className="flex-1 space-y-4 md:space-y-6 w-full">
            <div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Current EP This Cycle
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{currentEP}</div>
            </div>
            
            <div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                EP to Next Tier
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground/80">
                {nextTierEP - currentEP} EP remaining
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Next Tier
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground flex flex-wrap items-center gap-2">
                {nextTierName}
                <span className="text-xs md:text-sm text-muted-foreground font-normal">
                  — {nextTier?.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
