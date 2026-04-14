"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

export default function CN1_3Page() {
  const [showExempel, setShowExempel] = useState(false);
  const [showFDMTDM, setShowFDMTDM] = useState(false);
  const [activeTab, setActiveTab] = useState<"pakke" | "krets">("pakke");

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-1/teori" className="hover:text-[var(--accent)] transition-colors">
          &larr; Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">1.3 Nettverkskjernen</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">1.3 Nettverkskjernen</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Nettverkskjernen er nettverket av rutere som kobler aksessnettverkene sammen.
          Her videresender pakker gjennom millioner av rutere over hele verden.
          Dette delkapittelet gir grunnlaget for A forsta forsinkelsesberegningene i 1.4.
        </p>
      </div>

      {/* Hva du MA kunne */}
      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
        <ul className="space-y-1">
          {[
            "Forklare pakkeswitching og store-and-forward-prinsippet",
            "Beregne ende-til-ende forsinkelse med store-and-forward",
            "Forklare koforsinkelse og pakketap ved overbelastning",
            "Forklare kretsswitching og FDM/TDM-multipleksing",
            "Sammenligne pakkeswitching og kretsswitching (effektivitet, garantier)",
            "Forklare ISP-hierarkiet og rollen til IXP-er",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9733;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pakkeswitching vs kretsswitching tabs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          To mAter A videresende data
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("pakke")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "pakke"
                ? "bg-network-600 text-white"
                : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            }`}
          >
            Pakkeswitching (internett)
          </button>
          <button
            onClick={() => setActiveTab("krets")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "krets"
                ? "bg-red-600 text-white"
                : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            }`}
          >
            Kretsswitching (telefonnett)
          </button>
        </div>

        {activeTab === "pakke" && (
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-green-400/60 bg-green-50 dark:bg-green-950/20 p-4">
              <h3 className="font-bold text-green-700 dark:text-green-400 mb-3">Pakkeswitching</h3>
              <div className="text-sm space-y-3">
                <p>
                  Data deles opp i <strong>pakker</strong> (typisk 1500 bytes for Ethernet).
                  Hver pakke inneholder en header med destinasjonsadresse og sendes
                  <strong> uavhengig</strong> av de andre pakkene.
                </p>

                <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4 my-2">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Store-and-forward</h4>
                  <p className="text-sm">
                    Rutere mA motta <strong>hele pakken</strong> for de kan begynne A sende den videre pA neste link.
                    Dette er forskjellig fra en ror der man sender bit for bit kontinuerlig.
                  </p>
                  <div className="mt-3 font-mono text-xs text-[var(--muted)] bg-white/60 dark:bg-neutral-900/40 rounded p-2">
                    <p>Kilde ----[link 1, R bps]---&gt; Ruter A ----[link 2, R bps]---&gt; Mottaker</p>
                    <p className="mt-1">t=0: Kilde begynner A sende pakke (L bits)</p>
                    <p>t=L/R: Siste bit av pakken ankommer Ruter A. Ruter A starter sending.</p>
                    <p>t=2L/R: Siste bit ankommer Mottaker.</p>
                    <p className="text-green-600 dark:text-green-400 mt-1">Ende-til-ende tid = 2L/R (2 hopp, ingen forsinkelse ellers)</p>
                  </div>
                </div>

                <FormulaBox
                  latex="d_{e2e} = N \cdot \frac{L}{R}"
                  title="Store-and-forward over N linker"
                  variant="blue"
                  description="N = antall linker, L = pakkelengde (bits), R = linjekapasitet (bps). Forutsetter lik kapasitet pA alle linker og ingen ko/prosessering."
                />

                <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-green-200 dark:border-green-800 p-3">
                  <p className="font-bold text-sm mb-1">Statistisk multipleksing</p>
                  <p className="text-xs text-[var(--muted)]">
                    Linkekapasiteten deles dynamisk mellom pakker etter behov. NAt ingen sender, er linken ledig.
                    NAt mange sender samtidig, konnur pakker i en ko. Dette er mye mer effektivt enn
                    kretsswitching der ressurser er reservert selv om de ikke brukes.
                  </p>
                </div>

                <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
                  <p className="font-bold text-sm text-red-700 dark:text-red-400 mb-1">Pakketap</p>
                  <p className="text-xs text-[var(--muted)]">
                    Rutere har begrenset bufferplass. Hvis ko er full og nye pakker ankommer,
                    droppes pakkene. H\u00f8y trafikkintensitet (La/R nAmr 1) gir lang ko og potensielt tap.
                    Se delkapittel 1.4 for beregning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "krets" && (
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-red-400/60 bg-red-50 dark:bg-red-950/20 p-4">
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">Kretsswitching</h3>
              <div className="text-sm space-y-3">
                <p>
                  Ressurser (b Andbredde, buffere) <strong>reserveres for hele sesjonen</strong>
                  fra kilde til mAl. Slik fungerer tradisjonelt telefonnett: nr. du ringer,
                  etableres en dedikert krets som holder alle linker bundet hele samtalen.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-blue-200 dark:border-blue-800 p-3">
                    <p className="font-bold text-xs text-blue-700 dark:text-blue-400 mb-1">FDM (Frequency Division Multiplexing)</p>
                    <p className="text-xs text-[var(--muted)]">Frekvensb\u00e5ndet deles opp i smale frekvensb\u00e5nd. Hver bruker fAr sitt eget frekvensb\u00e5nd for hele sesjonen. Brukes i AM/FM-radio og kabel-TV.</p>
                  </div>
                  <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-purple-200 dark:border-purple-800 p-3">
                    <p className="font-bold text-xs text-purple-700 dark:text-purple-400 mb-1">TDM (Time Division Multiplexing)</p>
                    <p className="text-xs text-[var(--muted)]">Tiden deles i rammer (frames) som igjen deles i tidsluker (slots). Hver bruker fAr en bestemt tidsluke i hver ramme. Brukes i ISDN og eldre mobilnett.</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowFDMTDM(!showFDMTDM)}
                  className="w-full text-left px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 bg-white/60 dark:bg-neutral-900/40 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors"
                >
                  {showFDMTDM ? "Skjul" : "Vis"} visuell illustrasjon av FDM vs TDM
                </button>
                {showFDMTDM && (
                  <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 text-xs">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="font-bold mb-2">FDM</p>
                        <div className="h-20 rounded border border-gray-300 dark:border-gray-600 overflow-hidden flex flex-col gap-0.5 p-1">
                          {["bg-blue-200 dark:bg-blue-800", "bg-red-200 dark:bg-red-800", "bg-green-200 dark:bg-green-800", "bg-yellow-200 dark:bg-yellow-800"].map((c, i) => (
                            <div key={i} className={`flex-1 rounded ${c} flex items-center justify-center text-xs font-mono`}>
                              Bruker {i+1} (alltid)
                            </div>
                          ))}
                        </div>
                        <p className="text-[var(--muted)] mt-1">Hvert b\u00e5nd er dedikert &mdash; selv om stille</p>
                      </div>
                      <div>
                        <p className="font-bold mb-2">TDM</p>
                        <div className="h-20 rounded border border-gray-300 dark:border-gray-600 overflow-hidden p-1">
                          <div className="flex gap-0.5 h-full">
                            {[1,2,3,4,1,2,3,4,1,2,3,4].map((n, i) => (
                              <div key={i} className={`flex-1 rounded text-xs font-mono flex items-center justify-center ${
                                n===1?"bg-blue-200 dark:bg-blue-800":n===2?"bg-red-200 dark:bg-red-800":n===3?"bg-green-200 dark:bg-green-800":"bg-yellow-200 dark:bg-yellow-800"
                              }`}>
                                {n}
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-[var(--muted)] mt-1">Tidslukene roterer &mdash; 1/4 kapasitet per bruker</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sammenligning */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Sammenligning: pakkeswitching vs. kretsswitching
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)] bg-neutral-100 dark:bg-neutral-800">
                <th className="text-left px-3 py-2">Egenskap</th>
                <th className="text-left px-3 py-2 text-green-700 dark:text-green-400">Pakkeswitching</th>
                <th className="text-left px-3 py-2 text-red-700 dark:text-red-400">Kretsswitching</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Ressursallokering", "Dynamisk (statistisk multipleksing)", "Statisk (reservert for sesjonen)"],
                ["Effektivitet", "Hoy (ledig kapasitet kan brukes av andre)", "Lav (stille perioder sloser kapasitet)"],
                ["QoS-garanti", "Ingen garanti (best-effort)", "Garantert bandbredde og forsinkelse"],
                ["Koforsinkelse", "Ja (variabel, avhenger av trafikk)", "Nei (dedikert kanal)"],
                ["Pakketap", "Mulig ved overbelastning", "Ingen (reservert)"],
                ["Kompleksitet", "Enkel (ingen oppsett)", "Krever call-setup-protokoll"],
                ["Egnet for", "Bursty trafikk (web, e-post)", "Kontinuerlig trafikk (tale, video)"],
                ["Eksempel", "Internett (TCP/IP)", "Tradisjonelt telefonnett (PSTN)"],
              ].map(([egenskap, pakke, krets], i) => (
                <tr key={egenskap} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-medium text-xs">{egenskap}</td>
                  <td className="px-3 py-2 text-xs text-green-800 dark:text-green-300">{pakke}</td>
                  <td className="px-3 py-2 text-xs text-red-800 dark:text-red-300">{krets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Klassisk regneeksempel */}
        <button
          onClick={() => setShowExempel(!showExempel)}
          className="w-full text-left px-4 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50 flex items-center justify-between text-sm font-medium"
        >
          <span>Klassisk eksempel: pakkeswitching stotter 3.5x flere brukere</span>
          <span>{showExempel ? "▲" : "▼"}</span>
        </button>
        {showExempel && (
          <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm space-y-3">
            <p className="font-bold">Oppgave:</p>
            <p>En link pA 1 Mbps. 35 brukere, hver aktiv 10% av tiden og trenger 100 kbps nAr aktiv.</p>

            <div className="space-y-2">
              <p><strong>Kretsswitching:</strong></p>
              <p className="text-[var(--muted)] ml-4">
                Kapasitet per bruker = 100 kbps dedikert.
                Maks brukere = 1 Mbps / 100 kbps = <strong>10 brukere</strong> (selv om de fleste er stille!).
              </p>

              <p><strong>Pakkeswitching:</strong></p>
              <p className="text-[var(--muted)] ml-4">
                Med 35 brukere: sannsynligheten for at mer enn 10 er aktive samtidig er:
              </p>
              <div className="font-mono text-xs bg-white/60 dark:bg-neutral-900/40 rounded p-2 ml-4">
                <p>P(n aktive) = C(35,n) * 0.1^n * 0.9^(35-n)</p>
                <p>P(mer enn 10 aktive) = 1 - P(0..10 aktive) &lt; 0.0004</p>
              </div>
              <p className="text-[var(--muted)] ml-4">
                Kun 0.04% sjanse for overbelastning!
                Pakkeswitching stotter <strong>3.5x</strong> flere brukere (35 vs 10) med minimal
                risiko for overbelastning.
              </p>
            </div>

            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
              <p className="font-bold text-sm mb-1">Intuisjon: bursty trafikk</p>
              <p className="text-xs text-[var(--muted)]">
                Internetttrafikk er bursty: du sender mye i korte perioder (nAr du klikker pA en lenke),
                men er stille ellers (nAr du leser siden). Pakkeswitching utnytter disse stille periodene
                ved A la andre sende. Kretsswitching reserverer kapasitet og sloser den under stille perioder.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ISP hierarki / Nettverk av nettverk */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-network-600 dark:text-network-400">
          Nettverk av nettverk (ISP-hierarkiet)
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Internett er ikke ett nettverk &mdash; det er millioner av sammenkobles nettverk.
          Strukturen er hierarkisk og markedsbasert.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          {[
            {
              tittel: "Tier-1 ISPer",
              farge: "border-orange-400/60 bg-orange-50 dark:bg-orange-950/20",
              tfarge: "text-orange-700 dark:text-orange-400",
              detaljer: ["Globale ryggrader (AT&T, NTT, Tata)", "Dekker hele kontinenter", "Kobler seg til hverandre via peering (gratis)", "Betaler ikke andre ISPer for transit"],
            },
            {
              tittel: "Regionale ISPer",
              farge: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
              tfarge: "text-blue-700 dark:text-blue-400",
              detaljer: ["Dekker regioner eller land", "Betaler Tier-1 ISPer for transit", "Kan koble seg direkte til hverandre", "Eksempel: Uninett (norsk forskningsnett)"],
            },
            {
              tittel: "Aksess-ISPer",
              farge: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
              tfarge: "text-green-700 dark:text-green-400",
              detaljer: ["Kobler sluttbrukere til internett", "Telenor, Altibox, Tele2 i Norge", "Betaler regionale ISPer for oppkobling", "Tilbyr DSL, kabel, fiber, mobilt"],
            },
          ].map((tier) => (
            <div key={tier.tittel} className={`rounded-xl border-2 p-4 ${tier.farge}`}>
              <h3 className={`font-bold mb-2 ${tier.tfarge}`}>{tier.tittel}</h3>
              <ul className="space-y-1">
                {tier.detaljer.map((d) => (
                  <li key={d} className="text-xs flex items-start gap-1">
                    <span className="shrink-0 mt-0.5">&#8226;</span>
                    <span className="text-[var(--muted)]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-xl border-2 border-network-400/60 bg-network-50 dark:bg-network-950/20 p-4 text-sm">
          <h3 className="font-bold text-network-600 dark:text-network-400 mb-2">IXP &mdash; Internet Exchange Point</h3>
          <p className="text-[var(--muted)]">
            Et noyt ralt m\u00f8tepunkt der ISPer kan koble seg direkte til hverandre (peering) uten A sende
            trafikk gjennom en tredje part. Reduserer kostnader og forsinkelse. AMS-IX i Amsterdam er
            verdens storste. I Norge: NIX (Norwegian Internet Exchange) i Oslo og Bergen.
          </p>
          <p className="text-[var(--muted)] mt-2">
            <strong>Innholdsleverandornettverk (CDN):</strong> Google, Netflix og Akamai har sine
            egne private nettverk og plasserer servere nAr brukerne for A redusere forsinkelse.
            De kobler seg til ISPer via IXP-er eller direkte tilkoblinger.
          </p>
        </div>
      </section>

      {/* Eksamenstips */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm">
        <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Sammenligning av pakkeswitching og kretsswitching er et klassisk eksamenstema.
          Husk at pakkeswitching er effektivt for bursty trafikk, og at store-and-forward gir
          ende-til-ende forsinkelse N*L/R. Trafikkintensitet La/R er koblingen til koforsinkelse.
          Se delkapittel 1.4 for de detaljerte beregningene som eksamen spor om.
        </span>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/cn-1/teori/1-2"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--card-border)] text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        >
          &larr; 1.2 Nettverkskanten
        </Link>
        <Link
          href="/dat110/cn-1/teori/1-4"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-network-600 text-white text-sm font-medium hover:bg-network-700 transition-colors"
        >
          1.4 Forsinkelse og gjennomstromning &rarr;
        </Link>
      </div>
    </div>
  );
}
