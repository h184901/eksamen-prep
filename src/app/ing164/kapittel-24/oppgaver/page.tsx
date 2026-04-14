"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver</h2>

      <CollapsibleSection title="Oppgavestrategier">
      <div className="space-y-6">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Strategi: Kondensator-oppgaver</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Identifiser type: platekondensator, serie, parallell, eller kombinasjon?</li>
            <li>Konverter enheter: µF, nF, pF → F. cm², mm → m², m.</li>
            <li>Beregn kapasitans fra geometri (<InlineLatex latex="C = \varepsilon_0 A/d" />) eller fra serie/parallell-regler</li>
            <li>Bruk <InlineLatex latex="C = Q/V" /> for å finne ukjente</li>
            <li>Sjekk: I serie er C_tot &lt; minste C. I parallell er C_tot = summen.</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Strategi: Serie/parallell-nettverk</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Start innerst — finn grupper som er rent i serie eller rent i parallell</li>
            <li>Beregn ekvivalent kapasitans for hver gruppe</li>
            <li>Erstatt gruppen med én kondensator og gjenta</li>
            <li>Når du har C_tot, finn Q og V for hele kretsen</li>
            <li>Jobb deg tilbake utover for å finne Q og V for hver enkelt kondensator</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Strategi: Energi og dielektrikum</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Bestem om kondensatoren er koblet til spenningskilde (V konstant) eller frakoblet (Q konstant)</li>
            <li>Hvis V konstant: <InlineLatex latex="C \to KC_0" />, <InlineLatex latex="Q \to KQ_0" />, <InlineLatex latex="E_p \to KE_{p0}" /></li>
            <li>Hvis Q konstant: <InlineLatex latex="C \to KC_0" />, <InlineLatex latex="V \to V_0/K" />, <InlineLatex latex="E_p \to E_{p0}/K" /></li>
            <li>Bruk riktig energiformel basert på det som er kjent</li>
          </ol>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil</h4>
          <ul className="space-y-1.5 text-sm">
            <li>• Blander serie- og parallell-regler (husk: motsatt av motstander!)</li>
            <li>• Glemmer å konvertere cm² → m², mm → m</li>
            <li>• Antar at energi er bevart ved ladningsomfordeling (nei, noe går tapt)</li>
            <li>• Blander om Q er konstant eller V er konstant ved innsetting av dielektrikum</li>
            <li>• Glemmer at <InlineLatex latex="E = V/d" />, ikke <InlineLatex latex="E = V \cdot d" /></li>
          </ul>
        </div>
      </div>
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
      <ExerciseCard
        number={1}
        title="Platekondensator — kapasitans, ladning og E-felt"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>To parallelle plater med avstand <InlineLatex latex="d = 0{,}001\;\text{m}" /> og areal <InlineLatex latex="A = 1\;\text{cm}^2 = 0{,}0001\;\text{m}^2" /> er plassert i vakuum.</p>
            <p className="mt-2">a) Finn kapasitansen.</p>
            <p>b) Platene kobles til en spenningskilde på 5000 V. Hvor mye ladning er det på hver plate?</p>
            <p>c) Hva er feltstyrken mellom platene?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Bruk <InlineLatex latex="C = \varepsilon_0 A/d" /> for kapasitansen.</p> },
          { label: "Hint 2", content: <p>Ladning: <InlineLatex latex="Q = C \cdot V_{ab}" />. E-felt: <InlineLatex latex="E = V_{ab}/d" />.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Plateavstand: <InlineLatex latex="d = 0{,}001\;\text{m}" /></li>
                <li>Plateareal: <InlineLatex latex="A = 1\;\text{cm}^2 = 0{,}0001\;\text{m}^2" /></li>
                <li>Spenning (del b og c): <InlineLatex latex="V_{ab} = 5000\;\text{V}" /></li>
                <li>Medium: vakuum (<InlineLatex latex="\varepsilon_0 = 8{,}854 \cdot 10^{-12}\;\text{F/m}" />)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) Kapasitansen <InlineLatex latex="C" /></li>
                <li>b) Ladningen <InlineLatex latex="Q" /> på platene</li>
                <li>c) Feltstyrken <InlineLatex latex="E" /> mellom platene</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Strategi</p>
              <p className="text-sm">For en platekondensator i vakuum bruker vi <InlineLatex latex="C = \varepsilon_0 A/d" />. Kapasitansen avhenger bare av geometri — ikke av spenning. Når C er kjent, gir <InlineLatex latex="Q = CV" /> ladningen, og <InlineLatex latex="E = V/d" /> E-feltet (uniformt mellom platene).</p>
            </div>

            <p className="font-semibold">Løsning</p>
            <p className="text-sm"><strong>1. Kapasitans:</strong></p>
            <FormulaBox
              latex="C = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{0{,}0001}{0{,}001} = 8{,}85 \cdot 10^{-13}\;\text{F}"
              variant="blue"
            />
            <p className="text-sm"><strong>2. Ladning:</strong></p>
            <FormulaBox
              latex="Q = C \cdot V_{ab} = 8{,}85 \cdot 10^{-13} \cdot 5000 = 4{,}43 \cdot 10^{-9}\;\text{C}"
              variant="blue"
            />
            <p className="text-sm"><strong>3. E-felt (uniformt mellom platene):</strong></p>
            <FormulaBox
              latex="E = \frac{V_{ab}}{d} = \frac{5000}{0{,}001} = 5{,}0 \cdot 10^6\;\text{V/m}"
              variant="blue"
            />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Svar</p>
              <FormulaBox latex="C \approx \underline{\underline{0{,}885\;\text{pF}}}, \quad Q \approx \underline{\underline{4{,}43\;\text{nC}}}, \quad E = \underline{\underline{5{,}0 \cdot 10^6\;\text{V/m}}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p className="text-sm">Selv en bitte liten kondensator (areal 1 cm², gap 1 mm) kan lagre noen nC ved 5 kV. E-feltet mellom platene kan bli kolossalt sterkt — her over 5 MV/m — fordi feltet er uniformt og konsentrert i et svært lite rom.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="To kondensatorer i serie"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              <InlineLatex latex="C_1 = 6\;\mu\text{F}" /> og <InlineLatex latex="C_2 = 3\;\mu\text{F}" /> kobles
              i serie til en spenningskilde <InlineLatex latex="V_{ab} = 18\;\text{V}" />.
            </p>
            <p className="mt-2">Finn total kapasitans, ladningen, og spenningen over hver kondensator.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>I serie adderes inversene: <InlineLatex latex="1/C_\text{tot} = 1/C_1 + 1/C_2" /></p> },
          { label: "Hint 2", content: <p>I serie er ladningen lik: <InlineLatex latex="Q = C_\text{tot} \cdot V_{ab}" />. Finn spenningene med <InlineLatex latex="V = Q/C" />.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li><InlineLatex latex="C_1 = 6\;\mu\text{F}" />, <InlineLatex latex="C_2 = 3\;\mu\text{F}" /></li>
                <li>Koblet i serie</li>
                <li>Totalspenning: <InlineLatex latex="V_{ab} = 18\;\text{V}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>Total kapasitans <InlineLatex latex="C_\text{tot}" /></li>
                <li>Ladningen <InlineLatex latex="Q" /> i kretsen</li>
                <li>Spenningen <InlineLatex latex="V_1" /> og <InlineLatex latex="V_2" /> over hver kondensator</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Strategi</p>
              <p className="text-sm">I serie er ladningen <em>lik</em> på alle kondensatorer (den samme ladningen passerer gjennom hvert ledd). Totalkapasitansen finnes ved å addere de inverse verdiene. Spenningene fordeler seg omvendt proporsjonalt med kapasitansen — minste C gir størst V.</p>
            </div>

            <p className="font-semibold">Løsning</p>
            <p className="text-sm"><strong>1. Total kapasitans (serie-regelen):</strong></p>
            <FormulaBox
              latex="\frac{1}{C_\text{tot}} = \frac{1}{C_1} + \frac{1}{C_2} = \frac{1}{6} + \frac{1}{3} = \frac{1}{6} + \frac{2}{6} = \frac{3}{6} = \frac{1}{2}"
              variant="blue"
            />
            <FormulaBox
              latex="C_\text{tot} = 2\;\mu\text{F}"
              variant="blue"
            />
            <p className="text-sm"><strong>2. Ladning (lik for begge i serie):</strong></p>
            <FormulaBox
              latex="Q = C_\text{tot} \cdot V_{ab} = 2 \cdot 10^{-6} \cdot 18 = 36\;\mu\text{C}"
              variant="blue"
            />
            <p className="text-sm"><strong>3. Spenning over hver kondensator:</strong></p>
            <FormulaBox
              latex="V_1 = \frac{Q}{C_1} = \frac{36\;\mu\text{C}}{6\;\mu\text{F}} = 6\;\text{V}, \qquad V_2 = \frac{Q}{C_2} = \frac{36\;\mu\text{C}}{3\;\mu\text{F}} = 12\;\text{V}"
              variant="blue"
            />
            <p className="text-sm text-[var(--muted)]">Sjekk: <InlineLatex latex="V_1 + V_2 = 6 + 12 = 18\;\text{V}\;\checkmark" /></p>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Svar</p>
              <FormulaBox latex="C_\text{tot} = \underline{\underline{2\;\mu\text{F}}}, \quad Q = \underline{\underline{36\;\mu\text{C}}}, \quad V_1 = \underline{\underline{6\;\text{V}}}, \quad V_2 = \underline{\underline{12\;\text{V}}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p className="text-sm">I serie er ladningen lik på alle kondensatorer. Den minste kondensatoren (<InlineLatex latex="C_2 = 3\;\mu\text{F}" />) tar den største spenningsdelen (12 V vs. 6 V). Total kapasitans er alltid mindre enn den minste C — stikk motsatt av parallell-kobling.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Energilagring — opplading og omkobling"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              <InlineLatex latex="C_1 = 8\;\mu\text{F}" /> lades opp til 120 V. Spenningskilden fjernes.
              Kondensatoren kobles deretter i parallell med en uladet <InlineLatex latex="C_2 = 4\;\mu\text{F}" />.
            </p>
            <p className="mt-2">a) Finn den opprinnelige ladningen <InlineLatex latex="Q_0" />.</p>
            <p>b) Hvor mye energi er lagret i <InlineLatex latex="C_1" /> opprinnelig?</p>
            <p>c) Finn spenningen og ladningene etter omkobling.</p>
            <p>d) Hva er total energi etterpå? Hva skjedde med den «tapte» energien?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p><InlineLatex latex="Q_0 = C_1 \cdot V_0" />. Energi: <InlineLatex latex="E_p = \frac{1}{2}Q_0 V_0" />.</p> },
          { label: "Hint 2", content: <p>Etter omkobling: ladning er bevart (<InlineLatex latex="Q_1 + Q_2 = Q_0" />) og spenningen er lik over begge (<InlineLatex latex="V_1 = V_2 = V" />).</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li><InlineLatex latex="C_1 = 8\;\mu\text{F}" /> ladet til <InlineLatex latex="V_0 = 120\;\text{V}" /></li>
                <li>Spenningskilden fjernes (Q er konstant under omkobling)</li>
                <li><InlineLatex latex="C_2 = 4\;\mu\text{F}" /> uladet, kobles i parallell med <InlineLatex latex="C_1" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) Opprinnelig ladning <InlineLatex latex="Q_0" /></li>
                <li>b) Opprinnelig lagret energi <InlineLatex latex="E_p" /></li>
                <li>c) Spenning og ladningsfordeling etter omkobling</li>
                <li>d) Total energi etter omkobling, og hva som skjedde med tapet</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Strategi</p>
              <p className="text-sm">Etter omkobling er ladning bevart (<InlineLatex latex="Q_\text{tot} = Q_0" />), men spenningene utjevner seg fordi kondensatorene nå er parallellkoblet. Den nye felles spenningen er <InlineLatex latex="V = Q_0/(C_1+C_2)" />. Energi er <em>ikke</em> bevart — noe forsvinner som varme og EM-stråling i ledningene ved omkoblingen.</p>
            </div>

            <p className="font-semibold">Løsning</p>
            <p className="text-sm"><strong>1. Opprinnelig ladning:</strong></p>
            <FormulaBox latex="Q_0 = C_1 \cdot V_0 = 8 \cdot 10^{-6} \cdot 120 = 960\;\mu\text{C}" variant="blue" />

            <p className="text-sm"><strong>2. Opprinnelig energi:</strong></p>
            <FormulaBox latex="E_p = \frac{1}{2}C_1 V_0^2 = \frac{1}{2} \cdot 8 \cdot 10^{-6} \cdot 120^2 = \frac{1}{2} \cdot 8 \cdot 10^{-6} \cdot 14400 = 0{,}058\;\text{J}" variant="blue" />

            <p className="text-sm"><strong>3. Felles spenning etter parallellkobling (Q bevart):</strong></p>
            <FormulaBox latex="V = \frac{Q_0}{C_1 + C_2} = \frac{960 \cdot 10^{-6}}{(8 + 4) \cdot 10^{-6}} = \frac{960}{12} = 80\;\text{V}" variant="blue" />

            <p className="text-sm"><strong>4. Ladningsfordeling:</strong></p>
            <FormulaBox latex="Q_1 = C_1 V = 8 \cdot 10^{-6} \cdot 80 = 640\;\mu\text{C}, \qquad Q_2 = C_2 V = 4 \cdot 10^{-6} \cdot 80 = 320\;\mu\text{C}" variant="blue" />
            <p className="text-sm text-[var(--muted)]">Sjekk: <InlineLatex latex="Q_1 + Q_2 = 640 + 320 = 960\;\mu\text{C} = Q_0\;\checkmark" /></p>

            <p className="text-sm"><strong>5. Energi etter omkobling:</strong></p>
            <FormulaBox latex="E_p' = \frac{1}{2}(C_1+C_2)V^2 = \frac{1}{2} \cdot 12 \cdot 10^{-6} \cdot 80^2 = 0{,}038\;\text{J}" variant="blue" />
            <FormulaBox latex="\Delta E = E_p - E_p' = 0{,}058 - 0{,}038 = 0{,}020\;\text{J \; (tapt til varme)}" variant="blue" />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Svar</p>
              <FormulaBox latex="Q_0 = \underline{\underline{960\;\mu\text{C}}}, \quad E_p = \underline{\underline{0{,}058\;\text{J}}}, \quad V = \underline{\underline{80\;\text{V}}}, \quad E_p' = \underline{\underline{0{,}038\;\text{J}}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p className="text-sm">Ladning er alltid bevart ved omkobling — det er en grunnleggende bevaringslov. Energi er det <em>ikke</em>. Her forsvant 20 mJ (ca. 35 % av energien!) som varme og EM-stråling i ledningene. Dette gjelder uansett ledningens motstand — selv en ideell superleder ville strålt bort energien elektromagnetisk.</p>
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
          <p className="text-xs text-[var(--muted)]">Høst 2016</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Oblig 3, oppgave 2</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver/kapittel-24" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 24</p>
        </Link>
      </div>
    </div>
  );
}
