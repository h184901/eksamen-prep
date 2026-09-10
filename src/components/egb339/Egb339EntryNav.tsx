import type { Egb339Entry } from "@/lib/egb339-vault/types";
import { egb339DisplayTitle } from "@/lib/egb339";
import { PilotEntryNav } from "./pilot/Egb339PilotShell";
export default function Egb339EntryNav({ previous, next }: { previous: Egb339Entry | null; next: Egb339Entry | null }) {
  const link = (entry: Egb339Entry | null) => entry ? { href: entry.route, title: egb339DisplayTitle(entry), pageKey: "" } : null;
  return <PilotEntryNav previous={link(previous)} next={link(next)} />;
}
