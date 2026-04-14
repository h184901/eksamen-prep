"use client";

import Link from "next/link";
import { useState } from "react";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

export default function CN5_6Page() {
  const [visOpenFlow, setVisOpenFlow] = useState(false);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">5.6 SDN — Software-Defined Networking</span>
      </div>

      <h1 className="text-3xl font-bold">5.6 SDN — Software-Defined Networking</h1>
      <p className="text-[var(--muted)] max-w-3xl text-lg">
        SDN er et paradigmeskifte i nettverksarkitektur: kontrollplanen skilles ut fra dataplanen og sentraliseres i én programvarebasert kontroller. Dette muliggjør fleksibel, programmatisk nettverksstyring.
      </p>

      {/* Motivasjon */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Problemet med tradisjonell nettverksarkitektur</h2>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          <div className="rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950 p-5">
            <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Tradisjonell (distribuert)</h3>
            <ul className="text-sm space-y-1 text-[var(--foreground)] list-disc list-inside">
              <li>Kontrollplan og dataplan <em>integrert</em> i hver ruter</li>
              <li>Vanskeleg å endre rutingpolitikk globalt</li>
              <li>Krever konfigurasjon av hundrevis av individuelle enheter</li>
              <li>Proprietær maskinvare fra Cisco, Juniper etc.</li>
              <li>Sakte adopsjon av nye protokoller</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-green-400 bg-green-50 dark:bg-green-950 p-5">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">SDN (sentralisert kontroll)</h3>
            <ul className="text-sm space-y-1 text-[var(--foreground)] list-disc list-inside">
              <li>Kontrollplan kjøres i én sentral <strong>kontroller</strong></li>
              <li>Enkel global nettverksstyring via programvare</li>
              <li>Ruterne er enkle "dumme" videresendingsenheter</li>
              <li>Åpne standarder og grensesnitt (OpenFlow)</li>
              <li>Rask implementasjon av nye features</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-amber-400 bg-amber-50 dark:bg-amber-950 p-4 max-w-3xl">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-1">Analogi: Flytrafikk</p>
          <p className="text-sm text-[var(--foreground)]">
            Tradisjonell ruting: Hvert fly (ruter) bestemmer selv sin rute basert på lokal informasjon. SDN: Alle fly styres av ett sentralisert flygeledersenter (SDN-kontroller) som har oversikt over hele luftrommet og kan optimalisere alle ruter samlet.
          </p>
        </div>
      </section>

      {/* SDN-arkitektur */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">SDN-arkitektur</h2>

        <div className="max-w-4xl">
          {/* Visuell arkitektur */}
          <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] overflow-hidden">
            {/* Applikasjonslag */}
            <div className="bg-purple-100 dark:bg-purple-900 p-4 border-b border-[var(--card-border)]">
              <p className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-2">APPLIKASJONSLAG</p>
              <div className="flex gap-3 flex-wrap">
                {["Load Balancing-app", "Brannmur-app", "Trafikkmonitorering", "QoS-app"].map(app => (
                  <div key={app} className="bg-purple-200 dark:bg-purple-800 rounded-lg px-3 py-1.5 text-xs font-semibold text-purple-800 dark:text-purple-200">{app}</div>
                ))}
              </div>
            </div>
            {/* Northbound API */}
            <div className="bg-gray-100 dark:bg-gray-800 p-2 text-center text-xs text-[var(--muted)] border-b border-[var(--card-border)]">
              ↕ Northbound API (REST/OpenDaylight API)
            </div>
            {/* Kontrollplan */}
            <div className="bg-network-100 dark:bg-network-900 p-4 border-b border-[var(--card-border)]">
              <p className="text-xs font-bold text-network-700 dark:text-network-300 mb-2">KONTROLLPLAN (SDN-kontroller)</p>
              <div className="grid grid-cols-3 gap-2">
                {["Topologimodul", "Rutingmodul", "Flow Table Manager"].map(m => (
                  <div key={m} className="bg-network-200 dark:bg-network-800 rounded-lg px-2 py-2 text-xs text-center font-semibold text-network-800 dark:text-network-200">{m}</div>
                ))}
              </div>
              <p className="text-xs text-[var(--muted)] mt-2">Eksempler: OpenDaylight, ONOS, Floodlight</p>
            </div>
            {/* Southbound API */}
            <div className="bg-gray-100 dark:bg-gray-800 p-2 text-center text-xs text-[var(--muted)] border-b border-[var(--card-border)]">
              ↕ Southbound API / OpenFlow-protokoll
            </div>
            {/* Infrastrukturlag */}
            <div className="bg-blue-50 dark:bg-blue-950 p-4">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">INFRASTRUKTURLAG (dataplanen — "dumme" svitsjer)</p>
              <div className="flex gap-3 flex-wrap">
                {["Svitsj 1", "Svitsj 2", "Svitsj 3", "Svitsj 4", "Svitsj 5"].map(s => (
                  <div key={s} className="bg-blue-200 dark:bg-blue-800 rounded-lg px-3 py-2 text-xs text-center font-semibold text-blue-800 dark:text-blue-200">
                    <div>{s}</div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400">Flow table</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OpenFlow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">OpenFlow: Match + Action</h2>

        <p className="text-[var(--foreground)] max-w-3xl">
          OpenFlow er den dominerende southbound-protokollen mellom SDN-kontrolleren og svitsjene. Hvert OpenFlow-entry i svitsjens flow table har to deler: <strong>match</strong> (hvilke pakker?) og <strong>action</strong> (hva gjøre med dem?).
        </p>

        <button
          onClick={() => setVisOpenFlow(!visOpenFlow)}
          className="bg-network-600 hover:bg-network-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          {visOpenFlow ? "Skjul" : "Vis"} OpenFlow match+action eksempler
        </button>

        {visOpenFlow && (
          <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-6 max-w-5xl space-y-4">
            <h3 className="font-bold text-network-700 dark:text-network-300">OpenFlow flow table</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-network-100 dark:bg-network-900">
                    <th className="border border-[var(--card-border)] p-2">Match (på disse feltene)</th>
                    <th className="border border-[var(--card-border)] p-2">Action</th>
                    <th className="border border-[var(--card-border)] p-2">Prioritet</th>
                    <th className="border border-[var(--card-border)] p-2">Eksempel / Funksjon</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["src=10.0.0.1, dst=10.0.0.3", "send til port 3", "100", "Forwarding: send pakker fra H1 til H3 via port 3"],
                    ["dst=10.0.0.*, src=*", "send til port 1", "50", "Default forwarding til subnett"],
                    ["src=20.0.0.*, dst=*", "drop", "200", "Brannmur: blokkere trafikk fra ondsinnet subnett"],
                    ["dst=10.0.0.2, proto=TCP, port=80", "send til port 2 og 4", "150", "Load balancing: spre HTTP-trafikk til to servere"],
                    ["*", "send til kontroller", "0", "Send ukjente pakker til kontroller for beslutning"],
                  ].map(([match, action, prio, eks], i) => (
                    <tr key={i} className={i % 2 === 0 ? "" : "bg-[var(--bg)]"}>
                      <td className="border border-[var(--card-border)] p-2 font-mono text-network-600 dark:text-network-300">{match}</td>
                      <td className="border border-[var(--card-border)] p-2 font-mono font-bold text-green-600 dark:text-green-400">{action}</td>
                      <td className="border border-[var(--card-border)] p-2 text-center">{prio}</td>
                      <td className="border border-[var(--card-border)] p-2 text-[var(--muted)]">{eks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-[var(--card-border)] bg-[var(--bg)] p-4">
                <h4 className="font-bold mb-2">Match-felt (OpenFlow 1.0+)</h4>
                <ul className="text-xs space-y-1 text-[var(--foreground)] list-disc list-inside">
                  <li>Input port</li>
                  <li>Ethernet: src/dst MAC, type</li>
                  <li>IP: src/dst IP, protocol, TOS</li>
                  <li>TCP/UDP: src/dst port</li>
                  <li>VLAN ID og prioritet</li>
                </ul>
              </div>
              <div className="rounded-lg border border-[var(--card-border)] bg-[var(--bg)] p-4">
                <h4 className="font-bold mb-2">Action-typer</h4>
                <ul className="text-xs space-y-1 text-[var(--foreground)] list-disc list-inside">
                  <li><strong>Forward:</strong> Send til spesifikk port(er)</li>
                  <li><strong>Drop:</strong> Kast pakken</li>
                  <li><strong>Modify:</strong> Endre header-felt</li>
                  <li><strong>Send to controller:</strong> Videresend til SDN-kontroller</li>
                  <li><strong>Flood:</strong> Send til alle porter</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Fordeler med SDN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Fordeler med SDN</h2>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          {[
            {
              tittel: "Programmatisk kontroll",
              tekst: "Nettverket kan styres via API-er fra vanlig programvare. Nettverk-as-code muliggjør automatisering og versjonskontroll av nettverkskonfigurasjon.",
            },
            {
              tittel: "Sentralisert oversikt",
              tekst: "Kontrolleren har global nettverksovervåking — kan oppdage trafikkanomalier, optimalisere globalt og rekonfigurere raskt ved feil.",
            },
            {
              tittel: "Åpne standarder",
              tekst: "OpenFlow er åpen — frigjør organisasjoner fra proprietær maskinvare. Billigere 'white-box' svitsjer kan brukes.",
            },
            {
              tittel: "Innovasjonsplattform",
              tekst: "Nye nettverksfunksjoner implementeres som programvare på kontrolleren, ikke som fastvare i rutere. Raskere innovasjonssyklus.",
            },
          ].map(({ tittel, tekst }) => (
            <div key={tittel} className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
              <h3 className="font-bold text-network-600 dark:text-network-300 mb-2">{tittel}</h3>
              <p className="text-sm text-[var(--muted)]">{tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SDN vs tradisjonell */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">SDN vs tradisjonell nettverksarkitektur</h2>
        <div className="overflow-x-auto max-w-4xl">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900">
                <th className="border border-[var(--card-border)] p-3 text-left">Egenskap</th>
                <th className="border border-[var(--card-border)] p-3 text-left text-[var(--muted)]">Tradisjonell</th>
                <th className="border border-[var(--card-border)] p-3 text-left text-network-600 dark:text-network-300">SDN</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Kontrollplan", "Distribuert (i hver ruter)", "Sentralisert (SDN-kontroller)"],
                ["Dataplan", "I ruteren (integrated)", "I ruteren (separert fra kontroll)"],
                ["Konfigurasjon", "CLI på hvert enkelt utstyr", "API-kall til kontroller"],
                ["Synlighet", "Lokal (per-ruter)", "Global (hele nettverket)"],
                ["Protokoll-eksempel", "OSPF, BGP, RSTP", "OpenFlow, NETCONF, P4"],
                ["Utstyr", "Cisco/Juniper (proprietær)", "White-box + åpen programvare"],
                ["Robusthet", "God (desentralisert)", "Risiko: single point of failure (kontroller)"],
              ].map(([egenskap, trad, sdn], i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-[var(--card-bg)]"}>
                  <td className="border border-[var(--card-border)] p-3 font-semibold">{egenskap}</td>
                  <td className="border border-[var(--card-border)] p-3 text-[var(--muted)]">{trad}</td>
                  <td className="border border-[var(--card-border)] p-3">{sdn}</td>
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
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare hva SDN er og hva som skiller det fra tradisjonell arkitektur</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare separasjonen av dataplan og kontrollplan</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Beskrive SDN-arkitekturens tre lag: applikasjon, kontroll, infrastruktur</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare OpenFlow match+action-prinsippet</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Nevne minst 2-3 fordeler med SDN</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Nevne ulemper/risiko med SDN (single point of failure)</li>
        </ul>
      </section>

      {/* Eksamenstips */}
      <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-5 max-w-3xl">
        <p className="text-sm font-bold text-network-700 dark:text-network-300 mb-1">Eksamenstips</p>
        <p className="text-sm text-[var(--foreground)]">
          SDN er et "kursorisk" tema i pensum — ikke forvent detaljerte beregningsoppgaver. Fokus på konsepter: hva SDN er, skillet dataplan/kontrollplan, OpenFlow-prinsippet, og fordeler. Kan dukke opp som et kort definisjonsspørsmål.
        </p>
      </div>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-4/teori/5-4" className="hover:text-[var(--accent)] text-sm">
          ← 5.4 ICMP
        </Link>
        <div />
      </div>
    </div>
  );
}
