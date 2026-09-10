"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

interface ProgressContextValue {
  ready: boolean;
  authed: boolean;
  loadError: boolean;
  completed: Set<string>;
  isCompleted: (pageKey: string) => boolean;
  toggle: (pageKey: string) => Promise<void>;
  markCompleted: (pageKey: string) => Promise<void>;
  refresh: () => Promise<boolean>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const pending = useRef<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.status === 401) {
        setLoadError(false);
        setAuthed(false);
        setCompleted(new Set());
        setReady(true);
        return false;
      }
      if (!res.ok) {
        setLoadError(true);
        setReady(true);
        return false;
      }
      const data = await res.json();
      if (!Array.isArray(data?.rows)) throw new Error("Invalid progress response");
      const next = new Set<string>();
      if (Array.isArray(data?.rows)) {
        for (const row of data.rows) {
          if (row && typeof row.page_key === "string") next.add(row.page_key);
        }
      }
      setAuthed(true);
      setLoadError(false);
      setCompleted(next);
      setReady(true);
      return true;
    } catch {
      setLoadError(true);
      setReady(true);
      return false;
    }
  }, []);

  useEffect(() => {
    // Innloggingssiden er den eneste offentlige siden. Et progress-kall her
    // kan aldri lykkes og ga tidligere en forventet, men støyende 401-feil i
    // nettleserkonsollen før brukeren hadde rukket å logge inn.
    if (pathname === "/login") {
      setLoadError(false);
      setAuthed(false);
      setCompleted(new Set());
      setReady(true);
      return;
    }
    refresh();
  }, [pathname, refresh]);

  const toggle = useCallback(
    async (pageKey: string) => {
      if (!pageKey || pending.current.has(pageKey)) return;
      pending.current.add(pageKey);
      const currentlyCompleted = completed.has(pageKey);
      const nextCompleted = !currentlyCompleted;

      setCompleted((prev) => {
        const n = new Set(prev);
        if (nextCompleted) n.add(pageKey);
        else n.delete(pageKey);
        return n;
      });

      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ pageKey, completed: nextCompleted }),
        });
        if (!res.ok) throw new Error("save failed");
      } catch {
        setCompleted((prev) => {
          const n = new Set(prev);
          if (currentlyCompleted) n.add(pageKey);
          else n.delete(pageKey);
          return n;
        });
      } finally {
        pending.current.delete(pageKey);
      }
    },
    [completed],
  );

  const isCompleted = useCallback(
    (pageKey: string) => completed.has(pageKey),
    [completed],
  );

  const markCompleted = useCallback(
    async (pageKey: string) => {
      if (!pageKey || pending.current.has(pageKey)) return;
      if (completed.has(pageKey)) return;
      pending.current.add(pageKey);

      setCompleted((prev) => {
        const n = new Set(prev);
        n.add(pageKey);
        return n;
      });

      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ pageKey, completed: true }),
        });
        if (!res.ok) throw new Error("save failed");
      } catch {
        setCompleted((prev) => {
          const n = new Set(prev);
          n.delete(pageKey);
          return n;
        });
      } finally {
        pending.current.delete(pageKey);
      }
    },
    [completed],
  );

  return (
    <ProgressContext.Provider
      value={{
        ready,
        authed,
        loadError,
        completed,
        isCompleted,
        toggle,
        markCompleted,
        refresh,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const v = useContext(ProgressContext);
  if (!v) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return v;
}
