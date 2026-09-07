import Link from "next/link";
import { notFound } from "next/navigation";
import Egb339Markdown from "@/components/egb339/Egb339Markdown";
import Egb339CompletionToggle from "@/components/egb339/Egb339CompletionToggle";
import Egb339EntryNav from "@/components/egb339/Egb339EntryNav";
import {
  getAdjacentEgb339Entry,
  getEgb339Resource,
  getEgb339Resources,
} from "@/lib/egb339-vault/loader";

export function generateStaticParams() {
  return getEgb339Resources().map((entry) => ({ slug: entry.slug }));
}

export default async function Egb339ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEgb339Resource(slug);
  if (!entry) notFound();
  const adjacent = getAdjacentEgb339Entry(getEgb339Resources(), slug);
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/egb339" className="hover:text-robotics-700 dark:hover:text-robotics-300">EGB339</Link>
        <span>/</span>
        <Link href="/egb339/ressurser" className="hover:text-robotics-700 dark:hover:text-robotics-300">Praktisk</Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-neutral-100">{entry.title}</span>
      </div>
      <header className="mb-7 border-b border-[var(--card-border)] pb-6">
        <p className="text-sm font-bold uppercase tracking-wide text-sky-700 dark:text-sky-300">Praktisk guide · uke {entry.week}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">{entry.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-700 dark:text-neutral-200">{entry.summary}</p>
      </header>
      <article className="max-w-3xl">
        <Egb339CompletionToggle pageKey={`egb339/ressurs/${entry.slug}`} />
        <Egb339Markdown content={entry.body} />
      </article>
      <Egb339EntryNav previous={adjacent.previous} next={adjacent.next} />
    </div>
  );
}
