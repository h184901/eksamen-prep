/** Keep moving geometry visible without changing the diagram's layout height. */
export function explorerViewport(
  width: number,
  height: number,
  points: Array<{ x: number; y: number }>,
) {
  const padding = 24;
  const left = Math.min(0, ...points.map((point) => point.x - padding));
  const right = Math.max(width, ...points.map((point) => point.x + padding));
  const top = Math.min(0, ...points.map((point) => point.y - padding));
  const bottom = Math.max(height, ...points.map((point) => point.y + padding));
  const fittedWidth = Math.max(right - left, (bottom - top) * width / height);
  const fittedHeight = fittedWidth * height / width;
  const x = (left + right - fittedWidth) / 2;
  const y = (top + bottom - fittedHeight) / 2;
  return { x, y, width: fittedWidth, height: fittedHeight, viewBox: `${x} ${y} ${fittedWidth} ${fittedHeight}` };
}
