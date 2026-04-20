"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LegacyProgressMigrator from "./dat107/LegacyProgressMigrator";

export default function UserBadge() {
  const [username, setUsername] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setUsername(d?.user?.username ?? null);
        setLoaded(true);
      })
      .catch(() => {
        if (cancelled) return;
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  if (!loaded || !username) return null;

  return (
    <>
      <LegacyProgressMigrator username={username} />
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <span className="hidden sm:inline text-[var(--muted)]">
          Innlogget som
        </span>
        <span className="font-semibold">{username}</span>
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="text-[11px] font-medium px-2 py-1 rounded-md border border-[var(--card-border)] hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
        >
          {loggingOut ? "…" : "Logg ut"}
        </button>
      </div>
    </>
  );
}
