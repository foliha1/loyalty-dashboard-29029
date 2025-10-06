import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentTier } from "@/lib/tierConfig";

export const UserHeader = () => {
  const currentTierName = "Verto";
  const currentTier = getCurrentTier(currentTierName);
  const TierIcon = currentTier?.icon;

  return (
    <section className="mb-12 animate-fade-in">
      <div className="gradient-card border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{ background: `radial-gradient(circle at top left, hsl(var(--${currentTier?.color})) 0%, transparent 50%)` }}
        />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 relative z-10">
          <div className="flex items-center gap-3 md:gap-4">
            <Avatar className="w-12 h-12 md:w-16 md:h-16 border-2 border-verto">
              <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
              <AvatarFallback className="bg-secondary text-foreground text-base md:text-lg font-semibold">AR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Welcome, Alex Rivera</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold text-foreground">880</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Total AQ
              </div>
            </div>
            {TierIcon && (
              <div className="flex items-center gap-2 bg-secondary px-3 md:px-4 py-2 rounded-lg border border-verto verto-glow">
                <TierIcon className="w-4 h-4 md:w-5 md:h-5 text-verto" />
                <span className="font-semibold text-sm md:text-base">{currentTierName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
