"use client";

/* ═══════════════════════════════════════════════════════════════
   Gita Ticker — full-width, infinitely scrolling shloka strip
   ---------------------------------------------------------------
   A single content unit is authored once; the component measures it
   and renders just enough copies to fill the viewport, then animates
   the track left by exactly one unit width. Because every unit is
   identical and evenly spaced, the loop is seamless (no jumps/gaps).
   Pauses on hover and respects prefers-reduced-motion.

   The gold-on-dark-brown palette is intentionally fixed (independent
   of the site theme) so it reads as an ornamental scripture band.
═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import { Noto_Serif_Devanagari } from "next/font/google";

// Devanagari + Latin glyphs for both the shloka and its translation.
const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SHLOKA =
  "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥";
const TRANSLATION =
  "“You have the right to perform your actions, but never to the fruits thereof. Let not the fruits of action be your motive, nor let attachment be to inaction.”";

const SPEED = 55; // px per second — constant scroll speed regardless of width

/** One repeated unit: shloka ✦ translation + source badge. */
function Unit({
  innerRef,
  ariaHidden,
}: {
  innerRef?: React.Ref<HTMLDivElement>;
  ariaHidden?: boolean;
}) {
  return (
    <div
      ref={innerRef}
      aria-hidden={ariaHidden}
      className="gita-unit"
      style={{
        display: "flex",
        alignItems: "center",
        flex: "0 0 auto",
        whiteSpace: "nowrap",
      }}
    >
      <span
        className={`${devanagari.className} gita-shloka`}
        lang="sa"
        style={{ fontWeight: 500, color: "#f5c46a", letterSpacing: "0.01em" }}
      >
        {SHLOKA}
      </span>
      <span aria-hidden className="gita-divider" style={{ color: "#f5c46a", opacity: 0.55 }}>
        ✦
      </span>
      <span
        className={`${devanagari.className} gita-translation`}
        style={{ fontStyle: "italic", color: "#c49a5a" }}
      >
        {TRANSLATION}
      </span>
      {/* Trailing divider → sits between the translation and the next shloka */}
      <span aria-hidden className="gita-divider" style={{ color: "#f5c46a", opacity: 0.55 }}>
        ✦
      </span>
    </div>
  );
}

export function GitaTicker() {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const measure = () => {
      const strip = stripRef.current;
      const unit = unitRef.current;
      const track = trackRef.current;
      if (!strip || !unit || !track) return;

      // Sub-pixel width avoids the rounding drift that caused the hitch.
      const unitW = unit.getBoundingClientRect().width;
      if (!unitW) return;

      // One "half" must be at least the viewport wide (+1 tile buffer) so the
      // -50% loop never reveals a gap. Render an EVEN number of tiles so the
      // -50% point falls exactly on a tile boundary.
      const perHalf = Math.max(1, Math.ceil(strip.offsetWidth / unitW) + 1);
      const needed = perHalf * 2;
      setCopies((prev) => (prev !== needed ? needed : prev));

      // The track travels half its width per loop, at a constant speed.
      track.style.setProperty("--gita-duration", `${(perHalf * unitW) / SPEED}s`);
    };

    measure();

    // Re-measure once the web font loads (text width changes) and on resize.
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(measure, 200);
    };
    window.addEventListener("resize", onResize);
    const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
    fonts?.ready?.then(measure).catch(() => {});

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={stripRef}
      className="gita-strip"
      role="marquee"
      aria-label="Bhagavad Gita, Chapter 2, Verse 47"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "5px 0",
        background: "var(--bg-alt)",
        boxSizing: "border-box",
        // Vertically center the scrolling track within the strip
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Keyframes + hover-pause + soft fade edges + reduced-motion */}
      <style>{`
        @keyframes gitaScroll {
          from { transform: translate3d(0, 0, 0); }
          /* -50% of the REAL (sub-pixel) track width. The track is an even
             number of identical tiles, so 50% lands exactly on a tile
             boundary → the loop is perfectly seamless, no rounding hitch. */
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .gita-strip .gita-track {
          display: flex;
          width: max-content;
          will-change: transform;
          backface-visibility: hidden;
          animation: gitaScroll var(--gita-duration, 30s) linear infinite;
        }
        .gita-strip:hover .gita-track { animation-play-state: paused; }
        .gita-strip::before,
        .gita-strip::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: 90px;
          z-index: 2;
          pointer-events: none;
        }
        .gita-strip::before { left: 0;  background: linear-gradient(to right, var(--bg-alt) 0%, transparent 100%); }
        .gita-strip::after  { right: 0; background: linear-gradient(to left,  var(--bg-alt) 0%, transparent 100%); }
        @media (prefers-reduced-motion: reduce) {
          .gita-strip .gita-track { animation: none; }
        }

        /* Spacing + type sizes (desktop) */
        .gita-strip .gita-unit        { gap: 1.5rem; padding-right: 1.5rem; }
        .gita-strip .gita-shloka      { font-size: 1.05rem; }
        .gita-strip .gita-translation { font-size: 0.92rem; }
        .gita-strip .gita-divider     { font-size: 0.85rem; }

        /* Mobile: smaller text + tighter spacing so more of the verse shows */
        @media (max-width: 640px) {
          .gita-strip .gita-unit        { gap: 0.9rem; padding-right: 0.9rem; }
          .gita-strip .gita-shloka      { font-size: 0.78rem; }
          .gita-strip .gita-translation { font-size: 0.7rem; }
          .gita-strip .gita-divider     { font-size: 0.62rem; }
        }
      `}</style>

      <div ref={trackRef} className="gita-track">
        {Array.from({ length: copies }).map((_, i) => (
          <Unit
            key={i}
            innerRef={i === 0 ? unitRef : undefined}
            ariaHidden={i !== 0}
          />
        ))}
      </div>
    </div>
  );
}
