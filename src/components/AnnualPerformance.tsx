import { Lock, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ── Data ──────────────────────────────────────────────
const mountainData = { totalEvents: 2, summits: 3, verticalFeet: 43500 };
const trailData = { totalEvents: 1, marathons: 1, totalMiles: 26.2 };

// ── Sub-components ───────────────────────────────────

const formatCompact = (value: number): string => {
  if (value >= 1000) {
    const k = value / 1000;
    return k % 1 === 0 ? `${k}K` : `${parseFloat(k.toFixed(1))}K`;
  }
  return value.toLocaleString();
};

const KPICard = ({ label, shortLabel, value, compact }: { label: string; shortLabel?: string; value: string | number; compact?: boolean }) => (
  <div className="p-2 sm:p-3 md:p-5 border border-border/20 rounded-lg text-center bg-background/30">
    <div className="text-subhead mb-2">
      {shortLabel ? (
        <>
          <span className="sm:hidden">{shortLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      ) : label}
    </div>
    <div className="type-metric-secondary text-foreground">
      {typeof value === "number" ? (compact ? formatCompact(value) : value.toLocaleString()) : value}
    </div>
  </div>
);

// ── Milestone badges ─────────────────────────────────
const milestones = [
  { name: "Black Bib", threshold: 3 },
  { name: "5x Award", threshold: 5 },
  { name: "10x Award", threshold: 10 },
];

const MilestoneBadges = ({ current, color = "ridge" }: { current: number; color?: "peak" | "ridge" }) => (
  <div className="mt-3 sm:mt-6">
    <div className="text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em] font-medium text-foreground/90 mb-2">Finish Milestones</div>
    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
      {milestones.map((m) => {
        const unlocked = current >= m.threshold;
        const remaining = m.threshold - current;
        return (
          <div
            key={m.name}
            className={`rounded-lg border text-center flex flex-col items-center justify-center p-2 sm:p-3 md:p-5 transition-all ${
              unlocked
                ? `border-border/30 bg-background/40 shadow-[0_0_12px_-4px_hsl(var(--${color})/0.3)]`
                : "border-border/10 bg-card/20 opacity-60"
            }`}
          >
            <div className={`text-xs uppercase tracking-wide sm:tracking-wider font-medium mb-2 ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
              {m.name}
            </div>
            {unlocked ? (
              <Check className={`w-5 h-5 mb-1.5 ${color === "peak" ? "text-peak" : "text-ridge"}`} strokeWidth={2.5} />
            ) : (
              <Lock className="w-4 h-4 mb-1.5 text-muted-foreground/60" strokeWidth={1.5} />
            )}
            <div className={`text-xs font-light ${unlocked ? (color === "peak" ? "text-peak" : "text-ridge") : "text-muted-foreground"}`}>
              {unlocked ? "Earned" : `${remaining} more needed`}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────

export const AnnualPerformance = () => {
  return (
    <section>
      <h3 className="text-section-title mb-5 sm:mb-6 px-0 md:px-2">Your Event Stats</h3>

      <div className="card-29029 !overflow-visible p-4 sm:p-7 md:p-10">
        <Tabs defaultValue="mountain" className="w-full">
          <TabsList className="w-full mb-5 md:mb-6 bg-muted/15 p-1 rounded-lg border border-border/10 flex">
            <TabsTrigger
              value="mountain"
              className="flex-1 py-2.5 min-h-[44px] text-sm uppercase tracking-[0.1em] font-light data-[state=active]:bg-card/80 data-[state=active]:text-peak data-[state=active]:shadow-sm"
            >
              Mountain
            </TabsTrigger>
            <TabsTrigger
              value="trail"
              className="flex-1 py-2.5 min-h-[44px] text-sm uppercase tracking-[0.1em] font-light data-[state=active]:bg-card/80 data-[state=active]:text-ridge data-[state=active]:shadow-sm"
            >
              Trail
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mountain" className="mt-0">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <KPICard label="Total Events" shortLabel="Events" value={mountainData.totalEvents} />
              <KPICard label="# of Finishes" shortLabel="Finishes" value={mountainData.summits} />
              <KPICard label="Total Vert Ft" shortLabel="Vert Ft" value={mountainData.verticalFeet} compact />
            </div>
            <MilestoneBadges current={mountainData.summits} color="peak" />
          </TabsContent>

          <TabsContent value="trail" className="mt-0">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <KPICard label="Total Events" shortLabel="Events" value={trailData.totalEvents} />
              <KPICard label="# of Finishes" shortLabel="Finishes" value={trailData.marathons} />
              <KPICard label="Total Miles" shortLabel="Miles" value={trailData.totalMiles} compact />
            </div>
            <MilestoneBadges current={trailData.marathons} color="ridge" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
