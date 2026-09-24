"use client";

import MathText from "../pilot/Egb339Math";
import WeekOneDisclosure from "../week-one/WeekOneDisclosure";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { tp } from "../T";

export default function UnreachableOptimizationExample() {
  const { lang } = useEgb339Lang();
  return <section className="egb-pilot-prose egb-week-worked-example">
    <h3>{lang === "en" ? "When optimization finishes without reaching the target" : "Når optimalisering avslutter uten å nå målet"}</h3>
    <p>{lang === "en" ? <>QUT's <code>EGB339-LectureWeek5.py</code> uses two links of length 1 and the target (2, 1). The code minimizes the sum of squared position errors. Before you interpret the result: can the arm reach the target?</> : <>QUTs <code>EGB339-LectureWeek5.py</code> bruker to lenker på 1 og målet (2, 1). Koden minimerer summen av kvadrerte posisjonsfeil. Før du tolker resultatet: kan armen nå målet?</>}</p>
    <MathText>{String.raw`r=\sqrt{2^2+1^2}=\sqrt5>1+1=2`}</MathText>
    <p className="egb-week-notice" data-state="error">{lang === "en" ? "Unreachable target: no joint angles can give zero position error in this model." : "Utilgjengelig mål: ingen leddvinkler kan gi null posisjonsfeil i denne modellen."}</p>
    <WeekOneDisclosure id="optimization-restfeil" title={tp(lang, { no: "Minste mulige restfeil i QUTs forelesningseksempel", en: "Smallest possible residual error in QUT's lecture example" })}>
      <p>{lang === "en" ? <>The closest point lies on the outer boundary, in the direction of the target. The fully extended arm has <MathText inline>{String.raw`q_2 = 0`}</MathText> and <MathText inline>{String.raw`q_1 = \operatorname{atan2}(1, 2)`}</MathText>.</> : <>Nærmeste punkt ligger på yttergrensen, i retning mot målet. Den utstrakte armen har <MathText inline>{String.raw`q_2 = 0`}</MathText> og <MathText inline>{String.raw`q_1 = \operatorname{atan2}(1, 2)`}</MathText>.</>}</p>
      <MathText>{String.raw`p_{\rm closest}=\frac{2}{\sqrt5}(2,1)\approx(1.7889,0.8944)`}</MathText>
      <MathText>{String.raw`\|p_{\rm closest}-p^*\|=\sqrt5-2\approx0.2361,\qquad c_{\min}=(\sqrt5-2)^2\approx0.05573`}</MathText>
      <p>{lang === "en" ? <>This is the geometric lower bound, not a guarantee of what a particular run of <code>fmin</code> finds. Always check the forward kinematics and the residual error, even if the optimizer reports convergence.</> : <>Dette er den geometriske nedre grensen, ikke en garanti for hva en bestemt kjøring av <code>fmin</code> finner. Kontroller alltid FK og restfeilen, selv om optimalisereren melder konvergens.</>}</p>
    </WeekOneDisclosure>
    <p className="egb-pilot-source">{lang === "en" ? "Derived check of QUT's lecture code. Corke ch. 7.2.1.2 by comparison uses a reachable target (0.6, 0.7) for unit links." : "Utledet kontroll av QUTs forelesningskode. Corke kap. 7.2.1.2 bruker til sammenligning et tilgjengelig mål (0.6, 0.7) for enhetslenker."}</p>
  </section>;
}