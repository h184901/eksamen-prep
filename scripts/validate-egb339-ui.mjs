#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadEgb339DataModule as loadDataModule } from "./lib/egb339-content-loader.mjs";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import loadConfig from "tailwindcss/loadConfig.js";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const { EGB339_TRACKS, egb339DisplaySummary } = await loadDataModule("src/lib/egb339.ts");
const { getEgb339ProblemsForWeek } = await loadDataModule("src/lib/egb339-problems.ts");
const { getEgb339AssessmentSolutions } = await loadDataModule("src/lib/egb339-assessment-solutions.ts");
const config = loadConfig(resolve("tailwind.config.ts"));
const css = await postcss([tailwindcss(config)]).process("@tailwind utilities;", { from: undefined });
const selectors = new Set();
css.root.walkRules((rule) => selectors.add(rule.selector));

// Check the actual emitted CSS, not just strings present in component data.
// This catches a Tailwind content configuration that omits the track module.
for (const track of EGB339_TRACKS) {
  for (const token of `${track.surface} ${track.accent} ${track.interactive}`.split(/\s+/)) {
    const escaped = `.${token.replace(/([^a-zA-Z0-9_-])/g, "\\$1")}`;
    assert([...selectors].some((selector) => selector.includes(escaped)), `${track.id}: missing generated CSS for ${token}`);
  }
}

const entries = ["weeks", "concepts", "assessments", "resources"].flatMap((group) =>
  JSON.parse(readFileSync(`src/data/egb339-vault/${group}.json`, "utf8"))[group],
);
const routes = new Set([
  "/egb339", "/egb339/uker", "/egb339/temaer", "/egb339/vurderinger",
  "/egb339/ressurser", "/egb339/oppsummering", ...entries.map((entry) => entry.route),
]);
for (const entry of entries) {
  assert(!/\[![a-z-]+\]/i.test(egb339DisplaySummary(entry)), `${entry.route}: callout marker in summary`);
}

let problems = 0;
let mathExpressions = 0;
const anchors = new Map();
const assessmentSolutions = getEgb339AssessmentSolutions();
for (const [slug, solution] of Object.entries(assessmentSolutions)) {
  anchors.set(`/egb339/vurderinger/${slug}`, new Set(["losningsforslag", "oppgavekrav", ...solution.parts.map((part) => `solution-${part.id}`)]));
}
for (let week = 1; week <= 8; week++) {
  anchors.set(`/egb339/uker/uke-${week}`, new Set(["ukeinnhold", "oppgaver", "laboratorium", ...getEgb339ProblemsForWeek(week).map((problem) => problem.id)]));
}
function validateMarkdown(content, label) {
  const html = renderToStaticMarkup(createElement(ReactMarkdown, {
    remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex], children: content,
  }));
  assert(!html.includes('class="katex-error"'), `${label}: invalid math rendering ${html.match(/<span class="katex-error"[^>]*>/)?.[0] ?? ""}`);
  mathExpressions += (html.match(/class="katex"/g) ?? []).length;
  for (const [, href] of content.matchAll(/\]\((\/egb339[^)]*)\)/g)) {
    const [route, hash] = href.split("#");
    assert(routes.has(route), `${label}: broken link ${href}`);
    if (hash && anchors.has(route)) assert(anchors.get(route).has(hash), `${label}: broken anchor ${href}`);
  }
}
for (const week of entries.filter((entry) => entry.route.startsWith("/egb339/uker/"))) {
  for (const problem of getEgb339ProblemsForWeek(Number(week.week))) {
    problems += 1;
    for (const topic of problem.topics) assert(routes.has(topic.href.split("#")[0]), `${problem.id}: broken topic link ${topic.href}`);
    for (const field of ["prompt", "solution", "answer"]) {
      validateMarkdown(problem[field], `${problem.id}/${field}`);
    }
    assert(problem.solution.includes("### "), `${problem.id}: missing worked steps`);
  }
}

let assessmentParts = 0;
const assessments = entries.filter((entry) => entry.kind === "assessment");
assert.equal(Object.keys(assessmentSolutions).length, assessments.length, "assessment coverage mismatch");
for (const entry of assessments) {
  const solution = assessmentSolutions[entry.slug];
  assert(solution?.parts.length, `${entry.slug}: missing walkthrough`);
  assert(solution.source && solution.scope, `${entry.slug}: missing source/verification scope`);
  assert(solution.weeks.length && solution.weeks.every((week) => week >= 2 && week <= 8), `${entry.slug}: invalid curriculum weeks`);
  assert.equal(new Set(solution.parts.map((part) => part.id)).size, solution.parts.length, `${entry.slug}: duplicate part anchor`);
  for (const part of solution.parts) {
    assessmentParts++;
    assert(part.content.includes("### "), `${entry.slug}/${part.id}: missing worked steps`);
    validateMarkdown(part.content, `${entry.slug}/${part.id}`);
  }
}

console.log(`EGB339 UI validation passed: ${EGB339_TRACKS.length} track themes, ${entries.length} summaries, ${problems} problems, ${assessments.length} assessments (${assessmentParts} parts), ${mathExpressions} math expressions, routes and solution anchors.`);
