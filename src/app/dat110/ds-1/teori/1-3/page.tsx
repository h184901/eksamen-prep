"use client";

import { useState } from "react";
import Link from "next/link";

type ArchType = "klient-server" | "p2p" | "multi-tier";

export default function DS1_3Page() {
  const [activeArch, setActiveArch] = useState<ArchType>("klient-server");
  const [activeCloud, setActiveCloud] = useState<string | null>(null);
  const [showPervasive, setShowPervasive] = useState(false);

  const cloudModels = [
    {
      id: "iaas",
      akronym: "IaaS",
      navn: "Infrastructure as a Service",
      norsk: "Infrastruktur som tjeneste",
      farge: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
      tittelfarge: "text-blue-700 dark:text-blue-400",
      hvaFar: "Virtuelle maskiner (VM-er), lagring, nettverk, CPU og RAM",
      hvemStyrer: "Du installerer og konfigurerer alt selv — OS, runtime, applikasjoner",
      eksempler: ["Amazon EC2", "Amazon S3", "Google Compute Engine", "Microsoft Azure VMs"],
      analogi: "Du leier en tom leilighet — du maler veggene og setter inn mobler selv",
      eksamensnotat: "IaaS = cloud leier ut VM-er. Fra 2024-eksamen oppg 1h: svaret er IaaS.",
    },
    {
      id: "paas",
      akronym: "PaaS",
      navn: "Platform as a Service",
      norsk: "Plattform som tjeneste",
      farge: "border-indigo-400/60 bg-indigo-50 dark:bg-indigo-950/20",
      tittelfarge: "text-indigo-700 dark:text-indigo-400",
      hvaFar: "Programmeringsmiljo, runtimes, databaser, middleware, utviklingsverktoy",
      hvemStyrer: "Du skriver kode og deployer applikasjoner. Cloud haandterer OS, middleware og skalering.",
      eksempler: ["Microsoft Azure (App Service)", "Google App Engine", "Heroku"],
      analogi: "Du leier en moblert leilighet — du kan bo der og innrede, men husvert eier alt annet",
      eksamensnotat: "PaaS = du deployer kode, cloud haandterer alt under",
    },
    {
      id: "saas",
      akronym: "SaaS",
      navn: "Software as a Service",
      norsk: "Programvare som tjeneste",
      farge: "border-cyan-400/60 bg-cyan-50 dark:bg-cyan-950/20",
      tittelfarge: "text-cyan-700 dark:text-cyan-400",
      hvaFar: "Ferdige applikasjoner tilgjengelig via nettleseren eller API",
      hvemStyrer: "Du bruker bare applikasjonen. Cloud haandterer ALT — inkl. innholdet og dataene dine.",
      eksempler: ["Google Docs / Gmail", "YouTube", "Flickr", "Salesforce", "Microsoft 365"],
      analogi: "Du bor pa hotell — alt er klart for deg, ingenting administrerer du selv",
      eksamensnotat: "SaaS = du bruker bare appen, ingenting under er synlig",
    },
  ];

  const archConfigs: Record<ArchType, { tittel: string; beskrivelse: string; svg: React.ReactNode; egenskaper: string[]; eksempler: string[] }> = {
    "klient-server": {
      tittel: "Klient-server-arkitektur",
      beskrivelse:
        "Den klassiske og mest brukte arkitekturen. En sentral server tilbyr tjenester; klienter sender foresporsler og mottar svar. Serveren har ressursene, klienten bruker dem.",
      svg: (
        <svg viewBox="0 0 500 220" className="w-full max-w-xl mx-auto" aria-label="Klient-server diagram">
          {/* Server */}
          <rect x="200" y="80" width="100" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
          <text x="250" y="108" textAnchor="middle" fontSize="12" fill="#1d4ed8" fontWeight="700">SERVER</text>
          <text x="250" y="124" textAnchor="middle" fontSize="10" fill="#3b82f6">ressurser/data</text>

          {/* Klienter */}
          {[
            { x: 30, y: 30, label: "Klient A" },
            { x: 30, y: 130, label: "Klient B" },
            { x: 370, y: 30, label: "Klient C" },
            { x: 370, y: 130, label: "Klient D" },
          ].map((k) => (
            <g key={k.label}>
              <rect x={k.x} y={k.y} width="80" height="40" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
              <text x={k.x + 40} y={k.y + 25} textAnchor="middle" fontSize="10" fill="#475569">{k.label}</text>
            </g>
          ))}

          {/* Piler: request fra klienter til server */}
          <line x1="110" y1="55" x2="200" y2="100" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow)"/>
          <line x1="110" y1="155" x2="200" y2="120" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow)"/>
          <line x1="370" y1="55" x2="300" y2="100" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow)"/>
          <line x1="370" y1="155" x2="300" y2="120" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow)"/>

          <text x="145" y="75" fontSize="9" fill="#6366f1">request</text>
          <text x="310" y="75" fontSize="9" fill="#6366f1">request</text>

          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L0,8 L8,4 z" fill="#6366f1"/>
            </marker>
          </defs>

          <text x="250" y="200" textAnchor="middle" fontSize="10" fill="#94a3b8">Sentralisert kontroll — enkel a forsta og styre</text>
        </svg>
      ),
      egenskaper: [
        "Klar rolledeling: server har ressurser, klient bruker dem",
        "Enkel a forstå, implementere og feilsoke",
        "Server kan bli flaskehalsen ved mange samtidige klienter",
        "Single point of failure hvis serveren krasjer",
        "Multi-tier: flere lag av servere (presentasjon, logikk, data)",
      ],
      eksempler: ["HTTP/web (nettleser ← → webserver)", "DNS-oppslag", "E-post (SMTP/IMAP)", "Online banker"],
    },
    p2p: {
      tittel: "Peer-to-peer (P2P)",
      beskrivelse:
        "Ingen sentralisert server. Alle noder (peers) er likeverdige — de er bade klienter og servere. Ressurser deles direkte mellom nodene. Svart skalerbar og robust mot feil.",
      svg: (
        <svg viewBox="0 0 500 220" className="w-full max-w-xl mx-auto" aria-label="P2P diagram">
          {[
            { x: 220, y: 20, label: "Peer 1" },
            { x: 60, y: 80, label: "Peer 2" },
            { x: 360, y: 80, label: "Peer 3" },
            { x: 100, y: 160, label: "Peer 4" },
            { x: 320, y: 160, label: "Peer 5" },
            { x: 210, y: 130, label: "Peer 6" },
          ].map((p) => (
            <g key={p.label}>
              <circle cx={p.x + 30} cy={p.y + 20} r="28" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
              <text x={p.x + 30} y={p.y + 25} textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="600">{p.label}</text>
            </g>
          ))}
          {/* Koblinger */}
          <line x1="250" y1="40" x2="90" y2="100" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,2" opacity="0.7"/>
          <line x1="250" y1="40" x2="390" y2="100" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,2" opacity="0.7"/>
          <line x1="90" y1="100" x2="130" y2="180" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,2" opacity="0.7"/>
          <line x1="390" y1="100" x2="350" y2="180" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,2" opacity="0.7"/>
          <line x1="130" y1="180" x2="240" y2="150" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,2" opacity="0.7"/>
          <line x1="350" y1="180" x2="240" y2="150" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,2" opacity="0.7"/>
          <line x1="90" y1="100" x2="240" y2="150" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,2" opacity="0.5"/>
          <line x1="390" y1="100" x2="240" y2="150" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,2" opacity="0.5"/>
          <text x="250" y="210" textAnchor="middle" fontSize="10" fill="#94a3b8">Alle er bade klient og server — ingen sentral autoritet</text>
        </svg>
      ),
      egenskaper: [
        "Alle noder er bade klient og server (symmetrisk)",
        "Ingen sentral flaskehals — svart skalerbar",
        "Robust: feil i en node pavirker ikke systemet i stor grad",
        "Vanskeligere a administrere og sikre",
        "To typer overlay: strukturert (Chord DHT) og ustrukturert",
      ],
      eksempler: ["BitTorrent (fildeling)", "Bitcoin/Ethereum (blockchain)", "Gnutella (tidlig P2P)", "ChordDHT (oblig i DAT110)"],
    },
    "multi-tier": {
      tittel: "Multi-tier (flerlagsarkitektur)",
      beskrivelse:
        "En utvidelse av klient-server der logikken deles pa flere lag. Typisk: presentasjonslag, applikasjonslogikk-lag, og datalag. Gir bedre skalerbarhet og separasjon av ansvar.",
      svg: (
        <svg viewBox="0 0 500 240" className="w-full max-w-xl mx-auto" aria-label="Multi-tier arkitektur diagram">
          {/* Klienter */}
          <rect x="10" y="10" width="80" height="35" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
          <text x="50" y="32" textAnchor="middle" fontSize="10" fill="#475569">Nettleser</text>
          <rect x="100" y="10" width="80" height="35" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
          <text x="140" y="32" textAnchor="middle" fontSize="10" fill="#475569">Mobil-app</text>

          {/* Pil ned */}
          <line x1="100" y1="45" x2="170" y2="80" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,2"/>

          {/* Web-server / presentasjonslag */}
          <rect x="130" y="80" width="240" height="40" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
          <text x="250" y="98" textAnchor="middle" fontSize="11" fill="#1d4ed8" fontWeight="700">Lag 1: Web/Presentasjon</text>
          <text x="250" y="112" textAnchor="middle" fontSize="9" fill="#3b82f6">Nginx, Apache, React/Next.js</text>

          {/* Pil ned */}
          <line x1="250" y1="120" x2="250" y2="145" stroke="#94a3b8" strokeWidth="1.5"/>

          {/* Applikasjonslogikk */}
          <rect x="130" y="145" width="240" height="40" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
          <text x="250" y="163" textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="700">Lag 2: Applikasjonslogikk</text>
          <text x="250" y="177" textAnchor="middle" fontSize="9" fill="#6366f1">Java, Python, Node.js — forretningslogikk</text>

          {/* Pil ned */}
          <line x1="250" y1="185" x2="250" y2="205" stroke="#94a3b8" strokeWidth="1.5"/>

          {/* Datalag */}
          <rect x="130" y="205" width="240" height="30" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
          <text x="250" y="224" textAnchor="middle" fontSize="11" fill="#16a34a" fontWeight="700">Lag 3: Datalag — Database</text>

          <text x="250" y="245" textAnchor="middle" fontSize="9" fill="#94a3b8">Hvert lag kan skaleres uavhengig</text>
        </svg>
      ),
      egenskaper: [
        "Klar separasjon av ansvar mellom lagene",
        "Hvert lag kan skaleres uavhengig av de andre",
        "Presentasjonslaget kjorer pa klienten eller webserveren",
        "Applikasjonslogikken kan kjore pa mange servere parallelt",
        "Datalaget er gjerne en databaseklynge med replikering",
      ],
      eksempler: ["Moderne nettapper (React + REST API + PostgreSQL)", "Amazon.com (mange tier)", "Storskala enterprise-systemer"],
    },
  };

  const current = archConfigs[activeArch];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.3 Typer distribuerte systemer</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">1.3 Typer distribuerte systemer</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Distribuerte systemer klassifiseres gjerne etter hva de er bygget for. Vi skiller mellom
          hoyytelses-datasystemer (cluster, grid, cloud), informasjonssystemer (transaksjoner, EAI)
          og pervasive systemer (IoT). I tillegg er arkitekturmonsteret (klient-server, P2P, hybrid) sentralt.
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
        <ul className="space-y-1">
          {[
            "Skille mellom cluster computing og grid computing (homo- vs. heterogen)",
            "Forklare IaaS vs. PaaS vs. SaaS med eksempler — spesielt IaaS = VM-utleie",
            "Forklare elastisitet som en sentral cloud-egenskap (2025-eksamen: rapid elasticity = skalerbarhet)",
            "Forklare transaksjoner og ACID-egenskapene i distribuerte informasjonssystemer",
            "Forklare hva pervasive/IoT-systemer er og hva som er unikt med dem",
            "Forklare klient-server, P2P og multi-tier-arkitektur med SVG-diagram i hodet",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hoyytelses-datasystemer */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          1. Hoyytelses-datasystemer
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Disse systemene er laget for compute-intensive oppgaver: vitenskapelige simuleringer, AI-trening,
          rendering, osv.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Cluster */}
          <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-3">Cluster computing</h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <p>
                En samling av <strong>homogene</strong> maskiner koblet via et hoyhastighets-LAN.
                Alle noder kjoer det samme OS. Et master-node styrer beregningene.
              </p>
              <ul className="space-y-1 mt-2">
                <li className="flex gap-2"><span className="text-blue-500 shrink-0">&#8594;</span><span>Homogent: same OS, naermest identisk hardware</span></li>
                <li className="flex gap-2"><span className="text-blue-500 shrink-0">&#8594;</span><span>Koblet via LAN (lavlatens)</span></li>
                <li className="flex gap-2"><span className="text-blue-500 shrink-0">&#8594;</span><span>Single managing node kontrollerer alt</span></li>
                <li className="flex gap-2"><span className="text-blue-500 shrink-0">&#8594;</span><span>Brukes til parallell programmering</span></li>
              </ul>
              <p className="text-xs mt-2 font-mono bg-white/60 dark:bg-neutral-900/40 rounded p-2">
                Eksempel: Supercomputer med 100 000+ CPUer, Beowulf-klynger
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="rounded-xl border-2 border-indigo-400/60 bg-indigo-50 dark:bg-indigo-950/20 p-5">
            <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-3">Grid computing</h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <p>
                En <strong>heterogen</strong> samling av maskiner fra ulike organisasjoner koblet via
                WAN. Nodene kan ha ulik hardware, OS og programvare.
              </p>
              <ul className="space-y-1 mt-2">
                <li className="flex gap-2"><span className="text-indigo-500 shrink-0">&#8594;</span><span>Heterogent: ulikt OS, hardware, nettverk</span></li>
                <li className="flex gap-2"><span className="text-indigo-500 shrink-0">&#8594;</span><span>Spredt pa tvers av organisasjoner</span></li>
                <li className="flex gap-2"><span className="text-indigo-500 shrink-0">&#8594;</span><span>Koblet via WAN (hoyere latens)</span></li>
                <li className="flex gap-2"><span className="text-indigo-500 shrink-0">&#8594;</span><span>Krever middleware for ressurshaandtering</span></li>
              </ul>
              <p className="text-xs mt-2 font-mono bg-white/60 dark:bg-neutral-900/40 rounded p-2">
                Eksempel: CERN grid, SETI@home (distributed computing)
              </p>
            </div>
          </div>
        </div>

        {/* Sammenligningstabel */}
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-blue-50 dark:bg-blue-950/30">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-blue-700 dark:text-blue-400"></th>
                <th className="text-left px-4 py-2 font-semibold text-blue-600 dark:text-blue-400">Cluster</th>
                <th className="text-left px-4 py-2 font-semibold text-indigo-600 dark:text-indigo-400">Grid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)] text-xs">
              {[
                ["Heterogenitet", "Homogen (like maskiner)", "Heterogen (ulike maskiner)"],
                ["Kobling", "LAN — hoy hastighet, lav latens", "WAN — lavere hastighet, hoyere latens"],
                ["Organisasjon", "En enkelt organisasjon", "Mange uavhengige organisasjoner"],
                ["Bruk", "Parallell programmering, HPC", "Vitenskapelige beregninger pa tvers av land"],
                ["Eksempel", "Beowulf-klynge, AWS HPC Cluster", "CERN LHC Grid, SETI@home"],
              ].map(([egenskap, cluster, grid]) => (
                <tr key={egenskap}>
                  <td className="px-4 py-2 font-medium text-[var(--muted)]">{egenskap}</td>
                  <td className="px-4 py-2">{cluster}</td>
                  <td className="px-4 py-2">{grid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cloud computing */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Cloud computing — IaaS, PaaS, SaaS
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Cloud computing er en form for <strong>utility computing</strong>: ressurser provisjoneres
          og betales etter behov. Tre servicmodeller — klikk pa hver for full forklaring:
        </p>

        {/* Cloud-modell-knapper */}
        <div className="flex gap-3 flex-wrap">
          {cloudModels.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveCloud(activeCloud === m.id ? null : m.id)}
              className={`px-5 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                activeCloud === m.id
                  ? "border-blue-500 bg-blue-600 text-white"
                  : "border-[var(--card-border)] bg-[var(--card)] hover:border-blue-400"
              }`}
            >
              {m.akronym}
            </button>
          ))}
        </div>

        {/* Aktiv cloud-detalj */}
        {activeCloud && (() => {
          const m = cloudModels.find((c) => c.id === activeCloud)!;
          return (
            <div className={`rounded-xl border-2 p-5 space-y-4 ${m.farge}`}>
              <div>
                <h3 className={`font-bold text-base ${m.tittelfarge}`}>{m.akronym} — {m.navn}</h3>
                <p className={`text-xs ${m.tittelfarge} opacity-80`}>{m.norsk}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-xs mb-1">Hva far kunden?</p>
                  <p className="text-[var(--muted)]">{m.hvaFar}</p>
                </div>
                <div>
                  <p className="font-bold text-xs mb-1">Hvem konfigurerer?</p>
                  <p className="text-[var(--muted)]">{m.hvemStyrer}</p>
                </div>
              </div>
              <div>
                <p className="font-bold text-xs mb-2">Kjente eksempler:</p>
                <div className="flex flex-wrap gap-2">
                  {m.eksempler.map((e) => (
                    <span key={e} className="rounded-full border border-current px-3 py-1 text-xs font-medium opacity-80">{e}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-current p-3 text-sm">
                <p className="font-bold text-xs mb-1">Analogi:</p>
                <p className="text-[var(--muted)]">{m.analogi}</p>
              </div>
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 p-2 text-xs">
                <span className="font-bold text-amber-700 dark:text-amber-400">Eksamen: </span>
                <span className="text-amber-800 dark:text-amber-300">{m.eksamensnotat}</span>
              </div>
            </div>
          );
        })()}

        {/* Stack-diagram */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h3 className="font-bold mb-4 text-sm text-center">Cloud-lagene (stakket modell)</h3>
          <div className="flex gap-4 text-xs">
            <div className="flex flex-col gap-1 shrink-0 text-right w-20 justify-center">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">SaaS</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">PaaS</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">IaaS</span>
              <span className="text-gray-500 font-bold">Fysisk</span>
            </div>
            <div className="flex-1 space-y-1">
              <div className="rounded bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-300 dark:border-cyan-700 px-3 py-2 text-cyan-800 dark:text-cyan-200">
                Web services, multimedia-apper, forretningsapper (Gmail, YouTube, Flickr)
              </div>
              <div className="rounded bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 px-3 py-2 text-indigo-800 dark:text-indigo-200">
                Software-rammeverk (Java, Python, .NET), lagringsplattformer (databaser) — MS Azure, Google App Engine
              </div>
              <div className="rounded bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 px-3 py-2 text-blue-800 dark:text-blue-200">
                Beregning (VM-er), lagring (blokk, fil) — Amazon S3, Amazon EC2
              </div>
              <div className="rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-300">
                CPU, minne, disk, bandbredde — Datasentre
              </div>
            </div>
          </div>
        </div>

        {/* Elastisitet */}
        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-4">
          <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Cloud-egenskap: Elastisitet</h3>
          <p className="text-sm text-[var(--muted)]">
            <strong>Rapid elasticity</strong> betyr at skyressurser kan provisjoneres og frigis hurtig —
            ideelt sett automatisk — for a matche ettersporselen. Fra eksamensoppgave 2025:
            &ldquo;Rapid elasticity is a cloud computing characteristic that relates to: Scalability.&rdquo;
          </p>
          <div className="mt-3 rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 text-xs text-[var(--muted)]">
            Eksempel: Nettbutikken din skalerer fra 10 servere til 500 servere automatisk pa Black Friday.
            Etter rushet skalerer den ned igjen til 10. Du betaler kun for det du faktisk brukte.
          </div>
        </div>
      </section>

      {/* Distribuerte informasjonssystemer */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          2. Distribuerte informasjonssystemer
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Tradisjonelle bedriftssystemer: banker, flybestillinger, lagersystemer. Fokus er pa
          datakonsistens og transaksjoner pa tvers av noder.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-3">Transaksjoner og ACID</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              En transaksjon er en atomaer gruppering av operasjoner som enten alle lykkes eller alle feiler.
            </p>
            <div className="space-y-2">
              {[
                { bokstav: "A", egenskap: "Atomicity", forklaring: "Alt eller ingenting — enten alle operasjoner lykkes, eller ingen" },
                { bokstav: "C", egenskap: "Consistency", forklaring: "Databasen er alltid i en gyldig tilstand fore og etter transaksjonen" },
                { bokstav: "I", egenskap: "Isolation", forklaring: "Parallelle transaksjoner interferer ikke med hverandre" },
                { bokstav: "D", egenskap: "Durability", forklaring: "En fullfort transaksjon overlever systemfeil (skrevet til disk)" },
              ].map((a) => (
                <div key={a.bokstav} className="flex gap-3 text-sm">
                  <span className="font-bold text-blue-600 dark:text-blue-400 w-5 shrink-0">{a.bokstav}</span>
                  <div>
                    <span className="font-bold">{a.egenskap}: </span>
                    <span className="text-[var(--muted)]">{a.forklaring}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border-2 border-indigo-400/60 bg-indigo-50 dark:bg-indigo-950/20 p-5">
            <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-3">TP-monitor og EAI</h3>
            <div className="space-y-3 text-sm text-[var(--muted)]">
              <div>
                <p className="font-bold text-[var(--foreground)]">TP-monitor (Transaction Processing Monitor)</p>
                <p className="mt-1">
                  Mellomvare som koordinerer transaksjoner pa tvers av flere ressurser. Sikrer at en
                  transaksjon som involverer flere databaser enten lykkes i sin helhet (commit) eller
                  rulles tilbake (rollback). Eksempel: Tuxedo, IBM CICS.
                </p>
              </div>
              <div>
                <p className="font-bold text-[var(--foreground)]">EAI (Enterprise Application Integration)</p>
                <p className="mt-1">
                  Integration mellom uavhengige applikasjoner i en bedrift. Eksempel: bestillingssystem,
                  lagersystem og regnskapssystem ma snakke sammen. Typisk via meldingskø (MOM/ESB).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pervasive systemer */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          3. Pervasive systemer (IoT)
        </h2>
        <button
          onClick={() => setShowPervasive(!showPervasive)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Vis/skjul: Pervasive systemer og IoT</span>
          <span>{showPervasive ? "▲" : "▼"}</span>
        </button>
        {showPervasive && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--muted)]">
              Pervasive systemer er allestedsnaevarende systemer som er integrert i omgivelsene.
              Enheter er ofte resurssvake (batteridrevet, lav CPU) og kommuniserer tradslos.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  tittel: "IoT og sensornettverk",
                  innhold: [
                    "Sensorer, aktuatorer, embedded controllers",
                    "Lav energi, begrenset prosessering og minne",
                    "Kommuniserer via Zigbee, BLE, LoRaWAN, 5G NB-IoT",
                    "Eksempel: Smart hjem, fabrikkovervaking, precision farming",
                  ],
                },
                {
                  tittel: "Hva som er unikt",
                  innhold: [
                    "Kontekstbevissthet: systemet tilpasser seg omgivelsene",
                    "Ad-hoc sammenkobling: enheter kobles dynamisk",
                    "Ingen fast infrastruktur (mobilitet)",
                    "Ekstrem heterogenitet i hardware og protokoller",
                  ],
                },
              ].map((b) => (
                <div key={b.tittel} className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-4">
                  <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2 text-sm">{b.tittel}</h3>
                  <ul className="space-y-1">
                    {b.innhold.map((p) => (
                      <li key={p} className="flex gap-2 text-xs text-[var(--muted)]">
                        <span className="text-blue-500 shrink-0">&#8594;</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Arkitekturer: interaktivt */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Arkitekturmonstre: Klient-server, P2P og Multi-tier
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Bytt mellom arkitekturene for a se diagram, egenskaper og eksempler:
        </p>

        {/* Toggle-knapper */}
        <div className="flex gap-2 flex-wrap">
          {(["klient-server", "p2p", "multi-tier"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setActiveArch(k)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeArch === k
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {k === "klient-server" ? "Klient-server" : k === "p2p" ? "Peer-to-peer (P2P)" : "Multi-tier"}
            </button>
          ))}
        </div>

        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-4">
          <div>
            <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-1">{current.tittel}</h3>
            <p className="text-sm text-[var(--muted)]">{current.beskrivelse}</p>
          </div>

          {/* SVG */}
          <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-white/60 dark:bg-neutral-900/40 p-3">
            {current.svg}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-bold mb-2">Egenskaper:</p>
              <ul className="space-y-1">
                {current.egenskaper.map((e) => (
                  <li key={e} className="flex gap-2 text-[var(--muted)]">
                    <span className="text-blue-500 shrink-0 mt-0.5">&#8594;</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold mb-2">Eksempler i praksis:</p>
              <ul className="space-y-1">
                {current.eksempler.map((e) => (
                  <li key={e} className="flex gap-2 text-[var(--muted)]">
                    <span className="text-blue-500 shrink-0 mt-0.5">&#8226;</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hybrid-arkitektur */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Hybride arkitekturer
        </h2>
        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-5 text-sm space-y-3">
          <p className="text-[var(--muted)]">
            Mange virkelige systemer kombinerer klient-server og P2P. I BitTorrent:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-3">
              <p className="font-bold text-xs mb-1">Klient-server-delen</p>
              <p className="text-xs text-[var(--muted)]">
                En sentral <em>tracker</em>-server holder oversikt over hvilke peers som har hvilke filer.
                Ny peer kobler seg til tracker for a fa liste over swarm-deltakere.
              </p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800/40 p-3">
              <p className="font-bold text-xs mb-1">P2P-delen</p>
              <p className="text-xs text-[var(--muted)]">
                Selve fildelingen skjer peer-to-peer. Peersen laster ned biter fra mange ulike peers
                samtidig — ingen sentral server distribuerer filen.
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)]">
            Hybrid-losninger er vanlig fordi ren P2P er vanskelig a administrere og sikre,
            mens ren klient-server ikke skalerer tilstrekkelig for enorme brukervolum.
          </p>
        </div>
      </section>

      {/* Vanlige feil */}
      <div className="rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
        <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Vanlige feil pa eksamen</h3>
        <ul className="space-y-2 text-sm">
          {[
            "Blande IaaS og PaaS: IaaS = du far VM-er (du installerer OS), PaaS = du deployerer kode (cloud haandterer OS)",
            "Glemme at cluster er homogent og grid er heterogent",
            "Tro at P2P er uten sentral komponent — mange P2P-systemer har en hybrid tracker/indeksserver",
            'Si at cloud "er" IaaS — cloud er paraplybegrepet, IaaS/PaaS/SaaS er servicemodellene under',
          ].map((feil) => (
            <li key={feil} className="flex items-start gap-2">
              <span className="text-red-500 shrink-0 mt-0.5 font-bold">!</span>
              <span>{feil}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Fra 2024-eksamen oppgave 1h: &ldquo;A cloud service model where cloud providers rent out virtual machines
          to customers is known as: Infrastructure as a Service.&rdquo; — Dette er et typisk flervalgssporsmal.
          IaaS = VM-utleie er den absolutt viktigste cloud-fakten a huske.
          Fra 2025-eksamen oppgave 1g: &ldquo;Rapid elasticity is a cloud computing characteristic that relates to: Scalability.&rdquo;
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/ds-1/teori/1-2"
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          &larr; 1.2 Design-mål
        </Link>
        <div />
      </div>
    </div>
  );
}
