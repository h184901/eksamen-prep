import { T } from "./T";
export default function VisionProjectWorkflow() {
  const steps = [
    ["RGB-bilde", "RGB image", "Piksler (u,v), ikke millimeter", "Pixels (u,v), not millimetres"],
    ["Masker og regioner", "Masks and regions", "Farge, form og sentroider", "Colour, shape and centroids"],
    ["Fire markørpar", "Four marker pairs", "Størst først, samme rekkefølge", "Largest first, matching order"],
    ["Homografi H", "Homography H", "Piksel → XY; del på homogen skala", "Pixel → XY; normalize homogeneous scale"],
    ["Robotmål og IK", "Robot goals and IK", "Millimeter → radianer; sjekk FK", "Millimetres → radians; verify FK"],
    ["Grip, løft, flytt, slipp", "Pick, lift, move, release", "Trygg høyde før sideveis bevegelse", "Safe height before lateral motion"],
  ];
  return <section aria-label="Pick-and-place workflow" className="my-6 rounded-xl border border-[var(--card-border)] p-5">
    <h2><T no="Fra bilde til trygg bevegelse" en="From image to safe motion" /></h2>
    <ol className="!ml-0 grid list-none gap-3 md:grid-cols-3">{steps.map(([no, en, noteNo, noteEn], index) => <li key={en} className="rounded-lg bg-cyan-500/10 p-4"><span className="font-mono text-sm text-cyan-700 dark:text-cyan-300">{index + 1} →</span><h3 className="!mt-2"><T no={no} en={en} /></h3><p className="!mb-0 text-sm"><T no={noteNo} en={noteEn} /></p></li>)}</ol>
    <p><T no="Feil spores bakover: er målpunktet feil, kontroller IK, koordinater, H, punktpar og til slutt masken. Test hvert ledd før roboten får en kommando." en="Trace errors backwards: check IK, coordinates, H, correspondences and masks. Test every stage before giving the robot a command." /></p>
  </section>;
}
