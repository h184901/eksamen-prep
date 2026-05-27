import Link from "next/link";
import topicsData from "@/data/dat110-vault/topics-tier1.json";
import type { DAT110Topic } from "@/lib/dat110-vault/types";

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
      <nav
        aria-label="Brødsmuler"
        className="mb-6 text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 flex-wrap"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">Temaer</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
        Temaer
      </h1>
      <p className="text-neutral-700 dark:text-neutral-200 max-w-2xl mb-8">
        Paraply-sider som binder flere begreper sammen rundt et felles tema —
        motivasjon, sammenhenger og lecture-referanser. {total} Tier&nbsp;1-temaer
        kalibrert mot eksamen-mønsteret. Klikk et tema for å se utdypning og
        relaterte begreper. Se også{" "}
        <Link
          href="/dat110/begreper"
          className="text-blue-700 dark:text-blue-300 hover:underline"
        >
          Begreper
        </Link>{" "}
        for atomiske konsept-sider.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orderedTopics.map((t) => {
          const title = displayTitle(t.title);
          const desc = plainText(extractDescription(t.body));
          const temaLabel = TEMA_LABELS[t.tema] ?? t.tema;
          return (
            <Link
              key={t.slug}
              href={`/dat110/temaer/${t.slug}`}
              className="group rounded-xl border-2 border-teal-300/40 dark:border-teal-700/40 hover:border-teal-400 dark:hover:border-teal-600 bg-[var(--card)] p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-100 uppercase tracking-wide">
                  Tema
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                  {temaLabel}
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50 group-hover:text-[var(--accent)] transition-colors">
                {title}
              </h3>
              {desc && (
                <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-4">
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
