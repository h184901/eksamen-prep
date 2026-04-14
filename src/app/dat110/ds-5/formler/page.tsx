"use client";

export default function DS5FormlerPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne Lamport-klokkeoppdateringsregelen, vektorklokke-
          komparasjonskriterier, Ricart-Agrawala meldingstelling (2(N-1)),
          bully-algoritme steg for steg og ring-ledervalg-protokollen.
        </p>
      </div>
    </div>
  );
}
