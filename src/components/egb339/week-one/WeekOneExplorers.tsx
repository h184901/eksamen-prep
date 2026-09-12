"use client";

import { useId, useState } from "react";
import MathText from "../pilot/Egb339Math";
import { transform2, inverseTransform2, matrix2, type Point2 } from "@/lib/egb339-se2";
import { matrixTex, pointTex, svgCoordinate } from "@/lib/egb339-math-format";
import { WEEK_ONE_IDENTITY, WEEK_ONE_Q15 } from "@/lib/egb339-week-one";

const decimal = (n: number) => (Math.abs(n) < .00005 ? 0 : n).toFixed(2);
// Fixed equal-axis scale. Translation ±2, point radius sqrt(5), frame axes 1.5.
const screen = ([x, y]: Point2): Point2 => [svgCoordinate(260 + x * 44), svgCoordinate(240 - y * 44)];

export function WeekOneFrameExplorer() {
  const id = useId().replace(/:/g, "");
  const [degrees, setDegrees] = useState(0);
  const [tx, setTx] = useState(1);
  const [ty, setTy] = useState(2);
  const [mode, setMode] = useState<"body" | "fixed">("body");
  const [fixedPoint, setFixedPoint] = useState<Point2>([3, 3]);
  const [bodyPoint, setBodyPoint] = useState<Point2>([2, 1]);
  const [coordinates, setCoordinates] = useState<"A" | "B">("A");
  const pose = { theta: degrees * Math.PI / 180, x: tx, y: ty };
  const worldPoint = mode === "body" ? transform2(pose, bodyPoint) : fixedPoint;
  const localPoint = mode === "body" ? bodyPoint : inverseTransform2(pose, fixedPoint);
  const [ax, ay] = screen([0, 0]), [bx, by] = screen([tx, ty]), [px, py] = screen(worldPoint);
  const xEnd = screen(transform2(pose, [1.5, 0])), yEnd = screen(transform2(pose, [0, 1.5]));
  const selected = coordinates === "A" ? worldPoint : localPoint;

  function switchMode(next: "body" | "fixed") {
    // Switching interpretation never teleports the physical point.
    if (next === "fixed") setFixedPoint(worldPoint);
    else setBodyPoint(localPoint);
    setMode(next);
  }
  function reset() { setDegrees(0); setTx(1); setTy(2); setMode("body"); setFixedPoint([3, 3]); setBodyPoint([2, 1]); setCoordinates("A"); }
  // A point reattached after free frame changes may exceed the original drawing bounds.
  // Fit all actual geometry while preserving equal scales and the world origin.
  const points = [[ax, ay], [bx, by], [px, py], xEnd, yEnd];
  const left = Math.min(0, ...points.map(([x]) => x - 54));
  const top = Math.min(0, ...points.map(([, y]) => y - 54));
  const width = Math.max(520, ...points.map(([x]) => x + 54)) - left;
  const height = Math.max(480, ...points.map(([, y]) => y + 54)) - top;

  return <div className="egb-week-explorer" role="group" aria-label="Utforsk punkt og rammer">
    <div className="egb-week-frame-scene">
      <div className="egb-week-actions" role="group" aria-label="Hva følger rammen?">
        <button type="button" className="egb-week-button" aria-pressed={mode === "body"} onClick={() => switchMode("body")}>P følger B</button>
        <button type="button" className="egb-week-button" aria-pressed={mode === "fixed"} onClick={() => switchMode("fixed")}>P står stille</button>
      </div>
      <figure>
        <svg viewBox={`${left} ${top} ${width} ${height}`} role="img" aria-labelledby={`${id}-title ${id}-desc`} data-world-x={worldPoint[0]} data-world-y={worldPoint[1]} data-local-x={localPoint[0]} data-local-y={localPoint[1]}>
          <title id={`${id}-title`}>Punkt P sett fra ramme A og ramme B</title>
          <desc id={`${id}-desc`}>{`Ramme B har origo (${tx}, ${ty}) og vinkel ${degrees} grader. P i A er (${decimal(worldPoint[0])}, ${decimal(worldPoint[1])}), i B (${decimal(localPoint[0])}, ${decimal(localPoint[1])}). ${mode === "body" ? "P følger B når rammen flyttes." : "P står stille når rammen flyttes."}`}</desc>
          <defs>{["a", "b"].map((frame) => <marker key={frame} id={`${id}-${frame}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 8 4 0 8Z" fill={`var(--week-frame-${frame})`} /></marker>)}</defs>
          <g stroke="var(--egb-line)" strokeWidth="1" fill="none">
            {[-4, -2, 0, 2, 4].map((n) => <g key={n}><path d={`M${screen([n, -4.5])[0]} ${screen([0, -4.5])[1]}V${screen([0, 4.5])[1]}`} /><path d={`M${screen([-4.5, 0])[0]} ${screen([0, n])[1]}H${screen([4.5, 0])[0]}`} /></g>)}
          </g>
          <g stroke="var(--week-frame-a)" strokeWidth="2" fill="none" markerEnd={`url(#${id}-a)`}><path d={`M${ax} ${ay}H${screen([4.6, 0])[0]}`} /><path d={`M${ax} ${ay}V${screen([0, 4.6])[1]}`} strokeDasharray="5 4" /></g>
          <g className="egb-week-frame-a"><text x={ax - 24} y={ay + 26}>A</text><text x="476" y={ay - 10}>x<tspan baselineShift="sub">A</tspan></text><text x={ax - 28} y="30">y<tspan baselineShift="sub">A</tspan></text></g>
          <g className="egb-week-diagram-label">{[-4, -2, 2, 4].map((n) => <text key={n} x={screen([n, 0])[0]} y={ay + 18} textAnchor="middle">{n}</text>)}</g>
          <path d={`M${ax} ${ay}L${bx} ${by}`} fill="none" stroke="var(--egb-muted)" strokeWidth="1.5" strokeDasharray="3 5" />
          <g stroke="var(--week-frame-b)" strokeWidth="3" fill="none" markerEnd={`url(#${id}-b)`}><path d={`M${bx} ${by}L${xEnd[0]} ${xEnd[1]}`} /><path d={`M${bx} ${by}L${yEnd[0]} ${yEnd[1]}`} strokeDasharray="5 4" /></g>
          <g className="egb-week-frame-b"><circle cx={bx} cy={by} r="4" /><text x={bx - 24} y={by + 22}>B</text><text x={xEnd[0] + 8} y={xEnd[1] - 12}>x<tspan baselineShift="sub">B</tspan></text><text x={yEnd[0] + 8} y={yEnd[1] - 12}>y<tspan baselineShift="sub">B</tspan></text></g>
          <path d={`M${coordinates === "A" ? ax : bx} ${coordinates === "A" ? ay : by}L${px} ${py}`} stroke={`var(--week-frame-${coordinates.toLowerCase()})`} strokeWidth="2" strokeDasharray="2 4" />
          <path d={`M${px} ${py - 7}l7 7-7 7-7-7Z`} fill="var(--egb-ink)" stroke="var(--egb-paper)" strokeWidth="2" />
          <text x={px + 14} y={py + 22} className="egb-week-diagram-name">P</text>
        </svg>
        <figcaption><span className="egb-week-frame-a">A: referanseramme.</span> <span className="egb-week-frame-b">B: flyttbar ramme.</span> P er markert med en diamant. Rutenettet måler avstand; én rute er 2 lengdeenheter.</figcaption>
      </figure>
    </div>
    <div className="egb-week-explorer-controls">
      <h3>{mode === "body" ? "Flytt objektet" : "Beskriv samme punkt"}</h3>
      <p>{mode === "body" ? "P er festet til B. Endrer du rammen, endres posisjonen til P i verden, men B-koordinatene er konstante." : "P står stille i verden. Endrer du rammen, endres B-koordinatene, men A-koordinatene er konstante."}</p>
      <fieldset><legend>Pose til ramme B, relativt til A</legend>
        {[{ label: "Vinkel θ", value: degrees, set: setDegrees, min: -180, max: 180, step: 1, unit: "°" }, { label: "Posisjon x", value: tx, set: setTx, min: -2, max: 2, step: .1, unit: "" }, { label: "Posisjon y", value: ty, set: setTy, min: -2, max: 2, step: .1, unit: "" }].map((control, i) => <label key={control.label} htmlFor={`${id}-control-${i}`}>
          <span>{control.label}<output>{decimal(control.value)}{control.unit}</output></span>
          <input id={`${id}-control-${i}`} type="range" aria-label={control.label} min={control.min} max={control.max} step={control.step} value={control.value} onChange={(event) => control.set(Number(event.target.value))} />
        </label>)}
      </fieldset>
      <div className="egb-week-actions" role="group" aria-label="Vis koordinater i">
        {(["A", "B"] as const).map((frame) => <button key={frame} type="button" className="egb-week-button" aria-pressed={coordinates === frame} onClick={() => setCoordinates(frame)}>Ramme {frame}</button>)}
      </div>
      <output className="egb-week-coordinate-result" aria-live="off">P i {coordinates}: ({decimal(selected[0])}, {decimal(selected[1])})</output>
      <p className="egb-pilot-small">A/B-knappene bytter bare koordinatbeskrivelse. De flytter ikke P.</p>
      <button type="button" className="egb-week-button" onClick={reset}>Nullstill</button>
    </div>
    <div className="egb-week-frame-math">
      <p><span className="egb-week-frame-b">Fra B</span> til <span className="egb-week-frame-a">A</span>: rotasjon og deretter translasjon. De tre radene nedenfor er den homogene matrisen; den siste punktkoordinaten er 1.</p>
      <MathText>{String.raw`{}^AT_B=${matrixTex(matrix2(pose))}`}</MathText>
      <MathText>{coordinates === "A" ? String.raw`{}^Ap={}^AR_B\,{}^Bp+{}^At_B=${pointTex(worldPoint)}` : String.raw`{}^Bp=({}^AR_B)^T({}^Ap-{}^At_B)=${pointTex(localPoint)}`}</MathText>
    </div>
  </div>;
}

export function WeekOneMatrixExplorer() {
  const [preset, setPreset] = useState<"qut" | "identity">("qut");
  const [cell, setCell] = useState(0);
  const [compare, setCompare] = useState(false);
  const { a, b } = preset === "qut" ? WEEK_ONE_Q15 : WEEK_ONE_IDENTITY;
  const row = Math.floor(cell / 2), column = cell % 2;
  const product = a.map((values) => b[0].map((_, j) => values.reduce<number>((sum, value, k) => sum + value * b[k][j], 0)));
  const elementwise = a.map((values, i) => values.map((value, j) => value * b[i][j]));

  function reset() { setPreset("qut"); setCell(0); setCompare(false); }
  return <div className="egb-week-matrix-explorer" role="group" aria-label="Rad mot kolonne">
    <div className="egb-week-actions">
      <button type="button" className="egb-week-button" onClick={reset}>Last QUT-eksempel</button>
      <button type="button" className="egb-week-button" onClick={() => { setPreset(preset === "qut" ? "identity" : "qut"); setCell(0); }}>Neste eksempel</button>
      <button type="button" className="egb-week-button" aria-pressed={compare} onClick={() => setCompare(!compare)}>Sammenlign @ og *</button>
    </div>
    <p className="egb-pilot-small">{preset === "qut" ? "QUT warmup Q15. Velg et resultatelement for å følge regningen." : "Eget kontrolleksempel: A er identitetsmatrisen. AB skal derfor bli B."}</p>
    <div className="egb-week-matrix-row">
      {[{ name: "A", values: a }, { name: "B", values: b }].map(({ name, values }) => <figure key={name}>
        <figcaption>Matrise {name}</figcaption>
        <div className="egb-week-number-matrix" role="table" aria-label={`Matrise ${name}`}>
          {values.map((values, i) => <div key={i} role="row">{values.map((value, j) => <span key={j} role="cell" data-selected={name === "A" ? i === row : j === column} data-matrix={name}>{value}</span>)}</div>)}
        </div>
      </figure>)}
      <figure><figcaption>AB: velg element</figcaption><div className="egb-week-number-matrix" role="group" aria-label="Resultatelementer">{product.map((values, i) => <div key={i}>{values.map((value, j) => <button key={j} type="button" onClick={() => setCell(i * 2 + j)} aria-pressed={cell === i * 2 + j} aria-label={`Rad ${i + 1}, kolonne ${j + 1}: ${value}`}>{value}</button>)}</div>)}</div></figure>
    </div>
    <p><span className="egb-week-frame-a">Rad {row + 1} i A</span> møter <span className="egb-week-frame-b">kolonne {column + 1} i B</span>. Multipliser tilsvarende elementer og summer produktene.</p>
    <div className="egb-week-calculation" aria-live="polite">
      <MathText>{String.raw`(AB)_{${row + 1}${column + 1}}=${a[row][0]}\cdot${b[0][column]}+${a[row][1]}\cdot${b[1][column]}=${a[row][0] * b[0][column]}+${a[row][1] * b[1][column]}=${product[row][column]}`}</MathText>
    </div>
    <div className="egb-week-actions"><button type="button" className="egb-week-button" onClick={() => setCell((cell + 1) % 4)}>Neste steg</button><button type="button" className="egb-week-button" onClick={reset}>Nullstill</button></div>
    {compare && <div className="egb-week-comparison">
      <div><h4>Matriseprodukt: <code>A @ B</code></h4><MathText>{matrixTex(product)}</MathText><p>Rad mot kolonne. Indre dimensjoner må passe.</p></div>
      <div><h4>Elementvis: <code>A * B</code></h4><MathText>{matrixTex(elementwise)}</MathText><p>Her multipliseres elementer på samme plass. Dette løser ikke Q15.</p></div>
    </div>}
  </div>;
}

export function WeekOneConditionalCheck() {
  const [answer, setAnswer] = useState<boolean | null>(null);
  return <div className="egb-week-check" role="group" aria-label="Kontroller grenseverdien">
    <h3>Prøv selv: akkurat på grensen</h3>
    <p>Q2 krever <code>x &lt; 10</code>. Hva skal funksjonen returnere når <code>x = 10</code>?</p>
    <div className="egb-week-actions">{[true, false].map((value) => <button key={String(value)} type="button" className="egb-week-button" aria-pressed={answer === value} onClick={() => setAnswer(value)}>{value ? "True" : "False"}</button>)}<button type="button" className="egb-week-button" onClick={() => setAnswer(null)}>Nullstill</button></div>
    {answer !== null && <p className="egb-week-feedback" data-state={answer ? "error" : "success"} role="status">{answer ? "Ikke riktig: 10 er lik 10, ikke mindre enn 10. Prøv igjen." : "Riktig: False. Den strenge ulikheten utelater grenseverdien 10."}</p>}
  </div>;
}
