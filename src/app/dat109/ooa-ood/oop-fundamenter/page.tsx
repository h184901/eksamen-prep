"use client";

import PlaceholderPage from "@/components/dat109/PlaceholderPage";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ooaOodPages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function OopFundamenterPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.ooaOod} pages={ooaOodPages} />
      <PlaceholderPage
        breadcrumb={[
          { label: "Hjem", href: "/" },
          { label: "DAT109", href: "/dat109" },
          { label: "OOA og OOD", href: "/dat109/ooa-ood" },
          { label: "OOP-fundamenter" },
        ]}
        title="OOP-fundamenter — de 7 OO-egenskapene"
        description="Grady Boochs 7 hovedegenskaper for objekt-orientering, klasse vs objekt, og essensielle OOP-prinsipper. F16 har dedikerte slides for dette — og V2024 testet det direkte som flervalg."
        examWeight="Del av oppgave 2"
        badge="NY — testet i V2024"
        todoItems={[
          {
            label: "De 7 OO-egenskapene (Booch) — én seksjon hver",
            hint: "Abstraksjon, Innkapsling, Modularitet, Hierarki, Typing, Samtidighet, Persistens. Fra F16 slides 29–32 + slides 2–4. Hver med definisjon, eksempel fra Monopol/Stigespill, og hvordan det vises i Java-kode.",
          },
          {
            label: "Klasse vs objekt",
            hint: "V2024 spurte: 'En klasse beskriver en samling av objekter som har like egenskaper og atferd, mens et objekt er en spesifikk instans av en klasse.' Vis med diagram + Java-kode.",
          },
          {
            label: "Et objekt har ___ (state, behaviour, identity)",
            hint: "Direkte V2024-spørsmål. Forklar hver av de tre med eksempel.",
          },
          {
            label: "Essensielle prinsipper for OOP",
            hint: "V2024 spurte 'Which is NOT one of the essential principles?' Generalization er svaret (de essensielle er Abstraction, Encapsulation, Inheritance, Polymorphism). Forklar de fire essensielle.",
          },
          {
            label: "Abstraction-quiz: 'consider complex ideas while ignoring irrelevant detail'",
            hint: "V2024 testet definisjonen. Vis 2–3 alternative definisjoner (fra Sommerville og Booch) og hvorfor abstraksjon hjelper.",
          },
          {
            label: "Encapsulation-quiz: 'focus on what something does without considering how'",
            hint: "V2024 testet dette. Vis getter/setter, private felt, og kobling til SOLID OCP.",
          },
          {
            label: "Lenke til SOLID, GRASP og UML — vis sammenhengen",
            hint: "De 7 egenskapene er fundamentet — SOLID/GRASP er anvendelse på klassedesign.",
          },
          {
            label: "Mini-quiz med V2024-stil flervalg",
            hint: "Bygges i prompt 4. 5–8 spørsmål. Flytt evt. quiz-komponent til delt fil.",
          },
        ]}
        pensumKilder={[
          "F02 (UML-grunnlag) — synligheter, klasser, objekter",
          "F06 slide 70 + F16 slides 5, 29–32 + slides 2–4 (de 7 egenskapene)",
          "Eksamen V2024 oppgave 2 (alle flervalg om abstraksjon, encapsulation, klasse vs objekt, essensielle OOP-prinsipper)",
        ]}
        relatedLinks={[
          { label: "SOLID-prinsippene", href: "/dat109/ooa-ood/solid" },
          { label: "GRASP-mønstrene", href: "/dat109/ooa-ood/grasp" },
          { label: "UML-grunnlag", href: "/dat109/ooa-ood/uml" },
        ]}
      />
    </div>
  );
}
