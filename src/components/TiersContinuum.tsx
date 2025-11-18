import { useState, useEffect } from "react";
import { tiers } from "@/lib/tierConfig";
import { cn } from "@/lib/utils";
import { useTier } from "@/contexts/TierContext";
import { ChevronRight } from "lucide-react";

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
      <h3 className="text-section-title mb-10 md:mb-14 text-left px-2">
        Your Elevation Journey
      </h3>

      {/* Main Progress Card */}
      <div 
        className={cn(
          "card-29029 p-8 md:p-10 lg:p-12 transition-all duration-700",
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Current Tier Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="text-supporting uppercase tracking-[0.25em] mb-3 text-xs font-light">Current Tier</div>
            <h4 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight" style={{
              color: currentTier ? `hsl(var(--${currentTier.color}))` : 'hsl(var(--tier-gold))'
            }}>
              {currentTierName}
            </h4>
          </div>
          <div className="text-left md:text-right">
            <div className="text-supporting uppercase tracking-[0.25em] mb-3 text-xs font-light">Total EPs</div>
            <div className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight tabular-nums">
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
        <div className="pt-8 md:pt-10 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-supporting uppercase tracking-[0.25em] mb-2 text-xs font-light">Next Milestone</div>
              <div className="text-2xl md:text-3xl font-light tracking-tight">
                {nextTierName}
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-supporting uppercase tracking-[0.25em] mb-2 text-xs font-light">EPs Needed</div>
              <div className="text-3xl md:text-4xl font-light tracking-tight tabular-nums" style={{
                color: nextTier ? `hsl(var(--${nextTier.color}))` : 'hsl(var(--foreground))'
              }}>
                {remainingEP}
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Navigation Links */}
        <nav className="pt-8 md:pt-10 border-t border-border/20 mt-8 md:mt-10">
          <div className="text-supporting uppercase tracking-[0.25em] mb-5 text-xs font-light">
            Learn More
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12">
            <button 
            onClick={() => {
              const modal = document.getElementById('tier-benefits-modal');
              if (modal) modal.style.display = 'flex';
            }}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-500 tracking-[0.12em] uppercase text-[11px] font-light"
          >
              <ChevronRight className="w-3 h-3 text-tier-accent/60 group-hover:text-tier-accent group-hover:translate-x-0.5 transition-all duration-500" />
              <span className="relative">
                Tier Benefits
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-tier-accent/50 group-hover:w-full transition-all duration-500" />
              </span>
            </button>
            
            <button 
            onClick={() => {
              const modal = document.getElementById('ep-modal');
              if (modal) modal.style.display = 'flex';
            }}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-500 tracking-[0.12em] uppercase text-[11px] font-light"
          >
              <ChevronRight className="w-3 h-3 text-tier-accent/60 group-hover:text-tier-accent group-hover:translate-x-0.5 transition-all duration-500" />
              <span className="relative">
                How Elevation Points Work
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-tier-accent/50 group-hover:w-full transition-all duration-500" />
              </span>
            </button>
            
            <a 
            href="#activity-feed" 
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('activity-feed');
              section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-500 tracking-[0.12em] uppercase text-[11px] font-light"
          >
              <ChevronRight className="w-3 h-3 text-tier-accent/60 group-hover:text-tier-accent group-hover:translate-x-0.5 transition-all duration-500" />
              <span className="relative">
                Your History
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-tier-accent/50 group-hover:w-full transition-all duration-500" />
              </span>
            </a>
          </div>
        </nav>
      </div>

      {/* Tier Benefits Modal - Full Screen */}
      <div 
        id="tier-benefits-modal" 
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] items-center justify-center" 
        style={{display: 'none'}} 
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.style.display = 'none'; }}
      >
        <div className="card-29029 w-full h-full p-6 md:p-12 lg:p-16 overflow-y-auto">
          <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-10">Tier Benefits</h3>
          
          <div className="space-y-8 mb-12">
            <div className="pb-8 border-b border-border/30">
              <div className="text-base text-tier-accent mb-2 uppercase tracking-wider">Ridge (500+ EPs)</div>
              <ul className="space-y-2 text-supporting">
                <li>• Priority event registration</li>
                <li>• Exclusive Ridge merchandise collection</li>
                <li>• 10% discount on apparel</li>
                <li>• Access to member-only content</li>
              </ul>
            </div>
            
            <div className="pb-8 border-b border-border/30">
              <div className="text-peak text-tier-accent mb-2 uppercase tracking-wider">Peak (1000+ EPs)</div>
              <ul className="space-y-2 text-supporting">
                <li>• All Ridge benefits</li>
                <li>• VIP event experiences</li>
                <li>• Exclusive Peak merchandise</li>
                <li>• 15% discount on apparel</li>
                <li>• Free coaching session annually</li>
                <li>• Early access to new events</li>
              </ul>
            </div>
            
            <div>
              <div className="text-summit text-tier-accent mb-2 uppercase tracking-wider">Summit Circle (Invitation Only)</div>
              <ul className="space-y-2 text-supporting">
                <li>• All Peak benefits</li>
                <li>• Exclusive Summit Circle events</li>
                <li>• Private community access</li>
                <li>• Complimentary coaching sessions</li>
                <li>• 20% discount on all apparel</li>
                <li>• Direct access to 29029 leadership</li>
              </ul>
            </div>
          </div>
          
          <button 
            onClick={() => { 
              const modal = document.getElementById('tier-benefits-modal'); 
              if (modal) modal.style.display = 'none'; 
            }}
            className="w-full px-6 py-4 bg-tier-accent/10 border border-tier-accent/30 rounded-lg hover:bg-tier-accent/20 transition-colors text-lg"
          >
            Close
          </button>
        </div>
      </div>

      {/* How EP Works Modal - Full Screen */}
      <div 
        id="ep-modal" 
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] items-center justify-center" 
        style={{display: 'none'}} 
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.style.display = 'none'; }}
      >
        <div className="card-29029 w-full h-full p-6 md:p-12 lg:p-16 overflow-y-auto">
          <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-10">How Elevation Points Work</h3>
          
          <div className="space-y-8 mb-12">
            <div>
              <h4 className="text-xl text-tier-accent mb-4 uppercase tracking-wider">Earning EPs</h4>
              <div className="space-y-3 text-supporting">
                <p>• <span className="text-foreground">Events:</span> 150 EPs per event attended</p>
                <p>• <span className="text-foreground">Coaching:</span> Variable EPs based on session type</p>
                <p>• <span className="text-foreground">Apparel:</span> 1 EP per dollar spent</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl text-tier-accent mb-4 uppercase tracking-wider">Tier Thresholds</h4>
              <div className="space-y-3 text-supporting">
                <p>• <span className="text-foreground">Base:</span> 0 EPs (Starting tier)</p>
                <p>• <span className="text-foreground">Ridge:</span> 500 EPs</p>
                <p>• <span className="text-foreground">Peak:</span> 1,000 EPs</p>
                <p>• <span className="text-foreground">Summit Circle:</span> Invitation only</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl text-tier-accent mb-4 uppercase tracking-wider">Your Progress</h4>
              <p className="text-supporting">
                Your EPs accumulate over your entire member journey. Each tier unlocks new benefits 
                and experiences, building toward the ultimate Summit Circle invitation.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => { 
              const modal = document.getElementById('ep-modal'); 
              if (modal) modal.style.display = 'none'; 
            }}
            className="w-full px-6 py-4 bg-tier-accent/10 border border-tier-accent/30 rounded-lg hover:bg-tier-accent/20 transition-colors text-lg"
          >
            Close
          </button>
        </div>
      </div>
    </section>
  );
};
