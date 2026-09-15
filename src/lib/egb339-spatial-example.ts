/** Corke 3e, section 2.3.1.1 (pp. 47–48), checked with SpatialMath SO3.
 * Columns are body-frame axes in the reference frame. These are local-axis
 * compositions, not chronological active rotations about fixed world axes.
 */
export const SPATIAL_ROTATION_EXAMPLE = {
  rx: [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
  ry: [[0, 0, 1], [0, 1, 0], [-1, 0, 0]],
  xy: [[0, 0, 1], [1, 0, 0], [0, 1, 0]],
  yx: [[0, 1, 0], [0, 0, -1], [-1, 0, 0]],
} as const;
