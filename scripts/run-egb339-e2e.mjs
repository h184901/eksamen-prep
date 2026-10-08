// Remote-only runner. No local build, server, fake cookies or auth bypass.
import { spawnSync } from "node:child_process";
const url = process.env.EGB339_QA_BASE_URL;
if (!url || !url.startsWith("https://") || /localhost|127\.0\.0\.1/.test(url)) {
  throw new Error("Set EGB339_QA_BASE_URL to a remote HTTPS deployment.");
}
const result = spawnSync(process.execPath, ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)], { env: process.env, stdio: "inherit" });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
