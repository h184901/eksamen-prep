"use client";

import type { Facet } from "./oving-types";

export interface FilterGroup {
  key: string;
  label: string;
  facets: Facet[];
  // null = "alle"
  selected: string | null;
  onSelect: (value: string | null) => void;
}

// Gjenbrukbar pille-rad for øvings-filtre (tema / type / vanskelighet /
// kategori). Hver gruppe er single-select med en "Alle"-pille. Holder seg
// kompakt på mobil (wrapper). Brukes av quiz/flashcards/matching/drills.
export default function Dat102OvingFilters({ groups }: { groups: FilterGroup[] }) {
  return (
    <div className="space-y-3">
      {groups.map((g) => (
        <div key={g.key}>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)] mb-1.5">
            {g.label}
          </p>
          <div className="flex flex-wrap gap-1.5">
            <FilterPill
              active={g.selected === null}
              onClick={() => g.onSelect(null)}
              label="Alle"
            />
            {g.facets.map((f) => (
              <FilterPill
                key={f.value}
                active={g.selected === f.value}
                onClick={() => g.onSelect(g.selected === f.value ? null : f.value)}
                label={f.label}
                count={f.count}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
        active
          ? "bg-dat102-600 text-white border-dat102-600 dark:bg-dat102-500 dark:border-dat102-500"
          : "bg-[var(--card)] text-[var(--muted)] border-[var(--card-border)] hover:border-dat102-400/70"
      }`}
    >
      {label}
      {typeof count === "number" && (
        <span className={active ? "ml-1 opacity-80" : "ml-1 opacity-60"}>
          {count}
        </span>
      )}
    </button>
  );
}
