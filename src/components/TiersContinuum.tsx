import { useState, useEffect } from "react";
import { tiers } from "@/lib/tierConfig";
import { 
  ShoppingBag, 
  Users, 
  Calendar, 
  Star, 
  Tag, 
  Mail, 
  Trophy,
  Crown,
  Headphones,
  Gift,
  Zap,
  Award,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Reward {
  icon: any;
  title: string;
  description: string;
}

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

const tierRewards: Record<string, Reward[]> = {
  "Base": [
    { icon: ShoppingBag, title: "Access to Community Store", description: "Shop exclusive 29029 gear and apparel" },
    { icon: Users, title: "Community Forum Access", description: "Connect with fellow climbers" },
    { icon: Calendar, title: "Event Announcements", description: "Early event information" },
  ],
  "Ridge": [
    { icon: Star, title: "Priority Registration", description: "Register before general public" },
    { icon: Tag, title: "10% Member Discount", description: "On all events and merchandise" },
    { icon: Mail, title: "Monthly Newsletter", description: "Exclusive content and updates" },
    { icon: Trophy, title: "Ridge Member Badge", description: "Display your achievement" },
  ],
  "Peak": [
    { icon: Crown, title: "Private Climb Invitations", description: "Exclusive summit experiences" },
    { icon: Headphones, title: "Concierge Access", description: "Personalized event support" },
    { icon: Gift, title: "15% Elite Discount", description: "Premium savings on all purchases" },
    { icon: Zap, title: "First Access to New Events", description: "Before all other members" },
    { icon: Award, title: "Peak Member Recognition", description: "VIP status and perks" },
  ],
};

export const TiersContinuum = () => {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  const visibleTiers = tiers.filter(t => t.name !== "Summit Circle");
  const currentTierName = "Ridge"; // This should come from user data
  const currentEP = activity2025.events.totalEP + activity2025.apparel.totalEP + activity2025.coaching.totalEP;
  const nextTierEP = 1000;
  const remainingEP = nextTierEP - currentEP;
  const nextTierName = "Peak";
  
  const maxThreshold = 1000; // Peak threshold
  
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isRevealed) {
      const targetProgress = getProgressPosition();
      const duration = 1500; // 1.5 seconds
      const steps = 60;
      const increment = targetProgress / steps;
      const stepTime = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setAnimatedProgress(Math.min(increment * currentStep, targetProgress));
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepTime);
      
      return () => clearInterval(interval);
    }
  }, [isRevealed, currentEP, maxThreshold]);
  
  const getMarkerPosition = (threshold: number) => {
    if (threshold === 0) return 8;
    if (threshold === 500) return 50;
    if (threshold === 1000) return 92;
    return 50;
  };
  
  // Calculate exact progress position to align with tier markers
  const getProgressPosition = () => {
    // Find which tier range we're in
    let lowerTier = visibleTiers[0];
    let upperTierThreshold = visibleTiers[1]?.threshold || maxThreshold;
    
    for (let i = 0; i < visibleTiers.length; i++) {
      if (currentEP >= visibleTiers[i].threshold) {
        lowerTier = visibleTiers[i];
        upperTierThreshold = visibleTiers[i + 1]?.threshold || maxThreshold;
      }
    }
    
    // Calculate progress within this tier range
    const tierProgress = (currentEP - lowerTier.threshold) / (upperTierThreshold - lowerTier.threshold);
    const lowerPos = getMarkerPosition(lowerTier.threshold);
    const upperPos = getMarkerPosition(upperTierThreshold);
    
    return lowerPos + (upperPos - lowerPos) * tierProgress;
  };

  const getEPNeeded = (tier: typeof visibleTiers[0]) => {
    const needed = tier.threshold - currentEP;
    return needed > 0 ? needed : 0;
  };

  const handleMouseEnter = (tierName: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredTier(tierName);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setHoveredTier(null);
    }, 150);
    setHoverTimeout(timeout);
  };
  
  return (
    <section className="mb-24 section-reveal">
      <div className="divider-red mb-12" />
      
      <h2 className="text-section-title text-4xl md:text-5xl mb-16 font-editorial">
        Your Elevation Journey
      </h2>
      
      {/* Simplified Tier Bar */}
      <div className="relative">
        {/* Simple Background Bar - Gray */}
        <div 
          className={cn(
            "relative h-24 rounded-full overflow-visible transition-opacity duration-700",
            isRevealed ? "opacity-100" : "opacity-80"
          )}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: '#000000',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)'
            }}
          />
          
          {/* Progress Fill - Gradient from light gray to teal */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-1000"
            style={{
              width: `${animatedProgress}%`,
              background: 'linear-gradient(90deg, #D9D9D9 0%, #D9D9D9 30%, #CC9933 70%, #CC9933 100%)',
              boxShadow: '0 2px 12px rgba(204, 153, 51, 0.3)',
              transition: 'width 0.05s linear'
            }}
          />
          
          {/* Tier Markers */}
          <div className="absolute inset-0 flex items-center">
            {visibleTiers.map((tier) => {
              const Icon = tier.icon;
              const isCurrent = tier.name === currentTierName;
              const position = getMarkerPosition(tier.threshold);
              const epNeeded = getEPNeeded(tier);
              
              return (
                <div
                  key={tier.name}
                  className={cn(
                    "absolute group transition-all duration-300",
                    isRevealed && "animate-fade-in"
                  )}
                  style={{ 
                    left: `${position}%`, 
                    transform: 'translateX(-50%)',
                    animationDelay: `${visibleTiers.indexOf(tier) * 120}ms`,
                    opacity: isRevealed ? 1 : 0
                  }}
                >
                  {/* Expanded hover zone for stable interaction */}
                  <div
                    className="absolute inset-0 -inset-x-12 -inset-y-12 cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(tier.name)}
                    onMouseLeave={handleMouseLeave}
                  />
                  
                  {/* Current Tier Pulse */}
                  {isCurrent && (
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(221, 0, 51, 0.4) 0%, transparent 70%)',
                        filter: 'blur(16px)',
                        transform: 'scale(2)',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    />
                  )}
                  
                  {/* Marker Circle */}
                  <div 
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center relative z-10 pointer-events-none",
                      "transition-all duration-300 group-hover:scale-110"
                    )}
                    style={{
                      background: 'rgba(10, 10, 10, 0.95)',
                      border: `2px solid hsl(var(--${tier.color}))`,
                      boxShadow: isCurrent 
                        ? `0 0 24px hsl(var(--${tier.color}) / 0.6), inset 0 2px 8px rgba(255,255,255,0.1)` 
                        : `0 0 12px hsl(var(--${tier.color}) / 0.3), inset 0 2px 4px rgba(255,255,255,0.05)`
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: `hsl(var(--${tier.color}))` }} />
                  </div>
                  
                  {/* Tier Label Below */}
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <div 
                      className="font-editorial text-lg font-bold mb-1 uppercase tracking-wider"
                      style={{
                        color: `hsl(var(--${tier.color}))`,
                        letterSpacing: '0.12em',
                        textShadow: `0 2px 8px hsl(var(--${tier.color}) / 0.3)`
                      }}
                    >
                      {tier.name}
                    </div>
                    {isCurrent && (
                      <div className="text-subhead text-tier-accent mt-1 font-semibold text-xs">
                        Current Tier
                      </div>
                    )}
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Hover Tooltip with Rewards */}
        {hoveredTier && (
          <div className="absolute inset-0 pointer-events-none">
            {visibleTiers.map((tier) => {
              if (hoveredTier !== tier.name) return null;
              
              const isCurrent = tier.name === currentTierName;
              const epNeeded = getEPNeeded(tier);
              const markerPos = getMarkerPosition(tier.threshold);
              
              // Calculate tooltip positioning to keep it on screen
              let tooltipTransform = 'translateX(-50%)';
              let arrowLeft = '50%';
              
              if (markerPos > 70) {
                // Right side tiers - shift tooltip left
                tooltipTransform = 'translateX(-85%)';
                arrowLeft = '85%';
              } else if (markerPos < 30) {
                // Left side tiers - shift tooltip right
                tooltipTransform = 'translateX(-15%)';
                arrowLeft = '15%';
              }
              
              return (
                <div
                  key={tier.name}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${markerPos}%`,
                    top: '-140px',
                    transform: tooltipTransform,
                    willChange: 'transform, opacity',
                    animation: 'fade-in 0.15s ease-out forwards'
                  }}
                >
                  <div 
                    className="w-64 rounded-lg p-3 shadow-xl relative"
                    style={{
                      background: 'rgba(10, 10, 10, 0.98)',
                      border: `1px solid hsl(var(--${tier.color}) / 0.5)`,
                      boxShadow: `0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px hsl(var(--${tier.color}) / 0.2)`,
                      willChange: 'transform'
                    }}
                  >
                    {/* Arrow pointing down to marker */}
                    <div 
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                      style={{
                        background: 'rgba(10, 10, 10, 0.98)',
                        border: `1px solid hsl(var(--${tier.color}) / 0.5)`,
                        borderTop: 'none',
                        borderLeft: 'none',
                        left: arrowLeft
                      }}
                    />
                    
                    {/* Status text */}
                    <div 
                      className="text-xs font-semibold mb-2 pb-2 border-b border-border/30"
                      style={{ color: `hsl(var(--${tier.color}))` }}
                    >
                      {isCurrent 
                        ? "Your Current Tier" 
                        : epNeeded > 0 
                          ? `${epNeeded} EP needed`
                          : "Achieved"
                      }
                    </div>
                    
                    {/* Show only top 3 rewards */}
                    <div className="space-y-2">
                      {tierRewards[tier.name]?.slice(0, 3).map((reward, idx) => {
                        const RewardIcon = reward.icon;
                        return (
                          <div 
                            key={idx} 
                            className="flex items-start gap-2"
                          >
                            <RewardIcon 
                              className="w-4 h-4 mt-0.5 flex-shrink-0" 
                              style={{ color: `hsl(var(--${tier.color}))` }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold text-foreground leading-tight">
                                {reward.title}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {tierRewards[tier.name]?.length > 3 && (
                        <div className="text-xs text-muted-foreground pt-1 border-t border-border/30">
                          +{tierRewards[tier.name].length - 3} more benefits
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
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
                <p className="text-white mb-2">
                  <strong>Elevation Points (EP)</strong> are earned through events, apparel purchases, and coaching sessions.
                </p>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex justify-between gap-4">
                    <span>Events</span>
                    <span className="font-bold text-white">{activity2025.events.totalEP} EP</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Apparel</span>
                    <span className="font-bold text-white">{activity2025.apparel.totalEP} EP</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Coaching</span>
                    <span className="font-bold text-white">{activity2025.coaching.totalEP} EP</span>
                  </div>
                </div>
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
    </section>
  );
};
