// Runtime wikilink resolver.
//
// Most wikilink resolution happens at build-time in scripts/sync-dat110-vault.mjs
// where bodies are pre-rendered into markdown with resolved/stubbed links.
// This file is for any runtime use (e.g. dynamic learnMoreLinks construction).
//
// Allow-list of namespaces that map to web routes:
//   concepts/*    → /dat110/begreper/<slug>
//   topics/*      → /dat110/temaer/<slug>
//   exam-patterns/<slug> → /dat110/eksamen/<slug>   (P0b+)
//   eksamen/<slug>       → /dat110/eksamen/<slug>   (P0b+)
//
// Everything else (sources/*, prosjekter/*, temaer/*, Task N, page anchors, etc.)
// is intentionally NOT mapped to web routes — they get rendered as italic stubs
// in body markdown or filtered from frontmatter resolution.

import { resolveWikilinkRoute } from "./loader";

export interface ParsedWikilink {
  target: string;
  alias?: string;
  section?: string;
}

export function parseWikilink(text: string): ParsedWikilink | null {
  const m = text.match(/^\[\[([^\]]+)\]\]$/);
  if (!m) return null;
  const inner = m[1];
  const [rawTarget, alias] = inner.split("|").map((s) => s.trim());
  const [target, section] = rawTarget.split("#").map((s) => s.trim());
  return {
    target,
    alias: alias || undefined,
    section: section || undefined,
  };
}

// Approved namespaces for web routing. Wikilinks outside these are never mapped
// to a route — see file header for rationale.
const APPROVED_NAMESPACES = new Set([
  "concepts",
  "topics",
  "exam-patterns",
  "eksamen",
]);

export function isApprovedWikilinkNamespace(target: string): boolean {
  const ns = target.split("/")[0];
  return APPROVED_NAMESPACES.has(ns);
}

export function wikilinkToHref(target: string, section?: string): string | null {
  if (!isApprovedWikilinkNamespace(target)) return null;
  const base = resolveWikilinkRoute(target);
  if (!base) return null;
  return section ? `${base}#${section}` : base;
}
