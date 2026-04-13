"use client";

import { ProjectileSimulator, CircularMotionVisualizer } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-6">
        Bruk sliderne til å endre parametere og se hvordan bevegelsen endrer seg i sanntid.
        Eksperimenter med startfart, vinkel og radius for å bygge intuisjon for prosjektil- og sirkelbevegelse.
      </p>
      <ProjectileSimulator />
      <CircularMotionVisualizer />
    </div>
  );
}
