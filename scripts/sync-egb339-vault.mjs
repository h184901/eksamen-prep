#!/usr/bin/env node

// EGB339 Obsidian wiki -> eksamen-prep snapshot.
//
// The vault remains the source of truth. This script only exports the curated
// wiki layer (sources/concepts/entities/topics), never raw PDFs, books or student code.
// Output is deterministic so weekly updates produce reviewable git diffs.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { basename, join } from "node:path";

const VAULT_ROOT =
  process.env.EGB339_VAULT_PATH || "/Users/skjold/dev/units/EGB339";
const OUT_DIR = join(process.cwd(), "src/data/egb339-vault");

const SOURCE_DIR = join(VAULT_ROOT, "sources");
const CONCEPT_DIR = join(VAULT_ROOT, "concepts");
const ENTITY_DIR = join(VAULT_ROOT, "entities");
const TOPIC_DIR = join(VAULT_ROOT, "topics");

for (const required of [SOURCE_DIR, CONCEPT_DIR, ENTITY_DIR, TOPIC_DIR]) {
  if (!existsSync(required)) {
    throw new Error(`EGB339 vault folder not found: ${required}`);
  }
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/gi, (m) => (m === "Æ" ? "Ae" : "ae"))
    .replace(/ø/gi, (m) => (m === "Ø" ? "O" : "o"))
    .replace(/å/gi, (m) => (m === "Å" ? "A" : "a"))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function scalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => scalar(item))
      .filter(Boolean);
  }
  return trimmed;
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) return { frontmatter: {}, body: markdown };
  const end = markdown.indexOf("\n---\n", 4);
  if (end === -1) return { frontmatter: {}, body: markdown };

  const frontmatter = {};
  const lines = markdown.slice(4, end).split("\n");
  let index = 0;
  while (index < lines.length) {
    const match = lines[index].match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!match) {
      index += 1;
      continue;
    }

    const [, key, rawValue] = match;
    if (rawValue.trim()) {
      frontmatter[key] = scalar(rawValue);
      index += 1;
      continue;
    }

    const values = [];
    index += 1;
    while (index < lines.length) {
      const item = lines[index].match(/^\s+-\s+(.*)$/);
      if (!item) break;
      values.push(scalar(item[1]));
      index += 1;
    }
    frontmatter[key] = values;
  }

  return { frontmatter, body: markdown.slice(end + 5) };
}

function markdownFiles(directory) {
  return readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b, "en"))
    .map((file) => {
      const path = join(directory, file);
      const markdown = readFileSync(path, "utf8");
      const { frontmatter, body } = parseFrontmatter(markdown);
      const heading = body.match(/^#\s+(.+)$/m)?.[1]?.trim();
      return {
        file,
        noteName: basename(file, ".md"),
        title: heading || basename(file, ".md"),
        frontmatter,
        body,
      };
    });
}

function sourceKind(noteName) {
  if (/^Week\s+\d+\b/i.test(noteName)) return "week";
  if (/^Assessment\b/i.test(noteName)) return "assessment";
  return "resource";
}

function routeFor(kind, noteName) {
  if (kind === "week") {
    const number = noteName.match(/^Week\s+(\d+)/i)?.[1];
    return `/egb339/uker/uke-${number}`;
  }
  if (kind === "assessment") {
    return `/egb339/vurderinger/${slugify(noteName)}`;
  }
  if (kind === "resource") {
    return `/egb339/ressurser/${slugify(noteName)}`;
  }
  return `/egb339/temaer/${slugify(noteName)}`;
}

function trackFor(tags, title) {
  const text = `${tags.join(" ")} ${title}`.toLowerCase();
  if (/vision|image|colour|color|histogram|homograph|shape|pixel/.test(text)) {
    return "vision";
  }
  if (/motion|trajectory|interpolation|obstacle|clearance/.test(text)) {
    return "motion";
  }
  if (/kinematic|pose|rotation|frame|jacobian|robot|dobot|joint/.test(text)) {
    return "kinematics";
  }
  return "foundations";
}

const sourceNotes = markdownFiles(SOURCE_DIR).map((note) => ({
  ...note,
  kind: sourceKind(note.noteName),
}));
const conceptNotes = markdownFiles(CONCEPT_DIR).map((note) => ({
  ...note,
  kind: "concept",
}));
const entityNotes = markdownFiles(ENTITY_DIR).map((note) => ({
  ...note,
  kind: "entity",
}));
const topicNotes = markdownFiles(TOPIC_DIR).map((note) => ({
  ...note,
  kind: "topic",
}));
const allNotes = [...sourceNotes, ...conceptNotes, ...entityNotes, ...topicNotes];

const routeIndex = new Map();
for (const note of allNotes) {
  const route = routeFor(note.kind, note.noteName);
  routeIndex.set(note.noteName, route);
  routeIndex.set(note.title, route);
}

const unresolvedLinks = new Set();

function resolveWikilinks(markdown) {
  return markdown.replace(/!?\[\[([^\]]+)\]\]/g, (full, inner) => {
    if (full.startsWith("!")) return "";
    const [rawTarget, rawAlias] = inner.replace(/\\\|/g, "|").split("|");
    const [target, section] = rawTarget.split("#");
    const label = (rawAlias || section || target).trim();
    const cleanTarget = target.trim();

    if (cleanTarget.startsWith("raw/") || cleanTarget.includes("/assignment")) {
      return `*${label}*`;
    }

    const route = routeIndex.get(cleanTarget);
    if (!route) {
      unresolvedLinks.add(cleanTarget);
      return `*${label}*`;
    }
    const href = section ? `${route}#${slugify(section)}` : route;
    return `[${label}](${href})`;
  });
}

function stripPrivateSections(markdown) {
  return markdown.replace(
    /\n##\s+(?:Råkilder|Raw files|Working material|Immutable and user-owned material)\b[\s\S]*?(?=\n##\s+|$)/gi,
    "\n",
  );
}

function cleanBody(note) {
  let body = note.body;
  body = body.replace(/^\s*#\s+[^\n]+\n+/, "");
  body = body.replace(/^!\[\[[^\n]+\]\]\s*$/gm, "");
  body = stripPrivateSections(body);
  body = resolveWikilinks(body);
  const headingTranslations = new Map([
    ["Key takeaways", "Dette må du kunne"],
    ["Concepts introduced", "Sentrale begreper"],
    ["Entities involved", "Verktøy og systemer"],
    ["Assessment hooks", "Kobling til vurdering"],
    ["Open questions", "Åpne spørsmål"],
    ["Requirements", "Krav"],
    ["Implementation checks", "Implementasjonssjekk"],
    ["Important connections", "Viktige koblinger"],
    ["Related", "Relatert innhold"],
    ["Links", "Relatert innhold"],
    ["Mechanism", "Slik virker det"],
    ["Why it matters", "Hvorfor det er viktig"],
    ["Methods", "Metoder"],
    ["Validation", "Verifikasjon"],
    ["Questions", "Oppgaver"],
    ["Workflow", "Arbeidsflyt"],
    ["Limitations", "Begrensninger"],
  ]);
  body = body.replace(/^##\s+(.+)$/gm, (line, heading) => {
    const translated = headingTranslations.get(heading.trim());
    return translated ? `## ${translated}` : line;
  });
  body = body.replace(/\n{3,}/g, "\n\n").trim();
  return body;
}

function summaryFromBody(body) {
  const lines = body.split("\n");
  const callout = lines.findIndex((line) => /^>\s*\[!abstract\]/i.test(line));
  if (callout >= 0) {
    const summary = [];
    for (let i = callout + 1; i < lines.length && /^>/.test(lines[i]); i += 1) {
      summary.push(lines[i].replace(/^>\s?/, "").trim());
    }
    if (summary.length) return plainText(summary.join(" "));
  }

  const paragraph = body
    .split(/\n\s*\n/)
    .map((part) => part.replace(/^>\s?/gm, "").trim())
    .find((part) => part && !part.startsWith("#") && !part.startsWith("|"));
  return plainText(paragraph || "");
}

function plainText(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}

function listValue(value) {
  if (Array.isArray(value)) return value.map(String);
  if (!value) return [];
  return [String(value)];
}

function publicEntry(note) {
  const body = cleanBody(note);
  const tags = listValue(note.frontmatter.tags);
  const route = routeFor(note.kind, note.noteName);
  const weekMatch = note.noteName.match(/^Week\s+(\d+)/i);
  return {
    slug:
      note.kind === "week" ? `uke-${weekMatch?.[1]}` : slugify(note.noteName),
    title: note.title,
    kind: note.kind,
    route,
    week: String(note.frontmatter.week || ""),
    updated: String(note.frontmatter.updated || ""),
    tags,
    track: trackFor(tags, note.title),
    summary: summaryFromBody(body),
    sources: listValue(note.frontmatter.sources).map((source) =>
      String(source).replace(/^['"]|['"]$/g, ""),
    ),
    body,
  };
}

const sourceEntries = sourceNotes.map(publicEntry);
const weeks = sourceEntries
  .filter((entry) => entry.kind === "week")
  .sort((a, b) => Number(a.week) - Number(b.week));
const assessments = sourceEntries
  .filter((entry) => entry.kind === "assessment")
  .sort((a, b) => a.title.localeCompare(b.title, "en", { numeric: true }));
const resources = sourceEntries
  .filter((entry) => entry.kind === "resource")
  .sort((a, b) => a.title.localeCompare(b.title, "en"));
const concepts = [...conceptNotes, ...entityNotes, ...topicNotes]
  .map(publicEntry)
  .sort((a, b) => a.title.localeCompare(b.title, "en"));

const latestSourceUpdate = [...weeks, ...concepts, ...assessments, ...resources]
  .map((entry) => entry.updated)
  .filter(Boolean)
  .sort()
  .at(-1);
const generatedAt = latestSourceUpdate
  ? `${latestSourceUpdate}T00:00:00.000Z`
  : "unknown";
const meta = {
  generatedAt,
  source: "EGB339 Obsidian LLM wiki",
  counts: {
    weeks: weeks.length,
    concepts: concepts.length,
    assessments: assessments.length,
    resources: resources.length,
  },
  latestWeek: Math.max(...weeks.map((week) => Number(week.week))),
  unresolvedLinks: [...unresolvedLinks].sort((a, b) => a.localeCompare(b, "en")),
};

const wikilinkIndex = Object.fromEntries(
  [...routeIndex.entries()].sort(([a], [b]) => a.localeCompare(b, "en")),
);

mkdirSync(OUT_DIR, { recursive: true });
const outputs = {
  "weeks.json": { weeks },
  "concepts.json": { concepts },
  "assessments.json": { assessments },
  "resources.json": { resources },
  "_wikilink-index.json": { routes: wikilinkIndex },
  "_meta.json": meta,
};

for (const [file, value] of Object.entries(outputs)) {
  writeFileSync(join(OUT_DIR, file), `${JSON.stringify(value, null, 2)}\n`);
}

console.log(
  `Synced EGB339: ${weeks.length} weeks, ${concepts.length} concepts/entities, ` +
    `${assessments.length} assessments and ${resources.length} resources.`,
);
if (unresolvedLinks.size) {
  console.log(`Unresolved wikilinks rendered as text: ${unresolvedLinks.size}`);
  for (const link of [...unresolvedLinks].sort()) console.log(`  - ${link}`);
}
