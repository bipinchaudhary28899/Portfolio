"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { honors } from "@/data/portfolio";
import { useLoadingComplete } from "@/context/LoadingContext";
import { useCloseOnBack } from "@/hooks/useCloseOnBack";

gsap.registerPlugin(ScrollTrigger);

type Honor = (typeof honors)[number];

export function HonorsAwards() {
  const sec = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const [preview, setPreview] = useState<Honor | null>(null);
  const loadingComplete = useLoadingComplete();

  /* Back button closes the lightbox instead of leaving the site */
  useCloseOnBack(preview !== null, () => setPreview(null));

  /* Close lightbox on Escape + lock body scroll while open */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPreview(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = preview ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [preview]);

  useEffect(() => {
    if (!loadingComplete) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const start = () => (window.innerWidth < 768 ? "top 80%" : "top bottom");

      /* ── Header entrance ── */
      gsap.set([".ha-label", ".ha-title"], { opacity: 0 });
      const htl = gsap.timeline({
        scrollTrigger: { trigger: ".ha-header", start, toggleActions: "play none none none" },
      });
      htl.fromTo(".ha-label",
            { opacity: 0, y: -18, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out", clearProps: "filter" })
         .fromTo(".ha-title",
            { opacity: 0, y: 36, clipPath: "inset(0 0 100% 0)" },
            { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power4.out", clearProps: "clipPath" }, "-=0.2");

      /* ── Rail entrance — clears filter/transform on completion so NO filter
         context lingers on the element that hosts the moving track (a stray
         blur(0) there is what makes the loop stutter). ── */
      gsap.fromTo(".ha-viewport",
        { opacity: 0, y: 48, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".ha-viewport", start, toggleActions: "play none none none" },
          onComplete: () => gsap.set(".ha-viewport", { clearProps: "filter,transform,willChange" }) });
    }, sec);

    /* ── Seamless, GPU-smooth infinite marquee ──
       Two identical copies sit in the track; we slide it by exactly one copy
       and use a wrap modifier so x is recycled continuously (no per-loop reset
       jump). Constant px/sec keeps the speed even on every screen. */
    const buildLoop = () => {
      loopRef.current?.kill();
      const track = trackRef.current;
      if (!track) return;
      if (reduce) { if (viewportRef.current) viewportRef.current.style.overflowX = "auto"; return; }
      const half = track.scrollWidth / 2;
      if (half < 1) return;
      gsap.set(track, { x: 0 });
      loopRef.current = gsap.to(track, {
        x: -half,
        ease: "none",
        duration: half / 70,
        repeat: -1,
        force3D: true,
        modifiers: { x: gsap.utils.unitize(gsap.utils.wrap(-half, 0)) },
      });
    };

    buildLoop();
    const t = window.setTimeout(buildLoop, 500); // re-measure once images settle
    const onResize = () => buildLoop();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      loopRef.current?.kill();
      ctx.revert();
    };
  }, [loadingComplete]);

  const pause = () => loopRef.current?.pause();
  const play  = () => loopRef.current?.play();

  const renderCard = (h: Honor, copy: string) => (
    <button
      key={`${h.id}-${copy}`}
      onClick={() => setPreview(h)}
      aria-label={`View ${h.title} certificate`}
      aria-hidden={copy === "b"}
      tabIndex={copy === "b" ? -1 : 0}
      className="ha-card group relative shrink-0 mr-3 sm:mr-4 rounded-xl overflow-hidden border transition-transform duration-300 hover:-translate-y-1"
      style={{
        width: "clamp(190px, 60vw, 300px)",
        aspectRatio: "4 / 3",
        background: "#0b0b0b",
        borderColor: "var(--border)",
      }}
    >
      <Image
        src={h.image}
        alt={h.title}
        fill
        sizes="300px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ objectPosition: "top" }}
      />

      {/* Gradient for headline readability */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.05) 58%, transparent 100%)",
        }}
      />

      {/* Headline */}
      <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 text-left">
        <h3
          className="text-[11px] sm:text-[0.95rem] font-bold leading-snug"
          style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.55)" }}
        >
          {h.headline}
        </h3>
      </div>

      {/* Enlarge hint (desktop hover) */}
      <span
        className="hidden sm:flex absolute top-2 right-2 items-center gap-1 text-[11px] font-semibold text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <Maximize2 size={12} /> Enlarge
      </span>
    </button>
  );

  return (
    <section ref={sec} id="honors" className="pt-12 sm:pt-[4.5rem] pb-24 sm:pb-36 overflow-hidden"
      style={{ background: "var(--bg)" }}>
      <div className="px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="ha-header mb-12 sm:mb-14 text-center flex flex-col items-center">
            <p className="ha-label section-label mb-3" style={{ opacity: 0 }}>Recognition</p>
            <h2 className="ha-title font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
              Beyond the Code
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed mx-auto" style={{ color: "var(--fg-dim)", maxWidth: "44rem" }}>
              Awards, honors, and moments that recognize impact reaching beyond writing code.
            </p>
          </div>

          {/* ── Infinite carousel — constrained to the column, soft edge fade ── */}
          <div
            ref={viewportRef}
            className="ha-viewport relative w-full overflow-hidden"
            onMouseEnter={pause}
            onMouseLeave={play}
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
            }}
          >
            <div ref={trackRef} className="ha-track flex w-max py-2" style={{ willChange: "transform" }}>
              {honors.map((h) => renderCard(h, "a"))}
              {honors.map((h) => renderCard(h, "b"))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{preview.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{preview.context}</p>
              </div>
              <button onClick={() => setPreview(null)} className="shrink-0 p-1 rounded-lg transition-colors hover:opacity-60"
                style={{ color: "var(--muted)" }} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
              <Image src={preview.image} alt={preview.title} fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain p-2" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
