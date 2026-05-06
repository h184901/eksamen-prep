"use client";

import Link from "next/link";

const moduler = [
  {
    href: "/dat109/oving/quiz",
    title: "Flervalg-quiz",
    emoji: "🎯",
    description:
      "Velg temaer du vil testes i. Spørsmål fra ekte eksamener (V2023+V2024) og generert basert på pensum. Score, forklaringer og 'drill bare feil'-modus.",
    accent: "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  },
  {
    href: "/dat109/oving/eksamen-sim",
    title: "Eksamenssimulering",
    emoji: "⏱️",
    description:
      "Ta en hel tidligere eksamen under tidspress. 4 timer, automatisk innlevering når tiden går ut. Inkluderer fasit + selvvurdering for åpne oppgaver.",
    accent: "border-rose-400 bg-rose-50/50 dark:bg-rose-950/20",
    iconBg: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400",
  },
  {
    href: "/dat109/oving/flashcards",
    title: "Flashcards",
    emoji: "🃏",
    description:
      "Quizlet-stil — begrep på forsiden, forklaring på baksiden. Kategoriser etter 'Kan dette' / 'Øv mer'. Lagrer fremgang lokalt.",
    accent: "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    iconBg: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  },
  {
    href: "/dat109/oving/matching",
    title: "Matching-øvelse",
    emoji: "🔗",
    description:
      "Koble begreper til riktige definisjoner. Spesielt nyttig for SOLID/GRASP-prinsipper, Scrum-roller og UML-symboler. Få umiddelbar tilbakemelding.",
    accent: "border-violet-400 bg-violet-50/50 dark:bg-violet-950/20",
    iconBg: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400",
  },
];

const studieplan = [
  {
    label: "Dag 6 (i dag)",
    plan: "Quiz: drill ALLE V2024-spørsmål du ikke kan svare blindt på. ~40-50 spørsmål.",
  },
  {
    label: "Dag 5",
    plan: "Eksamenssimulering V2023 (4 timer). Sjekk fasit. Marker hva du svarte feil på.",
  },
  {
    label: "Dag 4",
    plan: "Drill feil fra V2023-simulering. Flashcards for begreper du ikke husker.",
  },
  {
    label: "Dag 3",
    plan: "Eksamenssimulering V2024 (4 timer). Sjekk fasit.",
  },
  {
    label: "Dag 2",
    plan: "Quiz med generated-spørsmål for arkitektur, AUP, utformingsprinsipper. Matching-øvelser.",
  },
  {
    label: "Dag 1 (kvelden før)",
    plan: "Bare flashcards. Repetér det du allerede kan. Ikke prøv å lære noe nytt.",
  },
];

export default function OvingOverviewPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Øving og drilling</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Øving og drilling</h1>
        <p className="text-[var(--muted)] max-w-3xl">
          Aktiv læring slår passiv lesing. Quiz drillingen, simulér eksamen under tidspress, og
          bruk flashcards for begreper. Alle moduler skiller mellom ekte eksamensspørsmål
          (V2023+V2024) og generert innhold for pensum-temaer som ikke har vært på eksamen ennå.
        </p>
      </div>

      {/* Moduler */}
      <h2 className="text-xl font-bold mb-4">Velg modus</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {moduler.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`group rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 ${m.accent}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${m.iconBg}`}>
                {m.emoji}
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:underline">{m.title}</h3>
            <p className="text-sm text-[var(--muted)]">{m.description}</p>
          </Link>
        ))}
      </div>

      {/* Anbefalt studieplan */}
      <h2 className="text-xl font-bold mb-4">Anbefalt studieplan (6 dager til eksamen)</h2>
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
        <div className="space-y-3">
          {studieplan.map((d, i) => (
            <div key={i} className="flex items-start gap-4 pb-3 border-b border-[var(--card-border)] last:border-b-0 last:pb-0">
              <span className="flex-shrink-0 w-24 text-sm font-bold text-sysdev-600 dark:text-sysdev-400">
                {d.label}
              </span>
              <span className="text-sm">{d.plan}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20 p-5">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">💡 Slik bruker du øvingsmodulene best</h3>
        <ul className="text-sm space-y-1.5 list-disc list-inside">
          <li><strong>Aktiv læring:</strong> Test deg selv FØR du leser teorien. Du husker bedre når du har tenkt på spørsmålet først.</li>
          <li><strong>Drill bare feil:</strong> Etter en quiz, klikk &laquo;Drill bare feil&raquo; for å fokusere på det du ikke kan.</li>
          <li><strong>Eksamenssimulering 1-2 ganger:</strong> Den første viser hva du IKKE kan. Den andre viser om du har lært.</li>
          <li><strong>Spaced repetition:</strong> Flashcards brukes 5-10 min flere ganger om dagen, ikke 60 min én gang.</li>
          <li><strong>Forklaringer er gull:</strong> Når du svarer feil, LES forklaringen — det er der læringen skjer.</li>
        </ul>
      </div>
    </div>
  );
}
