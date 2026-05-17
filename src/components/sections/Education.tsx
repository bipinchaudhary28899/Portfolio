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

      // Left card slides in from left, right card from right
      const cards = sec.current?.querySelectorAll(".edu-card");
      if (cards) {
        gsap.fromTo(cards[0],
          { opacity: 0, x: -50, y: 30 },
          { opacity: 1, x: 0, y: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: ".edu-list", start: "top 85%", toggleActions: "play none none none" } });

        gsap.fromTo(cards[1],
          { opacity: 0, x: 50, y: 30 },
          { opacity: 1, x: 0, y: 0, duration: 0.75, ease: "power3.out", delay: 0.1,
            scrollTrigger: { trigger: ".edu-list", start: "top 85%", toggleActions: "play none none none" } });
      }
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

        {/* 2-column grid — 1 row, 2 cards */}
        <div className="edu-list grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className="edu-card opacity-0 rounded-2xl border overflow-hidden flex flex-col h-full"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              {/* Top accent line */}
              <div className="h-1 flex-shrink-0"
                style={{ background: i === 0
                  ? "linear-gradient(90deg,var(--grad-a),var(--grad-b))"
                  : "var(--border)" }} />

              <div className="p-7 flex flex-col gap-5 flex-1">

                {/* Period */}
                <p className="section-label">{edu.period}</p>

                {/* Degree + institution */}
                <div>
                  <h3 className="text-xl font-bold leading-snug mb-1" style={{ color: "var(--fg)" }}>
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: "var(--fg-dim)" }}>
                    {edu.institutionFull}
                  </p>
                </div>

                {/* Grade badge */}
                <span className="self-start px-4 py-1.5 rounded-xl text-sm font-semibold border"
                  style={{ borderColor: "var(--border)", color: "var(--accent)", background: "var(--bg)" }}>
                  {edu.grade}
                </span>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                  {edu.description}
                </p>

                {/* Highlights */}
                <ul className="flex flex-col gap-2 mt-auto">
                  {edu.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm" style={{ color: "var(--fg-dim)" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent)" }} />
                      {h}
                    </li>
                  ))}
                </ul>

              </div>

              {/* Bottom accent line — mirror of top, full gradient on first card */}
              <div className="h-px flex-shrink-0"
                style={{ background: i === 0
                  ? "linear-gradient(90deg,var(--grad-a),transparent)"
                  : "var(--border)" }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
