"use client";

export default function CN4OppgaverPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne subnettoppgaver med CIDR, longest-prefix match
          tabelloppgaver, manuelle kjøringer av Dijkstra og Bellman-Ford, og
          klassiske eksamensoppgaver om IPv4-adressering og ruting.
        </p>
      </div>
    </div>
  );
}
