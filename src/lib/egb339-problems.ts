import { getEgb339AssessmentSolution } from "./egb339-assessment-solutions";

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
  verification: "official" | "corrected" | "derived" | "open";
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
### Fremgangsmåte

Kontroller at vektorene har like mange komponenter. Gang sammen komponentene som står på samme plass, og summer. Resultatet er **ett tall**, ikke en vektor:

$$a\cdot b=\sum_i a_i b_i.$$

1. $2(1)+0(7)=2+0=2$. Nullkomponenten bidrar ikke.
2. $3(2)+1(2)=6+2=8$.
3. $3(6)+1(2)+4(1)=18+2+4=24$. Her må alle tre leddene tas med.
4. $3(5)+5(1)=15+5=20$.

### Kontroll

For 1D-arrays i NumPy gir **a @ b** skalarproduktet. **a * b** gir bare de parvise produktene; disse må summeres for å få samme svar.
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
### 1. Kontroller dimensjonene

Regelen er $(m\times n)(n\times p)\rightarrow(m\times p)$. De indre dimensjonene må passe; de ytre bestemmer svarets størrelse. Hvert element er rad mot kolonne: $C_{ij}=\sum_k A_{ik}B_{kj}$.

### 2. Regn ut alle elementene

I a) blir $(2\times2)(2\times2)$ en $2\times2$-matrise:

$$
C=\begin{bmatrix}2\cdot1+2\cdot2&2\cdot6+2\cdot3\\2\cdot1+2\cdot2&2\cdot6+2\cdot3\end{bmatrix}
=\begin{bmatrix}6&18\\6&18\end{bmatrix}.
$$

I b) blir $(2\times1)(1\times2)$ en $2\times2$-matrise, et **ytre produkt**, ikke et skalarprodukt:

$$
C=\begin{bmatrix}1\cdot2&1\cdot0\\7\cdot2&7\cdot0\end{bmatrix}
=\begin{bmatrix}2&0\\14&0\end{bmatrix}.
$$

I c) blir $(2\times3)(3\times1)$ en $2\times1$-kolonne:

$$
C=\begin{bmatrix}3\cdot6+1\cdot1+4\cdot3\\2\cdot6+2\cdot1+5\cdot3\end{bmatrix}
=\begin{bmatrix}18+1+12\\12+2+15\end{bmatrix}=\begin{bmatrix}31\\29\end{bmatrix}.
$$

### Kontroll

Bruk **A @ B**, og kontroller både tallene og **shape**. I b) må vektorene ha form **(2,1)** og **(1,2)**; to flate arrays ville gitt skalarprodukt.
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
    verification: "corrected",
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
### Fremgangsmåte

Transponering flytter element $(i,j)$ til $(j,i)$, uten å endre verdien. En $m\times n$-matrise blir $n\times m$. Les hver opprinnelig **rad** som en ny **kolonne**:

| Del | Rader som blir kolonner | Ny størrelse |
|---|---|---|
| a | $(1,2)$ og $(3,4)$ | $2\times2$ |
| b | $(5,2)$ og $(6,7)$ | $2\times2$ |
| c | $(3,7,2)$, $(3,4,1)$ og $(2,9,1)$ | $3\times3$ |
| d | En kolonne med 1 og 7 blir raden $(1,7)$ | $1\times2$ |
| e | $(3,1,4)$ og $(2,2,5)$ blir to kolonner | $3\times2$ |

Eksempel e): første nye rad er de første elementene fra de to gamle radene, $(3,2)$. Neste blir $(1,2)$, og siste $(4,5)$. Dette gir matrisen i svarboksen.

### Kontroll og kildeavvik

Transponer én gang til: $(A^T)^T=A$. I NumPy brukes **A.T**. En flat array med form **(2,)** blir ikke en radmatrise ved transponering; bruk **reshape(2,1)** hvis oppgaven krever en kolonne.

> [!warning] QUT-fasiten, side 1
> Del e) viser $(1,1)$ i andre rad, men oppgavearket side 9 har 2 som midterste element i andre rad. Derfor er $(1,2)$ riktig. Vi beholder oppgaveteksten og det korrekte transponatet.
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
### 1. Finn determinanten før du deler

Inversen skal oppheve matrisens virkning: $AA^{-1}=I$. For $A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$ gjelder

$$A^{-1}=\frac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}$$

når determinanten $ad-bc\neq0$. Bytt diagonalverdiene, skift fortegn på de to andre, og del **hele** matrisen på determinanten.

### 2. Sett inn for hver matrise

1. a): $\det A=1\cdot4-2\cdot3=-2$. Dermed $A^{-1}=(-1/2)\begin{bmatrix}4&-2\\-3&1\end{bmatrix}$.
2. b): $\det B=5\cdot7-2\cdot6=23$. Dermed $B^{-1}=(1/23)\begin{bmatrix}7&-2\\-6&5\end{bmatrix}$.
3. c): $\det I=1$. Identitetsmatrisen endrer ingenting og er sin egen invers.
4. d): $\det D=2\cdot2-2\cdot2=0$. De like radene gjør matrisen singulær. Stopp her; divisjon med null er ikke en løsning.
5. e): $\det E=1\cdot1-2\cdot2=-3$. Dermed $E^{-1}=(-1/3)\begin{bmatrix}1&-2\\-2&1\end{bmatrix}$.

### Kontroll

For a) er øvre venstre element i $AA^{-1}$ lik $1(-2)+2(3/2)=1$, og øvre høyre er $1(1)+2(-1/2)=0$. De øvrige elementene gir nederste rad $(0,1)$. Tilsvarende skal **np.allclose(A @ np.linalg.inv(A), np.eye(2))** være sann for de fire inverterbare matrisene. Elementvis **1/A** er ikke en matriseinvers.
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
### 1. Bruk én konvensjon

Positiv vinkel betyr mot klokken. Første kolonne er den roterte x-aksen og andre kolonne den roterte y-aksen. Derfor setter vi hver vinkel inn i

$$R(\theta)=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}.$$

### 2. Finn sinus og cosinus

| Vinkel | Grader | $\cos\theta$ | $\sin\theta$ |
|---|---|---|---|
| $0$ | 0 | 1 | 0 |
| $\pi/2$ | 90 | 0 | 1 |
| $\pi$ | 180 | −1 | 0 |
| $\pi/4$ | 45 | $\sqrt2/2$ | $\sqrt2/2$ |
| $\pi/6$ | 30 | $\sqrt3/2$ | $1/2$ |
| $-\pi/3$ | −60 | $1/2$ | $-\sqrt3/2$ |
| $\pi/18$ | 10 | 0.984808 | 0.173648 |
| $-2\pi/3$ | −120 | $-1/2$ | $-\sqrt3/2$ |

Sett tabellens cosinus på diagonalen, sinus nederst til venstre og **minus sinus** øverst til høyre. For $-\pi/3$ blir øvre høyre derfor $-(-\sqrt3/2)=+\sqrt3/2$. Svarboksen viser alle åtte matrisene.

### Kontroll

For hver matrise skal $R^TR=I$ og $\det R=1$. Ved $\pi/2$ sendes $(1,0)$ til $(0,1)$, som bekrefter fortegnet. NumPys trigonometriske funksjoner tar radianer; ikke send inn 90 for $\pi/2$.
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
### 1. Velg retning før du regner

$\;{}^A R_B$ har B-aksene uttrykt i A og sender **B-koordinater til A**. Når punktet i stedet skal fra A til B, brukes inversen:

$$ {}^B p=({}^A R_B)^{-1}{}^A p=({}^A R_B)^T{}^A p. $$

### 2. Multipliser i hver del

Med $c=\sqrt2/2$ får vi i del 1:

$$
{}^Bp=\begin{bmatrix}c&c\\-c&c\end{bmatrix}\begin{bmatrix}0\\3\end{bmatrix}
=\begin{bmatrix}0+3c\\0+3c\end{bmatrix}.
$$

I del 2 kjenner vi $\;{}^RR_Q=R(\pi/2)$, men skal motsatt vei:

$$
{}^Qs=R(-\pi/2)\begin{bmatrix}2\\3\end{bmatrix}
=\begin{bmatrix}0&1\\-1&0\end{bmatrix}\begin{bmatrix}2\\3\end{bmatrix}
=\begin{bmatrix}3\\-2\end{bmatrix}.
$$

I del 3 går punktet allerede fra M til N, altså i retningen til $\;{}^NR_M$:

$$
{}^Nx=R(\pi)\begin{bmatrix}5\\1\end{bmatrix}
=\begin{bmatrix}-1&0\\0&-1\end{bmatrix}\begin{bmatrix}5\\1\end{bmatrix}
=\begin{bmatrix}-5\\-1\end{bmatrix}.
$$

### Kontroll

Rene rotasjoner bevarer lengde: del 1 har fortsatt lengde 3, del 2 lengde $\sqrt{13}$ og del 3 lengde $\sqrt{26}$. Roter svaret tilbake for å kontrollere koordinatrammen.
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
### 1. Skill mellom direkte og invers transformasjon

Når B er gitt relativt til A, roterer vi først punktet og legger deretter til B-origo uttrykt i A:

$$ {}^A p={}^A R_B{}^B p+{}^A t_B. $$

Når A i stedet er gitt relativt til B, trekker vi først fra A-origo og roterer deretter motsatt vei:

$$ {}^A p=({}^B R_A)^T({}^B p-{}^B t_A). $$

### 2. Regn ut de fire tilfellene

1. Med $c=\sqrt2/2$: $R(\pi/4)(2,3)^T=(2c-3c,2c+3c)^T=(-c,5c)^T$. Legg til $(1,2)$, slik at svaret blir $(1-c,2+5c)\approx(0.293,5.536)$.
2. $R(\pi/2)(2,3)^T=(-3,2)^T$. Translasjonen er null, så dette er også sluttresultatet.
3. Punktet i B er $(2,3)$, nøyaktig der A-origo ligger. Differansen $(2,3)-(2,3)=(0,0)$ forblir null etter rotasjon.
4. Trekk fra translasjonen: $(2,3)-(1,6)=(1,-3)$. Deretter $R(\pi)^T(1,-3)^T=(-1,3)^T$.

### Kontroll med homogene koordinater

Legg til en siste koordinat lik 1 for et punkt. Da gir $T[p_x,p_y,1]^T$ samme resultat som $Rp+t$, med 1 nederst. Den inverse translasjonen er **ikke bare** $-t$, men $-R^Tt$. Test del 4 baklengs: $R(\pi)(-1,3)^T+(1,6)^T=(2,3)^T$.
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
    verification: "corrected",
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
### 1. Velg akse og sett inn vinkelen

Med $c=\cos\theta$ og $s=\sin\theta$ er høyrehåndsrotasjonene

$$
R_x=\begin{bmatrix}1&0&0\\0&c&-s\\0&s&c\end{bmatrix},\quad
R_y=\begin{bmatrix}c&0&s\\0&1&0\\-s&0&c\end{bmatrix},\quad
R_z=\begin{bmatrix}c&-s&0\\s&c&0\\0&0&1\end{bmatrix}.
$$

Aksen vi roterer om blir stående. Sett inn $(c,s)=(\sqrt2/2,\sqrt2/2)$ i del 1, $(-\sqrt2/2,\sqrt2/2)$ i del 2, $(0,1)$ i del 3 og $(0,-1)$ i del 4. Legg spesielt merke til at $-s=+1$ i del 4.

### 2. Multipliser sammensatte rotasjoner

Skriv $h=\sqrt2/2$. Del 5 er rad-mot-kolonne-produktet

$$
\begin{bmatrix}1&0&0\\0&h&-h\\0&h&h\end{bmatrix}
\begin{bmatrix}0&0&1\\0&1&0\\-1&0&0\end{bmatrix}
=\begin{bmatrix}0&0&1\\h&h&0\\-h&h&0\end{bmatrix}.
$$

For eksempel kommer element $(2,1)$ fra $0\cdot0+h\cdot0+(-h)(-1)=h$.

I del 6 byttes faktorene:

$$
\begin{bmatrix}0&0&1\\0&1&0\\-1&0&0\end{bmatrix}
\begin{bmatrix}1&0&0\\0&h&-h\\0&h&h\end{bmatrix}
=\begin{bmatrix}0&h&h\\0&h&-h\\-1&0&0\end{bmatrix}.
$$

Resultatene er forskjellige: 3D-rotasjoner om ulike akser kommuterer ikke. I del 7 er aksen derimot den samme. Addisjonsteoremene gir $R_x(a)R_x(b)=R_x(a+b)$, så vinkelen blir $\pi/6+\pi/3=\pi/2$.

### 3. Konstruer matrisen fra aksebeskrivelsen

Kolonnene i $\;{}^AR_B$ er B-aksene uttrykt i A. Vi har $\hat x_B=(0,0,1)$ og $\hat y_B=(0,-1,0)$. Høyrehåndsregelen gir

$$\hat z_B=\hat x_B\times\hat y_B=(1,0,0).$$

Sett disse tre vektorene som **kolonner**, ikke rader, for å få siste matrise i svarboksen.

### Kontroll og kildeavvik

Alle matrisene skal oppfylle $R^TR=I$ og $\det R=1$. QUT-fasiten side 1 har et minustegn i etiketten til del 5, men resultatmatrisen svarer til den positive vinkelen i oppgavearket side 6. Her følges oppgaveteksten.
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
### Velg rotasjonsrekkefølge og retning

Rotasjon om en **ny/lokal** akse postmultipliseres; rotasjon om en **gammel/fast** akse premultipliseres. Et produkt virker på punktvektoren fra høyre mot venstre. Når B er gitt i A brukes $Rp+t$; når A er gitt i B brukes $R^T(p-t)$.

### 1. To lokale rotasjoner, direkte transformasjon

$\;{}^AR_B=R_x(\pi/4)R_y(\pi/4)$. Først gir $R_y(\pi/4)(0,3,0)^T=(0,3,0)^T$ fordi punktet ligger på y-aksen. Deretter gir $R_x(\pi/4)$ vektoren $(0,3/\sqrt2,3/\sqrt2)$. Legg til $(2,0,0)$: $\;{}^Ap=(2,2.1213,2.1213)$.

### 2. Fast z-akse, invers transformasjon

$\;{}^BR_A=R_z(\pi/4)R_y(\pi/6)$. Trekk først fra origo: $(2,0,2)-(1,2,3)=(1,-2,-1)$.

$$
{}^Ap=R_y(-\pi/6)R_z(-\pi/4)\begin{bmatrix}1\\-2\\-1\end{bmatrix}.
$$

Den høyre rotasjonen gir $(-1/\sqrt2,-3/\sqrt2,-1)$. Den venstre gir

$$
{}^Ap=\begin{bmatrix}1/2-\sqrt6/4\\-3/\sqrt2\\-\sqrt2/4-\sqrt3/2\end{bmatrix}
\approx\begin{bmatrix}-0.1124\\-2.1213\\-1.2196\end{bmatrix}.
$$

### 3. Tre lokale rotasjoner, direkte transformasjon

$\;{}^AR_B=R_x(\pi/2)R_z(\pi/2)R_x(\pi/2)$. Følg vektoren gjennom faktorene:

$$
(0,5,3)\xrightarrow{R_x}(0,-3,5)
\xrightarrow{R_z}(3,0,5)\xrightarrow{R_x}(3,-5,0).
$$

Legg til $(1,1,1)$ til slutt: $\;{}^Ap=(4,-4,1)$.

### 4. Rotasjoner om faste akser, invers transformasjon

$\;{}^BR_A=R_y(\pi/3)R_z(\pi/4)R_x(\pi/6)$. Origoene sammenfaller, så ingen translasjon trengs. Inversen snur faktororden og vinkelfortegn:

$$
{}^Ap=R_x(-\pi/6)R_z(-\pi/4)R_y(-\pi/3)(-1,-1,-1)^T.
$$

Mellomvektorene blir $(0.3660,-1,-1.3660)$, deretter $(-0.4483,-0.9659,-1.3660)$, og til slutt $(-0.4483,-1.5195,-0.7000)$.

### Kontroll

Bruk den motsatte transformasjonen på hvert svar. Du skal få det opprinnelige punktet i B. Behold full presisjon underveis; tallene ovenfor er avrundet bare for lesbarhet.
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
### 1. Finn en sammenhengende rammekjede

Vi må gå $S\rightarrow E\rightarrow M\rightarrow O$. Transformasjonen E til M er ikke gitt direkte, så den må inverteres. Med homogene punktvektorer $\bar p=(x,y,z,1)^T$ får vi

$$ {}^O\bar p={}^O T_M({}^E T_M)^{-1}{}^E T_S{}^S\bar p. $$

### 2. Regn punktet gjennom én ramme av gangen

Fra S til E:

$$
{}^Ep=R_y(-\pi/2)\begin{bmatrix}2\\0\\0\end{bmatrix}+\begin{bmatrix}0\\0\\1\end{bmatrix}
=\begin{bmatrix}0\\0\\2\end{bmatrix}+\begin{bmatrix}0\\0\\1\end{bmatrix}
=\begin{bmatrix}0\\0\\3\end{bmatrix}.
$$

Fra E til M må vi trekke fra M-origo og deretter rotere motsatt:

$$
{}^Mp=R_x(-\pi/4)\left(\begin{bmatrix}0\\0\\3\end{bmatrix}-\begin{bmatrix}2\\0\\2\end{bmatrix}\right)
=R_x(-\pi/4)\begin{bmatrix}-2\\0\\1\end{bmatrix}
=\begin{bmatrix}-2\\\sqrt2/2\\\sqrt2/2\end{bmatrix}.
$$

Fra M til O roterer $R_z(\pi/2)$ en vektor $(x,y,z)$ til $(-y,x,z)$:

$$
{}^Op=\begin{bmatrix}-\sqrt2/2\\-2\\\sqrt2/2\end{bmatrix}+\begin{bmatrix}0\\5\\0\end{bmatrix}
=\begin{bmatrix}-\sqrt2/2\\3\\\sqrt2/2\end{bmatrix}.
$$

### Kontroll

Indeksene i kjeden skal passe: O–M, M–E, E–S. Husk at $T^{-1}$ har translasjon $-R^Tt$, ikke bare $-t$. En 4×4-transformasjon må multipliseres med en homogen 4-vektor, ikke en 3-vektor.
`,
    answer: String.raw`
$$
{}^O p=\begin{bmatrix}-\sqrt2/2\\3\\\sqrt2/2\end{bmatrix}
\approx\begin{bmatrix}-0.707\\3\\0.707\end{bmatrix}.
$$
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
### 1. Bygg hver transformasjon fra geometri

Hver 2D-transformasjon bygges som

$$T=\begin{bmatrix}R&t\\0&1\end{bmatrix}.$$

B er ikke rotert: $\;{}^AR_B=I$ og $\;{}^At_B=(10,0)$. C er rotert $\pi/2$, så $\;{}^BR_C=\begin{bmatrix}0&-1\\1&0\end{bmatrix}$, og $\;{}^Bt_C=(0,15)$. Disse blokkene gir de to første matrisene i svarboksen.

### 2. Komponer rotasjon og translasjon

Transformasjonen fra C til A fås ved å følge kjeden fra høyre mot venstre:

$$ {}^A T_C={}^A T_B{}^B T_C. $$

Blokkmultiplikasjon forklarer hvorfor translasjoner ikke generelt bare kan adderes:

$$
R_{AC}=R_{AB}R_{BC}=IR_{BC}=R_{BC},\qquad
t_{AC}=t_{AB}+R_{AB}t_{BC}=(10,0)+(0,15)=(10,15).
$$

Her er direkte addisjon mulig fordi $R_{AB}=I$. Nederste rad forblir $(0,0,1)$.

### Kontroll

C-origo $(0,0,1)^T$ skal sendes til $(10,15,1)^T$ i A. Et punkt én enhet langs C sin x-akse sendes til $(10,16)$ i A, fordi C sin x-akse peker langs A sin positive y-akse.
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
En plan robot har to rotasjonsledd $q_1,q_3$ og ett prismatisk ledd $q_2$. Fra verdensrammen går kjeden gjennom:

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

### 1. Finn de absolutte lenkeretningene

Den første bevegelige lenken peker i $\alpha=\pi/4+q_1$. Den siste peker i $\beta=\alpha-\pi/4+q_3=q_1+q_3$. Vinklene må akkumuleres; $q_3$ er relativ til forrige lenke.

### 2. Summer lenkevektorene

$$
x=8+(5+q_2)\cos\alpha+4\cos\beta,\qquad
y=(5+q_2)\sin\alpha+4\sin\beta.
$$

Hele posen er $\;{}^0T_E=\begin{bmatrix}\cos\beta&-\sin\beta&x\\\sin\beta&\cos\beta&y\\0&0&1\end{bmatrix}$. Posisjonen er altså de to øverste elementene i siste kolonne.

### 3. Sett inn de to konfigurasjonene

a) $\alpha=\pi/4$, $\beta=0$, lengde $5+q_2=5$:

$$x=8+5/\sqrt2+4=15.5355,\qquad y=5/\sqrt2=3.5355.$$

b) $\alpha=\pi/4+\pi/3=7\pi/12$, $\beta=\pi/3-\pi/6=\pi/6$, lengde 7:

$$
x=8+7(-0.258819)+4(0.866025)=9.6524,
$$

$$y=7(0.965926)+4(0.5)=8.7615.$$

### Kontroll

Ved nullverdier for leddene er den siste lenken vannrett, men den første er fortsatt rotert 45°. De faste vinkeloffsettene forsvinner ikke når leddverdiene er null. $q_2$ har lengdeenhet; $q_1,q_3$ har enhet radianer.
`,
    answer: String.raw`
$$
p(0,0,0)=\begin{bmatrix}8+5/\sqrt2+4\\5/\sqrt2\end{bmatrix}
\approx\begin{bmatrix}15.536\\3.536\end{bmatrix}.
$$

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
### 1. Etabler en kjent start

Åpne **prac.ttt**, start simuleringen og kjør Python fra kursets pixi-miljø i mappen med API-filene. Da bruker du samme scene og avhengigheter som QUT-eksemplet.

### 2. Send tre kommandoer med ventetid

Følgende er et eget, enkelt **simulatoreksempel** med tre basevinkler. API-et i denne practicalen bruker radianer:

~~~python
from coppeliaRobot import CoppeliaRobot
import time

dobot = CoppeliaRobot()
for angles in [(0.0, 0.0, 0.0), (0.3, 0.0, 0.0), (0.6, 0.0, 0.0)]:
    dobot.move_arm(*angles)
    time.sleep(1.0)
~~~

Ventingen gjør at neste kommando ikke overskriver målet før bevegelsen er ferdig. QUT foreslår alternativt å lese **get_joint_config()** til største absolutte vinkelfeil er under $10^{-3}$ rad. Bruk også tidsavbrudd hvis du lager en slik venteløkke.

### 3. Kontroller og forklar

Baseleddet roterer hele armen rundt z-aksen; 0.6 rad er $0.6\cdot180/\pi\approx34.4^\circ$. Prøv deretter skulder og albue **hver for seg** innenfor scenens leddgrenser, slik at du kan identifisere hvilket argument som styrer hvilket ledd. Noter kommando, observert stilling og eventuelle tilkoblingsfeil.

Dette er ikke en fysisk-robotoppskrift: Assessment 2.2 har et blokkerende API og forbyr de nevnte getter-kallene.
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
### Fremgangsmåte

1. Start simuleringen, og kjør **pixi run python coppeliaRobotTeach.py** i mappen med teach-skriptet.
2. Sett de tre sliderne til null og noter hjemmestillingen. Dette gir en referanse før du tolker fortegn.
3. Endre bare basevinkelen litt, og slipp slideren før du sammenligner stillingen. QUT-practicalen side 2 beskriver at roboten beveger seg når slideren slippes; se versjonsmerknaden nedenfor.
4. Gjenta med skulderen og albuen. Se både på leddet som endres og på parallellmekanismen som holder verktøyet vertikalt.
5. Noter sliderverdi, retning og hvilke lenker som flyttes. Gå tilbake til null mellom forsøkene, slik at du sammenligner samme utgangspunkt.

### Hvorfor dette er viktig

GUI-et representerer tre fysiske vinkler $\theta$. En modell med fire ideelle rotasjonsledd bruker $q=(\theta_1,\theta_2,\theta_3-\theta_2,-\theta_3)$. Den tredje fysiske vinkelen beskriver underarmens retning fra horisontalen, ikke bare albuevinkelen relativt til overarmen. Derfor kan sliderverdier ikke kopieres ukritisk inn i en vilkårlig kinematisk kjede.

Sliderne viser **grader** i det utdelte arkivet. Koden konverterer til **radianer** med **deg2rad** før **move_arm**. Noter enheten sammen med verdien; 30° skal sendes som omtrent 0.524 rad, ikke som 30 rad.

### Kontroll

Et korrekt resultat er at riktig ledd flyttes til den valgte stillingen uten runtime-feil. Det er et versjonsavvik i kildene: PDF-en beskriver bevegelse ved slipp, mens **coppeliaRobotTeach.py** i det lokale QUT-arkivet kobler bevegelsen til sliderens verdiendrings-callback. Denne varianten kan derfor sende kommandoer også mens du drar. Kontroller din versjon; kontinuerlig oppdatering er ikke i seg selv en FK-feil.
`,
    answer: String.raw`
Ingen unik tallfasit. De tilsvarende leddene skal ende i sliderens valgte stilling, med grader konvertert til radianer. Oppdatering under dragging avhenger av GUI-versjonen; Python-prosessen skal fortsette uten feil.
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
### 1. Tolk vinklene og projiser hver lenke

Her er $q=(q_1,q_2,q_3)$ de tre fysiske GUI-vinklene, ikke fireleddsvektoren fra Assessment 1.3. Overarmen måles fra vertikalen: dens bidrag er $L_1\sin q_2$ horisontalt og $L_1\cos q_2$ vertikalt. Underarmen måles ned fra horisontalen: $L_2\cos q_3$ horisontalt og $-L_2\sin q_3$ vertikalt. Dermed er radius

$$r=L_1\sin q_2+L_2\cos q_3+L_3.$$

Baseleddet roterer denne radiusen rundt z-aksen:

$$x=r\cos q_1,\qquad y=r\sin q_1.$$

Høyden er

$$z=L_0+L_1\cos q_2-L_2\sin q_3-L_4.$$

### 2. Implementer og konverter enhet til slutt

~~~python
import numpy as np

def tip_position_m(q):
    q1, q2, q3 = q
    L0, L1, L2, L3, L4 = 138, 135, 147, 60, 80
    r = L1*np.sin(q2) + L2*np.cos(q3) + L3
    z = L0 + L1*np.cos(q2) - L2*np.sin(q3) - L4
    return np.array([r*np.cos(q1), r*np.sin(q1), z]) / 1000

# Inne i display_fk(): self.theta inneholder sliderverdier i grader.
# q = np.deg2rad(self.theta)
# x, y, z = tip_position_m(q)
# fk_str = f"x={x:.4f}, y={y:.4f}, z={z:.4f} m"
~~~

Plasser hjelpefunksjonen utenfor GUI-klassen og bruk de tre kommenterte linjene inne i **display_fk(self)**. Behold kodens oppdatering av **pose_text** med den nye **fk_str**. Konverter fra grader nøyaktig én gang før trigonometrien; dersom din versjon allerede gir q i radianer, skal q brukes direkte.

Den positive lengden $L_4=80$ beskriver et nedoverrettet offset og trekkes fra én gang. Del alle komponentene på 1000 fordi inngangsgeometrien er i millimeter og GUI-et viser meter.

### 3. Kontroller med en håndregnet stilling

Ved $q=(0,0,0)$ blir $r=0+147+60=207$ mm og $z=138+135-0-80=193$ mm. Displayet skal vise $(0.207,0,0.193)$ m. Ved $q_1=\pi/2$ med de andre vinklene null blir posisjonen $(0,0.207,0.193)$ m.

Sammenlign deretter flere stillinger med API-posisjonen som allerede vises i practicalens kode. Dette er en lokal kontroll av FK, ikke en erstatning for beregningen i innleveringen.
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
### 1. Definer hva som teller som treff

Noter målpunktet $p^*=(x^*,y^*,z^*)$ fra scenen og velg en liten toleranse før du begynner. Start stoppeklokken fra en kjent robotstilling, slik at de to forsøkene kan sammenlignes.

### 2. Løs IK manuelt med sliderne

Juster først basen mot objektet. Retningen antydes av $\theta_1=\operatorname{atan2}(y^*,x^*)$. Juster deretter skulder og albue for å få riktig radius $r^*=\sqrt{(x^*)^2+(y^*)^2}$ og høyde. Slipp sliderne mellom justeringene. Nærm deg toppen ovenfra; ikke press roboten gjennom objektet eller bakken.

### 3. Bruk FK til å avgjøre når du er ferdig

Regn feilvektoren $e=FK(\theta)-p^*$ og avstanden $\|e\|_2=\sqrt{e_x^2+e_y^2+e_z^2}$. Stopp tiden når feilen er under valgt toleranse. For eksempel gir feil $(1,-2,2)$ mm avstanden $\sqrt{1+4+4}=3$ mm; det er ikke et treff dersom toleransen er 2 mm.

Gjenta for sentrum av E-tasten. Registrer for **begge** mål: målposisjon, de tre vinklene i radianer, oppnådd FK-posisjon, avstandsfeil og tidsbruk. Tallene må måles i din scene og kan ikke hentes fra en universell fasit.

### Hva forsøket lærer deg

Flere leddstillinger kan nå samme punkt. Du har nettopp gjort den søkeprosessen som numerisk eller geometrisk IK automatiserer i uke 5 og Assessment 1.4. Det forklarer også hvorfor en riktig sluttposisjon ikke alene forteller hvilken leddgren roboten brukte.
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
### 1. Gjør målpunktet til en trekant

Avstanden fra basen til målet er $r=\sqrt{x^2+y^2}$. Trekanten har sider $L_1,L_2,r$. Dens indre albuevinkel er $\pi-q_2$, så cosinussetningen gir

$$r^2=L_1^2+L_2^2-2L_1L_2\cos(\pi-q_2)=L_1^2+L_2^2+2L_1L_2\cos q_2.$$

Isoler cosinus til leddvinkelen, og bruk $\sin^2q_2+\cos^2q_2=1$:

$$
c_2=\frac{x^2+y^2-L_1^2-L_2^2}{2L_1L_2},\qquad
q_2=\operatorname{atan2}(\pm\sqrt{1-c_2^2},c_2).
$$

### 2. Finn skuldervinkelen for hver albuegren

Målretningen er $\phi=\operatorname{atan2}(y,x)$. I et koordinatsystem rotert med $q_1$ har målvektoren komponentene $(L_1+L_2\cos q_2,L_2\sin q_2)$. Vinkelen mellom overarmen og målretningen blir derfor $\beta=\operatorname{atan2}(L_2\sin q_2,L_1+L_2\cos q_2)$. Siden $\phi=q_1+\beta$, får vi

$$
q_1=\operatorname{atan2}(y,x)-
\operatorname{atan2}(L_2\sin q_2,L_1+L_2\cos q_2).
$$

Fortegnet foran kvadratroten gir de to albuegrenene. Beregn **både** $q_2$ og tilhørende $q_1$ for hver gren; ikke kombiner vinkler fra ulike grener.

### 3. Kontroller arbeidsrom og særtilfeller

Et mål kan nås geometrisk når $|L_1-L_2|\le r\le L_1+L_2$, tilsvarende $|c_2|\le1$. Utenfor dette intervallet finnes ingen reell IK. Ved $c_2=\pm1$ faller grenene normalt sammen modulo $2\pi$ og Jacobianen er singulær. Hvis $L_1=L_2$ og målet er origo, kan armen være helt foldet med vilkårlig $q_1$: da finnes uendelig mange skuldervinkler.

I flyttallskode kan du klippe **små avrundingsavvik** til $[-1,1]$ etter en toleransesjekk. Ikke klipp et faktisk utilgjengelig mål inn i arbeidsrommet. Fysiske leddgrenser kan dessuten forkaste geometriske løsninger.

### Kontroll med FK

Sett begge løsninger inn i $x=L_1\cos q_1+L_2\cos(q_1+q_2)$ og $y=L_1\sin q_1+L_2\sin(q_1+q_2)$. Begge må gi det samme målpunktet. **atan2(y,x)** beholder kvadranten som vanlig $\arctan(y/x)$ mister.
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
### 1. Sett inn de faste lengdene

Her er $L_1^2+L_2^2=25+49=74$ og $2L_1L_2=70$. Bruk derfor

$$c_2=\frac{x^2+y^2-74}{70},\quad q_2=\pm\arccos c_2,\quad q_1=\phi-\beta,$$

der $\phi=\operatorname{atan2}(y,x)$ og $\beta=\operatorname{atan2}(7\sin q_2,5+7\cos q_2)$.

### 2. Regn ut mål for mål

For $(5,7)$ er $c_2=(25+49-74)/70=0$, altså $q_2=\pm\pi/2$. Målretningen er $\phi=\operatorname{atan2}(7,5)=0.950547$. For positiv gren er $\beta=\operatorname{atan2}(7,5)=0.950547$, så $q_1=0$. For negativ gren er $\beta=-0.950547$, så $q_1=1.901094$.

For de to andre målene utføres nøyaktig samme regning:

| Mål | $c_2$ | $\phi$ | $\beta$ for positiv $q_2$ | Positiv $q_2$ |
|---|---|---|---|---|
| $(5.347,10.297)$ | 0.8659803 | 1.091846 | 0.306481 | 0.523689 |
| $(10.508,-2.925)$ | 0.6424813 | −0.271487 | 0.514135 | 0.873064 |

Dermed blir skuldervinklene henholdsvis $1.091846-0.306481=0.785365$ og $-0.271487-0.514135=-0.785621$. I den andre grenen skifter både $q_2$ og $\beta$ fortegn: $q_1=1.398327$ og $0.242648$.

### 3. Kontroller ved tilbakeinnsetting

For første positive gren: $x=5\cos0+7\cos(\pi/2)=5$ og $y=5\sin0+7\sin(\pi/2)=7$. Gjør samme FK-kontroll for de øvrige fem vinkelparene. Alle målene ligger i arbeidsrommet $2\le r\le12$.

Målene i PDF-en er avrundet til tre desimaler. Derfor ligger svarene nær, men ikke nøyaktig på, kjente vinkler som $\pi/4$, $\pi/6$ og $5\pi/18$. Behold presisjonen til etter FK-kontrollen.
`,
    answer: String.raw`
Vinkler i radianer:

1. $(q_1,q_2)=(0,\pi/2)$ eller $(1.9011,-\pi/2)$
2. $(0.7854,0.5237)$ eller $(1.3983,-0.5237)$
3. $(-0.7856,0.8731)$ eller $(0.2426,-0.8731)$
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
### 1. Fjern den faste 45°-rotasjonen

Det prismatiske leddet er enklere å beskrive langs lokal x. Roter derfor målet $-45^\circ$:

$$x'=\frac{x+y}{\sqrt2},\qquad y'=\frac{-x+y}{\sqrt2}.$$

Da beskrives punktet av

$$x'=q_1+7\cos q_2,\qquad y'=7\sin q_2.$$

### 2. Løs først rotasjonen, deretter lengden

Den vertikale ligningen inneholder bare $q_2$. Dermed er $q_2=\arcsin(y'/7)$ eller $\pi-\arcsin(y'/7)$, og så $q_1=x'-7\cos q_2$. Sjekk først $|y'|\le7$. Etterpå må eventuelle grenser på det prismatiske leddet kontrolleres.

### 3. Sett inn alle tre mål

| Mål | $x'$ | $y'$ | $y'/7$ |
|---|---|---|---|
| $(0,9.899)$ | 6.999650 | 6.999650 | 0.999950 |
| $(8.883,0.310)$ | 6.500433 | −6.062026 | −0.866004 |
| $(11.086,12.805)$ | 16.893488 | 1.215517 | 0.173645 |

For mål 2 blir $q_2\approx-1.047154$ eller $4.188747$. I første gren er $7\cos q_2\approx3.500262$, så $q_1=6.500433-3.500262=3.000170$. I andre gren er cosinus negativ, og $q_1=10.000695$.

For mål 3 blir $q_2\approx0.174530$ eller $2.967063$. Det horisontale lenkebidraget er $\pm6.893658$, og dermed $q_1\approx9.999830$ eller $23.787146$.

### 4. Vær nøye nær en sammenslått gren

For **det oppgitte avrundede** mål 1 gir ligningene faktisk to nærliggende svar: $(q_1,q_2)\approx(6.929654,1.560797)$ og $(7.069646,1.580796)$. Hvis det tiltenkte målet var $(0,7\sqrt2)\approx(0,9.899495)$, blir $y'=7$ nøyaktig og begge grenene sammenfaller i $(7,\pi/2)$. Det tidligere avrundede svaret er altså et nyttig idealtilfelle, ikke begge løsningene for tallet 9.899.

### Kontroll

Rekonstruer først $x'=q_1+7\cos q_2$, $y'=7\sin q_2$, og roter tilbake: $x=(x'-y')/\sqrt2$, $y=(x'+y')/\sqrt2$. Da får hver gren sitt oppgitte mål. $q_1$ er en **lengde** og $q_2$ en **vinkel i radianer**.
`,
    answer: String.raw`
For de oppgitte desimaltallene, med $q_2$ i radianer:

1. $(q_1,q_2)\approx(6.929654,1.560797)$ eller $(7.069646,1.580796)$. Idealtilfellet $(0,7\sqrt2)$ gir $(7,\pi/2)$.
2. $(3.000170,-1.047154)$ eller $(10.000695,4.188747)$, nær $(3,-\pi/3)$ og $(10,4\pi/3)$.
3. $(9.999830,0.174530)$ eller $(23.787146,2.967063)$, nær $(10,\pi/18)$ og $(23.787,17\pi/18)$.
`,
  },
];

const week6: Egb339Problem[] = [
  {
    id: "w6-derivatives",
    title: "Derivasjonsoppvarming",
    source: "Week 6 Tutorial - Robot Jacobian",
    sourcePage: 6,
    verification: "corrected",
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
### Regler vi trenger

Potensregelen er $(x^n)'=nx^{n-1}$. Produktregelen er $(fg)'=f'g+fg'$. Kjerneregelen er $(f(g(x)))'=f'(g(x))g'(x)$. Vi kan også utvide parenteser før derivasjon, for å gjøre kontrollen enklere.

### Utregning av hver del

1. $\frac{d}{dx}(4x^2)=4\cdot2x=8x$.
2. I $3\sin(2x)$ er den indre funksjonen $2x$, med derivert 2. Derfor blir svaret $3\cos(2x)\cdot2=6\cos(2x)$. Argumentet **2x blir stående** i cosinus.
3. $(2x^3)(4x)=8x^4$, så den deriverte er $8\cdot4x^3=32x^3$. Produktregelen gir samme kontroll: $(6x^2)(4x)+(2x^3)4=24x^3+8x^3$.
4. $4x(3x^2+4)=12x^3+16x$. Deriver hvert ledd: $36x^2+16$.
5. Utvid $2x(x^3+2x)=2x^4+4x^2$. Hele uttrykket blir $7x^4-3\cos x+4x^2$. Derivert: $28x^3+3\sin x+8x$; plussfortegnet kommer fra de to minusene i $(-3\cos x)'$.
6. Samle først: $x^2+2\cos x+2x^4+4x^2=2x^4+5x^2+2\cos x$. Derivert: $8x^3+10x-2\sin x$.
7. Bruk produktregelen direkte:

$$
\begin{aligned}
\frac{d}{dx}\left[x^2(2\sin x+5x)\right]
&=2x(2\sin x+5x)+x^2(2\cos x+5)\\
&=4x\sin x+10x^2+2x^2\cos x+5x^2\\
&=15x^2+4x\sin x+2x^2\cos x.
\end{aligned}
$$

### Kontroll og kildeavvik

Symbolsk derivasjon eller en sentral differanse $[f(x+h)-f(x-h)]/(2h)$ ved flere verdier av $x$ kan kontrollere svarene. Ikke test bare ved $x=0$, der mange ulike uttrykk gir samme verdi.

> [!warning] Rettelser til QUT-fasiten, side 1
> I del 2 står $6\cos x$, men kjerneregelen gir $6\cos(2x)$. I del 4 står $36x+16$, men oppgavearket side 6 gir $36x^2+16$. De øvrige derivatene stemmer. Svarene her følger de opprinnelige funksjonene.
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
### 1. Deriver én variabel om gangen

Jacobianen har én rad per posisjonskomponent og én kolonne per ledd. Når vi deriverer med hensyn på $q_1$, behandles $q_2$ som konstant, og omvendt. For eksempel er $\partial(q_1+q_2)/\partial q_1=\partial(q_1+q_2)/\partial q_2=1$.

De fire partiellderiverte er

$$
\frac{\partial x}{\partial q_1}=-L_1\sin q_1-L_2\sin(q_1+q_2),\qquad
\frac{\partial x}{\partial q_2}=-L_2\sin(q_1+q_2),
$$

$$
\frac{\partial y}{\partial q_1}=L_1\cos q_1+L_2\cos(q_1+q_2),\qquad
\frac{\partial y}{\partial q_2}=L_2\cos(q_1+q_2).
$$

Første lenke påvirkes ikke av $q_2$, så $L_1$-leddet forsvinner fra andre kolonne. Sett derivatene inn på riktig plass:

$$
J(q)=\begin{bmatrix}
-L_1\sin q_1-L_2\sin(q_1+q_2)&-L_2\sin(q_1+q_2)\\
L_1\cos q_1+L_2\cos(q_1+q_2)&L_2\cos(q_1+q_2)
\end{bmatrix}.
$$

### 2. Evaluer i startstillingen

Her er $q_1+q_2=\pi/2$, så $\sin(q_1+q_2)=1$ og $\cos(q_1+q_2)=0$. Dermed

$$
J_0=\begin{bmatrix}-5/\sqrt2-7&-7\\5/\sqrt2&0\end{bmatrix}
\approx\begin{bmatrix}-10.5355&-7\\3.5355&0\end{bmatrix}.
$$

Bruk **FK**, ikke Jacobianen, for selve posisjonen:

$$p_0=(5/\sqrt2+7\cdot0,\;5/\sqrt2+7\cdot1)=(3.5355,10.5355).$$

### Kontroll

$\det J=L_1L_2\sin q_2=35/\sqrt2\ne0$ her, så lokal invers bevegelse er mulig. Første kolonne sier hvordan endepunktet flyttes per radian i første ledd; den er ikke endepunktets posisjon. Sammenlign kolonne $i$ med $[p(q+h e_i)-p(q-h e_i)]/(2h)$ for en liten $h$.
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
    verification: "corrected",
    topics: [topic.jacobian, topic.differential, topic.fk],
    prompt: String.raw`
Bruk samme robot og startkonfigurasjon som i forrige oppgave.

1. For $\dot q=(0.5,0.5)$ rad/s: finn $\dot p$, og estimer posisjonen etter $0.2$ s både med $p_0+\dot p\Delta t$ og med eksakt FK av $q_0+\dot q\Delta t$.
2. Finn $\dot q$ som gir $\dot p=(0,1)$, og estimer posisjonen etter $0.5$ s med begge metodene.
`,
    solution: String.raw`
### Start med riktig posisjon og Jacobian

Fra forrige oppgave har vi $p_0=(3.535534,10.535534)$ og

$$J_0=\begin{bmatrix}-10.535534&-7\\3.535534&0\end{bmatrix}.$$

### 1. Gitt leddhastighet

Gang matrisen med hastigheten, ikke med vinklene:

$$
\dot p=J_0\begin{bmatrix}0.5\\0.5\end{bmatrix}
=\begin{bmatrix}-10.535534(0.5)-7(0.5)\\3.535534(0.5)\end{bmatrix}
=\begin{bmatrix}-8.767767\\1.767767\end{bmatrix}.
$$

Lineariseringen bruker denne starthastigheten i hele tidssteget:

$$p_{\mathrm{lin}}=p_0+0.2\dot p=(1.781980,10.889087).$$

For eksakt FK ved konstant leddhastighet oppdateres **begge** vinklene med $0.5\cdot0.2=0.1$ rad. Dermed er $q_1=q_2=\pi/4+0.1=0.885398$ og $q_1+q_2=\pi/2+0.2$:

$$
\begin{aligned}
x&=5\cos(\pi/4+0.1)+7\cos(\pi/2+0.2)=1.774221,\\
y&=5\sin(\pi/4+0.1)+7\sin(\pi/2+0.2)=10.731301.
\end{aligned}
$$

### 2. Gitt kartesisk hastighet

Løs $J_0\dot q=(0,1)^T$. Andre rad gir $3.535534\dot q_1=1$, altså $\dot q_1=0.282843$ rad/s. Første rad gir deretter

$$-10.535534(0.282843)-7\dot q_2=0\quad\Rightarrow\quad\dot q_2=-0.425700\ \text{rad/s}.$$

Lineært blir $p_{\mathrm{lin}}=p_0+0.5(0,1)=(3.535534,11.035534)$.

For FK oppdateres vinklene til $q=(0.926820,0.572548)$, slik at $q_1+q_2=1.499368$. Innsetting i FK gir $(3.501477,10.980723)$.

### Hva forskjellen betyr

Den konstante leddhastigheten gir den ønskede kartesiske hastigheten **i startøyeblikket**. Jacobianen endres underveis, så FK-endepunktet avviker fra en rettlinjet kartesisk bevegelse. Hvis målet er konstant $(0,1)$ gjennom hele intervallet, må leddhastigheten oppdateres med ny Jacobian i små tidssteg. I kode brukes gjerne **np.linalg.solve(J, velocity)** fremfor å konstruere inversen eksplisitt.

> [!warning] Avvik fra QUT-fasiten, side 1
> Fasiten oppgir omtrent 1.114 som FK-x i del a), men direkte innsetting av de oppgitte vinklene gir **1.774221**. I del b) står leddhastigheten omtrent $(0.028,-0.043)$, som er ti ganger for liten til $\dot p=(0,1)$. Riktig hastighet er $(0.282843,-0.425700)$. Fasitens sluttposisjon i del b) stemmer med den riktige hastigheten.
`,
    answer: String.raw`
1. $\dot p\approx(-8.7678,1.7678)$. Lineært: $p\approx(1.7820,10.8891)$. Med oppdatert $q$ og FK: $p\approx(1.7742,10.7313)$.

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
### 1. Beskriv samme modell symbolsk

Variablene må være SymPy-symboler, og trigonometrien må bruke **sp.sin/sp.cos**, ikke NumPys numeriske funksjoner. La $L_1,L_2$ være symboler slik at resultatet fortsatt gjelder alle lenkelengder.

~~~python
import sympy as sp

q1, q2, L1, L2 = sp.symbols("q1 q2 L1 L2", real=True)
p = sp.Matrix([
    L1 * sp.cos(q1) + L2 * sp.cos(q1 + q2),
    L1 * sp.sin(q1) + L2 * sp.sin(q1 + q2),
])
J = sp.simplify(p.jacobian([q1, q2]))
sp.pprint(J)

# Samme tall som i den manuelle oppgaven:
values = {L1: 5, L2: 7, q1: sp.pi/4, q2: sp.pi/4}
print(J.subs(values).evalf(6))
print(p.subs(values).evalf(6))
~~~

### 2. Les og kontroller resultatet

SymPy lager én kolonne per variabel i listen **[q1, q2]**. Bytter du rekkefølgen, byttes kolonnene; derfor må også hastighetsvektoren bruke samme rekkefølge. Første rad skal være de deriverte av x og andre rad av y.

Etter substitusjon får du $J\approx\begin{bmatrix}-10.5355&-7\\3.5355&0\end{bmatrix}$ og $p\approx(3.5355,10.5355)$. Bruk eksakt **sp.pi/4** frem til **evalf()** for å unngå unødvendig avrunding.

### 3. Sammenlign algebra, ikke bare ett tallsett

Opprett den håndutledede matrisen som **J_manual**, og sjekk **sp.simplify(J - J_manual) == sp.zeros(2, 2)**. Nullmatrisen viser at uttrykkene er algebraisk like. En numerisk kontroll ved én stilling kan ellers skjule et fortegnsavvik som tilfeldigvis blir null akkurat der.
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
### 1. Del linjen i fire like intervaller

Fem punkter **inkludert endepunktene** gir fire intervaller. Bruk $s_i=i/4$ for $i=0,1,2,3,4$ i

$$p(s)=(1-s)p_0+sp_f.$$

Da er $x(s)=0.75$ og $y(s)=0.5-s$. Veipunktene får y-verdiene $0.5,0.25,0,-0.25,-0.5$.

### 2. Løs IK ved hvert veipunkt

Med $L_1=2,L_2=1.5$ blir

$$c_2=\frac{0.75^2+y^2-2^2-1.5^2}{2\cdot2\cdot1.5}=\frac{0.5625+y^2-6.25}{6}.$$

Ved første punkt gir dette $c_2=-0.90625$ og $q_2=\pm2.705124$. For positiv gren er

$$
q_1=\operatorname{atan2}(0.5,0.75)-\operatorname{atan2}(1.5\sin q_2,2+1.5\cos q_2)
=0.588003-0.780290=-0.192287.
$$

For negativ gren skifter det andre atan2-leddet fortegn, så $q_1=1.368293$. Mellomregningene for resten er:

| $y$ | $c_2$ | $\operatorname{atan2}(y,0.75)$ | Positiv $q_2$ |
|---|---|---|---|
| 0.50 | −0.906250 | 0.588003 | 2.705124 |
| 0.25 | −0.937500 | 0.321751 | 2.786171 |
| 0 | −0.947917 | 0 | 2.817427 |
| −0.25 | −0.937500 | −0.321751 | 2.786171 |
| −0.50 | −0.906250 | −0.588003 | 2.705124 |

Bruk samme $q_1$-formel i hver rad, med begge fortegn på $q_2$. Svarboksen viser alle ti løsninger avrundet som i QUT-fasiten.

### 3. Kontroller hele banen

Den minste radiusen er 0.75 og den største $\sqrt{0.8125}\approx0.9014$. Begge ligger mellom $|2-1.5|=0.5$ og $2+1.5=3.5$, så hele rette linjen er geometrisk tilgjengelig. Hold samme IK-gren gjennom banen for å unngå et stort albueskift. Kontroller hver uavrundet løsning med FK; jevne kartesiske steg betyr ikke jevne leddvinkelsteg.
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
### 1. Finn endekonfigurasjonene uten tidlig avrunding

Positiv $q_2$-gren gir $q_0=(-0.192287,2.705124)$ og $q_f=(-1.368293,2.705124)$. Interpoler hver leddvinkel separat:

$$q(s)=(1-s)q_0+sq_f.$$

### 2. Regn ut de fem leddkonfigurasjonene

Siden $q_{2,f}-q_{2,0}=0$, står albuevinkelen fast. Endringen i første ledd er $-1.368293-(-0.192287)=-1.176005$ rad. Med fire intervaller blir hvert steg $-0.294001$ rad:

$$q_1\approx-0.192287,\;-0.486289,\;-0.780290,\;-1.074291,\;-1.368293.$$

### 3. Bruk FK på hvert vinkelpar

$$x=2\cos q_1+1.5\cos(q_1+q_2),\qquad y=2\sin q_1+1.5\sin(q_1+q_2).$$

Fordi $q_2$ står fast, er avstanden fra base til spiss også konstant:

$$r^2=2^2+1.5^2+2(2)(1.5)\cos q_2=0.8125,\quad r=0.901388.$$

Retningen til spissen endres jevnt fra $\operatorname{atan2}(0.5,0.75)=0.588003$ til $-0.588003$. Ved andre punkt er retningen 0.294001 rad, så $p=r(\cos0.294001,\sin0.294001)\approx(0.8627,0.2612)$. Ved midtpunktet er retningen null, så $p=(0.901388,0)$.

### Sammenligning og kontroll

Endepunktene er de samme som ved kartesisk interpolasjon, men mellom dem følger spissen en **sirkelbue**, ikke linjen $x=0.75$. Maksimalt sideavvik ved midtpunktet er $0.901388-0.75=0.151388$. Beregn FK med de uavrundede vinklene; QUT-tabellens to desimaler er presentasjonsverdier, ikke presise inndata.
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
### 1. Fra akselerasjon til hastighet

Bruk $v(t)=v(t_0)+\int_{t_0}^t a(\tau)\,d\tau$, med $v(0)=0$. I første intervall er $v=1.5t$, så $v(2)=3$ m/s. Null akselerasjon fra 2 til 5 s betyr **konstant hastighet**, ikke stillstand. Til slutt bremser legemet med 1 m/s²:

$$v(t)=\begin{cases}1.5t&0\le t\le2\\3&2\le t\le5\\3-(t-5)&5\le t\le8.\end{cases}$$

Hastighetsgrafen stiger lineært fra $(0,0)$ til $(2,3)$, er flat til $(5,3)$ og faller til $(8,0)$: en trapesprofil.

### 2. Integrer hastigheten med riktige startverdier

Vi måler forflytningen fra $s(0)=0$. I første intervall er $s=\tfrac12(1.5)t^2=0.75t^2$, slik at $s(2)=3$ m. Deretter $s(5)=3+3(5-2)=12$ m. I siste intervall bruk lokal tid $\tau=t-5$:

$$
s(t)=\begin{cases}
0.75t^2&0\le t\le2\\
3+3(t-2)&2\le t\le5\\
12+3(t-5)-\tfrac12(t-5)^2&5\le t\le8.
\end{cases}
$$

Posisjonsgrafen er først oppoverkrummet, så rettlinjet og til slutt nedoverkrummet med vannrett tangent ved 8 s. Startverdiene 3 og 12 gjør grafen kontinuerlig i overgangene.

### 3. Beregn de to etterspurte tidspunktene

Ved 6 s er $\tau=1$: $s(6)=12+3(1)-\tfrac12(1)^2=14.5$ m. Ved 8 s er $\tau=3$: $s(8)=12+9-4.5=16.5$ m.

### Kontroll med areal

Total strekning er arealet under hastighetsgrafen: $\tfrac12(2)(3)+(3)(3)+\tfrac12(3)(3)=3+9+4.5=16.5$ m. Hastigheten er aldri negativ, så tilbakelagt strekning og netto forflytning er like i dette tilfellet.
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
### 1. Finn retning og kvadrert lengde

Segmentvektoren er $v=B-A=(2,1.7)$, og $v\cdot v=2^2+1.7^2=6.89$. For et punkt $O$ projiseres $O-A$ først på den uendelige linjen:

$$t=\frac{(O-A)\cdot(B-A)}{\|B-A\|^2}.$$

### 2. Begrens til selve segmentet

Klem parameteren til $\hat t=\min(1,\max(0,t))$. Beregn nærmeste punkt $C=A+\hat t v$ og avstanden $d=\sqrt{(O_x-C_x)^2+(O_y-C_y)^2}$. For $t<0$ er A nærmest; for $t>1$ er B nærmest.

### 3. Regn alle fem punktene

For første hinder er $O-A=(-0.5,1.8)$. Telleren blir $(-0.5)2+1.8(1.7)=2.06$, så $t=2.06/6.89=0.298984$. Dette ligger på segmentet. Nærmeste punkt er $(1,1)+0.298984(2,1.7)=(1.597968,1.508273)$, og $d\approx1.695315$.

| Hinder $O$ | $(O-A)\cdot v$ | $t$ før klemming | Nærmeste $C$ | Avstand |
|---|---|---|---|---|
| $(0.5,2.8)$ | 2.06 | 0.298984 | $(1.597968,1.508273)$ | 1.695315 |
| $(1.5,0.5)$ | 0.15 | 0.021771 | $(1.043541,1.037010)$ | 0.704794 |
| $(2.5,3)$ | 6.40 | 0.928882 | $(2.857765,2.579100)$ | 0.552406 |
| $(2.7,2.1)$ | 5.27 | 0.764877 | $(2.529753,2.300290)$ | 0.262869 |
| $(0.9,0.9)$ | −0.37 | −0.053701 | $(1,1)$ | 0.141421 |

### Kontroll

Siste hinder ligger bak A, så $\hat t=0$ og $d=\sqrt{(-0.1)^2+(-0.1)^2}=\sqrt{0.02}$. Uten klemming ville du målt til linjens forlengelse. For de fire indre projeksjonene skal $(O-C)\cdot v\approx0$, altså en vinkelrett forbindelse. Hvis $A=B$, brukes avstanden til A direkte for å unngå divisjon med null.
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
### 1. Representer roboten som lenkesegmenter

FK må gi posisjonen til **alle leddene**, ikke bare endeeffektoren. To påfølgende ledd $p_i,p_{i+1}$ danner ett segment. Beregn punkt-til-segment-avstanden til hvert segment og ta den minste:

$$d_{\min}=\min_i d(O,[p_i,p_{i+1}]).$$

Dette fungerer fordi det nærmeste punktet på kjeden ligger på minst ett av segmentene. Avstand bare til leddpunktene ville kunne overse en kollisjon midt på en lenke.

### 2. Implementer projeksjon, klemming og minimum

~~~python
import numpy as np

def point_segment_distance(point, start, end):
    point, start, end = [np.asarray(p, dtype=float) for p in (point, start, end)]
    segment = end - start
    length_sq = segment @ segment
    if length_sq == 0.0:
        return np.linalg.norm(point - start)
    t = ((point - start) @ segment) / length_sq
    t = np.clip(t, 0.0, 1.0)
    closest = start + t * segment
    return np.linalg.norm(point - closest)

def robot_clearance(joint_positions, obstacle):
    if len(joint_positions) < 2:
        raise ValueError("Minst to leddposisjoner er nødvendig")
    return min(
        point_segment_distance(obstacle, a, b)
        for a, b in zip(joint_positions[:-1], joint_positions[1:])
    )
~~~

### 3. Håndregnet kontroll

Ta en arm med ledd $(0,0)$, $(2,0)$ og $(2,2)$, og hinder $O=(1,1)$. På første lenke er $t=2/4=0.5$, nærmeste punkt $(1,0)$ og avstand 1. På andre lenke er også $t=0.5$, nærmeste punkt $(2,1)$ og avstand 1. Dermed er minsteavstanden 1, ikke $\sqrt2$ som avstanden til nærmeste leddpunkt ville gitt.

Hvis en lenke har null lengde, reduseres den til et punkt. Koden håndterer dette uten divisjon med null. Alle punkter må være uttrykt i samme ramme og lengdeenhet.

### Begrensning: geometri er ikke en full kollisjonsgaranti

For en kapselmodell med lenkeradius $r_i$ og et sirkulært hinder med radius $r_O$ er klaringen $\min_i(d_i-r_i-r_O)$. Negativ verdi betyr overlapp. Med radius 0.1 for både lenke og hinder gir eksemplet klaring $1-0.1-0.1=0.8$. Kontroller også mellom veipunkter: kollisjonsfrie endepunkter garanterer ikke en kollisjonsfri bevegelse.
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
### 1. Last riktig kildebilde

Legg QUTs gråtonebilde **highway.jpg** i practicalens **images/**-mappe og kjør fra prosjektmappen. Den eksplisitte stien viser hvilken fil som leses:

~~~python
from machinevisiontoolbox import Image

img = Image.Read("images/highway.jpg")
print(img.width, img.height)
print(img.array.shape, img.array.dtype)
~~~

### 2. Tolk dimensjonene

Machine Vision Toolbox oppgir bredde før høyde: **2048, 1536**. NumPy-arrayet har derimot form **(1536, 2048)** fordi første indeks er rad $v$ og andre indeks er kolonne $u$. Totalt er det $2048\cdot1536=3\,145\,728$ piksler.

Origo er øverst til venstre. Gyldige koordinater er $0\le u<2048$, $0\le v<1536$. Siste piksel er $(2047,1535)$, ikke $(2048,1536)$.

### Kontroll og videre bruk

Originalen har datatype **uint8** og én gråtonekanal. Hvis du får tre dimensjoner, har du lastet en fargevariant. Task 2–7 nedenfor bygger videre på **img** fra denne innlesingen; originalarrayet beholdes uendret.
`,
    answer: String.raw`
Bildet er $2048\times1536$ piksler: bredde 2048 og høyde 1536.
`,
  },
  {
    id: "w8-pixel-range",
    title: "Task 2: intensitetsområde",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 2,
    verification: "derived",
    topics: [topic.images, topic.histograms],
    prompt: String.raw`
Finn minste og største pikselintensitet i bildet. Sammenlign med verdiene du observerer ved å holde musepekeren over mørke og lyse områder.
`,
    solution: String.raw`
### 1. Sammenlign utvalg med hele bildet

Vis bildet og noter intensiteter i himmel, vei, biler og bygning. Musepekeren undersøker bare valgte piksler; de observerte ytterverdiene er ikke nødvendigvis bildets globale grenser.

~~~python
pixels = img.array
img.disp(block=True)
print(pixels.min(), pixels.max())
~~~

### 2. Tolk resultatet

For originalfilen får vi 0 og 255. Et 8-bits usignert heltall har $2^8=256$ nivåer, fra svart (0) til hvitt (255). **min()** og **max()** reduserer hele arrayet til to skalarer. Minst én piksel har hvert ekstremnivå; dette betyr ikke at store områder er helt svarte eller hvite.

### Kontroll

Hvis de manuelle verdiene dine for eksempel er 14 og 248, er det ingen motsetning: du har ikke nødvendigvis undersøkt de ekstreme pikslene. Gjør kontrollen før senere oppgaver endrer en bildekopi. Et normalisert flyttallsbilde kan i stedet bruke 0–1; ikke bland intensitetsskalaene.
`,
    answer: String.raw`
Eksakte verdier i det utdelte bildet er minimum $0$ og maksimum $255$.
`,
  },
  {
    id: "w8-histogram",
    title: "Task 3: histogram og dynamikkområde",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 2,
    verification: "derived",
    topics: [topic.histograms, topic.images],
    prompt: String.raw`
Tegn bildehistogrammet. Finn området med flest piksler og forklar hva histogrammet sier om kontrasten i bildet.
`,
    solution: String.raw`
### 1. Tell hvor ofte hvert nivå forekommer

Histogrammet $h(k)$ er antall piksler med gråtone $k$. Det beholder antall og intensitet, men ikke pikselposisjonene.

~~~python
hist = img.hist()
hist.plot()

import numpy as np
counts = np.bincount(img.array.ravel(), minlength=256)
peak = int(np.argmax(counts))
print(peak, counts[peak])
assert counts.sum() == img.width * img.height
~~~

### 2. Les hovedtoppen og intensitetsbredden

I originalfilen er høyeste bin $k=100$ med **47 729 piksler**. Intervallet 80–120, inkludert endepunktene, inneholder omtrent **48.6 %** av alle pikslene. Store grå områder bidrar mye; små, lyse detaljer kan gi lave tellinger selv om de er visuelt tydelige.

### 3. Forklar kontrasten presist

Min/maks viser at bildet bruker nivåene 0–255. Det observerte intensitetsområdet dekker hele 8-bits-skalaen, men alle lokale områder har ikke nødvendigvis god kontrast. Hovedmassen rundt 100 viser at mange piksler ligger i et smalere gråtoneområde.

### Kontroll

Summen av histogrammet skal være $3\,145\,728$, antall piksler. Sammenlign regionene visuelt med histogrammet, men ikke hev at en bestemt topp entydig er «veien»: ulike objekter kan ha samme gråtone, og histogrammet har ingen posisjonsinformasjon.
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
### 1. Velg riktig indeks og akser

En fast kolonne betyr fast $u$ og alle rader $v$. En fast rad betyr fast $v$ og alle kolonner $u$. NumPy bruker **[v, u]**:

~~~python
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 1)
axes[0].plot(img.array[:, 1155])
axes[0].set(xlabel="Rad v (piksel)", ylabel="Intensitet", title="Kolonne u=1155")
axes[1].plot(img.array[1280, :])
axes[1].set(xlabel="Kolonne u (piksel)", ylabel="Intensitet", title="Rad v=1280")
fig.tight_layout()
plt.show()
~~~

### 2. Koble profilendringene til bildet

Den svake stigningen før $v=1000$ skyldes at himmelen gradvis blir lysere nedover. De første markerte toppene kommer når kolonnen krysser lyse armer og lamper på gatelysene. Gruppen rundt $v=1000$–$1130$ går gjennom strukturer ved horisonten, kjøretøy, rekkverk og vei; både lyse flater og mørke skygger gir store sprang.

Rad 1280 leses fra venstre mot høyre og krysser veidekke, kjørefeltmarkeringer, barrierer og rekkverk. En smal lys markering gir en smal topp; et bredt, jevnt område gir en lengre, roligere del av profilen.

### Kontroll

Kolonneprofilen skal ha **1536** målinger og radprofilen **2048**. Den valgte kolonnen har min/maks 14 og 255, selv om hele bildet har minimum 0. Identifiser en topp ved å finne indeksen og undersøke akkurat $(u,v)$ i originalbildet. Profilen alene identifiserer ikke objektet entydig.
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
### 1. Velg et rektangel rundt skiltet

Et egnet utsnitt er $615\le u<765$, $840\le v<915$. Sluttindeksen i en slice er eksklusiv, så bredden blir $765-615=150$ og høyden $915-840=75$ piksler.

~~~python
import numpy as np
from machinevisiontoolbox import Image

sign = img[615:765, 840:915]  # Image bruker (u, v)
tiled = Image(np.tile(sign.array, (10, 10)))
tiled.disp(block=True)
assert sign.array.shape == (75, 150)
assert tiled.array.shape == (750, 1500)
~~~

### 2. Skill Image-indeksering fra NumPy

**Image**-indekseringen ovenfor er **[u, v]**, mens samme utsnitt i NumPy er **img.array[840:915, 615:765]**, altså **[v, u]**. Dette er en vanlig årsak til å beskjære feil område.

### 3. Flislegg i begge retninger

**np.tile(sign.array, (10, 10))** gjentar arrayet ti ganger langs radaksen og ti ganger langs kolonneaksen. Dermed blir det $10\cdot10=100$ skilt og total størrelse $1500\times750$ piksler (bredde × høyde), ikke et oppskalert enkeltbilde.

### Kontroll

Vis utsnittet alene og sjekk at Margaret St Exit-skiltet er med. Kontroller arrayformene og at de første 75 radene og 150 kolonnene i flisbildet er lik utsnittet. Koordinatene kan justeres litt for mer luft rundt skiltet; da endres også forventet størrelse.
`,
    answer: String.raw`
Et egnet utsnitt er omtrent $u=615{:}765$, $v=840{:}915$. Resultatet skal vise 100 kopier av skiltutsnittet i et $10\times10$ rutenett.
`,
  },
  {
    id: "w8-edit-region",
    title: "Task 6: endre et bildeområde",
    source: "Week 8 Prac - Working with images in Python",
    sourcePage: 3,
    verification: "derived",
    topics: [topic.images, topic.imageOps],
    prompt: String.raw`
Sett alle pikslene i skiltområdet til intensitet 200 uten å endre originalbildet.
`,
    solution: String.raw`
### 1. Kopier før du skriver

**edited_pixels = img.array** ville bare gitt et nytt navn på samme array. **copy()** lager uavhengige pikseldata, slik at originalen fortsatt kan brukes i neste oppgave.

~~~python
from machinevisiontoolbox import Image

edited_pixels = img.array.copy()
edited_pixels[840:915, 615:765] = 200  # NumPy bruker [v, u]
edited = Image(edited_pixels)
edited.disp(block=True)
assert (edited_pixels[840:915, 615:765] == 200).all()
~~~

### 2. Regn ut hva som endres

Rektangelet inneholder $(915-840)(765-615)=75\cdot150=11\,250$ piksler. Skalarverdien 200 broadcastes til alle disse posisjonene. 200 er innenfor $[0,255]$ og kan lagres direkte i **uint8**; det er lyst grått, ikke rent hvitt.

### 3. Kontroller endring og bevaring

Alle piksler i regionen skal være 200. Alle piksler **utenfor** regionen skal være like originalen. Ta en kopi av originalen før forsøket og sjekk **np.array_equal(img.array, original_copy)** etterpå. Ikke krev at alle 11 250 verdier er forskjellige fra før; noen kan allerede ha vært 200.

QUT ber om en endret versjon av originalbildet. Her lages den som en kopi for at de øvrige oppgavene fortsatt skal ha et uendret referansebilde.
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
### 1. Skill geometriske og punktvise operasjoner

Speiling og subsampling flytter eller velger pikselposisjoner. Negativ og lysstyrkeendring beregner nye intensiteter fra hver enkelt piksel. Alle seks kan uttrykkes som array-operasjoner:

~~~python
import numpy as np
from machinevisiontoolbox import Image

pixels = img.array

horizontal = pixels[:, ::-1]
vertical = pixels[::-1, :]
negative = 255 - pixels
subsampled = pixels[::4, ::4]
brighter = np.clip(pixels.astype(np.int16) + 100, 0, 255).astype(np.uint8)
darker = np.clip(pixels.astype(np.int16) - 100, 0, 255).astype(np.uint8)

for result in [horizontal, vertical, negative, subsampled, brighter, darker]:
    Image(result.copy()).disp(block=True)
~~~

### 2. Forklar hvert resultat

| Operasjon | Hvorfor uttrykket virker | Kontroll |
|---|---|---|
| Horisontal speiling | Reverserer kolonnene, beholder radene | Venstre kant blir høyre kant |
| Vertikal speiling | Reverserer radene, beholder kolonnene | Øverste rad blir nederste rad |
| Negativ | $I'=255-I$ | $0\to255$, $100\to155$, $255\to0$ |
| Hver fjerde piksel | Velger indeks 0, 4, 8, … langs begge akser | Arrayform $(384,512)$, altså 512 × 384 piksler |
| Lysere | $I'=\min(255,I+100)$ | $100\to200$, $200\to255$ |
| Mørkere | $I'=\max(0,I-100)$ | $100\to0$, $50\to0$ |

### 3. Unngå overflow og forstå datatap

Konverter til en signert datatype **før** regningen. I 8-bits heltallsaritmetikk kan $200+100$ rulle rundt til 44, og $50-100$ til 206. Klipping etter overflow reparerer ikke verdiene. **int16** rommer mellomregningene −100 til 355; etter klipping er tilbakekonvertering til **uint8** trygg.

### Kontroll

Speil to ganger eller ta negativ to ganger: originalen skal komme tilbake. Subsampling og klipping er derimot tapsoperasjoner. Subsampling uten lavpassfiltrering kan gi aliasing; her følger vi oppgavens krav om hver fjerde piksel, ikke en generell anbefaling for kvalitetsnedskalering.
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
Lag tre $10\times10$ gråtonebilder: a) konstant intensitet 0.5, b) 0.5 med et lyst $2\times2$ sentrum på 0.9, og c) intensitet $I(u,v)=(u^2+v^2)/200$.
`,
    solution: String.raw`
~~~python
import numpy as np
from machinevisiontoolbox import Image

a = np.full((10, 10), 0.5, dtype=float)
b = a.copy()
b[4:6, 4:6] = 0.9

v, u = np.mgrid[0:10, 0:10]
c = (u**2 + v**2) / 200

Image(a).disp()
Image(b).disp()
Image(c).disp(block=True)
~~~

### 1. Velg flyttall for normalisert intensitet

Verdiene 0.5 og 0.9 skal ikke lagres som **uint8**, som ville trunkert dem til null. **np.full** oppretter 100 flyttall med verdi 0.5. Dermed er minimum, maksimum og gjennomsnitt i a) alle 0.5.

### 2. Plasser sentrum med nullbaserte indekser

Et bilde med partallige dimensjoner har ikke én midtpiksel. De to midterste radene og kolonnene har indekser 4 og 5, så slice **4:6** velger nøyaktig to av hver. Kopien i b) bevarer a). Fire piksler endres fra 0.5 til 0.9, og gjennomsnittet blir $(96\cdot0.5+4\cdot0.9)/100=0.516$.

### 3. Beregn den kvadratiske gradienten

**np.mgrid** lager koordinatarrayer med $u,v=0,1,\ldots,9$. Formelen fra PDF-side 3 gir eksempelvis $I(0,0)=0$, $I(3,4)=(9+16)/200=0.125$ og $I(9,9)=162/200=0.81$. Verdiene øker kvadratisk mot nederste høyre hjørne. Delingen på 200 kommer fra oppgaven; ikke normaliser maksimum til 1 hvis du skal følge den samme formelen.

### Kontroll

Alle tre arrayer skal ha form **(10,10)**. I b) skal nøyaktig fire verdier være 0.9, og c) skal ha minimum 0 og maksimum 0.81. Bruk samme visningsskala 0–1 hvis du sammenligner bildenes lyshet; automatisk kontraststrekking kan ellers få ulike tallområder til å se like ut.
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
  const problems = problemsByWeek[week] ?? [];
  if (week !== 2 && week !== 3) return problems;
  const warmup = getEgb339AssessmentSolution("assessment-1-0-warmup-to-gradescope");
  if (!warmup) return problems;
  const parts = week === 2 ? warmup.parts.slice(0, 7) : warmup.parts.slice(7);
  return [...problems, {
    id: `w${week}-prac-warmup`,
    title: week === 2 ? "Practical: Python-refresher (warmup Q1–Q7)" : "Practical: NumPy (warmup Q8–Q15)",
    source: week === 2 ? "Prac – Python Refresher" : "Prac – Numpy Basics",
    sourcePage: week === 2 ? 9 : 10,
    verification: "open",
    topics: [topic.numpy, topic.linearAlgebra],
    prompt: `Practicalen viser til ${week === 2 ? "Q1–Q7" : "Q8–Q15"} i [Warmup to Gradescope](/egb339/vurderinger/assessment-1-0-warmup-to-gradescope#losningsforslag). Gjennomfør hver funksjon, og kontroller både resultat og returtype. Se den enkelte delen nedenfor for oppgavekrav og utregning.`,
    solution: `${warmup.scope}\n\n${parts.map((part) => `## ${part.title}\n\n${part.content}`).join("\n\n")}\n\nKilde: ${warmup.source}`,
    answer: `Funksjonene skal gi resultatene og returformene som er forklart for hver del. ${week === 2 ? "Q1 og Q4 mangler docstring-detaljer, og Q3 har uklar grenseordlyd" : "Q10 mangler regneuttrykket fra docstringen"}; dette kan ikke merkes som ferdig QUT-verifisert uten startfilen.`,
  }];
}

export function getEgb339ProblemCount(week: number): number {
  return (problemsByWeek[week]?.length ?? 0) + (week === 2 || week === 3 ? 1 : 0);
}
