"use client";

import Link from "next/link";
import { useState } from "react";
import SubPageHeader from "@/components/akseptert/SubPageHeader";
import { Section, Sandbox } from "@/components/akseptert/Section";
import CodeBlock from "@/components/akseptert/CodeBlock";
import Callout from "@/components/akseptert/Callout";
import CompareTwoCols from "@/components/akseptert/CompareTwoCols";
import IntroQuiz from "@/components/akseptert/IntroQuiz";

// ──────────────────────────────────────────────────────────────────────────
// Widget 1: Props Playground
// En Button-komponent som du kan konfigurere med props. JSX-en oppdateres
// i takt med valgene — viser hvordan props mappes til utseende.
// ──────────────────────────────────────────────────────────────────────────

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-akseptert-500 hover:bg-akseptert-600 text-white",
  secondary: "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-xs px-2.5 py-1",
  md: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3",
};

function PropsPlayground() {
  const [variant, setVariant] = useState<Variant>("primary");
  const [size, setSize] = useState<Size>("md");
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("Klikk meg");

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div>
        {/* Preview */}
        <div className="rounded-xl border border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-900 p-8 flex items-center justify-center min-h-[140px] mb-3">
          <button
            type="button"
            disabled={disabled}
            className={`rounded-lg font-semibold transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {label || "Button"}
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-1.5">
              variant
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(["primary", "secondary", "danger", "ghost"] as Variant[]).map((v) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors ${
                    variant === v
                      ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/40"
                      : "border-[var(--card-border)] hover:border-akseptert-400/60"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-1.5">
              size
            </p>
            <div className="flex gap-1.5">
              {(["sm", "md", "lg"] as Size[]).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSize(s)}
                  className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors ${
                    size === s
                      ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/40"
                      : "border-[var(--card-border)] hover:border-akseptert-400/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="accent-akseptert-500"
              />
              <span className="font-mono">disabled</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="label"
              className="flex-1 text-xs font-mono px-2.5 py-1.5 rounded border border-[var(--card-border)] bg-[var(--background)]"
            />
          </div>
        </div>
      </div>

      <div>
        <CodeBlock
          language="tsx"
          title="Bruk-stedet"
          code={`<Button
  variant="${variant}"
  size="${size}"${disabled ? "\n  disabled" : ""}
>
  ${label || "Button"}
</Button>`}
        />
        <CodeBlock
          language="tsx"
          title="Button.tsx (definisjonen)"
          code={`interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  disabled,
  children,
}: ButtonProps) {
  // ... map props til className og returner JSX
}`}
        />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 2: Component Tree Explorer
// Viser et tre av komponenter. Klikk en node, se hva den gjør og dens JSX.
// ──────────────────────────────────────────────────────────────────────────

type TreeNode = {
  id: string;
  name: string;
  role: string;
  code: string;
  children?: TreeNode[];
};

const tree: TreeNode = {
  id: "app",
  name: "App",
  role: "Rotkomponent — den øverste i hele applikasjonen.",
  code: `export default function App() {
  return (
    <Page>
      <Header />
      <Feed />
    </Page>
  );
}`,
  children: [
    {
      id: "page",
      name: "Page",
      role: "Layout-wrapper som gir polstring og maks bredde.",
      code: `function Page({ children }) {
  return (
    <main className="max-w-4xl mx-auto p-4">
      {children}
    </main>
  );
}`,
    },
    {
      id: "header",
      name: "Header",
      role: "Toppnavigasjon med logo og brukermeny.",
      code: `function Header() {
  return (
    <header>
      <Logo />
      <UserMenu />
    </header>
  );
}`,
      children: [
        { id: "logo", name: "Logo", role: "Bare logoen.", code: `function Logo() {\n  return <img src="/logo.svg" />;\n}` },
        { id: "menu", name: "UserMenu", role: "Viser innlogget bruker.", code: `function UserMenu() {\n  const user = useUser();\n  return <p>{user.name}</p>;\n}` },
      ],
    },
    {
      id: "feed",
      name: "Feed",
      role: "Laster inn og viser en liste med Post-komponenter.",
      code: `function Feed() {
  const posts = usePosts();
  return (
    <ul>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </ul>
  );
}`,
      children: [
        {
          id: "post",
          name: "Post",
          role: "Ett enkelt innlegg. Tar et post-prop.",
          code: `function Post({ post }) {
  return (
    <li>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </li>
  );
}`,
        },
      ],
    },
  ],
};

function flatten(node: TreeNode, depth = 0, out: { node: TreeNode; depth: number }[] = []) {
  out.push({ node, depth });
  node.children?.forEach((c) => flatten(c, depth + 1, out));
  return out;
}

function ComponentTree() {
  const [selected, setSelected] = useState<string>("app");
  const flat = flatten(tree);
  const current = flat.find((f) => f.node.id === selected)?.node ?? tree;

  return (
    <div className="grid md:grid-cols-[16rem_1fr] gap-4">
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-2">
        {flat.map(({ node, depth }) => (
          <button
            type="button"
            key={node.id}
            onClick={() => setSelected(node.id)}
            style={{ paddingLeft: `${0.5 + depth * 1}rem` }}
            className={`w-full text-left flex items-center gap-2 text-xs font-mono py-1.5 pr-2 rounded hover:bg-akseptert-50 dark:hover:bg-akseptert-950/30 transition-colors ${
              selected === node.id
                ? "bg-akseptert-500/15 text-akseptert-700 dark:text-akseptert-200"
                : ""
            }`}
          >
            <span className="text-[var(--muted)]">{depth === 0 ? "▾" : "└"}</span>
            <span>&lt;{node.name} /&gt;</span>
          </button>
        ))}
      </div>

      <div>
        <div className="rounded-xl border border-akseptert-400/40 bg-akseptert-50/60 dark:bg-akseptert-950/30 p-4 mb-3">
          <p className="text-xs font-bold text-akseptert-600 dark:text-akseptert-300 uppercase tracking-wide mb-1">
            {current.name}
          </p>
          <p className="text-sm">{current.role}</p>
        </div>
        <CodeBlock language="tsx" title={`${current.name}.tsx`} code={current.code} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 3: Composition — bytt hvilke barn som puttes inn i en Card
// ──────────────────────────────────────────────────────────────────────────

type ChildOption = "tekst" | "knapp" | "bilde" | "alt";

function CompositionDemo() {
  const [child, setChild] = useState<ChildOption>("tekst");

  const renderChild = () => {
    switch (child) {
      case "tekst":
        return <p className="text-sm">Bare litt vanlig tekst inni kortet.</p>;
      case "knapp":
        return (
          <button className="px-4 py-2 rounded-lg bg-akseptert-500 text-white text-sm font-semibold">
            En knapp
          </button>
        );
      case "bilde":
        return (
          <div className="aspect-video w-full rounded-md bg-gradient-to-br from-akseptert-400 to-indigo-600 flex items-center justify-center text-white font-bold">
            [bilde]
          </div>
        );
      case "alt":
        return (
          <div className="space-y-2">
            <p className="text-sm font-semibold">Alt på én gang</p>
            <div className="aspect-[4/1] rounded-md bg-gradient-to-r from-amber-300 to-red-400" />
            <button className="px-3 py-1.5 rounded bg-akseptert-500 text-white text-xs">
              Lagre
            </button>
          </div>
        );
    }
  };

  const codeForChild: Record<ChildOption, string> = {
    tekst: '<p>Bare litt vanlig tekst inni kortet.</p>',
    knapp: '<button>En knapp</button>',
    bilde: '<img src="/bilde.jpg" alt="" />',
    alt: `<>
  <h4>Alt på én gang</h4>
  <img src="/banner.jpg" />
  <button>Lagre</button>
</>`,
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <div className="flex gap-2 mb-3 flex-wrap">
          {(["tekst", "knapp", "bilde", "alt"] as ChildOption[]).map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setChild(c)}
              className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors ${
                child === c
                  ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/40"
                  : "border-[var(--card-border)] hover:border-akseptert-400/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="rounded-xl border-2 border-akseptert-400/40 bg-[var(--card)] p-5">
          <h3 className="font-bold mb-3 text-akseptert-700 dark:text-akseptert-200">
            Card
          </h3>
          <div>{renderChild()}</div>
        </div>
      </div>

      <CodeBlock
        language="tsx"
        title="Bruk-stedet"
        code={`<Card>
  ${codeForChild[child].split("\n").join("\n  ")}
</Card>`}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────

export default function KomponenterIntroPage() {
  return (
    <div>
      <SubPageHeader
        title="Component Thinking"
        subtitle="4 · Intro til Stacken"
        badge="props · children"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        }
        lead={
          <>
            Nå når du har sett React, TypeScript og Tailwind hver for seg,
            vever vi dem sammen. En React-app er alltid et tre av komponenter som
            prater med hverandre gjennom <em>props</em>.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#hva" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Hva er en komponent?</a></li>
          <li><a href="#import" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. import og export</a></li>
          <li><a href="#props" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. Props</a></li>
          <li><a href="#playground" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. Props Playground</a></li>
          <li><a href="#komposisjon" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. Komposisjon</a></li>
          <li><a href="#children" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. children-propen</a></li>
          <li><a href="#tree" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">7. Komponent-treet</a></li>
          <li><a href="#test" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">8. Test deg selv</a></li>
        </ul>
      </nav>

      <Section id="hva" step={1} title="Hva er en komponent?">
        <p>
          En komponent er en funksjon som tar inn <em>props</em> (argumenter) og
          returnerer JSX (en beskrivelse av hva skjermen skal vise). Tenk deg en
          metode som returnerer en HTML-streng, bare at vi jobber med et tre av
          elementer i stedet for streng-konkatenering.
        </p>

        <CompareTwoCols
          leftTitle="Java"
          leftSubtitle="Klasse med felter og metoder"
          rightTitle="React"
          rightSubtitle="Funksjon som returnerer JSX"
          left={
            <CodeBlock
              language="java"
              code={`public class UserCard {
  private String name;
  private int age;

  public UserCard(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String render() {
    return "<div>"
      + "<h3>" + name + "</h3>"
      + "<p>" + age + " år</p>"
      + "</div>";
  }
}`}
            />
          }
          right={
            <CodeBlock
              language="tsx"
              code={`interface UserCardProps {
  name: string;
  age: number;
}

export default function UserCard({
  name,
  age,
}: UserCardProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{age} år</p>
    </div>
  );
}`}
            />
          }
        />

        <Callout kind="kjernen" title="Tre regler">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Navnet starter med stor bokstav (ellers tror React det er en HTML-tag).</li>
            <li>Funksjonen tar maks ett argument — et objekt med props.</li>
            <li>Returverdien er JSX — ett rot-element.</li>
          </ol>
        </Callout>
      </Section>

      <Section
        id="import"
        step={2}
        title="import og export — slik deler filer kode"
      >
        <p>
          Fil-systemet er kodebasen din. Hver <code>.ts</code>/<code>.tsx</code>
          -fil er en modul. Den eksporterer ting, og andre filer importerer dem
          ved sti.
        </p>

        <CompareTwoCols
          leftTitle="Java"
          leftSubtitle="pakke + public class"
          rightTitle="TS/JS"
          rightSubtitle="fil + export"
          left={
            <CodeBlock
              language="java"
              code={`// fil: no/eksempel/UserCard.java
package no.eksempel;

public class UserCard {
  // ...
}

// fil: no/eksempel/Page.java
package no.eksempel;

import no.eksempel.UserCard;

public class Page {
  UserCard card = new UserCard();
}`}
            />
          }
          right={
            <CodeBlock
              language="tsx"
              code={`// fil: UserCard.tsx
export default function UserCard() {
  return <div>...</div>;
}

// fil: Page.tsx
import UserCard from "./UserCard";

export default function Page() {
  return <UserCard />;
}`}
            />
          }
        />

        <h3 className="text-lg font-semibold mt-4">Default vs named exports</h3>
        <ul className="list-disc pl-6 space-y-1.5 marker:text-akseptert-500">
          <li>
            <code>export default</code>: én hovedeksport per fil. Importøren
            velger navn: <code>import X from &quot;./fil&quot;</code>.
          </li>
          <li>
            <code>export</code>: navngitt eksport. Importøren må bruke samme
            navn: <code>import {"{ X }"} from &quot;./fil&quot;</code>.
          </li>
          <li>
            En fil kan ha <strong>én</strong> default-eksport og{" "}
            <strong>flere</strong> named-eksporter samtidig.
          </li>
        </ul>

        <CodeBlock
          language="tsx"
          code={`// fil: utils.ts
export const PI = 3.14159;
export function area(r: number) { return PI * r * r; }
export default function circumference(r: number) { return 2 * PI * r; }

// fil: bruker.ts
import circumference, { PI, area } from "./utils";`}
        />
      </Section>

      <Section id="props" step={3} title="Props — komponentens argumenter">
        <p>
          Props er hvordan en forelder-komponent gir data til et barn. Syntaktisk
          ser det ut som HTML-attributter, men verdiene er JavaScript-uttrykk
          inni <code>{"{ }"}</code>.
        </p>

        <CodeBlock
          language="tsx"
          code={`// Definer propsene som et interface
interface GreetingProps {
  name: string;
  excited?: boolean;  // ? = valgfri
}

export default function Greeting({ name, excited = false }: GreetingProps) {
  return <h1>Hei, {name}{excited && "!"}</h1>;
}

// Bruk komponenten et annet sted:
<Greeting name="Erlend" excited />
<Greeting name="Ola" />`}
        />

        <Callout kind="tips" title="Props er read-only">
          Et barn kan ikke endre propsene det mottar. Data flyter <strong>nedover</strong>{" "}
          (fra forelder til barn). Hvis barnet trenger å fortelle forelderen noe,
          sender forelderen inn en callback-funksjon som prop:
          <CodeBlock
            language="tsx"
            code={`<Button onClick={() => setCount(c => c + 1)}>+1</Button>`}
          />
        </Callout>
      </Section>

      <Section
        id="playground"
        step={4}
        title="Props Playground"
        subtitle="Bytt props på en ekte Button-komponent og se hvordan utseendet oppdateres sammen med JSX-en."
      >
        <Sandbox title="Button-komponent">
          <PropsPlayground />
        </Sandbox>
      </Section>

      <Section
        id="komposisjon"
        step={5}
        title="Komposisjon — komponenter inni komponenter"
      >
        <p>
          Én komponent kan bruke andre komponenter akkurat som en HTML-tag. Det
          er slik du bygger UI-er stein for stein:
        </p>
        <CodeBlock
          language="tsx"
          code={`function UserCard({ user }) {
  return (
    <div className="p-4 border">
      <Avatar src={user.avatar} />
      <h3>{user.name}</h3>
      <FollowButton userId={user.id} />
    </div>
  );
}`}
        />
        <p>
          <code>Avatar</code> og <code>FollowButton</code> kjenner ingenting til
          <code> UserCard</code>. De gjør jobben sin og kan gjenbrukes i andre
          sammenhenger. Det er <em>separation of concerns</em> på React-måten —
          veldig likt hvordan et Spring-service bare gjør sin bit av jobben.
        </p>
      </Section>

      <Section
        id="children"
        step={6}
        title="children-propen — innhold som puttes inn"
      >
        <p>
          Noen ganger vil du bygge en «container»-komponent som kan holde på
          vilkårlig innhold. Da bruker du det spesielle propet <code>children</code>:
        </p>
        <CodeBlock
          language="tsx"
          code={`interface CardProps {
  title: string;
  children: React.ReactNode; // alt som kan rendres: JSX, tekst, tall, null
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-xl border p-4">
      <h3>{title}</h3>
      {children}
    </div>
  );
}`}
        />
        <p>
          Og slik bruker du den:
        </p>
        <CodeBlock
          language="tsx"
          code={`<Card title="Min profil">
  <p>Dette endes opp i children-propen.</p>
  <button>Redigér</button>
</Card>`}
        />

        <Sandbox
          title="Komposisjon"
          description="Velg hvilket innhold som skal puttes inn som children."
        >
          <CompositionDemo />
        </Sandbox>
      </Section>

      <Section
        id="tree"
        step={7}
        title="Komponent-treet"
        subtitle="Alle React-apper er et tre med App på toppen. Utforsk et typisk tre her."
      >
        <Sandbox title="Component Tree Explorer">
          <ComponentTree />
        </Sandbox>

        <Callout kind="info" title="Hvorfor trestruktur?">
          Hvert tag i JSX-en er en node i treet. Når state endres et sted,
          re-rendrer React den noden og alle nodene under — men kun de delene av
          DOM-en som faktisk endres, oppdateres. Treet er ikke bare en mental
          modell; det er hvordan React faktisk tenker internt.
        </Callout>
      </Section>

      <Section id="test" step={8} title="Test deg selv">
        <IntroQuiz
          questions={[
            {
              question: "Hva er en React-komponent, mest presist?",
              options: [
                "En klasse som arver fra React.Component",
                "En funksjon som tar props og returnerer JSX",
                "En HTML-fil med JavaScript inni",
                "En CSS-fil som styler en side",
              ],
              correctIndex: 1,
              explanation:
                "Moderne React bruker funksjonskomponenter. De tar ett props-objekt som argument og returnerer JSX. Klasse-komponenter finnes, men de er utdatert stil og brukes sjelden i ny kode.",
            },
            {
              question:
                "Hvis jeg skriver `export default function Hero() { ... }`, hvordan importerer jeg den?",
              options: [
                "import { Hero } from \"./Hero\"",
                "import Hero from \"./Hero\"",
                "import default Hero from \"./Hero\"",
                "require(\"./Hero\")",
              ],
              correctIndex: 1,
              explanation:
                "Default eksport importeres uten krøllparenteser. Du kan også gi den hvilket navn du vil: `import WhateverIWant from \"./Hero\"`. Named exports må importeres med samme navn i { }.",
            },
            {
              question: "Data flyter i React...",
              options: [
                "Opp fra barn til forelder via mutasjon",
                "Ned fra forelder til barn via props; oppover via callback-props",
                "Frem og tilbake, alltid",
                "Gjennom en global state-butikk",
              ],
              correctIndex: 1,
              explanation:
                "Dette er en av Reacts bærebjelker. Props går ned, events (callbacks) går opp. For delt state mellom søsken, flytter du staten opp til nærmeste felles forelder — det kalles «lifting state up».",
            },
            {
              question: "Hva er `children`-propen?",
              options: [
                "En prop som må være en array",
                "Et spesielt prop som får verdien av det som står mellom start- og slutt-taggen til komponenten",
                "Bare tekst",
                "En liste over barne-komponentene i treet",
              ],
              correctIndex: 1,
              explanation:
                "Når du skriver <Card>noe</Card>, blir «noe» sendt som children-propen til Card. Det kan være tekst, JSX, andre komponenter, eller en liste av slike. React.ReactNode er typen som dekker alt dette.",
            },
          ]}
        />
      </Section>

      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Link
          href="/akseptert/intro/tailwind"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-akseptert-400/60 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Forrige</p>
          <p className="font-bold">Tailwind CSS</p>
        </Link>
        <Link
          href="/akseptert"
          className="rounded-xl border-2 border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4 hover:border-akseptert-500 transition-colors"
        >
          <p className="text-xs text-akseptert-600 dark:text-akseptert-300">Tilbake til oversikten</p>
          <p className="font-bold">Akseptert — Masterclass</p>
        </Link>
      </div>
    </div>
  );
}
