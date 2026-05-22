"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { projects } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

/* ── Mobile card ─────────────────────────────────────────────────────────── */
function ProjectCard({ p, i }: { p: (typeof projects)[0]; i: number }) {
  return (
    <div
      className="proj-card rounded-2xl border overflow-hidden flex flex-col opacity-0"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Full landscape screenshot — no cropping */}
      <div className="w-full overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
        <Image
          src={p.image}
          alt={`${p.title} screenshot`}
          width={1600}
          height={900}
          className="w-full h-auto block"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {p.githubUrl !== "#" && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded transition-colors hover:text-white"
                style={{ color: "var(--muted)" }}>
                <GithubIcon width={15} height={15} />
              </a>
            )}
            {p.liveUrl !== "#" && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded transition-colors"
                style={{ color: "var(--accent)" }}>
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold leading-snug" style={{ color: "var(--fg)" }}>
          {p.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
          {p.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--bg)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Desktop panel ───────────────────────────────────────────────────────── */
function ProjectPanel({ p, i }: { p: (typeof projects)[0]; i: number }) {
  const num = String(i + 1).padStart(2, "0");

  return (
    <div
      className="relative group border-r"
      style={{
        flexShrink: 0,
        width: "1080px",
        height: "100%",
        borderColor: "var(--border)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2rem 3rem",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Ghost number */}
      <span
        className="absolute bottom-8 right-10 font-black font-mono pointer-events-none select-none"
        style={{ fontSize: "clamp(6rem,11vw,11rem)", lineHeight: 1, opacity: 0.04, color: "var(--fg)" }}
      >
        {num}
      </span>

      {/* ── Row 1: counter + links ── */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest" style={{ color: "var(--accent)" }}>
          {num} / {String(projects.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {p.githubUrl !== "#" && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg border transition-all hover:scale-110"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--fg)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--muted)"; }}>
              <GithubIcon width={15} height={15} />
            </a>
          )}
          {p.liveUrl !== "#" && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg border transition-all hover:scale-110"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--muted)"; }}>
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* ── Row 2: two columns — title+desc  |  screenshot ── */}
      <div className="relative z-10 flex items-center gap-8 flex-1 py-4" style={{ minHeight: 0 }}>

        {/* Left text */}
        <div className="flex flex-col gap-4" style={{ flex: "0 0 36%", minWidth: 0 }}>
          <h3
            className="font-black tracking-tight leading-tight"
            style={{ fontSize: "clamp(1.8rem,3.2vw,3.2rem)", color: "var(--fg)" }}
          >
            {p.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
            {p.description}
          </p>
        </div>

        {/* Right: full landscape screenshot, no cropping */}
        <div
          className="proj-img rounded-xl overflow-hidden border"
          style={{
            flex: "1 1 0%",
            minWidth: 0,
            borderColor: "var(--border)",
            boxShadow: "0 20px 56px rgba(0,0,0,0.4)",
          }}
        >
          <Image
            src={p.image}
            alt={`${p.title} screenshot`}
            width={1600}
            height={900}
            className="w-full h-auto block"
            sizes="(min-width: 768px) 58vw"
          />
          {/* Hover gloss */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)" }}
          />
        </div>
      </div>

      {/* ── Row 3: tech tags ── */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span key={t} className="text-xs px-3 py-1 rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--card)" }}>
            {t}
          </span>
        ))}
      </div>

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: "linear-gradient(90deg,var(--grad-a),var(--grad-b))" }}
      />
    </div>
  );
}

/* ── Mobile projects — image cards on top + accordion detail ─────────────── */
function MobileProjects() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="block md:hidden py-14" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <div className="proj-mob-hd flex items-end justify-between mb-5 px-5" style={{ opacity: 0 }}>
        <div>
          <p className="section-label mb-2">Work</p>
          <h2 className="text-3xl font-black" style={{ color: "var(--fg)" }}>Selected Projects</h2>
        </div>
        <a href="https://github.com/bipinchaudhary28899" target="_blank" rel="noopener noreferrer"
          className="text-xs font-medium pb-1" style={{ color: "var(--accent)" }}>
          GitHub →
        </a>
      </div>

      {/* ── Horizontally scrollable image cards ─────────────────────────── */}
      <div
        className="flex gap-3 overflow-x-auto pb-2 px-5"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpen(open === i ? null : i)}
            className="flex-shrink-0 rounded-xl overflow-hidden text-left"
            style={{
              width:  "52vw",
              border: open === i
                ? "2px solid var(--accent)"
                : "1.5px solid var(--border)",
              background: "var(--card)",
              transition: "border-color 0.2s ease",
            }}
          >
            <Image
              src={p.image}
              alt={p.title}
              width={400} height={225}
              className="w-full h-auto block"
              sizes="52vw"
            />
            <div className="px-3 py-2 flex items-center justify-between gap-2">
              <p className="text-xs font-bold truncate" style={{ color: "var(--fg)" }}>
                {p.title}
              </p>
              <span
                className="font-mono text-xs flex-shrink-0"
                style={{ color: "var(--accent)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Accordion detail rows ────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 px-5 mt-4">
        {projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <div
              key={p.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background:  "var(--card)",
                border: isOpen
                  ? "1.5px solid var(--accent)"
                  : "1.5px solid var(--border)",
                transition: "border-color 0.2s ease",
              }}
            >
              {/* Collapsed row */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-mono text-xs flex-shrink-0" style={{ color: "var(--accent)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="flex-1 text-sm font-bold truncate" style={{ color: "var(--fg)" }}>
                  {p.title}
                </p>

                {/* Links */}
                <div className="flex items-center gap-2 flex-shrink-0"
                  onClick={e => e.stopPropagation()}>
                  {p.githubUrl !== "#" && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="p-1" style={{ color: "var(--muted)" }}>
                      <GithubIcon width={14} height={14} />
                    </a>
                  )}
                  {p.liveUrl !== "#" && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="p-1" style={{ color: "var(--accent)" }}>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {/* Chevron */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{
                    flexShrink: 0, color: "var(--muted)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                  }}>
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Expandable content */}
              <div style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.3s ease",
              }}>
                <div style={{ overflow: "hidden" }}>
                  <div className="flex flex-col gap-3 px-4 pb-4"
                    style={{ borderTop: "1px solid var(--border)" }}>
                    <p className="text-xs leading-relaxed pt-3" style={{ color: "var(--fg-dim)" }}>
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map(t => (
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

/* ── Section ─────────────────────────────────────────────────────────────── */
export function Projects() {
  const desktopSec  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Keep track top-padding in sync with the sticky header height */
    const syncPadding = () => {
      if (headRef.current && trackRef.current) {
        trackRef.current.style.paddingTop = headRef.current.offsetHeight + "px";
      }
    };
    syncPadding();
    window.addEventListener("resize", syncPadding);

    const mm = gsap.matchMedia();

    /* ── Desktop: horizontal pin-scroll ── */
    mm.add("(min-width: 768px)", () => {
      const section = desktopSec.current!;
      const track   = trackRef.current!;

      const ctx = gsap.context(() => {

        /* Header fade-in */
        gsap.fromTo(headRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 37%", toggleActions: "play none none none" } });

        /* Images: scale + fade in from slightly small when section pins */
        gsap.fromTo(
          track.querySelectorAll(".proj-img"),
          { opacity: 0, scale: 0.93, y: 18 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.8, stagger: 0.18, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top top", toggleActions: "play none none none" },
          }
        );

        /* Horizontal scrub — sum each child's rendered offsetWidth so vw-based
           widths and dynamic padding don't fool the measurement.            */
        const dist = () =>
          Array.from(track.children as HTMLCollectionOf<HTMLElement>)
            .reduce((sum, el) => sum + el.offsetWidth, 0) - window.innerWidth;

        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,  // re-runs dist() after any resize
          },
        });

      });
      return () => ctx.revert();
    });

    /* ── Mobile: animate header + image cards + accordion rows ── */
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".proj-mob-hd",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: ".proj-mob-hd", start: "top 60%", toggleActions: "play none none none" } });
      });
      return () => ctx.revert();
    });

    return () => {
      mm.revert();
      window.removeEventListener("resize", syncPadding);
    };
  }, []);

  return (
    <div id="projects">
      {/* ── Desktop ── */}
      <section
        ref={desktopSec}
        className="hidden md:block relative"
        style={{ height: "100vh", overflow: "hidden", background: "var(--bg)" }}
      >
        <div
          ref={headRef}
          className="absolute top-0 left-0 right-0 z-20 opacity-0 flex items-end justify-between px-14 pt-24 pb-5"
        >
          <div>
            <p className="section-label mb-1">Work</p>
            <h2 className="font-bold" style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", color: "var(--fg)" }}>
              Selected Projects
            </h2>
          </div>
          <a href="https://github.com/bipinchaudhary28899" target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium mb-1 flex items-center gap-1.5 transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)" }}>
            All on GitHub →
          </a>
        </div>

        {/* Scrolling track — flex row of panels */}
        <div ref={trackRef} className="h-track items-stretch" style={{ height: "100%" }}>
          <div style={{ flexShrink: 0, width: 56 }} />
          {projects.map((p, i) => <ProjectPanel key={p.id} p={p} i={i} />)}
          <div style={{ flexShrink: 0, width: 56 }} />
        </div>
      </section>

      {/* ── Mobile accordion ── */}
      <MobileProjects />
    </div>
  );
}
