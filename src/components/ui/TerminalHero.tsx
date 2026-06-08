"use client";

import { useEffect, useRef, useState } from "react";

const COMMANDS = [
  { prompt: "$ git push origin main", output: "✓  Deployed to production" },
  { prompt: "$ node benchmark.js", output: "✓  Latency p99: 42ms  (-40%)" },
  { prompt: "$ ffmpeg -i raw.mp4 -hls_time 4 out.m3u8", output: "✓  3 adaptive bitrate segments ready" },
  { prompt: "$ redis-cli PING", output: "✓  PONG - cache hot" },
  { prompt: "$ docker build -t streamsphere .", output: "✓  Image built in 11.2s" },
  { prompt: "$ psql -c 'EXPLAIN ANALYZE ...'", output: "✓  Query plan: Index Scan  (0.8ms)" },
];

const TYPING_SPEED   = 38;   // ms per char
const OUTPUT_DELAY   = 320;  // ms after prompt finishes before output appears
const HOLD_DURATION  = 1800; // ms to show completed line before next
const CLEAR_DELAY    = 500;  // ms blank pause between cycles

export function TerminalHero() {
  const [promptText, setPromptText]   = useState("");
  const [outputText, setOutputText]   = useState("");
  const [showCursor, setShowCursor]   = useState(true);
  const [showOutput, setShowOutput]   = useState(false);
  const cmdIdx  = useRef(0);

  useEffect(() => {
    // NOTE: do NOT guard this with a "already mounted" ref. On desktop, Next's
    // client-side back/forward cache restores this component when you return to
    // the home page from /blog or /interviews and re-runs this effect. A mount
    // guard would bail here while the previous run's cleanup has already set
    // `cancelled = true`, freezing the terminal. The per-run `cancelled` flag
    // below already makes a double-invoke (React StrictMode) safe on its own.

    // restart cleanly from the first command on every (re)mount / restore
    cmdIdx.current = 0;

    // blinking cursor
    const cursorInterval = setInterval(() => setShowCursor(c => !c), 530);

    let cancelled = false;

    async function sleep(ms: number) {
      return new Promise<void>(r => setTimeout(r, ms));
    }

    async function typeLoop() {
      while (!cancelled) {
        const { prompt, output } = COMMANDS[cmdIdx.current % COMMANDS.length];
        cmdIdx.current++;

        // type prompt char by char
        setPromptText("");
        setOutputText("");
        setShowOutput(false);

        for (let i = 1; i <= prompt.length; i++) {
          if (cancelled) return;
          setPromptText(prompt.slice(0, i));
          await sleep(TYPING_SPEED + (Math.random() * 18 - 9));
        }

        await sleep(OUTPUT_DELAY);
        if (cancelled) return;
        setOutputText(output);
        setShowOutput(true);

        await sleep(HOLD_DURATION);
        if (cancelled) return;

        // clear
        setPromptText("");
        setOutputText("");
        setShowOutput(false);
        await sleep(CLEAR_DELAY);
      }
    }

    typeLoop();
    return () => {
      cancelled = true;
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div
      className="mt-6 font-mono text-xs sm:text-sm rounded-lg px-4 py-3 flex flex-col max-w-sm sm:max-w-md"
      style={{
        background: "var(--card)",
        border:     "1px solid var(--border)",
        color:      "var(--fg-dim)",
        boxShadow:  "var(--shadow-sm)",
      }}
    >
      {/* dots - fixed height row */}
      <div className="flex items-center gap-1.5 mb-2" style={{ height: "1rem" }}>
        <span className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 text-xs opacity-40">bipin@portfolio ~</span>
      </div>

      {/* prompt line - fixed height, no wrap */}
      <div
        className="flex items-center overflow-hidden"
        style={{ height: "1.4em", color: "var(--accent)", whiteSpace: "nowrap" }}
      >
        <span style={{ overflow: "hidden", textOverflow: "clip" }}>{promptText}</span>
        <span
          style={{
            display:        "inline-block",
            width:          "2px",
            height:         "1em",
            marginLeft:     "1px",
            background:     "var(--accent)",
            opacity:        showCursor ? 1 : 0,
            transition:     "opacity 0.1s",
            flexShrink:     0,
            verticalAlign:  "middle",
          }}
        />
      </div>

      {/* output line - fixed height, always rendered */}
      <div
        style={{
          height:     "1.4em",
          color:      "#22c55e",
          opacity:    showOutput ? 1 : 0,
          transition: "opacity 0.25s",
          whiteSpace: "nowrap",
          overflow:   "hidden",
          marginTop:  "0.2em",
        }}
      >
        {outputText || " "}
      </div>
    </div>
  );
}
