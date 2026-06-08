"use client";

import { useEffect } from "react";

/**
 * On mobile, pressing the browser back button scrolls the page to the top
 * instead of navigating away from the site.
 *
 * Works by pushing a sentinel history entry on mount; when the back button
 * pops it, we scroll to top and immediately re-push so every subsequent
 * back press does the same.
 */
export function useScrollToTopOnBack() {
  useEffect(() => {
    // Stop the browser from auto-restoring scroll position on popstate —
    // without this the browser overwrites our scrollTo after back is pressed.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Push a sentinel so there's always an entry for Back to pop.
    window.history.pushState({ portfolioRoot: true }, "");

    const onPop = () => {
      // rAF ensures our scroll runs after any lingering browser scroll restore.
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      // Re-push so the next back press also gets intercepted.
      window.history.pushState({ portfolioRoot: true }, "");
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
}
