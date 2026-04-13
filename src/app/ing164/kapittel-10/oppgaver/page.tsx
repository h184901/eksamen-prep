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

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
        <h4 className="font-semibold text-lg mb-3">Strategi: Στ = Iα-oppgaver</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Tegn frilegemediagram med alle krefter</li>
          <li>Velg rotasjonsakse (ofte gjennom pivotpunktet — da bidrar ikke ukjente reaksjonskrefter)</li>
          <li>Beregn τ fra hver kraft: <InlineLatex latex="\tau = rF\sin\phi" />, med riktig fortegn</li>
          <li>Summer: <InlineLatex latex="\sum\tau = I\alpha" /></li>
          <li>Hvis objektet også beveger seg lineært: skriv <InlineLatex latex="\sum F = ma" /> i tillegg</li>
          <li>Koble med <InlineLatex latex="a = R\alpha" /> hvis det er tau/trinse eller rulling</li>
        </ol>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
        <h4 className="font-semibold text-lg mb-3">Strategi: Rulling-oppgaver</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Bruk energibevaring hvis du trenger fart/høyde (enklere!): <InlineLatex latex="mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2" /></li>
          <li>Bruk Newtons lover hvis du trenger akselerasjon eller krefter</li>
          <li>Husk <InlineLatex latex="v_{CM} = R\omega" /> og <InlineLatex latex="a_{CM} = R\alpha" /></li>
          <li>Statisk friksjon gjør <em>ingen arbeid</em> ved rulling</li>
        </ol>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
        <h4 className="font-semibold text-lg mb-3">Strategi: Angulært moment-oppgaver</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Er summen av ytre kraftmoment null? → <InlineLatex latex="L" /> er bevart!</li>
          <li>Skriv <InlineLatex latex="I_1\omega_1 = I_2\omega_2" /> og løs for ukjent</li>
          <li>Husk: <InlineLatex latex="K" /> er generelt IKKE bevart (beregn <InlineLatex latex="\Delta K" /> separat om nødvendig)</li>
          <li>Ved kollisjoner med rotasjon: angulært moment bevart, kinetisk energi kan gå tapt</li>
        </ol>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-10">
        <h4 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-red-600 dark:text-red-400">
          <li>Glemmer å bruke BÅDE Newtons 2. lov for translasjon OG rotasjon i rullingsoppgaver</li>
          <li>Bruker kinetisk friksjon i stedet for statisk ved rulling uten glidning</li>
          <li>Antar at kinetisk energi er bevart når L er bevart (det er den generelt IKKE)</li>
          <li>Forveksler kraftmoment om CM med kraftmoment om kontaktpunktet</li>
          <li>Glemmer <InlineLatex latex="a = R\alpha" />-betingelsen ved rulling</li>
        </ul>
      </div>

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <h3 className="text-xl font-semibold mb-4">Gjennomgåtte eksempler</h3>

      {/* Eksempel 1: Møllesten */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h4 className="font-semibold text-lg mb-3">Eksempel 1: Møllesten — arbeid og effekt</h4>
        <p className="text-[var(--muted)] mb-4">
          Fra forelesningen: En møllesten med <InlineLatex latex="I = 2{,}0 \text{ kg·m}^2" /> utsettes for et konstant kraftmoment <InlineLatex latex="\tau = 10 \text{ N·m}" /> fra ro i <InlineLatex latex="t = 8{,}0 \text{ s}" />. Finn arbeid, kinetisk energi og gjennomsnittlig effekt.
        </p>
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hva vet vi?</p>
            <p className="text-sm"><InlineLatex latex="\tau = 10 \text{ N·m}" />, <InlineLatex latex="I = 2{,}0 \text{ kg·m}^2" />, <InlineLatex latex="\omega_0 = 0" />, <InlineLatex latex="t = 8{,}0 \text{ s}" /></p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
            <p className="text-sm mb-2"><InlineLatex latex="\alpha = \frac{\tau}{I} = \frac{10}{2{,}0} = 5{,}0 \text{ rad/s}^2" /></p>
            <p className="text-sm mb-2"><InlineLatex latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2 = 0 + \tfrac{1}{2}(5{,}0)(8{,}0)^2 = 160 \text{ rad}" /></p>
            <p className="text-sm mb-2"><InlineLatex latex="\omega = \omega_0 + \alpha t = 0 + 5{,}0 \times 8{,}0 = 40 \text{ rad/s}" /></p>
            <p className="text-sm mb-2"><InlineLatex latex="W = \tau \cdot \Delta\theta = 10 \times 160 = 1600 \text{ J}" /></p>
            <p className="text-sm mb-2"><InlineLatex latex="K = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(2{,}0)(40)^2 = 1600 \text{ J} \checkmark" /></p>
            <p className="text-sm"><InlineLatex latex="\bar{P} = \frac{W}{t} = \frac{1600}{8{,}0} = 200 \text{ W}" /></p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
            <p className="text-sm"><InlineLatex latex="W = \tau\Delta\theta = \Delta K_\text{rot}" /> — arbeid-energi-teoremet bekrefter svaret. Gjennomsnittlig effekt er <InlineLatex latex="\bar{P} = W/t" />.</p>
          </div>
        </div>
      </div>

      {/* Eksempel 2: Turbinvifte (angular momentum) */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h4 className="font-semibold text-lg mb-3">Eksempel 2: Turbinvifte — angulært moment</h4>
        <p className="text-[var(--muted)] mb-4">
          Fra forelesningen: En turbinvifte i en jetmotor har <InlineLatex latex="I = 2{,}5 \text{ kg·m}^2" /> og <InlineLatex latex="\omega(t) = (40 \text{ rad/s}^3) \cdot t^2" />. Finn (a) angulært moment <InlineLatex latex="L(t)" /> og verdien ved <InlineLatex latex="t = 3{,}0 \text{ s}" />, (b) kraftmomentet <InlineLatex latex="\tau(t)" /> ved <InlineLatex latex="t = 3{,}0 \text{ s}" />.
        </p>
        <div className="space-y-3">
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
            <p className="text-sm mb-2">(a) <InlineLatex latex="L(t) = I\omega(t) = 2{,}5 \times 40t^2 = (100 \text{ kg·m}^2\text{/s}^3) \cdot t^2" /></p>
            <p className="text-sm mb-2"><InlineLatex latex="L(3{,}0) = 100 \times (3{,}0)^2 = 900 \text{ kg·m}^2\text{/s}" /></p>
            <p className="text-sm mb-2">(b) <InlineLatex latex="\tau(t) = \frac{dL}{dt} = (200 \text{ kg·m}^2\text{/s}^3) \cdot t" /></p>
            <p className="text-sm"><InlineLatex latex="\tau(3{,}0) = 200 \times 3{,}0 = 600 \text{ N·m}" /></p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
            <p className="text-sm"><InlineLatex latex="\tau = dL/dt" /> er den generelle formen av Newtons 2. lov for rotasjon. Når <InlineLatex latex="\omega" /> ikke er lineær i tid, er <InlineLatex latex="\alpha" /> og <InlineLatex latex="\tau" /> tidsavhengige.</p>
          </div>
        </div>
      </div>

      {/* Eksempel 3: Kunstløper-piruett */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h4 className="font-semibold text-lg mb-3">Eksempel 3: Kunstløper — bevaring av L</h4>
        <p className="text-[var(--muted)] mb-4">
          Fra forelesningen: En kunstløper spinner med <InlineLatex latex="\omega_1 = 1{,}5 \text{ rad/s}" /> og <InlineLatex latex="I_1 = 2{,}5 \text{ kg·m}^2" /> (armer ut). Hun trekker armene inn slik at <InlineLatex latex="I_2 = 0{,}5 \text{ kg·m}^2" />. Finn <InlineLatex latex="\omega_2" />.
        </p>
        <div className="space-y-3">
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
            <p className="text-sm mb-2">Ingen ytre kraftmoment → <InlineLatex latex="L" /> er bevart:</p>
            <p className="text-sm mb-2"><InlineLatex latex="I_1\omega_1 = I_2\omega_2" /></p>
            <p className="text-sm"><InlineLatex latex="\omega_2 = \frac{I_1}{I_2}\omega_1 = \frac{2{,}5}{0{,}5} \times 1{,}5 = 7{,}5 \text{ rad/s}" /></p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
            <p className="text-sm">Ved halvering av I dobles ω, osv. Denne oppgavetypen dukker opp veldig ofte — sjekk alltid om ytre τ = 0 for å bruke L-bevaring.</p>
          </div>
        </div>
      </div>

      {/* Eksempel 4: Disk på skråplan */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-10">
        <h4 className="font-semibold text-lg mb-3">Eksempel 4: Disk som ruller ned skråplan (fra oblig 2)</h4>
        <p className="text-[var(--muted)] mb-4">
          En massiv disk med masse <InlineLatex latex="m" /> og radius <InlineLatex latex="R" /> ruller uten glidning ned et skråplan med vinkel <InlineLatex latex="\beta" />. Vis at <InlineLatex latex="a_{CM} = \frac{2}{3}g\sin\beta" /> og finn betingelsen for <InlineLatex latex="\mu_s" />.
        </p>
        <div className="space-y-3">
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
            <p className="text-sm mb-2">Newtons 2. lov langs planet: <InlineLatex latex="mg\sin\beta - f_s = ma_{CM}" /></p>
            <p className="text-sm mb-2">Rotasjon om CM: <InlineLatex latex="f_s \cdot R = I\alpha = \tfrac{1}{2}mR^2 \cdot \frac{a_{CM}}{R}" /></p>
            <p className="text-sm mb-2">Fra rotasjonsligningen: <InlineLatex latex="f_s = \tfrac{1}{2}ma_{CM}" /></p>
            <p className="text-sm mb-2">Sett inn: <InlineLatex latex="mg\sin\beta - \tfrac{1}{2}ma_{CM} = ma_{CM}" /></p>
            <p className="text-sm mb-2"><InlineLatex latex="mg\sin\beta = \tfrac{3}{2}ma_{CM} \implies a_{CM} = \frac{2}{3}g\sin\beta" /></p>
            <p className="text-sm mb-2">Friksjonskrav: <InlineLatex latex="f_s \leq \mu_s N" />, der <InlineLatex latex="N = mg\cos\beta" /></p>
            <p className="text-sm"><InlineLatex latex="\tfrac{1}{2}m \cdot \frac{2}{3}g\sin\beta \leq \mu_s mg\cos\beta \implies \mu_s \geq \frac{1}{3}\tan\beta" /></p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
            <p className="text-sm">Rulling uten glidning krever to ligninger: ΣF = ma for translasjon OG Στ = Iα for rotasjon, pluss betingelsen <InlineLatex latex="a = R\alpha" />. Akselerasjonen er <em>lavere</em> enn for ren glidning (<InlineLatex latex="g\sin\beta" />) fordi energi går til rotasjon.</p>
          </div>
        </div>
      </div>

      {/* ── ØVINGSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Kraftmoment"
        difficulty="lett"
        source="Oppgave 10.2"
        problem={<p>En kraft på 15 N virker i enden av en 0,40 m lang momentnøkkel i en vinkel på 60° fra nøkkelen. Finn kraftmomentet om bolten.</p>}
        hints={[
          { label: "Hint 1", content: "τ = rF sin φ" },
        ]}
        solution={
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Kraft: <InlineLatex latex="F = 15 \text{ N}" /></li>
                <li>Momentarm (lengde av nøkkel): <InlineLatex latex="r = 0{,}40 \text{ m}" /></li>
                <li>Vinkel mellom kraft og nøkkel: <InlineLatex latex="\phi = 60°" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <p>Kraftmomentet <InlineLatex latex="\tau" /> om bolten.</p>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p>Kraftmomentet er definert som <InlineLatex latex="\tau = rF\sin\phi" />, der <InlineLatex latex="\phi" /> er vinkelen mellom kraftvektoren og armen fra pivotpunktet. <InlineLatex latex="\sin\phi" /> gir oss den effektive komponenten av kraften som faktisk bidrar til rotasjon — en kraft langs armen gir null kraftmoment.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1">Steg 1 — Sett inn kjente verdier i formelen:</p>
              <FormulaBox variant="blue" latex="\tau = rF\sin\phi = 0{,}40 \cdot 15 \cdot \sin 60°" />
              <p className="mb-1">Steg 2 — Beregn <InlineLatex latex="\sin 60° = \frac{\sqrt{3}}{2} \approx 0{,}866" />:</p>
              <FormulaBox variant="gold" latex="\tau = 0{,}40 \times 15 \times 0{,}866 = \underline{\underline{5{,}2 \text{ N·m}}}" />
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Svar</p>
              <p>Kraftmomentet om bolten er <InlineLatex latex="\tau = 5{,}2 \text{ N·m}" />.</p>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>Kraftmomentet avhenger av vinkelen mellom kraft og arm. Ved <InlineLatex latex="\phi = 90°" /> er kraftmomentet maksimalt (<InlineLatex latex="\tau = rF" />). Å skyve parallelt med armen (<InlineLatex latex="\phi = 0°" />) gir null kraftmoment — du slipper inn/ut bolten istedet for å skru!</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Newtons 2. lov for rotasjon"
        difficulty="middels"
        source="Oppgave 10.10"
        problem={<p>Et svinghjul (massiv sylinder) med masse 25 kg og radius 0,15 m bremses av en friksjonsbremsekloss som utøver en tangentiell kraft på 12 N. Hjulet roterer med 200 rpm. (a) Finn vinkelakselerasjonen. (b) Hvor lang tid tar det å stoppe?</p>}
        hints={[
          { label: "Hint 1", content: "I = ½MR² for massiv sylinder. τ = FR (tangentiell kraft)." },
          { label: "Hint 2", content: "α = −τ/I (negativ fordi den bremser). ω = ω₀ + αt, sett ω = 0." },
        ]}
        solution={
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Masse: <InlineLatex latex="M = 25 \text{ kg}" /></li>
                <li>Radius: <InlineLatex latex="R = 0{,}15 \text{ m}" /></li>
                <li>Tangentiell bremsekraft: <InlineLatex latex="F = 12 \text{ N}" /></li>
                <li>Startfart: <InlineLatex latex="\omega_0 = 200 \text{ rpm}" /></li>
                <li>Form: massiv sylinder <InlineLatex latex="\Rightarrow I = \tfrac{1}{2}MR^2" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>(a) Vinkelakselerasjonen <InlineLatex latex="\alpha" /></li>
                <li>(b) Tid til hjulet stopper</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p className="mb-1">Bruk Newtons 2. lov for rotasjon: <InlineLatex latex="\sum\tau = I\alpha" />. Bremsekraften virker tangentielt i radius R, så <InlineLatex latex="\tau = FR" />. Deretter bruker vi kinematikk (<InlineLatex latex="\omega = \omega_0 + \alpha t" />) for å finne stopp-tidspunktet. Husk å konvertere rpm til rad/s.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1">Steg 1 — Beregn treghetsmomentet:</p>
              <FormulaBox variant="blue" latex="I = \tfrac{1}{2}MR^2 = \tfrac{1}{2}(25)(0{,}15)^2 = 0{,}281 \text{ kg·m}^2" />
              <p className="mb-1">Steg 2 — Beregn kraftmomentet fra bremsen:</p>
              <FormulaBox variant="blue" latex="\tau = FR = 12 \times 0{,}15 = 1{,}80 \text{ N·m}" />
              <p className="mb-1">Steg 3 — (a) Finn vinkelakselerasjon (negativ fordi den bremser):</p>
              <FormulaBox variant="gold" latex="\alpha = -\frac{\tau}{I} = -\frac{1{,}80}{0{,}281} = \underline{\underline{-6{,}40 \text{ rad/s}^2}}" />
              <p className="mb-1">Steg 4 — Konverter startvinkelhastigheten:</p>
              <FormulaBox variant="blue" latex="\omega_0 = 200 \times \frac{2\pi}{60} = 20{,}9 \text{ rad/s}" />
              <p className="mb-1">Steg 5 — (b) Finn stopp-tidspunktet ved <InlineLatex latex="\omega = 0" />:</p>
              <FormulaBox variant="gold" latex="0 = \omega_0 + \alpha t \implies t = \frac{-\omega_0}{\alpha} = \frac{-20{,}9}{-6{,}40} = \underline{\underline{3{,}3 \text{ s}}}" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>Analogien til lineær kinematikk er komplett: <InlineLatex latex="\sum F = ma" /> svarer til <InlineLatex latex="\sum\tau = I\alpha" />, og <InlineLatex latex="v = v_0 + at" /> svarer til <InlineLatex latex="\omega = \omega_0 + \alpha t" />. Husk alltid å konvertere rpm → rad/s!</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Rulling ned skråplan med energibevaring"
        difficulty="middels"
        source="Oppgave 10.22"
        problem={<p>En massiv kule (<InlineLatex latex="I = \frac{2}{5}MR^2" />) med masse 1,5 kg ruller uten glidning ned fra en høyde på 2,0 m. Finn farten i bunnen.</p>}
        hints={[
          { label: "Hint 1", content: "Energibevaring: mgh = ½mv² + ½Iω². Bruk ω = v/R." },
          { label: "Hint 2", content: "mgh = ½mv² + ½(2/5)mR²(v/R)² = ½mv² + (1/5)mv² = (7/10)mv²" },
        ]}
        solution={
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Masse: <InlineLatex latex="m = 1{,}5 \text{ kg}" /></li>
                <li>Høyde: <InlineLatex latex="h = 2{,}0 \text{ m}" /></li>
                <li>Form: massiv kule <InlineLatex latex="\Rightarrow I = \tfrac{2}{5}mR^2" /></li>
                <li>Starter fra ro: <InlineLatex latex="v_0 = 0, \; \omega_0 = 0" /></li>
                <li>Rulling uten glidning: <InlineLatex latex="\omega = v/R" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <p>Farten <InlineLatex latex="v" /> til kulen i bunnen.</p>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p>Siden friksjon ved rulling uten glidning ikke gjør arbeid, er mekanisk energi bevart. Potensiell energi <InlineLatex latex="mgh" /> omdannes til både translatorisk og rotatorisk kinetisk energi. Bruk <InlineLatex latex="\omega = v/R" /> for å eliminere <InlineLatex latex="\omega" /> slik at alt uttrykkes med <InlineLatex latex="v" />.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1">Steg 1 — Skriv energibevaring:</p>
              <FormulaBox variant="blue" latex="mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2" />
              <p className="mb-1">Steg 2 — Sett inn <InlineLatex latex="I = \tfrac{2}{5}mR^2" /> og <InlineLatex latex="\omega = v/R" />:</p>
              <FormulaBox variant="blue" latex="mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2} \cdot \tfrac{2}{5}mR^2 \cdot \frac{v^2}{R^2} = \tfrac{1}{2}mv^2 + \tfrac{1}{5}mv^2 = \tfrac{7}{10}mv^2" />
              <p className="mb-1">Steg 3 — Kanseller <InlineLatex latex="m" /> og løs for <InlineLatex latex="v" />:</p>
              <FormulaBox variant="blue" latex="gh = \tfrac{7}{10}v^2 \implies v = \sqrt{\frac{10gh}{7}}" />
              <p className="mb-1">Steg 4 — Sett inn tall:</p>
              <FormulaBox variant="gold" latex="v = \sqrt{\frac{10 \times 9{,}81 \times 2{,}0}{7}} = \sqrt{28{,}03} = \underline{\underline{5{,}3 \text{ m/s}}}" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>Energibevaring med rulling gir alltid <InlineLatex latex="v = \sqrt{\frac{2gh}{1 + I/mR^2}}" />. For en massiv kule er faktoren <InlineLatex latex="1 + 2/5 = 7/5" />, så <InlineLatex latex="v = \sqrt{10gh/7}" />. Sammenlign med fri fall/glidning: <InlineLatex latex="v = \sqrt{2gh}" /> — rulling er saktere fordi noe energi går til rotasjon!</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Bevaring av angulært moment"
        difficulty="middels"
        source="Oppgave 10.34"
        problem={<p>En snurrende plate med <InlineLatex latex="I_1 = 4{,}0 \text{ kg·m}^2" /> og <InlineLatex latex="\omega_1 = 6{,}0 \text{ rad/s}" /> kobles til en stillestående plate med <InlineLatex latex="I_2 = 2{,}0 \text{ kg·m}^2" />. Finn den felles vinkelhastigheten og tap av kinetisk energi.</p>}
        hints={[
          { label: "Hint 1", content: "Ingen ytre τ → L er bevart: I₁ω₁ = (I₁+I₂)ω_f" },
          { label: "Hint 2", content: "ΔK = ½(I₁+I₂)ω_f² − ½I₁ω₁²" },
        ]}
        solution={
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Snurrende plate: <InlineLatex latex="I_1 = 4{,}0 \text{ kg·m}^2" />, <InlineLatex latex="\omega_1 = 6{,}0 \text{ rad/s}" /></li>
                <li>Stillestående plate: <InlineLatex latex="I_2 = 2{,}0 \text{ kg·m}^2" />, <InlineLatex latex="\omega_2 = 0" /></li>
                <li>Platene kobles sammen — deretter felles vinkelhastighet <InlineLatex latex="\omega_f" /></li>
                <li>Ingen ytre kraftmoment under koblingen</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Felles vinkelhastighet <InlineLatex latex="\omega_f" /> etter kobling</li>
                <li>Tap av kinetisk energi <InlineLatex latex="\Delta K" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p className="mb-1">Siden det ikke er noe ytre kraftmoment, er angulært moment bevart: <InlineLatex latex="L_\text{før} = L_\text{etter}" />. Dette gir oss <InlineLatex latex="\omega_f" />. Kinetisk energi er derimot <em>ikke</em> nødvendigvis bevart (friksjon mellom platene kan omdanne energi til varme), så vi beregner <InlineLatex latex="\Delta K" /> separat.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1">Steg 1 — Skriv bevaringsloven for angulært moment:</p>
              <FormulaBox variant="blue" latex="I_1\omega_1 = (I_1 + I_2)\omega_f" />
              <p className="mb-1">Steg 2 — Løs for <InlineLatex latex="\omega_f" />:</p>
              <FormulaBox variant="gold" latex="\omega_f = \frac{I_1\omega_1}{I_1 + I_2} = \frac{4{,}0 \times 6{,}0}{4{,}0 + 2{,}0} = \frac{24{,}0}{6{,}0} = \underline{\underline{4{,}0 \text{ rad/s}}}" />
              <p className="mb-1">Steg 3 — Beregn kinetisk energi før og etter:</p>
              <FormulaBox variant="blue" latex="K_1 = \tfrac{1}{2}I_1\omega_1^2 = \tfrac{1}{2}(4{,}0)(6{,}0)^2 = 72 \text{ J}" />
              <FormulaBox variant="blue" latex="K_f = \tfrac{1}{2}(I_1+I_2)\omega_f^2 = \tfrac{1}{2}(6{,}0)(4{,}0)^2 = 48 \text{ J}" />
              <p className="mb-1">Steg 4 — Finn energitapet:</p>
              <FormulaBox variant="gold" latex="\Delta K = K_f - K_1 = 48 - 72 = \underline{\underline{-24 \text{ J}}}" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>Bevaring av angulært moment gjelder alltid når <InlineLatex latex="\sum\tau_\text{ext} = 0" />. Men kinetisk energi <em>er ikke</em> bevart — den 24 J som forsvinner er blitt til varme via friksjon mellom platene. Dette er analogt til en fullstendig inelastisk kollisjon i lineær bevegelse.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={5}
        title="Jojo-oppgave"
        difficulty="vanskelig"
        source="Oppgave 10.20"
        problem={<p>En jojo (massiv sylinder, M = 0,20 kg, R = 0,030 m) kvernes ut. Tauet er festet rundt akselen med radius r = 0,005 m. Finn (a) vinkelakselerasjonen, (b) snorkraften i tauet.</p>}
        hints={[
          { label: "Hint 1", content: "Krefter på jojoen: tyngdekraft Mg ned, snorkraft T opp. Translasjon: Mg − T = Ma. Rotasjon: τ = Tr = Iα" },
          { label: "Hint 2", content: "Betingelse: a = rα (obs: bruk r, ikke R). Tre ligninger, tre ukjente." },
        ]}
        solution={
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Masse: <InlineLatex latex="M = 0{,}20 \text{ kg}" /></li>
                <li>Ytre radius (sylinder): <InlineLatex latex="R = 0{,}030 \text{ m}" /></li>
                <li>Aksleradius (tau kvernes herfra): <InlineLatex latex="r = 0{,}005 \text{ m}" /></li>
                <li>Form: massiv sylinder <InlineLatex latex="\Rightarrow I = \tfrac{1}{2}MR^2" /></li>
                <li>Tauet er festet rundt akselen; jojoen faller ned og roterer</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>(a) Vinkelakselerasjon <InlineLatex latex="\alpha" /></li>
                <li>(b) Snorkraften <InlineLatex latex="T" /> i tauet</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p className="mb-1">Vi har to ukjente (<InlineLatex latex="a" /> og <InlineLatex latex="T" />) og trenger to ligninger: (1) Newtons 2. lov for translasjon av CM, (2) Newtons 2. lov for rotasjon om CM. Bindingsbetingelsen <InlineLatex latex="a = r\alpha" /> (merk: <InlineLatex latex="r" />, ikke <InlineLatex latex="R" />!) kobler de to. Løs systemet for <InlineLatex latex="a" />, deretter <InlineLatex latex="\alpha" /> og <InlineLatex latex="T" />.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="mb-1">Steg 1 — Beregn treghetsmomentet (om sylinderens senterlinje):</p>
              <FormulaBox variant="blue" latex="I = \tfrac{1}{2}MR^2 = \tfrac{1}{2}(0{,}20)(0{,}030)^2 = 9{,}0 \times 10^{-5} \text{ kg·m}^2" />
              <p className="mb-1">Steg 2 — Skriv Newtons 2. lov for translasjon (positiv nedover):</p>
              <FormulaBox variant="blue" latex="Mg - T = Ma \quad (1)" />
              <p className="mb-1">Steg 3 — Skriv Newtons 2. lov for rotasjon om CM (tau virker med arm <InlineLatex latex="r" />):</p>
              <FormulaBox variant="blue" latex="T \cdot r = I\alpha \quad (2)" />
              <p className="mb-1">Steg 4 — Bindingsbetingelse (tauet kvernes av akselen med radius <InlineLatex latex="r" />):</p>
              <FormulaBox variant="blue" latex="a = r\alpha \implies \alpha = \frac{a}{r} \quad (3)" />
              <p className="mb-1">Steg 5 — Sett (3) inn i (2): <InlineLatex latex="T = Ia/r^2" />. Sett dette inn i (1) og løs:</p>
              <FormulaBox variant="blue" latex="Mg = a\!\left(M + \frac{I}{r^2}\right) \implies a = \frac{Mg}{M + I/r^2}" />
              <p className="mb-1">Steg 6 — Sett inn tall (<InlineLatex latex="I/r^2 = 9{,}0\times10^{-5}/0{,}005^2 = 3{,}6 \text{ kg}" />):</p>
              <FormulaBox variant="blue" latex="a = \frac{0{,}20 \times 9{,}81}{0{,}20 + 3{,}6} = \frac{1{,}962}{3{,}80} = 0{,}516 \text{ m/s}^2" />
              <p className="mb-1">Steg 7 — (a) Vinkelakselerasjon:</p>
              <FormulaBox variant="gold" latex="\alpha = \frac{a}{r} = \frac{0{,}516}{0{,}005} = \underline{\underline{103 \text{ rad/s}^2}}" />
              <p className="mb-1">Steg 8 — (b) Snorkraft:</p>
              <FormulaBox variant="gold" latex="T = M(g - a) = 0{,}20(9{,}81 - 0{,}516) = \underline{\underline{1{,}86 \text{ N}}}" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>Nøkkelpunktet: bindingsbetingelsen bruker aksleradius <InlineLatex latex="r" /> (ikke sylinderradius <InlineLatex latex="R" />), fordi tauet vikles av akselen. Legg merke til at <InlineLatex latex="T \ll Mg" /> — snoren holder langt mindre enn vekten, fordi en stor del av tyngdekraften driver akselerasjonen nedover.</p>
            </div>
          </div>
        }
      />

      {/* ── EKSAMENSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-xl border-2 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 p-4 mb-6">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">Eksamenstips</p>
        <p className="text-sm text-[var(--muted)]">Rotasjonsoppgaver er ALLTID på eksamen. Du MÅ kunne: (1) Στ = Iα med frilegemediagram, (2) Energibevaring med rotasjon, (3) Bevaring av angulært moment. Rulling uten glidning er en gjenganger!</p>
      </div>

      <ExerciseCard
        number={1}
        title="Bowlingkule: glidning → rulling (Høst 2023)"
        difficulty="vanskelig"
        source="Eksamen Høst 2023, Oppgave 3"
        problem={
          <div>
            <p className="mb-2">En bowlingkule (massiv kule, <InlineLatex latex="m = 6{,}0 \text{ kg}" />, <InlineLatex latex="R = 0{,}11 \text{ m}" />) kastes ut med <InlineLatex latex="v_0 = 10{,}0 \text{ m/s}" /> og <InlineLatex latex="\omega_0 = 0" /> på et gulv med <InlineLatex latex="\mu_k = 0{,}25" />.</p>
            <p className="mb-1">(a) Finn lineær akselerasjon og vinkelakselerasjon.</p>
            <p className="mb-1">(b) Finn tiden til kulen ruller uten glidning.</p>
            <p>(c) Finn farten ved dette tidspunktet.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: "Friksjonskraften f = μ_k mg bremser translasjon og akselererer rotasjon" },
          { label: "Hint 2", content: "Rulling uten glidning: v = Rω. Finn t der v(t) = Rω(t)." },
        ]}
        solution={
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Masse: <InlineLatex latex="m = 6{,}0 \text{ kg}" />, radius <InlineLatex latex="R = 0{,}11 \text{ m}" /></li>
                <li>Start: <InlineLatex latex="v_0 = 10{,}0 \text{ m/s}" /> (translasjon), <InlineLatex latex="\omega_0 = 0" /> (ingen rotasjon)</li>
                <li>Kinetisk friksjonskoeffisient: <InlineLatex latex="\mu_k = 0{,}25" /></li>
                <li>Form: massiv kule <InlineLatex latex="\Rightarrow I = \tfrac{2}{5}mR^2" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>(a) Lineær akselerasjon <InlineLatex latex="a" /> og vinkelakselerasjon <InlineLatex latex="\alpha" /></li>
                <li>(b) Tid <InlineLatex latex="t" /> til kulen ruller uten glidning</li>
                <li>(c) Farten <InlineLatex latex="v" /> ved dette tidspunktet</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p>Kulen glir først (kinetisk friksjon), som bremser translasjon og akselererer rotasjon. Bruk <InlineLatex latex="\sum F = ma" /> og <InlineLatex latex="\sum\tau = I\alpha" /> for å finne akselerasjonene. Rullingsbetingelsen <InlineLatex latex="v = R\omega" /> innfris når begge ligningene, <InlineLatex latex="v(t)" /> og <InlineLatex latex="R\omega(t)" />, er like — sett dem lik og løs for <InlineLatex latex="t" />.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">(a) Akselerasjoner:</p>
              <p className="mb-1">Steg 1 — Friksjonskraft under glidning:</p>
              <FormulaBox variant="blue" latex="f_k = \mu_k mg = 0{,}25 \times 6{,}0 \times 9{,}81 = 14{,}7 \text{ N}" />
              <p className="mb-1">Steg 2 — Lineær akselerasjon (friksjon bremser translasjon):</p>
              <FormulaBox variant="gold" latex="a = -\frac{f_k}{m} = -\frac{14{,}7}{6{,}0} = \underline{\underline{-2{,}45 \text{ m/s}^2}}" />
              <p className="mb-1">Steg 3 — Treghetsmoment og vinkelakselerasjon (friksjon akselererer rotasjon):</p>
              <FormulaBox variant="blue" latex="I = \tfrac{2}{5}mR^2 = \tfrac{2}{5}(6{,}0)(0{,}11)^2 = 0{,}02904 \text{ kg·m}^2" />
              <FormulaBox variant="gold" latex="\alpha = \frac{f_k R}{I} = \frac{14{,}7 \times 0{,}11}{0{,}02904} = \underline{\underline{55{,}7 \text{ rad/s}^2}}" />
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1 mt-2">(b) Tid til rulling uten glidning:</p>
              <p className="mb-1">Steg 4 — Skriv <InlineLatex latex="v(t)" /> og <InlineLatex latex="\omega(t)" />:</p>
              <FormulaBox variant="blue" latex="v(t) = 10{,}0 - 2{,}45t \qquad \omega(t) = 55{,}7t" />
              <p className="mb-1">Steg 5 — Sett rullingsbetingelsen <InlineLatex latex="v = R\omega" />:</p>
              <FormulaBox variant="blue" latex="10{,}0 - 2{,}45t = 0{,}11 \times 55{,}7t = 6{,}13t" />
              <FormulaBox variant="gold" latex="t = \frac{10{,}0}{2{,}45 + 6{,}13} = \frac{10{,}0}{8{,}58} = \underline{\underline{1{,}17 \text{ s}}}" />
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1 mt-2">(c) Fart ved <InlineLatex latex="t = 1{,}17 \text{ s}" />:</p>
              <FormulaBox variant="gold" latex="v = 10{,}0 - 2{,}45 \times 1{,}17 = \underline{\underline{7{,}1 \text{ m/s}}}" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>Mens kulen glir, er friksjonskraften kinetisk og virker i begge modusene: den bremser translasjon og akselererer rotasjon. Systemet «konvergerer» mot rulling uten glidning. Etter dette tidspunktet er det <em>statisk</em> friksjon, og systemet fortsetter med konstant <InlineLatex latex="v" /> (horisontalt gulv).</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Svingdør med prosjektil (Vår 2023)"
        difficulty="vanskelig"
        source="Eksamen Vår 2023, Oppgave 3"
        problem={
          <div>
            <p className="mb-2">En svingdør (tynn stav, <InlineLatex latex="M = 15 \text{ kg}" />, <InlineLatex latex="l = 1{,}00 \text{ m}" />) roterer om en ende. En kule (<InlineLatex latex="m = 0{,}010 \text{ kg}" />, <InlineLatex latex="v = 400 \text{ m/s}" />) treffer døra i midten og setter seg fast.</p>
            <p className="mb-1">(a) Finn treghetsmomentet for dør + kule.</p>
            <p className="mb-1">(b) Finn vinkelhastigheten etter treffet.</p>
            <p>(c) Finn tap av kinetisk energi.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: "I_dør = ⅓Ml², I_kule = m(l/2)²" },
          { label: "Hint 2", content: "L bevart: m·v·(l/2) = (I_dør + I_kule)·ω" },
        ]}
        solution={
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Dør (tynn stav, roterer om ende): <InlineLatex latex="M = 15 \text{ kg}" />, <InlineLatex latex="l = 1{,}00 \text{ m}" /></li>
                <li>Kule: <InlineLatex latex="m = 0{,}010 \text{ kg}" />, <InlineLatex latex="v = 400 \text{ m/s}" />, treffer midten <InlineLatex latex="l/2" /></li>
                <li>Kula setter seg fast (fullstendig inelastisk kollisjon)</li>
                <li>Ingen ytre kraftmoment under kollisjonen → <InlineLatex latex="L" /> bevart</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>(a) Totalt treghetsmoment <InlineLatex latex="I_\text{tot}" /></li>
                <li>(b) Vinkelhastigheten <InlineLatex latex="\omega" /> etter treffet</li>
                <li>(c) Tap av kinetisk energi <InlineLatex latex="\Delta K" /></li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p>Kula setter seg fast → angulært moment bevart. Kulen bidrar til treghetsmomentet som en punktmasse i avstand <InlineLatex latex="l/2" />. Angulært moment til kula før treffet: <InlineLatex latex="L = mv \cdot (l/2)" />. Deretter: <InlineLatex latex="L = I_\text{tot}\omega" />. Kinetisk energi er ikke bevart — beregn tapet separat.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">(a) Treghetsmoment:</p>
              <p className="mb-1">Steg 1 — Dørens treghetsmoment (stav om ende):</p>
              <FormulaBox variant="blue" latex="I_\text{dør} = \tfrac{1}{3}Ml^2 = \tfrac{1}{3}(15)(1{,}00)^2 = 5{,}0 \text{ kg·m}^2" />
              <p className="mb-1">Steg 2 — Kulens treghetsmoment (punktmasse i <InlineLatex latex="l/2" />):</p>
              <FormulaBox variant="blue" latex="I_\text{kule} = m\!\left(\frac{l}{2}\right)^{\!2} = 0{,}010 \times (0{,}50)^2 = 2{,}5 \times 10^{-3} \text{ kg·m}^2" />
              <p className="mb-1">Steg 3 — Totalt:</p>
              <FormulaBox variant="gold" latex="I_\text{tot} = I_\text{dør} + I_\text{kule} = 5{,}0 + 0{,}0025 \approx \underline{\underline{5{,}0 \text{ kg·m}^2}}" />
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1 mt-2">(b) Vinkelhastighet etter treffet:</p>
              <p className="mb-1">Steg 4 — Angulært moment til kula like før treffet:</p>
              <FormulaBox variant="blue" latex="L_\text{før} = mv \cdot \frac{l}{2} = 0{,}010 \times 400 \times 0{,}50 = 2{,}0 \text{ kg·m}^2\text{/s}" />
              <p className="mb-1">Steg 5 — Bevaring: <InlineLatex latex="L_\text{før} = I_\text{tot}\omega" />:</p>
              <FormulaBox variant="gold" latex="\omega = \frac{L_\text{før}}{I_\text{tot}} = \frac{2{,}0}{5{,}0025} \approx \underline{\underline{0{,}40 \text{ rad/s}}}" />
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1 mt-2">(c) Tap av kinetisk energi:</p>
              <p className="mb-1">Steg 6 — Kinetisk energi før og etter:</p>
              <FormulaBox variant="blue" latex="K_1 = \tfrac{1}{2}mv^2 = \tfrac{1}{2}(0{,}010)(400)^2 = 800 \text{ J}" />
              <FormulaBox variant="blue" latex="K_2 = \tfrac{1}{2}I_\text{tot}\omega^2 = \tfrac{1}{2}(5{,}00)(0{,}40)^2 = 0{,}40 \text{ J}" />
              <FormulaBox variant="gold" latex="\Delta K = 0{,}40 - 800 \approx \underline{\underline{-800 \text{ J}}}" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>Nesten all kinetisk energi (99,95 %) forsvinner i kollisjonen — deformasjonsenergi. Dette er det rotatoriske ekvivalentet til en fullstendig inelastisk kollisjon. Angulært moment er bevart (ingen ytre τ), men energi er tapt. Legg merke til at kulen (<InlineLatex latex="I_\text{kule} \ll I_\text{dør}" />) bidrar tilnærmet ingenting til treghetsmomentet.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="To sylindre — angulært moment (Oblig 3)"
        difficulty="vanskelig"
        source="Oblig 3, Oppgave 1"
        problem={
          <div>
            <p className="mb-2">En sylindrisk plate (øverst) med <InlineLatex latex="I_\text{øvre} = 50 \text{ kg·m}^2" /> og <InlineLatex latex="\omega_0 = 20 \text{ rad/s}" /> slippes ned på en stillestående plate (nederst) med <InlineLatex latex="I_\text{nedre} = 100 \text{ kg·m}^2" />. Friksjon mellom platene gjør at de til slutt roterer med samme ω.</p>
            <p className="mb-1">(a) Finn felles vinkelhastighet.</p>
            <p>(b) Finn arbeidet utført av friksjonen.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: "L bevart: I_øvre·ω₀ = (I_øvre + I_nedre)·ω_f" },
          { label: "Hint 2", content: "W_friksjon = ΔK = K_f − K_i" },
        ]}
        solution={
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Øvre plate: <InlineLatex latex="I_\text{øvre} = 50 \text{ kg·m}^2" />, <InlineLatex latex="\omega_0 = 20 \text{ rad/s}" /></li>
                <li>Nedre plate: <InlineLatex latex="I_\text{nedre} = 100 \text{ kg·m}^2" />, <InlineLatex latex="\omega_\text{nedre,0} = 0" /></li>
                <li>Friksjon bringer platene til felles vinkelhastighet <InlineLatex latex="\omega_f" /></li>
                <li>Ingen ytre kraftmoment → <InlineLatex latex="L" /> er bevart</li>
              </ul>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>(a) Felles vinkelhastighet <InlineLatex latex="\omega_f" /></li>
                <li>(b) Arbeidet utført av friksjonen (<InlineLatex latex="= \Delta K" />)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Strategi</p>
              <p className="mb-1">Friksjonen mellom platene er et indre kraftpar i systemet → ytre kraftmoment er null → angulært moment bevart. Vi bruker <InlineLatex latex="I_\text{øvre}\omega_0 = (I_\text{øvre} + I_\text{nedre})\omega_f" />. Deretter er friksjonsarbeidet lik endringen i kinetisk energi: <InlineLatex latex="W_f = \Delta K = K_f - K_i" />.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">(a) Felles vinkelhastighet:</p>
              <p className="mb-1">Steg 1 — Bruk bevaringsloven:</p>
              <FormulaBox variant="blue" latex="I_\text{øvre}\omega_0 = (I_\text{øvre} + I_\text{nedre})\omega_f" />
              <p className="mb-1">Steg 2 — Løs og sett inn:</p>
              <FormulaBox variant="gold" latex="\omega_f = \frac{I_\text{øvre}\,\omega_0}{I_\text{øvre} + I_\text{nedre}} = \frac{50 \times 20}{50 + 100} = \frac{1000}{150} = \underline{\underline{\tfrac{20}{3} \approx 6{,}67 \text{ rad/s}}}" />
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1 mt-2">(b) Arbeid utført av friksjon:</p>
              <p className="mb-1">Steg 3 — Kinetisk energi før:</p>
              <FormulaBox variant="blue" latex="K_i = \tfrac{1}{2}I_\text{øvre}\omega_0^2 = \tfrac{1}{2}(50)(20)^2 = 10\,000 \text{ J}" />
              <p className="mb-1">Steg 4 — Kinetisk energi etter:</p>
              <FormulaBox variant="blue" latex="K_f = \tfrac{1}{2}(I_\text{øvre}+I_\text{nedre})\omega_f^2 = \tfrac{1}{2}(150)\!\left(\tfrac{20}{3}\right)^{\!2} = \tfrac{1}{2}(150)\cdot\tfrac{400}{9} \approx 3\,333 \text{ J}" />
              <p className="mb-1">Steg 5 — Friksjonsarbeid = endring i kinetisk energi:</p>
              <FormulaBox variant="gold" latex="W_\text{friksjon} = \Delta K = K_f - K_i = 3\,333 - 10\,000 = \underline{\underline{-6\,667 \text{ J}}}" />
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Hva lærte vi?</p>
              <p>Selv om angulært moment er bevart, forsvinner en stor del av kinetisk energi til varme via friksjon. Jo større <InlineLatex latex="I_\text{nedre}/I_\text{øvre}" />-forholdet er, jo mer energi tapes. Dette er et gjennomgangstema i obligen og på eksamen: skille mellom bevarte og ikke-bevarte størrelser ved rotasjonskollisjoner.</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
