"use client";

import ExerciseCard from "@/components/ExerciseCard";
import FormulaBox from "@/components/FormulaBox";
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
          <div className="space-y-3 text-sm">
            {/* 1. Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="space-y-1">
                <li>Startvinkelhastighet: <InlineLatex latex="\omega_0 = 0 \text{ rad/s}" /> (starter fra ro)</li>
                <li>Vinkelakselerasjon: <InlineLatex latex="\alpha = 3{,}0 \text{ rad/s}^2" /></li>
                <li>Tid: <InlineLatex latex="t = 4{,}0 \text{ s}" /></li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="space-y-1">
                <li>(a) Vinkelhastigheten <InlineLatex latex="\omega" /> etter 4,0 s</li>
                <li>(b) Antall omdreininger <InlineLatex latex="n" /> i løpet av disse 4,0 s</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p>
                Konstant vinkelakselerasjon → bruk rotasjonskinematikken direkte analogt med rettlinjet bevegelse.
                For (a) bruker vi <InlineLatex latex="\omega = \omega_0 + \alpha t" />.
                For (b) bruker vi <InlineLatex latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2" /> og konverterer radianer til omdreininger ved å dele på <InlineLatex latex="2\pi" />.
              </p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1"><span className="font-medium">Steg 1 (a)</span> — Finn vinkelhastigheten:</p>
              <FormulaBox variant="blue" latex="\omega = \omega_0 + \alpha t = 0 + 3{,}0 \times 4{,}0 = 12 \text{ rad/s}" />
              <p className="mb-1"><span className="font-medium">Steg 2 (b)</span> — Finn vinkelforskyvningen:</p>
              <FormulaBox variant="blue" latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2 = 0 + \tfrac{1}{2}(3{,}0)(4{,}0)^2 = 24 \text{ rad}" />
              <p className="mb-1"><span className="font-medium">Steg 3</span> — Konverter til omdreininger:</p>
              <FormulaBox variant="gold" latex="n = \frac{\Delta\theta}{2\pi} = \frac{24}{2\pi} \approx \underline{\underline{3{,}8 \text{ omdreininger}}}" />
            </div>

            {/* 5. Svar */}
            <FormulaBox variant="gold" latex="\omega = 12 \text{ rad/s} \quad;\quad n \approx 3{,}8 \text{ omdreininger}" />

            {/* 6. Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>
                Rotasjonskinematikk ved konstant <InlineLatex latex="\alpha" /> er identisk med rettlinjet kinematikk — bytt ut <InlineLatex latex="x \to \theta" />, <InlineLatex latex="v \to \omega" />, <InlineLatex latex="a \to \alpha" />.
                Husk alltid å konvertere mellom radianer og omdreininger (<InlineLatex latex="1 \text{ omdr.} = 2\pi \text{ rad}" />).
              </p>
            </div>
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
          <div className="space-y-3 text-sm">
            {/* 1. Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="space-y-1">
                <li>Startvinkelhastighet: <InlineLatex latex="n_0 = 500 \text{ rpm}" /></li>
                <li>Sluttvinkelhastighet: <InlineLatex latex="\omega = 0" /> (stillstand)</li>
                <li>Tid: <InlineLatex latex="t = 30{,}0 \text{ s}" /></li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="space-y-1">
                <li>(a) Vinkelakselerasjonen <InlineLatex latex="\alpha" /> (negativ — bremsing)</li>
                <li>(b) Antall omdreininger under bremsingen</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p>
                Konverter først rpm til rad/s. Bruk deretter <InlineLatex latex="\alpha = (\omega - \omega_0)/t" /> for (a).
                For (b) er det enklest å bruke gjennomsnittsformel:
                {" "}<InlineLatex latex="\Delta\theta = \tfrac{1}{2}(\omega_0 + \omega)\,t" /> siden vi kjenner både start- og slutthastighet.
                Denne formelen er nyttig fordi vi ikke trenger <InlineLatex latex="\alpha" /> eksplisitt.
              </p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1"><span className="font-medium">Steg 1</span> — Konverter startvinkelhastigheten til rad/s:</p>
              <FormulaBox variant="blue" latex="\omega_0 = 500 \times \frac{2\pi}{60} = 52{,}4 \text{ rad/s}" />
              <p className="mb-1"><span className="font-medium">Steg 2 (a)</span> — Finn vinkelakselerasjonen:</p>
              <FormulaBox variant="gold" latex="\alpha = \frac{\omega - \omega_0}{t} = \frac{0 - 52{,}4}{30{,}0} = \underline{\underline{-1{,}75 \text{ rad/s}^2}}" />
              <p className="mb-1"><span className="font-medium">Steg 3 (b)</span> — Finn total vinkelforskyvning:</p>
              <FormulaBox variant="blue" latex="\Delta\theta = \tfrac{1}{2}(\omega_0 + \omega)\,t = \tfrac{1}{2}(52{,}4 + 0)(30{,}0) = 786 \text{ rad}" />
              <p className="mb-1"><span className="font-medium">Steg 4</span> — Konverter til omdreininger:</p>
              <FormulaBox variant="gold" latex="n = \frac{786}{2\pi} \approx \underline{\underline{125 \text{ omdreininger}}}" />
            </div>

            {/* 5. Svar */}
            <FormulaBox variant="gold" latex="\alpha = -1{,}75 \text{ rad/s}^2 \quad;\quad n \approx 125 \text{ omdreininger}" />

            {/* 6. Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>
                Negativ <InlineLatex latex="\alpha" /> betyr bremsing (retarderende rotasjon) — fortegnet er meningsfullt og bør sjekkes.
                Gjennomsnittsformelen <InlineLatex latex="\Delta\theta = \tfrac{1}{2}(\omega_0 + \omega)t" /> er svært nyttig når du kjenner start- og sluttfart og tid.
              </p>
            </div>
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
          <div className="space-y-3 text-sm">
            {/* 1. Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="space-y-1">
                <li>Masse: <InlineLatex latex="M = 2{,}0 \text{ kg}" /></li>
                <li>Lengde: <InlineLatex latex="L = 1{,}2 \text{ m}" /></li>
                <li>Aksen er <InlineLatex latex="0{,}30 \text{ m}" /> fra ene enden</li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <p>Treghetsmomentet <InlineLatex latex="I_P" /> om aksen 0,30 m fra enden.</p>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p>
                Aksen går ikke gjennom massesenteret (CM), så vi bruker <strong>parallellakseteoremet</strong>:
                {" "}<InlineLatex latex="I_P = I_{CM} + Md^2" />.
                Vi kjenner <InlineLatex latex="I_{CM} = \tfrac{1}{12}ML^2" /> for en tynn stav om midtpunktet.
                Avstand <InlineLatex latex="d" /> er fra CM til den nye aksen.
                CM sitter i midten av staven (0,60 m fra enden), den nye aksen er 0,30 m fra enden, så <InlineLatex latex="d = 0{,}60 - 0{,}30 = 0{,}30 \text{ m}" />.
              </p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1"><span className="font-medium">Steg 1</span> — Finn <InlineLatex latex="I_{CM}" /> for staven (akse gjennom midtpunktet):</p>
              <FormulaBox variant="blue" latex="I_{CM} = \frac{1}{12}ML^2 = \frac{1}{12}(2{,}0)(1{,}2)^2 = 0{,}240 \text{ kg·m}^2" />
              <p className="mb-1"><span className="font-medium">Steg 2</span> — Finn avstand <InlineLatex latex="d" /> fra CM til den nye aksen:</p>
              <FormulaBox variant="blue" latex="d = \frac{L}{2} - 0{,}30 = 0{,}60 - 0{,}30 = 0{,}30 \text{ m}" />
              <p className="mb-1"><span className="font-medium">Steg 3</span> — Bruk parallellakseteoremet:</p>
              <FormulaBox variant="gold" latex="I_P = I_{CM} + Md^2 = 0{,}240 + 2{,}0 \times (0{,}30)^2 = 0{,}240 + 0{,}180 = \underline{\underline{0{,}42 \text{ kg·m}^2}}" />
            </div>

            {/* 5. Svar */}
            <FormulaBox variant="gold" latex="I_P = 0{,}42 \text{ kg·m}^2" />

            {/* 6. Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>
                Parallellakseteoremet krever at startaksen går gjennom CM — aldri bruk det mellom to vilkårlige akser.
                Avstand <InlineLatex latex="d" /> er alltid fra CM til den nye aksen.
                Legg merke til at <InlineLatex latex="I_P &gt; I_{CM}" /> alltid — å flytte aksen bort fra CM øker alltid treghetsmomentet.
              </p>
            </div>
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
          <div className="space-y-3 text-sm">
            {/* 1. Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="space-y-1">
                <li>Masse: <InlineLatex latex="M = 40 \text{ kg}" /></li>
                <li>Radius: <InlineLatex latex="R = 0{,}20 \text{ m}" /></li>
                <li>Vinkelhastighet: <InlineLatex latex="n = 3000 \text{ rpm}" /></li>
                <li>Form: massiv sylinder (disk)</li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <p>Rotasjonskinetisk energi <InlineLatex latex="K_\text{rot}" /> lagret i svinghjulet.</p>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p>
                Bruk <InlineLatex latex="K_\text{rot} = \tfrac{1}{2}I\omega^2" />.
                For en massiv sylinder er <InlineLatex latex="I = \tfrac{1}{2}MR^2" />.
                Vi må konvertere rpm til rad/s: <InlineLatex latex="\omega = n \cdot \frac{2\pi}{60}" />.
                Merk at energien vokser med <InlineLatex latex="\omega^2" /> — høy turtall gir svært stor energi!
              </p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1"><span className="font-medium">Steg 1</span> — Finn treghetsmomentet for en massiv sylinder:</p>
              <FormulaBox variant="blue" latex="I = \frac{1}{2}MR^2 = \frac{1}{2}(40)(0{,}20)^2 = 0{,}80 \text{ kg·m}^2" />
              <p className="mb-1"><span className="font-medium">Steg 2</span> — Konverter vinkelhastigheten til rad/s:</p>
              <FormulaBox variant="blue" latex="\omega = 3000 \times \frac{2\pi}{60} = 100\pi \approx 314 \text{ rad/s}" />
              <p className="mb-1"><span className="font-medium">Steg 3</span> — Beregn rotasjonskinetisk energi:</p>
              <FormulaBox variant="gold" latex="K_\text{rot} = \frac{1}{2}I\omega^2 = \frac{1}{2}(0{,}80)(314)^2 \approx \underline{\underline{39{,}5 \text{ kJ}}}" />
            </div>

            {/* 5. Svar */}
            <FormulaBox variant="gold" latex="K_\text{rot} \approx 39{,}5 \text{ kJ}" />

            {/* 6. Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>
                Energiforrnelen <InlineLatex latex="K = \tfrac{1}{2}I\omega^2" /> er rotasjonsanalogien til <InlineLatex latex="K = \tfrac{1}{2}mv^2" />.
                Svinghjul er energilagre — 39,5 kJ i et lite hjul viser hvorfor de brukes i industri og sporvogner.
                Husk: konverter alltid til rad/s før du setter inn i formelen.
              </p>
            </div>
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
          <div className="space-y-3 text-sm">
            {/* 1. Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="space-y-1">
                <li>Masse sylinder: <InlineLatex latex="M = 50 \text{ kg}" /></li>
                <li>Radius: <InlineLatex latex="R = 0{,}10 \text{ m}" /></li>
                <li>Kraft på tauet: <InlineLatex latex="F = 9{,}0 \text{ N}" /> (tangentielt)</li>
                <li>Startvinkelhastighet: <InlineLatex latex="\omega_0 = 0" /> (ro)</li>
                <li>Tid: <InlineLatex latex="t = 2{,}0 \text{ s}" /></li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="space-y-1">
                <li>(a) Vinkelakselerasjonen <InlineLatex latex="\alpha" /></li>
                <li>(b) Vinkelhastigheten <InlineLatex latex="\omega" /> etter 2,0 s</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p>
                Bruk Newtons 2. lov for rotasjon: <InlineLatex latex="\sum\tau = I\alpha" />.
                Kraftmomentet fra tauet er <InlineLatex latex="\tau = FR" /> siden kraften virker tangentielt i avstand <InlineLatex latex="R" /> fra aksen.
                For en massiv sylinder er <InlineLatex latex="I = \tfrac{1}{2}MR^2" />.
                Dette er rotasjonsanalogien til <InlineLatex latex="F = ma" />.
                Etter vi har <InlineLatex latex="\alpha" />, bruker vi kinematikken for (b).
              </p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1"><span className="font-medium">Steg 1</span> — Finn treghetsmomentet:</p>
              <FormulaBox variant="blue" latex="I = \frac{1}{2}MR^2 = \frac{1}{2}(50)(0{,}10)^2 = 0{,}25 \text{ kg·m}^2" />
              <p className="mb-1"><span className="font-medium">Steg 2</span> — Finn kraftmomentet fra tauet:</p>
              <FormulaBox variant="blue" latex="\tau = FR = 9{,}0 \times 0{,}10 = 0{,}90 \text{ N·m}" />
              <p className="mb-1"><span className="font-medium">Steg 3 (a)</span> — Bruk <InlineLatex latex="\sum\tau = I\alpha" /> for å finne vinkelakselerasjon:</p>
              <FormulaBox variant="gold" latex="\alpha = \frac{\tau}{I} = \frac{0{,}90}{0{,}25} = \underline{\underline{3{,}6 \text{ rad/s}^2}}" />
              <p className="mb-1"><span className="font-medium">Steg 4 (b)</span> — Bruk kinematikk for å finne vinkelhastighet:</p>
              <FormulaBox variant="gold" latex="\omega = \omega_0 + \alpha t = 0 + 3{,}6 \times 2{,}0 = \underline{\underline{7{,}2 \text{ rad/s}}}" />
            </div>

            {/* 5. Svar */}
            <FormulaBox variant="gold" latex="\alpha = 3{,}6 \text{ rad/s}^2 \quad;\quad \omega = 7{,}2 \text{ rad/s}" />

            {/* 6. Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>
                <InlineLatex latex="\sum\tau = I\alpha" /> er rotasjonsanalogien til <InlineLatex latex="\sum F = ma" />.
                Fremgangsmåten er alltid: finn <InlineLatex latex="\tau" />, finn <InlineLatex latex="I" />, løs for <InlineLatex latex="\alpha" />, bruk kinematikk.
                Merk at et tau kveilet rundt en sylinder alltid gir <InlineLatex latex="\tau = FR" /> siden kraften er tangentielt i kanten.
              </p>
            </div>
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
          <div className="space-y-3 text-sm">
            {/* 1. Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="space-y-1">
                <li>Stav: masse <InlineLatex latex="M = 4{,}0 \text{ kg}" />, lengde <InlineLatex latex="L = 1{,}0 \text{ m}" /></li>
                <li>Kule: masse <InlineLatex latex="m = 2{,}0 \text{ kg}" />, festet i <InlineLatex latex="L = 1{,}0 \text{ m}" /> fra rotasjonsaksen</li>
                <li>Rotasjonsaksen er i den frie enden av staven (uten kule)</li>
                <li>Staven slippes fra horisontal posisjon</li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="space-y-1">
                <li>(a) Totalt treghetsmoment <InlineLatex latex="I_\text{tot}" /> om rotasjonsaksen</li>
                <li>(b) Vinkelhastighet <InlineLatex latex="\omega" /> i vertikal posisjon</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p className="mb-2">
                <strong>(a)</strong> Sammensatt legeme: <InlineLatex latex="I_\text{tot} = I_\text{stav} + I_\text{kule}" />.
                Aksen er i enden av staven, så <InlineLatex latex="I_\text{stav} = \tfrac{1}{3}ML^2" /> (ikke <InlineLatex latex="\tfrac{1}{12}ML^2" /> som er for CM).
                Kulen behandles som en punktmasse: <InlineLatex latex="I_\text{kule} = mL^2" />.
              </p>
              <p>
                <strong>(b)</strong> Energibevaring: Systemet starter fra ro. Tyngdekraften gjør arbeid idet staven faller til vertikal.
                CM av staven faller <InlineLatex latex="L/2 = 0{,}50 \text{ m}" />, kulen faller <InlineLatex latex="L = 1{,}0 \text{ m}" />.
                Sett <InlineLatex latex="\Delta E_\text{pot} = \Delta E_\text{rot}" />.
              </p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1"><span className="font-medium">Steg 1 (a)</span> — Treghetsmoment for staven (akse i enden):</p>
              <FormulaBox variant="blue" latex="I_\text{stav} = \frac{1}{3}ML^2 = \frac{1}{3}(4{,}0)(1{,}0)^2 = 1{,}33 \text{ kg·m}^2" />
              <p className="mb-1"><span className="font-medium">Steg 2</span> — Treghetsmoment for kulen (punktmasse i avstand L):</p>
              <FormulaBox variant="blue" latex="I_\text{kule} = mL^2 = 2{,}0 \times (1{,}0)^2 = 2{,}0 \text{ kg·m}^2" />
              <p className="mb-1"><span className="font-medium">Steg 3</span> — Totalt treghetsmoment:</p>
              <FormulaBox variant="gold" latex="I_\text{tot} = I_\text{stav} + I_\text{kule} = 1{,}33 + 2{,}0 = \underline{\underline{3{,}33 \text{ kg·m}^2}}" />
              <p className="mb-1"><span className="font-medium">Steg 4 (b)</span> — Skriv opp energibevaring (tap i potensiell = gevinst i rotasjonsk.):</p>
              <FormulaBox variant="blue" latex="Mg\frac{L}{2} + mgL = \frac{1}{2}I_\text{tot}\omega^2" />
              <p className="mb-1"><span className="font-medium">Steg 5</span> — Sett inn tall:</p>
              <FormulaBox variant="blue" latex="(4{,}0)(9{,}81)(0{,}50) + (2{,}0)(9{,}81)(1{,}0) = \frac{1}{2}(3{,}33)\omega^2" />
              <FormulaBox variant="blue" latex="19{,}62 + 19{,}62 = 1{,}665\,\omega^2 \implies \omega^2 = \frac{39{,}24}{1{,}665} = 23{,}57" />
              <FormulaBox variant="gold" latex="\omega = \sqrt{23{,}57} \approx \underline{\underline{4{,}85 \text{ rad/s}}}" />
            </div>

            {/* 5. Svar */}
            <FormulaBox variant="gold" latex="I_\text{tot} = 3{,}33 \text{ kg·m}^2 \quad;\quad \omega \approx 4{,}85 \text{ rad/s}" />

            {/* 6. Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p className="mb-2">
                For sammensatte legemer adderer vi treghetsmomentene om <em>samme akse</em>.
                Viktig: <InlineLatex latex="I_\text{stav} = \tfrac{1}{3}ML^2" /> (akse i enden) er dobbelt så stor som <InlineLatex latex="I_\text{stav} = \tfrac{1}{12}ML^2" /> (akse i midten).
              </p>
              <p>
                Energibevaring er svært nyttig for å finne hastigheter uten å integrere bevegelsesligninger — identifiser hvilke masser som faller hvor langt, og sett potensielt energitap lik rotasjonskinetisk energi.
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}
