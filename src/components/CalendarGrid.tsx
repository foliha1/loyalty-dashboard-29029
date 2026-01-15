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

// KPI Card component
const KPICard = ({ 
  label, 
  value, 
  accentColor 
}: { 
  label: string; 
  value: string | number; 
  accentColor: string;
}) => (
  <div 
    className="p-4 md:p-6 border rounded-lg text-center"
    style={{ borderColor: `hsl(${accentColor} / 0.4)` }}
  >
    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-light">
      {label}
    </div>
    <div 
      className="text-3xl md:text-4xl font-light tabular-nums"
      style={{ color: `hsl(${accentColor})` }}
    >
      {value}
    </div>
  </div>
);

// Recognition Ladder component
const RecognitionLadder = ({ 
  current, 
  accentColor 
}: { 
  current: number; 
  accentColor: string;
}) => {
  // Calculate progress percentage based on current recognition
  const getProgressPercent = () => {
    const milestoneIndex = milestones.findIndex(m => 
      typeof m === 'number' ? m === current : m === `${current}x`
    );
    if (milestoneIndex === -1) return 0;
    return ((milestoneIndex + 1) / milestones.length) * 100;
  };

  return (
    <div className="mt-8 md:mt-10">
      {/* Progress arrow track */}
      <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{ 
            width: `${getProgressPercent()}%`,
            backgroundColor: `hsl(${accentColor})`
          }}
        />
        {/* Arrow head */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0 h-0 transition-all duration-500"
          style={{
            left: `${getProgressPercent()}%`,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: `10px solid hsl(${accentColor})`,
            marginLeft: '-2px'
          }}
        />
      </div>

      {/* Milestone markers */}
      <div className="flex justify-between mt-4 px-1">
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
                className="text-sm md:text-base font-light"
                style={{ 
                  color: isCurrent || isPast 
                    ? `hsl(${accentColor})` 
                    : 'hsl(var(--muted-foreground))' 
                }}
              >
                {milestone}
              </span>
              {/* BLACK BIB label under milestone 3 */}
              {milestone === 3 && (
                <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground mt-1">
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

  // Color configs
  const mountainAccent = "5 85% 50%"; // Red
  const trailAccent = "38 92% 50%"; // Gold/Yellow

  return (
    <section>
      <h3 className="text-section-title mb-5 sm:mb-5 md:mb-6 px-2">
        Continue the Journey
      </h3>
      
      <Tabs defaultValue="mountain" className="w-full">
        {/* Segmented Toggle */}
        <TabsList className="mb-6 md:mb-8 bg-muted/20 p-1 rounded-lg">
          <TabsTrigger 
            value="mountain" 
            className="px-6 py-2 text-xs uppercase tracking-[0.2em] font-light data-[state=active]:bg-card data-[state=active]:text-red-500"
          >
            Mountain
          </TabsTrigger>
          <TabsTrigger 
            value="trail" 
            className="px-6 py-2 text-xs uppercase tracking-[0.2em] font-light data-[state=active]:bg-card data-[state=active]:text-amber-500"
          >
            Trail
          </TabsTrigger>
        </TabsList>

        {/* Mountain Content */}
        <TabsContent value="mountain" className="mt-0">
          <div className="card-29029 p-6 md:p-8">
            {/* KPIs Row */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <KPICard 
                label="Total Mtn Events" 
                value={mountainData.totalEvents} 
                accentColor={mountainAccent}
              />
              <KPICard 
                label="# Summits" 
                value={mountainData.summits} 
                accentColor={mountainAccent}
              />
              <KPICard 
                label="Total Vertical Feet" 
                value={mountainData.verticalFeet.toLocaleString()} 
                accentColor={mountainAccent}
              />
            </div>

            {/* Recognition Ladder */}
            <RecognitionLadder 
              current={mountainData.currentRecognition} 
              accentColor={mountainAccent}
            />
          </div>
        </TabsContent>

        {/* Trail Content */}
        <TabsContent value="trail" className="mt-0">
          <div className="card-29029 p-6 md:p-8">
            {/* KPIs Row */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <KPICard 
                label="Total Trail Events" 
                value={trailData.totalEvents} 
                accentColor={trailAccent}
              />
              <KPICard 
                label="# Marathons" 
                value={trailData.marathons} 
                accentColor={trailAccent}
              />
              <KPICard 
                label="Total Miles" 
                value={trailData.totalMiles} 
                accentColor={trailAccent}
              />
            </div>

            {/* Recognition Ladder */}
            <RecognitionLadder 
              current={trailData.currentRecognition} 
              accentColor={trailAccent}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* CTAs Section */}
      <div className="pt-7 sm:pt-9 md:pt-10 mt-5 sm:mt-5 md:mt-6 border-t border-border/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 max-w-6xl mx-auto">
          <a
            href="https://29029everesting.com/collections/tickets"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden px-5 sm:px-6 py-7 sm:py-8 md:py-9 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-muted/10 min-h-[180px]"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex-1">
              <h5 className="text-base sm:text-lg md:text-xl font-light mb-2 tracking-tight leading-tight !text-foreground">
                Discover 29029 Events
              </h5>
              <p className="text-foreground/60 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-6 sm:mb-8">
                Browse All Experiences
              </p>
              
              {/* Underline sweep effect */}
              <div className="relative inline-block">
                <span className="text-foreground text-xs uppercase tracking-[0.25em] font-light">
                  Explore
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            </div>
            
            <ArrowRight className="relative z-10 w-5 h-5 text-primary mt-6 group-hover:translate-x-2 transition-transform duration-500" />
          </a>

          <a
            href="https://29029coaching.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden px-5 sm:px-6 py-7 sm:py-8 md:py-9 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-muted/10 min-h-[180px]"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex-1">
              <h5 className="text-base sm:text-lg md:text-xl font-light mb-2 tracking-tight leading-tight !text-foreground">
                Discover 29029 Experience Coaching
              </h5>
              <p className="text-foreground/60 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-6 sm:mb-8">
                Personal Experience
              </p>
              
              {/* Underline sweep effect */}
              <div className="relative inline-block">
                <span className="text-foreground text-xs uppercase tracking-[0.25em] font-light">
                  Learn More
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            </div>
            
            <ArrowRight className="relative z-10 w-5 h-5 text-primary mt-6 group-hover:translate-x-2 transition-transform duration-500" />
          </a>

          <a
            href="https://29029everesting.com/collections/frontpage"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden px-5 sm:px-6 py-7 sm:py-8 md:py-9 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-muted/10 min-h-[180px]"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex-1">
              <h5 className="text-base sm:text-lg md:text-xl font-light mb-2 tracking-tight leading-tight !text-foreground">
                Discover 29029 Apparel
              </h5>
              <p className="text-foreground/60 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-6 sm:mb-8">
                Shop Collection
              </p>
              
              {/* Underline sweep effect */}
              <div className="relative inline-block">
                <span className="text-foreground text-xs uppercase tracking-[0.25em] font-light">
                  Shop Now
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            </div>
            
            <ArrowRight className="relative z-10 w-5 h-5 text-primary mt-6 group-hover:translate-x-2 transition-transform duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
};
