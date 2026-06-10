// Studieplan-struktur for Dataingeniør, HVL Bergen.
// Kilde: HVL Dataingeniør utdanningsplan 2024h.
// Semesterplassering følger planen — ikke gjett eller endre plasseringer.
// Fagnavn vises på bokmål i UI selv om kilden (HVL-planen) er på nynorsk.
//
// `href: null` betyr at faget ennå ikke har en egen side på nettstedet og
// vises som "Kommer senere" (ingen lenke → ingen 404). Fag med `href` er
// aktive og lenker til sin egen rute.

export type SubjectColor =
  | "dat102"
  | "dat107"
  | "sysdev"
  | "network"
  | "physics"
  | "neutral";

export type SubjectStatus = "active" | "building" | "later";

export interface PlanSubject {
  code: string;
  /** Kort navn. Utelatt der vi ikke kjenner offisiell tittel (vises som kun kode). */
  name?: string;
  href: string | null;
  status: SubjectStatus;
  color: SubjectColor;
  /** Innholds-/tema-tags (ikke lenker) — kun for aktive fag. */
  chips?: string[];
}

export interface PlanSemester {
  id: string;
  label: string;
  /** Kompakt fritekst i stedet for fagkort (brukt for semester 5/6). */
  note?: string;
  subjects: PlanSubject[];
}

export interface PlanYear {
  label: string;
  semesters: PlanSemester[];
}

export const studyPlan: PlanYear[] = [
  {
    label: "1. år",
    semesters: [
      {
        id: "s1",
        label: "Semester 1",
        subjects: [
          { code: "DAT100", name: "Grunnleggende programmering", href: null, status: "later", color: "neutral" },
          { code: "DAT111", name: "Introduksjon til programvareutvikling", href: null, status: "later", color: "neutral" },
          { code: "ING100", name: "Ingeniørfaglig innføringsemne", href: null, status: "later", color: "neutral" },
          { code: "MAT101", name: "Diskret matematikk 1", href: null, status: "later", color: "neutral" },
        ],
      },
      {
        id: "s2",
        label: "Semester 2",
        subjects: [
          {
            code: "DAT102",
            name: "Algoritmer og datastrukturer",
            href: "/dat102",
            status: "active",
            color: "dat102",
            chips: ["Temaer", "Begreper", "Øving", "Eksamen"],
          },
          {
            code: "DAT107",
            name: "Databaser",
            href: "/dat107",
            status: "active",
            color: "dat107",
            chips: ["SQL", "Modellering", "NoSQL"],
          },
          { code: "MAT110", name: "Matematikk 1", href: null, status: "later", color: "neutral" },
        ],
      },
    ],
  },
  {
    label: "2. år",
    semesters: [
      {
        id: "s3",
        label: "Semester 3",
        subjects: [
          { code: "DAT103", name: "Datamaskiner og operativsystem", href: null, status: "later", color: "neutral" },
          { code: "DAT108", name: "Programmering og webapplikasjoner", href: null, status: "later", color: "neutral" },
          { code: "MAT122", name: "Statistikk for ingeniører", href: null, status: "later", color: "neutral" },
          { code: "MAT210", name: "Videregående diskret matematikk", href: null, status: "later", color: "neutral" },
        ],
      },
      {
        id: "s4",
        label: "Semester 4",
        subjects: [
          {
            code: "DAT109",
            name: "Systemutvikling",
            href: "/dat109",
            status: "active",
            color: "sysdev",
            chips: ["Modellering", "Øving", "Eksamen"],
          },
          {
            code: "DAT110",
            name: "Distribuerte systemer og nettverksteknologi",
            href: "/dat110",
            status: "active",
            color: "network",
            chips: ["Begreper", "Øving", "Eksamen", "Gjengangere"],
          },
          {
            code: "ING164",
            name: "Mekanikk, elektrisitet og kjemi",
            href: "/ing164",
            status: "active",
            color: "physics",
            chips: ["Formelark", "Kapitler", "Eksamen"],
          },
        ],
      },
    ],
  },
  {
    label: "3. år",
    semesters: [
      {
        id: "s5",
        label: "Semester 5",
        note: "Bacheloroppgave (DAT191), ING303 og spesialisering / valgemne.",
        subjects: [],
      },
      {
        id: "s6",
        label: "Semester 6",
        note: "Spesialisering / valgemne.",
        subjects: [],
      },
    ],
  },
];
