import Link from "next/link";
import { readAkseptertFile } from "@/lib/akseptert-source";
import SubPageHeader from "@/components/akseptert/SubPageHeader";
import { Section, Sandbox } from "@/components/akseptert/Section";
import Callout from "@/components/akseptert/Callout";
import CompareTwoCols from "@/components/akseptert/CompareTwoCols";
import CodeBlock from "@/components/akseptert/CodeBlock";
import CodeWalkthrough, {
  type Annotation,
} from "@/components/akseptert/CodeWalkthrough";
import ServerClientToggle from "@/components/akseptert/ServerClientToggle";
import RoutingExplorer from "@/components/akseptert/RoutingExplorer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Fallback dersom vi kjører på et miljø der Akseptert-repoet ikke finnes
// (f.eks. Vercel). Koden er en snapshot hentet fra ekte fil.
const LAYOUT_FALLBACK = `import type { Metadata } from "next";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { nbNO } from "@clerk/localizations";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClientProviders } from "@/components/ui/client-providers";
import { syncUser } from "@/app/actions/profile";
import "./globals.css";

async function SyncUserOnLoad() {
    const { userId } = await auth();
    if (!userId) return null;
    await syncUser();
    return null;
}

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://akseptert.no'),
    title: {
        default: "Akseptert – Profesjonelle pristilbud for norske håndverkere",
        template: "%s | Akseptert.no"
    },
    description:
        "Lag profesjonelle pristilbud på sekunder...",
    openGraph: {
        title: "Akseptert – Profesjonelle pristilbud for norske håndverkere",
        url: "https://akseptert.no",
        siteName: "Akseptert",
        locale: "nb_NO",
        type: "website",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            localization={nbNO}
            appearance={{
                variables: {
                    colorPrimary: "#2563eb",
                    borderRadius: "0.75rem",
                },
            }}
        >
            <html lang="no" className="scroll-smooth">
            <head>
                <Script
                    src="https://plausible.io/js/pa-3lGAqghzp24TlW4nGDz2a.js"
                    strategy="afterInteractive"
                />
            </head>
            <body
                className={\`\${geistSans.variable} \${geistMono.variable} \${playfair.variable} min-h-screen bg-white antialiased\`}
            >
            <ClientProviders>
                <SyncUserOnLoad />
                <Navbar />
                {children}
                <Footer />
            </ClientProviders>
            </body>
            </html>
        </ClerkProvider>
    );
}`;

// Annotasjoner (linjenummer peker på den faktiske filen — stemmer både med
// live-lesing og snapshot-fallback som har samme struktur de første linjene).
const layoutAnnotations: Annotation[] = [
  {
    line: 1,
    toLine: 11,
    title: "Imports — slik drar vi inn biblioteker",
    explanation: (
      <>
        <p>
          De første 11 linjene er bare <code>import</code>-setninger. Hver
          linje henter inn noe fra et annet sted:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>type {"{ Metadata }"}</code> — en <em>type</em> fra Next.js (bare for
            TypeScript). <code>type</code>-ordet sier «dette er en kompilatortype,
            ikke en verdi».
          </li>
          <li>
            <code>Script</code> og <code>ClerkProvider</code> — komponenter vi
            rendrer senere.
          </li>
          <li>
            <code>auth</code>, <code>nbNO</code>, <code>syncUser</code> —
            funksjoner/variabler.
          </li>
          <li>
            <code>next/font/google</code> — Next.js sin spesielle måte å
            laste Google-fonter på byggetid (lar fontene være selvhostet og
            raske).
          </li>
          <li>
            <code>&quot;./globals.css&quot;</code> — styles importeres som
            en side-effekt. Ingen variabel tas inn; filen blir bare inkludert
            i bygget.
          </li>
        </ul>
        <p className="mt-2">
          <strong>Java-analogi:</strong> Det er som <code>import no.akseptert.*</code>{" "}
          øverst i en Java-fil — bare at TypeScript bruker stier i stedet for
          pakke-navn.
        </p>
      </>
    ),
  },
  {
    line: 13,
    toLine: 18,
    title: "En async Server Component",
    explanation: (
      <>
        <p>
          Dette er en <strong>Server Component</strong>. Du ser ingen{" "}
          <code>&quot;use client&quot;</code> øverst i filen. Akkurat som
          Spring-controller kan den være <code>async</code> og kalle
          tjenester direkte.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>const {"{ userId }"} = await auth()</code> — destructuring. Vi
            plukker ut <code>userId</code>-feltet fra objektet som{" "}
            <code>auth()</code> returnerer.
          </li>
          <li>
            <code>if (!userId) return null</code> — hvis ingen er logget inn,
            render ingenting.
          </li>
          <li>
            <code>await syncUser()</code> — kall vår egen Server Action som
            skriver brukeren til Supabase hvis den ikke finnes.
          </li>
        </ul>
        <p className="mt-2">
          Denne komponenten kjører <strong>på serveren hver gang</strong>{" "}
          noen laster en side. Java-ekvivalenten er en{" "}
          <code>@PostConstruct</code>-metode eller en filter.
        </p>
      </>
    ),
  },
  {
    line: 20,
    toLine: 34,
    title: "Google Fonts via next/font",
    explanation: (
      <>
        <p>
          Next.js laster Google-fonter på byggetid og serverer dem selv. Det
          gir bedre ytelse og privacy (ingen forespørsler til Google fra
          brukerens nettleser).
        </p>
        <p>
          <code>variable: &quot;--font-geist-sans&quot;</code> gir fonten et
          CSS-variabelnavn som vi senere bruker på <code>&lt;body&gt;</code>.
        </p>
      </>
    ),
  },
  {
    line: 36,
    toLine: 65,
    title: "Metadata — SEO rett i koden",
    explanation: (
      <>
        <p>
          Dette er Next.js sitt innebygde SEO-system. Alt du eksporterer i
          <code>metadata</code> blir til <code>&lt;meta&gt;</code>-tagger og{" "}
          <code>&lt;title&gt;</code> i HTML-en.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>metadataBase</code> — basen for absolutte URL-er.
          </li>
          <li>
            <code>title.default</code> og <code>template</code> — standard
            tittel og hvordan sub-sidene skal formatteres (%s blir erstattet
            av sidetittel).
          </li>
          <li>
            <code>keywords</code>, <code>openGraph</code>,{" "}
            <code>twitter</code> — SEO-spesifikke felter som Google og
            sosiale medier leser.
          </li>
        </ul>
        <p>
          <strong>Spring-analogi:</strong> Dette erstatter både{" "}
          <code>robots.txt</code>, Thymeleaf-seksjoner og alt styr med
          head-fragments i JSP.
        </p>
      </>
    ),
  },
  {
    line: 101,
    toLine: 105,
    title: "Rot-komponenten: RootLayout",
    explanation: (
      <>
        <p>
          Dette er selve rot-layoutet. Det omslutter <em>alle</em> sider i
          applikasjonen.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>{"Readonly<{ children: React.ReactNode }>"}</code> — en
            TypeScript-type som sier: &quot;Proppsobjektet er read-only og
            inneholder ett felt: <code>children</code>, som er noe React kan
            rendre.&quot;
          </li>
          <li>
            <code>children</code> — den spesielle React-propen som får
            innholdet som puttes inn mellom komponent-taggene. For et layout
            er det innholdet i den faktiske siden.
          </li>
          <li>
            Ingen <code>&quot;use client&quot;</code> — dette er en Server
            Component som standard.
          </li>
        </ul>
      </>
    ),
  },
  {
    line: 107,
    toLine: 128,
    title: "ClerkProvider — auth-konteksten",
    explanation: (
      <>
        <p>
          <strong>Provider-mønsteret:</strong> en komponent som wrapper hele
          treet og gir alle barnekomponenter tilgang til noe via context.
          Clerk bruker dette for å gjøre brukerstatus tilgjengelig overalt.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>localization={"{nbNO}"}</code> — prop som setter norsk språk
            i login-ruter.
          </li>
          <li>
            <code>appearance={"{...}"}</code> — Tailwind-klasser som Clerk bruker
            på sine egne skjema. Slik beholder vi samme stil som resten av
            appen.
          </li>
        </ul>
        <p className="mt-2">
          <strong>Spring-analogi:</strong> Det tilsvarer å registrere en{" "}
          <code>SecurityContextHolder</code> som er tilgjengelig gjennom hele
          request-scopet.
        </p>
      </>
    ),
  },
  {
    line: 129,
    toLine: 153,
    title: "html + head: scripts og skript-tags",
    explanation: (
      <>
        <p>
          Akseptert hardkoder analytics (Plausible) og Google Ads her. Next.js
          sin <code>&lt;Script&gt;</code>-komponent er smartere enn en vanlig
          script-tag:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>strategy=&quot;afterInteractive&quot;</code> — laster ikke
            før siden er klar til interaksjon.
          </li>
          <li>
            Inline-skript ligger i <code>{"{`... code ...`}"}</code> (JSX
            template literal).
          </li>
        </ul>
      </>
    ),
  },
  {
    line: 154,
    toLine: 156,
    title: "body med font-variabler",
    explanation: (
      <>
        <p>
          <code>
            {"className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} min-h-screen bg-white antialiased`}"}
          </code>{" "}
          — en template-streng (backticks) som kombinerer tre font-variabler
          og fire Tailwind-klasser.
        </p>
        <p>
          <code>min-h-screen</code> sikrer at body dekker hele viewport,{" "}
          <code>bg-white</code> setter hvit bakgrunn, og{" "}
          <code>antialiased</code> gir jevnere fonter.
        </p>
      </>
    ),
  },
  {
    line: 157,
    toLine: 163,
    title: "ClientProviders og render-treet",
    explanation: (
      <>
        <p>
          <code>&lt;ClientProviders&gt;</code> er en egen komponent som
          wrapper rundt <code>children</code>. Her bor React-context som
          trenger å være en Client Component (f.eks. modal-state, toasts).
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>&lt;SyncUserOnLoad /&gt;</code> — den async Server
            Component-en fra linje 13 kalles her. Den returnerer{" "}
            <code>null</code>, men har en bieffekt (oppretter bruker i
            Supabase).
          </li>
          <li>
            <code>&lt;Navbar /&gt;</code>, <code>{"{children}"}</code>,{" "}
            <code>&lt;Footer /&gt;</code> — den visuelle strukturen. Barna
            til RootLayout er alltid innholdet i page.tsx-filen som matcher
            URL-en.
          </li>
        </ul>
      </>
    ),
  },
];

export default function AppRouterPage() {
  const { code, source, fullPath } = readAkseptertFile(
    "app/layout.tsx",
    LAYOUT_FALLBACK,
  );

  return (
    <div>
      <SubPageHeader
        title="App Router & Layouts"
        subtitle="1 · Slik fungerer Akseptert.no"
        badge="use client · layout.tsx"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18M7 3v18M12 3v18M17 3v18" />
          </svg>
        }
        lead={
          <>
            Next.js App Router er filsystemet som router. I dette kapittelet
            leser vi <code>app/layout.tsx</code> fra Akseptert-repoet med
            Node sin <code>fs</code>-modul og går gjennom den linje for linje.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#hva" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Hva er App Router?</a></li>
          <li><a href="#routing" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. Fil-basert routing</a></li>
          <li><a href="#server-client" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. Server vs Client</a></li>
          <li><a href="#layout" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. Ekte layout.tsx</a></li>
          <li><a href="#spring" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. Fra Spring MVC</a></li>
          <li><a href="#oppsummering" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. Oppsummering</a></li>
        </ul>
      </nav>

      <Section id="hva" step={1} title="Hva er App Router?">
        <p>
          Next.js har to router-systemer: <em>Pages Router</em> (gammelt) og{" "}
          <em>App Router</em> (nytt, siden 2023). Akseptert bruker App Router.
          Det betyr at hele <code>app/</code>-katalogen er et kart: mappe-
          strukturen bestemmer URL-ene.
        </p>

        <Callout kind="kjernen" title="Mental modell">
          <p>
            Hver mappe under <code>app/</code> blir et URL-segment. Hver{" "}
            <code>page.tsx</code> blir en side. Hver <code>layout.tsx</code>{" "}
            wrapper alt i mappen sin (og mapper under). Hver{" "}
            <code>route.ts</code> blir et HTTP-endepunkt.
          </p>
          <p>
            Dette er det motsatte av Spring sin <code>@Controller</code>-tilnærming
            der du eksplisitt skriver ruter med <code>@GetMapping</code> — her
            er <strong>fil-systemet selv rutingen</strong>.
          </p>
        </Callout>

        <CompareTwoCols
          leftTitle="Spring MVC"
          leftSubtitle="Eksplisitte ruter"
          rightTitle="Next.js App Router"
          rightSubtitle="Mapper = URL"
          left={
            <CodeBlock
              language="java"
              code={`@Controller
public class DashboardController {
  @GetMapping("/dashboard")
  public String dashboard(Model model) {
    model.addAttribute("jobs", jobService.list());
    return "dashboard"; // → dashboard.jsp
  }

  @GetMapping("/dashboard/ny")
  public String ny() {
    return "ny";
  }
}`}
            />
          }
          right={
            <CodeBlock
              language="text"
              code={`app/
├── layout.tsx          ← omslutter alt
├── page.tsx            ← /
└── dashboard/
    ├── layout.tsx      ← omslutter dashboard-sider
    ├── page.tsx        ← /dashboard
    └── ny/
        └── page.tsx    ← /dashboard/ny`}
            />
          }
        />
      </Section>

      <Section id="routing" step={2} title="Fil-basert routing — utforsk ekte mapper">
        <Sandbox
          title="Routing Explorer"
          description="Klikk en fil i listen for å se hvilken URL den svarer på og hvilken rolle den har i App Router."
        >
          <RoutingExplorer />
        </Sandbox>

        <Callout kind="info" title="Spesial-filnavn du må kunne">
          <ul className="list-disc pl-5 space-y-1">
            <li><code>page.tsx</code> — en side (en URL).</li>
            <li><code>layout.tsx</code> — wrapper rundt page + barnemapper.</li>
            <li><code>loading.tsx</code> — vises mens siden lastes (React Suspense).</li>
            <li><code>error.tsx</code> — vises hvis siden kaster en feil.</li>
            <li><code>not-found.tsx</code> — 404-sider.</li>
            <li><code>route.ts</code> — HTTP-endepunkt (ikke side).</li>
            <li><code>[segment]</code> — dynamisk rute (fangetter verdi).</li>
          </ul>
        </Callout>
      </Section>

      <Section
        id="server-client"
        step={3}
        title="Server Components vs Client Components"
        subtitle="Den største mentale endringen fra vanlig React: alt er Server Component som standard."
      >
        <p>
          I App Router kjører alle komponenter <strong>på serveren som
          standard</strong>. De blir rendret til HTML der, og HTML-en sendes til
          nettleseren. Ingen JavaScript for den komponenten sendes med.
        </p>
        <p>
          For å få interaktivitet (klikk, input, state) må du skrive{" "}
          <code>&quot;use client&quot;</code> øverst i filen. Da blir
          komponenten — og alle dens barn — en Client Component som hydrerer
          i nettleseren.
        </p>

        <Sandbox
          title="Server vs Client Component"
          description="Toggle mellom de to modusene og se forskjellen."
        >
          <ServerClientToggle />
        </Sandbox>

        <Callout kind="viktig" title="Viktige forskjeller">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Server:</strong> kan være <code>async</code>, lese fs/DB,
              bruke hemmeligheter. Kan ikke bruke hooks.
            </li>
            <li>
              <strong>Client:</strong> kan bruke useState/useEffect, lytte på
              klikk. Kan IKKE lese fs eller databasen direkte — må gå via en
              Server Action eller API-rute.
            </li>
            <li>
              Grensen går på <code>&quot;use client&quot;</code>. Alt som ligger
              importert under en client-fil er også client.
            </li>
          </ul>
        </Callout>

        <Callout kind="felle" title="Felle: useState i en Server Component">
          <p>
            Hvis du legger til <code>useState</code> i en fil uten{" "}
            <code>&quot;use client&quot;</code>, får du en kompileringsfeil:
          </p>
          <CodeBlock
            language="text"
            code={`Error: You're importing a component that needs useState.
It only works in a Client Component but none of its parents
are marked with "use client".`}
          />
        </Callout>
      </Section>

      <Section
        id="layout"
        step={4}
        title="Ekte layout.tsx fra Akseptert"
        subtitle="Denne koden er lest med Node fs-modulen rett fra handverker-ai-repoet."
      >
        {source === "live" ? (
          <Callout kind="tips" title={`Live fra ${fullPath}`}>
            <p>
              Koden nedenfor er hentet med <code>fs.readFileSync</code> i denne
              server-komponenten. Endrer du filen i Akseptert-repoet, kan du
              reloade siden og se de nye linjene her. Status-badgen i kode-
              visningen bekrefter at vi leser live.
            </p>
          </Callout>
        ) : (
          <Callout kind="info" title="Kjøres uten Akseptert-repo">
            <p>
              Vi fant ikke <code>{fullPath}</code> på dette miljøet, så vi
              viser en snapshot. På Erlends maskin leser siden direkte fra
              repoet.
            </p>
          </Callout>
        )}

        <p className="text-sm">
          Klikk på en uthevet linje i koden for å åpne forklaringen i panelet
          til høyre. Bruk prev/next for å stegge gjennom.
        </p>

        <CodeWalkthrough
          code={code}
          language="tsx"
          title="app/layout.tsx"
          fullPath={fullPath}
          source={source}
          annotations={layoutAnnotations}
        />

        <Callout kind="kjernen" title="Oppsummering av layout-filen">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Importer biblioteker og egne komponenter øverst.</li>
            <li>
              Definer Server Components rett i filen (<code>SyncUserOnLoad</code>
              ).
            </li>
            <li>
              Eksporter <code>metadata</code> for SEO. Next.js gjør det til
              <code>&lt;meta&gt;</code>-tagger.
            </li>
            <li>
              Default-eksport en komponent som tar <code>children</code> og
              returnerer hele HTML-strukturen (html, body, providers).
            </li>
            <li>
              Wrapper alt i providers: <code>ClerkProvider</code>{" "}
              (auth), <code>ClientProviders</code> (context), og statiske
              deler som <code>Navbar</code> + <code>Footer</code>.
            </li>
          </ol>
        </Callout>
      </Section>

      <Section id="spring" step={5} title="Fra Spring MVC til Next.js">
        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
          <table className="min-w-full text-sm">
            <thead className="bg-akseptert-500/10">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Spring MVC</th>
                <th className="px-3 py-2 text-left font-semibold">Next.js App Router</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2"><code>@Controller</code> + <code>@GetMapping</code></td>
                <td className="px-3 py-2">Mappe + <code>page.tsx</code></td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2"><code>@RestController</code> + <code>@PostMapping</code></td>
                <td className="px-3 py-2"><code>route.ts</code> med POST-handler, eller Server Action</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">JSP-fil med layout-fragmenter</td>
                <td className="px-3 py-2"><code>layout.tsx</code> som wrapper barn</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2"><code>application.properties</code></td>
                <td className="px-3 py-2"><code>.env.local</code> + env-vars i Vercel</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Controller-metode returnerer String (view-navn)</td>
                <td className="px-3 py-2">Komponent returnerer JSX — Next.js tegner til HTML selv</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Spring Security filter + <code>@PreAuthorize</code></td>
                <td className="px-3 py-2"><code>middleware.ts</code> + auth-sjekk i Server Components</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2"><code>@Autowired</code> service-injection</td>
                <td className="px-3 py-2">Vanlig <code>import</code> — ingen DI-container</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="oppsummering" step={6} title="Det du nå vet">
        <ul className="list-disc pl-6 space-y-1.5 marker:text-akseptert-500">
          <li>App Router bruker filsystemet til å definere ruter.</li>
          <li>
            <code>page.tsx</code> er en side, <code>layout.tsx</code> wrapper,{" "}
            <code>route.ts</code> et endepunkt.
          </li>
          <li>
            Alle komponenter er Server Components som standard. Legg til{" "}
            <code>&quot;use client&quot;</code> hvis du trenger hooks eller
            klient-interaktivitet.
          </li>
          <li>
            <code>metadata</code>-eksport erstatter manuell{" "}
            <code>&lt;head&gt;</code>-administrering.
          </li>
          <li>
            Provider-wrappere som <code>ClerkProvider</code> gir hele treet
            tilgang til auth-status.
          </li>
        </ul>
      </Section>

      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Link
          href="/akseptert"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-akseptert-400/60 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Tilbake</p>
          <p className="font-bold">Oversikten</p>
        </Link>
        <Link
          href="/akseptert/kode/ai-generation"
          className="rounded-xl border-2 border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4 hover:border-akseptert-500 transition-colors"
        >
          <p className="text-xs text-akseptert-600 dark:text-akseptert-300">Neste →</p>
          <p className="font-bold">AI Generation</p>
        </Link>
      </div>
    </div>
  );
}
