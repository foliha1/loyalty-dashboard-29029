import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface YearlyActivity {
  year: number;
  events: {
    total: number;
    attended: string[];
    totalEP: number;
  };
  apparel: {
    totalEP: number;
  };
  coaching: {
    total: number;
    sessions: Array<{
      name: string;
      coach: string;
    }>;
    totalEP: number;
  };
}

const yearlyActivities: YearlyActivity[] = [
  {
    year: 2025,
    events: {
      total: 3,
      attended: ["Snowbasin", "Whistler", "Trail Tahoe"],
      totalEP: 450
    },
    apparel: {
      totalEP: 280
    },
    coaching: {
      total: 4,
      sessions: [
        { name: "Goal Setting & Strategy", coach: "Sarah Chen" },
        { name: "Performance Optimization", coach: "Michael Torres" },
        { name: "Mental Resilience", coach: "Sarah Chen" },
        { name: "Nutrition Planning", coach: "Emma Davis" }
      ],
      totalEP: 400
    }
  },
  {
    year: 2024,
    events: {
      total: 4,
      attended: ["Snowbasin", "Sun Valley", "Stratton", "Whistler"],
      totalEP: 600
    },
    apparel: {
      totalEP: 340
    },
    coaching: {
      total: 5,
      sessions: [
        { name: "Goal Setting & Strategy", coach: "Sarah Chen" },
        { name: "Breathwork Fundamentals", coach: "Michael Torres" },
        { name: "Movement Mechanics", coach: "Emma Davis" },
        { name: "Recovery Protocols", coach: "Sarah Chen" },
        { name: "Peak Performance", coach: "Michael Torres" }
      ],
      totalEP: 500
    }
  },
  {
    year: 2023,
    events: {
      total: 2,
      attended: ["Trail Tahoe", "Stratton"],
      totalEP: 300
    },
    apparel: {
      totalEP: 180
    },
    coaching: {
      total: 3,
      sessions: [
        { name: "Foundations", coach: "Emma Davis" },
        { name: "Goal Setting", coach: "Sarah Chen" },
        { name: "Habit Building", coach: "Michael Torres" }
      ],
      totalEP: 300
    }
  }
];

export const ActivityFeed = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">
        Your Activity
      </h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {yearlyActivities.map((yearData) => {
            const totalYearEP = yearData.events.totalEP + yearData.apparel.totalEP + yearData.coaching.totalEP;
            
            return (
              <CarouselItem key={yearData.year} className="pl-2 md:pl-4 basis-full sm:basis-[85%] md:basis-[48%] lg:basis-[32%]">
                <div className="border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-muted-foreground/50 backdrop-blur-sm h-full" style={{ backgroundColor: '#343532' }}>
                  {/* Year header with total EP */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold">{yearData.year}</h3>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-foreground">
                        {totalYearEP} EP
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        Total Earned
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-4 md:space-y-6">
                    {/* EVENTS */}
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 md:mb-3">
                        Events
                      </h4>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-base md:text-lg font-semibold mb-2">
                            {yearData.events.total} Events Attended
                          </div>
                          <div className="text-xs md:text-sm text-muted-foreground break-words">
                            {yearData.events.attended.join(" • ")}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3 md:ml-4">
                          <div className="text-lg md:text-xl font-bold text-foreground">
                            {yearData.events.totalEP} EP
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* APPAREL */}
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 md:mb-3">
                        Apparel Purchases
                      </h4>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-base md:text-lg font-semibold">
                            Total Earned
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3 md:ml-4">
                          <div className="text-lg md:text-xl font-bold text-foreground">
                            {yearData.apparel.totalEP} EP
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* COACHING */}
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 md:mb-3">
                        Coaching Sessions
                      </h4>
                      <div className="flex items-start justify-between mb-2 md:mb-3">
                        <div className="flex-1">
                          <div className="text-base md:text-lg font-semibold">
                            {yearData.coaching.total} Sessions Completed
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3 md:ml-4">
                          <div className="text-lg md:text-xl font-bold text-foreground">
                            {yearData.coaching.totalEP} EP
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        {yearData.coaching.sessions.map((session, idx) => (
                          <div key={idx} className="text-xs md:text-sm text-muted-foreground pl-3 md:pl-4 break-words">
                            • {session.name} - {session.coach}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        <CarouselPrevious className="hidden sm:flex -left-4 md:-left-12 bg-[#343532] hover:bg-[#3d3c39] border-muted-foreground/30" />
        <CarouselNext className="hidden sm:flex -right-4 md:-right-12 bg-[#343532] hover:bg-[#3d3c39] border-muted-foreground/30" />
      </Carousel>
    </section>
  );
};
