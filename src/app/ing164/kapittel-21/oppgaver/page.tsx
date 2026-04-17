"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Kapittel 21</h2>

      <CollapsibleSection title="Oppgavestrategier">
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
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
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
              latex="F_e = 8{,}99 \cdot 10^9 \cdot \frac{1{,}875 \cdot 10^{-15}}{9{,}0 \cdot 10^{-4}} = \boxed{0{,}0187\;\text{N}}"
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
              latex="\sum F_x = F_1\cos 36{,}9° + F_2\cos 36{,}9° = 2 \cdot 0{,}29 \cdot 0{,}8 = \boxed{0{,}46\;\text{N}}"
              variant="gold"
            />
            <FormulaBox
              latex="\sum F_y = -F_1\sin 36{,}9° + F_2\sin 36{,}9° = \boxed{0}"
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
              latex="\vec{E} = \boxed{(-11\,\hat{\imath} + 14\,\hat{\jmath})\;\text{N/C}}"
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
              latex="F_e = qE = (-1{,}60\cdot10^{-19})(1{,}0\cdot10^4) = \boxed{-1{,}6\cdot10^{-15}\;\text{N}}"
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
              latex="v = \sqrt{2a\Delta y} = \boxed{5{,}93 \cdot 10^6\;\text{m/s}}"
              variant="gold"
            />

            <p><strong>c) Tid</strong></p>
            <FormulaBox
              latex="t = \frac{v}{a} = \frac{5{,}93\cdot10^6}{1{,}76\cdot10^{15}} = \boxed{3{,}37 \cdot 10^{-9}\;\text{s}}"
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
              latex="y = \tfrac{1}{2}a_y t^2 = \tfrac{1}{2}(-1{,}76\cdot10^{15})(2{,}0\cdot10^{-9})^2 = \boxed{-3{,}52\;\text{mm}}"
              variant="gold"
            />

            <p><strong>Steg 4:</strong> Vertikal hastighet:</p>
            <FormulaBox
              latex="v_y = a_y t = (-1{,}76\cdot10^{15})(2{,}0\cdot10^{-9}) = \boxed{-3{,}52\cdot10^6\;\text{m/s}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Denne oppgaven er identisk med prosjektilbevegelse fra kap. 3. x-retning: konstant fart. y-retning: konstant akselerasjon fra E-feltet.</p>
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
          <p className="text-xs text-[var(--muted)]">Vår 2017, Høst 2016</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Oblig 3, oppgave 2</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver/kapittel-21" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 21</p>
        </Link>
      </div>
    </div>
  );
}
