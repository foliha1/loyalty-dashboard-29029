import { Calendar, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface RegistrationWindow {
  eventName: string;
  eventType: "Mountain" | "Trail";
  registrationOpens: string;
  eventDates: string;
  location: string;
  hasPriorityAccess: boolean;
}
const registrationWindows: RegistrationWindow[] = [{
  eventName: "Snowbasin",
  eventType: "Mountain",
  registrationOpens: "Nov 6, 2025 at 12P EST",
  eventDates: "Jun 11-14, 2025",
  location: "Snowbasin",
  hasPriorityAccess: true
}, {
  eventName: "Rainier",
  eventType: "Mountain",
  registrationOpens: "Nov 6, 2025 at 12P EST",
  eventDates: "Jun 25-28, 2025",
  location: "Rainier",
  hasPriorityAccess: true
}, {
  eventName: "Mont-Tremblant",
  eventType: "Mountain",
  registrationOpens: "Nov 6, 2025 at 12P EST",
  eventDates: "Jul 23-26, 2025",
  location: "Mont-Tremblant",
  hasPriorityAccess: true
}, {
  eventName: "Steamboat",
  eventType: "Mountain",
  registrationOpens: "Nov 6, 2025 at 12P EST",
  eventDates: "Aug 13-16, 2025",
  location: "Steamboat",
  hasPriorityAccess: true
}, {
  eventName: "Whistler",
  eventType: "Mountain",
  registrationOpens: "Nov 6, 2025 at 12P EST",
  eventDates: "Aug 27-30, 2025",
  location: "Whistler",
  hasPriorityAccess: true
}, {
  eventName: "Sun Valley",
  eventType: "Mountain",
  registrationOpens: "Nov 6, 2025 at 12P EST",
  eventDates: "Sep 10-13, 2025",
  location: "Sun Valley",
  hasPriorityAccess: true
}, {
  eventName: "TRAIL Park City",
  eventType: "Trail",
  registrationOpens: "Nov 6, 2025 at 12P EST",
  eventDates: "Sep 16-20, 2025",
  location: "Park City",
  hasPriorityAccess: true
}, {
  eventName: "TRAIL Tahoe",
  eventType: "Trail",
  registrationOpens: "Nov 6, 2025 at 12P EST",
  eventDates: "Oct 7-11, 2025",
  location: "Tahoe",
  hasPriorityAccess: false
}, {
  eventName: "Stratton",
  eventType: "Mountain",
  registrationOpens: "Nov 6, 2025 at 12P EST",
  eventDates: "Oct 22-25, 2025",
  location: "Stratton",
  hasPriorityAccess: false
}];
export const CalendarGrid = () => {
  return <section className="mb-24 section-reveal">
      <div className="divider-red mb-12" />
      
      <h3 className="text-section-title mb-12">
        The Year Ahead
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {registrationWindows.map((event, idx) => <div key={idx} className="card-29029 p-8 relative overflow-hidden group metric-animate card-hover-tier">
            {/* Badges Row */}
            <div className="flex items-center justify-between mb-6">
              <span className={cn("text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider font-semibold", event.eventType === "Mountain" ? "bg-red-900/30 border border-red-700/50 text-red-400" : "bg-amber-900/30 border border-amber-700/50 text-amber-200")}>
                {event.eventType}
              </span>
              
              {event.hasPriorityAccess && <span className="text-[10px] px-3 py-1.5 rounded-full bg-tier-accent/20 border border-tier-accent/50 text-tier-accent uppercase tracking-wider">
                  Priority Access
                </span>}
            </div>

            {/* Event Name - Large & Bold */}
            <h3 className="font-editorial text-3xl font-bold mb-6 group-hover:text-tier-accent transition-colors uppercase" style={{
          letterSpacing: '0.08em'
        }}>
              {event.eventName}
            </h3>

            {/* Accent Line */}
            <div className="h-0.5 w-16 bg-tier-accent mb-6" />

            {/* Details */}
            <div className="space-y-3">
              <div>
                <span className="text-subhead">Registration Opens</span>
                <div className="text-body mt-1">{event.registrationOpens}</div>
              </div>
              
              <div>
                <span className="text-subhead">Event Dates</span>
                <div className="text-body mt-1">{event.eventDates}</div>
              </div>
              
              <div>
                <span className="text-subhead">Location</span>
                <div className="text-body mt-1">{event.location}</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="w-full mt-8 bg-tier-accent hover:bg-tier-accent/80 text-white font-semibold uppercase tracking-wider transition-colors">
              Learn More
            </Button>
          </div>)}
      </div>
    </section>;
};