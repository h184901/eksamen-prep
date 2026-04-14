"use client";

export default function DS8FormlerPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne Byzantine-betingelsen (N ≥ 3k+1) med eksempler,
          oversikt over alle 5 RPC feilklasser, reliable multicast-protokoller
          og sammenligning av checkpointing og meldingslogging for recovery.
        </p>
      </div>
    </div>
  );
}
