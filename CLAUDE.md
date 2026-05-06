# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Eksamensøving — Semester 4, HVL Bergen

Skreddersydd eksamensøvingsside for fire fag (ING164, DAT110, DAT109, DAT107). Next.js 16 App Router, Tailwind, KaTeX. Deployes automatisk til Vercel ved push til `main`.

## KRITISK REGEL — kjøring og bygg
- ALDRI kjør `npm run dev`, `npm run build`, `npm start` eller `next dev`. Mac-en har 8 GB RAM og krasjer.
- ALDRI start dev-server eller test manuelt i nettleser.
- Eneste lovlige lokale validering: `npx tsc --noEmit`.
- Vercel kjører build automatisk ved `git push`. Byggfeil vises i Vercel-dashbordet og blokkerer deploy.
- For å inspisere faktisk oppførsel: bruk Playwright MCP mot deployed URL — ikke lokal server.

## Materialer (utenfor repoet)
Pensum/PDF-er ligger under `~/Downloads/Studiet/Semester4/materials/<fag>/` — UTENFOR prosjektmappen. Ikke flytt dem inn i `public/`.

Per fag finnes typisk:
- `pdf_fra_professor/` — forelesningsnotater (PENSUM-indikator)
- `bok/` — lærebok (stor; les bare relevante sider, ALDRI hele boken på en gang)
- `obliger/` — obligatoriske innleveringer (oppgavetype-indikator)
- `tidligere_eksamener/` — beste indikator på hva som faktisk kommer på eksamen
- `semesterplan/` — kapitteloversikt og læringsmål

Regel: les kun materialet for kapittelet/temaet du jobber med akkurat nå.

## Arkitektur — det du må vite før du redigerer

### Stack
Next.js 16 App Router · React 18 · TypeScript · Tailwind 3.4 · KaTeX · Framer Motion · Recharts · Vercel Postgres (`@vercel/postgres`) · Anthropic SDK (AI-tutor).

### Auth og fremgangssporing (Postgres, ikke localStorage)
- **Login** — `/login` med ett brukernavn-felt + quick-select. Første gang et brukernavn brukes opprettes det automatisk. Ingen passord — privat gruppe på ~5 brukere.
- **Session** — HMAC-signert cookie `eksamen-auth` (180 dager). Ingen session-tabell. Kode i `src/lib/auth.ts`. Krever `SESSION_SECRET` (≥ 32 tegn, generér med `openssl rand -hex 32`).
- **Middleware** — `src/middleware.ts` redirecter alle ikke-autentiserte requests til `/login` (med `?next=...`), unntatt `/api/auth/*` og statiske ressurser. API-ruter får 401 i stedet for redirect.
- **Database** — Vercel Postgres. To tabeller (`db/schema.sql`, idempotent):
  - `users(id, username)`
  - `page_progress(user_id, page_key)` — én rad per fullført side
- **Env** — `POSTGRES_URL` og `SESSION_SECRET` må være satt både lokalt i `.env.local` og i Vercel env vars.
- **Progress-API** — `src/app/api/progress/route.ts` (les/oppdater) + `src/app/api/progress/migrate/` (engangs-migrering).
- **Konvensjon for `page_key`** — `<fag>/<område>/<slug>` (f.eks. `dat107/sql/joins`, `ing164/kapittel-2/teori`, `dat110/cn-1/oppgaver`, `dat109/modellering/brukstilfelle`). Schema er fag-agnostisk; nye fag adopteres uten endringer.
- **Sporing per fag** — felles via `useProgress()` (Postgres-backed). Tre mønstre:
  - **DAT107** — manuell merking via `CompletionToggle` på hver `[area]/[topic]`-side. Én page key per tema.
  - **ING164 / DAT110** — manuell sjekkliste i `ProgressTracker` (4 seksjoner per kapittel: `teori`, `formler`, `oppgaver`, `visualiseringer`). Page key: `<fag>/<chapter-slug>/<seksjon>`.
  - **DAT109** — automatisk `markCompleted` ved besøk via `DAT109SubNav`. Hver SubNav-segment teller som én page key. Page key: `dat109/<topic-id>/<segment>`.
- **Felles helpers** — `src/lib/subject-progress.ts` har key-generatorer (`ing164ChapterPrefix`, `dat110ChapterPrefix`, `dat109TopicKey`) og totals-funksjoner (`ing164ChapterTotals`, `dat110GroupTotals`, `dat109TopicTotals` osv.). Dashboards leser fra `useProgress().completed` (Set) i stedet for localStorage.
- **`CompletionToggle`** (`src/components/dat107/`) er knappen som markerer en side fullført — kall i hver DAT107-temaside.
- **`ProgressTracker`** (`src/components/`) er sjekklistekomponenten som ING164/DAT110-kapittelsider bruker. Tar `pageKeyPrefix` (f.eks. `ing164/kapittel-2`) og `sections: string[]` (labels) og slugifier label til section slug.
- **`LegacyProgressMigrator`** (`src/components/dat107/`) leser gamle localStorage-nøkler ved første innlogging som `erlend` og upserter dem i Postgres. To flagg: `migrated-dat107-v1` (DAT107) og `migrated-subjects-v1` (ING164 + DAT110). DAT109 hadde ingen reell localStorage-skriving, så ingen migrering.

### Ruteoppbygging per fag
Hvert fag følger sitt eget mønster — ikke standardiser dem mot hverandre:

- **ING164** (`src/app/ing164/`) — kapittelbasert (`kapittel-2`, `kapittel-3`, …, `kapittel-29`). Hver kapittelmappe har `page.tsx`, `teori/`, `formler/`, `oppgaver/`, `visualiseringer/`, `kilder/`. Eksamensoppgaver per kapittel ligger i `src/app/ing164/eksamen/oppgaver/kapittel-N/exercises.tsx` (egen `ExerciseContent`-struktur).
- **DAT110** (`src/app/dat110/`) — kapittelspor `cn-*` (Computer Networking) og `ds-*` (Distributed Systems) + egne områder for `eksamen`, `obliger`, `oppsummering`.
- **DAT109** (`src/app/dat109/`) — temabaserte toppdeler: `modellering`, `ooa-ood`, `oop`, `utviklingsmetode`, `oppsummering`, `eksamen`. DAT109 er referansen for pedagogisk kvalitet.
- **DAT107** (`src/app/dat107/`) — én dynamisk rute `[area]/[topic]` renderer alle 58 tema fra Markdown. Sju områder: `sql`, `modellering`, `jpa`, `nosql`, `obliger`, `eksamen-gjengangere`, `originale-eksamen`. All metadata i `src/lib/dat107.ts`.

### DAT107 innholdspipeline
```
DAT107-structured/<emne>/*.md    (kildegrunnlag — ikke endre fra siden)
        │
        ▼  ASCII-slug-normalisering (æøå → ASCII)
src/content/dat107/<area>/<slug>.md
        │
        ▼
src/components/Markdown.tsx     (avhengighetsfri renderer + pedagogiske callouts)
        │
        ▼
[area]/[topic]/page.tsx         (dynamisk Next.js-rute)
```
- `src/lib/dat107.ts` er **ene kilden til sannhet** for navigasjon (slug, tittel, beskrivelse, filnavn, faser, mustKnow).
- `Markdown.tsx` støtter h1-h3, paragrafer, lister, fenced code, inline `code`, `**bold**`, rørseparerte tabeller — uten npm-avhengighet. Auto-konverterer kjente h2-titler (`## Kjernen`, `## Vanlige feil` osv.) til fargede callouts og støtter GitHub `> [!VIKTIG]`-syntaks.
- Visuelle shortcodes (`::er-cardinality-diagram::`, `::sql-join-diagram::`, `::jpa-relationship-diagram::`, `::document-vs-relational-diagram::`) registreres i `Markdown.tsx` (`VisualComponentName`, `parseComponentLine`, `renderBlock`).

### Sentrale komponenter
- `Markdown.tsx` — DAT107-renderer (over).
- `TheorySummary.tsx` — strukturert teorisammendrag-komponent (referanse: DAT109/modellering). Brukes når Markdown blir for grunt.
- `FormulaBox.tsx`, `InlineLatex.tsx` — KaTeX wrappers. **All matematikk bruker KaTeX**; aldri plaintext-formler. Inline: `\( ... \)`, blokk: `\[ ... \]`.
- `OppgavetekstBox.tsx`, `ExerciseCard.tsx` — oppgavevisning med "Vis/skjul løsning".
- `ChapterLayout.tsx`, `DAT110ChapterLayout.tsx`, `ChapterSubNav.tsx`, `OppgaveSubNav.tsx`, `SectionNav.tsx` — layout-skall per fag.
- `ProgressProvider.tsx`, `ProgressTracker.tsx` — fremgangs-context og rendring.
- `AITutor/` — Anthropic-basert sidepanel-tutor; backend i `src/app/api/chat/route.ts`, prompts i `src/lib/tutor-prompts.ts`, kontekst i `src/lib/page-context.ts`.
- `ThemeToggle.tsx` — mørkt/lyst tema. Faste tema-tokens i `src/app/globals.css`.

### Designidentitet og fargekoding
- ING164 = rød/oransje · DAT110 = blå · DAT109 = grønn · DAT107 = lilla (Tailwind `dat107` 50–900, `a855f7` som 500-fargen).
- Mørkt/lyst tema-toggle aktiv overalt; mobilresponsivt.
- **Dark mode-regel**: gradient-kort må bruke sterk opasitet (`dark:from-*950/70 dark:to-*950/50` eller mer). Indre stats-kort: `bg-white/80 dark:bg-neutral-900/90` med eksplisitt `text-neutral-700 dark:text-neutral-200` for labels og `text-neutral-900 dark:text-neutral-50` for hovedtekst — ikke `text-[var(--muted)]` alene (gir for dårlig kontrast i dark mode).

## Pedagogisk rolle og innholdskrav

Du underviser én student (Erlend) mot eksamen. Stil: Harvard-professor + verdensledende pedagog + ekspert på interaktive visualiseringer.

### Prinsipper du ALLTID følger
- **HVORFOR, ikke bare HVA** — gi intuisjon bak formlene
- **Bygg broer** — koble nytt stoff til noe studenten allerede kan
- **Vis, ikke fortell** — interaktive visualiseringer / SVG / animasjoner der det hjelper forståelsen
- **Eksempler** — alltid 2-3 gjennomgåtte eksempler per tema, steg for steg
- **Generaliser** — etter eksempler, vis den generelle strategien
- **Analogier** — særlig lineær ↔ rotasjon i mekanikk
- **Vanlige feil** — påpek typiske feil og hvordan unngå dem
- **Sammenhenger** — på tvers av kapitler

### Oppgaver og eksempler skal ha (denne strukturen)
1. Oppgavetekst
2. Hva vet vi? — gitte størrelser
3. Hva skal vi finne? — ukjente
4. Hvilke formler/prinsipper bruker vi? — verktøyvalg
5. Steg-for-steg løsning med forklaring av hvert steg
6. Svar med riktig enhet og antall gjeldende siffer
7. Hva lærte vi? — kort oppsummering

For ING164 i `src/app/ing164/eksamen/oppgaver/kapittel-N/exercises.tsx` finnes ferdig `ExerciseContent`-mal: `problem`, `knowns`, `unknowns`, `strategy`, `hints`, `solution`, `alternativeSolution`, `summary`, `difficulty`, `pageRef`.

### Interaktive visualiseringer skal
- la brukeren endre parametere og se resultatet live
- vise krefter, hastigheter, felt etc. som vektorer/piler
- animere dynamiske prosesser (rotasjon, kollisjoner, bølger)
- ha tydelige labels og farger
- være pedagogiske, ikke bare pene

## Innholdsmal for kapittelside (typisk for ING164)
1. **Teorisammendrag** — pedagogiske forklaringer, definisjons-bokser, "Hva du MÅ kunne"-liste
2. **Formler** — KaTeX, fargekodet (gull = viktigst, blå = sekundær), "når bruker du hva"-guide, variabelforklaringer
3. **Interaktive visualiseringer** — SVG/Canvas med parametere
4. **Gjennomgåtte eksempler** — minst 2-3 per tema, fra forelesning og bok, med vis/skjul-løsning
5. **Oppgavestrategier** — generelle oppskrifter, sjekklister
6. **Øvingsoppgaver** — fra obliger og selvgenererte; hint-system [Hint 1] → [Hint 2] → [Vis løsning]
7. **Eksamensoppgaver** — fra tidligere eksamener, sortert per tema, fullstendige løsningsforslag, "Eksamenstips"-bokser

For DAT107 brukes dette mønsteret der det er naturlig; "kapittel" tolkes som "temaområde". `Originale eksamen` skal IKKE omformes til vanlige teorisider — bevares som kildetro spor.

## Per-fag detaljer

### ING164 Fysikk — PRIORITET
**Kapitler:** Bevegelse (2, 3) · Mekanikk (4, 5, 6, 7, 8, 9, 10) · E&M (21, 23, 24, 27, 28, 29).
Bok: Young & Freedman *University Physics* 15th ed.

### DAT110 Nettverksteknologi og distribuerte systemer
To bøker: **CN** (Computer Networking — eldre versjon, supplér med oppdatert info) og **DS** (Distributed Systems).
Materialer: `~/Downloads/Studiet/Semester4/materials/dat110/`.
- Les `semesterplan/` FØRST for å se hvilke kapitler/seksjoner fra hver bok som er pensum.
- `pdf_fra_professor/` dekker ikke alt — fyll inn med egen kunnskap.
- `exercises/` finnes ikke for alt — lag egne oppgaver i eksamensstil.
- `tidligere_eksamener/` viser TYPISK eksamensstil — analyser mønsteret.
- Eksamensoppgave 2 handler alltid om en oblig — gå gjennom `obliger/`.

### DAT109 Systemutvikling
Skriftlig eksamen, 4 deler:
- Modellering ~40 % — brukstilfellemodell, domenemodell, sekvensdiagram
- OOA og OOD ~20 % — SOLID, GRASP
- Utviklingsmetode ~20 % — Scrum, XP, TDD, CI/CD, AUP
- OOP ~20 % — Java fra UML

Materialer: `~/Downloads/Studiet/Semester4/materials/dat109/` (`pdf_fra_professor/`, `eksamensoppgaver/` (7 sett), `obliger/`, `bøker/`, `semesterplan/`, `tidligereoppsummeringer/`). Noen filer er `.docx`.
- Eksamen har flervalg på oppgave 2 og 3 (fra 2023+)
- Professorens YouTube-spilleliste: https://www.youtube.com/playlist?list=PL5NmklOJ5QnwbqMHcERe9G6fVCE5vf6qq

Regler:
- Professorens PDF-er viser HANS måte (kan avvike fra YouTube/nett) — sammenlign alltid med eksamensfasit.
- Iterative eksempler i PDF-ene (monopol, stigespill) — tidlige versjoner er IKKE fasit.
- Brukstilfellemodellen skal IKKE være et flytdiagram.
- Domenemodellen skal ALDRI inneholde metoder.
- Sekvensdiagram skal samsvare med brukstilfellebeskrivelsen.
- Prioriter de NYESTE eksamenene (mest representative).

### DAT107 Databaser
Implementert som hovedfag på samme nivå som de andre. Sju områder (i `src/lib/dat107.ts`), 58 tema:
- **Teori**: `sql`, `modellering` (~25 % av eksamen), `jpa`, `nosql`
- **Praksis**: `obliger`
- **Eksamen** (to ADSKILTE spor — slå dem ALDRI sammen):
  - `eksamen-gjengangere` — bearbeidet analyse (ravgul aksent)
  - `originale-eksamen` — kildetro Markdown av originale PDF-sett (rød aksent)

Pedagogisk: skal bygges i samme mønster som DAT109. Dashbordet (`src/app/dat107/page.tsx`) viser progress per område via `localStorage`-nøkkel `progress-dat107-<area>` (legacy) — migrert til Postgres via `LegacyProgressMigrator`. Besøk registreres av `VisitTracker.tsx` på hver temaside. Områdesiden viser "Dette må du kunne"-boks fra `mustKnow`-feltet.

`DAT107-structured/` er innholdskilden og skal ikke endres direkte. Når kilden oppdateres kopieres endringene over til `src/content/dat107/` med slug-normaliserte filnavn.

## Innholdsregler
- Alt innhold er på **norsk (bokmål)**.
- All matematikk bruker **KaTeX** — aldri plaintext-formler.
- Komma-desimaler i norsk tekst (`12,0` ikke `12.0`).
- Les KUN materialet for det kapittelet/temaet du jobber med nå. ALDRI hele boken på en gang.
- Commit etter hvert ferdig kapittel/tema — små, gjennomtenkte commits.

## Legge til nytt tema i DAT107
1. Markdown-fil under `src/content/dat107/<area>/<slug>.md` (ASCII-slug).
2. Metadata (slug, tittel, beskrivelse, filnavn) i rett `topics[]`-array i `src/lib/dat107.ts`.
3. Evt. legg til i en `phase` for fasegruppering på områdesiden.
4. `npx tsc --noEmit` for å verifisere.
5. Commit og push — Vercel bygger automatisk.

## Bilder og diagrammer
- DAT107-bilder i `public/content/dat107/assets/<area>/`, lenkes med public path.
- For gjenbrukbare/responsive forklaringer: lag React/SVG-komponent i `src/components/dat107/` og registrer som shortcode i `Markdown.tsx`.
- Hold shortcodes sjeldne og faglig begrunnet — ikke pynt.
