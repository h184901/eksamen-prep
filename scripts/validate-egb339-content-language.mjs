#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { scanLanguage } from "./lib/egb339-language-audit.mjs";
import { loadEgb339DataModule } from "./lib/egb339-content-loader.mjs";

const read = (name, group) => {
  const data = JSON.parse(readFileSync(`src/data/egb339-vault/${name}.json`, "utf8"));
  return group ? data[group] : data;
};
const en = read("en", "translations");
const failures = [];
const vault = await loadEgb339DataModule("src/lib/egb339-vault/loader.ts");
const entries = {
  weeks: vault.getEgb339Weeks(), concepts: vault.getEgb339Concepts(),
  assessments: vault.getEgb339Assessments(), resources: vault.getEgb339Resources(),
};
for (const group of ["weeks", "concepts", "assessments", "resources"]) {
  for (const entry of entries[group]) {
    for (const [lang, content] of [["no", entry], ["en", en[entry.slug]]]) {
      assert(content, `Missing ${lang} content for ${entry.slug}`);
      for (const field of ["title", "summary", "body"]) {
        failures.push(...scanLanguage(content[field] ?? "", lang).map(hit => `${lang} ${group}/${entry.slug}/${field}:${hit.line} ${hit.text}`));
      }
    }
  }
}

const { getEgb339ProblemsForWeek } = await loadEgb339DataModule("src/lib/egb339-problems.ts");
const { getEgb339ProblemEn } = await loadEgb339DataModule("src/lib/egb339-problems-en.ts");
const { EGB339_WEEK_LEARNING } = await loadEgb339DataModule("src/lib/egb339-week-learning.ts");
for (const [week, learning] of Object.entries(EGB339_WEEK_LEARNING)) {
  for (const [lang, values] of [["no", [learning.purpose, learning.practical, ...learning.sources]], ["en", [learning.purposeEn, learning.practicalEn, ...learning.sourcesEn]]]) {
    for (const [index, value] of values.entries()) {
      failures.push(...scanLanguage(value, lang).map(hit => `${lang} week-learning/${week}/${index}:${hit.line} ${hit.text}`));
    }
  }
}
for (let week = 2; week <= 8; week++) {
  for (const problem of getEgb339ProblemsForWeek(week)) {
    const translation = getEgb339ProblemEn(problem.id);
    for (const field of ["title", "prompt", "solution", "answer"]) {
      for (const [lang, value] of [["no", problem[field]], ["en", translation?.[field]]]) {
        failures.push(...scanLanguage(value ?? "", lang).map(hit => `${lang} problems/${problem.id}/${field}:${hit.line} ${hit.text}`));
      }
    }
  }
}

const { getEgb339AssessmentSolutions } = await loadEgb339DataModule("src/lib/egb339-assessment-solutions.ts");
const enSolutions = read("en-solutions");
for (const [slug, solution] of Object.entries(getEgb339AssessmentSolutions())) {
  for (const field of ["scope", "source"]) {
    for (const [lang, value] of [["no", solution[field]], ["en", enSolutions[slug]?.[field]]]) {
      failures.push(...scanLanguage(value ?? "", lang).map(hit => `${lang} solutions/${slug}/${field}:${hit.line} ${hit.text}`));
    }
  }
  for (const part of solution.parts) {
    for (const field of ["title", "content"]) {
      for (const [lang, value] of [["no", part[field]], ["en", enSolutions[slug]?.parts[part.id]?.[field]]]) {
        failures.push(...scanLanguage(value ?? "", lang).map(hit => `${lang} solutions/${slug}/${part.id}/${field}:${hit.line} ${hit.text}`));
      }
    }
  }
}

// A regression must not be hidden by checking only that the English field exists.
assert.deepEqual(scanLanguage("Differential kinematics relates joint changes to motion using the Jacobian.", "no").length, 1);
assert.deepEqual(scanLanguage("Dette er en modell som viser hvordan leddene endrer posisjon når roboten beveger seg.", "en").length, 1);
assert.deepEqual(scanLanguage("[Week 2 - Linear algebra and 2D pose](/egb339/uker/uke-2)", "no").length, 1);
assert.deepEqual(failures, [], `Wrong-language prose found:\n${failures.join("\n")}`);
console.log("EGB339 content language audit passed (vault, week guidance, problems and assessment walkthroughs, NO/EN).");
