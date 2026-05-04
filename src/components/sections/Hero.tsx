"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { personalInfo } from "@/data/portfolio";

export function Hero() {
  const sec    = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const badge  = useRef<HTMLDivElement>(null);
  const role   = useRef<HTMLParagraphElement>(null);
  const n1     = useRef<HTMLHeadingElement>(null);
  const n2     = useRef<HTMLHeadingElement>(null);
  const tag    = useRef<HTMLDivElement>(null);
  const cta    = useRef<HTMLDivElement>(null);
  const bot    = useRef<HTMLDivElement>(null);
  const scr    = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl
        .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "power3.inOut" }, 0)
        .fromTo(badge.current,   { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(role.current,    { yPercent: 110 }, { yPercent: 0, duration: 0.85 }, 0.55)
        .fromTo(n1.current,      { yPercent: 110 }, { yPercent: 0, duration: 1.1 },  0.66)
        .fromTo(n2.current,      { yPercent: 110 }, { yPercent: 0, duration: 1.1 },  0.80)
        .fromTo(tag.current,     { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 }, 1.05)
        .fromTo(cta.current,     { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 1.18)
        .fromTo(bot.current,     { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 1.28)
        .fromTo(scr.current,     { opacity: 0 },        { opacity: 1, duration: 0.5 },        1.45);

      gsap.to(scr.current, {
        y: 9, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2,
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sec}
      id="hero"
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100svh", minHeight: 620, background: "var(--bg)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% -8%,rgba(255,101,53,.14),transparent 65%)" }} />

      {/* Top accent line */}
      <div ref={lineRef} className="accent-line absolute top-0 left-0 right-0" style={{ transformOrigin: "left" }} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-14 pt-24">
        <div ref={badge} className="opacity-0">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
            style={{ border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
            Available for work
          </span>
        </div>
        <span className="font-mono text-xs tabular-nums" style={{ color: "var(--muted)" }}>
          {new Date().getFullYear()}
        </span>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-14 -mt-6">
        <div className="clip-wrap mb-4">
          <p ref={role} className="section-label">{personalInfo.role}</p>
        </div>

        <div className="clip-wrap">
          <h1 ref={n1} className="font-black tracking-tighter leading-none"
            style={{ fontSize: "clamp(2rem,11vw,13rem)", color: "var(--fg)" }}>
            {personalInfo.firstName.toUpperCase()}
          </h1>
        </div>
        <div className="clip-wrap">
          <h1 ref={n2} className="gradient-text font-black tracking-tighter leading-none"
            style={{ fontSize: "clamp(2rem,11vw,13rem)" }}>
            {personalInfo.lastName.toUpperCase()}
          </h1>
        </div>

        <div ref={tag} className="opacity-0 mt-7 max-w-lg">
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-dim)" }}>
            {personalInfo.tagline}
          </p>
        </div>

        <div ref={cta} className="opacity-0 mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))" }}
          >
            View Work
          </button>
          <a href={personalInfo.resumeUrl} download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-all hover:border-orange-500"
            style={{ border: "1px solid var(--border)", color: "var(--fg)" }}>
            <Download size={14} /> Resume
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div ref={bot} className="relative z-10 opacity-0 flex items-end justify-between px-6 sm:px-14 pb-8">
        <div className="flex items-center gap-3">
          {([
            { Icon: GithubIcon,   href: personalInfo.github,   label: "GitHub"   },
            { Icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
          ] as const).map(({ Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="p-2 rounded-lg border transition-all hover:scale-110"
              style={{ border: "1px solid var(--border)", color: "var(--muted)", background: "var(--card)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
              <Icon width={16} height={16} />
            </a>
          ))}
          <span className="hidden sm:block text-xs" style={{ color: "var(--muted)" }}>{personalInfo.location}</span>
        </div>

        <button ref={scr} onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-1 opacity-0" style={{ color: "var(--muted)" }} aria-label="Scroll down">
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={15} />
        </button>
      </div>

    </section>
  );
}
