"use client";

import { useId, useState } from "react";
import { binaryMorphology, binaryRegions, type MorphologyOperation } from "@/lib/egb339-vision-models";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import MathText from "../pilot/Egb339Math";

const intensities = Array.from({ length: 7 }, (_, v) => Array.from({ length: 7 }, (_, u) => (u >= 2 && u <= 4 && v >= 2 && v <= 4) || (u === 1 && v === 1) ? 180 : 20));
const operations: { id: MorphologyOperation; no: string; en: string }[] = [
  { id: "original", no: "Maske", en: "Mask" }, { id: "erode", no: "Erosjon", en: "Erosion" },
  { id: "dilate", no: "Dilatasjon", en: "Dilation" }, { id: "open", no: "Åpning", en: "Opening" },
  { id: "close", no: "Lukking", en: "Closing" },
];

export default function RegionMorphologyExample() {
  const { lang } = useEgb339Lang();
  const id = useId();
  const [threshold, setThreshold] = useState(100);
  const [operation, setOperation] = useState<MorphologyOperation>("original");
  const [connectivity, setConnectivity] = useState<4 | 8>(4);
  const mask = binaryMorphology(intensities.map(row => row.map(value => value > threshold)), operation);
  const regions = binaryRegions(mask, connectivity);
  const area = regions.reduce((sum, region) => sum + region.area, 0);
  return <section className="egb-week-learning-block" aria-labelledby={`${id}-heading`} data-week-region-morphology>
    <h3 id={`${id}-heading`}>{lang === "en" ? "From threshold to connected regions" : "Fra terskel til sammenhengende regioner"}</h3>
    <p>{lang === "en" ? "Own 7 × 7 teaching image: the background is 20, a 3 × 3 square and one diagonally touching pixel are 180. Choose a threshold, a morphology operation, and a connectivity rule. The 4/8 choice is explicit here; QUT's tutorial does not prescribe it." : "Eget undervisningsbilde på 7 × 7: bakgrunnen er 20, en firkant på 3 × 3 og én diagonalt berørende piksel er 180. Velg terskel, morfologisk operasjon og naboregel. Valget mellom 4 og 8 er eksplisitt her; QUT-tutorialen spesifiserer det ikke."}</p>
    <div className="egb-week-two-column">
      <figure className="egb-week-technical-figure">
        <svg viewBox="0 0 410 390" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>{lang === "en" ? `Binary mask: ${regions.length} ${regions.length === 1 ? "region" : "regions"} under ${connectivity}-connectivity` : `Binær maske: ${regions.length} ${regions.length === 1 ? "region" : "regioner"} med ${connectivity}-naboskap`}</title>
          <desc id={`${id}-desc`}>{lang === "en" ? "White pixels are foreground, black pixels are background. u increases rightwards, v downwards. Blue crosses mark each region's centroid; they need not lie on a foreground pixel." : "Hvite piksler er forgrunn, svarte piksler er bakgrunn. u øker mot høyre, v nedover. Blå kryss viser regionenes tyngdepunkt; de trenger ikke ligge på en forgrunnspiksel."}</desc>
          {mask.flatMap((row, v) => row.map((value, u) => <rect key={`${u}-${v}`} x={65 + u * 38} y={50 + v * 38} width="38" height="38" fill={value ? "white" : "#141414"} stroke="#777" strokeWidth=".6" />))}
          {regions.map((region, index) => { const x = 84 + region.centroid[0] * 38, y = 69 + region.centroid[1] * 38; return <g key={index}><path d={`M${x - 8} ${y}h16M${x} ${y - 8}v16`} stroke="#0284c7" strokeWidth="3" /><text x={x + 10} y={y - 9} style={{ fill: "#0284c7" }}>{index + 1}</text></g>; })}
          {[0, 1, 2, 3, 4, 5, 6].map(value => <g key={value}><text x={84 + value * 38} y="40" textAnchor="middle">{value}</text><text x="52" y={75 + value * 38} textAnchor="end">{value}</text></g>)}
          <path d="M65 19H331M28 50V316M325 15L331 19L325 23M24 310L28 316L32 310" fill="none" stroke="var(--egb-muted)" />
          <text x="348" y="25">u</text><text x="22" y="340">v</text>
          <text x="65" y="360">{lang === "en" ? "White = 1; black = 0" : "Hvit = 1; svart = 0"}</text>
        </svg>
        <figcaption>{lang === "en" ? "Centred 3 × 3 square structuring element; values outside the image are zero. This is a declared teaching convention, not a reconstruction of an unspecified QUT figure." : "Sentrert kvadratisk strukturelement på 3 × 3; verdier utenfor bildet er null. Dette er en oppgitt undervisningskonvensjon, ikke en rekonstruksjon av en uspesifisert QUT-figur."}</figcaption>
      </figure>
      <div className="egb-week-explorer-controls">
        <label>{lang === "en" ? `Threshold T = ${threshold}` : `Terskel T = ${threshold}`}<input aria-label={lang === "en" ? "Region intensity threshold" : "Intensitetsterskel for regioner"} type="range" min="0" max="255" step="1" value={threshold} onChange={event => setThreshold(Number(event.target.value))} /></label>
        <MathText>{String.raw`B(u,v)=[I(u,v)>T]`}</MathText>
        <div className="egb-week-control-row" role="group" aria-label={lang === "en" ? "Morphology operation" : "Morfologisk operasjon"}>{operations.map(item => <button key={item.id} type="button" className="egb-week-button" aria-pressed={operation === item.id} onClick={() => setOperation(item.id)}>{item[lang === "en" ? "en" : "no"]}</button>)}</div>
        <div className="egb-week-control-row" role="group" aria-label={lang === "en" ? "Connectivity rule" : "Naboregel"}>{([4, 8] as const).map(value => <button key={value} type="button" className="egb-week-button" aria-pressed={connectivity === value} onClick={() => setConnectivity(value)}>{lang === "en" ? `${value}-connected` : `${value}-naboskap`}</button>)}</div>
        <div role="status" aria-live="polite" aria-atomic="true">
          <p>{lang === "en" ? `${area} foreground pixels; ${regions.length} connected ${regions.length === 1 ? "region" : "regions"}.` : `${area} forgrunnspiksler; ${regions.length} sammenhengende ${regions.length === 1 ? "region" : "regioner"}.`}</p>
          {regions.map((region, index) => <p key={index}>{lang === "en" ? `Region ${index + 1}: ` : `Region ${index + 1}: `}<MathText inline>{String.raw`m_{00}=${region.area},\quad(\bar u,\bar v)=(${region.centroid[0].toFixed(2)},${region.centroid[1].toFixed(2)})`}</MathText></p>)}
        </div>
        <p>{lang === "en" ? "At T = 100 the original mask has two 4-connected regions, but one 8-connected region. Opening removes the isolated pixel. The coordinates are pixel-centre indices, not metres in the robot's workspace." : "Ved T = 100 har den opprinnelige masken to regioner med 4-naboskap, men én med 8-naboskap. Åpning fjerner enkeltpikselen. Koordinatene er pikselindekser for sentrum, ikke meter i robotens arbeidsrom."}</p>
        <button type="button" className="egb-week-button" onClick={() => { setThreshold(100); setOperation("original"); setConnectivity(4); }}>{lang === "en" ? "Reset" : "Nullstill"}</button>
      </div>
    </div>
  </section>;
}
