"use client";

import { useEffect, useRef } from "react";

/**
 * Makes the browser Back button (or the mobile swipe-back gesture) close an
 * open overlay — a modal, lightbox, or chat panel — instead of navigating
 * away from the site.
 *
 * While `isOpen` is true it pushes a synthetic history entry and listens for
 * `popstate`; pressing Back pops that entry and calls `onClose` instead of
 * leaving the page. Closing the overlay via the UI removes the entry again so
 * the history stays clean.
 */
export function useCloseOnBack(isOpen: boolean, onClose: () => void) {
  const onCloseRef   = useRef(onClose);
  // Tracks when WE called history.back() in cleanup so we can ignore the
  // resulting popstate — avoids a React Strict Mode double-invoke bug where
  // the cleanup's async back() fires into the re-mounted effect's listener.
  const ignoringPopRef = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;
    let poppedByBack = false;

    // Add a history entry that the Back button can pop.
    window.history.pushState({ overlay: true }, "");

    const onPop = () => {
      if (ignoringPopRef.current) {
        ignoringPopRef.current = false;
        return;
      }
      poppedByBack = true;
      onCloseRef.current();
    };
    window.addEventListener("popstate", onPop);

    return () => {
      window.removeEventListener("popstate", onPop);
      // If the overlay was closed via the UI (not the Back button), remove
      // the history entry we added so a later Back press behaves normally.
      if (!poppedByBack) {
        ignoringPopRef.current = true;
        window.history.back();
      }
    };
  }, [isOpen]);
}
