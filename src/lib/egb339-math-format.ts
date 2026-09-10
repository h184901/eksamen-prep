import type { Point2 } from "./egb339-se2";
export const numberTex = (value: number) => (Math.abs(value) < .00005 ? 0 : value).toFixed(3);
// V8's transcendental functions may differ by an ulp between Node and Chrome.
// Round only SVG presentation coordinates, never the underlying robotics model.
export const svgCoordinate = (value: number) => Number(value.toFixed(6));
export const matrixTex = (rows: readonly (readonly number[])[]) => "\\begin{bmatrix}" + rows.map((row) => row.map(numberTex).join("&")).join("\\\\") + "\\end{bmatrix}";
export const pointTex = (point: Point2) => matrixTex(point.map((value) => [value]));
