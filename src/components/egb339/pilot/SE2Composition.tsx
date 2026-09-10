"use client";

import { useId, useState } from "react";
import { compose2, matrix2, transform2, type Point2, type Pose2 } from "@/lib/egb339-se2";
import MathText from "./Egb339Math";
import { matrixTex, numberTex, pointTex, svgCoordinate } from "@/lib/egb339-math-format";

const initialA: Pose2 = { theta: Math.PI / 6, x: 1, y: 2 };
const initialB: Pose2 = { theta: 0, x: 2, y: 1 };
const screen = ([x, y]: Point2): Point2 => [svgCoordinate(270 + 24 * x), svgCoordinate(270 - 24 * y)];

/** Corke ch. 2.2.2.1: TA TB and TB TA are different ordered rigid motions. */
export default function SE2Composition() {
  const id = useId().replace(/:/g, "");
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const [order, setOrder] = useState<"AB" | "BA">("AB");
  const [focus, setFocus] = useState<"first" | "result" | null>(null);
  const [point, setPoint] = useState<Point2>([0, 0]);
  const first = order === "AB" ? a : b;
  const second = order === "AB" ? b : a;
  const total = compose2(first, second);
  const other = compose2(second, first);
  const intermediate = transform2(second, point);
  const result = transform2(total, point);
  const frames = [
    { name: "0", pose: { theta: 0, x: 0, y: 0 }, kind: "world" },
    { name: order[0], pose: first, kind: "first" },
    { name: order, pose: total, kind: "result" },
  ];
  const reset = () => { setA(initialA); setB(initialB); setPoint([0, 0]); setOrder("AB"); setFocus(null); };
  return <div role="group" className="egb-pilot-lab" aria-label="SE(2) komposisjon">
    <div className="egb-pilot-lab-math">
      <h3>Produktet leses fra høyre på et punkt</h3>
      <p>T_A og T_B er to bevegelsesoperatorer. Sluttrammen {order} har pose T_{order[0]} T_{order[1]} i verden 0. For en rammekjede uttrykkes det andre trinnet i mellomrammen.</p>
      <MathText>{"T_A=" + matrixTex(matrix2(a))}</MathText>
      <MathText>{"T_B=" + matrixTex(matrix2(b))}</MathText>
      <div className="egb-pilot-matrix-focus">
        <button type="button" onMouseEnter={() => setFocus("first")} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus("first")} onBlur={() => setFocus(null)} onClick={() => setFocus("first")}>Vis mellomramme {order[0]}</button>
        <button type="button" onMouseEnter={() => setFocus("result")} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus("result")} onBlur={() => setFocus(null)} onClick={() => setFocus("result")}>Vis sluttramme {order}</button>
      </div>
      <MathText>{"T_" + order + "=T_" + order[0] + "T_" + order[1] + "=" + matrixTex(matrix2(total))}</MathText>
      <p>Den relative translasjonen roteres av første ramme:</p>
      <MathText>{"t_" + order + "=" + pointTex([first.x, first.y]) + "+R_" + order[0] + pointTex([second.x, second.y]) + "=" + pointTex([total.x, total.y])}</MathText>
      <p>For punktet p virker høyre faktor først:</p>
      <MathText>{"p=" + pointTex(point) + ",\\quad T_" + order[1] + "p=" + pointTex(intermediate)}</MathText>
      <MathText>{"T_" + order + "p=" + pointTex(result)}</MathText>
      <p className="egb-pilot-small">Punkter vises med to koordinater; i matriseproduktet legges den homogene 1-eren til.</p>
    </div>
    <div className="egb-pilot-lab-figure">
      <div role="group" className="egb-pilot-stage" aria-label="Multiplikasjonsrekkefølge">
        {(["AB", "BA"] as const).map((value) => <button key={value} type="button" aria-pressed={order === value} onClick={() => setOrder(value)}>T_{value[0]} T_{value[1]}</button>)}
      </div>
      <figure>
        <svg viewBox="0 0 560 500" role="img" aria-labelledby={id + "-title " + id + "-desc"} data-composition={order} data-result-x={result[0]} data-result-y={result[1]}>
          <title id={id + "-title"}>Komposisjon med mellomramme {order[0]} og sluttramme {order}</title>
          <desc id={id + "-desc"}>Operatorene anvendes i rekkefølgen {order[1]}, deretter {order[0]}, på punktet. Resultatet er ({numberTex(result[0])}, {numberTex(result[1])}) i verden 0.</desc>
          <defs>{["world", "first", "result"].map((kind) => <marker key={kind} id={id + "-" + kind} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill={kind === "world" ? "var(--egb-muted)" : kind === "first" ? "var(--egb-point)" : "var(--egb-accent)"} /></marker>)}</defs>
          <path d="M30 270H530M270 470V30" fill="none" stroke="var(--egb-line)" />
          {[-8, -4, 4, 8].map((n) => <g key={n} fill="var(--egb-muted)"><text x={screen([n, 0])[0]} y="290" textAnchor="middle">{n}</text><text x="250" y={screen([0, n])[1]} textAnchor="end">{n}</text></g>)}
          {frames.map(({ name, pose, kind }) => {
            const [x, y] = screen([pose.x, pose.y]);
            const [xx, xy] = screen(transform2(pose, [1.8, 0]));
            const [yx, yy] = screen(transform2(pose, [0, 1.8]));
            const color = kind === "world" ? "var(--egb-muted)" : kind === "first" ? "var(--egb-point)" : "var(--egb-accent)";
            return <g key={kind} stroke={color} fill={color} strokeWidth={focus === kind ? 4 : 2} data-frame={name}>
              <path d={"M" + x + " " + y + "L" + xx + " " + xy} markerEnd={"url(#" + id + "-" + kind + ")"} />
              <path d={"M" + x + " " + y + "L" + yx + " " + yy} markerEnd={"url(#" + id + "-" + kind + ")"} strokeDasharray="4 3" />
              <circle cx={x} cy={y} r="3" /><text x={xx + 8} y={xy - 8} stroke="none">x<tspan baselineShift="sub" fontSize="12">{name}</tspan></text>
              <text x={yx - 8} y={yy - 12} textAnchor="end" stroke="none">y<tspan baselineShift="sub" fontSize="12">{name}</tspan></text>
            </g>;
          })}
          <line x1={screen([first.x, first.y])[0]} y1={screen([first.x, first.y])[1]} x2={screen([total.x, total.y])[0]} y2={screen([total.x, total.y])[1]} stroke="var(--egb-accent)" strokeDasharray="5 4" />
          <circle cx={screen(result)[0]} cy={screen(result)[1]} r="5" fill="var(--egb-ink)" />
          <text x={screen(result)[0] + 12} y={screen(result)[1] + 24} fill="var(--egb-ink)">P</text>
        </svg>
        <figcaption>Alle rammer er tegnet i verden 0, med samme målestokk på begge akser. Heltrukken rammeakse er x; stiplet er y. Stiplet forbindelse viser det andre translasjonstrinnet.</figcaption>
      </figure>
      <output className="egb-pilot-result">{order}: origo ({numberTex(total.x)}, {numberTex(total.y)}). Motsatt rekkefølge: ({numberTex(other.x)}, {numberTex(other.y)}).</output>
      {[{ name: "A", pose: a, set: setA }, { name: "B", pose: b, set: setB }].map(({ name, pose, set }) => <fieldset className="egb-pilot-controls" key={name}><legend>Operator T_{name}</legend>
        {[{ key: "theta" as const, label: "Vinkel " + name, value: pose.theta * 180 / Math.PI, min: -180, max: 180, step: 1 }, { key: "x" as const, label: "Translasjon x " + name, value: pose.x, min: -2, max: 2, step: .1 }, { key: "y" as const, label: "Translasjon y " + name, value: pose.y, min: -2, max: 2, step: .1 }].map((control) => <label key={control.key}><span>{control.label}<output>{control.value.toFixed(1)}{control.key === "theta" ? "°" : ""}</output></span><input type="range" min={control.min} max={control.max} step={control.step} value={control.value} onChange={(event) => set({ ...pose, [control.key]: Number(event.target.value) * (control.key === "theta" ? Math.PI / 180 : 1) })} /></label>)}
      </fieldset>)}
      <fieldset className="egb-pilot-controls"><legend>Punkt før operatorene</legend>{[0, 1].map((axis) => <label key={axis}><span>Punkt {axis === 0 ? "x" : "y"}<output>{point[axis].toFixed(1)}</output></span><input type="range" min="-2" max="2" step=".1" value={point[axis]} onChange={(event) => setPoint(axis === 0 ? [Number(event.target.value), point[1]] : [point[0], Number(event.target.value)])} /></label>)}</fieldset>
      <button type="button" onClick={reset} className="egb-pilot-reset">Last bokas komposisjonseksempel</button>
      <p className="egb-pilot-source">Corke, kap. 2.2.2.1, trykt s. 38–40. Bokas preset sammenligner rammenes origo (p = 0); andre punkt er fri utforsking.</p>
    </div>
  </div>;
}
