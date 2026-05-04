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
      gsap.fromTo(".cp-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".cp-header", start: "top 85%", toggleActions: "play none none none" } });

      gsap.fromTo(".cp-card",
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".cp-grid", start: "top 85%", toggleActions: "play none none none" } });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="coding" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="cp-header opacity-0 mb-14 flex flex-col gap-2">
          <p className="section-label">Competitive</p>
          <h2 className="font-black tracking-tight"
            style={{ fontSize: "clamp(1.8rem,8vw,5rem)", color: "var(--fg)", lineHeight: 1.1 }}>
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
                <span className="block font-black tracking-tight leading-none"
                  style={{ fontSize: "clamp(3rem,6vw,5rem)", color: p.color }}>
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
