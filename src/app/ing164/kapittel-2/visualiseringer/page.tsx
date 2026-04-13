"use client";

import { KinematicsGraphs, FreeFallSimulator } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-8">
        Utforsk rettlinjet bevegelse interaktivt. Juster parameterne og se umiddelbart hvordan
        grafer og bevegelse endrer seg — dette er den beste måten å bygge intuisjon for kinematikk.
      </p>

      <KinematicsGraphs />
      <FreeFallSimulator />
    </div>
  );
}
