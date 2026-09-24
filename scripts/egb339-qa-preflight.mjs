import { existsSync } from "node:fs";

// Next loads local .env files during `next build`, before the Playwright config
// runs. Never run browser QA against a build with real credentials available.
const envFiles = [".env", ".env.local", ".env.production", ".env.production.local"];
const secrets = [
  "POSTGRES_URL", "POSTGRES_URL_NON_POOLING", "POSTGRES_PRISMA_URL",
  "DATABASE_URL", "NEON_DATABASE_URL", "ANTHROPIC_API_KEY", "SESSION_SECRET",
];
if (envFiles.some(existsSync) || secrets.some(key => process.env[key])) {
  throw new Error("EGB339 browser QA needs an isolated checkout with no database or production credentials.");
}
