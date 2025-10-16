import { tiers } from "@/lib/tierConfig";

const tierStatuses = ["completed", "current", "next", "locked"] as const;

export const TierLadder = () => {
  const tiersWithStatus = tiers.map((tier, index) => ({
    ...tier,
    status: tierStatuses[index],
  }));

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wider">
        Tier Ladder
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {tiersWithStatus.map((tier, index) => {
          const Icon = tier.icon;
          const isCurrent = tier.status === "current";
          const isCompleted = tier.status === "completed";
          const isNext = tier.status === "next";
          const isLocked = tier.status === "locked";
          
          return (
            <div
              key={tier.name}
              className="relative border rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-105 h-full flex flex-col"
              style={{ 
                backgroundColor: '#343532',
                animationDelay: `${0.3 + index * 0.1}s`,
                borderColor: isCurrent ? `hsl(var(--${tier.color}))` : 
                             isNext ? `hsl(var(--${tier.color}) / 0.5)` :
                             isCompleted ? `hsl(var(--${tier.color}))` : "hsl(var(--border))",
                boxShadow: isCurrent ? `0 0 20px hsl(var(--${tier.color}) / 0.3)` : "none",
                opacity: isLocked ? 0.5 : 1,
              }}
            >
              {isCurrent && (
                <div 
                  className="absolute top-2 right-2 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `hsl(var(--${tier.color}))`, color: '#1a1a1a' }}
                >
                  CURRENT
                </div>
              )}
              
              {isCompleted && (
                <div 
                  className="absolute top-2 right-2 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `hsl(var(--${tier.color}))`, color: '#1a1a1a' }}
                >
                  ACHIEVED
                </div>
              )}
              
              <div className="mb-4">
                <Icon 
                  className="w-6 h-6 md:w-8 md:h-8"
                  style={{ 
                    color: isCurrent || isNext || isCompleted ? `hsl(var(--${tier.color}))` : 
                           "hsl(var(--foreground) / 0.3)"
                  }}
                />
              </div>
              
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-4 flex-grow">{tier.description}</p>
              
          <div className="mt-auto">
            {tier.threshold === 0 ? (
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Starting point
              </div>
            ) : (
              <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-md font-bold text-xs" style={{ backgroundColor: '#1a1a1e' }}>
                {tier.threshold}+ EP
              </div>
            )}
          </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
