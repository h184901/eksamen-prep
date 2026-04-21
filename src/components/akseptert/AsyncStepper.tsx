"use client";

import { useState } from "react";

export interface AsyncStep {
  label: string;
  code: string;
  purpose: string;
  typicalMs: string;
  detail: React.ReactNode;
}

const defaultSteps: AsyncStep[] = [
  {
    label: "auth()",
    code: `const { userId } = await auth();`,
    purpose: "Sjekker hvem som er logget inn via Clerk.",
    typicalMs: "~5–20 ms",
    detail: (
      <>
        <p>
          <code>auth()</code> leser session-cookien, verifiserer signaturen
          og returnerer et objekt. Vi destructurer ut <code>userId</code>.
        </p>
        <p>
          <strong>Uten auth:</strong> funksjonen returnerer{" "}
          <code>{`{ ok: false, error: "Ikke logget inn" }`}</code>.
        </p>
      </>
    ),
  },
  {
    label: "syncUser()",
    code: `await syncUser();`,
    purpose: "Sørger for at brukeren finnes i Supabase.",
    typicalMs: "~20–80 ms",
    detail: (
      <p>
        Vår egen Server Action. Første gang en bruker logger inn, opprettes
        de i <code>profiles</code>-tabellen i Supabase. Vi venter på denne
        før vi fortsetter, ellers kunne den neste spørringen feilet.
      </p>
    ),
  },
  {
    label: "profile-query",
    code: `const { data: profile } = await supabase
  .from("profiles")
  .select("is_pro, scans_remaining")
  .eq("id", userId)
  .maybeSingle();`,
    purpose: "Henter brukerens abonnementsstatus og gjenværende kvote.",
    typicalMs: "~30–120 ms",
    detail: (
      <>
        <p>
          <code>supabase.from(...).select(...)</code> bygger en SQL-spørring.
          <code>await</code> venter på at svaret kommer tilbake.
        </p>
        <p>
          <code>maybeSingle()</code> returnerer én rad eller <code>null</code>.
        </p>
      </>
    ),
  },
  {
    label: "kvote-sjekk",
    code: `if (!profile.is_pro && (profile.scans_remaining ?? 0) <= 0) {
  return { ok: false, error: "QUOTA_EXCEEDED" };
}`,
    purpose: "Stopper gratisbrukere som har brukt opp sine scans.",
    typicalMs: "< 1 ms (synkron)",
    detail: (
      <p>
        Dette er en synkron sjekk (ikke await), men strengt tatt en del av
        flyten. Hvis brukeren er Pro eller har scans igjen, går vi videre.
        Ellers stopper vi her.
      </p>
    ),
  },
  {
    label: "image-upload",
    code: `const { error: uploadError } = await supabase.storage
  .from("job_images")
  .upload(fileName, buffer, { contentType: file.type });`,
    purpose: "Laster opp bildene til Supabase Storage.",
    typicalMs: "~200–1500 ms per bilde",
    detail: (
      <>
        <p>
          Løkke over hver fil brukeren har sendt inn. Hver fil leses som en{" "}
          <code>ArrayBuffer</code>, base64-kodes for å sende til OpenAI, og
          lastes opp til Supabase Storage for senere visning i tilbudet.
        </p>
        <p>
          Dette er den <em>tregeste</em> delen hvis brukeren sender flere
          store bilder.
        </p>
      </>
    ),
  },
  {
    label: "company-profile",
    code: `const { data: companyProfile } = await supabase
  .from("company_profiles")
  .select("default_material_markup, trade, ...")
  .eq("user_id", userId)
  .maybeSingle();`,
    purpose: "Henter brukerens fag og egne prisjusteringer.",
    typicalMs: "~30–100 ms",
    detail: (
      <p>
        Leser ut brukerens primærfag (snekker, rørlegger osv.) slik at vi
        kan legge til bransjespesifikk kontekst i system-prompten vi sender
        til OpenAI.
      </p>
    ),
  },
  {
    label: "material-prices",
    code: `const { data: userMaterials } = await supabase
  .from("material_prices")
  .select("name, price, unit")
  .eq("user_id", userId)
  .limit(200);`,
    purpose: "Henter brukerens prisliste (kun for Pro-brukere).",
    typicalMs: "~50–200 ms",
    detail: (
      <p>
        Kun Pro-brukere har egen prisliste. Hvis den finnes, legger vi
        prisene inn i system-prompten slik at OpenAI bruker kundens egne
        grossistpriser i tilbudet.
      </p>
    ),
  },
  {
    label: "fetch(OpenAI)",
    code: `const res = await fetch(OPENAI_API_URL, {
  method: "POST",
  headers: { Authorization: \`Bearer \${apiKey}\`, ... },
  body: JSON.stringify({
    model: "gpt-4o",
    messages: [...]
  }),
});`,
    purpose: "Selve AI-kallet. Her skjer magien.",
    typicalMs: "~3000–15000 ms",
    detail: (
      <>
        <p>
          Dette er det <strong>tregeste</strong> steget. OpenAI skal lese
          bildene, analysere dem, og generere et strukturert tilbud. Vi
          venter på hele svaret før vi fortsetter.
        </p>
        <p>
          <code>fetch()</code> er standard web-API for HTTP-forespørsler —
          tilsvarer <code>HttpClient</code> i Java.
        </p>
      </>
    ),
  },
  {
    label: "res.json()",
    code: `const json = await res.json();`,
    purpose: "Leser response body og parser JSON.",
    typicalMs: "< 50 ms",
    detail: (
      <p>
        <code>res.json()</code> returnerer et Promise — body-en leses
        strømmende, og når hele er lest parser den JSON-en. Returnerer et
        JavaScript-objekt.
      </p>
    ),
  },
  {
    label: "JSON.parse(content)",
    code: `offerData = JSON.parse(content) as JobOfferData;`,
    purpose: "Parser selve tilbuds-JSON-en fra AI-modellen.",
    typicalMs: "< 5 ms (synkron)",
    detail: (
      <p>
        OpenAI returnerer et streng-innhold som er vår egen JSON-struktur. Vi
        parser den til et objekt og caster til vår TypeScript-type{" "}
        <code>JobOfferData</code>.
      </p>
    ),
  },
  {
    label: "oppdater kvote",
    code: `await supabase
  .from("profiles")
  .update({ scans_remaining: (profile.scans_remaining ?? 1) - 1 })
  .eq("id", userId);`,
    purpose: "Trekker én scan fra gratisbrukerens kvote.",
    typicalMs: "~30–100 ms",
    detail: (
      <p>
        Kjøres bare hvis brukeren ikke er Pro. Reduserer{" "}
        <code>scans_remaining</code> med 1 i databasen.
      </p>
    ),
  },
];

export default function AsyncStepper({
  steps = defaultSteps,
}: {
  steps?: AsyncStep[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = steps[activeIdx];

  return (
    <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] overflow-hidden">
      {/* Timeline */}
      <div className="bg-neutral-950 text-neutral-100 p-4 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max">
          {steps.map((s, i) => {
            const isActive = i === activeIdx;
            const isPast = i < activeIdx;
            return (
              <div key={i} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      isActive
                        ? "bg-akseptert-500 border-akseptert-300 text-white scale-110 shadow-lg shadow-akseptert-500/30"
                        : isPast
                          ? "bg-akseptert-800/60 border-akseptert-600 text-akseptert-200"
                          : "bg-neutral-800 border-neutral-700 text-neutral-400 group-hover:border-akseptert-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`text-[10px] font-mono whitespace-nowrap ${
                      isActive ? "text-akseptert-300" : "text-neutral-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <span
                    className={`w-8 h-0.5 mx-1 mt-[-18px] rounded ${
                      isPast ? "bg-akseptert-500" : "bg-neutral-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="grid md:grid-cols-[1fr_auto] gap-4 p-5">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-akseptert-600 dark:text-akseptert-300">
              Steg {activeIdx + 1}
            </span>
            <h4 className="font-bold">{active.label}</h4>
          </div>
          <p className="text-sm text-[var(--muted)] mb-3">{active.purpose}</p>

          <pre className="bg-neutral-950 text-neutral-100 rounded-lg p-3 text-[12px] font-mono overflow-x-auto mb-3">
            <code className="whitespace-pre">{active.code}</code>
          </pre>

          <div className="text-sm space-y-2 text-[var(--foreground)]/90">
            {active.detail}
          </div>
        </div>

        <div className="rounded-lg bg-akseptert-50/70 dark:bg-akseptert-950/30 border border-akseptert-400/30 p-3 min-w-[120px] text-center h-min">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
            Typisk
          </p>
          <p className="text-sm font-mono font-bold text-akseptert-700 dark:text-akseptert-200">
            {active.typicalMs}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 border-t border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-900/50">
        <button
          type="button"
          onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
          disabled={activeIdx === 0}
          className="text-xs px-3 py-1.5 rounded border border-[var(--card-border)] disabled:opacity-40 hover:bg-neutral-200 dark:hover:bg-neutral-800"
        >
          ← Forrige steg
        </button>
        <p className="text-[11px] text-[var(--muted)]">
          {activeIdx + 1} av {steps.length}
        </p>
        <button
          type="button"
          onClick={() => setActiveIdx(Math.min(steps.length - 1, activeIdx + 1))}
          disabled={activeIdx === steps.length - 1}
          className="text-xs px-3 py-1.5 rounded bg-akseptert-500 hover:bg-akseptert-600 text-white disabled:opacity-40"
        >
          Neste steg →
        </button>
      </div>
    </div>
  );
}
