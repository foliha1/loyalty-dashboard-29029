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
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [clickedTier, setClickedTier] = useState<string | null>(null);
  
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

  const handleTierClick = (tierName: string) => {
    setExpandedTier(expandedTier === tierName ? null : tierName);
    setClickedTier(tierName);
    setTimeout(() => setClickedTier(null), 800);
  };
  
  const progressPercentage = Math.min(100, (currentEP / maxThreshold) * 100);
  
  return (
    <section className="mb-24 section-reveal">
      <div className="divider-red mb-12" />
      
      <h2 className="text-section-title text-4xl md:text-5xl mb-12 font-editorial">
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
                  onClick={() => handleTierClick(tier.name)}
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
                  
                  {/* Click Ripple Effect */}
                  {clickedTier === tier.name && (
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-[#DD0033] animate-ripple pointer-events-none"
                      key={`ripple-${Date.now()}`}
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
                      className="font-editorial text-sm mb-1 uppercase"
                      style={{
                        color: `hsl(var(--${tier.color}))`,
                        letterSpacing: '0.1em'
                      }}
                    >
                      {tier.name}
                    </div>
                    <div className="text-subhead">
                      {tier.threshold > 0 ? `${tier.threshold} EP` : 'Starting Point'}
                    </div>
                    {isCurrent && (
                      <div className="text-subhead text-[#DD0033] mt-1">
                        Current Tier
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Tooltip */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:-translate-y-1 pointer-events-none">
                    <div className="bg-background border border-border rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-lg">
                      {isCurrent 
                        ? "Your Current Tier" 
                        : epNeeded > 0 
                          ? `${epNeeded} EP needed`
                          : "Achieved"
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Fixed Dropdown with Solid Backgrounds */}
        {expandedTier && (
          <>
            {/* Solid Backdrop with proper z-index */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in" 
              onClick={() => setExpandedTier(null)}
            />
            
            {/* Rewards Container with higher z-index */}
            <div 
              className="absolute top-32 z-50" 
              style={{
                left: expandedTier === 'Peak' 
                  ? 'calc(92% - 160px)' // Align right for Peak
                  : getMarkerPosition(
                      visibleTiers.find(t => t.name === expandedTier)?.threshold ?? 0
                    ),
                transform: expandedTier === 'Peak' ? 'none' : 'translateX(-50%)'
              }}
            >
              {visibleTiers.map((tier) => (
                expandedTier === tier.name && (
                  <div 
                    key={tier.name} 
                    className="w-80 space-y-2 animate-fade-in"
                  >
                    {/* Rewards as Individual Stacked Cards */}
                    {tierRewards[tier.name]?.map((reward, idx) => {
                      const RewardIcon = reward.icon;
                      return (
                        <div 
                          key={idx} 
                          className="rounded-lg p-4 transition-all duration-300 hover:scale-105 cursor-default animate-fade-in"
                          style={{
                            background: 'rgba(26, 26, 26, 0.95)',
                            border: `1px solid ${tier.name === 'Ridge' ? 'rgba(221, 0, 51, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`,
                            animationDelay: `${idx * 60}ms`,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
                          }}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ 
                                background: tier.name === 'Ridge' 
                                  ? 'rgba(221, 0, 51, 0.2)' 
                                  : 'rgba(255, 255, 255, 0.1)',
                                border: `1px solid ${tier.name === 'Ridge' ? 'rgba(221, 0, 51, 0.4)' : 'rgba(255, 255, 255, 0.2)'}`
                              }}
                            >
                              <RewardIcon 
                                className="w-5 h-5" 
                                style={{ 
                                  color: tier.name === 'Ridge' ? '#DD0033' : '#D9D9D9'
                                }} 
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-editorial text-sm mb-1 text-foreground">
                                {reward.title}
                              </h4>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {reward.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ))}
            </div>
          </>
        )}
        
        {/* EP Progress Info */}
        <div className="mt-8 text-center">
          <div className="text-subhead">
            Progress: {currentEP} / {maxThreshold} EP ({Math.round(progressPercentage)}%)
          </div>
        </div>
      </div>
    </section>
  );
};
