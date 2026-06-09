import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { Dat102ComingSoon } from "./Dat102WikilinkText";
import { isLiveDat102Href } from "./dat102-links";

interface Props {
  content: string;
  // Vault-bodies starter med "# Topic: …"/"# Concept: …" — sidene viser egen
  // ren tittel, så den ledende H1-en strippes som standard.
  stripLeadingH1?: boolean;
}

function stripH1(md: string): string {
  return md.replace(/^\s*# [^\n]*\n+/, "");
}

// Rendrer DAT102 vault-markdown (concepts/topics/exam-patterns).
// Wikilinks er pre-resolvet til /dat102/...-lenker av scripts/sync-dat102-vault.mjs;
// lenker til ruter som ikke er bygget ennå (oving/eksamen) rendres som
// coming-soon-tekst i stedet for broken routes.
export default function Dat102Markdown({ content, stripLeadingH1 = true }: Props) {
  const cleaned = stripLeadingH1 ? stripH1(content) : content;
  return (
    <div className="dat102-markdown text-neutral-800 dark:text-neutral-100 leading-relaxed">
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
          a: ({ href, children }) => {
            const target = href ?? "";
            // Interne lenker mot Phase 2/3-ruter: vis som coming-soon, aldri 404.
            if (target.startsWith("/dat102") && !isLiveDat102Href(target)) {
              return <Dat102ComingSoon>{children}</Dat102ComingSoon>;
            }
            if (target.startsWith("/")) {
              return (
                <Link
                  href={target}
                  className="text-dat102-700 dark:text-dat102-300 font-medium underline-offset-2 hover:underline"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={target}
                className="text-dat102-700 dark:text-dat102-300 underline-offset-2 hover:underline"
              >
                {children}
              </a>
            );
          },
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
            // react-markdown v10: fenced blokker får className ("language-java"),
            // inline-kode har ingen.
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
            <blockquote className="my-4 pl-4 border-l-4 border-dat102-400 dark:border-dat102-600 italic text-neutral-700 dark:text-neutral-200 bg-dat102-50/40 dark:bg-dat102-950/20 py-2 pr-3 rounded-r">
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
