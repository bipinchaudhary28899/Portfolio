"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  type CurrencyCode,
  DEFAULT_CURRENCY,
  isCurrencyCode,
  currencyForCountry,
} from "@/lib/pricing";

interface CurrencyCtx {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyCtx>({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
});

export const useCurrency = () => useContext(CurrencyContext);

const LS_KEY = "pf-currency";
const LS_MANUAL = "pf-currency-manual";

function readCookieCountry(): string | null {
  const m = document.cookie.match(/(?:^|;\s*)country=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Start at the default on the server AND the first client render so the
  // markup matches and React doesn't throw a hydration mismatch. The real
  // currency is resolved in the effect below, one render later.
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  /** Manual override from the currency switcher — wins over auto-detect. */
  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(LS_KEY, c);
      localStorage.setItem(LS_MANUAL, "1");
    } catch {
      /* ignore storage errors (private mode etc.) */
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Resolve the currency after mount (browser-only APIs). Kept inside an
    // async task so we never set state on the synchronous effect path.
    (async () => {
      // 1. Respect a previous manual choice.
      try {
        if (localStorage.getItem(LS_MANUAL) === "1") {
          const saved = localStorage.getItem(LS_KEY);
          if (isCurrencyCode(saved)) {
            if (!cancelled) setCurrencyState(saved);
            return;
          }
        }
      } catch {
        /* ignore */
      }

      // 2. Vercel geo cookie (set by middleware) — fastest, most reliable.
      const fromCookie = readCookieCountry();
      if (fromCookie) {
        if (!cancelled) setCurrencyState(currencyForCountry(fromCookie));
        return;
      }

      // 3. Fallback: IP lookup, then locale region. Only runs when there's no
      //    geo cookie (e.g. not deployed on Vercel).
      try {
        const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data?.country_code) {
            setCurrencyState(currencyForCountry(String(data.country_code)));
            return;
          }
        }
      } catch {
        /* ipapi blocked / offline — fall through */
      }
      if (!cancelled) {
        const region = (navigator.language || "").split("-")[1];
        if (region) setCurrencyState(currencyForCountry(region));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Cache the resolved currency so repeat visits are instant (auto-detect only).
  useEffect(() => {
    try {
      if (localStorage.getItem(LS_MANUAL) !== "1") {
        localStorage.setItem(LS_KEY, currency);
      }
    } catch {
      /* ignore */
    }
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
