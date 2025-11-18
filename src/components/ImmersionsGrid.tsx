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
    <section className="mb-24 section-reveal">
      <div className="divider-red mb-12" />
      
      <h2 className="text-section-title mb-12">
        Next Immersions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {immersions.map((immersion, index) => (
          <div key={index} className="card-29029 card-hover-lift p-8 group metric-animate">
            {/* Type Badge */}
            <div className="text-[10px] px-3 py-1.5 rounded-full bg-muted/30 border border-border/50 text-foreground uppercase tracking-wider inline-block mb-4">
              {immersion.type}
            </div>

            {/* Event Name */}
            <h3 className="text-subsection text-xl mb-3 group-hover:text-foreground transition-colors">
              {immersion.title}
            </h3>

            {/* Accent Line */}
            <div className="h-0.5 w-12 bg-primary mb-6" />

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-metadata">{immersion.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-metadata">{immersion.location}</span>
              </div>
            </div>

            {/* EP Display */}
            <div className="mb-6 text-center">
              <div className="text-subhead mb-2">Elevation Points</div>
              <div className="metric-medium text-foreground">+{immersion.ep}</div>
            </div>

            {/* CTA */}
            <Button 
              className="w-full text-white font-semibold uppercase tracking-wider"
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
