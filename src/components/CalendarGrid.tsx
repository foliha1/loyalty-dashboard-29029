import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpcomingEvent {
  eventName: string;
  eventType: "Everest" | "Basecamp" | "Trail";
  eventDates: string;
  location: string;
}

// Toggle this to test empty state
const upcomingEvents: UpcomingEvent[] = [];

// Example with events:
// const upcomingEvents: UpcomingEvent[] = [
//   {
//     eventName: "Snowbasin",
//     eventType: "Everest",
//     eventDates: "Jun 11-14, 2025",
//     location: "Snowbasin, Utah",
//   },
//   {
//     eventName: "Rainier",
//     eventType: "Everest",
//     eventDates: "Jun 25-28, 2025",
//     location: "Rainier, Washington",
//   },
//   {
//     eventName: "Mont-Tremblant",
//     eventType: "Everest",
//     eventDates: "Jul 23-26, 2025",
//     location: "Mont-Tremblant, Quebec",
//   },
// ];
export const CalendarGrid = () => {
  const hasEvents = upcomingEvents.length > 0;

  return (
    <section className="section-reveal">
      <div className="divider-red mb-20" />
      
      <h3 className="text-section-title mb-8">
        Continue the Journey
      </h3>
      
      {hasEvents ? (
        <>
          <p className="text-supporting text-base mb-16 max-w-2xl">
            Your upcoming events
          </p>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="card-29029 p-8 group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Event Type Badge */}
                <div className="mb-6">
                  <span className={cn(
                    "text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest font-semibold",
                    event.eventType === "Everest" && "bg-red-900/30 border border-red-700/50 text-red-400",
                    event.eventType === "Basecamp" && "bg-blue-900/30 border border-blue-700/50 text-blue-400",
                    event.eventType === "Trail" && "bg-amber-900/30 border border-amber-700/50 text-amber-200"
                  )}>
                    {event.eventType}
                  </span>
                </div>

                {/* Location - Hero */}
                <h4 className="text-2xl font-bold mb-3 uppercase tracking-wide group-hover:text-tier-accent transition-colors">
                  {event.location}
                </h4>

                {/* Divider */}
                <div className="h-px w-12 bg-tier-accent/40 mb-4" />

                {/* Date */}
                <p className="text-supporting text-sm uppercase tracking-wider">
                  {event.eventDates}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Empty State Card */}
          <div className="card-29029 p-16 text-center mb-20 max-w-3xl mx-auto">
            <div className="h-px w-24 bg-tier-accent/40 mx-auto mb-8" />
            
            <h4 className="text-2xl font-bold mb-4 tracking-wide">
              Your Next Challenge Awaits
            </h4>
            
            <p className="text-supporting text-base max-w-xl mx-auto leading-relaxed">
              You're not currently registered for any events. Explore our upcoming experiences 
              and find your next summit.
            </p>
            
            <div className="h-px w-24 bg-tier-accent/40 mx-auto mt-8" />
          </div>
        </>
      )}

      {/* CTAs Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border/20">
        <a
          href="#events"
          className="group p-8 bg-card/30 hover:bg-card/50 border border-border/20 hover:border-tier-accent/30 rounded-lg transition-all duration-300 flex items-center justify-between"
        >
          <div>
            <h5 className="text-lg font-semibold mb-1 uppercase tracking-wide">
              {hasEvents ? "Discover Events" : "Discover Challenges"}
            </h5>
            <p className="text-supporting text-xs uppercase tracking-wider">
              Browse All Experiences
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-tier-accent group-hover:translate-x-1 transition-transform" />
        </a>

        <a
          href="#coaching"
          className="group p-8 bg-card/30 hover:bg-card/50 border border-border/20 hover:border-tier-accent/30 rounded-lg transition-all duration-300 flex items-center justify-between"
        >
          <div>
            <h5 className="text-lg font-semibold mb-1 uppercase tracking-wide">
              1:1 Coaching
            </h5>
            <p className="text-supporting text-xs uppercase tracking-wider">
              Personal Experience
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-tier-accent group-hover:translate-x-1 transition-transform" />
        </a>

        <a
          href="#apparel"
          className="group p-8 bg-card/30 hover:bg-card/50 border border-border/20 hover:border-tier-accent/30 rounded-lg transition-all duration-300 flex items-center justify-between"
        >
          <div>
            <h5 className="text-lg font-semibold mb-1 uppercase tracking-wide">
              Apparel
            </h5>
            <p className="text-supporting text-xs uppercase tracking-wider">
              Shop Collection
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-tier-accent group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};