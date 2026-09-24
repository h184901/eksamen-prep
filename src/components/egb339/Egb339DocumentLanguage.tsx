"use client";

import { useEffect } from "react";
import { useEgb339Lang } from "@/lib/egb339-language/store";

/** The EGB339 language preference must also control screen-reader pronunciation. */
export default function Egb339DocumentLanguage() {
  const { lang } = useEgb339Lang();

  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang === "en" ? "en" : "nb";
    return () => { document.documentElement.lang = previous; };
  }, [lang]);

  return null;
}
