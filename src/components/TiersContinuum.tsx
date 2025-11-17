import { useState, useEffect } from "react";
import { tiers } from "@/lib/tierConfig";
import { cn } from "@/lib/utils";
import { useTier } from "@/contexts/TierContext";

// 2025 Activity Data
const activity2025 = {
  events: {
    totalEP: 290
  },
  apparel: {
    totalEP: 180
  },
  coaching: {
    totalEP: 250
  }
};

export const TiersContinuum = () => {
  const { currentTier: globalTier } = useTier();
  const [isRevealed, setIsRevealed] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [animatedEP, setAnimatedEP] = useState(0);
  
  // User data
  const currentEP = activity2025.events.totalEP + activity2025.apparel.totalEP + activity2025.coaching.totalEP;
  const currentTierName = "Ridge";
  
  // Find current and next tier
  const visibleTiers = tiers.filter(t => t.name !== "Summit Circle");
  const currentTierIndex = visibleTiers.findIndex(t => t.name === currentTierName);
  const currentTier = visibleTiers[currentTierIndex];
  const nextTier = visibleTiers[currentTierIndex + 1];
  
  // Calculate progress
  const currentThreshold = currentTier?.threshold || 0;
  const nextThreshold = nextTier?.threshold || 1000;
  const tierRange = nextThreshold - currentThreshold;
  const progressInTier = currentEP - currentThreshold;
  const progressPercent = Math.min(100, (progressInTier / tierRange) * 100);
  const remainingEP = Math.max(0, nextThreshold - currentEP);
  const nextTierName = nextTier?.name || "Peak";

  // Reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animate progress bar
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progressPercent);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, progressPercent]);

  // Animate number roll-up
  useEffect(() => {
    if (isRevealed) {
      let start = 0;
      const duration = 1500;
      const increment = currentEP / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= currentEP) {
          setAnimatedEP(currentEP);
          clearInterval(timer);
        } else {
          setAnimatedEP(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isRevealed, currentEP]);

  return (
    <section>
      <div className="divider-red mb-16 md:mb-20" />
      
      <h3 className="text-section-title mb-12 md:mb-16 text-left px-2">
        Your Elevation Journey
      </h3>

      {/* Main Progress Card */}
      <div 
        className={cn(
          "card-29029 p-8 md:p-12 lg:p-16 transition-all duration-700",
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Current Tier Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 md:mb-12 gap-6">
          <div>
            <div className="text-supporting uppercase tracking-widest mb-2 text-xs">Current Tier</div>
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{
              color: currentTier ? `hsl(var(--${currentTier.color}))` : 'hsl(var(--tier-gold))'
            }}>
              {currentTierName}
            </h4>
          </div>
          <div className="text-left md:text-right">
            <div className="text-supporting uppercase tracking-widest mb-2 text-xs">Total Points</div>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight tabular-nums">
              {animatedEP}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 md:mb-12">
          <div className="relative h-2 md:h-3 bg-muted/20 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${animatedProgress}%`,
                background: currentTier 
                  ? `linear-gradient(90deg, hsl(var(--${currentTier.color})) 0%, hsl(var(--${currentTier.color})) 100%)`
                  : 'hsl(var(--tier-gold))',
                boxShadow: currentTier 
                  ? `0 0 20px hsl(var(--${currentTier.color}) / 0.4)`
                  : '0 0 20px hsl(var(--tier-gold) / 0.4)'
              }}
            />
          </div>
          
          {/* Tier Markers - Minimal */}
          <div className="relative mt-6 md:mt-8 flex justify-between items-center">
            {visibleTiers.map((tier, idx) => {
              const isCurrentTier = tier.name === currentTierName;
              const isPassed = currentEP >= tier.threshold;
              
              return (
                <div key={tier.name} className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mb-2 md:mb-3 transition-all duration-500",
                      isPassed ? "scale-125" : "scale-100"
                    )}
                    style={{
                      backgroundColor: isPassed 
                        ? `hsl(var(--${tier.color}))` 
                        : 'hsl(var(--muted))',
                      boxShadow: isCurrentTier 
                        ? `0 0 12px hsl(var(--${tier.color}) / 0.6)` 
                        : 'none'
                    }}
                  />
                  <div className={cn(
                    "text-[10px] md:text-xs uppercase tracking-wider transition-colors duration-500 text-center",
                    isPassed ? "text-foreground font-semibold" : "text-muted-foreground"
                  )}>
                    {tier.name}
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground mt-1 tabular-nums">
                    {tier.threshold}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Tier Info */}
        <div className="pt-6 md:pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-supporting uppercase tracking-widest mb-1 text-xs">Next Milestone</div>
              <div className="text-xl md:text-2xl font-semibold tracking-tight">
                {nextTierName}
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-supporting uppercase tracking-widest mb-1 text-xs">Points Needed</div>
              <div className="text-2xl md:text-3xl font-bold tracking-tight tabular-nums" style={{
                color: nextTier ? `hsl(var(--${nextTier.color}))` : 'hsl(var(--foreground))'
              }}>
                {remainingEP}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-12 md:mt-16 flex justify-start px-2">
        <div className="flex flex-col gap-3 md:gap-4 text-sm">
          <a 
            href="#tier-benefits" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide uppercase text-xs font-medium hover:translate-x-1 inline-block"
          >
            Tier Benefits
          </a>
          <div className="h-px w-10 md:w-12 bg-border/30" />
          <a 
            href="#how-ep-works" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide uppercase text-xs font-medium hover:translate-x-1 inline-block"
          >
            How Elevation Points Work
          </a>
          <div className="h-px w-10 md:w-12 bg-border/30" />
          <a 
            href="#activity-feed" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide uppercase text-xs font-medium hover:translate-x-1 inline-block"
          >
            Your History
          </a>
        </div>
      </nav>
    </section>
  );
};
