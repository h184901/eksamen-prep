"use client";

import { FaradayCalculator, MovingConductorVisualizer, ACGeneratorVisualizer } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-2">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        Juster parameterne med glidebrytere og se hvordan indusert EMF, strøm og fluks endrer seg i sanntid.
        Disse visualiseringene illustrerer Faradays lov, leder i bevegelse og vekselstrømgeneratoren.
      </p>

      <FaradayCalculator />
      <MovingConductorVisualizer />
      <ACGeneratorVisualizer />
    </div>
  );
}
