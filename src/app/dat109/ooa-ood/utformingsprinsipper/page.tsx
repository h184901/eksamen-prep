"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ooaOodPages, dat109BasePaths } from "@/lib/dat109-subpages";

/* ═══════════════════════════════════════════════
   SVG-helpers — gjenbrukes i flere eksempler
   ═══════════════════════════════════════════════ */

function ClassBox({
  x,
  y,
  name,
  attrs = [],
  w = 130,
  abstractClass = false,
}: {
  x: number;
  y: number;
  name: string;
  attrs?: string[];
  w?: number;
  abstractClass?: boolean;
}) {
  const headerH = 26;
  const lineH = 14;
  const bodyH = attrs.length * lineH + (attrs.length > 0 ? 10 : 4);
  const totalH = headerH + bodyH;
  const fill = abstractClass ? "#faf5ff" : "#f0fdf4";
  const stroke = abstractClass ? "#a855f7" : "#22c55e";
  const headerFill = abstractClass ? "#f3e8ff" : "#dcfce7";
  return (
    <g>
      <rect x={x} y={y} width={w} height={totalH} fill={fill} stroke={stroke} strokeWidth={1.5} rx={3} />
      <rect x={x} y={y} width={w} height={headerH} fill={headerFill} stroke={stroke} strokeWidth={1.5} rx={3} />
      <rect x={x + 0.75} y={y + headerH - 6} width={w - 1.5} height={6} fill={headerFill} />
      <line x1={x} y1={y + headerH} x2={x + w} y2={y + headerH} stroke={stroke} strokeWidth={1} />
      <text
        x={x + w / 2}
        y={y + headerH / 2 + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fontStyle={abstractClass ? "italic" : "normal"}
        fill="currentColor"
      >
        {abstractClass && <tspan fontSize={9} fontWeight={400}>{"«abstract» "}</tspan>}
        {name}
      </text>
      {attrs.map((a, i) => (
        <text key={i} x={x + 6} y={y + headerH + 14 + i * lineH} fontSize={10} fill="currentColor">
          {a}
        </text>
      ))}
    </g>
  );
}

/* ── Spesialisering: arv-pil med åpen trekant (superklasse → subklasser) ── */
function SpesialiseringDiagram() {
  return (
    <svg viewBox="0 0 420 240" className="w-full max-w-md mx-auto" role="img" aria-label="Spesialisering — Rute og subklasser">
      {/* Superklasse */}
      <ClassBox x={150} y={10} name="Rute" attrs={["navn"]} w={120} abstractClass />
      {/* Subklasser */}
      <ClassBox x={10} y={150} name="StartRute" w={120} />
      <ClassBox x={150} y={150} name="VanligRute" w={120} />
      <ClassBox x={290} y={150} name="FengselRute" w={120} />
      {/* Åpen trekant (arv-symbol) plassert under superklassen */}
      <line x1={210} y1={68} x2={210} y2={100} stroke="#22c55e" strokeWidth={1.5} />
      <polygon points="210,100 200,118 220,118" fill="white" stroke="#22c55e" strokeWidth={1.5} />
      {/* Horisontal samlebuss */}
      <line x1={70} y1={130} x2={350} y2={130} stroke="#22c55e" strokeWidth={1.5} />
      <line x1={210} y1={118} x2={210} y2={130} stroke="#22c55e" strokeWidth={1.5} />
      {/* Loddrette streker ned til hver subklasse */}
      <line x1={70} y1={130} x2={70} y2={150} stroke="#22c55e" strokeWidth={1.5} />
      <line x1={210} y1={130} x2={210} y2={150} stroke="#22c55e" strokeWidth={1.5} />
      <line x1={350} y1={130} x2={350} y2={150} stroke="#22c55e" strokeWidth={1.5} />
      {/* Etikett */}
      <text x={210} y={225} textAnchor="middle" fontSize={10} fill="currentColor" fontStyle="italic">
        «er-en» — åpen trekant peker mot superklassen
      </text>
    </svg>
  );
}

/* ── Komposisjon: fylt diamant — Brett ◆— Rute (1:40) ── */
function KomposisjonDiagram() {
  return (
    <svg viewBox="0 0 380 160" className="w-full max-w-md mx-auto" role="img" aria-label="Komposisjon — Brett og Rute">
      <ClassBox x={20} y={50} name="Brett" w={110} />
      <ClassBox x={240} y={50} name="Rute" attrs={["navn"]} w={120} />
      {/* Linje */}
      <line x1={130} y1={75} x2={240} y2={75} stroke="#22c55e" strokeWidth={1.5} />
      {/* Fylt diamant ved Brett-siden */}
      <polygon points="130,75 142,68 154,75 142,82" fill="#22c55e" stroke="#22c55e" strokeWidth={1.5} />
      {/* Multiplisitet */}
      <text x={158} y={70} fontSize={10} fill="currentColor">1</text>
      <text x={232} y={70} fontSize={10} fill="currentColor">40</text>
      <text x={190} y={140} textAnchor="middle" fontSize={10} fill="currentColor" fontStyle="italic">
        «består av» — fylt diamant ved helheten
      </text>
    </svg>
  );
}

/* ── Aggregering: åpen diamant — Spill ◇— Spiller ── */
function AggregeringDiagram() {
  return (
    <svg viewBox="0 0 380 160" className="w-full max-w-md mx-auto" role="img" aria-label="Aggregering — Spill og Spiller">
      <ClassBox x={20} y={50} name="Spill" w={110} />
      <ClassBox x={240} y={50} name="Spiller" attrs={["navn"]} w={120} />
      <line x1={130} y1={75} x2={240} y2={75} stroke="#22c55e" strokeWidth={1.5} />
      {/* Åpen diamant ved Spill-siden */}
      <polygon points="130,75 142,68 154,75 142,82" fill="white" stroke="#22c55e" strokeWidth={1.5} />
      <text x={158} y={70} fontSize={10} fill="currentColor">1</text>
      <text x={222} y={70} fontSize={10} fill="currentColor">2..*</text>
      <text x={190} y={140} textAnchor="middle" fontSize={10} fill="currentColor" fontStyle="italic">
        «har» — åpen diamant ved helheten
      </text>
    </svg>
  );
}

/* ── Tilstand som subklasser (FEIL) vs tilstand som assosiert hierarki/attributt (RIKTIG) ── */
function TilstandDiagram() {
  return (
    <svg viewBox="0 0 720 260" className="w-full mx-auto" role="img" aria-label="Tilstand — feil vs riktig modellering">
      {/* Venstre: FEIL — subklasser per tilstand */}
      <text x={170} y={18} textAnchor="middle" fontSize={12} fontWeight={700} fill="#ef4444">
        FEIL: subklasser per tilstand
      </text>
      <ClassBox x={120} y={30} name="Spiller" w={100} abstractClass />
      <ClassBox x={10} y={170} name="StilleSpiller" w={110} />
      <ClassBox x={130} y={170} name="KastendeSpiller" w={130} />
      <ClassBox x={270} y={170} name="DommendeSpiller" w={140} />
      {/* arv */}
      <line x1={170} y1={88} x2={170} y2={120} stroke="#ef4444" strokeWidth={1.5} />
      <polygon points="170,120 160,138 180,138" fill="white" stroke="#ef4444" strokeWidth={1.5} />
      <line x1={65} y1={150} x2={340} y2={150} stroke="#ef4444" strokeWidth={1.5} />
      <line x1={170} y1={138} x2={170} y2={150} stroke="#ef4444" strokeWidth={1.5} />
      <line x1={65} y1={150} x2={65} y2={170} stroke="#ef4444" strokeWidth={1.5} />
      <line x1={195} y1={150} x2={195} y2={170} stroke="#ef4444" strokeWidth={1.5} />
      <line x1={340} y1={150} x2={340} y2={170} stroke="#ef4444" strokeWidth={1.5} />

      {/* Høyre: RIKTIG — tilstand som assosiasjon eller enum */}
      <text x={560} y={18} textAnchor="middle" fontSize={12} fontWeight={700} fill="#22c55e">
        RIKTIG: tilstandshierarki som assosiasjon
      </text>
      <ClassBox x={460} y={50} name="Spiller" attrs={["navn"]} w={110} />
      <ClassBox x={620} y={50} name="SpillerTilstand" w={130} abstractClass />
      <line x1={570} y1={75} x2={620} y2={75} stroke="#22c55e" strokeWidth={1.5} />
      <text x={573} y={70} fontSize={10} fill="currentColor">1</text>
      <text x={605} y={70} fontSize={10} fill="currentColor">1</text>

      <ClassBox x={490} y={170} name="Stille" w={80} />
      <ClassBox x={580} y={170} name="Kaster" w={80} />
      <ClassBox x={670} y={170} name="Dømmer" w={80} />
      <line x1={685} y1={108} x2={685} y2={130} stroke="#22c55e" strokeWidth={1.5} />
      <polygon points="685,130 675,148 695,148" fill="white" stroke="#22c55e" strokeWidth={1.5} />
      <line x1={530} y1={160} x2={710} y2={160} stroke="#22c55e" strokeWidth={1.5} />
      <line x1={685} y1={148} x2={685} y2={160} stroke="#22c55e" strokeWidth={1.5} />
      <line x1={530} y1={160} x2={530} y2={170} stroke="#22c55e" strokeWidth={1.5} />
      <line x1={620} y1={160} x2={620} y2={170} stroke="#22c55e" strokeWidth={1.5} />
      <line x1={710} y1={160} x2={710} y2={170} stroke="#22c55e" strokeWidth={1.5} />
    </svg>
  );
}

/* ── Komposisjon over arv: Bil har Motor (riktig) vs Bil extends Motor (feil) ── */
function KomposisjonOverArvDiagram() {
  return (
    <svg viewBox="0 0 720 200" className="w-full mx-auto" role="img" aria-label="Komposisjon over arv — Bil og Motor">
      {/* FEIL */}
      <text x={170} y={18} textAnchor="middle" fontSize={12} fontWeight={700} fill="#ef4444">
        FEIL: Bil arver fra Motor
      </text>
      <ClassBox x={120} y={30} name="Motor" attrs={["effekt"]} w={100} />
      <ClassBox x={120} y={130} name="Bil" attrs={["modell"]} w={100} />
      <line x1={170} y1={102} x2={170} y2={115} stroke="#ef4444" strokeWidth={1.5} />
      <polygon points="170,115 160,130 180,130" fill="white" stroke="#ef4444" strokeWidth={1.5} />

      {/* RIKTIG */}
      <text x={520} y={18} textAnchor="middle" fontSize={12} fontWeight={700} fill="#22c55e">
        RIKTIG: Bil HAR en Motor
      </text>
      <ClassBox x={400} y={80} name="Bil" attrs={["modell"]} w={100} />
      <ClassBox x={580} y={80} name="Motor" attrs={["effekt"]} w={100} />
      <line x1={500} y1={105} x2={580} y2={105} stroke="#22c55e" strokeWidth={1.5} />
      <polygon points="500,105 512,98 524,105 512,112" fill="#22c55e" stroke="#22c55e" strokeWidth={1.5} />
      <text x={528} y={100} fontSize={10} fill="currentColor">1</text>
      <text x={572} y={100} fontSize={10} fill="currentColor">1</text>
    </svg>
  );
}

export default function UtformingsprinsipperPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/ooa-ood" className="hover:text-[var(--accent)]">OOA og OOD</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Utformingsprinsipper</span>
      </div>

      <DAT109SubNav basePath={dat109BasePaths.ooaOod} pages={ooaOodPages} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400">
            Del av oppgave 2 og 4
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            NY
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Utformingsprinsipper utover SOLID og GRASP</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          KISS, YAGNI, komposisjon vs aggregering vs spesialisering, arv vs komposisjon, og
          tilstandshierarki. Disse prinsippene er avgjørende for å forsvare designvalg på eksamen
          — særlig Atles regel om at <strong>domenemodellen normalt ikke skal bruke
          aggregering eller komposisjon</strong>, men spesialisering og vanlige assosiasjoner.
        </p>
      </div>

      {/* Atle-advarsel — øverst, krystallklar */}
      <div className="rounded-xl border-2 border-red-400/70 bg-red-50/70 dark:bg-red-950/30 p-5 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h2 className="font-bold text-base text-red-700 dark:text-red-400 mb-1">
              KRITISK professor-regel (Atle Geitung)
            </h2>
            <p className="text-sm text-neutral-800 dark:text-neutral-200">
              I <strong>domenemodellen</strong> skal du normalt <strong>IKKE</strong> bruke
              aggregering eller komposisjon. Bruk <strong>vanlige assosiasjoner med
              multiplisitet</strong>, og <strong>spesialisering (arv)</strong> der det er tydelige
              undertyper. Aggregering og komposisjon hører hjemme i <strong>utformingsmodell /
              DCD</strong>. Bruker du dem unødig i domenemodellen, kan det koste poeng.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SEKSJON 1: KISS
          ═══════════════════════════════════════════════════════ */}
      <TheorySummary
        title="1. KISS — Keep It Simple, Stupid"
        mustKnow={[
          "Definisjonen: enkleste løsning som dekker kravene vinner",
          "Hvorfor enkelhet slår «smart kode» i lengden (lesbarhet, vedlikehold)",
          "Eksempler på over-engineering du skal unngå",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Hva er KISS?</h3>
        <p>
          <strong>Keep It Simple, Stupid</strong> — den enkleste løsningen som faktisk løser
          problemet er nesten alltid den beste. Komplekse abstraksjoner, dype klassehierarkier
          og «smarte» triks gjør koden vanskeligere å lese, teste og endre.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">
            HVORFOR KISS vinner
          </h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>Lesbarhet:</strong> du leser kode 10× mer enn du skriver den.</li>
            <li><strong>Færre feil:</strong> hver ekstra linje er en mulig feil.</li>
            <li><strong>Lettere å teste:</strong> enkel kode har færre kant-tilfeller.</li>
            <li><strong>Lettere å endre:</strong> ny utvikler forstår koden uten 2 timers innføring.</li>
          </ul>
        </div>

        <h3 className="text-lg font-bold">Eksempel — over-engineered (BAD)</h3>
        <p>
          Du skal lage en metode som returnerer summen av to tall. Her er en
          «smart» løsning med strategi-mønster, fabrikker og abstrakte lag:
        </p>
        <pre className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded text-xs overflow-x-auto"><code>{`interface Operation { int apply(int a, int b); }
class AddOperation implements Operation { public int apply(int a, int b) { return a + b; } }
class OperationFactory {
    public static Operation create(String type) {
        if (type.equals("add")) return new AddOperation();
        throw new IllegalArgumentException();
    }
}
class Calculator {
    public int compute(String op, int a, int b) {
        return OperationFactory.create(op).apply(a, b);
    }
}
// Bruk:
new Calculator().compute("add", 2, 3);  // 5`}</code></pre>

        <h3 className="text-lg font-bold">Samme problem — KISS (GOOD)</h3>
        <pre className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded text-xs overflow-x-auto"><code>{`int sum(int a, int b) {
    return a + b;
}
// Bruk:
sum(2, 3);  // 5`}</code></pre>
        <p className="text-sm text-[var(--muted)] mt-2">
          Hvis du senere virkelig trenger flere operasjoner, så refaktorerer du dit. Ikke
          før.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <h4 className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">
            Når bryter vi KISS?
          </h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>Premature abstraction:</strong> abstrakt klasse for «én dag» et behov dukker opp.</li>
            <li><strong>«Smart» kode:</strong> bitvise triks der en enkel if-setning gjør jobben.</li>
            <li><strong>Konfigurasjonshelvete:</strong> alt er konfigurerbart, ingenting er konkret.</li>
            <li><strong>Dypt hierarki:</strong> 5+ nivåer med arv «for fremtidens skyld».</li>
          </ul>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════
          SEKSJON 2: YAGNI
          ═══════════════════════════════════════════════════════ */}
      <TheorySummary
        title="2. YAGNI — You Aren't Gonna Need It"
        mustKnow={[
          "Bygg KUN det kravene faktisk krever NÅ",
          "Forskjellen KISS vs YAGNI: KISS = enkel utforming, YAGNI = ikke bygg uten behov",
          "Hvorfor YAGNI er en naturlig følge av iterativ utvikling (Scrum, AUP, XP)",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Hva er YAGNI?</h3>
        <p>
          <strong>You Aren&apos;t Gonna Need It</strong> — XP-prinsippet (Extreme Programming):
          ikke implementer funksjonalitet før du faktisk trenger den. Det høres trivielt ut, men
          motsatt impuls («mens jeg er her, kan jeg jo legge til...») er en av de største
          kostnadsdriverne i programvare.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">
            HVORFOR YAGNI fungerer
          </h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>Du gjetter feil:</strong> 60–80 % av spekulative funksjoner brukes aldri.</li>
            <li><strong>Det koster å vedlikeholde:</strong> ubrukt kode må fortsatt testes, dokumenteres og oppdateres.</li>
            <li><strong>Kravene endrer seg:</strong> det du tror du trenger om 6 mnd er sannsynligvis utdatert da.</li>
            <li><strong>Iterativ utvikling fungerer best:</strong> bygg, mål, lær — ikke gjett.</li>
          </ul>
        </div>

        <h3 className="text-lg font-bold">Eksempel — brudd på YAGNI</h3>
        <p>
          Kravet er: «Brukere skal kunne logge inn med brukernavn og passord.» Du tenker
          «kanskje vi en dag trenger flere roller», og bygger:
        </p>
        <pre className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded text-xs overflow-x-auto"><code>{`enum Role { ADMIN, MODERATOR, EDITOR, VIEWER, GUEST }
class Permission { /* ... 30 linjer ... */ }
class RoleHierarchy { /* ... 50 linjer ... */ }
class User {
    String username;
    String password;
    Set<Role> roles;
    Set<Permission> extraPermissions;
}`}</code></pre>
        <p className="text-sm mt-2">
          Du har brukt 2 dager på roller-system ingen ber om. Når kravet endelig kommer
          (om det kommer), viser det seg at de trenger noe helt annet enn det du bygde.
        </p>

        <h3 className="text-lg font-bold">Samme krav — YAGNI</h3>
        <pre className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded text-xs overflow-x-auto"><code>{`class User {
    String username;
    String password;
}`}</code></pre>
        <p className="text-sm text-[var(--muted)] mt-2">
          Når kravet om roller faktisk kommer, vet du nøyaktig hva som trengs og kan bygge det
          riktig på første forsøk.
        </p>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2">
            Kobling til iterativ utvikling
          </h4>
          <p className="text-sm">
            YAGNI er hjørnesteinen i Scrum, XP og AUP. Du leverer en <em>minimal viable</em>
            løsning per sprint, får tilbakemelding fra produkteier, og bygger kun det neste
            verifiserte behovet krever. Spekulativ utvikling er <em>vannfall i forkledning</em>.
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <h4 className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">
            KISS vs YAGNI — to ulike spørsmål
          </h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-amber-300 dark:border-amber-700">
                <th className="text-left py-1.5">Prinsipp</th>
                <th className="text-left py-1.5">Spørsmål du stiller</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1.5 font-semibold">KISS</td>
                <td className="py-1.5">«Kan denne løsningen være enklere?»</td>
              </tr>
              <tr>
                <td className="py-1.5 font-semibold">YAGNI</td>
                <td className="py-1.5">«Trenger vi denne funksjonen i det hele tatt nå?»</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════
          SEKSJON 3: KOMPOSISJON vs AGGREGERING vs SPESIALISERING
          ═══════════════════════════════════════════════════════ */}
      <TheorySummary
        title="3. Komposisjon vs aggregering vs spesialisering"
        mustKnow={[
          "Spesialisering (åpen trekant): «er-en» — bruk i domenemodell ved tydelige undertyper",
          "Komposisjon (fylt diamant): sterk eier-relasjon, delene dør med helheten",
          "Aggregering (åpen diamant): svak «har»-relasjon, delene kan eksistere uten helheten",
          "Atles regel: I DOMENEMODELL — bruk vanlig assosiasjon + multiplisitet, ELLER spesialisering. Komposisjon/aggregering hører i utformingsmodell/DCD",
        ]}
      >
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">
            KRITISK — Atles regel for domenemodellen
          </h4>
          <p className="text-sm">
            <strong>Atle Geitung sier eksplisitt:</strong> i domenemodell skal du normalt
            <strong> ikke</strong> bruke aggregering eller komposisjon. Bruk vanlige
            assosiasjoner med multiplisitet, og spesialisering (arv) der subklassene faktisk er
            ulike. Komposisjon og aggregering hører hjemme i
            <strong> utformingsmodell og DCD (Design Class Diagram)</strong>.
          </p>
        </div>

        <h3 className="text-lg font-bold mt-2">De tre relasjonstypene — visuelt</h3>

        <div className="grid lg:grid-cols-3 gap-4 my-4">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-sm mb-2 text-purple-700 dark:text-purple-400">
              Spesialisering (arv)
            </h4>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-2 my-2 overflow-x-auto">
              <SpesialiseringDiagram />
            </div>
            <p className="text-xs">
              <strong>«er-en»</strong> · åpen trekant peker mot superklassen. Brukes i
              <strong> domenemodell</strong> når subklassen har ekstra attributter, ekstra
              assosiasjoner, eller annen oppførsel.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-sm mb-2 text-green-700 dark:text-green-400">
              Komposisjon
            </h4>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-2 my-2 overflow-x-auto">
              <KomposisjonDiagram />
            </div>
            <p className="text-xs">
              <strong>«består av»</strong> · fylt diamant ◆ ved helheten. Sterk eier-relasjon
              — delene <strong>dør med helheten</strong>. Mest brukt i
              <strong> utformingsmodell</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-sm mb-2 text-blue-700 dark:text-blue-400">
              Aggregering
            </h4>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-2 my-2 overflow-x-auto">
              <AggregeringDiagram />
            </div>
            <p className="text-xs">
              <strong>«har»</strong> · åpen diamant ◇ ved helheten. Svak relasjon — delene
              <strong> kan eksistere uten helheten</strong>. Også mest brukt i
              <strong> utformingsmodell</strong>.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold">Når bruker du hva?</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Spør deg selv</th>
                <th className="text-left py-2 pr-4 font-semibold">Svar</th>
                <th className="text-left py-2 font-semibold">Modell</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 pr-4">«Er X faktisk en spesialvariant av Y?»</td>
                <td className="py-2 pr-4">Ja</td>
                <td className="py-2"><strong>Spesialisering</strong> (i begge modeller)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">«Trenger systemet å huske en relasjon mellom dem?»</td>
                <td className="py-2 pr-4">Ja, men ingen sterk eier</td>
                <td className="py-2"><strong>Vanlig assosiasjon</strong> (domenemodell)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">«Forsvinner deler hvis helheten slettes?»</td>
                <td className="py-2 pr-4">Ja</td>
                <td className="py-2"><strong>Komposisjon</strong> (utformingsmodell)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">«Kan delen leve uten helheten?»</td>
                <td className="py-2 pr-4">Ja</td>
                <td className="py-2"><strong>Aggregering</strong> (utformingsmodell)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <h4 className="font-bold text-purple-700 dark:text-purple-400 text-sm mb-2">
            Praktisk konsekvens for eksamen
          </h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>I <strong>oppgave 1b (domenemodell)</strong>: bruk strek + multiplisitet og spesialisering. Lar du være å tegne diamanter er du på trygg grunn.</li>
            <li>I <strong>oppgave 4 (OOP / utformingsmodell)</strong>: her kan komposisjon (fylt diamant) og aggregering brukes når levetid og eierskap er relevant.</li>
            <li>Hvis du <em>må</em> bruke komposisjon i domenemodell (svært tydelig fysisk eierskap, f.eks. Brett ◆— Rute), så <strong>begrunn det</strong> i en kommentar.</li>
          </ul>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════
          SEKSJON 4: ARV vs KOMPOSISJON
          ═══════════════════════════════════════════════════════ */}
      <TheorySummary
        title="4. Arv vs komposisjon — «Favor composition over inheritance»"
        mustKnow={[
          "Når er arv riktig: ekte er-en med polymorfi og Liskov-utskiftbarhet",
          "Når er komposisjon bedre: har-en, mer fleksibelt, mindre kobling",
          "Klassisk regel: foretrekk komposisjon når du er i tvil",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Hvorfor er dette en regel?</h3>
        <p>
          Arv binder subklassen <em>tett</em> til superklassen — endrer du basisklassen, må alle
          subklasser tas med i betraktning. Komposisjon (X har en Y) gir løsere kobling og
          bytte av implementasjon på kjøretid. Derfor sier regelen:
          <strong> «Favor composition over inheritance»</strong> når du er i tvil.
        </p>

        <div className="my-4">
          <KomposisjonOverArvDiagram />
        </div>

        <h3 className="text-lg font-bold">Når er ARV riktig?</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Det er en <strong>ekte er-en relasjon</strong> (StartRute ER-EN Rute, Bil ER-EN Kjøretøy).</li>
          <li>Du trenger <strong>polymorfi</strong> — kalle samme metode på ulike subklasser med ulik oppførsel.</li>
          <li>Liskov-utskiftbarhet (LSP): hvor som helst en superklasse forventes, skal subklassen kunne brukes uten overraskelser.</li>
          <li>Klar konseptuell hierarki, ikke bare «koden ligner».</li>
        </ul>

        <h3 className="text-lg font-bold mt-4">Når er KOMPOSISJON bedre?</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Det er en <strong>har-en relasjon</strong> (Bil HAR en Motor).</li>
          <li>Du vil bytte ut implementasjonen på kjøretid (strategi-mønster).</li>
          <li>Du trenger funksjonalitet fra flere kilder (Java støtter ikke multippel arv).</li>
          <li>Du vil unngå skjør basisklasse — endringer i Motor skal ikke knekke Bil.</li>
        </ul>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2">
            Eksempel fra Monopol
          </h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><strong>Riktig arv:</strong> <code>StartRute</code>, <code>VanligRute</code>, <code>SkjøteRute</code> ER-ALLE en <code>Rute</code>. Polymorf <code>landetPå(Spiller)</code> oppfører seg ulikt per subklasse.</li>
            <li><strong>Riktig komposisjon:</strong> <code>Kopp</code> HAR <code>Terning</code>er — ingen er-en relasjon mellom dem. Terninger forsvinner ikke om koppen forsvinner (aggregering er strengt tatt enda mer presist), men prinsippet står: bruk komposisjon, ikke arv.</li>
            <li><strong>Feil arv (anti-eksempel):</strong> <code>Bil extends Motor</code>. En bil ER ikke en motor — den HAR en.</li>
          </ul>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════
          SEKSJON 5: TILSTANDSHIERARKI
          ═══════════════════════════════════════════════════════ */}
      <TheorySummary
        title="5. Tilstandshierarki — alternativ til subklasser-for-tilstand"
        mustKnow={[
          "Du skal IKKE lage subklasser for å representere ulike tilstander av samme objekt",
          "Bruk i stedet enum/tilstand-attributt eller eget tilstandshierarki som assosieres",
          "Tilstandsdiagram (UML state machine) er ofte enda klarere enn klassediagram for dette",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Problemet</h3>
        <p>
          Et objekt har ofte ulike <em>tilstander</em> — en spiller kan være stille, kaste
          terningen, eller dømme. Naivt kan du tenke at du lager én subklasse per tilstand:
          <code> StilleSpiller</code>, <code>KastendeSpiller</code>, <code>DømmendeSpiller</code>.
          <strong> Det er feil.</strong>
        </p>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">
            HVORFOR tilstand ikke skal være subklasser
          </h4>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>Et objekt skifter tilstand <em>over tid</em> — men du kan ikke skifte klasse på et objekt.</li>
            <li>Identiteten til spilleren forsvinner: er &laquo;Erlend som kaster terning&raquo; et nytt objekt?</li>
            <li>Du dupliserer attributter (navn, penger) i alle subklasser.</li>
            <li>Bryter Liskov: en KastendeSpiller er ikke utskiftbar med en StilleSpiller i alle kontekster.</li>
          </ul>
        </div>

        <div className="my-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-2 overflow-x-auto">
            <TilstandDiagram />
          </div>
        </div>

        <h3 className="text-lg font-bold">Riktige løsninger</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>
            <strong>Enum-attributt:</strong> <code>Spiller</code> har feltet
            <code> tilstand: SpillerTilstand</code> der <code>SpillerTilstand</code> er en
            <em> enum</em> med verdiene <code>STILLE</code>, <code>KASTER</code>, <code>DØMMER</code>.
            Enkel, KISS-vennlig, fungerer i 80 % av tilfellene.
          </li>
          <li>
            <strong>Tilstandshierarki som assosiasjon:</strong> <code>Spiller</code> har en
            referanse til en <code>SpillerTilstand</code>-klasse, og det finnes et hierarki av
            tilstandsklasser. Dette er <em>State pattern</em> — egnet når hver tilstand har
            kompleks oppførsel.
          </li>
          <li>
            <strong>UML tilstandsdiagram:</strong> dokumenter overgangene (<em>events</em>) og
            betingelsene som ligger bak — ofte tydeligere enn et klassediagram.
          </li>
        </ol>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════
          SEKSJON 6: RESULTATER
          ═══════════════════════════════════════════════════════ */}
      <TheorySummary
        title="6. Resultater av gode utformingsprinsipper"
        mustKnow={[
          "Mer forståelig kode (lesbarhet, færre overraskelser)",
          "Mer fleksibel kode (utvidbar, lett å bytte deler)",
          "Mer vedlikeholdbar kode (lav kobling, høy kohesjon)",
          "Mer testbar kode (deler kan isoleres og mockes)",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Målet med ALLE prinsippene</h3>
        <p>
          KISS, YAGNI, komposisjon over arv, tilstandshierarki, SOLID og GRASP er ikke
          regler for regelens skyld. De er <em>metoder</em> for å oppnå fire egenskaper:
        </p>

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-1">Forståelig</h4>
            <p className="text-xs">
              Ny utvikler leser koden, og forstår hva og hvorfor — uten å spørre. KISS
              direkte, men også SRP (én ting per klasse) bidrar.
            </p>
          </div>
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
            <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-1">Fleksibel</h4>
            <p className="text-xs">
              Endring i krav medfører endring i lite, lokalisert kode. Komposisjon over arv
              og DIP (avhengig av abstraksjoner) er nøkkelen.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 text-sm mb-1">Vedlikeholdbar</h4>
            <p className="text-xs">
              Lav kobling og høy kohesjon (GRASP) gjør at en feilretting ett sted ikke
              skaper feil et annet. YAGNI hjelper ved å unngå død kode.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
            <h4 className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-1">Testbar</h4>
            <p className="text-xs">
              Avhengigheter via interface (DIP) lar deg mocke. Små klasser (SRP) er enklere
              å dekke med enhetstester.
            </p>
          </div>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════
          SEKSJON 7: SAMMENHENG MED SOLID/GRASP
          ═══════════════════════════════════════════════════════ */}
      <TheorySummary
        title="7. Sammenheng med SOLID og GRASP"
      >
        <p>
          Småprinsippene står ikke alene — de støtter de store mønstrene:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Prinsipp</th>
                <th className="text-left py-2 pr-4 font-semibold">Støtter</th>
                <th className="text-left py-2 font-semibold">Hvorfor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 pr-4 font-medium">KISS</td>
                <td className="py-2 pr-4">SRP, High Cohesion</td>
                <td className="py-2">Enkle klasser har naturlig ett ansvar.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">YAGNI</td>
                <td className="py-2 pr-4">OCP</td>
                <td className="py-2">Du endrer ikke det som ikke finnes — utvider når du trenger.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Komposisjon over arv</td>
                <td className="py-2 pr-4">LSP, DIP, Low Coupling</td>
                <td className="py-2">Avhengighet mot interface, ikke konkret klasse.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Tilstandshierarki</td>
                <td className="py-2 pr-4">Polymorfi, OCP</td>
                <td className="py-2">Ny tilstand = ny klasse, ingen endring i Spiller.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Spesialisering i domene</td>
                <td className="py-2 pr-4">Polymorfi, Information Expert</td>
                <td className="py-2">Subklassen vet best hva som skjer når noen lander på den.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">
            Eksamenstips
          </h4>
          <p className="text-sm">
            På spørsmål om designvalg: nevn alltid <strong>hvilket prinsipp</strong> du bygger
            på, og <strong>hva alternativet</strong> ville vært. Eksempel: «Jeg valgte
            komposisjon her (Bil HAR Motor) framfor arv (Bil arver Motor) for å holde lav
            kobling og følge LSP — en bil er ikke en motor, så arv ville vært semantisk feil.»
          </p>
        </div>
      </TheorySummary>

      {/* Pensum-kilder */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-5 mt-8">
        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
          Hentet fra
        </h3>
        <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
          <li>• F06 — Mer om utformingsprinsipper, UML og OOAD — Monopol (slides 70–126)</li>
          <li>• F15 — AUP, overføring og testing og mer om utformingsprinsipper</li>
          <li>• F16 — Oppsummering og eksamen (slides 13, 17, 18 om KISS og YAGNI)</li>
          <li>• Atle Geitungs muntlige regel om aggregering/komposisjon i domenemodell</li>
        </ul>
      </div>

      {/* Related links */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 mt-4">
        <h3 className="font-bold text-sm mb-3">Relaterte sider</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dat109/ooa-ood/solid"
            className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
          >
            SOLID-prinsippene
          </Link>
          <Link
            href="/dat109/ooa-ood/grasp"
            className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
          >
            GRASP-mønstrene
          </Link>
          <Link
            href="/dat109/ooa-ood/oop-fundamenter"
            className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
          >
            OOP-fundamenter
          </Link>
          <Link
            href="/dat109/modellering/domene"
            className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
          >
            Domenemodell
          </Link>
        </div>
      </div>
    </div>
  );
}
