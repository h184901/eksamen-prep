"use client";

import type { ReactNode } from "react";
import { useDat110Lang } from "@/lib/dat110-language";

// Honest, low-key banner shown ONLY in English mode on pages where a lot of the
// body text is still Norwegian. Renders nothing in Norwegian mode (the default
// site is unaffected) and nothing in English mode is misrepresented as fully
// translated. Keep usage to large, partially-translated pages — not everywhere.
//
// `children` overrides the default sentence for pages that need a more specific
// honesty note (e.g. exam detail: questions and solutions are still Norwegian).
export default function Dat110GradualNote({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { lang } = useDat110Lang();
  if (lang !== "en") return null;
  return (
    <p
      className={`text-xs text-[var(--muted)] border border-[var(--card-border)] rounded-lg px-3 py-2 ${className}`}
    >
      {children ??
        "English mode is being built gradually. Some detailed DAT110 content is still in Norwegian."}
    </p>
  );
}
