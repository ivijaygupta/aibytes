# Task list: AIB-83x

Plan: `docs/plans/AIB-83x-plan.md`. Spec: `docs/specs/AIB-83x-single-column-view.md`.

## T1: one column means Cards and no toggle

**Description:** Add `gridColumns` and `shownView` in a new
`apps/web/src/layout.js`, with tests. Move the card minimum into
`--app-card-min` on `.app-main` so one `.app-grid` rule reads it. Add
`useGridColumns` in `hooks.js`, which watches `<main>` with a ResizeObserver.
In `App.jsx`, render `shownView(view, columns)` and pass `onView` to Header
only when `columns > 1`. Amend §6 of the product spec and add a note to the
AIB-82y spec.

**Acceptance criteria:**
- [x] `layout.test.js` covers the spec's width table (1 at 335, 615, 603, 735,
      0; 2 at 616 and 736; 3 at 1143) and all four `shownView` cases.
- [x] With `aibytes-view=list` stored: no toggle and one column of Cards at
      375, 414, 900 and 1024. Toggle shown with List pressed, and rows, at 700,
      899, 1033 and 1440.
- [x] Cards whenever the toggle is hidden, in both Ranked and Grouped.
- [x] `localStorage['aibytes-view']` is still `list` after time at one column.
- [x] Dragging across 656px, 900px and 1033px swaps the toggle and the view
      live, with no reload. Crossing 900px remounts main.
- [x] No flash of rows at 375 on a hard reload.
- [x] AIB-82y's columns are unchanged: 1 × 603 at 900, 2 × 360 at 1033,
      3 × 370 at 1440, 1 × 335 at 375.
- [x] `docs/aibytes-app-product-spec.md` §6 and
      `docs/specs/AIB-82y-card-width.md` carry a dated amendment pointing to
      the AIB-83x spec.

**Verification:**
- [x] `npm test -w @aibytes/web`
- [x] `npm run build:web`
- [x] `npm run dev:web`, with `aibytes-view=list` set: walk the browser
      table, drag across the boundaries, and look at 375 and 1440 in light and
      dark.

**Dependencies:** None.

**Files likely touched:**
- `apps/web/src/layout.js`, `apps/web/src/layout.test.js` (new)
- `apps/web/src/hooks.js`
- `apps/web/src/App.jsx`
- `apps/web/src/app.css`
- `docs/aibytes-app-product-spec.md`
- `docs/specs/AIB-82y-card-width.md`
- `docs/plans/AIB-83x-plan.md`, `docs/plans/AIB-83x-todo.md` (new)

**Measured 2026-10-11** (dev server, `aibytes-view=list` stored, one tab
resized live except where noted): no toggle and Cards at 375 (1 × 335px, hard
reload, first grid/rows node inserted was the grid, no horizontal scroll), 414
(1 × 374px), 655 (1 × 615px), 900 (1 × 603px, main remounted into the rail
layout and was re-observed), 1024 (1 × 727px) and 1032 (1 × 735px). Toggle with
List pressed, and rows, at 656, 700, 899, 1033 and 1440. In grid view: 2 × 360px
at 1033 and 3 × 370px at 1440, as in AIB-82y. Grouped at 1024 gave four Card
grids and no rows. The stored value stayed `list` throughout. No console errors
or warnings. Screenshots at 375 (dark) and 1440 (light).

**Estimated scope:** Small. About 40 lines of code across four files, plus
tests and two dated doc notes.

## Checkpoint: before merge

- [x] Every T1 acceptance box is ticked, with the measured columns and toggle
      states noted in the PR.
- [x] `npm test -w @aibytes/web` and `npm run build:web` pass.
- [x] `git grep -n 'minmax(360px' apps/web/src` finds nothing: the minimum
      lives only in `--app-card-min`.
- [x] Reviewed by you, then merged to `main`. The AIB-83x checklist is ticked
      and the ticket closed.
