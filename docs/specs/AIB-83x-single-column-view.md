# Spec: no grid/list toggle on a one-column grid (AIB-83x)

Status: **reviewed 2026-10-11; open question resolved (no hysteresis).**
Ticket: `.longclaw/tickets/AIB-83x/ticket.md`. Amends the view toggle in
`docs/aibytes-app-product-spec.md` §6.

## Objective

Whenever the edition grid would be one column, the Header shows no grid/list
toggle and the edition renders as Cards, even if the reader chose list view.

- **Who sees it:** readers of aibytes.io on a phone, and on desktop windows
  from 900px to about 1032px wide, where the grid beside the rail is also one
  column (AIB-82y).
- **Why:** with one column, grid and list differ only in how one item fills a
  row. The Card is built for that, but the ListRow's row layout has no room
  below about 616px. A toggle that switches between nothing useful is a dead
  control, and the Header's own rule is that a surface shows no dead control.
- **What the reader keeps:** the stored choice. Someone who picked list on a
  wide window gets list back as soon as the grid has two columns again: on
  resize, on a later visit, or on another device with the same browser storage.

### The rule

```
columns < 2  →  no toggle, Cards
columns ≥ 2  →  toggle shown, the stored view
```

"Columns" means the column count the Card grid would have at the current width
of `<main>`, whichever view is on screen. It does not mean a device class or a
fixed breakpoint. It has to be computed, not read off `.app-grid`, because in
list view there is no grid to read.

Where it bites today (16px `--grid-gap`):

| Layout | Card minimum | One column while main's content width is | Roughly, by viewport |
|---|---|---|---|
| Narrow, no rail (<900px) | `min(300px,100%)` | < 616px (2×300 + 16) | < 656px (main's 20px padding each side) |
| Wide, beside the rail (≥900px) | `360px` | < 736px (2×360 + 16) | 900–1032px (viewport less 297px) |

The viewport column is only a guide. A classic scrollbar takes about 15px from
main but not from a media query. That's why the rule measures main.

### How it works

1. **One source for the card minimum.** `app.css` sets it as a custom property
   on main, and the grid reads it:

   ```css
   .app-main{--app-card-min:300px}
   .app-cols .app-main{--app-card-min:360px}
   .app-grid{grid-template-columns:repeat(auto-fill,minmax(min(var(--app-card-min),100%),1fr))}
   ```

   The separate `.app-cols .app-grid` rule goes away. Beside the rail main is
   always at least 603px wide, so `min(360px,100%)` is always 360px and
   AIB-82y's columns don't change.

2. **A pure function, unit-tested,** in a new `apps/web/src/layout.js`:

   ```js
   // auto-fill's count: as many min-wide tracks, plus gaps, as fit; never fewer than one.
   export function gridColumns(width, min, gap) {
     return Math.max(1, Math.floor((width + gap) / (min + gap)));
   }
   // The view on screen: a single column is always Cards, whatever is stored.
   export function shownView(view, columns) {
     return columns < 2 ? "grid" : view;
   }
   ```

3. **A hook,** `useGridColumns(ref)` in `hooks.js`. A `ResizeObserver` on
   `<main>` reads its content-box width, along with `--app-card-min` and
   `--grid-gap` from `getComputedStyle(main)`, and returns `gridColumns(...)`.
   The first measurement runs in a layout effect, so a stored `list` never
   flashes as rows before the first paint on a phone.

4. **App wiring,** in `apps/web/src/App.jsx`:
   - `const columns = useGridColumns(mainRef)` and
     `const shown = shownView(view, columns)`.
   - `body()` renders with `shown`, not `view`.
   - Header gets `onView={columns > 1 ? setView : undefined}`. Header already
     drops the toggle when `onView` is absent, so Ledger needs no change.
     `view={view}` still goes in, so the pressed state is right the moment the
     toggle comes back.

### Out of scope

- Ledger's `Header`, `Card`, `ListRow`, the UI kit, and the design-system
  bundle. No component changes.
- Any change to the grid minimums, breakpoints, or AIB-82y's single column at
  900–1032px. This spec only reacts to them.
- A responsive ListRow that could work at phone width.
- The Chrome extension (AIB-8h, planned), which will apply the same rule when
  it gets a grid.

## Tech stack

`apps/web`: Vite + React 18, plain CSS, Ledger tokens. `ResizeObserver` and CSS
custom properties are baseline in every browser the app targets. No new
dependencies.

## Commands

```bash
npm run dev:web                 # http://localhost:5173/
npm run build:web               # must build clean
npm test -w @aibytes/web        # node --test: must stay green, plus layout.test.js
```

## Project structure: files touched

```
apps/web/src/layout.js              new: gridColumns, shownView
apps/web/src/layout.test.js         new: the column table and the view rule
apps/web/src/hooks.js               useGridColumns(ref)
apps/web/src/App.jsx                ref on <main>; shown view; onView only when columns > 1
apps/web/src/app.css                --app-card-min on main; one .app-grid rule reads it
docs/aibytes-app-product-spec.md    §6: dated amendment to the Header and Grid view bullets
docs/specs/AIB-82y-card-width.md    dated note: success criterion 1 now reads through --app-card-min
```

## Code style

Match `apps/web`: small pure modules with a `*.test.js` beside them, a hook in
`hooks.js` with a one-line `/** */` doc, and `app.css` one rule per line with a
comment that shows the arithmetic. The comment above the narrow grid should
say why the minimum is a custom property: the JS reads it to count columns.
Spec amendments are dated and point here, for example *"Amended 2026-10-11
by AIB-83x: …; see `docs/specs/AIB-83x-single-column-view.md`."*

## Testing strategy

**Unit (`layout.test.js`, node --test):**

| width | min | gap | columns |
|---|---|---|---|
| 335 (375 phone) | 300 | 16 | 1 |
| 615 | 300 | 16 | 1 |
| 616 | 300 | 16 | 2 |
| 603 (900 beside rail) | 360 | 16 | 1 |
| 735 (1032) | 360 | 16 | 1 |
| 736 (1033) | 360 | 16 | 2 |
| 1143 (1440) | 360 | 16 | 3 |
| 0 (not laid out yet) | 300 | 16 | 1 |

And `shownView`: `("list", 1) → "grid"`, `("grid", 1) → "grid"`,
`("list", 2) → "list"`, `("grid", 3) → "grid"`.

**Browser (dev server, `aibytes-view=list` stored):**

| Viewport | Toggle | On screen |
|---|---|---|
| 375, 414 | hidden | Cards, one column |
| 700, 899 | shown, List pressed | rows |
| 900, 1024 | hidden | Cards, one column beside the rail |
| 1033, 1440 | shown, List pressed | rows |

Also check:
- Dragging the window across 1033px and 656px swaps the toggle and the view
  live, with no reload.
- `localStorage['aibytes-view']` is still `list` after a one-column stretch.
- At 375 there's no flash of rows on load.
- The columns at 1033, 1280 and 1440 still match AIB-82y.
- Light and dark at 375 and 1440.

## Boundaries

- **Always:** keep the stored pref untouched while the toggle is hidden. Keep
  `min(…,100%)` and `.app-grid>*{min-width:0}`. Amend the product spec in the
  same PR. Ship it as one PR to `main` from `aib-83x-single-column-view`.
- **Ask first:** any change to a Ledger component, a grid minimum, or a
  breakpoint, and any hysteresis or debounce beyond what ResizeObserver gives.
- **Never:** hard-code viewport breakpoints in JS to stand in for the column
  count. Never write `grid` into storage on the reader's behalf. Never
  hand-edit the design-system bundle.

## Success criteria

1. With `aibytes-view=list` stored, the viewports in the browser table show
   exactly the toggle state and view listed.
2. Whenever the toggle is hidden, the edition is Cards, in both Ranked and
   Grouped.
3. The stored pref survives any time spent at one column.
4. Crossing the one-column boundary updates the toggle and the view live.
5. AIB-82y's column counts are unchanged at ≥900px.
6. `npm test -w @aibytes/web` passes with the new `layout.test.js`, and
   `npm run build:web` builds clean.

## Assumptions

1. "Single column" includes 900–1032px beside the rail, not just phones (the
   user, 2026-10-11).
2. Measuring `<main>`'s content box gives the grid's width. The grid is a
   direct child of `.app-sec` inside main, with no extra padding in between.
3. The toggle disappears with no animation and no notice. The cards are the
   only change a reader sees.

## Open questions

None. Resolved 2026-10-11: ship without hysteresis. If the toggle flickers at
the boundary in the browser, that is a follow-up, not a blocker.
