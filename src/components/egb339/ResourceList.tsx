"use client";

import Link from "next/link";
import { PilotStatus } from "@/components/egb339/pilot/Egb339PilotProgress";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { ui } from "@/lib/egb339-language/ui";

export interface ResourceRow {
  slug: string;
  route: string;
  pageKey: string;
  titleNo: string;
  titleEn: string;
  summaryNo: string;
  summaryEn: string;
  week: string;
}

/** Bilingual practical-resources list, rendered in the active language. */
export default function ResourceList({ rows }: { rows: ResourceRow[] }) {
  const { lang } = useEgb339Lang();
  return <ul className="egb-study-index">
    {rows.map((row) => <li key={row.slug}>
      <div><PilotStatus pageKey={row.pageKey} short /><Link href={row.route}>{lang === "en" ? row.titleEn : row.titleNo}</Link></div>
      <p>{lang === "en" ? row.summaryEn : row.summaryNo}</p>
      <small>{ui(lang, "weekLabel")} {row.week || "—"}</small>
    </li>)}
  </ul>;
}