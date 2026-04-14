"use client";

import { useState } from "react";

function CollapsibleYear({ year, children }: { year: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
      >
        <span className="font-bold">{year}</span>
        <span className="text-[var(--muted)] text-lg">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="px-5 pb-5 border-t border-[var(--card-border)]">{children}</div>}
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-2">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-network-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">{n}</span>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{children}</p>
    </div>
  );
}

export default function Oppg6TidligerePage() {
  return (
    <div>
      <p className="text-sm text-[var(--muted)] mb-6">
        Oppgave 6 kombinerer alltid: ARP-tabell etter en sending, switch-tabell etter trafikk,
        CIDR-adresserom og forwardingtabell med longest-prefix match.
      </p>

      {/* Januar 2025 */}
      <CollapsibleYear year="Januar 2025">
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-bold mb-2">Oppgavebeskrivelse</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Switch S kobler tre verter: H1 (port 1), H2 (port 2), H3 (port 3).
              IP-adresser: H1=192.168.0.1, H2=192.168.0.2, H3=192.168.0.3.
              MAC-adresser: H1=1A:1A:1A:1A:1A:1A, H2=2A:2A:2A:2A:2A:2A, H3=3A:3A:3A:3A:3A:3A.
              Anta at alle ARP-tabeller og switch-tabellen er tomme ved start.
            </p>
            {/* SVG diagram */}
            <svg viewBox="0 0 320 180" className="w-full max-w-sm mx-auto block mb-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-[var(--card-border)] p-2">
              {/* Switch */}
              <rect x="120" y="75" width="80" height="30" rx="6" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="1.5"/>
              <text x="160" y="95" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">Switch S</text>
              {/* H1 */}
              <rect x="20" y="130" width="60" height="26" rx="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2"/>
              <text x="50" y="147" textAnchor="middle" fontSize="10" fill="#0c4a6e">H1</text>
              <line x1="80" y1="143" x2="120" y2="105" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4,2"/>
              <text x="95" y="118" fontSize="9" fill="#64748b">port 1</text>
              {/* H2 */}
              <rect x="130" y="140" width="60" height="26" rx="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2"/>
              <text x="160" y="157" textAnchor="middle" fontSize="10" fill="#0c4a6e">H2</text>
              <line x1="160" y1="140" x2="160" y2="105" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4,2"/>
              <text x="165" y="125" fontSize="9" fill="#64748b">port 2</text>
              {/* H3 */}
              <rect x="240" y="130" width="60" height="26" rx="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2"/>
              <text x="270" y="147" textAnchor="middle" fontSize="10" fill="#0c4a6e">H3</text>
              <line x1="240" y1="143" x2="200" y2="105" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4,2"/>
              <text x="215" y="118" fontSize="9" fill="#64748b">port 3</text>
            </svg>

            <p className="text-sm font-semibold mb-2">a) H1 sender en IP-pakke til H3. Fyll ut ARP-tabellen til H1 og switch-tabellen i S.</p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-green-700 dark:text-green-400 mb-2">Løsning — steg for steg</h3>
            <Step n={1}>H1 vil sende til H3 (192.168.0.3). H1 har ikke H3 sin MAC. H1 sender ARP-request som <strong>broadcast</strong>: src=1A:..., dst=FF:FF:FF:FF:FF:FF, «Hvem har 192.168.0.3?»</Step>
            <Step n={2}>Switchen mottar rammen på port 1. Self-learning: lagrer <code>(1A:..., port 1)</code>. Destinasjonen FF:FF:FF:FF:FF:FF er ukjent → <strong>flooding</strong> ut port 2 og port 3.</Step>
            <Step n={3}>H2 og H3 mottar ARP-requesten. Kun H3 (har 192.168.0.3) svarer med unicast ARP-reply: src=3A:..., dst=1A:..., «Jeg har 192.168.0.3».</Step>
            <Step n={4}>Switchen mottar ARP-reply på port 3. Self-learning: lagrer <code>(3A:..., port 3)</code>. Destinasjon 1A:... er kjent (port 1) → unicast til port 1.</Step>
            <Step n={5}>H1 mottar ARP-reply og lagrer <code>192.168.0.3 → 3A:3A:3A:3A:3A:3A</code> i sin ARP-tabell. Nå kan H1 sende datapakken direkte til H3.</Step>

            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-green-200 dark:border-green-800/40 bg-green-50 dark:bg-green-950/20 p-3">
                <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-2">ARP-tabell H1 (etter)</p>
                <table className="text-xs w-full">
                  <thead><tr className="text-[var(--muted)]"><th className="text-left">IP</th><th className="text-left">MAC</th></tr></thead>
                  <tbody>
                    <tr><td className="font-mono">192.168.0.3</td><td className="font-mono">3A:3A:3A:3A:3A:3A</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-lg border border-green-200 dark:border-green-800/40 bg-green-50 dark:bg-green-950/20 p-3">
                <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-2">Switch-tabell S (etter)</p>
                <table className="text-xs w-full">
                  <thead><tr className="text-[var(--muted)]"><th className="text-left">MAC</th><th className="text-left">Port</th></tr></thead>
                  <tbody>
                    <tr><td className="font-mono">1A:1A:1A:1A:1A:1A</td><td>1</td></tr>
                    <tr><td className="font-mono">3A:3A:3A:3A:3A:3A</td><td>3</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">b) CIDR: Hva er adresserommet til 224.192.40.0/22? Angi første og siste adresse.</p>
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 text-xs font-mono space-y-1 mt-2">
              <p className="text-[var(--muted)]">224.192.40.0  = 11100000.11000000.00101000.00000000</p>
              <p className="text-[var(--muted)]">Prefikslengde = 22 → 10 host-biter → 2^10 = 1024 adresser</p>
              <p className="text-green-600 dark:text-green-400">Første: 224.192.40.0 (alle host-biter = 0)</p>
              <p className="text-green-600 dark:text-green-400">Siste:  224.192.43.255 (alle host-biter = 1)</p>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">
              Tips: /22 betyr de 22 første bitene er fastlåst. De 2 siste bitene i 3. oktet (40 = ...101<strong>00</strong>) er host-biter.
              Siste adresse: ...101<strong>11</strong>.11111111 = 43.255.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">c) Forwardingtabell: Hvilken neste-hop brukes for pakkene til 224.192.40.5 og 192.168.1.17?</p>
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 text-xs overflow-x-auto">
              <table className="w-full">
                <thead><tr className="text-[var(--muted)] border-b border-[var(--card-border)]">
                  <th className="text-left pb-1">Destinasjonsprefiks</th>
                  <th className="text-left pb-1">Neste hop</th>
                  <th className="text-left pb-1">Match?</th>
                </tr></thead>
                <tbody className="space-y-1">
                  <tr><td className="font-mono py-0.5">224.192.40.0/22</td><td>R1</td><td className="text-green-600">224.192.40.5 ✓</td></tr>
                  <tr><td className="font-mono py-0.5">192.168.0.0/24</td><td>R2</td><td className="text-[var(--muted)]">—</td></tr>
                  <tr><td className="font-mono py-0.5">192.168.1.0/24</td><td>R3</td><td className="text-green-600">192.168.1.17 ✓</td></tr>
                  <tr><td className="font-mono py-0.5">0.0.0.0/0</td><td>R4 (default)</td><td className="text-[var(--muted)]">fallback</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CollapsibleYear>

      {/* Mai 2024 */}
      <CollapsibleYear year="Mai 2024">
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-bold mb-2">Oppgavebeskrivelse</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Nettverk med verter H1–H5, rutere R1–R3 og switch S1. H1–H3 er på subnett 10.0.1.0/24 (tilknyttet S1),
              H4–H5 er på subnett 10.0.2.0/24 (tilknyttet R2). R1 kobler de to subnettene. Alle tabeller er tomme ved start.
            </p>
            <p className="text-sm font-semibold mb-2">a) H1 (10.0.1.1) sender til H4 (10.0.2.1). Beskriv prosessen.</p>
          </div>
          <div>
            <h3 className="font-bold text-sm text-green-700 dark:text-green-400 mb-2">Løsning</h3>
            <Step n={1}>H1 ser at 10.0.2.1 er på et annet subnett (10.0.2.x ≠ 10.0.1.x). H1 bruker default gateway = R1 sitt interface på 10.0.1.0/24 (f.eks. 10.0.1.254).</Step>
            <Step n={2}>H1 sjekker ARP-tabellen for R1 sin MAC. Tom → sender ARP-request broadcast: «Hvem har 10.0.1.254?»</Step>
            <Step n={3}>S1 mottar ARP-requesten på port 1 (H1). Self-learning: <code>(MAC_H1, port 1)</code>. Flooding til alle andre porter.</Step>
            <Step n={4}>R1 svarer med ARP-reply: sin MAC (unicast til H1). S1 lærer <code>(MAC_R1, portX)</code>.</Step>
            <Step n={5}>H1 sender IP-pakken: src_MAC=MAC_H1, dst_MAC=MAC_R1, src_IP=10.0.1.1, dst_IP=10.0.2.1.</Step>
            <Step n={6}>R1 mottar pakken, slår opp 10.0.2.1 i sin forwardingtabell → neste hop er R2 eller direkte 10.0.2.x. R1 gjør ARP på 10.0.2.0/24 for å finne MAC_H4, videresender.</Step>
            <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-lg p-3 mt-2">
              Nøkkelpoeng: IP-adressene endres ikke fra H1 til H4. Men MAC-adressene endres i hvert hopp — R1 setter sin egen MAC som kilde når den videresender.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">b) DHCP: Hva er prosessen for at H2 får IP-adresse?</p>
            <div className="text-sm text-[var(--muted)] space-y-1">
              <p>1. <strong>DHCP Discover</strong> — H2 broadcaster (255.255.255.255) fra port 68, dst port 67.</p>
              <p>2. <strong>DHCP Offer</strong> — DHCP-server svarer med tilbudt IP, maske, gateway, DNS.</p>
              <p>3. <strong>DHCP Request</strong> — H2 broadcaster at den godtar tilbudet.</p>
              <p>4. <strong>DHCP Ack</strong> — Server bekrefter. H2 konfigurerer seg selv.</p>
            </div>
          </div>
        </div>
      </CollapsibleYear>

      {/* Januar 2024 */}
      <CollapsibleYear year="Januar 2024">
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-bold mb-2">Oppgavebeskrivelse</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Switch S kobler H1 (port 1, IP 172.16.0.1, MAC AA:BB), H2 (port 2, IP 172.16.0.2, MAC CC:DD),
              H3 (port 3, IP 172.16.0.3, MAC EE:FF). Tomme tabeller ved start. H2 sender til H1.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-sm text-green-700 dark:text-green-400 mb-2">Løsning</h3>
            <Step n={1}>H2 vil sende til H1 (172.16.0.1). H2 mangler H1 sin MAC. ARP-request (broadcast) fra H2.</Step>
            <Step n={2}>S mottar på port 2. Lærer <code>(CC:DD, port 2)</code>. Flooder til port 1 og 3.</Step>
            <Step n={3}>H1 svarer med ARP-reply unicast til H2. S mottar på port 1. Lærer <code>(AA:BB, port 1)</code>. Vet at CC:DD er på port 2 → unicast til port 2.</Step>
            <Step n={4}>H2 oppdaterer ARP-tabell: <code>172.16.0.1 → AA:BB</code>. H2 sender datapakken. S videresender unicast port 2→1.</Step>
            <div className="mt-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 text-xs">
              <p className="font-bold mb-1">Sluttilstand</p>
              <p>ARP H2: <code>172.16.0.1 → AA:BB</code></p>
              <p>ARP H1: <code>172.16.0.2 → CC:DD</code> (lært fra ARP-request)</p>
              <p>Switch S: <code>CC:DD→port 2</code>, <code>AA:BB→port 1</code></p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">CIDR-oppgave: 10.128.0.0/9 — antall adresser og siste adresse?</p>
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 text-xs font-mono">
              <p>32 − 9 = 23 host-biter → 2^23 = 8 388 608 adresser</p>
              <p className="text-green-600 dark:text-green-400 mt-1">Første: 10.128.0.0</p>
              <p className="text-green-600 dark:text-green-400">Siste:  10.255.255.255</p>
            </div>
          </div>
        </div>
      </CollapsibleYear>
    </div>
  );
}
