"use client";

import { KraftDekomponering, TyngdeKalkulator, FrittLegemeDiagram } from "../visualizations";

export default function VisualiseringerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-2">Interaktive visualiseringer — Newtons lover</h2>
      <p className="text-[var(--muted)] mb-8">
        Utforsk krefter, kraftdekomponering og fritt-legeme-diagrammer interaktivt.
        Endre parametere med sliderne og se resultatene oppdateres i sanntid.
      </p>

      <KraftDekomponering />
      <TyngdeKalkulator />
      <FrittLegemeDiagram />
    </div>
  );
}
