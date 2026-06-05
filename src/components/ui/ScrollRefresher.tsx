"use client";

/* ═══════════════════════════════════════════════════════════════
   ScrollRefresher — keeps GSAP ScrollTrigger positions correct when
   the document height changes for reasons other than a window resize
   (e.g. opening/closing the mobile accordions in Work Experience,
   Education, or Community Contributions).

   ScrollTrigger computes each trigger's start/end from the layout at
   creation time. When an accordion expands, everything below it shifts
   down, so without a refresh the upcoming sections would animate at the
   wrong scroll position. A ResizeObserver watches the document height
   and calls ScrollTrigger.refresh() once the layout settles.
═══════════════════════════════════════════════════════════════ */

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollRefresher() {
  useEffect(() => {
    let lastHeight = document.documentElement.scrollHeight;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const ro = new ResizeObserver(() => {
      // Debounce: wait until the height stops changing (accordion
      // transitions run ~0.35s) before recalculating, so we refresh once.
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const h = document.documentElement.scrollHeight;
        if (h !== lastHeight) {
          lastHeight = h;
          ScrollTrigger.refresh();
        }
      }, 200);
    });

    ro.observe(document.body);
    return () => {
      ro.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
