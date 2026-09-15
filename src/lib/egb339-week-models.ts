import { planar2Forward, planar2Inverse, type JointPair, type Planar2Model } from "./egb339-planar2";
import type { Point2 } from "./egb339-se2";

/** Position Jacobian in the world frame. QUT Week 6; Corke 8.1.1; ETS2.jacob0[:2]. */
export function planarVelocity(model: Planar2Model, q: JointPair, qd: JointPair) {
  const fk = planar2Forward(model, q);
  if (!qd.every(Number.isFinite)) throw new RangeError("Joint velocity must be finite");
  const j1: Point2 = [-fk.end[1], fk.end[0]];
  const j2: Point2 = [-(fk.end[1] - fk.joint[1]), fk.end[0] - fk.joint[0]];
  const contributions: readonly Point2[] = [[j1[0] * qd[0], j1[1] * qd[0]], [j2[0] * qd[1], j2[1] * qd[1]]];
  const velocity: Point2 = [contributions[0][0] + contributions[1][0], contributions[0][1] + contributions[1][1]];
  return { ...fk, columns: [j1, j2], contributions, velocity, omega: qd[0] + qd[1], determinant: j1[0] * j2[1] - j2[0] * j1[1] };
}

export const WEEK7_MODEL: Planar2Model = { l1: 2, l2: 1.5 };
export const WEEK7_START: Point2 = [0.75, 0.5];
export const WEEK7_END: Point2 = [0.75, -0.5];
/** QUT's linear interpolation, not RTB jtraj's quintic timing. Positive IK branch. */
export function week7Path(alpha: number) {
  if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) throw new RangeError("alpha must lie in [0, 1]");
  const qs = planar2Inverse(WEEK7_MODEL, WEEK7_START).positive!;
  const qe = planar2Inverse(WEEK7_MODEL, WEEK7_END).positive!;
  const jointQ: JointPair = [qs[0] + alpha * (qe[0] - qs[0]), qs[1] + alpha * (qe[1] - qs[1])];
  const cartesian: Point2 = [0.75, 0.5 - alpha];
  return { alpha, jointQ, joint: planar2Forward(WEEK7_MODEL, jointQ).end, cartesian, cartesianQ: planar2Inverse(WEEK7_MODEL, cartesian).positive! };
}

/** QUT Week 7 p. 9. Acceleration is discontinuous at 2 and 5 s. */
export function week7Profile(t: number) {
  if (!Number.isFinite(t) || t < 0 || t > 8) throw new RangeError("time must lie in [0, 8]");
  if (t <= 2) return { distance: 0.75 * t * t, velocity: 1.5 * t };
  if (t <= 5) return { distance: 3 + 3 * (t - 2), velocity: 3 };
  const u = t - 5;
  return { distance: 12 + 3 * u - 0.5 * u * u, velocity: 3 - u };
}

/** QUT Week 8 practical task 8B: float image, two central rows and columns. */
export function week8Pixel(u: number, v: number) {
  if (![u, v].every(n => Number.isInteger(n) && n >= 0 && n < 10)) throw new RangeError("Pixel index must lie in 0..9");
  return u >= 4 && u < 6 && v >= 4 && v < 6 ? 0.9 : 0.5;
}
