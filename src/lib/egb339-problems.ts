export interface Egb339ProblemTopic {
  label: string;
  href: string;
}

export type Egb339ProblemVisual =
  | "static-frames"
  | "week4-arm"
  | "two-link-arm"
  | "mixed-joint-arm"
  | "motion-profile"
  | "point-segment"
  | "highway";

export interface Egb339Problem {
  id: string;
  title: string;
  source: string;
  sourcePage: number;
  sourcePageEnd?: number;
  prompt: string;
  solution: string;
  answer: string;
  topics: Egb339ProblemTopic[];
  verification: "official" | "derived" | "open";
  visual?: Egb339ProblemVisual;
}

const topic = {
  linearAlgebra: {
    label: "Lineær algebra",
    href: "/egb339/temaer/linear-algebra-for-robotics",
  },
  numpy: {
    label: "NumPy og matriseoperasjoner",
    href: "/egb339/temaer/numpy-arrays-and-matrix-operations",
  },
  frames: {
    label: "Referanserammer",
    href: "/egb339/temaer/reference-frames",
  },
  so2: {
    label: "SO(2)-rotasjoner",
    href: "/egb339/temaer/so-2-rotation-matrices",
  },
  se2: {
    label: "SE(2)-transformasjoner",
    href: "/egb339/temaer/se-2-homogeneous-transformations",
  },
  so3: {
    label: "SO(3)-rotasjoner",
    href: "/egb339/temaer/so-3-rotation-matrices",
  },
  se3: {
    label: "SE(3)-transformasjoner",
    href: "/egb339/temaer/se-3-homogeneous-transformations",
  },
  rotations3d: {
    label: "Sammensatte 3D-rotasjoner",
    href: "/egb339/temaer/rotation-composition-in-3d",
  },
  poseGraphs: {
    label: "Posegrafer",
    href: "/egb339/temaer/pose-graphs",
  },
  chains: {
    label: "Kinematiske kjeder",
    href: "/egb339/temaer/kinematic-chains-and-joints",
  },
  fk: {
    label: "Forward kinematics",
    href: "/egb339/temaer/forward-kinematics",
  },
  ik: {
    label: "Inverse kinematics",
    href: "/egb339/temaer/inverse-kinematics",
  },
  ikBranches: {
    label: "Arbeidsrom og IK-grener",
    href: "/egb339/temaer/robot-workspace-and-ik-solution-branches",
  },
  atan2: {
    label: "atan2 og invers trigonometri",
    href: "/egb339/temaer/atan2-and-inverse-trigonometry",
  },
  jacobian: {
    label: "Robot-Jacobian",
    href: "/egb339/temaer/robot-jacobian",
  },
  derivatives: {
    label: "Partiellderivasjon",
    href: "/egb339/temaer/partial-derivatives-for-robotics",
  },
  differential: {
    label: "Differensiell kinematikk",
    href: "/egb339/temaer/differential-kinematics-and-local-linearisation",
  },
  interpolation: {
    label: "Bevegelsesinterpolasjon",
    href: "/egb339/temaer/robot-motion-interpolation",
  },
  profiles: {
    label: "Trapesprofiler",
    href: "/egb339/temaer/trapezoidal-motion-profiles",
  },
  distance: {
    label: "Punkt-til-segment-avstand",
    href: "/egb339/temaer/point-to-segment-distance-and-obstacle-clearance",
  },
  images: {
    label: "Digital bilderepresentasjon",
    href: "/egb339/temaer/digital-image-representation",
  },
  imageOps: {
    label: "Bildeoperasjoner",
    href: "/egb339/temaer/monadic-and-dyadic-image-operations",
  },
  histograms: {
    label: "Histogrammer og terskling",
    href: "/egb339/temaer/image-histograms-and-thresholding",
  },
};

const week2: Egb339Problem[] = [
  {
    id: "w2-dot-products",
    title: "Skalarprodukter",
    source: "Tutorial - Linear Algebra and 2D Pose",
    sourcePage: 8,
    verification: "official",
    topics: [topic.linearAlgebra, topic.numpy],
    prompt: String.raw`
Evaluate the following dot products:

1. $[2\;0]\cdot[1\;7]$
2. $[3\;1]\cdot[2\;2]$
3. $[3\;1\;4]\cdot[6\;2\;1]$
4. $[3\;5]\cdot[5\;1]$
`,
    solution: String.raw`
Et skalarprodukt er summen av parvise produkter:

$$a\cdot b=\sum_i a_i b_i.$$

1. $2(1)+0(7)=2$
2. $3(2)+1(2)=8$
3. $3(6)+1(2)+4(1)=24$
4. $3(5)+5(1)=20$
`,
    answer: String.raw`$2,\;8,\;24,\;20$`,
  },
  {
    id: "w2-matrix-products",
    title: "Matrisemultiplikasjon",
    source: "Tutorial - Linear Algebra and 2D Pose",
    sourcePage: 8,
    verification: "official",
    topics: [topic.linearAlgebra, topic.numpy],
    prompt: String.raw`
Evaluate the following matrix multiplications:

$$
\text{a) }\begin{bmatrix}2&2\\2&2\end{bmatrix}
\begin{bmatrix}1&6\\2&3\end{bmatrix}
\qquad
\text{b) }\begin{bmatrix}1\\7\end{bmatrix}
\begin{bmatrix}2&0\end{bmatrix}
$$

$$
\text{c) }\begin{bmatrix}3&1&4\\2&2&5\end{bmatrix}
\begin{bmatrix}6\\1\\3\end{bmatrix}.
$$
`,
    solution: String.raw`
Hvert element i resultatet er skalarproduktet mellom én rad i venstre matrise og én kolonne i høyre matrise. De indre dimensjonene må være like.

For eksempel blir øvre venstre element i a) $2(1)+2(2)=6$, mens øvre høyre blir $2(6)+2(3)=18$.
`,
    answer: String.raw`
$$
\text{a) }\begin{bmatrix}6&18\\6&18\end{bmatrix},\qquad
\text{b) }\begin{bmatrix}2&0\\14&0\end{bmatrix},\qquad
\text{c) }\begin{bmatrix}31\\29\end{bmatrix}.
$$
`,
  },
  {
    id: "w2-transpose",
    title: "Transponering",
    source: "Tutorial - Linear Algebra and 2D Pose",
    sourcePage: 9,
    verification: "official",
    topics: [topic.linearAlgebra, topic.numpy],
    prompt: String.raw`
Evaluate the transpose of:

$$
\text{a) }\begin{bmatrix}1&2\\3&4\end{bmatrix},\quad
\text{b) }\begin{bmatrix}5&2\\6&7\end{bmatrix},\quad
\text{c) }\begin{bmatrix}3&7&2\\3&4&1\\2&9&1\end{bmatrix},
$$

$$
\text{d) }\begin{bmatrix}1\\7\end{bmatrix},\qquad
\text{e) }\begin{bmatrix}3&1&4\\2&2&5\end{bmatrix}.
$$
`,
    solution: String.raw`
Transponering bytter rad og kolonne. Elementet i posisjon $(i,j)$ flyttes til $(j,i)$.
`,
    answer: String.raw`
$$
\text{a) }\begin{bmatrix}1&3\\2&4\end{bmatrix},\quad
\text{b) }\begin{bmatrix}5&6\\2&7\end{bmatrix},\quad
\text{c) }\begin{bmatrix}3&3&2\\7&4&9\\2&1&1\end{bmatrix},
$$

$$
\text{d) }\begin{bmatrix}1&7\end{bmatrix},\qquad
\text{e) }\begin{bmatrix}3&2\\1&2\\4&5\end{bmatrix}.
$$
`,
  },
  {
    id: "w2-inverses",
    title: "Inverse matriser",
    source: "Tutorial - Linear Algebra and 2D Pose",
    sourcePage: 9,
    verification: "official",
    topics: [topic.linearAlgebra, topic.numpy],
    prompt: String.raw`
Evaluate the inverse of:

$$
\text{a) }\begin{bmatrix}1&2\\3&4\end{bmatrix},\quad
\text{b) }\begin{bmatrix}5&2\\6&7\end{bmatrix},\quad
\text{c) }\begin{bmatrix}1&0\\0&1\end{bmatrix},
$$

$$
\text{d) }\begin{bmatrix}2&2\\2&2\end{bmatrix},\qquad
\text{e) }\begin{bmatrix}1&2\\2&1\end{bmatrix}.
$$
`,
    solution: String.raw`
For $A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$ gjelder

$$A^{-1}=\frac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}$$

når determinanten $ad-bc\neq0$. I d) er radene identiske, så determinanten er null og inversen finnes ikke.
`,
    answer: String.raw`
$$
\text{a) }\begin{bmatrix}-2&1\\3/2&-1/2\end{bmatrix},\quad
\text{b) }\begin{bmatrix}7/23&-2/23\\-6/23&5/23\end{bmatrix},\quad
\text{c) }I,
$$

$$
\text{d) ingen invers},\qquad
\text{e) }\begin{bmatrix}-1/3&2/3\\2/3&-1/3\end{bmatrix}.
$$
`,
  },
  {
    id: "w2-rotation-matrices",
    title: "Opprett SO(2)-rotasjonsmatriser",
    source: "Tutorial - Linear Algebra and 2D Pose",
    sourcePage: 14,
    verification: "official",
    topics: [topic.so2, topic.frames],
    prompt: String.raw`
Calculate the rotation matrices for
$0$, $\pi/2$, $\pi$, $\pi/4$, $\pi/6$, $-\pi/3$, $\pi/18$ and $-2\pi/3$ radians.
`,
    solution: String.raw`
Sett hver vinkel inn i

$$R(\theta)=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}.$$

For $10^\circ$ brukes desimalverdiene $\cos10^\circ\approx0.985$ og $\sin10^\circ\approx0.174$.
`,
    answer: String.raw`
$$
\begin{aligned}
R(0)&=\begin{bmatrix}1&0\\0&1\end{bmatrix}, &
R(\pi/2)&=\begin{bmatrix}0&-1\\1&0\end{bmatrix},\\
R(\pi)&=\begin{bmatrix}-1&0\\0&-1\end{bmatrix}, &
R(\pi/4)&=\begin{bmatrix}\sqrt2/2&-\sqrt2/2\\\sqrt2/2&\sqrt2/2\end{bmatrix},\\
R(\pi/6)&=\begin{bmatrix}\sqrt3/2&-1/2\\1/2&\sqrt3/2\end{bmatrix}, &
R(-\pi/3)&=\begin{bmatrix}1/2&\sqrt3/2\\-\sqrt3/2&1/2\end{bmatrix},\\
R(\pi/18)&\approx\begin{bmatrix}0.985&-0.174\\0.174&0.985\end{bmatrix}, &
R(-2\pi/3)&=\begin{bmatrix}-1/2&\sqrt3/2\\-\sqrt3/2&-1/2\end{bmatrix}.
\end{aligned}
$$
`,
  },
  {
    id: "w2-apply-rotation",
    title: "Bytt koordinatramme med rotasjon",
    source: "Tutorial - Linear Algebra and 2D Pose",
    sourcePage: 15,
    verification: "official",
    topics: [topic.frames, topic.so2],
    prompt: String.raw`
1. Frame B is rotated relative to frame A by $\pi/4$. Point P is $[0,3]$ in A. Find P in B.
2. Frame Q is rotated relative to frame R by $\pi/2$. Point S is $[2,3]$ in R. Find S in Q.
3. Frame M is rotated relative to frame N by $\pi$. Point X is $[5,1]$ in M. Find X in N.
`,
    solution: String.raw`
Skriv først retningen. Når $\;{}^A R_B$ er kjent, men punktet skal gå fra A til B, brukes inversen:

$$ {}^B p=({}^A R_B)^{-1}{}^A p=({}^A R_B)^T{}^A p. $$

I oppgave 3 går punktet allerede fra M til N, så $\;{}^N p=({}^N R_M){}^M p$.
`,
    answer: String.raw`
$$
\text{1) }{}^B p=\begin{bmatrix}3\sqrt2/2\\3\sqrt2/2\end{bmatrix},\qquad
\text{2) }{}^Q s=\begin{bmatrix}3\\-2\end{bmatrix},\qquad
\text{3) }{}^N x=\begin{bmatrix}-5\\-1\end{bmatrix}.
$$
`,
  },
  {
    id: "w2-pose",
    title: "Rotasjon og translasjon i SE(2)",
    source: "Tutorial - Linear Algebra and 2D Pose",
    sourcePage: 17,
    verification: "official",
    topics: [topic.se2, topic.frames],
    prompt: String.raw`
For all cases, point P is $[2,3]$ in frame B. Determine P in frame A.

1. B is inside A at $[1,2]$ and rotated by $\pi/4$.
2. B is inside A at $[0,0]$ and rotated by $\pi/2$.
3. A is inside B at $[2,3]$ and rotated by $\pi$.
4. A is inside B at $[1,6]$ and rotated by $\pi$.
`,
    solution: String.raw`
Når B er gitt relativt til A:

$$ {}^A p={}^A R_B{}^B p+{}^A t_B. $$

Når A i stedet er gitt relativt til B, inverteres transformasjonen:

$$ {}^A p=({}^B R_A)^T({}^B p-{}^B t_A). $$
`,
    answer: String.raw`
$$
\text{1) }\begin{bmatrix}1-\sqrt2/2\\2+5\sqrt2/2\end{bmatrix}
\approx\begin{bmatrix}0.293\\5.536\end{bmatrix},\quad
\text{2) }\begin{bmatrix}-3\\2\end{bmatrix},\quad
\text{3) }\begin{bmatrix}0\\0\end{bmatrix},\quad
\text{4) }\begin{bmatrix}-1\\3\end{bmatrix}.
$$
`,
  },
];

const week3: Egb339Problem[] = [
  {
    id: "w3-rotation-matrices",
    title: "Rotasjoner om x-, y- og z-aksen",
    source: "Tutorial - 3D Pose",
    sourcePage: 6,
    verification: "official",
    topics: [topic.so3, topic.rotations3d, topic.frames],
    prompt: String.raw`
Create the matrices for:

1. $R_x(\pi/4)$
2. $R_z(3\pi/4)$
3. $R_y(\pi/2)$
4. $R_x(-\pi/2)$
5. $R_x(\pi/4)R_y(\pi/2)$
6. $R_y(\pi/2)R_x(\pi/4)$
7. $R_x(\pi/6)R_x(\pi/3)$

Finally, frame B's x-axis is parallel to A's z-axis, and B's y-axis is anti-parallel to A's y-axis. Construct $\;{}^A R_B$.
`,
    solution: String.raw`
Bruk standardmatrisene og behold rekkefølgen som står i oppgaven. Kolonnene i $\;{}^A R_B$ er aksene $\hat x_B,\hat y_B,\hat z_B$ uttrykt i A. Her er $\hat x_B=\hat z_A$, $\hat y_B=-\hat y_A$ og $\hat z_B=\hat x_B\times\hat y_B=\hat x_A$.

Merk: Den publiserte fasitsiden har et minustegn i etiketten til del 5, men resultatmatrisen svarer til den positive vinkelen i selve oppgaven. Løsningen her følger oppgaveteksten.
`,
    answer: String.raw`
$$
\begin{aligned}
1)&\;\begin{bmatrix}1&0&0\\0&\sqrt2/2&-\sqrt2/2\\0&\sqrt2/2&\sqrt2/2\end{bmatrix} &&
2)&\;\begin{bmatrix}-\sqrt2/2&-\sqrt2/2&0\\\sqrt2/2&-\sqrt2/2&0\\0&0&1\end{bmatrix}\\
3)&\;\begin{bmatrix}0&0&1\\0&1&0\\-1&0&0\end{bmatrix} &&
4)&\;\begin{bmatrix}1&0&0\\0&0&1\\0&-1&0\end{bmatrix}\\
5)&\;\begin{bmatrix}0&0&1\\\sqrt2/2&\sqrt2/2&0\\-\sqrt2/2&\sqrt2/2&0\end{bmatrix} &&
6)&\;\begin{bmatrix}0&\sqrt2/2&\sqrt2/2\\0&\sqrt2/2&-\sqrt2/2\\-1&0&0\end{bmatrix}\\
7)&\;\begin{bmatrix}1&0&0\\0&0&-1\\0&1&0\end{bmatrix} &&
{}^A R_B&=\begin{bmatrix}0&0&1\\0&-1&0\\1&0&0\end{bmatrix}.
\end{aligned}
$$
`,
  },
  {
    id: "w3-pose-transformations",
    title: "Fire SE(3)-transformasjoner",
    source: "Tutorial - 3D Pose",
    sourcePage: 8,
    sourcePageEnd: 9,
    verification: "official",
    topics: [topic.se3, topic.rotations3d, topic.frames],
    prompt: String.raw`
Point P is defined in frame B and must be transformed into frame A.

1. B is at $[2,0,0]$ in A. Rotate $\pi/4$ about x, then $\pi/4$ about the new y-axis. $\;{}^B p=[0,3,0]$.
2. A is at $[1,2,3]$ in B. Rotate $\pi/6$ about y, then $\pi/4$ about the old z-axis. $\;{}^B p=[2,0,2]$.
3. B is at $[1,1,1]$ in A. Rotate $\pi/2$ about x, then $\pi/2$ about the new z-axis, then $\pi/2$ about the new x-axis. $\;{}^B p=[0,5,3]$.
4. A is at the origin of B. Rotate $\pi/6$ about x, then $\pi/4$ about the old z-axis, then $\pi/3$ about the old y-axis. $\;{}^B p=[-1,-1,-1]$.
`,
    solution: String.raw`
Rotasjon om en **ny** akse postmultipliseres; rotasjon om en **gammel** akse premultipliseres.

1. $\;{}^A R_B=R_x(\pi/4)R_y(\pi/4)$ og $\;{}^A p={}^A t_B+{}^A R_B{}^B p$.
2. $\;{}^B R_A=R_z(\pi/4)R_y(\pi/6)$, og fordi A er gitt relativt til B brukes $\;{}^A p=({}^B R_A)^T({}^B p-{}^B t_A)$.
3. $\;{}^A R_B=R_x(\pi/2)R_z(\pi/2)R_x(\pi/2)$.
4. $\;{}^B R_A=R_y(\pi/3)R_z(\pi/4)R_x(\pi/6)$, etterfulgt av invers transformasjon.
`,
    answer: String.raw`
$$
\text{1) }{}^A p\approx\begin{bmatrix}2\\2.121\\2.121\end{bmatrix},\quad
\text{2) }{}^A p\approx\begin{bmatrix}-0.112\\-2.121\\-1.220\end{bmatrix},
$$

$$
\text{3) }{}^A p=\begin{bmatrix}4\\-4\\1\end{bmatrix},\quad
\text{4) }{}^A p\approx\begin{bmatrix}-0.448\\-1.520\\-0.700\end{bmatrix}.
$$
`,
  },
  {
    id: "w3-pose-graph",
    title: "Posegraf fra S til O",
    source: "Tutorial - 3D Pose",
    sourcePage: 15,
    verification: "official",
    topics: [topic.poseGraphs, topic.se3, topic.frames],
    prompt: String.raw`
For $\;{}^A T_B$ meaning the pose of B relative to A, you are given:

- $\;{}^O T_M$: translation $[0,5,0]$, rotation $R_z(\pi/2)$
- $\;{}^E T_S$: translation $[0,0,1]$, rotation $R_y(-\pi/2)$
- $\;{}^E T_M$: translation $[2,0,2]$, rotation $R_x(\pi/4)$

Point P is $[2,0,0]$ in S. Find P in O.
`,
    solution: String.raw`
Skript-rekkefølgen bestemmer kjeden. Vi må gå $S\rightarrow E\rightarrow M\rightarrow O$:

$$ {}^O p={}^O T_M({}^E T_M)^{-1}{}^E T_S{}^S p. $$

Mellomresultatene blir $\;{}^E p=[0,0,3]^T$ og $\;{}^M p=[-2,\sqrt2/2,\sqrt2/2]^T$.
`,
    answer: String.raw`
$$ {}^O p=\begin{bmatrix}-\sqrt2/2\\3\\\sqrt2/2\end{bmatrix}
\approx\begin{bmatrix}-0.707\\3\\0.707\end{bmatrix}. $$
`,
  },
];

const week4: Egb339Problem[] = [
  {
    id: "w4-static-transforms",
    title: "To statiske transformasjoner",
    source: "Tutorial - Forward Kinematics",
    sourcePage: 4,
    verification: "official",
    visual: "static-frames",
    topics: [topic.se2, topic.frames, topic.fk],
    prompt: String.raw`
Frame B ligger 10 enheter langs x-aksen til frame A. Frame C ligger 15 enheter langs y-aksen til B og er rotert $\pi/2$ mot klokken relativt til B.

1. Sett opp $\;{}^A T_B$.
2. Sett opp $\;{}^B T_C$.
3. Finn $\;{}^A T_C$.
`,
    solution: String.raw`
Hver 2D-transformasjon bygges som

$$T=\begin{bmatrix}R&t\\0&1\end{bmatrix}.$$

Transformasjonen fra C til A fås ved å følge kjeden fra høyre mot venstre:

$$ {}^A T_C={}^A T_B{}^B T_C. $$
`,
    answer: String.raw`
$$
{}^A T_B=\begin{bmatrix}1&0&10\\0&1&0\\0&0&1\end{bmatrix},\qquad
{}^B T_C=\begin{bmatrix}0&-1&0\\1&0&15\\0&0&1\end{bmatrix},
$$

$$
{}^A T_C=\begin{bmatrix}0&-1&10\\1&0&15\\0&0&1\end{bmatrix}.
$$
`,
  },
  {
    id: "w4-planar-chain",
    title: "Forward kinematics for en plan robot",
    source: "Tutorial - Forward Kinematics",
    sourcePage: 9,
    verification: "official",
    visual: "week4-arm",
    topics: [topic.chains, topic.fk, topic.se2],
    prompt: String.raw`
En plan robot har tre rotasjonsledd $q_1,q_3$ og ett prismatisk ledd $q_2$. Fra verdensrammen går kjeden gjennom:

- en translasjon på 8 langs x
- en fast rotasjon $\pi/4$ og leddrotasjonen $q_1$
- en translasjon på $5+q_2$ langs lokal x
- en fast rotasjon $-\pi/4$ og leddrotasjonen $q_3$
- en siste translasjon på 4 langs lokal x

Sett opp forward kinematics og finn endeposisjonen for a) $q=[0,0,0]$ og b) $q=[\pi/3,2,-\pi/6]$.
`,
    solution: String.raw`
Skriv én transformasjon for hvert trinn, i samme rekkefølge som man går fra basen til endeeffektoren:

$$
{}^0T_E=\operatorname{Trans}(8,0)R(\pi/4+q_1)
\operatorname{Trans}(5+q_2,0)R(-\pi/4+q_3)
\operatorname{Trans}(4,0).
$$

Endeposisjonen er de to øverste elementene i siste kolonne. For b) blir den samlede vinkelen i det siste leddet $\pi/4+\pi/3-\pi/4-\pi/6=\pi/6$.
`,
    answer: String.raw`
$$p(0,0,0)=\begin{bmatrix}8+5/\sqrt2+4\\5/\sqrt2\end{bmatrix}
\approx\begin{bmatrix}15.536\\3.536\end{bmatrix}.$$

$$p(\pi/3,2,-\pi/6)\approx\begin{bmatrix}9.652\\8.761\end{bmatrix}.$$
`,
  },
  {
    id: "w4-prac-connect",
    title: "Practical: styr roboten fra Python",
    source: "Week 4 Prac - Forward kinematics",
    sourcePage: 1,
    verification: "open",
    topics: [topic.fk, topic.chains],
    prompt: String.raw`
Åpne den oppgitte CoppeliaSim-scenen og kjør Python-skriptet som kobler seg til roboten. Send minst tre forskjellige leddkonfigurasjoner til roboten, med ventetid mellom konfigurasjonene, og observer bevegelsen.
`,
    solution: String.raw`
Dette er en observasjonsoppgave. Kontroller at CoppeliaSim viser **SIMULATION RUNNING**, at terminalen bekrefter tilkobling til remote API, og at alle tre konfigurasjonene faktisk gir forskjellige robotstillinger. Bruk radianer dersom API-et forventer radianer.
`,
    answer: String.raw`
Ingen unik tallfasit. Et korrekt resultat er tre tydelig forskjellige, gyldige robotstillinger uten tilkoblings- eller joint-feil.
`,
  },
  {
    id: "w4-prac-teach",
    title: "Practical: bruk teach-GUI-et",
    source: "Week 4 Prac - Forward kinematics",
    sourcePage: 2,
    verification: "open",
    topics: [topic.fk, topic.chains],
    prompt: String.raw`
Kjør det oppgitte teach-skriptet og bruk sliderne til å endre robotens tre fysiske leddvinkler. Sammenlign sliderverdiene med robotens konfigurasjon i CoppeliaSim.
`,
    solution: String.raw`
GUI-et og simulatoren må kjøres samtidig. Sliderne representerer de fysiske vinklene $\theta_1,\theta_2,\theta_3$, mens en kinematisk modell kan bruke et annet sett $q$. Observer derfor både fortegn, nullstilling og hvilke lenker som beveger seg sammen.
`,
    answer: String.raw`
Ingen unik tallfasit. Sliderne skal flytte de tilsvarende leddene kontinuerlig, og roboten skal følge uten at Python-prosessen stopper.
`,
  },
  {
    id: "w4-prac-display-fk",
    title: "Practical: beregn posisjonen i display_fk()",
    source: "Week 4 Prac - Forward kinematics",
    sourcePage: 2,
    verification: "derived",
    topics: [topic.fk, topic.chains],
    prompt: String.raw`
Fullfør funksjonen **display_fk()** slik at GUI-et viser endeeffektorens $(x,y,z)$-posisjon. Bruk robotdimensjonene

$$L_0=138,\;L_1=135,\;L_2=147,\;L_3=60,\;L_4=80\ \text{mm}.$$

Resultatet som vises i GUI-et skal være i meter.
`,
    solution: String.raw`
Projiser først armen inn i det radielle planet. Med de kinematiske vinklene i skriptet er horisontal radius

$$r=L_1\sin q_2+L_2\cos q_3+L_3.$$

Baseleddet roterer denne radiusen rundt z-aksen:

$$x=r\cos q_1,\qquad y=r\sin q_1.$$

Høyden er

$$z=L_0+L_1\cos q_2-L_2\sin q_3-L_4.$$

Del alle tre komponentene på 1000 før de formateres i GUI-et.
`,
    answer: String.raw`
$$
p=\frac1{1000}\begin{bmatrix}
(L_1\sin q_2+L_2\cos q_3+L_3)\cos q_1\\
(L_1\sin q_2+L_2\cos q_3+L_3)\sin q_1\\
L_0+L_1\cos q_2-L_2\sin q_3-L_4
\end{bmatrix}\ \text{m}.
$$
`,
  },
  {
    id: "w4-prac-cylinder",
    title: "Practical: sylinderen og E-tasten",
    source: "Week 4 Prac - Forward kinematics",
    sourcePage: 3,
    verification: "open",
    topics: [topic.fk, topic.chains],
    prompt: String.raw`
Bruk teach-GUI-et til å plassere endeeffektoren manuelt på toppen av den grå sylinderen. Noter hvor lang tid du brukte og leddvinklene. Gjenta deretter for E-tasten på tastaturet i scenen.
`,
    solution: String.raw`
Dette er i praksis inverse kinematics løst manuelt. Juster først basevinkelen mot sylinderen, deretter skulder og albue for radius og høyde. Flere leddkonfigurasjoner kan gi samme punkt, så noter både vinklene og hvilken albuegren du brukte.
`,
    answer: String.raw`
Ingen universell tallfasit: vinklene avhenger av objektplasseringen, toleransen og valgt IK-gren. Leveransen er de to tidsmålingene og de to leddkonfigurasjonene du observerer i din scene.
`,
  },
];

const week5: Egb339Problem[] = [
  {
    id: "w5-two-link-ik",
    title: "Utled inverse kinematics for en 2R-arm",
    source: "Tutorial - Inverse Kinematics",
    sourcePage: 16,
    verification: "derived",
    visual: "two-link-arm",
    topics: [topic.ik, topic.ikBranches, topic.atan2],
    prompt: String.raw`
Bruk en geometrisk metode til å utlede inverse kinematics for en plan 2R-arm med lenkelengder $L_1,L_2$ og målpunkt $p=(x,y)$. Ta med begge mulige løsninger.
`,
    solution: String.raw`
Fra cosinussetningen:

$$c_2=\frac{x^2+y^2-L_1^2-L_2^2}{2L_1L_2},\qquad
q_2=\operatorname{atan2}(\pm\sqrt{1-c_2^2},c_2).$$

For hver gren beregnes

$$q_1=\operatorname{atan2}(y,x)-
\operatorname{atan2}(L_2\sin q_2,L_1+L_2\cos q_2).$$

Fortegnet foran kvadratroten gir albue-opp og albue-ned. Et punkt har ingen reell løsning dersom $|c_2|>1$.
`,
    answer: String.raw`
$$
q_2=\operatorname{atan2}\left(\pm\sqrt{1-c_2^2},c_2\right),\qquad
q_1=\operatorname{atan2}(y,x)-\operatorname{atan2}(L_2\sin q_2,L_1+L_2\cos q_2),
$$

der $c_2=(x^2+y^2-L_1^2-L_2^2)/(2L_1L_2)$.
`,
  },
  {
    id: "w5-two-link-targets",
    title: "Beregn leddvinkler for tre målpunkt",
    source: "Tutorial - Inverse Kinematics",
    sourcePage: 17,
    verification: "derived",
    visual: "two-link-arm",
    topics: [topic.ik, topic.ikBranches, topic.atan2],
    prompt: String.raw`
Bruk IK-ligningene fra forrige oppgave for en 2R-arm med $L_1=5$ og $L_2=7$. Finn leddvinklene for:

1. $p=(5,7)$
2. $p=(5.347,10.297)$
3. $p=(10.508,-2.925)$

Finn også den andre IK-løsningen for hvert punkt.
`,
    solution: String.raw`
Beregn først $c_2$ og bruk begge fortegn i uttrykket for $q_2$. Sett deretter hver $q_2$-gren inn i atan2-uttrykket for $q_1$. Kontroller ved å sette vinklene tilbake i forward kinematics.
`,
    answer: String.raw`
Vinkler i radianer:

1. $(q_1,q_2)=(0,\pi/2)$ eller $(1.9011,-\pi/2)$
2. $(0.7854,0.5237)$ eller $(1.3983,-0.5237)$
3. $(-0.7856,0.8731)$ eller $(0.2427,-0.8731)$
`,
  },
  {
    id: "w5-mixed-joint-ik",
    title: "IK med prismatisk og roterende ledd",
    source: "Tutorial - Inverse Kinematics",
    sourcePage: 18,
    verification: "derived",
    visual: "mixed-joint-arm",
    topics: [topic.ik, topic.ikBranches, topic.atan2],
    prompt: String.raw`
En plan robot har først et prismatisk ledd $q_1$ langs en akse rotert $45^\circ$, etterfulgt av et rotasjonsledd $q_2$ og en lenke på 7. Finn alle IK-løsninger for:

1. $p=(0,9.899)$
2. $p=(8.883,0.310)$
3. $p=(11.086,12.805)$
`,
    solution: String.raw`
Roter målet $-45^\circ$ inn i robotens lokale koordinater:

$$x'=\frac{x+y}{\sqrt2},\qquad y'=\frac{-x+y}{\sqrt2}.$$

Da beskrives punktet av

$$x'=q_1+7\cos q_2,\qquad y'=7\sin q_2.$$

Dermed er $q_2=\arcsin(y'/7)$ eller $\pi-\arcsin(y'/7)$, og $q_1=x'-7\cos q_2$. Kontroller eventuelle grenser på det prismatiske leddet etterpå.
`,
    answer: String.raw`
Avrundet:

1. $(q_1,q_2)\approx(7,\pi/2)$
2. $(3,-\pi/3)$ eller $(10,4\pi/3)$
3. $(10,\pi/18)$ eller $(23.787,17\pi/18)$
`,
  },
];

const week6: Egb339Problem[] = [
  {
    id: "w6-derivatives",
    title: "Derivasjonsoppvarming",
    source: "Week 6 Tutorial - Robot Jacobian",
    sourcePage: 6,
    verification: "official",
    topics: [topic.derivatives, topic.jacobian],
    prompt: String.raw`
Deriver med hensyn på $x$:

1. $4x^2$
2. $3\sin(2x)$
3. $(2x^3)(4x)$
4. $4x(3x^2+4)$
5. $5x^4-3\cos x+2x(x^3+2x)$
6. $x^2+2\cos x+2x(x^3+2x)$
7. $x^2(2\sin x+5x)$
`,
    solution: String.raw`
Bruk potensregelen, kjerneregelen og produktregelen. Eksempel:

$$\frac{d}{dx}(3\sin(2x))=3\cos(2x)\cdot2=6\cos(2x),$$

og

$$\frac{d}{dx}\bigl(x^2(2\sin x+5x)\bigr)
=2x(2\sin x+5x)+x^2(2\cos x+5).$$

Den publiserte fasiten ser ut til å mangle faktoren 2 inne i cosinus i oppgave 2. Resultatet her følger kjerneregelen.
`,
    answer: String.raw`
$$
\begin{aligned}
1)&\;8x\\
2)&\;6\cos(2x)\\
3)&\;32x^3\\
4)&\;36x^2+16\\
5)&\;28x^3+3\sin x+8x\\
6)&\;8x^3+10x-2\sin x\\
7)&\;15x^2+4x\sin x+2x^2\cos x.
\end{aligned}
$$
`,
  },
  {
    id: "w6-jacobian",
    title: "Jacobianen til en 2R-arm",
    source: "Week 6 Tutorial - Robot Jacobian",
    sourcePage: 10,
    verification: "official",
    visual: "two-link-arm",
    topics: [topic.jacobian, topic.derivatives, topic.differential],
    prompt: String.raw`
For en plan 2R-arm er

$$
p(q)=\begin{bmatrix}
L_1\cos q_1+L_2\cos(q_1+q_2)\\
L_1\sin q_1+L_2\sin(q_1+q_2)
\end{bmatrix}.
$$

Finn Jacobianen $J=\partial p/\partial q$. Evaluer den for $L_1=5$, $L_2=7$ og $q_1=q_2=\pi/4$, og finn endeposisjonen.
`,
    solution: String.raw`
Hver kolonne er den partiellderiverte av posisjonen med hensyn på ett ledd:

$$
J(q)=\begin{bmatrix}
-L_1\sin q_1-L_2\sin(q_1+q_2)&-L_2\sin(q_1+q_2)\\
L_1\cos q_1+L_2\cos(q_1+q_2)&L_2\cos(q_1+q_2)
\end{bmatrix}.
$$
`,
    answer: String.raw`
$$
J(\pi/4,\pi/4)\approx
\begin{bmatrix}-10.5355&-7\\3.5355&0\end{bmatrix},
\qquad
p_0\approx\begin{bmatrix}3.5355\\10.5355\end{bmatrix}.
$$
`,
  },
  {
    id: "w6-differential-motion",
    title: "Fra leddhastighet til endeeffektorhastighet",
    source: "Week 6 Tutorial - Robot Jacobian",
    sourcePage: 10,
    verification: "official",
    topics: [topic.jacobian, topic.differential, topic.fk],
    prompt: String.raw`
Bruk samme robot og startkonfigurasjon som i forrige oppgave.

1. For $\dot q=(0.5,0.5)$ rad/s: finn $\dot p$, og estimer posisjonen etter $0.2$ s både med $p_0+\dot p\Delta t$ og med eksakt FK av $q_0+\dot q\Delta t$.
2. Finn $\dot q$ som gir $\dot p=(0,1)$, og estimer posisjonen etter $0.5$ s med begge metodene.
`,
    solution: String.raw`
Fremover brukes

$$\dot p=J(q_0)\dot q.$$

Bakover løses

$$\dot q=J(q_0)^{-1}\dot p$$

siden Jacobianen her er kvadratisk og ikke-singulær. Den lineære oppdateringen holder $J$ konstant gjennom hele tidssteget, mens FK-oppdateringen tar med at Jacobianen endrer seg når roboten beveger seg.
`,
    answer: String.raw`
1. $\dot p\approx(-8.7678,1.7678)$. Lineært: $p\approx(1.7819,10.8891)$. Med oppdatert $q$ og FK: $p\approx(1.1137,10.7310)$.

2. $\dot q\approx(0.28284,-0.42570)$. Lineært: $p\approx(3.5355,11.0355)$. Med FK: $p\approx(3.5015,10.9807)$.
`,
  },
  {
    id: "w6-sympy-jacobian",
    title: "Utvidelse: la SymPy derivere Jacobianen",
    source: "Week 6 Tutorial - Robot Jacobian",
    sourcePage: 11,
    verification: "derived",
    topics: [topic.jacobian, topic.derivatives],
    prompt: String.raw`
Bruk symbolsk matematikk til å opprette posisjonsvektoren til 2R-armen og generere Jacobianen automatisk. Sammenlign med den manuelle utledningen.
`,
    solution: String.raw`
~~~python
import sympy as sp

q1, q2, L1, L2 = sp.symbols("q1 q2 L1 L2", real=True)
p = sp.Matrix([
    L1 * sp.cos(q1) + L2 * sp.cos(q1 + q2),
    L1 * sp.sin(q1) + L2 * sp.sin(q1 + q2),
])
J = sp.simplify(p.jacobian([q1, q2]))
sp.pprint(J)
~~~

SymPy lager én kolonne per variabel i listen som sendes til **jacobian**.
`,
    answer: String.raw`
Resultatet er den samme $2\times2$-matrisen som i den manuelle Jacobian-utledningen.
`,
  },
];

const week7: Egb339Problem[] = [
  {
    id: "w7-cartesian-interpolation",
    title: "Interpolasjon i kartesisk rom",
    source: "Week 7 Tutorial - Motion Planning",
    sourcePage: 5,
    verification: "official",
    visual: "two-link-arm",
    topics: [topic.interpolation, topic.ik, topic.ikBranches],
    prompt: String.raw`
En 2R-arm med $L_1=2$ og $L_2=1.5$ skal bevege endeeffektoren i en rett linje fra $(0.75,0.5)$ til $(0.75,-0.5)$. Lag fem jevnt fordelte kartesiske veipunkter og finn begge IK-grenene ved hvert punkt.
`,
    solution: String.raw`
Med fem punkter brukes $s=0,0.25,0.5,0.75,1$ i

$$p(s)=(1-s)p_0+sp_f.$$

For hvert punkt brukes 2R-formlene. Hold samme fortegn på $q_2$ gjennom hele banen dersom roboten ikke skal bytte albuegren.
`,
    answer: String.raw`
Veipunktene er $(0.75,0.5)$, $(0.75,0.25)$, $(0.75,0)$, $(0.75,-0.25)$ og $(0.75,-0.5)$.

$$
\begin{array}{c|c|c}
p&(q_1,q_2),\ q_2>0&(q_1,q_2),\ q_2<0\\\hline
(0.75,0.50)&(-0.19,2.71)&(1.37,-2.71)\\
(0.75,0.25)&(-0.40,2.79)&(1.04,-2.79)\\
(0.75,0)&(-0.69,2.82)&(0.69,-2.82)\\
(0.75,-0.25)&(-1.04,2.79)&(0.40,-2.79)\\
(0.75,-0.50)&(-1.37,2.71)&(0.19,-2.71)
\end{array}
$$
`,
  },
  {
    id: "w7-joint-interpolation",
    title: "Interpolasjon i leddrom",
    source: "Week 7 Tutorial - Motion Planning",
    sourcePage: 7,
    verification: "official",
    topics: [topic.interpolation, topic.fk, topic.ikBranches],
    prompt: String.raw`
Bruk de samme start- og sluttpunktene som i forrige oppgave. Velg den konsistente IK-grenen med positiv $q_2$, interpoler fem punkter lineært i leddrom og bruk FK til å finne banen til endeeffektoren. Sammenlign med kartesisk interpolasjon.
`,
    solution: String.raw`
Interpoler hver leddvinkel separat:

$$q(s)=(1-s)q_0+sq_f.$$

Her er $q_2$ lik i start og slutt, mens $q_1$ endres lineært. FK viser at en rett linje i leddrom generelt **ikke** blir en rett linje i arbeidsrommet.
`,
    answer: String.raw`
$$
q\approx(-0.19,2.71),\ (-0.49,2.71),\ (-0.78,2.71),\ (-1.07,2.71),\ (-1.37,2.71).
$$

FK gir omtrent

$$p=(0.75,0.50),\ (0.86,0.26),\ (0.90,0),\ (0.86,-0.26),\ (0.75,-0.50).$$

Banen buer mot høyre i stedet for å følge $x=0.75$.
`,
  },
  {
    id: "w7-motion-profile",
    title: "Integrer en trapesprofil",
    source: "Week 7 Tutorial - Motion Planning",
    sourcePage: 9,
    verification: "official",
    visual: "motion-profile",
    topics: [topic.profiles, topic.interpolation],
    prompt: String.raw`
Et legeme starter i ro. Akselerasjonen er $1.5$ m/s² fra 0 til 2 s, 0 fra 2 til 5 s og $-1$ m/s² fra 5 til 8 s. Tegn akselerasjon, hastighet og posisjon. Finn tilbakelagt strekning ved $t=6$ s og $t=8$ s.
`,
    solution: String.raw`
Integrer stykkevis og sørg for kontinuitet mellom intervallene. Ved $t=2$ er $v=3$ m/s og $s=3$ m. Konstant hastighet fram til $t=5$ gir $s(5)=12$ m. Deretter, med $\tau=t-5$,

$$v=3-\tau,\qquad s=12+3\tau-\frac12\tau^2.$$
`,
    answer: String.raw`
$$
a(t)=\begin{cases}1.5&0\le t<2\\0&2\le t<5\\-1&5\le t\le8\end{cases}
$$

$$s(6)=14.5\ \text{m},\qquad s(8)=16.5\ \text{m}.$$
`,
  },
  {
    id: "w7-point-segment-distance",
    title: "Avstand fra hindringer til et linjesegment",
    source: "Week 7 Tutorial - Motion Planning",
    sourcePage: 12,
    verification: "official",
    visual: "point-segment",
    topics: [topic.distance, topic.interpolation],
    prompt: String.raw`
For linjesegmentet fra $A=(1,1)$ til $B=(3,2.7)$, finn korteste avstand til de fem markerte hindringspunktene $(0.5,2.8)$, $(1.5,0.5)$, $(2.5,3)$, $(2.7,2.1)$ og $(0.9,0.9)$.
`,
    solution: String.raw`
For et punkt $O$ projiseres det først på den uendelige linjen:

$$t=\frac{(O-A)\cdot(B-A)}{\|B-A\|^2}.$$

Klem så $t$ til intervallet $[0,1]$, beregn nærmeste punkt $C=A+t(B-A)$, og bruk $d=\|O-C\|$. Klemmingen er avgjørende: ellers måles avstand til linjen, ikke nødvendigvis til segmentet.
`,
    answer: String.raw`
Avstandene, i samme rekkefølge som punktene i oppgaven, er omtrent $1.695$, $0.705$, $0.552$, $0.263$ og $0.141$.
`,
  },
  {
    id: "w7-robot-clearance",
    title: "Utvidelse: minste avstand fra en robot til et hinder",
    source: "Week 7 Tutorial - Motion Planning",
    sourcePage: 13,
    verification: "derived",
    topics: [topic.distance, topic.fk, topic.chains],
    prompt: String.raw`
Utvid punkt-til-segment-metoden til en plan robotarm. Gitt posisjonene til alle leddene fra forward kinematics og ett punktformet hinder, finn minste avstand fra hele roboten til hinderet.
`,
    solution: String.raw`
~~~python
import numpy as np

def point_segment_distance(point, start, end):
    segment = end - start
    length_sq = segment @ segment
    if np.isclose(length_sq, 0.0):
        return np.linalg.norm(point - start)
    t = ((point - start) @ segment) / length_sq
    t = np.clip(t, 0.0, 1.0)
    closest = start + t * segment
    return np.linalg.norm(point - closest)

def robot_clearance(joint_positions, obstacle):
    return min(
        point_segment_distance(obstacle, a, b)
        for a, b in zip(joint_positions[:-1], joint_positions[1:])
    )
~~~
`,
    answer: String.raw`
Robotens punktavstand er minimum av avstanden til hvert lenkesegment. For en robot og et hinder med utstrekning må robot- og hinderradius trekkes fra denne senterlinjeavstanden.
`,
  },
];

const week8: Egb339Problem[] = [
  {
    id: "w8-load-image",
    title: "Task 1: les og inspiser highway-bildet",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 1,
    verification: "derived",
    visual: "highway",
    topics: [topic.images],
    prompt: String.raw`
Les **highway.jpg** med Machine Vision Toolbox og finn bildets bredde og høyde.
`,
    solution: String.raw`
~~~python
from machinevisiontoolbox import Image

img = Image.Read("highway.jpg")
print(img.width, img.height)
~~~

Machine Vision Toolbox oppgir bredde før høyde. Som ekstrakontroll har det underliggende NumPy-arrayet form $(1536,2048)$ fordi NumPy bruker rad før kolonne.
`,
    answer: String.raw`
Bildet er $2048\times1536$ piksler: bredde 2048 og høyde 1536.
`,
  },
  {
    id: "w8-pixel-range",
    title: "Task 2: intensitetsområde",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 1,
    verification: "derived",
    topics: [topic.images, topic.histograms],
    prompt: String.raw`
Finn minste og største pikselintensitet i bildet. Sammenlign med verdiene du observerer ved å holde musepekeren over mørke og lyse områder.
`,
    solution: String.raw`
~~~python
pixels = img.array
img.disp(block=True)
print(pixels.min(), pixels.max())
~~~

Musavlesning viser bare valgte enkeltpiksler; **min()** og **max()** undersøker hele bildet.
`,
    answer: String.raw`
Eksakte verdier i det utdelte bildet er minimum $0$ og maksimum $255$.
`,
  },
  {
    id: "w8-histogram",
    title: "Task 3: histogram og dynamikkområde",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 1,
    verification: "derived",
    topics: [topic.histograms, topic.images],
    prompt: String.raw`
Tegn bildehistogrammet. Finn området med flest piksler og forklar hva histogrammet sier om kontrasten i bildet.
`,
    solution: String.raw`
~~~python
hist = img.hist()
hist.plot()
~~~

Histogrammet teller hvor mange piksler som har hver gråtone. Sammenlign toppene med store regioner i bildet, som vei, himmel og mørke strukturer.
`,
    answer: String.raw`
Hovedmassen ligger omtrent i området 80–120, med høyeste enkeltbin rundt intensitet 100. Samtidig strekker histogrammet seg fra 0 til 255, så bildet bruker hele det tilgjengelige 8-bits dynamikkområdet.
`,
  },
  {
    id: "w8-line-profiles",
    title: "Task 4: rad- og kolonneprofiler",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 2,
    verification: "derived",
    topics: [topic.images, topic.histograms],
    prompt: String.raw`
Plott intensitetsprofilen langs kolonne $u=1155$ og rad $v=1280$. Identifiser hvilke strukturer i bildet som lager store sprang i profilene.
`,
    solution: String.raw`
~~~python
import matplotlib.pyplot as plt

plt.plot(img.array[:, 1155])   # alle v ved fast u
plt.figure()
plt.plot(img.array[1280, :])   # alle u ved fast v
plt.show()
~~~

Den svake stigningen før $v=1000$ skyldes at himmelen gradvis blir lysere nedover. De første markerte toppene kommer når kolonnen krysser de lyse armene og lampene på gatelysene. Gruppen rundt $v=1000$–$1130$ går gjennom tette strukturer ved horisonten, kjøretøy, rekkverk og vei; både svært lyse flater og mørke skygger gir store sprang.
`,
    answer: String.raw`
Kolonne 1155 går fra omtrent 14 til 255. De første fire tydelige toppene er gatelys, mens den neste gruppen er objektene rundt horisont/vei. Rad 1280 krysser blant annet veidekke, kjørefeltmarkeringer, barrierer og rekkverk, og får derfor flere tydelige topper.
`,
  },
  {
    id: "w8-crop-tile",
    title: "Task 5: beskjær og flislegg trafikkskiltet",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 2,
    verification: "derived",
    topics: [topic.images, topic.imageOps],
    prompt: String.raw`
Beskjær trafikkskiltet fra highway-bildet ved hjelp av **Image**-indeksering, og lag et $10\times10$ mønster av utsnittet.
`,
    solution: String.raw`
~~~python
import numpy as np
from machinevisiontoolbox import Image

sign = img[615:765, 840:915]  # Image bruker (u, v)
tiled = Image(np.tile(sign.array, (10, 10)))
tiled.disp(block=True)
~~~

Koordinatene kan justeres litt dersom du ønsker mer luft rundt skiltet.
`,
    answer: String.raw`
Et egnet utsnitt er omtrent $u=615{:}765$, $v=840{:}915$. Resultatet skal vise 100 kopier av skiltutsnittet i et $10\times10$ rutenett.
`,
  },
  {
    id: "w8-edit-region",
    title: "Task 6: endre et bildeområde",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 2,
    verification: "derived",
    topics: [topic.images, topic.imageOps],
    prompt: String.raw`
Sett alle pikslene i skiltområdet til intensitet 200 uten å endre originalbildet.
`,
    solution: String.raw`
~~~python
from machinevisiontoolbox import Image

edited_pixels = img.array.copy()
edited_pixels[840:915, 615:765] = 200  # NumPy bruker [v, u]
edited = Image(edited_pixels)
edited.disp(block=True)
~~~

Kopien hindrer at det opprinnelige arrayet muteres.
`,
    answer: String.raw`
Det nye bildet skal ha et jevnt grått rektangel med verdi 200 der skiltet var, mens **img** fortsatt er uendret.
`,
  },
  {
    id: "w8-image-operations",
    title: "Task 7: geometriske og monadiske operasjoner",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 3,
    verification: "derived",
    topics: [topic.imageOps, topic.images],
    prompt: String.raw`
Lag varianter av bildet ved å speile horisontalt og vertikalt, lage negativ, subsample og henholdsvis øke og redusere intensiteten med 100. Unngå overflow for **uint8**.
`,
    solution: String.raw`
~~~python
pixels = img.array

horizontal = pixels[:, ::-1]
vertical = pixels[::-1, :]
negative = 255 - pixels
subsampled = pixels[::4, ::4]
brighter = np.clip(pixels.astype(np.int16) + 100, 0, 255).astype(np.uint8)
darker = np.clip(pixels.astype(np.int16) - 100, 0, 255).astype(np.uint8)
~~~

Konverter til en signert datatype før addisjon/subtraksjon; ellers vil 8-bits heltall rulle rundt ved 0 og 255.
`,
    answer: String.raw`
Speiling endrer plassering, negativet mapper $I\mapsto255-I$, subsampling gir hver fjerde rad og kolonne, og de to siste variantene klippes korrekt til intervallet $[0,255]$.
`,
  },
  {
    id: "w8-synthetic-images",
    title: "Task 8: lag syntetiske bilder med NumPy",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 3,
    verification: "derived",
    topics: [topic.images, topic.imageOps],
    prompt: String.raw`
Lag tre $10\times10$ gråtonebilder: a) konstant intensitet 0.5, b) 0.5 med et lyst $2\times2$ sentrum på 0.9, og c) en intensitet som øker kvadratisk med koordinatene.
`,
    solution: String.raw`
~~~python
import numpy as np
from machinevisiontoolbox import Image

a = np.full((10, 10), 0.5)
b = a.copy()
b[4:6, 4:6] = 0.9

v, u = np.mgrid[0:10, 0:10]
c = (u**2 + v**2) / 200

Image(a).disp()
Image(b).disp()
Image(c).disp(block=True)
~~~
`,
    answer: String.raw`
Bildene skal vise henholdsvis en jevn grå flate, en lys $2\times2$ blokk i sentrum og en jevnt økende kvadratisk gradient mot nederste høyre hjørne.
`,
  },
];

const problemsByWeek: Record<number, Egb339Problem[]> = {
  1: [],
  2: week2,
  3: week3,
  4: week4,
  5: week5,
  6: week6,
  7: week7,
  8: week8,
};

export function getEgb339ProblemsForWeek(week: number): Egb339Problem[] {
  return problemsByWeek[week] ?? [];
}

export function getEgb339ProblemCount(week: number): number {
  return getEgb339ProblemsForWeek(week).length;
}
