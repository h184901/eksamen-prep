"use client";

import { useRef, useState } from "react";
import { useProgress } from "@/components/ProgressProvider";

export function PilotStatus({ pageKey, short = false, current = false }: { pageKey: string; short?: boolean; current?: boolean }) {
  const { ready, authed, loadError, isCompleted } = useProgress();
  const done = ready && authed && !loadError && isCompleted(pageKey);
  const label = !ready ? "Laster status" : !authed || loadError ? "Status utilgjengelig" : done ? "Fullført" : "Ikke fullført";
  return <span className="egb-pilot-status" data-complete={done}>
    <span aria-hidden="true">{!ready || !authed || loadError ? "·" : done ? "✓" : current ? "●" : "○"}</span>
    <span className={short ? "sr-only" : undefined}>{label}</span>
  </span>;
}

export default function Egb339PilotProgress({ pageKey }: { pageKey: string }) {
  const { ready, authed, loadError, isCompleted, refresh } = useProgress();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);
  const done = isCompleted(pageKey);

  async function save() {
    if (pending.current || !ready || (!authed && !loadError)) return;
    pending.current = true;
    setSaving(true);
    setError("");
    try {
      if (loadError) {
        // Retry the read only: a preceding write may already have succeeded.
        if (!await refresh()) setError("Status kunne ikke hentes. Prøv igjen.");
        return;
      }
      // Same API/key as the original control. No optimistic success on a failed write.
      const response = await fetch("/api/progress", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ pageKey, completed: !done }),
      });
      if (!response.ok) throw new Error("save failed");
      if (!await refresh()) setError("Lagringen ble mottatt, men status kunne ikke bekreftes. Oppdater status før du gjør en ny endring.");
    } catch {
      setError("Fremgangen ble ikke lagret. Prøv igjen.");
    } finally {
      pending.current = false;
      setSaving(false);
    }
  }
  return <div className="egb-pilot-completion">
    <p role="status"><PilotStatus pageKey={pageKey} /></p>
    <button type="button" onClick={save} disabled={!ready || (!authed && !loadError) || saving} className="egb-pilot-button">
      {saving ? loadError ? "Henter status…" : "Lagrer…" : loadError ? "Oppdater status" : done ? "Angre fullføring" : "Marker fullført"}
    </button>
    {error && <p role="alert" className="egb-pilot-error">{error}</p>}
    {loadError && !error && <p role="alert" className="egb-pilot-error">Fremgangen kunne ikke hentes. Oppdater status for å prøve igjen.</p>}
    {ready && !authed && !loadError && <p>Logg inn på nytt for å lagre fremgangen.</p>}
  </div>;
}
