"use client";

import { BiotSavartCalculator, LongWireFieldVisualizer, ParallelWiresForce } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-6">
        Bruk sliderne til å endre parametere og se hvordan magnetfelt og krefter endrer seg i sanntid.
      </p>
      <BiotSavartCalculator />
      <LongWireFieldVisualizer />
      <ParallelWiresForce />
    </div>
  );
}
