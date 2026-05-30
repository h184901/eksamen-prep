"use client";

import Link from "next/link";
import Dat110Badge from "@/components/dat110/Dat110Badge";
import { useDat110Lang } from "@/lib/dat110-language/useDat110Lang";

export interface TemaerCardItem {
  slug: string;
  tema: string;
  title: string;
  desc: string;
  temaLabel: string; // Norwegian tema pill (computed server-side)
}

// English tema-pill labels (parallel to TEMA_LABELS in the page).
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

// English title (only where the vault title is Norwegian) + a concise English
// card description per topic slug. The long article bodies on the topic pages
// themselves remain Norwegian for now (see the landing-header note).
const TOPIC_CARD_EN: Record<string, { title?: string; description: string }> = {
  "chord-dht": {
    description:
      "Umbrella for Chord-specific material in topic 04: why flat-naming scalability motivates the DHT, how Chord realises a DHT as a logical ring with O(log N) finger-table lookup, and how the scalable lookup algorithm runs step by step.",
  },
  "overlay-and-gossip": {
    title: "Overlay Networks and Gossip",
    description:
      "Second half of topic 03 (L8): how distributed nodes organise into an application-layer overlay to disseminate data, and which multicast models (flooding-based, gossip-based) exist.",
  },
  "logical-clocks": {
    description:
      "Synthesis of the clock progression in L16: why physical clocks are not enough, how the happens-before relation replaces absolute time, how Lamport gives a total order, and how vector clocks capture causality.",
  },
  "consistency-and-replication": {
    description:
      "Why distributed systems replicate data, and the price paid in consistency overhead. Ties models (what semantics the client sees) to protocols (how the replicas coordinate).",
  },
  "fault-tolerance": {
    description:
      "How distributed systems tolerate partial failure — from failure models and masking via replication to reliable communication and distributed commit.",
  },
  "network-layer": {
    description:
      "Umbrella for topic 10: how a network-of-networks (heterogeneous LAN/WAN fragments) is presented as one uniform network with best-effort end-to-end datagram delivery between hosts. Split into data plane (per-router forwarding) and control plane.",
  },
  "transport-layer": {
    description:
      "Umbrella for topic 06: how the transport layer builds process-to-process services on top of the network layer's unreliable host-to-host datagram. UDP gives mux/demux + checksum; TCP gives a reliable byte stream.",
  },
  "routing": {
    description:
      "Umbrella for the control-plane half of topic 10: how routers collectively compute least-cost paths through the network and auto-configure each router's forwarding table. Two algorithm families (link-state and distance-vector).",
  },
};

export default function TemaerGrid({ items }: { items: TemaerCardItem[] }) {
  const { lang } = useDat110Lang();
  const en = lang === "en";

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((t) => {
        const enCard = en ? TOPIC_CARD_EN[t.slug] : undefined;
        const title = enCard?.title ?? t.title;
        const desc = enCard?.description ?? t.desc;
        const temaLabel = en ? TEMA_LABELS_EN[t.tema] ?? t.temaLabel : t.temaLabel;
        return (
          <Link
            key={t.slug}
            href={`/dat110/temaer/${t.slug}`}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm transition-all hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700"
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Dat110Badge tone="topic">{en ? "Topic" : "Tema"}</Dat110Badge>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                {temaLabel}
              </span>
            </div>
            <h3 className="font-semibold mb-1.5 text-neutral-900 dark:text-neutral-50 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
              {title}
            </h3>
            {desc && (
              <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-4 leading-relaxed">
                {desc}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
