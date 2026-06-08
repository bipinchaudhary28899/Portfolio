"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { interviewExperiences, blogPosts } from "@/data/portfolio";

export function ContentLinks() {
  const companies = interviewExperiences.map((e) => e.company).join(", ");
  const postCount = blogPosts.length;

  return (
    <div
      className="px-6 sm:px-12 lg:px-20 py-10 sm:py-12"
      style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "var(--border)" }}>

        {/* Interview Experiences */}
        <Link
          href="/interviews"
          className="group flex items-center justify-between gap-4 px-6 py-6 transition-colors"
          style={{ background: "var(--bg-alt)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--card)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-alt)")}
        >
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--muted)" }}>
              Journey
            </p>
            <p className="font-black text-base" style={{ color: "var(--fg)" }}>
              Interview Experiences
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {companies}
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: "var(--accent)" }}
          />
        </Link>

        {/* Blog */}
        <Link
          href="/blog"
          className="group flex items-center justify-between gap-4 px-6 py-6 transition-colors"
          style={{ background: "var(--bg-alt)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--card)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--bg-alt)")}
        >
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--muted)" }}>
              Writing
            </p>
            <p className="font-black text-base" style={{ color: "var(--fg)" }}>
              Blog
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {postCount} article{postCount !== 1 ? "s" : ""} on systems, architecture & lessons learned
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: "var(--accent)" }}
          />
        </Link>

      </div>
    </div>
  );
}
