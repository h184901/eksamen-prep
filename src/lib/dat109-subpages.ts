import type { SubPage } from "@/components/dat109/DAT109SubNav";

/**
 * Definerer undersider for hver DAT109-hovedside.
 * SubNav-komponenten og oversiktssidene bruker disse listene som single source of truth.
 *
 * `segment: ""` betyr oversiktssiden (basePath uten suffix).
 * `badge: "NY"` markerer sider som er nye etter eksamen vår 2024-analyse.
 */

export const modelleringPages: SubPage[] = [
  { segment: "", label: "Oversikt" },
  { segment: "brukstilfelle", label: "Brukstilfelle" },
  { segment: "domene", label: "Domenemodell" },
  { segment: "sekvens", label: "Sekvensdiagram" },
  { segment: "eksempler", label: "Case-studier", badge: "NY" },
  { segment: "sjekkliste", label: "Sjekkliste" },
];

export const ooaOodPages: SubPage[] = [
  { segment: "", label: "Oversikt" },
  { segment: "oop-fundamenter", label: "OOP-fundamenter", badge: "NY" },
  { segment: "uml", label: "UML-grunnlag", badge: "NY" },
  { segment: "solid", label: "SOLID" },
  { segment: "grasp", label: "GRASP" },
  { segment: "utformingsprinsipper", label: "Utformingsprinsipper", badge: "NY" },
  { segment: "eksamen", label: "Eksamendrilling" },
];

export const utviklingsmetodePages: SubPage[] = [
  { segment: "", label: "Oversikt" },
  { segment: "smidig-grunnlag", label: "Smidig grunnlag" },
  { segment: "scrum", label: "Scrum" },
  { segment: "xp", label: "XP" },
  { segment: "tdd", label: "TDD" },
  { segment: "ci-cd-devops", label: "CI/CD og DevOps" },
  { segment: "aup", label: "AUP" },
  { segment: "arkitektur", label: "Arkitektur", badge: "NY" },
  { segment: "kanban", label: "Kanban vs Scrum" },
  { segment: "eksamen", label: "Eksamendrilling" },
];

export const oopPages: SubPage[] = [
  { segment: "", label: "Oversikt" },
  { segment: "uml-til-java", label: "UML → Java" },
  { segment: "assosiasjoner", label: "Assosiasjoner" },
  { segment: "sekvens-til-metode", label: "Sekvens → metode" },
  { segment: "eksamensoppgaver", label: "Eksamensoppgaver" },
  { segment: "oppskrift", label: "Oppskrift og maler" },
];

export const eksamenPages: SubPage[] = [
  { segment: "", label: "Oversikt" },
  { segment: "oppgave-1-modellering", label: "Oppg 1 — Modellering" },
  { segment: "oppgave-2-ooa-ood", label: "Oppg 2 — OOA/OOD" },
  { segment: "oppgave-3-utviklingsmetode", label: "Oppg 3 — Utviklingsmetode" },
  { segment: "oppgave-4-oop", label: "Oppg 4 — OOP" },
];

/** Base-paths brukes av SubNav i hver underside */
export const dat109BasePaths = {
  modellering: "/dat109/modellering",
  ooaOod: "/dat109/ooa-ood",
  utviklingsmetode: "/dat109/utviklingsmetode",
  oop: "/dat109/oop",
  eksamen: "/dat109/eksamen",
} as const;
