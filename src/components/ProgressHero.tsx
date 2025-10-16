import { useEffect, useState } from "react";
import { getCurrentTier } from "@/lib/tierConfig";

// 2025 Activity Data (matching ActivityFeed) - 72% to Peak
const activity2025 = {
  events: { totalEP: 290 },
  apparel: { totalEP: 180 },
  coaching: { totalEP: 250 }
};

// Main progress color
const mainColor = "#5eb8ad";

export const ProgressHero = () => {
  const [mounted, setMounted] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  // Calculate totals from 2025 activity data
  const currentEP = activity2025.events.totalEP + activity2025.apparel.totalEP + activity2025.coaching.totalEP;
  const nextTierEP = 1000;
  const percentage = Math.min(100, Math.round((currentEP / nextTierEP) * 100));
  
  // Calculate percentages for breakdown
  const eventsPercent = Math.round((activity2025.events.totalEP / currentEP) * 100);
  const apparelPercent = Math.round((activity2025.apparel.totalEP / currentEP) * 100);
  const coachingPercent = Math.round((activity2025.coaching.totalEP / currentEP) * 100);
  
  const currentTierName = "Ridge";
  const nextTierName = "Peak";
  const currentTier = getCurrentTier(currentTierName);
  const nextTier = getCurrentTier(nextTierName);
  const CurrentTierIcon = currentTier?.icon;
  
  // Circle calculations - responsive sizing
  const radius = 110; // Increased for larger graph
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wider">
        Elevation Progress
      </h2>
      
      <div className="border border-border rounded-2xl p-4 md:p-8 lg:p-12 relative overflow-hidden" style={{ backgroundColor: '#343532' }}>
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: `radial-gradient(circle at top right, hsl(var(--${currentTier?.color})) 0%, transparent 60%)` }}
        />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
          {/* Circular Progress */}
          <div 
            className="relative flex-shrink-0 w-full max-w-[360px] cursor-pointer transition-transform hover:scale-105"
            onMouseEnter={() => setShowBreakdown(true)}
            onMouseLeave={() => setShowBreakdown(false)}
          >
            <svg className="transform -rotate-90 w-full h-auto" viewBox="0 0 260 260">
              {/* Background circle */}
              <circle
                cx="130"
                cy="130"
                r={radius}
                stroke="#1a1a1a"
                strokeWidth="14"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="130"
                cy="130"
                r={radius}
                stroke={mainColor}
                strokeWidth="14"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={mounted ? strokeDashoffset : circumference}
                strokeLinecap="round"
                className="transition-all duration-[2000ms] ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {!showBreakdown ? (
                <>
                  <div 
                    className="text-5xl sm:text-6xl md:text-7xl font-bold transition-all duration-300"
                    style={{ color: '#ffffff' }}
                  >
                    {percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    Complete
                  </div>
                </>
              ) : (
                <div className="text-center space-y-2 animate-fade-in px-4">
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Breakdown
                  </div>
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-muted-foreground">Events</span>
                      <span className="text-sm font-bold" style={{ color: '#ffffff' }}>{eventsPercent}%</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-muted-foreground">Apparel</span>
                      <span className="text-sm font-bold" style={{ color: '#ffffff' }}>{apparelPercent}%</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-muted-foreground">Coaching</span>
                      <span className="text-sm font-bold" style={{ color: '#ffffff' }}>{coachingPercent}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Details */}
          <div className="flex-1 space-y-4 md:space-y-6 w-full">
            <div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Current EP This Cycle
              </div>
              <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-md font-bold" style={{ backgroundColor: '#1a1a1e' }}>
                <span className="text-2xl sm:text-3xl md:text-4xl">{currentEP} EP</span>
              </div>
            </div>
            
            <div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">
                EP to Next Tier
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground/80">
                {currentEP >= nextTierEP ? "Exceeded! Ready to advance" : `${nextTierEP - currentEP} EP remaining`}
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
