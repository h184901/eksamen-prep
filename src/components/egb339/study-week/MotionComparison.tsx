"use client";

import { useId, useState } from "react";
import { week7Path } from "@/lib/egb339-week-models";
import type { Point2 } from "@/lib/egb339-se2";
import MathText from "../pilot/Egb339Math";
import { useEgb339Lang } from "@/lib/egb339-language/store";

const samples = Array.from({ length: 101 }, (_, i) => week7Path(i / 100));
const f = (n: number) => (Math.abs(n) < 0.00005 ? 0 : n).toFixed(4);
export default function MotionComparison() {
  const { lang } = useEgb339Lang();
  const id = useId();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"both" | "joint" | "cartesian">("both");
  const current = week7Path(step / 4);
  // Equal x/y scale; the cropped window is stated rather than implying the robot workspace.
  const project = (p: Point2): Point2 => [100 + (p[0] - 0.5) * 400, 230 - 400 * p[1]];
  return <section className="egb-week-learning-block" aria-labelledby={`${id}-heading`} data-week-motion>
    <h3 id={`${id}-heading`}>{lang === "en" ? "Same endpoints, two different paths" : "Samme endepunkter, to forskjellige baner"}</h3>
    <p>{lang === "en" ? <>QUT pp. 5 and 7: <MathText inline>{String.raw`L_1 = 2,\ L_2 = 1.5`}</MathText>, start (0.75, 0.5), goal (0.75, −0.5). Both methods use the positive IK branch. We examine the position path, not a time profile.</> : <>QUT s. 5 og 7: <MathText inline>{String.raw`L_1 = 2,\ L_2 = 1.5`}</MathText>, start (0.75, 0.5), mål (0.75, −0.5). Begge metodene bruker den positive IK-grenen. Vi undersøker posisjonsbanen, ikke en tidsprofil.</>}</p>
    <div className="egb-week-two-column">
      <figure className="egb-week-technical-figure">
        <svg viewBox="0 0 500 490" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>{lang === "en" ? "Cartesian interpolation is straight, joint interpolation bends to the right" : "Kartesisk interpolasjon er rett, leddinterpolasjon bøyer ut mot høyre"}</title>
          <desc id={`${id}-desc`}>{lang === "en" ? "A coordinate window with equal scale on both axes. Five circles show Cartesian samples, and five squares show joint-interpolated samples. The selected point is enlarged." : "Et koordinatutsnitt med lik målestokk på begge akser. Fem sirkler viser kartesiske samples, og fem kvadrater viser leddinterpolerte samples. Valgt punkt er forstørret."}</desc>
          {[0.5, 0.75, 1].map(x => <g key={x}><path d={`M${project([x, 0])[0]} 24V434`} stroke="var(--egb-line)" /><text x={project([x, 0])[0]} y="458" textAnchor="middle">{x}</text></g>)}
          {[-0.5, 0, 0.5].map(y => <g key={y}><path d={`M80 ${project([0, y])[1]}H330`} stroke="var(--egb-line)" /><text x="65" y={project([0, y])[1] + 5} textAnchor="end">{y}</text></g>)}
          <text x="350" y="458">x</text><text x="50" y="22">y</text>
          {mode !== "joint" && <path d={`M${project([0.75, 0.5])}L${project([0.75, -0.5])}`} stroke="var(--week-frame-a)" strokeWidth="3" strokeDasharray="7 5" />}
          {mode !== "cartesian" && <polyline points={samples.map(s => project(s.joint).join(",")).join(" ")} stroke="var(--week-frame-b)" strokeWidth="3" fill="none" />}
          {[0, 1, 2, 3, 4].map(i => {
            const p = week7Path(i / 4), c = project(p.cartesian), j = project(p.joint);
            return <g key={i}>{mode !== "joint" && <circle cx={c[0]} cy={c[1]} r={i === step ? 8 : 4} fill="var(--egb-paper)" stroke="var(--week-frame-a)" strokeWidth="2" />}{mode !== "cartesian" && <rect x={j[0] - (i === step ? 6 : 3)} y={j[1] - (i === step ? 6 : 3)} width={i === step ? 12 : 6} height={i === step ? 12 : 6} fill="var(--week-frame-b)" />}</g>;
          })}
          <text x="215" y="22">Start</text><text x="215" y="435">Mål</text>
        </svg>
        <figcaption>{lang === "en" ? "Own computed figure after QUT's five samples. Blue dashed/circle = Cartesian. Purple solid/square = joint. Cropped window, not the full workspace; 400 px per length unit on both axes." : "Egen beregnet figur etter QUTs fem samples. Blå stiplet/sirkel = kartesisk. Lilla heltrukket/kvadrat = ledd. Utsnitt, ikke fullt arbeidsrom; 400 px per lengdeenhet på begge akser."}</figcaption>
      </figure>
      <div className="egb-week-explorer-controls">
        <div className="egb-week-control-row">{([['both', 'Sammenlign', 'Compare'], ['cartesian', 'Kartesisk', 'Cartesian'], ['joint', 'Ledd', 'Joint']] as const).map(([value, no, en]) => <button key={value} type="button" className="egb-week-button" aria-pressed={mode === value} onClick={() => setMode(value)}>{lang === "en" ? en : no}</button>)}</div>
        <label>{lang === "en" ? `QUT sample ${step + 1} of 5` : `QUT-sample ${step + 1} av 5`}<input type="range" min="0" max="4" step="1" value={step} aria-label={lang === "en" ? "Choose one of five QUT points" : "Velg ett av fem QUT-punkter"} onChange={e => setStep(Number(e.target.value))} /></label>
        <MathText>{String.raw`\alpha=\frac{i}{n-1}=\frac{${step}}{4}=${step / 4}`}</MathText>
        <p className="egb-week-frame-a">{lang === "en" ? "Cartesian: interpolate p, then solve IK." : "Kartesisk: interpoler p, løs så IK."}</p>
        <MathText>{String.raw`p_i=\begin{bmatrix}0.75\\0.5\end{bmatrix}+${step / 4}\begin{bmatrix}0\\-1\end{bmatrix}=\begin{bmatrix}${f(current.cartesian[0])}\\${f(current.cartesian[1])}\end{bmatrix}`}</MathText>
        <p className="egb-week-frame-b">{lang === "en" ? "Joint: interpolate q, then compute FK." : "Ledd: interpoler q, beregn så FK."}</p>
        <MathText>{String.raw`q_i=\begin{bmatrix}${f(current.jointQ[0])}\\${f(current.jointQ[1])}\end{bmatrix},\quad FK(q_i)=\begin{bmatrix}${f(current.joint[0])}\\${f(current.joint[1])}\end{bmatrix}`}</MathText>
        <p role="status" aria-live="polite">{lang === "en" ? `At sample ${step + 1} the distance between the methods is ${f(Math.hypot(current.joint[0] - current.cartesian[0], current.joint[1] - current.cartesian[1]))} length units.` : `Ved sample ${step + 1} er avstanden mellom metodene ${f(Math.hypot(current.joint[0] - current.cartesian[0], current.joint[1] - current.cartesian[1]))} lengdeenheter.`}</p>
        <button type="button" className="egb-week-button" onClick={() => { setStep(0); setMode("both"); }}>Reset</button>
      </div>
    </div>
    <p className="egb-week-notice" data-state="warning">{lang === "en" ? "A straight end-effector path does not mean all links clear the obstacles. Check each link through the motion." : "Rett endeeffektor-bane betyr ikke at alle lenkene går klar av hindringer. Kontroller hver lenke gjennom bevegelsen."}</p>
    <p className="egb-pilot-source">{lang === "en" ? <>QUT Week 7 tutorial and answer key. The existing FK/IK engine is used directly. RTB <code>jtraj</code> uses a fifth-degree polynomial profile and is therefore not a direct replacement for the tutorial's linear interpolation.</> : <>QUT Week 7 tutorial og fasit. Eksisterende FK/IK-motor brukes direkte. RTB <code>jtraj</code> bruker en femtegradspolynomprofil og er derfor ikke en direkte erstatning for tutorialens lineære interpolasjon.</>}</p>
  </section>;
}
