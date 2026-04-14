"use client";

export default function DS7TeoriPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her kommer grundig teori om data-sentrerte konsistensmodeller (strict, sequential, causal),
          klient-sentrerte modeller (monotonic reads/writes, read-your-writes, write-follows-reads),
          primary-based replikering, replikerte write-protokoller og quorum-basert konsistens.
        </p>
      </div>
    </div>
  );
}
