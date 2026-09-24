"use client";

import { useId, useState } from "react";
import MathText from "../pilot/Egb339Math";
import { planarVelocity } from "@/lib/egb339-week-models";
import { PLANAR2_QUT, type JointPair } from "@/lib/egb339-planar2";
import type { Point2 } from "@/lib/egb339-se2";
import { useEgb339Lang } from "@/lib/egb339-language/store";

const f = (n: number) => (Math.abs(n) < 0.00005 ? 0 : n).toFixed(4);
const vector = (v: Point2) => String.raw`\begin{bmatrix}${f(v[0])}\\${f(v[1])}\end{bmatrix}`;
export default function JacobianExample() {
  const { lang } = useEgb339Lang();
  const id = useId();
  const [straight, setStraight] = useState(false);
  const [qd, setQd] = useState<JointPair>([0.5, 0.5]);
  const q: JointPair = straight ? [0, 0] : [Math.PI / 4, Math.PI / 4];
  const state = planarVelocity(PLANAR2_QUT, q, qd);
  const project = (p: Point2): Point2 => [210 + 15 * p[0], 215 - 15 * p[1]];
  const base = project([0, 0]), elbow = project(state.joint), end = project(state.end);
  const tip = (v: Point2): Point2 => [end[0] + 8 * v[0], end[1] - 8 * v[1]];
  const arrows = [...state.contributions, state.velocity];
  const colors = ["var(--week-frame-a)", "var(--week-frame-b)", "var(--egb-ink)"];
  return <section className="egb-week-learning-block" aria-labelledby={`${id}-heading`} data-week-velocity>
    <h3 id={`${id}-heading`}>{lang === "en" ? "Each column is one joint's contribution" : "Hver kolonne er ett ledds bidrag"}</h3>
    <p>{lang === "en" ? <>Keep the robot's configuration fixed. Change the joint velocities and see which directions they can create at E. The model is QUT's <MathText inline>{String.raw`L_1 = 5,\ L_2 = 7`}</MathText>.</> : <>Hold robotens konfigurasjon fast. Endre leddhastighetene og se hvilke retninger de kan skape ved E. Modellen er QUTs <MathText inline>{String.raw`L_1 = 5,\ L_2 = 7`}</MathText>.</>}</p>
    <div className="egb-week-two-column">
      <figure className="egb-week-technical-figure">
        <svg viewBox="0 0 520 420" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>{lang === "en" ? "2R arm with the two velocity contributions and their sum" : "2R-arm med de to hastighetsbidragene og summen"}</title>
          <desc id={`${id}-desc`}>{lang === "en" ? "Blue solid arrow is J column 1 times q1 velocity. Purple dashed arrow is column 2 times q2 velocity. Thick neutral arrow is the sum. The numbers also appear next to the matrix." : "Blå heltrukket pil er J kolonne 1 ganger q1-hastighet. Lilla stiplet pil er kolonne 2 ganger q2-hastighet. Tykk nøytral pil er summen. Tallene står også ved matrisen."}</desc>
          <defs>{colors.map((color, i) => <marker key={i} id={`${id}-arrow-${i}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8Z" fill={color} /></marker>)}</defs>
          <path d={`M60 ${base[1]}H475M${base[0]} 370V28`} stroke="var(--egb-line)" fill="none" />
          <text x="480" y={base[1] + 6}>x</text><text x={base[0] - 6} y="21">y</text>
          <path d={`M${base}L${elbow}L${end}`} fill="none" stroke="var(--egb-muted)" strokeWidth="5" />
          {[base, elbow, end].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="5" fill="var(--egb-paper)" stroke="var(--egb-ink)" strokeWidth="2" />)}
          {arrows.map((v, i) => Math.hypot(...v) > 1e-9 && <path key={i} d={`M${end}L${tip(v)}`} stroke={colors[i]} strokeWidth={i === 2 ? 3 : 2} strokeDasharray={i === 1 ? "6 4" : undefined} markerEnd={`url(#${id}-arrow-${i})`} />)}
          <text x={base[0] - 20} y={base[1] + 23}>O</text><text x={end[0] + 10} y={end[1] - 10}>E</text>
          <text x="40" y="394">Arm: 15 px/m. Alle hastighetspiler: 8 px/(m/s).</text>
        </svg>
        <figcaption>{lang === "en" ? "Own diagram version of QUT Week 6 pp. 4 and 10 and Corke figure 8.1. The arrows show instantaneous velocity, not where the arm ends up after one second." : "Egen diagramversjon av QUT Week 6 s. 4 og 10 og Corke figur 8.1. Pilene viser øyeblikkelig hastighet, ikke hvor armen ender etter ett sekund."}</figcaption>
      </figure>
      <div className="egb-week-explorer-controls">
        <div className="egb-week-control-row"><button type="button" className="egb-week-button" aria-pressed={!straight} onClick={() => setStraight(false)}>QUT: 45°, 45°</button><button type="button" className="egb-week-button" aria-pressed={straight} onClick={() => setStraight(true)}>{lang === "en" ? "Straight arm: 0°, 0°" : "Rett arm: 0°, 0°"}</button></div>
        {[0, 1].map(i => <label key={i} className={i === 0 ? "egb-week-frame-a" : "egb-week-frame-b"}>{lang === "en" ? "Joint" : "Ledd"} {i + 1}: {qd[i].toFixed(2)} rad/s<input type="range" min="-1" max="1" step="0.05" value={qd[i]} aria-label={lang === "en" ? `Joint velocity q${i + 1} in radians per second` : `Leddhastighet q${i + 1} i radianer per sekund`} onChange={e => setQd(i === 0 ? [Number(e.target.value), qd[1]] : [qd[0], Number(e.target.value)])} /></label>)}
        <div className="egb-week-control-row"><button type="button" className="egb-week-button" onClick={() => setQd([0.5, 0])}>{lang === "en" ? "Only joint 1" : "Bare ledd 1"}</button><button type="button" className="egb-week-button" onClick={() => setQd([0, 0.5])}>{lang === "en" ? "Only joint 2" : "Bare ledd 2"}</button><button type="button" className="egb-week-button" onClick={() => { setQd([0.5, 0.5]); setStraight(false); }}>Reset</button></div>
        <MathText>{String.raw`J=\begin{bmatrix}${f(state.columns[0][0])}&${f(state.columns[1][0])}\\${f(state.columns[0][1])}&${f(state.columns[1][1])}\end{bmatrix}`}</MathText>
        <p className="egb-week-frame-a">{lang === "en" ? <>Blue, solid: column 1 × <MathText inline>{String.raw`\dot{q}_1`}</MathText></> : <>Blå, heltrukket: kolonne 1 × <MathText inline>{String.raw`\dot{q}_1`}</MathText></>}</p><MathText>{vector(state.contributions[0])}</MathText>
        <p className="egb-week-frame-b">{lang === "en" ? <>Purple, dashed: column 2 × <MathText inline>{String.raw`\dot{q}_2`}</MathText></> : <>Lilla, stiplet: kolonne 2 × <MathText inline>{String.raw`\dot{q}_2`}</MathText></>}</p><MathText>{vector(state.contributions[1])}</MathText>
        <div role="status" aria-live="polite" aria-atomic="true"><p>{lang === "en" ? <>Sum <MathText inline>{String.raw`\dot{p}`}</MathText> = ({f(state.velocity[0])}, {f(state.velocity[1])}) m/s. Angular velocity <MathText inline>{String.raw`\omega`}</MathText> = {f(state.omega)} rad/s.</> : <>Sum <MathText inline>{String.raw`\dot{p}`}</MathText> = ({f(state.velocity[0])}, {f(state.velocity[1])}) m/s. Vinkelhastighet <MathText inline>{String.raw`\omega`}</MathText> = {f(state.omega)} rad/s.</>}</p><p className="egb-week-notice" data-state={straight ? "warning" : "info"}>{straight ? (lang === "en" ? "Singular position Jacobian: both columns point along y. No instantaneous x velocity can be created." : "Singulær posisjons-Jacobian: begge kolonner peker langs y. Ingen øyeblikkelig x-hastighet kan skapes.") : (lang === "en" ? "Non-singular position Jacobian: the two columns span the plane." : "Ikke-singulær posisjons-Jacobian: de to kolonnene spenner ut planet.")}</p></div>
      </div>
    </div>
    <p className="egb-pilot-source">{lang === "en" ? <>World-frame position Jacobian, checked against Robotics Toolbox ETS2.jacob0. The full planar geometric Jacobian also has the angular row [1, 1]. <a href="#w6-differential-motion">The QUT exercise with intermediate steps and corrected answer deviations</a>.</> : <>World-frame posisjons-Jacobian, kontrollert mot Robotics Toolbox ETS2.jacob0. Den fulle plane geometriske Jacobianen har også vinkelraden [1, 1]. <a href="#w6-differential-motion">QUT-oppgaven med mellomregninger og korrigerte fasitavvik</a>.</>}</p>
  </section>;
}
