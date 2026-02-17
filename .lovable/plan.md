

## Remove Card Gradient and Diagonal Overlay

**What changes**: Replace the diagonal gradient backgrounds on `.card-29029` cards with a flat, solid dark background. Remove the `::before` pseudo-element that adds a tier-accent diagonal sheen.

**Why**: The 135-degree gradient and overlay create subtle diagonal "slashes" across cards that conflict with the premium, restrained aesthetic.

### Technical Details

**File: `src/index.css`**

1. **Lines 523-528** (first `.card-29029` definition): Replace `linear-gradient(135deg, ...)` with a flat solid color: `background: hsl(0 0% 6%);`

2. **Lines 792-805** (second `.card-29029` in `@layer utilities`): Replace the `linear-gradient(135deg, ...)` with a flat solid: `background: hsl(0 0% 6%);` and remove `backdrop-filter: blur(20px);` (unnecessary on a solid bg).

3. **Lines 807-819** (`.card-29029::before`): Remove the entire `::before` rule block (the diagonal tier-accent overlay).

4. **Lines 821-823** (`.card-29029:hover::before`): Remove this rule since `::before` no longer exists.

No layout, spacing, typography, or data changes.

