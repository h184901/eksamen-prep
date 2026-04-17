"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver — Kapittel 27</h2>

      <CollapsibleSection title="Oppgavestrategier">
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
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
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
              latex="F_m = 1{,}60 \cdot 10^{-19} \cdot 3{,}0 \cdot 10^5 \cdot 2{,}0 \cdot 0{,}5 = \boxed{4{,}8 \cdot 10^{-14}\;\text{N}}"
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
              latex="F_m = \boxed{1{,}60 \cdot 10^{-14}\;\text{N}}"
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
              latex="r = \boxed{4{,}18 \cdot 10^{-3}\;\text{m} \approx 4{,}18\;\text{mm}}"
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
              latex="F_m = 60 \cdot 0{,}7071 = \boxed{42{,}4\;\text{N}}"
              variant="gold"
            />
            <p className="text-sm">Retning: ut av arket (høyrehåndsregelen).</p>

            <p className="font-semibold text-sm mt-2">Løsning — b) Maksimal og null kraft</p>

            <p className="text-sm">
              Steg 3: Maks kraft oppnås når <InlineLatex latex="\sin\theta = 1" />, dvs. <InlineLatex latex="\theta = 90°" />.
            </p>
            <FormulaBox
              latex="F_\text{maks} = IlB = 50 \cdot 1{,}00 \cdot 1{,}20 = \boxed{60\;\text{N}} \quad (\theta = 90°)"
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
        <Link href="/ing164/eksamen/oppgaver/kapittel-27" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 27</p>
        </Link>
      </div>
    </div>
  );
}
