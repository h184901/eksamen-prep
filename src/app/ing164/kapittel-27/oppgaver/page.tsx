"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Kapittel 27</h2>

      {/* ── Oppgavestrategier ── */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Oppgavestrategier</h3>

      <div className="space-y-6">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Kraft på ladet partikkel i B-felt</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Tegn figur med v, B og koordinatsystem</li>
            <li>Finn vinkelen θ mellom v og B</li>
            <li>Beregn <InlineLatex latex="F = |q|vB\sin\theta" /></li>
            <li>Finn retning med høyrehåndsregelen (husk: snu for negativ ladning!)</li>
            <li>Hvis v ikke er ⊥ B: dekomponér i <InlineLatex latex="v_\perp" /> og <InlineLatex latex="v_\parallel" /></li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Sirkelbane i B-felt</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Identifiser: Er v ⊥ B? Hvis ikke → spiralbane, bruk <InlineLatex latex="v_\perp" /></li>
            <li>Sett <InlineLatex latex="|q|vB = mv^2/r" /> og løs for ukjent (r, v, B, eller m)</li>
            <li>Husk: <InlineLatex latex="\omega = |q|B/m" /> er uavhengig av fart</li>
            <li>Periode: <InlineLatex latex="T = 2\pi r/v = 2\pi m/(|q|B)" /></li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Kraft på strømførende leder</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Identifiser strømretning, lederens lengde, og vinkelen med B</li>
            <li>Bruk <InlineLatex latex="F = IlB\sin\theta" /></li>
            <li>For bøyde ledere: del opp i segmenter, integrer <InlineLatex latex="d\vec{F} = I\,d\vec{l} \times \vec{B}" /></li>
            <li>Bruk symmetri der mulig (f.eks. halvsirkel: x-komponent kansellerer)</li>
          </ol>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil</h4>
          <ul className="space-y-1.5 text-sm">
            <li>• Glemmer sin θ — kraften er IKKE bare qvB</li>
            <li>• Bruker feil vinkel (θ er mellom v og B, IKKE mellom v og normalen)</li>
            <li>• Blander retning for positiv vs. negativ ladning i høyrehåndsregelen</li>
            <li>• Glemmer at magnetkraften ikke gjør arbeid (kan ikke endre kinetisk energi)</li>
            <li>• Bruker v (total fart) istedenfor v⊥ ved spiralbane</li>
            <li>• Forveksler magnetisk fluks (Φ = BA cos φ, vinkelen φ er mellom B og normalen) med magnetkraft (F = qvB sin θ, θ mellom v og B)</li>
          </ul>
        </div>
      </div>

      {/* ── Gjennomgåtte eksempler ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Gjennomgåtte eksempler</h3>

      <ExerciseCard
        number={1}
        title="Proton i uniformt magnetfelt"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              Protoner beveger seg med <InlineLatex latex="v = 3{,}0 \cdot 10^5\;\text{m/s}" /> gjennom
              et uniformt magnetfelt <InlineLatex latex="B = 2{,}0\;\text{T}" /> rettet langs z-aksen.
              Fartsvektoren danner en vinkel på 30° med +z-aksen (mot x-aksen).
            </p>
            <p className="mt-2">Finn størrelsen og retningen på kraften.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Bruk <InlineLatex latex="F = |q|vB\sin\theta" /> med θ = 30°.</p> },
          { label: "Hint 2", content: <p>Bruk høyrehåndsregelen for retningen: v × B.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Fart: <InlineLatex latex="v = 3{,}0 \cdot 10^5\;\text{m/s}" /></li>
                <li>Magnetfelt: <InlineLatex latex="B = 2{,}0\;\text{T}" /> langs z-aksen</li>
                <li>Vinkel mellom v og B: <InlineLatex latex="\theta = 30°" /></li>
                <li>Ladning: <InlineLatex latex="q = +e = 1{,}60 \cdot 10^{-19}\;\text{C}" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>Størrelsen på Lorentzkraften <InlineLatex latex="F_m" /></li>
                <li>Retningen på kraften</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Vi bruker Lorentz-kraftformelen <InlineLatex latex="F = |q|vB\sin\theta" />.
                Bare normalkomponenten av v (vinkelrett på B) bidrar til kraften — parallellkomponenten gir ingen magnetisk kraft.
                Retning bestemmes av høyrehåndsregelen for <InlineLatex latex="\vec{v} \times \vec{B}" />.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm">
              Steg 1: Sett inn i kraftformelen med <InlineLatex latex="\theta = 30°" />.
            </p>
            <FormulaBox
              latex="F_m = |q|vB\sin\theta = 1{,}60 \cdot 10^{-19} \cdot 3{,}0 \cdot 10^5 \cdot 2{,}0 \cdot \sin 30°"
              variant="blue"
            />

            <p className="text-sm">
              Steg 2: <InlineLatex latex="\sin 30° = 0{,}5" />, så:
            </p>
            <FormulaBox
              latex="F_m = 1{,}60 \cdot 10^{-19} \cdot 3{,}0 \cdot 10^5 \cdot 2{,}0 \cdot 0{,}5 = \underline{\underline{4{,}8 \cdot 10^{-14}\;\text{N}}}"
              variant="gold"
            />

            <p className="text-sm">
              Steg 3 — Retning: v har komponenter langs +x og +z, B peker langs +z.
              Høyrehåndsregelen for <InlineLatex latex="\hat{x} \times \hat{z} = -\hat{y}" />.
              Kraften peker i <strong>negativ y-retning</strong>.
            </p>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Bare normalkomponenten <InlineLatex latex="v_\perp = v\sin\theta" /> bidrar til magnetkraften.
                Parallellkomponenten <InlineLatex latex="v_\parallel = v\cos\theta" /> er parallell med B og gir ingen kraft.
                Husk å bruke høyrehåndsregelen systematisk — og snu retningen for negativ ladning.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Proton i spiralbane"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En proton (<InlineLatex latex="q = 1{,}60 \cdot 10^{-19}\;\text{C}" />,{" "}
              <InlineLatex latex="m = 1{,}67 \cdot 10^{-27}\;\text{kg}" />) beveger seg i et magnetfelt{" "}
              <InlineLatex latex="B = 0{,}5\;\text{T}" /> langs x-aksen.
              Farten har komponenter <InlineLatex latex="v_{0x} = 1{,}50 \cdot 10^5\;\text{m/s}" />,{" "}
              <InlineLatex latex="v_{0y} = 0" />, <InlineLatex latex="v_{0z} = 2{,}0 \cdot 10^5\;\text{m/s}" />.
            </p>
            <p className="mt-2">a) Finn kraften.</p>
            <p>b) Finn radius i spiralbanen.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>v_x er parallell med B → gir ingen kraft. Bare v_z (vinkelrett) gir kraft.</p> },
          { label: "Hint 2", content: <p>Radius bruker <InlineLatex latex="v_\perp = v_{0z}" />: <InlineLatex latex="r = mv_\perp/(|q|B)" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Ladning: <InlineLatex latex="q = 1{,}60 \cdot 10^{-19}\;\text{C}" /></li>
                <li>Masse: <InlineLatex latex="m = 1{,}67 \cdot 10^{-27}\;\text{kg}" /></li>
                <li>Magnetfelt: <InlineLatex latex="B = 0{,}5\;\text{T}" /> langs x-aksen</li>
                <li>Fartskomponenter: <InlineLatex latex="v_{0x} = 1{,}50 \cdot 10^5\;\text{m/s}" />, <InlineLatex latex="v_{0z} = 2{,}0 \cdot 10^5\;\text{m/s}" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) Magnetkraften <InlineLatex latex="F_m" /> på protonet</li>
                <li>b) Radius <InlineLatex latex="r" /> i spiralbanen</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Siden B peker langs x-aksen, er <InlineLatex latex="v_{0x}" /> parallell med B og gir <em>ingen kraft</em>.
                Bare <InlineLatex latex="v_\perp = v_{0z}" /> (vinkelrett på B) bidrar til kraften.
                Resultatet er en spiralbane: sirkulær bevegelse i yz-planet kombinert med rettlinjet fart langs x-aksen.
                Radius finner vi ved å sette sentripetalkraften lik magnetkraften.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning — a) Kraft</p>

            <p className="text-sm">
              Steg 1: Identifiser at bare <InlineLatex latex="v_\perp = v_{0z} = 2{,}0 \cdot 10^5\;\text{m/s}" /> bidrar (<InlineLatex latex="v_{0x} \parallel B" /> → ingen kraft).
            </p>
            <FormulaBox
              latex="F_m = |q|v_\perp B = 1{,}60 \cdot 10^{-19} \cdot 2{,}0 \cdot 10^5 \cdot 0{,}5"
              variant="blue"
            />
            <FormulaBox
              latex="F_m = \underline{\underline{1{,}60 \cdot 10^{-14}\;\text{N}}}"
              variant="gold"
            />
            <p className="text-sm">Retning: i y-retningen (fra høyrehåndsregelen: <InlineLatex latex="\hat{z} \times \hat{x} = \hat{y}" />).</p>

            <p className="font-semibold text-sm mt-2">Løsning — b) Radius i spiralbanen</p>

            <p className="text-sm">
              Steg 2: Sett magnetkraft lik sentripetalkraft: <InlineLatex latex="|q|v_\perp B = mv_\perp^2/r" />, som gir <InlineLatex latex="r = mv_\perp/(|q|B)" />.
            </p>
            <FormulaBox
              latex="r = \frac{mv_\perp}{|q|B} = \frac{1{,}67 \cdot 10^{-27} \cdot 2{,}0 \cdot 10^5}{1{,}60 \cdot 10^{-19} \cdot 0{,}5}"
              variant="blue"
            />
            <FormulaBox
              latex="r = \underline{\underline{4{,}18 \cdot 10^{-3}\;\text{m} \approx 4{,}18\;\text{mm}}}"
              variant="gold"
            />

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Dekomponér alltid farten i en komponent parallell med B og en vinkelrett.
                Parallellkomponenten gir rettlinjet bevegelse uten kraft, normalkomponenten gir sirkelbane.
                Kombinert gir dette en spiralbane. Radius avhenger kun av <InlineLatex latex="v_\perp" />, ikke av totalfarten.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Kraft på strømførende leder"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En rett leder med lengde <InlineLatex latex="l = 1{,}00\;\text{m}" /> fører
              en strøm <InlineLatex latex="I = 50\;\text{A}" />.
              Lederen befinner seg i et magnetfelt <InlineLatex latex="B = 1{,}20\;\text{T}" />.
              Vinkelen mellom lederen og B er 45°.
            </p>
            <p className="mt-2">a) Finn kraften.</p>
            <p>b) Hva er maks kraft? Når er F = 0?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p><InlineLatex latex="F = IlB\sin\theta" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Lengde: <InlineLatex latex="l = 1{,}00\;\text{m}" /></li>
                <li>Strøm: <InlineLatex latex="I = 50\;\text{A}" /></li>
                <li>Magnetfelt: <InlineLatex latex="B = 1{,}20\;\text{T}" /></li>
                <li>Vinkel mellom leder og B: <InlineLatex latex="\theta = 45°" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) Kraften <InlineLatex latex="F_m" /> på lederen ved <InlineLatex latex="\theta = 45°" /></li>
                <li>b) Maksimal kraft og betingelse for null kraft</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                En strømførende leder i et magnetfelt opplever en kraft gitt av <InlineLatex latex="F = IlB\sin\theta" />,
                der θ er vinkelen mellom strømretningen og B. Formelen er analog med Lorentz-kraften på enkeltladninger —
                strøm er ladning i bevegelse. Maks kraft er ved <InlineLatex latex="\theta = 90°" /> (leder vinkelrett på B),
                null kraft ved <InlineLatex latex="\theta = 0°" /> (leder parallell med B).
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning — a) Kraft ved θ = 45°</p>

            <p className="text-sm">
              Steg 1: Sett inn de kjente verdiene i kraftformelen.
            </p>
            <FormulaBox
              latex="F_m = IlB\sin\theta = 50 \cdot 1{,}00 \cdot 1{,}20 \cdot \sin 45°"
              variant="blue"
            />

            <p className="text-sm">
              Steg 2: <InlineLatex latex="\sin 45° = \frac{\sqrt{2}}{2} \approx 0{,}7071" />, så:
            </p>
            <FormulaBox
              latex="F_m = 60 \cdot 0{,}7071 = \underline{\underline{42{,}4\;\text{N}}}"
              variant="gold"
            />
            <p className="text-sm">Retning: ut av arket (høyrehåndsregelen).</p>

            <p className="font-semibold text-sm mt-2">Løsning — b) Maksimal og null kraft</p>

            <p className="text-sm">
              Steg 3: Maks kraft oppnås når <InlineLatex latex="\sin\theta = 1" />, dvs. <InlineLatex latex="\theta = 90°" />.
            </p>
            <FormulaBox
              latex="F_\text{maks} = IlB = 50 \cdot 1{,}00 \cdot 1{,}20 = \underline{\underline{60\;\text{N}}} \quad (\theta = 90°)"
              variant="gold"
            />

            <p className="text-sm">
              Steg 4: Kraften er null når strømmen er parallell med B (<InlineLatex latex="\theta = 0°" />, <InlineLatex latex="\sin 0° = 0" />).
            </p>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Kraften på en strømførende leder følger nøyaktig samme vinkelavhengighet som for enkeltladninger.
                Maks kraft ved <InlineLatex latex="\theta = 90°" /> (vinkelrett), null kraft ved <InlineLatex latex="\theta = 0°" /> (parallell).
                Dette er grunnlaget for elektromotorer.
              </p>
            </div>
          </div>
        }
      />

      {/* ── Øvingsoppgaver ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Elektron i magnetfelt"
        difficulty="lett"
        problem={
          <div>
            <p>
              Et elektron (<InlineLatex latex="m_e = 9{,}11 \cdot 10^{-31}\;\text{kg}" />) beveger seg med
              fart <InlineLatex latex="v = 5{,}0 \cdot 10^6\;\text{m/s}" /> vinkelrett på et uniformt
              magnetfelt <InlineLatex latex="B = 0{,}10\;\text{T}" />.
            </p>
            <p className="mt-2">a) Finn kraften på elektronet.</p>
            <p>b) Finn radius og periode for sirkelbanen.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>v ⊥ B betyr θ = 90° og sin θ = 1.</p> },
          { label: "Hint 2", content: <p>Radius: <InlineLatex latex="r = m_e v/(eB)" />. Periode: <InlineLatex latex="T = 2\pi r/v" />.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Elektronmasse: <InlineLatex latex="m_e = 9{,}11 \cdot 10^{-31}\;\text{kg}" /></li>
                <li>Ladning: <InlineLatex latex="|q| = e = 1{,}60 \cdot 10^{-19}\;\text{C}" /></li>
                <li>Fart: <InlineLatex latex="v = 5{,}0 \cdot 10^6\;\text{m/s}" /></li>
                <li>Magnetfelt: <InlineLatex latex="B = 0{,}10\;\text{T}" /></li>
                <li>Vinkel: <InlineLatex latex="\theta = 90°" /> (v vinkelrett på B)</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) Magnetkraften <InlineLatex latex="F" /> på elektronet</li>
                <li>b) Radius <InlineLatex latex="r" /> og periode <InlineLatex latex="T" /> for sirkelbanen</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Siden v ⊥ B er <InlineLatex latex="\sin\theta = 1" /> og vi får maks kraft: <InlineLatex latex="F = evB" />.
                Magnetkraften virker alltid vinkelrett på bevegelsen — den gjør ingen arbeid, men bøyer banen til en sirkel.
                Radius finner vi ved at magnetkraft = sentripetalkraft: <InlineLatex latex="evB = m_e v^2/r" />.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning — a) Kraft</p>

            <p className="text-sm">
              Steg 1: Siden <InlineLatex latex="\theta = 90°" /> forenkles kraftformelen til <InlineLatex latex="F = evB" />.
            </p>
            <FormulaBox
              latex="F = evB = 1{,}60 \cdot 10^{-19} \cdot 5{,}0 \cdot 10^6 \cdot 0{,}10"
              variant="blue"
            />
            <FormulaBox
              latex="F = \underline{\underline{8{,}0 \cdot 10^{-14}\;\text{N}}}"
              variant="gold"
            />

            <p className="font-semibold text-sm mt-2">Løsning — b) Radius og periode</p>

            <p className="text-sm">
              Steg 2: Sett magnetkraft lik sentripetalkraft og løs for r.
            </p>
            <FormulaBox
              latex="r = \frac{m_e v}{eB} = \frac{9{,}11 \cdot 10^{-31} \cdot 5{,}0 \cdot 10^6}{1{,}60 \cdot 10^{-19} \cdot 0{,}10}"
              variant="blue"
            />
            <FormulaBox
              latex="r = \underline{\underline{2{,}85 \cdot 10^{-4}\;\text{m} \approx 0{,}285\;\text{mm}}}"
              variant="gold"
            />

            <p className="text-sm">
              Steg 3: Perioden er omkretsens lengde delt på farten.
            </p>
            <FormulaBox
              latex="T = \frac{2\pi r}{v} = \frac{2\pi \cdot 2{,}85 \cdot 10^{-4}}{5{,}0 \cdot 10^6}"
              variant="blue"
            />
            <FormulaBox
              latex="T = \underline{\underline{3{,}58 \cdot 10^{-10}\;\text{s} \approx 0{,}36\;\text{ns}}}"
              variant="gold"
            />

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Når v ⊥ B beveger en ladet partikkel seg i en perfekt sirkel med konstant fart.
                Magnetkraften gjør ingen arbeid — den endrer retning, ikke fart.
                Merk at perioden <InlineLatex latex="T = 2\pi m_e/(eB)" /> er uavhengig av farten — dette er prinsippet bak syklotronens fastholdelse av partikler.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Fartsvelger"
        difficulty="middels"
        problem={
          <div>
            <p>
              I en fartsvelger er <InlineLatex latex="E = 2{,}0 \cdot 10^5\;\text{V/m}" /> og{" "}
              <InlineLatex latex="B = 0{,}40\;\text{T}" />.
            </p>
            <p className="mt-2">a) Hvilken fart har partiklene som passerer uavbøyd?</p>
            <p>b) Partiklene sendes inn i et nytt felt <InlineLatex latex="B' = 0{,}80\;\text{T}" /> og følger en sirkelbane med radius R = 0,012 m. Finn massen til partiklene dersom de har ladning +e.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Fartsvelger: <InlineLatex latex="v = E/B" /></p> },
          { label: "Hint 2", content: <p>Massespektrometer: <InlineLatex latex="m = qB'R/v" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Elektrisk felt i fartsvelger: <InlineLatex latex="E = 2{,}0 \cdot 10^5\;\text{V/m}" /></li>
                <li>Magnetfelt i fartsvelger: <InlineLatex latex="B = 0{,}40\;\text{T}" /></li>
                <li>Magnetfelt i massespektrometer: <InlineLatex latex="B' = 0{,}80\;\text{T}" /></li>
                <li>Sirkelbaneradius: <InlineLatex latex="R = 0{,}012\;\text{m}" /></li>
                <li>Ladning: <InlineLatex latex="q = +e = 1{,}60 \cdot 10^{-19}\;\text{C}" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) Farten <InlineLatex latex="v" /> til partiklene som passerer uavbøyd</li>
                <li>b) Massen <InlineLatex latex="m" /> til partiklene</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                I en fartsvelger balanserer elektrisk kraft og magnetisk kraft hverandre: <InlineLatex latex="qE = qvB" />, som gir <InlineLatex latex="v = E/B" />.
                Bare partikler med akkurat denne farten passerer rett gjennom.
                Etterpå sendes partiklene inn i et rent magnetfelt (massespektrometer), der sirkelbaneradius avhenger av masse:
                <InlineLatex latex="r = mv/(qB')" />, slik at <InlineLatex latex="m = qB'R/v" />.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning — a) Fart i fartsvelger</p>

            <p className="text-sm">
              Steg 1: Likevekt mellom elektrisk og magnetisk kraft gir betingelsen <InlineLatex latex="qE = qvB" />.
              Ladningen kansellerer og vi løser for v.
            </p>
            <FormulaBox
              latex="v = \frac{E}{B} = \frac{2{,}0 \cdot 10^5}{0{,}40}"
              variant="blue"
            />
            <FormulaBox
              latex="v = \underline{\underline{5{,}0 \cdot 10^5\;\text{m/s}}}"
              variant="gold"
            />

            <p className="font-semibold text-sm mt-2">Løsning — b) Masse</p>

            <p className="text-sm">
              Steg 2: I magnetfeltet <InlineLatex latex="B'" /> setter vi magnetkraft lik sentripetalkraft og løser for m.
            </p>
            <FormulaBox
              latex="m = \frac{qB'R}{v} = \frac{1{,}60 \cdot 10^{-19} \cdot 0{,}80 \cdot 0{,}012}{5{,}0 \cdot 10^5}"
              variant="blue"
            />
            <FormulaBox
              latex="m = \underline{\underline{3{,}07 \cdot 10^{-25}\;\text{kg}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Sammenlign med protonmasse 1,67 × 10⁻²⁷ kg — dette er ca. 184 protonmasser,
              noe som tilsvarer et tungt ion.
            </p>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Fartsvelger + massespektrometer er et klassisk to-stegs system: først velg fart med <InlineLatex latex="v = E/B" />,
                deretter bestem masse med <InlineLatex latex="m = qB'R/v" />.
                Legg merke til at ladningen kansellerer i fartsvelgeren — alle ladninger med samme fart passerer, uavhengig av ladningens størrelse.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Magnetisk fluks"
        difficulty="middels"
        problem={
          <div>
            <p>
              Et uniformt magnetfelt med flukstetthet B går gjennom en rektangulær sløyfe
              med areal <InlineLatex latex="A = 3{,}0\;\text{cm}^2 = 3{,}0 \cdot 10^{-4}\;\text{m}^2" />.
              Vinkelen mellom B og flatens normal er <InlineLatex latex="\varphi = 60°" />.
              Magnetisk fluks gjennom sløyfen er <InlineLatex latex="\Phi_B = 0{,}90 \cdot 10^{-3}\;\text{Wb}" />.
            </p>
            <p className="mt-2">Finn B.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p><InlineLatex latex="\Phi_B = BA\cos\varphi" />. Løs for B.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Areal: <InlineLatex latex="A = 3{,}0 \cdot 10^{-4}\;\text{m}^2" /></li>
                <li>Vinkel mellom B og flatens normal: <InlineLatex latex="\varphi = 60°" /></li>
                <li>Magnetisk fluks: <InlineLatex latex="\Phi_B = 0{,}90 \cdot 10^{-3}\;\text{Wb}" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>Magnetisk flukstetthet <InlineLatex latex="B" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Magnetisk fluks er definert som <InlineLatex latex="\Phi_B = BA\cos\varphi" />, der
                <InlineLatex latex="\varphi" /> er vinkelen mellom B og <em>normalen</em> til flaten (ikke mellom B og selve flaten).
                Vi kjenner <InlineLatex latex="\Phi_B" />, A og <InlineLatex latex="\varphi" />, og løser algebraisk for B.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm">
              Steg 1: Start med fluksdefinisjonen og løs for B.
            </p>
            <FormulaBox
              latex="\Phi_B = BA\cos\varphi \quad \Rightarrow \quad B = \frac{\Phi_B}{A\cos\varphi}"
              variant="blue"
            />

            <p className="text-sm">
              Steg 2: Sett inn tallverdier. <InlineLatex latex="\cos 60° = 0{,}5" />.
            </p>
            <FormulaBox
              latex="B = \frac{0{,}90 \cdot 10^{-3}}{3{,}0 \cdot 10^{-4} \cdot \cos 60°} = \frac{0{,}90 \cdot 10^{-3}}{3{,}0 \cdot 10^{-4} \cdot 0{,}5} = \frac{0{,}90 \cdot 10^{-3}}{1{,}5 \cdot 10^{-4}}"
              variant="blue"
            />
            <FormulaBox
              latex="B = \underline{\underline{6{,}0\;\text{T}}}"
              variant="gold"
            />

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Pass på vinkelen: <InlineLatex latex="\varphi" /> i <InlineLatex latex="\Phi_B = BA\cos\varphi" /> er mellom B og <em>normalen</em> til flaten.
                Hvis B er parallell med flaten (ikke normalen), er <InlineLatex latex="\varphi = 90°" /> og fluks = 0.
                Hvis B er vinkelrett på flaten (parallell med normalen), er <InlineLatex latex="\varphi = 0°" /> og fluks = BA (maks).
              </p>
            </div>
          </div>
        }
      />

      {/* ── Eksamensoppgaver ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips</h4>
        <p className="text-sm">
          Magnetisme-oppgaver på eksamen tester ofte: (1) kraft og retning med høyrehåndsregelen,
          (2) sirkelbane/spiralbane med radius-beregning, (3) kraft på strømførende leder.
          Tegn ALLTID figur med v, B, F og koordinatsystem. Bruk høyrehåndsregelen systematisk.
        </p>
      </div>

      <ExerciseCard
        number={1}
        title="Leder med rett del og halvsirkel i magnetfelt"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              En leder fører strøm I i et uniformt magnetfelt <InlineLatex latex="\vec{B}" /> (inn i arket).
              Lederen består av en rett del med lengde L (langs x-aksen) og en halvsirkel med radius R
              (i xy-planet, over den rette delen).
            </p>
            <p className="mt-2">Finn total kraft på lederen.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Del opp: rett del gir <InlineLatex latex="F_1 = ILB" /> i y-retning. Halvsirkelen krever integrasjon.</p> },
          { label: "Hint 2", content: <p>For halvsirkelen: <InlineLatex latex="dl = R\,d\theta" />. Pga. symmetri kansellerer x-komponentene. Integrer bare y-komponenten.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Strøm: <InlineLatex latex="I" /></li>
                <li>Magnetfelt: <InlineLatex latex="\vec{B}" /> inn i arket (langs <InlineLatex latex="-\hat{z}" />)</li>
                <li>Rett del: lengde L langs x-aksen</li>
                <li>Halvsirkel: radius R i xy-planet over den rette delen</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>Total kraft <InlineLatex latex="\vec{F}_\text{tot}" /> på hele lederen</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Del lederen i to deler og summer bidragene. Den rette delen er enkel: <InlineLatex latex="F_1 = ILB" />.
                For halvsirkelen bruker vi <InlineLatex latex="d\vec{F} = I\,d\vec{l} \times \vec{B}" /> og integrer over vinkelen.
                Symmetriargument: x-komponentene fra motstående punkter på halvsirkelen kansellerer — vi trenger bare integrere y-komponenten.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>

            <p className="text-sm">
              Steg 1: Kraft på den rette delen. Strøm langs +x, B langs <InlineLatex latex="-\hat{z}" />.
              <InlineLatex latex="\hat{x} \times (-\hat{z}) = \hat{y}" />.
            </p>
            <FormulaBox
              latex="\vec{F}_1 = I\vec{l} \times \vec{B} = ILB\,\hat{\jmath}"
              variant="blue"
            />

            <p className="text-sm">
              Steg 2: Kraft på halvsirkelen. Et element <InlineLatex latex="d\vec{l} = R\,d\theta\,(-\sin\theta\,\hat{x} + \cos\theta\,\hat{y})" />.
              Pga. symmetri er <InlineLatex latex="F_{2x} = 0" />. Y-komponenten:
            </p>
            <FormulaBox
              latex="F_{2y} = \int_0^\pi I \cdot B \cdot R\,d\theta \cdot \sin\theta = BIR \int_0^\pi \sin\theta\,d\theta = BIR \cdot [-\cos\theta]_0^\pi = BIR \cdot 2 = 2BIR"
              variant="blue"
            />

            <p className="text-sm">
              Steg 3: Summer de to bidragene.
            </p>
            <FormulaBox
              latex="\vec{F}_\text{tot} = \vec{F}_1 + \vec{F}_2 = ILB\,\hat{\jmath} + 2BIR\,\hat{\jmath} = \underline{\underline{BI(L + 2R)\,\hat{\jmath}}}"
              variant="gold"
            />

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-blue-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Bruk symmetri aktivt for å forenkle integrasjon av bøyde ledere — x-komponentene kansellerer her.
                Resultatet <InlineLatex latex="F = BI(L+2R)" /> er det samme som kraften på en rett leder med total lengde <InlineLatex latex="L + 2R" />.
                For lukkede strømsløyfer i uniformt felt er netto kraft alltid null, men det kan virke et dreiemoment.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Kombinert E- og B-felt — partikkelbane"
        difficulty="vanskelig"
        problem={
          <div>
            <p>
              Et proton akselereres fra ro gjennom en potensialdifferanse <InlineLatex latex="\Delta V = 500\;\text{V}" />.
              Det sendes deretter inn i et område med uniformt magnetfelt <InlineLatex latex="B = 0{,}20\;\text{T}" /> vinkelrett
              på farten.
            </p>
            <p className="mt-2">a) Finn farten til protonet etter akselerasjonen.</p>
            <p>b) Finn radius for sirkelbanen i magnetfeltet.</p>
            <p>c) Hvor lang tid bruker protonet på en halv omdreining?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Energibevaring: <InlineLatex latex="q\Delta V = \frac{1}{2}mv^2" /></p> },
          { label: "Hint 2", content: <p>Radius: <InlineLatex latex="r = mv/(eB)" />. Halv omdreining = <InlineLatex latex="T/2 = \pi r/v" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-0.5">
                <li>Potensialdifferanse: <InlineLatex latex="\Delta V = 500\;\text{V}" /></li>
                <li>Magnetfelt: <InlineLatex latex="B = 0{,}20\;\text{T}" /></li>
                <li>Protonladning: <InlineLatex latex="e = 1{,}60 \cdot 10^{-19}\;\text{C}" /></li>
                <li>Protonmasse: <InlineLatex latex="m_p = 1{,}67 \cdot 10^{-27}\;\text{kg}" /></li>
                <li>Protonet starter fra ro, v ⊥ B i magnetfeltet</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-0.5">
                <li>a) Fart <InlineLatex latex="v" /> etter akselerasjonen</li>
                <li>b) Radius <InlineLatex latex="r" /> for sirkelbanen i magnetfeltet</li>
                <li>c) Tid <InlineLatex latex="t" /> for halv omdreining</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                To-stegs problem: (1) E-feltet akselererer protonet — bruk energibevaring
                <InlineLatex latex="e\Delta V = \frac{1}{2}m_p v^2" /> for å finne farten.
                (2) B-feltet bøyer banen til en sirkel — bruk <InlineLatex latex="evB = m_p v^2/r" /> for radius.
                Tid for halv omdreining er halvparten av perioden <InlineLatex latex="T = 2\pi r/v" />.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning — a) Fart etter akselerasjon</p>

            <p className="text-sm">
              Steg 1: Elektrisk potensiell energi omdannes til kinetisk energi. Løs for v.
            </p>
            <FormulaBox
              latex="e\Delta V = \frac{1}{2}m_p v^2 \quad \Rightarrow \quad v = \sqrt{\frac{2e\Delta V}{m_p}}"
              variant="blue"
            />

            <p className="text-sm">
              Steg 2: Sett inn tallverdiene.
            </p>
            <FormulaBox
              latex="v = \sqrt{\frac{2 \cdot 1{,}60 \cdot 10^{-19} \cdot 500}{1{,}67 \cdot 10^{-27}}} = \underline{\underline{3{,}10 \cdot 10^5\;\text{m/s}}}"
              variant="gold"
            />

            <p className="font-semibold text-sm mt-2">Løsning — b) Radius</p>

            <p className="text-sm">
              Steg 3: Sett magnetkraft lik sentripetalkraft: <InlineLatex latex="evB = m_p v^2/r" />, løs for r.
            </p>
            <FormulaBox
              latex="r = \frac{m_p v}{eB} = \frac{1{,}67 \cdot 10^{-27} \cdot 3{,}10 \cdot 10^5}{1{,}60 \cdot 10^{-19} \cdot 0{,}20}"
              variant="blue"
            />
            <FormulaBox
              latex="r = \underline{\underline{0{,}0162\;\text{m} \approx 16{,}2\;\text{mm}}}"
              variant="gold"
            />

            <p className="font-semibold text-sm mt-2">Løsning — c) Tid for halv omdreining</p>

            <p className="text-sm">
              Steg 4: Halv omdreining tilsvarer strekningen <InlineLatex latex="\pi r" /> ved farten v.
            </p>
            <FormulaBox
              latex="t = \frac{T}{2} = \frac{\pi r}{v} = \frac{\pi \cdot 0{,}0162}{3{,}10 \cdot 10^5}"
              variant="blue"
            />
            <FormulaBox
              latex="t = \underline{\underline{1{,}64 \cdot 10^{-7}\;\text{s} \approx 164\;\text{ns}}}"
              variant="gold"
            />

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Kombiner energibevaring (E-felt gir fart) med sirkelbane-analyse (B-felt bøyer banen).
                Dette er et typisk eksamensoppsett — to separate felt med to separate prinsipper.
                Legg merke til at perioden <InlineLatex latex="T = 2\pi m_p/(eB)" /> er uavhengig av farten,
                noe som er grunnprinsippet i syklotronakseleratoren.
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}
