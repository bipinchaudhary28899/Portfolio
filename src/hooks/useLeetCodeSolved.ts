"use client";

import { useEffect, useState } from "react";

interface LeetCodeData {
  total:   number;
  floored: number;
  stat:    string; // e.g. "390+"
}

interface State {
  data:    LeetCodeData | null;
  loading: boolean;
  error:   boolean;
}

export function useLeetCodeSolved(): State {
  const [state, setState] = useState<State>({ data: null, loading: true, error: false });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leetcode")
      .then((r) => {
        if (!r.ok) throw new Error("non-ok");
        return r.json();
      })
      .then((d: LeetCodeData) => {
        if (!cancelled) setState({ data: d, loading: false, error: false });
      })
      .catch(() => {
        if (!cancelled) setState({ data: null, loading: false, error: true });
      });
    return () => { cancelled = true; };
  }, []);

  return state;
}
