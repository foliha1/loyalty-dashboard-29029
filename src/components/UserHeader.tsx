import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo29029 } from "@/components/Logo29029";

import { useNavigate } from "react-router-dom";
import { useTier } from "@/contexts/TierContext";
import { getCurrentTier } from "@/lib/tierConfig";
import heroTopoBg from "@/assets/hero-topo-bg.jpg";

export const UserHeader = () => {
  const navigate = useNavigate();
  const { currentTier: currentTierName } = useTier();
  const currentTier = getCurrentTier(currentTierName);
  
  return (
    <section 
      className="relative z-10 w-full overflow-hidden mb-3 bg-background border-b border-transparent pt-[72px] sm:pt-20 pb-5 sm:pb-6 md:pb-7"
    >
      {/* Subtle background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${heroTopoBg})`,
          opacity: currentTierName === "The 29" ? 0.04 : 0.15,
        }}
      />
      {/* Gradient overlay to keep text readable */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: currentTierName === "The 29"
            ? "linear-gradient(180deg, rgba(255,248,240,0.9) 0%, rgba(255,248,240,0.75) 50%, rgba(255,248,240,0.95) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      
      <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 relative z-10">
        <div>

          {/* Hero Content - Centered */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Avatar - Click to navigate to profile */}
            <div 
              className="flex justify-center mb-3 sm:mb-4 animate-fade-in"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              <button 
                onClick={() => navigate("/profile")}
                className="relative group cursor-pointer min-w-[44px] min-h-[44px]"
              >
                <Avatar className="w-14 h-14 sm:w-20 sm:h-20 md:w-22 md:h-22 border-2 border-tier-accent/50 flex-shrink-0 transition-all duration-500 hover:scale-105 hover:border-tier-accent hover:shadow-[0_0_20px_hsl(var(--tier-accent)/0.4)]">
                  <AvatarImage alt="Alex Rivera" />
                  <AvatarFallback className="bg-card/30 flex items-center justify-center">
                    <Logo29029 size={24} className="text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </div>
            
            {/* Full Name - Primary Heading */}
            <h1 
              className="type-metric-primary text-foreground mb-1 sm:mb-2 px-2 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'both', textShadow: currentTierName === "The 29" ? 'none' : '0 2px 8px rgba(0,0,0,0.4)', lineHeight: '1.1' }}
            >
              Alex Rivera
            </h1>
            
            {/* Program Name & Member Since */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <span className="text-sm tracking-[0.2em] uppercase font-normal text-muted-foreground" style={{ textShadow: currentTierName === "The 29" ? 'none' : '0 2px 4px rgba(0,0,0,0.5)' }}>
                The Vertical · Member Since 2023
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
