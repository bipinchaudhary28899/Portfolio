"use client";

/* ═══════════════════════════════════════════════════════════════
   Mr. Dexy - Floating AI Portfolio Assistant
   ---------------------------------------------------------------
   A bottom-right chat bubble that opens a panel. Streams answers
   from /api/dexy. Themed entirely with the site's CSS variables
   so it adapts to every time-aware palette.
═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState, useCallback } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useCloseOnBack } from "@/hooks/useCloseOnBack";

type Role = "user" | "assistant";
interface Msg {
  role: Role;
  content: string;
}

const STARTERS = [
  "What technologies does Bipin know?",
  "Tell me about StreamSphere.",
  "Why should we hire Bipin?",
  "What AWS services has Bipin used?",
];

const GREETING = `Hi! I'm Mr. Dexy, ${personalInfo.firstName}'s AI portfolio assistant. Ask me anything about his projects, skills, or experience.`;

/* Rotating teaser questions shown in a bubble above the closed
   launcher, to invite people to actually use the assistant.
   Clicking the bubble opens the chat and asks the shown question. */
const TEASERS = [
  `Why should you hire ${personalInfo.firstName}?`,
  `What technologies does ${personalInfo.firstName} know?`,
  "Tell me about StreamSphere",
  "What's the story behind Argumint?",
  `How much AWS experience does ${personalInfo.firstName} have?`,
  `What's ${personalInfo.firstName}'s strongest skill?`,
  "Walk me through a project's architecture",
];

/* Split an assistant message into the main answer and the
   "You may also ask:" suggestion block, so we can render the
   suggestions as clickable chips. */
function splitSuggestions(text: string): { body: string; suggestions: string[] } {
  const idx = text.search(/you may also ask\s*:/i);
  if (idx === -1) return { body: text, suggestions: [] };
  const body = text.slice(0, idx).trim();
  const tail = text.slice(idx);
  const suggestions = tail
    .split("\n")
    .map((l) => l.replace(/^[\s•\-*]+/, "").trim())
    .filter((l) => l && !/you may also ask/i.test(l))
    .slice(0, 3);
  return { body, suggestions };
}

export function DexyAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [loading, setLoading] = useState(false);
  const [teaserIdx, setTeaserIdx] = useState(0);
  const [teaserReady, setTeaserReady] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Back button closes the chat instead of leaving the site */
  useCloseOnBack(open, () => setOpen(false));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  /* Reveal the teaser shortly after load so it animates in gently. */
  useEffect(() => {
    const t = setTimeout(() => setTeaserReady(true), 1100);
    return () => clearTimeout(t);
  }, []);

  /* Cycle the teaser question while the panel is closed. */
  useEffect(() => {
    if (open || teaserDismissed) return;
    const id = setInterval(() => setTeaserIdx((i) => (i + 1) % TEASERS.length), 3600);
    return () => clearInterval(id);
  }, [open, teaserDismissed]);

  const showTeaser = !open && teaserReady && !teaserDismissed;

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || loading) return;

      const next: Msg[] = [...messages, { role: "user", content: question }];
      setMessages([...next, { role: "assistant", content: "" }]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/dexy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });

        if (!res.ok || !res.body) {
          const { error } = await res.json().catch(() => ({ error: "" }));
          throw new Error(error || "Request failed");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: acc };
            return copy;
          });
        }
      } catch (e) {
        const message =
          e instanceof Error && e.message
            ? `Sorry - ${e.message}. Please try again.`
            : "Sorry, something went wrong. Please try again.";
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: message };
          return copy;
        });
      } finally {
        setLoading(false);
      }
    },
    [messages, loading],
  );

  /* Open the panel and immediately ask the given question. */
  const openWith = useCallback(
    (q: string) => {
      setTeaserDismissed(true);
      setOpen(true);
      setTimeout(() => send(q), 80);
    },
    [send],
  );

  return (
    <>
      {/* ── Rotating teaser bubble (only while closed) ── */}
      {showTeaser && (
        <div style={teaserWrapStyle} className="dexy-teaser">
          <button
            type="button"
            onClick={() => openWith(TEASERS[teaserIdx])}
            style={teaserButtonStyle}
            aria-label={`Ask Mr. Dexy: ${TEASERS[teaserIdx]}`}
          >
            <span style={teaserLabelStyle}>Ask Mr. Dexy</span>
            <span key={teaserIdx} className="dexy-teaser-q" style={teaserQuestionStyle}>
              {TEASERS[teaserIdx]}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTeaserDismissed(true)}
            aria-label="Dismiss suggestions"
            style={teaserCloseStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            <X size={13} />
          </button>
          <span style={teaserTailStyle} />
          <style>{`
            @keyframes dexy-teaser-pop {
              0% { opacity: 0; transform: translateY(8px) scale(.96); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes dexy-teaser-q {
              0% { opacity: 0; transform: translateY(6px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .dexy-teaser { animation: dexy-teaser-pop .35s ease both; }
            .dexy-teaser-q { animation: dexy-teaser-q .4s ease both; display: block; }
          `}</style>
        </div>
      )}

      {/* ── Attention pulse ring (only while teaser is visible) ── */}
      {showTeaser && (
        <span aria-hidden style={pulseRingStyle}>
          <style>{`
            @keyframes dexy-pulse {
              0% { transform: scale(1); opacity: .55; }
              70% { transform: scale(1.6); opacity: 0; }
              100% { transform: scale(1.6); opacity: 0; }
            }
          `}</style>
        </span>
      )}

      {/* ── Launcher bubble ── */}
      <button
        aria-label={open ? "Close assistant" : "Ask Mr. Dexy"}
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 60,
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "9999px",
          border: "1px solid var(--border)",
          background: "linear-gradient(135deg, var(--grad-a), var(--grad-b))",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-lg)",
          cursor: "pointer",
          transition: "transform .18s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? <X size={24} /> : <Bot size={26} />}
      </button>

      {/* ── Mobile backdrop blur (behind the panel) ── */}
      {open && (
        <div
          className="md:hidden"
          aria-hidden
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 59,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        />
      )}

      {/* ── Chat panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Mr. Dexy assistant"
          style={{
            position: "fixed",
            bottom: "5.5rem",
            right: "1.5rem",
            zIndex: 60,
            width: "min(380px, calc(100vw - 3rem))",
            height: "min(560px, calc(100vh - 7.5rem))",
            display: "flex",
            flexDirection: "column",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
          }}
        >
          {/* header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".6rem",
              padding: ".85rem 1rem",
              borderBottom: "1px solid var(--border)",
              background: "var(--bg-alt)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2rem",
                height: "2rem",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, var(--grad-a), var(--grad-b))",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              <Sparkles size={16} />
            </span>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontWeight: 600, color: "var(--fg)", fontSize: ".95rem" }}>
                Mr. Dexy
              </div>
              <div style={{ fontSize: ".72rem", color: "var(--muted)" }}>
                {personalInfo.firstName}&apos;s Portfolio Assistant
              </div>
            </div>
          </div>

          {/* messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              overscrollBehavior: "contain",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: ".75rem",
            }}
          >
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const { body, suggestions } =
                m.role === "assistant" ? splitSuggestions(m.content) : { body: m.content, suggestions: [] };
              const isStreamingEmpty = m.role === "assistant" && !m.content && loading;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                  <div
                    style={{
                      alignSelf: isUser ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                      padding: ".6rem .8rem",
                      borderRadius: isUser ? "1rem 1rem .25rem 1rem" : "1rem 1rem 1rem .25rem",
                      background: isUser ? "var(--accent)" : "var(--bg-alt)",
                      color: isUser ? "#fff" : "var(--fg)",
                      border: isUser ? "none" : "1px solid var(--border)",
                      fontSize: ".88rem",
                      lineHeight: 1.5,
                      whiteSpace: isUser ? "pre-wrap" : "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {isStreamingEmpty ? (
                      <TypingDots />
                    ) : isUser ? (
                      body
                    ) : (
                      <DexyMarkdown text={body} />
                    )}
                  </div>

                  {/* suggestion chips */}
                  {suggestions.length > 0 && !loading && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: ".1rem" }}>
                      {suggestions.map((s, j) => (
                        <button
                          key={j}
                          onClick={() => send(s)}
                          style={chipStyle}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* starter chips (only before first question) */}
            {messages.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: ".25rem" }}>
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={chipStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            style={{
              display: "flex",
              gap: ".5rem",
              padding: ".75rem",
              borderTop: "1px solid var(--border)",
              background: "var(--bg-alt)",
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Bipin's work…"
              disabled={loading}
              style={{
                flex: 1,
                padding: ".55rem .75rem",
                borderRadius: ".6rem",
                border: "1px solid var(--border)",
                background: "var(--card)",
                color: "var(--fg)",
                fontSize: ".88rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={loading || !input.trim()}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.4rem",
                borderRadius: ".6rem",
                border: "none",
                background: "linear-gradient(135deg, var(--grad-a), var(--grad-b))",
                color: "#fff",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.6 : 1,
              }}
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const chipStyle: React.CSSProperties = {
  padding: ".35rem .6rem",
  borderRadius: "9999px",
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--fg-dim)",
  fontSize: ".76rem",
  cursor: "pointer",
  transition: "border-color .15s ease",
  textAlign: "left",
};

/* ── Teaser bubble styles ── */
const teaserWrapStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "5.4rem",
  right: "1.5rem",
  zIndex: 59,
  display: "flex",
  alignItems: "stretch",
  gap: ".25rem",
  maxWidth: "min(264px, calc(100vw - 3rem))",
  padding: ".55rem .5rem .55rem .7rem",
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: ".85rem",
  boxShadow: "var(--shadow-lg)",
};

const teaserButtonStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: ".15rem",
  border: "none",
  background: "transparent",
  padding: 0,
  cursor: "pointer",
  textAlign: "left",
  minWidth: 0,
};

const teaserLabelStyle: React.CSSProperties = {
  fontSize: ".64rem",
  fontWeight: 600,
  letterSpacing: ".04em",
  textTransform: "uppercase",
  color: "var(--muted)",
};

const teaserQuestionStyle: React.CSSProperties = {
  fontSize: ".86rem",
  fontWeight: 600,
  lineHeight: 1.3,
  color: "var(--accent)",
};

const teaserCloseStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  border: "none",
  background: "transparent",
  color: "var(--muted)",
  cursor: "pointer",
  padding: ".05rem",
  flexShrink: 0,
  transition: "color .15s ease",
};

const teaserTailStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "-6px",
  right: "20px",
  width: "11px",
  height: "11px",
  background: "var(--card)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid var(--border)",
  transform: "rotate(45deg)",
};

const pulseRingStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "1.5rem",
  right: "1.5rem",
  width: "3.5rem",
  height: "3.5rem",
  borderRadius: "9999px",
  background: "var(--accent)",
  zIndex: 59,
  pointerEvents: "none",
  animation: "dexy-pulse 2.4s ease-out infinite",
};

/* ── Minimal Markdown renderer (no external deps) ──────────────
   Supports: **bold**, *italic* / _italic_, `code`, bullet lists
   (-, *, •), numbered lists, and paragraphs. Unclosed tokens that
   appear mid-stream (e.g. a lone "**") are rendered as plain text
   until their closing marker arrives, so streaming never breaks.   */

const codeStyle: React.CSSProperties = {
  background: "var(--bg)",
  border: "1px solid var(--border)",
  borderRadius: ".3rem",
  padding: "0 .28rem",
  fontSize: ".82em",
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
};

const listStyle: React.CSSProperties = {
  margin: "0 0 .5rem",
  paddingLeft: "1.15rem",
};

const linkStyle: React.CSSProperties = {
  color: "var(--accent)",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
  wordBreak: "break-word",
};

function renderInline(text: string, kp: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // order matters: links first, then **bold** before *italic*; `code` is greedy-safe
  const re =
    /(\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*\n]+)\*|_([^_\n]+)_)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined && m[3] !== undefined)
      nodes.push(
        <a
          key={`${kp}-l${i}`}
          href={m[3]}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          {m[2]}
        </a>,
      );
    else if (m[4] !== undefined) nodes.push(<strong key={`${kp}-b${i}`}>{m[4]}</strong>);
    else if (m[5] !== undefined)
      nodes.push(<code key={`${kp}-c${i}`} style={codeStyle}>{m[5]}</code>);
    else if (m[6] !== undefined) nodes.push(<em key={`${kp}-i${i}`}>{m[6]}</em>);
    else if (m[7] !== undefined) nodes.push(<em key={`${kp}-u${i}`}>{m[7]}</em>);
    last = re.lastIndex;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const BULLET = /^\s*[-*•]\s+/;
const NUMBERED = /^\s*\d+[.)]\s+/;
const HEADING = /^(#{1,6})\s+(.*)$/;

function DexyMarkdown({ text }: { text: string }) {
  const lines = text.replace(/\r/g, "").split("\n");
  const blocks: React.ReactNode[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const hm = line.match(HEADING);
    if (hm) {
      const level = hm[1].length;
      blocks.push(
        <div
          key={`h${key++}`}
          style={{
            fontWeight: 700,
            fontSize: level <= 2 ? "1.02rem" : ".95rem",
            color: "var(--fg)",
            margin: blocks.length ? ".7rem 0 .3rem" : "0 0 .3rem",
          }}
        >
          {renderInline(hm[2], `h${key}`)}
        </div>,
      );
      i++;
      continue;
    }

    if (BULLET.test(line)) {
      const items: string[] = [];
      while (i < lines.length && BULLET.test(lines[i])) {
        items.push(lines[i].replace(BULLET, ""));
        i++;
      }
      blocks.push(
        <ul key={`ul${key++}`} style={listStyle}>
          {items.map((it, j) => (
            <li key={j} style={{ marginBottom: ".2rem" }}>
              {renderInline(it, `li${key}-${j}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (NUMBERED.test(line)) {
      const items: string[] = [];
      while (i < lines.length && NUMBERED.test(lines[i])) {
        items.push(lines[i].replace(NUMBERED, ""));
        i++;
      }
      blocks.push(
        <ol key={`ol${key++}`} style={listStyle}>
          {items.map((it, j) => (
            <li key={j} style={{ marginBottom: ".2rem" }}>
              {renderInline(it, `oli${key}-${j}`)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !BULLET.test(lines[i]) &&
      !NUMBERED.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={`p${key++}`} style={{ margin: "0 0 .5rem" }}>
        {para.map((pl, j) => (
          <span key={j}>
            {renderInline(pl, `p${key}-${j}`)}
            {j < para.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>,
    );
  }

  return (
    <div style={{ display: "block" }} className="dexy-md">
      {blocks}
      <style>{`.dexy-md > *:last-child{margin-bottom:0!important}`}</style>
    </div>
  );
}

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: ".22rem", alignItems: "center", height: "1.2em" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: ".4rem",
            height: ".4rem",
            borderRadius: "9999px",
            background: "var(--muted)",
            animation: "dexy-bounce 1.2s infinite ease-in-out",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <style>{`@keyframes dexy-bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-3px);opacity:1}}`}</style>
    </span>
  );
}
