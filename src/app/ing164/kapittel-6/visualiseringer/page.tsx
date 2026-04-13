"use client";

import { WorkCalculator, WorkEnergyVisualizer } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-6">
        Endre parameterne med glidebrytere og se resultatene oppdatere seg umiddelbart.
        Bruk disse for å bygge intuisjon for arbeid og energi.
      </p>

      <WorkCalculator />
      <WorkEnergyVisualizer />
    </div>
  );
}
