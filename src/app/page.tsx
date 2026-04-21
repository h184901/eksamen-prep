import Link from "next/link";
import { getSession, isAkseptertUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  href: string;
  status: "Aktiv";
  chapters: number;
  badge?: string;
}

const baseSubjects: Subject[] = [
  {
    id: "ing164",
    name: "ING164 Fysikk",
    description: "Mekanikk, elektrisitet og magnetisme",
    color: "physics",
    href: "/ing164",
    status: "Aktiv",
    chapters: 15,
  },
  {
    id: "dat110",
    name: "DAT110 Nettverksteknologi",
    description: "Nettverk, protokoller, distribuerte systemer og Chord DHT",
    color: "network",
    href: "/dat110",
    status: "Aktiv",
    chapters: 13,
  },
  {
    id: "dat109",
    name: "DAT109 Systemutvikling",
    description: "Modellering, OOA/OOD, smidig utvikling og Java fra UML",
    color: "sysdev",
    href: "/dat109",
    status: "Aktiv",
    chapters: 6,
  },
  {
    id: "dat107",
    name: "DAT107 Databaser",
    description: "SQL, JPA/ORM, NoSQL, modellering og normalisering",
    color: "dat107",
    href: "/dat107",
    status: "Aktiv",
    chapters: 6,
  },
];

const akseptertSubject: Subject = {
  id: "akseptert",
  name: "Akseptert — SaaS Masterclass",
  description:
    "Next.js, React, TypeScript og Tailwind fra scratch. Slik bygges Akseptert.no.",
  color: "akseptert",
  href: "/akseptert",
  status: "Aktiv",
  chapters: 4,
  badge: "Masterclass",
};

const colorMap: Record<string, string> = {
  physics:
    "border-physics-500/30 hover:border-physics-500/60 bg-gradient-to-br from-physics-500/5 to-physics-500/10",
  network:
    "border-network-500/30 hover:border-network-500/60 bg-gradient-to-br from-network-500/5 to-network-500/10",
  sysdev:
    "border-sysdev-500/30 hover:border-sysdev-500/60 bg-gradient-to-br from-sysdev-500/5 to-sysdev-500/10",
  dat107:
    "border-dat107-500/30 hover:border-dat107-500/60 bg-gradient-to-br from-dat107-500/5 to-dat107-500/10",
  akseptert:
    "border-akseptert-500/40 hover:border-akseptert-500/70 bg-gradient-to-br from-akseptert-500/10 to-akseptert-700/10",
};

const accentMap: Record<string, string> = {
  physics: "text-physics-600 dark:text-physics-400",
  network: "text-network-600 dark:text-network-400",
  sysdev: "text-sysdev-600 dark:text-sysdev-400",
  dat107: "text-dat107-600 dark:text-dat107-400",
  akseptert: "text-akseptert-600 dark:text-akseptert-300",
};

const badgeMap: Record<string, string> = {
  akseptert:
    "bg-akseptert-100 text-akseptert-700 dark:bg-akseptert-900/40 dark:text-akseptert-200",
};

export default async function HomePage() {
  const session = await getSession();
  const subjects: Subject[] = isAkseptertUser(session)
    ? [...baseSubjects, akseptertSubject]
    : baseSubjects;

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Eksamensøving
        </h1>
        <p className="text-lg text-[var(--muted)] mb-2">
          Semester 4 — HVL Bergen
        </p>
        <p className="text-[var(--muted)] max-w-lg mx-auto">
          Interaktive forklaringer, gjennomgåtte eksempler og øvingsoppgaver
          med hint og løsninger for alle eksamensrelevante kapitler.
        </p>
      </section>

      {/* Subject cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={subject.href}
            className={`relative rounded-xl border-2 p-6 transition-all ${colorMap[subject.color]} cursor-pointer hover:shadow-lg hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={
                  subject.badge
                    ? `text-xs font-bold px-2.5 py-1 rounded-full ${badgeMap[subject.color] ?? ""}`
                    : "text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                }
              >
                {subject.badge ?? subject.status}
              </span>
              {subject.chapters > 0 && (
                <span className="text-xs text-[var(--muted)]">
                  {subject.chapters} kapitler
                </span>
              )}
            </div>
            <h2 className={`text-xl font-bold mb-2 ${accentMap[subject.color]}`}>
              {subject.name}
            </h2>
            <p className="text-sm text-[var(--muted)]">{subject.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
