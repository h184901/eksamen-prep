// Central entry point for the DAT110 language preference. Single source of
// truth — every language-aware component imports from here (or re-exports
// below), so no component rolls its own localStorage logic.
//
// The reactive store lives in ./useDat110Lang (useSyncExternalStore + a module
// listener set), which re-renders all subscribers immediately on change and
// also listens to the cross-tab `storage` event.

export type { Dat110Lang } from "./useDat110Lang";
export {
  useDat110Lang,
  readDat110Lang,
  // Imperative read for non-reactive call sites (e.g. building a request body).
  readDat110Lang as getDat110Lang,
  setDat110Lang,
} from "./useDat110Lang";

import type { Dat110Lang } from "./useDat110Lang";

// A string that may have an English variant. `en` absent → Norwegian is used.
export interface LocalizedString {
  no: string;
  en?: string;
}

// Pick the English text when in English mode and it exists; otherwise Norwegian.
// The Norwegian default is always returned unchanged, so callers can adopt this
// incrementally without affecting the default site.
export function localizedText(
  no: string,
  en: string | undefined,
  lang: Dat110Lang,
): string {
  return lang === "en" && en ? en : no;
}

export function localized(value: LocalizedString, lang: Dat110Lang): string {
  return lang === "en" && value.en ? value.en : value.no;
}
