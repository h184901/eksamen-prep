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

/** English variants of the warmup prompts. */
export const WEEK_ONE_PROMPTS_EN: Record<string, string> = {
  q1: "Evaluate the expression in the arithmetic function's docstring. The starter file must be fetched from QUT before the exact expression can be determined.",
  q2: "Return whether the input is less than 10. What should 5, 8, 12 and −15 give? Also check exactly 10.",
  q3: "Combine a lower and an upper bound with and. Examine what the task wording actually says about the endpoints 0 and 10.",
  q4: "Create the list and the tuple that creating_collections asks for. The contents and return structure must be checked in the QUT starter file.",
  q5: "Start at 1 and double as long as the value is at most N. Find the list for N = 5, and check N = 0.",
  q6: "Return one boolean answer per input: is the number non-negative? Try [10, −2, 0, 1]. Keep the order.",
  q7: "Define add with two arguments. The function must return the sum, not just print it.",
  q8: "Create a NumPy array with the values 1, 2 and 3, and the dtype float64.",
  q9: "Create a float64 array with two rows and three columns. The values are up to you; the shape is not.",
  q10: "Combine the arrays with the expression in numpy_arithmetic's docstring. The expression is missing from the PDF; do not pick an arbitrary arithmetic expression.",
  q11: "Transpose the matrix [[1, 2], [3, 4]]. What happens to the shape when you transpose a row with three elements?",
  q12: "Find the determinant of [[1, 1], [2, 0]], and choose a method that also works for larger square matrices.",
  q13: "Find the inverse of [[1, 2], [1, 0]]. Check the answer by multiplying with the original matrix.",
  q14: "Add 1 to every element in the first row and 2 to every element in the second row. How must the offset array be shaped?",
  q15: "Multiply A = [[1, 2], [3, 4]] by B = [[5, 6], [7, 8]]. Show one row–column product for each result element.",
};

/** Bilingual titles for the Week 1 sections (id-keyed; WEEK_ONE_SECTIONS keeps its shape). */
export const WEEK_ONE_SECTION_TITLES: Record<string, { no: string; en: string; shortNo: string; shortEn: string }> = {
  introduction: { no: "Introduksjon", en: "Introduction", shortNo: "Introduksjon", shortEn: "Introduction" },
  "what-is-robotics": { no: "Hva er robotikk?", en: "What is robotics?", shortNo: "Robotikk", shortEn: "Robotics" },
  "coordinate-frames": { no: "Koordinatrammer", en: "Coordinate frames", shortNo: "Rammer", shortEn: "Frames" },
  foundations: { no: "Vektorer og matriser", en: "Vectors and matrices", shortNo: "Grunnlag", shortEn: "Foundations" },
  python: { no: "Python-grunnlag", en: "Python foundations", shortNo: "Python", shortEn: "Python" },
  autograder: { no: "Offentlige og private tester", en: "Public and private tests", shortNo: "Tester", shortEn: "Tests" },
  practical: { no: "Praktisk forberedelse", en: "Practical preparation", shortNo: "Practical", shortEn: "Practical" },
  oppgaver: { no: "Oppgaver og løsninger", en: "Exercises and solutions", shortNo: "Oppgaver", shortEn: "Exercises" },
  assessment: { no: "Assessment og neste uke", en: "Assessment and next week", shortNo: "Assessment", shortEn: "Assessment" },
};
