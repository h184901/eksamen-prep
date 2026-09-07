import Link from "next/link";

export const metadata = {
  title: "Utveksling — Australia-emner ved QUT",
  description:
    "Oversikt over utvekslingsemner ved Gardens Point (QUT), 2026 Semester 2.",
};

// Kilde: Unit Swap-oversikt (Australia / Gardens Point, 2026 Semester 2).
// EGB339 har aktiv fagportal; øvrige fag forblir statiske til de får egne sider.

interface ExchangeUnit {
  code: string;
  name: string;
  credits: number;
  href?: string;
  status: "active" | "later";
  accent: string;
}

const units: ExchangeUnit[] = [
  { code: "CAB432", name: "Cloud Computing", credits: 12, status: "later", accent: "bg-sky-500" },
  { code: "CAB444", name: "Secure Network Architectures", credits: 12, status: "later", accent: "bg-indigo-500" },
  { code: "EGB339", name: "Introduction to Robotics", credits: 12, href: "/egb339", status: "active", accent: "bg-robotics-500" },
  { code: "IFB240", name: "Cyber Security", credits: 12, status: "later", accent: "bg-violet-500" },
];

const meta: { label: string; value: string }[] = [
  { label: "År", value: "2026" },
  { label: "Studieperiode", value: "Semester 2" },
  { label: "Lokasjon", value: "Gardens Point" },
  { label: "Studiepoeng", value: "12 per emne" },
  { label: "Status", value: "Pågår" },
];

export default function UtvekslingPage() {
  return (
    <div className="max-w-3xl">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
      >
        <span aria-hidden>←</span> Tilbake til studieløpet
      </Link>

      {/* ───── Header ───── */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          Semester 2
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Utveksling · Australia
        </span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
        Utveksling
      </h1>
      <p className="text-lg text-emerald-700 dark:text-emerald-300 font-medium mb-4">
        Australia-emner ved QUT
      </p>
      <p className="text-[var(--muted)] max-w-2xl leading-relaxed mb-8">
        Emnene ved Gardens Point samlet på ett sted. EGB339 har nå en aktiv fagportal
        med ukeplan, kinematikk, programmering, robot vision og vurderingsstøtte.
      </p>

      {/* ───── Metadata ───── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {meta.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2.5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              {m.label}
            </p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mt-0.5">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* ───── Units ───── */}
      <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
        Aktuelle emner
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {units.map((u) => {
          const content = (
            <>
            <div className={`h-1 ${u.accent}`} aria-hidden />
            <div className="px-5 py-4">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  {u.code}
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 whitespace-nowrap">
                  {u.credits} cp
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug text-neutral-900 dark:text-neutral-50">
                {u.name}
              </h3>
              <p className={`mt-2 text-sm font-semibold ${u.status === "active" ? "text-robotics-700 dark:text-robotics-300" : "text-[var(--muted)]"}`}>
                {u.status === "active" ? "Åpne fagportal →" : "Kommer senere"}
              </p>
            </div>
            </>
          );
          return u.href ? (
            <Link key={u.code} href={u.href} className="group flex flex-col overflow-hidden rounded-xl border border-robotics-300 bg-[var(--card)] transition-all hover:-translate-y-0.5 hover:border-robotics-500 hover:shadow-md dark:border-robotics-800">
              {content}
            </Link>
          ) : (
            <div key={u.code} className="flex flex-col overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
              {content}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[var(--muted)] mt-8 italic">
        Basert på foreløpig Unit Swap-oversikt.
      </p>
    </div>
  );
}
