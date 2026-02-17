import { UserHeader } from "@/components/UserHeader";
import { TiersContinuum } from "@/components/TiersContinuum";
import { AnnualPerformance } from "@/components/AnnualPerformance";
import { UpcomingEventsSection } from "@/components/UpcomingEventsSection";
import { DiscoveryCTAs } from "@/components/DiscoveryCTAs";
import { StickyNav } from "@/components/StickyNav";
import { useParallax } from "@/hooks/useParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollVignette } from "@/hooks/useScrollVignette";
import { TierProvider, useTier } from "@/contexts/TierContext";

const IndexContent = () => {
  const parallaxOffset = useParallax(0.3);
  const scrollProgress = useScrollVignette();
  const vignetteIntensity = 0.3 + scrollProgress * 0.4;
  const tiersReveal = useScrollReveal(0.1);
  const calendarReveal = useScrollReveal(0.1);
  const _activityReveal = useScrollReveal(0.1); // kept for potential future use
  const discoveryCTAsReveal = useScrollReveal(0.1);
  const upcomingEventsReveal = useScrollReveal(0.1);
  const { currentTier } = useTier();
  
  return (
    <div className="bg-background relative" data-current-tier={currentTier}>
      {/* Parallax Background Layers */}
      <div className="fixed inset-0 -z-10">
        {/* ... keep existing code ... */}
      </div>
      
      {/* Scroll-based vignette */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-500 -z-5" 
        style={{
          background: `radial-gradient(
            ellipse 70% 60% at 50% 45%, 
            transparent 0%, 
            transparent 40%,
            rgba(0, 0, 0, ${vignetteIntensity * 0.5}) 70%,
            rgba(0, 0, 0, ${vignetteIntensity}) 100%
          )`,
          opacity: 0.3 + scrollProgress * 0.5
        }} 
      />

      {/* Sticky Navigation */}
      <StickyNav />

      {/* Header */}
      <UserHeader />
      
      {/* Main content section — Overview environment */}
      <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-7xl">
        {/* Elevation Journey */}
        <div 
          id="journey"
          ref={tiersReveal.ref} 
          className={`pt-8 md:pt-12 pb-16 md:pb-24 scroll-mt-[100px] section-fade-up ${tiersReveal.isVisible ? 'visible' : ''}`}
        >
          <TiersContinuum />
        </div>
      </div>

      {/* Horizon divider — solid chapter break */}
      <div className="relative w-full h-10 md:h-14 -mt-4 md:-mt-6 pointer-events-none" aria-hidden="true"
        style={{ background: 'hsl(0 0% 5%)' }}
      />

      {/* Your Journey + remaining sections — new chapter, flatter bg */}
      <div style={{ background: 'hsl(0 0% 5%)' }}>
        <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-7xl">
          {/* Continue the Journey (unified annual performance) */}
          <div 
            id="upcoming"
            ref={calendarReveal.ref} 
            className={`pb-16 md:pb-24 scroll-mt-[100px] section-fade-up section-fade-up-delay-2 ${calendarReveal.isVisible ? 'visible' : ''}`}
          >
            <AnnualPerformance />
          </div>
          
          {/* Upcoming Events */}
          <div 
            id="upcoming-events"
            ref={upcomingEventsReveal.ref} 
            className={`pb-16 md:pb-24 scroll-mt-[100px] section-fade-up ${upcomingEventsReveal.isVisible ? 'visible' : ''}`}
          >
            <UpcomingEventsSection />
          </div>
          
          {/* Discovery CTAs */}
          <div 
            id="discover"
            ref={discoveryCTAsReveal.ref} 
            className={`pt-5 md:pt-8 pb-20 md:pb-32 scroll-mt-[100px] section-fade-up ${discoveryCTAsReveal.isVisible ? 'visible' : ''}`}
          >
            <DiscoveryCTAs />
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <TierProvider>
      <IndexContent />
    </TierProvider>
  );
};

export default Index;