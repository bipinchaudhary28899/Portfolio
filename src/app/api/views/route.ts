import { NextResponse } from "next/server";

/**
 * Simple in-memory view counter.
 * Resets on server restart — swap `count` for a real DB (e.g. Upstash Redis,
 * Vercel KV, or Supabase) to make it persistent across deploys.
 *
 * The client sends a unique `sid` (session ID) with every POST so each browser
 * session is counted only once, even if the page is refreshed.
 */

let count = 0;
const seen = new Set<string>();

export async function GET() {
  return NextResponse.json({ views: count });
}

export async function POST(req: Request) {
  try {
    const { sid } = await req.json();
    if (sid && !seen.has(sid)) {
      seen.add(sid);
      count += 1;
    }
    return NextResponse.json({ views: count });
  } catch {
    return NextResponse.json({ views: count });
  }
}
