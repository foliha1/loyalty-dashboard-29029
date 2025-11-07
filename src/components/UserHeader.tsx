import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentTier } from "@/lib/tierConfig";

export const UserHeader = () => {
  const currentTierName = "Ridge";
  const currentTier = getCurrentTier(currentTierName);
  const TierIcon = currentTier?.icon;

  return (
    <section className="mb-12 animate-fade-in">
      <div 
        className="border border-border rounded-2xl p-8 md:p-10 relative overflow-hidden card-elevated-high"
        style={{ 
          backgroundColor: '#0a0a0a',
          background: 'radial-gradient(circle at top left, rgba(94, 184, 173, 0.05) 0%, transparent 50%)'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center relative z-10">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <Avatar 
              className="w-16 h-16 md:w-20 md:h-20 border-2 transition-all duration-300"
              style={{ 
                borderColor: `hsl(var(--${currentTier?.color}))`,
                boxShadow: `0 0 20px hsl(var(--${currentTier?.color}) / 0.3)`
              }}
            >
              <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
              <AvatarFallback className="bg-secondary text-foreground text-lg font-semibold">AR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">Alex Rivera</h1>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                29029 ID: AR-5847
              </div>
              <div className="text-xs text-warm-gray-light mt-0.5">
                Member since 2023
              </div>
            </div>
          </div>

          {/* EP Stats */}
          <div className="text-left lg:text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Total EP This Cycle
            </div>
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold" style={{ backgroundColor: '#1a1a1e' }}>
              <span className="text-3xl md:text-4xl">720</span>
            </div>
          </div>

          {/* Tier Badge */}
          <div className="flex justify-start lg:justify-end">
            {TierIcon && (
              <div 
                className="flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: '#0f0f0f',
                  borderColor: `hsl(var(--${currentTier?.color}))`,
                  boxShadow: `0 0 24px hsl(var(--${currentTier?.color}) / 0.2)`
                }}
              >
                <TierIcon className="w-5 h-5" style={{ color: `hsl(var(--${currentTier?.color}))` }} />
                <span className="font-bold text-base tracking-wide">{currentTierName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
