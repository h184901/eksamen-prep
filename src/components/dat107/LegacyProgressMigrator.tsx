"use client";

import { useEffect, useRef } from "react";
import { useProgress } from "@/components/ProgressProvider";

const MIGRATION_FLAG = "migrated-dat107-v1";

export default function LegacyProgressMigrator({
  username,
}: {
  username: string | null;
}) {
  const { refresh } = useProgress();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    if (username !== "erlend") return;
    if (typeof window === "undefined") return;

    ran.current = true;

    try {
      if (localStorage.getItem(MIGRATION_FLAG)) return;
    } catch {
      return;
    }

    const keys: string[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        const m = /^progress-dat107-(.+)$/.exec(k);
        if (!m) continue;
        const area = m[1];
        try {
          const raw = localStorage.getItem(k);
          if (!raw) continue;
          const arr = JSON.parse(raw);
          if (!Array.isArray(arr)) continue;
          for (const topic of arr) {
            if (typeof topic === "string" && topic.length > 0) {
              keys.push(`dat107/${area}/${topic}`);
            }
          }
        } catch {
          // skip corrupt entry
        }
      }
    } catch {
      return;
    }

    if (keys.length === 0) {
      try {
        localStorage.setItem(MIGRATION_FLAG, "1");
      } catch {
        // ignore quota
      }
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/progress/migrate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ pageKeys: keys }),
        });
        if (res.ok) {
          try {
            localStorage.setItem(MIGRATION_FLAG, "1");
          } catch {
            // ignore
          }
          await refresh();
        }
      } catch {
        // retry next mount
      }
    })();
  }, [username, refresh]);

  return null;
}
