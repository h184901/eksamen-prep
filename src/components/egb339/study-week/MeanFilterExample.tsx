"use client";

import { useId, useState } from "react";
import { WEEK9_MEAN_IMAGE, convolutionCentre, week9MeanPatch } from "@/lib/egb339-vision-models";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import MathText from "../pilot/Egb339Math";

const kernel = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
export default function MeanFilterExample() {
  const { lang } = useEgb339Lang();
  const id = useId();
  const [u, setU] = useState(3), [v, setV] = useState(3);
  const patch = week9MeanPatch(u, v);
  const mean = convolutionCentre(patch, kernel, 9);
  const outliers = patch.flat().filter(value => value === .8).length;
  const matrix = patch.map(row => row.join("&")).join(String.raw`\\`);
  return <section className="egb-week-learning-block" aria-labelledby={`${id}-heading`} data-week-mean-filter>
    <h3 id={`${id}-heading`}>{lang === "en" ? "Compute one filtered pixel" : "Beregn én filtrert piksel"}</h3>
    <p>{lang === "en" ? "QUT Week 9 tutorial, p. 7: a 6 × 6 image is 0.1 everywhere except two pixels of 0.8. Slide the output position and inspect the complete 3 × 3 input neighbourhood." : "QUT-tutorialen for uke 9, s. 7: et bilde på 6 × 6 har verdien 0,1 overalt unntatt to piksler med 0,8. Flytt utposisjonen og undersøk hele inputområdet på 3 × 3."}</p>
    <div className="egb-week-two-column">
      <figure className="egb-week-technical-figure">
        <svg viewBox="0 0 380 370" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>{lang === "en" ? `Mean filter at output pixel (${u}, ${v})` : `Gjennomsnittsfilter ved utpiksel (${u}, ${v})`}</title>
          <desc id={`${id}-desc`}>{lang === "en" ? "Bright outliers are at columns and rows (2, 2) and (4, 4). The outlined output location uses its 3 by 3 neighbourhood. Image borders repeat their nearest input value." : "Lyse uteliggere ligger ved kolonne og rad (2, 2) og (4, 4). Den innrammede utposisjonen bruker naboområdet på 3 ganger 3. Bildekanter gjentar nærmeste inputverdi."}</desc>
          {WEEK9_MEAN_IMAGE.flatMap((row, y) => row.map((value, x) => { const shade = Math.round(value * 255); return <g key={`${x}-${y}`}><rect x={60 + x * 42} y={45 + y * 42} width="42" height="42" fill={`rgb(${shade},${shade},${shade})`} stroke="#777" /><text x={81 + x * 42} y={72 + y * 42} textAnchor="middle" style={{ fill: value > .5 ? "black" : "white", fontSize: 13 }}>{lang === "en" ? value.toFixed(1) : value.toFixed(1).replace(".", ",")}</text></g>; }))}
          <rect x={61 + u * 42} y={46 + v * 42} width="40" height="40" fill="none" stroke="#0284c7" strokeWidth="4" />
          {[0, 1, 2, 3, 4, 5].map(value => <g key={value}><text x={81 + value * 42} y="34" textAnchor="middle">{value}</text><text x="47" y={72 + value * 42} textAnchor="end">{value}</text></g>)}
          <text x="326" y="35">u</text><text x="31" y="325">v</text>
          <text x="60" y="350">{lang === "en" ? "Original input; blue = output location" : "Original input; blå = utposisjon"}</text>
        </svg>
        <figcaption>{lang === "en" ? "Own SVG reproduction of the tutorial's numerical array. Edge replication is part of this task and differs from the morphology explorer's zero padding." : "Egen SVG-gjengivelse av tutorialens tallarray. Kantreplikasjon inngår i denne oppgaven og er forskjellig fra morfologiutforskerens nullpadding."}</figcaption>
      </figure>
      <div className="egb-week-explorer-controls">
        <label>{lang === "en" ? `Output column u = ${u}` : `Utkolonne u = ${u}`}<input aria-label={lang === "en" ? "Filter output column" : "Filterets utkolonne"} type="range" min="0" max="5" step="1" value={u} onChange={event => setU(Number(event.target.value))} /></label>
        <label>{lang === "en" ? `Output row v = ${v}` : `Utrad v = ${v}`}<input aria-label={lang === "en" ? "Filter output row" : "Filterets utrad"} type="range" min="0" max="5" step="1" value={v} onChange={event => setV(Number(event.target.value))} /></label>
        <MathText>{String.raw`P=\begin{bmatrix}${matrix}\end{bmatrix},\quad K=\frac1{9}\begin{bmatrix}1&1&1\\1&1&1\\1&1&1\end{bmatrix}`}</MathText>
        <div role="status" aria-live="polite" aria-atomic="true"><MathText>{String.raw`I_f(${u},${v})=\frac{${9 - outliers}\cdot0.1+${outliers}\cdot0.8}{9}=${mean.toFixed(6)}`}</MathText></div>
        <p>{lang === "en" ? "A symmetric mean kernel gives the same result under convolution and correlation. For an asymmetric derivative kernel, reversing it changes the sign; always state the convention." : "En symmetrisk gjennomsnittskjerne gir samme resultat ved konvolusjon og korrelasjon. For en asymmetrisk derivertkjerne endrer reversering fortegnet; oppgi alltid konvensjonen."}</p>
        <p className="egb-week-notice" data-state="warning">{lang === "en" ? "Source correction: at (5, 5), the supplied solution shows 0.3. Edge replication gives 0.177778, or 0.2 rounded to one decimal place." : "Kilderetting: ved (5, 5) viser den utdelte fasiten 0,3. Kantreplikasjon gir 0,177778, eller 0,2 avrundet til én desimal."}</p>
      </div>
    </div>
  </section>;
}
