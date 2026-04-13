"use client";

import { PotentialVisualizer, EnergyConservation } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Interaktive visualiseringer — Elektrisk potensial</h2>
      <p className="text-[var(--muted)] mb-6">
        Bruk sliderne til å utforske hvordan elektrisk potensial og energibevaring fungerer.
        Endre parametere og se resultatene live.
      </p>

      <PotentialVisualizer />
      <EnergyConservation />
    </div>
  );
}
