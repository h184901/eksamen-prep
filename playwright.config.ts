import { defineConfig, devices } from "@playwright/test";

// The runner generates one disposable key before building. Playwright imports
// this config in more than one process, so generating a key here would break
// authentication between the test worker and its web server.
if (!process.env.EGB339_QA_SESSION_SECRET) {
  throw new Error("Run EGB339 browser QA through npm run test:egb339:e2e.");
}

// A test-signed session must never be accepted by a server with real data.
const databaseKeys = ["POSTGRES_URL", "POSTGRES_URL_NON_POOLING", "POSTGRES_PRISMA_URL", "DATABASE_URL", "NEON_DATABASE_URL"];
if (databaseKeys.some(key => process.env[key])) {
  throw new Error("EGB339 browser QA requires an isolated server without database credentials.");
}

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  outputDir: "/tmp/opencode/egb339-playwright-artifacts",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:3138",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run start -- -p 3138 -H 127.0.0.1",
    url: "http://127.0.0.1:3138/login",
    reuseExistingServer: false,
    timeout: 60000,
    env: {
      SESSION_SECRET: process.env.EGB339_QA_SESSION_SECRET,
      POSTGRES_URL: "",
      POSTGRES_URL_NON_POOLING: "",
      POSTGRES_PRISMA_URL: "",
      DATABASE_URL: "",
      NEON_DATABASE_URL: "",
      ANTHROPIC_API_KEY: "",
    },
  },
});
