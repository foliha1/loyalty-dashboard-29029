import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save, Lock, Check } from "lucide-react";
import { toast } from "sonner";
import { EPsLabel } from "@/components/EPsLabel";

const RequiredAsterisk = () => <span className="text-[hsl(var(--peak))] ml-0.5">*</span>;

interface PastEvent {
  name: string;
  date: string;
  type: "Mountain" | "TRAIL";
  finished: boolean;
  progress?: string;
  award?: string;
}

const pastEvents: PastEvent[] = [
  {
    name: "Snowbasin 2025",
    date: "June 2025",
    type: "Mountain",
    finished: true,
    award: "Black Bib",
  },
  {
    name: "Whistler TRAIL 2025",
    date: "August 2025",
    type: "TRAIL",
    finished: true,
  },
  {
    name: "Stratton 2024",
    date: "September 2024",
    type: "Mountain",
    finished: false,
    progress: "Summit 12 of 17",
  },
  {
    name: "Sun Valley 2024",
    date: "June 2024",
    type: "Mountain",
    finished: true,
  },
  {
    name: "Tahoe TRAIL 2023",
    date: "May 2023",
    type: "TRAIL",
    finished: true,
    award: "5x Award",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 123-4567",
    birthday: "1990-05-15",
    address: "123 Mountain View Dr",
    city: "Denver",
    state: "Colorado",
    zipCode: "80202",
    emergencyContact: "Maria Rivera",
    emergencyPhone: "+1 (555) 987-6543",
    emergencyRelationship: "Spouse",
    memberId: "AR-5847",
    joinDate: "January 2023"
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Changes discarded");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group min-h-[44px] min-w-[44px]"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm uppercase tracking-wider hidden sm:inline">Back to Dashboard</span>
              <span className="text-sm uppercase tracking-wider sm:hidden">Back</span>
            </button>
            
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-white hover:bg-white/90 text-black font-medium uppercase tracking-wider text-sm min-h-[44px] px-4 sm:px-6 shadow-lg hover:shadow-xl transition-all"
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2 sm:gap-3">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="uppercase tracking-wider text-sm min-h-[44px] px-3 sm:px-4 border-white/30 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-white hover:bg-white/90 text-black font-semibold uppercase tracking-wider text-sm min-h-[44px] px-4 sm:px-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-2">Member Profile</h1>
            <p className="!text-muted-foreground text-sm sm:text-base">Manage your personal information and member details</p>
          </div>

          {/* Profile Avatar Section */}
          <Card className="card-29029 p-5 sm:p-6 md:p-8 mb-5 sm:mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-tier-accent/50">
                  <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Profile" />
                  <AvatarFallback className="bg-secondary text-foreground text-3xl">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button 
                    className="absolute bottom-0 right-0 bg-tier-accent hover:bg-tier-accent/90 text-black rounded-full p-2.5 transition-colors shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Change profile picture"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <div className="space-y-1 text-foreground/70">
                  <p className="font-mono text-sm uppercase tracking-wider">Member ID: {profileData.memberId}</p>
                  <p className="text-sm uppercase tracking-wider">Member Since: {profileData.joinDate}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="card-29029 p-5 sm:p-6 md:p-8 mb-5 sm:mb-6">
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1">Personal Information</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Basic details and contact information</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-5 sm:mb-6" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                  First Name<RequiredAsterisk />
                </Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                  Last Name<RequiredAsterisk />
                </Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter last name"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block inline-flex items-center gap-1.5">
                  Email Address
                  <Lock className="w-3 h-3 text-muted-foreground" />
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  className="opacity-60 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                  Phone Number<RequiredAsterisk />
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="birthday" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                  Date of Birth<RequiredAsterisk />
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={profileData.birthday}
                  onChange={(e) => handleInputChange("birthday", e.target.value)}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Address Information */}
          <Card className="card-29029 p-5 sm:p-6 md:p-8 mb-5 sm:mb-6">
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1">Address</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Shipping address</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-5 sm:mb-6" />
            
            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="address" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                  Street Address
                </Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                    placeholder="City name"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="state" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                    State
                  </Label>
                  <Input
                    id="state"
                    value={profileData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    disabled={!isEditing}
                    placeholder="State"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="zipCode" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                    Zip Code
                  </Label>
                  <Input
                    id="zipCode"
                    value={profileData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    disabled={!isEditing}
                    placeholder="00000"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Emergency Contact */}
          <Card className="card-29029 p-5 sm:p-6 md:p-8 mb-5 sm:mb-6">
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1">Emergency Contact</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Primary emergency contact information</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-5 sm:mb-6" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="emergencyContact" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                  Contact Name<RequiredAsterisk />
                </Label>
                <Input
                  id="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="emergencyPhone" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                  Contact Phone<RequiredAsterisk />
                </Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={profileData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  disabled={!isEditing}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="emergencyRelationship" className="text-sm uppercase tracking-wider text-muted-foreground font-medium block">
                  Relationship<RequiredAsterisk />
                </Label>
                <Input
                  id="emergencyRelationship"
                  value={profileData.emergencyRelationship}
                  onChange={(e) => handleInputChange("emergencyRelationship", e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g. Spouse, Parent, Friend"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Lifetime Stats (Read-only) */}
          <Card className="card-29029 p-5 sm:p-6 md:p-8 mb-5 sm:mb-6">
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1">Lifetime Statistics</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Your complete journey at a glance</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-5 sm:mb-6" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">Total Elevation</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">145,800 ft</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">Miles Climbed</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">87.4 mi</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">Events</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">9</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">Total <EPsLabel showInfo /></div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">1,440</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">Coaching</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">12</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">Days Active</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">1,044</div>
              </div>
            </div>
          </Card>

          {/* Events You've Attended */}
          <Card className="card-29029 p-5 sm:p-6 md:p-8">
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1">Events You've Attended</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Your complete event history and results</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-5 sm:mb-6" />

            {pastEvents.length > 0 ? (
              <div className="space-y-3">
                {pastEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border/20 bg-card/30"
                  >
                    {/* Left: Name + Date + Type */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm sm:text-base font-medium text-white truncate">
                          {event.name}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full uppercase tracking-[0.1em] font-light border shrink-0"
                          style={{
                            borderColor: event.type === "Mountain" ? "hsl(var(--peak) / 0.4)" : "hsl(var(--ridge) / 0.4)",
                            backgroundColor: event.type === "Mountain" ? "hsl(var(--peak) / 0.1)" : "hsl(var(--ridge) / 0.1)",
                            color: event.type === "Mountain" ? "hsl(var(--peak))" : "hsl(var(--ridge))",
                          }}
                        >
                          {event.type === "Mountain" ? "Mountain" : "TRAIL"}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5">{event.date}</div>
                    </div>

                    {/* Right: Result + Award */}
                    <div className="flex items-center gap-3 shrink-0">
                      {event.finished ? (
                        <span className="inline-flex items-center gap-1 text-sm text-emerald-400">
                          <Check className="w-4 h-4" />
                          Finished
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">{event.progress}</span>
                      )}
                      {event.award && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-foreground/10 border border-foreground/20 text-foreground uppercase tracking-[0.1em] font-medium">
                          {event.award}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  No past events yet — your journey starts with your first event.
                </p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}