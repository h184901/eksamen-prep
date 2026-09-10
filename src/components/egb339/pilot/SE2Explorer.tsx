"use client";

import { useId, useState } from "react";
import { SE2_TUTORIAL, inverseTransform2, matrix2, rotate2, transform2, type Point2 } from "@/lib/egb339-se2";
import MathText from "./Egb339Math";
import SE2Composition from "./SE2Composition";
import { svgCoordinate } from "@/lib/egb339-math-format";

const decimal = (n: number) => (Math.abs(n) < 0.00005 ? 0 : n).toFixed(3);
const vector = ([x, y]: Point2) => `\\begin{bmatrix}${decimal(x)}\\\\${decimal(y)}\\end{bmatrix}`;
// Fixed, equal aspect scale. Allowed inputs keep the construction inside this viewport.
const screen = ([x, y]: Point2): Point2 => [svgCoordinate(215 + x * 26), svgCoordinate(250 - y * 26)];

export default function SE2Explorer() {
  const [mode, setMode] = useState<"point" | "composition">("point");
  return <div>
    <div role="group" className="egb-pilot-stage" aria-label="SE(2) forsøk">
      <button type="button" aria-pressed={mode === "point"} onClick={() => setMode("point")}>Punkt og ramme</button>
      <button type="button" aria-pressed={mode === "composition"} onClick={() => setMode("composition")}>Komposisjon og rekkefølge</button>
    </div>
    {mode === "point" ? <SE2PointExplorer /> : <SE2Composition />}
  </div>;
}

function SE2PointExplorer() {
  const id = useId().replace(/:/g, "");
  const [degrees, setDegrees] = useState(45);
  const [tx, setTx] = useState(1);
  const [ty, setTy] = useState(2);
  const [px, setPx] = useState(2);
  const [py, setPy] = useState(3);
  const [stage, setStage] = useState<"rotation" | "pose">("pose");
  const [highlight, setHighlight] = useState<"rotation" | "translation" | null>(null);
  const [coordinates, setCoordinates] = useState<"A" | "B">("A");
  // The selected calculation step drives both the matrix and the drawing.
  // Keep the stored translation so returning to the full pose restores it.
  const pose = { theta: degrees * Math.PI / 180, x: stage === "pose" ? tx : 0, y: stage === "pose" ? ty : 0 };
  const point: Point2 = [px, py];
  const rotated = rotate2(pose.theta, point);
  const transformed = transform2(pose, point);
  const matrix = matrix2(pose);
  const origin: Point2 = [pose.x, pose.y];
  const result = transformed;
  const expressed = coordinates === "A" ? result : inverseTransform2(pose, result);
  const [ox, oy] = screen(origin), [rx, ry] = screen(result), [ax, ay] = screen([0, 0]);
  const [bx, by] = screen([origin[0] + Math.cos(pose.theta) * 2.2, origin[1] + Math.sin(pose.theta) * 2.2]);
  const [cx, cy] = screen([origin[0] - Math.sin(pose.theta) * 2.2, origin[1] + Math.cos(pose.theta) * 2.2]);
  const sourcePreset = degrees === 45 && tx === 1 && ty === 2 && px === 2 && py === 3;

  function reset() {
    setDegrees(SE2_TUTORIAL.pose.theta * 180 / Math.PI);
    setTx(SE2_TUTORIAL.pose.x); setTy(SE2_TUTORIAL.pose.y);
    setPx(SE2_TUTORIAL.point[0]); setPy(SE2_TUTORIAL.point[1]); setStage("pose"); setCoordinates("A");
  }

  return <div role="group" className="egb-pilot-lab" aria-label="Interaktiv SE(2)-visualisering">
    <div className="egb-pilot-lab-math">
      <h3>Rammen bestemmer koordinatene</h3>
      <p>De to første kolonnene i <MathText inline>{String.raw`{}^AT_B`}</MathText> er B-aksene uttrykt i A. Den siste er origo til B.</p>
      <MathText>{`{}^AT_B=\\begin{bmatrix}${matrix.map((row) => row.map(decimal).join("&")).join("\\\\")}\\end{bmatrix}`}</MathText>
      <div role="group" className="egb-pilot-matrix-focus" aria-label="Koble matrisen til figuren">
        <button type="button" onMouseEnter={() => setHighlight("rotation")} onMouseLeave={() => setHighlight(null)} onFocus={() => setHighlight("rotation")} onBlur={() => setHighlight(null)} onClick={() => setHighlight("rotation")} aria-pressed={highlight === "rotation"}>Vis rotasjonskolonnene</button>
        <button type="button" onMouseEnter={() => setHighlight("translation")} onMouseLeave={() => setHighlight(null)} onFocus={() => setHighlight("translation")} onBlur={() => setHighlight(null)} onClick={() => setHighlight("translation")} aria-pressed={highlight === "translation"}>Vis translasjonen</button>
      </div>
      <p>Roter koordinatvektoren:</p>
      <MathText>{`R\\,{}^Bp=${vector(rotated)}`}</MathText>
      <p>{stage === "pose" ? "Legg til posisjonen til origo B:" : "Bare rotasjon: translasjonen er null."}</p>
      <MathText>{`{}^Ap=${vector(rotated)}+${vector(origin)}=${vector(result)}`}</MathText>
      <p className="egb-pilot-small">{stage === "rotation" ? "Velg Rotasjon + translasjon for å ta med den lagrede translasjonen." : sourcePreset ? "QUT-eksemplet nedenfor er lastet inn." : "Fri utforsking. Regneeksemplet nedenfor beholder sine opprinnelige tall."}</p>
    </div>
    <div className="egb-pilot-lab-figure">
      <div role="group" className="egb-pilot-stage" aria-label="Vis beregningen geometrisk">
        <button type="button" aria-pressed={stage === "rotation"} onClick={() => setStage("rotation")}>Bare rotasjon</button>
        <button type="button" aria-pressed={stage === "pose"} onClick={() => setStage("pose")}>Rotasjon + translasjon</button>
      </div>
      <figure>
        <svg viewBox="0 0 520 450" role="img" aria-labelledby={`${id}-title ${id}-desc`} data-stage={stage} data-result-x={result[0]} data-result-y={result[1]}>
          <title id={`${id}-title`}>To rammer og ett punkt i planet</title>
          <desc id={`${id}-desc`}>{`Ramme B er rotert ${degrees} grader og ${stage === "pose" ? `flyttet til (${tx}, ${ty})` : "har samme origo som A"}. Punktet har B-koordinater (${px}, ${py}) og vises i A ved (${decimal(result[0])}, ${decimal(result[1])}).`}</desc>
          <defs>
            {["muted", "accent", "point", "ink"].map((role) => <marker key={role} id={`${id}-arrow-${role}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={`var(--egb-${role})`} /></marker>)}
          </defs>
          {/* Ticks express measurement. No decorative background grid. */}
          <g className="egb-pilot-world" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d={`M 40 ${ay} H 486`} markerEnd={`url(#${id}-arrow-muted)`} />
            <path d={`M ${ax} 428 V 32`} markerEnd={`url(#${id}-arrow-muted)`} />
            {[-6, -4, -2, 2, 4, 6, 8, 10].map((n) => <g key={n}>
              <path d={`M ${screen([n, 0])[0]} ${ay - 4} v 8`} />
              <text x={screen([n, 0])[0]} y={ay + 21} textAnchor="middle" stroke="none" fill="currentColor">{n}</text>
              {n <= 8 && <><path d={`M ${ax - 4} ${screen([0, n])[1]} h 8`} /><text x={ax - 10} y={screen([0, n])[1] + 4} textAnchor="end" stroke="none" fill="currentColor">{n}</text></>}
            </g>)}
          </g>
          <text x="482" y={ay - 10} className="egb-pilot-axis-label">x<tspan baselineShift="sub">A</tspan></text>
          <text x={ax + 12} y="40" className="egb-pilot-axis-label">y<tspan baselineShift="sub">A</tspan></text>
          <text x={ax - 20} y={ay + 24} className="egb-pilot-axis-label">A</text>
          {stage === "pose" && <g className="egb-pilot-translation" strokeWidth={highlight === "translation" ? 4 : 2}>
            <line x1={ax} y1={ay} x2={ox} y2={oy} stroke="currentColor" strokeDasharray="5 4" markerEnd={`url(#${id}-arrow-point)`} />
          </g>}
          <g className="egb-pilot-body-frame" strokeWidth={highlight === "rotation" ? 4 : 2.4}>
            <line x1={ox} y1={oy} x2={bx} y2={by} stroke="currentColor" markerEnd={`url(#${id}-arrow-accent)`} />
            <line x1={ox} y1={oy} x2={cx} y2={cy} stroke="currentColor" strokeDasharray="4 3" markerEnd={`url(#${id}-arrow-accent)`} />
            <circle cx={ox} cy={oy} r="3" fill="currentColor" />
            <text x={bx + 10} y={by - 8} fill="currentColor">x<tspan baselineShift="sub">B</tspan></text>
            <text x={cx - 30} y={cy + 18} fill="currentColor">y<tspan baselineShift="sub">B</tspan></text>
            {stage === "pose" && <text x={ox + 8} y={oy + 20} fill="currentColor">B</text>}
          </g>
          <line x1={ox} y1={oy} x2={rx} y2={ry} className="egb-pilot-point-vector" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${id}-arrow-ink)`} />
          <circle cx={rx} cy={ry} r="5" className="egb-pilot-point" />
          <text x={rx + 12} y={ry - 12} className="egb-pilot-point-label">P</text>
        </svg>
        <figcaption>Grå akser: ramme A. Grønne akser: ramme B (x heltrukket, y stiplet). {stage === "pose" ? "Brun stiplet pil: translasjon t." : "A og B har samme origo."} P er punktet målt fra B.</figcaption>
      </figure>
      <div role="group" className="egb-pilot-stage" aria-label="Uttrykk samme punkt i en annen ramme">
        {(["A", "B"] as const).map((frame) => <button type="button" key={frame} aria-pressed={coordinates === frame} onClick={() => setCoordinates(frame)}>Koordinater i {frame}</button>)}
      </div>
      <output className="egb-pilot-result" aria-live="off">P i ramme {coordinates}: ({decimal(expressed[0])}, {decimal(expressed[1])})</output>
      {coordinates === "B" && <MathText>{`{}^Bp=R^T\\left(${vector(result)}-${vector(origin)}\\right)=${vector(expressed)}`}</MathText>}
      <p className="egb-pilot-small">A/B-knappene endrer bare koordinatbeskrivelsen; punktet og rammene blir stående. Vinkel- og translasjonskontrollene nedenfor flytter derimot rammen og punktet fysisk.</p>
      <fieldset className="egb-pilot-controls"><legend>Endre ramme B og punktet</legend>
        {[
          { label: "Vinkel θ", value: degrees, set: setDegrees, min: -180, max: 180, step: 1, unit: "°" },
          { label: "Translasjon x", value: tx, set: setTx, min: -2, max: 3, step: .1, unit: "" },
          { label: "Translasjon y", value: ty, set: setTy, min: -2, max: 3, step: .1, unit: "" },
          { label: "Punkt x i B", value: px, set: setPx, min: -2, max: 3, step: .1, unit: "" },
          { label: "Punkt y i B", value: py, set: setPy, min: -2, max: 3, step: .1, unit: "" },
        ].map((control, index) => <label key={control.label} htmlFor={`${id}-control-${index}`}>
          <span>{control.label}<output>{control.value.toFixed(index === 0 ? 0 : 1)}{control.unit}</output></span>
          <input id={`${id}-control-${index}`} aria-label={control.label} disabled={stage === "rotation" && (index === 1 || index === 2)} type="range" min={control.min} max={control.max} step={control.step} value={control.value} onChange={(event) => control.set(Number(event.target.value))} />
        </label>)}
      </fieldset>
      <button type="button" onClick={reset} className="egb-pilot-reset">Tilbakestill QUT-eksempel</button>
      <p className="egb-pilot-small">Endrer du rammen B, følger P med fordi B-koordinatene holdes faste. Et rent rammeskifte holder geometrien fast og endrer bare hvilke koordinater vi oppgir.</p>
    </div>
  </div>;
}
