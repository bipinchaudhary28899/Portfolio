import { NextResponse, type NextRequest } from "next/server";

/**
 * Reads the visitor's country from Vercel's geo header and stores it in a
 * (non-HttpOnly) `country` cookie so the client can pick the right currency
 * without an extra IP lookup. No-ops gracefully off Vercel (header absent),
 * where the client falls back to an IP API / locale.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const country =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    "";

  if (country) {
    res.cookies.set("country", country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
      httpOnly: false, // must be readable by client JS
    });
  }

  return res;
}

export const config = {
  // Run on pages only — skip Next internals, API routes, and static files.
  matcher: ["/((?!_next/|api/|favicon.ico|.*\\.).*)"],
};
