#!/usr/bin/env node
// EGB339 bilingual + math-notation + code-block invariants.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import katex from "katex";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { loadEgb339DataModule } from "./lib/egb339-content-loader.mjs";

const { EGB339_READABLE_FORMULAS } = await loadEgb339DataModule("src/lib/egb339-readable-math.ts");
const { EGB339_UI } = await loadEgb339DataModule("src/lib/egb339-language/ui.ts");
const { EGB339_WEEK_SUBJECTS } = await loadEgb339DataModule("src/lib/egb339.ts");
const { highlightPython } = await loadEgb339DataModule("src/lib/egb339-highlight-python.ts");
const { getEgb339ProblemsForWeek } = await loadEgb339DataModule("src/lib/egb339-problems.ts");
const { getEgb339AssessmentSolutions } = await loadEgb339DataModule("src/lib/egb339-assessment-solutions.ts");
const { getEgb339ProblemEn } = await loadEgb339DataModule("src/lib/egb339-problems-en.ts");

// --- 1. Translation coverage -------------------------------------------------
const en = JSON.parse(readFileSync("src/data/egb339-vault/en.json", "utf8")).translations;
const nb = JSON.parse(readFileSync("src/data/egb339-vault/nb.json", "utf8")).overrides;
const slugs = ["weeks", "concepts", "assessments", "resources"].flatMap((group) =>
  JSON.parse(readFileSync(`src/data/egb339-vault/${group}.json`, "utf8"))[group].map((entry) => entry.slug),
);
assert.equal(slugs.length, 62);
for (const slug of slugs) {
  assert(en[slug]?.body && en[slug]?.title && en[slug]?.summary, `${slug}: missing English translation`);
  assert(nb[slug]?.title, `${slug}: missing Norwegian title override`);
}

// --- 2. English markdown integrity (KaTeX + links + structure parity) --------
const routes = new Set(["/egb339", "/egb339/uker", "/egb339/temaer", "/egb339/vurderinger", "/egb339/ressurser", "/egb339/oppsummering", ...slugs.map((slug) => {
  for (const group of ["weeks", "concepts", "assessments", "resources"]) {
    const entry = JSON.parse(readFileSync(`src/data/egb339-vault/${group}.json`, "utf8"))[group].find((item) => item.slug === slug);
    if (entry) return entry.route;
  }
  return "";
})]);
let enMath = 0;
for (const slug of slugs) {
  const source = ["weeks", "concepts", "assessments", "resources"].map((group) =>
    JSON.parse(readFileSync(`src/data/egb339-vault/${group}.json`, "utf8"))[group].find((entry) => entry.slug === slug),
  ).find(Boolean);
  const translated = en[slug];
  // Math spans must be byte-identical between languages.
  const mathOf = (text) => text.match(/\$[^$]+\$|\$\$[^$]+\$\$/g) ?? [];
  assert.deepEqual(mathOf(translated.body), mathOf(source.body), `${slug}: math spans differ between languages`);
  // Headings must match 1:1.
  const headingsOf = (text) => (text.match(/^#{1,6} /gm) ?? []).length;
  assert.equal(headingsOf(translated.body), headingsOf(source.body), `${slug}: heading count differs`);
  // KaTeX must render without errors.
  const html = renderToStaticMarkup(createElement(ReactMarkdown, {
    remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex], children: translated.body,
  }));
  assert(!html.includes('class="katex-error"'), `${slug}: invalid math in English body`);
  enMath += (html.match(/class="katex"/g) ?? []).length;
  // Links must keep valid EGB339 routes.
  for (const [, href] of translated.body.matchAll(/\]\((\/egb339[^)]*)\)/g)) {
    assert(routes.has(href.split("#")[0]), `${slug}: broken English link ${href}`);
  }
}

// --- 3. Problem and solution translations ------------------------------------
let problemCount = 0;
for (let week = 2; week <= 8; week++) {
  for (const problem of getEgb339ProblemsForWeek(week)) {
    problemCount++;
    const translation = getEgb339ProblemEn(problem.id);
    assert(translation?.prompt && translation?.solution && translation?.answer && translation?.title, `${problem.id}: missing English translation`);
    assert(translation.solution.includes("### "), `${problem.id}: English solution lost worked steps`);
    // Numbers must survive translation.
    const numbersOf = (text) => text.match(/-?\d+(?:[.,]\d+)?/g) ?? [];
    assert.deepEqual(numbersOf(translation.answer), numbersOf(problem.answer), `${problem.id}: answer numbers differ between languages`);
  }
}

const enSolutions = JSON.parse(readFileSync("src/data/egb339-vault/en-solutions.json", "utf8"));
const solutions = getEgb339AssessmentSolutions();
for (const [slug, solution] of Object.entries(solutions)) {
  const translation = enSolutions[slug];
  assert(translation?.source && translation?.scope, `${slug}: missing English source/scope`);
  assert.deepEqual(Object.keys(translation.parts).sort(), solution.parts.map((part) => part.id).sort(), `${slug}: English part ids differ`);
  for (const part of solution.parts) {
    assert(translation.parts[part.id].content.includes("### "), `${slug}/${part.id}: English walkthrough lost worked steps`);
  }
}

// --- 4. Math allowlist renders -----------------------------------------------
for (const [input, tex] of Object.entries(EGB339_READABLE_FORMULAS)) {
  katex.renderToString(tex, { throwOnError: true, displayMode: false });
  assert(!/[₀₁₂₃₄₅₆₇₈₉ᵢₙₓᵧ̇̃ᴮᴷ]/.test(tex), `${input}: unicode math leaked into TeX output`);
}

// --- 5. UI dictionary and week subjects --------------------------------------
for (const [key, pair] of Object.entries(EGB339_UI)) {
  assert(pair.no && pair.en, `ui.${key}: missing a language variant`);
}
for (const subject of EGB339_WEEK_SUBJECTS) {
  assert(subject.title && subject.titleEn && subject.interactive && subject.interactiveEn, `${subject.slug}: missing bilingual labels`);
}

// --- 6. Language store and header toggle --------------------------------------
const store = readFileSync("src/lib/egb339-language/store.ts", "utf8");
assert(store.includes('"egb339-lang"'), "Language preference key must be egb339-lang");
assert(store.includes("localStorage"), "Language preference must persist across reloads");
const navigation = readFileSync("src/components/Navigation.tsx", "utf8");
const badgeIndex = navigation.indexOf("<UserBadge />");
const toggleIndex = navigation.indexOf("<Egb339LangToggle />");
const themeIndex = navigation.indexOf("<ThemeToggle />");
assert(badgeIndex >= 0 && toggleIndex > badgeIndex && themeIndex > toggleIndex, "Header order must be: Logg ut → language toggle → dark mode");

// --- 7. Code blocks ------------------------------------------------------------
const markdown = readFileSync("src/components/egb339/Egb339Markdown.tsx", "utf8");
assert(markdown.includes("Egb339CodeBlock"), "Markdown must render fenced code through the shared code block");
assert(markdown.includes("language-"), "Code block must read the fence language label");
const sample = 'import numpy as np\n\ndef fk(q):  # base rotation\n    return np.array([np.cos(q), np.sin(q)])\n';
const tokens = highlightPython(sample);
assert.equal(tokens.map((token) => token.text).join(""), sample, "Highlighter must never alter source text");
assert(tokens.some((token) => token.cls === "keyword") && tokens.some((token) => token.cls === "comment") && tokens.some((token) => token.cls === "function"), "Highlighter must classify keywords, comments and functions");

console.log(`EGB339 i18n passed: ${slugs.length} English vault entries with identical math/structure, ${problemCount} problems, ${Object.keys(solutions).length} walkthroughs, ${Object.keys(EGB339_READABLE_FORMULAS).length} math replacements, ${Object.keys(EGB339_UI).length} UI strings, header toggle order, code-block pipeline (${enMath} rendered English math spans).`);
