// Shared helpers for the DAT102 validators. Not a validator itself.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const OUT_DIR = join(process.cwd(), "src/data/dat102-vault");
export const VAULT_ROOT =
  process.env.DAT102_VAULT_ROOT || "/home/skjold/ObsidianVault/DAT102";

export function load(name) {
  return JSON.parse(readFileSync(join(OUT_DIR, name), "utf-8"));
}

export function loadExams() {
  const dir = join(OUT_DIR, "exams");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(dir, f), "utf-8")));
}

export function allDataFiles() {
  const files = [];
  for (const f of readdirSync(OUT_DIR).sort()) {
    if (f.endsWith(".json")) files.push({ name: f, path: join(OUT_DIR, f) });
  }
  for (const f of readdirSync(join(OUT_DIR, "exams")).sort()) {
    if (f.endsWith(".json"))
      files.push({ name: `exams/${f}`, path: join(OUT_DIR, "exams", f) });
  }
  return files;
}

// Keys whose string values are internal provenance/metadata, never rendered.
const INTERNAL_KEYS = new Set([
  "internalPath",
  "qaPendingNotes",
  "sourceSlug",
  "vaultPath",
]);

// Recursively yield [jsonPath, string] for every student-facing string value.
export function* studentFacingStrings(node, path = "$") {
  if (typeof node === "string") {
    yield [path, node];
    return;
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++)
      yield* studentFacingStrings(node[i], `${path}[${i}]`);
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (INTERNAL_KEYS.has(k)) continue;
      yield* studentFacingStrings(v, `${path}.${k}`);
    }
  }
}

export function makeReporter(name) {
  const errors = [];
  const warns = [];
  return {
    err: (m) => errors.push(m),
    warn: (m) => warns.push(m),
    finish(extra = "") {
      console.log(
        `${name}: ${errors.length} error(s), ${warns.length} warning(s)${extra ? ` — ${extra}` : ""}`
      );
      for (const e of errors.slice(0, 40)) console.log("  ✗", e);
      for (const w of warns.slice(0, 25)) console.log("  ⚠", w);
      if (errors.length > 40) console.log(`  … +${errors.length - 40} more errors`);
      process.exit(errors.length ? 1 : 0);
    },
  };
}

export function vaultPathExists(relPath) {
  return existsSync(join(VAULT_ROOT, relPath.split("#")[0]));
}
