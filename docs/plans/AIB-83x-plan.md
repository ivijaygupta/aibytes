# Implementation Plan: AIB-83x, no grid/list toggle on a one-column grid

Spec: `docs/specs/AIB-83x-single-column-view.md`.
Ticket: `.longclaw/tickets/AIB-83x/ticket.md`. Task list: `docs/plans/AIB-83x-todo.md`.

## Overview

One task, one PR, on branch `aib-83x-single-column-view`:

1. **T1** counts the grid's columns from `<main>`'s width and the card minimum.
   Below two columns, it hides the toggle and renders Cards. It also amends the
   two docs. The ticket, spec, this plan and the task list ship in the same PR.

The pieces have to land together. The CSS variable alone does nothing, the
column count alone has no consumer, and the wiring needs both. Split into
separate PRs, each would be dead code or a half-feature on `main`.

## Dependency graph

```
app.css  --app-card-min on .app-main ──┐
                                       ├─> hooks.js useGridColumns(main) ──> App.jsx: shownView, onView gate
layout.js gridColumns, shownView ──────┘                                     (Header unchanged: no onView, no toggle)
```

Build order inside T1: `layout.js` and its test first (red, then green), then
the CSS variable (a refactor with no visual change, checked at 1440 and 375),
then the hook and the App wiring, then the docs.

## Architecture decisions (from the spec)

- **The rule is the column count, not a breakpoint.** It is measured from
  `<main>`'s content box, because in list view there is no grid to read.
- **One source for the card minimum:** `--app-card-min` on main (300px narrow,
  360px beside the rail). The grid and the JS both read it.
- **Ledger is untouched.** Header already drops the toggle when `onView` is
  absent.
- **The stored pref is never written** by the one-column rule.
- **No hysteresis** (resolved 2026-10-11).

## Risks

| Risk | Mitigation |
|---|---|
| `<main>` remounts when the layout crosses 900px (it moves into `.app-cols`), so an observer on the old node goes stale | Hold main in state through a callback ref (or key the effect on `wide`), and re-observe the new node. Check it by dragging across 900px. |
| A stored `list` flashes as rows on a phone before the first measurement | Measure in a layout effect. Until main exists, report 1 column (the conservative case: Cards, no toggle). Check at 375 on a hard reload. |
| The CSS refactor shifts AIB-82y's columns | Re-measure `gridTemplateColumns` at 900, 1033, 1440 and 375 against the AIB-82y table. |
| `getComputedStyle` returns `--app-card-min` as `" 300px"` | Parse with `parseFloat` after trimming. A unit test covers the parse if it lives in `layout.js`. |
| Toggle flickers at the 1033px boundary | Accepted (no hysteresis). Note it in the PR if seen. |

## Verification checkpoint

The spec's unit table and browser table, plus `npm run build:web` and
`npm test -w @aibytes/web`. Then the PR is reviewed and merged to `main`, and
the ticket is closed.
