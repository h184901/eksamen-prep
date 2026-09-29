/** Small teaching models; no image library or camera calibration is implied. */
export type BinaryImage = readonly (readonly boolean[])[];
export type MorphologyOperation = "original" | "erode" | "dilate" | "open" | "close";

/** QUT Week 9 tutorial p. 7: two outliers in an otherwise constant 6 × 6 image. */
export const WEEK9_MEAN_IMAGE = Array.from({ length: 6 }, (_, v) => Array.from({ length: 6 }, (_, u) => (u === 2 && v === 2) || (u === 4 && v === 4) ? .8 : .1));

/** Reconstructed 15 × 15 tutorial grids (Week 9 slides 4 and 10), rows top to bottom. */
export const WEEK9_REGION_GRID = [
  "000000000000000", "000000000000000", "011000000000000", "011000000000000", "000000000011110",
  "001100000011110", "001100000000000", "001100000000000", "001100000000110", "001110010000110",
  "000000111000000", "000001111100000", "000000111000000", "000000010000000", "000000000000000",
].map(row => [...row].map(value => value === "1"));

export const WEEK9_MORPHOLOGY_GRID = [
  "000000000000000", "011000000001110", "011000001001110", "000000000000000", "000000000000000",
  "011110000000000", "011110001111110", "011110001111110", "011110001111110", "011010001100110",
  "011110001101110", "000000001101110", "000000001111110", "000000001111110", "000000001111110",
].map(row => [...row].map(value => value === "1"));

/** QUT tutorial duplicates nearest edge values at every morphology pass. */
export function week9QutMorphology(operation: MorphologyOperation): boolean[][] {
  const pass = (image: BinaryImage, erode: boolean) => image.map((row, v) => row.map((_, u) => {
    const samples = [-1, 0, 1].flatMap(dv => [-1, 0, 1].map(du =>
      image[Math.max(0, Math.min(image.length - 1, v + dv))][Math.max(0, Math.min(row.length - 1, u + du))]));
    return erode ? samples.every(Boolean) : samples.some(Boolean);
  }));
  const original = WEEK9_MORPHOLOGY_GRID;
  if (operation === "original") return original.map(row => [...row]);
  if (operation === "erode") return pass(original, true);
  if (operation === "dilate") return pass(original, false);
  if (operation === "open") return pass(pass(original, true), false);
  return pass(pass(original, false), true);
}

/** The tutorial requires edge replication, not zero padding. */
export function week9MeanPatch(u: number, v: number) {
  if (![u, v].every(value => Number.isInteger(value) && value >= 0 && value < 6)) throw new RangeError("Pixel index must lie in 0..5");
  return [-1, 0, 1].map(dv => [-1, 0, 1].map(du => WEEK9_MEAN_IMAGE[Math.max(0, Math.min(5, v + dv))][Math.max(0, Math.min(5, u + du))]));
}

function imageSize(image: readonly (readonly unknown[])[]) {
  const width = image[0]?.length ?? 0;
  if (!width || image.some(row => row.length !== width)) throw new RangeError("Image must be a non-empty rectangle");
  return { width, height: image.length };
}

/** Centred 3 × 3 square structuring element, false padding outside the image. */
export function binaryMorphology(image: BinaryImage, operation: MorphologyOperation): boolean[][] {
  const { width, height } = imageSize(image);
  if (operation === "original") return image.map(row => [...row]);
  if (operation === "open") return binaryMorphology(binaryMorphology(image, "erode"), "dilate");
  if (operation === "close") return binaryMorphology(binaryMorphology(image, "dilate"), "erode");
  return Array.from({ length: height }, (_, v) => Array.from({ length: width }, (_, u) => {
    const values = [-1, 0, 1].flatMap(dv => [-1, 0, 1].map(du => image[v + dv]?.[u + du] ?? false));
    return operation === "erode" ? values.every(Boolean) : values.some(Boolean);
  }));
}

/** Binary moments use u=column, v=row, with the origin at the top-left pixel. */
export function binaryRegions(image: BinaryImage, connectivity: 4 | 8) {
  const { width, height } = imageSize(image);
  const visited = new Set<number>();
  const regions: { area: number; centroid: [number, number]; pixels: [number, number][] }[] = [];
  const offsets = connectivity === 4 ? [[-1, 0], [1, 0], [0, -1], [0, 1]] : [-1, 0, 1].flatMap(dv => [-1, 0, 1].map(du => [du, dv])).filter(([du, dv]) => du || dv);
  for (let v = 0; v < height; v++) for (let u = 0; u < width; u++) {
    if (!image[v][u] || visited.has(v * width + u)) continue;
    const pixels: [number, number][] = [[u, v]];
    visited.add(v * width + u);
    for (let index = 0; index < pixels.length; index++) {
      const [x, y] = pixels[index];
      for (const [du, dv] of offsets) {
        const nu = x + du, nv = y + dv;
        if (nu < 0 || nu >= width || nv < 0 || nv >= height || !image[nv][nu] || visited.has(nv * width + nu)) continue;
        visited.add(nv * width + nu);
        pixels.push([nu, nv]);
      }
    }
    regions.push({ area: pixels.length, centroid: [pixels.reduce((sum, [x]) => sum + x, 0) / pixels.length, pixels.reduce((sum, [, y]) => sum + y, 0) / pixels.length], pixels });
  }
  return regions;
}

/** One full-overlap convolution sample; the kernel is reversed along both axes. */
export function convolutionCentre(patch: readonly (readonly number[])[], kernel: readonly (readonly number[])[], divisor = 1) {
  const shape = imageSize(patch), k = imageSize(kernel);
  if (shape.width !== 3 || shape.height !== 3 || k.width !== 3 || k.height !== 3 || !Number.isFinite(divisor) || divisor === 0 || ![...patch.flat(), ...kernel.flat()].every(Number.isFinite)) throw new RangeError("Use finite 3 × 3 patch/kernel and a non-zero divisor");
  return patch.reduce((total, row, v) => total + row.reduce((sum, value, u) => sum + value * kernel[2 - v][2 - u], 0), 0) / divisor;
}

/** Common positive illumination gain, without clipping or nonlinear encoding. */
export function rgbChromaticity(input: readonly [number, number, number], gain: number) {
  if (!input.every(value => Number.isFinite(value) && value >= 0) || !Number.isFinite(gain) || gain <= 0) throw new RangeError("RGB must be non-negative and gain must be positive");
  const rgb = input.map(value => value * gain) as [number, number, number];
  const sum = rgb[0] + rgb[1] + rgb[2];
  return { rgb, sum, chromaticity: sum === 0 ? null : rgb.map(value => value / sum) as [number, number, number] };
}
