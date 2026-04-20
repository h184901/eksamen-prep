"use client";

import Link from "next/link";
import { dat107Areas, type DAT107Area } from "@/lib/dat107";
import { useProgress } from "@/components/ProgressProvider";

const iconMap: Record<string, React.ReactNode> = {
  database: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  code: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  diagram: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
      <rect x="14" y="16" width="7" height="5" rx="1" />
      <path strokeLinecap="round" d="M10 5.5h4M10 18.5h4M6.5 8v8M17.5 8v8" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  clipboard: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
    </svg>
  ),
  target: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  archive: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
};

function useAreaProgress(area: DAT107Area) {
  const { ready, isCompleted } = useProgress();
  const total = area.topics.length;
  let done = 0;
  for (const t of area.topics) {
    if (isCompleted(`dat107/${area.slug}/${t.slug}`)) done++;
  }
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent, ready };
}

function AreaCard({ area }: { area: DAT107Area }) {
  const { done, total, percent, ready } = useAreaProgress(area);

  return (
    <Link
      href={`/dat107/${area.slug}`}
      className="group rounded-xl border-2 border-dat107-500/30 hover:border-dat107-500/60 bg-[var(--card)] p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-dat107-100 dark:bg-dat107-900/40 text-dat107-600 dark:text-dat107-300 flex items-center justify-center">
          {iconMap[area.icon]}
        </div>
        <div className="flex items-center gap-2">
          {area.weight && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-dat107-100 text-dat107-700 dark:bg-dat107-900/40 dark:text-dat107-200">
              {area.weight}
            </span>
          )}
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
            {total} tema
          </span>
        </div>
      </div>
      <h3 className="font-bold text-lg mb-1 group-hover:text-dat107-600 dark:group-hover:text-dat107-300 transition-colors">
        {area.title}
      </h3>
      <p className="text-sm text-[var(--muted)] mb-4">{area.description}</p>

      <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-dat107-500 transition-all duration-500"
          style={{ width: ready ? `${percent}%` : "0%" }}
        />
      </div>
      {ready && (
        <p className="text-[11px] text-[var(--muted)] mt-1">
          {done}/{total} tema fullført
        </p>
      )}
    </Link>
  );
}

function ExamAreaCard({ area }: { area: DAT107Area }) {
  const accent = area.kind === "eksamen-bearbeidet" ? "amber" : "red";
  const { done, total, percent, ready } = useAreaProgress(area);

  return (
    <Link
      href={`/dat107/${area.slug}`}
      className={`group relative overflow-hidden rounded-xl border-2 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
        accent === "amber"
          ? "border-amber-400/40 hover:border-amber-400/80 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/40"
          : "border-red-400/40 hover:border-red-400/80 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/50 dark:to-pink-950/40"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            accent === "amber"
              ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300"
              : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
          }`}
        >
          {iconMap[area.icon]}
        </div>
        <h3
          className={`font-bold text-lg transition-colors ${
            accent === "amber"
              ? "group-hover:text-amber-700 dark:group-hover:text-amber-300"
              : "group-hover:text-red-700 dark:group-hover:text-red-300"
          }`}
        >
          {area.title}
        </h3>
        <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-200">
          {total} sett
        </span>
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-200 mb-4">{area.description}</p>
      <div className="h-1.5 rounded-full bg-white/60 dark:bg-neutral-900/60 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            accent === "amber" ? "bg-amber-500" : "bg-red-500"
          }`}
          style={{ width: ready ? `${percent}%` : "0%" }}
        />
      </div>
      {ready && (
        <p className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-1">
          {done}/{total} sett fullført
        </p>
      )}
    </Link>
  );
}

export default function DAT107Page() {
  const teori = dat107Areas.filter((a) => a.kind === "teori");
  const praksis = dat107Areas.filter((a) => a.kind === "praksis");
  const eksamen = dat107Areas.filter(
    (a) => a.kind === "eksamen-bearbeidet" || a.kind === "eksamen-original",
  );

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">DAT107 Databaser</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">DAT107 Databaser</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Relasjonsdatabaser, SQL, ORM med JPA og NoSQL. Modellering, normalisering,
          transaksjoner og dokumentdatabaser — med obliger og to eksamensspor.
        </p>
      </div>

      {/* Eksamensformat */}
      <div className="rounded-xl border-2 border-dat107-400/40 dark:border-dat107-500/50 bg-gradient-to-br from-dat107-50 to-fuchsia-50 dark:from-dat107-950/70 dark:to-fuchsia-950/50 p-6 mb-10">
        <h2 className="font-bold text-lg mb-3 text-dat107-700 dark:text-dat107-300">
          Eksamensformat
        </h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-200 mb-4">
          Skriftlig eksamen med fire hovedoppgaver. Typisk fordeling: ORM/JPA,
          modellering/normalisering, SQL og NoSQL. Se{" "}
          <Link
            href="/dat107/eksamen-gjengangere"
            className="text-dat107-700 dark:text-dat107-300 font-semibold hover:underline"
          >
            eksamen gjengangere
          </Link>{" "}
          for mønstre og strategi.
        </p>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { label: "Oppgave 1", topic: "ORM / JPA", pct: "~25%" },
            { label: "Oppgave 2", topic: "Modellering", pct: "~25%" },
            { label: "Oppgave 3", topic: "SQL", pct: "~25%" },
            { label: "Oppgave 4", topic: "NoSQL", pct: "~25%" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg bg-white/80 dark:bg-neutral-900/90 border border-dat107-200 dark:border-dat107-700/60 p-3 text-center"
            >
              <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1">
                {item.label}
              </p>
              <p className="font-bold text-sm text-neutral-900 dark:text-neutral-50">
                {item.topic}
              </p>
              <p className="text-xs font-bold text-dat107-600 dark:text-dat107-300 mt-1">
                {item.pct}
              </p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Teori</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {teori.map((area) => (
          <AreaCard key={area.slug} area={area} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Praksis</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {praksis.map((area) => (
          <AreaCard key={area.slug} area={area} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Eksamen</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {eksamen.map((area) => (
          <ExamAreaCard key={area.slug} area={area} />
        ))}
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h3 className="font-bold mb-2">Om de to eksamenssporene</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            Eksamen gjengangere
          </span>{" "}
          er bearbeidet analyse med mønstre, strategier og treningsoppgaver.{" "}
          <span className="font-semibold text-red-600 dark:text-red-400">
            Originale Eksamen
          </span>{" "}
          er kildetro Markdown av originalsettene og løsningsforslag. Bruk
          gjengangere til repetisjon, originale til å kjenne igjen stilen.
        </p>
      </div>
    </div>
  );
}
