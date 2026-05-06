"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { modelleringPages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function SjekklistePage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/modellering" className="hover:text-[var(--accent)]">Modellering</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Sjekkliste</span>
      </div>

      <DAT109SubNav basePath={dat109BasePaths.modellering} pages={modelleringPages} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sjekkliste for oppgave 1</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Slik sjekker du at brukstilfelle, domene og sekvens henger sammen før du leverer
          — pluss oversikt over hva som faktisk har kommet på tidligere eksamener.
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          EKSAMEN-SJEKKLISTE
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="Sjekkliste for oppgave 1 på eksamen"
        defaultOpen={true}
        mustKnow={[
          "Les oppgaven to ganger. Understrek substantiver (→ klasser) og verb (→ brukstilfeller/metoder).",
          "Diagrammene MÅ være konsistente med hverandre.",
          "Start enkelt — det er bedre med en enkel, riktig modell enn en komplisert, feil modell.",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Før du begynner</h3>
        <p>Les spillbeskrivelsen to ganger. Understrek <strong>substantiver</strong> (→ klasser)
        og <strong>verb/handlinger</strong> (→ brukstilfeller/metoder).</p>

        <div className="grid sm:grid-cols-3 gap-4 my-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-sm mb-2">1a — Brukstilfellemodell</h4>
            <ul className="text-sm space-y-1">
              <li className="flex gap-2"><span>☐</span> Diagram med aktør, system, 2–4 brukstilfeller</li>
              <li className="flex gap-2"><span>☐</span> Ikke et flytdiagram!</li>
              <li className="flex gap-2"><span>☐</span> Tekstlig beskrivelse for hvert brukstilfelle</li>
              <li className="flex gap-2"><span>☐</span> Forkrav nevnt</li>
              <li className="flex gap-2"><span>☐</span> &lt;&lt;include&gt;&gt; der det gir mening</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-sm mb-2">1b — Domenemodell</h4>
            <ul className="text-sm space-y-1">
              <li className="flex gap-2"><span>☐</span> Konseptuelle klasser fra substantiver</li>
              <li className="flex gap-2"><span>☐</span> INGEN metoder!</li>
              <li className="flex gap-2"><span>☐</span> Attributter på alle klasser</li>
              <li className="flex gap-2"><span>☐</span> Multiplisitet på ALLE assosiasjoner</li>
              <li className="flex gap-2"><span>☐</span> Arv kun ved tydelige undertyper</li>
              <li className="flex gap-2"><span>☐</span> Konsistent med brukstilfellene</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-sm mb-2">1c — Sekvensdiagram</h4>
            <ul className="text-sm space-y-1">
              <li className="flex gap-2"><span>☐</span> Objekter fra domenemodellen</li>
              <li className="flex gap-2"><span>☐</span> Samsvarer med brukstilfellebeskrivelsen</li>
              <li className="flex gap-2"><span>☐</span> loop for gjentakelser</li>
              <li className="flex gap-2"><span>☐</span> alt/opt for betingelser</li>
              <li className="flex gap-2"><span>☐</span> Meldinger kun fra aktive objekter</li>
              <li className="flex gap-2"><span>☐</span> Parametere og returverdier</li>
            </ul>
          </div>
        </div>

        {/* Tidligere eksamener oversikt */}
        <h3 className="text-lg font-bold mt-6">Hva har kommet på eksamen?</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">År</th>
                <th className="text-left py-2 pr-4 font-semibold">Spill/System</th>
                <th className="text-left py-2 font-semibold">Fasit?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr><td className="py-1.5 pr-4">Høst 2020</td><td className="py-1.5 pr-4">Automatisert eksamenssystem</td><td className="py-1.5">Ja</td></tr>
              <tr><td className="py-1.5 pr-4">Vår 2021</td><td className="py-1.5 pr-4">Hungry Cats (brettspill)</td><td className="py-1.5">Delvis</td></tr>
              <tr><td className="py-1.5 pr-4">Vår 2022</td><td className="py-1.5 pr-4">KIMBO (brettspill)</td><td className="py-1.5">Nei</td></tr>
              <tr><td className="py-1.5 pr-4">Jan 2023 (konte)</td><td className="py-1.5 pr-4">Magiske øyne (terningspill)</td><td className="py-1.5">Nei</td></tr>
              <tr className="bg-green-50 dark:bg-green-950/10"><td className="py-1.5 pr-4 font-semibold">Vår 2023</td><td className="py-1.5 pr-4 font-semibold">Max Mümmelmann (kortspill)</td><td className="py-1.5 font-semibold">Ja (best ref.)</td></tr>
              <tr><td className="py-1.5 pr-4">Høst 2023 (konte)</td><td className="py-1.5 pr-4">Ganz Schön Clever (terningspill)</td><td className="py-1.5">Nei</td></tr>
              <tr><td className="py-1.5 pr-4">Vår 2024</td><td className="py-1.5 pr-4">Skyjo (kortspill)</td><td className="py-1.5">Nei</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Det er nesten <strong>alltid et spill</strong> (brett-, kort- eller terningspill) med
          2–4 spillere og runder. Den beste referanseeksamenen er <strong>vår 2023 (Max
          Mümmelmann)</strong> som har det mest komplette løsningsforslaget fra professoren.
        </p>
      </TheorySummary>
    </div>
  );
}
