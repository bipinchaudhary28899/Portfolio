"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion-wrapper";
import { personalInfo } from "@/data/portfolio";
import { MapPinIcon, MailIcon, GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function About() {
  return (
    <section
      id="about"
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
              About Me
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Crafting digital experiences
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <FadeIn direction="left">
            <div className="space-y-6">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {personalInfo.bio}
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { icon: MapPinIcon, text: personalInfo.location },
                  { icon: MailIcon, text: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: GithubIcon, text: "github.com/bipinchaudhary28899", href: personalInfo.github },
                  { icon: LinkedinIcon, text: "linkedin.com/in/bipinchaudhary28899", href: personalInfo.linkedin },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "var(--accent-glow)", color: "var(--accent)" }}
                    >
                      <Icon width={16} height={16} />
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline underline-offset-4 transition-colors"
                        style={{ color: "var(--muted)" }}
                      >
                        {text}
                      </a>
                    ) : (
                      <span className="text-sm" style={{ color: "var(--muted)" }}>
                        {text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Achievements */}
          <FadeIn direction="right" delay={0.15}>
            <div className="space-y-4">
              <h3
                className="text-lg font-semibold mb-6"
                style={{ color: "var(--foreground)" }}
              >
                Key Highlights
              </h3>
              <StaggerContainer className="space-y-4">
                {personalInfo.achievements.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-4 p-4 rounded-xl border"
                    style={{
                      borderColor: "var(--card-border)",
                      backgroundColor: "var(--card)",
                    }}
                  >
                    <span
                      className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                      }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {item}
                    </p>
                  </motion.div>
                ))}
              </StaggerContainer>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { label: "Years Exp.", value: "3+" },
                  { label: "Projects", value: "20+" },
                  { label: "Technologies", value: "15+" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl border text-center"
                    style={{
                      borderColor: "var(--card-border)",
                      backgroundColor: "var(--card)",
                    }}
                  >
                    <div
                      className="text-2xl font-bold gradient-text"
                    >
                      {value}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
