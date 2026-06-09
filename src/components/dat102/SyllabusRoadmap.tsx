import Link from "next/link";
import type {
  SyllabusLecture,
  SyllabusWeekRow,
} from "@/lib/dat102-vault/types";

interface Props {
  weeks: SyllabusWeekRow[];
  lectures: SyllabusLecture[];
}

// Kompakt semester-tidslinje (horisontal scroll) bygget fra syllabus.json.
// Hver uke viser forelesningskodene (lenket til pensum-ankrene) og
// oblig-frister. Full ukeplan ligger på /dat102/pensum.
export default function SyllabusRoadmap({ weeks, lectures }: Props) {
  const lecturesByWeek = new Map<string, SyllabusLecture[]>();
  for (const lec of lectures) {
    const list = lecturesByWeek.get(lec.week) ?? [];
    list.push(lec);
    lecturesByWeek.set(lec.week, list);
  }

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
      <ol className="flex items-stretch gap-2 min-w-max" aria-label="Semesterplan uke for uke">
        {weeks.map((w) => {
          const lecs = (lecturesByWeek.get(w.week) ?? []).filter(
            (l) => l.code !== "—"
          );
          const hasOblig = w.oblig !== "—" && w.oblig.trim() !== "";
          const isExamWeek = /eksamen/i.test(w.thursday) && lecs.length === 0;
          return (
            <li
              key={w.week}
              className={`flex flex-col rounded-lg border px-3 py-2.5 w-[8.5rem] ${
                isExamWeek
                  ? "border-dat102-400 bg-dat102-50/70 dark:bg-dat102-950/40 dark:border-dat102-700"
                  : "border-[var(--card-border)] bg-[var(--card)]"
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-0.5">
                Uke {w.week}
              </p>
              <p className="text-[11px] text-[var(--muted)] mb-1.5">{w.dates}</p>
              {lecs.length > 0 ? (
                <p className="flex flex-wrap gap-1 mb-1.5">
                  {lecs.map((l) => (
                    <Link
                      key={l.anchor}
                      href={`/dat102/pensum#${l.anchor}`}
                      className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-dat102-100 text-dat102-700 dark:bg-dat102-900/40 dark:text-dat102-300 hover:bg-dat102-200 dark:hover:bg-dat102-900/70 transition-colors"
                      title={l.title}
                    >
                      {l.code}
                    </Link>
                  ))}
                </p>
              ) : (
                <p className="text-[11px] text-neutral-700 dark:text-neutral-200 font-medium mb-1.5">
                  {isExamWeek ? "🎯 Eksamen" : w.tuesday}
                </p>
              )}
              {hasOblig && (
                <p className="mt-auto flex items-start gap-1 text-[10px] text-amber-700 dark:text-amber-300 font-medium">
                  <span aria-hidden>●</span>
                  <span>{w.oblig}</span>
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
