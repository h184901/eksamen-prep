"use client";

import ExerciseCard from "@/components/ExerciseCard";
import InlineLatex from "@/components/InlineLatex";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver</h2>

      {/* ─── Oppgavestrategier ─── */}
      <h3 className="font-semibold text-xl mb-4">Oppgavestrategier</h3>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
        <h3 className="font-semibold text-lg mb-3">Strategi: Kinematikk-oppgaver (konstant α)</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Identifiser kjente og ukjente (<InlineLatex latex="\theta_0, \omega_0, \alpha, t, \theta, \omega" />)</li>
          <li>Velg riktig kinematikkformel (som i kap 2, bare rotasjonsversjonen)</li>
          <li>Konverter enheter: rpm → rad/s, omdreininger → rad</li>
          <li>Løs for den ukjente</li>
          <li>Sjekk: Stemmer fortegn? Er svaret rimelig?</li>
        </ol>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
        <h3 className="font-semibold text-lg mb-3">Strategi: Treghetsmoment-oppgaver</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Identifiser formen (disk, stav, kule, ring) → velg riktig <InlineLatex latex="I" />-formel</li>
          <li>Sjekk rotasjonsaksen — er den gjennom CM eller forskjøvet?</li>
          <li>Hvis forskjøvet: bruk parallellakseteoremet <InlineLatex latex="I_P = I_{CM} + Md^2" /></li>
          <li>Sammensatt legeme: <InlineLatex latex="I_\text{tot} = I_1 + I_2 + \ldots" /> (om SAMME akse)</li>
        </ol>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-8">
        <h3 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-red-600 dark:text-red-400">
          <li>Glemmer å konvertere rpm til rad/s eller omdreininger til rad</li>
          <li>Bruker feil formel for I (f.eks. disk-formelen for en ring)</li>
          <li>Forveksler <InlineLatex latex="r" /> (avstand fra akse) med <InlineLatex latex="R" /> (radius til legemet)</li>
          <li>Bruker parallellakseteoremet med en akse som IKKE er gjennom CM som utgangspunkt</li>
          <li>Glemmer at <InlineLatex latex="v = r\omega" /> krever at <InlineLatex latex="\omega" /> er i rad/s</li>
        </ul>
      </div>

      {/* ─── Gjennomgåtte eksempler ─── */}
      <h3 className="font-semibold text-xl mb-4">Gjennomgåtte eksempler</h3>

      {/* Eksempel 1 */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h3 className="font-semibold text-lg mb-3">Eksempel 1: Slipestein med konstant α</h3>
        <p className="text-[var(--muted)] mb-4">
          En slipestein starter fra ro og akselererer med <InlineLatex latex="\alpha = 0{,}60 \text{ rad/s}^2" /> i 8,0 s. Finn (a) vinkelhastigheten, (b) antall omdreininger.
        </p>
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hva vet vi?</p>
            <p className="text-sm"><InlineLatex latex="\omega_0 = 0" />, <InlineLatex latex="\alpha = 0{,}60 \text{ rad/s}^2" />, <InlineLatex latex="t = 8{,}0 \text{ s}" /></p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
            <p className="text-sm mb-2">(a) <InlineLatex latex="\omega = \omega_0 + \alpha t = 0 + 0{,}60 \times 8{,}0 = 4{,}8 \text{ rad/s}" /></p>
            <p className="text-sm mb-2">(b) <InlineLatex latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2 = 0 + \tfrac{1}{2}(0{,}60)(8{,}0)^2 = 19{,}2 \text{ rad}" /></p>
            <p className="text-sm"><InlineLatex latex="\text{Omdreininger} = \frac{19{,}2}{2\pi} = 3{,}06 \approx 3{,}1 \text{ omdreininger}" /></p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
            <p className="text-sm">Formlene er identiske med rettlinjet kinematikk — bare bruk <InlineLatex latex="\theta, \omega, \alpha" /> i stedet for <InlineLatex latex="x, v, a" />. Husk å konvertere omdreininger ↔ radianer!</p>
          </div>
        </div>
      </div>

      {/* Eksempel 2 */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h3 className="font-semibold text-lg mb-3">Eksempel 2: CD-spiller</h3>
        <p className="text-[var(--muted)] mb-4">
          En CD med radius 6,0 cm roterer med 200 rpm. Finn (a) vinkelhastigheten i rad/s, (b) lineær fart på kanten, (c) sentripetalakselerasjonen.
        </p>
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hva vet vi?</p>
            <p className="text-sm"><InlineLatex latex="R = 0{,}060 \text{ m}" />, <InlineLatex latex="n = 200 \text{ rpm}" /></p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
            <p className="text-sm mb-2">(a) <InlineLatex latex="\omega = 200 \times \frac{2\pi}{60} = 20{,}9 \text{ rad/s}" /></p>
            <p className="text-sm mb-2">(b) <InlineLatex latex="v = r\omega = 0{,}060 \times 20{,}9 = 1{,}26 \text{ m/s}" /></p>
            <p className="text-sm">(c) <InlineLatex latex="a_\text{rad} = r\omega^2 = 0{,}060 \times (20{,}9)^2 = 26{,}2 \text{ m/s}^2" /></p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
            <p className="text-sm">Konverter alltid rpm til rad/s: <InlineLatex latex="\omega = n \times \frac{2\pi}{60}" />. Bruk <InlineLatex latex="v = r\omega" /> for linjefart.</p>
          </div>
        </div>
      </div>

      {/* Eksempel 3 */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-8">
        <h3 className="font-semibold text-lg mb-3">Eksempel 3: Treghetsmoment for et system</h3>
        <p className="text-[var(--muted)] mb-4">
          Fire partikler med masse 0,50 kg sitter i hjørnene av et kvadrat med side 0,40 m. Finn treghetsmomentet om en akse gjennom sentrum, vinkelrett på planet.
        </p>
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hva vet vi?</p>
            <p className="text-sm"><InlineLatex latex="m = 0{,}50 \text{ kg}" /> per partikkel, side <InlineLatex latex="a = 0{,}40 \text{ m}" /></p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
            <p className="text-sm mb-2">Avstand fra sentrum til hjørne: <InlineLatex latex="r = \frac{a\sqrt{2}}{2} = \frac{0{,}40\sqrt{2}}{2} = 0{,}283 \text{ m}" /></p>
            <p className="text-sm mb-2"><InlineLatex latex="I = \sum m_i r_i^2 = 4 \times 0{,}50 \times (0{,}283)^2 = 0{,}16 \text{ kg·m}^2" /></p>
            <p className="text-sm">Alternativt: <InlineLatex latex="I = 4m \cdot \frac{a^2}{2} = 4 \times 0{,}50 \times \frac{(0{,}40)^2}{2} = 0{,}16 \text{ kg·m}^2" /></p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
            <p className="text-sm">Finn avstand <InlineLatex latex="r" /> fra aksen til hvert masseelement, bruk <InlineLatex latex="I = \sum m_i r_i^2" />. Symmetri forenkler ofte regnestykket.</p>
          </div>
        </div>
      </div>

      {/* ─── Øvingsoppgaver ─── */}
      <h3 className="font-semibold text-xl mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Roterende hjul"
        difficulty="lett"
        source="Oppgave 9.1"
        problem={<p>Et hjul akselererer fra ro med <InlineLatex latex="\alpha = 3{,}0 \text{ rad/s}^2" />. (a) Finn vinkelhastigheten etter 4,0 s. (b) Hvor mange omdreininger har hjulet gjort?</p>}
        hints={[
          { label: "Hint 1", content: "Start med ω = ω₀ + αt for (a)" },
          { label: "Hint 2", content: "Bruk Δθ = ω₀t + ½αt² for (b), konverter til omdreininger" },
        ]}
        solution={
          <div className="space-y-2 text-sm">
            <p>(a) <InlineLatex latex="\omega = 0 + 3{,}0 \times 4{,}0 = 12 \text{ rad/s}" /></p>
            <p>(b) <InlineLatex latex="\Delta\theta = 0 + \tfrac{1}{2}(3{,}0)(4{,}0)^2 = 24 \text{ rad} = \frac{24}{2\pi} = 3{,}8 \text{ omdreininger}" /></p>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Bremseplate"
        difficulty="middels"
        source="Oppgave 9.7"
        problem={<p>Et svinghjul roterer med 500 rpm og bremses til stillstand på 30,0 s. (a) Finn vinkelakselerasjonen. (b) Hvor mange omdreininger gjør det mens det bremser?</p>}
        hints={[
          { label: "Hint 1", content: "Konverter: ω₀ = 500 × 2π/60 rad/s, ω = 0" },
          { label: "Hint 2", content: "α = (ω − ω₀)/t. For (b) bruk Δθ = ½(ω₀+ω)t" },
        ]}
        solution={
          <div className="space-y-2 text-sm">
            <p><InlineLatex latex="\omega_0 = 500 \times \frac{2\pi}{60} = 52{,}4 \text{ rad/s}" /></p>
            <p>(a) <InlineLatex latex="\alpha = \frac{0 - 52{,}4}{30{,}0} = -1{,}75 \text{ rad/s}^2" /></p>
            <p>(b) <InlineLatex latex="\Delta\theta = \tfrac{1}{2}(52{,}4 + 0)(30{,}0) = 786 \text{ rad} = 125 \text{ omdreininger}" /></p>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Treghetsmoment med parallellakseteoremet"
        difficulty="middels"
        source="Oppgave 9.38"
        problem={<p>En tynn stav med masse 2,0 kg og lengde 1,2 m roterer om en akse 0,30 m fra ene enden. Finn treghetsmomentet.</p>}
        hints={[
          { label: "Hint 1", content: "Finn først I om CM (midten av staven): I_CM = (1/12)ML²" },
          { label: "Hint 2", content: "Finn avstand d fra CM til den nye aksen. CM er i midten (0,60 m fra enden), aksen er 0,30 m fra enden → d = 0,30 m" },
        ]}
        solution={
          <div className="space-y-2 text-sm">
            <p><InlineLatex latex="I_{CM} = \tfrac{1}{12}ML^2 = \tfrac{1}{12}(2{,}0)(1{,}2)^2 = 0{,}24 \text{ kg·m}^2" /></p>
            <p>Avstand: <InlineLatex latex="d = 0{,}60 - 0{,}30 = 0{,}30 \text{ m}" /></p>
            <p><InlineLatex latex="I_P = I_{CM} + Md^2 = 0{,}24 + 2{,}0 \times (0{,}30)^2 = 0{,}24 + 0{,}18 = 0{,}42 \text{ kg·m}^2" /></p>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Rotasjonsenergi"
        difficulty="middels"
        source="Oppgave 9.44"
        problem={<p>Et svinghjul (massiv sylinder) med masse 40 kg og radius 0,20 m roterer med 3000 rpm. Hvor mye kinetisk energi er lagret?</p>}
        hints={[
          { label: "Hint 1", content: "I = ½MR² for massiv sylinder" },
          { label: "Hint 2", content: "Konverter til rad/s, bruk K = ½Iω²" },
        ]}
        solution={
          <div className="space-y-2 text-sm">
            <p><InlineLatex latex="I = \tfrac{1}{2}(40)(0{,}20)^2 = 0{,}80 \text{ kg·m}^2" /></p>
            <p><InlineLatex latex="\omega = 3000 \times \frac{2\pi}{60} = 314 \text{ rad/s}" /></p>
            <p><InlineLatex latex="K = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(0{,}80)(314)^2 = 39{,}5 \text{ kJ}" /></p>
          </div>
        }
      />

      <ExerciseCard
        number={5}
        title="Kombinert rotasjon og translasjon"
        difficulty="vanskelig"
        source="Oppgave 9.64"
        problem={<p>Et tau er kveilet rundt en massiv sylinder (M = 50 kg, R = 0,10 m). Tauet trekkes med en kraft F = 9,0 N. Sylinderen starter fra ro. (a) Finn vinkelakselerasjonen. (b) Finn vinkelhastigheten etter 2,0 s.</p>}
        hints={[
          { label: "Hint 1", content: "Kraftmomentet er τ = FR (kraften virker tangentielt i avstand R)" },
          { label: "Hint 2", content: "Bruk τ = Iα der I = ½MR² for å finne α" },
        ]}
        solution={
          <div className="space-y-2 text-sm">
            <p><InlineLatex latex="I = \tfrac{1}{2}MR^2 = \tfrac{1}{2}(50)(0{,}10)^2 = 0{,}25 \text{ kg·m}^2" /></p>
            <p>(a) <InlineLatex latex="\tau = FR = 9{,}0 \times 0{,}10 = 0{,}90 \text{ N·m}" /></p>
            <p><InlineLatex latex="\alpha = \frac{\tau}{I} = \frac{0{,}90}{0{,}25} = 3{,}6 \text{ rad/s}^2" /></p>
            <p>(b) <InlineLatex latex="\omega = \omega_0 + \alpha t = 0 + 3{,}6 \times 2{,}0 = 7{,}2 \text{ rad/s}" /></p>
          </div>
        }
      />

      {/* ─── Eksamensoppgaver ─── */}
      <h3 className="font-semibold text-xl mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-xl border-2 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 p-4 mb-6">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">Eksamenstips</p>
        <p className="text-sm text-[var(--muted)]">Treghetsmoment og kinematikk er basis for kapittel 10-oppgaver. Sørg for at du kan alle I-formlene og parallellakseteoremet — de dukker opp i nesten alle rotasjonsoppgaver på eksamen.</p>
      </div>

      <ExerciseCard
        number={1}
        title="Eksamensoppgave: Sammensatt treghetsmoment"
        difficulty="vanskelig"
        source="Basert på tidligere eksamener"
        problem={
          <div>
            <p className="mb-2">En anordning består av en tynn stav (masse M = 4,0 kg, lengde L = 1,0 m) med en liten kule (masse m = 2,0 kg) festet i ene enden. Staven roterer om den andre enden.</p>
            <p>(a) Finn det totale treghetsmomentet om rotasjonsaksen.</p>
            <p>(b) Staven slippes fra horisontal posisjon. Finn vinkelhastigheten når staven er vertikal (bruk energibevaring).</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: "I_tot = I_stav(ende) + I_kule. Kulen er i avstand L fra aksen: I_kule = mL²" },
          { label: "Hint 2", content: "Energibevaring: Potensielt tap = rotasjonsenergi. CM av staven faller L/2, kulen faller L." },
        ]}
        solution={
          <div className="space-y-2 text-sm">
            <p className="font-semibold">a) Treghetsmoment:</p>
            <p><InlineLatex latex="I_\text{stav} = \tfrac{1}{3}ML^2 = \tfrac{1}{3}(4{,}0)(1{,}0)^2 = 1{,}33 \text{ kg·m}^2" /></p>
            <p><InlineLatex latex="I_\text{kule} = mL^2 = 2{,}0 \times (1{,}0)^2 = 2{,}0 \text{ kg·m}^2" /></p>
            <p><InlineLatex latex="I_\text{tot} = 1{,}33 + 2{,}0 = 3{,}33 \text{ kg·m}^2" /></p>
            <p className="font-semibold mt-3">b) Energibevaring:</p>
            <p><InlineLatex latex="Mg\frac{L}{2} + mgL = \tfrac{1}{2}I_\text{tot}\omega^2" /></p>
            <p><InlineLatex latex="4{,}0 \times 9{,}81 \times 0{,}50 + 2{,}0 \times 9{,}81 \times 1{,}0 = \tfrac{1}{2}(3{,}33)\omega^2" /></p>
            <p><InlineLatex latex="19{,}62 + 19{,}62 = 1{,}667\omega^2" /></p>
            <p><InlineLatex latex="\omega = \sqrt{\frac{39{,}24}{1{,}667}} = 4{,}85 \text{ rad/s}" /></p>
          </div>
        }
      />
    </div>
  );
}
