"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver</h2>

      <CollapsibleSection title="Oppgavestrategier">
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
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
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

      </CollapsibleSection>

      {/* ── Relaterte oppgaver ── */}
      <h3 className="text-xl font-semibold mb-4">Relaterte oppgaver</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/ing164/eksamen/eksamener" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-red-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
            <h4 className="font-semibold">Eksamensoppgaver</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Vår 2023, Høst 2023</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Oblig 3, oppgave 1</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver/kapittel-10" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 10</p>
        </Link>
      </div>
    </div>
  );
}
