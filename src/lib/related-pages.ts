import type { PageContext, PageType } from "./page-context";

export interface RelatedSuggestion {
  label: string;
  prompt: string;
  kind: "cross-chapter" | "cross-page" | "subject-overview";
}

// ING164 – conceptual neighbors (undirected graph flattened)
const ing164Titles: Record<string, string> = {
  "2": "Rettlinjet bevegelse",
  "3": "2D- og 3D-bevegelse",
  "4": "Newtons lover",
  "5": "Anvendelse av Newtons lover",
  "6": "Arbeid og kinetisk energi",
  "7": "Potensiell energi og energibevaring",
  "8": "Bevegelsesmengde og kollisjoner",
  "9": "Rotasjon av stive legemer",
  "10": "Rotasjonsdynamikk",
  "21": "Elektrisk ladning og felt",
  "23": "Elektrisk potensial",
  "24": "Kondensatorer",
  "27": "Magnetfelt",
  "28": "Kilder til magnetfelt",
  "29": "Elektromagnetisk induksjon",
};

const ing164Links: Record<string, string[]> = {
  "2": ["3"],
  "3": ["2", "4"],
  "4": ["5", "3", "10"],
  "5": ["4", "6"],
  "6": ["7", "4"],
  "7": ["6", "8"],
  "8": ["7", "9"],
  "9": ["10", "8"],
  "10": ["9", "4"],
  "21": ["23"],
  "23": ["21", "24"],
  "24": ["23"],
  "27": ["28", "29"],
  "28": ["27", "29"],
  "29": ["27", "28", "24"],
};

const dat109Titles: Record<string, string> = {
  modellering: "Modellering (brukstilfeller, domene, sekvens)",
  "ooa-ood": "OOA/OOD (SOLID, GRASP)",
  utviklingsmetode: "Utviklingsmetode (Scrum, XP, TDD)",
  oop: "OOP i Java",
};

const dat109Links: Record<string, string[]> = {
  modellering: ["ooa-ood", "oop"],
  "ooa-ood": ["modellering", "oop"],
  utviklingsmetode: ["ooa-ood"],
  oop: ["ooa-ood", "modellering"],
};

const dat110Titles: Record<string, string> = {
  "cn-1": "Computer Networks – Introduksjon",
  "cn-2": "Applikasjonslaget",
  "cn-3": "Transportlaget",
  "cn-4": "Nettverkslaget",
  "cn-5": "Link-laget",
  "ds-1": "Distributed Systems – Grunnlag",
};

const dat110Links: Record<string, string[]> = {
  "cn-1": ["cn-2"],
  "cn-2": ["cn-1", "cn-3"],
  "cn-3": ["cn-2", "cn-4"],
  "cn-4": ["cn-3", "cn-5"],
  "cn-5": ["cn-4"],
  "ds-1": ["cn-2"],
};

function buildCrossChapter(
  ctx: PageContext,
  titles: Record<string, string>,
  links: Record<string, string[]>,
  slugPrefix: (id: string) => string,
): RelatedSuggestion[] {
  if (!ctx.chapterId) return [];
  const here = titles[ctx.chapterId];
  const neighbors = links[ctx.chapterId] ?? [];
  return neighbors.slice(0, 3).map((id) => ({
    kind: "cross-chapter",
    label: `Kobling til ${slugPrefix(id)}`,
    prompt: here
      ? `Hvordan henger "${here}" sammen med "${titles[id] ?? slugPrefix(id)}"? Vis konkrete koblinger og hva jeg bør overføre av intuisjon.`
      : `Forklar sammenhengen mellom temaet her og ${titles[id] ?? slugPrefix(id)}.`,
  }));
}

const pageTypeOrder: PageType[] = [
  "teori",
  "formler",
  "visualiseringer",
  "oppgaver",
  "eksamen",
];

function crossPageTypeSuggestions(ctx: PageContext): RelatedSuggestion[] {
  if (!ctx.chapterId) return [];
  const pairs: Array<[PageType, string]> = [
    ["teori", "teorien"],
    ["formler", "formlene"],
    ["visualiseringer", "visualiseringene"],
    ["oppgaver", "oppgavene"],
  ];
  const rest = pairs.filter(([pt]) => pt !== ctx.pageType && pageTypeOrder.includes(pt));
  return rest.slice(0, 2).map(([, word]) => ({
    kind: "cross-page",
    label: `Knytt til ${word}`,
    prompt: `Koble det vi ser her opp mot ${word} for samme kapittel. Hvilke formler/konsepter/oppgaver utdyper hverandre?`,
  }));
}

export function relatedSuggestions(ctx: PageContext): RelatedSuggestion[] {
  const out: RelatedSuggestion[] = [];
  if (ctx.subject === "ing164") {
    out.push(
      ...buildCrossChapter(ctx, ing164Titles, ing164Links, (id) => `kap ${id}`),
    );
  } else if (ctx.subject === "dat109") {
    out.push(
      ...buildCrossChapter(ctx, dat109Titles, dat109Links, (id) => id),
    );
  } else if (ctx.subject === "dat110") {
    out.push(
      ...buildCrossChapter(ctx, dat110Titles, dat110Links, (id) =>
        id.toUpperCase().replace("-", " "),
      ),
    );
  }
  out.push(...crossPageTypeSuggestions(ctx));
  return out;
}
