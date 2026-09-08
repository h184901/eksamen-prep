#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "src/data/egb339-vault");

function read(file, key) {
  const parsed = JSON.parse(readFileSync(join(DATA_DIR, file), "utf8"));
  return key ? parsed[key] : parsed;
}

const groups = [
  ["weeks", read("weeks.json", "weeks")],
  ["concepts", read("concepts.json", "concepts")],
  ["assessments", read("assessments.json", "assessments")],
  ["resources", read("resources.json", "resources")],
];
const all = groups.flatMap(([, entries]) => entries);
const errors = [];
const meta = read("_meta.json");

for (const [name, entries] of groups) {
  if (!Array.isArray(entries) || entries.length === 0) {
    errors.push(`${name}: no entries`);
    continue;
  }
  for (const entry of entries) {
    for (const field of ["slug", "title", "kind", "route", "summary", "body"]) {
      if (!entry[field]) errors.push(`${name}/${entry.slug || "unknown"}: missing ${field}`);
    }
    if (/!\[\[|\[\[[^\]]+\]\]|raw\//.test(entry.body)) {
      errors.push(`${name}/${entry.slug}: raw Obsidian reference leaked into body`);
    }
  }
}

if (meta.unresolvedLinks?.length) {
  errors.push(`unresolved wikilinks: ${meta.unresolvedLinks.join(", ")}`);
}

const validRoutes = new Set([
  "/egb339",
  "/egb339/uker",
  "/egb339/temaer",
  "/egb339/vurderinger",
  "/egb339/ressurser",
  "/egb339/oppsummering",
  ...all.map((entry) => entry.route),
]);
for (const entry of all) {
  for (const match of entry.body.matchAll(/\]\((\/egb339\/[^)#]+)(?:#[^)]+)?\)/g)) {
    if (!validRoutes.has(match[1])) {
      errors.push(`${entry.route}: broken internal link ${match[1]}`);
    }
    if (match[1] === entry.route && !match[0].includes("#")) {
      errors.push(`${entry.route}: redundant self-link`);
    }
  }
}

for (const field of ["slug", "route"]) {
  const seen = new Map();
  for (const entry of all) {
    const key = entry[field];
    if (seen.has(key)) {
      errors.push(`duplicate ${field}: ${key} (${seen.get(key)} and ${entry.title})`);
    } else {
      seen.set(key, entry.title);
    }
  }
}

const weeks = groups[0][1];
for (let i = 1; i < weeks.length; i += 1) {
  if (Number(weeks[i - 1].week) >= Number(weeks[i].week)) {
    errors.push("weeks are not in ascending order");
    break;
  }
}

if (errors.length) {
  console.error(`EGB339 validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`EGB339 validation passed for ${all.length} public entries.`);
