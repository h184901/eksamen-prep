// DAT110 quiz topic metadata: emoji, label, color, mapping til eksamen-oppgaver.
// Brukes av TopicSelector og QuizCard. Topic-id'en er en VaultTema-slug.

import type { VaultTema } from "@/lib/dat110-vault/types";

export interface DAT110QuizTopicInfo {
  id: VaultTema;
  label: string;
  description: string;
  emoji: string;
  // Tailwind color family. Må finnes i tailwind.config.js (network/blue/teal/emerald/purple/amber).
  color: "network" | "blue" | "teal" | "emerald" | "purple" | "amber" | "rose";
  // Primary eksamen-oppgave hvor temaet hører hjemme (1..10). En tema kan
  // være relevant for flere oppgaver — vi velger primær.
  examQuestionNumber: number;
  examWeight: string;
  chapterTag: string;
  tier?: 1 | 2;
}

// 10 tier-1 + tier-2-temaer. Speiler temaene som faktisk finnes i quizzes.json.
// Cloud/security er ikke inkludert i P0c (ikke Tier 1, kan utvides i P1).
export const QUIZ_TOPICS_DAT110: DAT110QuizTopicInfo[] = [
  {
    id: "01-introduksjon-og-metrics",
    label: "Delays og throughput",
    description: "De fire forsinkelses-komponentene, throughput, bottleneck-link.",
    emoji: "⏱️",
    color: "network",
    examQuestionNumber: 3,
    examWeight: "10%",
    chapterTag: "CN 1",
    tier: 1,
  },
  {
    id: "02-protocol-layering-og-sockets",
    label: "Protokoll-lag og sockets",
    description: "TCP/IP-stakken, hvilke protokoller hører til hvilket lag.",
    emoji: "🧱",
    color: "blue",
    examQuestionNumber: 1,
    examWeight: "10%",
    chapterTag: "CN 1–3",
  },
  {
    id: "03-mom-overlay",
    label: "Overlay, MOM og RPC",
    description: "Application-layer multicast, overlay-trær, RPC failure-semantikk.",
    emoji: "🌳",
    color: "teal",
    examQuestionNumber: 8,
    examWeight: "10%",
    chapterTag: "DS 4",
    tier: 1,
  },
  {
    id: "04-naming-og-chord-dht",
    label: "Chord DHT",
    description: "Ring, successor-regel, finger-table, O(log N)-lookup.",
    emoji: "🔗",
    color: "blue",
    examQuestionNumber: 10,
    examWeight: "15%",
    chapterTag: "DS 6",
    tier: 1,
  },
  {
    id: "05-processes-and-threads",
    label: "Prosesser, tråder og RPC",
    description: "Tråd vs prosess, RPC-kall, failure-modeller.",
    emoji: "🔄",
    color: "purple",
    examQuestionNumber: 7,
    examWeight: "5%",
    chapterTag: "DS 1, 3",
    tier: 1,
  },
  {
    id: "06-transport-services",
    label: "Transport (TCP/UDP/RDT)",
    description: "Transport-tjenester, reliable data transfer, flow control, demultiplexing.",
    emoji: "📦",
    color: "blue",
    examQuestionNumber: 4,
    examWeight: "10%",
    chapterTag: "CN 3",
    tier: 1,
  },
  {
    id: "07-coordination",
    label: "Klokker og koordinering",
    description: "Lamport, vector clocks, mutual exclusion-algoritmer.",
    emoji: "🕐",
    color: "amber",
    examQuestionNumber: 9,
    examWeight: "10%",
    chapterTag: "DS 5",
    tier: 1,
  },
  {
    id: "08-consistency-replication",
    label: "Konsistens og replikering",
    description: "Consistency-modeller, quorum, primary-backup.",
    emoji: "🗄️",
    color: "rose",
    examQuestionNumber: 9,
    examWeight: "10%",
    chapterTag: "DS 7",
    tier: 1,
  },
  {
    id: "09-fault-tolerance",
    label: "Feiltoleranse",
    description: "Failure-typer, 3k+1-regelen, replikering for FT.",
    emoji: "🛡️",
    color: "rose",
    examQuestionNumber: 9,
    examWeight: "—",
    chapterTag: "DS 8",
    tier: 2,
  },
  {
    id: "10-network-layer",
    label: "IP og forwarding",
    description: "IPv4-adresser, CIDR/subnetting, forwarding longest-prefix.",
    emoji: "🌐",
    color: "network",
    examQuestionNumber: 5,
    examWeight: "10%",
    chapterTag: "CN 4–5",
    tier: 1,
  },
  {
    id: "11-link-layer",
    label: "Link-lag og ARP",
    description: "ARP, MAC-adresser, switch-læring.",
    emoji: "🔌",
    color: "emerald",
    examQuestionNumber: 6,
    examWeight: "10%",
    chapterTag: "CN 6",
    tier: 1,
  },
];

export function getQuizTopicInfo(id: VaultTema): DAT110QuizTopicInfo | undefined {
  return QUIZ_TOPICS_DAT110.find((t) => t.id === id);
}

// English label/description for each quiz topic. Used when DAT110 language =
// English. emoji / color / chapterTag / weight are language-neutral.
const TOPIC_I18N_EN: Partial<
  Record<VaultTema, { label: string; description: string }>
> = {
  "01-introduksjon-og-metrics": {
    label: "Delays and throughput",
    description: "The four delay components, throughput, bottleneck link.",
  },
  "02-protocol-layering-og-sockets": {
    label: "Protocol layers and sockets",
    description: "The TCP/IP stack — which protocols belong to which layer.",
  },
  "03-mom-overlay": {
    label: "Overlay, MOM and RPC",
    description:
      "Application-layer multicast, overlay trees, RPC failure semantics.",
  },
  "04-naming-og-chord-dht": {
    label: "Chord DHT",
    description: "Ring, successor rule, finger table, O(log N) lookup.",
  },
  "05-processes-and-threads": {
    label: "Processes, threads and RPC",
    description: "Thread vs process, RPC calls, failure models.",
  },
  "06-transport-services": {
    label: "Transport (TCP/UDP/RDT)",
    description:
      "Transport services, reliable data transfer, flow control, demultiplexing.",
  },
  "07-coordination": {
    label: "Clocks and coordination",
    description: "Lamport, vector clocks, mutual-exclusion algorithms.",
  },
  "08-consistency-replication": {
    label: "Consistency and replication",
    description: "Consistency models, quorum, primary-backup.",
  },
  "09-fault-tolerance": {
    label: "Fault tolerance",
    description: "Failure types, the 3k+1 rule, replication for FT.",
  },
  "10-network-layer": {
    label: "IP and forwarding",
    description: "IPv4 addresses, CIDR/subnetting, longest-prefix forwarding.",
  },
  "11-link-layer": {
    label: "Link layer and ARP",
    description: "ARP, MAC addresses, switch learning.",
  },
};

// Returns the topic info with English label/description when lang === "en"
// (and a translation exists); otherwise the original Norwegian info unchanged.
export function localizeQuizTopic(
  info: DAT110QuizTopicInfo,
  lang: "no" | "en",
): DAT110QuizTopicInfo {
  if (lang !== "en") return info;
  const en = TOPIC_I18N_EN[info.id];
  return en ? { ...info, label: en.label, description: en.description } : info;
}

// Static Tailwind class mapping. Tailwind JIT requires class names to appear
// literally in source so dynamic `bg-${color}-100` does not work.
export const TOPIC_COLOR_PILL: Record<DAT110QuizTopicInfo["color"], string> = {
  network:
    "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  emerald:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  purple:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  amber:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};
