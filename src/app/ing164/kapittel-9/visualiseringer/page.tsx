"use client";

import { LinearRotationalAnalogy, MomentOfInertiaVisualizer, ParallelAxisVisualizer } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-8">
        Utforsk rotasjon interaktivt. Klikk på rader i analogitabellen, juster masse og geometri for treghetsmomentet, og se hvordan parallellakseforskyvning påvirker I — den beste måten å bygge intuisjon for kapittel 9.
      </p>

      <LinearRotationalAnalogy />
      <MomentOfInertiaVisualizer />
      <ParallelAxisVisualizer />
    </div>
  );
}
