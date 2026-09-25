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
      <div role="group" aria-label={english ? `Account: ${username}` : `Konto: ${username}`} className="flex shrink-0 items-center gap-1.5">
        <span title={username} className="hidden max-w-20 truncate text-sm font-semibold sm:inline">{username}</span>
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          aria-label={english ? "Log out" : "Logg ut"}
          title={english ? "Log out" : "Logg ut"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--card-border)] hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50 dark:hover:bg-neutral-800 sm:h-8 sm:w-8"
        >
          {loggingOut ? "…" : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 17l5-5-5-5M15 12H3M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
