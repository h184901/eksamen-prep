"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver</h2>

      {/* ── OPPGAVESTRATEGIER ── */}
      <h3 className="text-xl font-semibold mb-4">Oppgavestrategier</h3>

      <div className="space-y-6 mb-12">
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

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <h3 className="text-xl font-semibold mb-4">Gjennomgåtte eksempler</h3>

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

      {/* ── ØVINGSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mt-12 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Platekondensator med elektron"
        difficulty="middels"
        source="Oblig 3, oppg. 2"
        problem={
          <div>
            <p>
              To plane, parallelle metallskiver er plassert i innbyrdes avstand 0,050 m.
              Platene er koplet til en spenningskilde på 500 V.
            </p>
            <p className="mt-2">a) Forklar hva vi mener med et uniformt elektrisk felt. Hva blir den elektriske feltstyrken mellom platene?</p>
            <p>b) Et elektron slippes fra ro ved den negative plata. Hvilken fart har elektronet når det treffer den positive plata? Hvor lang tid bruker det?</p>
            <p>c) Metallskivene er sirkulære med radius 0,25 m. Beregn systemets kapasitans. Hvor mye ladning er samlet på hver plate?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Uniformt felt: konstant styrke og retning. <InlineLatex latex="E = V/d" />.</p> },
          { label: "Hint 2", content: <p>Elektronen akselereres: <InlineLatex latex="a = eE/m_e" />. Bruk kinematikk: <InlineLatex latex="v^2 = 2ad" />.</p> },
          { label: "Hint 3", content: <p>Sirkulært areal: <InlineLatex latex="A = \pi r^2" />. Kapasitans: <InlineLatex latex="C = \varepsilon_0 A/d" />.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Plateavstand: <InlineLatex latex="d = 0{,}050\;\text{m}" /></li>
                <li>Spenning: <InlineLatex latex="V = 500\;\text{V}" /></li>
                <li>Elektroner masse/ladning: <InlineLatex latex="m_e = 9{,}11 \cdot 10^{-31}\;\text{kg}" />, <InlineLatex latex="e = 1{,}60 \cdot 10^{-19}\;\text{C}" /></li>
                <li>Plateradius: <InlineLatex latex="r = 0{,}25\;\text{m}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) Forklare uniformt felt + beregne <InlineLatex latex="E" /></li>
                <li>b) Hastigheten <InlineLatex latex="v" /> og tida <InlineLatex latex="t" /> for elektronet</li>
                <li>c) Kapasitansen <InlineLatex latex="C" /> og ladningen <InlineLatex latex="Q" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Strategi</p>
              <p className="text-sm">Del a: uniformt felt betyr <InlineLatex latex="E = V/d" /> (lik styrke og retning overalt mellom platene). Del b: elektronen utsettes for kraft <InlineLatex latex="F = eE" />, gir akselerasjon <InlineLatex latex="a = F/m_e" />; med startfart null gir kinematikken <InlineLatex latex="v^2 = 2ad" />. Del c: sirkulær plate gir <InlineLatex latex="A = \pi r^2" />, kapasitans <InlineLatex latex="C = \varepsilon_0 A/d" />.</p>
            </div>

            <p className="font-semibold">Løsning</p>
            <p className="text-sm"><strong>1. Uniformt E-felt (del a):</strong></p>
            <p className="text-sm">Et uniformt elektrisk felt har konstant styrke og retning overalt mellom platene (ideell tilnærming, gjelder langt fra kantene).</p>
            <FormulaBox latex="E = \frac{V}{d} = \frac{500}{0{,}050} = 10^4\;\text{V/m}" variant="blue" />

            <p className="text-sm"><strong>2. Akselerasjon og fart for elektronet (del b):</strong></p>
            <FormulaBox latex="a = \frac{eE}{m_e} = \frac{1{,}60 \cdot 10^{-19} \cdot 10^4}{9{,}11 \cdot 10^{-31}} = 1{,}76 \cdot 10^{15}\;\text{m/s}^2" variant="blue" />
            <FormulaBox latex="v = \sqrt{2ad} = \sqrt{2 \cdot 1{,}76 \cdot 10^{15} \cdot 0{,}050} = 1{,}33 \cdot 10^7\;\text{m/s}" variant="blue" />
            <FormulaBox latex="t = \frac{v}{a} = \frac{1{,}33 \cdot 10^7}{1{,}76 \cdot 10^{15}} = 7{,}5 \cdot 10^{-9}\;\text{s} \approx 7{,}5\;\text{ns}" variant="blue" />

            <p className="text-sm"><strong>3. Kapasitans og ladning (del c):</strong></p>
            <FormulaBox latex="A = \pi r^2 = \pi \cdot (0{,}25)^2 = 0{,}196\;\text{m}^2" variant="blue" />
            <FormulaBox latex="C = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{0{,}196}{0{,}050} = 3{,}47 \cdot 10^{-11}\;\text{F} \approx 34{,}7\;\text{pF}" variant="blue" />
            <FormulaBox latex="Q = CV = 3{,}47 \cdot 10^{-11} \cdot 500 = 1{,}74 \cdot 10^{-8}\;\text{C} \approx 17{,}4\;\text{nC}" variant="blue" />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Svar</p>
              <FormulaBox latex="E = \underline{\underline{10^4\;\text{V/m}}}, \quad v = \underline{\underline{1{,}33 \cdot 10^7\;\text{m/s}}}, \quad t \approx \underline{\underline{7{,}5\;\text{ns}}}, \quad C \approx \underline{\underline{34{,}7\;\text{pF}}}, \quad Q \approx \underline{\underline{17{,}4\;\text{nC}}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p className="text-sm">Et elektron i et moderat felt (10 kV/m) akselereres til 13 millioner m/s på under 8 ns — det viser at elektriske felt gir enorm akselerasjon på partikler med liten masse. Merk at problemet kombinerer felt, kinematikk <em>og</em> kapasitans — typisk eksamensstil for kap. 24.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Sammensatt nettverk"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              Betrakt et nettverk med følgende kondensatorer mellom punkt a og b:
            </p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Tre i parallell: 3 µF, 11 µF, og en kombinasjon C&apos; (6 µF og 12 µF i serie)</li>
              <li>Disse er i serie med 9 µF</li>
            </ul>
            <p className="mt-2">Finn total kapasitans C_tot.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Start med 6 µF og 12 µF i serie: <InlineLatex latex="1/C' = 1/6 + 1/12" /></p> },
          { label: "Hint 2", content: <p>Legg så C&apos; = 4 µF i parallell med 3 µF og 11 µF. Denne i serie med 9 µF.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>6 µF og 12 µF i serie (dette er kombinasjonen C&apos;)</li>
                <li>C&apos; i parallell med 3 µF og 11 µF</li>
                <li>Hele parallell-gruppen er i serie med 9 µF</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>Total kapasitans <InlineLatex latex="C_\text{tot}" /> mellom punkt a og b</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Strategi</p>
              <p className="text-sm">Jobb innenfra og ut: finn den innerste serie/parallell-gruppen, erstatt med én ekvivalent kondensator, og gjenta. Her: (1) 6 og 12 i serie → C&apos;, (2) C&apos;, 3 og 11 i parallell → C&apos;&apos;, (3) C&apos;&apos; og 9 i serie → C_tot.</p>
            </div>

            <p className="font-semibold">Løsning</p>
            <p className="text-sm"><strong>1. 6 µF og 12 µF i serie:</strong></p>
            <FormulaBox latex="\frac{1}{C'} = \frac{1}{6} + \frac{1}{12} = \frac{2}{12} + \frac{1}{12} = \frac{3}{12} = \frac{1}{4} \quad \Rightarrow \quad C' = 4\;\mu\text{F}" variant="blue" />

            <p className="text-sm"><strong>2. C&apos; (4 µF), 3 µF og 11 µF i parallell:</strong></p>
            <FormulaBox latex="C'' = C' + 3 + 11 = 4 + 3 + 11 = 18\;\mu\text{F}" variant="blue" />

            <p className="text-sm"><strong>3. C&apos;&apos; (18 µF) i serie med 9 µF:</strong></p>
            <FormulaBox latex="\frac{1}{C_\text{tot}} = \frac{1}{18} + \frac{1}{9} = \frac{1}{18} + \frac{2}{18} = \frac{3}{18} = \frac{1}{6}" variant="blue" />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Svar</p>
              <FormulaBox latex="C_\text{tot} = \underline{\underline{6\;\mu\text{F}}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p className="text-sm">Nøkkelteknikken for sammensatte nettverk er å jobbe <em>innenfra og ut</em> — finn den innerste rene serie- eller parallell-gruppen, erstatt med én ekvivalent, og gjenta til du sitter igjen med én kondensator. Aldri prøv å ta hele nettverket på én gang!</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Energitetthet i elektrisk felt"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              <InlineLatex latex="E_p = 1{,}00\;\text{J}" /> energi skal lagres i 1 m³ med vakuum i et elektrisk felt.
            </p>
            <p className="mt-2">a) Hvor sterkt E-felt behøver vi?</p>
            <p>b) Hvis E-feltet tidobles, hvor mye energi er da lagret per kubikkmeter?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Bruk <InlineLatex latex="u = \frac{1}{2}\varepsilon_0 E^2" /> og løs for E.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Ønsket lagret energi: <InlineLatex latex="E_p = 1{,}00\;\text{J}" /></li>
                <li>Volum: <InlineLatex latex="\mathcal{V} = 1\;\text{m}^3" /></li>
                <li>Medium: vakuum (<InlineLatex latex="\varepsilon_0 = 8{,}854 \cdot 10^{-12}\;\text{F/m}" />)</li>
                <li>Del b: E-feltet tidobles</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) Nødvendig feltstyrke <InlineLatex latex="E" /></li>
                <li>b) Energitetthet <InlineLatex latex="u'" /> når E tidobles</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Strategi</p>
              <p className="text-sm">Energitettheten i et elektrisk felt er <InlineLatex latex="u = \frac{1}{2}\varepsilon_0 E^2" /> (energi per volumenhet). For del a: sett <InlineLatex latex="u = E_p/\mathcal{V}" /> og løs for E. For del b: siden <InlineLatex latex="u \propto E^2" /> gir tidobling av E en faktor <InlineLatex latex="10^2 = 100" /> mer energitetthet.</p>
            </div>

            <p className="font-semibold">Løsning</p>
            <p className="text-sm"><strong>1. Energitetthet som trengs (del a):</strong></p>
            <FormulaBox latex="u = \frac{E_p}{\mathcal{V}} = \frac{1{,}00\;\text{J}}{1\;\text{m}^3} = 1{,}00\;\text{J/m}^3" variant="blue" />

            <p className="text-sm"><strong>2. Løs for E:</strong></p>
            <FormulaBox latex="u = \frac{1}{2}\varepsilon_0 E^2 \quad \Rightarrow \quad E = \sqrt{\frac{2u}{\varepsilon_0}} = \sqrt{\frac{2 \cdot 1{,}00}{8{,}854 \cdot 10^{-12}}} = 4{,}75 \cdot 10^5\;\text{V/m}" variant="blue" />

            <p className="text-sm"><strong>3. Del b — E tidobles (del b):</strong></p>
            <FormulaBox latex="E' = 10E = 4{,}75 \cdot 10^6\;\text{V/m}" variant="blue" />
            <FormulaBox latex="u' = \frac{1}{2}\varepsilon_0 (E')^2 = \frac{1}{2}\varepsilon_0 (10E)^2 = 100 \cdot u = 100 \cdot 1{,}00 = 100\;\text{J/m}^3" variant="blue" />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Svar</p>
              <FormulaBox latex="E = \underline{\underline{4{,}75 \cdot 10^5\;\text{V/m}}}, \qquad u' = \underline{\underline{100\;\text{J/m}^3}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p className="text-sm">Energitettheten skalerer med <InlineLatex latex="E^2" />. Det betyr at tidobling av feltstyrken gir 100× mer energi, ikke 10×. Tilsvarende i et dielektrikum: jo høyere dielektrisitetskonstant K, jo mer energi kan lagres per volum ved samme felt. Dette er intuisjonen bak kondensatorer med dielektrikum.</p>
            </div>
          </div>
        }
      />

      {/* ── EKSAMENSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mt-12 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips</h4>
        <p className="text-sm">
          Kondensatoroppgaver på eksamen kombinerer ofte kapasitans-beregning med energi og/eller
          dielektrikum. Vær alltid klar over om kondensatoren er tilkoblet (V konstant) eller
          frakoblet (Q konstant) spenningskilden — dette er avgjørende for hva som endres ved
          innsetting av dielektrikum.
        </p>
      </div>

      <ExerciseCard
        number={1}
        title="Platekondensator med dielektrikum"
        difficulty="vanskelig"
        source="Oblig 3, oppg. 4"
        problem={
          <div>
            <p>
              En platekondensator er ladet slik at feltet mellom platene er <InlineLatex latex="E = 1{,}0 \cdot 10^5\;\text{V/m}" />.
              Avstanden mellom platene er <InlineLatex latex="d = 1\;\text{mm}" /> og hver plate har areal <InlineLatex latex="A = 1\;\text{cm}^2" />.
            </p>
            <p className="mt-2">a) Finn kapasitansen. Hvor stor ladning er lagret? Hvor mye potensiell energi?</p>
            <p>b) Kondensatoren kobles i parallell med en identisk kondensator. Hva blir kapasitansen?</p>
            <p>c) Vi ser på kun den første kondensatoren. Den får et dielektrikum med <InlineLatex latex="K = 4" />. Finn permittiviteten og den nye kapasitansen.</p>
            <p>d) Hvor mye energi er nå lagret i kondensatoren?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Start med <InlineLatex latex="C = \varepsilon_0 A/d" />. Spenning: <InlineLatex latex="V = Ed" />. Ladning: <InlineLatex latex="Q = CV" />.</p> },
          { label: "Hint 2", content: <p>Parallell: <InlineLatex latex="C_\text{tot} = 2C" />. Med dielektrikum: <InlineLatex latex="C' = KC_0" />. Vær obs — er Q eller V konstant?</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>E-felt mellom platene: <InlineLatex latex="E = 1{,}0 \cdot 10^5\;\text{V/m}" /></li>
                <li>Plateavstand: <InlineLatex latex="d = 1\;\text{mm} = 10^{-3}\;\text{m}" /></li>
                <li>Plateareal: <InlineLatex latex="A = 1\;\text{cm}^2 = 10^{-4}\;\text{m}^2" /></li>
                <li>Del b: identisk parallell-kondensator kobles på</li>
                <li>Del c–d: dielektrikum med <InlineLatex latex="K = 4" /> settes inn (spenningskilde frakoblet)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) <InlineLatex latex="C_0" />, <InlineLatex latex="Q_0" />, <InlineLatex latex="E_p" /></li>
                <li>b) Ny kapasitans ved parallellkobling</li>
                <li>c) Permittivitet og kapasitans med dielektrikum</li>
                <li>d) Ny lagret energi med dielektrikum</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Strategi</p>
              <p className="text-sm">Del a: regn V fra E og d, deretter C, Q og energi. Del b: parallell summerer kapasitanser direkte. Del c–d: spenningskilden er fjernet — <strong>Q er konstant</strong>. Dielektrikumet øker C med faktor K, noe som reduserer V med faktor K og energien med faktor K.</p>
            </div>

            <p className="font-semibold">Løsning</p>
            <p className="text-sm"><strong>1. Del a — kapasitans, ladning og energi:</strong></p>
            <FormulaBox latex="V_0 = E \cdot d = 10^5 \cdot 10^{-3} = 100\;\text{V}" variant="blue" />
            <FormulaBox latex="C_0 = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{10^{-4}}{10^{-3}} = 8{,}854 \cdot 10^{-13}\;\text{F} \approx 0{,}885\;\text{pF}" variant="blue" />
            <FormulaBox latex="Q_0 = C_0 V_0 = 8{,}854 \cdot 10^{-13} \cdot 100 = 8{,}854 \cdot 10^{-11}\;\text{C} \approx 88{,}5\;\text{pC}" variant="blue" />
            <FormulaBox latex="E_p = \frac{1}{2}C_0 V_0^2 = \frac{1}{2} \cdot 8{,}854 \cdot 10^{-13} \cdot (100)^2 = 4{,}43 \cdot 10^{-9}\;\text{J} \approx 4{,}43\;\text{nJ}" variant="blue" />

            <p className="text-sm"><strong>2. Del b — parallellkobling av identisk kondensator:</strong></p>
            <FormulaBox latex="C_\text{tot} = C_0 + C_0 = 2C_0 = 2 \cdot 0{,}885 = 1{,}77\;\text{pF}" variant="blue" />

            <p className="text-sm"><strong>3. Del c — dielektrikum med K = 4 (Q konstant!):</strong></p>
            <FormulaBox latex="\varepsilon = K\varepsilon_0 = 4 \cdot 8{,}854 \cdot 10^{-12} = 3{,}54 \cdot 10^{-11}\;\text{C}^2/\text{Nm}^2" variant="blue" />
            <FormulaBox latex="C = KC_0 = 4 \cdot 0{,}885\;\text{pF} = 3{,}54\;\text{pF}" variant="blue" />

            <p className="text-sm"><strong>4. Del d — ny spenning og energi (Q er konstant, V synker):</strong></p>
            <FormulaBox latex="V = \frac{Q_0}{C} = \frac{V_0}{K} = \frac{100}{4} = 25\;\text{V}" variant="blue" />
            <FormulaBox latex="E_p' = \frac{1}{2}CV^2 = \frac{1}{2} \cdot 3{,}54 \cdot 10^{-12} \cdot 25^2 = 1{,}11 \cdot 10^{-9}\;\text{J} \approx 1{,}11\;\text{nJ}" variant="blue" />
            <p className="text-sm text-[var(--muted)]">Alternativt: <InlineLatex latex="E_p' = E_p/K = 4{,}43\;\text{nJ}/4 = 1{,}11\;\text{nJ}" /> — energien reduseres med faktor K.</p>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Svar</p>
              <FormulaBox latex="C_0 \approx \underline{\underline{0{,}885\;\text{pF}}}, \quad Q_0 \approx \underline{\underline{88{,}5\;\text{pC}}}, \quad E_p \approx \underline{\underline{4{,}43\;\text{nJ}}}" variant="gold" />
              <FormulaBox latex="C_\text{parallell} = \underline{\underline{1{,}77\;\text{pF}}}, \quad C_\text{diel} = \underline{\underline{3{,}54\;\text{pF}}}, \quad E_p' \approx \underline{\underline{1{,}11\;\text{nJ}}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p className="text-sm">Det avgjørende spørsmålet ved dielektrikum-oppgaver: er kondensatoren tilkoblet spenningskilde (V konstant) eller frakoblet (Q konstant)? Her var den frakoblet — Q = konstant, V synker med faktor K, energi reduseres med faktor K. Det «tapte» arbeidet ble utført av E-feltet da dielektrikumet ble sugd inn mellom platene.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Dielektrikum — fullstendig analyse"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              En platekondensator har <InlineLatex latex="A = 2000\;\text{cm}^2" />, <InlineLatex latex="d = 1\;\text{cm}" />,
              og lades til <InlineLatex latex="V_0 = 3\;\text{kV}" />. Spenningskilden fjernes. Mellomrommet fylles med plastikk.
            </p>
            <p className="mt-2">a) Finn <InlineLatex latex="C_0" /> og <InlineLatex latex="Q_0" />.</p>
            <p>b) Spenningen endres til V = 1 kV. Finn C og K.</p>
            <p>c–d) Finn permittiviteten ε, indusert ladning Q_i.</p>
            <p>e–f) Finn E-felt før og etter dielektrikum.</p>
            <p>g–h) Finn lagret energi og energitetthet før og etter.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p><InlineLatex latex="C_0 = \varepsilon_0 A/d" />. Etter dielektrikum: Q er konstant, V synker.</p> },
          { label: "Hint 2", content: <p><InlineLatex latex="C = Q_0/V = Q_0/1000" />. <InlineLatex latex="K = C/C_0 = V_0/V" />.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Plateareal: <InlineLatex latex="A = 2000\;\text{cm}^2 = 0{,}20\;\text{m}^2" /></li>
                <li>Plateavstand: <InlineLatex latex="d = 1\;\text{cm} = 0{,}01\;\text{m}" /></li>
                <li>Opprinnelig spenning: <InlineLatex latex="V_0 = 3\;\text{kV} = 3000\;\text{V}" /></li>
                <li>Spenningskilde fjernes (Q = konstant) før dielektrikum settes inn</li>
                <li>Ny spenning etter dielektrikum: <InlineLatex latex="V = 1\;\text{kV} = 1000\;\text{V}" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) <InlineLatex latex="C_0" /> og <InlineLatex latex="Q_0" /></li>
                <li>b) Ny kapasitans <InlineLatex latex="C" /> og dielektrisitetskonstanten <InlineLatex latex="K" /></li>
                <li>c) Permittivitet <InlineLatex latex="\varepsilon" /></li>
                <li>d) Indusert ladning <InlineLatex latex="Q_i" /> på dielektrikumet</li>
                <li>e–f) E-felt før og etter</li>
                <li>g–h) Lagret energi og energitetthet før og etter</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Strategi</p>
              <p className="text-sm">Spenningskilden er fjernet — <strong>Q er konstant</strong>. Etter at dielektrikumet settes inn senkes spenningen fra 3000 V til 1000 V, noe som direkte gir oss K = V₀/V = 3. Resten følger av definisjonene: <InlineLatex latex="\varepsilon = K\varepsilon_0" />, indusert ladning <InlineLatex latex="Q_i = Q_0(1-1/K)" />, energier via <InlineLatex latex="\frac{1}{2}CV^2" /> og energitetthet via <InlineLatex latex="u = \frac{1}{2}\varepsilon E^2" />.</p>
            </div>

            <p className="font-semibold">Løsning</p>
            <p className="text-sm"><strong>1. Del a — original kapasitans og ladning:</strong></p>
            <FormulaBox latex="C_0 = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{0{,}20}{0{,}01} = 177 \cdot 10^{-12}\;\text{F} = 177\;\text{pF}" variant="blue" />
            <FormulaBox latex="Q_0 = C_0 V_0 = 177 \cdot 10^{-12} \cdot 3000 = 5{,}31 \cdot 10^{-7}\;\text{C} = 0{,}531\;\mu\text{C}" variant="blue" />

            <p className="text-sm"><strong>2. Del b — ny kapasitans og K (Q konstant, V ny = 1000 V):</strong></p>
            <FormulaBox latex="C = \frac{Q_0}{V} = \frac{5{,}31 \cdot 10^{-7}}{1000} = 531 \cdot 10^{-12}\;\text{F} = 531\;\text{pF}" variant="blue" />
            <FormulaBox latex="K = \frac{C}{C_0} = \frac{531\;\text{pF}}{177\;\text{pF}} = 3{,}0 \qquad \left(\text{eller: } K = \frac{V_0}{V} = \frac{3000}{1000} = 3{,}0\right)" variant="blue" />

            <p className="text-sm"><strong>3. Del c — permittivitet:</strong></p>
            <FormulaBox latex="\varepsilon = K\varepsilon_0 = 3{,}0 \cdot 8{,}854 \cdot 10^{-12} = 2{,}66 \cdot 10^{-11}\;\text{C}^2/\text{Nm}^2" variant="blue" />

            <p className="text-sm"><strong>4. Del d — indusert overflateladning på dielektrikumet:</strong></p>
            <FormulaBox latex="Q_i = Q_0\!\left(1 - \frac{1}{K}\right) = 5{,}31 \cdot 10^{-7} \cdot \left(1 - \frac{1}{3}\right) = 5{,}31 \cdot 10^{-7} \cdot \frac{2}{3} = 3{,}54 \cdot 10^{-7}\;\text{C}" variant="blue" />

            <p className="text-sm"><strong>5. Del e–f — E-felt før og etter:</strong></p>
            <FormulaBox latex="E_0 = \frac{V_0}{d} = \frac{3000}{0{,}01} = 3{,}0 \cdot 10^5\;\text{V/m}" variant="blue" />
            <FormulaBox latex="E = \frac{V}{d} = \frac{1000}{0{,}01} = 1{,}0 \cdot 10^5\;\text{V/m} = \frac{E_0}{K}" variant="blue" />

            <p className="text-sm"><strong>6. Del g–h — lagret energi og energitetthet:</strong></p>
            <FormulaBox latex="U_\text{før} = \frac{1}{2}C_0 V_0^2 = \frac{1}{2} \cdot 177 \cdot 10^{-12} \cdot (3000)^2 = 7{,}97 \cdot 10^{-4}\;\text{J}" variant="blue" />
            <FormulaBox latex="U_\text{etter} = \frac{1}{2}CV^2 = \frac{1}{2} \cdot 531 \cdot 10^{-12} \cdot (1000)^2 = 2{,}66 \cdot 10^{-4}\;\text{J} = \frac{U_\text{før}}{K}" variant="blue" />
            <FormulaBox latex="u_\text{før} = \frac{1}{2}\varepsilon_0 E_0^2 = \frac{1}{2} \cdot 8{,}854 \cdot 10^{-12} \cdot (3 \cdot 10^5)^2 = 0{,}398\;\text{J/m}^3" variant="blue" />
            <FormulaBox latex="u_\text{etter} = \frac{1}{2}\varepsilon E^2 = \frac{1}{2} \cdot 2{,}66 \cdot 10^{-11} \cdot (10^5)^2 = 0{,}133\;\text{J/m}^3" variant="blue" />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Svar</p>
              <FormulaBox latex="C_0 = \underline{\underline{177\;\text{pF}}}, \quad Q_0 = \underline{\underline{0{,}531\;\mu\text{C}}}, \quad K = \underline{\underline{3{,}0}}, \quad \varepsilon = \underline{\underline{2{,}66 \cdot 10^{-11}\;\text{C}^2/\text{Nm}^2}}" variant="gold" />
              <FormulaBox latex="Q_i = \underline{\underline{3{,}54 \cdot 10^{-7}\;\text{C}}}, \quad E_0 = \underline{\underline{3{,}0 \cdot 10^5\;\text{V/m}}}, \quad E = \underline{\underline{1{,}0 \cdot 10^5\;\text{V/m}}}" variant="gold" />
              <FormulaBox latex="U_\text{før} = \underline{\underline{7{,}97 \cdot 10^{-4}\;\text{J}}}, \quad U_\text{etter} = \underline{\underline{2{,}66 \cdot 10^{-4}\;\text{J}}}, \quad u_\text{før} = \underline{\underline{0{,}398\;\text{J/m}^3}}, \quad u_\text{etter} = \underline{\underline{0{,}133\;\text{J/m}^3}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p className="text-sm">Dette er en «fullstendig analyse» — alle størrelser knyttes til hverandre via K. Nøkkelobservasjon: med Q konstant reduseres V, E og u med faktor K. Det dielektriske materialet «polyserer» seg (dipoldreining) og skaper et motrettet felt som delvis kansellerer ekstern-feltet — derav det svakere E-feltet og lavere energi. Det kjøpte K = 3 til prisen av en faktor 3 energitap.</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
