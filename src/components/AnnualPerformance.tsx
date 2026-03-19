import { useState } from "react";
import { Lock, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EPsLabel } from "@/components/EPsLabel";

// ── Data ──────────────────────────────────────────────
interface YearData {
  year: number;
  tierAchieved: string;
  mountain: {
    totalEvents: number;
    summits: number;
    verticalFeet: number;
  };
  trail: {
    totalEvents: number;
    marathons: number;
    totalMiles: number;
  };
  eps: {
    events: number;
    apparel: number;
    coaching: number;
  };
}

const memberSince = 2022;
const currentYear = 2026;

const yearlyData: YearData[] = [
  {
    year: 2026,
    tierAchieved: "Ridge",
    mountain: { totalEvents: 2, summits: 3, verticalFeet: 43500 },
    trail: { totalEvents: 1, marathons: 1, totalMiles: 26.2 },
    eps: { events: 280, apparel: 120, coaching: 180 },
  },
  {
    year: 2025,
    tierAchieved: "Ridge",
    mountain: { totalEvents: 3, summits: 2, verticalFeet: 87200 },
    trail: { totalEvents: 2, marathons: 3, totalMiles: 78.6 },
    eps: { events: 350, apparel: 160, coaching: 210 },
  },
  {
    year: 2024,
    tierAchieved: "Base",
    mountain: { totalEvents: 2, summits: 1, verticalFeet: 43500 },
    trail: { totalEvents: 1, marathons: 2, totalMiles: 52.4 },
    eps: { events: 240, apparel: 110, coaching: 130 },
  },
  {
    year: 2023,
    tierAchieved: "Base",
    mountain: { totalEvents: 1, summits: 0, verticalFeet: 21750 },
    trail: { totalEvents: 1, marathons: 1, totalMiles: 26.2 },
    eps: { events: 150, apparel: 60, coaching: 90 },
  },
  {
    year: 2022,
    tierAchieved: "Base",
    mountain: { totalEvents: 1, summits: 0, verticalFeet: 14500 },
    trail: { totalEvents: 0, marathons: 0, totalMiles: 0 },
    eps: { events: 100, apparel: 40, coaching: 0 },
  },
];

const availableYears = Array.from(
  { length: currentYear - memberSince + 1 },
  (_, i) => currentYear - i
);

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
  <div className="mt-4 sm:mt-6">
    <div className="text-subhead mb-3">Finish Milestones</div>
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

// ── Tier color map ───────────────────────────────────
const tierColorVar: Record<string, string> = {
  Base: "base",
  Ridge: "ridge",
  Peak: "peak",
  "Summit Circle": "summit",
};

// ── Main Component ───────────────────────────────────

export const AnnualPerformance = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const data = yearlyData.find((y) => y.year.toString() === selectedYear);

  const fallbackData: YearData = {
    year: parseInt(selectedYear),
    tierAchieved: "Base",
    mountain: { totalEvents: 0, summits: 0, verticalFeet: 0 },
    trail: { totalEvents: 0, marathons: 0, totalMiles: 0 },
    eps: { events: 0, apparel: 0, coaching: 0 },
  };
  const activeData = data || fallbackData;

  const totalEP = activeData.eps.events + activeData.eps.apparel + activeData.eps.coaching;
  const tierColor = tierColorVar[activeData.tierAchieved] || "ridge";
  const isCurrentYear = selectedYear === currentYear.toString();

  return (
    <section>
      {/* Section title + year selector */}
      <div className="flex flex-wrap items-baseline justify-between gap-y-2 mb-5 sm:mb-6 px-0 md:px-2">
        <h3 className="text-section-title">Your Journey</h3>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[110px] bg-card/40 border-border/20 text-sm text-foreground backdrop-blur-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/30 z-50">
            {availableYears.map((year) => (
              <SelectItem key={year} value={year.toString()} className="text-foreground">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {/* Card 1 — EPs Summary + Breakdown */}
        <div className="card-29029 !overflow-visible p-4 sm:p-7 md:p-10">
          {isCurrentYear && (
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_hsl(0_0%_100%/0.5)]" />
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Current Year
              </span>
            </div>
          )}
          {/* EPs summary */}
          <div className="mb-6 sm:mb-8">
            {isCurrentYear ? (
              <p className="type-metric-secondary text-foreground">
                Your current <EPsLabel /> total is{" "}
                <span className="underline decoration-1 underline-offset-4">
                  {totalEP.toLocaleString()}
                </span>
              </p>
            ) : (
              <div className="flex flex-row items-start justify-between">
                <div>
                  <div className="text-subhead mb-2">
                    Total <EPsLabel /> Earned
                  </div>
                  <div className="type-metric-secondary text-foreground">
                    {totalEP.toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-subhead mb-2">Tier Achieved</div>
                  <div className="type-metric-primary" style={{ color: `hsl(var(--${tierColor}))` }}>
                    {activeData.tierAchieved}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* EP Breakdown */}
          <h4 className="text-sm uppercase tracking-[0.2em] font-medium text-foreground/90 mb-5">EPs Breakdown</h4>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {([
              ["Events", activeData.eps.events],
              ["Apparel", activeData.eps.apparel],
              ["Coaching", activeData.eps.coaching],
            ] as const).map(([label, val]) => (
              <div key={label}>
                <div className="text-subhead mb-2.5">{label}</div>
                <div className="type-metric-secondary text-foreground">
                  {val}
                </div>
                <div className="text-xs text-muted-foreground font-light mt-0.5">EPs</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 — Event Stats + Milestones */}
        <div className="card-29029 !overflow-visible p-4 sm:p-7 md:p-10">
          <h4 className="text-sm uppercase tracking-[0.2em] font-medium text-foreground/90 mb-5">Your Event Stats</h4>
          <Tabs defaultValue="mountain" className="w-full">
            <TabsList className="w-full mb-5 md:mb-6 bg-muted/15 p-1 rounded-lg border border-border/10 flex">
              <TabsTrigger
                value="mountain"
                className="flex-1 py-2.5 min-h-[44px] text-sm uppercase tracking-[0.15em] font-light data-[state=active]:bg-card/80 data-[state=active]:text-peak data-[state=active]:shadow-sm"
              >
                Mountain
              </TabsTrigger>
              <TabsTrigger
                value="trail"
                className="flex-1 py-2.5 min-h-[44px] text-sm uppercase tracking-[0.15em] font-light data-[state=active]:bg-card/80 data-[state=active]:text-ridge data-[state=active]:shadow-sm"
              >
                Trail
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mountain" className="mt-0">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <KPICard label="Total Events" shortLabel="Events" value={activeData.mountain.totalEvents} />
                <KPICard label="# of Finishes" shortLabel="Finishes" value={activeData.mountain.summits} />
                <KPICard label="Total Vert Ft" shortLabel="Vert Ft" value={activeData.mountain.verticalFeet} compact />
              </div>
              <MilestoneBadges current={activeData.mountain.summits} color="peak" />
            </TabsContent>

            <TabsContent value="trail" className="mt-0">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <KPICard label="Total Events" shortLabel="Events" value={activeData.trail.totalEvents} />
                <KPICard label="# of Marathons" shortLabel="Marathons" value={activeData.trail.marathons} />
                <KPICard label="Total Miles" shortLabel="Miles" value={activeData.trail.totalMiles} compact />
              </div>
              <MilestoneBadges current={activeData.trail.marathons} color="ridge" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
