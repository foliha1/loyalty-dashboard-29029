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
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Reward {
  icon: any;
  title: string;
  description: string;
}

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
  
  const visibleTiers = tiers.filter(t => t.name !== "Summit Circle");
  const currentTierName = "Ridge"; // This should come from user data
  const currentEP = 720; // This should come from user data
  
  const maxThreshold = 1000; // Peak threshold
  
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const getMarkerPosition = (threshold: number) => {
    if (threshold === 0) return '8%';
    if (threshold === 500) return '50%';
    return '92%';
  };

  const getEPNeeded = (tier: typeof visibleTiers[0]) => {
    const needed = tier.threshold - currentEP;
    return needed > 0 ? needed : 0;
  };
  
  const progressPercentage = Math.min(100, (currentEP / maxThreshold) * 100);
  
  return (
    <section className="mb-24 section-reveal">
      <div className="divider-red mb-12" />
      
      <h2 className="text-section-title text-4xl md:text-5xl mb-16 font-editorial">
        Elevation Journey
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
              background: '#727272',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)'
            }}
          />
          
          {/* Progress Fill - Gradient from light gray to teal */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-1000"
            style={{
              width: `${progressPercentage}%`,
              background: 'linear-gradient(90deg, #D9D9D9 0%, #31BCAF 100%)',
              boxShadow: '0 2px 12px rgba(49, 188, 175, 0.3)'
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
                    "absolute cursor-pointer group transition-all duration-300",
                    isRevealed && "animate-fade-in"
                  )}
                  style={{ 
                    left: position, 
                    transform: 'translateX(-50%)',
                    animationDelay: `${visibleTiers.indexOf(tier) * 120}ms`,
                    opacity: isRevealed ? 1 : 0
                  }}
                  onMouseEnter={() => setHoveredTier(tier.name)}
                  onMouseLeave={() => setHoveredTier(null)}
                >
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
                      "w-16 h-16 rounded-full flex items-center justify-center relative z-10",
                      "transition-all duration-300 hover:scale-110"
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
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <div 
                      className="font-editorial text-sm mb-2 uppercase tracking-wider"
                      style={{
                        color: `hsl(var(--${tier.color}))`,
                        letterSpacing: '0.12em'
                      }}
                    >
                      {tier.name}
                    </div>
                    <div className="text-subhead text-xs">
                      {tier.threshold > 0 ? `${tier.threshold} EP` : 'Starting Point'}
                    </div>
                    {isCurrent && (
                      <div className="text-subhead text-tier-accent mt-2 font-semibold">
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
              
              return (
                <div
                  key={tier.name}
                  className="absolute pointer-events-none"
                  style={{
                    left: getMarkerPosition(tier.threshold),
                    top: '-140px',
                    transform: hoveredTier === 'Peak' ? 'translateX(-85%)' : 'translateX(-50%)'
                  }}
                >
                  <div 
                    className="w-64 rounded-lg p-3 shadow-xl relative"
                    style={{
                      background: 'rgba(10, 10, 10, 0.98)',
                      border: `1px solid hsl(var(--${tier.color}) / 0.5)`,
                      boxShadow: `0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px hsl(var(--${tier.color}) / 0.2)`
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
                        left: hoveredTier === 'Peak' ? '85%' : '50%'
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
        
        {/* EP Progress Info */}
        <div className="mt-12 text-center">
          <div className="text-subhead text-sm">
            Progress: {currentEP} / {maxThreshold} EP ({Math.round(progressPercentage)}%)
          </div>
        </div>
      </div>
    </section>
  );
};
