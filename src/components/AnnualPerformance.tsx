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

// ── Recognition Bar ──────────────────────────────────
const axisMax = 10;
const milestoneLabels: Record<number, string> = {
  3: "Black Bib",
  5: "5x Award",
  10: "10x Award",
};
const milestoneTicks = [0, 3, 5, 10];

const RecognitionBar = ({ finishes, color }: { finishes: number; color: "peak" | "ridge" }) => {
  const capped = Math.min(finishes, axisMax);
  const fillPercent = (capped / axisMax) * 100;
  const cssColor = `hsl(var(--${color}))`;

  return (
    <div className="mt-4 sm:mt-6">
      <div className="text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em] font-medium text-foreground/90 mb-3">
        Finish Milestones
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-[hsl(var(--border))] rounded-full" role="progressbar" aria-valuenow={capped} aria-valuemin={0} aria-valuemax={axisMax} aria-label={`Finish milestones progress: ${capped} of ${axisMax}`}>
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${fillPercent}%`, backgroundColor: cssColor }}
        />
        {capped > 0 && (
          <div
            className="absolute w-3.5 h-3.5 rounded-full transition-all duration-700 ease-out"
            style={{
              left: `${fillPercent}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: cssColor,
              boxShadow: `0 0 8px ${cssColor.replace(')', ' / 0.25)')}`,
            }}
          />
        )}
      </div>

      {/* Ticks: all 0–10 */}
      <div className="relative mt-2" style={{ height: '5.5rem' }}>
        {Array.from({ length: axisMax + 1 }, (_, i) => {
          const pct = (i / axisMax) * 100;
          const hasMilestone = !!milestoneLabels[i];
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2"
              style={{ left: `${pct}%` }}
            >
              <div className="w-px h-1.5 bg-border/40 mb-1 mx-auto" />
              <div className="flex flex-col items-center gap-1.5">
                <span className={`text-[10px] tabular-nums ${i === capped && capped > 0 ? '' : i < capped ? 'text-foreground/70' : 'text-muted-foreground/60'}`} style={i === capped && capped > 0 ? { color: cssColor } : undefined}>
                  {i}
                </span>
                {hasMilestone && (
                  <span
                    className={`text-[10px] uppercase tracking-wider whitespace-nowrap ${i === capped && capped > 0 ? '' : i < capped ? 'text-foreground/70' : 'text-muted-foreground/60'}`}
                    style={{ writingMode: 'vertical-lr', height: '4rem', ...(i === capped && capped > 0 ? { color: cssColor } : {}) }}
                  >
                    {milestoneLabels[i]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>


      {/* Beyond 10 summary */}
      {finishes > axisMax && (
        <div className="mt-2 text-sm text-foreground/80">
          <span style={{ color: cssColor }} className="font-medium">{finishes}</span> Finishes — 10x Award Earned
        </div>
      )}

      {/* Zero state */}
      {finishes === 0 && (
        <div className="mt-2 text-sm text-muted-foreground">
          Complete your first finish to start tracking milestones
        </div>
      )}
    </div>
  );
};

// ── Main Component ───────────────────────────────────

export const AnnualPerformance = () => {
    return (
    <section>
      <h3 className="text-section-title mb-5 sm:mb-6 px-0 md:px-2">Your Event Stats</h3>

      <div className="card-29029 !overflow-visible p-4 sm:p-7 md:p-10">
        <Tabs defaultValue="mountain" className="w-full">
          <TabsList className="w-full mb-5 md:mb-6 bg-transparent p-1 rounded-full border border-border/10 flex gap-2">
            <TabsTrigger
              value="mountain"
              className="flex-1 py-2.5 min-h-[44px] text-sm uppercase tracking-[0.1em] font-light rounded-full border border-transparent transition-all data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-none data-[state=active]:border-[hsl(5_85%_50%/0.4)] data-[state=active]:bg-[hsl(5_85%_50%/0.1)] data-[state=active]:text-[hsl(5_85%_60%)]"
            >
              Mountain
            </TabsTrigger>
            <TabsTrigger
              value="trail"
              className="flex-1 py-2.5 min-h-[44px] text-sm uppercase tracking-[0.1em] font-light rounded-full border border-transparent transition-all data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-none data-[state=active]:border-[hsl(38_92%_50%/0.4)] data-[state=active]:bg-[hsl(38_92%_50%/0.1)] data-[state=active]:text-[hsl(38_92%_60%)]"
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
            <RecognitionBar finishes={mountainData.summits} color="peak" />
          </TabsContent>

          <TabsContent value="trail" className="mt-0">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <KPICard label="Total Events" shortLabel="Events" value={trailData.totalEvents} />
              <KPICard label="# of Finishes" shortLabel="Finishes" value={trailData.marathons} />
              <KPICard label="Total Miles" shortLabel="Miles" value={trailData.totalMiles} compact />
            </div>
            <RecognitionBar finishes={trailData.marathons} color="ridge" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
