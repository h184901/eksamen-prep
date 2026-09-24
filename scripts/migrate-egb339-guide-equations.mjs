#!/usr/bin/env node
/**
 * One-shot migration: replace the legacy unicode `.equation` blocks in the
 * generated assessment-2.1 guide runtime with KaTeX-rendered HTML lines.
 * The math content is unchanged; only the typesetting improves.
 */
import fs from "node:fs";
import katex from "katex";

const FILE = "src/components/egb339/assessment-guide/guide-runtime.js";
let src = fs.readFileSync(FILE, "utf8");

// Each entry: exact original block content → LaTeX lines (rendered inline, joined by <br>).
const BLOCKS = [
  [
    "sₓ = W<sub>mm</sub> / W<sub>px</sub>, &nbsp; sᵧ = H<sub>mm</sub> / H<sub>px</sub><br>xₖ = (u − W<sub>px</sub>/2)sₓ<br>yₖ = (H<sub>px</sub>/2 − v)sᵧ<br>zₖ = 0",
    ["s_x = W_{\\mathrm{mm}} / W_{\\mathrm{px}}, \\quad s_y = H_{\\mathrm{mm}} / H_{\\mathrm{px}}",
     "x_k = (u - W_{\\mathrm{px}}/2)\\,s_x",
     "y_k = (H_{\\mathrm{px}}/2 - v)\\,s_y",
     "z_k = 0"],
  ],
  [
    "θ<sub>rad</sub> = θ<sub>deg</sub> · π/180<br>θ<sub>deg</sub> = θ<sub>rad</sub> · 180/π",
    ["\\theta_{\\mathrm{rad}} = \\theta_{\\mathrm{deg}} \\cdot \\pi/180",
     "\\theta_{\\mathrm{deg}} = \\theta_{\\mathrm{rad}} \\cdot 180/\\pi"],
  ],
  [
    "pᴮ = R pᴷ + t<br>pₕᴮ = ᴮTₖ pₕᴷ, &nbsp; pₕ = [x, y, z, 1]ᵀ<br>xᴮ = cosψ xᴷ − sinψ yᴷ + 175<br>yᴮ = sinψ xᴷ + cosψ yᴷ − 150<br>zᴮ = zᴷ + 2",
    ["p^B = R\\,p^K + t",
     "p_h^B = {}^BT_K\\, p_h^K, \\quad p_h = [x, y, z, 1]^T",
     "x^B = \\cos\\psi\\, x^K - \\sin\\psi\\, y^K + 175",
     "y^B = \\sin\\psi\\, x^K + \\cos\\psi\\, y^K - 150",
     "z^B = z^K + 2"],
  ],
  [
    "ρ = √(x² + y²)<br>θ₁ = atan2(y, x)<br>wₓ = ρ − L₃<br>w_z = z − L₀ + L₄<br>d = √(wₓ² + w_z²)",
    ["\\rho = \\sqrt{x^2 + y^2}",
     "\\theta_1 = \\operatorname{atan2}(y, x)",
     "w_x = \\rho - L_3",
     "w_z = z - L_0 + L_4",
     "d = \\sqrt{w_x^2 + w_z^2}"],
  ],
  [
    "wₓ = L₁ cosα + L₂ cos(α + δ)<br>w_z = L₁ sinα + L₂ sin(α + δ)",
    ["w_x = L_1 \\cos\\alpha + L_2 \\cos(\\alpha + \\delta)",
     "w_z = L_1 \\sin\\alpha + L_2 \\sin(\\alpha + \\delta)"],
  ],
  [
    "d² = wₓ² + w_z²<br>d² = L₁² + L₂² + 2 L₁ L₂ cosδ",
    ["d^2 = w_x^2 + w_z^2",
     "d^2 = L_1^2 + L_2^2 + 2 L_1 L_2 \\cos\\delta"],
  ],
  [
    "δ = +acos(cδ) eller −acos(cδ)",
    ["\\delta = +\\operatorname{acos}(c_\\delta)\\ \\text{eller}\\ -\\operatorname{acos}(c_\\delta)"],
  ],
  [
    "γ = atan2(w_z, wₓ)<br>η = atan2(L₂ sinδ, L₁ + L₂ cosδ)<br>α = γ − η<br>β = α + δ<br>θ₂ = π/2 − α<br>θ₃ = −β",
    ["\\gamma = \\operatorname{atan2}(w_z, w_x)",
     "\\eta = \\operatorname{atan2}(L_2 \\sin\\delta, L_1 + L_2 \\cos\\delta)",
     "\\alpha = \\gamma - \\eta",
     "\\beta = \\alpha + \\delta",
     "\\theta_2 = \\pi/2 - \\alpha",
     "\\theta_3 = -\\beta"],
  ],
  [
    "r = L₁ sinθ₂ + L₂ cosθ₃ + L₃<br>x = r cosθ₁<br>y = r sinθ₁<br>z = L₀ + L₁ cosθ₂ − L₂ sinθ₃ − L₄<br>ε = ‖FK(θ) − p*‖₂ = √((x − x*)² + (y − y*)² + (z − z*)²)<br>Godta kandidaten når ε ≤ 10⁻⁶ mm",
    ["r = L_1 \\sin\\theta_2 + L_2 \\cos\\theta_3 + L_3",
     "x = r \\cos\\theta_1",
     "y = r \\sin\\theta_1",
     "z = L_0 + L_1 \\cos\\theta_2 - L_2 \\sin\\theta_3 - L_4",
     "\\varepsilon = \\lVert \\operatorname{FK}(\\theta) - p^* \\rVert_2 = \\sqrt{(x - x^*)^2 + (y - y^*)^2 + (z - z^*)^2}",
     "\\text{Godta kandidaten når } \\varepsilon \\le 10^{-6}\\ \\mathrm{mm}"],
  ],
  [
    "Geometrisk rekkevidde: |L₁ − L₂| ≤ d ≤ L₁ + L₂<br>Her: 12 ≤ d ≤ 282 mm<br>Leddgrenser: θmin,i ≤ θᵢ ≤ θmax,i for alle i<br>θmin = [−90°, 0°, −10°], θmax = [90°, 85°, 75°]<br>Valg: θvalgt = argmin<sub>θ ∈ gyldige kandidater</sub> ‖θ − θhome‖₂<br>θhome = [0, 0, 0] rad",
    ["\\text{Geometrisk rekkevidde: } |L_1 - L_2| \\le d \\le L_1 + L_2",
     "\\text{Her: } 12 \\le d \\le 282\\ \\mathrm{mm}",
     "\\text{Leddgrenser: } \\theta_{\\min,i} \\le \\theta_i \\le \\theta_{\\max,i}\\ \\text{for alle } i",
     "\\theta_{\\min} = [-90^\\circ, 0^\\circ, -10^\\circ],\\ \\theta_{\\max} = [90^\\circ, 85^\\circ, 75^\\circ]",
     "\\text{Valg: } \\theta_{\\mathrm{valgt}} = \\operatorname{argmin}_{\\theta\\ \\mathrm{gyldige\\ kandidater}} \\lVert \\theta - \\theta_{\\mathrm{home}} \\rVert_2",
     "\\theta_{\\mathrm{home}} = [0, 0, 0]\\ \\mathrm{rad}"],
  ],
  [
    "q₁ = θ₁<br>q₂ = θ₂<br>q₃ = θ₃ − θ₂<br>q₄ = −θ₃<br>q₂ + q₃ + q₄ = 0",
    ["q_1 = \\theta_1",
     "q_2 = \\theta_2",
     "q_3 = \\theta_3 - \\theta_2",
     "q_4 = -\\theta_3",
     "q_2 + q_3 + q_4 = 0"],
  ],
  [
    "T = Rz(q₁) Tz(L₀) Ry(q₂) Tz(L₁)<br>　 · Ry(q₃) Tx(L₂) Ry(q₄) Trans(L₃, 0, −L₄)<br>p = T[:3, 3]",
    ["T = R_z(q_1)\\,T_z(L_0)\\,R_y(q_2)\\,T_z(L_1)",
     "\\quad\\cdot\\; R_y(q_3)\\,T_x(L_2)\\,R_y(q_4)\\,\\mathrm{Trans}(L_3, 0, -L_4)",
     "p = \\texttt{T[:3, 3]}"],
  ],
  [
    "pABOVE = pPRESS + [0, 0, 20]ᵀ mm<br>Per tast: 1 + 1 + 0.5 + 1 = 3.5 s med pauser<br>Fem taster: 5 · 3.5 = 17.5 s med pauser",
    ["p_{\\mathrm{ABOVE}} = p_{\\mathrm{PRESS}} + [0, 0, 20]^T\\ \\mathrm{mm}",
     "\\text{Per tast: } 1 + 1 + 0.5 + 1 = 3.5\\ \\mathrm{s}\\ \\text{med pauser}",
     "\\text{Fem taster: } 5 \\cdot 3.5 = 17.5\\ \\mathrm{s}\\ \\text{med pauser}"],
  ],
  [
    "Invers transformasjon: T⁻¹ = [Rᵀ, −Rᵀt; 0, 1]<br>Rotasjon: RᵀR = I, det(R) = +1<br>75 % tastatur: pᴮ = R [0.75 xᴷ, 0.75 yᴷ, zᴷ]ᵀ + t<br>Joint-interpolasjon: θ(s) = θstart + s(θslutt − θstart)<br>Kartesisk interpolasjon: p(s) = pstart + s(pslutt − pstart), θ(s) = IK(p(s))<br>0 ≤ s ≤ 1",
    ["\\text{Invers transformasjon: } T^{-1} = [R^T,\\ -R^T t;\\ 0, 1]",
     "\\text{Rotasjon: } R^T R = I,\\ \\det(R) = +1",
     "\\text{75 \\% tastatur: } p^B = R\\,[0.75\\, x^K, 0.75\\, y^K, z^K]^T + t",
     "\\text{Joint-interpolasjon: } \\theta(s) = \\theta_{\\mathrm{start}} + s(\\theta_{\\mathrm{slutt}} - \\theta_{\\mathrm{start}})",
     "\\text{Kartesisk interpolasjon: } p(s) = p_{\\mathrm{start}} + s(p_{\\mathrm{slutt}} - p_{\\mathrm{start}}),\\ \\theta(s) = \\operatorname{IK}(p(s))",
     "0 \\le s \\le 1"],
  ],
  [
    "Eksempel på numerisk IK-kost:<br>J(θ) = ‖FK(θ) − p*‖₂² + λ<sub>L</sub> P<sub>leddgrenser</sub>(θ) + λ<sub>O</sub> P<sub>hindringer</sub>(θ)",
    ["\\text{Eksempel på numerisk IK-kost:}",
     "J(\\theta) = \\lVert \\operatorname{FK}(\\theta) - p^* \\rVert_2^2 + \\lambda_L\\, P_{\\mathrm{leddgrenser}}(\\theta) + \\lambda_O\\, P_{\\mathrm{hindringer}}(\\theta)"],
  ],
];

let replaced = 0;
for (const [original, lines] of BLOCKS) {
  const rendered = lines.map((tex) => katex.renderToString(tex, { throwOnError: true, displayMode: false })).join("<br>");
  const needle = `<div class="equation">${original}</div>`;
  if (!src.includes(needle)) throw new Error(`Block not found: ${original.slice(0, 60)}`);
  src = src.split(needle).join(`<div class="equation">${rendered}</div>`);
  replaced += 1;
}

fs.writeFileSync(FILE, src);
console.log(`Converted ${replaced} equation blocks to KaTeX in ${FILE}`);
