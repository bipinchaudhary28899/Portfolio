"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import type { SVGProps } from "react";
import { codingPlatforms } from "@/data/portfolio";
import { GithubIcon, LeetCodeIcon, HackerRankIcon } from "@/components/ui/icons";
import { useLoadingComplete } from "@/context/LoadingContext";
import { useLeetCodeSolved } from "@/hooks/useLeetCodeSolved";

gsap.registerPlugin(ScrollTrigger);

/* Map each platform to its brand icon. */
const PLATFORM_ICONS: Record<string, (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  LeetCode: LeetCodeIcon,
  HackerRank: HackerRankIcon,
  GitHub: GithubIcon,
};

/* Split a stat like "350+", "5★", "20+" into its animatable number and the
   surrounding text so we can count 0 → number while keeping the suffix. */
function parseStat(stat: string) {
  const m = stat.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { prefix: "", target: 0, suffix: stat, decimals: 0 };
  const [, prefix, numStr, suffix] = m;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, target: parseFloat(numStr), suffix, decimals };
}

export function CodingPlatforms() {
  const sec = useRef<HTMLElement>(null);
  const counted = useRef<Set<Element>>(new Set());
  const loadingComplete = useLoadingComplete();
  const { data: lcData } = useLeetCodeSolved();

  // Merge live LeetCode stat into the platforms list (falls back to static data)
  const platforms = codingPlatforms.map((p) =>
    p.name === "LeetCode" && lcData
      ? { ...p, stat: lcData.stat, badge: `${lcData.stat} Solved` }
      : p
  );

  useEffect(() => {
    if (!loadingComplete) return;
    const ctx = gsap.context(() => {
      const mobile = () => window.innerWidth < 768;
      const startFor = () => (mobile() ? "top 75%" : "top bottom");

      gsap.set([".cp-label", ".cp-title", ".cp-card", ".cp-stat"], { opacity: 0 });

      /* ── Header ── */
      const htl = gsap.timeline({
        scrollTrigger: { trigger: ".cp-header", start: () => (mobile() ? "top 80%" : "top bottom"), toggleActions: "play none none none" },
      });
      htl.fromTo(".cp-label",  { opacity: 0, x: -24 },         { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
         .fromTo(".cp-title",  { opacity: 0, y: 44, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out" }, "-=0.2");

      /* ── Cards rise + scale in (only the grid variant that is actually visible) ── */
      gsap.utils.toArray<HTMLElement>(".cp-grid").forEach((grid) => {
        // The desktop and mobile grids both live in the DOM at once (one is
        // display:none). Animate only the visible one, so the count-up that the
        // user actually sees runs a single time.
        if (grid.offsetParent === null) return;

        const cards = grid.querySelectorAll(".cp-card");
        gsap.fromTo(cards,
          { opacity: 0, y: 55, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: grid, start: startFor, toggleActions: "play none none none" } });

        /* ── Count-up: each big number counts from 0 → its target, once ── */
        const stats = grid.querySelectorAll<HTMLElement>(".cp-stat");
        ScrollTrigger.create({
          trigger: grid,
          start: startFor,
          once: true,
          onEnter: () => {
            stats.forEach((el, i) => {
              const target   = parseFloat(el.dataset.target || "0");
              const prefix   = el.dataset.prefix || "";
              const suffix   = el.dataset.suffix || "";
              const decimals = parseInt(el.dataset.decimals || "0", 10);

              // Guard against a second run (e.g. React StrictMode re-invoking the
              // effect in dev): if this number already counted up, just show its
              // final value instead of replaying the animation.
              if (counted.current.has(el)) {
                el.style.opacity = "1";
                el.textContent = prefix + target.toFixed(decimals) + suffix;
                return;
              }
              counted.current.add(el);

              const counter = { v: 0 };
              gsap.to(el, { opacity: 1, duration: 0.4, delay: 0.35 + i * 0.12 });
              gsap.to(counter, {
                v: target,
                duration: 1.4,
                delay: 0.35 + i * 0.12,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = prefix + counter.v.toFixed(decimals) + suffix;
                },
                onComplete: () => {
                  el.textContent = prefix + target.toFixed(decimals) + suffix;
                },
              });
            });
          },
        });
      });
    }, sec);
    return () => ctx.revert();
  }, [loadingComplete]);

  return (
    <section ref={sec} id="coding" className="pt-12 sm:pt-[4.5rem] pb-24 sm:pb-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="cp-header mb-10 sm:mb-14 flex flex-col items-center gap-2 text-center">
          <p className="cp-label section-label" style={{ opacity: 0 }}>Competitive</p>
          <h2 className="cp-title font-black tracking-tight"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", lineHeight: 1.1, opacity: 0 }}>
            Coding Platforms
          </h2>
          <p className="mt-2 text-sm md:text-base leading-relaxed mx-auto" style={{ color: "var(--fg-dim)", maxWidth: "44rem" }}>
            Sharpening algorithms and problem-solving through competitive programming across platforms.
          </p>
        </div>

        {/* ── Desktop / tablet: full cards ── */}
        <div className="cp-grid hidden sm:grid sm:grid-cols-3 gap-6">
          {platforms.map((p) => {
            const { prefix, target, suffix, decimals } = parseStat(p.stat);
            const Icon = PLATFORM_ICONS[p.name];
            return (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                className="cp-card opacity-0 group rounded-2xl border p-8 flex flex-col gap-5 relative overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                style={{ background: "var(--card)", borderColor: "var(--border)", textDecoration: "none" }}>

                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: p.color, opacity: 0.6 }} />

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                    {Icon && <Icon width={18} height={18} style={{ color: p.color }} />}
                    {p.name}
                  </span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "var(--muted)" }} />
                </div>

                <div>
                  <span className="cp-stat block font-black tracking-tight leading-none"
                    data-target={target} data-prefix={prefix} data-suffix={suffix} data-decimals={decimals}
                    style={{ fontSize: "clamp(3rem,6vw,5rem)", color: p.color, opacity: 0 }}>
                    {prefix}0{suffix}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--fg-dim)" }}>
                    {p.statLabel}
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.description}</p>

                <span className="self-start text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: `${p.color}22`, color: p.color }}>
                  {p.badge}
                </span>
              </a>
            );
          })}
        </div>

        {/* ── Mobile: compact cards ── */}
        <div className="cp-grid grid grid-cols-1 gap-3 sm:hidden">
          {platforms.map((p) => {
            const { prefix, target, suffix, decimals } = parseStat(p.stat);
            const Icon = PLATFORM_ICONS[p.name];
            return (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                className="cp-card opacity-0 group relative flex items-center gap-4 rounded-xl border p-4 overflow-hidden"
                style={{ background: "var(--card)", borderColor: "var(--border)", textDecoration: "none" }}>

                {/* Left accent bar */}
                <span className="absolute top-0 left-0 bottom-0 w-1" style={{ background: p.color, opacity: 0.7 }} />

                {/* Animated number */}
                <div className="flex flex-col items-start flex-shrink-0 pl-1.5" style={{ minWidth: 64 }}>
                  <span className="cp-stat font-black tracking-tight leading-none"
                    data-target={target} data-prefix={prefix} data-suffix={suffix} data-decimals={decimals}
                    style={{ fontSize: "clamp(1.7rem,9vw,2.2rem)", color: p.color, opacity: 0 }}>
                    {prefix}0{suffix}
                  </span>
                  <span className="text-[0.65rem] font-medium mt-1" style={{ color: "var(--fg-dim)" }}>
                    {p.statLabel}
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest truncate" style={{ color: "var(--fg)" }}>
                      {Icon && <Icon width={15} height={15} className="flex-shrink-0" style={{ color: p.color }} />}
                      {p.name}
                    </span>
                    <ArrowUpRight size={15} className="flex-shrink-0" style={{ color: "var(--muted)" }} />
                  </div>
                  <span className="self-start text-[0.65rem] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${p.color}22`, color: p.color }}>
                    {p.badge}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
