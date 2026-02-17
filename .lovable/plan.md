

# Mobile-First Refinement: Elevation Journey Section

## Overview
Adjust the top stat rows inside the "Your Elevation Journey" card so they display side-by-side on mobile instead of stacking vertically. Desktop layout remains unchanged.

## Changes (single file: `src/components/TiersContinuum.tsx`)

### 1. Current Tier + Total EPs row (lines 103-118)

**Current:** `flex flex-col md:flex-row` -- stacks on mobile, side-by-side on desktop.

**New:**
- Change to `flex flex-row items-start justify-between` at all breakpoints (always horizontal)
- Rename label from "Current Tier" to "Current Loyalty Tier"
- Left side: "Current Loyalty Tier" label + "Ridge" value, both left-aligned
- Right side: "Total EPs" label + "720" value, both right-aligned (`text-right`)
- Reduce `mb` gap from `mb-6 sm:mb-9 md:mb-12` to `mb-4 sm:mb-9 md:mb-12` for tighter mobile spacing
- Remove the `gap-4 sm:gap-5` (no longer needed since items are on the same row with `justify-between`)
- Adjust large text size on mobile: `text-3xl md:text-6xl` to avoid overflow

### 2. Next Milestone + EPs Needed row (lines 185-202)

**Current:** `flex flex-col md:flex-row` -- stacks on mobile.

**New:**
- Change to `flex flex-row items-start justify-between` at all breakpoints
- Left side: "Next Milestone" label + tier name, left-aligned
- Right side: "EPs Needed" label + remaining value, right-aligned (`text-right`)
- Remove `gap-5 sm:gap-6` since `justify-between` handles spacing
- Adjust text size: `text-xl md:text-3xl` to prevent overflow on small screens

### 3. Spacing adherence
- All spacing uses Tailwind's 8pt-based scale (mb-2 = 8px, mb-4 = 16px, gap-2 = 8px, etc.)
- No cramped stacking -- each stat pair has label above value with `mb-1 sm:mb-2` between them

## Desktop impact
None. The layout is already `flex-row` on `md:` breakpoints. We are simply making the row layout apply at all sizes, which matches the existing desktop appearance.

## Technical details

**Row 1 container (line 103):**
```
Before: "flex flex-col md:flex-row items-start md:items-center justify-between mb-6 sm:mb-9 md:mb-12 gap-4 sm:gap-5"
After:  "flex flex-row items-start justify-between mb-4 sm:mb-9 md:mb-12"
```

**Row 1 left label (line 105):**
```
Before: "Current Tier"
After:  "Current Loyalty Tier"
```

**Row 1 value text (line 106):**
```
Before: "text-4xl md:text-6xl"
After:  "text-3xl md:text-6xl"
```

**Row 1 right side (line 112):**
```
Before: "text-left md:text-right"
After:  "text-right"
```

**Row 1 right value (line 114):**
```
Before: "text-4xl md:text-6xl"
After:  "text-3xl md:text-6xl"
```

**Row 2 container (line 186):**
```
Before: "flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6"
After:  "flex flex-row items-start justify-between"
```

**Row 2 left value (line 189-191):**
```
Before: "text-2xl md:text-3xl"
After:  "text-xl md:text-3xl"
```

**Row 2 right side (line 193):**
```
Before: "text-left md:text-right"
After:  "text-right"
```

**Row 2 right value (line 195):**
```
Before: "text-2xl md:text-3xl"
After:  "text-xl md:text-3xl"
```

