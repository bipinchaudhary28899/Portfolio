"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ChevronDown, Zap, Clock, Package } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ───────────────────────────────────────────────────────────────── */

const PACKAGES = [
  {
    tier: "BASIC",
    name: "Starter Website",
    price: "₹10K Onwards",
    delivery: "5 Days",
    description: "A fast, responsive website that looks professional and gets you online quickly.",
    highlight: false,
    features: [
      { label: "Pages",                  value: "3"    },
      { label: "Revisions",              value: "2"    },
      { label: "Plugin Installations",   value: "2"    },
      { label: "Content Upload",         value: false  },
      { label: "Payment Integration",    value: false  },
      { label: "E-commerce",             value: false  },
      { label: "Source Code Included",   value: true   },
    ],
    extra: "Extra fast: 3 days for +₹2,500",
  },
  {
    tier: "STANDARD",
    name: "Full-Stack App",
    price: "₹40K Onwards",
    delivery: "10 Days",
    description: "A fully functional web app your users can sign up for, log in, and actually use.",
    highlight: true,
    features: [
      { label: "Pages",                  value: "7"    },
      { label: "Revisions",              value: "3"    },
      { label: "Plugin Installations",   value: "4"    },
      { label: "Content Upload",         value: true   },
      { label: "Payment Integration",    value: true   },
      { label: "E-commerce",             value: false  },
      { label: "Source Code Included",   value: true   },
    ],
    extra: "Extra fast: 6 days for +₹8,000",
  },
  {
    tier: "PREMIUM",
    name: "Production System",
    price: "₹80K Onwards",
    delivery: "21 Days",
    description: "A production-ready SaaS platform built to scale, monetize, and grow with your business.",
    highlight: false,
    features: [
      { label: "Pages",                    value: "10"   },
      { label: "Revisions",                value: "5"    },
      { label: "Plugin Installations",     value: "10"   },
      { label: "Content Upload",           value: true   },
      { label: "Payment Integration",      value: true   },
      { label: "E-commerce (20 products)", value: true   },
      { label: "Source Code Included",     value: true   },
    ],
    extra: "Extra fast: 14 days for +₹17,000",
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
    a: "Basic is for landing pages or simple marketing sites. Standard is best if you need user auth, a backend, and a real web app. Premium is for SaaS platforms with payments, multi-tenancy, or complex business logic.",
  },
  {
    q: "Do I need to have a design ready before ordering?",
    a: "No — you can choose whether you have Figma/XD designs, rough wireframes, a reference site, or nothing at all. UI/UX design is also available as an add-on (+₹8,500).",
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

/* ── Package Card ───────────────────────────────────────────────────────── */
function PackageCard({ pkg }: { pkg: (typeof PACKAGES)[0] }) {
  return (
    <div
      className="pkg-card relative flex flex-col rounded-2xl border overflow-hidden"
      style={{
        borderColor: pkg.highlight ? "var(--accent)" : "var(--border)",
        background: "var(--card)",
        boxShadow: pkg.highlight ? "0 0 40px rgba(255,101,53,0.14)" : "none",
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
                  <span style={{ color: "var(--border)", fontSize: 16, lineHeight: 1 }}>–</span>
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
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const buildRef    = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const addonsRef   = useRef<HTMLDivElement>(null);
  const faqRef      = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Header — each child staggers in from different axes ── */
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 88%", toggleActions: "play none none none" } });

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 44, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 90%", toggleActions: "play none none none" } });

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: descRef.current, start: "top 90%", toggleActions: "play none none none" } });

      /* ── 2. "What I build" panel — slide from left, items stagger ── */
      gsap.fromTo(buildRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: buildRef.current, start: "top 87%", toggleActions: "play none none none" } });

      gsap.fromTo(
        buildRef.current?.querySelectorAll(".build-item") ?? [],
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: buildRef.current, start: "top 85%", toggleActions: "play none none none" } });

      /* ── 3. Package cards — fly up + scale in with stagger ── */
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".pkg-card") ?? [],
        { opacity: 0, y: 80, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none none" } });

      /* ── 4. Add-on tiles — pop in with back ease + stagger ── */
      gsap.fromTo(
        addonsRef.current?.querySelectorAll(".addon-tile") ?? [],
        { opacity: 0, scale: 0.78, y: 28 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.055,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: addonsRef.current, start: "top 88%", toggleActions: "play none none none" } });

      /* ── 5. Add-ons heading ── */
      gsap.fromTo(
        addonsRef.current?.querySelector(".addons-heading") ?? null,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: addonsRef.current, start: "top 88%", toggleActions: "play none none none" } });

      /* ── 6. FAQ items — slide in from right, staggered ── */
      gsap.fromTo(
        faqRef.current?.querySelectorAll(".faq-item") ?? [],
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.55, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: faqRef.current, start: "top 88%", toggleActions: "play none none none" } });

      gsap.fromTo(
        faqRef.current?.querySelector(".faq-heading") ?? null,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: faqRef.current, start: "top 90%", toggleActions: "play none none none" } });

      /* ── 7. Bottom CTA — scale up from slightly small ── */
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.94, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%", toggleActions: "play none none none" } });

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
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* ── Header ── */}
        <div>
          <p ref={labelRef} className="section-label mb-2" style={{ opacity: 0 }}>Available for Hire</p>
          <h2
            ref={titleRef}
            className="font-bold leading-tight"
            style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", color: "var(--fg)", opacity: 0 }}
          >
            Freelance Services
          </h2>
          <p
            ref={descRef}
            className="mt-3 max-w-xl text-sm leading-relaxed"
            style={{ color: "var(--fg-dim)", opacity: 0 }}
          >
            Full-stack engineer available for client projects — from responsive landing pages
            to production-grade SaaS platforms with real-time features and AI integrations.
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

        {/* ── Package Cards ── */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.tier} pkg={pkg} />
          ))}
        </div>

        {/* ── Add-ons ── */}
        <div ref={addonsRef}>
          <div className="addons-heading flex items-center gap-2 mb-6" style={{ opacity: 0 }}>
            <Package size={16} style={{ color: "var(--accent)" }} />
            <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>Add-on Services</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ADDONS.map((a) => (
              <div
                key={a.label}
                className="addon-tile flex flex-col gap-1.5 rounded-xl border p-4 transition-colors duration-200"
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

          {/* Left — FAQ */}
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

          {/* Right — How I Work */}
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
                className="absolute left-[19px] top-6 bottom-6 w-px"
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
          <p className="section-label">Ready to build something?</p>
          <h3 className="text-2xl sm:text-3xl font-black" style={{ color: "var(--fg)" }}>
            Let's work together
          </h3>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
            Choose a package above or drop me a message directly — happy to discuss
            your project, scope, and timeline before you commit.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
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
