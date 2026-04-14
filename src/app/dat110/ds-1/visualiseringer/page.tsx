"use client";

export default function DS1VisualiseringerPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne et interaktivt arkitekturdiagram som sammenligner
          klient-server og P2P, de 8 transparenstypene forklart med
          scenarieeksempler og en lagmodell for middleware.
        </p>
      </div>
    </div>
  );
}
