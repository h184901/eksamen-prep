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
            <p><strong>Hva vet vi?</strong> m = 0,40 kg, v₁ = +30 m/s (mot vegg), v₂ = −20 m/s (tilbake), Δt = 0,010 s.</p>
            <p><strong>Impuls-momentum-teoremet:</strong></p>
            <FormulaBox
              latex="J = m(v_2 - v_1) = 0{,}40 \cdot (-20 - 30) = -20\;\text{N·s}"
              variant="blue"
            />
            <p><strong>Gjennomsnittskraft:</strong></p>
            <FormulaBox
              latex="\bar{F} = \frac{J}{\Delta t} = \frac{-20}{0{,}010} = \underline{\underline{-2000\;\text{N}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Negativt fortegn = kraften virker mot ballens innkommende retning (bort fra veggen). Størrelsen er 2000 N ≈ 200 ganger tyngdekraften på ballen!
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Husk alltid å ta med retningen. Når noe «spretter tilbake» har v₁ og v₂ motsatte fortegn, og Δp blir stor.</p>
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
            <p><strong>Komponenter etter spark:</strong></p>
            <FormulaBox
              latex="v_{2x} = 30\cos 45° = 21{,}2\;\text{m/s}, \quad v_{2y} = 30\sin 45° = 21{,}2\;\text{m/s}"
              variant="blue"
            />
            <p><strong>Kraftimpuls (komponentvis):</strong></p>
            <FormulaBox
              latex="J_x = m(v_{2x} - v_{1x}) = 0{,}40(21{,}2 - (-20)) = 0{,}40 \cdot 41{,}2 = 16{,}5\;\text{N·s}"
              variant="blue"
            />
            <FormulaBox
              latex="J_y = m(v_{2y} - v_{1y}) = 0{,}40(21{,}2 - 0) = 8{,}5\;\text{N·s}"
              variant="blue"
            />
            <FormulaBox
              latex="J = \sqrt{J_x^2 + J_y^2} = \sqrt{16{,}5^2 + 8{,}5^2} = \underline{\underline{18{,}5\;\text{N·s}}}"
              variant="gold"
            />
            <FormulaBox
              latex="\bar{F} = \frac{J}{\Delta t} = \frac{18{,}5}{0{,}010} = \underline{\underline{1{,}9\;\text{kN}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> I 2D beregner du impulsen komponentvis, deretter størrelsen med Pythagoras.</p>
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
            <p><strong>Før:</strong> <InlineLatex latex="p_{\text{total}} = 0" /> (alt i ro).</p>
            <p><strong>Etter:</strong></p>
            <FormulaBox
              latex="m_A v_A + m_B v_B = 0 \;\Rightarrow\; v_A = -\frac{m_B}{m_A} v_B"
              variant="blue"
            />
            <FormulaBox
              latex="v_A = -\frac{0{,}005}{3{,}0} \cdot 300 = \underline{\underline{-0{,}50\;\text{m/s}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Negativt fortegn betyr rifla beveger seg bakover. Liten fart fordi rifla har mye større masse enn kulen.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Bevegelsesmengde bevares. Liten masse × stor fart = stor masse × liten fart. Derfor er rekylen moderat selv om kulen er rask.</p>
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
            <p><strong>Bevaring av bevegelsesmengde:</strong></p>
            <FormulaBox
              latex="v_2 = \frac{m_A v_{A1} + m_B v_{B1}}{m_A + m_B} = \frac{0{,}50 \cdot 2{,}0 + 0{,}30 \cdot (-2{,}0)}{0{,}80} = \frac{0{,}40}{0{,}80} = \underline{\underline{0{,}50\;\text{m/s}}}"
              variant="gold"
            />
            <p><strong>Energi før:</strong></p>
            <FormulaBox
              latex="E_{K1} = \tfrac{1}{2} \cdot 0{,}50 \cdot 2^2 + \tfrac{1}{2} \cdot 0{,}30 \cdot 2^2 = 1{,}0 + 0{,}60 = 1{,}60\;\text{J}"
              variant="blue"
            />
            <p><strong>Energi etter:</strong></p>
            <FormulaBox
              latex="E_{K2} = \tfrac{1}{2} \cdot 0{,}80 \cdot 0{,}50^2 = 0{,}10\;\text{J}"
              variant="blue"
            />
            <FormulaBox
              latex="\Delta E_K = 1{,}60 - 0{,}10 = \underline{\underline{1{,}50\;\text{J (tapt)}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Hele 94% av kinetisk energi er tapt til varme og deformasjon! Bevegelsesmengden er likevel bevart: p<sub>før</sub> = 0,40 = p<sub>etter</sub>.
            </p>
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
            <p><strong>Steg 1 — Bevaring av bevegelsesmengde (under støtet):</strong></p>
            <FormulaBox
              latex="mv_0 = (M+m)V \;\Rightarrow\; V = \frac{m}{M+m}\,v_0"
              variant="blue"
            />
            <p><strong>Steg 2 — Bevaring av mekanisk energi (etter støtet):</strong></p>
            <FormulaBox
              latex="\tfrac{1}{2}(M+m)V^2 = (M+m)gy \;\Rightarrow\; V = \sqrt{2gy}"
              variant="blue"
            />
            <p><strong>Kombinerer:</strong></p>
            <FormulaBox
              latex="v_0 = \frac{M+m}{m}\sqrt{2gy} = \frac{2{,}005}{0{,}005}\sqrt{2 \cdot 9{,}81 \cdot 0{,}030}"
              variant="blue"
            />
            <FormulaBox
              latex="v_0 = 401 \cdot 0{,}767 = \underline{\underline{308\;\text{m/s}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Du kan IKKE bruke energibevaring under støtet (energi går tapt), og du kan IKKE bruke p-bevaring under svinget (snorkraft er en ytre kraft). Du MÅ bruke riktig prinsipp i riktig steg!</p>
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
            <p><strong>x-retning (østover):</strong></p>
            <FormulaBox
              latex="(m_A+m_B)v_x = m_B v_B \;\Rightarrow\; v_x = \frac{2000 \cdot 10}{3000} = 6{,}67\;\text{m/s}"
              variant="blue"
            />
            <p><strong>y-retning (nordover):</strong></p>
            <FormulaBox
              latex="(m_A+m_B)v_y = m_A v_A \;\Rightarrow\; v_y = \frac{1000 \cdot 15}{3000} = 5{,}00\;\text{m/s}"
              variant="blue"
            />
            <FormulaBox
              latex="v = \sqrt{v_x^2 + v_y^2} = \sqrt{6{,}67^2 + 5{,}00^2} = \underline{\underline{8{,}3\;\text{m/s}}}"
              variant="gold"
            />
            <FormulaBox
              latex="\alpha = \arctan\!\left(\frac{v_y}{v_x}\right) = \arctan\!\left(\frac{5{,}00}{6{,}67}\right) = \underline{\underline{37°\;\text{nord for øst}}}"
              variant="gold"
            />
            <p><strong>Energitap:</strong></p>
            <FormulaBox
              latex="E_{K,\text{før}} = \tfrac{1}{2} \cdot 1000 \cdot 15^2 + \tfrac{1}{2} \cdot 2000 \cdot 10^2 = 212\,500\;\text{J}"
              variant="blue"
            />
            <FormulaBox
              latex="E_{K,\text{etter}} = \tfrac{1}{2} \cdot 3000 \cdot 8{,}3^2 = 103\,335\;\text{J}"
              variant="blue"
            />
            <FormulaBox
              latex="\Delta E_K = 212\,500 - 103\,335 = \underline{\underline{109\;\text{kJ (tapt)}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> I 2D-kollisjoner bruker du p-bevaring komponentvis. Finn vₓ og vy separat, deretter Pythagoras for størrelsen.</p>
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
            <p><strong>Ligning 1 — Bevaring av bevegelsesmengde:</strong></p>
            <FormulaBox
              latex="0{,}50 \cdot v_{A2} + 0{,}30 \cdot v_{B2} = 0{,}50 \cdot 2 + 0{,}30 \cdot (-2) = 0{,}40"
              variant="blue"
            />
            <p><strong>Ligning 2 — Bevaring av kinetisk energi:</strong></p>
            <FormulaBox
              latex="\tfrac{1}{2} \cdot 0{,}50 \cdot v_{A2}^2 + \tfrac{1}{2} \cdot 0{,}30 \cdot v_{B2}^2 = 1{,}60"
              variant="blue"
            />
            <p><strong>Fra ligning 1:</strong> <InlineLatex latex="v_{A2} = 0{,}80 - 0{,}60\,v_{B2}" /></p>
            <p>Substituerer inn i ligning 2 og løser andregradsligningen:</p>
            <FormulaBox
              latex="v_{B2} = 3{,}0\;\text{m/s} \quad \text{eller} \quad v_{B2} = -2{,}0\;\text{m/s (triviell, forkastes)}"
              variant="blue"
            />
            <FormulaBox
              latex="v_{A2} = 0{,}80 - 0{,}60 \cdot 3{,}0 = \underline{\underline{-1{,}0\;\text{m/s}}}"
              variant="gold"
            />
            <FormulaBox
              latex="v_{B2} = \underline{\underline{3{,}0\;\text{m/s}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              A snur retning (−1,0 m/s = mot venstre), B spretter ut mot høyre (3,0 m/s). Sjekk: p<sub>etter</sub> = 0,50·(−1) + 0,30·3 = 0,40 ✓ og E<sub>K,etter</sub> = 0,25 + 1,35 = 1,60 J ✓
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Elastisk kollisjon gir et andregradsligningssystem. Forkast alltid den trivielle løsningen (der «ingenting skjer»).</p>
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
            <p><strong>x-retning:</strong></p>
            <FormulaBox
              latex="v_{B2x} = \frac{m_A v_{A1} - m_A v_{A2}\cos\alpha}{m_B} = \frac{20 \cdot 2 - 20 \cdot 1 \cdot \cos 30°}{12} = 1{,}89\;\text{m/s}"
              variant="blue"
            />
            <p><strong>y-retning:</strong></p>
            <FormulaBox
              latex="v_{B2y} = \frac{0 - m_A v_{A2}\sin\alpha}{m_B} = \frac{-20 \cdot 1 \cdot \sin 30°}{12} = -0{,}83\;\text{m/s}"
              variant="blue"
            />
            <FormulaBox
              latex="v_{B2} = \sqrt{1{,}89^2 + 0{,}83^2} = \underline{\underline{2{,}07\;\text{m/s}}}"
              variant="gold"
            />
            <FormulaBox
              latex="\beta = \arctan\!\left(\frac{0{,}83}{1{,}89}\right) = \underline{\underline{23{,}7°\;\text{under horisontal}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> I 2D-kollisjoner bevares p<sub>x</sub> og p<sub>y</sub> uavhengig. Bruk komponentmetoden systematisk.</p>
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
            <p><strong>Bevaring av bevegelsesmengde (under støtet):</strong></p>
            <FormulaBox
              latex="mv_0 = (m + M)V"
              variant="blue"
            />
            <FormulaBox
              latex="V = \frac{m}{m+M}\,v_0"
              variant="gold"
            />
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
            <p><strong>Energibevaring etter støtet:</strong></p>
            <FormulaBox
              latex="\tfrac{1}{2}(m+M)V^2 = (m+M)gL(1-\cos\varphi_{\max})"
              variant="blue"
            />
            <p>Med <InlineLatex latex="V = \frac{m}{m+M}v_0" />:</p>
            <FormulaBox
              latex="\tfrac{1}{2}\frac{m^2 v_0^2}{m+M} = (m+M)gL(1-\cos\varphi_{\max})"
              variant="blue"
            />
            <FormulaBox
              latex="1-\cos\varphi_{\max} = \frac{m^2 v_0^2}{2gL(m+M)^2}"
              variant="blue"
            />
            <FormulaBox
              latex="\varphi_{\max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right) \quad \square"
              variant="gold"
            />
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
            <p><strong>Bevegelsesmengde:</strong> <InlineLatex latex="MV_1 + mV_2 = mv_0 \;\Rightarrow\; 10V_1 + 0{,}005V_2 = 0{,}50" /></p>
            <p><strong>Energi:</strong> <InlineLatex latex="0{,}0025V_2^2 + 5V_1^2 = 25" /></p>
            <p>Fra ligning 1: <InlineLatex latex="V_2 = 100 - 2000V_1" /></p>
            <p>Substituerer og løser:</p>
            <FormulaBox
              latex="V_1 = \frac{1000}{10005} \approx \underline{\underline{0{,}10\;\text{m/s}}}"
              variant="gold"
            />
            <FormulaBox
              latex="V_2 = 100 - 2000 \cdot 0{,}0999 = \underline{\underline{-99{,}9\;\text{m/s}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Kulen spretter nesten tilbake med samme fart (−99,9 m/s), og klossen får bare 0,10 m/s. Fordi m ≪ M overføres nesten ingen energi.
            </p>
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
            <FormulaBox
              latex="\bar{F} = \frac{MV_1}{\Delta t} = \frac{10 \cdot 0{,}10}{0{,}0050} = \underline{\underline{200\;\text{N}}}"
              variant="gold"
            />
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
            <p>Positiv retning: mot platen. Da: <InlineLatex latex="v_1 = +5{,}0\;\text{m/s}" />, <InlineLatex latex="v_2 = -4{,}0\;\text{m/s}" />.</p>
            <p><strong>a) Kraftimpuls:</strong></p>
            <FormulaBox
              latex="J = m(v_2 - v_1) = 0{,}600 \cdot (-4{,}0 - 5{,}0) = \underline{\underline{-5{,}4\;\text{N·s}}}"
              variant="gold"
            />
            <p><strong>b) Gjennomsnittlig kraft:</strong></p>
            <FormulaBox
              latex="\bar{F} = \frac{J}{\Delta t} = \frac{-5{,}4}{0{,}15} = \underline{\underline{-36\;\text{N}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Negativt fortegn = kraften virker bort fra platen (mot spilleren). Størrelsen er 36 N.
            </p>
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
            <p><strong>Elastisk støt:</strong> Kinetisk energi ER bevart i tillegg til bevegelsesmengde. Legemene spretter fra hverandre.</p>
            <p><strong>Fullstendig inelastisk støt:</strong> Legemene henger sammen etter støtet og beveger seg med felles hastighet. Bevegelsesmengde er bevart, men kinetisk energi er IKKE bevart (størst mulig tap).</p>
            <p><strong>Felles:</strong> Bevegelsesmengde er bevart i ALLE kollisjoner (når ytre krefter er neglisjerbare).</p>
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
            <p><strong>b) Bremsestrekk:</strong></p>
            <FormulaBox
              latex="a = \frac{v^2 - v_0^2}{2s} = \frac{0 - 20^2}{2 \cdot 50} = -4{,}0\;\text{m/s}^2"
              variant="blue"
            />
            <FormulaBox
              latex="R = ma = 1500 \cdot (-4{,}0) = \underline{\underline{-6{,}0\;\text{kN}}}"
              variant="gold"
            />
            <FormulaBox
              latex="t = \frac{2s}{v_0} = \frac{100}{20} = \underline{\underline{5{,}0\;\text{s}}}"
              variant="gold"
            />

            <p><strong>c) Var 60 km/h sannsynlig for begge?</strong></p>
            <FormulaBox
              latex="p_{\text{før}} = 1500 \cdot 60 - 900 \cdot 60 = 36\,000\;\text{kg·km/h}"
              variant="blue"
            />
            <FormulaBox
              latex="p_{\text{etter}} = 2400 \cdot 27 = 64\,800\;\text{kg·km/h}"
              variant="blue"
            />
            <p>
              <InlineLatex latex="36\,000 \neq 64\,800" /> — <strong>begge KAN IKKE ha kjørt i 60 km/h!</strong> Minst
              én kjørte fortere.
            </p>

            <p><strong>d) Finn v<sub>A</sub> når v<sub>B</sub> = 60 km/h:</strong></p>
            <FormulaBox
              latex="m_A v_A - m_B v_B = (m_A + m_B) \cdot 27"
              variant="blue"
            />
            <FormulaBox
              latex="v_A = \frac{(m_A+m_B) \cdot 27 + m_B \cdot 60}{m_A} = \frac{2400 \cdot 27 + 900 \cdot 60}{1500} = \underline{\underline{79{,}2\;\text{km/h}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Bil A kjørte nesten 80 km/h — godt over fartsgrensen. Fysikken avslører den skyldige!
            </p>
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
            <p><strong>Falltid:</strong></p>
            <FormulaBox
              latex="t = \sqrt{\frac{2h}{g}} = \sqrt{\frac{2 \cdot 2{,}0}{9{,}81}} = 0{,}639\;\text{s}"
              variant="blue"
            />
            <p><strong>Horisontal avstand:</strong></p>
            <FormulaBox
              latex="x = v_{0x} \cdot t = 7{,}3 \cdot 0{,}639 = \underline{\underline{4{,}66\;\text{m}}}"
              variant="gold"
            />
            <p><strong>Vertikal hastighet ved bakken:</strong></p>
            <FormulaBox
              latex="v_y = gt = 9{,}81 \cdot 0{,}639 = 6{,}27\;\text{m/s}"
              variant="blue"
            />
            <p><strong>Total fart og bevegelsesmengde:</strong></p>
            <FormulaBox
              latex="v = \sqrt{7{,}3^2 + 6{,}27^2} = 9{,}62\;\text{m/s}"
              variant="blue"
            />
            <FormulaBox
              latex="p = mv = 5{,}2 \cdot 9{,}62 = \underline{\underline{50\;\text{kg·m/s}}}"
              variant="gold"
            />
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
            <p><strong>Bevaring av bevegelsesmengde (horisontalt):</strong></p>
            <FormulaBox
              latex="m \cdot v_{0x} = \frac{m}{2} \cdot 0 + \frac{m}{2} \cdot v_x \;\Rightarrow\; v_x = 2 \cdot v_{0x} = 106{,}5\;\text{m/s}"
              variant="blue"
            />
            <p><strong>Falltid fra toppunktet:</strong></p>
            <FormulaBox
              latex="t = \sqrt{\frac{2 \cdot 186}{9{,}81}} = 6{,}16\;\text{s}"
              variant="blue"
            />
            <p><strong>Treffpunkt:</strong></p>
            <FormulaBox
              latex="x = 202{,}3 + 106{,}5 \cdot 6{,}16 = \underline{\underline{858\;\text{m fra startpunktet}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Ved sprengning bevares p<sub>total</sub>. Når én del mister all horisontal fart, må den andre kompensere — den flyr dobbelt så langt!</p>
          </div>
        }
      />
    </div>
  );
}
