export type Subject = "ing164" | "dat109" | "dat110" | "unknown";

export type PageType =
  | "teori"
  | "formler"
  | "oppgaver"
  | "visualiseringer"
  | "eksamen"
  | "oversikt"
  | "oppsummering"
  | "unknown";

export interface PageContext {
  subject: Subject;
  subjectLabel: string;
  chapterId: string | null;
  chapterSlug: string | null;
  pageType: PageType;
  pageTypeLabel: string;
  pathname: string;
}

const subjectLabels: Record<Subject, string> = {
  ing164: "ING164 Fysikk",
  dat109: "DAT109 Systemutvikling",
  dat110: "DAT110 Nettverksteknologi",
  unknown: "Ukjent fag",
};

const pageTypeLabels: Record<PageType, string> = {
  teori: "Teori",
  formler: "Formler",
  oppgaver: "Oppgaver",
  visualiseringer: "Visualiseringer",
  eksamen: "Eksamen",
  oversikt: "Oversikt",
  oppsummering: "Oppsummering",
  unknown: "Side",
};

export function parsePathname(pathname: string): PageContext {
  const parts = pathname.split("/").filter(Boolean);

  let subject: Subject = "unknown";
  if (parts[0] === "ing164") subject = "ing164";
  else if (parts[0] === "dat109") subject = "dat109";
  else if (parts[0] === "dat110") subject = "dat110";

  let chapterSlug: string | null = null;
  let chapterId: string | null = null;
  for (const p of parts) {
    const m = p.match(/^(kapittel|cn|ds)-(\w+)/i);
    if (m) {
      chapterSlug = p;
      chapterId = m[2];
      break;
    }
  }

  let pageType: PageType = "unknown";
  if (parts.includes("teori")) pageType = "teori";
  else if (parts.includes("formler")) pageType = "formler";
  else if (parts.includes("oppgaver")) pageType = "oppgaver";
  else if (parts.includes("visualiseringer")) pageType = "visualiseringer";
  else if (parts.includes("eksamen")) pageType = "eksamen";
  else if (parts.includes("oppsummering")) pageType = "oppsummering";
  else if (subject !== "unknown" && !chapterSlug) pageType = "oversikt";

  return {
    subject,
    subjectLabel: subjectLabels[subject],
    chapterId,
    chapterSlug,
    pageType,
    pageTypeLabel: pageTypeLabels[pageType],
    pathname,
  };
}

export function describeContext(ctx: PageContext): string {
  const bits: string[] = [ctx.subjectLabel];
  if (ctx.chapterId) {
    if (ctx.subject === "dat110" && ctx.chapterSlug) {
      bits.push(ctx.chapterSlug.toUpperCase().replace("-", " "));
    } else {
      bits.push(`Kapittel ${ctx.chapterId}`);
    }
  }
  if (ctx.pageType !== "unknown") bits.push(ctx.pageTypeLabel);
  return bits.join(" • ");
}
