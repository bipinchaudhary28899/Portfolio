"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, ChevronDown } from "lucide-react";
import { education } from "@/data/portfolio";
import { useLoadingComplete } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/* All entries use the active theme accent for consistent colour */
const ENTRY_ACCENTS      = Array(4).fill("linear-gradient(135deg,var(--grad-a),var(--grad-b))");
const ENTRY_DOT_SHADOWS  = Array(4).fill("0 0 12px var(--glow)");

/* ── Card component ──────────────────────────────────────────────────────── */
function EduCard({
  edu,
  index,
  mobile = false,
}: {
  edu: (typeof education)[0];
  index: number;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasBody = Boolean(edu.description) || edu.highlights.length > 0;

  /* ── Desktop: original always-expanded card (unchanged) ── */
  if (!mobile) {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
      >
        <div className="flex flex-col gap-4 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold tracking-widest uppercase mb-1 truncate" style={{ color: "var(--muted)" }}>
                {edu.institutionFull}
              </p>
              <h3 className="font-bold leading-snug text-lg sm:text-xl" style={{ color: "var(--fg)" }}>
                {edu.degree}
              </h3>
              {edu.university ? (
                <a href={edu.universityUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs mt-0.5 inline-block hover:underline" style={{ color: "var(--accent)", opacity: 0.8 }}>
                  {edu.university}
                </a>
              ) : edu.universityUrl ? (
                <a href={edu.universityUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs mt-0.5 inline-block hover:underline" style={{ color: "var(--accent)", opacity: 0.8 }}>
                  {edu.institutionFull}
                </a>
              ) : null}
            </div>
            <span className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold border"
              style={{ borderColor: "var(--border)", color: "var(--accent)", background: "var(--bg)", whiteSpace: "nowrap" }}>
              {edu.grade}
            </span>
          </div>

          <p className="leading-relaxed text-sm" style={{ color: "var(--fg-dim)" }}>
            {edu.description}
          </p>

          {edu.highlights.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {edu.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-xs" style={{ color: "var(--fg-dim)" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  /* ── Mobile: compact, expandable card ── */
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
    >
      {/* Collapsed summary — tap to expand */}
      <div
        role={hasBody ? "button" : undefined}
        tabIndex={hasBody ? 0 : undefined}
        aria-expanded={hasBody ? open : undefined}
        onClick={hasBody ? () => setOpen((o) => !o) : undefined}
        onKeyDown={
          hasBody
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen((o) => !o);
                }
              }
            : undefined
        }
        className={`flex items-start justify-between gap-3 p-4 ${hasBody ? "cursor-pointer" : ""}`}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1 truncate" style={{ color: "var(--muted)" }}>
            {edu.institution}
          </p>
          <h3 className="font-bold leading-snug text-sm" style={{ color: "var(--fg)" }}>
            {edu.degree}
          </h3>
          {edu.university ? (
            <a href={edu.universityUrl} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs mt-0.5 inline-block hover:underline" style={{ color: "var(--accent)", opacity: 0.8 }}>
              {edu.university}
            </a>
          ) : edu.universityUrl ? (
            <a href={edu.universityUrl} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs mt-0.5 inline-block hover:underline" style={{ color: "var(--accent)", opacity: 0.8 }}>
              {edu.institution}
            </a>
          ) : null}
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold border"
            style={{ borderColor: "var(--border)", color: "var(--accent)", background: "var(--bg)", whiteSpace: "nowrap" }}>
            {edu.grade}
          </span>
          {hasBody && (
            <ChevronDown size={16}
              style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
          )}
        </div>
      </div>

      {/* Expandable body — description + highlights */}
      {hasBody && (
        <div
          style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <div className="flex flex-col gap-3 px-4 pb-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              {edu.description && (
                <p className="leading-relaxed text-xs" style={{ color: "var(--fg-dim)" }}>
                  {edu.description}
                </p>
              )}
              {edu.highlights.length > 0 && (
                <ul className="flex flex-col gap-1.5">
                  {edu.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs" style={{ color: "var(--fg-dim)" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export function Education() {
  const secRef         = useRef<HTMLElement>(null);
  const capDesktopRef  = useRef<HTMLDivElement>(null);
  const capMobileRef   = useRef<HTMLDivElement>(null);
  const loadingComplete = useLoadingComplete();

  useEffect(() => {
    if (!loadingComplete) return;
    // Scroll-direction rotation - mirrors plane behaviour in Experience
    const caps = () =>
      [capDesktopRef.current, capMobileRef.current].filter(Boolean) as HTMLDivElement[];
    gsap.set(caps(), { rotation: 0 });

    let lastY = window.scrollY;
    const onScroll = () => {
      const y    = window.scrollY;
      const down = y > lastY;
      lastY = y;
      gsap.to(caps(), {
        rotation: down ? 15 : -15,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const mm = gsap.matchMedia();

    /* ── Desktop ── */
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        // Cap pulse
        gsap.to(capDesktopRef.current, {
          scale: 1.12,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Pre-hide animated elements
        gsap.set([".edu-hd-desktop", ".edu-hd-mobile", ".edu-card-desktop", ".edu-card-mobile", ".edu-tag"], { opacity: 0 });

        // Section header
        gsap.fromTo(
          ".edu-hd-desktop",
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: ".edu-hd-desktop", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
          },
        );

        // Year labels slide in from the left
        gsap.utils.toArray<HTMLElement>(".edu-year-desktop").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: -24 },
            {
              opacity: 1, x: 0, duration: 0.55, ease: "power2.out",
              scrollTrigger: { trigger: el, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
            },
          );
        });

        // Cards slide in from the right
        gsap.utils.toArray<HTMLElement>(".edu-card-desktop").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: 45 },
            {
              opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
              scrollTrigger: { trigger: el, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
            },
          );
        });

        // Dots pop in
        gsap.utils.toArray<HTMLElement>(".edu-dot-desktop").forEach((el, i) => {
          gsap.fromTo(
            el,
            { scale: 0, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.5)",
              delay: i * 0.05,
              scrollTrigger: { trigger: el, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
            },
          );
        });

        // Connector lines draw from dot outward
        gsap.utils.toArray<HTMLElement>(".edu-connector-desktop").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1, duration: 0.4, ease: "power2.out",
              scrollTrigger: { trigger: el, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
            },
          );
        });
      }, secRef);
      return () => ctx.revert();
    });

    /* ── Mobile ── */
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(capMobileRef.current, {
          scale: 1.15,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.fromTo(
          ".edu-hd-mobile",
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: ".edu-hd-mobile", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
          },
        );

        gsap.utils.toArray<HTMLElement>(".edu-card-mobile").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 35 },
            {
              opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
              scrollTrigger: { trigger: el, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".edu-dot-mobile").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
              scrollTrigger: { trigger: el, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
            },
          );
        });
      });
      return () => ctx.revert();
    });

    return () => {
      mm.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, [loadingComplete]);

  return (
    <div id="education" style={{ overflowX: "clip" }}>

      {/* ══ DESKTOP ══════════════════════════════════════════════════════════ */}
      <section
        ref={secRef}
        className="hidden md:block py-28 px-6 sm:px-12 lg:px-20"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="edu-hd-desktop opacity-0 mb-20 text-center flex flex-col items-center">
            <p className="section-label mb-3">Background</p>
            <h2
              className="font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)" }}
            >
              Education
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed mx-auto" style={{ color: "var(--fg-dim)", maxWidth: "44rem" }}>
              The academic foundation behind my engineering work.
            </p>
          </div>

          {/*
            Layout per row:
              [min-w-36 year label] [w-10 dot col] [flex-1 card]
            Line center = 144px (9rem) from left edge of .relative container
          */}
          <div className="edu-timeline-desktop relative" style={{ paddingBottom: "1rem" }}>

            {/* Vertical background line
                Year label = 9rem wide.  Dot column = 2.5rem wide, items-center
                → dot centre = 9rem + 1.25rem = 10.25rem from container left.
                Line and sticky cap must both sit at that same x position.     */}
            <div
              className="edu-line-desktop absolute pointer-events-none"
              style={{
                left: "calc(10.25rem - 1px)",
                top: 0, bottom: 0,
                width: 2,
                background: "var(--border)",
              }}
            />

            {/* Sticky graduation cap */}
            <div
              style={{
                position: "sticky",
                top: "calc(50vh - 18px)",
                height: 0,
                zIndex: 30,
                overflow: "visible",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "10.25rem",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                <div
                  ref={capDesktopRef}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <GraduationCap
                    size={28}
                    color="var(--accent)"
                    style={{ filter: "drop-shadow(0 0 8px var(--accent))" }}
                  />
                </div>
              </div>
            </div>

            {/* Entries */}
            {education.map((edu, i) => {
              const accent     = ENTRY_ACCENTS[i % ENTRY_ACCENTS.length];
              const dotShadow  = ENTRY_DOT_SHADOWS[i % ENTRY_DOT_SHADOWS.length];
              return (
                <div
                  key={edu.id}
                  className="relative flex items-start"
                  style={{ marginBottom: i < education.length - 1 ? "5rem" : "2rem" }}
                >
                  {/* Year label */}
                  <div
                    className="edu-year-desktop opacity-0 flex-shrink-0 text-right pr-6 pt-6"
                    style={{ minWidth: "9rem", width: "9rem" }}
                  >
                    <span
                      className="text-xs font-bold leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {edu.period}
                    </span>
                  </div>

                  {/* Dot column */}
                  <div
                    className="flex-shrink-0 flex flex-col items-center pt-6"
                    style={{ width: "2.5rem", zIndex: 2 }}
                  >
                    <div
                      className="edu-dot-desktop"
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: accent,
                        border: "3px solid var(--bg)",
                        boxShadow: dotShadow,
                        marginTop: 2,
                      }}
                    />
                    {/* Short horizontal connector: from dot centre → card edge */}
                    <div
                      className="edu-connector-desktop"
                      style={{
                        position: "absolute",
                        left: "10.25rem",          /* same x as line / dot centre */
                        top: "calc(1.5rem + 8px)",
                        width: "1.25rem",          /* spans the right half of dot col */
                        height: 1,
                        background: accent,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div className="edu-card-desktop opacity-0 flex-1 min-w-0">
                    <EduCard edu={edu} index={i} />
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ══ MOBILE ═══════════════════════════════════════════════════════════ */}
      <section
        className="block md:hidden pt-10 pb-20 px-5"
        style={{ background: "var(--bg)", overflowX: "clip" }}
      >
        {/* Header */}
        <div className="edu-hd-mobile opacity-0 mb-10 text-center flex flex-col items-center">
          <p className="section-label mb-2">Background</p>
          <h2 className="text-3xl font-black" style={{ color: "var(--fg)" }}>
            Education
          </h2>
          <p className="mt-3 text-sm leading-relaxed mx-auto" style={{ color: "var(--fg-dim)", maxWidth: "32rem" }}>
            The academic foundation behind my engineering work.
          </p>
        </div>

        <div
          className="edu-timeline-mobile relative flex flex-col gap-0"
          style={{ paddingLeft: "2.25rem" }}
        >
          {/* Vertical line */}
          <div
            className="edu-line-mobile absolute"
            style={{
              left: "0.6rem",
              top: 0, bottom: 0,
              width: 2,
              background: "var(--border)",
            }}
          />

          {/* Sticky graduation cap
              The sticky div sits in normal flow INSIDE the padded container
              (paddingLeft: 2.25rem), so its left edge is already at 2.25rem.
              To land on the line (left: 0.6rem from container border) we need
              child.left = 0.6rem − 2.25rem = −1.65rem.                       */}
          <div
            style={{
              position: "sticky",
              top: "calc(50vh - 13px)",
              height: 0,
              zIndex: 30,
              overflow: "visible",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "-1.65rem",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              <div
                ref={capMobileRef}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <GraduationCap
                  size={22}
                  color="var(--accent)"
                  style={{ filter: "drop-shadow(0 0 7px var(--accent))" }}
                />
              </div>
            </div>
          </div>

          {education.map((edu, i) => {
            const accent    = ENTRY_ACCENTS[i % ENTRY_ACCENTS.length];
            const dotShadow = ENTRY_DOT_SHADOWS[i % ENTRY_DOT_SHADOWS.length];
            return (
              <div
                key={edu.id}
                className="edu-card-mobile opacity-0 relative pb-10 last:pb-0"
              >
                {/* Dot */}
                <div
                  className="edu-dot-mobile absolute"
                  style={{
                    left: "-1.65rem",
                    top: "1.5rem",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: accent,
                      border: "2px solid var(--bg)",
                      boxShadow: dotShadow,
                    }}
                  />
                </div>

                {/* Period above card */}
                <p
                  className="text-xs font-bold mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  {edu.period}
                </p>

                <EduCard edu={edu} index={i} mobile />
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
