import Link from "next/link";
import { getEgb339ConceptsByTrack } from "@/lib/egb339-vault/loader";
import { EGB339_TRACKS, egb339DisplaySummary, egb339DisplayTitle } from "@/lib/egb339";

export default function Egb339TopicsPage() {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">Kunnskapskart</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">Temaer og begreper</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
        Uker viser rekkefølgen i kurset. Disse sidene samler samme idé på tvers av forelesninger, practicals og assessments.
      </p>

      <nav aria-label="Fagspor i kunnskapskartet" className="mt-6 flex flex-wrap gap-2">
        {EGB339_TRACKS.map((track, index) => (
          <a key={track.id} href={`#${track.id}`} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${track.surface} ${track.accent} ${track.interactive}`}>
            0{index + 1} · {track.label}
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-10">
        {EGB339_TRACKS.map((track, index) => {
          const entries = getEgb339ConceptsByTrack(track.id);
          return (
            <section key={track.id} id={track.id} className="scroll-mt-28">
              <div className={`rounded-xl border p-5 ${track.surface}`}>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className={`text-xl font-bold ${track.accent}`}>0{index + 1} · {track.label}</h2>
                    <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-200">{track.description}</p>
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{entries.length} sider</span>
                </div>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={entry.route}
                    className={`group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 motion-reduce:transform-none ${track.interactive}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-bold ${track.accent}`}>
                        {entry.kind === "entity" ? "System" : entry.kind === "topic" ? "Oversikt" : `Uke ${entry.week}`}
                      </span>
                      <span aria-hidden className="text-[var(--muted)] transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                    <h3 className="mt-1 font-semibold leading-snug text-neutral-950 dark:text-white">{egb339DisplayTitle(entry)}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{egb339DisplaySummary(entry)}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
