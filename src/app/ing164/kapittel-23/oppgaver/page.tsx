"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Elektrisk potensial</h2>

      {/* ── Oppgavestrategier ── */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Oppgavestrategier</h3>

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

      {/* ── Gjennomgåtte eksempler ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Gjennomgåtte eksempler</h3>

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
              latex="v = \underline{\underline{1{,}9 \cdot 10^7\;\text{m/s}}}"
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
              latex="E_p = \underline{\underline{-4{,}35 \cdot 10^{-18}\;\text{J}}} = -27{,}2\;\text{eV}"
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
              latex="F_e = eE = 1{,}60\cdot10^{-19}\cdot 1{,}5\cdot10^7 = \underline{\underline{2{,}4 \cdot 10^{-12}\;\text{N}}}"
              variant="gold"
            />

            <p><strong>b) Arbeid</strong></p>
            <FormulaBox
              latex="W = F_e \cdot d = 2{,}4\cdot10^{-12}\cdot 0{,}50 = \underline{\underline{1{,}2 \cdot 10^{-12}\;\text{J}}} \;(= 7{,}5 \cdot 10^6\;\text{eV})"
              variant="gold"
            />

            <p><strong>c) Potensialforskjell</strong></p>
            <FormulaBox
              latex="V_{ab} = -\frac{\Delta E_p}{q_0} = \frac{W}{q_0} = \frac{1{,}2\cdot10^{-12}}{1{,}60\cdot10^{-19}} = \underline{\underline{7{,}5 \cdot 10^6\;\text{V}}}"
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
              latex="v_2 = \sqrt{\frac{2q_0(V_1 - V_2)}{m}} = \sqrt{\frac{2\cdot2{,}0\cdot10^{-9}\cdot1350}{5{,}0\cdot10^{-9}}} = \underline{\underline{46\;\text{m/s}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Energibevaring med potensial er elegant: beregn V i start og slutt, sett inn i energibevaringen. Ingen behov for krefter, akselerasjon eller tid!</p>
          </div>
        }
      />

      {/* ── Øvingsoppgaver ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Potensial og arbeid med tre punktladninger"
        difficulty="vanskelig"
        source="Oblig 3, oppg. 3"
        problem={
          <div>
            <p>
              En punktladning <InlineLatex latex="q_1 = 3\;\mu\text{C}" /> ligger i (3m, 0) og{" "}
              <InlineLatex latex="q_2 = 6\;\mu\text{C}" /> ligger i (−3m, 0).
            </p>
            <p className="mt-2">a) Hva er det elektriske potensialet i origo og i punktet (0, 4m)?</p>
            <p>b) En tredje punktladning <InlineLatex latex="q_3 = 4\;\mu\text{C}" /> plasseres i origo. Hvor stort arbeid må utføres på q₃ for å flytte den til (0, 4m)?</p>
            <p>c) Finn størrelsen og retningen på kraften som virker på q₃ fra de to andre ladningene når q₃ er i (0, 4m).</p>
            <p>d) Beregn størrelse og retning på det elektriske feltet i origo.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1 (a)",
            content: (
              <p>
                Potensial er en skalar. I origo er avstanden til q₁ = 3 m og til q₂ = 3 m.
                I (0,4) er avstanden til begge: <InlineLatex latex="r = \sqrt{3^2 + 4^2} = 5\;\text{m}" />.
              </p>
            ),
          },
          {
            label: "Hint 2 (b)",
            content: (
              <p>
                Arbeid utført av ytre krefter = endring i potensiell energi:{" "}
                <InlineLatex latex="W = q_3(V_{\text{slutt}} - V_{\text{start}})" />.
              </p>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Potensial</strong></p>
            <p className="text-sm">I origo (r₁ = 3 m, r₂ = 3 m):</p>
            <FormulaBox
              latex="V_0 = k\left(\frac{q_1}{r_1} + \frac{q_2}{r_2}\right) = 8{,}99\cdot10^9\left(\frac{3\cdot10^{-6}}{3} + \frac{6\cdot10^{-6}}{3}\right) = \underline{\underline{27\;\text{kV}}}"
              variant="gold"
            />
            <p className="text-sm">I (0, 4m): <InlineLatex latex="r_1 = r_2 = \sqrt{9+16} = 5\;\text{m}" /></p>
            <FormulaBox
              latex="V_{(0,4)} = k\left(\frac{3\cdot10^{-6}}{5} + \frac{6\cdot10^{-6}}{5}\right) = \underline{\underline{16{,}2\;\text{kV}}}"
              variant="gold"
            />

            <p className="mt-3"><strong>b) Arbeid</strong></p>
            <FormulaBox
              latex="W = q_3(V_{\text{slutt}} - V_{\text{start}}) = 4\cdot10^{-6}(16200 - 27000) = \underline{\underline{-0{,}043\;\text{J}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">Negativt arbeid — feltet gjør arbeid for oss, vi trenger ikke tilføre energi.</p>

            <p className="mt-3"><strong>c) Kraft på q₃ i (0, 4m)</strong></p>
            <p className="text-sm">Avstand fra q₁ og q₂ til (0,4): begge = 5 m. Vinkelen fra x-aksen: θ = tan⁻¹(4/3) = 53,1°.</p>
            <FormulaBox latex="F_1 = k\frac{|q_1 q_3|}{r^2} = 8{,}99\cdot10^9\cdot\frac{3\cdot10^{-6}\cdot 4\cdot10^{-6}}{25} = 4{,}32\cdot10^{-3}\;\text{N}" variant="blue" />
            <FormulaBox latex="F_2 = k\frac{|q_2 q_3|}{r^2} = 8{,}99\cdot10^9\cdot\frac{6\cdot10^{-6}\cdot 4\cdot10^{-6}}{25} = 8{,}63\cdot10^{-3}\;\text{N}" variant="blue" />
            <p className="text-sm">Dekomponér: F₁ peker fra q₁ til q₃ (bort fra positiv), F₂ peker fra q₂ til q₃.</p>
            <FormulaBox latex="\sum F_x = -F_1\sin\alpha + F_2\sin\alpha = (F_2 - F_1)\sin\alpha" variant="blue" />
            <p className="text-sm">der α = tan⁻¹(3/4) ≈ 36,9° (vinkel fra y-aksen, dvs. sin α = 3/5 = 0,6).</p>
            <FormulaBox
              latex="\sum F_x = (8{,}63 - 4{,}32)\cdot10^{-3}\cdot 0{,}6 = 2{,}59\cdot10^{-3}\;\text{N}"
              variant="blue"
            />
            <FormulaBox
              latex="\sum F_y = F_1\cos\alpha + F_2\cos\alpha = (4{,}32 + 8{,}63)\cdot10^{-3}\cdot 0{,}8 = 10{,}36\cdot10^{-3}\;\text{N}"
              variant="blue"
            />
            <FormulaBox
              latex="F = \sqrt{F_x^2 + F_y^2} = \underline{\underline{10{,}7\cdot10^{-3}\;\text{N} = 10{,}7\;\text{mN}}}"
              variant="gold"
            />

            <p className="mt-3"><strong>d) E-felt i origo</strong></p>
            <p className="text-sm">q₁ i (+3,0): E₁ peker i −x (bort fra positiv). q₂ i (−3,0): E₂ peker i +x (bort fra positiv).</p>
            <FormulaBox latex="E_1 = k\frac{|q_1|}{r_1^2} = 8{,}99\cdot10^9\cdot\frac{3\cdot10^{-6}}{9} = 3000\;\text{V/m} \;\text{(i −x)}" variant="blue" />
            <FormulaBox latex="E_2 = k\frac{|q_2|}{r_2^2} = 8{,}99\cdot10^9\cdot\frac{6\cdot10^{-6}}{9} = 6000\;\text{V/m} \;\text{(i +x)}" variant="blue" />
            <FormulaBox
              latex="E_x = -3000 + 6000 = 3000\;\text{V/m}"
              variant="blue"
            />
            <FormulaBox
              latex="E = \underline{\underline{3{,}0\;\text{kV/m i }+x\text{-retning}}}"
              variant="gold"
            />
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Elektronvolt og energikonvertering"
        difficulty="lett"
        problem={
          <div>
            <p>
              Et proton akselereres gjennom en potensialforskjell på 500 V fra ro.
            </p>
            <p className="mt-2">a) Hvor stor kinetisk energi får protonet (i joule og i eV)?</p>
            <p>b) Hva er farten til protonet etter akselerasjonen?</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Kinetisk energi = arbeid utført av feltet = qΔV. For proton: q = e.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Kinetisk energi</strong></p>
            <FormulaBox
              latex="E_k = e \cdot \Delta V = 1{,}60\cdot10^{-19}\cdot 500 = \underline{\underline{8{,}0\cdot10^{-17}\;\text{J} = 500\;\text{eV}}}"
              variant="gold"
            />

            <p><strong>b) Fart</strong></p>
            <FormulaBox
              latex="v = \sqrt{\frac{2E_k}{m_p}} = \sqrt{\frac{2\cdot 8{,}0\cdot10^{-17}}{1{,}67\cdot10^{-27}}} = \underline{\underline{3{,}1\cdot10^5\;\text{m/s}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Sammenlign med elektronet: protoner har ~1836× mer masse, så de får mye lavere fart for samme spenning.
            </p>
          </div>
        }
      />

      {/* ── Eksamensoppgaver ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips for kap. 23</h4>
        <ul className="text-sm space-y-1">
          <li>• Potensialoppgaver dukker opp <strong>nesten alltid</strong> sammen med kap. 21-stoff</li>
          <li>• Typisk: finn V i et punkt, deretter finn arbeid for å flytte en ladning dit</li>
          <li>• Energibevaring er et mektig verktøy — brukes ofte til å finne fart</li>
          <li>• Husk: V er skalar (enkel summering), E er vektor (krever dekomponering)</li>
        </ul>
      </div>

      <ExerciseCard
        number={1}
        title="Arbeid og potensial — to punktladninger"
        difficulty="vanskelig"
        source="Eksamen ELE100 V2017"
        problem={
          <div>
            <p>
              En positiv punktladning <InlineLatex latex="q_A = 2{,}50\;\mu\text{C}" /> plasseres
              på x-aksen i <InlineLatex latex="x = 2{,}00\;\text{cm}" />.
            </p>
            <p className="mt-2">
              a) Hvor stort arbeid kreves for å bringe en annen punktladning B, med like stor
              positiv ladning, fra uendelig til punktet <InlineLatex latex="x = 4{,}00\;\text{cm}" />?
            </p>
            <p>
              b) Regn ut det elektriske potensialet i origo satt opp av de to punktladningene.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: (
              <p>
                a) Arbeid = endring i potensiell energi. Avstanden mellom ladningene
                blir 4,00 − 2,00 = 2,00 cm = 0,0200 m.
              </p>
            ),
          },
          {
            label: "Hint 2",
            content: (
              <p>
                b) Potensialet er summen av bidragene fra qA (avstand 2,00 cm) og
                qB (avstand 4,00 cm).
              </p>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Arbeid for å bringe qB fra uendelig</strong></p>
            <p className="text-sm">
              Avstanden mellom qA og qB: r = 4,00 − 2,00 = 2,00 cm = 0,0200 m.
              Ved uendelig: Ep = 0.
            </p>
            <FormulaBox
              latex="E_1 = \frac{1}{4\pi\varepsilon_0}\frac{q_A q_B}{r} = 8{,}99\cdot10^9\cdot\frac{(2{,}50\cdot10^{-6})^2}{0{,}0200}"
              variant="blue"
            />
            <FormulaBox
              latex="W = E_1 - E_0 = \underline{\underline{2{,}80\;\text{J}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Positivt arbeid — vi må dytte ladningene sammen (like ladninger frastøter).
            </p>

            <p className="mt-3"><strong>b) Potensial i origo</strong></p>
            <p className="text-sm">
              Avstand fra origo til qA: r₁ = 2,00 cm = 0,0200 m.
              Avstand fra origo til qB: r₂ = 4,00 cm = 0,0400 m.
            </p>
            <FormulaBox
              latex="V_0 = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_A}{r_1} + \frac{q_B}{r_2}\right) = 8{,}99\cdot10^9\left(\frac{2{,}50\cdot10^{-6}}{0{,}02} + \frac{2{,}50\cdot10^{-6}}{0{,}04}\right)"
              variant="blue"
            />
            <FormulaBox
              latex="V_0 = 8{,}99\cdot10^9 \cdot (1{,}25\cdot10^{-4} + 6{,}25\cdot10^{-5}) = \underline{\underline{1{,}69\;\text{MV}}}"
              variant="gold"
            />
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Uniformt felt — komplett analyse"
        difficulty="vanskelig"
        source="Oblig 3, oppg. 2 (tilpasset)"
        problem={
          <div>
            <p>
              To parallelle metallskiver er plassert med avstand{" "}
              <InlineLatex latex="d = 0{,}050\;\text{m}" /> og koblet til 500 V.
              Skivene er sirkulære med radius <InlineLatex latex="r = 0{,}25\;\text{m}" />.
            </p>
            <p className="mt-2">a) Hva er E-feltet mellom platene?</p>
            <p>b) Et elektron slippes fra ro ved den negative plata. Finn farten og tiden til det treffer den positive plata.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>a) E = V/d for uniformt felt mellom plater.</p>,
          },
          {
            label: "Hint 2",
            content: (
              <p>
                b) Bruk energibevaring for farten: ½mv² = eV.
                Bruk kinematikk for tiden: d = ½at².
              </p>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) E-felt</strong></p>
            <FormulaBox
              latex="E = \frac{V}{d} = \frac{500}{0{,}050} = \underline{\underline{1{,}0\cdot10^4\;\text{V/m}}}"
              variant="gold"
            />

            <p><strong>b) Fart (energibevaring)</strong></p>
            <FormulaBox latex="\tfrac{1}{2}m_e v^2 = eV" variant="blue" />
            <FormulaBox
              latex="v = \sqrt{\frac{2eV}{m_e}} = \sqrt{\frac{2\cdot1{,}60\cdot10^{-19}\cdot 500}{9{,}11\cdot10^{-31}}} = \underline{\underline{1{,}33\cdot10^7\;\text{m/s}}}"
              variant="gold"
            />

            <p><strong>Tid (kinematikk)</strong></p>
            <FormulaBox
              latex="a = \frac{eE}{m_e} = \frac{1{,}60\cdot10^{-19}\cdot10^4}{9{,}11\cdot10^{-31}} = 1{,}76\cdot10^{15}\;\text{m/s}^2"
              variant="blue"
            />
            <FormulaBox
              latex="t = \sqrt{\frac{2d}{a}} = \sqrt{\frac{2\cdot0{,}050}{1{,}76\cdot10^{15}}} = \underline{\underline{7{,}5\cdot10^{-9}\;\text{s} \approx 7{,}5\;\text{ns}}}"
              variant="gold"
            />
          </div>
        }
      />
    </div>
  );
}
