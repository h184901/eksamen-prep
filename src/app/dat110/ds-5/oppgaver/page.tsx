"use client";

export default function DS5OppgaverPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne oppgaver der du sporer Lamport-klokker gjennom
          meldingsutveksling i et diagram, sammenligner vektorklokker for
          kausalitet, simulerer mutex-forespørsler og kjører ledervalg for hånd.
        </p>
      </div>
    </div>
  );
}
