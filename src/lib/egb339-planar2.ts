import { compose2, matrix2, type Point2, type Pose2 } from "./egb339-se2";

export interface Planar2Model { l1: number; l2: number }
export type JointPair = readonly [number, number];
export type IkBranch = "positive" | "negative";
export const PLANAR2_QUT: Planar2Model = { l1: 5, l2: 7 };
export const PLANAR2_QUT_TARGETS: readonly Point2[] = [[5, 7], [5.347, 10.297], [10.508, -2.925]];
export const normalizeAngle = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));

function validModel({ l1, l2 }: Planar2Model) {
  if (![l1, l2].every((value) => Number.isFinite(value) && value > 0)) throw new RangeError("Link lengths must be finite and positive");
}
/** Standard planar RR: R(q1) Tx(l1) R(q2) Tx(l2). Angles in radians.
 * Frame 1 is at the elbow along link 1; frame 2=E is at the tool along link 2.
 * Reference: RTB ET2/ETS2 and models/DH/Planar2.py; Corke 7.1.1 and 7.2.1.
 */
export function planar2Forward(model: Planar2Model, joints: JointPair) {
  validModel(model);
  if (!joints.every(Number.isFinite)) throw new RangeError("Joint angles must be finite");
  const [q1, q2] = joints;
  const first: Pose2 = { theta: q1, x: model.l1 * Math.cos(q1), y: model.l1 * Math.sin(q1) };
  const second: Pose2 = { theta: q2, x: model.l2 * Math.cos(q2), y: model.l2 * Math.sin(q2) };
  const total = compose2(first, second);
  return {
    first, second, total,
    joint: [first.x, first.y] as Point2, end: [total.x, total.y] as Point2,
    t01: matrix2(first), t12: matrix2(second), t02: matrix2(total),
    singular: Math.abs(Math.sin(q2)) < 1e-10,
  };
}
export function planar2Workspace(model: Planar2Model) {
  validModel(model);
  return { inner: Math.abs(model.l1 - model.l2), outer: model.l1 + model.l2 };
}
export interface Planar2Inverse {
  kind: "regular" | "singular" | "folded-free" | "unreachable";
  c2: number; radius: number;
  positive: JointPair | null; negative: JointPair | null;
}
/** Position-only IK. No claim about orientation, collisions or physical joint limits.
 * Outside workspace stays outside; clamp only roundoff at a valid boundary.
 */
export function planar2Inverse(model: Planar2Model, target: Point2, preferredShoulder = 0): Planar2Inverse {
  const { inner, outer } = planar2Workspace(model);
  if (!target.every(Number.isFinite) || !Number.isFinite(preferredShoulder)) throw new RangeError("Target and preferred shoulder must be finite");
  const [x, y] = target;
  const radius = Math.hypot(x, y);
  const tolerance = 32 * Number.EPSILON * Math.max(1, outer);
  const rawC2 = (x * x + y * y - model.l1 ** 2 - model.l2 ** 2) / (2 * model.l1 * model.l2);
  if (radius < inner - tolerance || radius > outer + tolerance) return { kind: "unreachable", c2: rawC2, radius, positive: null, negative: null };
  const c2 = Math.abs(rawC2 - 1) < 64 * Number.EPSILON ? 1 : Math.abs(rawC2 + 1) < 64 * Number.EPSILON ? -1 : Math.max(-1, Math.min(1, rawC2));
  if (model.l1 === model.l2 && radius <= tolerance) {
    const folded: JointPair = [normalizeAngle(preferredShoulder), Math.PI];
    return { kind: "folded-free", c2, radius, positive: folded, negative: folded };
  }
  const bend = Math.acos(c2);
  const solve = (q2: number): JointPair => [
    normalizeAngle(Math.atan2(y, x) - Math.atan2(model.l2 * Math.sin(q2), model.l1 + model.l2 * Math.cos(q2))), q2,
  ];
  return { kind: Math.abs(Math.sin(bend)) < 1e-10 ? "singular" : "regular", c2, radius, positive: solve(bend), negative: solve(-bend) };
}
