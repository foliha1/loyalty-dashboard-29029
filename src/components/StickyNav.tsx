import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo29029 } from "./Logo29029";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Continue", href: "#upcoming" },
  { label: "History", href: "#activity-feed" },
  { label: "Events", href: "#upcoming-events" },
  { label: "Discover", href: "#discover" },
];

export const StickyNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);

      const sections = ["journey", "upcoming", "activity-feed", "upcoming-events", "discover"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      )}
    >
      <div className="bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <Logo29029 className="h-5 sm:h-6 w-auto text-foreground" />
            </a>

            {/* Mobile Hamburger Menu */}
            {isMobile ? (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button 
                    className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-6 w-6 text-foreground" />
                  </button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-[280px] bg-background/95 backdrop-blur-xl border-l border-white/10 p-6"
                >
                  <div className="flex flex-col h-full">
                    <Logo29029 className="h-6 w-auto text-foreground mb-10" />
                    
                    <nav className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className={cn(
                            "py-3 px-4 -mx-4 text-sm uppercase tracking-[0.15em] transition-colors duration-300 rounded-lg",
                            activeSection === link.href.slice(1)
                              ? "text-foreground bg-white/5"
                              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                          )}
                        >
                          {link.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              /* Desktop Navigation Links */
              <div className="flex items-center gap-3 sm:gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="group relative"
                  >
                    <span
                      className={cn(
                        "text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors duration-300",
                        activeSection === link.href.slice(1)
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </span>
                    <div
                      className={cn(
                        "absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-500",
                        activeSection === link.href.slice(1)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      )}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
