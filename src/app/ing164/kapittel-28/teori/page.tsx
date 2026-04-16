"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { LongWireFieldVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teori — Kilder til magnetfelt</h2>

      {/* 28.1 Magnetfelt til en ladning i bevegelse */}
      <TheorySummary
        title="28.1 Magnetfelt til en ladning i bevegelse"
        mustKnow={[
          "En ladet partikkel i bevegelse skaper et magnetfelt rundt seg",
          "Feltstyrken avhenger av ladning, fart, avstand og vinkel",
          "B = (μ₀/4π) · |q|v sin φ / r²",
          "Feltlinjene er sirkler rundt fartsvektoren (høyrehåndsregelen)",
          "μ₀ = 4π × 10⁻⁷ T·m/A (permeabiliteten i vakuum)",
        ]}
        defaultOpen
      >
        <p>
          I kapittel 27 så vi at et magnetfelt virker en <em>kraft</em> på en ladet partikkel i bevegelse.
          Nå snur vi perspektivet: <strong>en ladet partikkel i bevegelse er selv en kilde til magnetfelt</strong>.
        </p>

        <p className="mt-3">
          Eksperimenter viser at en ladning <InlineLatex latex="q" /> som beveger seg med konstant fart{" "}
          <InlineLatex latex="\vec{v}" /> skaper et magnetfelt <InlineLatex latex="\vec{B}" /> i rommet
          rundt seg. Feltet har størrelse:
        </p>

        <FormulaBox
          latex="B = \frac{\mu_0}{4\pi} \cdot \frac{|q|v\sin\varphi}{r^2}"
          title="B-felt fra ladning i bevegelse"
          variant="gold"
          description="φ er vinkelen mellom v og retningsvektoren r̂ (fra ladningen til punktet). r er avstanden."
        />

        <p className="mt-3">På vektorform:</p>
        <FormulaBox
          latex="\vec{B} = \frac{\mu_0}{4\pi} \cdot \frac{q\vec{v} \times \hat{r}}{r^2}"
          title="B-felt (vektorform)"
          variant="gold"
          description="Kryssproduktet v × r̂ gir retning vinkelrett på både v og r̂. Retning: høyrehåndsregelen."
        />

        <p className="mt-3">
          Her er <InlineLatex latex="\mu_0 = 4\pi \times 10^{-7}\;\text{T·m/A}" /> <strong>permeabiliteten i vakuum</strong> —
          magnetismens svar på <InlineLatex latex="\varepsilon_0" /> i elektrostatikk.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor avtar feltet som 1/r²?</p>
          <p className="text-sm">
            Akkurat som Coulombs lov — feltet fra en punktkilde spres utover over en kule med areal{" "}
            <InlineLatex latex="4\pi r^2" />. Jo lengre unna, jo større kule feltet fordeles på, og
            jo svakere blir det. Det magnetiske feltet fra en <em>enkelt ladning</em> følger nøyaktig
            det samme geometriske argumentet. (Merk at dette er annerledes for en lang rett leder —
            se seksjon 28.3.)
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng: Elektrisk vs. magnetisk felt fra en punktladning</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-1 pr-4">Elektrisk (kap 21)</th>
                  <th className="text-left py-1">Magnetisk (kap 28)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4"><InlineLatex latex="E = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}" /></td>
                  <td className="py-1"><InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4">Avhenger av q og r</td>
                  <td className="py-1">Avhenger av q, v, r og vinkel φ</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4">Radialt felt (utover/innover)</td>
                  <td className="py-1">Sirkulært felt (rundt v-retning)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Viktige spesialtilfeller</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>φ = 90°</strong> (vinkelrett på v): B er <em>maksimal</em></li>
            <li>• <strong>φ = 0° eller 180°</strong> (langs v): B = 0 — <em>ingen felt foran eller bak ladningen</em></li>
            <li>• Feltet avtar som <InlineLatex latex="1/r^2" />, akkurat som Coulombs lov</li>
          </ul>
        </div>
      </TheorySummary>

      {/* 28.2 Biot-Savarts lov */}
      <TheorySummary
        title="28.2 Magnetfelt fra et strømelement — Biot-Savarts lov"
        mustKnow={[
          "Strøm = mange ladninger i bevegelse → lederen lager magnetfelt",
          "Biot-Savarts lov: dB = (μ₀/4π) · I dl sin φ / r²",
          "Totalt felt: integrer (summer) bidragene fra hele lederen",
          "Retning: dl × r̂ (høyrehåndsregelen)",
          "Biot-Savart gjelder for ENHVER strømfordeling, ikke bare rette ledere",
        ]}
      >
        <p>
          I en strømførende leder er det ladninger i bevegelse. Derfor skaper lederen et magnetfelt rundt seg.
          Vi deler lederen inn i små elementer med lengde <InlineLatex latex="d\vec{l}" />.
        </p>

        <p className="mt-3">
          Hvert element bidrar med et lite felt <InlineLatex latex="d\vec{B}" />. Total ladning i elementet
          er <InlineLatex latex="dQ = nqA\,dl" /> (n = ladningskonsentrasjon, A = tverrsnitt). Siden{" "}
          <InlineLatex latex="nqv_dA = I" />, får vi:
        </p>

        <FormulaBox
          latex="dB = \frac{\mu_0}{4\pi} \cdot \frac{I\,dl\,\sin\varphi}{r^2}"
          title="Biot-Savarts lov (størrelse)"
          variant="gold"
          description="dl = lengde av strømelementet, r = avstand til punktet, φ = vinkel mellom dl og r̂."
        />

        <FormulaBox
          latex="d\vec{B} = \frac{\mu_0}{4\pi} \cdot \frac{I\,d\vec{l} \times \hat{r}}{r^2}"
          title="Biot-Savarts lov (vektorform)"
          variant="gold"
          description="Retningen gis av kryssproduktet dl × r̂. Dette er den fundamentale loven for B fra strøm."
        />

        <p className="mt-3">For å finne det totale magnetfeltet fra hele lederen, integrerer vi over alle elementer:</p>
        <FormulaBox
          latex="\vec{B} = \frac{\mu_0}{4\pi} \int \frac{I\,d\vec{l} \times \hat{r}}{r^2}"
          title="Totalt B-felt fra en leder"
          variant="blue"
          description="Integrasjonen summerer bidragene fra alle strømelementer langs lederen."
        />

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Matematikk-sjekk: Utlede B = μ₀I/(2πr) for en lang rett leder</p>
          <p className="text-sm">
            La lederen ligge langs y-aksen, og vi vil finne B i avstand <InlineLatex latex="r" /> fra
            lederen. Et strømelement <InlineLatex latex="d\vec{l} = dy\,\hat{y}" /> har avstand{" "}
            <InlineLatex latex="R = \sqrt{r^2+y^2}" /> til punktet, og vinkelen mellom{" "}
            <InlineLatex latex="d\vec{l}" /> og <InlineLatex latex="\hat{R}" /> gir{" "}
            <InlineLatex latex="\sin\varphi = r/\sqrt{r^2+y^2}" />. Fra Biot-Savart:
          </p>
          <p className="text-sm mt-2 text-center">
            <InlineLatex latex="B = \frac{\mu_0 I}{4\pi}\int_{-\infty}^{\infty}\frac{\sin\varphi\,dy}{R^2} = \frac{\mu_0 I}{4\pi}\int_{-\infty}^{\infty}\frac{r\,dy}{(r^2+y^2)^{3/2}}" />
          </p>
          <p className="text-sm mt-2">
            Standardintegralet gir <InlineLatex latex="\int_{-\infty}^{\infty}\frac{dy}{(r^2+y^2)^{3/2}} = 2/r^2" />, og vi får:
          </p>
          <p className="text-sm mt-2 text-center">
            <InlineLatex latex="B = \frac{\mu_0 I}{4\pi}\cdot r \cdot \frac{2}{r^2} = \frac{\mu_0 I}{2\pi r}" />
          </p>
          <p className="text-sm mt-2">
            <strong>Solenoid</strong> (fra Ampère): summen av N viklinger i lengde <InlineLatex latex="\ell" /> gir{" "}
            <InlineLatex latex="\oint \vec{B}\cdot d\vec{l} = B\ell = \mu_0 N I" />, altså{" "}
            <InlineLatex latex="B = \mu_0(N/\ell)I = \mu_0 n I" />.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Felle-varsel: Avstanden r i Biot-Savart</p>
          <p className="text-sm">
            <InlineLatex latex="r" /> er avstanden <strong>FRA strømelementet dl TIL observasjonspunktet</strong>,
            IKKE fra koordinatsystemets origo eller fra noe annet. Dette betyr at for en utstrakt leder
            er <InlineLatex latex="r" /> forskjellig for hvert element — du må uttrykke r som en funksjon
            av integrasjonsvariabelen (f.eks. <InlineLatex latex="r = \sqrt{x^2+y^2}" />) før du integrerer.
            Likeledes: <InlineLatex latex="\hat{r}" /> peker FRA elementet dl TIL punktet.
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 400 240" className="w-full max-w-md">
            <defs>
              <marker id="arrowBlueK28" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
              </marker>
              <marker id="arrowAmberK28" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
              </marker>
            </defs>
            {/* Conductor (vertical) */}
            <line x1="200" y1="20" x2="200" y2="220" stroke="#f59e0b" strokeWidth="5" />
            {/* Current arrow up */}
            <line x1="200" y1="210" x2="200" y2="30" stroke="#f59e0b" strokeWidth="5" markerEnd="url(#arrowAmberK28)" />
            <text x="210" y="30" fontSize="13" fill="#f59e0b" fontWeight="bold">I</text>
            {/* B-field circles around wire */}
            <ellipse cx="200" cy="70" rx="50" ry="12" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <ellipse cx="200" cy="120" rx="75" ry="16" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <ellipse cx="200" cy="170" rx="50" ry="12" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Arrow heads on the front (B direction: counterclockwise seen from above since I points up) */}
            <polygon points="250,120 242,115 242,125" fill="#3b82f6" />
            <polygon points="125,120 133,115 133,125" fill="#3b82f6" transform="rotate(180 129 120)" />
            <polygon points="250,70 243,66 243,74" fill="#3b82f6" />
            <polygon points="250,170 243,166 243,174" fill="#3b82f6" />
            {/* Labels */}
            <text x="260" y="125" fontSize="12" fill="#3b82f6" fontWeight="bold">B</text>
            <text x="20" y="30" fontSize="11" fill="currentColor">Høyrehåndsregel:</text>
            <text x="20" y="45" fontSize="11" fill="currentColor">tommel = I,</text>
            <text x="20" y="60" fontSize="11" fill="currentColor">fingre = B</text>
            {/* r-distance indicator */}
            <line x1="200" y1="120" x2="275" y2="120" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
            <text x="230" y="115" fontSize="11" fill="#8b5cf6">r</text>
          </svg>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: Biot-Savart er magnetismens Coulomb-lov</p>
          <p className="text-sm">
            Coulombs lov forteller oss E-feltet fra én enkelt punktladning. Vi kan deretter summere
            bidragene fra alle ladninger for å finne feltet fra en vilkårlig ladningsfordeling.
            Biot-Savarts lov gjør nøyaktig det samme for magnetfelt: den gir bidraget fra ett lite
            strømelement, og vi summerer (integrerer) over hele strømfordelingen for å finne totalt felt.
            Det er den fundamentale "byggeklossen" for magnetfelt fra strøm.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2">
            <li>
              <strong>Feil:</strong> "B-feltet fra en leder peker utover fra lederen, som E-feltet fra en linjeladning."
              <br />
              <strong>Riktig:</strong> B-feltet danner konsentriske <em>sirkler</em> rundt lederen — det peker ikke
              radialt ut, men tangentielt rundt. Bruk høyrehåndsregelen: tommel langs strøm, fingre krummer i B-retning.
            </li>
            <li>
              <strong>Feil:</strong> "Biot-Savart fungerer bare for rette ledere."
              <br />
              <strong>Riktig:</strong> Biot-Savart gjelder for <em>enhver</em> strømfordeling — rette ledere,
              sirkulære løkker, spoler, vilkårlige former. Det er den generelle loven.
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Slik bruker du Biot-Savarts lov</p>
          <ol className="text-sm space-y-1">
            <li>1. Identifiser strømelementet <InlineLatex latex="d\vec{l}" /> og retningen</li>
            <li>2. Finn avstanden <InlineLatex latex="r" /> og retningsvektoren <InlineLatex latex="\hat{r}" /> til punktet</li>
            <li>3. Finn vinkelen <InlineLatex latex="\varphi" /> mellom <InlineLatex latex="d\vec{l}" /> og <InlineLatex latex="\hat{r}" /></li>
            <li>4. Regn ut <InlineLatex latex="dB" /> og bestem retningen med høyrehåndsregelen</li>
            <li>5. Integrer for å finne totalt felt</li>
          </ol>
        </div>
      </TheorySummary>

      {/* 28.3 Magnetfelt fra vanlige geometrier */}
      <TheorySummary
        title="28.3 Magnetfelt fra vanlige geometrier"
        mustKnow={[
          "Lang rett leder: B = μ₀I / (2πr) — avtar som 1/r",
          "Senter av sirkulær løkke: B = μ₀I / (2R)",
          "På aksen til løkke i avstand x: B = μ₀IR² / [2(R²+x²)^(3/2)]",
          "Feltlinjene rundt rett leder er konsentriske sirkler",
          "Høyrehåndsregelen gjelder for alle geometrier",
        ]}
      >
        <p>
          Ved å bruke Biot-Savarts lov på ulike geometrier finner vi en rekke nyttige resultater.
          Disse må du kunne — enten utlede eller bruke direkte.
        </p>

        <h3 className="font-semibold mt-4 mb-2">Rett leder</h3>

        <p>
          For en rett leder med lengde <InlineLatex latex="2a" /> finner vi feltet i avstand{" "}
          <InlineLatex latex="x" /> fra midten:
        </p>

        <FormulaBox
          latex="B = \frac{\mu_0 I}{4\pi} \cdot \frac{2a}{x\sqrt{x^2 + a^2}}"
          title="Endelig rett leder"
          variant="blue"
          description="a = halve lengden av lederen, x = vinkelrett avstand fra lederen."
        />

        <p className="mt-3">
          For en <strong>uendelig lang</strong> leder (<InlineLatex latex="a \gg x" />) forenkles dette til:
        </p>

        <FormulaBox
          latex="B = \frac{\mu_0 I}{2\pi r}"
          title="Uendelig lang rett leder"
          variant="gold"
          description="r = vinkelrett avstand fra lederen. Dette er formelen du bruker mest!"
        />

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: 1/r-avhengighet</p>
          <p className="text-sm">
            For den lange rette lederen avtar B som <InlineLatex latex="1/r" />, <em>ikke</em>{" "}
            <InlineLatex latex="1/r^2" />. Dette er fordi vi summerer bidragene fra <em>uendelig mange</em>{" "}
            strømelementer langs lederen. Sammenlign med E-feltet fra en uendelig lang linjeladning:{" "}
            <InlineLatex latex="E = \lambda/(2\pi\varepsilon_0 r)" /> — nøyaktig samme <InlineLatex latex="1/r" />-avhengighet
            av den geometriske årsaken! Husk dette resultatet — du <em>må</em> kunne det.
          </p>
        </div>

        {/* Inline visualization: B-felt rundt lang rett leder */}
        <LongWireFieldVisualizer />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Høyrehåndsregelen for rett leder</p>
          <ol className="text-sm space-y-1">
            <li>1. Pek <strong>tommelen</strong> i strømretningen I</li>
            <li>2. <strong>Fingrene krummer</strong> i retningen til B-feltlinjene</li>
            <li>3. Feltlinjene er <strong>konsentriske sirkler</strong> rundt lederen</li>
          </ol>
        </div>

        <h3 className="font-semibold mt-5 mb-2">Sirkulær strømsløyfe</h3>

        <p>
          I sentrum av en sirkulær løkke med radius <InlineLatex latex="R" /> og strøm <InlineLatex latex="I" />
          peker alle strømelementene vinkelrett på radiusvektoren (<InlineLatex latex="\sin\varphi = 1" /> for alle).
          Alle bidragene peker i samme retning, så feltet i sentrum er:
        </p>

        <FormulaBox
          latex="B = \frac{\mu_0 I}{2R}"
          title="B-felt i sentrum av sirkulær løkke"
          variant="gold"
          description="R = radius på løkken. Feltet peker langs aksen til løkken (høyrehåndsregelen)."
        />

        <p className="mt-3">
          På aksen til løkken i avstand <InlineLatex latex="x" /> fra sentrum:
        </p>

        <FormulaBox
          latex="B = \frac{\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}"
          title="B-felt på aksen til sirkulær løkke"
          variant="blue"
          description="For x = 0 gir dette B = μ₀I/(2R) som forventet. For x ≫ R avtar feltet som 1/x³."
        />

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: Retning for løkker</p>
          <p className="text-sm">
            For en sirkulær løkke bruker du høyrehåndsregelen slik: la fingrene krumme i retningen strømmen
            flyter rundt løkken. Da peker tommelen i retningen B-feltet har langs aksen. For en spole med
            N viklinger multipliserer du bare med N:{" "}
            <InlineLatex latex="B = \mu_0 N I / (2R)" /> i sentrum.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Felle-varsel: B-feltet er sirkler, IKKE stråler</p>
          <p className="text-sm">
            Rundt en lang rett leder danner B-feltet <strong>konsentriske sirkler</strong> i plan vinkelrett
            på lederen — akkurat som ringer i vann rundt en dråpe. B-feltet peker IKKE radialt utover som
            E-feltet fra en linjeladning. Dette er en av de mest vanlige feilene på eksamen. Sett inn{" "}
            <InlineLatex latex="\vec{B}" /> som en tangent til sirkelen (ikke en radial stråle) når du
            tegner kraftbilder.
          </p>
        </div>

        <h3 className="font-semibold mt-5 mb-2">Solenoid (lang, tett viklet spole)</h3>

        <p>
          En solenoid er mange sirkulære løkker i rekke. For en lang solenoid med <InlineLatex latex="n = N/\ell" />
          {" "}viklinger per meter er feltet inni nesten uniformt:
        </p>

        <FormulaBox
          latex="B = \mu_0 n I"
          title="B-felt inni lang solenoid"
          variant="gold"
          description="n = viklinger per meter. B ≈ 0 utenfor. Uniformt og parallelt med aksen inni."
        />

        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 400 240" className="w-full max-w-md">
            <defs>
              <marker id="arrowBlueSolenoid" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
              </marker>
            </defs>
            {/* Solenoid cross-section: top row (dots = current out), bottom row (x = current in) */}
            <rect x="50" y="70" width="300" height="100" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
            {/* Top: current coming out (dots) */}
            {[70, 100, 130, 160, 190, 220, 250, 280, 310, 340].map((x, i) => (
              <g key={`top-${i}`}>
                <circle cx={x} cy="70" r="8" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx={x} cy="70" r="2.5" fill="#f59e0b" />
              </g>
            ))}
            {/* Bottom: current going in (x) */}
            {[70, 100, 130, 160, 190, 220, 250, 280, 310, 340].map((x, i) => (
              <g key={`bot-${i}`}>
                <circle cx={x} cy="170" r="8" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1={x - 5} y1="165" x2={x + 5} y2="175" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1={x - 5} y1="175" x2={x + 5} y2="165" stroke="#f59e0b" strokeWidth="1.5" />
              </g>
            ))}
            {/* B-field lines inside (uniform, to the right) */}
            <line x1="65" y1="100" x2="345" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlueSolenoid)" />
            <line x1="65" y1="120" x2="345" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlueSolenoid)" />
            <line x1="65" y1="140" x2="345" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlueSolenoid)" />
            <text x="170" y="130" fontSize="13" fill="#3b82f6" fontWeight="bold">B = μ₀nI (uniform)</text>
            {/* Outside label */}
            <text x="20" y="30" fontSize="12" fill="currentColor">Solenoid-snitt:</text>
            <text x="20" y="47" fontSize="11" fill="#f59e0b">⊙ = strøm ut</text>
            <text x="20" y="62" fontSize="11" fill="#f59e0b">⊗ = strøm inn</text>
            <text x="155" y="210" fontSize="11" fill="currentColor">B ≈ 0 utenfor, uniformt inni</text>
          </svg>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Kjennetegn i oppgaveteksten — kapittel 28</p>
          <ul className="text-sm space-y-1">
            <li>• &quot;<strong>lang rett leder</strong>&quot; eller &quot;<strong>strøm gjennom en leder</strong>&quot; → <InlineLatex latex="B = \mu_0 I/(2\pi r)" /></li>
            <li>• &quot;<strong>avstand r fra leder</strong>&quot; → bruk <InlineLatex latex="1/r" />-formelen</li>
            <li>• &quot;<strong>solenoid</strong>&quot; eller &quot;<strong>spole med n viklinger per meter</strong>&quot; → <InlineLatex latex="B = \mu_0 n I" /></li>
            <li>• &quot;<strong>sirkulær spole</strong>&quot; eller &quot;<strong>strømsløyfe med radius R</strong>&quot; → <InlineLatex latex="B = \mu_0 I/(2R)" /> i sentrum</li>
            <li>• &quot;<strong>to parallelle ledere</strong>&quot; → <InlineLatex latex="F/L = \mu_0 I I'/(2\pi d)" /> (seksjon 28.4)</li>
          </ul>
        </div>
      </TheorySummary>

      {/* 28.4 Krefter mellom parallelle ledere */}
      <TheorySummary
        title="28.4 Krefter mellom parallelle ledere"
        mustKnow={[
          "Kraft per lengdeenhet: F/L = μ₀II′ / (2πd)",
          "Samme strømretning → tiltrekkende kraft",
          "Motsatt strømretning → frastøtende kraft",
          "Definisjonen av Ampere er basert på denne kraften",
        ]}
      >
        <p>
          To parallelle strømførende ledere påvirker hverandre magnetisk. Den ene lederen skaper et
          B-felt, og den andre lederen (med strøm i B-feltet) opplever en kraft.
        </p>

        <p className="mt-3">
          Leder 1 med strøm <InlineLatex latex="I" /> lager et felt{" "}
          <InlineLatex latex="B = \mu_0 I / (2\pi d)" /> ved leder 2.
          Kraften på leder 2 (med strøm <InlineLatex latex="I'" /> og lengde <InlineLatex latex="L" />) blir:
        </p>

        <FormulaBox
          latex="\frac{F_m}{L} = \frac{\mu_0 I I'}{2\pi d}"
          title="Kraft per lengdeenhet mellom parallelle ledere"
          variant="gold"
          description="d = avstand mellom lederne, I og I' = strømmene. Tiltrekkende for lik strømretning."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor tiltrekker parallelle strømmer hverandre?</p>
          <p className="text-sm">
            Leder 1 skaper et B-felt ved leder 2. Retningen (høyrehåndsregelen) er slik at B-feltet
            ved leder 2 peker inn mot siden der leder 1 er. Kraften på leder 2 er{" "}
            <InlineLatex latex="\vec{F} = I' L\hat{l} \times \vec{B}" />, og kryssproduktet gir
            en kraft som peker <em>mot</em> leder 1 — altså tiltrekning.
            For motsatt strøm snur B-retningen, og kraften blir frastøtning.
            Dette er faktisk hvordan <strong>Ampere</strong> opprinnelig ble definert!
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: vannslanger</p>
          <p className="text-sm">
            Tenk deg to vannslanger som ligger parallelt. Når vann strømmer i <em>samme retning</em> i begge,
            vil slangene trekkes mot hverandre (akkurat som parallelle strømmer). Hvis vannet strømmer
            i <em>motsatt retning</em>, skyver slangene hverandre fra hverandre. Det er litt
            kontraintuitivt, men magnetisk interaksjon bekrefter dette prinsippet.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng: Definisjonen av Ampere</p>
          <p className="text-sm">
            To uendelig lange parallelle ledere med 1 meters avstand, som fører lik strøm,
            definerer <strong>1 Ampere</strong> når den magnetiske kraften per lengdeenhet er
            nøyaktig <InlineLatex latex="F_m/L = 2 \times 10^{-7}\;\text{N/m}" />.
            Fra dette følger: <InlineLatex latex="1\;\text{C} = 1\;\text{A} \cdot 1\;\text{s}" />.
            (Merk: SI-systemet ble revidert i 2019 — Ampere er nå definert via elementærladningen,
            men prinsippet er det samme.)
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Retning på kraften — huskeregel</p>
          <ul className="text-sm space-y-2">
            <li>• <strong>Samme strømretning:</strong> Lederne <span className="text-green-600 dark:text-green-400 font-semibold">tiltrekker</span> hverandre</li>
            <li>• <strong>Motsatt strømretning:</strong> Lederne <span className="text-red-600 dark:text-red-400 font-semibold">frastøter</span> hverandre</li>
            <li>• Analogt med magneter: "like poler frastøter" — men her er det <em>strøm</em>, og regelen er snudd!</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Felle-varsel: Lik retning gir TILTREKNING (motsatt av ladninger!)</p>
          <p className="text-sm">
            Intuisjonen fra elektrostatikk: <em>like ladninger frastøter, motsatte tiltrekker</em>.
            For parallelle ledere er det <strong>STIKK MOTSATT</strong>:
          </p>
          <ul className="text-sm mt-2 space-y-1">
            <li>• Strømmene i <strong>samme retning</strong> → ledere <strong>TILTREKKES</strong></li>
            <li>• Strømmene i <strong>motsatt retning</strong> → ledere <strong>FRASTØTES</strong></li>
          </ul>
          <p className="text-sm mt-2">
            Dette er en klassisk eksamensfelle. Grunnen: kraften kommer fra{" "}
            <InlineLatex latex="\vec{F} = I\vec{L}\times\vec{B}" />, ikke fra ladningsinteraksjon.
            Fortegnsregelen for strømmer er motsatt av fortegnsregelen for ladninger. Tegn alltid
            B-feltet fra én leder og finn kraften på den andre via høyrehåndsregelen.
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 400 240" className="w-full max-w-md">
            <defs>
              <marker id="arrowAmberParallel" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
              </marker>
              <marker id="arrowGreenForce" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
              </marker>
            </defs>
            {/* Two parallel conductors */}
            <line x1="120" y1="30" x2="120" y2="210" stroke="#f59e0b" strokeWidth="4" markerEnd="url(#arrowAmberParallel)" />
            <line x1="280" y1="30" x2="280" y2="210" stroke="#f59e0b" strokeWidth="4" markerEnd="url(#arrowAmberParallel)" />
            <text x="104" y="225" fontSize="13" fill="#f59e0b" fontWeight="bold">I</text>
            <text x="264" y="225" fontSize="13" fill="#f59e0b" fontWeight="bold">I'</text>
            {/* Distance d */}
            <line x1="120" y1="120" x2="280" y2="120" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
            <text x="192" y="115" fontSize="12" fill="#8b5cf6" fontWeight="bold">d</text>
            {/* Forces arrows toward each other (attractive, same direction) */}
            <line x1="135" y1="80" x2="175" y2="80" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreenForce)" />
            <line x1="265" y1="80" x2="225" y2="80" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreenForce)" />
            <text x="140" y="70" fontSize="12" fill="#10b981" fontWeight="bold">F</text>
            <text x="240" y="70" fontSize="12" fill="#10b981" fontWeight="bold">F</text>
            {/* B-field at conductor 2 from conductor 1 (into page, marked with x) */}
            <circle cx="220" cy="160" r="8" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="215" y1="155" x2="225" y2="165" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="215" y1="165" x2="225" y2="155" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="232" y="165" fontSize="11" fill="#3b82f6">B₁ ved leder 2</text>
            {/* Title */}
            <text x="80" y="20" fontSize="12" fill="currentColor" fontWeight="bold">Parallelle strømmer (samme retning) → tiltrekning</text>
          </svg>
        </div>
      </TheorySummary>

      {/* 28.5 Ampères lov */}
      <TheorySummary
        title="28.5 Ampères lov"
        mustKnow={[
          "∮ B·dl = μ₀I_enclosed (linjeintegralet av B langs en lukket sløyfe = μ₀ × innesluttet strøm)",
          "Velg ampèresløyfen der B er konstant og parallell med dl",
          "Ampères lov gjelder alltid, men er nyttig bare ved høy symmetri",
          "Brukes til å finne B fra lange rette ledere, koaksialkabler, solenoider",
        ]}
      >
        <p>
          Ampères lov er det magnetiske motstykket til Gauss&apos; lov — begge utnytter symmetri
          for å gjøre et komplisert integral trivielt.
        </p>

        <FormulaBox
          latex="\oint \vec{B} \cdot d\vec{l} = \mu_0 I_{\text{enclosed}}"
          title="Ampères lov"
          variant="gold"
          description="Linjeintegralet av B rundt en lukket sløyfe (Ampère-sløyfen) er lik μ₀ × strøm gjennom sløyfen."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er Ampères lov nyttig?</p>
          <p className="text-sm">
            Den er det magnetiske analoget til Gauss&apos; lov — nyttig når det er <em>høy symmetri</em>.
            I stedet for å integrere Biot-Savart (som kan være svært vanskelig), velger du en
            Ampère-sløyfe der <InlineLatex latex="\vec{B}" /> enten er (a) konstant og parallell
            med <InlineLatex latex="d\vec{l}" />, slik at <InlineLatex latex="\vec{B}\cdot d\vec{l} = B\,dl" />,
            eller (b) vinkelrett på <InlineLatex latex="d\vec{l}" />, slik at <InlineLatex latex="\vec{B}\cdot d\vec{l} = 0" />.
            Da kan du trekke B ut av integralet og løse direkte for B.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng: Ampères lov ↔ Gauss&apos; lov (kap 22)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-1 pr-4">Gauss&apos; lov (E-felt)</th>
                  <th className="text-left py-1">Ampères lov (B-felt)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4"><InlineLatex latex="\oint \vec{E}\cdot d\vec{A} = Q_{\text{enc}}/\varepsilon_0" /></td>
                  <td className="py-1"><InlineLatex latex="\oint \vec{B}\cdot d\vec{l} = \mu_0 I_{\text{enc}}" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4">Flate-integral av E</td>
                  <td className="py-1">Linje-integral av B</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-1 pr-4">Kilde: innesluttet ladning Q</td>
                  <td className="py-1">Kilde: innesluttet strøm I</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4">Gaussisk flate (kule, sylinder)</td>
                  <td className="py-1">Ampère-sløyfe (sirkel, rektangel)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: Velg riktig Ampère-sløyfe</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>Rett leder:</strong> Velg en sirkel konsentrert rundt lederen. B er konstant og parallell med dl langs sirkelen. Da gir <InlineLatex latex="B \cdot 2\pi r = \mu_0 I" />, altså <InlineLatex latex="B = \mu_0 I/(2\pi r)" /></li>
            <li>• <strong>Solenoid:</strong> Velg et rektangel med én side inni og én side utenfor. B er null utenfor og parallell med dl inni</li>
            <li>• <strong>Koaksialkabel:</strong> Velg konentriske sirkler for ulike r-verdier</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser om Ampères lov</p>
          <ul className="text-sm space-y-2">
            <li>
              <strong>Feil:</strong> "B ved et punkt avhenger bare av innesluttet strøm."
              <br />
              <strong>Riktig:</strong> B ved et <em>punkt</em> avhenger av <em>alle</em> strømmer i rommet.
              Men <em>integralet</em> <InlineLatex latex="\oint \vec{B}\cdot d\vec{l}" /> rundt en
              lukket sløyfe avhenger bare av strøm <em>gjennom</em> sløyfen. Ytre strømmer påvirker B,
              men bidragene kansellerer i integralet.
            </li>
            <li>
              <strong>Feil:</strong> "Man kan alltid finne B fra Ampères lov."
              <br />
              <strong>Riktig:</strong> Ampères lov gjelder alltid, men er <em>nyttig</em> bare
              når det er nok symmetri til å trekke B ut av integralet. Uten symmetri må du
              bruke Biot-Savart (som er vanskeligere).
            </li>
          </ul>
        </div>
      </TheorySummary>

      {/* 28.6 Solenoider og toroider */}
      <TheorySummary
        title="28.6 Solenoider og toroider"
        mustKnow={[
          "Solenoid: B = μ₀nI inni (n = viklinger per meter), B ≈ 0 utenfor",
          "n = N/L der N = totalt antall viklinger, L = lengde",
          "Feltet er uniformt og parallelt med aksen inni en lang solenoid",
          "Toroid: B = μ₀NI/(2πr) inni, B = 0 utenfor og i hullet",
        ]}
      >
        <p>
          En solenoid er en tett spolet spiralfjær av ledertråd. Når strøm flyter gjennom den,
          adderes feltene fra alle viklingene til et sterkt, uniformt felt inni — og nær null utenfor.
        </p>

        <FormulaBox
          latex="B = \mu_0 n I"
          title="B-felt inni solenoid"
          variant="gold"
          description="n = N/L = antall viklinger per meter, I = strøm. Enkelt, kraftfullt og uniformt!"
        />

        <FormulaBox
          latex="B_{\text{toroid}} = \frac{\mu_0 N I}{2\pi r}"
          title="B-felt inni toroid"
          variant="blue"
          description="N = totalt antall viklinger, r = avstand fra sentrum av toroiden. B = 0 utenfor."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er feltet uniformt inni solenoiden?</p>
          <p className="text-sm">
            Hver vikle bidrar med litt felt langs aksen. Når viklingene er tett pakket, adderes feltene
            til et nesten perfekt uniformt felt inni — feltlinjene er "fanget" inne i solenoiden.
            Utenfor kansellerer bidragene fra motstående sider av lederen hverandre, slik at B nær null.
            Jo lenger og tettere solenoiden er, jo bedre er tilnærmingen.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: Elektromagnet</p>
          <p className="text-sm">
            En solenoid er i praksis en elektromagnet. En stavmagnet og en solenoid har nesten identisk
            feltmønster på utsiden — men solenoiden kan slås av og på! Industrielle elektromagneter
            (kranmagneter, MR-maskiner, partikkelakseleratorer) er alle solenoider, gjerne med jernkjerne
            for å forsterke feltet. MR-maskiner bruker supraledende solenoider med felt opp til 3 T.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng til kap 29 (Induksjon)</p>
          <p className="text-sm">
            Solenoider er sentrale komponenter i neste kapittel om elektromagnetisk induksjon.
            En solenoid med varierende strøm vil indusere spenning i nabokretser (transformatorer).
            Selvinduktansen til en solenoid er <InlineLatex latex="L = \mu_0 n^2 V" /> der V er
            volumet — dette kobler direkte til energilagring i magnetfelt.
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Utledning med Ampères lov</p>
          <p className="text-sm">
            For å finne <InlineLatex latex="B = \mu_0 n I" /> velger vi et rektangulært Ampère-sløyfe
            med én side (lengde l) parallell med aksen inni solenoiden, og én side utenfor.
            Siden B er null utenfor og vinkelrett på de korte sidene, gir bare den innsiden bidrag:
          </p>
          <p className="text-sm mt-2">
            <InlineLatex latex="\oint \vec{B}\cdot d\vec{l} = B \cdot l = \mu_0 I_{\text{enc}} = \mu_0 (nl)\,I" />
          </p>
          <p className="text-sm mt-1">
            Løs for B: <InlineLatex latex="B = \mu_0 n I" />. Ferdig!
          </p>
        </div>
      </TheorySummary>
    </div>
  );
}
