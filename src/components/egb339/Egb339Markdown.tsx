import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface Props {
  content: string;
}

type Segment =
  | { type: "markdown"; content: string }
  | { type: "callout"; kind: string; title: string; content: string };

const calloutTone: Record<string, { wrap: string; label: string }> = {
  abstract: {
    wrap: "border-robotics-300 bg-robotics-50/70 dark:border-robotics-700 dark:bg-robotics-950/35",
    label: "Kort fortalt",
  },
  definition: {
    wrap: "border-sky-300 bg-sky-50/70 dark:border-sky-700 dark:bg-sky-950/30",
    label: "Definisjon",
  },
  tip: {
    wrap: "border-emerald-300 bg-emerald-50/70 dark:border-emerald-700 dark:bg-emerald-950/30",
    label: "Tips",
  },
  warning: {
    wrap: "border-amber-300 bg-amber-50/80 dark:border-amber-700 dark:bg-amber-950/30",
    label: "Viktig",
  },
  important: {
    wrap: "border-amber-300 bg-amber-50/80 dark:border-amber-700 dark:bg-amber-950/30",
    label: "Viktig",
  },
};

function splitCallouts(markdown: string): Segment[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const segments: Segment[] = [];
  const buffer: string[] = [];

  const flush = () => {
    const content = buffer.join("\n").trim();
    if (content) segments.push({ type: "markdown", content });
    buffer.length = 0;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^>\s*\[!([A-Za-z-]+)\]\s*(.*)$/);
    if (!match) {
      buffer.push(lines[index]);
      continue;
    }

    flush();
    const content: string[] = [];
    index += 1;
    while (index < lines.length && /^>/.test(lines[index])) {
      content.push(lines[index].replace(/^>\s?/, ""));
      index += 1;
    }
    index -= 1;
    const kind = match[1].toLowerCase();
    segments.push({
      type: "callout",
      kind,
      title: match[2].trim() || calloutTone[kind]?.label || "Merk",
      content: content.join("\n").trim(),
    });
  }

  flush();
  return segments;
}

function MarkdownBlock({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 mb-4 text-2xl font-bold text-neutral-950 dark:text-neutral-50">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-10 mb-3 text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-7 mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-3 text-base leading-7 text-neutral-700 dark:text-neutral-200">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="my-4 ml-6 list-disc space-y-2 marker:text-robotics-500 text-neutral-700 dark:text-neutral-200">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 ml-6 list-decimal space-y-2 marker:font-semibold marker:text-robotics-600 dark:marker:text-robotics-300 text-neutral-700 dark:text-neutral-200">
            {children}
          </ol>
        ),
        a: ({ href, children }) => {
          const target = href ?? "";
          if (target.startsWith("/")) {
            return (
              <Link
                href={target}
                className="font-medium text-robotics-700 underline-offset-2 hover:underline dark:text-robotics-300"
              >
                {children}
              </Link>
            );
          }
          return (
            <a
              href={target}
              className="font-medium text-robotics-700 underline-offset-2 hover:underline dark:text-robotics-300"
            >
              {children}
            </a>
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold text-neutral-950 dark:text-white">{children}</strong>
        ),
        code: (props) => {
          const { className, children } = props as {
            className?: string;
            children?: React.ReactNode;
          };
          if (className) {
            return <code className="block font-mono text-sm text-cyan-50">{children}</code>;
          }
          return (
            <code className="rounded bg-robotics-50 px-1.5 py-0.5 font-mono text-sm text-robotics-900 dark:bg-robotics-950/70 dark:text-robotics-100">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="my-5 overflow-x-auto rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 shadow-inner">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-5 rounded-r-lg border-l-4 border-robotics-400 bg-robotics-50/50 py-2 pl-4 pr-3 text-neutral-700 dark:bg-robotics-950/25 dark:text-neutral-200">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="my-5 overflow-x-auto rounded-xl border border-[var(--card-border)]">
            <table className="min-w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-robotics-50 dark:bg-robotics-950/40">{children}</thead>
        ),
        tr: ({ children }) => (
          <tr className="border-b border-[var(--card-border)] last:border-0">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-3 py-2 text-left font-semibold text-neutral-900 dark:text-neutral-100">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 align-top text-neutral-700 dark:text-neutral-200">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function Egb339Markdown({ content }: Props) {
  return (
    <div className="egb339-markdown">
      {splitCallouts(content).map((segment, index) => {
        if (segment.type === "markdown") {
          return <MarkdownBlock key={index} content={segment.content} />;
        }
        const tone = calloutTone[segment.kind] ?? calloutTone.abstract;
        return (
          <aside key={index} className={`my-5 rounded-xl border-2 p-5 ${tone.wrap}`}>
            <p className="mb-1 text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100">
              {segment.title}
            </p>
            <MarkdownBlock content={segment.content} />
          </aside>
        );
      })}
    </div>
  );
}
