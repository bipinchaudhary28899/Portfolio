"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { certifications } from "@/data/portfolio";
import { useLoadingComplete } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

type Cert = (typeof certifications)[number];

export function Certifications() {
  const sec = useRef<HTMLElement>(null);
  const [preview, setPreview] = useState<Cert | null>(null);
  const loadingComplete = useLoadingComplete();

  /* Load Credly embed script once */
  useEffect(() => {
    if (document.querySelector('script[src*="credly.com"]')) return;
    const script = document.createElement("script");
    script.src = "https://cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* Close modal on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setPreview(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Lock body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = preview ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [preview]);

  useEffect(() => {
    if (!loadingComplete) return;
    const ctx = gsap.context(() => {
      gsap.set([".cert-label", ".cert-title", ".cert-card"], { opacity: 0 });

      const mm = gsap.matchMedia();

      /* ── Header ── */
      const htl = gsap.timeline({
        scrollTrigger: { trigger: ".cert-header", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" },
      });
      htl.fromTo(".cert-label",  { opacity: 0, x: -24 },         { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
         .fromTo(".cert-title",  { opacity: 0, y: 44, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out" }, "-=0.2");

      /* ── Desktop: column-wave ── */
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(".cert-card",
          { opacity: 0, y: 55, scale: 0.88 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.65, ease: "back.out(1.4)",
            scrollTrigger: { trigger: ".cert-grid", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });
      });

      /* ── Mobile: slide up ── */
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(".cert-card",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: ".cert-grid", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });
      });

    }, sec);
    return () => ctx.revert();
  }, [loadingComplete]);

  return (
    <section ref={sec} id="certifications" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="cert-header mb-14">
          <p className="cert-label section-label mb-3" style={{ opacity: 0 }}>Credentials</p>
          <h2 className="cert-title heading-accent font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}>
            Certifications
          </h2>
        </div>

        <div className="cert-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5">
          {certifications.map((cert) => (
            <div key={cert.id}
              className="cert-card opacity-0 group rounded-xl sm:rounded-2xl border flex flex-col relative overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2 cursor-pointer"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
              onClick={() => setPreview(cert)}>

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] z-10" style={{ background: cert.color }} />

              {/* Certificate thumbnail */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Zoom hint overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(0,0,0,0.5)" }}>
                  <ZoomIn size={16} color="#fff" className="sm:hidden" />
                  <ZoomIn size={28} color="#fff" className="hidden sm:block" />
                </div>
              </div>

              {/* Card body - compact on mobile, full on sm+ */}
              <div className="p-2.5 sm:p-5 flex flex-col gap-1.5 sm:gap-3 flex-1">
                <div className="flex-1">
                  <h3 className="text-[10px] sm:text-sm font-semibold leading-snug line-clamp-2 mb-0.5 sm:mb-1" style={{ color: "var(--fg)" }}>
                    {cert.title}
                  </h3>
                  <p className="text-[9px] sm:text-xs" style={{ color: "var(--muted)" }}>
                    {cert.date ? `${cert.issuer} · ${cert.date}` : cert.issuer}
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((s) => (
                    <span key={s} className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full"
                      style={{ background: `${cert.color}18`, color: cert.color }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* External link - desktop only */}
                {cert.credentialUrl !== "#" && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hidden sm:flex items-center gap-1.5 text-xs font-medium mt-1 w-fit transition-opacity hover:opacity-70"
                    style={{ color: cert.color }}>
                    <ExternalLink size={11} /> View credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Credly Badges ── */}
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--muted)" }}>
            Badges
          </p>
          <div className="flex flex-wrap gap-6 items-start">
            {/* Credly badge */}
            <div
              data-iframe-width="150"
              data-iframe-height="270"
              data-share-badge-id="24e4cb5d-c629-467f-b918-da1b04948219"
              data-share-badge-host="https://www.credly.com"
            />

            {/* LeetCode 50 Days 2026 */}
            <div style={{ position: "relative", width: 150, height: 270, flexShrink: 0, overflow: "hidden", borderRadius: 8, display: "block" }}>
              <Image
                src="/images/badges/Leetcode_50_days_2026_badge.png"
                alt="LeetCode 50 Days Badge 2026"
                fill
                sizes="150px"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>

            {/* LeetCode 100 Days 2026 */}
            <div style={{ position: "relative", width: 150, height: 270, flexShrink: 0, overflow: "hidden", borderRadius: 8, display: "block" }}>
              <Image
                src="/images/badges/Leetcode_100_days_2026_badge.png"
                alt="LeetCode 100 Days Badge 2026"
                fill
                sizes="150px"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox modal ── */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
          onClick={() => setPreview(null)}>

          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>

            {/* Modal header */}
            <div className="flex items-start justify-between gap-4 px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{preview.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{preview.date ? `${preview.issuer} · ${preview.date}` : preview.issuer}</p>
              </div>
              <button onClick={() => setPreview(null)} className="shrink-0 p-1 rounded-lg transition-colors hover:opacity-60"
                style={{ color: "var(--muted)" }}>
                <X size={18} />
              </button>
            </div>

            {/* Full certificate image */}
            <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
              <Image
                src={preview.image}
                alt={preview.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain p-2"
              />
            </div>

            {/* Modal footer */}
            {preview.credentialUrl !== "#" && (
              <div className="px-5 py-3 border-t flex justify-end" style={{ borderColor: "var(--border)" }}>
                <a href={preview.credentialUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: preview.color }}>
                  <ExternalLink size={12} /> View credential
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
