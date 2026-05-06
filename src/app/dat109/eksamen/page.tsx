"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { eksamenPages, dat109BasePaths } from "@/lib/dat109-subpages";

const oppgaveCards = [
  {
    href: "/dat109/eksamen/oppgave-1-modellering",
    nr: "Oppgave 1",
    tema: "Modellering",
    weight: "~40%",
    weightColor:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    description:
      "Brukstilfelle + domenemodell + sekvensdiagram for et spill. Tyngste oppgave på eksamen.",
    eksamener: "7 eksamener (2020–2024)",
  },
  {
    href: "/dat109/eksamen/oppgave-2-ooa-ood",
    nr: "Oppgave 2",
    tema: "OOA/OOD — SOLID & GRASP",
    weight: "~20%",
    weightColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    description:
      "Flervalg fra 2023+. Før 2023: åpen analyse av UML-diagram med utformingsprinsipper.",
    eksamener: "Flervalg V2023 + V2024 + åpne 2020–2022",
  },
  {
    href: "/dat109/eksamen/oppgave-3-utviklingsmetode",
    nr: "Oppgave 3",
    tema: "Utviklingsmetode",
    weight: "~20%",
    weightColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    description:
      "Flervalg om Scrum, XP, TDD, CI/CD, DevOps fra 2023+. Før 2023: åpne spørsmål.",
    eksamener: "Flervalg V2023 + V2024 + åpne 2020–2022",
  },
  {
    href: "/dat109/eksamen/oppgave-4-oop",
    nr: "Oppgave 4",
    tema: "OOP — Java fra UML",
    weight: "~20%",
    weightColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    description:
      "Klassediagram → Java-skall (4a) + sekvensdiagram → metode-implementasjon (4b).",
    eksamener: "6 eksamener med fasit (2020–2024)",
  },
];

export default function EksamenOverviewPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.eksamen} pages={eksamenPages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">
          DAT109
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Eksamen</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Eksamensdrilling DAT109
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Alle eksamensoppgaver fra 2020–2024 sortert etter oppgavetype, med
          fullstendige løsningsforslag der de finnes.
        </p>
      </div>

      {/* ══════ Eksamensstrategi ══════ */}
      <div className="rounded-xl border-2 border-sysdev-400/40 bg-gradient-to-br from-sysdev-50 to-emerald-50 dark:from-sysdev-950/30 dark:to-emerald-950/20 p-6 mb-8">
        <h2 className="font-bold text-lg mb-4 text-sysdev-700 dark:text-sysdev-400">
          Eksamensstrategi
        </h2>

        {/* Tidsfordeling */}
        <div className="grid sm:grid-cols-4 gap-3 mb-5">
          {[
            { del: "Oppgave 1", tema: "Modellering", tid: "~96 min", pst: "40%" },
            { del: "Oppgave 2", tema: "OOA/OOD", tid: "~48 min", pst: "20%" },
            { del: "Oppgave 3", tema: "Utviklingsmetode", tid: "~48 min", pst: "20%" },
            { del: "Oppgave 4", tema: "OOP/Java", tid: "~48 min", pst: "20%" },
          ].map((d) => (
            <div
              key={d.del}
              className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-sysdev-200 dark:border-sysdev-800/40 p-3 text-center"
            >
              <div className="text-xs font-bold text-sysdev-600 dark:text-sysdev-400 mb-1">
                {d.del} ({d.pst})
              </div>
              <div className="font-bold text-sm">{d.tema}</div>
              <div className="text-xs text-[var(--muted)]">{d.tid}</div>
            </div>
          ))}
        </div>

        {/* Hva som typisk kommer */}
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-sysdev-200 dark:border-sysdev-800/40 p-4">
            <h3 className="font-bold text-sm text-sysdev-700 dark:text-sysdev-400 mb-2">
              Hva kommer typisk?
            </h3>
            <ul className="text-xs space-y-1.5 text-[var(--muted)]">
              <li>
                <strong>Oppgave 1:</strong> Alltid et spill. Lag
                brukstilfellemodell + domenemodell + sekvensdiagram.
              </li>
              <li>
                <strong>Oppgave 2:</strong> Flervalg om SOLID/GRASP (fra 2023).
                Før 2023: analyse av UML-diagram.
              </li>
              <li>
                <strong>Oppgave 3:</strong> Flervalg om Scrum/XP/TDD/CI (fra
                2023). Før 2023: åpne spørsmål om metoder.
              </li>
              <li>
                <strong>Oppgave 4:</strong> Klassediagram + sekvensdiagram →
                Java-kode. Alltid 4a (skall) + 4b (implementer metode).
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-sysdev-200 dark:border-sysdev-800/40 p-4">
            <h3 className="font-bold text-sm text-sysdev-700 dark:text-sysdev-400 mb-2">
              Prioriteringsstrategi
            </h3>
            <ol className="text-xs space-y-1.5 text-[var(--muted)] list-decimal list-inside">
              <li>
                <strong>Start med oppgave 2 og 3</strong> (flervalg) — rask
                poengfangst, 40% av eksamen, ~20 min totalt.
              </li>
              <li>
                <strong>Deretter oppgave 4</strong> (OOP) — forutsigbar, lær
                mønsteret utenat, ~30 min.
              </li>
              <li>
                <strong>Bruk resten på oppgave 1</strong> (modellering) — størst
                vekting, men mest krevende. Bruk ~2 timer.
              </li>
              <li>
                <strong>Skriv ned antagelser</strong> — gir alltid poeng selv
                om løsningen er litt annerledes.
              </li>
            </ol>
          </div>
        </div>

        {/* Sensors nøkkelregler */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
          <h3 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2">
            Sensors 5 ufravikelige regler
          </h3>
          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            {[
              "Brukstilfellemodellen er IKKE et flytdiagram",
              "Domenemodellen inneholder ALDRI metoder",
              "Sekvensdiagrammet MÅ samsvare med brukstilfellebeskrivelsene",
              "Assosiasjoner MÅ ha multiplisitet",
              "Alle tre diagrammer MÅ være konsistente med hverandre",
            ].map((r) => (
              <div key={r} className="flex gap-2">
                <span className="text-red-500 font-bold shrink-0">!</span>
                <span className="text-red-800 dark:text-red-300">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ Velg oppgavetype ══════ */}
      <h2 className="text-xl font-bold mt-10 mb-4">Velg oppgavetype</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {oppgaveCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-sysdev-400 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="text-xs font-bold text-sysdev-600 dark:text-sysdev-400 mb-1">
                  {card.nr}
                </div>
                <h3 className="font-bold text-lg group-hover:text-sysdev-700 dark:group-hover:text-sysdev-400 transition-colors">
                  {card.tema}
                </h3>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${card.weightColor}`}
              >
                {card.weight}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] mb-3">
              {card.description}
            </p>
            <div className="text-xs text-[var(--muted)] flex items-center gap-2">
              <span>{card.eksamener}</span>
              <svg
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* ══════ Per-eksamen tabell ══════ */}
      <h2 className="text-xl font-bold mb-4">Tidligere eksamener</h2>
      <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-800/50">
            <tr>
              <th className="text-left p-3">År</th>
              <th className="text-left p-3">Spill/system (oppg 1)</th>
              <th className="text-left p-3">Format</th>
              <th className="text-left p-3">Løsning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--card-border)]">
            <tr>
              <td className="p-3">Høst 2020</td>
              <td className="p-3">Eksamenssystem</td>
              <td className="p-3">Skriftlig</td>
              <td className="p-3">Ja</td>
            </tr>
            <tr>
              <td className="p-3">Vår 2021</td>
              <td className="p-3">Hungry Cats</td>
              <td className="p-3">Skriftlig</td>
              <td className="p-3">Ja</td>
            </tr>
            <tr>
              <td className="p-3">Vår 2022</td>
              <td className="p-3">KIMBO</td>
              <td className="p-3">Skriftlig</td>
              <td className="p-3">Delvis</td>
            </tr>
            <tr>
              <td className="p-3">Kont 2022</td>
              <td className="p-3">KIMBO</td>
              <td className="p-3">Skriftlig</td>
              <td className="p-3">Ja</td>
            </tr>
            <tr className="bg-green-50/30 dark:bg-green-950/10">
              <td className="p-3 font-semibold">Vår 2023</td>
              <td className="p-3 font-semibold">Max Mümmelmann</td>
              <td className="p-3 font-semibold">Flervalg + skriftlig</td>
              <td className="p-3 font-semibold">Ja (best)</td>
            </tr>
            <tr>
              <td className="p-3">Kont 2023</td>
              <td className="p-3">Ganz Schön Clever</td>
              <td className="p-3">Flervalg + skriftlig</td>
              <td className="p-3">Nei</td>
            </tr>
            <tr>
              <td className="p-3">Vår 2024</td>
              <td className="p-3">Skyjo</td>
              <td className="p-3">Flervalg + skriftlig</td>
              <td className="p-3">Nei</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
