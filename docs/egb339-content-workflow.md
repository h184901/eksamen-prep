# EGB339 content workflow

The curated Obsidian wiki is the source of truth. The website stores a generated,
reviewable snapshot so production never depends on a local vault path.

## Weekly update

1. Ingest and curate the new material in `/Users/skjold/dev/units/EGB339`.
2. Keep public material in `sources/`, `concepts/`, `entities/` or `topics/`.
3. Leave PDFs, archives, books and student-owned assignment code in `raw/`.
4. From this repository, run `npm run sync:egb339`.
5. If the week contains tutorial or practical tasks, add one entry per task to
   `src/lib/egb339-problems.ts`. Preserve the PDF page number and add links to
   the relevant concept routes. Use `official` only when the result has been
   checked against a supplied QUT solution; otherwise use `derived` or `open`.
6. Run `npm run validate:egb339` and `npx tsc --noEmit --incremental false`.
7. Review the generated JSON diff in `src/data/egb339-vault/` and the problem
   registry diff before committing.

The sync script discovers weeks, assessments and concepts automatically. A new
week therefore appears in the semester timeline without adding a route by hand.
The shared week-page component also picks up any problems registered for that
week, so new material does not require a new React route or a bespoke page.

Set `EGB339_VAULT_PATH` only if the vault moves to another location.
