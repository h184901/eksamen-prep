#!/usr/bin/env node
// DAT102 schema + content-guard validator.
//
// Shape rules (fail):
//   - unique, dat102-prefixed ids across quiz/flashcards/matching/drills
//   - quiz: qtype enum; per-type option/correctIndices rules; non-empty
//     explanationCorrect; optionExplanations indices valid and never pointing
//     at a correct option; no duplicate options; short_answer_selfcheck has
//     selfCheck.expectedAnswer and no options
//   - drills: expectedSteps >= 1, finalAnswer non-empty, qtype/difficulty enums
//   - flashcards front/back non-empty; matching left/right non-empty,
//     category enum, no duplicate left within a category
//   - learnMoreLinks have {label, href, kind, slug}
// Content guards (fail):
//   - no mojibake anywhere
//   - qa_pending deny-list: no graph-complexity claims (O(V…), O(E…), O(grad…))
//     in student-facing strings — these are figure-only in the DAT102 sources.

import { readFileSync } from "node:fs";
import {
  allDataFiles,
  load,
  loadExams,
  makeReporter,
  studentFacingStrings,
} from "./dat102-validate-lib.mjs";

const r = makeReporter("validate-dat102-schema");

const quiz = load("quizzes.json").questions;
const cards = load("flashcards.json").cards;
const pairs = load("matching.json").pairs;
const drills = load("drills.json").drills;
const exams = loadExams();

// ---- ids ----
const ids = new Set();
for (const [kind, items] of [
  ["quiz", quiz],
  ["fc", cards],
  ["match", pairs],
  ["drill", drills],
]) {
  for (const it of items) {
    if (!it.id || !it.id.startsWith("dat102-")) r.err(`${kind}: bad id ${it.id}`);
    if (ids.has(it.id)) r.err(`duplicate id ${it.id}`);
    ids.add(it.id);
  }
}

// ---- learnMoreLinks shape ----
function checkLinks(items, where) {
  for (const it of items) {
    for (const l of it.learnMoreLinks || []) {
      if (!l.label || !l.href || !l.kind || !l.slug)
        r.err(`${where}/${it.id}: malformed learnMoreLink ${JSON.stringify(l)}`);
    }
  }
}
checkLinks(quiz, "quiz");
checkLinks(cards, "fc");
checkLinks(pairs, "match");
checkLinks(drills, "drill");

// ---- quiz rules ----
const QT = new Set([
  "multiple_choice",
  "multiple_select",
  "true_false",
  "short_answer_selfcheck",
]);
for (const q of quiz) {
  const w = `quiz/${q.id}`;
  if (!QT.has(q.qtype)) r.err(`${w}: bad qtype ${q.qtype}`);
  if (!q.explanationCorrect?.trim()) r.err(`${w}: empty explanationCorrect`);
  const opts = q.options || [];
  if (new Set(opts).size !== opts.length) r.err(`${w}: duplicate options`);

  if (q.qtype === "short_answer_selfcheck") {
    if (opts.length) r.err(`${w}: self-check question must not have options`);
    if (q.correctIndices?.length) r.err(`${w}: self-check must have empty correctIndices`);
    if (!q.selfCheck?.expectedAnswer?.trim())
      r.err(`${w}: self-check missing expectedAnswer`);
  } else {
    if (q.selfCheck) r.err(`${w}: selfCheck set on non-self-check qtype`);
    if (opts.length < 2) r.err(`${w}: needs >= 2 options`);
    const ci = q.correctIndices || [];
    if (ci.some((i) => !Number.isInteger(i) || i < 0 || i >= opts.length))
      r.err(`${w}: correctIndices out of range`);
    if (q.qtype === "multiple_select" && ci.length < 2)
      r.err(`${w}: multiple_select needs >= 2 correctIndices`);
    if ((q.qtype === "multiple_choice" || q.qtype === "true_false") && ci.length !== 1)
      r.err(`${w}: needs exactly 1 correct index`);
    if (q.qtype === "true_false" && opts.length !== 2)
      r.err(`${w}: true_false needs exactly 2 options`);
    for (const oe of q.optionExplanations || []) {
      if (!Number.isInteger(oe.optionIndex) || oe.optionIndex < 0 || oe.optionIndex >= opts.length)
        r.err(`${w}: optionExplanation index out of range`);
      else if (!oe.isCorrect && ci.includes(oe.optionIndex))
        r.err(`${w}: optionExplanation marked wrong but targets a correct option`);
    }
  }
}

// ---- drills ----
const DT = new Set(["trace", "calculation", "code_reading", "short_answer"]);
const DIFF = new Set(["easy", "medium", "hard"]);
for (const d of drills) {
  const w = `drill/${d.id}`;
  if (!DT.has(d.qtype)) r.err(`${w}: bad qtype ${d.qtype}`);
  if (!DIFF.has(d.difficulty)) r.err(`${w}: bad difficulty`);
  if (!d.expectedSteps?.length) r.err(`${w}: empty expectedSteps`);
  if (!d.finalAnswer?.trim()) r.err(`${w}: empty finalAnswer`);
}

// ---- flashcards / matching ----
for (const c of cards) {
  if (!c.front?.trim() || !c.back?.trim()) r.err(`fc/${c.id}: empty front/back`);
}
const MC = new Set([
  "term-definition",
  "algorithm-complexity",
  "adt-operations",
  "structure-use",
]);
const leftByCat = new Map();
for (const p of pairs) {
  if (!MC.has(p.category)) r.err(`match/${p.id}: bad category ${p.category}`);
  if (!p.left?.trim() || !p.right?.trim()) r.err(`match/${p.id}: empty left/right`);
  const key = `${p.category}::${p.left}`;
  if (leftByCat.has(key)) r.err(`match/${p.id}: duplicate left within category (${p.left})`);
  leftByCat.set(key, p.id);
}

// ---- exams basic shape (status detail lives in validate-dat102-exam-status) ----
for (const e of exams) {
  if (!e.slug || !e.questions?.length) r.err(`exam ${e.slug}: empty`);
}

// ---- content guards ----
const MOJI = /Ã¸|Ã¥|Ã¦|Ã˜|â€™|â€“|â€œ|ï¿½|Â /;
for (const f of allDataFiles()) {
  if (MOJI.test(readFileSync(f.path, "utf-8"))) r.err(`mojibake in ${f.name}`);
}

// qa_pending deny: graph complexities are figure-only in DAT102 sources and
// must never be asserted in student-facing text. General O-notation (O(n),
// O(log n), …) is source-backed and allowed.
const GRAPH_O = /O\(\s*(?:V|E|grad)\b[^)]*\)|O\(\s*V\s*[+²^]/;
for (const f of allDataFiles()) {
  const data = JSON.parse(readFileSync(f.path, "utf-8"));
  for (const [path, s] of studentFacingStrings(data)) {
    if (GRAPH_O.test(s))
      r.err(`${f.name} ${path}: qa_pending-denied graph complexity claim: "${s.slice(0, 80)}…"`);
  }
}

r.finish(
  `${quiz.length} quiz, ${cards.length} cards, ${pairs.length} pairs, ${drills.length} drills, ${exams.length} exams`
);
