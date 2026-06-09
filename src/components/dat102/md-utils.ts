// Små presentasjons-hjelpere for DAT102 vault-markdown.
// Samme mønster som DAT110s temaer-side (blockquote = kortbeskrivelse).

// Henter første blockquote (`> …`) fra body som 1–2-linjers beskrivelse.
// Faller tilbake til første vanlige avsnitt.
export function extractDescription(body: string): string {
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

// Markdown → ren tekst for kortbeskrivelser (lenker/wikilinks blir label-tekst).
export function plainText(md: string): string {
  return md
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, a, b) => b || a)
    .replace(/\s+/g, " ")
    .trim();
}

// Vault-titler har "Topic: "/"Concept: "-prefiks i frontmatter-tittelen.
export function displayTitle(raw: string): string {
  return raw.replace(/^(Topic|Concept):\s*/i, "").trim();
}
