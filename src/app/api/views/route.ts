import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

/**
 * Persistent view counter backed by Upstash Redis.
 *
 * Required environment variables (add to .env.local and Vercel dashboard):
 *   UPSTASH_REDIS_REST_URL   – e.g. https://xxxx.upstash.io
 *   UPSTASH_REDIS_REST_TOKEN – your Upstash REST token
 *
 * Keys used in Redis:
 *   portfolio:views    – INCR counter (total views)
 *   portfolio:sessions – SET of seen session IDs (deduplication)
 *
 * The client sends a unique `sid` (sessionStorage-scoped ID) so each
 * browser tab session is counted only once, even on page refresh.
 */

const redis = Redis.fromEnv();

const VIEWS_KEY = "portfolio:views";
const SESSIONS_KEY = "portfolio:sessions";

export async function GET() {
  const views = (await redis.get<number>(VIEWS_KEY)) ?? 0;
  return NextResponse.json({ views });
}

export async function POST(req: Request) {
  try {
    const { sid } = await req.json();

    if (sid) {
      // SADD returns 1 when the member is new, 0 if already present.
      const isNew = await redis.sadd(SESSIONS_KEY, sid);
      if (isNew === 1) {
        await redis.incr(VIEWS_KEY);
      }
    }

    const views = (await redis.get<number>(VIEWS_KEY)) ?? 0;
    return NextResponse.json({ views });
  } catch {
    // On any Redis error, still return the current count gracefully.
    const views = (await redis.get<number>(VIEWS_KEY)) ?? 0;
    return NextResponse.json({ views });
  }
}
