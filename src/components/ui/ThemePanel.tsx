"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { TIME_THEME_INFO, TIME_THEME_ORDER, type ThemeMode } from "@/lib/themes";

/* ── Mode option definitions ────────────────────────────────────────────── */
const MODES: {
  id: ThemeMode;
  label: string;
  icon: string;
  desc: string;
}[] = [
  { id: "auto",   label: "Auto",   icon: "🕐", desc: "Adapts to your local time" },
  { id: "light",  label: "Light",  icon: "☀️", desc: "Warm cream & orange palette" },
  { id: "dark",   label: "Dark",   icon: "🌙", desc: "Classic Ember dark theme"  },
  { id: "system", label: "System", icon: "💻", desc: "Follows OS preference"     },
];

/* ── Small check icon ────────────────────────────────────────────────────── */
function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── ThemePanel ─────────────────────────────────────────────────────────── */
export function ThemePanel() {
  const { mode, timeTheme, timezone, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const info = TIME_THEME_INFO[timeTheme];

  /* Close on outside click or Escape */
  useEffect(() => {
    if (!open) return;
    const onMouse = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Current icon for trigger button */
  const triggerIcon =
    mode === "auto"   ? info.emoji :
    mode === "light"  ? "☀️" :
    mode === "dark"   ? "🌙" :
                        "💻";

  const triggerLabel =
    mode === "auto"
      ? info.label
      : MODES.find((m) => m.id === mode)?.label ?? "Theme";

  return (
    <div ref={panelRef} style={{ position: "relative", flexShrink: 0 }}>

      {/* ── Trigger pill ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open theme settings"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          height: 30,
          padding: "0 10px",
          borderRadius: 999,
          border: "1px solid var(--border)",
          background: open ? "var(--glow)" : "var(--card)",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 500,
          color: "var(--fg-dim)",
          whiteSpace: "nowrap",
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        <span style={{ fontSize: 13, lineHeight: 1 }}>{triggerIcon}</span>
        <span style={{ letterSpacing: "0.01em" }}>{triggerLabel}</span>
        <svg
          width="9" height="9" viewBox="0 0 9 9" fill="none"
          style={{
            opacity: 0.5,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            marginLeft: 1,
          }}
        >
          <path d="M1.5 3l3 3 3-3" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" />
        </svg>
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 256,
            borderRadius: 14,
            border: "1px solid var(--border)",
            background: "var(--card)",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
            zIndex: 200,
            animation: "themeDropIn 0.18s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {/* Auto-mode live header */}
          {mode === "auto" && (
            <div
              style={{
                padding: "10px 14px 9px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-alt)",
              }}
            >
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "var(--muted)", margin: "0 0 3px",
              }}>
                {info.timeRange}
                {timezone ? ` · ${timezone}` : ""}
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", margin: 0 }}>
                {info.emoji}&nbsp; {info.label}
                <span style={{ fontWeight: 400, color: "var(--fg-dim)", fontSize: 12 }}>
                  {" "}- {info.mood}
                </span>
              </p>
            </div>
          )}

          {/* Mode options */}
          <div style={{ padding: "6px 0" }}>
            {MODES.map((m) => {
              const active = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => { setMode(m.id); setOpen(false); }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 14px",
                    background: active
                      ? "var(--glow)"
                      : "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--bg-alt)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                  }}
                >
                  <span style={{ fontSize: 16, width: 22, textAlign: "center", flexShrink: 0 }}>
                    {m.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 13, fontWeight: 600, margin: 0,
                      color: active ? "var(--accent)" : "var(--fg)",
                    }}>
                      {m.label}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--muted)", margin: 0 }}>
                      {m.desc}
                    </p>
                  </div>
                  {active && (
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                      <Check />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      )}

      {/* Drop-in keyframe */}
      <style>{`
        @keyframes themeDropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </div>
  );
}
