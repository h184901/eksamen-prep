import Dat102Badge, { type Dat102BadgeTone } from "../Dat102Badge";
import type { ExamItemStatus } from "@/lib/dat102-vault/types";

// Eksamen-nivå status (kun complete | partial) og deloppgave-status
// (complete | partial | scanned_only | missing_solution) → ærlige badges.
// Vi later aldri som skannet/delvis er komplett.

const EXAM_LEVEL: Record<"complete" | "partial", { label: string; tone: Dat102BadgeTone }> = {
  complete: { label: "Komplett", tone: "ny" },
  partial: { label: "Delvis", tone: "warn" },
};

const ITEM_LEVEL: Record<ExamItemStatus, { label: string; tone: Dat102BadgeTone }> = {
  complete: { label: "Komplett", tone: "ny" },
  partial: { label: "Delvis", tone: "warn" },
  scanned_only: { label: "Kun skannet", tone: "soon" },
  missing_solution: { label: "Løsning mangler", tone: "soon" },
};

export function ExamLevelBadge({ status }: { status: "complete" | "partial" }) {
  const s = EXAM_LEVEL[status];
  return <Dat102Badge tone={s.tone}>{s.label}</Dat102Badge>;
}

export function ItemStatusBadge({ status }: { status: ExamItemStatus }) {
  const s = ITEM_LEVEL[status];
  return <Dat102Badge tone={s.tone}>{s.label}</Dat102Badge>;
}

export const ITEM_STATUS_LABEL: Record<ExamItemStatus, string> = {
  complete: "komplette",
  partial: "delvise",
  scanned_only: "kun skannet",
  missing_solution: "mangler løsning",
};
