"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion-wrapper";
import { projects } from "@/data/portfolio";

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.article
      variants={staggerItem}
      className="card group flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div
        className="relative h-44 overflow-hidden flex-shrink-0"
        style={{ backgroundColor: "var(--muted-bg)" }}
      >
        {/* Gradient fallback / overlay */}
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, var(--accent-glow) 100%)",
          }}
        />
        <div
          className="w-full h-full flex items-center justify-center text-4xl font-bold"
          style={{ color: "var(--card-border)" }}
        >
          {project.title.charAt(0)}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className="text-base font-semibold leading-snug"
            style={{ color: "var(--foreground)" }}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--muted)" }}
              whileHover={{ color: "var(--foreground)", scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GithubIcon width={16} height={16} />
            </motion.a>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Live Demo`}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--muted)" }}
              whileHover={{ color: "var(--accent)", scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={16} />
            </motion.a>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed flex-1 mb-4"
          style={{ color: "var(--muted)" }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
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
    </motion.article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 sm:py-32"
      style={{ backgroundColor: "var(--muted-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <span
              className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Work
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Selected Projects
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--muted)" }}
            >
              A selection of projects I've built — ranging from full-stack apps
              to developer tools and open-source contributions.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.07}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </StaggerContainer>

        <FadeIn delay={0.2}>
          <div className="mt-12 text-center">
            <motion.a
              href="https://github.com/bipinchaudhary28899"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4 transition-colors"
              style={{ color: "var(--accent)" }}
              whileHover={{ gap: "10px" }}
            >
              See more on GitHub
              <ArrowRight size={16} />
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
