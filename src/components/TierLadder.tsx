import { Sparkles, TrendingUp, Flame, Crown } from "lucide-react";

const tiers = [
  {
    name: "Novus",
    description: "New spark, fresh start",
    icon: Sparkles,
    threshold: 0,
    status: "completed",
    color: "novus",
  },
  {
    name: "Verto",
    description: "Transformation, turning point",
    icon: TrendingUp,
    threshold: 500,
    status: "current",
    color: "verto",
  },
  {
    name: "Ardent",
    description: "Mastery, passion refined",
    icon: Flame,
    threshold: 1000,
    status: "next",
    color: "ardent",
  },
  {
    name: "Sanctum",
    description: "Sacred, inner circle — invitation only",
    icon: Crown,
    threshold: 2000,
    status: "locked",
    color: "sanctum",
  },
];

export const TierLadder = () => {
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">
        Tier Ladder
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          const isCurrent = tier.status === "current";
          const isCompleted = tier.status === "completed";
          const isNext = tier.status === "next";
          const isLocked = tier.status === "locked";
          
          return (
            <div
              key={tier.name}
              className={`
                relative gradient-card border rounded-xl p-6 transition-all duration-300
                ${isCurrent ? `border-${tier.color} ${tier.color}-glow scale-105` : "border-border"}
                ${isNext ? `border-${tier.color}/50` : ""}
                ${isLocked ? "opacity-50" : ""}
                ${isCompleted ? "border-muted" : ""}
                hover:border-${tier.color}/70
              `}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {isCurrent && (
                <div className={`absolute -top-2 -right-2 bg-${tier.color} text-xs font-bold px-3 py-1 rounded-full`}>
                  Current
                </div>
              )}
              
              <div className="mb-4">
                <Icon 
                  className={`w-8 h-8 ${
                    isCurrent || isNext ? `text-${tier.color}` : 
                    isCompleted ? "text-muted-foreground" : 
                    "text-foreground/30"
                  }`} 
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
              
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {tier.threshold === 0 ? "Starting point" : `${tier.threshold}+ AQ`}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
