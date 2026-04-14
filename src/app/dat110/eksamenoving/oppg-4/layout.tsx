import Link from "next/link";
import OppgaveSubNav from "@/components/OppgaveSubNav";

export default function Oppg4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensøving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 4: Protokoller</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 4: Protokoller</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-6">IP-headerfelt, TCP/UDP-mekanismer og protokollforståelse.</p>

      <OppgaveSubNav basePath="/dat110/eksamenoving/oppg-4" />
      {children}
    </div>
  );
}
