import { ArrowRight } from "lucide-react";
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
  // Parse date like "Jun 11-14, 2025" - use start date
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

// Toggle this to test empty state
const upcomingEvents: UpcomingEvent[] = [
  {
    eventName: "Snowbasin",
    eventType: "Everest",
    eventDates: "Jun 11-14, 2026",
    location: "Snowbasin, Utah",
  },
  {
    eventName: "Tahoe Trail",
    eventType: "Trail",
    eventDates: "May 15-16, 2026",
    location: "Lake Tahoe, California",
  },
  {
    eventName: "Rainier",
    eventType: "Everest",
    eventDates: "Jun 25-28, 2026",
    location: "Rainier, Washington",
  },
  {
    eventName: "Mont-Tremblant",
    eventType: "Everest",
    eventDates: "Jul 23-26, 2026",
    location: "Mont-Tremblant, Quebec",
  },
];
export const CalendarGrid = () => {
  const hasEvents = upcomingEvents.length > 0;
  const [isRevealed, setIsRevealed] = useState(false);

  // Reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <h2 className="text-section-title mb-6 sm:mb-7 md:mb-8 px-2">
        Continue the Journey
      </h2>
      
      {hasEvents ? (
        <>
          <p className="text-metadata text-center mb-10 sm:mb-12 md:mb-16 max-w-2xl mx-auto !text-muted-foreground">
            Your upcoming events
          </p>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10 mb-12 sm:mb-14 md:mb-16">
            {upcomingEvents.map((event, idx) => {
              const daysRemaining = getDaysRemaining(event.eventDates);
              const config = eventTypeConfig[event.eventType];
              
              return (
                <div
                  key={idx}
                  className={cn(
                    "relative card-29029 card-hover-lift p-6 sm:p-8 md:p-10 group cursor-pointer overflow-hidden min-h-[44px]",
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
                    <div className="mb-6 md:mb-8">
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

                    {/* Location - Hero */}
                    <h4 
                      className="text-2xl md:text-3xl font-light tracking-[-0.01em] mb-4 leading-tight transition-colors duration-500"
                      style={{
                        color: isRevealed ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'
                      }}
                    >
                      {event.location}
                    </h4>

                    {/* Divider with accent color */}
                    <div 
                      className="h-[2px] w-12 md:w-16 mb-6 md:mb-8 group-hover:w-20 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, hsl(${config.accentColor}) 0%, transparent 100%)`
                      }}
                    />

                    {/* Days Remaining - Prominent & Motivational */}
                    <div className="mb-4">
                      <div 
                        className="text-5xl md:text-6xl font-light tabular-nums tracking-tight mb-2"
                        style={{
                          color: `hsl(${config.glowColor})`
                        }}
                      >
                        {daysRemaining}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-light">
                        Days Until Summit
                      </div>
                    </div>

                    {/* Date */}
                    <p className="text-supporting text-xs uppercase tracking-[0.2em] mt-6 pt-6 border-t border-border/20 font-light">
                      {event.eventDates}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* Empty State Card */}
          <div className="card-29029 p-10 md:p-16 text-center mb-16 md:mb-20 max-w-3xl mx-auto">
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
        </>
      )}

      {/* CTAs Section */}
      <div className="pt-10 sm:pt-12 md:pt-14 mt-6 sm:mt-7 md:mt-8 border-t border-border/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-8 max-w-6xl mx-auto">
          <a
            href="https://29029everesting.com/collections/tickets"
            target="_blank"
            rel="noopener noreferrer"
            className="group cta-hover-premium relative overflow-hidden px-6 sm:px-8 py-10 sm:py-11 md:py-12 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-xl flex flex-col items-start min-h-[200px]"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex-1">
              <h3 className="text-subsection mb-2 tracking-tight leading-tight !text-foreground">
                {hasEvents ? "Discover Events" : "Discover Challenges"}
              </h3>
              <p className="text-foreground/60 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-6 sm:mb-8">
                Browse All Experiences
              </p>
              
              {/* Underline sweep effect */}
              <div className="relative inline-block">
                <span className="text-foreground text-xs uppercase tracking-[0.25em] font-light">
                  Explore
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            </div>
            
            <ArrowRight className="relative z-10 w-5 h-5 text-primary mt-6 group-hover:translate-x-2 transition-transform duration-500" />
          </a>

          <a
            href="https://29029coaching.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group cta-hover-premium relative overflow-hidden px-6 sm:px-8 py-10 sm:py-11 md:py-12 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-xl flex flex-col items-start min-h-[200px]"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex-1">
              <h3 className="text-subsection mb-2 tracking-tight leading-tight !text-foreground">
                1:1 Coaching
              </h3>
              <p className="text-foreground/60 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-6 sm:mb-8">
                Personal Experience
              </p>
              
              {/* Underline sweep effect */}
              <div className="relative inline-block">
                <span className="text-foreground text-xs uppercase tracking-[0.25em] font-light">
                  Build
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            </div>
            
            <ArrowRight className="relative z-10 w-5 h-5 text-primary mt-6 group-hover:translate-x-2 transition-transform duration-500" />
          </a>

          <a
            href="https://29029everesting.com/collections/frontpage"
            target="_blank"
            rel="noopener noreferrer"
            className="group cta-hover-premium relative overflow-hidden px-6 sm:px-8 py-10 sm:py-11 md:py-12 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-xl flex flex-col items-start min-h-[200px]"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex-1">
              <h3 className="text-subsection mb-2 tracking-tight leading-tight !text-foreground">
                Apparel
              </h3>
              <p className="text-foreground/60 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-6 sm:mb-8">
                Shop Collection
              </p>
              
              {/* Underline sweep effect */}
              <div className="relative inline-block">
                <span className="text-foreground text-xs uppercase tracking-[0.25em] font-light">
                  Shop Now
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            </div>
            
            <ArrowRight className="relative z-10 w-5 h-5 text-primary mt-6 group-hover:translate-x-2 transition-transform duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
};