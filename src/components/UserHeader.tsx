import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo29029 } from "@/components/Logo29029";
import heroTopoBg from "@/assets/hero-topo-bg.jpg";

export const UserHeader = () => {
  return (
    <section 
      className="relative z-10 w-full overflow-hidden mb-3 bg-black/85 backdrop-blur-md border-b border-transparent py-10"
    >
      {/* Subtle background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${heroTopoBg})`,
          opacity: 0.15,
        }}
      />
      {/* Gradient overlay to keep text readable */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      
      <div className="container mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        <div>
          {/* Logo - Centered */}
          <div className="flex justify-center mb-12 md:mb-14">
            <Logo29029 size={38} className="text-white/70" />
          </div>

          {/* Hero Content - Centered */}
          <div className="max-w-3xl mx-auto text-center">
            {/* Premium ID Number */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase font-light text-muted-foreground/70">
                29029 ID: AR-5847
              </span>
            </div>
            
            {/* Welcome Statement - Most Prominent */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              Keep climbing, Alex.
            </h1>
            
            {/* Stats Row - Centered layout */}
            <div 
              className="flex flex-wrap gap-8 md:gap-12 items-center justify-center mb-10 animate-fade-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              {/* Avatar - Click to view profile */}
              <button 
                onClick={() => {
                  const modal = document.getElementById('profile-modal');
                  if (modal) modal.style.display = 'flex';
                }}
                className="relative group cursor-pointer"
              >
                <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-tier-accent/50 flex-shrink-0 transition-all duration-500 hover:scale-105 hover:border-tier-accent hover:shadow-[0_0_20px_hsl(var(--tier-accent)/0.4)]">
                  <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
                  <AvatarFallback className="bg-secondary text-foreground text-lg font-semibold">AR</AvatarFallback>
                </Avatar>
              </button>
            </div>
            
            {/* Subheader with expanded tracking */}
            <div 
              className="text-sm md:text-base tracking-[0.25em] uppercase font-light text-muted-foreground/60 animate-fade-in"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              Member Since 2023
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal - Enhanced with Lifetime Stats */}
      <div 
        id="profile-modal" 
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] items-center justify-center" 
        style={{display: 'none'}} 
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.style.display = 'none'; }}
      >
        <div className="card-29029 w-full h-full p-6 md:p-12 lg:p-16 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-12">Member Profile</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* Profile Info */}
              <div className="space-y-8">
                <div className="flex items-center justify-center lg:justify-start mb-8">
                  <Avatar className="w-32 h-32 border-2 border-tier-accent">
                    <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Alex Rivera" />
                    <AvatarFallback className="bg-secondary text-foreground text-3xl">AR</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="space-y-6 text-center lg:text-left">
                  <div>
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Full Name</div>
                    <div className="text-2xl font-light text-foreground">Alex Rivera</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Member ID</div>
                    <div className="font-mono text-xl text-foreground">AR-5847</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Joined</div>
                    <div className="text-xl text-foreground">January 2023</div>
                  </div>
                </div>
              </div>
              
              {/* Lifetime Stats */}
              <div>
                <h4 className="text-2xl font-light tracking-tight mb-8 text-tier-accent uppercase">Lifetime Stats</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-card/30 border border-border/20 rounded-lg p-6">
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Total Elevation</div>
                    <div className="text-3xl font-light tracking-tight">145,800 ft</div>
                  </div>
                  
                  <div className="bg-card/30 border border-border/20 rounded-lg p-6">
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Miles Climbed</div>
                    <div className="text-3xl font-light tracking-tight">87.4 mi</div>
                  </div>
                  
                  <div className="bg-card/30 border border-border/20 rounded-lg p-6">
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Events Completed</div>
                    <div className="text-3xl font-light tracking-tight">9</div>
                  </div>
                  
                  <div className="bg-card/30 border border-border/20 rounded-lg p-6">
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Total EPs Earned</div>
                    <div className="text-3xl font-light tracking-tight">1,440</div>
                  </div>
                  
                  <div className="bg-card/30 border border-border/20 rounded-lg p-6">
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Coaching Sessions</div>
                    <div className="text-3xl font-light tracking-tight">12</div>
                  </div>
                  
                  <div className="bg-card/30 border border-border/20 rounded-lg p-6">
                    <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Member Since</div>
                    <div className="text-3xl font-light tracking-tight">1,044 days</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { 
                  alert('Profile update feature coming soon!');
                }}
                className="flex-1 px-6 py-4 bg-tier-accent text-black font-medium rounded-lg hover:bg-tier-accent/90 transition-colors text-lg uppercase tracking-wider"
              >
                Update Profile
              </button>
              <button 
                onClick={() => { 
                  const modal = document.getElementById('profile-modal'); 
                  if (modal) modal.style.display = 'none'; 
                }}
                className="flex-1 px-6 py-4 bg-card/50 border border-border/30 rounded-lg hover:bg-card/70 transition-colors text-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
