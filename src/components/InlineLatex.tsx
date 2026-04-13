"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

interface InlineLatexProps {
  latex: string;
}

export default function InlineLatex({ latex }: InlineLatexProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(latex, ref.current, {
        displayMode: false,
        throwOnError: false,
      });
    }
  }, [latex]);

  return <span ref={ref} className="inline" />;
}
