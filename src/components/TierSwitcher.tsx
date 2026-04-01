import { useTier } from "@/contexts/TierContext";
import { tiers } from "@/lib/tierConfig";

const tierColors: Record<string, string> = {
  base: "hsl(var(--base))",
  ridge: "hsl(var(--ridge))",
  peak: "hsl(var(--peak))",
  summit: "hsl(var(--summit))",
};

export const TierSwitcher = () => {
  const { currentTier, setCurrentTier } = useTier();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 border border-border/30 rounded-lg p-3 backdrop-blur-sm">
      <p className="text-xs text-muted-foreground mb-2 tracking-wider uppercase text-center">Tier Preview</p>
      <div className="flex gap-1.5">
        {tiers.map((tier) => {
          const isActive = currentTier === tier.name;
          const color = tierColors[tier.color];
          return (
            <button
              key={tier.name}
              onClick={() => setCurrentTier(tier.name)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
              style={{
                borderColor: isActive ? color : "hsl(var(--border) / 0.3)",
                color: isActive ? color : "hsl(var(--muted-foreground))",
                background: isActive ? `${color.replace(")", " / 0.1)")}` : "transparent",
              }}
            >
              {tier.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
