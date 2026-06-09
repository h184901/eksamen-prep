#!/usr/bin/env node
// DAT102 distractor-quality validator (WARN-ONLY — always exits 0).
//
// Heuristics from the DAT110 distractor policy (§5.7):
//   - option length ratio: max/min > 1.6 → options telegraph the answer
//   - keyword leakage: >2 question keywords (>4 chars) appear ONLY in the
//     correct option(s) → answer guessable by word-matching
// Findings are review hints for item authors, not build blockers.

import { load } from "./dat102-validate-lib.mjs";

const quiz = load("quizzes.json").questions;
const warns = [];
let checkedQ = 0;

for (const q of quiz) {
  const opts = q.options || [];
  if (opts.length < 2) continue;
  checkedQ++;
  const w = `quiz/${q.id}`;

  const lens = opts.map((o) => o.length);
  const ratio = Math.max(...lens) / Math.max(1, Math.min(...lens));
  if (ratio > 1.6) warns.push(`${w}: option length ratio ${ratio.toFixed(2)} (>1.6)`);

  const correct = new Set(q.correctIndices || []);
  if (correct.size === 0) continue;
  const qWords = new Set(
    q.question
      .toLowerCase()
      .split(/[^a-zæøå0-9]+/)
      .filter((x) => x.length > 4)
  );
  const inCorrectOnly = [];
  for (const word of qWords) {
    const inCorrect = [...correct].some((i) => opts[i].toLowerCase().includes(word));
    const inWrong = opts.some((o, i) => !correct.has(i) && o.toLowerCase().includes(word));
    if (inCorrect && !inWrong) inCorrectOnly.push(word);
  }
  if (inCorrectOnly.length > 2)
    warns.push(
      `${w}: ${inCorrectOnly.length} question keywords only in correct option (${inCorrectOnly.slice(0, 4).join(", ")})`
    );
}

console.log(
  `validate-dat102-distractors: ${warns.length} warning(s) — report-only (exit 0), ${checkedQ} choice questions checked`
);
for (const w of warns.slice(0, 40)) console.log("  ⚠", w);
if (warns.length > 40) console.log(`  … +${warns.length - 40} more`);
process.exit(0);
