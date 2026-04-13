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
      "Brukstilfellemodell, domenemodell og sekvensdiagram — den viktigste delen av eksamen",
    weight: "~40%",
    icon: "diagram",
    sectionCount: 4,
  },
  {
    id: "ooa-ood",
    slug: "ooa-ood",
    title: "OOA og OOD",
    description:
      "SOLID-prinsippene og GRASP-mønstrene — gjenkjenn dem i kode og UML",
    weight: "~20%",
    icon: "layers",
    sectionCount: 4,
  },
  {
    id: "utviklingsmetode",
    slug: "utviklingsmetode",
    title: "Utviklingsmetode",
    description:
      "Scrum, XP, TDD, CI/CD, AUP og smidig utvikling",
    weight: "~20%",
    icon: "cycle",
    sectionCount: 4,
  },
  {
    id: "oop",
    slug: "oop",
    title: "OOP — Java fra UML",
    description:
      "Skriv Java-klasser fra klassediagram og sekvensdiagram",
    weight: "~20%",
    icon: "code",
    sectionCount: 4,
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
      "Alle tidligere eksamener (2020–2024) med fullstendige løsningsforslag",
    weight: "",
    icon: "target",
    sectionCount: 0,
  },
];
