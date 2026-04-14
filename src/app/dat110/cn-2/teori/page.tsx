"use client";

import { useState } from "react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-network-700 dark:text-network-300">{title}</h2>
      {children}
    </section>
  );
}

function Card({ color, children }: { color: "gold" | "blue" | "network" | "green" | "red"; children: React.ReactNode }) {
  const colors = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
  };
  return (
    <div className={`rounded-xl border-2 p-4 my-3 ${colors[color]}`}>
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
        <svg
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-semibold text-network-700 dark:text-network-300">{children}</span>
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

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm text-amber-900 dark:text-amber-200 my-2">
      <span className="font-bold">Viktig: </span>{children}
    </div>
  );
}

export default function CN2TeoriPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Teori: Applikasjonslaget</h1>
      <p className="text-[var(--muted)] mb-4 text-sm">CN 2.1–2.7 — HTTP, DNS, e-post, P2P og socket-programmering</p>

      {/* Delkapittel-navigasjon */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: "2.1", title: "Applikasjonsarkitektur" },
          { id: "2.2", title: "HTTP og webben" },
          { id: "2.4", title: "DNS" },
          { id: "2.7", title: "Socket-programmering" },
        ].map((ch) => (
          <span
            key={ch.id}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-[var(--card-border)] bg-[var(--card)] text-[var(--foreground)]"
            title={ch.title}
          >
            <span className="font-bold text-network-600 dark:text-network-400">{ch.id}</span>
            <span className="ml-1.5 text-xs text-[var(--muted)] hidden sm:inline">{ch.title}</span>
          </span>
        ))}
      </div>

      {/* ── 1. Applikasjonsarkitektur ── */}
      <Section title="1. Nettverksapplikasjoner og arkitektur">
        <p className="text-sm mb-3">
          En nettverksapplikasjon er et sett av <Highlight>prosesser</Highlight> som
          kjører på <em>ulike</em> verter og kommuniserer via nettverket ved hjelp
          av transportlagtjenester (TCP eller UDP). Du trenger <em>ikke</em> skrive
          kode for nettverkskjernenheter (rutere, svitsjer) — applikasjonene
          kjører kun på endesystemer.
        </p>

        <Card color="gold">
          <h3 className="font-bold mb-3">Klient-server vs P2P</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Klient-server</p>
              <ul className="space-y-1">
                <li>▸ Server alltid tilgjengelig med fast IP-adresse</li>
                <li>▸ Klienter kommuniserer via serveren, ikke direkte med hverandre</li>
                <li>▸ Eksempler: HTTP, SMTP, FTP</li>
                <li>▸ Kapasitetsbegrensning: serveren er flaskehalsen</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">P2P (Peer-to-Peer)</p>
              <ul className="space-y-1">
                <li>▸ Ingen alltid-på server</li>
                <li>▸ Likeverdige noder kommuniserer direkte</li>
                <li>▸ <strong>Self-scalability:</strong> nye peers gir ny kapasitet</li>
                <li>▸ Eksempel: BitTorrent, Skype</li>
              </ul>
            </div>
          </div>
        </Card>

        <Definition term="Applikasjonslagsprotokoll">
          Definerer meldingstyper (request/response), syntaks (felter og format),
          semantikk (betydningen av feltene) og regler for når/hvordan meldinger
          sendes. Åpne protokoller (HTTP, SMTP) er definert i RFC-er — lukkede
          (Skype) er proprietære.
        </Definition>

        <Definition term="Socket">
          Grensesnittet mellom applikasjonsprosessen og transportlaget — en slags
          «dør» inn til nettverket. Identifisert av IP-adresse + portnummer.
        </Definition>

        <Card color="blue">
          <h3 className="font-bold mb-2">Hva trenger applikasjonen fra transporten?</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><span className="font-semibold">Pålitelighet:</span> Filoverføring trenger 100% pålitelig levering; lyd/video kan tåle litt tap</div>
            <div><span className="font-semibold">Forsinkelse:</span> Nettspill og VoIP krever lav forsinkelse</div>
            <div><span className="font-semibold">Gjennomstrømning:</span> Multimedia trenger minimum throughput; andre applikasjoner er elastiske</div>
            <div><span className="font-semibold">Sikkerhet:</span> Kryptering, dataintegritet</div>
          </div>
        </Card>

        <Card color="network">
          <h3 className="font-bold mb-2">TCP vs UDP — hvilken velger du?</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold text-blue-700 dark:text-blue-300">TCP</p>
              <ul className="space-y-1 mt-1">
                <li>✓ Pålitelig dataoverføring</li>
                <li>✓ Flytkontroll</li>
                <li>✓ Metningskontroll</li>
                <li>✓ Tilkoblingsorientert (handshake)</li>
                <li>✗ Ingen garanti på forsinkelse eller throughput</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-600 dark:text-red-400">UDP</p>
              <ul className="space-y-1 mt-1">
                <li>✓ Lavt overhead — rask</li>
                <li>✓ Ingen oppkoblingsforsinkelse</li>
                <li>✗ Upålitelig — kan miste pakker</li>
                <li>✗ Ingen flytkontroll</li>
                <li>Brukes: DNS, streaming, VoIP, gaming</li>
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      {/* ── 2. HTTP ── */}
      <Section title="2. HTTP — HyperText Transfer Protocol">
        <p className="text-sm mb-3">
          HTTP er applikasjonslagsprotokollen for websider. Den bruker{" "}
          <Highlight>TCP</Highlight> som transportprotokoll (port 80 for HTTP,
          443 for HTTPS). HTTP er <Highlight>tilstandsløs</Highlight> — serveren
          husker ikke tidligere forespørsler fra klienten.
        </p>

        <Card color="gold">
          <h3 className="font-bold mb-3">Ikke-persistent vs. persistent HTTP</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-red-700 dark:text-red-300 mb-1">Ikke-persistent HTTP (HTTP/1.0)</p>
              <ul className="space-y-1">
                <li>▸ Én TCP-tilkobling per objekt</li>
                <li>▸ Tilkoblingen lukkes etter hvert objekt</li>
                <li>▸ 2 RTT + overføringstid per objekt</li>
                <li>▸ OS overhead for hver tilkobling</li>
              </ul>
              <div className="mt-2 bg-red-100 dark:bg-red-900/20 rounded p-2 font-mono text-xs">
                Tid per objekt = 2RTT + L/R
              </div>
            </div>
            <div>
              <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Persistent HTTP (HTTP/1.1+)</p>
              <ul className="space-y-1">
                <li>▸ Én TCP-tilkobling for <em>alle</em> objekter</li>
                <li>▸ Server holder tilkoblingen åpen</li>
                <li>▸ Bare 1 RTT + overføringstid per objekt etter første</li>
                <li>▸ Med pipelining: flere forespørsler uten å vente</li>
              </ul>
              <div className="mt-2 bg-green-100 dark:bg-green-900/20 rounded p-2 font-mono text-xs">
                1. obj: 2RTT + L/R, øvrige: RTT + L/R
              </div>
            </div>
          </div>
        </Card>

        <Warn>
          RTT (Round-Trip Time) = tid fra klienten sender en liten pakke til den
          mottar svar. For å opprette TCP-tilkobling trengs 1 RTT (SYN +
          SYN-ACK), deretter 1 RTT for HTTP-forespørselen — totalt 2 RTT
          <em> før</em> data begynner å komme.
        </Warn>

        <Collapsible title="HTTP-meldingsformat">
          <div className="text-sm space-y-3">
            <div>
              <p className="font-semibold mb-1">Request-melding:</p>
              <pre className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-xs overflow-x-auto">{`GET /index.html HTTP/1.1\r\n
Host: www.hvl.no\r\n
Connection: close\r\n
User-Agent: Mozilla/5.0\r\n
Accept-Language: no\r\n
\r\n`}</pre>
              <p className="text-xs text-[var(--muted)] mt-1">Linje 1: metode URL HTTP-versjon | Headere | Tom linje (CRLF) | Evt. body</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Response-melding:</p>
              <pre className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-xs overflow-x-auto">{`HTTP/1.1 200 OK\r\n
Date: Mon, 14 Apr 2026 12:00:00 GMT\r\n
Content-Type: text/html\r\n
Content-Length: 1400\r\n
\r\n
<html>...</html>`}</pre>
            </div>
          </div>
        </Collapsible>

        <Collapsible title="HTTP-metoder">
          <div className="overflow-x-auto">
            <table className="text-sm w-full border-collapse">
              <thead>
                <tr className="bg-network-50 dark:bg-network-950/20">
                  <th className="text-left p-2 border border-[var(--card-border)]">Metode</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Formål</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Body?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["GET", "Hent ressurs — data sendes i URL", "Nei"],
                  ["POST", "Send data til server (skjema, JSON)", "Ja"],
                  ["PUT", "Oppdater/erstatt ressurs", "Ja"],
                  ["DELETE", "Slett ressurs", "Nei"],
                  ["HEAD", "Som GET, men bare headers (ingen body)", "Nei"],
                ].map(([m, f, b]) => (
                  <tr key={m} className="border-b border-[var(--card-border)]">
                    <td className="p-2 font-mono font-bold text-network-600 dark:text-network-400 border border-[var(--card-border)]">{m}</td>
                    <td className="p-2 border border-[var(--card-border)]">{f}</td>
                    <td className="p-2 border border-[var(--card-border)]">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Collapsible>

        <Collapsible title="HTTP-statuskoder">
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ["200 OK", "Forespørselen lyktes", "green"],
              ["301 Moved Permanently", "Ressursen er permanent flyttet (ny URL i Location-header)", "blue"],
              ["304 Not Modified", "Ressursen ikke endret siden If-Modified-Since — bruk cachen!", "blue"],
              ["400 Bad Request", "Serveren forsto ikke forespørselen", "red"],
              ["404 Not Found", "Ressursen finnes ikke", "red"],
              ["505 HTTP Version Not Supported", "Serveren støtter ikke HTTP-versjonen", "red"],
            ].map(([code, desc, color]) => (
              <div key={code} className={`rounded p-2 border text-xs ${
                color === "green" ? "border-green-300 bg-green-50 dark:bg-green-950/20" :
                color === "blue" ? "border-blue-300 bg-blue-50 dark:bg-blue-950/20" :
                "border-red-300 bg-red-50 dark:bg-red-950/20"
              }`}>
                <span className="font-mono font-bold">{code}</span>
                <p className="mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </Collapsible>

        <Collapsible title="Cookies og Web-caching">
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">Cookies — tilstand i en tilstandsløs protokoll</p>
              <p>
                HTTP er tilstandsløst, men cookies lar serveren holde styr på brukere.
                Fire komponenter: (1) Set-Cookie header i HTTP response, (2) Cookie
                header i HTTP request, (3) Cookie-fil på klienten, (4) backend
                database på serveren.
              </p>
              <p className="mt-1 text-[var(--muted)]">Brukes til: shoppingkurv, autentisering, brukerpreferanser.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Web-caching (proxy-server)</p>
              <p>
                En web-cache lagrer kopier av nylig etterspurte objekter. Klientens
                nettleser konfigureres til å sende alle forespørsler til cachen.
                Fordeler: reduserer responstid for klienten, reduserer trafikk på
                koblingen til opprinnelsesserveren.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Conditional GET</p>
              <p>
                Cachen sender <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">If-Modified-Since: [dato]</code> i
                headeren. Serveren svarer enten med <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">304 Not Modified</code>{" "}
                (ingen body — spar båndbredde!) eller <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">200 OK</code> med
                oppdatert objekt.
              </p>
            </div>
          </div>
        </Collapsible>
      </Section>

      {/* ── 3. DNS ── */}
      <Section title="3. DNS — Domain Name System">
        <p className="text-sm mb-3">
          DNS er internettets «telefonbok» — oversetter menneskevennlige
          domenenavn (www.hvl.no) til IP-adresser (158.37.70.50). DNS er
          implementert som en distribuert, hierarkisk database og bruker{" "}
          <Highlight>UDP</Highlight> på port 53 (rask, lav overhead).
        </p>

        <Card color="gold">
          <h3 className="font-bold mb-3">DNS-hierarkiet — tre nivåer</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-3">
              <span className="bg-network-500 text-white rounded px-2 py-0.5 text-xs font-bold shrink-0">1</span>
              <div>
                <p className="font-semibold">Root DNS-servere</p>
                <p className="text-[var(--muted)]">13 sett med root-servere (a.root-servers.net til m.root-servers.net). Kjenner adressene til alle TLD-servere.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-network-500 text-white rounded px-2 py-0.5 text-xs font-bold shrink-0">2</span>
              <div>
                <p className="font-semibold">TLD-servere (Top-Level Domain)</p>
                <p className="text-[var(--muted)]">Ansvarlig for .com, .no, .org, .edu osv. Kjenner adressene til autoritative navneservere.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-network-500 text-white rounded px-2 py-0.5 text-xs font-bold shrink-0">3</span>
              <div>
                <p className="font-semibold">Autoritative navneservere</p>
                <p className="text-[var(--muted)]">Organisasjonens egne DNS-servere — inneholder de faktiske IP-adressene for domenet.</p>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-[var(--muted)]">
            + Lokal DNS-server (default name server): ISP-ens server som videreformidler forespørsler — ikke i hierarkiet, men kritisk.
          </div>
        </Card>

        <Collapsible title="Iterativt vs. rekursivt DNS-oppslag" defaultOpen>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Iterativt oppslag</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Klient spør lokal DNS</li>
                <li>Lokal DNS spør root-server → får adresse til TLD-server</li>
                <li>Lokal DNS spør TLD-server → får adresse til autoritativ server</li>
                <li>Lokal DNS spør autoritativ server → får IP-adressen</li>
                <li>Lokal DNS returnerer svar til klienten</li>
              </ol>
              <p className="mt-2 text-[var(--muted)] text-xs">Byrden ligger på den lokale DNS-serveren. Vanligst i praksis.</p>
            </div>
            <div>
              <p className="font-semibold text-green-700 dark:text-green-300 mb-2">Rekursivt oppslag</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Klient spør lokal DNS</li>
                <li>Lokal DNS spør root-server</li>
                <li>Root-server spør TLD-server</li>
                <li>TLD-server spør autoritativ server</li>
                <li>Svar propageres tilbake oppover kjeden</li>
              </ol>
              <p className="mt-2 text-[var(--muted)] text-xs">Byrden flyttes til navneserverne høyere opp. Høyt load på root-servere.</p>
            </div>
          </div>
        </Collapsible>

        <Collapsible title="DNS Resource Records (RR-typer)">
          <p className="text-sm mb-2">DNS-databasen lagrer <strong>resource records</strong> på formen: (Navn, Verdi, Type, TTL)</p>
          <div className="overflow-x-auto">
            <table className="text-sm w-full border-collapse">
              <thead>
                <tr className="bg-network-50 dark:bg-network-950/20">
                  <th className="text-left p-2 border border-[var(--card-border)]">Type</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Navn</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Verdi</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Bruk</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["A", "Vertsnavn", "IPv4-adresse", "www.hvl.no → 158.37.70.50"],
                  ["AAAA", "Vertsnavn", "IPv6-adresse", "IPv6-oppslag"],
                  ["NS", "Domene", "Autoritativ navneserver", "hvl.no → ns1.hvl.no"],
                  ["CNAME", "Alias", "Kanonisk navn", "hvl.no → www.hvl.no"],
                  ["MX", "Domene", "E-postserver", "hvl.no → mail.hvl.no"],
                ].map(([type, name, val, use]) => (
                  <tr key={type} className="border-b border-[var(--card-border)]">
                    <td className="p-2 font-mono font-bold text-network-600 dark:text-network-400 border border-[var(--card-border)]">{type}</td>
                    <td className="p-2 text-xs border border-[var(--card-border)]">{name}</td>
                    <td className="p-2 text-xs border border-[var(--card-border)]">{val}</td>
                    <td className="p-2 text-xs border border-[var(--card-border)] text-[var(--muted)]">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">TTL (Time-To-Live): Hvor lenge svaret kan caches. Lav TTL = fersk info, høy TTL = raskere oppslag.</p>
        </Collapsible>

        <Warn>
          DNS caching er kritisk for ytelsen. Lokal DNS-server cacher svar for
          TTL-perioden. Ofte caches TLD-serverens adresse slik at root-servere
          ikke kontaktes ved hvert oppslag.
        </Warn>
      </Section>

      {/* ── 4. E-post ── */}
      <Section title="4. E-post — SMTP, POP3, IMAP">
        <p className="text-sm mb-3">
          E-post-systemet har tre komponenter: <Highlight>User agents</Highlight>{" "}
          (e-postklient), <Highlight>mail-servere</Highlight> (lagrer og sender
          e-post) og <Highlight>SMTP</Highlight> (Simple Mail Transfer Protocol).
        </p>

        <Card color="blue">
          <h3 className="font-bold mb-2">SMTP — sending av e-post</h3>
          <ul className="text-sm space-y-1">
            <li>▸ Bruker TCP på port 25 — pålitelig overføring</li>
            <li>▸ Avsenders mail-server sender direkte til mottakers mail-server</li>
            <li>▸ Push-protokoll: sendingssiden initierer tilkoblingen</li>
            <li>▸ ASCII-format (7-bit) — vedlegg kodes med MIME</li>
            <li>▸ Kommandoer: HELO, MAIL FROM, RCPT TO, DATA, QUIT</li>
          </ul>
        </Card>

        <Card color="network">
          <h3 className="font-bold mb-2">POP3 vs IMAP — henting av e-post</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold mb-1">POP3 (port 110)</p>
              <ul className="space-y-1">
                <li>▸ Last ned og slett (eller behold)</li>
                <li>▸ E-post lagres lokalt</li>
                <li>▸ Enkelt, men vanskelig å synkronisere mellom enheter</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">IMAP (port 143)</p>
              <ul className="space-y-1">
                <li>▸ E-post forblir på serveren</li>
                <li>▸ Kan organisere i mapper på serveren</li>
                <li>▸ Synkronisert på tvers av alle enheter</li>
              </ul>
            </div>
          </div>
        </Card>

        <p className="text-sm text-[var(--muted)] mt-2">
          NB: Webbasert e-post (Gmail i nettleser) bruker HTTP mellom nettleser
          og mailserver — SMTP brukes kun mellom mailserverne.
        </p>
      </Section>

      {/* ── 5. P2P ── */}
      <Section title="5. P2P-filoverføring og BitTorrent">
        <p className="text-sm mb-3">
          I P2P-arkitektur kan <em>alle</em> noder (peers) både laste opp og ned.
          Dette gir <Highlight>self-scalability</Highlight> — jo flere brukere,
          jo mer total kapasitet.
        </p>

        <Card color="green">
          <h3 className="font-bold mb-2">BitTorrent — nøkkelkonsepter</h3>
          <ul className="text-sm space-y-1">
            <li>▸ Filen deles i <strong>chunks</strong> (typisk 256 kB)</li>
            <li>▸ <strong>Tracker:</strong> holder oversikt over peers i torrent</li>
            <li>▸ <strong>Rarest first:</strong> last ned den sjeldneste chunken først</li>
            <li>▸ <strong>Tit-for-tat:</strong> last opp til de som laster mest opp til deg (4 peers + 1 optimistisk)</li>
            <li>▸ Peers kan komme og gå (churn) — systemet er robust</li>
          </ul>
        </Card>

        <Card color="blue">
          <h3 className="font-bold mb-2">P2P vs klient-server — distribusjonstid</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold">Klient-server:</p>
              <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                D_cs = max( NF/u_s, F/d_min )
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">u_s = server upload rate, d_min = minste klient download rate, N = antall klienter, F = filstørrelse</p>
            </div>
            <div>
              <p className="font-semibold">P2P:</p>
              <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                D_p2p = max( F/u_s, F/d_min, NF/(u_s + Σu_i) )
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">Σu_i = total upload-kapasitet fra alle peers. P2P skalerer langt bedre med antall klienter!</p>
            </div>
          </div>
        </Card>
      </Section>

      {/* ── 6. Socket-programmering ── */}
      <Section title="6. Socket-programmering (CN 2.7)">
        <p className="text-sm mb-3">
          Socket API lar applikasjonsprogrammer kommunisere via nettverket.
          Sockets er opprettet av applikasjonen og kontrollert av operativsystemet.
          I Java finnes fire sentrale socket-klasser i <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">java.net</code>:
        </p>

        <Card color="gold">
          <h3 className="font-bold mb-2">Java socket-klasser</h3>
          <div className="space-y-2 text-sm">
            {[
              ["Socket", "TCP klient-socket — kobler til remote server", "TCP"],
              ["ServerSocket", "TCP server-socket — venter på innkommende tilkoblinger", "TCP"],
              ["DatagramSocket", "UDP socket — sender og mottar datagram-pakker", "UDP"],
              ["MulticastSocket", "UDP multicast — underklasse av DatagramSocket", "UDP"],
            ].map(([cls, desc, proto]) => (
              <div key={cls} className="flex items-start gap-3">
                <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded ${proto === "TCP" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"}`}>{proto}</span>
                <div>
                  <code className="font-mono font-bold text-network-600 dark:text-network-400 text-sm">{cls}</code>
                  <span className="text-[var(--muted)] text-xs ml-2">— {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Collapsible title="TCP socket — programmeringsmodell" defaultOpen>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Server</p>
              <pre className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-xs overflow-x-auto">{`// 1. Opprett ServerSocket
ServerSocket ss = new ServerSocket(port);

// 2. Vent på tilkobling
while(true) {
  Socket s = ss.accept(); // blokkerende

  // 3. Les/skriv via streams
  InputStream in = s.getInputStream();
  OutputStream out = s.getOutputStream();

  // 4. Behandle forespørsel
  // ...

  // 5. Lukk tilkobling
  s.close();
}`}</pre>
            </div>
            <div>
              <p className="font-semibold text-green-700 dark:text-green-300 mb-2">Klient</p>
              <pre className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-xs overflow-x-auto">{`// 1. Opprett Socket (kobler automatisk)
Socket s = new Socket(hostname, port);

// 2. Hent strømmer
InputStream in = s.getInputStream();
OutputStream out = s.getOutputStream();

// 3. Send forespørsel
out.write(data);

// 4. Les svar
byte[] buf = in.readAllBytes();

// 5. Lukk
s.close();`}</pre>
            </div>
          </div>
        </Collapsible>

        <Collapsible title="UDP socket — programmeringsmodell">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Server</p>
              <pre className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-xs overflow-x-auto">{`// 1. Opprett DatagramSocket på port
DatagramSocket ss = new DatagramSocket(port);

// 2. Motta datagram
byte[] buf = new byte[1024];
DatagramPacket pkt =
    new DatagramPacket(buf, buf.length);
ss.receive(pkt); // blokkerende

// 3. Send svar tilbake til klient
InetAddress addr = pkt.getAddress();
int cPort = pkt.getPort();
DatagramPacket reply =
    new DatagramPacket(replyData,
        replyData.length, addr, cPort);
ss.send(reply);`}</pre>
            </div>
            <div>
              <p className="font-semibold text-green-700 dark:text-green-300 mb-2">Klient</p>
              <pre className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-xs overflow-x-auto">{`// 1. Opprett DatagramSocket (ingen port nødv.)
DatagramSocket cs = new DatagramSocket();

// 2. Lag destinasjonsadresse
InetAddress addr =
    InetAddress.getByName(hostname);

// 3. Send datagram
DatagramPacket pkt =
    new DatagramPacket(data,
        data.length, addr, serverPort);
cs.send(pkt);

// 4. Motta svar
byte[] buf = new byte[1024];
DatagramPacket reply =
    new DatagramPacket(buf, buf.length);
cs.receive(reply);
cs.close();`}</pre>
            </div>
          </div>
          <Warn>UDP er tilkoblingsløs — klienten MÅ inkludere avsenderadressen i pakken (den er inkludert automatisk i DatagramPacket). Serveren kan ikke anta noen forbindelse mellom pakker.</Warn>
        </Collapsible>

        <Card color="network">
          <h3 className="font-bold mb-2">Nøkkelforskjeller TCP vs UDP sockets</h3>
          <div className="overflow-x-auto">
            <table className="text-sm w-full border-collapse">
              <thead>
                <tr className="bg-network-50 dark:bg-network-950/20">
                  <th className="text-left p-2 border border-[var(--card-border)]">Egenskap</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">TCP</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">UDP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tilkobling", "Krever handshake (accept/connect)", "Ingen tilkobling"],
                  ["Klasse", "Socket / ServerSocket", "DatagramSocket"],
                  ["Datatype", "Strøm (stream)", "Datagram (pakke)"],
                  ["Pålitelighet", "Garantert levering, orden", "Upålitelig"],
                  ["Adressering", "Én gang ved oppkobling", "Hver pakke inneholder adresse"],
                  ["Eksempel", "HTTP, FTP, SMTP", "DNS, VoIP, streaming"],
                ].map(([eig, tcp, udp]) => (
                  <tr key={eig} className="border-b border-[var(--card-border)]">
                    <td className="p-2 font-semibold border border-[var(--card-border)] text-xs">{eig}</td>
                    <td className="p-2 border border-[var(--card-border)] text-xs">{tcp}</td>
                    <td className="p-2 border border-[var(--card-border)] text-xs">{udp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      {/* ── 7. Hva du MÅ kunne ── */}
      <Section title="7. Hva du MÅ kunne til eksamen">
        <Card color="gold">
          <ul className="text-sm space-y-2">
            {[
              "Forklare forskjellen mellom klient-server og P2P, inkludert self-scalability",
              "Beregne HTTP-tid for ikke-persistent og persistent tilkobling (med/uten pipeline)",
              "Forklare og tegne iterativt og rekursivt DNS-oppslag steg for steg",
              "Kjenne DNS RR-typene: A, AAAA, NS, CNAME, MX og hva de brukes til",
              "Forklare hva en conditional GET er og 304 Not Modified svaret",
              "Forklare cookies og web-caching (proxy)",
              "Kjenne forskjellen mellom SMTP (push), POP3 og IMAP",
              "Tegne/beskrive programmeringsmodellen for TCP og UDP sockets i Java",
              "Kjenne Java-klassene: Socket, ServerSocket, DatagramSocket",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-network-500 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>
    </div>
  );
}
