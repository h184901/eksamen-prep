"use client";

import { useId, useState } from "react";
import { rgbChromaticity } from "@/lib/egb339-vision-models";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import MathText from "../pilot/Egb339Math";

export default function ColourChromaticityExample() {
  const { lang } = useEgb339Lang();
  const id = useId();
  const [rgb, setRgb] = useState<[number, number, number]>([80, 40, 20]);
  const [gain, setGain] = useState(1);
  const sample = rgbChromaticity(rgb, gain);
  const chroma = sample.chromaticity;
  const x = chroma ? 65 + 270 * chroma[0] + 135 * chroma[1] : null;
  const y = chroma ? 275 - 234 * chroma[1] : null;
  return <section className="egb-week-learning-block" aria-labelledby={`${id}-heading`} data-week-colour-chromaticity>
    <h3 id={`${id}-heading`}>{lang === "en" ? "Brightness changes; channel ratios can remain" : "Lysstyrken endres; kanalforholdene kan bestå"}</h3>
    <p>{lang === "en" ? "A declared linear RGB model: a common positive illumination gain multiplies all three channels. Adjust the channels or gain and compare the raw RGB values with their normalized ratios." : "En oppgitt lineær RGB-modell: en felles positiv lysfaktor multipliserer alle tre kanalene. Endre kanaler eller lysfaktor og sammenlign de rå RGB-verdiene med de normaliserte forholdene."}</p>
    <div className="egb-week-two-column">
      <figure className="egb-week-technical-figure">
        <svg viewBox="0 0 410 410" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>{lang === "en" ? "Normalized RGB chromaticity simplex" : "Simpleks for normalisert RGB-kromatisitet"}</title>
          <desc id={`${id}-desc`}>{lang === "en" ? "The triangle vertices represent pure red, green and blue channel ratios. The outlined point is the current channel ratio. A black pixel has no chromaticity point." : "Trekantens hjørner representerer rene røde, grønne og blå kanalforhold. Det innrammede punktet viser gjeldende kanalforhold. En svart piksel har ikke et kromatisitetspunkt."}</desc>
          <path d="M65 275L335 275L200 41Z" fill="var(--week-info-tint)" stroke="var(--egb-muted)" strokeWidth="2" />
          <text x="32" y="300">B</text><text x="343" y="300">R</text><text x="194" y="28">G</text>
          <text x="54" y="325">b = 1</text><text x="303" y="325">r = 1</text><text x="170" y="62">g = 1</text>
          {x !== null && y !== null ? <g><circle cx={x} cy={y} r="7" fill="var(--week-info)" stroke="var(--egb-paper)" strokeWidth="2" /><path d={`M${x - 12} ${y}h24M${x} ${y - 12}v24`} stroke="var(--week-info)" /></g> : <text x="200" y="188" textAnchor="middle">{lang === "en" ? "Black: undefined" : "Svart: udefinert"}</text>}
          <rect x="65" y="347" width="270" height="35" fill={`rgb(${sample.rgb.map(value => Math.round(value)).join(",")})`} stroke="var(--egb-muted)" />
        </svg>
        <figcaption>{lang === "en" ? "Own RGB-ratio simplex, not a calibrated CIE chromaticity diagram. The swatch is only a display illustration; browser colour encoding is not a physical camera model." : "Eget RGB-forholdssimpleks, ikke et kalibrert CIE-kromatisitetsdiagram. Fargefeltet illustrerer bare visningen; nettleserens fargekoding er ikke en fysisk kameramodell."}</figcaption>
      </figure>
      <div className="egb-week-explorer-controls">
        {(["R", "G", "B"] as const).map((channel, index) => <label key={channel}>{channel} = {rgb[index]}<input aria-label={lang === "en" ? `${channel} input channel` : `${channel}-inputkanal`} type="range" min="0" max="100" step="1" value={rgb[index]} onChange={event => setRgb(current => current.map((value, i) => i === index ? Number(event.target.value) : value) as [number, number, number])} /></label>)}
        <label>{lang === "en" ? `Common gain = ${gain.toFixed(2)}` : `Felles lysfaktor = ${gain.toFixed(2).replace(".", ",")}`}<input aria-label={lang === "en" ? "Common illumination gain" : "Felles lysfaktor"} type="range" min="0.25" max="2" step="0.05" value={gain} onChange={event => setGain(Number(event.target.value))} /></label>
        <MathText>{String.raw`(r,g,b)=\frac{(R,G,B)}{R+G+B}`}</MathText>
        <div role="status" aria-live="polite" aria-atomic="true">
          <MathText>{String.raw`(R,G,B)=(${sample.rgb.map(value => value.toFixed(1)).join(",")})`}</MathText>
          {chroma ? <MathText>{String.raw`(r,g,b)=(${chroma.map(value => value.toFixed(3)).join(",")}),\quad r+g+b=1`}</MathText> : <p className="egb-week-notice" data-state="warning">{lang === "en" ? "R + G + B is zero. Chromaticity is undefined: do not divide by zero or report (0, 0, 0) as a valid ratio." : "R + G + B er null. Kromatisitet er udefinert: ikke del på null eller oppgi (0, 0, 0) som et gyldig forhold."}</p>}
        </div>
        <p>{lang === "en" ? "For a non-black sample, changing only the gain leaves the point fixed. This cancellation assumes equal scaling of all channels, no clipping and a linear response. Coloured illumination, saturation or different channel gains can move it." : "For en ikke-svart prøve lar en ren endring av lysfaktoren punktet stå stille. Forkortingen forutsetter lik skalering av alle kanaler, ingen klipping og lineær respons. Farget belysning, metning eller ulike kanalforsterkninger kan flytte det."}</p>
        <button type="button" className="egb-week-button" onClick={() => { setRgb([80, 40, 20]); setGain(1); }}>{lang === "en" ? "Reset" : "Nullstill"}</button>
      </div>
    </div>
  </section>;
}
