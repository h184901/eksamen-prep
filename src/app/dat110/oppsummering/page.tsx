"use client";

import Link from "next/link";
import { useState } from "react";

function RefCard({ title, color, children, defaultOpen = false }: { title: string; color: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const colors: Record<string, string> = {
    network: "border-network-400/40 hover:border-network-400/80",
    blue: "border-blue-400/40 hover:border-blue-400/80",
    amber: "border-amber-400/40 hover:border-amber-400/80",
    red: "border-red-400/40 hover:border-red-400/80",
    green: "border-green-400/40 hover:border-green-400/80",
    purple: "border-purple-400/40 hover:border-purple-400/80",
  };
  return (
    <div className={`rounded-xl border-2 bg-[var(--card)] overflow-hidden ${colors[color] ?? colors.network}`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
        <span className="font-bold text-lg">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          <tr>{headers.map(h => <th key={h} className="px-2 py-1.5 text-left">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
              {row.map((cell, j) => <td key={j} className="px-2 py-1.5">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-2 font-mono text-sm text-amber-800 dark:text-amber-300 my-2 text-center">
      {children}
    </div>
  );
}

export default function OppsummeringPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppsummering</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Oppsummering / Referanseark</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-4">
        Alt du må kunne til eksamen i kompakt form. Åpne seksjonene for detaljer.
      </p>

      <div className="rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-4 mb-8">
        <p className="text-sm text-emerald-900 dark:text-emerald-200">
          En mer detaljert oppsummering er nå tilgjengelig under Eksamensøving.
        </p>
        <Link
          href="/dat110/eksamenoving/oppsummering"
          className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors"
        >
          Gå til detaljert oppsummering
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      <div className="space-y-4">
        {/* 1. Forsinkelser og metrikker */}
        <RefCard title="1. Forsinkelser og metrikker (Oppg 3)" color="network" defaultOpen={true}>
          <Formula>d_trans = L / R &nbsp;&nbsp;|&nbsp;&nbsp; d_prop = d / s &nbsp;&nbsp;|&nbsp;&nbsp; d_nodal = d_proc + d_queue + d_trans + d_prop</Formula>
          <Formula>Trafikkintensitet = La/R &nbsp;&nbsp;|&nbsp;&nbsp; Gjennomstromning = min(R_1, R_2, ..., R_N)</Formula>
          <MiniTable
            headers={["Forsinkelse", "Formel", "Avhenger av"]}
            rows={[
              ["Sending (d_trans)", "L / R", "Pakkelengde og linjekapasitet"],
              ["Forplantning (d_prop)", "d / s", "Fysisk avstand og signalhastighet"],
              ["Behandling (d_proc)", "~us", "Ruterens prosessorkraft"],
              ["Ko (d_queue)", "Variabel", "Trafikkintensitet La/R"],
            ]}
          />
          <p className="text-xs text-[var(--muted)]">Husk: La/R &gt; 1 = pakketap. Ende-til-ende = sum over alle linker.</p>
        </RefCard>

        {/* 2. Applikasjonslaget */}
        <RefCard title="2. HTTP, DNS og applikasjoner (Oppg 3-4)" color="network">
          <MiniTable
            headers={["HTTP-type", "Tid per objekt", "Totalt for N objekter"]}
            rows={[
              ["Ikke-persistent", "2 RTT + L/R", "N x (2 RTT + L/R)"],
              ["Persistent uten pipeline", "RTT + L/R (etter forste)", "RTT + N x (RTT + L/R)"],
              ["Persistent med pipeline", "~1 RTT for alle", "2 RTT + N x L/R"],
            ]}
          />
          <p className="text-xs font-bold mt-2">DNS-hierarki:</p>
          <p className="text-xs text-[var(--muted)]">Root → TLD (.com, .no) → Authoritative → Lokal DNS-server. RR-typer: A (IP), NS (nameserver), CNAME (alias), MX (mail). Bruker UDP.</p>
        </RefCard>

        {/* 3. Transportlaget */}
        <RefCard title="3. UDP vs TCP (Oppg 3-4)" color="network">
          <MiniTable
            headers={["", "UDP", "TCP"]}
            rows={[
              ["Forbindelse", "Connectionless", "3-veis handshake (SYN, SYN-ACK, ACK)"],
              ["Palitelig", "Nei", "Ja (sekvensnr, ACK, retransmisjon)"],
              ["Rekkefolge", "Nei", "Ja"],
              ["Flytkontroll", "Nei", "Ja (sliding window)"],
              ["Header", "8 bytes", "20+ bytes"],
              ["Bruk", "DNS, streaming, VoIP", "HTTP, FTP, SSH, e-post"],
            ]}
          />
          <p className="text-xs text-[var(--muted)]">TCP metningskontroll: AIMD (Additive Increase Multiplicative Decrease). Slow start → congestion avoidance → fast recovery.</p>
        </RefCard>

        {/* 4. Nettverkslaget */}
        <RefCard title="4. IP, CIDR og ruting (Oppg 5-6)" color="blue">
          <Formula>CIDR: IP/prefiks → nettverksdel = forste prefiks bits, hostdel = resten</Formula>
          <p className="text-xs font-bold">Longest Prefix Match:</p>
          <p className="text-xs text-[var(--muted)] mb-2">Konverter IP til binar, match mot forwardingstabell, velg lengste prefiks som matcher.</p>
          <p className="text-xs font-bold">Avstandsvektor (Bellman-Ford):</p>
          <Formula>D_x(y) = min_v(c(x,v) + D_v(y))</Formula>
          <p className="text-xs text-[var(--muted)]">Initialiser: D_x(y) = c(x,y) for naboer, uendelig ellers. Oppdater iterativt til konvergens. Vis ALLE steg pa eksamen!</p>
          <p className="text-xs font-bold mt-2">ARP (Address Resolution Protocol):</p>
          <p className="text-xs text-[var(--muted)]">IP → MAC-adresse. Broadcast ARP-request, unicast ARP-reply. ARP-tabell caches mappinger med TTL.</p>
        </RefCard>

        {/* 5. Linklaget */}
        <RefCard title="5. Switch og ARP (Oppg 5-6)" color="blue">
          <p className="text-xs font-bold">Switch-laringsalgoritme:</p>
          <ol className="text-xs text-[var(--muted)] list-decimal list-inside space-y-1">
            <li>Ramme ankommer pA port X fra MAC-adr A</li>
            <li>Oppdater switch-tabell: A → port X</li>
            <li>Slaa opp destinasjons-MAC i tabellen</li>
            <li>Hvis funnet: send ut pA den porten (unntatt inngangsport)</li>
            <li>Hvis IKKE funnet: flood (send ut pA ALLE porter unntatt inngangsport)</li>
          </ol>
          <p className="text-xs text-[var(--muted)] mt-2">Switch vs Ruter: Switch = lag 2 (MAC-adresser, loerer automatisk). Ruter = lag 3 (IP-adresser, rutingprotokoller).</p>
        </RefCard>

        {/* 6. RPC og kommunikasjon */}
        <RefCard title="6. RPC, MQTT og overlay (Oppg 7-8)" color="purple">
          <p className="text-xs font-bold">RPC-typer:</p>
          <MiniTable
            headers={["Type", "Klient blokkerer?", "Svar?"]}
            rows={[
              ["Synkron", "Ja, venter", "Ja, umiddelbart"],
              ["Asynkron (one-way)", "Nei", "Nei"],
              ["Deferred synchronous", "Nei (fortsetter arbeid)", "Ja, henter senere"],
            ]}
          />
          <p className="text-xs font-bold mt-2">5 RPC-feilklasser:</p>
          <ol className="text-xs text-[var(--muted)] list-decimal list-inside space-y-0.5">
            <li>Klient finner ikke server (server nede, feil versjon)</li>
            <li>Foresporsel tapt (request lost)</li>
            <li>Server krasjer etter mottak (at-least-once / at-most-once)</li>
            <li>Svar tapt (reply lost) — vanskeligst! Idempotente operasjoner hjelper</li>
            <li>Klient krasjer etter sending (orphan-handtering)</li>
          </ol>
          <p className="text-xs font-bold mt-2">MQTT QoS:</p>
          <MiniTable
            headers={["QoS", "Garanti", "Mekanisme"]}
            rows={[
              ["0", "At most once (fire-and-forget)", "Ingen ACK"],
              ["1", "At least once", "PUBACK (kan gi duplikater)"],
              ["2", "Exactly once", "4-stegs handshake (PUBREC/PUBREL/PUBCOMP)"],
            ]}
          />
          <Formula>RDP = overlay-stiforsinkelse / beste fysiske stiforsinkelse (naer 1.0 = effektivt)</Formula>
        </RefCard>

        {/* 7. Koordinering */}
        <RefCard title="7. Klokker og koordinering (Oppg 9)" color="amber">
          <p className="text-xs font-bold">Lamport-klokker:</p>
          <p className="text-xs text-[var(--muted)]">Lokal hendelse: C++ | Send melding: ts = C++ | Motta melding: C = max(C, ts) + 1</p>
          <p className="text-xs text-[var(--muted)]">Gir partiell ordning. a → b betyr C(a) &lt; C(b), men IKKE omvendt!</p>
          <p className="text-xs font-bold mt-2">Vektorklokker:</p>
          <p className="text-xs text-[var(--muted)]">Vektor V[i] for prosess i. Lokal: V[i]++ | Send: V[i]++, legg ved V | Motta: V[j] = max(V[j], mottatt_V[j]) for alle j, V[i]++</p>
          <p className="text-xs text-[var(--muted)]">Gir kausal ordning. Kan detektere samtidige hendelser (ikke mulig med Lamport).</p>
          <p className="text-xs font-bold mt-2">Ledervalg:</p>
          <p className="text-xs text-[var(--muted)]">Bully: hoyeste ID vinner. Ring: send ID rundt, hoyeste vinner. Begge O(n^2) meldinger i verste fall.</p>
        </RefCard>

        {/* 8. Konsistens */}
        <RefCard title="8. Konsistens og replikering (Oppg 9)" color="amber">
          <MiniTable
            headers={["Modell", "Type", "Garanti"]}
            rows={[
              ["Strict", "Data-sentrert", "Enhver lesning gir siste skriving (umulig i DS)"],
              ["Sequential", "Data-sentrert", "Alle ser SAMME rekkefolge (trenger global ordning)"],
              ["Causal", "Data-sentrert", "Kausalt relaterte operasjoner i riktig rekkefolge"],
              ["Monotonic reads", "Klient-sentrert", "Aldri se en eldre verdi etter en nyere"],
              ["Monotonic writes", "Klient-sentrert", "Skrivinger utfores i rekkefolge"],
              ["Read-your-writes", "Klient-sentrert", "Ser alltid egne skrivinger"],
            ]}
          />
          <Formula>Quorum: N_R + N_W &gt; N (sikrer at read og write overlapper)</Formula>
          <p className="text-xs text-[var(--muted)]">Primary-based: en master hAndterer skrivinger. Replikerte write: alle replikaer kan ta skrivinger.</p>
        </RefCard>

        {/* 9. Chord DHT */}
        <RefCard title="9. Chord DHT (Oppg 10, 15%)" color="red" defaultOpen={true}>
          <Formula>FT[i] = succ((n + 2^(i-1)) mod 2^m) &nbsp;&nbsp;for i = 1, 2, ..., m</Formula>
          <Formula>Nokkelansvar: pred(s) &lt; key &le; s (sirkulaert)</Formula>
          <p className="text-xs font-bold">Eksamen-oppskrift:</p>
          <ol className="text-xs text-[var(--muted)] list-decimal list-inside space-y-0.5">
            <li>Beregn fingertabell for ALLE servere: n + 2^(i-1) mod 2^m, deretter succ()</li>
            <li>Nokkelansvar: for hver nokkel, finn serveren der pred(s) &lt; key &le; s</li>
            <li>Oppslag runde for runde: sjekk succ, sok FT baklengs, hopp til hoyeste finger &lt; key</li>
          </ol>
          <p className="text-xs text-[var(--muted)] mt-2">O(log N) hopp forventet. Replikering = feiltoleranse + ytelse.</p>
        </RefCard>

        {/* 10. Feiltoleranse */}
        <RefCard title="10. Feiltoleranse og Byzantine (Oppg 9)" color="red">
          <Formula>Byzantine feiltoleranse: trenger minst 3k + 1 noder for a tAle k feil</Formula>
          <MiniTable
            headers={["Feiltype", "Beskrivelse"]}
            rows={[
              ["Crash failure", "Stopper og responderer aldri mer"],
              ["Omission failure", "Dropper a sende eller motta meldinger"],
              ["Timing failure", "Responderer for sent (kun realtime-systemer)"],
              ["Byzantine failure", "Sender vilkarlige/motstridende svar (verste)"],
            ]}
          />
          <p className="text-xs font-bold mt-2">Gruppe-organisering:</p>
          <p className="text-xs text-[var(--muted)]">Flat: alle like, demokratisk beslutning (1 koordinator per oppgave, valgfri). Hierarkisk: fast leder/koordinator, raskere men single point of failure.</p>
        </RefCard>

        {/* Eksamensjekkliste */}
        <div className="rounded-xl border-2 border-green-400/40 bg-green-50 dark:bg-green-950/20 p-6 mt-6">
          <h2 className="font-bold text-lg text-green-700 dark:text-green-400 mb-3">Eksamensjekkliste</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              "Kan du beregne d_trans, d_prop og total forsinkelse?",
              "Kan du forklare TCP/IP 5-lagsmodellen?",
              "Kan du beregne HTTP-tid (persistent vs ikke-persistent)?",
              "Kan du gjore CIDR/subnetting og longest-prefix match?",
              "Kan du kjore avstandsvektor-algoritmen steg for steg?",
              "Kan du forklare ARP og switch-laringsalgoritmen?",
              "Kan du navngi de 5 RPC-feilklassene?",
              "Kan du forklare MQTT QoS 0, 1 og 2?",
              "Kan du beregne RDP for en overlay-sti?",
              "Kan du forklare Lamport vs vektorklokker?",
              "Kan du skille data-sentrert og klient-sentrert konsistens?",
              "Kan du bygge fingertabell, bestemme nokkelansvar og gjore oppslag?",
              "Kan du forklare Byzantine feiltoleranse (3k+1)?",
              "Kan du forklare arkitekturen fra obligene?",
            ].map((item, i) => (
              <label key={i} className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 accent-green-500" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
