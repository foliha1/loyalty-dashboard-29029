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
      
      <div className="gradient-card border border-border rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="divide-y divide-border">
          {yearlyActivities.map((yearData) => {
            const totalYearEP = yearData.events.totalEP + yearData.apparel.totalEP + yearData.coaching.totalEP;
            
            return (
              <div key={yearData.year} className="p-8">
                {/* Year header with total EP */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold">{yearData.year}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {totalYearEP} EP
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      Total Earned
                    </div>
                  </div>
                </div>

                {/* Separator */}
                <div className="border-t border-border mb-6" />

                {/* Categories */}
                <div className="space-y-6">
                  {/* EVENTS */}
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Events
                    </h4>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-lg font-semibold mb-2">
                          {yearData.events.total} Events Attended
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {yearData.events.attended.join(" • ")}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className="text-xl font-bold text-foreground">
                          {yearData.events.totalEP} EP
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* APPAREL */}
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Apparel Purchases
                    </h4>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-lg font-semibold">
                          Total Earned
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className="text-xl font-bold text-foreground">
                          {yearData.apparel.totalEP} EP
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* COACHING */}
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Coaching Sessions
                    </h4>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-lg font-semibold">
                          {yearData.coaching.total} Sessions Completed
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className="text-xl font-bold text-foreground">
                          {yearData.coaching.totalEP} EP
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {yearData.coaching.sessions.map((session, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground pl-4">
                          • {session.name} - {session.coach}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
