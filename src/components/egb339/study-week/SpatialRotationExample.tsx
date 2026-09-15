"use client";

import { useId, useState } from "react";
import MathText from "../pilot/Egb339Math";
import { matrixTex } from "@/lib/egb339-math-format";
import { SPATIAL_ROTATION_EXAMPLE as example } from "@/lib/egb339-spatial-example";

/** Exact orthographic projection of basis vectors, not a perspective illustration. */
export default function SpatialRotationExample() {
  const [order, setOrder] = useState<"xy" | "yx">("xy");
  const [column, setColumn] = useState(0);
  const id = useId();
  const matrix = example[order];
  const vector = matrix.map((row) => row[column]);
  const project = ([x, y, z]: readonly number[]) => [x * 104 + y * 62, x * 36 - y * 64 - z * 108];
  return <div className="egb-spatial-example">
    <h3>Samme to vinkler, to ulike sluttorienteringer</h3>
    <p>Begge rotasjoner er 90°. Den andre rotasjonen skjer om den <strong>nye, lokale</strong> aksen. Derfor står faktorene i samme rekkefølge som rammerotasjonene.</p>
    <div role="group" aria-label="Sammenlign lokale rotasjoner" className="egb-week-actions">
      <button type="button" className="egb-week-button" aria-pressed={order === "xy"} onClick={() => setOrder("xy")}>X, så lokal Y</button>
      <button type="button" className="egb-week-button" aria-pressed={order === "yx"} onClick={() => setOrder("yx")}>Y, så lokal X</button>
      <button type="button" className="egb-week-button" onClick={() => { setOrder("xy"); setColumn(0); }}>Reset</button>
    </div>
    <div className="egb-week-figure-explanation">
      <figure className="egb-week-figure">
        <svg viewBox="0 0 520 336" role="img" aria-labelledby={`${id}-title ${id}-desc`} data-rotation-order={order} data-column={column}>
          <title id={`${id}-title`}>Basisvektorer før og etter lokale 3D-rotasjoner</title>
          <desc id={`${id}-desc`}>A er referanserammen. B er sluttorienteringen. Den valgte kolonnen i rotasjonsmatrisen fremhever samme akse i B.</desc>
          <defs><marker id={`${id}-arrow`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6Z" fill="context-stroke" /></marker></defs>
          {[{ name: "A", origin: [84, 192], rotation: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] }, { name: "B", origin: [360, 184], rotation: matrix }].map(({ name, origin, rotation }) => <g key={name}>
            {[0, 1, 2].map((axis) => {
              const [dx, dy] = project(rotation.map((row) => row[axis]));
              return <g key={axis}>
                <line x1={origin[0]} y1={origin[1]} x2={origin[0] + dx} y2={origin[1] + dy} stroke={name === "A" ? "var(--week-frame-a)" : "var(--week-frame-b)"} strokeWidth={name === "B" && axis === column ? 4 : 2} strokeDasharray={axis === 1 ? "6 4" : axis === 2 ? "2 3" : undefined} markerEnd={`url(#${id}-arrow)`} />
                <text x={origin[0] + dx * 1.18} y={origin[1] + dy * 1.18} textAnchor="middle">{["x", "y", "z"][axis]}{name === "A" ? "ₐ" : "ᵦ"}</text>
              </g>;
            })}
            <circle cx={origin[0]} cy={origin[1]} r="4" fill="var(--egb-ink)" />
            <text x={origin[0]} y="292" textAnchor="middle">Ramme {name}</text>
          </g>)}
        </svg>
        <figcaption>A og B er tegnet hver for seg for å vise orienteringen. Det er ingen translasjon i dette eksemplet. x er heltrukket, y stiplet og z prikket.</figcaption>
      </figure>
      <div>
        <MathText>{order === "xy" ? String.raw`R_x(\pi/2)R_y(\pi/2)` : String.raw`R_y(\pi/2)R_x(\pi/2)`}</MathText>
        <MathText>{matrixTex(matrix)}</MathText>
        <div role="group" aria-label="Velg en matrise-kolonne" className="egb-week-actions">{[0, 1, 2].map((axis) => <button type="button" key={axis} className="egb-week-button" aria-pressed={column === axis} onClick={() => setColumn(axis)}>Kolonne {axis + 1}: {["x", "y", "z"][axis]}B</button>)}</div>
        <p role="status">{["x", "y", "z"][column]}-aksen til B er ({vector.join(", ")}) målt i A. Det er akkurat kolonne {column + 1}.</p>
      </div>
    </div>
    <div className="egb-pilot-prose"><h4>Kontroller én kolonne for hånd</h4>
      <MathText>{order === "xy" ? String.raw`R_y(\pi/2)e_x=(0,0,-1)^T,\quad R_x(\pi/2)(0,0,-1)^T=(0,1,0)^T` : String.raw`R_x(\pi/2)e_x=(1,0,0)^T,\quad R_y(\pi/2)(1,0,0)^T=(0,0,-1)^T`}</MathText>
      <p>På kolonnevektoren virker høyre faktor først. Dette motsier ikke rekkefølgen på de lokale rammerotasjonene: det er to måter å lese samme produkt på.</p>
      <p className="egb-pilot-source">Corke, kap. 2.3.1.1, trykt s. 47–48; kontrollert med SpatialMath SO3.Rx og SO3.Ry. QUT Week 3, tutorial s. 4–6, bruker samme skille mellom lokale og globale akser.</p>
    </div>
  </div>;
}
