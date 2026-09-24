"use client";

import Egb339Markdown from "./Egb339Markdown";
import { useEgb339Lang, pickLang } from "@/lib/egb339-language/store";

interface Props {
  /** Authored Norwegian markdown. */
  no: string;
  /** English markdown; falls back to Norwegian when missing. */
  en?: string | null;
  headingOffset?: 0 | 1 | 2 | 3;
  studyLinks?: boolean;
}

/** Language-aware EGB339 markdown: picks the active language on the client. */
export default function Egb339LangMarkdown({ no, en, headingOffset = 0, studyLinks = false }: Props) {
  const { lang } = useEgb339Lang();
  return <Egb339Markdown content={pickLang(lang, no, en)} headingOffset={headingOffset} studyLinks={studyLinks} />;
}
