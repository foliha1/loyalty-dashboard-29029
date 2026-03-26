import { useState, useEffect } from "react";
import { tiers } from "@/lib/tierConfig";
import { cn } from "@/lib/utils";
import { useTier } from "@/contexts/TierContext";
import { Check, Info } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { EPsLabel } from "@/components/EPsLabel";

// 2026 Activity Data (current year)
const activity2026 = {
  events: {
    totalEP: 280
  },
  apparel: {
    totalEP: 120
  },
  coaching: {
    totalEP: 180
  }
};

const tierBenefits: Record<string, string[]> = {
  Base: [
    "Priority registration access for events",
    "Can register 1 guest doing same event prior to Day 3 (Alumni Day)",
    "2 lottery entries into lottery based events",
  ],
  Ridge: [
    "Priority registration access for events",
    "Can register up to 2 guests doing same event prior to Day 3 (Alumni Day)",
    "3 lottery entries into lottery based events",
  ],
  Peak: [
    "Early Priority registration access for events",
    "Can register up to 3 guests doing same event prior to Day 3 (Alumni Day)",
    "5 lottery entries into lottery based events",
  ],
  "The 29": [
    "Early Priority registration access for events",
    "Can register up to 4 guests doing same event prior to Day 3 (Alumni Day)",
    "Gifting priority access to the earliest registration window to one person",
    "Can gift Peak status to one person for upcoming season",
    "Access to 29029 Haus 2 or 3 nights FREE",
    "Concierge 29029 representative to personally assist with registration",
    "Guaranteed Lottery Access",
  ],
};

export const TiersContinuum = () => {
  const { currentTier: globalTier } = useTier();
  const [isRevealed, setIsRevealed] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [animatedEP, setAnimatedEP] = useState(0);
  
  // User data
  const currentEP = activity2026.events.totalEP + activity2026.apparel.totalEP + activity2026.coaching.totalEP;
  const currentTierName = "Ridge";
  
  // Find current and next tier - exclude Summit Circle
  const visibleTiers = tiers.filter(t => t.name !== "Summit Circle");
  const currentTierIndex = visibleTiers.findIndex(t => t.name === currentTierName);
  const currentTier = visibleTiers[currentTierIndex];
  const previousTier = currentTierIndex > 0 ? visibleTiers[currentTierIndex - 1] : null;
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

  const tierBenefitsContent = (
    <>
      <div className="mb-5">
        <h4 className="text-sm font-medium text-[hsl(var(--base))] uppercase tracking-wider mb-2">Base <span className="text-muted-foreground font-light">(0–399 <span style={{ textTransform: 'none' }}>EPs</span>)</span></h4>
        <ul className="space-y-1.5 text-sm text-foreground/80">
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--base))]" /><span>Priority registration access for events</span></li>
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--base))]" /><span>Can register 1 guest doing same event prior to Day 3 (Alumni Day)</span></li>
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--base))]" /><span>2 lottery entries into lottery based events</span></li>
        </ul>
      </div>
      <div className="mb-5 pt-4 border-t border-border/20">
        <h4 className="text-sm font-medium text-[hsl(var(--ridge))] uppercase tracking-wider mb-2">Ridge <span className="text-muted-foreground font-light">(400–749 <span style={{ textTransform: 'none' }}>EPs</span>)</span></h4>
        <ul className="space-y-1.5 text-sm text-foreground/80">
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--ridge))]" /><span>Priority registration access for events</span></li>
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--ridge))]" /><span>Can register up to 2 guests doing same event prior to Day 3 (Alumni Day)</span></li>
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--ridge))]" /><span>3 lottery entries into lottery based events</span></li>
        </ul>
      </div>
      <div className="pt-4 border-t border-border/20">
        <h4 className="text-sm font-medium text-[hsl(var(--peak))] uppercase tracking-wider mb-2">Peak <span className="text-muted-foreground font-light">(750+ <span style={{ textTransform: 'none' }}>EPs</span>)</span></h4>
        <ul className="space-y-1.5 text-sm text-foreground/80">
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--peak))]" /><span>Early Priority registration access for events</span></li>
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--peak))]" /><span>Can register up to 3 guests doing same event prior to Day 3 (Alumni Day)</span></li>
          <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--peak))]" /><span>5 lottery entries into lottery based events</span></li>
        </ul>
      </div>
    </>
  );

  const howEPsWorkContent = (
    <div className="space-y-6">
      <div>
        <h5 className="text-base font-semibold tracking-tight text-foreground mb-3">Earning EPs</h5>
        <p className="text-sm text-foreground/80 leading-relaxed">
          EPs are a calculation of participation and historical spend in event, apparel and coaching
        </p>
      </div>
      <div className="pt-4 border-t border-border/20">
        <h5 className="text-base font-semibold tracking-tight text-foreground mb-3">Tier Thresholds</h5>
        <div className="space-y-2.5 text-sm text-foreground/80 leading-relaxed">
          <p><span className="font-semibold text-foreground">Base:</span> 0–399 EPs</p>
          <p><span className="font-semibold text-foreground">Ridge:</span> 400–759 EPs</p>
          <p><span className="font-semibold text-foreground">Peak:</span> 750+ EPs</p>
        </div>
      </div>
    </div>
  );

  return (
    <section>
      {/* No section title — card stands alone */}

      {/* Main Progress Card */}
      <div 
        className={cn(
          "card-29029 !overflow-visible p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-700 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.7)]",
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Current Tier Badge */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-8 md:mb-12">
          <div className="flex flex-col text-center sm:text-left">
            <div className="text-subhead mb-2 sm:mb-3">Current Loyalty Tier</div>
            <h4 className="type-metric-primary" style={{
              color: currentTier ? `hsl(var(--${currentTier.color}))` : 'hsl(var(--tier-gold))'
            }}>
              {currentTierName}
            </h4>
            {/* Desktop-only link */}
            <Dialog>
              <DialogTrigger asChild>
                 <button className="hidden sm:inline-flex mt-3 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer tracking-normal sm:tracking-wide items-center gap-1.5 underline underline-offset-4 decoration-muted-foreground/40">
                   View Tier Benefits
                   <Info size={14} />
                 </button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-border/30 p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/20">
                  <DialogTitle className="text-lg font-normal tracking-[0.1em] uppercase">
                    Tier Benefits
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Complete overview of all tier benefits
                  </DialogDescription>
                </DialogHeader>
                <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
                  {tierBenefitsContent}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col text-center sm:text-right mt-4 sm:mt-0">
            <div className="text-subhead mb-2 sm:mb-3">Total <span style={{ textTransform: 'none' }}>EPs</span></div>
            <div className="type-metric-primary tabular-nums">
              {animatedEP}
            </div>
            {/* Desktop-only link */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="hidden sm:inline-flex mt-3 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer tracking-normal sm:tracking-wide items-center gap-1.5 sm:ml-auto underline underline-offset-4 decoration-muted-foreground/40">
                  How EPs Work
                  <Info size={14} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-border/30 p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/20">
                  <DialogTitle className="text-lg font-normal tracking-[0.1em] uppercase">
                    How Elevation Points (<span style={{ textTransform: 'none' }}>EPs</span>) Work
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Learn how to earn and progress through tiers
                  </DialogDescription>
                </DialogHeader>
                <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
                  {howEPsWorkContent}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {/* Mobile-only combined link row */}
          <div className="flex sm:hidden items-center justify-center gap-3 mt-4 w-full">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5 underline underline-offset-4 decoration-muted-foreground/40">
                  View Tier Benefits
                  <Info size={14} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-border/30 p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/20">
                  <DialogTitle className="text-lg font-normal tracking-[0.1em] uppercase">
                    Tier Benefits
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Complete overview of all tier benefits
                  </DialogDescription>
                </DialogHeader>
                <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
                  {tierBenefitsContent}
                </div>
              </DialogContent>
            </Dialog>
            <span className="text-muted-foreground/40">·</span>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5 underline underline-offset-4 decoration-muted-foreground/40">
                  How EPs Work
                  <Info size={14} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-border/30 p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/20">
                  <DialogTitle className="text-lg font-normal tracking-[0.1em] uppercase">
                    How Elevation Points (<span style={{ textTransform: 'none' }}>EPs</span>) Work
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Learn how to earn and progress through tiers
                  </DialogDescription>
                </DialogHeader>
                <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
                  {howEPsWorkContent}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-8 md:mb-8">
          <div className="relative h-2 md:h-3 bg-[hsl(var(--border))] rounded-full overflow-hidden ring-1 ring-[hsl(var(--border))]">
            <div 
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${animatedProgress}%`,
                background: `linear-gradient(to right, 
                  hsl(var(--${previousTier?.color || currentTier?.color || 'base'})) 0%, 
                  hsl(var(--${currentTier?.color || 'base'})) 20%, 
                  hsl(var(--${currentTier?.color || 'base'})) 82%, 
                  hsl(var(--${nextTier?.color || currentTier?.color || 'base'})) 100%)`,
                boxShadow: `0 0 12px hsl(var(--${currentTier?.color || 'base'}) / 0.25)`
              }}
            />
          </div>
          
          {/* Tier Markers - Enhanced visibility */}
          <div className="relative mt-5 sm:mt-7 md:mt-8 flex justify-between items-center px-1">
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
                      !isPassed && isPeak 
                        ? "ring-1 ring-[hsl(var(--peak)/0.6)]"
                        : !isPassed && "ring-1 ring-white/20"
                    )}
                    style={{
                      backgroundColor: isPassed 
                        ? `hsl(var(--${tier.color}))` 
                        : isPeak 
                          ? 'hsl(var(--peak) / 0.5)'
                          : 'hsl(0 0% 30%)',
                      boxShadow: isCurrentTier 
                        ? `0 0 12px hsl(var(--${tier.color}) / 0.6)` 
                        : isPeak && !isPassed
                          ? `0 0 14px hsl(var(--peak) / 0.4), inset 0 0 0 1px hsl(var(--peak) / 0.5)`
                          : 'none'
                    }}
                  />
                  <div className={cn(
                    "text-sm uppercase tracking-wider transition-colors duration-500 text-center",
                    isPassed ? "text-foreground font-semibold" : "text-muted-foreground"
                  )}>
                    {tier.name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5 sm:mt-1 tabular-nums">
                    {tier.threshold}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Tier Info */}
        <div className="pt-4 sm:pt-6 md:pt-7 border-t border-border/20">
          <div className="flex flex-row items-start justify-between">
            <div>
              <div className="text-subhead mb-2">Next Milestone</div>
              <div className="type-metric-secondary">
                {nextTierName}
              </div>
            </div>
            <div className="text-right">
              <div className="text-subhead mb-2"><span style={{ textTransform: 'none' }}>EPs</span> Needed</div>
              <div className="type-metric-secondary tabular-nums" style={{
                color: currentTier ? `hsl(var(--${currentTier.color}))` : 'hsl(var(--tier-gold))'
              }}>
                {remainingEP}
              </div>
            </div>
          </div>
        </div>

        {/* Current Tier Benefits */}
        <div className="pt-4 sm:pt-6 md:pt-7 border-t border-border/20">
          <div className="text-subhead mb-3">Current Tier Benefits</div>
          <ul className="space-y-1.5">
            {(tierBenefits[currentTierName] || tierBenefits["Base"]).map((benefit, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-muted-foreground mt-1.5 text-[6px] leading-none">●</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </section>
  );
};
