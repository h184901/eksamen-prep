"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";

const sections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

export default function Kapittel6Oversikt() {
  return (
    <div>
      <ProgressTracker chapterId={6} sections={sections} />

      <p className="text-[var(--muted)] mb-8 text-lg leading-relaxed">
        Kapittel 6 handler om arbeid og kinetisk energi — to av de mest grunnleggende
        begrepene i mekanikken. Du lærer å beregne arbeidet som krefter gjør, og hvordan
        arbeid henger direkte sammen med endringer i et legemes kinetiske energi via
        arbeid-energi-teoremet.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Link
          href="/ing164/kapittel-6/teori"
          className="rounded-xl border-2 border-blue-400 bg-[var(--card)] p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 group"
        >
          <div className="text-2xl mb-2">📖</div>
          <h2 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors">Teori</h2>
          <p className="text-sm text-[var(--muted)]">
            Konsepter, definisjoner og pedagogiske forklaringer med intuisjon bak formlene.
          </p>
        </Link>

        <Link
          href="/ing164/kapittel-6/formler"
          className="rounded-xl border-2 border-amber-400 bg-[var(--card)] p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 group"
        >
          <div className="text-2xl mb-2">📐</div>
          <h2 className="font-bold text-lg mb-1 group-hover:text-amber-500 transition-colors">Formler</h2>
          <p className="text-sm text-[var(--muted)]">
            Alle formler med KaTeX, fargekoding og «Når bruker du hva?»-guide.
          </p>
        </Link>

        <Link
          href="/ing164/kapittel-6/oppgaver"
          className="rounded-xl border-2 border-green-400 bg-[var(--card)] p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 group"
        >
          <div className="text-2xl mb-2">✏️</div>
          <h2 className="font-bold text-lg mb-1 group-hover:text-green-500 transition-colors">Oppgaver</h2>
          <p className="text-sm text-[var(--muted)]">
            Strategier, gjennomgåtte eksempler, øvingsoppgaver og eksamensoppgaver med løsninger.
          </p>
        </Link>

        <Link
          href="/ing164/kapittel-6/visualiseringer"
          className="rounded-xl border-2 border-purple-400 bg-[var(--card)] p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 group"
        >
          <div className="text-2xl mb-2">🎛️</div>
          <h2 className="font-bold text-lg mb-1 group-hover:text-purple-500 transition-colors">Visualiseringer</h2>
          <p className="text-sm text-[var(--muted)]">
            Interaktive simulasjoner — endre parametere og se resultater live.
          </p>
        </Link>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h2 className="font-bold text-lg mb-4">Temaer i dette kapittelet</h2>
        <ul className="space-y-2 text-sm text-[var(--muted)]">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold mt-0.5">6.1</span>
            <span>Arbeid av en konstant kraft — W = F · s · cos φ, prikkprodukt og fortegnregler</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold mt-0.5">6.2</span>
            <span>Kinetisk energi og arbeid-energi-teoremet — W&#8203;_&#8203;tot = ΔE&#8203;_&#8203;k</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold mt-0.5">6.3</span>
            <span>Arbeid ved varierende krefter — integralet, Hookes lov og fjærarbeid</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold mt-0.5">6.4</span>
            <span>Effekt — P = ΔW/Δt og P = F · v, enheter watt og kWh</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
