"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FreelanceBanner() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: () => window.innerWidth < 768 ? "top 60%" : "top bottom",
          toggleActions: "play none none none",
        },
      });

      // 1. Wrapper slides up + fades in
      tl.fromTo(
        wrapRef.current,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0
      );

      // 2. Image does a curtain-reveal via clipPath + subtle zoom-out
      tl.fromTo(
        imgRef.current,
        {
          clipPath: "inset(100% 0% 0% 0% round 16px)",
          scale: 1.06,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
        },
        0.15   // slight offset so wrapper leads
      );

      // 3. Accent line under banner grows left→right
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power2.out" },
        0.6
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ background: "var(--bg)" }}
      className="px-5 sm:px-10 pt-20 opacity-0"
    >
      <div className="max-w-6xl mx-auto">
        {/* Image container */}
        <div
          ref={imgRef}
          className="rounded-2xl overflow-hidden border"
          style={{
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <Image
            src="/images/freelance.png"
            alt="Full Stack Web App — React, Angular, Node.js, AWS"
            width={1200}
            height={630}
            className="w-full h-auto block"
            priority
          />
        </div>

        {/* Animated accent line */}
        <div
          ref={lineRef}
          className="mt-4 h-0.5 rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--grad-a), var(--grad-b), transparent)",
            transformOrigin: "left center",
          }}
        />
      </div>
    </div>
  );
}
