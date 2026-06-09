import Link from "next/link";
import Dat102Section from "../Dat102Section";
import Dat102Badge from "../Dat102Badge";
import type { OvingOverview } from "./oving-types";

interface ModeCard {
  href: string;
  icon: string;
  title: string;
  blurb: string;
  count: number;
  countLabel: string;
}

interface Props {
  overview: OvingOverview;
}

// Øving-hub: kort til de fire modusene, anbefalt løype og Phase 3-teaser.
// Presentasjonskomponent (ingen klient-hooks) — rendres av server-siden.
export default function Dat102OvingHub({ overview }: Props) {
  const modes: ModeCard[] = [
    {
      href: "/dat102/oving/flashcards",
      icon: "🃏",
      title: "Flashcards",
      blurb: "Snu kort og test deg selv på begrepene. Marker hva du kan og hva du må øve mer på.",
      count: overview.flashcardCount,
      countLabel: "kort",
    },
    {
      href: "/dat102/oving/quiz",
      icon: "⚡",
      title: "Quiz",
      blurb: "Flervalg, flere riktige, sant/usant og selvsjekk — med forklaring og kilder på hvert svar.",
      count: overview.quizCount,
      countLabel: "spørsmål",
    },
    {
      href: "/dat102/oving/matching",
      icon: "🔗",
      title: "Matching",
      blurb: "Koble begrep mot definisjon, algoritme mot kompleksitet og struktur mot bruk.",
      count: overview.matchingCount,
      countLabel: "par",
    },
    {
      href: "/dat102/oving/drills",
      icon: "✏️",
      title: "Drills",
      blurb: "Tracing, beregning og kodelesing steg for steg — med hint og full løsning.",
      count: overview.drillCount,
      countLabel: "oppgaver",
    },
  ];

  const ROUTE: { step: number; title: string; text: string; href: string }[] = [
    { step: 1, title: "Flashcards for begrepene", text: "Bygg vokabularet først — snu kort til du kjenner igjen alle de sentrale begrepene.", href: "/dat102/oving/flashcards" },
    { step: 2, title: "Quiz for forståelse", text: "Test om du forstår sammenhengene, ikke bare ordene. Les forklaringen på hvert svar.", href: "/dat102/oving/quiz" },
    { step: 3, title: "Matching for koblinger", text: "Knytt begrep, kompleksitet og bruksområder sammen — det eksamen ofte spør om.", href: "/dat102/oving/matching" },
    { step: 4, title: "Drills for tracing og beregning", text: "Øv hånda på å spore algoritmer og regne kjøretid steg for steg.", href: "/dat102/oving/drills" },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Dat102Badge tone="ny">Ny</Dat102Badge>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            DAT102 · Øving
          </p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
          Øving
        </h1>
        <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
          Fire øvingsmoduser bygget fra kurs- og eksamensmateriellet —{" "}
          {overview.flashcardCount + overview.quizCount + overview.matchingCount + overview.drillCount}{" "}
          oppgaver totalt på tvers av {overview.topicsCovered} temaer. Framgang
          lagres lokalt i nettleseren.
        </p>
      </div>

      <Dat102Section eyebrow="Velg modus" title="Hva vil du øve på?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modes.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4 transition-all hover:border-dat102-400/70 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden>{m.icon}</span>
                  <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-50 group-hover:text-dat102-700 dark:group-hover:text-dat102-300 transition-colors">
                    {m.title}
                  </span>
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-dat102-100 text-dat102-700 dark:bg-dat102-900/40 dark:text-dat102-300 whitespace-nowrap">
                  {m.count} {m.countLabel}
                </span>
              </div>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{m.blurb}</p>
            </Link>
          ))}
        </div>
      </Dat102Section>

      <Dat102Section
        eyebrow="Strategi"
        title="Anbefalt øvingsløype"
        description="Mest læring per time: bygg vokabular først, så forståelse, så koblinger, så ferdighet."
      >
        <ol className="space-y-3">
          {ROUTE.map((r) => (
            <li
              key={r.step}
              className="flex items-start gap-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4"
            >
              <span className="text-sm font-bold w-8 h-8 rounded-full bg-dat102-100 text-dat102-700 dark:bg-dat102-900/40 dark:text-dat102-300 flex items-center justify-center flex-shrink-0">
                {r.step}
              </span>
              <div className="min-w-0">
                <Link
                  href={r.href}
                  className="font-semibold text-neutral-900 dark:text-neutral-50 hover:text-dat102-700 dark:hover:text-dat102-300 transition-colors"
                >
                  {r.title}
                </Link>
                <p className="text-sm text-[var(--muted)] leading-relaxed mt-0.5">
                  {r.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Dat102Section>

      <Dat102Section
        eyebrow="Mer"
        title="Obliger og eksamen"
        description="Arbeidskravene og de tidligere eksamenssettene — med ærlig kildestatus."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dat102/oving/obliger"
            className="group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4 transition-all hover:border-dat102-400/70 hover:shadow-md"
          >
            <span className="flex items-center gap-2 mb-1">
              <span className="text-2xl" aria-hidden>📑</span>
              <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-50 group-hover:text-dat102-700 dark:group-hover:text-dat102-300 transition-colors">
                Obliger
              </span>
            </span>
            <span className="text-sm text-[var(--muted)] leading-relaxed">
              Oblig 1–5, prøve og godkjentprøve med temaer, begreper og kilder.
            </span>
          </Link>
          <Link
            href="/dat102/eksamen"
            className="group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4 transition-all hover:border-dat102-400/70 hover:shadow-md"
          >
            <span className="flex items-center gap-2 mb-1">
              <span className="text-2xl" aria-hidden>📋</span>
              <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-50 group-hover:text-dat102-700 dark:group-hover:text-dat102-300 transition-colors">
                Eksamen
              </span>
            </span>
            <span className="text-sm text-[var(--muted)] leading-relaxed">
              8 tidligere sett med løsninger og{" "}
              <span className="text-dat102-700 dark:text-dat102-300 font-medium">
                gjengangere
              </span>{" "}
              på tvers av år.
            </span>
          </Link>
        </div>
      </Dat102Section>
    </div>
  );
}
