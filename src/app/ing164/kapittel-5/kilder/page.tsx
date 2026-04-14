export default function KilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Relevante kilder og videoer</h2>
        <p className="text-[var(--muted)] text-sm">
          Nyttige YouTube-videoer, artikler og andre ressurser for dette kapittelet.
        </p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">Kommer snart</p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne lenker til relevante YouTube-videoer, forklaringer og andre nyttige kilder.
        </p>
      </div>
    </div>
  );
}
