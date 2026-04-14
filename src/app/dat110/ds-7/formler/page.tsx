"use client";

export default function DS7FormlerPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her kommer quorum-formelen N_R + N_W &gt; N, konsistensmodell-hierarki
          og replikeringsprotokoller med formelle definisjoner.
        </p>
      </div>
    </div>
  );
}
