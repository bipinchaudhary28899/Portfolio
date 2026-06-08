"use client";

import { useEffect, useRef } from "react";
import { registerOverlay } from "./backGesture";

/**
 * Makes the browser Back button (or the mobile swipe-back gesture) close an
 * open overlay — a modal, lightbox, or chat panel — instead of navigating
 * away from the site.
 *
 * Closing the overlay (Back button OR an in-UI close) leaves the page exactly
 * where it was: it never scrolls to the top or re-renders the page. All of the
 * history coordination lives in the shared back-gesture module so multiple
 * overlays can't fight over the Back button.
 */
export function useCloseOnBack(isOpen: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    // Some overlays lock <body> scrolling while open, which can make mobile
    // browsers jump to the top. Snapshot the scroll position and restore it on
    // close as a safety net (no-op for overlays that don't lock scroll).
    const savedY = window.scrollY;

    const unregister = registerOverlay(() => onCloseRef.current());

    return () => {
      unregister();
      requestAnimationFrame(() =>
        window.scrollTo({ top: savedY, behavior: "instant" as ScrollBehavior }),
      );
    };
  }, [isOpen]);
}
