---
date: 2026-05-27
status: HANDOFF — visual analysis only, no implementation
scope: Pass UX/design observations from Mac/Chrome session to the Debian session that will implement P0b/P0c
source_session: Mac, Chrome MCP against eksamen-prep.vercel.app, logged in as "haavard"
target_session: Debian session that will implement P0b → P0c → P1
constraints:
  - no code changes by this session
  - no commits
  - no pushes
  - no vault changes
  - this file is the only artifact produced
---

# DAT110 UX visual handoff

## Formål

Dette er en **visuell UX-handoff** fra Mac/Chrome-sessionen til Debian-sessionen som skal implementere P0b/P0c.

Mac-sessionen brukte Claude in Chrome MCP til å inspisere både DAT109 (referanse-implementasjonen) og dagens DAT110 (chapter-skall + P0a vault-data live), og sammenstilte observasjonene til en konkret design-spec.

**Mac-sessionen har ikke endret kode, vault, eller commits.** Denne markdown-filen er hele leveransen. Debian-sessionen bruker rapporten som designgrunnlag og tar selv beslutninger om commit-strategi.

## Verifisert visuelt

Sider inspisert mot deployed site (https://eksamen-prep.vercel.app):

- `/dat109` — DAT109 landing (referanse for hierarki + eksamenformat-stripe + emner + aktiv øving-banner)
- `/dat109/oving` — DAT109 øving-hub (referanse for modus-grid + studieplan + tips-callout)
- `/dat109/oving/quiz` — DAT109 quiz (referanse for TopicSelector, QuizCard, lock-on-click, reveal-on-answer, feedback-card, source-tags)
- `/dat110` — dagens DAT110 landing (2 verktøy-kort + 3 collapsible seksjoner; eksamenformat skjult bak collapse)
- `/dat110/begreper/chord-ring` — P0a konseptside (ren VaultMarkdown med callout + breadcrumb + tema-pill)
- `/dat110/temaer/chord-dht` — P0a temaside (samme pattern)
- `/dat110/eksamen` — redirect-stil side til per-oppgavetype-listing (ikke en eksamen-årlisting)
- `/dat110/eksamen/v2024` — **404** (P0b er ikke deployet ennå, confirmed)

Innlogget som `haavard` (cookie persistert på tvers av navigasjon). Quiz gjennomspilt mid-question for å verifisere feedback-UI.

**Note**: Mac-sessionen gjorde **ingen kodeendringer**, **ingen sync-kjøring**, og **ingen commits**.

## Kort konklusjon

- **DAT109 er en god visuell og interaktiv mal for DAT110.** Hierarkiet, pedagogikken og quiz-loopen er klar nok til at den fortjener å bli kopiert pattern-for-pattern.
- **DAT110 bør kopiere DAT109's struktur, stil og UX-patterns, men tilpasses faginnholdet:** 10 oppgaver (ikke 4), 3 kildetyper (ikke 2), regneoppgaver i tillegg til flervalg, multiple-answer-spørsmål, og rikere eksamen-løsninger som krever accordion-pattern i stedet for radio-button-grading.
- **P0b bør fortsatt prioriteres før P0c**, jf. plan §11 — V2024-siden er nyttig alene, og P0c (quiz + landing-redesign) bruker P0b's `learnMoreLinks`-destinasjoner.
- **P0c bør bruke denne rapporten som designgrunnlag** for landing-redesign, quiz-implementasjon og aktiv øving-hub. P0b-arbeidet trenger bare små biter av designet (SolutionAccordion + ExamPageLayout + reconstructed-banner-stub for P1).

## DAT109-patterns DAT110 bør kopiere

### Landing-hierarki
DAT109 viser **alt prioritert innhold uten å gjemme det bak collapse**: hero → eksamenformat-stripe → emner-grid → aktiv øving-banner → referansemateriell. Brukeren får hele "hva teller" og "hva gjør jeg nå" på første scroll-skjerm.

### Eksamenformat-stripe
Grønn ramme, alltid synlig (ikke collapsed). 4 likestilte oppgave-kort horisontalt med tittel + vekt-prosent (40/20/20/20). DAT109's stripe står på `src/app/dat109/page.tsx:111-141` som referanse. Visuell prioritetssignal i ett øyekast.

### Emner/cards
2-3-kols grid med store kort. Hvert kort: ikon-boks (rounded-lg, fargekodet bg) + h3 + 1-3 setningers beskrivelse + vekt-pill i hjørnet ("~40%") + tynn progress-bar nederst. Kortene har subtil hover (`hover:-translate-y-0.5 hover:shadow-md`). Implementasjon: `TopicCard` i `src/app/dat109/page.tsx:49-89`.

### Aktiv øving-banner
Stor gradient-card (grønn→teal) med 🎯-emoji, bold h3, kort beskrivelse, og en rad av sub-tag-pills (Quiz · Eksamensim · Flashcards · Matching). Plassert mellom emner og referansemateriell. Visuelt magnetisk. Implementasjon: `src/app/dat109/page.tsx:151-183`.

### Referansemateriell-grid
2-3-kols grid med rød/oransje aksent (DAT109-spesifikk fargevalg som signaliserer "annet type innhold"). Kort har samme struktur som emne-kort, men annen ramme- og bakgrunnsfarge. Implementasjon: `src/app/dat109/page.tsx:186-221`.

### /oving modus-hub
2×2 grid av modus-kort, hver med egen rammefarge (grønn=Quiz, rose=Eksamensim, amber=Flashcards, violet=Matching). Hvert kort: stor emoji (text-2xl), h3, beskrivelse som faktisk forklarer hva man får ("Score, forklaringer og 'drill bare feil'-modus"). Under: anbefalt studieplan-card med dag-for-dag plan, og amber tips-callout. Implementasjon: `src/app/dat109/oving/page.tsx`.

### Topic selector
- Hurtigvalg-rad øverst: `Velg alle / Fjern alle / Oppgave 1-4`.
- Per-eksamen-oppgave-grupper med stor label (`OPPGAVE 1 — MODELLERING (40%)`).
- Temaer som 2-3-kols grid, hvert kort: emoji + tittel + 1-setningsforklaring + "N spørsmål tilgjengelig"-counter (grønn lenke-stil).
- Disabler kort med 0 spørsmål med `opacity-40 cursor-not-allowed` + "Ingen spørsmål ennå".
- Innstillinger-blokk nederst: range-slider for antall (5–total), checkbox for "bare ekte", checkbox for "shuffle anbefalt", stor grønn Start-knapp med dynamisk tekst.
- Implementasjon: `src/components/dat109/oving/TopicSelector.tsx`.

### Quiz progress/score
Tynn progress-bar (grønn) + tekst-counter "Score: X / Y" alltid synlig under quiz. Implementasjon: `src/components/dat109/oving/QuizRunner.tsx:119-130`.

### Feedback after answer (lock-on-click + reveal-on-answer)
- Klikk på alternativ låser umiddelbart, ingen mulighet til å endre.
- Riktig markeres grønn ramme + ✓.
- Valgt-men-feil markeres rosa ramme + ✗.
- Øvrige alternativer fades med `opacity-50`.
- Feedback-card under: grønn for riktig ("✓ Riktig!"), rosa for feil ("✗ Feil — riktig svar var D") + forklaringstekst.
- Implementasjon: `src/components/dat109/oving/QuizCard.tsx`.

### Green/red feedback
Konsistent fargesystem: `border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/30` for riktig, `border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30` for feil. Holder seg likt i dark mode med eksplisitt opasitet.

### Source tags
Kompakt tag-rad nederst i feedback-card: `📋 Fra eksamen V2024` `📚 V2024 oppg 3r`. Klein font (`text-xs`), `text-[var(--muted)]`, ikon + tekst. Ikke en `<details>`-blokk, ikke fri tekst — bare to korte tags. Implementasjon: `src/components/dat109/oving/QuizCard.tsx:135-146`.

### Mobile responsive grid
Konsistent Tailwind-pattern: `grid sm:grid-cols-2 lg:grid-cols-3 gap-4`. Stables til 1 kolonne på mobile (< 640px). Eksamenformat-stripen blir vertikal stack på mobil. Topic-selector-hurtigvalg wrappes med `flex flex-wrap gap-2`.

### Dark mode pattern
- Gradient-kort: `dark:from-*-950/70 dark:to-*-950/50` (sterk opasitet).
- Indre stats-kort: `bg-white/80 dark:bg-neutral-900/90`.
- Eksplisitte tekstklasser: `text-neutral-700 dark:text-neutral-200` for labels, `text-neutral-900 dark:text-neutral-50` for hovedtekst — ikke bare `text-[var(--muted)]` (gir for dårlig kontrast).
- Dette er allerede dokumentert i CLAUDE.md "Dark mode-regel".

## DAT110 må gjøre annerledes

Disse er bevisste avvik fra DAT109 fordi faginnholdet er annerledes:

- **DAT110 har 10 eksamensoppgaver, ikke 4**. En 4-kols horisontal stripe blir for trang. Bruk i stedet **5×2 (xl) / 2×5 (sm) / 1×10 (mobile)** grid for eksamenformat-stripen — og hold den **alltid synlig**, ikke collapsed.
- **DAT110 har flere kildetyper enn DAT109**:
  - Tidligere DAT110-eksamener (2022, Jan 2024, Mai 2024, Jan 2025)
  - Canvas-quizer (12 quizer, ~125 spørsmål per vault)
  - Genererte spørsmål (pensum-baserte)

  DAT109 har bare 2 kilder (ekte/V2023+V2024 vs generert) og bruker en enkelt boolsk toggle. DAT110 trenger **3 checkboxer** eller multi-select-pills, alle default på.
- **DAT110 har regne-/algoritmeoppgaver** (delay-beregning, subnetting, FT-konstruksjon, vektor-klokker) som ikke alltid passer i flervalgs-modell. Disse kan dekkes med flervalg i P0c, men en framtidig "Regneøving"-modus med fri-tekst-svar + sjekk-mot-fasit hører til P2-roadmap.
- **DAT110 trenger multiple-answer support**: Canvas-quiz har "velg alle som passer"-spørsmål. UI bruker checkboxer i stedet for radio, scoring er alt-eller-ingenting (plan §10.9). Må reflekteres både i QuizQuestion-modellen og QuizCard-rendering.
- **DAT110 trenger `learnMoreLinks` i quiz-feedback**: 1-3 blå lenker per spørsmål som peker til `/dat110/begreper/[slug]`, `/dat110/temaer/[slug]`, eller `/dat110/eksamen/[slug]#anchor`. DAT109 har ikke dette — det er en ren DAT110-tilføyelse for å scaffolde fra quiz til konseptside. Typen er allerede definert i `src/lib/dat110-vault/types.ts`.
- **DAT110 må ikke vise rotete Obsidian sourceRefs inline** (plan §10.3). DAT109's nåværende tag-rad har f.eks. `📚 V2024 oppg 3r` der "3r" er en obscure pensum-ref-streng — for DAT110 må kilde-tags være helt rene: `📋 Mai 2024 oppg 9`, `📋 Canvas Task 7`, `✏️ Pensum`. Aldri Obsidian-paths, vault-slugs, eller `sourceRefs[]`-arrays i fri tekst.
- **Reconstructed 06-2025 må merkes tydelig senere** (plan §10.4): rød/oransje banner full bredde over eksamen-content, eksplisitt tekst "Rekonstruert basert på sensorveiledning. Ikke offisiell originaltekst." Aldri kalle den "offisiell" eller "original". Banner-komponent kan stubes i P0b og brukes for ekte i P1.
- **Local-only/copyright-sensitive innhold må ikke lekke**: sync-pipelinen filtrerer allerede Egli/Lima/Pearson/arXiv/Wiley fra source-listen. Pensum-PDFene må aldri publiseres på web (plan §10.14) — bruk dem som autoritative offline-referanser for scope, og skriv en manuell "Pensum og rammeverk"-side med egne ord.

## Foreslått DAT110 landing layout

Seksjonsrekkefølge for `/dat110`:

1. **Hero**
   - H1: "DAT110 Nettverksteknologi og distribuerte systemer"
   - P: "Distribuerte systemer + nettverksprotokoller. Eksamensrettet — fokus på Chord DHT, overlay-multicast, delay, IP og fault tolerance."

2. **Eksamenformat — alltid synlig**
   - H2: "Eksamenformat — 10 oppgaver"
   - 1-setningsforklaring: 4 timer skriftlig, mønster fra 2022-2025 stabilt.
   - 5×2 grid (xl) → 2×5 (sm) → 1×10 (mobile) av oppgave-kort.
   - Hvert kort: vekt-pill + "Oppg N" + tittel + kort beskrivelse + kapittel-tag.
   - Klikkbar → `/dat110/eksamenoving/oppg-N` (eksisterende rute).
   - **Ikke collapsed**. Erstatt dagens `ExamPracticeSection` med en alltid-åpen variant.

3. **Aktiv øving-banner**
   - H2: "🎯 Aktiv øving — hovedverktøy mot eksamen"
   - Stor gradient-card (blå/teal) → `/dat110/oving`.
   - Sub-tag-pills: Quiz · Eksamensim · Flashcards · Matching · Regneøving · Eksamensdrill.

4. **Nøkkeltemaer / maks poeng**
   - H2: "Nøkkeltemaer — dette gir mest poeng"
   - 1-setningsforklaring om at temaene er kalibrert mot eksamen-mønster fra vaulten.
   - 3×2 (xl) / 2-kol (sm) / 1-kol (mobile) grid.
   - 5-6 Tier 1-kort (se "Nøkkeltemaer for maks poeng" seksjonen under).
   - Hvert kort har 2 CTA: `[Øv på dette →]` og `[Se eksempel →]`.

5. **Begreper + temaer**
   - H2: "Bla i pensum"
   - 2-bred grid:
     - Card 1: "11 sentrale begreper" → `/dat110/begreper`
     - Card 2: "2 fagtemaer" → `/dat110/temaer`
   - (P1 utvider antallene til 72 + 21.)

6. **Referansemateriell** (rød/oransje aksent som DAT109)
   - 3-bred grid:
     - 📋 Tidligere eksamener → `/dat110/eksamen`
     - 📚 Oppsummering → `/dat110/oppsummering` (eksisterende, urørt)
     - 🗂 Pensum og rammeverk → `/dat110/pensum` (manuelt skrevet side)

7. **Kapitler nederst** (collapsible, beholdes urørt fra dagens versjon)
   - Computer Networking CN 1-8 (collapsible)
   - Distributed Systems DS 1-8 (collapsible)

## Foreslått aktiv øving layout

Ny rute `/dat110/oving` (mirror av `/dat109/oving`):

- Breadcrumb: `Hjem / DAT110 / Øving og drilling`
- H1: "Øving og drilling — DAT110"
- P: "Aktiv læring slår passiv lesing. Tre kilder: tidligere DAT110-eksamen, Canvas-quizer, og genererte spørsmål. Alle moduser har feedback + 'Les mer'-lenker til konseptsider."

**Velg modus** — 2×3 (xl) eller 1-kol (mobile) grid av modus-kort med fargekodet ramme:

- 🎯 **Flervalg-quiz** → `/dat110/oving/quiz` — grønn ramme — **P0c LIVE**
- ⏱️ **Eksamenssimulering** → `/dat110/oving/eksamen-sim` — rose ramme — P1 (disabled card med "Kommer i P1")
- 🃏 **Flashcards** → `/dat110/oving/flashcards` — amber ramme — P1
- 🔗 **Matching-øvelse** → `/dat110/oving/matching` — violet ramme — P2 (særlig DAT110-verdifullt for begrepspar)
- 🧮 **Regneøving** → `/dat110/oving/beregning` — blå ramme — P2 (delay, FT-konstruksjon, vektor-klokker)
- 🔥 **Eksamensdrill** → `/dat110/oving/eksamensdrill` — oransje ramme — P2 (kuratert gjengangere-set)

**Anbefalt studieplan** — card med dag-for-dag plan, konkret for DAT110, eksempel:

- Dag 6 (i dag) — Chord-drill: alle FT-spørsmål fra Mai 2024 + Canvas Task 9. ~30 spm.
- Dag 5 — Eksamensim Mai 2024 (4 timer). Sjekk fasit.
- Dag 4 — Drill feil + Overlay multicast + delay-regneøving.
- Dag 3 — Eksamensim Jan 2025 (4 timer).
- Dag 2 — IP/subnetting drill + matching-øvelse for begrepspar.
- Dag 1 — Bare flashcards. Repetér det du kan.

**Tips-callout** (amber, samme stil som DAT109):

- Aktiv læring: test først, les etter
- Drill bare feil etter quiz
- Eksamenssim 2 ganger: første viser hva du ikke kan, andre om du har lært
- Matching for begrepspar: vector clocks vs Lamport, primary-based vs quorum
- Regneøving 5-10 min daglig for delay/FT
- Forklaringer er gull: når du svarer feil, LES forklaringen

## Foreslått DAT110 quiz layout

`/dat110/oving/quiz` (P0c):

### Topic selector (phase: select)

**Hurtigvalg-rad** øverst:

- `Velg alle` | `Fjern alle`
- `Oppgave 1` | `Oppgave 2` | ... | `Oppgave 10` (per-gruppe-toggles)
- `Tier 1` (fokus-shortcut for Chord/Overlay/IP/Delay/DS)

**10 oppgavegrupper** med store labels:

```
OPPGAVE 1 — FLERVALG (10%)
  [tema-kort: emoji + tittel + beskrivelse + 'N spørsmål tilgjengelig']
OPPGAVE 2 — OBLIG-PROSJEKT (10%)
  ...
osv. fram til Oppgave 10 — DHT/CHORD (15%)
```

Hvert tema-kort har samme struktur som DAT109's `TopicSelector` tema-kort.

### Innstillinger-blokk

- **Antall spørsmål**: slider 5 til min(50, total). Live-counter "av N tilgjengelige fra valgte temaer".
- **Kildefilter** (3 checkboxer, default alle på):
  - ☑ Tidligere DAT110-eksamener (2022, Jan/Mai 2024, Jan 2025)
  - ☑ Canvas-quizer (12 quizer, ~125 spørsmål)
  - ☑ Genererte spørsmål (pensum-baserte)
- **Shuffle**: ☑ Shuffle spørsmål og svaralternativer (anbefalt)
- **Multiple-answers scoring**: ☑ Alt-eller-ingenting på multiple-answers (default på, jf. plan §10.9)

**Start-knapp**: stor blå/network-tema-knapp med dynamisk tekst: `🚀 Start quiz (N spørsmål)` eller `Velg minst ett tema for å starte` (disabled).

### Quiz-running (phase: running)

- Progress-bar + "Score: X / Y" alltid synlig.
- **QuizCard**:
  - Topp: `Spørsmål N av M` + tema-pill høyre + (hvis multiple) `Velg alle som passer`-tag
  - Spørsmålstekst
  - Alternativer (A/B/C/D — radio for single, ☐ for multiple)
  - **Etter låsing**:
    - Riktig: grønn ramme + ✓
    - Valgt-men-feil: rosa ramme + ✗
    - Øvrige: opacity-50
  - **Feedback-card**:
    - Grønn/rosa header: `✓ Riktig!` eller `✗ Ikke helt — riktig svar var C`
    - **Forklaring** (`shortReasoning`, 1-3 setninger)
    - Hvis feil OG `question.whyWrong[selected]`: amber bonus-card "Hvorfor ditt svar er feil"
    - **Blå "Les mer"-lenker** (NYTT vs DAT109):
      - → `/dat110/begreper/chord-ring`
      - → `/dat110/temaer/chord-dht`
      - → `/dat110/eksamen/v2024#chord-dht`
      - 1-3 lenker per spørsmål, klikkbare, blå underlined-stil
    - **Kompakt source tag-rad** nederst:
      - `📋 Mai 2024 oppg 9` / `📋 Canvas Task 7` / `✏️ Pensum`
      - **ALDRI**: Obsidian-paths, sourceRefs i fri tekst, vault-slugs
  - **Neste-knapp** (full bredde, blå/network-tema)

### Distraktor-prinsipper

- Riktig svar er **ikke alltid lengst** eller mest presist
- Distraktorer er plausible misforståelser, ikke straw-men
- Lengde-balanse mellom alternativer (sjekkes av `validate-distractor-quality.mjs`)
- For DAT110: bruk Canvas-quizenes ekte distraktorer som mal når mulig — de er allerede kalibrert

### Quiz-results (phase: done)

- Total score
- Per-tema-breakdown
- Knapper: `Retry samme set` / `Drill bare feil` / `Tilbake til temavalg`

## Foreslått eksamensseksjon

### `/dat110/eksamen` listing (omarbeides fra dagens versjon)

- Breadcrumb: `Hjem / DAT110 / Eksamen`
- H1: "Eksamen"
- P: "Tidligere DAT110-eksamener med kildetro oppgavetekst og dokumenterte løsninger fra sensorveiledning."

**Eksamen-listing** (grid 2-bred, xl 3-bred):

- ✅ **Mai 2024 (V2024)** → `/dat110/eksamen/v2024` — **LIVE (P0b)**
- ⏳ Jan 2024 (H2024) → `/dat110/eksamen/h2024` — P1 (disabled card)
- ⏳ Jan 2025 (V2025) → `/dat110/eksamen/v2025` — P1 (disabled card)
- ⏳ 2022 → `/dat110/eksamen/v2022` — P1 (disabled card)
- ⏳ **Reconstructed 06-2025** → `/dat110/eksamen/rec-2025` — P1 (disabled, med tydelig "Reconstructed"-badge)

**Gjengangere-card** (sub-seksjon):

- Stor link-card → `/dat110/eksamen/gjengangere`
- P: "Q-slot-analyse: hvilke konsepter går igjen i hvilken oppgave-slot på tvers av 2022-2025."

**"Bla per oppgavetype"** (sub-seksjon, beholdes fra dagens versjon):

- Eksisterende 10 oppg-N-cards flyttes nederst som "alternativ inngang".

### `/dat110/eksamen/[slug]` (P0b ny dynamisk rute, V2024 først)

- Breadcrumb: `Hjem / DAT110 / Eksamen / Mai 2024`
- (For rec-2025 senere: rød/oransje **reconstructed-banner** øverst, full bredde, eksplisitt tekst "Rekonstruert basert på sensorveiledning. Ikke offisiell originaltekst.")
- H1: "DAT110 — Mai 2024"
- Meta-rad: "10 oppgaver · 4 timer · Mønster: typisk DAT110-eksamen"
- Source-tag: "📋 Offisiell oppgave + sensorveiledning"

**Oppgaveliste** — 10 ExamQuestionCards:

- Per card:
  - Header-rad: "Oppg N (vekt %)" + tema-pill
  - **Oppgavetekst** (kildetro `VaultMarkdown` — bevarer matematikk, tabeller, kodeblokker)
  - `[Vis løsning ▶]` accordion **lukket by default**
  - Når åpen `[▼]`:
    - **`expectedAnswer`** — punktliste, tabell eller markdown
    - **`shortReasoning`** — 1-3 setninger
    - **`learnMoreLinks`** — 1-4 blå lenker (samme stil som quiz-feedback)

**Bunn av siden**: "Kilder og grunnlag" expandable, lukket by default. Viser source-refs (sensor, lecture), filtrert for local-only.

**SolutionAccordion** krav:

- Lukket by default
- Tastatur: Enter/Space toggle, Esc lukker, `aria-expanded`
- Bruke `VaultMarkdown` (eksisterende komponent) for body — gir matematikk/tabeller "gratis"
- Samme blå-lenke-stil som quiz-feedback for `learnMoreLinks`

## Nøkkeltemaer for maks poeng

Disse er Tier 1 fra vaulten og fra plan §10.5/§3.2. Visuell prioritet over alle andre temaer på landing.

Hvert tema rendres som et stort kort i seksjon 4 ("Nøkkeltemaer / maks poeng") med ikon + h3 + 1-setningsbeskrivelse + kapittel-tag + 2 CTA: `[Øv på dette →]` (quiz?topic=…) og `[Se eksempel →]` (eksamen-anchor).

| Tema | Oppgave | Vekt | CN/DS | Visuell merknad |
|---|---|---|---|---|
| **Chord DHT** | Oppg 10 | ~15 % | DS 6 | Liten "MEST POENG"-badge — 15 % er mest per enkelt-oppgave |
| **Overlay multicast** | Oppg 8 | ~10 % | DS 4 | — |
| **Delay / throughput** | Oppg 3 | ~10 % | CN 1 | Regneøving-merknad |
| **IP / forwarding / subnetting** | Oppg 4-6 | ~30 % kombinert | CN 4-6 | "MEST KAPITTELOMFANG"-badge |
| **RPC / failure handling** | Oppg 7 | ~5 % | DS 1, 3, 4, 8 | — |
| **Vector clocks / consistency / replication** | Oppg 9 | ~10 % | DS 5, 7 | — |
| **Fault tolerance** | (delt på flere) | — | DS 8 | "3k+1-regelen"-merknad |

(Cloud/security er ikke Tier 1 og hører ikke på nøkkeltemaer-seksjonen — kan bli en P1-utvidelse hvis pensum dekker det.)

Ikoner: liten SVG eller emoji. Forslag: 🔗/ring (Chord), 🌳 (Overlay), ⏱️ (Delay), 🌐 (IP), 🔄 (RPC), 🕐 (Vector clocks), 🛡️ (Fault tolerance).

## Designnotater til implementerende Debian-session

### Komponenter å kopiere

- **DAT109 landing patterns** (`src/app/dat109/page.tsx`) → mal for DAT110 landing-redesign. Spesifikt: eksamenformat-stripe (linje 111-141), TopicCard (linje 49-89), aktiv øving-banner (linje 151-183), referansemateriell-grid (linje 186-221).
- **DAT109 TopicSelector** (`src/components/dat109/oving/TopicSelector.tsx`) → kopier til `src/components/dat110/oving/TopicSelector.tsx`. Endre `QUIZ_TOPICS`-import til DAT110-versjon. Legg til 3-checkbox-kildefilter i innstillinger-blokken.
- **DAT109 QuizCard** (`src/components/dat109/oving/QuizCard.tsx`) → kopier til `src/components/dat110/oving/QuizCard.tsx`. Utvid props med `learnMoreLinks: LearnMoreLink[]` (allerede definert i `src/lib/dat110-vault/types.ts`) og render som blå underlined-lenker i feedback-card. Støtt multiple-answers (checkbox-modus).
- **DAT109 QuizRunner** (`src/components/dat109/oving/QuizRunner.tsx`) → kopier til `src/components/dat110/oving/QuizRunner.tsx`. Bytt boolsk `onlyRealExams`-filter til 3-verdier Set<"exam" | "canvas" | "generated">.
- **DAT109 QuizResults** (`src/components/dat109/oving/QuizResults.tsx`) → direkte kopi. Eventuelt pluss DAT110-tag-renderer.
- **DAT109 /oving layout** (`src/app/dat109/oving/page.tsx`) → mal for `/dat110/oving/page.tsx`. Endre modus-grid fra 4 til 6 cards, oppdater studieplan-innhold til DAT110-temaer, oppdater tips-callout.

### Interaksjoner å kopiere

- **Lock-on-click**: bruker svarer én gang, kan ikke endre. Reference: `QuizCard.tsx:46-49`.
- **Reveal-on-answer**: forklaring vises kun etter svar. Avgjørende for læring.
- **Color-coded options post-answer**: grønn rett, rosa valgt-men-feil, opacity-50 øvrige.
- **Progress/score** alltid synlig under quiz-card.
- **Back to topic selector**: tekstlenke under quiz-card (`← Avbryt og tilbake til temavalg`) — gir vei tilbake uten å panikk-trykke breadcrumb.
- **Per-topic counter** i selector-kort: `N spørsmål tilgjengelig`, grønn lenke-stil. Disabler 0-kort.

### Ting å unngå

- ❌ **Ikke skjul eksamenformat-stripen bak collapse**. Dagens DAT110 `ExamPracticeSection` (`src/app/dat110/page.tsx:238-306`) gjemmer 10 viktige cards bak ett klikk — anti-pattern her. Erstatt med alltid-åpen variant.
- ❌ **Ikke vis raw sourceRefs inline** i quiz-feedback. Plan §10.3 er eksplisitt. Bruk pene tags: `📋 Mai 2024 oppg 9`, `📋 Canvas Task 7`, `✏️ Pensum`.
- ❌ **Ikke kall reconstructed 06-2025 "offisiell" eller "original"**. Bruk dedikert reconstructed-banner. Plan §10.4.
- ❌ **Ikke bruk åpenbare distraktorer** der riktig svar alltid er lengst eller mest presist formulert. Plan §5.7.
- ❌ **Ikke publiser pensum-PDFene på web** (copyright på forfatterens layout). Plan §10.14. Skriv en manuell side med egne ord i stedet.
- ❌ **Ikke flat ut 72 concepts uten filter**. Når P1 utvider /dat110/begreper trenger den alfabetisk + tema-filter. Men i P0b/c holder det å rendre 11+2 fra P0a.

### Prioritet

- **P0b** (start her — mest verdi alene):
  - `src/data/dat110-vault/exams/v2024.json` med 10 oppgaver
  - `SolutionAccordion.tsx` + `ExamPageLayout.tsx` (nye komponenter)
  - `src/app/dat110/eksamen/[slug]/page.tsx` (dynamisk rute, `generateStaticParams`)
  - Eventuelt `/dat110/eksamen/gjengangere` (Q-slot-tabell + concept-anchors)
  - Oppdater `/dat110/eksamen` til årlisting (V2024 live, 4× P1 coming-soon-cards)
  - `validate-learnmore-links.mjs` strict gate
  - PR: `feat(dat110): P0b — V2024-eksamen + eksamen-listing`

- **P0c** (etter P0b-godkjenning):
  - Quiz-datamodell + JSON (`quizzes.json`, `quiz-feedback-drafts.json`, `quiz-feedback-overrides.json`)
  - `QuizRunner`, `QuizCard`, `QuizResults`, `TopicSelector` for DAT110
  - `/dat110/oving/page.tsx` (modus-hub) + `/dat110/oving/quiz/page.tsx`
  - Landing-redesign: erstatt eksamenformat-collapse med alltid-åpen stripe, legg til aktiv øving-banner, nøkkeltemaer-grid, og referansemateriell-grid
  - Navigation-utvidelse med DAT110-undermeny
  - PR: `feat(dat110): P0c — quiz + landing-redesign + aktiv øving`

- **P1** (etter P0c):
  - Resterende 4 eksamener (v2022, h2024, v2025) — bygg på P0b's [slug]-rute
  - Reconstructed 06-2025 med banner-komponenten
  - 67 resterende concept-sider + 19 topic-sider (kjør utvidet sync)
  - `/dat110/begreper` og `/dat110/temaer` parent-listings med filter
  - Flashcards-rute (eventuelt felles komponent gjenbrukbar fra DAT109)
  - Matching-rute (særlig DAT110-verdifullt for begrepspar)

### Mobile/dark mode notes

- **Mobile-first grids**: alle grids skal stables 1-kol under `sm`. Bruk `grid sm:grid-cols-2 lg:grid-cols-3` (DAT109-pattern). Eksamenformat-stripens 5×2 grid blir vertikal stack — det er ok fordi hvert kort blir lesbart.
- **Dark gradient opacity**: følg CLAUDE.md-regelen. Gradient-kort `dark:from-*-950/70 dark:to-*-950/50`, indre stats-kort `bg-white/80 dark:bg-neutral-900/90`.
- **Explicit dark text classes**: `text-neutral-700 dark:text-neutral-200` for labels, `text-neutral-900 dark:text-neutral-50` for hovedtekst. Ikke bare `text-[var(--muted)]`.
- **Blå learnMoreLinks readable in dark mode**: bruk `text-blue-700 dark:text-blue-300 underline hover:no-underline` for konsistens.
- **Reconstructed-banner dark mode**: `bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-950/60 dark:to-orange-950/40` + eksplisitt `text-red-900 dark:text-red-200`. Full bredde, ikke skjules.
- **Spør tutoren-CTA** er fixed positioned i alle moduser — sjekk at den ikke overlapper kritisk bunninnhold på iPhone-viewport når quiz-card er aktiv.

## Åpne spørsmål til Debian-sessionen

1. **Vault re-sync før P0b?** `_meta.json` viser synket fra `ObsidianVault/DAT110/processed/reviewed` (gammel Debian-path) 2026-05-27. Skal Debian-sessionen kjøre `npm run sync:dat110-vault` mot lokal vault før P0b-arbeidet starter, eller er innholdet stabilt nok til at sync kan vente til P0c når quiz-data trengs?

2. **`expectedAnswer` som markdown?** Anbefaling: ja, bruk markdown-strings og rendre med eksisterende `VaultMarkdown`-komponent — gir full fleksibilitet for tabeller (subnetting), kodeblokker (FT-konstruksjon), og matematikk (delay-beregning) uten ny komponent.

3. **Hva gjør vi hvis `learnMoreLink` mangler P0a-side?** Hvis en V2024-oppgave handler om "3k+1-regelen" eller andre konsepter som ikke er én av de 11 Tier 1, hva er policy? Forslag:
   - (a) La P0b kun lenke til de 11 eksisterende konseptene + dokumentér gap i `expectedAnswer`-tekst
   - (b) Midlertidig peke til kapittel-skall (`/dat110/ds-8`)
   - (c) Generere flere concept-sider som del av P0b

   Mac-sessionens anbefaling: **(a)** — strict learnmore-validation forblir grønn, gap dokumenteres i tekst, P1 fyller på.

4. **Reconstructed 06-2025 fortsatt P1?** Plan §13 sier P0b kun har V2024 og rec-2025 ligger i P1 med banner. Bekreftes? Hvis Debian-sessionen vil ta med rec-2025 i P0b, må reconstructed-banner-komponenten lages før P1.

5. **Source-tag-format?** Forslag fra Mac-sessionen:
   - `📋 Mai 2024 oppg 9` (ekte eksamen)
   - `📋 Canvas Task 7` (canvas-quiz)
   - `✏️ Generert (pensum)` (genererte)

   Bekreft eller foreslå alternativ. Disse vises i quiz-feedback-card tag-rad og må aldri eksponere Obsidian-paths eller vault-slugs.
