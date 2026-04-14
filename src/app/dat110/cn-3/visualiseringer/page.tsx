"use client";

export default function CN3VisualiseringerPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne en interaktiv sliding window-simulator for Go-Back-N
          og Selective Repeat, AIMD-kurven animert med congestion events, og
          en animert 3-veis handshake.
        </p>
      </div>
    </div>
  );
}
