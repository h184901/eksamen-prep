"use client";

export default function DS5TeoriPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne teori om Lamport-klokker og happens-before relasjonen,
          vektorklokker og kausal orden, gjensidig utelukkelse (distribuert mutex),
          Ricart-Agrawala-algoritmen og ledervalg (bully og ring).
        </p>
      </div>
    </div>
  );
}
