"use client";

export default function CN3TeoriPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om UDP og TCP, 3-veis handshake,
          pålitelig dataoverføring med Go-Back-N og Selective Repeat,
          flytkontroll og AIMD-metningskontroll.
        </p>
      </div>
    </div>
  );
}
