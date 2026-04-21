"use client";

import { useState } from "react";

interface Stage {
  actor: string;
  action: string;
  detail: React.ReactNode;
  icon: React.ReactNode;
  accent: string;
}

const stages: Stage[] = [
  {
    actor: "Kunde",
    action: "Skriver forespørsel på Mittanbud.no",
    accent: "text-sky-600 dark:text-sky-300",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="7" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21v-2a7 7 0 0114 0v2" />
      </svg>
    ),
    detail: (
      <>
        <p>
          «Hei, jeg trenger totalrenovering av bad på ca. 6 m². Ligger i
          Bergen. Hvor mye koster det?»
        </p>
      </>
    ),
  },
  {
    actor: "Mittanbud",
    action: "Distribuerer til matchende leverandører",
    accent: "text-amber-600 dark:text-amber-300",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    detail: (
      <>
        <p>
          Mittanbud sender mailen til 5–8 matchende håndverkere. Én av dem
          er vår bruker (snekker-as@epost.no).
        </p>
      </>
    ),
  },
  {
    actor: "Brukerens mail",
    action: "Videresender til Akseptert-adressen",
    accent: "text-orange-600 dark:text-orange-300",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l6-6m0 0l6 6m-6-6v12" />
      </svg>
    ),
    detail: (
      <>
        <p>
          Brukeren har satt opp en regel i Gmail/Outlook: alt fra{" "}
          <code>@mittanbud.no</code> videresendes til{" "}
          <code>snekker-as@leads.akseptert.no</code>. Den er generert for
          brukeren da de oppgraderte til Pro (se{" "}
          <code>generateInboundEmail</code> i <code>inbound.ts</code>).
        </p>
      </>
    ),
  },
  {
    actor: "Resend",
    action: "Fanger opp email.received",
    accent: "text-red-600 dark:text-red-300",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    detail: (
      <>
        <p>
          Resend fungerer som mail-inbound-server for hele domenet{" "}
          <code>leads.akseptert.no</code>. Når en melding ankommer, genererer
          Resend et webhook-event <code>email.received</code> og POSTer det
          til vår <code>/api/webhooks/resend-inbound</code>.
        </p>
        <p>
          Den POST-en inkluderer tre kritiske HTTP-headere:
        </p>
        <ul className="list-disc pl-5 space-y-0.5 text-xs">
          <li><code>svix-id</code> — unik ID per event</li>
          <li><code>svix-timestamp</code> — når event-en ble sendt</li>
          <li><code>svix-signature</code> — HMAC-SHA256 av body + timestamp</li>
        </ul>
      </>
    ),
  },
  {
    actor: "route.ts",
    action: "Verifiserer Svix-signaturen",
    accent: "text-akseptert-600 dark:text-akseptert-300",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    detail: (
      <>
        <p>
          Vi bruker Resend-SDK-ens <code>resend.webhooks.verify(...)</code>
          som internt kjører HMAC-SHA256 på <code>{"`${id}.${timestamp}.${body}`"}</code>
          og sammenligner mot <code>svix-signature</code>. Matcher de ikke,
          returnerer vi <code>401 Unauthorized</code> og stopper.
        </p>
      </>
    ),
  },
  {
    actor: "route.ts",
    action: "Slår opp hvilken bruker adressen tilhører",
    accent: "text-akseptert-600 dark:text-akseptert-300",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
      </svg>
    ),
    detail: (
      <>
        <p>
          <code>extractInboundSlugEmail(to)</code> plukker ut adressen på{" "}
          <code>@leads.akseptert.no</code>. Vi slår opp den mot{" "}
          <code>company_profiles</code> for å finne hvilken bruker mailen
          er beregnet for.
        </p>
        <p>
          Er brukeren ikke Pro? Returner 403 — Mittanbud-integrasjonen er
          bak paywall.
        </p>
      </>
    ),
  },
  {
    actor: "OpenAI",
    action: "Parser e-posten og genererer tilbud",
    accent: "text-fuchsia-600 dark:text-fuchsia-300",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    detail: (
      <>
        <p>
          <code>generateOfferFromEmail()</code> sender teksten til gpt-4o
          med en spesiell system-prompt (<code>MITTANBUD_PARSE_PROMPT</code>)
          som både ekstraherer kundedata og lager et komplett pristilbud i
          samme kall. Returnerer JSON.
        </p>
      </>
    ),
  },
  {
    actor: "Supabase",
    action: "Lagrer job + document",
    accent: "text-emerald-600 dark:text-emerald-300",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v7c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
      </svg>
    ),
    detail: (
      <>
        <p>
          To inserter: først en rad i <code>jobs</code> med{" "}
          <code>status=&quot;utkast&quot;</code> og{" "}
          <code>source=&quot;mittanbud-email&quot;</code>, så en i{" "}
          <code>documents</code> med det genererte tilbudet som{" "}
          <code>content_json</code>.
        </p>
        <p>
          Route-en returnerer <code>{`{ received: true, jobId }`}</code> til
          Resend. Alt hele flyten har tatt typisk 4–8 sekunder.
        </p>
      </>
    ),
  },
  {
    actor: "Bruker",
    action: "Åpner dashboard og ser utkastet klart",
    accent: "text-sky-600 dark:text-sky-300",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    detail: (
      <>
        <p>
          Når brukeren senere åpner dashboardet sitt, finner de et ferdig
          utkast med kundeinfo utfylt, oppgaver og materiell listet opp.
          De kan redigere, signere eller sende rett til kunden — hele
          den vanlige flyten minus de kjedelige ti minuttene med lesing og
          skriving.
        </p>
      </>
    ),
  },
];

export default function MittanbudPipeline() {
  const [expanded, setExpanded] = useState<number | null>(3);

  return (
    <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] p-1 sm:p-2">
      <ol className="relative">
        {stages.map((s, i) => {
          const open = expanded === i;
          return (
            <li key={i} className="relative pl-12 pr-2 sm:pr-4 py-3">
              {/* Linje mellom prikker */}
              {i < stages.length - 1 && (
                <span
                  className="absolute left-[22px] top-10 bottom-0 w-0.5 bg-akseptert-400/30"
                  aria-hidden
                />
              )}

              {/* Ikon-prikk */}
              <span
                className={`absolute left-2 top-3 w-9 h-9 rounded-full border-2 border-akseptert-400/60 bg-[var(--card)] flex items-center justify-center ${s.accent}`}
              >
                {s.icon}
              </span>

              <button
                type="button"
                onClick={() => setExpanded(open ? null : i)}
                className="w-full text-left"
                aria-expanded={open}
              >
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-[10px] font-mono text-akseptert-600 dark:text-akseptert-300">
                    Steg {i + 1}
                  </span>
                  <span className={`text-xs font-bold ${s.accent}`}>
                    {s.actor}
                  </span>
                </div>
                <p className="text-sm font-semibold">{s.action}</p>
              </button>

              <div
                className={`transition-all overflow-hidden ${
                  open ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                <div className="rounded-lg bg-akseptert-50/60 dark:bg-akseptert-950/30 border border-akseptert-400/30 p-3 text-sm space-y-2">
                  {s.detail}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
