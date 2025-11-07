import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
      totalEP: 290
    },
    apparel: {
      totalEP: 180
    },
    coaching: {
      total: 4,
      sessions: [
        { name: "Goal Setting & Strategy", coach: "Sarah Chen" },
        { name: "Performance Optimization", coach: "Michael Torres" },
        { name: "Mental Resilience", coach: "Sarah Chen" },
        { name: "Nutrition Planning", coach: "Emma Davis" }
      ],
      totalEP: 250
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
  const [selectedYear, setSelectedYear] = useState("2025");
  const yearData = yearlyActivities.find(y => y.year.toString() === selectedYear);
  
  if (!yearData) return null;
  
  const totalYearEP = yearData.events.totalEP + yearData.apparel.totalEP + yearData.coaching.totalEP;
  
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
          History
        </h2>
        
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[120px] border-border bg-background hover:border-[#DD0033] transition-colors">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-border">
            {yearlyActivities.map((yearData) => (
              <SelectItem 
                key={yearData.year} 
                value={yearData.year.toString()}
                className="hover:bg-[#DD0033]/10 focus:bg-[#DD0033]/20"
              >
                {yearData.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full border border-border rounded-xl p-8 transition-all duration-300 hover:border-muted-foreground/50 card-elevated" style={{ backgroundColor: '#343532' }}>
        {/* Year header with total EP */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-4xl md:text-5xl font-bold">{yearData.year}</h3>
          <div className="text-right">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold" style={{ backgroundColor: '#1a1a1e' }}>
              <span className="text-2xl md:text-3xl">{totalYearEP} EP</span>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              Total Earned
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {/* EVENTS */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Events
            </h4>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-lg font-bold mb-1">
                  Total EP Earned
                </div>
                <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-md font-bold mb-3" style={{ backgroundColor: '#1a1a1e' }}>
                  {yearData.events.totalEP} EP
                </div>
                
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <span>View Events</span>
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 text-[#DD0033]" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div className="text-sm text-muted-foreground">
                      {yearData.events.attended.join(" • ")}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-border/50" />

          {/* APPAREL */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Apparel
            </h4>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-lg font-bold mb-1">
                  Total EP Earned
                </div>
                <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-md font-bold mb-3" style={{ backgroundColor: '#1a1a1e' }}>
                  {yearData.apparel.totalEP} EP
                </div>
                
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <span>View Purchases</span>
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 text-[#DD0033]" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div className="text-sm text-muted-foreground">
                      Purchase history coming soon
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-border/50" />

          {/* COACHING */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Coaching
            </h4>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-lg font-bold mb-1">
                  Total EP Earned
                </div>
                <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-md font-bold mb-3" style={{ backgroundColor: '#1a1a1e' }}>
                  {yearData.coaching.totalEP} EP
                </div>
                
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <span>View Subscriptions</span>
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 text-[#DD0033]" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div className="space-y-2">
                      {yearData.coaching.sessions.map((session, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground pl-4">
                          • {session.name}
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
