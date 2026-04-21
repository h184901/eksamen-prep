import Link from "next/link";
import SubPageHeader from "@/components/akseptert/SubPageHeader";
import { Section, Sandbox } from "@/components/akseptert/Section";
import Callout from "@/components/akseptert/Callout";
import CodeBlock from "@/components/akseptert/CodeBlock";
import CompareTwoCols from "@/components/akseptert/CompareTwoCols";
import DataFlowDiagram from "@/components/akseptert/DataFlowDiagram";

export const runtime = "nodejs";

export default function DataFlowPage() {
  return (
    <div>
      <SubPageHeader
        title="Data Flow"
        subtitle="3 · Slik fungerer Akseptert.no"
        badge="flow · animasjon"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <circle cx="5" cy="6" r="2" />
            <circle cx="19" cy="6" r="2" />
            <circle cx="5" cy="18" r="2" />
            <circle cx="19" cy="18" r="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 6h10M7 18h10M5 8v8M19 8v8" />
          </svg>
        }
        lead={
          <>
            En visuell reise fra brukerens klikk på «Generer» til det ferdige
            tilbudet vises i UI-et. Spill av animasjonen, eller hopp til et
            bestemt steg for å se koden bak.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#oversikt" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Oversikt</a></li>
          <li><a href="#flow" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. Animert flyt</a></li>
          <li><a href="#klient" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. Klient-koden</a></li>
          <li><a href="#hvorfor" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. Hvorfor ikke REST</a></li>
          <li><a href="#feil" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. Feilhåndtering</a></li>
          <li><a href="#tid" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. Totalt tidsbruk</a></li>
        </ul>
      </nav>

      <Section id="oversikt" step={1} title="Oversikt over systemet">
        <p>
          Hele flyten involverer 5 tjenester. Som Java-utvikler er du kanskje
          vant til at alt bor i samme Spring Boot-app. I dette tilfellet er
          hver tjeneste eksternt hostet, og Akseptert sin Server Action er
          dirigenten.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              name: "Browser",
              role: "Klient / UI",
              detail: "React-komponenten ny/page.tsx. Samler instruksjon + filer i FormData og kaller Server Action.",
              color: "text-sky-600 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/40",
            },
            {
              name: "Server Action",
              role: "Dirigenten",
              detail: "generate.ts. Kjører på Vercel. Koordinerer alle de andre tjenestene og gjør post-prosessering.",
              color: "text-akseptert-600 dark:text-akseptert-300 bg-akseptert-100 dark:bg-akseptert-950/40",
            },
            {
              name: "Clerk",
              role: "Autentisering",
              detail: "Sjekker om brukeren er innlogget ved å verifisere en signert cookie. Returnerer userId.",
              color: "text-amber-600 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/40",
            },
            {
              name: "Supabase DB",
              role: "Postgres-database",
              detail: "Profiler, firmainfo, kvote, prislister, jobber og tilbud. SQL-database med Row Level Security.",
              color: "text-emerald-600 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/40",
            },
            {
              name: "Supabase Storage",
              role: "Fil-lagring",
              detail: "Lagrer befaringsbilder. Får en public URL som inkluderes i tilbudet.",
              color: "text-emerald-600 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/40",
            },
            {
              name: "OpenAI",
              role: "AI-modell",
              detail: "gpt-4o. Leser bildene og instruksjonene, returnerer et strukturert JSON-tilbud.",
              color: "text-fuchsia-600 dark:text-fuchsia-300 bg-fuchsia-100 dark:bg-fuchsia-950/40",
            },
          ].map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${s.color}`}>
                  {s.role}
                </span>
              </div>
              <h4 className="font-bold mb-1">{s.name}</h4>
              <p className="text-sm text-[var(--muted)]">{s.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="flow"
        step={2}
        title="Animert flyt — fra klikk til tilbud"
        subtitle="Trykk Spill for å se pakken vandre gjennom alle åtte steg. Klikk et steg i listen for å hoppe dit og lese koden."
      >
        <Sandbox title="Data flow">
          <DataFlowDiagram />
        </Sandbox>

        <Callout kind="tips" title="Les SVG-en som et kart">
          <p>
            Boksen som lyser opp er den som snakker akkurat nå. Den indigo-
            fargede pakken er «request-objektet» som reiser. Når to bokser
            lyser samtidig, er det en fetch som venter på svar.
          </p>
        </Callout>
      </Section>

      <Section
        id="klient"
        step={3}
        title="Klient-koden — hvordan det ser ut fra UI-et"
        subtitle="Akseptert sin ny/page.tsx, forenklet."
      >
        <CodeBlock
          language="tsx"
          title="app/dashboard/ny/page.tsx (utsnitt)"
          code={`"use client";

import { useState } from "react";
import { generateJobOffer, type JobOfferData } from "@/app/actions/generate";
import { JobOfferPreview } from "@/components/job-offer-preview";

export default function NyBefaring() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; data?: JobOfferData } | null>(null);
  const [instructions, setInstructions] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  async function handleGenerate() {
    setLoading(true);

    // 1) Samle alt i FormData
    const formData = new FormData();
    formData.append("instructions", instructions);
    files.forEach(f => formData.append("files", f));

    // 2) Kall Server Action — ser ut som en vanlig funksjon,
    //    men kjører på serveren.
    const result = await generateJobOffer(formData);

    // 3) Oppdater UI med resultatet
    setResult(result);
    setLoading(false);
  }

  return (
    <div>
      <textarea value={instructions} onChange={e => setInstructions(e.target.value)} />
      <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files ?? []))} />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Genererer..." : "Generer tilbud"}
      </button>

      {result?.ok && result.data && <JobOfferPreview data={result.data} />}
    </div>
  );
}`}
        />

        <Callout kind="info" title="Noen observasjoner">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Ingen fetch()</strong> — vi importerer server-funksjonen
              direkte.
            </li>
            <li>
              <strong>TypeScript-sikring</strong> — <code>JobOfferData</code>{" "}
              er samme type på klient og server. Endrer du den ene, vet TS om
              det på begge sider.
            </li>
            <li>
              <strong>Loading-state</strong> — vi må manuelt håndtere{" "}
              <code>setLoading</code> før og etter. React 19 har{" "}
              <code>useTransition</code> og <code>useActionState</code> som
              gjør dette penere.
            </li>
          </ul>
        </Callout>
      </Section>

      <Section
        id="hvorfor"
        step={4}
        title="Hvorfor Server Actions og ikke REST?"
      >
        <CompareTwoCols
          leftTitle="REST API"
          leftSubtitle="Klassisk mønster"
          rightTitle="Server Actions"
          rightSubtitle="Next.js-måten"
          left={
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Du definerer et nytt endepunkt (<code>/api/generate</code>).</li>
              <li>Klienten fetch-er, serialiserer form-data, parser JSON.</li>
              <li>Feilhåndtering: sjekke <code>res.ok</code>, HTTP-koder.</li>
              <li>Typer må deles manuelt (eller med OpenAPI).</li>
              <li>God for eksterne klienter (mobil, tredjepart).</li>
            </ul>
          }
          right={
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Funksjon merket med <code>&quot;use server&quot;</code>.</li>
              <li>Import → kall. Null serialiseringsstøy.</li>
              <li>Feilhåndtering: du designer returverdien selv (f.eks.{" "}
                <code>{`{ ok, error }`}</code>).</li>
              <li>Typer deles automatisk (samme fil importeres).</li>
              <li>Ikke ment for eksterne klienter.</li>
            </ul>
          }
        />

        <Callout kind="viktig" title="Når trenger du fortsatt en route.ts?">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Webhooks</strong> — Stripe og Resend sender POST-er til
              Akseptert fra sine servere. De trenger et stabilt endepunkt.
            </li>
            <li>
              <strong>Offentlige API-er</strong> — om noen andre skal kunne
              kalle deg.
            </li>
            <li>
              <strong>Filnedlasting</strong> — PDF-generering, CSV-eksport.
            </li>
          </ul>
        </Callout>
      </Section>

      <Section
        id="feil"
        step={5}
        title="Feilhåndtering i flyten"
        subtitle="Fem steder i kjeden der noe kan gå galt — og hva vi gjør."
      >
        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
          <table className="min-w-full text-sm">
            <thead className="bg-akseptert-500/10">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Hvor</th>
                <th className="px-3 py-2 text-left font-semibold">Hva kan gå galt</th>
                <th className="px-3 py-2 text-left font-semibold">Håndtering</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Clerk auth</td>
                <td className="px-3 py-2">Sessionen utløpt, ingen userId</td>
                <td className="px-3 py-2">Returner <code>{`{ ok: false, error: "Ikke logget inn" }`}</code></td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Kvote-sjekk</td>
                <td className="px-3 py-2">Gratisbruker har brukt opp scans</td>
                <td className="px-3 py-2">Spesiell feilkode <code>QUOTA_EXCEEDED</code> — UI viser oppgraderingsmodal</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Supabase upload</td>
                <td className="px-3 py-2">Filen er for stor eller nettverksfeil</td>
                <td className="px-3 py-2">Vi logger feilen men fortsetter uten bilde-URL</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">OpenAI fetch</td>
                <td className="px-3 py-2">Rate-limit, nettverksfeil, timeout</td>
                <td className="px-3 py-2">Parse <code>json.error.message</code> og returner til klient</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">JSON.parse</td>
                <td className="px-3 py-2">AI ignorerer instruks og svarer med markdown</td>
                <td className="px-3 py-2">try/catch — returner «ugyldig dataformat»</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout kind="tips" title="Mønster: resultat-objekter i stedet for throws">
          <p>
            I hele denne kjeden kaster vi ikke exceptions — vi returnerer
            <code> {`{ ok: true | false, ... }`} </code>. Fordelen er at
            TypeScript kan verifisere alle feilmuligheter, og UI-et trenger
            ikke en global try/catch.
          </p>
        </Callout>
      </Section>

      <Section id="tid" step={6} title="Hvor tiden går">
        <p>
          En typisk AI-generering tar 6–10 sekunder totalt. Her er den grove
          fordelingen:
        </p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          {[
            { label: "auth + DB-oppslag", pct: 4, color: "bg-sky-500" },
            { label: "last opp bilder", pct: 18, color: "bg-emerald-500" },
            { label: "OpenAI (tenker)", pct: 65, color: "bg-akseptert-500" },
            { label: "parse + post-prosess", pct: 8, color: "bg-amber-500" },
            { label: "DB update + return", pct: 5, color: "bg-fuchsia-500" },
          ].map((s) => (
            <div key={s.label} className="mb-2 last:mb-0">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>{s.label}</span>
                <span className="font-mono text-[var(--muted)]">~{s.pct}%</span>
              </div>
              <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${s.color}`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <Callout kind="info" title="Flaskehalsen er OpenAI">
          <p>
            To tredjedeler av tiden er OpenAI som genererer teksten. Derfor
            bruker Akseptert <strong>streaming</strong> andre steder i appen
            (f.eks. analyze-funksjonen) for å vise svaret mens det kommer.
            For strukturert JSON-output som her, gir streaming mindre
            mening — vi trenger hele objektet før vi kan parse det.
          </p>
        </Callout>
      </Section>

      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Link
          href="/akseptert/kode/ai-generation"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-akseptert-400/60 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Forrige</p>
          <p className="font-bold">AI Generation</p>
        </Link>
        <Link
          href="/akseptert/kode/stack"
          className="rounded-xl border-2 border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4 hover:border-akseptert-500 transition-colors"
        >
          <p className="text-xs text-akseptert-600 dark:text-akseptert-300">Neste →</p>
          <p className="font-bold">Hele Stacken</p>
        </Link>
      </div>
    </div>
  );
}
