import type { Egb339ProblemEn } from "./egb339-problems-en";

/** QUT Week 10 tutorial and Prac B: derived English walkthroughs, same data as the Norwegian cards. */
const week10: Record<string, Egb339ProblemEn> = {
  "w10-colour-channels": {
    title: "Identify R, G and B channel images",
    prompt: "Label the three grayscale channel images on QUT tutorial p. 3 from left to right. Which coloured object is bright in each channel?\n\n![Original photograph and the three channel images from QUT's tutorial](/egb339/week10/colour-channels.png)\n\nSource: QUT, Week 10 Tutorial – Colour, PDF p. 3. This excerpt contains the four original photograph panels.",
    solution: "### Compare distinctive objects\n\n1. In a channel image, bright means a large value in that *one* channel, not overall brightness.\n2. The blue cup is bright in the first image: B. The red drawer is bright in the second: R. The green package stands out in the third: G.\n3. Neutral white surfaces may appear bright in several channels, so they are less diagnostic. This is derived from the supplied figure; there is no official answer key.",
    answer: "Left to right after the colour original: **B, R, G**.",
  },
  "w10-chromaticity-red-mask": {
    title: "Calculate chromaticity and the 60% red mask",
    prompt: "Given the QUT tutorial p. 5 matrices\n\n$$R=\\begin{bmatrix}10&20&10\\\\5&200&20\\\\10&60&5\\end{bmatrix},\\quad G=\\begin{bmatrix}50&10&5\\\\10&5&20\\\\200&5&200\\end{bmatrix},\\quad B=\\begin{bmatrix}200&20&100\\\\100&5&10\\\\10&100&5\\end{bmatrix}.$$\n\nFind all three chromaticity channels and the mask of pixels **at least 60% red**.",
    solution: "### Element-wise division\n\n1. Sum channels per pixel: $S=R+G+B$, never use matrix multiplication. The centre has $(R,G,B)=(200,5,5)$ and $S=210$. The complete sum image is $S=\\begin{bmatrix}260&50&115\\\\115&210&50\\\\220&165&210\\end{bmatrix}$.\n2. For every positive sum compute $(r,g,b)=(R/S,G/S,B/S)$; the three ratios add to 1. The full results are\n\n$$r=\\begin{bmatrix}1/26&2/5&2/23\\\\1/23&20/21&2/5\\\\1/22&4/11&1/42\\end{bmatrix},\\quad g=\\begin{bmatrix}5/26&1/5&1/23\\\\2/23&1/42&2/5\\\\10/11&1/33&20/21\\end{bmatrix},\\quad b=\\begin{bmatrix}10/13&2/5&20/23\\\\20/23&1/42&1/5\\\\1/22&20/33&1/42\\end{bmatrix}.$$\n\n3. The centre has $r=20/21$; all others are below $0.60$. The Boolean mask is $\\begin{bmatrix}0&0&0\\\\0&1&0\\\\0&0&0\\end{bmatrix}$. Convert bytes to float *before* summing and guard a zero sum. This is independently derived, not an official solution.",
    answer: "All three chromaticity matrices are calculated above. Only the centre pixel, with $r=20/21$, is True.",
  },
  "w10-rgb-to-hsv": {
    title: "RGB to uint8 HSV: all five pixels",
    prompt: "Convert the QUT tutorial p. 9 RGB values a) [255,255,255], b) [0,0,0], c) [255,0,0], d) [0,100,0] and e) [30,60,90] using the tutorial p. 8 byte convention $H_8=H/2$, $S_8=255S$ and $V_8=255V$.",
    solution: "### Calculate value, saturation and hue in order\n\n1. Scale RGB into [0,1]. Set $V=\\max(R,G,B)$ and $\\Delta=V-\\min(R,G,B)$. If $V=0$ use $S=0$; if $\\Delta=0$ the stored hue is conventionally zero.\n2. White gives [0,0,255], black [0,0,0], pure red [0,255,255], and dark green [60,255,100].\n3. For [30,60,90], blue is maximal, $\\Delta=60/255$ and $S=2/3$; $H=240+60(30-60)/60=210$ degrees. The byte hue is 105, saturation 170 and value 90.\n\nGrey has no physical hue; zero is a storage convention. Compute with floating point and round only at the byte conversion.",
    answer: "a) [0,0,255]; b) [0,0,0]; c) [0,255,255]; d) [60,255,100]; e) [105,170,90].",
  },
  "w10-spectral-sensor-response": {
    title: "Spectral sensor response by rectangle integration",
    prompt: "Approximate the green response from QUT tutorial p. 11, explicitly interpreting 'no reflected light'. The table is:\n\n| Wavelength (nm) | $M$ | $E$ |\n|---|---:|---:|\n| 400 | 0.3 | 0 |\n| 460 | 0.8 | 0.3 |\n| 520 | 0.9 | 0.9 |\n| 580 | 0.3 | 0.9 |\n| 640 | 0.2 | 0.1 |\n| 700 | 0.1 | 0 |",
    solution: "### Choose the light path before integrating\n\n1. Interpret the problem as observing emitted light directly; the reflected-surface factor is absent. Otherwise setting surface reflectance to zero would give no reflected response.\n2. Multiply $E(\\lambda)M(\\lambda)$ at each sample: [0,0.24,0.81,0.27,0.02,0]. Their sum is 1.34.\n3. Consecutive wavelengths differ by 60 nm; the left and right rectangle sums agree here because both endpoints are zero: $q\\approx60(1.34)=80.4$.\n\nThis is in the spectral table's units times nm, not automatically an 8-bit camera pixel. The source gives no gain or exposure.",
    answer: "$q\\approx80.4$ in spectral-table units × nm, assuming direct emitted light.",
  },
  "w10-prac-rgb-chromaticity": {
    title: "Prac B 1–2: load RGB and calculate chromaticity",
    prompt: "Load one of the nine supplied shapes images, extract its R/G/B channels and calculate blue chromaticity. How do you obtain the other channels?",
    solution: "### Convert before the channel sum\n\n1. Load the image and extract named red, green and blue arrays; avoid assuming OpenCV's default array order is RGB.\n2. Cast each channel to float *before* calculating $S=R+G+B$, avoiding byte overflow.\n3. Divide B by S where S is positive; substitute R or G in the numerator for the other chromaticities. Black pixels have no defined ratio: keep a validity mask rather than treating their displayed zero as a measured colour.\n\nCommon scaling of all three channels does not change their ratios.",
    answer: "Blue is B/(R+G+B), with R or G in the numerator for the others. Use floats and guarded division.",
  },
  "w10-prac-blue-mask": {
    title: "Prac B 3: display a blue Boolean mask",
    prompt: "Threshold blue chromaticity into a Boolean mask and display it. Which shapes should be white, and is one threshold a proven answer for all images?",
    solution: "### Check the image, not just the expression\n\n1. Starting from guarded $b=B/(R+G+B)$, try `valid & (b >= threshold)`.\n2. Show the mask beside the original and inspect true blue objects, background and small false components.\n3. A sample threshold of 0.55 is above a neutral grey ratio; it is *not* an official or universal optimum. A shape count requires connected-component analysis, not a count of white pixels.",
    answer: "Use valid & (b >= threshold) and visually check the mask. 0.55 is only an example.",
  },
  "w10-prac-threshold-transfer": {
    title: "Prac B 4: try the threshold on all nine images",
    prompt: "Apply the original blue rule to every supplied shapes image. Does it work each time? Explain failures without assuming one universal answer.",
    solution: "### Hold the first rule fixed while testing\n\n1. Recompute chromaticity and a Boolean mask separately for each image. Record missed blue areas and false hits.\n2. Shared scaling of RGB is removed by normalisation, but changed illumination colour, reflections, clipping, dark noisy pixels and JPEG artifacts are not.\n3. Inspect the distributions and document any changed threshold/ROI; tuning separately per image does not prove that a single classifier generalises. The supplied task has no universal yes/no answer key.",
    answer: "Inspect all nine and document mask failures. Common scaling cancels, but spectral changes, reflections and clipping do not.",
  },
  "w10-prac-colour-shape-labels": {
    title: "Prac B 5: combine colour and shape labels",
    prompt: "Combine chromaticity segmentation with last week's blob/shape measurements to label figures on the colour images.",
    solution: "### From pixels to labelled objects\n\n1. Create separate masks for red, green and blue. Inspect each mask before extracting contours or connected components.\n2. Drop small noise and unwanted border blobs using documented choices; preserve desired thin or small shapes.\n3. Calculate area, perimeter, centroid and a guarded circularity, then place colour and shape labels at the centroid on the *original* image.\n4. Store colour with the blob's local ID so same-numbered labels in different masks do not collide.\n\nSource data do not define universal threshold or shape boundaries; keep uncertain shapes for review instead of forcing a label.",
    answer: "Segment each colour → measure connected shapes → overlay checked colour/shape labels. Calibrate descriptor tolerances rather than forcing uncertain classes.",
  },
  "w10-colour-mixer-demo": {
    title: "Lecture exercise: RGB mixer and black pixels",
    prompt: "Try the supplied RGB mixer. Explain the magenta example and what happens at all-zero RGB. This is a lecture-code exercise, not a tutorial answer key.",
    solution: "### Magenta and a zero denominator\n\nThe RGB sample $(255,0,255)$ is #ff00ff. The sum is 510, hence $(r,g,b)=(0.5,0,0.5)$ and HSV $(300^\\circ,1,1)$. Scaling both nonzero channels equally preserves chromaticity while changing brightness.\n\nFor RGB $(0,0,0)$, the denominator $R+G+B$ is zero; chromaticity is undefined. The provided Tkinter script divides without a guard. Leave the raw code untouched; a learner's version should report 'undefined' or skip that ratio. A zero-valued HSV storage convention is separate from chromaticity.",
    answer: "$(255,0,255)$: #ff00ff, $(r,g,b)=(0.5,0,0.5)$, HSV $(300^\\circ,1,1)$. Black requires a zero guard; chromaticity is undefined.",
  },
};

export function egb339Week10ProblemEn(id: string): Egb339ProblemEn | null { return week10[id] ?? null; }
