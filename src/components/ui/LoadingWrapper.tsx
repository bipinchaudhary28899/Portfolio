"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { LoadingContext } from "@/context/LoadingContext";

/* Lazy-load so GSAP never blocks the initial HTML */
const LoadingScreen = dynamic(() => import("./LoadingScreen"), { ssr: false });

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [loading, setLoading] = useState(true);
  const contentRef            = useRef<HTMLDivElement>(null);

  /* Disable browser scroll restoration so it never jumps mid-page on reload */
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const handleComplete = useCallback(() => {
    /* Force back to top before revealing content */
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setLoading(false);
  }, []);

  /* Fade the page in once the loading screen has exited */
  useEffect(() => {
    if (!loading && contentRef.current) {
      /* Second guard: ensure we're at the top even if scroll happened during fade */
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      contentRef.current.style.opacity = "1";
    }
  }, [loading]);

  return (
    <LoadingContext.Provider value={!loading}>
      {loading && <LoadingScreen onComplete={handleComplete} />}

      {/*
        opacity starts at 0; the inline transition lets it fade in smoothly.
        Hero, Navbar, and any other components that use useLoadingComplete()
        will start their own GSAP timelines only after this div is revealed.
      */}
      <div
        ref={contentRef}
        style={{ opacity: 0, transition: "opacity 0.4s ease" }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
