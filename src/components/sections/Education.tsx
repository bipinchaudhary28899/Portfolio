"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, ChevronDown, Award, BookOpen, School } from "lucide-react";
import { education } from "@/data/portfolio";
import { useLoadingComplete } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/* All entries use the active theme accent for consistent colour (mobile timeline) */
const ENTRY_ACCENTS      = Array(4).fill("linear-gradient(135deg,var(--grad-a),var(--grad-b))");
const ENTRY_DOT_SHADOWS  = Array(4).fill("0 0 12px var(--glow)");

/* Per-stage icon, most recent → earliest */
const ICONS = [Award, GraduationCap, BookOpen, School];

const ACCENT_BORDER = "color-mix(in srgb, var(--accent) 28%, transparent)";
/* Contrasting tint for the card's header block */
const HEADER_BG     = "color-mix(in srgb, var(--accent) 10%, var(--card))";

/* ── Desktop: horizontal card ─────────────────────────────────────────────── */
function DesktopEduCard({ edu, Icon }: { edu: (typeof education)[number]; Icon: typeof Award }) {
  return (
    <div className="edu-card-desktop opacity-0 rounded-2xl flex flex-col h-full p-4"
      style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>

      {/* ── Highlighted header sub-box (inset within the card): icon · date · degree · school · grade ── */}
      <div className="relative rounded-xl p-4 flex flex-col" style={{ background: HEADER_BG, border: `1px solid ${ACCENT_BORDER}` }}>

        {/* Grade — secondary, tinted pill pinned to the top-right corner so the
            placement is identical across every card and the degree stays the hero. */}
        <span className="absolute top-4 right-4 text-[11px] font-semibold px-2 py-0.5 rounded-md tabular-nums"
          style={{
            background: "color-mix(in srgb, var(--accent) 12%, transparent)",
            color: "var(--accent)",
            border: "1px solid color-mix(in srgb, var(--accent) 22%, transparent)",
          }}>
          {edu.grade}
        </span>

        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 shrink-0"
          style={{ background: "var(--card)", border: `1px solid ${ACCENT_BORDER}` }}>
          <Icon size={20} style={{ color: "var(--accent)" }} />
        </div>

        <span className="text-xs" style={{ color: "var(--muted)" }}>{edu.period}</span>
        <p className="font-bold text-[15px] leading-snug mt-1" style={{ color: "var(--fg)" }}>{edu.degree}</p>

        {/* Institution / university */}
        {edu.university ? (
          <>
            <p className="text-[13px] mt-1" style={{ color: "var(--fg-dim)" }}>{edu.institution}</p>
            <a href={edu.universityUrl} target="_blank" rel="noopener noreferrer"
              className="text-[12px] mt-0.5 inline-block hover:underline" style={{ color: "var(--accent)" }}>
              {edu.university}
            </a>
          </>
        ) : edu.universityUrl ? (
          <a href={edu.universityUrl} target="_blank" rel="noopener noreferrer"
            className="text-[13px] mt-1 inline-block hover:underline" style={{ color: "var(--accent)" }}>
            {edu.institution}
          </a>
        ) : (
          <p className="text-[13px] mt-1" style={{ color: "var(--fg-dim)" }}>{edu.institution}</p>
        )}
      </div>

      {/* ── Body: description + highlights (sizes to content) ── */}
      <div className="px-1 pt-4 flex flex-col">
        {edu.description && (
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--fg-dim)" }}>
            {edu.description}
          </p>
        )}

        {edu.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5 mt-3">
            {edu.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-[13px] leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── Mobile: compact, expandable card (unchanged) ─────────────────────────── */
function EduCardMobile({ edu }: { edu: (typeof education)[number] }) {
  const [open, setOpen] = useState(false);
  const hasBody = Boolean(edu.description) || edu.highlights.length > 0;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}>
      <div
        role={hasBody ? "button" : undefined}
        tabIndex={hasBody ? 0 : undefined}
        aria-expanded={hasBody ? open : undefined}
        onClick={hasBody ? () => setOpen((o) => !o) : undefined}
        onKeyDown={hasBody ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); } } : undefined}
        className={`flex items-start justify-between gap-3 p-4 ${hasBody ? "cursor-pointer" : ""}`}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1 truncate" style={{ color: "var(--muted)" }}>
            {edu.institution}
          </p>
          <h3 className="font-bold leading-snug text-sm" style={{ color: "var(--fg)" }}>{edu.degree}</h3>
          {edu.university ? (
            <a href={edu.universityUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="text-xs mt-0.5 inline-block hover:underline" style={{ color: "var(--accent)", opacity: 0.8 }}>
              {edu.university}
            </a>
          ) : edu.universityUrl ? (
            <a href={edu.universityUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
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

      {hasBody && (
        <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
          <div style={{ overflow: "hidden" }}>
            <div className="flex flex-col gap-3 px-4 pb-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              {edu.description && (
                <p className="leading-relaxed text-xs" style={{ color: "var(--fg-dim)" }}>{edu.description}</p>
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
  const secRef        = useRef<HTMLElement>(null);
  const capMobileRef  = useRef<HTMLDivElement>(null);
  const loadingComplete = useLoadingComplete();

  useEffect(() => {
    if (!loadingComplete) return;

    /* Mobile sticky cap tilts with scroll direction */
    const cap = capMobileRef.current;
    if (cap) gsap.set(cap, { rotation: 0 });
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY; const down = y > lastY; lastY = y;
      if (cap) gsap.to(cap, { rotation: down ? 15 : -15, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const mm = gsap.matchMedia();

    /* ── Desktop: header + horizontal cards stagger ── */
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.set([".edu-hd-desktop", ".edu-card-desktop"], { opacity: 0 });
        gsap.fromTo(".edu-hd-desktop", { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: ".edu-hd-desktop", start: "top 88%", toggleActions: "play none none none" } });
        gsap.fromTo(".edu-card-desktop", { opacity: 0, y: 42 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: ".edu-grid-desktop", start: "top 85%", toggleActions: "play none none none" } });
      }, secRef);
      return () => ctx.revert();
    });

    /* ── Mobile: timeline cap pulse + card/dot entrances (unchanged) ── */
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        if (capMobileRef.current)
          gsap.to(capMobileRef.current, { scale: 1.15, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });

        gsap.fromTo(".edu-hd-mobile", { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: ".edu-hd-mobile", start: "top 60%", toggleActions: "play none none none" } });

        gsap.utils.toArray<HTMLElement>(".edu-card-mobile").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } });
        });

        gsap.utils.toArray<HTMLElement>(".edu-dot-mobile").forEach((el) => {
          gsap.fromTo(el, { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
              scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } });
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

      {/* ══ DESKTOP — horizontal row of 4 cards ══════════════════════════════ */}
      <section ref={secRef} className="hidden md:block py-28 px-6 sm:px-12 lg:px-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="edu-hd-desktop opacity-0 mb-14 text-center flex flex-col items-center">
            <p className="section-label mb-3">Background</p>
            <h2 className="font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)" }}>
              Education
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed mx-auto" style={{ color: "var(--fg-dim)", maxWidth: "44rem" }}>
              The academic foundation behind my engineering work.
            </p>
          </div>

          {/* Cards: most recent (left) → earliest (right) */}
          <div className="edu-grid-desktop grid grid-cols-4 gap-5 items-stretch">
            {education.map((edu, i) => (
              <DesktopEduCard key={edu.id} edu={edu} Icon={ICONS[i % ICONS.length]} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOBILE — timeline + accordion (unchanged) ════════════════════════ */}
      <section className="block md:hidden pt-10 pb-20 px-5" style={{ background: "var(--bg)", overflowX: "clip" }}>
        {/* Header */}
        <div className="edu-hd-mobile opacity-0 mb-10 text-center flex flex-col items-center">
          <p className="section-label mb-2">Background</p>
          <h2 className="text-[2.4rem] leading-none font-black" style={{ color: "var(--fg)" }}>
            Education
          </h2>
          <p className="mt-3 text-sm leading-relaxed mx-auto" style={{ color: "var(--fg-dim)", maxWidth: "32rem" }}>
            The academic foundation behind my engineering work.
          </p>
        </div>

        <div className="edu-timeline-mobile relative flex flex-col gap-0" style={{ paddingLeft: "2.25rem" }}>
          {/* Vertical line */}
          <div className="edu-line-mobile absolute" style={{ left: "0.6rem", top: 0, bottom: 0, width: 2, background: "var(--border)" }} />

          {/* Sticky graduation cap */}
          <div style={{ position: "sticky", top: "calc(50vh - 13px)", height: 0, zIndex: 30, overflow: "visible" }}>
            <div style={{ position: "absolute", left: "-1.65rem", transform: "translateX(-50%) translateY(-50%)" }}>
              <div ref={capMobileRef} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <GraduationCap size={22} color="var(--accent)" style={{ filter: "drop-shadow(0 0 7px var(--accent))" }} />
              </div>
            </div>
          </div>

          {education.map((edu, i) => {
            const accent    = ENTRY_ACCENTS[i % ENTRY_ACCENTS.length];
            const dotShadow = ENTRY_DOT_SHADOWS[i % ENTRY_DOT_SHADOWS.length];
            return (
              <div key={edu.id} className="edu-card-mobile opacity-0 relative pb-10 last:pb-0">
                <div className="edu-dot-mobile absolute" style={{ left: "-1.65rem", top: "1.5rem", transform: "translateX(-50%)", zIndex: 2 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent, border: "2px solid var(--bg)", boxShadow: dotShadow }} />
                </div>
                <p className="text-xs font-bold mb-2" style={{ color: "var(--muted)" }}>{edu.period}</p>
                <EduCardMobile edu={edu} />
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
