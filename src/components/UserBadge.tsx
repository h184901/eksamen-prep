"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LegacyProgressMigrator from "./dat107/LegacyProgressMigrator";
import { useEgb339Lang } from "@/lib/egb339-language/store";

export default function UserBadge() {
  const [username, setUsername] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
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
        setAdmin(d?.user?.role === "admin");
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
      const response = await fetch("/api/auth/logout", { method: "POST" });
      const result = await response.json().catch(() => null);
      // A full navigation drops already loaded private content and distinguishes
      // local cookie clearance from an unconfirmed server-side revocation.
      if ((response.ok && result?.ok === true) || (response.status === 503 && result?.browserSessionCleared === true)) {
        window.location.replace(response.ok ? "/login" : "/login?logout=failed");
      } else { throw new Error("Logout rejected"); }
    } catch {
      setLogoutError(english ? "Logout failed. Check your connection and try again." : "Utlogging mislyktes. Kontroller forbindelsen og prøv igjen.");
      setLoggingOut(false);
    }
  }

  if (!loaded || !username) return null;

  return (
    <>
      <LegacyProgressMigrator username={username} />
      {logoutError && <span role="alert" className="text-sm text-red-600 dark:text-red-300">{logoutError}</span>}
      <div role="group" aria-label={english ? `Account: ${username}` : `Konto: ${username}`} className="flex shrink-0 items-center gap-1.5">
        {admin && <a href="/admin" className="px-2 text-sm underline">Admin</a>}
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
