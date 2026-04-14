"use client";

import Link from "next/link";
import { useState } from "react";

function RefCard({
  title,
  color,
  badge,
  oppgLink,
  theoryLabel,
  theoryLink,
  children,
  defaultOpen = false,
}: {
  title: string;
  color: string;
  badge?: string;
  oppgLink?: string;
  theoryLabel?: string;
  theoryLink?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colors: Record<string, string> = {
    network: "border-network-400/40 hover:border-network-400/80",
    blue: "border-blue-400/40 hover:border-blue-400/80",
    amber: "border-amber-400/40 hover:border-amber-400/80",
    red: "border-red-400/40 hover:border-red-400/80",
    green: "border-green-400/40 hover:border-green-400/80",
    purple: "border-purple-400/40 hover:border-purple-400/80",
    emerald: "border-emerald-400/40 hover:border-emerald-400/80",
  };
  const badgeColors: Record<string, string> = {
    network: "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };
  return (
    <div className={`rounded-xl border-2 bg-[var(--card)] overflow-hidden ${colors[color] ?? colors.network}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
      >
        <div className="flex items-center gap-3 flex-wrap">
          {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColors[color] ?? badgeColors.network}`}>
              {badge}
            </span>
          )}
          <span className="font-bold text-base">{title}</span>
          {oppgLink && (
            <Link
              href={oppgLink}
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] underline text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              → Oppgaveside
            </Link>
          )}
          {theoryLink && theoryLabel && (
            <Link
              href={theoryLink}
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] underline text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              → {theoryLabel}
            </Link>
          )}
        </div>
        <svg
          className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function MiniTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-2">
      <table className="w-full text-xs rounded-lg overflow-hidden border border-[var(--card-border)]">
        <thead className="bg-neutral-100 dark:bg-neutral-800">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-2 py-1.5 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-1.5">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Formula({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-2 my-2">
      {label && <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 mb-1">{label}</p>}
      <div className="font-mono text-sm text-amber-800 dark:text-amber-300 text-center">{children}</div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 px-4 py-2 my-2 text-xs text-red-800 dark:text-red-300">
      <span className="font-bold">Husk! </span>
      {children}
    </div>
  );
}

function Step({ items }: { items: string[] }) {
  return (
    <ol className="text-xs text-[var(--muted)] list-decimal list-inside space-y-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}

export default function EksamenovingOppsummeringPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">
          Eksamensøving
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppsummering</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Oppsummering — Komplett referanseark</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-6">
        Alt du må kunne til eksamen organisert etter oppgavetype. Åpne seksjonene for formler,
        tabeller og strategier. Klikk på lenker for å gå til detaljert oppgaveside eller teoriseksjon.
      </p>

      {/* Innholdsfortegnelse */}
      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4 mb-8">
        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">Innhold — klikk for å hoppe:</p>
        <div className="flex flex-wrap gap-2">
          {[
            ["Oppg 1", "Flervalg tips"],
            ["Oppg 2", "Oblig-konsepter"],
            ["Oppg 3", "Forsinkelser"],
            ["Oppg 4", "Protokoller"],
            ["Oppg 5", "Ruting"],
            ["Oppg 6", "ARP og Switch"],
            ["Oppg 7", "DS-teori"],
            ["Oppg 8", "Overlay og multicast"],
            ["Oppg 9", "Konsistens og klokker"],
            ["Oppg 10", "DHT/Chord"],
          ].map(([label, name]) => (
            <span
              key={label}
              className="text-[10px] px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 font-medium"
            >
              {label}: {name}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* ── OPPG 3: FORSINKELSER ── */}
        <RefCard
          title="Forsinkelser og metrikker"
          color="network"
          badge="Oppg 3 — 10%"
          oppgLink="/dat110/eksamenoving/oppg-3"
          theoryLabel="CN 1"
          theoryLink="/dat110/cn-1"
          defaultOpen={true}
        >
          <Formula label="Sendingsforsinkelse">d_trans = L / R &nbsp; (L = bits, R = bps)</Formula>
          <Formula label="Forplantningsforsinkelse">d_prop = d / s &nbsp; (d = meter, s ≈ 2×10⁸ m/s)</Formula>
          <Formula label="Nodalforsinkelse">d_nodal = d_proc + d_queue + d_trans + d_prop</Formula>
          <Formula label="Ende-til-ende (N linker)">d_e2e = N × (d_proc + d_queue + d_trans + d_prop)</Formula>
          <Formula label="Trafikkintensitet">I = La / R &nbsp; (L = bits/pakke, a = pakker/sek)</Formula>
          <Formula label="Gjennomstrømning (flaskehals)">Throughput = min(R₁, R₂, ..., Rₙ)</Formula>
          <Formula label="Store-and-forward forsinkelse (N rutere, P pakker)">d = (N+P-1) × L/R</Formula>

          <p className="text-xs font-bold mt-2">Når bruker du hva?</p>
          <MiniTable
            headers={["Spørsmål", "Formel", "Pass på"]}
            rows={[
              ["Tid å sende én pakke ut på linken", "d_trans = L/R", "L i bits! Bytes × 8"],
              ["Tid signalet bruker på kabelen", "d_prop = d/s", "d i meter, ikke km"],
              ["Total forsinkelse i én ruter/node", "d_nodal (alle fire)", "Inkluder kun de gitte"],
              ["Forsinkelse A→B gjennom N noder", "Σ d_nodal per node", "Summer alle ledd"],
              ["Kapasiteten til en sti (nettverket)", "Throughput = min(R)", "Laveste R bestemmer"],
              ["Vil det bli kø?", "La/R → 1 = kø, >1 = tap", "La/R = 0 betyr tom kø"],
            ]}
          />
          <Tip>Vanligste feil: glemme å konvertere bytes→bits (×8) og km→m (×1000). Sjekk alltid enheter før du regner!</Tip>
        </RefCard>

        {/* ── OPPG 4: PROTOKOLLER ── */}
        <RefCard
          title="Protokoller — TCP, UDP, IP"
          color="network"
          badge="Oppg 4 — 10%"
          oppgLink="/dat110/eksamenoving/oppg-4"
          theoryLabel="CN 3–4"
          theoryLink="/dat110/cn-3"
        >
          <p className="text-xs font-bold">TCP vs UDP</p>
          <MiniTable
            headers={["Egenskap", "TCP", "UDP"]}
            rows={[
              ["Forbindelsestype", "Connection-oriented (3-veis handshake)", "Connectionless"],
              ["Pålitelighet", "Ja — sekvensnr + ACK + retransmisjon", "Nei — best-effort"],
              ["Rekkefølge", "Ja — sekvensiert", "Nei"],
              ["Flytkontroll", "Ja — sliding window (rwnd)", "Nei"],
              ["Metningskontroll", "Ja — AIMD, slow start", "Nei"],
              ["Headerstørrelse", "20+ bytes", "8 bytes (fast)"],
              ["Protokollnummer (IP)", "6", "17"],
              ["Typiske bruksområder", "HTTP/S, FTP, SSH, SMTP", "DNS, VoIP, streaming, DHCP"],
            ]}
          />

          <p className="text-xs font-bold mt-2">TCP 3-veis handshake</p>
          <Step
            items={[
              "Klient sender SYN (seq=x) — ønsker å koble til",
              "Server svarer SYN-ACK (seq=y, ack=x+1) — aksepterer",
              "Klient sender ACK (ack=y+1) — bekrefter. Forbindelsen er etablert.",
            ]}
          />

          <p className="text-xs font-bold mt-2">TCP metningskontroll</p>
          <MiniTable
            headers={["Fase", "Hva skjer", "Trigger"]}
            rows={[
              ["Slow start", "cwnd dobles per RTT (eksponentiell vekst)", "Starter ved cwnd=1 MSS"],
              ["Congestion avoidance", "cwnd += 1 MSS per RTT (lineær vekst)", "cwnd ≥ ssthresh"],
              ["Fast retransmit", "Retransmitter etter 3 duplikat-ACK", "Pakketap (ikke timeout)"],
              ["Fast recovery", "ssthresh = cwnd/2, cwnd = ssthresh + 3", "Etter fast retransmit"],
              ["Timeout", "ssthresh = cwnd/2, cwnd = 1, tilbake til slow start", "Timeout"],
            ]}
          />

          <p className="text-xs font-bold mt-2">IP-headerfelt (viktigste)</p>
          <MiniTable
            headers={["Felt", "Størrelse", "Funksjon"]}
            rows={[
              ["Version", "4 bit", "IPv4 = 4, IPv6 = 6"],
              ["Header length", "4 bit", "Headerlengde i 32-bit ord (min 5 = 20 bytes)"],
              ["TTL", "8 bit", "Time To Live — dekrementeres per hopp, kastes ved 0"],
              ["Protocol", "8 bit", "TCP=6, UDP=17, ICMP=1"],
              ["Source/Dest IP", "32 bit hver", "Avsender- og mottakeradresse"],
              ["Checksum", "16 bit", "Feilsjekk av header (ikke data)"],
              ["Flags + Fragment offset", "3+13 bit", "Fragmentering (DF-bit = ikke fragmenter)"],
            ]}
          />

          <p className="text-xs font-bold mt-2">Go-Back-N vs Selective Repeat</p>
          <MiniTable
            headers={["", "Go-Back-N", "Selective Repeat"]}
            rows={[
              ["Vindusstørrelse sender", "≤ 2^n − 1", "≤ 2^(n-1)"],
              ["Mottaker buffer", "Nei — kaster out-of-order", "Ja — buffrer out-of-order"],
              ["Ved tap av pakke k", "Retransmitter k, k+1, k+2, ...", "Kun pakke k på nytt"],
              ["Effektivitet", "Lavere ved høy feilrate", "Høyere ved høy feilrate"],
              ["Kompleksitet", "Enkel mottaker", "Mer kompleks mottaker"],
            ]}
          />

          <p className="text-xs font-bold mt-2">Viktige portnummer</p>
          <MiniTable
            headers={["Port", "Protokoll", "Lag"]}
            rows={[
              ["20/21", "FTP (data/kontroll)", "Applikasjon"],
              ["22", "SSH", "Applikasjon"],
              ["25", "SMTP", "Applikasjon"],
              ["53", "DNS", "Applikasjon"],
              ["80", "HTTP", "Applikasjon"],
              ["443", "HTTPS", "Applikasjon"],
              ["67/68", "DHCP", "Applikasjon"],
            ]}
          />
          <Tip>Protokollnummer i IP-header: TCP=6, UDP=17, ICMP=1. Dette spørres på eksamen!</Tip>
        </RefCard>

        {/* ── OPPG 5: RUTING ── */}
        <RefCard
          title="Ruting — Bellman-Ford og CIDR"
          color="network"
          badge="Oppg 5 — 10%"
          oppgLink="/dat110/eksamenoving/oppg-5"
          theoryLabel="CN 4–5"
          theoryLink="/dat110/cn-4"
        >
          <Formula label="Bellman-Ford (avstandsvektor)">{"D_x(y) = min_v { c(x,v) + D_v(y) }"}</Formula>
          <p className="text-xs text-[var(--muted)]">
            c(x,v) = kostnad fra x til nabo v. D_v(y) = naboens estimat til y. Ta minimum over alle naboer.
          </p>

          <p className="text-xs font-bold mt-2">DV-algoritme — steg for steg på eksamen</p>
          <Step
            items={[
              "Initialiser: D_x(x)=0, D_x(y)=c(x,y) for alle naboer y, D_x(z)=∞ for ikke-naboer",
              "Tegn tabell: rader = destinasjon, kolonner = via hvilken nabo",
              "Runde 1: for hver node x, beregn D_x(y) = min over alle naboer v av {c(x,v) + D_v(y)}",
              "Fyll inn ny tabell. Merk hvilke verdier som endrer seg.",
              "Gjenta til ingen verdier endrer seg (konvergens)",
              "Vis ALLE mellomsteg — eksamen gir poeng per runde!",
            ]}
          />

          <p className="text-xs font-bold mt-2">Minieksempel (3 noder)</p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border border-[var(--card-border)] p-3 text-xs font-mono">
            <p className="font-bold mb-1">Noder: A, B, C. Kanter: A-B=1, B-C=2, A-C=5</p>
            <p>Init A: D_A(A)=0, D_A(B)=1, D_A(C)=5</p>
            <p>Init B: D_B(A)=1, D_B(B)=0, D_B(C)=2</p>
            <p>Init C: D_C(A)=5, D_C(B)=2, D_C(C)=0</p>
            <p className="mt-1">Runde 1 — A oppdaterer D_A(C):</p>
            <p className="ml-2">via B: c(A,B)+D_B(C) = 1+2 = 3 ← lavere enn 5!</p>
            <p className="ml-2">via C: c(A,C)+D_C(C) = 5+0 = 5</p>
            <p className="ml-2">→ D_A(C) = min(3,5) = 3. Neste hopp: B</p>
          </div>

          <p className="text-xs font-bold mt-2">CIDR og subnetting</p>
          <Formula label="Antall adresser i prefix /x">Antall = 2^(32-x)</Formula>
          <MiniTable
            headers={["Prefiks", "Antall adresser", "Eksempel"]}
            rows={[
              ["/24", "256 (254 brukbare)", "192.168.1.0/24"],
              ["/25", "128 (126 brukbare)", "192.168.1.0/25"],
              ["/28", "16 (14 brukbare)", "10.0.0.0/28 → .0–.15"],
              ["/30", "4 (2 brukbare)", "Typisk punkt-til-punkt link"],
            ]}
          />

          <p className="text-xs font-bold mt-2">Longest Prefix Match — fremgangsmåte</p>
          <Step
            items={[
              "Konverter destinasjons-IP til binær (oktet for oktet)",
              "Sammenlign mot hvert prefiks i forwardingstabellen",
              "Velg prefikset med flest matchende bit (lengste prefiks)",
              "Ved ingen match: bruk default route (0.0.0.0/0)",
            ]}
          />
          <Tip>Longest prefix match betyr MER SPESIFIKK rute vinner. /28 slår alltid /24 om begge matcher!</Tip>
        </RefCard>

        {/* ── OPPG 6: ARP OG SWITCH ── */}
        <RefCard
          title="ARP og Switch"
          color="network"
          badge="Oppg 6 — 10%"
          oppgLink="/dat110/eksamenoving/oppg-6"
          theoryLabel="CN 6"
          theoryLink="/dat110/cn-6"
        >
          <p className="text-xs font-bold">ARP — Address Resolution Protocol (IP → MAC)</p>
          <Step
            items={[
              "Avsender sjekker ARP-tabellen: har jeg MAC for denne IP?",
              "Nei → send ARP Request (broadcast til FF:FF:FF:FF:FF:FF) med spørsmålet 'hvem har IP x?'",
              "Alle noder mottar, kun eieren av IP x svarer",
              "ARP Reply sendes unicast tilbake til avsender med MAC-adressen",
              "Avsender cacher IP→MAC i ARP-tabellen med TTL (~20 min)",
            ]}
          />

          <p className="text-xs font-bold mt-2">ARP mellom subnett — viktig!</p>
          <p className="text-xs text-[var(--muted)]">
            Hvis destinasjons-IP er i et annet subnett, gjøres ARP mot <strong>standard gateway (ruteren)</strong>, ikke mot destinasjonsverter.
            Ruteren håndterer vidersending til neste subnett.
          </p>

          <p className="text-xs font-bold mt-2">Switch self-learning algoritme</p>
          <Step
            items={[
              "Ramme ankommer på port P fra kilde-MAC A",
              "Legg til/oppdater i switch-tabellen: A → port P (med timestamp)",
              "Slå opp destinasjons-MAC D i tabellen",
              "Funnet → videresend kun på den porten (ikke P)",
              "Ikke funnet → flood: send ut på ALLE porter unntatt P (inngangsport)",
              "Broadcast (FF:FF:FF:FF:FF:FF) → alltid flood",
            ]}
          />

          <p className="text-xs font-bold mt-2">CIDR adresseberegning</p>
          <MiniTable
            headers={["Operasjon", "Fremgangsmåte", "Eksempel"]}
            rows={[
              ["Første adresse", "Nettverksadressen (host-del = 0)", "10.0.0.0/28 → 10.0.0.0"],
              ["Siste adresse", "Broadcast (host-del = alle 1)", "10.0.0.0/28 → 10.0.0.15"],
              ["Nettverksmaske", "Prefix 1-er, resten 0", "/28 → 255.255.255.240"],
              ["Antall verter", "2^(32-prefiks) − 2", "2^4 − 2 = 14 brukbare"],
            ]}
          />
          <Tip>Switch = Lag 2 (bruker MAC, lærende). Ruter = Lag 3 (bruker IP, rutingprotokoller). Forveksling gir feil!</Tip>
        </RefCard>

        {/* ── OPPG 7: DS-TEORI ── */}
        <RefCard
          title="DS-teori — Serverdesign og kommunikasjon"
          color="blue"
          badge="Oppg 7 — 5%"
          oppgLink="/dat110/eksamenoving/oppg-7"
          theoryLabel="DS 3–4"
          theoryLink="/dat110/ds-3"
        >
          <p className="text-xs font-bold">Stateful vs Stateless</p>
          <MiniTable
            headers={["", "Stateful", "Stateless"]}
            rows={[
              ["Server lagrer", "Klienttilstand mellom forespørsler", "Ingenting om klienten"],
              ["Ytelse", "Raskere svar (husker kontekst)", "Tregere (klient sender all info)"],
              ["Feiltoleranse", "Dårligere — mister tilstand ved krasj", "Bedre — ingen tilstand å miste"],
              ["Eksempel", "FTP-sesjon, TCP-forbindelse", "HTTP (uten cookies), DNS"],
              ["Skalerbarhet", "Vanskeligere å skalere", "Lettere å skalere horisontalt"],
            ]}
          />

          <p className="text-xs font-bold mt-2">Soft state vs Hard state</p>
          <p className="text-xs text-[var(--muted)]">
            <strong>Hard state</strong>: tilstand lagres permanent til eksplisitt slettet. Krever GC-mekanismer.
            <strong> Soft state</strong>: tilstand utløper automatisk (TTL) — klienten må periodisk fornye.
            Eksempel: ARP-cache er soft state (utløper etter ~20 min).
          </p>

          <p className="text-xs font-bold mt-2">Synkron vs Asynkron kommunikasjon</p>
          <MiniTable
            headers={["", "Synkron", "Asynkron"]}
            rows={[
              ["Klient blokkerer?", "Ja — venter på svar", "Nei — fortsetter arbeid"],
              ["Kobling", "Tett koblet (tight coupling)", "Løst koblet (loose coupling)"],
              ["Kompleksitet", "Enklere å programmere", "Mer kompleks (callbacks/polling)"],
              ["Feilhåndtering", "Umiddelbar feilmelding", "Feilen oppdages asynkront"],
              ["Eksempel", "HTTP GET, standard RPC", "MQTT, message queues, e-post"],
            ]}
          />

          <p className="text-xs font-bold mt-2">Transparens-typer (DS)</p>
          <MiniTable
            headers={["Type", "Hva skjules"]}
            rows={[
              ["Access transparency", "Forskjell mellom lokal og ekstern ressursaksess"],
              ["Location transparency", "Fysisk plassering av ressursen"],
              ["Migration transparency", "At ressursen har blitt flyttet"],
              ["Replication transparency", "At det finnes flere kopier"],
              ["Failure transparency", "Krasj og gjenoppretting i systemet"],
              ["Concurrency transparency", "At flere brukere deler ressursen"],
            ]}
          />

          <p className="text-xs font-bold mt-2">Multithreading-modeller</p>
          <MiniTable
            headers={["Modell", "Beskrivelse", "Bruk"]}
            rows={[
              ["Thread per request", "Ny tråd per innkommende forespørsel", "Enkle servere"],
              ["Thread pool", "Fast antall tråder venter på oppgaver", "Høy ytelse, kontrollert ressursbruk"],
              ["Single-threaded event loop", "Én tråd, event-drevet (non-blocking I/O)", "Node.js, høy konkurranse"],
            ]}
          />
          <Tip>Oppg 7 er korte åpne spørsmål — skriv 2–3 presise setninger. Definer begrepet, gi en konsekvens, gi et eksempel.</Tip>
        </RefCard>

        {/* ── OPPG 8: OVERLAY OG MULTICAST ── */}
        <RefCard
          title="Overlay og multicast"
          color="blue"
          badge="Oppg 8 — 10%"
          oppgLink="/dat110/eksamenoving/oppg-8"
          theoryLabel="DS 4"
          theoryLink="/dat110/ds-4"
        >
          <Formula label="Relative Delay Penalty (RDP)">RDP = overlay-stiforsinkelse / beste fysiske stiforsinkelse</Formula>
          <p className="text-xs text-[var(--muted)]">
            RDP nær 1.0 = overlay er effektiv (lite ekstra forsinkelse). RDP langt over 1.0 = overlay-routing er ineffektiv.
            Beregn: finn korteste overlay-sti, divider på den direkte fysiske forsinkelsen mellom samme noder.
          </p>

          <p className="text-xs font-bold mt-2">Overlay-graf — konstruksjon</p>
          <Step
            items={[
              "Identifiser overlay-noder (de som deltar i overlay-nettverket)",
              "Tegn kanter mellom naboer i overlay (ikke alle par, kun overlay-linker)",
              "Merk kantene med overlay-forsinkelse (kan avvike fra fysisk topologi)",
              "For RDP: finn korteste overlay-sti mellom to noder, sammenlign med direkte fysisk sti",
            ]}
          />

          <p className="text-xs font-bold mt-2">Multicast-trær — sammenligning</p>
          <MiniTable
            headers={["Type", "Beskrivelse", "Fordel", "Ulempe"]}
            rows={[
              ["Shortest path tree", "Hvert tre optimert per kilde", "Minimale kostnader per kilde", "N trær for N kilder"],
              ["Shared tree (Steiner)", "Felles tre for alle kilder", "Ett tre, enklere", "Suboptimalt for enkeltkilder"],
              ["Minimum spanning tree", "Lavest mulig total kantkostnad", "Minimal total kostnad", "Ikke nødvendigvis optimal per kilde"],
            ]}
          />

          <p className="text-xs font-bold mt-2">Strukturerte vs ustrukturerte overlay</p>
          <MiniTable
            headers={["", "Strukturert", "Ustrukturert"]}
            rows={[
              ["Topologi", "Definert (f.eks. ring i Chord)", "Tilfeldig"],
              ["Oppslag", "Garantert O(log N) eller O(1)", "Flooding — ingen garanti"],
              ["Eksempel", "Chord DHT, Pastry, CAN", "Gnutella, BitTorrent (delvis)"],
              ["Inngang/utgang", "Krever rehashing ved join/leave", "Enkel join/leave"],
            ]}
          />
          <Tip>RDP-beregning: oppgaven gir deg overlay-topologien. Finn stier og del. RDP = 1 betyr ingen overhead.</Tip>
        </RefCard>

        {/* ── OPPG 9: KONSISTENS OG KLOKKER ── */}
        <RefCard
          title="Konsistens og klokker"
          color="amber"
          badge="Oppg 9 — 10%"
          oppgLink="/dat110/eksamenoving/oppg-9"
          theoryLabel="DS 5, 7–8"
          theoryLink="/dat110/ds-5"
        >
          <p className="text-xs font-bold">Vektorklokker — tre regler</p>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 px-4 py-3 text-xs space-y-1 my-2">
            <p><strong>1. Lokal hendelse:</strong> V[i]++ (kun prosess i sin komponent økes)</p>
            <p><strong>2. Send melding:</strong> V[i]++, send melding med kopi av V</p>
            <p><strong>3. Motta melding:</strong> V[j] = max(V[j], mottatt_V[j]) for alle j, deretter V[i]++</p>
          </div>

          <p className="text-xs font-bold">Minieksempel — vektorklokker (3 prosesser)</p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border border-[var(--card-border)] p-3 text-xs font-mono space-y-0.5">
            <p>P1 lokal:   V1=[1,0,0]</p>
            <p>P1 sender→P2: V1=[2,0,0], melding har ts=[2,0,0]</p>
            <p>P2 mottar:  max([0,0,0],[2,0,0])=[2,0,0] → V2=[2,1,0]</p>
            <p>P2 lokal:   V2=[2,2,0]</p>
          </div>

          <p className="text-xs font-bold mt-2">Lamport vs Vektorklokker</p>
          <MiniTable
            headers={["", "Lamport", "Vektorklokker"]}
            rows={[
              ["Type", "Enkelt heltall per prosess", "Vektor med ett tall per prosess"],
              ["Rekkefølge", "Partiell ordning", "Kausal ordning (sterkere)"],
              ["Samtidige hendelser", "Kan IKKE detekteres", "Kan detekteres (ingen ≤ relasjon)"],
              ["a→b betyr", "C(a) < C(b)", "V(a) < V(b) (komponentvis)"],
              ["Omvendt?", "Nei! C(a)<C(b) ⟹ ikke a→b", "Ja! V(a)<V(b) ⟺ a→b"],
              ["Overhead", "Minimal (1 tall)", "O(N) per melding"],
            ]}
          />

          <p className="text-xs font-bold mt-2">Happens-before relasjon (→)</p>
          <Step
            items={[
              "a → b hvis a og b er i samme prosess og a skjer før b",
              "a → b hvis a er 'send' og b er tilsvarende 'receive' av samme melding",
              "a → b hvis det finnes c slik at a→c og c→b (transitivitet)",
              "Samtidige hendelser: hverken a→b eller b→a",
            ]}
          />

          <p className="text-xs font-bold mt-2">Konsistensmodell-hierarki (sterkest → svakest)</p>
          <MiniTable
            headers={["Modell", "Type", "Garanti"]}
            rows={[
              ["Strict", "Data-sentrert", "Enhver lesning gir absolutt siste skriving (umulig i praksis)"],
              ["Linearizable", "Data-sentrert", "Operasjoner virker atomiske med global tidsstempel"],
              ["Sequential", "Data-sentrert", "Alle ser SAMME rekkefølge (trenger global ordning)"],
              ["Causal", "Data-sentrert", "Kausalt relaterte skriv er i riktig rekkefølge"],
              ["Eventual", "Data-sentrert", "Vil konvergere til samme verdi til slutt"],
              ["Read-your-writes", "Klient-sentrert", "Ser alltid egne skrivinger"],
              ["Monotonic reads", "Klient-sentrert", "Aldri se eldre verdi etter nyere"],
              ["Monotonic writes", "Klient-sentrert", "Egne skrivinger utføres i orden"],
              ["Writes-follow-reads", "Klient-sentrert", "Skriving etter lesing: respekterer kausalitet"],
            ]}
          />

          <p className="text-xs font-bold mt-2">RPC — 5 feilklasser</p>
          <Step
            items={[
              "Klient finner ikke server (server nede, feil adresse, versjonsfeil)",
              "Forespørsel tapt (request lost — timeout, klient retransmitterer)",
              "Server krasjer etter mottak — ble kallet utført? (at-least-once vs at-most-once semantikk)",
              "Svar tapt (reply lost) — server utførte, klient vet ikke. Idempotente operasjoner hjelper!",
              "Klient krasjer etter sending — orphan-håndtering (extintion, reincarnation, expiration)",
            ]}
          />

          <Formula label="Quorum-betingelse (replikering)">N_R + N_W &gt; N &nbsp; og &nbsp; N_W &gt; N/2</Formula>
          <p className="text-xs text-[var(--muted)]">
            N = totalt antall replikaer, N_R = lesekvorum, N_W = skrivekvorum.
            Første betingelse sikrer at les og skriv overlapper. Andre betingelse sikrer at to skrivinger aldri overlapper.
          </p>
          <Tip>Vektorklokke-oppgaver: vis mellomregning for ALLE hendelser i rekkefølge. Glem du V[i]++ ved receive er vanligste feil!</Tip>
        </RefCard>

        {/* ── OPPG 10: DHT/CHORD ── */}
        <RefCard
          title="DHT/Chord"
          color="red"
          badge="Oppg 10 — 15%"
          oppgLink="/dat110/eksamenoving/oppg-10"
          theoryLabel="DS 6"
          theoryLink="/dat110/ds-6"
          defaultOpen={true}
        >
          <Formula label="Finger table formel">FT_n[i] = succ( (n + 2^(i−1)) mod 2^m )   for i = 1, 2, ..., m</Formula>
          <Formula label="Nøkkelansvar — hvem lagrer nøkkel k?">succ(k) = første aktive node n slik at n ≥ k (sirkulært)</Formula>
          <Formula label="Nøkkelansvar — formelt">pred(n) &lt; k ≤ n   →   node n er ansvarlig for nøkkel k</Formula>

          <p className="text-xs font-bold mt-2">Eksamensprosedyre — Chord fingertabell</p>
          <Step
            items={[
              "Finn m (antall bit i ID-rom): 2^m er ring-størrelsen",
              "For hver aktive node n: beregn n + 2^0, n + 2^1, ..., n + 2^(m-1), alle mod 2^m",
              "For hvert resultat: finn succ() = første aktive node ≥ resultatet (sirkulært)",
              "Fyll inn FT[1], FT[2], ..., FT[m] for alle noder",
              "Nøkkelansvar: for nøkkel k, finn noden n der pred(n) < k ≤ n",
            ]}
          />

          <p className="text-xs font-bold mt-2">Minieksempel — m=3, noder: 0, 1, 3, 6</p>
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/30 border border-[var(--card-border)] p-3 text-xs font-mono space-y-1">
            <p className="font-bold">Ring: 0 → 1 → 3 → 6 → (tilbake til 0). 2^3=8</p>
            <p className="mt-1 font-bold">FT for node 1:</p>
            <p>  FT[1] = succ((1+1) mod 8) = succ(2) = 3</p>
            <p>  FT[2] = succ((1+2) mod 8) = succ(3) = 3</p>
            <p>  FT[3] = succ((1+4) mod 8) = succ(5) = 6</p>
            <p className="mt-1 font-bold">Nøkkelansvar (nøkkel k=2):</p>
            <p>  pred(3)=1 &lt; 2 ≤ 3 → node 3 er ansvarlig</p>
          </div>

          <p className="text-xs font-bold mt-2">Oppslag — steg for steg</p>
          <Step
            items={[
              "Start på søker-node n, leter etter nøkkel k",
              "Hvis k i (pred(n), n]: n er ansvarlig, returner",
              "Ellers: sjekk FT baklengs — finn høyeste FT[i] < k (sirkulært)",
              "Videresend til den noden, gjenta fra steg 2",
              "O(log N) hopp i forventning",
            ]}
          />

          <MiniTable
            headers={["Egenskap", "Verdi/beskrivelse"]}
            rows={[
              ["ID-romstørrelse", "2^m noder mulig"],
              ["Hopp per oppslag", "O(log N) forventet"],
              ["Fingertabell-størrelse", "m oppføringer per node"],
              ["Nøkkelansvar", "pred(n) < k ≤ n"],
              ["Suksessor", "succ(n) = nærmeste aktive node ≥ n (sirkulært)"],
              ["Replikering", "Lagre nøkkel hos succ(k) og k-1 replikaer for feiltoleranse"],
            ]}
          />
          <Tip>Oppg 10 er 15% av eksamen! Beregn FT for ALLE noder, ikke bare én. Vis mellomregning for succ()-beregningen.</Tip>
        </RefCard>

        {/* ── OPPG 1: FLERVALG ── */}
        <RefCard
          title="Flervalg tips og hurtigreferanse"
          color="emerald"
          badge="Oppg 1 — 10%"
          oppgLink="/dat110/eksamenoving/oppg-1"
        >
          <p className="text-xs font-bold">Elimineringsstrategi</p>
          <Step
            items={[
              "Fjern åpenbart feil svar (feil protokollnummer, feil lag osv.)",
              "Se etter absolutte ord ('alltid', 'aldri', 'umulig') — disse er ofte feil",
              "Identifiser nøkkelbegrep i spørsmålet: er det CN eller DS, lag 2 eller lag 3?",
              "Bruk prosess of elimination — to svar som sier det motsatte? Én av dem er riktig.",
            ]}
          />

          <p className="text-xs font-bold mt-2">Hyppige MC-tema</p>
          <MiniTable
            headers={["Tema", "Vanlig spørsmål"]}
            rows={[
              ["Lag-modellen", "Hvilken protokoll hører til hvilke lag?"],
              ["TCP vs UDP", "Hvilken protokoll brukes til DNS, HTTP, VoIP?"],
              ["Protokollnummer", "TCP=6, UDP=17, ICMP=1 i IP-header"],
              ["ARP", "Broadcast eller unicast?"],
              ["Chord", "Hva er O(log N), hvem er ansvarlig for nøkkel k?"],
              ["Konsistens", "Strict vs Sequential vs Causal — hva er sterkest?"],
              ["Vektorklokker", "Kan Lamport detektere samtidige hendelser?"],
              ["RPC feil", "Hvilken feil er vanskeligst? (svar tapt — reply lost)"],
              ["MQTT QoS", "Hvilken QoS gir 'exactly once' semantikk?"],
              ["Byzantine", "Minimum antall noder for å tåle k feil?"],
            ]}
          />

          <p className="text-xs font-bold mt-2">Hurtigfakta</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              ["DNS bruker UDP", "port 53"],
              ["HTTP bruker TCP", "port 80/443"],
              ["TCP protokollnr", "6"],
              ["UDP protokollnr", "17"],
              ["ARP request", "broadcast"],
              ["ARP reply", "unicast"],
              ["Byzantine k feil", "min 3k+1 noder"],
              ["Chord O(?)", "O(log N) hopp"],
              ["Switch lærte", "lag 2 (MAC)"],
              ["Ruter bruker", "lag 3 (IP)"],
              ["MQTT QoS 2", "exactly once"],
              ["Vektorklokker", "kausal ordning"],
            ].map(([fact, detail]) => (
              <div key={fact} className="rounded bg-neutral-50 dark:bg-neutral-800/30 px-2 py-1 border border-[var(--card-border)]">
                <span className="font-bold">{fact}: </span>
                <span className="text-[var(--muted)]">{detail}</span>
              </div>
            ))}
          </div>
        </RefCard>

        {/* ── OPPG 2: OBLIG ── */}
        <RefCard
          title="Oblig-konsepter"
          color="purple"
          badge="Oppg 2 — 10%"
          oppgLink="/dat110/eksamenoving/oppg-2"
        >
          <p className="text-xs font-bold">3-lags arkitektur (Prosjekt 1: RPC)</p>
          <MiniTable
            headers={["Lag", "Ansvar", "Klasse/modul"]}
            rows={[
              ["Connection layer", "TCP-tilkobling, bytes inn/ut (send/receive)", "TCPClient/TCPServer"],
              ["Messaging layer", "Pakker bytes til meldinger med header (størrelse)", "MessageUtils"],
              ["RPC layer", "Marshalling av typer, kall-semantikk, stub/skeleton", "RPCClient/RPCServer"],
            ]}
          />
          <p className="text-xs text-[var(--muted)]">
            Lagene kommuniserer kun nedover (RPC → Messaging → Connection). Hvert lag skjuler detaljer fra laget over (separasjon av bekymringer).
          </p>

          <p className="text-xs font-bold mt-2">Pub/Sub broker (Prosjekt 2: MQTT-lignende)</p>
          <Step
            items={[
              "Broker er midtpunktet — publisher og subscriber snakker ALDRI direkte",
              "Publisher: publish(topic, message) → broker distribuerer til alle abonnenter",
              "Subscriber: subscribe(topic) → broker lagrer subscription",
              "Broker: vedlikeholder subscription-tabell og videresender matchende meldinger",
              "Løst koblet: publisher vet ikke om subscribers eksisterer (og omvendt)",
            ]}
          />

          <p className="text-xs font-bold mt-2">Chord DHT (Prosjekt 3)</p>
          <Step
            items={[
              "Noder danner en ring med ID-er fra 0 til 2^m−1",
              "Nøkler hasher til ring-ID-er og lagres hos ansvarlig node (succ(k))",
              "Fingertabell gir O(log N) oppslag i stedet for O(N) lineært søk",
              "Join: ny node n kontakter en kjent node, henter sin successor, migrerer nøkler",
              "Leave: noden overfører sine nøkler til successor, oppdaterer fingerinfo til naboer",
            ]}
          />

          <p className="text-xs font-bold mt-2">Oblig-arkitektur-spørsmål — hva de typisk spør om</p>
          <MiniTable
            headers={["Spørsmål", "Svar"]}
            rows={[
              ["Hvorfor 3 lag og ikke 1?", "Separasjon av ansvar, gjenbruk, testbarhet, utbyttbarhet"],
              ["Hva gjør messaging-laget?", "Håndterer byte-grenser (stream → discrete messages)"],
              ["Hva er stub/skeleton?", "Stub på klientsiden simulerer lokal metode. Skeleton på server-siden avpakker og kaller"],
              ["Hvorfor broker i pub/sub?", "Løs kobling — publisher og subscriber er uavhengige i tid og rom"],
              ["Hva er DHT vs sentralisert index?", "DHT: ingen single point of failure. Sentralisert: enklere men ikke skalerbart"],
            ]}
          />
          <Tip>Oppg 2 spør om dine egne prosjekter — les din egen kode og arkitektur-rapport igjen. Bruk eksakt terminologi fra prosjektbeskrivelsen!</Tip>
        </RefCard>

        {/* Eksamensjekkliste */}
        <div className="rounded-xl border-2 border-green-400/40 bg-green-50 dark:bg-green-950/20 p-6 mt-6">
          <h2 className="font-bold text-lg text-green-700 dark:text-green-400 mb-3">
            Eksamensjekkliste — er du klar?
          </h2>
          <div className="grid sm:grid-cols-2 gap-2.5 text-sm">
            {[
              ["Oppg 3", "Kan jeg beregne d_trans, d_prop og d_nodal med enheter?"],
              ["Oppg 3", "Vet jeg forskjellen mellom gjennomstrømning og forsinkelse?"],
              ["Oppg 4", "Kan jeg liste TCP 3-veis handshake og metningskontrollfaser?"],
              ["Oppg 4", "Husker jeg protokollnummer TCP=6, UDP=17?"],
              ["Oppg 4", "Kan jeg forklare Go-Back-N vs Selective Repeat?"],
              ["Oppg 5", "Kan jeg kjøre Bellman-Ford steg for steg med tabell?"],
              ["Oppg 5", "Kan jeg beregne antall adresser fra /x prefiks?"],
              ["Oppg 6", "Kan jeg forklare ARP (broadcast request, unicast reply)?"],
              ["Oppg 6", "Kan jeg beskrive switch self-learning med flooding?"],
              ["Oppg 7", "Kan jeg skille stateful/stateless og synkron/asynkron?"],
              ["Oppg 7", "Kan jeg nevne 5 transparens-typer i distribuerte systemer?"],
              ["Oppg 8", "Kan jeg beregne RDP og forklare hva det betyr?"],
              ["Oppg 9", "Kan jeg oppdatere vektorklokker for alle tre regler?"],
              ["Oppg 9", "Kan jeg navngi de 5 RPC-feilklassene?"],
              ["Oppg 9", "Vet jeg forskjellen mellom Lamport og vektorklokker?"],
              ["Oppg 9", "Kan jeg forklare quorum-betingelsen N_R + N_W > N?"],
              ["Oppg 10", "Kan jeg beregne fingertabell for alle noder med formelen?"],
              ["Oppg 10", "Kan jeg bestemme nøkkelansvar (pred(n) < k ≤ n)?"],
              ["Oppg 10", "Kan jeg utføre oppslag steg for steg og telle hopp?"],
              ["Oppg 1–2", "Er jeg klar på oblig-arkitektur og hurtigfakta for MC?"],
            ].map(([label, item], i) => (
              <label key={i} className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 accent-green-500" />
                <span>
                  <span className="text-xs font-bold text-green-700 dark:text-green-400">[{label}] </span>
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Lenker til oppgavesider */}
        <div className="rounded-xl border border-[var(--card-border)] p-5">
          <h2 className="font-bold text-base mb-3">Gå til detaljerte oppgavesider</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <Link
                key={n}
                href={`/dat110/eksamenoving/oppg-${n}`}
                className="flex flex-col items-center rounded-lg border border-[var(--card-border)] hover:border-network-400/60 p-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/20"
              >
                <span className="text-xs text-[var(--muted)] mb-0.5">Oppg</span>
                <span className="text-2xl font-bold text-[var(--accent)]">{n}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
