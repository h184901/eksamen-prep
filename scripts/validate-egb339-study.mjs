#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import katex from "katex";
import ts from "typescript";
import { loadEgb339DataModule } from "./lib/egb339-content-loader.mjs";

const arm = await loadEgb339DataModule("src/lib/egb339-planar2.ts");
const se2 = await loadEgb339DataModule("src/lib/egb339-se2.ts");
const readable = await loadEgb339DataModule("src/lib/egb339-readable-math.ts");
const format = await loadEgb339DataModule("src/lib/egb339-math-format.ts");
const fixture = JSON.parse(readFileSync("scripts/fixtures/egb339-rtb-reference.json", "utf8"));
let checks = 0;
function close(a, b, tolerance = 1e-9) {
  assert(Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tolerance, a + " != " + b);
  checks++;
}
function vector(a, b) { assert.equal(a.length, b.length); a.forEach((value, i) => close(value, b[i])); }
function matrix(a, b) { a.forEach((row, i) => vector(row, b[i])); }
const multiply = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
for (const sample of fixture.cases) {
  const actual = arm.planar2Forward(sample.model, sample.q);
  for (const key of ["t01", "t12", "t02"]) matrix(actual[key], sample[key]);
}
const a = { theta: Math.PI / 6, x: 1, y: 2 }, b = { theta: 0, x: 2, y: 1 };
matrix(se2.matrix2(se2.compose2(a, b)), fixture.composition.ab);
matrix(se2.matrix2(se2.compose2(b, a)), fixture.composition.ba);
let configurations = 0;
for (const l1 of [1, 5, 8]) for (const l2 of [1, 7, 8]) {
  const model = { l1, l2 };
  for (let i = -18; i <= 18; i++) for (let j = -18; j <= 18; j++) {
    const q = [i * Math.PI / 18, j * Math.PI / 18];
    const fk = arm.planar2Forward(model, q);
    matrix(multiply(fk.t01, fk.t12), fk.t02);
    close(fk.end[0], l1 * Math.cos(q[0]) + l2 * Math.cos(q[0] + q[1]));
    close(fk.end[1], l1 * Math.sin(q[0]) + l2 * Math.sin(q[0] + q[1]));
    const ik = arm.planar2Inverse(model, fk.end, q[0]);
    assert.notEqual(ik.kind, "unreachable", "FK output must be reachable");
    for (const branch of ["positive", "negative"]) {
      assert(ik[branch], "Each reachable target supplies a branch");
      vector(arm.planar2Forward(model, ik[branch]).end, fk.end);
    }
    if (ik.kind === "regular") {
      assert(ik.positive[1] > 0 && ik.negative[1] < 0);
      assert.notDeepEqual(ik.positive, ik.negative);
    }
    const radius = Math.hypot(...fk.end);
    assert(radius >= Math.abs(l1 - l2) - 1e-10 && radius <= l1 + l2 + 1e-10);
    // Both local rotations and the total remain proper rotations.
    for (const t of [fk.t01, fk.t12, fk.t02]) {
      close(t[0][0] * t[1][1] - t[0][1] * t[1][0], 1);
      vector(t[2], [0, 0, 1]);
      katex.renderToString(format.matrixTex(t), { throwOnError: true });
    }
    configurations++;
  }
  for (const point of [[l1 + l2 + 1e-6, 0], [-(l1 + l2 + 1), 0], [0, l1 + l2 + 1]]) assert.equal(arm.planar2Inverse(model, point).kind, "unreachable");
  if (l1 !== l2) for (const point of [[0, 0], [Math.abs(l1 - l2) - 1e-6, 0]]) assert.equal(arm.planar2Inverse(model, point).kind, "unreachable");
  for (const radius of [Math.abs(l1 - l2), l1 + l2]) {
    const ik = arm.planar2Inverse(model, [radius, 0], .4);
    assert(["singular", "folded-free"].includes(ik.kind));
  }
}
const first = arm.planar2Inverse(arm.PLANAR2_QUT, arm.PLANAR2_QUT_TARGETS[0]);
vector(first.positive, [0, Math.PI / 2]);
vector(first.negative, [2 * Math.atan2(7, 5), -Math.PI / 2]);
for (const [index, expected] of [[1, [.785365, .523689]], [2, [-.785621, .873064]]]) {
  const result = arm.planar2Inverse(arm.PLANAR2_QUT, arm.PLANAR2_QUT_TARGETS[index]);
  result.positive.forEach((value, i) => close(value, expected[i], 2e-6));
  vector(arm.planar2Forward(arm.PLANAR2_QUT, result.negative).end, arm.PLANAR2_QUT_TARGETS[index]);
}
const folded = arm.planar2Inverse({ l1: 5, l2: 5 }, [0, 0], .713);
assert.equal(folded.kind, "folded-free");
vector(folded.positive, [.713, Math.PI]);
for (const bad of [{ l1: 0, l2: 1 }, { l1: -1, l2: 1 }, { l1: NaN, l2: 1 }]) assert.throws(() => arm.planar2Forward(bad, [0, 0]), RangeError);
assert.throws(() => arm.planar2Inverse(arm.PLANAR2_QUT, [Infinity, 0]), RangeError);

let formulas = 0;
for (const [original, tex] of Object.entries(readable.EGB339_READABLE_FORMULAS)) {
  katex.renderToString(tex, { throwOnError: true, trust: false });
  assert.equal(readable.egb339ReadableMath("\x60" + original + "\x60"), "$$\n" + tex + "\n$$");
  assert.equal(readable.egb339ReadableMath("\x60" + original + "\x60."), "$$\n" + tex + ".\n$$", "Punctuation must not turn a display matrix back into inline text");
  const fenced = "\x60\x60\x60python\n\x60" + original + "\x60\n\x60\x60\x60";
  assert.equal(readable.egb339ReadableMath(fenced), fenced);
  formulas++;
}
const python = "\x60np.allclose(R.T @ R, np.eye(2))\x60";
assert.equal(readable.egb339ReadableMath(python), python);
assert.equal(readable.egb339ReadableMath("\x60unknown_matrix_operation\x60"), "\x60unknown_matrix_operation\x60");

function files(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(root + "/" + entry.name) : [root + "/" + entry.name]);
}
const entries = ["weeks", "concepts", "assessments", "resources"].flatMap((group) => JSON.parse(readFileSync("src/data/egb339-vault/" + group + ".json", "utf8"))[group]);
const routes = new Set(["/egb339", "/egb339/studieplan", "/egb339/uker", "/egb339/temaer", "/egb339/vurderinger", "/egb339/ressurser", "/egb339/oppsummering", ...entries.map((entry) => entry.route)]);
let literalLinks = 0, staticTex = 0;
for (const file of [...files("src/app/egb339"), ...files("src/components/egb339")].filter((file) => file.endsWith(".tsx"))) {
  const source = readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    if (ts.isTaggedTemplateExpression(node) && node.tag.getText(ast) === "String.raw" && ts.isNoSubstitutionTemplateLiteral(node.template)) {
      katex.renderToString(node.template.getText(ast).slice(1, -1), { throwOnError: true }); staticTex++;
    }
    if (ts.isJsxAttribute(node) && node.name.getText(ast) === "href" && node.initializer && ts.isStringLiteral(node.initializer) && node.initializer.text.startsWith("/egb339")) {
      assert(routes.has(node.initializer.text.split("#")[0]), file + ": broken literal route " + node.initializer.text); literalLinks++;
    }
    // Include conditional href values as well, not only direct JSX attributes.
    if (ts.isStringLiteral(node) && node.text.startsWith("/egb339/") && !node.text.endsWith("/") && !node.text.endsWith("-") && !node.text.endsWith("#")) {
      const target = node.text.split("#")[0];
      assert(routes.has(target) || existsSync("public" + target), file + ": unknown EGB339 route literal " + node.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
const layout = readFileSync("src/app/egb339/layout.tsx", "utf8");
assert(layout.includes("<Egb339PilotShell>{children}</Egb339PilotShell>"), "All EGB339 routes share the study shell");
for (const file of files("src/app/egb339").filter((file) => file.endsWith("page.tsx"))) assert(!readFileSync(file, "utf8").includes("<Egb339PilotShell>"), "No nested sidebars");
console.log("EGB339 phases 2–3 passed: " + fixture.cases.length + " independent RTB/DH fixtures; " + configurations + " FK/IK configurations; " + checks + " numeric assertions; boundary/unreachable/free-shoulder tests; " + formulas + " math-format replacements; " + staticTex + " static TeX expressions; " + literalLinks + " literal routes; " + routes.size + " addressable pages. Browser QA is separate.");
