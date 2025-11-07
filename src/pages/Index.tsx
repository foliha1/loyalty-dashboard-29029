import { UserHeader } from "@/components/UserHeader";
import { ProgressHero } from "@/components/ProgressHero";
import { TiersContinuum } from "@/components/TiersContinuum";
import { CalendarGrid } from "@/components/CalendarGrid";
import { ImmersionsGrid } from "@/components/ImmersionsGrid";
import { ActivityFeed } from "@/components/ActivityFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(221, 0, 51, 0.03) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <UserHeader />
        <ProgressHero />
        <TiersContinuum />
        <CalendarGrid />
        <ImmersionsGrid />
        <ActivityFeed />
      </div>
    </div>
  );
};

export default Index;
