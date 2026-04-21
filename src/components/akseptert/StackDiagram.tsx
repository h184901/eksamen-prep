"use client";

import { useState } from "react";

type ServiceId = "vercel" | "clerk" | "supabase-db" | "supabase-storage" | "openai" | "stripe" | "resend" | "fiken" | "plausible";

interface Service {
  id: ServiceId;
  name: string;
  role: string;
  connectsTo: ServiceId[];
  envVars: string[];
  pricing: string;
  details: React.ReactNode;
}

const services: Record<ServiceId, Service> = {
  vercel: {
    id: "vercel",
    name: "Vercel",
    role: "Hosting",
    connectsTo: ["clerk", "supabase-db", "supabase-storage", "openai", "stripe", "resend", "fiken"],
    envVars: [],
    pricing: "Pro ~$20/mnd",
    details: (
      <>
        <p>
          Hvor Akseptert faktisk kjører. Deployer automatisk ved git push.
          Kjører Server Components og Server Actions på Fluid Compute —
          Node.js-runtime som gjenbruker instanser mellom requests.
        </p>
        <p>
          Env-variabler konfigureres i Vercel-dashboardet og speiles til{" "}
          <code>.env.local</code> for utvikling.
        </p>
      </>
    ),
  },
  clerk: {
    id: "clerk",
    name: "Clerk",
    role: "Authentication",
    connectsTo: ["supabase-db"],
    envVars: ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"],
    pricing: "$25/mnd for 10k brukere",
    details: (
      <>
        <p>
          Håndterer hele innlogging + passord-reset + social login. Akseptert
          bruker norsk lokalisering (<code>nbNO</code>) slik at innloggings-
          skjermene er på norsk.
        </p>
        <p>
          Hver gang vi kaller <code>auth()</code> i en Server Component, er
          det Clerk som verifiserer session-cookien.
        </p>
      </>
    ),
  },
  "supabase-db": {
    id: "supabase-db",
    name: "Supabase DB",
    role: "Postgres-database",
    connectsTo: [],
    envVars: [
      "NEXT_PUBLIC_SUPABASE_URL",
      "SUPABASE_SERVICE_ROLE_KEY",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    ],
    pricing: "$25/mnd Pro",
    details: (
      <>
        <p>
          En hosted Postgres. Tabeller som <code>profiles</code>,{" "}
          <code>company_profiles</code>, <code>jobs</code>,{" "}
          <code>material_prices</code>. Bruker <code>clerk_user_id</code>{" "}
          som foreign key for å koble til Clerk-bruker.
        </p>
        <p>
          Akseptert bruker service-role-nøkkelen på serveren (full tilgang).
          I klient-komponenter vil man brukt anon-nøkkelen + Row Level
          Security.
        </p>
      </>
    ),
  },
  "supabase-storage": {
    id: "supabase-storage",
    name: "Supabase Storage",
    role: "Fil-lagring",
    connectsTo: [],
    envVars: [],
    pricing: "Inkludert i Supabase Pro",
    details: (
      <>
        <p>
          S3-kompatibel fil-lagring. Akseptert legger befaringsbilder i
          <code> job_images</code>-bucketen. Hver bruker har sin egen prefix (
          <code>{`${"{userId}"}/${"{timestamp}"}_${"{filename}"}`}</code>).
        </p>
        <p>
          Filene får en public URL som legges på tilbudet sammen med
          tekstinnholdet.
        </p>
      </>
    ),
  },
  openai: {
    id: "openai",
    name: "OpenAI",
    role: "AI-modell",
    connectsTo: [],
    envVars: ["OPENAI_API_KEY"],
    pricing: "Betaler per token (gpt-4o ~$5/1M)",
    details: (
      <>
        <p>
          Akseptert bruker <code>gpt-4o</code> (multimodal — kan se bilder)
          for tilbudsgenerering, og <code>gpt-4o-mini</code> for enklere
          oppgaver som e-post-parsing.
        </p>
        <p>
          Alltid kalt fra Server Actions med <code>response_format: json_object</code>{" "}
          og lav temperatur.
        </p>
      </>
    ),
  },
  stripe: {
    id: "stripe",
    name: "Stripe",
    role: "Betaling",
    connectsTo: ["supabase-db"],
    envVars: [
      "STRIPE_SECRET_KEY",
      "STRIPE_WEBHOOK_SECRET",
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    ],
    pricing: "2.4 % + 1.80 kr per transaksjon",
    details: (
      <>
        <p>
          Håndterer abonnementer (Pro-opgrader). Akseptert bruker Stripe
          Checkout — brukeren sendes til Stripe sitt domene, betaler, og
          kommer tilbake.
        </p>
        <p>
          <code>/api/webhooks/stripe/route.ts</code> lytter på{" "}
          <code>checkout.session.completed</code> og oppdaterer{" "}
          <code>profiles.is_pro</code> i Supabase.
        </p>
      </>
    ),
  },
  resend: {
    id: "resend",
    name: "Resend",
    role: "E-post",
    connectsTo: [],
    envVars: ["RESEND_API_KEY"],
    pricing: "Gratis opp til 3000/mnd",
    details: (
      <>
        <p>
          Sender transaksjons-e-poster: tilbud til kunder, bekreftelser,
          passord-reset-varsler. Bruker React-komponenter som maler (skrevet
          i TSX).
        </p>
        <p>
          Har også <em>inbound</em> — kundekorrespondanse sendt til en
          Resend-adresse kan mottas i <code>/api/webhooks/resend-inbound</code>.
        </p>
      </>
    ),
  },
  fiken: {
    id: "fiken",
    name: "Fiken API",
    role: "Regnskap-eksport",
    connectsTo: [],
    envVars: ["FIKEN_API_BASE_URL"],
    pricing: "Kunden betaler for Fiken",
    details: (
      <>
        <p>
          Norsk regnskapsprogram. Når et tilbud blir akseptert og kunden
          signerer, kan Akseptert eksportere det rett til Fiken som et
          fakturagrunnlag.
        </p>
        <p>
          Brukeren oppgir sin egen Fiken-API-nøkkel som vi lagrer kryptert
          i Supabase.
        </p>
      </>
    ),
  },
  plausible: {
    id: "plausible",
    name: "Plausible",
    role: "Analytics",
    connectsTo: [],
    envVars: [],
    pricing: "$9/mnd",
    details: (
      <>
        <p>
          Analytics uten cookies og GDPR-trøbbel. Scriptet lastes i rot-
          layoutet. Skiller seg fra Google Analytics ved at det er privat-
          vennlig og lett.
        </p>
      </>
    ),
  },
};

const positions: Record<ServiceId, { x: number; y: number }> = {
  vercel:              { x: 400, y: 180 },
  clerk:               { x: 120, y: 80 },
  "supabase-db":       { x: 680, y: 80 },
  "supabase-storage":  { x: 680, y: 180 },
  openai:              { x: 680, y: 280 },
  stripe:              { x: 120, y: 280 },
  resend:              { x: 120, y: 180 },
  fiken:               { x: 400, y: 40 },
  plausible:           { x: 400, y: 320 },
};

const serviceStyles: Record<ServiceId, string> = {
  vercel: "bg-neutral-800 border-neutral-500 text-neutral-100",
  clerk: "bg-amber-900/40 border-amber-500 text-amber-100",
  "supabase-db": "bg-emerald-900/40 border-emerald-500 text-emerald-100",
  "supabase-storage": "bg-emerald-900/40 border-emerald-500 text-emerald-100",
  openai: "bg-fuchsia-900/40 border-fuchsia-500 text-fuchsia-100",
  stripe: "bg-indigo-900/40 border-indigo-500 text-indigo-100",
  resend: "bg-red-900/40 border-red-500 text-red-100",
  fiken: "bg-sky-900/40 border-sky-500 text-sky-100",
  plausible: "bg-violet-900/40 border-violet-500 text-violet-100",
};

export default function StackDiagram() {
  const [selected, setSelected] = useState<ServiceId>("vercel");
  const active = services[selected];

  const allIds = Object.keys(services) as ServiceId[];

  return (
    <div className="grid lg:grid-cols-[1fr_20rem] gap-4">
      <div className="rounded-xl border border-akseptert-400/40 bg-neutral-950 text-neutral-100 p-3 overflow-hidden">
        <svg viewBox="0 0 800 380" className="w-full h-auto">
          {/* Lines fra Vercel til alt det kobler til */}
          {services.vercel.connectsTo.map((t) => {
            const from = positions.vercel;
            const to = positions[t];
            const isActive = selected === t || selected === "vercel";
            return (
              <line
                key={t}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? "#818cf8" : "#404040"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray="5 5"
              />
            );
          })}

          {/* Line fra Stripe til supabase-db (webhook oppdaterer DB) */}
          <line
            x1={positions.stripe.x}
            y1={positions.stripe.y}
            x2={positions["supabase-db"].x}
            y2={positions["supabase-db"].y}
            stroke={selected === "stripe" || selected === "supabase-db" ? "#a5b4fc" : "#2d2d2d"}
            strokeWidth={1}
            strokeDasharray="2 4"
          />

          {/* Line fra Clerk til supabase-db */}
          <line
            x1={positions.clerk.x}
            y1={positions.clerk.y}
            x2={positions["supabase-db"].x}
            y2={positions["supabase-db"].y}
            stroke={selected === "clerk" || selected === "supabase-db" ? "#a5b4fc" : "#2d2d2d"}
            strokeWidth={1}
            strokeDasharray="2 4"
          />

          {/* Bokser */}
          {allIds.map((id) => {
            const pos = positions[id];
            const svc = services[id];
            const isSelected = selected === id;
            return (
              <g
                key={id}
                transform={`translate(${pos.x - 70}, ${pos.y - 22})`}
                className="cursor-pointer"
                onClick={() => setSelected(id)}
              >
                <rect
                  width={140}
                  height={44}
                  rx={8}
                  className={`transition-all ${isSelected ? "stroke-[3]" : "stroke-[1.5]"}`}
                  style={{
                    fill: isSelected ? "#4338ca" : "#171717",
                    stroke: isSelected ? "#c7d2fe" : "#525252",
                  }}
                />
                <text
                  x={70}
                  y={20}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={isSelected ? "#e0e7ff" : "#e5e5e5"}
                >
                  {svc.name}
                </text>
                <text
                  x={70}
                  y={34}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="ui-monospace, monospace"
                  fill={isSelected ? "#c7d2fe" : "#a3a3a3"}
                >
                  {svc.role}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="text-[10px] text-neutral-500 text-center font-mono mt-1">
          Klikk en tjeneste for å se detaljer →
        </p>
      </div>

      <aside className="rounded-xl border border-akseptert-400/40 bg-gradient-to-br from-akseptert-50/80 to-indigo-50/40 dark:from-akseptert-950/40 dark:to-indigo-950/20 p-4 overflow-y-auto max-h-[450px]">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full ${serviceStyles[active.id]}`}
          />
          <h4 className="font-bold text-lg">{active.name}</h4>
        </div>
        <p className="text-xs text-akseptert-600 dark:text-akseptert-300 font-semibold mb-2">
          {active.role}
        </p>
        <div className="text-sm text-[var(--foreground)]/90 space-y-2 mb-3">
          {active.details}
        </div>

        <div className="rounded-lg bg-white/60 dark:bg-neutral-900/60 border border-[var(--card-border)] p-2.5 mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
            Kostnad
          </p>
          <p className="text-xs font-mono">{active.pricing}</p>
        </div>

        {active.envVars.length > 0 && (
          <div className="rounded-lg bg-white/60 dark:bg-neutral-900/60 border border-[var(--card-border)] p-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              Env-variabler
            </p>
            <ul className="space-y-1">
              {active.envVars.map((v) => (
                <li key={v} className="text-[11px] font-mono break-all">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
