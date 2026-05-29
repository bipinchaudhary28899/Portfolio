"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Header ── */
      const htl = gsap.timeline({
        scrollTrigger: { trigger: ".skills-header", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom+=180", toggleActions: "play none none none" },
      });
      htl.fromTo(".skills-label", { opacity: 0, x: -24 },         { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
         .fromTo(".skills-title", { opacity: 0, y: 44, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out" }, "-=0.2");

      /* ── Desktop: category cards fan in from bottom with stagger,
            then skill tags ripple in inside each card ── */
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(".skill-cat",
          { opacity: 0, y: 55, scale: 0.93 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: ".skills-grid", start: "top bottom+=180", toggleActions: "play none none none" },
            onComplete() {
              // After cards are visible, stagger each row of skill tags
              gsap.fromTo(".skill-tag",
                { opacity: 0, x: -14 },
                { opacity: 1, x: 0, stagger: 0.025, duration: 0.35, ease: "power2.out" });
            },
          });
      });

      /* ── Mobile: cards slide up, skill tags follow ── */
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(".skill-cat",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: ".skills-grid", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
            onComplete() {
              gsap.fromTo(".skill-tag",
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, stagger: 0.02, duration: 0.3, ease: "power2.out" });
            },
          });
      });

    }, sec);
    return () => ctx.revert();
  }, []);

  const categories = Object.entries(skills);
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef    = useRef<HTMLDivElement>(null);

  /* Scroll the active tab pill into view when activeTab changes */
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const active = container.children[activeTab] as HTMLElement | undefined;
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeTab]);

  const goPrev = () => setActiveTab((t) => Math.max(0, t - 1));
  const goNext = () => setActiveTab((t) => Math.min(categories.length - 1, t + 1));

  return (
    <>
      {/* ══ DESKTOP ══════════════════════════════════════════════════════════ */}
      <section ref={sec} id="skills" className="hidden md:block py-36 px-12 lg:px-20"
        style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="skills-header mb-14">
            <p className="skills-label section-label mb-3" style={{ opacity: 0 }}>Stack</p>
            <h2 className="skills-title heading-accent font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
              Skills & Tools
            </h2>
          </div>
          <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map(([cat, items]) => (
              <div key={cat} className="skill-cat opacity-0 rounded-2xl border p-6"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  backgroundImage: `
                    linear-gradient(180deg, var(--shine-top) 0px, transparent 1px),
                    linear-gradient(135deg, var(--shine-corner) 0%, transparent 55%)
                  `,
                  boxShadow: "var(--shadow-card), var(--inset-highlight)",
                }}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-5 rounded-full"
                    style={{ background: "linear-gradient(180deg,var(--grad-a),var(--grad-b))" }} />
                  <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--fg)" }}>{cat}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {items.map((skill) => (
                    <div key={skill}
                      className="skill-tag text-sm py-1.5 px-3 rounded-lg border transition-all duration-200 cursor-default"
                      style={{ borderColor: "var(--border)", color: "var(--fg-dim)", background: "var(--bg-alt)", opacity: 0 }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--accent)";
                        el.style.color = "var(--fg)";
                        el.style.boxShadow = "0 0 0 1px var(--glow), 0 0 14px var(--glow)";
                        el.style.background = "var(--glow)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border)";
                        el.style.color = "var(--fg-dim)";
                        el.style.boxShadow = "none";
                        el.style.background = "var(--bg-alt)";
                      }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOBILE — single-viewport tab layout ══════════════════════════════ */}
      <section id="skills" className="block md:hidden py-14 px-5"
        style={{ background: "var(--bg)" }}>

        {/* Header */}
        <div className="mb-6">
          <p className="section-label mb-2">Stack</p>
          <h2 className="text-3xl font-black" style={{ color: "var(--fg)" }}>Skills & Tools</h2>
        </div>

        {/* Category tabs — horizontal scroll with < > nav arrows */}
        <div className="flex items-center gap-2 mb-5">

          {/* Prev arrow */}
          <button
            onClick={goPrev}
            disabled={activeTab === 0}
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background:   activeTab === 0 ? "var(--card)" : "var(--accent)",
              color:        activeTab === 0 ? "var(--muted)" : "#fff",
              border:       "1px solid var(--border)",
              opacity:      activeTab === 0 ? 0.4 : 1,
            }}
            aria-label="Previous category"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2L4 6l3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Scrollable pill row */}
          <div ref={tabsRef} className="flex gap-2 overflow-x-auto pb-1 flex-1"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {categories.map(([cat], i) => (
              <button
                key={cat}
                onClick={() => setActiveTab(i)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={i === activeTab ? {
                  background: "var(--accent)",
                  color:      "#fff",
                } : {
                  background: "var(--card)",
                  color:      "var(--muted)",
                  border:     "1px solid var(--border)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            disabled={activeTab === categories.length - 1}
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: activeTab === categories.length - 1 ? "var(--card)" : "var(--accent)",
              color:      activeTab === categories.length - 1 ? "var(--muted)" : "#fff",
              border:     "1px solid var(--border)",
              opacity:    activeTab === categories.length - 1 ? 0.4 : 1,
            }}
            aria-label="Next category"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 2L8 6l-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>

        {/* Active category skills — wrap tags */}
        <div className="flex flex-wrap gap-2">
          {categories[activeTab][1].map((skill) => (
            <span
              key={skill}
              className="text-sm px-3 py-1.5 rounded-lg border"
              style={{
                borderColor: "var(--border)",
                color:       "var(--fg-dim)",
                background:  "var(--card)",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

      </section>
    </>
  );
}
