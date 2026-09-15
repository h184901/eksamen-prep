"use client";

import { useId, useState } from "react";
import { week8Pixel } from "@/lib/egb339-week-models";

export default function ImageArrayExample() {
  const id = useId();
  const [u, setU] = useState(4), [v, setV] = useState(4);
  const [mask, setMask] = useState(false), [threshold, setThreshold] = useState(0.7);
  const pixels = Array.from({ length: 100 }, (_, i) => week8Pixel(i % 10, Math.floor(i / 10)));
  const selected = week8Pixel(u, v), count = pixels.filter(value => value > threshold).length;
  return <section className="egb-week-learning-block" aria-labelledby={`${id}-heading`} data-week-image-array>
    <h3 id={`${id}-heading`}>Piksel (u, v), arrayelement [v, u]</h3>
    <p>QUT practical, oppgave 8B: et bilde på 10 × 10, med 0.5 i bakgrunnen og 0.9 i de fire midterste pikslene. Terskelvisningen kobler bildet til forelesningens maskebegrep.</p>
    <div className="egb-week-two-column">
      <figure className="egb-week-technical-figure">
        <svg viewBox="0 0 440 410" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>{mask ? "Boolsk maske" : "Gråtonebilde"} med markert piksel ({u}, {v})</title>
          <desc id={`${id}-desc`}>u øker mot høyre og v nedover. Den valgte pikselen har blå dobbel ramme. Originalbildet har verdi 0.9 i rader og kolonner 4 og 5, ellers 0.5. Masken er sann der intensiteten er større enn terskelen.</desc>
          {pixels.map((value, i) => {const shade = Math.round(255 * (mask ? Number(value > threshold) : value));return <rect key={i} x={70 + (i % 10) * 28} y={60 + Math.floor(i / 10) * 28} width="28" height="28" fill={`rgb(${shade},${shade},${shade})`} stroke="#555" strokeWidth="0.5" />;})}
          <rect x={70 + u * 28 + 1} y={60 + v * 28 + 1} width="26" height="26" fill="none" stroke="var(--week-frame-a)" strokeWidth="3" />
          <rect x={70 + u * 28 + 5} y={60 + v * 28 + 5} width="18" height="18" fill="none" stroke={mask && selected <= threshold ? "white" : "black"} strokeWidth="1" />
          {[0, 4, 5, 9].map(n => <g key={n}><text x={84 + n * 28} y="50" textAnchor="middle">{n}</text><text x="56" y={79 + n * 28} textAnchor="end">{n}</text></g>)}
          <path d="M70 24H350M30 60V340" stroke="var(--egb-muted)" fill="none" /><path d="M344 20L350 24L344 28M26 334L30 340L34 334" stroke="var(--egb-muted)" fill="none" />
          <text x="365" y="30">u</text><text x="23" y="364">v</text>
          <text x="70" y="388">{mask ? "Hvit = sann. Svart = usann." : "Original: 96 × 0.5 og 4 × 0.9."}</text>
        </svg>
        <figcaption>Egen nøyaktig gjengivelse av QUTs arrayoppgave. Dette er flyttallsverdier i [0, 1], ikke uint8.</figcaption>
      </figure>
      <div className="egb-week-explorer-controls">
        <label>Kolonne u = {u}<input aria-label="Bildekolonne u" type="range" min="0" max="9" step="1" value={u} onChange={e => setU(Number(e.target.value))} /></label>
        <label>Rad v = {v}<input aria-label="Bilderad v" type="range" min="0" max="9" step="1" value={v} onChange={e => setV(Number(e.target.value))} /></label>
        <label>Terskel T = {threshold.toFixed(2)}<input aria-label="Intensitetsterskel" type="range" min="0" max="1" step="0.05" value={threshold} onChange={e => setThreshold(Number(e.target.value))} /></label>
        <div className="egb-week-control-row"><button type="button" className="egb-week-button" aria-pressed={mask} onClick={() => setMask(!mask)}>{mask ? "Vis originalbildet" : "Vis masken"}</button><button type="button" className="egb-week-button" onClick={() => {setU(4);setV(4);setThreshold(0.7);setMask(false);}}>Reset</button></div>
        <div role="status" aria-live="polite" aria-atomic="true"><p><code>image[{v}, {u}] = {selected}</code></p><p><code>{selected} &gt; {threshold.toFixed(2)}</code> er {selected > threshold ? "sant" : "usant"}. Masken velger {count} av 100 piksler.</p></div>
        <p>Ved T = 0.5 velges bare de fire lyse pikslene. Ved T = 0.9 velges ingen: sammenligningen er strengt større enn, ikke større enn eller lik.</p>
        <p><a href="#w8-synthetic-images">Se full kode og løsning på practical-oppgaven</a></p>
      </div>
    </div>
  </section>;
}
