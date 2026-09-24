"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LegacyProgressMigrator from "./dat107/LegacyProgressMigrator";
import { useEgb339Lang } from "@/lib/egb339-language/store";

export default function UserBadge() {
  const [username, setUsername] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useEgb339Lang();
  const english = pathname.startsWith("/egb339") && lang === "en";

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
      <button
        type="button"
        onClick={logout}
        disabled={loggingOut}
        aria-label={english ? "Log out" : "Logg ut"}
        title={english ? "Log out" : "Logg ut"}
        className="sm:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--card-border)] disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 17l5-5-5-5M15 12H3M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
        </svg>
      </button>
      <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm">
        <span className="hidden xl:inline text-[var(--muted)]">
          {english ? "Logged in as" : "Innlogget som"}
        </span>
        <span className="hidden xl:inline font-semibold">{username}</span>
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="text-[11px] font-medium px-2 py-1 rounded-md border border-[var(--card-border)] hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
        >
          {loggingOut ? "…" : english ? "Log out" : "Logg ut"}
        </button>
      </div>
    </>
  );
}
