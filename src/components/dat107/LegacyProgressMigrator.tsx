"use client";

import { useEffect, useRef } from "react";
import { useProgress } from "@/components/ProgressProvider";
import { chapters as ing164Chapters } from "@/lib/chapters";
import { dat110Chapters } from "@/lib/dat110-chapters";
import { CHAPTER_SECTION_SLUGS } from "@/lib/subject-progress";

const DAT107_FLAG = "migrated-dat107-v1";
const SUBJECTS_FLAG = "migrated-subjects-v1";

function readArray(key: string): unknown[] | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function collectDat107Keys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    const m = /^progress-dat107-(.+)$/.exec(k);
    if (!m) continue;
    const area = m[1];
    const arr = readArray(k);
    if (!arr) continue;
    for (const topic of arr) {
      if (typeof topic === "string" && topic.length > 0) {
        keys.push(`dat107/${area}/${topic}`);
      }
    }
  }
  return keys;
}

function collectIng164Keys(): string[] {
  const keys: string[] = [];
  for (const ch of ing164Chapters) {
    const arr = readArray(`progress-ch${ch.id}`);
    if (!arr) continue;
    for (const idx of arr) {
      if (typeof idx === "number" && idx >= 0 && idx < CHAPTER_SECTION_SLUGS.length) {
        keys.push(`ing164/${ch.slug}/${CHAPTER_SECTION_SLUGS[idx]}`);
      }
    }
  }
  return keys;
}

function collectDat110Keys(): string[] {
  const keys: string[] = [];
  for (const ch of dat110Chapters) {
    const arr = readArray(`dat110-progress-ch${ch.id}`);
    if (!arr) continue;
    for (const idx of arr) {
      if (typeof idx === "number" && idx >= 0 && idx < CHAPTER_SECTION_SLUGS.length) {
        keys.push(`dat110/${ch.slug}/${CHAPTER_SECTION_SLUGS[idx]}`);
      }
    }
  }
  return keys;
}

async function migrate(keys: string[]): Promise<boolean> {
  if (keys.length === 0) return true;
  try {
    const res = await fetch("/api/progress/migrate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ pageKeys: keys }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

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

    (async () => {
      let didMigrate = false;

      let dat107Done = false;
      try {
        dat107Done = !!localStorage.getItem(DAT107_FLAG);
      } catch {
        return;
      }
      if (!dat107Done) {
        const keys = collectDat107Keys();
        const ok = await migrate(keys);
        if (ok) {
          try {
            localStorage.setItem(DAT107_FLAG, "1");
          } catch {
            // ignore
          }
          if (keys.length > 0) didMigrate = true;
        }
      }

      let subjectsDone = false;
      try {
        subjectsDone = !!localStorage.getItem(SUBJECTS_FLAG);
      } catch {
        return;
      }
      if (!subjectsDone) {
        const keys = [...collectIng164Keys(), ...collectDat110Keys()];
        const ok = await migrate(keys);
        if (ok) {
          try {
            localStorage.setItem(SUBJECTS_FLAG, "1");
          } catch {
            // ignore
          }
          if (keys.length > 0) didMigrate = true;
        }
      }

      if (didMigrate) await refresh();
    })();
  }, [username, refresh]);

  return null;
}
