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
// Widget 1: Tailwind Playground
// Viktig: alle klasser MÅ stå som literal strenger i denne filen, ellers
// plukker ikke Tailwind JIT dem opp. Derfor er hver valgmulighet en eksplisitt
// streng i option-lista.
// ──────────────────────────────────────────────────────────────────────────

type Category = "bg" | "text" | "padding" | "rounded" | "shadow" | "border" | "font" | "size";

interface Option {
  value: string;
  label: string;
  swatch?: string;
}

const categories: {
  key: Category;
  label: string;
  hint: string;
  options: Option[];
}[] = [
  {
    key: "bg",
    label: "Bakgrunn",
    hint: "bg-{farge}-{intensitet 50–900}",
    options: [
      { value: "bg-transparent", label: "transparent" },
      { value: "bg-white", label: "white", swatch: "bg-white" },
      { value: "bg-neutral-200", label: "neutral-200", swatch: "bg-neutral-200" },
      { value: "bg-neutral-800", label: "neutral-800", swatch: "bg-neutral-800" },
      { value: "bg-blue-500", label: "blue-500", swatch: "bg-blue-500" },
      { value: "bg-red-500", label: "red-500", swatch: "bg-red-500" },
      { value: "bg-emerald-500", label: "emerald-500", swatch: "bg-emerald-500" },
      { value: "bg-amber-400", label: "amber-400", swatch: "bg-amber-400" },
      { value: "bg-akseptert-500", label: "akseptert-500", swatch: "bg-akseptert-500" },
    ],
  },
  {
    key: "text",
    label: "Tekstfarge",
    hint: "text-{farge}-{intensitet}",
    options: [
      { value: "text-neutral-900", label: "neutral-900" },
      { value: "text-neutral-500", label: "neutral-500" },
      { value: "text-white", label: "white" },
      { value: "text-blue-600", label: "blue-600" },
      { value: "text-red-600", label: "red-600" },
      { value: "text-akseptert-600", label: "akseptert-600" },
    ],
  },
  {
    key: "padding",
    label: "Padding",
    hint: "p-{0..16}",
    options: [
      { value: "p-0", label: "p-0 (0px)" },
      { value: "p-2", label: "p-2 (8px)" },
      { value: "p-4", label: "p-4 (16px)" },
      { value: "p-8", label: "p-8 (32px)" },
      { value: "p-12", label: "p-12 (48px)" },
    ],
  },
  {
    key: "rounded",
    label: "Runde hjørner",
    hint: "rounded-{sm|md|lg|xl|2xl|full}",
    options: [
      { value: "rounded-none", label: "none" },
      { value: "rounded", label: "rounded" },
      { value: "rounded-lg", label: "lg" },
      { value: "rounded-2xl", label: "2xl" },
      { value: "rounded-full", label: "full" },
    ],
  },
  {
    key: "shadow",
    label: "Skygge",
    hint: "shadow-{sm|md|lg|xl|2xl}",
    options: [
      { value: "shadow-none", label: "none" },
      { value: "shadow", label: "shadow" },
      { value: "shadow-lg", label: "lg" },
      { value: "shadow-2xl", label: "2xl" },
    ],
  },
  {
    key: "border",
    label: "Border",
    hint: "border-{0|2|4} border-{farge}",
    options: [
      { value: "border-0", label: "ingen" },
      { value: "border border-neutral-300", label: "border 1px" },
      { value: "border-2 border-akseptert-500", label: "border-2 akseptert" },
      { value: "border-4 border-dashed border-red-500", label: "border-4 dashed red" },
    ],
  },
  {
    key: "font",
    label: "Font-vekt og størrelse",
    hint: "font-{weight} text-{size}",
    options: [
      { value: "font-normal text-sm", label: "normal sm" },
      { value: "font-normal text-base", label: "normal base" },
      { value: "font-bold text-base", label: "bold base" },
      { value: "font-bold text-xl", label: "bold xl" },
      { value: "font-bold text-3xl", label: "bold 3xl" },
    ],
  },
  {
    key: "size",
    label: "Bredde",
    hint: "w-{n}",
    options: [
      { value: "w-32", label: "w-32 (128px)" },
      { value: "w-48", label: "w-48 (192px)" },
      { value: "w-64", label: "w-64 (256px)" },
      { value: "w-full", label: "w-full" },
    ],
  },
];

const initialPicks: Record<Category, string> = {
  bg: "bg-akseptert-500",
  text: "text-white",
  padding: "p-8",
  rounded: "rounded-2xl",
  shadow: "shadow-lg",
  border: "border-0",
  font: "font-bold text-xl",
  size: "w-48",
};

function TailwindPlayground() {
  const [picks, setPicks] = useState<Record<Category, string>>(initialPicks);

  const classString = (["size", "padding", "bg", "text", "font", "rounded", "shadow", "border"] as Category[])
    .map((k) => picks[k])
    .filter(Boolean)
    .join(" ");

  return (
    <div className="grid lg:grid-cols-[1fr_18rem] gap-4">
      <div>
        {/* Preview */}
        <div className="rounded-2xl border border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-900 p-8 flex items-center justify-center min-h-[220px] mb-3">
          <div className={classString}>Boks med klasser</div>
        </div>

        {/* JSX output */}
        <CodeBlock
          language="tsx"
          title="Din JSX"
          code={`<div className="${classString}">
  Boks med klasser
</div>`}
        />

        <button
          type="button"
          onClick={() => setPicks(initialPicks)}
          className="mt-2 text-xs px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Tilbakestill
        </button>
      </div>

      {/* Pickers */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3"
          >
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-xs font-bold uppercase tracking-wide">
                {cat.label}
              </p>
              <p className="text-[10px] font-mono text-[var(--muted)]">
                {cat.hint}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.options.map((opt) => {
                const active = picks[cat.key] === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() =>
                      setPicks((p) => ({ ...p, [cat.key]: opt.value }))
                    }
                    className={`flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded border transition-colors ${
                      active
                        ? "border-akseptert-500 bg-akseptert-50 dark:bg-akseptert-950/40 text-akseptert-700 dark:text-akseptert-200"
                        : "border-[var(--card-border)] hover:border-akseptert-400/60"
                    }`}
                  >
                    {opt.swatch && (
                      <span
                        className={`inline-block w-3 h-3 rounded-sm border border-neutral-300 dark:border-neutral-700 ${opt.swatch}`}
                      />
                    )}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 2: Responsive breakpoint visualizer
// ──────────────────────────────────────────────────────────────────────────

function ResponsiveDemo() {
  const [width, setWidth] = useState(400);

  let label = "mobil (<640)";
  let bg = "bg-red-400";
  if (width >= 1024) {
    label = "lg (≥1024)";
    bg = "bg-emerald-500";
  } else if (width >= 768) {
    label = "md (≥768)";
    bg = "bg-amber-400";
  } else if (width >= 640) {
    label = "sm (≥640)";
    bg = "bg-blue-400";
  }

  return (
    <div>
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 mb-3">
        <label className="block text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          Simulert skjermbredde: {width}px
        </label>
        <input
          type="range"
          min={320}
          max={1280}
          step={10}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-full accent-akseptert-500"
        />
        <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
          <span>320</span>
          <span>640 (sm)</span>
          <span>768 (md)</span>
          <span>1024 (lg)</span>
          <span>1280 (xl)</span>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-900 p-4 mb-3 overflow-hidden">
        <div
          className="mx-auto transition-all rounded-lg p-4 text-white font-bold text-center"
          style={{ width: `${Math.min(width, 800)}px`, maxWidth: "100%" }}
        >
          <div className={`${bg} rounded-lg p-6 text-white`}>{label}</div>
        </div>
      </div>

      <CodeBlock
        language="tsx"
        title="Slik skriver du det"
        code={`<div className="bg-red-400 sm:bg-blue-400 md:bg-amber-400 lg:bg-emerald-500">
  Endrer farge etter bredden
</div>

{/* sm: ≥640px, md: ≥768px, lg: ≥1024px, xl: ≥1280px */}`}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Widget 3: Dark mode simulator
// ──────────────────────────────────────────────────────────────────────────

function DarkModeDemo() {
  const [dark, setDark] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setDark((d) => !d)}
        className="mb-3 text-xs font-semibold px-3 py-1.5 rounded-lg bg-akseptert-500 hover:bg-akseptert-600 text-white"
      >
        {dark ? "☀ Bytt til lys" : "🌙 Bytt til mørk"}
      </button>

      <div className={dark ? "dark" : ""}>
        <div className="rounded-xl border border-[var(--card-border)] bg-white dark:bg-neutral-900 p-5">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Et kort
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Denne boksen bruker klassene{" "}
            <code className="font-mono">bg-white dark:bg-neutral-900</code> og{" "}
            <code className="font-mono">text-neutral-900 dark:text-neutral-100</code>.
          </p>
          <button className="mt-3 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs">
            Knapp
          </button>
        </div>
      </div>

      <Callout kind="info" title="Hvordan det funker">
        Legg til klassen <code>dark</code> på <code>&lt;html&gt;</code> eller et
        foreldre-element (vi bruker localStorage + en toggle i dette prosjektet),
        og alle klasser med prefiks <code>dark:</code> aktiveres automatisk.
      </Callout>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────────

export default function TailwindIntroPage() {
  return (
    <div>
      <SubPageHeader
        title="Tailwind CSS"
        subtitle="3 · Intro til Stacken"
        badge="utility-first CSS"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 14c2-4 5-5 8-4s4 3 6 2c-2 4-5 5-8 4s-4-3-6-2zM2 8c2-4 5-5 8-4s4 3 6 2c-2 4-5 5-8 4S4 7 2 8z" />
          </svg>
        }
        lead={
          <>
            Tailwind erstatter CSS-filer med små «hjelpeklasser» du kombinerer
            direkte i JSX-en. Det føles rart først, men du kommer til å savne
            det når du skriver tradisjonell CSS igjen.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#hva" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Hva er Tailwind?</a></li>
          <li><a href="#css-vs-tailwind" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. CSS vs Tailwind</a></li>
          <li><a href="#grammatikk" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. Grammatikken</a></li>
          <li><a href="#playground" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. Playground</a></li>
          <li><a href="#responsive" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. Responsivt design</a></li>
          <li><a href="#dark" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. Dark mode</a></li>
          <li><a href="#cheatsheet" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">7. Cheatsheet</a></li>
          <li><a href="#test" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">8. Test deg selv</a></li>
        </ul>
      </nav>

      <Section id="hva" step={1} title="Hva er Tailwind?">
        <p>
          Tailwind CSS er et CSS-rammeverk som gir deg små, gjenbrukbare
          «utility»-klasser. I stedet for å skrive selvvalgte klasser som{" "}
          <code>.knapp-primary</code> i en egen CSS-fil, stabler du små klasser
          direkte i HTML/JSX: <code>bg-blue-500 text-white px-4 py-2 rounded</code>.
        </p>

        <Callout kind="kjernen" title="Mental modell">
          Tradisjonell CSS: «semantiske» klasser i markup, alt stylet i en
          separat .css-fil. Tailwind: «presentasjonelle» klasser rett i markup,
          null separate CSS-filer for ordinær styling. Du designer mens du
          skriver JSX.
        </Callout>
      </Section>

      <Section id="css-vs-tailwind" step={2} title="CSS vs Tailwind — samme resultat">
        <CompareTwoCols
          leftTitle="Tradisjonell CSS"
          leftSubtitle="To filer, to kontekstbytter"
          rightTitle="Tailwind"
          rightSubtitle="Én fil, en kontekst"
          left={
            <div>
              <CodeBlock
                language="html"
                title="card.html"
                code={`<div class="card">
  <h2 class="card-title">Tittel</h2>
  <p class="card-body">Tekst</p>
</div>`}
              />
              <CodeBlock
                language="css"
                title="card.css"
                code={`.card {
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.card-body {
  color: #525252;
  font-size: 0.875rem;
}`}
              />
            </div>
          }
          right={
            <CodeBlock
              language="tsx"
              title="Card.tsx"
              code={`<div className="bg-white p-4 rounded-xl shadow-md">
  <h2 className="text-xl font-bold mb-2">
    Tittel
  </h2>
  <p className="text-neutral-600 text-sm">
    Tekst
  </p>
</div>`}
            />
          }
        />

        <h3 className="text-lg font-semibold mt-4">Hvorfor er utility-first bra?</h3>
        <ul className="list-disc pl-6 space-y-1.5 marker:text-akseptert-500">
          <li>
            <strong>Null «naming crisis».</strong> Du slipper å finne på klasse-
            navn som <code>.product-card-header-title</code>.
          </li>
          <li>
            <strong>Ingen død CSS.</strong> Hvis en klasse ikke brukes i JSX,
            kommer den heller ikke med i bygget. Pakken blir liten.
          </li>
          <li>
            <strong>Design-system innebygd.</strong> Fargene, spacing og størrelser
            kommer fra et forhåndsdefinert system. Ingen «22px» midt i koden.
          </li>
          <li>
            <strong>Du leser markup og styling samtidig.</strong> Ingen hopping
            mellom tre filer.
          </li>
        </ul>

        <Callout kind="felle" title="Kritikken: «markup-en blir stygg»">
          Ja, én&nbsp;div med 12 klasser ser mye ut. Men fordelen er at du
          slipper å kontekstbytte mellom HTML og CSS hele tiden. Når et mønster
          gjentar seg, lager du en komponent — ikke en ny CSS-klasse. Det er
          React-måten.
        </Callout>
      </Section>

      <Section
        id="grammatikk"
        step={3}
        title="Grammatikken til Tailwind-klasser"
      >
        <p>
          Klassene følger et tydelig mønster:
        </p>
        <CodeBlock
          language="text"
          code={`[variant:]egenskap-verdi

bg-blue-500           → background-color: blue-500
text-xl               → font-size: 1.25rem
p-4                   → padding: 1rem (16px)
rounded-lg            → border-radius: 0.5rem
md:flex               → display:flex på skjermer ≥768px
hover:bg-blue-600     → background endres ved hover
dark:bg-neutral-900   → bakgrunn endres i dark mode`}
        />
        <ul className="list-disc pl-6 space-y-1.5 marker:text-akseptert-500">
          <li>
            Tall i spacing (<code>p-4</code>) = <code>n × 0.25rem</code>. Så{" "}
            <code>p-4</code> = 16px, <code>p-8</code> = 32px.
          </li>
          <li>
            Farger har intensitet 50 (lysest) til 900 (mørkest).{" "}
            <code>bg-blue-500</code> er «standard blå».
          </li>
          <li>
            Prefikser (<code>md:</code>, <code>hover:</code>, <code>dark:</code>
            ) skrur klassen på i spesifikke situasjoner.
          </li>
        </ul>
      </Section>

      <Section
        id="playground"
        step={4}
        title="Tailwind Playground"
        subtitle="Klikk deg gjennom kategoriene og se boksen oppdatere seg live. JSX-en oppdateres i takt."
      >
        <Sandbox title="Playground">
          <TailwindPlayground />
        </Sandbox>

        <Callout kind="tips" title="Prøv disse kombinasjonene">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <code>bg-white text-neutral-900 p-8 rounded-2xl shadow-lg border border-neutral-300</code>{" "}
              — et nøkternt hvitt kort
            </li>
            <li>
              <code>bg-akseptert-500 text-white p-4 rounded-full font-bold</code>{" "}
              — rund pille-knapp
            </li>
            <li>
              <code>bg-amber-400 text-neutral-900 p-12 rounded-none shadow-2xl font-bold text-3xl</code>{" "}
              — stort varselsbanner
            </li>
          </ul>
        </Callout>
      </Section>

      <Section
        id="responsive"
        step={5}
        title="Responsivt design"
        subtitle="Prefikser som md: og lg: aktiverer klassene bare på visse skjermstørrelser."
      >
        <Sandbox
          title="Breakpoint-visualisering"
          description="Dra slideren for å simulere ulike skjermbredder og se hvilken klasse som vinner."
        >
          <ResponsiveDemo />
        </Sandbox>

        <p>
          Grunnregel: skriv alltid mobil først. Klasser uten prefiks gjelder
          alltid, og du «overrider» dem for større skjermer med <code>sm:</code>,{" "}
          <code>md:</code>, <code>lg:</code>, <code>xl:</code>.
        </p>
      </Section>

      <Section
        id="dark"
        step={6}
        title="Dark mode"
        subtitle="Med dark:-prefiks kan du ha eget utseende i mørkt tema."
      >
        <Sandbox title="Dark mode">
          <DarkModeDemo />
        </Sandbox>
      </Section>

      <Section id="cheatsheet" step={7} title="Cheatsheet — de viktigste klassene">
        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
          <table className="min-w-full text-xs">
            <thead className="bg-akseptert-500/10">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Kategori</th>
                <th className="px-3 py-2 text-left font-semibold">Klasser</th>
                <th className="px-3 py-2 text-left font-semibold">Husker du disse</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2 font-sans font-bold">Spacing</td>
                <td className="px-3 py-2">p-{"{n}"}, px-{"{n}"}, py-{"{n}"}, m-{"{n}"}, gap-{"{n}"}</td>
                <td className="px-3 py-2">n × 0.25rem</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2 font-sans font-bold">Farge</td>
                <td className="px-3 py-2">bg-, text-, border-, ring-, accent-</td>
                <td className="px-3 py-2">{"{farge}-{50..900}"}</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2 font-sans font-bold">Layout</td>
                <td className="px-3 py-2">flex, grid, block, hidden, items-center, justify-between</td>
                <td className="px-3 py-2">Fundament</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2 font-sans font-bold">Typography</td>
                <td className="px-3 py-2">text-sm, text-base, text-xl, font-bold, leading-relaxed</td>
                <td className="px-3 py-2">text-{"{xs..9xl}"}</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2 font-sans font-bold">Border</td>
                <td className="px-3 py-2">border, border-{"{n}"}, rounded-{"{n}"}, ring-{"{n}"}</td>
                <td className="px-3 py-2">—</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2 font-sans font-bold">Variants</td>
                <td className="px-3 py-2">hover:, focus:, dark:, md:, lg:, disabled:</td>
                <td className="px-3 py-2">Prefikser</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="test" step={8} title="Test deg selv">
        <IntroQuiz
          questions={[
            {
              question:
                "Hvordan skriver du «hvit bakgrunn, 16px padding, avrundede hjørner og en skygge» i Tailwind?",
              options: [
                "background-color: white; padding: 16px; ...",
                "bg-white p-4 rounded-lg shadow",
                ".card { bg: white; p: 4; }",
                "style={{ bg: 'white', p: 4 }}",
              ],
              correctIndex: 1,
              explanation:
                "Tailwind er rene utility-klasser i className. p-4 = 16px (n × 0.25rem). rounded-lg gir moderate avrundinger. shadow er standardskyggen.",
            },
            {
              question: "Hva gjør `md:flex` i Tailwind?",
              options: [
                "Setter display: flex alltid",
                "Setter display: flex, men bare på mellom-store skjermer og oppover (≥768px)",
                "Flexbox med medium-size barn",
                "Ingenting — ugyldig klasse",
              ],
              correctIndex: 1,
              explanation:
                "Prefikset md: aktiverer klassen fra breakpointet md (≥768px) og oppover. Mobile-first: klasser uten prefiks gjelder alltid, prefikser overrider for større skjermer.",
            },
            {
              question:
                "Hvorfor fungerer ikke `bg-${color}-500` med en variabel?",
              options: [
                "Det funker helt fint",
                "Tailwind JIT kompilerer bare klasser som står som komplett string-literal i kildekoden — dynamiske strenger plukkes ikke opp",
                "JavaScript kan ikke ha template-strings",
                "Du må bruke style-attributtet i stedet",
              ],
              correctIndex: 1,
              explanation:
                "Tailwind leser kildefilene som ren tekst og fanger opp klasser som strenger. Et dynamisk `bg-${color}-500` blir aldri en literal streng på disk, så klassen ender ikke opp i CSS-en. Løsningen er å skrive hver mulig klasse ut eksplisitt, eller å mappe fra en verdi til en full klasse i en lookup-tabell.",
            },
            {
              question: "Hva er forskjellen på p-4, px-4 og py-4?",
              options: [
                "Ingen forskjell",
                "p-4 = padding på alle sider, px-4 = horisontal (venstre+høyre), py-4 = vertikal (topp+bunn)",
                "p-4 er for paragraf, px-4 for piksler, py-4 for prosent",
                "Bare p-4 eksisterer",
              ],
              correctIndex: 1,
              explanation:
                "Tailwind bruker suffikser for retning: t=top, b=bottom, l=left, r=right, x=horisontal, y=vertikal. Samme mønster gjelder margin (m, mx, my, ...) og border.",
            },
          ]}
        />
      </Section>

      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Link
          href="/akseptert/intro/typescript"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-akseptert-400/60 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Forrige</p>
          <p className="font-bold">TypeScript Basics</p>
        </Link>
        <Link
          href="/akseptert/intro/komponenter"
          className="rounded-xl border-2 border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4 hover:border-akseptert-500 transition-colors"
        >
          <p className="text-xs text-akseptert-600 dark:text-akseptert-300">Neste →</p>
          <p className="font-bold">Component Thinking</p>
        </Link>
      </div>
    </div>
  );
}
