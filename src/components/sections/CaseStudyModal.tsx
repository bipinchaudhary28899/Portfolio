"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { projects } from "@/data/portfolio";
import { ArchitectureCarousel } from "@/components/sections/ArchitectureCarousel";

interface Props {
  projectIndex: number;
  onClose:      () => void;
  onNext:       () => void;
  onPrev:       () => void;
}

export function CaseStudyModal({ projectIndex, onClose, onNext, onPrev }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  const p     = projects[projectIndex];
  const cs    = p.caseStudy;
  const total = projects.length;
  const diagrams = (p as { diagrams?: { src: string; title: string; caption: string }[] }).diagrams;

  /* ── Animate in whenever projectIndex changes ── */
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out" });
    gsap.fromTo(panelRef.current,   { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.38, ease: "power3.out" });
  }, [projectIndex]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft")  onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  /* ── Prevent body scroll while open ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ── Close on backdrop click ── */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        className="relative w-full overflow-y-auto"
        style={{
          background:   "var(--bg)",
          border:       "1.5px solid var(--border)",
          borderRadius: "1.5rem 1.5rem 0 0",
          maxHeight:    "90vh",
          boxShadow:    "var(--shadow-lg)",
          /* Top-edge gloss matching the cinematic panel look */
          backgroundImage:
            "linear-gradient(180deg, var(--shine-top) 0px, transparent 1px), linear-gradient(135deg, var(--shine-corner) 0%, transparent 45%)",
        }}
      >

        {/* ══ STICKY HEADER ════════════════════════════════════════════════ */}
        <div
          className="sticky top-0 z-10 px-5 sm:px-10 pt-4 pb-3"
          style={{
            background:   "var(--bg)",
            borderBottom: "1.5px solid var(--border)",
            backgroundImage:
              "linear-gradient(180deg, var(--shine-top) 0px, transparent 1px)",
          }}
        >
          {/* Row 1: prev/next counter — left | links + close — right */}
          <div className="flex items-center justify-between gap-3 mb-2">
            {/* Left: prev/next + counter */}
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                className="p-1.5 rounded-lg border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.color       = "var(--accent)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color       = "var(--muted)";
                }}
              >
                <ChevronLeft size={15} />
              </button>

              <span className="font-mono text-xs px-1" style={{ color: "var(--muted)" }}>
                {String(projectIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>

              <button
                onClick={onNext}
                className="p-1.5 rounded-lg border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.color       = "var(--accent)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color       = "var(--muted)";
                }}
              >
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Right: external links + close */}
            <div className="flex items-center gap-2">
              {p.githubUrl !== "#" && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border transition-all hover:scale-105"
                  style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                >
                  <GithubIcon width={14} height={14} />
                </a>
              )}
              {p.liveUrl !== "#" && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border transition-all hover:scale-105"
                  style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                >
                  <ExternalLink size={14} />
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg border transition-all hover:scale-105"
                style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.color       = "var(--fg)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color       = "var(--muted)";
                }}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Row 2: full project title — always wraps, never truncates */}
          <h2
            className="font-black text-lg sm:text-xl leading-snug"
            style={{ color: "var(--fg)" }}
          >
            {p.title}
          </h2>
        </div>

        {/* ══ BODY ═══════════════════════════════════════════════════════════ */}
        <div className="px-6 sm:px-10 pt-8 pb-4">

          {/* Problem — full width */}
          <div
            className="rounded-2xl p-5 sm:p-6 mb-6"
            style={{
              background: "var(--card)",
              border:     "1.5px solid var(--border)",
            }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--accent)" }}
            >
              The Problem
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              {cs.problem}
            </p>
          </div>

          {/* Decisions | Challenges | Architecture — 3-col on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            {/* Tech Decisions */}
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: "var(--accent)" }}
              >
                Tech Decisions
              </p>
              <div className="flex flex-col gap-4">
                {cs.decisions.map((d) => (
                  <div key={d.title}>
                    <p
                      className="text-xs font-bold mb-1 flex items-center gap-1.5"
                      style={{ color: "var(--fg)" }}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent)" }}
                      />
                      {d.title}
                    </p>
                    <p className="text-xs leading-relaxed pl-3" style={{ color: "var(--fg-dim)" }}>
                      {d.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: "var(--accent)" }}
              >
                Challenges
              </p>
              <div className="flex flex-col gap-4">
                {cs.challenges.map((c) => (
                  <div key={c.title}>
                    <p
                      className="text-xs font-bold mb-1 flex items-center gap-1.5"
                      style={{ color: "var(--fg)" }}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent)" }}
                      />
                      {c.title}
                    </p>
                    <p className="text-xs leading-relaxed pl-3" style={{ color: "var(--fg-dim)", whiteSpace: "pre-line" }}>
                      {c.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: "var(--accent)" }}
              >
                Data Flow
              </p>
              <pre
                className="text-xs leading-relaxed font-mono whitespace-pre-wrap"
                style={{ color: "var(--fg-dim)" }}
              >
                {cs.architecture}
              </pre>
            </div>
          </div>

          {/* Architecture — carousel, only when the project provides diagrams */}
          {diagrams && diagrams.length > 0 && (
            <ArchitectureCarousel diagrams={diagrams} />
          )}
        </div>

        {/* ══ METRICS FOOTER ═════════════════════════════════════════════════ */}
        <div
          className="px-6 sm:px-10 py-6"
          style={{ borderTop: "1.5px solid var(--border)" }}
        >
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--muted)" }}
          >
            Impact Metrics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cs.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl p-4 sm:p-5"
                style={{
                  background:  "var(--card)",
                  border:      "1.5px solid var(--border)",
                  borderTop:   "2.5px solid var(--accent)",
                }}
              >
                <p
                  className="text-2xl sm:text-3xl font-black leading-none mb-1.5 gradient-text"
                >
                  {m.value}
                </p>
                <p className="text-xs font-bold mb-1" style={{ color: "var(--fg)" }}>
                  {m.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Keyboard hint */}
        <div
          className="hidden sm:flex items-center justify-center gap-6 pb-5"
          style={{ color: "var(--muted)" }}
        >
          {[
            { key: "←  →", label: "navigate" },
            { key: "ESC",   label: "close" },
          ].map(({ key, label }) => (
            <span key={key} className="flex items-center gap-1.5 text-xs">
              <kbd
                className="px-1.5 py-0.5 rounded text-xs font-mono border"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                {key}
              </kbd>
              {label}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
