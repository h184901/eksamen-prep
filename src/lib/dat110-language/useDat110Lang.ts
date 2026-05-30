"use client";

import { useSyncExternalStore } from "react";

// Per-user DAT110 language preference, stored locally (no DB).
// Default is "no" (the existing Norwegian site). "en" opts into the
// gradually-built English mode. Scope is DAT110 only — other subjects
// never read this value.
export type Dat110Lang = "no" | "en";

const KEY = "dat110-lang";
const listeners = new Set<() => void>();

export function readDat110Lang(): Dat110Lang {
  if (typeof window === "undefined") return "no";
  return window.localStorage.getItem(KEY) === "en" ? "en" : "no";
}

export function setDat110Lang(lang: Dat110Lang): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, lang);
  // Notify same-tab subscribers; the storage event only fires across tabs.
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

// getServerSnapshot returns "no" so SSR/hydration matches the default; the
// client re-renders to the stored value after hydration.
export function useDat110Lang(): {
  lang: Dat110Lang;
  setLang: (lang: Dat110Lang) => void;
} {
  const lang = useSyncExternalStore(
    subscribe,
    readDat110Lang,
    (): Dat110Lang => "no",
  );
  return { lang, setLang: setDat110Lang };
}
