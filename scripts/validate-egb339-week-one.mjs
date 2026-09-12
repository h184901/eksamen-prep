#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { loadEgb339DataModule } from "./lib/egb339-content-loader.mjs";

const week = await loadEgb339DataModule("src/lib/egb339-week-one.ts");
const se2 = await loadEgb339DataModule("src/lib/egb339-se2.ts");
const { getEgb339AssessmentSolution } = await loadEgb339DataModule("src/lib/egb339-assessment-solutions.ts");
const source = readFileSync("src/components/egb339/week-one/WeekOnePage.tsx", "utf8");
const navigation = readFileSync("src/components/egb339/week-one/WeekOneNavigation.tsx", "utf8");
const route = readFileSync("src/app/egb339/uker/[slug]/page.tsx", "utf8");
assert(route.includes('if (slug === "uke-1") return <WeekOnePage />;'));
assert.equal(new Set(week.WEEK_ONE_SECTIONS.map((s) => s.id)).size, 9);
for (const section of week.WEEK_ONE_SECTIONS) assert(source.includes(`id="${section.id}"`), `Missing section ${section.id}`);
for (const id of ["leksjoner", "ukeinnhold", "oppgaver", "vurderinger", "position-and-orientation", "frame-example", "matrix-example"]) assert(source.includes(`id="${id}"`), `Lost anchor ${id}`);
assert(!navigation.includes("<details") && !navigation.includes("<summary"), "No collapsed week groups");
const keys = week.WEEK_ONE_SECTIONS.filter((s) => s.pageKey).map((s) => s.pageKey);
assert.deepEqual(keys, ["egb339/tema/python-control-flow-and-collections", "egb339/tema/public-and-private-autograder-tests"]);
assert(!keys.includes("egb339/tema/reference-frames"), "Reading a preview must not complete week 2");
const solution = getEgb339AssessmentSolution(week.WEEK_ONE_WARMUP);
assert.equal(solution.parts.length, 15);
assert.deepEqual(solution.weeks, [2, 3], "Keep practical associations");
assert.deepEqual(Object.keys(week.WEEK_ONE_PROMPTS), solution.parts.map((part) => part.id));
assert(source.includes("content={part.content}"), "Reuse existing walkthroughs, not copies");
const { a, b } = week.WEEK_ONE_Q15;
const product = a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
assert.deepEqual(product, [[19, 22], [43, 50]]);
assert.deepEqual(a.map((row, i) => row.map((v, j) => v * b[i][j])), [[5, 12], [21, 32]]);
assert.deepEqual(se2.transform2({ theta: 0, x: 1, y: 2 }, [2, 1]), [3, 3]);
assert.deepEqual(se2.inverseTransform2({ theta: 0, x: 1, y: 2 }, [3, 3]), [2, 1]);
let roundTrips = 0;
for (const degrees of [-180, -90, 0, 90, 180]) for (const x of [-2, 0, 2]) for (const y of [-2, 0, 2]) {
  const pose = { theta: degrees * Math.PI / 180, x, y };
  const actual = se2.inverseTransform2(pose, se2.transform2(pose, [2, 1]));
  actual.forEach((n, i) => assert(Math.abs(n - [2, 1][i]) < 1e-12));
  roundTrips++;
}
for (const file of readdirSync("src/components/egb339/week-one")) {
  const text = readFileSync("src/components/egb339/week-one/" + file, "utf8");
  assert(!/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(text), file + ": unexpected control character in source");
}
const provenance = JSON.parse(readFileSync("public/egb339/week-1/panda-swift.provenance.json", "utf8"));
assert(provenance.source.endsWith("docs/figs/swift.png"));
assert(readFileSync("public/egb339/week-1/robotics-toolbox-LICENSE.txt", "utf8").includes("MIT License"));
console.log(`EGB339 Week 1 passed: 9 sections, 7 compatibility/example anchors, 2 preserved topic keys, 15 reused warmup parts, Q15 products, ${roundTrips} pose round trips, source provenance and pilot-only routing. Browser QA is separate.`);
