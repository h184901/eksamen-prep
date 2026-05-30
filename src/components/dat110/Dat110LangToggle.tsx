"use client";

import { useDat110Lang, type Dat110Lang } from "@/lib/dat110-language/useDat110Lang";

const OPTIONS: { value: Dat110Lang; label: string; short: string }[] = [
  { value: "no", label: "Norsk", short: "NO" },
  { value: "en", label: "English", short: "EN" },
];

// DAT110-only language selector. Norsk is the default site; English opts into
// the gradually-built English mode (currently: AI tutor + Begreper landing).
export default function Dat110LangToggle() {
  const { lang, setLang } = useDat110Lang();

  return (
    <div
      role="group"
      aria-label="DAT110 språk / language"
      className="inline-flex items-center rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-0.5 text-xs font-medium"
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={active}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              active
                ? "bg-network-600 text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {/* Compact NO|EN on phones, full Norsk|English at sm+ so the nav
                header never overflows on small screens. */}
            <span className="sm:hidden">{opt.short}</span>
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
