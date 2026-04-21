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
import RaceConditionDemo from "@/components/akseptert/RaceConditionDemo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const USEACCESS_FALLBACK_EFFECT = `useEffect(() => {
    if (!isLoaded || !user) {
      if (!user) setProfileFromDb(null);
      return;
    }
    let cancelled = false;
    getProfile().then((res) => {
      if (cancelled || !res.ok) return;
      setProfileFromDb({
        is_pro: res.is_pro,
        stripe_customer_id: res.stripe_customer_id,
        scans_remaining: res.scans_remaining,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [isLoaded, user?.id]);`;

const USEACCESS_FALLBACK_CALLBACK = `const grantPro = useCallback(
    (customerId?: string, currentPeriodEnd?: number) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(PRO_STORAGE_KEY, "1");
        if (customerId) {
          localStorage.setItem(STRIPE_CUSTOMER_KEY, customerId);
          setStripeCustomerId(customerId);
        }
        if (currentPeriodEnd) {
          localStorage.setItem(NEXT_BILLING_KEY, String(currentPeriodEnd));
          setNextBillingDate(new Date(currentPeriodEnd * 1000));
        }
      }
    },
    [],
  );`;

const effectAnnotations: Annotation[] = [
  {
    line: 1,
    title: "Effekten som synkroniserer DB-profil",
    explanation: (
      <p>
        Hver gang Clerk er ferdig med å laste eller brukeren endrer seg, kjører
        vi denne effekten for å hente profilen fra Supabase og oppdatere local
        React-state.
      </p>
    ),
  },
  {
    line: 2,
    toLine: 5,
    title: "Tidlig retur når ingenting å gjøre",
    explanation: (
      <>
        <p>
          Hvis Clerk ikke er lastet enda, eller ingen bruker er logget inn,
          avbryt. Hvis bruker ble utlogget, tøm profilen først.
        </p>
        <p>
          Effekten returnerer ingen cleanup her, så React vet det er trygt
          å bare avslutte.
        </p>
      </>
    ),
  },
  {
    line: 6,
    title: "«cancelled»-flagget — stjernen i showet",
    explanation: (
      <>
        <p>
          Dette er det klassiske cleanup-mønsteret for asynkrone effekter.
          Variabelen holdes i closure-scopet til både then-callbacken og
          cleanup-funksjonen. Settes den til <code>true</code> før{" "}
          <code>getProfile</code> rekker å svare, vet vi at dette svaret er
          utdatert.
        </p>
      </>
    ),
  },
  {
    line: 7,
    toLine: 14,
    title: "Async-then med tidlig retur på cancel",
    explanation: (
      <>
        <p>
          Når <code>getProfile()</code> resolver, sjekker vi{" "}
          <code>cancelled</code> først. Er vi stale, ikke rør state i det
          hele tatt.
        </p>
        <p>
          Uten dette kunne brukeren skiftet konto før svaret kom, og vi
          hadde skrevet den <em>gamle</em> brukerens is_pro-status inn i
          state for den <em>nye</em> brukeren. Klassisk race condition.
        </p>
      </>
    ),
  },
  {
    line: 15,
    toLine: 17,
    title: "Cleanup-funksjonen",
    explanation: (
      <>
        <p>
          React kaller denne <em>før</em> effekten kjøres på nytt, og når
          komponenten fjernes. Her setter vi flagget og signaliserer at
          pågående async-arbeid ikke lenger er relevant.
        </p>
        <p>
          Merk: vi avbryter ikke selve fetch-en. Den kan fortsatt fullføre
          på nettverket — vi bare ignorerer svaret. For å faktisk avbryte
          trenger man <code>AbortController</code>.
        </p>
      </>
    ),
  },
  {
    line: 18,
    title: "Dependency-array: [isLoaded, user?.id]",
    explanation: (
      <>
        <p>
          Effekten re-kjøres hver gang <code>isLoaded</code> eller{" "}
          <code>user?.id</code> endres. Ikke <code>user</code>-objektet
          i seg selv — det kan være nytt referansemessig uten at id-en er
          det, og da ville vi fetchet unødvendig.
        </p>
        <p>
          ESLint-regelen <code>react-hooks/exhaustive-deps</code> er nyttig
          men ikke ufeilbar. Av og til må du ignorere den bevisst.
        </p>
      </>
    ),
  },
];

const callbackAnnotations: Annotation[] = [
  {
    line: 1,
    toLine: 2,
    title: "useCallback med tom dependency-array",
    explanation: (
      <>
        <p>
          <code>useCallback(fn, [])</code> memoiserer funksjonen én gang.
          Den returnerer samme referanse ved hver render. Hvorfor viktig?
          Fordi hvis denne funksjonen sendes som prop til en barnekomponent
          som bruker <code>React.memo</code>, unngår barnet å re-rendre
          når foreldren re-rendrer.
        </p>
      </>
    ),
  },
  {
    line: 3,
    toLine: 5,
    title: "«window» finnes ikke på serveren",
    explanation: (
      <>
        <p>
          <code>typeof window !== &quot;undefined&quot;</code> er en klassisk
          SSR-guard. useAccess er en client hook, men React 19 / Next.js
          kan fortsatt evaluere toppen av modulen på serveren. Å aksessere
          <code>localStorage</code> der krasjer.
        </p>
      </>
    ),
  },
  {
    line: 6,
    toLine: 14,
    title: "Oppdater både localStorage og state",
    explanation: (
      <>
        <p>
          Parallelle datakilder — det er dobbelarbeid men gir to fordeler:
        </p>
        <ul className="list-disc pl-5 space-y-0.5 mt-1">
          <li>
            <strong>localStorage</strong> persisterer på tvers av sidelastinger.
          </li>
          <li>
            <strong>React state</strong> trigger re-render nå med en gang.
          </li>
        </ul>
      </>
    ),
  },
  {
    line: 15,
    title: "Dependency array må være tom her",
    explanation: (
      <>
        <p>
          Tom array betyr: funksjonen har ingen eksterne verdier den bruker.
          Den leser bare argumentene og setter via stabile setters (
          <code>setStripeCustomerId</code> og <code>setNextBillingDate</code>{" "}
          er garantert stabile av React).
        </p>
        <p>
          Hadde den brukt en state-variabel direkte (f.eks.{" "}
          <code>console.log(stripeCustomerId)</code>), måtte den variabelen
          vært i dependency-array-en — ellers ville funksjonen bruke en
          <em>gammel</em> verdi (stale closure).
        </p>
      </>
    ),
  },
];

export default function AdvancedHooksPage() {
  const { code, source, fullPath } = readAkseptertFile(
    "hooks/useAccess.ts",
    USEACCESS_FALLBACK_EFFECT,
  );

  const effectSnippet =
    source === "live" ? sliceLines(code, 57, 74) : USEACCESS_FALLBACK_EFFECT;

  const callbackSnippet =
    source === "live" ? sliceLines(code, 76, 91) : USEACCESS_FALLBACK_CALLBACK;

  return (
    <div>
      <SubPageHeader
        title="Advanced Hooks"
        subtitle="3 · Avansert Magi"
        badge="useEffect · useCallback"
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l5 16L13 10l7-2z" />
          </svg>
        }
        lead={
          <>
            Enkle hooks får du kjapt taket på. Det virkelig vanskelige er
            hva som skjer når async-arbeid møter React sin re-render-syklus.
            Vi bruker Akseptert sin <code>useAccess</code> som levende case.
          </>
        }
      />

      <nav className="mb-10 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          På denne siden
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <li><a href="#hva" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">1. Hva useAccess gjør</a></li>
          <li><a href="#race" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">2. Race condition live</a></li>
          <li><a href="#cleanup" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">3. Cleanup-mønsteret</a></li>
          <li><a href="#callback" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">4. useCallback</a></li>
          <li><a href="#stale" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">5. Stale closure</a></li>
          <li><a href="#regler" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">6. Reglene i én tabell</a></li>
          <li><a href="#java" className="hover:text-akseptert-600 dark:hover:text-akseptert-300">7. Sammenligning til Java</a></li>
        </ul>
      </nav>

      <Section id="hva" step={1} title="Hva useAccess gjør">
        <p>
          <code>useAccess</code> er en custom hook som Akseptert bruker for å
          svare på spørsmålet: «Har denne brukeren tilgang til scanner-
          funksjonen akkurat nå?». Den kombinerer data fra tre kilder:
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-akseptert-500">
          <li>
            <strong>Clerk</strong> — er brukeren logget inn?
          </li>
          <li>
            <strong>Supabase profiles-tabellen</strong> — er de Pro, og hvor
            mange scans har de igjen?
          </li>
          <li>
            <strong>localStorage</strong> — optimistisk mellomlager som oppdateres
            umiddelbart ved oppgradering.
          </li>
        </ul>

        <Callout kind="kjernen" title="Custom hooks er bare funksjoner">
          <p>
            En custom hook er en vanlig funksjon hvor navnet starter med
            <code> use</code>, og som kan kalle andre hooks inni. Returnerer
            hva du vil — ofte et objekt med state + setters.
          </p>
          <p>
            Fordelen: gjenbruk av stateful logikk på tvers av komponenter,
            uten arv eller høyere ordens komponenter.
          </p>
        </Callout>

        <CodeBlock
          language="tsx"
          code={`// Slik brukes den i en komponent:
function Dashboard() {
  const { isPro, scansRemaining, canAccessScanner } = useAccess();

  if (!canAccessScanner) return <UpgradeModal />;
  return <Scanner />;
}`}
        />
      </Section>

      <Section
        id="race"
        step={2}
        title="Race condition live — klikk brukerne raskt"
        subtitle="Samme mock-data, to useEffect-implementasjoner. Se forskjellen."
      >
        <Sandbox
          title="Race Condition"
          description="Klikk Alice først (2.2s latency), så raskt Bob eller Carol. Se hva 'uten cleanup'-siden til slutt viser — og merk at den er feil."
        >
          <RaceConditionDemo />
        </Sandbox>

        <Callout kind="viktig" title="Det du bør se">
          <p>
            På venstre side kan UI-et ende opp med å vise Alice sin profil
            selv om du har valgt Carol — fordi Alices (tregere) svar kommer
            sist. På høyre side ignoreres Alices svar fordi{" "}
            <code>cancelled</code> er satt før det kommer tilbake.
          </p>
          <p>
            Dette er ikke et hypotetisk problem. Jeg (som skrev denne
            koden) har bommet på det selv i gamle PR-er — det er grunnen
            til at <code>cancelled</code>-flagget er i{" "}
            <code>useAccess</code>.
          </p>
        </Callout>
      </Section>

      <Section
        id="cleanup"
        step={3}
        title="Cleanup-mønsteret i useAccess"
        subtitle="Linje 57–74 av hooks/useAccess.ts, live fra repoet."
      >
        <CodeWalkthrough
          code={effectSnippet}
          language="tsx"
          title="hooks/useAccess.ts — effekt"
          fullPath={fullPath}
          source={source}
          annotations={effectAnnotations}
        />

        <Callout kind="tips" title="AbortController hadde vært enda bedre">
          <p>
            <code>cancelled</code>-flagget gjør at vi <em>ignorerer</em> svaret,
            men fetch-en selv fortsetter å bruke båndbredde. For store requests
            bør man bruke <code>AbortController</code>:
          </p>
          <CodeBlock
            language="tsx"
            code={`useEffect(() => {
  const controller = new AbortController();
  fetch("/api/profile", { signal: controller.signal })
    .then((r) => r.json())
    .then(setProfile)
    .catch((e) => {
      if (e.name === "AbortError") return; // forventet
      console.error(e);
    });
  return () => controller.abort();
}, [userId]);`}
          />
          <p>
            I useAccess kaller vi en Server Action (getProfile), ikke fetch
            direkte — Server Actions har ikke like ren støtte for abort, så
            cancelled-flagget er den praktiske løsningen.
          </p>
        </Callout>
      </Section>

      <Section
        id="callback"
        step={4}
        title="useCallback — stabile funksjonsreferanser"
        subtitle="Linje 76–91 av useAccess."
      >
        <CodeWalkthrough
          code={callbackSnippet}
          language="tsx"
          title="hooks/useAccess.ts — grantPro"
          fullPath={fullPath}
          source={source}
          annotations={callbackAnnotations}
        />

        <CompareTwoCols
          leftTitle="Uten useCallback"
          leftSubtitle="Ny funksjon hver render"
          rightTitle="Med useCallback"
          rightSubtitle="Samme referanse"
          left={
            <CodeBlock
              language="tsx"
              code={`function useAccess() {
  // Ny funksjon hver gang komponenten rendrer
  const grantPro = (id) => { /* ... */ };
  return { grantPro };
}

// Barn som får grantPro som prop:
const MemoChild = memo(Child);
// MemoChild re-rendrer likevel
// fordi grantPro er en ny referanse`}
            />
          }
          right={
            <CodeBlock
              language="tsx"
              code={`function useAccess() {
  const grantPro = useCallback(
    (id) => { /* ... */ },
    [] // ingen dependencies → alltid samme fn
  );
  return { grantPro };
}

// MemoChild får samme grantPro hver gang,
// så den hopper over re-render`}
            />
          }
        />

        <Callout kind="info" title="Ikke optimiser før du trenger det">
          <p>
            <code>useCallback</code> koster litt i seg selv — React må spore
            dependencies og sammenligne. Hvis ingen barn bruker{" "}
            <code>React.memo</code>, er det som regel sløsing.
          </p>
          <p>
            React 19 har <code>useEvent</code> (eller kompilator-drevne
            optimaliseringer som <code>react-compiler</code>) som gjør
            useCallback nesten overflødig. Men inntil de tilnærmingene er
            vanlig, er det fortsatt nyttig å kunne.
          </p>
        </Callout>
      </Section>

      <Section
        id="stale"
        step={5}
        title="Stale closure — den snikende bug-en"
      >
        <p>
          En closure «fryser» variabler den leste da funksjonen ble laget.
          I useEffect og useCallback betyr det at hvis du bruker state i
          funksjonen, er det den <em>gamle</em> verdien — med mindre variabelen
          er med i dependency-array-en.
        </p>

        <CodeBlock
          language="tsx"
          code={`function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Stale closure — count er alltid 0 inni intervallet
  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // logger 0 for alltid
      setCount(count + 1); // setter alltid til 1
    }, 1000);
    return () => clearInterval(id);
  }, []); // tom array → effekten kjører aldri på nytt

  return <p>{count}</p>;
}`}
        />

        <p>To måter å fikse det:</p>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              Fix 1: Legg til i dependency-array-en
            </p>
            <CodeBlock
              language="tsx"
              code={`useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]);
// ✓ men lager nytt intervall
// hver gang count endrer seg`}
            />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
              Fix 2: Funksjonell setter
            </p>
            <CodeBlock
              language="tsx"
              code={`useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);
    // ^^^ bruker alltid siste verdi
  }, 1000);
  return () => clearInterval(id);
}, []);
// ✓ ett intervall, alltid fresh`}
            />
          </div>
        </div>

        <Callout kind="felle" title="ESLint kan hjelpe">
          <p>
            Regelen <code>react-hooks/exhaustive-deps</code> klager hvis du
            bruker noe i effekten som ikke er i dependency-array-en. Den er
            ikke ufeilbar — av og til vil du bevisst ignorere den — men som
            defaultanbefaling er det verdt å stole på den.
          </p>
        </Callout>
      </Section>

      <Section id="regler" step={6} title="Reglene for hooks — i én tabell">
        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
          <table className="min-w-full text-sm">
            <thead className="bg-akseptert-500/10">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Regel</th>
                <th className="px-3 py-2 text-left font-semibold">Hva som skjer om du bryter den</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Bare kall hooks på toppnivå</td>
                <td className="px-3 py-2">Rekkefølgen endrer seg mellom renders → React mister sporet av hvilken state hører hvor</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Bare kall hooks i React-komponenter eller andre hooks</td>
                <td className="px-3 py-2">Hooks utenfor React-konteksten har ingen state å henge seg på</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Async effekter: cleanup eller AbortController</td>
                <td className="px-3 py-2">Race condition: gamle svar overskriver nye</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Alle brukte verdier i dependency-array-en</td>
                <td className="px-3 py-2">Stale closure: funksjonen bruker utdaterte verdier</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Ikke set-state under render</td>
                <td className="px-3 py-2">Infinite loop: render → setState → render → setState …</td>
              </tr>
              <tr className="border-t border-[var(--card-border)]">
                <td className="px-3 py-2">Custom hooks starter med «use»</td>
                <td className="px-3 py-2">ESLint og React-verktøy kjenner dem ikke igjen som hooks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="java" step={7} title="Hva er Java-ekvivalenten?">
        <p>
          Det finnes ingen direkte ekvivalent — React-komponenter har en helt
          annen livssyklus enn Spring-beans. Men noen bilder kan hjelpe:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 marker:text-akseptert-500">
          <li>
            <strong>useEffect</strong> med <code>[]</code> ≈{" "}
            <code>@PostConstruct</code>. Returnere-cleanup ≈{" "}
            <code>@PreDestroy</code>.
          </li>
          <li>
            <strong>useState</strong> ≈ en felt-variabel — men bevares over
            mange «runs» av samme metode.
          </li>
          <li>
            <strong>Race condition med async</strong> ≈ Java-asyncronisering
            med <code>CompletableFuture</code> der du glemmer å sjekke om
            noen har cancellert.
          </li>
          <li>
            <strong>Stale closure</strong> finnes knapt i Java fordi alt du
            leser er «final» i en lambda — det er den eksplisitte måten å
            gjøre det samme.
          </li>
        </ul>

        <Callout kind="kjernen" title="Oppsummering">
          <p>
            Avanserte hooks handler om å mestre tre ting: React sin render-
            syklus, closures sin lukking av variabler, og asynkronisering.
            Når de tre møtes i én <code>useEffect</code>, er det der bug-ene
            bor. <code>cancelled</code>-flagget i <code>useAccess</code> er
            Akseptert sin respons på nettopp det.
          </p>
        </Callout>
      </Section>

      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Link
          href="/akseptert/magi/webhooks"
          className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-akseptert-400/60 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Forrige</p>
          <p className="font-bold">Webhook Pipeline</p>
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
