"use client";

import { TorqueCalculator, RollingWithoutSlipping, AngularMomentumVisualizer } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-8">
        Utforsk rotasjonsdynamikk interaktivt. Juster parameterne og se umiddelbart
        hvordan kraftmoment, rulling og angulært moment endrer seg — dette er den beste
        måten å bygge intuisjon for rotasjonsmekanikk.
      </p>

      <TorqueCalculator />
      <RollingWithoutSlipping />
      <AngularMomentumVisualizer />
    </div>
  );
}
