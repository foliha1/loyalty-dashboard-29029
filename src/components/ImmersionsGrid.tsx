import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const immersions = [
  {
    title: "Ridge Night Challenge",
    date: "Dec 15, 2025",
    location: "Summit Trail",
    ep: 150,
    type: "Trail",
    available: true,
  },
  {
    title: "Wellness Immersion",
    date: "Dec 22, 2025",
    location: "Sanctuary Lodge",
    ep: 120,
    type: "Wellness",
    available: true,
  },
  {
    title: "1:1 Coaching Session",
    date: "Jan 5, 2026",
    location: "Virtual",
    ep: 100,
    type: "Coaching",
    available: true,
  },
  {
    title: "Winter Elevation Series",
    date: "Jan 12, 2026",
    location: "Mountain Base",
    ep: 200,
    type: "Trail",
    available: false,
  },
];

export const ImmersionsGrid = () => {
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">
        Next Immersions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {immersions.map((immersion, index) => (
          <div
            key={index}
            className="border border-border rounded-xl p-6 transition-all duration-300 hover:border-muted-foreground/50 group backdrop-blur-sm"
            style={{ backgroundColor: '#343532' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs text-foreground uppercase tracking-wider mb-2 font-semibold">
                  {immersion.type}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-foreground/80 transition-colors">
                  {immersion.title}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">+{immersion.ep}</div>
                <div className="text-xs text-muted-foreground">EP</div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{immersion.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{immersion.location}</span>
              </div>
            </div>
            
            <Button 
              variant="enroll"
              className="w-full font-semibold"
              disabled={!immersion.available}
            >
              {immersion.available ? "Enroll" : "Request Invite"}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
