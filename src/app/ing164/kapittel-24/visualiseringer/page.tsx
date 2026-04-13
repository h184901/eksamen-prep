"use client";

import { CapacitorCalculator, SeriesParallelCalculator } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-8">
        Utforsk kapasitans og kondensatorer interaktivt. Juster parameterne og se umiddelbart hvordan
        kapasitans, ladning, E-felt og energi endrer seg — dette er den beste måten å bygge intuisjon
        for elektrostatikk.
      </p>

      <CapacitorCalculator />
      <SeriesParallelCalculator />
    </div>
  );
}
