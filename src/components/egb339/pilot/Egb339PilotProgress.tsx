"use client";

import { useRef, useState } from "react";
import { useProgress } from "@/components/ProgressProvider";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { IconCheck } from "../icons";

export function PilotStatus({ pageKey, short = false, current = false }: { pageKey: string; short?: boolean; current?: boolean }) {
  const { ready, authed, loadError, isCompleted } = useProgress();
  const { lang } = useEgb339Lang();
  const done = ready && authed && !loadError && isCompleted(pageKey);
  const label = !ready ? ui(lang, "statusLoading") : !authed || loadError ? ui(lang, "statusUnavailable") : done ? ui(lang, "completed") : ui(lang, "notCompleted");
  return <span className="egb-pilot-status" data-complete={done}>
    <span aria-hidden="true">{!ready || !authed || loadError ? "·" : done ? "✓" : current ? "●" : "○"}</span>
    <span className={short ? "sr-only" : undefined}>{label}</span>
  </span>;
}

export default function Egb339PilotProgress({ pageKey }: { pageKey: string }) {
  const { ready, authed, loadError, isCompleted, refresh } = useProgress();
  const { lang } = useEgb339Lang();
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
        if (!await refresh()) setError(ui(lang, "fetchFailed"));
        return;
      }
      // Same API/key as the original control. No optimistic success on a failed write.
      const response = await fetch("/api/progress", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ pageKey, completed: !done }),
      });
      if (!response.ok) throw new Error("save failed");
      if (!await refresh()) setError(ui(lang, "saveUnconfirmed"));
    } catch {
      setError(ui(lang, "saveFailed"));
    } finally {
      pending.current = false;
      setSaving(false);
    }
  }
  return <div className="egb-pilot-completion">
    <p role="status"><PilotStatus pageKey={pageKey} /></p>
    <button type="button" onClick={save} disabled={!ready || (!authed && !loadError) || saving} className="egb-pilot-button">
      {!saving && !loadError && !done && <IconCheck />}
      {saving ? loadError ? ui(lang, "fetchingStatus") : ui(lang, "saving") : loadError ? ui(lang, "refreshStatus") : done ? ui(lang, "undoCompleted") : ui(lang, "markCompleted")}
    </button>
    {error && <p role="alert" className="egb-pilot-error">{error}</p>}
    {loadError && !error && <p role="alert" className="egb-pilot-error">{ui(lang, "progressFetchFailed")}</p>}
    {ready && !authed && !loadError && <p>{ui(lang, "loginToSave")}</p>}
  </div>;
}
