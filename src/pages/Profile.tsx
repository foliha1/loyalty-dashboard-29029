import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { EPsLabel } from "@/components/EPsLabel";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Member profile data
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
    memberId: "AR-5847",
    joinDate: "January 2023"
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to a database
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
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 py-5 sm:py-6">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group min-h-[44px] min-w-[44px]"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs sm:text-sm uppercase tracking-wider hidden sm:inline">Back to Dashboard</span>
              <span className="text-xs uppercase tracking-wider sm:hidden">Back</span>
            </button>
            
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-tier-accent hover:bg-tier-accent/90 text-black font-medium uppercase tracking-wider text-xs sm:text-sm min-h-[44px] px-4 sm:px-6 shadow-lg hover:shadow-xl transition-all"
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2 sm:gap-3">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="uppercase tracking-wider text-xs sm:text-sm min-h-[44px] px-3 sm:px-4"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-tier-accent hover:bg-tier-accent/90 text-black font-semibold uppercase tracking-wider text-xs sm:text-sm min-h-[44px] px-4 sm:px-6 shadow-lg hover:shadow-xl transition-all"
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
      <main className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-10 sm:mb-12 md:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-3 sm:mb-4">Member Profile</h1>
            <p className="!text-muted-foreground text-sm sm:text-base">Manage your personal information and member details</p>
          </div>

          {/* Profile Avatar Section */}
          <Card className="card-29029 p-6 sm:p-8 md:p-10 mb-8 sm:mb-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
              <div className="relative">
                <Avatar className="w-28 h-28 sm:w-32 sm:h-32 border-2 border-tier-accent/50">
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
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-3 sm:mb-4">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <div className="space-y-1.5 text-foreground/70">
                  <p className="font-mono text-xs sm:text-sm uppercase tracking-wider">Member ID: {profileData.memberId}</p>
                  <p className="text-xs sm:text-sm uppercase tracking-wider">Member Since: {profileData.joinDate}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="card-29029 p-6 sm:p-8 md:p-10 mb-8 sm:mb-10">
            <div className="mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1.5">Personal Information</h3>
              <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider">Basic details and contact information</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-8 sm:mb-10" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
                  First Name *
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

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
                  Last Name *
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

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
                  Date of Birth
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={profileData.birthday}
                  onChange={(e) => handleInputChange("birthday", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </Card>

          {/* Address Information */}
          <Card className="card-29029 p-6 sm:p-8 md:p-10 mb-8 sm:mb-10">
            <div className="mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1.5">Address</h3>
              <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider">Mailing and billing address</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-8 sm:mb-10" />
            
            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
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

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
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

                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
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
          <Card className="card-29029 p-6 sm:p-8 md:p-10 mb-8 sm:mb-10">
            <div className="mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1.5">Emergency Contact</h3>
              <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider">Primary emergency contact information</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-8 sm:mb-10" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
                  Contact Name *
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

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-xs uppercase tracking-wider text-foreground/80 font-medium block">
                  Contact Phone *
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
            </div>
          </Card>
          {/* Lifetime Stats (Read-only) */}
          <Card className="card-29029 p-6 sm:p-8 md:p-10">
            <div className="mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-1.5">Lifetime Statistics</h3>
              <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-wider">Your complete journey at a glance</p>
            </div>
            <div className="h-px bg-gradient-to-r from-tier-accent/20 via-tier-accent/40 to-tier-accent/20 mb-8 sm:mb-10" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 uppercase tracking-wider">Total Elevation</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">145,800 ft</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 uppercase tracking-wider">Miles Climbed</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">87.4 mi</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 uppercase tracking-wider">Events</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">9</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-[10px] sm:text-xs text-foreground/65 mb-1.5 sm:mb-2 uppercase tracking-wider">Total <EPsLabel showInfo /></div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">1,440</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-[10px] sm:text-xs text-foreground/65 mb-1.5 sm:mb-2 uppercase tracking-wider">Coaching</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">12</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-[10px] sm:text-xs text-foreground/65 mb-1.5 sm:mb-2 uppercase tracking-wider">Days Active</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">1,044</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
