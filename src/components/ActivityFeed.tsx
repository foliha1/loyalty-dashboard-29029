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
const yearlyActivities: YearlyActivity[] = [{
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
    sessions: [{
      name: "Goal Setting & Strategy",
      coach: "Sarah Chen"
    }, {
      name: "Performance Optimization",
      coach: "Michael Torres"
    }, {
      name: "Mental Resilience",
      coach: "Sarah Chen"
    }, {
      name: "Nutrition Planning",
      coach: "Emma Davis"
    }],
    totalEP: 250
  }
}, {
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
    sessions: [{
      name: "Goal Setting & Strategy",
      coach: "Sarah Chen"
    }, {
      name: "Breathwork Fundamentals",
      coach: "Michael Torres"
    }, {
      name: "Movement Mechanics",
      coach: "Emma Davis"
    }, {
      name: "Recovery Protocols",
      coach: "Sarah Chen"
    }, {
      name: "Peak Performance",
      coach: "Michael Torres"
    }],
    totalEP: 500
  }
}, {
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
    sessions: [{
      name: "Foundations",
      coach: "Emma Davis"
    }, {
      name: "Goal Setting",
      coach: "Sarah Chen"
    }, {
      name: "Habit Building",
      coach: "Michael Torres"
    }],
    totalEP: 300
  }
}];
export const ActivityFeed = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const yearData = yearlyActivities.find(y => y.year.toString() === selectedYear);
  if (!yearData) return null;
  const totalYearEP = yearData.events.totalEP + yearData.apparel.totalEP + yearData.coaching.totalEP;
  
  return (
    <section id="activity-feed">
      <div className="flex items-center mb-5 md:mb-8 px-2">
        <h3 className="text-section-title">
          History
        </h3>
      </div>

      <div className="card-29029 p-6 md:p-8 lg:p-9">
        {/* EPs Earned (dominant) + Year Dropdown */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-9 pb-6 border-b border-border/30 gap-6">
          {/* EPs Earned - LEFT side, dominant */}
          <div className="text-center md:text-left metric-animate">
            <div className="text-subhead mb-3">EPs Earned</div>
            <div className="text-7xl md:text-8xl font-light tracking-tight tabular-nums">
              {totalYearEP}
            </div>
          </div>
          
          {/* Year Dropdown - RIGHT side, compact */}
          <div className="metric-animate-delay-1">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[140px] bg-card/50 border-border/30 text-base">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearlyActivities.map((activity) => (
                  <SelectItem key={activity.year} value={activity.year.toString()}>
                    {activity.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Categories - Inline Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-10">
          {/* Events Section */}
          <div className="metric-animate-delay-2">
            <h4 className="text-subhead mb-4">Events</h4>
            
            <div>
              <div className="text-3xl md:text-4xl font-light tracking-tight mb-3">{yearData.events.totalEP} EPs</div>
              
              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-supporting hover:text-foreground transition-colors group">
                  <span className="text-subhead">View Events</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="text-body font-light">
                    {yearData.events.attended.join(" • ")}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* APPAREL */}
          <div>
            <h4 className="text-subhead mb-4">Apparel</h4>
            <div>
              <div className="text-3xl md:text-4xl font-light tracking-tight mb-3">{yearData.apparel.totalEP} EPs</div>
              
              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-supporting hover:text-foreground transition-colors group">
                  <span className="text-subhead">View Purchases</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="text-body font-light">
                    Purchase history coming soon
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* COACHING */}
          <div>
            <h4 className="text-subhead mb-4">Coaching</h4>
            <div>
              <div className="text-3xl md:text-4xl font-light tracking-tight mb-3">{yearData.coaching.totalEP} EPs</div>
              
              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-supporting hover:text-foreground transition-colors group">
                  <span className="text-subhead">View Sessions</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="space-y-2">
                    {yearData.coaching.sessions.map((session, idx) => <div key={idx} className="text-body font-light pl-4">
                        • {session.name}
                      </div>)}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};