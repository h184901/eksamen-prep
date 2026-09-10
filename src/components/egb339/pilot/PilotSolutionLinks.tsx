"use client";

import { useEffect } from "react";

/** Deep links must open the disclosure, including back/forward and direct page loads. */
export default function PilotSolutionLinks({ parts }: { parts: { id: string; title: string }[] }) {
  useEffect(() => {
    function reveal() {
      const id = window.location.hash.slice(1);
      if (!parts.some((part) => id === `solution-${part.id}`)) return;
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView({ block: "start", behavior: "instant" });
      }
    }
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [parts]);
  return <nav aria-label="Deloppgaver" className="egb-pilot-parts"><ol>
    {parts.map((part) => <li key={part.id}><a href={`#solution-${part.id}`} onClick={() => {
      const target = document.getElementById(`solution-${part.id}`);
      if (target instanceof HTMLDetailsElement) target.open = true;
    }}>{part.title}</a></li>)}
  </ol></nav>;
}
