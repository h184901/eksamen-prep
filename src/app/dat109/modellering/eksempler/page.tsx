"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { modelleringPages, dat109BasePaths } from "@/lib/dat109-subpages";
import {
  UseCaseMonopol,
  DomainMonopol,
  SequenceMonopol,
  UseCaseStigespill,
  SequenceStigespill,
  UseCaseEksamen,
  DomainEksamen,
  UseCaseMaxMummelmann,
  DomainMaxMummelmann,
  SequenceMaxMummelmann,
} from "@/components/dat109/UmlDiagrams";
import {
  DomainMonopolIter1,
  DomainMonopolIter2,
  DomainStigespillIter1,
  DomainStigespillIter2,
  UseCaseStigespillIter2,
  SequenceStigespillSeksere,
  UseCaseBilutleie,
  DomainBilutleie,
  SequenceBilutleie,
  UseCaseSkyjo,
  DomainSkyjo,
  SequenceSkyjo,
  UseCaseGanzSchonClever,
  DomainGanzSchonClever,
  SequenceGanzSchonClever,
} from "@/components/dat109/UmlDiagramsExtra";

/* ═══════════════════════════════════════════════════════════
   Små UI-byggeklosser brukt på siden
   ═══════════════════════════════════════════════════════════ */

function CaseHeader({
  number,
  title,
  subtitle,
  source,
  weight,
  difficulty,
}: {
  number: number;
  title: string;
  subtitle: string;
  source: string;
  weight: string;
  difficulty: "Lett" | "Middels" | "Krevende";
}) {
  const diffColor =
    difficulty === "Lett"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : difficulty === "Middels"
      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

  return (
    <div className="rounded-2xl border border-sysdev-300 dark:border-sysdev-700 bg-gradient-to-br from-sysdev-50 to-white dark:from-sysdev-950/70 dark:to-neutral-950/60 p-6 my-10">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sysdev-500 text-white text-lg font-bold shrink-0">
          {number}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-200 border border-[var(--card-border)]">
              {source}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-200 border border-[var(--card-border)]">
              {weight}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${diffColor}`}>
              {difficulty}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">
            CASE {number}: {title}
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-200">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function Note({
  variant,
  title,
  children,
}: {
  variant: "tip" | "warn" | "exam" | "atle";
  title: string;
  children: React.ReactNode;
}) {
  const map = {
    tip: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-300 dark:border-blue-700",
      title: "text-blue-700 dark:text-blue-300",
    },
    warn: {
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-300 dark:border-red-700",
      title: "text-red-700 dark:text-red-300",
    },
    exam: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-300 dark:border-amber-700",
      title: "text-amber-700 dark:text-amber-300",
    },
    atle: {
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-300 dark:border-purple-700",
      title: "text-purple-700 dark:text-purple-300",
    },
  } as const;
  const c = map[variant];
  return (
    <div className={`rounded-lg border ${c.border} ${c.bg} p-4 my-4`}>
      <h4 className={`font-bold text-sm mb-2 ${c.title}`}>{title}</h4>
      <div className="text-sm text-neutral-800 dark:text-neutral-100 space-y-2 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function DiagramFrame({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-6 rounded-xl border border-[var(--card-border)] bg-white/70 dark:bg-neutral-950/70 p-4">
      <div className="overflow-x-auto">{children}</div>
      <figcaption className="mt-3 text-xs text-center text-neutral-700 dark:text-neutral-300 italic">
        {caption}
      </figcaption>
    </figure>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-[var(--card-border)] bg-neutral-950">
      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800">
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide">
          {language}
        </span>
      </div>
      <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed text-neutral-100 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function IterationBadge({ n, label }: { n: number; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sysdev-100 dark:bg-sysdev-900/40 text-sysdev-700 dark:text-sysdev-300 text-xs font-bold mb-2">
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sysdev-500 text-white text-[10px]">
        {n}
      </span>
      {label}
    </div>
  );
}

function UseCaseBeskrivelse({
  navn,
  aktorer,
  hovedflyt,
  alternativ,
}: {
  navn: string;
  aktorer: string[];
  hovedflyt: string[];
  alternativ?: string[];
}) {
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-white/80 dark:bg-neutral-900/90 p-4 my-4 text-sm">
      <h4 className="font-bold text-neutral-900 dark:text-neutral-50 mb-2">
        Brukstilfellebeskrivelse: {navn}
      </h4>
      <p className="text-neutral-700 dark:text-neutral-200 mb-2">
        <strong>Aktører:</strong> {aktorer.join(", ")}
      </p>
      <p className="font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Hovedflyt:</p>
      <ol className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-200 mb-2">
        {hovedflyt.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      {alternativ && (
        <>
          <p className="font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Alternativ flyt:</p>
          <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-200">
            {alternativ.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */

export default function EksemplerPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">
          DAT109
        </Link>
        <span>/</span>
        <Link href="/dat109/modellering" className="hover:text-[var(--accent)]">
          Modellering
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Case-studier</span>
      </div>

      <DAT109SubNav basePath={dat109BasePaths.modellering} pages={modelleringPages} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400">
            Del av oppgave 1 (40 % av eksamen)
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            7 case
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Case-studier — komplette modeller</h1>
        <p className="text-[var(--muted)] max-w-3xl">
          Sju komplette OOAD-eksempler der vi går gjennom brukstilfelle, domenemodell og
          sekvensdiagram som en helhet — ett spill (eller forretningssystem) om gangen. Lager
          bro mellom de tre diagram-typene og viser hvordan modellene utvikler seg iterativt.
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          INNLEDNING
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="Hvorfor case-studier?"
        mustKnow={[
          "Iterativ tilnærming: bygg en enkel versjon først, legg til komplikasjoner gradvis",
          "Brukstilfellediagram er IKKE et flytdiagram — bare aktører og bobler",
          "Domenemodell har ALDRI metoder — vanlige assosiasjoner + multiplisitet + spesialisering",
          "Sekvensdiagram skal samsvare med brukstilfellebeskrivelsen og domenemodellen",
        ]}
      >
        <p>
          På eksamen i DAT109 består <strong>oppgave 1</strong> (40 %) av tre delsvar:
          brukstilfellemodell, domenemodell og sekvensdiagram. De tre diagrammene er ikke
          uavhengige — de skal henge sammen som en helhet. Den beste måten å lære dette på er å
          gå gjennom <em>komplette</em> eksempler der vi følger ett problem fra start til slutt.
        </p>

        <p>
          Atle Geitung underviser metoden gjennom flere gjennomgående eksempler i forelesningene
          (særlig Monopol i F03–F06 og Stigespill i F08), og alle tidligere eksamener følger
          samme mønster. Spillene varierer (Monopol, stigespill, Max Mümmelmann, Skyjo, Ganz
          Schön Clever), men oppskriften er den samme.
        </p>

        <h3 className="text-lg font-bold mt-4">Atles iterative arbeidsmetode</h3>
        <p>
          Sitat fra F08: «Jeg ville gjort dette i iterasjoner. Lag et brett uten stiger og
          slanger først. Legg så til stiger og slanger. Legg til slutt til den siste
          regelen…». Den iterative tilnærmingen gjelder også på eksamen:
        </p>
        <ol className="list-decimal list-inside space-y-1 my-3">
          <li>Få en <strong>enkel</strong> versjon til å henge sammen først.</li>
          <li>
            Legg til <strong>én komplikasjon om gangen</strong> (penger, spesielle ruter,
            spesialregler).
          </li>
          <li>Hold modellen ren — ingen unødvendige klasser eller assosiasjoner.</li>
        </ol>

        <Note variant="atle" title="Atles tre kjerneregler (gjentatt på alle eksamenssett)">
          <p>
            <strong>1.</strong> Brukstilfellediagrammet er ikke et flytdiagram. Det viser bare{" "}
            <em>hvem som gjør hva</em> — aktører og bobler — ikke <em>hvordan</em>.
          </p>
          <p>
            <strong>2.</strong> Domenemodellen skal aldri ha metoder. Bruk{" "}
            <em>vanlige assosiasjoner</em> med multiplisitet og <em>spesialisering</em> der det
            passer. Atle bruker bevisst <em>ikke</em> komposisjon eller aggregering i sine
            fasiter — han skriver eksplisitt at det «ikke gir mer informasjon».
          </p>
          <p>
            <strong>3.</strong> Sekvensdiagrammet skal samsvare med brukstilfellebeskrivelsen.
            Hver melding tilsvarer noe i prosa-beskrivelsen.
          </p>
        </Note>

        <h3 className="text-lg font-bold mt-4">Hvordan denne siden er bygget opp</h3>
        <p>De sju casene er rangert etter hvor sentrale de er for eksamen:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Case 1 (Monopol):</strong> Larmans gjennomgående eksempel — viser den
            iterative metoden i sin reneste form.
          </li>
          <li>
            <strong>Case 2 (Stigespill):</strong> Direkte koblet til Øvelse 1 — JPA-persistering
            og sekserregler.
          </li>
          <li>
            <strong>Case 3 (Bilutleie):</strong> Eneste forretningssystem — viser at metoden
            virker også uten spillkontekst.
          </li>
          <li>
            <strong>Case 4 (Eksamenssystem H2020):</strong> Eneste eksamensoppgave som ikke er
            spill.
          </li>
          <li>
            <strong>Case 5 (Max Mümmelmann V2023):</strong> Atles offisielle løsningsforslag —
            det viktigste referansepunktet for «hva slags besvarelse gir 100 %».
          </li>
          <li>
            <strong>Case 6 (Skyjo V2024):</strong> Siste publiserte eksamen — foreslått løsning.
          </li>
          <li>
            <strong>Case 7 (Ganz Schön Clever Kont 2023):</strong> Terningspill med joker og
            bonusregler.
          </li>
        </ul>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          CASE 1: MONOPOL
          ═══════════════════════════════════════════ */}
      <CaseHeader
        number={1}
        title="Monopol"
        subtitle="Larmans gjennomgående eksempel — iterativ utvikling fra simpelt brett til penger og polymorfi"
        source="F03–F06 (Atles forelesninger)"
        weight="Lærebok-eksempel"
        difficulty="Middels"
      />

      <TheorySummary title="1.1 Bakgrunn og iterativ tilnærming">
        <p>
          Atle bruker Monopol som gjennomgående eksempel i fire forelesninger (F03–F06) for å
          vise hele OOAD-prosessen. Eksempelet er hentet fra Craig Larmans <em>Applying UML and
          Patterns</em>, kapittel 3 og utover. Hensikten er ikke å implementere et komplett
          Monopol-spill, men å vise <strong>hvordan modellene utvikler seg iterativt</strong>{" "}
          ettersom kompleksiteten øker.
        </p>

        <p>Atle deler eksempelet i tre iterasjoner:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Iterasjon 1:</strong> Spillet uten penger, vinner, eiendommer eller
            spesielle ruter. Bare brikker som flyttes 20 runder.
          </li>
          <li>
            <strong>Iterasjon 2:</strong> Penger introduseres. Tre spesielle ruter
            (start, inntektsskatt, fengsel) — løses med polymorfi.
          </li>
          <li>
            <strong>Iterasjon 3:</strong> Eiendommer og kjøp/leie. Hierarkiet blir dypere —
            <em>Pure Fabrication</em> brukes for ikke-domeneklasser.
          </li>
        </ul>
      </TheorySummary>

      <TheorySummary title="1.2 Iterasjon 1 — det enkleste spillet" defaultOpen={false}>
        <IterationBadge n={1} label="Init + Spill, ingen penger" />

        <h3 className="text-lg font-bold">Beskrivelse (etter F03)</h3>
        <p>
          «Setter i gang og overvåker spillet. 2-8 spillere. Spillet er en serie av runder, og i
          hver runde har hver spiller sin tur. Spillerens tur består av at han triller to
          terninger og flytter frem antall plasser som terningene tilsier. Vi spiller i 20
          runder. Foreløpig spiller vi uten penger, uten vinner, uten eiendommer og uten
          spesielle ruter.»
        </p>

        <h3 className="text-lg font-bold mt-4">Brukstilfellediagram</h3>
        <p>
          Ett funksjonelt krav: «Spill monopol». <code>Init</code> er et eget brukstilfelle som{" "}
          <code>&lt;&lt;include&gt;&gt;</code>-relateres fra <code>Spill</code>. Aktøren er
          observatøren som setter i gang og ser på.
        </p>
        <DiagramFrame caption="Brukstilfellediagram for Monopol — én aktør (observatør), to brukstilfeller bundet sammen med <<include>>">
          <UseCaseMonopol />
        </DiagramFrame>

        <UseCaseBeskrivelse
          navn="Spill monopol"
          aktorer={["Observatør"]}
          hovedflyt={[
            "Initialiser spillet (include: Init)",
            "Start spillet",
            "Hver av spillerne gjør et trekk (= runde)",
            "Trill terninger",
            "Flytt frem antall ruter tilsvarende terningkast",
            "Gjenta fra steg 3 til vi er ferdige (20 runder)",
          ]}
          alternativ={[
            "Hvis spillet feiler: observatør starter spillet på nytt",
            "Systemet logger hendelser og kan gjenskape tilstand før feil",
          ]}
        />

        <h3 className="text-lg font-bold mt-4">Domenemodell — iterasjon 1</h3>
        <p>
          Vi finner konseptene ved å understreke substantivene: monopol, brett, spiller, kopp,
          terning, brikke, rute. Alle relasjoner er <strong>vanlige assosiasjoner</strong> med
          eksplisitt multiplisitet:
        </p>
        <DiagramFrame caption="Domenemodell iter 1: 7 konsepter, kun vanlige assosiasjoner og multiplisitet (ingen aggregering, ingen metoder)">
          <DomainMonopolIter1 />
        </DiagramFrame>

        <Note variant="atle" title="Hvorfor ingen komposisjon-romber?">
          <p>
            Brett <em>«inneholder»</em> ruter — det høres ut som komposisjon. Men Atle bruker
            bevisst en <strong>vanlig assosiasjon</strong> med multiplisitet 1 til 40. I hans
            fasit til V2023 sier han eksplisitt at komposisjon ikke gir mer informasjon enn det
            multiplisiteten allerede sier — og er derfor unødvendig. Dette er en bevisst
            stilvalg: hold domenemodellen så enkel som mulig.
          </p>
        </Note>

        <h3 className="text-lg font-bold mt-4">Sekvensdiagram — spillTrekk()</h3>
        <p>
          Sekvensdiagrammet viser hovedmeldingen i én runde, gjentatt for alle spillere i 20
          runder. <code>Monopol</code> kaller <code>spillTrekk()</code> på{" "}
          <code>Spiller</code>, som så orchestrerer terningkast og flytting.
        </p>
        <DiagramFrame caption="Sekvensdiagram for Monopol — to nestede løkker (20 runder × alle spillere) rundt spillTrekk()">
          <SequenceMonopol />
        </DiagramFrame>

        <Note variant="tip" title="Nøkkelobservasjon: ansvarsfordeling">
          <p>
            <strong>Spiller</strong> får ansvaret for å koordinere sin egen tur (
            <code>spillTrekk()</code>). Dette er en bevisst GRASP-vurdering — etter prinsippet
            om <em>høy samhørighet</em> og <em>informasjonsekspert</em>. Spilleren vet hvor sin
            egen brikke står, og vet hvilken kopp han kaster med.
          </p>
        </Note>
      </TheorySummary>

      <TheorySummary title="1.3 Iterasjon 2 — penger og polymorfi" defaultOpen={false}>
        <IterationBadge n={2} label="Penger introduseres + spesielle ruter" />

        <h3 className="text-lg font-bold">Hva som er nytt</h3>
        <p>Fra F04/F05:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Alle spillere får 15&nbsp;000 kr ved start.</li>
          <li>Når spilleren havner på <strong>start-ruten</strong>, får han 2&nbsp;000 kr.</li>
          <li>
            Når spilleren havner på <strong>de-settes-i-fengsel-ruten</strong>, flytter han til
            fengsel-ruten.
          </li>
          <li>
            Når spilleren havner på <strong>inntektsskatt-ruten</strong>, må han betale
            2&nbsp;000 kr eller 10 % av verdien.
          </li>
        </ul>

        <h3 className="text-lg font-bold mt-4">Domenemodell — spesialisering</h3>
        <p>
          <code>Rute</code> blir abstrakt. Vi får tre konkrete undertyper:{" "}
          <code>StartRute</code>, <code>VanligRute</code>, <code>InntektsskattRute</code>,{" "}
          <code>FengselRute</code>. <code>Spiller</code> får attributtet <code>penger</code>.
        </p>
        <DiagramFrame caption="Domenemodell iter 2: spesialisering av Rute (4 undertyper) — vanlige assosiasjoner, ingen metoder">
          <DomainMonopolIter2 />
        </DiagramFrame>

        <Note variant="warn" title="Vanlig feil: å legge metoder på rutene">
          <p>
            I utformingsmodellen får hver subklasse en metode <code>landetPa(spiller)</code>{" "}
            som implementerer rute-spesifikk oppførsel (polymorfi). Men i{" "}
            <strong>domenemodellen</strong> har ingen klasser metoder — det viser
            kun <em>strukturen</em> i virkeligheten.
          </p>
        </Note>

        <h3 className="text-lg font-bold mt-4">Polymorfi i utformingsmodellen (GRASP)</h3>
        <p>
          Når <code>Spiller</code> trenger å reagere på rute-typen, har vi to dårlige
          alternativer (<em>switch</em>/<em>instanceof</em>) og ett godt: la rutene selv
          implementere det de skal gjøre via en abstrakt metode <code>landetPa(spiller)</code>.
        </p>
        <CodeBlock
          language="java"
          code={`public abstract class Rute {
    private String navn;
    public abstract void landetPa(Spiller spiller);
}

public class StartRute extends Rute {
    @Override
    public void landetPa(Spiller spiller) {
        spiller.leggTilPenger(2000);
    }
}

public class InntektsskattRute extends Rute {
    @Override
    public void landetPa(Spiller spiller) {
        int sum = Math.min(2000, spiller.getPenger() / 10);
        spiller.trekkFraPenger(sum);
    }
}

public class FengselRute extends Rute {
    @Override
    public void landetPa(Spiller spiller) {
        spiller.flyttBrikke(brett.fengselsRute());
    }
}`}
        />
        <p>
          Dette er en lærebok-anvendelse av GRASP-prinsippet <strong>Polymorphism</strong>: når
          oppførsel varierer med type, lar vi typene selv ta ansvar for variasjonen.
        </p>
      </TheorySummary>

      <TheorySummary title="1.4 Iterasjon 3 — eiendom og Pure Fabrication" defaultOpen={false}>
        <IterationBadge n={3} label="Eiendommer + Kopp/Hatt som Pure Fabrication" />

        <h3 className="text-lg font-bold">Hva som er nytt</h3>
        <p>
          Fra F06: <code>SkjøteRute</code> introduseres som abstrakt overtype for eiendommer
          (<code>Eiendom</code>, <code>Jernbane</code>, <code>Offentlig</code>). Spillere kan
          kjøpe og eie ruter. Modellen blir to nivåer dyp:
        </p>
        <DiagramFrame caption="Den komplette domenemodellen (etter alle iterasjoner) — Rute → SkjøteRute → tre eiendomstyper, og Spiller eier 0..* ruter">
          <DomainMonopol />
        </DiagramFrame>

        <h3 className="text-lg font-bold mt-4">Pure Fabrication: Kopp og Hatt</h3>
        <Note variant="atle" title="Hva er Pure Fabrication?">
          <p>
            GRASP-prinsippet <em>Pure Fabrication</em> sier at det er greit å lage klasser som
            ikke representerer noe i den virkelige verden — bare for å oppnå{" "}
            <strong>høy samhørighet</strong> og <strong>lav kobling</strong>.
          </p>
          <p>
            <strong>Kopp</strong> er klassisk Pure Fabrication: i virkeligheten er det bare et
            kar du rister terningene i. Men i utformingsmodellen er det en perfekt plass å
            samle ansvaret for «å trille flere terninger og summere verdien». Uten Kopp ville
            <code>Spiller</code> trengt å vite hvor mange terninger det er, kalle{" "}
            <code>trill()</code> på hver, og summere selv.
          </p>
          <p>
            <strong>Hatt</strong> er en annen Pure Fabrication som Atle introduserer i F06 for å
            håndtere fellesregler for spillerne (f.eks. trekkort-stokken).
          </p>
        </Note>

        <h3 className="text-lg font-bold mt-4">Hva tar vi med oss?</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Domenemodellen utvikler seg <em>med</em> kravene — start enkelt og spesialiser når
            du må.
          </li>
          <li>
            Spesialisering brukes når oppførselen varierer med type — ikke for «syns skyld».
          </li>
          <li>Pure Fabrication er din venn for å holde domeneklassene rene.</li>
        </ul>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          CASE 2: STIGESPILL
          ═══════════════════════════════════════════ */}
      <CaseHeader
        number={2}
        title="Stigespill"
        subtitle="Direkte koblet til Erlends Øvelse 1 — JPA-persistering og sekserregler"
        source="F08 + Øvelse 1"
        weight="Obligatorisk øvelse"
        difficulty="Middels"
      />

      <TheorySummary title="2.1 Bakgrunn — Øvelse 1 og F08">
        <p>
          Stigespill er det første spillet du selv modellerer i Øvelse 1 (Stigespill med JPA).
          Atle dekker det i én forelesning (F08, 22 slides) og tar det gjennom tre iterasjoner.
          I tillegg er det det <strong>første spillet hvor persistering med JPA er pensum</strong>{" "}
          — selve spillet, brettdefinisjonen og hvert eneste trekk skal lagres i en relasjons­database.
        </p>

        <Note variant="exam" title="Eksamenstips">
          <p>
            Atle har <em>aldri</em> gitt stigespill direkte på eksamen — men han har gitt{" "}
            <em>varianter</em> (Max Mümmelmann V2023, Skyjo V2024, Ganz Schön Clever Kont 2023).
            Hvis du behersker stigespill-modellen perfekt, har du grunnlaget for alle andre
            spill-eksamener.
          </p>
        </Note>

        <h3 className="text-lg font-bold mt-3">Spillereglene (fra Øvelse 1)</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>2-4 spillere, hver med sin brikke.</li>
          <li>100 nummererte ruter på et brett.</li>
          <li>Brettet inneholder slanger (man sklir nedover) og stiger (man klatrer oppover).</li>
          <li>Triller terning, flytter brikken så mange ruter frem.</li>
          <li>
            Lander man på starten av en stige, klatrer man opp til toppen. Lander man på hodet
            av en slange, sklir man til halen.
          </li>
          <li>
            Triller man 6, får man et nytt kast umiddelbart. Triller man 6 tre ganger på rad, må
            man tilbake til rute 1 og må trille 6 for å starte igjen.
          </li>
          <li>Vinneren er den som først treffer rute 100 nøyaktig.</li>
        </ul>
      </TheorySummary>

      <TheorySummary title="2.2 Iterasjon 1 — uten slanger og stiger" defaultOpen={false}>
        <IterationBadge n={1} label="Bare brikker som flyttes" />

        <p>
          Akkurat som med Monopol begynner vi med det enkleste mulige spillet: brett, ruter,
          spillere, brikker, terning. Ingen slanger, ingen stiger, ingen sekserregler.
        </p>

        <h3 className="text-lg font-bold mt-3">Brukstilfellediagram</h3>
        <DiagramFrame caption="Iterasjon 1: én aktør, ett brukstilfelle">
          <UseCaseStigespill />
        </DiagramFrame>

        <UseCaseBeskrivelse
          navn="Spill stigespill"
          aktorer={["Observatør"]}
          hovedflyt={[
            "Observatør initialiserer nytt spill og gir antall spillere",
            "Observatør starter spillet",
            "Systemet viser neste spillers trekk",
            "Spilleren triller terning og flytter brikken tilsvarende antall ruter",
            "Gjenta fra steg 3 til en spiller vinner eller observatøren avbryter",
          ]}
        />

        <h3 className="text-lg font-bold mt-3">Domenemodell</h3>
        <DiagramFrame caption="Iter 1: 6 konsepter (Stigespill, Spiller, Brett, Rute, Terning, Brikke) — vanlige assosiasjoner med multiplisitet">
          <DomainStigespillIter1 />
        </DiagramFrame>

        <h3 className="text-lg font-bold mt-3">Sekvensdiagram</h3>
        <p>
          Strukturelt identisk med Monopol-sekvensdiagrammet — to nestede løkker rundt{" "}
          <code>spillTrekk()</code>. Forskjellen er at vi triller én terning (ikke to) og at vi
          stopper på vinner (ikke etter fast antall runder).
        </p>
        <DiagramFrame caption="Iter 1: spillTrekk() — Spiller koordinerer terningkast, finner ny rute, oppdaterer brikken">
          <SequenceStigespill />
        </DiagramFrame>
      </TheorySummary>

      <TheorySummary title="2.3 Iterasjon 2 — slanger og stiger" defaultOpen={false}>
        <IterationBadge n={2} label="Brettet får topologi" />

        <p>
          Vi legger til slanger og stiger. Atle viser to alternative modelleringsvalg:
        </p>

        <Note variant="tip" title="Modelleringsvalg: egne klasser eller heltallsattributt?">
          <p>
            <strong>Domenemodell</strong> — egne klasser <code>Slange</code> og{" "}
            <code>Stige</code> som peker på «fra»- og «til»-rute. Dette er den{" "}
            <em>konseptuelle</em> modellen — slanger og stiger er virkelige objekter i spillet.
          </p>
          <p>
            <strong>Utformingsmodell</strong> — Atle forenkler ofte til et{" "}
            <em>heltallsattributt</em> på Rute: positivt = stige, negativt = slange, 0 = vanlig
            rute. Dette er kun et utformingsvalg for å spare klasser i koden.
          </p>
          <p>
            På eksamen tegner du den <em>konseptuelle</em> versjonen i domenemodellen.
          </p>
        </Note>

        <h3 className="text-lg font-bold mt-3">Brukstilfellediagram (utvidet)</h3>
        <DiagramFrame caption="Iterasjon 2: vi skiller Init spill ut som eget brukstilfelle (include) — én admin-aktør for konfigurasjon">
          <UseCaseStigespillIter2 />
        </DiagramFrame>

        <h3 className="text-lg font-bold mt-3">Domenemodell — egne Stige/Slange-klasser</h3>
        <DiagramFrame caption="Iter 2: 8 konsepter — Stige og Slange er egne klasser med fraNr/tilNr som peker på ruter">
          <DomainStigespillIter2 />
        </DiagramFrame>

        <h3 className="text-lg font-bold mt-3">Sekvensdiagram — første iterasjon (uten sekserregler)</h3>
        <p>
          Sekvensdiagrammet er fortsatt enkelt fordi <code>Brett</code> håndterer
          slange/stige-logikken internt — Spiller kaller bare <code>finnNyRute(rute, verdi)</code>{" "}
          og får tilbake <em>endelig</em> rute (etter eventuell stige eller slange).
        </p>
        <DiagramFrame caption="Sekvens: Spiller → Brett.finnNyRute(rute, verdi) — Brett gjør all stige/slange-logikk internt">
          <SequenceStigespill />
        </DiagramFrame>
      </TheorySummary>

      <TheorySummary title="2.4 Iterasjon 3 — sekserregler" defaultOpen={false}>
        <IterationBadge n={3} label="Tre 6'ere på rad → omstart" />

        <p>
          Den siste regelen er kompleks: triller du 6 får du et ekstrakast — men tre 6'ere på
          rad sender deg tilbake til rute 1, og du må trille 6 for å komme i gang igjen.
        </p>

        <h3 className="text-lg font-bold mt-3">Sekvensdiagram med sekserregler</h3>
        <p>
          Vi får en <code>loop</code>-fragment («triller om så lenge verdi=6 og &lt;3 ganger»),
          en <code>alt</code>-fragment for slange/stige-håndtering, og en til{" "}
          <code>alt</code>-fragment for tre-6'ere-regelen.
        </p>
        <DiagramFrame caption="Iter 3 sekvens: nestede loop og alt-fragmenter for sekserregler — kompleks, men hver melding samsvarer med beskrivelsen">
          <SequenceStigespillSeksere />
        </DiagramFrame>

        <Note variant="warn" title="Vanlig feil i sekvensdiagram">
          <p>
            <strong>Feil:</strong> Bare tegne det «vanlige» trekket og hoppe over loop/alt for
            spesialregler. <strong>Riktig:</strong> Bruk fragmentene aktivt — de er en del av
            UML og uttrykker kontrollflyt presist.
          </p>
          <p>
            <strong>Feil:</strong> Lage et flytdiagram (rektangler med piler) i stedet for
            sekvensdiagram. <strong>Riktig:</strong> Hver lifeline representerer et objekt;
            tiden går nedover; hver pil er en metodekall.
          </p>
        </Note>
      </TheorySummary>

      <TheorySummary title="2.5 Persistering med JPA — Øvelse 1" defaultOpen={false}>
        <p>
          Øvelse 1 krever at <em>brettdefinisjonen</em>, <em>spillerne</em> og <em>hvert
          eneste trekk</em> persisteres fortløpende — slik at hele spillet kan vises i
          etterkant.
        </p>

        <h3 className="text-lg font-bold mt-3">Entity-klassene</h3>
        <CodeBlock
          language="java"
          code={`@Entity
public class Stigespill {
    @Id @GeneratedValue
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Brett brett;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "spill")
    private List<Spiller> spillere = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "spill")
    @OrderBy("rekkefolge ASC")
    private List<Trekk> trekkHistorikk = new ArrayList<>();

    private LocalDateTime startet;
    // getters/setters
}

@Entity
public class Brett {
    @Id @GeneratedValue
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "brett")
    private List<Rute> ruter = new ArrayList<>();
}

@Entity
public class Rute {
    @Id @GeneratedValue
    private Long id;

    private int nummer;            // 1..100
    private int forflytning;       // 0 = vanlig, +N = stige, -N = slange

    @ManyToOne
    private Brett brett;
}

@Entity
public class Spiller {
    @Id @GeneratedValue
    private Long id;

    private String navn;
    private int antallSekserePaaRad;

    @ManyToOne
    private Stigespill spill;

    @OneToOne(cascade = CascadeType.ALL)
    private Brikke brikke;
}

@Entity
public class Trekk {
    @Id @GeneratedValue
    private Long id;

    private int rekkefolge;
    private int terningKast;
    private int fraRute;
    private int tilRute;

    @ManyToOne
    private Spiller spiller;

    @ManyToOne
    private Stigespill spill;
}`}
        />

        <h3 className="text-lg font-bold mt-3">Forretningslogikk for spillTrekk()</h3>
        <CodeBlock
          language="java"
          code={`public Trekk spillTrekk(Spiller spiller, EntityManager em) {
    int kast = terning.trill();
    int fra = spiller.getBrikke().getRute().getNummer();
    int foreloebig = fra + kast;

    if (foreloebig > 100) {
        // Bli stående — for høy verdi
        return loggTrekk(spiller, kast, fra, fra, em);
    }

    Rute landet = brett.getRute(foreloebig);
    int endeligNr = foreloebig + landet.getForflytning();
    Rute endelig = brett.getRute(endeligNr);

    spiller.getBrikke().setRute(endelig);

    // Sekser-håndtering
    if (kast == 6) {
        spiller.setAntallSekserePaaRad(spiller.getAntallSekserePaaRad() + 1);
        if (spiller.getAntallSekserePaaRad() == 3) {
            // Tre 6'ere på rad → tilbake til start
            spiller.getBrikke().setRute(brett.getRute(1));
            spiller.setAntallSekserePaaRad(0);
        }
    } else {
        spiller.setAntallSekserePaaRad(0);
    }

    return loggTrekk(spiller, kast, fra, endelig.getNummer(), em);
}

private Trekk loggTrekk(Spiller s, int kast, int fra, int til, EntityManager em) {
    Trekk t = new Trekk();
    t.setSpiller(s);
    t.setSpill(this);
    t.setRekkefolge(trekkHistorikk.size() + 1);
    t.setTerningKast(kast);
    t.setFraRute(fra);
    t.setTilRute(til);
    em.persist(t);
    trekkHistorikk.add(t);
    return t;
}`}
        />

        <Note variant="tip" title="Hvorfor lagre hvert trekk?">
          <p>
            Kravet i Øvelse 1 er at hele spillet skal kunne <em>vises i etterkant</em>. Det
            betyr at vi ikke bare kan lagre slutt-tilstanden — vi må kunne re-spille hver
            handling i rekkefølge. Derfor får <code>Trekk</code> sitt eget{" "}
            <code>rekkefolge</code>-felt og en <code>@ManyToOne</code> til Spiller.
          </p>
        </Note>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          CASE 3: BILUTLEIE
          ═══════════════════════════════════════════ */}
      <CaseHeader
        number={3}
        title="Bilutleie"
        subtitle="Eneste forretningssystem i pensum — kontrast til spill-domenet"
        source="Øvelse 2"
        weight="Frivillig anbefalt øvelse"
        difficulty="Krevende"
      />

      <TheorySummary title="3.1 Hvorfor er dette viktig?">
        <p>
          Alle de andre case-studiene (Monopol, Stigespill, Max Mümmelmann, Skyjo, GSC) er{" "}
          <strong>spill</strong>. Bilutleie er det <strong>eneste forretningssystemet</strong>{" "}
          i pensum, og det er viktig fordi det viser at OOAD-metoden virker generelt — ikke
          bare for spill.
        </p>

        <Note variant="exam" title="Eksamenstips">
          <p>
            Atle har gitt eksamenssystem (H2020) som ikke-spill-eksamen før. Bilutleie er
            mønsteret du bør beherske hvis du får et tilsvarende forretningssystem på eksamen.
          </p>
        </Note>

        <h3 className="text-lg font-bold mt-3">Forskjeller fra spill-domenet</h3>
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-white/80 dark:bg-neutral-900/90 p-4 text-sm">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-50 mb-2">Spill</h4>
            <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-200">
              <li>1-2 brukstilfeller (Init, Spill)</li>
              <li>Én aktør (observatør/spiller)</li>
              <li>Kortvarig (én økt)</li>
              <li>Få konsepter (5-8 klasser)</li>
              <li>Ingen ekte ekstern aktør</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-white/80 dark:bg-neutral-900/90 p-4 text-sm">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-50 mb-2">Forretningssystem</h4>
            <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-200">
              <li>5-7 brukstilfeller (CRUD + forretningslogikk)</li>
              <li>Flere aktører (kunde, ansatt, admin)</li>
              <li>Langvarig — data persisteres permanent</li>
              <li>Mange konsepter (8-15 klasser)</li>
              <li>Ekte eksterne aktører</li>
            </ul>
          </div>
        </div>
      </TheorySummary>

      <TheorySummary title="3.2 Brukstilfellediagram">
        <p>
          Vi har tre aktører (kunde, utleier, admin) og seks brukstilfeller. Legg merke til at{" "}
          <strong>«Definer bil»</strong> og <strong>«Definer kontor»</strong> er CRUD-aktøvinger
          for admin — de er nødvendige for å holde systemet i drift.
        </p>
        <DiagramFrame caption="Bilutleie-systemet: 3 aktører × 6 brukstilfeller. «Lever tilbake bil» includer «Beregn pris»">
          <UseCaseBilutleie />
        </DiagramFrame>

        <UseCaseBeskrivelse
          navn="Reserver bil"
          aktorer={["Kunde"]}
          hovedflyt={[
            "Kunde oppgir ønsket utleiested, returstad, dato/klokkeslett, antall dager",
            "Systemet søker etter ledige biler i ønsket kategori",
            "Systemet viser tilgjengelige kategorier med priser",
            "Kunde velger ønsket kategori",
            "Systemet oppretter reservasjon og sender bekreftelse",
          ]}
          alternativ={[
            "Ingen ledige biler i ønsket kategori → vis nærmeste tilgjengelige",
            "Kunde avbryter → ingen reservasjon opprettes",
          ]}
        />

        <UseCaseBeskrivelse
          navn="Hent bil"
          aktorer={["Kunde", "Utleier"]}
          hovedflyt={[
            "Kunde møter opp på utleiekontor på avtalt dato",
            "Utleier slår opp reservasjon",
            "Utleier registrerer kredittkort, kilometerstand, hentedato",
            "Systemet oppretter Utleie-objekt",
            "Kunde får nøkler til bil",
          ]}
        />

        <UseCaseBeskrivelse
          navn="Lever tilbake bil"
          aktorer={["Kunde", "Utleier"]}
          hovedflyt={[
            "Kunde leverer bil på utleiekontor",
            "Utleier registrerer ny kilometerstand og leveringsdato",
            "Inkluderer: Beregn pris (basert på dagspris × dager + ev. returgebyr)",
            "Systemet utsteder regning",
            "Bilen merkes som ledig på dette kontoret",
          ]}
        />
      </TheorySummary>

      <TheorySummary title="3.3 Domenemodell">
        <p>
          Vi finner konseptene ved substantivanalyse: Bilutleieselskap, Utleiekontor, Bil,
          Kunde, Reservasjon, Utleie, Adresse, Kredittkort.
        </p>

        <DiagramFrame caption="Bilutleie domenemodell — 8 konsepter, vanlige assosiasjoner med multiplisitet (ingen aggregering, ingen metoder)">
          <DomainBilutleie />
        </DiagramFrame>

        <Note variant="atle" title="Reservasjon vs Utleie — to klasser, ikke én">
          <p>
            En vanlig feil er å slå sammen Reservasjon og Utleie til én klasse. Men de er
            forskjellige tilstander i forretningsprosessen:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Reservasjon:</strong> En lovet leie i fremtiden — kan kanselleres uten
              kostnad.
            </li>
            <li>
              <strong>Utleie:</strong> En faktisk pågående eller fullført leie — innebærer
              kontrakt, kredittkort, kilometerstand.
            </li>
          </ul>
          <p>
            En Reservasjon kan ende opp som en Utleie (1 til 0..1) — eller bli kansellert.
          </p>
        </Note>

        <Note variant="tip" title="Adresse som egen klasse">
          <p>
            Både Utleiekontor og Kunde har en adresse. Vi lager Adresse som egen klasse fordi
            den har struktur (gate, postnr, by) og brukes flere steder. Dette unngår duplisering
            i modellen og gir en naturlig plass for adressevalidering i koden.
          </p>
        </Note>
      </TheorySummary>

      <TheorySummary title="3.4 Sekvensdiagram — Reserver bil">
        <DiagramFrame caption="Sekvens: kunde → selskap.reserver(...) → finnLedige på kontor → opprett Reservasjon → bekreftelse">
          <SequenceBilutleie />
        </DiagramFrame>

        <Note variant="tip" title="Hvorfor «Selskap» som hovedmottaker?">
          <p>
            Selskapet (eller en bookings-tjeneste) er <em>kontrolleren</em> for{" "}
            «Reserver bil»-brukstilfellet (GRASP-prinsippet Controller). Det er én hovedklasse
            som koordinerer hele prosessen — i stedet for at brukeren snakker direkte med Kontor
            eller Bil.
          </p>
        </Note>

        <h3 className="text-lg font-bold mt-3">Hva lærer vi av Bilutleie?</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Forretningssystemer har flere aktører og brukstilfeller enn spill.</li>
          <li>
            Tilstander i forretningsprosessen (Reservasjon → Utleie) blir egne klasser.
          </li>
          <li>Verdiklasser (Adresse) lages når strukturen gjenbrukes.</li>
          <li>Controller-mønsteret er sentralt — én klasse koordinerer hver brukstilfelle.</li>
        </ul>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          CASE 4: EKSAMENSSYSTEM
          ═══════════════════════════════════════════ */}
      <CaseHeader
        number={4}
        title="Eksamenssystem"
        subtitle="Eneste eksamen som ikke er spill — viser at metoden virker for andre domener"
        source="Eksamen H2020"
        weight="Tidligere eksamen"
        difficulty="Krevende"
      />

      <TheorySummary title="4.1 Bakgrunn">
        <p>
          H2020-eksamen ga deg et reelt forretningssystem: et eksamenssystem hvor lærere lager
          oppgaver, definerer eksamener, og studenter besvarer dem. Atle gir det som en
          påminnelse om at <em>OOAD-metoden virker for alt</em> — du skal kunne anvende den på
          hva som helst, ikke bare spill.
        </p>

        <h3 className="text-lg font-bold mt-3">Spesialitet: «Klokken» som aktør</h3>
        <Note variant="atle" title="Tid som aktør i UML">
          <p>
            På H2020-fasiten markerer Atle <strong>Klokken</strong> som en{" "}
            <code>&lt;&lt;actor&gt;&gt;</code> (sekundær aktør). Dette er fordi
            tidsutløp (eksamenstiden er over) trigger systemet til automatisk å levere
            besvarelsen. Selv om en klokke ikke er en person, er den en ekstern «entitet» som
            interagerer med systemet.
          </p>
        </Note>
      </TheorySummary>

      <TheorySummary title="4.2 Brukstilfellediagram (Atles fasit)">
        <DiagramFrame caption="Atles fasit: 3 aktører (Lærer, Student, Klokke), 5 brukstilfeller, og «Besvar eksamen» includer «Lever besvarelse»">
          <UseCaseEksamen />
        </DiagramFrame>

        <p>De fem brukstilfellene er:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Lag oppgave</strong> (Lærer): definerer en flervalgsoppgave med spørsmål og
            svaralternativer.
          </li>
          <li>
            <strong>Definer eksamen</strong> (Lærer): velger oppgaver, setter tid og varighet.
          </li>
          <li>
            <strong>Besvar eksamen</strong> (Student): logger inn, krysser av svar.
          </li>
          <li>
            <strong>Lever besvarelse</strong> (Student/Klokke — automatisk hvis tid utløper).
          </li>
          <li>
            <strong>Godkjenn karakter</strong> (Lærer).
          </li>
        </ul>
      </TheorySummary>

      <TheorySummary title="4.3 Domenemodell (Atles fasit)">
        <DiagramFrame caption="8 klasser: Lærer/Oppgave/Spørsmål/Svaralternativ + Eksamen/Student/Besvarelse/Svar — vanlige assosiasjoner">
          <DomainEksamen />
        </DiagramFrame>

        <Note variant="atle" title="Hvorfor Besvarelse mellom Student og Eksamen?">
          <p>
            En student kan ta flere eksamener (flere fag, kont). Hver Eksamen har flere
            studenter som besvarer den. Det er en mange-til-mange-relasjon — men hver kombinasjon
            student/eksamen har egne data (karakter, leveringstidspunkt, svar). Derfor blir{" "}
            <strong>Besvarelse</strong> en egen <em>assosiasjonsklasse</em> som binder dem
            sammen.
          </p>
          <p>
            Dette er et generelt mønster: når en relasjon har egne attributter, må den modelleres
            som en klasse. Tilsvarende blir <strong>Svar</strong> en assosiasjonsklasse mellom
            Besvarelse og Svaralternativ.
          </p>
        </Note>
      </TheorySummary>

      <TheorySummary title="4.4 Hva skiller eksamenssystemet fra spill?">
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Flere aktører</strong> — Lærer og Student har helt forskjellige
            brukstilfeller.
          </li>
          <li>
            <strong>Tid som ekstern aktør</strong> — Klokken trigger automatisk levering.
          </li>
          <li>
            <strong>Assosiasjonsklasser</strong> — Besvarelse og Svar er ikke domenekonsepter i
            seg selv, men forbinder andre konsepter med data.
          </li>
          <li>
            <strong>Ingen iterativ utvikling vist</strong> — Atles fasit hopper rett til endelig
            modell, fordi domenet ikke har «vinneregler» som blir mer komplekse over tid.
          </li>
        </ul>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          CASE 5: MAX MÜMMELMANN
          ═══════════════════════════════════════════ */}
      <CaseHeader
        number={5}
        title="Max Mümmelmann"
        subtitle="V2023 — den beste referansen vi har for «hva slags besvarelse gir 100 %»"
        source="Eksamen V2023"
        weight="Tidligere eksamen"
        difficulty="Middels"
      />

      <TheorySummary title="5.1 Hvorfor V2023 er gull verdt">
        <p>
          V2023 er den nyeste eksamen med et detaljert offisielt løsningsforslag fra Atle. Han
          går gjennom alle tre delsvar og forklarer modelleringsvalg. Hvis du bare leser ETT
          løsningsforslag, les dette ett.
        </p>

        <Note variant="exam" title="Atles eksplisitte regler i V2023-fasiten">
          <p>
            <strong>1.</strong> «En domenemodell gir et statisk bilde av den verden som vi skal
            modellere og seinere programmere. Det er <em>ingen metoder</em> i domenemodellen.»
          </p>
          <p>
            <strong>2.</strong> «Jeg bruker bevisst ikke aggregering eller komposisjon. Vanlige
            assosiasjoner med multiplisitet og spesialisering der det passer.»
          </p>
          <p>
            <strong>3.</strong> «Brukstilfellediagrammet er ikke et flytdiagram. Det viser bare
            aktører og hva de kan gjøre.»
          </p>
        </Note>

        <h3 className="text-lg font-bold mt-3">Spillregler kort</h3>
        <p>
          Max Mümmelmann er et terningspill med et brett der hver rute har en bunke kort. Hver
          spiller triller terning, flytter brikken, og tar øverste kort fra ruten dersom han
          mangler symbolet. Vinneren er den som først har samlet alle nødvendige kort.
        </p>
      </TheorySummary>

      <TheorySummary title="5.2 Brukstilfellediagram — Atles fasit">
        <DiagramFrame caption="Atles fasit: 2 aktører (Admin, Spiller), 3 brukstilfeller — «Start spill» includer «Init spill»">
          <UseCaseMaxMummelmann />
        </DiagramFrame>

        <p>
          Atle skiller bevisst <strong>Init spill</strong> ut som eget brukstilfelle (med
          include) — det reflekterer at oppstart er en egen fase med eget formål. Admin kan
          gjøre Init og Start spill, men Spiller kan kun gjøre Spill tur.
        </p>
      </TheorySummary>

      <TheorySummary title="5.3 Domenemodell — Atles fasit">
        <DiagramFrame caption="Atles fasit: 7 klasser, vanlige assosiasjoner med multiplisitet (ingen aggregering, ingen metoder)">
          <DomainMaxMummelmann />
        </DiagramFrame>

        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>
            <strong>MaxMummelmann:</strong> rotklassen som koordinerer spillet.
          </li>
          <li>
            <strong>Brett:</strong> 1 til 8 ruter (brettet i originalen har 8 ruter).
          </li>
          <li>
            <strong>Rute:</strong> hver rute har en bunke kort.
          </li>
          <li>
            <strong>Spiller:</strong> 2..4 spillere, hver med en brikke og opptil 6 kort.
          </li>
          <li>
            <strong>Brikke:</strong> står på én rute (men én rute kan ha flere brikker).
          </li>
          <li>
            <strong>Terning:</strong> 1 terning per spill.
          </li>
          <li>
            <strong>Kort:</strong> har et nummer som matcher symbolene spilleren skal samle.
          </li>
        </ul>
      </TheorySummary>

      <TheorySummary title="5.4 Sekvensdiagram — Spill tur">
        <DiagramFrame caption="Sekvens for «Spill tur» — terningkast, flytting, ev. ta kort. alt-fragment for «mangler familiemedlem»">
          <SequenceMaxMummelmann />
        </DiagramFrame>

        <Note variant="tip" title="Studer dette som mal for din egen besvarelse">
          <p>
            Legg merke til hvordan <em>hver melding</em> har et formål og en tydelig avsender og
            mottaker. Returmeldinger (stiplet linje) brukes når det er en tydelig returverdi.
            <code>alt</code>-fragment markerer betinget logikk. Dette er den «riktige» dybden
            på et eksamens-sekvensdiagram.
          </p>
        </Note>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          CASE 6: SKYJO
          ═══════════════════════════════════════════ */}
      <CaseHeader
        number={6}
        title="Skyjo"
        subtitle="V2024 — siste publiserte eksamen, ingen offisiell fasit. Foreslått løsning."
        source="Eksamen V2024"
        weight="Tidligere eksamen"
        difficulty="Krevende"
      />

      <TheorySummary title="6.1 Spillregler kort (fra V2024)">
        <p>
          Skyjo er et kortspill av Alexander Bernhardt for 2-8 spillere. Mål: få minst mulig
          poeng. Spillet avsluttes når en spiller har 100 poeng eller mer.
        </p>

        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>150 kort</strong> med verdier mellom -2 og 12 (5 kort med -2, 15 med 0, 10
            av hver av de andre).
          </li>
          <li>
            Hver spiller får <strong>12 kort</strong> i et 3×4-rutenett. To av kortene snus
            opp.
          </li>
          <li>
            Resten av kortene er en bunke i midten, øverste kort på <strong>kastehaugen</strong>{" "}
            er åpent.
          </li>
          <li>
            På sin tur: trekk kort fra bunke eller kastehaug, bytt med ett av dine kort (eller
            forkast hvis bunke), åpne ev. nye skjulte kort.
          </li>
          <li>
            Omgangen ferdig når en spiller har åpnet alle 12 kortene. Alle får én tur til,
            poengene summeres.
          </li>
          <li>
            Den som avsluttet får sine poeng <strong>doblet</strong> hvis han ikke har færrest.
          </li>
          <li>Spillet slutter når en spiller har 100+ poeng.</li>
        </ul>
      </TheorySummary>

      <TheorySummary title="6.2 Foreslått brukstilfellediagram">
        <p>
          Tre brukstilfeller dekker hele spillet. Spilleren er eneste aktør (ingen
          admin/observatør i denne oppgaven, fordi spillet starter umiddelbart).
        </p>
        <DiagramFrame caption="Foreslått: 1 aktør (Spiller), 3 brukstilfeller (Start spill, Spill tur, Avslutt omgang)">
          <UseCaseSkyjo />
        </DiagramFrame>
      </TheorySummary>

      <TheorySummary title="6.3 Foreslått domenemodell">
        <p>
          Vi finner konseptene ved substantivanalyse av oppgaveteksten: Skyjo, Spiller, Kort,
          Kortstokk, Kastehaug, Omgang, Spillebrett, Poengblokk.
        </p>
        <DiagramFrame caption="Foreslått: 8 konsepter, vanlige assosiasjoner med multiplisitet (ingen aggregering, ingen metoder)">
          <DomainSkyjo />
        </DiagramFrame>

        <Note variant="atle" title="Modelleringsvalg">
          <p>
            <strong>Spillebrett:</strong> Hver spiller har sitt eget 3×4 rutenett av 12 kort.
            Vi modellerer dette som <code>Spillebrett</code> med 12 kort. Alternativt kunne vi
            brukt <code>Rad</code>-klasse — det er et gyldig valg, men ekstra kompleksitet.
          </p>
          <p>
            <strong>Kort:</strong> har attributtet <code>synlig: bool</code> som tydeliggjør at
            samme kort kan være enten åpent eller skjult. Verdien er -2..12.
          </p>
          <p>
            <strong>Omgang:</strong> egen klasse fordi spillet går over flere omganger og
            poeng noteres etter hver omgang.
          </p>
          <p>
            <strong>Poengblokk:</strong> én per spiller, med kumulative poeng. Kunne også vært
            attributter på Spiller — det er et utformingsvalg.
          </p>
        </Note>
      </TheorySummary>

      <TheorySummary title="6.4 Foreslått sekvensdiagram — Spill tur">
        <DiagramFrame caption="Spill tur: alt-fragment for valg av kortkilde, opt for behold/forkast, slutt med «alleÅpne?»-sjekk">
          <SequenceSkyjo />
        </DiagramFrame>

        <Note variant="tip" title="Hvorfor alt + opt?">
          <p>
            <code>alt</code>-fragment brukes når det er <em>flere alternativer</em> (kastehaug
            eller bunke). <code>opt</code>-fragment brukes når noe er <em>valgfritt</em> (hvis
            spilleren trekker fra bunke kan han velge å forkaste i stedet for å bytte).
          </p>
        </Note>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          CASE 7: GANZ SCHÖN CLEVER
          ═══════════════════════════════════════════ */}
      <CaseHeader
        number={7}
        title="Ganz Schön Clever"
        subtitle="Kont 2023 — terningspill med joker, bonusregler og fargeområder. Foreslått løsning."
        source="Konteeksamen H2023"
        weight="Tidligere eksamen"
        difficulty="Krevende"
      />

      <TheorySummary title="7.1 Spillregler kort (fra Kont 2023)">
        <p>
          Ganz Schön Clever («Thats Pretty Clever») av Wolfgang Warsch er et terningspill for
          2-4 spillere, nominert som årets barnespill 2022.
        </p>

        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>5 terninger</strong> med farge (gul, rød, grønn, blå) + symbol. Tre sider
            har joker.
          </li>
          <li>
            Hver spiller har et <strong>spillebrett</strong> med fire fargede områder (gul,
            rød, grønn, blå).
          </li>
          <li>
            Aktiv spiller triller alle terningene, velger én — og får alle terninger med samme
            farge + alle joker.
          </li>
          <li>Symbolene krysses av i sitt fargeområde.</li>
          <li>
            <strong>Bonussirkler:</strong> noen ruter gir ekstra avkrysninger.
          </li>
          <li>
            <strong>Joker:</strong> kan være hvilken som helst farge/symbol, med restriksjoner.
          </li>
          <li>
            Spillet slutter når en spiller har krysset av alle symbolene i ett fargeområde.
          </li>
          <li>Vinner: flest regnbuestjerner.</li>
        </ul>
      </TheorySummary>

      <TheorySummary title="7.2 Foreslått brukstilfellediagram">
        <DiagramFrame caption="3 brukstilfeller: Start spill, Spill tur, Bruk ekstra (bonusregler)">
          <UseCaseGanzSchonClever />
        </DiagramFrame>
      </TheorySummary>

      <TheorySummary title="7.3 Foreslått domenemodell">
        <DiagramFrame caption="GSC domene: 9 konsepter inkludert spesialisering av Område (4 fargeområder)">
          <DomainGanzSchonClever />
        </DiagramFrame>

        <Note variant="atle" title="Spesialisering av Område — typisk Atle-mønster">
          <p>
            De fire fargeområdene har forskjellige avkrysningsregler (ballonger må fra venstre
            mot høyre, lys må krysses samtidig, presanger fritt, søtsaker krever to terninger).
            Dette er et perfekt sted for spesialisering — hver subklasse implementerer{" "}
            <code>kanKryssAv()</code> annerledes (i utformingsmodellen).
          </p>
          <p>
            I domenemodellen viser vi bare hierarkiet:{" "}
            <code>Område</code> → <code>GulOmrde</code>, <code>RødOmrde</code>,{" "}
            <code>GrønnOmrde</code>, <code>BlåOmrde</code>. Ingen metoder.
          </p>
        </Note>

        <Note variant="tip" title="Joker som egen klasse">
          <p>
            <code>JokerSide</code> er modellert som en egen klasse (ikke bare et boolsk
            attributt på Terning) fordi joker har spesialregler. Når du som spiller bruker
            joker, må systemet vite hvilken farge/symbol du «leverer som». En egen klasse gjør
            denne logikken naturlig å plassere.
          </p>
        </Note>
      </TheorySummary>

      <TheorySummary title="7.4 Foreslått sekvensdiagram — Spill tur">
        <DiagramFrame caption="Spill tur GSC: trill alle, velg en, alt-fragment for enkel/farge/joker, kryss av i Område">
          <SequenceGanzSchonClever />
        </DiagramFrame>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          SAMMENLIGNING PÅ TVERS
          ═══════════════════════════════════════════ */}
      <TheorySummary title="Sammenligning på tvers av alle case">
        <p>
          Tabellen nedenfor viser at modelleringsmønsteret er konsistent på tvers av alle
          spill-case, med unntak for forretningssystemene (Bilutleie, Eksamen) som har flere
          aktører og brukstilfeller.
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left p-2 font-bold">Case</th>
                <th className="text-left p-2 font-bold">År/Kilde</th>
                <th className="text-left p-2 font-bold">Type</th>
                <th className="text-center p-2 font-bold">Aktører</th>
                <th className="text-center p-2 font-bold">Brukstilfeller</th>
                <th className="text-center p-2 font-bold">Klasser</th>
                <th className="text-center p-2 font-bold">Bruker arv</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="p-2 font-semibold">Monopol</td>
                <td className="p-2">F03–F06 (Larman)</td>
                <td className="p-2">Spill</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">2</td>
                <td className="p-2 text-center">7-10</td>
                <td className="p-2 text-center">Ja (Rute, SkjøteRute)</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Stigespill</td>
                <td className="p-2">F08, Øvelse 1</td>
                <td className="p-2">Spill</td>
                <td className="p-2 text-center">1-2</td>
                <td className="p-2 text-center">1-2</td>
                <td className="p-2 text-center">6-8</td>
                <td className="p-2 text-center">Nei (eller Stige/Slange)</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Bilutleie</td>
                <td className="p-2">Øvelse 2</td>
                <td className="p-2">Forretning</td>
                <td className="p-2 text-center">3</td>
                <td className="p-2 text-center">6</td>
                <td className="p-2 text-center">8</td>
                <td className="p-2 text-center">Nei</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Eksamenssystem</td>
                <td className="p-2">H2020</td>
                <td className="p-2">Forretning</td>
                <td className="p-2 text-center">3</td>
                <td className="p-2 text-center">5</td>
                <td className="p-2 text-center">8</td>
                <td className="p-2 text-center">Nei</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Max Mümmelmann</td>
                <td className="p-2">V2023</td>
                <td className="p-2">Spill</td>
                <td className="p-2 text-center">2</td>
                <td className="p-2 text-center">3</td>
                <td className="p-2 text-center">7</td>
                <td className="p-2 text-center">Nei</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Skyjo</td>
                <td className="p-2">V2024</td>
                <td className="p-2">Spill</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">3</td>
                <td className="p-2 text-center">8</td>
                <td className="p-2 text-center">Nei</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Ganz Schön Clever</td>
                <td className="p-2">Kont 2023</td>
                <td className="p-2">Spill</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">3</td>
                <td className="p-2 text-center">9</td>
                <td className="p-2 text-center">Ja (Område)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-bold mt-4">Mønstre du kan stole på</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Spill:</strong> 1-2 aktører, 1-3 brukstilfeller, 6-9 klasser. Arv brukes når
            oppførsel varierer med type.
          </li>
          <li>
            <strong>Forretningssystem:</strong> 3+ aktører, 5-7 brukstilfeller, 8+ klasser.
            Tilstander blir egne klasser (Reservasjon vs Utleie). Sjelden arv.
          </li>
          <li>
            <strong>Konstant:</strong> Multiplisitet alltid på alle assosiasjoner. Aldri metoder
            i domenemodell.
          </li>
        </ul>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          EKSAMENSSTRATEGI
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="Eksamensstrategi for oppgave 1 — sjekkliste"
        mustKnow={[
          "Bruk 96 minutter (40 % av 4 timer) på oppgave 1",
          "Brukstilfellemodell først (15 min), domenemodell midt (45 min), sekvens sist (35 min)",
          "Sjekk at de tre diagrammene henger sammen før du leverer",
        ]}
      >
        <h3 className="text-lg font-bold">Tidsbudsjett</h3>
        <p>Oppgave 1 er 40 % av eksamen — det er 96 minutter på 4 timer totalt.</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>0-5 min:</strong> Les oppgaveteksten to ganger. Strek under substantivene.
          </li>
          <li>
            <strong>5-20 min:</strong> Brukstilfellediagram + brukstilfellebeskrivelser.
          </li>
          <li>
            <strong>20-65 min:</strong> Domenemodell — den viktigste delen!
          </li>
          <li>
            <strong>65-90 min:</strong> Sekvensdiagram for hovedbrukstilfellet (1-3 stk).
          </li>
          <li>
            <strong>90-96 min:</strong> Sjekk konsistens og lever.
          </li>
        </ul>

        <h3 className="text-lg font-bold mt-4">Sjekkliste — brukstilfellediagram</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Systemgrense (rektangel) tegnet</li>
          <li>Aktører utenfor grensen, brukstilfeller innenfor</li>
          <li>Sekundære aktører markert med <code>&lt;&lt;actor&gt;&gt;</code> hvis nødvendig</li>
          <li><code>&lt;&lt;include&gt;&gt;</code> brukt der ett brukstilfelle alltid kaller et annet</li>
          <li>IKKE flytdiagram — ingen rektangler med piler mellom dem</li>
        </ul>

        <h3 className="text-lg font-bold mt-4">Sjekkliste — domenemodell</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Alle klasser har bare attributter — ingen metoder</li>
          <li>Multiplisitet på alle assosiasjoner (1, *, 0..1, 2..8 osv.)</li>
          <li>Vanlige assosiasjoner — IKKE komposisjon eller aggregering</li>
          <li>Spesialisering brukt der oppførsel varierer med type</li>
          <li>Verdiklasser som Adresse er egne klasser hvis de gjenbrukes</li>
          <li>Assosiasjonsklasser brukt for mange-til-mange med data (jf. Besvarelse)</li>
        </ul>

        <h3 className="text-lg font-bold mt-4">Sjekkliste — sekvensdiagram</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Lifelines (objekter) på toppen</li>
          <li>Tiden går nedover</li>
          <li>Hver melding har en avsender og en mottaker</li>
          <li>Returverdier markert med stiplet linje når relevant</li>
          <li>
            <code>loop</code>, <code>alt</code>, <code>opt</code> brukt for kontrollflyt
          </li>
          <li>Hver melding samsvarer med noe i brukstilfellebeskrivelsen</li>
          <li>Mottakere finnes i domenemodellen (eller er en kontroller)</li>
        </ul>

        <Note variant="warn" title="Topp 5 vanlige feil">
          <p>
            <strong>1.</strong> Metoder i domenemodellen — gir automatisk trekk.
          </p>
          <p>
            <strong>2.</strong> Manglende multiplisitet på assosiasjoner.
          </p>
          <p>
            <strong>3.</strong> Brukstilfellediagram tegnet som flytdiagram.
          </p>
          <p>
            <strong>4.</strong> Sekvensdiagram-meldinger til klasser som ikke finnes i
            domenemodellen.
          </p>
          <p>
            <strong>5.</strong> For mange brukstilfeller — Atle sier eksplisitt at du kan
            begrense til 3 sekvensdiagrammer hvis du har flere brukstilfeller.
          </p>
        </Note>

        <Note variant="exam" title="Erlend, dette er det viktigste å huske">
          <p>
            Atle har en <em>helt forutsigbar</em> stil. Han belønner enkelhet, konsistens og
            lojalitet til hans regler. Hvis du har:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Brukstilfellediagram med boundary, aktører, og 1-3 use cases</li>
            <li>Domenemodell uten metoder, med multiplisitet, eventuelt spesialisering</li>
            <li>Sekvensdiagram med lifelines, loops/alts, og meldinger som matcher domenet</li>
          </ul>
          <p className="mt-2">
            ...så har du grunnlaget for full pott på oppgave 1. Ikke prøv å gjøre det «smart» —
            følg Atles mønster og unngå å oppfinne avansert UML-syntaks.
          </p>
        </Note>
      </TheorySummary>

      {/* Relaterte sider */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 mt-10">
        <h3 className="font-bold text-sm mb-3">Relaterte sider</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dat109/modellering/brukstilfelle"
            className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
          >
            Brukstilfellemodell
          </Link>
          <Link
            href="/dat109/modellering/domene"
            className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
          >
            Domenemodell
          </Link>
          <Link
            href="/dat109/modellering/sekvens"
            className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
          >
            Sekvensdiagram
          </Link>
          <Link
            href="/dat109/modellering/sjekkliste"
            className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
          >
            Sjekkliste
          </Link>
          <Link
            href="/dat109/eksamen/oppgave-1-modellering"
            className="text-sm px-3 py-1.5 rounded-lg border border-[var(--card-border)] hover:border-sysdev-400 hover:bg-sysdev-50/50 dark:hover:bg-sysdev-950/20 transition-colors"
          >
            Eksamendrilling — Oppg 1
          </Link>
        </div>
      </div>
    </div>
  );
}
