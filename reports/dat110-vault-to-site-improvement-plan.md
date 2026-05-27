---
date: 2026-05-27
status: PLAN-ONLY (no implementation, no code changes)
scope: How to use DAT110 Obsidian-vault v1 to improve /dat110 on eksamen-prep
author: planning pass
related_repos:
  - /home/skjold/dev/projects/eksamen-prep  (Next.js 16 app)
  - /home/skjold/ObsidianVault/DAT110       (LLM-wiki v1, locked 2026-05-27)
constraints:
  - no code changes
  - no commits
  - no pushes
  - no changes to vault
  - no changes to eksamen-prep
---

# DAT110 vault → site improvement plan

## 0. TL;DR

DAT110-siden er i dag chapter-skall (15 kapitler, 4 underseksjoner hver, hardkodet innhold i `page.tsx`). DAT109 er pedagogisk gull-standard (full quiz/flashcard/matching/exam-sim-loop med ren TypeScript-data-modell). DAT110-vaulten er en moden LLM-wiki med 21 topics, 72 concepts, 87 source-notes, 4 exam-pattern-aggregations, 12 quizzes (125 spørsmål) og 5+1 eksamener — alt linkbart og lint-validert.

**Hovedforslag:** Bygg DAT110-siden i to lag, uten å rive ned eksisterende chapter-struktur:

1. **Lag 1 — eksamen-loop + Tier 1-konseptsider (P0):** Quiz inspirert av DAT109 + exam-pattern-cards + 5 Tier 1-konseptsider (chord/overlay/IP/delay/DS-fundamentals) som quizzen kan lenke til. Hvert quiz-spørsmål får pedagogisk feedback ved riktig OG galt svar, med blå "Les mer"-lenker (ikke rotete sourceRefs inline).
2. **Lag 2 — full wiki-navigasjon (P1):** Resterende 16 topics + 67 concepts + exam-browser. Stable, type-safe, copyright-respekterende.

P0 lar deg ha DAT110 quiz live på Vercel med ekte pedagogisk loop innen én batch.

## 0.1 Approved decisions (2026-05-27)

| # | Beslutning | Status |
|---|---|---|
| §10.1 | Slug-språk: **norsk** (`/dat110/temaer/`, `/dat110/begreper/`, `/dat110/eksamen/gjengangere/`) | ✅ |
| §10.2 | Quiz-stil: **DAT109-mønster med topic-selector** fra P0 | ✅ |
| §10.3 | SourceRefs: **IKKE rotete inline-visning** i quiz; expandable "Kilder og grunnlag" på concept/topic/exam-pattern-sider | ✅ |
| §10.4 | Reconstructed 06-2025: **brukes som øvingskilde** med tydelig `reconstructed_from_sensor`-banner; aldri kalt "offisiell" eller "original" | ✅ |
| §10.5 | Exam-patterns i fokus: **typisk eksamensstruktur + recurring patterns + Q-slot-oppdeling** publiseres som hoved-pedagogisk-konsept | ✅ |
| §10.6 | Sync-trigger: **manuell `npm run sync:dat110-vault`** (ikke GHA, ikke pre-commit-hook) | ✅ |
| §10.7 | Data-format: **JSON** i `src/data/dat110-vault/` (ikke markdown-mirror) | ✅ |
| §10.8 | Concept→quiz-mapping: **manuell for Tier 1 / P0**; auto/fuzzy kun som forslag, ikke endelig | ✅ |
| §10.9 | Multiple-answers scoring: **alt-eller-ingenting**, men spørsmål må ikke bli for lette — se §5.7 distraktor-policy | ✅ |
| §10.10 | Feedback-forfatting: **hybrid** — Claude AI-draft per spørsmål, brukeren reviewer før push | ✅ |
| §10.11 | Eksamen-anchors: **concept-baserte** (`#chord-dht`, `#overlay-multicast`, `#ip-forwarding`, `#delay`, `#ds-fundamentals`), ikke `#q10` | ✅ |
| §10.12 | Build-validering: **strict** — `validate-learnmore-links.mjs` feiler build på døde lenker | ✅ |
| §10.13 | Exam-patterns + eksamener: **P0 starter med 1 offisiell eksamen**, deretter resterende eksamener, deretter utvider gjengangere-siden. Reconstructed 06-2025 etter P0. | ✅ |
| §10.14 | Pensum-PDFene: **kun autoritative offline-referanser**; kort manuelt-skrevet "Pensum og rammeverk"-seksjon på `/dat110` (egne ord, ikke PDF-gjengivelse) | ✅ |
| §10.15 | Manuell-review-flow: **draft i `quiz-feedback-drafts.json`** (committed), reviewed kopieres til `quiz-feedback-overrides.json` (canonical), CI warn (ikke fail) hvis Tier 1 mangler override | ✅ |
| §10.16 | V2024 solution-data: **inline `fullSensorTemplate` i `exams/v2024.json`** i P0 (enkelhet); refactor til lazy-load i P1 hvis bundle blir issue | ✅ |
| §10.17 | Eksamen-spørsmål i quiz-pulten: **nei i P0** — hold quiz adskilt fra eksamen-spørsmål. Vurder i P1 etter brukermønstre | ✅ |
| §10.18 | `/dat110/eksamen`-listing i P0: **V2024 + 4 "Kommer i P1"-cards i disabled-stil** — viser fullstendig roadmap | ✅ |

**Nytt pedagogisk-prinsipp i P0** (presisering): Quiz-feedback skal være pedagogisk — ikke bare "riktig/galt + source-lenke". Hvert spørsmål skal:
- Vise umiddelbar feedback ("Riktig!" / "Ikke helt.")
- Forklare hvorfor riktig svar er riktig (kort, 1-3 setninger)
- Forklare kort hvorfor de viktigste feilalternativene ikke stemmer
- Ha 1-3 blå "Les mer"-lenker til relevante DAT110-sider (`/dat110/begreper/[slug]`, `/dat110/temaer/[slug]`, `/dat110/eksamen/gjengangere`)
- Aldri vise rotete inline sourceRefs eller Obsidian-paths

## 0.2 Autoritative pensum-kilder (vault)

Pensum- og semesterplandokumentene ligger lokalt i vaulten:

- `/home/skjold/ObsidianVault/DAT110/pensum/DAT110 - pensum 2026.pdf`
- `/home/skjold/ObsidianVault/DAT110/pensum/DAT110_tentative_semesterplan_2026.pdf`
- `/home/skjold/ObsidianVault/DAT110/pensum/OppskriftLevereSomGruppe.pdf` (prosjekt-rammeverk)
- `/home/skjold/ObsidianVault/DAT110/pensum/Referatmal møte i referansegruppe.pdf` (referansegruppe-mal)

**Bekreftet av disse dokumentene:**
- Utvalgte kapitler/seksjoner fra Kurose-Ross + Van Steen-Tanenbaum er pensum (chapter-maps i `processed/extracted/book-chapter-maps/` matcher)
- Prosjekt 1, 2, 3 er obligatoriske (matcher `sources/dat110-project{1,2,3}-readme`)
- Alle quizer (Task 2-14) er relevante (matcher 12 quiz-source-notes)
- Labøvinger anbefales (matcher `sources/dat110-l*-exercises`)
- Forelesningsslides er relevante (matcher 24 lecture-canonical source-notes)
- Semesterplan kobler temaer + uker + prosjektarbeid

**Konsekvens for planen:** Pensum-PDFene er **autoritative referanser** for hva som er i scope. De skal IKKE publiseres på web (forfatterens copyright på selve PDF-layout/-formulering), men deres innhold-claims er allerede speilet i vault-inventaret. Sync-pipelinen trenger ikke importere disse PDFene; de fungerer som offline-sjekk når vi beslutter "er denne X i pensum?"

**Ikke-baser pipeline på `/mnt/data`-versjoner** (de var bare opplastet til chat for review; vault er kanonisk).

**Nytt pedagogisk-prinsipp i P0** (presisering): Quiz-feedback skal være pedagogisk — ikke bare "riktig/galt + source-lenke". Hvert spørsmål skal:
- Vise umiddelbar feedback ("Riktig!" / "Ikke helt.")
- Forklare hvorfor riktig svar er riktig (kort, 1-3 setninger)
- Forklare kort hvorfor de viktigste feilalternativene ikke stemmer
- Ha 1-3 blå "Les mer"-lenker til relevante DAT110-sider (`/dat110/begreper/[slug]`, `/dat110/temaer/[slug]`, `/dat110/eksamen/gjengangere`)
- Aldri vise rotete inline sourceRefs eller Obsidian-paths

Dette gjør at quizzen blir en aktiv-rekall-loop med "scaffold til forklaringssiden", ikke bare et test-verktøy.

## 1. Nåværende DAT110-status (kodebase + deploy)

### 1.1 Hva finnes nå

**Route-inventar** (under `src/app/dat110/`):

| Route | Filtype | Hva renderer |
|---|---|---|
| `/dat110` | `page.tsx` (376 linjer, client component) | Dashboard: 2 quick-link-cards + 10 eksamen-oppgave-cards (collapsible) + 15 chapter-cards (CN + DS, collapsible) |
| `/dat110/cn-1` … `/cn-8` | `page.tsx` per chapter (7 kapitler, CN-7 hoppet over) | Per-chapter intro + 4 SubPage-cards (teori/formler/oppgaver/visualiseringer) + tema-bullets + eksamenstips-callout |
| `/dat110/ds-1` … `/ds-8` | tilsvarende | 8 kapitler, samme struktur |
| `/dat110/cn-N/teori`, `formler`, `oppgaver`, `visualiseringer` | individuelle pages | Hardkodet innhold per chapter, dybde varierer |
| `/dat110/eksamenoving` | `page.tsx` | Container, lenker til 10 `oppg-N`-sider |
| `/dat110/eksamenoving/oppg-1` … `oppg-10` | individuelle pages | Per-eksamen-slot-øving |
| `/dat110/obliger` | `page.tsx` | Oversikt over obligatoriske prosjekter |
| `/dat110/eksamen` | `page.tsx` | Eksamen-oversikt |
| `/dat110/oppsummering` | `page.tsx` | Sammendragsside |

**Data-kilde:** `src/lib/dat110-chapters.ts` (176 linjer) — TypeScript const array med `DAT110Chapter`-objekter. Ingen ekstern datafil, ingen markdown-pipeline.

**Progress-modell:** Postgres `page_progress`-tabell med page-key `dat110/<chapter-slug>/<section>` (f.eks. `dat110/cn-1/teori`). Aggregeres via `dat110ChapterTotals` + `dat110GroupTotals` i `src/lib/subject-progress.ts:94-133`.

### 1.2 Svakheter (sammenlignet med DAT109 + vault)

| Svakhet | Konsekvens | Detalj |
|---|---|---|
| **Hardkodet innhold i `page.tsx`** | Vanskelig å oppdatere, DRY-brudd | Tema-bullets + eksamenstips ligger inline per chapter; ingen content-pipeline |
| **Ingen interaktiv quiz på DAT110** | Ingen aktiv-rekall-loop | DAT109 har full QuizRunner; DAT110 har bare statisk eksamenstips-callout |
| **Ingen quizdata-pipeline** | Kan ikke gjenbruke 125 Canvas-spørsmål | Vault har `processed/extracted/quizzes/*.json`, ingen import i app |
| **Eksamen-oppgaver er enkelt-sider, ikke pattern-aggregert** | Mister cross-eksamen-mønstre | Vault har `exam-patterns/recurring-questions.md` med Tier 1-mønstre (Q10 Chord 6/6, Q8 Overlay 6/6, Q6 IP 5/5, etc.) — usynlig for siden |
| **Ingen konsept-/topic-sider** | Ingen "klikk på chord-ring for å forstå begrep" | Vault har 21 topics + 72 concepts; ingen ende-til-ende-rute i app |
| **Dark-mode-risiko** | Mulig dårlig kontrast på cards | `CLAUDE.md:87-90` advarer eksplisitt om at gradient-cards trenger eksplisitte `dark:`-classes; DAT110-dashboard (376 linjer) ikke audited her |
| **Ingen source-traceability** | Bruker ser ikke hvor info kommer fra | Vault har full traceability (source-notes → topics → concepts); siden viser ingenting |
| **Reconstructed 06-2025 ikke representert** | Bruker vet ikke at det finnes øvingskilde fra sensor | Vault har explicit warning-banner i source-note; siden har ingen mekanisme |
| **Ingen exam-pattern-layer på siden** | Mister 4 aggregations-sider med Tier 1-prioritering | `recurring-questions.md`, `sensorveiledning-themes.md`, `quiz-concept-coverage.md`, `concept-frequency.md` — alle usynlige |

### 1.3 Teknisk struktur

- **Framework:** Next.js 16.2.3 App Router + React 18.3 + TypeScript 5.7 + Tailwind 3.4
- **Auth:** Custom HMAC-signed cookie (`src/lib/auth.ts`), brukernavn-only login, ingen passord. Middleware (`src/middleware.ts:1-47`) beskytter alle ruter unntatt `/login` + `/api/auth/*`
- **Hosting:** Vercel (auto-deploy på push til `main`)
- **Postgres:** `@vercel/postgres`, schema i `db/schema.sql` (2 tabeller: `users`, `page_progress`)
- **AI Tutor:** `@anthropic-ai/sdk` 0.90.0, sidepanel via `src/components/AITutor/`
- **Markdown:** Custom parser i `src/components/Markdown.tsx` (~600 linjer) — DAT107 bruker det. Ingen npm-avhengighet for parsing
- **Math:** KaTeX 0.16 + remark-math + rehype-katex (men `Markdown.tsx` er custom, så KaTeX-integrasjon må verifiseres)

### 1.4 Design/UX-status

- **Layout:** Dashboard-cards med Tailwind, collapsible-seksjoner, color-coded per kategori (CN = `network` palette/blå, DS = pure blå)
- **Navigation:** `Navigation.tsx` (sidebar/header) + `ChapterSubNav.tsx` + `OppgaveSubNav.tsx`
- **Theme:** CSS-variables (`globals.css:6-22`) + `.dark`-class på `<html>`. `ThemeToggle.tsx` styrer
- **Cards:** `bg-card` + `border-card-border` + Tailwind utility-classes. Konsistent på tvers av fag

### 1.5 Dark-mode-risikoer (eksplisitte fra CLAUDE.md)

Per `eksamen-prep/CLAUDE.md:87-90`:
- **Gradient-cards** må ha eksplisitt `dark:from-* dark:to-*` (ikke bare CSS-var)
- **Stats labels + values** må ha `text-neutral-700 dark:text-neutral-200` (ikke bare `text-[var(--muted)]`)
- **KaTeX** har egen `.dark .katex { color: var(--foreground) }`-regel

Implikasjon for DAT110-utvidelse: alle nye cards/badges/callouts må følge dette mønsteret eksplisitt.

## 2. Inspirasjon fra DAT109 og ING164

### 2.1 DAT109 quiz — gull-standard

**Route:** `/dat109/oving/quiz` → `src/app/dat109/oving/quiz/page.tsx`

**Komponent-tre:**
```
QuizRunner (state machine: select → running → done)
├─ TopicSelector (checkboxes, real-exams-only filter, shuffle, target-count)
├─ QuizCard (per-question render + answer-handling, live-score)
└─ QuizResults (final-score, per-topic-breakdown, retry full / retry wrong-only)
```

**Data-shape** (`src/lib/quiz-types.ts:34-49`):
```ts
interface QuizQuestion {
  id: string;
  topic: QuizTopic;        // enum: 14 topics
  source: QuizSource;      // H2020 | V2021-V2024 | KontH2022 | generated
  question: string;
  options: string[];       // [A, B, C, D]
  correctIndex: number;
  explanation: string;     // ALLTID vist etter svar
  whyWrong?: string[];     // per-option-forklaring (optional)
  difficulty?: "easy" | "medium" | "hard";
  pensumRef?: string;      // f.eks. "F06 slide 70"
}
```

**Pedagogiske mønstre verdt å kopiere:**
1. **Topic-filter før start** — bruker velger hvilke temaer som skal være med
2. **Shuffle av options** per spørsmål (motvirker pugging av posisjon)
3. **Explanation vises kun ETTER svar** — never spoilers
4. **Retry-wrong-only** — øker fokus mot svake områder uten å droppe hele quizzen
5. **Per-topic-breakdown** i results — bruker ser hvor hen står
6. **Source-tag på spørsmål** — viser hvilken eksamen/quiz spørsmålet er fra

**Hva som IKKE bør kopieres:**
- DAT109 lagrer all data i én stor `generated.ts` (~2500 linjer) + `exam-extracted.ts` (~1200 linjer). For DAT110 anbefales splitting per tema/eksamen for bedre skalering og review-friendliness
- DAT109 har ikke source-note-traceability — vi har det i vault, så DAT110 bør utnytte det

### 2.2 DAT109 øvrige patterns

- **Flashcard-deck** (`FlashcardDeck.tsx`) — flip-mekanikk, kan brukes for DAT110-konsepter
- **Matching-game** (`MatchingGame.tsx`) — drag/drop konsept ↔ definisjon, passer for f.eks. "match transport-mechanism ↔ delay-type"
- **ExamSimulator** (`ExamSimulator.tsx`) — timed full eksamen, passer veldig godt for DAT110 (5 + 1 reconstructed eksamener tilgjengelig)

### 2.3 ING164-patterns

- **Chapter-layout med 5 subseksjoner** (teori/formler/oppgaver/visualiseringer/kilder) — DAT110 har bare 4 (mangler `kilder/`). Med vault som datakilde kan vi nå legge til kilder-seksjon med automatisk source-note-listing.
- **Categorical collapse** (Bevegelse, Mekanikk, Rotasjon, E&M) — DAT110 har allerede CN/DS-split; samme mønster fungerer.

## 3. Hvordan DAT110-vaulten bør brukes

### 3.1 Beste vault-filer som datakilde

**Per-vekt prioritert:**

| Vault-fil | Bruk i app | Prioritet |
|---|---|---|
| `processed/reviewed/exam-patterns/recurring-questions.md` | Eksamen-mønster-cards på DAT110-dashboard | **P0** |
| `processed/reviewed/exam-patterns/concept-frequency.md` | Tier 1-konsept-prioritering på dashboard + per-tema | **P0** |
| `processed/reviewed/exam-patterns/sensorveiledning-themes.md` | "Sensor-templates"-side, viser svarmønstre | **P1** |
| `processed/reviewed/exam-patterns/quiz-concept-coverage.md` | Mapping quiz → konsept, brukes i quiz-side for filter | **P1** |
| `processed/extracted/quizzes/dat110-quiz-task-*.json` | **Hovedkilde for quiz-data** (125 spørsmål, 12 quizzes) | **P0** |
| `processed/extracted/exams/dat110-eksamen-*.json` | Eksamen-spørsmål-browser, exam-simulator | **P1** |
| `processed/reviewed/topics/*.md` (21 stk) | `/dat110/temaer/[slug]`-sider | **P1** |
| `processed/reviewed/concepts/*.md` (72 stk) | `/dat110/begreper/[slug]`-sider | **P1** |
| `processed/reviewed/sources/*.md` (87 stk) | Source-tag på spørsmål + "kilder"-tab per chapter | **P1** |
| `dat110-eksamen-06-2025-reconstructed.md` | Eksamen-card med warning-banner | **P0** |
| `processed/reviewed/index.md` | "Wiki-oversikt"-side (mirror av Obsidian-index) | **P2** |
| `processed/reviewed/log.md` | "Build-history"-side (åpenhet om hvordan wiki er bygget) | **P2** |

### 3.2 Konsept- og exam-pattern-prioritering for P0

Fra `concept-frequency.md` Tier 1 (5/5 eksamen-hit) + `recurring-questions.md` (Q-slot-stabilitet):

**Topp-5 konsepter for P0** (vekt × stabilitet × pensum-bredde):

1. **Chord DHT / `chord-ring`** — Q10 (15% vekt, 6/6 hit). Spørsmål om finger-table-konstruksjon + key-resolution + fault-tolerance/scalability
2. **Overlay multicast / `application-layer-multicast`** — Q8 (10%, 6/6). RDP + tree-cost
3. **IP forwarding / `ipv4-addressing` + `subnetting` + `arp-and-mac-addressing`** — Q6 (10%, 5/5). DHCP + ARP + longest-prefix-matching
4. **Delay / `delays`** — Q3 (10%, 4/5). dtrans + dprop + dqueue + sum
5. **DS-fundamentals / `transparency`** — Q7 (5%, 5/5 sensor-coverage). 6 transparency-typer

**Total dekning av P0-konsepter:** ~50% av eksamen-vekt med kun 5 konsept-bunter.

### 3.3 Source/page-mapping internt

**Forslag — `src/lib/dat110-vault/types.ts`** (ny fil):

```ts
// 1:1-mapping av vault-frontmatter til app-types
export interface VaultTopic {
  type: "topic";
  slug: string;
  tema: string;
  status: "drafted" | "reviewed";
  supported_by: string[];     // source-slugs
  related_topics: string[];   // topic-slugs
  related_concepts: string[]; // concept-slugs
  created: string;
  body: string;               // markdown-body etter frontmatter
}

export interface VaultConcept {
  type: "concept";
  slug: string;
  tema: string;
  sections: string[];
  supported_by: string[];
  related_topics: string[];
  related_concepts: string[];
  created: string;
  body: string;
}

export interface VaultSource {
  type: "source";
  slug: string;
  source_kind: "pdf" | "html" | "markdown" | "reconstructed_exam";
  role: string;
  copyright_sensitive: boolean;
  local_only?: boolean;       // hvis true → IKKE eksponer body/extracted
  cite_in_wiki?: boolean;
  priority: "high" | "medium" | "low" | "reference";
  status: "reviewed" | "drafted";
  // Exam-specifikke felter
  exam_year?: number;
  exam_session?: string;
  paired_with?: string;
  pair_status?: "complete" | "incomplete" | "reconstructed_from_incomplete_pair";
  official_exam_pdf_missing?: boolean;
  // Quiz-specifikke felter
  task_number?: number;
  question_count?: number;
  // Reconstructed-spesifikt
  based_on?: string;
  body: string;
}

export interface ExamPattern {
  type: "exam-pattern";
  slug: string;
  exam_pattern_aggregation: true;
  aggregation_scope: string;
  body: string;
}
```

**Build-time-pipeline** (forslag, ny `scripts/sync-vault.mjs`):

1. Les vault-frontmatter + body fra `~/ObsidianVault/DAT110/processed/reviewed/{topics,concepts,sources,exam-patterns}/*.md`
2. Filtrer ut `local_only: true`-sources før eksport
3. For andre sources: eksporter frontmatter-metadata + caveat-felt — IKKE full body
4. Parse wikilinks `[[topics/x]]` → konverter til `/dat110/temaer/x`
5. Output: `src/data/dat110-vault/{topics,concepts,sources,exam-patterns}.json` (static, sjekket inn i git)

**Hvorfor build-time istedenfor runtime?**
- Vault-filer er utenfor repo (i `~/ObsidianVault`), ikke tilgjengelig på Vercel
- Statisk JSON gir samme content til alle, ingen runtime-overhead
- Mulig å versjonere data-snapshots i git

**Alternativ:** Kopier hele `processed/reviewed/` inn i `src/content/dat110/` ved build-tid, behold som markdown, parse on-demand. Mindre fleksibelt for type-safety men mer "Obsidian-friendly" hvis du noensinne vil dele vault offentlig.

### 3.4 Copyright/local-only-filtrering

**Hard rule:** 6 source-notes har `local_only: true` eller `copyright_sensitive: true` uten cite-tillatelse:
1. `dat110-mqtt` (Egli)
2. `dat110-guest-mqtt-bridge-slides` (Lima)
3. `dat110-guest-mqtt-bridge-paper` (arXiv)
4. `chapters-1-2-bagha-madisetti-cloud-computing` (Pearson)
5. `bagha-madisetti-iot-book` (Pearson)
6. `load-balancing-vm-survey` (Wiley)

**Pluss bok-chapter-maps:**
- `kurose-ross-cn8e.json` — local-only metadata
- `vansteen-tanenbaum-ds4e.json` — local-only metadata

**Hvordan filtrere:**

```ts
// I sync-vault-pipeline
const SAFE_SOURCES = vaultSources.filter(s => 
  !s.local_only && !(s.copyright_sensitive && !s.cite_in_wiki)
);

// I siden — selv hvis source vises som referanse, eksponer aldri body
const renderSource = (s: VaultSource) => ({
  slug: s.slug,
  title: s.title,
  role: s.role,
  ...(s.local_only ? {} : { body: s.body }),
  // Citation-info OK selv for local_only:
  citation: s.citation,
});
```

**CI-guardrail:** Legg til `npm run lint:copyright` (ny) som sjekker:
- Ingen body-content fra `local_only`-sources i `src/data/dat110-vault/`
- Ingen verbatim-strings > 30 ord fra `processed/extracted/markdown/` for copyright-sensitive sources

### 3.5 Reconstructed 06-2025 som øvingskilde

**Vault-flagg:**
```yaml
status: reconstructed_from_sensor
official_exam_pdf_missing: true
pair_status: reconstructed_from_incomplete_pair
based_on: dat110-eksamen-06-2025-sensorveiledning
```

**Web-rendering-krav:**

1. **Banner øverst på eksamen-card:**
   > ⚠️ **Rekonstruert eksamen** — oppgaveteksten er rekonstruert fra sensorveiledningen fordi original oppgave-PDF mangler. Brukes som øvingskilde, ikke som offisiell originaleksamen.

2. **Listing:** "Eksamener (5 komplette + 1 rekonstruert)" — aldri vis det som likestilt med komplette

3. **Link til sensor:** Alltid vis "Se offisiell sensorveiledning" lenke ved siden av

4. **Ikke inkluder i statistikk** som "5 official exams" — bruk eksplisitt fraseologi

5. **Visuell stil:** Bruk amber/oransje border eller badge — ikke samme styling som komplette eksamener

## 4. Foreslått DAT110 site-architecture

Tilpasset eksisterende app-struktur (App Router + per-fag-rute):

### 4.1 Nye/forbedrede ruter

```
/dat110                              # FORBEDRET: legg til exam-pattern-cards + Tier 1-konsepter
/dat110/oving                        # NY: container, lenker til quiz/flashcards/eksamen-sim
/dat110/oving/quiz                   # NY: full QuizRunner (analog til DAT109)
/dat110/oving/eksamen-sim            # NY: ExamSimulator med 6 eksamener
/dat110/oving/flashcards             # P2: konsept-flashcards fra vault
/dat110/eksamenmonstre               # NY: oversikt over 4 exam-patterns
/dat110/eksamenmonstre/[slug]        # NY: render exam-pattern-body (recurring-questions, etc.)
/dat110/temaer                       # NY: oversikt over 21 topics
/dat110/temaer/[slug]                # NY: render topic-body med backlinks
/dat110/begreper                     # NY: oversikt over 72 concepts (alfabetisk + tema-filter)
/dat110/begreper/[slug]              # NY: render concept-body med supported_by + related
/dat110/eksamen                      # FORBEDRET: vis 5+1 eksamener med reconstructed-warning
/dat110/eksamen/[year]-[session]     # NY: per-eksamen-side med spørsmål-browser
/dat110/kilder                       # P2: oversikt over publiserbare source-notes
/dat110/kilder/[slug]                # P2: source-metadata-side (ikke full body)
/dat110/prosjekter                   # FORBEDRET (eksisterende /obliger): koble til project-source-notes
```

### 4.2 Hvilke eksisterende ruter beholdes uendret

- `/dat110/cn-1` … `/cn-8`, `/dat110/ds-1` … `/ds-8` (chapter-skall) — behold, men kompletter med vault-data i `kilder/`-fane
- `/dat110/eksamenoving/oppg-N` — behold, men lenk til relevant exam-pattern
- `/dat110/oppsummering` — uendret (eller fjern hvis ny `/temaer` dekker behovet)

### 4.3 Navigation-utvidelse

I `src/components/Navigation.tsx` legg til DAT110-undermeny:
- Oversikt
- Øving (quiz, exam-sim, flashcards)
- Eksamen-mønstre
- Temaer
- Begreper
- Eksamen
- Prosjekter

## 5. Foreslått innholdsmodell

### 5.1 TypeScript-typer (utvidelse av eksisterende `src/lib/quiz-types.ts`-mønster)

**Ny fil — `src/lib/dat110-vault/types.ts`:**

```ts
// Vault-mirror-typer (1:1 med Obsidian-frontmatter, minus local-only)
export type VaultTema =
  | "01-distributed-systems-intro"
  | "02-sockets"
  | "03-mom-overlay"
  | "04-naming-og-chord-dht"
  | "05-processes-and-threads"
  | "06-transport-services"
  | "07-coordination"
  | "08-consistency"
  | "09-fault-tolerance"
  | "10-network-layer"
  | "11-link-layer"
  | "12-iot-mqtt"
  | "13-cloud-virtualization"
  | "14-network-security";

export interface VaultTopic { /* … se §3.3 … */ }
export interface VaultConcept { /* … se §3.3 … */ }
export interface VaultSource { /* … se §3.3 … */ }
export interface VaultExamPattern { /* … se §3.3 … */ }

// Quiz-typer for DAT110 (utvidelse av DAT109-mønsteret)
export type DAT110QuizSource =
  | { kind: "canvas-quiz"; taskNumber: number; questionNumber: number }
  | { kind: "exam"; year: number; session: string; questionNumber: number }
  | { kind: "reconstructed-exam"; year: number; session: string; questionNumber: number; warning: true }
  | { kind: "generated"; basedOn: string; manuallyReviewed: boolean };

export type DAT110QuizTopic = VaultTema;

// Blå "Les mer"-lenke i quiz-feedback. Peker ALDRI til Obsidian eller source-note —
// alltid til DAT110 web-sider som forklarer konseptet pedagogisk.
export interface LearnMoreLink {
  label: string;                    // f.eks. "Les mer: Chord DHT"
  href: string;                     // f.eks. "/dat110/begreper/chord-ring"
  kind: "concept" | "topic" | "exam-pattern" | "eksamen";
  slug: string;                     // canonical slug for evt. invalidation
}

// Per-option-feedback brukes til å forklare hvorfor feilalternativer ikke stemmer.
export interface OptionExplanation {
  optionIndex: number;
  isCorrect: boolean;
  shortExplanation: string;         // 1-2 setninger; vises bare for valgt alternativ
                                    // og evt. for klart-feil-alternativer som ofte velges
}

export interface DAT110QuizQuestion {
  id: string;
  topic: DAT110QuizTopic;
  conceptSlugs: string[];           // refererer concepts/[slug] — internt grounding
  source: DAT110QuizSource;         // intern data, ikke vist inline i quiz-kortet
  question: string;
  qtype: "multiple_choice" | "multiple_answers";
  options: string[];
  correctIndices: number[];         // []multiple_answers, [single] for MC

  // ===== Pedagogisk feedback (nytt i P0) =====
  // Vises umiddelbart etter svar i selve quiz-kortet.
  explanationCorrect: string;       // 1-3 setninger: hvorfor riktig svar er riktig
  explanationIncorrect?: string;    // 1-3 setninger: kort forklaring når bruker svarte feil
                                    // (fallback: bruk explanationCorrect hvis ikke satt)
  optionExplanations?: OptionExplanation[];  // per-option feedback (særlig for feilalt.)
  learnMoreLinks: LearnMoreLink[];  // 1-3 blå "Les mer"-lenker til DAT110-sider
                                    // ERSTATTER inline sourceRefs i quiz-UI

  // ===== Internal grounding (skjult fra quiz-UI) =====
  // Brukes til debugging, dev-mode, og expandable "Kilder og grunnlag" på 
  // concept/topic/exam-pattern-sider — IKKE i quiz-kortet.
  sourceRefs: SourceRef[];          // se egen type under
  relatedConcepts: string[];        // concept-slugs (overlapper med conceptSlugs)
  relatedExamPatterns: string[];    // exam-pattern-slugs (f.eks. "recurring-questions")

  // ===== Metadata =====
  difficulty?: "easy" | "medium" | "hard";
  weight?: number;                  // for eksamen-spørsmål: 5 | 10 | 15
}

// Intern referanse til vault-source. Vises ALDRI inline i quiz-UI.
// Brukes for: developer/debug-mode, expandable "Kilder og grunnlag" på sider, 
// build-time-validering at concept-claims er grounded.
export interface SourceRef {
  slug: string;                     // f.eks. "dat110-l9-naming-i"
  role: string;                     // f.eks. "lecture-canonical", "quiz-source"
  pageOrSection?: string;           // f.eks. "p. 15-17" eller "§3.2"
  visibility: "public" | "internal" | "local-only";
}

export interface DAT110Exam {
  year: number;
  session: string;                 // "01" | "05" | "06"
  pairStatus: "complete" | "reconstructed_from_incomplete_pair";
  officialPdfMissing?: boolean;
  warning?: string;                // vises som banner hvis reconstructed
  questions: DAT110QuizQuestion[];
  sensorSlug: string;              // peker til sensorveiledning-source
}

// Pattern-aggregation (mirror av exam-patterns/*.md)
export interface DAT110ExamPattern {
  slug: string;
  scope: string;
  body: string;                    // markdown, parses med samme Markdown.tsx som DAT107
  tierData?: {
    tier1: string[];               // concept-slugs
    tier2: string[];
    tier3to5: string[];
  };
}
```

### 5.2 Data-filstruktur

```
src/data/dat110-vault/
├── topics.json                    # 21 items (filtered, no local-only-bodies)
├── concepts.json                  # 72 items
├── sources.json                   # 81 items (6 local-only-sources eksluderes helt)
├── exam-patterns.json             # 4 items
├── quizzes.json                   # 12 quizzes / 125 spørsmål
├── exams.json                     # 5 komplette + 1 reconstructed
├── _meta.json                     # build-timestamp, vault-commit-hash, lint-status
└── _wikilink-index.json           # slug → route-mapping for resolver
```

### 5.3 Quiz-struktur fra vault

Quiz-JSON i vault (`processed/extracted/quizzes/dat110-quiz-task-06-naming-dht.json`):

```json
{
  "title": "Task 6 — End of week 7: Naming, DNS, DHT/Chord",
  "task_number": 6,
  "question_count": 10,
  "questions": [
    {
      "number": 1,
      "text": "A Distributed Hash Table can provide:",
      "qtype": "multiple_answers",
      "options": ["Security", "Fault-tolerance", "Availability", "Scalability"],
      "correct_answer": "Fault-tolerance",
      "note": null
    }
  ]
}
```

**Konvertering i sync-pipeline:**

```ts
function vaultQuizToWebQuiz(vaultQ: VaultQuizQuestion, taskNumber: number, conceptMap: ConceptMap): DAT110QuizQuestion {
  return {
    id: `task-${taskNumber}-q${vaultQ.number}`,
    topic: inferTemaFromTask(taskNumber),
    conceptSlugs: conceptMap.lookupForQuiz(taskNumber, vaultQ.number),
    source: { kind: "canvas-quiz", taskNumber, questionNumber: vaultQ.number },
    question: vaultQ.text,
    qtype: vaultQ.qtype,
    options: vaultQ.options,
    correctIndices: parseCorrectAnswers(vaultQ.correct_answer, vaultQ.options),
    explanation: vaultQ.note ?? "Sjekk konseptsiden for forklaring.",
  };
}
```

**Concept-mapping** kan delvis utledes fra `quiz-concept-coverage.md` (4. aggregation-side). Resten må manuelt mappes første gang.

### 5.4 Eksamen-struktur fra vault + web-UX

#### 5.4.1 Vault-data

Eksamen-JSON i vault (`processed/extracted/exams/dat110-eksamen-01-2024.json`):

```json
{
  "raw_md5": "eabdaa895fd62db18f56ceccf7ecbdb2",
  "page_count": 14,
  "questions": [
    {
      "number": 1,
      "weight_percent": 10,
      "subquestion_count": 10,
      "subquestions": [{ "letter": "a", "text": "..." }]
    }
  ]
}
```

Sensorveiledning-JSON inneholder svar + sensor-template per (sub)spørsmål.

#### 5.4.2 Eksamen-data-format (web)

**Hovedprinsipp:** Oppgaven vises først. Løsning er skjult i accordion. Bruker skal kunne tenke før de åpner fasit.

```ts
export interface ExamQuestion {
  number: number;                        // 1-10
  weightPercent: number;                 // 5 | 10 | 15
  topic: DAT110QuizTopic;                // dominerende tema (overlapp OK)
  conceptSlugs: string[];                // grounding
  prompt: string;                        // oppgavetekst, KaTeX-støtte
  subquestions?: ExamSubquestion[];      // for Q1 (a-j MCQ-mix) eller Q-er med a/b/c
  
  // === Solution (skjult by default i accordion) ===
  solution: ExamSolution;
  
  // === Pedagogisk navigasjon ===
  learnMoreLinks: LearnMoreLink[];       // 1-4 lenker til DAT110-sider
  
  // === Intern grounding ===
  sourceRefs: SourceRef[];               // sensorveiledning + relevante lectures
  relatedExamPatterns: string[];         // f.eks. ["recurring-questions#chord-dht"]
}

export interface ExamSubquestion {
  letter: string;                        // "a", "b", ...
  prompt: string;
  qtype?: "mcq" | "short-answer" | "calculation" | "free-text";
  options?: string[];                    // for MCQ-sub i Q1
  solution: ExamSolution;
  learnMoreLinks?: LearnMoreLink[];
}

export interface ExamSolution {
  // Hva sensor forventer (fra sensorveiledning)
  expectedAnswer: string;                // markdown, KaTeX-støtte
  shortReasoning: string;                // 1-3 setninger faglig begrunnelse
  fullSensorTemplate?: string;           // valgfri full sensor-tekst
  commonMistakes?: string[];             // valgfrie typiske feil
  // pedagogisk
  learnMoreLinks?: LearnMoreLink[];      // ekstra lenker spesifikke for løsningen
}

export interface DAT110Exam {
  slug: string;                          // f.eks. "v2024", "h2024", "h2025"
  year: number;
  session: string;                       // "01" | "05" | "06"
  displayLabel: string;                  // f.eks. "Eksamen V2024 (mai 2024)"
  pairStatus: "complete" | "reconstructed_from_incomplete_pair";
  officialPdfMissing?: boolean;
  reconstructedFromSensor?: boolean;     // true → vis amber banner
  bannerWarning?: string;                // eksakt tekst for warning
  sensorSlug: string;                    // peker til sensorveiledning-source
  questions: ExamQuestion[];
  totalWeight: 100;
}
```

#### 5.4.3 Eksamen-side UX

**Layout per oppgave:**

```
┌─────────────────────────────────────────────────────────┐
│ Oppgave 3 (10%)                                         │
│ Tema: Network metrics / delay                           │
├─────────────────────────────────────────────────────────┤
│ Consider a transmission link with bandwidth R = 10 Mbps │
│ and propagation delay d_prop = 20 ms. A packet of size  │
│ L = 1500 bytes is sent...                               │
│                                                          │
│ a) Compute d_trans                                       │
│ b) Compute d_prop                                        │
│ c) Compute end-to-end delay                              │
│ d) ...                                                   │
│                                                          │
│ ▶ Vis løsning                                            │  ← accordion lukket
└─────────────────────────────────────────────────────────┘
```

**Etter klikk på "Vis løsning":**

```
│ ▼ Skjul løsning                                          │
│ ─────────────────────────────────────────────────────── │
│ Løsning:                                                 │
│                                                          │
│ a) d_trans = L/R = 1500·8 / 10·10^6 = 1.2 ms            │
│ b) d_prop = 20 ms (gitt)                                 │
│ c) d_end-to-end = d_trans + d_prop = 21.2 ms             │
│                                                          │
│ Kort begrunnelse:                                        │
│ Transmission-delay følger formelen L/R uavhengig av      │
│ propagation. Sum-formelen forutsetter null queuing       │
│ og null processing-delay.                                │
│                                                          │
│ → Les mer: Delay og throughput                          │  ← blå lenke
│ → Les mer: Network metrics                              │
│ → Les mer: Eksamen-gjengangere (Q3 delay-pattern)       │
└─────────────────────────────────────────────────────────┘
```

**Hard krav:**
- Accordion er **lukket by default** — bruker må aktivt klikke for å se løsning
- Hver løsning skal ha `shortReasoning` (1-3 setninger, ikke bare regnestykke)
- Hver løsning skal ha 1-4 `learnMoreLinks` til relevante DAT110-sider
- Sensor-fasit (full template) er valgfritt synlig via sekundær "Vis full sensor-tekst"-toggle
- **Aldri vis sourceRefs inline i oppgaven** — de er i grounding-data, ikke i UI

**Tastatur-navigasjon:** Enter eller mellomrom åpner accordion. Esc lukker.

**Visuell stil:**
- Oppgave-card: neutral border, tydelig headingsstruktur
- "Vis løsning"-knapp: outline-button, ikke primær-farge (vi vil ikke at bruker klikker reflektivt)
- Løsning: emerald/grønn venstre-border for "her er fasiten"-signal
- Reconstructed eksamen: amber/oransje border + banner øverst på siden

#### 5.4.4 Reconstructed eksamen — strenge UI-regler

- **Side-tittel:** "Rekonstruert eksamen 06-2025 (ikke offisiell)" — aldri bare "Eksamen 06-2025"
- **Banner:** amber, vises både på listing og på selve eksamen-siden
- **Tag i lister:** "🔄 Rekonstruert" badge ved siden av tittel
- **URL-slug:** `/dat110/eksamen/06-2025-rekonstruert` (ikke bare `06-2025`)
- **Aldri** kall den "offisiell", "original", eller likestilt med komplette eksamener i tabeller
- **Solution-accordion** fungerer som vanlig, men siden henter solutions fra sensor (som er den autoritative kilden)

### 5.5 SourceRefs vs learnMoreLinks — skarp adskillelse

**Hovedregel:** Quiz-kortet viser ALDRI rotete inline sourceRefs eller Obsidian-paths. Bruker ser pedagogisk feedback + 1-3 blå "Les mer"-lenker. SourceRefs lever som intern data, eksponeres kun i "Kilder og grunnlag"-expandables på concept/topic/exam-pattern-sider.

| Aspekt | `learnMoreLinks` | `sourceRefs` |
|---|---|---|
| **Hvor vises de?** | Inline i quiz-kort, etter svar | Skjult i quiz; expandable på concept/topic/exam-pattern-sider |
| **Hvem bruker?** | Sluttbruker (pedagogisk navigasjon) | Sluttbruker som vil "se grunnlag", + dev-mode |
| **Hva peker de til?** | DAT110 web-sider (`/dat110/begreper/[slug]`, `/dat110/temaer/[slug]`, `/dat110/eksamen/gjengangere`, anchored sections) | Vault source-slugs (intern slug) |
| **Format** | "Les mer: Chord DHT" — kort, pedagogisk | "L9 Naming-I s. 15-17" — tørr referanse |
| **Antall per spørsmål** | 1-3 (kuratert) | Ubegrenset (grounding-array) |
| **Type i model** | `LearnMoreLink[]` | `SourceRef[]` |
| **Lekker local-only?** | Nei — peker bare til DAT110-web-sider | Nei — `local-only`-sources har `visibility: "local-only"` og rendres ikke offentlig (kun dev) |

**UX-eksempel (P0-standard):**

```
┌─────────────────────────────────────────────────────────┐
│ Spørsmål 3 av 10                                        │
├─────────────────────────────────────────────────────────┤
│ A Distributed Hash Table can provide:                   │
│                                                          │
│ ☐ Security                                              │
│ ☑ Fault-tolerance       ← brukerens valg               │
│ ☐ Availability                                          │
│ ☐ Scalability                                           │
├─────────────────────────────────────────────────────────┤
│ ✓ Riktig!                                               │
│                                                          │
│ DHT-en distribuerer nøkler over flere noder med         │
│ replikering, så systemet tåler at enkelte noder         │
│ feiler. Det er kjernen i fault-tolerance.               │
│                                                          │
│ Hvorfor ikke de andre?                                  │
│ • Security: DHT gir ingen kryptering eller auth.        │
│ • Availability: krever replikering, ikke garantert.     │
│ • Scalability: oppnås via partitionering, ikke DHT      │
│   per se.                                               │
│                                                          │
│ → Les mer om dette: Chord DHT                          │  ← blå lenke
│ → Les mer: DHT fundamentals                            │
│                                                          │
│              [ Neste spørsmål → ]                       │
└─────────────────────────────────────────────────────────┘
```

**Hva som IKKE skal vises i quiz-kortet:**
- ❌ "Source: dat110-quiz-task-06-naming-dht.md Q1" (rotete)
- ❌ "From Obsidian: processed/reviewed/sources/..." (lekker internal paths)
- ❌ "References: [L9 p.15], [L9 p.17], [Project 3 README §2.1]" (for mye text)
- ❌ Full citation-blokk inline

**Hvor sourceRefs vises (P1+):**

`/dat110/begreper/chord-ring` (concept-side):
```
## Hva er Chord-ringen?
[concept-body fra vault]

<details>
  <summary>Kilder og grunnlag (5)</summary>
  • L9 Naming-I (forelesning) — s. 15-17
  • L9 Exercises (oppgaver) — Q4
  • Project 3 DHT README (prosjekt)
  • Eksamen V2024 Q10 (eksamen-spørsmål)
  • Quiz Task 6 Q10 (Canvas-quiz)
</details>
```

For local-only-sources på dev-mode: vis med 🔒-ikon + "Local-only — ikke publisert".

**For local-only-source-metadata-side (`/dat110/kilder/[slug]`, P1):**
- Vis: title, role, priority, language, date ingested, related topics/concepts (som lenker)
- Vis IKKE: full body for `local_only`-sources
- Vis: citation-info + link til original (hvis public URL)

### 5.7 Distraktor-policy (§10.9 presisering)

Selv om scoring er alt-eller-ingenting, skal spørsmål **ikke** bli for lette. Strenge regler for distraktor-kvalitet:

**Hard krav:**
1. **Ingen åpenbart lengre/mer presise alternativer** — alle options skal ha sammenlignbar lengde (±20%) og samme detaljnivå
2. **Ingen "AI-formulerte" alternativer** — feilalternativer skal være naturlige formuleringer, ikke "korrekte men irrelevante" tekstblokker
3. **Distraktorer = faglig plausible misforståelser** — hentet fra:
   - Vanlige feil i sensor-template-vurderinger (`exam-patterns/sensorveiledning-themes.md`)
   - Concept-confusion-pairs (f.eks. ARP vs DHCP, DV vs LS, primary-based vs replicated-write)
   - Pensum-relaterte misforståelser dokumentert i lecture-source-notes
4. **Tester begrepsforståelse, ikke ordgjenkjenning** — ikke gjenta nøkkelfrase fra spørsmålet i kun riktig alternativ
5. **Canvas-stil** — kort, konkret, eksamen-likt. Unngå "alle de over", "ingen av de over", "A og C men ikke B"-type kompleksitet med mindre eksamen faktisk bruker dem

**Soft krav:**
6. **Minst 1 nær-miss-distraktor** — et alternativ som er nesten riktig, så bruker må tenke (ikke gjette via eliminering)
7. **Maks 1 "absurd" distraktor** — kun hvis det faktisk er en konkret misforståelse, ikke fyll-tekst

**Build-time-validering** (forslag, kan automatiseres):
```js
// scripts/validate-distractor-quality.mjs
function checkQuestion(q) {
  const lengths = q.options.map(o => o.length);
  const maxRatio = Math.max(...lengths) / Math.min(...lengths);
  if (maxRatio > 1.5) warn(q.id, "alternativer har for ulike lengder");
  
  const correctText = q.options[q.correctIndices[0]].toLowerCase();
  const questionWords = q.question.toLowerCase().split(/\W+/).filter(w => w.length > 4);
  const overlap = questionWords.filter(w => correctText.includes(w)).length;
  if (overlap > 2) warn(q.id, "riktig alternativ gjentar nøkkelord fra spørsmål");
}
```

**Manuell QA per Tier 1-spørsmål:** Bruker reviewer feedback + alternativ-formuleringer før push (§10.10 hybrid-flow).

### 5.8 LearnMoreLinks i praksis — hvordan de genereres

Hver `DAT110QuizQuestion` får 1-3 `learnMoreLinks` basert på `conceptSlugs` + `relatedExamPatterns`:

**Algoritme** (i `sync-vault.mjs`):

1. Start med tom liste
2. For hver `conceptSlug` i `conceptSlugs`:
   - Hvis konseptet har egen side (i `_wikilink-index.json`) → add link `{ label: "Les mer: <concept-title>", href: "/dat110/begreper/<slug>", kind: "concept", slug }`
3. Hvis spørsmålet er fra eksamen + matcher en exam-pattern → add link til `/dat110/eksamen/gjengangere`
4. Maks 3 lenker per spørsmål; prioriter Tier 1-konsepter først
5. Hvis 0 lenker etter steg 1-4: add fallback til tema-side via `topic`-felt

**Døde lenker-mitigation:** Build-time-validering verifiserer at hver `learnMoreLink.href` peker til en eksisterende DAT110-route. Hvis ikke → fail build. Dette tvinger oss til å opprette concept/tema-sider FØR quiz-spørsmål som lenker til dem (se P0-rekkefølge §6.1).

## 6. Prioritert implementeringsrute

### P0 — første leveranse (1 PR-batch)

**Mål:** Pedagogisk-loopen fungerer ende-til-ende:
1. Sync-pipeline fra vault til JSON
2. 10 Tier 1 concept-sider + 2 tema-sider (destinasjoner for learnMoreLinks)
3. **Én komplett offisiell eksamen** med oppgave + solution-accordion
4. DAT110 quiz med topic-selector og pedagogisk feedback
5. DAT110 landing med exam-pattern-cards
6. `/dat110/eksamen/gjengangere` (én side, basert på `recurring-questions.md`)

**Tier 1-fokus (avklart §10.5):** Eksamen-mønstre er hoved-pedagogisk-konsept. P0 leverer:
- Q10 Chord DHT (15%, 6/6 hit)
- Q8 Overlay multicast (10%, 6/6)
- Q6 IP/forwarding (10%, 5/5)
- Q3 Delay/throughput (10%, 4/5)
- Q7 DS-fundamentals (5%, 5/5)

#### Anbefalt første offisielle eksamen i P0: **V2024 (mai 2024)**

**Kandidater:**

| Slug | Periode | Type | Pair-status | Argumenter |
|---|---|---|---|---|
| **`v2024`** ← **anbefalt** | mai 2024 | Standard vårsesjon | Komplett | Mest representativ for standardeksamen brukeren skal ta i mai/juni; nyere format; fullt sensorveiledning; alle 10 Q-slots tilstede; recurring-pattern-analysen viser at det er "midt i klyngen" — ingen ekstreme outliers |
| `h2024` | januar 2024 | Kontinuasjonseksamen | Komplett | Bra alternativ, men kont-eksamener kan ha mindre format-variasjon |
| `h2025` | januar 2025 | Kontinuasjonseksamen | Komplett | Mest tids-nær, men samme kont-bekymring som h2024 |
| `v2022` | mai 2022 | Standard vårsesjon | Komplett | Eldre, mindre relevant for nåværende format |
| `v2023` | mai 2023 | Standard vårsesjon | Komplett | OK alternativ, men eldre enn v2024 |
| `06-2025-rekonstruert` | juni 2025 | Rekonstruert fra sensor | **ikke offisiell** | ❌ **IKKE i P0** per §10.13. Brukes som øvingskilde etter P0. Aldri kalt offisiell. |

**Hvorfor V2024:**
1. **Standard vårsesjon** = samme format-klasse som eksamen brukeren skal skrive (mai-format, ikke kont-format)
2. **Nyere = mer relevant pensum-snapshot** (Kurose-Ross 8e + Van Steen 4e er pensum)
3. **Komplett pair** med sensorveiledning (`dat110-eksamen-05-2024.json` + `dat110-eksamen-05-2024-sensorveiledning.json`)
4. **Alle Tier 1-slots tilstede** — Q10 Chord, Q8 Overlay, Q6 IP, Q3 Delay, Q7 DS-fundamentals
5. **Trygg "demo" for solution-accordion-UX** — bredt nok til å vise alle oppgavetyper (MCQ-mix i Q1, regneoppgaver, fri-tekst)
6. **Ikke kont-format** — kont-eksamener (h2024/h2025) kan ha mindre representativitet
7. **Ikke for gammelt** — v2022/v2023 er OK, men v2024 er det nyeste standard-mai-eksamenet

**Slug på web:** `/dat110/eksamen/v2024` (norsk-stil, kort).

**P1-utvidelse:** Legg til v2022, v2023, h2024, h2025 — totalt 5 komplette offisielle eksamener. Reconstructed 06-2025 kan inkluderes i P1 eller P2 med tydelig banner.

#### P0 rekkefølge (kritisk — concept-sider FØR quiz og eksamen)

1. **Lag `scripts/sync-dat110-vault.mjs`** — leser vault, genererer `src/data/dat110-vault/{quizzes,exam-patterns,exams,concepts-tier1,topics-tier1,_meta,_wikilink-index}.json`
   - Filtrer ut alle 6 local-only-sources fra eksport (Egli, Lima, arXiv, Pearson×2, Wiley)
   - Bygg `_wikilink-index.json` (slug → route-mapping) — brukes til build-time-validering av learnMoreLinks
   - For quizzes: konverter vault-JSON til `DAT110QuizQuestion[]` med tomme `learnMoreLinks` (fylles inn manuelt + auto)
   - For eksamen: i P0 kun **V2024** — generer `exams/v2024.json` med oppgaver + sensor-løsninger sammenflettet
   - Output skal være git-diff-bar JSON (ikke binær, ikke minified) — bruker reviewer før commit
2. **Lag `src/lib/dat110-vault/types.ts`** — TypeScript-typer inkludert `DAT110QuizQuestion`, `LearnMoreLink`, `OptionExplanation`, `SourceRef`, `ExamQuestion`, `ExamSolution`, `DAT110Exam`
3. **Opprett 10 Tier 1-konseptsider FØRST** (slik at learnMoreLinks ikke blir døde):

   | Side | Concept-slug | Source-grunnlag |
   |---|---|---|
   | `/dat110/begreper/chord-ring` | chord-ring | `concepts/chord-ring.md` |
   | `/dat110/begreper/dht-fundamentals` | dht-fundamentals | `concepts/dht-fundamentals.md` |
   | `/dat110/begreper/application-layer-multicast` | application-layer-multicast | `concepts/application-layer-multicast.md` |
   | `/dat110/begreper/ipv4-addressing` | ipv4-addressing | `concepts/ipv4-addressing.md` |
   | `/dat110/begreper/subnetting` | subnetting | `concepts/subnetting.md` |
   | `/dat110/begreper/arp-and-mac-addressing` | arp-and-mac-addressing | `concepts/arp-and-mac-addressing.md` |
   | `/dat110/begreper/delays` | delays | `concepts/delays.md` |
   | `/dat110/begreper/throughput` | throughput | `concepts/throughput.md` |
   | `/dat110/begreper/transparency` | transparency | `concepts/transparency.md` |
   | `/dat110/begreper/key-resolution` | key-resolution | `concepts/key-resolution.md` |

   **10 concept-sider** med dynamic route `/dat110/begreper/[slug]` + statisk-generert per slug.

4. **Opprett 2 tema-sider** (mer omfattende "kapittel"-narrative for Q10 + Q8):

   | Side | Topic-slug | Source-grunnlag |
   |---|---|---|
   | `/dat110/temaer/chord-dht` | chord-dht | `topics/chord-dht.md` |
   | `/dat110/temaer/overlay-and-gossip` | overlay-and-gossip | `topics/overlay-and-gossip.md` |

   Mindre P0-overhead enn alle 21 temaer; dekker de to viktigste Q-slot-vinnerne.

5. **Opprett `/dat110/eksamen/v2024`** — første komplette offisielle eksamen med solution-accordion:
   - Render ExamQuestion[] fra `exams/v2024.json`
   - Hver oppgave: prompt + subquestions først, "Vis løsning"-accordion (lukket by default)
   - Accordion-innhold: expectedAnswer + shortReasoning + 1-4 learnMoreLinks
   - Sticky header med tema/vekt-info
   - Topnav-lenke til `/dat110/eksamen/gjengangere`
   - **Aldri** vis sourceRefs inline; bruker kan ikke trigge solution før de aktivt åpner

6. **Opprett `/dat110/eksamen/gjengangere`** — render `exam-patterns/recurring-questions.md`:
   - Q-slot-tabell (Q1-Q10 med vekt + hit-rate + stabilitet)
   - Per-slot detalj-seksjoner med **concept-baserte anchors** (`#chord-dht`, `#overlay-multicast`, `#ip-forwarding`, `#delay`, `#ds-fundamentals`)
   - Lenker tilbake til relevante concept/tema-sider + til `/dat110/eksamen/v2024` for konkret-eksempel
   - Dette er hoved-pedagogiske-konsept-siden (§10.5 fokus)

7. **Forbedre `/dat110` (page.tsx):**
   - Legg til "Eksamen-mønstre"-seksjon med 5 store `RecurringPatternCard` (Tier 1)
   - Hver card viser: tema-navn + vekt + hit-rate + 1-linje-beskrivelse
   - Card primær-lenke: `/dat110/eksamen/gjengangere#chord-dht` (concept-anchor, §10.11)
   - Card sekundær-knapp: "Øv på dette" → `/dat110/oving/quiz?conceptSlug=<slug>`
   - Card tertiær-lenke: "Se eksamen-eksempel" → `/dat110/eksamen/v2024`
   - Bevar eksisterende chapter-collapse-seksjoner

8. **Lag `/dat110/oving/quiz` med pedagogisk feedback:**
   - Topic-selector (DAT109-stil, men med 14 DAT110-temaer + bonus "Tier 1-only"-toggle)
   - QuizRunner med state-machine (select → running → done)
   - **`QuizCard` ny variant** for DAT110 med pedagogisk feedback:
     - Pre-svar: vis spørsmål + options (radio for MC, checkbox for multiple_answers)
     - Post-svar: vis "Riktig!" / "Ikke helt." + `explanationCorrect` eller `explanationIncorrect`
     - Vis `optionExplanations` for valgte feilalternativer (og 1-2 vanlige feilfeller)
     - Vis 1-3 `learnMoreLinks` som blå knapper/lenker
     - INGEN inline sourceRefs
   - QuizResults med per-topic-breakdown + retry-wrong-only

9. **Lag pedagogisk-feedback-generering i sync-pipeline:**
   - Auto-generer `explanationCorrect` fra vault `note`-felt i quiz-JSON (fall tilbake til "Sjekk konseptsiden for detaljer")
   - **Hybrid-flow per §10.10:** Claude AI-draft for Tier 1-spørsmål (~30-40 stk), bruker reviewer og redigerer før push
   - Lagre i `quiz-feedback-overrides.json` (manuelt vedlikeholdt, ikke auto-overskrevet av sync)
   - For ikke-Tier-1-spørsmål i P0: minimal fallback ("Sjekk relevante konseptsiden for detaljer") med `learnMoreLinks` til tema-side via `topic`-felt
   - **Distraktor-policy §5.7:** når AI genererer/justerer feedback, valider mot distraktor-krav (lengde-balanse, ingen ordgjenkjenning, plausible misforståelser)

10. **Navigation-utvidelse** i `src/components/Navigation.tsx`: DAT110-undermeny med Oversikt / Øving / Eksamen / Eksamen-mønstre / Begreper

**P0 inkluderer IKKE reconstructed 06-2025** (§10.13 — utsettes til P1+). `ReconstructedExamBanner`-komponent forfattes i P1 sammen med `/dat110/eksamen/06-2025-rekonstruert`-siden.

#### Filer som opprettes/endres (utvidet)

| Fil | Endring | Linje-estimat |
|---|---|---:|
| `scripts/sync-dat110-vault.mjs` | NY | ~300 |
| `scripts/validate-learnmore-links.mjs` | NY (build-time-check, strict) | ~60 |
| `scripts/validate-distractor-quality.mjs` | NY (warn-only) | ~80 |
| `src/lib/dat110-vault/types.ts` | NY | ~250 |
| `src/lib/dat110-vault/loader.ts` | NY | ~120 |
| `src/lib/dat110-vault/wikilink-resolver.ts` | NY | ~60 |
| `src/data/dat110-vault/quizzes.json` | NY (gen) | ~5000 (125 spm med feedback) |
| `src/data/dat110-vault/exam-patterns/recurring-questions.json` | NY (gen) | ~600 |
| `src/data/dat110-vault/exams/v2024.json` | NY (gen) | ~1500 (10 oppgaver + løsninger) |
| `src/data/dat110-vault/concepts-tier1.json` | NY (gen) | ~1500 (10 concepts) |
| `src/data/dat110-vault/topics-tier1.json` | NY (gen) | ~500 (2 topics) |
| `src/data/dat110-vault/_meta.json` | NY (gen) | ~30 |
| `src/data/dat110-vault/_wikilink-index.json` | NY (gen) | ~200 |
| `src/data/dat110-vault/quiz-feedback-overrides.json` | NY (manuell-reviewed) | ~2000 (Tier 1-spørsmål) |
| `src/data/dat110-vault/exam-solutions-overrides.json` | NY (manuell-reviewed) | ~1000 (V2024 solutions) |
| `src/app/dat110/page.tsx` | ENDRE (+RecurringPatternCard) | +80 |
| `src/app/dat110/oving/page.tsx` | NY | ~80 |
| `src/app/dat110/oving/quiz/page.tsx` | NY | ~50 |
| `src/app/dat110/oving/quiz/QuizContainer.tsx` | NY | ~180 |
| `src/app/dat110/begreper/[slug]/page.tsx` | NY (dynamic, 10 slugs) | ~120 |
| `src/app/dat110/temaer/[slug]/page.tsx` | NY (dynamic, 2 slugs) | ~120 |
| `src/app/dat110/eksamen/gjengangere/page.tsx` | NY | ~180 |
| `src/app/dat110/eksamen/[slug]/page.tsx` | NY (dynamic, 1 slug i P0: v2024) | ~200 |
| `src/app/dat110/eksamen/page.tsx` | ENDRE (listing inkluderer v2024) | +40 |
| `src/components/dat110/QuizCard.tsx` | NY (med pedagogisk feedback) | ~250 |
| `src/components/dat110/QuizFeedback.tsx` | NY (riktig/galt + learnMoreLinks) | ~120 |
| `src/components/dat110/LearnMoreButton.tsx` | NY (blå pedagogisk lenke) | ~40 |
| `src/components/dat110/RecurringPatternCard.tsx` | NY | ~100 |
| `src/components/dat110/ExamQuestionCard.tsx` | NY (med solution-accordion) | ~200 |
| `src/components/dat110/SolutionAccordion.tsx` | NY (collapsed by default) | ~100 |
| `src/components/dat110/ConceptPageLayout.tsx` | NY (med expandable Kilder) | ~150 |
| `src/components/dat110/SourcesAndGroundingExpandable.tsx` | NY (skjuler local-only) | ~60 |
| `src/components/Navigation.tsx` | ENDRE | +15 |
| `package.json` | ENDRE (+`sync:dat110-vault`, +`validate:learnmore`, +`validate:distractors`) | +3 |

**Estimat:** ~33-35 filer, 10-14 timer impl + 5 timer QA + 4-6 timer manuell feedback-forfatting (Tier 1-quiz) + 3-4 timer V2024 solution-review = ~22-29 timer total. Stor men avgrenset P0.

**Hvorfor inkludere concept/tema-sider i P0?** Uten dem blir alle `learnMoreLinks` døde — quiz-feedback og eksamen-solutions peker til 404-sider. Build-time-validering ville feile per §10.12 (strict). Konseptsidene er en hard avhengighet for pedagogisk-loopen.

**Hvorfor inkludere V2024 i P0?** Pedagogisk-loopen er ikke komplett uten en konkret eksamen som demonstrerer Q-slot-strukturen i praksis. Brukerne klikker fra exam-pattern-cards til "Se eksamen-eksempel" → V2024 viser hvordan Tier 1-mønstre faktisk ser ut i ekte oppgaver. Uten dette blir gjengangere-siden abstrakt teori uten anker.

### P1 — andre batch (etter P0-godkjenning)

**Hovedfokus P1:** Resterende offisielle eksamener + reconstructed 06-2025 + resterende exam-patterns. Dette lukker eksamen-loopen helt.

1. **Resterende 4 offisielle eksamener** (v2022, v2023, h2024, h2025) — bygg `src/data/dat110-vault/exams/{slug}.json` + `/dat110/eksamen/{slug}`-sider per eksamen. Samme `ExamQuestionCard` + `SolutionAccordion`-pattern som V2024.
2. **Reconstructed 06-2025** — bygg `/dat110/eksamen/06-2025-rekonstruert` med `ReconstructedExamBanner`. Side-tittel "Rekonstruert eksamen 06-2025 (ikke offisiell)". Amber-styling. Aldri likestilt med komplette eksamener i tabeller.
3. **Utvide `/dat110/eksamen/gjengangere`** med konkrete eksempler fra alle 5 + 1 eksamener (per-slot link-out til 6 ulike eksamen-instanser av samme Q-slot)
4. **Andre 3 exam-pattern-aggregations:** `/dat110/eksamen/konsept-frekvens` (`concept-frequency.md`), `/dat110/eksamen/sensor-monstre` (`sensorveiledning-themes.md`), `/dat110/eksamen/quiz-konsept-dekning` (`quiz-concept-coverage.md`)
5. **Resterende concept-sider:** `/dat110/begreper` index + alle 62 resterende `/dat110/begreper/[slug]` (P0 dekket 10 Tier 1)
6. **Resterende tema-sider:** `/dat110/temaer` index + alle 19 resterende `/dat110/temaer/[slug]` (P0 dekket 2)
7. **Pedagogisk feedback for ikke-Tier-1-quiz-spørsmål** — hybrid AI-draft + review for resterende ~85 spørsmål
8. **"Kilder og grunnlag"-expandable** på alle concept/tema-sider (P0 har det bare på Tier 1)
9. **Exam-sim:** `/dat110/oving/eksamen-sim` med timed-mode (kombinerer spørsmål fra alle eksamener)
10. **Project-lenker:** koble `/dat110/obliger` til project-source-notes (sources/dat110-project*-readme)
11. **Bedre Navigation:** sidebar for DAT110-undermeny på alle DAT110-ruter

### P2 — nice-to-have

1. **Flashcards** (`/dat110/oving/flashcards`) — generert fra concept-bodies (kort = concept-title, bakside = første ## seksjon)
2. **Matching-game** — match concept ↔ tema, eller concept ↔ sensor-template
3. **Concept-graph** — visualiser wikilink-graf (D3 / Recharts allerede installert)
4. **Spaced-repetition** — Postgres-tabell `dat110_card_reviews(user_id, card_id, ease, interval, next_review)`
5. **Generated practice exams** — randomiser oppgaver fra alle 6 eksamener basert på exam-pattern-templates
6. **Build-history-side** — render `processed/reviewed/log.md`

## 7. Første konkrete implementeringsbatch (P0 detaljert)

### 7.1 Filer som opprettes/endres

| Fil | Type | Estimert størrelse |
|---|---|---|
| `scripts/sync-vault.mjs` | NY | ~200 linjer |
| `src/lib/dat110-vault/types.ts` | NY | ~150 linjer |
| `src/lib/dat110-vault/loader.ts` | NY | ~80 linjer |
| `src/data/dat110-vault/quizzes.json` | NY (gen) | ~3000 linjer (125 spørsmål) |
| `src/data/dat110-vault/exam-patterns.json` | NY (gen) | ~500 linjer (4 patterns med body) |
| `src/data/dat110-vault/exams.json` | NY (gen) | ~2000 linjer (6 eksamener) |
| `src/app/dat110/page.tsx` | ENDRE | +60 linjer (exam-pattern-cards) |
| `src/app/dat110/oving/page.tsx` | NY | ~80 linjer |
| `src/app/dat110/oving/quiz/page.tsx` | NY | ~50 linjer |
| `src/app/dat110/oving/quiz/QuizContainer.tsx` | NY | ~150 linjer |
| `src/components/dat110/RecurringPatternCard.tsx` | NY | ~80 linjer |
| `src/components/dat110/ReconstructedExamBanner.tsx` | NY | ~30 linjer |
| `src/app/dat110/eksamen/page.tsx` | ENDRE | +20 linjer (banner) |
| `src/components/Navigation.tsx` | ENDRE | +10 linjer (undermeny) |
| `package.json` | ENDRE | +1 script-linje |

### 7.2 Komponenter som gjenbrukes

- `QuizRunner`, `TopicSelector`, `QuizCard`, `QuizResults` (`src/components/dat109/oving/`) — mulig å bruke direkte, alternativt extract til `src/components/quiz/`
- `Markdown` (`src/components/Markdown.tsx`) — for å rendre exam-pattern-body
- `ProgressTracker`, `ProgressProvider` — for å koble quiz-completion til page-progress
- `ThemeToggle` (uendret, automatisk fungerer)
- `FormulaBox`, `InlineLatex` — for matematikk i exam-pattern-pages (delay-formler etc.)

### 7.3 Data som genereres fra vaulten

**Pre-sync verifikasjon:**
```bash
cd ~/ObsidianVault/DAT110
source processed/.venv/bin/activate
python processed/scripts/lint_source_notes.py | jq '.failed'    # bør være 0
python processed/scripts/lint_wiki.py | jq '.failed'             # bør være 0
python processed/scripts/lint_exam_patterns.py | jq '.failed'    # bør være 0
```

**Sync-kommandoer:**
```bash
cd ~/dev/projects/eksamen-prep
node scripts/sync-vault.mjs --target=quizzes,exam-patterns,exams
# Output: src/data/dat110-vault/{quizzes,exam-patterns,exams,_meta}.json
```

**Verifikasjon etter sync:**
- `_meta.json` viser source-counts + vault-snapshot-info
- Ingen body-content fra 6 local-only-sources i noen json
- Wikilink-resolver kan resolve alle slugs i `quizzes.json` til ekte routes

### 7.4 QA / test-kommandoer

Per `eksamen-prep/CLAUDE.md`: **kun `npx tsc --noEmit` lokalt**, ingen `npm run build` eller `npm run dev` (RAM-grense 8GB).

**Lokalt:**
```bash
cd ~/dev/projects/eksamen-prep
npx tsc --noEmit                       # type-check, må passere
npm run lint                            # eslint (next lint)
```

**Vercel:**
- Push til feature-branch → preview-deploy
- Verifiser preview-URL manuelt før merge til main

### 7.5 Visual QA-plan

På preview-deployen:

#### Pre-deploy (lokalt)
- ✅ `npx tsc --noEmit` passerer
- ✅ `node scripts/validate-learnmore-links.mjs` rapporterer 0 døde lenker (strict, §10.12)
- ✅ `node scripts/validate-distractor-quality.mjs` har 0 hard-fail (warnings OK)
- ✅ `npm run lint` (next lint) passerer

#### Login + landing
1. **Login** med `haavard`
2. **Naviger `/dat110`** — verifiser 5 RecurringPatternCard rendrer (Chord DHT, Overlay, IP/forwarding, Delay, DS-fundamentals) med korrekt vekt + hit-rate
3. Klikk Chord DHT-card → primær-lenke → `/dat110/eksamen/gjengangere#chord-dht` (concept-anchor scroller)
4. Klikk "Øv på dette" → quiz forhåndsfiltrert på Chord-konsepter
5. Klikk "Se eksamen-eksempel" → `/dat110/eksamen/v2024`

#### Quiz-UX (DAT109-sammenligning)
6. **Ta Tier 1-quiz:** svar 4 spørsmål (1 riktig MC, 1 galt MC, 1 multiple_answers riktig, 1 multiple_answers partial-correct), verifiser:
   - ✅ "Riktig!" vises ved riktig svar + `explanationCorrect`-tekst
   - ✅ "Ikke helt." vises ved galt svar + `explanationIncorrect`-tekst
   - ✅ `optionExplanations` vises for valgte feilalternativer
   - ✅ 1-3 blå "Les mer"-knapper vises etter svar (ikke før)
   - ✅ Klikk "Les mer: Chord DHT" → går til `/dat110/begreper/chord-ring`, ikke 404
   - ✅ INGEN inline sourceRefs/Obsidian-paths synlig i quiz-kortet
   - ✅ Options shuffles per spørsmål (gjenta quiz, sjekk rekkefølge)
   - ✅ Multiple_answers fungerer med checkboxes
   - ✅ Scoring er alt-eller-ingenting for multiple_answers (partial gir 0)
   - ✅ Distraktor-sjekk: ingen alternativ er åpenbart lengre/mer presist
   - ✅ Sammenlign side-ved-side med `/dat109/oving/quiz` — DAT110 skal ha tilsvarende UX-flyt + pedagogisk feedback i tillegg
7. **Retry wrong-only** etter fullført quiz → bare feilbesvarte spørsmål

#### Eksamen-side (V2024)
8. **Naviger `/dat110/eksamen/v2024`** — verifiser:
   - ✅ Oppgave 1 (Q1 MCQ-mix) viser prompt + 10 sub-questions
   - ✅ Hver oppgave har **"Vis løsning"-accordion lukket by default**
   - ✅ Klikk "Vis løsning" → accordion åpnes, viser `expectedAnswer` + `shortReasoning` + 1-4 learnMoreLinks
   - ✅ Tastatur: Tab til accordion → Enter/Space åpner; Esc lukker
   - ✅ "Vis full sensor-tekst"-toggle (hvis implementert) viser full sensor-template
   - ✅ Solution-stil: emerald/grønn venstre-border, tydelig avskilt fra prompt
   - ✅ Klikk learnMoreLink i solution → går til riktig concept-side (ikke 404)
   - ✅ INGEN sourceRefs inline i oppgave-card
   - ✅ Q3 (delay) accordion åpnes uavhengig av Q10 — én kan være åpen mens annen er lukket
9. **Naviger tilbake** via topnav-lenke til `/dat110/eksamen/gjengangere`

#### Eksamen-gjengangere
10. **Naviger `/dat110/eksamen/gjengangere`** — verifiser:
    - Q-slot-tabell rendres med 10 rader
    - Concept-baserte anchors fungerer: `#chord-dht`, `#overlay-multicast`, `#ip-forwarding`, `#delay`, `#ds-fundamentals` (klikk → scroll)
    - Lenker tilbake til concept/tema-sider fungerer (alle 200 OK)
    - Per-slot-detalj inkluderer link til V2024 som konkret-eksempel
    - **IKKE** anchors basert kun på `#q10` / `#q8` etc. (§10.11)

#### Concept-side
11. **Naviger `/dat110/begreper/chord-ring`** — verifiser:
    - Concept-body rendres med markdown + evt. KaTeX
    - "Kilder og grunnlag"-expandable er **kollapset by default**
    - Ekspander → viser source-liste (uten local-only-sources)
    - Local-only-sources (Egli, Lima, Pearson) skal IKKE vises i offentlig listing

#### Eksamen-listing
12. **Naviger `/dat110/eksamen`** — verifiser:
    - V2024 listed som "Eksamen V2024 (mai 2024) — komplett"
    - Reconstructed 06-2025: **IKKE listed i P0** (utsatt til P1)
    - Andre eksamener: vises som "Kommer i P1" eller skjult

#### Dark mode
13. **Dark-mode-test:** toggle, verifiser:
    - RecurringPatternCard har lesbar kontrast på dark
    - Quiz-options + feedback (riktig/ikke-helt) har lesbar kontrast
    - Blå "Les mer"-knapper er synlige på dark (ikke usynlig blå-on-dark-blå)
    - SolutionAccordion emerald-border synlig på dark
    - Q-slot-tabell på gjengangere-siden har lesbar kontrast
    - "Vis løsning"-knapp er synlig som outline-button på begge themes

#### Mobile
14. **Mobile-test** (Chrome DevTools, iPhone 13 viewport):
    - RecurringPatternCard stacker vertikalt
    - Quiz-options er tappable (min 44×44px tap-target)
    - Solution-accordion fungerer på touch (tap toggler)
    - Navigation kollapser til hamburger
    - learnMoreLinks-buttons har nok spacing for fat-finger

#### Build-validering
15. **Build på Vercel:**
    - Preview-deploy fullfører uten warnings
    - Build-time `validate-learnmore-links.mjs` rapporterer 0 døde
    - Lighthouse-score: vurder ikke regresjon på `/dat110`

### 7.6 Dark mode-checks (eksplisitt per CLAUDE.md)

For hver ny komponent:
- Backgrounds: bruk `bg-card` ELLER eksplisitt `bg-white dark:bg-neutral-900`
- Borders: `border-card-border` ELLER `border-neutral-200 dark:border-neutral-800`
- Text colors:
  - Headings: `text-neutral-900 dark:text-neutral-50`
  - Body: `text-neutral-700 dark:text-neutral-200`
  - Muted: `text-neutral-600 dark:text-neutral-400` (ikke `text-[var(--muted)]`)
- Accents/badges: alltid eksplisitt dark-variant
- Gradient cards: alltid `dark:from-* dark:to-*`

### 7.7 Vercel deploy-forventninger

- Preview-deploy etter push (1-3 min)
- Build-output: ny `/dat110/oving/quiz` static-page eller server-component
- Bundle-size-impact: ~3000 linjer json embedded eller fetchet client-side; vurder om quizzes.json skal lastes lazy (kun på quiz-route)
- Postgres: ingen schema-endring nødvendig (page_progress fungerer for `dat110/oving/quiz` med samme convention)

## 8. Risikoer

| Risiko | Mitigation |
|---|---|
| **Copyright-brudd: local-only-content lekker til web** | Hard filter i `sync-vault.mjs` + CI-lint `npm run lint:copyright` som feiler hvis local_only-slug forekommer i `src/data/dat110-vault/` |
| **For mye innhold på `/dat110`-dashboard** | Kollapsible seksjoner (eksisterende mønster); flytt detaljer til underrutene |
| **Dark mode kontrast-issues** | Pre-merge visual QA, eksplisitte `dark:`-classes per CLAUDE.md, sjekk på preview-URL |
| **Generated quiz-content uten source-grounding** | All quiz-content kommer fra vault-sources med source-note-traceability; ingen LLM-generation i P0 |
| **Quiz-data inkluderer utilsiktet bruker-svar** | Vault-source-notes har `user_selected_answers_imported: false` + `weak_spot_analysis: false` i frontmatter; sync-pipeline skipper alle bruker-data-felt |
| **Overkomplisering av routing** | P0 har bare `/dat110/oving/quiz` + dashboard-cards. Resten er P1+ |
| **Vault-data-snapshot blir utdatert** | `_meta.json` viser sync-timestamp. Re-sync ved hver wiki-oppdatering. Vurder GitHub Action med scheduled re-sync hvis vault flyttes inn i samme repo |
| **Type-incompatibility med eksisterende QuizQuestion** | DAT110 trenger `multiple_answers` + `weight` — definer DAT110QuizQuestion separat ELLER utvid felles QuizQuestion-type med optional felter |
| **Quiz-source-text på engelsk, app er bokmål** | OK å vise engelsk quiz-tekst (autentisk eksamen-format); explanation/UI på bokmål |
| **6 local-only-sources er nyttige for læring** | Brukeren kan referere til disse i Obsidian (local), men siden viser kun citation + ekstern URL (ikke body) |

## 9. Guardrails for senere implementering

1. **Plan før kode** — denne rapporten + diskusjon før P0-PR
2. **Små commits** — én commit per logisk steg (sync-script, types, dashboard-cards, quiz-route, etc.)
3. **Ikke direkte copy-paste av lange source-tekster** — vault-paraphrase OK, raw-PDF-text NEI
4. **Ikke publiser local-only-content** — CI-lint enforced
5. **Typecheck før push** — `npx tsc --noEmit` må passere
6. **Visual QA før merge** — preview-URL gjennomgang per checklist §7.5
7. **No secrets i commits** — eksisterende `.env`-policy i begge repoer
8. **Vault forblir read-only fra app-perspektiv** — `sync-vault.mjs` LESER `~/ObsidianVault/DAT110/processed/reviewed/`, skriver ALDRI tilbake
9. **Append-only log i vault** — vault-`log.md` oppdateres i Obsidian-repoet, ikke fra app-repoet
10. **STUDIEPLAN er ikke datakilde** — det er din private prioriterings-fil, ikke wiki-content. Brukes ikke i sync-pipeline

## 10. Åpne beslutninger (alle avklart 2026-05-27)

Alle beslutninger §10.1-10.18 er nå avklart (se §0.1). Seksjonen nedenfor beholdes som rasjonale-arkiv:

### 10.14 Pensum-PDFene — kun referanse eller publisering?

Pensum-2026.pdf + semesterplan-2026.pdf ligger i vault (§0.2). De er forfatter-PDFer fra HVL.

**Spørsmål:** Skal disse:
- A) Kun brukes som **autoritative offline-referanser** (forslag) — sync-pipelinen importerer dem ikke, ingen web-eksponering
- B) Kort sammendrag publiseres på `/dat110` (uten å gjengi PDF-en), basert på fakta i PDF-en
- C) PDFene linkes til Canvas (ekstern URL) om de finnes der

**Anbefaling:** A + en kort manuelt-skrevet "Pensum og rammeverk"-seksjon på `/dat110` som oppsummerer hva som er pensum (egne ord, ikke gjengivelse). Pensum-PDFer publiseres ikke direkte.

### 10.15 Manuell-reviewed feedback-flow

Per §10.10 hybrid: Claude lager draft, bruker reviewer. Konkrete spørsmål:

- Hvor lagres draft-en før review? `quiz-feedback-drafts.json` (commit-bar), eller separat ikke-committed sti?
- Hvordan markerer du "godkjent" på et spørsmål? Frontmatter-flag i overrides? Bare commit-eier?
- Skal det være CI-sjekk på at hvert Tier 1-spørsmål har `reviewedBy: "haavard"` før det vises på prod?

**Anbefaling:** 
- Draft i `quiz-feedback-drafts.json` (committed for transparens)
- Når reviewed, kopier til `quiz-feedback-overrides.json` (canonical for build)
- CI: warn (ikke fail) hvis Tier 1-spørsmål mangler override på prod-build

### 10.16 V2024-solution-data: full sensor-tekst i JSON eller lazy-load?

V2024 sensorveiledning er ~13 sider. Hvis vi inkluderer hele `fullSensorTemplate` per oppgave, blir `exams/v2024.json` ~3-4000 linjer.

**Spørsmål:** 
- A) Inkluder full sensor-tekst i JSON (større bundle, men 1 fetch)
- B) Bare `expectedAnswer` + `shortReasoning` i hovedJSON; full sensor-tekst i separat `v2024-sensor-full.json` lazy-loaded når bruker klikker "Vis full sensor"

**Anbefaling:** A i P0 (enkelhet). Hvis bundle-size blir issue, refactor til B i P1.

### 10.17 Eksamen-spørsmål i quiz-pool?

V2024-oppgaver finnes som strukturert data. Skal de også vises i quiz-pulten?

**Spørsmål:**
- A) Holde quiz adskilt fra eksamen-spørsmål (forslag) — quiz = Canvas-quizzer (12 stk, 125 spm); eksamen = standalone-sider
- B) Inkluder eksamen-Q1-sub-MCQ-er (de 10 a-j) som ekstra quiz-pool
- C) Full integrering — alle eksamen-MCQ-er som quiz-spørsmål med eksamen-tag

**Anbefaling:** A i P0. Holder quiz-loop ren mot Canvas-quizzer. B kan vurderes i P1 etter at vi ser hvordan brukerne faktisk bruker quizzen.

### 10.18 Bør `/dat110/eksamen`-listing vise "Kommer i P1" for andre eksamener?

For å sette riktige forventninger.

**Spørsmål:** I P0-listing:
- A) Vis bare V2024, skjul de andre helt
- B) Vis V2024 + 4 andre eksamen-cards i "disabled"-stil med "Kommer i P1"-tag
- C) Vis V2024 + tekstlig note "Flere eksamener kommer"

**Anbefaling:** B — viser fullstendig roadmap, brukeren forstår at det er i utvikling. Disabled-cards har lav kognitiv vekt.

## 11. Anbefalt P0 implementation batch (endelig)

**Arbeidsmåte:** P0 deles i 3 interne checkpoints. Hver checkpoint avsluttes med commit + visual QA + bruker-review før neste starter. Ikke alt i én commit.

| Checkpoint | Scope | Forventet tid | Bruker-deliverable |
|---|---|---|---|
| **P0a** | Sync/data/types + concept/topic-foundation | ~8-10t | 10 concept-sider + 2 tema-sider på preview, ren type-system, lint grønn |
| **P0b** | V2024-eksamen + gjengangere-siden | ~6-8t | Bruker kan øve på V2024 med solution-accordion; eksamen-mønster-side live |
| **P0c** | Quiz + landing-cards + navigation | ~8-11t | Hele pedagogiske-loopen ende-til-ende; quiz spillbar med feedback |

**Rasjonale for inndelingen:**
- **P0a** legger grunnmur (type-system, sync, concept-sider) som både P0b og P0c er avhengige av
- **P0b** kan reviewes og deployes uavhengig — V2024-siden er nyttig alene
- **P0c** lukker loopen ved å koble dashboard + quiz + concept-sider sammen via learnMoreLinks
- Hver checkpoint kan rulles tilbake uten å rive resten

Detaljert P0a-sjekkliste i §13. P0b og P0c får egen sjekkliste når P0a er godkjent.

**Rekkefølge (kritisk — data + concept-sider FØR quiz og eksamen, ellers blir learnMoreLinks døde):**

1. **Godkjenn nye åpne beslutninger §10.14-10.18**
2. **Lag `scripts/sync-dat110-vault.mjs`** + `scripts/validate-learnmore-links.mjs` (strict) + `scripts/validate-distractor-quality.mjs` (warn)
3. **Lag types** i `src/lib/dat110-vault/types.ts` (inkl. `LearnMoreLink`, `OptionExplanation`, `SourceRef`, `ExamQuestion`, `ExamSolution`, `DAT110Exam`)
4. **Sync-pipeline kjør:** generer JSON-filer i `src/data/dat110-vault/` (filtrert for local-only)
5. **Opprett 10 Tier 1 concept-sider** + 2 tema-sider (Chord, Overlay) — destinasjoner for learnMoreLinks
6. **Opprett `/dat110/eksamen/v2024`** — første komplette offisielle eksamen med solution-accordion
7. **Opprett `/dat110/eksamen/gjengangere`** — fra `recurring-questions.md` med concept-baserte anchors
8. **Forfatte + reviewe pedagogisk feedback** for Tier 1-quiz-spørsmål (~30-40) via hybrid-flow (Claude draft → bruker reviewer → `quiz-feedback-overrides.json`)
9. **Forfatte + reviewe V2024 solutions** — `expectedAnswer` + `shortReasoning` + `learnMoreLinks` per oppgave (Claude draft basert på sensorveiledning + bruker reviewer)
10. **Bygg `/dat110/oving/quiz`** med pedagogisk feedback-card + topic-selector
11. **Utvid `/dat110`** med 5 `RecurringPatternCard` (Tier 1) — primær-anchor + "Øv på dette" + "Se eksamen-eksempel"
12. **Oppdater `/dat110/eksamen`-listing** — V2024 + 4 "Kommer i P1"-cards (per §10.18 anbefaling B)
13. **Navigation-utvidelse** med DAT110-undermeny
14. **Build-validering:** alle `learnMoreLinks` peker til eksisterende routes (strict)
15. **Typecheck + visual QA på preview-URL** per §7.5 (sjekk særlig solution-accordion + feedback-UX)
16. **PR med navn:** `feat(dat110): pedagogisk quiz + V2024-eksamen + Tier 1-konseptsider`

**Suksess-kriterier for P0:**

Quiz-pedagogikk:
- ✅ 125 quiz-spørsmål spillbare fra `/dat110/oving/quiz`
- ✅ Topic-selector fungerer + "Tier 1-only"-toggle
- ✅ Hvert Tier 1-spørsmål (~30-40) har bruker-reviewed pedagogisk feedback ved riktig OG galt svar
- ✅ "Les mer"-blå-lenker på Tier 1-spørsmål peker til ekte DAT110-konseptsider (ikke 404)
- ✅ Quiz-kortet viser ALDRI rotete inline sourceRefs eller Obsidian-paths
- ✅ Multiple_answers fungerer (checkboxes, alt-eller-ingenting)
- ✅ Distraktor-policy §5.7 ivaretatt (lengde-balanse, plausible misforståelser)
- ✅ Quiz-UX sammenlignbar med DAT109 + ekstra pedagogisk feedback

V2024-eksamen:
- ✅ V2024 rendres med 10 oppgaver
- ✅ Hver oppgave har **lukket** "Vis løsning"-accordion by default
- ✅ Accordion åpner med `expectedAnswer` + `shortReasoning` + 1-4 learnMoreLinks
- ✅ Solution-accordion fungerer med tastatur (Enter/Space/Esc)
- ✅ Hver oppgave har bruker-reviewed solution-tekst (ikke bare auto-draft)
- ✅ Ingen sourceRefs vises inline i oppgave-card

Konseptside-loop:
- ✅ 10 Tier 1 concept-sider + 2 tema-sider rendres med vault-content
- ✅ "Kilder og grunnlag"-expandable kollapset by default; ekspander viser source-liste uten local-only
- ✅ `/dat110/eksamen/gjengangere` viser Q-slot-tabell + per-slot-detalj med concept-baserte anchors
- ✅ Tier 1-cards på dashboard er klikkbare og lenker korrekt

Sikkerhet + bygging:
- ✅ `npx tsc --noEmit` passerer
- ✅ `node scripts/validate-learnmore-links.mjs` passerer (0 døde, strict)
- ✅ Ingen local-only-content i staged data-filer (Egli, Lima, Pearson×2, arXiv, Wiley)
- ✅ Pensum-PDFene IKKE pushed til web
- ✅ Dark-mode lesbar på alle nye komponenter (RecurringPatternCard, QuizFeedback, SolutionAccordion)
- ✅ Mobile lesbar på iPhone 13 viewport
- ✅ Vercel preview-deploy fungerer

**Hva P0 IKKE leverer (utsatt til P1):**
- Resterende 4 offisielle eksamener (v2022, v2023, h2024, h2025)
- Reconstructed 06-2025 (bygges i P1 med tydelig banner)
- Resterende 62 concept-sider + 19 tema-sider
- Andre 3 exam-pattern-aggregations (`sensorveiledning-themes`, `quiz-concept-coverage`, `concept-frequency`)
- Exam-simulator (timed-mode)
- Pedagogisk feedback for ikke-Tier-1-quiz-spørsmål (fallback-only i P0)
- "Kilder og grunnlag"-expandable på alle sider (kun Tier 1 + V2024 i P0)
- Project-lenker fra `/dat110/obliger` til project-source-notes

## 12. P0a implementation checklist (foundation: sync + types + concept/topic-sider)

**Scope:** Etablere data-pipeline + type-system + 10 Tier 1 concept-sider + 2 tema-sider på preview. INGEN quiz, INGEN eksamen, INGEN landing-endringer. Bare grunnmuren.

**Forutsetninger:**
- Vault v1 låst på `/home/skjold/ObsidianVault/DAT110` (verifisert)
- Pensum-PDFene tilgjengelige i `pensum/` (autoritative referanser, §0.2)
- Eksamen-prep-repo på `/home/skjold/dev/projects/eksamen-prep`, branch `main` ren

**Suksess-kriterier for P0a:**
- ✅ `/dat110/begreper/chord-ring` (og 9 andre Tier 1) rendres med vault-body på preview
- ✅ `/dat110/temaer/chord-dht` og `/dat110/temaer/overlay-and-gossip` rendres
- ✅ "Kilder og grunnlag"-expandable er kollapset by default; ekspander viser source-liste UTEN local-only
- ✅ Sync-pipeline (`npm run sync:dat110-vault`) genererer JSON-filer fra vault
- ✅ Type-system er komplett (alle typer som P0b og P0c trenger er definert)
- ✅ `npx tsc --noEmit` passerer
- ✅ Lint passerer
- ✅ Ingen Egli/Lima/Pearson/arXiv/Wiley-content i staged data
- ✅ Dark-mode lesbar på concept-sider
- ✅ Mobile lesbar
- ✅ Vercel preview-deploy fungerer
- ✅ Wikilink-resolver fungerer (verifisert med 5 sample-wikilinks)

### 12.1 Sjekkliste (i rekkefølge)

#### Foundation: scripts + types

- [ ] **1.** Opprett `src/lib/dat110-vault/types.ts` med ALLE typer (også de P0b/P0c trenger): `VaultTopic`, `VaultConcept`, `VaultSource`, `VaultExamPattern`, `DAT110QuizQuestion`, `DAT110QuizSource`, `DAT110QuizTopic`, `LearnMoreLink`, `OptionExplanation`, `SourceRef`, `ExamQuestion`, `ExamSubquestion`, `ExamSolution`, `DAT110Exam`, `VaultTema`-enum
- [ ] **2.** Opprett `src/lib/dat110-vault/loader.ts` med helper-funksjoner som leser JSON fra `src/data/dat110-vault/` (caching, type-safe)
- [ ] **3.** Opprett `src/lib/dat110-vault/wikilink-resolver.ts`: parse `[[topics/x]]`, `[[concepts/y]]`, `[[sources/z]]` → tilsvarende route (`/dat110/temaer/x`, `/dat110/begreper/y`, `/dat110/kilder/z`)
- [ ] **4.** Opprett `scripts/sync-dat110-vault.mjs`:
   - Les vault frontmatter + body fra `~/ObsidianVault/DAT110/processed/reviewed/{topics,concepts,sources,exam-patterns}/*.md`
   - Filtrer ut 6 local-only-sources (Egli, Lima×2, Pearson×2, Wiley)
   - I P0a: generer KUN `concepts-tier1.json` (10 concepts), `topics-tier1.json` (2 topics), `_meta.json`, `_wikilink-index.json`
   - Stubb-felt for P0b/P0c-data (kommer senere): `quizzes.json`, `exams/v2024.json`, `exam-patterns/recurring-questions.json` genereres ikke ennå
   - Output: pretty-printed JSON (git-diff-bar)
- [ ] **5.** Opprett `scripts/validate-learnmore-links.mjs` (strict): scan alle `learnMoreLinks` i JSON-filer; verifiser at hver `href` finnes i `_wikilink-index.json`; exit 1 hvis døde lenker. I P0a: passerer trivielt fordi ingen quiz/exam-JSON eksisterer ennå
- [ ] **6.** Opprett `scripts/validate-distractor-quality.mjs` (warn-only): scan quiz-options for lengde-balanse + ord-overlap. I P0a: passerer trivielt
- [ ] **7.** Oppdater `package.json` scripts:
   ```
   "sync:dat110-vault": "node scripts/sync-dat110-vault.mjs",
   "validate:learnmore": "node scripts/validate-learnmore-links.mjs",
   "validate:distractors": "node scripts/validate-distractor-quality.mjs"
   ```

#### Data: generer P0a JSON

- [ ] **8.** Kjør `npm run sync:dat110-vault`
- [ ] **9.** Verifiser output:
   - `src/data/dat110-vault/concepts-tier1.json` har 10 entries (chord-ring, dht-fundamentals, key-resolution, application-layer-multicast, ipv4-addressing, subnetting, arp-and-mac-addressing, delays, throughput, transparency)
   - `src/data/dat110-vault/topics-tier1.json` har 2 entries (chord-dht, overlay-and-gossip)
   - `src/data/dat110-vault/_meta.json` har sync-timestamp + vault-snapshot-info + counts
   - `src/data/dat110-vault/_wikilink-index.json` mapper alle 10 concept-slugs + 2 topic-slugs → routes
   - INGEN Egli/Lima/Pearson/arXiv/Wiley-content (grep for "egli", "lima", "pearson", "arxiv", "wiley" → 0 hits)
- [ ] **10.** Git diff: review JSON-output før commit

#### Komponenter: concept/topic-side-layout

- [ ] **11.** Opprett `src/components/dat110/ConceptPageLayout.tsx`:
   - Props: `{ concept: VaultConcept, sources: VaultSource[] }`
   - Render: tittel, tema-badge, body (via Markdown-component), related-concepts/topics som lenker, "Kilder og grunnlag"-expandable
- [ ] **12.** Opprett `src/components/dat110/SourcesAndGroundingExpandable.tsx`:
   - Kollapset by default
   - Filtrer bort `local-only`-sources før render
   - Vis hver source som: role-badge + title + (valgfri) page/section
- [ ] **13.** Opprett `src/components/dat110/TopicPageLayout.tsx` (lignende ConceptPageLayout, men for topics)

#### Dynamic routes

- [ ] **14.** Opprett `src/app/dat110/begreper/[slug]/page.tsx`:
   - `generateStaticParams()` returnerer 10 Tier 1-slugs
   - Server-component leser `concepts-tier1.json` + matchende sources fra evt. `sources.json` (eller bare metadata fra `_meta.json`)
   - Render via `ConceptPageLayout`
- [ ] **15.** Opprett `src/app/dat110/temaer/[slug]/page.tsx`:
   - `generateStaticParams()` returnerer 2 Tier 1-tema-slugs
   - Render via `TopicPageLayout`

#### Validering

- [ ] **16.** `npx tsc --noEmit` → må passere
- [ ] **17.** `npm run lint` (next lint) → må passere
- [ ] **18.** `npm run validate:learnmore` → må passere (trivielt i P0a)
- [ ] **19.** `npm run validate:distractors` → må passere (trivielt i P0a)
- [ ] **20.** Verifiser ingen import-feil for `Markdown.tsx` fra DAT107 (gjenbruk eller stub avhengig av kompleksitet)

#### Commit + preview-QA

- [ ] **21.** `git status` — verifiser ingen utilsiktede filer (særlig ingen vault-content kopiert inn ved feil)
- [ ] **22.** Commit P0a som **én atomisk commit** (eller 2-3 logiske: scripts+types, JSON-data, route+components)
   - Foreslått commit-message: `feat(dat110): P0a foundation — sync pipeline + types + Tier 1 concept/topic-sider`
- [ ] **23.** Push feature-branch til Vercel preview
- [ ] **24.** Visual QA på preview-URL (se §13.3)
- [ ] **25.** Rapporter til bruker: hvilke ruter er live, hvilke gjenstår (P0b/P0c)

### 12.2 Filer som opprettes/endres i P0a

**Nye filer:**

| Fil | Type | Linje-estimat |
|---|---|---:|
| `scripts/sync-dat110-vault.mjs` | NY | ~300 |
| `scripts/validate-learnmore-links.mjs` | NY (strict) | ~60 |
| `scripts/validate-distractor-quality.mjs` | NY (warn) | ~80 |
| `src/lib/dat110-vault/types.ts` | NY (alle typer, også P0b/c) | ~250 |
| `src/lib/dat110-vault/loader.ts` | NY | ~120 |
| `src/lib/dat110-vault/wikilink-resolver.ts` | NY | ~60 |
| `src/data/dat110-vault/concepts-tier1.json` | NY (gen) | ~1500 |
| `src/data/dat110-vault/topics-tier1.json` | NY (gen) | ~500 |
| `src/data/dat110-vault/_meta.json` | NY (gen) | ~30 |
| `src/data/dat110-vault/_wikilink-index.json` | NY (gen) | ~200 |
| `src/app/dat110/begreper/[slug]/page.tsx` | NY (dynamic, 10 slugs) | ~120 |
| `src/app/dat110/temaer/[slug]/page.tsx` | NY (dynamic, 2 slugs) | ~120 |
| `src/components/dat110/ConceptPageLayout.tsx` | NY | ~150 |
| `src/components/dat110/TopicPageLayout.tsx` | NY | ~120 |
| `src/components/dat110/SourcesAndGroundingExpandable.tsx` | NY | ~60 |

**Endrede filer:**

| Fil | Endring |
|---|---|
| `package.json` | +3 scripts (`sync:dat110-vault`, `validate:learnmore`, `validate:distractors`) |

**Filer som IKKE endres i P0a:**
- `src/app/dat110/page.tsx` (urørt — landing-endringer kommer i P0c)
- `src/app/dat110/eksamen/page.tsx` (urørt — P0b)
- `src/app/dat110/oving/*` (eksisterer ikke ennå — P0c)
- `src/components/Navigation.tsx` (urørt — undermeny i P0c)
- Eksisterende chapter-sider `/dat110/cn-*/`, `/dat110/ds-*/` (urørt)
- DAT109/DAT107/ING164 (urørt)

**Total:** ~15 nye filer + 1 endret. ~3500 linjer total.

### 12.3 QA-kommandoer for P0a

#### Pre-commit (lokalt)

```bash
cd ~/dev/projects/eksamen-prep

# Type-sjekk (eneste lokale build-relevante kommando per CLAUDE.md)
npx tsc --noEmit

# Lint
npm run lint

# Sync-pipeline (idempotent — kan kjøres flere ganger)
npm run sync:dat110-vault

# Validering
npm run validate:learnmore
npm run validate:distractors

# Verifiser local-only-filtrering (skal returnere 0 hits)
grep -ri -E "egli|keila.?lima|pearson|arxiv.?2501|wiley.?survey" src/data/dat110-vault/ || echo "OK — ingen local-only-content lekkasje"

# Verifiser ingen utilsiktede filer staget
git status
git diff --stat
```

#### Vault-side sanity (lest, ikke skrevet)

```bash
cd ~/ObsidianVault/DAT110
source processed/.venv/bin/activate

# Bekreft vault fortsatt grønn (skal være uendret siden v1-lock)
python processed/scripts/lint_source_notes.py | python -c "import json,sys; d=json.load(sys.stdin); print('source-notes:', d['passed'], '/', d['total'])"
python processed/scripts/lint_wiki.py | python -c "import json,sys; d=json.load(sys.stdin); print('wiki:', d['passed'], '/', d['total'])"
python processed/scripts/lint_exam_patterns.py | python -c "import json,sys; d=json.load(sys.stdin); print('exam-patterns:', d['passed'], '/', d['total'])"
```

Forventet: 87/87, 93/93, 4/4 PASS (uendret).

#### Vercel preview (etter push)

1. **Login** med `haavard`
2. **`/dat110/begreper/chord-ring`** — verifiser:
   - Tittel + tema-badge ("04-naming-og-chord-dht")
   - Body rendres med markdown
   - Related concepts/topics som klikkbare lenker (kan returnere 404 ennå hvis target ikke er Tier 1; OK i P0a)
   - "Kilder og grunnlag (N)"-expandable er **kollapset**
   - Klikk → viser source-liste (Tier 1 har typisk 2-5 sources)
   - INGEN local-only-sources synlige (Egli/Lima/Pearson/arXiv/Wiley)
3. **Spot-check 3 andre concept-sider:** `/dat110/begreper/delays`, `/dat110/begreper/ipv4-addressing`, `/dat110/begreper/transparency`
4. **`/dat110/temaer/chord-dht`** — samme test som concept-side
5. **`/dat110/temaer/overlay-and-gossip`** — spot-check
6. **Direct URL 404-test:** `/dat110/begreper/dns` (ikke Tier 1) → skal returnere 404 (forventet i P0a)
7. **Dark-mode-test:** toggle på concept-side, verifiser:
   - Body-tekst lesbar
   - Expandable-knapp synlig
   - Source-liste i expandable lesbar
8. **Mobile-test** (iPhone 13 viewport): concept-side leselig, expandable funker på touch
9. **Eksisterende sider uendret:**
   - `/dat110` — uforandret (samme dashboard)
   - `/dat110/cn-1`, `/dat110/ds-1` — uforandret
   - `/dat109/oving/quiz` — uforandret
   - `/ing164` — uforandret

#### Etter P0a-godkjenning

- Vent på bruker-review av preview før P0b starter
- P0b-sjekkliste forfattes som svar på P0a-godkjenning

## 13. Referanser

**Eksamen-prep:**
- `src/lib/quiz-types.ts:34-49` — DAT109 quiz-type
- `src/components/dat109/oving/QuizRunner.tsx` — quiz-state-machine
- `src/app/dat110/page.tsx:1-376` — nåværende dashboard
- `src/lib/dat110-chapters.ts:1-176` — chapter-metadata
- `src/lib/subject-progress.ts:94-133` — progress-helpers
- `CLAUDE.md:87-90` — dark-mode-regler
- `CLAUDE.md:1-14` — RAM-grense (kun `npx tsc --noEmit`)

**Vault:**
- `/home/skjold/ObsidianVault/DAT110/processed/reviewed/index.md` — wiki-root
- `/home/skjold/ObsidianVault/DAT110/processed/reviewed/exam-patterns/recurring-questions.md` — Tier 1-mønstre
- `/home/skjold/ObsidianVault/DAT110/processed/reviewed/exam-patterns/concept-frequency.md` — Tier 1-konsepter
- `/home/skjold/ObsidianVault/DAT110/processed/extracted/quizzes/*.json` — 12 quizzes, 125 spørsmål
- `/home/skjold/ObsidianVault/DAT110/processed/extracted/exams/*.json` — 5 eksamener
- `/home/skjold/ObsidianVault/DAT110/processed/reviewed/sources/dat110-eksamen-06-2025-reconstructed.md` — reconstructed warning
- `/home/skjold/ObsidianVault/DAT110/processed/reports/next-phase-eksamen-prep-plan.md` — forrige fase-plan
- `/home/skjold/ObsidianVault/DAT110/processed/reports/final-v1-vault-status.md` — v1-lock-status
