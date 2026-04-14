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

export default function Page24() {
  const [dnsStep, setDnsStep] = useState(0);

  const iterativeSteps = [
    { from: "Din PC", to: "Lokal DNS", msg: "Hva er IP-en til www.amazon.com?" },
    { from: "Lokal DNS", to: "Root DNS Server", msg: "Hva er IP-en til www.amazon.com?" },
    { from: "Root DNS Server", to: "Lokal DNS", msg: "Spør TLD-serveren for .com: 192.5.6.30" },
    { from: "Lokal DNS", to: "TLD DNS (.com)", msg: "Hva er IP-en til www.amazon.com?" },
    { from: "TLD DNS (.com)", to: "Lokal DNS", msg: "Spør autoritativ server for amazon.com: 205.251.196.1" },
    { from: "Lokal DNS", to: "Autoritativ (amazon.com)", msg: "Hva er IP-en til www.amazon.com?" },
    { from: "Autoritativ (amazon.com)", to: "Lokal DNS", msg: "www.amazon.com = 205.251.242.103" },
    { from: "Lokal DNS", to: "Din PC", msg: "www.amazon.com = 205.251.242.103 (lagres i cache)" },
  ];

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/dat110/cn-2/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">2.4 DNS — domenenavnsystemet</span>
      </div>

      <h1 className="text-2xl font-bold mb-1 text-network-700 dark:text-network-300">2.4 DNS — domenenavnsystemet</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">Internetts «telefonbok» — oversetter domenenavn til IP-adresser</p>

      {/* --- INTRO --- */}
      <Section title="Hva er DNS og hvorfor trenger vi det?">
        <p className="text-sm mb-3 leading-relaxed">
          Mennesker husker domenenavn (som <strong>www.google.com</strong>), men datamaskiner bruker IP-adresser (som <strong>142.250.74.196</strong>).
          DNS (Domain Name System) er den tjenesten som oversetter mellom disse to.
        </p>
        <Card color="gold" title="Hoved-formål med DNS (eksamensspørsmål!)">
          <p className="text-sm font-bold">DNS mapper <em>vertsnavn</em> til <em>IP-adresser</em>.</p>
          <p className="text-sm mt-2">DNS tilbyr også: vertsnavn-alias (CNAME), postserveraliaser (MX), og lastbalansering (flere IP-er for ett navn).</p>
        </Card>

        <ExamTip>Eksamen 2025 Oppgave 1e: «What is the main purpose of DNS?» Svar: <strong>Mapping of hostnames to IP addresses</strong>. Ikke til link-layer-adresser (det er ARP), ikke til filer (det er URL-er).</ExamTip>

        <Card color="blue">
          <p className="text-sm">
            <strong>DNS er distribuert og hierarkisk</strong> — ikke én enkelt database. Hvorfor?
            Én sentralisert server ville bli et enkelt feilpunkt, ha kapasitetsproblemer, og ha høy forsinkelse for fjerne klienter.
            Den distribuerte hierarkiske designen gir skalerbarhet og robusthet.
          </p>
        </Card>

        <p className="text-sm mt-3 leading-relaxed">
          DNS er en <strong>applikasjonslagsprotokoll</strong> (ikke infrastruktur) som bruker <strong>UDP på port 53</strong>
          (korte meldinger, tåler tap og gjentas). For svært store svar brukes TCP.
        </p>
      </Section>

      {/* --- HIERARKI --- */}
      <Section title="DNS-hierarkiet — tre nivåer">
        <p className="text-sm mb-4">DNS er organisert som et omvendt tre med tre hovednivåer av navneservere:</p>

        {/* Hierarchy tree SVG */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 mb-4 overflow-x-auto">
          <svg viewBox="0 0 560 300" className="w-full" aria-label="DNS-hierarki-tre">
            {/* Root */}
            <rect x="220" y="10" width="120" height="40" rx="8" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2"/>
            <text x="280" y="35" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Root DNS</text>

            {/* TLD level */}
            <rect x="40" y="100" width="100" height="40" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x="90" y="118" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">.com TLD</text>
            <text x="90" y="132" textAnchor="middle" fill="#94a3b8" fontSize="9">Verisign</text>

            <rect x="170" y="100" width="100" height="40" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x="220" y="118" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">.org TLD</text>
            <text x="220" y="132" textAnchor="middle" fill="#94a3b8" fontSize="9">PIR</text>

            <rect x="300" y="100" width="100" height="40" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x="350" y="118" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">.no TLD</text>
            <text x="350" y="132" textAnchor="middle" fill="#94a3b8" fontSize="9">Norid</text>

            <rect x="430" y="100" width="100" height="40" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x="480" y="118" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">.edu TLD</text>

            {/* Authoritative level */}
            <rect x="20" y="210" width="110" height="40" rx="8" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="1.5"/>
            <text x="75" y="228" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">amazon.com</text>
            <text x="75" y="242" textAnchor="middle" fill="#94a3b8" fontSize="9">autoritativ</text>

            <rect x="150" y="210" width="110" height="40" rx="8" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="1.5"/>
            <text x="205" y="228" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">google.com</text>
            <text x="205" y="242" textAnchor="middle" fill="#94a3b8" fontSize="9">autoritativ</text>

            <rect x="280" y="210" width="110" height="40" rx="8" fill="#0ea5e9" fillOpacity="0.15" stroke="#0ea5e9" strokeWidth="1.5"/>
            <text x="335" y="228" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">hvl.no</text>
            <text x="335" y="242" textAnchor="middle" fill="#94a3b8" fontSize="9">autoritativ</text>

            {/* Lines */}
            <line x1="280" y1="50" x2="90" y2="100" stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1="280" y1="50" x2="220" y2="100" stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1="280" y1="50" x2="350" y2="100" stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1="280" y1="50" x2="480" y2="100" stroke="#94a3b8" strokeWidth="1.5"/>

            <line x1="90" y1="140" x2="75" y2="210" stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1="90" y1="140" x2="205" y2="210" stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1="350" y1="140" x2="335" y2="210" stroke="#94a3b8" strokeWidth="1.5"/>

            {/* Level labels */}
            <text x="550" y="35" textAnchor="end" fill="#ef4444" fontSize="10" fontWeight="bold">Nivå 1: Root</text>
            <text x="550" y="125" textAnchor="end" fill="#f59e0b" fontSize="10" fontWeight="bold">Nivå 2: TLD</text>
            <text x="550" y="235" textAnchor="end" fill="#0ea5e9" fontSize="10" fontWeight="bold">Nivå 3: Autoritativ</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card color="red" title="Root DNS-servere">
            <p className="text-xs">13 logiske root-servere (A til M), hundrevis av fysiske servere over hele verden. Vet hvor TLD-serverene er. Kritisk infrastruktur.</p>
          </Card>
          <Card color="gold" title="TLD-servere">
            <p className="text-xs">Håndterer topp-nivå-domener som .com, .org, .no, .edu. Vet hvilke autoritative DNS-servere som håndterer hvert domene.</p>
          </Card>
          <Card color="blue" title="Autoritative DNS-servere">
            <p className="text-xs">Organisasjonens egne DNS-servere. Gir autoritativ oversettelse for organisasjonens vertsnavn (f.eks. hvl.no → IP). Kan vedlikeholdes av organisasjonen selv eller en DNS-tilbyder.</p>
          </Card>
        </div>

        <Card color="network">
          <p className="text-sm"><strong>Lokal DNS-server</strong> (ikke formelt i hierarkiet): Hver ISP og institusjon har en lokal DNS-server (default name server).
          Alle DNS-forespørsler fra din maskin går gjennom den lokale DNS-serveren, som fungerer som mellommann/proxy.</p>
        </Card>
      </Section>

      {/* --- DNS OPPSLAG --- */}
      <Section title="Iterativt vs rekursivt DNS-oppslag">

        <h3 className="font-bold mb-3">Iterativt oppslag (mest vanlig)</h3>
        <p className="text-sm mb-3 leading-relaxed">
          I iterativt oppslag gjør den <strong>lokale DNS-serveren</strong> all jobben med å kontakte serverne.
          Hver server svarer med en «pekepinn» til neste server (ikke det endelige svaret).
          Den lokale DNS-serveren itererer gjennom hierarkiet til den får svaret.
        </p>

        {/* Interactive steps */}
        <div className="flex flex-wrap gap-2 mb-3">
          {iterativeSteps.map((step, i) => (
            <button
              key={i}
              onClick={() => setDnsStep(i)}
              className={`px-2 py-1 rounded text-xs font-bold border transition-colors ${
                dnsStep === i
                  ? "bg-network-600 text-white border-network-600"
                  : "bg-[var(--card)] border-[var(--card-border)] hover:border-network-400"
              }`}
            >
              Steg {i + 1}
            </button>
          ))}
        </div>

        <div className="bg-[var(--card)] border-2 border-network-400/40 rounded-xl p-3 mb-4 min-h-[60px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[var(--muted)]">{iterativeSteps[dnsStep].from}</span>
            <span className="text-xs text-[var(--muted)]">→</span>
            <span className="text-xs font-bold text-network-600 dark:text-network-300">{iterativeSteps[dnsStep].to}</span>
          </div>
          <p className="text-sm font-mono bg-black/5 dark:bg-white/5 rounded px-3 py-2">
            {iterativeSteps[dnsStep].msg}
          </p>
        </div>

        {/* Full diagram */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 overflow-x-auto">
          <svg viewBox="0 0 580 320" className="w-full" aria-label="DNS iterativt oppslag">
            {/* Hosts */}
            {[
              { x: 20, y: 130, w: 80, label: "Din PC", color: "#0ea5e9" },
              { x: 140, y: 130, w: 90, label: "Lokal DNS", color: "#f59e0b" },
              { x: 270, y: 40, w: 90, label: "Root DNS", color: "#ef4444" },
              { x: 270, y: 130, w: 90, label: "TLD DNS (.com)", color: "#f59e0b" },
              { x: 400, y: 220, w: 110, label: "Autoritativ (amazon.com)", color: "#0ea5e9" },
            ].map(({ x, y, w, label, color }) => (
              <g key={label}>
                <rect x={x} y={y} width={w} height={40} rx="6" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
                <text x={x + w / 2} y={y + 25} textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">{label}</text>
              </g>
            ))}

            {/* Step arrows */}
            {/* 1: PC → Local */}
            <line x1="100" y1="150" x2="140" y2="150" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#dns1)"/>
            <text x="120" y="145" textAnchor="middle" fill="#0ea5e9" fontSize="9">1</text>

            {/* 2: Local → Root */}
            <line x1="185" y1="130" x2="275" y2="75" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#dns2)"/>
            <text x="225" y="95" fill="#ef4444" fontSize="9">2</text>

            {/* 3: Root → Local (ref to TLD) */}
            <line x1="270" y1="80" x2="225" y2="130" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#dns3)"/>
            <text x="235" y="118" fill="#ef4444" fontSize="9">3 (TLD-ref)</text>

            {/* 4: Local → TLD */}
            <line x1="185" y1="155" x2="270" y2="155" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#dns4)"/>
            <text x="228" y="148" textAnchor="middle" fill="#f59e0b" fontSize="9">4</text>

            {/* 5: TLD → Local (ref to auth) */}
            <line x1="270" y1="165" x2="185" y2="165" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#dns5)"/>
            <text x="228" y="178" textAnchor="middle" fill="#f59e0b" fontSize="9">5 (auth-ref)</text>

            {/* 6: Local → Auth */}
            <line x1="230" y1="170" x2="400" y2="230" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#dns6)"/>
            <text x="320" y="195" fill="#0ea5e9" fontSize="9">6</text>

            {/* 7: Auth → Local */}
            <line x1="400" y1="245" x2="230" y2="180" stroke="#10b981" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#dns7)"/>
            <text x="310" y="230" fill="#10b981" fontSize="9">7 (IP-svar)</text>

            {/* 8: Local → PC */}
            <line x1="140" y1="160" x2="100" y2="160" stroke="#10b981" strokeWidth="2" markerEnd="url(#dns8)"/>
            <text x="120" y="172" textAnchor="middle" fill="#10b981" fontSize="9">8</text>

            {/* Cache label */}
            <rect x="130" y="200" width="100" height="28" rx="5" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1"/>
            <text x="180" y="212" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Lagres i cache</text>
            <text x="180" y="224" textAnchor="middle" fill="#94a3b8" fontSize="8">(TTL sekunder)</text>

            <defs>
              {["dns1","dns2","dns3","dns4","dns5","dns6","dns7","dns8"].map((id, i) => {
                const colors = ["#0ea5e9","#ef4444","#ef4444","#f59e0b","#f59e0b","#0ea5e9","#10b981","#10b981"];
                return (
                  <marker key={id} id={id} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5 Z" fill={colors[i]}/>
                  </marker>
                );
              })}
            </defs>
          </svg>
          <p className="text-xs text-center text-[var(--muted)] mt-1">Iterativt DNS-oppslag: lokal DNS-server gjør alle forespørslene</p>
        </div>

        <h3 className="font-bold mt-6 mb-2">Rekursivt oppslag</h3>
        <p className="text-sm mb-3 leading-relaxed">
          I rekursivt oppslag videresender hver server forespørselen til neste nivå og returnerer svaret.
          Mer belastning på øverste servere — brukes sjeldnere i praksis.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900/30">
                <th className="border border-network-200 dark:border-network-700 px-3 py-2">Egenskap</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-center">Iterativt</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-center">Rekursivt</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Hvem gjør jobben?", "Lokal DNS-server", "Hver server videreformidler"],
                ["Belastning på root/TLD", "Lav", "Høy"],
                ["Vanligst brukt", "Ja", "Sjeldnere"],
                ["Stier i diagrammet", "Mange steg fra lokal server", "Kjede fra klient opp og ned"],
              ].map(([e, it, rec]) => (
                <tr key={e} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 font-medium">{e}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-center">{it}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-center">{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* --- DNS RECORDS --- */}
      <Section title="DNS Resource Records (RR)">
        <p className="text-sm mb-3">
          DNS-databasen lagres som <strong>Resource Records</strong> i formen: <code className="bg-black/10 dark:bg-white/10 px-1 rounded font-mono text-xs">(Name, Value, Type, TTL)</code>
        </p>

        <Card color="gold" title="De fire viktigste DNS-record-typene — MÅ kunne!">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-amber-100 dark:bg-amber-900/30">
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1">Type</th>
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1 text-left">Name</th>
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1 text-left">Value</th>
                  <th className="border border-amber-200 dark:border-amber-800 px-2 py-1 text-left">Brukes til</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["A", "vertsnavn", "IPv4-adresse", "Direkte navn → IP-adresse. Eksempel: hvl.no → 158.37.70.208"],
                  ["AAAA", "vertsnavn", "IPv6-adresse", "Som A, men for IPv6. 'AAAA' fordi IPv6 er 4× lengre enn IPv4"],
                  ["CNAME", "alias-navn", "kanonisk (ekte) navn", "Alias for et vertsnavn. ftp.example.com → www.example.com"],
                  ["MX", "domenenavn", "e-postservernavn", "Hvilken server håndterer e-post for domenet. Prioritet kan angis"],
                  ["NS", "domenenavn", "autoritativ navneserver", "Hvilken DNS-server er autoritativ for domenet. Eks: amazon.com → dns1.p04.nsone.net"],
                ].map(([type, name, val, bruk]) => (
                  <tr key={type} className="even:bg-amber-50/50 dark:even:bg-amber-900/10">
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1 font-mono font-bold text-amber-700 dark:text-amber-300">{type}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1 font-mono">{name}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1 font-mono">{val}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-1">{bruk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Collapsible title="Eksempel: DNS-records for amazon.com">
          <div className="space-y-2">
            <div className="font-mono text-xs bg-neutral-900 text-green-300 rounded-lg p-3">
              {`; Autoritative DNS-records for amazon.com\n\n; NS-records — hvilke servere er autoritative\namazon.com  IN  NS  ns1.p04.nsone.net.\namazon.com  IN  NS  ns2.p04.nsone.net.\n\n; A-record — vertsnavn til IP\nwww.amazon.com  IN  A  205.251.242.103\n\n; MX-record — e-postserver\namazon.com  IN  MX  10  mail.amazon.com.\n\n; CNAME — alias\nftp.amazon.com  IN  CNAME  www.amazon.com.`}
            </div>
          </div>
        </Collapsible>
      </Section>

      {/* --- DNS CACHING --- */}
      <Section title="DNS-caching">
        <p className="text-sm mb-3 leading-relaxed">
          Når en DNS-server mottar et svar, <strong>cacher den svaret</strong> lokalt. Neste gang samme navn spørres om,
          svarer den fra cachen uten å måtte traversere hierarkiet på nytt. Dette reduserer forsinkelse og belastning dramatisk.
        </p>

        <Card color="network">
          <ul className="text-sm space-y-1">
            <li><strong>TTL (Time to Live):</strong> hvert DNS-svar har en TTL som angir hvor lenge det kan caches (typisk 1-2 dager)</li>
            <li><strong>Etter TTL utløper</strong>, fjernes informasjonen fra cachen og nytt oppslag gjøres</li>
            <li>TLD-servere er typisk cachet i lokale DNS-servere — root-servere kontaktes sjelden</li>
            <li>Hurtigere oppslag for populære domener (google.com er alltid i cache)</li>
          </ul>
        </Card>

        <Warn>Negativ TTL: DNS cacher også negative svar (NXDOMAIN — domenet finnes ikke). Dette hindrer gjentatte oppslag for ikke-eksisterende domener.</Warn>
      </Section>

      {/* --- GJENNOMGÅTT EKSEMPEL --- */}
      <Section title="Gjennomgått eksempel: Du skriver www.example.com i nettleseren">
        <Collapsible title="Se fullstendig steg-for-steg løsning" defaultOpen={true}>
          <ol className="text-sm space-y-3 list-decimal ml-4">
            <li><strong>Lokal cache sjekkes:</strong> Har din PC cachet www.example.com? Hvis ja → direkte svar. Hvis nei → fortsett.</li>
            <li><strong>Lokal DNS kontaktes (UDP port 53):</strong> Din PC spør den lokale DNS-serveren (konfigurert av ISP eller router).</li>
            <li><strong>Lokal DNS sjekker cache:</strong> Har den svaret? Hvis ja → returnerer til din PC. Hvis nei → fortsett.</li>
            <li><strong>Spør Root DNS:</strong> Lokal DNS kontakter en av de 13 root-serverne. Root svarer: «Spør .com TLD-serveren på 192.5.6.30».</li>
            <li><strong>Spør TLD DNS (.com):</strong> TLD-serveren svarer: «Spør autoritativ server for example.com på 205.251.196.1».</li>
            <li><strong>Spør autoritativ DNS:</strong> Autoritativ server for example.com svarer: «www.example.com = 93.184.216.34» (A-record).</li>
            <li><strong>Svar returneres og caches:</strong> Lokal DNS svarer til din PC og cacher resultatet (i TTL sekunder).</li>
            <li><strong>TCP-tilkobling opprettes:</strong> Nettleseren kan nå opprette TCP-tilkobling til 93.184.216.34:80 og sende HTTP GET.</li>
          </ol>
          <ExamTip>Merk at DNS-oppslaget skjer FØR HTTP-forespørselen. Hele prosessen tar ekstra tid — derav viktigheten av DNS-caching.</ExamTip>
        </Collapsible>
      </Section>

      {/* --- VANLIGE FEIL --- */}
      <Section title="Vanlige feil og misforståelser">
        <Warn>DNS bruker <strong>UDP</strong> (ikke TCP) på port 53 — korte meldinger, og tapte pakker gjensendes. TCP brukes kun for svært store svar.</Warn>
        <Warn>Det finnes <strong>13 logiske root-servere</strong> (navngitt A–M), men hundrevis av fysiske servere via anycast. Ikke bare 13 fysiske maskiner.</Warn>
        <Warn>DNS er en <strong>applikasjonslagsprotokoll</strong>, ikke infrastruktur. Den bruker transportlaget (UDP) akkurat som HTTP og SMTP.</Warn>
        <Warn>A-record gir IPv4-adresse, AAAA-record gir IPv6-adresse. CNAME gir alias, ikke IP-adresse — du trenger alltid en A/AAAA til slutt.</Warn>
      </Section>

      {/* --- EKSAMEN --- */}
      <Section title="Typiske eksamensspørsmål">
        <Collapsible title="Spørsmål: Hva er DNS-systemets hoved-formål?">
          <Card color="green">
            <p className="text-sm font-bold">Svar: Å mappe vertsnavn (hostname) til IP-adresser.</p>
            <p className="text-sm mt-1">DNS tilbyr også: e-postserveraliaser (MX), vertsalias (CNAME), og lastbalansering.</p>
          </Card>
        </Collapsible>
        <Collapsible title="Spørsmål: Forklar forskjellen mellom iterativt og rekursivt DNS-oppslag">
          <Card color="green">
            <p className="text-sm"><strong>Iterativt:</strong> Lokal DNS-server gjør alle forespørslene. Hver server svarer med pekepinn til neste. Lokal server kontakter root → TLD → autoritativ.<br/>
            <strong>Rekursivt:</strong> Lokal DNS spør root, root spør TLD, TLD spør autoritativ — svaret «bobler opp» tilbake. Mer belastning på øverste servere.</p>
          </Card>
        </Collapsible>
        <Collapsible title="Spørsmål: Hva er DNS-record-typene A, CNAME, MX og NS?">
          <Card color="green">
            <ul className="text-sm space-y-1">
              <li><strong>A:</strong> vertsnavn → IPv4-adresse</li>
              <li><strong>AAAA:</strong> vertsnavn → IPv6-adresse</li>
              <li><strong>CNAME:</strong> alias-navn → kanonisk vertsnavn</li>
              <li><strong>MX:</strong> domene → e-postserver for domenet</li>
              <li><strong>NS:</strong> domene → autoritativ navneserver for domenet</li>
            </ul>
          </Card>
        </Collapsible>
      </Section>

      {/* Nav */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-2/teori/2-2" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">← 2.2 HTTP og webben</Link>
        <Link href="/dat110/cn-2/teori/2-7" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">2.7 Socket-programmering →</Link>
      </div>
    </div>
  );
}
