import type { ReactNode } from "react";

export type Dat102BadgeTone =
  | "topic"
  | "concept"
  | "ny"
  | "soon"
  | "neutral"
  | "accent"
  | "warn";

const toneClasses: Record<Dat102BadgeTone, string> = {
  topic:
    "bg-dat102-100 text-dat102-700 dark:bg-dat102-900/40 dark:text-dat102-300",
  concept: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200",
  ny: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  soon: "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
  neutral:
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
  accent:
    "bg-dat102-600 text-white dark:bg-dat102-500 dark:text-dat102-950",
  warn: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
};

interface Props {
  tone?: Dat102BadgeTone;
  children: ReactNode;
  className?: string;
}

// Liten uppercase status/etikett-chip for DAT102-sider (Tema, Begrep, Ny,
// Kommer snart, …). Speiler Dat110Badge, men med cyan/teal-tonene.
export default function Dat102Badge({
  tone = "neutral",
  children,
  className = "",
}: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
