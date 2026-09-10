/** Right-handed planar frames; column vectors; A_T_B maps B coordinates to A. */
export type Point2 = readonly [number, number];
export interface Pose2 { theta: number; x: number; y: number }
export const SE2_TUTORIAL = {
  pose: { theta: Math.PI / 4, x: 1, y: 2 },
  point: [2, 3] as Point2,
  source: "QUT Week 2, Tutorial – Linear Algebra and 2D Pose, PDF-side 17",
} as const;
export function rotate2(theta: number, [x, y]: Point2): Point2 {
  const c = Math.cos(theta), s = Math.sin(theta);
  return [c * x - s * y, s * x + c * y];
}
export function transform2(pose: Pose2, point: Point2): Point2 {
  const [x, y] = rotate2(pose.theta, point);
  return [x + pose.x, y + pose.y];
}
export function inverseTransform2(pose: Pose2, [x, y]: Point2): Point2 {
  return rotate2(-pose.theta, [x - pose.x, y - pose.y]);
}
export function matrix2(pose: Pose2): number[][] {
  const c = Math.cos(pose.theta), s = Math.sin(pose.theta);
  return [[c, -s, pose.x], [s, c, pose.y], [0, 0, 1]];
}
export function compose2(a: Pose2, b: Pose2): Pose2 {
  const [x, y] = transform2(a, [b.x, b.y]);
  return { theta: a.theta + b.theta, x, y };
}
