// The Card grid's column count, worked out rather than read off .app-grid:
// in list view there is no grid to read. One column means the grid/list
// toggle has nothing to switch, so Cards show and the toggle hides (spec
// AIB-83x single-column-view).

/** auto-fill's count: as many `min`-wide tracks, plus gaps, as fit in `width`; never fewer than one. */
export function gridColumns(width, min, gap) {
  return Math.max(1, Math.floor((width + gap) / (min + gap)));
}

/** The view on screen: a single column is always Cards, whatever is stored. */
export function shownView(view, columns) {
  return columns < 2 ? "grid" : view;
}
