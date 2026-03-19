import { useState } from "react";
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
    recognition: number;
  };
  trail: {
    totalEvents: number;
    marathons: number;
    totalMiles: number;
    recognition: number;
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
    mountain: { totalEvents: 2, summits: 1, verticalFeet: 43500, recognition: 1 },
    trail: { totalEvents: 1, marathons: 1, totalMiles: 26.2, recognition: 1 },
    eps: { events: 280, apparel: 120, coaching: 180 },
  },
  {
    year: 2025,
    tierAchieved: "Ridge",
    mountain: { totalEvents: 3, summits: 2, verticalFeet: 87200, recognition: 2 },
    trail: { totalEvents: 2, marathons: 3, totalMiles: 78.6, recognition: 1 },
    eps: { events: 350, apparel: 160, coaching: 210 },
  },
  {
    year: 2024,
    tierAchieved: "Base",
    mountain: { totalEvents: 2, summits: 1, verticalFeet: 43500, recognition: 1 },
    trail: { totalEvents: 1, marathons: 2, totalMiles: 52.4, recognition: 1 },
    eps: { events: 240, apparel: 110, coaching: 130 },
  },
  {
    year: 2023,
    tierAchieved: "Base",
    mountain: { totalEvents: 1, summits: 0, verticalFeet: 21750, recognition: 0 },
    trail: { totalEvents: 1, marathons: 1, totalMiles: 26.2, recognition: 0 },
    eps: { events: 150, apparel: 60, coaching: 90 },
  },
  {
    year: 2022,
    tierAchieved: "Base",
    mountain: { totalEvents: 1, summits: 0, verticalFeet: 14500, recognition: 0 },
    trail: { totalEvents: 0, marathons: 0, totalMiles: 0, recognition: 0 },
    eps: { events: 100, apparel: 40, coaching: 0 },
  },
];

// Generate available years from memberSince through currentYear
const availableYears = Array.from(
  { length: currentYear - memberSince + 1 },
  (_, i) => currentYear - i
);

// Fixed milestone markers for awards
const fixedMilestones = [
  { value: 3, label: "Black Bib", mobileLabel: "Black Bib" },
  { value: 5, label: "5x Award", mobileLabel: "5x" },
  { value: 10, label: "10x Award", mobileLabel: "10x" },
];

// ── Sub-components ───────────────────────────────────

const formatCompact = (value: number): string => {
  if (value >= 1000) {
    const k = value / 1000;
    return k % 1 === 0 ? `${k}K` : `${parseFloat(k.toFixed(1))}K`;
  }
  return value.toLocaleString();
};

const KPICard = ({ label, value, compact }: { label: string; value: string | number; compact?: boolean }) => (
  <div className="p-3 md:p-5 border border-border/20 rounded-lg text-center bg-background/30">
    <div className="text-subhead mb-2">
      {label}
    </div>
    <div className="type-metric-secondary text-foreground">
      {typeof value === "number" ? (compact ? formatCompact(value) : value.toLocaleString()) : value}
    </div>
  </div>
);

const RecognitionLadder = ({ current, color = "ridge" }: { current: number; color?: "peak" | "ridge" }) => {
  // Dynamic max: at least 10, or round up past the user's count
  const axisMax = Math.max(10, Math.ceil((current + 1) / 5) * 5);
  // Axis ticks: 0 through axisMax
  const ticks = Array.from({ length: axisMax + 1 }, (_, i) => i);
  const progressPercent = Math.min(100, (current / axisMax) * 100);

  // On mobile, only show milestone ticks (0, 3, 5, 10) + current position
  const milestoneValues = new Set([0, ...fixedMilestones.map((m) => m.value)]);
  const mobileVisibleTicks = new Set([...milestoneValues, current]);

  return (
    <div className="mt-6 md:mt-8">
      <div className="relative h-1.5 bg-muted/20 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out ${color === "peak" ? "bg-peak" : "bg-ridge"}`}
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0 h-0 transition-all duration-700 ease-out"
          style={{
            left: `${progressPercent}%`,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderLeft: `7px solid hsl(var(--${color}))`,
            marginLeft: "-2px",
          }}
        />
      </div>
      <div className="flex justify-between mt-3 px-1">
        {ticks.map((tick) => {
          const isPast = tick <= current;
          const milestone = fixedMilestones.find((m) => m.value === tick);
          const isMobileVisible = mobileVisibleTicks.has(tick);
          return (
            <div key={tick} className="flex flex-col items-center" style={{ minWidth: 0, flex: '1 1 0' }}>
              <span className={`text-sm font-light ${!isMobileVisible ? 'hidden sm:inline' : ''} ${isPast ? (color === "peak" ? "text-peak" : "text-ridge") : "text-muted-foreground"}`}>
                {tick}
              </span>
              {milestone && (
                <span className="text-sm uppercase tracking-[0.06em] sm:tracking-[0.12em] text-muted-foreground mt-2 font-medium whitespace-nowrap">
                  {milestone.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

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

  // For years without detailed data, show a minimal placeholder
  const fallbackData: YearData = {
    year: parseInt(selectedYear),
    tierAchieved: "Base",
    mountain: { totalEvents: 0, summits: 0, verticalFeet: 0, recognition: 0 },
    trail: { totalEvents: 0, marathons: 0, totalMiles: 0, recognition: 0 },
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

      {/* Main card */}
      <div className="card-29029 !overflow-visible p-4 sm:p-7 md:p-10">
        {/* Current Year indicator inside card */}
        {isCurrentYear && (
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_hsl(0_0%_100%/0.5)]" />
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Current Year
            </span>
          </div>
        )}
        {/* EPs summary + Tier row */}
        <div className="mb-6 sm:mb-8 pb-6 sm:pb-7 border-b border-border/20">
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
                <div className="type-metric-primary text-foreground">
                  {totalEP.toLocaleString()}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-subhead mb-2">
                  Tier Achieved
                </div>
                <div
                  className="type-metric-primary"
                  style={{ color: `hsl(var(--${tierColor}))` }}
                >
                  {activeData.tierAchieved}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* EP Breakdown */}
        <h4 className="text-sm uppercase tracking-[0.2em] font-medium text-foreground/90 mb-5">EPs Breakdown</h4>
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 sm:mb-10">
          {([
            ["Events", activeData.eps.events],
            ["Apparel", activeData.eps.apparel],
            ["Coaching", activeData.eps.coaching],
          ] as const).map(([label, val]) => (
            <div key={label}>
              <div className="text-subhead mb-2.5">{label}</div>
              <div className="type-metric-secondary text-foreground">
                {val} <span className="text-sm text-muted-foreground font-light">EPs</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mountain / Trail tabs */}
        <div className="border-t border-border/20 pt-6 sm:pt-8 mt-2">
          <h4 className="text-sm uppercase tracking-[0.2em] font-medium text-foreground/90 mb-5">Your Event Stats</h4>
        </div>
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
              <KPICard label="Total Events" value={activeData.mountain.totalEvents} />
              <KPICard label="# of Finishes" value={activeData.mountain.summits} />
              <KPICard label="Total Vert Ft" value={activeData.mountain.verticalFeet} compact />
            </div>
            <RecognitionLadder current={activeData.mountain.recognition} color="peak" />
          </TabsContent>

          <TabsContent value="trail" className="mt-0">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <KPICard label="Total Events" value={activeData.trail.totalEvents} />
              <KPICard label="# of Marathons" value={activeData.trail.marathons} />
              <KPICard label="Total Miles" value={activeData.trail.totalMiles} compact />
            </div>
            <RecognitionLadder current={activeData.trail.recognition} color="ridge" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
