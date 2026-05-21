"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

/* Lazy-load so the heavy GSAP bundle never blocks the initial HTML */
const LoadingScreen = dynamic(() => import("./LoadingScreen"), { ssr: false });

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [loading, setLoading]   = useState(true);
  const contentRef              = useRef<HTMLDivElement>(null);

  /* Reveal the page content once the loading animation finishes */
  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && contentRef.current) {
      /* Small rAF ensures the DOM has re-painted with display:block */
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.style.transition = "opacity 0.4s ease";
          contentRef.current.style.opacity    = "1";
        }
      });
    }
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleComplete} />}

      {/* Wrap the full app shell so Navbar + page fade in together */}
      <div
        ref={contentRef}
        style={{ opacity: 0 }}
      >
        {children}
      </div>
    </>
  );
}
