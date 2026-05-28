import Link from "next/link";
import { getExamSummaries } from "@/lib/dat110-vault/loader";

const oppgaver = [
  { id: 1, label: "Oppg 1", title: "Flervalg", weight: "10%", color: "emerald" },
  { id: 2, label: "Oppg 2", title: "Oblig-prosjekt", weight: "10%", color: "purple" },
  { id: 3, label: "Oppg 3", title: "Forsinkelser", weight: "10%", color: "network" },
  { id: 4, label: "Oppg 4", title: "Protokoller", weight: "10%", color: "network" },
  { id: 5, label: "Oppg 5", title: "Ruting", weight: "10%", color: "network" },
  { id: 6, label: "Oppg 6", title: "ARP og Switch", weight: "10%", color: "network" },
  { id: 7, label: "Oppg 7", title: "DS-teori", weight: "5%", color: "blue" },
  { id: 8, label: "Oppg 8", title: "Overlay og multicast", weight: "10%", color: "blue" },
  { id: 9, label: "Oppg 9", title: "Konsistens og klokker", weight: "10%", color: "blue" },
  { id: 10, label: "Oppg 10", title: "DHT/Chord", weight: "15%", color: "blue" },
];

const colorStyles: Record<string, string> = {
  emerald:
    "border-emerald-400/40 hover:border-emerald-400/80 text-emerald-600 dark:text-emerald-400",
  purple:
    "border-purple-400/40 hover:border-purple-400/80 text-purple-600 dark:text-purple-400",
  network:
    "border-network-400/40 hover:border-network-400/80 text-network-600 dark:text-network-400",
  blue: "border-blue-400/40 hover:border-blue-400/80 text-blue-600 dark:text-blue-400",
};

// Map "01"/"05"/"06" til norsk månedsnavn for visning.
function sessionLabel(session: string): string {
  switch (session) {
    case "01":
      return "Januar";
    case "05":
      return "Mai";
    case "06":
      return "Juni";
    default:
      return session;
  }
}

// Bygger en kort caption ved siden av eksamens-tittel.
function examPeriodCaption(year: number, session: string): string {
  return `${sessionLabel(session)} ${year}`;
}

export const metadata = {
  title: "Eksamen — DAT110",
};

export default function EksamenPage() {
  const exams = getExamSummaries();

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Eksamen</span>
      </div>

      <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
        Eksamen
      </h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        Tidligere DAT110-eksamener med kildetro oppgavetekst og dokumenterte
        løsninger fra sensorveiledning. Velg en eksamen for å gå gjennom
        oppgavene, eller bla per oppgavetype lenger ned for systematisk øving.
      </p>

      {/* Eksamener etter år — live-cards fra exams-index */}
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
        Eksamener etter år
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {exams.map((exam) => {
          const isReconstructed = exam.reconstructedFromSensor === true;
          return (
            <Link
              key={exam.slug}
              href={`/dat110/eksamen/${exam.slug}`}
              className={`group relative rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 bg-[var(--card)] ${
                isReconstructed
                  ? "border-amber-300 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-600"
                  : "border-emerald-300 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-600"
              }`}
            >
              <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    isReconstructed
                      ? "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200"
                      : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200"
                  }`}
                >
                  {isReconstructed ? "Rekonstruert" : "Offisiell"}
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {exam.questionCount} oppgaver · {exam.totalWeight} %
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1 text-neutral-900 dark:text-neutral-50 group-hover:text-[var(--accent)] transition-colors">
                {examPeriodCaption(exam.year, exam.session)}
              </h3>
              <p className="text-sm text-[var(--muted)] line-clamp-2">
                {exam.displayLabel}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Bla per oppgavetype (eksisterende seksjon — beholdes som alternativ inngang) */}
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
        Eller bla per oppgavetype
      </h2>
      <p className="text-sm text-[var(--muted)] mb-4 max-w-2xl">
        Hvis du heller vil øve på én oppgavetype på tvers av alle eksamen-år
        (typisk mønstergjenkjenning), gå via oppgavetype-listingen under.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {oppgaver.map((oppg) => (
          <Link
            key={oppg.id}
            href={`/dat110/eksamenoving/oppg-${oppg.id}/tidligere`}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl border-2 bg-[var(--card)] transition-all hover:shadow-md ${colorStyles[oppg.color]}`}
          >
            <div className="text-right">
              <p className="text-xs font-bold">{oppg.weight}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold opacity-70">{oppg.label}</p>
              <p className="font-bold text-neutral-900 dark:text-neutral-50">
                {oppg.title}
              </p>
            </div>
            <svg
              className="w-5 h-5 opacity-40"
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
          </Link>
        ))}
      </div>

      <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/40 p-4">
        <h3 className="font-bold text-sm mb-2 text-neutral-900 dark:text-neutral-50">
          Om sensorveiledningene
        </h3>
        <p className="text-xs text-[var(--muted)]">
          Alle løsningene er kildetro etter sensorveiledningene fra HVL. Original
          sensor-PDF og oppgave-PDF er tilgjengelig lokalt for verifikasjon, men
          ikke publisert på web.
        </p>
      </div>
    </div>
  );
}
