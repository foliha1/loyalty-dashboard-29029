import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentTier } from "@/lib/tierConfig";
import { cn } from "@/lib/utils";
import { Logo29029 } from "@/components/Logo29029";
import patagoniaImage from "@/assets/patagonia-mountains.jpg";

interface UserHeaderProps {
  isCollapsed?: boolean;
}

export const UserHeader = ({ isCollapsed = false }: UserHeaderProps) => {
  const currentTierName = "Ridge";
  const currentTier = getCurrentTier(currentTierName);
  const TierIcon = currentTier?.icon;

  return (
    <section 
      className={cn(
        "transition-all duration-300 ease-in-out section-reveal relative w-full",
        isCollapsed 
          ? "fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-tier-accent/20 py-3" 
          : "mb-16 py-8"
      )}
      style={!isCollapsed ? {
        backgroundImage: `url(${patagoniaImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      {/* Black overlay at 30% */}
      {!isCollapsed && (
        <div className="absolute inset-0 bg-black/30 -z-10" />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Expanded Layout */}
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          {/* Centered Logo */}
          <div className="flex justify-center mb-12">
            <Logo29029 size={40} className="text-white opacity-90" />
          </div>

          {/* Inline Content: Avatar + Info on left, Tier on right */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left: Avatar + Name + ID + Member */}
            <div className="flex items-center gap-6 metric-animate-delay-1 group">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-tier-accent glow-tier-accent flex-shrink-0 transition-all duration-300 group-hover:scale-105">
                  <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
                  <AvatarFallback className="bg-secondary text-foreground text-lg font-semibold">AR</AvatarFallback>
                </Avatar>
                
                {/* Hover Details Card */}
                <div className="absolute left-0 top-full mt-4 w-64 p-4 rounded-lg border border-tier-accent/30 bg-black/95 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-2xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-border/30">
                      <span className="text-xs text-muted-foreground">Total Events</span>
                      <span className="text-sm font-bold text-tier-accent">12</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/30">
                      <span className="text-xs text-muted-foreground">Total Ascents</span>
                      <span className="text-sm font-bold text-tier-accent">348,000 ft</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/30">
                      <span className="text-xs text-muted-foreground">Lifetime EP</span>
                      <span className="text-sm font-bold text-tier-accent">2,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Achievement Badges</span>
                      <span className="text-sm font-bold text-tier-accent">8</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <h1 className="text-hero text-4xl md:text-5xl mb-2">
                  Alex Rivera
                </h1>
                <div className="text-subhead">
                  29029 ID: AR-5847
                </div>
                <div className="text-subhead">
                  Member Since 2023
                </div>
              </div>
            </div>

            {/* Right: Tier Badge */}
            <div className="flex justify-center metric-animate-delay-3 flex-shrink-0">
              <div>
                <div className="text-subhead mb-4 text-center">
                  Current Tier
                </div>
                {TierIcon && (
                  <div className="px-8 py-4 rounded-lg border-2 border-tier-accent bg-black/40 backdrop-blur-sm">
                    <TierIcon className="w-8 h-8 text-tier-accent mx-auto mb-2" />
                    <div className="font-editorial text-xl text-center">{currentTierName.toUpperCase()}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed Layout */}
        <div className={cn(
          "grid grid-cols-3 items-center gap-4 transition-all duration-300 ease-in-out",
          isCollapsed ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        )}>
          {/* Left: Avatar + Name */}
          <div className="flex items-center gap-3 justify-start">
            <Avatar className="w-10 h-10 border-2 border-tier-accent">
              <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
              <AvatarFallback className="bg-secondary text-foreground text-sm">AR</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <div className="text-lg font-semibold text-foreground">Alex Rivera</div>
              <div className="text-xs text-muted-foreground">AR-5847</div>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <Logo29029 size={28} className="text-white opacity-80" />
          </div>

          {/* Right: EP */}
          <div className="flex items-center gap-4 justify-end">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">EP</div>
              <div className="text-xl font-bold text-tier-accent">720</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
