"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getTimeTheme,
  getUserTimezone,
  msUntilNextHour,
  resolveTheme,
  type ThemeMode,
  type TimeTheme,
} from "@/lib/themes";

/* ── Context shape ──────────────────────────────────────────────────────── */
interface ThemeContextValue {
  /** The user-chosen mode (auto / light / dark / system) */
  mode: ThemeMode;
  /** The data-theme value currently applied to <html> */
  activeTheme: string;
  /** Always-computed time-based theme, regardless of mode */
  timeTheme: TimeTheme;
  /** Browser IANA timezone string */
  timezone: string;
  /** Change the mode and persist to localStorage */
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "auto",
  activeTheme: "evening",
  timeTheme: "evening",
  timezone: "",
  setMode: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/* ── Provider ───────────────────────────────────────────────────────────── */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with SSR-safe defaults - identical on server and client first render.
  // localStorage and window are read only after mount to avoid hydration mismatch.
  const [mode, setModeState]     = useState<ThemeMode>("auto");
  const [timeTheme, setTimeTheme] = useState<TimeTheme>("evening");
  const [systemDark, setSystemDark] = useState(true);
  const [timezone, setTimezone]   = useState<string>("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Compute what data-theme should be applied right now ── */
  const activeTheme =
    mode === "auto" ? timeTheme : resolveTheme(mode, systemDark);

  /* ── Apply theme to <html> element ── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  /* ── On mount: read localStorage + sync time theme + track OS preference ── */
  useEffect(() => {
    // Restore saved mode
    const saved = localStorage.getItem("theme-mode") as ThemeMode | null;
    if (saved && ["auto", "light", "dark", "system"].includes(saved)) {
      setModeState(saved);
    }

    // Sync to real current time theme
    setTimeTheme(getTimeTheme());

    // Timezone display
    setTimezone(getUserTimezone());

    // Track OS dark/light preference
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const handleMq = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handleMq);
    return () => mq.removeEventListener("change", handleMq);
  }, []);

  /* ── Auto-switch at hour boundaries when mode === 'auto' ── */
  useEffect(() => {
    if (mode !== "auto") {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const schedule = () => {
      const delay = msUntilNextHour();
      timerRef.current = setTimeout(() => {
        setTimeTheme(getTimeTheme());
        schedule(); // chain next tick
      }, delay);
    };

    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [mode]);

  /* ── Exposed setter ── */
  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    localStorage.setItem("theme-mode", next);
    if (next === "auto") {
      // Immediately sync to current time theme
      setTimeTheme(getTimeTheme());
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ mode, activeTheme, timeTheme, timezone, setMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
