import Link from "next/link";
import MatchingRunner from "@/components/dat110/oving/MatchingRunner";
import matchingData from "@/data/dat110-vault/matching.json";
import type { MatchingDataset } from "@/components/dat110/oving/matching-types";

export const metadata = {
  title: "Matching — DAT110",
};

export default function MatchingPage() {
  const data = matchingData as MatchingDataset;
  const pairs = data.pairs;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav
        aria-label="Brødsmuler"
        className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6 flex-wrap"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span aria-hidden>/</span>
        <Link
          href="/dat110/oving"
          className="hover:text-[var(--accent)]"
        >
          Øving
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">Matching</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
          Matching-øvelse
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl">
          Koble begreper til riktige definisjoner. Settet er kuratert rundt
          klassiske eksamens-confusables — Lamport vs vector clocks,
          primary-backup vs quorum, TCP vs UDP, ARP vs DNS, Chord successor vs
          finger-table, transmission vs propagation delay, og flere. Trykk et
          begrep til venstre, så definisjonen som passer til høyre. {pairs.length}{" "}
          par tilgjengelig.
        </p>
      </header>

      <MatchingRunner pairs={pairs} />
    </div>
  );
}
