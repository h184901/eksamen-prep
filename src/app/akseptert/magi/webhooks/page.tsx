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
import SvixSimulator from "@/components/akseptert/SvixSimulator";
import MittanbudPipeline from "@/components/akseptert/MittanbudPipeline";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_WEBHOOK_FALLBACK_VERIFY = `const webhookSecret = process.env.RESEND_INBOUND_WEBHOOK_SECRET;
if (!webhookSecret) {
    return NextResponse.json(
        { error: "Webhook misconfiguration" },
        { status: 500 }
    );
}

let payload: string;
try {
    payload = await request.text();
} catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
}

const svixId = request.headers.get("svix-id");
const svixTimestamp = request.headers.get("svix-timestamp");
const svixSignature = request.headers.get("svix-signature");
if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Invalid headers" }, { status: 401 });
}

let event: WebhookEvent;
try {
    event = resend.webhooks.verify({
        payload,
        headers: {
            id: svixId,
            timestamp: svixTimestamp,
            signature: svixSignature,
        },
        webhookSecret,
    }) as WebhookEvent;
} catch (e) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
}`;

const RESEND_WEBHOOK_FALLBACK_PROCESS = `const inboundAddress = extractInboundSlugEmail(eventData.to);
if (!inboundAddress) {
    return NextResponse.json({ error: "Unknown recipient" }, { status: 404 });
}

const { data: companyRow } = await supabase
    .from("company_profiles")
    .select("user_id, name, trade, trade_custom, trades_secondary")
    .eq("inbound_email", inboundAddress)
    .maybeSingle();

if (!companyRow) {
    return NextResponse.json({ error: "Unknown recipient" }, { status: 404 });
}

const userId = companyRow.user_id;

const { data: profile } = await supabase
    .from("profiles")
    .select("is_pro")
    .eq("id", userId)
    .maybeSingle();

if (!profile?.is_pro) {
    return NextResponse.json({ error: "Pro subscription required" }, { status: 403 });
}`;

const verifyAnnotations: Annotation[] = [
  {
    line: 1,
    toLine: 7,
    title: "Les webhook-secret fra env",
    explanation: (
      <>
        <p>
          <code>RESEND_INBOUND_WEBHOOK_SECRET</code> er den delte hemmeligheten
          mellom Resend og oss. Den finnes bare på serveren og brukes til å
          verifisere signaturen. Er den ikke satt, returnerer vi 500 — bedre å
          feile synlig enn å akseptere usignerte requests.
        </p>
      </>
    ),
  },
  {
    line: 9,
    toLine: 14,
    title: "Les body som rå tekst, IKKE json()",
    explanation: (
      <>
        <p>
          <strong>Avgjørende:</strong> vi må bruke <code>request.text()</code>,
          ikke <code>request.json()</code>. Signaturen er beregnet over
          nøyaktig den byte-sekvensen Resend sendte. Hvis vi parser til JSON
          og serialiserer tilbake, kan whitespace eller feltrekkefølge endre
          seg, og signaturen matcher ikke lenger.
        </p>
      </>
    ),
  },
  {
    line: 16,
    toLine: 21,
    title: "Sjekk alle tre Svix-headere finnes",
    explanation: (
      <>
        <p>
          Svix bruker tre headere i kombinasjon: <code>svix-id</code>,{" "}
          <code>svix-timestamp</code> og <code>svix-signature</code>. Alle
          tre må være med for å kunne verifisere. Mangler en, avvis med 401.
        </p>
        <p>
          <strong>Hvorfor timestamp?</strong> Så en angriper ikke kan spille
          av en ekte, avlyttet request langt senere (replay-angrep). Ekte
          verifiseringsbiblioteker sjekker typisk at timestamp er innenfor
          ±5 minutter.
        </p>
      </>
    ),
  },
  {
    line: 23,
    toLine: 36,
    title: "La Resend-SDK-en gjøre selve HMAC-sammenligningen",
    explanation: (
      <>
        <p>
          <code>resend.webhooks.verify(...)</code> bygger{" "}
          <code>signedContent = `${"{id}.{timestamp}.{payload}"}`</code>,
          kjører HMAC-SHA256 med secret-en og sammenligner mot signaturen i
          headeren. Viktig: sammenligningen er{" "}
          <em>konstant-tid</em> for å unngå timing attacks.
        </p>
        <p>
          Kaster den en exception, returnerer vi 401. Kun om alt stemmer
          fortsetter vi med å prosessere event-en.
        </p>
      </>
    ),
  },
];

const processAnnotations: Annotation[] = [
  {
    line: 1,
    toLine: 4,
    title: "Plukk ut slug-adressen fra TO-lista",
    explanation: (
      <>
        <p>
          <code>eventData.to</code> er et array fordi en e-post kan ha flere
          mottakere. <code>extractInboundSlugEmail</code> finner den som
          ender på <code>@leads.akseptert.no</code>. Finnes ingen slik, er
          denne mailen ikke ment for oss — 404.
        </p>
      </>
    ),
  },
  {
    line: 6,
    toLine: 14,
    title: "Slå opp hvilken bruker adressen hører til",
    explanation: (
      <>
        <p>
          Siden hver bruker genererer sin egen inbound-adresse (
          <code>snekker-as@leads.akseptert.no</code>), er oppslaget deres «hvem
          eier denne adressen». Supabase query builder som vi så på forrige
          side.
        </p>
      </>
    ),
  },
  {
    line: 18,
    toLine: 25,
    title: "Pro-sjekk — inbound er en betalt feature",
    explanation: (
      <>
        <p>
          Etter brukeroppslag, verifiser at brukeren faktisk er Pro. Dette
          er en forretningsregel — feature-en er bak paywall. Returner 403
          hvis nei.
        </p>
        <p>
          <strong>Viktig:</strong> selv om noen skulle kjenne en annen
          brukers inbound-adresse og prøve å tvinge inn falske mailer, ville
          Svix-signaturen avvise dem før vi kom hit.
        </p>
      </>
    ),
  },
];

export default function WebhooksPage() {
  const { code, source, fullPath } = readAkseptertFile(
    "app/api/webhooks/resend-inbound/route.ts",
    RESEND_WEBHOOK_FALLBACK_VERIFY,
  );

  const verifySnippet =
    source === "live" ? sliceLines(code, 110, 159) : RESEND_WEBHOOK_FALLBACK_VERIFY;

  const processSnippet =
    source === "live"
      ? sliceLines(code, 177, 217)
      : RESEND_WEBHOOK_FALLBACK_PROCESS;

  return (
    <div>
      <SubPageHeader
        title="Webhook Pipeline"
        subtitle="2 · Avansert Magi"
        badge="Svix · HMAC · inbound"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
        lead={
          <>
            Når en Mittanbud-forespørsel treffer brukerens e-post, skjer en
            kjede av hendelser som ender med et ferdig tilbud i dashbordet.
            Vi går gjennom hele flyten — inkludert hvordan vi stopper
            forfalskede webhooks før de i det hele tatt kommer til databasen.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#hva" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Hva er en webhook?</a></li>
          <li><a href="#pipeline" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. Mittanbud-pipeline</a></li>
          <li><a href="#signering" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. Hvordan signering fungerer</a></li>
          <li><a href="#simulator" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. Svix-simulator</a></li>
          <li><a href="#verifisering" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. Verifiserings-koden</a></li>
          <li><a href="#prosess" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. Prosesseringen</a></li>
          <li><a href="#feller" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">7. Feller</a></li>
        </ul>
      </nav>

      <Section id="hva" step={1} title="Hva er en webhook?">
        <p>
          En webhook er rett og slett en HTTP POST som en ekstern tjeneste
          sender til <em>deg</em> når noe skjer. Du registrerer en URL hos
          dem, og de kaller den når en hendelse inntreffer.
        </p>

        <CompareTwoCols
          leftTitle="Vanlig API-kall"
          leftSubtitle="Du → dem"
          rightTitle="Webhook"
          rightSubtitle="De → deg"
          left={
            <>
              <p className="text-sm mb-2">
                <strong>Du polle-r.</strong> «Er det noe nytt?»
              </p>
              <CodeBlock
                language="ts"
                code={`// Hvert 10. minutt:
const res = await fetch(
  "https://resend.com/emails"
);
const emails = await res.json();
// Er det noe nytt siden sist?`}
              />
            </>
          }
          right={
            <>
              <p className="text-sm mb-2">
                <strong>De ringer deg.</strong> «Hei, noe nytt skjedde!»
              </p>
              <CodeBlock
                language="ts"
                code={`// app/api/webhooks/resend-inbound/route.ts
export async function POST(req) {
  const event = await req.json();
  // Prosesser hendelsen umiddelbart
  return Response.json({ received: true });
}`}
              />
            </>
          }
        />

        <Callout kind="kjernen" title="Hvorfor webhooks vinner">
          <p>
            Polling er ineffektivt: 144 kall/dag bare for å spørre om noe
            nytt. Webhooks er reaktive: null trafikk når ingenting skjer,
            umiddelbart varsel når noe gjør.
          </p>
          <p>
            Ulempen: du må eksponere en offentlig URL — som hvem som helst
            kan POSTe til. Derfor må webhooks ALLTID signeres.
          </p>
        </Callout>
      </Section>

      <Section
        id="pipeline"
        step={2}
        title="Mittanbud → Akseptert — hele kjeden"
        subtitle="Klikk et steg for å utvide detaljene."
      >
        <Sandbox title="Pipeline">
          <MittanbudPipeline />
        </Sandbox>

        <Callout kind="info" title="To webhook-hopp, ikke ett">
          <p>
            Legg merke til at det faktisk er to webhook-steg her:
          </p>
          <ol className="list-decimal pl-5 space-y-0.5 mt-1">
            <li>
              Mittanbud → brukerens e-post (SMTP, strengt tatt ikke webhook)
            </li>
            <li>
              Resend → Akseptert sin <code>/api/webhooks/resend-inbound</code>{" "}
              (ekte HTTP-webhook med Svix-signering)
            </li>
          </ol>
          <p className="mt-2">
            Den egentlige magien skjer i steg 5 — Resend er nemlig satt opp
            som MX-server for <code>leads.akseptert.no</code>-domenet, og
            transformerer e-post til HTTP-events.
          </p>
        </Callout>
      </Section>

      <Section
        id="signering"
        step={3}
        title="Hvordan webhook-signering fungerer"
        subtitle="HMAC-SHA256 i to minutter."
      >
        <p>
          HMAC er en måte å bevise at både <em>avsenderen</em> og{" "}
          <em>mottakeren</em> kjenner samme hemmelige nøkkel — uten at nøkkelen
          sendes over nettet. Ingen andre kan forfalske en gyldig signatur.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border border-red-400/40 bg-red-50/40 dark:bg-red-950/20 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-red-700 dark:text-red-300 mb-2">
              Hos avsenderen (Resend)
            </p>
            <ol className="list-decimal pl-5 text-xs space-y-1.5">
              <li>Bygger body som JSON.</li>
              <li>Henter sekvensen <code>id.timestamp.body</code>.</li>
              <li>Kjører HMAC-SHA256 med delt hemmelighet.</li>
              <li>Base64-encoder resultatet.</li>
              <li>Sender som <code>svix-signature</code>-header.</li>
            </ol>
          </div>
          <div className="rounded-xl border border-akseptert-400/40 bg-akseptert-50/40 dark:bg-akseptert-950/20 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-akseptert-700 dark:text-akseptert-300 mb-2">
              Hos mottakeren (Akseptert)
            </p>
            <ol className="list-decimal pl-5 text-xs space-y-1.5">
              <li>Leser body som rå tekst.</li>
              <li>Henter headerne <code>svix-id</code>, <code>svix-timestamp</code>, <code>svix-signature</code>.</li>
              <li>Bygger samme <code>id.timestamp.body</code>-sekvens.</li>
              <li>Kjører HMAC-SHA256 med samme hemmelighet.</li>
              <li>Sammenligner i konstant tid. Matcher? Trygg. Ellers 401.</li>
            </ol>
          </div>
        </div>

        <Callout kind="viktig" title="Hvorfor konstant-tid sammenligning?">
          <p>
            En naiv <code>a === b</code>-sammenligning kan avsløre informasjon
            gjennom hvor lang tid den bruker (timing attack). Biblioteker som
            Svix bruker bitvise sammenligninger som alltid tar samme tid
            uansett hvor raskt uoverensstemmelsen oppdages.
          </p>
          <p>
            Så kan du spørre: bytter ikke en angriper bare body og sender
            samme signatur? Jo — men siden signaturen avhenger av body-en,
            matcher den nye kombinasjonen ikke lenger. Det skal vi bevise
            neste.
          </p>
        </Callout>
      </Section>

      <Section
        id="simulator"
        step={4}
        title="Svix-simulator — prøv å lure signaturen"
        subtitle="Ekte HMAC-SHA256 computert i nettleseren din med Web Crypto API."
      >
        <Sandbox
          title="Svix Simulator"
          description="Først: trykk «Send» for å simulere at Resend signerer og leverer requesten. Så: trykk «Tamper» og «Verifisér» for å se hva som skjer hvis noen prøver å tukle med body-en etter at den er sendt."
        >
          <SvixSimulator />
        </Sandbox>

        <Callout kind="tips" title="Prøv også">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Endre secret-en på venstre side <strong>etter</strong> du har
              sendt. Verifiseringen feiler — angriper og mottaker bruker
              forskjellig nøkkel.
            </li>
            <li>
              Send først, legg til et ekstra mellomrom i payload-en, verifiser.
              Selv ett tegn i forskjell gir helt annen signatur.
            </li>
          </ul>
        </Callout>
      </Section>

      <Section
        id="verifisering"
        step={5}
        title="Ekte verifiseringskode fra route.ts"
        subtitle="Linje 110–159 i Akseptert sin resend-inbound-route."
      >
        <CodeWalkthrough
          code={verifySnippet}
          language="ts"
          title="app/api/webhooks/resend-inbound/route.ts"
          fullPath={fullPath}
          source={source}
          annotations={verifyAnnotations}
        />
      </Section>

      <Section
        id="prosess"
        step={6}
        title="Videre prosessering — etter signatur er OK"
        subtitle="Oppslag av bruker, pro-sjekk og fetching av full e-post."
      >
        <CodeWalkthrough
          code={processSnippet}
          language="ts"
          title="app/api/webhooks/resend-inbound/route.ts"
          fullPath={fullPath}
          source={source}
          annotations={processAnnotations}
        />

        <Callout kind="info" title="Event-type-gating">
          <p>
            Før noen av oppslagene i koden over, sjekker Akseptert:{" "}
            <code>if (event.type !== &quot;email.received&quot;) return NextResponse.json({`{ received: true }`});</code>
          </p>
          <p>
            Resend kan sende flere event-typer over samme URL — inkludert
            leverings-statuser. Vi returnerer 200 OK, men gjør ingenting.{" "}
            <strong>Viktig:</strong> returner ALLTID 200 på signerte events
            du ikke bryr deg om, ellers prøver Resend igjen og igjen.
          </p>
        </Callout>
      </Section>

      <Section id="feller" step={7} title="Fem feller med webhooks">
        <ol className="list-decimal pl-6 space-y-2 marker:text-akseptert-500">
          <li>
            <strong>Bruke <code>request.json()</code> i stedet for <code>request.text()</code></strong> —{" "}
            da ødelegges byte-ekvivalensen som HMAC-verifiseringen trenger.
            Alltid les body som streng, verifiser, så parse.
          </li>
          <li>
            <strong>Glemme å returnere 200 på ignorerte event-typer.</strong>{" "}
            Resend/Stripe/osv. retry-er aggressivt på ikke-2xx, og flooder
            serveren din.
          </li>
          <li>
            <strong>Gjøre treg arbeid synkront.</strong> Hvis webhook-handleren
            tar 30 sekunder, time-er avsenderen ut og retry-er. Bedre: sett i
            kø (Vercel Queues, en egen database-tabell, eller BullMQ), og
            returner 200 med en gang.
          </li>
          <li>
            <strong>Ikke idempotent.</strong> Den samme webhooken kan komme
            to ganger (nettverksproblemer hos avsenderen). Sjekk på{" "}
            <code>svix-id</code> eller event-id og ignorer duplikater, ellers
            oppretter du to tilbud for samme kunde.
          </li>
          <li>
            <strong>Skrive logikk som «når webhook kommer, sjekk om Stripe-abonnement er aktivt».</strong>{" "}
            Webhook-eventen har allerede hele dataen — ingen grunn til å
            ringe tilbake og polle Stripe igjen. Stol på payload-en (etter
            signaturverifisering).
          </li>
        </ol>
      </Section>

      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Link
          href="/akseptert/magi/supabase"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-akseptert-400/60 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Forrige</p>
          <p className="font-bold">Supabase Deep Dive</p>
        </Link>
        <Link
          href="/akseptert/magi/hooks"
          className="rounded-xl border-2 border-akseptert-400/40 bg-akseptert-50/50 dark:bg-akseptert-950/30 p-4 hover:border-akseptert-500 transition-colors"
        >
          <p className="text-xs text-akseptert-600 dark:text-akseptert-300">Neste →</p>
          <p className="font-bold">Advanced Hooks</p>
        </Link>
      </div>
    </div>
  );
}
