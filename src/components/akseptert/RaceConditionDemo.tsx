"use client";

import { useEffect, useRef, useState } from "react";

interface LogEntry {
  id: number;
  msg: string;
  kind: "request" | "response" | "set" | "stale";
  side: "unsafe" | "safe";
}

const mockProfiles: Record<string, { name: string; latencyMs: number }> = {
  alice: { name: "Alice (pro)", latencyMs: 2200 },
  bob: { name: "Bob (free)", latencyMs: 500 },
  carol: { name: "Carol (team)", latencyMs: 900 },
};

// Simulert fetchProfile med variabel latency per bruker.
function fakeFetchProfile(userId: string): Promise<{ name: string; userId: string }> {
  const latency = mockProfiles[userId]?.latencyMs ?? 800;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: mockProfiles[userId]?.name ?? "(ukjent)", userId });
    }, latency);
  });
}

export default function RaceConditionDemo() {
  const [currentUser, setCurrentUser] = useState<string>("alice");

  const [unsafeProfile, setUnsafeProfile] = useState<string | null>(null);
  const [safeProfile, setSafeProfile] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const nextIdRef = useRef(0);

  // Uten cleanup — kjør effekt når currentUser endrer seg
  useEffect(() => {
    const localUser = currentUser;
    const id = nextIdRef.current++;
    setLog((l) => [
      ...l,
      { id, kind: "request", side: "unsafe", msg: `→ fetch(${localUser})` },
    ]);
    fakeFetchProfile(localUser).then((data) => {
      setLog((l) => [
        ...l,
        { id, kind: "response", side: "unsafe", msg: `← svar for ${data.userId}` },
      ]);
      setUnsafeProfile(data.name);
      setLog((l) => [
        ...l,
        { id, kind: "set", side: "unsafe", msg: `setUnsafeProfile("${data.name}")` },
      ]);
    });
    // Ingen cleanup — dette er poenget
  }, [currentUser]);

  // Med cleanup — samme effekt, men med cancelled-flag
  useEffect(() => {
    let cancelled = false;
    const localUser = currentUser;
    const id = nextIdRef.current++;
    setLog((l) => [
      ...l,
      { id, kind: "request", side: "safe", msg: `→ fetch(${localUser})` },
    ]);
    fakeFetchProfile(localUser).then((data) => {
      if (cancelled) {
        setLog((l) => [
          ...l,
          {
            id,
            kind: "stale",
            side: "safe",
            msg: `⊘ svar for ${data.userId} ignorert (stale)`,
          },
        ]);
        return;
      }
      setLog((l) => [
        ...l,
        { id, kind: "response", side: "safe", msg: `← svar for ${data.userId}` },
      ]);
      setSafeProfile(data.name);
      setLog((l) => [
        ...l,
        { id, kind: "set", side: "safe", msg: `setSafeProfile("${data.name}")` },
      ]);
    });
    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  function pick(user: string) {
    setUnsafeProfile(null);
    setSafeProfile(null);
    setCurrentUser(user);
  }

  function reset() {
    setLog([]);
    setUnsafeProfile(null);
    setSafeProfile(null);
  }

  const unsafeLog = log.filter((l) => l.side === "unsafe").slice(-10);
  const safeLog = log.filter((l) => l.side === "safe").slice(-10);

  return (
    <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] overflow-hidden">
      {/* Kontroller */}
      <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 border-b border-[var(--card-border)]">
        <p className="text-xs font-semibold mb-2">
          Klikk raskt gjennom brukerne — helst Alice først, så Bob/Carol mens
          Alice fortsatt henter (Alice har lengst latency).
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(mockProfiles).map(([id, p]) => (
            <button
              key={id}
              type="button"
              onClick={() => pick(id)}
              className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors ${
                currentUser === id
                  ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/40"
                  : "border-[var(--card-border)] hover:border-akseptert-400/60"
              }`}
            >
              {id} ({p.latencyMs}ms)
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="text-xs px-3 py-1.5 rounded border border-[var(--card-border)] hover:bg-neutral-100 dark:hover:bg-neutral-800 ml-auto"
          >
            Nullstill loggen
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
        {/* Uten cleanup */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
              Uten cleanup
            </span>
            <p className="text-xs font-semibold">Bug-variant</p>
          </div>
          <div className="rounded-lg border-2 border-red-400/40 bg-red-50/50 dark:bg-red-950/20 p-4 mb-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              Nåværende valg i UI
            </p>
            <p className="text-lg font-bold">{currentUser}</p>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mt-2 mb-1">
              Viser profil fra state
            </p>
            <p className="text-sm font-mono">
              {unsafeProfile ?? <span className="text-[var(--muted)]">laster…</span>}
            </p>
            {unsafeProfile &&
              !unsafeProfile.toLowerCase().startsWith(currentUser) && (
                <p className="text-[11px] mt-2 font-bold text-red-700 dark:text-red-300">
                  ⚠ FEIL: viser {unsafeProfile}, men UI sier {currentUser}
                </p>
              )}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
            Logg
          </p>
          <div className="rounded bg-neutral-950 text-neutral-100 p-2 text-[11px] font-mono h-36 overflow-y-auto space-y-0.5">
            {unsafeLog.length === 0 ? (
              <p className="text-neutral-500">—</p>
            ) : (
              unsafeLog.map((e, i) => (
                <p
                  key={i}
                  className={
                    e.kind === "request"
                      ? "text-sky-300"
                      : e.kind === "response"
                        ? "text-emerald-300"
                        : e.kind === "set"
                          ? "text-akseptert-300"
                          : "text-neutral-500"
                  }
                >
                  {e.msg}
                </p>
              ))
            )}
          </div>
        </div>

        {/* Med cleanup */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              Med cleanup
            </span>
            <p className="text-xs font-semibold">Trygg variant</p>
          </div>
          <div className="rounded-lg border-2 border-emerald-400/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 mb-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              Nåværende valg i UI
            </p>
            <p className="text-lg font-bold">{currentUser}</p>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mt-2 mb-1">
              Viser profil fra state
            </p>
            <p className="text-sm font-mono">
              {safeProfile ?? <span className="text-[var(--muted)]">laster…</span>}
            </p>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
            Logg
          </p>
          <div className="rounded bg-neutral-950 text-neutral-100 p-2 text-[11px] font-mono h-36 overflow-y-auto space-y-0.5">
            {safeLog.length === 0 ? (
              <p className="text-neutral-500">—</p>
            ) : (
              safeLog.map((e, i) => (
                <p
                  key={i}
                  className={
                    e.kind === "request"
                      ? "text-sky-300"
                      : e.kind === "response"
                        ? "text-emerald-300"
                        : e.kind === "set"
                          ? "text-akseptert-300"
                          : "text-amber-300"
                  }
                >
                  {e.msg}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
