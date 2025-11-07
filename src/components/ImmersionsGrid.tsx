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
      
      <h3 className="text-section-title text-4xl md:text-5xl mb-12 font-editorial">
        Next Immersions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {immersions.map((immersion, index) => (
          <div key={index} className="card-29029 p-8 group metric-animate card-hover-tier">
            {/* Type Badge */}
            <div className="text-[10px] px-3 py-1.5 rounded-full bg-tier-accent/20 border border-tier-accent/50 text-tier-accent uppercase tracking-wider inline-block mb-4">
              {immersion.type}
            </div>

            {/* Event Name */}
            <h3 className="font-editorial text-2xl font-bold mb-3 group-hover:text-tier-accent transition-colors uppercase" style={{ letterSpacing: '0.08em' }}>
              {immersion.title}
            </h3>

            {/* Accent Line */}
            <div className="h-0.5 w-12 bg-tier-accent mb-6" />

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-tier-accent" />
                <span className="text-body">{immersion.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-tier-accent" />
                <span className="text-body">{immersion.location}</span>
              </div>
            </div>

            {/* EP Display */}
            <div className="mb-6 text-center">
              <div className="text-subhead mb-2">Elevation Points</div>
              <div className="metric-medium text-tier-accent">+{immersion.ep}</div>
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
