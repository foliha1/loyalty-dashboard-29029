import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo29029 } from "@/components/Logo29029";
import { useNavigate } from "react-router-dom";
import { useTier } from "@/contexts/TierContext";
import { getCurrentTier } from "@/lib/tierConfig";
import heroTopoBg from "@/assets/hero-topo-bg.jpg";
import { type, motion, shadows } from "@/design/tokens";

export const UserHeader = () => {
  const navigate = useNavigate();
  const { currentTier: currentTierName } = useTier();
  const currentTier = getCurrentTier(currentTierName);
  
  return (
    <section 
      className="relative z-10 w-full overflow-hidden mb-3 bg-black/85 backdrop-blur-md border-b border-transparent py-8 sm:py-10 md:py-12"
    >
      {/* Subtle background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${heroTopoBg})`,
          opacity: 0.15,
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
      
      <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 relative z-10">
        <div>
          {/* Logo - Centered */}
          <div className="flex justify-center mb-8 sm:mb-10 md:mb-14">
            <Logo29029 size={38} className="text-white/70" />
          </div>

          {/* Hero Content - Centered */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Premium ID Number */}
            <div className="mb-4 sm:mb-5 md:mb-6 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <span className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-normal text-muted-foreground" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                29029 ID: AR-5847
              </span>
            </div>
            
            {/* Welcome Statement - Most Prominent */}
            <h1 
              className="mb-5 sm:mb-6 px-2 animate-fade-in"
              style={{ 
                ...type.heroH1,
                fontSize: '2.25rem',
                animationDelay: '0.2s', 
                animationFillMode: 'both', 
                textShadow: shadows.md 
              }}
            >
              Keep climbing, Alex.
            </h1>
            
            {/* Stats Row - Centered layout */}
            <div 
              className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 items-center justify-center mb-6 sm:mb-8 md:mb-10 animate-fade-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              {/* Avatar - Click to navigate to profile */}
              <button 
                onClick={() => navigate("/profile")}
                className="relative group cursor-pointer min-w-[44px] min-h-[44px]"
              >
                <Avatar 
                  className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 border-2 border-tier-accent/50 flex-shrink-0 hover:scale-105 hover:border-tier-accent hover:shadow-[0_0_20px_hsl(var(--tier-accent)/0.4)]"
                  style={{ transition: `all ${motion.durations.medium} ${motion.easing.softSpring}` }}
                >
                  <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
                  <AvatarFallback 
                    className="bg-secondary text-foreground"
                    style={{ fontSize: type.meta.fontSize, fontWeight: type.meta.fontWeight }}
                  >AR</AvatarFallback>
                </Avatar>
              </button>
            </div>
            
            {/* Subheader with expanded tracking */}
            <div 
              className="text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.25em] uppercase font-normal animate-fade-in px-4"
              style={{ 
                animationDelay: '0.5s', 
                animationFillMode: 'both', 
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                color: currentTier ? `hsl(var(--${currentTier.color}))` : 'hsl(var(--muted-foreground))'
              }}
            >
              Member Since 2023
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
