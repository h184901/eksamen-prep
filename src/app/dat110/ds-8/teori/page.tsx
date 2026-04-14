"use client";

export default function DS8TeoriPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne teori om feiltyper (crash, omission, timing,
          Byzantine), Byzantine feiltoleranse og 3k+1-regelen, de 5 RPC
          feilklassene, flat vs hierarkisk gruppe, pålitelig multicast og
          checkpointing med rollback recovery.
        </p>
      </div>
    </div>
  );
}
