import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import ts from "typescript";

// Content-only TypeScript modules, including their relative imports, `@/`
// path aliases and JSON data imports. No Next server, temporary compiled
// files or extra runtime dependencies are needed.
function dataModuleUrl(path) {
  if (path.endsWith(".json")) {
    // JSON modules become a JS module with a default export.
    const json = readFileSync(path, "utf8");
    return `data:text/javascript;base64,${Buffer.from(`export default ${json}`).toString("base64")}`;
  }
  const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  const linked = outputText.replace(/from ["']([^"']+)["']/g, (statement, specifier) => {
    if (specifier.startsWith("@/")) {
      return `from "${dataModuleUrl(resolve("src", specifier.slice(2)))}"`;
    }
    if (specifier.startsWith(".")) {
      const base = resolve(dirname(path), specifier);
      return `from "${dataModuleUrl(base.endsWith(".json") ? base : `${base}.ts`)}"`;
    }
    return statement;
  });
  return `data:text/javascript;base64,${Buffer.from(linked).toString("base64")}`;
}

export async function loadEgb339DataModule(path) {
  return import(dataModuleUrl(path));
}
