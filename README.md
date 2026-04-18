# Eksamensøving — Semester 4, HVL Bergen

Skreddersydd eksamensøvingsside for fire fag i fjerde semester ved HVL Bergen. Siden er bygget som ett sammenhengende studieverktøy: pedagogisk innhold, interaktive visualiseringer, progress-tracking og målrettet trening mot eksamen.

Deployes automatisk via Vercel.

---

## Hva nettsiden er

Et interaktivt studieverktøy, ikke en generisk notatsamling. Hver side har:

- **forklaringer som bygger intuisjon** (HVORFOR, ikke bare HVA)
- **pedagogiske callouts** (Kjernen, Dette må du kunne, Vanlige feil, Typiske eksamensoppgaver, Tips)
- **progress-tracking per fag** via `localStorage`
- **lys/mørk-modus** med god kontrast i begge
- **interaktive visualiseringer og SVG-diagrammer** der det hjelper forståelsen

Målgruppe: én student (Erlend) som skal ha et eksamensrettet verktøy. Andre kan også bruke det.

---

## Fag

| Fag | Kode | Fargeidentitet |
|-----|------|----------------|
| Fysikk | ING164 | Rød/oransje |
| Nettverksteknologi og distribuerte systemer | DAT110 | Blå |
| Systemutvikling | DAT109 | Grønn |
| Databaser | DAT107 | Lilla |

Hvert fag har egen inngang fra forsiden og følger samme sidemønster for gjenkjennbarhet.

---

## DAT107 Databaser — organisering

DAT107 er implementert som hovedfag på samme nivå som de andre, men bruker en mer skalerbar temastruktur på grunn av antall tema (58 totalt).

### Sju hovedområder

**Teori**
- `sql` — Spørringer, tabeller, joins, indekser, transaksjoner
- `modellering` — Relasjonsmodell, ER, mapping, 3NF (~25 % av eksamen)
- `jpa` — ORM, entiteter, relasjoner, arv
- `nosql` — XML, XSD, XPath, XSLT, JSON, hybrid lagring

**Praksis**
- `obliger` — Gjennomgang per oblig, samlet treningsblikk, repetisjon

**Eksamen — to tydelig adskilte spor**
- `eksamen-gjengangere` — **bearbeidet** analyse (ravgul aksent): mønstre, strategi, typiske oppgavetyper og feller
- `originale-eksamen` — **kildetro** arkiv (rød aksent): originale eksamenssett og løsningsforslag, bevart tett til originalteksten

### Hvordan DAT107 er bygget teknisk

- Én dynamisk rute `/[area]/[topic]` renderer alle tema fra Markdown-filer.
- Metadata (navigasjon, faser, intro-seksjoner, eksamensfokus, accent-farger) ligger sentralt i `src/lib/dat107.ts`.
- Innhold ligger som ren Markdown under `src/content/dat107/<area>/<slug>.md`.
- En minimal, avhengighetsfri Markdown-renderer (`src/components/Markdown.tsx`) konverterer utvalgte seksjoner (f.eks. `## Vanlige feil`) automatisk til fargede callouts.
- Områdesiden grupperer tema i faser (Grunnleggende → Praktisk → Repetisjon).

---

## Hovedfunksjoner

- **Progress-tracking per fag og område** — besøkte tema lagres i `localStorage` og vises som fremdrift på dashbordet.
- **Pedagogiske callout-bokser** — Kjernen, Viktig, Vanlige feil, Typiske eksamensoppgaver, Hva du bør øve på, Oppsummering, Tips.
- **KaTeX-rendering** av all matematikk (inline `\( ... \)` og blokk `\[ ... \]`).
- **Interaktive SVG-visualiseringer** i fysikk og systemutvikling (krefter, UML-diagrammer, domenemodeller, sekvensdiagrammer).
- **Mørkt/lyst tema-toggle** med korrekt kontrast i begge retninger.
- **Mobilresponsivt** oppsett gjennomgående.
- **Fargekodet fagidentitet** gjør det umiddelbart tydelig hvilket fag man er i.

---

## Tech stack

- **Next.js 16** (App Router, statisk generering)
- **React 18**
- **TypeScript**
- **Tailwind CSS 3.4** (utvidet med fagpaletter: `dat107-*`, `sysdev-*`, osv.)
- **KaTeX** for matematisk notasjon
- **Framer Motion** for animasjoner der det gir pedagogisk verdi
- **Recharts** for grafer
- **localStorage** for fremgangssporing
- **Vercel** for deploy

Egen minimal Markdown-renderer brukes for DAT107 for å unngå tung avhengighet og for å gi full kontroll på pedagogiske callouts.

---

## Prosjektstruktur

```
eksamen-prep/
├── src/
│   ├── app/                 # Next.js App Router sider
│   │   ├── dat107/          # Dynamiske ruter [area]/[topic]
│   │   ├── dat109/
│   │   ├── dat110/
│   │   └── ing164/
│   ├── components/          # Delte og fag-spesifikke komponenter
│   │   ├── dat107/          # VisitTracker m.m.
│   │   ├── dat109/          # UmlDiagrams
│   │   ├── Markdown.tsx     # DAT107-renderer med callouts
│   │   ├── TheorySummary.tsx
│   │   └── ...
│   ├── content/
│   │   └── dat107/          # Alt DAT107-innhold som Markdown
│   │       ├── sql/
│   │       ├── modellering/
│   │       ├── jpa/
│   │       ├── nosql/
│   │       ├── obliger/
│   │       ├── eksamen-gjengangere/
│   │       └── originale-eksamen/
│   └── lib/
│       ├── dat107.ts        # Alle sju områder, 58 tema, faser, accent
│       └── dat109-topics.ts
├── public/                  # Statiske bilder
├── DAT107-structured/       # Kildegrunnlag for DAT107-innhold (IKKE siden selv)
├── CLAUDE.md                # Pedagogiske og tekniske regler for prosjektet
└── README.md
```

`DAT107-structured/` er innholdskilden og skal ikke endres direkte fra nettsiden. `src/content/dat107/` er det som faktisk leses fra appen, med slug-normaliserte filnavn (æøå normalisert til ASCII) slik at URL-er og statisk generering fungerer på Vercel.

---

## Utvikling og vedlikehold

### Kritiske regler

Dette prosjektet har noen absolutte regler — les disse før du bidrar:

1. **ALDRI kjør `npm run dev`, `npm run build`, `npm start` eller `next dev` lokalt.**
   Utviklingsmaskinen har 8 GB RAM og krasjer av dette. Vercel kjører build automatisk ved `git push`.

2. **ALDRI start dev-server eller test manuelt i nettleser.**
   Bruk Playwright MCP mot deployet URL hvis du trenger å inspisere faktisk oppførsel.

3. **Eneste lovlige lokale validering er typecheck:**
   ```bash
   npx tsc --noEmit
   ```

4. **Alt innhold er på norsk (bokmål).**

5. **All matematikk skal bruke KaTeX.** Aldri plaintext-formler.

6. **Commit etter hvert ferdig kapittel/tema** — små, gjennomtenkte commits.

### Innholdsflyt for DAT107

```
DAT107-structured/<emne>/*.md    (kildegrunnlag — ikke endre fra siden)
         │
         ▼
src/content/dat107/<area>/<slug>.md   (ASCII-slug-normalisert kopi)
         │
         ▼
src/components/Markdown.tsx     (renderer med pedagogiske callouts)
         │
         ▼
Browser
```

Når kilden oppdateres, kopieres endringene over med slug-normaliserte filnavn.

### Legge til et nytt tema i DAT107

1. Legg Markdown-filen under riktig område i `src/content/dat107/<area>/<slug>.md`.
2. Legg metadata (slug, tittel, beskrivelse, filnavn) i rett `topics[]`-array i `src/lib/dat107.ts`.
3. Legg evt. temaet inn i en `phase` for å få det til å vises i riktig fasegruppe.
4. Kjør `npx tsc --noEmit` for å verifisere typer.
5. Commit og push — Vercel bygger automatisk.

### Pedagogiske callouts i DAT107-Markdown

Markdown-rendereren (`src/components/Markdown.tsx`) støtter to måter å lage callouts på:

**Automatisk fra seksjonstittel** — render konverterer kjente h2-titler til fargede bokser:

| Seksjon-tittel | Callout-type |
|----------------|--------------|
| `## Kjernen` | lilla-fuchsia gradient |
| `## Dette må du kunne` | lilla sjekk |
| `## Vanlige feil` | rød felle |
| `## Typiske eksamensoppgaver` | ravgul dokument |
| `## Hva du bør øve på` | grønn lyspære |
| `## Oppsummering` | fuchsia |
| `## Tips` / `## Viktig` | grønn / lilla |

**GitHub-flavored alert-syntaks**:

```markdown
> [!VIKTIG]
> Dette er en viktig regel du må huske.

> [!FELLE]
> Dette er en klassisk feller studenter gjør.

> [!TIPS]
> Lite treningstips.

> [!EKSEMPEL]
> Konkret gjennomgang.

> [!OPPSUMMERING]
> Kort gjentakelse på slutten av et tema.
```

---

## Deploy

Deploys automatisk til Vercel ved push til `main`. Ingen manuell bygg-steg kreves.

- Type-sjekk skjer lokalt via `npx tsc --noEmit`.
- Byggfeil vises i Vercel-dashbordet og blokkerer deploy.
- Preview-deploys genereres per pull request.

---

## Lisens og forfatterskap

Privat studieprosjekt. Innhold er skrevet for personlig eksamensforberedelse på HVL Bergen, semester 4. Faglig grunnlag kommer fra forelesningsnotater, obliger og tidligere eksamener per fag — se hvert fag sitt materialunderlag.
