import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

      <div className="card-29029 p-4 md:p-8 lg:p-9">
        {/* EPs Earned (dominant) + Year Dropdown */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-5 border-b border-border/30 gap-4 md:gap-6">
          {/* EPs Earned - LEFT side, dominant */}
          <div className="text-center md:text-left metric-animate">
            <div className="text-subhead mb-2">EPs Earned</div>
            <div className="text-4xl md:text-6xl font-light tracking-tight tabular-nums">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
          {/* Events Section */}
          <div className="metric-animate-delay-2">
            <h4 className="text-subhead mb-4">Events</h4>
            
            <div>
              <div className="text-2xl md:text-3xl font-light tracking-tight mb-2">{yearData.events.totalEP} EPs</div>
              <div className="text-body font-light text-muted-foreground">
                {yearData.events.attended.join(" • ")}
              </div>
            </div>
          </div>

          {/* APPAREL */}
          <div>
            <h4 className="text-subhead mb-4">Apparel</h4>
            <div>
              <div className="text-2xl md:text-3xl font-light tracking-tight">{yearData.apparel.totalEP} EPs</div>
            </div>
          </div>

          {/* COACHING */}
          <div>
            <h4 className="text-subhead mb-4">Coaching</h4>
            <div>
              <div className="text-2xl md:text-3xl font-light tracking-tight">{yearData.coaching.totalEP} EPs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};