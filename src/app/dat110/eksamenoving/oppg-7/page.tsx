"use client";

import Link from "next/link";

export default function Oppg7Page() {
  return (
    <div>
      <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/20 p-4 mb-8">
        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">Om oppgaven</h3>
        <p className="text-sm text-blue-900 dark:text-blue-200">
          Oppgave 7 er den korteste oppgaven på eksamen (5%). Du skal svare med 2–3 presise setninger per del.
          Det spørres alltid om DS-konsepter: serverdesign, kommunikasjonsmodeller og transparens.
          Lær definisjonene nøyaktig — korthet og presisjon belønnes.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3">Tema som går igjen</h2>
        <div className="space-y-3">
          {[
            {
              tema: "Stateful vs. stateless server",
              kort: "Stateful husker klientkontekst mellom kall. Stateless husker ingenting — hvert kall er selvstendig.",
              detalj: "Stateless er enklere å skalere og tåler serverfeil bedre (ingen tilstand å gjenopprette). Stateful muliggjør sesjonsbaserte operasjoner (f.eks. filsystem med åpne filer).",
            },
            {
              tema: "Synkron vs. asynkron kommunikasjon",
              kort: "Synkron: avsender blokkerer til svar er mottatt. Asynkron: avsender fortsetter umiddelbart etter sending.",
              detalj: "Asynkron gir bedre ytelse og unngår venting, men krever callbacks eller meldingskøer. Synkron er enklere å programmere, men kan skape flaskehalser ved sakte servere.",
            },
            {
              tema: "Multithreading i RPC-servere",
              kort: "Serveren bruker en tråd per innkommende forespørsel (dispatcher + worker-tråder).",
              detalj: "Fordel: høy gjennomstrømning, håndterer mange klienter parallelt. Ulempe: trådsynkronisering, race conditions. Alternativ: asynkron (callback-basert) server.",
            },
            {
              tema: "Failure transparency (feiltoleranse-transparens)",
              kort: "Systemet skjuler feil og gjenoppretting fra brukeren — prosesser merker ikke at noe feilet.",
              detalj: "Vanskeligst å oppnå i distribuerte systemer. Krever replikering og failover-mekanismer. Delvis feil (partial failures) er et særtrekk ved distribuerte systemer.",
            },
            {
              tema: "Access transparency",
              kort: "Skjuler at ressurser er distribuert — lokal og ekstern tilgang ser identisk ut for programmereren.",
              detalj: "Muliggjøres gjennom middleware og stub/skeleton i RPC. Programmereren bruker vanlige funksjonskall uten å tenke på nettverk.",
            },
          ].map((item) => (
            <div key={item.tema} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="font-bold text-sm text-blue-600 dark:text-blue-400 mb-1">{item.tema}</p>
              <p className="text-sm font-medium mb-1">{item.kort}</p>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{item.detalj}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3">Svarteknikk for 2–3 setninger</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)] space-y-2">
          <p><span className="font-semibold text-[var(--foreground)]">1. Definer konseptet:</span> «X betyr at...»</p>
          <p><span className="font-semibold text-[var(--foreground)]">2. Forklar konsekvensen:</span> «Dette betyr at serveren/klienten...»</p>
          <p><span className="font-semibold text-[var(--foreground)]">3. Gi en fordel/ulempe eller eksempel:</span> «Fordelen er..., men ulempen er...»</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Link href="/dat110/ds-3" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 3</span>
          <span>Prosesser og tråder</span>
        </Link>
        <Link href="/dat110/ds-4" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 4</span>
          <span>Kommunikasjon</span>
        </Link>
      </div>
    </div>
  );
}
