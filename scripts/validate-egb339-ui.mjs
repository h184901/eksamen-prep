#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import loadConfig from "tailwindcss/loadConfig.js";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// These two data modules have no runtime imports; compile their TypeScript
// without needing a Next server or writing generated files into the worktree.
async function loadDataModule(path) {
  const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const { EGB339_TRACKS, egb339DisplaySummary } = await loadDataModule("src/lib/egb339.ts");
const { getEgb339ProblemsForWeek } = await loadDataModule("src/lib/egb339-problems.ts");
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
for (const week of entries.filter((entry) => entry.route.startsWith("/egb339/uker/"))) {
  for (const problem of getEgb339ProblemsForWeek(Number(week.week))) {
    problems += 1;
    for (const topic of problem.topics) assert(routes.has(topic.href.split("#")[0]), `${problem.id}: broken topic link ${topic.href}`);
    for (const field of ["prompt", "solution", "answer"]) {
      const content = problem[field];
      const html = renderToStaticMarkup(createElement(ReactMarkdown, {
        remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex], children: content,
      }));
      assert(!html.includes('class="katex-error"'), `${problem.id}/${field}: invalid math rendering`);
      mathExpressions += (html.match(/class="katex"/g) ?? []).length;
      for (const [, href] of content.matchAll(/\]\((\/egb339[^)#]*)(?:#[^)]*)?\)/g)) {
        assert(routes.has(href), `${problem.id}/${field}: broken link ${href}`);
      }
    }
  }
}

console.log(`EGB339 UI validation passed: ${EGB339_TRACKS.length} track themes, ${entries.length} summaries, ${problems} problems, ${mathExpressions} math expressions and problem links.`);
