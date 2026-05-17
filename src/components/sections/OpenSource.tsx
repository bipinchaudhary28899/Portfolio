"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, GitMerge, Bug, FileText, Zap } from "lucide-react";
import { openSourceContributions } from "@/data/portfolio";
import type { ContributionType } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const typeConfig: Record<ContributionType, { label: string; color: string; Icon: React.ElementType }> = {
  feature:       { label: "Feature",  color: "#a78bfa", Icon: Zap      },
  bug:           { label: "Bug Fix",  color: "#f87171", Icon: Bug      },
  documentation: { label: "Docs",     color: "#60a5fa", Icon: FileText },
};

export function OpenSource() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Header ── */
      const htl = gsap.timeline({
        scrollTrigger: { trigger: ".os-header", start: "top 85%", toggleActions: "play none none none" },
      });
      htl.fromTo(".os-label",  { opacity: 0, x: -24 },         { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
         .fromTo(".os-title",  { opacity: 0, y: 44, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out" }, "-=0.2");

      /* ── Stats bar: each pill pops in ── */
      gsap.fromTo(".os-stat",
        { opacity: 0, scale: 0.75, y: 20 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".os-stats", start: "top 88%", toggleActions: "play none none none" } });

      /* ── Desktop: alternating left / right card entrances ── */
      mm.add("(min-width: 768px)", () => {
        sec.current?.querySelectorAll<HTMLElement>(".os-card").forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" } });
        });
      });

      /* ── Mobile: cards slide up sequentially ── */
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(".os-card",
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, stagger: 0.13, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: ".os-list", start: "top 85%", toggleActions: "play none none none" } });
      });

    }, sec);
    return () => ctx.revert();
  }, []);

  const merged = openSourceContributions.filter((c) => c.status === "merged").length;

  return (
    <section ref={sec} id="opensource" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="os-header mb-6">
          <p className="os-label section-label mb-3" style={{ opacity: 0 }}>Community</p>
          <h2 className="os-title font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
            Open Source
          </h2>
        </div>

        {/* Stats bar */}
        <div className="os-stats flex flex-wrap gap-4 mb-12">
          {[
            { v: openSourceContributions.length, l: "Total PRs" },
            { v: merged,                          l: "Merged"    },
            { v: new Set(openSourceContributions.map((c) => c.repo)).size, l: "Repos" },
          ].map(({ v, l }) => (
            <div key={l} className="os-stat opacity-0 flex items-center gap-3 px-5 py-3 rounded-xl border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-xl font-black" style={{ color: "var(--accent)" }}>{v}</span>
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="os-list grid grid-cols-1 sm:grid-cols-2 gap-5">
          {openSourceContributions.map((c) => {
            const cfg = typeConfig[c.type];
            return (
              <div key={c.id} className="os-card opacity-0 rounded-2xl border p-6 sm:p-8"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex flex-col gap-4">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(34,197,94,.15)", color: "#22c55e" }}>
                      <GitMerge size={11} /> Merged
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: `${cfg.color}22`, color: cfg.color }}>
                      <cfg.Icon size={11} className="inline mr-1" />{cfg.label}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>{c.date}</span>
                    <span className="ml-auto flex items-center gap-1 text-xs font-medium" style={{ color: "var(--muted)" }}>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.langColor }} />
                      {c.language}
                    </span>
                  </div>

                  {/* Title + repo */}
                  <div>
                    <h3 className="text-base font-semibold mb-1" style={{ color: "var(--fg)" }}>
                      {c.prTitle}
                    </h3>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {c.repo} · {c.prNumber}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                    {c.description}
                  </p>

                  {/* Link */}
                  <a href={c.prUrl} target="_blank" rel="noopener noreferrer"
                    className="self-start inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "var(--accent)" }}>
                    View PR <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
