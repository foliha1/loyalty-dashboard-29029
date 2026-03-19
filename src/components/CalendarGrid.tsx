import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock data from client mockup
const mountainData = {
  totalEvents: 5,
  summits: 3,
  verticalFeet: 109069,
  currentRecognition: 3
};

const trailData = {
  totalEvents: 2,
  marathons: 6,
  totalMiles: 156.6,
  currentRecognition: 2
};

// Recognition ladder milestones
const milestones = [1, 2, 3, 4, "5x", "10x"];

// KPI Card component - simplified, premium styling
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

// Recognition Ladder component - color based on tier type
const RecognitionLadder = ({ current, color = 'ridge' }: { current: number; color?: 'peak' | 'ridge' }) => {
  // Calculate progress percentage based on current recognition
  const getProgressPercent = () => {
    const milestoneIndex = milestones.findIndex(m => 
      typeof m === 'number' ? m === current : m === `${current}x`
    );
    if (milestoneIndex === -1) return 0;
    return ((milestoneIndex + 1) / milestones.length) * 100;
  };

  return (
    <div className="mt-4 md:mt-6">
      {/* Progress arrow track */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${color === 'peak' ? 'bg-peak' : 'bg-ridge'}`}
          style={{ width: `${getProgressPercent()}%` }}
        />
        {/* Arrow head */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0 h-0 transition-all duration-500"
          style={{
            left: `${getProgressPercent()}%`,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: `8px solid hsl(var(--${color}))`,
            marginLeft: '-2px'
          }}
        />
      </div>

      {/* Milestone markers */}
      <div className="flex justify-between mt-3 px-1">
        {milestones.map((milestone, idx) => {
          const isCurrent = typeof milestone === 'number' 
            ? milestone === current 
            : milestone === `${current}x`;
          const isPast = typeof milestone === 'number' 
            ? milestone < current 
            : parseInt(String(milestone)) < current;

          return (
            <div key={idx} className="flex flex-col items-center">
                <span 
                className={`text-sm font-light ${
                  isCurrent || isPast ? (color === 'peak' ? 'text-peak' : 'text-ridge') : 'text-muted-foreground'
                }`}
              >
                {milestone}
              </span>
              {/* BLACK BIB label under milestone 3 */}
              {milestone === 3 && (
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-2 font-medium">
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

export const CalendarGrid = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  // Reveal animation
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
        {/* Segmented Toggle */}
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

        {/* Mountain Content */}
        <TabsContent value="mountain" className="mt-0">
          <div className="card-29029 p-3 md:p-6">
            {/* KPIs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
              <KPICard label="Total Events" value={mountainData.totalEvents} />
              <KPICard label="# of Summits" value={mountainData.summits} />
              <KPICard label="Total Vert Ft" value={mountainData.verticalFeet.toLocaleString()} />
            </div>

            {/* Recognition Ladder */}
            <RecognitionLadder current={mountainData.currentRecognition} color="peak" />
          </div>
        </TabsContent>

        {/* Trail Content */}
        <TabsContent value="trail" className="mt-0">
          <div className="card-29029 p-3 md:p-6">
            {/* KPIs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
              <KPICard label="Total Events" value={trailData.totalEvents} />
              <KPICard label="# of Marathons" value={trailData.marathons} />
              <KPICard label="Total Miles" value={trailData.totalMiles} />
            </div>

            {/* Recognition Ladder */}
            <RecognitionLadder current={trailData.currentRecognition} color="ridge" />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
