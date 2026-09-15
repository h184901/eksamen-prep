"use client";

import { useEffect, useRef, useState } from "react";

/** A bounded DOM island owns the supplied teaching UI, never the surrounding course. */
export default function AssessmentGuideClient({ html }: { html: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    const host = root.current!;
    const abort = new AbortController();
    let dispose: (() => void) | undefined;
    host.innerHTML = html;
    host.dataset.ready = "false";
    const revealHash = () => {
      const raw = window.location.hash.slice(1);
      if (!raw) return;
      let id = raw;
      try { id = decodeURIComponent(raw); } catch { /* Treat malformed fragments as literal IDs. */ }
      const target = host.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (!target) return;
      let ancestor: HTMLElement | null = target;
      while (ancestor && ancestor !== host) {
        if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
        ancestor = ancestor.parentElement;
      }
      target.scrollIntoView({ block: "start", behavior: "instant" });
    };
    const pause = () => {
      const play = host.querySelector<HTMLButtonElement>("#trace-play");
      if (play?.getAttribute("aria-pressed") === "true") play.click();
    };
    Promise.all([
      fetch("/egb339/assessment-2-1/guide-data.json", { signal: abort.signal }).then(async response => {
        if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) throw new Error("Guide data unavailable");
        return response.json();
      }),
      import("./guide-runtime.js"),
    ]).then(([data, { mountGuide }]) => {
      if (abort.signal.aborted) return;
      const mounted = mountGuide(host, data);
      dispose = mounted.dispose;
      host.dataset.ready = "true";
      revealHash();
      window.dispatchEvent(new Event("egb339:sections-ready"));
      window.addEventListener("hashchange", revealHash, { signal: abort.signal });
      window.addEventListener("pagehide", pause, { signal: abort.signal });
      document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); }, { signal: abort.signal });
    }).catch(() => { if (!abort.signal.aborted) { host.dataset.ready = "false"; setError(true); } });
    return () => { abort.abort(); dispose?.(); };
  }, [html, attempt]);
  return <>
    {error && <div className="egb-guide-load-error" role="alert">
      <p>Kunne ikke laste den interaktive gjennomgangen. Prøv igjen, eller last ned Word-guiden over.</p>
      <button type="button" onClick={() => { setError(false); setAttempt(value => value + 1); }}>Prøv igjen</button>
    </div>}
    {/* React owns the host; the imported runtime exclusively owns its descendants.
        Reapplying SSR innerHTML on a cached route would erase initialized controls. */}
    <div ref={root} className="egb-guide-content" />
    <noscript><p>Slå på JavaScript for robotvisningen, kodeoppslaget og Word-kapitlene. Originaldokumentet kan lastes ned via knappen over.</p></noscript>
  </>;
}
