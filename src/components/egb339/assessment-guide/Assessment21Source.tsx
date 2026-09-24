"use client";

import { useEffect, useState } from "react";
import { readEgb339Lang, useEgb339Lang } from "@/lib/egb339-language/store";
import AssessmentGuideClient from "./AssessmentGuideClient";

const sourceSections = new Set([
  "execution", "derivation", "overview", "syllabus", "interactive", "math",
  "motion", "code", "oral", "demo", "word-guide",
]);

/** Preserve the original teaching guide without presenting its Norwegian copy as English. */
export default function Assessment21Source({ html }: { html: string }) {
  const { lang } = useEgb339Lang();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // The server snapshot is Norwegian. Wait until it agrees with the stored
  // preference so an English reload never starts the 1.4 MB Norwegian guide.
  useEffect(() => { setReady(lang === readEgb339Lang()); }, [lang]);

  useEffect(() => {
    const reveal = () => {
      let hash = window.location.hash.slice(1);
      try { hash = decodeURIComponent(hash); } catch { /* Treat malformed hashes literally. */ }
      if (sourceSections.has(hash) || /^word-chapter-\d+$/.test(hash)) setOpen(true);
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [lang]);

  return <section id="original-guide" data-egb-week-section className="egb-guide-source">
    {lang === "en" && <>
      <h2>Original Norwegian interactive guide</h2>
      <p>The original simulation trace and Word chapters are available in Norwegian. For an English explanation, use the assessment requirements and worked solutions below.</p>
      <button type="button" className="egb-pilot-button" aria-expanded={open} aria-controls="egb-guide-original" onClick={() => setOpen(value => !value)}>
        {open ? "Hide original guide" : "Open original guide"}
      </button>
    </>}
    <div id="egb-guide-original" lang="nb" hidden={lang === "en" && !open}>
      {ready && (lang === "no" || open) && <AssessmentGuideClient html={html} />}
    </div>
    <noscript><p>Slå på JavaScript for den interaktive guiden, eller last ned Word-guiden over.</p></noscript>
  </section>;
}
