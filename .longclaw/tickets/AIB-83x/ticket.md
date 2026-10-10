---
format: longclaw.ticket/v1
id: 2fb5c26e-50a5-485d-8a30-33ec7bbc40b7
key: AIB-83x
title: Hide the grid/list toggle whenever the grid is one column
status: done
priority: p2
labels:
  - app
type: feature
created_at: 2026-10-10T23:06:43.477Z
updated_at: 2026-10-10T23:35:12.164Z
---

Whenever the edition grid is one column, hide the grid/list view toggle in the Header and show Cards, even if list view is selected. A single card in a row looks the same in either mode, and a ListRow doesn't have the width for its row layout there.

## The rule

The trigger is the grid's actual column count, not a device or a fixed mobile breakpoint. **One column → no toggle, Card view.** Two or more columns → toggle shown, and the stored choice is respected.

Where that happens today (`apps/web/src/app.css`, 16px grid gap):

| Layout | Grid | One column when |
|---|---|---|
| Narrow, no rail (<900px) | `minmax(min(300px,100%),1fr)` | content width < ~616px (phones, small tablets) |
| Wide, beside the rail (≥900px) | `minmax(360px,1fr)` | viewport ≲ 1033px (grid gets viewport − 297px) |

Both cases count. Because the grid is `auto-fill`, the implementation should work out the real column count, for example with a ResizeObserver on `.app-grid` reading the computed `grid-template-columns`, or the same formula from the container width. Copying the breakpoints by hand would drift the next time the minmax changes (see AIB-82y).

## Scope

- Hide the toggle (the `view` / `onView` passed to `Header` in `apps/web/src/App.jsx`) while the grid is one column.
- While it is hidden, render the Card grid even when the stored `aibytes-view` pref (`apps/web/src/prefs.js`) is `list`. Don't overwrite the pref, so widening the window (or opening on desktop) brings list back.
- If Ledger's Header has no way to leave the toggle out, add one in `packages/design-system` and update the `.jsx`, `.d.ts` and `.prompt.md` together.

## Done when

- At 375px and 414px, and at 900–1024px beside the rail, the Header shows no toggle and the edition renders as Cards, including with `aibytes-view=list` stored.
- At widths with two or more columns, the toggle shows and works, and the stored pref is respected.
- Resizing across the one-column boundary switches the toggle and view live, with no reload.
- `npm test -w @aibytes/web` passes, with a test for the column-count → effective-view rule.


## Checklist

- [x] T1: one column means Cards and no toggle (docs/plans/AIB-83x-todo.md) <!-- longclaw:item=ck_ba3d9c06 -->
## Activity

<!-- longclaw:event
id: evt_7c0a2cae
kind: create
occurred_at: 2026-10-10T23:06:43.477Z
actor:
  type: agent
  id: claude-code
-->
### claude-code created this ticket
<!-- /longclaw:event -->

<!-- longclaw:event
id: evt_db91dc3f
kind: update
occurred_at: 2026-10-10T23:07:01.899Z
actor:
  type: human
  id: local
changes:
  - field: status
    from: todo
    to: in_progress
-->
### You updated this ticket
<!-- /longclaw:event -->

<!-- longclaw:event
id: evt_50239980
kind: update
occurred_at: 2026-10-10T23:08:51.633Z
actor:
  type: agent
  id: claude-code
changes:
  - field: title
    from: Hide the grid/list toggle on mobile, where the grid is one column
    to: Hide the grid/list toggle whenever the grid is one column
  - field: description
-->
### claude-code updated this ticket

Scope widened per user: the rule is any single-column grid, including 900–1033px beside the rail, not just mobile.
<!-- /longclaw:event -->

<!-- longclaw:event
id: evt_7f06a44a
kind: comment
occurred_at: 2026-10-10T23:12:41.290Z
actor:
  type: agent
  id: claude-code
-->
### claude-code commented

Spec drafted: docs/specs/AIB-83x-single-column-view.md (branch aib-83x-single-column-view).
<!-- /longclaw:event -->

<!-- longclaw:event
id: evt_6725746b
kind: update
occurred_at: 2026-10-10T23:14:45.978Z
actor:
  type: agent
  id: claude-code
changes:
  - field: checklist.ck_ba3d9c06.added
    to: "T1: one column means Cards and no toggle (docs/plans/AIB-83x-todo.md)"
-->
### claude-code updated this ticket
<!-- /longclaw:event -->

<!-- longclaw:event
id: evt_2d743705
kind: update
occurred_at: 2026-10-10T23:35:12.164Z
actor:
  type: agent
  id: claude-code
changes:
  - field: status
    from: in_progress
    to: done
  - field: checklist.ck_ba3d9c06.checked
    from: "false"
    to: "true"
-->
### claude-code updated this ticket

T1 shipped in PR #36: one column means Cards and no grid/list toggle.
<!-- /longclaw:event -->
