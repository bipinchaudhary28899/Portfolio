"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion-wrapper";
import { experiences } from "@/data/portfolio";
import { Briefcase } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";

function TimelineItem({
  experience,
  index,
}: {
  experience: typeof experiences[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: "easeOut",
      }}
      className="relative flex gap-6"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border-2"
          style={{
            background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
            borderColor: "var(--background)",
            color: "white",
          }}
        >
          <Briefcase size={16} />
        </motion.div>
        {index < experiences.length - 1 && (
          <div
            className="w-0.5 flex-1 mt-3 min-h-[3rem]"
            style={{
              background:
                "linear-gradient(to bottom, var(--gradient-start), var(--card-border))",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className="flex-1 p-5 rounded-xl border mb-6"
        style={{
          borderColor: "var(--card-border)",
          backgroundColor: "var(--card)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3
              className="text-base font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {experience.role}
            </h3>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--accent)" }}
            >
              {experience.company}
            </p>
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full border flex-shrink-0"
            style={{
              borderColor: "var(--card-border)",
              color: "var(--muted)",
              backgroundColor: "var(--muted-bg)",
            }}
          >
            {experience.period}
          </span>
        </div>

        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--muted)" }}
        >
          {experience.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {experience.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full border font-medium"
              style={{
                borderColor: "var(--card-border)",
                color: "var(--muted)",
                backgroundColor: "var(--muted-bg)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 sm:py-32"
      style={{ backgroundColor: "var(--muted-bg)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <span
              className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Career
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Work Experience
            </h2>
          </div>
        </FadeIn>

        <div>
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
