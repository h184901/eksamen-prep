#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import ts from "typescript";
import postcss from "postcss";
import { runInNewContext } from "node:vm";
import katex from "katex";
import { loadEgb339DataModule } from "./lib/egb339-content-loader.mjs";

// Exercise the real route handler with isolated auth/storage stubs. No DB calls.
const progressModule = { exports: {} };
let progressUnavailable = false;
const progressCode = ts.transpileModule(readFileSync("src/app/api/progress/route.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
runInNewContext(progressCode, {
  exports: progressModule.exports, module: progressModule, URL,
  console: { error() {} },
  require(name) {
    if (name === "next/server") return { NextResponse: { json: (body, init) => Response.json(body, init) } };
    if (name === "@/lib/auth") return { getSession: async () => ({ userId: -339 }) };
    if (name === "@/lib/progress") return {
      getUserProgress: async () => { if (progressUnavailable) throw Error("Isolated QA storage outage"); return []; },
      setPageProgress: () => { throw Error("Validator must never write progress"); },
    };
    throw Error(`Unexpected progress dependency: ${name}`);
  },
});
const progressRequest = new Request("http://localhost/api/progress");
const emptyProgress = await progressModule.exports.GET(progressRequest);
assert.equal(emptyProgress.status, 200, "An actual empty progress list is successful");
assert.deepEqual(await emptyProgress.json(), { rows: [] });
progressUnavailable = true;
const unavailableProgress = await progressModule.exports.GET(progressRequest);
assert.equal(unavailableProgress.status, 503, "Storage failure must not masquerade as empty progress");
assert.equal(typeof (await unavailableProgress.json()).error, "string");

const course = await loadEgb339DataModule("src/lib/egb339-course.ts");
const math = await loadEgb339DataModule("src/lib/egb339-se2.ts");
const { svgCoordinate } = await loadEgb339DataModule("src/lib/egb339-math-format.ts");
const { getEgb339ProblemsForWeek } = await loadEgb339DataModule("src/lib/egb339-problems.ts");
const { getEgb339AssessmentSolutions } = await loadEgb339DataModule("src/lib/egb339-assessment-solutions.ts");
const groups = Object.fromEntries(["weeks", "concepts", "assessments", "resources"].map((group) =>
  [group, JSON.parse(readFileSync(`src/data/egb339-vault/${group}.json`, "utf8"))[group]],
));
const topics = course.EGB339_COURSE_ORDER.flatMap((week) => [...week.topics]);
const allTopics = [...topics, ...course.EGB339_REFERENCE_TOPICS, ...course.EGB339_ARCHIVED_TOPICS];
assert.equal(new Set(allTopics).size, allTopics.length, "Each concept has one navigation role");
assert.deepEqual([...allTopics].sort(), groups.concepts.map((entry) => entry.slug).sort());
assert.deepEqual(course.EGB339_COURSE_ORDER.map(({ week }) => week), [1, 2, 3, 4, 5, 6, 7, 8]);
for (const { week } of course.EGB339_COURSE_ORDER) {
  assert(groups.weeks.some((entry) => entry.slug === `uke-${week}`));
}
assert.deepEqual(course.egb339LessonNeighbours("se-2-homogeneous-transformations"), {
  previous: "so-2-rotation-matrices", next: "numpy-arrays-and-matrix-operations",
});
assert.equal(course.egb339LessonNeighbours(topics[0]).previous, null);
assert.equal(course.egb339LessonNeighbours(topics.at(-1)).next, null);
assert.deepEqual(course.egb339LessonNeighbours("not-a-lesson"), { previous: null, next: null });
const routes = new Set([
  "/egb339", "/egb339/uker", "/egb339/temaer", "/egb339/vurderinger", "/egb339/ressurser", "/egb339/oppsummering",
  ...Object.values(course.EGB339_PILOT), ...Object.values(groups).flat().map((entry) => entry.route),
]);
assert.equal(Object.values(course.EGB339_PILOT).length, 3);
assert.equal([...routes].filter(course.isEgb339PilotRoute).length, 3, "Original entry points remain available after rollout");
assert(!course.isEgb339PilotRoute(`${course.EGB339_PILOT.lesson}/extra`));
const walkthroughs = getEgb339AssessmentSolutions();
for (const assessment of groups.assessments) {
  assert(walkthroughs[assessment.slug]?.weeks.some((week) => course.EGB339_COURSE_ORDER.some((row) => row.week === week)), `Assessment missing from syllabus: ${assessment.slug}`);
}
const assessment = walkthroughs[course.EGB339_PILOT.assessment.split("/").at(-1)];
assert.deepEqual(assessment.parts.map(({ id }) => id), ["q1", "q2", "q3", "q4", "q5"]);
assert(assessment.weeks.includes(2));

const close = (a, b, label = "Numerical agreement") => assert(Math.abs(a - b) < 1e-10, `${label}: ${a} != ${b}`);
const vectorClose = (a, b, label) => a.forEach((value, i) => close(value, b[i], label));
const { pose, point } = math.SE2_TUTORIAL;
const source = getEgb339ProblemsForWeek(2).find((problem) => problem.id === "w2-pose");
assert.equal(source.sourcePage, 17);
assert.equal(source.verification, "official");
assert(source.prompt.includes("[2,3]") && source.prompt.includes("[1,2]") && source.prompt.includes("\\pi/4"));
vectorClose(math.transform2(pose, point), [1 - Math.SQRT1_2, 2 + 5 * Math.SQRT1_2], "QUT tutorial p17 case 1");
vectorClose(math.transform2({ theta: Math.PI / 2, x: 1, y: 2 }, point), [-2, 4], "Try-it answer");

// Validate actual figure projection, not a second hard-coded copy of its geometry.
const explorer = readFileSync("src/components/egb339/pilot/SE2Explorer.tsx", "utf8");
const projection = explorer.match(/const screen = \(\[x, y\]: Point2\): Point2 => \[([^\]]+)\];/);
assert(projection, "Figure projection must be checked if its implementation changes");
const project = new Function("x", "y", "svgCoordinate", `return [${projection[1]}];`);
const screen = (x, y) => project(x, y, svgCoordinate);
const [, width, height] = explorer.match(/viewBox="0 0 (\d+) (\d+)" role="img"/);
let configurations = 0;
for (let degrees = -180; degrees <= 180; degrees++) {
  for (const x of [-2, 3]) for (const y of [-2, 3]) {
    for (const px of [-2, 3]) for (const py of [-2, 3]) {
      const frame = { theta: degrees * Math.PI / 180, x, y };
      const p = [px, py], result = math.transform2(frame, p), matrix = math.matrix2(frame);
      vectorClose(math.inverseTransform2(frame, result), p, "Inverse round-trip");
      vectorClose(matrix.slice(0, 2).map((row) => row[0] * px + row[1] * py + row[2]), result, "Homogeneous product");
      close(matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0], 1, "det R = 1");
      close(matrix[0][0] * matrix[0][1] + matrix[1][0] * matrix[1][1], 0, "Orthogonal columns");
      const rotated = math.rotate2(frame.theta, p);
      close(Math.hypot(...rotated), Math.hypot(...p), "Rotation preserves length");
      for (const plotted of [result, rotated]) {
        const [sx, sy] = screen(...plotted);
        assert(sx > 16 && sx < Number(width) - 30 && sy > 30 && sy < Number(height) - 16, "Point and label fit at slider extremes");
      }
      const b = { theta: -0.6, x: 2, y: -1 };
      vectorClose(math.transform2(math.compose2(frame, b), p), math.transform2(frame, math.transform2(b, p)), "Composition order");
      configurations++;
    }
  }
}
const a = { theta: Math.PI / 2, x: 0, y: 0 }, b = { theta: 0, x: 1, y: 0 };
assert.notDeepEqual(math.transform2(math.compose2(a, b), [0, 0]), math.transform2(math.compose2(b, a), [0, 0]));

const componentRoot = "src/components/egb339/pilot";
const files = readdirSync(componentRoot).filter((name) => name.endsWith(".tsx")).map((name) => `${componentRoot}/${name}`);
files.push("src/app/egb339/studieplan/page.tsx");
let expressions = 0, links = 0;
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    if (ts.isTaggedTemplateExpression(node) && node.tag.getText(ast) === "String.raw" && ts.isNoSubstitutionTemplateLiteral(node.template)) {
      const formula = node.template.getText(ast).slice(1, -1);
      katex.renderToString(formula, { throwOnError: true, trust: false });
      expressions++;
    }
    if (ts.isJsxAttribute(node) && node.name.getText(ast) === "href" && node.initializer && ts.isStringLiteral(node.initializer)) {
      const href = node.initializer.text;
      if (href.startsWith("/egb339")) {
        assert(routes.has(href.split("#")[0]), `${file}: broken route ${href}`);
        links++;
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
const css = postcss.parse(readFileSync("src/app/egb339/pilot.css", "utf8"));
css.walkRules((rule) => {
  for (const selector of rule.selectors) assert(/\.egb339-pilot|\.egb-pilot-/.test(selector), `Unscoped CSS: ${selector}`);
});
function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255).map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels.reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i], 0);
}
const contrasts = [];
css.walkRules((rule) => {
  if (![".egb339-pilot", ".dark .egb339-pilot"].includes(rule.selector)) return;
  const tokens = Object.fromEntries(rule.nodes.filter((node) => node.type === "decl").map(({ prop, value }) => [prop, value]));
  if (!tokens["--egb-paper"]) return; // Responsive layout overrides do not redefine the palette.
  for (const token of ["--egb-ink", "--egb-muted", "--egb-accent", "--egb-point"]) {
    const foreground = luminance(tokens[token]), background = luminance(tokens["--egb-paper"]);
    const ratio = (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05);
    assert(ratio >= 4.5, `${rule.selector}: ${token} contrast ${ratio}`);
    contrasts.push(Number(ratio.toFixed(2)));
  }
});
console.log(`EGB339 study foundation passed: ${topics.length} ordered topics + ${allTopics.length - topics.length} reference/archive entries; original entry points preserved; ${groups.assessments.length} mapped assessments; ${configurations} SE(2) configurations; ${expressions} static TeX expressions; ${links} literal links; scoped CSS; text contrast ${Math.min(...contrasts)}:1 or better.`);
