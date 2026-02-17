
# Align Overview Section Labels to Match "Your Journey" Type Scale on Mobile

## What Changes
The top overview card (tier progress section) currently uses a different label style (`text-supporting uppercase tracking-[0.25em] text-xs font-normal`) for its content headers -- "Current Loyalty Tier", "Total EPs", "Next Milestone", "EPs Needed". These should use the same `text-subhead` class that the "Your Journey" section uses, ensuring consistent typographic hierarchy on mobile.

## Scope
Only `src/components/TiersContinuum.tsx` is affected. No redesign -- just swapping label classes.

## Technical Details

In `TiersContinuum.tsx`, replace the label styling on all four content headers:

**Lines affected:**
- Line 103: "Current Loyalty Tier" label -- change from `text-supporting uppercase tracking-[0.25em] mb-2 sm:mb-3 text-xs font-normal` to `text-subhead mb-2 sm:mb-3`
- Line 111: "Total EPs" label -- change from `text-supporting uppercase tracking-[0.25em] mb-2 sm:mb-3 text-xs font-normal` to `text-subhead mb-2 sm:mb-3`
- Line 186: "Next Milestone" label -- change from `text-supporting uppercase tracking-[0.25em] mb-2 text-xs font-normal` to `text-subhead mb-2`
- Line 192: "EPs Needed" label -- change from `text-supporting uppercase tracking-[0.25em] mb-2 text-xs font-normal` to `text-subhead mb-2`

This ensures all content header labels across both sections share the same `text-subhead` token (0.65rem, weight 300, uppercase, tracking 0.2em, muted color) for a consistent visual hierarchy.
