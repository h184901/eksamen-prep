"use client";

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
          <div className="space-y-2 text-sm">
            <p><InlineLatex latex="\tau = rF\sin\phi = 0{,}40 \times 15 \times \sin 60° = 5{,}2 \text{ N·m}" /></p>
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
          <div className="space-y-2 text-sm">
            <p><InlineLatex latex="I = \tfrac{1}{2}(25)(0{,}15)^2 = 0{,}281 \text{ kg·m}^2" /></p>
            <p><InlineLatex latex="\tau = FR = 12 \times 0{,}15 = 1{,}80 \text{ N·m}" /></p>
            <p>(a) <InlineLatex latex="\alpha = -\frac{\tau}{I} = -\frac{1{,}80}{0{,}281} = -6{,}40 \text{ rad/s}^2" /></p>
            <p><InlineLatex latex="\omega_0 = 200 \times \frac{2\pi}{60} = 20{,}9 \text{ rad/s}" /></p>
            <p>(b) <InlineLatex latex="0 = 20{,}9 + (-6{,}40)t \implies t = 3{,}3 \text{ s}" /></p>
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
          <div className="space-y-2 text-sm">
            <p><InlineLatex latex="mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2} \cdot \tfrac{2}{5}mR^2 \cdot \frac{v^2}{R^2}" /></p>
            <p><InlineLatex latex="gh = \tfrac{1}{2}v^2 + \tfrac{1}{5}v^2 = \tfrac{7}{10}v^2" /></p>
            <p><InlineLatex latex="v = \sqrt{\frac{10gh}{7}} = \sqrt{\frac{10 \times 9{,}81 \times 2{,}0}{7}} = 5{,}29 \text{ m/s}" /></p>
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
          <div className="space-y-2 text-sm">
            <p><InlineLatex latex="\omega_f = \frac{I_1\omega_1}{I_1 + I_2} = \frac{4{,}0 \times 6{,}0}{4{,}0 + 2{,}0} = 4{,}0 \text{ rad/s}" /></p>
            <p><InlineLatex latex="K_1 = \tfrac{1}{2}(4{,}0)(6{,}0)^2 = 72 \text{ J}" /></p>
            <p><InlineLatex latex="K_f = \tfrac{1}{2}(6{,}0)(4{,}0)^2 = 48 \text{ J}" /></p>
            <p><InlineLatex latex="\Delta K = 48 - 72 = -24 \text{ J}" /> (tapt til varme via friksjon mellom platene)</p>
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
          <div className="space-y-2 text-sm">
            <p><InlineLatex latex="I = \tfrac{1}{2}MR^2 = \tfrac{1}{2}(0{,}20)(0{,}030)^2 = 9{,}0 \times 10^{-5} \text{ kg·m}^2" /></p>
            <p>Translasjon: <InlineLatex latex="Mg - T = Ma" /></p>
            <p>Rotasjon: <InlineLatex latex="Tr = I\alpha" />, og <InlineLatex latex="a = r\alpha" /></p>
            <p>Fra rotasjon: <InlineLatex latex="T = \frac{I\alpha}{r} = \frac{Ia}{r^2}" /></p>
            <p>Sett inn: <InlineLatex latex="Mg = Ma + \frac{Ia}{r^2} = a\left(M + \frac{I}{r^2}\right)" /></p>
            <p><InlineLatex latex="a = \frac{Mg}{M + I/r^2} = \frac{0{,}20 \times 9{,}81}{0{,}20 + 9{,}0 \times 10^{-5}/(0{,}005)^2} = \frac{1{,}962}{0{,}20 + 3{,}6} = 0{,}516 \text{ m/s}^2" /></p>
            <p>(a) <InlineLatex latex="\alpha = \frac{a}{r} = \frac{0{,}516}{0{,}005} = 103 \text{ rad/s}^2" /></p>
            <p>(b) <InlineLatex latex="T = M(g - a) = 0{,}20(9{,}81 - 0{,}516) = 1{,}86 \text{ N}" /></p>
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
          <div className="space-y-2 text-sm">
            <p className="font-semibold">(a) Akselerasjoner:</p>
            <p><InlineLatex latex="f_k = \mu_k mg = 0{,}25 \times 6{,}0 \times 9{,}81 = 14{,}7 \text{ N}" /></p>
            <p><InlineLatex latex="a = -\frac{f_k}{m} = -\frac{14{,}7}{6{,}0} = -2{,}45 \text{ m/s}^2" /></p>
            <p><InlineLatex latex="I = \tfrac{2}{5}mR^2 = \tfrac{2}{5}(6{,}0)(0{,}11)^2 = 0{,}02904 \text{ kg·m}^2" /></p>
            <p><InlineLatex latex="\alpha = \frac{f_k R}{I} = \frac{14{,}7 \times 0{,}11}{0{,}02904} = 55{,}7 \text{ rad/s}^2" /></p>
            <p className="font-semibold mt-2">(b) Tidspunkt for rulling:</p>
            <p><InlineLatex latex="v(t) = v_0 + at = 10{,}0 - 2{,}45t" /></p>
            <p><InlineLatex latex="\omega(t) = \alpha t = 55{,}7t" /></p>
            <p>Betingelse: <InlineLatex latex="v = R\omega" /></p>
            <p><InlineLatex latex="10{,}0 - 2{,}45t = 0{,}11 \times 55{,}7t = 6{,}13t" /></p>
            <p><InlineLatex latex="10{,}0 = 8{,}58t \implies t = 1{,}17 \text{ s}" /></p>
            <p className="font-semibold mt-2">(c) Fart:</p>
            <p><InlineLatex latex="v = 10{,}0 - 2{,}45 \times 1{,}17 = 7{,}1 \text{ m/s}" /></p>
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
          <div className="space-y-2 text-sm">
            <p className="font-semibold">(a) Treghetsmoment:</p>
            <p><InlineLatex latex="I_\text{dør} = \tfrac{1}{3}Ml^2 = \tfrac{1}{3}(15)(1{,}00)^2 = 5{,}0 \text{ kg·m}^2" /></p>
            <p><InlineLatex latex="I_\text{kule} = m\left(\frac{l}{2}\right)^2 = 0{,}010 \times (0{,}50)^2 = 0{,}0025 \text{ kg·m}^2" /></p>
            <p><InlineLatex latex="I_\text{tot} = 5{,}0 + 0{,}0025 = 5{,}0025 \text{ kg·m}^2" /></p>
            <p className="font-semibold mt-2">(b) Angulært moment bevart:</p>
            <p><InlineLatex latex="L_\text{før} = mv \cdot \frac{l}{2} = 0{,}010 \times 400 \times 0{,}50 = 2{,}0 \text{ kg·m}^2\text{/s}" /></p>
            <p><InlineLatex latex="\omega = \frac{L}{I_\text{tot}} = \frac{2{,}0}{5{,}0025} \approx 0{,}40 \text{ rad/s}" /></p>
            <p className="font-semibold mt-2">(c) Energitap:</p>
            <p><InlineLatex latex="K_1 = \tfrac{1}{2}mv^2 = \tfrac{1}{2}(0{,}010)(400)^2 = 800 \text{ J}" /></p>
            <p><InlineLatex latex="K_2 = \tfrac{1}{2}I_\text{tot}\omega^2 = \tfrac{1}{2}(5{,}0025)(0{,}40)^2 = 0{,}40 \text{ J}" /></p>
            <p><InlineLatex latex="\Delta K = 0{,}40 - 800 = -799{,}6 \text{ J}" /></p>
            <p className="text-red-500">Nesten all energi går tapt til deformasjon og varme!</p>
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
          <div className="space-y-2 text-sm">
            <p className="font-semibold">(a)</p>
            <p><InlineLatex latex="\omega_f = \frac{I_\text{øvre}\omega_0}{I_\text{øvre} + I_\text{nedre}} = \frac{50 \times 20}{50 + 100} = \frac{1000}{150} = \frac{10}{3} \approx 3{,}33 \text{ rad/s}" /></p>
            <p className="font-semibold mt-2">(b)</p>
            <p><InlineLatex latex="K_i = \tfrac{1}{2}I_\text{øvre}\omega_0^2 = \tfrac{1}{2}(50)(20)^2 = 10\,000 \text{ J}" /></p>
            <p><InlineLatex latex="K_f = \tfrac{1}{2}(150)\left(\frac{10}{3}\right)^2 = \tfrac{1}{2}(150)\frac{100}{9} = 833 \text{ J}" /></p>
            <p><InlineLatex latex="W_\text{friksjon} = 833 - 10\,000 = -9167 \text{ J}" /></p>
          </div>
        }
      />
    </div>
  );
}
