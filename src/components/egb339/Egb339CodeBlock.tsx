"use client";

import { useEffect, useRef, useState } from "react";
import { highlightPython } from "@/lib/egb339-highlight-python";
import { useEgb339Lang } from "@/lib/egb339-language/store";

interface Props {
  code: string;
  language?: string;
}

function CopyButton({ code }: { code: string }) {
  const { lang } = useEgb339Lang();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard API unavailable (permissions) — select the text instead.
      const range = document.createRange();
      const pre = document.getElementById("egb-code-fallback");
      if (pre) { range.selectNodeContents(pre); window.getSelection()?.addRange(range); }
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };
  const label = copied ? (lang === "en" ? "Copied" : "Kopiert") : (lang === "en" ? "Copy" : "Kopier");
  return <button type="button" className="egb-code-copy" onClick={copy} aria-live="polite">
    {copied
      ? <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" /></svg>
      : <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" /><path d="M10.5 3.5v-1a1.5 1.5 0 00-1.5-1.5H4A1.5 1.5 0 002.5 2.5v5A1.5 1.5 0 004 9h1.5" /></svg>}
    {label}
  </button>;
}

/** Professional code block: dark container, language label, syntax highlighting, copy button. */
export default function Egb339CodeBlock({ code, language = "python" }: Props) {
  const tokens = language === "python" ? highlightPython(code) : [{ text: code, cls: null }];
  return <figure className="egb-code-block" data-language={language}>
    <div className="egb-code-header">
      <span className="egb-code-language">{language}</span>
      <CopyButton code={code} />
    </div>
    <pre className="egb-code-body" tabIndex={0}><code>{tokens.map((token, index) =>
      token.cls ? <span key={index} className={`egb-tok-${token.cls}`}>{token.text}</span> : <span key={index}>{token.text}</span>,
    )}</code></pre>
  </figure>;
}
