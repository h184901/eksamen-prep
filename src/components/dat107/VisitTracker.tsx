"use client";

import { useEffect } from "react";

export default function VisitTracker({
  areaSlug,
  topicSlug,
}: {
  areaSlug: string;
  topicSlug: string;
}) {
  useEffect(() => {
    const key = `progress-dat107-${areaSlug}`;
    try {
      const stored = localStorage.getItem(key);
      const arr: string[] = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(arr)) return;
      if (!arr.includes(topicSlug)) {
        arr.push(topicSlug);
        localStorage.setItem(key, JSON.stringify(arr));
      }
    } catch {
      // ignore
    }
  }, [areaSlug, topicSlug]);

  return null;
}
