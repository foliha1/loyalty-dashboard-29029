import { UserHeader } from "@/components/UserHeader";
import { ProgressHero } from "@/components/ProgressHero";
import { TiersContinuum } from "@/components/TiersContinuum";
import { CalendarGrid } from "@/components/CalendarGrid";
import { ImmersionsGrid } from "@/components/ImmersionsGrid";
import { ActivityFeed } from "@/components/ActivityFeed";
import { useParallax } from "@/hooks/useParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollVignette } from "@/hooks/useScrollVignette";

const Index = () => {
  const parallaxOffset = useParallax(0.3);
  const scrollProgress = useScrollVignette();
  const vignetteIntensity = 0.3 + (scrollProgress * 0.4);
  
  const progressReveal = useScrollReveal(0.1);
  const tiersReveal = useScrollReveal(0.1);
  const calendarReveal = useScrollReveal(0.1);
  const immersionsReveal = useScrollReveal(0.1);
  const activityReveal = useScrollReveal(0.1);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Parallax Background Layers */}
      <div className="fixed inset-0 -z-10">
        {/* Layer 1: Base gradient (static) */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(221, 0, 51, 0.03) 0%, transparent 50%)',
          }}
        />
        
        {/* Layer 2: Mountain ridge silhouette with parallax */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cpath d='M0,400 Q200,300 400,350 T800,320 T1200,380 L1200,800 L0,800 Z' fill='%23ffffff'/%3E%3Cpath d='M0,500 Q150,420 350,460 T750,440 T1200,500 L1200,800 L0,800 Z' fill='%23ffffff' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Layer 3: Floating particles with slower parallax */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${parallaxOffset * 0.5}px)`,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
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
          opacity: 0.3 + (scrollProgress * 0.5),
        }}
      />

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <UserHeader />
        
        <div 
          ref={progressReveal.ref}
          className={`section-fade-up ${progressReveal.isVisible ? 'visible' : ''}`}
        >
          <ProgressHero />
        </div>
        
        <div 
          ref={tiersReveal.ref}
          className={`section-fade-up section-fade-up-delay-1 ${tiersReveal.isVisible ? 'visible' : ''}`}
        >
          <TiersContinuum />
        </div>
        
        <div 
          ref={calendarReveal.ref}
          className={`section-fade-up section-fade-up-delay-2 ${calendarReveal.isVisible ? 'visible' : ''}`}
        >
          <CalendarGrid />
        </div>
        
        <div 
          ref={immersionsReveal.ref}
          className={`section-fade-up section-fade-up-delay-3 ${immersionsReveal.isVisible ? 'visible' : ''}`}
        >
          <ImmersionsGrid />
        </div>
        
        <div 
          ref={activityReveal.ref}
          className={`section-fade-up ${activityReveal.isVisible ? 'visible' : ''}`}
        >
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Index;
