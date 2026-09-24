"use client";

import Link from "next/link";
import { PilotStatus } from "@/components/egb339/pilot/Egb339PilotProgress";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";
import { EGB339_TRACK_DESC_KEY, EGB339_TRACK_LABEL_KEY } from "@/lib/egb339-track-labels";
import type { Egb339Track } from "@/lib/egb339-vault/types";

export interface TopicIndexEntry {
  slug: string;
  route: string;
  pageKey: string;
  titleNo: string;
  titleEn: string;
  summaryNo: string;
  summaryEn: string;
  metaNo: string;
  metaEn: string;
}

export interface TopicIndexTrack {
  id: Egb339Track;
  entries: TopicIndexEntry[];
}

/** Bilingual topic-index track sections, rendered in the active language. */
export default function TopicIndexList({ tracks }: { tracks: TopicIndexTrack[] }) {
  const { lang } = useEgb339Lang();
  return <>{tracks.map((track) => <section key={track.id} id={track.id} data-track={track.id}>
    <h2>{ui(lang, EGB339_TRACK_LABEL_KEY[track.id])}</h2><p>{ui(lang, EGB339_TRACK_DESC_KEY[track.id])}</p>
    <ul className="egb-study-index">{track.entries.map((entry) => <li key={entry.slug}>
      <div><PilotStatus pageKey={entry.pageKey} short /><Link href={entry.route}>{lang === "en" ? entry.titleEn : entry.titleNo}</Link></div>
      <p>{lang === "en" ? entry.summaryEn : entry.summaryNo}</p>
      <small>{lang === "en" ? entry.metaEn : entry.metaNo}</small>
    </li>)}</ul>
  </section>)}</>;
}