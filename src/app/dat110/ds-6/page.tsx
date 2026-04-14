"use client";

import Link from "next/link";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "ds-6")!;

const subPages = [
  {
    href: "/dat110/ds-6/teori",
    title: "Teori",
    description:
      "Navngivingssystemer (flat, strukturert, attributtbasert), DHT-konseptet, Chord-ring-topologi, oppslagsalgoritme og join/leave-prosedyrer.",
    color: "border-blue-500",
    icon: "📖",
  },
  {
    href: "/dat110/ds-6/formler",
    title: "Formler",
    description:
      "Fingertabell-formelen, nøkkelansvarsregelen, O(log N) kompleksitet og alle viktige uttrykk du må mestre.",
    color: "border-amber-500",
    icon: "🧮",
  },
  {
    href: "/dat110/ds-6/oppgaver",
    title: "Oppgaver",
    description:
      "Professorens øvingsoppgaver med fullstendige løsninger, eksamensoppgaver (Chord er alltid 15%!) og strategier for hvert oppgavetype.",
    color: "border-emerald-500",
    icon: "✏️",
  },
  {
    href: "/dat110/ds-6/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv Chord-kalkulator: konfigurer din egen ring, se fingertabeller, nøkkelansvar og simuler oppslag steg for steg.",
    color: "border-purple-500",
    icon: "📊",
  },
];

const temaer = [
  "DS 6.1 — Navngiving i distribuerte systemer: navn, entitet, adresse, identifikator",
  "DS 6.2 — Flat navngiving: kringkasting, videresendingspekere, hjemmebasert tilnærming",
  "DS 6.3 — Distribuerte hash-tabeller (DHT): P2P-systemer, O(N) vs O(N²) vs O(log N)",
  "DS 6.4 — Chord-protokollen: ring-topologi, succ(k), fingertabell FT[i] = succ(n + 2^(i-1))",
  "DS 6.5 — Nøkkelansvar: pred(s) < nøkkel ≤ s (sirkulært)",
  "DS 6.6 — Oppslagsalgoritme: findSuccessor + closestPrecedingNode, runde for runde",
  "DS 6.7 — O(log N) kompleksitet: intuitiv forklaring og bevis",
  "DS 6.8 — Strukturert navngiving: DNS som case study (hierarki, RR-typer, iterativ vs rekursiv)",
  "DS 6.9 — Attributtbasert navngiving: LDAP-katalogstjenester",
];

export default function DS6Page() {
  return (
    <div>
      <div className="mb-6 rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 px-5 py-3 flex items-center gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="font-bold text-amber-800 dark:text-amber-300">Eksamen — Oppgave 10 (15%)</p>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Chord DHT er alltid 15% av eksamen og har svært forutsigbar struktur. Mestre fingertabell-beregning, nøkkelansvar og oppslagsalgoritmen.
          </p>
        </div>
      </div>

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Kapittel 6 handler om <strong>navngiving i distribuerte systemer</strong> — hvordan vi identifiserer og finner entiteter uten sentral koordinering.
        Kjernen er <strong>Chord DHT</strong>: en ring-basert distribuert hash-tabell som løser oppslag på O(log N) hopp ved hjelp av fingertabeller.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {subPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`block rounded-xl border-2 ${page.color} bg-[var(--card)] p-5 hover:shadow-md transition-all hover:-translate-y-0.5`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{page.icon}</span>
              <h2 className="font-bold text-lg">{page.title}</h2>
            </div>
            <p className="text-sm text-[var(--muted)]">{page.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">Temaer i dette kapittelet</h2>
        <ul className="space-y-2">
          {temaer.map((tema) => (
            <li key={tema} className="flex items-start gap-2 text-sm">
              <span className="text-blue-500 mt-0.5 shrink-0">▸</span>
              <span>{tema}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h2 className="font-bold text-lg mb-3">Hva du MÅ kunne til eksamen</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            "Beregne fingertabell FT[i] for alle noder — vis utregningen steg for steg",
            "Avgjøre nøkkelansvar: finn succ(k) = minste node n der n ≥ k (sirkulært)",
            "Simulere oppslag runde for runde: vis ALLE steg med findSuccessor-algoritmen",
            "Forklare O(log N) kompleksitet og hva fingertabellen bidrar med",
            "Forklare replikering: feiltoleranse, tilgjengelighet, skalerbarhet",
            "DNS som strukturert navngiving: Root/TLD/Auth, RR-typer (A, NS, MX, CNAME)",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 px-3 py-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">{i + 1}.</span>
              <span className="text-[var(--foreground)]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
