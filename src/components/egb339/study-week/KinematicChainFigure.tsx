"use client";

import MathText from "../pilot/Egb339Math";
import { useEgb339Lang } from "@/lib/egb339-language/store";

/** Original, scale-correct reconstruction of QUT tutorial p. 9's default RPR geometry. */
export default function KinematicChainFigure() {
  const { lang } = useEgb339Lang();
  const a = [60, 240], j1 = [252, 240], j3 = [252 + 120 / Math.sqrt(2), 240 - 120 / Math.sqrt(2)];
  const end = [j3[0] + 96, j3[1]];
  return <div className="egb-week-figure-explanation">
    <figure className="egb-week-technical-figure">
      <svg viewBox="0 0 520 320" role="img" aria-labelledby="week4-chain-title week4-chain-description">
        <title id="week4-chain-title">QUTs RPR-kjede i nullstillingen</title>
        <desc id="week4-chain-description">En fast lenke på 8 mot høyre, en prismatisk lenke på 5 pluss q2 ved 45 grader, og en siste lenke på 4 mot høyre. q1 og q3 roterer ved de to knekkpunktene. Her er alle q null.</desc>
        <path d={`M${a[0]} ${a[1]}H485M${a[0]} ${a[1]}V65`} stroke="var(--egb-muted)" fill="none" />
        <path d={`M${a}L${j1}L${j3}L${end}`} stroke="var(--week-frame-a)" strokeWidth="5" fill="none" />
        <path d={`M${j3[0]} ${j3[1]}H${end[0]}`} stroke="var(--week-frame-b)" strokeWidth="5" />
        <rect x={j1[0] + 28} y={j1[1] - 48} width="40" height="14" transform={`rotate(-45 ${j1[0] + 48} ${j1[1] - 41})`} fill="var(--egb-paper)" stroke="var(--week-frame-a)" strokeWidth="2" />
        {[j1, j3].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="7" fill="var(--egb-paper)" stroke="var(--week-frame-a)" strokeWidth="2" />)}
        <circle cx={end[0]} cy={end[1]} r="5" fill="var(--week-frame-b)" />
        <text x="40" y="262">O</text><text x="488" y="246">x</text><text x="47" y="58">y</text>
        <text x="145" y="228">L₁ = 8</text><text x="252" y="274" textAnchor="middle">J₁, q₁</text>
        <text x="286" y="136" textAnchor="middle">L₂ = 5 + q₂</text><text x={j3[0]} y={j3[1] + 27} textAnchor="middle">J₃, q₃</text>
        <text x="390" y="143">L₃ = 4</text><text x={end[0] + 12} y={end[1] + 6}>E</text>
        <path d="M288 240A36 36 0 0 0 277.456 214.544" fill="none" stroke="var(--egb-muted)" />
        <text x="299" y="227">45°</text>
      </svg>
      <figcaption>Egen figur etter QUT, <cite>Tutorial – Forward Kinematics (1)</cite>, s. 9. Lengdeforhold og 45°-offset er beholdt. Dette er ikke 2R-armen i laben.</figcaption>
    </figure>
    <div><h3>{lang === "en" ? "Fixed offsets are transformations too" : "Faste offsetter er også transformasjoner"}</h3><p>{lang === "en" ? <>Start at O. Go 8 along x, rotate <MathText inline>{String.raw`q_1 + 45^\circ`}</MathText>, go <MathText inline>{String.raw`5 + q_2`}</MathText> along the new axis, rotate <MathText inline>{String.raw`q_3 - 45^\circ`}</MathText>, and go 4.</> : <>Start ved O. Gå 8 langs x, roter <MathText inline>{String.raw`q_1 + 45^\circ`}</MathText>, gå <MathText inline>{String.raw`5 + q_2`}</MathText> langs den nye aksen, roter <MathText inline>{String.raw`q_3 - 45^\circ`}</MathText>, og gå 4.</>}</p><MathText>{String.raw`{}^OT_E=T_x(8)R(q_1+\pi/4)T_x(5+q_2)R(q_3-\pi/4)T_x(4)`}</MathText><p>{lang === "en" ? <>At <MathText inline>{String.raw`q = 0`}</MathText>, <MathText inline>{String.raw`L_1`}</MathText> and <MathText inline>{String.raw`L_3`}</MathText> are parallel. The two fixed angles cancel the orientation, but not the displacement along <MathText inline>{String.raw`L_2`}</MathText>.</> : <>Ved <MathText inline>{String.raw`q = 0`}</MathText> er <MathText inline>{String.raw`L_1`}</MathText> og <MathText inline>{String.raw`L_3`}</MathText> parallelle. De to faste vinklene kansellerer orienteringen, men ikke forskyvningen langs <MathText inline>{String.raw`L_2`}</MathText>.</>}</p><p><a href="#w4-planar-chain">{lang === "en" ? "Solve the whole QUT exercise" : "Regn hele QUT-oppgaven"}</a></p></div>
  </div>;
}