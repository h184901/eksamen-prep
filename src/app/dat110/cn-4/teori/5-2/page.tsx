"use client";

import Link from "next/link";
import { useState } from "react";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

export default function CN5_2Page() {
  const [activeAS, setActiveAS] = useState<"intra" | "inter">("intra");
  const [visBGP, setVisBGP] = useState(false);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">5.2 Rutingprotokoller i praksis</span>
      </div>

      <h1 className="text-3xl font-bold">5.2 Rutingprotokoller i praksis</h1>
      <p className="text-[var(--muted)] max-w-3xl text-lg">
        Internett er organisert i autonome systemer (AS). Innad i hvert AS brukes OSPF. Mellom AS-er brukes BGP. Dette er arkitekturen som skalerer Internett til milliarder av ruter.
      </p>

      {/* Autonome systemer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Autonome systemer (AS)</h2>

        <p className="text-[var(--foreground)] max-w-3xl">
          Internett er delt inn i <strong>autonome systemer (AS)</strong> — grupper av rutere under felles administrativ kontroll. Typiske eksempler er store ISP-er (Telenor, Telia), universiteter, og store selskaper. Hvert AS har et unikt <strong>AS-nummer (ASN)</strong> tildelt av IANA.
        </p>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-network-600 dark:text-network-300 mb-2">Hva er et AS?</h3>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Gruppe rutere under én administrasjon</li>
              <li>Internt samkjørt rutingpolitikk</li>
              <li>Identifisert av 16-bits ASN</li>
              <li>Eksempel: AS2119 = Telenor Norge</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-network-600 dark:text-network-300 mb-2">Intra-AS ruting</h3>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Også kalt Interior Gateway Protocol (IGP)</li>
              <li>Optimaliserer kun ytelse (kostnad)</li>
              <li>Protokoller: OSPF, RIP, EIGRP</li>
              <li>Algoritme: link-state (Dijkstra)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-network-600 dark:text-network-300 mb-2">Inter-AS ruting</h3>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Exterior Gateway Protocol (EGP)</li>
              <li>Tar hensyn til politikk og økonomi</li>
              <li>Protokoll: BGP (Border Gateway Protocol)</li>
              <li>Algoritme: path-vector</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-amber-400 bg-amber-50 dark:bg-amber-950 p-4 max-w-3xl">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-1">Analogi: By-system</p>
          <p className="text-sm text-[var(--foreground)]">
            Tenk på et AS som en by. Intra-AS ruting er som GPS-navigasjon innad i byen — vi vil bare finne den raskeste veien. Inter-AS ruting er som diplomatiske avtaler mellom byer — vi velger rute basert på politikk (hvem vi samarbeider med), ikke bare avstand.
          </p>
        </div>
      </section>

      {/* Tabseksjon: Intra vs Inter */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Rutingprotokoller</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveAS("intra")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              activeAS === "intra"
                ? "bg-network-600 text-white"
                : "bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-network-50 dark:hover:bg-network-900"
            }`}
          >
            Intra-AS: OSPF
          </button>
          <button
            onClick={() => setActiveAS("inter")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              activeAS === "inter"
                ? "bg-blue-600 text-white"
                : "bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-blue-50 dark:hover:bg-blue-900"
            }`}
          >
            Inter-AS: BGP
          </button>
        </div>

        {activeAS === "intra" && (
          <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-6 max-w-5xl space-y-4">
            <h3 className="font-bold text-2xl text-network-700 dark:text-network-300">OSPF — Open Shortest Path First</h3>
            <p className="text-[var(--foreground)]">
              OSPF er den dominerende intra-AS rutingprotokollen på Internett. Den bruker link-state-algoritmen (Dijkstra) og er standardisert av IETF (RFC 2328).
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2">Slik fungerer OSPF</h4>
                <ol className="text-sm space-y-2 text-[var(--foreground)] list-decimal list-inside">
                  <li>Hver OSPF-ruter sender <strong>Link State Advertisements (LSA)</strong> til alle rutere i AS-et (flooding)</li>
                  <li>Alle rutere bygger identisk topologikart over AS-et</li>
                  <li>Dijkstras algoritme kjøres lokalt for å beregne korteste veier</li>
                  <li>Forwardingtabell oppdateres</li>
                  <li>LSA-er re-sendes periodisk (30 min) og ved topologiendringer</li>
                </ol>
              </div>
              <div>
                <h4 className="font-bold mb-2">OSPF-egenskaper</h4>
                <ul className="text-sm space-y-2 text-[var(--foreground)] list-disc list-inside">
                  <li><strong>Autentisering:</strong> OSPF-meldinger kan autentiseres for å hindre rogue-rutere</li>
                  <li><strong>Multiple paths:</strong> OSPF kan holde multiple equal-cost paths (ECMP)</li>
                  <li><strong>Hierarki:</strong> OSPF støtter areas (backbone area 0 + stub areas)</li>
                  <li><strong>Unicast og multicast:</strong> OSPF bruker IP direkte (protokoll 89)</li>
                  <li><strong>Rask konvergens:</strong> Rask rekonfigurering ved topologiendringer</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--bg)] p-4">
              <h4 className="font-bold mb-2">OSPF-areas og hierarki</h4>
              <p className="text-sm text-[var(--foreground)]">
                Store AS-er deles inn i <strong>areas</strong> for å redusere LSA-flooding og Dijkstra-kompleksitet. <strong>Area 0 (backbone area)</strong> er navet — alle andre areas kobles til area 0 via <strong>Area Border Routers (ABR)</strong>. Rutere innad i et area kjenner full topologi for sitt area, men bare oppsummert informasjon om andre areas.
              </p>
            </div>
          </div>
        )}

        {activeAS === "inter" && (
          <div className="rounded-xl border-2 border-blue-400 bg-[var(--card-bg)] p-6 max-w-5xl space-y-4">
            <h3 className="font-bold text-2xl text-blue-700 dark:text-blue-300">BGP — Border Gateway Protocol</h3>
            <p className="text-[var(--foreground)]">
              BGP er "limet som holder Internett sammen" — den eneste inter-AS rutingprotokollen som er i utbredt bruk. BGP er en path-vector-protokoll og versjon 4 er standardisert i RFC 4271.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2">eBGP og iBGP</h4>
                <div className="space-y-3 text-sm text-[var(--foreground)]">
                  <div className="rounded-lg border border-blue-400 p-3">
                    <p className="font-bold text-blue-600 dark:text-blue-300">eBGP (external BGP)</p>
                    <p>Kjøres mellom grenserutere i <em>ulike</em> AS-er. Brukes til å utveksle nettverksprefiks-informasjon mellom AS-er. Typisk én BGP-sesjon per peering-avtale.</p>
                  </div>
                  <div className="rounded-lg border border-blue-400 p-3">
                    <p className="font-bold text-blue-600 dark:text-blue-300">iBGP (internal BGP)</p>
                    <p>Kjøres mellom rutere <em>innad</em> i ett AS for å spre inter-AS rutinginfo til alle interne rutere. Krever full mesh eller route reflectors.</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">BGP som path-vector</h4>
                <ul className="text-sm space-y-2 text-[var(--foreground)] list-disc list-inside">
                  <li>BGP annonserer <strong>prefiks + AS-sti (AS_PATH)</strong></li>
                  <li>AS_PATH = liste over AS-er trafikken vil passere</li>
                  <li>Loop-deteksjon: kast annonser der eget ASN finnes i AS_PATH</li>
                  <li><strong>NEXT_HOP</strong>: IP til neste-hopp-ruteren</li>
                  <li>Valg av beste rute basert på politikk, ikke bare metrikk</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setVisBGP(!visBGP)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {visBGP ? "Skjul" : "Vis"} BGP-beslutningsprosessen (hot potato routing)
            </button>

            {visBGP && (
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--bg)] p-5 space-y-3">
                <h4 className="font-bold text-blue-600 dark:text-blue-300">Hot Potato Routing</h4>
                <p className="text-sm text-[var(--foreground)]">
                  Hot potato routing er strategien der et AS sender trafikken ut av sitt nettverk så raskt som mulig — til nærmeste utgangspunkt, uavhengig av hva som er best for den totale ruten. Analogt til å kvitte seg med en varm potet raskest mulig.
                </p>
                <div className="rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] p-4">
                  <p className="text-sm font-bold mb-2">Eksempel:</p>
                  <p className="text-sm text-[var(--foreground)]">AS A ønsker å sende trafikk til prefiks P annonsert av AS C. AS A har to exit-punkter til AS C: via ruter R1 (OSPF-kost 50) og ruter R2 (OSPF-kost 10). Hot potato: send via R2 (lavere intra-AS kostnad), selv om den totale veien til P via R1 kanskje er kortere.</p>
                </div>
                <h4 className="font-bold text-blue-600 dark:text-blue-300 mt-2">BGP-attributter (beslutningsrekkefølge)</h4>
                <ol className="text-sm space-y-1 text-[var(--foreground)] list-decimal list-inside">
                  <li><strong>LOCAL_PREF:</strong> Høyere = foretrekkes. Satt av lokalt AS for policy.</li>
                  <li><strong>AS_PATH lengde:</strong> Kortere AS-sti foretrekkes</li>
                  <li><strong>ORIGIN:</strong> IGP {'>'} EGP {'>'} incomplete</li>
                  <li><strong>MED (Multi-Exit Discriminator):</strong> Lavere = foretrekkes</li>
                  <li><strong>eBGP over iBGP:</strong> Preferere eBGP-lærte ruter</li>
                  <li><strong>Hot potato:</strong> Lavest IGP-kost til NEXT_HOP</li>
                </ol>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Sammenligningstabll */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">OSPF vs BGP: Nøkkelforskjeller</h2>
        <div className="overflow-x-auto max-w-5xl">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900">
                <th className="border border-[var(--card-border)] p-3 text-left">Egenskap</th>
                <th className="border border-[var(--card-border)] p-3 text-left text-network-600 dark:text-network-300">OSPF</th>
                <th className="border border-[var(--card-border)] p-3 text-left text-blue-600 dark:text-blue-300">BGP</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Scope", "Intra-AS (innad i ett AS)", "Inter-AS (mellom AS-er)"],
                ["Algoritme", "Link-state (Dijkstra)", "Path-vector (Bellman-Ford variant)"],
                ["Mål", "Ytelse (laveste kost)", "Policy og økonomi"],
                ["Skala", "Noen hundre rutere", "Hele Internett (900 000+ prefiks)"],
                ["Transport", "Kjøres direkte over IP (protokoll 89)", "Kjøres over TCP (port 179)"],
                ["Konvergens", "Rask (sekunder)", "Sakte (minutter til timer)"],
                ["Informasjon", "Full topologi (LSA)", "Prefiks + AS-sti"],
              ].map(([egenskap, ospf, bgp], i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-[var(--card-bg)]"}>
                  <td className="border border-[var(--card-border)] p-3 font-semibold">{egenskap}</td>
                  <td className="border border-[var(--card-border)] p-3">{ospf}</td>
                  <td className="border border-[var(--card-border)] p-3">{bgp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-6 max-w-3xl">
        <h2 className="text-xl font-bold text-network-700 dark:text-network-300 mb-3">Hva du MÅ kunne til eksamen</h2>
        <ul className="space-y-2 text-sm text-[var(--foreground)]">
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare hva et autonomt system (AS) er og gi eksempler</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Skille mellom intra-AS og inter-AS ruting</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare OSPF: link-state, flooding av LSA, Dijkstra</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare BGP: path-vector, eBGP vs iBGP, AS_PATH</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare hot potato routing</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Sammenligne OSPF og BGP på nøkkelegenskaper</li>
        </ul>
      </section>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-4/teori/4-5" className="hover:text-[var(--accent)] text-sm">
          ← 4.5 Rutealgoritmer
        </Link>
        <Link href="/dat110/cn-4/teori/5-4" className="hover:text-[var(--accent)] text-sm">
          5.4 ICMP →
        </Link>
      </div>
    </div>
  );
}
