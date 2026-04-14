"use client";

export default function CN8OppgaverPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne RSA-krypteringsoppgaver med små tall, SSL/TLS
          handshake-beskrivelseoppgaver, analyse av angrepsscenariene
          (man-in-the-middle, replay) og flervalgsoppgaver fra eksamen.
        </p>
      </div>
    </div>
  );
}
