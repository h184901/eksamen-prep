# EGB339 content workflow

The curated Obsidian wiki is the source of truth. The website stores a generated,
reviewable snapshot so production never depends on a local vault path.

## Weekly update

1. Ingest and curate the new material in `/home/skjold/ObsidianVault/EGB339`.
2. Keep public material in `sources/`, `concepts/`, `entities/` or `topics/`.
3. Leave PDFs, archives, books and student-owned assignment code in `raw/`.
4. From this repository, run `npm run sync:egb339`.
5. If the week contains tutorial or practical tasks, add one entry per task to
   `src/lib/egb339-problems.ts`. Preserve the PDF page number and add links to
   the relevant concept routes. Use `official` only when the result has been
   checked against a supplied QUT solution; use `corrected` when a checked QUT
   answer has a documented mathematical error. Otherwise use `derived` or `open`.
6. Run `npm run validate:egb339` and `npx tsc --noEmit --incremental false`.
7. Review the generated JSON diff in `src/data/egb339-vault/` and the problem
   registry diff before committing.

The sync script discovers weeks, assessments and concepts automatically. A new
week therefore appears in the semester timeline without adding a route by hand.
The shared week-page component also picks up any problems registered for that
week, so new material does not require a new React route or a bespoke page.

The sync script defaults to `/home/skjold/ObsidianVault/EGB339` on this Debian
machine. Set `EGB339_VAULT_PATH` only if the vault moves to another location.

## Worked solutions (website-authored teaching layer)

The generated vault snapshot remains the source of course summaries, dates and
requirements. Do not hand-edit it to add worked solutions: a sync would overwrite
them. Tutorial/practical derivations live in `src/lib/egb339-problems.ts` and
assessment walkthroughs in `src/lib/egb339-assessment-solutions.ts`. These are
independently authored explanations based on the immutable QUT sources, not
student submission code. Each assessment records its source, curriculum weeks
and verification limits. Its assessment week is preserved separately.

The warmup walkthrough is reused by the week-2 and week-3 practical cards, so a
correction only needs to be made once. The assessment renderer uses the existing
Markdown/KaTeX design and native disclosure controls. Stable `solution-<part-id>`
anchors allow direct links to individual questions. Progress keys are unchanged.

For updates, check every subpart against the original PDF (including image-only
formulas), record source discrepancies, independently recompute examples and
verify code snippets. Missing docstring details must be explicitly marked, not
invented. A public test that checks only types/shapes is not a numerical reference
solution, and an offline FK/IK test is not a physical robot safety validation.

Run `npm run validate:egb339` for content, rendered mathematics, coverage and
internal solution-anchor validation. Run the calculation regression separately
with `node scripts/validate-egb339-solutions.mjs`, then TypeScript and desktop
Playwright checks before reviewing the diff. Do not publish raw source PDFs,
archives, private assignment implementations or local QA artifacts.

See [the worked-solutions QA report](egb339-solutions-qa.md) for the current
coverage, source discrepancies, test results and unresolved source gaps.
