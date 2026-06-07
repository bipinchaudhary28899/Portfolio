import { NextResponse } from "next/server";

const LEETCODE_GQL = "https://leetcode.com/graphql/";
const USERNAME     = "bkumar28899";

// submitStats (non-global) matches the count shown on the public profile page.
// submitStatsGlobal aggregates differently and can lag behind.
const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export const revalidate = 900; // Next.js cache: re-fetch at most every 15 min

export async function GET() {
  try {
    const res = await fetch(LEETCODE_GQL, {
      method:  "POST",
      headers: { "Content-Type": "application/json", "Referer": "https://leetcode.com" },
      body:    JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
      next:    { revalidate: 900 },
    });

    if (!res.ok) throw new Error(`LeetCode responded with ${res.status}`);

    const json = await res.json();
    const rows: { difficulty: string; count: number }[] =
      json?.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];

    const total = rows.find((r) => r.difficulty === "All")?.count ?? null;

    if (total === null) throw new Error("Could not find total count in response");

    // Floor to nearest 10 so we never overclaim (e.g. 387 → 380)
    const floored = Math.floor(total / 10) * 10;

    return NextResponse.json({ total, floored, stat: `${floored}+` });
  } catch (err) {
    console.error("[/api/leetcode]", err);
    return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
  }
}
