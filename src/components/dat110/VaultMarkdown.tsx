import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface Props {
  content: string;
}

// Skjuler inline kilde-/note-referanser fra brukervendt prosa, dvs. parenteser
// som inneholder et internt vault-slug, f.eks. "(*dat110-l9-naming-i* s. 18)"
// eller "(basert på *dat110-l13-transport-a-2026* s. 5–7)". Faglig tekst,
// "(L18 s. 12)"-forelesningsrefs, dedikert "## Provenance"-seksjon og
// "Kilder og grunnlag"-accordion (egen sourceRefs-kilde) beholdes.
function stripInlineSourceRefs(md: string): string {
  return md.replace(/[ \t]*\([^()]*dat110-[a-z0-9-]+[^()]*\)/g, "");
}

// Renders DAT110 vault concept/topic body markdown.
// Wikilinks have been pre-resolved at build-time in scripts/sync-dat110-vault.mjs
// to either markdown links (for resolvable targets) or *italic stubs* (for everything else).
export default function VaultMarkdown({ content }: Props) {
  const cleaned = stripInlineSourceRefs(content);
  return (
    <div className="vault-markdown text-neutral-800 dark:text-neutral-100 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-8 mb-4 text-neutral-900 dark:text-neutral-50">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-8 mb-3 text-neutral-900 dark:text-neutral-50">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-6 mb-2 text-neutral-900 dark:text-neutral-100">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold mt-5 mb-2 text-neutral-900 dark:text-neutral-100">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-3 text-neutral-700 dark:text-neutral-200">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-3 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 ml-6 list-decimal space-y-1 text-neutral-700 dark:text-neutral-200">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-700 dark:text-blue-300 underline-offset-2 hover:underline"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neutral-600 dark:text-neutral-300">{children}</em>
          ),
          code: (props) => {
            const { className, children } = props as {
              className?: string;
              children?: React.ReactNode;
            };
            // react-markdown v10 sets className for fenced code blocks (e.g. "language-js"),
            // inline code has no className.
            const isBlock = !!className;
            if (isBlock) {
              return (
                <code className="block font-mono text-sm text-neutral-800 dark:text-neutral-100">
                  {children}
                </code>
              );
            }
            return (
              <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 text-sm font-mono">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-4 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-x-auto text-sm font-mono text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 pl-4 border-l-4 border-blue-400 dark:border-blue-600 italic text-neutral-700 dark:text-neutral-200 bg-blue-50/40 dark:bg-blue-950/20 py-2 pr-3 rounded-r">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="min-w-full border-collapse border border-neutral-200 dark:border-neutral-800 text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-neutral-100 dark:bg-neutral-900">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-semibold text-neutral-900 dark:text-neutral-100 border-r border-neutral-200 dark:border-neutral-800 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-neutral-700 dark:text-neutral-200 border-r border-neutral-200 dark:border-neutral-800 last:border-r-0 align-top">
              {children}
            </td>
          ),
          hr: () => <hr className="my-8 border-t border-neutral-200 dark:border-neutral-800" />,
        }}
      >
        {cleaned}
      </ReactMarkdown>
    </div>
  );
}
