"use client";

import { useEffect, useRef, useState } from "react";

type Service = "browser" | "action" | "clerk" | "supabase" | "storage" | "openai";

interface FlowStep {
  from: Service;
  to: Service;
  label: string;
  short: string;
  detail: React.ReactNode;
  codeSnippet?: string;
  durationMs: number;
}

const servicePositions: Record<Service, { x: number; y: number; label: string; sub: string }> = {
  browser:  { x: 80,   y: 80,  label: "Browser",        sub: "ny/page.tsx" },
  action:   { x: 360,  y: 80,  label: "Server Action",  sub: "generate.ts" },
  clerk:    { x: 620,  y: 30,  label: "Clerk",          sub: "auth()" },
  supabase: { x: 620,  y: 130, label: "Supabase DB",    sub: "profiles, company_profiles" },
  storage:  { x: 620,  y: 230, label: "Supabase Storage", sub: "job_images" },
  openai:   { x: 360,  y: 260, label: "OpenAI",         sub: "gpt-4o" },
};

const steps: FlowStep[] = [
  {
    from: "browser",
    to: "action",
    label: "1. Bruker trykker Generer",
    short: "formData → Server Action",
    durationMs: 1200,
    codeSnippet: `const result = await generateJobOffer(formData);`,
    detail: (
      <>
        <p>
          Klienten kaller Server Action-funksjonen. Under panseret serialiserer
          Next.js FormData og sender en skjult HTTP POST. Men fra vårt
          perspektiv ser det ut som et vanlig funksjonskall.
        </p>
        <p>
          FormData inneholder både tekst (<code>instructions</code>) og filer
          (<code>files</code>).
        </p>
      </>
    ),
  },
  {
    from: "action",
    to: "clerk",
    label: "2. Sjekk hvem som er logget inn",
    short: "await auth()",
    durationMs: 1000,
    codeSnippet: `const { userId } = await auth();
if (!userId) return { ok: false, error: "Ikke logget inn" };`,
    detail: (
      <p>
        Clerk verifiserer session-cookien. Vi får tilbake en{" "}
        <code>userId</code> hvis brukeren er innlogget. Ellers avbryter vi
        tidlig.
      </p>
    ),
  },
  {
    from: "action",
    to: "supabase",
    label: "3. Hent brukerprofil",
    short: "SELECT profiles",
    durationMs: 1200,
    codeSnippet: `const { data: profile } = await supabase
  .from("profiles")
  .select("is_pro, scans_remaining")
  .eq("id", userId)
  .maybeSingle();`,
    detail: (
      <p>
        Leser brukerens abonnementsstatus. Bestemmer om de har kvote igjen
        eller om vi må avvise med <code>QUOTA_EXCEEDED</code>.
      </p>
    ),
  },
  {
    from: "action",
    to: "storage",
    label: "4. Last opp bildene",
    short: "upload til job_images",
    durationMs: 1800,
    codeSnippet: `await supabase.storage
  .from("job_images")
  .upload(fileName, buffer, { contentType: file.type });`,
    detail: (
      <>
        <p>
          For hvert bilde: konverter til <code>ArrayBuffer</code>, base64-kod
          for OpenAI, last opp til Supabase Storage for visning senere.
        </p>
        <p>
          Dette er parallelliserbart, men Akseptert kjører dem sekvensielt
          for enkelhet.
        </p>
      </>
    ),
  },
  {
    from: "action",
    to: "openai",
    label: "5. Send til OpenAI",
    short: "fetch(chat/completions)",
    durationMs: 2600,
    codeSnippet: `const res = await fetch(OPENAI_API_URL, {
  method: "POST",
  headers: { Authorization: \`Bearer \${apiKey}\` },
  body: JSON.stringify({
    model: "gpt-4o",
    messages: [system, user],
    response_format: { type: "json_object" },
    temperature: 0.2,
  }),
});`,
    detail: (
      <>
        <p>
          Bildene (base64) og instruksjonen legges som <code>user</code>-
          melding. Den lange systemprompten med norske prisregler og
          bransjekontekst er <code>system</code>-meldingen.
        </p>
        <p>
          Dette er den tregeste delen — typisk 3–15 sekunder før svaret
          kommer.
        </p>
      </>
    ),
  },
  {
    from: "openai",
    to: "action",
    label: "6. OpenAI returnerer JSON",
    short: "res.json() + JSON.parse",
    durationMs: 1400,
    codeSnippet: `const json = await res.json();
const content = json.choices[0].message.content;
offerData = JSON.parse(content) as JobOfferData;`,
    detail: (
      <>
        <p>
          Svaret er en JSON-struktur OpenAI pakker inn i egen JSON. Vi
          pakker ut en gang for å få modellens <code>content</code>-streng,
          deretter en gang til for å få vårt strukturerte tilbud.
        </p>
      </>
    ),
  },
  {
    from: "action",
    to: "supabase",
    label: "7. Oppdater kvote",
    short: "UPDATE profiles",
    durationMs: 1100,
    codeSnippet: `await supabase
  .from("profiles")
  .update({ scans_remaining: (profile.scans_remaining ?? 1) - 1 })
  .eq("id", userId);`,
    detail: (
      <p>
        Kjøres bare for gratisbrukere. Reduserer{" "}
        <code>scans_remaining</code> med 1 slik at vi kan enforce kvoten
        ved neste kall.
      </p>
    ),
  },
  {
    from: "action",
    to: "browser",
    label: "8. Svar tilbake til UI",
    short: "return { ok, data }",
    durationMs: 1000,
    codeSnippet: `return { ok: true, data: offerData, source };

// På klienten:
setJobResult(result);`,
    detail: (
      <>
        <p>
          Server Action-en returnerer resultatet. Next.js serialiserer det
          som JSON tilbake til klienten, der{" "}
          <code>setJobResult</code> oppdaterer React-state og UI-et
          re-rendrer.
        </p>
        <p>
          <code>JobOfferPreview</code>-komponenten viser det ferdige
          tilbudet med oppgaver, materiell og totalpris.
        </p>
      </>
    ),
  },
];

interface Props {
  autoPlayOnMount?: boolean;
}

export default function DataFlowDiagram({ autoPlayOnMount = false }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(autoPlayOnMount);
  const [progress, setProgress] = useState(0); // 0..1 innenfor aktivt steg
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    lastTimeRef.current = performance.now();
    const tick = (now: number) => {
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;
      const step = steps[currentStep];
      setProgress((p) => {
        const next = p + dt / step.durationMs;
        if (next >= 1) {
          if (currentStep < steps.length - 1) {
            setCurrentStep((s) => s + 1);
            return 0;
          } else {
            setPlaying(false);
            return 1;
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, currentStep]);

  const current = steps[currentStep];
  const from = servicePositions[current.from];
  const to = servicePositions[current.to];
  const packetX = from.x + (to.x - from.x) * progress;
  const packetY = from.y + (to.y - from.y) * progress;

  function jumpTo(i: number) {
    setCurrentStep(i);
    setProgress(0);
    setPlaying(false);
  }

  function reset() {
    setCurrentStep(0);
    setProgress(0);
    setPlaying(false);
  }

  return (
    <div>
      <div className="rounded-xl border border-akseptert-400/40 bg-neutral-950 text-neutral-100 overflow-hidden">
        <svg viewBox="0 0 760 320" className="w-full h-auto">
          {/* Forbindelser (sorterte etter fra-til) */}
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#6366f1" />
            </marker>
          </defs>

          {[
            { from: "browser", to: "action" },
            { from: "action", to: "clerk" },
            { from: "action", to: "supabase" },
            { from: "action", to: "storage" },
            { from: "action", to: "openai" },
            { from: "openai", to: "action" },
          ].map((edge, i) => {
            const a = servicePositions[edge.from as Service];
            const b = servicePositions[edge.to as Service];
            const isActive =
              (current.from === edge.from && current.to === edge.to) ||
              (current.from === edge.to && current.to === edge.from);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isActive ? "#a5b4fc" : "#404040"}
                strokeWidth={isActive ? 2 : 1.5}
                strokeDasharray="4 6"
              />
            );
          })}

          {/* Bokser per service */}
          {(Object.keys(servicePositions) as Service[]).map((key) => {
            const pos = servicePositions[key];
            const isActiveService =
              current.from === key || current.to === key;
            return (
              <g key={key}>
                <rect
                  x={pos.x - 60}
                  y={pos.y - 22}
                  width={120}
                  height={44}
                  rx={8}
                  fill={isActiveService ? "#4338ca" : "#171717"}
                  stroke={isActiveService ? "#818cf8" : "#404040"}
                  strokeWidth={2}
                  className="transition-colors"
                />
                <text
                  x={pos.x}
                  y={pos.y - 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={isActiveService ? "#e0e7ff" : "#d4d4d4"}
                >
                  {pos.label}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 12}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="ui-monospace, monospace"
                  fill={isActiveService ? "#a5b4fc" : "#737373"}
                >
                  {pos.sub}
                </text>
              </g>
            );
          })}

          {/* Animert pakke */}
          <g transform={`translate(${packetX}, ${packetY})`}>
            <circle r="10" fill="#6366f1" opacity="0.25" />
            <circle r="6" fill="#818cf8" />
            <circle r="3" fill="white" />
          </g>
        </svg>

        {/* Kontroller */}
        <div className="flex items-center justify-between gap-2 p-3 bg-neutral-900 border-t border-neutral-800">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="text-xs px-3 py-1.5 rounded bg-akseptert-500 hover:bg-akseptert-600 text-white font-semibold min-w-[90px]"
          >
            {playing ? "❚❚ Pause" : currentStep === steps.length - 1 && progress === 1 ? "↻ Spill igjen" : "▶ Spill"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="text-xs px-3 py-1.5 rounded border border-neutral-700 hover:bg-neutral-800 text-neutral-200"
          >
            Reset
          </button>
          <div className="flex-1 mx-3">
            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-akseptert-500 transition-[width] duration-150"
                style={{
                  width: `${(((currentStep + progress) / steps.length) * 100).toFixed(1)}%`,
                }}
              />
            </div>
          </div>
          <p className="text-[10px] font-mono text-neutral-400">
            {currentStep + 1} / {steps.length}
          </p>
        </div>
      </div>

      {/* Steg-liste og detalj */}
      <div className="grid md:grid-cols-[15rem_1fr] gap-3 mt-3">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-2 max-h-[320px] overflow-y-auto">
          {steps.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jumpTo(i)}
              className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors flex items-center gap-2 ${
                i === currentStep
                  ? "bg-akseptert-500/15 text-akseptert-700 dark:text-akseptert-200"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 ${
                  i < currentStep
                    ? "bg-emerald-500 text-white"
                    : i === currentStep
                      ? "bg-akseptert-500 text-white"
                      : "bg-neutral-200 dark:bg-neutral-800 text-[var(--muted)]"
                }`}
              >
                {i + 1}
              </span>
              <span className="truncate">{s.label.replace(/^\d+\.\s/, "")}</span>
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-akseptert-400/40 bg-akseptert-50/60 dark:bg-akseptert-950/30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-akseptert-600 dark:text-akseptert-300 mb-1">
            Steg {currentStep + 1}
          </p>
          <h4 className="font-bold text-sm mb-1">{current.label}</h4>
          <p className="text-xs text-[var(--muted)] mb-3">{current.short}</p>
          {current.codeSnippet && (
            <pre className="bg-neutral-950 text-neutral-100 rounded-lg p-3 text-[12px] font-mono overflow-x-auto mb-3">
              <code className="whitespace-pre">{current.codeSnippet}</code>
            </pre>
          )}
          <div className="text-sm space-y-2 text-[var(--foreground)]/90">
            {current.detail}
          </div>
        </div>
      </div>
    </div>
  );
}
