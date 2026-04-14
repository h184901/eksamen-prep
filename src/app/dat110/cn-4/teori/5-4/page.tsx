"use client";

import Link from "next/link";
import { useState } from "react";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

// Animert traceroute-visualisering
function TracerouteVisualisering() {
  const [step, setStep] = useState(0);

  const hops = [
    { name: "Ruter 1", ip: "10.0.0.1", ms: 2 },
    { name: "Ruter 2", ip: "172.16.0.1", ms: 8 },
    { name: "Ruter 3", ip: "195.0.1.1", ms: 25 },
    { name: "Ruter 4", ip: "193.45.0.1", ms: 45 },
    { name: "Destinasjon", ip: "8.8.8.8", ms: 52 },
  ];

  const maxStep = hops.length;

  return (
    <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-6 max-w-3xl space-y-5">
      <h3 className="font-bold text-lg text-network-700 dark:text-network-300">Traceroute-simulasjon</h3>
      <p className="text-xs text-[var(--muted)]">Kilde: 192.168.1.10 → Destinasjon: 8.8.8.8 (Google DNS)</p>

      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: maxStep }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i + 1)}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              step > i
                ? "bg-network-600 text-white"
                : "bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-network-50 dark:hover:bg-network-900"
            }`}
          >
            TTL={i + 1}
          </button>
        ))}
        <button
          onClick={() => setStep(0)}
          className="px-3 py-1 rounded text-xs font-semibold bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-red-50"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">
        {hops.map((hop, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-lg p-3 transition-all ${
              step === i + 1
                ? "bg-network-100 dark:bg-network-900 border-2 border-network-400"
                : step > i + 1
                ? "bg-green-50 dark:bg-green-950 border border-green-400"
                : "border border-[var(--card-border)]"
            }`}
          >
            <div className="font-mono text-xs w-8 text-center font-bold text-[var(--muted)]">{i + 1}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{hop.name}</span>
                <span className="font-mono text-xs text-[var(--muted)]">{hop.ip}</span>
              </div>
              {step >= i + 1 && (
                <div className="text-xs text-[var(--muted)] mt-0.5">
                  RTT: {hop.ms} ms
                  {step === i + 1 && i < hops.length - 1 && (
                    <span className="ml-2 text-orange-500 font-semibold">← ICMP Time Exceeded mottatt</span>
                  )}
                  {step >= i + 1 && i === hops.length - 1 && (
                    <span className="ml-2 text-green-500 font-semibold">← ICMP Echo Reply mottatt (destinasjon nådd!)</span>
                  )}
                </div>
              )}
            </div>
            {step >= i + 1 && (
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-network-600 dark:text-network-300">
                  TTL sendt={i + 1}
                </div>
                {i < hops.length - 1 && (
                  <div className="text-xs text-orange-500">TTL-0 → forkast</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {step > 0 && (
        <div className="bg-[var(--bg)] rounded-lg p-3 font-mono text-xs">
          <p className="font-bold text-[var(--foreground)] mb-1">Pakke med TTL={step} sendt:</p>
          {step <= hops.length - 1 ? (
            <>
              <p>→ Ankommer ruter {step} ({hops[step-1].ip})</p>
              <p>→ TTL dekrementeres: {step} → {step-1}</p>
              {step - 1 === 0 && <p className="text-orange-500">→ TTL=0! Ruteren kaster pakken</p>}
              {step - 1 === 0 && <p className="text-orange-500">→ Sender ICMP Time Exceeded (type 11, code 0) tilbake til kilde</p>}
              {step - 1 > 0 && <p>→ Videresender med TTL={step-1} mot neste hopp</p>}
            </>
          ) : (
            <>
              <p>→ Ankommer destinasjon {hops[step-1].ip}</p>
              <p className="text-green-500">→ ICMP Echo Reply (type 0) sendt tilbake!</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function CN5_4Page() {
  const [visMeldingstyper, setVisMeldingstyper] = useState(false);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">5.4 ICMP</span>
      </div>

      <h1 className="text-3xl font-bold">5.4 ICMP — Internet Control Message Protocol</h1>
      <p className="text-[var(--muted)] max-w-3xl text-lg">
        ICMP er nettverkslagets "diagnostikkprotokoll" — brukt av rutere og verter til å kommunisere nettverksfeil og teste tilkoblinger. ping og traceroute er de viktigste verktøyene som bruker ICMP.
      </p>

      {/* Hva er ICMP */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Hva er ICMP?</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
            <h3 className="font-bold mb-2">Plassering i protokollstakken</h3>
            <p className="text-sm text-[var(--foreground)]">
              ICMP er teknisk sett del av IP-laget (nettverkslaget), men kapsles inn i IP-datagrammer (Protocol-felt = 1). Det er <em>ikke</em> et transportlagsprotokoll — det gir ingen pålitelig overføring eller tilkoblingsoppsett.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
            <h3 className="font-bold mb-2">ICMP-meldingsformat</h3>
            <div className="font-mono text-xs bg-[var(--bg)] rounded-lg p-3 space-y-1">
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="bg-network-200 dark:bg-network-800 p-1 rounded">Type (8 bit)</div>
                <div className="bg-network-200 dark:bg-network-800 p-1 rounded">Code (8 bit)</div>
                <div className="bg-network-200 dark:bg-network-800 p-1 rounded">Checksum (16 bit)</div>
              </div>
              <div className="bg-[var(--card-bg)] p-1 rounded text-center">Innhold (varierer etter type)</div>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">Type og code identifiserer meldingstypen. Checksum dekker hele ICMP-meldingen.</p>
          </div>
        </div>
      </section>

      {/* Viktige meldingstyper */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Viktige ICMP-meldingstyper</h2>

        <div className="overflow-x-auto max-w-5xl">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900">
                <th className="border border-[var(--card-border)] p-3 text-center">Type</th>
                <th className="border border-[var(--card-border)] p-3 text-center">Code</th>
                <th className="border border-[var(--card-border)] p-3 text-left">Navn</th>
                <th className="border border-[var(--card-border)] p-3 text-left">Bruksområde</th>
              </tr>
            </thead>
            <tbody>
              {[
                [0, 0, "Echo Reply", "Svar fra ping — destinasjon er nådd"],
                [3, 0, "Destination Unreachable: Network", "Nettverket er ikke nåbart"],
                [3, 1, "Destination Unreachable: Host", "Verten er ikke nåbar"],
                [3, 2, "Destination Unreachable: Protocol", "Transportprotokollen ikke støttet"],
                [3, 3, "Destination Unreachable: Port", "UDP-port ikke åpen (viktig for traceroute)"],
                [4, 0, "Source Quench", "Overbelastet ruter ber sender slow down (utdatert)"],
                [8, 0, "Echo Request", "Ping-forespørsel — send fra kilde"],
                [9, 0, "Router Advertisement", "Ruter kunngjør seg selv"],
                [11, 0, "Time Exceeded: TTL=0 in transit", "TTL utløpt — KRITISK for traceroute"],
                [11, 1, "Time Exceeded: Fragment reassembly", "Fragmenter ble ikke satt sammen i tide"],
                [12, 0, "Parameter Problem", "Ugyldig header-felt"],
              ].map(([type, code, navn, beskrivelse], i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "" : "bg-[var(--card-bg)]"} ${
                    (type === 11 || type === 8 || type === 0) ? "border-l-4 border-l-network-400" : ""
                  }`}
                >
                  <td className="border border-[var(--card-border)] p-2 text-center font-mono font-bold">{type}</td>
                  <td className="border border-[var(--card-border)] p-2 text-center font-mono">{code}</td>
                  <td className="border border-[var(--card-border)] p-2 font-semibold text-xs">{navn}</td>
                  <td className="border border-[var(--card-border)] p-2 text-xs">{beskrivelse}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-[var(--muted)] mt-1">Rader med blå strek til venstre er de viktigste for eksamen (ping og traceroute)</p>
        </div>
      </section>

      {/* Ping */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">ping — testing av tilkoblinger</h2>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
            <h3 className="font-bold mb-2">Slik fungerer ping</h3>
            <ol className="text-sm space-y-2 text-[var(--foreground)] list-decimal list-inside">
              <li>Kilde sender <strong>ICMP Echo Request</strong> (type 8, code 0) til destinasjon</li>
              <li>Destinasjon svarer med <strong>ICMP Echo Reply</strong> (type 0, code 0)</li>
              <li>Kilde måler RTT (round-trip time)</li>
              <li>Gjentatt N ganger (vanligvis 4 eller uendelig)</li>
            </ol>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
            <h3 className="font-bold mb-2">ping-output (eksempel)</h3>
            <div className="font-mono text-xs bg-[var(--bg)] rounded-lg p-3 space-y-0.5">
              <p>$ ping 8.8.8.8</p>
              <p>64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12.3 ms</p>
              <p>64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=11.8 ms</p>
              <p>64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=12.1 ms</p>
              <p className="mt-1 text-[var(--muted)]">--- 8.8.8.8 ping statistics ---</p>
              <p className="text-[var(--muted)]">3 packets transmitted, 3 received</p>
              <p className="text-[var(--muted)]">rtt min/avg/max = 11.8/12.1/12.3 ms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Traceroute */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">traceroute — kartlegging av nettverksveien</h2>

        <p className="text-[var(--foreground)] max-w-3xl">
          Traceroute bruker TTL-feltet i IP-headeren til å avdekke hver enkelt ruter (hopp) på veien til destinasjonen. Det er et geniallt triks: ved å sende pakker med TTL=1, 2, 3, ... tvinger vi hver ruter til å sende tilbake sin IP-adresse.
        </p>

        <div className="rounded-xl border border-amber-400 bg-amber-50 dark:bg-amber-950 p-4 max-w-3xl">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-1">Genialiteten bak traceroute</p>
          <p className="text-sm text-[var(--foreground)]">
            Når TTL dekrementeres til 0 i en ruter, er ruteren <em>pålagt</em> å sende tilbake en ICMP Time Exceeded-melding til kilden. Denne meldingen inneholder ruterens IP-adresse! Slik kan traceroute kartlegge hele ruten uten noen spesiell støtte fra rutere.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-2">Steg-for-steg traceroute</h3>
        <TracerouteVisualisering />

        <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-5 max-w-4xl space-y-3">
          <h3 className="font-bold text-network-700 dark:text-network-300">Traceroute — detaljert prosess</h3>
          <div className="space-y-2 text-sm text-[var(--foreground)]">
            <div className="flex gap-3">
              <span className="font-bold text-network-600 dark:text-network-300 w-6">1.</span>
              <span>Send 3 pakker med TTL=1 (på Linux: UDP til høy port, på Windows: ICMP Echo Request)</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-network-600 dark:text-network-300 w-6">2.</span>
              <span>Ruter 1 dekrementerer TTL til 0, kaster pakken, sender ICMP Time Exceeded (type 11, code 0) tilbake</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-network-600 dark:text-network-300 w-6">3.</span>
              <span>Mål RTT til Ruter 1. Skriv ut Ruter 1s IP og RTT</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-network-600 dark:text-network-300 w-6">4.</span>
              <span>Gjenta med TTL=2, 3, 4... til destinasjonen er nådd</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-network-600 dark:text-network-300 w-6">5.</span>
              <span>Destinasjon: UDP-port er trolig stengt → ICMP Port Unreachable (type 3, code 3) → vi vet vi er fremme</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 max-w-4xl">
          <h3 className="font-bold mb-2">traceroute-output (eksempel)</h3>
          <div className="font-mono text-xs bg-[var(--bg)] rounded-lg p-3 space-y-0.5">
            <p>$ traceroute 8.8.8.8</p>
            <p>traceroute to 8.8.8.8, 30 hops max</p>
            <p> 1  10.0.0.1 (10.0.0.1)    2.1 ms   2.0 ms   2.2 ms</p>
            <p> 2  172.16.0.1 (172.16.0.1)  8.3 ms   8.1 ms   8.5 ms</p>
            <p> 3  195.0.1.1 (195.0.1.1)  25.4 ms  25.2 ms  25.6 ms</p>
            <p> 4  * * *   (ingen respons — brannmur blokkerer ICMP)</p>
            <p> 5  8.8.8.8 (8.8.8.8)     52.1 ms  51.9 ms  52.3 ms</p>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">* * * betyr at ruteren ikke svarer på ICMP — ikke nødvendigvis brudd i ruten</p>
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-6 max-w-3xl">
        <h2 className="text-xl font-bold text-network-700 dark:text-network-300 mb-3">Hva du MÅ kunne til eksamen</h2>
        <ul className="space-y-2 text-sm text-[var(--foreground)]">
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare hva ICMP er og dens rolle (feilrapportering, ikke pålitelig transport)</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Vite de viktigste meldingstypene: type 0, 3, 8, 11 med koder</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare hvordan ping fungerer (Echo Request/Reply)</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare traceroute steg for steg med TTL-triks</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare hva ICMP Time Exceeded (type 11, code 0) betyr</li>
        </ul>
      </section>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-4/teori/5-2" className="hover:text-[var(--accent)] text-sm">
          ← 5.2 Rutingprotokoller
        </Link>
        <Link href="/dat110/cn-4/teori/5-6" className="hover:text-[var(--accent)] text-sm">
          5.6 SDN →
        </Link>
      </div>
    </div>
  );
}
