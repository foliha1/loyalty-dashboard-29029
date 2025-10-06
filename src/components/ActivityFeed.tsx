import { CheckCircle2 } from "lucide-react";

const activities = [
  {
    date: "Dec 8, 2025",
    description: "Completed Trail Immersion — Ridge Night",
    aq: 150,
  },
  {
    date: "Dec 1, 2025",
    description: "Wellness Session — Breathwork Fundamentals",
    aq: 120,
  },
  {
    date: "Nov 24, 2025",
    description: "1:1 Coaching — Goal Setting & Strategy",
    aq: 100,
  },
  {
    date: "Nov 15, 2025",
    description: "Trail Experience — Dawn Summit Hike",
    aq: 150,
  },
  {
    date: "Nov 8, 2025",
    description: "Community Gathering — Member Meetup",
    aq: 80,
  },
];

export const ActivityFeed = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">
        Your Recent Ascents
      </h2>
      
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="p-6 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <CheckCircle2 className="w-5 h-5 text-ember mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">
                      {activity.date}
                    </div>
                    <div className="font-medium">{activity.description}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-ember">+{activity.aq}</div>
                  <div className="text-xs text-muted-foreground">AQ</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
