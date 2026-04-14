"use client";

export default function CN4VisualiseringerPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne en interaktiv Dijkstra-animasjon som viser
          korteste-vei-utregning steg for steg, en CIDR-kalkulator og en
          klikkbar IPv4-datagramstruktur.
        </p>
      </div>
    </div>
  );
}
