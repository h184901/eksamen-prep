import Link from "next/link";
import { readAkseptertFile } from "@/lib/akseptert-source";
import SubPageHeader from "@/components/akseptert/SubPageHeader";
import { Section, Sandbox } from "@/components/akseptert/Section";
import Callout from "@/components/akseptert/Callout";
import CodeBlock from "@/components/akseptert/CodeBlock";
import CompareTwoCols from "@/components/akseptert/CompareTwoCols";
import CodeWalkthrough, {
  type Annotation,
} from "@/components/akseptert/CodeWalkthrough";
import StackDiagram from "@/components/akseptert/StackDiagram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIDDLEWARE_FALLBACK = `import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
    '/',
    '/pricing(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks(.*)',
]);

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/settings(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req) && !isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ico).*).*)',
        '/(api|trpc)(.*)',
    ],
};`;

const middlewareAnnotations: Annotation[] = [
  {
    line: 1,
    title: "Importer Clerk sin Next-middleware",
    explanation: (
      <p>
        Clerk eksporterer en ferdig middleware-funksjon som integrerer med
        Next.js sin request-pipeline. Vi behøver ikke skrive auth-sjekker
        manuelt.
      </p>
    ),
  },
  {
    line: 3,
    toLine: 10,
    title: "Offentlige ruter — trenger ikke innlogging",
    explanation: (
      <>
        <p>
          <code>createRouteMatcher</code> bygger en funksjon vi kan gi en
          request — den svarer true hvis URL-en matcher noen av mønstrene.
          <code>(.*)</code> etter en rute betyr «og alt under».
        </p>
        <p>
          Eksempler: Landingssiden, priser, sign-in, og webhooks (som må
          være åpne for at Stripe skal kunne treffe dem).
        </p>
      </>
    ),
  },
  {
    line: 12,
    toLine: 16,
    title: "Beskyttede ruter — krever innlogging",
    explanation: (
      <p>
        Dashboardet og innstillinger. Her skal ingen ukjente komme inn.
        Resten av appen (f.eks. landingssiden) er implisitt offentlig fordi
        den ikke står i noen av listene.
      </p>
    ),
  },
  {
    line: 18,
    toLine: 23,
    title: "Hovedlogikken",
    explanation: (
      <>
        <p>
          Middleware kjøres <strong>før</strong> enhver request treffer
          page.tsx eller route.ts. Hvis URL-en både er «protected» og ikke
          matcher en public route, kaller vi <code>auth.protect()</code> —
          som enten fortsetter (brukeren er innlogget) eller redirecter til
          sign-in.
        </p>
      </>
    ),
  },
  {
    line: 25,
    toLine: 31,
    title: "matcher — hvilke requests filteret gjelder for",
    explanation: (
      <>
        <p>
          Det stygge regex-et filtrerer bort statiske filer (bilder, CSS, JS)
          slik at middlewaren ikke kjører på dem. Spesielle mapper som{" "}
          <code>_next/</code> ekskluderes også.
        </p>
        <p>
          Ellers hadde hver request for en CSS-fil truffet Clerk — treig og
          unødvendig.
        </p>
      </>
    ),
  },
];

export default function StackPage() {
  const { code: middlewareCode, source, fullPath } = readAkseptertFile(
    "middleware.ts",
    MIDDLEWARE_FALLBACK,
  );

  return (
    <div>
      <SubPageHeader
        title="Hele Stacken"
        subtitle="4 · Slik fungerer Akseptert.no"
        badge="integrasjoner"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M4 7.5l16 9M20 7.5l-16 9" />
          </svg>
        }
        lead={
          <>
            Akseptert er limet mellom sju eksterne tjenester. Her er kartet
            over hvilke tjenester som snakker med hvilke — og hvorfor.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#diagram" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Stackdiagram</a></li>
          <li><a href="#middleware" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. middleware.ts</a></li>
          <li><a href="#env" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. Env-variabler</a></li>
          <li><a href="#webhooks" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. Webhooks</a></li>
          <li><a href="#lokal" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. Lokal utvikling</a></li>
          <li><a href="#valg" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. Hvorfor disse?</a></li>
        </ul>
      </nav>

      <Section id="diagram" step={1} title="Det store bildet">
        <p>
          Vercel er midten. Alle andre tjenester snakker hovedsakelig med
          Vercel — ikke med hverandre. Det gjør feilsøking mye enklere:
          hvis noe går galt, skjer det enten i vår kode på Vercel, eller hos
          én spesifikk tredjepart.
        </p>

        <Sandbox title="Stack Diagram">
          <StackDiagram />
        </Sandbox>
      </Section>

      <Section
        id="middleware"
        step={2}
        title="Middleware — dørvakten"
        subtitle="Hvordan beskyttede ruter fungerer på Akseptert, lest live fra middleware.ts."
      >
        <p>
          Middleware kjøres på <em>hver</em> request, før sidene rendres. Den
          er perfekt plass for å sjekke om en bruker er logget inn før vi i
          det hele tatt bryr oss om hva siden skal rendre.
        </p>

        <CodeWalkthrough
          code={middlewareCode}
          language="ts"
          title="middleware.ts"
          fullPath={fullPath}
          source={source}
          annotations={middlewareAnnotations}
        />

        <Callout kind="info" title="Spring-analogi">
          <p>
            Middleware er Next.js sin ekvivalent til Spring sine{" "}
            <code>OncePerRequestFilter</code> eller{" "}
            <code>HandlerInterceptor</code>. Kjører før rutinen, kan
            avbryte requesten, eller legge til kontekst.
          </p>
        </Callout>
      </Section>

      <Section
        id="env"
        step={3}
        title="Env-variabler — hvor hemmelighetene bor"
      >
        <p>
          Akseptert har ~15 env-variabler. De er delt i to: offentlige (med{" "}
          <code>NEXT_PUBLIC_</code>-prefiks, tilgjengelige i klient-koden) og
          hemmelige (bare på server).
        </p>

        <CompareTwoCols
          leftTitle="Offentlig"
          leftSubtitle="NEXT_PUBLIC_* — kan lekke til klient"
          rightTitle="Hemmelig"
          rightSubtitle="Bare på server — lekker ikke"
          left={
            <ul className="list-disc pl-5 space-y-1 text-xs font-mono">
              <li>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</li>
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
              <li>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</li>
              <li>NEXT_PUBLIC_APP_URL</li>
            </ul>
          }
          right={
            <ul className="list-disc pl-5 space-y-1 text-xs font-mono">
              <li>CLERK_SECRET_KEY</li>
              <li>SUPABASE_SERVICE_ROLE_KEY</li>
              <li>OPENAI_API_KEY</li>
              <li>STRIPE_SECRET_KEY</li>
              <li>STRIPE_WEBHOOK_SECRET</li>
              <li>RESEND_API_KEY</li>
            </ul>
          }
        />

        <Callout kind="felle" title="Felle: NEXT_PUBLIC_ ved et uhell">
          <p>
            Hvis du legger en hemmelig nøkkel med <code>NEXT_PUBLIC_</code>
            -prefiks, bakes den inn i klientens JavaScript-bundle. Alle kan
            se den ved å åpne devtools. Dobbeltsjekk alltid prefikset før du
            committer.
          </p>
        </Callout>

        <CodeBlock
          language="bash"
          title=".env.local"
          code={`# Offentlige — er tilgjengelige i klient-koden
NEXT_PUBLIC_SUPABASE_URL="https://abc123.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGci..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."

# Server-only — lekker aldri
SUPABASE_SERVICE_ROLE_KEY="eyJhbGci..."  # kan gjøre ALT i databasen
OPENAI_API_KEY="sk-..."
CLERK_SECRET_KEY="sk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."`}
        />
      </Section>

      <Section
        id="webhooks"
        step={4}
        title="Webhooks — når ting skjer hos andre"
      >
        <p>
          Akseptert har tre webhook-endepunkter i{" "}
          <code>app/api/webhooks/</code>:
        </p>

        <div className="space-y-3">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                STRIPE
              </span>
              <h4 className="font-bold text-sm"><code>/api/webhooks/stripe</code></h4>
            </div>
            <p className="text-sm text-[var(--muted)] mb-2">
              Stripe sender hit når et abonnement opprettes, avsluttes eller
              feiler. Vi verifiserer signaturen og oppdaterer{" "}
              <code>profiles.is_pro</code> i Supabase.
            </p>
            <CodeBlock
              language="ts"
              code={`// Forenklet
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const event = stripe.webhooks.constructEvent(
    await req.text(), sig!, process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    await supabase.from("profiles")
      .update({ is_pro: true })
      .eq("id", userId);
  }
  return Response.json({ received: true });
}`}
            />
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                RESEND
              </span>
              <h4 className="font-bold text-sm"><code>/api/webhooks/resend-inbound</code></h4>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Når en kunde svarer på et tilbud via e-post, får Resend meldingen
              og POST-er den hit. Vi parser avsender, tråd-id og innholdet, og
              legger svaret inn i jobbens korrespondanse-tråd.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                EMAIL
              </span>
              <h4 className="font-bold text-sm"><code>/api/webhooks/email</code></h4>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Leveringsstatus fra Resend — «sendt», «åpnet», «bouncet».
              Brukes til å oppdatere read-receipts i UI.
            </p>
          </div>
        </div>

        <Callout kind="viktig" title="Webhook-signatur er ALT">
          <p>
            En webhook-URL er offentlig — hvem som helst kan POSTe til den.
            Derfor MÅ vi verifisere at avsenderen er den vi tror. Stripe gjør
            det med en signert header; Resend det samme. Hopper du over den
            sjekken, kan en angriper late som Stripe og oppgradere seg selv
            til Pro gratis.
          </p>
        </Callout>
      </Section>

      <Section id="lokal" step={5} title="Lokal utvikling">
        <ol className="list-decimal pl-6 space-y-1.5 marker:text-akseptert-500">
          <li>
            Klon repoet: <code>git clone ...</code>
          </li>
          <li>
            Kopier <code>.env.example</code> → <code>.env.local</code>, fyll
            inn alle nøklene fra dashboardene (Clerk, Supabase, OpenAI,
            Stripe, Resend).
          </li>
          <li>
            <code>npm install</code> og <code>npm run dev</code> starter dev-
            server på <code>localhost:3000</code>.
          </li>
          <li>
            For å teste Stripe-webhooks lokalt: installer Stripe CLI og kjør{" "}
            <code>stripe listen --forward-to localhost:3000/api/webhooks/stripe</code>.
            Den printer et webhook-secret du legger i{" "}
            <code>STRIPE_WEBHOOK_SECRET</code>.
          </li>
          <li>
            Supabase har egen CLI — men i praksis er det enklere å kjøre mot
            dev-prosjektet i Supabase-dashboardet direkte.
          </li>
        </ol>
      </Section>

      <Section id="valg" step={6} title="Hvorfor disse tjenestene?">
        <div className="space-y-3">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold mb-1">Clerk over å bygge eget auth</h4>
            <p className="text-sm text-[var(--muted)]">
              Auth er lett å få feil og kan koste deg alle brukerne hvis noe
              lekker. Clerk er $25/mnd for ro i sjela — magic links, social
              login, passordreset, to-faktor. I Spring ville du brukt Spring
              Security + ekstra arbeid. I Next ville du brukt enten Clerk,
              NextAuth eller Supabase Auth. Akseptert valgte Clerk for polert
              UX.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold mb-1">Supabase over å drifte egen Postgres</h4>
            <p className="text-sm text-[var(--muted)]">
              Standard Postgres, men Supabase håndterer backup, skalering,
              row level security, og gir deg en generert REST-/JS-SDK på
              kjøpet. Mye mindre konfigurasjon enn å sette opp RDS selv.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold mb-1">Vercel over å drifte Node selv</h4>
            <p className="text-sm text-[var(--muted)]">
              <code>git push</code> → deploy. Preview-URL for hver PR. Edge
              caching. Automatisk SSL. CLI-verktøy for logs og env-vars. Alt
              det vi ikke vil tenke på mens vi bygger produktet.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold mb-1">Fiken over å bygge regnskapsmodul</h4>
            <p className="text-sm text-[var(--muted)]">
              Regnskap i Norge er lovregulert. Fiken har allerede sorter
              bokføringsregler, MVA-håndtering og revisor-eksport. Ved å
              integrere slipper vi å løse det problemet — og våre brukere
              får holde verktøyet de allerede er vant til.
            </p>
          </div>
        </div>

        <Callout kind="kjernen" title="Mønsteret">
          <p>
            Akseptert fokuserer på én ting: gode AI-genererte pristilbud for
            norske håndverkere. Alt det andre (auth, betaling, e-post,
            hosting, regnskap) outsources til spesialister. Det er moderne
            SaaS-arkitektur i en setning.
          </p>
        </Callout>
      </Section>

      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Link
          href="/akseptert/kode/data-flow"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-akseptert-400/60 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Forrige</p>
          <p className="font-bold">Data Flow</p>
        </Link>
        <Link
          href="/akseptert"
          className="rounded-xl border-2 border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4 hover:border-akseptert-500 transition-colors"
        >
          <p className="text-xs text-akseptert-600 dark:text-akseptert-300">Tilbake</p>
          <p className="font-bold">Til oversikten</p>
        </Link>
      </div>
    </div>
  );
}
