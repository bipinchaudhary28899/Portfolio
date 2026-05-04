"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  /* Read saved preference on mount */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const theme = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        width: 48,
        height: 26,
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: dark ? "var(--card)" : "#fff0e6",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Sliding knob */}
      <span
        style={{
          position: "absolute",
          top: 3,
          left: dark ? "calc(100% - 22px)" : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--grad-a), var(--grad-b))",
          boxShadow: "0 1px 4px rgba(0,0,0,.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "left 0.28s cubic-bezier(.4,0,.2,1)",
          fontSize: 10,
        }}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
