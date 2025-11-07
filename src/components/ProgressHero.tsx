import { useState } from "react";
import { getCurrentTier } from "@/lib/tierConfig";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// 2025 Activity Data - 72% to Peak
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
export const ProgressHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate totals
  const currentEP = activity2025.events.totalEP + activity2025.apparel.totalEP + activity2025.coaching.totalEP;
  const nextTierEP = 1000;
  const remainingEP = nextTierEP - currentEP;
  const percentage = Math.min(100, Math.round(currentEP / nextTierEP * 100));
  const currentTierName = "Ridge";
  const nextTierName = "Peak";
  const currentTier = getCurrentTier(currentTierName);
  return <section className="mb-24 section-reveal">
      {/* Section Divider */}
      

      {/* Title */}
      <h2 className="text-section-title text-4xl md:text-5xl mb-12 font-editorial">
        Your Ascent Continues
      </h2>

      <div className="card-29029 card-hover-tier p-10 md:p-14">
        {/* Progress Bar - Larger, More Dramatic */}
        <div className="mb-16 metric-animate">
          <TooltipProvider>
            <Tooltip open={isHovered}>
              <TooltipTrigger asChild>
                <div className="cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-subhead">
                      {currentTierName}
                    </span>
                    <span className="font-editorial text-2xl font-bold text-tier-accent">
                      {percentage}%
                    </span>
                    <span className="text-subhead">
                      {nextTierName}
                    </span>
                  </div>
                  
                  <div className="h-4 bg-black rounded-full overflow-hidden">
                    <div className="h-full transition-all duration-2000" style={{
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, hsl(var(--current-tier-accent)) 0%, hsl(var(--current-tier-accent) / 0.7) 100%)',
                    boxShadow: '0 0 20px hsl(var(--current-tier-accent) / 0.4)'
                  }} />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-[#1a1a1a] border-border p-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-6">
                    <span className="text-muted-foreground">Events</span>
                    <span className="font-bold text-white">{activity2025.events.totalEP} EP</span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span className="text-muted-foreground">Apparel</span>
                    <span className="font-bold text-white">{activity2025.apparel.totalEP} EP</span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span className="text-muted-foreground">Coaching</span>
                    <span className="font-bold text-white">{activity2025.coaching.totalEP} EP</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Stats - Larger Typography, More Space */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center metric-animate-delay-1">
          <div className="flex items-center justify-center gap-2 mb-3">
              <div className="text-subhead text-center">
                Total EPs
              </div>
              <Popover>
                <PopoverTrigger>
                  <Info className="w-3.5 h-3.5 text-tier-accent hover:opacity-70 transition-opacity cursor-help" />
                </PopoverTrigger>
                <PopoverContent className="bg-[#1a1a1a] border-border max-w-[200px] text-xs">
                  <p className="text-white">
                    <strong>Elevation Points (EP)</strong> are earned through events, apparel purchases, and coaching sessions.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
            <div className="metric-large">{currentEP}</div>
            <div className="text-supporting mt-2 flex justify-center">Elevation Points</div>
          </div>

          <div className="text-center metric-animate-delay-2">
            <div className="text-subhead mb-3 text-center">
              EPs Remaining
            </div>
            <div className="metric-large">{remainingEP}</div>
            <div className="text-supporting mt-2 flex justify-center">Until {nextTierName}</div>
          </div>

          <div className="text-center metric-animate-delay-3">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="text-subhead text-center">
                Next Tier
              </div>
              <Popover>
                <PopoverTrigger>
                  <Info className="w-3.5 h-3.5 text-tier-accent hover:opacity-70 transition-opacity cursor-help" />
                </PopoverTrigger>
                <PopoverContent className="bg-[#1a1a1a] border-border max-w-[200px] text-xs">
                  <p className="text-white">
                    <strong>Cycle</strong> refers to the annual tier period. Cycles reset on January 1st each year.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
            <div className="metric-large">{nextTierName.toUpperCase()}</div>
            <div className="text-supporting mt-2 flex justify-center">Summit Awaits</div>
          </div>
        </div>
      </div>
    </section>;
};