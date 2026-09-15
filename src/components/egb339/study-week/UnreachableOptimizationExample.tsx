import MathText from "../pilot/Egb339Math";
import WeekOneDisclosure from "../week-one/WeekOneDisclosure";

export default function UnreachableOptimizationExample() {
  return <section className="egb-pilot-prose egb-week-worked-example">
    <h3>Når optimalisering avslutter uten å nå målet</h3>
    <p>QUTs <code>EGB339-LectureWeek5.py</code> bruker to lenker på 1 og målet (2, 1). Koden minimerer summen av kvadrerte posisjonsfeil. Før du tolker resultatet: kan armen nå målet?</p>
    <MathText>{String.raw`r=\sqrt{2^2+1^2}=\sqrt5>1+1=2`}</MathText>
    <p className="egb-week-notice" data-state="error">Utilgjengelig mål: ingen leddvinkler kan gi null posisjonsfeil i denne modellen.</p>
    <WeekOneDisclosure id="optimization-restfeil" title="Minste mulige restfeil i QUTs forelesningseksempel">
      <p>Nærmeste punkt ligger på yttergrensen, i retning mot målet. Den utstrakte armen har q₂ = 0 og q₁ = atan2(1, 2).</p>
      <MathText>{String.raw`p_{\rm closest}=\frac{2}{\sqrt5}(2,1)\approx(1.7889,0.8944)`}</MathText>
      <MathText>{String.raw`\|p_{\rm closest}-p^*\|=\sqrt5-2\approx0.2361,\qquad c_{\min}=(\sqrt5-2)^2\approx0.05573`}</MathText>
      <p>Dette er den geometriske nedre grensen, ikke en garanti for hva en bestemt kjøring av <code>fmin</code> finner. Kontroller alltid FK og restfeilen, selv om optimalisereren melder konvergens.</p>
    </WeekOneDisclosure>
    <p className="egb-pilot-source">Utledet kontroll av QUTs forelesningskode. Corke kap. 7.2.1.2 bruker til sammenligning et tilgjengelig mål (0.6, 0.7) for enhetslenker.</p>
  </section>;
}
