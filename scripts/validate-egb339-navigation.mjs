#!/usr/bin/env node
// EGB339 navigation redesign checks: subject-based topic naming, accessible
// accordion sidebar, landing structure, entry navigation and EGB339-only
// AI Tutor disabling (the tutor must survive in every other subject).
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { loadEgb339DataModule } from "./lib/egb339-content-loader.mjs";

const { EGB339_WEEK_SUBJECTS, egb339DisplayTitle, egb339WeekSubjectTitle } = await loadEgb339DataModule("src/lib/egb339.ts");
const { isTutorDisabledForPath } = await loadEgb339DataModule("src/lib/tutor-visibility.ts");

// --- Topic naming and ordering ---------------------------------------------
const EXPECTED = [
  "Introduksjon til robotikk",
  "Lineær algebra og 2D-pose",
  "NumPy og 3D-pose",
  "Forward kinematics",
  "Inverse kinematics",
  "Robot Jacobian",
  "Bevegelsesplanlegging",
  "Bilder og bildebehandling",
];
assert.deepEqual(EGB339_WEEK_SUBJECTS.map((subject) => subject.week), [1, 2, 3, 4, 5, 6, 7, 8], "Topic order must stay 1–8");
assert.deepEqual(EGB339_WEEK_SUBJECTS.map((subject) => subject.title), EXPECTED, "Subject titles follow the QUT sources");
assert.deepEqual(EGB339_WEEK_SUBJECTS.map((subject) => subject.slug), [1, 2, 3, 4, 5, 6, 7, 8].map((week) => `uke-${week}`), "Week slugs preserved (/uker/uke-N routes)");
for (const subject of EGB339_WEEK_SUBJECTS) {
  assert(subject.interactive.length > 0, `${subject.slug}: missing interactive label`);
  assert.equal(egb339WeekSubjectTitle(subject.week), subject.title);
  assert.equal(egb339DisplayTitle({ slug: subject.slug, title: `Week ${subject.week} – legacy` }), subject.title, `${subject.slug}: display title must be the subject`);
}
assert.equal(egb339WeekSubjectTitle(99), "Uke 99", "Unknown weeks degrade gracefully");

// --- AI Tutor: disabled for EGB339 only ------------------------------------
for (const path of ["/egb339", "/egb339/uker", "/egb339/uker/uke-4", "/egb339/temaer/robot-jacobian", "/egb339/vurderinger", "/egb339/oppsummering", "/egb339/ressurser/coppeliasim"]) {
  assert.equal(isTutorDisabledForPath(path), true, `Tutor must be disabled on ${path}`);
}
for (const path of ["/", "/dat102", "/dat102/temaer/traer", "/dat107", "/dat109", "/dat110", "/dat110/cn-1", "/ing164", "/ing164/kapittel-2", "/login", "/utveksling"]) {
  assert.equal(isTutorDisabledForPath(path), false, `Tutor must stay enabled on ${path}`);
}
assert.equal(isTutorDisabledForPath(null), false, "Missing pathname keeps the tutor");
assert.equal(isTutorDisabledForPath("/egb339x"), false, "Prefix lookalikes are not EGB339");

const tutorButton = readFileSync("src/components/AITutor/TutorButton.tsx", "utf8");
const tutorPanel = readFileSync("src/components/AITutor/TutorPanel.tsx", "utf8");
assert(tutorButton.includes("isTutorDisabledForPath"), "TutorButton must use the route gate");
assert(tutorPanel.includes("isTutorDisabledForPath"), "TutorPanel must use the route gate");
assert(!tutorButton.includes('context.subject === "egb339"'), "No EGB339-specific tutor label branches remain");

// --- Sidebar: accessible accordion, no tutor slot ---------------------------
const sidebar = readFileSync("src/components/egb339/study-week/StudyWeekNavigation.tsx", "utf8");
assert(!sidebar.includes("TutorButton"), "Sidebar must not render the tutor");
assert(!sidebar.includes("<details") && !sidebar.includes("<summary"), "Sidebar accordion uses buttons, not details");
assert(sidebar.includes("aria-expanded"), "Disclosure buttons expose expanded state");
assert(sidebar.includes("aria-controls"), "Disclosure buttons reference their panels");
assert(sidebar.includes("aria-label={week.title}"), "Disclosure buttons are named by topic; aria-expanded carries state");
assert(sidebar.includes('role="region"'), "Accordion panels are labelled regions");
assert(sidebar.includes("data-mobile-open"), "Mobile course-navigation collapse is wired");
assert(sidebar.includes("egb-week-accordion-meta"), "Week number is secondary metadata in the sidebar");
assert(sidebar.includes("Uke {week.week}"), "Week number remains as small metadata");
assert(sidebar.includes("hashTarget()") && sidebar.includes("catch {"), "Malformed hashes must not throw");
assert(!sidebar.includes("week.assessments.map"), "Weeks must not enumerate individual assessments; the global Assessments link covers them");
assert(sidebar.includes('href: "/egb339/vurderinger"'), "The global Assessments section stays in the sidebar");
assert(sidebar.includes('pathname.startsWith(`${href}/`)'), "Reference links stay highlighted on their detail pages");

// --- Landing page ------------------------------------------------------------
const landing = readFileSync("src/app/egb339/page.tsx", "utf8");
assert(landing.includes("Egb339ContinueCard"), "Landing page has a continue-studying action");
assert(landing.includes("egb-topic-list"), "Landing page has the clean topic overview");
assert(landing.includes("week.title"), "Topic rows use subject titles");
assert(!landing.includes("Egb339Syllabus"), "Landing page no longer duplicates the full syllabus");
const continueCard = readFileSync("src/components/egb339/Egb339ContinueCard.tsx", "utf8");
assert(continueCard.includes('role="progressbar"'), "Progress bar is exposed to assistive tech");
assert(continueCard.includes("next.href"), "Continue action targets the next uncompleted topic");

// --- Week pages, breadcrumb and entry navigation -----------------------------
const shell = readFileSync("src/components/egb339/pilot/Egb339PilotShell.tsx", "utf8");
assert(shell.includes("egb339WeekSubjectTitle"), "Breadcrumbs resolve subject titles");
assert(shell.includes("IconArrowLeft") && shell.includes("IconArrowRight"), "Entry navigation has directional icons");
const studyWeek = readFileSync("src/components/egb339/study-week/StudyWeekPage.tsx", "utf8");
assert(!/Week \{number\}:/.test(studyWeek), "Week-page h1 is the subject, not 'Week N:'");
assert(studyWeek.includes("egb-week-kicker"), "Week number survives as kicker metadata");
const weekOne = readFileSync("src/components/egb339/week-one/WeekOnePage.tsx", "utf8");
assert(weekOne.includes("<h1>Introduksjon til robotikk</h1>"), "Week 1 h1 is the subject title");
assert(!weekOne.includes("Week 1: Introduction"), "No English week-primary heading remains");

// --- Icons -------------------------------------------------------------------
const icons = readFileSync("src/components/egb339/icons.tsx", "utf8");
for (const name of ["IconChevronDown", "IconArrowLeft", "IconArrowRight", "IconPlay", "IconCheck", "IconFlask", "IconClipboardCheck", "IconSigma", "IconBookOpen"]) {
  assert(icons.includes(`export function ${name}`), `Missing icon ${name}`);
}
assert(icons.includes('aria-hidden="true"'), "Icons are hidden from assistive tech; names live on controls");

// --- Dead code stays removed --------------------------------------------------
for (const file of ["Egb339Nav.tsx", "Egb339ProgressSummary.tsx", "Egb339NextStep.tsx", "FrameTransformExplorer.tsx", "explorer-viewport.ts"]) {
  assert(!existsSync(`src/components/egb339/${file}`), `${file} should stay removed`);
}

console.log(`EGB339 navigation passed: ${EXPECTED.length} subject titles in order, tutor disabled on 7 EGB339 paths and preserved on 11 other paths (plus null and lookalike handling), accordion ARIA, landing structure, entry icons and dead-code removal.`);
