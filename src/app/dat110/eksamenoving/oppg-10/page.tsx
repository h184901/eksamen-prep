"use client";

import Link from "next/link";

export default function Oppg10Oversikt() {
  return (
    <div>
      {/* Viktig advarsel */}
      <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-5 mb-6">
        <h2 className="font-bold text-lg text-red-700 dark:text-red-400 mb-2">
          VIKTIG — 15 % av eksamen
        </h2>
        <p className="text-sm text-red-900 dark:text-red-200">
          Oppgave 10 (DHT/Chord) er den tyngste enkeltoppgaven på eksamen og
          utgjør 15 %. Sett av god tid, og lær deg fingertabell-beregningen
          utenat. De som mestrer dette, stikker av med et solid forsprang.
        </p>
      </div>

      {/* Hva kan du forvente */}
      <div className="rounded-xl border border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 p-5 mb-8">
        <h2 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-3">
          Hva kan du forvente?
        </h2>
        <p className="text-sm text-blue-900 dark:text-blue-200 mb-3">
          Oppgaven gir alltid: m-bits identifikatorrom (typisk m=5, ring med 32
          posisjoner), en liste med serverposisjoner, og ber deg om:
        </p>
        <ol className="text-sm text-blue-900 dark:text-blue-200 space-y-1 list-decimal list-inside">
          <li>Beregne fingertabeller for alle servere</li>
          <li>Avgjøre hvilken server som er ansvarlig for gitte nøkler</li>
          <li>Spore et oppslag steg-for-steg (hopp for hopp)</li>
        </ol>
        <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mt-3">
          Strukturen er identisk hvert år — kun m-verdien og serverlistene
          varierer.
        </p>
      </div>

      {/* Strategi */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Løsningsstrategi</h2>
        <ol className="space-y-3">
          {[
            {
              step: "Tegn ringen",
              detail:
                "Plasser alle noder i klokkeretning på ringen (0 til 2^m − 1). Marker hvor noder finnes.",
            },
            {
              step: "Beregn fingertabellen",
              detail:
                "For hver node n: FT[i] = succ(n + 2^(i−1) mod 2^m) for i = 1, 2, ..., m. succ(k) = første node ≥ k i klokkeretning.",
            },
            {
              step: "Finn nøkkelansvar",
              detail:
                "Nøkkel k tilhører node n = succ(k) — første node i klokkeretning slik at k ≤ n. Formelt: node n er ansvarlig for intervallet (pred(n), n].",
            },
            {
              step: "Spor oppslaget",
              detail:
                "Start på kildenoden. Finn største FT-oppføring ≤ nøkkel. Hopp dit. Gjenta til den noden du er på sin successor har nøkkelen.",
            },
            {
              step: "Tell hopp",
              detail:
                "Hvert videresend er ett hopp. Svar skal angi hvilke noder du passerer og i hvilken rekkefølge.",
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
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
              Fingertabell
            </p>
            <p className="font-mono text-base font-bold">
              FT[i] = succ(n + 2^(i−1) mod 2^m)
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              n = nodens ID, m = bits, i = 1…m. FT[1] er alltid successor.
            </p>
          </div>
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700 p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
              Nøkkelansvar
            </p>
            <p className="font-mono text-base font-bold">
              node n er ansvarlig for (pred(n), n]
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Nøkkel k → node n = succ(k) = første node ≥ k i klokkeretning
            </p>
          </div>
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700 p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
              succ(k)-beregning
            </p>
            <p className="font-mono text-base font-bold">
              succ(k) = første node n ≥ k
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Gå klokkeretning fra k til første eksisterende node. Hvis k {'>'}{" "}
              max node, wrap rundt til minste node.
            </p>
          </div>
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700 p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
              Oppkompleksitet
            </p>
            <p className="font-mono text-base font-bold">O(log N) hopp</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Med N noder og m-bits: fingertabellen halverer gjenværende avstand
              for hvert hopp.
            </p>
          </div>
        </div>
      </div>

      {/* Relevant teori */}
      <div>
        <h2 className="text-xl font-bold mb-3">Relevant teori</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/dat110/ds-6"
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors"
          >
            <span className="font-bold text-xs text-blue-600 dark:text-blue-400">
              DS 6
            </span>
            <div>
              <p className="text-sm font-medium">Navngiving og Chord DHT</p>
              <p className="text-xs text-[var(--muted)]">
                Distribuert hashing, Chord-protokollen
              </p>
            </div>
          </Link>
          <Link
            href="/dat110/ds-6/visualiseringer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors"
          >
            <span className="font-bold text-xs text-blue-600 dark:text-blue-400">
              Interaktiv
            </span>
            <div>
              <p className="text-sm font-medium">Chord-ring kalkulator</p>
              <p className="text-xs text-[var(--muted)]">
                Visualiser ringen og beregn fingertabeller live
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
