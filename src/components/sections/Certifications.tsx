"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Award } from "lucide-react";
import { certifications } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Certifications() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Header ── */
      const htl = gsap.timeline({
        scrollTrigger: { trigger: ".cert-header", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
      });
      htl.fromTo(".cert-label",  { opacity: 0, x: -24 },         { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
         .fromTo(".cert-title",  { opacity: 0, y: 44, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out" }, "-=0.2");

      /* ── Desktop: column-wave — cards pop in with back.out, stagger by column ── */
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(".cert-card",
          { opacity: 0, y: 55, scale: 0.88 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.65, ease: "back.out(1.4)",
            scrollTrigger: { trigger: ".cert-grid", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });
      });

      /* ── Mobile: cards slide up with stagger ── */
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(".cert-card",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: ".cert-grid", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });
      });

    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="certifications" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="cert-header mb-14">
          <p className="cert-label section-label mb-3" style={{ opacity: 0 }}>Credentials</p>
          <h2 className="cert-title font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
            Certifications
          </h2>
        </div>

        <div className="cert-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert) => (
            <a key={cert.id}
              href={cert.credentialUrl !== "#" ? cert.credentialUrl : undefined}
              target={cert.credentialUrl !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="cert-card opacity-0 group rounded-2xl border p-6 flex flex-col gap-4 relative overflow-hidden transition-transform duration-300 hover:-translate-y-2"
              style={{ background: "var(--card)", borderColor: "var(--border)", textDecoration: "none" }}>

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: cert.color, opacity: 0.7 }} />

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${cert.color}20` }}>
                <Award size={20} style={{ color: cert.color }} />
              </div>

              {/* Title */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold leading-snug mb-1" style={{ color: "var(--fg)" }}>
                  {cert.title}
                </h3>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {cert.issuer} · {cert.date}
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${cert.color}15`, color: cert.color }}>
                    {s}
                  </span>
                ))}
              </div>

              {cert.credentialUrl !== "#" && (
                <ExternalLink size={13} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--muted)" }} />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
