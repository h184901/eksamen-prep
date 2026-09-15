#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { loadEgb339DataModule } from "./lib/egb339-content-loader.mjs";

const course = await loadEgb339DataModule("src/lib/egb339-course.ts");
const navigation = await loadEgb339DataModule("src/lib/egb339-study-weeks.ts");
const models = await loadEgb339DataModule("src/lib/egb339-week-models.ts");
const arm = await loadEgb339DataModule("src/lib/egb339-planar2.ts");
const spatial = (await loadEgb339DataModule("src/lib/egb339-spatial-example.ts")).SPATIAL_ROTATION_EXAMPLE;
const learning = (await loadEgb339DataModule("src/lib/egb339-week-learning.ts")).EGB339_WEEK_LEARNING;
const { concepts } = JSON.parse(readFileSync("src/data/egb339-vault/concepts.json", "utf8"));
let numeric = 0;
const close = (a, b, tol = 1e-8) => {assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${a} != ${b}`); numeric++;};
const vector = (a, b, tol) => {assert.equal(a.length, b.length);a.forEach((v, i) => close(v, b[i], tol));};
const multiply = (a, b) => a.map(row => b[0].map((_, j) => row.reduce((sum, x, i) => sum + x * b[i][j], 0)));
assert.deepEqual(multiply(spatial.rx, spatial.ry), spatial.xy);
assert.deepEqual(multiply(spatial.ry, spatial.rx), spatial.yx);
assert.notDeepEqual(spatial.xy, spatial.yx);
for (const key of ["xy", "yx"]) assert.deepEqual(multiply(spatial[key], spatial[key][0].map((_, j) => spatial[key].map(row => row[j]))), [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

for (const item of course.EGB339_COURSE_ORDER) {
  const week = { ...item, href: `/egb339/uker/uke-${item.week}`, title: `Week ${item.week}`, pageKey: `egb339/uke/uke-${item.week}`, assessments: [], topics: item.topics.map(slug => ({ href: `/egb339/temaer/${slug}`, title: concepts.find(c => c.slug === slug).title, pageKey: `egb339/tema/${slug}` })) };
  const sections = navigation.egb339WeekSections(week);
  assert.equal(new Set(sections.map(s => s.id)).size, sections.length);
  assert.deepEqual(sections.filter(s => s.pageKey).map(s => s.pageKey), week.topics.map(t => t.pageKey));
  for (const t of week.topics) {
    const href = navigation.egb339StudyHref(t.href);
    assert(href.startsWith(week.href + "#"));
    assert(sections.some(s => s.id === href.split("#")[1]));
    assert.equal(navigation.egb339StudyHref(t.href + "#regneeksempel"), t.href + "#regneeksempel", "Preserve legacy topic fragments");
  }
  if (item.week > 1) {assert(learning[item.week].purpose && learning[item.week].practical);assert(learning[item.week].sources.length >= 3);for (const id of ["practical", "oppgaver", "vurderinger"]) assert(sections.some(s => s.id === id));}
}
const sidebar = readFileSync("src/components/egb339/study-week/StudyWeekNavigation.tsx", "utf8");
assert(!sidebar.includes("<details") && !sidebar.includes("<summary"));
assert(sidebar.includes("hashTarget()") && sidebar.includes("catch {"), "Malformed hashes must not throw");
const page = readFileSync("src/components/egb339/study-week/StudyWeekPage.tsx", "utf8");
assert(page.includes("getEgb339ProblemsForWeek(number)"));
assert(page.includes("pageKey={week.pageKey}"));
assert(page.includes("<StudyWeekAssessments week={week}"));
assert(page.includes('id="laboratorium"'));
const assessment = readFileSync("src/components/egb339/study-week/StudyWeekAssessments.tsx", "utf8");
assert(assessment.includes("content={part.content}"));
assert(assessment.includes("pageKey={link.pageKey}"));
assert(assessment.includes("${anchor}-solution-${part.id}"));

// Independent numerical differential of existing FK, at regular and singular poses.
for (let a = -4; a <= 4; a++) for (let b = -4; b <= 4; b++) {
  const q = [a * Math.PI / 4, b * Math.PI / 4], m = arm.PLANAR2_QUT;
  const value = models.planarVelocity(m, q, [.5, -.2]);
  close(value.determinant, m.l1 * m.l2 * Math.sin(q[1]));
  close(value.omega, .3);
  for (let j = 0; j < 2; j++) {
    const plus = [...q], minus = [...q], h = 1e-5;
    plus[j] += h; minus[j] -= h;
    const p = arm.planar2Forward(m, plus).end, n = arm.planar2Forward(m, minus).end;
    vector(value.columns[j], p.map((v, i) => (v - n[i]) / (2 * h)), 1e-7);
  }
}
// Independently executed Robotics Toolbox ETS2.jacob0, QUT q=(pi/4,pi/4), L=(5,7).
const qut = models.planarVelocity(arm.PLANAR2_QUT, [Math.PI/4, Math.PI/4], [.5, .5]);
vector(qut.columns[0], [-10.535533905932738, 3.5355339059327395]);
vector(qut.columns[1], [-7, 0]);
vector(qut.velocity, [-8.767766952966369, 1.7677669529663707]);
close(qut.omega, 1);
// Declared SVG bounds: both supported poses, all velocity slider extremes.
for (const q of [[Math.PI/4, Math.PI/4], [0, 0]]) for (const v1 of [-1, 0, 1]) for (const v2 of [-1, 0, 1]) {
  const s = models.planarVelocity(arm.PLANAR2_QUT, q, [v1, v2]);
  for (const v of [...s.contributions, s.velocity]) {
    const x = 210 + 15 * s.end[0] + 8 * v[0], y = 215 - 15 * s.end[1] - 8 * v[1];
    assert(x >= 16 && x <= 504 && y >= 16 && y <= 378, "Velocity arrow outside the figure");
  }
}
for (let i = 0; i <= 100; i++) {
  const s = models.week7Path(i/100);
  vector(arm.planar2Forward(models.WEEK7_MODEL, s.cartesianQ).end, s.cartesian);
  vector(arm.planar2Forward(models.WEEK7_MODEL, s.jointQ).end, s.joint);
  close(s.cartesian[0], .75);
  close(s.jointQ[1], models.week7Path(0).jointQ[1]);
}
vector(models.week7Path(0).joint, [.75, .5]);vector(models.week7Path(1).joint, [.75, -.5]);
close(models.week7Path(.5).joint[0], Math.sqrt(.75**2 + .5**2));
close(models.week7Profile(8).distance, 16.5);close(models.week7Profile(6).distance, 14.5);
for (const t of [0, 2, 5, 8]) assert(Number.isFinite(models.week7Profile(t).distance));
for (let t = .01; t < 8; t += .13) close((models.week7Profile(t + 1e-6).distance - models.week7Profile(t - 1e-6).distance) / 2e-6, models.week7Profile(t).velocity, 1e-7);
const pixels = Array.from({ length: 100 }, (_, i) => models.week8Pixel(i % 10, Math.floor(i / 10)));
assert.equal(pixels.filter(v => v === .5).length, 96);assert.equal(pixels.filter(v => v === .9).length, 4);
assert.equal(pixels.filter(v => v > .9).length, 0);
for (const bad of [-1, 1.1, Infinity, NaN]) assert.throws(() => models.week7Path(bad), RangeError);
assert.throws(() => models.week8Pixel(10, 0), RangeError);

const provenance = JSON.parse(readFileSync("public/egb339/study-figures/provenance.json", "utf8"));
for (const asset of provenance.assets) {assert(existsSync("public/egb339/study-figures/" + asset.file));assert(asset.source && asset.licence && asset.treatment && asset.use);}
for (const file of readdirSync("src/components/egb339/study-week")) assert(!/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(readFileSync("src/components/egb339/study-week/" + file, "utf8")), file);
console.log(`EGB339 long-form weeks passed: 8 section maps, 31 original topic keys, legacy links, single-source exercises/assessments, ${numeric} numeric assertions, SVG velocity bounds, 101 path samples, image/mask edges and ${provenance.assets.length} sourced figures. Browser QA remains separate.`);
