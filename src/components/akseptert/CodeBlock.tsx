"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  highlight?: number[];
}

const langAccent: Record<string, string> = {
  tsx: "text-akseptert-300",
  ts: "text-akseptert-300",
  typescript: "text-akseptert-300",
  jsx: "text-cyan-300",
  js: "text-yellow-300",
  javascript: "text-yellow-300",
  html: "text-orange-300",
  css: "text-pink-300",
  java: "text-orange-300",
  json: "text-teal-300",
  bash: "text-neutral-300",
  sh: "text-neutral-300",
};

export default function CodeBlock({
  code,
  language = "tsx",
  title,
  highlight = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const accent = langAccent[language.toLowerCase()] ?? "text-akseptert-300";
  const lines = code.replace(/\n$/, "").split("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative rounded-lg border border-akseptert-500/20 bg-neutral-950 text-neutral-100 overflow-hidden my-3">
      <div
        className={`flex items-center justify-between px-4 py-1.5 bg-neutral-900 border-b border-neutral-800 text-xs font-mono ${accent}`}
      >
        <span>{title ?? language}</span>
        <button
          type="button"
          onClick={copy}
          className="text-[11px] text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          {copied ? "Kopiert ✓" : "Kopier"}
        </button>
      </div>
      <pre className="px-0 py-3 overflow-x-auto text-[13px] leading-relaxed">
        <code className="block">
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const isHl = highlight.includes(lineNum);
            return (
              <span
                key={i}
                className={`flex ${
                  isHl ? "bg-akseptert-500/10 border-l-2 border-akseptert-400" : ""
                }`}
              >
                <span className="inline-block w-10 text-right pr-3 text-neutral-600 select-none shrink-0">
                  {lineNum}
                </span>
                <span className="pr-4">{line === "" ? " " : line}</span>
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
