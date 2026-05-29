"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { experiences } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

/* ── Theme-aware palette — follows the active CSS accent variables ─────────── */
const PAL = {
  accent: "var(--accent)",
  bg:     "color-mix(in srgb, var(--accent) 12%, transparent)",
  glow:   "color-mix(in srgb, var(--accent) 22%, transparent)",
  border: "color-mix(in srgb, var(--accent) 32%, transparent)",
};
/* All entries use the same theme-aware palette */
const PALETTE = Array(5).fill(PAL) as typeof PAL[];

const TL_GRADIENT = "linear-gradient(to bottom, var(--grad-a), var(--grad-b))";

type Pal = typeof PAL;

/* ── Company logo ─────────────────────────────────────────────────────────── */
function CompanyLogo({ src, company, pal }: { src: string; company: string; pal: Pal }) {
  if (!src) {
    /* Self-Employed fallback — initials badge */
    return (
      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black"
        style={{ background: pal.bg, border: `1px solid ${pal.border}`, color: pal.accent }}>
        {company.slice(0, 2).toUpperCase()}
      </div>
    );
  }
  return (
    <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
      style={{ background: "#ffffff", border: `1px solid ${pal.border}`, padding: 6 }}>
      <Image src={src} alt={company} width={28} height={28}
        style={{ objectFit: "contain", width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}

/* ── Desktop card ─────────────────────────────────────────────────────────── */
function ExpCard({ exp, pal, side }: { exp: (typeof experiences)[0]; pal: Pal; side: "left" | "right" }) {
  return (
    <div
      className="exp-card relative rounded-2xl overflow-hidden flex flex-col gap-5 p-6 sm:p-8"
      style={{
        background: "var(--card)",
        border: `1px solid ${pal.border}`,
        boxShadow: "var(--shadow-card), var(--inset-highlight)",
      }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, ${pal.accent}, transparent)` }} />

      {/* Header: logo + company pill + role + period */}
      <div className="relative flex items-start gap-3">
        <CompanyLogo src={exp.logo} company={exp.company} pal={pal} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: pal.bg, color: pal.accent, border: `1px solid ${pal.border}` }}>
              {exp.company}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full shrink-0"
              style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
              {exp.period}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black leading-tight mt-2" style={{ color: "var(--fg)" }}>
            {exp.role}
          </h3>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: `linear-gradient(to right, ${pal.border}, transparent)` }} />

      {/* Achievements */}
      <ul className="relative flex flex-col gap-2.5">
        {exp.achievements.map((a, j) => (
          <li key={j} className="exp-ach flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: pal.accent }} />
            {a}
          </li>
        ))}
      </ul>

      {/* Metrics */}
      <div className="relative flex flex-wrap gap-2">
        {exp.metrics.map((m, j) => (
          <div key={j} className="flex-1 min-w-[80px] rounded-xl px-3 py-2.5 text-center"
            style={{ background: pal.bg, border: `1px solid ${pal.border}` }}>
            <p className="text-lg font-black tabular-nums leading-none mb-0.5" style={{ color: pal.accent }}>{m.value}</p>
            <p className="text-[11px] leading-tight" style={{ color: "var(--muted)" }}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* Tech pills */}
      <div className="relative flex flex-wrap gap-1.5">
        {exp.tech.map((t) => (
          <span key={t} className="text-[11px] px-2.5 py-1 rounded-full"
            style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Timeline dot ─────────────────────────────────────────────────────────── */
function Dot({ pal }: { pal: Pal }) {
  return (
    <div className="exp-dot relative flex items-center justify-center" style={{ width: 24, height: 24 }}>
      <div className="absolute rounded-full"
        style={{ inset: -6, background: `radial-gradient(circle, ${pal.glow}, transparent 70%)` }} />
      <div className="absolute rounded-full"
        style={{ inset: -3, border: `1px solid ${pal.border}` }} />
      <div className="relative rounded-full z-10"
        style={{ width: 12, height: 12, background: pal.accent, boxShadow: `0 0 8px ${pal.glow}, 0 0 20px ${pal.glow}` }} />
    </div>
  );
}

/* ── Extract start year from period string ────────────────────────────────── */
function startYear(period: string): string {
  const m = period.match(/\d{4}/);
  return m ? m[0] : "";
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export function Experience() {
  const secRef = useRef<HTMLElement>(null);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Header */
      gsap.fromTo(".exp-label",
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: ".exp-header", start: "top 82%", toggleActions: "play none none none" } });
      gsap.fromTo(".exp-title",
        { opacity: 0, y: 44, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out",
          scrollTrigger: { trigger: ".exp-header", start: "top 82%", toggleActions: "play none none none" } });

      /* Timeline line scrub */
      gsap.fromTo(".tl-line-fill",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", transformOrigin: "top center",
          scrollTrigger: { trigger: ".exp-timeline", start: "top 75%", end: "bottom 25%", scrub: 0.6 } });

      /* Per-entry animations */
      gsap.utils.toArray<HTMLElement>(".exp-entry").forEach((el, i) => {
        const fromRight = i % 2 !== 0;

        gsap.fromTo(el.querySelector(".exp-dot"),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)",
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } });

        gsap.fromTo(el.querySelector(".exp-card"),
          { opacity: 0, x: fromRight ? 70 : -70, y: 12 },
          { opacity: 1, x: 0, y: 0, duration: 0.85, ease: "power3.out", delay: 0.08,
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } });

        gsap.fromTo(el.querySelectorAll(".exp-ach"),
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, stagger: 0.07, duration: 0.45, ease: "power2.out", delay: 0.3,
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } });
      });

    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={secRef}
      id="experience"
      className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="exp-header mb-20">
          <p className="exp-label section-label mb-3" style={{ opacity: 0 }}>Career</p>
          <h2 className="exp-title font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
            Work Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="exp-timeline relative">

          {/* Desktop center line */}
          <div className="absolute hidden md:block top-0 bottom-0"
            style={{ left: "50%", transform: "translateX(-50%)", width: 1, background: "var(--border)" }}>
            <div className="tl-line-fill absolute inset-0"
              style={{ background: TL_GRADIENT, transformOrigin: "top center" }} />
          </div>

          {/* Mobile left line */}
          <div className="absolute block md:hidden top-0 bottom-0"
            style={{ left: 11, width: 1, background: "var(--border)" }}>
            <div className="tl-line-fill absolute inset-0"
              style={{ background: TL_GRADIENT, transformOrigin: "top center" }} />
          </div>

          {/* Entries */}
          <div className="flex flex-col" style={{ gap: "clamp(1.5rem, 5vw, 5rem)" }}>
            {experiences.map((exp, i) => {
              const pal       = PALETTE[i % PALETTE.length];
              const cardRight = i % 2 !== 0;

              return (
                <div key={exp.id} className="exp-entry relative">

                  {/* ── DESKTOP zigzag ── */}
                  <div className="hidden md:grid items-center"
                    style={{ gridTemplateColumns: "1fr 48px 1fr" }}>

                    {/* Left cell: card or year */}
                    <div className="pr-10 flex items-center justify-end">
                      {!cardRight
                        ? <ExpCard exp={exp} pal={pal} side="left" />
                        : <span
                            className="gradient-text font-black font-mono select-none pointer-events-none w-full text-right"
                            style={{ fontSize: "clamp(5rem,9vw,9rem)", lineHeight: 1, opacity: 0.13 }}
                          >
                            {startYear(exp.period)}
                          </span>
                      }
                    </div>

                    {/* Center dot */}
                    <div className="flex justify-center">
                      <Dot pal={pal} />
                    </div>

                    {/* Right cell: card or year */}
                    <div className="pl-10 flex items-center justify-start">
                      {cardRight
                        ? <ExpCard exp={exp} pal={pal} side="right" />
                        : <span
                            className="gradient-text font-black font-mono select-none pointer-events-none w-full"
                            style={{ fontSize: "clamp(5rem,9vw,9rem)", lineHeight: 1, opacity: 0.13 }}
                          >
                            {startYear(exp.period)}
                          </span>
                      }
                    </div>
                  </div>

                  {/* ── MOBILE accordion ── */}
                  <div className="block md:hidden" style={{ paddingLeft: 36 }}>
                    <div className="absolute" style={{ left: 0, top: 18 }}>
                      <Dot pal={pal} />
                    </div>

                    <div className="rounded-2xl overflow-hidden"
                      style={{
                        border: `1px solid ${openMobile === i ? pal.border : "var(--border)"}`,
                        background: "var(--card)",
                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                        boxShadow: openMobile === i ? "var(--shadow-card)" : "none",
                      }}>

                      {/* Collapsed header */}
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-left"
                        onClick={() => setOpenMobile(openMobile === i ? null : i)}
                      >
                        {/* Company logo / initials */}
                        <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: exp.logo ? "#ffffff" : pal.bg, border: `1px solid ${pal.border}`, padding: exp.logo ? 5 : 0 }}>
                          {exp.logo ? (
                            <Image src={exp.logo} alt={exp.company} width={22} height={22}
                              style={{ objectFit: "contain", width: "100%", height: "100%", display: "block" }} />
                          ) : (
                            <span className="text-[10px] font-black" style={{ color: pal.accent }}>
                              {exp.company.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>
                            {exp.company} · {exp.period}
                          </p>
                          <p className="text-sm font-bold truncate leading-snug mt-0.5" style={{ color: "var(--fg)" }}>
                            {exp.role}
                          </p>
                        </div>

                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"
                          style={{
                            color: "var(--muted)",
                            transform: openMobile === i ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}>
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {/* Expandable body */}
                      <div style={{
                        display: "grid",
                        gridTemplateRows: openMobile === i ? "1fr" : "0fr",
                        transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)",
                      }}>
                        <div style={{ overflow: "hidden" }}>
                          <div className="px-4 pb-4 flex flex-col gap-3"
                            style={{ borderTop: `1px solid ${pal.border}` }}>

                            <ul className="flex flex-col gap-2 pt-3">
                              {exp.achievements.map((a, j) => (
                                <li key={j} className="flex items-start gap-2.5 text-xs leading-relaxed"
                                  style={{ color: "var(--fg-dim)" }}>
                                  <span className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: pal.accent }} />
                                  {a}
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                              {exp.metrics.map((m, j) => (
                                <div key={j} className="flex-1 min-w-[72px] rounded-xl px-2.5 py-2 text-center"
                                  style={{ background: pal.bg, border: `1px solid ${pal.border}` }}>
                                  <p className="text-sm font-black tabular-nums leading-none mb-0.5" style={{ color: pal.accent }}>{m.value}</p>
                                  <p className="text-[10px] leading-tight" style={{ color: "var(--muted)" }}>{m.label}</p>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {exp.tech.map((t) => (
                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                                  style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
