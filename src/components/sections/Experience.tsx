"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import { experiences } from "@/data/portfolio";
import { Highlight } from "@/components/ui/Highlight";
import { useLoadingComplete } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/* ── Theme-aware palette — follows the active CSS accent variables ─────────── */
const PAL = {
  accent: "var(--accent)",
  bg:     "color-mix(in srgb, var(--accent) 12%, transparent)",
  glow:   "color-mix(in srgb, var(--accent) 22%, transparent)",
  border: "color-mix(in srgb, var(--accent) 32%, transparent)",
  /* Premium ember gradient — accent → accent2 (e.g. #ff6535 → #ff9f1c). */
  grad:   "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)",
};
type Pal = typeof PAL;

/* Gradient-clipped text — reuse on numbers/labels that should pop. */
const gradText: React.CSSProperties = {
  background: PAL.grad,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

/* ── Company logo ─────────────────────────────────────────────────────────── */
function CompanyLogo({ src, company, pal, size = 40 }: { src: string; company: string; pal: Pal; size?: number }) {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError]  = useState(false);
  return (
    <div
      className="relative shrink-0 rounded-xl flex items-center justify-center text-xs font-black overflow-hidden"
      style={{ width: size, height: size, background: src && !error ? "#ffffff" : pal.bg, border: `1px solid ${pal.border}`, color: pal.accent }}
    >
      {(!src || error || !loaded) && (
        <span className="absolute select-none">{company.slice(0, 2).toUpperCase()}</span>
      )}
      {src && !error && (
        <Image
          src={src}
          alt={company}
          width={size - 12}
          height={size - 12}
          className="relative"
          style={{ objectFit: "contain", width: "100%", height: "100%", display: "block", padding: 6,
            opacity: loaded ? 1 : 0, transition: "opacity 0.2s ease" }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

/* ── Mobile company logo (shows image when available, initials when not) ──── */
function MobileCompanyLogo({ src, company, pal }: { src: string; company: string; pal: Pal }) {
  const [error, setError] = useState(false);
  const showImage = src && !error;
  return (
    <div
      className="relative shrink-0 w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
      style={{ background: showImage ? "#ffffff" : pal.bg, border: `1px solid ${pal.border}` }}
    >
      {showImage ? (
        <Image
          src={src}
          alt={company}
          width={22}
          height={22}
          className="relative"
          style={{ objectFit: "contain", width: "100%", height: "100%", display: "block", padding: 5 }}
          onError={() => setError(true)}
        />
      ) : (
        <span className="text-[10px] font-black select-none" style={{ color: pal.accent }}>
          {company.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

/* ── Timeline dot (mobile) ────────────────────────────────────────────────── */
function Dot({ pal }: { pal: Pal }) {
  return (
    <div className="exp-dot relative flex items-center justify-center" style={{ width: 24, height: 24 }}>
      <div
        className="rounded-full"
        style={{ width: 13, height: 13, background: pal.grad, border: "3px solid var(--bg-alt)", boxShadow: `0 0 8px ${pal.glow}` }}
      />
    </div>
  );
}

/* ── Shared detail content (achievements / metrics / tech) ─────────────────── */
function DetailBody({ exp }: { exp: (typeof experiences)[number] }) {
  return (
    <>
      {/* Achievements */}
      <ul className="flex flex-col gap-2.5">
        {exp.achievements.map((a, j) => (
          <li key={j} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
            <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: PAL.accent }} />
            <span><Highlight text={a} /></span>
          </li>
        ))}
      </ul>

      {/* Metrics */}
      <div className="flex flex-wrap gap-2.5 justify-center">
        {exp.metrics.map((m, j) => (
          <div key={j} className="flex-none w-[150px] rounded-xl px-3 py-2.5 text-center"
            style={{ background: PAL.bg, border: `1px solid ${PAL.border}` }}>
            <p className="text-lg font-black tabular-nums leading-none mb-0.5" style={gradText}>{m.value}</p>
            <p className="text-[11px] leading-tight" style={{ color: "var(--muted)" }}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5">
        {exp.tech.map((t) => (
          <span key={t} className="text-[11px] px-2.5 py-1 rounded-full"
            style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export function Experience() {
  const secRef = useRef<HTMLElement>(null);
  const capMobileRef = useRef<HTMLDivElement>(null);

  /* Desktop bubble-tail tracking: the panel's left tail slides vertically to
     line up with whichever company tab is currently selected. */
  const panelRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [tailTop, setTailTop] = useState<number | null>(null);

  /* Desktop: one role selected at a time (tab/list-select). */
  const [selected, setSelected] = useState(0);

  /* Mobile: independent accordion toggles (unchanged). */
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([0]));
  const isOpen = (i: number) => openSet.has(i);
  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });

  const loadingComplete = useLoadingComplete();

  /* Measure the selected tab's vertical centre (relative to the panel) so the
     tail points at it. Re-runs on selection, load, and resize. */
  useEffect(() => {
    const place = () => {
      const item = railRefs.current[selected];
      const panel = panelRef.current;
      if (!item || !panel) return;
      const ir = item.getBoundingClientRect();
      const pr = panel.getBoundingClientRect();
      const radius = 18; // keep the tail off the rounded corners
      const center = ir.top + ir.height / 2 - pr.top;
      setTailTop(Math.min(Math.max(center, radius), pr.height - radius));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [selected, loadingComplete]);

  useEffect(() => {
    if (!loadingComplete) return;

    /* Sticky briefcase (mobile timeline) — pulses + tilts with scroll. */
    const cap = capMobileRef.current;
    let killPulse: gsap.core.Tween | null = null;
    if (cap) {
      gsap.set(cap, { rotation: 0 });
      killPulse = gsap.to(cap, { scale: 1.1, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY; const down = y > lastY; lastY = y;
      if (cap) gsap.to(cap, { rotation: down ? 12 : -12, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const ctx = gsap.context(() => {
      gsap.set([".exp-label", ".exp-title"], { opacity: 0 });
      const mm = gsap.matchMedia();

      /* Header — all devices */
      const headerStart = () => (window.innerWidth < 768 ? "top 70%" : "top 82%");
      gsap.fromTo(".exp-label", { opacity: 0, y: -16, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out", clearProps: "filter",
          scrollTrigger: { trigger: ".exp-header", start: headerStart, toggleActions: "play none none none" } });
      gsap.fromTo(".exp-title", { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power4.out",
          scrollTrigger: { trigger: ".exp-header", start: headerStart, toggleActions: "play none none none" } });

      /* Desktop: rail items slide in, panel rises */
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(".exp-rail-item", { opacity: 0, x: -24 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power3.out",
            scrollTrigger: { trigger: ".exp-desktop", start: "top 80%", toggleActions: "play none none none" } });
        gsap.fromTo(".exp-panel", { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: ".exp-desktop", start: "top 80%", toggleActions: "play none none none" } });
      });

      /* Mobile: dot pops + accordion card rises (per entry) */
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".exp-entry").forEach((el) => {
          const dot = el.querySelector<HTMLElement>(".exp-dot");
          if (dot) gsap.fromTo(dot, { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
              scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } });
          const card = el.querySelector<HTMLElement>(".exp-mob-card");
          if (card) gsap.fromTo(card, { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" } });
        });
      });
    }, secRef);

    return () => {
      ctx.revert();
      killPulse?.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, [loadingComplete]);

  const sel = experiences[selected];

  return (
    <section
      ref={secRef}
      id="experience"
      className="pt-7 sm:pt-[4.5rem] pb-14 sm:pb-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="exp-header mb-10 sm:mb-16 text-center flex flex-col items-center">
          <p className="exp-label section-label mb-3" style={{ opacity: 0 }}>Career</p>
          <h2 className="exp-title font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
            Work Experience
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed mx-auto" style={{ color: "var(--fg-dim)", maxWidth: "44rem" }}>
            Roles where I&apos;ve designed, built, and shipped production systems across teams and domains.
          </p>
        </div>

        {/* ── DESKTOP: tab / list-select ── */}
        <div className="exp-desktop hidden md:grid gap-8 items-start"
          style={{ gridTemplateColumns: "minmax(255px, 330px) 1fr" }}
          role="tablist" aria-label="Work experience">

          {/* Left rail — company selector */}
          <div className="flex flex-col gap-2.5">
            {experiences.map((exp, i) => {
              const active = selected === i;
              return (
                <button
                  key={exp.id}
                  ref={(el) => { railRefs.current[i] = el; }}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelected(i)}
                  className="exp-rail-item relative text-left rounded-xl p-3 pl-4 flex items-center gap-3 transition-all duration-300"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    boxShadow: active ? "var(--shadow-card)" : "none",
                  }}
                >
                  {/* Active accent bar */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                    style={{ width: 3, height: active ? "62%" : "0%", background: PAL.grad, transition: "height 0.3s ease" }} />
                  <CompanyLogo src={exp.logo} company={exp.company} pal={PAL} size={40} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold truncate" style={{ color: "var(--fg)" }}>{exp.company}</p>
                    <p className="text-[11px] truncate leading-snug" style={{ color: "var(--muted)" }}>{exp.role}</p>
                    <p className="text-[10px] font-semibold mt-0.5" style={{ color: active ? PAL.accent : "var(--muted)" }}>{exp.period}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right detail panel — iMessage-style bubble. The tail (left edge)
              slides vertically to point at the selected company tab. */}
          <div className="relative">

            {/* Tail — two stacked triangles (border + fill) pointing left.
                `tailTop` aligns it with the active tab's vertical centre. */}
            {tailTop !== null && (
              <div
                aria-hidden
                className="exp-tail"
                style={{
                  position: "absolute",
                  top: tailTop,
                  left: 0,
                  zIndex: 5,
                  transform: "translateY(-50%)",
                  transition: "top 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {/* Gradient-outlined tail. The two sloped edges carry the same
                    ember gradient as the panel border; the base (right edge) is
                    left open so it merges seamlessly into the box — no seam line.
                    The card-coloured fill overlaps the panel's left border band
                    to hide it behind the tail. */}
                <svg
                  width="22"
                  height="26"
                  viewBox="0 0 22 26"
                  style={{ position: "absolute", left: -18, top: "50%", transform: "translateY(-50%)", overflow: "visible" }}
                >
                  <defs>
                    <linearGradient id="expTailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="var(--accent2)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20 2 L2 13 L20 24"
                    fill="var(--card)"
                    stroke="url(#expTailGrad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            <div ref={panelRef} className="exp-panel relative rounded-2xl overflow-hidden p-7 lg:p-8"
              role="tabpanel"
              style={{
                /* Ember gradient border (same accent → accent2 as the rail bars),
                   painted via padding-box / border-box clip so the inside stays
                   the card colour while the 2px perimeter shows the gradient. */
                border: "2px solid transparent",
                background:
                  "linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, var(--accent), var(--accent2)) border-box",
                boxShadow: "var(--shadow-card), var(--inset-highlight)",
                minHeight: "clamp(380px, 40vw, 460px)",
              }}>

            {/* Faded company-logo watermark in the top-right corner. Square icon
                logos fill the quadrant; wide wordmarks (logoMark) use a smaller,
                corner-tucked box so they don't stretch across or overlap text. */}
            {sel.logo && (() => {
              const usingMark = "logoMark" in sel && !!sel.logoMark;
              return (
                <div
                  key={`wm-${selected}`}
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    top: usingMark ? 22 : 0,
                    right: usingMark ? 24 : 0,
                    width: usingMark ? "34%" : "50%",
                    height: usingMark ? "18%" : "50%",
                    zIndex: 0,
                  }}
                >
                  <Image
                    src={usingMark ? (sel as { logoMark: string }).logoMark : sel.logo}
                    alt=""
                    fill
                    className="select-none"
                    style={{ objectFit: "contain", objectPosition: "top right", opacity: usingMark ? 0.05 : 0.07, filter: "grayscale(1)" }}
                  />
                </div>
              );
            })()}

            <div key={selected} className="exp-panel-in relative z-10 flex flex-col gap-5">
              {/* Header: logo + company pill + period + role */}
              <div className="flex items-start gap-3">
                <CompanyLogo src={sel.logo} company={sel.company} pal={PAL} size={48} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    {sel.companyUrl ? (
                      <a href={sel.companyUrl} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-bold px-2.5 py-1 rounded-full transition-opacity hover:opacity-75"
                        style={{ background: PAL.bg, color: PAL.accent, border: `1px solid ${PAL.border}` }}>
                        {sel.company}
                      </a>
                    ) : (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: PAL.bg, color: PAL.accent, border: `1px solid ${PAL.border}` }}>
                        {sel.company}
                      </span>
                    )}
                    <span className="text-xs font-medium px-3 py-1 rounded-full shrink-0 inline-flex items-center gap-1"
                      style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                      <MapPin size={11} style={{ opacity: 0.8 }} />
                      {sel.location}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black leading-tight mt-2" style={{ color: "var(--fg)" }}>
                    {sel.role}
                  </h3>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: `linear-gradient(to right, ${PAL.border}, transparent)` }} />

              <DetailBody exp={sel} />
            </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE: timeline + accordion (unchanged behaviour) ── */}
        <div className="block md:hidden relative">
          {/* Left line */}
          <div className="absolute top-0 bottom-0" style={{ left: 11, width: 1, background: "var(--border)" }} />

          {/* Sticky briefcase rides the line */}
          <div style={{ position: "sticky", top: "calc(50vh - 12px)", height: 0, zIndex: 30, overflow: "visible" }}>
            <div style={{ position: "absolute", left: 11, transform: "translateX(-50%) translateY(-50%)" }}>
              <div ref={capMobileRef} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Briefcase size={20} color="var(--accent)" style={{ filter: "drop-shadow(0 0 7px var(--accent))" }} />
              </div>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: "clamp(1.5rem, 5vw, 3rem)" }}>
            {experiences.map((exp, i) => (
              <div key={exp.id} className="exp-entry relative" style={{ paddingLeft: 36 }}>
                <div className="absolute" style={{ left: 0, top: 18 }}>
                  <Dot pal={PAL} />
                </div>

                <div className="exp-mob-card rounded-2xl overflow-hidden"
                  style={{
                    border: `1px solid ${isOpen(i) ? PAL.border : "var(--border)"}`,
                    background: "var(--card)",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: isOpen(i) ? "var(--shadow-card)" : "none",
                  }}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-left" onClick={() => toggle(i)}>
                    <MobileCompanyLogo src={exp.logo} company={exp.company} pal={PAL} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>
                        {exp.company} · {exp.period}
                      </p>
                      <p className="text-sm font-bold truncate leading-snug mt-0.5" style={{ color: "var(--fg)" }}>
                        {exp.role}
                      </p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"
                      style={{ color: "var(--muted)", transform: isOpen(i) ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div style={{ display: "grid", gridTemplateRows: isOpen(i) ? "1fr" : "0fr", transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
                    <div style={{ overflow: "hidden" }}>
                      <div className="px-4 pb-4 flex flex-col gap-3" style={{ borderTop: `1px solid ${PAL.border}` }}>
                        <ul className="flex flex-col gap-2 pt-3">
                          {exp.achievements.map((a, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                              <span className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: PAL.accent }} />
                              <span><Highlight text={a} /></span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {exp.metrics.map((m, j) => (
                            <div key={j} className="flex-1 min-w-[72px] rounded-xl px-2.5 py-2 text-center"
                              style={{ background: PAL.bg, border: `1px solid ${PAL.border}` }}>
                              <p className="text-sm font-black tabular-nums leading-none mb-0.5" style={gradText}>{m.value}</p>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
