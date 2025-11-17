import { UserHeader } from "@/components/UserHeader";
import { TiersContinuum } from "@/components/TiersContinuum";
import { CalendarGrid } from "@/components/CalendarGrid";
import { ActivityFeed } from "@/components/ActivityFeed";
import { useParallax } from "@/hooks/useParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollVignette } from "@/hooks/useScrollVignette";
import { useScrollCollapse } from "@/hooks/useScrollCollapse";
import { TierProvider, useTier } from "@/contexts/TierContext";

const IndexContent = () => {
  const parallaxOffset = useParallax(0.3);
  const scrollProgress = useScrollVignette();
  const vignetteIntensity = 0.3 + scrollProgress * 0.4;
  const tiersReveal = useScrollReveal(0.1);
  const calendarReveal = useScrollReveal(0.1);
  const activityReveal = useScrollReveal(0.1);
  const isHeaderCollapsed = useScrollCollapse(300);
  const { currentTier } = useTier();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden" data-current-tier={currentTier}>
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

      {/* Header section */}
      <div 
        className="bg-[#000000]" 
        style={{ 
          paddingTop: isHeaderCollapsed ? '88px' : '0',
          transition: 'padding-top 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="container mx-auto px-6 md:px-10 lg:px-12 max-w-7xl">
          <UserHeader isCollapsed={isHeaderCollapsed} />
        </div>
      </div>
      
      {/* Main content section */}
      <div className="bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-10 lg:px-12 max-w-7xl">
        {/* Elevation Journey */}
        <div 
          ref={tiersReveal.ref} 
          className={`pt-14 md:pt-20 pb-14 md:pb-20 section-fade-up ${tiersReveal.isVisible ? 'visible' : ''}`}
        >
          <TiersContinuum />
        </div>
        
        {/* Section Divider */}
        <div className="divider-red my-14 md:my-20" />
        
        {/* Continue the Journey */}
        <div 
          ref={calendarReveal.ref} 
          className={`py-14 md:py-20 section-fade-up section-fade-up-delay-2 ${calendarReveal.isVisible ? 'visible' : ''}`}
        >
          <CalendarGrid />
        </div>
        
        {/* Section Divider */}
        <div className="divider-red my-14 md:my-20" />
        
        {/* History */}
        <div 
          ref={activityReveal.ref} 
          className={`py-14 md:py-20 pb-20 md:pb-28 section-fade-up ${activityReveal.isVisible ? 'visible' : ''}`}
        >
          <ActivityFeed />
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