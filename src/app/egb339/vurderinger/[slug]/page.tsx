import Link from "next/link";
import { notFound } from "next/navigation";
import Egb339Markdown from "@/components/egb339/Egb339Markdown";
import Egb339CompletionToggle from "@/components/egb339/Egb339CompletionToggle";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import Egb339AssessmentSolutions from "@/components/egb339/Egb339AssessmentSolutions";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import {
  getAdjacentEgb339Entry,
  getEgb339Assessment,
  getEgb339Assessments,
} from "@/lib/egb339-vault/loader";
import { assessmentCode } from "@/lib/egb339";

export function generateStaticParams() {
  return getEgb339Assessments().map((entry) => ({ slug: entry.slug }));
}

export default async function Egb339AssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEgb339Assessment(slug);
  if (!entry) notFound();
  const entries = getEgb339Assessments();
  const adjacent = getAdjacentEgb339Entry(entries, slug);
  const solution = getEgb339AssessmentSolution(slug);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/egb339" className="hover:text-robotics-700 dark:hover:text-robotics-300">EGB339</Link>
        <span>/</span>
        <Link href="/egb339/vurderinger" className="hover:text-robotics-700 dark:hover:text-robotics-300">Vurderinger</Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-neutral-100">Assessment {assessmentCode(entry)}</span>
      </div>

      <header className="mb-7 rounded-2xl border border-amber-300/60 bg-gradient-to-br from-amber-50 to-robotics-50 p-6 dark:border-amber-800 dark:from-amber-950/50 dark:to-robotics-950/40 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-500 px-2.5 py-1 text-sm font-bold text-amber-950">Assessment {assessmentCode(entry)}</span>
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">Vurderingsuke {entry.week}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">{entry.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-700 dark:text-neutral-200">{entry.summary}</p>
        {solution && (
          <nav aria-label="På denne vurderingssiden" className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-robotics-800 dark:text-robotics-200">
            <a href="#oppgavekrav" className="rounded-lg border border-robotics-300 px-3 py-2 hover:bg-robotics-50 dark:border-robotics-800 dark:hover:bg-robotics-950/40">Oppgavekrav og oversikt</a>
            <a href="#losningsforslag" className="rounded-lg border border-robotics-300 px-3 py-2 hover:bg-robotics-50 dark:border-robotics-800 dark:hover:bg-robotics-950/40">Løsningsgjennomgang ({solution.parts.length} deler)</a>
          </nav>
        )}
      </header>

      <div className="mb-7 rounded-xl border border-sky-300/60 bg-sky-50/70 p-4 text-sm leading-6 text-sky-950 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-100">
        <strong>Bruk siden som støtte:</strong> behold funksjonssignaturene, bygg en generell løsning og verifiser med egne input. Studentens leveringskode publiseres ikke her.
      </div>

      <article id="oppgavekrav" className="max-w-3xl scroll-mt-24">
        <Egb339CompletionToggle pageKey={`egb339/vurdering/${entry.slug}`} />
        <Egb339Markdown content={entry.body} />
        {solution && <Egb339AssessmentSolutions solution={solution} />}
      </article>
      <Egb339EntryNav previous={adjacent.previous} next={adjacent.next} />
    </div>
  );
}
