"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plane } from "lucide-react";
import { experiences } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

/* ── Experience card ─────────────────────────────────────────────────────── */
function ExpCard({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Top accent */}
      <div className="h-0.5" style={{ background: "linear-gradient(90deg,var(--grad-a),var(--grad-b))" }} />
      <div className="p-5 sm:p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="section-label">{exp.company}</p>
          <h3 className="text-lg sm:text-xl font-bold leading-snug" style={{ color: "var(--fg)" }}>
            {exp.role}
          </h3>
          <span
            className="self-start text-xs px-3 py-1 rounded-full font-semibold"
            style={{ background: "rgba(255,101,53,.1)", color: "var(--accent)" }}
          >
            {exp.period}
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
          {exp.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--bg)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export function Experience() {
  const sectionRef      = useRef<HTMLElement>(null);
  const planeRef        = useRef<HTMLDivElement>(null);
  const mobilePlaneRef  = useRef<HTMLDivElement>(null);
  const mobileHd        = useRef<HTMLDivElement>(null);
  const mobileCards     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ── Scroll-direction rotation — works on ALL screen sizes ── */
    const planes = () => [planeRef.current, mobilePlaneRef.current].filter(Boolean) as HTMLDivElement[];
    gsap.set(planes(), { rotation: -42 });

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY;
      lastY = y;
      gsap.to(planes(), { rotation: down ? 138 : -42, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const mm = gsap.matchMedia();

    /* ── Desktop ── */
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {

        /* Plane pulse */
        gsap.to(planeRef.current, { scale: 1.1, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });

        /* Cards slide in from their side */
        gsap.utils.toArray<HTMLElement>(".exp-card-desktop").forEach((card, i) => {
          const fromLeft = i % 2 === 0;
          gsap.fromTo(
            card,
            { opacity: 0, x: fromLeft ? -60 : 60 },
            { opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 78%", toggleActions: "play none none none" } },
          );
        });

        /* Center dots pop in */
        gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
          gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)",
              scrollTrigger: { trigger: dot, start: "top 78%", toggleActions: "play none none none" } },
          );
        });

        /* Horizontal connectors draw toward center */
        gsap.utils.toArray<HTMLElement>(".timeline-connector").forEach((line, i) => {
          const fromRight = i % 2 === 0;
          gsap.fromTo(line,
            { scaleX: 0, transformOrigin: fromRight ? "right center" : "left center" },
            { scaleX: 1, duration: 0.45, ease: "power2.out",
              scrollTrigger: { trigger: line, start: "top 78%", toggleActions: "play none none none" } },
          );
        });

      }, sectionRef);
      return () => ctx.revert();
    });

    /* ── Mobile ── */
    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        /* Mobile plane pulse */
        gsap.to(mobilePlaneRef.current, { scale: 1.15, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });

        gsap.fromTo(mobileHd.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: mobileHd.current, start: "top 85%", toggleActions: "play none none none" } });
        gsap.fromTo(
          mobileCards.current?.querySelectorAll(".exp-mobile-card") ?? [],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: mobileCards.current, start: "top 85%", toggleActions: "play none none none" } },
        );
      });
      return () => ctx.revert();
    });

    return () => {
      mm.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div id="experience" style={{ overflowX: "clip" }}>

      {/* ══ DESKTOP ══════════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="hidden md:block py-28 px-6 sm:px-12 lg:px-20"
        style={{ background: "var(--bg-alt)" }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-28">
            <p className="section-label mb-3">Career</p>
            <h2
              className="font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(2.4rem,5vw,5rem)", color: "var(--fg)" }}
            >
              Work Experience
            </h2>
          </div>

          {/* Timeline container */}
          <div className="relative" style={{ paddingBottom: "2rem" }}>

            {/* ── Background (static) line ── */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%", top: 0, bottom: 0,
                width: 2,
                transform: "translateX(-50%)",
                background: "var(--border)",
              }}
            />

            {/* ── Sticky airplane ─────────────────────────────────────────── */}
            {/*
                height: 0  →  takes no vertical space in flow
                position: sticky; top: 50vh  →  stays centered in viewport
                overflow: visible  →  children still render outside zero-height box
            */}
            <div
              style={{
                position: "sticky",
                top: "calc(50vh - 26px)",
                height: 0,
                zIndex: 30,
                overflow: "visible",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                {/* Plane icon — orange, no background circle */}
                <div ref={planeRef} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Plane size={28} color="var(--accent)" style={{ filter: "drop-shadow(0 0 8px rgba(255,101,53,.7))" }} />
                </div>
              </div>
            </div>

            {/* ── Experience entries ─────────────────────────────────────── */}
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className="relative flex items-center"
                  style={{ marginBottom: i < experiences.length - 1 ? "9rem" : "3rem", minHeight: 160 }}
                >
                  {/* ─ Left card ─ */}
                  {isLeft ? (
                    <div
                      className="exp-card-desktop"
                      style={{ width: "calc(50% - 2.5rem)", paddingRight: "1.5rem" }}
                    >
                      <ExpCard exp={exp} />
                    </div>
                  ) : (
                    <div style={{ width: "calc(50% - 2.5rem)" }} />
                  )}

                  {/* ─ Horizontal connector ─ */}
                  <div
                    className="timeline-connector absolute h-px"
                    style={{
                      width: "2.5rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      ...(isLeft
                        ? { right: "calc(50% - 1px)" }
                        : { left:  "calc(50% - 1px)" }),
                      background: "linear-gradient(90deg,var(--grad-a),var(--grad-b))",
                    }}
                  />

                  {/* ─ Center dot ─ */}
                  <div
                    className="timeline-dot absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%,-50%)",
                      zIndex: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))",
                        border: "3px solid var(--bg-alt)",
                        boxShadow: "0 0 12px rgba(255,101,53,.5)",
                      }}
                    />
                  </div>

                  {/* ─ Right card ─ */}
                  {!isLeft ? (
                    <div
                      className="exp-card-desktop"
                      style={{ width: "calc(50% - 2.5rem)", marginLeft: "auto", paddingLeft: "1.5rem" }}
                    >
                      <ExpCard exp={exp} />
                    </div>
                  ) : (
                    <div style={{ width: "calc(50% - 2.5rem)", marginLeft: "auto" }} />
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ══ MOBILE ═══════════════════════════════════════════════════════════ */}
      <section className="block md:hidden py-20 px-5" style={{ background: "var(--bg-alt)", overflowX: "clip" }}>
        {/* Left-side mini timeline line */}
        <div ref={mobileHd} className="mb-10 opacity-0">
          <p className="section-label mb-2">Career</p>
          <h2 className="text-3xl font-bold" style={{ color: "var(--fg)" }}>Work Experience</h2>
        </div>

        <div ref={mobileCards} className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div
            className="absolute"
            style={{ left: 19, top: 0, bottom: 0, width: 2, background: "var(--border)" }}
          />

          {/* Sticky traveling plane */}
          <div style={{ position: "sticky", top: "calc(50vh - 12px)", height: 0, zIndex: 30, overflow: "visible" }}>
            <div style={{ position: "absolute", left: 19, transform: "translateX(-50%) translateY(-50%)" }}>
              <div ref={mobilePlaneRef} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plane size={22} color="var(--accent)" style={{ filter: "drop-shadow(0 0 7px rgba(255,101,53,.75))" }} />
              </div>
            </div>
          </div>

          {experiences.map((exp, i) => (
            <div key={exp.id} className="exp-mobile-card opacity-0 relative flex gap-6 pb-10 last:pb-0">
              {/* Timeline dot */}
              <div className="flex-shrink-0 mt-7" style={{ zIndex: 2, width: 20, display: "flex", justifyContent: "center" }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))",
                  border: "2px solid var(--bg-alt)",
                  boxShadow: "0 0 8px rgba(255,101,53,.4)",
                  marginTop: 4,
                }} />
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0">
                <ExpCard exp={exp} />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
