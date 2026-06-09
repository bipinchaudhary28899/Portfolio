"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoadingComplete } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/* ── Premium UI showcase: a long restaurant-site screenshot living inside a
   realistic MacBook *and* an iPhone, both auto-scrolling on one shared loop so
   the desktop and mobile views start and end in perfect sync. ───────────── */
export function LaptopShowcase() {
  const sectionRef       = useRef<HTMLElement>(null);
  const laptopRef        = useRef<HTMLDivElement>(null);
  const phoneRef         = useRef<HTMLDivElement>(null);
  const viewportRef      = useRef<HTMLDivElement>(null);
  const scrollRef        = useRef<HTMLDivElement>(null);
  const phoneViewportRef = useRef<HTMLDivElement>(null);
  const phoneScrollRef   = useRef<HTMLDivElement>(null);
  const tweenRef         = useRef<gsap.core.Tween | null>(null);
  const loadingComplete  = useLoadingComplete();

  /* Re-measure the loop distance once the (tall) screenshots have actually
     loaded and laid out — image decode timing differs on mobile, so the
     first measurement can be 0 / wrong without this. */
  const remeasure = () => {
    tweenRef.current?.invalidate();
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    if (!loadingComplete) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      /* Reveal: both devices float up + settle together when they enter view */
      gsap.fromTo(
        [laptopRef.current, phoneRef.current],
        { opacity: 0, y: 60, rotateX: 8, scale: 0.96 },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          duration: 1, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      /* Honour reduced-motion: show the page top, skip the auto-scroll. */
      if (reduceMotion) return;

      /* Distance each screenshot can travel inside its own window. Measured
         from the rendered elements so it stays correct across breakpoints. */
      const maxScroll = (inner: HTMLElement | null, view: HTMLElement | null) => {
        if (!inner || !view) return 0;
        return Math.max(0, inner.scrollHeight - view.clientHeight);
      };

      /* A single proxy drives BOTH devices off one 0→1 progress value, so the
         laptop and phone always begin (p=0) and finish (p=1) at the same
         instant — regardless of their different screenshot heights. */
      const proxy = { p: 0 };
      const tween = gsap.to(proxy, {
        p: 1,
        duration: 16,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.6,
        paused: false,
        invalidateOnRefresh: true,
        onUpdate: () => {
          const dMax = maxScroll(scrollRef.current, viewportRef.current);
          const mMax = maxScroll(phoneScrollRef.current, phoneViewportRef.current);
          gsap.set(scrollRef.current,      { y: -dMax * proxy.p });
          gsap.set(phoneScrollRef.current, { y: -mMax * proxy.p });
        },
      });
      tweenRef.current = tween;
      /* Runs continuously, forever — scrolling in/out of view never pauses it. */
    }, sectionRef);

    /* Recalculate on resize / orientation change (debounced via rAF). */
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(remeasure);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      tweenRef.current = null;
      ctx.revert();
    };
  }, [loadingComplete]);

  return (
    <section
      ref={sectionRef}
      id="ui-showcase"
      className="relative flex min-h-[100svh] flex-col justify-center py-10 md:block md:min-h-0 md:py-32 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Ambient accent glow behind the devices */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(980px, 92vw)",
          height: "560px",
          background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 16%, transparent) 0%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 mb-6 md:mb-16 text-center">
        <p className="section-label mb-3">UI Engineering</p>
        <h2
          className="font-black tracking-tight leading-none mb-4"
          style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--fg)" }}
        >
          Pixel-perfect, <span className="gradient-text">end&nbsp;to&nbsp;end</span>
        </h2>
        <p
          className="text-sm md:text-base leading-relaxed mx-auto"
          style={{ color: "var(--fg-dim)", maxWidth: "44rem" }}
        >
          End-to-end web applications crafted with pixel-perfect attention to detail,
          engineered for performance, scalability, and seamless experiences across
          desktop and mobile.
        </p>
      </div>

      {/* ── Device stage: MacBook + iPhone, scrolling in sync ─────────────── */}
      <div
        className="relative z-10 mx-auto px-4 flex flex-col items-center justify-center gap-6 md:flex-row md:items-end md:gap-14 lg:gap-20"
        style={{ perspective: "1600px", maxWidth: "1140px" }}
      >
        {/* ── MacBook ─────────────────────────────────────────────────── */}
        <div
          ref={laptopRef}
          className="w-full max-w-[300px] md:max-w-[760px] md:flex-1 md:min-w-0"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {/* Screen */}
          <div
            className="relative mx-auto"
            style={{
              width: "100%",
              borderRadius: "clamp(12px, 2.4vw, 20px) clamp(12px, 2.4vw, 20px) 8px 8px",
              padding: "clamp(8px, 2.2vw, 14px) clamp(8px, 2.2vw, 14px) clamp(10px, 2.6vw, 18px)",
              background: "linear-gradient(160deg, #2a2a32 0%, #16161c 55%, #0c0c10 100%)",
              boxShadow:
                "0 2px 0 rgba(255,255,255,0.06) inset, var(--shadow-lg), 0 0 0 1px rgba(0,0,0,0.6)",
            }}
          >
            {/* Camera */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: 6, width: 6, height: 6, borderRadius: "50%",
                background: "#0a0a0f",
                boxShadow: "0 0 0 1.5px #26262e, 0 0 2px rgba(120,180,255,0.4) inset",
              }}
            />

            {/* Viewport — the desktop website lives here */}
            <div
              ref={viewportRef}
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "2940 / 1605",
                borderRadius: "6px",
                background: "#000",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.8) inset",
              }}
            >
              <div ref={scrollRef} style={{ willChange: "transform" }}>
                <Image
                  src="/images/restaurant-desktop.png"
                  alt="Restaurant website — full-page desktop UI built and designed end to end"
                  width={2940}
                  height={10562}
                  sizes="(max-width: 768px) 92vw, 700px"
                  className="block w-full h-auto select-none"
                  draggable={false}
                  priority={false}
                  onLoad={remeasure}
                />
              </div>

              {/* Subtle screen gloss */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(125deg, rgba(255,255,255,0.07) 0%, transparent 32%)" }}
              />
            </div>
          </div>

          {/* Hinge / base */}
          <div className="relative mx-auto" style={{ width: "118%", marginLeft: "-9%" }}>
            <div
              style={{
                height: 14,
                borderRadius: "0 0 12px 12px",
                background: "linear-gradient(180deg, #34343c 0%, #1c1c22 38%, #0d0d11 100%)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset, 0 14px 24px rgba(0,0,0,0.45)",
              }}
            />
            {/* Notch / opening lip */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 top-0"
              style={{
                width: "14%",
                height: 5,
                borderRadius: "0 0 8px 8px",
                background: "linear-gradient(180deg, #0a0a0e 0%, #1a1a20 100%)",
              }}
            />
          </div>
        </div>

        {/* ── iPhone ──────────────────────────────────────────────────── */}
        <div
          ref={phoneRef}
          className="shrink-0"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            width: "clamp(112px, 40vw, 244px)",
          }}
        >
          {/* Titanium frame */}
          <div
            className="relative"
            style={{
              borderRadius: "clamp(34px, 12%, 46px)",
              padding: "clamp(8px, 3.4%, 11px)",
              background: "linear-gradient(150deg, #3a3a42 0%, #1b1b21 52%, #0c0c10 100%)",
              boxShadow:
                "0 2px 0 rgba(255,255,255,0.07) inset, var(--shadow-lg), 0 0 0 1px rgba(0,0,0,0.65)",
            }}
          >
            {/* Side buttons */}
            <div aria-hidden style={{ position: "absolute", left: -2, top: "22%", width: 2, height: "10%", borderRadius: 2, background: "#222228" }} />
            <div aria-hidden style={{ position: "absolute", left: -2, top: "36%", width: 2, height: "14%", borderRadius: 2, background: "#222228" }} />
            <div aria-hidden style={{ position: "absolute", right: -2, top: "30%", width: 2, height: "16%", borderRadius: 2, background: "#222228" }} />

            {/* Screen — phone-shaped window; the mobile site scrolls inside.
               aspect-ratio matches the exact device used to capture the
               screenshot (iPhone SE, 375 × 667 pt → 750 × 1334 @2x), so the
               screenshot fills the width and the first frame shows precisely
               what that phone displayed. */}
            <div
              ref={phoneViewportRef}
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "375 / 667",
                borderRadius: "clamp(26px, 9%, 36px)",
                background: "#000",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.85) inset",
              }}
            >
              <div ref={phoneScrollRef} style={{ willChange: "transform" }}>
                <Image
                  src="/images/restaurant_iphone.png"
                  alt="Restaurant website — full-page mobile UI built and designed end to end"
                  width={750}
                  height={14376}
                  sizes="244px"
                  className="block w-full h-auto select-none"
                  draggable={false}
                  priority={false}
                  onLoad={remeasure}
                />
              </div>

              {/* Dynamic Island */}
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: "2.6%",
                  width: "34%",
                  height: "3.4%",
                  minHeight: 16,
                  borderRadius: 999,
                  background: "#05050a",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
                  zIndex: 2,
                }}
              />

              {/* Subtle screen gloss */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(125deg, rgba(255,255,255,0.08) 0%, transparent 34%)", zIndex: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
