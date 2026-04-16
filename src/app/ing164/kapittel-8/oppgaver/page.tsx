"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function Kapittel8Oppgaver() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver</h2>

      <CollapsibleSection title="Oppgavestrategier">
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Kraftimpuls-oppgaver</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Velg positiv retning</strong> og vær konsekvent!</li>
            <li><strong>Finn p₁ og p₂</strong> — husk fortegn for retning</li>
            <li><strong>Beregn impulsen:</strong> <InlineLatex latex="J = p_2 - p_1 = m(v_2 - v_1)" /></li>
            <li><strong>Finn kraft fra tid:</strong> <InlineLatex latex="\bar{F} = J / \Delta t" /></li>
            <li><strong>Sjekk:</strong> Gir fortegnet mening? Kraft mot venstre når ballen spretter til høyre?</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Kollisjonsoppgaver — Hvilken type?</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Les oppgaven nøye:</strong> Henger de sammen etterpå? → Fullstendig inelastisk</li>
            <li><strong>Elastisk?</strong> Oppgaven sier det eksplisitt, eller spør om E<sub>k</sub> er bevart</li>
            <li><strong>Sett opp p-bevaring</strong> (alltid, uansett type)</li>
            <li>Er den elastisk? <strong>Legg til E<sub>k</sub>-bevaring</strong> → to ligninger</li>
            <li><strong>Løs</strong> — ved elastisk: substitusjon, forkast triviell løsning</li>
            <li><strong>Beregn energitap</strong> hvis oppgaven spør om det</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Ballistisk pendel (to-stegs)</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Steg 1 — Støtet:</strong> Bevegelsesmengde bevart. <InlineLatex latex="mv_0 = (m+M)V" /></li>
            <li><strong>Steg 2 — Svinget:</strong> Energi bevart. <InlineLatex latex="\tfrac{1}{2}(m+M)V^2 = (m+M)gh" /></li>
            <li><strong>Kombiner:</strong> Eliminer V → <InlineLatex latex="v_0 = \frac{m+M}{m}\sqrt{2gh}" /></li>
          </ol>
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-3 mt-3 text-sm">
            <p className="font-semibold text-red-700 dark:text-red-400">Aldri:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Bruk energibevaring <em>under</em> støtet (energi går tapt!)</li>
              <li>Bruk p-bevaring <em>under</em> svinget (snorkraft virker!)</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Sjekkliste — Vanlige feil i kap. 8</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Glemmer <strong>fortegn</strong> når ting beveger seg i motsatt retning</li>
            <li>Blander <strong>kollisjonstype</strong> — E<sub>k</sub> er KUN bevart i elastisk!</li>
            <li>Glemmer å <strong>konvertere enheter</strong> (km/h → m/s, gram → kg)</li>
            <li>I 2D: Glemmer å bruke <strong>komponentmetoden</strong></li>
            <li>Bruker feil prinsipp i ballistisk pendel (se over)</li>
            <li>Forkaster ikke den <strong>trivielle løsningen</strong> i elastisk kollisjon</li>
          </ul>
        </div>
      </div>
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
      <ExerciseCard
        number={1}
        title="Ball treffer vegg — Kraftimpuls (1D)"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En ball med masse <InlineLatex latex="m = 0{,}40\;\text{kg}" /> treffer veggen med
              fart <InlineLatex latex="v_1 = 30\;\text{m/s}" /> og spretter tilbake
              med <InlineLatex latex="v_2 = 20\;\text{m/s}" /> i motsatt retning.
              Sammenstøtet varer <InlineLatex latex="\Delta t = 0{,}010\;\text{s}" />.
            </p>
            <p className="mt-2">Finn gjennomsnittskraften fra veggen på ballen.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Velg positiv retning (f.eks. mot veggen). Ballen spretter TILBAKE, så v₂ har motsatt fortegn av v₁.</p>,
          },
          {
            label: "Hint 2",
            content: <p>Bruk <InlineLatex latex="J = m(v_2 - v_1)" /> og <InlineLatex latex="\bar{F} = J / \Delta t" />.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Masse: <InlineLatex latex="m = 0{,}40\;\text{kg}" /></li>
                <li>Hastighet mot vegg (positiv retning): <InlineLatex latex="v_1 = +30\;\text{m/s}" /></li>
                <li>Hastighet tilbake (negativ retning): <InlineLatex latex="v_2 = -20\;\text{m/s}" /></li>
                <li>Kontakttid: <InlineLatex latex="\Delta t = 0{,}010\;\text{s}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Gjennomsnittlig kraft <InlineLatex latex="\bar{F}" /> fra veggen på ballen</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Vi bruker <strong>impuls-momentumteoremet</strong>: kraftimpulsen <InlineLatex latex="J" /> er lik endringen i bevegelsesmengde. Deretter gir <InlineLatex latex="\bar{F} = J/\Delta t" /> gjennomsnittskraften. Vi velger positiv retning mot veggen og passer på at den tilbakegående farten får negativt fortegn.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Beregn kraftimpulsen:</p>
              <FormulaBox
                latex="J = m(v_2 - v_1) = 0{,}40 \cdot (-20 - 30) = 0{,}40 \cdot (-50) = -20\;\text{N·s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Finn gjennomsnittlig kraft:</p>
              <FormulaBox
                latex="\bar{F} = \frac{J}{\Delta t} = \frac{-20\;\text{N·s}}{0{,}010\;\text{s}} = \underline{\underline{-2000\;\text{N}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="\bar{F} = -2000\;\text{N}" variant="gold" />
              <p className="text-sm mt-1">Negativt fortegn betyr kraften virker bort fra veggen (mot spilleren). Størrelsen 2000 N ≈ 200 ganger tyngdekraften på ballen!</p>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Når en ball spretter tilbake har <InlineLatex latex="v_1" /> og <InlineLatex latex="v_2" /> motsatte fortegn, og endringen i bevegelsesmengde blir dobbelt så stor som om ballen bare hadde stoppet. Velg alltid positiv retning eksplisitt og hold deg konsekvent til den.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Fotball sparkes — Kraftimpuls i 2D"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En fotball (<InlineLatex latex="m = 0{,}40\;\text{kg}" />) beveger seg mot venstre
              med <InlineLatex latex="v_1 = 20\;\text{m/s}" />. Den sparkes slik at den etterpå
              har fart <InlineLatex latex="v_2 = 30\;\text{m/s}" /> i retning 45° oppover
              fra horisontal (mot høyre). Kontakttid: <InlineLatex latex="\Delta t = 0{,}010\;\text{s}" />.
            </p>
            <p className="mt-2">Finn kraftimpulsen og gjennomsnittlig kraft på ballen.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Dekomponér i x- og y-komponenter. Ballen beveger seg mot venstre → v₁ₓ er negativ.</p>,
          },
          {
            label: "Hint 2",
            content: <p>Etter spark: v₂ₓ = v₂cos45°, v₂y = v₂sin45°. Finn Jx og Jy separat.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Masse: <InlineLatex latex="m = 0{,}40\;\text{kg}" /></li>
                <li>Startfart: <InlineLatex latex="v_1 = 20\;\text{m/s}" /> mot venstre <InlineLatex latex="(v_{1x} = -20\;\text{m/s},\; v_{1y} = 0)" /></li>
                <li>Sluttfart: <InlineLatex latex="v_2 = 30\;\text{m/s}" /> i 45° oppover mot høyre</li>
                <li>Kontakttid: <InlineLatex latex="\Delta t = 0{,}010\;\text{s}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Kraftimpulsens størrelse <InlineLatex latex="|J|" /></li>
                <li>Gjennomsnittlig kraft <InlineLatex latex="|\bar{F}|" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Fordi ballen beveger seg i 2D bruker vi <strong>komponentvis impuls-momentumteorem</strong>. Vi finner <InlineLatex latex="J_x" /> og <InlineLatex latex="J_y" /> separat, og kombinerer med Pythagoras for å få størrelsen. Positiv x = mot høyre, positiv y = oppover.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Dekomponér sluttfarten:</p>
              <FormulaBox
                latex="v_{2x} = 30\cos 45° = 21{,}2\;\text{m/s}, \quad v_{2y} = 30\sin 45° = 21{,}2\;\text{m/s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Kraftimpuls i hver retning:</p>
              <FormulaBox
                latex="J_x = m(v_{2x} - v_{1x}) = 0{,}40\,(21{,}2 - (-20)) = 0{,}40 \cdot 41{,}2 = 16{,}5\;\text{N·s}"
                variant="blue"
              />
              <FormulaBox
                latex="J_y = m(v_{2y} - v_{1y}) = 0{,}40\,(21{,}2 - 0) = 8{,}5\;\text{N·s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Størrelse med Pythagoras:</p>
              <FormulaBox
                latex="J = \sqrt{J_x^2 + J_y^2} = \sqrt{16{,}5^2 + 8{,}5^2} = \underline{\underline{18{,}5\;\text{N·s}}}"
                variant="gold"
              />
              <p className="text-sm mt-2 mb-1">Steg 4 — Gjennomsnittlig kraft:</p>
              <FormulaBox
                latex="\bar{F} = \frac{J}{\Delta t} = \frac{18{,}5}{0{,}010} = \underline{\underline{1{,}9\;\text{kN}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="J = 18{,}5\;\text{N·s}, \quad \bar{F} = 1{,}9\;\text{kN}" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">I 2D behandles impulsen komponentvis — x og y uavhengig. Pythagoras gir oss størrelsen til slutt. Legg merke til at ballens x-impuls er stor fordi den bytter retning (fra −20 til +21 m/s), mens y-impulsen bare akselererer den oppover fra 0.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Rifle og kule — Rekyl"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En rifle (<InlineLatex latex="m_A = 3{,}0\;\text{kg}" />) skyter en
              kule (<InlineLatex latex="m_B = 0{,}005\;\text{kg}" />) som forlater løpet
              med <InlineLatex latex="v_B = 300\;\text{m/s}" />. Begge er i ro før skuddet.
            </p>
            <p className="mt-2">Finn rekylfarten til rifla.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Systemet er i ro før skuddet → p<sub>total,før</sub> = 0. Bevegelsesmengden er bevart!</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Riflens masse: <InlineLatex latex="m_A = 3{,}0\;\text{kg}" /></li>
                <li>Kulens masse: <InlineLatex latex="m_B = 0{,}005\;\text{kg}" /></li>
                <li>Kulens fart etter skudd: <InlineLatex latex="v_B = +300\;\text{m/s}" /></li>
                <li>Begge i ro før skuddet: <InlineLatex latex="p_{\text{total,før}} = 0" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Riflens rekylfart <InlineLatex latex="v_A" /> etter skuddet</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Systemet er isolert (ingen ytre horisontal kraft under skuddet), så <strong>bevegelsesmengden er bevart</strong>. Fordi alt er i ro før, er <InlineLatex latex="p_{\text{total}} = 0" /> og etter skuddet må kulen og rifla ha like store, men motsatte bevegelsesmengder.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Bevaring av bevegelsesmengde:</p>
              <FormulaBox
                latex="m_A v_A + m_B v_B = 0 \;\Rightarrow\; v_A = -\frac{m_B}{m_A}\,v_B"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Sett inn tallverdier:</p>
              <FormulaBox
                latex="v_A = -\frac{0{,}005}{3{,}0} \cdot 300 = \underline{\underline{-0{,}50\;\text{m/s}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="v_A = -0{,}50\;\text{m/s}" variant="gold" />
              <p className="text-sm mt-1">Negativt fortegn betyr rifla beveger seg bakover (rekyl). Liten fart fordi rifla er 600 ganger tyngre enn kulen.</p>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Bevegelsesmengde er alltid bevart i isolerte systemer. Produktet <InlineLatex latex="mv" /> er likt for begge: liten masse × stor fart = stor masse × liten fart. Det er derfor rekyl-farten er moderat selv om kulen er mye raskere.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Fullstendig inelastisk kollisjon — To klosser"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              Kloss A (<InlineLatex latex="m_A = 0{,}50\;\text{kg}" />, <InlineLatex latex="v_{A1} = 2{,}0\;\text{m/s}" /> →)
              kolliderer med kloss B (<InlineLatex latex="m_B = 0{,}30\;\text{kg}" />, <InlineLatex latex="v_{B1} = -2{,}0\;\text{m/s}" /> ←).
              De henger sammen etter støtet.
            </p>
            <p className="mt-2">Finn felles hastighet og energitapet.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Fullstendig inelastisk: <InlineLatex latex="(m_A + m_B)v_2 = m_Av_{A1} + m_Bv_{B1}" /></p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Kloss A: <InlineLatex latex="m_A = 0{,}50\;\text{kg}" />, <InlineLatex latex="v_{A1} = +2{,}0\;\text{m/s}" /></li>
                <li>Kloss B: <InlineLatex latex="m_B = 0{,}30\;\text{kg}" />, <InlineLatex latex="v_{B1} = -2{,}0\;\text{m/s}" /></li>
                <li>De henger sammen etter støtet (fullstendig inelastisk)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Felles hastighet <InlineLatex latex="v_2" /> etter støtet</li>
                <li>Energitap <InlineLatex latex="\Delta E_k" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Fullstendig inelastisk støt: legemene beveger seg med <strong>felles hastighet</strong> etter kollisjonen. <strong>Bevegelsesmengden er bevart</strong>, men kinetisk energi er ikke bevart. Vi bruker p-bevaring for å finne <InlineLatex latex="v_2" />, deretter beregner vi energitapet eksplisitt.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
                <p className="text-sm mb-1">Steg 1 — Bevaring av bevegelsesmengde:</p>
              <FormulaBox
                latex="v_2 = \frac{m_A v_{A1} + m_B v_{B1}}{m_A + m_B} = \frac{0{,}50 \cdot 2{,}0 + 0{,}30 \cdot (-2{,}0)}{0{,}80} = \frac{0{,}40}{0{,}80} = \underline{\underline{0{,}50\;\text{m/s}}}"
                variant="gold"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Kinetisk energi før støtet:</p>
              <FormulaBox
                latex="E_{k,1} = \tfrac{1}{2} m_A v_{A1}^2 + \tfrac{1}{2} m_B v_{B1}^2 = \tfrac{1}{2} \cdot 0{,}50 \cdot 4 + \tfrac{1}{2} \cdot 0{,}30 \cdot 4 = 1{,}60\;\text{J}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Kinetisk energi etter støtet:</p>
              <FormulaBox
                latex="E_{k,2} = \tfrac{1}{2}(m_A+m_B)v_2^2 = \tfrac{1}{2} \cdot 0{,}80 \cdot 0{,}25 = 0{,}10\;\text{J}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 4 — Energitap:</p>
              <FormulaBox
                latex="\Delta E_k = E_{k,1} - E_{k,2} = 1{,}60 - 0{,}10 = \underline{\underline{1{,}50\;\text{J (tapt)}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="v_2 = 0{,}50\;\text{m/s} \quad (\rightarrow), \quad \Delta E_k = 1{,}50\;\text{J (tapt)}" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Hele 94 % av kinetisk energi er tapt til varme og deformasjon i dette støtet. Bevegelsesmengden er likevel alltid bevart: <InlineLatex latex="p_{\text{før}} = 0{,}40 = p_{\text{etter}}" />. Det er dette som skiller p-bevaring fra energibevaring — p-bevaring er absolutt, energibevaring er betinget.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={5}
        title="Ballistisk pendel — Klassisk to-stegs problem"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              En kule (<InlineLatex latex="m = 0{,}005\;\text{kg}" />) med
              hastighet <InlineLatex latex="v_0" /> treffer og fester seg i en
              kloss (<InlineLatex latex="M = 2{,}0\;\text{kg}" />)
              som henger i et tau. Kloss+kule svinger opp til
              høyde <InlineLatex latex="y = 0{,}030\;\text{m}" />.
            </p>
            <p className="mt-2">Finn kulens startfart <InlineLatex latex="v_0" />.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p><strong>To steg!</strong> Støtet: p-bevaring. Svinget: energibevaring.</p>,
          },
          {
            label: "Hint 2",
            content: <p>Fra energibevaring etter støtet: <InlineLatex latex="V = \sqrt{2gy}" />. Sett dette inn i p-ligningen.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Kulens masse: <InlineLatex latex="m = 0{,}005\;\text{kg}" /></li>
                <li>Klossens masse: <InlineLatex latex="M = 2{,}0\;\text{kg}" /></li>
                <li>Svingehøyde: <InlineLatex latex="y = 0{,}030\;\text{m}" /></li>
                <li>Kule fester seg i kloss (fullstendig inelastisk)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Kulens hastighet <InlineLatex latex="v_0" /> like før støtet</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Dette er et <strong>to-stegs problem</strong>. Under støtet bruker vi <strong>p-bevaring</strong> (energi går tapt under støtet). Under svinget bruker vi <strong>mekanisk energibevaring</strong> (ingen friksjon, bare konservative krefter). Vi kombinerer de to ligningene for å eliminere <InlineLatex latex="V" />.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Bevaring av bevegelsesmengde (under støtet):</p>
              <FormulaBox
                latex="mv_0 = (M+m)V \;\Rightarrow\; V = \frac{m}{M+m}\,v_0"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Bevaring av mekanisk energi (under svinget):</p>
              <FormulaBox
                latex="\tfrac{1}{2}(M+m)V^2 = (M+m)gy \;\Rightarrow\; V = \sqrt{2gy}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Eliminer <InlineLatex latex="V" /> ved å kombinere ligningene:</p>
              <FormulaBox
                latex="v_0 = \frac{M+m}{m}\sqrt{2gy} = \frac{2{,}005}{0{,}005}\sqrt{2 \cdot 9{,}81 \cdot 0{,}030}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 4 — Regn ut:</p>
              <FormulaBox
                latex="v_0 = 401 \cdot 0{,}767 = \underline{\underline{308\;\text{m/s}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="v_0 = 308\;\text{m/s}" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Du KAN IKKE bruke energibevaring under støtet (energi går tapt til deformasjon og varme), og du KAN IKKE bruke p-bevaring under svinget (snorkraften er en ytre kraft). Det riktige prinsippet i riktig steg er nøkkelen til ballistisk pendel.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={6}
        title="Bilkollisjon i kryss — 2D inelastisk"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              Bil A (<InlineLatex latex="m_A = 1000\;\text{kg}" />) kjører nordover
              med <InlineLatex latex="v_A = 15\;\text{m/s}" />. Bil B (<InlineLatex latex="m_B = 2000\;\text{kg}" />)
              kjører østover med <InlineLatex latex="v_B = 10\;\text{m/s}" />.
              De kolliderer og henger sammen.
            </p>
            <p className="mt-2">Finn felles hastighet (størrelse og retning) og energitapet.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>2D fullstendig inelastisk. Sett opp p-bevaring i x- og y-retning separat.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Bil A: <InlineLatex latex="m_A = 1000\;\text{kg}" />, <InlineLatex latex="v_A = 15\;\text{m/s}" /> nordover</li>
                <li>Bil B: <InlineLatex latex="m_B = 2000\;\text{kg}" />, <InlineLatex latex="v_B = 10\;\text{m/s}" /> østover</li>
                <li>Fullstendig inelastisk: henger sammen etter kollisjon</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Felles hastighet (størrelse og retning) etter kollisjonen</li>
                <li>Energitap <InlineLatex latex="\Delta E_k" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">2D fullstendig inelastisk kollisjon. Vi setter opp <strong>p-bevaring komponentvis</strong> — x og y behandles som to uavhengige 1D-problemer. Deretter gir Pythagoras størrelsen og arctangens gir retningen. Energitapet beregnes ved å sammenligne <InlineLatex latex="E_k" /> før og etter.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — P-bevaring i x-retning (østover):</p>
              <FormulaBox
                latex="(m_A+m_B)v_x = m_B v_B \;\Rightarrow\; v_x = \frac{2000 \cdot 10}{3000} = 6{,}67\;\text{m/s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — P-bevaring i y-retning (nordover):</p>
              <FormulaBox
                latex="(m_A+m_B)v_y = m_A v_A \;\Rightarrow\; v_y = \frac{1000 \cdot 15}{3000} = 5{,}00\;\text{m/s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Størrelse og retning:</p>
              <FormulaBox
                latex="v = \sqrt{v_x^2 + v_y^2} = \sqrt{6{,}67^2 + 5{,}00^2} = \underline{\underline{8{,}3\;\text{m/s}}}"
                variant="gold"
              />
              <FormulaBox
                latex="\alpha = \arctan\!\left(\frac{v_y}{v_x}\right) = \arctan\!\left(\frac{5{,}00}{6{,}67}\right) = \underline{\underline{37°\;\text{nord for øst}}}"
                variant="gold"
              />
              <p className="text-sm mt-2 mb-1">Steg 4 — Energitap:</p>
              <FormulaBox
                latex="E_{k,\text{før}} = \tfrac{1}{2} \cdot 1000 \cdot 15^2 + \tfrac{1}{2} \cdot 2000 \cdot 10^2 = 112\,500 + 100\,000 = 212\,500\;\text{J}"
                variant="blue"
              />
              <FormulaBox
                latex="E_{k,\text{etter}} = \tfrac{1}{2} \cdot 3000 \cdot 8{,}3^2 \approx 103\,335\;\text{J}"
                variant="blue"
              />
              <FormulaBox
                latex="\Delta E_k = 212\,500 - 103\,335 = \underline{\underline{109\;\text{kJ (tapt)}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="v = 8{,}3\;\text{m/s},\quad 37°\text{ nord for øst},\quad \Delta E_k = 109\;\text{kJ (tapt)}" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">I 2D-kollisjoner er bevegelsesmengden bevart i <em>begge</em> retninger uavhengig. Finn <InlineLatex latex="v_x" /> og <InlineLatex latex="v_y" /> separat, bruk Pythagoras for størrelsen og arctangens for retningen. Merk at over halvparten av kinetisk energi gikk tapt i denne kollisjonen!</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={7}
        title="Elastisk 1D-kollisjon — Ligningssystem"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              Kloss A (<InlineLatex latex="m_A = 0{,}50\;\text{kg}" />, <InlineLatex latex="v_{A1} = 2{,}0\;\text{m/s}" /> →)
              kolliderer elastisk med kloss B (<InlineLatex latex="m_B = 0{,}30\;\text{kg}" />, <InlineLatex latex="v_{B1} = -2{,}0\;\text{m/s}" /> ←).
            </p>
            <p className="mt-2">Finn hastighetene etter kollisjonen.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>To ligninger: p-bevaring og E<sub>k</sub>-bevaring. Uttrykk v<sub>A2</sub> fra den ene og sett inn i den andre.</p>,
          },
          {
            label: "Hint 2",
            content: <p>Du vil få en andregradslikning. En av løsningene er den trivielle (v<sub>A2</sub> = v<sub>A1</sub>, v<sub>B2</sub> = v<sub>B1</sub>) — forkast den.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Kloss A: <InlineLatex latex="m_A = 0{,}50\;\text{kg}" />, <InlineLatex latex="v_{A1} = +2{,}0\;\text{m/s}" /></li>
                <li>Kloss B: <InlineLatex latex="m_B = 0{,}30\;\text{kg}" />, <InlineLatex latex="v_{B1} = -2{,}0\;\text{m/s}" /></li>
                <li>Kollisjonen er <strong>elastisk</strong></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Hastighetene <InlineLatex latex="v_{A2}" /> og <InlineLatex latex="v_{B2}" /> etter kollisjonen</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Elastisk kollisjon gir <strong>to bevaringslover</strong>: bevegelsesmengde og kinetisk energi. Dette gir et ligningssystem med to ukjente (<InlineLatex latex="v_{A2}" /> og <InlineLatex latex="v_{B2}" />). Vi uttrykker <InlineLatex latex="v_{A2}" /> fra p-ligningen og substituerer inn i energiligningen. Vi får en andregradslikning med to løsninger — den trivielle (ingenting skjer) forkastes.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Ligning 1: bevaring av bevegelsesmengde:</p>
              <FormulaBox
                latex="0{,}50\,v_{A2} + 0{,}30\,v_{B2} = 0{,}50 \cdot 2 + 0{,}30 \cdot (-2) = 0{,}40"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Ligning 2: bevaring av kinetisk energi:</p>
              <FormulaBox
                latex="\tfrac{1}{2} \cdot 0{,}50\,v_{A2}^2 + \tfrac{1}{2} \cdot 0{,}30\,v_{B2}^2 = 1{,}60\;\text{J}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Fra ligning 1: <InlineLatex latex="v_{A2} = 0{,}80 - 0{,}60\,v_{B2}" />. Substituer i ligning 2 og løs andregradsligningen:</p>
              <FormulaBox
                latex="v_{B2} = 3{,}0\;\text{m/s} \quad \text{eller} \quad v_{B2} = -2{,}0\;\text{m/s (triviell — forkastes!)}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 4 — Finn <InlineLatex latex="v_{A2}" />:</p>
              <FormulaBox
                latex="v_{A2} = 0{,}80 - 0{,}60 \cdot 3{,}0 = \underline{\underline{-1{,}0\;\text{m/s}}}"
                variant="gold"
              />
              <FormulaBox
                latex="v_{B2} = \underline{\underline{+3{,}0\;\text{m/s}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="v_{A2} = -1{,}0\;\text{m/s}\;(\leftarrow), \quad v_{B2} = +3{,}0\;\text{m/s}\;(\rightarrow)" variant="gold" />
              <p className="text-sm mt-1">Sjekk: <InlineLatex latex="p_{\text{etter}} = 0{,}50 \cdot (-1) + 0{,}30 \cdot 3 = 0{,}40" /> ✓ og <InlineLatex latex="E_{k,\text{etter}} = 0{,}25 + 1{,}35 = 1{,}60\;\text{J}" /> ✓</p>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Elastisk kollisjon gir alltid et andregradsligningssystem. Den trivielle løsningen (partiklene passerer gjennom hverandre) er matematisk gyldig men fysisk meningsløs — forkast den alltid. A snur retning, B spretter ut med økt fart fordi A hadde større bevegelsesmengde opprinnelig.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={8}
        title="Curlingsteiner — 2D bevaring av bevegelsesmengde"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              Stein A (<InlineLatex latex="m_A = 20\;\text{kg}" />) glir mot høyre
              med <InlineLatex latex="v_{A1} = 2{,}0\;\text{m/s}" />. Stein B (<InlineLatex latex="m_B = 12\;\text{kg}" />) ligger i ro.
              Etter kollisjonen går A med <InlineLatex latex="v_{A2} = 1{,}0\;\text{m/s}" /> i
              retning <InlineLatex latex="\alpha = 30°" /> over horisontal.
            </p>
            <p className="mt-2">Finn B sin hastighet (størrelse og retning) etter kollisjonen.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Sett opp p-bevaring i x og y separat. Finn v<sub>B2x</sub> og v<sub>B2y</sub>.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Stein A: <InlineLatex latex="m_A = 20\;\text{kg}" />, <InlineLatex latex="v_{A1} = 2{,}0\;\text{m/s}" /> mot høyre</li>
                <li>Stein B: <InlineLatex latex="m_B = 12\;\text{kg}" />, i ro</li>
                <li>Etter kollisjonen: A har <InlineLatex latex="v_{A2} = 1{,}0\;\text{m/s}" /> i retning <InlineLatex latex="\alpha = 30°" /> over horisontal</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Stein B sin hastighet (størrelse og retning) etter kollisjonen</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">2D-kollisjon. Vi kjenner ikke kollisjonstypen (elastisk/inelastisk), men vi vet at <strong>bevegelsesmengden er bevart</strong> alltid. Vi bruker p-bevaring i x og y for å finne B sine komponenter, deretter Pythagoras og arctangens for størrelse og retning.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — P-bevaring i x-retning:</p>
              <FormulaBox
                latex="m_A v_{A1} = m_A v_{A2}\cos\alpha + m_B v_{B2x}"
                variant="blue"
              />
              <FormulaBox
                latex="v_{B2x} = \frac{m_A(v_{A1} - v_{A2}\cos\alpha)}{m_B} = \frac{20(2{,}0 - 1{,}0\cos 30°)}{12} = 1{,}89\;\text{m/s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — P-bevaring i y-retning (B var i ro, ingen y-komponent før):</p>
              <FormulaBox
                latex="0 = m_A v_{A2}\sin\alpha + m_B v_{B2y}"
                variant="blue"
              />
              <FormulaBox
                latex="v_{B2y} = \frac{-m_A v_{A2}\sin\alpha}{m_B} = \frac{-20 \cdot 1{,}0 \cdot \sin 30°}{12} = -0{,}83\;\text{m/s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Størrelse og retning for B:</p>
              <FormulaBox
                latex="v_{B2} = \sqrt{v_{B2x}^2 + v_{B2y}^2} = \sqrt{1{,}89^2 + 0{,}83^2} = \underline{\underline{2{,}07\;\text{m/s}}}"
                variant="gold"
              />
              <FormulaBox
                latex="\beta = \arctan\!\left(\frac{|v_{B2y}|}{v_{B2x}}\right) = \arctan\!\left(\frac{0{,}83}{1{,}89}\right) = \underline{\underline{23{,}7°\;\text{under horisontal}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="v_{B2} = 2{,}07\;\text{m/s},\quad 23{,}7°\text{ under horisontal (til høyre og nedover)}" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">I 2D-kollisjoner er bevegelsesmengden bevart i <em>begge</em> retninger uavhengig. Stein B får negativ y-komponent fordi A avbøyes oppover — ved p-bevaring må B gå nedover for å kompensere. Komponentmetoden er alltid veien å gå i 2D.</p>
            </div>
          </div>
        }
      />

      </CollapsibleSection>

      {/* ── Relaterte oppgaver ── */}
      <h3 className="text-xl font-semibold mb-4">Relaterte oppgaver</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/ing164/eksamen/eksamener" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-red-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
            <h4 className="font-semibold">Eksamensoppgaver</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Høst 2023</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Oblig 2, oppgave 3</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver/kapittel-8" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 8</p>
        </Link>
      </div>
    </div>
  );
}
