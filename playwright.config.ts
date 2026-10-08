import { defineConfig, devices } from "@playwright/test";
const baseURL = process.env.EGB339_QA_BASE_URL;
if (!baseURL || !baseURL.startsWith("https://") || /localhost|127\.0\.0\.1/.test(baseURL)) {
  throw new Error("Set EGB339_QA_BASE_URL to the approved remote HTTPS deployment. No local server/build.");
}
export default defineConfig({
  testDir: "./tests/e2e", fullyParallel: false, workers: 1, reporter: "list",
  outputDir: "/tmp/eksamen-prep-remote-qa",
  use: { ...devices["Desktop Chrome"], baseURL, channel: "chrome", screenshot: "off", trace: "off",
    extraHTTPHeaders: process.env.VERCEL_QA_BYPASS ? { "x-vercel-protection-bypass": process.env.VERCEL_QA_BYPASS } : {},
  },
});
