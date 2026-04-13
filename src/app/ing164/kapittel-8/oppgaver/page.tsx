"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function Kapittel8Oppgaver() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver</h2>

      {/* ── OPPGAVESTRATEGIER ── */}
      <h3 className="text-xl font-semibold mt-2 mb-4">Oppgavestrategier</h3>

      <div className="space-y-4 mb-10">
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
            <li><strong>Elastisk?</strong> Oppgaven sier det eksplisitt, eller spør om E<sub>K</sub> er bevart</li>
            <li><strong>Sett opp p-bevaring</strong> (alltid, uansett type)</li>
            <li>Er den elastisk? <strong>Legg til E<sub>K</sub>-bevaring</strong> → to ligninger</li>
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
            <li>Blander <strong>kollisjonstype</strong> — E<sub>K</sub> er KUN bevart i elastisk!</li>
            <li>Glemmer å <strong>konvertere enheter</strong> (km/h → m/s, gram → kg)</li>
            <li>I 2D: Glemmer å bruke <strong>komponentmetoden</strong></li>
            <li>Bruker feil prinsipp i ballistisk pendel (se over)</li>
            <li>Forkaster ikke den <strong>trivielle løsningen</strong> i elastisk kollisjon</li>
          </ul>
        </div>
      </div>

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <h3 className="text-xl font-semibold mt-2 mb-4">Gjennomgåtte eksempler</h3>

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
                <li>Energitap <InlineLatex latex="\Delta E_K" /></li>
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
                latex="E_{K1} = \tfrac{1}{2} m_A v_{A1}^2 + \tfrac{1}{2} m_B v_{B1}^2 = \tfrac{1}{2} \cdot 0{,}50 \cdot 4 + \tfrac{1}{2} \cdot 0{,}30 \cdot 4 = 1{,}60\;\text{J}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Kinetisk energi etter støtet:</p>
              <FormulaBox
                latex="E_{K2} = \tfrac{1}{2}(m_A+m_B)v_2^2 = \tfrac{1}{2} \cdot 0{,}80 \cdot 0{,}25 = 0{,}10\;\text{J}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 4 — Energitap:</p>
              <FormulaBox
                latex="\Delta E_K = E_{K1} - E_{K2} = 1{,}60 - 0{,}10 = \underline{\underline{1{,}50\;\text{J (tapt)}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="v_2 = 0{,}50\;\text{m/s} \quad (\rightarrow), \quad \Delta E_K = 1{,}50\;\text{J (tapt)}" variant="gold" />
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
                <li>Energitap <InlineLatex latex="\Delta E_K" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">2D fullstendig inelastisk kollisjon. Vi setter opp <strong>p-bevaring komponentvis</strong> — x og y behandles som to uavhengige 1D-problemer. Deretter gir Pythagoras størrelsen og arctangens gir retningen. Energitapet beregnes ved å sammenligne <InlineLatex latex="E_K" /> før og etter.</p>
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
                latex="E_{K,\text{før}} = \tfrac{1}{2} \cdot 1000 \cdot 15^2 + \tfrac{1}{2} \cdot 2000 \cdot 10^2 = 112\,500 + 100\,000 = 212\,500\;\text{J}"
                variant="blue"
              />
              <FormulaBox
                latex="E_{K,\text{etter}} = \tfrac{1}{2} \cdot 3000 \cdot 8{,}3^2 \approx 103\,335\;\text{J}"
                variant="blue"
              />
              <FormulaBox
                latex="\Delta E_K = 212\,500 - 103\,335 = \underline{\underline{109\;\text{kJ (tapt)}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="v = 8{,}3\;\text{m/s},\quad 37°\text{ nord for øst},\quad \Delta E_K = 109\;\text{kJ (tapt)}" variant="gold" />
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
            content: <p>To ligninger: p-bevaring og E<sub>K</sub>-bevaring. Uttrykk v<sub>A2</sub> fra den ene og sett inn i den andre.</p>,
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
              <p className="text-sm mt-1">Sjekk: <InlineLatex latex="p_{\text{etter}} = 0{,}50 \cdot (-1) + 0{,}30 \cdot 3 = 0{,}40" /> ✓ og <InlineLatex latex="E_{K,\text{etter}} = 0{,}25 + 1{,}35 = 1{,}60\;\text{J}" /> ✓</p>
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

      {/* ── ØVINGSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Oblig 2, oppg. 3a — Kule i kloss (inelastisk)"
        difficulty="middels"
        source="Obligatorisk innlevering"
        problem={
          <div>
            <p>
              En kloss med masse <InlineLatex latex="M" /> henger i en snor med lengde <InlineLatex latex="L" />.
              En kule med masse <InlineLatex latex="m" /> og hastighet <InlineLatex latex="v_0" /> treffer klossen
              og fester seg (fullstendig inelastisk støt).
            </p>
            <p className="mt-2">Finn felleslegemets hastighet <InlineLatex latex="V" /> rett etter støtet.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Fullstendig inelastisk → felles hastighet. Bruk bevaring av bevegelsesmengde.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Kulens masse: <InlineLatex latex="m" />, startfart: <InlineLatex latex="v_0" /></li>
                <li>Klossens masse: <InlineLatex latex="M" />, i ro</li>
                <li>Kule fester seg i kloss (fullstendig inelastisk)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Felleslegemets hastighet <InlineLatex latex="V" /> rett etter støtet</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Under støtet er det ingen ytre horisontale krefter, så <strong>bevegelsesmengden er bevart</strong>. Kule og kloss beveger seg med felles hastighet etter støtet — sett opp p-bevaring og løs for <InlineLatex latex="V" />.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Bevaring av bevegelsesmengde under støtet:</p>
              <FormulaBox
                latex="mv_0 = (m + M)V"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Løs for <InlineLatex latex="V" />:</p>
              <FormulaBox
                latex="V = \frac{m}{m+M}\,v_0"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="V = \dfrac{m}{m+M}\,v_0" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Dette er det første steget i en ballistisk pendel. <InlineLatex latex="V" /> er alltid mindre enn <InlineLatex latex="v_0" /> fordi totalvekten er større. Jo større klossen er sammenlignet med kulen, desto langsommere blir V — og desto mer energi tapes.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Oblig 2, oppg. 3b — Maks vinkelutslag"
        difficulty="vanskelig"
        source="Obligatorisk innlevering"
        problem={
          <div>
            <p>
              Vis at felleslegemets maksimale vinkelutslag etter støtet er:
            </p>
            <FormulaBox
              latex="\varphi_{\max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right)"
              variant="blue"
            />
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bruk energibevaring etter støtet. Høyden: <InlineLatex latex="h = L - L\cos\varphi = L(1-\cos\varphi)" />.</p>,
          },
          {
            label: "Hint 2",
            content: <p>Sett inn V fra del a) og løs for cosφ.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Fra del a): <InlineLatex latex="V = \dfrac{m}{m+M}\,v_0" /></li>
                <li>Snorlengde: <InlineLatex latex="L" /></li>
                <li>Høyde ved vinkelutslag: <InlineLatex latex="h = L(1-\cos\varphi)" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Uttrykket for maksimalt vinkelutslag <InlineLatex latex="\varphi_{\max}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Etter støtet er systemet et svingeopplegg uten friksjon — <strong>mekanisk energi er bevart</strong>. Vi setter kinetisk energi rett etter støtet lik potensiell energi ved maksimalt utslag, og løser for <InlineLatex latex="\varphi_{\max}" />.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Energibevaring etter støtet:</p>
              <FormulaBox
                latex="\tfrac{1}{2}(m+M)V^2 = (m+M)gL(1-\cos\varphi_{\max})"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Sett inn <InlineLatex latex="V = \dfrac{m}{m+M}v_0" />:</p>
              <FormulaBox
                latex="\tfrac{1}{2}\cdot\frac{m^2 v_0^2}{m+M} = (m+M)gL(1-\cos\varphi_{\max})"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Løs for <InlineLatex latex="1 - \cos\varphi_{\max}" />:</p>
              <FormulaBox
                latex="1-\cos\varphi_{\max} = \frac{m^2 v_0^2}{2gL(m+M)^2}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 4 — Løs for <InlineLatex latex="\varphi_{\max}" />:</p>
              <FormulaBox
                latex="\varphi_{\max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right) \quad \square"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="\varphi_{\max} = \arccos\!\left(1 - \dfrac{m^2 v_0^2}{2gL(m+M)^2}\right)" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Dette er det andre steget i ballistisk pendel. Vi kombinerer p-bevaring (støtet) og energibevaring (svinget) for å gå fra kulefart til vinkelutslag. Legg merke til at massen <InlineLatex latex="(m+M)" /> kansellerer i energiligningen i steg 1 — men ikke etter vi setter inn <InlineLatex latex="V" />!</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Oblig 2, oppg. 3c — Elastisk rikosjett"
        difficulty="vanskelig"
        source="Obligatorisk innlevering"
        problem={
          <div>
            <p>
              Kulen rikosjetterer i stedet (fullstendig elastisk støt).
              <InlineLatex latex="m = 0{,}0050\;\text{kg}" />, <InlineLatex latex="M = 10\;\text{kg}" />, <InlineLatex latex="v_0 = 100\;\text{m/s}" />.
            </p>
            <p className="mt-2">Finn hastighetene etter støtet.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Elastisk → to ligninger (p-bevaring + E<sub>K</sub>-bevaring). Uttrykk V₂ fra p-ligning og substituér.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Kulens masse: <InlineLatex latex="m = 0{,}0050\;\text{kg}" /></li>
                <li>Klossens masse: <InlineLatex latex="M = 10\;\text{kg}" /></li>
                <li>Kulens startfart: <InlineLatex latex="v_0 = 100\;\text{m/s}" /></li>
                <li>Kollisjonen er <strong>fullstendig elastisk</strong></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Kulens fart <InlineLatex latex="V_2" /> og klossens fart <InlineLatex latex="V_1" /> etter støtet</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Elastisk kollisjon gir to bevaringslover. Vi kaller klossens sluttfart <InlineLatex latex="V_1" /> og kulens sluttfart <InlineLatex latex="V_2" />. Fra p-bevaring uttrykker vi <InlineLatex latex="V_2" />, substituerer i energiligningen, og løser andregradsligningen. Forkast den trivielle løsningen.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Bevegelsesmengde:</p>
              <FormulaBox
                latex="MV_1 + mV_2 = mv_0 \;\Rightarrow\; 10V_1 + 0{,}005V_2 = 0{,}50"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Kinetisk energi:</p>
              <FormulaBox
                latex="\tfrac{1}{2}MV_1^2 + \tfrac{1}{2}mV_2^2 = \tfrac{1}{2}mv_0^2 \;\Rightarrow\; 5V_1^2 + 0{,}0025V_2^2 = 25"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Fra ligning 1: <InlineLatex latex="V_2 = 100 - 2000V_1" />. Substituer i energiligningen og løs:</p>
              <FormulaBox
                latex="V_1 = \frac{2m\,v_0}{M+m} = \frac{2 \cdot 0{,}005 \cdot 100}{10{,}005} \approx \underline{\underline{0{,}10\;\text{m/s}}}"
                variant="gold"
              />
              <FormulaBox
                latex="V_2 = \frac{(m-M)v_0}{m+M} = \frac{(0{,}005-10) \cdot 100}{10{,}005} \approx \underline{\underline{-99{,}9\;\text{m/s}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="V_1 \approx 0{,}10\;\text{m/s}\;(\rightarrow), \quad V_2 \approx -99{,}9\;\text{m/s}\;(\leftarrow)" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Når <InlineLatex latex="m \ll M" /> spretter den lette partikkelen nesten tilbake med samme fart, og den tunge overtar nesten ingen bevegelsesmengde. Dette er det fysiske prinsippet bak nøytronmoderasjon i reaktorer: nøytroner bremses best av kjerner med omtrent samme masse (hydrogen).</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Oblig 2, oppg. 3d — Gjennomsnittlig kraft"
        difficulty="middels"
        source="Obligatorisk innlevering"
        problem={
          <div>
            <p>
              Med tallene fra oppgave 3c: Finn gjennomsnittlig kraft på klossen
              når støtet varer <InlineLatex latex="\Delta t = 0{,}0050\;\text{s}" />.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Impuls på klossen: <InlineLatex latex="J = \Delta p_{\text{kloss}} = MV_1 - 0 = MV_1" />.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Klossens masse: <InlineLatex latex="M = 10\;\text{kg}" /></li>
                <li>Klossens sluttfart (fra oppg. 3c): <InlineLatex latex="V_1 = 0{,}10\;\text{m/s}" /></li>
                <li>Klossen var i ro før støtet</li>
                <li>Støtets varighet: <InlineLatex latex="\Delta t = 0{,}0050\;\text{s}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Gjennomsnittlig kraft <InlineLatex latex="\bar{F}" /> på klossen under støtet</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Gjennomsnittlig kraft er lik impulsen på klossen delt på kontakttiden. Impulsen på klossen er lik endringen i klossens bevegelsesmengde: <InlineLatex latex="J = \Delta p_{\text{kloss}} = MV_1 - 0" />.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Impuls på klossen:</p>
              <FormulaBox
                latex="J = M V_1 = 10 \cdot 0{,}10 = 1{,}0\;\text{N·s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Gjennomsnittlig kraft:</p>
              <FormulaBox
                latex="\bar{F} = \frac{J}{\Delta t} = \frac{1{,}0}{0{,}0050} = \underline{\underline{200\;\text{N}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="\bar{F} = 200\;\text{N}" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Gjennomsnittskraften finner du alltid via <InlineLatex latex="\bar{F} = \Delta p / \Delta t" />. Her overføres liten bevegelsesmengde (<InlineLatex latex="1{,}0\;\text{N·s}" />) men kraften er likevel 200 N fordi kontakttiden er veldig kort. Jo kortere kollisjon, desto større gjennomsnittskraft!</p>
            </div>
          </div>
        }
      />

      {/* ── EKSAMENSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
        <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Kraftimpuls-oppgaver (ball som spretter) kommer nesten <strong>alltid</strong></li>
          <li>Bilkollisjon med bevegelsesmengde er en gjenganger</li>
          <li>Ballistisk pendel: forstå <strong>hvorfor</strong> du bruker ulike prinsipper i de to stegene</li>
          <li>Husk å konvertere km/h til m/s (del på 3,6)</li>
        </ul>
      </div>

      <ExerciseCard
        number={1}
        title="Eksamen vår 2023, oppg. 1d — Basketball kraftimpuls"
        difficulty="middels"
        source="Eksamen vår 2023"
        problem={
          <div>
            <p>
              En basketballspiller bommer, og ballen treffer plata over kurven
              med horisontal hastighet <InlineLatex latex="5{,}0\;\text{m/s}" />.
              Ballen spretter tilbake med horisontal hastighet <InlineLatex latex="4{,}0\;\text{m/s}" /> i
              motsatt retning. Kontakttid: <InlineLatex latex="0{,}15\;\text{s}" />.
              Masse: <InlineLatex latex="m = 0{,}600\;\text{kg}" />.
            </p>
            <p className="mt-2">
              a) Hvor stor var kraftimpulsen på ballen?<br />
              b) Hvor stor var den gjennomsnittlige kraften?
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Velg positiv retning. Ballen spretter TILBAKE → v₂ har motsatt fortegn.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Masse: <InlineLatex latex="m = 0{,}600\;\text{kg}" /></li>
                <li>Innkommende horisontal fart: <InlineLatex latex="5{,}0\;\text{m/s}" /></li>
                <li>Utgående horisontal fart: <InlineLatex latex="4{,}0\;\text{m/s}" /> (motsatt retning)</li>
                <li>Kontakttid: <InlineLatex latex="\Delta t = 0{,}15\;\text{s}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) Kraftimpulsen <InlineLatex latex="J" /> på ballen</li>
                <li>b) Gjennomsnittlig kraft <InlineLatex latex="\bar{F}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Klassisk kraftimpuls-oppgave. Velg positiv retning mot platen: da er <InlineLatex latex="v_1 = +5{,}0\;\text{m/s}" /> og <InlineLatex latex="v_2 = -4{,}0\;\text{m/s}" /> (ballen spretter tilbake). Bruk <InlineLatex latex="J = m\Delta v" /> og <InlineLatex latex="\bar{F} = J/\Delta t" />.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Kraftimpulsen:</p>
              <FormulaBox
                latex="J = m(v_2 - v_1) = 0{,}600 \cdot (-4{,}0 - 5{,}0) = 0{,}600 \cdot (-9{,}0) = \underline{\underline{-5{,}4\;\text{N·s}}}"
                variant="gold"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Gjennomsnittlig kraft:</p>
              <FormulaBox
                latex="\bar{F} = \frac{J}{\Delta t} = \frac{-5{,}4}{0{,}15} = \underline{\underline{-36\;\text{N}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="J = -5{,}4\;\text{N·s}, \quad |\bar{F}| = 36\;\text{N}" variant="gold" />
              <p className="text-sm mt-1">Negativt fortegn = kraften virker bort fra platen (mot spilleren).</p>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Fortegnene er avgjørende. Ballen bytter retning, så <InlineLatex latex="\Delta v = -4{,}0 - 5{,}0 = -9{,}0\;\text{m/s}" /> — ikke bare 1 m/s. Når du ser «spretter tilbake» i en oppgave: pass på fortegnet og forvent en stor impuls.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Eksamen høst 2023, oppg. 2a — Teori om kollisjonstyper"
        difficulty="lett"
        source="Eksamen høst 2023"
        problem={
          <div>
            <p>
              Hva menes med et elastisk støt, og hva menes med et fullkomment uelastisk støt?
              Hvilke bevaringslover gjelder for disse?
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Tenk: hva er bevart, og hva er IKKE bevart? Hva skjer med legemene etterpå?</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>To typer støt: elastisk og fullstendig uelastisk</li>
                <li>Bevegelsesmengde: alltid bevart ved fravær av ytre krefter</li>
                <li>Kinetisk energi: betinget bevaring</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Definisjonene på de to støttypene og hvilke bevaringslover som gjelder</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Dette er en teorioppgave. Tenk systematisk: hva skjer med legemene, og hva er bevart. Nøkkelen er å huske at bevegelsesmengde er alltid bevart, mens energibevaring avhenger av støttypen.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1 font-medium">Elastisk støt:</p>
              <p className="text-sm mb-2">Kinetisk energi er bevart i tillegg til bevegelsesmengde. Legemene spretter fra hverandre — ingen permanent deformasjon. Gjelder nøyaktig for atom- og molekylkollisjoner; tilnærmet for harde baller.</p>
              <FormulaBox
                latex="\Delta E_K = 0 \quad\text{og}\quad \Delta p_{\text{total}} = 0"
                variant="blue"
              />
              <p className="text-sm mb-1 mt-2 font-medium">Fullstendig uelastisk støt:</p>
              <p className="text-sm mb-2">Legemene henger sammen etter støtet og beveger seg med felles hastighet. Størst mulig energitap — men bevegelsesmengden er fremdeles bevart!</p>
              <FormulaBox
                latex="\Delta E_K \neq 0 \quad\text{(maks tap)}\quad\text{og}\quad \Delta p_{\text{total}} = 0"
                variant="blue"
              />
              <FormulaBox
                latex="\textbf{Alltid: bevegelsesmengde er bevart i alle støt (uten ytre krefter)}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <p className="text-sm"><strong>Elastisk:</strong> p og <InlineLatex latex="E_K" /> bevares. Legemene spretter fra hverandre.</p>
              <p className="text-sm mt-1"><strong>Fullstendig uelastisk:</strong> p bevares, <InlineLatex latex="E_K" /> bevares ikke. Legemene beveger seg med felles hastighet etter støtet.</p>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Bevegelsesmengde er alltid bevart — det er en grunnleggende naturlov. Energi kan derimot konverteres til varme og lyd. Den største feilen studenter gjør er å anta energibevaring uten å sjekke om støtet er elastisk.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Eksamen høst 2023, oppg. 2b–d — Bilkollisjon og fartsgrense"
        difficulty="vanskelig"
        source="Eksamen høst 2023"
        problem={
          <div>
            <p>
              Bil A (<InlineLatex latex="m_A = 1500\;\text{kg}" />) og bil B
              (<InlineLatex latex="m_B = 900\;\text{kg}" />) kolliderer frontalt.
              Etter støtet henger bilene sammen med fart <InlineLatex latex="27\;\text{km/h}" /> i
              bil A sin opprinnelige retning (positiv retning).
            </p>
            <p className="mt-2">
              b) En bil med 1500 kg og fart 72 km/h stanser etter 50 m. Finn friksjonskraften og bremsetiden.<br />
              c) Begge bilførerne påsto de holdt fartsgrensen (60 km/h). Er det sannsynlig?<br />
              d) Bil B kjørte i 60 km/h. Beregn farten til bil A.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>b) Bruk <InlineLatex latex="v^2 = v_0^2 + 2as" /> for å finne a, deretter F = ma og <InlineLatex latex="s = \frac{v_0+v}{2}t" />.</p>,
          },
          {
            label: "Hint 2",
            content: <p>c) Sjekk om p<sub>før</sub> = p<sub>etter</sub> stemmer med 60 km/h for begge.</p>,
          },
          {
            label: "Hint 3",
            content: <p>d) Sett inn v<sub>B</sub> = 60 km/h i p-bevaringen og løs for v<sub>A</sub>.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Bil A: <InlineLatex latex="m_A = 1500\;\text{kg}" /> (ukjent fart)</li>
                <li>Bil B: <InlineLatex latex="m_B = 900\;\text{kg}" /></li>
                <li>Etter frontalkollisjonen: felles fart <InlineLatex latex="27\;\text{km/h}" /> i A sin retning</li>
                <li>Del b): 1500 kg stanser fra 72 km/h = 20 m/s på 50 m</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>b) Friksjonskraft og bremsetid</li>
                <li>c) Kan begge ha kjørt ≤ 60 km/h?</li>
                <li>d) Farten til bil A hvis B kjørte 60 km/h</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">b) Bruk kinematikk (<InlineLatex latex="v^2 = v_0^2 + 2as" />) for akselerasjon, <InlineLatex latex="F = ma" /> for kraft, og <InlineLatex latex="t = 2s/v_0" /> for tid. c) Sjekk p-bevaring med 60 km/h for begge — stemmer det med observert sluttfart? d) Sett inn kjent v_B i p-bevaring og løs for v_A.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1 font-medium">b) Bremsing:</p>
              <FormulaBox
                latex="a = \frac{v^2 - v_0^2}{2s} = \frac{0 - 20^2}{2 \cdot 50} = -4{,}0\;\text{m/s}^2"
                variant="blue"
              />
              <FormulaBox
                latex="F = ma = 1500 \cdot 4{,}0 = \underline{\underline{6{,}0\;\text{kN}}}"
                variant="gold"
              />
              <FormulaBox
                latex="t = \frac{v_0 - v}{|a|} = \frac{20}{4{,}0} = \underline{\underline{5{,}0\;\text{s}}}"
                variant="gold"
              />
              <p className="text-sm mb-1 mt-3 font-medium">c) Sjekk 60 km/h for begge:</p>
              <FormulaBox
                latex="p_{\text{før}} = m_A \cdot 60 - m_B \cdot 60 = (1500-900) \cdot 60 = 36\,000\;\text{kg·km/h}"
                variant="blue"
              />
              <FormulaBox
                latex="p_{\text{etter}} = (m_A+m_B) \cdot 27 = 2400 \cdot 27 = 64\,800\;\text{kg·km/h}"
                variant="blue"
              />
              <p className="text-sm mt-1 mb-2"><InlineLatex latex="36\,000 \neq 64\,800" /> — begge KAN IKKE ha kjørt 60 km/h. Minst én kjørte fortere.</p>
              <p className="text-sm mb-1 font-medium">d) Finn v_A når v_B = 60 km/h (frontal = B er negativ):</p>
              <FormulaBox
                latex="m_A v_A - m_B v_B = (m_A+m_B) \cdot 27"
                variant="blue"
              />
              <FormulaBox
                latex="v_A = \frac{(m_A+m_B) \cdot 27 + m_B \cdot 60}{m_A} = \frac{2400 \cdot 27 + 900 \cdot 60}{1500} = \underline{\underline{79{,}2\;\text{km/h}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="F = 6{,}0\;\text{kN},\; t = 5{,}0\;\text{s};\quad v_A = 79{,}2\;\text{km/h}\;\text{(over fartsgrensen!)}" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Bevegelsesmengde bevares — og fysikken lyver ikke. Ved å sammenligne p_<InlineLatex latex="\text{før}" /> med p_<InlineLatex latex="\text{etter}" /> kan man rekonstruere fartsdata fra ulykker. Bil A kjørte nesten 80 km/h — godt over fartsgrensen på 60 km/h.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Eksamen høst 2023, oppg. 3d — Bowlingkule: bevegelsesmengde"
        difficulty="middels"
        source="Eksamen høst 2023"
        problem={
          <div>
            <p>
              En bowlingkule (<InlineLatex latex="m = 5{,}2\;\text{kg}" />) ruller med
              fart <InlineLatex latex="v = 7{,}3\;\text{m/s}" /> utfor en 2,0 m høy kant.
            </p>
            <p className="mt-2">Hvor treffer kulen bakken, og hva er bevegelsesmengden i det den treffer?</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Prosjektilbevegelse: v₀ₓ = 7,3 m/s, v₀y = 0. Finn falltid fra y = ½gt², deretter x = v₀ₓ·t.</p>,
          },
          {
            label: "Hint 2",
            content: <p>Bevegelsesmengde: finn total fart v = √(vₓ² + vy²), deretter p = mv.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Masse: <InlineLatex latex="m = 5{,}2\;\text{kg}" /></li>
                <li>Horisontal startfart: <InlineLatex latex="v_{0x} = 7{,}3\;\text{m/s}" /></li>
                <li>Vertikal startfart: <InlineLatex latex="v_{0y} = 0" /> (ruller horisontalt utfor kanten)</li>
                <li>Fallhøyde: <InlineLatex latex="h = 2{,}0\;\text{m}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Horisontal avstand til treffpunkt</li>
                <li>Bevegelsesmengden <InlineLatex latex="p" /> i det kulen treffer bakken</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Prosjektilbevegelse: horisontal og vertikal bevegelse er uavhengige. Finn falltid fra <InlineLatex latex="h = \frac{1}{2}gt^2" />, bruk t til å finne horisontal avstand og vertikal sluttfart. Bevegelsesmengden finner vi fra totalhastigheten med Pythagoras.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — Falltid:</p>
              <FormulaBox
                latex="t = \sqrt{\frac{2h}{g}} = \sqrt{\frac{2 \cdot 2{,}0}{9{,}81}} = 0{,}639\;\text{s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Horisontal avstand:</p>
              <FormulaBox
                latex="x = v_{0x} \cdot t = 7{,}3 \cdot 0{,}639 = \underline{\underline{4{,}66\;\text{m}}}"
                variant="gold"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Vertikal sluttfart:</p>
              <FormulaBox
                latex="v_y = g \cdot t = 9{,}81 \cdot 0{,}639 = 6{,}27\;\text{m/s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 4 — Totalhastighet og bevegelsesmengde:</p>
              <FormulaBox
                latex="v = \sqrt{v_{0x}^2 + v_y^2} = \sqrt{7{,}3^2 + 6{,}27^2} = 9{,}62\;\text{m/s}"
                variant="blue"
              />
              <FormulaBox
                latex="p = mv = 5{,}2 \cdot 9{,}62 = \underline{\underline{50\;\text{kg·m/s}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="x = 4{,}66\;\text{m},\quad p = 50\;\text{kg·m/s}" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Bevegelsesmengden er en vektorstørrelse med retning. Horisontal komponent er uforandret under hele fallet (ingen luftmotstand), men vertikal komponent øker kontinuerlig pga. tyngdekraften. Pythagoras gir totalstørrelsen.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={5}
        title="Eksamen høst 2023, oppg. 1d — Prosjektil som sprenges"
        difficulty="vanskelig"
        source="Eksamen høst 2023"
        problem={
          <div>
            <p>
              Et prosjektil med horisontal fart <InlineLatex latex="v_{0x} = 53{,}2\;\text{m/s}" /> i
              det høyeste punktet (<InlineLatex latex="y_0 = 186\;\text{m}" />, <InlineLatex latex="x_0 = 202{,}3\;\text{m}" />)
              sprenges i to like store deler. Den ene delen faller loddrett ned (<InlineLatex latex="v = 0" />).
            </p>
            <p className="mt-2">Hvor treffer den andre delen bakken?</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bevaring av bevegelsesmengde ved sprengning: m·v₀ₓ = (m/2)·0 + (m/2)·vₓ → den andre delen får dobbel horisontal fart.</p>,
          },
          {
            label: "Hint 2",
            content: <p>Fritt fall fra 186 m: finn falltid, deretter x = x₀ + vₓ·t.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Horisontal fart i toppunktet: <InlineLatex latex="v_{0x} = 53{,}2\;\text{m/s}" /></li>
                <li>Posisjon i toppunktet: <InlineLatex latex="y_0 = 186\;\text{m}" />, <InlineLatex latex="x_0 = 202{,}3\;\text{m}" /></li>
                <li>Sprengning: to like store deler (<InlineLatex latex="m/2" /> hver)</li>
                <li>Del 1 faller loddrett ned (horisontal fart = 0 etter sprengning)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Treffpunktet (x-koordinat) til den andre delen</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold mb-1">Strategi</p>
              <p className="text-sm">Sprengning er en eksplosjon — intern prosess. Horisontal bevegelsesmengde er bevart (ingen ytre horisontal kraft). Deretter er del 2 i prosjektilbevegelse fra høyde 186 m med horisontal fart funnet fra p-bevaring.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="text-sm mb-1">Steg 1 — P-bevaring horisontalt under sprengningen:</p>
              <FormulaBox
                latex="m \cdot v_{0x} = \frac{m}{2} \cdot 0 + \frac{m}{2} \cdot v_x \;\Rightarrow\; v_x = 2\,v_{0x} = 2 \cdot 53{,}2 = 106{,}5\;\text{m/s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 2 — Falltid fra toppunktet (<InlineLatex latex="v_{0y} = 0" /> i toppunktet):</p>
              <FormulaBox
                latex="t = \sqrt{\frac{2y_0}{g}} = \sqrt{\frac{2 \cdot 186}{9{,}81}} = 6{,}16\;\text{s}"
                variant="blue"
              />
              <p className="text-sm mt-2 mb-1">Steg 3 — Treffpunkt for del 2:</p>
              <FormulaBox
                latex="x = x_0 + v_x \cdot t = 202{,}3 + 106{,}5 \cdot 6{,}16 = \underline{\underline{858\;\text{m fra startpunktet}}}"
                variant="gold"
              />
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="x = 858\;\text{m fra startpunktet}" variant="gold" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Sprengning er en intern prosess — horisontal bevegelsesmengde er bevart. Når én del mister all horisontal fart, må den andre kompensere: den flyr dobbelt så fort horisontalt og lander dobbelt så langt (fra toppunktet) sammenlignet med det usprengde prosjektilet.</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
