import { Calendar, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RegistrationWindow {
  eventName: string;
  registrationOpens: string;
  eventDates: string;
  location: string;
  hasPriorityAccess: boolean;
}

const registrationWindows: RegistrationWindow[] = [
  {
    eventName: "Winter Series 2026",
    registrationOpens: "Jan 15, 2026",
    eventDates: "Feb 20-23, 2026",
    location: "Snowbasin",
    hasPriorityAccess: true,
  },
  {
    eventName: "Spring Alpine Challenge",
    registrationOpens: "Mar 1, 2026",
    eventDates: "Apr 10-13, 2026",
    location: "Whistler",
    hasPriorityAccess: true,
  },
  {
    eventName: "Summer Trail Series",
    registrationOpens: "May 20, 2026",
    eventDates: "Jul 5-8, 2026",
    location: "Trail Tahoe",
    hasPriorityAccess: false,
  },
  {
    eventName: "Fall Elevation Peak",
    registrationOpens: "Aug 10, 2026",
    eventDates: "Sep 15-18, 2026",
    location: "Sun Valley",
    hasPriorityAccess: true,
  },
  {
    eventName: "Ridge Night Challenge",
    registrationOpens: "Oct 1, 2026",
    eventDates: "Nov 12-14, 2026",
    location: "Stratton",
    hasPriorityAccess: false,
  },
  {
    eventName: "Winter Solstice Ascent",
    registrationOpens: "Nov 15, 2026",
    eventDates: "Dec 20-22, 2026",
    location: "Snowbasin",
    hasPriorityAccess: true,
  },
];

export const CalendarGrid = () => {
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wider">
        29029 Calendar + Priority Access
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {registrationWindows.map((window, index) => (
          <Card
            key={index}
            className="border-border rounded-xl p-6 transition-all duration-300 hover-lift relative overflow-hidden"
            style={{ backgroundColor: '#343532' }}
          >
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
            
            <div className="mb-4">
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
