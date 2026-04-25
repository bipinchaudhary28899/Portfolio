"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/icons";
import { personalInfo } from "@/data/portfolio";

export function Footer() {
  return (
    <footer
      className="py-10 border-t"
      style={{
        borderColor: "var(--card-border)",
        backgroundColor: "var(--muted-bg)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
          Built with{" "}
          <Heart size={13} className="inline" style={{ color: "var(--accent)" }} />{" "}
          by{" "}
          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            {personalInfo.name}
          </span>
          {" "}· {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-3">
          {[
            { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
            { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
            { icon: MailIcon, href: `mailto:${personalInfo.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--muted)" }}
              whileHover={{ color: "var(--accent)", scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon width={16} height={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
