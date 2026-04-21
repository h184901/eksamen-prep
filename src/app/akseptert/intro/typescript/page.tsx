"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SubPageHeader from "@/components/akseptert/SubPageHeader";
import { Section, Sandbox } from "@/components/akseptert/Section";
import CodeBlock from "@/components/akseptert/CodeBlock";
import Callout from "@/components/akseptert/Callout";
import CompareTwoCols from "@/components/akseptert/CompareTwoCols";
import IntroQuiz from "@/components/akseptert/IntroQuiz";

// ──────────────────────────────────────────────────────────────────────────
// Widget 1: Type Checker — skriv en verdi, velg forventet type, få feedback
// ──────────────────────────────────────────────────────────────────────────

type TsType = "string" | "number" | "boolean" | "string | number" | "unknown" | "any";

function parseLiteral(raw: string): {
  label: string;
  jsType: "string" | "number" | "boolean" | "undefined" | "null" | "object" | "bigint" | "symbol" | "function";
} {
  const trimmed = raw.trim();
  if (trimmed === "") return { label: '""', jsType: "string" };
  if (trimmed === "true" || trimmed === "false")
    return { label: trimmed, jsType: "boolean" };
  if (trimmed === "null") return { label: "null", jsType: "null" };
  if (trimmed === "undefined") return { label: "undefined", jsType: "undefined" };

  // numeric literal
  if (/^-?\d+(\.\d+)?$/.test(trimmed))
    return { label: trimmed, jsType: "number" };

  // string literal (wrapped in quotes) — treat as string
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  )
    return { label: trimmed, jsType: "string" };

  // fallback: treat as string
  return { label: `"${trimmed}"`, jsType: "string" };
}

function checkAssign(valueJsType: string, declared: TsType): {
  ok: boolean;
  message: string;
} {
  if (declared === "any") {
    return { ok: true, message: "any godtar alt — men prøv å unngå any." };
  }
  if (declared === "unknown") {
    return {
      ok: true,
      message:
        "unknown godtar alt, men du må narrow-e typen før du kan bruke verdien.",
    };
  }
  if (declared === "string | number") {
    if (valueJsType === "string" || valueJsType === "number")
      return { ok: true, message: "Verdien passer én av typene i unionen." };
    return {
      ok: false,
      message: `Type '${valueJsType}' is not assignable to type 'string | number'.`,
    };
  }
  if (valueJsType === declared) {
    return { ok: true, message: "Verdien matcher den deklarerte typen." };
  }
  return {
    ok: false,
    message: `Type '${valueJsType}' is not assignable to type '${declared}'.`,
  };
}

function TypeCheckerWidget() {
  const [raw, setRaw] = useState('"hei"');
  const [declared, setDeclared] = useState<TsType>("string");

  const parsed = parseLiteral(raw);
  const result = checkAssign(parsed.jsType, declared);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-1">
          Verdi
        </label>
        <input
          type="text"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder='"tekst", 42, true, null'
          className="w-full px-3 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-sm font-mono mb-3"
        />

        <label className="block text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-1">
          Forventet type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {(["string", "number", "boolean", "string | number", "any", "unknown"] as TsType[]).map(
            (t) => (
              <button
                type="button"
                key={t}
                onClick={() => setDeclared(t)}
                className={`text-xs font-mono px-2 py-1.5 rounded-lg border-2 transition-colors ${
                  declared === t
                    ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/30"
                    : "border-[var(--card-border)] hover:border-akseptert-400/60"
                }`}
              >
                {t}
              </button>
            ),
          )}
        </div>
      </div>

      <div>
        <CodeBlock
          language="ts"
          code={`const x: ${declared} = ${parsed.label};`}
          title="Det TypeScript sjekker"
        />
        <div
          className={`mt-2 rounded-lg border-2 p-3 text-sm ${
            result.ok
              ? "border-emerald-400/60 bg-emerald-50/70 dark:bg-emerald-950/30"
              : "border-red-400/60 bg-red-50/70 dark:bg-red-950/30"
          }`}
        >
          <p className="font-bold mb-1">
            {result.ok ? "✓ OK" : "✗ TypeError"}
          </p>
          <p className="text-xs text-[var(--muted)]">
            <span className="font-mono">Value type:</span>{" "}
            <span className="font-mono font-bold">{parsed.jsType}</span>
          </p>
          <p className="text-sm mt-1">{result.message}</p>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 2: Interface matcher — velg hvilke felter et objekt skal ha, og
// se live om det tilfredsstiller interface User.
// ──────────────────────────────────────────────────────────────────────────

interface UserField {
  name: string;
  type: "string" | "number" | "boolean";
  required: boolean;
  sample: string;
}

const userFields: UserField[] = [
  { name: "id", type: "number", required: true, sample: "42" },
  { name: "name", type: "string", required: true, sample: '"Erlend"' },
  { name: "email", type: "string", required: true, sample: '"e@eksempel.no"' },
  { name: "age", type: "number", required: false, sample: "25" },
  { name: "isAdmin", type: "boolean", required: false, sample: "false" },
];

function InterfaceMatcherWidget() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    id: true,
    name: true,
  });
  const [wrongTypes, setWrongTypes] = useState<Record<string, boolean>>({});

  function toggle(name: string) {
    setSelected((s) => ({ ...s, [name]: !s[name] }));
  }
  function toggleWrong(name: string) {
    setWrongTypes((w) => ({ ...w, [name]: !w[name] }));
  }

  const missing = userFields.filter(
    (f) => f.required && !selected[f.name],
  );
  const wrongOnes = userFields.filter(
    (f) => selected[f.name] && wrongTypes[f.name],
  );
  const ok = missing.length === 0 && wrongOnes.length === 0;

  const objectCode = useMemo(() => {
    const lines: string[] = ["const user: User = {"];
    userFields.forEach((f) => {
      if (!selected[f.name]) return;
      const value = wrongTypes[f.name]
        ? f.type === "string"
          ? "123"
          : f.type === "number"
            ? '"ikke-et-tall"'
            : '"ja"'
        : f.sample;
      lines.push(`  ${f.name}: ${value},`);
    });
    lines.push("};");
    return lines.join("\n");
  }, [selected, wrongTypes]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <CodeBlock
          language="ts"
          title="Interfacet"
          code={`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;      // valgfritt
  isAdmin?: boolean; // valgfritt
}`}
        />

        <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mt-3 mb-2">
          Bygg objektet
        </p>
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 space-y-1.5">
          {userFields.map((f) => (
            <div key={f.name} className="flex items-center gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={!!selected[f.name]}
                  onChange={() => toggle(f.name)}
                  className="accent-akseptert-500"
                />
                <span className="font-mono">
                  {f.name}
                  {!f.required && <span className="text-[var(--muted)]">?</span>}
                  :{" "}
                  <span className="text-akseptert-600 dark:text-akseptert-300">
                    {f.type}
                  </span>
                </span>
              </label>
              {selected[f.name] && (
                <label className="flex items-center gap-1 text-[11px] text-red-600 dark:text-red-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!wrongTypes[f.name]}
                    onChange={() => toggleWrong(f.name)}
                    className="accent-red-500"
                  />
                  feil type
                </label>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <CodeBlock
          language="ts"
          title="Objektet ditt"
          code={objectCode}
        />
        <div
          className={`mt-2 rounded-lg border-2 p-3 text-sm ${
            ok
              ? "border-emerald-400/60 bg-emerald-50/70 dark:bg-emerald-950/30"
              : "border-red-400/60 bg-red-50/70 dark:bg-red-950/30"
          }`}
        >
          <p className="font-bold mb-2">
            {ok ? "✓ Matcher User" : "✗ Feiler type-sjekk"}
          </p>
          {missing.length > 0 && (
            <p className="text-xs mb-1">
              <strong>Mangler påkrevde felter:</strong>{" "}
              <code>{missing.map((m) => m.name).join(", ")}</code>
            </p>
          )}
          {wrongOnes.map((f) => (
            <p key={f.name} className="text-xs mb-1">
              <strong>Feil type for <code>{f.name}</code>:</strong> forventet{" "}
              <code>{f.type}</code>.
            </p>
          ))}
          {ok && (
            <p className="text-xs text-[var(--muted)]">
              Alle påkrevde felter er med og alle typer stemmer.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────

export default function TypescriptIntroPage() {
  return (
    <div>
      <SubPageHeader
        title="TypeScript Basics"
        subtitle="2 · Intro til Stacken"
        badge="types · interfaces"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path strokeLinecap="round" d="M8 10.5h4M10 10.5V16M14.5 14.5c.5.8 1.3 1.5 2.5 1.5 1.4 0 2-.8 2-1.6 0-.8-.6-1.3-1.8-1.7-1.2-.4-1.7-.8-1.7-1.5 0-.7.6-1.2 1.5-1.2.8 0 1.3.4 1.7 1" />
          </svg>
        }
        lead={
          <>
            TypeScript er JavaScript med typer på toppen. Hvis du liker at Java
            fanger feil før koden kjøres, kommer du til å like TypeScript.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#hva" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Hva er TypeScript?</a></li>
          <li><a href="#java" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. Java vs JS vs TS</a></li>
          <li><a href="#typer" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. Grunnleggende typer</a></li>
          <li><a href="#sjekker" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. Type Checker-widget</a></li>
          <li><a href="#interfaces" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. Interfaces og objekter</a></li>
          <li><a href="#matcher" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. Interface Matcher</a></li>
          <li><a href="#union" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">7. Union og literal</a></li>
          <li><a href="#generics" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">8. Generics</a></li>
          <li><a href="#test" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">9. Test deg selv</a></li>
        </ul>
      </nav>

      <Section id="hva" step={1} title="Hva er TypeScript?">
        <p>
          TypeScript er et språk som utvider JavaScript med et statisk type-system.
          Typene finnes bare når du skriver og kompilerer koden — før den kjører
          i nettleseren blir den «strippet» til vanlig JavaScript. TypeScript er
          med andre ord en <strong>kompilator</strong> som både sjekker typer og
          skriver om koden til JS.
        </p>

        <Callout kind="kjernen" title="Den enkleste måten å tenke på det">
          <p>
            JavaScript = dynamisk typing (som Python). Feil oppdages først når
            koden kjører.
          </p>
          <p>
            TypeScript = statisk typing (som Java). Feil oppdages før koden
            kjører — i editoren din.
          </p>
        </Callout>

        <p>
          I praksis er TS-filer <code>.ts</code> eller (hvis de inneholder JSX){" "}
          <code>.tsx</code>. Bruker du bygge-verktøyet i Next.js eller Vite skjer
          kompileringen automatisk.
        </p>
      </Section>

      <Section id="java" step={2} title="Fra Java til TypeScript">
        <p>
          Mye er likt Java. Men TS-typer er mer fleksible: de beskriver gjerne
          <em> formen </em>på data i stedet for å definere klasser.
        </p>

        <CompareTwoCols
          leftTitle="Java"
          rightTitle="TypeScript"
          left={
            <CodeBlock
              language="java"
              code={`public class User {
  private int id;
  private String name;
  private boolean admin;

  public User(int id, String name, boolean admin) {
    this.id = id;
    this.name = name;
    this.admin = admin;
  }
}`}
            />
          }
          right={
            <CodeBlock
              language="ts"
              code={`interface User {
  id: number;
  name: string;
  admin: boolean;
}

const u: User = {
  id: 1,
  name: "Erlend",
  admin: false,
};`}
            />
          }
        />

        <Callout kind="info" title="Nøkkelforskjell">
          I Java lager du <strong>klasser</strong> med felter og metoder. I TS
          bruker du ofte <strong>interfaces</strong> eller <strong>type-aliaser</strong>{" "}
          som kun beskriver formen — selve dataen er vanligvis et rent objekt.
          Klasser finnes også i TS, men brukes mindre hyppig.
        </Callout>

        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
          <table className="min-w-full text-sm">
            <thead className="bg-akseptert-500/10">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Java</th>
                <th className="px-3 py-2 text-left font-semibold">TypeScript</th>
                <th className="px-3 py-2 text-left font-semibold">Kommentar</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">int, long, double</td>
                <td className="px-3 py-2">number</td>
                <td className="px-3 py-2 font-sans text-[var(--muted)]">
                  Ett talltype, bestemt presisjon via parseInt/Number
                </td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">String</td>
                <td className="px-3 py-2">string</td>
                <td className="px-3 py-2 font-sans text-[var(--muted)]">Små bokstaver i TS</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">boolean</td>
                <td className="px-3 py-2">boolean</td>
                <td className="px-3 py-2 font-sans text-[var(--muted)]">—</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">{"List<String>"}</td>
                <td className="px-3 py-2">{"string[] / Array<string>"}</td>
                <td className="px-3 py-2 font-sans text-[var(--muted)]">Begge skriveformer gyldige</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">null</td>
                <td className="px-3 py-2">null | undefined</td>
                <td className="px-3 py-2 font-sans text-[var(--muted)]">TS skiller dem</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">void</td>
                <td className="px-3 py-2">void</td>
                <td className="px-3 py-2 font-sans text-[var(--muted)]">—</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">interface</td>
                <td className="px-3 py-2">interface</td>
                <td className="px-3 py-2 font-sans text-[var(--muted)]">I TS beskriver de formen, ikke oppførselen</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="typer" step={3} title="Grunnleggende typer">
        <CodeBlock
          language="ts"
          code={`const age: number = 25;
const name: string = "Erlend";
const isAdmin: boolean = false;

const tags: string[] = ["sql", "react", "tailwind"];
const point: [number, number] = [10, 20];  // tuple

const nothing: null = null;
const notSet: undefined = undefined;

const anything: any = "farlig — slår av type-sjekk";
const careful: unknown = "sikrere any";`}
        />

        <Callout kind="tips" title="TS kan ofte gjette typen">
          Du trenger ikke alltid å skrive typen eksplisitt:
          <CodeBlock
            language="ts"
            code={`const age = 25;           // TS utleder: number
const name = "Erlend";    // TS utleder: string
const tags = ["a", "b"];  // TS utleder: string[]`}
          />
          Dette heter <em>type inference</em>. Skriv eksplisitt type bare når
          TS ikke klarer å utlede det du ønsker, eller når typen er en offentlig
          del av et API (funksjonsparametre, returverdier).
        </Callout>

        <Callout kind="felle" title="any er en nødutgang, ikke en løsning">
          <code>any</code> slår av hele type-sjekken for den variabelen. Det
          frister å bruke når du ikke får det til — men da mister du grunnen
          til å bruke TypeScript i det hele tatt. Bruk <code>unknown</code>{" "}
          hvis du virkelig ikke vet typen. Det tvinger deg til å sjekke typen
          før bruk.
        </Callout>
      </Section>

      <Section
        id="sjekker"
        step={4}
        title="Type Checker-widget"
        subtitle="Skriv en verdi, velg en forventet type, og se hva TypeScript ville sagt."
      >
        <Sandbox
          title="Type Checker"
          description="Prøv 42 mot string, 'hei' mot number, true mot boolean."
        >
          <TypeCheckerWidget />
        </Sandbox>

        <Callout kind="info" title="Hva widgeten viser">
          Dette er en forenklet simulering. Ekte TypeScript har mye mer
          sofistikerte regler (narrowing, literal types, excess property checks),
          men mønstrene er de samme: hver verdi har en utledet type, og
          kompilatoren nekter å tilordne den til en uforenlig deklarert type.
        </Callout>
      </Section>

      <Section id="interfaces" step={5} title="Interfaces og objekter">
        <p>
          Interfaces i TS er mye mer som Java-recordser enn Java-interfaces: de
          beskriver formen på et objekt — hvilke felter det har og hvilke typer
          feltene skal ha. De tvinger deg ikke til å implementere metoder (selv
          om de kan brukes slik også).
        </p>

        <CodeBlock
          language="ts"
          code={`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;       // ? betyr valgfritt felt
  readonly createdAt: Date; // readonly = kan ikke endres etter opprettelse
}

const erlend: User = {
  id: 1,
  name: "Erlend",
  email: "e@eksempel.no",
  createdAt: new Date(),
};`}
        />

        <h3 className="text-lg font-semibold mt-4">Interface vs type alias</h3>
        <p>
          Du vil se både <code>interface</code> og <code>type</code> i kode. De
          er nesten ekvivalente for objekter. Konvensjon:
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-akseptert-500">
          <li><strong>interface</strong> for objekt-former som kan utvides</li>
          <li><strong>type</strong> for unions, primitiver, tuples og utledede typer</li>
        </ul>

        <CodeBlock
          language="ts"
          code={`interface Animal { name: string }
interface Dog extends Animal { breed: string } // utvidbar

type ID = string | number;            // union
type Coord = [number, number];        // tuple
type Handler = (e: Event) => void;    // function type`}
        />
      </Section>

      <Section
        id="matcher"
        step={6}
        title="Interface Matcher"
        subtitle="Bygg et objekt stein for stein og se om det tilfredsstiller User."
      >
        <Sandbox
          title="Interface Matcher"
          description="Huk av feltene du vil inkludere. Slå på «feil type» for å se hva TS sier når verdien ikke matcher deklarasjonen."
        >
          <InterfaceMatcherWidget />
        </Sandbox>
      </Section>

      <Section id="union" step={7} title="Union og literal types">
        <p>
          Noe du ikke har i Java: en variabel kan ha flere mulige typer.
        </p>
        <CodeBlock
          language="ts"
          code={`type ID = string | number;

function findUser(id: ID) {
  if (typeof id === "string") {
    // her vet TS at id er string
    return id.toUpperCase();
  }
  // her vet TS at id er number
  return id.toFixed(0);
}`}
        />
        <p>
          Denne «narrowing»-teknikken — at TS lærer typen underveis i koden — er
          en av de beste tingene med TypeScript.
        </p>

        <h3 className="text-lg font-semibold mt-4">Literal types</h3>
        <p>
          Du kan også bruke konkrete verdier som typer. Dette er svært vanlig:
        </p>
        <CodeBlock
          language="ts"
          code={`type Status = "idle" | "loading" | "success" | "error";

let status: Status = "idle";
status = "loading";     // ok
status = "ferdig";      // ❌ feil — ikke en gyldig Status`}
        />
      </Section>

      <Section id="generics" step={8} title="Generics">
        <p>
          Generics i TS fungerer som i Java. Du har allerede sett{" "}
          <code>Array&lt;string&gt;</code>, som er det samme som <code>string[]</code>.
        </p>

        <CompareTwoCols
          leftTitle="Java"
          rightTitle="TypeScript"
          left={
            <CodeBlock
              language="java"
              code={`public <T> List<T> repeat(T item, int n) {
  List<T> out = new ArrayList<>();
  for (int i = 0; i < n; i++) out.add(item);
  return out;
}`}
            />
          }
          right={
            <CodeBlock
              language="ts"
              code={`function repeat<T>(item: T, n: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(item);
  return out;
}

repeat("hei", 3);  // T = string
repeat(42, 5);     // T = number`}
            />
          }
        />
      </Section>

      <Section id="test" step={9} title="Test deg selv">
        <IntroQuiz
          questions={[
            {
              question: "Hva skjer når du skriver `const age: string = 42;`?",
              options: [
                "Koden krasjer når den kjører i nettleseren",
                "TypeScript gir en kompileringsfeil før koden engang kjører",
                "age blir automatisk konvertert til '42'",
                "Ingenting, TS ignorerer typer",
              ],
              correctIndex: 1,
              explanation:
                "Type-feil oppdages av TS-kompilatoren før koden sendes til nettleseren. Dette er hele poenget med TypeScript.",
            },
            {
              question:
                "Hva er forskjellen på `any` og `unknown`?",
              options: [
                "Ingen forskjell, de er synonymer",
                "any er strengere enn unknown",
                "unknown tillater alt, men du må narrow-e typen før du kan bruke verdien",
                "any finnes bare i gamle TS-versjoner",
              ],
              correctIndex: 2,
              explanation:
                "any slår av alle type-sjekker — verdien kan brukes hvor som helst. unknown godtar alt ved tilordning, men tvinger deg til å sjekke typen før du bruker verdien. Foretrekk unknown.",
            },
            {
              question:
                "Gitt `interface User { id: number; name: string; age?: number }`, hvilket objekt er gyldig?",
              options: [
                "{ id: 1 }",
                "{ id: 1, name: 'Erlend' }",
                "{ id: 1, name: 'Erlend', age: 'tjuefem' }",
                "{ name: 'Erlend', age: 25 }",
              ],
              correctIndex: 1,
              explanation:
                "id og name er påkrevde. age er valgfritt (?). Alternativ 3 har feil type for age. Alternativ 1 mangler name. Alternativ 4 mangler id.",
            },
            {
              question:
                "Hva gjør union-typen `string | number` i praksis?",
              options: [
                "Lager en ny type som er både string og number samtidig",
                "Lar variabelen være enten en string eller et number, men ikke noe annet",
                "Krever en cast til én av typene før du kan bruke verdien",
                "Er akkurat det samme som any",
              ],
              correctIndex: 1,
              explanation:
                "En union-type sier at verdien er én av typene i listen. Før du kan bruke typespesifikke metoder (toUpperCase, toFixed), må du narrow-e med typeof-sjekker eller liknende.",
            },
          ]}
        />
      </Section>

      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Link
          href="/akseptert/intro/react"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-akseptert-400/60 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Forrige</p>
          <p className="font-bold">React Basics</p>
        </Link>
        <Link
          href="/akseptert/intro/tailwind"
          className="rounded-xl border-2 border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4 hover:border-akseptert-500 transition-colors"
        >
          <p className="text-xs text-akseptert-600 dark:text-akseptert-300">Neste →</p>
          <p className="font-bold">Tailwind CSS</p>
        </Link>
      </div>
    </div>
  );
}
