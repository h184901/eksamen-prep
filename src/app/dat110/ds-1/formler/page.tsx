"use client";

export default function DS1FormlerPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne sammenligningstabeller for arkitekturtyper,
          oversiktsdiagram over alle 8 transparenstyper med hva de skjuler,
          og design-målkonflikter (skalerbarhet vs konsistens vs tilgjengelighet).
        </p>
      </div>
    </div>
  );
}
