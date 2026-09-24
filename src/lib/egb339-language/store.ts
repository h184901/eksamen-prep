"use client";

import { useSyncExternalStore } from "react";

// EGB339 language preference, stored locally (no DB). Default is "no"
// (the authored Norwegian content); "en" switches the whole EGB339 section
// to English. Scope is EGB339 only — other subjects never read this value.
export type Egb339Lang = "no" | "en";

const KEY = "egb339-lang";
const listeners = new Set<() => void>();

export function readEgb339Lang(): Egb339Lang {
  if (typeof window === "undefined") return "no";
  return window.localStorage.getItem(KEY) === "en" ? "en" : "no";
}

export function setEgb339Lang(lang: Egb339Lang): void {
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
export function useEgb339Lang(): {
  lang: Egb339Lang;
  setLang: (lang: Egb339Lang) => void;
} {
  const lang = useSyncExternalStore(
    subscribe,
    readEgb339Lang,
    (): Egb339Lang => "no",
  );
  return { lang, setLang: setEgb339Lang };
}

/** Pick the active variant; falls back to Norwegian when English is missing. */
export function pickLang<T>(lang: Egb339Lang, no: T, en: T | null | undefined): T {
  return lang === "en" && en != null ? en : no;
}
