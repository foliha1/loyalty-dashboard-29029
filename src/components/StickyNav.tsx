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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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
    handleScroll();
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out",
        isScrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
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
                className="w-full max-w-full bg-background/95 backdrop-blur-2xl border-l-0 p-0"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <Logo29029 className="h-7 w-auto text-foreground mb-12" />

                  <nav className="flex flex-col items-center gap-2">
                    {navLinks.map((link, index) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={cn(
                          "min-h-[44px] py-4 px-6 text-sm uppercase tracking-[0.2em] transition-colors duration-300 rounded-lg animate-fade-in",
                          activeSection === link.href.slice(1)
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: "both",
                        }}
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
                      "text-xs uppercase tracking-[0.15em] transition-colors duration-300",
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
    </nav>
  );
};
