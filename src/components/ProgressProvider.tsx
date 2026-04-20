"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ProgressContextValue {
  ready: boolean;
  authed: boolean;
  completed: Set<string>;
  isCompleted: (pageKey: string) => boolean;
  toggle: (pageKey: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const pending = useRef<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.status === 401) {
        setAuthed(false);
        setCompleted(new Set());
        setReady(true);
        return;
      }
      if (!res.ok) {
        setReady(true);
        return;
      }
      const data = await res.json();
      const next = new Set<string>();
      if (Array.isArray(data?.rows)) {
        for (const row of data.rows) {
          if (row && typeof row.page_key === "string") next.add(row.page_key);
        }
      }
      setAuthed(true);
      setCompleted(next);
      setReady(true);
    } catch {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

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

  return (
    <ProgressContext.Provider
      value={{ ready, authed, completed, isCompleted, toggle, refresh }}
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
