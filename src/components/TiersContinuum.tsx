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
  
  return (
    <section className="mb-24 section-reveal">
      <div className="divider-red mb-12" />
      
      <h2 className="text-section-title text-4xl md:text-5xl mb-12 font-editorial">
        Elevation Journey
      </h2>
      
      {/* Gradient Ridge Line Container */}
      <div className="relative">
        {/* Atmospheric Background Layer */}
        <div className="absolute inset-0 -z-10 rounded-full overflow-hidden">
          {/* Depth shadow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
          
          {/* Floating fog particles */}
          <div 
            className="absolute inset-0 animate-fog-drift opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              filter: 'blur(2px)'
            }}
          />
        </div>
        
        {/* Main Gradient Bar - Borderless */}
        <div 
          className={cn(
            "relative h-24 rounded-full overflow-hidden shadow-2xl",
            "transition-opacity duration-700",
            isRevealed ? "opacity-100" : "opacity-80"
          )}
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 2px 8px rgba(255,255,255,0.03)'
          }}
        >
          {/* Background Gradient - Light Gray → Warm Red → Black */}
          <div 
            className="absolute inset-0" 
            style={{
              background: `linear-gradient(to right, 
                hsl(var(--base)) 0%,
                hsl(var(--base) / 0.8) 25%,
                hsl(var(--ridge) / 0.3) 40%,
                hsl(var(--ridge)) 50%,
                hsl(var(--ridge) / 0.6) 60%,
                hsl(var(--peak) / 0.5) 75%,
                hsl(var(--peak)) 90%,
                hsl(var(--peak)) 100%
              )`
            }}
          />
          
          {/* Red Glow Overlay at Peak End */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 30% 100% at 95% 50%,
                rgba(221, 0, 51, 0.25) 0%,
                transparent 60%
              )`
            }}
          />
          
          {/* Enhanced Mountain Ridge Contour Lines */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg, 
                  transparent, 
                  transparent 8px, 
                  rgba(255,255,255,0.15) 8px, 
                  rgba(255,255,255,0.15) 9px
                ),
                repeating-linear-gradient(
                  0deg, 
                  transparent, 
                  transparent 16px, 
                  rgba(255,255,255,0.25) 16px, 
                  rgba(255,255,255,0.25) 17px
                )
              `,
              maskImage: `linear-gradient(
                90deg,
                transparent 0%,
                black 10%,
                black 90%,
                transparent 100%
              )`
            }}
          />
          
          {/* Mountain Ridge Silhouette */}
          <div 
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 100'%3E%3Cpath d='M0,100 L0,40 Q150,20 300,35 T600,45 T900,40 T1200,50 L1200,100 Z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat'
            }}
          />
          
          {/* Enhanced Sweep Animation with Pulse - 10s + 3s */}
          <div 
            className="absolute inset-0 animate-sweep-pulse opacity-40 pointer-events-none"
            style={{
              background: `linear-gradient(
                90deg,
                transparent 0%,
                rgba(255, 255, 255, 0.05) 40%,
                rgba(255, 255, 255, 0.25) 48%,
                rgba(255, 255, 255, 0.35) 50%,
                rgba(255, 255, 255, 0.25) 52%,
                rgba(255, 255, 255, 0.05) 60%,
                transparent 100%
              )`,
              backgroundSize: '200% 100%',
              mixBlendMode: 'soft-light'
            }}
          />
          
          {/* Initial Sweep on Mount */}
          {isRevealed && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(
                  90deg,
                  transparent 0%,
                  rgba(255, 255, 255, 0.3) 50%,
                  transparent 100%
                )`,
                backgroundSize: '50% 100%',
                animation: 'sweep 2s ease-out forwards'
              }}
            />
          )}
          
          {/* Hover Spotlight Overlay */}
          {hoveredZone && (
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 blend-overlay"
              style={{
                background: `radial-gradient(
                  ellipse 40% 100% at ${hoveredZone === 'Base' ? '10%' : hoveredZone === 'Ridge' ? '50%' : '90%'} 50%,
                  rgba(255, 255, 255, 0.15) 0%,
                  rgba(255, 255, 255, 0.05) 40%,
                  transparent 70%
                )`
              }}
            />
          )}
          
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
                    "absolute cursor-pointer group",
                    isRevealed && "animate-marker-entrance"
                  )}
                  style={{ 
                    left: position, 
                    transform: 'translateX(-50%)',
                    animationDelay: `${visibleTiers.indexOf(tier) * 120}ms`,
                    opacity: isRevealed ? 1 : 0
                  }}
                  onClick={() => handleTierClick(tier.name)}
                  onMouseEnter={() => setHoveredZone(tier.name)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  {/* Enhanced Current Tier Pulse - Three Layers */}
                  {isCurrent && (
                    <>
                      {/* Outer Red Bloom - Larger & More Visible */}
                      <div 
                        className="absolute inset-0 rounded-full animate-tier-pulse pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(221, 0, 51, 0.5) 0%, rgba(221, 0, 51, 0.2) 40%, transparent 70%)',
                          filter: 'blur(16px)',
                          transform: 'scale(2.2)'
                        }}
                      />
                      
                      {/* Inner Glow Ring - Sharper */}
                      <div 
                        className="absolute -inset-1 rounded-full pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(221, 0, 51, 0.8), rgba(153, 0, 35, 0.6))',
                          filter: 'blur(6px)'
                        }}
                      />
                      
                      {/* Core Highlight */}
                      <div 
                        className="absolute -inset-0.5 rounded-full pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                          mixBlendMode: 'overlay'
                        }}
                      />
                    </>
                  )}
                  
                  {/* Click Ripple Effect */}
                  {clickedTier === tier.name && (
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-29029 animate-ripple pointer-events-none"
                      key={`ripple-${Date.now()}`}
                    />
                  )}
                  
                  {/* Marker Circle - No Hard Borders */}
                  <div 
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center relative z-10",
                      "transition-all duration-300 hover:scale-110"
                    )}
                    style={{
                      background: `radial-gradient(circle, 
                        rgba(${isCurrent ? '0,0,0' : '10,10,10'}, 0.9) 0%, 
                        rgba(0,0,0,0.6) 100%
                      )`,
                      border: `2px solid hsl(var(--${tier.color}))`,
                      boxShadow: isCurrent 
                        ? `0 0 32px hsl(var(--${tier.color}) / 0.6), inset 0 2px 12px rgba(255,255,255,0.1)` 
                        : `0 0 12px hsl(var(--${tier.color}) / 0.3), inset 0 2px 8px rgba(255,255,255,0.05)`,
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: `hsl(var(--${tier.color}))` }} />
                  </div>
                  
                  {/* Tier Label Below */}
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <div 
                      className="font-editorial text-sm mb-1 uppercase bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, 
                          hsl(var(--${tier.color})) 0%, 
                          hsl(var(--${tier.color}) / 0.7) 100%
                        )`,
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
        
        {/* Stacked Reward Cards Below Marker */}
        {expandedTier && (
          <>
            {/* Subtle Backdrop Dim - No Harsh Overlay */}
            <div 
              className="fixed inset-0 -z-10 animate-fade-in" 
              style={{
                background: 'radial-gradient(circle at 50% 30%, rgba(0,0,0,0.3) 0%, transparent 70%)'
              }}
              onClick={() => setExpandedTier(null)}
            />
            
            {/* Rewards Container - Positioned Below Clicked Marker */}
            <div className="absolute top-28 z-30" 
              style={{
                left: getMarkerPosition(
                  visibleTiers.find(t => t.name === expandedTier)?.threshold ?? 0
                ),
                transform: 'translateX(-50%)'
              }}
            >
              {visibleTiers.map((tier) => (
                expandedTier === tier.name && (
                  <div 
                    key={tier.name} 
                    className="w-80 space-y-2"
                    style={{
                      animation: 'reward-fade-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                    }}
                  >
                    {/* Rewards as Individual Stacked Cards */}
                    {tierRewards[tier.name]?.map((reward, idx) => {
                      const RewardIcon = reward.icon;
                      return (
                        <div 
                          key={idx} 
                          className="backdrop-blur-xl rounded-lg p-4 
                            transition-all duration-300 hover:scale-105 cursor-default"
                          style={{
                            background: `linear-gradient(135deg, 
                              rgba(${tier.name === 'Base' ? '200,200,200' : tier.name === 'Ridge' ? '221,0,51' : '20,20,20'}, 0.15) 0%, 
                              rgba(0,0,0,0.7) 100%
                            )`,
                            border: `1px solid ${tier.name === 'Ridge' ? 'rgba(221, 0, 51, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                            animation: `reward-fade-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                            animationDelay: `${idx * 60}ms`,
                            opacity: 0,
                            boxShadow: tier.name === 'Ridge' 
                              ? '0 4px 20px rgba(221, 0, 51, 0.15)' 
                              : '0 4px 20px rgba(0, 0, 0, 0.3)'
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
                                  color: tier.name === 'Ridge' ? '#DD0033' : '#fff' 
                                }} 
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1 text-white">
                                {reward.title}
                              </h4>
                              <p className="text-xs text-white/70">
                                {reward.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Close Hint */}
                    <div className="text-center mt-3">
                      <button 
                        onClick={() => setExpandedTier(null)}
                        className="text-xs text-white/50 hover:text-white/80 transition-colors uppercase tracking-wider"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* EP Progress Indicator */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>You've earned <span className="font-bold text-foreground">{currentEP} EP</span> towards Peak</p>
        <p className="text-xs mt-1">{1000 - currentEP} EP remaining</p>
      </div>
    </section>
  );
};
