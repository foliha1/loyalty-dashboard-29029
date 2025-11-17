import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentTier } from "@/lib/tierConfig";
import { cn } from "@/lib/utils";
import { Logo29029 } from "@/components/Logo29029";

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
        "transition-all duration-300 ease-in-out section-reveal relative w-full overflow-hidden",
        isCollapsed 
          ? "fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-tier-accent/20 py-3" 
          : "mb-0 py-12 md:py-16"
      )}
    >
      {/* Subtle neutral gradient background - Only shown when expanded */}
      {!isCollapsed && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(0,0,0,1) 100%)'
          }}
        />
      )}
      
      <div className="container mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        {/* Expanded Layout */}
        <div className={cn(
          "transition-all duration-700 ease-out",
          isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100 animate-fade-in"
        )}>
          {/* Logo - Centered */}
          <div className="flex justify-center mb-12 md:mb-14">
            <Logo29029 size={32} className="text-white/70" />
          </div>

          {/* Hero Content - Centered */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Premium ID Number */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase font-light text-muted-foreground/70">
                29029 ID: AR-5847
              </span>
            </div>
            
            {/* Name with editorial hierarchy */}
            <h1 
              className="text-hero mb-4 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              Alex Rivera
            </h1>
            
            {/* Subheader with expanded tracking */}
            <div 
              className="text-sm md:text-base tracking-[0.25em] uppercase font-light text-muted-foreground/80 mb-12 animate-fade-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              Member Since 2023
            </div>

            {/* Stats Row - Centered layout */}
            <div 
              className="flex flex-wrap gap-8 md:gap-10 items-center justify-center animate-fade-in"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              {/* Avatar with hover details */}
              <div className="relative group">
                <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-tier-accent/50 glow-tier-accent flex-shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:border-tier-accent">
                  <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
                  <AvatarFallback className="bg-secondary text-foreground text-lg font-semibold">AR</AvatarFallback>
                </Avatar>
                
                {/* Hover Details Card */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 p-5 rounded-xl border border-tier-accent/30 bg-black/95 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 shadow-xl">
...
                </div>
              </div>

              {/* Tier Badge - Refined to match dashboard */}
              <div className="flex-shrink-0">
                <div className="text-supporting uppercase tracking-[0.25em] mb-3 text-xs font-light">
                  Current Tier
                </div>
                {TierIcon && (
                  <div className="px-6 py-3 rounded-xl border border-tier-accent/30 bg-card/20 backdrop-blur-sm transition-all duration-500 hover:border-tier-accent/50 hover:bg-card/30 hover:shadow-lg">
                    <TierIcon className="w-8 h-8 text-tier-accent mx-auto mb-2" />
                    <div className="font-light text-base tracking-wide text-center text-foreground">{currentTierName}</div>
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
