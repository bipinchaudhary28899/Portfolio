"use client";

import { useEffect, useRef } from "react";
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
        scrollTrigger: { trigger: ".skills-header", start: "top 85%", toggleActions: "play none none none" },
      });
      htl.fromTo(".skills-label", { opacity: 0, x: -24 },         { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
         .fromTo(".skills-title", { opacity: 0, y: 44, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out" }, "-=0.2");

      /* ── Desktop: category cards fan in from bottom with stagger,
            then skill tags ripple in inside each card ── */
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(".skill-cat",
          { opacity: 0, y: 55, scale: 0.93 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: ".skills-grid", start: "top 82%", toggleActions: "play none none none" },
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
            scrollTrigger: { trigger: ".skills-grid", start: "top 85%", toggleActions: "play none none none" },
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

  return (
    <section ref={sec} id="skills" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="skills-header mb-14">
          <p className="skills-label section-label mb-3" style={{ opacity: 0 }}>Stack</p>
          <h2 className="skills-title font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
            Skills & Tools
          </h2>
        </div>

        <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(([cat, items]) => (
            <div key={cat} className="skill-cat opacity-0 rounded-2xl border p-6"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
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
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,101,53,.45)";
                      (e.currentTarget as HTMLElement).style.color = "var(--fg)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)";
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
  );
}
