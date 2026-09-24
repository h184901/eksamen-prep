---
date: 2026-06-10
status: PLAN-ONLY (no implementation, no src/data/dat102, no commits, no vault changes)
scope: DAT102 (Algoritmer og datastrukturer) website plan for eksamen-prep
author: Fable planning pass (repo + vault + graphify + live Playwright QA as "haavard")
related:
  - /home/skjold/ObsidianVault/DAT102 (vault, QA-patched 2026-06-09)
  - reports/dat110-vault-to-site-improvement-plan.md (18 approved decisions §10.1–10.18)
  - reports/dat110-ux-visual-handoff.md
  - reports/dat110-browser-qa-report.md
  - reports/design-overhaul-plan.md (DEFERRED — DAT102 must be compatible, not dependent)
---

# DAT102 website plan

## Summary recommendation

Bygg DAT102 som en **full kopi av DAT110-vault-mønsteret** (ikke chapter-skallet): Norwegian slugs, JSON-sync fra vault, strict build-validering, quiz med pedagogisk feedback + «Les mer»-wikilinks, eksamenssider med SolutionAccordion, gjengangere-side, og en ny `/dat102/pensum`-side bygget på ukeplanen (Kap 1–29 → tema). DAT102-vaulten er ferdig QA-et (551 question-bank-items, 0 valideringsfeil etter patch-runden 2026-06-09) og er **klar som sync-kilde i dag**. Gjenbruk skjer ved **copy-adapt av DAT110-komponentene til `src/components/dat102/`** (CLAUDE.md: «ikke standardiser fagene mot hverandre»; delte primitives utsettes til den deferred design-overhaulen). Implementeres i 5 faser (0–4), der Phase 0 er ren data-sync + validatorer uten UI.

Nøkkeltall for datagrunnlaget: 14 topics · 60 concepts · 8 eksamenssesjoner (260 segmenterte oppgaver: 240 complete / 17 partial / 3 scanned_only) · 109 quiz · 80 flashcards · 60 matching · 42 drills · 3 exam-patterns · syllabus + obliger-side. Alt kildehenvist til structured/ med sidetall; pensumboka (Carrano) er reference-only (kun ToC).

## Existing site inspiration

### DAT110 patterns to reuse

Verifisert både i kode og live (innlogget som `haavard`):

1. **Vault-sync-arkitektur**: `scripts/sync-dat110-vault.mjs` → `src/data/dat110-vault/*.json` → `src/lib/dat110-vault/{types,loader,wikilink-resolver}.ts` → server components. Eksamener lazy-loades per slug (`exams/<slug>.json` via readFileSync) for bundle-kontroll.
2. **De 18 godkjente beslutningene** (§10.1–10.18 i improvement-planen) gjelder også DAT102: norske slugs, DAT109-quizmønster med topic-selector, **aldri rå sourceRefs inline** (expandable «Kilder og grunnlag» på innholdssider), JSON (ikke md-mirror), manuell sync-trigger, alt-eller-ingenting på multiple-answer, strict `validate-learnmore-links` som feiler build, konsept-baserte anchors.
3. **Quiz-feedback-loop** (live-verifisert): lås ved klikk → ✓/✗ → «Feil — riktig var A» + forklaring → **«Hvorfor dine valg var feil»** per valgt distraktor → 1–3 blå «Les mer»-lenker → ren kilde-tag («📋 Canvas Task 13»). DAT102-banken har eksakt feltene som trengs (explanation, whyWrong, learnMoreLinks, sourceRefs).
4. **Eksamensside-mønsteret** (live-verifisert på 05-2024): statusbadges («Offisiell · komplett», «10 oppgaver · 100 %»), anker-nav med vekter, deloppgavekort med qtype-tag, **SolutionAccordion** med Svar / Kort begrunnelse / Vanlige feil / Les mer.
5. **Gjengangere-mønsteret**: QSlotTable med stabilitet + ankerlenker inn i hver eksamen; PatternCard.
6. **Oving-hub** med seks modus-kort (telling + «AKTIV»-badge) + studieplan + tips-callout.
7. **Beregning/drills-mønsteret**: tema-pills med telling, vanskelighetsfilter, selvgradert «Vis løsning»-accordion med stegvis gjennomgang — passer DAT102s 42 drills (expectedSteps/finalAnswer) direkte.
8. **ConceptPageLayout/TopicPageLayout + VaultMarkdown**: badge + tema-pill + lead-ingress + seksjoner; «Kilder og grunnlag»-expandable.
9. **Custom SVG-diagrampolicy** (ChordRingDiagram m.fl.): egne pedagogiske SVG-er med currentColor/aria-label, aldri bok-/slidekopier.
10. **Infrastruktur som bare virker for nye fag**: `page_progress` med `dat102/<område>/<slug>`-keys, login/middleware, ThemeToggle, AITutor-panel (kontekst fra `page-context.ts`).

### DAT107/DAT108/DAT109 patterns to reuse or avoid

- **DAT108 finnes ikke i repoet.** Fagene er ING164, DAT107, DAT109, DAT110 (+ akseptert). Ingen DAT108-referanse å hente.
- **DAT109 (gjenbruk)**: pedagogisk gullstandard for quiz-UX (TopicSelector, lock-on-click, feedback-card) — allerede absorbert i DAT110-implementasjonen; DAT102 arver via DAT110.
- **DAT107 (gjenbruk selektivt)**: to adskilte eksamensspor («gjengangere» = bearbeidet analyse vs «originale-eksamen» = kildetro) er et godt prinsipp — DAT102 speiler dette som gjengangere-side vs per-sesjon eksamenssider. Markdown-pipeline med shortcodes er et alternativ vi **ikke** velger (vault-JSON-sync er nyere og bedre validert).
- **Unngå** (fra browser-QA-rapporten av DAT110 v1): stale «kommer i P1/P2»-tekster, interne fase-termer i brukervendt tekst («P0a», «P1-kandidat»), vault-notenavn inline i konsepttekst, teller som ignorerer kildefilter, manglende figurer i figuravhengige eksamensoppgaver, CTA-er som lover temafilter uten å sette det.

### Browser/Playwright observations

Testet live mot https://eksamen-prep.vercel.app innlogget som `haavard` (persistert cookie): `/`, `/dat110`, `/dat110/oving`, `/dat110/oving/quiz` (gjennomspilt med bevisst feil svar), `/dat110/oving/beregning`, `/dat110/begreper/chord-ring`, `/dat110/eksamen/dat110-eksamen-05-2024` (åpnet SolutionAccordion), `/dat110/eksamen/gjengangere`, `/dat110/obliger`, AI-tutor-panelet (kontekstbevisst: «Jeg vet at du er på DAT110 … Oversikt» + sidespesifikke forslag). Alt fungerer som dokumentert i handoff/QA-rapportene; ingen nye avvik observert. Språk-toggle (Norsk/English) vises kun på /dat110-ruter.

## DAT102 information architecture

| Route | Formål | Data | Komponenter |
|---|---|---|---|
| `/dat102` | Hovedside: intro, eksamensstatus, alltid-synlig eksamenformat-stripe (flervalg 1–5 ≈40 % + oppg 6–9 à 10–20 % fra nyeste sesjon), «hva bør jeg kunne»-liste, viktigste tema (6 kort), obliger-strip, quick links, visual roadmap (uke 3–19) | `_meta`, `exam-patterns`, `topics`, `syllabus`, `obliger` | `Dat102PageHeader`, format-stripe (à la DAT110), `TopicCard`-grid, `RoadmapTimeline` (ny SVG), aktiv øving-banner |
| `/dat102/temaer` | 14 topic-cards gruppert (Grunnlag/Lineære/Sortering-søk/Hashing/Trær/Grafer) | `topics.json` | `TemaerGrid`, `TemaerLandingHeader` (kopi) |
| `/dat102/temaer/[slug]` | Tema-side: body (VaultMarkdown), konsepter, forelesninger, «Pensum og obliger»-footer, kilder-expandable | `topics.json` | `TopicPageLayout`, `VaultMarkdown`, `SourcesAndGroundingExpandable`, `LearnMoreLinks` |
| `/dat102/begreper` | 60 concept-cards, alfabetisk + temafilter | `concepts.json` | `BegreperGrid` (kopi) |
| `/dat102/begreper/[slug]` | Konsept: definisjon, hvordan det virker, **kompleksitet (kun sourced)**, vanlige feil, typiske oppgavetyper, relaterte, kilder, diagram-slot | `concepts.json` | `ConceptPageLayout`, `VaultMarkdown`, diagram-komponenter |
| `/dat102/pensum` | NY sidetype: ukeplan-tabell (uke → F01–F26 → Kap → tema → oblig) + Kap 1–29 → tema-kart + forelesningsindeks med anchors (`#f08`) | `syllabus.json` (ny) | `PensumTable`, anchors; ingen bokutdrag |
| `/dat102/oving` | Hub: 6 moduskort (quiz/flashcards/matching/drills/obliger/eksamen-sim) + studieplan + tips | `_meta` counts | `OvingHubContent` (kopi) |
| `/dat102/oving/quiz` | 109 spørsmål; temavelger (14 tema m/ telling), kildefilter (📋 eksamen-basert / ✏️ pensum-generert), innstillinger, full feedback-loop | `quizzes.json` | `QuizCard`, `QuizResults`, `QuizPageHeader`, topic-selector |
| `/dat102/oving/flashcards` | 80 kort, temafilter, flip, «Les mer» | `flashcards.json` | `FlashcardRunner`, `FlashcardDeckSelector` |
| `/dat102/oving/matching` | 60 par i 4 kategorier (term-def, algoritme→kompleksitet, ADT→operasjoner, struktur→bruk), feedback + wikilinks etter svar | `matching.json` | `MatchingRunner` |
| `/dat102/oving/drills` | 42 drills (trace 17 / short-answer 14 / code-reading 6 / calculation 5), tema- + vanskelighetsfilter, stegvis «Vis løsning», figureNote-visning | `drills.json` | `DrillRunner` (utvidet `CalculationRunner` med qtype-tag + steps) |
| `/dat102/oving/obliger` | Oblig1–5 + Prøve(Oblig4) + Godkjent prøve: tema, læringsmål, konsept-pills, relevante øvinger/drills, eksamensmønstre, status-badges (`full_text_available`/`partial`/`missing_source`), frister, anchors `#oblig1..5` | `obliger.json` (ny) | `ObligCard` (ny, inspirert av DAT110 prosjektkort + status-badge) |
| `/dat102/eksamen` | 8 sesjonskort med statusbadges (komplett / delvis skannet / uten oppgaveark), tema-tags, lenker | `exams-index.json` | `EksamenListingContent` (kopi) |
| `/dat102/eksamen/[slug]` | Per sesjon (`2024-vaar` osv.): anker-nav, oppgaver→deloppgaver, SolutionAccordion (Svar/Begrunnelse/Vanlige feil/Les mer), partial/scanned-merking per item, sesjonsbanner ved skannet innhold | `exams/<slug>.json` | `ExamPageLayout`, `ExamQuestionCard`, `SolutionAccordion`, `ScannedBanner` (gjenbruk av ReconstructedExamBanner-mønsteret) |
| `/dat102/eksamen/gjengangere` | Sesjon×tema-matrise, sterkt/hyppig/sjelden-tiers, oppgavetype-katalog, prioriteringsliste, ankerlenker inn i sesjoner | `exam-patterns.json` | `PatternCard`, `RecurringMatrix` (tabell à la QSlotTable) |
| `/dat102/oving/eksamen-sim` | Simulering av komplette sett (2023/2024/2025-vaar/2026-jan m.fl.); skannede/partial-sesjoner ekskludert eller merket | `exams-index` + `exams/*` | `ExamSimulationLayout` |
| `/dat102/oppsummering` | Kompakt eksamensoppsummering: Big-O-tabeller (kun sourced verdier), algoritmevalg-guide, vanlige feil, «siste uke»-plan | `concepts` (sorting-comparison m.fl.) + `exam-patterns` | statisk side + `BigOTable`, growth-chart |

I tillegg: homepage-kort + pills for DAT102 på `/`, innslag i `Navigation.tsx`, `page-context.ts`-utvidelse (tutor).

## DAT102 data model proposal

**Filer (generert av `scripts/sync-dat102-vault.mjs`):**
```
src/data/dat102-vault/
  _meta.json            # syncedAt, vaultPath, counts
  _wikilink-index.json  # routes: {"concepts/<slug>": "/dat102/begreper/<slug>", ...}
  concepts.json         # alle 60 (ingen tier-gating — vaulten er komplett)
  topics.json           # alle 14
  syllabus.json         # ukeplan-rader + kap→tema-kart + forelesningsindeks (fra syllabus.md + lectures/index.md)
  obliger.json          # Oblig1–5 + Prøve + Godkjent prøve m/status
  quizzes.json          # 109 (adapter fra question-bank)
  flashcards.json       # 80
  matching.json         # 60
  drills.json           # 42
  exam-patterns.json    # 3 mønstersider aggregert
  exams-index.json      # 8 sesjoner m/ status-sammendrag
  exams/<session>.json  # 2020-vaar.json ... 2026-vaar.json (lazy-load per slug)
src/lib/dat102-vault/
  types.ts              # DAT102Concept/Topic/QuizQuestion/Exam/... (speiler dat110-vault/types.ts)
  loader.ts             # typed accessors + lazy exam-load
  wikilink-resolver.ts  # namespaces: concepts/topics/eksamen/exam-patterns/obliger/pensum
```

**Adapter-mapping question-bank → web (dokumentert i vaultens segmentation-report, bekreftet mot web-skjemaene):**
- quiz: `prompt→question`, `type→qtype` (`single-choice|true-false→multiple_choice`, `multiple-answer→multiple_select`), `correctAnswer→correctIndices[0]` / `correctAnswers→correctIndices`, `explanation→explanationCorrect` (+`explanationIncorrect`), `whyWrong[{option,text}]→optionExplanations[{optionIndex,isCorrect,shortExplanation}]`, `sourceRefs` beholdes internt, kilde-tag avledes (`📋 Eksamen V2023` / `✏️ Pensum (F08)`) — aldri rå paths.
- exam: flat 260 → grupper på `(examSession, questionNumber)` → `subquestions[]` per `subquestion`-bokstav; `solution{answer→expectedAnswer, reasoning→shortReasoning, commonMistakes}`; **`points` normaliseres string→number (null tillatt på partial)**; sesjonsnivå: `pairStatus` + skannet-flagg fra vaultens exams/<session>.md.
- drills: feltene matcher `CalculationDrill` (prompt/expectedSteps/finalAnswer) + nye felt `qtype` og `figureNote`.

**sourceRefs-strategi:** verifiseres ved **sync-tid** mot vault-filsystemet (web-runtime ser dem aldri som paths). På innholdssider vises de kun i «Kilder og grunnlag»-expandable som ren tekst («F09 Sortering 2, s. 20–36»). I quiz/drills vises kun avledet kilde-tag.

**Wikilink-resolver:** bygges som DAT110 (build-time pre-resolve i bodies + runtime-resolver for learnMoreLinks), med DAT102-utvidelser: `obliger`-anchors (`[[Oblig2]] → /dat102/oving/obliger#oblig2`), `pensum`-anchors for forelesninger (`[[F08 Sortering 1]] → /dat102/pensum#f08`), pluss **alias-tabell** fra slug-registry-titler slik at menneskeform (`[[Hashing]]`, `[[Binary Search Tree]]`) resolver til slug-rutene. Ikke-mappede namespaces (sources/, reports/) rendres som italic-stubs, aldri som lenker.

**Validatorer (kjøres i sync + CI, strict der angitt):**
| Validator | Sjekk | Nivå |
|---|---|---|
| `validate-dat102-learnmore.mjs` | alle learnMoreLinks/route-felt resolver mot `_wikilink-index` | **fail** |
| `validate-dat102-distractors.mjs` | lengderatio ±50 %, nøkkelord-lekkasje | warn |
| sync: sourceRefs | hver ref finnes i vaulten (path + `#pNN` strippes) | **fail** |
| sync: no-book | deny `/Bok/`, `carrano` i refs; heuristikk mot lange engelske bokavsnitt i bodies | **fail** / warn |
| sync: exam-status | status ∈ {complete, partial, scanned_only, missing_solution}; `scanned_only ⇒ solution=null` | **fail** |
| sync: qa_pending-deny | publiserte tekster må ikke numerisk assertere deny-listen (O(V+E), per-ADT-tabeller for Bag/Stack/Queue/Deque/SortedList, 2-3-tre/PQ-big-O, hash-kurver, growth-faktor) | **fail** |
| sync: schema | JSON-shape per types.ts (zod-lett eller håndskrevet som qa.py) | **fail** |
| sync: slugs | kebab-ASCII, unike, route-kollisjon mot eksisterende app-ruter | **fail** |
| sync: assets | alle figur-referanser i data peker på eksisterende filer under `public/dat102/` | **fail** |
| sync: mojibake/æøå | qa.py-regexen portert | **fail** |

## Visual strategy

**Policy** (arver design-planens diagram-policy): egne pedagogisk forenklede SVG-er i `src/components/dat102/diagrams/`, `currentColor` for dark-mode, `aria-label` + `<title>`, aldri kopier av bok-/slidefigurer. Structured-assets (2 772 slide-renders) **republiseres ikke** som innhold; unntak vurderes kun for eksamens-figurcrops (egen beslutning, se Risks).

**Konkrete visualiseringer (runde-prioritert):**

| # | Visualisering | Form | Datagrunnlag | Runde |
|---|---|---|---|---|
| 1 | Big-O growth chart (O(1)…O(2ⁿ)) | Recharts/SVG, log-toggle | fc-004, q-002 | 1 |
| 2 | ArrayBag vs LinkedBag side-ved-side | React SVG, interaktiv `add()` | F02/F04-konsepter | 1 |
| 3 | Node-lenke (data\|next-bokser) | React SVG (gjenbrukes av 2, 4) | linked-node | 1 |
| 4 | Stack push/pop/peek | interaktiv SVG (LIFO-animasjon) | drill-015 | 1 |
| 5 | Sirkulærkø + deque (modulo-wrap, front/back) | interaktiv SVG | F12, fc-071 | 1 |
| 6 | Insertion sort trace (radvise tilstander) | step-through SVG | drill-007/008 | 1 |
| 7 | BST insert/søk (sekvens 4,2,6,3,1,7,5) | interaktiv SVG | q-085, drill-024 | 1 |
| 8 | Hash-tabell m/ kollisjoner + lineær probing + FJERNA | interaktiv SVG | drill-021, exam 2022-q4c | 1 |
| 9 | Binærtre-traversering (pre/in/post/nivå med besøkstall) | toggle-SVG | drill-023/026 | 2 |
| 10 | Merge sort split/merge-tre | SVG | drill-010 | 2 |
| 11 | Quicksort-partisjon (pivot-highlight) | SVG | drill-041 | 2 |
| 12 | Radix-køer per pass (base 5) | step-SVG | drill-012 (verifisert trace) | 2 |
| 13 | Heap insert/remove: tre + 1-indeksert tabell synkront | interaktiv SVG | drill-027/028 | 2 |
| 14 | Recursion call stack (fakultet/binærsøk) | step-SVG | drill-004/042 | 2 |
| 15 | BST delete (3 tilfeller) | step-SVG | fc-034 | 3 |
| 16 | 2-3-tre insert/splitt/promotering | step-SVG | fc-039, drill-029 | 3 |
| 17 | Nabomatrise vs naboliste (samme graf) | SVG | drill-032 | 3 |
| 18 | BFS/DFS med kø-/stabeltilstand + besøksrekkefølge | interaktiv SVG | drill-033/034 | 3 |
| 19 | Dijkstra billigste sti (vektet graf, **uten O-påstander**) | SVG | F25/F26 + 2025-jan | 3 |
| 20 | MST (kun konseptuelt, kilden er tynn) | SVG-slot, lav prioritet | F26 | 4 |
| 21 | Eksamens-roadmap (uke 3–19 + sesjon×tema-heatmap) | SVG/Excalidraw-stil | ukeplan + concept-frequency | 1 |
| 22 | Ordbok/map (nøkkel→verdi) | enkel SVG | F17 | 2 |

**Excalidraw-kandidater** (genereres som .excalidraw → eksport SVG, «håndtegnet» stil for oversikter): konseptkart topics↔concepts, ADT-hierarki (Bag→List→SortedList / Stack/Queue/Deque), «hvilken sortering velger jeg»-beslutningstre, semester-roadmap.

`DiagramFrame`/`DiagramSlot`-mønsteret fra design-planen gjenbrukes slik at manglende diagrammer får eksplisitt «kommer»-slot i stedet for svakt innhold.

## Wikilink strategy

- **Syntaks i vault**: `[[topics/x]]`, `[[concepts/y]]`, `[[exams/2024-vaar]]`, samt menneskeform-aliaser. Sync pre-resolver bodies; runtime-resolver håndterer learnMoreLinks.
- **Resolver-mapping**:
  - `concepts/<slug>` → `/dat102/begreper/<slug>`
  - `topics/<slug>` → `/dat102/temaer/<slug>`
  - `exams/<session>` → `/dat102/eksamen/<session>`
  - `exam-patterns/*` → `/dat102/eksamen/gjengangere` (+anchor)
  - `assignments/obliger#obligN` / alias `[[ObligN]]` → `/dat102/oving/obliger#obligN`
  - forelesnings-alias `[[F08 Sortering 1]]` → `/dat102/pensum#f08` (fallback: mappet tema)
  - alias-tabell: tittel→slug fra slug-registry (`[[Hashing]]`→hash-table-ruta, `[[Binary Search Tree]]`→binary-search-tree)
- **Sideintegrasjon**: topics ↔ concepts ↔ obliger ↔ exams kryss-lenkes (vault-bodies har dette allerede); «Relaterte»-seksjoner rendres som pill-lenker.
- **Quiz-feedback**: 1–3 learnMoreLinks vises ved både riktig og feil svar (DAT110-mønsteret).
- **Eksamen/oblig**: hver deloppgaveløsning får learnMoreLinks (finnes i banken); obliger-siden lenker konsepter, relevante ukeoppgaver og gjengangere.
- **Validering**: døde ruter feiler build (strict).

## Quiz/feedback strategy

Identisk UX som DAT110 (live-verifisert), med DAT102-tilpasninger:
- **Riktig**: grønn «✓ Riktig!» + `explanation` + «Les mer»-lenker.
- **Feil**: rosa «✗ Feil — riktig var X» + forklaring + **«Hvorfor dine valg var feil»** fra `whyWrong` (kun valgte distraktorer) + samme lenker.
- **Kilde-tag**: avledet og ren («📋 Eksamen V2023 oppg 6» / «✏️ Pensum (F18b)») — aldri paths.
- **Typer**: 64 single-choice + 20 true-false (radio), 17 multiple-answer (checkbokser + «Bekreft svar», alt-eller-ingenting). **8 short-answer**: anbefalt løsning = self-check-kort (skriv/tenk → «Vis fasit»-accordion → selv-vurder riktig/feil); alternativ er å flytte dem til drills (åpen beslutning).
- Teller/innstillinger må respektere kildefilter (kjent DAT110-bug unngås).
- qa_pending-disiplin håndheves: ingen quizfeedback asserterer deny-liste-kompleksiteter.

## Exam strategy

- **Tre statusklasser synlige overalt**: complete (240) → full SolutionAccordion; partial (17) → accordion med figurforbehold («Figur-basert svar — se notat») + `figureNote`; scanned_only (3, 2020-vaar Del 1) → eksplisitt banner, prompt = faktanotat, **ingen** løsning (aldri lat som komplett).
- **Sesjonsbannere**: 2020-vaar («Del 1 er skannet — kun oppgave 4–5 har tekst»), 2025-vaar (flervalg-uten-svar skannet; m/svar-varianten brukes), 2026-vaar («ingen separat oppgaveark — tekst fra løsningsforslag v4»; v4 + flervalg-NY er autoritativ, dokumentert i vaultens exam-index).
- **SolutionAccordion**: Svar / Kort begrunnelse / Vanlige feil / Les mer — feltene finnes 1:1 i banken.
- **Anker-nav** per oppgave (`#oppg-6`), vekter i poeng (normalisert til tall).
- **Gjengangere**: sesjon×tema-matrise + tiers («alle 8 sesjoner»: kjedet struktur, BST-kode, sortering, O-notasjon; hyppig: binærsøk, rekursjon, JUnit, heap; sjelden m/ anti-overclaim: 2-3-trær n=1, hashing n=1) + oppgavetype-katalog + prioriteringsliste for eksamenslesing.
- **Eksamen-sim**: kun sesjoner med komplett tekst (2022–2026-jan utvalg); 2020/2025-vaar merkes uegnet for sim.

## Oblig strategy

Én side (`/dat102/oving/obliger`) med seks kort + anchors, alt fra vaultens `assignments/obliger.md` (kildeverifisert mot Canvas-oversikten):

| Oblig | Status-badge | Innhold på kortet |
|---|---|---|
| Oblig1 — Filmarkiv | full_text_available | frist 1. feb, uke 4–5, tema/konsept-pills (bag, analyse), lenker til ukeoppgave-kilder + relaterte drills/quiz-tema |
| Oblig2 — Stabel/sortering | full_text_available | frist 20. feb, uke 6–8, stabel/rekursjon/sortering |
| Oblig3 — Mengde | full_text_available | frist 19. mars, uke 9–12, lister/sortert liste/ordbok |
| Oblig4 / Prøve | **partial** | 17. apr, 55 p, kumulativt t.o.m. BST; tydelig «prøvetekst finnes ikke som kilde» |
| Godkjent prøve | **missing_source** | udatert resit; ærlig tomt |
| Oblig5 | full_text_available **+ løsningsforslag** | 30. apr, hashing/trær/hauger/grafer; lenke til LF-kilden |

Hvert kort: læringsmål (avledet fra tema), «relevante øvinger» (quiz-tema + drills), «eksamensmønstre» (gjengangere-anchor), wikilinks. Status-koden vises med samme badge-språk som eksamenssidene; `index_only` finnes ikke i dagens data men støttes i typen.

## Book/reference-only policy

- **Kan brukes**: kapittelnumre/-titler + rekkefølge (ToC) som struktur på `/dat102/pensum` og «Kap»-merker på tema/forelesninger; terminologi-avklaring offline.
- **Kan ikke brukes**: boktekst, bokfigurer, parafraser av lengre avsnitt, kapittelsider «basert på boka». Ingen bok-PDF-er i `public/`.
- **Kapittelsider blir student-facing slik**: `/dat102/pensum` viser Kap-nummer/tittel → lenker til **kursets egne** tema-/konseptsider (som er egne forklaringer kildehenvist til forelesninger/oppgaver/eksamener). Ingen per-kapittel brødtekst genereres fra boka. Boka står som «reference-only» i kilder-seksjonen, aldri som innholdskilde.
- Sync-validatoren håndhever dette (deny Carrano-refs + engelsk-heuristikk).

## Component reuse plan

**Strategi: copy-adapt til `src/components/dat102/`** (CLAUDE.md fraråder å standardisere fag mot hverandre, og DAT110 skal ikke røres rett før/etter eksamensbruk). Ekstraksjon av delte primitives utsettes til design-overhaulens D3+ (som allerede planlegger `<SubjectCard>`).

| Gjenbruk (kopi m/ små tilpasninger) | Fra |
|---|---|
| QuizCard, QuizResults, QuizPageHeader, topic-selector-mønsteret | dat110/oving |
| FlashcardRunner, FlashcardDeckSelector, Flashcard | dat110/oving |
| MatchingRunner | dat110/oving |
| CalculationRunner/CalculationDrill → **DrillRunner** (+qtype-badge, figureNote) | dat110/oving |
| ExamSimulationLayout | dat110/oving |
| ExamPageLayout, ExamQuestionCard, SolutionAccordion, EksamenListingContent | dat110 |
| ReconstructedExamBanner → **ScannedExamBanner** (tekstvariant) | dat110 |
| PatternCard, QSlotTable → RecurringMatrix | dat110/eksamen |
| ConceptPageLayout, TopicPageLayout, BegreperGrid/TemaerGrid + headere, VaultMarkdown, SourcesAndGroundingExpandable, LearnMoreLinks, Dat110Badge→Dat102Badge | dat110 |

**Nye DAT102-komponenter**: PensumTable, ObligCard, RoadmapTimeline, BigOTable + diagrams/ (runde 1–3 over), DrillRunner-utvidelsen.

**Verdt å ekstrahere senere (design-overhaul)**: LearnMoreLinks, SolutionAccordion, VaultMarkdown, badge/banner-primitives, quiz-kjernen → `src/components/vault-ui/`.

**Felles infrastruktur som bare utvides**: `Navigation.tsx` (+DAT102-lenke), `page-context.ts` (+`"dat102"` i Subject-unionen — merk: dat107 mangler også der i dag), `tutor-prompts.ts` (+DAT102-persona), homepage subject-grid (+kort med pills: Quiz · Eksamener · Begreper · Gjengangere), tailwind-farge **`algo`/dat102-familie (forslag: cyan/teal)** — distinkt fra network-blå og sysdev-grønn.

## Implementation phases

### Phase 0 — data sync + validators only (ingen UI)
- `scripts/sync-dat102-vault.mjs` (les vault → skriv `src/data/dat102-vault/*`), `src/lib/dat102-vault/{types,loader,wikilink-resolver}.ts`, alle validatorer, npm-scripts (`sync:dat102-vault`, `validate:dat102`).
- Forutsetning løses her: de **5 deferred eksamens-items med usourcede graf-O-påstander** (2022-q4b, 2023-q5b, 2025-jan-q4a, 2025-vaar-q4b, 2026-jan-q4b) + fc-055 håndteres (anbefalt: liten vault-patch etter godkjenning; alternativ: sync-deny som omformulerer ikke — da må de fikses uansett før Phase 3).
- Akseptkriterium: sync idempotent, alle validatorer grønne, `npx tsc --noEmit` grønn, ingen ruter ennå.

### Phase 1 — `/dat102` + temaer + begreper + pensum
- Hovedside (m/ format-stripe, tema-kort, obliger-strip, roadmap v1), `/temaer[/slug]`, `/begreper[/slug]`, `/pensum`; navigasjon + homepage-kort + page-context-stub; diagram-runde 1 (Big-O, ArrayBag/LinkedBag, stack, BST-insert, hash-probing, roadmap).
- Akseptkriterium: alle 60+14 sider rendrer med kilder-expandable; wikilinks i bodies resolver; dark mode + 375/1024/1440 px sjekkes via Playwright på preview-deploy.

### Phase 2 — quiz/flashcards/matching/drills (+ oving-hub)
- `/oving` hub + de fire modusene; kildefilter-korrekt teller; short-answer-beslutning implementert; diagram-runde 2 koblet inn i drills der relevant.
- Akseptkriterium: gjennomspilt quiz (riktig+feil+multiple-answer+short-answer), drill-accordion med steg, alle learnMore-mål 200.

### Phase 3 — eksamen + gjengangere + obliger (+ eksamen-sim + oppsummering)
- `/eksamen`, 8 `[slug]`-sider m/ status-håndtering og bannere, gjengangere, `/oving/obliger`, eksamen-sim, `/oppsummering` m/ BigOTable; eksamensfigur-beslutningen effektueres.
- Akseptkriterium: scanned/partial aldri presentert som komplett; alle ankere fra gjengangere treffer; sim ekskluderer uegnede sesjoner.

### Phase 4 — visual polish + AI tutor + English mode (senere)
- Diagram-runde 3 (+MST-slot), Excalidraw-oversikter, tutor-integrasjon: page-context for dat102-områder, DAT102-prompt med (a) gjeldende sides vault-utdrag, (b) wikilink-indeks så tutoren kan svare «sjekk [Hashing](/dat102/begreper/hash-table)», (c) qa_pending-deny-listen i systemprompten. Engelsk-modus kun hvis EN-oversettelser produseres (gjenbruk Dat110LangToggle-mønsteret + `validate-quiz-translations`).

## Risks and open decisions

**Risiko:**
1. **Figuravhengige eksamensitems (17 partial + 3 scanned)** — uten figurer blir enkelte oppgaver uøvbare (DAT110-QA viste samme problem). Mitigasjon: figureNote alltid; ev. figur-crops (beslutning 3); OCR/transkripsjonspass i vault er langsiktig fiks.
- 2. **qa_pending-lekkasje** — nettstedet må ikke «hjelpsomt» fylle inn O(V+E) m.m. Mitigasjon: deny-validator + tutor-prompt-regel.
3. **Komponent-divergens** — copy-adapt gir duplisering inntil design-overhaul D3+; akseptert og dokumentert.
4. **Bundle-størrelse** — exams lazy-loades per slug (DAT110-mønsteret); quiz/flashcards/matching/drills er små (<1 MB samlet).
5. **Stale fase-tekster** — forby «kommer i fase X» i brukervendt tekst; bruk DiagramSlot/disabled-cards kun med nøytral tekst.

**Åpne beslutninger (trenger ditt ja/nei):**
1. **Fagfarge**: forslag cyan/teal-familie for DAT102.
2. **8 short-answer-quizitems**: self-check-kort i quizen (anbefalt) eller flytte til drills.
3. **Eksamensfigur-crops** fra `structured/assets` til `public/dat102/exam-figures/` for partial-items: kursmateriale (ikke bok), innloggingsgatet side — anbefalt JA, men det er publisering av kursmateriale og skal godkjennes eksplisitt.
4. **De 5 + 1 deferred O-påstandene**: patch i vault (anbefalt, liten) før Phase 0-sync.
5. **Obliger-plassering**: `/dat102/oving/obliger` (din spec, anbefalt) vs `/dat102/obliger` (DAT110-presedens).
6. **Eksamensstatus-tekst på hovedsiden**: V2026 ble avholdt 21. mai 2026 — siden bør formuleres mot kont/neste kull («siste eksamen: V2026 med løsningsforslag»), avklar ønsket vinkling.
7. **Drills-rute-navn**: `/oving/drills` (din spec, anbefalt — dekker trace/kode, ikke bare regning) vs DAT110-konsistente `/oving/beregning`.

## Recommended next prompt

> «Implementer **Phase 0** av reports/dat102-website-plan.md: lag `scripts/sync-dat102-vault.mjs`, `src/lib/dat102-vault/{types,loader,wikilink-resolver}.ts` og validatorene, generer `src/data/dat102-vault/` fra vaulten, og kjør `npx tsc --noEmit` + alle validatorer. Beslutninger: [farge=…, short-answer=…, figur-crops=…, obliger-rute=…]. Vault-patch av de 5 graf-O-items: [ja/nei]. Ingen ruter/UI ennå. Ikke commit før jeg har sett valideringsrapporten.»
