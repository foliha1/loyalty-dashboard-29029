import { UserHeader } from "@/components/UserHeader";
import { ProgressHero } from "@/components/ProgressHero";
import { TierLadder } from "@/components/TierLadder";
import { ImmersionsGrid } from "@/components/ImmersionsGrid";
import { ActivityFeed } from "@/components/ActivityFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <UserHeader />
        <ProgressHero />
        <TierLadder />
        <ImmersionsGrid />
        <ActivityFeed />
      </div>
    </div>
  );
};

export default Index;
