"use client";

import { SkraplanSimulator, FriksjonVisualiser, SirkelbevegelsSimulator } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-2">Interaktive visualiseringer</h2>
      <p className="text-[var(--muted)] mb-6">
        Juster parameterne og se kreftene oppdatere seg i sanntid. Bruk disse simulatorene
        aktivt mens du leser teorien — forståelsen sitter bedre når du kan utforske selv.
      </p>

      <SkraplanSimulator />
      <FriksjonVisualiser />
      <SirkelbevegelsSimulator />
    </div>
  );
}
