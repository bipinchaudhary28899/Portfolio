"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { projects } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const TINTS = [
  "rgba(255,101,53,0.05)",
  "rgba(255,159,28,0.05)",
  "rgba(255,101,53,0.03)",
  "rgba(255,159,28,0.03)",
];

/* ── Mobile card ─────────────────────────────────────────────────────────── */
function ProjectCard({ p, i }: { p: (typeof projects)[0]; i: number }) {
  return (
    <div className="proj-card rounded-2xl border p-6 flex flex-col gap-4 opacity-0"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {p.githubUrl !== "#" && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
              className="p-1.5 rounded transition-colors hover:text-white" style={{ color: "var(--muted)" }}>
              <GithubIcon width={15} height={15} />
            </a>
          )}
          {p.liveUrl !== "#" && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
              className="p-1.5 rounded transition-colors" style={{ color: "var(--accent)" }}>
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold leading-snug" style={{ color: "var(--fg)" }}>{p.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>{p.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--bg)" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Desktop panel ───────────────────────────────────────────────────────── */
function ProjectPanel({ p, i }: { p: (typeof projects)[0]; i: number }) {
  const num = String(i + 1).padStart(2, "0");
  return (
    <div
      className="relative flex flex-col justify-between group border-r"
      style={{
        flexShrink: 0,
        width: "min(78vw,860px)",
        height: "100%",
        borderColor: "var(--border)",
        background: TINTS[i % TINTS.length],
        padding: "2.5rem 3.5rem",
        overflow: "hidden",
      }}
    >
      {/* Ghost number */}
      <span className="absolute top-6 right-8 font-black font-mono pointer-events-none select-none"
        style={{ fontSize: "clamp(7rem,15vw,14rem)", lineHeight: 1, opacity: 0.05, color: "var(--fg)" }}>
        {num}
      </span>

      {/* Top */}
      <div className="flex items-start justify-between relative z-10">
        <span className="font-mono text-xs tracking-widest" style={{ color: "var(--accent)" }}>
          {num} / {String(projects.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {p.githubUrl !== "#" && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg border transition-all hover:scale-110"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
              <GithubIcon width={15} height={15} />
            </a>
          )}
          {p.liveUrl !== "#" && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg border transition-all hover:scale-110"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Middle */}
      <div className="relative z-10 flex-1 flex flex-col justify-center mt-10">
        <h3 className="font-black tracking-tight leading-none mb-6"
          style={{ fontSize: "clamp(2.4rem,5vw,4.5rem)", color: "var(--fg)" }}>
          {p.title}
        </h3>
        <p className="text-sm sm:text-base leading-relaxed max-w-md" style={{ color: "var(--fg-dim)" }}>
          {p.description}
        </p>
      </div>

      {/* Tech */}
      <div className="relative z-10 flex flex-wrap gap-2 mt-8">
        {p.tech.map((t) => (
          <span key={t} className="text-xs px-3 py-1 rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--card)" }}>{t}</span>
        ))}
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: "linear-gradient(90deg,var(--grad-a),var(--grad-b))" }} />
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export function Projects() {
  const desktopSec  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const mobileHdRef = useRef<HTMLDivElement>(null);
  const mobileCards = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Sync track padding to actual header height */
    const syncPadding = () => {
      if (headRef.current && trackRef.current) {
        trackRef.current.style.paddingTop = headRef.current.offsetHeight + "px";
      }
    };
    syncPadding();
    window.addEventListener("resize", syncPadding);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = desktopSec.current!;
      const track   = trackRef.current!;
      const ctx = gsap.context(() => {
        gsap.fromTo(headRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" } });

        const dist = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => ctx.revert();
    });

    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(mobileHdRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: mobileHdRef.current, start: "top 85%", toggleActions: "play none none none" } });
        gsap.fromTo(
          mobileCards.current?.querySelectorAll(".proj-card") ?? [],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: mobileCards.current, start: "top 85%", toggleActions: "play none none none" } });
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
        <div ref={headRef} className="absolute top-0 left-0 right-0 z-20 opacity-0 flex items-end justify-between px-14 pt-24 pb-5"
          style={{ borderColor: "var(--border)" }}>
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

        {/* paddingTop set dynamically to match header height */}
        <div ref={trackRef} className="h-track items-stretch" style={{ height: "100%" }}>
          <div style={{ flexShrink: 0, width: 48 }} />
          {projects.map((p, i) => <ProjectPanel key={p.id} p={p} i={i} />)}
          <div style={{ flexShrink: 0, width: 48 }} />
        </div>
      </section>

      {/* ── Mobile ── */}
      <section className="block md:hidden py-20 px-5" style={{ background: "var(--bg)" }}>
        <div ref={mobileHdRef} className="mb-10 opacity-0">
          <p className="section-label mb-2">Work</p>
          <h2 className="text-3xl font-bold" style={{ color: "var(--fg)" }}>Selected Projects</h2>
        </div>
        <div ref={mobileCards} className="flex flex-col gap-5">
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
        </div>
        <div className="mt-8">
          <a href="https://github.com/bipinchaudhary28899" target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium" style={{ color: "var(--accent)" }}>
            All on GitHub →
          </a>
        </div>
      </section>
    </div>
  );
}
