#!/usr/bin/env node
// Verifies the DAT110 English quiz-translation map against the base quiz data:
//  - every base question id has an English translation
//  - options[] length matches the base
//  - optionExplanations[] length matches the base
//  - no orphan translation ids (translation for a question that no longer exists)
// Exits non-zero on any problem so it can gate a push.

import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const base = JSON.parse(
  readFileSync(join(ROOT, "src/data/dat110-vault/quizzes.json"), "utf-8"),
);
const en = JSON.parse(
  readFileSync(
    join(ROOT, "src/lib/dat110-language/quiz-translations-en.json"),
    "utf-8",
  ),
);

const questions = base.questions || [];
const baseById = new Map(questions.map((q) => [q.id, q]));

const missing = [];
const optionMismatch = [];
const oeMismatch = [];
const fieldMissing = [];

for (const q of questions) {
  const t = en[q.id];
  if (!t) {
    missing.push(q.id);
    continue;
  }
  for (const f of [
    "question",
    "options",
    "explanationCorrect",
    "explanationIncorrect",
    "optionExplanations",
  ]) {
    if (t[f] === undefined) fieldMissing.push(`${q.id}.${f}`);
  }
  if (Array.isArray(t.options) && t.options.length !== q.options.length) {
    optionMismatch.push(`${q.id}: en=${t.options.length} base=${q.options.length}`);
  }
  const baseOe = q.optionExplanations || [];
  const enOe = t.optionExplanations || [];
  if (enOe.length !== baseOe.length) {
    oeMismatch.push(`${q.id}: en=${enOe.length} base=${baseOe.length}`);
  }
}

const orphans = Object.keys(en).filter((id) => !baseById.has(id));

const problems =
  missing.length +
  optionMismatch.length +
  oeMismatch.length +
  fieldMissing.length +
  orphans.length;

console.log(
  `Quiz translation coverage: ${questions.length - missing.length}/${questions.length} questions translated`,
);
if (missing.length) console.error(`  ✗ missing translations: ${missing.join(", ")}`);
if (fieldMissing.length)
  console.error(`  ✗ missing fields: ${fieldMissing.join(", ")}`);
if (optionMismatch.length)
  console.error(`  ✗ option-count mismatch:\n    ${optionMismatch.join("\n    ")}`);
if (oeMismatch.length)
  console.error(
    `  ✗ optionExplanations-count mismatch:\n    ${oeMismatch.join("\n    ")}`,
  );
if (orphans.length) console.error(`  ✗ orphan translation ids: ${orphans.join(", ")}`);

if (problems === 0) {
  console.log("✓ all questions translated; option + optionExplanation counts match");
  process.exit(0);
}
console.error(`\n${problems} problem(s) found.`);
process.exit(1);
