import React from "react";
import { DocumentVsRelationalDiagram } from "@/components/dat107/DocumentVsRelationalDiagram";
import { ERCardinalityDiagram } from "@/components/dat107/ERCardinalityDiagram";
import { JPARelationshipDiagram } from "@/components/dat107/JPARelationshipDiagram";
import { SQLJoinDiagram } from "@/components/dat107/SQLJoinDiagram";

type CalloutKind =
  | "info"
  | "viktig"
  | "felle"
  | "tips"
  | "eksempel"
  | "oppsummering"
  | "kjernen";

type VisualComponentName =
  | "document-vs-relational-diagram"
  | "er-cardinality-diagram"
  | "jpa-relationship-diagram"
  | "sql-join-diagram";

type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; body: string }
  | { type: "image"; alt: string; src: string; title?: string }
  | { type: "component"; name: VisualComponentName }
  | { type: "hr" }
  | { type: "quote"; lines: string[] }
  | { type: "callout"; kind: CalloutKind; title?: string; blocks: Block[] }
  | { type: "table"; head: string[]; rows: string[][] };

function isTableSeparator(line: string): boolean {
  const s = line.trim();
  if (!s.includes("|")) return false;
  for (let j = 0; j < s.length; j++) {
    const c = s.charCodeAt(j);
    const isDash = c === 45;
    const isColon = c === 58;
    const isPipe = c === 124;
    const isSpace = c === 32 || c === 9;
    if (!isDash && !isColon && !isPipe && !isSpace) return false;
  }
  return s.includes("-");
}

function parse(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  return parseLines(lines, 0, lines.length).blocks;
}

function parseImageLine(
  line: string,
): { alt: string; src: string; title?: string } | null {
  const m = line.trim().match(/^!\[([^\]]*)\]\((.+)\)$/);
  if (!m) return null;

  const alt = m[1].trim();
  const target = m[2].trim();
  const titleMatch = target.match(/^(\S+)\s+["']([^"']+)["']$/);

  if (titleMatch) {
    return {
      alt,
      src: titleMatch[1],
      title: titleMatch[2].trim(),
    };
  }

  return { alt, src: target };
}

function parseComponentLine(line: string): VisualComponentName | null {
  const normalized = line.trim().toLowerCase();
  if (normalized === "::document-vs-relational-diagram::") {
    return "document-vs-relational-diagram";
  }
  if (normalized === "::er-cardinality-diagram::") {
    return "er-cardinality-diagram";
  }
  if (normalized === "::jpa-relationship-diagram::") {
    return "jpa-relationship-diagram";
  }
  if (normalized === "::sql-join-diagram::") {
    return "sql-join-diagram";
  }
  return null;
}

function parseLines(
  lines: string[],
  start: number,
  end: number,
): { blocks: Block[] } {
  const blocks: Block[] = [];
  let i = start;

  while (i < end) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const body: string[] = [];
      i++;
      while (i < end && !lines[i].startsWith("```")) {
        body.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: "code", lang, body: body.join("\n") });
      continue;
    }

    if (/^>\s?/.test(line)) {
      const qLines: string[] = [];
      while (i < end && /^>\s?/.test(lines[i])) {
        qLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      const alertMatch = qLines[0]?.match(
        /^\[!(VIKTIG|FELLE|TIPS|EKSEMPEL|OPPSUMMERING|INFO|KJERNEN)\]\s*(.*)$/i,
      );
      if (alertMatch) {
        const kind = alertMatch[1].toLowerCase() as CalloutKind;
        const titleLine = alertMatch[2].trim();
        const rest = qLines.slice(1);
        const inner = parseLines(rest, 0, rest.length).blocks;
        blocks.push({
          type: "callout",
          kind,
          title: titleLine || undefined,
          blocks: inner,
        });
      } else {
        blocks.push({ type: "quote", lines: qLines });
      }
      continue;
    }

    const image = parseImageLine(line);
    if (image) {
      blocks.push({ type: "image", ...image });
      i++;
      continue;
    }

    const component = parseComponentLine(line);
    if (component) {
      blocks.push({ type: "component", name: component });
      i++;
      continue;
    }

    if (/^#{1,3}\s/.test(line)) {
      const m = line.match(/^(#{1,3})\s+(.*)$/);
      if (m) {
        const level = m[1].length as 1 | 2 | 3;
        const text = m[2].trim();
        blocks.push({ type: `h${level}` as "h1" | "h2" | "h3", text });
      }
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < end && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (i < end && /^\s*\d+[.)]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+[.)]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (
      line.includes("|") &&
      i + 1 < end &&
      isTableSeparator(lines[i + 1])
    ) {
      const head = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < end && lines[i].includes("|") && lines[i].trim() !== "") {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", head, rows });
      continue;
    }

    const paraLines: string[] = [line];
    i++;
    while (
      i < end &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("```") &&
      !/^#{1,3}\s/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+[.)]\s+/.test(lines[i]) &&
      !parseImageLine(lines[i]) &&
      !parseComponentLine(lines[i]) &&
      !/^>\s?/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: paraLines.join(" ") });
  }

  return { blocks };
}

function splitRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);

  const cells: string[] = [];
  let current = "";
  let inCode = false;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const prev = i > 0 ? s[i - 1] : "";

    if (char === "`" && prev !== "\\") {
      inCode = !inCode;
      current += char;
      continue;
    }

    if (char === "\\" && s[i + 1] === "|") {
      current += "|";
      i++;
      continue;
    }

    if (char === "|" && !inCode) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text.replace(/  $/, "");
  let idx = 0;

  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/;
  while (remaining.length > 0) {
    const m = remaining.match(regex);
    if (!m || m.index === undefined) {
      nodes.push(remaining);
      break;
    }
    if (m.index > 0) {
      nodes.push(remaining.slice(0, m.index));
    }
    const token = m[0];
    const key = `${keyPrefix}-${idx++}`;
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold text-[var(--foreground)]">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-dat107-500/10 text-dat107-700 dark:text-dat107-300 text-[0.9em] font-mono"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(
        <em key={key} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    }
    remaining = remaining.slice(m.index + token.length);
  }

  return nodes;
}

const sectionCalloutMap: Array<{ pattern: RegExp; kind: CalloutKind }> = [
  { pattern: /^kjernen$/i, kind: "kjernen" },
  { pattern: /^dette må du kunne$/i, kind: "viktig" },
  { pattern: /^vanlige feil$/i, kind: "felle" },
  { pattern: /^vanligste feil(e|er|ene)?$/i, kind: "felle" },
  { pattern: /^felle(r)?$/i, kind: "felle" },
  { pattern: /^typiske eksamensoppgaver$/i, kind: "eksempel" },
  { pattern: /^typisk eksamensoppgave$/i, kind: "eksempel" },
  { pattern: /^hva du bør øve på$/i, kind: "tips" },
  { pattern: /^oppsummering$/i, kind: "oppsummering" },
  { pattern: /^tips$/i, kind: "tips" },
  { pattern: /^viktig$/i, kind: "viktig" },
];

function detectSectionCallout(h2Text: string): CalloutKind | null {
  for (const { pattern, kind } of sectionCalloutMap) {
    if (pattern.test(h2Text.trim())) return kind;
  }
  return null;
}

const calloutStyles: Record<
  CalloutKind,
  { wrap: string; title: string; icon: React.ReactNode }
> = {
  info: {
    wrap: "border-sky-300/60 bg-sky-50/70 dark:border-sky-700/50 dark:bg-sky-950/30",
    title: "text-sky-700 dark:text-sky-300",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01M11 12h1v4h1" />
      </svg>
    ),
  },
  viktig: {
    wrap: "border-dat107-400/60 bg-dat107-50 dark:border-dat107-500/50 dark:bg-dat107-950/40",
    title: "text-dat107-700 dark:text-dat107-300",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  felle: {
    wrap: "border-red-300/60 bg-red-50/70 dark:border-red-700/50 dark:bg-red-950/30",
    title: "text-red-700 dark:text-red-300",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  tips: {
    wrap: "border-emerald-300/60 bg-emerald-50/70 dark:border-emerald-700/50 dark:bg-emerald-950/30",
    title: "text-emerald-700 dark:text-emerald-300",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  eksempel: {
    wrap: "border-amber-300/60 bg-amber-50/70 dark:border-amber-700/50 dark:bg-amber-950/30",
    title: "text-amber-700 dark:text-amber-300",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  oppsummering: {
    wrap: "border-fuchsia-300/60 bg-fuchsia-50/70 dark:border-fuchsia-700/50 dark:bg-fuchsia-950/30",
    title: "text-fuchsia-700 dark:text-fuchsia-300",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
  },
  kjernen: {
    wrap: "border-dat107-400/50 bg-gradient-to-br from-dat107-50 to-fuchsia-50 dark:from-dat107-950/50 dark:to-fuchsia-950/30 dark:border-dat107-500/40",
    title: "text-dat107-700 dark:text-dat107-300",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

const langAccent: Record<string, string> = {
  sql: "text-sky-300",
  java: "text-orange-300",
  xml: "text-emerald-300",
  json: "text-teal-300",
  bash: "text-neutral-300",
  sh: "text-neutral-300",
  text: "text-neutral-400",
};

function renderBlock(block: Block, bi: number, keyPrefix = ""): React.ReactNode {
  const key = `${keyPrefix}${bi}`;
  switch (block.type) {
    case "h1":
      return (
        <h1
          key={key}
          className="text-3xl font-bold mt-2 mb-4 pb-3 border-b border-[var(--card-border)]"
        >
          {renderInline(block.text, `h1-${key}`)}
        </h1>
      );
    case "h2":
      return (
        <h2
          key={key}
          className="text-2xl font-bold mt-8 mb-3 text-dat107-700 dark:text-dat107-300"
        >
          {renderInline(block.text, `h2-${key}`)}
        </h2>
      );
    case "h3":
      return (
        <h3 key={key} className="text-xl font-semibold mt-6 mb-2">
          {renderInline(block.text, `h3-${key}`)}
        </h3>
      );
    case "p":
      return (
        <p
          key={key}
          className="leading-relaxed text-[var(--foreground)]/90"
        >
          {renderInline(block.text, `p-${key}`)}
        </p>
      );
    case "ul":
      return (
        <ul
          key={key}
          className="list-disc pl-6 space-y-1.5 marker:text-dat107-500"
        >
          {block.items.map((it, ii) => (
            <li key={ii} className="leading-relaxed">
              {renderInline(it, `li-${key}-${ii}`)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={key}
          className="list-decimal pl-6 space-y-1.5 marker:text-dat107-500 marker:font-semibold"
        >
          {block.items.map((it, ii) => (
            <li key={ii} className="leading-relaxed">
              {renderInline(it, `li-${key}-${ii}`)}
            </li>
          ))}
        </ol>
      );
    case "code": {
      const accent = langAccent[block.lang.toLowerCase()] ?? "text-dat107-300";
      return (
        <div
          key={key}
          className="relative rounded-lg border border-dat107-500/20 bg-neutral-950 text-neutral-100 overflow-hidden"
        >
          {block.lang && (
            <div
              className={`flex items-center justify-between px-4 py-1.5 bg-neutral-900 border-b border-neutral-800 text-xs font-mono ${accent}`}
            >
              <span>{block.lang}</span>
            </div>
          )}
          <pre className="px-4 py-3 overflow-x-auto text-sm leading-relaxed">
            <code>{block.body}</code>
          </pre>
        </div>
      );
    }
    case "image": {
      const caption = block.title ?? block.alt;
      return (
        <figure key={key} className="my-6">
          <div className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-white shadow-sm dark:bg-neutral-950">
            <img
              src={block.src}
              alt={block.alt}
              title={block.title}
              loading="lazy"
              className="block h-auto w-full object-contain"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-xs leading-relaxed text-[var(--muted)]">
              {renderInline(caption, `figcaption-${key}`)}
            </figcaption>
          )}
        </figure>
      );
    }
    case "component":
      if (block.name === "document-vs-relational-diagram") {
        return <DocumentVsRelationalDiagram key={key} />;
      }
      if (block.name === "er-cardinality-diagram") {
        return <ERCardinalityDiagram key={key} />;
      }
      if (block.name === "jpa-relationship-diagram") {
        return <JPARelationshipDiagram key={key} />;
      }
      if (block.name === "sql-join-diagram") {
        return <SQLJoinDiagram key={key} />;
      }
      return null;
    case "hr":
      return <hr key={key} className="border-[var(--card-border)]" />;
    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-dat107-500/60 bg-dat107-500/5 pl-4 pr-3 py-2 rounded-r italic text-[var(--foreground)]/85"
        >
          {block.lines.map((ln, li) => (
            <p key={li} className="leading-relaxed">
              {renderInline(ln, `q-${key}-${li}`)}
            </p>
          ))}
        </blockquote>
      );
    case "callout": {
      const s = calloutStyles[block.kind];
      return (
        <div
          key={key}
          className={`rounded-xl border-2 ${s.wrap} p-5`}
        >
          {block.title && (
            <div className={`flex items-center gap-2 mb-2 ${s.title}`}>
              {s.icon}
              <h4 className="font-bold text-sm uppercase tracking-wide">
                {renderInline(block.title, `c-title-${key}`)}
              </h4>
            </div>
          )}
          <div className="space-y-3">
            {block.blocks.map((b, i) => renderBlock(b, i, `c-${key}-`))}
          </div>
        </div>
      );
    }
    case "table":
      return (
        <div
          key={key}
          className="overflow-x-auto rounded-lg border border-[var(--card-border)]"
        >
          <table className="min-w-full text-sm">
            <thead className="bg-dat107-500/10">
              <tr>
                {block.head.map((h, hi) => (
                  <th
                    key={hi}
                    className="px-3 py-2 text-left font-semibold text-dat107-700 dark:text-dat107-300"
                  >
                    {renderInline(h, `th-${key}-${hi}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-t border-[var(--card-border)] even:bg-[var(--card)]/50"
                >
                  {row.map((c, ci) => (
                    <td key={ci} className="px-3 py-2 align-top">
                      {renderInline(c, `td-${key}-${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function groupIntoSections(blocks: Block[]): Block[] {
  const out: Block[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.type === "h2") {
      const kind = detectSectionCallout(b.text);
      if (kind) {
        const inner: Block[] = [];
        i++;
        while (i < blocks.length && blocks[i].type !== "h2" && blocks[i].type !== "h1") {
          inner.push(blocks[i]);
          i++;
        }
        out.push({ type: "callout", kind, title: b.text, blocks: inner });
        continue;
      }
    }
    out.push(b);
    i++;
  }
  return out;
}

export default function Markdown({ content }: { content: string }) {
  const raw = parse(content);
  const blocks = groupIntoSections(raw);

  return (
    <div className="space-y-4 text-[var(--foreground)]">
      {blocks.map((block, bi) => renderBlock(block, bi))}
    </div>
  );
}
