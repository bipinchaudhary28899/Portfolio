"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  name?: string;
  role?: string;
  onComplete: () => void;
}

export default function LoadingScreen({
  name = "Bipin Chaudhary",
  role = "Full Stack Engineer",
  onComplete,
}: LoadingScreenProps) {
  const screenRef   = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const words     = name.trim().split(/\s+/);
  const firstWord = words[0];
  const rest      = words.slice(1).join(" ");

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prevOverflow ?? "";
          onComplete();
        },
      });

      /* 1. Line scales in from left */
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "expo.inOut" }
      )

      /* 2. Name fades + slides up — slight overlap */
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )

      /* 3. Subtitle fades + slides up */
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      )

      /* 4. Hold */
      .to({}, { duration: 0.6 })

      /* 5. Screen exits upward */
      .to(screenRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }, screenRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow ?? "";
    };
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        /* sits above the z-9999 film-grain overlay in globals.css */
        zIndex: 10000,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        overflow: "hidden",
      }}
    >
      {/* Accent line — uses project gradient vars */}
      <div
        ref={lineRef}
        style={{
          width: "6rem",
          height: "2px",
          background: "linear-gradient(90deg, var(--grad-a), var(--grad-b))",
          transformOrigin: "left center",
          marginBottom: "1.25rem",
        }}
      />

      {/* Name — first word in gradient, rest in --fg */}
      <h1
        ref={nameRef}
        style={{
          margin: 0,
          fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--fg)",
          opacity: 0,
        }}
      >
        <span className="gradient-text">{firstWord}</span>
        {rest && <> {rest}</>}
      </h1>

      {/* Role / subtitle */}
      <p
        ref={subtitleRef}
        style={{
          margin: 0,
          fontSize: "0.68rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "var(--muted)",
          opacity: 0,
        }}
      >
        {role}
      </p>
    </div>
  );
}
