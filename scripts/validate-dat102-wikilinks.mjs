#!/usr/bin/env node
// DAT102 wikilink/route validator (strict — dead links fail).
//
//   - _wikilink-index routes are well-formed (/dat102/...) and collision-free
//   - alias targets resolve to a known route
//   - anchors are well-formed hrefs
//   - every learnMoreLink.href in every dataset resolves to a known
//     route/anchor base
//   - no unresolved "[[" remains in any body
//   - every internal /dat102/... markdown link inside bodies resolves

import { readFileSync } from "node:fs";
import { allDataFiles, load, makeReporter } from "./dat102-validate-lib.mjs";

const r = makeReporter("validate-dat102-wikilinks");

const index = load("_wikilink-index.json");
const routes = index.routes || {};
const aliases = index.aliases || {};
const anchors = index.anchors || {};

// ---- index integrity ----
const seen = new Set();
for (const [target, route] of Object.entries(routes)) {
  if (!route.startsWith("/dat102/")) r.err(`route for ${target} not under /dat102/: ${route}`);
  if (seen.has(route)) r.err(`route collision: ${route}`);
  seen.add(route);
}
for (const [alias, target] of Object.entries(aliases)) {
  if (target !== "syllabus" && !routes[target] && !anchors[alias])
    r.err(`alias "${alias}" -> unknown target ${target}`);
}
for (const [key, href] of Object.entries(anchors)) {
  if (!href.startsWith("/dat102/")) r.err(`anchor ${key} not under /dat102/: ${href}`);
}

// Valid link bases = all route bases + all anchor bases.
const validBases = new Set(
  [...Object.values(routes), ...Object.values(anchors)].map((h) => h.split("#")[0])
);

// ---- learnMoreLinks across all datasets ----
let links = 0;
function checkNode(node, file, path = "$") {
  if (Array.isArray(node)) {
    node.forEach((v, i) => checkNode(v, file, `${path}[${i}]`));
    return;
  }
  if (!node || typeof node !== "object") return;
  if (typeof node.href === "string" && typeof node.label === "string") {
    links++;
    if (!validBases.has(node.href.split("#")[0]))
      r.err(`${file} ${path}: dead learnMore href ${node.href}`);
  }
  for (const [k, v] of Object.entries(node)) checkNode(v, file, `${path}.${k}`);
}

// ---- bodies: no leftover wikilinks, internal links resolve ----
function checkBody(body, where) {
  if (body.includes("[[")) r.err(`${where}: unresolved wikilink remains`);
  for (const m of body.matchAll(/\]\((\/dat102\/[^)#\s]+)(?:#[^)]*)?\)/g)) {
    if (!validBases.has(m[1])) r.err(`${where}: dead internal link ${m[1]}`);
  }
}

for (const f of allDataFiles()) {
  const data = JSON.parse(readFileSync(f.path, "utf-8"));
  checkNode(data, f.name);
  for (const c of data.concepts || []) checkBody(c.body, `${f.name}/${c.slug}`);
  for (const t of data.topics || []) checkBody(t.body, `${f.name}/${t.slug}`);
  for (const p of data.patterns || []) checkBody(p.body, `${f.name}/${p.slug}`);
}

r.finish(
  `${Object.keys(routes).length} routes, ${Object.keys(aliases).length} aliases, ${Object.keys(anchors).length} anchors, ${links} learnMore links`
);
