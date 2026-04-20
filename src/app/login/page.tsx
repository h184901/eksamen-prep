import Link from "next/link";
import LoginForm from "./LoginForm";
import { listUsernames } from "@/lib/progress";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function LoginPage() {
  let usernames: string[] = [];
  try {
    usernames = await listUsernames();
  } catch {
    usernames = [];
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg mb-6"
        >
          <span className="text-2xl">📚</span>
          <span>Eksamensøving</span>
        </Link>
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 shadow-sm">
          <h1 className="text-xl font-bold mb-1">Logg inn</h1>
          <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
            Skriv inn et brukernavn eller velg et eksisterende. Første gang du
            bruker et brukernavn opprettes det automatisk.
          </p>
          <LoginForm existingUsernames={usernames} />
        </div>
      </div>
    </div>
  );
}
