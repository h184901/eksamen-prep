#!/usr/bin/env node
// DAT102 visual-asset validator (strict).
//
// Any image/asset reference in generated data (markdown image syntax, a
// figureAsset field, or a /dat102/... image path) must exist under public/.
// Phase 0 ships no assets, so this typically checks 0 refs — it exists so the
// guard is in place before Phase 1+ adds diagrams/figure crops.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { allDataFiles, makeReporter, studentFacingStrings } from "./dat102-validate-lib.mjs";

const r = makeReporter("validate-dat102-assets");

const PUBLIC = join(process.cwd(), "public");
const IMG_EXT = /\.(png|svg|jpe?g|webp|gif)$/i;

let checked = 0;
function checkPath(p, where) {
  checked++;
  if (!existsSync(join(PUBLIC, p.replace(/^\//, ""))))
    r.err(`${where}: missing asset public${p.startsWith("/") ? p : "/" + p}`);
}

for (const f of allDataFiles()) {
  const data = JSON.parse(readFileSync(f.path, "utf-8"));
  for (const [path, s] of studentFacingStrings(data)) {
    // markdown images: ![alt](/dat102/.../x.png)
    for (const m of s.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = m[1].split("#")[0];
      if (target.startsWith("http")) continue;
      if (IMG_EXT.test(target)) checkPath(target, `${f.name} ${path}`);
    }
    // bare /dat102 asset paths in strings
    for (const m of s.matchAll(/(\/dat102\/[^\s)"'`]+?\.(?:png|svg|jpe?g|webp|gif))/gi)) {
      checkPath(m[1], `${f.name} ${path}`);
    }
  }
  // dedicated figureAsset fields anywhere in the tree
  const walk = (node, p = "$") => {
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${p}[${i}]`));
    if (!node || typeof node !== "object") return;
    if (typeof node.figureAsset === "string") checkPath(node.figureAsset, `${f.name} ${p}`);
    for (const [k, v] of Object.entries(node)) walk(v, `${p}.${k}`);
  };
  walk(data);
}

r.finish(`${checked} asset refs checked`);
