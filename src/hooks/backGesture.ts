"use client";

/* ═══════════════════════════════════════════════════════════════
   Global Back-gesture coordinator
   ---------------------------------------------------------------
   A single source of truth for the browser Back button / mobile
   swipe-back gesture, shared by every overlay on the site.

   Why one module instead of per-component history juggling:
   two independent hooks each calling pushState / history.back() and
   listening to popstate is fragile — closing one overlay could be
   misread by the other as a navigation and scroll the page to the
   top (which felt like the whole portfolio "refreshing").

   Behaviour:
   • A sentinel history entry is kept so the FIRST Back press never
     leaves the site — with no overlay open it scrolls to the top.
   • While any overlay (modal, lightbox, chat panel) is open, Back
     closes the top-most overlay and leaves the scroll position
     exactly where it was.
═══════════════════════════════════════════════════════════════ */

type OverlayEntry = { close: () => void; closedByPop: boolean };

// LIFO stack of currently-open overlays, kept in lockstep with the
// history entries each one pushes.
const stack: OverlayEntry[] = [];

let installed = false;
// Set right before a programmatic history.back() (UI close) so the
// resulting popstate is swallowed instead of acted on.
let ignoreNextPop = false;

function onPop() {
  if (ignoreNextPop) {
    ignoreNextPop = false;
    return;
  }

  // An overlay is open → Back closes the top-most one. The Back
  // navigation already removed that overlay's history entry, so we
  // must NOT touch history here — just run its close handler.
  // Scroll position is intentionally left untouched.
  const entry = stack.pop();
  if (entry) {
    entry.closedByPop = true;
    entry.close();
    return;
  }

  // No overlay open → Back scrolls to the top instead of leaving the
  // site, then re-arms the sentinel for the next press.
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  pushMarker({ pfRoot: true });
}

/**
 * True once Next.js's App Router has stamped its __NA marker onto the current
 * history entry. Next's popstate handler does a FULL PAGE RELOAD for any entry
 * whose state is missing __NA, so every entry we push must inherit it.
 */
function nextRouterReady() {
  const s = window.history.state as { __NA?: boolean } | null;
  return !!s && s.__NA === true;
}

/**
 * Push a history entry carrying our marker while preserving Next.js's internal
 * router state (__NA + the route tree). Next's patched pushState copies those
 * from the *current* entry, and we also spread them ourselves as a safety net,
 * so the resulting entry is recognised by Next on Back and resolves as a soft
 * client-side restore instead of a hard reload. Same URL → no navigation.
 */
function pushMarker(marker: Record<string, unknown>) {
  const current =
    typeof window.history.state === "object" && window.history.state !== null
      ? window.history.state
      : {};
  window.history.pushState({ ...current, ...marker }, "");
}

/** Install the sentinel + popstate listener once, lazily. */
export function ensureBackGestureInstalled() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  // Stop the browser auto-restoring scroll on popstate — we manage it,
  // and this is what keeps a UI close (history.back) from jumping.
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.addEventListener("popstate", onPop);

  // Sentinel so the first Back press has something to pop — but ONLY after
  // Next has stamped __NA on the base entry. On mount our effect runs before
  // Next's router effect (child effects fire before ancestors), so pushing the
  // sentinel too early would create an entry missing __NA and make Back reload
  // the whole page. Wait for the marker, then arm it.
  let tries = 0;
  const arm = () => {
    if (nextRouterReady() || tries++ > 120) {
      pushMarker({ pfRoot: true });
    } else {
      requestAnimationFrame(arm);
    }
  };
  arm();
}

/**
 * Register an open overlay with a close handler.
 * Returns an unregister function to call from React cleanup (i.e. when
 * the overlay closes via its own UI: X button, backdrop, or Escape).
 */
export function registerOverlay(close: () => void): () => void {
  ensureBackGestureInstalled();

  const entry: OverlayEntry = { close, closedByPop: false };
  stack.push(entry);
  pushMarker({ pfOverlay: true });

  return () => {
    const idx = stack.indexOf(entry);
    if (idx !== -1) stack.splice(idx, 1);

    // Closed via the UI (not the Back button) → remove the history entry
    // we pushed. scrollRestoration is "manual", so this does not move the
    // page. If it was already closed by Back, the entry is gone already.
    if (!entry.closedByPop) {
      ignoreNextPop = true;
      window.history.back();
    }
  };
}
