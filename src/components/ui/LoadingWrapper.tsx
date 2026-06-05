"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LoadingContext } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/* Lazy-load so GSAP never blocks the initial HTML */
const LoadingScreen = dynamic(() => import("./LoadingScreen"), { ssr: false });

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [loading, setLoading] = useState(true);
  const contentRef            = useRef<HTMLDivElement>(null);

  /* Disable browser scroll restoration so it never jumps mid-page on reload */
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  /* Prevent mobile URL bar hide/show from triggering constant ScrollTrigger refreshes.
     A single, deliberate refresh is done after loading instead (see below). */
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
  }, []);

  const handleComplete = useCallback(() => {
    /* Force back to top before revealing content */
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setLoading(false);
  }, []);

  /* Fade the page in once the loading screen has exited */
  useEffect(() => {
    if (loading || !contentRef.current) return;

    /* Second guard: ensure we're at the top even if scroll happened during fade */
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    contentRef.current.style.opacity = "1";

    /* Refresh ScrollTrigger after the content is visible. We refresh several
       times because trigger positions can shift after the loading fade:
        - images decoding and reserving their final height
        - web-fonts swapping in and reflowing text
        - the mobile browser URL bar collapsing on the first scroll, which
          changes innerHeight. Because we run with `ignoreMobileResize: true`
          (to avoid jitter), that one legitimate height change must be picked
          up manually, otherwise every section's start position is computed
          against the *tall* initial viewport and the reveals fire too early -
          so the mid-page sections appear already-revealed (static) by the
          time you scroll to them.                                          */
    const timers = [120, 400, 900].map((ms) =>
      setTimeout(() => ScrollTrigger.refresh(), ms)
    );

    const refresh = () => ScrollTrigger.refresh();

    /* Fires once everything (images/fonts) has fully loaded */
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }

    /* Re-measure after fonts swap in */
    type FontFaceSetLike = { ready?: Promise<unknown> };
    const fonts = (document as Document & { fonts?: FontFaceSetLike }).fonts;
    fonts?.ready?.then(refresh).catch(() => {});

    /* Pick up the *first* significant viewport-height change (URL bar
       collapsing). We only refresh on large deltas and debounce so normal
       scrolling never triggers a refresh storm. */
    let lastH = window.innerHeight;
    let settleId: ReturnType<typeof setTimeout>;
    const onViewportResize = () => {
      const h = window.visualViewport?.height ?? window.innerHeight;
      if (Math.abs(h - lastH) < 40) return;
      lastH = h;
      clearTimeout(settleId);
      settleId = setTimeout(refresh, 180);
    };
    const vv = window.visualViewport;
    vv?.addEventListener("resize", onViewportResize);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(settleId);
      window.removeEventListener("load", refresh);
      vv?.removeEventListener("resize", onViewportResize);
    };
  }, [loading]);

  /* ── Reveal safety net ────────────────────────────────────────────────────
     A reveal animation plays via ScrollTrigger's "play" toggle action the
     moment its start line is crossed. When the page is scrolled very fast (a
     touch fling) or moved programmatically, the browser can advance the scroll
     position past a section's entire start→end range between two ScrollTrigger
     samples. The "active" state is never observed, so "play" never fires and
     the section stays at opacity 0 - appearing static. It only heals if you
     scroll back through it slowly. Because it depends on frame timing, it is
     intermittent.

     After scrolling settles we walk every trigger and instantly complete any
     reveal whose start has already been passed but that never played. We skip
     scrubbed triggers and any animation currently mid-play (so we never cut a
     normal reveal short). Count-up triggers (onEnter, no attached tween) are
     fired the same way. */
  useEffect(() => {
    if (loading) return;

    type STLike = {
      vars: { scrub?: unknown; onEnter?: (self: unknown) => void };
      scroll: () => number;
      start: number;
      animation?: { progress: (v?: number) => number; isActive: () => boolean };
      _caughtUp?: boolean;
    };

    const catchUp = () => {
      ScrollTrigger.update();
      (ScrollTrigger.getAll() as unknown as STLike[]).forEach((st) => {
        if (st.vars.scrub) return;
        if (st.scroll() < st.start) return; // start not reached - let it animate later
        const anim = st.animation;
        if (anim) {
          if (!anim.isActive() && anim.progress() < 1) anim.progress(1);
        } else if (st.vars.onEnter && !st._caughtUp) {
          st._caughtUp = true;
          try { st.vars.onEnter(st); } catch { /* noop */ }
        }
      });
    };

    let settle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(catchUp, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading]);

  return (
    <LoadingContext.Provider value={!loading}>
      {loading && <LoadingScreen onComplete={handleComplete} />}

      {/*
        opacity starts at 0; the inline transition lets it fade in smoothly.
        Hero, Navbar, and any other components that use useLoadingComplete()
        will start their own GSAP timelines only after this div is revealed.
      */}
      <div
        ref={contentRef}
        style={{ opacity: 0, transition: "opacity 0.4s ease" }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
