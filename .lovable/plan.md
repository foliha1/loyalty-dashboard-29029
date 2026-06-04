## Add "The Vertical Member" Tier

**File:** `src/lib/tierConfig.ts`

1. Insert a new tier object at the **start** of the `tiers` array (before Base):
   - name: "The Vertical Member"
   - description: "Welcome to The Vertical"
   - icon: Sparkles
   - threshold: 0
   - color: "base"

2. Change the existing Base tier's `threshold` from `0` to `25`.

Ridge (400), Peak (750), and The 29 (2000) remain unchanged. Sparkles is already imported. This new tier will automatically appear in the `TierSwitcher` component since it consumes the full `tiers` array.