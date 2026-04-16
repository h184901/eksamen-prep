import type { FormulaDetailData } from "@/components/FormulaDetailModal";

export type FormulaMeta = Omit<FormulaDetailData, "latex" | "title" | "variant">;

// ═══════════════════════════════════════════════════════════════
// KINEMATIKK — Kap 2–3
// ═══════════════════════════════════════════════════════════════

export const konstAkselV: FormulaMeta = {
  conceptExplanation:
    "Hastigheten vokser lineært med tiden når akselerasjonen er konstant. Starter du med v₀ og akselererer jevnt med a, øker farten med a hvert sekund.",
  variables: [
    { symbol: "v", name: "Sluttfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "v_0", name: "Startfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "a", name: "Akselerasjon (konstant)", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
  ],
  whenToUse:
    "Når akselerasjonen er konstant og du har tre av størrelsene v, v₀, a, t og vil finne den fjerde.",
  whenNotToUse:
    "Ikke bruk når akselerasjonen varierer (da trengs integrasjon). Ikke bruk i fritt fall hvis vi måler y positiv opp og bruker a = −g uten å sette inn fortegn.",
  commonMistakes: [
    "Glemme fortegn på a (f.eks bremsing = negativ a)",
    "Blande v₀ (start) og v (slutt)",
  ],
};

export const konstAkselX: FormulaMeta = {
  conceptExplanation:
    "Posisjonen som funksjon av tid under konstant akselerasjon. Leddet ½at² er bidraget fra akselerasjonen — derfor vokser avstanden kvadratisk i tid.",
  variables: [
    { symbol: "x", name: "Posisjon ved tid t", unit: "m", unitName: "meter" },
    { symbol: "x_0", name: "Startposisjon", unit: "m", unitName: "meter" },
    { symbol: "v_0", name: "Startfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "a", name: "Akselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Når du skal finne tilbakelagt avstand eller posisjon under konstant a.",
  whenNotToUse: "Ikke gyldig hvis a ikke er konstant.",
  commonMistakes: [
    "Glemme ½-faktoren i akselerasjonsleddet",
    "Bruke feil fortegn på a i fritt fall",
  ],
};

export const konstAkselV2: FormulaMeta = {
  conceptExplanation:
    "Tidsuavhengig sammenheng mellom fart og avstand under konstant akselerasjon. Veldig nyttig når tiden er ukjent.",
  variables: [
    { symbol: "v", name: "Sluttfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "v_0", name: "Startfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "a", name: "Akselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "x - x_0", name: "Tilbakelagt avstand", unit: "m", unitName: "meter" },
  ],
  whenToUse:
    "Når du IKKE har tid, men har to av {v, v₀, a, Δx} og vil finne den tredje. Perfekt for bremsebaner og akselerasjonsløp.",
  whenNotToUse: "Ikke bruk når a ikke er konstant.",
  commonMistakes: [
    "Glemme at v² og v₀² er kvadrater — fortegn forsvinner, men retning må tas vare på separat",
  ],
};

export const konstAkselSnitt: FormulaMeta = {
  conceptExplanation:
    "Når a er konstant er snittfarten ganske enkelt (v₀+v)/2. Avstanden = snittfart × tid.",
  variables: [
    { symbol: "x - x_0", name: "Tilbakelagt avstand", unit: "m", unitName: "meter" },
    { symbol: "v_0", name: "Startfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "v", name: "Sluttfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Når du kjenner start- og sluttfart samt tid, og vil finne avstand uten å bruke a.",
  whenNotToUse: "Gyldig kun når a er konstant — da er snittfart lik midtverdien.",
};

export const frittFall: FormulaMeta = {
  conceptExplanation:
    "Fritt fall er konstant akselerasjon med a = −g nedover (g = 9,81 m/s²). Kinematikkformlene gjelder direkte — bare bytt ut a med −g.",
  variables: [
    { symbol: "y", name: "Vertikal posisjon (positiv opp)", unit: "m", unitName: "meter" },
    { symbol: "v_y", name: "Vertikal hastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "v_{0y}", name: "Start-vertikal hastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "g", name: "Tyngdeakselerasjonen", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
  ],
  whenToUse:
    "Når eneste kraft er tyngdekraften — steiner som faller, ball kastet rett opp, osv. Luftmotstand antas ubetydelig.",
  whenNotToUse: "Ikke bruk hvis luftmotstand er vesentlig, eller hvis det er andre krefter enn tyngdekraften.",
  commonMistakes: [
    "Blande fortegn på g — her regnes g positivt og settes inn med minus fordi y er positiv opp",
    "Glemme at v_y = 0 i høyeste punkt, IKKE at a = 0",
  ],
};

export const skrattKastKomp: FormulaMeta = {
  conceptExplanation:
    "Dekomponering av starthastighet i horisontal og vertikal komponent. Disse er uavhengige av hverandre under hele kastet.",
  variables: [
    { symbol: "v_0", name: "Starthastighetens størrelse", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\theta", name: "Kastvinkel over horisontal", unit: "°", unitName: "grader eller rad" },
    { symbol: "v_{0x}", name: "Horisontal startfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "v_{0y}", name: "Vertikal startfart", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Alltid først i skråkast-oppgaver — dekomponér v₀ i x- og y-retning.",
  commonMistakes: [
    "Bruke sin og cos motsatt — cos for x (horisontal), sin for y (vertikal)",
  ],
};

export const skrattKastBevegelse: FormulaMeta = {
  conceptExplanation:
    "Skråkast = rettlinjet bevegelse i x-retning (konstant fart) + fritt fall i y-retning. Behandle dem separat!",
  variables: [
    { symbol: "x", name: "Horisontal posisjon", unit: "m", unitName: "meter" },
    { symbol: "y", name: "Vertikal posisjon", unit: "m", unitName: "meter" },
    { symbol: "v_{0x}", name: "Horisontal startfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "v_{0y}", name: "Vertikal startfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Når luftmotstand er neglisjerbar og eneste kraft er tyngde.",
  whenNotToUse: "Ikke bruk hvis start- og sluttpunkt har ulik høyde og du bruker rekkeviddeformelen uten tilpasning.",
};

export const maksHR: FormulaMeta = {
  conceptExplanation:
    "Maks høyde nås når vertikal fart = 0. Maksimal rekkevidde oppnås for θ = 45° (v₀²/g).",
  variables: [
    { symbol: "h", name: "Maks høyde", unit: "m", unitName: "meter" },
    { symbol: "R", name: "Rekkevidde (samme starthøyde)", unit: "m", unitName: "meter" },
    { symbol: "v_0", name: "Starthastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\theta", name: "Kastvinkel", unit: "°", unitName: "grader" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
  ],
  whenToUse: "Kun når prosjektil kastes fra og lander på SAMME høyde.",
  whenNotToUse:
    "Ikke bruk hvis lande- og starthøyde er ulik (f.eks kast fra et stup). Da må du bruke kinematikkformlene i steg.",
  commonMistakes: [
    "Bruke rekkeviddeformelen når start og slutt ikke er samme høyde",
  ],
};

export const snittfart: FormulaMeta = {
  conceptExplanation:
    "Gjennomsnittsfart = total tilbakelagt posisjonsendring delt på tiden. I en x-t-graf tilsvarer dette helningen på sekanten mellom to punkter.",
  variables: [
    { symbol: "\\bar{v}", name: "Gjennomsnittsfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\Delta x", name: "Posisjonsendring", unit: "m", unitName: "meter" },
    { symbol: "\\Delta t", name: "Tidsintervall", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Over et endelig intervall der du kjenner start- og sluttposisjon.",
  whenNotToUse: "Ikke bruk for øyeblikkelig fart — bruk deriverte.",
  commonMistakes: [
    "Tro at gjennomsnittsfart = (start + slutt)/2 generelt — det gjelder BARE når a er konstant",
  ],
};

export const momentanfart: FormulaMeta = {
  conceptExplanation:
    "Momentanfart er den deriverte av posisjonen med hensyn til tid — helningen på tangenten i x-t-grafen.",
  variables: [
    { symbol: "v", name: "Momentanfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "x", name: "Posisjon", unit: "m", unitName: "meter" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Når du har x(t) som en funksjon og vil finne farten på et bestemt tidspunkt.",
};

export const snittaksel: FormulaMeta = {
  conceptExplanation:
    "Gjennomsnittsakselerasjon = hastighetsendring delt på tidsintervall. I v-t-grafen: helningen på sekanten.",
  variables: [
    { symbol: "\\bar{a}", name: "Gjennomsnittsakselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "\\Delta v", name: "Hastighetsendring", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\Delta t", name: "Tidsintervall", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Over et endelig intervall.",
};

export const momentanaksel: FormulaMeta = {
  conceptExplanation:
    "Momentanakselerasjon er andre-deriverte av posisjonen. Hvis v(t) er kjent: a = dv/dt. Hvis x(t) er kjent: a = d²x/dt².",
  variables: [
    { symbol: "a", name: "Momentanakselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "v", name: "Hastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "x", name: "Posisjon", unit: "m", unitName: "meter" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Når v(t) eller x(t) er kjent — deriver.",
};

export const varAksel: FormulaMeta = {
  conceptExplanation:
    "Når akselerasjonen VARIERER kan du ikke bruke de enkle formlene. Integrér a(t) for v(t); integrér v(t) for x(t).",
  variables: [
    { symbol: "v(t)", name: "Hastighet som funksjon av tid", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "x(t)", name: "Posisjon som funksjon av tid", unit: "m", unitName: "meter" },
    { symbol: "a(t)", name: "Akselerasjon som funksjon av tid", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "v_0, x_0", name: "Start-hastighet og posisjon", unit: "m/s, m", unitName: "" },
  ],
  whenToUse: "Når a IKKE er konstant (f.eks a(t) = 2t).",
  whenNotToUse: "Ikke nødvendig hvis a er konstant — da holder de 4 kinematikkformlene.",
};

export const posisjonsVektor: FormulaMeta = {
  conceptExplanation:
    "Posisjonsvektoren peker fra origo til partikkelen. Komponentene i x, y, z (evt. bare x, y i 2D).",
  variables: [
    { symbol: "\\vec{r}", name: "Posisjonsvektor", unit: "m", unitName: "meter" },
    { symbol: "x, y, z", name: "Komponenter", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Grunnleggende verktøy for 2D/3D-bevegelse — alle videre størrelser (v, a) er deriverte av r.",
};

export const vektorFart: FormulaMeta = {
  conceptExplanation:
    "Hastighetsvektoren er den tidsderiverte av r. I 2D har den komponenter v_x og v_y som kan behandles uavhengig.",
  variables: [
    { symbol: "\\vec{v}", name: "Hastighetsvektor", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\vec{r}", name: "Posisjonsvektor", unit: "m", unitName: "meter" },
    { symbol: "v_x, v_y", name: "Hastighetskomponenter", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "I alle 2D/3D-problem — dekomponér i komponenter.",
};

export const fartsStorrelse: FormulaMeta = {
  conceptExplanation: "Fartens størrelse er lengden av hastighetsvektoren, funnet via Pythagoras.",
  variables: [
    { symbol: "v", name: "Fart (størrelse)", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "v_x, v_y", name: "Hastighetskomponenter", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Når du har komponentene og vil vite totalfart.",
};

export const vektorAksel: FormulaMeta = {
  conceptExplanation:
    "Akselerasjonsvektoren er tidsderiverte av v. Kan dekomponeres i komponenter langs hver akse.",
  variables: [
    { symbol: "\\vec{a}", name: "Akselerasjonsvektor", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "\\vec{v}", name: "Hastighetsvektor", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "a_x, a_y", name: "Komponenter", unit: "m/s²", unitName: "meter per sekund kvadrat" },
  ],
  whenToUse: "Alltid i 2D/3D-dynamikk — dekomponér Newtons 2. lov.",
};

export const rekkeviddeR: FormulaMeta = {
  conceptExplanation:
    "Rekkevidden R gjelder for kast fra og til samme høyde. Maks ved α = 45°; symmetrisk om 45° (f.eks 30° og 60° gir samme R).",
  variables: [
    { symbol: "R", name: "Rekkevidde", unit: "m", unitName: "meter" },
    { symbol: "v_0", name: "Starthastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\alpha_0", name: "Kastvinkel", unit: "°", unitName: "grader" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
  ],
  whenToUse: "Kast fra og tilbake til samme høyde.",
  whenNotToUse: "IKKE for kast fra et stup eller fra/til ulike høyder.",
};

export const sentripetalT: FormulaMeta = {
  conceptExplanation:
    "Sentripetalakselerasjon uttrykt ved omløpstid T. Siden v = 2πR/T er a = 4π²R/T².",
  variables: [
    { symbol: "a", name: "Sentripetalakselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "R", name: "Sirkelradius", unit: "m", unitName: "meter" },
    { symbol: "T", name: "Omløpstid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Når T er gitt (f.eks planetbaner).",
};

export const baneaksel: FormulaMeta = {
  conceptExplanation:
    "Baneakselerasjonen (tangentiell) endrer FARTENS STØRRELSE. Sentripetalakselerasjonen endrer retningen. Sammen utgjør de den totale akselerasjonen.",
  variables: [
    { symbol: "a_\\parallel", name: "Tangentiell akselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "|\\vec{v}|", name: "Fartens størrelse", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Når farten på banen endrer seg (ikke jevn sirkelbevegelse).",
};

export const sirkel: FormulaMeta = {
  conceptExplanation:
    "Selv med konstant FART har et legeme i sirkelbevegelse akselerasjon — fordi retningen endrer seg. a_rad peker alltid mot sentrum av sirkelen.",
  variables: [
    { symbol: "a_{\\text{rad}}", name: "Sentripetalakselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "v", name: "Fart langs banen", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "r", name: "Sirkelradius", unit: "m", unitName: "meter" },
    { symbol: "T", name: "Omløpstid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Jevn sirkelbevegelse — legeme beveger seg med konstant fart i sirkelbane.",
  alternativForms: [
    { label: "Via omløpstid", latex: "a_\\text{rad} = \\frac{4\\pi^2 r}{T^2}" },
    { label: "Via vinkelfart", latex: "a_\\text{rad} = r\\omega^2" },
  ],
  commonMistakes: [
    "Tro at a = 0 fordi farten er konstant — retningen endres, så a ≠ 0",
    "Glemme at a_rad peker INNOVER mot sentrum",
  ],
};

// ═══════════════════════════════════════════════════════════════
// KREFTER — Kap 4–5
// ═══════════════════════════════════════════════════════════════

export const newton1: FormulaMeta = {
  conceptExplanation:
    "Treghetsloven: uten en netto kraft forblir et legeme i ro eller i jevn rettlinjet bevegelse. Dette definerer et inertialsystem.",
  variables: [
    { symbol: "\\sum\\vec{F}", name: "Sum av alle krefter på legemet", unit: "N", unitName: "newton" },
    { symbol: "\\vec{v}", name: "Hastighet", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Når et legeme er i likevekt — enten i ro eller i jevn bevegelse. Setter opp likevektslikninger.",
  whenNotToUse: "Ikke i akselererende systemer med mindre du inkluderer treghetskrefter.",
  commonMistakes: [
    "Tro at \"i ro\" betyr ingen krefter — det betyr at kreftene balanserer",
  ],
};

export const newton2: FormulaMeta = {
  conceptExplanation:
    "Netto kraft = masse × akselerasjon. Mer kraft → mer akselerasjon. Mer masse → mindre akselerasjon for samme kraft. Alltid vektoriell!",
  variables: [
    { symbol: "\\vec{F}", name: "Netto kraft på legemet", unit: "N", unitName: "newton" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "\\vec{a}", name: "Akselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
  ],
  whenToUse:
    "Når du har en kraft (eller flere) som virker på et legeme og vil finne akselerasjonen — eller omvendt. Jobb komponentvis (ΣFx = max, ΣFy = may).",
  whenNotToUse:
    "Ikke bruk i rotasjon — der gjelder τ = Iα. Ikke bruk i relativistisk regime (v ≈ c). Ikke bruk hvis massen endrer seg — da trengs generell form dp/dt = F.",
  commonMistakes: [
    "Glemme fortegn — krefter har retning",
    "Summerer krefter som virker på FORSKJELLIGE legemer",
    "Glemme normalkraft eller snorkraft i frilegemediagram",
  ],
};

export const newton3: FormulaMeta = {
  conceptExplanation:
    "Aksjon = reaksjon. Kreftene er like store, motsatt rettet, og virker på ULIKE legemer. De kan derfor aldri balansere hverandre på ett legeme.",
  variables: [
    { symbol: "\\vec{F}_{A\\to B}", name: "Kraft A virker på B", unit: "N", unitName: "newton" },
    { symbol: "\\vec{F}_{B\\to A}", name: "Kraft B virker tilbake på A", unit: "N", unitName: "newton" },
  ],
  whenToUse: "Ved alle samhandlinger mellom to legemer — når du identifiserer kraftpar.",
  commonMistakes: [
    "Tro at aksjon-reaksjonspar virker på SAMME legeme — de gjør ikke det",
    "Blande tyngdekraft + normalkraft med N3-par — de virker på samme legeme og er IKKE et N3-par",
  ],
};

export const friksjon: FormulaMeta = {
  conceptExplanation:
    "Statisk friksjon f_s motstår bevegelse inntil den når sitt maksimum µ_s·N. Når bevegelse starter, tar kinetisk friksjon f_k = µ_k·N over (vanligvis µ_k < µ_s).",
  variables: [
    { symbol: "f_s", name: "Statisk friksjonskraft", unit: "N", unitName: "newton" },
    { symbol: "f_k", name: "Kinetisk friksjonskraft", unit: "N", unitName: "newton" },
    { symbol: "\\mu_s", name: "Statisk friksjonskoeffisient", unit: "—", unitName: "dimensjonsløs" },
    { symbol: "\\mu_k", name: "Kinetisk friksjonskoeffisient", unit: "—", unitName: "dimensjonsløs" },
    { symbol: "N", name: "Normalkraft", unit: "N", unitName: "newton" },
  ],
  whenToUse:
    "Alltid når kontaktflater er rue og legeme enten beveger seg eller er i ferd med å gjøre det. Skjekk først om f_s_maks overskrides.",
  whenNotToUse: "Neglisjér friksjon når oppgaven sier \"glatt\" eller \"friksjonsløs\".",
  commonMistakes: [
    "Bruke f_s = µ_s·N automatisk — det er KUN maks-verdien, ikke faktisk",
    "Bruke N = mg på skråplan — der er N = mg·cosθ",
  ],
};

export const skraplan: FormulaMeta = {
  conceptExplanation:
    "På skråplan er det smart å legge x-aksen langs planet. Da virker mg·sinθ langs planet (nedover) og mg·cosθ vinkelrett (mot normalkraften).",
  variables: [
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
    { symbol: "\\theta", name: "Skråplanvinkelen", unit: "°", unitName: "grader" },
    { symbol: "N", name: "Normalkraft", unit: "N", unitName: "newton" },
    { symbol: "f", name: "Friksjonskraft", unit: "N", unitName: "newton" },
    { symbol: "a", name: "Akselerasjon langs planet", unit: "m/s²", unitName: "meter per sekund kvadrat" },
  ],
  whenToUse: "Skråplan-oppgaver. Velg alltid koordinatsystem langs/vinkelrett på planet.",
  commonMistakes: [
    "Bytte om sin/cos — sin går sammen med parallell (langs planet), cos med vinkelrett",
    "Glemme at N = mg·cosθ (ikke mg) når du bruker f = µN",
  ],
};

export const tyngdekraft: FormulaMeta = {
  conceptExplanation:
    "Tyngdekraften er m·g — massens vekt i et felt med akselerasjon g. Nær jordoverflaten er g ≈ 9,81 m/s². Uavhengig av bevegelse.",
  variables: [
    { symbol: "G", name: "Tyngdekraft", unit: "N", unitName: "newton" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s² ved havoverflaten" },
  ],
  whenToUse: "Alltid som tyngdekraft på et legeme nær jordoverflaten.",
  commonMistakes: [
    "Blande \"masse\" og \"vekt\" — masse (kg) er mengde stoff, vekt (N) er kraften G = mg",
    "Bruke g = 10 m/s² ukritisk — bruk 9,81 m/s² med mindre oppgaven sier annet",
  ],
};

export const komponentForm: FormulaMeta = {
  conceptExplanation:
    "Newtons 2. lov er en VEKTORLIKNING. I praksis løses den komponentvis langs passende akser.",
  variables: [
    { symbol: "F_x, F_y", name: "Kraftkomponenter", unit: "N", unitName: "newton" },
    { symbol: "a_x, a_y", name: "Akselerasjonskomponenter", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
  ],
  whenToUse: "Alltid i praktiske oppgaver — velg gunstig koordinatsystem og skriv ligninger for hver akse.",
};

export const kraftdekomp: FormulaMeta = {
  conceptExplanation:
    "En kraft kan splittes i komponenter langs valgte akser. Resultant kraft = Pythagoras av komponentene.",
  variables: [
    { symbol: "F", name: "Kraftens størrelse", unit: "N", unitName: "newton" },
    { symbol: "F_x, F_y", name: "Komponenter", unit: "N", unitName: "newton" },
    { symbol: "\\theta", name: "Vinkel med x-aksen", unit: "°", unitName: "grader" },
  ],
  whenToUse: "Alltid når en kraft virker skrått og du har valgt akser — dekomponér først.",
};

export const sentripetalkraft: FormulaMeta = {
  conceptExplanation:
    "Sentripetalkraft er IKKE en egen type kraft — det er NETTOKRAFTEN som må peke innover for å holde legemet på sirkelbanen. Kan være friksjon, snordrag, gravitasjon, normalkraft osv.",
  variables: [
    { symbol: "\\sum F", name: "Nettokraft inn mot sentrum", unit: "N", unitName: "newton" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "v", name: "Banefart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "R", name: "Sirkelradius", unit: "m", unitName: "meter" },
  ],
  whenToUse: "I sirkelbevegelse — sett summen av krefter i RADIELL retning lik mv²/R.",
  commonMistakes: [
    "Tegne en \"sentripetalkraft\" i frilegemediagrammet — det gjør du IKKE. Frilegemediagrammet viser bare reelle krefter",
  ],
};

export const glidefriksjon: FormulaMeta = {
  conceptExplanation:
    "Kinetisk (glide-)friksjon virker mens flatene glir mot hverandre. Alltid motsatt bevegelsesretningen, størrelse f_k = μ_k·N.",
  variables: [
    { symbol: "R", name: "Glidefriksjon (kinetisk)", unit: "N", unitName: "newton" },
    { symbol: "\\mu_k", name: "Kinetisk friksjonskoeffisient", unit: "—", unitName: "dimensjonsløs" },
    { symbol: "N", name: "Normalkraft", unit: "N", unitName: "newton" },
  ],
  whenToUse: "Når legemet GLIR. Retning alltid motsatt bevegelsen.",
};

export const hvilefriksjon: FormulaMeta = {
  conceptExplanation:
    "Statisk friksjon tilpasser seg selv — kan være hva som helst fra 0 opp til μ_s·N. Når denne grensen overskrides, begynner det å gli og f_k tar over.",
  variables: [
    { symbol: "R", name: "Hvilefriksjon (statisk)", unit: "N", unitName: "newton" },
    { symbol: "\\mu_s", name: "Statisk friksjonskoeffisient", unit: "—", unitName: "dimensjonsløs (μ_s > μ_k)" },
    { symbol: "N", name: "Normalkraft", unit: "N", unitName: "newton" },
  ],
  whenToUse: "Mens legemet er i ro. Finn først faktisk kraft som prøver å flytte det, sjekk om den er mindre enn maks.",
  commonMistakes: ["Bruke f_s = μ_s·N som den faktiske verdien — det er bare MAKS-verdien"],
};

export const kritiskVinkel: FormulaMeta = {
  conceptExplanation:
    "Skråplanets kritiske vinkel er der legemet nettopp begynner å gli. Ved tanα = μ_s er tangentialkraften mg·sinα akkurat lik maks statisk friksjon μ_s·mg·cosα.",
  variables: [
    { symbol: "\\alpha_\\text{kritisk}", name: "Vinkel der gliding starter", unit: "°", unitName: "grader" },
    { symbol: "\\mu_s", name: "Statisk friksjonskoeffisient", unit: "—", unitName: "dimensjonsløs" },
  ],
  whenToUse: "Eksperimentell bestemmelse av μ_s — eller for å finne når en kasse begynner å gli på en rampe.",
};

export const skraplanAksel: FormulaMeta = {
  conceptExplanation:
    "Akselerasjon ned et friksjonsfritt skråplan er g·sinα — uavhengig av massen.",
  variables: [
    { symbol: "a", name: "Akselerasjon langs planet", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
    { symbol: "\\alpha", name: "Skråplanvinkelen", unit: "°", unitName: "grader" },
  ],
  whenToUse: "Når et legeme glir fritt (uten friksjon) ned et skråplan.",
};

export const skraplanFriksjon: FormulaMeta = {
  conceptExplanation:
    "Med glidefriksjon nedover: tyngdekomponent langs planet (mg·sinα) minus friksjon (μ_k·mg·cosα) gir ma. Friksjon reduserer akselerasjonen.",
  variables: [
    { symbol: "a", name: "Akselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
    { symbol: "\\alpha", name: "Skråplanvinkelen", unit: "°", unitName: "grader" },
    { symbol: "\\mu_k", name: "Kinetisk friksjonskoeffisient", unit: "—", unitName: "dimensjonsløs" },
  ],
  whenToUse: "Når et legeme glir NED et skråplan med friksjon. For oppoverglidning: bytt fortegn på friksjonsleddet.",
};

export const skraplanNormal: FormulaMeta = {
  conceptExplanation:
    "På skråplan balanserer normalkraften KUN den vinkelrette komponenten av tyngden — derfor N = mg·cosα, ikke mg.",
  variables: [
    { symbol: "N", name: "Normalkraft", unit: "N", unitName: "newton" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
    { symbol: "\\alpha", name: "Skråplanvinkelen", unit: "°", unitName: "grader" },
  ],
  whenToUse: "Alltid første sjekk når du regner friksjon på skråplan — N gir riktig f = μN.",
};

export const atwood: FormulaMeta = {
  conceptExplanation:
    "To masser koblet via et tau over en trinse. Systemets akselerasjon avhenger av forskjellen i masse; snordraget ligger mellom m₁g og m₂g.",
  variables: [
    { symbol: "a", name: "Systemets akselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "T", name: "Snordrag", unit: "N", unitName: "newton" },
    { symbol: "m_1, m_2", name: "De to massene", unit: "kg", unitName: "kilogram" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
  ],
  whenToUse: "Ideell Atwood-maskin — masseløst tau, friksjonsfri og masseløs trinse.",
  whenNotToUse: "Ikke direkte anvendelig hvis trinsen har treghetsmoment (da må du behandle rotasjonen separat).",
};

// ═══════════════════════════════════════════════════════════════
// ENERGI — Kap 6–7
// ═══════════════════════════════════════════════════════════════

export const arbeid: FormulaMeta = {
  conceptExplanation:
    "Arbeid = kraft i bevegelsesretningen × forflytning. Kraft vinkelrett på bevegelsen gjør INGEN arbeid (f.eks snordrag i sirkelbevegelse).",
  variables: [
    { symbol: "W", name: "Arbeid", unit: "J", unitName: "joule (1 J = 1 N·m)" },
    { symbol: "F", name: "Kraftens størrelse", unit: "N", unitName: "newton" },
    { symbol: "d", name: "Forflytningens størrelse", unit: "m", unitName: "meter" },
    { symbol: "\\theta", name: "Vinkel mellom F og forflytning", unit: "°", unitName: "grader" },
  ],
  whenToUse: "Ved konstant kraft. For variabel kraft: W = ∫F·dx.",
  whenNotToUse: "Ikke bruk F·d direkte hvis kraft eller vinkel varierer underveis.",
  alternativForms: [
    { label: "Vektorformulering", latex: "W = \\vec{F}\\cdot\\vec{d}" },
    { label: "Variabel kraft", latex: "W = \\int \\vec{F}\\cdot d\\vec{r}" },
  ],
  commonMistakes: [
    "Tro at sentripetalkraft gjør arbeid (den gjør ikke: θ = 90°)",
    "Regne W positivt når kraft og bevegelse er motsatt rettet — da er W < 0",
  ],
};

export const kinEnergi: FormulaMeta = {
  conceptExplanation:
    "Arbeid-energi-teoremet: all netto arbeid gir endring i kinetisk energi. En kraftfull måte å løse oppgaver uten å måtte kjenne tiden.",
  variables: [
    { symbol: "E_k", name: "Kinetisk energi", unit: "J", unitName: "joule" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "v", name: "Fart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "W_\\text{tot}", name: "Netto arbeid på legemet", unit: "J", unitName: "joule" },
  ],
  whenToUse:
    "Når du vil finne sluttfart etter at netto arbeid er gjort — uten å måtte regne på tid eller akselerasjon.",
  commonMistakes: [
    "Glemme at E_k alltid er positiv",
    "Legge sammen hastighetsvektorer før kvadrering — E_k avhenger av |v|²",
  ],
};

export const potEnergi: FormulaMeta = {
  conceptExplanation:
    "Potensiell energi er lagret energi relatert til konservative krefter. Tyngdekraft gir E_p = mgy; fjær gir E_p = ½kx². Nullnivået kan velges fritt.",
  variables: [
    { symbol: "E_{p,\\text{grav}}", name: "Gravitasjonspotensiell energi", unit: "J", unitName: "joule" },
    { symbol: "E_{p,\\text{fjær}}", name: "Fjær-potensiell energi", unit: "J", unitName: "joule" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81 m/s²" },
    { symbol: "y", name: "Høyde over valgt nullnivå", unit: "m", unitName: "meter" },
    { symbol: "k", name: "Fjærkonstant", unit: "N/m", unitName: "newton per meter" },
    { symbol: "x", name: "Utslag fra likevekt", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Når du bruker energibevaring og trenger å regne lagret energi.",
  whenNotToUse:
    "E_p = mgy gjelder kun når g er tilnærmet konstant (nær jordoverflaten). Bruk E_p = −GMm/r i astronomiske problemer.",
};

export const energibevaring: FormulaMeta = {
  conceptExplanation:
    "Total mekanisk energi er bevart når bare konservative krefter gjør arbeid. Ikke-konservativt arbeid (friksjon, snordrag) tar fra eller gir energi til systemet.",
  variables: [
    { symbol: "E_{k,1}, E_{k,2}", name: "Kinetisk energi før/etter", unit: "J", unitName: "joule" },
    { symbol: "E_{p,1}, E_{p,2}", name: "Potensiell energi før/etter", unit: "J", unitName: "joule" },
    { symbol: "W_\\text{andre}", name: "Arbeid fra ikke-konservative krefter", unit: "J", unitName: "joule" },
  ],
  whenToUse:
    "Nesten alltid det enkleste verktøyet når du har to tilstander (før/etter) og ikke bryr deg om tid eller tidspunkt underveis.",
  whenNotToUse: "Ikke glem friksjonsarbeid — det er negativt og må inkluderes i W_andre.",
  commonMistakes: [
    "Glemme å inkludere W_andre ved friksjon",
    "Velge ulikt nullnivå for E_p på før/etter-siden",
  ],
};

export const effekt: FormulaMeta = {
  conceptExplanation:
    "Effekt = hvor raskt arbeid utføres (eller energi overføres). P = F·v betyr at samme kraft gir mer effekt ved høyere fart.",
  variables: [
    { symbol: "P", name: "Effekt", unit: "W", unitName: "watt (1 W = 1 J/s)" },
    { symbol: "W", name: "Arbeid", unit: "J", unitName: "joule" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
    { symbol: "\\vec{F}", name: "Kraft", unit: "N", unitName: "newton" },
    { symbol: "\\vec{v}", name: "Hastighet", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Motorer, pumper, løft med konstant hastighet.",
};

// ═══════════════════════════════════════════════════════════════
// BEVEGELSESMENGDE — Kap 8
// ═══════════════════════════════════════════════════════════════

export const arbeidVar: FormulaMeta = {
  conceptExplanation:
    "For variabel kraft er arbeid arealet under F(x)-kurven. Ved konstant F reduseres dette til F·Δx.",
  variables: [
    { symbol: "W", name: "Arbeid", unit: "J", unitName: "joule" },
    { symbol: "F(x)", name: "Kraft som funksjon av posisjon", unit: "N", unitName: "newton" },
    { symbol: "x_1, x_2", name: "Start- og sluttposisjon", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Fjærer, gravitasjon over store avstander, elektrisk kraft — alt hvor F avhenger av posisjon.",
  whenNotToUse: "Unødvendig hvis F er konstant — bruk W = F·Δx.",
};

export const arbeidFjaer: FormulaMeta = {
  conceptExplanation:
    "Arbeid du må gjøre for å strekke eller komprimere en fjær fra x₁ til x₂. Kvadrattisk i x fordi F = kx.",
  variables: [
    { symbol: "W_\\text{fjær}", name: "Arbeid mot fjæren", unit: "J", unitName: "joule" },
    { symbol: "k", name: "Fjærkonstant", unit: "N/m", unitName: "newton per meter" },
    { symbol: "x_1, x_2", name: "Utslag fra likevekt før og etter", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Alle oppgaver med fjærkompresjon, spenning, strikk, katapult.",
};

export const hookes: FormulaMeta = {
  conceptExplanation:
    "Hookes lov: fjærens kraft er proporsjonal med utslaget og motsatt rettet av forflytningen. Bare gyldig for små utslag — store utslag kan overskride fjærens elastiske grense.",
  variables: [
    { symbol: "F", name: "Fjærkraft", unit: "N", unitName: "newton" },
    { symbol: "k", name: "Fjærkonstant", unit: "N/m", unitName: "newton per meter" },
    { symbol: "x", name: "Utslag fra likevekt", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Ideelle fjærer, små svingninger, molekylære bindinger.",
  whenNotToUse: "Ikke for store utslag (elastisitetsgrensen), ikke for viskøse fjærer.",
};

export const EPgrav: FormulaMeta = {
  conceptExplanation:
    "Potensiell energi ved høyde y = mgy (nær jordoverflaten). Kun endringer i E_p er fysisk relevante — derfor kan du velge nullnivå fritt.",
  variables: [
    { symbol: "E_p", name: "Gravitasjonell potensiell energi", unit: "J", unitName: "joule" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81" },
    { symbol: "y", name: "Høyde over nullnivå", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Nær jordoverflaten hvor g er tilnærmet konstant.",
  whenNotToUse: "Ikke bruk i rombaner — bruk E_p = −GMm/r.",
};

export const Wtyngde: FormulaMeta = {
  conceptExplanation:
    "Arbeidet av tyngden avhenger KUN av høydeforskjellen — ikke av banen. Det er en konservativ kraft, derfor er W = −ΔE_p.",
  variables: [
    { symbol: "W_{mg}", name: "Arbeid av tyngden", unit: "J", unitName: "joule" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81" },
    { symbol: "y_1, y_2", name: "Start- og slutthøyde", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Når du regner arbeid fra tyngdekraften alene — ofte erstatter den et langt stibereget integral.",
};

export const EbevaringSimple: FormulaMeta = {
  conceptExplanation:
    "Når kun tyngdekraft (eller andre konservative krefter) gjør arbeid er total mekanisk energi bevart. Dette gjør oppgaver dramatisk enklere.",
  variables: [
    { symbol: "E_k", name: "Kinetisk energi", unit: "J", unitName: "joule" },
    { symbol: "E_p", name: "Potensiell energi", unit: "J", unitName: "joule" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "v", name: "Fart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81" },
    { symbol: "y", name: "Høyde", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Friksjonsfritt system, snordrag som gjør null arbeid (f.eks vertikalt mot sirkelbane), glatt skli.",
  whenNotToUse: "Hvis friksjon eller andre ikke-konservative krefter virker.",
};

export const EbevaringFull: FormulaMeta = {
  conceptExplanation:
    "Med ikke-konservative krefter (friksjon, snordrag, etc.) må arbeidet deres tas med. Friksjonsarbeid er alltid negativt.",
  variables: [
    { symbol: "W_\\text{andre}", name: "Arbeid fra ikke-konservative krefter", unit: "J", unitName: "joule" },
    { symbol: "E_k", name: "Kinetisk energi", unit: "J", unitName: "joule" },
    { symbol: "E_p", name: "Potensiell energi", unit: "J", unitName: "joule" },
    { symbol: "y", name: "Høyde", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Alltid når friksjon eller andre ytre krefter er til stede.",
  commonMistakes: [
    "Glemme at W_friksjon er negativ",
    "Bruke E-bevaring uten å inkludere ikke-konservativt arbeid",
  ],
};

export const vSqrt2gh: FormulaMeta = {
  conceptExplanation:
    "Snarvei: gitt at et legeme slippes fra ro og faller fritt til en høyde h lavere, blir farten v = √(2gh). Utledet direkte fra energibevaring.",
  variables: [
    { symbol: "v", name: "Fart etter fall", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81" },
    { symbol: "h", name: "Fallhøyde", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Når v₁ = 0 (legemet slippes) og ingen friksjon.",
  whenNotToUse: "IKKE hvis v₁ ≠ 0 eller friksjon virker.",
};

export const impulsMom: FormulaMeta = {
  conceptExplanation:
    "Kraftimpuls = kraft × tid. Endring i bevegelsesmengde = kraftimpuls. Utrolig kraftig for korte støt hvor krefter er store og vanskelige å kjenne detaljert.",
  variables: [
    { symbol: "\\vec{J}", name: "Kraftimpuls", unit: "N·s", unitName: "= kg·m/s" },
    { symbol: "\\vec{F}", name: "(Gjennomsnittlig) kraft", unit: "N", unitName: "newton" },
    { symbol: "\\Delta t", name: "Kontakttid", unit: "s", unitName: "sekund" },
    { symbol: "\\Delta \\vec{p}", name: "Endring i bevegelsesmengde", unit: "kg·m/s", unitName: "kilogram-meter per sekund" },
  ],
  whenToUse: "Kollisjoner, støt, kraftige impulser.",
};

export const avgFraImpuls: FormulaMeta = {
  conceptExplanation:
    "Gjennomsnittlig kraft under et støt = endring i bevegelsesmengde delt på kontakttid. Forklarer hvorfor kollisjonsputer og fjæring reduserer kraften.",
  variables: [
    { symbol: "\\bar{F}", name: "Gjennomsnittlig kraft", unit: "N", unitName: "newton" },
    { symbol: "\\Delta p", name: "Endring i bevegelsesmengde", unit: "kg·m/s", unitName: "kilogram-meter per sekund" },
    { symbol: "\\Delta t", name: "Kontakttid", unit: "s", unitName: "sekund" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
  ],
  whenToUse: "Når du har Δp og Δt (eller m, v₁, v₂ og Δt) — beregn den typiske kraften.",
};

export const inelastisk: FormulaMeta = {
  conceptExplanation:
    "Ved FULLSTENDIG inelastisk kollisjon sitter de to legemene sammen etter. Bevegelsesmengde bevares — kinetisk energi gjør ikke.",
  variables: [
    { symbol: "v_2", name: "Felles hastighet etter", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "m_A, m_B", name: "Massene", unit: "kg", unitName: "kilogram" },
    { symbol: "v_{A1}, v_{B1}", name: "Starthastigheter", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Plastisk kollisjon: objektene henger fast etter støtet.",
};

export const ballistiskPendel: FormulaMeta = {
  conceptExplanation:
    "To-stegs oppgave: (1) Kollisjon — bruk p-bevaring til å finne farten rett etter. (2) Etter kollisjonen — energibevaring for å finne høyden kloss+kule svinger opp.",
  variables: [
    { symbol: "v_0", name: "Starthastighet på kulen", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "m", name: "Kulemasse", unit: "kg", unitName: "kilogram" },
    { symbol: "M", name: "Klossens masse", unit: "kg", unitName: "kilogram" },
    { symbol: "h", name: "Svingehøyde etter støt", unit: "m", unitName: "meter" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81" },
  ],
  whenToUse: "Klassisk ballistisk pendel — kule treffer kloss i tau og svinger opp.",
  whenNotToUse: "Ikke prøv å bruke energibevaring gjennom selve kollisjonen — E_k er IKKE bevart der.",
};

export const N2LSystem: FormulaMeta = {
  conceptExplanation:
    "Uansett hvor komplisert et system er, følger massesenteret Newtons 2. lov med total masse og summen av YTRE krefter. Indre krefter kansellerer.",
  variables: [
    { symbol: "\\vec{F}_\\text{ytre}", name: "Ytre krefter på systemet", unit: "N", unitName: "newton" },
    { symbol: "M", name: "Total masse", unit: "kg", unitName: "kilogram" },
    { symbol: "\\vec{a}_{cm}", name: "Massesenterets akselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
  ],
  whenToUse: "Eksploderende / sammensatte objekter — massesenteret fortsetter udeformert bane.",
};

export const bevegelsesmengde: FormulaMeta = {
  conceptExplanation:
    "Bevegelsesmengde p er produktet av masse og hastighet — en vektor. Kraftimpuls J er integralet av kraft over tid og er lik endringen i bevegelsesmengde.",
  variables: [
    { symbol: "\\vec{p}", name: "Bevegelsesmengde", unit: "kg·m/s", unitName: "kilogram-meter per sekund" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "\\vec{v}", name: "Hastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\vec{J}", name: "Kraftimpuls", unit: "N·s", unitName: "newton-sekund = kg·m/s" },
    { symbol: "\\vec{F}_\\text{gj}", name: "Gjennomsnittskraft", unit: "N", unitName: "newton" },
    { symbol: "\\Delta t", name: "Tidsintervall", unit: "s", unitName: "sekund" },
  ],
  whenToUse:
    "Ved kollisjoner, støt, og korte kraftutvekslinger — spesielt når du ikke kjenner kraftens detaljer men kun det tidsmessige integralet.",
  commonMistakes: [
    "Bruke fart i stedet for hastighet (vektor!) — da mister du retningsinformasjonen",
  ],
};

export const bevaringP: FormulaMeta = {
  conceptExplanation:
    "Når summen av ytre krefter er null (eller forsvinnende liten på tidsskalaen), er total bevegelsesmengde bevart. Gjelder også komponentvis.",
  variables: [
    { symbol: "\\vec{p}_\\text{tot}", name: "Total bevegelsesmengde i systemet", unit: "kg·m/s", unitName: "kilogram-meter per sekund" },
    { symbol: "\\vec{F}_\\text{ext}", name: "Ytre kraft på systemet", unit: "N", unitName: "newton" },
  ],
  whenToUse:
    "Alltid i kollisjoner, eksplosjoner, tilbakeslag og alle situasjoner hvor indre krefter dominerer på korte tidsskalaer.",
  whenNotToUse: "Ikke bruk hvis vesentlige ytre krefter virker over tidsintervallet (f.eks tyngdekraft ved langvarige prosesser).",
  commonMistakes: [
    "Anta at bevegelsesmengde er bevart mens et legeme er i luften lenge — da er tyngdekraften en ytre kraft",
  ],
};

export const elastisk: FormulaMeta = {
  conceptExplanation:
    "I et perfekt elastisk 1D-støt er BÅDE bevegelsesmengde og kinetisk energi bevart. Dette gir fasit-formler for slutthastighetene.",
  variables: [
    { symbol: "v_1', v_2'", name: "Hastigheter etter støtet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "v_1, v_2", name: "Hastigheter før støtet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "m_1, m_2", name: "Massene", unit: "kg", unitName: "kilogram" },
  ],
  whenToUse: "Elastiske støt i 1D — f.eks biljardkuler, atomiske kollisjoner.",
  whenNotToUse: "Ikke bruk hvis støtet er uelastisk (E_k ikke bevart).",
  commonMistakes: ["Blande opp massene — vær nøye med indeksene"],
};

export const uelastisk: FormulaMeta = {
  conceptExplanation:
    "Ved fullkomment uelastisk støt henger legemene sammen etter støtet. Bevegelsesmengde er bevart, men kinetisk energi gjør ikke det — noe går tapt til varme/deformasjon.",
  variables: [
    { symbol: "v_f", name: "Felles hastighet etter støt", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "m_1, m_2", name: "Massene", unit: "kg", unitName: "kilogram" },
    { symbol: "v_1, v_2", name: "Starthastigheter", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Når legemene sitter sammen etter støtet (plast som klebes, bil som kiler seg).",
  commonMistakes: ["Prøve å bruke energibevaring — E_k er IKKE bevart"],
};

export const massesenter: FormulaMeta = {
  conceptExplanation:
    "Massesenteret er den \"gjennomsnittlige\" posisjonen vektet med masse. Systemets totale bevegelsesmengde = M·v_CM.",
  variables: [
    { symbol: "\\vec{r}_{CM}", name: "Massesenterets posisjon", unit: "m", unitName: "meter" },
    { symbol: "\\vec{v}_{CM}", name: "Massesenterets hastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "m_i", name: "Masse av parti i", unit: "kg", unitName: "kilogram" },
    { symbol: "M_\\text{tot}", name: "Total masse", unit: "kg", unitName: "kilogram" },
  ],
  whenToUse: "Når du analyserer sammensatte systemer eller eksploderende objekter — massesenteret bevarer jevn bevegelse selv når delene flyr fra hverandre.",
};

// ═══════════════════════════════════════════════════════════════
// ROTASJON — Kap 9–10
// ═══════════════════════════════════════════════════════════════

export const rotKin: FormulaMeta = {
  conceptExplanation:
    "Rotasjonskinematikk er fullstendig analog med rettlinjet kinematikk: ω ↔ v, α ↔ a, θ ↔ x. Formlene har samme struktur.",
  variables: [
    { symbol: "\\omega", name: "Vinkelhastighet", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "\\omega_0", name: "Start vinkelhastighet", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "\\alpha", name: "Vinkelakselerasjon (konstant)", unit: "rad/s²", unitName: "radianer per sekund kvadrat" },
    { symbol: "\\theta", name: "Vinkelposisjon", unit: "rad", unitName: "radianer" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Når α er konstant og du ønsker å finne vinkelhastighet eller vinkelposisjon.",
  whenNotToUse: "Krever KONSTANT vinkelakselerasjon.",
  commonMistakes: [
    "Bruke grader i stedet for radianer — formlene krever rad",
  ],
};

export const linVinkel: FormulaMeta = {
  conceptExplanation:
    "Punkter på en roterende kropp: lineær fart v = rω, tangentiell akselerasjon a_tan = rα, radiell akselerasjon a_rad = rω² (peker innover).",
  variables: [
    { symbol: "v", name: "Lineær fart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "a_\\text{tan}", name: "Tangentiell akselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "a_\\text{rad}", name: "Radiell akselerasjon", unit: "m/s²", unitName: "meter per sekund kvadrat" },
    { symbol: "r", name: "Avstand fra rotasjonsaksen", unit: "m", unitName: "meter" },
    { symbol: "\\omega", name: "Vinkelhastighet", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "\\alpha", name: "Vinkelakselerasjon", unit: "rad/s²", unitName: "radianer per sekund kvadrat" },
  ],
  whenToUse: "Når du skal koble punktets linære bevegelse til legemets rotasjon.",
  commonMistakes: [
    "Bruke ω i grader per sekund — konverter til rad/s først",
  ],
};

export const treghetsmoment: FormulaMeta = {
  conceptExplanation:
    "Treghetsmoment måler motstand mot vinkelakselerasjon — rotasjonens analogi til masse. Masse langt fra aksen teller mer (r² vekt).",
  variables: [
    { symbol: "I", name: "Treghetsmoment", unit: "kg·m²", unitName: "kilogram-meter kvadrat" },
    { symbol: "m_i", name: "Masse av parti i", unit: "kg", unitName: "kilogram" },
    { symbol: "r_i", name: "Avstand fra rotasjonsakse", unit: "m", unitName: "meter" },
    { symbol: "I_P", name: "I om parallell akse", unit: "kg·m²", unitName: "kilogram-meter kvadrat" },
    { symbol: "I_{CM}", name: "I om massesenter-aksen", unit: "kg·m²", unitName: "kilogram-meter kvadrat" },
    { symbol: "d", name: "Avstand mellom aksene", unit: "m", unitName: "meter" },
  ],
  whenToUse: "For diskret partikkelfordeling brukes sum. For kontinuerlig bruk I = ∫r²dm. Parallellakseteoremet gir I om en parallell akse utenfor massesenteret.",
  commonMistakes: [
    "Glemme å bruke parallellakseteoremet når aksen IKKE går gjennom massesenteret",
  ],
};

export const tableauI: FormulaMeta = {
  conceptExplanation:
    "Standard treghetsmoment for vanlige former om en akse gjennom massesenteret. Må læres utenat.",
  variables: [
    { symbol: "M", name: "Total masse", unit: "kg", unitName: "kilogram" },
    { symbol: "R", name: "Radius", unit: "m", unitName: "meter" },
    { symbol: "L", name: "Lengde", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Slå opp I når du kjenner geometrien.",
  commonMistakes: [
    "Bruke I for ring når det er disk",
    "Bruke I om ende-akse når oppgaven sier senter-akse",
  ],
};

export const tau: FormulaMeta = {
  conceptExplanation:
    "Kraftmoment = kraft × vinkelrett arm. Det er rotasjonens analogi til kraft. Σ τ = I·α er Newtons 2. lov for rotasjon.",
  variables: [
    { symbol: "\\tau", name: "Kraftmoment", unit: "N·m", unitName: "newton-meter" },
    { symbol: "r", name: "Avstand fra akse til kraftens angrepspunkt", unit: "m", unitName: "meter" },
    { symbol: "F", name: "Kraft", unit: "N", unitName: "newton" },
    { symbol: "\\phi", name: "Vinkel mellom r og F", unit: "°", unitName: "grader" },
    { symbol: "I", name: "Treghetsmoment", unit: "kg·m²", unitName: "kilogram-meter kvadrat" },
    { symbol: "\\alpha", name: "Vinkelakselerasjon", unit: "rad/s²", unitName: "radianer per sekund kvadrat" },
  ],
  whenToUse: "Når legemet roterer — alltid velg akse først, deretter summer kraftmoment om den aksen.",
  commonMistakes: [
    "Bruke kraftens fulle verdi selv når den virker skrått — bare den vinkelrette komponenten teller",
    "Bruke feil akse — velg riktig akse for å eliminere ukjente krefter",
  ],
};

export const Krot: FormulaMeta = {
  conceptExplanation:
    "Rotasjonsenergi E_{k,rot} = ½Iω² er den kinetiske energien i selve rotasjonen. Et rullende objekt har BÅDE translasjons- og rotasjonsenergi.",
  variables: [
    { symbol: "E_{k,\\text{rot}}", name: "Rotasjonell kinetisk energi", unit: "J", unitName: "joule" },
    { symbol: "I", name: "Treghetsmoment", unit: "kg·m²", unitName: "kilogram-meter kvadrat" },
    { symbol: "\\omega", name: "Vinkelhastighet", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "W", name: "Rotasjonsarbeid", unit: "J", unitName: "joule" },
    { symbol: "P", name: "Rotasjonseffekt", unit: "W", unitName: "watt" },
  ],
  whenToUse: "I energibevaring når rotasjon er involvert.",
  commonMistakes: ["Glemme rotasjonsenergien når legemet ruller"],
};

export const rulling: FormulaMeta = {
  conceptExplanation:
    "Ved ren rulling uten glidning er v_CM = Rω. Total kinetisk energi er summen av translasjonell (½mv²) og rotasjonell (½Iω²).",
  variables: [
    { symbol: "v_{CM}", name: "Massesenterfart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "R", name: "Radius", unit: "m", unitName: "meter" },
    { symbol: "\\omega", name: "Vinkelhastighet", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "E_{k,\\text{tot}}", name: "Total kinetisk energi", unit: "J", unitName: "joule" },
    { symbol: "I", name: "Treghetsmoment om CM", unit: "kg·m²", unitName: "kilogram-meter kvadrat" },
  ],
  whenToUse: "Kule eller sylinder som ruller uten å slure.",
  whenNotToUse: "Ikke bruk v_CM = Rω hvis legemet slurer (f.eks på vått gress).",
};

export const L: FormulaMeta = {
  conceptExplanation:
    "Angulært moment L er rotasjonens analogi til bevegelsesmengde. Bevart når netto kraftmoment er null — derfor spinner pirouetten raskere når armene trekkes inn (I minker, ω øker).",
  variables: [
    { symbol: "L", name: "Angulært moment", unit: "kg·m²/s", unitName: "kilogram-meter kvadrat per sekund" },
    { symbol: "I", name: "Treghetsmoment", unit: "kg·m²", unitName: "kilogram-meter kvadrat" },
    { symbol: "\\omega", name: "Vinkelhastighet", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "\\tau", name: "Kraftmoment", unit: "N·m", unitName: "newton-meter" },
  ],
  whenToUse: "Ved spin-up/spin-down, pirouetter, planetenes bevegelse, sammensmeltende roterende systemer.",
  whenNotToUse: "Ikke bruk bevaring hvis ytre kraftmoment virker.",
};

// ═══════════════════════════════════════════════════════════════
// ELEKTROSTATIKK — Kap 21, 23, 24
// ═══════════════════════════════════════════════════════════════

export const coulomb: FormulaMeta = {
  conceptExplanation:
    "Coulombs lov: to punktladninger utøver krefter proporsjonalt med produktet av ladningene og omvendt proporsjonalt med kvadratet av avstanden. Retning: langs linjen mellom dem.",
  variables: [
    { symbol: "F", name: "Elektrisk kraft mellom ladningene", unit: "N", unitName: "newton" },
    { symbol: "q_1, q_2", name: "Ladningene", unit: "C", unitName: "coulomb" },
    { symbol: "r", name: "Avstand mellom ladningene", unit: "m", unitName: "meter" },
    { symbol: "k", name: "Coulombs konstant", unit: "N·m²/C²", unitName: "≈ 8{,}99·10⁹" },
    { symbol: "\\varepsilon_0", name: "Vakuumpermittivitet", unit: "F/m", unitName: "8{,}854·10⁻¹² F/m" },
  ],
  whenToUse: "Kraft mellom punktladninger eller sfærisk symmetriske ladninger (da måles r fra senter).",
  whenNotToUse:
    "Ikke direkte anvendelig for utstrakte ladningsfordelinger uten integrasjon eller Gauss' lov.",
  alternativForms: [
    { label: "Med vektorretning", latex: "\\vec{F}_{12} = k\\frac{q_1 q_2}{r^2}\\hat{r}_{12}" },
  ],
  commonMistakes: [
    "Bruke tegn på ladningene mekanisk og glemme at retning må bestemmes separat",
    "Glemme at like ladninger frastøter, motsatte tiltrekker",
  ],
};

export const eField: FormulaMeta = {
  conceptExplanation:
    "Elektrisk felt = kraft per enhet prøveladning. Det er en egenskap ved rommet skapt av andre ladninger. En positiv ladning føler kraft i feltets retning.",
  variables: [
    { symbol: "\\vec{E}", name: "Elektrisk feltstyrke", unit: "N/C", unitName: "eller V/m" },
    { symbol: "\\vec{F}", name: "Kraft på prøveladning", unit: "N", unitName: "newton" },
    { symbol: "q_0", name: "Prøveladning (liten og positiv)", unit: "C", unitName: "coulomb" },
    { symbol: "q", name: "Kildeladning", unit: "C", unitName: "coulomb" },
    { symbol: "r", name: "Avstand fra kildeladning", unit: "m", unitName: "meter" },
    { symbol: "k", name: "Coulombs konstant", unit: "N·m²/C²", unitName: "≈ 8{,}99·10⁹" },
  ],
  whenToUse: "Felt fra punktladninger: superposisjon (legg sammen vektorer). Felt fra kontinuerlige fordelinger: integrasjon eller Gauss.",
  commonMistakes: [
    "Legge sammen E-felter som SKALARER — de er VEKTORER",
    "Glemme at E peker BORT fra positive ladninger og MOT negative",
  ],
};

export const eLinje: FormulaMeta = {
  conceptExplanation:
    "Uendelig lang ladet linje: feltet faller av som 1/r (ikke 1/r²). Rettes radielt ut fra linjen.",
  variables: [
    { symbol: "E", name: "Feltstyrke ved avstand r", unit: "N/C", unitName: "newton per coulomb" },
    { symbol: "\\lambda", name: "Linjeladningstetthet", unit: "C/m", unitName: "coulomb per meter" },
    { symbol: "r", name: "Avstand fra linjen", unit: "m", unitName: "meter" },
    { symbol: "\\varepsilon_0", name: "Vakuumpermittivitet", unit: "F/m", unitName: "8{,}854·10⁻¹²" },
  ],
  whenToUse: "Lang rett ladet linje eller tråd, når du er langt unna endene.",
  whenNotToUse: "Ikke bruk hvis du er nær endene — endeeffekter må medregnes.",
};

export const ePlan: FormulaMeta = {
  conceptExplanation:
    "Uendelig plan: feltet er KONSTANT — uavhengig av avstand. For en kondensatorplate (bare én side) er E = σ/(2ε₀); mellom to plater blir E = σ/ε₀.",
  variables: [
    { symbol: "E", name: "Feltstyrke", unit: "N/C", unitName: "newton per coulomb" },
    { symbol: "\\sigma", name: "Flateladningstetthet", unit: "C/m²", unitName: "coulomb per kvadratmeter" },
    { symbol: "\\varepsilon_0", name: "Vakuumpermittivitet", unit: "F/m", unitName: "8{,}854·10⁻¹²" },
  ],
  whenToUse: "Stor flat ladet plate, eller mellom to parallelle ladninger — spesielt i platekondensator.",
  commonMistakes: [
    "Blande formel for ÉN plate vs TO plater (mellom platene dobles feltet)",
  ],
};

export const eKule: FormulaMeta = {
  conceptExplanation:
    "Ladet kuleflate eller jevnt ladet kule — UTENFOR (r > R) oppfører den seg nøyaktig som en punktladning i sentrum. INNSIDE kuleflaten er E = 0 (kulskall-teoremet).",
  variables: [
    { symbol: "E", name: "Feltstyrke utenfor kulen", unit: "N/C", unitName: "newton per coulomb" },
    { symbol: "Q", name: "Total ladning", unit: "C", unitName: "coulomb" },
    { symbol: "r", name: "Avstand fra senter (r > R)", unit: "m", unitName: "meter" },
    { symbol: "\\varepsilon_0", name: "Vakuumpermittivitet", unit: "F/m", unitName: "8{,}854·10⁻¹²" },
  ],
  whenToUse: "Utenfor en kuleflate eller en jevnt ladet kule.",
  whenNotToUse: "Ikke bruk for punkter INNSIDE kuleflaten — der er E = 0. For jevn volumladning inne i kulen må E = (kQr/R³).",
};

export const V: FormulaMeta = {
  conceptExplanation:
    "Elektrisk potensial V = potensiell energi per ladning. Viktig fordi det er en SKALAR — du kan summere potensialer uten å bekymre deg om retning. Arbeidet feltet gjør på en ladning q fra a til b: W_elfelt = q(V_a − V_b) = −ΔE_p. Arbeidet en YTRE kraft må gjøre for å flytte den samme veien: W_ytre = ΔE_p = q(V_b − V_a) = qΔV.",
  variables: [
    { symbol: "V", name: "Elektrisk potensial", unit: "V", unitName: "volt (1 V = 1 J/C)" },
    { symbol: "q", name: "Kildeladning", unit: "C", unitName: "coulomb" },
    { symbol: "r", name: "Avstand fra kildeladning", unit: "m", unitName: "meter" },
    { symbol: "W_\\text{elfelt}", name: "Arbeid av elektrisk felt", unit: "J", unitName: "joule" },
    { symbol: "W_\\text{ytre}", name: "Arbeid av ytre kraft", unit: "J", unitName: "joule" },
    { symbol: "q_0", name: "Flyttet ladning", unit: "C", unitName: "coulomb" },
  ],
  whenToUse:
    "Når du vil regne arbeid/energi i elektriske felt — ofte enklere enn å regne kraft-og-avstand.",
  alternativForms: [
    { label: "Arbeid gjort AV feltet", latex: "W_\\text{elfelt} = -\\Delta E_p = q(V_a - V_b)" },
    { label: "Arbeid gjort av YTRE kraft", latex: "W_\\text{ytre} = \\Delta E_p = q(V_b - V_a) = q\\,\\Delta V" },
    { label: "Felt fra potensial", latex: "\\vec{E} = -\\nabla V" },
  ],
  commonMistakes: [
    "Summere potensialer som vektorer — V er en SKALAR",
    "Blande tegnkonvensjonen: W_elfelt = q(V_a − V_b), men W_ytre = q(V_b − V_a) = qΔV",
  ],
};

export const Uladninger: FormulaMeta = {
  conceptExplanation:
    "Potensiell energi mellom to punktladninger. Positiv E_p = frastøtning (like ladninger), negativ E_p = tiltrekning (motsatte).",
  variables: [
    { symbol: "E_p", name: "Potensiell energi", unit: "J", unitName: "joule" },
    { symbol: "q_1, q_2", name: "Ladningene", unit: "C", unitName: "coulomb" },
    { symbol: "r", name: "Avstand mellom ladningene", unit: "m", unitName: "meter" },
    { symbol: "k", name: "Coulombs konstant", unit: "N·m²/C²", unitName: "≈ 8{,}99·10⁹" },
  ],
  whenToUse: "Ved energibevaring med ladninger. E_p → 0 når r → ∞.",
  commonMistakes: ["Glemme fortegn på ladningene"],
};

export const C: FormulaMeta = {
  conceptExplanation:
    "Kapasitans = ladning per potensialforskjell — hvor mye ladning et system kan lagre per volt. For platekondensator øker C med areal og synker med avstand.",
  variables: [
    { symbol: "C", name: "Kapasitans", unit: "F", unitName: "farad (1 F = 1 C/V)" },
    { symbol: "Q", name: "Ladning på platene", unit: "C", unitName: "coulomb" },
    { symbol: "V_{ab}", name: "Potensialforskjell", unit: "V", unitName: "volt" },
    { symbol: "A", name: "Plateareal", unit: "m²", unitName: "kvadratmeter" },
    { symbol: "d", name: "Avstand mellom platene", unit: "m", unitName: "meter" },
    { symbol: "E_p", name: "Lagret energi", unit: "J", unitName: "joule" },
    { symbol: "\\varepsilon_0", name: "Vakuumpermittivitet", unit: "F/m", unitName: "8{,}854·10⁻¹²" },
  ],
  whenToUse: "Platekondensatorer, energilagring, RC-kretser.",
  alternativForms: [
    { label: "Energi via Q", latex: "E_p = \\frac{Q^2}{2C}" },
    { label: "Energi via V", latex: "E_p = \\tfrac{1}{2}CV^2" },
    { label: "Energi via Q og V", latex: "E_p = \\tfrac{1}{2}QV" },
  ],
  commonMistakes: [
    "Bruke C = ε₀A/d uten å sjekke om dielektrikum fyller hullet",
  ],
};

export const koblingC: FormulaMeta = {
  conceptExplanation:
    "Parallelle kondensatorer: samme V over hver → kapasitansene legges sammen. Serie: samme Q gjennom hver → invers av summen av inverser.",
  variables: [
    { symbol: "C_\\text{tot}", name: "Ekvivalent kapasitans", unit: "F", unitName: "farad" },
    { symbol: "C_1, C_2, \\ldots", name: "Individuelle kapasitanser", unit: "F", unitName: "farad" },
  ],
  whenToUse: "Forenkle nettverk av kondensatorer.",
  commonMistakes: [
    "Forveksle serie/parallell — motsatt av resistorer: Parallell C adderer, serie C gir lavere",
  ],
};

export const dielektrikum: FormulaMeta = {
  conceptExplanation:
    "Et dielektrikum er et isolerende materiale som polariseres i et E-felt. Det REDUSERER feltet internt med faktor K, og dermed øker kapasitansen med samme faktor.",
  variables: [
    { symbol: "C", name: "Kapasitans med dielektrikum", unit: "F", unitName: "farad" },
    { symbol: "C_0", name: "Kapasitans uten dielektrikum", unit: "F", unitName: "farad" },
    { symbol: "K", name: "Dielektrisk konstant", unit: "—", unitName: "dimensjonsløs, ≥ 1" },
    { symbol: "\\varepsilon", name: "Permittivitet", unit: "F/m", unitName: "farad per meter" },
    { symbol: "\\varepsilon_0", name: "Vakuumpermittivitet", unit: "F/m", unitName: "8{,}854·10⁻¹²" },
  ],
  whenToUse: "Når kondensatoren fylles med et materiale (papir, glass, olje, keramikk).",
};

// ═══════════════════════════════════════════════════════════════
// MAGNETISME — Kap 27–28
// ═══════════════════════════════════════════════════════════════

export const FqvB: FormulaMeta = {
  conceptExplanation:
    "Magnetisk kraft på en ladning er VINKELRETT på både v og B — bruk høyrehåndsregelen. Kraft er null hvis v ‖ B og maks hvis v ⊥ B.",
  variables: [
    { symbol: "\\vec{F}", name: "Magnetisk kraft", unit: "N", unitName: "newton" },
    { symbol: "q", name: "Ladning", unit: "C", unitName: "coulomb" },
    { symbol: "\\vec{v}", name: "Hastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\vec{B}", name: "Magnetisk flukstetthet", unit: "T", unitName: "tesla (1 T = 1 N·s/(C·m))" },
    { symbol: "\\phi", name: "Vinkel mellom v og B", unit: "°", unitName: "grader" },
  ],
  whenToUse: "Partikkel med ladning i et magnetfelt — f.eks elektron i katodestråleror, partikler i akselerator.",
  whenNotToUse: "Ikke bruk for stasjonære ladninger (v = 0 ⇒ F = 0) — da er det kun elektrisk kraft.",
  commonMistakes: [
    "Glemme høyrehåndsregelen — tegn og retning kan bli feil",
    "Glemme negativ ladning — elektron-kraftretning er motsatt av høyrehånds-høyrehånden",
  ],
};

export const rSirkelB: FormulaMeta = {
  conceptExplanation:
    "En ladet partikkel som beveger seg vinkelrett på B følger en sirkelbane. Radiusen avhenger av momentum/ladning; omløpstiden er UAVHENGIG av farten.",
  variables: [
    { symbol: "r", name: "Sirkelradius", unit: "m", unitName: "meter" },
    { symbol: "m", name: "Partikkelmasse", unit: "kg", unitName: "kilogram" },
    { symbol: "v", name: "Partikkelhastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "q", name: "Ladning", unit: "C", unitName: "coulomb" },
    { symbol: "B", name: "Magnetisk flukstetthet", unit: "T", unitName: "tesla" },
    { symbol: "T", name: "Omløpstid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Syklotron, massespektrometer, ladet partikkel i uniformt B-felt.",
  whenNotToUse: "Ikke hvis v ikke er vinkelrett på B — da blir banen en heliks.",
};

export const FlB: FormulaMeta = {
  conceptExplanation:
    "En strømførende leder i et magnetfelt føler kraft — prinsippet bak elektriske motorer.",
  variables: [
    { symbol: "\\vec{F}", name: "Kraft på lederen", unit: "N", unitName: "newton" },
    { symbol: "I", name: "Strømstyrke", unit: "A", unitName: "ampere" },
    { symbol: "\\vec{l}", name: "Lederens lengde i strømretningen", unit: "m", unitName: "meter" },
    { symbol: "\\vec{B}", name: "Magnetisk flukstetthet", unit: "T", unitName: "tesla" },
    { symbol: "\\phi", name: "Vinkel mellom l og B", unit: "°", unitName: "grader" },
  ],
  whenToUse: "Motorer, luftspolers kraft, strømførende ledning i felt.",
};

export const biotSavart: FormulaMeta = {
  conceptExplanation:
    "Biot-Savarts lov gir B-feltet som skapes av et lite stykke strømførende leder. Integreres opp langs lederen for total B.",
  variables: [
    { symbol: "dB", name: "B-feltbidrag fra lite segment", unit: "T", unitName: "tesla" },
    { symbol: "\\mu_0", name: "Vakuumpermeabilitet", unit: "T·m/A", unitName: "4π·10⁻⁷" },
    { symbol: "I", name: "Strømstyrke", unit: "A", unitName: "ampere" },
    { symbol: "dl", name: "Lite segment av lederen", unit: "m", unitName: "meter" },
    { symbol: "\\phi", name: "Vinkel mellom dl og avstandsvektor", unit: "°", unitName: "grader" },
    { symbol: "r", name: "Avstand fra segment til feltpunkt", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Skreddersydde ledergeometrier hvor du må integrere — f.eks delvis ring, endelig leder.",
  whenNotToUse:
    "Ofte finnes ferdige resultater — for lang rett leder, ring, solenoid. Bruk dem direkte.",
};

export const Bleder: FormulaMeta = {
  conceptExplanation:
    "Lang rett strømførende leder gir sirkulære B-felt-linjer rundt seg. Feltet faller av som 1/r — og retningen følger høyrehåndsregelen (tommel = I).",
  variables: [
    { symbol: "B", name: "Feltstyrke", unit: "T", unitName: "tesla" },
    { symbol: "\\mu_0", name: "Vakuumpermeabilitet", unit: "T·m/A", unitName: "4π·10⁻⁷" },
    { symbol: "I", name: "Strømstyrke", unit: "A", unitName: "ampere" },
    { symbol: "r", name: "Avstand fra lederen", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Lang, rett, strømførende leder (eller tilnærming).",
};

export const Bspole: FormulaMeta = {
  conceptExplanation: "B-feltstyrken i senter av en sirkulær strømsløyfe med N vindinger.",
  variables: [
    { symbol: "B", name: "B-feltstyrke i senter", unit: "T", unitName: "tesla" },
    { symbol: "\\mu_0", name: "Vakuumpermeabilitet", unit: "T·m/A", unitName: "4π·10⁻⁷" },
    { symbol: "I", name: "Strømstyrke", unit: "A", unitName: "ampere" },
    { symbol: "R", name: "Spolens radius", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Sirkulær strømsløyfe med én vinding (multipliser med N for N vindinger).",
};

export const Bsolenoid: FormulaMeta = {
  conceptExplanation:
    "Inne i en lang, tettviklet solenoid er B-feltet UNIFORMT. Avhenger kun av viklingstetthet og strøm.",
  variables: [
    { symbol: "B", name: "B-felt inne i solenoiden", unit: "T", unitName: "tesla" },
    { symbol: "\\mu_0", name: "Vakuumpermeabilitet", unit: "T·m/A", unitName: "4π·10⁻⁷" },
    { symbol: "n", name: "Vindinger per meter", unit: "1/m", unitName: "per meter" },
    { symbol: "I", name: "Strømstyrke", unit: "A", unitName: "ampere" },
  ],
  whenToUse: "Lang solenoid (L ≫ R), feltet tett inntil midten.",
  whenNotToUse: "Ikke gyldig utenfor solenoiden (der er B ≈ 0) eller ved endene.",
};

export const FparallelL: FormulaMeta = {
  conceptExplanation:
    "To parallelle strømførende ledere påvirker hverandre: samme strømretning → tiltrekning. Motsatt strømretning → frastøtning.",
  variables: [
    { symbol: "F/L", name: "Kraft per lengdeenhet", unit: "N/m", unitName: "newton per meter" },
    { symbol: "\\mu_0", name: "Vakuumpermeabilitet", unit: "T·m/A", unitName: "4π·10⁻⁷" },
    { symbol: "I_1, I_2", name: "Strømmene", unit: "A", unitName: "ampere" },
    { symbol: "d", name: "Avstand mellom lederne", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Parallelle ledere eller kabler.",
};

// ═══════════════════════════════════════════════════════════════
// INDUKSJON — Kap 29
// ═══════════════════════════════════════════════════════════════

export const fluks: FormulaMeta = {
  conceptExplanation:
    "Magnetisk fluks måler hvor mye B som går gjennom en flate. Avhenger av feltstyrke, areal og vinkel mellom B og flatens normal.",
  variables: [
    { symbol: "\\Phi_B", name: "Magnetisk fluks", unit: "Wb", unitName: "weber (1 Wb = 1 T·m²)" },
    { symbol: "B", name: "Magnetisk flukstetthet", unit: "T", unitName: "tesla" },
    { symbol: "A", name: "Arealet", unit: "m²", unitName: "kvadratmeter" },
    { symbol: "\\phi", name: "Vinkel mellom B og flatens normal", unit: "°", unitName: "grader" },
  ],
  whenToUse: "Beregning av fluks når B er uniformt over flaten.",
  whenNotToUse: "Hvis B varierer over flaten må du integrere: Φ = ∫B·dA.",
  commonMistakes: [
    "Bruke vinkel mellom B og flaten — det skal være vinkelen mellom B og NORMALEN",
  ],
};

export const faraday: FormulaMeta = {
  conceptExplanation:
    "Faradays induksjonslov: et tidsvarierende magnetisk fluks induserer en spenning. Størrelsen er endringsraten i flux. Minustegnet (Lenz) sier at den induserte strømmen motvirker fluksendringen.",
  variables: [
    { symbol: "\\mathcal{E}", name: "Indusert spenning / EMF", unit: "V", unitName: "volt" },
    { symbol: "\\Phi_B", name: "Magnetisk fluks", unit: "Wb", unitName: "weber" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
    { symbol: "N", name: "Antall viklinger", unit: "—", unitName: "heltall" },
  ],
  whenToUse:
    "Alltid når en krets opplever en endring i fluks — enten fordi B endrer seg, arealet endrer seg, eller orienteringen endrer seg.",
  commonMistakes: [
    "Glemme N for spole med flere vindinger",
    "Glemme Lenz-tegnet når retning på indusert strøm spørres",
  ],
};

export const lenz: FormulaMeta = {
  conceptExplanation:
    "Lenz' lov er et fysisk sterkere utsagn om retningen: naturen \"motsetter seg\" enhver endring. Hvis fluks øker innover, vil indusert strøm forsøke å skape fluks utover.",
  whenToUse: "For å bestemme RETNINGEN på indusert strøm.",
  commonMistakes: [
    "Bland sammen RETNING av B-felt og av indusert strøm — tegn høyrehåndsregel nøye",
  ],
};

export const BLv: FormulaMeta = {
  conceptExplanation:
    "En leder som beveger seg gjennom et magnetfelt får en indusert spenning BLv. Den frie ladningen skubbes langs lederen av magnetisk kraft — som likner batteriets EMF.",
  variables: [
    { symbol: "\\mathcal{E}", name: "Indusert spenning", unit: "V", unitName: "volt" },
    { symbol: "B", name: "B-felt vinkelrett på leder og v", unit: "T", unitName: "tesla" },
    { symbol: "L", name: "Lederens lengde", unit: "m", unitName: "meter" },
    { symbol: "v", name: "Lederens fart vinkelrett på B og L", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Rett leder som skyves gjennom et uniformt B-felt — f.eks. slide-bar-generator.",
};

export const ACgen: FormulaMeta = {
  conceptExplanation:
    "En spole som roterer i et B-felt gir sinusformet spenning — grunnlaget for alle vekselstrømsgeneratorer.",
  variables: [
    { symbol: "\\mathcal{E}(t)", name: "Indusert spenning (tid)", unit: "V", unitName: "volt" },
    { symbol: "N", name: "Antall vindinger", unit: "—", unitName: "heltall" },
    { symbol: "B", name: "B-feltstyrke", unit: "T", unitName: "tesla" },
    { symbol: "A", name: "Spolens tverrsnittareal", unit: "m²", unitName: "kvadratmeter" },
    { symbol: "\\omega", name: "Vinkelfart", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "t", name: "Tid", unit: "s", unitName: "sekund" },
  ],
  whenToUse: "Roterende spole i uniformt B-felt.",
};

// ═══════════════════════════════════════════════════════════════
// EKSTRA KAP 6–10 SUPPLEMENT
// ═══════════════════════════════════════════════════════════════

export const WEteorem: FormulaMeta = {
  conceptExplanation:
    "Arbeid-energi-teoremet: summen av alle arbeid utført på et legeme er lik endringen i kinetisk energi. Et kraftig verktøy som sidesteg tid og akselerasjon.",
  variables: [
    { symbol: "W_\\text{tot}", name: "Netto arbeid på legemet", unit: "J", unitName: "joule" },
    { symbol: "m", name: "Masse", unit: "kg", unitName: "kilogram" },
    { symbol: "v_1, v_2", name: "Fart før og etter", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Finn sluttfart etter at kjente krefter har gjort arbeid, eller finn nødvendig arbeid for å endre farten.",
  whenNotToUse: "Hvis du trenger tidsforløpet, bruk Newton 2 eller impuls.",
  commonMistakes: [
    "Regne arbeid fra bare én kraft — teoremet krever NETTO arbeid fra alle krefter",
  ],
};

export const Lpartikkel: FormulaMeta = {
  conceptExplanation:
    "Angulært moment for en partikkel relativt til et punkt: L = r × mv. Avhenger av hvor du velger referansepunktet.",
  variables: [
    { symbol: "\\vec{L}", name: "Angulært moment", unit: "kg·m²/s", unitName: "kilogram-meter² per sekund" },
    { symbol: "\\vec{r}", name: "Posisjonsvektor fra referansepunkt", unit: "m", unitName: "meter" },
    { symbol: "m", name: "Partikkelmasse", unit: "kg", unitName: "kilogram" },
    { symbol: "\\vec{v}", name: "Hastighet", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Når du betrakter en partikkel — f.eks. planet rundt sol, satellitt.",
  commonMistakes: [
    "Glemme å spesifisere referansepunkt — L avhenger av valg av origo",
  ],
};

export const Lbevaring: FormulaMeta = {
  conceptExplanation:
    "Angulært moment er bevart når summen av ytre kraftmoment er null. Derfor spinner en skøyteløper raskere når armene trekkes inn (I minker ⇒ ω øker).",
  variables: [
    { symbol: "I_1, I_2", name: "Treghetsmoment før/etter", unit: "kg·m²", unitName: "kilogram-meter²" },
    { symbol: "\\omega_1, \\omega_2", name: "Vinkelhastighet før/etter", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "\\tau_\\text{ext}", name: "Ytre kraftmoment", unit: "N·m", unitName: "newton-meter" },
  ],
  whenToUse: "Pirouetter, sammensmeltende disker, kollisjoner med rotasjon uten ytre kraftmoment.",
  whenNotToUse: "Ikke bruk når et eksternt kraftmoment virker — da må τ = dL/dt brukes.",
};

export const rotArbeidEffekt: FormulaMeta = {
  conceptExplanation:
    "Rotasjonsarbeid = kraftmoment × vinkel. Effekt = kraftmoment × vinkelhastighet. Totalt arbeid tilsvarer endring i rotasjonskinetisk energi.",
  variables: [
    { symbol: "W", name: "Arbeid av kraftmoment", unit: "J", unitName: "joule" },
    { symbol: "\\tau", name: "Kraftmoment", unit: "N·m", unitName: "newton-meter" },
    { symbol: "\\Delta\\theta", name: "Rotasjonsvinkel", unit: "rad", unitName: "radianer" },
    { symbol: "P", name: "Effekt", unit: "W", unitName: "watt" },
    { symbol: "\\omega", name: "Vinkelhastighet", unit: "rad/s", unitName: "radianer per sekund" },
  ],
  whenToUse: "Motorer, turbiner, alt som leverer eller tar opp effekt via rotasjon.",
};

export const diskSkraplan: FormulaMeta = {
  conceptExplanation:
    "En massiv disk som ruller uten glidning ned et skråplan får a = (2/3)g·sin β. Bare 2/3 av tyngdeakselerasjonen — resten \"brukes\" til å spinne den opp.",
  variables: [
    { symbol: "a_{CM}", name: "Massesenter-akselerasjon", unit: "m/s²", unitName: "meter per sekund²" },
    { symbol: "g", name: "Tyngdeakselerasjon", unit: "m/s²", unitName: "≈ 9,81" },
    { symbol: "\\beta", name: "Skråplanvinkel", unit: "°", unitName: "grader" },
    { symbol: "\\mu_s", name: "Hvilefriksjonskoeffisient", unit: "—", unitName: "dimensjonsløs" },
  ],
  whenToUse: "Massiv disk/sylinder som ruller ned skråplan uten å slure.",
  whenNotToUse: "Ikke for kule (a = (5/7)g·sin β) eller hul sylinder (a = ½g·sin β) — forskjellig I.",
};

// ═══════════════════════════════════════════════════════════════
// EKSTRA KAP 23 — ELEKTRISK POTENSIAL
// ═══════════════════════════════════════════════════════════════

export const EpUniform: FormulaMeta = {
  conceptExplanation:
    "I et UNIFORMT elektrisk felt er potensiell energi lineær i posisjon: E_p = q₀Ey (y målt mot feltets retning). Direkte analogi til E_p = mgh for tyngdekraft.",
  variables: [
    { symbol: "E_p", name: "Elektrisk potensiell energi", unit: "J", unitName: "joule" },
    { symbol: "q_0", name: "Testladning", unit: "C", unitName: "coulomb" },
    { symbol: "E", name: "Uniform feltstyrke", unit: "V/m", unitName: "volt per meter" },
    { symbol: "y", name: "Avstand i feltets retning", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Mellom platekondensatorplater eller andre steder hvor E er tilnærmet uniformt.",
  whenNotToUse: "Ikke gyldig hvis E varierer over området.",
};

export const Vab: FormulaMeta = {
  conceptExplanation:
    "Potensialforskjellen (spenningen) mellom to punkter er lik negativ endring i potensiell energi per ladning. Det er dette voltmeteret måler.",
  variables: [
    { symbol: "V_{ab}", name: "Spenning fra a til b", unit: "V", unitName: "volt" },
    { symbol: "V_a, V_b", name: "Potensial i punktene", unit: "V", unitName: "volt" },
    { symbol: "\\Delta E_p", name: "Endring i potensiell energi", unit: "J", unitName: "joule" },
    { symbol: "q_0", name: "Ladning", unit: "C", unitName: "coulomb" },
  ],
  whenToUse: "Når du jobber med batterier, kretser eller beregner arbeid for å flytte ladning.",
  commonMistakes: [
    "Forveksle V_ab og V_ba — sjekk rekkefølge og tegn",
  ],
};

export const ElektrostEbev: FormulaMeta = {
  conceptExplanation:
    "Energibevaring for ladet partikkel i elektrisk felt: kinetisk + potensiell energi er konstant. Nøyaktig samme prinsipp som i mekanikk.",
  variables: [
    { symbol: "E_k", name: "Kinetisk energi", unit: "J", unitName: "joule" },
    { symbol: "E_p", name: "Potensiell energi (elektrisk)", unit: "J", unitName: "joule" },
    { symbol: "m", name: "Partikkelmasse", unit: "kg", unitName: "kilogram" },
    { symbol: "v", name: "Fart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "q", name: "Ladning", unit: "C", unitName: "coulomb" },
    { symbol: "V", name: "Elektrisk potensial", unit: "V", unitName: "volt" },
  ],
  whenToUse: "Akselerasjon av ladet partikkel gjennom en potensialforskjell — f.eks. elektron i bilderør.",
  alternativForms: [
    { label: "Med potensial direkte", latex: "\\tfrac{1}{2}mv_1^2 + qV_1 = \\tfrac{1}{2}mv_2^2 + qV_2" },
  ],
};

export const EVd: FormulaMeta = {
  conceptExplanation:
    "Mellom to parallelle plater er feltet uniformt og E = V/d. Nyttig for å regne ut E fra spenning og avstand.",
  variables: [
    { symbol: "E", name: "Feltstyrke mellom plater", unit: "V/m", unitName: "volt per meter" },
    { symbol: "V", name: "Spenning over platene", unit: "V", unitName: "volt" },
    { symbol: "d", name: "Avstand mellom platene", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Platekondensator eller andre tilnærmelser til uniformt felt.",
  whenNotToUse: "Ikke gyldig nær kantene — der krummes feltet.",
};

export const eVoltUnit: FormulaMeta = {
  conceptExplanation:
    "1 elektronvolt = energien en elektron får når den akselereres gjennom 1 V. Praktisk enhet i atom- og partikkelfysikk.",
  variables: [
    { symbol: "\\text{eV}", name: "Elektronvolt", unit: "J", unitName: "≈ 1,602·10⁻¹⁹" },
  ],
  whenToUse: "Når energien til en enkelt ladet partikkel er på atomskala — konverter mellom J og eV.",
};

// ═══════════════════════════════════════════════════════════════
// EKSTRA KAP 24 — KAPASITANS
// ═══════════════════════════════════════════════════════════════

export const energitetthet: FormulaMeta = {
  conceptExplanation:
    "Elektrisk energi lagres faktisk i FELTET — ikke på platene. Energitettheten u = ½ε₀E² gjelder i ethvert elektrisk felt (uten dielektrikum).",
  variables: [
    { symbol: "u", name: "Energitetthet", unit: "J/m³", unitName: "joule per kubikkmeter" },
    { symbol: "E", name: "Feltstyrke", unit: "V/m", unitName: "volt per meter" },
    { symbol: "\\varepsilon_0", name: "Vakuumpermittivitet", unit: "F/m", unitName: "8,854·10⁻¹²" },
  ],
  whenToUse: "For å finne energi distribuert i rommet — integreres over volumet: E_p = ∫u dV.",
  whenNotToUse: "Må byttes ut ε₀ → ε = Kε₀ når dielektrikum er tilstede.",
};

export const indusertQ: FormulaMeta = {
  conceptExplanation:
    "Når et dielektrikum settes inn i en kondensator, induseres en ladning på overflaten som delvis nøytraliserer platene. Dette reduserer feltet og øker kapasitansen.",
  variables: [
    { symbol: "Q_i", name: "Indusert ladning på dielektrikum", unit: "C", unitName: "coulomb" },
    { symbol: "Q", name: "Ladning på platene", unit: "C", unitName: "coulomb" },
    { symbol: "K", name: "Dielektrisk konstant", unit: "—", unitName: "≥ 1" },
  ],
  whenToUse: "Ved oppgaver om dielektriske materialer i kondensatorer.",
};

// ═══════════════════════════════════════════════════════════════
// EKSTRA KAP 27 — MAGNETISK KRAFT
// ═══════════════════════════════════════════════════════════════

export const syklotronfrekvens: FormulaMeta = {
  conceptExplanation:
    "Vinkelfrekvensen for sirkelbevegelse i uniformt B-felt er UAVHENGIG av partikkelens fart og radius — det er dette som gjør syklotronen mulig.",
  variables: [
    { symbol: "\\omega", name: "Syklotron vinkelfrekvens", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "q", name: "Ladning", unit: "C", unitName: "coulomb" },
    { symbol: "B", name: "Feltstyrke", unit: "T", unitName: "tesla" },
    { symbol: "m", name: "Partikkelmasse", unit: "kg", unitName: "kilogram" },
  ],
  whenToUse: "Alle sirkulære baner i uniformt B-felt.",
  alternativForms: [
    { label: "Omløpstid", latex: "T = \\frac{2\\pi m}{|q|B}" },
    { label: "Frekvens", latex: "f = \\frac{|q|B}{2\\pi m}" },
  ],
  commonMistakes: ["Tro at ω avhenger av v eller r — det gjør den ikke!"],
};

export const fartsvelger: FormulaMeta = {
  conceptExplanation:
    "Kombinasjon av E- og B-felt der bare partikler med fart v = E/B går rett gjennom. Brukes i massespektrometre for å velge ut partikler med bestemt fart før separasjon.",
  variables: [
    { symbol: "v", name: "Utvalgt fart", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "E", name: "Elektrisk feltstyrke", unit: "V/m", unitName: "volt per meter" },
    { symbol: "B", name: "Magnetisk feltstyrke", unit: "T", unitName: "tesla" },
  ],
  whenToUse: "Massespektrometer, akseleratorer, velocity selector — kryssede felter i rett vinkel.",
};

export const FlBVektor: FormulaMeta = {
  conceptExplanation:
    "Vektor-formen for kraft på strømførende leder — gir både størrelse og retning. Tommelfingerregelen: I × B peker i kraftretningen.",
  variables: [
    { symbol: "\\vec{F}", name: "Kraft på lederen", unit: "N", unitName: "newton" },
    { symbol: "I", name: "Strømstyrke", unit: "A", unitName: "ampere" },
    { symbol: "\\vec{l}", name: "Lengdevektor (i strømretning)", unit: "m", unitName: "meter" },
    { symbol: "\\vec{B}", name: "Feltvektor", unit: "T", unitName: "tesla" },
  ],
  whenToUse: "Når retningen på kraften er viktig — motorer, krumme ledere.",
};

// ═══════════════════════════════════════════════════════════════
// EKSTRA KAP 28 — B-FELT FRA STRØM
// ═══════════════════════════════════════════════════════════════

export const Bladning: FormulaMeta = {
  conceptExplanation:
    "En ladning i bevegelse lager et magnetfelt. Feltet er vinkelrett på både v og retning til punktet — høyrehåndsregelen.",
  variables: [
    { symbol: "B", name: "B-feltstyrke", unit: "T", unitName: "tesla" },
    { symbol: "\\mu_0", name: "Vakuumpermeabilitet", unit: "T·m/A", unitName: "4π·10⁻⁷" },
    { symbol: "q", name: "Ladning", unit: "C", unitName: "coulomb" },
    { symbol: "v", name: "Hastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\varphi", name: "Vinkel mellom v og r", unit: "°", unitName: "grader" },
    { symbol: "r", name: "Avstand til feltpunkt", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Enkelte punktladninger i bevegelse — sjelden i praksis, grunnlag for Biot-Savart.",
};

// ═══════════════════════════════════════════════════════════════
// EKSTRA KAP 29 — INDUKSJON
// ═══════════════════════════════════════════════════════════════

export const diskDynamo: FormulaMeta = {
  conceptExplanation:
    "En roterende ledende disk i et B-felt gir LIKESTRØMS-EMF på tvers av radien — Faradays diskdynamo fra 1831.",
  variables: [
    { symbol: "\\mathcal{E}", name: "Indusert likespenning", unit: "V", unitName: "volt" },
    { symbol: "\\omega", name: "Vinkelhastighet", unit: "rad/s", unitName: "radianer per sekund" },
    { symbol: "B", name: "B-felt vinkelrett på disken", unit: "T", unitName: "tesla" },
    { symbol: "R", name: "Diskens radius", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Homopolargenerator eller Faradays diskdynamo.",
};

export const effektEMF: FormulaMeta = {
  conceptExplanation:
    "Effekt dissipert i en krets med indusert EMF. For slide-bar: P = B²L²v²/R — arbeidet du gjør for å dra stanga går rett til Ohmsk varme.",
  variables: [
    { symbol: "P", name: "Effekt", unit: "W", unitName: "watt" },
    { symbol: "\\mathcal{E}", name: "EMF", unit: "V", unitName: "volt" },
    { symbol: "R", name: "Motstand i kretsen", unit: "Ω", unitName: "ohm" },
    { symbol: "B", name: "B-felt", unit: "T", unitName: "tesla" },
    { symbol: "L", name: "Lederlengde", unit: "m", unitName: "meter" },
    { symbol: "v", name: "Lederens fart", unit: "m/s", unitName: "meter per sekund" },
  ],
  whenToUse: "Kretser med indusert spenning — spesielt slide-bar og roterende spoler.",
};

export const generellEMF: FormulaMeta = {
  conceptExplanation:
    "Generell formel for bevegelses-EMF: integrer (v × B) · dl langs lederen. Inkluderer alle bøyninger og rotasjoner.",
  variables: [
    { symbol: "\\mathcal{E}", name: "Indusert EMF", unit: "V", unitName: "volt" },
    { symbol: "\\vec{v}", name: "Lederens hastighet", unit: "m/s", unitName: "meter per sekund" },
    { symbol: "\\vec{B}", name: "B-felt", unit: "T", unitName: "tesla" },
    { symbol: "d\\vec{l}", name: "Differensialt lengdeelement", unit: "m", unitName: "meter" },
  ],
  whenToUse: "Komplekse geometrier — bøyde, roterende eller varierende ledere.",
  whenNotToUse: "Overdrev for enkle tilfeller — bruk Faradays lov eller BLv direkte.",
};
