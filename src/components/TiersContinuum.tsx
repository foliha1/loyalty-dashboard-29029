import { useState, useEffect } from "react";
import { tiers } from "@/lib/tierConfig";
import { cn } from "@/lib/utils";
import { useTier } from "@/contexts/TierContext";
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  
  // Find current and next tier - exclude Summit Circle
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
  
  // Calculate overall progress for the bar (0 to max tier threshold)
  const maxTierThreshold = visibleTiers[visibleTiers.length - 1]?.threshold || 1000;
  const overallProgressPercent = Math.min(100, (currentEP / maxTierThreshold) * 100);

  // Reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animate progress bar
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setAnimatedProgress(overallProgressPercent);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, overallProgressPercent]);

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
      <h3 className="text-section-title mb-4 sm:mb-5 md:mb-6 text-left px-2">
        Your Elevation Journey
      </h3>

      {/* Main Progress Card */}
      <div 
        className={cn(
          "card-29029 p-5 sm:p-6 md:p-8 lg:p-10 transition-all duration-700",
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Current Tier Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 sm:mb-9 md:mb-12 gap-5">
          <div>
            <div className="text-supporting uppercase tracking-[0.25em] mb-2 sm:mb-3 text-xs font-normal">Current Tier</div>
            <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight" style={{
              color: currentTier ? `hsl(var(--${currentTier.color}))` : 'hsl(var(--tier-gold))'
            }}>
              {currentTierName}
            </h4>
          </div>
          <div className="text-left md:text-right">
            <div className="text-supporting uppercase tracking-[0.25em] mb-2 sm:mb-3 text-xs font-normal">Total EPs</div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight tabular-nums">
              {animatedEP}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-7 md:mb-9">
          <div className="relative h-2 md:h-3 bg-white/10 rounded-full overflow-hidden ring-1 ring-white/10">
            <div 
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${animatedProgress}%`,
                background: `linear-gradient(to right, 
                  hsl(var(--base)) 0%, 
                  hsl(var(--base)) 20%, 
                  hsl(var(--ridge)) 45%, 
                  hsl(var(--ridge)) 55%, 
                  hsl(var(--peak)) 85%, 
                  hsl(var(--peak)) 100%)`,
                boxShadow: `0 0 16px hsl(var(--ridge) / 0.4), 0 0 32px hsl(var(--peak) / 0.2)`
              }}
            />
          </div>
          
          {/* Tier Markers - Enhanced visibility */}
          <div className="relative mt-4 sm:mt-5 md:mt-6 flex justify-between items-center px-1">
            {visibleTiers.map((tier, idx) => {
              const isCurrentTier = tier.name === currentTierName;
              const isPassed = currentEP >= tier.threshold;
              const isPeak = tier.name === "Peak";
              
              return (
                <div key={tier.name} className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full mb-2 md:mb-3 transition-all duration-500",
                      isPassed ? "scale-125" : "scale-100",
                      !isPassed && "ring-1 ring-white/20"
                    )}
                    style={{
                      backgroundColor: isPassed 
                        ? `hsl(var(--${tier.color}))` 
                        : isPeak 
                          ? 'hsl(var(--peak) / 0.3)'
                          : 'hsl(0 0% 30%)',
                      boxShadow: isCurrentTier 
                        ? `0 0 12px hsl(var(--${tier.color}) / 0.6)` 
                        : isPeak && !isPassed
                          ? `0 0 10px hsl(var(--peak) / 0.25), inset 0 0 0 1px hsl(var(--peak) / 0.4)`
                          : 'none'
                    }}
                  />
                  <div className={cn(
                    "text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider transition-colors duration-500 text-center",
                    isPassed ? "text-foreground font-semibold" : "text-white/50"
                  )}>
                    {tier.name}
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-white/40 mt-0.5 sm:mt-1 tabular-nums">
                    {tier.threshold}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Tier Info */}
        <div className="pt-5 sm:pt-6 md:pt-7 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div>
              <div className="text-supporting uppercase tracking-[0.25em] mb-2 text-xs font-normal">Next Milestone</div>
              <div className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight">
                {nextTierName}
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-supporting uppercase tracking-[0.25em] mb-2 text-xs font-normal">EPs Needed</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight tabular-nums" style={{
                color: currentTier ? `hsl(var(--${currentTier.color}))` : 'hsl(var(--tier-gold))'
              }}>
                {remainingEP}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Two-Column Accordion Layout */}
      <div className="mt-5 sm:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Tier Benefits Accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value="tier-benefits" className="border border-border/30 rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm">
            <AccordionTrigger className="px-5 md:px-6 py-5 md:py-6 hover:no-underline hover:bg-muted/10 transition-colors duration-300 [&[data-state=open]>div>svg]:rotate-180 [&>svg]:hidden">
              <div className="flex items-center gap-3 text-left w-full">
                <ChevronDown className="h-4 w-4 md:h-5 md:w-5 !text-muted-foreground transition-transform duration-300 ease-out shrink-0" />
                <span className="text-base md:text-lg lg:text-xl font-normal tracking-[0.12em] uppercase !text-foreground">
                  Tier Benefits
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 md:px-6 pb-5 md:pb-6 pt-2 !text-foreground">
              <div className="border-l-2 border-foreground/10 pl-6 md:pl-8 pr-4 py-6 bg-gradient-to-br from-muted/5 to-transparent rounded-r-lg">
                <div className="space-y-8 md:space-y-10">
                  {/* Ridge Tier */}
                  <div>
                    <h5 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-tier-gold mb-3 md:mb-4">
                      Ridge <span className="text-xs md:text-sm font-light text-muted-foreground">(500+ EPs)</span>
                    </h5>
                    <ul className="space-y-2 md:space-y-3 text-sm md:text-base !text-muted-foreground leading-relaxed">
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>Priority event registration</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>Exclusive Ridge merchandise collection</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>10% discount on apparel</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>Access to member-only content</span>
                      </li>
                    </ul>
                  </div>

                  {/* Peak Tier */}
                  <div className="pt-6 md:pt-8 border-t border-border/20">
                    <h5 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-tier-silver mb-3 md:mb-4">
                      Peak <span className="text-xs md:text-sm font-light text-muted-foreground">(1000+ EPs)</span>
                    </h5>
                    <ul className="space-y-2 md:space-y-3 text-sm md:text-base !text-muted-foreground leading-relaxed">
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>All Ridge benefits</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>VIP event experiences</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>Exclusive Peak merchandise</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>15% discount on apparel</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>Free coaching session annually</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-foreground/50 mt-1">•</span>
                        <span>Early access to new events</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* How Elevation Points Work Accordion */}
        <Accordion type="single" collapsible>
          <AccordionItem value="how-eps-work" className="border border-border/30 rounded-lg overflow-hidden bg-card/30 backdrop-blur-sm">
            <AccordionTrigger className="px-5 md:px-6 py-5 md:py-6 hover:no-underline hover:bg-muted/10 transition-colors duration-300 [&[data-state=open]>div>svg]:rotate-180 [&>svg]:hidden">
              <div className="flex items-center gap-3 text-left w-full">
                <ChevronDown className="h-4 w-4 md:h-5 md:w-5 !text-muted-foreground transition-transform duration-300 ease-out shrink-0" />
                <span className="text-base md:text-lg lg:text-xl font-normal tracking-[0.12em] uppercase !text-foreground">
                  How Elevation Points (EPs) Work
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 md:px-6 pb-5 md:pb-6 pt-2 !text-foreground">
              <div className="border-l-2 border-foreground/10 pl-6 md:pl-8 pr-4 py-6 bg-gradient-to-br from-muted/5 to-transparent rounded-r-lg">
                <div className="space-y-8 md:space-y-10">
                  {/* Earning EPs */}
                  <div>
                    <h5 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-foreground/80 mb-4 md:mb-5">
                      Earning EPs
                    </h5>
                    <div className="space-y-3 md:space-y-4 text-sm md:text-base !text-muted-foreground leading-relaxed">
                      <p>
                        <span className="font-semibold text-foreground">Events:</span> 150 EPs per event attended
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Coaching:</span> Variable EPs based on session type
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Apparel:</span> 1 EP per dollar spent
                      </p>
                    </div>
                  </div>

                  {/* Tier Thresholds */}
                  <div className="pt-6 md:pt-8 border-t border-border/20">
                    <h5 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-foreground/80 mb-4 md:mb-5">
                      Tier Thresholds
                    </h5>
                    <div className="space-y-3 md:space-y-4 text-sm md:text-base !text-muted-foreground leading-relaxed">
                      <p>
                        <span className="font-semibold text-foreground">Base:</span> 0 EPs (Starting tier)
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Ridge:</span> 500 EPs
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Peak:</span> 1,000 EPs
                      </p>
                    </div>
                  </div>

                  {/* Your Progress */}
                  <div className="pt-6 md:pt-8 border-t border-border/20">
                    <h5 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-foreground/80 mb-4 md:mb-5">
                      Your Progress
                    </h5>
                    <p className="text-sm md:text-base !text-muted-foreground leading-relaxed">
                      Your EPs accumulate over your entire member journey. Each tier unlocks new benefits 
                      and experiences as you progress through Base, Ridge, and Peak tiers.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
