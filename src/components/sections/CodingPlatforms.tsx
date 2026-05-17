"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { codingPlatforms } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function CodingPlatforms() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Header ── */
      const htl = gsap.timeline({
        scrollTrigger: { trigger: ".cp-header", start: "top 85%", toggleActions: "play none none none" },
      });
      htl.fromTo(".cp-label",  { opacity: 0, x: -24 },         { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
         .fromTo(".cp-title",  { opacity: 0, y: 44, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out" }, "-=0.2");

      /* ── Cards fan up from bottom with scale ── */
      gsap.fromTo(".cp-card",
        { opacity: 0, y: 65, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.13, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".cp-grid", start: "top 82%", toggleActions: "play none none none" } });

      /* ── Stat numbers pop in with slight delay after cards ── */
      gsap.fromTo(".cp-stat",
        { opacity: 0, y: 18, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.55, ease: "back.out(1.5)",
          delay: 0.55,
          scrollTrigger: { trigger: ".cp-grid", start: "top 82%", toggleActions: "play none none none" } });

    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="coding" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="cp-header mb-14 flex flex-col gap-2">
          <p className="cp-label section-label" style={{ opacity: 0 }}>Competitive</p>
          <h2 className="cp-title font-black tracking-tight"
            style={{ fontSize: "clamp(1.8rem,8vw,5rem)", color: "var(--fg)", lineHeight: 1.1, opacity: 0 }}>
            Coding Platforms
          </h2>
        </div>

        <div className="cp-grid grid sm:grid-cols-3 gap-6">
          {codingPlatforms.map((p) => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
              className="cp-card opacity-0 group rounded-2xl border p-8 flex flex-col gap-5 relative overflow-hidden transition-transform duration-300 hover:-translate-y-2"
              style={{ background: "var(--card)", borderColor: "var(--border)", textDecoration: "none" }}>

              {/* Top glow spot */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: p.color, opacity: 0.6 }} />

              {/* Platform name */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                  {p.name}
                </span>
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "var(--muted)" }} />
              </div>

              {/* Big stat */}
              <div>
                <span className="cp-stat block font-black tracking-tight leading-none"
                  style={{ fontSize: "clamp(3rem,6vw,5rem)", color: p.color, opacity: 0 }}>
                  {p.stat}
                </span>
                <span className="text-sm font-medium" style={{ color: "var(--fg-dim)" }}>
                  {p.statLabel}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.description}</p>

              {/* Badge */}
              <span className="self-start text-xs px-3 py-1 rounded-full font-semibold"
                style={{ background: `${p.color}22`, color: p.color }}>
                {p.badge}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
