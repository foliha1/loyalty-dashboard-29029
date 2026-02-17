

# Redesign Header Navigation Behavior

## Problem
The current `StickyNav` hides completely when at the top of the page (`opacity-0 -translate-y-full`) and only appears after scrolling 300px. This creates an inconsistent reveal and means the nav is entirely absent at the top of the page.

## Solution
Replace the show/hide behavior with a persistent sticky header that is always visible but transitions from transparent to a dark blurred background on scroll.

## Changes

### 1. Rewrite `StickyNav` scroll behavior (`src/components/StickyNav.tsx`)

**Remove:**
- The `isVisible` boolean state and the `scrollY > 300` threshold
- The `opacity-0 -translate-y-full pointer-events-none` conditional classes

**Replace with:**
- An `isScrolled` boolean (`scrollY > 20`) that controls background appearance
- The nav is always `fixed top-0 left-0 right-0 z-50` and always visible
- When not scrolled: fully transparent background, no border
- When scrolled: `bg-background/70 backdrop-blur-xl border-b border-white/10`
- Transition: `transition-all duration-200 ease-in-out` (200ms as specified)

### 2. Upgrade mobile menu to full-screen slide-in (`src/components/StickyNav.tsx`)

**Current:** Sheet with `w-[280px]` -- partial-width drawer.

**New:** Full-screen overlay from the right:
- Change SheetContent to `w-full sm:w-full` (full width)
- Apply `bg-background/95 backdrop-blur-2xl` for immersive glassmorphic feel
- Center the nav links vertically for a premium full-screen menu look
- Increase link touch targets to `min-h-[44px] py-4` (minimum 44px)
- Animate hamburger icon to X on open (the Sheet already handles the X close button)
- Add staggered fade-in animation on nav links for a soft spring feel

### 3. Prevent layout shift (`src/pages/Index.tsx`)

**Current:** `UserHeader` sits directly in the document flow. Since the nav is now always fixed at the top, we need a spacer so the UserHeader content does not hide behind the nav bar.

**Add:** A `pt-14` (56px, matching the nav height `h-14`) padding-top on the UserHeader or a spacer div before it, so content starts below the fixed nav.

### 4. UserHeader adjustment (`src/components/UserHeader.tsx`)

- Add `pt-14` to the section element to account for the fixed nav overlay, preventing the logo/avatar from being hidden behind the sticky nav bar

## Files Modified

| File | Change |
|---|---|
| `src/components/StickyNav.tsx` | Replace show/hide with always-visible transparent-to-blur transition; full-screen mobile menu with 44px touch targets and staggered link animations |
| `src/components/UserHeader.tsx` | Add top padding (`pt-14`) to clear the fixed nav |

## Technical Details

**Desktop nav element classes:**
```
// Always:
"fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out"

// When at top (not scrolled):
"bg-transparent border-b border-transparent"

// When scrolled:
"bg-background/70 backdrop-blur-xl border-b border-white/10"
```

**Mobile full-screen menu SheetContent:**
```
"w-full max-w-full bg-background/95 backdrop-blur-2xl border-l-0"
```

**Nav link touch targets (mobile):**
```
"min-h-[44px] py-4 px-6 text-sm uppercase tracking-[0.2em]"
```

**Staggered link entrance animation:**
Each nav link gets an incremental `animationDelay` (e.g., 50ms, 100ms, 150ms...) with `animate-fade-in` for a soft sequential reveal when the menu opens.

**No changes to:**
- Design tokens or Tailwind config
- Typography scale
- Any other component files
- Sheet primitive component
