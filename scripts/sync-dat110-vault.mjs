#!/usr/bin/env node
// DAT110 vault → eksamen-prep JSON sync (P0a scope).
//
// Reads from $VAULT_ROOT/processed/reviewed/ (default: /home/skjold/ObsidianVault/DAT110)
// Writes to src/data/dat110-vault/ (idempotent, pretty-printed for git diff)
//
// P0a output:
//   concepts-tier1.json   (10 concepts)
//   topics-tier1.json     (2 topics)
//   _wikilink-index.json  (slug → route mapping for build-time validation)
//   _meta.json            (sync timestamp + counts)
//
// Filters out 6 known local-only sources from supportedBy arrays.
// Reports each filtered source explicitly (not just count).

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

// ---- Config ---------------------------------------------------------------

const VAULT_ROOT = process.env.VAULT_ROOT || "/home/skjold/ObsidianVault/DAT110";
const VAULT_REVIEWED = join(VAULT_ROOT, "processed/reviewed");
const OUT_DIR = join(process.cwd(), "src/data/dat110-vault");

const TIER1_CONCEPTS = [
  // P0a
  "chord-ring",
  "dht-fundamentals",
  "key-resolution",
  "application-layer-multicast",
  "ipv4-addressing",
  "subnetting",
  "arp-and-mac-addressing",
  "delays",
  "throughput",
  "distribution-transparency",
  "rpc",
  // P1.A additions
  "vector-clocks",
  "lamport-clocks",
  "quorum",
  "consistency-models",
  "replication-strategies",
  "fault-models",
  "routing-algorithms",
  "network-layer-services",
  "tcp",
  "udp",
  "reliable-communication",
  "failure-detection",
];
const TIER1_TOPICS = [
  // P0a
  "chord-dht",
  "overlay-and-gossip",
  // P1.A additions
  "logical-clocks",
  "consistency-and-replication",
  "fault-tolerance",
  "network-layer",
  "transport-layer",
  "routing",
];

// Hand-curated exam JSONs (P0b: one exam; P1+: more added here).
// Each entry's slug becomes the dynamic route /dat110/eksamen/<slug> and
// registers in _wikilink-index.json so learnMoreLinks can target it.
const EXAM_DATA_FILES = [
  { slug: "dat110-eksamen-05-2024", file: "exams/dat110-eksamen-05-2024.json" },
];

// Known local-only / copyright-sensitive sources from vault inventory.
// Filtering rule: any source with frontmatter local_only: true OR with a slug in
// this allow-list is excluded from web output. This allow-list is a safety net
// in case frontmatter is missing the flag.
const KNOWN_LOCAL_ONLY = new Set([
  "dat110-mqtt",
  "dat110-guest-mqtt-bridge-slides",
  "dat110-guest-mqtt-bridge-paper",
  "chapters-1-2-bagha-madisetti-cloud-computing",
  "bagha-madisetti-iot-book",
  "load-balancing-vm-survey",
]);

// ---- Frontmatter parser ---------------------------------------------------
// Handles the subset of YAML used in vault frontmatter:
//   key: value
//   key: [a, b]
//   key: [[wikilink]], [[wikilink]]   ← extracts wikilinks as a list
//   key:
//     - item
//     - "quoted item"
//
// Multi-line literal blocks and nested maps are NOT supported (not used in vault).

function parseFrontmatter(content) {
  if (!content.startsWith("---\n")) return { frontmatter: {}, body: content };
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return { frontmatter: {}, body: content };
  const fmText = content.slice(4, end);
  const body = content.slice(end + 5);
  return { frontmatter: parseYaml(fmText), body };
}

function parseYaml(text) {
  const obj = {};
  const lines = text.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "" || line.trim().startsWith("#")) {
      i++;
      continue;
    }
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
    if (!m) {
      i++;
      continue;
    }
    const key = m[1];
    const value = m[2].trim();

    if (value === "" || value === "[]") {
      // Multi-line list (or empty list)
      const items = [];
      i++;
      while (i < lines.length && /^\s+-\s/.test(lines[i])) {
        const raw = lines[i].replace(/^\s+-\s+/, "").trim();
        items.push(stripQuotes(raw));
        i++;
      }
      obj[key] = items;
    } else if (value.includes("[[")) {
      // Wikilink-list value (one or more [[...]] entries comma-separated)
      const wikilinks = [...value.matchAll(/\[\[([^\]]+)\]\]/g)].map((mm) => mm[1]);
      obj[key] = wikilinks;
      i++;
    } else if (value.startsWith("[") && value.endsWith("]")) {
      // Inline array
      const inner = value.slice(1, -1);
      const items = inner
        .split(",")
        .map((s) => stripQuotes(s.trim()))
        .filter((s) => s.length > 0);
      obj[key] = items;
      i++;
    } else {
      obj[key] = stripQuotes(value);
      i++;
    }
  }
  return obj;
}

function stripQuotes(s) {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

function isTruthyFlag(v) {
  return v === true || v === "true" || v === "yes";
}

// ---- Wikilink resolver (build-time) --------------------------------------

function buildWikilinkIndex(conceptSlugs, topicSlugs, examSlugs) {
  const index = {};
  for (const slug of conceptSlugs) {
    index[`concepts/${slug}`] = `/dat110/begreper/${slug}`;
  }
  for (const slug of topicSlugs) {
    index[`topics/${slug}`] = `/dat110/temaer/${slug}`;
  }
  for (const slug of examSlugs) {
    index[`eksamen/${slug}`] = `/dat110/eksamen/${slug}`;
  }
  return index;
}

// Approved wikilink namespaces — match wikilink-resolver.ts allow-list.
// Wikilinks outside these are NEVER mapped to web routes.
const APPROVED_NAMESPACES = new Set([
  "concepts",
  "topics",
  "exam-patterns",
  "eksamen",
]);

// In body markdown, replace [[target]] / [[target|alias]] / [[target#section]] with
// either a markdown link (resolvable in approved namespace) or an italic stub
// (everything else — sources/*, prosjekter/*, temaer/*, Task N, page anchors, etc.).
// Unmapped wikilinks are counted and returned alongside the rendered body.
function resolveBodyWikilinks(body, wikiIndex, unmappedSink) {
  return body.replace(/\[\[([^\]]+)\]\]/g, (_match, inner) => {
    const [rawTarget, alias] = inner.split("|").map((s) => s.trim());
    const [routeTarget, section] = rawTarget.split("#");
    const namespace = routeTarget.includes("/")
      ? routeTarget.split("/")[0]
      : null;
    const fallbackLabel = alias || (rawTarget.includes("/")
      ? rawTarget.split("/").pop()
      : rawTarget);

    // Only map if (a) the namespace is approved AND (b) the route is in the index.
    if (namespace && APPROVED_NAMESPACES.has(namespace) && wikiIndex[routeTarget]) {
      const href = section ? `${wikiIndex[routeTarget]}#${section}` : wikiIndex[routeTarget];
      return `[${fallbackLabel}](${href})`;
    }

    // Unmapped: track for reporting + render as italic stub.
    if (unmappedSink) {
      const reason = !namespace
        ? "no-namespace"
        : !APPROVED_NAMESPACES.has(namespace)
          ? `namespace-not-approved (${namespace})`
          : "not-in-wikilink-index (target outside P0a Tier 1)";
      unmappedSink.push({ target: rawTarget, reason });
    }
    return `*${fallbackLabel}*`;
  });
}

function wikilinkToSlug(wikilink) {
  // "concepts/chord-ring" → "chord-ring"
  // "topics/chord-dht" → "chord-dht"
  // "concepts/foo#section" → "foo"
  const trimmed = wikilink.split("#")[0].split("|")[0].trim();
  const parts = trimmed.split("/");
  return parts[parts.length - 1];
}

// ---- Entry loader --------------------------------------------------------

function loadVaultEntry(kind, slug) {
  const path = join(VAULT_REVIEWED, kind, `${slug}.md`);
  const raw = readFileSync(path, "utf-8");
  const { frontmatter, body } = parseFrontmatter(raw);
  // Title from first H1 in body, else slug
  const titleMatch = body.match(/^#\s+(.+?)\s*$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  return { frontmatter, body, title };
}

// ---- Source-note inventory + local-only filter --------------------------

function loadAllSources() {
  const sourcesDir = join(VAULT_REVIEWED, "sources");
  const files = readdirSync(sourcesDir).filter((f) => f.endsWith(".md"));
  const sources = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const path = join(sourcesDir, file);
    const raw = readFileSync(path, "utf-8");
    const { frontmatter, body } = parseFrontmatter(raw);
    const titleMatch = body.match(/^#\s+(.+?)\s*$/m);
    const title = titleMatch ? titleMatch[1].trim() : slug;
    const fmLocalOnly = isTruthyFlag(frontmatter.local_only);
    const knownLocalOnly = KNOWN_LOCAL_ONLY.has(slug);
    const isLocalOnly = fmLocalOnly || knownLocalOnly;
    sources.push({
      slug,
      title,
      role: frontmatter.role || "unknown",
      priority: frontmatter.priority || "reference",
      language: frontmatter.language || "en",
      copyrightSensitive: isTruthyFlag(frontmatter.copyright_sensitive),
      localOnly: isLocalOnly,
      fmLocalOnly,
      knownLocalOnly,
    });
  }
  return sources;
}

// ---- Build a concept/topic entry for output ------------------------------

function buildEntry(raw, allSources, wikiIndex, eligibleConceptSlugs, eligibleTopicSlugs, unmappedSink) {
  const fm = raw.frontmatter;

  const supportedBySlugs = Array.isArray(fm.supported_by) ? fm.supported_by : [];
  const supportedBy = supportedBySlugs
    .map((sslug) => allSources.find((s) => s.slug === sslug))
    .filter((src) => src && !src.localOnly) // FILTER local-only from web output
    .map((src) => ({
      slug: src.slug,
      title: src.title,
      role: src.role,
      visibility: "public",
    }));

  const relatedConceptsRaw = Array.isArray(fm.related_concepts) ? fm.related_concepts : [];
  const relatedConcepts = relatedConceptsRaw
    .map(wikilinkToSlug)
    .filter((s) => eligibleConceptSlugs.has(s))
    .map((s) => ({ slug: s, route: `/dat110/begreper/${s}` }));

  const relatedTopicsRaw = Array.isArray(fm.related_topics) ? fm.related_topics : [];
  const relatedTopics = relatedTopicsRaw
    .map(wikilinkToSlug)
    .filter((s) => eligibleTopicSlugs.has(s))
    .map((s) => ({ slug: s, route: `/dat110/temaer/${s}` }));

  const body = resolveBodyWikilinks(raw.body, wikiIndex, unmappedSink);

  return {
    slug: raw.slug,
    tema: fm.tema || "unknown",
    status: fm.status === "reviewed" ? "reviewed" : "drafted",
    title: raw.title,
    sections: Array.isArray(fm.sections) ? fm.sections : [],
    supportedBy,
    relatedConcepts,
    relatedTopics,
    body,
    created: fm.created || "",
  };
}

// ---- Filter-report helper ------------------------------------------------

function determineSupportedByFiltered(rawEntries, allSources) {
  // Sources referenced by Tier 1 entries but filtered because local-only.
  const supportedSlugs = new Set();
  for (const e of rawEntries) {
    const fmSupported = e.frontmatter.supported_by;
    if (Array.isArray(fmSupported)) {
      for (const s of fmSupported) supportedSlugs.add(s);
    }
  }
  const filtered = [];
  for (const slug of supportedSlugs) {
    const src = allSources.find((s) => s.slug === slug);
    if (src && src.localOnly) {
      filtered.push({
        slug: src.slug,
        title: src.title,
        role: src.role,
        reason: src.fmLocalOnly
          ? "frontmatter local_only: true"
          : "known local-only allow-list",
      });
    }
  }
  return filtered;
}

// ---- Exam loading + structural validation -------------------------------
// Exam JSONs are hand-curated (not generated from vault frontmatter).
// Sync verifies each declared exam exists + has required structural fields.
// learnMoreLinks are validated by scripts/validate-learnmore-links.mjs.

function loadAndValidateExams() {
  const exams = [];
  const errors = [];

  for (const { slug, file } of EXAM_DATA_FILES) {
    const path = join(process.cwd(), "src/data/dat110-vault", file);
    if (!existsSync(path)) {
      errors.push(`Exam file missing: ${file}`);
      continue;
    }
    let data;
    try {
      data = JSON.parse(readFileSync(path, "utf-8"));
    } catch (e) {
      errors.push(`Exam JSON parse failed: ${file} — ${e.message}`);
      continue;
    }

    // Required top-level fields
    const required = [
      "slug",
      "year",
      "session",
      "displayLabel",
      "pairStatus",
      "sensorSlug",
      "totalWeight",
      "questions",
    ];
    for (const k of required) {
      if (!(k in data)) errors.push(`${file}: missing field '${k}'`);
    }

    if (data.slug !== slug) {
      errors.push(`${file}: slug mismatch — file says '${data.slug}', declared '${slug}'`);
    }

    // Reconstructed-banner safety: if reconstructedFromSensor:true, bannerWarning must be set
    if (data.reconstructedFromSensor === true) {
      if (!data.bannerWarning || String(data.bannerWarning).trim() === "") {
        errors.push(
          `${file}: reconstructedFromSensor=true but bannerWarning is missing/empty`
        );
      }
      if (data.pairStatus !== "reconstructed_from_incomplete_pair") {
        errors.push(
          `${file}: reconstructedFromSensor=true but pairStatus is '${data.pairStatus}' (expected 'reconstructed_from_incomplete_pair')`
        );
      }
    }

    // Each question must have at least one solution (top-level OR per-subquestion)
    if (Array.isArray(data.questions)) {
      for (const q of data.questions) {
        const hasTopSolution =
          q.solution && typeof q.solution.expectedAnswer === "string" &&
          q.solution.expectedAnswer.trim() !== "";
        const subsHaveSolutions =
          Array.isArray(q.subquestions) && q.subquestions.length > 0 &&
          q.subquestions.every(
            (s) => s.solution && typeof s.solution.expectedAnswer === "string" &&
              s.solution.expectedAnswer.trim() !== ""
          );
        if (!hasTopSolution && !subsHaveSolutions) {
          errors.push(
            `${file}: Q${q.number} has no solution (neither top-level nor per-subquestion)`
          );
        }
      }
    }

    exams.push(data);
  }

  return { exams, errors };
}

function buildExamsIndex(exams) {
  return {
    exams: exams.map((e) => ({
      slug: e.slug,
      year: e.year,
      session: e.session,
      displayLabel: e.displayLabel,
      pairStatus: e.pairStatus,
      reconstructedFromSensor: e.reconstructedFromSensor ?? false,
      questionCount: Array.isArray(e.questions) ? e.questions.length : 0,
      totalWeight: e.totalWeight,
    })),
  };
}

// ---- Main ----------------------------------------------------------------

function main() {
  // Sanity-check vault
  if (!existsSync(VAULT_REVIEWED)) {
    console.error(`Vault not found at ${VAULT_REVIEWED}`);
    console.error("Set VAULT_ROOT env var if vault is elsewhere.");
    process.exit(2);
  }

  // Load all sources first (for grounding lookup + filter report)
  const allSources = loadAllSources();
  const allLocalOnlySources = allSources.filter((s) => s.localOnly);

  // Load Tier 1 concepts + topics
  const conceptsRaw = TIER1_CONCEPTS.map((slug) => ({
    slug,
    ...loadVaultEntry("concepts", slug),
  }));
  const topicsRaw = TIER1_TOPICS.map((slug) => ({
    slug,
    ...loadVaultEntry("topics", slug),
  }));

  // Build wikilink-index (P0a covers only Tier 1; P0b adds exam routes)
  const eligibleConceptSlugs = new Set(TIER1_CONCEPTS);
  const eligibleTopicSlugs = new Set(TIER1_TOPICS);
  const examSlugs = EXAM_DATA_FILES.map((e) => e.slug);
  const wikiIndex = buildWikilinkIndex(TIER1_CONCEPTS, TIER1_TOPICS, examSlugs);

  // Track unmapped wikilinks across all entries for reporting
  const unmappedWikilinks = [];

  // Build output entries (with local-only filtering on supportedBy)
  const concepts = conceptsRaw.map((c) =>
    buildEntry(c, allSources, wikiIndex, eligibleConceptSlugs, eligibleTopicSlugs, unmappedWikilinks)
  );
  const topics = topicsRaw.map((t) =>
    buildEntry(t, allSources, wikiIndex, eligibleConceptSlugs, eligibleTopicSlugs, unmappedWikilinks)
  );

  // Compute filter report — which local-only sources WOULD have been included
  // by Tier 1 entries but were excluded
  const filteredSupportingTier1 = determineSupportedByFiltered(
    [...conceptsRaw, ...topicsRaw],
    allSources
  );

  // Load + validate hand-curated exam JSONs (P0b: V2024)
  const { exams, errors: examErrors } = loadAndValidateExams();
  if (examErrors.length > 0) {
    console.error("Exam structural validation failed:");
    for (const e of examErrors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  // Write output
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(
    join(OUT_DIR, "concepts-tier1.json"),
    JSON.stringify({ concepts }, null, 2) + "\n"
  );
  writeFileSync(
    join(OUT_DIR, "topics-tier1.json"),
    JSON.stringify({ topics }, null, 2) + "\n"
  );
  writeFileSync(
    join(OUT_DIR, "_wikilink-index.json"),
    JSON.stringify({ routes: wikiIndex }, null, 2) + "\n"
  );
  // exams-index.json: list of all exam slugs + summary metadata (loader uses this
  // to build generateStaticParams for the dynamic /dat110/eksamen/[slug] route).
  writeFileSync(
    join(OUT_DIR, "exams-index.json"),
    JSON.stringify(buildExamsIndex(exams), null, 2) + "\n"
  );
  // Sanitize vault path in meta (avoid leaking $HOME / per-user paths into committed JSON)
  const sanitizedVaultPath = VAULT_REVIEWED.includes("ObsidianVault")
    ? "ObsidianVault/" + VAULT_REVIEWED.split("ObsidianVault/")[1]
    : "<external-vault>";

  const meta = {
    syncedAt: new Date().toISOString(),
    vaultPath: sanitizedVaultPath,
    counts: {
      conceptsTier1: concepts.length,
      topicsTier1: topics.length,
      sourcesScanned: allSources.length,
      sourcesFilteredLocalOnly: allLocalOnlySources.length,
      wikilinkRoutes: Object.keys(wikiIndex).length,
      unmappedWikilinksInBodies: unmappedWikilinks.length,
      exams: exams.length,
    },
  };
  writeFileSync(join(OUT_DIR, "_meta.json"), JSON.stringify(meta, null, 2) + "\n");

  // ---- Report -----------------------------------------------------------

  const log = (s) => process.stdout.write(s + "\n");

  log("=== DAT110 vault → web sync ===");
  log(`Synced at: ${meta.syncedAt}`);
  log(`Vault:     ${VAULT_REVIEWED}`);
  log(`Output:    ${OUT_DIR}`);
  log("");

  log(`Tier 1 concepts loaded: ${concepts.length}/${TIER1_CONCEPTS.length}`);
  for (const c of concepts) {
    log(`  ✓ ${c.slug.padEnd(32)} tema=${c.tema}  sources=${c.supportedBy.length}  related=${c.relatedConcepts.length}c/${c.relatedTopics.length}t`);
  }
  log("");

  log(`Tier 1 topics loaded: ${topics.length}/${TIER1_TOPICS.length}`);
  for (const t of topics) {
    log(`  ✓ ${t.slug.padEnd(32)} tema=${t.tema}  sources=${t.supportedBy.length}  related=${t.relatedConcepts.length}c/${t.relatedTopics.length}t`);
  }
  log("");

  log(`Source-notes scanned in vault: ${allSources.length}`);
  log(`Total local-only sources in vault: ${allLocalOnlySources.length}`);
  if (allLocalOnlySources.length > 0) {
    log("  All local-only / copyright-sensitive sources (NEVER exported to web):");
    for (const s of allLocalOnlySources) {
      const flagged = s.fmLocalOnly ? "frontmatter" : "allow-list";
      log(`    🔒 ${s.slug}`);
      log(`         title:  ${s.title}`);
      log(`         role:   ${s.role}`);
      log(`         reason: ${flagged}`);
    }
  } else {
    log("  WARNING: no local-only sources detected in vault — expected ≥6");
    log("  Check vault frontmatter for: " + [...KNOWN_LOCAL_ONLY].join(", "));
  }
  log("");

  log(`Local-only sources referenced by Tier 1 entries (filtered from output): ${filteredSupportingTier1.length}`);
  if (filteredSupportingTier1.length > 0) {
    for (const s of filteredSupportingTier1) {
      log(`    🔒 ${s.slug} — ${s.title}  (reason: ${s.reason})`);
    }
  } else {
    log("  (none — Tier 1 entries don't cite any local-only source)");
  }
  log("");

  log(`Wikilink routes registered: ${Object.keys(wikiIndex).length}`);
  for (const [target, route] of Object.entries(wikiIndex)) {
    log(`  ${target.padEnd(48)} → ${route}`);
  }
  log("");

  log(`Body wikilinks rendered as italic stubs (unmapped): ${unmappedWikilinks.length}`);
  if (unmappedWikilinks.length > 0) {
    const byReason = {};
    const byTarget = {};
    for (const u of unmappedWikilinks) {
      byReason[u.reason] = (byReason[u.reason] || 0) + 1;
      byTarget[u.target] = (byTarget[u.target] || 0) + 1;
    }
    log("  By reason:");
    for (const [reason, count] of Object.entries(byReason).sort((a, b) => b[1] - a[1])) {
      log(`    ${reason.padEnd(48)} ${count}`);
    }
    log("  Top 15 unmapped targets:");
    const top = Object.entries(byTarget).sort((a, b) => b[1] - a[1]).slice(0, 15);
    for (const [target, count] of top) {
      log(`    [[${target}]]`.padEnd(50) + ` ×${count}`);
    }
  }
  log("");

  log(`Exams loaded + validated: ${exams.length}`);
  for (const e of exams) {
    const qCount = Array.isArray(e.questions) ? e.questions.length : 0;
    const subTotal = (e.questions || []).reduce(
      (sum, q) => sum + (Array.isArray(q.subquestions) ? q.subquestions.length : 0),
      0
    );
    const recon = e.reconstructedFromSensor === true ? " ⚠ RECONSTRUCTED" : "";
    log(`  ✓ ${e.slug}${recon}  (${qCount} oppgaver, ${subTotal} subspørsmål, totalWeight=${e.totalWeight}%)`);
  }
  log("");

  log("Output files:");
  log("  - concepts-tier1.json");
  log("  - topics-tier1.json");
  log("  - exams-index.json");
  log("  - _wikilink-index.json");
  log("  - _meta.json");
}

main();
