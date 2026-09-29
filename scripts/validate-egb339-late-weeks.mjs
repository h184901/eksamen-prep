#!/usr/bin/env node
// Late-vision weeks keep the shared learning path and existing progress keys.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { loadEgb339DataModule } from "./lib/egb339-content-loader.mjs";

const course = await loadEgb339DataModule("src/lib/egb339-course.ts");
const navigation = await loadEgb339DataModule("src/lib/egb339-study-weeks.ts");
const subjects = await loadEgb339DataModule("src/lib/egb339.ts");
for (const number of [9, 10, 11]) {
  const item = course.EGB339_COURSE_ORDER.find(row => row.week === number);
  assert(item, `Week ${number} must be included in the shared course navigation`);
  assert(subjects.egb339WeekSubject(number)?.titleEn, `Week ${number} must have bilingual subject metadata`);
  const week = { ...item, href: `/egb339/uker/uke-${number}`, title: `Week ${number}`, pageKey: `egb339/uke/uke-${number}`, assessments: [], topics: item.topics.map(slug => ({ href: `/egb339/temaer/${slug}`, title: slug, pageKey: `egb339/tema/${slug}` })) };
  for (const lang of ["no", "en"]) {
    const sections = navigation.egb339WeekSections(week, lang);
    assert.equal(new Set(sections.map(row => row.id)).size, sections.length);
    assert.deepEqual(sections.filter(row => row.pageKey).map(row => row.pageKey), week.topics.map(row => row.pageKey));
    for (const slug of item.topics) assert(sections.some(row => row.id === slug), `${number}: missing ${slug} section`);
  }
}
// Foundation concepts remain canonical in Week 8, preserving existing links.
assert.equal(navigation.egb339StudyHref("/egb339/temaer/colour-normalization-and-chromaticity"), "/egb339/uker/uke-8#colour-normalization-and-chromaticity");
assert.equal(navigation.egb339StudyHref("/egb339/temaer/shape-descriptors-from-area-and-perimeter"), "/egb339/uker/uke-8#shape-descriptors-from-area-and-perimeter");
assert(existsSync("src/lib/egb339-vision-models.ts"), "The vision explorers must expose independently testable models");
const vision = await loadEgb339DataModule("src/lib/egb339-vision-models.ts");
assert.equal(typeof vision.week9MeanPatch, "function", "QUT mean-filter explorer needs its source fixture and edge-replication model");
assert.equal(vision.convolutionCentre(vision.week9MeanPatch(3, 3), [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 9), 23 / 90);
assert(Math.abs(vision.convolutionCentre(vision.week9MeanPatch(5, 5), [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 9) - 8 / 45) < 1e-14);
const sourceCentroids = vision.binaryRegions(vision.WEEK9_REGION_GRID, 4)
  .map(({ centroid }) => centroid).sort(([a], [b]) => a - b);
assert.deepEqual(sourceCentroids, [[1.5, 2.5], [29 / 11, 79 / 11], [7, 11], [11.5, 4.5], [12.5, 8.5]]);
assert.deepEqual(["erode", "dilate", "close", "open"].map(operation =>
  vision.week9QutMorphology(operation).flat().filter(Boolean).length),
  [18, 173, 123, 58], "QUT Week 9 answer grids have these foreground counts");
const single = [[false, false, false], [false, true, false], [false, false, false]];
const empty = [[false, false, false], [false, false, false], [false, false, false]];
assert.deepEqual(vision.binaryMorphology(single, "erode"), empty);
assert.deepEqual(vision.binaryMorphology(single, "dilate"), [[true, true, true], [true, true, true], [true, true, true]]);
assert.deepEqual(vision.binaryMorphology(single, "open"), empty);
assert.deepEqual(vision.binaryMorphology(single, "close"), single);
const diagonal = [[true, false], [false, true]];
assert.equal(vision.binaryRegions(diagonal, 4).length, 2);
assert.deepEqual(vision.binaryRegions(diagonal, 8).map(({ area, centroid }) => ({ area, centroid })), [{ area: 2, centroid: [.5, .5] }]);
assert.deepEqual(vision.binaryRegions(empty, 4), []);
assert.deepEqual(vision.binaryRegions([[false, true, true], [false, true, false]], 4)[0].centroid, [4 / 3, 1 / 3]);
const patch = [[0, 0, 0], [0, 90, 0], [0, 0, 0]];
assert.equal(vision.convolutionCentre(patch, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 9), 10);
assert.equal(vision.convolutionCentre(patch, [[1, 2, 1], [2, 4, 2], [1, 2, 1]], 16), 22.5);
// Asymmetric kernel checks reversal: this is convolution, not correlation.
assert.equal(vision.convolutionCentre([[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[1, 0, 0], [0, 0, 0], [0, 0, 0]]), 9);
assert.equal(vision.rgbChromaticity([0, 0, 0], 1).chromaticity, null);
assert.deepEqual(vision.rgbChromaticity([80, 40, 20], 2).rgb, [160, 80, 40]);
assert.deepEqual(vision.rgbChromaticity([80, 40, 20], .5).chromaticity, [4 / 7, 2 / 7, 1 / 7]);
assert.throws(() => vision.rgbChromaticity([1, -1, 2], 1), RangeError);
assert.throws(() => vision.rgbChromaticity([1, 1, 1], NaN), RangeError);
assert.throws(() => vision.binaryRegions([[true], []], 4), RangeError);
assert.throws(() => vision.convolutionCentre(patch, [[1]], 0), RangeError);
console.log("EGB339 weeks 9–11: shared navigation, bilingual metadata, stable keys/links, morphology boundaries, 4/8-connectivity, moments, convolution and black-pixel chromaticity passed.");
