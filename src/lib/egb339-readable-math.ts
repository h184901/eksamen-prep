/** Presentation-only replacements for authored mathematical code spans.
 * Explicit allowlist: Python, code fences, unknown notation and source data stay untouched. */
export const EGB339_READABLE_FORMULAS: Record<string, string> = {
  "R(θ) = [[cos θ, -sin θ], [sin θ, cos θ]]": "R(\\theta)=\\begin{bmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{bmatrix}",
  "Rx(θ) = [[1,0,0],[0,cosθ,-sinθ],[0,sinθ,cosθ]]": "R_x(\\theta)=\\begin{bmatrix}1&0&0\\\\0&\\cos\\theta&-\\sin\\theta\\\\0&\\sin\\theta&\\cos\\theta\\end{bmatrix}",
  "Ry(θ) = [[cosθ,0,sinθ],[0,1,0],[-sinθ,0,cosθ]]": "R_y(\\theta)=\\begin{bmatrix}\\cos\\theta&0&\\sin\\theta\\\\0&1&0\\\\-\\sin\\theta&0&\\cos\\theta\\end{bmatrix}",
  "Rz(θ) = [[cosθ,-sinθ,0],[sinθ,cosθ,0],[0,0,1]]": "R_z(\\theta)=\\begin{bmatrix}\\cos\\theta&-\\sin\\theta&0\\\\\\sin\\theta&\\cos\\theta&0\\\\0&0&1\\end{bmatrix}",
  "RᵀR = I": "R^T R=I",
  "det(R) = +1": "\\det R=+1",
  "R⁻¹ = Rᵀ": "R^{-1}=R^T",
  "T = [[R, t], [0, 1]]": "T=\\begin{bmatrix}R&t\\\\0&1\\end{bmatrix}",
  "T = [[R, t], [0, 0, 1]]": "T=\\begin{bmatrix}R&t\\\\0\\;0&1\\end{bmatrix}",
  "T⁻¹ = [[Rᵀ, -Rᵀt], [0 0 0, 1]]": "T^{-1}=\\begin{bmatrix}R^T&-R^Tt\\\\0\\;0\\;0&1\\end{bmatrix}",
  "p = [x, y]ᵀ": "p=\\begin{bmatrix}x\\\\y\\end{bmatrix}",
  "p_h = [x, y, 1]ᵀ": "p_h=\\begin{bmatrix}x\\\\y\\\\1\\end{bmatrix}",
  "p₀ = R p_A": "p_0=R\\,p_A",
  "p_A = Rᵀ p₀": "p_A=R^T p_0",
  "p₀ = R p_A + t": "p_0=R\\,p_A+t",
  "T₀E = T₀1 T₁2 … TₙE": "{}^0T_E={}^0T_1\\,{}^1T_2\\cdots{}^nT_E",
  "T₀E": "{}^0T_E",
  "∂p/∂q": "\\partial p/\\partial q",
  "c(θ) = ||FK(θ) - p*||₂": "c(\\theta)=\\lVert\\operatorname{FK}(\\theta)-p^*\\rVert_2",
  "pₓ=L₁cos(θ₁)+L₂cos(θ₁+θ₂)": "p_x=L_1\\cos\\theta_1+L_2\\cos(\\theta_1+\\theta_2)",
  "pᵧ=L₁sin(θ₁)+L₂sin(θ₁+θ₂)": "p_y=L_1\\sin\\theta_1+L_2\\sin(\\theta_1+\\theta_2)",
  "J = [[-L₁sin(θ₁)-L₂sin(θ₁+θ₂), -L₂sin(θ₁+θ₂)], [L₁cos(θ₁)+L₂cos(θ₁+θ₂), L₂cos(θ₁+θ₂)]]": "J=\\begin{bmatrix}-L_1\\sin\\theta_1-L_2\\sin(\\theta_1+\\theta_2)&-L_2\\sin(\\theta_1+\\theta_2)\\\\L_1\\cos\\theta_1+L_2\\cos(\\theta_1+\\theta_2)&L_2\\cos(\\theta_1+\\theta_2)\\end{bmatrix}",
  "Jᵢⱼ(q)=∂pᵢ/∂qⱼ": "J_{ij}(q)=\\frac{\\partial p_i}{\\partial q_j}",
  "Jᵢⱼ = ∂pᵢ/∂qⱼ": "J_{ij}=\\frac{\\partial p_i}{\\partial q_j}",
  "∂f/∂x = 6x": "\\frac{\\partial f}{\\partial x}=6x",
  "∂f/∂y = 6y²": "\\frac{\\partial f}{\\partial y}=6y^2",
  "Δp≈J(q)Δq": "\\Delta p\\approx J(q)\\Delta q",
  "Δq≈J(q)⁻¹Δp": "\\Delta q\\approx J(q)^{-1}\\Delta p",
  "pₜ₊₁≈pₜ+Δp": "p_{t+1}\\approx p_t+\\Delta p",
  "qₜ₊₁≈qₜ+Δq": "q_{t+1}\\approx q_t+\\Delta q",
  "q̇=J(q)⁻¹ṗ": "\\dot q=J(q)^{-1}\\dot p",
  "q̃ = H⁻¹p": "\\tilde q=H^{-1}p",
  "B = P₂-P₁": "B=P_2-P_1",
  "A = O-P₁": "A=O-P_1",
  "C = P₁+tB": "C=P_1+tB",
  "d = ||O-C||₂": "d=\\lVert O-C\\rVert_2"
};

export function egb339ReadableMath(markdown: string): string {
  let fence: string | null = null;
  return markdown.split("\n").map((line) => {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
      return line;
    }
    if (fence) return line;
    const standalone = line.match(/^`([^`]+)`([.,;:]?)$/);
    if (standalone && EGB339_READABLE_FORMULAS[standalone[1]]) return "$$\n" + EGB339_READABLE_FORMULAS[standalone[1]] + standalone[2] + "\n$$";
    return line.replace(/`([^`\n]+)`/g, (original, expression: string) => EGB339_READABLE_FORMULAS[expression] ? "$" + EGB339_READABLE_FORMULAS[expression] + "$" : original);
  }).join("\n");
}
