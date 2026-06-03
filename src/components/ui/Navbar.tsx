"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/portfolio";
import { ThemePanel } from "@/components/ui/ThemePanel";
import { useLoadingComplete } from "@/context/LoadingContext";
import { ResumeModal } from "@/components/ui/ResumeModal";

export function Navbar() {
  const ref                       = useRef<HTMLElement>(null);
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const loadingComplete = useLoadingComplete();

  /* Fade in only after the loading screen has exited */
  useEffect(() => {
    if (!loadingComplete) return;
    /* No Y transform — keeps position:fixed stable on mobile */
    gsap.fromTo(ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.2 },
    );
  }, [loadingComplete]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
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
        /* Force GPU compositing layer — prevents address-bar resize jank on iOS/Android */
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <button onClick={() => go("#hero")} className="font-black text-xl tracking-tight" style={{ color: "var(--fg)" }}>
          <span style={{ color: "var(--accent)" }}>B</span>ipin
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-sm font-medium transition-colors duration-200 hover:text-white"
              style={{ color: "var(--muted)" }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          <ThemePanel />
          <button
            onClick={() => setResumeOpen(true)}
            className="inline-flex items-center text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-85"
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

      {/* Mobile dropdown — animated open/close (grid-rows collapse + fade/slide) */}
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
            className="border-t px-6 py-6 flex flex-col gap-5"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg)",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity .3s ease, transform .35s ease",
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {navLinks.map((l) => (
              <button key={l.href} onClick={() => go(l.href)} className="text-left text-base font-medium" style={{ color: "var(--fg-dim)" }}>
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { setOpen(false); setResumeOpen(true); }}
              className="mt-1 inline-flex items-center justify-center text-sm font-semibold px-4 py-2.5 rounded-lg"
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
