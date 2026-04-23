

## Add "My Profile" to Navigation

**What changes:** A "My Profile" link will be added to the StickyNav, appearing in both desktop and mobile navigation, linking to `/profile`.

**File:** `src/components/StickyNav.tsx`

### Desktop Navigation
- Add a "My Profile" link next to the existing nav links, positioned before the "Log In" button.
- Style it the same as the "Log In" button (bordered, uppercase, tracking) to visually distinguish it as a utility link rather than a section anchor.

### Mobile Navigation
- Add "My Profile" as a `Link` to `/profile` in the mobile Sheet menu, placed right after the "Log In" link (both are utility links at the top, separated from section anchors).
- Same styling pattern as the existing "Log In" mobile link but without the bottom border/margin — or grouped together with it.

### Technical Details

1. In the `navLinks` array area, no changes needed — profile is a route link, not a section anchor.

2. **Desktop** (around line 128-143): Add a `<Link to="/profile">` styled identically to the existing "Log In" `<Link>`, placed immediately before it:
   ```
   <Link to="/profile" className="text-sm uppercase tracking-[0.1em] text-foreground border border-foreground/30 rounded-lg px-4 py-1.5 hover:bg-foreground/10 transition-colors duration-200">
     My Profile
   </Link>
   ```

3. **Mobile** (around line 93-102): Add a `<Link to="/profile">` right after the existing "Log In" link, with the same styling class but sharing the `mb-4` separation from nav links:
   ```
   <Link to="/profile" onClick={() => setIsOpen(false)} className="min-h-[44px] py-4 px-6 text-sm uppercase tracking-[0.1em] font-medium text-foreground transition-colors duration-300 rounded-lg border border-foreground/20 animate-fade-in">
     My Profile
   </Link>
   ```
   Move the `mb-4` from "Log In" to a wrapper or apply it to "My Profile" instead, so both utility links sit together above the section anchors.

