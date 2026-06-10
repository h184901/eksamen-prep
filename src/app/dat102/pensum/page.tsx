import Link from "next/link";
import { getSyllabus } from "@/lib/dat102-vault/loader";
import type { SyllabusLecture } from "@/lib/dat102-vault/types";
import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102Section from "@/components/dat102/Dat102Section";
import { topicTitle } from "@/components/dat102/dat102-derived";

export const metadata = {
  title: "Pensum — DAT102",
  description:
    "Ukeplanen for DAT102: forelesningene F01–F26 med kapittelreferanser, lab-øvinger og obligfrister.",
};

// Finner hvilken dag (tir/tor) en forelesning hører til ved å matche F-koden
// mot ukeradens tekst. \b hindrer at "F18" matcher "F18b".
function lectureDay(
  code: string,
  week: { tuesday: string; thursday: string }
): "tir" | "tor" | null {
  if (code === "—") return null;
  const re = new RegExp(`\\b${code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
  if (re.test(week.tuesday)) return "tir";
  if (re.test(week.thursday)) return "tor";
  return null;
}

function LectureRow({
  lecture,
  day,
}: {
  lecture: SyllabusLecture;
  day: "tir" | "tor" | null;
}) {
  return (
    <div
      id={lecture.anchor}
      className="scroll-mt-24 flex items-start gap-3 py-2 border-b border-[var(--card-border)]/60 last:border-b-0"
    >
      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-dat102-100 text-dat102-700 dark:bg-dat102-900/40 dark:text-dat102-300 flex-shrink-0 mt-0.5 min-w-[3rem] text-center">
        {lecture.code === "—" ? "·" : lecture.code}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50 leading-snug">
          {lecture.title}
          {day && (
            <span className="ml-2 text-[10px] font-semibold uppercase text-[var(--muted)]">
              {day}
            </span>
          )}
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[var(--muted)]">
          {lecture.chapters && <span>Kap. {lecture.chapters}</span>}
          {lecture.pages !== null && <span>· {lecture.pages} lysark</span>}
          {lecture.topicSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/dat102/temaer/${slug}`}
              className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2"
            >
              {topicTitle(slug)}
            </Link>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function PensumPage() {
  const syllabus = getSyllabus();

  const lecturesByWeek = new Map<string, SyllabusLecture[]>();
  for (const lec of syllabus.lectures) {
    const list = lecturesByWeek.get(lec.week) ?? [];
    list.push(lec);
    lecturesByWeek.set(lec.week, list);
  }

  return (
    <div>
      <Dat102Breadcrumbs trail={[{ label: "Pensum" }]} />

      <Dat102Section
        eyebrow={`${syllabus.lectures.length} forelesninger · ${syllabus.weeks.length} uker`}
        title="Pensum og semesterplan"
        description="Ukeplanen med forelesninger, lab-øvinger, kapittelreferanser og obligfrister. Temalenkene tar deg til forklaringene."
      >
        {/* Bokpolicy: kapittelnumre er struktur — innholdet er egne forklaringer. */}
        <div className="mb-8 rounded-xl border border-dat102-200 dark:border-dat102-900 bg-dat102-50/50 dark:bg-dat102-950/30 px-4 py-3 text-sm text-neutral-700 dark:text-neutral-200">
          <strong className="font-semibold">Om boka:</strong>{" "}kapittelnumrene
          refererer til pensumboka (Carrano &amp; Henry) og vises kun som
          struktur. Alt innhold på disse sidene er egne forklaringer bygget fra
          forelesningsmateriellet — ingen bokutdrag eller bokfigurer.
        </div>

        <div className="space-y-4">
          {syllabus.weeks.map((w) => {
            const lecs = lecturesByWeek.get(w.week) ?? [];
            const hasOblig = w.oblig !== "—" && w.oblig.trim() !== "";
            return (
              <section
                key={w.week}
                className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4"
                aria-label={`Uke ${w.week}`}
              >
                <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-50">
                    Uke {w.week}
                    <span className="ml-2 text-sm font-normal text-[var(--muted)]">
                      {w.dates}
                    </span>
                  </h3>
                  {hasOblig && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                      {w.oblig}
                    </span>
                  )}
                </div>

                {lecs.length > 0 ? (
                  <div>
                    {lecs.map((lec) => (
                      <LectureRow
                        key={lec.anchor}
                        lecture={lec}
                        day={lectureDay(lec.code, w)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-neutral-700 dark:text-neutral-200 space-y-1">
                    <p>
                      <span className="text-[10px] font-semibold uppercase text-[var(--muted)] mr-2">
                        tir
                      </span>
                      {w.tuesday}
                    </p>
                    <p>
                      <span className="text-[10px] font-semibold uppercase text-[var(--muted)] mr-2">
                        tor
                      </span>
                      {w.thursday}
                    </p>
                  </div>
                )}

                {w.lab !== "—" && w.lab.trim() !== "" && (
                  <p className="mt-2 pt-2 border-t border-[var(--card-border)]/60 text-xs text-[var(--muted)]">
                    <span className="font-semibold uppercase text-[10px] mr-1.5">
                      Lab
                    </span>
                    {w.lab}
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </Dat102Section>

      <Dat102Section
        eyebrow="Kapittelstruktur"
        title="Kapittel → tema"
        description="Bokas kapittelinndeling (kun titler/numre) koblet til temasidene våre."
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-[var(--card-border)]">
                <th className="py-2 pr-6 font-semibold text-neutral-900 dark:text-neutral-50">
                  Kapitler
                </th>
                <th className="py-2 font-semibold text-neutral-900 dark:text-neutral-50">
                  Tema hos oss
                </th>
              </tr>
            </thead>
            <tbody>
              {syllabus.chapterMap.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[var(--card-border)]/60 last:border-b-0"
                >
                  <td className="py-2.5 pr-6 text-neutral-700 dark:text-neutral-200">
                    {row.chapters}
                  </td>
                  <td className="py-2.5">
                    <span className="flex flex-wrap gap-x-3 gap-y-1">
                      {row.topicSlugs.map((slug) => (
                        <Link
                          key={slug}
                          href={`/dat102/temaer/${slug}`}
                          className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2"
                        >
                          {topicTitle(slug)}
                        </Link>
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dat102Section>
    </div>
  );
}
