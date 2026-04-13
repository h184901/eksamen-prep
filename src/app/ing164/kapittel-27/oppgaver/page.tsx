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
            <p><strong>Størrelse:</strong></p>
            <FormulaBox
              latex="F_m = |q|vB\sin 30° = 1{,}60 \cdot 10^{-19} \cdot 3{,}0 \cdot 10^5 \cdot 2{,}0 \cdot 0{,}5 = \underline{\underline{4{,}8 \cdot 10^{-14}\;\text{N}}}"
              variant="gold"
            />
            <p><strong>Retning:</strong></p>
            <p className="text-sm">
              Høyrehåndsregelen: v har komponent i xz-planet (mot +x og +z), B langs +z.
              Kraften peker i <strong>negativ y-retning</strong>.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Bare normalkomponenten v⊥ = v sin θ bidrar til kraften. Parallellkomponenten v∥ = v cos θ gir ingen kraft.</p>
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
            <p><strong>a) Kraft:</strong></p>
            <p className="text-sm">Bare <InlineLatex latex="v_\perp = v_{0z} = 2{,}0 \cdot 10^5\;\text{m/s}" /> bidrar (v_x ∥ B).</p>
            <FormulaBox
              latex="F_m = |q|v_\perp B = 1{,}60 \cdot 10^{-19} \cdot 2{,}0 \cdot 10^5 \cdot 0{,}5 = \underline{\underline{1{,}60 \cdot 10^{-14}\;\text{N}}}"
              variant="gold"
            />
            <p className="text-sm">Retning: i y-retningen (fra høyrehåndsregelen).</p>

            <p><strong>b) Radius i spiralbanen:</strong></p>
            <FormulaBox
              latex="r = \frac{mv_\perp}{|q|B} = \frac{1{,}67 \cdot 10^{-27} \cdot 2{,}0 \cdot 10^5}{1{,}60 \cdot 10^{-19} \cdot 0{,}5} = \underline{\underline{4{,}18\;\text{mm}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Dekomponér farten i v∥ og v⊥. Parallellkomponenten gir rettlinjet bevegelse, normalkomponenten gir sirkelbane → spiralbane.</p>
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
            <p><strong>a)</strong></p>
            <FormulaBox
              latex="F_m = IlB\sin 45° = 50 \cdot 1{,}00 \cdot 1{,}20 \cdot \sin 45° = \underline{\underline{42{,}4\;\text{N}}}"
              variant="gold"
            />
            <p className="text-sm">Rettet ut av arket (høyrehåndsregelen).</p>

            <p><strong>b) Maks og null:</strong></p>
            <FormulaBox latex="F_\text{maks} = IlB = 50 \cdot 1{,}00 \cdot 1{,}20 = \underline{\underline{60\;\text{N}}} \quad (\theta = 90°)" variant="gold" />
            <p className="text-sm">Når <InlineLatex latex="\theta = 0°" /> (strøm parallell med B): <InlineLatex latex="F_m = 0" />.</p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Helt likt som for enkeltladninger — maks kraft ved θ = 90°, null kraft ved θ = 0°.</p>
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
            <p><strong>a) Kraft:</strong></p>
            <FormulaBox
              latex="F = eVB = 1{,}60 \cdot 10^{-19} \cdot 5{,}0 \cdot 10^6 \cdot 0{,}10 = \underline{\underline{8{,}0 \cdot 10^{-14}\;\text{N}}}"
              variant="gold"
            />
            <p><strong>b) Radius:</strong></p>
            <FormulaBox
              latex="r = \frac{m_e v}{eB} = \frac{9{,}11 \cdot 10^{-31} \cdot 5{,}0 \cdot 10^6}{1{,}60 \cdot 10^{-19} \cdot 0{,}10} = \underline{\underline{2{,}85 \cdot 10^{-4}\;\text{m} \approx 0{,}285\;\text{mm}}}"
              variant="gold"
            />
            <p><strong>Periode:</strong></p>
            <FormulaBox
              latex="T = \frac{2\pi r}{v} = \frac{2\pi \cdot 2{,}85 \cdot 10^{-4}}{5{,}0 \cdot 10^6} = \underline{\underline{3{,}58 \cdot 10^{-10}\;\text{s} \approx 0{,}36\;\text{ns}}}"
              variant="gold"
            />
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
            <p><strong>a)</strong></p>
            <FormulaBox latex="v = \frac{E}{B} = \frac{2{,}0 \cdot 10^5}{0{,}40} = \underline{\underline{5{,}0 \cdot 10^5\;\text{m/s}}}" variant="gold" />
            <p><strong>b)</strong></p>
            <FormulaBox
              latex="m = \frac{qB'R}{v} = \frac{1{,}60 \cdot 10^{-19} \cdot 0{,}80 \cdot 0{,}012}{5{,}0 \cdot 10^5} = \underline{\underline{3{,}07 \cdot 10^{-25}\;\text{kg}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Sammenlign med protonmasse 1,67 × 10⁻²⁷ kg — dette er ca. 184 protonmasser,
              noe som tilsvarer et tungt ion.
            </p>
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
            <FormulaBox
              latex="B = \frac{\Phi_B}{A\cos\varphi} = \frac{0{,}90 \cdot 10^{-3}}{3{,}0 \cdot 10^{-4} \cdot \cos 60°} = \frac{0{,}90 \cdot 10^{-3}}{1{,}5 \cdot 10^{-4}} = \underline{\underline{6{,}0\;\text{T}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Husk at φ er vinkelen mellom B og <em>normalen</em> til flaten, ikke mellom B og selve flaten.</p>
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
            <p><strong>Rett del:</strong></p>
            <FormulaBox latex="\vec{F}_1 = I\vec{l} \times \vec{B} = ILB\,\hat{\jmath}" variant="blue" />

            <p><strong>Halvsirkel:</strong></p>
            <p className="text-sm">Pga. symmetri er <InlineLatex latex="F_{2x} = 0" />. Y-komponenten:</p>
            <FormulaBox latex="F_{2y} = \int_0^\pi I \cdot B \cdot R\,d\theta \cdot \sin\theta = BIR \int_0^\pi \sin\theta\,d\theta = BIR \cdot 2 = 2BIR" variant="blue" />

            <p><strong>Total kraft:</strong></p>
            <FormulaBox latex="\vec{F}_\text{tot} = \vec{F}_1 + \vec{F}_2 = ILB\,\hat{\jmath} + 2BIR\,\hat{\jmath} = \underline{\underline{BI(L + 2R)\,\hat{\jmath}}}" variant="gold" />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Bruk symmetri for å forenkle integrasjon. For lukkede strømsløyfer i uniformt felt: nettokraften er null, men det kan virke et dreiemoment.</p>
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
            <p><strong>a) Fart etter akselerasjon:</strong></p>
            <FormulaBox latex="e\Delta V = \frac{1}{2}m_p v^2 \quad \Rightarrow \quad v = \sqrt{\frac{2e\Delta V}{m_p}}" variant="blue" />
            <FormulaBox
              latex="v = \sqrt{\frac{2 \cdot 1{,}60 \cdot 10^{-19} \cdot 500}{1{,}67 \cdot 10^{-27}}} = \underline{\underline{3{,}10 \cdot 10^5\;\text{m/s}}}"
              variant="gold"
            />

            <p><strong>b) Radius:</strong></p>
            <FormulaBox
              latex="r = \frac{m_p v}{eB} = \frac{1{,}67 \cdot 10^{-27} \cdot 3{,}10 \cdot 10^5}{1{,}60 \cdot 10^{-19} \cdot 0{,}20} = \underline{\underline{0{,}0162\;\text{m} \approx 16{,}2\;\text{mm}}}"
              variant="gold"
            />

            <p><strong>c) Tid for halv omdreining:</strong></p>
            <FormulaBox
              latex="t = \frac{\pi r}{v} = \frac{\pi \cdot 0{,}0162}{3{,}10 \cdot 10^5} = \underline{\underline{1{,}64 \cdot 10^{-7}\;\text{s} \approx 164\;\text{ns}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Kombiner energibevaring (fra E-feltet) med sirkelbane-analyse (i B-feltet). Dette er et typisk mønster i eksamensoppgaver.</p>
          </div>
        }
      />
    </div>
  );
}
