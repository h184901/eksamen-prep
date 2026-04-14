"use client";

import { useState } from "react";
import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-network-700 dark:text-network-300">{title}</h2>
      {children}
    </section>
  );
}

function Card({ color, children, title }: { color: "gold" | "blue" | "network" | "green" | "red"; children: React.ReactNode; title?: string }) {
  const colors = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
  };
  return (
    <div className={`rounded-xl border-2 p-4 my-3 ${colors[color]}`}>
      {title && <div className="font-bold mb-2 text-sm uppercase tracking-wide opacity-70">{title}</div>}
      {children}
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-3 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
      >
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm text-amber-900 dark:text-amber-200 my-2">
      <span className="font-bold">Vanlig feil: </span>{children}
    </div>
  );
}

function ExamTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-network-50 dark:bg-network-950/20 border border-network-300 dark:border-network-700 px-4 py-3 text-sm text-network-900 dark:text-network-200 my-2">
      <span className="font-bold">Eksamenstips: </span>{children}
    </div>
  );
}

function Definition({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-network-200 dark:border-network-800/50 p-3 my-2">
      <span className="font-bold text-network-700 dark:text-network-300">{term}: </span>
      <span className="text-sm">{children}</span>
    </div>
  );
}

export default function Page21() {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/dat110/cn-2/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">2.1 Nettverksapplikasjoner og arkitektur</span>
      </div>

      <h1 className="text-2xl font-bold mb-1 text-network-700 dark:text-network-300">2.1 Nettverksapplikasjoner og arkitektur</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">Klient-server, P2P, prosesser, sockets og transportlagstjenester</p>

      {/* --- TEORISAMMENDRAG --- */}
      <Section title="Hva er en nettverksapplikasjon?">
        <p className="text-sm mb-3 leading-relaxed">
          En nettverksapplikasjon er et sett av <strong>prosesser</strong> som kjører på ulike verter (hosts) og kommuniserer med hverandre via nettverket.
          Det sentrale poenget er at du som utvikler bare trenger å skrive programvare for <em>endesystemene</em> (klienter og servere) —
          du trenger ikke å programmere kjerne-nettverksutstyret som rutere og svitsjer.
        </p>
        <Card color="network" title="Nøkkelinnsikt">
          <p className="text-sm">Applikasjoner kjører på <strong>endesystemer</strong>. Rutere og svitsjer i nettverkets kjerne kjører ikke brukerapplikasjoner.
          Dette er grunnen til at Internett som plattform muliggjør rask utvikling og spredning av nye applikasjoner.</p>
        </Card>

        <p className="text-sm mt-4 leading-relaxed">
          Applikasjonene kan implementeres i ulike programmeringsspråk (Java, Python, C, ...) og kjøre på ulike plattformer.
          De kommuniserer gjennom <strong>applikasjonsprotokoller</strong> som definerer:
        </p>
        <ul className="text-sm list-disc ml-6 space-y-1 mt-2">
          <li><strong>Typer meldinger</strong> som utveksles (f.eks. forespørsel og svar)</li>
          <li><strong>Syntaks</strong>: hvilke felt meldingene har og hvordan de er avgrenset</li>
          <li><strong>Semantikk</strong>: hva informasjonen i feltene betyr</li>
          <li><strong>Regler</strong>: når og hvordan prosesser sender og svarer</li>
        </ul>
      </Section>

      {/* --- ARKITEKTURER --- */}
      <Section title="To grunnleggende arkitekturer">

        {/* Klient-server */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2">Klient-server-arkitektur</h3>

          {/* SVG diagram */}
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 mb-4 overflow-x-auto">
            <svg viewBox="0 0 500 200" className="w-full max-w-md mx-auto" aria-label="Klient-server diagram">
              {/* Server */}
              <rect x="370" y="60" width="80" height="80" rx="8" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="2"/>
              <text x="410" y="100" textAnchor="middle" className="text-xs" fill="currentColor" fontSize="12" fontWeight="bold">Server</text>
              <text x="410" y="118" textAnchor="middle" fill="#64748b" fontSize="10">alltid på</text>

              {/* Clients */}
              <rect x="30" y="20" width="70" height="50" rx="8" fill="#06b6d4" fillOpacity="0.12" stroke="#06b6d4" strokeWidth="2"/>
              <text x="65" y="48" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Klient 1</text>

              <rect x="30" y="130" width="70" height="50" rx="8" fill="#06b6d4" fillOpacity="0.12" stroke="#06b6d4" strokeWidth="2"/>
              <text x="65" y="158" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Klient 2</text>

              <rect x="160" y="75" width="70" height="50" rx="8" fill="#06b6d4" fillOpacity="0.12" stroke="#06b6d4" strokeWidth="2"/>
              <text x="195" y="103" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Klient 3</text>

              {/* Arrows */}
              <line x1="100" y1="45" x2="370" y2="90" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,3"/>
              <line x1="100" y1="155" x2="370" y2="120" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,3"/>
              <line x1="230" y1="100" x2="370" y2="100" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,3"/>

              {/* Labels */}
              <text x="240" y="72" textAnchor="middle" fill="#0ea5e9" fontSize="10">forespørsel →</text>
              <text x="240" y="130" textAnchor="middle" fill="#0ea5e9" fontSize="10">← svar</text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card color="blue" title="Server">
              <ul className="text-xs space-y-1">
                <li>Alltid tilkoblet (always-on)</li>
                <li>Permanent IP-adresse</li>
                <li>Kommuniserer aldri direkte med andre servere</li>
                <li>Ofte i datasentre for skalering</li>
                <li>Eksempler: HTTP, SMTP, FTP</li>
              </ul>
            </Card>
            <Card color="network" title="Klient">
              <ul className="text-xs space-y-1">
                <li>Tar kontakt med serveren</li>
                <li>Kan være intermittent tilkoblet</li>
                <li>Kan ha dynamisk IP-adresse</li>
                <li>Kommuniserer <em>ikke</em> direkte med andre klienter</li>
                <li>Eksempler: nettleser, e-postklient</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* P2P */}
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Peer-to-peer (P2P)-arkitektur</h3>
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 mb-4 overflow-x-auto">
            <svg viewBox="0 0 400 180" className="w-full max-w-sm mx-auto" aria-label="P2P-diagram">
              {/* Peers */}
              {[
                { x: 60,  y: 30,  label: "Peer A" },
                { x: 280, y: 30,  label: "Peer B" },
                { x: 60,  y: 120, label: "Peer C" },
                { x: 280, y: 120, label: "Peer D" },
                { x: 170, y: 75,  label: "Peer E" },
              ].map(({ x, y, label }) => (
                <g key={label}>
                  <rect x={x} y={y} width="70" height="40" rx="8" fill="#8b5cf6" fillOpacity="0.12" stroke="#8b5cf6" strokeWidth="1.5"/>
                  <text x={x + 35} y={y + 24} textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">{label}</text>
                </g>
              ))}
              {/* Connections */}
              <line x1="130" y1="50" x2="280" y2="50" stroke="#8b5cf6" strokeWidth="1.5"/>
              <line x1="130" y1="140" x2="280" y2="140" stroke="#8b5cf6" strokeWidth="1.5"/>
              <line x1="95" y1="70" x2="170" y2="95" stroke="#8b5cf6" strokeWidth="1.5"/>
              <line x1="315" y1="70" x2="240" y2="95" stroke="#8b5cf6" strokeWidth="1.5"/>
              <line x1="95" y1="130" x2="170" y2="115" stroke="#8b5cf6" strokeWidth="1.5"/>
              <line x1="315" y1="130" x2="240" y2="115" stroke="#8b5cf6" strokeWidth="1.5"/>
            </svg>
          </div>
          <Card color="green">
            <ul className="text-sm space-y-1">
              <li><strong>Ingen alltid-på-server</strong> — vilkårlige endesystemer kommuniserer direkte</li>
              <li><strong>Selvskalebarhet</strong>: nye peers bringer ny kapasitet OG ny etterspørsel</li>
              <li>Peers er intermittent tilkoblet og skifter IP-adresser — kompleks administrasjon</li>
              <li>Eksempel: BitTorrent fildeling</li>
            </ul>
          </Card>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900/30">
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-left">Egenskap</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-center">Klient-server</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-center">P2P</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Alltid-på-server", "Ja", "Nei"],
                ["IP-adresse for server", "Permanent", "Dynamisk"],
                ["Skalerbarhet", "Begrenset av server", "Selvskalebarhet"],
                ["Eksempler", "HTTP, FTP, SMTP", "BitTorrent, Skype (tidl.)"],
                ["Administrasjon", "Enklere", "Kompleks"],
              ].map(([prop, cs, p2p]) => (
                <tr key={prop} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 font-medium">{prop}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-center">{cs}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-center">{p2p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* --- PROSESSER OG SOCKETS --- */}
      <Section title="Prosesser og sockets">
        <p className="text-sm mb-3 leading-relaxed">
          Kommunikasjon skjer mellom <strong>prosesser</strong> (kjørende programmer), ikke mellom verter.
          Prosesser på samme vert kommuniserer via operativsystemet (IPC). Prosesser på ulike verter kommuniserer ved å utveksle meldinger over nettverket.
        </p>

        <Definition term="Klient-prosess">Den prosessen som initierer kommunikasjonen.</Definition>
        <Definition term="Server-prosess">Den prosessen som venter på å bli kontaktet.</Definition>
        <Definition term="Socket (stikkontakt)">
          Grensesnittet mellom applikasjonslaget og transportlaget. Analogt med en «dør» —
          prosessen sender/mottar meldinger gjennom socketen. Sockets opprettes og kontrolleres av prosessen,
          men den underliggende transporten kontrolleres av operativsystemet.
        </Definition>

        {/* Socket diagram */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 my-4 overflow-x-auto">
          <svg viewBox="0 0 500 160" className="w-full max-w-lg mx-auto" aria-label="Socket-modell">
            {/* Host A */}
            <rect x="20" y="20" width="190" height="120" rx="10" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3"/>
            <text x="115" y="15" textAnchor="middle" fill="#94a3b8" fontSize="11">Vert A</text>
            <rect x="40" y="35" width="150" height="30" rx="5" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="1.5"/>
            <text x="115" y="55" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Applikasjonsprosess</text>
            <rect x="80" y="90" width="70" height="30" rx="5" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="1.5"/>
            <text x="115" y="109" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Socket</text>
            <line x1="115" y1="65" x2="115" y2="90" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrow)"/>

            {/* Host B */}
            <rect x="290" y="20" width="190" height="120" rx="10" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3"/>
            <text x="385" y="15" textAnchor="middle" fill="#94a3b8" fontSize="11">Vert B</text>
            <rect x="310" y="35" width="150" height="30" rx="5" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="1.5"/>
            <text x="385" y="55" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Applikasjonsprosess</text>
            <rect x="350" y="90" width="70" height="30" rx="5" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="1.5"/>
            <text x="385" y="109" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Socket</text>
            <line x1="385" y1="65" x2="385" y2="90" stroke="#0ea5e9" strokeWidth="2"/>

            {/* Internet */}
            <rect x="215" y="90" width="70" height="30" rx="5" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
            <text x="250" y="109" textAnchor="middle" fill="currentColor" fontSize="10">Internett</text>
            <line x1="150" y1="105" x2="215" y2="105" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow2)"/>
            <line x1="350" y1="105" x2="285" y2="105" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow3)"/>

            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#0ea5e9"/>
              </marker>
            </defs>
          </svg>
          <p className="text-xs text-center text-[var(--muted)] mt-2">Prosesser kommuniserer gjennom sockets — «dørene» mellom applikasjonslaget og transporten</p>
        </div>
      </Section>

      {/* --- ADRESSERING --- */}
      <Section title="Adressering: IP-adresse + portnummer">
        <p className="text-sm mb-3 leading-relaxed">
          For å sende en melding til en prosess trenger vi to ting:
          1) <strong>IP-adressen</strong> til verten, og 2) et <strong>portnummer</strong> som identifiserer prosessen på den verten.
          IP-adressen alene peker til maskinen — portnummeret peker til riktig prosess/tjeneste.
        </p>

        <Card color="gold" title="Eksempler på kjente portnumre">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-amber-100 dark:bg-amber-900/30">
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1 text-left">Protokoll</th>
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1">Port</th>
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1 text-left">Transport</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["HTTP", "80", "TCP"],
                  ["HTTPS", "443", "TCP"],
                  ["HTTP alt.", "8080", "TCP"],
                  ["DNS", "53", "UDP (og TCP)"],
                  ["SMTP", "25", "TCP"],
                  ["FTP", "21", "TCP"],
                  ["SSH", "22", "TCP"],
                ].map(([proto, port, trans]) => (
                  <tr key={proto} className="even:bg-amber-50/50 dark:even:bg-amber-900/10">
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1 font-medium">{proto}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1 text-center font-mono">{port}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1">{trans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card color="network">
          <p className="text-sm"><strong>Adressering ved transportlaget (eksamensspørsmål!):</strong> En socket-kommunikasjonsendepunkt identifiseres ved to elementer: <strong>IP-adresse</strong> + <strong>portnummer</strong>. Eksempel: <code className="bg-black/10 dark:bg-white/10 px-1 rounded">152.230.140.50:80</code></p>
        </Card>

        <ExamTip>Eksamen 2025 Oppgave 1c spør: «How are communication endpoints identified at the transport layer?» Svaret er: <strong>IP-adresse og portnummer</strong>.</ExamTip>
      </Section>

      {/* --- TRANSPORTLAGSTJENESTER --- */}
      <Section title="TCP vs UDP — hva trenger appen din?">
        <p className="text-sm mb-3 leading-relaxed">
          Applikasjoner velger transporttjeneste basert på fire krav:
          <strong> pålitelighet</strong>, <strong>timing</strong>, <strong>gjennomstrømning</strong> og <strong>sikkerhet</strong>.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900/30">
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-left">Egenskap</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-center text-blue-700 dark:text-blue-300">TCP</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-center text-red-700 dark:text-red-300">UDP</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Tilkoblingsorientert", "Ja (3-veis handshake)", "Nei (connectionless)"],
                ["Pålitelig dataoverføring", "Ja — garantert levering i rekkefølge", "Nei — best-effort"],
                ["Flytkontroll", "Ja — avsender overvelger ikke mottaker", "Nei"],
                ["Overbelastningskontroll", "Ja — bremser ved nettverksbelastning", "Nei"],
                ["Timing / forsinkelsesgaranti", "Nei", "Nei"],
                ["Gjennomstrømningsgaranti", "Nei", "Nei"],
                ["Sikkerhet (kryptering)", "Nei (men TLS over TCP)", "Nei"],
                ["Typiske applikasjoner", "HTTP, FTP, SMTP, e-post", "DNS, streaming, VoIP, spill"],
              ].map(([prop, tcp, udp], i) => (
                <tr key={i} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 font-medium">{prop}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-center text-blue-700 dark:text-blue-300">{tcp}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-center text-red-700 dark:text-red-300">{udp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Collapsible title="Applikasjonskrav — hvilken transport passer?" defaultOpen={true}>
          <p className="text-sm mb-2">Noen applikasjoner krever spesifikke tjenester:</p>
          <ul className="text-sm space-y-2">
            <li><strong>Filoverføring, netthandel, e-post:</strong> krever 100% pålitelig overføring → TCP</li>
            <li><strong>Lyd/video-streaming:</strong> tåler noe tap, men trenger lav forsinkelse → UDP eller TCP</li>
            <li><strong>Nettspill, VoIP, videokonferanse:</strong> krever lav forsinkelse → UDP</li>
            <li><strong>DNS-oppslag:</strong> korte meldinger, tåler å sende på nytt → UDP</li>
          </ul>
          <Warn>Verken TCP eller UDP tilbyr timing-garantier, minimums-gjennomstrøm eller kryptering. Kryptering (TLS) legges på toppen av TCP i applikasjonslaget.</Warn>
        </Collapsible>
      </Section>

      {/* --- APPLIKASJONSPROTOKOLL --- */}
      <Section title="Hva definerer en applikasjonsprotokoll?">
        <p className="text-sm mb-3">En applikasjonslagsprotokoll definerer følgende:</p>
        <div className="grid grid-cols-2 gap-3">
          <Card color="blue" title="Meldingstyper">
            <p className="text-xs">Hvilke meldingstyper finnes? F.eks. GET-forespørsel og 200 OK-svar i HTTP</p>
          </Card>
          <Card color="blue" title="Syntaks">
            <p className="text-xs">Hvilke felt har meldingene, og hvordan er de avgrenset? (f.eks. CRLF i HTTP)</p>
          </Card>
          <Card color="blue" title="Semantikk">
            <p className="text-xs">Hva betyr informasjonen i feltene? F.eks. statuskode 404 = «ikke funnet»</p>
          </Card>
          <Card color="blue" title="Regler">
            <p className="text-xs">Når og hvordan sender prosesser meldinger? F.eks. klienten sender alltid første forespørsel</p>
          </Card>
        </div>
        <Card color="green">
          <p className="text-sm"><strong>Åpne protokoller</strong> (som HTTP, SMTP) er definert i RFC-er og gir interoperabilitet mellom ulike implementasjoner.
          <strong> Proprietære protokoller</strong> (som Skype) holdes hemmelige av utvikleren.</p>
        </Card>
      </Section>

      {/* --- VANLIGE FEIL --- */}
      <Section title="Vanlige feil og misforståelser">
        <Warn>Mange blander IP-adresse og portnummer. IP-adressen identifiserer <em>maskinen</em>, portnummeret identifiserer <em>prosessen</em> på maskinen.</Warn>
        <Warn>I klient-server-arkitektur kommuniserer klienter ALDRI direkte med hverandre — alt går gjennom serveren. I P2P er det omvendt.</Warn>
        <Warn>TCP tilbyr pålitelighet, men verken timing eller gjennomstrømningsgaranti. Disse finnes ikke i TCP/IP-stacken.</Warn>
      </Section>

      {/* --- EKSAMENSSPØRSMÅL --- */}
      <Section title="Typiske eksamensspørsmål">
        <Collapsible title="Spørsmål: Hva er de to elementene som identifiserer en socket ved transportlaget?">
          <Card color="green">
            <p className="text-sm font-bold">Svar: IP-adresse og portnummer.</p>
            <p className="text-sm mt-1">IP-adressen peker til verten, portnummeret peker til prosessen på verten.</p>
          </Card>
        </Collapsible>
        <Collapsible title="Spørsmål: Hva er forskjellen mellom klient-server og P2P-arkitektur?">
          <Card color="green">
            <p className="text-sm">Klient-server: dedikert alltid-på-server med permanent IP, klienter kommuniserer kun med server.
            P2P: ingen dedikert server, peers kommuniserer direkte med hverandre, selvskalebarhet ved at nye peers tilfører kapasitet.</p>
          </Card>
        </Collapsible>
        <Collapsible title="Spørsmål: Hvilke tjenester tilbyr TCP vs UDP?">
          <Card color="green">
            <p className="text-sm">TCP: tilkoblingsorientert, pålitelig overføring i rekkefølge, flytkontroll, overbelastningskontroll.
            UDP: tilkoblingsløs, upålitelig, ingen flytkontroll/overbelastningskontroll — men lavere overhead og lavere forsinkelse.</p>
          </Card>
        </Collapsible>
      </Section>

      {/* --- Navigasjon --- */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <span className="text-sm text-[var(--muted)]">2.1 er første delkapittel</span>
        <Link href="/dat110/cn-2/teori/2-2" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">2.2 HTTP og webben →</Link>
      </div>
    </div>
  );
}
