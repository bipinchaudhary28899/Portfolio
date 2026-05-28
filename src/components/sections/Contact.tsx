"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { personalInfo } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sec = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill from "Order Package" buttons in the Freelance section
  useEffect(() => {
    const handler = (e: Event) => {
      const { message } = (e as CustomEvent<{ message: string }>).detail;
      setForm((f) => ({ ...f, message }));
      // Small delay so the scroll lands before we steal focus
      setTimeout(() => {
        document.querySelector<HTMLTextAreaElement>("#contact textarea")?.focus();
      }, 600);
    };
    window.addEventListener("prefill-contact", handler);
    return () => window.removeEventListener("prefill-contact", handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-header", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      gsap.fromTo(".contact-left",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-body", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      gsap.fromTo(".contact-right",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-body", start: () => window.innerWidth < 768 ? "top 60%" : "top bottom", toggleActions: "play none none none" } });
    }, sec);
    return () => ctx.revert();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("https://formspree.io/f/xjglywnz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--fg)",
    borderRadius: 10,
    padding: "0.75rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color .2s",
  } as const;

  return (
    <section ref={sec} id="contact" className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="contact-header opacity-0 mb-14">
          <p className="section-label mb-3">Let's Talk</p>
          <h2 className="font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)" }}>
            Get in Touch
          </h2>
        </div>

        <div className="contact-body grid md:grid-cols-2 gap-12 items-start">

          {/* Left: info */}
          <div className="contact-left opacity-0 flex flex-col gap-8">
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              Whether you have a project in mind, a role to fill, or just want to connect - my inbox is open.
            </p>

            <div className="flex flex-col gap-5">
              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-5 rounded-xl border transition-all hover:border-orange-500/50 group"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,101,53,.12)" }}>
                  <Mail size={18} style={{ color: "var(--accent)" }} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--muted)" }}>Email</p>
                  <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>{personalInfo.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-xl border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,101,53,.12)" }}>
                  <MapPin size={18} style={{ color: "var(--accent)" }} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--muted)" }}>Location</p>
                  <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all hover:border-orange-500/50"
                style={{ border: "1px solid var(--border)", color: "var(--fg-dim)", background: "var(--card)" }}>
                <GithubIcon width={16} height={16} /> GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all hover:border-orange-500/50"
                style={{ border: "1px solid var(--border)", color: "var(--fg-dim)", background: "var(--card)" }}>
                <LinkedinIcon width={16} height={16} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-right opacity-0">
            {sent ? (
              <div className="rounded-2xl border p-10 flex flex-col items-center justify-center gap-4 text-center"
                style={{ background: "var(--card)", borderColor: "var(--border)", minHeight: 340 }}>
                <span className="text-5xl">✉️</span>
                <h3 className="text-xl font-bold" style={{ color: "var(--fg)" }}>Message sent!</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>I'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-xs underline"
                  style={{ color: "var(--accent)" }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit}
                className="rounded-2xl border p-8 flex flex-col gap-5"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>

                {error && (
                  <div className="text-sm px-4 py-3 rounded-lg"
                    style={{ background: "rgba(255,101,53,0.1)", color: "var(--accent)", border: "1px solid rgba(255,101,53,0.2)" }}>
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Name
                  </label>
                  <input
                    type="text" required placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={e => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Email
                  </label>
                  <input
                    type="email" required placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={e => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    Message
                  </label>
                  <textarea
                    required rows={5} placeholder="What's on your mind?"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={e => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                <button type="submit" disabled={sending}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
                  style={{
                    background: "linear-gradient(135deg,var(--grad-a),var(--grad-b))",
                    opacity: sending ? 0.6 : 1,
                    cursor: sending ? "not-allowed" : "pointer"
                  }}>
                  {sending ? "Sending..." : "Send Message"}
                  {!sending && <Send size={14} />}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}