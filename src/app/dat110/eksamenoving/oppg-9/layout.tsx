import Link from "next/link";
import OppgaveSubNav from "@/components/OppgaveSubNav";

export default function Oppg9Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensøving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 9: Konsistens og klokker</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 9: Konsistens og klokker</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-6">Vektorklokker, replikering, feiltoleranse og RPC-feil.</p>

      <OppgaveSubNav basePath="/dat110/eksamenoving/oppg-9" />
      {children}
    </div>
  );
}
