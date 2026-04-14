"use client";

import Link from "next/link";

export default function Oppg6Page() {
  return (
    <div>
      <div className="rounded-xl border border-network-300 bg-network-50 dark:bg-network-950/20 dark:border-network-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-network-700 dark:text-network-400 mb-2">Strategi</h3>
        <ol className="text-sm text-network-900 dark:text-network-200 space-y-1 list-decimal list-inside">
          <li>Tegn topologien: verter, switch(er) og rutere med porter</li>
          <li>Følg ARP-prosessen steg for steg: request (broadcast) → reply (unicast)</li>
          <li>Oppdater ARP-tabellen og switchtabellen etter hvert steg</li>
          <li>Er dest på samme subnett? → ARP direkte. Annet subnett? → ARP til gateway</li>
          <li>For CIDR: konverter til binær, tell nettverksbiter, beregn 2^(32−prefikslengde)</li>
          <li>For forwardingtabell: longest-prefix match vinner alltid</li>
        </ol>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3">Hva oppgaven alltid tester</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "ARP-tabell", desc: "Hva er i ARP-tabellen etter at H1 sender til H3? (IP→MAC mapping)" },
            { label: "Switch self-learning", desc: "Hva er i switchtabellen? (MAC→port, oppdateres fra kilde-MAC i innkommende rammer)" },
            { label: "CIDR-adresserom", desc: "Første/siste adresse i et /22-subnett. Konverter til binær, finn nettverks- og broadcast-adresse." },
            { label: "Forwardingtabell", desc: "Hvilken neste-hop brukes for en gitt dest-IP? Longest-prefix match avgjør." },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="font-bold text-sm text-network-600 dark:text-network-400 mb-1">{item.label}</p>
              <p className="text-xs text-[var(--muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3">Teorigrunnlag</h2>
        <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
          <p>
            <span className="font-semibold text-[var(--foreground)]">ARP (Address Resolution Protocol)</span> løser
            problemet: «Jeg kjenner IP-adressen, men trenger MAC-adressen for å sende en Ethernet-ramme.»
            Senderen broadcaster en ARP-request (<span className="font-mono">FF:FF:FF:FF:FF:FF</span>) til hele LAN-et.
            Kun verten med riktig IP svarer med unicast ARP-reply. Resultatet lagres i ARP-tabellen med TTL.
          </p>
          <p>
            <span className="font-semibold text-[var(--foreground)]">Switch self-learning</span>: Switchen leser
            kildeadressen (src MAC) i hver innkommende ramme og lagrer <code>(MAC, port, tidsstempel)</code> i
            switch-tabellen. Ukjent destinasjon → flooding på alle porter unntatt innkommende. Kjent destinasjon →
            unicast videresending. Kilde = destinasjon på samme port → dropp.
          </p>
          <p>
            <span className="font-semibold text-[var(--foreground)]">CIDR</span>: a.b.c.d/x betyr x nettverksbiter.
            Antall adresser = 2^(32−x). Nettverksadresse = alle host-biter satt til 0.
            Broadcast = alle host-biter satt til 1.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Link href="/dat110/cn-6" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-network-600 dark:text-network-400">CN 6</span>
          <span>Linklaget (ARP, Ethernet, Switch)</span>
        </Link>
      </div>
    </div>
  );
}
