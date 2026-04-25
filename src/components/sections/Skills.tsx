"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion-wrapper";
import { skills } from "@/data/portfolio";

function SkillCard({ name, icon }: { name: string; icon: string }) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-3 p-3 rounded-xl border cursor-default select-none transition-all duration-200"
      style={{
        borderColor: "var(--card-border)",
        backgroundColor: "var(--card)",
      }}
      whileHover={{
        borderColor: "var(--accent)",
        backgroundColor: "var(--accent-glow)",
        y: -2,
        boxShadow: "0 4px 20px var(--accent-glow)",
      }}
    >
      <span className="text-xl w-8 text-center flex-shrink-0">{icon}</span>
      <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
        {name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
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
              Tech Stack
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Skills & Technologies
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-10">
          {Object.entries(skills).map(([category, items], i) => (
            <FadeIn key={category} delay={i * 0.08}>
              <div>
                <h3
                  className="text-sm font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--muted)" }}
                >
                  {category}
                </h3>
                <StaggerContainer
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
                  delay={i * 0.05}
                  staggerDelay={0.05}
                >
                  {items.map((skill) => (
                    <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
