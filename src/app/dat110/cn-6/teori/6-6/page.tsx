"use client";

import Link from "next/link";
import { useState } from "react";

export default function CN6_6Page() {
  const [showFatTree, setShowFatTree] = useState(false);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.6 Data-senter nettverk</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">6.6 Data-senter nettverk</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Moderne datasentre huser titusener av servere og krever ekstremt høy intern nettverksbåndbredde. Nettverkstopologien er avgjørende for ytelse og feiltoleranse.
        </p>
      </div>

      {/* Kontekst */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Hva er et datasenter-nettverk?</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            Store internettselskaper (Google, Amazon, Meta) kjører sine tjenester i gigantiske datasentre med titusener til hundretusener av servere. Nettverket internt i datasenteret (Data Center Network, DCN) er kritisk — det må håndtere enorm trafikk med lav forsinkelse og høy tilgjengelighet.
          </p>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            {[
              { tittel: "Skala", desc: "Typisk 100 000 - 1 000 000+ servere per datasenter" },
              { tittel: "Båndbredde", desc: "Total biseksjons-båndbredde kan være i petabits per sekund" },
              { tittel: "Feiltoleranse", desc: "Redundante lenker og veier — en feil stopper ikke tjenesten" },
            ].map((k) => (
              <div key={k.tittel} className="border border-[var(--card-border)] rounded-lg p-3">
                <div className="font-semibold mb-1">{k.tittel}</div>
                <div className="text-[var(--muted)]">{k.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hierarkisk topologi */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Hierarkisk topologi (tradisjonell)</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            Tradisjonelle datasentre bruker en tre-lags hierarkisk topologi. Hvert lag har switcher med stadig høyere kapasitet og færre enheter.
          </p>
          <div className="space-y-2 mb-4">
            {[
              {
                lag: "Kjernelag (Core Layer)",
                desc: "Noen få svært kraftige kjerne-rutere/-switcher. Kobler datasenteret til internett og til aggregeringslaget.",
                farge: "bg-purple-500/20 border-purple-500/40",
                antall: "2-4 enheter",
              },
              {
                lag: "Aggregeringslag (Aggregation Layer)",
                desc: "Mellom-switcher som kobler topp-av-rack-switcher opp til kjernen. Inneholder Layer-3-funksjonalitet.",
                farge: "bg-blue-500/20 border-blue-500/40",
                antall: "Dusinvis av switcher",
              },
              {
                lag: "Tilgangslag (Access Layer / Top-of-Rack)",
                desc: "Én switch per rack med servere (ToR-switch). Typisk 20-48 servere per rack, koblet til TOR-switchen via 1-10 Gbps Ethernet.",
                farge: "bg-green-500/20 border-green-500/40",
                antall: "Hundrevis av switcher",
              },
              {
                lag: "Servere (Hosts)",
                desc: "De faktiske applikasjonsserverne. Kjører tjenestene. Koblet til ToR-switchen.",
                farge: "bg-gray-500/20 border-gray-500/40",
                antall: "Titusener av servere",
              },
            ].map((l) => (
              <div key={l.lag} className={`border rounded-xl p-4 ${l.farge}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold mb-1">{l.lag}</div>
                    <div className="text-sm text-[var(--muted)]">{l.desc}</div>
                  </div>
                  <div className="text-xs text-[var(--muted)] ml-4 shrink-0 font-mono bg-[var(--card)] border border-[var(--card-border)] px-2 py-1 rounded">{l.antall}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-[var(--muted)]">
            <strong>Problemet med hierarkisk topologi:</strong> Oversubscription! Båndbredden smalner jo høyere opp i hierarkiet man går. Kjerneswitchene er flaskehals. Server-til-server trafikk (øst-vest) lider.
          </div>
        </div>
      </section>

      {/* Fat-tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Fat-Tree topologi</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            Fat-Tree er en moderne topologi designet for å gi full biseksjons-båndbredde — dvs. enhver server kan kommunisere med enhver annen server med full linjehastighet. Bruker mange billige commodity-switcher istedenfor få dyre.
          </p>
          <button
            onClick={() => setShowFatTree(!showFatTree)}
            className="text-sm text-[var(--accent)] hover:underline mb-4"
          >
            {showFatTree ? "▲ Skjul Fat-Tree detaljer" : "▼ Vis Fat-Tree topologi"}
          </button>
          {showFatTree && (
            <div className="space-y-4 border-t border-[var(--card-border)] pt-4">
              <p className="text-sm text-[var(--muted)]">
                En k-ary Fat-Tree har tre lag: core, aggregation og edge. Med k=4: 4 pods, 2 aggregation switcher og 2 edge switcher per pod, og 4 core switcher. Totalt (k/2)² core switcher. Full biseksjons-båndbredde sikres ved at det alltid finnes k/2 parallelle veier mellom to servere i ulike pods.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-[var(--card-border)] rounded-lg p-4 text-sm">
                  <h4 className="font-semibold mb-2">Egenskaper</h4>
                  <ul className="text-[var(--muted)] space-y-1">
                    <li>• Full biseksjons-båndbredde</li>
                    <li>• Mange parallelle veier mellom servere</li>
                    <li>• Feiltoleranse: alternativ vei hvis én switcher faller</li>
                    <li>• Bruker bare billige commodity Ethernet-switcher</li>
                  </ul>
                </div>
                <div className="border border-[var(--card-border)] rounded-lg p-4 text-sm">
                  <h4 className="font-semibold mb-2">Utfordringer</h4>
                  <ul className="text-[var(--muted)] space-y-1">
                    <li>• Krever smart load balancing (ECMP)</li>
                    <li>• Mange kabler og switcher</li>
                    <li>• Komplekst å administrere</li>
                    <li>• Krever flow-level routing</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Load balancing */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Load Balancing i datasentre</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            Eksternt: En load balancer (LB) mottar alle innkommende forespørsler og fordeler dem til servere internt. LB-en gir ett offentlig IP-grensesnitt, mens serverene internt har private IP-adresser.
          </p>
          <div className="font-mono text-sm bg-[var(--card)] border border-[var(--card-border)] rounded p-4 mb-4">
            <div className="text-center">Internett → 203.0.113.1 (Load Balancer)</div>
            <div className="text-center text-[var(--muted)] my-1">↓ distribuerer basert på tilgjengelighet/last</div>
            <div className="flex justify-center gap-4">
              <span className="bg-blue-500/20 border border-blue-500/40 rounded px-2 py-1">Server 1: 10.0.0.1</span>
              <span className="bg-blue-500/20 border border-blue-500/40 rounded px-2 py-1">Server 2: 10.0.0.2</span>
              <span className="bg-blue-500/20 border border-blue-500/40 rounded px-2 py-1">Server 3: 10.0.0.3</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="border border-[var(--card-border)] rounded-lg p-3">
              <div className="font-semibold mb-1">Layer-4 load balancing</div>
              <div className="text-[var(--muted)]">Basert på IP + port (TCP/UDP). Rask, stateless. Kan ikke se HTTP-innhold.</div>
            </div>
            <div className="border border-[var(--card-border)] rounded-lg p-3">
              <div className="font-semibold mb-1">Layer-7 load balancing</div>
              <div className="text-[var(--muted)]">Kan se HTTP-headers, cookies, URL. Smartere distribusjon. Tregere pga mer parsing.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sammenligning */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Sammenligning av topologier</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Egenskap</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Hierarkisk</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Fat-Tree</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Biseksjons-båndbredde", "Lav (flaskehals øverst)", "Full (ingen flaskehals)"],
                ["Feiltoleranse", "Moderat", "Høy (mange veier)"],
                ["Kost", "Dyre kjerne-switcher", "Mange billige switcher"],
                ["Kompleksitet", "Enkel å forstå", "Kompleks routing"],
                ["Skalering", "Begrenset", "Skalerer godt"],
              ].map((r) => (
                <tr key={r[0]} className="hover:bg-[var(--card)]">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-semibold">{r[0]}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-center text-[var(--muted)]">{r[1]}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-center text-[var(--muted)]">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Eksamentips */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Eksamentips</h2>
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl p-5">
          <ul className="space-y-2 text-sm">
            {[
              "Datasenter-nettverk er ikke et primærfokus i eksamen — forstå den hierarkiske topologien og fat-tree på overordnet nivå.",
              "Viktigste konsept: oversubscription og biseksjons-båndbredde.",
              "Load balancer er det eneste offentlige IP-grensesnittet — serverene bruker private adresser.",
              "Fat-tree bruker commodity Ethernet-switcher — ikke dyre spesial-switcher.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-500 font-bold shrink-0">★</span>
                <span className="text-[var(--muted)]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-6/teori/6-4" className="hover:text-[var(--accent)] text-sm">
          ← 6.4 Ethernet, MAC, ARP og switch
        </Link>
        <Link href="/dat110/cn-6/teori/6-7" className="hover:text-[var(--accent)] text-sm">
          6.7 Et webforespørsel-scenario →
        </Link>
      </div>
    </div>
  );
}
