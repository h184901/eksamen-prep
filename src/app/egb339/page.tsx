import Link from "next/link";
import FrameTransformExplorer from "@/components/egb339/FrameTransformExplorer";
import Egb339NextStep from "@/components/egb339/Egb339NextStep";
import Egb339ProgressSummary from "@/components/egb339/Egb339ProgressSummary";
import {
  getEgb339Assessments,
  getEgb339ConceptsByTrack,
  getEgb339Meta,
  getEgb339Weeks,
} from "@/lib/egb339-vault/loader";
import { EGB339_TRACKS, assessmentCode, egb339DisplayTitle } from "@/lib/egb339";

export default function Egb339Page() {
  const weeks = getEgb339Weeks();
  const assessments = getEgb339Assessments();
  const meta = getEgb339Meta();
  const taskAssessments = assessments.filter((entry) => /Assessment\s+\d+\.\d+/i.test(entry.title));
  const visionAssessments = taskAssessments.filter((entry) => /^Assessment\s+1\.[5-7]/i.test(entry.title));

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-robotics-700 dark:hover:text-robotics-300">Hjem</Link>
        <span>/</span>
        <Link href="/utveksling" className="hover:text-robotics-700 dark:hover:text-robotics-300">Utveksling</Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-neutral-100">EGB339</span>
      </div>

      <section className="mb-10 grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.65fr)]">
        <div className="overflow-hidden rounded-2xl border border-robotics-300/60 bg-gradient-to-br from-robotics-50 via-white to-sky-50 p-6 dark:border-robotics-800 dark:from-robotics-950/70 dark:via-neutral-950 dark:to-sky-950/50 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-robotics-700 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Aktivt emne
            </span>
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">QUT · Semester 2 · 12 cp</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
            EGB339 Introduction to Robotics
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700 dark:text-neutral-200">
            Følg læringskjeden fra matriser og koordinatrammer til Dobot-bevegelse og robot vision. Innholdet oppdateres fra den lokale Obsidian-wikien når nye uker publiseres.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Egb339NextStep
              weeks={weeks.map(({ slug, route, week }) => ({ slug, route, week }))}
            />
            <Link
              href="/egb339/temaer"
              className="inline-flex items-center gap-2 rounded-lg border border-robotics-300 bg-white px-4 py-2.5 text-sm font-semibold text-robotics-800 transition-colors hover:bg-robotics-50 dark:border-robotics-800 dark:bg-neutral-950 dark:text-robotics-200 dark:hover:bg-robotics-950/40"
            >
              Finn et tema
            </Link>
          </div>
        </div>
        <Egb339ProgressSummary totalWeeks={weeks.length} />
      </section>

      <section className="mb-12" aria-labelledby="weeks-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">Semesterløype</p>
            <h2 id="weeks-heading" className="mt-1 text-2xl font-bold text-neutral-950 dark:text-white">Uke for uke</h2>
          </div>
          <Link href="/egb339/uker" className="text-sm font-semibold text-robotics-700 hover:underline dark:text-robotics-300">Alle uker →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {weeks.map((week) => (
            <Link
              key={week.slug}
              href={week.route}
              className="group rounded-xl border border-[var(--card-border)] border-t-4 border-t-robotics-500 bg-[var(--card)] p-4 transition-all hover:-translate-y-0.5 hover:border-robotics-400 hover:shadow-md"
            >
              <span className="text-sm font-bold text-robotics-700 dark:text-robotics-300">Uke {week.week}</span>
              <h3 className="mt-1 font-semibold leading-snug text-neutral-950 group-hover:text-robotics-700 dark:text-white dark:group-hover:text-robotics-300">
                {egb339DisplayTitle(week)}
              </h3>
              <span className="mt-3 inline-block text-sm text-[var(--muted)]">Åpne modul →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12" aria-labelledby="tracks-heading">
        <p className="text-sm font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">Kunnskapskart</p>
        <h2 id="tracks-heading" className="mt-1 text-2xl font-bold text-neutral-950 dark:text-white">Fire spor som bygger på hverandre</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--muted)]">
          Anbefalt rekkefølge fra fagkartet: matriser og NumPy → rammer og pose → forward kinematics → inverse kinematics → Jacobian → bevegelsesplanlegging → bildedata → segmentering, farge, form og homografier.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EGB339_TRACKS.map((track, index) => {
            const count = getEgb339ConceptsByTrack(track.id).length;
            return (
              <Link key={track.id} href={`/egb339/temaer#${track.id}`} className={`flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 motion-reduce:transform-none ${track.surface} ${track.interactive}`}>
                <span className={`text-sm font-bold ${track.accent}`}>0{index + 1}</span>
                <h3 className="mt-2 font-bold text-neutral-950 dark:text-white">{track.label}</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-200">{track.description}</p>
                <p className={`mt-auto pt-3 text-sm font-semibold ${track.accent}`}>{count} sider →</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <FrameTransformExplorer />
      </section>

      <section className="mb-12 grid gap-5 lg:grid-cols-[1fr_0.7fr]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">Assessment</p>
              <h2 className="mt-1 text-2xl font-bold text-neutral-950 dark:text-white">Fra forståelse til innlevering</h2>
            </div>
            <Link href="/egb339/vurderinger" className="text-sm font-semibold text-robotics-700 hover:underline dark:text-robotics-300">Se alle →</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {taskAssessments.slice(0, 6).map((entry) => (
              <Link key={entry.slug} href={entry.route} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 transition-colors hover:border-amber-400">
                <span className="text-sm font-bold text-amber-700 dark:text-amber-300">Assessment {assessmentCode(entry)}</span>
                <h3 className="mt-1 font-semibold text-neutral-950 dark:text-white">{entry.title.replace(/^Assessment\s+[0-9.]+\s*[–-]\s*/i, "")}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </div>
        <aside className="rounded-2xl border border-fuchsia-300/60 bg-fuchsia-50/60 p-5 dark:border-fuchsia-800 dark:bg-fuchsia-950/25">
          <p className="text-sm font-bold uppercase tracking-wide text-fuchsia-700 dark:text-fuchsia-300">Neste fagspor</p>
          <h2 className="mt-2 text-xl font-bold text-neutral-950 dark:text-white">Robot vision har startet</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-200">
            Uke 8 introduserer bilder som NumPy-arrays, koordinatkonvensjoner, histogrammer og thresholding. Senere materiale legges inn i samme løype uten å endre navigasjonen.
          </p>
          <Link href="/egb339/uker/uke-8" className="mt-4 inline-flex text-sm font-semibold text-fuchsia-700 hover:underline dark:text-fuchsia-300">Åpne uke 8 →</Link>
          <div className="mt-4 border-t border-fuchsia-200 pt-4 dark:border-fuchsia-800">
            <p className="text-xs font-bold uppercase tracking-wide text-fuchsia-800 dark:text-fuchsia-200">Vision-oppgaver i Assessment 1</p>
            <div className="mt-2 space-y-2">
              {visionAssessments.map((entry) => (
                <Link
                  key={entry.slug}
                  href={entry.route}
                  className="block text-sm font-semibold text-fuchsia-800 hover:underline dark:text-fuchsia-200"
                >
                  Assessment {assessmentCode(entry)} →
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <p className="mb-10 text-sm text-[var(--muted)]">
        Innholdssnapshot: {meta.counts.weeks} uker · {meta.counts.concepts} temaer og begreper · {meta.counts.assessments} vurderingssider.
      </p>
    </div>
  );
}
