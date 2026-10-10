import assert from "node:assert/strict";
import { test } from "node:test";
import { gridColumns, shownView } from "./layout.js";

// Widths are main's content box; 300 is the narrow card minimum, 360 the one
// beside the rail, and 16 Ledger's --grid-gap (spec AIB-83x).
test("columns are as many minimum-wide tracks, plus gaps, as fit", () => {
  assert.equal(gridColumns(335, 300, 16), 1); // a 375px phone
  assert.equal(gridColumns(615, 300, 16), 1);
  assert.equal(gridColumns(616, 300, 16), 2);
  assert.equal(gridColumns(603, 360, 16), 1); // 900px, beside the rail
  assert.equal(gridColumns(735, 360, 16), 1); // 1032px
  assert.equal(gridColumns(736, 360, 16), 2); // 1033px
  assert.equal(gridColumns(1143, 360, 16), 3); // 1440px
});

test("never fewer than one column, even before main is laid out", () => {
  assert.equal(gridColumns(0, 300, 16), 1);
  assert.equal(gridColumns(120, 300, 16), 1);
});

test("a single column always shows Cards, whatever is stored", () => {
  assert.equal(shownView("list", 1), "grid");
  assert.equal(shownView("grid", 1), "grid");
  assert.equal(shownView("list", 2), "list");
  assert.equal(shownView("grid", 3), "grid");
});
