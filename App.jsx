import { useState, useEffect, useRef } from "react";
import LoadingScreen from "./LoadingScreen";

/*
  Drop these CSS variables into your :root / global stylesheet:

  :root {
    --bg-primary:   #09090d;
    --accent-from:  #6366f1;
    --accent-to:    #a855f7;
    --text-primary: #f1f5f9;
    --text-muted:   #64748b;
  }
*/

export default function App() {
  const [loading, setLoading]   = useState(true);
  const contentRef              = useRef(null);

  /* Reveal main content once loading finishes */
  useEffect(() => {
    if (!loading && contentRef.current) {
      contentRef.current.style.transition = "opacity 0.4s ease";
      contentRef.current.style.opacity    = "1";
    }
  }, [loading]);

  return (
    <>
      {/* ── Loading overlay ── */}
      {loading && (
        <LoadingScreen
          name="Bipin Chaudhary"
          role="Creative Developer"
          onComplete={() => setLoading(false)}
        />
      )}

      {/* ── Main page content ── */}
      <main
        ref={contentRef}
        style={{
          opacity: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontSize: "1.25rem",
        }}
      >
        <p>Your portfolio content goes here.</p>
      </main>
    </>
  );
}
