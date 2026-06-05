import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  /** CSS selector(s) for elements to reveal, relative to the section ref */
  targets: string | string[];
  /** y offset to animate from (default 40) */
  y?: number;
  /** stagger between elements (default 0.12) */
  stagger?: number;
  /** duration in seconds (default 0.7) */
  duration?: number;
  /** ScrollTrigger start - string or function (default: "top 60%" on mobile, "top 82%" on desktop) */
  start?: string | (() => string);
  /** delay before first item (default 0) */
  delay?: number;
}

/**
 * Drop-in hook for consistent fade-up-on-scroll across any section.
 * Elements are hidden immediately on mount so there's no flash.
 */
export function useScrollReveal(options: RevealOptions) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const {
      targets,
      y        = 40,
      stagger  = 0.12,
      duration = 0.7,
      start    = () => window.innerWidth < 768 ? "top 60%" : "top 82%",
      delay    = 0,
    } = options;

    const selectors = Array.isArray(targets) ? targets : [targets];
    const ctx = gsap.context(() => {
      selectors.forEach((sel, i) => {
        const els = gsap.utils.toArray<HTMLElement>(sel, ref.current ?? undefined);
        if (!els.length) return;

        // Hide immediately - prevents opacity-1 flash before trigger fires
        gsap.set(els, { opacity: 0, y });

        gsap.to(els, {
          opacity:  1,
          y:        0,
          duration,
          stagger,
          delay:    i === 0 ? delay : 0,
          ease:     "power3.out",
          scrollTrigger: {
            trigger:      els[0],
            start,
            toggleActions: "play none none none",
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
