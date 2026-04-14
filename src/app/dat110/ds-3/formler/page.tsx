"use client";

export default function DS3FormlerPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne sammenligningstabeller for prosesser vs tråder,
          servermønster-oversikt (iterativ, flertrå, thread pool),
          virtualiseringstyper og migrasjonsformer (svak vs sterk mobilitet).
        </p>
      </div>
    </div>
  );
}
