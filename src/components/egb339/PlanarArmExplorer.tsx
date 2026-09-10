"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import { PLANAR2_QUT, PLANAR2_QUT_TARGETS, planar2Forward, planar2Inverse, planar2Workspace, type IkBranch, type JointPair, type Planar2Model } from "@/lib/egb339-planar2";
import { transform2, type Point2, type Pose2 } from "@/lib/egb339-se2";
import { matrixTex, numberTex, pointTex, svgCoordinate } from "@/lib/egb339-math-format";
import MathText from "./pilot/Egb339Math";

type Mode = "fk" | "ik";
type Focus = "t01" | "t12" | "t02" | null;
interface State { mode: Mode; model: Planar2Model; joints: JointPair; target: Point2; branch: IkBranch; extent: number }
const seed = (mode: Mode): State => ({ mode, model: PLANAR2_QUT, joints: [0, Math.PI / 2], target: PLANAR2_QUT_TARGETS[0], branch: "positive", extent: PLANAR2_QUT.l1 + PLANAR2_QUT.l2 + 3 });

/** One model/state drives the arm, all frames, matrices, controls and IK residual. */
export default function PlanarArmExplorer({ initialMode = "fk" }: { initialMode?: Mode }) {
  const id = useId().replace(/:/g, "");
  const [state, setState] = useState<State>(() => seed(initialMode));
  const [focus, setFocus] = useState<Focus>(null);
  const drag = useRef<{ pointer: number; scale: number; extent: number } | null>(null);
  const { mode, model, joints, target, branch, extent } = state;
  const fk = planar2Forward(model, joints);
  const ik = planar2Inverse(model, target, joints[0]);
  const workspace = planar2Workspace(model);
  const scale = 230 / extent;
  const screen = ([x, y]: Point2): Point2 => [svgCoordinate(300 + x * scale), svgCoordinate(280 - y * scale)];
  const error = Math.hypot(fk.end[0] - target[0], fk.end[1] - target[1]);
  const alternative = ik[branch === "positive" ? "negative" : "positive"];
  const other = mode === "ik" && ik.kind === "regular" && alternative ? planar2Forward(model, alternative) : null;
  const polyline = (points: readonly Point2[]) => points.map((p) => screen(p).join(",")).join(" ");

  function update(patch: Partial<State>) {
    const dragging = drag.current !== null;
    setState((previous) => {
      const next = { ...previous, ...patch };
      if (next.mode === "fk") {
        next.target = planar2Forward(next.model, next.joints).end;
        next.branch = Math.sin(next.joints[1]) >= 0 ? "positive" : "negative";
      } else {
        const solution = planar2Inverse(next.model, next.target, next.joints[0]);
        next.joints = solution[next.branch] ?? next.joints; // Keep last valid pose; never project an unreachable target onto the boundary.
      }
      // A drag uses one coordinate system, also on release. Refit only when a
      // control/preset changes the model or target, never under the pointer.
      if (!dragging) next.extent = Math.max(planar2Workspace(next.model).outer, ...next.target.map(Math.abs)) + 3;
      return next;
    });
  }
  function move(event: PointerEvent<SVGSVGElement>) {
    if (!drag.current || event.pointerId !== drag.current.pointer) return;
    const transform = event.currentTarget.getScreenCTM();
    if (!transform) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(transform.inverse());
    const limit = drag.current.extent - 1;
    const bounded = (value: number) => Math.max(-limit, Math.min(limit, value));
    update({ target: [bounded((point.x - 300) / drag.current.scale), bounded((280 - point.y) / drag.current.scale)] });
  }
  function startDrag(event: PointerEvent<SVGSVGElement>) {
    if (mode !== "ik" || event.button !== 0) return;
    event.preventDefault();
    drag.current = { pointer: event.pointerId, scale, extent };
    event.currentTarget.setPointerCapture(event.pointerId);
    move(event);
  }
  function endDrag(event: PointerEvent<SVGSVGElement>) {
    if (drag.current?.pointer !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  const frames: { name: string; pose: Pose2; selected: boolean }[] = [
    { name: "0", pose: { theta: 0, x: 0, y: 0 }, selected: focus === "t01" || focus === "t02" },
    { name: "1", pose: fk.first, selected: focus === "t01" || focus === "t12" },
    { name: "E", pose: fk.total, selected: focus === "t12" || focus === "t02" },
  ];

  return <div role="group" className="egb-arm" aria-label="Planar 2R laboratorium" data-mode={mode} data-ik-status={ik.kind} data-end-x={fk.end[0]} data-end-y={fk.end[1]} data-ik-error={error}>
    <h2>En robot, to regneretninger</h2>
    <p className="egb-pilot-prose">FK: velg leddvinkler og les endeposisjonen. IK: velg et mål og finn begge leddkonfigurasjonene. Modellen er en fri, plan 2R-arm, ikke en Dobot med mekaniske begrensninger.</p>
    <div role="group" className="egb-pilot-stage" aria-label="Velg kinematisk problem">
      <button type="button" aria-pressed={mode === "fk"} onClick={() => update({ mode: "fk" })}>FK · ledd til posisjon</button>
      <button type="button" aria-pressed={mode === "ik"} onClick={() => update({ mode: "ik", target: fk.end })}>IK · posisjon til ledd</button>
    </div>
    <div className="egb-pilot-lab">
      <div className="egb-pilot-lab-math">
        <h3>{mode === "fk" ? "Roter ved leddet, flytt langs lenken" : "Løs trekanten, velg gren"}</h3>
        <MathText>{String.raw`{}^0T_E=R(q_1)T_x(L_1)R(q_2)T_x(L_2)`}</MathText>
        <p>Ramme 1 ligger ved albuen, med x₁ langs lenke 1. Ramme 2 = E ligger ved endepunktet, med x_E langs lenke 2. T₁₂ er relativ til ramme 1; figuren viser alle rammer i verden 0.</p>
        <div role="group" className="egb-arm-matrices" aria-label="Transformasjoner koblet til figuren">
          {[
            { key: "t01" as const, label: String.raw`{}^0T_1`, matrix: fk.t01, name: "T01: lenke 1 og ramme 1" },
            { key: "t12" as const, label: String.raw`{}^1T_2`, matrix: fk.t12, name: "T12: lenke 2 og enderammen" },
            { key: "t02" as const, label: String.raw`{}^0T_E={}^0T_1{}^1T_2`, matrix: fk.t02, name: "T0E: hele kjeden" },
          ].map(({ key, label, matrix, name }) => <div key={key} className="egb-arm-matrix" data-highlight={focus === key} onMouseEnter={() => setFocus(key)} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus(key)} onBlur={() => setFocus(null)}>
            <button type="button" aria-pressed={focus === key} onClick={() => setFocus(key)}>{name}</button>
            <MathText>{label + "=" + matrixTex(matrix)}</MathText>
          </div>)}
        </div>
        <p className="egb-pilot-small">Pek på en matrise, eller fokuser navnet over den, for å følge lenken og rammen.</p>
        {mode === "fk" ? <>
          <MathText>{String.raw`x=L_1\cos q_1+L_2\cos(q_1+q_2)`}</MathText>
          <MathText>{String.raw`y=L_1\sin q_1+L_2\sin(q_1+q_2)`}</MathText>
          <MathText>{"p_E=" + pointTex(fk.joint) + "+" + pointTex([fk.end[0] - fk.joint[0], fk.end[1] - fk.joint[1]]) + "=" + pointTex(fk.end)}</MathText>
        </> : <>
          <MathText>{String.raw`c_2=\frac{x^2+y^2-L_1^2-L_2^2}{2L_1L_2}` + "=" + numberTex(ik.c2)}</MathText>
          <MathText>{String.raw`q_2=\pm\arccos c_2`}</MathText>
          <MathText>{String.raw`q_1=\operatorname{atan2}(y,x)-\operatorname{atan2}(L_2\sin q_2,L_1+L_2\cos q_2)`}</MathText>
          <p className="egb-pilot-small">Kun posisjon er gitt. Enderammens orientering er q₁ + q₂ og kan være forskjellig for de to løsningene.</p>
        </>}
        <output className="egb-pilot-result">q = ({numberTex(joints[0])}, {numberTex(joints[1])}) rad<br />p_E = ({numberTex(fk.end[0])}, {numberTex(fk.end[1])})<br />Orientering = {(fk.total.theta * 180 / Math.PI).toFixed(1)}°</output>
        {mode === "ik" && <p className="egb-arm-state" role="status">{ik.kind === "unreachable" ? "Målet er utenfor arbeidsrommet. Ingen reell IK-løsning. Armen viser siste gyldige konfigurasjon; målpunktet flyttes ikke til kanten." : ik.kind === "folded-free" ? "Like lenker og mål i origo: q₂ = π, mens q₁ er fri. Figuren beholder siste skuldervinkel. Uendelig mange løsninger." : ik.kind === "singular" ? "Singulær grense: lenkene er på samme linje. Grenene sammenfaller modulo 2π." : "To løsninger. Heltrukket arm er valgt gren; stiplet arm er den andre."}</p>}
        {mode === "ik" && <p className="egb-pilot-small">FK-kontroll: avstand til mål = {error < 1e-9 ? "< 10⁻⁹" : error.toFixed(4)} lengdeenheter.</p>}
        {mode === "fk" && fk.singular && <p className="egb-arm-state" role="status">Singulær konfigurasjon: lenkene ligger på samme linje.</p>}
      </div>
      <div className="egb-pilot-lab-figure">
        <figure>
          <svg viewBox="0 0 600 560" role="group" aria-labelledby={id + "-title " + id + "-desc"} onPointerDown={startDrag} onPointerMove={move} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { drag.current = null; }} className={mode === "ik" ? "egb-arm-draggable" : undefined}>
            <title id={id + "-title"}>2R-arm med verdensramme, albueramme og enderamme</title>
            <desc id={id + "-desc"}>L1 {model.l1}, L2 {model.l2}. Endepunkt {numberTex(fk.end[0])}, {numberTex(fk.end[1])}. {mode === "ik" ? "Flytt målet ved å dra i figuren eller bruke målkoordinatene nedenfor." : "Endre leddvinklene nedenfor."}</desc>
            <defs><marker id={id + "-axis"} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--egb-accent)" /></marker></defs>
            <circle cx="300" cy="280" r={workspace.outer * scale} fill="var(--egb-hover)" stroke="var(--egb-line)" />
            {workspace.inner > 0 && <circle cx="300" cy="280" r={workspace.inner * scale} fill="var(--egb-paper)" stroke="var(--egb-line)" strokeDasharray="4 4" />}
            <path d="M35 280H565M300 530V30" stroke="var(--egb-line)" fill="none" />
            <text x="554" y="302" fill="var(--egb-muted)">x₀</text><text x="316" y="40" fill="var(--egb-muted)">y₀</text>
            {[-1, 1].map((sign) => <g key={sign} fill="var(--egb-muted)"><text x={300 + sign * workspace.outer * scale} y="303" textAnchor="middle">{sign * workspace.outer}</text><text x="284" y={280 - sign * workspace.outer * scale} textAnchor="end">{sign * workspace.outer}</text></g>)}
            {other && <polyline points={polyline([[0, 0], other.joint, other.end])} fill="none" stroke="var(--egb-muted)" strokeWidth="3" strokeDasharray="7 6" data-other-branch="true" />}
            <line x1="300" y1="280" x2={screen(fk.joint)[0]} y2={screen(fk.joint)[1]} stroke={focus === "t01" || focus === "t02" ? "var(--egb-point)" : "var(--egb-ink)"} strokeWidth={focus === "t01" || focus === "t02" ? 9 : 6} strokeLinecap="round" data-link="1" />
            <line x1={screen(fk.joint)[0]} y1={screen(fk.joint)[1]} x2={screen(fk.end)[0]} y2={screen(fk.end)[1]} stroke={focus === "t12" || focus === "t02" ? "var(--egb-point)" : "var(--egb-ink)"} strokeWidth={focus === "t12" || focus === "t02" ? 9 : 6} strokeLinecap="round" data-link="2" />
            {frames.map(({ name, pose, selected }) => {
              const [x, y] = screen([pose.x, pose.y]);
              const length = Math.max(1, workspace.outer * .12);
              const xp = screen(transform2(pose, [length, 0])), yp = screen(transform2(pose, [0, length]));
              return <g key={name} data-frame={name} data-highlight={selected}>
                <circle cx={x} cy={y} r={name === "E" ? 5 : 8} fill="var(--egb-paper)" stroke="var(--egb-ink)" strokeWidth="2" />
                <path d={"M" + x + " " + y + "L" + xp.join(" ")} fill="none" stroke="var(--egb-accent)" strokeWidth={selected ? 4 : 2} markerEnd={"url(#" + id + "-axis)"} />
                <path d={"M" + x + " " + y + "L" + yp.join(" ")} fill="none" stroke="var(--egb-accent)" strokeWidth={selected ? 4 : 2} strokeDasharray="4 3" markerEnd={"url(#" + id + "-axis)"} />
                <text x={xp[0] + 8} y={xp[1] - 9} fill="var(--egb-accent)">x<tspan baselineShift="sub" fontSize="12">{name}</tspan></text>
                <text x={yp[0] - 8} y={yp[1] - 10} textAnchor="end" fill="var(--egb-accent)">y<tspan baselineShift="sub" fontSize="12">{name}</tspan></text>
              </g>;
            })}
            {[{ a: [0, 0] as Point2, b: fk.joint, label: "L₁", angle: joints[0] }, { a: fk.joint, b: fk.end, label: "L₂", angle: fk.total.theta }].map((link) => <text key={link.label} x={screen([(link.a[0] + link.b[0]) / 2, (link.a[1] + link.b[1]) / 2])[0] + Math.sin(link.angle) * 18} y={screen([(link.a[0] + link.b[0]) / 2, (link.a[1] + link.b[1]) / 2])[1] + Math.cos(link.angle) * 18} fill="var(--egb-ink)" textAnchor="middle">{link.label}</text>)}
            {mode === "ik" && <g>
              <circle cx={screen(target)[0]} cy={screen(target)[1]} r="13" fill="transparent" stroke="var(--egb-point)" strokeWidth="2" role="button" tabIndex={0} aria-label="Målpunkt: piltaster flytter 0,1 enhet; Enter setter ved endepunktet" onKeyDown={(event) => {
                const offsets: Record<string, Point2> = { ArrowLeft: [-.1, 0], ArrowRight: [.1, 0], ArrowUp: [0, .1], ArrowDown: [0, -.1] };
                const offset = offsets[event.key];
                if (offset) { event.preventDefault(); update({ target: [target[0] + offset[0], target[1] + offset[1]] }); }
                if (event.key === "Enter" || event.key === " ") { event.preventDefault(); update({ target: fk.end }); }
              }} />
              <path d={"M" + (screen(target)[0] - 5) + " " + screen(target)[1] + "h10M" + screen(target)[0] + " " + (screen(target)[1] - 5) + "v10"} stroke="var(--egb-point)" pointerEvents="none" />
              <text x={screen(target)[0] + 18} y={screen(target)[1] + 26} fill="var(--egb-point)">{error < 1e-9 ? "E / mål" : "mål"}</text>
            </g>}
          </svg>
          <figcaption>Arbeidsrom: {numberTex(workspace.inner)} ≤ r ≤ {numberTex(workspace.outer)}. Samme skala på x og y. Grønne x-akser er heltrukne, y-akser stiplede. Ingen leddgrenser eller kollisjonstest.</figcaption>
        </figure>
        {mode === "fk" ? <fieldset className="egb-pilot-controls"><legend>Leddvinkler (grader i kontrollene, radianer i modellen)</legend>{[0, 1].map((joint) => <label key={joint}><span>Ledd q{joint + 1}<output>{(joints[joint] * 180 / Math.PI).toFixed(1)}°</output></span><input aria-label={"Ledd q" + (joint + 1)} type="range" min="-180" max="180" step="1" value={joints[joint] * 180 / Math.PI} onChange={(event) => { const value = Number(event.target.value) * Math.PI / 180; update({ joints: joint === 0 ? [value, joints[1]] : [joints[0], value] }); }} /></label>)}</fieldset> : <>
          <fieldset className="egb-pilot-controls"><legend>Målposisjon — dra i figuren eller bruk kontrollene</legend>{[0, 1].map((axis) => <label key={axis}><span>Mål {axis === 0 ? "x" : "y"}<output>{numberTex(target[axis])}</output></span><input aria-label={axis === 0 ? "Mål x" : "Mål y"} type="range" min={-extent + 1} max={extent - 1} step=".1" value={target[axis]} onChange={(event) => update({ target: axis === 0 ? [Number(event.target.value), target[1]] : [target[0], Number(event.target.value)] })} /></label>)}</fieldset>
          <div role="group" className="egb-pilot-stage" aria-label="IK-gren">
            <button type="button" aria-pressed={branch === "positive"} onClick={() => update({ branch: "positive" })}>q₂ ≥ 0 · albue ned</button>
            <button type="button" aria-pressed={branch === "negative"} onClick={() => update({ branch: "negative" })}>q₂ ≤ 0 · albue opp</button>
          </div>
          <p className="egb-pilot-small">Opp/ned beskriver grenene for målet (5, 7); fortegnet på q₂ er den entydige definisjonen i resten av planet.</p>
        </>}
        <fieldset className="egb-pilot-controls"><legend>Lenkelengder i samme lengdeenhet</legend>{(["l1", "l2"] as const).map((key, index) => <label key={key}><span>Lenke L{index + 1}<output>{model[key].toFixed(1)}</output></span><input aria-label={"Lenke L" + (index + 1)} type="range" min="1" max="8" step=".1" value={model[key]} onChange={(event) => update({ model: { ...model, [key]: Number(event.target.value) } })} /></label>)}</fieldset>
        <div className="egb-study-inline-links">
          <button type="button" className="egb-pilot-reset" onClick={() => { setState(seed(mode)); setFocus(null); }}>Last QUT: (5, 7)</button>
          {mode === "ik" && PLANAR2_QUT_TARGETS.slice(1).map((point, index) => <button key={index} type="button" className="egb-pilot-reset" onClick={() => update({ model: PLANAR2_QUT, target: point })}>QUT mål {index + 2}</button>)}
          <button type="button" className="egb-pilot-reset" onClick={() => update({ mode: "ik", target: [workspace.outer + 1, 0] })}>Prøv utilgjengelig mål</button>
          <button type="button" className="egb-pilot-reset" onClick={() => update({ mode: "fk", joints: [0, 0] })}>Rett arm</button>
        </div>
        <p className="egb-pilot-source">Preset: QUT Week 5 tutorial, PDF-side 17. Geometri og rammer: Corke kap. 7.1.1 og 7.2.1; Robotics Toolbox ET2/ETS2. Lengdene er ikke Dobot-dimensjoner.</p>
      </div>
    </div>
  </div>;
}
