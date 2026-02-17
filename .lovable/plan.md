

## Remove the Scroll Vignette Overlay

**Problem**: A fixed `radial-gradient` overlay (lines 31-43 in `Index.tsx`) creates a visible circular artifact spanning the full viewport. It was intended to add cinematic depth on scroll but is instead producing a distracting static ring.

**Change**: Remove the vignette overlay element and its associated hook/state.

### Technical Details

**File: `src/pages/Index.tsx`**
- Remove the `useScrollVignette` import (line 9)
- Remove the `scrollProgress` and `vignetteIntensity` variables (lines 14-15)
- Remove the entire vignette `<div>` element (lines 31-43)
- Keep the `useParallax` hook and parallax background layer as-is

No other files need changes. The `useScrollVignette` hook file can stay in case it's needed later -- it just won't be imported.

