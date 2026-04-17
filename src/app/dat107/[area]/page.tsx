import Link from "next/link";
import { notFound } from "next/navigation";
import { dat107Areas, getDAT107Area } from "@/lib/dat107";

export function generateStaticParams() {
  return dat107Areas.map((a) => ({ area: a.slug }));
}

export default async function DAT107AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = await params;
  const area = getDAT107Area(areaSlug);
  if (!area) notFound();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <Link href="/dat107" className="hover:text-[var(--accent)]">
            DAT107
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">{area.title}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-dat107-700 dark:text-dat107-300">
          {area.title}
        </h1>
        <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
          {area.longDescription}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {area.topics.map((topic, i) => (
          <Link
            key={topic.slug}
            href={`/dat107/${area.slug}/${topic.slug}`}
            className="group rounded-xl border-2 border-dat107-500/30 hover:border-dat107-500/60 bg-[var(--card)] p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-3 mb-2">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-dat107-100 dark:bg-dat107-900/30 text-dat107-700 dark:text-dat107-300 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <h3 className="font-bold leading-snug group-hover:text-dat107-600 dark:group-hover:text-dat107-400 transition-colors">
                {topic.title}
              </h3>
            </div>
            <p className="text-sm text-[var(--muted)] pl-11">{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
