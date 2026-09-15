import Egb339Markdown from "../Egb339Markdown";

/** Presentation-only adaptation. The canonical topic and all mathematical text stay intact. */
export function studyTopicText(body: string) {
  return body.replace(/^## (Hvorfor det er viktig|Slik virker det)\s*$/gm, "")
    .replace(/^> \[!(tip|abstract)\] (Synthesis|Method inference|Path implication|Practical consequence|Mathematical completion|Derived from the source model)\s*$/gm, "> [!$1]")
    .replace(/^## In the EGB339 practicals\s*$/gm, "## Bruk i kurset")
    .replace(/^## Relatert innhold\s*$/gm, "## Videre koblinger");
}

export default function StudyTopicText({ body, children }: { body: string; children?: React.ReactNode }) {
  const split = body.search(/^## /m);
  const lead = split < 0 ? body : body.slice(0, split);
  const rest = split < 0 ? "" : body.slice(split);
  return <>
    <div className="egb-pilot-prose"><Egb339Markdown content={studyTopicText(lead)} headingOffset={1} studyLinks /></div>
    {children}
    {rest && <div className="egb-pilot-prose"><Egb339Markdown content={studyTopicText(rest)} headingOffset={1} studyLinks /></div>}
  </>;
}
