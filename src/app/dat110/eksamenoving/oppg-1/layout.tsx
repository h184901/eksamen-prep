import Link from "next/link";
import OppgaveSubNav from "@/components/OppgaveSubNav";

export default function Oppg1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensøving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 1: Flervalg</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 1: Flervalg</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-6">10 flervalgsspørsmål som dekker hele pensum fra begge bøker.</p>

      <OppgaveSubNav basePath="/dat110/eksamenoving/oppg-1" />
      {children}
    </div>
  );
}
