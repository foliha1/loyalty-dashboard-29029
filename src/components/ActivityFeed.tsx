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
      <div className="divider-red mb-20 md:mb-28" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 md:mb-20 gap-4 px-2">
        <h3 className="text-section-title">
          History
        </h3>
        
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[140px] h-10 md:h-12 border-border bg-black hover:border-tier-accent transition-colors font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-border">
            {yearlyActivities.map(yearData => (
              <SelectItem 
                key={yearData.year} 
                value={yearData.year.toString()} 
                className="hover:bg-tier-accent/20 hover:text-tier-accent focus:bg-tier-accent/20 focus:text-tier-accent"
              >
                {yearData.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="card-29029 p-8 md:p-12 lg:p-14">
        {/* Year Display - More Dramatic */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 pb-8 border-b-2 border-tier-accent/20 gap-6">
          <div className="text-center md:text-left metric-animate">
            <div className="text-subhead mb-2">Year</div>
            <h3 className="font-editorial text-6xl md:text-7xl font-bold">
              {yearData.year}
            </h3>
          </div>
          
          <div className="text-center metric-animate-delay-1">
            <div className="text-subhead mb-2">Total EP Earned</div>
            <div className="metric-large">{totalYearEP}</div>
          </div>
        </div>

        {/* Categories - Inline Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Events Section */}
          <div className="metric-animate-delay-2">
            <h4 className="text-subhead mb-6">Events</h4>
            
            <div>
              <div className="metric-medium mb-2">{yearData.events.totalEP} EP</div>
              
              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-supporting hover:text-tier-accent transition-colors group">
                  <span className="text-subhead">View Events</span>
                  <ChevronDown className="h-4 w-4 text-tier-accent" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="text-body">
                    {yearData.events.attended.join(" • ")}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* APPAREL */}
          <div>
            <h4 className="text-subhead mb-6">Apparel</h4>
            <div>
              <div className="metric-medium mb-2">{yearData.apparel.totalEP} EP</div>
              
              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-supporting hover:text-tier-accent transition-colors group">
                  <span className="text-subhead">View Purchases</span>
                  <ChevronDown className="h-4 w-4 text-tier-accent" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="text-body">
                    Purchase history coming soon
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* COACHING */}
          <div>
            <h4 className="text-subhead mb-6">Coaching</h4>
            <div>
              <div className="metric-medium mb-2">{yearData.coaching.totalEP} EP</div>
              
              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-supporting hover:text-tier-accent transition-colors group">
                  <span className="text-subhead">View Subscriptions</span>
                  <ChevronDown className="h-4 w-4 text-tier-accent" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="space-y-2">
                    {yearData.coaching.sessions.map((session, idx) => <div key={idx} className="text-body pl-4">
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