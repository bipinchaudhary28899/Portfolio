import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, ChevronRight } from "lucide-react";
import { blogPosts } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Blog | Bipin Chaudhary",
  description: "Lessons from building real systems — written for engineers, recruiters, and tech enthusiasts.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen py-24 sm:py-32 px-6 sm:px-12 lg:px-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--muted)" }}
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="section-label mb-2">Writing</p>
          <h1
            className="heading-accent font-black tracking-tight"
            style={{ fontSize: "clamp(2rem,6vw,4rem)", color: "var(--fg)", lineHeight: 1.1 }}
          >
            Blog
          </h1>
          <p className="mt-3 text-sm max-w-lg" style={{ color: "var(--fg-dim)" }}>
            Lessons from building real systems — written for engineers, recruiters, and anyone who likes to understand the why behind technical decisions.
          </p>
        </div>

        {/* Post list */}
        <div className="flex flex-col gap-4">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border p-6 transition-all hover:-translate-y-1"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-card)",
                textDecoration: "none",
              }}
            >
              {/* Top accent */}
              <div className="h-0.5 rounded-full mb-5" style={{ background: "linear-gradient(90deg, var(--grad-a), var(--grad-b))" }} />

              {/* Meta */}
              <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "var(--muted)" }}>
                <span className="font-mono">{post.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime}</span>
              </div>

              {/* Title */}
              <h2
                className="font-black text-lg leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--fg)" }}
              >
                {post.title}
              </h2>

              {/* Summary */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-dim)" }}>
                {post.summary}
              </p>

              {/* Tags + CTA */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border"
                      style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--bg)" }}>
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold flex-shrink-0" style={{ color: "var(--accent)" }}>
                  Read article <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
