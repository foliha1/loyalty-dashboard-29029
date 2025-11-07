import { tiers } from "@/lib/tierConfig";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const tierStatuses = ["completed", "current", "next"] as const;

export const TierLadder = () => {
  // Filter out Summit Circle and map statuses
  const visibleTiers = tiers
    .filter(tier => tier.name !== "Summit Circle")
    .map((tier, index) => ({
      ...tier,
      status: tierStatuses[index],
    }));

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wider">
        Tiers
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleTiers.map((tier, index) => {
          const Icon = tier.icon;
          const isCurrent = tier.status === "current";
          const isCompleted = tier.status === "completed";
          const isNext = tier.status === "next";
          
          return (
            <div
              key={tier.name}
              className="relative border rounded-xl p-6 transition-all duration-300 hover-lift h-full flex flex-col"
              style={{ 
                backgroundColor: '#343532',
                animationDelay: `${0.3 + index * 0.1}s`,
                borderColor: isCurrent || isCompleted ? `hsl(var(--${tier.color}))` : 
                             isNext ? `hsl(var(--${tier.color}) / 0.5)` : "hsl(var(--border))",
                boxShadow: isCurrent ? `0 0 24px hsl(var(--${tier.color}) / 0.3)` : "none",
              }}
            >
              {isCurrent && (
                <div className="absolute top-3 right-3 text-[10px] font-medium px-2 py-1 rounded-md text-muted-foreground uppercase tracking-wider bg-background/50">
                  Current Tier
                </div>
              )}
              
              <div className="mb-4">
                <Icon 
                  className="w-8 h-8"
                  style={{ 
                    color: isCurrent || isNext || isCompleted ? `hsl(var(--${tier.color}))` : 
                           "hsl(var(--foreground) / 0.3)"
                  }}
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {tier.name === "Base" ? "Starting Point" : tier.threshold === 1000 ? "Mastery" : tier.description}
              </p>
              
              <div className="space-y-3 mt-auto">
                {tier.threshold === 0 ? (
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Starting Point
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-md font-bold text-sm" style={{ backgroundColor: '#1a1a1e' }}>
                    {tier.threshold}+ EP
                  </div>
                )}
                
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group w-full">
                    <span>View Rewards</span>
                    <ChevronDown 
                      className="h-4 w-4 transition-all duration-200 group-data-[state=open]:rotate-180" 
                      style={{ color: 'hsl(var(--accent-29029))' }}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div className="text-xs text-muted-foreground p-3 rounded-md bg-background/50">
                      <p>Tier rewards and benefits coming soon.</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
