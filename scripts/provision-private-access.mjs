// Explicit deployment preparation, not application startup. Never prints secrets.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { randomBytes, scryptSync } from "node:crypto";
const require = createRequire(import.meta.url);
require("@next/env").loadEnvConfig(process.cwd());
const { sql } = require("@vercel/postgres");
const directory = path.resolve(".private-access");
fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
const envFile = path.join(directory, "vercel-env.json");
let config;
if (fs.existsSync(envFile)) config = JSON.parse(fs.readFileSync(envFile, "utf8"));
else {
  const password = randomBytes(24).toString("base64url");
  const salt = randomBytes(16).toString("hex");
  config = { ADMIN_USERNAME: "erlend", ADMIN_PASSWORD_HASH: `scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}`, ACCESS_CODE_PEPPER: randomBytes(32).toString("hex") };
  fs.writeFileSync(envFile, JSON.stringify(config, null, 2) + "\n", { mode: 0o600, flag: "wx" });
  fs.writeFileSync(path.join(directory, "admin-credentials.txt"), `Admin: ${config.ADMIN_USERNAME}\nPassord: ${password}\nAdresse: https://eksamen-prep.vercel.app/admin/login\nOppbevar privat. Ikke commit eller send i chat.\n`, { mode: 0o600, flag: "wx" });
}
try {
  for (const file of ["db/schema.sql", "db/private-access.sql"]) {
    const source = fs.readFileSync(file, "utf8").replace(/^--.*$/gm, "");
    for (const statement of source.split(";").map(s => s.trim()).filter(Boolean)) await sql.query(statement);
  }
  const { rows } = await sql`INSERT INTO users(username) VALUES (${config.ADMIN_USERNAME}) ON CONFLICT(username) DO UPDATE SET username=EXCLUDED.username RETURNING id`;
  await sql`INSERT INTO access_accounts(user_id,role,code_hash,active) VALUES (${rows[0].id},'admin',NULL,true) ON CONFLICT(user_id) DO NOTHING`;
  console.log("Database prepared. Existing users/progress retained. Private bootstrap files: .private-access/");
} catch {
  console.error("Database preparation failed; no secrets logged. Verify POSTGRES_URL/access before deployment.");
  process.exitCode = 1;
}
