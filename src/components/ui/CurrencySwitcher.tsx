"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe, Check } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { CURRENCY_LIST, CURRENCIES } from "@/lib/pricing";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const meta = CURRENCIES[currency];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change currency"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors"
        style={{ borderColor: "var(--border)", color: "var(--fg-dim)", background: "var(--card)" }}
      >
        <Globe size={13} style={{ color: "var(--accent)" }} />
        <span>{meta.symbol} {meta.code}</span>
        <ChevronDown
          size={13}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      <div
        className="absolute right-0 mt-2 w-52 rounded-xl border shadow-xl overflow-hidden z-20"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          transformOrigin: "top right",
        }}
      >
        {CURRENCY_LIST.map((c) => {
          const active = c.code === currency;
          return (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-sm transition-colors"
              style={{
                color: active ? "var(--accent)" : "var(--fg-dim)",
                background: active ? "color-mix(in srgb, var(--accent) 8%, transparent)" : "transparent",
              }}
            >
              <span className="flex items-center gap-2">
                <span className="w-4 text-center font-semibold">{c.symbol}</span>
                {c.label}
              </span>
              {active && <Check size={14} style={{ color: "var(--accent)" }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
