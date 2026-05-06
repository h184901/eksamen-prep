"use client";

import PlaceholderPage from "@/components/dat109/PlaceholderPage";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { modelleringPages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function EksemplerPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.modellering} pages={modelleringPages} />
      <PlaceholderPage
        breadcrumb={[
          { label: "Hjem", href: "/" },
          { label: "DAT109", href: "/dat109" },
          { label: "Modellering", href: "/dat109/modellering" },
          { label: "Case-studier" },
        ]}
        title="Case-studier — komplette modeller"
        description="Komplette OOAD-eksempler der vi går gjennom brukstilfelle + domene + sekvens som en helhet — ett spill om gangen. Lager bro mellom de tre diagram-typene."
        examWeight="Del av oppgave 1"
        badge="NY"
        todoItems={[
          { label: "Monopol — komplett gjennomgang", hint: "Fra F03-F06: Use case → domene (med Rute-hierarki + Kopp som Pure Fabrication) → sekvens (spillTrekk)" },
          { label: "Stigespill — direkte koblet til Øvelse 1", hint: "Fra F08: 100 ruter, slanger, stiger, terning. Hvordan modellere det. Inkluder 'sekserregler' fra F08 iterasjon 2." },
          { label: "Max Mümmelmann (V2023) — beste eksamen-referanse", hint: "Atles løsningsforslag har komplett besvarelse — bruk dette som mal" },
          { label: "Eksamenssystem (H2020) — ikke et spill", hint: "Eneste eksamen som ikke er spill — vis at metoden funker for andre domener" },
          { label: "Skyjo (V2024) + Ganz Schön Clever (Kont 2023) — siste eksamener", hint: "Vis hvordan en skulle løse disse. Ingen offisiell fasit, men forventet løsning basert på mønster" },
          { label: "Bilutleie — koblet til Øvelse 2", hint: "Eneste 'forretningssystem' i pensum, kontrast til spill-domenet" },
        ]}
        pensumKilder={[
          "F03–F06 (Monopol-eksempel, 87 slides)",
          "F08 (Stigespill, 22 slides)",
          "Eksamen H2020, V2021, V2022, V2023, Kont 2023, V2024",
          "Øvelse 1 (Stigespill) og Øvelse 2 (Bilutleie)",
        ]}
        relatedLinks={[
          { label: "Brukstilfellemodell", href: "/dat109/modellering/brukstilfelle" },
          { label: "Domenemodell", href: "/dat109/modellering/domene" },
          { label: "Sekvensdiagram", href: "/dat109/modellering/sekvens" },
        ]}
      />
    </div>
  );
}
