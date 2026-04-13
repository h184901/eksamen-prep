"use client";

import { LorentzForceCalculator, CircularMotionVisualizer } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Interaktive visualiseringer — Kapittel 27</h2>
      <p className="text-[var(--muted)] mb-6">
        Utforsk magnetiske krefter og sirkelbaner interaktivt. Endre parameterne med glidebrytere
        og se hvordan kraft, radius og periode endrer seg i sanntid.
      </p>

      <LorentzForceCalculator />
      <CircularMotionVisualizer />
    </div>
  );
}
