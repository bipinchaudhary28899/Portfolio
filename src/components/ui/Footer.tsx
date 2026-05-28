"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Copyright line fades up ── */
      gsap.fromTo(".footer-copy",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 98%", toggleActions: "play none none none" } });

      /* ── Social icons + email pop in from right with stagger ── */
      gsap.fromTo(".footer-link",
        { opacity: 0, x: 20, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, stagger: 0.09, duration: 0.5, ease: "back.out(1.5)",
          scrollTrigger: { trigger: footerRef.current, start: "top 98%", toggleActions: "play none none none" },
          delay: 0.15 });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t py-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <p className="footer-copy text-sm" style={{ color: "var(--muted)", opacity: 0 }}>
        © {new Date().getFullYear()} Bipin Kumar Chaudhary - Built with Next.js &amp; GSAP
      </p>
      <div className="flex items-center gap-5">
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          className="footer-link transition-colors hover:text-white" style={{ color: "var(--muted)", opacity: 0 }}>
          <GithubIcon width={18} height={18} />
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className="footer-link transition-colors hover:text-white" style={{ color: "var(--muted)", opacity: 0 }}>
          <LinkedinIcon width={18} height={18} />
        </a>
        <a href={`mailto:${personalInfo.email}`}
          className="footer-link text-sm font-medium transition-colors hover:text-white"
          style={{ color: "var(--accent)", opacity: 0 }}>
          {personalInfo.email}
        </a>
      </div>
    </footer>
  );
}
