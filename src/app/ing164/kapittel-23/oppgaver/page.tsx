"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Elektrisk potensial</h2>

      <CollapsibleSection title="Oppgavestrategier">
      <div className="space-y-6">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Potensial fra punktladninger</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Identifiser alle kildeladninger og deres posisjoner</li>
            <li>Finn avstanden r fra hver kildeladning til punktet der du beregner V</li>
            <li>Beregn <InlineLatex latex="V = kq/r" /> for hver kildeladning (med fortegn på q!)</li>
            <li>Summer alle bidrag — det er bare tall, ingen vektorer!</li>
          </ol>
          <div className="mt-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Fordel fremfor E-felt: Potensial er en skalar. Du trenger ikke dekomponere i
              x og y — bare adder tallene!
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Energibevaring med ladede partikler</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Velg start- og sluttpunkt (der du vet / vil vite fart)</li>
            <li>Beregn potensialet V i begge punkter</li>
            <li>Sett opp energibevaring: <InlineLatex latex="q_0 V_1 + \tfrac{1}{2}mv_1^2 = q_0 V_2 + \tfrac{1}{2}mv_2^2" /></li>
            <li>Løs for ukjent (vanligvis v₂)</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Arbeid for å flytte en ladning</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Finn potensialet i start og sluttpunkt</li>
            <li>Arbeidet utført av <em>ytre</em> krefter: <InlineLatex latex="W_{\text{ytre}} = q_0(V_b - V_a)" /></li>
            <li>Arbeidet utført av <em>E-feltet</em>: <InlineLatex latex="W_E = q_0(V_a - V_b) = -W_{\text{ytre}}" /></li>
          </ol>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil</h4>
          <ul className="space-y-1.5 text-sm">
            <li>• Glemmer fortegn på ladningen i <InlineLatex latex="V = kq/r" /> — her brukes fortegn!</li>
            <li>• Blander potensial (V, skalar) med potensiell energi (Ep, avhenger av q₀)</li>
            <li>• Setter absoluttverdien i Ep-formelen — nei! Ep = kq₁q₂/r <em>med</em> fortegn</li>
            <li>• Feil fortegn på arbeid: W_E = −ΔEp, men W_ytre = +ΔEp</li>
            <li>• Glemmer å konvertere eV til J (eller omvendt)</li>
          </ul>
        </div>
      </div>
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
      {/* Eksempel 1: Elektron mellom plater med energibevaring */}
      <ExerciseCard
        number={1}
        title="Elektron mellom plater — energibevaring"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              Et elektron slippes fra ro ved den negative plata. Avstanden mellom platene er{" "}
              <InlineLatex latex="d = 1{,}0\;\text{cm}" /> og feltstyrken er{" "}
              <InlineLatex latex="E = 1{,}0 \cdot 10^5\;\text{N/C}" />.
            </p>
            <p className="mt-2">Hva er farten når elektronet treffer den positive plata?</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: (
              <p>
                Bruk energibevaring: Ep₁ + Ek₁ = Ep₂ + Ek₂. Elektronet starter fra ro
                (Ek₁ = 0). Velg nullnivå for Ep ved den positive plata.
              </p>
            ),
          },
          {
            label: "Hint 2",
            content: (
              <p>
                For et elektron (q = −e) som beveger seg <em>med</em> feltet (fra − til + plate):
                Ep₁ = 0 (ved − plate, som er nullnivå? Nei!). Tenk på det slik:
                elektronet har ladning −e, og Ep = qEy. Ved negativ plate er y = 0, ved positiv plate er y = −d
                (elektronet beveger seg i feltretningen). Eller enklere:{" "}
                <InlineLatex latex="\tfrac{1}{2}mv^2 = eEd" />.
              </p>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Energibevaring:</strong></p>
            <p className="text-sm">
              Start: Ek₁ = 0 (fra ro), Ep₁ = 0 (nullnivå ved negativ plate).
              Slutt: Ep₂ = −eEd (elektronet har lavere pot. energi ved positiv plate).
            </p>
            <FormulaBox latex="E_{p,1} + E_{k,1} = E_{p,2} + E_{k,2}" variant="blue" />
            <FormulaBox latex="0 + 0 = -eEd + \tfrac{1}{2}m_e v^2" variant="blue" />
            <FormulaBox latex="\tfrac{1}{2}m_e v^2 = eEd" variant="blue" />
            <FormulaBox
              latex="v = \sqrt{\frac{2eEd}{m_e}} = \sqrt{\frac{2 \cdot 1{,}60\cdot10^{-19}\cdot 1{,}0\cdot10^5\cdot 0{,}01}{9{,}11\cdot10^{-31}}}"
              variant="blue"
            />
            <FormulaBox
              latex="v = \boxed{1{,}9 \cdot 10^7\;\text{m/s}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Energibevaring er ofte enklere enn kinematikk — vi trenger ikke å vite akselerasjonen eller tiden, bare start- og slutttilstand!</p>
          </div>
        }
      />

      {/* Eksempel 2: Ep mellom proton og elektron */}
      <ExerciseCard
        number={2}
        title="Potensiell energi i hydrogenatomet"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              Finn den potensielle energien mellom protonen og elektronet i et hydrogenatom
              (forenklet modell). Avstanden er Bohrs radius:{" "}
              <InlineLatex latex="r_0 = 0{,}529 \cdot 10^{-10}\;\text{m}" />.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bruk formelen for potensiell energi mellom to punktladninger. Proton: +e. Elektron: −e.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <FormulaBox
              latex="E_p = \frac{1}{4\pi\varepsilon_0}\frac{e \cdot (-e)}{r_0} = 8{,}99\cdot10^9 \cdot \frac{(1{,}60\cdot10^{-19})(-1{,}60\cdot10^{-19})}{0{,}529\cdot10^{-10}}"
              variant="blue"
            />
            <FormulaBox
              latex="E_p = \boxed{-4{,}35 \cdot 10^{-18}\;\text{J}} = -27{,}2\;\text{eV}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Negativ Ep betyr at systemet er <strong>bundet</strong> — man må tilføre energi for å
              fjerne elektronet fra protonen. Dette er ioniseringsenergien.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Negativt fortegn i Ep betyr at ladningene er bundet. For å skille dem må man tilføre energi (gjøre arbeid).</p>
          </div>
        }
      />

      {/* Eksempel 3: Proton i uniformt felt */}
      <ExerciseCard
        number={3}
        title="Proton i uniformt felt — arbeid og spenning"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              Et proton beveger seg rettlinjet en avstand{" "}
              <InlineLatex latex="d = 0{,}50\;\text{m}" /> langs et uniformt elektrisk felt{" "}
              <InlineLatex latex="E = 1{,}5 \cdot 10^7\;\text{V/m}" />.
            </p>
            <p className="mt-2">a) Finn kraften på protonet.</p>
            <p>b) Finn arbeidet utført på protonet.</p>
            <p>c) Finn potensialforskjellen V_ab.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Kraft: F = eE. Arbeid: W = F·d. Potensialforskjell: Vab = W/q₀.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Kraft</strong></p>
            <FormulaBox
              latex="F_e = eE = 1{,}60\cdot10^{-19}\cdot 1{,}5\cdot10^7 = \boxed{2{,}4 \cdot 10^{-12}\;\text{N}}"
              variant="gold"
            />

            <p><strong>b) Arbeid</strong></p>
            <FormulaBox
              latex="W = F_e \cdot d = 2{,}4\cdot10^{-12}\cdot 0{,}50 = \boxed{1{,}2 \cdot 10^{-12}\;\text{J}} \;(= 7{,}5 \cdot 10^6\;\text{eV})"
              variant="gold"
            />

            <p><strong>c) Potensialforskjell</strong></p>
            <FormulaBox
              latex="V_{ab} = -\frac{\Delta E_p}{q_0} = \frac{W}{q_0} = \frac{1{,}2\cdot10^{-12}}{1{,}60\cdot10^{-19}} = \boxed{7{,}5 \cdot 10^6\;\text{V}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Potensialforskjellen = arbeid per enhet ladning. Den forteller oss hvor mye energi feltet gir per coulomb.</p>
          </div>
        }
      />

      {/* Eksempel 4: Fart mellom to punktladninger */}
      <ExerciseCard
        number={4}
        title="Ladning mellom to punktladninger — energibevaring"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              To ladninger: <InlineLatex latex="q_A = 3{,}0\;\text{nC}" /> og{" "}
              <InlineLatex latex="q_B = -3{,}0\;\text{nC}" /> er plassert med 3,0 cm avstand.
              En positiv ladning <InlineLatex latex="q_0 = 2{,}0\;\text{nC}" /> med masse{" "}
              <InlineLatex latex="m = 5{,}0 \cdot 10^{-9}\;\text{kg}" /> slippes fra ro i
              punkt a (midt mellom ladningene) og beveger seg til punkt b (1,0 cm fra q_B).
            </p>
            <p className="mt-2">Finn farten i punkt b.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: (
              <p>
                Bruk energibevaring. Beregn potensialet V i punkt a og punkt b (fra begge
                kildeladningene). Deretter:{" "}
                <InlineLatex latex="q_0 V_1 + \tfrac{1}{2}mv_1^2 = q_0 V_2 + \tfrac{1}{2}mv_2^2" />
              </p>
            ),
          },
          {
            label: "Hint 2",
            content: (
              <div>
                <p>Punkt a: midt mellom, avstand d = 1,0 cm fra begge.</p>
                <p>Punkt b: 1,0 cm fra qB, 2,0 cm fra qA.</p>
                <p>Beregn V i hvert punkt med superposisjon.</p>
              </div>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Steg 1: Potensial i punkt a (midt mellom, d = 1,0 cm fra begge)</strong></p>
            <FormulaBox
              latex="V_1 = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_A}{d} + \frac{q_B}{d}\right) = k\left(\frac{3{,}0\cdot10^{-9}}{0{,}01} + \frac{-3{,}0\cdot10^{-9}}{0{,}01}\right) = 0"
              variant="blue"
            />
            <p className="text-sm">Symmetri: like store ladninger med motsatt fortegn → V = 0 i midten.</p>

            <p className="mt-3"><strong>Steg 2: Potensial i punkt b (2,0 cm fra qA, 1,0 cm fra qB)</strong></p>
            <FormulaBox
              latex="V_2 = k\left(\frac{3{,}0\cdot10^{-9}}{0{,}02} + \frac{-3{,}0\cdot10^{-9}}{0{,}01}\right) = 8{,}99\cdot10^9(150 - 300)\cdot10^{-9} = -1350\;\text{V}"
              variant="blue"
            />

            <p className="mt-3"><strong>Steg 3: Energibevaring</strong></p>
            <FormulaBox latex="q_0 V_1 + \tfrac{1}{2}mv_1^2 = q_0 V_2 + \tfrac{1}{2}mv_2^2" variant="blue" />
            <p className="text-sm">v₁ = 0 (fra ro), V₁ = 0:</p>
            <FormulaBox latex="0 = q_0 V_2 + \tfrac{1}{2}mv_2^2" variant="blue" />
            <FormulaBox latex="\tfrac{1}{2}mv_2^2 = q_0(V_1 - V_2) = 2{,}0\cdot10^{-9}\cdot(0-(-1350))" variant="blue" />
            <FormulaBox
              latex="v_2 = \sqrt{\frac{2q_0(V_1 - V_2)}{m}} = \sqrt{\frac{2\cdot2{,}0\cdot10^{-9}\cdot1350}{5{,}0\cdot10^{-9}}} = \boxed{46\;\text{m/s}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Energibevaring med potensial er elegant: beregn V i start og slutt, sett inn i energibevaringen. Ingen behov for krefter, akselerasjon eller tid!</p>
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
          <p className="text-xs text-[var(--muted)]">Ikke direkte dekket</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver/kapittel-23" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 23</p>
        </Link>
      </div>
    </div>
  );
}
