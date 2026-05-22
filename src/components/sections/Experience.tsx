"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = [
  "linear-gradient(135deg,var(--grad-a),var(--grad-b))",
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#f97316)",
  "linear-gradient(135deg,#e879f9,#a855f7)",
];
const ACCENT_COLORS = ["var(--accent)", "#6366f1", "#10b981", "#f59e0b", "#e879f9"];

/* ── Card ─────────────────────────────────────────────────────────────────── */
function ExpCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    /*
      h-full + flex-col: card fills its absolute wrapper completely so no
      lower-z-index card can peek through the transparent gap below.
    */
    <div
      className="rounded-2xl overflow-hidden w-full h-full flex flex-col"
      style={{ background: "var(--card)" }}
    >
      <div className="p-7 sm:p-9 flex flex-col gap-6 flex-1">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="section-label mb-1.5">{exp.company}</p>
            <h3
              className="text-2xl sm:text-3xl font-black leading-tight"
              style={{ color: "var(--fg)" }}
            >
              {exp.role}
            </h3>
          </div>
          <span
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold mt-1"
            style={{ background: "rgba(255,101,53,.1)", color: "var(--accent)" }}
          >
            {exp.period}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: "var(--border)" }} />

        {/* Two-column body: achievements + metrics — flex-1 so it expands */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">

          {/* Achievements */}
          <ul className="sm:col-span-2 flex flex-col gap-3">
            {exp.achievements.map((ach, j) => (
              <li
                key={j}
                className="flex items-start gap-3 text-sm leading-relaxed"
                style={{ color: "var(--fg-dim)" }}
              >
                <span
                  className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: accentColor }}
                />
                {ach}
              </li>
            ))}
          </ul>

          {/* Metrics */}
          <div className="flex sm:flex-col gap-3">
            {exp.metrics.map((m, j) => (
              <div
                key={j}
                className="rounded-xl px-4 py-3 flex-1 sm:flex-none"
                style={{ background: "var(--bg)" }}
              >
                <p
                  className="text-xl font-black tabular-nums"
                  style={{ color: accentColor }}
                >
                  {m.value}
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech tags — pinned to bottom */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                color:      "var(--muted)",
                background: "var(--bg)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Mobile accordion (self-contained so it has its own state) ───────────── */
function MobileExperience() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="block md:hidden py-14 px-5" style={{ background: "var(--bg-alt)" }}>

      {/* Header */}
      <div className="mb-6">
        <p className="section-label mb-2">Career</p>
        <h2 className="text-3xl font-black" style={{ color: "var(--fg)" }}>Work Experience</h2>
      </div>

      <div className="flex flex-col gap-2">
        {experiences.map((exp, i) => {
          const accentColor = ACCENT_COLORS[i % ACCENT_COLORS.length];
          const isOpen      = open === i;
          return (
            <div
              key={exp.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
            >
              {/* ── Collapsed header — always visible ── */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {/* Accent dot */}
                <span className="flex-shrink-0 w-2 h-2 rounded-full"
                  style={{ background: accentColor }} />

                <div className="flex-1 min-w-0">
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {exp.company} · {exp.period}
                  </p>
                  <p className="text-sm font-bold truncate" style={{ color: "var(--fg)" }}>
                    {exp.role}
                  </p>
                </div>

                {/* Chevron */}
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{
                    flexShrink: 0,
                    color: "var(--muted)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                  }}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* ── Expanded detail ── */}
              <div
                style={{
                  display:    "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.3s ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div className="px-4 pb-4 pt-1 flex flex-col gap-3"
                    style={{ borderTop: "1px solid var(--border)" }}>

                    {/* Achievements */}
                    <ul className="flex flex-col gap-2 pt-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs leading-relaxed"
                          style={{ color: "var(--fg-dim)" }}>
                          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ background: accentColor }} />
                          {a}
                        </li>
                      ))}
                    </ul>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2">
                      {exp.metrics.map((m, j) => (
                        <div key={j} className="rounded-lg px-3 py-2"
                          style={{ background: "var(--bg)" }}>
                          <p className="text-sm font-black" style={{ color: accentColor }}>{m.value}</p>
                          <p className="text-xs" style={{ color: "var(--muted)" }}>{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(t => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full"
                          style={{ background: "var(--bg)", color: "var(--muted)" }}>
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export function Experience() {
  const desktopRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    /* ─────────────────────────────────────────────────────────────────────
       DESKTOP  ≥ 768 px
       Pin the section for (n-1) × SCROLL_PER_CARD px of scroll.
       A scrubbed GSAP timeline slides each successive card (yPercent 100→0).
       We use window.innerHeight in px (not vh strings) so GSAP's pin-spacer
       height is always exact, preventing the next section from jumping early.
    ───────────────────────────────────────────────────────────────────── */
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const n = experiences.length;          // 5
        const transitions = n - 1;             // 4 slides
        // Each card gets 1.8× the viewport height of scroll room
        // — slow enough to feel deliberate, fast enough to stay engaging.
        const scrollPerCard = Math.round(window.innerHeight * 1.8);
        const totalScroll   = transitions * scrollPerCard;

        /* Push cards 1…n-1 below the fold before the pin starts */
        for (let i = 1; i < n; i++) {
          gsap.set(`.exp-card-${i}`, { yPercent: 100 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:           desktopRef.current,
            start:             "top top",
            end:               `+=${totalScroll}`,   // exact px — no vh ambiguity
            pin:               true,
            scrub:             1.5,
            anticipatePin:     1,
            invalidateOnRefresh: true,               // recalculate on resize/refresh
            onUpdate(self) {
              const idx = Math.min(
                Math.floor(self.progress * n),
                n - 1,
              );
              setActiveIdx(idx);
            },
          },
        });

        for (let i = 1; i < n; i++) {
          tl.to(
            `.exp-card-${i}`,
            { yPercent: 0, ease: "none", duration: 1 },
            i - 1,
          );
        }

        // Force a refresh after first paint so the pin-spacer height
        // is computed against the fully-rendered layout (fixes "next
        // section jumps early" caused by stale measurements).
        const rafId = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
        return () => cancelAnimationFrame(rafId);

      }, desktopRef);

      return () => ctx.revert();
    });

    /* ─────────────────────────────────────────────────────────────────────
       MOBILE  < 768 px
       No pin — just simple staggered card reveals on scroll.
    ───────────────────────────────────────────────────────────────────── */
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".exp-mob-hd",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: ".exp-mob-hd", start: "top 85%", toggleActions: "play none none none" } },
        );
        gsap.utils.toArray<HTMLElement>(".exp-mob-card").forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } },
          );
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="experience">

      {/* ══ DESKTOP ══════════════════════════════════════════════════════════ */}
      <section
        ref={desktopRef}
        className="hidden md:flex flex-col"
        style={{
          height:     "100vh",
          background: "var(--bg-alt)",
          overflow:   "hidden",
        }}
      >
        {/* ── Top bar: title + dot-progress ─────────────────────────────── */}
        <div
          className="flex-shrink-0 flex items-end justify-between px-16 pt-20 pb-10"
        >
          <div>
            <p className="section-label mb-3">Career</p>
            <h2
              className="font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", color: "var(--fg)" }}
            >
              Work Experience
            </h2>
          </div>

          {/* Pill progress indicator */}
          <div className="flex items-center gap-2">
            {experiences.map((_, i) => (
              <div
                key={i}
                style={{
                  height:       8,
                  width:        i === activeIdx ? 28 : 8,
                  borderRadius: 9999,
                  background:   i === activeIdx ? "var(--accent)" : "var(--border)",
                  transition:   "all 0.35s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Cards stack — fixed height so card doesn't touch the title ── */}
        <div
          className="relative mx-auto w-full"
          style={{
            maxWidth:  "54rem",
            padding:   "0 2.5rem 3rem",
            /* Cards take exactly what's left after the header,
               never stretching into the title's breathing room. */
            height:    "calc(100vh - 10rem - 5rem)", /* 100vh - pt-20 - pb-10 approx */
            overflow:  "hidden",
          }}
        >
          {experiences.map((exp, i) => (
            /*
              Each wrapper fills the container exactly (inset-0 + padding).
              h-full is NOT needed here because position:absolute + inset
              already stretches it — but the ExpCard inside must be h-full
              so no transparent gap shows through to lower-z cards.
            */
            <div
              key={exp.id}
              className={`exp-card-${i}`}
              style={{
                position: "absolute",
                top:      0,
                left:     "2.5rem",
                right:    "2.5rem",
                bottom:   "2.5rem",
                zIndex:   i + 1,
              }}
            >
              <ExpCard exp={exp} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ MOBILE — compact accordion rows ═════════════════════════════════ */}
      <MobileExperience />

    </div>
  );
}
