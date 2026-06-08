"use client";

import { useEffect } from "react";
import { ensureBackGestureInstalled } from "./backGesture";

/**
 * On mobile, pressing the browser Back button scrolls the page to the top
 * instead of navigating away from the site (unless an overlay is open, in
 * which case Back closes the overlay).
 *
 * The actual logic lives in the shared back-gesture coordinator; this hook
 * simply makes sure it's installed once the app has mounted.
 */
export function useScrollToTopOnBack() {
  useEffect(() => {
    ensureBackGestureInstalled();
  }, []);
}
