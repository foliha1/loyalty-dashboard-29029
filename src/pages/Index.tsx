import { UserHeader } from "@/components/UserHeader";
import { ProgressHero } from "@/components/ProgressHero";
import { TiersContinuum } from "@/components/TiersContinuum";
import { CalendarGrid } from "@/components/CalendarGrid";
import { ActivityFeed } from "@/components/ActivityFeed";
import { useParallax } from "@/hooks/useParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollVignette } from "@/hooks/useScrollVignette";
const Index = () => {
  const parallaxOffset = useParallax(0.3);
  const scrollProgress = useScrollVignette();
  const vignetteIntensity = 0.3 + scrollProgress * 0.4;
  const progressReveal = useScrollReveal(0.1);
  const tiersReveal = useScrollReveal(0.1);
  const calendarReveal = useScrollReveal(0.1);
  const activityReveal = useScrollReveal(0.1);
  return <div className="min-h-screen bg-background relative overflow-hidden" data-current-tier="Ridge">
      {/* Parallax Background Layers */}
      <div className="fixed inset-0 -z-10">
...
      </div>
      
      {/* Scroll-based vignette */}
      <div className="fixed inset-0 pointer-events-none transition-opacity duration-500 -z-5" style={{
      background: `radial-gradient(
            ellipse 70% 60% at 50% 45%, 
            transparent 0%, 
            transparent 40%,
            rgba(0, 0, 0, ${vignetteIntensity * 0.5}) 70%,
            rgba(0, 0, 0, ${vignetteIntensity}) 100%
          )`,
      opacity: 0.3 + scrollProgress * 0.5
    }} />

      {/* Header section - BLACK background */}
      <div className="bg-[#000000]">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <UserHeader />
        </div>
      </div>
      
      {/* Main content section - Slightly lighter background */}
      <div className="bg-[#1f1f1f]">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div ref={progressReveal.ref} className={`section-fade-up ${progressReveal.isVisible ? 'visible' : ''}`}>
            <ProgressHero />
          </div>
          
          <div ref={tiersReveal.ref} className={`section-fade-up section-fade-up-delay-1 ${tiersReveal.isVisible ? 'visible' : ''}`}>
            <TiersContinuum />
          </div>
          
          <div ref={calendarReveal.ref} className={`section-fade-up section-fade-up-delay-2 ${calendarReveal.isVisible ? 'visible' : ''}`}>
            <CalendarGrid />
          </div>
          
          <div ref={activityReveal.ref} className={`section-fade-up ${activityReveal.isVisible ? 'visible' : ''}`}>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>;
};
export default Index;