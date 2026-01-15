import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo29029 } from "./Logo29029";

const navLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Upcoming", href: "#upcoming" },
  { label: "History", href: "#activity-feed" },
];

export const StickyNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling 300px
      setIsVisible(window.scrollY > 300);

      // Determine active section based on scroll position
      const sections = ["journey", "upcoming", "activity-feed"];
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

            {/* Navigation Links */}
            <div className="flex items-center gap-4 sm:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative"
                >
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors duration-300",
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
          </div>
        </div>
      </div>
    </nav>
  );
};
