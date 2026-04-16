import type { FormulaMeta } from "./formula-metadata";
import * as M from "./formula-metadata";

export type FormulaTopic =
  | "kinematikk"
  | "krefter"
  | "energi"
  | "bevegelsesmengde"
  | "rotasjon"
  | "elektrostatikk"
  | "magnetisme"
  | "induksjon";

export interface FormulaEntry {
  id: string;
  latex: string;
  title: string;
  variant: "gold" | "blue";
  kapittel: number;
  topic: FormulaTopic;
  description?: string;
  meta?: FormulaMeta;
  alsoIn?: number[];
}

export const formulas: FormulaEntry[] = [
  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 2 — Rettlinjet bevegelse
  // ═══════════════════════════════════════════════════════════════
  { id: "snittfart", latex: "\\bar{v} = \\frac{\\Delta x}{\\Delta t}", title: "Gjennomsnittsfart", variant: "blue", kapittel: 2, topic: "kinematikk", meta: M.snittfart },
  { id: "momentanfart", latex: "v = \\frac{dx}{dt}", title: "Momentanfart", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.momentanfart },
  { id: "snittaksel", latex: "\\bar{a} = \\frac{\\Delta v}{\\Delta t}", title: "Gjennomsnittlig akselerasjon", variant: "blue", kapittel: 2, topic: "kinematikk", meta: M.snittaksel },
  { id: "momentanaksel", latex: "a = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}", title: "Momentanakselerasjon", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.momentanaksel },
  { id: "konstAkselV", latex: "v = v_0 + at", title: "Likning 1 (mangler x)", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.konstAkselV },
  { id: "konstAkselX", latex: "x = x_0 + v_0 t + \\tfrac{1}{2}at^2", title: "Likning 2 (mangler v)", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.konstAkselX },
  { id: "konstAkselV2", latex: "v^2 = v_0^2 + 2a(x - x_0)", title: "Likning 3 (mangler t)", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.konstAkselV2 },
  { id: "konstAkselSnitt", latex: "x - x_0 = \\tfrac{1}{2}(v_0 + v)\\,t", title: "Likning 4 (mangler a)", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.konstAkselSnitt },
  { id: "frittFallV", latex: "v_y = v_{0y} - gt", title: "Fart (fritt fall)", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.frittFall },
  { id: "frittFallY", latex: "y = y_0 + v_{0y}\\,t - \\tfrac{1}{2}g\\,t^2", title: "Posisjon (fritt fall)", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.frittFall },
  { id: "frittFallV2", latex: "v_y^2 = v_{0y}^2 - 2g(y - y_0)", title: "Fart–posisjon (fritt fall)", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.frittFall },
  { id: "gKonstant", latex: "g = 9{,}81\\;\\text{m/s}^2", title: "Tyngdeakselerasjon", variant: "blue", kapittel: 2, topic: "kinematikk" },
  { id: "varAkselV", latex: "v(t) = v_0 + \\int_0^t a(t')\\,dt'", title: "Fart ved integrasjon", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.varAksel },
  { id: "varAkselX", latex: "x(t) = x_0 + \\int_0^t v(t')\\,dt'", title: "Posisjon ved integrasjon", variant: "gold", kapittel: 2, topic: "kinematikk", meta: M.varAksel },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 3 — Bevegelse i 2D og 3D
  // ═══════════════════════════════════════════════════════════════
  { id: "posisjonsVektor", latex: "\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}", title: "Posisjonsvektoren", variant: "blue", kapittel: 3, topic: "kinematikk", meta: M.posisjonsVektor },
  { id: "vektorFart", latex: "\\vec{v} = \\frac{d\\vec{r}}{dt} = v_x\\hat{i} + v_y\\hat{j}", title: "Momentanfart (vektor)", variant: "gold", kapittel: 3, topic: "kinematikk", meta: M.vektorFart },
  { id: "fartsStorrelse", latex: "v = \\sqrt{v_x^2 + v_y^2}", title: "Fartens størrelse", variant: "blue", kapittel: 3, topic: "kinematikk", meta: M.fartsStorrelse },
  { id: "vektorAksel", latex: "\\vec{a} = \\frac{d\\vec{v}}{dt} = a_x\\hat{i} + a_y\\hat{j}", title: "Akselerasjon (vektor)", variant: "gold", kapittel: 3, topic: "kinematikk", meta: M.vektorAksel },
  { id: "skrattKastVx0", latex: "v_{0x} = v_0\\cos\\alpha_0", title: "Horisontal startfart", variant: "gold", kapittel: 3, topic: "kinematikk", meta: M.skrattKastKomp },
  { id: "skrattKastVy0", latex: "v_{0y} = v_0\\sin\\alpha_0", title: "Vertikal startfart", variant: "gold", kapittel: 3, topic: "kinematikk", meta: M.skrattKastKomp },
  { id: "skrattKastX", latex: "x = x_0 + v_{0x}\\,t", title: "Horisontal posisjon (skrått kast)", variant: "gold", kapittel: 3, topic: "kinematikk", meta: M.skrattKastBevegelse },
  { id: "skrattKastY", latex: "y = y_0 + v_{0y}\\,t - \\tfrac{1}{2}g\\,t^2", title: "Vertikal posisjon (skrått kast)", variant: "gold", kapittel: 3, topic: "kinematikk", meta: M.skrattKastBevegelse },
  { id: "skrattKastVx", latex: "v_x = v_{0x}", title: "Horisontal fart (konstant)", variant: "blue", kapittel: 3, topic: "kinematikk", meta: M.skrattKastBevegelse },
  { id: "rekkeviddeR", latex: "R = \\frac{v_0^2 \\sin 2\\alpha_0}{g}", title: "Rekkevidde (fra bakkenivå)", variant: "blue", kapittel: 3, topic: "kinematikk", meta: M.rekkeviddeR },
  { id: "maksHoyde", latex: "h_\\text{maks} = \\frac{v_0^2\\sin^2\\alpha_0}{2g}", title: "Maks høyde i skrått kast", variant: "blue", kapittel: 3, topic: "kinematikk", meta: M.maksHR },
  { id: "sentripetalA", latex: "a_\\text{rad} = \\frac{v^2}{R}", title: "Sentripetaakselerasjon", variant: "gold", kapittel: 3, topic: "kinematikk", meta: M.sirkel },
  { id: "banefart", latex: "v = \\frac{2\\pi R}{T}", title: "Banefart", variant: "gold", kapittel: 3, topic: "kinematikk", meta: M.sirkel },
  { id: "sentripetalT", latex: "a_\\text{rad} = \\frac{4\\pi^2 R}{T^2}", title: "Sentripetal med omløpstid", variant: "blue", kapittel: 3, topic: "kinematikk", meta: M.sentripetalT },
  { id: "baneaksel", latex: "a_\\parallel = \\frac{d|\\vec{v}|}{dt}", title: "Baneakselerasjon (tangentiell)", variant: "blue", kapittel: 3, topic: "kinematikk", meta: M.baneaksel },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 4 — Newtons lover
  // ═══════════════════════════════════════════════════════════════
  { id: "newton1", latex: "\\sum \\vec{F} = 0 \\implies \\vec{v} = \\text{konst.}", title: "Newtons 1. lov", variant: "gold", kapittel: 4, topic: "krefter", description: "Treghetsloven — uten netto kraft beholdes bevegelsen", meta: M.newton1, alsoIn: [5] },
  { id: "newton2", latex: "\\sum \\vec{F} = m\\vec{a}", title: "Newtons 2. lov", variant: "gold", kapittel: 4, topic: "krefter", description: "Den fundamentale likningen i mekanikk", meta: M.newton2, alsoIn: [5] },
  { id: "newton3", latex: "\\vec{F}_{A\\to B} = -\\vec{F}_{B\\to A}", title: "Newtons 3. lov", variant: "gold", kapittel: 4, topic: "krefter", description: "Kraft og motkraft — like store, motsatt rettet, på ulike legemer", meta: M.newton3 },
  { id: "tyngdekraft", latex: "G = mg", title: "Tyngdekraft", variant: "gold", kapittel: 4, topic: "krefter", description: "g = 9,81 m/s² ved havoverflaten", meta: M.tyngdekraft },
  { id: "komponentForm", latex: "\\sum F_x = ma_x, \\quad \\sum F_y = ma_y", title: "Komponentform", variant: "gold", kapittel: 4, topic: "krefter", description: "Slik løser vi oppgavene i praksis", meta: M.komponentForm, alsoIn: [5] },
  { id: "kraftdekomp", latex: "F_x = F\\cos\\theta, \\quad F_y = F\\sin\\theta, \\quad F = \\sqrt{F_x^2 + F_y^2}", title: "Kraftdekomponering", variant: "blue", kapittel: 4, topic: "krefter", description: "Splitt en kraft i komponenter eller finn resultanten.", meta: M.kraftdekomp },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 5 — Anvendelse av Newtons lover
  // ═══════════════════════════════════════════════════════════════
  { id: "glidefriksjon", latex: "f_k = \\mu_k N", title: "Glidefriksjon", variant: "gold", kapittel: 5, topic: "krefter", meta: M.glidefriksjon },
  { id: "hvilefriksjon", latex: "f_s \\leq \\mu_s N", title: "Maks hvilefriksjon", variant: "gold", kapittel: 5, topic: "krefter", meta: M.hvilefriksjon },
  { id: "sirkelARad", latex: "a_\\perp = \\frac{v^2}{R}", title: "Sentripetalakselerasjon (sirkel)", variant: "gold", kapittel: 5, topic: "krefter", meta: M.sirkel },
  { id: "sentripetalkraft", latex: "\\sum F = m\\frac{v^2}{R}", title: "Sentripetalkraft", variant: "gold", kapittel: 5, topic: "krefter", description: "Nettokraften inn mot sentrum", meta: M.sentripetalkraft },
  { id: "skraplanAksel", latex: "a = g\\sin\\alpha", title: "Akselerasjon ned skråplan (uten friksjon)", variant: "blue", kapittel: 5, topic: "krefter", meta: M.skraplanAksel },
  { id: "skraplanFriksjon", latex: "a = g(\\sin\\alpha - \\mu_k\\cos\\alpha)", title: "Skråplan med glidefriksjon (nedover)", variant: "blue", kapittel: 5, topic: "krefter", meta: M.skraplanFriksjon },
  { id: "skraplanNormal", latex: "N = mg\\cos\\alpha", title: "Normalkraft på skråplan", variant: "blue", kapittel: 5, topic: "krefter", meta: M.skraplanNormal },
  { id: "kritiskVinkel", latex: "\\alpha_{\\text{kritisk}} = \\tan^{-1}(\\mu_s)", title: "Kritisk vinkel", variant: "blue", kapittel: 5, topic: "krefter", description: "Vinkelen der legemet begynner å gli", meta: M.kritiskVinkel },
  { id: "atwoodA", latex: "a = \\frac{(m_1 - m_2)g}{m_1 + m_2}", title: "Atwood-maskin — akselerasjon", variant: "blue", kapittel: 5, topic: "krefter", description: "Ideelt tau (masseløst, ustrekbart) over friksjonsfri trinse.", meta: M.atwood },
  { id: "atwoodT", latex: "T = \\frac{2m_1 m_2 g}{m_1 + m_2}", title: "Atwood-maskin — snordrag", variant: "blue", kapittel: 5, topic: "krefter", meta: M.atwood },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 6 — Arbeid og kinetisk energi
  // ═══════════════════════════════════════════════════════════════
  { id: "arbeidKonst", latex: "W = F \\cdot s \\cdot \\cos\\varphi", title: "Arbeid (konstant kraft)", variant: "gold", kapittel: 6, topic: "energi", description: "φ er vinkelen mellom kraft og forflytning.", meta: M.arbeid },
  { id: "arbeidVektor", latex: "W = \\vec{F} \\cdot \\vec{s} = F_x s_x + F_y s_y", title: "Arbeid (vektorform)", variant: "gold", kapittel: 6, topic: "energi", meta: M.arbeid },
  { id: "kinEnergi", latex: "E_k = \\tfrac{1}{2}mv^2", title: "Kinetisk energi", variant: "gold", kapittel: 6, topic: "energi", meta: M.kinEnergi },
  { id: "WEteorem", latex: "W_{\\text{tot}} = \\tfrac{1}{2}mv_2^2 - \\tfrac{1}{2}mv_1^2 = \\Delta E_k", title: "Arbeid-energi-teoremet", variant: "gold", kapittel: 6, topic: "energi", meta: M.WEteorem },
  { id: "arbeidVar", latex: "W = \\int_{x_1}^{x_2} F(x)\\,dx", title: "Arbeid (varierende kraft)", variant: "gold", kapittel: 6, topic: "energi", description: "Areal under F(x)-kurven.", meta: M.arbeidVar },
  { id: "arbeidFjaer", latex: "W_{\\text{fjær}} = \\tfrac{1}{2}kx_2^2 - \\tfrac{1}{2}kx_1^2", title: "Arbeid på fjær", variant: "gold", kapittel: 6, topic: "energi", description: "Fra Hookes lov F = kx.", meta: M.arbeidFjaer },
  { id: "hookes", latex: "F = kx", title: "Hookes lov", variant: "blue", kapittel: 6, topic: "energi", meta: M.hookes },
  { id: "effekt", latex: "P = \\frac{dW}{dt} = \\vec{F} \\cdot \\vec{v}", title: "Effekt", variant: "gold", kapittel: 6, topic: "energi", meta: M.effekt },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 7 — Potensiell energi og energibevaring
  // ═══════════════════════════════════════════════════════════════
  { id: "EPgrav", latex: "E_{p,\\text{grav}} = mgy", title: "Gravitasjonell potensiell energi", variant: "gold", kapittel: 7, topic: "energi", meta: M.EPgrav },
  { id: "EPfjaer", latex: "E_{p,\\text{fjær}} = \\tfrac{1}{2}kx^2", title: "Fjærpotensialenergi", variant: "gold", kapittel: 7, topic: "energi", description: "Hookesk fjær, x målt fra likevektsstilling.", meta: M.potEnergi },
  { id: "Wtyngde", latex: "W_{mg} = mgy_1 - mgy_2 = -\\Delta E_p", title: "Arbeid av tyngden", variant: "gold", kapittel: 7, topic: "energi", meta: M.Wtyngde },
  { id: "EbevaringSimple", latex: "\\tfrac{1}{2}mv_1^2 + mgy_1 = \\tfrac{1}{2}mv_2^2 + mgy_2", title: "Bevaring av mekanisk energi", variant: "gold", kapittel: 7, topic: "energi", meta: M.EbevaringSimple },
  { id: "EbevaringFull", latex: "\\tfrac{1}{2}mv_1^2 + mgy_1 + W_{\\text{andre}} = \\tfrac{1}{2}mv_2^2 + mgy_2", title: "Energibevaring med andre krefter", variant: "gold", kapittel: 7, topic: "energi", description: "W_andre = arbeid fra ikke-konservative krefter (friksjon, snordrag, ...).", meta: M.EbevaringFull },
  { id: "energibevaringKort", latex: "E_k + E_p = \\text{konstant}", title: "Energibevaring (forenklet)", variant: "blue", kapittel: 7, topic: "energi", description: "Gjelder kun når kun konservative krefter gjør arbeid.", meta: M.energibevaring },
  { id: "vSqrt2gh", latex: "v = \\sqrt{2g(y_1 - y_2)}", title: "Fart fra høydefall (start fra ro)", variant: "blue", kapittel: 7, topic: "energi", description: "Snarvei når v₁ = 0 og ingen friksjon.", meta: M.vSqrt2gh },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 8 — Bevegelsesmengde, kraftimpuls, kollisjoner
  // ═══════════════════════════════════════════════════════════════
  { id: "bevegelsesmengde", latex: "\\vec{p} = m\\vec{v}", title: "Bevegelsesmengde", variant: "gold", kapittel: 8, topic: "bevegelsesmengde", description: "Enhet: kg·m/s. Vektor — retningen er viktig!", meta: M.bevegelsesmengde },
  { id: "impulsMom", latex: "\\vec{J} = \\sum\\vec{F}\\,\\Delta t = \\Delta\\vec{p}", title: "Impuls–momentum-teoremet", variant: "gold", kapittel: 8, topic: "bevegelsesmengde", description: "Kraftimpuls = endring i bevegelsesmengde.", meta: M.impulsMom },
  { id: "avgFraImpuls", latex: "\\bar{F} = \\frac{\\Delta p}{\\Delta t} = \\frac{m(v_2 - v_1)}{\\Delta t}", title: "Gjennomsnittlig kraft fra impuls", variant: "blue", kapittel: 8, topic: "bevegelsesmengde", description: "Finn kraften fra kontakttid og hastighetsendring.", meta: M.avgFraImpuls },
  { id: "bevaringP", latex: "\\vec{p}_{\\text{total,før}} = \\vec{p}_{\\text{total,etter}}", title: "Bevaring av bevegelsesmengde", variant: "gold", kapittel: 8, topic: "bevegelsesmengde", description: "Gjelder når ΣF_ytre = 0 (eller ΣF_ytre << støtkreftene).", meta: M.bevaringP },
  { id: "inelastisk", latex: "(m_A + m_B)\\,v_2 = m_A v_{A1} + m_B v_{B1}", title: "Fullstendig inelastisk støt", variant: "gold", kapittel: 8, topic: "bevegelsesmengde", description: "Legemene henger sammen etter støtet. p bevart, E_k ikke bevart.", meta: M.inelastisk },
  { id: "ballistiskPendel", latex: "v_0 = \\frac{M + m}{m}\\sqrt{2gh}", title: "Ballistisk pendel", variant: "gold", kapittel: 8, topic: "bevegelsesmengde", description: "Kulefart fra høyden kule+kloss svinger opp til.", meta: M.ballistiskPendel },
  { id: "elastiskA", latex: "v_{A2} = \\frac{m_A - m_B}{m_A + m_B}\\,v_{A1} + \\frac{2m_B}{m_A + m_B}\\,v_{B1}", title: "Elastisk kollisjon — legeme A", variant: "blue", kapittel: 8, topic: "bevegelsesmengde", description: "1D elastisk kollisjon. p og E_k bevart.", meta: M.elastisk },
  { id: "elastiskB", latex: "v_{B2} = \\frac{2m_A}{m_A + m_B}\\,v_{A1} + \\frac{m_B - m_A}{m_A + m_B}\\,v_{B1}", title: "Elastisk kollisjon — legeme B", variant: "blue", kapittel: 8, topic: "bevegelsesmengde", meta: M.elastisk },
  { id: "massesenter", latex: "\\vec{r}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i}", title: "Massesenter", variant: "blue", kapittel: 8, topic: "bevegelsesmengde", description: "Det massevektede gjennomsnittspunktet.", meta: M.massesenter },
  { id: "vCM", latex: "\\vec{v}_{\\text{cm}} = \\frac{\\sum m_i \\vec{v}_i}{M_\\text{tot}}", title: "Massesenterets hastighet", variant: "blue", kapittel: 8, topic: "bevegelsesmengde", meta: M.massesenter },
  { id: "N2LSystem", latex: "\\sum \\vec{F}_{\\text{ytre}} = M\\vec{a}_{\\text{cm}}", title: "Newtons 2. lov for system", variant: "gold", kapittel: 8, topic: "bevegelsesmengde", description: "Systemet oppfører seg som en partikkel i massesenteret.", meta: M.N2LSystem },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 9 — Rotasjon av stive legemer
  // ═══════════════════════════════════════════════════════════════
  { id: "rotKinW", latex: "\\omega = \\omega_0 + \\alpha t", title: "Rotasjon — likning 1 (mangler θ)", variant: "gold", kapittel: 9, topic: "rotasjon", meta: M.rotKin },
  { id: "rotKinTheta", latex: "\\theta = \\theta_0 + \\omega_0 t + \\tfrac{1}{2}\\alpha t^2", title: "Rotasjon — likning 2 (mangler ω)", variant: "gold", kapittel: 9, topic: "rotasjon", meta: M.rotKin },
  { id: "rotKinW2", latex: "\\omega^2 = \\omega_0^2 + 2\\alpha(\\theta - \\theta_0)", title: "Rotasjon — likning 3 (mangler t)", variant: "gold", kapittel: 9, topic: "rotasjon", meta: M.rotKin },
  { id: "rotKinSnitt", latex: "\\theta - \\theta_0 = \\tfrac{1}{2}(\\omega_0 + \\omega)t", title: "Rotasjon — likning 4 (mangler α)", variant: "gold", kapittel: 9, topic: "rotasjon", meta: M.rotKin },
  { id: "vRomega", latex: "v = r\\omega", title: "Linjefart fra vinkelfart", variant: "gold", kapittel: 9, topic: "rotasjon", description: "ω må være i rad/s.", meta: M.linVinkel },
  { id: "aTanRalpha", latex: "a_\\text{tan} = r\\alpha", title: "Tangentiell akselerasjon", variant: "gold", kapittel: 9, topic: "rotasjon", meta: M.linVinkel },
  { id: "aRadOmega", latex: "a_\\text{rad} = \\frac{v^2}{r} = r\\omega^2", title: "Sentripetalakselerasjon (rotasjon)", variant: "gold", kapittel: 9, topic: "rotasjon", meta: M.linVinkel },
  { id: "treghetsmomentDef", latex: "I = \\sum_i m_i r_i^2", title: "Definisjon — treghetsmoment", variant: "gold", kapittel: 9, topic: "rotasjon", meta: M.treghetsmoment },
  { id: "parallellakse", latex: "I_P = I_{CM} + Md^2", title: "Parallellakse-teoremet", variant: "gold", kapittel: 9, topic: "rotasjon", description: "d = avstand fra CM-akse til ny parallell akse.", meta: M.treghetsmoment },
  { id: "Idisk", latex: "I = \\tfrac{1}{2}MR^2", title: "Massiv disk / sylinder", variant: "blue", kapittel: 9, topic: "rotasjon", meta: M.tableauI },
  { id: "Iring", latex: "I = MR^2", title: "Tynnvegget ring / hul sylinder", variant: "blue", kapittel: 9, topic: "rotasjon", meta: M.tableauI },
  { id: "IstavSenter", latex: "I = \\tfrac{1}{12}ML^2", title: "Tynn stav (akse gjennom senter)", variant: "blue", kapittel: 9, topic: "rotasjon", meta: M.tableauI },
  { id: "IstavEnde", latex: "I = \\tfrac{1}{3}ML^2", title: "Tynn stav (akse gjennom ende)", variant: "blue", kapittel: 9, topic: "rotasjon", meta: M.tableauI },
  { id: "IkuleMassiv", latex: "I = \\tfrac{2}{5}MR^2", title: "Massiv kule", variant: "blue", kapittel: 9, topic: "rotasjon", meta: M.tableauI },
  { id: "IkuleHul", latex: "I = \\tfrac{2}{3}MR^2", title: "Tynnvegget hul kule", variant: "blue", kapittel: 9, topic: "rotasjon", meta: M.tableauI },
  { id: "EkRot", latex: "E_{k,\\text{rot}} = \\tfrac{1}{2}I\\omega^2", title: "Rotasjonskinetisk energi", variant: "gold", kapittel: 9, topic: "rotasjon", meta: M.Krot },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 10 — Dynamikk i rotasjon
  // ═══════════════════════════════════════════════════════════════
  { id: "tauDef", latex: "\\tau = rF\\sin\\phi", title: "Kraftmoment (størrelse)", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.tau },
  { id: "tauIalpha", latex: "\\sum\\tau = I\\alpha", title: "Newtons 2. lov for rotasjon", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.tau },
  { id: "rullingVel", latex: "v_{CM} = R\\omega", title: "Rulling uten glidning — hastighet", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.rulling },
  { id: "rullingAksel", latex: "a_{CM} = R\\alpha", title: "Rulling uten glidning — akselerasjon", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.rulling },
  { id: "EkTot", latex: "E_{k,\\text{tot}} = \\tfrac{1}{2}mv_{CM}^2 + \\tfrac{1}{2}I\\omega^2", title: "Total kinetisk energi ved rulling", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.rulling },
  { id: "rotArbeid", latex: "W = \\tau\\,\\Delta\\theta", title: "Arbeid av kraftmoment", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.rotArbeidEffekt },
  { id: "rotEffekt", latex: "P = \\tau\\omega", title: "Effekt i rotasjon", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.rotArbeidEffekt },
  { id: "rotWEteorem", latex: "W_\\text{tot} = \\tfrac{1}{2}I\\omega^2 - \\tfrac{1}{2}I\\omega_0^2", title: "Arbeid-energi-teoremet for rotasjon", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.rotArbeidEffekt },
  { id: "Lpartikkel", latex: "\\vec{L} = \\vec{r} \\times m\\vec{v}", title: "Angulært moment — partikkel", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.Lpartikkel },
  { id: "Lstivt", latex: "L = I\\omega", title: "Angulært moment — stivt legeme", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.L },
  { id: "tauDLDt", latex: "\\sum\\tau = \\frac{dL}{dt}", title: "Kraftmoment og L", variant: "gold", kapittel: 10, topic: "rotasjon", meta: M.L },
  { id: "Lbevaring", latex: "\\sum\\tau_\\text{ext} = 0 \\implies I_1\\omega_1 = I_2\\omega_2", title: "Bevaring av angulært moment", variant: "blue", kapittel: 10, topic: "rotasjon", meta: M.Lbevaring },
  { id: "diskSkraplanA", latex: "a_{CM} = \\tfrac{2}{3}g\\sin\\beta", title: "Disk på skråplan — akselerasjon", variant: "blue", kapittel: 10, topic: "rotasjon", description: "Rulling uten glidning; krever μ_s ≥ ⅓ tan β.", meta: M.diskSkraplan },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 21 — Elektrisk ladning og elektrisk felt
  // ═══════════════════════════════════════════════════════════════
  { id: "coulomb", latex: "F_e = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}", title: "Coulombs lov", variant: "gold", kapittel: 21, topic: "elektrostatikk", meta: M.coulomb },
  { id: "coulombKonst", latex: "k = \\frac{1}{4\\pi\\varepsilon_0} = 8{,}99 \\cdot 10^9 \\;\\text{N·m}^2/\\text{C}^2", title: "Coulombs konstant", variant: "blue", kapittel: 21, topic: "elektrostatikk" },
  { id: "eps0Konst", latex: "\\varepsilon_0 = 8{,}854 \\cdot 10^{-12}\\;\\text{C}^2/\\text{N·m}^2", title: "Vakuumpermittivitet", variant: "blue", kapittel: 21, topic: "elektrostatikk" },
  { id: "eFieldDef", latex: "\\vec{E} = \\frac{\\vec{F}_0}{q_0}", title: "Definisjon av E-felt", variant: "gold", kapittel: 21, topic: "elektrostatikk", meta: M.eField },
  { id: "eFieldPunkt", latex: "E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q|}{r^2}", title: "E-felt fra punktladning", variant: "gold", kapittel: 21, topic: "elektrostatikk", meta: M.eField },
  { id: "eKraft", latex: "\\vec{F}_e = q\\vec{E}", title: "Kraft på ladning i E-felt", variant: "gold", kapittel: 21, topic: "elektrostatikk", meta: M.eField },
  { id: "eLinje", latex: "E = \\frac{\\lambda}{2\\pi\\varepsilon_0\\,r}", title: "E-felt — uendelig lang linje", variant: "blue", kapittel: 21, topic: "elektrostatikk", description: "λ = linjeladning (C/m).", meta: M.eLinje },
  { id: "ePlan", latex: "E = \\frac{\\sigma}{2\\varepsilon_0}", title: "E-felt — uendelig plan", variant: "blue", kapittel: 21, topic: "elektrostatikk", description: "σ = flateladning (C/m²).", meta: M.ePlan },
  { id: "eKule", latex: "E = \\frac{Q}{4\\pi\\varepsilon_0\\,r^2}", title: "E-felt — kuleflate (r > R)", variant: "blue", kapittel: 21, topic: "elektrostatikk", description: "Utenfor en ladet kuleflate: som om hele ladningen var i sentrum.", meta: M.eKule },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 23 — Elektrisk potensial
  // ═══════════════════════════════════════════════════════════════
  { id: "EpUniform", latex: "E_p = q_0 E y", title: "Pot. energi (uniformt felt)", variant: "gold", kapittel: 23, topic: "elektrostatikk", meta: M.EpUniform },
  { id: "EpLadninger", latex: "E_p = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_0 q}{r}", title: "Pot. energi (punktladninger)", variant: "gold", kapittel: 23, topic: "elektrostatikk", description: "Positiv E_p: frastøtning. Negativ: tiltrekning.", meta: M.Uladninger },
  { id: "VDef", latex: "V = \\frac{E_p}{q_0}", title: "Elektrisk potensial (definisjon)", variant: "gold", kapittel: 23, topic: "elektrostatikk", meta: M.V },
  { id: "VPunkt", latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}", title: "Potensial fra punktladning", variant: "gold", kapittel: 23, topic: "elektrostatikk", description: "Summer skalarer — ingen vektorer!", meta: M.V },
  { id: "Vab", latex: "V_{ab} = V_a - V_b = -\\frac{\\Delta E_p}{q_0}", title: "Potensialforskjell (spenning)", variant: "gold", kapittel: 23, topic: "elektrostatikk", meta: M.Vab },
  { id: "ElektrostEbev", latex: "E_{k,1} + E_{p,1} = E_{k,2} + E_{p,2}", title: "Energibevaring i elektrostatikk", variant: "gold", kapittel: 23, topic: "elektrostatikk", meta: M.ElektrostEbev },
  { id: "EVd", latex: "E = \\frac{V}{d}", title: "E-felt mellom plater", variant: "blue", kapittel: 23, topic: "elektrostatikk", description: "V = spenning, d = avstand.", meta: M.EVd },
  { id: "eVoltUnit", latex: "1\\;\\text{eV} = 1{,}60 \\cdot 10^{-19}\\;\\text{J}", title: "Elektronvolt", variant: "blue", kapittel: 23, topic: "elektrostatikk", meta: M.eVoltUnit },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 24 — Kapasitans og dielektrika
  // ═══════════════════════════════════════════════════════════════
  { id: "CDef", latex: "C = \\frac{Q}{V_{ab}}", title: "Definisjon av kapasitans", variant: "gold", kapittel: 24, topic: "elektrostatikk", description: "Q er ladningen på ÉN plate.", meta: M.C },
  { id: "Cplate", latex: "C = \\varepsilon_0 \\frac{A}{d}", title: "Platekondensator (vakuum)", variant: "gold", kapittel: 24, topic: "elektrostatikk", description: "A = plateareal, d = avstand mellom plater.", meta: M.C },
  { id: "CSerie", latex: "\\frac{1}{C_\\text{tot}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\cdots", title: "Kondensatorer i serie", variant: "gold", kapittel: 24, topic: "elektrostatikk", description: "Q er lik, V fordeles.", meta: M.koblingC },
  { id: "CParallell", latex: "C_\\text{tot} = C_1 + C_2 + \\cdots", title: "Kondensatorer i parallell", variant: "gold", kapittel: 24, topic: "elektrostatikk", description: "V er lik, Q fordeles.", meta: M.koblingC },
  { id: "EpC", latex: "E_p = \\tfrac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\tfrac{1}{2}QV", title: "Lagret energi i kondensator", variant: "gold", kapittel: 24, topic: "elektrostatikk", description: "Tre likeverdige uttrykk — velg etter kjente størrelser.", meta: M.C },
  { id: "energitetthet", latex: "u = \\tfrac{1}{2}\\varepsilon_0 E^2", title: "Energitetthet i E-felt", variant: "gold", kapittel: 24, topic: "elektrostatikk", description: "u = energi per volum.", meta: M.energitetthet },
  { id: "dielektrikum", latex: "K = \\frac{C}{C_0}, \\quad \\varepsilon = K\\varepsilon_0", title: "Dielektrikumkonstant og permittivitet", variant: "blue", kapittel: 24, topic: "elektrostatikk", description: "K ≥ 1 (alltid).", meta: M.dielektrikum },
  { id: "indusertQ", latex: "Q_i = Q\\!\\left(1 - \\frac{1}{K}\\right)", title: "Indusert ladning (dielektrikum)", variant: "blue", kapittel: 24, topic: "elektrostatikk", meta: M.indusertQ },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 27 — Magnetisk felt og magnetiske krefter
  // ═══════════════════════════════════════════════════════════════
  { id: "FqvBVektor", latex: "\\vec{F}_m = q\\vec{v}\\times\\vec{B}", title: "Magnetisk kraft på ladning (vektor)", variant: "gold", kapittel: 27, topic: "magnetisme", meta: M.FqvB },
  { id: "FqvBStorrelse", latex: "F_m = |q|vB\\sin\\theta", title: "Magnetisk kraft på ladning (størrelse)", variant: "gold", kapittel: 27, topic: "magnetisme", description: "Retning: høyrehåndsregelen.", meta: M.FqvB },
  { id: "rSirkelB", latex: "r = \\frac{mv}{|q|B}", title: "Sirkelradius i B-felt", variant: "gold", kapittel: 27, topic: "magnetisme", description: "Bruk v⊥ hvis farten ikke er vinkelrett på B.", meta: M.rSirkelB },
  { id: "omegaSyklotron", latex: "\\omega = \\frac{|q|B}{m}", title: "Syklotronfrekvens", variant: "gold", kapittel: 27, topic: "magnetisme", meta: M.syklotronfrekvens },
  { id: "TSyklotron", latex: "T = \\frac{2\\pi m}{|q|B}", title: "Omløpstid i B-felt", variant: "blue", kapittel: 27, topic: "magnetisme", meta: M.rSirkelB },
  { id: "fluks", latex: "\\Phi_B = BA\\cos\\varphi = \\int \\vec{B}\\cdot d\\vec{A}", title: "Magnetisk fluks", variant: "gold", kapittel: 29, topic: "induksjon", description: "φ er vinkelen mellom B og normalen til flaten.", meta: M.fluks, alsoIn: [27] },
  { id: "fartsvelger", latex: "v = \\frac{E}{B}", title: "Fartsvelger", variant: "blue", kapittel: 27, topic: "magnetisme", description: "Balanse mellom F_e og F_m.", meta: M.fartsvelger },
  { id: "FlBVektor", latex: "\\vec{F}_m = I\\vec{l} \\times \\vec{B}", title: "Kraft på strømførende leder (vektor)", variant: "gold", kapittel: 27, topic: "magnetisme", meta: M.FlBVektor },
  { id: "FlBStorrelse", latex: "F_m = IlB\\sin\\theta", title: "Kraft på leder (størrelse)", variant: "gold", kapittel: 27, topic: "magnetisme", description: "θ er vinkelen mellom strømretning og B.", meta: M.FlB },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 28 — Magnetiske felt fra strøm
  // ═══════════════════════════════════════════════════════════════
  { id: "BladningSt", latex: "B = \\frac{\\mu_0}{4\\pi}\\frac{|q|v\\sin\\varphi}{r^2}", title: "B fra ladning i bevegelse", variant: "gold", kapittel: 28, topic: "magnetisme", meta: M.Bladning },
  { id: "BladningVektor", latex: "\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{q\\vec{v}\\times\\hat{r}}{r^2}", title: "B fra ladning (vektor)", variant: "gold", kapittel: 28, topic: "magnetisme", meta: M.Bladning },
  { id: "biotSavart", latex: "d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{I\\,d\\vec{l}\\times\\hat{r}}{r^2}", title: "Biot-Savarts lov", variant: "gold", kapittel: 28, topic: "magnetisme", description: "Må integreres over hele lederen.", meta: M.biotSavart },
  { id: "Bleder", latex: "B = \\frac{\\mu_0 I}{2\\pi r}", title: "B-felt — lang rett leder", variant: "gold", kapittel: 28, topic: "magnetisme", description: "r = vinkelrett avstand. Felt i sirkler rundt lederen.", meta: M.Bleder },
  { id: "Bspole", latex: "B = \\frac{\\mu_0 I}{2R}", title: "B-felt — senter av sirkulær spole", variant: "gold", kapittel: 28, topic: "magnetisme", meta: M.Bspole },
  { id: "Bsolenoid", latex: "B = \\mu_0 n I", title: "B-felt — solenoid", variant: "gold", kapittel: 28, topic: "magnetisme", description: "n = viklinger per lengde.", meta: M.Bsolenoid },
  { id: "FparallelL", latex: "\\frac{F_m}{L} = \\frac{\\mu_0 I I'}{2\\pi r}", title: "Kraft mellom parallelle ledere", variant: "gold", kapittel: 28, topic: "magnetisme", description: "Lik strømretning → tiltrekning. Motsatt → frastøtning.", meta: M.FparallelL },
  { id: "mu0Konst", latex: "\\mu_0 = 4\\pi \\times 10^{-7}\\;\\text{T·m/A}", title: "Permeabiliteten i vakuum", variant: "blue", kapittel: 28, topic: "magnetisme" },

  // ═══════════════════════════════════════════════════════════════
  // KAPITTEL 29 — Elektromagnetisk induksjon
  // ═══════════════════════════════════════════════════════════════
  { id: "faraday", latex: "\\mathcal{E} = -\\frac{d\\Phi_B}{dt}", title: "Faradays lov", variant: "gold", kapittel: 29, topic: "induksjon", meta: M.faraday },
  { id: "faradayN", latex: "\\mathcal{E} = -N\\frac{d\\Phi_B}{dt}", title: "Faradays lov (N vindinger)", variant: "gold", kapittel: 29, topic: "induksjon", meta: M.faraday },
  { id: "lenz", latex: "\\text{Den induserte strømmen motvirker fluksendringen som skapte den.}", title: "Lenz' lov", variant: "blue", kapittel: 29, topic: "induksjon", meta: M.lenz },
  { id: "BLv", latex: "\\mathcal{E} = vBL", title: "EMF — leder i bevegelse", variant: "gold", kapittel: 29, topic: "induksjon", description: "L = lederens lengde, v = fart vinkelrett på B og L.", meta: M.BLv },
  { id: "ACgen", latex: "\\mathcal{E}(t) = NAB\\omega\\sin(\\omega t)", title: "Vekselstrømgenerator", variant: "gold", kapittel: 29, topic: "induksjon", meta: M.ACgen },
  { id: "ACgenMax", latex: "\\mathcal{E}_\\text{maks} = NAB\\omega", title: "Maksimal EMF (AC-generator)", variant: "blue", kapittel: 29, topic: "induksjon", meta: M.ACgen },
  { id: "diskDynamo", latex: "\\mathcal{E} = \\tfrac{1}{2}\\omega B R^2", title: "Faradays diskdynamo", variant: "blue", kapittel: 29, topic: "induksjon", meta: M.diskDynamo },
  { id: "effektEMF", latex: "P = \\frac{\\mathcal{E}^2}{R} = \\frac{B^2 L^2 v^2}{R}", title: "Effekt i kretsen", variant: "blue", kapittel: 29, topic: "induksjon", meta: M.effektEMF },
  { id: "generellEMF", latex: "\\mathcal{E} = \\oint (\\vec{v}\\times\\vec{B})\\cdot d\\vec{l}", title: "Generell EMF (bevegelig leder)", variant: "blue", kapittel: 29, topic: "induksjon", meta: M.generellEMF },
];

export function getFormula(id: string): FormulaEntry {
  const f = formulas.find((x) => x.id === id);
  if (!f) {
    throw new Error(`Formula with id "${id}" not found in registry`);
  }
  return f;
}

export function byChapter(n: number): FormulaEntry[] {
  return formulas.filter((f) => f.kapittel === n || f.alsoIn?.includes(n));
}

export function byTopic(topic: FormulaTopic): FormulaEntry[] {
  return formulas.filter((f) => f.topic === topic);
}
