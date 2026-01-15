import { UserHeader } from "@/components/UserHeader";
import { TiersContinuum } from "@/components/TiersContinuum";
import { CalendarGrid } from "@/components/CalendarGrid";
import { ActivityFeed } from "@/components/ActivityFeed";
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
  const activityReveal = useScrollReveal(0.1);
  const discoveryCTAsReveal = useScrollReveal(0.1);
  const upcomingEventsReveal = useScrollReveal(0.1);
  const { currentTier } = useTier();
  
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden" data-current-tier={currentTier}>
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
      
      {/* Main content section */}
      <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-7xl">
        {/* Elevation Journey */}
        <div 
          id="journey"
          ref={tiersReveal.ref} 
          className={`pt-6 md:pt-12 pb-6 md:pb-12 section-fade-up ${tiersReveal.isVisible ? 'visible' : ''}`}
        >
          <TiersContinuum />
        </div>
        
        {/* Section Divider */}
        <div className="divider-red my-6 md:my-12" />
        
        {/* Continue the Journey */}
        <div 
          id="upcoming"
          ref={calendarReveal.ref} 
          className={`py-6 md:py-12 section-fade-up section-fade-up-delay-2 ${calendarReveal.isVisible ? 'visible' : ''}`}
        >
          <CalendarGrid />
        </div>
        
        {/* Section Divider */}
        <div className="divider-red my-6 md:my-12" />
        
        {/* History */}
        <div 
          id="activity-feed"
          ref={activityReveal.ref} 
          className={`py-6 md:py-12 section-fade-up ${activityReveal.isVisible ? 'visible' : ''}`}
        >
          <ActivityFeed />
        </div>
        
        {/* Section Divider */}
        <div className="divider-red my-6 md:my-12" />
        
        {/* Upcoming Events */}
        <div 
          id="upcoming-events"
          ref={upcomingEventsReveal.ref} 
          className={`py-6 md:py-12 section-fade-up ${upcomingEventsReveal.isVisible ? 'visible' : ''}`}
        >
          <UpcomingEventsSection />
        </div>
        
        {/* Section Divider */}
        <div className="divider-red my-6 md:my-12" />
        
        {/* Discovery CTAs */}
        <div 
          id="discover"
          ref={discoveryCTAsReveal.ref} 
          className={`py-6 md:py-12 pb-10 md:pb-16 section-fade-up ${discoveryCTAsReveal.isVisible ? 'visible' : ''}`}
        >
          <DiscoveryCTAs />
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