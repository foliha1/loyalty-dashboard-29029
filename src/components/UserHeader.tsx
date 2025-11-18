import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentTier } from "@/lib/tierConfig";
import { cn } from "@/lib/utils";
import { Logo29029 } from "@/components/Logo29029";
import heroTopoBg from "@/assets/hero-topo-bg.jpg";
import { useHeaderCollapseProgress } from "@/hooks/useHeaderCollapseProgress";

export const UserHeader = () => {
  const currentTierName = "Ridge";
  const currentTier = getCurrentTier(currentTierName);
  const TierIcon = currentTier?.icon;

  // Responsive collapse distance
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const { progress, isCollapsed } = useHeaderCollapseProgress(isMobile ? 240 : 320);

  // Interpolated layout values
  const expandedH = 420; // px
  const collapsedH = 72; // px
  const height = Math.max(collapsedH, Math.round(expandedH - (expandedH - collapsedH) * progress));
  const padExpanded = 40;
  const padCollapsed = 12;
  const padY = Math.round(padExpanded - (padExpanded - padCollapsed) * progress);

  const bgOpacity = 0.15 * (1 - progress) + 0.06 * progress;

  return (
    <section 
      className={cn(
        "sticky top-0 z-50 w-full overflow-hidden mb-3",
        "transition-[background-color,box-shadow,border-color] duration-700 ease-out",
        "bg-black/85 backdrop-blur-md",
        isCollapsed ? "border-b border-tier-accent/20 shadow-[0_8px_20px_rgba(0,0,0,0.35)]" : "border-b border-transparent shadow-none"
      )}
      style={{
        height: `${height}px`,
        paddingTop: `${padY}px`,
        paddingBottom: `${padY}px`,
      }}
    >
      {/* Subtle background image - fades with progress */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${heroTopoBg})`,
          opacity: bgOpacity,
        }}
      />
      {/* Gradient overlay to keep text readable */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      
      <div className="container mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        {/* Expanded Layout */}
        <div 
          className="transition-all duration-500 ease-out"
          style={{
            opacity: 1 - progress,
            transform: `translateY(${(-8 * progress).toFixed(1)}px)`,
            pointerEvents: progress > 0.9 ? "none" : "auto",
          }}
        >
          {/* Logo - Centered */}
          <div className="flex justify-center mb-12 md:mb-14">
            <Logo29029 size={32} className="text-white/70" />
          </div>

          {/* Hero Content - Centered */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Welcome Statement */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <span className="text-lg md:text-xl tracking-wide font-light text-muted-foreground/80">
                Keep climbing, Alex.
              </span>
            </div>
            
            {/* Name - Most Prominent */}
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-10 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              Alex Rivera
            </h1>
            
            {/* Avatar - Centered */}
            <div 
              className="flex justify-center mb-10 animate-fade-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <div className="relative group">
                <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-tier-accent/50 flex-shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:border-tier-accent group-hover:shadow-[0_0_20px_hsl(var(--tier-accent)/0.4)]">
                  <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
                  <AvatarFallback className="bg-secondary text-foreground text-lg font-semibold">AR</AvatarFallback>
                </Avatar>
                
                {/* Hover Details Card */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 p-5 rounded-xl border border-tier-accent/30 bg-black/95 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 shadow-xl">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Member ID</div>
                  <div className="font-mono text-sm text-foreground mb-3">AR-5847</div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Joined</div>
                  <div className="text-sm text-foreground">January 2023</div>
                </div>
              </div>
            </div>
            
            {/* Subheader with expanded tracking */}
            <div 
              className="text-sm md:text-base tracking-[0.25em] uppercase font-light text-muted-foreground/60 animate-fade-in"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              Member Since 2023
            </div>
          </div>
        </div>

        {/* Collapsed Layout */}
        <div 
          className="grid grid-cols-3 items-center gap-4 transition-all duration-500 ease-out"
          style={{
            opacity: progress,
            transform: `translateY(${(8 * (1 - progress)).toFixed(1)}px)`,
            pointerEvents: progress < 0.1 ? "none" : "auto",
          }}
        >
          {/* Left: Avatar + Name */}
          <div className="flex items-center gap-3 justify-start min-w-0">
            <Avatar className="w-10 h-10 border-2 border-tier-accent flex-shrink-0">
              <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
              <AvatarFallback className="bg-secondary text-foreground text-sm">AR</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block min-w-0">
              <div className="text-base font-semibold text-foreground truncate">Alex Rivera</div>
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
              <div className="text-xs text-muted-foreground uppercase tracking-wider">EP</div>
              <div className="text-xl font-bold text-tier-accent">720</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
