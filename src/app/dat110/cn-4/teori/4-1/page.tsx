"use client";

import Link from "next/link";
import { useState } from "react";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

export default function CN4_1Page() {
  const [activeTab, setActiveTab] = useState<"dataplan" | "kontrollplan">("dataplan");

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.1 Oversikt over nettverkslaget</span>
      </div>

      <h1 className="text-3xl font-bold">4.1 Oversikt over nettverkslaget</h1>
      <p className="text-[var(--muted)] max-w-3xl text-lg">
        Nettverkslaget er hjertet i Internett — det sørger for at pakker finner veien fra kilde til destinasjon gjennom et komplekst nett av rutere. Her lærer du de grunnleggende konseptene som all ruting og forwarding bygger på.
      </p>

      {/* Eksamenstips */}
      <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-5">
        <p className="text-sm font-bold text-network-700 dark:text-network-300 mb-1">Eksamenstips</p>
        <p className="text-sm text-[var(--foreground)]">
          Oppgave 1c i mai 2024-eksamen spør direkte: "What is the role of the forwarding function executed at the network layer?" — Svar: overføre datagram fra innkommende til utgående link (ikke beregne ruter). Skillet dataplan/kontrollplan er grunnleggende for hele kapittelet.
        </p>
      </div>

      {/* Seksjon 1: Nettverkslagets rolle */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Nettverkslagets rolle</h2>
        <p className="text-[var(--foreground)] max-w-3xl">
          Nettverkslaget er det eneste laget i TCP/IP-stakken som er implementert i <strong>alle nettverksenheter</strong> — både verter (hosts) og rutere. Dets primære ansvar er å transportere segmenter fra transportlaget fra en avsendervert til en mottakervert, på tvers av alle rutere i nettet.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
            <h3 className="font-bold text-lg mb-2">På avsendersiden</h3>
            <p className="text-sm text-[var(--muted)]">Nettverkslaget tar segmenter fra transportlaget, kapsler dem inn i <strong>datagrammer</strong> (IP-pakker), og sender dem ned til linklaget for overføring.</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
            <h3 className="font-bold text-lg mb-2">På mottakersiden</h3>
            <p className="text-sm text-[var(--muted)]">Nettverkslaget tar imot datagrammer fra linklaget, pakker dem ut, og leverer segmentene opp til transportlaget.</p>
          </div>
        </div>
      </section>

      {/* Seksjon 2: To nøkkelfunksjoner */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">De to nøkkelfunksjonene: Forwarding og Routing</h2>

        <div className="rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950 p-5 max-w-3xl">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-2">Viktig distinksjon — huskeregel</p>
          <p className="text-sm text-[var(--foreground)]">
            <strong>Forwarding</strong> er som å kjøre bilen gjennom et kryss — du ser på skiltet og velger riktig vei <em>akkurat nå</em>.<br/>
            <strong>Routing</strong> er som å planlegge hele turen på forhånd — du beregner hvilken vei som er best fra A til B.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-6">
            <h3 className="font-bold text-xl text-network-600 dark:text-network-300 mb-3">Forwarding (Videresending)</h3>
            <ul className="text-sm space-y-2 text-[var(--foreground)]">
              <li><strong>Hva:</strong> Flytte et datagram fra ruterens innkommende link til riktig utgående link</li>
              <li><strong>Når:</strong> Skjer for <em>hvert enkelt datagram</em> som ankommer ruteren</li>
              <li><strong>Verktøy:</strong> Forwardingtabellen (oppslagstabell)</li>
              <li><strong>Hastighet:</strong> Må skje i maskinvare — nanosekunder</li>
              <li><strong>Plan:</strong> Dataplan (data plane)</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-blue-400 bg-[var(--card-bg)] p-6">
            <h3 className="font-bold text-xl text-blue-600 dark:text-blue-300 mb-3">Routing (Ruting)</h3>
            <ul className="text-sm space-y-2 text-[var(--foreground)]">
              <li><strong>Hva:</strong> Beregne den beste veien fra kilde til destinasjon</li>
              <li><strong>Når:</strong> Skjer periodisk eller ved nettverksendringer</li>
              <li><strong>Verktøy:</strong> Rutealgoritmer (Dijkstra, Bellman-Ford)</li>
              <li><strong>Hastighet:</strong> Kan skje i programvare — millisekunder til sekunder</li>
              <li><strong>Plan:</strong> Kontrollplan (control plane)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Seksjon 3: Dataplan vs Kontrollplan */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Dataplan vs Kontrollplan</h2>

        {/* Interaktiv tab */}
        <div className="max-w-4xl">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab("dataplan")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                activeTab === "dataplan"
                  ? "bg-network-600 text-white"
                  : "bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-network-50 dark:hover:bg-network-900"
              }`}
            >
              Dataplan
            </button>
            <button
              onClick={() => setActiveTab("kontrollplan")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                activeTab === "kontrollplan"
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-blue-50 dark:hover:bg-blue-900"
              }`}
            >
              Kontrollplan
            </button>
          </div>

          {activeTab === "dataplan" && (
            <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-6 space-y-3">
              <h3 className="font-bold text-xl text-network-600 dark:text-network-300">Dataplan (Data Plane)</h3>
              <p className="text-[var(--foreground)]">
                Dataplanen er den <strong>lokale, per-ruter-funksjonen</strong> som bestemmer hvordan et ankommende datagram videresendes til en utgående link.
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
                <li>Implementert i ruterhardvare (ASIC-er)</li>
                <li>Bruker forwardingtabellen til oppslagsoperasjoner</li>
                <li>Opererer på nanosekund-skala</li>
                <li>Funksjon: input port → output port</li>
                <li>Longest-prefix match brukes til å finne riktig port</li>
              </ul>
              <div className="bg-network-50 dark:bg-network-900 rounded-lg p-3 text-sm font-mono">
                Datagram ankommer → sjekk destinasjons-IP → slå opp i forwardingtabell → send til output-port
              </div>
            </div>
          )}

          {activeTab === "kontrollplan" && (
            <div className="rounded-xl border-2 border-blue-400 bg-[var(--card-bg)] p-6 space-y-3">
              <h3 className="font-bold text-xl text-blue-600 dark:text-blue-300">Kontrollplan (Control Plane)</h3>
              <p className="text-[var(--foreground)]">
                Kontrollplanen er den <strong>nettverksomfattende logikken</strong> som bestemmer hvordan datagrammer rutes fra kilde til destinasjon gjennom mange rutere.
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
                <li>To tilnærminger: tradisjonell (distribuert) og SDN (sentralisert)</li>
                <li>Beregner og oppdaterer forwardingtabellene</li>
                <li>Rutingprotokoller: OSPF (intra-AS), BGP (inter-AS)</li>
                <li>Opererer på sekund- til minutt-skala</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-3 text-sm">
                <strong>Tradisjonell tilnærming:</strong> Rutingalgoritmer kjøres distribuert i hver ruter. Hver ruter beregner sin egen forwardingtabell basert på meldinger fra naboer.<br/><br/>
                <strong>SDN-tilnærming:</strong> En sentralisert kontroller beregner forwardingtabellene og distribuerer dem til alle rutere via det sørnorske API-et (OpenFlow).
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Seksjon 4: Virtuell krets vs datagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Nettverkslagets tjenester: Virtuell krets vs Datagram</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse max-w-4xl">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900">
                <th className="border border-[var(--card-border)] p-3 text-left font-bold">Egenskap</th>
                <th className="border border-[var(--card-border)] p-3 text-left font-bold text-network-600 dark:text-network-300">Datagram-nettverk (Internett)</th>
                <th className="border border-[var(--card-border)] p-3 text-left font-bold text-blue-600 dark:text-blue-300">Virtuell krets (VC)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--card-border)] p-3 font-semibold">Oppsett</td>
                <td className="border border-[var(--card-border)] p-3">Ikke nødvendig</td>
                <td className="border border-[var(--card-border)] p-3">Krever VC-oppsett (call setup)</td>
              </tr>
              <tr className="bg-[var(--card-bg)]">
                <td className="border border-[var(--card-border)] p-3 font-semibold">Adressering</td>
                <td className="border border-[var(--card-border)] p-3">Fullt destinasjons-IP i hvert datagram</td>
                <td className="border border-[var(--card-border)] p-3">Kort VC-nummer i hvert pakke</td>
              </tr>
              <tr>
                <td className="border border-[var(--card-border)] p-3 font-semibold">Rute</td>
                <td className="border border-[var(--card-border)] p-3">Hver pakke kan ta ulik vei</td>
                <td className="border border-[var(--card-border)] p-3">Fast vei for hele forbindelsen</td>
              </tr>
              <tr className="bg-[var(--card-bg)]">
                <td className="border border-[var(--card-border)] p-3 font-semibold">Rutertilstand</td>
                <td className="border border-[var(--card-border)] p-3">Ingen per-forbindelsesinformasjon</td>
                <td className="border border-[var(--card-border)] p-3">Ruterene holder VC-tilstand</td>
              </tr>
              <tr>
                <td className="border border-[var(--card-border)] p-3 font-semibold">Eksempler</td>
                <td className="border border-[var(--card-border)] p-3">Internett (IP)</td>
                <td className="border border-[var(--card-border)] p-3">ATM, Frame Relay (eldre)</td>
              </tr>
              <tr className="bg-[var(--card-bg)]">
                <td className="border border-[var(--card-border)] p-3 font-semibold">Ytelse</td>
                <td className="border border-[var(--card-border)] p-3">Variabel (best-effort)</td>
                <td className="border border-[var(--card-border)] p-3">Garantert (QoS mulig)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-amber-400 bg-amber-50 dark:bg-amber-950 p-4 max-w-3xl">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-1">Hvorfor bruker Internett datagram og ikke virtuell krets?</p>
          <p className="text-sm text-[var(--foreground)]">
            Internett ble designet for å koble sammen <em>eksisterende</em> heterogene nettverk. Datagram-tilnærmingen er enklere, mer robust (pakker kan reroutes rundt feil), og krever ikke at nettverket kjenner til applikasjonsstrømmene. Kompleksiteten flyttes til endepunktene (TCP på verter), ikke nettverket (rutere).
          </p>
        </div>
      </section>

      {/* Seksjon 5: Ruterarkitektur */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Ruterarkitektur (kort oversikt)</h2>
        <p className="text-[var(--foreground)] max-w-3xl">
          En ruter har fire hovedkomponenter som implementerer dataplan-funksjonen:
        </p>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          {[
            { navn: "Inngangsporter (Input ports)", beskrivelse: "Mottar innkommende pakker fra linklaget, slår opp i forwardingtabell (longest-prefix match), og buffrer pakker i kø." },
            { navn: "Svitsjenett (Switching fabric)", beskrivelse: "Kobler inngangsporter til utgangsporter. Kan bruke minne, buss eller krysspunktsmatrise." },
            { navn: "Utgangsporter (Output ports)", beskrivelse: "Buffrer pakker fra svitsjenett, sender dem ut på linklaget. Her skjer køing og pakkedropping." },
            { navn: "Ruteprosessor (Routing processor)", beskrivelse: "Kjører rutingprotokollene (OSPF, BGP), vedlikeholder forwardingtabellen. Dette er kontrollplanen." },
          ].map((k) => (
            <div key={k.navn} className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
              <h4 className="font-bold text-network-600 dark:text-network-300 mb-2">{k.navn}</h4>
              <p className="text-sm text-[var(--muted)]">{k.beskrivelse}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-6 max-w-3xl">
        <h2 className="text-xl font-bold text-network-700 dark:text-network-300 mb-3">Hva du MÅ kunne til eksamen</h2>
        <ul className="space-y-2 text-sm text-[var(--foreground)]">
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare forskjellen mellom forwarding og routing med egne ord</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare hva dataplan og kontrollplan er, og hva som tilhører hvert</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Sammenligne datagram-nettverk med virtuell krets (tabell)</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Vite at forwarding bruker forwardingtabellen og longest-prefix match</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Vite at routing beregner forwardingtabellen via rutealgoritmer</li>
        </ul>
      </section>

      {/* Videre lesning */}
      <div className="flex gap-4 text-sm text-network-600 dark:text-network-300 flex-wrap">
        <Link href="/dat110/cn-4/teori/4-2" className="hover:underline">→ Les om IPv4-headeren og CIDR (svært eksamensviktig)</Link>
        <Link href="/dat110/cn-4/teori/4-5" className="hover:underline">→ Les om rutealgoritmer (Dijkstra / Bellman-Ford)</Link>
      </div>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/cn-4/teori/4-2" className="hover:text-[var(--accent)] text-sm">
          4.2 IPv4: datagram, adressering og CIDR →
        </Link>
      </div>
    </div>
  );
}
