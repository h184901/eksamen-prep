// Runtime wikilink resolver for DAT102.
//
// Most wikilink resolution happens at build-time in scripts/sync-dat102-vault.mjs,
// where vault bodies are pre-rendered with resolved links (or italic stubs for
// unmapped namespaces like sources/ and reports/). This module is for runtime
// use: tutor output, dynamic learnMore construction, and human-form lookups.
//
// Resolution order for a target like "Hashing", "Oblig2", "F08 Sortering 1",
// "concepts/quicksort" or "exams/2024-vaar":
//   1. exact route ("concepts/quicksort" → /dat102/begreper/quicksort)
//   2. anchor key  ("oblig2" → /dat102/oving/obliger#oblig2,
//                   "f08" / "f08 sortering 1" → /dat102/pensum#f08)
//   3. human alias ("hashing" → topics/dictionaries-and-hashing → route)
//   4. F-code prefix fallback ("f08 …" → pensum anchor for f08)
// Anything else returns null — callers must render it as plain/italic text,
// never as a broken route.

import { getWikilinkIndex, resolveWikilinkRoute } from "./loader";

export interface ParsedWikilink {
  target: string;
  alias?: string;
  section?: string;
}

export function parseWikilink(text: string): ParsedWikilink | null {
  const m = text.match(/^\[\[([^\]]+)\]\]$/);
  if (!m) return null;
  const [rawTarget, alias] = m[1].split("|").map((s) => s.trim());
  const [target, section] = rawTarget.split("#").map((s) => s.trim());
  return { target, alias: alias || undefined, section: section || undefined };
}

const APPROVED_NAMESPACES = new Set([
  "concepts",
  "topics",
  "exams",
  "exam-patterns",
  "assignments",
]);

export function isApprovedWikilinkNamespace(target: string): boolean {
  if (!target.includes("/")) return true; // human-form / bare keys go through alias lookup
  return APPROVED_NAMESPACES.has(target.split("/")[0]);
}

function normalizeKey(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export function wikilinkToHref(
  target: string,
  section?: string
): string | null {
  const index = getWikilinkIndex();
  const direct = resolveWikilinkRoute(target);
  if (direct) return withSection(direct, section);

  const key = normalizeKey(target);
  if (index.anchors[key]) return index.anchors[key];

  const aliasTarget = index.aliases[key];
  if (aliasTarget) {
    const viaAlias = resolveWikilinkRoute(aliasTarget);
    if (viaAlias) return withSection(viaAlias, section);
    if (index.anchors[normalizeKey(aliasTarget)])
      return index.anchors[normalizeKey(aliasTarget)];
  }

  // "F08 Sortering 1" → lecture anchor for the leading F-code.
  const fCode = key.match(/^f\d{2}[ab]?\b/);
  if (fCode && index.anchors[fCode[0]]) return index.anchors[fCode[0]];

  return null;
}

function withSection(route: string, section?: string): string {
  if (!section) return route;
  const base = route.split("#")[0];
  return `${base}#${slugifyAnchor(section)}`;
}

function slugifyAnchor(s: string): string {
  return s
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
