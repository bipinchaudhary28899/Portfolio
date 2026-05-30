import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "missing url" }, { status: 400 });

  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(6000),
      redirect: "follow",
    });
    const latency = Date.now() - start;
    return NextResponse.json({ up: res.ok || res.status < 500, latency });
  } catch {
    return NextResponse.json({ up: false, latency: Date.now() - start });
  }
}
