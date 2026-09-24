import type { Egb339Entry } from "@/lib/egb339-vault/types";
import { egb339DisplayTitle } from "@/lib/egb339";
import { egb339Title } from "@/lib/egb339-titles";
import { PilotEntryNav, type PilotNavLink } from "./pilot/PilotNav";

export default function Egb339EntryNav({ previous, next }: { previous: Egb339Entry | null; next: Egb339Entry | null }) {
  const link = (entry: Egb339Entry | null): PilotNavLink | null => entry ? {
    href: entry.route,
    title: egb339Title(entry.slug, "no") ?? egb339DisplayTitle(entry),
    titleEn: egb339Title(entry.slug, "en") ?? egb339DisplayTitle(entry),
    pageKey: "",
  } : null;
  return <PilotEntryNav previous={link(previous)} next={link(next)} />;
}
