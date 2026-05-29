import Link from "next/link";
import { getExamSummaries } from "@/lib/dat110-vault/loader";
import Dat110PageHeader from "@/components/dat110/Dat110PageHeader";
import Dat110Section from "@/components/dat110/Dat110Section";
import Dat110Badge from "@/components/dat110/Dat110Badge";

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
  emerald: "hover:border-emerald-400 text-emerald-600 dark:text-emerald-400",
  purple: "hover:border-purple-400 text-purple-600 dark:text-purple-400",
  network: "hover:border-network-400 text-network-600 dark:text-network-400",
  blue: "hover:border-blue-400 text-blue-600 dark:text-blue-400",
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
      <Dat110PageHeader
        crumbs={[
          { label: "Hjem", href: "/" },
          { label: "DAT110", href: "/dat110" },
          { label: "Eksamen" },
        ]}
        eyebrow="DAT110 · Eksamen"
        title="Tidligere eksamener"
        lead="Kildetro oppgavetekst og dokumenterte løsninger fra sensorveiledning. Velg en eksamen for å gå gjennom oppgavene, eller bla per oppgavetype lenger ned for systematisk mønstergjenkjenning."
      />

      <Dat110Section
        eyebrow="Komplette sett"
        title="Eksamener etter år"
        description="Offisielle eksamener er merket grønt. Juni 2025 er rekonstruert fra sensorveiledningen — bruk den som øvingskilde, ikke som autoritativ eksamen."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => {
            const isReconstructed = exam.reconstructedFromSensor === true;
            return (
              <Link
                key={exam.slug}
                href={`/dat110/eksamen/${exam.slug}`}
                className="group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-network-300 dark:hover:border-network-700"
              >
                <div
                  className={`h-1 ${isReconstructed ? "bg-amber-400" : "bg-emerald-500"}`}
                  aria-hidden
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                    <Dat110Badge
                      tone={isReconstructed ? "reconstructed" : "official"}
                    >
                      {isReconstructed ? "Rekonstruert" : "Offisiell"}
                    </Dat110Badge>
                    <span className="text-xs text-[var(--muted)]">
                      {exam.questionCount} oppgaver · {exam.totalWeight} %
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-neutral-900 dark:text-neutral-50 group-hover:text-network-700 dark:group-hover:text-network-300 transition-colors">
                    {examPeriodCaption(exam.year, exam.session)}
                  </h3>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">
                    {exam.displayLabel}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Dat110Section>

      <Dat110Section
        eyebrow="Mønstergjenkjenning"
        title="Eller bla per oppgavetype"
        description="Vil du heller øve på én oppgavetype på tvers av alle eksamen-år, gå via oppgavetype-listingen."
      >
        <div className="grid sm:grid-cols-2 gap-3">
          {oppgaver.map((oppg) => (
            <Link
              key={oppg.id}
              href={`/dat110/eksamenoving/oppg-${oppg.id}/tidligere`}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] shadow-sm transition-all hover:shadow-md ${colorStyles[oppg.color]}`}
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
      </Dat110Section>

      <div className="rounded-xl border border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-900/40 p-4">
        <h3 className="font-bold text-sm mb-1.5 text-neutral-900 dark:text-neutral-50">
          Om sensorveiledningene
        </h3>
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Alle løsningene er kildetro etter sensorveiledningene fra HVL. Original
          sensor-PDF og oppgave-PDF er tilgjengelig lokalt for verifikasjon, men
          ikke publisert på web.
        </p>
      </div>
    </div>
  );
}
