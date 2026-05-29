import Link from "next/link";
import topicsData from "@/data/dat110-vault/topics-tier1.json";
import type { DAT110Topic } from "@/lib/dat110-vault/types";
import Dat110PageHeader from "@/components/dat110/Dat110PageHeader";
import Dat110Badge from "@/components/dat110/Dat110Badge";

// Human-readable labels for vault `tema` codes. Kept in sync with begreper/page.tsx.
const TEMA_LABELS: Record<string, string> = {
  "01-introduksjon-og-metrics": "1. Introduksjon og metrics",
  "02-protocol-layering-og-sockets": "2. Protocol layering og sockets",
  "03-rpc-og-communication": "3. RPC og kommunikasjon",
  "04-naming-og-chord-dht": "4. Naming og Chord DHT",
  "05-processes-and-threads": "5. Prosesser og tråder",
  "06-transport-layer": "6. Transport layer",
  "06-transport-services": "6. Transport services",
  "07-coordination": "7. Koordinering",
  "08-consistency-replication": "8. Konsistens og replikering",
  "09-fault-tolerance": "9. Feiltoleranse",
  "10-network-layer": "10. Network layer",
  "11-link-layer": "11. Link layer",
  "12-iot-mqtt": "12. IoT og MQTT",
  "13-cloud-virtualization": "13. Cloud og virtualisering",
  "14-network-security": "14. Nettverkssikkerhet",
};

const TEMA_ORDER: string[] = Object.keys(TEMA_LABELS);

// Strip the "Topic: " prefix used in vault frontmatter to get a clean
// display title (e.g. "Topic: Chord DHT" → "Chord DHT").
function displayTitle(raw: string): string {
  return raw.replace(/^Topic:\s*/i, "").trim();
}

// Extract the first blockquote (`> ...`) from the markdown body as the
// 1–2 line description. Falls back to the first paragraph if no blockquote.
function extractDescription(body: string): string {
  const lines = body.split("\n");
  const quote: string[] = [];
  let inQuote = false;
  for (const line of lines) {
    if (line.startsWith(">")) {
      inQuote = true;
      quote.push(line.replace(/^>\s?/, "").trim());
    } else if (inQuote) {
      break;
    }
  }
  if (quote.length > 0) return quote.join(" ").trim();

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;
    return trimmed;
  }
  return "";
}

// Lightweight markdown cleanup so wikilinks/inline code render as plain text
// in the card description.
function plainText(md: string): string {
  return md
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, a, b) => b || a)
    .replace(/\s+/g, " ")
    .trim();
}

const topics = (topicsData as { topics: DAT110Topic[] }).topics;

const orderedTopics = topics.slice().sort((a, b) => {
  const ai = TEMA_ORDER.indexOf(a.tema);
  const bi = TEMA_ORDER.indexOf(b.tema);
  const aIdx = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
  const bIdx = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
  if (aIdx !== bIdx) return aIdx - bIdx;
  return displayTitle(a.title).localeCompare(displayTitle(b.title), "nb");
});

export const metadata = {
  title: "Temaer — DAT110",
};

export default function TemaerPage() {
  const total = topics.length;

  return (
    <div>
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orderedTopics.map((t) => {
          const title = displayTitle(t.title);
          const desc = plainText(extractDescription(t.body));
          const temaLabel = TEMA_LABELS[t.tema] ?? t.tema;
          return (
            <Link
              key={t.slug}
              href={`/dat110/temaer/${t.slug}`}
              className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm transition-all hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700"
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Dat110Badge tone="topic">Tema</Dat110Badge>
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
    </div>
  );
}
