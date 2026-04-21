import fs from "node:fs";
import path from "node:path";

// Roten til Akseptert.no sin kodebase på Erlends maskin. Den ligger utenfor
// dette prosjektet — vi leser derfra bare for å trekke ut ekte snippets til
// læringsmodulen. På Vercel finnes ikke stien, og vi faller tilbake til en
// lokal snapshot. All lesing er i Server Components (Node-runtime).
const AKSEPTERT_ROOT =
  process.env.AKSEPTERT_SRC_PATH ??
  "/Users/erlendmoheim/Downloads/Prosjekt/handverker-ai";

export interface ReadResult {
  code: string;
  source: "live" | "fallback";
  fullPath: string;
}

export function readAkseptertFile(
  relativePath: string,
  fallback: string,
): ReadResult {
  const fullPath = path.join(AKSEPTERT_ROOT, relativePath);
  try {
    const code = fs.readFileSync(fullPath, "utf-8");
    return { code, source: "live", fullPath };
  } catch {
    return { code: fallback, source: "fallback", fullPath };
  }
}

// Slice a subset of lines (1-indexed, inclusive on both ends) from a file string.
// Nyttig når vi bare vil plukke ut en del av en stor fil.
export function sliceLines(code: string, from: number, to: number): string {
  const lines = code.split("\n");
  const safeFrom = Math.max(1, from);
  const safeTo = Math.min(lines.length, to);
  return lines.slice(safeFrom - 1, safeTo).join("\n");
}
