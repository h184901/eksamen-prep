import Link from "next/link";

const subjects = [
  {
    id: "ing164",
    name: "ING164 Fysikk",
    description: "Mekanikk, elektrisitet og magnetisme",
    color: "physics",
    href: "/ing164",
    status: "Aktiv" as const,
    chapters: 15,
  },
  {
    id: "dat110",
    name: "DAT110 Nettverksteknologi",
    description: "Nettverk, protokoller, distribuerte systemer og Chord DHT",
    color: "network",
    href: "/dat110",
    status: "Aktiv" as const,
    chapters: 13,
  },
  {
    id: "dat109",
    name: "DAT109 Systemutvikling",
    description: "Modellering, OOA/OOD, smidig utvikling og Java fra UML",
    color: "sysdev",
    href: "/dat109",
    status: "Aktiv" as const,
    chapters: 6,
  },
];

const colorMap: Record<string, string> = {
  physics:
    "border-physics-500/30 hover:border-physics-500/60 bg-gradient-to-br from-physics-500/5 to-physics-500/10",
  network:
    "border-network-500/30 hover:border-network-500/60 bg-gradient-to-br from-network-500/5 to-network-500/10",
  sysdev:
    "border-sysdev-500/30 hover:border-sysdev-500/60 bg-gradient-to-br from-sysdev-500/5 to-sysdev-500/10",
};

const accentMap: Record<string, string> = {
  physics: "text-physics-600 dark:text-physics-400",
  network: "text-network-600 dark:text-network-400",
  sysdev: "text-sysdev-600 dark:text-sysdev-400",
};

export default function HomePage() {
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
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {subjects.map((subject) => {
          const Card = subject.status === "Aktiv" ? Link : "div";
          return (
            <Card
              key={subject.id}
              href={subject.href}
              className={`relative rounded-xl border-2 p-6 transition-all ${colorMap[subject.color]} ${
                subject.status === "Aktiv"
                  ? "cursor-pointer hover:shadow-lg hover:-translate-y-1"
                  : "opacity-60 cursor-default"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    subject.status === "Aktiv"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                  }`}
                >
                  {subject.status}
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
            </Card>
          );
        })}
      </section>
    </div>
  );
}
