"use client";

import { useState } from "react";
import Link from "next/link";

const LAYERS = [
  {
    nr: 5,
    navn: "Applikasjon",
    pdu: "Melding",
    proto: ["HTTP", "SMTP", "IMAP", "DNS", "FTP"],
    farge: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-400",
    text: "text-purple-700 dark:text-purple-300",
    hvem: "Verter (hosts)",
    hva: "Kommunikasjon mellom applikasjonsprosesser. Brukerne av nettverket. HTTP henter websider, SMTP sender e-post, DNS oversetter navn til IP-adresser.",
    service: "Tilbyr meldingsutveksling mellom applikasjoner pA ulike verter.",
    implementert: "Applikasjonsprogrammer (nettlesere, e-postklienter)",
  },
  {
    nr: 4,
    navn: "Transport",
    pdu: "Segment",
    proto: ["TCP", "UDP"],
    farge: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-400",
    text: "text-blue-700 dark:text-blue-300",
    hvem: "Verter (hosts)",
    hva: "Prosess-til-prosess dataoverforing. TCP: pAlitelig, ordnet, flytkontroll, feiloppretting. UDP: rask, upAlitelig, ingen tilkobling. Porter identifiserer prosesser (0-65535).",
    service: "PAlitelig (TCP) eller upAlitelig (UDP) end-to-end levering av segmenter mellom prosesser.",
    implementert: "Operativsystemets nettverksstakk (kjernen)",
  },
  {
    nr: 3,
    navn: "Nettverk",
    pdu: "Datagram",
    proto: ["IP", "ICMP", "Rutingsprotokoller"],
    farge: "bg-green-500",
    lightBg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-400",
    text: "text-green-700 dark:text-green-300",
    hvem: "Verter + Rutere",
    hva: "Ruting av datagrammer fra kilde til destinasjon over multiple nettverk. IP-adresser identifiserer endesystemer. IP er beste-innsats (best-effort): ingen garantier.",
    service: "Beste-innsats levering av datagrammer mellom verter (potensielt over mange hopp).",
    implementert: "Operativsystemet og rutere (lag 1-3)",
  },
  {
    nr: 2,
    navn: "Link",
    pdu: "Ramme (Frame)",
    proto: ["Ethernet", "802.11 (WiFi)", "PPP"],
    farge: "bg-orange-500",
    lightBg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-400",
    text: "text-orange-700 dark:text-orange-300",
    hvem: "Verter + Rutere + Svitsjer",
    hva: "Dataoverforing over EN enkelt kommunikasjonsforbindelse. MAC-adresser identifiserer enheter pA linknivA. Feildeteksjon (CRC). Adressering med 48-bit MAC-adresser.",
    service: "Overf\u00f8ring av rammer over en enkelt link (fra node til nabnode). PAlitelig ELLER upAlitelig avhengig av protokoll.",
    implementert: "Nettverkskort (NIC) og svitsjer",
  },
  {
    nr: 1,
    navn: "Fysisk",
    pdu: "Bits",
    proto: ["Kobber", "Fiber", "Radio"],
    farge: "bg-red-500",
    lightBg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-400",
    text: "text-red-700 dark:text-red-300",
    hvem: "Verter + Rutere + Svitsjer",
    hva: "Overforing av individuelle bits over det fysiske mediet. Ingen adressering, ingen struktur &mdash; bare bits. Definerer elektriske/optiske signaler, pinnekonnektorer og fysisk topologi.",
    service: "Overforing av bits over en kommunikasjonsforbindelse (ledning, fiber, radio).",
    implementert: "Fysisk maskinvare (kabler, sendere, mottakere)",
  },
];

function ProtocolStackDiagram({ activeLayer, onSelect }: { activeLayer: number | null; onSelect: (n: number | null) => void }) {
  return (
    <div className="space-y-1">
      {LAYERS.map((lag) => (
        <button
          key={lag.nr}
          onClick={() => onSelect(activeLayer === lag.nr ? null : lag.nr)}
          className={`w-full rounded-lg px-4 py-2.5 flex items-center justify-between transition-all border-2 ${lag.lightBg} ${lag.border} ${activeLayer === lag.nr ? "ring-2 ring-offset-2 ring-network-400" : ""}`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full ${lag.farge} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
              {lag.nr}
            </div>
            <span className={`font-bold text-sm ${lag.text}`}>{lag.navn}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
            <span className="font-mono bg-white/60 dark:bg-neutral-900/40 px-2 py-0.5 rounded">{lag.pdu}</span>
            <span className="hidden sm:inline">{lag.proto.slice(0, 2).join(", ")}</span>
            <span>{activeLayer === lag.nr ? "▲" : "▼"}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function CN1_5Page() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [showEncapsulation, setShowEncapsulation] = useState(false);
  const [showOSI, setShowOSI] = useState(false);
  const [showKapsling, setShowKapsling] = useState(false);

  const selectedLayer = LAYERS.find(l => l.nr === activeLayer);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.5 Protokolllag og tjenestemodeller</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">1.5 Protokolllag og tjenestemodeller</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Protokollstakken er internetts mest grunnleggende arkitekturprinsipp.
          Lagdelingen lar oss bygge et komplekst system ut av enkle, utskiftbare komponenter.
          Dette er sentralt i eksamen og i prosjektarbeidet (oblig 1 implementerer lag 4-6).
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
        <ul className="space-y-1">
          {[
            "TCP/IP 5-lagsmodellen: navn, PDU og protokoller for hvert lag",
            "Hva hvert lag gjor og hvilken tjeneste det tilbyr laget over",
            "Hvilke lag verter, rutere og svitsjer implementerer",
            "Kapsling (encapsulation): hvordan headere legges til nedover stakken",
            "Dekapsling (decapsulation): hvordan headere fjernes oppover stakken",
            "Forskjellen mellom TCP/IP (5-lag) og OSI (7-lag)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hvorfor lagdeling? */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Hvorfor lagdeling?
        </h2>

        <div className="rounded-xl border-2 border-network-400/60 bg-network-50 dark:bg-network-950/20 p-4 text-sm space-y-3">
          <p>
            Det er et <strong>enormt gap</strong> mellom:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
              <p className="font-bold text-xs">Det applikasjoner trenger:</p>
              <p className="text-xs text-[var(--muted)] mt-1">Utveksle meldinger mellom prosesser pA ulike hosts over hele verden, palitelig og effektivt.</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
              <p className="font-bold text-xs">Hva fysisk laget gir:</p>
              <p className="text-xs text-[var(--muted)] mt-1">UpAlitelig overf\u00f8ring av bits over en enkelt kobberleder, fiber eller radiob\u00f8lge.</p>
            </div>
          </div>
          <p className="text-[var(--muted)]">
            Lagdelingen <strong>bruer dette gapet</strong> med 5 lag, der hvert lag
            l\u00f8ser ett problem og tilbyr en bedre tjeneste til laget over.
          </p>
          <div className="grid sm:grid-cols-3 gap-2 text-xs">
            {[
              { fordel: "Modularitet", forklaring: "Hvert lag kan endres uavhengig (bytt ut WiFi med Ethernet uten A endre TCP)" },
              { fordel: "Abstrahering", forklaring: "Applikasjoner trenger ikke vite om kabler og signaler" },
              { fordel: "Standardisering", forklaring: "Gj\u00f8r det mulig A bygge interoperable produkter fra ulike leverandorer" },
            ].map(({ fordel, forklaring }) => (
              <div key={fordel} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2">
                <p className="font-bold">{fordel}</p>
                <p className="text-[var(--muted)] mt-0.5">{forklaring}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TCP/IP protokollstakk */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          TCP/IP 5-lagsmodell
        </h2>
        <p className="text-sm text-[var(--muted)]">Klikk pA et lag for A se detaljer.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <ProtocolStackDiagram activeLayer={activeLayer} onSelect={setActiveLayer} />

          <div>
            {selectedLayer ? (
              <div className={`rounded-xl border-2 p-4 h-full ${selectedLayer.lightBg} ${selectedLayer.border}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-7 h-7 rounded-full ${selectedLayer.farge} flex items-center justify-center text-white text-sm font-bold`}>
                    {selectedLayer.nr}
                  </div>
                  <div>
                    <h3 className={`font-bold ${selectedLayer.text}`}>{selectedLayer.navn}lag</h3>
                    <p className="text-xs text-[var(--muted)]">PDU: {selectedLayer.pdu}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-bold text-xs mb-1">Protokoller:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedLayer.proto.map(p => (
                        <span key={p} className="px-2 py-0.5 rounded bg-white/60 dark:bg-neutral-900/40 text-xs font-mono">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-xs mb-1">Hva det gjor:</p>
                    <p className="text-xs text-[var(--muted)]">{selectedLayer.hva}</p>
                  </div>
                  <div>
                    <p className="font-bold text-xs mb-1">Tjeneste til laget over:</p>
                    <p className="text-xs text-[var(--muted)]">{selectedLayer.service}</p>
                  </div>
                  <div>
                    <p className="font-bold text-xs mb-1">Implementert i:</p>
                    <p className="text-xs text-[var(--muted)]">{selectedLayer.implementert}</p>
                  </div>
                  <div>
                    <p className="font-bold text-xs mb-1">Hvem har dette laget:</p>
                    <p className="text-xs text-[var(--muted)]">{selectedLayer.hvem}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 h-full flex items-center justify-center text-sm text-[var(--muted)]">
                Klikk pA et lag for A se detaljer
              </div>
            )}
          </div>
        </div>

        {/* Hvem implementerer hva tabell */}
        <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
          <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-3">Hvem implementerer hvilke lag?</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-amber-200 dark:border-amber-800">
                  <th className="text-left px-3 py-2">Enhet</th>
                  <th className="text-center px-3 py-2">Lag 1 (Fysisk)</th>
                  <th className="text-center px-3 py-2">Lag 2 (Link)</th>
                  <th className="text-center px-3 py-2">Lag 3 (Nettverk)</th>
                  <th className="text-center px-3 py-2">Lag 4 (Transport)</th>
                  <th className="text-center px-3 py-2">Lag 5 (App.)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { enhet: "Vert (host)", lag: [true, true, true, true, true] },
                  { enhet: "Ruter", lag: [true, true, true, false, false] },
                  { enhet: "Link-svitsj", lag: [true, true, false, false, false] },
                ].map(({ enhet, lag }) => (
                  <tr key={enhet} className="border-b border-amber-100 dark:border-amber-900/30">
                    <td className="px-3 py-2 font-medium">{enhet}</td>
                    {lag.map((har, i) => (
                      <td key={i} className="px-3 py-2 text-center">
                        {har ? <span className="text-green-600 dark:text-green-400 font-bold">&#10003;</span> : <span className="text-gray-300 dark:text-gray-600">&mdash;</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">
            Viktig for eksamen: Rutere implementerer lag 1-3 (ikke transport/applikasjon).
            Dette er hvorfor IP-headeren leses og endres (TTL) i rutere, men TCP-headeren forblir uendret.
          </p>
        </div>
      </section>

      {/* Kapsling */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Kapsling og dekapsling
        </h2>

        <button
          onClick={() => setShowKapsling(!showKapsling)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Vis kapslingsprosessen steg for steg</span>
          <span>{showKapsling ? "▲" : "▼"}</span>
        </button>
        {showKapsling && (
          <div className="rounded-xl border-2 border-network-400/60 bg-network-50 dark:bg-network-950/20 p-4 text-sm space-y-4">
            <p className="font-bold">Sending (kapsling, lag 5 &rarr; lag 1):</p>
            <div className="space-y-2">
              {[
                { lag: "Applikasjon", handling: "Lager melding M", resultat: "[ M ]", farge: "bg-purple-100 dark:bg-purple-900/30" },
                { lag: "Transport", handling: "Legger til TCP-header (kilde/dest-port, sekv.nr)", resultat: "[ TCP-hdr | M ]", farge: "bg-blue-100 dark:bg-blue-900/30" },
                { lag: "Nettverk", handling: "Legger til IP-header (kilde/dest IP-adresse)", resultat: "[ IP-hdr | TCP-hdr | M ]", farge: "bg-green-100 dark:bg-green-900/30" },
                { lag: "Link", handling: "Legger til Ethernet-header + trailer (MAC-adr., CRC)", resultat: "[ Eth-hdr | IP-hdr | TCP-hdr | M | Eth-trail ]", farge: "bg-orange-100 dark:bg-orange-900/30" },
                { lag: "Fysisk", handling: "Konverterer rammen til bits og sender", resultat: "010110100101...", farge: "bg-red-100 dark:bg-red-900/30" },
              ].map(({ lag, handling, resultat, farge }) => (
                <div key={lag} className={`rounded-lg ${farge} p-2 flex flex-col sm:flex-row sm:items-center gap-2`}>
                  <span className="font-bold text-xs w-24 shrink-0">{lag}:</span>
                  <span className="text-xs text-[var(--muted)] flex-1">{handling}</span>
                  <code className="text-xs font-mono bg-white/60 dark:bg-neutral-900/40 px-2 py-1 rounded">{resultat}</code>
                </div>
              ))}
            </div>

            <p className="font-bold mt-3">Mottak (dekapsling, lag 1 &rarr; lag 5):</p>
            <p className="text-xs text-[var(--muted)]">
              Prosessen reverses. Hvert lag leser og fjerner sin header, sjekker for feil,
              og sender den resterende dataen oppover til neste lag. Applikasjonslaget
              fAr til slutt den originale meldingen M.
            </p>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 p-2 text-xs">
              <strong>Viktig:</strong> Rutere mA dekapsulere til lag 3 for A lese IP-adressen og bestemme
              neste hopp. De re-kapsulerer sA med ny lag-2-header for neste link.
            </div>
          </div>
        )}

        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm">
          <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">PDU-navn per lag</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-blue-200 dark:border-blue-800">
                  <th className="text-left px-3 py-1.5">Lag</th>
                  <th className="text-left px-3 py-1.5">PDU-navn</th>
                  <th className="text-left px-3 py-1.5">Innhold</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["5 - Applikasjon", "Melding (Message)", "App-data (HTML, JSON, e-post)"],
                  ["4 - Transport", "Segment", "TCP/UDP-header + Melding"],
                  ["3 - Nettverk", "Datagram", "IP-header + Segment"],
                  ["2 - Link", "Ramme (Frame)", "Eth/WiFi-header + Datagram + trailer"],
                  ["1 - Fysisk", "Bits", "0-er og 1-ere"],
                ].map(([lag, pdu, innhold], i) => (
                  <tr key={lag} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-blue-50/50 dark:bg-blue-950/10"}>
                    <td className="px-3 py-1.5 font-medium">{lag}</td>
                    <td className="px-3 py-1.5 font-mono">{pdu}</td>
                    <td className="px-3 py-1.5 text-[var(--muted)]">{innhold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* OSI vs TCP/IP */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          TCP/IP (5-lag) vs. OSI-modellen (7-lag)
        </h2>

        <button
          onClick={() => setShowOSI(!showOSI)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Se sammenligning av TCP/IP og OSI</span>
          <span>{showOSI ? "▲" : "▼"}</span>
        </button>
        {showOSI && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="font-bold mb-2 text-center">TCP/IP (5 lag)</p>
                {["5. Applikasjon", "4. Transport", "3. Nettverk", "2. Link", "1. Fysisk"].map((l, i) => (
                  <div key={l} className={`text-center py-1.5 text-xs font-medium border-b last:border-b-0 ${i===0?"bg-purple-100 dark:bg-purple-900/30":i===1?"bg-blue-100 dark:bg-blue-900/30":i===2?"bg-green-100 dark:bg-green-900/30":i===3?"bg-orange-100 dark:bg-orange-900/30":"bg-red-100 dark:bg-red-900/30"}`}>{l}</div>
                ))}
              </div>
              <div>
                <p className="font-bold mb-2 text-center">OSI (7 lag)</p>
                {["7. Applikasjon", "6. Presentasjon", "5. Sesjon", "4. Transport", "3. Nettverk", "2. Datalink", "1. Fysisk"].map((l, i) => (
                  <div key={l} className={`text-center py-1 text-xs border-b last:border-b-0 ${i<3?"bg-purple-100 dark:bg-purple-900/30":i===3?"bg-blue-100 dark:bg-blue-900/30":i===4?"bg-green-100 dark:bg-green-900/30":i===5?"bg-orange-100 dark:bg-orange-900/30":"bg-red-100 dark:bg-red-900/30"}`}>{l}</div>
                ))}
              </div>
            </div>
            <div className="text-xs text-[var(--muted)] space-y-1">
              <p>OSI deler TCP/IPs applikasjonslag i tre: applikasjon, presentasjon (kryptering, komprimering) og sesjon (dialogstyring).</p>
              <p>I praksis brukes TCP/IP. OSI brukes som referansemodell for A forklare konsepter.</p>
              <p className="font-bold">For eksamen: bruk TCP/IP 5-lag med mindre oppgaven eksplisitt spor om OSI.</p>
            </div>
          </div>
        )}
      </section>

      {/* Forbindelsen til obligen */}
      <div className="rounded-xl border-2 border-network-400/60 bg-network-50 dark:bg-network-950/20 p-4 text-sm">
        <h3 className="font-bold text-network-600 dark:text-network-400 mb-2">Koblingen til oblig 1</h3>
        <p className="text-[var(--muted)]">
          Oblig 1 implementerte tre protokollag (applikasjon, RPC-lag og socket/TCP-lag).
          Eksamen spor ofte: "List opp de tre protokollagene og forklar kort hvordan de henger sammen."
          Svaret: applikasjonslaget bruker RPC-mellomvaren (som er et hjemmelaget applikasjonslags-protokoll),
          som igjen bruker TCP-transporttjenesten for pAlitelig levering.
          TCP er identifisert ved IP-adresse + portnummer.
        </p>
      </div>

      {/* Eksamenstips */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Oppgave 1 (flervalg) spor ofte: "Hvilken tjeneste gir link-laget?" (svar: upAlitelig overforing
          av rammer over EN link). "Hvordan identifiseres kommunikasjonsendepunkter i transportlaget?"
          (svar: IP-adresse + portnummer). "Hvem implementerer nettverkslaget?" (verter OG rutere).
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/cn-1/teori/1-4"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--card-border)] text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          &larr; 1.4 Forsinkelse
        </Link>
        <Link
          href="/dat110/cn-1/teori/1-6"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-network-600 text-white text-sm font-medium hover:bg-network-700 transition-colors"
        >
          1.6 Angrep pA nettverk &rarr;
        </Link>
      </div>
    </div>
  );
}
