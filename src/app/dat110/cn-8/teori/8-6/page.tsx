"use client";

import Link from "next/link";

export default function CN8_6Page() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">8.6 TLS/SSL</span>
      </div>

      <h1 className="text-2xl font-bold">8.6 TLS/SSL</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Transport Layer Security: TLS-handshaken som etablerer sikker kanal, sertifikater og nøkkelutveksling.
      </p>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Innhold kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne grundig teori om TLS/SSL-handshaken og sikre kanaler.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-8/teori/8-5" className="hover:text-[var(--accent)] text-sm">
          ← 8.5 Meldingsintegritet og signaturer
        </Link>
        <Link href="/dat110/cn-8/teori/8-9" className="hover:text-[var(--accent)] text-sm">
          8.9 Brannmur og IDS →
        </Link>
      </div>
    </div>
  );
}
