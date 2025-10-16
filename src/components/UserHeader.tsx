import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentTier } from "@/lib/tierConfig";

export const UserHeader = () => {
  const currentTierName = "Ridge";
  const currentTier = getCurrentTier(currentTierName);
  const TierIcon = currentTier?.icon;

  return (
    <section className="mb-12 animate-fade-in">
      <div className="border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden" style={{ backgroundColor: '#343532' }}>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 relative z-10">
          <div className="flex items-center gap-3 md:gap-4">
            <Avatar className="w-12 h-12 md:w-16 md:h-16 border-2 border-ridge">
              <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
              <AvatarFallback className="bg-secondary text-foreground text-base md:text-lg font-semibold">AR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Welcome, Alex Rivera</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className="text-right">
              <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-md font-bold" style={{ backgroundColor: '#1a1a1e' }}>
                <span className="text-xl sm:text-2xl md:text-3xl">720</span>
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Total EP
              </div>
            </div>
            {TierIcon && (
              <div className="flex items-center gap-2 bg-secondary px-3 md:px-4 py-2 rounded-lg border border-ridge ridge-glow">
                <TierIcon className="w-4 h-4 md:w-5 md:h-5 text-ridge" />
                <span className="font-semibold text-xs sm:text-sm md:text-base">{currentTierName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
