"use client";

import Link from "next/link";
import Dat110Badge from "@/components/dat110/Dat110Badge";
import { useDat110Lang } from "@/lib/dat110-language";

export interface BegreperGroup {
  tema: string;
  label: string; // Norwegian tema label (computed server-side)
  items: { slug: string; title: string; desc: string }[];
}

// English tema-section labels. (Mirrors the map in TemaerGrid; kept local while
// English mode is built incrementally.)
const TEMA_LABELS_EN: Record<string, string> = {
  "01-introduksjon-og-metrics": "1. Introduction and metrics",
  "02-protocol-layering-og-sockets": "2. Protocol layering and sockets",
  "03-rpc-og-communication": "3. RPC and communication",
  "04-naming-og-chord-dht": "4. Naming and Chord DHT",
  "05-processes-and-threads": "5. Processes and threads",
  "06-transport-layer": "6. Transport layer",
  "06-transport-services": "6. Transport services",
  "07-coordination": "7. Coordination",
  "08-consistency-replication": "8. Consistency and replication",
  "09-fault-tolerance": "9. Fault tolerance",
  "10-network-layer": "10. Network layer",
  "11-link-layer": "11. Link layer",
  "12-iot-mqtt": "12. IoT and MQTT",
  "13-cloud-virtualization": "13. Cloud and virtualization",
  "14-network-security": "14. Network security",
};

export default function BegreperGrid({ groups }: { groups: BegreperGroup[] }) {
  const { lang } = useDat110Lang();
  const en = lang === "en";

  return (
    <div className="space-y-12">
      {groups.map((group) => {
        const heading = en ? TEMA_LABELS_EN[group.tema] ?? group.label : group.label;
        const n = group.items.length;
        const countWord = en
          ? n === 1
            ? "concept"
            : "concepts"
          : n === 1
            ? "begrep"
            : "begreper";
        return (
          <section key={group.tema} aria-labelledby={`tema-${group.tema}`}>
            <div className="mb-4 flex items-baseline justify-between gap-3 flex-wrap border-b border-[var(--card-border)] pb-2">
              <h2
                id={`tema-${group.tema}`}
                className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50"
              >
                {heading}
              </h2>
              <span className="text-xs font-medium text-[var(--muted)]">
                {n} {countWord}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((c) => (
                <Link
                  key={c.slug}
                  href={`/dat110/begreper/${c.slug}`}
                  className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm transition-all hover:shadow-md hover:border-network-300 dark:hover:border-network-700"
                >
                  <div className="mb-2">
                    <Dat110Badge tone="concept">
                      {en ? "Concept" : "Begrep"}
                    </Dat110Badge>
                  </div>
                  <h3 className="font-semibold mb-1.5 text-neutral-900 dark:text-neutral-50 group-hover:text-network-700 dark:group-hover:text-network-300 transition-colors">
                    {c.title}
                  </h3>
                  {c.desc && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                      {c.desc}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
