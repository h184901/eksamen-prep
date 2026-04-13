"use client";

import { CoulombCalculator, ElectricFieldVisualizer } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-6">
        Bruk sliderne til å endre parametere og se hvordan krefter og felt endrer seg i sanntid.
      </p>
      <CoulombCalculator />
      <ElectricFieldVisualizer />
    </div>
  );
}
