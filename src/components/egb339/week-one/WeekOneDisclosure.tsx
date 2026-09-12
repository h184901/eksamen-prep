"use client";

import { useEffect, useRef, useState } from "react";

/** Button action with a stable, linkable solution. Children remain server-rendered. */
export default function WeekOneDisclosure({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const reveal = () => {
      if (window.location.hash !== `#${id}`) return;
      setOpen(true);
      frame = requestAnimationFrame(() => region.current?.scrollIntoView({ block: "start", behavior: "instant" }));
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => { window.removeEventListener("hashchange", reveal); cancelAnimationFrame(frame); };
  }, [id]);
  return <div id={id} ref={region} className="egb-week-disclosure">
    <button type="button" className="egb-week-button" aria-expanded={open} aria-controls={`${id}-body`} aria-label={`${open ? "Skjul" : "Vis"} løsning: ${title}`} onClick={() => setOpen(!open)}>{open ? "Skjul løsning" : "Vis løsning"}</button>
    <a href={`#${id}`} className="egb-week-answer-link" aria-label={`Direktelenke til ${title}`} onClick={() => setOpen(true)}>Direktelenke</a>
    <div id={`${id}-body`} hidden={!open} className="egb-week-answer">{children}</div>
  </div>;
}
