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

const yearlyData: YearData[] = [
  {
    year: 2026,
    tierAchieved: "Base",
    mountain: { totalEvents: 2, summits: 1, verticalFeet: 43500, recognition: 1 },
    trail: { totalEvents: 1, marathons: 2, totalMiles: 52.4, recognition: 1 },
    eps: { events: 180, apparel: 95, coaching: 150 },
  },
  {
    year: 2025,
    tierAchieved: "Ridge",
    mountain: { totalEvents: 5, summits: 3, verticalFeet: 109069, recognition: 3 },
    trail: { totalEvents: 2, marathons: 6, totalMiles: 156.6, recognition: 2 },
    eps: { events: 290, apparel: 180, coaching: 250 },
  },
  {
    year: 2024,
    tierAchieved: "Ridge",
    mountain: { totalEvents: 4, summits: 2, verticalFeet: 87200, recognition: 2 },
    trail: { totalEvents: 3, marathons: 4, totalMiles: 104.8, recognition: 1 },
    eps: { events: 600, apparel: 340, coaching: 500 },
  },
  {
    year: 2023,
    tierAchieved: "Base",
    mountain: { totalEvents: 2, summits: 1, verticalFeet: 42000, recognition: 1 },
    trail: { totalEvents: 1, marathons: 2, totalMiles: 52.4, recognition: 1 },
    eps: { events: 300, apparel: 180, coaching: 300 },
  },
];

// Recognition ladder milestones
const milestones = [1, 2, 3, 4, "5x", "10x"];

// ── Sub-components ───────────────────────────────────

const KPICard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="p-3 md:p-5 border border-border/20 rounded-lg text-center bg-background/30">
    <div className="text-subhead mb-2">
      {label}
    </div>
    <div className="type-metric-secondary text-foreground">
      {typeof value === "number" ? value.toLocaleString() : value}
    </div>
  </div>
);

const RecognitionLadder = ({ current, color = "ridge" }: { current: number; color?: "peak" | "ridge" }) => {
  const getProgressPercent = () => {
    const idx = milestones.findIndex((m) =>
      typeof m === "number" ? m === current : m === `${current}x`
    );
    if (idx === -1) return 0;
    return ((idx + 1) / milestones.length) * 100;
  };

  return (
    <div className="mt-6 md:mt-8">
      <div className="relative h-1.5 bg-muted/20 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out ${color === "peak" ? "bg-peak" : "bg-ridge"}`}
          style={{ width: `${getProgressPercent()}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0 h-0 transition-all duration-700 ease-out"
          style={{
            left: `${getProgressPercent()}%`,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderLeft: `7px solid hsl(var(--${color}))`,
            marginLeft: "-2px",
          }}
        />
      </div>
      <div className="flex justify-between mt-3 px-1">
        {milestones.map((milestone, idx) => {
          const isCurrent = typeof milestone === "number" ? milestone === current : milestone === `${current}x`;
          const isPast = typeof milestone === "number" ? milestone < current : parseInt(String(milestone)) < current;
          return (
            <div key={idx} className="flex flex-col items-center">
              <span className={`text-xs font-light ${isCurrent || isPast ? (color === "peak" ? "text-peak" : "text-ridge") : "text-muted-foreground/40"}`}>
                {milestone}
              </span>
              {milestone === 3 && (
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 mt-2 font-medium">
                  Black Bib
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
  const [selectedYear, setSelectedYear] = useState("2026");
  const data = yearlyData.find((y) => y.year.toString() === selectedYear);
  if (!data) return null;

  const totalEP = data.eps.events + data.eps.apparel + data.eps.coaching;
  const tierColor = tierColorVar[data.tierAchieved] || "ridge";

  return (
    <section>
      {/* Section title + year selector */}
      <div className="flex items-center justify-between mb-5 sm:mb-6 px-0 md:px-2">
        <h3 className="text-section-title">Your Journey</h3>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[110px] bg-card/40 border-border/20 text-sm text-foreground backdrop-blur-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/30 z-50">
            {yearlyData.map((y) => (
              <SelectItem key={y.year} value={y.year.toString()} className="text-foreground">
                {y.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main card */}
      <div className="card-29029 !overflow-visible p-4 sm:p-7 md:p-10">
        {/* Total EPs + Tier Badge row */}
        <div className="flex flex-row items-start justify-between mb-7 sm:mb-8 pb-6 sm:pb-7 border-b border-border/20">
          <div>
            <div className="text-subhead mb-2">
              Total <EPsLabel /> Earned
            </div>
            <div className="type-metric-primary text-foreground">
              {totalEP.toLocaleString()}
            </div>
          </div>
          
          {/* Tier Badge - visually distinct */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="text-subhead">
              Tier Achieved
            </div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border"
              style={{
                borderColor: `hsl(var(--${tierColor}) / 0.4)`,
                background: `linear-gradient(135deg, hsl(var(--${tierColor}) / 0.12) 0%, hsl(var(--${tierColor}) / 0.04) 100%)`,
                boxShadow: `0 0 20px hsl(var(--${tierColor}) / 0.1)`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: `hsl(var(--${tierColor}))` }}
              />
              <span
                className="text-sm font-medium tracking-wide"
                style={{ color: `hsl(var(--${tierColor}))` }}
              >
                {data.tierAchieved}
              </span>
            </div>
          </div>
        </div>

        {/* EP Breakdown */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 sm:mb-10">
          {([
            ["Events", data.eps.events],
            ["Apparel", data.eps.apparel],
            ["Coaching", data.eps.coaching],
          ] as const).map(([label, val]) => (
            <div key={label}>
              <div className="text-subhead mb-2.5">{label}</div>
              <div className="type-metric-secondary text-foreground">
                {val} <span className="text-xs text-muted-foreground/60 font-light">EPs</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mountain / Trail tabs */}
        <Tabs defaultValue="mountain" className="w-full">
          <TabsList className="w-full mb-5 md:mb-6 bg-muted/15 p-1 rounded-lg border border-border/10 flex">
            <TabsTrigger
              value="mountain"
              className="flex-1 py-2.5 min-h-[44px] text-xs uppercase tracking-[0.2em] font-light data-[state=active]:bg-card/80 data-[state=active]:text-peak data-[state=active]:shadow-sm"
            >
              Mountain
            </TabsTrigger>
            <TabsTrigger
              value="trail"
              className="flex-1 py-2.5 min-h-[44px] text-xs uppercase tracking-[0.2em] font-light data-[state=active]:bg-card/80 data-[state=active]:text-ridge data-[state=active]:shadow-sm"
            >
              Trail
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mountain" className="mt-0">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <KPICard label="Total Mtn Events" value={data.mountain.totalEvents} />
              <KPICard label="# Summits" value={data.mountain.summits} />
              <KPICard label="Total Vertical Feet" value={data.mountain.verticalFeet} />
            </div>
            <RecognitionLadder current={data.mountain.recognition} color="peak" />
          </TabsContent>

          <TabsContent value="trail" className="mt-0">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <KPICard label="Total Trail Events" value={data.trail.totalEvents} />
              <KPICard label="# Marathons" value={data.trail.marathons} />
              <KPICard label="Total Miles" value={data.trail.totalMiles} />
            </div>
            <RecognitionLadder current={data.trail.recognition} color="ridge" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
