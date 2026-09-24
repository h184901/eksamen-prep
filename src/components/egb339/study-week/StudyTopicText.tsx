"use client";

import Egb339Markdown from "../Egb339Markdown";
import { useEgb339Lang } from "@/lib/egb339-language/store";

/** Presentation-only adaptation. The canonical topic and all mathematical text stay intact. */
export function studyTopicText(body: string, lang: "no" | "en" = "no") {
  if (lang === "en") {
    return body.replace(/^## (Why it matters|How it works)\s*$/gm, "")
      .replace(/^> \[!(tip|abstract)\] (Synthesis|Method inference|Path implication|Practical consequence|Mathematical completion|Derived from the source model)\s*$/gm, "> [!$1]")
      .replace(/^## In the EGB339 practicals\s*$/gm, "## Use in the course")
      .replace(/^## Related content\s*$/gm, "## Further connections");
  }
  return body.replace(/^## (Hvorfor det er viktig|Slik virker det)\s*$/gm, "")
    .replace(/^> \[!(tip|abstract)\] (Synthesis|Method inference|Path implication|Practical consequence|Mathematical completion|Derived from the source model)\s*$/gm, "> [!$1]")
    .replace(/^## In the EGB339 practicals\s*$/gm, "## Bruk i kurset")
    .replace(/^## Relatert innhold\s*$/gm, "## Videre koblinger");
}

export default function StudyTopicText({ no, en, children }: { no: string; en?: string | null; children?: React.ReactNode }) {
  const { lang } = useEgb339Lang();
  const body = lang === "en" && en ? en : no;
  const split = body.search(/^## /m);
  const lead = split < 0 ? body : body.slice(0, split);
  const rest = split < 0 ? "" : body.slice(split);
  return <>
    <div className="egb-pilot-prose"><Egb339Markdown content={studyTopicText(lead, lang)} headingOffset={1} studyLinks /></div>
    {children}
    {rest && <div className="egb-pilot-prose"><Egb339Markdown content={studyTopicText(rest, lang)} headingOffset={1} studyLinks /></div>}
  </>;
}
