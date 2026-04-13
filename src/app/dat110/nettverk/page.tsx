"use client";

import Link from "next/link";
import { useState } from "react";

function Card({ color, children }: { color: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
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

export default function NettverkPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span>Nettverkslag og protokoller</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Nettverkslag og protokoller</h1>
      <p className="text-[var(--muted)] mb-8">TCP/IP-modellen, forsinkelsesberegning, HTTP, DNS, UDP, TCP og gjennomstrømning</p>

      {/* Teorisammendrag */}
      <h2 className="text-xl font-bold mb-4">1. TCP/IP-lagmodellen</h2>

      <Card color="gold">
        <h3 className="font-bold mb-2">De fem lagene — hva gjør hvert lag?</h3>
        <div className="space-y-2 text-sm">
          {[
            { lag: "5. Applikasjonslaget", eks: "HTTP, DNS, FTP, SMTP", formål: "Applikasjonsprotokoll mellom prosesser" },
            { lag: "4. Transportlaget", eks: "TCP, UDP", formål: "Prosess-til-prosess levering med portnummer" },
            { lag: "3. Nettverkslaget", eks: "IP, ICMP", formål: "Rutevalg og hopp-for-hopp levering med IP-adresser" },
            { lag: "2. Linklaget", eks: "Ethernet, WiFi", formål: "Rammeoverføring over én link med MAC-adresser" },
            { lag: "1. Fysisk lag", eks: "Fiber, kobberkabel, radio", formål: "Bitoverføring på det fysiske medium" },
          ].map(({ lag, eks, formål }) => (
            <div key={lag} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200 dark:border-amber-800/40 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-amber-700 dark:text-amber-400">{lag}</span>
                <span className="text-xs text-[var(--muted)]">{eks}</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">{formål}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card color="blue">
        <h3 className="font-bold mb-2">Hvem gjør hva?</h3>
        <div className="text-sm space-y-1">
          <p><strong>Vert (host):</strong> Implementerer alle 5 lag</p>
          <p><strong>Ruter:</strong> Implementerer kun lag 1, 2 og 3 (fysisk, link, nettverk)</p>
          <p><strong>Switch:</strong> Implementerer kun lag 1 og 2 (fysisk og link)</p>
        </div>
      </Card>

      <h2 className="text-xl font-bold mb-4 mt-8">2. Nettverksforsinkelse — KRITISK for eksamen</h2>

      <Card color="gold">
        <h3 className="font-bold mb-3">Fire typer forsinkelse</h3>
        <div className="space-y-2">
          {[
            { navn: "Behandlingsforsinkelse (d_proc)", formel: "Mikrosekundsorden — sjekke bit-feil, bestemme utgangslink", farge: "text-red-700 dark:text-red-400" },
            { navn: "Køforsinkelse (d_queue)", formel: "Variabel — avhenger av trafikk. La/R nær 1 → høy forsinkelse", farge: "text-orange-700 dark:text-orange-400" },
            { navn: "Sendingsforsinkelse (d_trans)", formel: "d_trans = L / R     (L = pakkelengde bits, R = linjekapasitet bits/s)", farge: "text-blue-700 dark:text-blue-400" },
            { navn: "Forplantningsforsinkelse (d_prop)", formel: "d_prop = d / s     (d = avstand, s = hastighet i medium ≈ 3×10⁸ m/s)", farge: "text-network-700 dark:text-network-400" },
          ].map(({ navn, formel, farge }) => (
            <div key={navn} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200 dark:border-amber-800/40 p-3">
              <p className={`font-bold text-sm ${farge}`}>{navn}</p>
              <p className="font-mono text-xs mt-1">{formel}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 p-3">
          <p className="font-bold text-sm">Total nodalforsinkelse:</p>
          <p className="font-mono text-sm mt-1">d_nodal = d_proc + d_queue + d_trans + d_prop</p>
        </div>
      </Card>

      <Collapsible title="Eksempel: Beregn alle forsinkelser (eksamensstil)" defaultOpen={true}>
        <div className="text-sm space-y-2">
          <p className="font-bold">Gitt: R = 10⁶ bits/s, d = 10⁴ m, s = 5×10⁸ m/s, L = 10³ bits, d_proc = 0.002s, d_queue = 0.01s</p>
          <div className="space-y-1">
            <Formula>d_trans = L/R = 10³/10⁶ = 0.001 s = 1 ms</Formula>
            <Formula>d_prop = d/s = 10⁴/(5×10⁸) = 0.00002 s = 0.02 ms</Formula>
            <Formula>d_nodal = 0.002 + 0.01 + 0.001 + 0.00002 = 0.01302 s ≈ 13 ms</Formula>
            <Formula>Ende-til-ende (3 noder): 3 × 0.01302 = 0.03906 s</Formula>
          </div>
          <Tip>Skriv alltid enhet (s, ms). Sensor forventer korrekt antall desimaler.</Tip>
        </div>
      </Collapsible>

      <Collapsible title="Trafikkintensitet og flaskehals">
        <Formula>Trafikkintensitet = La/R     (L = pakkestørrelse bits, a = ankomstrate pkt/s, R = kapasitet)</Formula>
        <div className="text-sm space-y-1">
          <p>La/R ≈ 0: Lav forsinkelse</p>
          <p>La/R → 1: Forsinkelse vokser raskt</p>
          <p>La/R &gt; 1: Pakker kastes — køen vokser uten grense</p>
        </div>
        <Formula>Flaskehals = linken med lavest kapasitet på hele stien</Formula>
        <Formula>Gjennomstrømning = min(R_klient, R_flaskehals, R_server)</Formula>
      </Collapsible>

      <h2 className="text-xl font-bold mb-4 mt-8">3. Applikasjonslaget</h2>

      <Collapsible title="HTTP — HyperText Transfer Protocol">
        <div className="text-sm space-y-2">
          <Card color="blue">
            <h4 className="font-bold mb-1">Ikke-persistent vs persistent HTTP</h4>
            <div className="space-y-1">
              <p><strong>Ikke-persistent:</strong> Én TCP-tilkobling per objekt. 2 RTT overhead per objekt + overf.tid</p>
              <p><strong>Persistent uten pipeline:</strong> Gjenbruk tilkobling. 1 RTT per objekt.</p>
              <p><strong>Persistent med pipeline (standard):</strong> Send alle forespørsler umiddelbart. ≈ 1 RTT for alle objekter.</p>
            </div>
          </Card>
          <p><strong>Stateless:</strong> HTTP-server lagrer ingen tilstand om klienter. Cookies brukes for tilstand.</p>
          <p><strong>Metoder:</strong> GET (hent ressurs), POST (send data), HEAD (kun headers), PUT (endre), DELETE</p>
          <p><strong>Statuskoder:</strong> 200 OK, 301 Moved, 400 Bad Request, 404 Not Found, 505 HTTP Version Not Supported</p>
          <p><strong>Conditional GET:</strong> If-Modified-Since header — server sender 304 Not Modified hvis ikke endret → sparer båndbredde</p>
        </div>
      </Collapsible>

      <Collapsible title="DNS — Domain Name System">
        <div className="text-sm space-y-2">
          <Card color="blue">
            <h4 className="font-bold mb-1">Hierarkisk struktur</h4>
            <p>Root-servere → TLD-servere (.com, .no) → Authoritative DNS-servere → Lokal DNS-server</p>
          </Card>
          <p><strong>Formål:</strong> Mapper vertsnavn (hostname) til IP-adresser</p>
          <p><strong>Iterativ oppslag:</strong> Lokal DNS-server gjør alle forespørsler selv</p>
          <p><strong>Rekursivt oppslag:</strong> Hvert nivå videresender til neste</p>
          <p><strong>Caching:</strong> DNS-svar caches med TTL — reduserer belastning på root-servere</p>
          <p><strong>Ressursposter (RR):</strong> A (IP), NS (nameserver), CNAME (alias), MX (mail)</p>
          <Tip>DNS bruker UDP (ikke TCP) for oppslag — raskere, tillater timeout og retry.</Tip>
        </div>
      </Collapsible>

      <h2 className="text-xl font-bold mb-4 mt-8">4. Transportlaget: UDP og TCP</h2>

      <Collapsible title="UDP vs TCP — sammenligning">
        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left">Egenskap</th>
                <th className="px-3 py-2 text-left text-blue-700 dark:text-blue-400">UDP</th>
                <th className="px-3 py-2 text-left text-network-700 dark:text-network-400">TCP</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Forbindelsesoppsett", "Ingen (connectionless)", "3-veis handshake"],
                ["Pålitelighet", "Upålitelig", "Garantert levering"],
                ["Rekkefølge", "Ingen garanti", "Korrekt rekkefølge"],
                ["Flytkontroll", "Ingen", "Sliding window"],
                ["Kjekkontroll", "Valgfri", "Alltid"],
                ["Header størrelse", "8 bytes", "20 bytes minimum"],
                ["Overheadkostnad", "Lav", "Høy"],
                ["Bruksområde", "DNS, streaming, gaming, VoIP", "HTTP, FTP, SSH, email"],
              ].map(([egenskap, udp, tcp], i) => (
                <tr key={egenskap} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-medium text-xs">{egenskap}</td>
                  <td className="px-3 py-2 text-xs">{udp}</td>
                  <td className="px-3 py-2 text-xs">{tcp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Collapsible>

      <h2 className="text-xl font-bold mb-4 mt-8">5. Øvingsoppgaver</h2>

      <div className="space-y-4">
        {[
          {
            q: "En pakke på L = 5000 bits sendes over en link med kapasitet R = 1 Mbps. Avstanden er d = 150 km og signalet beveger seg med s = 2×10⁸ m/s. Behandlingsforsinkelse = 0.5 ms, køforsinkelse = 2 ms. Beregn total nodalforsinkelse.",
            a: (
              <div>
                <p>d_trans = 5000/(10⁶) = 0.005 s = 5 ms</p>
                <p>d_prop = 150000/(2×10⁸) = 0.00075 s = 0.75 ms</p>
                <p>d_nodal = 0.5 + 2 + 5 + 0.75 = <strong>8.25 ms</strong></p>
              </div>
            ),
          },
          {
            q: "H1 sender til H2 via tre rutere (R1, R2, R3). Alle linker: R=100 Mbps, d=5 km, s=2×10⁸ m/s. Pakke L=1500 bytes. Ignorer behandling og køing. Hva er total ende-til-ende forsinkelse?",
            a: (
              <div>
                <p>L = 1500 × 8 = 12000 bits</p>
                <p>d_trans = 12000/(10⁸) = 0.00012 s = 0.12 ms</p>
                <p>d_prop = 5000/(2×10⁸) = 0.000025 s = 0.025 ms</p>
                <p>4 linker × (0.12 + 0.025) = 4 × 0.145 = <strong>0.58 ms</strong></p>
              </div>
            ),
          },
          {
            q: "En klient laster ned 1 HTML-side med 10 refererte bilder via ikke-persistent HTTP. Hvert objekt er 100 KB. RTT = 50 ms. Linjekapasitet = 10 Mbps. Hva er total tid?",
            a: (
              <div>
                <p>d_trans per objekt = 100×8000 / 10⁷ = 0.08 s = 80 ms</p>
                <p>Ikke-persistent: 2 RTT + d_trans per objekt = 100+100+80 = 280 ms</p>
                <p>11 objekter (HTML + 10 bilder): 11 × 280 = <strong>3080 ms = 3.08 s</strong></p>
              </div>
            ),
          },
        ].map(({ q, a }, i) => (
          <div key={i} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold text-sm mb-2">Oppgave {i + 1}</p>
            <p className="text-sm text-[var(--muted)] mb-3">{q}</p>
            <Answer>{a}</Answer>
          </div>
        ))}
      </div>
    </div>
  );
}
