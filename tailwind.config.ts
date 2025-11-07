import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "progress-fill": {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.7",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "hover-lift": {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-2px)",
          },
        },
        "floating": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-4px)",
          },
        },
        "sweep": {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        "tier-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 24px rgba(221, 0, 51, 0.3), 0 0 48px rgba(221, 0, 51, 0.15)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(221, 0, 51, 0.5), 0 0 72px rgba(221, 0, 51, 0.25)",
            transform: "scale(1.03)",
          },
        },
        "ripple": {
          "0%": {
            transform: "scale(1)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(1.8)",
            opacity: "0",
          },
        },
        "fog-drift": {
          "0%, 100%": {
            transform: "translateX(-2%) translateY(0)",
            opacity: "0.15",
          },
          "50%": {
            transform: "translateX(2%) translateY(-3px)",
            opacity: "0.25",
          },
        },
        "marker-entrance": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "reward-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(8px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "spotlight": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0.4",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "progress-fill": "progress-fill 1.5s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "hover-lift": "hover-lift 0.3s ease-out",
        "floating": "floating 3s ease-in-out infinite",
        "sweep": "sweep 12s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
        "tier-pulse": "tier-pulse 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
        "ripple": "ripple 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "fog-drift": "fog-drift 18s ease-in-out infinite",
        "marker-entrance": "marker-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "reward-fade-in": "reward-fade-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spotlight": "spotlight 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
