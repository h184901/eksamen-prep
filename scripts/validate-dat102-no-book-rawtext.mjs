#!/usr/bin/env node
// DAT102 book/raw-text guard (strict).
//
// The Carrano textbook is reference-only/copyrighted and the raw export is
// off-limits. This validator fails if generated data:
//   - references course_files_export/ or /Bok/ anywhere
//   - mentions the textbook in question-bank-derived datasets (quiz, cards,
//     pairs, drills, exams) — items must be grounded in course material only
//   - (warn) contains long English prose passages in student-facing text
//     outside code blocks — possible book-leak indicator. Norwegian course
//     content + short English terms are expected; long English paragraphs are
//     not (exam prompts in the corpus are Norwegian).
// syllabus/obliger/concepts/topics may mention the book BY NAME (ToC/pensum
// context, e.g. chapter labels) — that is whitelisted name-dropping, not text.

import { readFileSync } from "node:fs";
import { allDataFiles, makeReporter, studentFacingStrings } from "./dat102-validate-lib.mjs";

const r = makeReporter("validate-dat102-no-book-rawtext");

const STRICT_NO_BOOKNAME = new Set([
  "quizzes.json",
  "flashcards.json",
  "matching.json",
  "drills.json",
]);

for (const f of allDataFiles()) {
  const raw = readFileSync(f.path, "utf-8");
  if (/course_files_export/.test(raw)) r.err(`${f.name}: references raw course_files_export`);
  if (/\/Bok\//.test(raw)) r.err(`${f.name}: references Bok/ path`);
  if (/data-structures-and-abstractions-with-java/.test(raw))
    r.err(`${f.name}: references textbook file`);

  const isStrict = STRICT_NO_BOOKNAME.has(f.name) || f.name.startsWith("exams/");
  if (isStrict && /carrano/i.test(raw)) r.err(`${f.name}: textbook mentioned in item data`);

  // English-passage heuristic (warn): >45 consecutive non-code words with a
  // high density of English function words.
  const data = JSON.parse(raw);
  const EN = /\b(the|and|of|with|that|which|this|from|into|are|is)\b/gi;
  for (const [path, s] of studentFacingStrings(data)) {
    const noCode = s.replace(/```[\s\S]*?```/g, " ").replace(/`[^`]*`/g, " ");
    for (const chunk of noCode.split(/\n{2,}/)) {
      const words = chunk.split(/\s+/).filter(Boolean);
      if (words.length < 45) continue;
      const hits = (chunk.match(EN) || []).length;
      if (hits > 14)
        r.warn(`${f.name} ${path}: long English passage (${words.length} words) — verify not book text`);
    }
  }
}

r.finish();
