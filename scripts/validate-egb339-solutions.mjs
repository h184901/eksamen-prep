#!/usr/bin/env node
// Independent numerical regressions for the published worked examples.
// Reference provenance and QUT discrepancies: docs/egb339-solutions-qa.md.
import assert from "node:assert/strict";
import sharp from "sharp";
import { loadEgb339DataModule } from "./lib/egb339-content-loader.mjs";

const { getEgb339ProblemsForWeek } = await loadEgb339DataModule("src/lib/egb339-problems.ts");
const { getEgb339AssessmentSolutions } = await loadEgb339DataModule("src/lib/egb339-assessment-solutions.ts");
const assessments = getEgb339AssessmentSolutions();
const problems = Array.from({ length: 7 }, (_, i) => getEgb339ProblemsForWeek(i + 2)).flat();
if (process.argv.includes("--json")) {
  // Allows a separate Python audit to execute the actual teaching snippets,
  // rather than a second implementation copied into a test.
  await new Promise((done) => process.stdout.write(JSON.stringify({ problems, assessments }), done));
  process.exit(0);
}

let checks = 0;
const flat = (value) => Array.isArray(value) ? value.flat(Infinity) : [value];
function close(actual, expected, tolerance = 1e-6) {
  const a = flat(actual), b = flat(expected);
  assert.equal(a.length, b.length);
  for (let i = 0; i < a.length; i++) assert(Number.isFinite(a[i]) && Math.abs(a[i] - b[i]) <= tolerance, `${a[i]} != ${b[i]} (tolerance ${tolerance})`);
  checks++;
}
const { sin, cos, sqrt, atan2, acos, PI } = Math;
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const multiply = (A, B) => A.map((row) => transpose(B).map((column) => dot(row, column)));
const apply = (A, p) => A.map((row) => dot(row, p));
const add = (a, b) => a.map((x, i) => x + b[i]);
const subtract = (a, b) => a.map((x, i) => x - b[i]);
const rotation = (axis, a) => ({
  x: [[1, 0, 0], [0, cos(a), -sin(a)], [0, sin(a), cos(a)]],
  y: [[cos(a), 0, sin(a)], [0, 1, 0], [-sin(a), 0, cos(a)]],
  z: [[cos(a), -sin(a), 0], [sin(a), cos(a), 0], [0, 0, 1]],
})[axis];
const rot2 = (a) => [[cos(a), -sin(a)], [sin(a), cos(a)]];
const fk2 = ([q1, q2], L1, L2) => [L1 * cos(q1) + L2 * cos(q1 + q2), L1 * sin(q1) + L2 * sin(q1 + q2)];
function ik2([x, y], L1, L2, sign) {
  const c = (x * x + y * y - L1 * L1 - L2 * L2) / (2 * L1 * L2);
  assert(Math.abs(c) <= 1);
  const q2 = sign * acos(c);
  return [atan2(y, x) - atan2(L2 * sin(q2), L1 + L2 * cos(q2)), q2];
}
function invert2([[a, b], [c, d]]) { const det = a * d - b * c; assert(det !== 0); return [[d / det, -b / det], [-c / det, a / det]]; }

// Week 2: every numeric tutorial subpart.
for (const [a, b, expected] of [[[2, 0], [1, 7], 2], [[3, 1], [2, 2], 8], [[3, 1, 4], [6, 2, 1], 24], [[3, 5], [5, 1], 20]]) close(dot(a, b), expected);
close(multiply([[2, 2], [2, 2]], [[1, 6], [2, 3]]), [[6, 18], [6, 18]]);
close(multiply([[1], [7]], [[2, 0]]), [[2, 0], [14, 0]]);
close(apply([[3, 1, 4], [2, 2, 5]], [6, 1, 3]), [31, 29]);
for (const A of [[[1, 2], [3, 4]], [[5, 2], [6, 7]], [[3, 7, 2], [3, 4, 1], [2, 9, 1]], [[1], [7]], [[3, 1, 4], [2, 2, 5]]]) close(transpose(transpose(A)), A);
close(transpose([[3, 1, 4], [2, 2, 5]]), [[3, 2], [1, 2], [4, 5]]);
for (const A of [[[1, 2], [3, 4]], [[5, 2], [6, 7]], [[1, 0], [0, 1]], [[1, 2], [2, 1]]]) close(multiply(A, invert2(A)), [[1, 0], [0, 1]]);
assert.throws(() => invert2([[2, 2], [2, 2]]));
for (const a of [0, PI / 2, PI, PI / 4, PI / 6, -PI / 3, PI / 18, -2 * PI / 3]) close(multiply(transpose(rot2(a)), rot2(a)), [[1, 0], [0, 1]]);
close(apply(rot2(-PI / 4), [0, 3]), [3 / sqrt(2), 3 / sqrt(2)]);
close(apply(rot2(-PI / 2), [2, 3]), [3, -2]);
close(apply(rot2(PI), [5, 1]), [-5, -1]);
close(add(apply(rot2(PI / 4), [2, 3]), [1, 2]), [1 - 1 / sqrt(2), 2 + 5 / sqrt(2)]);
close(apply(rot2(PI / 2), [2, 3]), [-3, 2]);
close(apply(rot2(-PI), subtract([2, 3], [2, 3])), [0, 0]);
close(apply(rot2(-PI), subtract([2, 3], [1, 6])), [-1, 3]);

// Week 3: ordered rotations, all four poses and the pose graph.
const h = sqrt(2) / 2;
close(multiply(rotation("x", PI / 4), rotation("y", PI / 2)), [[0, 0, 1], [h, h, 0], [-h, h, 0]]);
close(multiply(rotation("y", PI / 2), rotation("x", PI / 4)), [[0, h, h], [0, h, -h], [-1, 0, 0]]);
close(multiply(rotation("x", PI / 6), rotation("x", PI / 3)), rotation("x", PI / 2));
close(add(apply(multiply(rotation("x", PI / 4), rotation("y", PI / 4)), [0, 3, 0]), [2, 0, 0]), [2, 2.121320344, 2.121320344]);
close(apply(transpose(multiply(rotation("z", PI / 4), rotation("y", PI / 6))), [1, -2, -1]), [-0.112372436, -2.121320344, -1.219578794]);
close(add(apply(multiply(multiply(rotation("x", PI / 2), rotation("z", PI / 2)), rotation("x", PI / 2)), [0, 5, 3]), [1, 1, 1]), [4, -4, 1]);
close(apply(transpose(multiply(multiply(rotation("y", PI / 3), rotation("z", PI / 4)), rotation("x", PI / 6))), [-1, -1, -1]), [-0.448287736, -1.519529006, -0.700049789]);
const pE = add(apply(rotation("y", -PI / 2), [2, 0, 0]), [0, 0, 1]);
const pM = apply(rotation("x", -PI / 4), subtract(pE, [2, 0, 2]));
close(pE, [0, 0, 3]); close(pM, [-2, h, h]); close(add(apply(rotation("z", PI / 2), pM), [0, 5, 0]), [-h, 3, h]);

// Week 4: full planar chain, not just a repeated answer string.
const planar = ([q1, q2, q3]) => [8 + (5 + q2) * cos(PI / 4 + q1) + 4 * cos(q1 + q3), (5 + q2) * sin(PI / 4 + q1) + 4 * sin(q1 + q3)];
close(planar([0, 0, 0]), [15.535533906, 3.535533906]);
close(planar([PI / 3, 2, -PI / 6]), [9.652368299, 8.761480784]);
const fkDobot = ([t1, t2, t3], L3, dz) => { const r = 135 * sin(t2) + 147 * cos(t3) + L3; return [r * cos(t1), r * sin(t1), 138 + 135 * cos(t2) - 147 * sin(t3) + dz]; };
close(fkDobot([0, 0, 0], 60, -80), [207, 0, 193]);
close(fkDobot([PI / 2, 0, 0], 60, -80), [0, 207, 193]);

// Week 5: all six 2R solutions and both PR solutions for the literal decimals.
for (const p of [[5, 7], [5.347, 10.297], [10.508, -2.925]]) for (const sign of [1, -1]) close(fk2(ik2(p, 5, 7, sign), 5, 7), p);
const prReferences = [
  [[0, 9.899], [[6.929653598, 1.560796670], [7.069646455, 1.580795983]]],
  [[8.883, 0.31], [[3.000170435, -1.047154298], [10.000694844, 4.188746952]]],
  [[11.086, 12.805], [[9.999830191, 0.174529924], [23.787146028, 2.967062729]]],
];
for (const [p, solutions] of prReferences) for (const [q1, q2] of solutions) close(apply(rot2(PI / 4), [q1 + 7 * cos(q2), 7 * sin(q2)]), p);

// Week 6: derivatives checked by independent finite differences, then FK/J.
const functions = [x => 4*x*x, x => 3*sin(2*x), x => (2*x**3)*(4*x), x => 4*x*(3*x*x+4), x => 5*x**4-3*cos(x)+2*x*(x**3+2*x), x => x*x+2*cos(x)+2*x*(x**3+2*x), x => x*x*(2*sin(x)+5*x)];
const derivatives = [x => 8*x, x => 6*cos(2*x), x => 32*x**3, x => 36*x*x+16, x => 28*x**3+3*sin(x)+8*x, x => 8*x**3+10*x-2*sin(x), x => 15*x*x+4*x*sin(x)+2*x*x*cos(x)];
for (let i=0;i<functions.length;i++) for (const x of [-0.7, 0.2, 1.3]) close((functions[i](x+1e-5)-functions[i](x-1e-5))/2e-5, derivatives[i](x), 1e-6);
const q0 = [PI/4, PI/4], J = [[-5/sqrt(2)-7,-7],[5/sqrt(2),0]], p0 = fk2(q0, 5, 7);
for (let i=0;i<2;i++) { const a=[...q0],b=[...q0];a[i]+=1e-5;b[i]-=1e-5;close(subtract(fk2(a,5,7),fk2(b,5,7)).map(v=>v/2e-5),transpose(J)[i]); }
close(apply(J,[0.5,0.5]),[-8.767766953,1.767766953]);
close(add(p0,apply(J,[0.1,0.1])),[1.781980515,10.889087297]);
close(fk2(add(q0,[0.1,0.1]),5,7),[1.77422122,10.73130144]);
const qdot = apply(invert2(J),[0,1]);close(qdot,[0.282842712,-0.425699855]);
close(fk2(add(q0,qdot.map(v=>v*0.5)),5,7),[3.50147739,10.98072290]);
assert(problems.find(p=>p.id==="w6-differential-motion").answer.includes("1.7742"));
assert(!problems.find(p=>p.id==="w6-differential-motion").answer.includes("1.1137"));

// Week 7: both branches at every waypoint, joint path, profile and projections.
const cartesian = [[0.75,0.5],[0.75,0.25],[0.75,0],[0.75,-0.25],[0.75,-0.5]];
for (const p of cartesian) for (const sign of [1,-1]) close(fk2(ik2(p,2,1.5,sign),2,1.5),p);
const start=ik2(cartesian[0],2,1.5,1),end=ik2(cartesian[4],2,1.5,1);
for (let i=0;i<5;i++) close(fk2(start.map((v,j)=>v+(end[j]-v)*i/4),2,1.5),[[0.75,0.5],[0.8627,0.2612],[0.9014,0],[0.8627,-0.2612],[0.75,-0.5]][i],0.0001);
const displacement=t=>t<=2?0.75*t*t:t<=5?3+3*(t-2):12+3*(t-5)-0.5*(t-5)**2;
close([displacement(2),displacement(5),displacement(6),displacement(8)],[3,12,14.5,16.5]);
function segmentDistance(O,A,B) { const v=subtract(B,A), vv=dot(v,v),t=vv?Math.max(0,Math.min(1,dot(subtract(O,A),v)/vv)):0;return Math.hypot(...subtract(O,add(A,v.map(x=>x*t)))); }
for (const [p,d] of [[[0.5,2.8],1.695315],[[1.5,0.5],0.704794],[[2.5,3],0.552406],[[2.7,2.1],0.262869],[[0.9,0.9],0.141421]]) close(segmentDistance(p,[1,1],[3,2.7]),d);
close(segmentDistance([1,1],[0,0],[0,0]),sqrt(2));
close(Math.min(segmentDistance([1,1],[0,0],[2,0]),segmentDistance([1,1],[2,0],[2,2])),1);

// Assessment examples: independent transforms and FK→IK→FK round trips.
const R = multiply(multiply(rotation("x",0.2),rotation("y",0.3)),rotation("z",0.4));
close(apply(R,[1,2,3]),[1.0224327,1.6260200,3.2110264]);
close(apply(transpose(R),[3,4,1]),[4.1932971,2.6990491,1.0636697]);
close(apply(transpose(R),[-4,-4,-8]),[-3.7474138,-4.3974387,-7.9132435]);
close(fkDobot([0,0,0],30,-90),[177,0,183]);
close(Math.hypot(...subtract(fkDobot([0,0,0],50,-120),[150,150,100])),sqrt(27518));
close(fkDobot([0.785398163,0.180188262,0.352958912],50,-120),[150,150,100]);
close(fkDobot([0,0,0],60,-70),[207,0,203]);
for (const [local,expected] of [[[13.3,28.75],[219.25,-63.95]],[[13.3,17.25],[230.75,-63.95]],[[8.1,5.75],[242.25,-69.15]],[[139.1,5.75],[242.25,61.85]]]) close([248-local[1],-77.25+local[0]],expected);
close(4*PI*(100*PI)/(20*PI)**2,1);close(4*PI*100/40**2,PI/4);
close(4*PI*120/87**2,0.199229);
close(0.5*300*425,63750);close([-0.4*320,0.4*250+400],[-128,500]);

// Week 8: measure the actual distributed image, not a mock image.
const {data,info} = await sharp("public/egb339/week8/highway.jpg").greyscale().raw().toBuffer({resolveWithObject:true});
close([info.width,info.height,info.channels],[2048,1536,1]);
const histogram=new Array(256).fill(0); for (const pixel of data) histogram[pixel]++;
close(histogram.reduce((a,b)=>a+b),3145728);assert(histogram[0]>0&&histogram[255]>0);
close(histogram.indexOf(Math.max(...histogram)),100);close(histogram[100],47729);
const column=Array.from({length:info.height},(_,v)=>data[v*info.width+1155]);close([Math.min(...column),Math.max(...column)],[14,255]);
close([(765-615)*10,(915-840)*10,2048/4,1536/4],[1500,750,512,384]);
close((96*0.5+4*0.9)/100,0.516);close((9*9+9*9)/200,0.81);

assert.equal(problems.length,38);assert.equal(Object.keys(assessments).length,12);
assert.equal(assessments["assessment-1-0-warmup-to-gradescope"].parts.length,15);
console.log(`EGB339 calculation validation passed: ${checks} numerical checks, 38 weekly cards, 12 assessment walkthroughs, actual highway pixels and documented answer corrections.`);
