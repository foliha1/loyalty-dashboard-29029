
# Convert Tier Benefits and How EPs Work from Accordions to Modal Triggers

## What Changes
Replace the two accordion sections ("Tier Benefits" and "How Elevation Points (EPs) Work") with simple styled buttons that open modals. The accordion expand/collapse behavior is removed entirely -- clicking each button opens a Dialog modal with the full content instead.

## Scope
Only `src/components/TiersContinuum.tsx` is affected. The existing Dialog component and imports are already in use (for "View All Your Benefits"), so no new dependencies are needed.

## Technical Details

### 1. Remove Accordion imports (if no longer used elsewhere in the file)
Remove `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` from imports since they will no longer be used in this component.

### 2. Replace Tier Benefits accordion (lines 277-471) with a Dialog
- Replace the `<Accordion>` wrapper with a `<Dialog>` root
- The trigger becomes a styled button matching the current accordion trigger appearance (border, padding, uppercase text, chevron icon replaced with a simple arrow or kept minimal)
- The `<DialogContent>` contains the existing tier benefits content (lines 288-467), reusing the already-built "View All Your Benefits" dialog content since it's the same data
- Remove the nested "View All Your Benefits" Dialog since it becomes redundant -- the modal IS the full view now

### 3. Replace How EPs Work accordion (lines 473-537) with a Dialog
- Same pattern: `<Dialog>` root with a styled trigger button
- `<DialogContent>` contains the EPs explanation content (lines 485-533)
- Add a `<DialogHeader>` with title "How Elevation Points (EPs) Work" and a `<DialogDescription>`

### 4. Trigger button styling
Both triggers will be styled as the current accordion headers:
- `border border-border/30 rounded-lg bg-card/30 backdrop-blur-sm`
- `px-5 md:px-6 py-5 md:py-6`
- Text: `text-base md:text-lg font-normal tracking-[0.12em] uppercase`
- Keep the two-column grid layout (`grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5`)
- Replace ChevronDown with a right-arrow or info icon to indicate "opens modal" rather than "expands"

### 5. Modal content styling
Reuse the existing DialogContent styling pattern already in the file:
- `max-w-md bg-background/95 backdrop-blur-xl border-border/30 p-0 overflow-hidden`
- `max-h-[60vh] overflow-y-auto` for scrollable content
- Proper `DialogHeader`, `DialogTitle`, `DialogDescription` for accessibility
