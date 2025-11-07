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
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
        Your Elevation Journey
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
        
        {/* Main Gradient Bar */}
        <div 
          className={cn(
            "relative h-24 rounded-full overflow-hidden border border-border/50 shadow-2xl",
            "transition-opacity duration-700",
            isRevealed ? "opacity-100" : "opacity-80"
          )}
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 2px 8px rgba(255,255,255,0.05)'
          }}
        >
          {/* Background Gradient */}
          <div 
            className="absolute inset-0" 
            style={{
              background: `linear-gradient(to right, 
                hsl(var(--base)) 0%, 
                hsl(var(--base) / 0.5) 30%,
                hsl(var(--ridge) / 0.3) 40%,
                hsl(var(--ridge)) 50%,
                hsl(var(--ridge) / 0.5) 60%,
                hsl(var(--peak) / 0.8) 70%,
                hsl(var(--peak)) 100%
              )`
            }}
          />
          
          {/* Contour Lines Texture */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg, 
                transparent, 
                transparent 10px, 
                rgba(255,255,255,0.1) 10px, 
                rgba(255,255,255,0.1) 11px
              )`
            }}
          />
          
          {/* Sweep Animation Overlay */}
          <div 
            className="absolute inset-0 animate-sweep opacity-30"
            style={{
              background: `linear-gradient(
                90deg,
                transparent 0%,
                rgba(255, 255, 255, 0.1) 45%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0.1) 55%,
                transparent 100%
              )`,
              backgroundSize: '200% 100%'
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
                  {/* Current Tier Red Bloom Effects */}
                  {isCurrent && (
                    <>
                      {/* Outer Red Bloom */}
                      <div 
                        className="absolute inset-0 rounded-full animate-tier-pulse pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(221, 0, 51, 0.4) 0%, rgba(221, 0, 51, 0.1) 50%, transparent 70%)',
                          filter: 'blur(12px)',
                          transform: 'scale(1.8)'
                        }}
                      />
                      
                      {/* Inner Glow Ring */}
                      <div 
                        className="absolute -inset-1 rounded-full pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(221, 0, 51, 0.6), rgba(153, 0, 35, 0.4))',
                          filter: 'blur(4px)'
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
                  
                  {/* Marker Circle */}
                  <div 
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center relative z-10",
                      "transition-all duration-300 hover:scale-110"
                    )}
                    style={{
                      backgroundColor: 'hsl(var(--background))',
                      border: `3px solid hsl(var(--${tier.color}))`,
                      boxShadow: isCurrent ? `0 0 32px hsl(var(--${tier.color}) / 0.4)` : 'none'
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: `hsl(var(--${tier.color}))` }} />
                  </div>
                  
                  {/* Tier Label Below */}
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <div 
                      className="font-bold text-sm mb-1 bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, 
                          hsl(var(--${tier.color})) 0%, 
                          hsl(var(--${tier.color}) / 0.7) 100%
                        )`
                      }}
                    >
                      {tier.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tier.threshold > 0 ? `${tier.threshold} EP` : 'Starting Point'}
                    </div>
                    {isCurrent && (
                      <div 
                        className="text-[10px] uppercase tracking-wider mt-1 font-bold"
                        style={{ color: `hsl(var(--${tier.color}))` }}
                      >
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
        
        {/* Expandable Rewards Section */}
        {expandedTier && (
          <>
            {/* Backdrop Dim */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10 animate-fade-in" />
            
            {/* Rewards Container */}
            <div className="mt-6 relative z-20">
              {visibleTiers.map((tier) => (
                expandedTier === tier.name && (
                  <div 
                    key={tier.name} 
                    className="space-y-3 px-6 py-6 rounded-xl border"
                    style={{ 
                      backgroundColor: '#343532',
                      borderColor: `hsl(var(--${tier.color}))`,
                      animation: 'reward-fade-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                    }}
                  >
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <span style={{ color: `hsl(var(--${tier.color}))` }}>{tier.name} Rewards</span>
                    </h3>
                    
                    {tierRewards[tier.name]?.map((reward, idx) => {
                      const RewardIcon = reward.icon;
                      return (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-background/30 transition-colors"
                          style={{
                            animation: `reward-fade-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                            animationDelay: `${idx * 80}ms`,
                            opacity: 0
                          }}
                        >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ 
                            backgroundColor: `hsl(var(--${tier.color}) / 0.2)`,
                            border: `1px solid hsl(var(--${tier.color}) / 0.4)`
                          }}
                        >
                          <RewardIcon className="w-5 h-5" style={{ color: `hsl(var(--${tier.color}))` }} />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-bold text-sm mb-1">{reward.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {reward.description}
                          </p>
                        </div>
                      </div>
                        );
                      })}
                    </div>
                  )
                ))}
              </div>
            </>
          )
        }
      </div>
      
      {/* EP Progress Indicator */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>You've earned <span className="font-bold text-foreground">{currentEP} EP</span> towards Peak</p>
        <p className="text-xs mt-1">{1000 - currentEP} EP remaining</p>
      </div>
    </section>
  );
};
