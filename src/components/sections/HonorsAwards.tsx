"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { honors } from "@/data/portfolio";
import { useLoadingComplete } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

type Honor = (typeof honors)[number];

/* Mild, category-based accent colours (used subtly, like the Certifications
   section) to differentiate the categories at a glance. */
const CATEGORY_COLORS: Record<string, string> = {
  Sports: "#e08a1e",
  Academics: "#16a34a",
  Science: "#2563eb",
  Leadership: "#9333ea",
};

export function HonorsAwards() {
  const sec = useRef<HTMLElement>(null);
  const [preview, setPreview] = useState<Honor | null>(null);
  const loadingComplete = useLoadingComplete();

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
    const ctx = gsap.context(() => {
      gsap.set([".ha-label", ".ha-title", ".ha-card"], { opacity: 0 });

      const start = () => (window.innerWidth < 768 ? "top 70%" : "top bottom");
      const htl = gsap.timeline({
        scrollTrigger: { trigger: ".ha-header", start, toggleActions: "play none none none" },
      });
      htl.fromTo(".ha-label", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
         .fromTo(".ha-title", { opacity: 0, y: 40, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, ease: "power4.out" }, "-=0.2");

      gsap.fromTo(".ha-card",
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".ha-grid", start, toggleActions: "play none none none" } });
    }, sec);
    return () => ctx.revert();
  }, [loadingComplete]);

  return (
    <section ref={sec} id="honors" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="ha-header mb-12 sm:mb-14">
          <p className="ha-label section-label mb-3" style={{ opacity: 0 }}>Recognition</p>
          <h2 className="ha-title heading-accent font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
            Beyond the Code
          </h2>
        </div>

        {/* Cards — compact; certificate shown upfront, click opens a larger view */}
        <div className="ha-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {honors.map((h) => {
            const color = CATEGORY_COLORS[h.category] ?? "#6b7280";
            return (
              <button
                key={h.id}
                onClick={() => setPreview(h)}
                aria-label={`View ${h.title} certificate`}
                className="ha-card group text-left rounded-xl border overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                {/* Certificate image (visible upfront, fills the card) */}
                <div className="relative w-full" style={{ aspectRatio: "4 / 3", background: "#ffffff" }}>
                  <Image
                    src={h.image}
                    alt={h.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain"
                  />
                  {/* Category accent bar */}
                  <div className="absolute top-0 left-0 right-0 z-10" style={{ height: 3, background: color, opacity: 0.85 }} />
                  {/* Year badge — neutral, subtle */}
                  <span className="absolute top-1.5 right-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: "rgba(0,0,0,0.5)", color: "#fff", whiteSpace: "nowrap" }}>
                    {h.year}
                  </span>
                  {/* Hover hint to enlarge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(0,0,0,0.4)" }}>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-white px-2 py-1 rounded-full"
                      style={{ background: "rgba(0,0,0,0.55)" }}>
                      <Maximize2 size={12} /> Enlarge
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-2.5 sm:p-3">
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold leading-snug" style={{ color: "var(--fg)" }}>
                      {h.title}
                    </h3>
                    <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "var(--muted)" }}>
                      {h.context}
                    </p>
                    <span
                      className="inline-block mt-2 text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${color}1a`, color: color, border: `1px solid ${color}40` }}
                    >
                      {h.category}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
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
