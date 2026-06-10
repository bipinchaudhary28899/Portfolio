"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { personalInfo } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sec = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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

      const isMobile = () => window.innerWidth < 768;

      gsap.fromTo(".contact-left",
        { opacity: 0, x: isMobile() ? 0 : -40, y: isMobile() ? 30 : 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-body", start: isMobile() ? "top 60%" : "top bottom", toggleActions: "play none none none" } });

      gsap.fromTo(".contact-right",
        { opacity: 0, x: isMobile() ? 0 : 40, y: isMobile() ? 30 : 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.75, ease: "power3.out", delay: isMobile() ? 0.15 : 0,
          scrollTrigger: { trigger: ".contact-body", start: isMobile() ? "top 60%" : "top bottom", toggleActions: "play none none none" } });
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
    <section ref={sec} id="contact" className="pt-12 sm:pt-[4.5rem] pb-10 sm:pb-14 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="contact-header opacity-0 mb-14 text-center flex flex-col items-center">
          <p className="section-label mb-3">Let&apos;s Talk</p>
          <h2 className="font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "var(--fg)" }}>
            Get in Touch
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed mx-auto" style={{ color: "var(--fg-dim)", maxWidth: "44rem" }}>
            Have an idea, a role, or just want to connect? My inbox is always open.
          </p>
        </div>

        <div className="contact-body grid md:grid-cols-2 gap-12 items-start">

          {/* Left: info */}
          <div className="contact-left opacity-0 min-w-0 flex flex-col gap-8">
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              Whether you have a project in mind, a role to fill, or just want to connect - my inbox is open.
            </p>

            <div className="flex flex-col gap-5">
              <div
                className="flex flex-col rounded-xl border transition-all hover:border-orange-500/50"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                {/* icon + address + action icons inline */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,101,53,.12)" }}>
                    <Mail size={18} style={{ color: "var(--accent)" }} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--muted)" }}>Email</p>
                    <p className="text-sm font-medium truncate" style={{ color: "var(--fg)" }}>
                      {personalInfo.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={copyEmail}
                      title={copied ? "Copied!" : "Copy email"}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all hover:border-orange-500/50"
                      style={{
                        border:     "1px solid var(--border)",
                        background: copied ? "rgba(34,197,94,0.1)" : "var(--bg)",
                        color:      copied ? "#22c55e" : "var(--muted)",
                      }}
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      title="Send email"
                      className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all hover:border-orange-500/50"
                      style={{
                        border:     "1px solid var(--accent)",
                        background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                        color:      "var(--accent)",
                      }}
                    >
                      <Send size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div
                className="flex flex-col rounded-xl border transition-all hover:border-orange-500/50"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,101,53,.12)" }}>
                    <Phone size={18} style={{ color: "var(--accent)" }} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--muted)" }}>Phone</p>
                    <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>{personalInfo.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`tel:${personalInfo.phone}`}
                      title="Call"
                      className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all hover:border-orange-500/50"
                      style={{
                        border:     "1px solid var(--border)",
                        background: "var(--bg)",
                        color:      "var(--muted)",
                      }}
                    >
                      <Phone size={13} />
                    </a>
                    <a
                      href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="WhatsApp"
                      className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all hover:opacity-85"
                      style={{
                        border:     "1px solid #22c55e",
                        background: "rgba(34,197,94,0.1)",
                        color:      "#22c55e",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
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
          <div className="contact-right opacity-0 min-w-0">
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
                className="rounded-2xl border p-5 sm:p-8 flex flex-col gap-5"
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