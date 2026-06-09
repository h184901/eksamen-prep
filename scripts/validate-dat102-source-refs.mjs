#!/usr/bin/env node
// Every internalPath in generated DAT102 data (sourceMeta.refs, supportedBy,
// buildsOn) must point to an existing file in the vault. Runs against the
// local vault checkout ($DAT102_VAULT_ROOT). Fails on missing paths and on
// any reference into the copyrighted textbook or the raw export.

import { readFileSync } from "node:fs";
import {
  allDataFiles,
  makeReporter,
  vaultPathExists,
} from "./dat102-validate-lib.mjs";

const r = makeReporter("validate-dat102-source-refs");

let checked = 0;
function walk(node, file, path = "$") {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, file, `${path}[${i}]`));
    return;
  }
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (k === "internalPath" && typeof v === "string") {
      checked++;
      if (/course_files_export|\/Bok\//i.test(v))
        r.err(`${file} ${path}: forbidden raw/book ref: ${v}`);
      else if (!vaultPathExists(v)) r.err(`${file} ${path}: missing vault path: ${v}`);
      continue;
    }
    walk(v, file, `${path}.${k}`);
  }
}

for (const f of allDataFiles()) {
  walk(JSON.parse(readFileSync(f.path, "utf-8")), f.name);
}

r.finish(`${checked} internalPath refs checked`);
