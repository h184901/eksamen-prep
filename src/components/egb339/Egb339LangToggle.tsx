"use client";

import { useEgb339Lang, type Egb339Lang } from "@/lib/egb339-language/store";

const OPTIONS: { value: Egb339Lang; label: string; short: string }[] = [
  { value: "no", label: "Norsk", short: "NO" },
  { value: "en", label: "English", short: "EN" },
];

// EGB339 language selector. Norsk is the default; English switches the whole
// EGB339 section. Rendered in the global header between Logg ut and the theme
// toggle (except on /dat110, whose own toggle occupies that slot).
export default function Egb339LangToggle() {
  const { lang, setLang } = useEgb339Lang();

  return (
    <div
      role="group"
      aria-label="EGB339 språk / language"
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
                ? "bg-robotics-600 text-white"
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
