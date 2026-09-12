/** Pilot-only navigation; hrefs may change, the existing completion keys do not. */
export const WEEK_ONE_ROUTE = "/egb339/uker/uke-1";
export const WEEK_ONE_WARMUP = "assessment-1-0-warmup-to-gradescope";
export const WEEK_ONE_SECTIONS = [
  { id: "introduction", title: "Introduction", short: "Introduction" },
  { id: "what-is-robotics", title: "What is robotics?", short: "Robotics" },
  { id: "coordinate-frames", title: "Coordinate frames", short: "Frames" },
  { id: "foundations", title: "Vectors and matrices", short: "Foundations" },
  { id: "python", title: "Python foundations", short: "Python", pageKey: "egb339/tema/python-control-flow-and-collections" },
  { id: "autograder", title: "Public and private tests", short: "Tests", pageKey: "egb339/tema/public-and-private-autograder-tests" },
  { id: "practical", title: "Practical preparation", short: "Practical" },
  { id: "oppgaver", title: "Exercises and solutions", short: "Exercises" },
  { id: "assessment", title: "Assessment and next week", short: "Assessment" },
] as const;

// QUT Warmup to Gradescope, PDF p. 6. The source's printed first result row is wrong.
export const WEEK_ONE_Q15 = { a: [[1, 2], [3, 4]], b: [[5, 6], [7, 8]] } as const;
export const WEEK_ONE_IDENTITY = { a: [[1, 0], [0, 1]], b: [[5, 6], [7, 8]] } as const;

/** Short task statements alongside the unchanged, source-checked walkthroughs. */
export const WEEK_ONE_PROMPTS: Record<string, string> = {
  q1: "Regn ut uttrykket i arithmetic-funksjonens docstring. Startfilen må hentes fra QUT før det eksakte uttrykket kan bestemmes.",
  q2: "Returner om input er mindre enn 10. Hva skal 5, 8, 12 og −15 gi? Kontroller også akkurat 10.",
  q3: "Kombiner nedre og øvre grense med and. Undersøk hva oppgavens ordlyd faktisk sier om endepunktene 0 og 10.",
  q4: "Opprett listen og tuppelen som creating_collections ber om. Innhold og returstruktur må kontrolleres i QUT-startfilen.",
  q5: "Start på 1 og doble så lenge verdien er høyst N. Finn listen for N = 5, og kontroller N = 0.",
  q6: "Returner ett boolsk svar per input: er tallet ikke-negativt? Prøv [10, −2, 0, 1]. Behold rekkefølgen.",
  q7: "Definer add med to argumenter. Funksjonen skal returnere summen, ikke bare skrive den ut.",
  q8: "Lag en NumPy-array med verdiene 1, 2 og 3, og datatypen float64.",
  q9: "Lag en float64-array med to rader og tre kolonner. Verdiene er valgfrie; formen er ikke det.",
  q10: "Kombiner arrayene med uttrykket i numpy_arithmetic sin docstring. Uttrykket mangler i PDF-en; ikke velg et tilfeldig regneuttrykk.",
  q11: "Transponer matrisen [[1, 2], [3, 4]]. Hva skjer med formen når du transponerer en rad med tre elementer?",
  q12: "Finn determinanten til [[1, 1], [2, 0]], og velg en metode som også virker for større kvadratiske matriser.",
  q13: "Finn inversen til [[1, 2], [1, 0]]. Kontroller svaret ved å multiplisere med den opprinnelige matrisen.",
  q14: "Legg 1 til alle elementene i første rad og 2 til alle i andre rad. Hvordan må offset-arrayet formes?",
  q15: "Multipliser A = [[1, 2], [3, 4]] med B = [[5, 6], [7, 8]]. Vis ett rad–kolonne-produkt for hvert resultatelement.",
};
