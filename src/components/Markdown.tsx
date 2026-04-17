import React from "react";

type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; body: string }
  | { type: "hr" }
  | { type: "table"; head: string[]; rows: string[][] };

function parse(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        body.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: "code", lang, body: body.join("\n") });
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
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+[.)]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && /^\s*\|?\s*[-:|\s]+\|[-:|\s]+/.test(lines[i + 1])) {
      const head = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", head, rows });
      continue;
    }

    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("```") &&
      !/^#{1,3}\s/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+[.)]\s+/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: paraLines.join(" ") });
  }

  return blocks;
}

function splitRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((c) => c.trim());
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

export default function Markdown({ content }: { content: string }) {
  const blocks = parse(content);

  return (
    <div className="space-y-4 text-[var(--foreground)]">
      {blocks.map((block, bi) => {
        switch (block.type) {
          case "h1":
            return (
              <h1 key={bi} className="text-3xl font-bold mt-2 mb-4 pb-3 border-b border-[var(--card-border)]">
                {renderInline(block.text, `h1-${bi}`)}
              </h1>
            );
          case "h2":
            return (
              <h2
                key={bi}
                className="text-2xl font-bold mt-8 mb-3 text-dat107-700 dark:text-dat107-300"
              >
                {renderInline(block.text, `h2-${bi}`)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={bi} className="text-xl font-semibold mt-6 mb-2">
                {renderInline(block.text, `h3-${bi}`)}
              </h3>
            );
          case "p":
            return (
              <p key={bi} className="leading-relaxed text-[var(--foreground)]/90">
                {renderInline(block.text, `p-${bi}`)}
              </p>
            );
          case "ul":
            return (
              <ul key={bi} className="list-disc pl-6 space-y-1.5 marker:text-dat107-500">
                {block.items.map((it, ii) => (
                  <li key={ii} className="leading-relaxed">
                    {renderInline(it, `li-${bi}-${ii}`)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={bi} className="list-decimal pl-6 space-y-1.5 marker:text-dat107-500 marker:font-semibold">
                {block.items.map((it, ii) => (
                  <li key={ii} className="leading-relaxed">
                    {renderInline(it, `li-${bi}-${ii}`)}
                  </li>
                ))}
              </ol>
            );
          case "code":
            return (
              <div
                key={bi}
                className="relative rounded-lg border border-dat107-500/20 bg-neutral-950 text-neutral-100 overflow-hidden"
              >
                {block.lang && (
                  <div className="flex items-center justify-between px-4 py-1.5 bg-neutral-900 border-b border-neutral-800 text-xs font-mono text-dat107-300">
                    <span>{block.lang}</span>
                  </div>
                )}
                <pre className="px-4 py-3 overflow-x-auto text-sm leading-relaxed">
                  <code>{block.body}</code>
                </pre>
              </div>
            );
          case "hr":
            return <hr key={bi} className="border-[var(--card-border)]" />;
          case "table":
            return (
              <div key={bi} className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
                <table className="min-w-full text-sm">
                  <thead className="bg-dat107-500/10">
                    <tr>
                      {block.head.map((h, hi) => (
                        <th
                          key={hi}
                          className="px-3 py-2 text-left font-semibold text-dat107-700 dark:text-dat107-300"
                        >
                          {renderInline(h, `th-${bi}-${hi}`)}
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
                            {renderInline(c, `td-${bi}-${ri}-${ci}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
