import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Lock } from "lucide-react";
import { toast } from "sonner";

import { Logo29029 } from "@/components/Logo29029";

const RequiredAsterisk = () => <span className="text-[hsl(var(--peak))] ml-0.5">*</span>;

interface PastEvent {
  name: string;
  type: "Mountain" | "TRAIL";
  result: string;
}

const pastEvents: PastEvent[] = [
  { name: "Snowbasin 2025", type: "Mountain", result: "Everest" },
  { name: "Stratton 2024", type: "Mountain", result: "Kilimanjaro" },
  { name: "Sun Valley 2024", type: "Mountain", result: "DNF" },
  { name: "Whistler TRAIL 2025", type: "TRAIL", result: "TRAIL Finisher" },
  { name: "Tahoe TRAIL 2023", type: "TRAIL", result: "TRAIL Finisher" },
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
    state: "CO",
    zipCode: "80202",
    emergencyContact: "Maria Rivera",
    emergencyPhone: "+1 (555) 987-6543",
    emergencyRelationship: "Spouse",
    memberId: "AR-5847",
    joinDate: (() => {
      const years = pastEvents.map(e => {
        const match = e.name.match(/\d{4}/);
        return match ? parseInt(match[0]) : 9999;
      });
      return String(Math.min(...years));
    })()
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
                  <span className="hidden sm:inline">Save Changes</span>
                  <span className="sm:hidden">Save</span>
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-2">Member Profile</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your personal information and member details</p>
          </div>

          {/* Profile Avatar Section */}
          <Card className="card-29029 p-5 sm:p-6 md:p-8 mb-5 sm:mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-tier-accent/50">
                  <AvatarImage alt="Profile" />
                  <AvatarFallback className="bg-card/30 flex items-center justify-center">
                    <Logo29029 size={32} className="text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute bottom-0 inset-x-0 flex flex-col items-center">
                    <button 
                      className="bg-tier-accent hover:bg-tier-accent/90 text-black rounded-full p-2 transition-colors shadow-lg min-w-[44px] min-h-[44px] flex flex-col items-center justify-center"
                      aria-label="Add profile photo"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Add Photo</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="type-metric-secondary mb-2">
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
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-4 sm:mb-5" />
            
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
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-4 sm:mb-5" />
            
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
                  <Select
                    value={profileData.state}
                    onValueChange={(value) => handleInputChange("state", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-card/40 border-border/20 text-sm text-foreground">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
                        ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["DC","District of Columbia"],["FL","Florida"],
                        ["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],
                        ["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],
                        ["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],
                        ["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],
                        ["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],
                        ["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],
                        ["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],
                        ["VT","Vermont"],["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],
                      ].map(([abbr, name]) => (
                        <SelectItem key={abbr} value={abbr}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-4 sm:mb-5" />
            
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
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-4 sm:mb-5" />
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">Total Vert Ft</div>
                <div className="type-metric-secondary">145,800 ft</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">Total Miles</div>
                <div className="type-metric-secondary">87.4 mi</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">Mountain Events</div>
                <div className="type-metric-secondary">{pastEvents.filter(e => e.type === "Mountain").length}</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-3 sm:p-4">
                <div className="text-sm text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">TRAIL Events</div>
                <div className="type-metric-secondary">{pastEvents.filter(e => e.type === "TRAIL").length}</div>
              </div>
            </div>
          </Card>

          {/* Events You've Attended */}
          <Card className="card-29029 p-5 sm:p-6 md:p-8">
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1">Events You've Attended</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Your event history and results</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-4 sm:mb-5" />

            {pastEvents.length > 0 ? (
              <div className="space-y-6">
                {/* Mountain Events */}
                {(() => {
                  const mountainEvents = pastEvents.filter(e => e.type === "Mountain");
                  const mountainFinishes = mountainEvents.filter(e => e.result !== "DNF").length;
                  return mountainEvents.length > 0 ? (
                    <div>
                      <div className="text-subhead mb-1">Mountain Events</div>
                      <div className="text-sm text-muted-foreground mb-3">Total Mountain Finishes: {mountainFinishes}</div>
                      <div className="space-y-2">
                        {mountainEvents.map((event, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between items-center py-2 ${idx < mountainEvents.length - 1 ? 'border-b border-border/10' : ''}`}
                          >
                            <span className="text-sm font-medium text-white">{event.name}</span>
                            <span className={`text-sm ${event.result === "DNF" ? "text-muted-foreground" : "text-foreground"}`}>
                              {event.result}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* TRAIL Events */}
                {(() => {
                  const trailEvents = pastEvents.filter(e => e.type === "TRAIL");
                  const trailFinishes = trailEvents.filter(e => e.result === "TRAIL Finisher").length;
                  return trailEvents.length > 0 ? (
                    <div>
                      <div className="text-subhead mb-1">TRAIL Events</div>
                      <div className="text-sm text-muted-foreground mb-3">Total TRAIL Finishes: {trailFinishes}</div>
                      <div className="space-y-2">
                        {trailEvents.map((event, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between items-center py-2 ${idx < trailEvents.length - 1 ? 'border-b border-border/10' : ''}`}
                          >
                            <span className="text-sm font-medium text-white">{event.name}</span>
                            <span className={`text-sm ${event.result === "DNF" ? "text-muted-foreground" : "text-foreground"}`}>
                              {event.result}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
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