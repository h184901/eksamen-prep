import Link from "next/link";
import type { ObligView } from "@/lib/dat102-vault/exam-adapter";
import Dat102Badge from "../Dat102Badge";
import Dat102ObligCard from "./Dat102ObligCard";

interface Props {
  obliger: ObligView[];
}

export default function Dat102ObligerPage({ obliger }: Props) {
  const fullText = obliger.filter((o) => o.status === "full_text_available").length;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Dat102Badge tone="ny">Ny</Dat102Badge>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            DAT102 · Øving · Obliger
          </p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
          Obligatoriske innleveringer
        </h1>
        <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
          {obliger.length} arbeidskrav gjennom semesteret. {fullText} har full
          oppgavetekst; for resten finnes bare tema/metadata — det er tydelig
          merket per oblig, så vi later aldri som teksten finnes når den ikke
          gjør det.
        </p>
      </div>

      <div className="space-y-4">
        {obliger.map((o) => (
          <Dat102ObligCard key={o.id} oblig={o} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Link href="/dat102/oving" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2">
          ← Øving
        </Link>
        <Link href="/dat102/pensum" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2">
          Pensumplan
        </Link>
        <Link href="/dat102/eksamen" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2">
          Eksamener
        </Link>
      </div>
    </div>
  );
}
