import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentTier } from "@/lib/tierConfig";
import { cn } from "@/lib/utils";

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
        "transition-all duration-300 ease-in-out section-reveal",
        isCollapsed 
          ? "fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-tier-accent/20 py-3" 
          : "mb-24 py-16"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Expanded Layout */}
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          {/* Name + ID */}
          <div className="mb-8">
            <h1 className="text-hero text-5xl md:text-7xl mb-2 metric-animate">
              Alex Rivera
            </h1>
            <div className="text-subhead text-slide-up-delay-2">
              29029 ID: AR-5847 • Member Since 2023
            </div>
          </div>

          {/* Stats Grid - More Spacious */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start metric-animate-delay-1">
              <Avatar className="w-32 h-32 border-4 border-tier-accent glow-tier-accent">
                <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
                <AvatarFallback className="bg-secondary text-foreground text-lg font-semibold">AR</AvatarFallback>
              </Avatar>
            </div>

            {/* EP Display */}
            <div className="text-center metric-animate-delay-2">
              <div className="text-subhead mb-3">
                Total EP This Cycle
              </div>
              <div className="metric-hero">720</div>
            </div>

            {/* Tier Badge */}
            <div className="flex justify-center md:justify-end metric-animate-delay-3">
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
          "flex items-center justify-between transition-all duration-300 ease-in-out",
          isCollapsed ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        )}>
          {/* Left: Avatar + Name */}
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-tier-accent">
              <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
              <AvatarFallback className="bg-secondary text-foreground text-sm">AR</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-semibold text-foreground">Alex Rivera</div>
              <div className="text-xs text-muted-foreground">AR-5847</div>
            </div>
          </div>

          {/* Right: EP + Tier */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">EP</div>
              <div className="text-xl font-bold text-tier-accent">720</div>
            </div>
            {TierIcon && (
              <div className="flex items-center gap-2">
                <TierIcon className="w-6 h-6 text-tier-accent glow-tier-accent" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
