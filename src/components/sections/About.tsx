"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── shared: header ── */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".about-header", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
      });
      tl.fromTo(".about-label",  { opacity: 0, x: -24 },        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
        .fromTo(".about-title",  { opacity: 0, y: 44, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out" }, "-=0.2");

      /* ── stat counter animation ── */
      gsap.fromTo(".stat-item",
        { opacity: 0, y: 40, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".stat-grid", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── desktop: bio from left, achievements from right ── */
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(".about-bio-block",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: ".about-body", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

        gsap.fromTo(".achieve-item",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, stagger: 0.12, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: ".achieve-list", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });
      });

      /* ── mobile: everything slides up ── */
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(".about-bio-block",
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: ".about-bio-block", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

        gsap.fromTo(".achieve-item",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: ".achieve-list", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });
      });

    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="about" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="about-header mb-14">
          <p className="about-label section-label mb-3" style={{ opacity: 0 }}>About</p>
          <h2 className="about-title font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
            Who I am
          </h2>
        </div>

        {/* Stats */}
        <div className="stat-grid grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {personalInfo.stats.map((s) => (
            <div key={s.label} className="stat-item opacity-0 rounded-2xl p-6 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="block font-black tracking-tight leading-none mb-1 gradient-text"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
                {s.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bio + achievements */}
        <div className="about-body grid md:grid-cols-2 gap-12 items-start">
          <div className="about-bio-block opacity-0">
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              {personalInfo.bio}
            </p>
          </div>
          <div className="achieve-list flex flex-col gap-4">
            {personalInfo.achievements.map((a, i) => (
              <div key={i} className="achieve-item opacity-0 flex gap-4 items-start p-5 rounded-xl border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))" }}>
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
