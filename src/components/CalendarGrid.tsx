import { useState, useEffect } from "react";
import { Lock, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const mountainData = {
  totalEvents: 5,
  summits: 3,
  verticalFeet: 109069,
};

const trailData = {
  totalEvents: 2,
  marathons: 6,
  totalMiles: 156.6,
};

const KPICard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="p-2.5 md:p-4 border border-white/10 rounded-lg text-center">
    <div className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-1 font-light">
      {label}
    </div>
    <div className="text-2xl md:text-4xl font-light tabular-nums text-white">
      {value}
    </div>
  </div>
);

const milestones = [
  { name: "Black Bib", threshold: 3 },
  { name: "5x Award", threshold: 5 },
  { name: "10x Award", threshold: 10 },
];

const MilestoneBadges = ({ current, color = "ridge" }: { current: number; color?: "peak" | "ridge" }) => (
  <div className="mt-4 md:mt-6">
    <div className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-3 font-light">
      Finish Milestones
    </div>
    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
      {milestones.map((m) => {
        const unlocked = current >= m.threshold;
        const remaining = m.threshold - current;
        return (
          <div
            key={m.name}
            className={`rounded-lg border text-center flex flex-col items-center justify-center p-2.5 md:p-4 transition-all ${
              unlocked
                ? `border-white/20 bg-white/5 shadow-[0_0_12px_-4px_hsl(var(--${color})/0.3)]`
                : "border-white/5 bg-white/[0.02] opacity-60"
            }`}
          >
            <div className={`text-[10px] sm:text-xs uppercase tracking-wider font-medium mb-2 ${unlocked ? "text-white" : "text-muted-foreground"}`}>
              {m.name}
            </div>
            {unlocked ? (
              <Check className={`w-5 h-5 mb-1.5 ${color === "peak" ? "text-peak" : "text-ridge"}`} strokeWidth={2.5} />
            ) : (
              <Lock className="w-4 h-4 mb-1.5 text-muted-foreground/60" strokeWidth={1.5} />
            )}
            <div className={`text-[10px] sm:text-xs font-light ${unlocked ? (color === "peak" ? "text-peak" : "text-ridge") : "text-muted-foreground"}`}>
              {unlocked ? "Earned" : `${remaining} more needed`}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export const CalendarGrid = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <h3 className="text-section-title mb-4 sm:mb-4 md:mb-5 px-2">
        Continue the Journey
      </h3>
      
      <Tabs defaultValue="mountain" className="w-full">
        <TabsList className="mb-3 md:mb-4 bg-muted/20 p-1 rounded-lg">
          <TabsTrigger 
            value="mountain" 
            className="px-5 py-1.5 text-sm uppercase tracking-[0.15em] font-light data-[state=active]:bg-card data-[state=active]:text-red-500"
          >
            Mountain
          </TabsTrigger>
          <TabsTrigger 
            value="trail" 
            className="px-5 py-1.5 text-sm uppercase tracking-[0.15em] font-light data-[state=active]:bg-card data-[state=active]:text-amber-500"
          >
            Trail
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mountain" className="mt-0">
          <div className="card-29029 p-3 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
              <KPICard label="Total Events" value={mountainData.totalEvents} />
              <KPICard label="# of Finishes" value={mountainData.summits} />
              <KPICard label="Total Vert Ft" value={mountainData.verticalFeet.toLocaleString()} />
            </div>
            <MilestoneBadges current={mountainData.summits} color="peak" />
          </div>
        </TabsContent>

        <TabsContent value="trail" className="mt-0">
          <div className="card-29029 p-3 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
              <KPICard label="Total Events" value={trailData.totalEvents} />
              <KPICard label="# of Marathons" value={trailData.marathons} />
              <KPICard label="Total Miles" value={trailData.totalMiles} />
            </div>
            <MilestoneBadges current={trailData.marathons} color="ridge" />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
