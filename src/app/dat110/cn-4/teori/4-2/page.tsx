"use client";

import Link from "next/link";
import { useState } from "react";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

// Interaktivt IPv4-header-diagram
function IPv4HeaderDiagram() {
  const [selected, setSelected] = useState<string | null>(null);

  const fields: { id: string; label: string; bits: string; color: string; explanation: string; eksamen?: string }[] = [
    { id: "version", label: "Version", bits: "4 bit", color: "bg-purple-200 dark:bg-purple-900", explanation: "IP-versjon. For IPv4 er dette alltid 4 (binært: 0100). For IPv6 er det 6.", eksamen: "Sjelden eksamensspørsmål, men du bør vite at det er 4 for IPv4." },
    { id: "ihl", label: "Header length", bits: "4 bit", color: "bg-purple-200 dark:bg-purple-900", explanation: "Headerlengde i 32-bits ord. Minimum 5 (= 20 byte header uten options). Maks 15 (= 60 byte).", eksamen: "Brukes for å vite hvor data begynner — viktig for fragmentering." },
    { id: "tos", label: "Type of service", bits: "8 bit", color: "bg-green-200 dark:bg-green-900", explanation: "Opprinnelig ment for QoS (prioritering). I praksis brukt til DSCP (Differentiated Services Code Point) for traffikkdifferensiering.", },
    { id: "length", label: "Datagram length", bits: "16 bit", color: "bg-blue-200 dark:bg-blue-900", explanation: "Total lengde på datagrammet i byte (header + data). Maks 65 535 byte. Brukes av mottaker til å vite hvor datagrammet slutter.", eksamen: "Viktig: dette er TOTAL lengde. Header checksum er kun over headeren, ikke dataene." },
    { id: "id", label: "16-bit Identifier", bits: "16 bit", color: "bg-red-200 dark:bg-red-900", explanation: "Identifikasjonsnummer som identifiserer hvilket opprinnelig datagram et fragment tilhører. Alle fragmenter fra samme datagram har SAMME identifier.", eksamen: "EKSAMENSOPPGAVE 4b (jan 2025): Explain the purpose of Identifier, Flags and Fragmentation offset." },
    { id: "flags", label: "Flags", bits: "3 bit", color: "bg-red-200 dark:bg-red-900", explanation: "Tre flaggbits: Bit 0 = reservert (alltid 0). Bit 1 = DF (Don't Fragment) — sett til 1 for å forby fragmentering. Bit 2 = MF (More Fragments) — sett til 1 hvis det finnes flere fragmenter, 0 på siste fragment.", eksamen: "MF=1 betyr 'ikke siste fragment'. MF=0 + offset=0 betyr udelt datagram. MF=0 + offset>0 betyr siste fragment." },
    { id: "offset", label: "13-bit Fragmentation offset", bits: "13 bit", color: "bg-red-200 dark:bg-red-900", explanation: "Angir posisjonen til fragmentets data i det opprinnelige datagrammet, i enheter av 8 byte (64 bit). Første fragment har offset=0. Brukes av mottaker til å sette fragmenter sammen i riktig rekkefølge.", eksamen: "KRITISK: offset er i enheter av 8 byte! Offset=185 betyr at data starter på byte 185×8=1480." },
    { id: "ttl", label: "Time-to-live (TTL)", bits: "8 bit", color: "bg-orange-200 dark:bg-orange-900", explanation: "Maks antall hopp (rutere) datagrammet kan passere. Dekrementeres med 1 i hver ruter. Når TTL=0 kastes pakken og en ICMP Time Exceeded sendes til avsenderen.", eksamen: "EKSAMEN: traceroute-programmet utnytter TTL bevisst — sender pakker med TTL=1,2,3,... for å avdekke hvert hopp." },
    { id: "protocol", label: "Upper-layer protocol", bits: "8 bit", color: "bg-orange-200 dark:bg-orange-900", explanation: "Angir hvilket transportlagsprotokoll datafeltet inneholder: 6=TCP, 17=UDP, 1=ICMP. Dette er 'demultiplekseringsnøkkelen' til transportlaget.", eksamen: "EKSAMENSOPPGAVE 4d (jan 2025): How does a sender host specify whether the datagram contains UDP or TCP? Svar: ved Protocol-feltet." },
    { id: "checksum", label: "Header checksum", bits: "16 bit", color: "bg-yellow-200 dark:bg-yellow-900", explanation: "Sjekksummen beregnes kun over header-feltene (ikke data). Beregnes som 1-komplement av 1-komplement-summen av alle 16-bit ord i headeren. Beregnes på nytt i hver ruter siden TTL endres.", },
    { id: "src", label: "32-bit Source IP address", bits: "32 bit", color: "bg-teal-200 dark:bg-teal-900", explanation: "IP-adressen til avsenderens nettverksgrensesnitt. Rutere bruker IKKE denne til forwarding — kun destinasjonsadressen brukes. Men den brukes til svar og NAT-oversettelse.", eksamen: "EKSAMEN 4c: Forklare formålet med Source IP address — det er for å vite hvem som sendte pakken, slik mottaker vet hvem den skal svare." },
    { id: "dst", label: "32-bit Destination IP address", bits: "32 bit", color: "bg-teal-200 dark:bg-teal-900", explanation: "IP-adressen til mottakeren. Dette er NØKKELFELTET som rutere bruker i forwardingtabellen (longest-prefix match) for å bestemme output-port.", eksamen: "KRITISK: longest-prefix match bruker DETTE feltet — se seksjon om forwardingtabell." },
    { id: "options", label: "Options (if any)", bits: "variabel", color: "bg-gray-200 dark:bg-gray-700", explanation: "Valgfrie felt for bl.a. record route, timestamp, sikkerhet. Sjelden brukt i praksis. Grunnen til at header length-feltet finnes.", },
    { id: "data", label: "Data (payload)", bits: "variabel", color: "bg-gray-300 dark:bg-gray-600", explanation: "Nyttelasten — vanligvis et TCP-segment eller UDP-datagram. Maks 65 535 - 20 = 65 515 byte (uten options).", },
  ];

  const selectedField = fields.find(f => f.id === selected);

  return (
    <div className="max-w-4xl space-y-4">
      <p className="text-sm text-[var(--muted)]">Klikk på et felt for å se detaljer og eksamentips</p>
      <div className="rounded-xl border-2 border-network-400 overflow-hidden">
        <div className="bg-network-100 dark:bg-network-900 p-2 text-center text-xs font-bold text-network-700 dark:text-network-300">
          ← 32 bit (4 byte) per rad →
        </div>
        {/* Rad 1 */}
        <div className="grid grid-cols-4 border-b border-[var(--card-border)]">
          {["version", "ihl", "tos", "length"].map((id) => {
            const f = fields.find(f => f.id === id)!;
            return (
              <div
                key={id}
                onClick={() => setSelected(id === selected ? null : id)}
                className={`${f.color} p-2 text-center text-xs cursor-pointer border-r border-[var(--card-border)] hover:opacity-80 transition-opacity ${selected === id ? "ring-2 ring-network-600" : ""}`}
              >
                <div className="font-bold">{f.label}</div>
                <div className="text-[10px] opacity-70">{f.bits}</div>
              </div>
            );
          })}
        </div>
        {/* Rad 2 */}
        <div className="grid grid-cols-3 border-b border-[var(--card-border)]">
          {["id", "flags", "offset"].map((id, i) => {
            const f = fields.find(f => f.id === id)!;
            const flex = id === "id" ? "col-span-1" : id === "flags" ? "" : "";
            return (
              <div
                key={id}
                onClick={() => setSelected(id === selected ? null : id)}
                className={`${f.color} p-2 text-center text-xs cursor-pointer border-r border-[var(--card-border)] hover:opacity-80 transition-opacity ${selected === id ? "ring-2 ring-network-600" : ""}`}
              >
                <div className="font-bold">{f.label}</div>
                <div className="text-[10px] opacity-70">{f.bits}</div>
              </div>
            );
          })}
        </div>
        {/* Rad 3 */}
        <div className="grid grid-cols-3 border-b border-[var(--card-border)]">
          {["ttl", "protocol", "checksum"].map((id) => {
            const f = fields.find(f => f.id === id)!;
            return (
              <div
                key={id}
                onClick={() => setSelected(id === selected ? null : id)}
                className={`${f.color} p-2 text-center text-xs cursor-pointer border-r border-[var(--card-border)] hover:opacity-80 transition-opacity ${selected === id ? "ring-2 ring-network-600" : ""}`}
              >
                <div className="font-bold">{f.label}</div>
                <div className="text-[10px] opacity-70">{f.bits}</div>
              </div>
            );
          })}
        </div>
        {/* Rad 4 og 5 */}
        {["src", "dst", "options", "data"].map((id) => {
          const f = fields.find(f => f.id === id)!;
          return (
            <div
              key={id}
              onClick={() => setSelected(id === selected ? null : id)}
              className={`${f.color} p-2 text-center text-xs cursor-pointer border-b border-[var(--card-border)] hover:opacity-80 transition-opacity ${selected === id ? "ring-2 ring-network-600" : ""}`}
            >
              <div className="font-bold">{f.label}</div>
              <div className="text-[10px] opacity-70">{f.bits}</div>
            </div>
          );
        })}
      </div>

      {selectedField && (
        <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-5 space-y-2">
          <h4 className="font-bold text-network-700 dark:text-network-300">{selectedField.label} ({selectedField.bits})</h4>
          <p className="text-sm text-[var(--foreground)]">{selectedField.explanation}</p>
          {selectedField.eksamen && (
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-400 rounded-lg p-3">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-300">Eksamenrelevans:</p>
              <p className="text-xs text-[var(--foreground)]">{selectedField.eksamen}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Interaktiv CIDR-kalkulator
function CIDRKalkulator() {
  const [ip, setIp] = useState("192.168.1.100");
  const [prefix, setPrefix] = useState(24);
  const [result, setResult] = useState<null | {
    networkAddr: string; broadcast: string; numHosts: number;
    netBinary: string; mask: string; range: string;
  }>(null);
  const [error, setError] = useState("");

  function ipToBinary(ipStr: string): number[] | null {
    const parts = ipStr.split(".").map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return parts;
  }

  function calculate() {
    const parts = ipToBinary(ip);
    if (!parts) { setError("Ugyldig IP-adresse"); setResult(null); return; }
    if (prefix < 0 || prefix > 32) { setError("Prefiks må være mellom 0 og 32"); setResult(null); return; }
    setError("");

    const ipNum = parts.reduce((acc, octet) => (acc << 8) | octet, 0) >>> 0;
    const maskNum = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const networkNum = (ipNum & maskNum) >>> 0;
    const broadcastNum = (networkNum | (~maskNum >>> 0)) >>> 0;
    const numHosts = prefix >= 31 ? Math.pow(2, 32 - prefix) : Math.pow(2, 32 - prefix) - 2;

    function numToIp(n: number) {
      return [(n >>> 24) & 0xFF, (n >>> 16) & 0xFF, (n >>> 8) & 0xFF, n & 0xFF].join(".");
    }
    function numToBinary(n: number) {
      return [(n >>> 24) & 0xFF, (n >>> 16) & 0xFF, (n >>> 8) & 0xFF, n & 0xFF]
        .map(b => b.toString(2).padStart(8, "0")).join(".");
    }

    setResult({
      networkAddr: numToIp(networkNum),
      broadcast: numToIp(broadcastNum),
      numHosts,
      netBinary: numToBinary(networkNum),
      mask: numToIp(maskNum),
      range: `${numToIp(networkNum + 1)} – ${numToIp(broadcastNum - 1)}`,
    });
  }

  return (
    <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-6 max-w-2xl space-y-4">
      <h3 className="font-bold text-lg text-network-700 dark:text-network-300">Interaktiv CIDR-kalkulator</h3>
      <div className="flex gap-3 flex-wrap items-end">
        <div>
          <label className="block text-xs font-semibold text-[var(--muted)] mb-1">IP-adresse</label>
          <input
            type="text"
            value={ip}
            onChange={e => setIp(e.target.value)}
            className="border border-[var(--card-border)] rounded-lg px-3 py-2 text-sm bg-[var(--bg)] w-40"
            placeholder="192.168.1.100"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--muted)] mb-1">Prefiks (/)</label>
          <input
            type="number"
            value={prefix}
            onChange={e => setPrefix(Number(e.target.value))}
            min={0} max={32}
            className="border border-[var(--card-border)] rounded-lg px-3 py-2 text-sm bg-[var(--bg)] w-20"
          />
        </div>
        <button
          onClick={calculate}
          className="bg-network-600 hover:bg-network-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Beregn
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {result && (
        <div className="space-y-3 border-t border-[var(--card-border)] pt-4">
          <div className="font-mono text-xs bg-[var(--bg)] rounded-lg p-3 space-y-1">
            <div><span className="text-[var(--muted)]">IP binær:         </span><span className="text-network-600 dark:text-network-300">{ip.split(".").map(o => parseInt(o).toString(2).padStart(8,"0")).join(".")}</span></div>
            <div><span className="text-[var(--muted)]">Nettverksadresse: </span><span className="font-bold text-green-600 dark:text-green-400">{result.networkAddr}</span> / <span className="text-network-600">{prefix}</span></div>
            <div><span className="text-[var(--muted)]">Nettmask:         </span>{result.mask}</div>
            <div><span className="text-[var(--muted)]">Broadcast:        </span><span className="font-bold text-red-500">{result.broadcast}</span></div>
            <div><span className="text-[var(--muted)]">Vertsintervall:   </span>{result.range}</div>
            <div><span className="text-[var(--muted)]">Antall verter:    </span><span className="font-bold">{result.numHosts.toLocaleString("no")}</span></div>
          </div>
          <div className="bg-network-50 dark:bg-network-900 rounded-lg p-3">
            <p className="text-xs font-semibold text-network-700 dark:text-network-300 mb-1">Prefiks-biter (nettverksdel) uthevet:</p>
            <p className="font-mono text-xs break-all">
              <span className="bg-network-300 dark:bg-network-700 font-bold px-0.5">{result.netBinary.replace(/\./g, "").substring(0, prefix).replace(/(.{8})/g, "$1.")}</span>
              <span className="text-[var(--muted)]">{result.netBinary.replace(/\./g, "").substring(prefix).replace(/(.{8})/g, "$1.")}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CN4_2Page() {
  const [showFragExample, setShowFragExample] = useState(false);
  const [showLPMSteps, setShowLPMSteps] = useState(false);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.2 IPv4: datagram, adressering og CIDR</span>
      </div>

      <h1 className="text-3xl font-bold">4.2 IPv4: datagram, adressering og CIDR</h1>
      <p className="text-[var(--muted)] max-w-3xl text-lg">
        Dette er det viktigste delkapittelet for eksamen. Oppgave 4 handler om IPv4-headeren, og oppgave 6 handler om CIDR og longest-prefix match. Les nøye.
      </p>

      {/* Eksamenstips */}
      <div className="rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950 p-5 max-w-4xl">
        <p className="text-sm font-bold text-red-700 dark:text-red-300 mb-2">KRITISKE eksamenstemaer fra dette kapittelet</p>
        <ul className="text-sm space-y-1 text-[var(--foreground)]">
          <li><strong>Oppgave 4 (jan 2025):</strong> IPv4-header — alle felt, spesielt Identifier/Flags/Fragmentation offset, TTL, Protocol-feltet</li>
          <li><strong>Oppgave 6c (jan 2025):</strong> CIDR-blokk 224.192.40.0/22 — finne adresseintervall (binær konvertering!)</li>
          <li><strong>Oppgave 6d (jan 2025):</strong> Konvertere 200.193.57.14 til 32-bits mønster</li>
          <li><strong>Oppgave 6e (jan 2025):</strong> Longest-prefix match — finne riktig grensesnitt for 3 IP-adresser</li>
          <li><strong>Oppgave 1d (mai 2024):</strong> Antall IP-adresser i 223.1.1.0/23 CIDR-blokk = 512</li>
        </ul>
      </div>

      {/* Seksjon 1: IPv4-header */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">IPv4-datagrammets header</h2>
        <p className="text-[var(--foreground)] max-w-3xl">
          Et IPv4-datagram består av en header (minimum 20 byte) etterfulgt av data. Headeren inneholder all informasjon rutere trenger for å videresende pakken. Klikk på feltene nedenfor for detaljer:
        </p>
        <IPv4HeaderDiagram />
      </section>

      {/* Seksjon 2: Fragmentering */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Fragmentering</h2>
        <p className="text-[var(--foreground)] max-w-3xl">
          Ulike nettverksteknologier har ulike <strong>MTU (Maximum Transfer Unit)</strong> — den maksimale størrelsen på ett nettverkspakke. Ethernet har MTU=1500 byte. Dersom et IP-datagram er større enn MTU på en lenke, må det <em>fragmenteres</em> av ruteren.
        </p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 max-w-3xl">
          <h3 className="font-bold mb-2">Fragmenteringsregler</h3>
          <ul className="text-sm space-y-1 text-[var(--foreground)] list-disc list-inside">
            <li>Alle fragmenter fra samme datagram har <strong>samme Identifier</strong></li>
            <li>Alle fragmenter unntatt det siste har <strong>MF (More Fragments) = 1</strong></li>
            <li>Siste fragment har MF = 0</li>
            <li><strong>Offset</strong> angis i enheter av 8 byte (merk: IKKE byte!)</li>
            <li>Fragmenter settes bare sammen igjen hos destinasjonsverten (ikke i mellomliggende rutere)</li>
            <li>Datadelen i hvert fragment (unntatt det siste) må være delbart med 8</li>
          </ul>
        </div>

        <button
          onClick={() => setShowFragExample(!showFragExample)}
          className="bg-network-600 hover:bg-network-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          {showFragExample ? "Skjul" : "Vis"} gjennomgått fragmenteringseksempel
        </button>

        {showFragExample && (
          <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-6 max-w-4xl space-y-4">
            <h3 className="font-bold text-xl text-network-700 dark:text-network-300">Eksempel: Fragmentering av 4000-byte datagram</h3>
            <div className="bg-network-50 dark:bg-network-900 rounded-lg p-4">
              <p className="font-semibold mb-2">Gitt:</p>
              <ul className="text-sm space-y-1">
                <li>Opprinnelig datagram: 4000 byte total (20 byte header + 3980 byte data)</li>
                <li>MTU på utgående lenke: 1500 byte</li>
                <li>Identifier: 777</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Steg 1: Maksimal datastørrelse per fragment</p>
              <p className="text-sm text-[var(--foreground)]">
                Maks data per fragment = MTU - header = 1500 - 20 = 1480 byte<br/>
                1480 er delbart med 8? 1480 / 8 = 185. ✓ Ja.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">Steg 2: Antall fragmenter</p>
              <p className="text-sm text-[var(--foreground)]">
                3980 byte data / 1480 byte per fragment = 2.689... → Trenger 3 fragmenter<br/>
                Fragment 1: 1480 byte data, Fragment 2: 1480 byte data, Fragment 3: 3980 - 2×1480 = 1020 byte data
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-network-100 dark:bg-network-900">
                    <th className="border border-[var(--card-border)] p-2">Fragment</th>
                    <th className="border border-[var(--card-border)] p-2">Total lengde</th>
                    <th className="border border-[var(--card-border)] p-2">Identifier</th>
                    <th className="border border-[var(--card-border)] p-2">MF-flagg</th>
                    <th className="border border-[var(--card-border)] p-2">Offset (enheter av 8 byte)</th>
                    <th className="border border-[var(--card-border)] p-2">Forklaring</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[var(--card-border)] p-2 text-center font-bold">1</td>
                    <td className="border border-[var(--card-border)] p-2 text-center">1500</td>
                    <td className="border border-[var(--card-border)] p-2 text-center">777</td>
                    <td className="border border-[var(--card-border)] p-2 text-center font-bold text-red-500">1</td>
                    <td className="border border-[var(--card-border)] p-2 text-center">0</td>
                    <td className="border border-[var(--card-border)] p-2 text-xs">Starter på byte 0. Ikke siste fragment.</td>
                  </tr>
                  <tr className="bg-[var(--card-bg)]">
                    <td className="border border-[var(--card-border)] p-2 text-center font-bold">2</td>
                    <td className="border border-[var(--card-border)] p-2 text-center">1500</td>
                    <td className="border border-[var(--card-border)] p-2 text-center">777</td>
                    <td className="border border-[var(--card-border)] p-2 text-center font-bold text-red-500">1</td>
                    <td className="border border-[var(--card-border)] p-2 text-center">185</td>
                    <td className="border border-[var(--card-border)] p-2 text-xs">185 × 8 = 1480. Data starter på byte 1480.</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--card-border)] p-2 text-center font-bold">3</td>
                    <td className="border border-[var(--card-border)] p-2 text-center">1040</td>
                    <td className="border border-[var(--card-border)] p-2 text-center">777</td>
                    <td className="border border-[var(--card-border)] p-2 text-center font-bold text-green-500">0</td>
                    <td className="border border-[var(--card-border)] p-2 text-center">370</td>
                    <td className="border border-[var(--card-border)] p-2 text-xs">370 × 8 = 2960. MF=0 = siste fragment.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-400 rounded-lg p-4">
              <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-1">Vanlig feil å unngå</p>
              <p className="text-sm">Offset-feltet er i enheter av 8 byte, IKKE byte. Offset for fragment 2 er 1480/8 = 185, ikke 1480!</p>
            </div>
          </div>
        )}
      </section>

      {/* Seksjon 3: IPv4-adressering og CIDR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">IPv4-adressering og CIDR</h2>

        <p className="text-[var(--foreground)] max-w-3xl">
          En IPv4-adresse er 32 bit (4 byte) lang, vanligvis skrevet i punktnotasjon (dotted-decimal): fire oktetter separert av punktum. Hvert grensesnitt (nettverkskort) på en vert eller ruter har sin IP-adresse.
        </p>

        <FormulaBox
          latex="\\text{IP-adresse} = \\underbrace{a.b.c.d}_{\\text{dotted-decimal}} \\rightarrow \\underbrace{32 \\text{ bit binær}}_{\\text{nettverksnivå}}"
          title="IPv4-adresserepresentasjon"
          variant="gold"
          description="Eks: 192.168.1.1 = 11000000.10101000.00000001.00000001"
        />

        <h3 className="text-xl font-bold mt-6">CIDR — Classless Inter-Domain Routing</h3>
        <p className="text-[var(--foreground)] max-w-3xl">
          CIDR erstattet det gamle klassedelingsystemet (A/B/C). I CIDR angis nettverksadressen som <strong>a.b.c.d/x</strong> der x er antallet prefiks-biter (nettverksdelen). De resterende (32-x) bitene er host-delen.
        </p>

        <FormulaBox
          latex="\\underbrace{a.b.c.d}_{\\text{adresse}}/\\underbrace{x}_{\\text{prefiks}} \\quad \\Rightarrow \\quad 2^{32-x} \\text{ adresser}"
          title="CIDR-notasjon"
          variant="gold"
          description="Eksempel: 192.168.1.0/24 har 2^(32-24) = 256 adresser (inkl. nettverksadresse og broadcast)"
        />

        {/* CIDR-kalkulator */}
        <CIDRKalkulator />

        {/* Eksamenseksempel: CIDR-blokk */}
        <div className="rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950 p-6 max-w-4xl space-y-4">
          <h3 className="font-bold text-xl text-red-700 dark:text-red-300">Eksamenseksempel (Jan 2025, Oppgave 6c)</h3>
          <p className="font-semibold">Spørsmål: Hvilket adresseintervall spenner CIDR-blokken 224.192.40.0/22 over?</p>

          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-1">
              <p className="font-bold text-[var(--foreground)]">Steg 1: Konverter til binær</p>
              <p>224 = <span className="text-red-500 font-bold">11100000</span></p>
              <p>192 = <span className="text-red-500 font-bold">11000000</span></p>
              <p>40  = <span className="text-red-500 font-bold">001010</span><span className="text-blue-500">00</span> (prefiks slutter etter 22 bit)</p>
              <p>0   = 00000000</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-1">
              <p className="font-bold text-[var(--foreground)]">Steg 2: Identifiser prefiks (22 biter)</p>
              <p>11100000.11000000.001010<span className="underline">00.00000000</span></p>
              <p className="text-[var(--muted)]">De 22 første bitene er nettverksprefiks. De siste 10 er host-biter.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-2">
              <p className="font-bold text-[var(--foreground)]">Steg 3: Finn laveste og høyeste adresse</p>
              <p className="text-green-600 dark:text-green-400">Laveste: ...00 <span className="text-blue-500">0000000000</span> = 224.192.40.0</p>
              <p className="text-red-500">Høyeste: ...00 <span className="text-blue-500">1111111111</span> = 224.192.40+3=43? </p>
              <p className="text-[var(--muted)] text-xs">Det tredje oktetten: 001010<span className="text-blue-500">11</span> = 00101011 = 43</p>
              <p className="text-red-500">Høyeste: 224.192.43.255</p>
            </div>
            <div className="bg-network-50 dark:bg-network-900 rounded-lg p-4">
              <p className="font-bold text-network-700 dark:text-network-300">Svar: 224.192.40.0 – 224.192.43.255</p>
              <p className="text-sm text-[var(--muted)]">Totalt 2^(32-22) = 2^10 = 1024 adresser</p>
            </div>
          </div>
        </div>

        {/* Eksempel: IP til binær */}
        <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-6 max-w-4xl space-y-4">
          <h3 className="font-bold text-xl text-network-700 dark:text-network-300">Eksamenseksempel (Jan 2025, Oppgave 6d)</h3>
          <p className="font-semibold">Spørsmål: Hvilket 32-bits mønster tilsvarer IP-adressen 200.193.57.14?</p>
          <div className="font-mono text-sm bg-[var(--bg)] rounded-lg p-4 space-y-1">
            <p>200 = 128+64+8  = <span className="text-network-600 font-bold">11001000</span></p>
            <p>193 = 128+64+1  = <span className="text-network-600 font-bold">11000001</span></p>
            <p>57  = 32+16+8+1 = <span className="text-network-600 font-bold">00111001</span></p>
            <p>14  = 8+4+2     = <span className="text-network-600 font-bold">00001110</span></p>
            <p className="mt-2 text-lg font-bold text-network-700 dark:text-network-300">
              11001000 11000001 00111001 00001110
            </p>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Tips: Lær deg 2-potensene: 128, 64, 32, 16, 8, 4, 2, 1. Trekk fra nedover for å konvertere til binær.
          </p>
        </div>
      </section>

      {/* Seksjon 4: Longest-prefix match */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Longest-Prefix Match i forwardingtabellen</h2>

        <p className="text-[var(--foreground)] max-w-3xl">
          Når en ruter mottar et datagram, slår den opp destinasjons-IP-adressen i forwardingtabellen. Siden et nettverk kan ha overlappende prefiks-regler, brukes <strong>longest-prefix match</strong> — den regelen med flest matchende prefiks-biter vinner.
        </p>

        <div className="rounded-xl border border-amber-400 bg-amber-50 dark:bg-amber-950 p-4 max-w-3xl">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-1">Huskeregel</p>
          <p className="text-sm">Tenk på det som GPS-søk: 200.193.57.14 matches av alle regler der IP-en starter med de angitte prefiks-bitene. Den mest spesifikke (lengste) regelen brukes — akkurat som GPS velger "Storgata 5" fremfor bare "Storgata".</p>
        </div>

        <button
          onClick={() => setShowLPMSteps(!showLPMSteps)}
          className="bg-network-600 hover:bg-network-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          {showLPMSteps ? "Skjul" : "Vis"} steg-for-steg longest-prefix match (eksamensoppgave 6e)
        </button>

        {showLPMSteps && (
          <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-6 max-w-5xl space-y-6">
            <h3 className="font-bold text-xl text-network-700 dark:text-network-300">Eksamenseksempel (Jan 2025, Oppgave 6e)</h3>

            <div className="overflow-x-auto">
              <p className="font-semibold mb-2">Forwardingtabell (fra eksamen):</p>
              <table className="text-sm border-collapse w-full">
                <thead>
                  <tr className="bg-network-100 dark:bg-network-900">
                    <th className="border border-[var(--card-border)] p-2">#</th>
                    <th className="border border-[var(--card-border)] p-2 font-mono">Destinasjon (binær prefiks)</th>
                    <th className="border border-[var(--card-border)] p-2">Next-hop interface</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-[var(--card-border)] p-2 text-center">1</td><td className="border border-[var(--card-border)] p-2 font-mono text-xs">11001000 11000001 001010</td><td className="border border-[var(--card-border)] p-2 text-center font-bold">1</td></tr>
                  <tr className="bg-[var(--card-bg)]"><td className="border border-[var(--card-border)] p-2 text-center">2</td><td className="border border-[var(--card-border)] p-2 font-mono text-xs">11001000 11000001 001111</td><td className="border border-[var(--card-border)] p-2 text-center font-bold">2</td></tr>
                  <tr><td className="border border-[var(--card-border)] p-2 text-center">3</td><td className="border border-[var(--card-border)] p-2 font-mono text-xs">00101000 00110101 0010100</td><td className="border border-[var(--card-border)] p-2 text-center font-bold">3</td></tr>
                  <tr className="bg-[var(--card-bg)]"><td className="border border-[var(--card-border)] p-2 text-center">4</td><td className="border border-[var(--card-border)] p-2 font-mono">otherwise</td><td className="border border-[var(--card-border)] p-2 text-center font-bold">4</td></tr>
                </tbody>
              </table>
            </div>

            {/* IP i: 200.193.42.10 */}
            <div className="space-y-2 border border-[var(--card-border)] rounded-lg p-4">
              <h4 className="font-bold text-network-600 dark:text-network-300">i) 200.193.42.10 → interface?</h4>
              <div className="font-mono text-xs bg-[var(--bg)] rounded-lg p-3 space-y-1">
                <p>200 = 11001000, 193 = 11000001, 42 = 00101010, 10 = 00001010</p>
                <p className="font-bold">Binær: 11001000.11000001.00101010.00001010</p>
                <p className="mt-2 text-[var(--muted)]">Sammenlign med regel 1: 11001000 11000001 001010</p>
                <p className="text-[var(--muted)]">                          11001000 11000001 001010<span className="text-red-400">10</span> (adressens biter)</p>
                <p className="text-green-600 dark:text-green-400">✓ Matcher regel 1 på 22 biter!</p>
                <p className="text-[var(--muted)]">Sammenlign med regel 2: 11001000 11000001 001111</p>
                <p className="text-[var(--muted)]">                         11001000 11000001 001010 ← IKKE match (bit 20+ avviker)</p>
                <p className="font-bold text-network-600 dark:text-network-300">Resultat: Interface 1</p>
              </div>
            </div>

            {/* IP ii: 200.193.57.14 */}
            <div className="space-y-2 border border-[var(--card-border)] rounded-lg p-4">
              <h4 className="font-bold text-network-600 dark:text-network-300">ii) 200.193.57.14 → interface?</h4>
              <div className="font-mono text-xs bg-[var(--bg)] rounded-lg p-3 space-y-1">
                <p>200 = 11001000, 193 = 11000001, 57 = 00111001, 14 = 00001110</p>
                <p className="font-bold">Binær: 11001000.11000001.00111001.00001110</p>
                <p className="mt-2 text-[var(--muted)]">Regel 1: 11001000 11000001 001010 → tredje oktett starter med 001010, adresse starter med 001110 → <span className="text-red-500">IKKE match</span></p>
                <p className="text-[var(--muted)]">Regel 2: 11001000 11000001 001111 → adresse starter tredje oktett med 001110 → <span className="text-red-500">IKKE match</span></p>
                <p className="text-[var(--muted)]">Regel 3: 00101000... → første oktett 11001000 ≠ 00101000 → <span className="text-red-500">IKKE match</span></p>
                <p className="font-bold text-network-600 dark:text-network-300">Resultat: Interface 4 (otherwise/default)</p>
              </div>
            </div>

            {/* IP iii: 10.53.40.7 */}
            <div className="space-y-2 border border-[var(--card-border)] rounded-lg p-4">
              <h4 className="font-bold text-network-600 dark:text-network-300">iii) 10.53.40.7 → interface?</h4>
              <div className="font-mono text-xs bg-[var(--bg)] rounded-lg p-3 space-y-1">
                <p>10 = 00001010, 53 = 00110101, 40 = 00101000, 7 = 00000111</p>
                <p className="font-bold">Binær: 00001010.00110101.00101000.00000111</p>
                <p className="mt-2 text-[var(--muted)]">Regel 3: 00101000 00110101 0010100</p>
                <p className="text-[var(--muted)]">Adresse: 00001010 → første oktett matcher IKKE 00101000</p>
                <p className="font-bold text-network-600 dark:text-network-300">Resultat: Interface 4 (otherwise/default)</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Seksjon 5: Private IP-adresser */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Private IP-adresseblokker</h2>
        <p className="text-[var(--foreground)] max-w-3xl">
          RFC 1918 definerer tre adresseblokker reservert for privat bruk (ikke rutbart på det offentlige Internett). Disse brukes bak NAT-rutere.
        </p>
        <div className="overflow-x-auto max-w-3xl">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900">
                <th className="border border-[var(--card-border)] p-2">CIDR-blokk</th>
                <th className="border border-[var(--card-border)] p-2">Adresseintervall</th>
                <th className="border border-[var(--card-border)] p-2">Antall adresser</th>
                <th className="border border-[var(--card-border)] p-2">Bruksområde</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-[var(--card-border)] p-2 font-mono font-bold">10.0.0.0/8</td><td className="border border-[var(--card-border)] p-2 font-mono text-xs">10.0.0.0 – 10.255.255.255</td><td className="border border-[var(--card-border)] p-2 text-center">16 777 216</td><td className="border border-[var(--card-border)] p-2 text-xs">Store bedriftsnettverk</td></tr>
              <tr className="bg-[var(--card-bg)]"><td className="border border-[var(--card-border)] p-2 font-mono font-bold">172.16.0.0/12</td><td className="border border-[var(--card-border)] p-2 font-mono text-xs">172.16.0.0 – 172.31.255.255</td><td className="border border-[var(--card-border)] p-2 text-center">1 048 576</td><td className="border border-[var(--card-border)] p-2 text-xs">Mellomstore nettverk</td></tr>
              <tr><td className="border border-[var(--card-border)] p-2 font-mono font-bold">192.168.0.0/16</td><td className="border border-[var(--card-border)] p-2 font-mono text-xs">192.168.0.0 – 192.168.255.255</td><td className="border border-[var(--card-border)] p-2 text-center">65 536</td><td className="border border-[var(--card-border)] p-2 text-xs">Hjemmerutere (vanligst)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Seksjon 6: DHCP */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">DHCP — Dynamic Host Configuration Protocol</h2>
        <p className="text-[var(--foreground)] max-w-3xl">
          DHCP brukes til automatisk å tildele IP-adresser til verter. DHCP er en applikasjonslagsprotokoll som kjøres over UDP (port 67 server, 68 klient).
        </p>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold mb-2">DHCP-handshake (4-trinn)</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside text-[var(--foreground)]">
              <li><strong>DHCP Discover:</strong> Klient broadcaster (255.255.255.255) for å finne DHCP-server</li>
              <li><strong>DHCP Offer:</strong> Server tilbyr en IP-adresse</li>
              <li><strong>DHCP Request:</strong> Klient aksepterer tilbudet (broadcaster)</li>
              <li><strong>DHCP ACK:</strong> Server bekrefter og klient konfigureres</li>
            </ol>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold mb-2">Hva DHCP tildeler</h3>
            <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
              <li>IP-adresse (med leietid/lease time)</li>
              <li>Nettmask (subnet mask)</li>
              <li>Standard gateway (default router)</li>
              <li>DNS-serveradresser</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950 p-6 max-w-3xl space-y-3">
        <h2 className="text-xl font-bold text-red-700 dark:text-red-300">Vanlige feil å unngå</h2>
        <ul className="space-y-2 text-sm text-[var(--foreground)]">
          <li><strong>Fragmentering-offset:</strong> Husk at offset er i enheter av 8 byte! Offset = datagramposisjon / 8</li>
          <li><strong>CIDR-konvertering:</strong> Du MÅ konvertere til binær for å finne adresseintervall — du kan ikke gjøre det i desimal</li>
          <li><strong>Antall adresser i /x:</strong> Formelen er 2^(32-x) — inkluderer nettverksadresse og broadcast</li>
          <li><strong>Longest-prefix match:</strong> Alltid velg den <em>lengste</em> matchende prefiks, ikke den første match</li>
          <li><strong>Protocol vs Type:</strong> IP-headeren har Protocol-feltet (6=TCP, 17=UDP) — ikke forveksle med Ethernet Type-feltet</li>
        </ul>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-6 max-w-3xl">
        <h2 className="text-xl font-bold text-network-700 dark:text-network-300 mb-3">Hva du MÅ kunne til eksamen</h2>
        <ul className="space-y-2 text-sm text-[var(--foreground)]">
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Alle IPv4-header-felt og hva de brukes til</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Fragmentering: beregne antall fragmenter, offset og MF-flagg</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Konvertere IP-adresse til binær (og tilbake)</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Beregne nettverksadresse, broadcast og adresseintervall fra /x-notasjon</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Utføre longest-prefix match i en forwardingtabell</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Vite de tre private IP-adresseblokker</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare DHCP (de 4 trinnene)</li>
        </ul>
      </section>

      {/* Linker */}
      <div className="flex gap-4 text-sm flex-wrap text-network-600 dark:text-network-300">
        <Link href="/dat110/cn-4/teori/4-3" className="hover:underline">→ NAT: slik brukes private adresser</Link>
        <Link href="/dat110/cn-4/teori/4-5" className="hover:underline">→ Rutealgoritmer (Dijkstra/Bellman-Ford)</Link>
      </div>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-4/teori/4-1" className="hover:text-[var(--accent)] text-sm">
          ← 4.1 Oversikt over nettverkslaget
        </Link>
        <Link href="/dat110/cn-4/teori/4-3" className="hover:text-[var(--accent)] text-sm">
          4.3 NAT →
        </Link>
      </div>
    </div>
  );
}
