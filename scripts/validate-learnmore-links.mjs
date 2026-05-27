#!/usr/bin/env node
// Strict validator: every learnMoreLink.href in src/data/dat110-vault/ must
// resolve to a registered route in _wikilink-index.json.
//
// In P0a this passes trivially because no quiz/exam JSON exists yet.
// In P0b/P0c, when learnMoreLinks appear, dead links fail the build.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "src/data/dat110-vault");
const INDEX_PATH = join(OUT_DIR, "_wikilink-index.json");

// Recursively collect all .json files under dir, excluding underscore-prefixed
// internal files (_meta, _wikilink-index).
function collectJsonFiles(dir, rootPrefix = "") {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = rootPrefix ? `${rootPrefix}/${entry}` : entry;
    if (statSync(full).isDirectory()) {
      out.push(...collectJsonFiles(full, rel));
      continue;
    }
    if (!entry.endsWith(".json")) continue;
    if (entry.startsWith("_")) continue;
    out.push({ relPath: rel, fullPath: full });
  }
  return out;
}

function main() {
  if (!existsSync(INDEX_PATH)) {
    console.error(`Wikilink-index not found at ${INDEX_PATH}.`);
    console.error("Run `npm run sync:dat110-vault` first.");
    process.exit(2);
  }

  const indexData = JSON.parse(readFileSync(INDEX_PATH, "utf-8"));
  const validRoutes = new Set(Object.values(indexData.routes || {}));

  const dataFiles = collectJsonFiles(OUT_DIR);

  let totalLinks = 0;
  const deadLinks = [];

  for (const { relPath, fullPath } of dataFiles) {
    let data;
    try {
      data = JSON.parse(readFileSync(fullPath, "utf-8"));
    } catch (e) {
      console.error(`Failed to parse ${relPath}: ${e.message}`);
      process.exit(2);
    }
    walkForLearnMoreLinks(data, "", (link, path) => {
      totalLinks++;
      const baseHref = String(link.href || "").split("#")[0];
      if (!validRoutes.has(baseHref)) {
        deadLinks.push({ file: relPath, path, label: link.label, href: link.href });
      }
    });
  }

  console.log(
    `Scanned ${totalLinks} learnMoreLink(s) across ${dataFiles.length} data file(s)`
  );
  if (deadLinks.length === 0) {
    console.log("✓ All learnMoreLinks resolve to registered routes");
    process.exit(0);
  }

  console.error(`✗ ${deadLinks.length} dead learnMoreLink(s):`);
  for (const d of deadLinks) {
    console.error(`  ${d.file}${d.path}: "${d.label}" → ${d.href}`);
  }
  process.exit(1);
}

function walkForLearnMoreLinks(node, path, cb) {
  if (Array.isArray(node)) {
    node.forEach((n, i) => walkForLearnMoreLinks(n, `${path}[${i}]`, cb));
    return;
  }
  if (node && typeof node === "object") {
    if (Array.isArray(node.learnMoreLinks)) {
      node.learnMoreLinks.forEach((link, i) =>
        cb(link, `${path}.learnMoreLinks[${i}]`)
      );
    }
    for (const [k, v] of Object.entries(node)) {
      if (k === "learnMoreLinks") continue;
      walkForLearnMoreLinks(v, `${path}.${k}`, cb);
    }
  }
}

main();
