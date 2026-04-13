"use client";

import { ImpulseVisualizer, CollisionVisualizer, BallisticPendulumVisualizer } from "../visualizations";

export default function Kapittel8Visualiseringer() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-6">
        Juster parametrene med glidebrytere og se beregningene oppdatere seg live. Disse
        visualiseringene hjelper deg å bygge intuisjon for bevegelsesmengde og kollisjoner.
      </p>

      <ImpulseVisualizer />
      <CollisionVisualizer />
      <BallisticPendulumVisualizer />
    </div>
  );
}
