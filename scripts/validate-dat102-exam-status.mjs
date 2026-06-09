#!/usr/bin/env node
// DAT102 exam status validator (strict).
//
//   - status enum: complete | partial | scanned_only | missing_solution
//   - scanned_only / missing_solution subquestions must have solution: null
//     (no fabricated answers, ever)
//   - complete subquestions must have a non-empty solution
//   - points are number | null
//   - per-exam statusCounts match the actual subquestions
//   - exams-index.json mirrors exams/*.json 1:1
//   - sessions with non-complete items carry a sessionNote (honest banner text)

import { load, loadExams, makeReporter } from "./dat102-validate-lib.mjs";

const r = makeReporter("validate-dat102-exam-status");

const STATUSES = new Set(["complete", "partial", "scanned_only", "missing_solution"]);
const index = load("exams-index.json").exams;
const exams = loadExams();

const indexBySlug = new Map(index.map((e) => [e.slug, e]));
if (index.length !== exams.length) r.err(`index has ${index.length} exams, files have ${exams.length}`);

let subTotal = 0;
for (const exam of exams) {
  const w = `exam/${exam.slug}`;
  const counts = { complete: 0, partial: 0, scanned_only: 0, missing_solution: 0 };
  for (const q of exam.questions) {
    if (q.points !== null && typeof q.points !== "number")
      r.err(`${w} oppg${q.number}: points must be number|null`);
    for (const s of q.subquestions) {
      subTotal++;
      const sw = `${w} oppg${q.number}${s.letter || ""}`;
      if (!STATUSES.has(s.status)) r.err(`${sw}: bad status ${s.status}`);
      else counts[s.status]++;
      if (s.points !== null && typeof s.points !== "number")
        r.err(`${sw}: points must be number|null`);
      if ((s.status === "scanned_only" || s.status === "missing_solution") && s.solution !== null)
        r.err(`${sw}: ${s.status} must not carry a solution`);
      if (s.status === "complete") {
        if (!s.solution?.expectedAnswer?.trim()) r.err(`${sw}: complete without solution`);
      }
      if (!s.prompt?.trim()) r.err(`${sw}: empty prompt`);
    }
  }
  for (const k of Object.keys(counts)) {
    if ((exam.statusCounts?.[k] ?? 0) !== counts[k])
      r.err(`${w}: statusCounts.${k}=${exam.statusCounts?.[k]} but actual ${counts[k]}`);
  }
  const nonComplete = counts.partial + counts.scanned_only + counts.missing_solution;
  const expectedStatus = nonComplete > 0 ? "partial" : "complete";
  if (exam.status !== expectedStatus)
    r.err(`${w}: status ${exam.status}, expected ${expectedStatus}`);
  if (nonComplete > 0 && !exam.sessionNote)
    r.err(`${w}: has non-complete items but no sessionNote banner text`);

  const idx = indexBySlug.get(exam.slug);
  if (!idx) {
    r.err(`${w}: missing from exams-index.json`);
    continue;
  }
  for (const k of ["status", "questionCount", "subquestionCount", "displayLabel"]) {
    if (JSON.stringify(idx[k]) !== JSON.stringify(exam[k]))
      r.err(`${w}: index.${k} (${idx[k]}) != exam.${k} (${exam[k]})`);
  }
}

r.finish(`${exams.length} exams, ${subTotal} subquestions`);
