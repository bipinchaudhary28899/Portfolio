"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ChevronRight, ArrowUpRight } from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/portfolio";
import { useLoadingComplete } from "@/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

/* ── Blog card ────────────────────────────────────────────────────────────── */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card opacity-0 group block rounded-2xl border overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
      style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-card)", textDecoration: "none" }}
    >
      {/* Top gradient accent */}
      <div className="h-0.5" style={{ background: "linear-gradient(90deg, var(--grad-a), var(--grad-b))" }} />

      <div className="p-6 flex flex-col gap-4">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
          <span className="font-mono">{post.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime}</span>
        </div>

        {/* Title */}
        <h3
          className="font-black text-base leading-snug group-hover:text-[var(--accent)] transition-colors"
          style={{ color: "var(--fg)" }}
        >
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--fg-dim)" }}>
          {post.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--bg)" }}>
              #{t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1 text-xs font-semibold mt-auto" style={{ color: "var(--accent)" }}>
          Read article <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export function Blog() {
  const sec             = useRef<HTMLElement>(null);
  const loadingComplete = useLoadingComplete();

  useEffect(() => {
    if (!loadingComplete) return;
    const ctx = gsap.context(() => {
      const mobile = () => window.innerWidth < 768;
      const start  = () => (mobile() ? "top 78%" : "top 72%");

      gsap.fromTo(".blog-label",
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out",
          scrollTrigger: { trigger: ".blog-header", start, toggleActions: "play none none none" } });

      gsap.fromTo(".blog-title",
        { opacity: 0, y: 44, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: "power4.out",
          scrollTrigger: { trigger: ".blog-header", start, toggleActions: "play none none none" }, delay: 0.1 });

      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } });
      });
    }, sec);
    return () => ctx.revert();
  }, [loadingComplete]);

  return (
    <section ref={sec} id="blog" className="pt-12 sm:pt-[4.5rem] pb-24 sm:pb-36 px-6 sm:px-12 lg:px-20"
      style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="blog-header mb-10 sm:mb-14 flex flex-col items-center text-center gap-4">
          <div className="flex flex-col items-center">
            <p className="blog-label section-label mb-2" style={{ opacity: 0 }}>Writing</p>
            <h2
              className="blog-title font-black tracking-tight"
              style={{ fontSize: "clamp(1.8rem,8vw,5rem)", color: "var(--fg)", lineHeight: 1.1, opacity: 0 }}
            >
              Blog
            </h2>
            <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "var(--fg-dim)" }}>
              Lessons from building real systems — written for engineers, recruiters, and anyone curious about the why.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[var(--accent)] flex-shrink-0"
            style={{ color: "var(--muted)" }}
          >
            All posts <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
