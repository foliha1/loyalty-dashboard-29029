## Problem
On mobile and tablet viewports, the four tier titles (Member, Base, Ridge, Peak) and their threshold numbers render horizontally with `whitespace-nowrap`. Even at `text-[10px]`, they crowd together and bump against the card edges — especially the left-anchored "Member" and right-anchored "Peak" labels.

## Solution
Rotate the tier name text vertically on viewports below the `md` breakpoint, while keeping desktop layout unchanged.

### Changes in `src/components/TiersContinuum.tsx`

1. **Tier name text rotation**
   - Add a conditional class to the tier name `<div>` (around line 349):
     - Mobile/tablet (`sm:` and below): `writing-mode-vertical` class with `writing-mode: vertical-rl` and `text-orientation: mixed`
     - Desktop (`md:` and up): keep current horizontal text
   - Remove or override `whitespace-nowrap` on small screens since vertical text doesn't need it.

2. **Container height adjustment**
   - Increase the marker container height on small screens (currently `h-16`) to accommodate vertical text height — e.g. `h-16 sm:h-20 md:h-16` or similar, tuned after visual check.

3. **Alignment cleanup**
   - With vertical text, `text-left`/`text-right`/`text-center` are less meaningful. On small screens, align the label block consistently (centered under the dot).
   - Keep the endpoint anchoring logic (`translateX(0)` for first, `translateX(-100%)` for last) so dots stay at bar ends.

4. **Threshold numbers**
   - Keep threshold numbers horizontal but allow them to sit below the vertical name, or optionally hide them on the smallest screens if still cramped.

### No other changes
- Desktop (`md:`+) remains exactly as-is.
- Dot styling, colors, glow effects, progress fill logic, and all other card content are untouched.