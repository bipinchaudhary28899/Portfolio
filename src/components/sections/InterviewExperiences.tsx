"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { interviewExperiences, type InterviewExperience } from "@/data/portfolio";
import { useLoadingComplete } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/* ── Result label (plain text) ────────────────────────────────────────────── */
function resultLabel(result: InterviewExperience["result"]) {
  const map = {
    selected:          "Selected",
    rejected:          "Did not proceed",
    "internal-policy": "Did not proceed — internal re-interview policy",
  };
  return map[result];
}

/* ── Round type pill ──────────────────────────────────────────────────────── */
function RoundTypePill({ type }: { type: "oa" | "onsite" | "virtual" }) {
  const map = {
    oa:      { label: "OA",      color: "var(--accent)" },
    onsite:  { label: "Onsite",  color: "#a78bfa" },
    virtual: { label: "Virtual", color: "#60a5fa" },
  };
  const { label, color } = map[type];
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ color, background: `${color}18`, border: `1px solid ${color}33` }}
    >
      {label}
    </span>
  );
}

/* ── Single interview card ─────────────────────────────────────────────────── */
function InterviewCard({ exp, animated = true }: { exp: InterviewExperience; animated?: boolean }) {
  const [logoError, setLogoError] = useState(false);

  return (
    <div
      className={`iv-card rounded-2xl border overflow-hidden ${animated ? "opacity-0" : ""}`}
      style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)" }}
    >
      {/* ── Header ── */}
      <div
        className="px-6 pt-6 pb-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border overflow-hidden"
            style={{ background: "#fff", borderColor: "var(--border)" }}
          >
            {/* Letter badge always visible underneath — image layers on top when it loads */}
            <span className="absolute text-base font-black" style={{ color: exp.brandColor }}>
              {exp.company[0]}
            </span>
            {!logoError && (
              <Image
                src={exp.logoUrl}
                alt={`${exp.company} logo`}
                width={36}
                height={36}
                unoptimized
                className="object-contain relative"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <div>
            <h3 className="font-black text-base leading-tight" style={{ color: "var(--fg)" }}>
              {exp.company}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {exp.role} · {exp.appliedDate} · {resultLabel(exp.result)}
            </p>
          </div>
        </div>

        {/* Top accent bar */}
        <div
          className="h-0.5 rounded-full mb-4"
          style={{ background: `linear-gradient(90deg, ${exp.brandColor}, transparent)`, opacity: 0.6 }}
        />

        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
          {exp.summary}
        </p>
      </div>

      {/* ── Rounds ── */}
      <div className="flex flex-col divide-y" style={{ borderColor: "var(--border)" }}>
        {exp.rounds.map((round, i) => (
          <div key={i} className="px-6 py-5 flex flex-col gap-4">
            {/* Round header */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <RoundTypePill type={round.type} />
              <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{round.label}</span>
              {round.date && (
                <span className="text-xs" style={{ color: "var(--muted)" }}>· {round.date}</span>
              )}
            </div>

            {round.dsa.length > 0 && (
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>DSA</p>
                <ul className="flex flex-col gap-1.5">
                  {round.dsa.map((q, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />{q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {round.concepts && round.concepts.length > 0 && (
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#a78bfa" }}>Concepts</p>
                <ul className="flex flex-col gap-1.5">
                  {round.concepts.map((c, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#a78bfa" }} />{c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {round.behavioral.length > 0 && (
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#60a5fa" }}>Behavioral / LP</p>
                <ul className="flex flex-col gap-1.5">
                  {round.behavioral.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#60a5fa" }} />{b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {round.notes && (
              <p className="text-xs leading-relaxed italic px-3 py-2 rounded-lg"
                style={{ color: "var(--muted)", background: "color-mix(in srgb, var(--border) 40%, transparent)" }}>
                {round.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ── Key takeaways ── */}
      <div className="px-6 py-5" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>Key Takeaways</p>
        <ul className="flex flex-col gap-2">
          {exp.keyTakeaways.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.brandColor }} />{t}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Personal note ── */}
      {exp.personalNote && (
        <div className="px-6 pb-6" style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>Personal Reflection</p>
          <p className="text-xs leading-relaxed italic" style={{ color: "var(--fg-dim)" }}>
            &ldquo;{exp.personalNote}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export function InterviewExperiences({ preview = false }: { preview?: boolean }) {
  const sec = useRef<HTMLElement>(null);
  const loadingComplete = useLoadingComplete();
  const [activeCompany, setActiveCompany] = useState<string>("All");
  const [sortOrder, setSortOrder]         = useState<"newest" | "oldest">("newest");

  const companies = ["All", ...[...new Set(interviewExperiences.map((e) => e.company))]];

  const filtered = interviewExperiences
    .filter((e) => activeCompany === "All" || e.company === activeCompany)
    .sort((a, b) => {
      const parse = (d: string) => new Date(d).getTime();
      return sortOrder === "newest"
        ? parse(b.resultDate) - parse(a.resultDate)
        : parse(a.resultDate) - parse(b.resultDate);
    });

  useEffect(() => {
    if (!loadingComplete) return;
    const ctx = gsap.context(() => {
      const mobile = () => window.innerWidth < 768;
      const start  = () => (mobile() ? "top 78%" : "top 72%");

      gsap.fromTo(".iv-label",
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: ".iv-header", start, toggleActions: "play none none none" } });

      gsap.fromTo(".iv-title",
        { opacity: 0, y: 44, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out",
          scrollTrigger: { trigger: ".iv-header", start, toggleActions: "play none none none" },
          delay: 0.1 });

      gsap.utils.toArray<HTMLElement>(".iv-card").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } });
      });
    }, sec);
    return () => ctx.revert();
  }, [loadingComplete]);

  return (
    <section ref={sec} id="interviews" className="pt-10 pb-24 sm:pt-14 sm:pb-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="iv-header mb-10 sm:mb-14">
          <p className="iv-label section-label mb-2" style={{ opacity: 0 }}>Journey</p>
          <h2
            className="iv-title heading-accent font-black tracking-tight"
            style={{ fontSize: "clamp(1.8rem,8vw,5rem)", color: "var(--fg)", lineHeight: 1.1, opacity: 0 }}
          >
            Interview Experiences
          </h2>
          <p className="mt-3 text-sm max-w-xl" style={{ color: "var(--fg-dim)" }}>
            Real rounds, honest reflections, and lessons from the interview trail — shared to help others prepare.
          </p>
        </div>

        {preview ? (
          <p className="text-sm" style={{ color: "var(--fg-dim)" }}>
            Documenting my interview journey — rounds, questions, and honest reflections.{" "}
            <Link href="/interviews" className="font-semibold underline underline-offset-4 transition-colors hover:text-[var(--accent)]" style={{ color: "var(--fg)" }}>
              Read all interview experiences →
            </Link>
          </p>
        ) : (
          <>
            {/* ── Filter + sort controls ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
              {/* Company filter pills */}
              <div className="flex flex-wrap gap-2">
                {companies.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCompany(c)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all"
                    style={{
                      borderColor:  activeCompany === c ? "var(--accent)" : "var(--border)",
                      color:        activeCompany === c ? "var(--accent)" : "var(--muted)",
                      background:   activeCompany === c ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Sort toggle */}
              <button
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                {sortOrder === "newest" ? "↓ Newest first" : "↑ Oldest first"}
              </button>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {filtered.length > 0 ? filtered.map((exp) => (
              <InterviewCard key={exp.id} exp={exp} animated={false} />
            )) : (
              <p className="text-sm col-span-2" style={{ color: "var(--muted)" }}>No experiences found.</p>
            )}
          </div>
          </>
        )}
      </div>
    </section>
  );
}
