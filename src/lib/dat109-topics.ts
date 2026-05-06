export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  weight: string;
  icon: string;
  sectionCount: number;
}

export const topics: Topic[] = [
  {
    id: "modellering",
    slug: "modellering",
    title: "Modellering",
    description:
      "Brukstilfelle, domenemodell og sekvensdiagram — den viktigste delen av eksamen. Inkluderer komplette case-studier av spillene fra eksamen.",
    weight: "~40%",
    icon: "diagram",
    sectionCount: 5,
  },
  {
    id: "ooa-ood",
    slug: "ooa-ood",
    title: "OOA og OOD",
    description:
      "SOLID, GRASP, OOP-fundamenter (de 7 OO-egenskapene), UML-grunnlag og utformingsprinsipper. Direkte koblet til oppgave 2 — fra V2024 også grunnleggende OOP.",
    weight: "~20%",
    icon: "layers",
    sectionCount: 6,
  },
  {
    id: "utviklingsmetode",
    slug: "utviklingsmetode",
    title: "Utviklingsmetode",
    description:
      "Scrum, XP, TDD, CI/CD, DevOps, AUP, Kanban og software arkitektur. Hvert tema har sin egen underside.",
    weight: "~20%",
    icon: "cycle",
    sectionCount: 9,
  },
  {
    id: "oop",
    slug: "oop",
    title: "OOP — Java fra UML",
    description:
      "Skriv Java-klasser fra klassediagram og implementer metoder fra sekvensdiagram. Komplette løsningsforslag for alle eksamener 2020–2024.",
    weight: "~20%",
    icon: "code",
    sectionCount: 5,
  },
  {
    id: "oppsummering",
    slug: "oppsummering",
    title: "Oppsummering",
    description:
      "Komplett sammendrag av alle konsepter, sjekklister og hurtigreferanse",
    weight: "",
    icon: "clipboard",
    sectionCount: 0,
  },
  {
    id: "eksamen",
    slug: "eksamen",
    title: "Eksamen",
    description:
      "Alle tidligere eksamener (2020–2024) sortert etter oppgavetype, med fullstendige løsningsforslag",
    weight: "",
    icon: "target",
    sectionCount: 0,
  },
  {
    id: "oving",
    slug: "oving",
    title: "Øving og drilling",
    description:
      "Aktiv læring: flervalg-quiz, eksamenssimulering med tidtaker, flashcards og matching-øvelser. Drillet fra V2023+V2024.",
    weight: "",
    icon: "target",
    sectionCount: 0,
  },
];
