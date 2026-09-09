import Link from "next/link";
import type { Egb339Entry } from "@/lib/egb339-vault/types";
import { egb339DisplayTitle } from "@/lib/egb339";

export default function Egb339EntryNav({
  previous,
  next,
}: {
  previous: Egb339Entry | null;
  next: Egb339Entry | null;
}) {
  return (
    <nav aria-label="Forrige og neste side" className="mt-12 grid gap-3 border-t border-[var(--card-border)] pt-6 sm:grid-cols-2">
      {previous ? (
        <Link
          href={previous.route}
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 transition-colors hover:border-robotics-400"
        >
          <span className="text-sm text-[var(--muted)]">← Forrige</span>
          <span className="mt-1 block font-semibold text-neutral-900 dark:text-neutral-50">
            {egb339DisplayTitle(previous)}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={next.route}
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-right transition-colors hover:border-robotics-400"
        >
          <span className="text-sm text-[var(--muted)]">Neste →</span>
          <span className="mt-1 block font-semibold text-neutral-900 dark:text-neutral-50">
            {egb339DisplayTitle(next)}
          </span>
        </Link>
      )}
    </nav>
  );
}
