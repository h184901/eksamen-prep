"use client";

import PlaceholderPage from "@/components/dat109/PlaceholderPage";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ooaOodPages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function UmlPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.ooaOod} pages={ooaOodPages} />
      <PlaceholderPage
        breadcrumb={[
          { label: "Hjem", href: "/" },
          { label: "DAT109", href: "/dat109" },
          { label: "OOA og OOD", href: "/dat109/ooa-ood" },
          { label: "UML-grunnlag" },
        ]}
        title="UML — grunnlag, formål og fordeler"
        description="Hva er UML, hvilke diagrammer finnes, hva viser hvert av dem, og hvorfor bruker vi UML i det hele tatt? V2024 testet flere av disse spørsmålene direkte."
        examWeight="Del av oppgave 2"
        badge="NY — testet i V2024"
        todoItems={[
          {
            label: "Hva er UML? Hvorfor finnes det?",
            hint: "Fra F02 — Unified Modeling Language, standardisert notasjon for å kommunisere systemdesign på tvers av team. Visuelt språk uavhengig av programmeringsspråk.",
          },
          {
            label: "Strukturelle vs atferdsmessige diagrammer",
            hint: "F02: Strukturelle (klasse-, pakke-, komponent-, utrullings-diagram). Atferd (aktivitets-, brukstilfelle-, tilstands-, sekvens-, kommunikasjons-diagram).",
          },
          {
            label: "Klassediagram — formål",
            hint: "V2024: 'Hva er formålet med et klassediagram?' Riktig svar: viser strukturen til et system og relaterte klasser.",
          },
          {
            label: "Sekvensdiagram — formål",
            hint: "V2024: 'Hva er formålet med et sekvensdiagram?' Riktig svar: viser hvordan objekter samhandler over tid.",
          },
          {
            label: "Brukstilfellediagram — formål",
            hint: "Modellerer funksjonelle krav fra brukers perspektiv. IKKE et flytdiagram!",
          },
          {
            label: "Aktivitetsdiagram — formål",
            hint: "Alternativ til tekstlig brukstilfellebeskrivelse. Aktiviteter (rektangler), valg (rhombus), start (sirkel), slutt (dobbelsirkel).",
          },
          {
            label: "Synligheter (+, -, #, ~)",
            hint: "I klassediagram. F02. Allerede dekket i /dat109/oop/uml-til-java men kort gjentakelse her.",
          },
          {
            label: "Fordeler ved UML — hvorfor bruke det?",
            hint: "V2024: 'Hvilke av følgende er en fordel?' Svar: enklere kommunikasjon mellom utviklere, bedre forståelse av systemets struktur, hjelp til å identifisere feil tidlig — alle de ovennevnte.",
          },
          {
            label: "Quiz med V2024-spørsmål",
            hint: "Bygges i prompt 4 — 5–7 spørsmål.",
          },
        ]}
        pensumKilder={[
          "F02 — UML.pptx (22 slides, dedikert hele forelesningen)",
          "Eksamen V2024 oppgave 2 (flervalg om sekvens-/klassediagram-formål, UML-fordeler)",
          "uml-diagrams.org (lenket fra semesterplan)",
        ]}
        relatedLinks={[
          { label: "Modellering — bruke UML i praksis", href: "/dat109/modellering" },
          { label: "OOP-fundamenter", href: "/dat109/ooa-ood/oop-fundamenter" },
          { label: "OOP — UML til Java", href: "/dat109/oop/uml-til-java" },
        ]}
      />
    </div>
  );
}
