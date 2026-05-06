"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

/* ═══════════════════════════════════════════════════════════════
   INLINE SVG: Endringskurve — fossefall vs smidig
   ═══════════════════════════════════════════════════════════════ */
function EndringskurveSvg() {
  return (
    <svg
      viewBox="0 0 480 260"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-label="Kostnaden av endringer over tid — fossefall vs smidig"
    >
      {/* Akser */}
      <line x1="40" y1="220" x2="460" y2="220" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" strokeWidth="1.5" />
      <text x="245" y="245" textAnchor="middle" fontSize="11" fill="currentColor">Tid i prosjektet</text>
      <text x="20" y="120" textAnchor="middle" fontSize="11" fill="currentColor" transform="rotate(-90 20 120)">
        Kostnad per endring
      </text>
      {/* Fossefall — eksponentiell vekst */}
      <path
        d="M 40 210 Q 200 200 320 100 T 460 30"
        stroke="#ef4444"
        strokeWidth="2.5"
        fill="none"
      />
      <text x="395" y="55" fontSize="11" fontWeight="700" fill="#ef4444">Fossefall</text>
      {/* Agile — flat */}
      <path
        d="M 40 200 Q 200 195 320 188 T 460 180"
        stroke="#22c55e"
        strokeWidth="2.5"
        fill="none"
      />
      <text x="400" y="195" fontSize="11" fontWeight="700" fill="#22c55e">Smidig</text>
      {/* Faseinndeling */}
      <text x="80" y="230" fontSize="9" fill="currentColor">Krav</text>
      <text x="160" y="230" fontSize="9" fill="currentColor">Design</text>
      <text x="250" y="230" fontSize="9" fill="currentColor">Koding</text>
      <text x="345" y="230" fontSize="9" fill="currentColor">Testing</text>
      <text x="425" y="230" fontSize="9" fill="currentColor">Drift</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INLINE SVG: Iterativ utvikling — vekst per iterasjon
   ═══════════════════════════════════════════════════════════════ */
function IterativUtviklingSvg() {
  const iterations = [
    { x: 40, h: 30, label: "Iter 1" },
    { x: 110, h: 60, label: "Iter 2" },
    { x: 180, h: 95, label: "Iter 3" },
    { x: 250, h: 130, label: "Iter 4" },
    { x: 320, h: 160, label: "Iter 5" },
    { x: 390, h: 180, label: "Iter 6" },
  ];
  const totalH = 200;
  return (
    <svg viewBox="0 0 460 240" className="w-full max-w-xl mx-auto" role="img" aria-label="Inkrementell vekst over iterasjoner">
      <line x1="20" y1="220" x2="450" y2="220" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="20" x2="20" y2="220" stroke="currentColor" strokeWidth="1.5" />
      {iterations.map((it) => (
        <g key={it.label}>
          <rect
            x={it.x}
            y={220 - it.h}
            width={50}
            height={it.h}
            fill="#22c55e"
            fillOpacity={0.25}
            stroke="#22c55e"
            strokeWidth={1.5}
          />
          <text
            x={it.x + 25}
            y={222 - it.h / 2 + 4}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill="currentColor"
          >
            {it.label}
          </text>
        </g>
      ))}
      <text x="20" y="14" fontSize="10" fill="currentColor">Funksjonalitet</text>
      <text x="445" y="235" textAnchor="end" fontSize="9" fill="currentColor">Tid →</text>
      <text x="235" y="14" textAnchor="middle" fontSize="10" fontStyle="italic" fill="currentColor">
        Hver iterasjon = ferdig fungerende inkrement
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INLINE SVG: Tidslinje av smidig-tradisjonen
   ═══════════════════════════════════════════════════════════════ */
function SmidigHistorikkSvg() {
  const events = [
    { year: "1970", label: "Royce: Waterfall", x: 40 },
    { year: "1986", label: "Scrum (Takeuchi & Nonaka)", x: 130 },
    { year: "1996", label: "XP (Kent Beck)", x: 220 },
    { year: "2001", label: "Agile Manifesto", x: 305 },
    { year: "2009", label: "DevOps", x: 380 },
    { year: "I dag", label: "Lean / Kanban / SAFe", x: 460 },
  ];
  return (
    <svg viewBox="0 0 540 180" className="w-full max-w-3xl mx-auto" role="img" aria-label="Tidslinje for utviklingsmetoder">
      <line x1="20" y1="100" x2="520" y2="100" stroke="currentColor" strokeWidth="2" />
      {events.map((e, i) => (
        <g key={e.year}>
          <circle cx={e.x} cy={100} r={6} fill={i === 3 ? "#22c55e" : "#3b82f6"} />
          <line x1={e.x} y1={i % 2 === 0 ? 95 : 105} x2={e.x} y2={i % 2 === 0 ? 50 : 145} stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
          <text x={e.x} y={i % 2 === 0 ? 40 : 165} textAnchor="middle" fontSize={10} fontWeight={700} fill="currentColor">
            {e.year}
          </text>
          <text x={e.x} y={i % 2 === 0 ? 28 : 175} textAnchor="middle" fontSize={9} fill="currentColor">
            {e.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function SmidigGrunnlagPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.utviklingsmetode} pages={utviklingsmetodePages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/utviklingsmetode" className="hover:text-[var(--accent)]">Utviklingsmetode</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Smidig grunnlag</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Smidig grunnlag</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        Sammenligning av smidig og fossefall, det agile manifestet med 4 verdier og 12 prinsipper,
        og hvorfor smidige metoder vant frem på 2000-tallet. Grunnlaget for alle senere
        metoder (Scrum, XP, Kanban, AUP, DevOps).
      </p>

      {/* ═══════════════════════════════════════════════════════════
          1. Historikk og bakgrunn
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Historikk: hvorfor smidige metoder vant frem"
        defaultOpen={true}
        mustKnow={[
          "Fossefallsmodellen ble formalisert i 1970 (Winston Royce) — opprinnelig ment som et avskrekkende eksempel!",
          "Smidige metoder vokste frem på 90-tallet (Scrum, XP) som svar på fossefall-problemene",
          "Agile Manifesto skrevet i 2001 av 17 utviklere — ETT dokument, 4 verdier, 12 prinsipper",
          "I dag: smidig er normen i programvareutvikling, kombinert med DevOps og Lean",
        ]}
      >
        <p>
          For å forstå <em>hvorfor</em> smidige metoder ble oppfunnet, må vi forstå hva de
          erstatter. Helt frem til 1990-tallet var <strong>fossefallsmodellen</strong> standard:
          krav → analyse → design → koding → testing → drift, i streng sekvens. Modellen ble
          formalisert i 1970 av Winston Royce — som ironisk nok beskrev den som et eksempel på
          en metode som <strong>ikke</strong> fungerer for store prosjekter, men hvis advarsel
          ble overhørt.
        </p>

        <SmidigHistorikkSvg />

        <p className="mt-4">
          Problemene med fossefall ble tydeligere etter hvert som programvareindustrien vokste:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 ml-2">
          <li><strong>Kunden så produktet først helt på slutten</strong> — og oppdaget da ofte at det
            var feil ting som var bygd.</li>
          <li><strong>Endringer var ekstremt dyre</strong> — for å rette en feil måtte man tilbake
            gjennom alle fasene.</li>
          <li><strong>Krav endrer seg</strong> — det er nesten umulig å spesifisere alt riktig i
            starten av et stort prosjekt.</li>
          <li><strong>Risiko ble oppdaget for sent</strong> — tekniske problemer dukket opp først i
            implementeringsfasen.</li>
        </ul>

        <p className="mt-4">
          På 90-tallet eksperimenterte flere uavhengig: Sutherland og Schwaber utviklet
          <strong> Scrum</strong> (1986–1995, formalisert), Kent Beck oppfant
          <strong> Extreme Programming (XP)</strong> i 1996. Begge handlet om kortere sykluser,
          mer kundeinvolvering, og mer fleksibilitet.
        </p>

        <p className="mt-3">
          I februar 2001 møttes 17 erfarne utviklere på Snowbird ski-resort i Utah og formulerte
          <strong> Agile Manifesto</strong> — ETT enkelt dokument med 4 verdier og 12 prinsipper.
          Det ble grunnlaget for alle senere smidige metoder.
        </p>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          2. Fossefall vs smidig
          ═══════════════════════════════════════════════════════════ */}
      <section id="smidig-vs-fossefall" className="scroll-mt-32">
        <TheorySummary
          title="Smidig vs Fossefall (Vannfall)"
          mustKnow={[
            "Fossefall er sekvensielt — hver fase må fullføres før neste starter",
            "Smidig er iterativt — lever fungerende programvare i korte sykluser",
            "Kostnaden for endringer eksploderer mot slutten i fossefall, men holder seg flat i smidig",
            "Smidige metoder håndterer endringer bedre enn fossefall",
            "Fossefall kan passe for prosjekter med faste, uforanderlige krav (medisinsk utstyr, embedded systems)",
          ]}
        >
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Fossefallsmodellen (Waterfall)</p>
            <p className="text-sm mb-3">
              En <strong>lineær, sekvensiell</strong> prosess der man gjør alle krav ferdig,
              deretter all analyse, all design, all koding, all testing, og til slutt utrulling.
              Hver fase må fullføres helt før neste kan starte.
            </p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
              {["Krav", "Analyse", "Design", "Koding", "Testing", "Utrulling"].map((phase, i) => (
                <span key={phase} className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                    {phase}
                  </span>
                  {i < 5 && <span className="text-blue-400">→</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Smidig modell (Agile)</p>
            <p className="text-sm mb-3">
              En <strong>iterativ, inkrementell</strong> prosess der man leverer fungerende
              programvare i korte sykluser (1–4 uker). Kunden ser resultater tidlig og kan
              gi tilbakemeldinger som former neste iterasjon.
            </p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
              {["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4", "..."].map((phase, i) => (
                <span key={phase} className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">
                    {phase}
                  </span>
                  {i < 4 && <span className="text-green-400">→</span>}
                </span>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">
              Hver sprint inneholder planlegging, design, koding, testing og demo — alt i én kort syklus.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Endringskostnaden — det viktigste argumentet</h3>
          <p className="text-sm mb-3">
            Den klassiske begrunnelsen for smidige metoder er <strong>endringskurven</strong>.
            I fossefall blir det stadig dyrere å gjøre endringer jo lenger ut i prosjektet du er.
            I smidig holdes kostnaden <em>flat</em> ved at vi alltid jobber i små biter med
            kontinuerlig validering.
          </p>
          <EndringskurveSvg />
          <p className="text-xs text-[var(--muted)] mt-2 italic text-center">
            I fossefall: en endring i krav i testfasen kan kreve ny analyse, design og kode — kostnaden eksploderer.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Inkrementell vekst</h3>
          <p className="text-sm mb-3">
            En sentral idé i smidig: etter hver iterasjon har du noe <strong>fungerende</strong>
            å vise. Produktet vokser steg for steg, og hver versjon er potensielt leverbar.
          </p>
          <IterativUtviklingSvg />

          <ComparisonTable
            headers={["Egenskap", "Fossefall", "Smidig"]}
            rows={[
              ["Prosess", "Sekvensiell, lineær", "Iterativ, inkrementell"],
              ["Krav", "Låst i starten", "Kan endres underveis"],
              ["Leveranse", "Alt på slutten", "Fungerende inkrement etter hver sprint"],
              ["Kundeinvolvering", "Kun i starten og slutten", "Kontinuerlig gjennom prosjektet"],
              ["Risiko", "Oppdages sent", "Oppdages tidlig (korte sykluser)"],
              ["Endringskostnad", "Høy — alt må gjøres om", "Lav — bare neste sprint påvirkes"],
              ["Testing", "Etter all koding er ferdig", "Kontinuerlig i hver sprint"],
              ["Dokumentasjon", "Tung, omfattende", "Lettere — fokus på fungerende kode"],
              ["Teamstruktur", "Spesialiserte roller i faser", "Tverrfunksjonelle, selvstyrte team"],
              ["Passer for", "Faste krav, regulerte miljøer", "Endringspregede prosjekter, innovasjon"],
            ]}
          />

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
              Når BØR du faktisk bruke fossefall?
            </p>
            <p className="text-sm mb-2">
              Smidig er ikke alltid svaret. Fossefall (eller hybrider) kan være riktig når:
            </p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Kravene er <strong>virkelig</strong> stabile (medisinsk utstyr, embedded i fly)</li>
              <li>Regulatoriske krav krever full dokumentasjon før utvikling (luftfart, bank)</li>
              <li>Prosjektet er fysisk produkt, ikke programvare (broer, bygninger)</li>
              <li>Kunden ikke kan/vil delta kontinuerlig</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig eksamensfelle</p>
            <p className="text-sm">
              Smidige metoder sier <em>ikke</em> at dokumentasjon er verdiløst — de sier at
              <strong> fungerende programvare verdsettes høyere</strong> enn dokumentasjon.
              Alternativ som sier &ldquo;planlegging og design er de mest kritiske fasene&rdquo;
              er fossefalls-tenkning og <strong>IKKE</strong> et smidig prinsipp.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. Det agile manifestet
          ═══════════════════════════════════════════════════════════ */}
      <section id="manifestet" className="scroll-mt-32">
        <TheorySummary
          title="Det agile manifestet (2001) — 4 verdier"
          defaultOpen={true}
          mustKnow={[
            "De 4 verdiene — ordrett (testet HVERT år på eksamen)",
            "'Fremfor' betyr ikke at høyre side er verdiløs — venstre side verdsettes høyere",
            "Manifestet ble skrevet av 17 utviklere på Snowbird ski-resort, februar 2001",
            "Vanlig felle: 'Strukturert planlegging foran tilpasset planlegging' er IKKE en agile-verdi",
          ]}
        >
          <p>
            I februar 2001 møttes 17 erfarne programvareutviklere på Snowbird ski-resort i Utah
            og formulerte det agile manifestet. Det er grunnlaget for <em>alle</em> smidige
            metoder (Scrum, XP, Kanban, AUP, osv.). Originalen finnes på{" "}
            <a
              href="https://agilemanifesto.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sysdev-600 dark:text-sysdev-400 underline"
            >
              agilemanifesto.org
            </a>
            .
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-5 rounded-lg">
            <p className="font-bold text-amber-700 dark:text-amber-400 mb-3 text-lg">De 4 verdiene</p>
            <div className="space-y-3">
              {[
                {
                  left: "Personer og samspill",
                  right: "prosesser og verktøy",
                  hvorfor: "Selv det beste verktøyet hjelper ikke om teamet ikke kommuniserer.",
                },
                {
                  left: "Programvare som virker",
                  right: "omfattende dokumentasjon",
                  hvorfor: "Et 200-siders krav-dokument er ikke noe verdt om koden ikke kjører.",
                },
                {
                  left: "Samarbeid med kunden",
                  right: "kontraktsforhandlinger",
                  hvorfor: "Kunden vet best hva de trenger, men oppdager det underveis.",
                },
                {
                  left: "Å reagere på endringer",
                  right: "å følge en plan",
                  hvorfor: "En plan er en hypotese. Når virkeligheten endrer seg, endrer planen seg.",
                },
              ].map((v, i) => (
                <div key={i} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200 dark:border-amber-800/40 p-3">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-green-600 dark:text-green-400 min-w-[180px]">{v.left}</span>
                    <span className="text-[var(--muted)] italic">fremfor</span>
                    <span className="text-[var(--muted)]">{v.right}</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1.5 italic ml-1">→ {v.hvorfor}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-3 italic">
              &ldquo;Selv om det er verdi i elementene til høyre, verdsetter vi elementene til venstre høyere.&rdquo; — Originalsitat fra manifestet
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Eksamensfeller</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>2023:</strong> &ldquo;Strukturert planlegging foran tilpasset planlegging&rdquo; er IKKE en agile-verdi — det er det stikk motsatte</li>
              <li><strong>2024:</strong> &ldquo;Planlegging og design er de mest kritiske fasene&rdquo; er IKKE et smidig prinsipp — det er fossefalls-tenkning</li>
              <li>Vær OBS: alle 4 verdiene har formen &ldquo;X fremfor Y&rdquo;. Hvis et alternativ ikke har denne formen, er det sannsynligvis feil.</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. De 12 prinsippene — fullstendig
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="De 12 prinsippene bak manifestet"
        defaultOpen={false}
        mustKnow={[
          "12 prinsipper utfyller de 4 verdiene — du trenger ikke kunne dem ordrett, men kjenne hovedessensen",
          "V2024-felle: 'Planlegging og design er de mest kritiske fasene' er IKKE blant prinsippene",
          "Sentrale temaer: kontinuerlig levering, endringer er bra, fungerende programvare måler fremdrift, ansikt-til-ansikt, selvorganiserende team, refleksjon",
        ]}
      >
        <p>
          De 12 prinsippene utdyper verdiene og gir konkrete retningslinjer. Du må ikke kunne dem
          ordrett, men du må kjenne hovedessensen — og du må kunne kjenne igjen
          <em> et FALSKT prinsipp</em> blant ekte (typisk eksamensfelle).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
          {[
            {
              nr: 1,
              text: "Vår høyeste prioritet er å tilfredsstille kunden gjennom tidlig og kontinuerlig levering av verdifull programvare.",
              why: "Kunden får verdi underveis, ikke bare på slutten.",
            },
            {
              nr: 2,
              text: "Ønsk endrede krav velkommen, selv sent i utviklingen. Smidige prosesser utnytter endringer for kundens konkurransefortrinn.",
              why: "Endringer er en kilde til verdi, ikke en byrde.",
            },
            {
              nr: 3,
              text: "Lever fungerende programvare ofte, fra et par uker til et par måneder, med kortere intervaller foretrukket.",
              why: "Hyppige leveranser = rask tilbakemelding = mindre risiko.",
            },
            {
              nr: 4,
              text: "Forretningsfolk og utviklere må jobbe sammen daglig gjennom hele prosjektet.",
              why: "Bro mellom forretning og teknologi — ingen siloer.",
            },
            {
              nr: 5,
              text: "Bygg prosjekter rundt motiverte mennesker. Gi dem miljøet og støtten de trenger, og stol på at de gjør jobben.",
              why: "Tillit > kontroll. Mennesker er de viktigste ressursene.",
            },
            {
              nr: 6,
              text: "Den mest effektive metoden for å overføre informasjon i et team er ansikt-til-ansikt-samtale.",
              why: "Mail/dokumenter mister nyanser. Tidlig dialog løser problemer raskt.",
            },
            {
              nr: 7,
              text: "Fungerende programvare er det primære målet på fremdrift.",
              why: "Ikke linjer kode, ikke dokumenter — bare det som faktisk fungerer for brukeren.",
            },
            {
              nr: 8,
              text: "Smidige prosesser fremmer bærekraftig utvikling. Sponsorer, utviklere og brukere skal kunne holde et konstant tempo i det uendelige.",
              why: "Ingen «dødsmars» — hold et tempo som er bærekraftig over år.",
            },
            {
              nr: 9,
              text: "Kontinuerlig oppmerksomhet på teknisk fortreffelighet og god design fremmer smidighet.",
              why: "Kvalitet i koden gjør det MULIG å være smidig — slurv = teknisk gjeld = treghet.",
            },
            {
              nr: 10,
              text: "Enkelhet — kunsten å maksimere mengden arbeid som IKKE blir gjort — er essensielt.",
              why: "KISS / YAGNI. Bygg det du trenger, ikke mer.",
            },
            {
              nr: 11,
              text: "Den beste arkitekturen, kravene og designen kommer fra selvorganiserende team.",
              why: "Teamet kjenner detaljene best. Ledelsen styrer rammene, ikke hver beslutning.",
            },
            {
              nr: 12,
              text: "Med jevne mellomrom reflekterer teamet over hvordan de kan bli mer effektive, og justerer atferden deretter.",
              why: "Sprint Retrospective i Scrum, kaizen i Lean. Aldri slutt å forbedre.",
            },
          ].map((p) => (
            <div
              key={p.nr}
              className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3"
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-700 dark:text-sysdev-400 text-xs font-bold flex items-center justify-center">
                  {p.nr}
                </span>
                <p className="text-xs leading-snug">{p.text}</p>
              </div>
              <p className="text-xs text-[var(--muted)] italic ml-8">→ {p.why}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hvordan kjenne igjen et FALSKT prinsipp på eksamen</p>
          <p className="text-sm mb-2">Hvis du ser noen av disse, er det IKKE et agile-prinsipp:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>&ldquo;Planlegging og design er de mest kritiske fasene&rdquo; (V2024-felle — fossefall)</li>
            <li>&ldquo;Detaljerte krav skal være ferdige før koding&rdquo; (fossefall)</li>
            <li>&ldquo;Hver utvikler bør jobbe på sin egen del uavhengig&rdquo; (mot tverrfunksjonelt team)</li>
            <li>&ldquo;Strukturert planlegging foran tilpasset planlegging&rdquo; (V2023-felle)</li>
            <li>&ldquo;Endringer skal unngås for å holde prosjektet på sporet&rdquo; (mot prinsipp 2)</li>
          </ul>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          5. Smidige familien — hva vokste ut av manifestet
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Smidige metoder — familien som vokste ut av manifestet"
        defaultOpen={false}
        mustKnow={[
          "Scrum, XP, Kanban, AUP og Lean er alle SMIDIGE metoder — bygger på samme manifest",
          "Scrum = prosjektledelse-rammeverk. XP = tekniske praksiser. Kanban = visuell flytstyring. AUP = iterativ prosess. Lean = eliminér sløsing.",
          "I praksis kombineres flere — vanligst er Scrum + XP-praksiser",
        ]}
      >
        <p>
          Manifestet sier <em>ingenting</em> om hvordan du faktisk skal jobbe — det er bare en
          filosofi. De konkrete metodene er forskjellige tolkninger av samme verdier:
        </p>

        <ComparisonTable
          headers={["Metode", "Fokus", "Iterasjon", "Hovedidé"]}
          rows={[
            ["Scrum", "Prosjektledelse, organisering", "Sprint (1-4 uker)", "Roller (PO, SM, team), seremonier, artefakter"],
            ["XP", "Tekniske praksiser", "1-2 uker", "Parprogrammering, TDD, refaktorering, kontinuerlig integrasjon"],
            ["Kanban", "Visualisering og flyt", "Kontinuerlig — ingen sprinter", "Tavle, WIP-limits, pull-basert"],
            ["AUP", "Iterativ prosess (lett RUP)", "Faser med iterasjoner", "4 faser × 7 disipliner, tilpasset agile"],
            ["Lean", "Eliminere sløsing (waste)", "Kontinuerlig forbedring", "Pull-system, just-in-time, kaizen"],
            ["DevOps", "Bygge bro Dev ↔ Ops", "Kontinuerlig deployment", "CI/CD, infrastruktur som kode, automatisering"],
            ["SAFe", "Smidig på storskala", "Program Increments (10 uker)", "Smidig for store organisasjoner med flere team"],
          ]}
        />

        <p className="mt-3 text-sm">
          I DAT109 fokuserer vi mest på <strong>Scrum, XP, AUP, Kanban, TDD og DevOps</strong> —
          alle dekket på sine egne sider i denne seksjonen. På eksamen testes du både på
          enkeltmetoder og deres kombinasjon (særlig Scrum + XP og AUP + Scrum).
        </p>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 my-4 rounded-lg text-sm">
          <p>
            <strong>Tips:</strong> Tenk på det slik — manifestet er <em>verdiene</em>, prinsippene
            er <em>retningslinjene</em>, og metodene (Scrum, XP, ...) er <em>oppskriftene</em> som
            implementerer alt sammen.
          </p>
        </div>
      </TheorySummary>

      {/* Navigasjon til neste sider */}
      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        <Link
          href="/dat109/utviklingsmetode/scrum"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">Neste →</p>
          <p className="font-bold mt-1">Scrum</p>
          <p className="text-xs text-[var(--muted)]">Den mest brukte smidige metoden — roller, artefakter, seremonier</p>
        </Link>
        <Link
          href="/dat109/utviklingsmetode/xp"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">Eller →</p>
          <p className="font-bold mt-1">Extreme Programming (XP)</p>
          <p className="text-xs text-[var(--muted)]">Tekniske praksiser: TDD, parprogrammering, CI</p>
        </Link>
      </div>
    </div>
  );
}
