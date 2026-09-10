import katex from "katex";
import "katex/dist/katex.min.css";

/** Only authored TeX / computed numbers, never untrusted HTML. */
export default function Egb339Math({ children, inline = false }: { children: string; inline?: boolean }) {
  const html = katex.renderToString(children, { displayMode: !inline, throwOnError: true, trust: false, output: "htmlAndMathml" });
  return <span className={inline ? "egb-pilot-math-inline" : "egb-pilot-math"} dangerouslySetInnerHTML={{ __html: html }} />;
}
