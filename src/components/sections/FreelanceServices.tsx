"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check, ChevronDown, Zap, Clock, Package,
  Workflow, Code2, Sparkles, Rocket, TrendingUp, FileCode,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ───────────────────────────────────────────────────────────────── */

const PACKAGES = [
  {
    tier: "LAUNCH",
    name: "Launch Package",
    price: "₹15K Onwards",
    delivery: "5 Days",
    description:
      "Perfect for startups, personal brands, portfolios, and small businesses looking to establish a professional online presence.",
    highlight: false,
    features: [
      { label: "Responsive, SEO-ready UI",        value: true  },
      { label: "Custom design & branding",        value: true  },
      { label: "Cloud deployment & domain setup", value: true  },
      { label: "Authentication & user accounts",  value: false },
      { label: "Database & admin dashboard",       value: false },
      { label: "Payments & subscriptions",         value: false },
      { label: "Full source code ownership",       value: true  },
    ],
    extra: "Rush delivery: 3 days for +₹2,500",
  },
  {
    tier: "GROWTH",
    name: "Growth Package",
    price: "₹50K Onwards",
    delivery: "10 Days",
    description:
      "Custom web applications with authentication, dashboards, database integration, and business workflows designed for real users.",
    highlight: true,
    features: [
      { label: "Everything in Launch",            value: true  },
      { label: "Authentication & user accounts",  value: true  },
      { label: "Database & admin dashboard",       value: true  },
      { label: "Business workflows & REST APIs",   value: true  },
      { label: "Cloud deployment & CI/CD",         value: true  },
      { label: "Payments & subscriptions",         value: false },
      { label: "Full source code ownership",       value: true  },
    ],
    extra: "Rush delivery: 6 days for +₹8,000",
  },
  {
    tier: "SCALE",
    name: "Scale Package",
    price: "₹1L Onwards",
    delivery: "21 Days",
    description:
      "Production-ready SaaS MVPs with scalable architecture, cloud deployment, payments, analytics, and optional AI-powered features. ₹1L is a starting price for SaaS MVPs - advanced requirements increase the final cost.",
    highlight: false,
    features: [
      { label: "Everything in Growth",            value: true  },
      { label: "Scalable, multi-tenant architecture", value: true },
      { label: "Payments & subscriptions",         value: true  },
      { label: "Analytics & monitoring",           value: true  },
      { label: "AI-powered features (optional)",   value: true  },
      { label: "Performance & security hardening", value: true  },
      { label: "Full source code ownership",       value: true  },
    ],
    extra: "Rush delivery: 14 days for +₹17,000",
  },
];

const ADDONS = [
  { label: "Additional Page",          price: "+₹2,000",  note: "+1 day"  },
  { label: "Additional Revision",      price: "+₹800",    note: "+1 day"  },
  { label: "Additional Plugin",        price: "+₹1,200",  note: "+1 day"  },
  { label: "Payment Integration",      price: "+₹3,500",  note: "+2 days" },
  { label: "E-commerce Functionality", price: "+₹12,000", note: "+3 days" },
  { label: "Speed Optimization",       price: "+₹5,000",  note: "+1 day"  },
  { label: "UI/UX Design",             price: "+₹8,000",  note: "+2 days" },
  { label: "3 Month Support",          price: "+₹25,000", note: "ongoing" },
];

const WHAT_I_BUILD = [
  "React / Angular / Next.js frontends with clean, responsive UI",
  "Node.js + Express REST APIs and authentication systems",
  "PostgreSQL / MongoDB database design and integration",
  "AWS / Vercel / Netlify deployment with CI/CD pipelines",
  "Real-time features using WebSockets",
  "AI integrations (OpenAI, LangChain, custom models)",
];

const WHY_WORK = [
  {
    Icon: Workflow,
    title: "End-to-End Development",
    description: "From idea to deployment, everything handled in one place.",
  },
  {
    Icon: Code2,
    title: "Modern Tech Stack",
    description:
      "React, Angular, Node.js, TypeScript, MongoDB, PostgreSQL, AWS, and cloud-native solutions.",
  },
  {
    Icon: Sparkles,
    title: "AI Integrations",
    description:
      "OpenAI-powered features, chatbots, automation, content generation, and intelligent workflows.",
  },
  {
    Icon: Rocket,
    title: "Production Deployment",
    description:
      "Secure hosting, CI/CD pipelines, domain setup, monitoring, and performance optimization.",
  },
  {
    Icon: TrendingUp,
    title: "Scalable Architecture",
    description: "Built with maintainability, growth, and future feature expansion in mind.",
  },
  {
    Icon: FileCode,
    title: "Source Code Ownership",
    description: "Clients receive complete ownership of the delivered source code.",
  },
];

const WORK_PROCESS = [
  {
    step: "01",
    title: "Requirement Gathering",
    description:
      "Client purchases the project and shares all requirements, references, branding details, content, and feature expectations.",
  },
  {
    step: "02",
    title: "Planning & Wireframing",
    description:
      "I analyze the requirements, finalize the project structure, and create wireframes or UI concepts for approval.",
  },
  {
    step: "03",
    title: "Design & Development",
    description:
      "I develop the website/application with responsive design, required features, animations, integrations, and optimizations.",
  },
  {
    step: "04",
    title: "Review & Feedback",
    description:
      "Client reviews the delivered work and shares feedback or revision requests if needed.",
  },
  {
    step: "05",
    title: "Revisions & Final Delivery",
    description:
      "I implement the requested revisions, perform final testing, and deliver the completed project files/live deployment.",
  },
  {
    step: "06",
    title: "Deployment & Support",
    description:
      "I assist with deployment, hosting setup, bug fixes, and post-delivery support if included in the package.",
  },
];

const FAQS = [
  {
    q: "How do I know which package is right for me?",
    a: "Launch is for a professional online presence - portfolios, personal brands, and small-business sites. Growth is best when you need authentication, dashboards, a database, and real business workflows. Scale is for production SaaS MVPs with payments, analytics, scalable architecture, and optional AI features.",
  },
  {
    q: "Why does this cost more than an AI code generator or no-code tool?",
    a: "You're not paying for code generation alone - you're paying for system architecture, secure deployment, third-party integrations, scalability, maintainability, and professional execution. AI tools can scaffold UI, but turning that into a reliable, deployed product that real users depend on (auth, databases, payments, monitoring, performance) is the engineering work these packages cover.",
  },
  {
    q: "Do I need to have a design ready before ordering?",
    a: "No - you can choose whether you have Figma/XD designs, rough wireframes, a reference site, or nothing at all. UI/UX design is also available as an add-on (+₹8,000).",
  },
  {
    q: "What tech stack do you use?",
    a: "I default to React + Node.js or Next.js + Node.js, but Angular + Node.js is available too. Databases: PostgreSQL or MongoDB. Cloud: AWS, Vercel, or Netlify based on your needs.",
  },
  {
    q: "Will I own the full source code after delivery?",
    a: "Yes. You receive full ownership of the source code, all assets, and repository access upon final delivery.",
  },
  {
    q: "What happens if I need changes after delivery?",
    a: "Each package includes revisions. Beyond that, additional revisions are +₹800 each, or opt for the 3-Month Support add-on (+₹25,000) for ongoing fixes and technical help.",
  },
  {
    q: "How do you handle communication during the project?",
    a: "I provide regular progress updates with a structured milestone check-in at the midpoint. I'm available via email or a scheduled call for complex discussions.",
  },
];

/* ── Helper ─────────────────────────────────────────────────────────────── */

function scrollToContact(packageName: string) {
  const msg = `Hi, I'm interested in building an application with your ${packageName} package and want to connect for it.`;
  window.dispatchEvent(new CustomEvent("prefill-contact", { detail: { message: msg } }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

/* ── FAQ Item ───────────────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="faq-item border rounded-xl overflow-hidden transition-colors duration-200"
      style={{ borderColor: open ? "var(--accent)" : "var(--border)", background: "var(--card)" }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold leading-snug" style={{ color: "var(--fg)" }}>{q}</span>
        <ChevronDown
          size={16}
          style={{
            color: "var(--accent)",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

/* ── Mobile Package Accordion ───────────────────────────────────────────── */
function MobilePackages() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {PACKAGES.map((pkg, i) => {
        const isOpen = open === i;
        return (
          <div
            key={pkg.tier}
            className="mob-pkg-card rounded-2xl overflow-hidden"
            style={{
              background: "var(--card)",
              border:     `1.5px solid ${pkg.highlight ? "var(--accent)" : "var(--border)"}`,
              boxShadow:  pkg.highlight ? "0 0 32px var(--glow), var(--shadow-card)" : "var(--shadow-sm)",
            }}
          >
            {/* ── Always-visible top (mirrors desktop card top) ── */}
            <button
              className="w-full text-left px-5 pt-5 pb-4"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {/* MOST POPULAR banner */}
              {pkg.highlight && (
                <div className="flex justify-center mb-3 -mt-1">
                  <span
                    className="text-xs font-bold px-4 py-1 rounded-full"
                    style={{
                      background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))",
                      color: "#fff",
                    }}
                  >
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Tier + name */}
              <p className="text-xs font-mono font-semibold tracking-widest mb-0.5"
                style={{ color: "var(--accent)" }}>
                {pkg.tier}
              </p>
              <h3 className="text-xl font-black mb-2" style={{ color: "var(--fg)" }}>
                {pkg.name}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-dim)" }}>
                {pkg.description}
              </p>

              {/* Price row */}
              <div className="flex items-end gap-4">
                <span className="text-3xl font-black leading-none" style={{ color: "var(--fg)" }}>
                  {pkg.price}
                </span>
                <div className="flex flex-col gap-0.5 mb-0.5">
                  <span className="text-xs flex items-center gap-1" style={{ color: "var(--fg-dim)" }}>
                    <Clock size={11} /> {pkg.delivery} delivery
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>{pkg.extra}</span>
                </div>
              </div>

              {/* Expand/collapse hint */}
              <div className="flex items-center justify-center gap-1.5 mt-4 pt-3"
                style={{ borderTop: "1px solid var(--border)" }}>
                <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  {isOpen ? "Hide details" : "View features & order"}
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                  style={{
                    color: "var(--accent)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                  }}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            {/* ── Expandable: features + order button ── */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.3s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  className="px-5 pb-5 flex flex-col gap-3"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 pt-3">
                    {pkg.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-2.5 text-sm">
                        {f.value === false ? (
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "var(--bg)" }}
                          >
                            <span style={{ color: "var(--border)", fontSize: 15, lineHeight: 1 }}>-</span>
                          </span>
                        ) : (
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))" }}
                          >
                            <Check size={9} color="#fff" strokeWidth={3} />
                          </span>
                        )}
                        <span style={{ color: f.value === false ? "var(--muted)" : "var(--fg-dim)" }}>
                          {f.label}
                          {typeof f.value === "string" && (
                            <span className="font-semibold ml-1" style={{ color: "var(--fg)" }}>
                              ×{f.value}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Order button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToContact(`${pkg.name} (${pkg.tier})`);
                    }}
                    className="mt-1 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-85 cursor-pointer"
                    style={
                      pkg.highlight
                        ? { background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))", color: "#fff" }
                        : { border: "1px solid var(--border)", color: "var(--fg)", background: "transparent" }
                    }
                  >
                    Order Package
                  </button>
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}

/* ── Package Card ───────────────────────────────────────────────────────── */
function PackageCard({ pkg }: { pkg: (typeof PACKAGES)[0] }) {
  return (
    <div
      className="pkg-card relative flex flex-col rounded-2xl border overflow-hidden"
      style={{
        borderColor: pkg.highlight ? "var(--accent)" : "var(--border)",
        background: "var(--card)",
        boxShadow: pkg.highlight ? "0 0 40px var(--glow), var(--shadow-card)" : "var(--shadow-sm)",
        opacity: 0,
      }}
    >
      {pkg.highlight && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-b-lg"
          style={{ background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))", color: "#fff" }}
        >
          MOST POPULAR
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className={pkg.highlight ? "mt-4" : ""}>
          <span className="text-xs font-mono tracking-widest" style={{ color: "var(--accent)" }}>
            {pkg.tier}
          </span>
          <h3 className="text-xl font-black mt-0.5" style={{ color: "var(--fg)" }}>{pkg.name}</h3>
          <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--fg-dim)" }}>{pkg.description}</p>
        </div>

        <div className="flex items-end gap-3">
          <span className="text-4xl font-black" style={{ color: "var(--fg)" }}>{pkg.price}</span>
          <div className="flex flex-col gap-0.5 mb-1">
            <span className="text-xs flex items-center gap-1" style={{ color: "var(--fg-dim)" }}>
              <Clock size={11} /> {pkg.delivery} delivery
            </span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>{pkg.extra}</span>
          </div>
        </div>

        <div className="h-px" style={{ background: "var(--border)" }} />

        <ul className="flex flex-col gap-2.5 flex-1">
          {pkg.features.map((f) => (
            <li key={f.label} className="flex items-center gap-2.5 text-sm">
              {f.value === false ? (
                <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--bg)" }}>
                  <span style={{ color: "var(--border)", fontSize: 16, lineHeight: 1 }}>-</span>
                </span>
              ) : (
                <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))" }}>
                  <Check size={10} color="#fff" strokeWidth={3} />
                </span>
              )}
              <span style={{ color: f.value === false ? "var(--muted)" : "var(--fg-dim)" }}>
                {f.label}
                {typeof f.value === "string" && (
                  <span className="font-semibold ml-1" style={{ color: "var(--fg)" }}>×{f.value}</span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => scrollToContact(`${pkg.name} (${pkg.tier})`)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-85 cursor-pointer"
          style={
            pkg.highlight
              ? { background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))", color: "#fff" }
              : { border: "1px solid var(--border)", color: "var(--fg)", background: "transparent" }
          }
        >
          Order Package
        </button>
      </div>

      <div className="h-0.5"
        style={{ background: "linear-gradient(90deg,var(--grad-a),var(--grad-b))", opacity: pkg.highlight ? 1 : 0.4 }} />
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export function FreelanceServices() {
  const sectionRef      = useRef<HTMLElement>(null);
  const labelRef        = useRef<HTMLParagraphElement>(null);
  const titleRef        = useRef<HTMLHeadingElement>(null);
  const descRef         = useRef<HTMLParagraphElement>(null);
  const buildRef        = useRef<HTMLDivElement>(null);
  const cardsRef        = useRef<HTMLDivElement>(null);
  const mobileCardsRef  = useRef<HTMLDivElement>(null);
  const whyRef          = useRef<HTMLDivElement>(null);
  const addonsRef       = useRef<HTMLDivElement>(null);
  const faqRef          = useRef<HTMLDivElement>(null);
  const ctaRef          = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pre-hide to prevent flash before ScrollTrigger fires
      gsap.set([labelRef.current, descRef.current, buildRef.current, ctaRef.current], { opacity: 0 });

      /* Shared title animation - used for every section heading */
      const titleAnim = (target: Element | null, trigger: Element | null, delay = 0) =>
        gsap.fromTo(target,
          { opacity: 0, y: 44, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out", delay,
            scrollTrigger: { trigger, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 1. Header ── */
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      titleAnim(titleRef.current, titleRef.current);

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: descRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 2. "What I build" panel ── */
      gsap.fromTo(buildRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: buildRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      gsap.fromTo(
        buildRef.current?.querySelectorAll(".build-item") ?? [],
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: buildRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 3. Package cards - desktop ── */
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".pkg-card") ?? [],
        { opacity: 0, y: 80, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.14, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 4. Package accordion cards - mobile ── */
      gsap.fromTo(
        mobileCardsRef.current?.querySelectorAll(".mob-pkg-card") ?? [],
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: mobileCardsRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 4b. "Why Work With Me?" heading + cards ── */
      titleAnim(
        whyRef.current?.querySelector(".why-heading") ?? null,
        whyRef.current,
      );
      gsap.fromTo(
        whyRef.current?.querySelectorAll(".why-card") ?? [],
        { opacity: 0, y: 36, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: whyRef.current, start: () => window.innerWidth < 768 ? "top 75%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 5. Add-ons heading (same title animation) ── */
      gsap.fromTo(
        addonsRef.current?.querySelector(".addons-icon") ?? null,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: addonsRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });
      titleAnim(
        addonsRef.current?.querySelector(".addons-heading h3") ?? null,
        addonsRef.current,
      );

      /* ── 6. Add-on tiles ── */
      gsap.fromTo(
        addonsRef.current?.querySelectorAll(".addon-tile") ?? [],
        { opacity: 0, scale: 0.78, y: 28 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.055, ease: "back.out(1.4)",
          scrollTrigger: { trigger: addonsRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 7. FAQ + How I Work headings - both get same title animation ── */
      (faqRef.current?.querySelectorAll(".faq-heading") ?? []).forEach((el, i) => {
        titleAnim(el, faqRef.current, i * 0.15);
      });

      /* ── 8. FAQ items + work-process rows - slide from right ── */
      gsap.fromTo(
        faqRef.current?.querySelectorAll(".faq-item") ?? [],
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.55, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: faqRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 9. Work-process connector line - draw downward ── */
      gsap.fromTo(
        faqRef.current?.querySelector(".work-line") ?? null,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1.2, ease: "power2.inOut",
          scrollTrigger: { trigger: faqRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 10. Bottom CTA container ── */
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.94, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      /* ── 11. CTA internals - stagger children ── */
      gsap.fromTo(
        ctaRef.current?.querySelectorAll(".cta-child") ?? [],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="freelance"
      ref={sectionRef}
      className="py-24 px-5 sm:px-10"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8 sm:gap-16">

        {/* ── Header ── */}
        <div>
          <p ref={labelRef} className="section-label mb-2" style={{ opacity: 0 }}>Available for Hire</p>
          <h2
            ref={titleRef}
            className="heading-accent font-black tracking-tight leading-tight"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)", opacity: 0 }}
          >
            Freelance Services
          </h2>
          <p
            ref={descRef}
            className="mt-3 max-w-4xl text-sm leading-relaxed"
            style={{ color: "var(--fg-dim)", opacity: 0 }}
          >
            Full-stack engineer available for client projects - from a professional online
            presence to production-grade SaaS platforms. You&apos;re not just paying for code -
            you get architecture, integrations, secure deployment, scalability, and
            professional execution that AI tools alone can&apos;t deliver.
          </p>
        </div>

        {/* ── What I Build ── */}
        <div
          ref={buildRef}
          className="rounded-2xl border p-6 sm:p-8"
          style={{ borderColor: "var(--border)", background: "var(--card)", opacity: 0 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Zap size={16} style={{ color: "var(--accent)" }} />
            <span className="text-sm font-bold" style={{ color: "var(--fg)" }}>What I build</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHAT_I_BUILD.map((item) => (
              <div
                key={item}
                className="build-item flex items-start gap-2.5 text-sm"
                style={{ color: "var(--fg-dim)" }}
              >
                <span
                  className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))" }}
                >
                  <Check size={9} color="#fff" strokeWidth={3} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── Package Cards - desktop only ── */}
        <div ref={cardsRef} className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.tier} pkg={pkg} />
          ))}
        </div>

        {/* ── Package Accordion - mobile only ── */}
        <div ref={mobileCardsRef} className="block sm:hidden">
          <MobilePackages />
        </div>

        {/* ── Pricing estimate note ── */}
        <p
          className="-mt-4 sm:-mt-10 max-w-3xl mx-auto text-center text-xs leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          All pricing shown is a starting estimate. Final cost depends on project
          complexity, integrations, business requirements, third-party services,
          and deployment needs.
        </p>

        {/* ── Why Work With Me? ── */}
        <div ref={whyRef}>
          <h3
            className="why-heading text-center font-bold mb-2"
            style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", color: "var(--fg)", opacity: 0 }}
          >
            Why Work With Me?
          </h3>
          <p className="text-center max-w-xl mx-auto text-sm leading-relaxed mb-8" style={{ color: "var(--fg-dim)" }}>
            You&apos;re paying for architecture, deployment, integrations, scalability,
            and ongoing maintainability - not just generated code.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {WHY_WORK.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="why-card rounded-xl border p-3 sm:p-4 flex flex-col gap-2 transition-colors duration-200"
                style={{ borderColor: "var(--border)", background: "var(--card)", opacity: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))" }}
                  >
                    <Icon size={15} color="#fff" />
                  </span>
                  <span className="text-sm font-bold leading-tight" style={{ color: "var(--fg)" }}>{title}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Add-ons ── */}
        <div ref={addonsRef}>
          <div className="addons-heading flex items-center gap-2 mb-6">
            <span className="addons-icon" style={{ opacity: 0, display: "flex" }}>
              <Package size={16} style={{ color: "var(--accent)" }} />
            </span>
            <h3 className="text-lg font-bold" style={{ color: "var(--fg)", opacity: 0 }}>Add-on Services</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ADDONS.map((a) => (
              <div
                key={a.label}
                className="addon-tile flex flex-col gap-1.5 rounded-xl border p-3 sm:p-4 transition-colors duration-200"
                style={{ borderColor: "var(--border)", background: "var(--card)", opacity: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{a.label}</span>
                <div className="flex items-center justify-between">
                  <span className="text-base font-black" style={{ color: "var(--accent)" }}>{a.price}</span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>{a.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ + How I Work ── */}
        <div ref={faqRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left - FAQ */}
          <div>
            <h3
              className="faq-heading text-lg font-bold mb-6"
              style={{ color: "var(--fg)", opacity: 0 }}
            >
              Frequently Asked Questions
            </h3>
            <div className="flex flex-col gap-3">
              {FAQS.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>

          {/* Right - How I Work */}
          <div>
            <h3
              className="faq-heading text-lg font-bold mb-6"
              style={{ color: "var(--fg)", opacity: 0 }}
            >
              How I Work
            </h3>
            <p className="faq-item text-xs mb-6 leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              Bipin works on your project following the steps below.
              Revisions may occur after the delivery date.
            </p>
            <div className="relative flex flex-col">
              {/* vertical connector line */}
              <div
                className="work-line absolute left-[19px] top-6 bottom-6 w-px"
                style={{ background: "linear-gradient(180deg, var(--grad-a), var(--grad-b))", opacity: 0.25 }}
              />
              {WORK_PROCESS.map((step, i) => (
                <div
                  key={step.step}
                  className="faq-item relative flex gap-4 pb-6 last:pb-0"
                >
                  {/* step badge */}
                  <div
                    className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      background: i === 0
                        ? "linear-gradient(135deg,var(--grad-a),var(--grad-b))"
                        : "var(--card)",
                      border: "1.5px solid",
                      borderColor: i === 0 ? "transparent" : "var(--border)",
                      color: i === 0 ? "#fff" : "var(--accent)",
                    }}
                  >
                    {step.step}
                  </div>
                  {/* content */}
                  <div className="flex flex-col gap-1 pt-1.5">
                    <span className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                      {step.title}
                    </span>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom CTA ── */}
        <div
          ref={ctaRef}
          className="rounded-2xl border p-8 sm:p-10 text-center flex flex-col items-center gap-5"
          style={{ borderColor: "var(--border)", background: "var(--card)", opacity: 0 }}
        >
          <p className="cta-child section-label" style={{ opacity: 0 }}>Ready to build something?</p>
          <h3 className="cta-child text-2xl sm:text-3xl font-black" style={{ color: "var(--fg)", opacity: 0 }}>
            Let&apos;s work together
          </h3>
          <p className="cta-child max-w-md text-sm leading-relaxed" style={{ color: "var(--fg-dim)", opacity: 0 }}>
            Prices are starting estimates - every project is scoped to your goals,
            integrations, and deployment needs. Choose a package above or message me
            directly to discuss scope and timeline before you commit.
          </p>
          <div className="cta-child flex flex-wrap gap-3 justify-center" style={{ opacity: 0 }}>
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.tier}
                onClick={() => scrollToContact(`${pkg.name} (${pkg.tier})`)}
                className="text-sm font-semibold px-5 py-2.5 rounded-xl border transition-opacity hover:opacity-85 cursor-pointer"
                style={{ borderColor: "var(--border)", color: "var(--fg)", background: "transparent" }}
              >
                {pkg.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
