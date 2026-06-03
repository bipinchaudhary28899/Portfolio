/* ═══════════════════════════════════════════════════════════════
   Mr. Dexy — Knowledge Layer
   ---------------------------------------------------------------
   Serializes the ENTIRE portfolio dataset into a plain-text
   knowledge context that is injected into every LLM request.

   Why import-and-serialize instead of a hardcoded string?
   → Whatever you add to portfolio.ts (new project, skill, role,
     certification…) automatically flows into Dexy's knowledge.
     No re-indexing, no embeddings, single source of truth.
═══════════════════════════════════════════════════════════════ */

import {
  personalInfo,
  projects,
  skills,
  experiences,
  education,
  codingPlatforms,
  openSourceContributions,
  certifications,
} from "@/data/portfolio";

/** Pretty-print any value into readable, indented text. */
function render(value: unknown, depth = 0): string {
  const pad = "  ".repeat(depth);

  if (value === null || value === undefined) return "";

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item && typeof item === "object") {
          return `${pad}-\n${render(item, depth + 1)}`;
        }
        return `${pad}- ${String(item)}`;
      })
      .join("\n");
  }

  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !isNoiseKey(key))
      .map(([key, val]) => {
        if (val && typeof val === "object") {
          return `${pad}${label(key)}:\n${render(val, depth + 1)}`;
        }
        const str = String(val);
        if (!str.trim()) return "";
        return `${pad}${label(key)}: ${str}`;
      })
      .filter(Boolean)
      .join("\n");
  }

  return `${pad}${String(value)}`;
}

/** Keys that are presentational only and add no knowledge value. */
const NOISE_KEYS = new Set([
  "id",
  "logo",
  "image",
  "numeric",
  "suffix",
  "float",
]);
function isNoiseKey(key: string) {
  return NOISE_KEYS.has(key);
}

/** Turn camelCase keys into Title Case labels. Keys that are already
    human-readable (contain a space or punctuation) are left untouched. */
function label(key: string): string {
  if (/[^a-zA-Z]/.test(key)) return key; // already formatted (e.g. "AI / ML")
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function section(title: string, body: string): string {
  return `\n### ${title}\n${body}\n`;
}

/**
 * Build the full knowledge context. Called fresh on every request so
 * it always reflects the latest portfolio.ts content.
 */
export function buildKnowledgeContext(): string {
  const parts: string[] = [];

  parts.push(section("PERSONAL / RESUME SUMMARY", render(personalInfo)));
  parts.push(section("SKILLS", render(skills)));
  parts.push(section("EXPERIENCE", render(experiences)));
  parts.push(section("PROJECTS (with full case studies)", render(projects)));
  parts.push(section("EDUCATION", render(education)));
  parts.push(section("CERTIFICATIONS", render(certifications)));
  parts.push(section("CODING PLATFORMS", render(codingPlatforms)));
  parts.push(
    section("OPEN SOURCE CONTRIBUTIONS", render(openSourceContributions)),
  );

  return parts.join("\n");
}
