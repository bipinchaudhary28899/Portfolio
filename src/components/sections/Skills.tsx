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
      gsap.fromTo(".skills-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".skills-header", start: "top 85%", toggleActions: "play none none none" } });

      gsap.fromTo(".skill-cat",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".skills-grid", start: "top 85%", toggleActions: "play none none none" } });
    }, sec);
    return () => ctx.revert();
  }, []);

  const categories = Object.entries(skills);

  return (
    <section ref={sec} id="skills" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="skills-header opacity-0 mb-14">
          <p className="section-label mb-3">Stack</p>
          <h2 className="font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)" }}>
            Skills & Tools
          </h2>
        </div>

        <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(([cat, items]) => (
            <div key={cat} className="skill-cat opacity-0 rounded-2xl border p-6"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              {/* Category header */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-5 rounded-full" style={{ background: "linear-gradient(180deg,var(--grad-a),var(--grad-b))" }} />
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--fg)" }}>{cat}</h3>
              </div>
              {/* Tags */}
              <div className="flex flex-col gap-2">
                {items.map((skill) => (
                  <div key={skill}
                    className="text-sm py-1.5 px-3 rounded-lg border transition-all duration-200 cursor-default"
                    style={{ borderColor: "var(--border)", color: "var(--fg-dim)", background: "var(--bg-alt)" }}
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