"use client";

import Link from "next/link";
import { useState } from "react";

// ARP Scenario: H1 (192.168.0.1 / 1A:1B:1C:1D:1E:1F) vil sende til H3 (192.168.0.3 / 3A:3B:3C:3D:3E:3F)
// Switch S har porter: H1→port3, H2→port2, H3→port1
const ARP_STEPS = [
  {
    title: "Startsituasjon",
    desc: "H1 (192.168.0.1) vil sende et IP-datagram til H3 (192.168.0.3). H1 vet IP-adressen til H3, men trenger MAC-adressen. H1 sjekker sin ARP-tabell — den er TOM.",
    arpTable: [] as {ip: string; mac: string}[],
    switchTable: [] as {mac: string; port: number}[],
    highlight: "arp-empty",
    frame: null as null | {src: string; dst: string; type: string; desc: string},
  },
  {
    title: "Steg 1: H1 sender ARP-forespørsel (broadcast)",
    desc: "H1 sender en ARP-forespørsel som kringkastingsramme med destinasjons-MAC FF:FF:FF:FF:FF:FF. Alle på LAN-et mottar denne. Rammen spør: 'Hvem har IP 192.168.0.3?'",
    arpTable: [],
    switchTable: [],
    highlight: "arp-req",
    frame: { src: "1A:1B:...:1F", dst: "FF:FF:FF:FF:FF:FF", type: "ARP Request", desc: "Hvem har 192.168.0.3? Fortell 192.168.0.1" },
  },
  {
    title: "Steg 2: Switch lærer H1s MAC-adresse (self-learning)",
    desc: "Switchen S mottar rammen på port 3 (fra H1). Switchen noter i sin tabell: MAC 1A:1B:1C:1D:1E:1F kom fra port 3. Siden dst=FF:FF:FF:FF:FF:FF, flooder switchen rammen ut på ALLE andre porter (1 og 2).",
    arpTable: [],
    switchTable: [{ mac: "1A:1B:1C:1D:1E:1F", port: 3 }],
    highlight: "switch-learn-1",
    frame: { src: "1A:1B:...:1F", dst: "FF:FF:FF:FF:FF:FF", type: "ARP Request (flood)", desc: "Switchen flooder ut på port 1 og 2" },
  },
  {
    title: "Steg 3: H3 svarer med ARP-svar (unicast)",
    desc: "H3 (192.168.0.3) gjenkjenner sin IP i forespørselen. H3 sender et ARP-svar direkte til H1 (unicast) med sin MAC-adresse 3A:3B:3C:3D:3E:3F. H2 ignorerer forespørselen.",
    arpTable: [],
    switchTable: [{ mac: "1A:1B:1C:1D:1E:1F", port: 3 }],
    highlight: "arp-reply",
    frame: { src: "3A:3B:...:3F", dst: "1A:1B:...:1F", type: "ARP Reply", desc: "Jeg har 192.168.0.3! Min MAC er 3A:3B:3C:3D:3E:3F" },
  },
  {
    title: "Steg 4: Switch lærer H3s MAC (self-learning) + videresending",
    desc: "Switchen mottar ARP-svaret på port 1 (fra H3). Switchen noter: 3A:3B:3C:3D:3E:3F kom fra port 1. Nå vet switchen at dst 1A:1B:... er på port 3. Sender kun til port 3 (ikke flood).",
    arpTable: [],
    switchTable: [
      { mac: "1A:1B:1C:1D:1E:1F", port: 3 },
      { mac: "3A:3B:3C:3D:3E:3F", port: 1 },
    ],
    highlight: "switch-learn-2",
    frame: { src: "3A:3B:...:3F", dst: "1A:1B:...:1F", type: "ARP Reply (unicast)", desc: "Switchen sender kun til port 3 (H1)" },
  },
  {
    title: "Steg 5: H1 oppdaterer ARP-tabellen",
    desc: "H1 mottar ARP-svaret og oppdaterer sin ARP-tabell: IP 192.168.0.3 ↔ MAC 3A:3B:3C:3D:3E:3F. ARP-oppføringen lagres i noen minutter (typisk 20 min).",
    arpTable: [{ ip: "192.168.0.3", mac: "3A:3B:3C:3D:3E:3F" }],
    switchTable: [
      { mac: "1A:1B:1C:1D:1E:1F", port: 3 },
      { mac: "3A:3B:3C:3D:3E:3F", port: 1 },
    ],
    highlight: "arp-update",
    frame: null,
  },
  {
    title: "Steg 6: H1 sender IP-datagram til H3",
    desc: "Nå har H1 MAC-adressen til H3. H1 lager en Ethernet-ramme med dst-MAC = 3A:3B:3C:3D:3E:3F og sender IP-datagrammet. Switchen ser dst-MAC i sin tabell → videresender kun til port 1 (H3).",
    arpTable: [{ ip: "192.168.0.3", mac: "3A:3B:3C:3D:3E:3F" }],
    switchTable: [
      { mac: "1A:1B:1C:1D:1E:1F", port: 3 },
      { mac: "3A:3B:3C:3D:3E:3F", port: 1 },
    ],
    highlight: "send-data",
    frame: { src: "1A:1B:...:1F", dst: "3A:3B:...:3F", type: "Ethernet (IP datagram)", desc: "IP-datagrammet leveres til H3!" },
  },
];

export default function CN6_4Page() {
  const [arpStep, setArpStep] = useState(0);
  const [showFrameDetails, setShowFrameDetails] = useState(false);
  const [switchScenario, setSwitchScenario] = useState(0);

  const step = ARP_STEPS[arpStep];

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.4 Ethernet, MAC, ARP og switch</span>
      </div>

      {/* CRITICAL EXAM BANNER */}
      <div className="bg-red-500/15 border-2 border-red-500/50 rounded-xl p-4">
        <p className="font-bold text-red-600 dark:text-red-400 text-lg mb-1">KRITISK EKSAMENSINNHOLD — Oppgave 6 er alltid fra dette kapittelet!</p>
        <p className="text-sm text-[var(--muted)]">
          Oppgave 6 på alle DAT110-eksamener handler om ARP-tabeller og switch-tabeller. Du MÅ beherske dette perfekt. Les dette kapittelet grundig og øv på eksamenoppgavene.
        </p>
        <div className="mt-2 flex gap-3">
          <Link href="/dat110/eksamenoving/oppg-6" className="text-sm text-red-600 dark:text-red-400 hover:underline font-semibold">→ Gå til Oppgave 6 øving</Link>
          <Link href="/dat110/cn-6/formler" className="text-sm text-[var(--accent)] hover:underline">→ Formler</Link>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">6.4 Ethernet, MAC-adresser, ARP og switch</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Ethernet er det dominerende linklaget-protokollen. MAC-adresser identifiserer noder på linklaget. ARP oversetter IP-adresser til MAC-adresser. Switcher videresender rammer effektivt ved hjelp av self-learning.
        </p>
      </div>

      {/* ===== ETHERNET ===== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Del 1: Ethernet</h2>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-3">
            Ethernet (IEEE 802.3) er den mest brukte LAN-teknologien. Introdusert på 70-tallet, nå standard fra 10 Mbps til 400 Gbps. Ethernet er <strong>upålitelig og connectionless</strong> — ingen handshake, ingen ACK.
          </p>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="border border-[var(--card-border)] rounded-lg p-3">
              <div className="font-semibold mb-1">Connectionless</div>
              <div className="text-[var(--muted)]">Ingen handshake mellom NIC-er før sending.</div>
            </div>
            <div className="border border-[var(--card-border)] rounded-lg p-3">
              <div className="font-semibold mb-1">Upålitelig</div>
              <div className="text-[var(--muted)]">Mottaker-NIC sender ikke ACK/NACK. Tapte rammer rettes av TCP.</div>
            </div>
            <div className="border border-[var(--card-border)] rounded-lg p-3">
              <div className="font-semibold mb-1">CSMA/CD</div>
              <div className="text-[var(--muted)]">Klassisk Ethernet bruker CSMA/CD. Gigabit-Ethernet bruker full-duplex (ingen kollisjon).</div>
            </div>
          </div>
        </div>

        {/* Ethernet frame format */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-4">Ethernet Rammeformat (IEEE 802.3)</h3>

          {/* SVG-diagram av rammeformat */}
          <div className="overflow-x-auto mb-4">
            <div className="min-w-[700px]">
              <div className="flex text-xs font-mono mb-1">
                {[
                  { label: "Preamble", bits: "7 B", color: "bg-gray-500/20" },
                  { label: "SFD", bits: "1 B", color: "bg-gray-500/30" },
                  { label: "Dst MAC", bits: "6 B", color: "bg-red-500/30" },
                  { label: "Src MAC", bits: "6 B", color: "bg-blue-500/30" },
                  { label: "Type/Len", bits: "2 B", color: "bg-purple-500/30" },
                  { label: "Data (payload)", bits: "46–1500 B", color: "bg-green-500/20" },
                  { label: "CRC", bits: "4 B", color: "bg-amber-500/30" },
                ].map((f) => (
                  <div
                    key={f.label}
                    className={`${f.color} border border-[var(--card-border)] flex flex-col items-center justify-center p-1 text-center
                      ${f.label === "Data (payload)" ? "flex-[6]" : "flex-1"}`}
                  >
                    <div className="font-bold">{f.label}</div>
                    <div className="text-[10px] text-[var(--muted)]">{f.bits}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowFrameDetails(!showFrameDetails)}
            className="text-sm text-[var(--accent)] hover:underline mb-3"
          >
            {showFrameDetails ? "▲ Skjul feltforklaring" : "▼ Vis feltforklaring"}
          </button>

          {showFrameDetails && (
            <div className="space-y-3 border-t border-[var(--card-border)] pt-4">
              {[
                {
                  felt: "Preamble (7 bytes)",
                  farge: "border-gray-500/40",
                  desc: "7 bytes med mønsteret 10101010. Synkroniserer klokker mellom sender og mottaker. Inneholder ingen data.",
                },
                {
                  felt: "SFD — Start Frame Delimiter (1 byte)",
                  farge: "border-gray-500/40",
                  desc: "Mønster 10101011 — signaliserer start på rammen. De to avsluttende 1-ere varsler mottakeren.",
                },
                {
                  felt: "Destinasjons-MAC-adresse (6 bytes = 48 bits)",
                  farge: "border-red-500/40",
                  desc: "MAC-adressen til mottakernoden (neste hopp). Kan være unicast (en node), multicast eller broadcast (FF:FF:FF:FF:FF:FF).",
                },
                {
                  felt: "Kilde-MAC-adresse (6 bytes = 48 bits)",
                  farge: "border-blue-500/40",
                  desc: "MAC-adressen til sendenoden. Brukes av switcher til å lære topologien (self-learning).",
                },
                {
                  felt: "Type/Length (2 bytes)",
                  farge: "border-purple-500/40",
                  desc: "Indikerer hvilken nettverkslaget-protokoll datapayloaden inneholder. 0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6. Mottaker-NIC sender datagrammet til riktig protokoll.",
                },
                {
                  felt: "Data / Payload (46–1500 bytes)",
                  farge: "border-green-500/40",
                  desc: "IP-datagrammet (eller ARP-meldingen). Minimum 46 bytes — om datagrammet er kortere, paddes det med nuller (padding). Maks 1500 bytes = Ethernet MTU.",
                },
                {
                  felt: "CRC — Cyclic Redundancy Check (4 bytes = 32 bits)",
                  farge: "border-amber-500/40",
                  desc: "32-bits CRC-sjekk beregnet over alle felt. Mottaker sjekker CRC — om feil, kastes rammen stiltiende.",
                },
              ].map((f) => (
                <div key={f.felt} className={`border rounded-lg p-3 ${f.farge}`}>
                  <div className="font-semibold text-sm mb-1">{f.felt}</div>
                  <div className="text-sm text-[var(--muted)]">{f.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== MAC-ADRESSER ===== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Del 2: MAC-adresser</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <h3 className="font-semibold mb-3">Hva er en MAC-adresse?</h3>
            <ul className="text-sm text-[var(--muted)] space-y-2">
              <li className="flex gap-2"><span className="text-blue-500">•</span>48 bits (6 bytes), skrevet som hex: <code className="bg-[var(--card)] border border-[var(--card-border)] px-1 rounded">1A:2B:3C:4D:5E:6F</code></li>
              <li className="flex gap-2"><span className="text-blue-500">•</span><strong>Flat adressestruktur</strong> — ingen hierarki. Kan ikke bruke til ruting.</li>
              <li className="flex gap-2"><span className="text-blue-500">•</span>Tildeles av produsenten (brent inn i NIC). IEEE tildeler blokker til produsenter.</li>
              <li className="flex gap-2"><span className="text-blue-500">•</span>Portabel: NIC-en har samme MAC uansett hvor den er koblet til.</li>
              <li className="flex gap-2"><span className="text-blue-500">•</span>Broadcast: FF:FF:FF:FF:FF:FF — alle noder mottar rammen.</li>
            </ul>
          </div>

          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <h3 className="font-semibold mb-3">MAC vs IP-adresse</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--card)]">
                    <th className="border border-[var(--card-border)] px-3 py-2 text-left">Egenskap</th>
                    <th className="border border-[var(--card-border)] px-3 py-2 text-left">MAC</th>
                    <th className="border border-[var(--card-border)] px-3 py-2 text-left">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Lag", "Linklaget (2)", "Nettverkslaget (3)"],
                    ["Størrelse", "48 bits", "32 bits (IPv4)"],
                    ["Struktur", "Flat", "Hierarkisk"],
                    ["Tildelt av", "Produsent", "Administrator/DHCP"],
                    ["Permanent", "Ja (normalt)", "Nei (endres med nettverk)"],
                    ["Rekkevidde", "Lokalt nettverk", "Globalt"],
                    ["Ruting", "Nei", "Ja"],
                  ].map((r) => (
                    <tr key={r[0]} className="hover:bg-[var(--card)]">
                      <td className="border border-[var(--card-border)] px-3 py-2 font-semibold">{r[0]}</td>
                      <td className="border border-[var(--card-border)] px-3 py-2 text-blue-600 dark:text-blue-400">{r[1]}</td>
                      <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Analogien: MAC = personnummer, IP = postadresse</p>
          <p className="text-sm text-[var(--muted)]">
            MAC-adressen er som personnummeret ditt — permanent og unikt. IP-adressen er som hjemmeadressen din — endres når du flytter. Internett ruter basert på postadresse (IP), men leveringen på siste strekning skjer ved navn (MAC via ARP).
          </p>
        </div>
      </section>

      {/* ===== ARP ===== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Del 3: ARP — Address Resolution Protocol</h2>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-3">Problemet ARP løser</h3>
          <p className="text-sm text-[var(--muted)]">
            Nettverkslaget bruker IP-adresser. Linklaget bruker MAC-adresser. Når H1 vil sende til H3, vet H1 H3s IP-adresse, men trenger H3s MAC-adresse for å lage Ethernet-rammen. ARP er "telefonkatalogen" som oversetter IP → MAC.
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-3">ARP-tabell</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Hver node har en ARP-tabell (ARP cache) i minnet som lagrer IP → MAC oversettelser. Oppføringer utløper etter typisk 20 minutter (TTL). Noder som nettopp har kommunisert finnes i tabellen — ukjente noder er ikke der.
          </p>
          <div className="overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--card)]">
                  <th className="border border-[var(--card-border)] px-4 py-2">IP-adresse</th>
                  <th className="border border-[var(--card-border)] px-4 py-2">MAC-adresse</th>
                  <th className="border border-[var(--card-border)] px-4 py-2">TTL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["192.168.0.2", "2A:2B:2C:2D:2E:2F", "12 min"],
                  ["192.168.0.3", "3A:3B:3C:3D:3E:3F", "8 min"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="border border-[var(--card-border)] px-4 py-2 font-mono">{r[0]}</td>
                    <td className="border border-[var(--card-border)] px-4 py-2 font-mono">{r[1]}</td>
                    <td className="border border-[var(--card-border)] px-4 py-2 text-[var(--muted)]">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interaktivt ARP-scenario — HOVEDFOKUS */}
        <div className="bg-[var(--card)] border-2 border-red-500/40 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-1">INTERAKTIVT: ARP + Switch-scenario (eksamenstype!)</h3>
          <p className="text-sm text-[var(--muted)] mb-4">
            Nettverk: Switch S med porter 1 (H3), 2 (H2), 3 (H1). H1 (192.168.0.1 / 1A:...) vil sende til H3 (192.168.0.3 / 3A:...). Trykk "Neste" for å se hva som skjer steg for steg.
          </p>

          {/* Nettverksdiagram */}
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-around text-sm font-mono">
              <div className="flex flex-col items-center gap-1">
                {[
                  { id: "H1", ip: "192.168.0.1", mac: "1A:...:1F", highlight: step.highlight === "arp-req" || step.highlight === "send-data" || step.highlight === "arp-update" },
                  { id: "H2", ip: "192.168.0.2", mac: "2A:...:2F", highlight: false },
                  { id: "H3", ip: "192.168.0.3", mac: "3A:...:3F", highlight: step.highlight === "arp-reply" || step.highlight === "send-data" },
                ].map((h) => (
                  <div key={h.id} className={`border-2 rounded-lg px-3 py-2 transition-all ${h.highlight ? "border-blue-500 bg-blue-500/20" : "border-[var(--card-border)]"}`}>
                    <div className="font-bold">{h.id}</div>
                    <div className="text-[10px] text-[var(--muted)]">{h.ip}</div>
                    <div className="text-[10px] text-[var(--muted)]">{h.mac}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center">
                <div className="flex gap-4 text-xs text-[var(--muted)] mb-1">
                  <span>Port 3←H1</span>
                  <span>Port 2←H2</span>
                  <span>Port 1←H3</span>
                </div>
                <div className={`border-2 rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg transition-all ${step.switchTable.length > 0 ? "border-green-500 bg-green-500/20" : "border-[var(--card-border)]"}`}>
                  S
                </div>
              </div>
            </div>

            {/* Ramme som sendes */}
            {step.frame && (
              <div className={`mt-4 border rounded-lg p-3 text-xs font-mono ${
                step.frame.type.includes("ARP Request") ? "bg-amber-500/20 border-amber-500/40" :
                step.frame.type.includes("ARP Reply") ? "bg-green-500/20 border-green-500/40" :
                "bg-blue-500/20 border-blue-500/40"
              }`}>
                <div className="font-bold mb-1">{step.frame.type}</div>
                <div>Src: {step.frame.src} | Dst: {step.frame.dst}</div>
                <div className="text-[var(--muted)] mt-1">{step.frame.desc}</div>
              </div>
            )}
          </div>

          {/* Step content */}
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-4 mb-4">
            <div className="text-xs text-[var(--muted)] mb-1">Steg {arpStep + 1} av {ARP_STEPS.length}</div>
            <div className="font-bold mb-2">{step.title}</div>
            <div className="text-sm text-[var(--muted)]">{step.desc}</div>
          </div>

          {/* Tabeller */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm font-semibold mb-2 text-blue-600 dark:text-blue-400">ARP-tabell (H1)</div>
              <div className="border border-[var(--card-border)] rounded-lg overflow-hidden text-xs font-mono">
                <div className="grid grid-cols-2 bg-[var(--card)] border-b border-[var(--card-border)]">
                  <div className="px-3 py-2 font-semibold">IP-adresse</div>
                  <div className="px-3 py-2 font-semibold">MAC-adresse</div>
                </div>
                {step.arpTable.length === 0 ? (
                  <div className="px-3 py-2 text-[var(--muted)] italic">Tom</div>
                ) : step.arpTable.map((e) => (
                  <div key={e.ip} className="grid grid-cols-2 bg-green-500/10">
                    <div className="px-3 py-2">{e.ip}</div>
                    <div className="px-3 py-2">{e.mac}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">Switch-tabell (S)</div>
              <div className="border border-[var(--card-border)] rounded-lg overflow-hidden text-xs font-mono">
                <div className="grid grid-cols-2 bg-[var(--card)] border-b border-[var(--card-border)]">
                  <div className="px-3 py-2 font-semibold">MAC-adresse</div>
                  <div className="px-3 py-2 font-semibold">Port</div>
                </div>
                {step.switchTable.length === 0 ? (
                  <div className="px-3 py-2 text-[var(--muted)] italic">Tom</div>
                ) : step.switchTable.map((e) => (
                  <div key={e.mac} className="grid grid-cols-2 bg-green-500/10">
                    <div className="px-3 py-2">{e.mac}</div>
                    <div className="px-3 py-2">{e.port}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => setArpStep(Math.max(0, arpStep - 1))}
              disabled={arpStep === 0}
              className="px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm disabled:opacity-40"
            >
              ← Forrige
            </button>
            <button
              onClick={() => setArpStep(Math.min(ARP_STEPS.length - 1, arpStep + 1))}
              disabled={arpStep === ARP_STEPS.length - 1}
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm disabled:opacity-40"
            >
              Neste →
            </button>
            <button onClick={() => setArpStep(0)} className="text-sm text-[var(--muted)] hover:text-[var(--accent)] ml-auto">↺ Restart</button>
          </div>
          <div className="flex gap-1 mt-3">
            {ARP_STEPS.map((_, i) => (
              <button key={i} onClick={() => setArpStep(i)} className={`h-2 flex-1 rounded-full transition-colors ${i === arpStep ? "bg-red-500" : i < arpStep ? "bg-red-500/40" : "bg-[var(--card-border)]"}`} />
            ))}
          </div>
        </div>

        {/* ARP steg-oppsummering */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-3">ARP steg-for-steg oppsummering</h3>
          <ol className="space-y-3 text-sm">
            {[
              { steg: "1", desc: "A vil sende til B. A sjekker ARP-tabellen — finnes B der?" },
              { steg: "2a", desc: "JA → bruk MAC-adressen direkte. Lag Ethernet-ramme og send." },
              { steg: "2b", desc: "NEI → send ARP-forespørsel som broadcast (FF:FF:FF:FF:FF:FF)" },
              { steg: "3", desc: "Alle noder på LAN mottar ARP-forespørselen" },
              { steg: "4", desc: "Bare noden med den etterspurte IP svarer med et ARP-svar (unicast!)" },
              { steg: "5", desc: "A mottar ARP-svaret, oppdaterer ARP-tabellen, sender datagrammet" },
            ].map((s) => (
              <li key={s.steg} className="flex gap-3">
                <span className="bg-red-500/20 border border-red-500/40 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">{s.steg}</span>
                <span className="text-[var(--muted)] pt-1">{s.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== SWITCH ===== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Del 4: Ethernet-switch og Self-Learning</h2>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-3">
            En switch er en linklaget-enhet (Layer 2) som videresender rammer intelligently. Switchen er transparent for noder — de vet ikke om den. Switchen lærer seg topologien automatisk gjennom <strong>self-learning</strong>.
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <h3 className="font-semibold mb-4">Self-Learning — Algoritmen</h3>
          <div className="space-y-3">
            {[
              { steg: "1", title: "Mottar ramme", desc: "Switchen mottar en ramme på port X." },
              { steg: "2", title: "Lær kilde-MAC", desc: "Notat i switch-tabellen: (kilde-MAC → port X). Nå vet switchen at kilde-noden er nåbar via port X." },
              { steg: "3", title: "Sjekk destinasjon", desc: "Slå opp destinasjons-MAC i switch-tabellen." },
              { steg: "4a", title: "Kjent destinasjon", desc: "Destinasjons-MAC finnes i tabellen på port Y. Videresend BARE til port Y (selektiv videresending)." },
              { steg: "4b", title: "Ukjent destinasjon", desc: "Destinasjons-MAC IKKE i tabellen. Flood: videresend til ALLE porter unntatt den rammen kom fra (port X)." },
            ].map((s) => (
              <div key={s.steg} className="flex gap-3">
                <span className="bg-green-500/20 border border-green-500/40 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">{s.steg}</span>
                <div>
                  <div className="font-semibold text-sm">{s.title}</div>
                  <div className="text-sm text-[var(--muted)]">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eksamen 2025 — eksakt scenario */}
        <div className="bg-red-500/10 border-2 border-red-500/40 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-2">EKSAMENSOPPGAVE jan 2025 — Oppgave 6 (eksakt gjennomgang)</h3>
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-4 text-sm mb-4">
            <p className="font-semibold mb-2">Scenario:</p>
            <ul className="text-[var(--muted)] space-y-1">
              <li>H1: IP=192.168.0.1, MAC=1A:1B:1C:1D:1E:1F → port 3</li>
              <li>H2: IP=192.168.0.2, MAC=2A:2B:2C:2D:2E:2F → port 2</li>
              <li>H3: IP=192.168.0.3, MAC=3A:3B:3C:3D:3E:3F → port 1</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-semibold mb-2">a) Hva er innholdet i ARP-tabellen på H1 etter at et IP-datagram er sendt fra H1 til H3?</p>
              <div className="bg-green-500/10 border border-green-500/40 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Fasit:</p>
                <table className="text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-[var(--card-border)] px-4 py-2 bg-[var(--card)]">IP-adresse</th>
                      <th className="border border-[var(--card-border)] px-4 py-2 bg-[var(--card)]">MAC-adresse</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[var(--card-border)] px-4 py-2 font-mono">192.168.0.3</td>
                      <td className="border border-[var(--card-border)] px-4 py-2 font-mono">3A:3B:3C:3D:3E:3F</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-[var(--muted)] mt-2">
                  <strong>Forklaring:</strong> H1 sendte ARP-forespørsel, fikk ARP-svar fra H3. H1 lagrer bare H3s IP→MAC mapping. H1 trenger ikke H2s oppføring (H2 ble aldri kontaktet).
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">b) Hva vil innholdet i switch-tabellen være etter at et IP-datagram er sendt fra H1 til H3?</p>
              <div className="bg-green-500/10 border border-green-500/40 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Fasit:</p>
                <table className="text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-[var(--card-border)] px-4 py-2 bg-[var(--card)]">MAC-adresse</th>
                      <th className="border border-[var(--card-border)] px-4 py-2 bg-[var(--card)]">Port</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["1A:1B:1C:1D:1E:1F", "3"],
                      ["3A:3B:3C:3D:3E:3F", "1"],
                    ].map((r) => (
                      <tr key={r[0]}>
                        <td className="border border-[var(--card-border)] px-4 py-2 font-mono">{r[0]}</td>
                        <td className="border border-[var(--card-border)] px-4 py-2">{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-sm text-[var(--muted)] mt-2 space-y-1">
                  <p><strong>Forklaring steg for steg:</strong></p>
                  <p>1. H1 sender ARP-forespørsel → switch lærer: 1A:...:1F kom på port 3</p>
                  <p>2. Switch flooder (broadcast) → H3 sender ARP-svar → switch lærer: 3A:...:3F kom på port 1</p>
                  <p>3. H1 sender IP-datagram til H3 → switch videresender kun til port 1 (kjent!)</p>
                  <p><strong>Merk:</strong> H2s MAC er IKKE i tabellen — H2 sendte aldri noen ramme!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Eksamen mai 2024 — scenario */}
        <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-2">EKSAMENSOPPGAVE mai 2024 — Oppgave 6b (switch-tabell)</h3>
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-4 text-sm mb-4">
            <p className="font-semibold mb-2">Scenario:</p>
            <p className="text-[var(--muted)]">Nettverk med H1-H5, R1-R3, Switch S1. H6 (MAC: 6A:6B:...) kobles til interface 1 på S1. H6 sender et IP-datagram til H4. Hva er innholdet i switch-tabellen til S1 etter dette?</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/40 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Logikk for å løse slike oppgaver:</p>
            <ol className="text-sm text-[var(--muted)] space-y-1 list-decimal list-inside">
              <li>Finn hvilke enheter er koblet til hvilke porter på switchen</li>
              <li>Spor hvilke rammer som passerer gjennom switchen</li>
              <li>For HVER ramme som passerer: noter kilde-MAC og innkommende port i switch-tabellen</li>
              <li>Floodede rammer (ARP-forespørsler) lærer kilde-MAC, ikke destinasjon</li>
              <li>Bare noder som SENDER noe vil havne i switch-tabellen</li>
            </ol>
          </div>
        </div>
      </section>

      {/* ===== SWITCH VS RUTER ===== */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Del 5: Switch vs Ruter</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="border border-[var(--card-border)] px-4 py-2 text-left">Egenskap</th>
                <th className="border border-[var(--card-border)] px-4 py-2 text-left text-blue-600 dark:text-blue-400">Switch (Layer 2)</th>
                <th className="border border-[var(--card-border)] px-4 py-2 text-left text-green-600 dark:text-green-400">Ruter (Layer 3)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Lag", "Linklaget (2)", "Nettverkslaget (3)"],
                ["Adresse", "MAC (48 bits)", "IP (32 bits)"],
                ["Tabell", "Switch-tabell (MAC → port)", "Videresendingstabell (IP-prefiks → port)"],
                ["Læring", "Self-learning (automatisk)", "Rutingprotokoller (OSPF, BGP)"],
                ["Broadcast", "Flooder broadcast-domene", "Blokkerer broadcast (ny domene)"],
                ["Konfigurering", "Plug-and-play (ingen config)", "Krever IP-konfigurasjon"],
                ["Typisk bruk", "Innen ett LAN", "Mellom ulike nettverk"],
                ["IP-header", "Berøres ikke", "Dekrementerer TTL"],
                ["Ytelse", "Raskt (hardware L2)", "Tregere (software L3)"],
              ].map((r) => (
                <tr key={r[0]} className="hover:bg-[var(--card)]">
                  <td className="border border-[var(--card-border)] px-4 py-2 font-semibold">{r[0]}</td>
                  <td className="border border-[var(--card-border)] px-4 py-2 text-blue-600 dark:text-blue-400">{r[1]}</td>
                  <td className="border border-[var(--card-border)] px-4 py-2 text-green-600 dark:text-green-400">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* VLAN */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">VLAN — Virtual LAN (kort)</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-3">
            VLAN lar deg lage multiple virtuelle LAN på én fysisk switch. Noder i ulike VLAN kan ikke kommunisere direkte (krever ruter). Nyttig for å segregere trafikk (f.eks. IT-avdeling vs økonomi).
          </p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="border border-[var(--card-border)] rounded-lg p-3">
              <div className="font-semibold mb-1">Port-basert VLAN</div>
              <div className="text-[var(--muted)]">Porter tildeles til VLAN-grupper. Rammer er begrenset til porter i samme VLAN.</div>
            </div>
            <div className="border border-[var(--card-border)] rounded-lg p-3">
              <div className="font-semibold mb-1">Trunk-lenker</div>
              <div className="text-[var(--muted)]">Lenker mellom switcher som bærer trafikk fra alle VLAN. Bruker 802.1Q tagging.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vanlige feil */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Vanlige feil studenter gjør</h2>
        <div className="space-y-3">
          {[
            {
              feil: "ARP-spørringen bruker unicast til destinasjonen",
              riktig: "NEI! ARP-forespørselen er en broadcast (dst-MAC = FF:FF:FF:FF:FF:FF). Bare ARP-svaret er unicast.",
            },
            {
              feil: "Switch-tabellen inneholder H2s MAC etter H1→H3-kommunikasjon",
              riktig: "NEI! Bare H1 og H3 sendte rammer (H1 sendte ARP-forespørsel + datagram, H3 sendte ARP-svar). H2 sendte ingenting.",
            },
            {
              feil: "ARP brukes til å finne IP-adressen til en node",
              riktig: "NEI! ARP oversetter IP → MAC. DNS oversetter hostnavn → IP. DHCP tildeler IP. ARP gjør IP → MAC.",
            },
            {
              feil: "Switchen modifiserer IP-headeren når den videresender rammer",
              riktig: "NEI! Switchen opererer på linklaget og ser bare på MAC-adresser. Bare rutere modifiserer (TTL i) IP-headeren.",
            },
            {
              feil: "IP-adressen brukes i ARP-forespørselen som mål-MAC",
              riktig: "NEI! Målet i ARP-forespørselen er broadcast-MAC FF:FF:FF:FF:FF:FF. Målet-IP er det vi søker MAC for.",
            },
          ].map((f) => (
            <div key={f.feil} className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="font-semibold text-red-600 dark:text-red-400 text-sm mb-1">Feil: {f.feil}</p>
              <p className="text-sm text-[var(--muted)]">{f.riktig}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Hva du MÅ kunne til eksamen</h2>
        <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-5">
          <ul className="space-y-2 text-sm">
            {[
              "Ethernet-rammeformat: alle felt og deres funksjon (spesielt Type-feltet, CRC, dst-MAC)",
              "MAC-adresser er 48 bits, flate (ingen hierarki), permanente, tildelt av produsent",
              "ARP-prosessen steg for steg: tom tabell → broadcast request → unicast reply → oppdater tabell",
              "ARP-forespørselen er broadcast, ARP-svaret er unicast (dette er et eksamens-spørsmål!)",
              "Switch self-learning: noter kilde-MAC + inngående port for HVER ramme som passerer",
              "Switch flooder ved ukjent destinasjon, videresender selektivt ved kjent destinasjon",
              "Forskjellen mellom switch (lag 2, MAC) og ruter (lag 3, IP)",
              "Etter H1→H3: switch-tabell har BARE H1 og H3 (ikke H2 — H2 sendte ingenting!)",
            ].map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-red-500 font-bold shrink-0">✓</span>
                <span className="text-[var(--muted)]">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-6/teori/6-3" className="hover:text-[var(--accent)] text-sm">
          ← 6.3 Multiple-access-protokoller
        </Link>
        <Link href="/dat110/cn-6/teori/6-6" className="hover:text-[var(--accent)] text-sm">
          6.6 Data-senter nettverk →
        </Link>
      </div>
    </div>
  );
}
