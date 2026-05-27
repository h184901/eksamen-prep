import Link from "next/link";
import type { ExamPatternQSlot } from "@/lib/dat110-vault/types";

// Q-slot oversiktstabell for /dat110/eksamen/gjengangere.
// Viser per Q-nummer: vekt, tema-fokus, stabilitet, eksempel-lenker til
// hver av de 5 eksamenene med anchor #oppg-N.
interface Props {
  qslots: ExamPatternQSlot[];
}

function stabilityColor(stability: string): string {
  const s = stability.toLowerCase();
  if (s.includes("høyest") || s.includes("5/5")) {
    return "text-emerald-700 dark:text-emerald-300";
  }
  if (s.includes("høy")) return "text-emerald-700 dark:text-emerald-300";
  if (s.includes("middels")) return "text-amber-700 dark:text-amber-300";
  if (s.includes("lav") || s.includes("roterer")) {
    return "text-orange-700 dark:text-orange-300";
  }
  return "text-neutral-700 dark:text-neutral-300";
}

export default function QSlotTable({ qslots }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 dark:bg-neutral-900/60 text-left">
          <tr>
            <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-200 w-16">
              Oppg
            </th>
            <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-200">
              Tema
            </th>
            <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-200 w-20">
              Vekt
            </th>
            <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-200">
              Stabilitet
            </th>
            <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-200">
              Eksempler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {qslots.map((q) => (
            <tr
              key={q.number}
              className="bg-[var(--card)] hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
            >
              <td className="px-3 py-3 font-bold text-neutral-900 dark:text-neutral-50 align-top">
                Q{q.number}
              </td>
              <td className="px-3 py-3 align-top">
                <p className="font-medium text-neutral-900 dark:text-neutral-50">
                  {q.title}
                </p>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {q.topicFocus}
                </p>
              </td>
              <td className="px-3 py-3 align-top font-mono text-neutral-700 dark:text-neutral-300">
                {q.weightPercent}%
              </td>
              <td
                className={`px-3 py-3 align-top text-xs font-semibold ${stabilityColor(q.stability)}`}
              >
                {q.stability}
              </td>
              <td className="px-3 py-3 align-top">
                <div className="flex flex-wrap gap-1.5">
                  {q.examples.map((ex) => (
                    <Link
                      key={ex.href}
                      href={ex.href}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                    >
                      {ex.label}
                    </Link>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
