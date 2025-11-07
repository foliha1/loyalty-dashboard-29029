import { useState } from "react";
import { getCurrentTier } from "@/lib/tierConfig";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// 2025 Activity Data - 72% to Peak
const activity2025 = {
  events: { totalEP: 290 },
  apparel: { totalEP: 180 },
  coaching: { totalEP: 250 }
};

export const ProgressHero = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate totals
  const currentEP = activity2025.events.totalEP + activity2025.apparel.totalEP + activity2025.coaching.totalEP;
  const nextTierEP = 1000;
  const remainingEP = nextTierEP - currentEP;
  const percentage = Math.min(100, Math.round((currentEP / nextTierEP) * 100));
  
  const currentTierName = "Ridge";
  const nextTierName = "Peak";
  const currentTier = getCurrentTier(currentTierName);
  
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wider">
        Elevation Progress
      </h2>
      
      <div 
        className="border border-border rounded-2xl p-8 md:p-10 relative overflow-hidden card-elevated" 
        style={{ backgroundColor: '#0f0f0f' }}
      >
        <div className="space-y-8">
          {/* Progress Bar */}
          <TooltipProvider>
            <Tooltip open={isHovered}>
              <TooltipTrigger asChild>
                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="h-3 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-2000 ease-out"
                      style={{ 
                        width: `${percentage}%`,
                        background: 'linear-gradient(90deg, #DD0033 0%, #990023 100%)'
                      }}
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="bg-[#1a1a1a] border-border p-4"
              >
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

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total EPs */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Total EPs
                </div>
                <Popover>
                  <PopoverTrigger>
                    <Info className="w-3.5 h-3.5 text-[#DD0033] hover:text-[#990023] transition-colors cursor-help" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-[#1a1a1a] border-border max-w-[200px] text-xs">
                    <p className="text-white">
                      <strong>Elevation Points (EP)</strong> are earned through events, apparel purchases, and coaching sessions.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {currentEP} EP
              </div>
            </div>

            {/* EPs Remaining */}
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                EPs Remaining
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {remainingEP} EP
              </div>
            </div>

            {/* Pending EPs */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Pending EPs
                </div>
                <Popover>
                  <PopoverTrigger>
                    <Info className="w-3.5 h-3.5 text-[#DD0033] hover:text-[#990023] transition-colors cursor-help" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-[#1a1a1a] border-border max-w-[200px] text-xs">
                    <p className="text-white">
                      Pending EPs are earned but not yet credited. They will be added after event completion.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-muted-foreground">
                0 EP
              </div>
            </div>
          </div>

          {/* Next Tier Info */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Next Tier
              </div>
              <Popover>
                <PopoverTrigger>
                  <Info className="w-3.5 h-3.5 text-[#DD0033] hover:text-[#990023] transition-colors cursor-help" />
                </PopoverTrigger>
                <PopoverContent className="bg-[#1a1a1a] border-border max-w-[200px] text-xs">
                  <p className="text-white">
                    <strong>Cycle</strong> refers to the annual tier period. Cycles reset on January 1st each year.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white">
              {nextTierName}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
