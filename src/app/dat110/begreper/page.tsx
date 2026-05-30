import Link from "next/link";
import conceptsData from "@/data/dat110-vault/concepts-tier1.json";
import type { DAT110Concept } from "@/lib/dat110-vault/types";
import BegreperLandingHeader from "@/components/dat110/BegreperLandingHeader";
import Dat110Badge from "@/components/dat110/Dat110Badge";

// Human-readable labels for vault `tema` codes used in concept frontmatter.
// Order mirrors the curriculum sequence (01 → 14).
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

// Strip the "Concept: " prefix used in vault frontmatter to get a clean
// display title (e.g. "Concept: Chord Ring" → "Chord Ring").
function displayTitle(raw: string): string {
  return raw.replace(/^Concept:\s*/i, "").trim();
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

  // Fallback: first non-heading, non-empty paragraph.
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;
    return trimmed;
  }
  return "";
}

// Lightweight markdown cleanup so wikilinks/inline code render as plain text
// in the card description (we do not want anchor tags inside the card link).
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

const concepts = (conceptsData as { concepts: DAT110Concept[] }).concepts;

interface Group {
  tema: string;
  label: string;
  items: DAT110Concept[];
}

function groupByTema(items: DAT110Concept[]): Group[] {
  const map = new Map<string, DAT110Concept[]>();
  for (const c of items) {
    const arr = map.get(c.tema) ?? [];
    arr.push(c);
    map.set(c.tema, arr);
  }
  const groups: Group[] = [];
  for (const tema of TEMA_ORDER) {
    const arr = map.get(tema);
    if (!arr || arr.length === 0) continue;
    groups.push({
      tema,
      label: TEMA_LABELS[tema] ?? tema,
      items: arr.slice().sort((a, b) =>
        displayTitle(a.title).localeCompare(displayTitle(b.title), "nb"),
      ),
    });
  }
  // Catch any tema not in TEMA_ORDER (defensive — currently none).
  for (const [tema, arr] of map.entries()) {
    if (TEMA_ORDER.includes(tema)) continue;
    groups.push({
      tema,
      label: tema,
      items: arr.slice().sort((a, b) =>
        displayTitle(a.title).localeCompare(displayTitle(b.title), "nb"),
      ),
    });
  }
  return groups;
}

export const metadata = {
  title: "Begreper — DAT110",
};

export default function BegreperPage() {
  const groups = groupByTema(concepts);
  const total = concepts.length;

  return (
    <div>
      <BegreperLandingHeader total={total} temaCount={groups.length} />

      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.tema} aria-labelledby={`tema-${group.tema}`}>
            <div className="mb-4 flex items-baseline justify-between gap-3 flex-wrap border-b border-[var(--card-border)] pb-2">
              <h2
                id={`tema-${group.tema}`}
                className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50"
              >
                {group.label}
              </h2>
              <span className="text-xs font-medium text-[var(--muted)]">
                {group.items.length}{" "}
                {group.items.length === 1 ? "begrep" : "begreper"}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((c) => {
                const title = displayTitle(c.title);
                const desc = plainText(extractDescription(c.body));
                return (
                  <Link
                    key={c.slug}
                    href={`/dat110/begreper/${c.slug}`}
                    className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm transition-all hover:shadow-md hover:border-network-300 dark:hover:border-network-700"
                  >
                    <div className="mb-2">
                      <Dat110Badge tone="concept">Begrep</Dat110Badge>
                    </div>
                    <h3 className="font-semibold mb-1.5 text-neutral-900 dark:text-neutral-50 group-hover:text-network-700 dark:group-hover:text-network-300 transition-colors">
                      {title}
                    </h3>
                    {desc && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                        {desc}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
