import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import "./egb339-qa-preflight.mjs";

const env = {
  ...process.env,
  EGB339_QA_SESSION_SECRET: randomBytes(32).toString("hex"),
  SESSION_SECRET: "",
  POSTGRES_URL: "",
  POSTGRES_URL_NON_POOLING: "",
  POSTGRES_PRISMA_URL: "",
  DATABASE_URL: "",
  NEON_DATABASE_URL: "",
  ANTHROPIC_API_KEY: "",
};

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { env, stdio: "inherit", ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
  env: { ...env, NODE_OPTIONS: "--max-old-space-size=3072" },
});
run(process.execPath, ["node_modules/@playwright/test/cli.js", "test", "tests/e2e/egb339.spec.ts"]);
