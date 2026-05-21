import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────
   CSS variables expected in your global styles:
   --bg-primary       : page background colour
   --accent-from      : gradient start  (e.g. #6366f1)
   --accent-to        : gradient end    (e.g. #a855f7)
   --text-primary     : main text colour
   --text-muted       : subtitle colour
   ───────────────────────────────────────────── */

const styles = {
  screen: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "var(--bg-primary)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    overflow: "hidden",
  },
  line: {
    width: "6rem",          /* w-24 */
    height: "2px",
    background: "linear-gradient(90deg, var(--accent-from), var(--accent-to))",
    transformOrigin: "left center",
    marginBottom: "1.25rem",
  },
  name: {
    margin: 0,
    fontSize: "clamp(2.5rem, 6vw, 3.75rem)", /* ~text-5xl */
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    color: "var(--text-primary)",
    opacity: 0,
  },
  accent: {
    background: "linear-gradient(135deg, var(--accent-from), var(--accent-to))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    margin: 0,
    fontSize: "0.7rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: "var(--text-muted)",
    opacity: 0,
  },
};

export default function LoadingScreen({ name = "Bipin Chaudhary", role = "Creative Developer", onComplete }) {
  const screenRef  = useRef(null);
  const lineRef    = useRef(null);
  const nameRef    = useRef(null);
  const subtitleRef = useRef(null);

  /* Split name: first word gets accent gradient, rest stays in --text-primary */
  const words     = name.trim().split(/\s+/);
  const firstWord = words[0];
  const rest      = words.slice(1).join(" ");

  useEffect(() => {
    /* Lock scroll */
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prevOverflow || "";
          onComplete?.();
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

      /* 5. Entire screen exits upward */
      .to(screenRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }, screenRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow || "";
    };
  }, [onComplete]);

  return (
    <div ref={screenRef} style={styles.screen} aria-hidden="true">
      {/* Accent line */}
      <div ref={lineRef} style={styles.line} />

      {/* Name */}
      <h1 ref={nameRef} style={styles.name}>
        <span style={styles.accent}>{firstWord}</span>
        {rest && <> {rest}</>}
      </h1>

      {/* Role / subtitle */}
      <p ref={subtitleRef} style={styles.subtitle}>
        {role}
      </p>
    </div>
  );
}
