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
    <section>
      <div className="divider-red mb-16 md:mb-20" />
      
      <h3 className="text-section-title mb-6 md:mb-8 px-2">
        Continue the Journey
      </h3>
      
      {hasEvents ? (
        <>
          <p className="text-supporting text-sm md:text-base mb-12 md:mb-16 max-w-2xl px-2">
            Your upcoming events
          </p>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="card-29029 p-6 md:p-8 group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* Event Type Badge */}
                <div className="mb-5 md:mb-6">
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
                <h4 className="text-xl md:text-2xl font-bold mb-3 uppercase tracking-wide group-hover:text-tier-accent transition-colors">
                  {event.location}
                </h4>

                {/* Divider */}
                <div className="h-px w-10 md:w-12 bg-tier-accent/40 mb-3 md:mb-4 group-hover:w-16 transition-all" />

                {/* Date */}
                <p className="text-supporting text-xs md:text-sm uppercase tracking-wider">
                  {event.eventDates}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Empty State Card */}
          <div className="card-29029 p-10 md:p-16 text-center mb-16 md:mb-20 max-w-3xl mx-auto">
            <div className="h-px w-20 md:w-24 bg-tier-accent/40 mx-auto mb-6 md:mb-8" />
            
            <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-wide px-4">
              Your Next Challenge Awaits
            </h4>
            
            <p className="text-supporting text-sm md:text-base max-w-xl mx-auto leading-relaxed px-4">
              You're not currently registered for any events. Explore our upcoming experiences 
              and find your next summit.
            </p>
            
            <div className="h-px w-20 md:w-24 bg-tier-accent/40 mx-auto mt-6 md:mt-8" />
          </div>
        </>
      )}

      {/* CTAs Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-10 md:pt-12 border-t border-border/20">
        <a
          href="#events"
          className="group p-6 md:p-8 bg-card/30 hover:bg-card/50 border border-border/20 hover:border-tier-accent/30 rounded-lg transition-all duration-300 flex items-center justify-between hover:-translate-y-1"
        >
          <div>
            <h5 className="text-base md:text-lg font-semibold mb-1 uppercase tracking-wide">
              {hasEvents ? "Discover Events" : "Discover Challenges"}
            </h5>
            <p className="text-supporting text-[10px] md:text-xs uppercase tracking-wider">
              Browse All Experiences
            </p>
          </div>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-tier-accent group-hover:translate-x-2 transition-transform" />
        </a>

        <a
          href="#coaching"
          className="group p-6 md:p-8 bg-card/30 hover:bg-card/50 border border-border/20 hover:border-tier-accent/30 rounded-lg transition-all duration-300 flex items-center justify-between hover:-translate-y-1"
        >
          <div>
            <h5 className="text-base md:text-lg font-semibold mb-1 uppercase tracking-wide">
              1:1 Coaching
            </h5>
            <p className="text-supporting text-[10px] md:text-xs uppercase tracking-wider">
              Personal Experience
            </p>
          </div>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-tier-accent group-hover:translate-x-2 transition-transform" />
        </a>

        <a
          href="#apparel"
          className="group p-6 md:p-8 bg-card/30 hover:bg-card/50 border border-border/20 hover:border-tier-accent/30 rounded-lg transition-all duration-300 flex items-center justify-between hover:-translate-y-1"
        >
          <div>
            <h5 className="text-base md:text-lg font-semibold mb-1 uppercase tracking-wide">
              Apparel
            </h5>
            <p className="text-supporting text-[10px] md:text-xs uppercase tracking-wider">
              Shop Collection
            </p>
          </div>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-tier-accent group-hover:translate-x-2 transition-transform" />
        </a>
      </div>
    </section>
  );
};