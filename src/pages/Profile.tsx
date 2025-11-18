import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

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
                className="bg-tier-accent hover:bg-tier-accent/90 text-black font-medium uppercase tracking-wider text-xs sm:text-sm min-h-[44px] px-4 sm:px-6"
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
                  className="bg-tier-accent hover:bg-tier-accent/90 text-black font-medium uppercase tracking-wider text-xs sm:text-sm min-h-[44px] px-3 sm:px-4"
                >
                  <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-2 sm:mb-3">Member Profile</h1>
            <p className="text-foreground/70 text-sm sm:text-base">Manage your personal information and member details</p>
          </div>

          {/* Profile Avatar Section */}
          <Card className="card-29029 p-6 sm:p-8 md:p-10 mb-6 sm:mb-7 md:mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative">
                <Avatar className="w-32 h-32 border-2 border-tier-accent">
                  <AvatarImage src="https://i.pravatar.cc/300?img=12" alt="Profile" />
                  <AvatarFallback className="bg-secondary text-foreground text-3xl">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-tier-accent hover:bg-tier-accent/90 text-black rounded-full p-2 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-light tracking-tight mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <div className="space-y-1 text-muted-foreground">
                  <p className="font-mono text-sm">Member ID: {profileData.memberId}</p>
                  <p className="text-sm">Member Since: {profileData.joinDate}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="card-29029 p-6 sm:p-8 md:p-10 mb-6 sm:mb-7 md:mb-8">
            <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-6 sm:mb-7 md:mb-8 pb-3 sm:pb-4 border-b border-border/30">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <Label htmlFor="firstName" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={!isEditing}
                  className="bg-card/50 border-border/30"
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={!isEditing}
                  className="bg-card/50 border-border/30"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="bg-card/50 border-border/30"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  className="bg-card/50 border-border/30"
                />
              </div>

              <div>
                <Label htmlFor="birthday" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                  Birthday
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={profileData.birthday}
                  onChange={(e) => handleInputChange("birthday", e.target.value)}
                  disabled={!isEditing}
                  className="bg-card/50 border-border/30"
                />
              </div>
            </div>
          </Card>

          {/* Address Information */}
          <Card className="card-29029 p-6 sm:p-8 md:p-10 mb-6 sm:mb-7 md:mb-8">
            <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-6 sm:mb-7 md:mb-8 pb-3 sm:pb-4 border-b border-border/30">
              Address
            </h3>
            
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              <div>
                <Label htmlFor="address" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                  Street Address
                </Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                  className="bg-card/50 border-border/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                <div>
                  <Label htmlFor="city" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                    className="bg-card/50 border-border/30"
                  />
                </div>

                <div>
                  <Label htmlFor="state" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                    State
                  </Label>
                  <Input
                    id="state"
                    value={profileData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    disabled={!isEditing}
                    className="bg-card/50 border-border/30"
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                    Zip Code
                  </Label>
                  <Input
                    id="zipCode"
                    value={profileData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    disabled={!isEditing}
                    className="bg-card/50 border-border/30"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Emergency Contact */}
          <Card className="card-29029 p-6 sm:p-8 md:p-10 mb-6 sm:mb-7 md:mb-8">
            <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-6 sm:mb-7 md:mb-8 pb-3 sm:pb-4 border-b border-border/30">
              Emergency Contact
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <Label htmlFor="emergencyContact" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                  Contact Name
                </Label>
                <Input
                  id="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  disabled={!isEditing}
                  className="bg-card/50 border-border/30"
                />
              </div>

              <div>
                <Label htmlFor="emergencyPhone" className="text-xs uppercase tracking-wider text-foreground/70 mb-2 block">
                  Contact Phone
                </Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={profileData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  disabled={!isEditing}
                  className="bg-card/50 border-border/30"
                />
              </div>
            </div>
          </Card>

          {/* Lifetime Stats (Read-only) */}
          <Card className="card-29029 p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl font-light tracking-tight mb-6 sm:mb-7 md:mb-8 pb-3 sm:pb-4 border-b border-border/30">
              Lifetime Statistics
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-[10px] sm:text-xs text-foreground/65 mb-1.5 sm:mb-2 uppercase tracking-wider">Total Elevation</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">145,800 ft</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-[10px] sm:text-xs text-foreground/65 mb-1.5 sm:mb-2 uppercase tracking-wider">Miles Climbed</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">87.4 mi</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-[10px] sm:text-xs text-foreground/65 mb-1.5 sm:mb-2 uppercase tracking-wider">Events</div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">9</div>
              </div>
              
              <div className="bg-card/30 border border-border/20 rounded-lg p-4 sm:p-5 md:p-6">
                <div className="text-[10px] sm:text-xs text-foreground/65 mb-1.5 sm:mb-2 uppercase tracking-wider">Total EPs</div>
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
