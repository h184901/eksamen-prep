import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/tutor-prompts";
import type { PageContext } from "@/lib/page-context";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-sonnet-4-5-20250929";
const MAX_OUTPUT_TOKENS = 1200;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  context: PageContext;
}

function jsonError(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonError(
      500,
      "ANTHROPIC_API_KEY mangler. Legg den inn i .env.local og start serveren på nytt.",
    );
  }

  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return jsonError(400, "Ugyldig JSON i forespørsel.");
  }

  if (!body?.messages?.length) {
    return jsonError(400, "Mangler messages i forespørselen.");
  }

  const lastTwenty = body.messages.slice(-20).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const system = buildSystemPrompt(
    body.context ?? {
      subject: "unknown",
      subjectLabel: "",
      chapterId: null,
      chapterSlug: null,
      pageType: "unknown",
      pageTypeLabel: "",
      pathname: "/",
    },
  );

  const client = new Anthropic({ apiKey });

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      system,
      messages: lastTwenty,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Ukjent strøm-feil";
          controller.enqueue(encoder.encode(`\n\n[Feil: ${msg}]`));
          controller.close();
        }
      },
      cancel() {
        stream.controller.abort();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    const message =
      err instanceof Anthropic.APIError
        ? `API-feil (${err.status}): ${err.message}`
        : err instanceof Error
          ? err.message
          : "Ukjent feil";
    return jsonError(500, message);
  }
}
