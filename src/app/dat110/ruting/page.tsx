"use client";

import Link from "next/link";
import { useState } from "react";

function Card({ color, children }: { color: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    purple: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
  };
  return (
    <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>
      {children}
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-3 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 px-4 py-2 font-mono text-sm text-blue-800 dark:text-blue-300 my-2">
      {children}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
      <span className="font-bold">Tips: </span>{children}
    </div>
  );
}

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return !show
    ? <button onClick={() => setShow(true)} className="text-xs px-3 py-1 rounded-full border border-network-400/50 text-network-600 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20 mt-2">Vis svar</button>
    : <div className="rounded-lg bg-network-50 dark:bg-network-900/20 border border-network-200 dark:border-network-800/40 p-3 text-sm mt-2">{children}</div>;
}

function BinaryConvert({ ip }: { ip: string }) {
  const parts = ip.split(".").map(Number);
  const binary = parts.map(p => p.toString(2).padStart(8, "0")).join(".");
  return (
    <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 font-mono text-sm">
      <span className="text-[var(--muted)]">{ip}</span>
      <span className="mx-2 text-[var(--muted)]">=</span>
      <span className="text-blue-700 dark:text-blue-300">{binary}</span>
    </div>
  );
}

export default function RutingPage() {
  const [dvState, setDvState] = useState<"init" | "r1updated" | "r4updated">("init");

  const dvTables: Record<string, Record<string, Record<string, string>>> = {
    init: {
      R1: { R1: "0", R2: "∞", R3: "5", R4: "∞" },
      R2: { R1: "∞", R2: "0", R3: "2", R4: "8" },
      R3: { R1: "5", R2: "2", R3: "0", R4: "1" },
      R4: { R1: "∞", R2: "8", R3: "1", R4: "0" },
    },
    r1updated: {
      R1: { R1: "0", R2: "7", R3: "5", R4: "6" },
      R2: { R1: "∞", R2: "0", R3: "2", R4: "8" },
      R3: { R1: "5", R2: "2", R3: "0", R4: "1" },
      R4: { R1: "∞", R2: "8", R3: "1", R4: "0" },
    },
    r4updated: {
      R1: { R1: "0", R2: "7", R3: "5", R4: "6" },
      R2: { R1: "∞", R2: "0", R3: "2", R4: "8" },
      R3: { R1: "5", R2: "2", R3: "0", R4: "1" },
      R4: { R1: "6", R2: "3", R3: "1", R4: "0" },
    },
  };

  const currentDV = dvTables[dvState];

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span>IP-ruting og adressering</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">IP-ruting og adressering</h1>
      <p className="text-[var(--muted)] mb-8">IPv4-datagram, fragmentering, CIDR, binær konvertering, longest-prefix matching og avstandsvektoralgoritme</p>

      {/* IPv4 Datagram */}
      <h2 className="text-xl font-bold mb-4">1. IPv4-datagram</h2>

      <Card color="gold">
        <h3 className="font-bold mb-3">Viktige felt i IPv4-headeren</h3>
        <div className="space-y-2 text-sm">
          {[
            { felt: "Versjon (4 bits)", forklaring: "IP-versjon (4 eller 6)" },
            { felt: "Header Length (4 bits)", forklaring: "Headerlengde i 32-bit ord (minimum 5 = 20 bytes)" },
            { felt: "TTL (8 bits)", forklaring: "Time To Live — dekrementeres ved hvert hopp, pakke kastes ved 0. Oppdager rutingløkker." },
            { felt: "Upper-layer protocol (8 bits)", forklaring: "Angir transportlags-protokoll: 6=TCP, 17=UDP" },
            { felt: "Source IP (32 bits)", forklaring: "Avsenders IP-adresse" },
            { felt: "Destination IP (32 bits)", forklaring: "Mottakers IP-adresse" },
            { felt: "Identifier (16 bits)", forklaring: "Identifiserer datagrammet — brukes for å samle fragmenter" },
            { felt: "Flags (3 bits)", forklaring: "Bit 0: reserved. Bit 1: Don't Fragment (DF). Bit 2: More Fragments (MF=1 hvis mer kommer, MF=0 = siste fragment)" },
            { felt: "Fragment offset (13 bits)", forklaring: "Posisjon av fragmentets data i originalt datagram (i enheter av 8 bytes)" },
          ].map(({ felt, forklaring }) => (
            <div key={felt} className="flex gap-3">
              <span className="font-bold text-amber-700 dark:text-amber-400 min-w-[180px] text-xs">{felt}</span>
              <span className="text-xs text-[var(--muted)]">{forklaring}</span>
            </div>
          ))}
        </div>
      </Card>

      <Collapsible title="IP-fragmentering — når og hvordan?">
        <div className="text-sm space-y-2">
          <p>Fragmentering skjer når et datagram er større enn linkens <strong>MTU (Maximum Transmission Unit)</strong>.</p>
          <Formula>
            Antall fragmenter = ceil((originalt data - 0) / (MTU - IP header))<br/>
            Fragment offset = (startbyte i data) / 8
          </Formula>
          <p><strong>Eksempel:</strong> 4000-byte datagram over link med MTU=1500 bytes:</p>
          <div className="space-y-1">
            <p>Fragment 1: 1480 bytes data, offset=0, MF=1</p>
            <p>Fragment 2: 1480 bytes data, offset=185 (1480/8), MF=1</p>
            <p>Fragment 3: 1040 bytes data, offset=370 (2960/8), MF=0</p>
          </div>
          <Tip>Reassemblering skjer kun hos mottaker (destinasjon), ikke i rutere! Identifier-feltet holder fragmentene sammen.</Tip>
        </div>
      </Collapsible>

      {/* CIDR og binær */}
      <h2 className="text-xl font-bold mb-4 mt-8">2. IP-adressering og CIDR</h2>

      <Card color="blue">
        <h3 className="font-bold mb-3">CIDR — Classless Inter-Domain Routing</h3>
        <div className="text-sm space-y-2">
          <p>Format: <span className="font-mono">a.b.c.d/x</span> — x angir antall bits i nettverksprefiks.</p>
          <Formula>Antall adresser = 2^(32-x)</Formula>
          <Formula>Adresseintervall: nettverksadresse til nettverksadresse + (2^(32-x) - 1)</Formula>
          <p className="mt-2 font-bold">Eksempel: 200.23.16.0/23</p>
          <BinaryConvert ip="200.23.16.0" />
          <p className="text-xs">De første 23 bitsene er nettverksprefiks. Host-bits: 32-23=9. 2^9=512 adresser.</p>
          <p className="text-xs">Intervall: 200.23.16.0 til 200.23.17.255</p>
        </div>
      </Card>

      <Collapsible title="Interaktiv: Binær konvertering av IP-adresser" defaultOpen={false}>
        <div className="space-y-3 text-sm">
          <h4 className="font-bold">Trinn-for-trinn konvertering</h4>
          <p>Del IP i 4 oktetter (deler på &quot;.&quot;), konverter hver del til 8-bit binær:</p>
          <div className="space-y-1">
            {["192.168.10.1", "10.0.0.1", "200.193.57.14", "172.16.254.1"].map(ip => (
              <BinaryConvert key={ip} ip={ip} />
            ))}
          </div>
          <Tip>Husk: 128=10000000, 192=11000000, 224=11100000, 255=11111111, 0=00000000</Tip>
        </div>
      </Collapsible>

      <Collapsible title="Longest-prefix matching i forwardingstabell">
        <div className="text-sm space-y-3">
          <p>Ruteren sammenligner destinasjons-IP mot alle prefikser. Velger <strong>lengste match</strong>.</p>
          <Card color="blue">
            <h4 className="font-bold text-sm mb-2">Eksempel forwardingstabell:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead><tr className="bg-neutral-100 dark:bg-neutral-800"><th className="px-2 py-1 text-left">Destprefiks</th><th className="px-2 py-1 text-left">Grensesnitt</th></tr></thead>
                <tbody>
                  {[
                    ["11001000 00010111 00010", "0"],
                    ["11001000 00010111 00011000", "1"],
                    ["11001000 00010111 00011", "2"],
                    ["Ellers", "3"],
                  ].map(([prefix, iface]) => (
                    <tr key={prefix} className="border-t border-[var(--card-border)]">
                      <td className="px-2 py-1">{prefix}</td>
                      <td className="px-2 py-1">{iface}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <p>For dest-IP 200.23.18.0 = 11001000 00010111 000<strong>10</strong>010...: Match på prefiks 0 (/21) OG prefiks 2 (/22). Longest = prefiks 2 → Grensesnitt 2.</p>
          <Tip>Konverter alltid destinasjons-IP til binær FØRST. Sammenlign bit-for-bit fra venstre.</Tip>
        </div>
      </Collapsible>

      {/* Avstandsvektor */}
      <h2 className="text-xl font-bold mb-4 mt-8">3. Avstandsvektoralgoritme (Bellman-Ford)</h2>

      <Card color="gold">
        <h3 className="font-bold mb-3">Bellman-Ford-formelen</h3>
        <Formula>D_x(y) = min over alle naboer v { "{" } c(x,v) + D_v(y) { "}" }</Formula>
        <p className="text-sm mt-2">Hver ruter x beregner kostnaden til alle destinasjoner y ved å summere kantkostand til nabo v med naboens estimerte kostnad til y.</p>
      </Card>

      <div className="rounded-xl border-2 border-network-400/40 bg-[var(--card)] p-5 my-4">
        <h3 className="font-bold mb-3">Interaktiv: Avstandsvektor-oppdatering</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Nettverk: R1-R3(5), R2-R3(2), R3-R4(1), R2-R4(8)</p>

        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setDvState("init")}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${dvState === "init" ? "bg-network-500 text-white" : "border border-network-400/40 text-network-600 dark:text-network-400"}`}
          >
            Initial
          </button>
          <button
            onClick={() => setDvState("r1updated")}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${dvState === "r1updated" ? "bg-network-500 text-white" : "border border-network-400/40 text-network-600 dark:text-network-400"}`}
          >
            R1 mottar DR3
          </button>
          <button
            onClick={() => setDvState("r4updated")}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${dvState === "r4updated" ? "bg-network-500 text-white" : "border border-network-400/40 text-network-600 dark:text-network-400"}`}
          >
            R4 konvergert
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--card-border)] rounded-lg overflow-hidden">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left">Ruter</th>
                <th className="px-3 py-2">→R1</th>
                <th className="px-3 py-2">→R2</th>
                <th className="px-3 py-2">→R3</th>
                <th className="px-3 py-2">→R4</th>
              </tr>
            </thead>
            <tbody>
              {["R1", "R2", "R3", "R4"].map((ruter, ri) => (
                <tr key={ruter} className={ri % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-bold text-network-600 dark:text-network-400">{ruter}</td>
                  {["R1", "R2", "R3", "R4"].map((dest) => {
                    const val = currentDV[ruter][dest];
                    const isChanged = dvState === "r1updated" && ruter === "R1" && (dest === "R2" || dest === "R4");
                    const isChanged2 = dvState === "r4updated" && ruter === "R4" && (dest === "R1" || dest === "R2");
                    return (
                      <td
                        key={dest}
                        className={`px-3 py-2 text-center font-mono ${isChanged || isChanged2 ? "bg-network-100 dark:bg-network-900/30 font-bold text-network-700 dark:text-network-400" : ""}`}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {dvState === "r1updated" && (
          <div className="mt-3 text-sm bg-network-50 dark:bg-network-900/20 rounded-lg p-3">
            <p className="font-bold">R1 mottok DR3 = (5,2,0,1) fra R3:</p>
            <p>DR1(R2) = min(∞, 5+2) = <span className="font-bold text-network-600 dark:text-network-400">7</span></p>
            <p>DR1(R4) = min(∞, 5+1) = <span className="font-bold text-network-600 dark:text-network-400">6</span></p>
          </div>
        )}
        {dvState === "r4updated" && (
          <div className="mt-3 text-sm bg-network-50 dark:bg-network-900/20 rounded-lg p-3">
            <p className="font-bold">R4 konvergert etter å motta alle vektorer:</p>
            <p>DR4(R1) = min(∞, 8+7, 1+5) = <span className="font-bold text-network-600 dark:text-network-400">6</span></p>
            <p>DR4(R2) = min(8, 8+0, 1+2) = <span className="font-bold text-network-600 dark:text-network-400">3</span></p>
          </div>
        )}
      </div>

      <Collapsible title="Steg-for-steg fremgangsmåte for eksamen">
        <div className="text-sm space-y-2">
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Tegn nettverk</strong> med alle rutere og kantkostnader</li>
            <li><strong>Initialiser distansevektorer:</strong> D_x(x)=0, D_x(direkte nabo)=kantkostnad, D_x(andre)=∞</li>
            <li><strong>Send vektorer til naboer</strong></li>
            <li><strong>Oppdater med Bellman-Ford:</strong> For hvert par (x,y): D_x(y) = min_v{"{c(x,v) + D_v(y)}"}</li>
            <li><strong>Skriv ny vektor</strong> — marker endringer</li>
            <li><strong>Gjenta</strong> til alle vektorer er stabile (konvergert)</li>
          </ol>
          <Tip>Vis ALLTID min(verdi1, verdi2, ...) = resultat for hvert destinasjonspar. Skriv ut all mellomregning.</Tip>
        </div>
      </Collapsible>

      {/* ARP og Switch */}
      <h2 className="text-xl font-bold mb-4 mt-8">4. ARP og Switch-tabell</h2>

      <Collapsible title="ARP — Address Resolution Protocol" defaultOpen={false}>
        <div className="text-sm space-y-2">
          <p><strong>Formål:</strong> Mapper IP-adresse til MAC-adresse (innenfor samme link)</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Sender broadcaster ARP-forespørsel: &quot;Hvem har IP x.x.x.x?&quot;</li>
            <li>Kun den med riktig IP svarer med sin MAC</li>
            <li>Sender cacher IP→MAC i sin ARP-tabell</li>
          </ol>
          <Tip>ARP-tabell på en vert inneholder kun IP→MAC-par for adresser den faktisk har kommunisert med.</Tip>
        </div>
      </Collapsible>

      <Collapsible title="Switch-læringsalgoritmen">
        <div className="text-sm space-y-2">
          <p>En switch lærer automatisk hvilke MAC-adresser som er tilgjengelige på hvilken port:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Ramme ankommer på port P med kilde-MAC M</li>
            <li>Switch lagrer: {"{M → P}"} i switch-tabellen</li>
            <li>Hvis destinasjons-MAC er ukjent: <strong>flood</strong> (send på alle porter unntatt innkommende)</li>
            <li>Hvis destinasjons-MAC er kjent: <strong>forward</strong> kun på korrekt port</li>
          </ol>
          <Tip>Switch-tabellen ALDRI inneholder informasjon fra bare én side — den lærer fra BEGGE retninger (kilde ved mottak, IKKE fra destinasjon).</Tip>
        </div>
      </Collapsible>

      {/* Øvingsoppgaver */}
      <h2 className="text-xl font-bold mb-4 mt-8">5. Øvingsoppgaver</h2>

      <div className="space-y-4">
        {[
          {
            q: "a) Konverter 172.16.40.0/22 til binær og finn adresseintervallet.\nb) Hvor mange adresser er i subnett 10.0.0.0/28?",
            a: (
              <div>
                <p><strong>a)</strong> 10101100.00010000.00101000.00000000 — /22 betyr 22 faste bits.</p>
                <p>Host-bits: 32-22=10. 2^10=1024 adresser. Intervall: 172.16.40.0 til 172.16.43.255</p>
                <p className="mt-1"><strong>b)</strong> /28 → host-bits=4. 2^4=16 adresser.</p>
              </div>
            ),
          },
          {
            q: "Nettverk med rutere: R1-R2(4), R1-R3(1), R2-R4(3), R3-R4(2). Initialiser distansevektorer og oppdater R1 etter å motta DR3=(5,∞,0,2).",
            a: (
              <div>
                <p><strong>Initial DR1:</strong> [R1=0, R2=4, R3=1, R4=∞]</p>
                <p className="mt-1"><strong>Etter DR3=(5,∞,0,2) (kun nabo R3, kostnad c(R1,R3)=1):</strong></p>
                <p>DR1(R2) = min(4, 1+∞) = 4 (uendret)</p>
                <p>DR1(R4) = min(∞, 1+2) = 3 (ny!)</p>
                <p className="font-bold mt-1">Ny DR1 = [0, 4, 1, 3]</p>
              </div>
            ),
          },
          {
            q: "Et datagram på 5000 bytes skal sendes over en link med MTU = 1500 bytes. IPv4-header er 20 bytes. Vis fragmenteringsresultatet (offset, størrelse, MF-flagg for hvert fragment).",
            a: (
              <div>
                <p>Nyttebytes per fragment: 1500-20=1480 bytes. 5000-20=4980 bytes data.</p>
                <p>Fragment 1: 1480 bytes, offset=0, MF=1</p>
                <p>Fragment 2: 1480 bytes, offset=185 (1480/8), MF=1</p>
                <p>Fragment 3: 1480 bytes, offset=370 (2960/8), MF=1</p>
                <p>Fragment 4: 540 bytes, offset=555 (4440/8), MF=0</p>
                <p className="text-xs text-[var(--muted)] mt-1">4 fragmenter totalt. ceil(4980/1480) = 4</p>
              </div>
            ),
          },
        ].map(({ q, a }, i) => (
          <div key={i} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold text-sm mb-2">Oppgave {i + 1}</p>
            <p className="text-sm text-[var(--muted)] mb-3 whitespace-pre-line">{q}</p>
            <Answer>{a}</Answer>
          </div>
        ))}
      </div>
    </div>
  );
}
