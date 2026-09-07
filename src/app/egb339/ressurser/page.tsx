import Link from "next/link";
import { getEgb339Resources } from "@/lib/egb339-vault/loader";

export default function Egb339ResourcesPage() {
  const resources = getEgb339Resources();
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-sky-700 dark:text-sky-300">Praktisk arbeid</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">Simulator, oppsett og arbeidsflyt</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
        Praktiske guider fra den ingestede kurswikien. Miljøspesifikke parametere holdes atskilt fra selve kinematikkmodellen.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {resources.map((entry) => (
          <Link key={entry.slug} href={entry.route} className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-all hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md">
            <span className="text-sm font-bold text-sky-700 dark:text-sky-300">Uke {entry.week || "—"}</span>
            <h2 className="mt-1 text-lg font-bold text-neutral-950 dark:text-white">{entry.title}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{entry.summary}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-sky-700 dark:text-sky-300">Åpne guide →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
