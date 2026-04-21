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
import SupabaseQueryBuilder from "@/components/akseptert/SupabaseQueryBuilder";
import RLSDemo from "@/components/akseptert/RLSDemo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_LIB_FALLBACK = `import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL og SUPABASE_SERVICE_ROLE_KEY (eller NEXT_PUBLIC_SUPABASE_ANON_KEY) må være satt.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export type UserFikenSettings = {
  clerk_user_id: string;
  fiken_api_key: string | null;
  default_account: string;
};`;

const INBOUND_FALLBACK_SNIPPET = `export async function lookupUserByInboundEmail(
    email: string
): Promise<{ userId: string; companyName: string; trade: string | null } | null> {
    const { data } = await supabase
        .from("company_profiles")
        .select("user_id, name, trade, trade_custom, trades_secondary")
        .eq("inbound_email", email.toLowerCase())
        .maybeSingle();

    if (!data) return null;

    return {
        userId: data.user_id,
        companyName: data.name || "",
        trade: data.trade || null,
    };
}`;

const libAnnotations: Annotation[] = [
  {
    line: 1,
    title: "Importer createClient fra Supabase JS-SDK",
    explanation: (
      <p>
        SDK-en er en tynn wrapper over HTTP. Bak kulissene lager den requests
        mot Supabase sin PostgREST-API (den som gjør Postgres tilgjengelig
        via REST).
      </p>
    ),
  },
  {
    line: 3,
    toLine: 6,
    title: "Hent URL + nøkkel fra env",
    explanation: (
      <>
        <p>
          <code>NEXT_PUBLIC_SUPABASE_URL</code> er et <em>offentlig</em>{" "}
          domene som peker til prosjektets API.
        </p>
        <p>
          <strong>Nøkkelen er nøkkelspørsmålet:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>SUPABASE_SERVICE_ROLE_KEY</code> — super-admin. Bypass-er
            all RLS. Skal ALDRI havne i klient-koden. Akseptert bruker
            denne fordi filen importeres fra Server Actions.
          </li>
          <li>
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> — «anonym»-nøkkel,
            trygg å eksponere. Respekterer RLS-policyer.
          </li>
        </ul>
      </>
    ),
  },
  {
    line: 8,
    toLine: 12,
    title: "Fail fast — ingen hemmelige nøkler, ingen app",
    explanation: (
      <p>
        Kaster en exception ved oppstart hvis env-variablene mangler. Bedre
        å krasje tidlig enn å kjøre med udefinert oppførsel. Feilmeldingen
        peker rett på fiksen — en Tailwind-klasse som ikke settes gir minst
        hodebry når man ser denne.
      </p>
    ),
  },
  {
    line: 14,
    title: "Eksporter singleton-klient",
    explanation: (
      <>
        <p>
          <code>export const supabase</code> gir hele kodebasen én delt
          klient. Fordi filen er på server-siden (importert kun fra{" "}
          <code>&quot;use server&quot;</code>-filer), gjenbruker Vercel den
          mellom requests via Fluid Compute.
        </p>
      </>
    ),
  },
  {
    line: 16,
    toLine: 20,
    title: "TypeScript-type for en egen-definert rad-form",
    explanation: (
      <>
        <p>
          Supabase genererer ikke automatisk typer her (man kan sette opp det
          via <code>supabase gen types</code>, men Akseptert skriver dem
          manuelt). <code>type</code>-aliaset beskriver formen på en rad i{" "}
          <code>company_profiles</code> når den gjelder Fiken-integrasjonen.
        </p>
      </>
    ),
  },
];

const inboundAnnotations: Annotation[] = [
  {
    line: 1,
    toLine: 3,
    title: "Funksjonssignatur med union-return",
    explanation: (
      <>
        <p>
          Returnerer enten et objekt eller <code>null</code>. Null er eksplisitt
          «ingen funn». Dette er en vanlig måte å signalisere «not found» i
          TypeScript, i stedet for å kaste en exception.
        </p>
      </>
    ),
  },
  {
    line: 4,
    toLine: 8,
    title: "Query builder-kjeden",
    explanation: (
      <>
        <p>
          Hvert metode-kall returnerer et nytt query-objekt. Supabase er
          «lazy»: ingenting skjer før du <code>await</code>-er (da sendes
          HTTP-en).
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <code>.from(&quot;company_profiles&quot;)</code> — velg tabell.
          </li>
          <li>
            <code>.select(&quot;user_id, name, trade, ...&quot;)</code> —
            hvilke kolonner. Komma-separert streng, ikke array.
          </li>
          <li>
            <code>.eq(&quot;inbound_email&quot;, email.toLowerCase())</code> —
            WHERE-ledd.
          </li>
          <li>
            <code>.maybeSingle()</code> — returner én rad eller{" "}
            <code>null</code>. <code>.single()</code> hadde kastet hvis ingen
            rad.
          </li>
        </ul>
      </>
    ),
  },
  {
    line: 10,
    title: "Destructuring kun av data",
    explanation: (
      <>
        <p>
          <code>{`const { data } = ...`}</code> ignorerer{" "}
          <code>error</code>-feltet. Det er bevisst valgt her siden
          <code>null</code>-data uansett er måten vi signaliserer
          &quot;ikke funnet&quot;.
        </p>
        <p>
          I prod bør man nok logge <code>error</code> — DB-feil skal ikke stille
          seg som &quot;bruker finnes ikke&quot;. En mer defensiv variant
          hadde vært:
        </p>
        <CodeBlock
          language="ts"
          code={`const { data, error } = await supabase.from(...)...;
if (error) console.error("[lookup] DB feil:", error);`}
        />
      </>
    ),
  },
];

export default function SupabaseDeepDivePage() {
  const { code: libCode, source: libSource, fullPath: libPath } =
    readAkseptertFile("lib/supabase.ts", SUPABASE_LIB_FALLBACK);

  const { code: inboundCode, source: inboundSource, fullPath: inboundPath } =
    readAkseptertFile("app/actions/inbound.ts", INBOUND_FALLBACK_SNIPPET);

  const lookupSnippet =
    inboundSource === "live"
      ? sliceLines(inboundCode, 114, 130)
      : INBOUND_FALLBACK_SNIPPET;

  return (
    <div>
      <SubPageHeader
        title="Supabase Deep Dive"
        subtitle="1 · Avansert Magi"
        badge="Postgres · RLS"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v7c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
            <path d="M3 12v7c0 1.657 4.03 3 9 3s9-1.343 9-3v-7" />
          </svg>
        }
        lead={
          <>
            Supabase er en hosted Postgres med ekstra verktøy: auth, storage,
            realtime og et JS/TS-SDK som fungerer som et type-sikkert query
            builder. Vi sammenligner med Hibernate/JPA fra Spring-verdenen.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#hva" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Hva er Supabase?</a></li>
          <li><a href="#sammenligning" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. Sammenligning</a></li>
          <li><a href="#lib" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. supabase.ts</a></li>
          <li><a href="#builder" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. Query Builder</a></li>
          <li><a href="#mutations" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. INSERT/UPDATE/DELETE</a></li>
          <li><a href="#lookup" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. Ekte oppslag</a></li>
          <li><a href="#rls" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">7. Row Level Security</a></li>
          <li><a href="#feller" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">8. Feller å unngå</a></li>
        </ul>
      </nav>

      <Section id="hva" step={1} title="Hva er Supabase, egentlig?">
        <p>
          Supabase er «det åpne alternativet til Firebase», men i virkeligheten
          er det bare Postgres + en samling tjenester rundt:
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-akseptert-500">
          <li><strong>Postgres-database</strong> — standard, ingen eksotiske proprietære features.</li>
          <li><strong>PostgREST</strong> — en auto-generert REST-API over databasen.</li>
          <li><strong>Auth</strong> — JWT-basert (Akseptert bruker Clerk i stedet).</li>
          <li><strong>Storage</strong> — S3-kompatibel fil-lagring.</li>
          <li><strong>Realtime</strong> — endringer pushes via WebSocket (brukes ikke av Akseptert).</li>
          <li><strong>SDK-er</strong> — JS/TS, Python, Dart osv. Alle bygger query-objekter som blir PostgREST-kall.</li>
        </ul>

        <Callout kind="kjernen" title="Mental modell">
          <p>
            SDK-koden du skriver er bare <em>query-konstruksjon</em>. Når du
            <code> await</code>-er, oversettes kjeden til en HTTP GET/POST mot
            PostgREST, som igjen oversetter den til SQL mot Postgres. Svaret
            er JSON.
          </p>
          <p>
            Dette er forskjellig fra Hibernate, som genererer SQL direkte og
            bruker en JDBC-connection til databasen.
          </p>
        </Callout>
      </Section>

      <Section id="sammenligning" step={2} title="Tre måter å gjøre samme ting">
        <p>
          «Finn brukeren hvis inbound-e-post er noe bestemt». Her er tre
          verdener som løser det:
        </p>

        <div className="grid lg:grid-cols-3 gap-3 my-4">
          <div className="rounded-xl border border-akseptert-400/40 bg-akseptert-50/40 dark:bg-akseptert-950/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-akseptert-100 text-akseptert-700 dark:bg-akseptert-900/40 dark:text-akseptert-200">
                Supabase
              </span>
            </div>
            <pre className="bg-neutral-950 text-neutral-100 rounded p-2 text-[11px] font-mono overflow-x-auto">
              <code>{`const { data } = await supabase
  .from("company_profiles")
  .select("user_id, name")
  .eq("inbound_email", email)
  .maybeSingle();`}</code>
            </pre>
            <ul className="text-xs mt-2 space-y-0.5 text-[var(--muted)]">
              <li>✓ Ingen ORM å konfigurere</li>
              <li>✓ Typer eller <code>gen types</code></li>
              <li>✓ JSON tilbake</li>
              <li>✗ HTTP, ikke JDBC</li>
            </ul>
          </div>

          <div className="rounded-xl border border-sky-400/40 bg-sky-50/40 dark:bg-sky-950/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200">
                Rå SQL
              </span>
            </div>
            <pre className="bg-neutral-950 text-neutral-100 rounded p-2 text-[11px] font-mono overflow-x-auto">
              <code>{`SELECT user_id, name
FROM company_profiles
WHERE inbound_email = $1
LIMIT 1;`}</code>
            </pre>
            <ul className="text-xs mt-2 space-y-0.5 text-[var(--muted)]">
              <li>✓ Mest kontroll</li>
              <li>✓ Null magi</li>
              <li>✗ Må binde params selv</li>
              <li>✗ Null typesikkerhet</li>
            </ul>
          </div>

          <div className="rounded-xl border border-orange-400/40 bg-orange-50/40 dark:bg-orange-950/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200">
                JPA/Hibernate
              </span>
            </div>
            <pre className="bg-neutral-950 text-neutral-100 rounded p-2 text-[11px] font-mono overflow-x-auto">
              <code>{`Optional<CompanyProfile> result =
  repo.findByInboundEmail(email);

// Interface (genererer SQL):
public interface CompanyRepo
    extends JpaRepository<...> {
  Optional<CompanyProfile>
      findByInboundEmail(String e);
}`}</code>
            </pre>
            <ul className="text-xs mt-2 space-y-0.5 text-[var(--muted)]">
              <li>✓ Typesikker mapping</li>
              <li>✓ JPQL + named queries</li>
              <li>✗ Lazy loading-fallgruver</li>
              <li>✗ N+1-problemet</li>
            </ul>
          </div>
        </div>

        <Callout kind="info" title="Hovedforskjell fra Hibernate">
          <p>
            Hibernate forsøker å <em>skjule</em> databasen bak Java-objekter —
            du får <code>Entity</code>-er med relasjoner som «lades» på
            magisk vis. Supabase gjør det motsatte: query-objekter er en
            lett skal over SQL, og relasjoner må eksplisitt fetch-es via
            <code> .select(&quot;*, other_table(*)&quot;)</code>.
          </p>
          <p>
            Derfor: ingen <code>LazyInitializationException</code>, ingen
            N+1, men du må være mer eksplisitt.
          </p>
        </Callout>
      </Section>

      <Section
        id="lib"
        step={3}
        title="lib/supabase.ts — Akseptert sin klient-oppsett"
      >
        <CodeWalkthrough
          code={libCode}
          language="ts"
          title="lib/supabase.ts"
          fullPath={libPath}
          source={libSource}
          annotations={libAnnotations}
        />

        <Callout kind="felle" title="Felle: hemmelig nøkkel på klienten">
          <p>
            Akseptert importerer <code>supabase</code> fra{" "}
            <code>&quot;use server&quot;</code>-filer. Hvis noen importerer
            den fra en klient-komponent, bakes <code>SUPABASE_SERVICE_ROLE_KEY</code>{" "}
            inn i JS-bundlen og lekker til enhver bruker. Det ville vært
            game over — alle kunne lest/endret alt i databasen.
          </p>
          <p>
            Verktøy som <code>server-only</code>-pakken kan hjelpe: den
            kaster feil ved build-time hvis en server-fil importeres fra
            klient-kode.
          </p>
        </Callout>
      </Section>

      <Section
        id="builder"
        step={4}
        title="Interaktiv Query Builder"
        subtitle="Bygg en spørring og se den samtidig i Supabase SDK, rå SQL og JPA/Hibernate."
      >
        <Sandbox title="Query Builder">
          <SupabaseQueryBuilder />
        </Sandbox>

        <Callout kind="tips" title="Prøv disse kombinasjonene">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <code>profiles</code> + velg <code>is_pro</code> + filter{" "}
              <code>id eq user_123</code> + <code>maybeSingle</code> — klassisk
              bruker-sjekk.
            </li>
            <li>
              <code>jobs</code> + alle kolonner + filter{" "}
              <code>status eq utkast</code> + <code>limit 10</code> — liste de
              10 nyeste utkastene.
            </li>
            <li>
              <code>material_prices</code> + <code>name</code> filter{" "}
              <code>ilike %rør%</code> — tekstsøk à la SQL LIKE.
            </li>
          </ul>
        </Callout>
      </Section>

      <Section id="mutations" step={5} title="Andre operasjoner — INSERT, UPDATE, DELETE, upsert">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              INSERT
            </p>
            <CodeBlock
              language="ts"
              code={`const { data, error } = await supabase
  .from("jobs")
  .insert({
    user_id: userId,
    title: "Mittanbud-forespørsel",
    status: "utkast",
  })
  .select()  // returner den nye raden
  .single();`}
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              UPDATE
            </p>
            <CodeBlock
              language="ts"
              code={`await supabase
  .from("profiles")
  .update({
    scans_remaining:
      (profile.scans_remaining ?? 1) - 1,
  })
  .eq("id", userId);`}
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              DELETE
            </p>
            <CodeBlock
              language="ts"
              code={`await supabase
  .from("templates")
  .delete()
  .eq("id", templateId)
  .eq("user_id", userId); // viktig!`}
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              UPSERT (INSERT ... ON CONFLICT)
            </p>
            <CodeBlock
              language="ts"
              code={`await supabase
  .from("profiles")
  .upsert({
    id: clerkUserId,
    is_pro: true,
    stripe_customer_id: customerId,
    updated_at: new Date().toISOString(),
  }, { onConflict: "id" });`}
            />
          </div>
        </div>

        <Callout kind="viktig" title="Alltid filtrér på user_id i UPDATE/DELETE">
          <p>
            Når du ikke kjører via RLS (f.eks. fra en Server Action med
            service-role), er det <em>din</em> kode som må sørge for at
            brukere bare endrer sine egne rader. Et enkelt{" "}
            <code>.eq(&quot;user_id&quot;, userId)</code> etter{" "}
            <code>.update(...)</code>/<code>.delete()</code> redder deg.
          </p>
        </Callout>
      </Section>

      <Section
        id="lookup"
        step={6}
        title="Ekte oppslag: lookupUserByInboundEmail"
        subtitle="Hentet live fra app/actions/inbound.ts. Klikk en uthevet linje for detaljer."
      >
        <CodeWalkthrough
          code={lookupSnippet}
          language="ts"
          title="app/actions/inbound.ts — lookupUserByInboundEmail"
          fullPath={inboundPath}
          source={inboundSource}
          annotations={inboundAnnotations}
        />
      </Section>

      <Section
        id="rls"
        step={7}
        title="Row Level Security (RLS) — den viktige delen"
        subtitle="Det er dette som gjør at Supabase er trygt å eksponere mot klienten."
      >
        <p>
          Med RLS kan du lage policy-er i Postgres som automatisk filtrerer
          hvilke rader en request kan se eller endre. Det er som å ha et
          sikkerhetsfilter <em>inne i</em> databasen — ingen mulighet for
          app-koden til å glemme å sjekke eierskap.
        </p>

        <Sandbox
          title="RLS Demo"
          description="Bytt mellom brukere og skru RLS av/på. Se hvordan radsettet endrer seg."
        >
          <RLSDemo />
        </Sandbox>

        <Callout kind="info" title="Hvordan Akseptert egentlig gjør det">
          <p>
            Akseptert importerer Supabase med <code>SUPABASE_SERVICE_ROLE_KEY</code>{" "}
            i Server Actions. Den <em>bypasser RLS</em>. Sikkerheten må
            derfor sørges for ved å alltid filtrere på <code>user_id</code>{" "}
            i koden vår.
          </p>
          <p>
            Den sikreste tilnærmingen hadde vært å bruke anon-nøkkelen pluss
            Clerk JWT, og la RLS gjøre jobben. Hvorfor ikke? Clerk sine
            user-id-er passer ikke med Supabase Auth sine{" "}
            <code>auth.uid()</code> — det kreves et tilpasset JWT-oppsett
            som ville gjort koden mer kompleks.
          </p>
        </Callout>
      </Section>

      <Section id="feller" step={8} title="Fem feller å unngå">
        <ol className="list-decimal pl-6 space-y-2 marker:text-akseptert-500">
          <li>
            <strong>Glemme <code>.eq(&quot;user_id&quot;, ...)</code></strong> i UPDATE/
            DELETE når du bruker service-role-klienten. Én slurvet spørring,
            og du kan slette andres data.
          </li>
          <li>
            <strong>.single() i stedet for .maybeSingle()</strong> når raden
            kanskje ikke finnes. <code>.single()</code> kaster en exception
            på 0 rader — sjelden det du vil.
          </li>
          <li>
            <strong>Hente hele raden når du trenger tre felter.</strong> Bruk
            <code>.select(&quot;id, name, email&quot;)</code> — da slipper
            du å laste unødvendig data, og typene kan narrow-es.
          </li>
          <li>
            <strong>Bygge WHERE-strenger manuelt</strong> —{" "}
            <code>.eq()</code> og <code>.ilike()</code> binder verdiene
            trygt som parametre. Ingen fare for SQL-injection.
          </li>
          <li>
            <strong>Ignorere <code>error</code>-feltet.</strong> DB-feil (for
            eksempel unique-violation) kan fort ende opp som «fungerte,
            men uten data», og gi mystiske bugs senere.
          </li>
        </ol>
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
          href="/akseptert/magi/webhooks"
          className="rounded-xl border-2 border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4 hover:border-akseptert-500 transition-colors"
        >
          <p className="text-xs text-akseptert-600 dark:text-akseptert-300">Neste →</p>
          <p className="font-bold">Webhook Pipeline</p>
        </Link>
      </div>
    </div>
  );
}
