import type { Egb339Lang } from "./store";

/** Shared UI strings for the EGB339 section, Norwegian (authored) and English. */
export interface Egb339UiString {
  no: string;
  en: string;
}

export const EGB339_UI = {
  // Navigation chrome
  skipToLesson: { no: "Hopp til leksjonen", en: "Skip to lesson" },
  courseNavigation: { no: "EGB339 kursnavigasjon", en: "EGB339 course navigation" },
  courseNavigationToggle: { no: "Kursnavigasjon", en: "Course navigation" },
  allTopicsAria: { no: "Alle emner og temaer", en: "All topics and subtopics" },
  breadcrumb: { no: "Brødsmuler", en: "Breadcrumbs" },
  weekOf: { no: "Uke", en: "Week" },
  weekOfTotal: { no: "av 8", en: "of 8" },
  loadingProgress: { no: "Laster fremgang…", en: "Loading progress…" },
  progressUnavailable: { no: "Fremgang er utilgjengelig", en: "Progress is unavailable" },
  progressUnavailableLong: { no: "Fremgang er utilgjengelig akkurat nå.", en: "Progress is unavailable right now." },
  topicsCompletedSuffix: { no: "temaer fullført", en: "subtopics completed" },
  wholeCourse: { no: "Hele kurset", en: "Whole course" },
  referenceAssessments: { no: "Assessments", en: "Assessments" },
  referenceCheatsheet: { no: "Hurtigark og formler", en: "Cheat sheet and formulas" },
  referenceResources: { no: "Praktiske ressurser", en: "Practical resources" },
  referenceIndex: { no: "Fagregister", en: "Topic index" },
  previous: { no: "Forrige", en: "Previous" },
  next: { no: "Neste", en: "Next" },
  prevNextAria: { no: "Forrige og neste side", en: "Previous and next page" },

  // Week sections (sidebar, jump navigation, page structure)
  sectionPractical: { no: "Practical og fagkilder", en: "Practical and sources" },
  sectionPracticalShort: { no: "Practical", en: "Practical" },
  sectionProblems: { no: "Oppgaver og løsninger", en: "Exercises and solutions" },
  sectionProblemsShort: { no: "Oppgaver", en: "Exercises" },
  sectionAssessments: { no: "Assessments", en: "Assessments" },
  sectionAssessmentsShort: { no: "Assessment", en: "Assessment" },
  onThisPage: { no: "På denne emnesiden", en: "On this topic page" },

  // Progress controls
  statusLoading: { no: "Laster status", en: "Loading status" },
  statusUnavailable: { no: "Status utilgjengelig", en: "Status unavailable" },
  completed: { no: "Fullført", en: "Completed" },
  notCompleted: { no: "Ikke fullført", en: "Not completed" },
  markCompleted: { no: "Marker fullført", en: "Mark as completed" },
  undoCompleted: { no: "Angre fullføring", en: "Undo completion" },
  saving: { no: "Lagrer…", en: "Saving…" },
  fetchingStatus: { no: "Henter status…", en: "Fetching status…" },
  refreshStatus: { no: "Oppdater status", en: "Refresh status" },
  saveFailed: { no: "Fremgangen ble ikke lagret. Prøv igjen.", en: "Progress could not be saved. Try again." },
  saveUnconfirmed: { no: "Lagringen ble mottatt, men status kunne ikke bekreftes. Oppdater status før du gjør en ny endring.", en: "The save was received, but the status could not be confirmed. Refresh the status before making another change." },
  fetchFailed: { no: "Status kunne ikke hentes. Prøv igjen.", en: "Status could not be fetched. Try again." },
  progressFetchFailed: { no: "Fremgangen kunne ikke hentes. Oppdater status for å prøve igjen.", en: "Progress could not be fetched. Refresh the status to try again." },
  loginToSave: { no: "Logg inn på nytt for å lagre fremgangen.", en: "Log in again to save your progress." },

  // Disclosures and exercises
  showSolution: { no: "Vis løsning", en: "Show solution" },
  hideSolution: { no: "Skjul løsning", en: "Hide solution" },
  showSolutionAndAnswer: { no: "Vis løsning og fasit", en: "Show worked solution and answer" },
  directLink: { no: "Direktelenke", en: "Direct link" },
  answerKey: { no: "Fasit", en: "Answer" },
  sourceLabel: { no: "Kilde", en: "Source" },
  pdfPage: { no: "PDF-side", en: "PDF page" },
  relevantTopics: { no: "Relevante temaer", en: "Related subtopics" },
  tryBeforeSolution: { no: "Forsøk oppgaven før du åpner løsningen. Temalenkene tar deg til teorien du trenger.", en: "Try the exercise before opening the solution. The subtopic links take you to the theory you need." },
  noProblemSet: { no: "Dette emnet har ikke et eget tutorialsett i kursmaterialet. De ukentlige regneoppgavene starter i uke 2.", en: "This topic has no tutorial set of its own in the course material. The weekly calculation exercises start in week 2." },
  verificationOfficial: { no: "Kontrollert mot QUT-fasit", en: "Checked against the QUT answer key" },
  verificationCorrected: { no: "QUT-fasit med forklart rettelse", en: "QUT answer key with explained correction" },
  verificationDerived: { no: "Egen utregning", en: "Independent derivation" },
  verificationOpen: { no: "Åpen praktisk oppgave", en: "Open practical exercise" },

  // Landing page
  landingKicker: { no: "EGB339 · QUT · Semester 2 · 12 cp", en: "EGB339 · QUT · Semester 2 · 12 cp" },
  landingLede: { no: "Fra koordinatrammer til robotbevegelse og robot vision. Åtte emner bygger steg for steg opp til forward og inverse kinematics, Jacobian, bevegelsesplanlegging og bildebehandling.", en: "From coordinate frames to robot motion and robot vision. Eight topics build step by step up to forward and inverse kinematics, the Jacobian, motion planning and image processing." },
  continueHeading: { no: "Neste emne for deg", en: "Your next topic" },
  getStartedHeading: { no: "Kom i gang", en: "Get started" },
  loginToTrack: { no: "Logg inn for å spore fremgangen din.", en: "Log in to track your progress." },
  topicsOfTotal: { no: "emner fullført", en: "topics completed" },
  startStudying: { no: "Start studiet", en: "Start studying" },
  continueStudying: { no: "Fortsett studiet", en: "Continue studying" },
  startTopic1: { no: "Start med emne 1", en: "Start with topic 1" },
  reviewCheatsheet: { no: "Repeter med hurtigarket", en: "Review with the cheat sheet" },
  allTopicsCompleted: { no: "Alle emner er fullført", en: "All topics are completed" },
  topicsHeading: { no: "Emneoversikt", en: "Topic overview" },
  topicsIntro: { no: "Emnene leses i rekkefølge — hvert emne bygger på det forrige. Åpne et emne for leksjoner, interaktive laboratorier, oppgaver og assessment-koblinger.", en: "Read the topics in order — each topic builds on the previous one. Open a topic for lessons, interactive labs, exercises and assessment links." },
  pillTopics: { no: "temaer", en: "subtopics" },
  pillProblems: { no: "oppgaver", en: "exercises" },
  pillAssessments: { no: "assessments", en: "assessments" },
  pillAssessment: { no: "assessment", en: "assessment" },
  toolsHeading: { no: "Interaktive robotverktøy", en: "Interactive robot tools" },
  toolsIntro: { no: "Utforsk modellene direkte — endre parametere og se hva som skjer.", en: "Explore the models directly — change the parameters and watch what happens." },
  assessmentsHeading: { no: "Vurderinger", en: "Assessments" },
  assessmentsIntro: { no: "Assessment 1 (problem-solving) teller 20 %, Assessment 2 (anvendt prosjekt) 45 % og den skriftlige eksamenen 35 %. Hver emneside viser hvilke assessments som bruker stoffet.", en: "Assessment 1 (problem-solving) counts 20 %, Assessment 2 (applied project) 45 % and the written exam 35 %. Each topic page shows which assessments use its material." },
  openAssessments: { no: "Åpne vurderingsoversikten", en: "Open the assessment overview" },
  moreHeading: { no: "Repetisjon og oppslag", en: "Review and reference" },
  cheatsheetLink: { no: "Hurtigark og formler", en: "Cheat sheet and formulas" },
  cheatsheetDescription: { no: "Kjerneformlene fra alle åtte emner.", en: "The core formulas from all eight topics." },
  indexLink: { no: "Fagregister", en: "Topic index" },
  indexDescription: { no: "Slå opp begreper på tvers av emnene.", en: "Look up concepts across the topics." },
  resourcesLink: { no: "Praktiske ressurser", en: "Practical resources" },
  resourcesDescription: { no: "Simulator, oppsett og praktiske guider.", en: "Simulator, setup and practical guides." },
  progressBarAria: { no: "Fullførte EGB339-emner", en: "Completed EGB339 topics" },
  topicContentsAria: { no: "Innhold i dette emnet", en: "Content in this topic" },

  // Tools on the landing page
  toolSe2Title: { no: "SE(2)-laboratoriet", en: "The SE(2) lab" },
  toolSe2Description: { no: "Koordinatrammer og homogene transformasjoner i 2D.", en: "Coordinate frames and homogeneous transformations in 2D." },
  toolFkTitle: { no: "FK-laboratoriet", en: "The FK lab" },
  toolFkDescription: { no: "Dra i leddene og se end-effektoren til 2R-roboten.", en: "Drag the joints and watch the 2R robot's end effector." },
  toolIkTitle: { no: "IK-laboratoriet", en: "The IK lab" },
  toolIkDescription: { no: "Finn leddvinkler til et målpunkt — begge grener.", en: "Find the joint angles for a target point — both branches." },
  toolGuideTitle: { no: "Assessment 2.1-guiden", en: "The Assessment 2.1 guide" },
  toolGuideDescription: { no: "Følg SPACE fra bildepunkt til tastetrykk.", en: "Follow SPACE from image point to key press." },

  // Week page scaffolding
  syllabusHeading: { no: "Emne for emne", en: "Topic by topic" },
  syllabusIntro: { no: "Leksjoner, oppgaver og pensumkoblinger i kursrekkefølge. Åpne et emne for å se temaene, oppgavene og assessmentene som hører til.", en: "Lessons, exercises and curriculum links in course order. Expand a topic to see its subtopics, exercises and assessments." },
  showAllTopics: { no: "Vis alle emner", en: "Expand all topics" },
  hideAllTopics: { no: "Lukk alle emner", en: "Collapse all topics" },
  showTopicsAria: { no: "Vis emner i kursplanen", en: "Expand topics in the course plan" },
  openFullTopic: { no: "Åpne hele emnesiden", en: "Open the full topic page" },
  assessmentsUsingThis: { no: "Assessments som bruker dette stoffet", en: "Assessments that use this material" },
  curriculumNote: { no: "Pensumkobling, ikke innleveringsuke. Se vurderingssiden for krav.", en: "Curriculum link, not submission week. See the assessment page for requirements." },
  topicsMarkedCompleted: { no: "emner markert fullført", en: "topics marked completed" },
  separateMarks: { no: "Emner og temaer har separate fullføringsmerker.", en: "Topics and subtopics have separate completion marks." },
  nextUnfinished: { no: "Neste ufullførte tema", en: "Next unfinished subtopic" },
  allRead: { no: "Alle temaene i leseløpet er markert fullført. Du finner oppgavene og assessments under hvert emne.", en: "All subtopics in the reading path are marked completed. You will find the exercises and assessments under each topic." },
  completeTopicPrefix: { no: "Fullfør", en: "Complete" },
  completeTopicNote: { no: "er separat fra temaer og assessments. Marker når du har gjennomgått stoffet og kontrollert oppgavene du arbeider med.", en: "is separate from subtopics and assessments. Mark it when you have worked through the material and checked the exercises you are working on." },
  topicMarkNote: { no: "Emnemerket", en: "The topic mark" },
  weekSingular: { no: "uke", en: "week" },
  assessmentsForTopicPrefix: { no: "Assessments som bruker", en: "Assessments that use" },
  assessmentsForTopicNote: { no: "Dette er pensumkoblinger til", en: "These are curriculum links for" },
  assessmentsForTopicNote2: { no: ", ikke innleveringsuker. Gjennomgangene under er de samme som på vurderingssidene. Fullføringsmerket gjelder hele assessmenten, også når den bruker stoff fra flere uker.", en: ", not submission weeks. The walkthroughs below are the same as on the assessment pages. The completion mark covers the whole assessment, even when it draws on several weeks." },
  assessmentInThisWeek: { no: "Assessment i dette emnet", en: "Assessments in this topic" },
  openAssessmentPage: { no: "Oppgavebeskrivelse, krav og innlevering", en: "Task description, requirements and submission" },
  openPartOnAssessmentPage: { no: "Åpne denne delen på assessment-siden", en: "Open this part on the assessment page" },
  missingSourceDetail: { no: "Kildedetalj mangler. Eksakt svar kan ikke verifiseres uten den angitte startfilen.", en: "Source detail missing. The exact answer cannot be verified without the referenced starter file." },

  // Assessments overview page
  assessmentsPageTitle: { no: "Assessments og innleveringsstøtte", en: "Assessments and submission support" },
  assessmentsPageIntro: { no: "Krav, matematikk og teststrategi. Eksempeldata er til kontroll; implementasjonene må være generelle.", en: "Requirements, mathematics and test strategy. Example data is for verification; the implementations must be general." },
  weightsHeading: { no: "Dette teller i sluttkarakteren", en: "What counts towards the final grade" },
  vivaRule: { no: "Viva-regel:", en: "Viva rule:" },
  vivaText: { no: "Generativ AI kan brukes kritisk og deklarert i forberedelsen, men ikke under de personlige muntlige delene i Assessment 2.1 og 2.3.", en: "Generative AI may be used critically and with disclosure while preparing, but not during the individual oral components of Assessment 2.1 and 2.3." },
  curriculumLabel: { no: "Pensum", en: "Curriculum" },
  assessmentWeekLabel: { no: "Vurderingsuke", en: "Assessment week" },

  // Resources page
  resourcesPageTitle: { no: "Simulator, oppsett og arbeidsflyt", en: "Simulator, setup and workflow" },
  resourcesPageIntro: { no: "Praktiske guider. Miljøspesifikke parametere holdes atskilt fra selve kinematikkmodellen.", en: "Practical guides. Environment-specific parameters are kept separate from the kinematics model itself." },
  weekLabel: { no: "Uke", en: "Week" },

  // Topic index page
  indexPageTitle: { no: "Temaer og faglige sammenhenger", en: "Subtopics and connections" },
  indexPageIntro1: { no: "Et oppslagsregister på tvers av ukene. Bruk", en: "A cross-topic reference. Use" },
  indexPageIntro2: { no: "kursplanen", en: "the course plan" },
  indexPageIntro3: { no: "for kronologisk lesing.", en: "for chronological reading." },
  indexTracksAria: { no: "Fagspor i kunnskapskartet", en: "Tracks in the knowledge map" },
  archivedNote: { no: "Tidligere fagkart – beholdt som referanse", en: "Earlier course map — kept for reference" },
  referenceNote: { no: "Referanse", en: "Reference" },
  backToIndex: { no: "Tilbake til fagregisteret", en: "Back to the topic index" },
  tasksAndAssessment: { no: "Oppgaver og assessment", en: "Exercises and assessment" },
  exercisesForWeek: { no: "Regneoppgaver og løsningsforslag for uke", en: "Calculation exercises and worked solutions for week" },
  assessmentNote: { no: "Assessmentene bruker ukens stoff sammen med andre emner; vurderingsuke og pensumuke er ikke nødvendigvis like.", en: "The assessments use the week's material together with other topics; the assessment week and the curriculum week are not necessarily the same." },
  inThisLesson: { no: "I denne leksjonen", en: "In this lesson" },
  onThisAssessment: { no: "På denne vurderingssiden", en: "On this assessment page" },
  requirementsOverview: { no: "Krav og oversikt", en: "Requirements and overview" },
  walkthroughParts: { no: "Løsningsgjennomgang", en: "Solution walkthrough" },
  walkthroughPartsSuffix: { no: "deler", en: "parts" },
  keepSignatures: { no: "Behold funksjonssignaturene, bygg en generell løsning og verifiser med egne input. Studentens leveringskode publiseres ikke her.", en: "Keep the function signatures, build a general solution and verify with your own input. The student's submitted code is not published here." },

  // Reference tracks
  trackFoundations: { no: "Verktøy og grunnlag", en: "Tools and foundations" },
  trackFoundationsDesc: { no: "Python, NumPy, lineær algebra og autograder-strategi.", en: "Python, NumPy, linear algebra and autograder strategy." },
  trackKinematics: { no: "Pose og kinematikk", en: "Pose and kinematics" },
  trackKinematicsDesc: { no: "Rammer, transformasjoner, FK, IK og Jacobianer.", en: "Frames, transformations, FK, IK and Jacobians." },
  trackMotion: { no: "Bevegelsesplanlegging", en: "Motion planning" },
  trackMotionDesc: { no: "Interpolasjon, hastighetsprofiler og kollisjonsmargin.", en: "Interpolation, velocity profiles and clearance margin." },
  trackVision: { no: "Robot vision", en: "Robot vision" },
  trackVisionDesc: { no: "Bilder, segmentering, farge, form og homografier.", en: "Images, segmentation, colour, shape and homographies." },

  // Week 1 jump-navigation section titles
  w1Introduction: { no: "Introduksjon", en: "Introduction" },
  w1WhatIsRobotics: { no: "Hva er robotikk?", en: "What is robotics?" },
  w1CoordinateFrames: { no: "Koordinatrammer", en: "Coordinate frames" },
  w1VectorsMatrices: { no: "Vektorer og matriser", en: "Vectors and matrices" },
  w1PythonFoundations: { no: "Python-grunnlag", en: "Python foundations" },
  w1PublicPrivateTests: { no: "Offentlige og private tester", en: "Public and private tests" },
  w1PracticalPrep: { no: "Praktisk forberedelse", en: "Practical preparation" },
  w1Exercises: { no: "Oppgaver og løsninger", en: "Exercises and solutions" },
  w1AssessmentNext: { no: "Assessment og neste uke", en: "Assessment and next week" },
} as const satisfies Record<string, Egb339UiString>;

export type Egb339UiKey = keyof typeof EGB339_UI;

/** Look up a UI string in the active language. */
export function ui(lang: Egb339Lang, key: Egb339UiKey): string {
  return EGB339_UI[key][lang];
}
