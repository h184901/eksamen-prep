"use client";

import { EnergyConservationVisualizer, BallThrowVisualizer } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-8">
        Utforsk energibevaring interaktivt. Juster parameterne og se umiddelbart hvordan
        kinetisk og potensiell energi bytter mellom hverandre — mens totalen forblir konstant.
        Dette er den beste måten å bygge intuisjon for energibevaring.
      </p>

      <EnergyConservationVisualizer />
      <BallThrowVisualizer />
    </div>
  );
}
