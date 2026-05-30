"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { personalInfo, projects, experiences, skills } from "@/data/portfolio";

/* ─── command registry ─────────────────────────────────── */
const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "  whoami          — who is this engineer?",
    "  ls projects     — list shipped projects",
    "  cat experience  — print work history",
    "  cat skills      — tech stack dump",
    "  ping bipin      — say hello",
    "  open github     — launch GitHub profile",
    "  open linkedin   — launch LinkedIn profile",
    "  clear           — clear terminal",
    "  exit            — close this terminal",
  ],
  whoami: () => [
    `${personalInfo.name}`,
    `Role   : ${personalInfo.role}`,
    `Based  : ${personalInfo.location}`,
    `Email  : ${personalInfo.email}`,
    ...personalInfo.achievements.map(a => `✓  ${a}`),
  ],
  "ls projects": () =>
    projects.map(
      (p, i) =>
        `${String(i + 1).padStart(2, " ")}.  ${p.title.padEnd(20)} ${p.tech.slice(0, 3).join(", ")}`,
    ),
  "cat experience": () =>
    experiences.map(
      e => `[${e.period}]  ${e.role} @ ${e.company}`,
    ),
  "cat skills": () =>
    Object.entries(skills).map(
      ([cat, items]) => `${cat.padEnd(18)} ${(items as string[]).join("  ·  ")}`,
    ),
  "ping bipin": () => [
    "PING bipin@portfolio ...",
    "64 bytes from bipin: icmp_seq=1 ttl=64 time=1ms",
    "64 bytes from bipin: icmp_seq=2 ttl=64 time=1ms",
    `--- Hire me at ${personalInfo.email} ---`,
    "1 engineer available, 0% packet loss",
  ],
  "open github": () => {
    window.open(personalInfo.github, "_blank");
    return ["Opening GitHub…"];
  },
  "open linkedin": () => {
    window.open(personalInfo.linkedin, "_blank");
    return ["Opening LinkedIn…"];
  },
};

type Line = { type: "input" | "output" | "error" | "system"; text: string };

const BOOT_LINES: Line[] = [
  { type: "system", text: "bipin-portfolio v1.0.0  (Next.js / TypeScript)" },
  { type: "system", text: 'Type "help" to see available commands.' },
  { type: "system", text: "---separator---" },
];

const TRIGGER = "bipin";

export function CLIEasterEgg() {
  const [open, setOpen]       = useState(false);
  const [lines, setLines]     = useState<Line[]>(BOOT_LINES);
  const [input, setInput]     = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const buffer    = useRef("");

  /* ── listen for programmatic open (e.g. mobile tap button) ── */
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-cli", handler);
    return () => window.removeEventListener("open-cli", handler);
  }, []);

  /* ── global keypress listener for trigger word ── */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // ignore when CLI is open or user is in an input
      if (open) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key.length === 1) {
        buffer.current = (buffer.current + e.key).slice(-TRIGGER.length);
        if (buffer.current === TRIGGER) {
          buffer.current = "";
          setOpen(true);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* ── focus input when opened ── */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  /* ── auto-scroll ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const close = useCallback(() => {
    setOpen(false);
    setLines(BOOT_LINES);
    setInput("");
    setHistory([]);
    setHistIdx(-1);
  }, []);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory(h => [raw, ...h]);
    setHistIdx(-1);

    const echo: Line = { type: "input", text: `$ ${raw}` };

    if (cmd === "clear") {
      setLines(BOOT_LINES);
      return;
    }
    if (cmd === "exit") {
      close();
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      const out = handler().map(t => ({ type: "output" as const, text: t }));
      setLines(l => [...l, echo, ...out]);
    } else {
      setLines(l => [
        ...l,
        echo,
        { type: "error", text: `Command not found: ${cmd}  (try "help")` },
      ]);
    }
  }, [close]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx(i => {
        const next = Math.min(i + 1, history.length - 1);
        setInput(history[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx(i => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : history[next] ?? "");
        return next;
      });
    } else if (e.key === "Escape") {
      close();
    }
  }

  if (!open) return null;

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) close(); }}
    >
      {/* window */}
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden flex flex-col"
        style={{
          background:  "var(--card)",
          border:      "1px solid var(--border)",
          boxShadow:   "var(--shadow-lg)",
          height:      "min(560px, 85svh)",
          fontFamily:  "var(--font-geist-mono), monospace",
        }}
      >
        {/* title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 shrink-0"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-alt)" }}
        >
          <button onClick={close}
            className="w-3 h-3 rounded-full transition-opacity hover:opacity-70"
            style={{ background: "#ff5f57" }} aria-label="Close" />
          <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          <span className="ml-3 text-xs truncate" style={{ color: "var(--muted)" }}>
            bipin@portfolio — bash
          </span>
          <span className="ml-auto text-xs whitespace-nowrap hidden sm:inline" style={{ color: "var(--muted)" }}>
            esc / click outside to close
          </span>
        </div>

        {/* output area */}
        <div
          className="flex-1 overflow-y-auto px-5 py-4 text-xs sm:text-sm leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) =>
            line.text === "---separator---" ? (
              <div key={i} style={{ borderBottom: "1px solid var(--border)", margin: "4px 0" }} />
            ) : (
              <div key={i} style={{ color: lineColor(line.type), whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {line.text}
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>

        {/* input row */}
        <div
          className="shrink-0 flex items-center gap-2 px-4 py-3"
          style={{ borderTop: "1px solid var(--border)", background: "var(--bg-alt)" }}
        >
          <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent text-xs sm:text-sm"
            style={{
              color:             "var(--fg)",
              caretColor:        "var(--accent)",
              outline:           "none",
              WebkitAppearance:  "none",
              boxShadow:         "none",
            }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="type a command…"
          />
          <button
            onPointerDown={e => {
              e.preventDefault(); // prevent input blur on mobile
              runCommand(input);
              setInput("");
              inputRef.current?.focus();
            }}
            aria-label="Run command"
            style={{
              flexShrink:   0,
              padding:      "6px 10px",
              borderRadius: "6px",
              border:       "1px solid var(--accent)",
              background:   "color-mix(in srgb, var(--accent) 12%, transparent)",
              color:        "var(--accent)",
              fontSize:     "0.75rem",
              fontFamily:   "inherit",
              cursor:       "pointer",
            }}
          >
            ↵
          </button>
        </div>
      </div>
    </div>
  );
}

function lineColor(type: Line["type"]) {
  switch (type) {
    case "input":  return "var(--accent)";
    case "error":  return "#f87171";
    case "system": return "var(--muted)";
    default:       return "var(--fg-dim)";
  }
}
