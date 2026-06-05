/* ═══════════════════════════════════════════════════════════════
   Mr. Dexy - Chat API route
   ---------------------------------------------------------------
   POST /api/dexy
   Body: { messages: { role: "user" | "assistant"; content: string }[] }

   Flow per request:
     1. Build the Mr. Dexy system prompt (persona + LIVE portfolio
        knowledge, regenerated each call → always up to date).
     2. Send system prompt + recent conversation to OpenAI.
     3. Stream the assistant's reply back to the browser as plain
        text chunks.

   One OpenAI call per user question. The API key stays server-side.
═══════════════════════════════════════════════════════════════ */

import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/dexyPrompt";

export const runtime = "nodejs";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";
const MAX_HISTORY = 12; // keep the last N turns to bound token usage

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "OPENAI_API_KEY is not configured on the server." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const history = incoming
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return new Response(
      JSON.stringify({ error: "The last message must be from the user." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const messages = [
    { role: "system", content: buildSystemPrompt() },
    ...history,
  ];

  let upstream: Response;
  try {
    upstream = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 800,
        stream: true,
      }),
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Could not reach the language model." }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return new Response(
      JSON.stringify({ error: "Model request failed.", detail: detail.slice(0, 500) }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  // Transform OpenAI's SSE stream into a clean text stream of tokens.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const token = json.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // ignore keep-alive / partial fragments
            }
          }
        }
      } catch {
        // upstream interrupted - close gracefully
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
