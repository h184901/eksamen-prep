-- Additive and idempotent. Existing users and page_progress are untouched.
CREATE TABLE IF NOT EXISTS access_accounts (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('member', 'admin')),
  code_hash TEXT UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true,
  generation INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK ((role = 'member' AND code_hash IS NOT NULL) OR (role = 'admin' AND code_hash IS NULL))
);
CREATE TABLE IF NOT EXISTS auth_sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES access_accounts(user_id) ON DELETE CASCADE,
  generation INTEGER NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS auth_sessions_expiry_idx ON auth_sessions(expires_at);
CREATE TABLE IF NOT EXISTS auth_rate_buckets (
  bucket_hash TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
-- Keep retired digests too: a revoked/replaced credential must never return.
CREATE TABLE IF NOT EXISTS issued_access_codes (
  code_hash TEXT PRIMARY KEY,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
INSERT INTO issued_access_codes (code_hash)
SELECT code_hash FROM access_accounts WHERE code_hash IS NOT NULL
ON CONFLICT (code_hash) DO NOTHING;
