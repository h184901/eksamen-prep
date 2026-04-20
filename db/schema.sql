-- Eksamensøving — enkel brukeridentifisering og fremgangssporing
-- Kjør én gang mot PostgreSQL-instansen (Vercel Postgres / Neon).
-- Idempotent: trygt å kjøre flere ganger.

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  username   TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS page_progress (
  user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  page_key     TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, page_key)
);

CREATE INDEX IF NOT EXISTS page_progress_user_prefix_idx
  ON page_progress (user_id, page_key);
