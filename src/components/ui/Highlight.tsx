import React from "react";

/**
 * Highlight — wraps metrics and curated tech keywords in gold `.kw` spans.
 *
 * Usage: <Highlight text={personalInfo.bio} />
 *
 * It matches two kinds of tokens, longest-first, case-insensitively while
 * preserving the original casing of the source text:
 *   1. Metrics  — e.g. "40%", "30–40%", "170K+", "60 FPS", "3+ years", "<2s"
 *   2. Keywords — a curated list of stack / concept terms (below)
 */

// Curated keyword list. Longer / multi-word entries should win over shorter
// substrings, so we sort by length before building the regex.
const KEYWORDS = [
  "Full Stack AI Engineer",
  "HLS-based adaptive streaming",
  "HLS adaptive bitrate",
  "adaptive streaming",
  "adaptive bitrate",
  "scalable web systems",
  "enterprise analytics",
  "cloud-native",
  "serverless",
  "system design",
  "distributed systems",
  "scheduling engine",
  "live queue management",
  "live queue",
  "queue management",
  "Row-Level Security",
  "real-time",
  "event-driven",
  "infinite scroll",
  "AI enrichment pipeline",
  "AI-powered",
  "AI-generated",
  "WhatsApp API",
  "WhatsApp",
  "OpenAI APIs",
  "OpenAI",
  "Whisper",
  "GPT-4",
  "GPT",
  "Socket.io",
  "WebSocket",
  "Next.js",
  "Node.js",
  "Angular",
  "React",
  "AWS S3",
  "AWS",
  "Lambda",
  "FFmpeg",
  "CloudFront",
  "Redis",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "OnPush",
  "caching",
  "Zod",
  "JWT",
  "CI/CD",
  "Jasmine",
  "SAP Business Application Studio",
  "SAP HANA",
  "SAP BTP",
  "SAP BAS",
  "Vector Engine",
  "Data Structures",
  "Algorithms",
  "rail asset management",
  "automated test scripts",
  "regression testing",
  "functional",
  "TypeScript",
  "JavaScript",
  "C++",
];

// Metric patterns (order does not matter — combined via alternation).
const METRIC_PATTERNS = [
  String.raw`[~<>]?\d+(?:\.\d+)?(?:\s?[–-]\s?\d+(?:\.\d+)?)?\s?%`, // 40%, 30–40%, ~30%
  String.raw`\b\d+\+?\s?(?:years?|FPS)\b`, // 3+ years, 60 FPS
  String.raw`\b\d+K\+?\b`, // 170K+
  String.raw`<\s?\d+(?:\.\d+)?\s?(?:ms|s)\b`, // <2s, <200ms
  String.raw`\bsub-second\b`,
  String.raw`\b\d+p(?:\s?/\s?\d+p)*\b`, // 360p, 360p/720p
  String.raw`\b\d+\+`, // 350+, 10+, 5+
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const KEYWORD_PATTERNS = KEYWORDS.slice()
  .sort((a, b) => b.length - a.length)
  .map(escapeRegExp);

const MASTER = `(?:${[...METRIC_PATTERNS, ...KEYWORD_PATTERNS].join("|")})`;

export function Highlight({ text }: { text: string }) {
  const re = new RegExp(MASTER, "gi");
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m[0].length === 0) {
      re.lastIndex++;
      continue;
    }
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <span className="kw" key={`${m.index}-${m[0]}`}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));

  return <>{out}</>;
}
