"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, X } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useCloseOnBack } from "@/hooks/useCloseOnBack";

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  /* Back button closes the modal instead of leaving the site */
  useCloseOnBack(true, onClose);

  useEffect(() => {
    setMounted(true);
    const savedY = window.scrollY;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.scrollTo({ top: savedY, behavior: "instant" });
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[998] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{
          height:     "min(90svh, 900px)",
          background: "var(--card)",
          border:     "1px solid var(--border)",
          boxShadow:  "var(--shadow-lg)",
        }}
      >
        {/* toolbar */}
        <div
          className="flex items-center justify-between px-5 py-3 shrink-0"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-alt)" }}
        >
          <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
            Resume - {personalInfo.name}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={personalInfo.resumeUrl}
              download="bipin_resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:border-orange-500"
              style={{ border: "1px solid var(--border)", color: "var(--fg)", background: "var(--card)" }}
            >
              <Download size={12} /> Download
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border transition-all hover:border-orange-500"
              style={{ border: "1px solid var(--border)", color: "var(--muted)", background: "var(--card)" }}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <iframe
          src={`${personalInfo.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          className="flex-1 w-full"
          title="Resume"
          style={{ border: "none", background: "#fff" }}
        />
      </div>
    </div>
  , document.body);
}
