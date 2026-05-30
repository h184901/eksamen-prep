"use client";

import Link from "next/link";
import Dat110PageHeader from "./Dat110PageHeader";
import { useDat110Lang } from "@/lib/dat110-language/useDat110Lang";

// English-mode POC for the Temaer landing header. When DAT110 language is "no"
// (default) this renders the exact original Norwegian header. When "en" it
// renders an English header + an honest note that the topic bodies themselves
// are still Norwegian (English mode is built gradually). Mirrors
// BegreperLandingHeader.
export default function TemaerLandingHeader({ total }: { total: number }) {
  const { lang } = useDat110Lang();

  if (lang === "en") {
    return (
      <Dat110PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "DAT110", href: "/dat110" },
          { label: "Topics" },
        ]}
        eyebrow="DAT110 · Curriculum"
        title="Topics"
        lead={
          <>
            {total} core umbrella pages that tie several concepts together
            around a shared topic — motivation, connections and lecture
            references, calibrated against the exam pattern. See also{" "}
            <Link
              href="/dat110/begreper"
              className="text-network-700 dark:text-network-300 font-medium hover:underline"
            >
              Concepts
            </Link>{" "}
            for atomic concept pages.
            <span className="mt-2 block text-sm text-[var(--muted)]">
              English mode is being built gradually — the topic pages
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
        { label: "Temaer" },
      ]}
      eyebrow="DAT110 · Pensum"
      title="Temaer"
      lead={
        <>
          {total} sentrale paraply-sider som binder flere begreper sammen rundt
          et felles tema — motivasjon, sammenhenger og lecture-referanser,
          kalibrert mot eksamen-mønsteret. Se også{" "}
          <Link
            href="/dat110/begreper"
            className="text-network-700 dark:text-network-300 font-medium hover:underline"
          >
            Begreper
          </Link>{" "}
          for atomiske konsept-sider.
        </>
      }
    />
  );
}
