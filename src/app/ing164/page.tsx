import Link from "next/link";
import { chapters, categoryLabels, type Chapter } from "@/lib/chapters";

const categoryOrder: Chapter["category"][] = ["bevegelse", "mekanikk", "em"];

const categoryStyles: Record<
  Chapter["category"],
  { border: string; badge: string; accent: string }
> = {
  bevegelse: {
    border: "border-physics-400/30 hover:border-physics-400/60",
    badge: "bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400",
    accent: "text-physics-600 dark:text-physics-400",
  },
  mekanikk: {
    border: "border-physics-500/30 hover:border-physics-500/60",
    badge: "bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400",
    accent: "text-physics-600 dark:text-physics-400",
  },
  em: {
    border: "border-network-500/30 hover:border-network-500/60",
    badge: "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400",
    accent: "text-network-600 dark:text-network-400",
  },
};

export default function ING164Page() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    chapters: chapters.filter((c) => c.category === cat),
  }));

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">ING164 Fysikk</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">ING164 Fysikk</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          University Physics (Young & Freedman). Mekanikk, bølger,
          elektrisitet og magnetisme. Velg et kapittel for å begynne.
        </p>
      </div>

      {/* Verktøy */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Link
          href="/ing164/formelark"
          className="group relative overflow-hidden rounded-xl border-2 border-amber-400/40 hover:border-amber-400/80 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="text-3xl mb-2">📋</div>
          <h3 className="font-bold text-lg mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Komplett formelark
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Alle formler fra alle kapitler organisert etter tema. Filtrer etter
            emne og søk raskt opp det du trenger.
          </p>
        </Link>
        <Link
          href="/ing164/eksamen"
          className="group relative overflow-hidden rounded-xl border-2 border-red-400/40 hover:border-red-400/80 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/20 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-bold text-lg mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            Eksamensøving
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Alle oppgaver fra tidligere eksamener med fullstendige løsninger.
            Tidtaker for øvingseksamen inkludert.
          </p>
        </Link>
      </div>

      {/* Chapter groups */}
      <div className="space-y-10">
        {grouped.map(({ category, label, chapters: cats }) => {
          const styles = categoryStyles[category];
          return (
            <section key={category}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${styles.badge}`}
                >
                  {label}
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cats.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/ing164/${chapter.slug}`}
                    className={`group rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 bg-[var(--card)] ${styles.border}`}
                  >
                    <p className={`text-xs font-bold mb-1 ${styles.accent}`}>
                      Kapittel {chapter.id}
                    </p>
                    <h3 className="font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)]">
                      {chapter.description}
                    </p>
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
