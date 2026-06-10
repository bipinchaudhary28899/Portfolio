"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoadingComplete } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/* ── Before / After reveal ──────────────────────────────────────────────
   Two pixel-aligned images share one box: the finished "after" render is the
   base layer, and the "before" sketch sits on top, clipped to `pos%`. Drag the
   handle (mouse, touch, or keyboard) to wipe between the rough idea and the
   polished, shipped result. ─────────────────────────────────────────────── */

// Left (revealed) = Spider-Man, right (base) = Venom. Both ~4:3, so they sit
// in a 4/3 box with object-cover and line up cleanly.
const AFTER_SRC  = "/images/venom.jpeg";      // base layer — right side
const BEFORE_SRC = "/images/spiderman.jpeg";  // clipped on top — left side
const ASPECT = "7 / 5";
// Vertical anchor per image (object-position Y) — the 7/5 box is slightly wider
// than the ~4/3 images, so there's vertical slack to nudge each head into line.
// Higher % shifts that image UP in the frame.
const SPIDEY_Y = "50%";
const VENOM_Y  = "85%"; // Venom nudged up to meet Spider-Man's head

export function BeforeAfter() {
  const sec        = useRef<HTMLElement>(null);
  const boxRef     = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [interacted, setInteracted] = useState(false);
  const dragging   = useRef(false);
  const loadingComplete = useLoadingComplete();

  /* Convert a clientX into a clamped 0–100 reveal percentage. */
  const setFromX = (clientX: number) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setInteracted(true);
    boxRef.current?.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromX(e.clientX);
  };
  const endDrag = (e: React.PointerEvent) => {
    dragging.current = false;
    boxRef.current?.releasePointerCapture?.(e.pointerId);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  { setInteracted(true); setPos((p) => Math.max(0, p - 3)); e.preventDefault(); }
    if (e.key === "ArrowRight") { setInteracted(true); setPos((p) => Math.min(100, p + 3)); e.preventDefault(); }
  };

  /* Entrance + a one-time "nudge" so visitors notice the handle is draggable. */
  useEffect(() => {
    if (!loadingComplete) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const start = () => (window.innerWidth < 768 ? "top 80%" : "top 75%");

      gsap.set([".ba-label", ".ba-title", ".ba-desc"], { opacity: 0 });
      const htl = gsap.timeline({
        scrollTrigger: { trigger: sec.current, start, toggleActions: "play none none none" },
      });
      htl.fromTo(".ba-label", { opacity: 0, y: -16, filter: "blur(6px)" },
                 { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out", clearProps: "filter" })
         .fromTo(".ba-title", { opacity: 0, y: 30 },
                 { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, "-=0.2")
         .fromTo(".ba-desc", { opacity: 0, y: 16 },
                 { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.35");

      gsap.fromTo(".ba-frame",
        { opacity: 0, y: 48, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".ba-frame", start, toggleActions: "play none none none" },
          onComplete: () => {
            gsap.set(".ba-frame", { clearProps: "filter,transform,willChange" });
            if (reduce) return;
            // Gentle wipe so the interaction announces itself, then settles.
            const proxy = { v: 50 };
            gsap.timeline()
              .to(proxy, { v: 70, duration: 0.7, ease: "power2.inOut", onUpdate: () => setPos(proxy.v) })
              .to(proxy, { v: 35, duration: 0.9, ease: "power2.inOut", onUpdate: () => setPos(proxy.v) })
              .to(proxy, { v: 50, duration: 0.7, ease: "power2.inOut", onUpdate: () => setPos(proxy.v) });
          },
        });
    }, sec);
    return () => ctx.revert();
  }, [loadingComplete]);

  return (
    <section ref={sec} id="before-after"
      className="relative py-24 md:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 md:mb-16 text-center flex flex-col items-center">
          <p className="ba-label section-label mb-3" style={{ opacity: 0 }}>Beyond the Blueprint</p>
          <h2 className="ba-title font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--fg)", opacity: 0 }}>
            Unleash <span className="gradient-text">What&apos;s Possible</span>
          </h2>
          <p className="ba-desc mt-4 text-sm md:text-base leading-relaxed mx-auto"
            style={{ color: "var(--fg-dim)", maxWidth: "44rem", opacity: 0 }}>
            Every project has hidden potential. My job is to bring it to the surface.
          </p>
        </div>

        {/* Comparison frame */}
        <div
          className="ba-frame relative mx-auto rounded-2xl overflow-hidden border select-none"
          style={{ maxWidth: "620px", borderColor: "var(--border)", boxShadow: "var(--shadow-lg)" }}
        >
          <div
            ref={boxRef}
            className="relative w-full cursor-ew-resize"
            style={{ aspectRatio: ASPECT, touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            role="slider"
            tabIndex={0}
            aria-label="Drag to compare the sketch and the finished render"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
          >
            {/* AFTER — Venom (base layer, right side) */}
            <Image
              src={AFTER_SRC}
              alt="Venom — the bold, finished result"
              fill
              sizes="(max-width: 768px) 92vw, 920px"
              className="object-cover pointer-events-none"
              style={{ objectPosition: `center ${VENOM_Y}` }}
              priority={false}
              draggable={false}
            />

            {/* BEFORE — Spider-Man, clipped to the reveal position (left side) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src={BEFORE_SRC}
                alt="Spider-Man — the starting point"
                fill
                sizes="(max-width: 768px) 92vw, 920px"
                className="object-cover pointer-events-none"
                style={{ objectPosition: `center ${SPIDEY_Y}` }}
                priority={false}
                draggable={false}
              />
            </div>

            {/* Divider + handle */}
            <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2" style={{ width: 2, background: "rgba(255,255,255,0.9)", boxShadow: "0 0 0 1px rgba(0,0,0,0.25)" }} />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
                style={{
                  width: 44, height: 44,
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.08)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="14 7 9 12 14 17" />
                  <polyline points="10 7 15 12 10 17" transform="translate(0,0)" />
                </svg>
              </div>
            </div>

            {/* Drag hint — fades out once the visitor interacts */}
            <div className="pointer-events-none absolute left-1/2 bottom-4 -translate-x-1/2 transition-opacity duration-500"
              style={{ opacity: interacted ? 0 : 1 }}>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full animate-pulse"
                style={{ background: "rgba(0,0,0,0.6)", color: "#fff", backdropFilter: "blur(4px)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 7 4 12 9 17" />
                  <polyline points="15 7 20 12 15 17" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                </svg>
                Drag to compare
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
