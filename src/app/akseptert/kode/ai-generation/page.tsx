import Link from "next/link";
import { readAkseptertFile, sliceLines } from "@/lib/akseptert-source";
import SubPageHeader from "@/components/akseptert/SubPageHeader";
import { Section, Sandbox } from "@/components/akseptert/Section";
import Callout from "@/components/akseptert/Callout";
import CodeBlock from "@/components/akseptert/CodeBlock";
import CompareTwoCols from "@/components/akseptert/CompareTwoCols";
import CodeWalkthrough, {
  type Annotation,
} from "@/components/akseptert/CodeWalkthrough";
import AsyncStepper from "@/components/akseptert/AsyncStepper";
import OpenAIPayloadInspector from "@/components/akseptert/OpenAIPayloadInspector";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERATE_FALLBACK_HEADER = `"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { syncUser } from "@/app/actions/profile";
import { checkOrgLimit } from "@/app/actions/settings";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";`;

const GENERATE_FALLBACK_TYPES = `export type JobOfferData = {
    title: string;
    description: string;
    offerType?: "fastpris" | "overslag";
    tasks: Array<{ name: string; hours: number; hourly_rate: number; unit: string }>;
    materials: Array<{ name: string; quantity: number; unit_price: number; unit: string }>;
    image_urls?: string[];
    client?: {
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
    };
};

export type GenerateJobOfferResult =
    | { ok: true; data: JobOfferData; source: "ai-images" | "ai-text" }
    | { ok: false; error: string };`;

const GENERATE_FALLBACK_FUNCTION = `export async function generateJobOffer(
    formData: FormData
): Promise<GenerateJobOfferResult> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Mangler OpenAI nøkkel" };

    const { userId } = await auth();
    if (!userId) return { ok: false, error: "Ikke logget inn" };

    await syncUser();

    const { data: profile } = await supabase
        .from("profiles")
        .select("is_pro, scans_remaining")
        .eq("id", userId)
        .maybeSingle();

    if (!profile) {
        return { ok: false, error: "Kunne ikke finne brukerprofilen din." };
    }

    if (!profile.is_pro && (profile.scans_remaining ?? 0) <= 0) {
        return { ok: false, error: "QUOTA_EXCEEDED" };
    }`;

const GENERATE_FALLBACK_FETCH = `const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
        Authorization: \`Bearer \${apiKey}\`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt },
            {
                role: "user",
                content: userContent
            },
        ],
        response_format: { type: "json_object" },
        max_tokens: 3500,
        temperature: 0.2
    }),
});

const json = await res.json();

if (!res.ok) {
    const apiMsg = json?.error?.message || \`HTTP \${res.status}\`;
    return { ok: false, error: \`AI-feil: \${apiMsg}\` };
}

const content = json.choices?.[0]?.message?.content;
if (!content) {
    return { ok: false, error: "Tomt svar fra AI. Prøv igjen." };
}

let offerData: JobOfferData;
try {
    offerData = JSON.parse(content) as JobOfferData;
} catch (parseError) {
    return { ok: false, error: "AI returnerte ugyldig dataformat." };
}`;

// Annotasjoner — linjenummer er relative til hver snippet (starter på 1)
const headerAnnotations: Annotation[] = [
  {
    line: 1,
    title: "«use server» — dette er en Server Action",
    explanation: (
      <>
        <p>
          Direktivet <code>&quot;use server&quot;</code> øverst i fila sier:
          &quot;alt her kjøres bare på serveren&quot;. Fra en klient-komponent
          kan vi importere og kalle disse funksjonene — Next.js pakker dem
          inn som en RPC. Argumenter serialiseres og sendes over HTTP, svaret
          kommer tilbake, men det ser ut som et vanlig funksjonskall.
        </p>
        <p>
          Motsetning til <code>&quot;use client&quot;</code> som markerer en
          komponent som klient-side.
        </p>
      </>
    ),
  },
  {
    line: 3,
    toLine: 6,
    title: "Imports — server-eksklusive biblioteker",
    explanation: (
      <>
        <p>
          <code>@clerk/nextjs/server</code> og <code>@/lib/supabase</code>
          bruker hemmeligheter og kan derfor aldri lastes i nettleseren. De
          importeres trygt her fordi fila er &quot;use server&quot;.
        </p>
        <p>
          <code>@/</code> er en alias for <code>src/</code> (eller prosjektroten)
          satt opp i <code>tsconfig.json</code>.
        </p>
      </>
    ),
  },
  {
    line: 8,
    title: "OpenAI-endepunktet",
    explanation: (
      <p>
        Bare en konstant med URL-en. Vi kunne brukt OpenAI sitt offisielle
        NPM-bibliotek, men her treffer vi endepunktet direkte med{" "}
        <code>fetch()</code> for mer kontroll.
      </p>
    ),
  },
];

const typeAnnotations: Annotation[] = [
  {
    line: 1,
    toLine: 13,
    title: "JobOfferData — TypeScript beskriver formen",
    explanation: (
      <>
        <p>
          Vi definerer <em>formen</em> på et AI-generert tilbud. TypeScript
          tvinger oss senere til å forholde oss til akkurat disse feltene.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>title: string</code> — obligatorisk.
          </li>
          <li>
            <code>offerType?:</code> — <code>?</code> betyr valgfritt. AI-en
            glemmer den av og til; vi har fallback senere.
          </li>
          <li>
            <code>tasks: Array&lt;{"{ ... }"}&gt;</code> — en liste av
            objekter. <code>Array&lt;T&gt;</code> er lik <code>T[]</code>.
          </li>
          <li>
            <code>client?:</code> — helt valgfritt. Kunne vært et eget
            interface, men det er mer konsist å inline-definere her.
          </li>
        </ul>
      </>
    ),
  },
  {
    line: 15,
    toLine: 17,
    title: "Union type med diskriminert tag",
    explanation: (
      <>
        <p>
          <code>GenerateJobOfferResult</code> er enten en suksess eller en
          feil — aldri noe imellom. Nøkkelen her er <code>ok: true</code> vs{" "}
          <code>ok: false</code>: den lar TypeScript <em>narrowe</em> typen
          når vi sjekker den.
        </p>
        <CodeBlock
          language="ts"
          code={`const r = await generateJobOffer(fd);
if (r.ok) {
  // Her vet TS at r.data finnes
  console.log(r.data.title);
} else {
  // Her vet TS at r.error finnes
  console.error(r.error);
}`}
        />
        <p>
          Dette mønsteret er mye tryggere enn å kaste exceptions og fanges
          med try/catch.
        </p>
      </>
    ),
  },
];

const functionAnnotations: Annotation[] = [
  {
    line: 1,
    toLine: 3,
    title: "Funksjonssignatur med Promise-retur",
    explanation: (
      <>
        <p>
          <code>export async function</code> — nøkkelordet{" "}
          <code>async</code> betyr at funksjonen returnerer et{" "}
          <code>Promise</code>. Kallstedet må <code>await</code>-e eller
          <code>.then()</code>-e resultatet.
        </p>
        <p>
          <code>formData: FormData</code> — argumentet er et{" "}
          <code>FormData</code>-objekt, samme som en &lt;form&gt;-submit
          bygger. Kan inneholde både tekst-felter og filer.
        </p>
        <p>
          <code>Promise&lt;GenerateJobOfferResult&gt;</code> — returtypen.
          En «boks» som om litt vil inneholde et resultat-objekt.
        </p>
        <p>
          <strong>Java-analogi:</strong> Som en metode som returnerer{" "}
          <code>CompletableFuture&lt;Result&gt;</code>, og{" "}
          <code>await</code> tilsvarer <code>.get()</code> på den.
        </p>
      </>
    ),
  },
  {
    line: 4,
    toLine: 5,
    title: "Les env-variabelen — første sjekk",
    explanation: (
      <>
        <p>
          <code>process.env.OPENAI_API_KEY</code> leser fra server-miljøet.
          Finnes ikke i nettleseren. Dette er grunnen til at dette MÅ være
          en Server Action — ellers ville nøkkelen lekket.
        </p>
        <p>
          Early return hvis nøkkelen mangler. Merk at vi returnerer en{" "}
          <code>{`{ ok: false, error: ... }`}</code> i stedet for å kaste
          exception.
        </p>
      </>
    ),
  },
  {
    line: 7,
    toLine: 8,
    title: "Første await — auth sjekk",
    explanation: (
      <>
        <p>
          <code>await auth()</code> pauser funksjonen til Clerk har verifisert
          session-cookien. Returnerer et objekt vi destructurer ut{" "}
          <code>userId</code> fra.
        </p>
        <p>
          Når <code>await</code> kjører, frigir funksjonen CPU-tråden slik at
          andre oppgaver kan kjøre i mellomtiden. Ingen busy-wait.
        </p>
      </>
    ),
  },
  {
    line: 10,
    title: "await syncUser — fire-and-forget-lignende",
    explanation: (
      <>
        <p>
          Vi venter på at brukeren finnes i Supabase. Hadde vi sløyfet{" "}
          <code>await</code>, ville koden hoppet videre med en gang og
          risikert at neste spørring skjedde før brukeren var opprettet.
        </p>
      </>
    ),
  },
  {
    line: 12,
    toLine: 16,
    title: "Supabase-spørring med method chaining",
    explanation: (
      <>
        <p>
          <code>supabase.from(&quot;profiles&quot;)</code> → returnerer en
          query builder. Hver metode (<code>.select</code>,{" "}
          <code>.eq</code>, <code>.maybeSingle</code>) returnerer en ny
          builder og til slutt et <code>Promise</code> når vi <code>await</code>-er.
        </p>
        <p>
          <code>.eq(&quot;id&quot;, userId)</code> bygger et WHERE-ledd,{" "}
          <code>.maybeSingle()</code> sier «jeg forventer én eller ingen
          rad».
        </p>
        <p>
          <strong>SQL-ekvivalenten:</strong>{" "}
          <code>SELECT is_pro, scans_remaining FROM profiles WHERE id = $1 LIMIT 1</code>
        </p>
      </>
    ),
  },
  {
    line: 18,
    toLine: 20,
    title: "Early return hvis profil mangler",
    explanation: (
      <p>
        Forsvarlig defensiv kode. Normalt skal profilen finnes (vi kalte nettopp
        <code>syncUser()</code>), men i en web-app må du alltid anta at
        noe kan gå galt mellom to await-er.
      </p>
    ),
  },
  {
    line: 22,
    toLine: 24,
    title: "Kvote-sjekk — ingen await",
    explanation: (
      <>
        <p>
          Dette er en <em>synkron</em> sjekk — ingen <code>await</code>.
          Profilen er allerede hentet, så vi trenger bare å lese feltene.
        </p>
        <p>
          <code>profile.scans_remaining ?? 0</code> — nullish coalescing-
          operatoren. Hvis <code>scans_remaining</code> er <code>null</code>{" "}
          eller <code>undefined</code>, bruk <code>0</code>. Mye kortere enn{" "}
          <code>profile.scans_remaining !== null ? ... : 0</code>.
        </p>
      </>
    ),
  },
];

const fetchAnnotations: Annotation[] = [
  {
    line: 1,
    toLine: 2,
    title: "fetch() — web-standard HTTP-klient",
    explanation: (
      <>
        <p>
          <code>fetch()</code> er en global funksjon i både nettleseren og
          Node. Den returnerer et <code>Promise&lt;Response&gt;</code>. Vi
          kaller med <code>await</code> for å få responsen.
        </p>
        <p>
          <strong>Java-analogi:</strong>{" "}
          <code>HttpClient.send(request, BodyHandlers.ofString())</code>.
        </p>
      </>
    ),
  },
  {
    line: 3,
    toLine: 6,
    title: "Headers: Authorization + Content-Type",
    explanation: (
      <>
        <p>
          <code>
            {"Authorization: `Bearer ${apiKey}`"}
          </code>{" "}
          — template-literal (backticks) som fletter inn variabelen.
          OpenAI bruker Bearer-tokens for autentisering.
        </p>
        <p>
          <code>Content-Type: application/json</code> — forteller OpenAI at
          vi sender JSON.
        </p>
      </>
    ),
  },
  {
    line: 7,
    toLine: 18,
    title: "Body: JSON.stringify med AI-parametre",
    explanation: (
      <>
        <p>
          <code>JSON.stringify(...)</code> serialiserer et JS-objekt til en
          JSON-streng. Motsvarer <code>new ObjectMapper().writeValueAsString()</code>{" "}
          i Java.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>model: &quot;gpt-4o&quot;</code> — multimodal modell (kan se bilder).
          </li>
          <li>
            <code>messages</code> — listen over meldinger. Alltid system +
            user her.
          </li>
          <li>
            <code>response_format: {"{ type: \"json_object\" }"}</code> —
            tvinger modellen til å svare gyldig JSON.
          </li>
          <li>
            <code>temperature: 0.2</code> — veldig deterministisk. Vi vil ha
            konsistente, edruelige priser, ikke kreativitet.
          </li>
          <li>
            <code>max_tokens: 3500</code> — plass til et langt tilbud.
          </li>
        </ul>
      </>
    ),
  },
  {
    line: 21,
    title: "Parse JSON-body",
    explanation: (
      <p>
        <code>res.json()</code> returnerer også et Promise — lesing av body
        er asynkront. To awaits: først på selve forespørselen, så på body-
        lesing. Begge venter på nettverksaktivitet.
      </p>
    ),
  },
  {
    line: 23,
    toLine: 26,
    title: "Sjekk HTTP-status",
    explanation: (
      <>
        <p>
          <code>res.ok</code> er <code>true</code> hvis status er 200–299.
          Hvis ikke, returnerer vi en feilmelding. <code>json?.error?.message</code>{" "}
          bruker optional chaining — kaster ikke hvis <code>json.error</code>{" "}
          er undefined.
        </p>
      </>
    ),
  },
  {
    line: 28,
    toLine: 31,
    title: "Trekk ut modellens svar",
    explanation: (
      <>
        <p>
          OpenAI-responsen har formen:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "choices": [
    { "message": { "content": "{...JSON-tilbud...}" } }
  ],
  ...
}`}
        />
        <p>
          <code>json.choices?.[0]?.message?.content</code> navigerer trygt til
          teksten modellen skrev. Hvis noe mangler i kjeden, får vi{" "}
          <code>undefined</code> i stedet for en krasj.
        </p>
      </>
    ),
  },
  {
    line: 33,
    toLine: 38,
    title: "JSON.parse + try/catch",
    explanation: (
      <>
        <p>
          <code>JSON.parse(...)</code> er synkron og kan kaste en{" "}
          <code>SyntaxError</code> hvis strengen ikke er gyldig JSON.
          Derfor pakker vi den i try/catch.
        </p>
        <p>
          <code>as JobOfferData</code> — TypeScript type assertion. Vi lover
          at JSON-en har vår forventede form. (AI-en kan lyve — post-
          prosesseringen lenger ned i filen reparerer dette.)
        </p>
      </>
    ),
  },
];

export default function AIGenerationPage() {
  const { code: fullCode, source, fullPath } = readAkseptertFile(
    "app/actions/generate.ts",
    GENERATE_FALLBACK_FUNCTION, // dummy; vi leser subsets nedenfor
  );

  // Hent subsets av fila for walkthrough. Hvis live: bruk ekte linjer. Hvis
  // ikke: bruk ferdig-snippetede fallbacks.
  const headerCode =
    source === "live" ? sliceLines(fullCode, 1, 8) : GENERATE_FALLBACK_HEADER;
  const typeCode =
    source === "live"
      ? sliceLines(fullCode, 245, 262)
      : GENERATE_FALLBACK_TYPES;
  const funcCode =
    source === "live"
      ? sliceLines(fullCode, 264, 287)
      : GENERATE_FALLBACK_FUNCTION;
  const fetchCode =
    source === "live"
      ? sliceLines(fullCode, 403, 447)
      : GENERATE_FALLBACK_FETCH;

  return (
    <div>
      <SubPageHeader
        title="AI Generation"
        subtitle="2 · Slik fungerer Akseptert.no"
        badge="Server Actions · OpenAI"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        }
        lead={
          <>
            Når en bruker trykker «Generer tilbud» på Akseptert, starter en
            lang kjede med <code>await</code>-kall. Vi leser{" "}
            <code>app/actions/generate.ts</code> rett fra repoet og går
            gjennom hvert steg.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#server-action" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Server Actions</a></li>
          <li><a href="#async" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. async/await forklart</a></li>
          <li><a href="#header" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. Topp av fila</a></li>
          <li><a href="#types" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. TypeScript-typer</a></li>
          <li><a href="#function" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. Funksjonen starter</a></li>
          <li><a href="#stepper" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. Async-stepper</a></li>
          <li><a href="#fetch" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">7. fetch(OpenAI)</a></li>
          <li><a href="#payload" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">8. OpenAI-payload</a></li>
        </ul>
      </nav>

      <Section id="server-action" step={1} title="Server Actions — hva er det?">
        <p>
          En Server Action er en funksjon som alltid kjører på serveren,
          selv når den kalles fra en klient-komponent. Next.js gjør den
          tilgjengelig som et skjult HTTP-endepunkt og pakker inn serialiser-
          ingen. Du importerer og bruker den som en vanlig funksjon.
        </p>

        <CompareTwoCols
          leftTitle="Gammel skole — API-rute"
          rightTitle="Server Action"
          left={
            <CodeBlock
              language="ts"
              code={`// app/api/generate/route.ts
export async function POST(req: Request) {
  const form = await req.formData();
  // ... logikk
  return Response.json(result);
}

// Klient:
const res = await fetch("/api/generate", {
  method: "POST",
  body: formData,
});
const data = await res.json();`}
            />
          }
          right={
            <CodeBlock
              language="ts"
              code={`// app/actions/generate.ts
"use server";

export async function generateJobOffer(
  formData: FormData
) {
  // ... logikk
  return result;
}

// Klient:
const result = await generateJobOffer(formData);`}
            />
          }
        />

        <Callout kind="kjernen" title="Den store vinningen">
          <p>
            Server Actions eliminerer kjedet av{" "}
            <code>fetch → json → sjekk status → parse</code>. Du får
            typesikkerhet hele veien — <code>generateJobOffer</code>{" "}
            har én og samme signatur både på server og klient.
          </p>
        </Callout>
      </Section>

      <Section
        id="async"
        step={2}
        title="async/await — den viktigste syntaksen å forstå"
        subtitle="Det første en Java-utvikler misforstår i Node.js."
      >
        <p>
          Et <strong>Promise</strong> er en «boks» som om litt vil inneholde
          en verdi. Den kan være i tre tilstander: <em>pending</em> (venter),
          <em>fulfilled</em> (suksess) eller <em>rejected</em> (feil).
        </p>
        <p>
          <code>async</code> foran en funksjon betyr at den returnerer et
          Promise. <code>await</code> «pakker ut» et Promise — det pauser
          funksjonen til boksen er fylt.
        </p>

        <CompareTwoCols
          leftTitle="Java (blokkerer)"
          leftSubtitle="Synkron gammeldags Java"
          rightTitle="TypeScript (ikke-blokkerende)"
          rightSubtitle="Event loop kjører videre"
          left={
            <CodeBlock
              language="java"
              code={`String user = authService.auth();
// Tråden er BLOKKERT til auth er ferdig
Profile p = repo.findById(user);
// Igjen: tråden venter
Response res = openai.send(prompt);
// Tråden venter helt til svaret kommer`}
            />
          }
          right={
            <CodeBlock
              language="ts"
              code={`const { userId } = await auth();
// Funksjonen pauser HER,
// men event loop kjører videre
const { data } = await supabase
  .from("profiles").select(...)
  .eq("id", userId).maybeSingle();
const res = await fetch(OPENAI_URL, {...});`}
            />
          }
        />

        <Callout kind="info" title="Node sin enkelt-tråd">
          <p>
            Node.js har bare <em>én</em> tråd. Når du{" "}
            <code>await</code>-er noe, gir tråden slipp så den kan ta andre
            requests i mellomtiden. Når svaret er klart, plukker den opp der
            den slapp.
          </p>
          <p>
            Dette er grunnen til at vi aldri sier «thread pool» eller «async
            executor» i Node — det er ikke nødvendig.
          </p>
        </Callout>

        <Callout kind="felle" title="Felle: glemme await">
          <CodeBlock
            language="ts"
            code={`// ❌ Uten await — får et Promise i stedet for verdien
const profile = supabase.from("profiles").select(...).maybeSingle();
console.log(profile.is_pro); // TypeScript vil klage: "Promise har ikke is_pro"

// ✅ Med await
const { data: profile } = await supabase.from("profiles").select(...).maybeSingle();
console.log(profile.is_pro);`}
          />
          <p className="mt-2">
            TypeScript fanger heldigvis glemt <code>await</code> som en
            type-feil de fleste tilfeller. Ikke alle — pass likevel på.
          </p>
        </Callout>
      </Section>

      <Section
        id="header"
        step={3}
        title="Topp av generate.ts — direktiv og imports"
        subtitle="Først de åtte første linjene, lest live med fs."
      >
        {source === "live" ? (
          <Callout kind="tips" title={`Live fra ${fullPath}`}>
            <p>
              Koden er lest i en Server Component via{" "}
              <code>fs.readFileSync</code>. Snapshot-merket vises om vi er på
              et miljø uten repoet.
            </p>
          </Callout>
        ) : (
          <Callout kind="info" title="Fallback-snapshot">
            <p>
              Fant ikke <code>{fullPath}</code>, bruker innebygget snapshot.
            </p>
          </Callout>
        )}

        <CodeWalkthrough
          code={headerCode}
          language="ts"
          title="app/actions/generate.ts — linje 1–8"
          fullPath={fullPath}
          source={source}
          annotations={headerAnnotations}
        />
      </Section>

      <Section
        id="types"
        step={4}
        title="TypeScript-typer — kontrakten med resten av appen"
        subtitle="JobOfferData og GenerateJobOfferResult"
      >
        <CodeWalkthrough
          code={typeCode}
          language="ts"
          title="app/actions/generate.ts — linje 245–262"
          fullPath={fullPath}
          source={source}
          annotations={typeAnnotations}
        />
      </Section>

      <Section
        id="function"
        step={5}
        title="Funksjonen starter — sjekker og lookups"
        subtitle="De første 25 linjene av generateJobOffer."
      >
        <CodeWalkthrough
          code={funcCode}
          language="ts"
          title="app/actions/generate.ts — linje 264–287"
          fullPath={fullPath}
          source={source}
          annotations={functionAnnotations}
        />
      </Section>

      <Section
        id="stepper"
        step={6}
        title="Alle await-ene i hele funksjonen"
        subtitle="Bruk stepperen nedenfor for å se hver venteposisjon — hva som ventes på, hvorfor, og typisk tid."
      >
        <Sandbox title="Async Stepper">
          <AsyncStepper />
        </Sandbox>

        <Callout kind="viktig" title="Observer trade-off-en">
          <p>
            Et enkelt AI-kall tar gjerne 3–15 sekunder. Multimodale
            modeller med bilder er spesielt trege. Server Actions har
            innebygd 300-sekunders-timeout på Vercel sitt Fluid Compute
            oppsett — mer enn nok for oss, men du merker at web-requesten
            «henger» mens vi venter. UI-en må derfor vise en loader.
          </p>
        </Callout>
      </Section>

      <Section
        id="fetch"
        step={7}
        title="Selve OpenAI-kallet"
        subtitle="fetch(), JSON.stringify og parsing av svaret."
      >
        <CodeWalkthrough
          code={fetchCode}
          language="ts"
          title="app/actions/generate.ts — linje 403–447"
          fullPath={fullPath}
          source={source}
          annotations={fetchAnnotations}
        />
      </Section>

      <Section
        id="payload"
        step={8}
        title="OpenAI-payloaden — hva vi faktisk sender"
        subtitle="Klikk de ulike feltene for å se hva de gjør."
      >
        <Sandbox title="Payload Inspector">
          <OpenAIPayloadInspector />
        </Sandbox>

        <Callout kind="tips" title="Derfor havner ikke ting i nettleseren">
          <p>
            <code>OPENAI_API_KEY</code> finnes bare i{" "}
            <code>process.env</code> på serveren. Denne fila er{" "}
            <code>&quot;use server&quot;</code>, så koden aldri sendes til
            klienten. Hvis noen åpner devtools, ser de bare at de kalte
            <code>/*-action-id</code> med formdata — ikke noe av
            systemprompten eller API-nøkkelen.
          </p>
        </Callout>
      </Section>

      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Link
          href="/akseptert/kode/app-router"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-akseptert-400/60 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Forrige</p>
          <p className="font-bold">App Router & Layouts</p>
        </Link>
        <Link
          href="/akseptert/kode/data-flow"
          className="rounded-xl border-2 border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4 hover:border-akseptert-500 transition-colors"
        >
          <p className="text-xs text-akseptert-600 dark:text-akseptert-300">Neste →</p>
          <p className="font-bold">Data Flow</p>
        </Link>
      </div>
    </div>
  );
}
