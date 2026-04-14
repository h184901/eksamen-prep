"use client";

import Link from "next/link";

export default function Oppg8Page() {
  return (
    <div>
      <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/20 p-4 mb-8">
        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">Strategi</h3>
        <ol className="text-sm text-blue-900 dark:text-blue-200 space-y-1 list-decimal list-inside">
          <li>Tegn det fysiske nettverket: noder (prosesser + rutere) og kantkostnader</li>
          <li>Finn korteste fysiske sti mellom hvert prosesspar (kjøres manuelt med Dijkstra/øyemål)</li>
          <li>Bygg overlay-grafen: kanter kun mellom prosesser (ikke rutere)</li>
          <li>Beregn overlaykostnaden = sum av fysiske kostnader langs overlay-veien</li>
          <li>RDP = overlay-forsinkelse / beste fysiske forsinkelse — lavere er bedre, 1.0 er perfekt</li>
          <li>Sammenlign to multicast-trær: sum kostnader for alle kanter, lavere sum = bedre tre</li>
        </ol>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3">RDP-formelen</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 text-center">
          <p className="text-2xl font-mono font-bold mb-2">RDP = d_overlay / d_fysisk</p>
          <p className="text-sm text-[var(--muted)]">
            d_overlay = forsinkelse via overlay-nettverket (sum av fysiske hopp langs overlay-veien)<br />
            d_fysisk = korteste mulige forsinkelse i det fysiske nettverket<br />
            RDP = 1.0 → overlay er like godt som fysisk nettverk<br />
            RDP = 2.0 → overlay er dobbelt så tregt
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3">Hva oppgaven alltid tester</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              label: "Tegne overlay-graf",
              desc: "Gitt fysisk nett med prosesser A–E og rutere Ra–Re: koble prosessene direkte. Overlay-kanten A–D har kostnad = korteste fysiske sti fra A til D.",
            },
            {
              label: "Beregne RDP",
              desc: "Velg et multicast-tre, summer kantkostnadene for stien A→D. Finn den korteste fysiske stien A→D. RDP = sum(overlay)/min(fysisk).",
            },
            {
              label: "Sammenligne trær",
              desc: "To ulike multicast-trær fra A til {B,C,D,E}: summer totalforsinkelse for hvert tre. Lavest sum = mest effektivt tre.",
            },
            {
              label: "Overlay-typer",
              desc: "Strukturert (Chord DHT): deterministisk topologi. Ustrukturert (Gnutella): tilfeldig. Gossip: epidemisk spredning.",
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
        <h2 className="text-lg font-bold mb-3">Eksempel: enkel RDP-beregning</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm space-y-2">
          <p className="text-[var(--muted)]">Fysisk nett: A→Ra (10ms), Ra→Rd (20ms), Rd→D (10ms). Korteste A→D = 40ms.</p>
          <p className="text-[var(--muted)]">Overlay: A→B→D. Overlay-sti: A→Ra→Rb→B (15ms+5ms=20ms) + B→Rb→Rd→D (5ms+20ms+10ms=35ms) = 55ms.</p>
          <p className="font-mono font-bold text-blue-600 dark:text-blue-400">RDP(A→D via B) = 55 / 40 = 1.375</p>
          <p className="text-xs text-[var(--muted)]">Overlayet via B er 37.5% tregere enn optimal fysisk rute.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Link href="/dat110/ds-4" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 4</span>
          <span>Kommunikasjon: overlay og multicast</span>
        </Link>
      </div>
    </div>
  );
}
