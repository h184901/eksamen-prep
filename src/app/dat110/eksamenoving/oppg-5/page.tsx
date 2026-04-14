"use client";

import Link from "next/link";

export default function Oppg5Oversikt() {
  return (
    <div>
      {/* Hva kan du forvente */}
      <div className="rounded-xl border border-network-300 bg-network-50 dark:bg-network-950/20 dark:border-network-800 p-5 mb-8">
        <h2 className="font-bold text-lg text-network-700 dark:text-network-400 mb-3">
          Hva kan du forvente?
        </h2>
        <p className="text-sm text-network-900 dark:text-network-200 mb-3">
          Oppgave 5 gir alltid et nettverk med rutere (R1–R4) og linkkostnader. Du
          blir bedt om å: (1) finne billigste sti, (2) sette opp initielle
          avstandsvektortabeller, (3) oppdatere én ruters DV etter å ha mottatt
          naboenes DV, og (4) finne neste hopp. Alltid en figur med nettverkstopologi.
        </p>
        <p className="text-sm font-bold text-network-800 dark:text-network-300">
          Format: nettverk R1–R2–R3–R4 med gitte kostnader — initialisering og én
          runde Bellman-Ford er nesten alltid inkludert.
        </p>
      </div>

      {/* Strategi */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Løsningsstrategi</h2>
        <ol className="space-y-3">
          {[
            {
              step: "Initialiser DV-tabellene",
              detail:
                "Hver ruter setter avstand til seg selv = 0, direkte naboer = linkkostnad, alle andre = ∞.",
            },
            {
              step: "Motta naboenes DV-tabeller",
              detail:
                "Etter første utveksling kjenner hver ruter naboenes avstandsvektorer.",
            },
            {
              step: "Anvend Bellman-Ford",
              detail:
                "For hvert mål y: D_x(y) = min over alle naboer v av [c(x,v) + D_v(y)].",
            },
            {
              step: "Oppdater og spre",
              detail:
                "Hvis noen verdier endres, send oppdatert DV til naboer. Gjenta til stabil.",
            },
            {
              step: "Finn neste hopp",
              detail:
                "Neste hopp til mål y er den naboen v som gir minimumsverdien i Bellman-Ford.",
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-network-100 dark:bg-network-900/30 text-network-700 dark:text-network-400 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-sm">{item.step}</p>
                <p className="text-sm text-[var(--muted)]">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Nøkkelformler */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Nøkkelformler</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700 p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
              Bellman-Ford (avstandsvektorligningen)
            </p>
            <p className="font-mono text-base font-bold">
              D_x(y) = min_v [ c(x,v) + D_v(y) ]
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              x = gjeldende ruter, y = mål, v = nabo, c(x,v) = linkkostnad
            </p>
          </div>
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700 p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
              CIDR-notasjon
            </p>
            <p className="font-mono text-base font-bold">a.b.c.d / x</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              x = antall nettverksbiter, 2^(32-x) = antall adresser i blokken
            </p>
          </div>
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700 p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
              Longest-prefix match
            </p>
            <p className="font-mono text-base font-bold">velg lengste /x</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Ruter matcher destinasjons-IP mot forwardingtabell — mer spesifikk
              rute vinner alltid
            </p>
          </div>
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700 p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
              Antall adresser i et subnett
            </p>
            <p className="font-mono text-base font-bold">2^(32 - x)</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Eks: /24 → 2^8 = 256 adresser. /26 → 2^6 = 64 adresser.
            </p>
          </div>
        </div>
      </div>

      {/* Relevant teori */}
      <div>
        <h2 className="text-xl font-bold mb-3">Relevant teori</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/dat110/cn-4"
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors"
          >
            <span className="font-bold text-xs text-network-600 dark:text-network-400">
              CN 4–5
            </span>
            <div>
              <p className="text-sm font-medium">Nettverkslaget og ruting</p>
              <p className="text-xs text-[var(--muted)]">
                IP, CIDR, avstandsvektoralgoritmen
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
