#!/usr/bin/env node
// Warn-only distractor-quality check.
// Triggers on:
//  - options with length-ratio > 1.5 (max/min)
//  - correct option repeats >2 long words from the question
//
// In P0a this passes trivially because no quizzes.json exists yet.
// In P0c, when quiz data lands, warnings flag candidates for review per §5.7
// distractor policy.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const QUIZZES_PATH = join(process.cwd(), "src/data/dat110-vault/quizzes.json");

function main() {
  if (!existsSync(QUIZZES_PATH)) {
    console.log(
      "No quizzes.json yet (expected in P0a — quiz data lands in P0c)."
    );
    process.exit(0);
  }
  const data = JSON.parse(readFileSync(QUIZZES_PATH, "utf-8"));
  const questions = data.questions || [];
  let warnings = 0;
  let scanned = 0;

  for (const q of questions) {
    if (!Array.isArray(q.options) || q.options.length < 2) continue;
    scanned++;

    const lengths = q.options.map((o) => String(o).length);
    const max = Math.max(...lengths);
    const min = Math.min(...lengths);
    if (min > 0 && max / min > 1.5) {
      console.warn(
        `  ⚠ ${q.id}: option-length imbalance max/min = ${(max / min).toFixed(2)}`
      );
      warnings++;
    }

    if (Array.isArray(q.correctIndices) && q.correctIndices.length === 1) {
      const correctText = String(q.options[q.correctIndices[0]] || "").toLowerCase();
      const questionWords = String(q.question || "")
        .toLowerCase()
        .split(/\W+/)
        .filter((w) => w.length > 4);
      const overlap = questionWords.filter((w) => correctText.includes(w)).length;
      if (overlap > 2) {
        console.warn(
          `  ⚠ ${q.id}: correct option repeats ${overlap} long word(s) from question`
        );
        warnings++;
      }
    }
  }

  console.log(`Scanned ${scanned} question(s); ${warnings} warning(s)`);
  // Warn-only: always succeed
  process.exit(0);
}

main();
