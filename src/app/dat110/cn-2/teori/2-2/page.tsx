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

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-neutral-900 text-green-300 rounded-lg p-4 text-xs overflow-x-auto font-mono leading-relaxed my-3">
      {children}
    </pre>
  );
}

export default function Page22() {
  const [activeStep, setActiveStep] = useState(0);

  const httpSteps = [
    { label: "1. TCP-tilkobling", desc: "Klienten åpner TCP-tilkobling til serveren på port 80 (eller 443 for HTTPS). Dette tar 1 RTT (round-trip time)." },
    { label: "2. HTTP-forespørsel", desc: "Klienten sender HTTP GET-forespørsel. Inneholder metode, URL, versjon og header-felt." },
    { label: "3. Server behandler", desc: "Serveren finner objektet, pakker det inn i HTTP-responsmeldingen." },
    { label: "4. HTTP-respons", desc: "Serveren sender HTTP-respons med statuskode (f.eks. 200 OK) og det forespurte objektet som entity body." },
    { label: "5. Lukk/gjenbruk", desc: "Ved ikke-persistent HTTP: TCP-tilkoblingen lukkes etter én forespørsel. Ved persistent: gjenbrukes til neste forespørsel." },
  ];

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/dat110/cn-2/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">2.2 HTTP og webben</span>
      </div>

      <h1 className="text-2xl font-bold mb-1 text-network-700 dark:text-network-300">2.2 HTTP og webben</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">HyperText Transfer Protocol — forespørsler, svar, tilkoblinger og caching</p>

      {/* --- INTRO --- */}
      <Section title="Hva er HTTP?">
        <p className="text-sm mb-3 leading-relaxed">
          HTTP (HyperText Transfer Protocol) er webens applikasjonslagsprotokoll og følger et <strong>forespørsel-svar</strong>-mønster.
          Den er definert i RFC 7230-7235. HTTP bygger på TCP (ikke UDP) som transportprotokoll — TCP brukes fordi HTTP krever pålitelig overføring av nettsideinnhold.
        </p>
        <Card color="network" title="Grunnleggende fakta om HTTP">
          <ul className="text-sm space-y-1">
            <li><strong>Klient:</strong> nettleseren som sender forespørsler og viser objekter</li>
            <li><strong>Server:</strong> webserveren (f.eks. Apache) som sender objekter som svar</li>
            <li><strong>HTTP er «tilstandsløs» (stateless):</strong> serveren husker INGENTING om tidligere forespørsler fra klienten</li>
            <li><strong>Transportprotokoll:</strong> TCP, typisk port 80 (HTTP) eller 443 (HTTPS)</li>
            <li><strong>Objekter:</strong> HTML-filer, JPEG-bilder, CSS, JavaScript — adressert med URL</li>
          </ul>
        </Card>

        <Card color="blue" title="URL-struktur">
          <p className="text-xs font-mono mb-2">{"<scheme>://<host>[:<port>]/<resource-path>"}</p>
          <p className="text-xs font-mono text-network-600 dark:text-network-300">http://www.example.com/index.html</p>
          <p className="text-xs font-mono text-network-600 dark:text-network-300">http://www.example.com:8080/api/data</p>
        </Card>

        <Card color="gold">
          <p className="text-sm"><strong>Hvorfor er HTTP stateless?</strong> Det forenkler serverdesignet enormt. Serveren trenger ikke holde rede på tilstand for tusenvis av samtidige klienter. Men det betyr også at applikasjoner som trenger tilstand (f.eks. handlekurv) må implementere det selv — det er her <strong>cookies</strong> kommer inn.</p>
        </Card>
      </Section>

      {/* --- HTTP FLOW INTERAKTIV --- */}
      <Section title="HTTP-flyten steg for steg">
        <p className="text-sm mb-3">Klikk på hvert steg for å forstå hva som skjer:</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {httpSteps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                activeStep === i
                  ? "bg-network-600 text-white border-network-600"
                  : "bg-[var(--card)] border-[var(--card-border)] hover:border-network-400"
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>

        <div className="bg-[var(--card)] border-2 border-network-400/40 rounded-xl p-4 min-h-[70px]">
          <p className="text-sm font-bold text-network-700 dark:text-network-300 mb-1">{httpSteps[activeStep].label}</p>
          <p className="text-sm">{httpSteps[activeStep].desc}</p>
        </div>

        {/* Sequence diagram SVG */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 mt-4 overflow-x-auto">
          <svg viewBox="0 0 500 280" className="w-full max-w-lg mx-auto" aria-label="HTTP sekvensdiagram">
            {/* Timeline lines */}
            <line x1="100" y1="30" x2="100" y2="260" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3"/>
            <line x1="400" y1="30" x2="400" y2="260" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3"/>

            {/* Labels */}
            <rect x="40" y="10" width="120" height="24" rx="6" fill="#0ea5e9" fillOpacity="0.2" stroke="#0ea5e9" strokeWidth="1.5"/>
            <text x="100" y="26" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Klient</text>
            <rect x="340" y="10" width="120" height="24" rx="6" fill="#0ea5e9" fillOpacity="0.2" stroke="#0ea5e9" strokeWidth="1.5"/>
            <text x="400" y="26" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Server</text>

            {/* Step 1: TCP SYN */}
            <line x1="100" y1="60" x2="390" y2="80" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowBlue)"/>
            <text x="250" y="60" textAnchor="middle" fill="#6366f1" fontSize="10">TCP SYN (åpne tilkobling)</text>

            {/* Step 2: TCP SYN-ACK */}
            <line x1="400" y1="90" x2="110" y2="110" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowBlue2)"/>
            <text x="250" y="107" textAnchor="middle" fill="#6366f1" fontSize="10">TCP SYN-ACK</text>

            {/* RTT label */}
            <text x="20" y="88" fill="#94a3b8" fontSize="9" textAnchor="middle">RTT</text>
            <line x1="20" y1="62" x2="20" y2="112" stroke="#94a3b8" strokeWidth="1" markerStart="url(#arrowUp)" markerEnd="url(#arrowDown)"/>

            {/* Step 3: HTTP GET */}
            <line x1="100" y1="120" x2="390" y2="140" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowBlue3)"/>
            <text x="250" y="118" textAnchor="middle" fill="#0ea5e9" fontSize="10" fontWeight="bold">HTTP GET /index.html HTTP/1.1</text>

            {/* Step 4: HTTP 200 OK */}
            <line x1="400" y1="150" x2="110" y2="200" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
            <text x="250" y="165" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">HTTP/1.1 200 OK + data</text>

            {/* RTT 2 label */}
            <text x="20" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">RTT</text>
            <line x1="20" y1="122" x2="20" y2="202" stroke="#94a3b8" strokeWidth="1"/>

            {/* Step 5: File received */}
            <rect x="60" y="205" width="80" height="24" rx="5" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
            <text x="100" y="221" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Fil mottatt</text>

            {/* Transmission time */}
            <line x1="400" y1="150" x2="400" y2="200" stroke="#10b981" strokeWidth="3" strokeOpacity="0.5"/>
            <text x="420" y="178" fill="#10b981" fontSize="9">overf.</text>

            <defs>
              <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#6366f1"/>
              </marker>
              <marker id="arrowBlue2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#6366f1"/>
              </marker>
              <marker id="arrowBlue3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#0ea5e9"/>
              </marker>
              <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#10b981"/>
              </marker>
            </defs>
          </svg>
          <p className="text-xs text-center text-[var(--muted)] mt-1">Ikke-persistent HTTP: total tid = 2 RTT + overføringstid for filen</p>
        </div>
      </Section>

      {/* --- MELDINGSSTRUKTUR --- */}
      <Section title="HTTP-meldingsstruktur">

        <h3 className="font-bold mb-2">HTTP-forespørsel (Request)</h3>
        <CodeBlock>{`GET /index.html HTTP/1.1\r\n
Host: www.example.com\r\n
Connection: keep-alive\r\n
Accept: text/html,application/xhtml+xml\r\n
Accept-Language: no\r\n
User-Agent: Mozilla/5.0 ...\r\n
\r\n
[entity body — tomt for GET]`}</CodeBlock>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900/30">
                <th className="border border-blue-200 dark:border-blue-800 px-2 py-1 text-left">Del</th>
                <th className="border border-blue-200 dark:border-blue-800 px-2 py-1 text-left">Innhold</th>
                <th className="border border-blue-200 dark:border-blue-800 px-2 py-1 text-left">Eksempel</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Request line", "Metode + URL + versjon", "GET /index.html HTTP/1.1"],
                ["Header lines", "Felt: Verdi par (CRLF avsluttet)", "Host: www.example.com"],
                ["Blank line", "CR LF — skiller header fra body", "(tom linje)"],
                ["Entity body", "Data (brukt ved POST/PUT)", "(tomt for GET)"],
              ].map(([del, inn, eks]) => (
                <tr key={del} className="even:bg-blue-50/50 dark:even:bg-blue-900/10">
                  <td className="border border-blue-200 dark:border-blue-800 px-2 py-1 font-mono font-bold">{del}</td>
                  <td className="border border-blue-200 dark:border-blue-800 px-2 py-1">{inn}</td>
                  <td className="border border-blue-200 dark:border-blue-800 px-2 py-1 font-mono text-blue-700 dark:text-blue-300">{eks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold mb-2">HTTP-respons (Response)</h3>
        <CodeBlock>{`HTTP/1.1 200 OK\r\n
Content-Encoding: gzip\r\n
Content-Type: text/html; charset=UTF-8\r\n
Content-Length: 606\r\n
Date: Tue, 15 Jan 2019 10:07:11 GMT\r\n
Last-Modified: Fri, 09 Aug 2013 23:54:35 GMT\r\n
Cache-Control: max-age=604800\r\n
\r\n
<!doctype html>
<html>...`}</CodeBlock>

        <Card color="gold" title="Viktige statuskoder — MÅ kunne">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-amber-100 dark:bg-amber-900/30">
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1">Kode</th>
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1 text-left">Frase</th>
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1 text-left">Betydning</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["200", "OK", "Forespørselen lyktes, objektet returneres"],
                  ["301", "Moved Permanently", "Objektet har ny permanent URL (gitt i Location-header)"],
                  ["304", "Not Modified", "Brukt av conditional GET — objektet er ikke endret, bruk cache"],
                  ["400", "Bad Request", "Serveren forstår ikke forespørselen"],
                  ["404", "Not Found", "Objektet finnes ikke på serveren"],
                  ["505", "HTTP Version Not Supported", "Serveren støtter ikke HTTP-versjonen"],
                ].map(([kode, frase, bet]) => (
                  <tr key={kode} className="even:bg-amber-50/50 dark:even:bg-amber-900/10">
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1 font-mono font-bold text-center">{kode}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1 font-medium">{frase}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1">{bet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      {/* --- HTTP METODER --- */}
      <Section title="HTTP-metoder">
        <p className="text-sm mb-3">HTTP definerer operasjoner (metoder) som kan utføres på ressurser:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900/30">
                <th className="border border-network-200 dark:border-network-700 px-3 py-2">Metode</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-left">Brukes til</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-left">Body?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["GET", "Hente et objekt fra server", "Nei"],
                ["POST", "Sende data til server (f.eks. skjemadata)", "Ja"],
                ["PUT", "Oppdatere/laste opp et objekt til server", "Ja"],
                ["DELETE", "Slette et objekt på server", "Nei"],
                ["HEAD", "Hente bare header (ikke body) — teste om objekt finnes", "Nei"],
              ].map(([m, b, bd]) => (
                <tr key={m} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 font-mono font-bold text-network-700 dark:text-network-300">{m}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2">{b}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2">{bd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Card color="blue">
          <p className="text-sm"><strong>REST-API-er</strong> bruker disse metodene systematisk: GET = les, POST = opprett, PUT = oppdater, DELETE = slett. HTTP er grunnlaget for REST-baserte webtjenester og WebSocket-protokollen.</p>
        </Card>
      </Section>

      {/* --- PERSISTENT VS NON-PERSISTENT --- */}
      <Section title="Persistent vs ikke-persistent HTTP">
        <p className="text-sm mb-3 leading-relaxed">
          Dette er et sentralt konsept! Avgjørelsen påvirker ytelse (antall RTT-er) og ressursbruk.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Card color="red" title="Ikke-persistent HTTP (HTTP/1.0)">
            <ul className="text-xs space-y-1">
              <li>Ny TCP-tilkobling for hvert objekt</li>
              <li>1 objekt per tilkobling</li>
              <li>Kostnad: <strong>2 RTT + overføringstid</strong> per objekt</li>
              <li>En nettside med 10 objekter krever 10 TCP-tilkoblinger</li>
              <li>OS-overhead for å opprette/lukke mange tilkoblinger</li>
            </ul>
          </Card>
          <Card color="green" title="Persistent HTTP (HTTP/1.1 standard)">
            <ul className="text-xs space-y-1">
              <li>Én TCP-tilkobling gjenbrukes for mange objekter</li>
              <li>Standard siden HTTP/1.1 (<code>Connection: keep-alive</code>)</li>
              <li>Server lukker tilkoblingen etter en viss inaktivitetstid</li>
              <li><strong>Pipelining:</strong> kan sende flere forespørsler uten å vente på svar</li>
              <li>Lavere forsinkelse og lavere OS-overhead</li>
            </ul>
          </Card>
        </div>

        <Card color="gold" title="RTT-beregning — eksempel">
          <p className="text-sm mb-2">En nettside med 1 HTML-fil + 5 bilder:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-red-100/50 dark:bg-red-900/20 p-2 rounded">
              <p className="font-bold">Ikke-persistent:</p>
              <p>= 6 × (2 RTT + t_obj)</p>
              <p>= 12 RTT + 6 overføringer</p>
            </div>
            <div className="bg-green-100/50 dark:bg-green-900/20 p-2 rounded">
              <p className="font-bold">Persistent (m/pipelining):</p>
              <p>≈ 1 TCP-handshake + 1 RTT</p>
              <p>≈ 2 RTT totalt (grovt)</p>
            </div>
          </div>
        </Card>

        <ExamTip>Ikke-persistent HTTP: 2 RTT per objekt (1 RTT for TCP, 1 RTT for HTTP). Persistent HTTP med pipelining er mye mer effektivt.</ExamTip>
      </Section>

      {/* --- HTTP VERSJONER --- */}
      <Section title="HTTP-versjoner">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900/30">
                <th className="border border-network-200 dark:border-network-700 px-3 py-2">Versjon</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-left">Nøkkelegenskaper</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["HTTP/1.0", "Ikke-persistent som standard. Én forespørsel per tilkobling. Enkelt, men ineffektivt."],
                ["HTTP/1.1", "Persistent tilkoblinger som standard. Pipelining (sende multiple forespørsler). Host-header påkrevd. Chunked transfer encoding."],
                ["HTTP/2.0", "Multiplexing: multiple forespørsler over én tilkobling parallelt (løser HOL-blocking). Header-komprimering. Server push. Binær framing (ikke tekst)."],
                ["HTTP/3.0", "Bygger på QUIC (over UDP, ikke TCP). Enda lavere latens, bedre håndtering av pakketap."],
              ].map(([v, e]) => (
                <tr key={v} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 font-mono font-bold text-network-700 dark:text-network-300 whitespace-nowrap">{v}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-xs">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* --- COOKIES --- */}
      <Section title="Cookies — tilstand over HTTP">
        <p className="text-sm mb-3 leading-relaxed">
          HTTP er stateless, men applikasjoner trenger ofte tilstand (hvem er logget inn? Hva er i handlekurven?).
          Løsningen er <strong>cookies</strong> — små tekststykker lagret hos klienten.
        </p>

        <Collapsible title="Hvordan cookies fungerer (4 komponenter)" defaultOpen={true}>
          <ol className="text-sm space-y-2 list-decimal ml-4">
            <li><strong>Set-Cookie-header i HTTP-responsen</strong> fra serveren: <code className="bg-black/10 dark:bg-white/10 px-1 rounded">Set-Cookie: userID=1678</code></li>
            <li><strong>Cookie-fil lagret hos klienten</strong> av nettleseren</li>
            <li><strong>Cookie-header i fremtidige HTTP-forespørsler</strong>: <code className="bg-black/10 dark:bg-white/10 px-1 rounded">Cookie: userID=1678</code></li>
            <li><strong>Cookie-database på serveren</strong> som kobler cookie-ID til brukerinformasjon</li>
          </ol>
          <Card color="blue">
            <p className="text-sm"><strong>Brukes til:</strong> autentisering, handlekurv, brukerpreferanser, anbefalingssystemer, sporing</p>
            <p className="text-sm mt-1"><strong>Personvern:</strong> cookies kan brukes til å spore brukere på tvers av nettsteder — omstridt!</p>
          </Card>
        </Collapsible>
      </Section>

      {/* --- WEB CACHING --- */}
      <Section title="Web-caching og proxy-servere">
        <p className="text-sm mb-3 leading-relaxed">
          En <strong>web-cache</strong> (eller proxy-server) er en nettverksenhet som lagrer kopier av nylig forespurte objekter.
          Den fungerer som <em>både klient</em> (mot opprinnelsesserveren) og <em>server</em> (mot klientene).
        </p>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 mb-4 overflow-x-auto">
          <svg viewBox="0 0 520 160" className="w-full max-w-lg mx-auto" aria-label="Web-cache diagram">
            {/* Client */}
            <rect x="10" y="60" width="80" height="40" rx="6" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="1.5"/>
            <text x="50" y="85" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Klient</text>

            {/* Cache / Proxy */}
            <rect x="200" y="50" width="100" height="60" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="250" y="78" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Cache /</text>
            <text x="250" y="93" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Proxy</text>
            <text x="250" y="108" textAnchor="middle" fill="#f59e0b" fontSize="9">lokalt lager</text>

            {/* Origin server */}
            <rect x="420" y="60" width="90" height="40" rx="6" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
            <text x="465" y="78" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">Opprinnelses-</text>
            <text x="465" y="92" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">server</text>

            {/* Arrows */}
            <line x1="90" y1="80" x2="200" y2="80" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#a1)"/>
            <line x1="300" y1="70" x2="420" y2="70" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#a2)" strokeDasharray="4,3"/>
            <line x1="420" y1="90" x2="300" y2="90" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#a3)" strokeDasharray="4,3"/>
            <line x1="200" y1="90" x2="90" y2="90" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#a4)"/>

            {/* Labels */}
            <text x="145" y="73" textAnchor="middle" fill="#0ea5e9" fontSize="9">forespørsel</text>
            <text x="360" y="65" textAnchor="middle" fill="#6366f1" fontSize="9">hvis ikke i cache</text>
            <text x="360" y="100" textAnchor="middle" fill="#10b981" fontSize="9">svar fra server</text>
            <text x="145" y="100" textAnchor="middle" fill="#10b981" fontSize="9">svar til klient</text>

            {/* Cache hit label */}
            <text x="250" y="145" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Cache HIT: svar direkte (rask!)</text>
            <text x="250" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Cache MISS: hent fra opprinnelsesserver</text>

            <defs>
              <marker id="a1" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#0ea5e9"/></marker>
              <marker id="a2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#6366f1"/></marker>
              <marker id="a3" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#10b981"/></marker>
              <marker id="a4" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#10b981"/></marker>
            </defs>
          </svg>
        </div>

        <Card color="network" title="Fordeler med web-caching">
          <ul className="text-sm space-y-1">
            <li><strong>Reduserer responstid</strong> for klienter — cache er nærmere klienten enn opprinnelsesserveren</li>
            <li><strong>Reduserer trafikk</strong> på institusjonens tilgangslenke til Internett</li>
            <li><strong>Avlaster opprinnelsesserveren</strong> — serveren mottar færre forespørsler</li>
          </ul>
        </Card>

        <h3 className="font-bold mt-4 mb-2">Conditional GET — holde cachen oppdatert</h3>
        <p className="text-sm mb-3">
          Problemet: cachen kan inneholde utdaterte (stale) objekter. Løsningen er <strong>Conditional GET</strong>:
          cachen sender en GET-forespørsel med <code className="bg-black/10 dark:bg-white/10 px-1 rounded">If-Modified-Since</code>-headeren.
        </p>

        <CodeBlock>{`// Cachen sender:
GET /index.html HTTP/1.1
Host: www.example.com
If-Modified-Since: Wed, 09 Sep 2015 09:23:24 GMT

// Svar hvis IKKE endret siden da:
HTTP/1.1 304 Not Modified
(ingen entity body — sparer båndbredde!)

// Svar hvis endret:
HTTP/1.1 200 OK
Last-Modified: [ny dato]
[ny body]`}</CodeBlock>

        <ExamTip>Conditional GET returnerer statuskode <strong>304 Not Modified</strong> (ingen body) hvis objektet er uendret. Dette sparer båndbredde!</ExamTip>
      </Section>

      {/* --- VANLIGE FEIL --- */}
      <Section title="Vanlige feil og misforståelser">
        <Warn>HTTP bruker TCP, ikke UDP. HTTP krever pålitelig overføring.</Warn>
        <Warn>HTTP er «stateless» betyr at serveren ikke husker noe mellom separate forespørsler. Cookies er mekanismen for å legge til tilstand.</Warn>
        <Warn>Ikke-persistent HTTP krever 2 RTT per objekt (1 for TCP-handshake, 1 for HTTP forespørsel+svar). Mange studenter glemmer TCP-RTT-en.</Warn>
        <Warn>HTTP/1.1 er persistent som standard — ikke HTTP/1.0. HTTP/1.0 er ikke-persistent som standard.</Warn>
      </Section>

      {/* Nav */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-2/teori/2-1" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">← 2.1 Nettverksapplikasjoner</Link>
        <Link href="/dat110/cn-2/teori/2-4" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">2.4 DNS →</Link>
      </div>
    </div>
  );
}
