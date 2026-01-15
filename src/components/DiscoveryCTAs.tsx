import { ArrowRight } from "lucide-react";

export const DiscoveryCTAs = () => {
  return (
    <section>
      <h3 className="text-section-title mb-4 sm:mb-4 md:mb-5 px-2">
        Discover More
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 max-w-6xl mx-auto">
      <a
        href="https://29029everesting.com/collections/tickets"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden px-5 sm:px-6 py-5 sm:py-8 md:py-9 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-muted/10 min-h-[140px] sm:min-h-[180px]"
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex-1">
          <h5 className="text-base sm:text-lg md:text-xl font-light mb-2 tracking-tight leading-tight !text-foreground">
            Discover 29029 Events
          </h5>
          <p className="text-foreground/60 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-4 sm:mb-8">
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
        className="group relative overflow-hidden px-5 sm:px-6 py-5 sm:py-8 md:py-9 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-muted/10 min-h-[140px] sm:min-h-[180px]"
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex-1">
          <h5 className="text-base sm:text-lg md:text-xl font-light mb-2 tracking-tight leading-tight !text-foreground">
            Discover 29029 Experience Coaching
          </h5>
          <p className="text-foreground/60 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-4 sm:mb-8">
            Personal Experience
          </p>
          
          {/* Underline sweep effect */}
          <div className="relative inline-block">
            <span className="text-foreground text-xs uppercase tracking-[0.25em] font-light">
              Learn More
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
        className="group relative overflow-hidden px-5 sm:px-6 py-5 sm:py-8 md:py-9 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-muted/10 min-h-[140px] sm:min-h-[180px]"
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex-1">
          <h5 className="text-base sm:text-lg md:text-xl font-light mb-2 tracking-tight leading-tight !text-foreground">
            Discover 29029 Apparel
          </h5>
          <p className="text-foreground/60 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-4 sm:mb-8">
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
    </section>
  );
};
