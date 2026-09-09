import Link from "next/link";
import { notFound } from "next/navigation";
import Egb339Markdown from "@/components/egb339/Egb339Markdown";
import Egb339CompletionToggle from "@/components/egb339/Egb339CompletionToggle";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import Egb339WeekProblems from "@/components/egb339/Egb339WeekProblems";
import FrameTransformExplorer from "@/components/egb339/FrameTransformExplorer";
import PlanarArmExplorer from "@/components/egb339/PlanarArmExplorer";
import { getEgb339ProblemsForWeek } from "@/lib/egb339-problems";
import {
  getAdjacentEgb339Entry,
  getEgb339Assessments,
  getEgb339Week,
  getEgb339Weeks,
} from "@/lib/egb339-vault/loader";
import {
  egb339DisplaySummary,
  egb339DisplayTitle,
  egb339TrackLabel,
} from "@/lib/egb339";

export function generateStaticParams() {
  return getEgb339Weeks().map((week) => ({ slug: week.slug }));
}

export default async function Egb339WeekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const week = getEgb339Week(slug);
  if (!week) notFound();
  const allWeeks = getEgb339Weeks();
  const adjacent = getAdjacentEgb339Entry(allWeeks, slug);
  const weekNumber = Number(week.week);
  const problems = getEgb339ProblemsForWeek(weekNumber);
  const relatedAssessments = getEgb339Assessments().filter((entry) => {
    const numbers = entry.week.match(/\d+/g)?.map(Number) ?? [];
    if (numbers.length === 1) return numbers[0] === weekNumber;
    if (numbers.length === 2 && entry.title.match(/Assessment\s+\d+\.\d+/i)) {
      return weekNumber >= numbers[0] && weekNumber <= numbers[1];
    }
    return false;
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/egb339" className="hover:text-robotics-700 dark:hover:text-robotics-300">EGB339</Link>
        <span>/</span>
        <Link href="/egb339/uker" className="hover:text-robotics-700 dark:hover:text-robotics-300">Uker</Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-neutral-100">Uke {week.week}</span>
      </div>

      <header className="mb-7 border-b border-[var(--card-border)] pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-robotics-100 px-2.5 py-1 text-sm font-bold text-robotics-800 dark:bg-robotics-950 dark:text-robotics-200">Uke {week.week}</span>
          <span className="text-sm font-semibold text-[var(--muted)]">{egb339TrackLabel(week.track)}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">{egb339DisplayTitle(week)}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-700 dark:text-neutral-200">{egb339DisplaySummary(week)}</p>
        <nav aria-label="På denne ukesiden" className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-robotics-700 dark:text-robotics-300">
          <a href="#ukeinnhold" className="rounded-lg border border-robotics-300 px-3 py-2 hover:bg-robotics-50 dark:border-robotics-800 dark:hover:bg-robotics-950/40">Ukeinnhold</a>
          <a href="#oppgaver" className="rounded-lg border border-robotics-300 px-3 py-2 hover:bg-robotics-50 dark:border-robotics-800 dark:hover:bg-robotics-950/40">Oppgaver og løsninger{problems.length > 0 ? ` (${problems.length})` : ""}</a>
          {[2, 3, 4, 5].includes(weekNumber) && <a href="#laboratorium" className="rounded-lg border border-robotics-300 px-3 py-2 hover:bg-robotics-50 dark:border-robotics-800 dark:hover:bg-robotics-950/40">Interaktivt laboratorium</a>}
        </nav>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article id="ukeinnhold" className="min-w-0 scroll-mt-24">
          <Egb339CompletionToggle pageKey={`egb339/uke/${week.slug}`} />
          <Egb339Markdown content={week.body} />
        </article>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="text-sm font-bold text-neutral-950 dark:text-white">Arbeidsmåte</p>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-neutral-700 dark:text-neutral-200">
              <li>1. Forklar hovedideen med egne ord.</li>
              <li>2. Tegn rammer eller datastrøm.</li>
              <li>3. Skriv matematikken før koden.</li>
              <li>4. Test et nytt input, ikke bare eksemplet.</li>
            </ol>
          </div>
          {relatedAssessments.length > 0 && (
            <div className="rounded-xl border border-amber-300/60 bg-amber-50/60 p-4 dark:border-amber-800 dark:bg-amber-950/25">
              <p className="text-sm font-bold text-amber-800 dark:text-amber-200">Relevant vurdering</p>
              <div className="mt-2 space-y-2">
                {relatedAssessments.map((entry) => (
                  <Link key={entry.slug} href={entry.route} className="block text-sm font-semibold text-amber-800 hover:underline dark:text-amber-200">{entry.title} →</Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <Egb339WeekProblems week={weekNumber} problems={problems} />

      {(weekNumber === 2 || weekNumber === 3) && <div id="laboratorium" className="mt-10 scroll-mt-24"><FrameTransformExplorer /></div>}
      {(weekNumber === 4 || weekNumber === 5) && <div id="laboratorium" className="mt-10 scroll-mt-24"><PlanarArmExplorer /></div>}
      <Egb339EntryNav previous={adjacent.previous} next={adjacent.next} />
    </div>
  );
}
