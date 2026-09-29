"use client";

import { useId, useState } from "react";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { WEEK9_REGION_GRID, WEEK9_MORPHOLOGY_GRID, week9QutMorphology, type MorphologyOperation } from "@/lib/egb339-vision-models";

const options: { id: MorphologyOperation; no: string; en: string }[] = [
  { id: "original", no: "Oppgitt maske", en: "Given mask" },
  { id: "erode", no: "Erosjon", en: "Erosion" },
  { id: "dilate", no: "Dilatasjon", en: "Dilation" },
  { id: "close", no: "Lukking", en: "Closing" },
  { id: "open", no: "Åpning", en: "Opening" },
];

/** Reproduces the QUT numerical grids as accessible SVG, without publishing PDF pages. */
export default function QutVisionGrids({ kind }: { kind: "regions" | "morphology" }) {
  const { lang } = useEgb339Lang();
  const id = useId();
  const [operation, setOperation] = useState<MorphologyOperation>("original");
  const grid = kind === "regions" ? WEEK9_REGION_GRID : operation === "original" ? WEEK9_MORPHOLOGY_GRID : week9QutMorphology(operation);
  const count = grid.flat().filter(Boolean).length;
  return <section className="egb-week-learning-block" aria-labelledby={`${id}-heading`} data-qut-week9-grid={kind}>
    <h3 id={`${id}-heading`}>{kind === "regions" ? (lang === "en" ? "QUT tutorial: five regions" : "QUT-tutorial: fem regioner") : (lang === "en" ? "QUT tutorial: full morphology grid" : "QUT-tutorial: hele morfologirutenettet")}</h3>
    <p>{kind === "regions" ? (lang === "en" ? "The 15 × 15 input from tutorial p. 4. Count connected white pixels and compute each centroid from column u and row v before revealing the solution card." : "Inputmatrisen på 15 × 15 fra tutorial s. 4. Tell sammenhengende hvite piksler og beregn tyngdepunkt fra kolonne u og rad v før du viser løsningen.") : (lang === "en" ? "Input from tutorial p. 10; every operation uses a full centred 3 × 3 square and edge replication. Compare all cells with the supplied QUT answer grids, not merely the total." : "Input fra tutorial s. 10; hver operasjon bruker et fullt sentrert 3 × 3-kvadrat og kantduplisering. Sammenlign alle celler med QUT-fasiten, ikke bare summen.")}</p>
    {kind === "morphology" && <div className="egb-week-control-row" role="group" aria-label={lang === "en" ? "QUT morphological result" : "QUT morfologisk resultat"}>{options.map(item => <button key={item.id} type="button" className="egb-week-button" aria-pressed={operation === item.id} onClick={() => setOperation(item.id)}>{item[lang === "en" ? "en" : "no"]}</button>)}</div>}
    <figure className="egb-week-technical-figure">
      <svg viewBox="0 0 410 370" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{lang === "en" ? `${kind === "regions" ? "Regions" : options.find(item => item.id === operation)?.en} grid, ${count} white pixels` : `${kind === "regions" ? "Regioner" : options.find(item => item.id === operation)?.no}, ${count} hvite piksler`}</title>
        <desc id={`${id}-desc`}>{grid.map(row => row.map(value => value ? "1" : "0").join("")).join("; ")}</desc>
        {grid.flatMap((row, v) => row.map((value, u) => <rect key={`${u}-${v}`} x={36 + u * 20} y={32 + v * 20} width="20" height="20" fill={value ? "white" : "#141414"} stroke="#777" strokeWidth=".5" />))}
        {[0, 2, 4, 6, 8, 10, 12, 14].map(value => <g key={value}><text x={46 + value * 20} y="26" textAnchor="middle" fill="currentColor">{value}</text><text x="27" y={47 + value * 20} textAnchor="end" fill="currentColor">{value}</text></g>)}
        <text x="349" y="26" fill="currentColor">u</text><text x="16" y="349" fill="currentColor">v</text>
      </svg>
      <figcaption>{lang === "en" ? `Reconstructed from QUT's Week 9 tutorial grid (PDF p. ${kind === "regions" ? "4" : "10"}); white is foreground. ${count} white pixels.` : `Rekonstruert fra QUT-tutorialens rutenett (PDF s. ${kind === "regions" ? "4" : "10"}); hvitt er forgrunn. ${count} hvite piksler.`}</figcaption>
    </figure>
  </section>;
}
