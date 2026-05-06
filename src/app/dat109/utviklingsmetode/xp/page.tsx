"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

/* ─── SVG: Driver + Navigator (parprogrammering) ─── */
function ParprogSvg() {
  return (
    <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto" role="img" aria-label="Parprogrammering: driver + navigator">
      {/* Skjerm */}
      <rect x={140} y={20} width={140} height={90} fill="#0f172a" stroke="#475569" strokeWidth={1.5} rx={4} />
      <line x1={210} y1={110} x2={210} y2={130} stroke="#475569" strokeWidth={3} />
      <rect x={170} y={130} width={80} height={6} fill="#475569" rx={2} />
      <text x={210} y={75} textAnchor="middle" fontSize={11} fill="#22c55e" fontFamily="monospace">{"public void"}</text>
      <text x={210} y={90} textAnchor="middle" fontSize={11} fill="#22c55e" fontFamily="monospace">{"spill() { ... }"}</text>

      {/* Driver — venstre */}
      <circle cx={70} cy={90} r={18} fill="#3b82f6" fillOpacity={0.3} stroke="#3b82f6" strokeWidth={1.5} />
      <text x={70} y={95} textAnchor="middle" fontSize={9} fill="currentColor" fontWeight={700}>D</text>
      <line x1={70} y1={108} x2={70} y2={150} stroke="#3b82f6" strokeWidth={1.5} />
      <line x1={50} y1={120} x2={90} y2={120} stroke="#3b82f6" strokeWidth={1.5} />
      <line x1={70} y1={150} x2={50} y2={180} stroke="#3b82f6" strokeWidth={1.5} />
      <line x1={70} y1={150} x2={90} y2={180} stroke="#3b82f6" strokeWidth={1.5} />
      <text x={70} y={195} textAnchor="middle" fontSize={10} fontWeight={700} fill="#3b82f6">Driver</text>
      <text x={70} y={15} textAnchor="middle" fontSize={9} fill="currentColor" fontStyle="italic">skriver kode</text>

      {/* Navigator — høyre */}
      <circle cx={350} cy={90} r={18} fill="#a855f7" fillOpacity={0.3} stroke="#a855f7" strokeWidth={1.5} />
      <text x={350} y={95} textAnchor="middle" fontSize={9} fill="currentColor" fontWeight={700}>N</text>
      <line x1={350} y1={108} x2={350} y2={150} stroke="#a855f7" strokeWidth={1.5} />
      <line x1={330} y1={120} x2={370} y2={120} stroke="#a855f7" strokeWidth={1.5} />
      <line x1={350} y1={150} x2={330} y2={180} stroke="#a855f7" strokeWidth={1.5} />
      <line x1={350} y1={150} x2={370} y2={180} stroke="#a855f7" strokeWidth={1.5} />
      <text x={350} y={195} textAnchor="middle" fontSize={10} fontWeight={700} fill="#a855f7">Navigator</text>
      <text x={350} y={15} textAnchor="middle" fontSize={9} fill="currentColor" fontStyle="italic">tenker, ser problemer</text>
    </svg>
  );
}

/* ─── SVG: De 5 verdiene som pyramide / sirkel ─── */
function VerdierSvg() {
  const values = [
    { label: "Mot", color: "#ef4444", angle: -90 },
    { label: "Respekt", color: "#f59e0b", angle: -18 },
    { label: "Tilbakemelding", color: "#22c55e", angle: 54 },
    { label: "Enkelhet", color: "#3b82f6", angle: 126 },
    { label: "Kommunikasjon", color: "#a855f7", angle: 198 },
  ];
  const cx = 150;
  const cy = 130;
  const r = 80;
  return (
    <svg viewBox="0 0 300 280" className="w-full max-w-sm mx-auto" role="img" aria-label="XPs 5 verdier">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={1} strokeDasharray="3,3" opacity={0.4} />
      {values.map((v) => {
        const rad = (v.angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        return (
          <g key={v.label}>
            <circle cx={x} cy={y} r={28} fill={v.color} fillOpacity={0.2} stroke={v.color} strokeWidth={1.5} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="currentColor">
              {v.label}
            </text>
          </g>
        );
      })}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor">XP</text>
      <text x={cx} y={260} textAnchor="middle" fontSize={9} fontStyle="italic" fill="currentColor">
        De 5 verdiene henger sammen — kommunikasjon krever respekt, mot krever tilbakemelding
      </text>
    </svg>
  );
}

export default function XPPage() {
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
        <span className="text-[var(--foreground)]">XP</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Extreme Programming (XP)</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        XPs 5 verdier, 12 praksiser og hvordan parprogrammering, TDD, kontinuerlig integrasjon
        og refaktorering passer sammen. Husk: dokumentasjon er IKKE en XP-verdi.
      </p>

      {/* ═══════════════════════════════════════════════════════════
          1. Hva er XP — bakgrunn og filosofi
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Hva er XP og hvor kommer det fra?"
        defaultOpen={true}
        mustKnow={[
          "XP = Extreme Programming, oppfunnet av Kent Beck i 1996",
          "'Extreme' = ta anerkjente gode praksiser og dial them up to 11 — gjør dem mer aggressivt",
          "Mens Scrum styrer prosjektet, styrer XP HVORDAN koden skrives",
          "I praksis kombineres Scrum + XP — Scrum gir rammeverket, XP gir tekniske praksiser",
        ]}
      >
        <p>
          Kent Beck skapte XP på et Chrysler-prosjekt midt på 90-tallet (C3 — Comprehensive
          Compensation). Boken «Extreme Programming Explained» (1999) ble standardverket. Beck
          var en av de 17 som skrev Agile Manifesto i 2001 — XP er én av de viktigste smidige
          metodene fra før manifestet.
        </p>
        <p className="mt-3">
          &laquo;Extreme&raquo; betyr at man tar gode praksiser og <strong>maksimerer</strong> dem:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 ml-2 my-2">
          <li>Hvis kodevurdering er bra → la to programmerere skrive sammen HELE TIDEN (parprogrammering)</li>
          <li>Hvis testing er bra → skriv testen FØR koden (TDD)</li>
          <li>Hvis korte iterasjoner er bra → ha integrasjon flere ganger DAGLIG (CI)</li>
          <li>Hvis enkel design er bra → bygg <em>kun</em> det man trenger nå (YAGNI/Enkelhet)</li>
        </ul>
        <p className="mt-3">
          Forskjellen fra Scrum er fokus: <strong>Scrum sier hvordan teamet organiserer seg</strong>{" "}
          (PO, SM, sprint, daily). <strong>XP sier hvordan koden faktisk skrives</strong> (TDD,
          parprog, refaktorering). De er komplementære og kombineres ofte.
        </p>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          2. De 5 verdiene
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="De 5 verdiene"
        defaultOpen={true}
        mustKnow={[
          "5 verdier: Enkelhet, Kommunikasjon, Tilbakemelding, Respekt, Mot",
          "Dokumentasjon er IKKE en XP-verdi (vanlig flervalg-felle!)",
          "Husk: XP-verdiene er IKKE samme som agile-manifest-verdiene",
          "Verdiene er fundamentet — praksisene er hvordan man lever ut verdiene",
        ]}
      >
        <p>
          XP bygger på 5 verdier som teamet skal leve etter. På eksamen er dette nesten alltid
          et flervalg-spørsmål: «Hvilken er IKKE en XP-verdi?» — svaret er ofte
          &laquo;Dokumentasjon&raquo;.
        </p>

        <VerdierSvg />

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-4">
          {[
            { val: "Enkelhet", desc: "Gjør det som trengs, ikke mer", emoji: "✂️" },
            { val: "Kommunikasjon", desc: "Alle er del av laget", emoji: "💬" },
            { val: "Tilbakemelding", desc: "Demo tidlig og ofte", emoji: "📣" },
            { val: "Respekt", desc: "Alle bidrar med verdi", emoji: "🤝" },
            { val: "Mot", desc: "Vær ærlig om fremgang", emoji: "🦁" },
          ].map((v) => (
            <div key={v.val} className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-3 text-center">
              <p className="text-2xl mb-1">{v.emoji}</p>
              <p className="font-bold text-purple-700 dark:text-purple-400 text-sm">{v.val}</p>
              <p className="text-xs text-[var(--muted)] mt-1">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 mt-4">
          {[
            { name: "Enkelhet (Simplicity)", text: "Gjør det enkleste som kan fungere. Ikke bygg for fremtidige behov som kanskje aldri kommer (YAGNI). Gir mindre kode å vedlikeholde, mindre å forstå, færre feil." },
            { name: "Kommunikasjon (Communication)", text: "Snakk sammen ansikt-til-ansikt. Mail og chat mister nyanser. Parprogrammering = konstant kommunikasjon. Daglige standups = lagets puls." },
            { name: "Tilbakemelding (Feedback)", text: "Få rask tilbakemelding fra alle hold: kompilator, tester, kunde, andre utviklere. Korte iterasjoner = mer tilbakemelding." },
            { name: "Respekt (Respect)", text: "Alle på laget bidrar med verdi. Junior-utvikleren har like mye rett til å foreslå som senior. Ingen 'rockstar'-kultur." },
            { name: "Mot (Courage)", text: "Vær ærlig om problemer. Refaktorer kode du ikke er stolt av. Si til kunden hvis et estimat er feil. Slett kode som ikke trengs." },
          ].map((v) => (
            <div key={v.name} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 text-sm">
              <p className="font-bold mb-1">{v.name}</p>
              <p className="text-[var(--muted)]">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-3 my-4 rounded-lg">
          <p className="text-sm">
            <strong>Eksamenspoeng:</strong> Dokumentasjon er IKKE en XP-verdi! Testet på eksamen 2023 (oppgave 3.7).
            De ekte 5 er: <em>Enkelhet, Kommunikasjon, Tilbakemelding, Respekt, Mot</em>.
            Noen XP-versjoner inkluderer en 6. verdi: <em>Ydmykhet (Humility)</em> — det er sjelden
            testet, men greit å vite om.
          </p>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          3. De 12 praksisene — alle
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="De 12 praksisene — slik lever XP-teamet"
        defaultOpen={true}
        mustKnow={[
          "Mens verdiene er FILOSOFI, er praksisene KONKRETE handlinger",
          "12 praksiser i originalversjonen — Beck reorganiserte til 13 i 2nd edition (2004)",
          "De viktigste på eksamen: parprogrammering, TDD, kontinuerlig integrasjon, refaktorering, korte leveranser",
          "Praksisene støtter hverandre — du kan ikke plukke én og forvente alle fordelene",
        ]}
      >
        <p>
          Verdiene er filosofien. Praksisene er det konkrete: HVA gjør man hver dag? Originalboken
          fra 1999 lister 12 praksiser. Du må ikke huske alle, men kjenne hovedessensen for de
          viktigste.
        </p>

        <ComparisonTable
          headers={["Praksis", "Hva betyr det?", "Hvorfor?"]}
          rows={[
            ["1. Planleggingsspillet", "Kort planleggingsmøte der teamet og kunden sammen velger hvilke user stories som skal bygges i neste iterasjon", "Kunden prioriterer verdi, teamet estimerer kost — sammen finner de optimal pakke"],
            ["2. Korte leveranser", "Lanser fungerende inkrement minst hver 1-2 uker", "Raskere tilbakemelding fra ekte brukere = mindre risiko"],
            ["3. Metafor", "En enkel historie/analogi alle deler om hvordan systemet fungerer (f.eks. 'systemet er en ekspedisjon i fjellet')", "Felles språk på tvers av kunde og utviklere"],
            ["4. Enkel utforming", "Design det enkleste som kan fungere NÅ. Ikke bygg for fremtidige behov.", "YAGNI — du trenger det sannsynligvis ikke"],
            ["5. Testing (TDD)", "Skriv testen før koden. Kjør alle tester ved hver endring.", "Kode uten test 'eksisterer ikke' (Kent Beck)"],
            ["6. Refaktorering", "Forbedre struktur uten å endre funksjonalitet. Hele tiden.", "Holder koden ren — uten dette akkumuleres teknisk gjeld"],
            ["7. Parprogrammering", "To utviklere ved én maskin. Driver skriver, navigator tenker. Bytter roller jevnlig.", "Konstant kodevurdering, deler kunnskap, færre feil"],
            ["8. Kollektivt eierskap", "Alle eier all kode. Hvem som helst kan endre hva som helst.", "Ingen flaskehalser, ingen 'dette er min kode'"],
            ["9. Kontinuerlig integrasjon", "Integrer ny kode flere ganger daglig. Kjør alle tester ved hver integrering.", "Fanger integrasjonsfeil før de blir uoverkommelige"],
            ["10. 40-timers uke", "Ingen overtid. Trette utviklere lager dårligere kode.", "Bærekraftig tempo — XP er en maraton, ikke sprint (paradoks!)"],
            ["11. On-site kunde", "En representant fra kunden sitter med teamet, tilgjengelig for spørsmål", "Beslutninger tas på sekunder, ikke i ukelang epost-tråd"],
            ["12. Kodestandarder", "Alle skriver kode i samme stil (formatering, navngiving)", "Koden ser ut som om én person har skrevet alt — lettere å lese"],
          ]}
        />
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          4. Parprogrammering i dybden
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Parprogrammering — den mest omtalte praksisen"
        defaultOpen={false}
        mustKnow={[
          "TO personer, ÉN datamaskin (V2024-eksamen testet dette ordrett)",
          "Driver skriver, Navigator tenker strategisk og ser problemer",
          "Bytter roller hver 15-30 min — begge må kunne begge roller",
          "ALLE produktive timer er parprogrammering — ikke bare på vanskelige problemer",
        ]}
      >
        <p>
          Parprogrammering er kanskje den mest kontroversielle XP-praksisen — &laquo;dobbel
          kostnad?&raquo; sier mange ledere. Men forskning viser at par leverer 15% mindre kode,
          men med 15% færre feil og betydelig høyere kvalitet — og kunnskap deles automatisk.
        </p>

        <ParprogSvg />

        <h3 className="text-lg font-bold mt-6 mb-3">Driver vs Navigator</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
            <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">Driver</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Holder tastatur og mus</li>
              <li>Skriver koden</li>
              <li>Fokuserer på <strong>taktisk</strong> nivå (syntaks, neste linje)</li>
              <li>Snakker med Navigator om hva han skal skrive</li>
            </ul>
          </div>
          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-4">
            <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">Navigator</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Sitter ved siden av (uten tastatur)</li>
              <li>Tenker <strong>strategisk</strong> nivå (design, edge cases)</li>
              <li>Ser fremover (&laquo;husk vi må også oppdatere X&raquo;)</li>
              <li>Spør &laquo;hva med null-tilfellet?&raquo;</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Bytt roller jevnlig</p>
          <p className="text-sm">
            Begge må kunne begge roller. Bytt hver 15-30 minutter (eller hver gang en test går
            grønn). Slik holder begge fokus, og kunnskapen flyter begge veier.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg text-sm">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Fordeler</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Færre feil — to par øyne</li>
            <li>Konstant kunnskapsoverføring (junior lærer av senior)</li>
            <li>Tøffere mot avbrudd (vanskeligere å la seg distrahere når man jobber sammen)</li>
            <li>Bedre design (man tenker høyt, fanger feil tidlig)</li>
            <li>Code review skjer LIVE — ikke etterpå</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg text-sm">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Fallgruver</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Driver dominerer — Navigator blir passiv. Bytt roller!</li>
            <li>For lange økter — slitsomt. Pauser hver 90 minutter.</li>
            <li>Personlighetsmismatch — par må jobbe sammen.</li>
            <li>Distrahert Navigator (på telefon, slack) — det funker ikke.</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 my-4 rounded-lg text-sm">
          <strong>V2024-eksamen oppgave 3m:</strong> &laquo;Hva er hovedprinsippet bak
          parprogrammering?&raquo; Riktig svar: <em>To utviklere arbeider sammen for å skrive
          kode samtidig.</em> Pass på fellen &laquo;En utvikler arbeider mens den andre observerer
          og gir veiledning&raquo; — det er code review, IKKE parprogrammering.
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          5. Test-drevet utvikling i XP
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="TDD i XP-konteksten"
        defaultOpen={false}
        mustKnow={[
          "TDD er en av XPs viktigste praksiser — Kent Beck skrev både XP og TDD-boken",
          "Red → Green → Refactor (se egen TDD-side for detaljer)",
          "TDD gir både design-fordeler OG sikkerhetsnett — du kan endre kode uten frykt",
          "Krever god isolasjon mellom enheter — fremmer SOLID/GRASP-prinsippene",
        ]}
      >
        <p>
          TDD er ikke unikt for XP, men XP brakte det ut i mainstream. Kent Beck skrev både
          «Extreme Programming Explained» og «Test-Driven Development: By Example» (2002).
        </p>
        <p className="mt-3">
          I XP-konteksten:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 my-2">
          <li>TDD gjøres alltid i par — Driver skriver test, Navigator vurderer</li>
          <li>Hver gang testen blir grønn, bytter man roller</li>
          <li>Etter refactor → integrer (kontinuerlig integrasjon)</li>
          <li>Hvis noen sjekker inn kode som breaker testene, fikser HELE laget med en gang</li>
        </ul>
        <p className="mt-3 text-sm">
          Detaljert dekning av Red-Green-Refactor og test-doubles finner du på{" "}
          <Link href="/dat109/utviklingsmetode/tdd" className="text-sysdev-600 dark:text-sysdev-400 underline">TDD-siden</Link>.
        </p>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          6. Refaktorering
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Refaktorering — kontinuerlig kvalitet"
        defaultOpen={false}
        mustKnow={[
          "Refaktorering = endre struktur UTEN å endre oppførsel",
          "Helst etter hver test som blir grønn — små refaktoreringer kontinuerlig",
          "Krever omfattende testdekning — uten tester tør du ikke å refaktorere",
          "Martin Fowlers bok 'Refactoring' (1999) er standardverket",
        ]}
      >
        <p>
          Refaktorering er <strong>ikke</strong> det samme som omskrivning. Refaktorering endrer
          kun struktur — funksjonaliteten skal være den samme. Eksempler:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 my-2">
          <li><strong>Extract Method</strong>: trekk ut et stykke kode til egen metode</li>
          <li><strong>Rename Variable</strong>: gi noe et bedre navn</li>
          <li><strong>Replace Conditional with Polymorphism</strong>: erstatt if/else med klasse-hierarki</li>
          <li><strong>Move Method</strong>: flytt en metode til riktigere klasse</li>
          <li><strong>Remove Duplication</strong>: trekk ut felles logikk</li>
        </ul>
        <p className="text-sm mt-3">
          XP-regelen: refaktorer <em>hele tiden</em>, i små trinn. Ikke vente med en stor
          &laquo;kode-oppussingsuke&raquo; — det er en antisymptom på at man har slurvet for lenge.
        </p>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          7. Scrum + XP — best practice
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Scrum + XP = best practice"
        defaultOpen={false}
        mustKnow={[
          "Scrum gir rammeverket (roller, sprint, seremonier)",
          "XP gir tekniske praksiser (TDD, parprog, refaktorering, CI)",
          "I praksis bruker mange smidige team begge",
          "Scrum sier IKKE hvordan man koder — derfor passer XP perfekt som komplement",
        ]}
      >
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Slik fungerer kombinasjonen i praksis:</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Sprint Planning</strong> (Scrum) → teamet velger user stories. <strong>Planleggingsspillet</strong> (XP) → estimeres med kunden.</li>
            <li>I sprinten koder teamet med <strong>parprogrammering</strong> (XP) og <strong>TDD</strong> (XP).</li>
            <li>Hver dag holdes <strong>Daily Standup</strong> (Scrum). Hyppig integrasjon (CI, XP) hele dagen.</li>
            <li>Sprinten ender med <strong>Sprint Review</strong> (Scrum) der inkrementet (Scrum) demonstreres til <strong>on-site kunden</strong> (XP).</li>
            <li><strong>Sprint Retrospective</strong> (Scrum) ↔ <strong>refleksjon</strong> (manifest-prinsipp 12) for å forbedre prosessen.</li>
          </ul>
        </div>

        <ComparisonTable
          headers={["Område", "Scrum", "XP"]}
          rows={[
            ["Fokus", "Prosjektledelse, organisering", "Tekniske praksiser, hvordan kode"],
            ["Iterasjon", "Sprint (1-4 uker)", "1-2 uker (raskere)"],
            ["Roller", "PO, SM, Utviklingsteam", "Driver, Navigator (på par-nivå)"],
            ["Kundeinvolvering", "Sprint Review", "On-site kunde (kontinuerlig)"],
            ["Møter", "Planning, Daily, Review, Retro", "Stand-up + ad-hoc spørsmål"],
            ["Dokumentasjon", "Backlogs", "Kodet er dokumentasjon (med tester)"],
          ]}
        />
      </TheorySummary>

      {/* Navigation */}
      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        <Link
          href="/dat109/utviklingsmetode/scrum"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Scrum</p>
          <p className="font-bold mt-1">Scrum</p>
          <p className="text-xs text-[var(--muted)]">Roller, artefakter, sprint-seremonier</p>
        </Link>
        <Link
          href="/dat109/utviklingsmetode/tdd"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">Neste →</p>
          <p className="font-bold mt-1">Test-drevet utvikling (TDD)</p>
          <p className="text-xs text-[var(--muted)]">Red-Green-Refactor, test-doubles, og hvordan TDD påvirker design</p>
        </Link>
      </div>
    </div>
  );
}
