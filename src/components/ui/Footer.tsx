import { personalInfo } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  return (
    <footer
      className="border-t py-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        © {new Date().getFullYear()} Bipin Kumar Chaudhary — Built with Next.js &amp; GSAP
      </p>
      <div className="flex items-center gap-5">
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          className="transition-colors hover:text-white" style={{ color: "var(--muted)" }}>
          <GithubIcon width={18} height={18} />
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className="transition-colors hover:text-white" style={{ color: "var(--muted)" }}>
          <LinkedinIcon width={18} height={18} />
        </a>
        <a href={`mailto:${personalInfo.email}`}
          className="text-sm font-medium transition-colors hover:text-white" style={{ color: "var(--accent)" }}>
          {personalInfo.email}
        </a>
      </div>
    </footer>
  );
}
