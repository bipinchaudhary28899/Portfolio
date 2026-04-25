"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Mail, Download, ChevronRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { personalInfo } from "@/data/portfolio";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, var(--accent-glow), transparent 70%)",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--gradient-start)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--gradient-end)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.12, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border"
            style={{
              borderColor: "var(--card-border)",
              backgroundColor: "var(--card)",
              color: "var(--muted)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#22c55e" }}
            />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
        >
          <span style={{ color: "var(--foreground)" }}>
            {personalInfo.name.split(" ")[0]}{" "}
          </span>
          <span className="gradient-text">
            {personalInfo.name.split(" ").slice(1).join(" ")}
          </span>
        </motion.h1>

        {/* Role */}
        <motion.div variants={itemVariants} className="mb-6">
          <p
            className="text-xl sm:text-2xl md:text-3xl font-medium"
            style={{ color: "var(--muted)" }}
          >
            {personalInfo.role}
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <motion.button
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200"
            style={{ background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 30px var(--accent-glow)" }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
            <ChevronRight size={16} />
          </motion.button>

          <motion.a
            href={personalInfo.resumeUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200"
            style={{
              borderColor: "var(--card-border)",
              color: "var(--foreground)",
              backgroundColor: "var(--card)",
            }}
            whileHover={{
              scale: 1.04,
              borderColor: "var(--accent)",
              boxShadow: "0 4px 20px var(--accent-glow)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
            { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-xl border transition-colors duration-200"
              style={{
                borderColor: "var(--card-border)",
                color: "var(--muted)",
                backgroundColor: "var(--card)",
              }}
              whileHover={{
                scale: 1.08,
                color: "var(--accent)",
                borderColor: "var(--accent)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon width={18} height={18} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--muted)" }}
        >
          <ArrowDown size={22} />
        </motion.div>
      </motion.button>
    </section>
  );
}
