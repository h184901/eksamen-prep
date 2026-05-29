import type { ReactNode } from "react";

export type BadgeTone =
  | "active"
  | "neutral"
  | "official"
  | "reconstructed"
  | "concept"
  | "topic"
  | "accent";

const toneClasses: Record<BadgeTone, string> = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  official:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  reconstructed:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  neutral:
    "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
  concept:
    "bg-network-100 text-network-700 dark:bg-network-900/40 dark:text-network-300",
  topic: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200",
  accent:
    "bg-network-100 text-network-700 dark:bg-network-900/40 dark:text-network-300",
};

interface Props {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

// Small uppercase status/label chip used across DAT110 pages (Aktiv, Offisiell,
// Rekonstruert, Begrep, Tema, …). One place for the chip styling.
export default function Dat110Badge({
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
