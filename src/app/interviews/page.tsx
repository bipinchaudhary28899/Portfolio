import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InterviewExperiences } from "@/components/sections/InterviewExperiences";

export const metadata: Metadata = {
  title: "Interview Experiences | Bipin Chaudhary",
  description: "Real rounds, honest reflections, and lessons from the interview trail — shared to help others prepare.",
};

export default function InterviewsPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="pt-24 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--muted)" }}
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>
      </div>
      <InterviewExperiences preview={false} />
    </main>
  );
}
