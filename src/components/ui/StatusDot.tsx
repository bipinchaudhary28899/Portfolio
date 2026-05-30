"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "up" | "down";

export function StatusDot({ url }: { url: string }) {
  const [status, setStatus] = useState<Status>("checking");
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    if (!url || url === "#") return;
    fetch(`/api/status?url=${encodeURIComponent(url)}`)
      .then(r => r.json())
      .then(({ up, latency: ms }: { up: boolean; latency: number }) => {
        setStatus(up ? "up" : "down");
        setLatency(ms);
      })
      .catch(() => setStatus("down"));
  }, [url]);

  const color =
    status === "checking" ? "var(--muted)"
    : status === "up"     ? "#22c55e"
    :                       "#f87171";

  const label =
    status === "checking" ? "Checking…"
    : status === "up"     ? `Live${latency !== null ? ` · ${latency}ms` : ""}`
    :                       "Offline";

  return (
    <span
      title={label}
      className="relative flex items-center gap-1.5 text-xs font-mono"
      style={{ color: "var(--muted)" }}
    >
      {/* dot */}
      <span className="relative flex h-2 w-2">
        {status === "up" && (
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ background: color }}
          />
        )}
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ background: color }}
        />
      </span>
      <span style={{ fontSize: "0.68rem", letterSpacing: "0.02em" }}>{label}</span>
    </span>
  );
}
