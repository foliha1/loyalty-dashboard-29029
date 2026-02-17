

# Universal EPs Terminology System

## Overview
Standardize "EPs" terminology across the dashboard and add contextual info tooltips with a premium dark glassmorphic style on first mention per section.

## What Changes

### 1. Create a reusable `EPsLabel` component
A new component (`src/components/EPsLabel.tsx`) that:
- Renders "EPs" text
- Optionally shows a small info icon (Lucide `Info` icon, ~12px, muted opacity)
- On hover (desktop) or tap (mobile), displays a glassmorphic tooltip with the definition
- Tooltip text: "EPs (Elevation Points) are earned through events, coaching, and apparel purchases."

Tooltip styling:
- `bg-black/70 backdrop-blur-xl` for dark glassmorphic effect
- `rounded-[18px]` for 16-20px rounded corners
- `text-xs text-white/90` for small, high-contrast text
- Fade-in + slight upward slide animation (reuse existing `fade-in` keyframe or a custom subtle one)
- `border border-white/10` for subtle edge definition
- Uses Radix Tooltip primitive for accessibility and positioning

### 2. Terminology corrections (EPS to EPs)
All instances already use "EPs" -- no "EPS" (all-caps S) instances found. Terminology is already correct.

### 3. Add info icon on first mention per section

Sections and their first "EPs" mention:

| Section / File | First EPs location | Line |
|---|---|---|
| **TiersContinuum** (Elevation Journey) | "Total EPs" label | Line 112 |
| **ActivityFeed** (History) | "EPs Earned" subhead | Line 123 |
| **ImmersionsGrid** (Next Immersions) | "Elevation Points" text | Line 78 |
| **Profile page** | "Total EPs" stat card | Line 345 |

All subsequent EPs mentions within the same section render plain "EPs" text without the icon.

### 4. Files modified

| File | Change |
|---|---|
| `src/components/EPsLabel.tsx` | **New** -- reusable tooltip component |
| `src/components/TiersContinuum.tsx` | Import `EPsLabel`; replace first "Total EPs" (line 112) with `<EPsLabel showInfo />`, keep all other EPs mentions as plain text |
| `src/components/ActivityFeed.tsx` | Import `EPsLabel`; replace "EPs Earned" (line 123) with `<EPsLabel showInfo />` prefixed by "Earned"; keep category EPs values as plain text |
| `src/components/ImmersionsGrid.tsx` | Import `EPsLabel`; replace "Elevation Points" (line 78) with `Elevation Points <EPsLabel showInfo />` on first card only |
| `src/pages/Profile.tsx` | Import `EPsLabel`; replace "Total EPs" (line 345) with `Total <EPsLabel showInfo />` |

### 5. Technical details

**EPsLabel component API:**
```tsx
interface EPsLabelProps {
  showInfo?: boolean;  // show the info icon + tooltip
  className?: string;  // optional styling override
}
```

**Tooltip implementation:**
- Uses Radix `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` from existing UI primitives
- Custom className override on `TooltipContent` for the glassmorphic style
- Info icon: Lucide `Info` at 12px with `text-muted-foreground/50 hover:text-muted-foreground` transition
- The tooltip content container uses inline styles or Tailwind for the glassmorphic effect, overriding the default popover background

**Animation:**
- Reuses existing Tailwind animation utilities from the Radix tooltip (slide-in + fade), which already provides the subtle upward motion effect via `data-[side=bottom]:slide-in-from-top-2`

**No changes to:**
- Typography scale or spacing system
- Design tokens
- Tailwind config
- Any existing component APIs

