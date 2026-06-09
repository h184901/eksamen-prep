// Route gating for interne DAT102-lenker.
//
// Vault-sync pre-resolver wikilinks til /dat102/...-ruter. Lenker til ubygde
// ruter rendres som "kommer snart"-tekst — aldri som broken routes. Etter
// Phase 3 er hele den planlagte rute-strukturen live; gaten beholdes som
// sikkerhetsnett for framtidige ruter (f.eks. en eventuell AI-tutor).
//
// Phase 1: temaer, begreper, pensum, oppsummering.
// Phase 2: øving-hub + quiz/flashcards/matching/drills.
// Phase 3: eksamen-oversikt + gjengangere + eksamen/[slug] + oving/obliger.

// Prefiks-ruter med dynamiske barn (/[slug] eller undersider).
const LIVE_PREFIXES = [
  "/dat102/temaer",
  "/dat102/begreper",
  "/dat102/eksamen",
];

// Eksakte live-ruter.
const LIVE_EXACT = new Set([
  "/dat102",
  "/dat102/pensum",
  "/dat102/oppsummering",
  "/dat102/oving",
  "/dat102/oving/quiz",
  "/dat102/oving/flashcards",
  "/dat102/oving/matching",
  "/dat102/oving/drills",
  "/dat102/oving/obliger",
]);

export function isLiveDat102Href(href: string): boolean {
  if (!href.startsWith("/dat102")) return true; // andre fag/eksterne: ikke vårt ansvar å gate
  const path = href.split("#")[0].replace(/\/$/, "");
  if (LIVE_EXACT.has(path)) return true;
  return LIVE_PREFIXES.some((base) => path === base || path.startsWith(base + "/"));
}

export const COMING_SOON_TITLE =
  "Denne ruten er ikke bygget ennå";
