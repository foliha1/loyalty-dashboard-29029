// Reference-only design tokens — not imported by components.
// The active design system lives in index.css (CSS custom properties + utility classes).
// This file serves as documentation for the token values.
//
// src/design/tokens.ts

// Core types (optional but helpful)
type FontWeight = 300 | 400 | 500 | 600 | 700;

type TypeToken = {
  fontFamily: string;
  fontSize: string;
  lineHeight: number;
  fontWeight: FontWeight;
  letterSpacing?: string;
  textTransform?: "none" | "uppercase";
};

type MotionToken = {
  duration: string;
  easing: string;
};

export const fonts = {
  sans: `system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif`,
};

export const fontSizes = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  "2xl": "32px",
};

export const lineHeights = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.4,
  relaxed: 1.5,
};

export const fontWeights: Record<string, FontWeight> = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const letterSpacing = {
  tight: "-0.01em",
  normal: "0",
  wide: "0.08em",
};

// TYPOGRAPHY – semantic tokens
export const type = {
  heroH1: {
    fontFamily: fonts.sans,
    fontSize: fontSizes["2xl"],
    lineHeight: lineHeights.tight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.tight,
  } satisfies TypeToken,

  sectionTitle: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.snug,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  } satisfies TypeToken,

  subheading: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
  } satisfies TypeToken,

  bodyPrimary: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.relaxed,
    fontWeight: fontWeights.regular,
    letterSpacing: letterSpacing.normal,
  } satisfies TypeToken,

  bodySecondary: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.regular,
    letterSpacing: letterSpacing.normal,
  } satisfies TypeToken,

  meta: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
  } satisfies TypeToken,

  label: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.wide,
    textTransform: "uppercase",
  } satisfies TypeToken,

  tierLabel: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.snug,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  } satisfies TypeToken,

  button: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  } satisfies TypeToken,

  link: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
  } satisfies TypeToken,
};

// COLORS – neutrals, brand, tiers, surfaces
export const colors = {
  // Neutrals
  neutral: {
    50: "#F8F8F9",
    100: "#F1F1F3",
    200: "#E3E3E7",
    300: "#C9CAD1",
    400: "#A0A1AC",
    500: "#7A7B88",
    600: "#5A5B65",
    700: "#41424A",
    800: "#292A30",
    900: "#17171B",
  },

  // Brand core
  brand: {
    red: "#E1251B", // 29029 accent / Peak tier
    dark: "#101012",
    light: "#FFFFFF",
  },

  // Tiers
  tiers: {
    base: "#31BCAF",   // Base
    ridge: "#CC9933",  // Ridge
    peak: "#E1251B",   // Peak
  },

  // Semantic
  text: {
    primary: "#17171B",           // High contrast body text
    secondary: "#5A5B65",         // Muted text
    inverse: "#FFFFFF",
  },

  surface: {
    base: "#FFFFFF",
    subtle: "#F8F8F9",
    elevated: "#FFFFFF",
  },

  border: {
    subtle: "#E3E3E7",
    strong: "#C9CAD1",
  },
};

// PROGRESS / ELEVATION GRADIENT
export const gradients = {
  elevation: {
    // Use these stops to align center points under tier labels
    // In CSS: linear-gradient(to right, baseStart, baseEnd, ridgeCenter, peakEnd...)
    baseStart: "#31BCAF",
    baseEnd: "#31BCAF",
    ridgeCenter: "#CC9933",
    peakStart: "#E1251B",
    peakEnd: "#E1251B",
  },
};

// RADIUS, SHADOWS, SPACING
export const radii = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  pill: "999px",
};

export const shadows = {
  none: "none",
  sm: "0 4px 10px rgba(0, 0, 0, 0.04)",
  md: "0 10px 24px rgba(0, 0, 0, 0.06)",
  lg: "0 18px 35px rgba(0, 0, 0, 0.08)",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "40px",
};

// MOTION – durations & easing
export const motion = {
  durations: {
    fast: "120ms",
    medium: "200ms",
    slow: "280ms",
  } as Record<"fast" | "medium" | "slow", string>,

  easing: {
    standard: "cubic-bezier(0.2, 0.0, 0.2, 1)",
    decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0.0, 1, 1)",
    softSpring: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  } as Record<"standard" | "decelerate" | "accelerate" | "softSpring", string>,
};

// Example helpers for devs (optional)
export const tokens = {
  fonts,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacing,
  type,
  colors,
  gradients,
  radii,
  shadows,
  spacing,
  motion,
};

export type Tokens = typeof tokens;
