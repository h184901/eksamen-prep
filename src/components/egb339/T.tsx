"use client";

import { useEgb339Lang, pickLang, type Egb339Lang } from "@/lib/egb339-language/store";

/** Bilingual inline text: renders the active EGB339 language variant. */
export function T({ no, en }: { no: string; en?: string | null }) {
  const { lang } = useEgb339Lang();
  return <>{pickLang(lang, no, en)}</>;
}

/** Non-component helper for client components that already hold the lang. */
export function tp(lang: Egb339Lang, pair: { no: string; en?: string | null }): string {
  return pickLang(lang, pair.no, pair.en);
}
