"use client";

import { useState } from "react";
import Link from "next/link";

function Card({ color = "blue", children }: { color?: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-cyan-400/60 bg-cyan-50 dark:bg-cyan-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
    purple: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
  };
  return <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>{children}</div>;
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
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

function MustKnow({ items }: { items: string[] }) {
  return (
    <Card color="gold">
      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MÅ kunne</h3>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-amber-500 mt-0.5 shrink-0">★</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

type FirewallRule = {
  action: "tillat" | "blokker";
  srcIP: string;
  destIP: string;
  protocol: string;
  port: string;
  reason: string;
};

function FirewallDemo() {
  const rules: FirewallRule[] = [
    { action: "tillat", srcIP: "Alle", destIP: "Interne", protocol: "TCP", port: "80, 443", reason: "Web-trafikk inn er OK" },
    { action: "tillat", srcIP: "Alle", destIP: "Interne", protocol: "TCP", port: "25", reason: "E-post inn er OK" },
    { action: "blokker", srcIP: "Alle", destIP: "Interne", protocol: "TCP", port: "23", reason: "Telnet er usikker" },
    { action: "tillat", srcIP: "Interne", destIP: "Alle", protocol: "TCP", port: "Alle >1024", reason: "Interne kan bruke web" },
    { action: "blokker", srcIP: "Alle", destIP: "Alle", protocol: "ICMP", port: "–", reason: "Stopp ping-scanning" },
  ];

  const [testSrc, setTestSrc] = useState("Ekstern");
  const [testDest, setTestDest] = useState("Intern");
  const [testPort, setTestPort] = useState("80");
  const [testProto, setTestProto] = useState("TCP");

  // Enkel matchingslogikk for demo
  const matchedRule = rules.find(r => {
    const portNum = parseInt(testPort);
    if (testProto === "ICMP" && r.protocol === "ICMP") return true;
    if (r.protocol !== testProto) return false;
    if (r.port.includes(testPort)) return true;
    if (r.port.includes(">1024") && portNum > 1024 && testSrc === "Intern") return true;
    return false;
  });

  return (
    <div className="rounded-xl border-2 border-red-400/60 bg-red-50 dark:bg-red-950/20 p-4">
      <h4 className="font-bold text-red-700 dark:text-red-400 mb-3">Brannmur-regelbase — demo</h4>

      {/* Regelbase */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-red-100 dark:bg-red-900/30">
              <th className="border border-red-300 px-2 py-1 text-left">Handling</th>
              <th className="border border-red-300 px-2 py-1 text-left">Kilde IP</th>
              <th className="border border-red-300 px-2 py-1 text-left">Dest IP</th>
              <th className="border border-red-300 px-2 py-1 text-left">Protokoll</th>
              <th className="border border-red-300 px-2 py-1 text-left">Port</th>
              <th className="border border-red-300 px-2 py-1 text-left">Begrunnelse</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r, i) => (
              <tr key={i} className={r.action === "tillat" ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"}>
                <td className={`border border-red-200 px-2 py-1 font-bold ${r.action === "tillat" ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>{r.action.toUpperCase()}</td>
                <td className="border border-red-200 px-2 py-1 font-mono">{r.srcIP}</td>
                <td className="border border-red-200 px-2 py-1 font-mono">{r.destIP}</td>
                <td className="border border-red-200 px-2 py-1 font-mono">{r.protocol}</td>
                <td className="border border-red-200 px-2 py-1 font-mono">{r.port}</td>
                <td className="border border-red-200 px-2 py-1 text-[var(--muted)]">{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Test-panel */}
      <div className="rounded-lg bg-white dark:bg-neutral-800 border border-red-200 p-3">
        <p className="font-bold text-sm mb-2">Test en pakke:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
          <select value={testSrc} onChange={e => setTestSrc(e.target.value)} className="rounded border border-[var(--card-border)] px-2 py-1 text-xs bg-[var(--card)] focus:outline-none">
            <option>Ekstern</option>
            <option>Intern</option>
          </select>
          <select value={testDest} onChange={e => setTestDest(e.target.value)} className="rounded border border-[var(--card-border)] px-2 py-1 text-xs bg-[var(--card)] focus:outline-none">
            <option>Intern</option>
            <option>Ekstern</option>
          </select>
          <select value={testProto} onChange={e => setTestProto(e.target.value)} className="rounded border border-[var(--card-border)] px-2 py-1 text-xs bg-[var(--card)] focus:outline-none">
            <option>TCP</option>
            <option>UDP</option>
            <option>ICMP</option>
          </select>
          <input value={testPort} onChange={e => setTestPort(e.target.value)} placeholder="Port (f.eks. 80)" className="rounded border border-[var(--card-border)] px-2 py-1 text-xs bg-[var(--card)] focus:outline-none focus:ring-1 focus:ring-red-400" />
        </div>
        {matchedRule ? (
          <div className={`rounded p-2 text-xs font-bold ${matchedRule.action === "tillat" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
            {matchedRule.action === "tillat" ? "TILLATT" : "BLOKKERT"} — {matchedRule.reason}
          </div>
        ) : (
          <div className="rounded p-2 text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            BLOKKERT — Ingen matchende regel (standardregel: blokker alt)
          </div>
        )}
      </div>
    </div>
  );
}

export default function CN8_9Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">8.9 Brannmur og IDS</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 8.9</p>
        <h1 className="text-2xl font-bold mb-2">Brannmur og IDS</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Kryptering beskytter innholdet i pakker. Men hvem slipper hvilke pakker inn i nettverket?
          Brannmurer filtrerer trafikk basert på regler. IDS/IPS oppdager og stopper angrep.
          Disse utgjør perimetersikringen av et nettverk.
        </p>
      </div>

      <MustKnow items={[
        "Brannmur = nettverkskomponent som kontrollerer inn- og utgående trafikk basert på regler",
        "Stateless (pakkefiltrering): Ser på hver pakke isolert. Enkel, men begrenset.",
        "Stateful inspection: Husker tilkoblingstilstand. Vet om TCP-forbindelser er etablert.",
        "Application gateway (proxy): Forstår applikasjonsprotokoll (HTTP, FTP). Kan inspisere innhold.",
        "IDS = Intrusion Detection System = OPPDAGER angrep (passiv). IPS = STOPPER angrep (aktiv).",
        "Signaturbasert IDS: Kjenner kjente angrep. Anomalibasert: Oppdager avvik fra normalt mønster.",
      ]} />

      <Section title="1. Brannmurtyper" defaultOpen={true}>
        <div className="space-y-4">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">1. Pakkefiltrering (Stateless)</h4>
            <p className="text-sm mb-2">Sjekker hvert pakke <em>uavhengig</em> mot en regelbase. Ser på:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                "Kilde IP-adresse",
                "Destinasjons IP-adresse",
                "Protokoll (TCP/UDP/ICMP)",
                "Kilde-port",
                "Destinasjons-port",
                "TCP-flagg (SYN, ACK, FIN)",
              ].map(field => (
                <div key={field} className="rounded bg-blue-100 dark:bg-blue-900/30 px-2 py-1 font-mono">{field}</div>
              ))}
            </div>
            <div className="mt-2 grid sm:grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-bold text-green-600 dark:text-green-400">Fordeler:</p>
                <ul className="list-disc list-inside space-y-0.5 text-[var(--muted)]">
                  <li>Enkel og rask</li>
                  <li>Lav latens</li>
                  <li>Transparent for brukere</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-red-600 dark:text-red-400">Ulemper:</p>
                <ul className="list-disc list-inside space-y-0.5 text-[var(--muted)]">
                  <li>Kan ikke spore tilkoblingstilstand</li>
                  <li>Sårbar for IP-spoofing</li>
                  <li>Ingen applikasjonsforståelse</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card color="purple">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">2. Stateful Inspection</h4>
            <p className="text-sm mb-2">Holder en <strong>tilkoblingstabells</strong> over aktive TCP/UDP-sesjoner. Kan tillate svar-pakker for etablerte tilkoblinger automatisk:</p>
            <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-3">
              <div className="grid grid-cols-4 gap-1 text-[var(--muted)] mb-1">
                <span>Kilde IP</span><span>Dest IP</span><span>Port</span><span>Tilstand</span>
              </div>
              {[
                ["10.0.0.5", "8.8.8.8", "53", "ESTABLISHED"],
                ["10.0.0.3", "93.184.216.34", "80", "SYN_SENT"],
                ["10.0.0.7", "142.250.74.46", "443", "ESTABLISHED"],
              ].map(([src, dst, port, state]) => (
                <div key={src + port} className="grid grid-cols-4 gap-1 text-xs">
                  <span>{src}</span><span>{dst}</span><span>{port}</span>
                  <span className={state === "ESTABLISHED" ? "text-green-500" : "text-amber-500"}>{state}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">Svar-pakker tillates automatisk hvis tilkoblingen er i tabellen. Pakker uten tilhørende tilstand blokkeres.</p>
          </Card>

          <Card color="green">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">3. Application Gateway (Proxy-brannmur)</h4>
            <p className="text-sm mb-2">Forstår spesifikke applikasjonsprotokoller. Agerer som <em>proxy</em> — klienten snakker med brannmuren, brannmuren snakker med serveren:</p>
            <div className="text-center text-sm font-mono bg-white dark:bg-neutral-800 rounded p-2">
              Klient ↔ [Applikasjons-gateway] ↔ Server
            </div>
            <ul className="text-sm list-disc list-inside space-y-1 mt-2">
              <li>Kan inspisere HTTP-innhold (blokkere JavaScript, virus)</li>
              <li>FTP-proxy kan begrense kommandoer</li>
              <li>SSL-terminering og re-kryptering</li>
              <li>Kan autentisere brukere mot Active Directory</li>
            </ul>
            <p className="text-xs text-[var(--muted)] mt-2">Ulempe: høyere latens, krever én proxy per protokoll</p>
          </Card>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2">Brannmurtype</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Ser på</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Hastighet</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Sikkerhet</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Stateless pakkefilter", "IP/port/protokoll", "Rask", "Lav"],
                ["Stateful inspection", "IP/port + tilstand", "Middels", "Middels"],
                ["Application gateway", "Applikasjonsdata", "Tregere", "Høy"],
              ].map(([type, sees, speed, sec]) => (
                <tr key={type} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold">{type}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-mono text-xs">{sees}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2">{speed}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2">{sec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="2. Brannmurregler — eksempel">
        <p className="text-sm text-[var(--muted)] mb-3">Regler evalueres i rekkefølge — første match vinner. Standardregelen er vanligvis "blokker alt":</p>
        <FirewallDemo />

        <Card color="gold">
          <h4 className="font-bold mb-2">DMZ — Demilitarisert sone</h4>
          <p className="text-sm mb-2">En typisk nettverksarkitektur har tre soner:</p>
          <div className="rounded-lg bg-white dark:bg-neutral-800 border border-[var(--card-border)] p-3 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="rounded bg-red-100 dark:bg-red-900/30 border border-red-300 px-3 py-1">Internett (utrudd)</div>
              <span>→ Ytre brannmur →</span>
              <div className="rounded bg-amber-100 dark:bg-amber-900/30 border border-amber-300 px-3 py-1">DMZ (webservere, DNS)</div>
              <span>→ Indre brannmur →</span>
              <div className="rounded bg-green-100 dark:bg-green-900/30 border border-green-300 px-3 py-1">Internt nettverk</div>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">DMZ er "mellomland": tilgjengelig fra internett, men isolert fra det interne nettverket. Webservere, e-postservere og DNS plasseres her.</p>
        </Card>
      </Section>

      <Section title="3. IDS og IPS — Inntrengningsdeteksjon">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">IDS — Intrusion Detection System</h4>
            <p className="text-sm mb-2"><strong>Passiv</strong> overvåking. Analyserer trafikk og genererer alarm ved mistenkelig aktivitet, men <em>stopper ikke</em> trafikken.</p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Plasseres på en "kopi" av trafikken (SPAN-port)</li>
              <li>Null latens for normal trafikk</li>
              <li>Kan ikke stoppe angrep i sanntid</li>
              <li>God for logganalyse og forensics</li>
            </ul>
          </Card>
          <Card color="red">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">IPS — Intrusion Prevention System</h4>
            <p className="text-sm mb-2"><strong>Aktiv</strong> blokkering. Sitter <em>inline</em> i trafikken og kan stoppe angrep i sanntid.</p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>All trafikk går gjennom IPS</li>
              <li>Kan blokkere, droppe eller resette tilkoblinger</li>
              <li>Risiko for "false positives" — blokkere legitim trafikk</li>
              <li>Høyere kostnad og latens</li>
            </ul>
          </Card>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">IDS vs IPS — et valg om risiko</h4>
          <p className="text-sm">IDS: Oppdager men stopper ikke. Angrep kan lykkes, men du oppdager det og kan reagere. IPS: Stopper angrep, men false positives kan blokkere legitim trafikk (f.eks. stenger ute alle fra et land). I praksis brukes ofte begge.</p>
        </Card>
      </Section>

      <Section title="4. Deteksjonsmetoder">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="purple">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Signaturbasert deteksjon</h4>
            <p className="text-sm mb-2">Sammenligner trafikk mot en database med kjente angreps-signaturer (mønstre).</p>
            <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-2 space-y-1">
              <p>Signatur: alert tcp any -&gt; 80 (content:"/etc/passwd";)</p>
              <p className="text-[var(--muted)]">↑ Snort-regel for LFI-forsøk</p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              <div>
                <p className="font-bold text-green-600 dark:text-green-400">Fordeler:</p>
                <ul className="list-disc list-inside text-[var(--muted)]">
                  <li>Rask og presis</li>
                  <li>Lav false positive-rate</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-red-600 dark:text-red-400">Ulemper:</p>
                <ul className="list-disc list-inside text-[var(--muted)]">
                  <li>Blind for nye angrep</li>
                  <li>Krever oppdatering</li>
                </ul>
              </div>
            </div>
          </Card>
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Anomalibasert deteksjon</h4>
            <p className="text-sm mb-2">Lærer hva "normalt" er og varsler om avvik fra normen.</p>
            <div className="text-xs bg-white dark:bg-neutral-800 rounded p-2 space-y-1">
              <p>Normal: 1000 pakker/sek fra 10.0.0.5</p>
              <p className="text-red-500">Avvik: 100 000 pakker/sek = alarm!</p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              <div>
                <p className="font-bold text-green-600 dark:text-green-400">Fordeler:</p>
                <ul className="list-disc list-inside text-[var(--muted)]">
                  <li>Oppdager nye angrep</li>
                  <li>Zero-day deteksjon</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-red-600 dark:text-red-400">Ulemper:</p>
                <ul className="list-disc list-inside text-[var(--muted)]">
                  <li>Høy false positive-rate</li>
                  <li>Vanskelig å konfigurere</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card color="network">
          <h4 className="font-bold mb-2">Deep Packet Inspection (DPI)</h4>
          <p className="text-sm">Neste generasjon brannmurer (NGFW) kombinerer tradisjonell brannmur med IPS og applikasjonsbevissthet. De kan inspisere innholdet i pakker (Layer 7) og ta beslutninger basert på applikasjon, bruker og innhold — ikke bare IP/port.</p>
        </Card>
      </Section>

      <Section title="5. Plassering i nettverket">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">Typisk nettverksarkitektur:</h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="rounded bg-red-50 dark:bg-red-950/20 border border-red-300 p-2 text-center">
              Internett / Ekstern trafikk
            </div>
            <div className="text-center text-[var(--muted)]">↕</div>
            <div className="rounded bg-orange-50 dark:bg-orange-950/20 border border-orange-300 p-2 text-center font-bold">
              BRANNMUR (+ IPS inline)
            </div>
            <div className="text-center text-[var(--muted)]">↕</div>
            <div className="rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-300 p-2 text-center">
              DMZ: Webserver | DNS | E-postserver
            </div>
            <div className="text-center text-[var(--muted)]">↕</div>
            <div className="rounded bg-orange-50 dark:bg-orange-950/20 border border-orange-300 p-2 text-center font-bold">
              INDRE BRANNMUR (+ IDS på SPAN-port)
            </div>
            <div className="text-center text-[var(--muted)]">↕</div>
            <div className="rounded bg-green-50 dark:bg-green-950/20 border border-green-300 p-2 text-center">
              Internt nettverk: Klienter | Database | AD
            </div>
          </div>
        </div>
      </Section>

      <Section title="6. Vanlige angrep og forsvar">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-red-50 dark:bg-red-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Angrep</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Beskrivelse</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Forsvar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["DoS/DDoS", "Overbelaste server med trafikk", "Rate limiting, blackholing, CDN"],
                ["Port scanning", "Kartlegge åpne porter", "Brannmur blokkerer portscan-mønstre"],
                ["IP spoofing", "Forfalsk avsender-IP", "Egress filtering, stateful inspection"],
                ["SYN flood", "Sende mange SYN uten å fullføre handshake", "SYN cookies, rate limiting"],
                ["Ping of Death", "ICMP-pakke større enn 65 535 bytes", "Patching, ICMP-blokkering"],
                ["Smurf attack", "Broadcast ping med forfalsket kilde-IP", "Slå av directed broadcast"],
              ].map(([attack, desc, defense]) => (
                <tr key={attack} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold text-red-700 dark:text-red-400">{attack}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{desc}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-green-700 dark:text-green-400">{defense}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Card color="red">
        <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamenstips — 8.9</h4>
        <ul className="text-sm space-y-1">
          <li>• Stateless vs stateful: Stateless ser hver pakke isolert. Stateful husker tilkoblingstilstand.</li>
          <li>• IDS oppdager, IPS stopper — IDS er passiv (SPAN-port), IPS er aktiv (inline)</li>
          <li>• Application gateway = proxy — eneste som forstår applikasjonsinnhold (HTTP, FTP, etc.)</li>
          <li>• Signaturbasert: rask, presis, blind for nye angrep. Anomali: fanger alt nytt, mange false positives</li>
          <li>• DMZ = mellomnettverk for offentlig-tilgjengelige servere (web, DNS, e-post)</li>
        </ul>
      </Card>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-8/teori/8-6" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 8.6 TLS/SSL
        </Link>
        <Link href="/dat110/cn-8/teori/ds-9" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          DS 9 Sikkerhet i distribuerte systemer →
        </Link>
      </div>
    </div>
  );
}
