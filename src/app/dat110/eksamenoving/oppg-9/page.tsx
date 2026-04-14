"use client";

import Link from "next/link";

export default function Oppg9Page() {
  return (
    <div>
      <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/20 p-4 mb-8">
        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">Strategi</h3>
        <ol className="text-sm text-blue-900 dark:text-blue-200 space-y-1 list-decimal list-inside">
          <li>Teoridelen (a og b): svar med presise definisjoner (2–3 setninger per del)</li>
          <li>Vektorklokke-del: gå gjennom hendelsene kronologisk, oppdater etter reglene</li>
          <li>Lokal hendelse: inkrementer kun din egen teller, alle andre forblir uendret</li>
          <li>Send: inkrementer din teller, legg ved hele vektoren i meldingen</li>
          <li>Mottak: ta max av hvert element, inkrementer deretter din teller</li>
        </ol>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3">Vektorklokke-regler</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 font-mono text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded px-2 py-1">Lokal</span>
              <p className="text-[var(--muted)]"><span className="font-semibold text-[var(--foreground)]">VC[i]++</span> — inkrementer kun prosess i sin teller. Resten uendret.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 font-mono text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded px-2 py-1">Send</span>
              <p className="text-[var(--muted)]"><span className="font-semibold text-[var(--foreground)]">VC[i]++</span>, deretter send hele VC-vektoren som del av meldingen.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 font-mono text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded px-2 py-1">Motta</span>
              <p className="text-[var(--muted)]"><span className="font-semibold text-[var(--foreground)]">VC[j] = max(VC[j], m[j])</span> for alle j, deretter <strong>VC[i]++</strong>.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3">Hva oppgaven alltid tester</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              label: "Feiltolerante grupper",
              desc: "Flat vs. hierarkisk organisering. Flat: alle likeverdige, beslutning ved majoritet. Hierarkisk: primær koordinator, sekundærer tar over ved feil.",
            },
            {
              label: "RPC-feilscenarier",
              desc: "Lost request, lost reply, server crash before/after execution. Klienten kan ikke skille mellom disse — derav behovet for idempotente operasjoner.",
            },
            {
              label: "Replikering",
              desc: "Hvorfor replisere: ytelse, feiltoleranse, tilgjengelighet. Utfordring: konsistens mellom replikaer.",
            },
            {
              label: "Vektorklokker",
              desc: "Beregne VC for 3–4 prosesser gjennom en sekvens av hendelser. Vis mellomregning for hvert steg.",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="font-bold text-sm text-blue-600 dark:text-blue-400 mb-1">{item.label}</p>
              <p className="text-xs text-[var(--muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3">Eksempel: vektorklokke steg-for-steg</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-xs overflow-x-auto">
          <p className="text-[var(--muted)] mb-3">3 prosesser P1, P2, P3. Start: alle VC = [0,0,0].</p>
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="text-[var(--muted)] border-b border-[var(--card-border)]">
                <th className="text-left pb-1 pr-4">Hendelse</th>
                <th className="text-left pb-1 pr-4">P1</th>
                <th className="text-left pb-1 pr-4">P2</th>
                <th className="text-left pb-1">P3</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr className="border-b border-[var(--card-border)]/30">
                <td className="py-1 pr-4 font-sans text-[var(--muted)]">P1 lokal hendelse</td>
                <td className="py-1 pr-4 text-blue-600 dark:text-blue-400">[1,0,0]</td>
                <td className="py-1 pr-4">[0,0,0]</td>
                <td className="py-1">[0,0,0]</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]/30">
                <td className="py-1 pr-4 font-sans text-[var(--muted)]">P1 sender til P2</td>
                <td className="py-1 pr-4 text-blue-600 dark:text-blue-400">[2,0,0]</td>
                <td className="py-1 pr-4">—</td>
                <td className="py-1">—</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]/30">
                <td className="py-1 pr-4 font-sans text-[var(--muted)]">P2 mottar fra P1</td>
                <td className="py-1 pr-4">[2,0,0]</td>
                <td className="py-1 pr-4 text-blue-600 dark:text-blue-400">[2,1,0]</td>
                <td className="py-1">—</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]/30">
                <td className="py-1 pr-4 font-sans text-[var(--muted)]">P3 lokal hendelse</td>
                <td className="py-1 pr-4">—</td>
                <td className="py-1 pr-4">—</td>
                <td className="py-1 text-blue-600 dark:text-blue-400">[0,0,1]</td>
              </tr>
              <tr>
                <td className="py-1 pr-4 font-sans text-[var(--muted)]">P2 sender til P3</td>
                <td className="py-1 pr-4">—</td>
                <td className="py-1 pr-4 text-blue-600 dark:text-blue-400">[2,2,0]</td>
                <td className="py-1">—</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[var(--muted)] mt-3">Når P3 mottar fra P2: VC_P3 = max([0,0,1], [2,2,0]) + P3++ = [2,2,1] → [2,2,2].</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Link href="/dat110/ds-5" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 5</span>
          <span>Koordinering</span>
        </Link>
        <Link href="/dat110/ds-7" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 7</span>
          <span>Konsistens</span>
        </Link>
        <Link href="/dat110/ds-8" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 8</span>
          <span>Feiltoleranse</span>
        </Link>
      </div>
    </div>
  );
}
