"use client";

import { useEgb339Lang } from "@/lib/egb339-language/store";

/** Bilingual block: renders the English variant when active, Norwegian otherwise. */
export default function LangBlock({ no, en }: { no: React.ReactNode; en?: React.ReactNode }) {
  const { lang } = useEgb339Lang();
  return <>{lang === "en" && en != null ? en : no}</>;
}
