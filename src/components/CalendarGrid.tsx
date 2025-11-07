import { Calendar, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RegistrationWindow {
  eventName: string;
  eventType: "Mountain" | "Trail";
  registrationOpens: string;
  eventDates: string;
  location: string;
  hasPriorityAccess: boolean;
}

const registrationWindows: RegistrationWindow[] = [
  {
    eventName: "Snowbasin",
    eventType: "Mountain",
    registrationOpens: "Nov 6, 2025 at 12P EST",
    eventDates: "Jun 11-14, 2025",
    location: "Snowbasin",
    hasPriorityAccess: true,
  },
  {
    eventName: "Rainier",
    eventType: "Mountain",
    registrationOpens: "Nov 6, 2025 at 12P EST",
    eventDates: "Jun 25-28, 2025",
    location: "Rainier",
    hasPriorityAccess: true,
  },
  {
    eventName: "Mont-Tremblant",
    eventType: "Mountain",
    registrationOpens: "Nov 6, 2025 at 12P EST",
    eventDates: "Jul 23-26, 2025",
    location: "Mont-Tremblant",
    hasPriorityAccess: true,
  },
  {
    eventName: "Steamboat",
    eventType: "Mountain",
    registrationOpens: "Nov 6, 2025 at 12P EST",
    eventDates: "Aug 13-16, 2025",
    location: "Steamboat",
    hasPriorityAccess: true,
  },
  {
    eventName: "Whistler",
    eventType: "Mountain",
    registrationOpens: "Nov 6, 2025 at 12P EST",
    eventDates: "Aug 27-30, 2025",
    location: "Whistler",
    hasPriorityAccess: true,
  },
  {
    eventName: "Sun Valley",
    eventType: "Mountain",
    registrationOpens: "Nov 6, 2025 at 12P EST",
    eventDates: "Sep 10-13, 2025",
    location: "Sun Valley",
    hasPriorityAccess: true,
  },
  {
    eventName: "TRAIL Park City",
    eventType: "Trail",
    registrationOpens: "Nov 6, 2025 at 12P EST",
    eventDates: "Sep 16-20, 2025",
    location: "Park City",
    hasPriorityAccess: true,
  },
  {
    eventName: "TRAIL Tahoe",
    eventType: "Trail",
    registrationOpens: "Nov 6, 2025 at 12P EST",
    eventDates: "Oct 7-11, 2025",
    location: "Tahoe",
    hasPriorityAccess: false,
  },
  {
    eventName: "Stratton",
    eventType: "Mountain",
    registrationOpens: "Nov 6, 2025 at 12P EST",
    eventDates: "Oct 22-25, 2025",
    location: "Stratton",
    hasPriorityAccess: false,
  },
];

export const CalendarGrid = () => {
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wider">
        2025 Event Calendar + Priority Access
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {registrationWindows.map((window, index) => (
          <Card
            key={index}
            className="border-border rounded-xl p-6 transition-all duration-300 hover-lift relative overflow-hidden"
            style={{ backgroundColor: '#343532' }}
          >
            <div className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"
              style={window.eventType === "Mountain" 
                ? { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.2)' }
                : { backgroundColor: 'rgba(217, 119, 6, 0.2)', color: '#fbbf24', border: '1px solid rgba(217, 119, 6, 0.4)' }
              }
            >
              {window.eventType}
            </div>
            
            {window.hasPriorityAccess && (
              <div 
                className="absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ 
                  backgroundColor: 'rgba(221, 0, 51, 0.2)',
                  color: '#ffffff',
                  border: '1px solid rgba(221, 0, 51, 0.4)'
                }}
              >
                Priority Access
              </div>
            )}
            
            <div className="mb-4 mt-6">
              <h3 className="text-xl font-bold mb-3">{window.eventName}</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Bell className="w-4 h-4 text-[#DD0033]" />
                  <span>Registration Opens: <span className="text-foreground font-medium">{window.registrationOpens}</span></span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-[#DD0033]" />
                  <span>Event Dates: <span className="text-foreground font-medium">{window.eventDates}</span></span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-[#DD0033]" />
                  <span>Location: <span className="text-foreground font-medium">{window.location}</span></span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full font-semibold transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: '#DD0033',
                color: '#ffffff'
              }}
            >
              Set Reminder
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};
