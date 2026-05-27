import Link from "next/link";
import conceptsData from "@/data/dat110-vault/concepts-tier1.json";
import type { DAT110Concept } from "@/lib/dat110-vault/types";

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
        <span className="text-neutral-700 dark:text-neutral-200">Begreper</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
        Begreper
      </h1>
      <p className="text-neutral-700 dark:text-neutral-200 max-w-2xl mb-2">
        Alle {total} Tier&nbsp;1-begreper i DAT110 — atomiske konsepter med
        utledninger, eksempler og kilder fra forelesningsnotatene. Sortert etter
        tema. Se også{" "}
        <Link
          href="/dat110/temaer"
          className="text-blue-700 dark:text-blue-300 hover:underline"
        >
          Temaer
        </Link>{" "}
        for paraply-sider som binder flere begreper sammen.
      </p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
        {groups.length} tema · {total} begreper
      </p>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.tema} aria-labelledby={`tema-${group.tema}`}>
            <div className="mb-4 flex items-baseline justify-between gap-3 flex-wrap">
              <h2
                id={`tema-${group.tema}`}
                className="text-xl font-bold text-neutral-900 dark:text-neutral-50"
              >
                {group.label}
              </h2>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
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
                    className="group rounded-xl border-2 border-blue-300/40 dark:border-blue-700/40 hover:border-blue-400 dark:hover:border-blue-600 bg-[var(--card)] p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100 uppercase tracking-wide">
                        Begrep
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50 group-hover:text-[var(--accent)] transition-colors">
                      {title}
                    </h3>
                    {desc && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">
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
