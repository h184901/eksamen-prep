"use client";

import Link from "next/link";

export default function Oppg3Oversikt() {
  return (
    <div>
      {/* Hva kan du forvente */}
      <div className="rounded-xl border border-network-300 bg-network-50 dark:bg-network-950/20 dark:border-network-800 p-5 mb-8">
        <h2 className="font-bold text-lg text-network-700 dark:text-network-400 mb-3">
          Hva kan du forvente?
        </h2>
        <p className="text-sm text-network-900 dark:text-network-200 mb-3">
          Oppgave 3 gir alltid et nettverk med rutere og verter, og ber deg beregne
          forsinkelser. Du får oppgitt linkkapasitet (R), avstand (d), forplantningshastighet (s),
          pakkestørrelse (L), prosesserings- og køforsinkelse. Typisk 3–4 deloppgaver.
        </p>
        <p className="text-sm font-bold text-network-800 dark:text-network-300">
          Nettverksdiagram med H1, H2, R1, R2, H3 er standard — alltid med en figur.
        </p>
      </div>

      {/* Strategi */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Løsningsstrategi</h2>
        <ol className="space-y-3">
          {[
            { step: "Identifiser forsinkelsestypen", detail: "Les oppgaven nøye — spør de om sendingsforsinkelse, nodalforsinkelse, eller ende-til-ende?" },
            { step: "Finn verdiene fra oppgaveteksten", detail: "Pakkestørrelse L (bits), linkkapasitet R (bps), avstand d (meter), hastighet s (m/s), d_proc og d_queue." },
            { step: "Bruk riktig formel", detail: "d_trans = L/R, d_prop = d/s. For nodalforsinkelse: summer alle fire typer." },
            { step: "For ende-til-ende", detail: "Summer nodalforsinkelsen for hvert ledd (vert/ruter) langs stien." },
            { step: "Sjekk enheter!", detail: "bits vs bytes (×8), Mbps = 10⁶ bps, km = 10³ m. Vanligste feil er enhetsfeil." },
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

      {/* Formler */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Nøkkelformler</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700 p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">Sendingsforsinkelse</p>
            <p className="font-mono text-lg font-bold">d_trans = L / R</p>
            <p className="text-xs text-[var(--muted)] mt-1">L = pakkestørrelse (bits), R = linkkapasitet (bps)</p>
          </div>
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700 p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">Forplantningsforsinkelse</p>
            <p className="font-mono text-lg font-bold">d_prop = d / s</p>
            <p className="text-xs text-[var(--muted)] mt-1">d = avstand (m), s = forplantningshastighet (m/s)</p>
          </div>
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700 p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">Nodalforsinkelse</p>
            <p className="font-mono text-lg font-bold">d_nodal = d_proc + d_queue + d_trans + d_prop</p>
            <p className="text-xs text-[var(--muted)] mt-1">Summen av alle fire forsinkelsestyper ved én node</p>
          </div>
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700 p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">Gjennomstrømning</p>
            <p className="font-mono text-lg font-bold">Throughput = min(R₁, R₂, ..., Rₙ)</p>
            <p className="text-xs text-[var(--muted)] mt-1">Flaskehalsen bestemmer — laveste kapasitet på stien</p>
          </div>
        </div>
      </div>

      {/* Relevant teori */}
      <div>
        <h2 className="text-xl font-bold mb-3">Relevant teori</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/dat110/cn-1" className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors">
            <span className="font-bold text-xs text-network-600 dark:text-network-400">CN 1</span>
            <div>
              <p className="text-sm font-medium">Nettverksintroduksjon</p>
              <p className="text-xs text-[var(--muted)]">Forsinkelser, gjennomstrømning, trafikkintensitet</p>
            </div>
          </Link>
          <Link href="/dat110/cn-1/formler" className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors">
            <span className="font-bold text-xs text-network-600 dark:text-network-400">Formler</span>
            <div>
              <p className="text-sm font-medium">Forsinkelsesformler</p>
              <p className="text-xs text-[var(--muted)]">Alle formler med forklaringer</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
