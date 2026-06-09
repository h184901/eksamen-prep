#!/usr/bin/env node
// DAT102 vault → eksamen-prep JSON sync (Phase 0).
//
// Reads from $DAT102_VAULT_ROOT (default /home/skjold/ObsidianVault/DAT102):
//   processed/reviewed/{topics,concepts,exam-patterns,exams,assignments}/*.md
//   processed/reviewed/{syllabus.md,lectures/index.md}
//   processed/reviewed/question-bank/*.json
//   structured/manifest.json                (source slug -> title lookup)
// Writes to src/data/dat102-vault/ (idempotent, pretty-printed for git diff).
//
// Hard rules enforced here:
//   - Never reads course_files_export/ (raw) or the textbook.
//   - No vault paths in student-facing fields; provenance lives in
//     sourceMeta/supportedBy (`internalPath`) for expandable "Kilder" UI only.
//   - Wikilinks in bodies are pre-resolved to /dat102/... routes; unmapped
//     namespaces (sources/, reports/, ...) become italic stubs, never links.
//   - Exam items keep partial/scanned status; scanned_only => solution null.
//   - Short-answer quiz items become qtype "short_answer_selfcheck".
//
// Run: npm run sync:dat102

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

// ---- Config -----------------------------------------------------------------

const VAULT_ROOT =
  process.env.DAT102_VAULT_ROOT || "/home/skjold/ObsidianVault/DAT102";
const REVIEWED = join(VAULT_ROOT, "processed/reviewed");
const QB = join(REVIEWED, "question-bank");
const OUT_DIR = join(process.cwd(), "src/data/dat102-vault");

const ROUTE_BASE = {
  concepts: "/dat102/begreper",
  topics: "/dat102/temaer",
  exams: "/dat102/eksamen",
  gjengangere: "/dat102/eksamen/gjengangere",
  obliger: "/dat102/oving/obliger",
  pensum: "/dat102/pensum",
};

const SESSION_LABELS = {
  "2020-vaar": "Vår 2020",
  "2022-vaar": "Vår 2022",
  "2023-vaar": "Vår 2023",
  "2024-vaar": "Vår 2024",
  "2025-jan": "Januar 2025 (kont H24)",
  "2025-vaar": "Vår 2025",
  "2026-jan": "Januar 2026 (kont H25)",
  "2026-vaar": "Vår 2026",
};

// Scanned/partial caveats per session. Mirrors the reviewed exam indexes
// (processed/reviewed/exams/<session>.md) — update there first, then here.
const SESSION_NOTES = {
  "2020-vaar":
    "Del 1 (oppgave 1–3) er skannet uten tekstlag. Oppgavetekstene for 1–3 er ikke tilgjengelige; bare fasit-notater fra løsningsforslaget. Oppgave 4–5 har full tekst.",
  "2025-vaar":
    "Flervalg-varianten uten svar er skannet; flervalg-med-svar brukes som tekstkilde. Enkelte deloppgaver er figur-baserte (merket per oppgave).",
  "2026-vaar":
    "Ingen separat oppgaveark finnes — oppgaveteksten for oppgave 6–9 er gjengitt fra løsningsforslag v4 (nyeste). For flervalg er «med svar NY» autoritativ.",
};

// Manual aliases for common human-form wikilinks (lowercased keys).
// Auto-aliases from concept/topic titles are added on top of these.
const EXTRA_ALIASES = {
  hashing: "topics/dictionaries-and-hashing",
  ordbok: "concepts/dictionary-adt",
  sortering: "topics/sorting",
  rekursjon: "topics/recursion",
  grafer: "topics/graphs",
  trær: "topics/trees",
  traer: "topics/trees",
  lister: "topics/lists",
  søking: "topics/searching",
  bst: "concepts/binary-search-tree",
  "binært søketre": "concepts/binary-search-tree",
  haug: "concepts/heap",
  heap: "concepts/heap",
  stabel: "concepts/stack-adt",
  kø: "concepts/queue-adt",
  "big-o": "concepts/big-o-notation",
  syllabus: "syllabus",
  ukeplan: "syllabus",
};

// ---- Small helpers ------------------------------------------------------------

const warnings = [];
const warn = (m) => warnings.push(m);
const fail = (m) => {
  console.error(`SYNC FAIL: ${m}`);
  process.exit(1);
};

function readMd(path) {
  return readFileSync(path, "utf-8");
}

function writeJson(name, data) {
  writeFileSync(join(OUT_DIR, name), JSON.stringify(data, null, 2) + "\n", "utf-8");
}

// Minimal YAML frontmatter parser for the vault's flat key/list style.
function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return { fm: {}, body: md };
  const fm = {};
  let currentKey = null;
  for (const rawLine of m[1].split("\n")) {
    const line = rawLine.replace(/\t/g, "  ");
    const listItem = line.match(/^\s+-\s+(.*)$/);
    if (listItem && currentKey) {
      fm[currentKey] = fm[currentKey] || [];
      fm[currentKey].push(stripQuotes(listItem[1].trim()));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      const val = kv[2].trim();
      fm[currentKey] = val === "" ? [] : stripQuotes(val);
    }
  }
  return { fm, body: md.slice(m[0].length) };
}

function stripQuotes(s) {
  return s.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}

function stripWikiBrackets(s) {
  const m = String(s).match(/^\[\[([^\]|]+)(?:\|[^\]]*)?\]\]$/);
  return m ? m[1].trim() : String(s).trim();
}

function normalizeAliasKey(s) {
  return String(s).toLowerCase().replace(/\s+/g, " ").trim();
}

// Parse all pipe tables in a markdown snippet -> array of row-arrays (cells).
function parsePipeRows(md) {
  const rows = [];
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|")) continue;
    const cells = t
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
    if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue; // separator
    rows.push(cells);
  }
  return rows;
}

function extractSection(body, headingRe) {
  // Returns [sectionText, bodyWithoutSection]
  const lines = body.split("\n");
  const out = [];
  const section = [];
  let inSection = false;
  for (const line of lines) {
    const isH2 = /^##\s+/.test(line);
    if (inSection && isH2) inSection = false;
    if (!inSection && isH2 && headingRe.test(line)) {
      inSection = true;
      continue;
    }
    (inSection ? section : out).push(line);
  }
  return [section.join("\n"), out.join("\n")];
}

function mdLinksToText(s) {
  // [label](relative/path.md#x) or (.json/.py) -> label   (never touches http links)
  return s.replace(
    /\[([^\]]*)\]\((?!https?:)[^)]*\.(?:md|json|py)(?:#[^)]*)?\)/g,
    "$1"
  );
}

const MOJI = /Ã¸|Ã¥|Ã¦|Ã˜|â€™|â€“|â€œ|ï¿½|Â /;

// ---- Step 1: structured manifest (source slug -> title) -------------------------

const structuredManifest = JSON.parse(
  readFileSync(join(VAULT_ROOT, "structured/manifest.json"), "utf-8")
);
const sourceTitle = {};
const sourceOutput = {};
for (const s of structuredManifest.sources || []) {
  if (s.slug) {
    sourceTitle[s.slug] = s.title || s.slug;
    sourceOutput[s.slug] = s.output_markdown || null;
  }
}

function sourceRefFromSlug(slug, pages) {
  const ref = {
    label: sourceTitle[slug] || slug,
    internalPath: sourceOutput[slug] || `structured (slug: ${slug})`,
  };
  if (pages) ref.pages = pages;
  return ref;
}

function prettyPathRef(path) {
  // "structured/exams/2023-vaar/exam-...-losningsforslag-samlet.md#p51"
  const [p, page] = path.split("#");
  const base = p.split("/").pop().replace(/\.md$/, "");
  let label = sourceTitle[base] || base;
  const sess = p.match(/exams\/(\d{4}-(?:vaar|jan))\//);
  if (sess && !sourceTitle[base]) label = `${SESSION_LABELS[sess[1]]} — ${base}`;
  const ref = { label, internalPath: path.replace(/#.*$/, "") };
  if (page) ref.pages = `s. ${page.replace(/^p/, "")}`;
  return ref;
}

// ---- Step 2: read concepts & topics ------------------------------------------------

function readDocDir(dir) {
  const docs = [];
  for (const f of readdirSync(join(REVIEWED, dir)).sort()) {
    if (!f.endsWith(".md")) continue;
    const raw = readMd(join(REVIEWED, dir, f));
    const { fm, body } = parseFrontmatter(raw);
    docs.push({ file: f, slug: fm.slug || f.replace(/\.md$/, ""), fm, body });
  }
  return docs;
}

const conceptDocs = readDocDir("concepts");
const topicDocs = readDocDir("topics");

// ---- Step 3: wikilink index (routes + aliases + anchors) ----------------------------

const routes = {};
for (const d of conceptDocs) routes[`concepts/${d.slug}`] = `${ROUTE_BASE.concepts}/${d.slug}`;
for (const d of topicDocs) routes[`topics/${d.slug}`] = `${ROUTE_BASE.topics}/${d.slug}`;

const examSessionSlugs = Object.keys(SESSION_LABELS);
for (const s of examSessionSlugs) routes[`exams/${s}`] = `${ROUTE_BASE.exams}/${s}`;

const patternFiles = readdirSync(join(REVIEWED, "exam-patterns"))
  .filter((f) => f.endsWith(".md"))
  .sort();
for (const f of patternFiles) {
  const slug = f.replace(/\.md$/, "");
  routes[`exam-patterns/${slug}`] = `${ROUTE_BASE.gjengangere}#${slug}`;
}
routes["assignments/obliger"] = ROUTE_BASE.obliger;
routes["syllabus"] = ROUTE_BASE.pensum;

// Aliases: manual extras + concept/topic titles (full, sans-parenthesis, inner-parenthesis)
const aliases = { ...EXTRA_ALIASES };
function addTitleAliases(target, title) {
  const variants = new Set([title]);
  const noParen = title.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  if (noParen && noParen !== title) variants.add(noParen);
  const inner = title.match(/\(([^)]+)\)/);
  if (inner) variants.add(inner[1].trim());
  for (const v of variants) {
    const key = normalizeAliasKey(v);
    if (key.length < 2) continue;
    if (!(key in aliases)) aliases[key] = target;
  }
}
for (const d of conceptDocs) addTitleAliases(`concepts/${d.slug}`, String(d.fm.title || d.slug));
for (const d of topicDocs) addTitleAliases(`topics/${d.slug}`, String(d.fm.title || d.slug));

// Anchors: obliger + pensum lecture anchors (filled in below once parsed)
const anchors = {};

// ---- Step 4: body processing (qa_pending strip, section cuts, wikilink resolve) -----

let bodyResolved = 0;
let bodyStubbed = 0;

function resolveWikilinkTarget(target) {
  if (routes[target]) return routes[target];
  const aliasHit = aliases[normalizeAliasKey(target)];
  if (aliasHit && routes[aliasHit]) return routes[aliasHit];
  return null;
}

function displayLabelFor(target, alias) {
  if (alias) return alias;
  const doc =
    conceptDocs.find((d) => `concepts/${d.slug}` === target) ||
    topicDocs.find((d) => `topics/${d.slug}` === target);
  if (doc) return String(doc.fm.title || doc.slug);
  if (target.startsWith("exams/")) {
    const s = target.slice("exams/".length).split("#")[0];
    return SESSION_LABELS[s] || target;
  }
  return target.split("/").pop();
}

function resolveBodyWikilinks(text) {
  return text.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
    const [rawTarget, alias] = inner.split("|").map((s) => s.trim());
    const [target, section] = rawTarget.split("#").map((s) => s.trim());
    const label = displayLabelFor(target, alias);
    const route = resolveWikilinkTarget(target);
    if (route) {
      bodyResolved++;
      const href = section ? `${route.split("#")[0]}#${slugifyAnchor(section)}` : route;
      return `[${label}](${href})`;
    }
    bodyStubbed++;
    return `*${label}*`;
  });
}

function slugifyAnchor(s) {
  return String(s)
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function processBody(rawBody, { cutSections = true } = {}) {
  let body = rawBody;
  const qaPendingNotes = [];
  body = body.replace(/<!--\s*qa_pending:([\s\S]*?)-->/g, (_, note) => {
    qaPendingNotes.push(note.trim());
    return "";
  });
  body = body.replace(/<!--[\s\S]*?-->/g, "");

  let sourcesSection = "";
  if (cutSections) {
    let rest;
    [sourcesSection, rest] = extractSection(body, /^##\s+Sources\b/);
    body = rest;
    [, body] = extractSection(body, /^##\s+Relaterte\b/);
  }

  body = mdLinksToText(body);
  body = resolveBodyWikilinks(body);
  body = body.replace(/\n{3,}/g, "\n\n").trim();
  return { body, qaPendingNotes, sourcesSection };
}

function parseSourcesTable(sectionText) {
  // | Kilde | Sider |  rows: [linked label, pages]
  const refs = [];
  for (const row of parsePipeRows(sectionText)) {
    if (row.length < 2 || /^Kilde$/i.test(row[0])) continue;
    const link = row[0].match(/\[([^\]]*)\]\(([^)]+)\)/);
    const pages = row[1] || undefined;
    if (link) {
      const slug = link[2].split("/").pop().replace(/\.md$/, "");
      const ref = sourceRefFromSlug(slug, pages);
      ref.label = link[1] || ref.label;
      refs.push(ref);
    } else if (row[0]) {
      refs.push({ label: mdLinksToText(row[0]), internalPath: "(se supported_by)", pages });
    }
  }
  return refs;
}

// Frontmatter values come in two styles across the vault:
//   block lists ("- item") and YAML flow lists ("[a, b]" / "[[concepts/x], [concepts/y]]").
// Normalize both to a plain string array.
function normalizeFmList(v) {
  if (Array.isArray(v)) return v;
  if (v === undefined || v === null) return [];
  const s = String(v).trim();
  if (s === "" || s === "[]") return [];
  const refs = [...s.matchAll(/((?:concepts|topics|exams|exam-patterns)\/[a-z0-9-]+)/g)].map(
    (m) => m[1]
  );
  if (refs.length) return refs;
  if (s.startsWith("[") && s.endsWith("]")) {
    return s
      .slice(1, -1)
      .split(",")
      .map((x) => stripQuotes(x.trim()))
      .filter(Boolean);
  }
  return [s];
}

function toResolvedRefs(list, prefix) {
  const arr = normalizeFmList(list);
  return arr.map((raw) => {
    const target = stripWikiBrackets(raw);
    const slug = target.replace(/^(concepts|topics)\//, "");
    const full = target.includes("/") ? target : `${prefix}/${slug}`;
    const route = routes[full];
    if (!route) warn(`unresolved related ref: ${raw}`);
    return { slug, route: route || "" };
  });
}

function buildDoc(d, kind) {
  const { body, qaPendingNotes, sourcesSection } = processBody(d.body);
  let supportedBy = parseSourcesTable(sourcesSection);
  if (supportedBy.length === 0) {
    supportedBy = normalizeFmList(d.fm.supported_by).map((s) =>
      sourceRefFromSlug(stripWikiBrackets(s))
    );
  }
  return {
    slug: d.slug,
    title: String(d.fm.title || d.slug),
    status: "reviewed",
    supportedBy,
    relatedConcepts: toResolvedRefs(d.fm.related_concepts, "concepts"),
    relatedTopics: toResolvedRefs(d.fm.related_topics, "topics"),
    body,
    qaPendingNotes,
    created: String(d.fm.created || ""),
  };
}

// ---- Step 5: syllabus + lectures ----------------------------------------------------

function buildSyllabus() {
  const raw = readMd(join(REVIEWED, "syllabus.md"));
  const { body } = parseFrontmatter(raw);

  const [weekSection] = extractSection(body, /^##\s+Ukeplan/);
  const weeks = parsePipeRows(weekSection)
    .filter((r) => r.length >= 6 && !/^Uke$/i.test(r[0]))
    .map((r) => ({
      week: r[0],
      dates: r[1],
      tuesday: mdLinksToText(r[2]).replace(/\*\*/g, ""),
      lab: mdLinksToText(r[3]).replace(/\*\*/g, ""),
      thursday: mdLinksToText(r[4]).replace(/\*\*/g, ""),
      oblig: mdLinksToText(r[5]).replace(/\*\*/g, ""),
    }));

  const [chapterSection] = extractSection(body, /^##\s+Kapittel/);
  const chapterMap = parsePipeRows(chapterSection)
    .filter((r) => r.length >= 2 && !/^Kap/i.test(r[0]))
    .map((r) => ({
      chapters: r[0],
      topicSlugs: [...r[1].matchAll(/\[\[topics\/([a-z0-9-]+)/g)].map((m) => m[1]),
    }));

  const introMatch = body.match(/^>\s*([\s\S]*?)\n\n/m);
  const intro = introMatch
    ? mdLinksToText(introMatch[1]).replace(/\n>\s*/g, " ").replace(/\*\*/g, "").trim()
    : "";

  // Lectures from lectures/index.md
  const lecRaw = readMd(join(REVIEWED, "lectures/index.md"));
  const { body: lecBody } = parseFrontmatter(lecRaw);
  const lectures = [];
  const seenAnchors = new Set();
  for (const r of parsePipeRows(lecBody)) {
    if (r.length < 7 || /^Uke$/i.test(r[0])) continue;
    const code = r[1];
    const srcLink = r[6].match(/\(([^)]+)\)/);
    const sourceSlug = srcLink
      ? srcLink[1].split("/").pop().replace(/\.md$/, "")
      : "";
    let anchor =
      code && code !== "—"
        ? slugifyAnchor(code)
        : slugifyAnchor(mdLinksToText(r[2])).slice(0, 24) || sourceSlug;
    while (seenAnchors.has(anchor)) anchor = `${anchor}-2`;
    seenAnchors.add(anchor);
    lectures.push({
      week: r[0],
      code,
      anchor,
      title: mdLinksToText(r[2]),
      chapters: r[3],
      topicSlugs: [...r[4].matchAll(/\[\[topics\/([a-z0-9-]+)/g)].map((m) => m[1]),
      pages: /^\d+$/.test(r[5]) ? Number(r[5]) : null,
      sourceSlug,
    });
  }
  for (const lec of lectures) {
    anchors[lec.anchor] = `${ROUTE_BASE.pensum}#${lec.anchor}`;
    if (lec.code && lec.code !== "—") {
      const key = normalizeAliasKey(lec.code);
      if (!(key in anchors)) anchors[key] = `${ROUTE_BASE.pensum}#${lec.anchor}`;
      const full = normalizeAliasKey(`${lec.code} ${lec.title}`);
      if (!(full in anchors)) anchors[full] = `${ROUTE_BASE.pensum}#${lec.anchor}`;
    }
  }
  return { intro, weeks, chapterMap, lectures };
}

// ---- Step 6: obliger -----------------------------------------------------------------

function buildObliger() {
  const raw = readMd(join(REVIEWED, "assignments/obliger.md"));
  const { body } = parseFrontmatter(raw);

  const overview = parsePipeRows(
    extractSection(body, /^##\s+Oversikt/)[0]
  ).filter((r) => r.length >= 5 && !/^Oblig$/i.test(r[0]));

  const sections = body.split(/\n##\s+/).slice(1); // each starts with its heading line

  function findSection(namePrefix) {
    return sections.find((s) => s.toLowerCase().startsWith(namePrefix.toLowerCase()));
  }

  const STATUS_RE = /(full_text_available|partial|index_only|missing_source)/;

  const obliger = [];
  for (const row of overview) {
    const rawName = row[0].replace(/\*\*/g, "");
    const statusCell = row[4].replace(/`/g, "");
    const statusMatch = statusCell.match(STATUS_RE);
    if (!statusMatch) {
      warn(`oblig status not recognized: ${statusCell}`);
      continue;
    }
    const status = statusMatch[1];
    const statusNote = statusCell.replace(STATUS_RE, "").replace(/^[\s—-]*/, "").replace(/[()]/g, "").trim();

    let id;
    let anchor;
    const nMatch = rawName.match(/Oblig\s?(\d)/i);
    if (/godkjent/i.test(rawName)) {
      id = "godkjent-prove";
      anchor = "godkjent-prove";
    } else if (/prøve/i.test(rawName) && nMatch && nMatch[1] === "4") {
      id = "oblig4-prove";
      anchor = "oblig4";
    } else if (nMatch) {
      id = `oblig${nMatch[1]}`;
      anchor = `oblig${nMatch[1]}`;
    } else {
      id = slugifyAnchor(rawName);
      anchor = id;
    }

    const sec =
      findSection(rawName.split("—")[0].trim()) ||
      (id === "godkjent-prove" ? findSection("Oblig4") : undefined) ||
      "";
    const canvas = sec.match(/assignment (\d+)/);
    const canvasGodkjent = sec.match(/Canvas (\d+), udatert/);
    const topicSlugs = [...sec.matchAll(/\[\[topics\/([a-z0-9-]+)\]\]/g)].map((m) => m[1]);
    const conceptSlugs = [...sec.matchAll(/\[\[concepts\/([a-z0-9-]+)\]\]/g)].map((m) => m[1]);
    const buildsOn = [];
    const byggerLine = sec.match(/\*\*Bygger på:\*\*([^\n]*)/);
    if (byggerLine) {
      for (const l of byggerLine[1].matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
        const slug = l[2].split("/").pop().replace(/\.md$/, "");
        buildsOn.push(sourceRefFromSlug(slug));
      }
    }
    const lfLink = sec.match(/\*\*Løsningsforslag:\*\*\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (lfLink) {
      buildsOn.push(sourceRefFromSlug(lfLink[2].split("/").pop().replace(/\.md$/, "")));
    }

    obliger.push({
      id,
      anchor,
      title: rawName,
      deadline: row[1].replace(/\*\*/g, ""),
      weeks: row[2],
      themes: mdLinksToText(row[3]),
      status,
      statusNote,
      canvasAssignmentId:
        id === "godkjent-prove"
          ? canvasGodkjent
            ? canvasGodkjent[1]
            : null
          : canvas
            ? canvas[1]
            : null,
      topicSlugs: [...new Set(topicSlugs)],
      conceptSlugs: [...new Set(conceptSlugs)],
      buildsOn,
      hasSolution: /løsningsforslag/i.test(sec) && id === "oblig5",
    });
  }

  for (const o of obliger) anchors[o.anchor] = `${ROUTE_BASE.obliger}#${o.anchor}`;
  anchors["oblig4-prove"] = `${ROUTE_BASE.obliger}#oblig4`;
  for (const o of obliger) {
    const key = normalizeAliasKey(o.title.split("—")[0].trim());
    if (!(key in anchors)) anchors[key] = `${ROUTE_BASE.obliger}#${o.anchor}`;
  }
  return obliger;
}

// ---- Step 7: exam patterns -------------------------------------------------------------

function buildExamPatterns() {
  const patterns = [];
  for (const f of patternFiles) {
    const slug = f.replace(/\.md$/, "");
    const raw = readMd(join(REVIEWED, "exam-patterns", f));
    const { fm, body } = parseFrontmatter(raw);
    const h1 = body.match(/^#\s+(.+)$/m);
    const { body: processed } = processBody(body, { cutSections: false });
    patterns.push({
      slug,
      title: h1 ? h1[1].trim() : slug,
      sessionsCovered: Array.isArray(fm.sessions_covered) ? fm.sessions_covered : [],
      body: processed,
    });
  }
  return patterns;
}

// ---- Step 8: question-bank adapters -------------------------------------------------------

function loadQb(name) {
  return JSON.parse(readFileSync(join(QB, name), "utf-8"));
}

function adaptRefs(sourceRefs) {
  return (sourceRefs || []).map((r) => prettyPathRef(r));
}

function deriveItemSource(sourceRefs) {
  const refs = sourceRefs || [];
  const examRef = refs.find((r) => r.includes("structured/exams/"));
  if (examRef) {
    const m = examRef.match(/exams\/(\d{4}-(?:vaar|jan))\//);
    return { kind: "exam", label: m ? `Eksamen ${SESSION_LABELS[m[1]]}` : "Eksamen" };
  }
  const lec = refs.find((r) => /structured\/lectures\//.test(r));
  if (lec) {
    const code = lec.match(/(?:bergen|haugesund)-f(\d{2}[ab]?)/);
    return { kind: "generated", label: code ? `Pensum (F${code[1].toUpperCase()})` : "Pensum" };
  }
  return { kind: "generated", label: "Pensum" };
}

function adaptLearnMore(links) {
  return (links || []).map((l) => {
    const href = l.route || "";
    if (!href.startsWith("/dat102/")) warn(`learnMoreLink without /dat102 route: ${JSON.stringify(l)}`);
    return { label: l.label, href, kind: l.kind, slug: l.slug };
  });
}

const QTYPE_MAP = {
  "single-choice": "multiple_choice",
  "true-false": "true_false",
  "multiple-answer": "multiple_select",
  "short-answer": "short_answer_selfcheck",
};

function buildQuizzes() {
  const src = loadQb("quiz-questions.json").questions;
  return src.map((q) => {
    const qtype = QTYPE_MAP[q.type];
    if (!qtype) fail(`unknown quiz type ${q.type} on ${q.id}`);
    const correctIndices =
      q.type === "multiple-answer"
        ? q.correctAnswers
        : q.type === "short-answer"
          ? []
          : [q.correctAnswer];
    return {
      id: q.id,
      topic: q.topic,
      conceptSlugs: q.concepts || [],
      difficulty: q.difficulty,
      qtype,
      question: q.prompt,
      options: q.options || [],
      correctIndices,
      selfCheck:
        q.type === "short-answer" ? { expectedAnswer: q.expectedAnswer } : null,
      explanationCorrect: q.explanation,
      explanationIncorrect: q.explanation,
      optionExplanations: (q.whyWrong || []).map((w) => ({
        optionIndex: w.option,
        isCorrect: false,
        shortExplanation: w.text,
      })),
      learnMoreLinks: adaptLearnMore(q.learnMoreLinks),
      source: deriveItemSource(q.sourceRefs),
      sourceMeta: { refs: adaptRefs(q.sourceRefs) },
    };
  });
}

function buildFlashcards() {
  const src = loadQb("flashcards.json").cards;
  return src.map((c) => ({
    id: c.id,
    topic: c.topic,
    conceptSlugs: c.concepts || [],
    front: c.front,
    back: c.back,
    learnMoreLinks: adaptLearnMore(c.learnMoreLinks),
    source: deriveItemSource(c.sourceRefs),
    sourceMeta: { refs: adaptRefs(c.sourceRefs) },
  }));
}

function buildMatching() {
  const src = loadQb("matching-pairs.json").pairs;
  return src.map((p) => ({
    id: p.id,
    category: p.category,
    topic: p.topic,
    left: p.left,
    right: p.right,
    learnMoreLinks: adaptLearnMore(p.learnMoreLinks),
    sourceMeta: { refs: adaptRefs(p.sourceRefs) },
  }));
}

function buildDrills() {
  const src = loadQb("practice-drills.json").drills;
  return src.map((d) => ({
    id: d.id,
    topic: d.topic,
    conceptSlugs: d.concepts || [],
    title: d.title,
    qtype: d.type.replace(/-/g, "_"),
    difficulty: d.difficulty,
    prompt: d.prompt,
    expectedSteps: d.expectedSteps || [],
    finalAnswer: d.finalAnswer,
    figureNote: d.figureNote || null,
    learnMoreLinks: adaptLearnMore(d.learnMoreLinks),
    source: deriveItemSource(d.sourceRefs),
    sourceMeta: { refs: adaptRefs(d.sourceRefs) },
  }));
}

// ---- Step 9: exams -------------------------------------------------------------------------

function numOrNull(v) {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function buildExams() {
  const src = loadQb("exam-questions.json").questions;
  const bySession = new Map();
  for (const item of src) {
    const sess = item.examSession;
    if (!SESSION_LABELS[sess]) fail(`unknown exam session ${sess} on ${item.id}`);
    if (!bySession.has(sess)) bySession.set(sess, new Map());
    const byQ = bySession.get(sess);
    const qnum = Number(item.questionNumber);
    if (!byQ.has(qnum)) byQ.set(qnum, []);
    byQ.get(qnum).push(item);
  }

  const exams = [];
  for (const sess of examSessionSlugs) {
    if (!bySession.has(sess)) {
      warn(`no exam items for session ${sess}`);
      continue;
    }
    const byQ = bySession.get(sess);
    const statusCounts = { complete: 0, partial: 0, scanned_only: 0, missing_solution: 0 };
    let subCount = 0;
    const questions = [...byQ.keys()]
      .sort((a, b) => a - b)
      .map((qnum) => {
        const items = byQ
          .get(qnum)
          .sort((a, b) => String(a.subquestion || "").localeCompare(String(b.subquestion || "")));
        const subquestions = items.map((it) => {
          statusCounts[it.status] = (statusCounts[it.status] || 0) + 1;
          subCount++;
          const sol = it.solution
            ? {
                expectedAnswer: it.solution.answer || "",
                shortReasoning: it.solution.reasoning || "",
                commonMistakes: it.solution.commonMistakes || [],
              }
            : null;
          if (it.status === "scanned_only" && sol) fail(`${it.id}: scanned_only with solution`);
          return {
            letter: it.subquestion || null,
            qtype: it.type,
            points: numOrNull(it.points),
            prompt: it.prompt,
            status: it.status,
            solution: sol,
            figureNote: it.figureNote || null,
            learnMoreLinks: adaptLearnMore(it.learnMoreLinks),
            sourceMeta: { refs: adaptRefs(it.sourceRefs) },
          };
        });
        const pts = subquestions.map((s) => s.points).filter((p) => p !== null);
        const topicCounts = {};
        for (const it of items) topicCounts[it.topic] = (topicCounts[it.topic] || 0) + 1;
        const topic = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0][0];
        return {
          number: qnum,
          anchor: `oppg-${qnum}`,
          points: pts.length ? pts.reduce((a, b) => a + b, 0) : null,
          topic,
          conceptSlugs: [...new Set(items.flatMap((it) => it.concepts || []))],
          subquestions,
        };
      });

    // One-line summary from the reviewed exam index (first paragraph after H1).
    let summary = "";
    try {
      const idx = readMd(join(REVIEWED, "exams", `${sess}.md`));
      const { body } = parseFrontmatter(idx);
      const m = body.match(/^#\s+.+\n+([^\n#>][^\n]*)/m);
      if (m) summary = mdLinksToText(m[1]).trim();
    } catch {
      warn(`missing reviewed exam index for ${sess}`);
    }

    const nonComplete =
      statusCounts.partial + statusCounts.scanned_only + statusCounts.missing_solution;
    const status = nonComplete > 0 ? "partial" : "complete";
    // Honest banner text: explicit per-session notes first, otherwise a
    // generic note for sessions whose only gaps are figure-based subquestions.
    let sessionNote = SESSION_NOTES[sess] || null;
    if (!sessionNote && nonComplete > 0) {
      sessionNote = `${nonComplete} deloppgave${nonComplete === 1 ? "" : "r"} er figur-basert${nonComplete === 1 ? "" : "e"} — svaret avhenger av en figur som ikke kan gjengis fullt ut som tekst (merket per deloppgave).`;
    }
    exams.push({
      slug: sess,
      year: Number(sess.slice(0, 4)),
      session: sess.endsWith("jan") ? "jan" : "vaar",
      displayLabel: SESSION_LABELS[sess],
      summary,
      sessionNote,
      status,
      statusCounts,
      questionCount: questions.length,
      subquestionCount: subCount,
      questions,
    });
  }
  return exams;
}

// ---- Step 10: write everything ------------------------------------------------------------

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(join(OUT_DIR, "exams"), { recursive: true });

const syllabus = buildSyllabus(); // fills lecture anchors first
const obliger = buildObliger(); // fills oblig anchors
const concepts = conceptDocs.map((d) => buildDoc(d, "concept"));
const topics = topicDocs.map((d) => buildDoc(d, "topic"));
const patterns = buildExamPatterns();
const quizzes = buildQuizzes();
const flashcards = buildFlashcards();
const matching = buildMatching();
const drills = buildDrills();
const exams = buildExams();

// Route-collision guard (within our namespace).
const routeValues = [...Object.values(routes), ...new Set(Object.values(anchors).map((a) => a.split("#")[0]))];
const seenRoute = new Set();
for (const r of Object.values(routes)) {
  if (seenRoute.has(r)) fail(`route collision: ${r}`);
  seenRoute.add(r);
}

writeJson("concepts.json", { concepts });
writeJson("topics.json", { topics });
writeJson("syllabus.json", syllabus);
writeJson("obliger.json", { obliger });
writeJson("exam-patterns.json", { patterns });
writeJson("quizzes.json", { questions: quizzes });
writeJson("flashcards.json", { cards: flashcards });
writeJson("matching.json", { pairs: matching });
writeJson("drills.json", { drills });
writeJson("_wikilink-index.json", { routes, aliases, anchors });

const examIndexEntries = exams.map(({ questions, ...rest }) => rest);
writeJson("exams-index.json", { exams: examIndexEntries });
for (const exam of exams) {
  writeFileSync(
    join(OUT_DIR, "exams", `${exam.slug}.json`),
    JSON.stringify(exam, null, 2) + "\n",
    "utf-8"
  );
}

const meta = {
  syncedAt: new Date().toISOString(),
  vaultPath: "ObsidianVault/DAT102/processed/reviewed",
  counts: {
    concepts: concepts.length,
    topics: topics.length,
    quizQuestions: quizzes.length,
    flashcards: flashcards.length,
    matchingPairs: matching.length,
    drills: drills.length,
    exams: exams.length,
    examQuestions: exams.reduce((a, e) => a + e.questionCount, 0),
    examSubquestions: exams.reduce((a, e) => a + e.subquestionCount, 0),
    obliger: obliger.length,
    examPatterns: patterns.length,
    lectures: syllabus.lectures.length,
    wikilinkRoutes: Object.keys(routes).length,
    wikilinkAliases: Object.keys(aliases).length,
    wikilinkAnchors: Object.keys(anchors).length,
    bodyWikilinksResolved: bodyResolved,
    bodyWikilinksStubbed: bodyStubbed,
  },
};
writeJson("_meta.json", meta);

// Mojibake self-check on everything we just wrote.
for (const f of readdirSync(OUT_DIR)) {
  if (!f.endsWith(".json")) continue;
  if (MOJI.test(readFileSync(join(OUT_DIR, f), "utf-8"))) fail(`mojibake in ${f}`);
}

console.log("DAT102 sync complete →", OUT_DIR.replace(process.cwd() + "/", ""));
console.log(JSON.stringify(meta.counts, null, 2));
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 30)) console.log("  ⚠", w);
} else {
  console.log("\n0 warnings.");
}
