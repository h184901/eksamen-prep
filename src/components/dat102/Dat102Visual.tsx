import type { ReactNode } from "react";

interface Props {
  caption: string;
  children: ReactNode;
  className?: string;
}

// Ramme for DAT102s egne pedagogiske visualiseringer (SVG/React).
// Caption merker alltid figuren som egenprodusert — aldri bokfigurer.
export default function Dat102Visual({ caption, children, className = "" }: Props) {
  return (
    <figure
      className={`rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 sm:p-5 ${className}`}
    >
      {children}
      <figcaption className="mt-3 text-xs text-[var(--muted)]">
        {caption} · Egen pedagogisk figur
      </figcaption>
    </figure>
  );
}
