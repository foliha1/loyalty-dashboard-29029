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
    <section className="mb-24 section-reveal">
      <div className="divider-red mb-12" />
      
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-section-title text-4xl md:text-5xl font-editorial">
          History
        </h2>
        
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[140px] h-12 border-border bg-black hover:border-[#DD0033] transition-colors font-semibold">
            <SelectValue />
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

      <div className="card-29029 p-10 md:p-14">
        {/* Year Display - More Dramatic */}
        <div className="flex items-center justify-between mb-12 pb-8 border-b-2 border-[#DD0033]/20">
          <h3 className="font-editorial text-6xl md:text-7xl font-bold">
            {yearData.year}
          </h3>
          
          <div className="text-right">
            <div className="font-editorial text-5xl font-bold mb-1">
              {totalYearEP}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Total EP Earned
            </div>
          </div>
        </div>

        {/* Categories - More Spacing */}
        <div className="space-y-10">
          {/* Events Section */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-3">
              <span>Events</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#DD0033]/30 to-transparent" />
            </h4>
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-editorial text-3xl font-bold mb-2">
                  {yearData.events.totalEP} EP
                </div>
                
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#DD0033] transition-colors group">
                    <span className="uppercase tracking-wider">View Events</span>
                    <ChevronDown className="h-4 w-4 text-[#DD0033]" />
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
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-3">
              <span>Apparel</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#DD0033]/30 to-transparent" />
            </h4>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-editorial text-3xl font-bold mb-2">
                  {yearData.apparel.totalEP} EP
                </div>
                
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#DD0033] transition-colors group">
                    <span className="uppercase tracking-wider">View Purchases</span>
                    <ChevronDown className="h-4 w-4 text-[#DD0033]" />
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
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-3">
              <span>Coaching</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#DD0033]/30 to-transparent" />
            </h4>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-editorial text-3xl font-bold mb-2">
                  {yearData.coaching.totalEP} EP
                </div>
                
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#DD0033] transition-colors group">
                    <span className="uppercase tracking-wider">View Subscriptions</span>
                    <ChevronDown className="h-4 w-4 text-[#DD0033]" />
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
