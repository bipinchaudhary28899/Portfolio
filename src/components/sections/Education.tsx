"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".edu-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".edu-header", start: "top 85%", toggleActions: "play none none none" } });

      gsap.fromTo(".edu-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".edu-list", start: "top 85%", toggleActions: "play none none none" } });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="education" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="edu-header opacity-0 mb-14">
          <p className="section-label mb-3">Background</p>
          <h2 className="font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)" }}>
            Education
          </h2>
        </div>

        <div className="edu-list flex flex-col gap-6">
          {education.map((edu, i) => (
            <div key={edu.id} className="edu-card opacity-0 rounded-2xl border overflow-hidden"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              {/* Top accent */}
              <div className="h-1" style={{ background: i === 0 ? "linear-gradient(90deg,var(--grad-a),var(--grad-b))" : "var(--border)" }} />
              <div className="p-7 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div className="min-w-0">
                    <p className="section-label mb-2">{edu.period}</p>
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight" style={{ color: "var(--fg)" }}>
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-base font-medium" style={{ color: "var(--fg-dim)" }}>
                      {edu.institutionFull}
                    </p>
                  </div>
                  <span className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border self-start"
                    style={{ borderColor: "var(--border)", color: "var(--accent)", background: "var(--bg)" }}>
                    {edu.grade}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-dim)" }}>
                  {edu.description}
                </p>
                <ul className="flex flex-col gap-2">
                  {edu.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm" style={{ color: "var(--fg-dim)" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
