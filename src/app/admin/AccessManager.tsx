"use client";
import { useCallback, useEffect, useState } from "react";
interface Member { id: number; username: string; active: boolean; }
export default function AccessManager() {
  const [members, setMembers] = useState<Member[]>([]);
  const [username, setUsername] = useState("");
  const [issued, setIssued] = useState<{ username: string; code: string } | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    const response = await fetch("/api/admin/access", { cache: "no-store" });
    if (!response.ok) throw new Error("Kunne ikke hente brukere. Logg inn som admin igjen.");
    setMembers((await response.json()).members);
  }, []);
  useEffect(() => { load().catch(e => setMessage(e.message)); }, [load]);
  async function change(body: object) {
    setBusy(true); setMessage(""); setIssued(null);
    try {
      const response = await fetch("/api/admin/access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Endringen mislyktes.");
      if (result.code) { setIssued(result); setUsername(""); }
      else setMessage("Tilgangen og alle innloggede økter er sperret.");
      await load();
    } catch (e) { setMessage(e instanceof Error ? e.message : "Endringen mislyktes."); }
    finally { setBusy(false); }
  }
  return <div className="space-y-6">
    <form className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5" onSubmit={e => { e.preventDefault(); change({ action: "issue", username }); }}>
      <label htmlFor="member-name" className="block font-semibold">Navn / eksisterende brukernavn</label>
      <input id="member-name" value={username} onChange={e => setUsername(e.target.value)} required minLength={2} maxLength={32} pattern="[a-zA-Z0-9_-]+" autoComplete="off" className="my-3 w-full rounded-lg border border-[var(--card-border)] bg-[var(--bg)] p-3" />
      <p className="mb-3 text-sm text-[var(--muted)]">Bruk personens gamle brukernavn for å beholde fremgangen. Ny kode til et eksisterende navn erstatter gammel kode og logger personen ut.</p>
      <button disabled={busy} className="rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white disabled:opacity-50">Opprett / erstatt kode</button>
    </form>
    {issued && <div role="status" className="rounded-xl border border-emerald-600 bg-emerald-500/10 p-5"><p>Kode til <strong>{issued.username}</strong>:</p><p className="my-3 font-mono text-3xl tracking-widest">{issued.code}</p><p className="text-sm">Vises bare nå. Lagre og del den privat. Vi lagrer kun en hash; koden kan ikke hentes frem senere.</p><button onClick={() => setIssued(null)} className="mt-3 underline">Skjul kode</button></div>}
    {message && <p role="status">{message}</p>}
    <div><h2 className="mb-3 text-xl font-bold">Personlige tilganger</h2><ul className="space-y-3">{members.map(member => <li key={member.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--card-border)] p-4"><div><strong>{member.username}</strong><p className="text-sm text-[var(--muted)]">{member.active ? "Aktiv · utløper ikke" : "Sperret"}</p></div><div className="flex gap-3"><button disabled={busy} onClick={() => setUsername(member.username)} className="underline disabled:opacity-50">Velg for ny kode</button>{member.active && <button disabled={busy} onClick={() => { if (confirm(`Sperre ${member.username} og logge ut alle personens økter?`)) change({ action: "revoke", userId: member.id }); }} className="rounded-md border border-red-500 px-3 py-2 disabled:opacity-50">Sperr</button>}</div></li>)}</ul>{members.length === 0 && <p>Ingen koder utstedt ennå.</p>}</div>
  </div>;
}
