"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks, navMoreLinks } from "@/data/portfolio";
import { ThemePanel } from "@/components/ui/ThemePanel";
import { useLoadingComplete } from "@/context/LoadingContext";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { useScrollToTopOnBack } from "@/hooks/useScrollToTopOnBack";

/* JS-driven smooth scroll. Native window.scrollTo({behavior:"smooth"}) is
   unreliable on mobile Safari when triggered from a tap handler (it's often
   silently dropped), which made the in-page nav links appear broken on mobile.
   A requestAnimationFrame tween behaves identically across every browser. */
function smoothScrollTo(targetY: number, duration = 600) {
  const startY = window.scrollY;
  const diff = Math.round(targetY) - startY;
  if (Math.abs(diff) < 2) {
    window.scrollTo(0, targetY);
    return;
  }
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let startTs: number | null = null;
  const step = (ts: number) => {
    if (startTs === null) startTs = ts;
    const p = Math.min((ts - startTs) / duration, 1);
    window.scrollTo(0, startY + diff * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function Navbar() {
  const ref                         = useRef<HTMLElement>(null);
  const moreRef                     = useRef<HTMLDivElement>(null);
  const [open, setOpen]             = useState(false);
  const [moreOpen, setMoreOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const loadingComplete = useLoadingComplete();

  /* Intercept mobile back button → scroll to top */
  useScrollToTopOnBack();

  /* Fade in after loading screen */
  useEffect(() => {
    if (!loadingComplete) return;
    gsap.fromTo(ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.2 },
    );
  }, [loadingComplete]);

  /* Scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Close "More" popover when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setMoreOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    // Always use the fixed bar height (h-16 = 64px), NOT offsetHeight —
    // offsetHeight includes the mobile dropdown while it's still animating
    // closed, which throws off the scroll target. The header is position:fixed
    // so the open/closing mobile menu doesn't shift the target's position;
    // a single rAF is enough to let the close state commit before we measure.
    const NAV_H = 64;
    requestAnimationFrame(() => {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_H;
      smoothScrollTo(top);
    });
  };

  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50 opacity-0"
      style={{
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        transition: "background .3s, border-color .3s",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <button onClick={() => go("#hero")} className="font-black text-xl tracking-tight shrink-0" style={{ color: "var(--fg)" }}>
          <span style={{ color: "var(--accent)" }}>B</span>ipin
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-sm font-medium transition-colors duration-200 hover:text-white whitespace-nowrap"
              style={{ color: "var(--muted)" }}
            >
              {l.label}
            </button>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-white whitespace-nowrap"
              style={{ color: "var(--muted)" }}
            >
              More
              <ChevronDown
                size={14}
                style={{
                  transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>

            {/* Popover */}
            <div
              className="absolute top-full right-0 mt-2 w-44 rounded-xl border shadow-xl overflow-hidden"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
                opacity: moreOpen ? 1 : 0,
                transform: moreOpen ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)",
                pointerEvents: moreOpen ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                transformOrigin: "top right",
              }}
            >
              {navMoreLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:opacity-80"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          <ThemePanel />
          <button
            onClick={() => setResumeOpen(true)}
            className="inline-flex items-center text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-85 whitespace-nowrap"
            style={{ background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))", color: "#fff" }}
          >
            View Resume
          </button>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-3">
          <ThemePanel />
          <button
            className="p-1.5 rounded"
            style={{ color: "var(--fg-dim)" }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden"
        aria-hidden={!open}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows .35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ minHeight: 0, overflow: "hidden" }}>
          <div
            className="border-t px-6 py-5 flex flex-col gap-1"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg)",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity .3s ease, transform .35s ease",
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {/* Core links */}
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="text-left text-base font-medium py-2"
                style={{ color: "var(--fg-dim)" }}
              >
                {l.label}
              </button>
            ))}

            {/* Divider + secondary links */}
            <div className="my-2 border-t" style={{ borderColor: "var(--border)" }} />
            {navMoreLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="text-left text-sm font-medium py-1.5"
                style={{ color: "var(--muted)" }}
              >
                {l.label}
              </button>
            ))}

            <button
              onClick={() => { setOpen(false); setResumeOpen(true); }}
              className="mt-3 inline-flex items-center justify-center text-sm font-semibold px-4 py-2.5 rounded-lg"
              style={{ background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))", color: "#fff" }}
            >
              View Resume
            </button>
          </div>
        </div>
      </div>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </header>
  );
}
