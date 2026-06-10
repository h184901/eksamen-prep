import Link from "next/link";
import {
  studyPlan,
  type PlanSemester,
  type PlanSubject,
  type SubjectColor,
  type SubjectStatus,
} from "@/lib/study-plan";

// Studieløp-roadmap: 1.–3. år → semestre → fagkort. Presentasjonskomponent
// uten klient-hooks (rendres av server-siden). Aktive fag lenker til egen
// rute; "Kommer senere"-fag er statiske (ingen lenke → ingen 404).

const ACTIVE_YEAR_FOR_EXCHANGE = "3. år";

// Venstre-aksent + tittelfarge per fag-token. Nøytral brukes for fag uten side.
const colorTone: Record<SubjectColor, { accent: string; title: string }> = {
  dat102: { accent: "border-l-dat102-400 dark:border-l-dat102-500", title: "text-dat102-700 dark:text-dat102-300" },
  dat107: { accent: "border-l-dat107-400 dark:border-l-dat107-500", title: "text-dat107-700 dark:text-dat107-300" },
  sysdev: { accent: "border-l-sysdev-400 dark:border-l-sysdev-500", title: "text-sysdev-700 dark:text-sysdev-300" },
  network: { accent: "border-l-network-400 dark:border-l-network-500", title: "text-network-700 dark:text-network-300" },
  physics: { accent: "border-l-physics-400 dark:border-l-physics-500", title: "text-physics-700 dark:text-physics-300" },
  neutral: { accent: "border-l-neutral-300 dark:border-l-neutral-700", title: "text-neutral-700 dark:text-neutral-300" },
};

const statusBadge: Record<SubjectStatus, { label: string; className: string }> = {
  active: {
    label: "Aktiv",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  building: {
    label: "Under bygging",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  later: {
    label: "Kommer senere",
    className: "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
  },
};

function StatusBadge({ status }: { status: SubjectStatus }) {
  const b = statusBadge[status];
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ${b.className}`}>
      {b.label}
    </span>
  );
}

function SubjectHeader({ subject }: { subject: PlanSubject }) {
  const tone = colorTone[subject.color];
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
          {subject.code}
        </span>
        <StatusBadge status={subject.status} />
      </div>
      {subject.name && (
        <h4 className={`text-sm font-semibold leading-snug mt-1 ${subject.href ? tone.title : "text-neutral-500 dark:text-neutral-400"}`}>
          {subject.name}
        </h4>
      )}
    </>
  );
}

function ChipRow({ chips }: { chips: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2.5">
      {chips.map((c) => (
        <span
          key={c}
          className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function SubjectCard({ subject }: { subject: PlanSubject }) {
  const tone = colorTone[subject.color];

  // Aktivt fag → hele kortet er en lenke til faget.
  if (subject.href) {
    return (
      <Link
        href={subject.href}
        className={`group block rounded-lg border border-[var(--card-border)] border-l-4 ${tone.accent} bg-[var(--card)] px-4 py-3 transition-all hover:shadow-sm hover:-translate-y-px`}
      >
        <SubjectHeader subject={subject} />
        {subject.chips && subject.chips.length > 0 && <ChipRow chips={subject.chips} />}
        <span className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${tone.title}`}>
          Åpne fag
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </Link>
    );
  }

  // Fag uten side ennå → statisk kort, ingen lenke.
  return (
    <div className={`rounded-lg border border-dashed border-[var(--card-border)] border-l-4 ${tone.accent} bg-transparent px-4 py-3 opacity-80`}>
      <SubjectHeader subject={subject} />
    </div>
  );
}

function ExchangeCard() {
  return (
    <div className="flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <div className="h-1 bg-emerald-500" aria-hidden />
      <div className="flex-1 flex flex-col px-4 py-3.5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
            Utveksling
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 whitespace-nowrap">
            Planlagt
          </span>
        </div>
        <h4 className="text-sm font-semibold leading-snug text-emerald-700 dark:text-emerald-300">
          Australia · Gardens Point
        </h4>
        <p className="text-xs text-[var(--muted)] leading-relaxed mt-1.5">
          Aktuelle utvekslingsemner (Cloud, ML, Robotics, Cyber Security) for 2026 Semester&nbsp;2.
        </p>
        <Link
          href="/utveksling"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
        >
          Se planlagte emner
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

function SemesterCard({ semester }: { semester: PlanSemester }) {
  return (
    <div className="flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--background)]/40 p-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
        {semester.label}
      </h4>
      {semester.note ? (
        <p className="text-sm text-[var(--muted)] leading-relaxed">{semester.note}</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {semester.subjects.map((s) => (
            <SubjectCard key={s.code} subject={s} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudyPlanRoadmap() {
  return (
    <section id="studieplan" className="mb-16 scroll-mt-20" aria-labelledby="studieplan-heading">
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h2
          id="studieplan-heading"
          className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight"
        >
          Studieløpet
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] hidden sm:block">
          Dataingeniør · HVL Bergen · velg semester og fag
        </p>
      </div>

      <div className="space-y-8">
        {studyPlan.map((year) => {
          const withExchange = year.label === ACTIVE_YEAR_FOR_EXCHANGE;
          const gridCols = withExchange
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-2";
          return (
            <div key={year.label}>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  {year.label}
                </h3>
                <span className="h-px flex-1 bg-[var(--card-border)]" aria-hidden />
              </div>
              <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
                {year.semesters.map((sem) => (
                  <SemesterCard key={sem.id} semester={sem} />
                ))}
                {withExchange && <ExchangeCard />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
