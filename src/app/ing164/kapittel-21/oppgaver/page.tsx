"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Kapittel 21</h2>

      {/* ── OPPGAVESTRATEGIER ── */}
      <h3 className="text-xl font-bold mt-8 mb-4">Oppgavestrategier</h3>

      <div className="space-y-6">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Strategi: Coulombs lov-oppgaver</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Tegn figur med alle ladninger og avstander</li>
            <li>Konverter alle enheter til SI (C, m)</li>
            <li>Beregn størrelsen av kraften med <InlineLatex latex="F = k|q_1q_2|/r^2" /></li>
            <li>Bestem retningen: like ladninger → frastøtning, ulike → tiltrekning</li>
            <li>For flere ladninger: beregn kraft fra hver separat, dekomponér i x og y, og summér</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Strategi: E-felt-oppgaver</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Identifiser kildeladning(ene) og punktet der du skal finne feltet</li>
            <li>Finn avstand r fra hver kildeladning til punktet</li>
            <li>Beregn <InlineLatex latex="E = k|q|/r^2" /> for hver kildeladning</li>
            <li>Finn retningen: bort fra positive, mot negative ladninger</li>
            <li>Dekomponér i x- og y-komponenter og summér</li>
            <li>Finn total størrelse: <InlineLatex latex="E = \sqrt{E_x^2 + E_y^2}" /></li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Strategi: Ladning i uniformt felt</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Finn kraften: <InlineLatex latex="F = qE" /> (husk fortegn på q!)</li>
            <li>Finn akselerasjonen: <InlineLatex latex="a = F/m" /></li>
            <li>Bruk kinematikkformlene for konstant akselerasjon</li>
            <li>For 2D-bevegelse: behandle x og y separat (som prosjektilbevegelse)</li>
          </ol>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil</h4>
          <ul className="space-y-1.5 text-sm">
            <li>• Glemmer å konvertere µC → C, nC → C, cm → m</li>
            <li>• Blander størrelse og retning — bruk absoluttverdien i Coulombs lov</li>
            <li>• Glemmer at E-felt er en vektor — man kan ikke bare addere størrelsene</li>
            <li>• Bruker feil fortegn for elektronets ladning</li>
            <li>• Glemmer at kraften på negativ ladning er <em>motsatt</em> E-feltretningen</li>
          </ul>
        </div>
      </div>

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <h3 className="text-xl font-bold mt-12 mb-4">Gjennomgåtte eksempler</h3>

      <ExerciseCard
        number={1}
        title="Coulombs lov — to punktladninger"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              To punktladninger <InlineLatex latex="q_1 = +25\;\text{nC}" /> og{" "}
              <InlineLatex latex="q_2 = -75\;\text{nC}" /> er plassert i en avstand{" "}
              <InlineLatex latex="r = 3{,}0\;\text{cm}" /> fra hverandre.
            </p>
            <p className="mt-2">Finn størrelsen på den elektriske kraften mellom dem.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bruk Coulombs lov. Husk å konvertere nC til C og cm til m.</p>,
          },
          {
            label: "Hint 2",
            content: (
              <p>
                <InlineLatex latex="25\;\text{nC} = 25 \cdot 10^{-9}\;\text{C}" /> og{" "}
                <InlineLatex latex="3{,}0\;\text{cm} = 0{,}030\;\text{m}" />
              </p>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li><InlineLatex latex="q_1 = +25\;\text{nC} = 25 \cdot 10^{-9}\;\text{C}" /></li>
              <li><InlineLatex latex="q_2 = -75\;\text{nC} = -75 \cdot 10^{-9}\;\text{C}" /></li>
              <li><InlineLatex latex="r = 3{,}0\;\text{cm} = 0{,}030\;\text{m}" /></li>
            </ul>

            <p><strong>Coulombs lov:</strong></p>
            <FormulaBox
              latex="F_e = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 q_2|}{r^2} = 8{,}99 \cdot 10^9 \cdot \frac{|25 \cdot 10^{-9} \cdot (-75 \cdot 10^{-9})|}{(0{,}030)^2}"
              variant="blue"
            />
            <FormulaBox
              latex="F_e = 8{,}99 \cdot 10^9 \cdot \frac{1{,}875 \cdot 10^{-15}}{9{,}0 \cdot 10^{-4}} = \underline{\underline{0{,}0187\;\text{N}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Kraften er <strong>tiltrekkende</strong> fordi ladningene har motsatt fortegn.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Konverter alltid til SI-enheter (C og m) før du setter inn i formelen.</p>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Resultantkraft fra to ladninger (2D)"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              Tre ladninger er plassert som vist: <InlineLatex latex="q_1 = 2{,}0\;\mu\text{C}" /> i (0, 0,30 m),{" "}
              <InlineLatex latex="q_2 = 2{,}0\;\mu\text{C}" /> i (0, −0,30 m), og{" "}
              <InlineLatex latex="q_3 = 4{,}0\;\mu\text{C}" /> i (0,40 m, 0).
            </p>
            <p className="mt-2">
              Finn resultantkraften på <InlineLatex latex="q_3" /> fra de to andre ladningene.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: (
              <p>
                Finn avstanden r fra q₁ (og q₂) til q₃ med Pytagoras.
                Symmetrien i oppsettet forenkler beregningen.
              </p>
            ),
          },
          {
            label: "Hint 2",
            content: (
              <div>
                <p><InlineLatex latex="r = \sqrt{0{,}3^2 + 0{,}4^2} = 0{,}5\;\text{m}" /></p>
                <p>Vinkelen: <InlineLatex latex="\theta = \tan^{-1}(0{,}3/0{,}4) = 36{,}9°" /></p>
              </div>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Steg 1: Finn avstanden</strong></p>
            <FormulaBox latex="r = \sqrt{0{,}3^2 + 0{,}4^2} = 0{,}5\;\text{m}" variant="blue" />
            <FormulaBox latex="\theta = \tan^{-1}\!\left(\frac{0{,}3}{0{,}4}\right) = 36{,}9°" variant="blue" />

            <p><strong>Steg 2: Beregn kreftene</strong></p>
            <FormulaBox
              latex="F_1 = F_2 = \frac{1}{4\pi\varepsilon_0}\frac{|q_1 q_3|}{r^2} = 8{,}99\cdot10^9 \cdot \frac{2{,}0\cdot10^{-6}\cdot 4{,}0\cdot10^{-6}}{0{,}5^2} = 0{,}29\;\text{N}"
              variant="blue"
            />

            <p><strong>Steg 3: Dekomponér og summér</strong></p>
            <p className="text-sm">
              Begge kreftene har lik x-komponent (peker i positiv x-retning), men
              y-komponentene er like store og motsatte (symmetri!):
            </p>
            <FormulaBox
              latex="\sum F_x = F_1\cos 36{,}9° + F_2\cos 36{,}9° = 2 \cdot 0{,}29 \cdot 0{,}8 = \underline{\underline{0{,}46\;\text{N}}}"
              variant="gold"
            />
            <FormulaBox
              latex="\sum F_y = -F_1\sin 36{,}9° + F_2\sin 36{,}9° = \underline{\underline{0}}"
              variant="gold"
            />
            <p className="text-sm">
              Resultantkraften er <InlineLatex latex="F = 0{,}46\;\text{N}" /> i positiv x-retning.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Bruk symmetri for å forenkle! Når to ladninger er symmetrisk plassert, kansellerer y-komponentene ofte hverandre.</p>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="E-felt fra punktladning i et punkt"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En ladning <InlineLatex latex="q = -8{,}0\;\text{nC}" /> er plassert i origo.
              Finn det elektriske feltet i punktet P = (1,2 m, −1,6 m).
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Finn avstanden r fra ladningen til P med Pytagoras. Finn deretter enhetsvektoren r̂.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Steg 1: Avstand</strong></p>
            <FormulaBox latex="r = \sqrt{1{,}6^2 + 1{,}2^2} = 2{,}0\;\text{m}" variant="blue" />

            <p><strong>Steg 2: Enhetsvektor</strong></p>
            <FormulaBox latex="\hat{r} = \frac{\vec{r}}{r} = \frac{1{,}6\,\hat{\imath} - 1{,}2\,\hat{\jmath}}{2} = 0{,}8\,\hat{\imath} - 0{,}6\,\hat{\jmath}" variant="blue" />

            <p><strong>Steg 3: E-felt (husk at q er negativ!)</strong></p>
            <FormulaBox
              latex="\vec{E} = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}\hat{r} = 8{,}99\cdot10^9 \cdot \frac{-8{,}0\cdot10^{-9}}{(2{,}0)^2} \cdot (0{,}8\,\hat{\imath} - 0{,}6\,\hat{\jmath})"
              variant="blue"
            />
            <FormulaBox
              latex="\vec{E} = \underline{\underline{(-11\,\hat{\imath} + 14\,\hat{\jmath})\;\text{N/C}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Feltet peker <strong>mot</strong> den negative ladningen, som forventet.
              Negativt fortegn på q snur retningen på r̂.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Når q er negativ, snu ikke r̂ manuelt — la fortegnet i formelen ta seg av retningen automatisk.</p>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Elektron mellom parallelle plater"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              Mellom to store parallelle plater er det et uniformt elektrisk felt{" "}
              <InlineLatex latex="E = 1{,}0 \cdot 10^4\;\text{N/C}" /> rettet oppover.
              Platene har avstand 1,0 cm. Et elektron{" "}
              (<InlineLatex latex="q = -e = -1{,}60 \cdot 10^{-19}\;\text{C}" />,{" "}
              <InlineLatex latex="m_e = 9{,}11 \cdot 10^{-31}\;\text{kg}" />):
            </p>
            <p className="mt-2">a) Finn kraften på elektronet.</p>
            <p>b) Finn farten etter 1,0 cm fall (fra ro).</p>
            <p>c) Finn tiden det tar.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Kraften: F = qE. Husk at elektronet har negativ ladning, så kraften er motsatt feltretningen (nedover).</p>,
          },
          {
            label: "Hint 2",
            content: <p>Akselerasjonen er konstant, så bruk kinematikkformlene: v² = v₀² + 2a·Δy og v = v₀ + at.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Kraft på elektronet</strong></p>
            <FormulaBox
              latex="F_e = qE = (-1{,}60\cdot10^{-19})(1{,}0\cdot10^4) = \underline{\underline{-1{,}6\cdot10^{-15}\;\text{N}}}"
              variant="gold"
            />
            <p className="text-sm">Negativt fortegn betyr kraften er nedover (motsatt E).</p>

            <p><strong>Akselerasjon:</strong></p>
            <FormulaBox
              latex="a_y = \frac{F_e}{m_e} = \frac{-1{,}6\cdot10^{-15}}{9{,}11\cdot10^{-31}} = -1{,}76\cdot10^{15}\;\text{m/s}^2"
              variant="blue"
            />

            <p><strong>b) Fart etter 1,0 cm</strong></p>
            <FormulaBox
              latex="v^2 = v_0^2 + 2a\Delta y = 2 \cdot 1{,}76\cdot10^{15} \cdot 0{,}01"
              variant="blue"
            />
            <FormulaBox
              latex="v = \sqrt{2a\Delta y} = \underline{\underline{5{,}93 \cdot 10^6\;\text{m/s}}}"
              variant="gold"
            />

            <p><strong>c) Tid</strong></p>
            <FormulaBox
              latex="t = \frac{v}{a} = \frac{5{,}93\cdot10^6}{1{,}76\cdot10^{15}} = \underline{\underline{3{,}37 \cdot 10^{-9}\;\text{s}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Elektroner i uniformt felt oppfører seg som en ball i tyngdefelt — bruk kinematikkformlene du kan fra kap. 2!</p>
          </div>
        }
      />

      <ExerciseCard
        number={5}
        title="Elektron skutt horisontalt mellom plater"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              Et elektron skytes inn horisontalt med fart{" "}
              <InlineLatex latex="v_0 = 1{,}0 \cdot 10^7\;\text{m/s}" /> mellom to
              parallelle plater. Feltet er{" "}
              <InlineLatex latex="E = 1{,}0 \cdot 10^4\;\text{N/C}" /> rettet nedover.
              Platenes lengde er <InlineLatex latex="x = 2{,}0\;\text{cm}" />.
            </p>
            <p className="mt-2">
              Finn avbøyningen (y) og den vertikale hastigheten (v_y) idet elektronet
              forlater platene.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Tenk prosjektilbevegelse: ax = 0 (konstant horisontal fart), ay = konstant (fra E-feltet). Finn først tiden elektronet bruker mellom platene.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Steg 1:</strong> Akselerasjon og kinematikk:</p>
            <FormulaBox latex="a_y = -1{,}76\cdot10^{15}\;\text{m/s}^2, \quad a_x = 0" variant="blue" />

            <p><strong>Steg 2:</strong> Tid mellom platene:</p>
            <FormulaBox
              latex="t = \frac{x}{v_0} = \frac{0{,}020}{1{,}0\cdot10^7} = 2{,}0\cdot10^{-9}\;\text{s}"
              variant="blue"
            />

            <p><strong>Steg 3:</strong> Vertikal avbøyning:</p>
            <FormulaBox
              latex="y = \tfrac{1}{2}a_y t^2 = \tfrac{1}{2}(-1{,}76\cdot10^{15})(2{,}0\cdot10^{-9})^2 = \underline{\underline{-3{,}52\;\text{mm}}}"
              variant="gold"
            />

            <p><strong>Steg 4:</strong> Vertikal hastighet:</p>
            <FormulaBox
              latex="v_y = a_y t = (-1{,}76\cdot10^{15})(2{,}0\cdot10^{-9}) = \underline{\underline{-3{,}52\cdot10^6\;\text{m/s}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Denne oppgaven er identisk med prosjektilbevegelse fra kap. 3. x-retning: konstant fart. y-retning: konstant akselerasjon fra E-feltet.</p>
          </div>
        }
      />

      {/* ── ØVINGSOPPGAVER ── */}
      <h3 className="text-xl font-bold mt-12 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Kraft mellom elektron og proton"
        difficulty="lett"
        source="Oblig 3, oppg. 2d"
        problem={
          <div>
            <p>
              Beregn den elektriske kraften mellom et elektron og et proton med
              innbyrdes avstand <InlineLatex latex="0{,}529 \cdot 10^{-9}\;\text{m}" /> (Bohrs radius).
              Hvilken akselerasjon vil elektronet få når det påvirkes av denne kraften?
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Begge har ladning med størrelse e. Bruk Coulombs lov for kraften, og Newtons 2. lov for akselerasjonen.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Kraft:</strong></p>
            <FormulaBox
              latex="F = \frac{1}{4\pi\varepsilon_0}\frac{e^2}{r^2} = 8{,}99\cdot10^9 \cdot \frac{(1{,}60\cdot10^{-19})^2}{(0{,}529\cdot10^{-9})^2} = \underline{\underline{8{,}23 \cdot 10^{-8}\;\text{N}}}"
              variant="gold"
            />
            <p><strong>Akselerasjon på elektronet:</strong></p>
            <FormulaBox
              latex="a = \frac{F}{m_e} = \frac{8{,}23\cdot10^{-8}}{9{,}11\cdot10^{-31}} = \underline{\underline{9{,}03 \cdot 10^{22}\;\text{m/s}^2}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Enorm akselerasjon! Men elektronet har også svært liten masse.
            </p>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Uniformt felt mellom parallelle plater"
        difficulty="middels"
        source="Oblig 3, oppg. 2a-b"
        problem={
          <div>
            <p>
              To plane, parallelle metallskiver er plassert i innbyrdes avstand{" "}
              <InlineLatex latex="d = 0{,}050\;\text{m}" />. Platene er koplet til en spenningskilde på 500 V.
            </p>
            <p className="mt-2">a) Forklar hva vi mener med et uniformt elektrisk felt. Hva blir den elektriske feltstyrken mellom platene?</p>
            <p>b) Et elektron slippes fra ro ved den negative plata. Hvilken fart har elektronet når det treffer den positive plata? Hvor lang tid bruker det?</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Uniformt felt: E = V/d. Bruk dette for å finne feltstyrken.</p>,
          },
          {
            label: "Hint 2",
            content: <p>For del b: Finn akselerasjonen a = eE/m, bruk deretter kinematikk med v₀ = 0.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Uniformt felt</strong> betyr at feltet har <em>samme størrelse og retning overalt</em> mellom platene.</p>
            <FormulaBox
              latex="E = \frac{V}{d} = \frac{500}{0{,}050} = \underline{\underline{1{,}0 \cdot 10^4\;\text{V/m}}}"
              variant="gold"
            />

            <p><strong>b) Fart og tid</strong></p>
            <FormulaBox latex="a = \frac{eE}{m_e} = \frac{1{,}60\cdot10^{-19}\cdot 1{,}0\cdot10^4}{9{,}11\cdot10^{-31}} = 1{,}76\cdot10^{15}\;\text{m/s}^2" variant="blue" />
            <FormulaBox latex="v = \sqrt{2ad} = \sqrt{2 \cdot 1{,}76\cdot10^{15}\cdot 0{,}050} = \underline{\underline{1{,}33 \cdot 10^7\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="t = \frac{v}{a} = \frac{1{,}33\cdot10^7}{1{,}76\cdot10^{15}} = \underline{\underline{7{,}55 \cdot 10^{-9}\;\text{s}}}" variant="gold" />
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="E-felt fra punktladninger"
        difficulty="middels"
        problem={
          <div>
            <p>
              To punktladninger er plassert langs x-aksen:{" "}
              <InlineLatex latex="q_1 = +4{,}0\;\mu\text{C}" /> i x = 0 og{" "}
              <InlineLatex latex="q_2 = -6{,}0\;\mu\text{C}" /> i x = 0,30 m.
            </p>
            <p className="mt-2">Finn det elektriske feltet i punktet x = 0,15 m (midt mellom ladningene).</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Finn E fra hver ladning separat i midtpunktet. Bestem retningen for hvert bidrag. Avstand fra begge = 0,15 m.</p>,
          },
          {
            label: "Hint 2",
            content: (
              <p>
                E fra positiv ladning peker <em>bort</em> (i +x-retning). E fra negativ ladning peker{" "}
                <em>mot</em> ladningen (også i +x-retning). De peker altså <strong>samme vei</strong>!
              </p>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>E fra q₁ i midtpunktet:</strong></p>
            <FormulaBox
              latex="E_1 = k\frac{|q_1|}{r^2} = 8{,}99\cdot10^9 \cdot \frac{4{,}0\cdot10^{-6}}{0{,}15^2} = 1{,}60 \cdot 10^6\;\text{N/C} \quad (\text{i }+x)"
              variant="blue"
            />
            <p><strong>E fra q₂ i midtpunktet:</strong></p>
            <FormulaBox
              latex="E_2 = k\frac{|q_2|}{r^2} = 8{,}99\cdot10^9 \cdot \frac{6{,}0\cdot10^{-6}}{0{,}15^2} = 2{,}40 \cdot 10^6\;\text{N/C} \quad (\text{i }+x)"
              variant="blue"
            />
            <p className="text-sm">Begge feltbidrag peker i +x-retning (bort fra q₁, mot q₂):</p>
            <FormulaBox
              latex="E_{\text{tot}} = E_1 + E_2 = \underline{\underline{4{,}0 \cdot 10^6\;\text{N/C i }+x\text{-retning}}}"
              variant="gold"
            />
          </div>
        }
      />

      {/* ── EKSAMENSOPPGAVER ── */}
      <h3 className="text-xl font-bold mt-12 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips</h4>
        <p className="text-sm">
          E&M-oppgaver på eksamen følger typisk et mønster: du får oppgitt ladninger med posisjoner,
          og skal finne kraft, E-felt, eller potensial. Tegn ALLTID en figur med koordinatsystem,
          og marker alle ladninger, avstander og vinkler. Husk enhetskonvertering!
        </p>
      </div>

      <ExerciseCard
        number={1}
        title="Tre punktladninger — potensial og E-felt"
        difficulty="vanskelig"
        source="Eksamen ELE100 H2016"
        problem={
          <div>
            <p>
              Tre elektriske ladninger er plassert i xy-planet:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li><InlineLatex latex="q_1 = 2\;\mu\text{C}" /> i punktet (−3, 0)</li>
              <li><InlineLatex latex="q_2 = -3\;\mu\text{C}" /> i punktet (2, 0)</li>
              <li><InlineLatex latex="q_3 = 1{,}5\;\mu\text{C}" /> i punktet (0, 4)</li>
            </ul>
            <p className="mt-2 text-sm">Alle koordinater i meter.</p>
            <p className="mt-2">a) Regn ut det elektriske potensialet i origo.</p>
            <p>b) Finn verdi og retning på den elektriske feltstyrken i origo.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: (
              <p>
                a) Potensialet er en skalar — bare summer bidragene uten å tenke på retning.
                V = k(q₁/r₁ + q₂/r₂ + q₃/r₃).
              </p>
            ),
          },
          {
            label: "Hint 2",
            content: (
              <p>
                b) E-feltet er en vektor. Finn E fra hver ladning, dekomponér i x og y,
                og summer. Husk: q₁ er på x-aksen (bare x-komponent), q₂ er på x-aksen,
                q₃ er på y-aksen (bare y-komponent).
              </p>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Potensial i origo</strong></p>
            <p className="text-sm">Avstander: r₁ = 3 m, r₂ = 2 m, r₃ = 4 m</p>
            <FormulaBox
              latex="V = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_1}{r_1} + \frac{q_2}{r_2} + \frac{q_3}{r_3}\right)"
              variant="blue"
            />
            <FormulaBox
              latex="V = 8{,}99\cdot10^9\left(\frac{2\cdot10^{-6}}{3} + \frac{-3\cdot10^{-6}}{2} + \frac{1{,}5\cdot10^{-6}}{4}\right) = \underline{\underline{-4{,}1\;\text{kV}}}"
              variant="gold"
            />

            <p><strong>b) E-felt i origo</strong></p>
            <p className="text-sm">
              q₁ er til venstre for origo → E₁ peker i −x (bort fra positiv ladning).
              q₂ er til høyre → E₂ peker i +x (mot negativ ladning).
              q₃ er over → E₃ peker i −y (bort fra positiv ladning? Nei, mot positiv ladning fra origo sin side betyr bort = oppover, men vi vil ha feltet i origo, altså retning fra origo mot q₃ er +y, men feltet fra positiv ladning peker bort = -y).
            </p>
            <p className="text-sm mt-2">
              E₁ peker i +x-retning (fra q₁ mot origo, bort fra positiv ladning).
              E₂ peker i +x-retning (fra origo mot q₂, mot negativ ladning).
            </p>
            <FormulaBox
              latex="E_x = k\frac{|q_1|}{r_1^2} + k\frac{|q_2|}{r_2^2} = 8{,}99\cdot10^9\left(\frac{2\cdot10^{-6}}{9} + \frac{3\cdot10^{-6}}{4}\right) = \underline{8{,}74\;\text{kV/m}}"
              variant="blue"
            />
            <FormulaBox
              latex="E_y = -k\frac{|q_3|}{r_3^2} = -8{,}99\cdot10^9\cdot\frac{1{,}5\cdot10^{-6}}{16} = \underline{-0{,}843\;\text{kV/m}}"
              variant="blue"
            />
            <FormulaBox
              latex="E = \sqrt{E_x^2 + E_y^2} = \sqrt{8{,}74^2 + 0{,}843^2} = \underline{\underline{8{,}78\;\text{kV/m}}}"
              variant="gold"
            />
            <FormulaBox
              latex="\theta = \tan^{-1}\!\left(\frac{|E_y|}{E_x}\right) = \tan^{-1}(0{,}096) = \underline{\underline{5{,}5°}}\;\text{under }x\text{-aksen}"
              variant="gold"
            />
          </div>
        }
      />
    </div>
  );
}
