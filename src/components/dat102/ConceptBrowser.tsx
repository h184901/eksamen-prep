"use client";

import { useMemo, useState } from "react";
import ConceptCard from "./ConceptCard";

export interface ConceptBrowserItem {
  slug: string;
  title: string;
  description: string;
  topicSlug: string | null;
  topicLabel: string | null;
}

export interface ConceptBrowserGroup {
  slug: string;
  label: string;
}

interface Props {
  items: ConceptBrowserItem[];
  // Gruppe-rekkefølge (semesterrekkefølgen på temaer); "ovrig" sist.
  groups: ConceptBrowserGroup[];
}

// Klientside søk + temafilter over alle begreper. Dataene kommer ferdig
// serialisert fra serversiden (/dat102/begreper/page.tsx).
export default function ConceptBrowser({ items, groups }: Props) {
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter((item) => {
      if (topicFilter && item.topicSlug !== topicFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.slug.includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [items, query, topicFilter]);

  const grouped = useMemo(() => {
    return groups
      .map((g) => ({
        ...g,
        items: filtered.filter((i) => (i.topicSlug ?? "ovrig") === g.slug),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered, groups]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søk i begreper … (f.eks. hashing, quicksort, heap)"
          aria-label="Søk i begreper"
          className="w-full max-w-md rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-dat102-400/60 focus:border-dat102-400"
        />
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setTopicFilter(null)}
            className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
              topicFilter === null
                ? "bg-dat102-600 text-white border-dat102-600 dark:bg-dat102-500 dark:border-dat102-500"
                : "bg-[var(--card)] text-[var(--muted)] border-[var(--card-border)] hover:border-dat102-400/70"
            }`}
          >
            Alle temaer
          </button>
          {groups.map((g) => (
            <button
              key={g.slug}
              type="button"
              onClick={() =>
                setTopicFilter((cur) => (cur === g.slug ? null : g.slug))
              }
              className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
                topicFilter === g.slug
                  ? "bg-dat102-600 text-white border-dat102-600 dark:bg-dat102-500 dark:border-dat102-500"
                  : "bg-[var(--card)] text-[var(--muted)] border-[var(--card-border)] hover:border-dat102-400/70"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)]" aria-live="polite">
          Viser {filtered.length} av {items.length} begreper
        </p>
      </div>

      {grouped.length === 0 ? (
        <p className="text-sm text-[var(--muted)] py-8">
          Ingen begreper matcher søket. Prøv et annet ord — eller nullstill
          filteret.
        </p>
      ) : (
        <div className="space-y-8">
          {grouped.map((g) => (
            <section key={g.slug} aria-label={g.label}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
                {g.label}{" "}
                <span className="font-normal normal-case">
                  · {g.items.length}
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {g.items.map((item) => (
                  <ConceptCard
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    description={item.description}
                    topicLabel={null}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
