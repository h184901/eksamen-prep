import Link from "next/link";
import { getEgb339Assessments } from "@/lib/egb339-vault/loader";
import { assessmentCode } from "@/lib/egb339";

export default function Egb339AssessmentsPage() {
  const entries = getEgb339Assessments();
  const overview = entries.filter((entry) => !/Assessment\s+\d+\.\d+/i.test(entry.title));
  const assessment1 = entries.filter((entry) => /^Assessment\s+1\./i.test(entry.title));
  const assessment2 = entries.filter((entry) => /^Assessment\s+2\./i.test(entry.title));

  const groups = [
    { title: "Assessment 1 · Problem-solving tasks", description: "Generelle Python-funksjoner testet med offentlige og private tester.", entries: assessment1, tone: "border-robotics-400" },
    { title: "Assessment 2 · Applied project", description: "Fra simulert Dobot til fysisk robot. 2.3 og 2.4 legges til når detaljsidene publiseres.", entries: assessment2, tone: "border-amber-400" },
  ];

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">Vurdering</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">Assessments og innleveringsstøtte</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">
        Sidene forklarer kontrakten, matematikken og teststrategien. Eksempeldata skal brukes til kontroll; implementasjonene må være generelle.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {overview.map((entry) => (
          <Link key={entry.slug} href={entry.route} className="rounded-xl border border-amber-300/60 bg-amber-50/60 p-5 transition-colors hover:border-amber-500 dark:border-amber-800 dark:bg-amber-950/25">
            <span className="text-sm font-bold text-amber-800 dark:text-amber-200">Vurderingsoversikt</span>
            <h2 className="mt-1 text-lg font-bold text-neutral-950 dark:text-white">{entry.title}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-200">{entry.summary}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">{group.title}</h2>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{group.description}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.entries.map((entry) => (
                <Link key={entry.slug} href={entry.route} className={`group rounded-xl border border-[var(--card-border)] border-t-4 ${group.tone} bg-[var(--card)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-md`}>
                  <span className="text-sm font-bold text-amber-700 dark:text-amber-300">Assessment {assessmentCode(entry)}</span>
                  <h3 className="mt-1 font-bold leading-snug text-neutral-950 dark:text-white">{entry.title.replace(/^Assessment\s+[0-9.]+\s*[–-]\s*/i, "")}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{entry.summary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-robotics-700 dark:text-robotics-300">Åpne støtte →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
