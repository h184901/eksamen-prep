import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import ts from "typescript";

// Content-only TypeScript modules, including their relative imports. No Next
// server, temporary compiled files or extra runtime dependencies are needed.
function dataModuleUrl(path) {
  const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  const linked = outputText.replace(/from ["'](\.[^"']+)["']/g, (_, specifier) =>
    `from "${dataModuleUrl(resolve(dirname(path), `${specifier}.ts`))}"`,
  );
  return `data:text/javascript;base64,${Buffer.from(linked).toString("base64")}`;
}

export async function loadEgb339DataModule(path) {
  return import(dataModuleUrl(path));
}
