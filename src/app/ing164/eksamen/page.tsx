import Link from "next/link";

const sections = [
  {
    title: "Tidligere eksamener",
    description:
      "Fullstendige eksamensoppgaver med grundig gjennomgang, steg-for-steg-løsninger, relevante formler og lenker til teorikapitler.",
    href: "/ing164/eksamen/eksamener",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    badge: "4 eksamener",
    badgeColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    borderColor: "border-red-400/40 hover:border-red-400/80",
    bgGradient: "from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/20",
    hoverText: "group-hover:text-red-600 dark:group-hover:text-red-400",
    tags: [
      { label: "Var 2023 — Mekanikk", color: "text-physics-600 dark:text-physics-400 bg-physics-100 dark:bg-physics-900/30" },
      { label: "Host 2023 — Mekanikk", color: "text-physics-600 dark:text-physics-400 bg-physics-100 dark:bg-physics-900/30" },
      { label: "Var 2017 — E&M", color: "text-network-600 dark:text-network-400 bg-network-100 dark:bg-network-900/30" },
      { label: "Host 2016 — E&M", color: "text-network-600 dark:text-network-400 bg-network-100 dark:bg-network-900/30" },
    ],
  },
  {
    title: "Obligatoriske oppgaver",
    description:
      "Oppgavene fra oblig 1, 2 og 3 med fullstendige losningsforslag og forklaringer.",
    href: "/ing164/eksamen/obliger",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </svg>
    ),
    badge: "3 obliger",
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    borderColor: "border-amber-400/40 hover:border-amber-400/80",
    bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20",
    hoverText: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    tags: [
      { label: "Oblig 1", color: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30" },
      { label: "Oblig 2", color: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30" },
      { label: "Oblig 3", color: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30" },
    ],
  },
  {
    title: "Oppgaver fra boken",
    description:
      "Utvalgte oppgaver fra University Physics (Young & Freedman) sortert etter kapittel, med fullstendige losninger.",
    href: "/ing164/eksamen/oppgaver",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    badge: "15 kapitler",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    borderColor: "border-blue-400/40 hover:border-blue-400/80",
    bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20",
    hoverText: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    tags: [
      { label: "Kap 2–3 Bevegelse", color: "text-physics-600 dark:text-physics-400 bg-physics-100 dark:bg-physics-900/30" },
      { label: "Kap 4–8 Mekanikk", color: "text-physics-600 dark:text-physics-400 bg-physics-100 dark:bg-physics-900/30" },
      { label: "Kap 9–10 Rotasjon", color: "text-physics-600 dark:text-physics-400 bg-physics-100 dark:bg-physics-900/30" },
      { label: "Kap 21–29 E&M", color: "text-network-600 dark:text-network-400 bg-network-100 dark:bg-network-900/30" },
    ],
  },
];

export default function EksamensovingPage() {
  return (
    <div>
      {/* Breadcrumb & header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
          <span>/</span>
          <Link href="/ing164" className="hover:text-[var(--accent)]">ING164</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Eksamensøving og oppgaver</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Eksamensøving og oppgaver</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Her finner du alt du trenger for å trene til eksamen i ING164 Fysikk:
          tidligere eksamener med grundige gjennomganger, obligoppgaver med
          løsningsforslag, og oppgaver fra læreboken sortert etter kapittel.
        </p>
      </div>

      {/* Tips-boks */}
      <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/10 p-5 mb-10">
        <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Slik bruker du oppgavesidene</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--muted)]">
          <li>Prøv oppgaven selv først — bruk <strong>hint-knappene</strong> om du sitter fast.</li>
          <li>Klikk <strong>«Formler for deloppgave»</strong> for å se hvilke formler du trenger uten å se hele løsningen.</li>
          <li>Hver oppgave har lenker til <strong>relevante kapitler</strong> slik at du kan lese opp teori du mangler.</li>
          <li>Start med eksamensoppgavene — de viser <strong>nøyaktig hva som forventes</strong> på eksamen.</li>
          <li>Obligene er god trening for å bygge ferdigheter, og bokoppgavene gir ekstra repetisjon.</li>
        </ul>
      </div>

      {/* Three sections */}
      <div className="grid gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`group relative overflow-hidden rounded-xl border-2 ${section.borderColor} bg-gradient-to-br ${section.bgGradient} p-6 transition-all hover:shadow-lg hover:-translate-y-0.5`}
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 mt-0.5 ${section.hoverText} text-[var(--muted)] transition-colors`}>
                {section.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className={`text-xl font-bold ${section.hoverText} transition-colors`}>
                    {section.title}
                  </h2>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${section.badgeColor}`}>
                    {section.badge}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-3">{section.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {section.tags.map((tag) => (
                    <span key={tag.label} className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${tag.color}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <svg className="w-5 h-5 shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Eksamensinfo */}
      <div className="mt-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
        <h3 className="font-bold mb-3">Om eksamen i ING164</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-[var(--muted)]">
          <div>
            <p className="font-medium text-[var(--foreground)] mb-1">Praktisk info</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>3 timer skriftlig eksamen</li>
              <li>3 oppgaver med 4 deloppgaver hver</li>
              <li>Tillatte hjelpemidler: lærebok og enkel kalkulator</li>
              <li>Alle deloppgaver teller likt</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-[var(--foreground)] mb-1">Emneinndeling</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li><span className="text-physics-600 dark:text-physics-400 font-medium">Var/Host 2023</span> — kun mekanikk (kap 2–10)</li>
              <li><span className="text-network-600 dark:text-network-400 font-medium">Var 2017 / Host 2016</span> — kun E&M (kap 21–29)</li>
              <li>Eksamen kan kombinere begge deler</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
