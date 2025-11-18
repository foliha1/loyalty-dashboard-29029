import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 p-1 bg-card/50 backdrop-blur-sm rounded-full border border-border/30">
        <div className="w-8 h-8" />
      </div>
    );
  }

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-card/50 backdrop-blur-sm rounded-full border border-border/30 shadow-sm">
      {themes.map(({ name, icon: Icon, label }) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          className={cn(
            "p-2 rounded-full transition-all duration-300 ease-out relative group",
            theme === name
              ? "bg-primary text-primary-foreground shadow-sm scale-105"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
          )}
          aria-label={`Switch to ${label} mode`}
          title={label}
        >
          <Icon className="w-4 h-4" />
          {theme === name && (
            <div
              className="absolute inset-0 rounded-full bg-primary/20 animate-fade-in"
              style={{ zIndex: -1 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
