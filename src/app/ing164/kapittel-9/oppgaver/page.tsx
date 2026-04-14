"use client";

import ExerciseCard from "@/components/ExerciseCard";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver</h2>

      <CollapsibleSection title="Oppgavestrategier">
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
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
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
        <Link href="/ing164/eksamen/oppgaver" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 9</p>
        </Link>
      </div>
    </div>
  );
}
