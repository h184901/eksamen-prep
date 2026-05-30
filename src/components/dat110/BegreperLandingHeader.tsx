"use client";

import Link from "next/link";
import Dat110PageHeader from "./Dat110PageHeader";
import { useDat110Lang } from "@/lib/dat110-language/useDat110Lang";

// English-mode POC for the Begreper landing header. When DAT110 language is
// "no" (default) this renders the exact original Norwegian header. When "en"
// it renders an English header + an honest note that the concept bodies
// themselves are still Norwegian (English mode is built gradually).
export default function BegreperLandingHeader({
  total,
  temaCount,
}: {
  total: number;
  temaCount: number;
}) {
  const { lang } = useDat110Lang();

  if (lang === "en") {
    return (
      <Dat110PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "DAT110", href: "/dat110" },
          { label: "Concepts" },
        ]}
        eyebrow="DAT110 · Curriculum"
        title="Concepts"
        lead={
          <>
            All {total} core concepts across {temaCount} topics — atomic
            concepts with derivations, examples and sources from the lecture
            notes. See also{" "}
            <Link
              href="/dat110/temaer"
              className="text-network-700 dark:text-network-300 font-medium hover:underline"
            >
              Topics
            </Link>{" "}
            for umbrella pages that tie several concepts together.
            <span className="mt-2 block text-sm text-[var(--muted)]">
              English mode is being built gradually — the concept pages
              themselves are still in Norwegian.
            </span>
          </>
        }
      />
    );
  }

  return (
    <Dat110PageHeader
      crumbs={[
        { label: "Hjem", href: "/" },
        { label: "DAT110", href: "/dat110" },
        { label: "Begreper" },
      ]}
      eyebrow="DAT110 · Pensum"
      title="Begreper"
      lead={
        <>
          Alle {total} sentrale begreper på tvers av {temaCount} tema —
          atomiske konsepter med utledninger, eksempler og kilder fra
          forelesningsnotatene. Se også{" "}
          <Link
            href="/dat110/temaer"
            className="text-network-700 dark:text-network-300 font-medium hover:underline"
          >
            Temaer
          </Link>{" "}
          for paraply-sider som binder flere begreper sammen.
        </>
      }
    />
  );
}
