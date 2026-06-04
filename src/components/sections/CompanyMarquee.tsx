"use client";

/* ═══════════════════════════════════════════════════════════════
   CompanyMarquee — smooth, always-in-motion strip of company
   logos for the firms/teams Bipin has worked with. The track is
   rendered twice and translated -50% so the loop is seamless.
   Pauses on hover, respects prefers-reduced-motion.
═══════════════════════════════════════════════════════════════ */

import Image from "next/image";
import { companyLogos } from "@/data/portfolio";

export function CompanyMarquee() {
  const loop = [...companyLogos, ...companyLogos];

  return (
    <section
      id="companies"
      className="py-10 sm:py-12 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt, var(--bg))" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Heading ── */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="section-label mb-2">Track record</p>
          <h2
            className="font-black tracking-tight leading-tight"
            style={{ fontSize: "clamp(1.7rem,3.6vw,3rem)", color: "var(--fg)" }}
          >
            Proud to have built alongside great teams
          </h2>
          <p
            className="mt-3 text-sm sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            Companies and teams I&apos;ve been part of along the way.
          </p>
        </div>

        {/* ── Moving logo strip ── */}
        <div
          className="cm-viewport"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
          }}
        >
          <div className="cm-track">
            {loop.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="cm-item group"
                title={c.name}
              >
                <Image
                  src={c.src}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 5rem, 12rem"
                  className="object-contain cm-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cm-viewport { overflow: hidden; width: 100%; padding: 1rem 0; }
        .cm-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: 1.25rem;
          animation: cm-scroll 32s linear infinite;
        }
        .cm-viewport:hover .cm-track { animation-play-state: paused; }
        .cm-item {
          position: relative;
          flex: 0 0 auto;
          width: 5rem;
          height: 2.4rem;
          opacity: 1;
          transition: opacity .3s ease, transform .3s ease;
        }
        /* Touch devices have no hover, so logos stay full-colour by default. */
        .cm-logo {
          filter: grayscale(0);
          transition: filter .3s ease;
          padding: 0.35rem;
        }
        @media (min-width: 640px) {
          .cm-track { gap: 4rem; }
          .cm-item { width: 12rem; height: 3.75rem; }
          .cm-logo { padding: 0.5rem; }
        }
        /* Grayscale-with-hover reveal only on true mouse devices.
           Requiring pointer: fine (not just hover: hover) keeps logos
           full-colour on Android/touch, which can mis-report hover. */
        @media (hover: hover) and (pointer: fine) {
          .cm-item { opacity: 0.55; }
          .cm-logo { filter: grayscale(1); }
          .cm-item:hover { opacity: 1; transform: translateY(-2px); }
          .cm-item:hover .cm-logo { filter: grayscale(0); }
        }
        @keyframes cm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cm-track { animation: none; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
