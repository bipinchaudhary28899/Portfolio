import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts } from "@/data/portfolio";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Bipin Chaudhary`,
    description: post.summary,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen py-24 sm:py-32 px-6 sm:px-12 lg:px-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--muted)" }}
        >
          <ArrowLeft size={14} /> All posts
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "var(--muted)" }}>
            <span className="font-mono">{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime}</span>
          </div>

          <h1
            className="font-black tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)", color: "var(--fg)" }}
          >
            {post.title}
          </h1>

          {/* Summary */}
          <p
            className="text-sm leading-relaxed px-4 py-3 rounded-xl border-l-2"
            style={{ color: "var(--fg-dim)", borderLeftColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 6%, transparent)" }}
          >
            {post.summary}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mb-10" style={{ background: "var(--border)" }} />

        {/* Body */}
        <article className="flex flex-col gap-10">
          {post.sections.map((sec, i) => (
            <section key={i}>
              <h2
                className="font-black text-lg mb-3"
                style={{ color: "var(--fg)" }}
              >
                {sec.heading}
              </h2>

              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                {sec.body}
              </p>

              {sec.quote && (
                <blockquote
                  className="my-5 px-4 py-3 rounded-xl border-l-2 text-sm leading-relaxed italic"
                  style={{ color: "var(--fg-dim)", borderLeftColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 5%, transparent)" }}
                >
                  {sec.quote}
                </blockquote>
              )}

              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="flex flex-col gap-2.5 mt-4">
                  {sec.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
                      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* Footer */}
        <div className="mt-12 pt-8 flex flex-col gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full border"
                style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--card)" }}>
                #{t}
              </span>
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--muted)" }}
          >
            <ArrowLeft size={14} /> Back to all posts
          </Link>
        </div>
      </div>
    </main>
  );
}
