# Task: Integrate improved DAT107 extraction into website content

You are working in the website repository:

`/home/skjold/eksamen-prep`

The improved extracted course material is in:

`/home/skjold/DAT107-Structured`

Goal:
Improve the existing DAT107 study website content using the better extraction pipeline.

Do not blindly overwrite the website content. The website already has a curated structure in:

`src/content/dat107`

Use the structured extraction as a source bank to enrich and correct the existing pages.

## Website target folders

Map these sources:

- `/home/skjold/DAT107-Structured/topics/sql`
  -> `src/content/dat107/sql`

- `/home/skjold/DAT107-Structured/topics/modellering`
  -> `src/content/dat107/modellering`

- `/home/skjold/DAT107-Structured/topics/jpa`
  -> `src/content/dat107/jpa`

- `/home/skjold/DAT107-Structured/topics/nosql`
  -> `src/content/dat107/nosql`

- `/home/skjold/DAT107-Structured/obliger`
  -> `src/content/dat107/obliger`

- `/home/skjold/DAT107-Structured/eksamen/originale`
  -> `src/content/dat107/originale-eksamen`

Do not overwrite `src/content/dat107/eksamen-gjengangere` unless explicitly asked. That section is curated exam pattern analysis, not raw original exam extraction.

## Asset handling

Create/use:

`public/content/dat107/assets`

Copy only relevant visual assets from `DAT107-Structured`:
- diagrams
- ER/UML models
- tables that are visually important
- screenshots/figures that add study value

Avoid copying every rendered page image unless it is genuinely useful.

When adding images to Markdown, use absolute public paths like:

`/content/dat107/assets/modellering/<filename>.png`

## Content rules

For each DAT107 section:
1. Inspect existing website Markdown.
2. Inspect corresponding structured extracted material.
3. Improve the existing Markdown with:
   - more accurate explanations
   - missing definitions
   - exam-relevant details
   - useful examples
   - diagram/table explanations
   - relevant image links
4. Preserve the existing website style:
   - concise Norwegian study notes
   - headings like "Kjernen", "Dette må du kunne", "Vanlige feil", "Typiske eksamensoppgaver"
5. Do not dump raw OCR text into the website.
6. Do not include placeholder text.
7. Do not include broken image links.
8. Do not modify files outside this repository.

## First batch

Start with:
- `src/content/dat107/modellering`
- `src/content/dat107/sql`

For each updated file, report:
- path changed
- source structured folder used
- images copied, if any
