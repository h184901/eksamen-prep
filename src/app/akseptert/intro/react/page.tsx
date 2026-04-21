"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubPageHeader from "@/components/akseptert/SubPageHeader";
import { Section, Sandbox } from "@/components/akseptert/Section";
import CodeBlock from "@/components/akseptert/CodeBlock";
import Callout from "@/components/akseptert/Callout";
import CompareTwoCols from "@/components/akseptert/CompareTwoCols";
import IntroQuiz from "@/components/akseptert/IntroQuiz";

// ──────────────────────────────────────────────────────────────────────────
// Widget 1: Live counter — viser useState i praksis. En lite render-teller
// ved siden av gjør det synlig hva "re-render" betyr.
// ──────────────────────────────────────────────────────────────────────────

function CounterDemo() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] p-5 flex flex-col items-center justify-center">
        <p className="text-xs text-[var(--muted)] mb-2">count =</p>
        <p className="text-6xl font-bold font-mono text-akseptert-600 dark:text-akseptert-300 mb-5 tabular-nums">
          {count}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCount((c) => c - 1)}
            className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 font-bold"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setCount(0)}
            className="px-4 py-2 rounded-lg border border-[var(--card-border)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 rounded-lg bg-akseptert-500 hover:bg-akseptert-600 text-white font-bold"
          >
            +
          </button>
        </div>
        <p className="text-[11px] text-[var(--muted)] mt-4 text-center">
          Komponenten har rendret{" "}
          <span className="font-mono font-bold text-akseptert-600 dark:text-akseptert-300">
            {renderCountRef.current}
          </span>{" "}
          ganger siden siden ble åpnet.
        </p>
      </div>
      <div>
        <CodeBlock
          language="tsx"
          title="CounterDemo.tsx"
          highlight={[4, 6]}
          code={`import { useState } from "react";

export default function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Øk
      </button>
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 2: Toggle — boolean state
// ──────────────────────────────────────────────────────────────────────────

function ToggleDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className={`relative w-16 h-9 rounded-full transition-colors ${
          on ? "bg-akseptert-500" : "bg-neutral-300 dark:bg-neutral-700"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-7" : ""
          }`}
        />
      </button>
      <p className="text-sm">
        <span className="text-[var(--muted)]">on = </span>
        <span className="font-mono font-bold">{on ? "true" : "false"}</span>
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 3: Text input (controlled)
// ──────────────────────────────────────────────────────────────────────────

function TextInputDemo() {
  const [name, setName] = useState("");
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Skriv navnet ditt"
          className="flex-1 px-3 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-sm"
        />
        <button
          type="button"
          onClick={() => setName("")}
          className="px-3 py-2 text-xs rounded-lg border border-[var(--card-border)] hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Tøm
        </button>
      </div>
      <div className="rounded-lg bg-neutral-100 dark:bg-neutral-900 p-3 text-sm">
        <p className="text-xs text-[var(--muted)] mb-1">Live render:</p>
        {name.length === 0 ? (
          <p className="text-[var(--muted)] italic">(skriv noe over)</p>
        ) : (
          <p>
            Hei, <span className="font-bold text-akseptert-600 dark:text-akseptert-300">{name}</span>! Du skrev{" "}
            <span className="font-mono">{name.length}</span> tegn.
          </p>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 4: useEffect demo — klokke med on/off og en logg som viser at
// effekten starter og ryddes opp (cleanup).
// ──────────────────────────────────────────────────────────────────────────

function EffectDemo() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!running) return;
    setLog((l) => [...l, "▶ Effekt startet — setInterval satt opp"]);
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearInterval(id);
      setLog((l) => [...l, "■ Cleanup kjørte — intervall stoppet"]);
    };
  }, [running]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [log.length]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] p-5">
          <p className="text-xs text-[var(--muted)] mb-2">sekunder =</p>
          <p className="text-5xl font-bold font-mono text-akseptert-600 dark:text-akseptert-300 mb-4 tabular-nums">
            {seconds}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className={`px-4 py-2 rounded-lg font-bold text-white ${
                running ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {running ? "Stopp" : "Start"}
            </button>
            <button
              type="button"
              onClick={() => {
                setSeconds(0);
                setLog([]);
              }}
              className="px-4 py-2 rounded-lg border border-[var(--card-border)] text-sm"
            >
              Nullstill
            </button>
          </div>
        </div>
        <div
          ref={logRef}
          className="mt-3 rounded-lg bg-neutral-950 text-neutral-100 p-3 h-28 overflow-y-auto font-mono text-xs"
        >
          {log.length === 0 ? (
            <p className="text-neutral-500">Trykk Start for å kjøre effekten.</p>
          ) : (
            log.map((line, i) => (
              <p
                key={i}
                className={
                  line.startsWith("▶")
                    ? "text-emerald-400"
                    : "text-red-400"
                }
              >
                {line}
              </p>
            ))
          )}
        </div>
      </div>
      <CodeBlock
        language="tsx"
        title="EffectDemo.tsx"
        highlight={[5, 6, 7, 8, 9, 10, 11]}
        code={`import { useEffect, useState } from "react";

export default function Timer({ running }: { running: boolean }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id); // cleanup
  }, [running]); // kjører på nytt hvis running endrer seg

  return <p>{seconds}s</p>;
}`}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 5: Fyll-inn-blank — lærer signaturen til useState
// ──────────────────────────────────────────────────────────────────────────

interface FillBlank {
  id: string;
  before: string;
  after: string;
  options: string[];
  correct: string;
  explanation: string;
}

function FillInTheBlankSet() {
  const blanks: FillBlank[] = [
    {
      id: "1",
      before: "const [count, ",
      after: "] = useState(0);",
      options: ["count", "setCount", "useCount", "count()"],
      correct: "setCount",
      explanation:
        "useState returnerer et array: første element er verdien, andre er setter-funksjonen. Konvensjon er å navngi den setXxx.",
    },
    {
      id: "2",
      before: "const [name, setName] = useState",
      after: "(\"\");",
      options: ["<string>", "<number>", "[string]", ": string"],
      correct: "<string>",
      explanation:
        "TypeScript-generic. Du kan også skrive useState(\"\") og la TS utlede (infer) string automatisk, men eksplisitt <string> er tydeligere.",
    },
    {
      id: "3",
      before: "useEffect(() => {\n  console.log(\"hi\");\n}, ",
      after: ");",
      options: ["[]", "{}", "undefined", "null"],
      correct: "[]",
      explanation:
        "En tom avhengighets-array [] betyr «kjør effekten én gang etter første render». Uten avhengighets-array kjører den etter hver render.",
    },
  ];

  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <div className="space-y-4">
      {blanks.map((b) => {
        const picked = picks[b.id];
        const answered = picked !== undefined;
        const correct = picked === b.correct;
        return (
          <div
            key={b.id}
            className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4"
          >
            <pre className="bg-neutral-950 text-neutral-100 rounded-lg p-3 text-sm font-mono overflow-x-auto mb-3">
              <code>
                {b.before}
                <span
                  className={`inline-block px-2 py-0.5 mx-0.5 rounded border-2 border-dashed ${
                    answered
                      ? correct
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                        : "border-red-500 bg-red-500/15 text-red-300"
                      : "border-akseptert-400 bg-akseptert-500/10 text-akseptert-300"
                  }`}
                >
                  {picked ?? "___"}
                </span>
                {b.after}
              </code>
            </pre>
            <div className="flex flex-wrap gap-2 mb-2">
              {b.options.map((opt) => {
                let style =
                  "border-[var(--card-border)] hover:border-akseptert-400 hover:bg-akseptert-50 dark:hover:bg-akseptert-950/30";
                if (answered) {
                  if (opt === b.correct)
                    style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20";
                  else if (opt === picked)
                    style = "border-red-500 bg-red-50 dark:bg-red-950/20";
                  else style = "border-[var(--card-border)] opacity-50";
                }
                return (
                  <button
                    type="button"
                    key={opt}
                    disabled={answered}
                    onClick={() => setPicks((p) => ({ ...p, [b.id]: opt }))}
                    className={`text-xs font-mono px-3 py-1.5 rounded-lg border-2 transition-all ${style} ${
                      answered ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p
                className={`text-xs p-2 rounded ${
                  correct
                    ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200"
                    : "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200"
                }`}
              >
                <strong>{correct ? "Riktig. " : "Ikke helt. "}</strong>
                {b.explanation}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 6: Render-syklus — SVG-visualisering av event → setState → render
// ──────────────────────────────────────────────────────────────────────────

function RenderCycle() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      label: "Første render",
      detail: "React kjører komponentfunksjonen, får JSX tilbake og tegner DOM-en.",
    },
    {
      label: "Bruker trykker +",
      detail: "onClick kaller setCount(count + 1).",
    },
    {
      label: "State oppdateres",
      detail: "React marker komponenten som «dirty» — den må tegnes på nytt.",
    },
    {
      label: "Re-render",
      detail: "Komponentfunksjonen kjører igjen med ny count. React sammenligner gammel og ny JSX.",
    },
    {
      label: "DOM oppdateres",
      detail: "Kun de delene som er forskjellige endres i DOM-en. Dette er Reacts «diffing».",
    },
  ];
  const active = steps[step];

  return (
    <div>
      <svg
        viewBox="0 0 720 180"
        className="w-full h-auto rounded-lg border border-[var(--card-border)] bg-[var(--card)]"
      >
        {steps.map((_, i) => {
          const cx = 80 + i * 140;
          const isActive = i === step;
          const isPast = i < step;
          return (
            <g key={i}>
              {i < steps.length - 1 && (
                <line
                  x1={cx + 28}
                  y1={90}
                  x2={cx + 112}
                  y2={90}
                  stroke={isPast ? "#6366f1" : "#e5e5e5"}
                  strokeWidth={3}
                  strokeDasharray={isPast ? "0" : "4 4"}
                />
              )}
              <circle
                cx={cx}
                cy={90}
                r={isActive ? 26 : 22}
                fill={isActive ? "#6366f1" : isPast ? "#a5b4fc" : "#f5f5f5"}
                stroke={isActive ? "#4338ca" : "#c7d2fe"}
                strokeWidth={2}
                className="transition-all"
              />
              <text
                x={cx}
                y={95}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill={isActive || isPast ? "white" : "#737373"}
              >
                {i + 1}
              </text>
              <text
                x={cx}
                y={140}
                textAnchor="middle"
                fontSize="11"
                fill="currentColor"
                className="fill-[var(--foreground)]"
              >
                {steps[i].label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 rounded-lg border border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4">
        <p className="text-sm font-bold text-akseptert-700 dark:text-akseptert-200">
          {step + 1}. {active.label}
        </p>
        <p className="text-sm text-[var(--muted)]">{active.detail}</p>
      </div>
      <div className="flex justify-between mt-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1.5 text-xs rounded-lg border border-[var(--card-border)] disabled:opacity-40 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          ← Forrige
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          className="px-3 py-1.5 text-xs rounded-lg bg-akseptert-500 hover:bg-akseptert-600 text-white disabled:opacity-40"
        >
          Neste →
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────

export default function ReactIntroPage() {
  return (
    <div>
      <SubPageHeader
        title="React Basics"
        subtitle="1 · Intro til Stacken"
        badge="useState · useEffect"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
          </svg>
        }
        lead={
          <>
            Fra Spring MVC + JSP til React: samme mål (å vise HTML til brukeren),
            ulik filosofi. Vi bygger forståelsen stein for stein med live-eksempler
            du kan trykke på.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li>
            <a href="#hva" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">
              1. Hva er React?
            </a>
          </li>
          <li>
            <a href="#spring" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">
              2. Fra Spring MVC til React
            </a>
          </li>
          <li>
            <a href="#jsx" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">
              3. JSX — HTML inni JS
            </a>
          </li>
          <li>
            <a href="#komponent" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">
              4. Ditt første komponent
            </a>
          </li>
          <li>
            <a href="#state" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">
              5. useState — å huske ting
            </a>
          </li>
          <li>
            <a href="#effekter" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">
              6. useEffect — å gjøre ting
            </a>
          </li>
          <li>
            <a href="#syklus" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">
              7. Rendring-syklusen
            </a>
          </li>
          <li>
            <a href="#test" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">
              8. Test deg selv
            </a>
          </li>
        </ul>
      </nav>

      <Section id="hva" step={1} title="Hva er React?">
        <p>
          React er et JavaScript-bibliotek fra Meta (Facebook) for å bygge
          brukergrensesnitt. I stedet for å generere HTML på serveren og sende
          ferdig markup til nettleseren, bygger React grensesnittet i nettleseren
          ved å kjøre JavaScript-funksjoner som returnerer beskrivelser av hva
          skjermen skal se ut som.
        </p>

        <Callout kind="kjernen" title="Mental modell">
          En React-app er en trestruktur av funksjoner. Hver funksjon tar inn
          <em> props </em>(argumenter) og returnerer <em>JSX</em> (HTML-lignende kode).
          React kjører funksjonene på nytt når noe forandrer seg, og oppdaterer
          bare de delene av DOM-en som faktisk er annerledes.
        </Callout>

        <p>
          Viktig detalj: React gjør ikke ting på serveren. Koden blir sendt som
          JavaScript til nettleseren, der den kjører og tegner grensesnittet.
          Next.js, som vi også bruker, kan kjøre React-komponenter både på serveren
          og i nettleseren — men det kommer vi til senere.
        </p>
      </Section>

      <Section id="spring" step={2} title="Fra Spring MVC + JSP til React">
        <p>
          Hvis du har skrevet Spring MVC med JSP, har du allerede en mental modell
          for hvordan HTML genereres. Forskjellen ligger i <strong>hvor</strong>{" "}
          det skjer og <strong>når</strong> det skjer.
        </p>

        <CompareTwoCols
          leftTitle="Spring MVC + JSP"
          leftSubtitle="Du kommer fra dette"
          rightTitle="React"
          rightSubtitle="Det du lærer nå"
          left={
            <div className="space-y-2">
              <p>
                <strong>Render skjer på serveren.</strong> Controller samler data,
                JSP-template fletter inn verdier, ferdig HTML sendes til klient.
              </p>
              <p>
                <strong>State</strong> ligger i sesjonen, databasen eller request.
                Siden er «statisk» når den først er lastet — for ny data må du
                laste siden på nytt eller bruke AJAX.
              </p>
              <p>
                <strong>Binding</strong> går gjennom annotasjoner (
                <code>@RequestMapping</code>, <code>@ModelAttribute</code>) og
                EL-uttrykk (<code>${"${user.name}"}</code>) i JSP.
              </p>
            </div>
          }
          right={
            <div className="space-y-2">
              <p>
                <strong>Render skjer i nettleseren.</strong> En JS-pakke lastes ned,
                React kjører komponentfunksjoner som returnerer JSX, og tegner DOM-en.
              </p>
              <p>
                <strong>State</strong> ligger i komponenten (via <code>useState</code>)
                eller i global state. Siden oppdaterer seg selv når state endres,
                uten en full sidelast.
              </p>
              <p>
                <strong>Binding</strong> er vanlig JavaScript:{" "}
                <code>{"{user.name}"}</code> rett inni JSX — ingen egen template-
                språk, bare uttrykk i krøllparenteser.
              </p>
            </div>
          }
        />

        <Callout kind="info" title="Ett sitat å huske">
          JSP rendrer HTML én gang, React rendrer grensesnittet hver gang state
          endres. Derfor føles React-apper «levende» — de svarer på klikk uten å
          laste siden på nytt.
        </Callout>
      </Section>

      <Section id="jsx" step={3} title="JSX — HTML inni JavaScript">
        <p>
          JSX er syntaks som ser ut som HTML, men lever inni en JavaScript-fil.
          Ikke forveksle med JSP (som lever inni HTML og fletter inn Java-uttrykk).
          JSX gjør motsatt: du skriver JavaScript, og slipper løs HTML-aktige tagger
          i returen.
        </p>

        <CompareTwoCols
          leftTitle="JSP"
          leftSubtitle="HTML med Java-uttrykk"
          rightTitle="JSX"
          rightSubtitle="JavaScript med HTML-uttrykk"
          left={
            <CodeBlock
              language="html"
              title="hello.jsp"
              code={`<%@ page language="java" %>
<html>
  <body>
    <h1>Hei, \${name}!</h1>
    <p>Du er <%= age %> år gammel.</p>
  </body>
</html>`}
            />
          }
          right={
            <CodeBlock
              language="tsx"
              title="Hello.tsx"
              code={`export default function Hello({ name, age }) {
  return (
    <div>
      <h1>Hei, {name}!</h1>
      <p>Du er {age} år gammel.</p>
    </div>
  );
}`}
            />
          }
        />

        <h3 className="text-lg font-semibold mt-4">Viktige JSX-regler</h3>
        <ul className="list-disc pl-6 space-y-1.5 marker:text-akseptert-500">
          <li>
            Komponenter må returnere <strong>ett</strong> rot-element. Trenger
            du flere, pakk dem i en <code>&lt;div&gt;</code> eller en{" "}
            <code>&lt;&gt;...&lt;/&gt;</code> (fragment).
          </li>
          <li>
            <code>class</code> i HTML heter <code>className</code> i JSX (fordi{" "}
            <code>class</code> er reservert ord i JavaScript).
          </li>
          <li>
            Alle tagger må lukkes. <code>&lt;br&gt;</code> blir{" "}
            <code>&lt;br /&gt;</code>, <code>&lt;img&gt;</code> blir{" "}
            <code>&lt;img /&gt;</code>.
          </li>
          <li>
            Krøllparenteser <code>{"{ }"}</code> er «tilbake til JavaScript».
            Alt inni er et JS-uttrykk.
          </li>
        </ul>

        <Callout kind="felle" title="Felle: if-setning i JSX">
          Du kan ikke skrive <code>if ()</code> direkte i JSX — bare uttrykk.
          Bruk ternary (<code>cond ? a : b</code>) eller <code>&&</code> i stedet:
          <CodeBlock
            language="tsx"
            code={`{isLoggedIn ? <Dashboard /> : <LoginForm />}
{items.length > 0 && <List items={items} />}`}
          />
        </Callout>
      </Section>

      <Section id="komponent" step={4} title="Ditt første komponent">
        <p>
          Et komponent er en vanlig funksjon som returnerer JSX. Navnet må starte
          med stor bokstav — det er slik React skiller dine komponenter fra
          innebygde HTML-tagger.
        </p>

        <CodeBlock
          language="tsx"
          title="Greeting.tsx"
          code={`export default function Greeting() {
  return <h1>Hei, verden!</h1>;
}`}
        />

        <p>
          «<code>export default</code>» sier at dette er fil-ens hoved-eksport.
          En annen fil kan importere den med:
        </p>

        <CodeBlock
          language="tsx"
          code={`import Greeting from "./Greeting";

export default function Home() {
  return (
    <main>
      <Greeting />
    </main>
  );
}`}
        />

        <Callout kind="tips" title="Spring-analogi">
          Et React-komponent spiller samme rolle som et <code>@Component</code> +
          JSP-fragment i Spring MVC: en gjenbrukbar byggestein som produserer
          markup. Forskjellen er at bytter mellom bruk og definisjon av
          komponent er én JavaScript-import — ingen XML, ingen annotasjoner.
        </Callout>
      </Section>

      <Section
        id="state"
        step={5}
        title="useState — hvordan React husker ting"
        subtitle="Uten state er en komponent bare en ren funksjon som returnerer den samme JSX-en hver gang."
      >
        <p>
          <code>useState</code> er en{" "}
          <em>hook</em> — en funksjon React gir deg for å koble deg på reacts
          interne maskineri. Den tar startverdien som argument og returnerer en
          array med to elementer: <strong>nåværende verdi</strong> og en{" "}
          <strong>setter-funksjon</strong>.
        </p>

        <CodeBlock
          language="tsx"
          code={`const [count, setCount] = useState(0);
//     ^^^^^  ^^^^^^^^           ^
//     verdi  setter             startverdi`}
        />

        <Sandbox
          title="Live counter"
          description="Klikk på knappene og se hvordan count og render-telleren oppdateres synkront."
        >
          <CounterDemo />
        </Sandbox>

        <Callout kind="viktig" title="Hva som faktisk skjer">
          Når du kaller <code>setCount(...)</code> planlegger React en ny render.
          Hele komponentfunksjonen kjøres på nytt, og returnerer ny JSX. React
          sammenligner den nye JSX-en med den gamle, og oppdaterer bare de
          forskjellene i DOM-en. Du mister <strong>ikke</strong> state — den
          bevares mellom renders.
        </Callout>

        <h3 className="text-lg font-semibold mt-4">useState for andre typer</h3>
        <p>
          useState kan holde på hva som helst: boolean, string, tall, array, objekt.
          Sjekk disse to i tillegg:
        </p>

        <Sandbox title="Toggle (boolean)">
          <ToggleDemo />
          <div className="mt-3">
            <CodeBlock
              language="tsx"
              code={`const [on, setOn] = useState(false);
<button onClick={() => setOn((v) => !v)}>
  {on ? "PÅ" : "AV"}
</button>`}
            />
          </div>
        </Sandbox>

        <Sandbox title="Controlled input (string)">
          <TextInputDemo />
          <div className="mt-3">
            <CodeBlock
              language="tsx"
              code={`const [name, setName] = useState("");
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`}
            />
          </div>
        </Sandbox>

        <Callout kind="felle" title="Felle: mutere state direkte">
          Du må ALLTID bruke setter-funksjonen. Dette fungerer ikke:
          <CodeBlock
            language="tsx"
            code={`// ❌ Feil — React merker ikke endringen
count = count + 1;

// ❌ Feil — list er samme objekt, React ser ingen endring
list.push(newItem);
setList(list);

// ✅ Riktig — ny verdi via setter
setCount(count + 1);

// ✅ Riktig — ny array via spread
setList([...list, newItem]);`}
          />
        </Callout>
      </Section>

      <Section
        id="effekter"
        step={6}
        title="useEffect — å gjøre ting utenfor rendring"
        subtitle="Alt som har med timers, API-kall, subscriptions eller direkte DOM-manipulering å gjøre, hører hjemme i en effekt."
      >
        <p>
          En ren komponentfunksjon skal bare beregne JSX og returnere den. Men noen
          ganger trenger du å gjøre bieffekter — starte et intervall, hente data
          fra en API, lytte på nettleserens størrelse. Til det bruker vi{" "}
          <code>useEffect</code>.
        </p>

        <CodeBlock
          language="tsx"
          code={`useEffect(() => {
  // kjøres etter render
  const id = setInterval(...);
  return () => {
    // kjøres før neste render eller når komponenten fjernes
    clearInterval(id);
  };
}, [dependencies]);`}
        />

        <ul className="list-disc pl-6 space-y-1.5 marker:text-akseptert-500">
          <li>
            <strong>Tom array <code>[]</code>:</strong> effekten kjører bare én
            gang, etter første render. Som Spring sin{" "}
            <code>@PostConstruct</code>.
          </li>
          <li>
            <strong>Array med variabler <code>[a, b]</code>:</strong> effekten
            kjører på nytt hver gang <code>a</code> eller <code>b</code> endres.
          </li>
          <li>
            <strong>Ingen array:</strong> effekten kjører etter hver render.
            Sjelden det du vil ha.
          </li>
          <li>
            <strong>return-funksjonen</strong> er «cleanup». Den rydder opp
            tidligere oppsett (intervaller, subscriptions) før effekten kjører
            på nytt eller komponenten fjernes.
          </li>
        </ul>

        <Sandbox
          title="Effekt med cleanup"
          description="Start timeren, se effekten sette opp et intervall. Stopp — cleanup kjører og intervallet ryddes bort."
        >
          <EffectDemo />
        </Sandbox>

        <Callout kind="info" title="Sammenligning med Java">
          I en Spring-controller gjør du bieffekter (database-kall, logging) rett
          i metoden — den kalles én gang per request. I React kjøres
          komponentfunksjonen mange ganger (én per render), så du kan ikke gjøre
          bieffekter direkte i funksjonen. Derfor finnes <code>useEffect</code>.
        </Callout>
      </Section>

      <Section
        id="syklus"
        step={7}
        title="Rendrings-syklusen"
        subtitle="En visuell oppsummering av det du nettopp lærte."
      >
        <RenderCycle />
      </Section>

      <Section
        id="test"
        step={8}
        title="Test deg selv"
        subtitle="Fyll inn tomrommet — og deretter flervalgsquiz."
      >
        <h3 className="text-lg font-semibold">Fyll inn blanken</h3>
        <FillInTheBlankSet />

        <h3 className="text-lg font-semibold mt-6">Flervalgsquiz</h3>
        <IntroQuiz
          questions={[
            {
              question:
                "Du trykker en knapp som kaller setCount(count + 1). Hva skjer i React?",
              options: [
                "Hele siden lastes på nytt",
                "Bare knappen re-rendres",
                "Hele komponentfunksjonen kjøres på nytt, og React oppdaterer de DOM-delene som er forskjellige",
                "State-variabelen endres, men DOM-en er uendret",
              ],
              correctIndex: 2,
              explanation:
                "Ved setState planlegger React en re-render. Komponentfunksjonen kjører igjen, React diff-er den nye JSX-en mot den gamle, og oppdaterer bare de DOM-nodene som faktisk er forskjellige.",
            },
            {
              question: "Hvilken av disse er IKKE en regel for JSX?",
              options: [
                "Må returnere ett rot-element",
                "Bruker className i stedet for class",
                "Tagger må lukkes (også <br /> og <img />)",
                "Kan bruke if-setninger direkte i JSX",
              ],
              correctIndex: 3,
              explanation:
                "JSX aksepterer bare uttrykk i krøllparenteser. For betinget rendring bruker du ternary (a ? b : c) eller &&-operatoren.",
            },
            {
              question:
                "useEffect(() => { ... }, []) — hva betyr den tomme arrayen?",
              options: [
                "Effekten kjører aldri",
                "Effekten kjører bare én gang, etter første render",
                "Effekten kjører etter hver render",
                "Det er en syntaksfeil — du må ha minst én dependency",
              ],
              correctIndex: 1,
              explanation:
                "Tom avhengighets-array betyr at effekten ikke har noen variabler å reagere på, så den kjører bare én gang etter første render. Perfekt for engangs-oppsett.",
            },
            {
              question:
                "Hva er den viktigste mentale forskjellen mellom Spring MVC og React?",
              options: [
                "Spring bruker Java, React bruker JavaScript",
                "Spring bygger HTML på serveren én gang per request, React bygger grensesnittet i nettleseren og re-tegner når state endres",
                "React kan ikke koble seg til en database",
                "Spring har annotasjoner, React har ikke",
              ],
              correctIndex: 1,
              explanation:
                "Språket er overflate. Kjernen: Spring MVC + JSP rendrer serverside og sender statisk HTML. React rendrer klientside og oppdaterer grensesnittet reaktivt når state endres — uten sidelast.",
            },
          ]}
        />
      </Section>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-5">
        <div>
          <p className="text-xs font-bold text-akseptert-600 dark:text-akseptert-300 uppercase tracking-wide">
            Neste steg
          </p>
          <p className="text-lg font-bold">TypeScript Basics</p>
          <p className="text-sm text-[var(--muted)]">
            Vi har brukt TS-syntaks allerede. Nå går vi på hva det faktisk betyr.
          </p>
        </div>
        <Link
          href="/akseptert/intro/typescript"
          className="px-4 py-2 rounded-lg bg-akseptert-500 hover:bg-akseptert-600 text-white font-semibold text-sm"
        >
          Fortsett →
        </Link>
      </div>
    </div>
  );
}
