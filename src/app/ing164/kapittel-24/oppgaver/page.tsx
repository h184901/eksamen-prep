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
            <p><strong>a) Kapasitans:</strong></p>
            <FormulaBox
              latex="C = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{0{,}0001}{0{,}001} = \underline{\underline{8{,}85 \cdot 10^{-13}\;\text{F} \approx 0{,}885\;\text{pF}}}"
              variant="gold"
            />

            <p><strong>b) Ladning:</strong></p>
            <FormulaBox
              latex="Q = C \cdot V_{ab} = 8{,}85 \cdot 10^{-13} \cdot 5000 = \underline{\underline{4{,}43 \cdot 10^{-9}\;\text{C} \approx 4{,}43\;\text{nC}}}"
              variant="gold"
            />

            <p><strong>c) Feltstyrke:</strong></p>
            <FormulaBox
              latex="E = \frac{V_{ab}}{d} = \frac{5000}{0{,}001} = \underline{\underline{5{,}0 \cdot 10^6\;\text{V/m}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Selv med liten kapasitans (pF) kan spenningskilden lagre noen nC. E-feltet mellom platene kan bli svært sterkt.</p>
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
            <p><strong>Totalkapasitans:</strong></p>
            <FormulaBox
              latex="\frac{1}{C_\text{tot}} = \frac{1}{6} + \frac{1}{3} = \frac{1}{6} + \frac{2}{6} = \frac{3}{6} = \frac{1}{2} \quad \Rightarrow \quad \underline{\underline{C_\text{tot} = 2\;\mu\text{F}}}"
              variant="gold"
            />
            <p><strong>Ladning (lik for begge):</strong></p>
            <FormulaBox
              latex="Q = C_\text{tot} \cdot V_{ab} = 2 \cdot 10^{-6} \cdot 18 = \underline{\underline{36\;\mu\text{C}}}"
              variant="gold"
            />
            <p><strong>Spenning over hver:</strong></p>
            <FormulaBox
              latex="V_1 = \frac{Q}{C_1} = \frac{36}{6} = \underline{\underline{6\;\text{V}}}, \quad V_2 = \frac{Q}{C_2} = \frac{36}{3} = \underline{\underline{12\;\text{V}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">Sjekk: V₁ + V₂ = 6 + 12 = 18 V ✓</p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> I serie er ladningen lik på alle, men den minste kapasitansen får størst spenning.</p>
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
            <p><strong>a) Opprinnelig ladning:</strong></p>
            <FormulaBox latex="Q_0 = C_1 \cdot V_0 = 8 \cdot 10^{-6} \cdot 120 = \underline{\underline{960\;\mu\text{C}}}" variant="gold" />

            <p><strong>b) Opprinnelig energi:</strong></p>
            <FormulaBox latex="E_p = \frac{1}{2}Q_0 V_0 = \frac{1}{2} \cdot 960 \cdot 10^{-6} \cdot 120 = \underline{\underline{0{,}058\;\text{J}}}" variant="gold" />

            <p><strong>c) Etter parallellkobling:</strong></p>
            <p className="text-sm">Ladning er bevart: <InlineLatex latex="Q_1 + Q_2 = Q_0" />. Lik spenning: <InlineLatex latex="V = Q_1/C_1 = Q_2/C_2" />.</p>
            <FormulaBox latex="V = \frac{Q_0}{C_1 + C_2} = \frac{960 \cdot 10^{-6}}{(8 + 4) \cdot 10^{-6}} = \underline{\underline{80\;\text{V}}}" variant="gold" />
            <FormulaBox latex="Q_1 = C_1 V = \underline{\underline{640\;\mu\text{C}}}, \quad Q_2 = C_2 V = \underline{\underline{320\;\mu\text{C}}}" variant="gold" />

            <p><strong>d) Energi etterpå:</strong></p>
            <FormulaBox latex="E_p' = \frac{1}{2}Q_1 V + \frac{1}{2}Q_2 V = \frac{1}{2}(640 + 320) \cdot 10^{-6} \cdot 80 = \underline{\underline{0{,}038\;\text{J}}}" variant="gold" />
            <p className="text-sm text-[var(--muted)]">
              Energitap: 0,058 − 0,038 = 0,020 J. Energien er tapt til varme og elektromagnetisk stråling
              i ledningene under omkoblingen.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Når ladning omfordeles mellom kondensatorer, går ALLTID noe energi tapt. Ladningen er bevart, men energien er det ikke!</p>
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
            <p><strong>a) E-felt:</strong></p>
            <p className="text-sm">Et uniformt felt har lik styrke og retning overalt mellom platene (langt fra kantene).</p>
            <FormulaBox latex="E = \frac{V}{d} = \frac{500}{0{,}050} = \underline{\underline{10\,000\;\text{V/m} = 10^4\;\text{V/m}}}" variant="gold" />

            <p><strong>b) Fart og tid:</strong></p>
            <FormulaBox latex="a = \frac{eE}{m_e} = \frac{1{,}60 \cdot 10^{-19} \cdot 10^4}{9{,}11 \cdot 10^{-31}} = 1{,}76 \cdot 10^{15}\;\text{m/s}^2" variant="blue" />
            <FormulaBox latex="v = \sqrt{2ad} = \sqrt{2 \cdot 1{,}76 \cdot 10^{15} \cdot 0{,}050} = \underline{\underline{1{,}33 \cdot 10^7\;\text{m/s}}}" variant="gold" />
            <FormulaBox latex="t = \frac{v}{a} = \frac{1{,}33 \cdot 10^7}{1{,}76 \cdot 10^{15}} = \underline{\underline{7{,}5 \cdot 10^{-9}\;\text{s} \approx 7{,}5\;\text{ns}}}" variant="gold" />

            <p><strong>c) Kapasitans og ladning:</strong></p>
            <FormulaBox latex="A = \pi r^2 = \pi \cdot 0{,}25^2 = 0{,}196\;\text{m}^2" variant="blue" />
            <FormulaBox latex="C = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{0{,}196}{0{,}050} = \underline{\underline{3{,}47 \cdot 10^{-11}\;\text{F} \approx 34{,}7\;\text{pF}}}" variant="gold" />
            <FormulaBox latex="Q = CV = 3{,}47 \cdot 10^{-11} \cdot 500 = \underline{\underline{1{,}74 \cdot 10^{-8}\;\text{C} \approx 17{,}4\;\text{nC}}}" variant="gold" />
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
            <p><strong>Steg 1:</strong> 6 µF og 12 µF i serie:</p>
            <FormulaBox latex="\frac{1}{C'} = \frac{1}{6} + \frac{1}{12} = \frac{2+1}{12} = \frac{1}{4} \quad \Rightarrow \quad C' = 4\;\mu\text{F}" variant="blue" />
            <p><strong>Steg 2:</strong> Parallell: 3 + 11 + 4 = 18 µF</p>
            <FormulaBox latex="C'' = 3 + 11 + 4 = 18\;\mu\text{F}" variant="blue" />
            <p><strong>Steg 3:</strong> 18 µF i serie med 9 µF:</p>
            <FormulaBox latex="\frac{1}{C_\text{tot}} = \frac{1}{18} + \frac{1}{9} = \frac{1+2}{18} = \frac{1}{6} \quad \Rightarrow \quad \underline{\underline{C_\text{tot} = 6\;\mu\text{F}}}" variant="gold" />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Jobb innenfra og ut — finn serie/parallell-grupper, erstatt med ekvivalent, gjenta.</p>
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
            <p><strong>a) E-felt:</strong></p>
            <FormulaBox latex="u = \frac{E_p}{V} = \frac{1}{2}\varepsilon_0 E^2 \quad \Rightarrow \quad E = \sqrt{\frac{2E_p}{\varepsilon_0 V}}" variant="blue" />
            <FormulaBox latex="E = \sqrt{\frac{2 \cdot 1{,}00}{8{,}854 \cdot 10^{-12} \cdot 1}} = \underline{\underline{4{,}75 \cdot 10^5\;\text{V/m}}}" variant="gold" />

            <p><strong>b) Dobling av E:</strong></p>
            <p className="text-sm">Siden <InlineLatex latex="u \propto E^2" />, tidobling av E gir 100× mer energi:</p>
            <FormulaBox latex="E' = 4{,}75 \cdot 10^6\;\text{V/m}" variant="blue" />
            <FormulaBox latex="u' = \frac{1}{2}\varepsilon_0 (E')^2 = \underline{\underline{100\;\text{J/m}^3}}" variant="gold" />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Energitettheten skalerer med <InlineLatex latex="E^2" /> — dobler du feltet, firedobler du energien!</p>
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
            <p><strong>a) Kapasitans, ladning og energi:</strong></p>
            <FormulaBox latex="C_0 = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{10^{-4}}{10^{-3}} = \underline{\underline{8{,}854 \cdot 10^{-13}\;\text{F} \approx 0{,}885\;\text{pF}}}" variant="gold" />
            <FormulaBox latex="V_0 = Ed = 10^5 \cdot 10^{-3} = 100\;\text{V}" variant="blue" />
            <FormulaBox latex="Q_0 = C_0 V_0 = 8{,}854 \cdot 10^{-13} \cdot 100 = \underline{\underline{8{,}854 \cdot 10^{-11}\;\text{C} \approx 88{,}5\;\text{pC}}}" variant="gold" />
            <FormulaBox latex="E_p = \frac{1}{2}C_0 V_0^2 = \frac{1}{2} \cdot 8{,}854 \cdot 10^{-13} \cdot 100^2 = \underline{\underline{4{,}43 \cdot 10^{-9}\;\text{J} \approx 4{,}43\;\text{nJ}}}" variant="gold" />

            <p><strong>b) Parallellkobling:</strong></p>
            <FormulaBox latex="C_\text{tot} = C_0 + C_0 = 2C_0 = \underline{\underline{1{,}77\;\text{pF}}}" variant="gold" />

            <p><strong>c) Med dielektrikum (K = 4):</strong></p>
            <FormulaBox latex="\varepsilon = K\varepsilon_0 = 4 \cdot 8{,}854 \cdot 10^{-12} = \underline{\underline{3{,}54 \cdot 10^{-11}\;\text{C}^2/\text{Nm}^2}}" variant="gold" />
            <FormulaBox latex="C = KC_0 = 4 \cdot 0{,}885 = \underline{\underline{3{,}54\;\text{pF}}}" variant="gold" />

            <p><strong>d) Energi med dielektrikum:</strong></p>
            <p className="text-sm">Kondensatoren er frakoblet — Q er konstant, V synker:</p>
            <FormulaBox latex="V = \frac{V_0}{K} = \frac{100}{4} = 25\;\text{V}" variant="blue" />
            <FormulaBox latex="E_p' = \frac{1}{2}CV^2 = \frac{1}{2} \cdot 3{,}54 \cdot 10^{-12} \cdot 25^2 = \underline{\underline{1{,}11\;\text{nJ}}}" variant="gold" />
            <p className="text-sm text-[var(--muted)]">Energien er redusert med faktor K = 4. Arbeid ble gjort av det elektriske feltet da dielektrikumet ble dratt inn.</p>
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
            <p><strong>a)</strong></p>
            <FormulaBox latex="C_0 = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{0{,}2}{0{,}01} = \underline{\underline{177\;\text{pF}}}" variant="gold" />
            <FormulaBox latex="Q_0 = C_0 V_0 = 177 \cdot 10^{-12} \cdot 3000 = \underline{\underline{0{,}531\;\mu\text{C}}}" variant="gold" />

            <p><strong>b) Ny kapasitans og K:</strong></p>
            <FormulaBox latex="C = \frac{Q_0}{V} = \frac{0{,}531 \cdot 10^{-6}}{1000} = \underline{\underline{531\;\text{pF}}}" variant="gold" />
            <FormulaBox latex="K = \frac{C}{C_0} = \frac{531}{177} = \underline{\underline{3{,}0}}" variant="gold" />

            <p><strong>c) Permittivitet:</strong></p>
            <FormulaBox latex="\varepsilon = K\varepsilon_0 = 3{,}0 \cdot 8{,}854 \cdot 10^{-12} = \underline{\underline{2{,}66 \cdot 10^{-11}\;\text{C}^2/\text{Nm}^2}}" variant="gold" />

            <p><strong>d) Indusert ladning:</strong></p>
            <FormulaBox latex="Q_i = Q_0\!\left(1 - \frac{1}{K}\right) = 0{,}531 \cdot 10^{-6}\!\left(1 - \frac{1}{3}\right) = \underline{\underline{3{,}54 \cdot 10^{-7}\;\text{C}}}" variant="gold" />

            <p><strong>e–f) E-felt:</strong></p>
            <FormulaBox latex="E_0 = \frac{V_0}{d} = \frac{3000}{0{,}01} = \underline{\underline{3{,}0 \cdot 10^5\;\text{V/m}}}" variant="gold" />
            <FormulaBox latex="E = \frac{V}{d} = \frac{1000}{0{,}01} = \underline{\underline{1{,}0 \cdot 10^5\;\text{V/m}}}" variant="gold" />

            <p><strong>g–h) Energi og energitetthet:</strong></p>
            <FormulaBox latex="U_\text{før} = \frac{1}{2}C_0 V_0^2 = \underline{\underline{7{,}97 \cdot 10^{-4}\;\text{J}}}" variant="gold" />
            <FormulaBox latex="U_\text{etter} = \frac{1}{2}CV^2 = \underline{\underline{2{,}66 \cdot 10^{-4}\;\text{J}}}" variant="gold" />
            <FormulaBox latex="u_\text{før} = \frac{1}{2}\varepsilon_0 E_0^2 = \underline{\underline{0{,}398\;\text{J/m}^3}}" variant="gold" />
            <FormulaBox latex="u_\text{etter} = \frac{1}{2}\varepsilon E^2 = \underline{\underline{0{,}133\;\text{J/m}^3}}" variant="gold" />
          </div>
        }
      />
    </div>
  );
}
