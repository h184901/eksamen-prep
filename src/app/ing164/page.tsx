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
