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
      className="relative z-10 w-full overflow-hidden mb-3 bg-background/90 backdrop-blur-md border-b border-transparent pt-14 pb-5 sm:pb-6 md:pb-7"
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
          <div className="flex justify-center mb-4 sm:mb-5 md:mb-6 animate-fade-in">
            <Logo29029 size={38} className="text-white/70" />
          </div>

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
                  <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
                  <AvatarFallback className="bg-secondary text-foreground text-lg font-semibold">AR</AvatarFallback>
                </Avatar>
              </button>
            </div>
            
            {/* Full Name - Primary Heading */}
            <h1 
              className="text-3xl sm:text-3xl md:text-4xl font-light tracking-tight mb-1 sm:mb-2 px-2 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'both', textShadow: '0 2px 8px rgba(0,0,0,0.4)', lineHeight: '1.1' }}
            >
              Alex Rivera
            </h1>
            
            {/* ID Number - Secondary Metadata */}
            <div className="mb-3 sm:mb-4 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <span className="text-xs tracking-[0.25em] uppercase font-normal text-muted-foreground" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                29029 ID: AR-5847
              </span>
            </div>
            
            {/* Member Since */}
            <div 
              className="text-xs tracking-[0.2em] uppercase font-normal animate-fade-in"
              style={{ 
                animationDelay: '0.4s', 
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
