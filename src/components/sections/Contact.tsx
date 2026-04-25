"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/motion-wrapper";
import { personalInfo } from "@/data/portfolio";
import { Send, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass = cn(
    "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200",
    "placeholder:text-[var(--muted)] focus:ring-2"
  );

  const inputStyle = {
    backgroundColor: "var(--card)",
    borderColor: "var(--card-border)",
    color: "var(--foreground)",
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <span
              className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Contact
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Let&apos;s work together
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "var(--muted)" }}>
              I&apos;m always open to new opportunities, collaborations, or just a good chat about tech.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <FadeIn direction="left">
            <div className="space-y-6">
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Whether you have a project in mind, an opportunity to discuss, or just
                want to connect — my inbox is always open.
              </p>

              <div className="space-y-4">
                {[
                  { icon: MailIcon, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: GithubIcon, label: "GitHub", value: "bipinchaudhary28899", href: personalInfo.github },
                  { icon: LinkedinIcon, label: "LinkedIn", value: "bipinchaudhary28899", href: personalInfo.linkedin },
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-200"
                    style={{
                      borderColor: "var(--card-border)",
                      backgroundColor: "var(--card)",
                    }}
                    whileHover={{
                      borderColor: "var(--accent)",
                      backgroundColor: "var(--accent-glow)",
                      x: 4,
                    }}
                  >
                    <div
                      className="p-2.5 rounded-lg"
                      style={{
                        backgroundColor: "var(--accent-glow)",
                        color: "var(--accent)",
                      }}
                    >
                      <Icon width={18} height={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--muted)" }}>
                        {label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" delay={0.15}>
            <div
              className="p-6 sm:p-8 rounded-2xl border"
              style={{
                borderColor: "var(--card-border)",
                backgroundColor: "var(--card)",
              }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-10 text-center"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--accent-glow)",
                        color: "var(--accent)",
                      }}
                    >
                      <CheckCircle size={28} />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                      Message sent!
                    </h3>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      Thanks for reaching out. I&apos;ll get back to you soon.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 text-sm font-medium underline underline-offset-4"
                      style={{ color: "var(--accent)" }}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass}
                        style={{ ...inputStyle, outlineColor: "var(--accent)" }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass}
                        style={{ ...inputStyle, outlineColor: "var(--accent)" }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell me about your project or opportunity..."
                        className={cn(inputClass, "resize-none")}
                        style={{ ...inputStyle, outlineColor: "var(--accent)" }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                      style={{
                        background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                      }}
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 20px var(--accent-glow)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === "loading" ? (
                        <motion.div
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
