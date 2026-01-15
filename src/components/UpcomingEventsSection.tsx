import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import patagoniaImage from "@/assets/patagonia-mountains.jpg";

interface UpcomingEvent {
  eventName: string;
  eventType: "Everest" | "Basecamp" | "Trail";
  eventDates: string;
  location: string;
}

// Calculate days remaining until event
const getDaysRemaining = (dateStr: string): number => {
  const match = dateStr.match(/([A-Za-z]+)\s+(\d+)/);
  if (!match) return 0;
  
  const [, month, day] = match;
  const yearMatch = dateStr.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : String(new Date().getFullYear());
  const monthMap: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };
  
  const eventDate = new Date(parseInt(year, 10), monthMap[month], parseInt(day));
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
};

// Event type color configurations
const eventTypeConfig = {
  Everest: {
    gradient: "linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(127, 29, 29, 0.12) 100%)",
    accentColor: "5 85% 50%",
    glowColor: "5 85% 60%"
  },
  Basecamp: {
    gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(29, 78, 216, 0.12) 100%)",
    accentColor: "217 91% 60%",
    glowColor: "217 91% 70%"
  },
  Trail: {
    gradient: "linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(217, 119, 6, 0.12) 100%)",
    accentColor: "38 92% 50%",
    glowColor: "38 92% 60%"
  }
};

// Event data - locations without state names
const upcomingEvents: UpcomingEvent[] = [
  {
    eventName: "Snowbasin",
    eventType: "Everest",
    eventDates: "Jun 11-14, 2026",
    location: "Snowbasin",
  },
  {
    eventName: "Tahoe Trail",
    eventType: "Trail",
    eventDates: "May 15-16, 2026",
    location: "Lake Tahoe",
  },
  {
    eventName: "Rainier",
    eventType: "Everest",
    eventDates: "Jun 25-28, 2026",
    location: "Rainier",
  },
  {
    eventName: "Mont-Tremblant",
    eventType: "Everest",
    eventDates: "Jul 23-26, 2026",
    location: "Mont-Tremblant",
  },
];

export const UpcomingEventsSection = () => {
  const hasEvents = upcomingEvents.length > 0;
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <h3 className="text-section-title mb-4 sm:mb-4 md:mb-5 px-2">
        Upcoming Events
      </h3>
      
      {hasEvents ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-5 md:gap-6 lg:gap-7">
          {upcomingEvents.map((event, idx) => {
            const daysRemaining = getDaysRemaining(event.eventDates);
            const config = eventTypeConfig[event.eventType];
            
            return (
              <div
                key={idx}
                className={cn(
                  "relative card-29029 p-4 sm:p-5 md:p-6 group hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden",
                  "opacity-0 translate-y-4",
                  isRevealed && "animate-fade-in"
                )}
                style={{
                  animationDelay: `${idx * 150}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Atmospheric gradient background */}
                <div 
                  className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  style={{
                    background: config.gradient
                  }}
                />
                
                {/* Ultra-faint mountain silhouette */}
                <div 
                  className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500"
                  style={{
                    backgroundImage: `url(${patagoniaImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 40%'
                  }}
                />

                <div className="relative z-10">
                  {/* Event Type Badge */}
                  <div className="mb-4 md:mb-5">
                    <span 
                      className="text-[10px] px-3.5 py-2 rounded-full uppercase tracking-[0.2em] font-light border backdrop-blur-sm"
                      style={{
                        borderColor: `hsl(${config.accentColor} / 0.4)`,
                        backgroundColor: `hsl(${config.accentColor} / 0.1)`,
                        color: `hsl(${config.glowColor})`
                      }}
                    >
                      {event.eventType}
                    </span>
                  </div>

                  {/* Location - Hero (no divider line) */}
                  <h4 
                    className="text-2xl md:text-3xl font-light tracking-[-0.01em] mb-4 leading-tight transition-colors duration-500"
                    style={{
                      color: isRevealed ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'
                    }}
                  >
                    {event.location}
                  </h4>

                  {/* Days Remaining - Reduced emphasis */}
                  <div className="mb-3">
                    <div 
                      className="text-3xl md:text-4xl font-light tabular-nums tracking-tight mb-1"
                      style={{
                        color: `hsl(${config.glowColor})`
                      }}
                    >
                      {daysRemaining}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-light">
                      Days Until Event
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-supporting text-xs uppercase tracking-[0.2em] mt-4 pt-4 border-t border-border/20 font-light">
                    {event.eventDates}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card-29029 p-10 md:p-16 text-center max-w-3xl mx-auto">
          <div className="h-px w-20 md:w-24 bg-border/40 mx-auto mb-6 md:mb-8" />
          
          <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-wide px-4">
            Your Next Challenge Awaits
          </h4>
          
          <p className="text-supporting text-sm md:text-base max-w-xl mx-auto leading-relaxed px-4">
            You're not currently registered for any events. Explore our upcoming experiences 
            and find your next summit.
          </p>
          
          <div className="h-px w-20 md:w-24 bg-border/40 mx-auto mt-6 md:mt-8" />
        </div>
      )}
    </section>
  );
};
