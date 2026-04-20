"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm({
  existingUsernames,
}: {
  existingUsernames: string[];
}) {
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          typeof data?.error === "string"
            ? data.error
            : "Kunne ikke logge inn.",
        );
        setSubmitting(false);
        return;
      }
      const next = params.get("next");
      router.replace(next && next.startsWith("/") ? next : "/");
      router.refresh();
    } catch {
      setError("Nettverksfeil — prøv igjen.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block">
        <span className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider">
          Brukernavn
        </span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          required
          minLength={2}
          maxLength={32}
          placeholder="f.eks. erlend"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="mt-1.5 w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm outline-none transition-colors focus:border-dat107-500 focus:ring-2 focus:ring-dat107-500/20"
        />
        <span className="mt-1.5 block text-[11px] text-[var(--muted)]">
          2–32 tegn, kun små bokstaver, tall, <code>-</code> og{" "}
          <code>_</code>.
        </span>
      </label>

      {existingUsernames.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
            Eksisterende brukere
          </p>
          <div className="flex flex-wrap gap-2">
            {existingUsernames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setUsername(name);
                  setError(null);
                }}
                className={`text-xs font-medium px-2.5 py-1.5 rounded-md border transition-colors ${
                  username === name
                    ? "border-dat107-500 bg-dat107-500/15 text-dat107-700 dark:text-dat107-200"
                    : "border-[var(--card-border)] hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || username.trim().length < 2}
        className="w-full bg-dat107-600 hover:bg-dat107-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 text-sm transition-colors"
      >
        {submitting ? "Logger inn…" : "Logg inn"}
      </button>

      <p className="text-[11px] text-[var(--muted)] leading-relaxed">
        Ingen passord. Første gang du bruker et brukernavn opprettes det
        automatisk. Innlogging varer i 180 dager eller til du logger ut.
      </p>
    </form>
  );
}
