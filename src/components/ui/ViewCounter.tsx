"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

/** Generates (or retrieves) a session ID that persists for the browser tab. */
function getSessionId(): string {
  const key = "pf_sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const sid = getSessionId();

    // POST increments the count (server deduplicates by sid).
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sid }),
    })
      .then((r) => r.json())
      .then((data) => setViews(data.views))
      .catch(() => {
        // Fallback: just read without incrementing.
        fetch("/api/views")
          .then((r) => r.json())
          .then((data) => setViews(data.views))
          .catch(() => {});
      });
  }, []);

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-xs tabular-nums"
      style={{ color: "var(--muted)" }}
      title="Profile views"
    >
      <Eye size={13} strokeWidth={1.75} />
      {views === null ? (
        <span className="opacity-40">—</span>
      ) : (
        <span>{formatViews(views)}</span>
      )}
    </span>
  );
}
