"use client";

import { useState } from "react";
import Link from "next/link";

export default function CN1_2Page() {
  const [activeMedium, setActiveMedium] = useState<string | null>(null);

  const media = [
    {
      id: "twisted",
      navn: "Tvunnet kobberparkabel (Twisted Pair)",
      hastighet: "10 Mbps – 10 Gbps",
      avstand: "100 m (Ethernet)",
      bruk: "LAN, DSL",
      farge: "border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20",
      detaljer: "Den billigste og mest utbredte typen kabel. To isolerte kobbertradere er tvunnet rundt hverandre for A redusere elektrisk stoy. Kategori 5e/6 brukes til Gigabit Ethernet. DSL bruker eksisterende telefonlinjer av denne typen til A levere bredbAnd.",
    },
    {
      id: "koaks",
      navn: "Koaksialkabel",
      hastighet: "10 Mbps – 10 Gbps",
      avstand: "Flere km (med forsterkning)",
      bruk: "Kabel-TV (HFC), eldre nettverk",
      farge: "border-orange-400 bg-orange-50 dark:bg-orange-950/20",
      detaljer: "En sentral kobberleder omgitt av skjermende metall. Mye bedre stoyimmunitet enn tvunnet parkabel. HFC (Hybrid Fiber Coax) bruker fiber mellom hovednoder og koaks i det siste leddet til husstanden. Delt medium: alle naboer i kabelnettet deler kapasitet.",
    },
    {
      id: "fiber",
      navn: "Optisk fiber",
      hastighet: "100 Mbps – 10+ Tbps",
      avstand: "Hundrevis av km",
      bruk: "Ryggraden, FTTH, transatlantisk",
      farge: "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
      detaljer: "Sender lyspulser gjennom et glassror. Ekstremt hoy kapasitet, lav attenuation (signalsvekking), immun mot elektromagnetisk stoy og avlytting. FTTH (Fiber to the Home) gir dedikert fiberforbindelse helt til husstanden. Dyrere A installere enn kopper.",
    },
    {
      id: "radio",
      navn: "Radiob\u00f8lger (tradlost)",
      hastighet: "Variabel (54 Mbps – 10+ Gbps)",
      avstand: "Noen meter – hundrevis av km",
      bruk: "WiFi, 4G/5G, satellitt, Bluetooth",
      farge: "border-green-400 bg-green-50 dark:bg-green-950/20",
      detaljer: "Signalet propagerer gjennom elektromagnetisk spektrum. PAviriket av forstyrrelser, multipath-propagasjon (signalet reflekteres) og halvdupleks (kan ikke sende og motta samtidig pa samme frekvens). WiFi (802.11) = lokalt. 4G/5G = mobilnett. Satellitt = global dekning men hoy forsinkelse (spesielt GEO ~600ms RTT).",
    },
  ];

  const aksessnettverk = [
    {
      type: "DSL (Digital Subscriber Line)",
      hastighet: "Ned: 24 Mbps (ADSL), Opp: 3.5 Mbps",
      medium: "Eksisterende telefonlinje (twisted pair)",
      struktur: "Dedikert tilkobling fra huset til DSLAM hos ISP",
      egenskap: "Asymmetrisk: mye raskere nedlasting enn opplasting. Hastigheten avtar med avstand fra sentralen.",
    },
    {
      type: "Kabel-HFC (Hybrid Fiber Coax)",
      hastighet: "Ned: 40 Mbps – 1.2 Gbps, Opp: 30 Mbps",
      medium: "Fiber til noden, koaks til husstanden",
      struktur: "Delt medium: alle i nabolaget deler kapasitet pA koaks-segmentet",
      egenskap: "Hastigheten varierer med belastning (peak hours = tregere). CMTS styrer tilgangen.",
    },
    {
      type: "Fiber (FTTH)",
      hastighet: "Symmetrisk 1 Gbps – 10 Gbps",
      medium: "Optisk fiber helt til husstanden",
      struktur: "Dedikert eller delt via PON (Passive Optical Network)",
      egenskap: "Beste ytelse, men kostbart A installere. Vokser raskt i Norge.",
    },
    {
      type: "WiFi / Ethernet (LAN)",
      hastighet: "WiFi: opp til 9.6 Gbps (WiFi 6). Ethernet: 1–100 Gbps",
      medium: "Radiob\u00f8lger (WiFi) eller twisted pair (Ethernet)",
      struktur: "Kobler enheter til en access point eller svitsj i hjemmet/bedriften",
      egenskap: "WiFi er praktisk men delt medium med interferens. Ethernet er stabilt og raskt.",
    },
    {
      type: "4G/5G mobilnett",
      hastighet: "4G: 100 Mbps, 5G: opp til 20 Gbps",
      medium: "Radiob\u00f8lger mellom mobil og basestasjoner",
      struktur: "Mobil kobler til base station, videre via kjernenett til internett",
      egenskap: "Bredt dekningsomrAde. 5G muliggj\u00f8r lav latens for IoT og autonom kj\u00f8ring.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.2 Nettverkskanten</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">1.2 Nettverkskanten</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Nettverkskanten er der brukerne og applikasjonene befinner seg. Her kobles
          endesystemer til internett via aksessnettverk, og vi ser pa de fysiske mediene
          som brukes for A transportere bitene.
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
        <ul className="space-y-1">
          {[
            "Forklare hva et aksessnettverk er og dets rolle",
            "Sammenligne DSL, kabel/HFC, fiber og WiFi/Ethernet",
            "Forklare de fire fysiske medietypene og deres egenskaper",
            "Forklare forskjellen mellom delt og dedikert aksess",
            "Forklare hva FTTH og DSL er og hvordan de fungerer",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nettverkskanten forklart */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Nettverkskanten og aksessnettverk
        </h2>

        <div className="rounded-xl border-2 border-network-400/60 bg-network-50 dark:bg-network-950/20 p-4">
          <h3 className="font-bold text-network-600 dark:text-network-400 mb-2">Tre soner i internett</h3>
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <div className="flex-1 rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 border border-blue-200 dark:border-blue-800">
              <p className="font-bold text-blue-700 dark:text-blue-400">Nettverkskanten (edge)</p>
              <p className="text-xs text-[var(--muted)] mt-1">Hosts (endesystemer) og applikasjoner. Din PC, mobil, server. Her produseres og konsumeres data.</p>
            </div>
            <div className="flex items-center text-[var(--muted)] text-xs">&#8594;</div>
            <div className="flex-1 rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 border border-orange-200 dark:border-orange-800">
              <p className="font-bold text-orange-700 dark:text-orange-400">Aksessnettverk</p>
              <p className="text-xs text-[var(--muted)] mt-1">Kobler hosts til forste ruter (edge router). DSL, kabel, fiber, WiFi, mobilnett.</p>
            </div>
            <div className="flex items-center text-[var(--muted)] text-xs">&#8594;</div>
            <div className="flex-1 rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 border border-green-200 dark:border-green-800">
              <p className="font-bold text-green-700 dark:text-green-400">Nettverkskjernen (core)</p>
              <p className="text-xs text-[var(--muted)] mt-1">Nett av rutere. Videresender pakker fra kilde til mAl. Internetts ryggrad.</p>
            </div>
          </div>
        </div>

        {/* Aksessnettverk tabell */}
        <h3 className="font-bold mt-4">Aksessnettverksteknologier</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)] bg-neutral-100 dark:bg-neutral-800">
                <th className="text-left px-3 py-2">Teknologi</th>
                <th className="text-left px-3 py-2">Hastighet</th>
                <th className="text-left px-3 py-2">Medium</th>
                <th className="text-left px-3 py-2">Delt/dedikert</th>
                <th className="text-left px-3 py-2">Egenskap</th>
              </tr>
            </thead>
            <tbody>
              {aksessnettverk.map((a, i) => (
                <tr key={a.type} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-medium text-xs">{a.type}</td>
                  <td className="px-3 py-2 text-xs text-[var(--muted)]">{a.hastighet}</td>
                  <td className="px-3 py-2 text-xs text-[var(--muted)]">{a.medium}</td>
                  <td className="px-3 py-2 text-xs text-[var(--muted)]">{a.struktur}</td>
                  <td className="px-3 py-2 text-xs text-[var(--muted)]">{a.egenskap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-4">
          <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">DSL i detalj</h3>
          <div className="text-sm space-y-2">
            <p>DSL bruker den eksisterende telefoninfrastrukturen til A levere internett. Dataene sendes pa hoyere frekvenser enn det som brukes til tale.</p>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-xs">
              <p>Hjem &#8594; [DSLAM hos ISP] &#8594; Internett</p>
              <p className="text-[var(--muted)]">Frekvensfordeling:</p>
              <p>0–4 kHz: tale (telefon)</p>
              <p>4–50 kHz: opplasting (upstream)</p>
              <p>50 kHz–1 MHz: nedlasting (downstream)</p>
            </div>
            <p className="text-[var(--muted)] text-xs">Asymmetrisk fordi de fleste brukere laster ned mer enn de laster opp. Hastigheten reduseres med okende avstand fra sentralen.</p>
          </div>
        </div>
      </section>

      {/* Fysiske medier */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Fysiske medier
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Klikk pa et medium for A se detaljer. Fysiske medier er det som faktisk transporterer bitene
          fra sender til mottaker.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {media.map((m) => (
            <div key={m.id}>
              <button
                onClick={() => setActiveMedium(activeMedium === m.id ? null : m.id)}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all ${m.farge} ${activeMedium === m.id ? "ring-2 ring-network-400" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">{m.navn}</h3>
                  <span className="text-xs text-[var(--muted)]">{activeMedium === m.id ? "▲" : "▼"}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-[var(--muted)]">
                  <span><strong>Hastighet:</strong> {m.hastighet}</span>
                  <span><strong>Avstand:</strong> {m.avstand}</span>
                  <span className="col-span-2"><strong>Bruk:</strong> {m.bruk}</span>
                </div>
              </button>
              {activeMedium === m.id && (
                <div className="mt-1 rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 text-sm text-[var(--muted)]">
                  {m.detaljer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border-2 border-red-400/60 bg-red-50 dark:bg-red-950/20 p-4">
          <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">Vanlig feil: delt vs. dedikert medium</h3>
          <div className="text-sm space-y-1">
            <p><strong>Delt medium:</strong> Alle enheter konkurrerer om den same kapasiteten.</p>
            <p>Eksempel: Kabel-HFC-nettverket i nabolaget ditt. 100 husstander deler 1 Gbps = 10 Mbps per husstand i teorien.</p>
            <p className="mt-2"><strong>Dedikert medium:</strong> Du har kapasiteten for deg selv.</p>
            <p>Eksempel: FTTH og DSL gir deg dedikert tilkobling til ISPen (men ISPens backbone er selvsagt delt).</p>
          </div>
        </div>
      </section>

      {/* Eksamenstips */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Dette delkapittelet er sjelden direkte eksamensstoff i oppgave 3, men flervalgsoppgaver
          kan sporre om egenskaper ved ulike aksessnettverk eller fysiske medier.
          Husk: kabel-HFC er delt medium, DSL er dedikert, fiber er det raskeste og dyreste.
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/cn-1/teori/1-1"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--card-border)] text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          &larr; 1.1 Hva er internett?
        </Link>
        <Link
          href="/dat110/cn-1/teori/1-3"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-network-600 text-white text-sm font-medium hover:bg-network-700 transition-colors"
        >
          1.3 Nettverkskjernen &rarr;
        </Link>
      </div>
    </div>
  );
}
