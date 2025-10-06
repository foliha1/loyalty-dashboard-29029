import { useEffect, useState } from "react";

export const ProgressHero = () => {
  const [mounted, setMounted] = useState(false);
  const currentAQ = 880;
  const nextTierAQ = 1000;
  const percentage = 88;
  
  // Circle calculations
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider">
          Ascension Progress
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Circular Progress */}
          <div className="relative">
            <svg className="transform -rotate-90" width="200" height="200">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="hsl(var(--ember))"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={mounted ? strokeDashoffset : circumference}
                strokeLinecap="round"
                className="transition-all duration-1500 ease-out ember-glow"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-ember">{percentage}%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                Complete
              </div>
            </div>
          </div>

          {/* Progress Details */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Current AQ This Cycle
              </div>
              <div className="text-4xl font-bold">{currentAQ}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                AQ to Next Tier
              </div>
              <div className="text-2xl font-semibold text-foreground/80">
                {nextTierAQ - currentAQ} AQ remaining
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Next Tier
              </div>
              <div className="text-3xl font-bold text-ember flex items-center gap-2">
                Ardent
                <span className="text-sm text-muted-foreground font-normal">
                  — mastery, passion refined
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <div className="px-3 py-1.5 bg-secondary/50 rounded-md text-xs font-medium border border-border">
                Trail
              </div>
              <div className="px-3 py-1.5 bg-secondary/50 rounded-md text-xs font-medium border border-border">
                Wellness
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
