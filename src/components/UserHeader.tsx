import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentTier } from "@/lib/tierConfig";
import { cn } from "@/lib/utils";
import { Logo29029 } from "@/components/Logo29029";
import { useParallax } from "@/hooks/useParallax";
import patagoniaImage from "@/assets/patagonia-mountains.jpg";

interface UserHeaderProps {
  isCollapsed?: boolean;
}

export const UserHeader = ({ isCollapsed = false }: UserHeaderProps) => {
  const currentTierName = "Ridge";
  const currentTier = getCurrentTier(currentTierName);
  const TierIcon = currentTier?.icon;
  const parallaxOffset = useParallax(0.15);

  return (
    <section 
      className={cn(
        "transition-all duration-300 ease-in-out section-reveal relative w-full overflow-hidden",
        isCollapsed 
          ? "fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-tier-accent/20 py-3" 
          : "mb-0 py-20 md:py-32"
      )}
    >
      {/* Atmospheric Background Layer - Only shown when expanded */}
      {!isCollapsed && (
        <>
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,1) 100%)'
            }}
          />
          
          {/* Mountain silhouette with parallax */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.08]"
            style={{
              backgroundImage: `url(${patagoniaImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              transform: `translateY(${parallaxOffset}px)`,
            }}
          />
          
          {/* Topographic texture overlay */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                hsl(var(--foreground)) 2px,
                hsl(var(--foreground)) 3px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                hsl(var(--foreground)) 2px,
                hsl(var(--foreground)) 3px
              )`,
              backgroundSize: '80px 80px'
            }}
          />
        </>
      )}
      
      <div className="container mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        {/* Expanded Layout */}
        <div className={cn(
          "transition-all duration-700 ease-out",
          isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100 animate-fade-in"
        )}>
          {/* Logo - Right aligned */}
          <div className="flex justify-end mb-16 md:mb-20">
            <Logo29029 size={36} className="text-white/80" />
          </div>

          {/* Hero Content - Left aligned */}
          <div className="max-w-4xl">
            {/* Premium ID Number */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase font-light text-muted-foreground/70">
                29029 ID: AR-5847
              </span>
            </div>
            
            {/* Name with editorial hierarchy */}
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] text-foreground mb-6 animate-fade-in leading-[0.95]"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              Alex Rivera
            </h1>
            
            {/* Subheader with expanded tracking */}
            <div 
              className="text-sm md:text-base tracking-[0.25em] uppercase font-light text-muted-foreground/80 mb-16 animate-fade-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              Member Since 2023
            </div>

            {/* Stats Row - Premium layout */}
            <div 
              className="flex flex-wrap gap-8 md:gap-12 items-center animate-fade-in"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              {/* Avatar with hover details */}
              <div className="relative group">
                <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-tier-accent/50 glow-tier-accent flex-shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:border-tier-accent">
                  <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
                  <AvatarFallback className="bg-secondary text-foreground text-lg font-semibold">AR</AvatarFallback>
                </Avatar>
                
                {/* Hover Details Card */}
                <div className="absolute left-0 top-full mt-4 w-64 p-5 rounded-lg border border-tier-accent/30 bg-black/95 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-2xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-border/30">
                      <span className="text-xs tracking-wide text-muted-foreground">Total Events</span>
                      <span className="text-sm font-bold text-tier-accent">12</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/30">
                      <span className="text-xs tracking-wide text-muted-foreground">Total Ascents</span>
                      <span className="text-sm font-bold text-tier-accent">348,000 ft</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/30">
                      <span className="text-xs tracking-wide text-muted-foreground">Lifetime EP</span>
                      <span className="text-sm font-bold text-tier-accent">2,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs tracking-wide text-muted-foreground">Achievement Badges</span>
                      <span className="text-sm font-bold text-tier-accent">8</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier Badge */}
              <div className="flex-shrink-0">
                <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground/70 mb-3 text-center">
                  Current Tier
                </div>
                {TierIcon && (
                  <div className="px-8 py-4 rounded-lg border-2 border-tier-accent/50 bg-black/40 backdrop-blur-sm transition-all duration-500 hover:border-tier-accent hover:bg-black/60">
                    <TierIcon className="w-10 h-10 text-tier-accent mx-auto mb-2" />
                    <div className="font-light text-lg tracking-wider text-center text-foreground">{currentTierName.toUpperCase()}</div>
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
