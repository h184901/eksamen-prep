/** Authored teaching material, kept separate from the generated vault snapshot.
 * Sources and verification limits are displayed on each assessment page.
 * Examples are independent derivations, never copied student submission code.
 */
export interface Egb339AssessmentSolution {
  weeks: number[];
  source: string;
  scope: string;
  parts: { id: string; title: string; content: string; missingSourceDetail?: boolean }[];
}

const solutions: Record<string, Egb339AssessmentSolution> = {
  "assessment-1-0-warmup-to-gradescope": {
    weeks: [2, 3],
    source: "Warmup to Gradescope, PDF-side 1–6; Prac – Python Refresher, side 9 (Q1–Q7); Prac – Numpy Basics, side 10 (Q8–Q15).",
    scope: "Selve warmupen er merket uke 1, men er uttrykkelig practical i uke 2 og 3. Alle 15 spørsmål gjennomgås. Startfilen assignment1_0.py mangler lokalt: Q1, Q4 og Q10 kan ikke få en eksakt fasit fra PDF-en alene, og grenseordlyden i Q3 er uklar. Disse kildebegrensningene er markert, ikke fylt med oppdiktede krav.",
    parts: [
      { id: "q1", title: "Q1: arithmetic – regnerekkefølge", missingSourceDetail: true, content: String.raw`
### Fremgangsmåte

PDF-side 1 henviser til et uttrykk i funksjonens **docstring**, men gjengir ikke uttrykket. Startfilen er ikke tilgjengelig i det lokale kildesettet, så den eksakte mellomregningen og fasiten kan ikke bestemmes ennå.

Når uttrykket er tilgjengelig: regn parenteser først, deretter multiplikasjon/divisjon fra venstre mot høyre og til slutt addisjon/subtraksjon fra venstre mot høyre. Returner beregningen fra **arithmetic**, ikke bare skriv den ut. Vanlig **/** gir divisjon; **//** er heltalls-/gulvdivisjon og endrer oppgaven.

### Eget øvingseksempel, ikke QUT-spørsmålets ukjente uttrykk

$3+2(8-5)/2$ regnes som $3+2\cdot3/2=3+6/2=3+3=6$. Dette viser hvorfor parenteser behandles først. Ikke bruk 6 som hardkodet svar i innleveringen: den faktiske docstringen må kontrolleres før denne delen kan ferdigstilles.
` },
      { id: "q2", title: "Q2: basic_conditional", content: String.raw`
### Oversett betingelsen direkte

Kravet er sant når input er **mindre enn 10**. Det er en streng ulikhet $x<10$, ikke $x\le10$:

~~~python
def basic_conditional(x):
    return x < 10
~~~

For QUT-eksemplene 5, 8, 12 og −15 blir svarene **True, True, False, True**. Negative tall er mindre enn 10 og skal ikke avvises. Kontroller grensen med 9, 10 og 11: **True, False, False**. Et boolsk uttrykk har allerede verdien True/False; du trenger ikke en ekstra if/else bare for å returnere samme verdi.
` },
      { id: "q3", title: "Q3: extended_conditional og grensetilfeller", content: String.raw`
### Kombiner to krav med and

PDF-side 2 sier «greater than 0 and less than 10 inclusive». Dette avklarer ikke entydig om også nedre grense 0 skal inkluderes. Eksemplene 5, 8, 12 og −15 avklarer heller ikke endepunktene.

Hvis begge endepunktene er inkludert, er regelen **0 <= x <= 10**. Hvis nedre grense er streng og bare øvre er inkludert, er regelen **0 < x <= 10**. Begge gir QUT-eksempelsvarene **True, True, False, False**.

### Kontroll

Bruk logisk **and**, ikke **or**: et tall må oppfylle begge grensene. Test −1, 0, 1, 9, 10 og 11. Startfilens docstring/offentlige grensetester må avgjøre hva 0 skal gi før en endelig implementasjon velges. Vi presenterer ikke en vilkårlig tolkning som en verifisert QUT-fasit.
` },
      { id: "q4", title: "Q4: creating_collections – liste og tuppel", missingSourceDetail: true, content: String.raw`
### Opprett samlingene med riktige syntakser

PDF-side 2–3 oppgir **creating_collections**, men ikke hvilke elementer eller hvilken returstruktur docstringen krever. Detaljene må hentes fra den manglende startfilen.

Som et eget eksempel lager **items = [1, 2, 3]** en muterbar liste, mens **fixed = (1, 2, 3)** lager en uforanderlig tuppel. En ett-elements tuppel krever komma: **(1,)**; **(1)** er bare tallet 1 i parentes.

### Kontroll når startfilen foreligger

Bruk akkurat de påkrevde elementene og rekkefølgen. Kontroller **type**, lengde og innhold for hver samling. Hvis funksjonen ber om begge, må returstrukturen følge docstringen. Vi kan forklare mekanismen, men kan ikke fastslå en eksakt returverdi fra denne PDF-en alene.
` },
      { id: "q5", title: "Q5: while_loop – dobling opp til N", content: String.raw`
### Bygg listen trinnvis

Startverdien er 1. Legg den til bare dersom den er høyst N, og doble deretter. Betingelsen må kontrolleres **før** innsetting:

~~~python
def while_loop(N):
    values = []
    value = 1
    while value <= N:
        values.append(value)
        value *= 2
    return values
~~~

Ved N=5: 1 godtas, 2 godtas, 4 godtas, 8 avvises. Resultatet er **[1,2,4]**. Ved N=3 stoppes løkken ved 4 og gir **[1,2]**, som i QUT-eksemplene. Ved N=1 får du **[1]**, mens N=0 gir tom liste. Oppdateringen **value *= 2** gjør at løkken faktisk terminerer for endelig N.
` },
      { id: "q6", title: "Q6: for_loop – ett boolsk svar per input", content: String.raw`
### Behold både lengde og rekkefølge

For hvert tall returneres om det er ikke-negativt: $x\ge0$. Null skal derfor gi True.

~~~python
def for_loop(values):
    result = []
    for value in values:
        result.append(value >= 0)
    return result
~~~

**[10,-2,0,1]** gir **[True,False,True,True]**. **[-5,-7,0,-1]** gir **[False,False,True,False]**. Hver iterasjon legger til nøyaktig ett svar; ikke filtrer bort negative tall, for da blir listen for kort. Kontroller også tom input: den skal gi tom output.
` },
      { id: "q7", title: "Q7: definer add", content: String.raw`
### En funksjon trenger navn, argumenter og returverdi

QUT presiserer at funksjonen ikke allerede er deklarert. Opprett den med nøyaktig navnet **add**, to argumenter og en returverdi:

~~~python
def add(a, b):
    return a + b
~~~

QUT-eksemplene gir $1+1=2$, $2+8=10$ og $-5+5=0$. Argumentene må brukes generelt. **print(a+b)** alene returnerer None og oppfyller ikke kontrakten. Test med flere tallpar, inkludert null og negative tall.
` },
      { id: "q8", title: "Q8: array_creation og dtype", content: String.raw`
### Lag numeriske data med eksplisitt type

Kravet er verdiene 1, 2 og 3 i denne rekkefølgen, med **np.float64**. PDF-en tillater enhver form som inneholder tre elementer; enklest er en flat array:

~~~python
import numpy as np

def array_creation():
    return np.array([1, 2, 3], dtype=np.float64)
~~~

Kontroller at **size == 3**, **dtype == np.float64** og at verdiene er **[1.,2.,3.]**. Uten eksplisitt dtype ville heltallene normalt gitt en heltallsarray. Dette er forskjellen mellom riktig tallverdi og riktig datakontrakt, som blir viktig i senere autogradede funksjoner.
` },
      { id: "q9", title: "Q9: array_shape – to rader, tre kolonner", content: String.raw`
### Oversett dimensjonene til NumPy-form

NumPy bruker **(rader, kolonner)**. To rader og tre kolonner betyr form **(2,3)** og $2\cdot3=6$ elementer. Verdiene er valgfrie, men datatypen skal være float64:

~~~python
def array_shape():
    return np.zeros((2, 3), dtype=np.float64)
~~~

Dette gir $\begin{bmatrix}0&0&0\\0&0&0\end{bmatrix}$. Kontroller både **shape** og **dtype**. En flat seks-elements array har riktig antall verdier, men feil form. **(3,2)** er heller ikke det samme som **(2,3)**.
` },
      { id: "q10", title: "Q10: numpy_arithmetic – elementvis regning", missingSourceDetail: true, content: String.raw`
### Behold regneuttrykket fra docstringen

PDF-side 4 oppgir at to arrayer skal kombineres med uttrykket i **numpy_arithmetic** sin docstring, men gjengir ikke uttrykket. Det kan derfor ikke lages en eksakt QUT-fasit før startfilen er tilgjengelig.

Ved elementvis regning bruker du **+**, **-**, **\*** og **/** på tilsvarende elementer. For egne eksempelarrayer $A=[1,2]$ og $B=[3,4]$ blir **A * B** lik $[3,8]$, mens **A @ B** blir tallet 11. Disse er forskjellige operasjoner.

### Kontroll når uttrykket er kjent

Regn ut hvert element for et lite, selvvalgt eksempel med samme form som inputene. Kontroller parentesrekkefølge, **shape**, **dtype** og at inputene ikke endres ved utilsiktede operasjoner som **A += B**. Ikke bytt elementvis multiplikasjon med matriseprodukt, og ikke sett inn et oppdiktet uttrykk bare for å få en returverdi.
` },
      { id: "q11", title: "Q11: transpose", content: String.raw`
### Bytt indeksene, ikke verdiene

For en 2D-array er $A^T_{ij}=A_{ji}$. QUT-eksemplet $\begin{bmatrix}1&2\\3&4\end{bmatrix}$ blir $\begin{bmatrix}1&3\\2&4\end{bmatrix}$. Raden $\begin{bmatrix}5&7&9\end{bmatrix}$ blir en kolonne med form **(3,1)**.

~~~python
def transpose(A):
    return A.T
~~~

Inputene er 2D ifølge oppgaven, så vanlig transponering er tilstrekkelig. Kontroller at form **(m,n)** blir **(n,m)** og at **A.T.T** gir A. Returner matrisen; ikke bare formater den som tekst.
` },
      { id: "q12", title: "Q12: determinant", content: String.raw`
### Bruk en generell matriseoperasjon

For en 2×2-matrise er $\det A=ad-bc$. QUT-eksemplet $\begin{bmatrix}1&1\\2&0\end{bmatrix}$ gir $1\cdot0-1\cdot2=-2$.

~~~python
def determinant(A):
    return np.linalg.det(A)
~~~

**np.linalg.det** fungerer også for andre kvadratiske størrelser; ikke hardkod 2×2-formelen hvis inputkontrakten tillater større matriser. Kontroller identitetsmatrisen (determinant 1), to like rader (determinant 0) og eksempelmatrisen (−2). Bruk toleranse ved flyttallssammenligning.
` },
      { id: "q13", title: "Q13: inverse", content: String.raw`
### Inversen skal oppheve hele matriseproduktet

QUT-eksemplet er $A=\begin{bmatrix}1&2\\1&0\end{bmatrix}$. Determinanten er $1\cdot0-2\cdot1=-2$, så

$$A^{-1}=\frac1{-2}\begin{bmatrix}0&-2\\-1&1\end{bmatrix}=\begin{bmatrix}0&1\\0.5&-0.5\end{bmatrix}.$$

~~~python
def inverse(A):
    return np.linalg.inv(A)
~~~

Kontroller produktet: første rad i $AA^{-1}$ er $(1\cdot0+2\cdot0.5,1\cdot1+2(-0.5))=(1,0)$, andre rad er $(0,1)$. Elementvis **1/A** er ikke en invers. En singulær matrise har ingen invers og skal ikke gis et vilkårlig erstatningssvar.
` },
      { id: "q14", title: "Q14: broadcasting av rad-offsetter", content: String.raw`
### Gi offsettet en eksplisitt kolonneform

Første rad skal få +1 og andre rad +2. Offsetarrayet må derfor ha form **(2,1)**, slik at hver radverdi gjentas langs kolonnene:

~~~python
def broadcasting(A):
    return A + np.array([[1], [2]])
~~~

For $A=\begin{bmatrix}1&2&3\\4&5&6\end{bmatrix}$ utvides offsettet til $\begin{bmatrix}1&1&1\\2&2&2\end{bmatrix}$, og resultatet blir $\begin{bmatrix}2&3&4\\6&7&8\end{bmatrix}$, som i QUT-eksemplet.

### Kontroll

Test både **(2,3)** og **(2,2)**. En flat offsetarray **[1,2]** ville ved to kolonner gitt kolonne-offsetter uten feilmelding; derfor er bare en 2×2-test utilstrekkelig. Returformen skal være uendret, og vanlig **A + offset** skal ikke mutere A.
` },
      { id: "q15", title: "Q15: matrix_multiplication og rettet eksempel", content: String.raw`
### Bruk rad mot kolonne

Oppgaven ber om $AB$, ikke elementvis multiplikasjon. QUTs eksempelmatriser gir

$$
\begin{bmatrix}1&2\\3&4\end{bmatrix}\begin{bmatrix}5&6\\7&8\end{bmatrix}
=\begin{bmatrix}1\cdot5+2\cdot7&1\cdot6+2\cdot8\\3\cdot5+4\cdot7&3\cdot6+4\cdot8\end{bmatrix}
=\begin{bmatrix}19&22\\43&50\end{bmatrix}.
$$

~~~python
def matrix_multiplication(A, B):
    return A @ B
~~~

### Kontroll og kildeavvik

PDF-side 6 viser feilaktig første rad **[12,14]**. Den korrekte raden er **[19,22]**; andre rad stemmer. Bruk kravet om matriseprodukt, ikke den feiltrykte eksempelraden.

Kontroller at indre dimensjoner passer: **(m,n) @ (n,p)** gir **(m,p)**. Test også ikke-kvadratiske matriser, fordi elementvis **A * B** eller byttet faktororden ellers kan se plausibelt ut i et snevert eksempel.
` },
    ],
  },
  "assessment-1-1-position-and-orientation-in-2d": {
    weeks: [2],
    source: "EGB339 Assessment 1.1 – Position and orientation in the 2D plane, PDF-side 1–3 (Q1–Q5).",
    scope: "Egne utledninger kontrollert mot oppgavebeskrivelsen. Figurene er illustrasjoner; funksjonene skal virke for generelle input. Ingen offisiell løsningskode er tilgjengelig lokalt.",
    parts: [
      { id: "q1", title: "Q1: konstruer en SO(2)-rotasjon", content: String.raw`
### Fra roterte akser til matrise

Les [SO(2)](/egb339/temaer/so-2-rotation-matrices) og [uke 2](/egb339/uker/uke-2). En x-enhetsvektor rotert mot klokken med $\theta$ blir $(\cos\theta,\sin\theta)$. Den roterte y-enhetsvektoren er $(-\sin\theta,\cos\theta)$. Sett dem som kolonner:

$$R(\theta)=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}.$$

Et eget kontrolleksempel er $\theta=\pi/6$: $\cos\theta=\sqrt3/2$, $\sin\theta=1/2$, så $R=\begin{bmatrix}0.866025&-0.5\\0.5&0.866025\end{bmatrix}$.

~~~python
import numpy as np

def rotation2(theta):
    c, s = np.cos(theta), np.sin(theta)
    return np.array([[c, -s], [s, c]], dtype=float)
~~~

Dette er en hjelpefunksjon som viser algoritmen; behold navnet og signaturen i din startfil. Returner en array med form **(2,2)**, ikke en flat liste. Kontroller $R(0)=I$, $R(\pi/2)(1,0)^T=(0,1)^T$ og $R(-\theta)=R(\theta)^T$. Vinkelen er i radianer.
` },
      { id: "q2", title: "Q2: avgjør om en matrise tilhører SO(2)", content: String.raw`
### Tre krav må holde samtidig

Kontroller først form **(2,2)**, deretter $R^TR\approx I$ og $\det R\approx1$. Ortogonalitet betyr vinkelrette enhetsakser og bevaring av lengde. Determinantkravet utelukker speilinger.

~~~python
def valid_so2(candidate):
    if not isinstance(candidate, np.ndarray) or candidate.shape != (2, 2):
        return False
    if not np.issubdtype(candidate.dtype, np.number) or np.iscomplexobj(candidate):
        return False
    if not np.isfinite(candidate).all():
        return False
    return bool(
        np.allclose(candidate.T @ candidate, np.eye(2), atol=1e-8, rtol=1e-7)
        and np.isclose(np.linalg.det(candidate), 1.0, atol=1e-8, rtol=1e-7)
    )
~~~

Toleransene er egne numeriske valg, ikke dokumenterte grenser for private tester. Eksakt likhet er uegnet for trigonometriske flyttall. Matrisen $\operatorname{diag}(1,-1)$ gir $R^TR=I$, men $\det R=-1$ og skal avvises. Matrisen $\operatorname{diag}(2,0.5)$ har determinant 1, men $R^TR=\operatorname{diag}(4,0.25)\ne I$ og skal også avvises. Test begge; ett av kravene alene er utilstrekkelig.
` },
      { id: "q3", title: "Q3: transformer punktet fra A til B", content: String.raw`
### Velg motsatt retning av rammebeskrivelsen

Oppgaven gir $\;{}^Ap$ og beskriver B rotert $\theta$ relativt til A. Matrisen fra Q1 er $\;{}^AR_B$ og sender **B til A**. Derfor må punktet gå gjennom inversen:

$$ {}^Bp=({}^AR_B)^{-1}{}^Ap=({}^AR_B)^T{}^Ap.$$

Som eget regneeksempel: $\theta=\pi/2$, $\;{}^Ap=(2,3)^T$. Da blir

$$ {}^Bp=\begin{bmatrix}0&1\\-1&0\end{bmatrix}\begin{bmatrix}2\\3\end{bmatrix}=\begin{bmatrix}3\\-2\end{bmatrix}.$$

I kode er selve operasjonen **rotation2(theta).T @ p_A**. Behold input/output-formen fra startfilen. Kontroller baklengs: $R(\pi/2)(3,-2)^T=(2,3)^T$. Normen er fortsatt $\sqrt{13}$, men en bevart norm alene oppdager ikke feil transformasjonsretning.
` },
      { id: "q4", title: "Q4: bygg en SE(2)-transformasjon", content: String.raw`
### Legg translasjonen i en ekstra kolonne

Ren matrisemultiplikasjon med en 2×2-matrise kan rotere, men ikke flytte origo. Homogene koordinater legger til 1 slik at translasjon kan inngå i samme operasjon:

$$T=\begin{bmatrix}R&t\\0&1\end{bmatrix},\qquad T\begin{bmatrix}p\\1\end{bmatrix}=\begin{bmatrix}Rp+t\\1\end{bmatrix}.$$

~~~python
def transform2(theta, translation):
    T = np.eye(3)
    T[:2, :2] = rotation2(theta)
    T[:2, 2] = np.asarray(translation, dtype=float).reshape(2)
    return T
~~~

Med $\theta=\pi/2$ og $t=(1,2)$ blir $T=\begin{bmatrix}0&-1&1\\1&0&2\\0&0&1\end{bmatrix}$. Første to kolonner beskriver aksene, siste kolonne beskriver origo. Kontroller at $T(0,0,1)^T=(1,2,1)^T$ og at nederste rad alltid er $(0,0,1)$.
` },
      { id: "q5", title: "Q5: invers SE(2), steg for steg", content: String.raw`
### Trekk fra origo før du roterer tilbake

Oppgaven beskriver B i A og gir et punkt i A. Start fra $\;{}^Ap=R\,{}^Bp+t$. Trekk fra $t$, og gang med $R^T$:

$$ {}^Bp=R^T({}^Ap-t),\qquad T^{-1}=\begin{bmatrix}R^T&-R^Tt\\0&1\end{bmatrix}.$$

Med eget eksempel $\theta=\pi/2$, $t=(1,2)$ og $\;{}^Ap=(2,3)$ er differansen $(1,1)$. Dermed $\;{}^Bp=\begin{bmatrix}0&1\\-1&0\end{bmatrix}(1,1)^T=(1,-1)^T$.

For en homogen inputvektor med siste koordinat 1 kan du beregne **np.linalg.solve(T, p_A_h)**; for en vanlig 2-vektor brukes **R.T @ (p_A - t)**. Velg den varianten som passer startfilens returkrav. **R.T @ p_A - t** er feil fordi translasjonen da fortsatt er uttrykt i feil ramme.

### Kontroll

Transformer svaret tilbake: $R(1,-1)^T+(1,2)^T=(1,1)^T+(1,2)^T=(2,3)^T$. Test også nullrotasjon med translasjon, nulltranslasjon med rotasjon og punktet som ligger i B-origo. Sistnevnte skal gi nullkoordinater i B.
` },
    ],
  },
  "assessment-1-2-position-and-orientation-in-3d": {
    weeks: [3],
    source: "EGB339 Assessment 1.2 – Position and orientation in 3D, PDF-side 1–2; QUT-startfilen i assessment1-2.zip (returformer).",
    scope: "Egne utledninger og beregnede referanseverdier. Oppgavens tall er kontrollert i PDF-figurene; startfilen avklarer hvilke verdier som faktisk skal returneres.",
    parts: [
      { id: "q1", title: "Q1: rotasjon om x, y eller z", content: String.raw`
### Behold aksen som det roteres om

Fra [uke 3](/egb339/uker/uke-3) og [SO(3)](/egb339/temaer/so-3-rotation-matrices), med $c=\cos\theta$, $s=\sin\theta$:

$$
R_x=\begin{bmatrix}1&0&0\\0&c&-s\\0&s&c\end{bmatrix},\quad
R_y=\begin{bmatrix}c&0&s\\0&1&0\\-s&0&c\end{bmatrix},\quad
R_z=\begin{bmatrix}c&-s&0\\s&c&0\\0&0&1\end{bmatrix}.
$$

~~~python
import numpy as np

def rotation_matrix(axis, angle):
    c, s = np.cos(angle), np.sin(angle)
    if axis == "x":
        return np.array([[1, 0, 0], [0, c, -s], [0, s, c]], dtype=float)
    if axis == "y":
        return np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]], dtype=float)
    if axis == "z":
        return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]], dtype=float)
    raise ValueError("Aksen må være x, y eller z")
~~~

Startfilen krever **rotation_matrix(axis, angle)** og en SO(3)-matrise. For $R_y(\pi/2)$ blir $(1,0,0)$ til $(0,0,-1)$; dette kontrollerer fortegnet etter høyrehåndsregelen. Test alle akser ved 0, $\pi/2$ og en negativ vinkel, samt $R^TR\approx I$ og determinant 1.
` },
      { id: "q2", title: "Q2: tre lokale rotasjoner og to punkter", content: String.raw`
### 1. Bygg rotasjonen i oppgavens rekkefølge

Alle tre rotasjonene er om nye akser. Derfor postmultipliseres:

$$R={}^0R_A=R_x(0.2)R_y(0.3)R_z(0.4).$$

Skriv $c_x=\cos0.2$, $s_x=\sin0.2$, osv. De to første faktorene gir

$$R_xR_y=\begin{bmatrix}c_y&0&s_y\\s_xs_y&c_x&-s_xc_y\\-c_xs_y&s_x&c_xc_y\end{bmatrix}.$$

Gang deretter med $R_z(0.4)$, rad mot kolonne. Resultatet er

$$R\approx\begin{bmatrix}0.879923&-0.372026&0.295520\\0.435732&0.879838&-0.189796\\-0.189401&0.295774&0.936293\end{bmatrix}.$$

### 2. Send P fra A til 0

Oppgaven gir $\;{}^Ap=(1,2,3)^T$. Bruk $\;{}^0p=R\,{}^Ap$. Første komponent blir $0.879923-0.372026\cdot2+0.295520\cdot3=1.022433$. Alle komponentene gir $\;{}^0p\approx(1.022433,1.626020,3.211026)^T$.

### 3. Send Q motsatt vei

Oppgaven gir $\;{}^0q=(3,4,1)^T$. Bruk transponatet: $\;{}^Aq=R^T{}^0q\approx(4.193297,2.699049,1.063670)^T$. Eksempelvis er første komponent $0.879923\cdot3+0.435732\cdot4-0.189401=4.193297$.

**using_so3()** skal returnere **R, p_0, q_A**, der begge punktvektorene er 1D-arrays. Det trengs ingen generell matriseinvers fordi rotasjonsmatriser er ortogonale. Kontroller $R^T p_0=(1,2,3)$ og $R q_A=(3,4,1)$ uten å bruke den avrundede matrisen som inndata.
` },
      { id: "q3", title: "Q3: konstruer SE(3)", content: String.raw`
### Plasser blokker, ikke enkeltverdier på måfå

En 3D-pose består av en 3×3-rotasjon og et 3D-origo. Legg dem inn i en 4×4-identitetsmatrise:

~~~python
def transformation_matrix(axis, angle, t):
    T = np.eye(4)
    T[:3, :3] = rotation_matrix(axis, angle)
    T[:3, 3] = np.asarray(t, dtype=float).reshape(3)
    return T
~~~

Ved nullrotasjon og $t=(7,8,9)$ får vi

$$T=\begin{bmatrix}1&0&0&7\\0&1&0&8\\0&0&1&9\\0&0&0&1\end{bmatrix}.$$

Da sendes et homogent punkt $(1,2,3,1)^T$ til $(8,10,12,1)^T$. Nederste 1 gjør at translasjonskolonnen faktisk legges til. En retning bruker derimot homogen koordinat 0 og skal ikke translateres. Kontroller siste rad og form **(4,4)**, og at origo sendes til $t$.
` },
      { id: "q4", title: "Q4: valider hele SE(3)-matrisen", content: String.raw`
### Test i en trygg rekkefølge

1. Kandidaten skal være en reell, endelig NumPy-array med form **(4,4)**. Sjekk dette før du indekserer blokker.
2. Nederste rad skal være omtrent $(0,0,0,1)$.
3. Rotasjonsblokken $R=T[:3,:3]$ skal ha $R^TR\approx I$ og $\det R\approx1$.
4. Translasjonen kan være vilkårlige **endelige** reelle tall; den trenger ikke lengde 1.

~~~python
def is_se3(matrix):
    if not isinstance(matrix, np.ndarray) or matrix.shape != (4, 4):
        return False
    if not np.issubdtype(matrix.dtype, np.number) or np.iscomplexobj(matrix):
        return False
    if not np.isfinite(matrix).all():
        return False
    R = matrix[:3, :3]
    return bool(
        np.allclose(matrix[3], [0, 0, 0, 1], atol=1e-8, rtol=1e-7)
        and np.allclose(R.T @ R, np.eye(3), atol=1e-8, rtol=1e-7)
        and np.isclose(np.linalg.det(R), 1, atol=1e-8, rtol=1e-7)
    )
~~~

En homogen transformasjon med translasjon er **ikke** selv ortogonal: ikke sjekk $T^TT=I$. Test en gyldig translasjon, en speiling, en skalert rotasjonsblokk og en feil i siste rad. Toleransene over er egne kontrollvalg, ikke kjente private testgrenser.
` },
      { id: "q5", title: "Q5: full pose med translasjon (7, 8, 9)", content: String.raw`
### 1. Gjenbruk rotasjonen fra Q2

Med $t=(7,8,9)^T$ er $\;{}^0T_A=\begin{bmatrix}R&t\\0&1\end{bmatrix}$. De nye rotasjonene er de samme som før, så ikke bytt rekkefølge når du legger til translasjonen.

### 2. Transformer P direkte

$$ {}^0p=R(1,2,3)^T+t=(1.022433,1.626020,3.211026)^T+(7,8,9)^T.$$

Dermed $\;{}^0p\approx(8.022433,9.626020,12.211026)^T$.

### 3. Transformer Q invers

Først fjernes A-origo: $(3,4,1)-(7,8,9)=(-4,-4,-8)$. Deretter

$$ {}^Aq=R^T(-4,-4,-8)^T\approx(-3.747414,-4.397439,-7.913244)^T.$$

Dette er [invers SE(3)](/egb339/temaer/se-3-homogeneous-transformations): den inverse translasjonen er $-R^Tt$, ikke bare $-t$.

### Returkrav og kontroll

Selv om PDF-en også ber deg finne T i utregningen, sier startfilens **using_se3()** at funksjonen skal returnere **p_0, q_A**, begge som 1D-arrays. Ikke legg T til returtuplen. Kontroller **R.T @ (p_0 - t)** mot $(1,2,3)$ og **R @ q_A + t** mot $(3,4,1)$. Bruk uavrundede trigonometriske verdier i koden.
` },
    ],
  },
  "assessment-1-3-dobot-forward-kinematics": {
    weeks: [4],
    source: "EGB339 Assessment 1.3 – Robot forward kinematics, PDF-side 1–3: dimensjoner, hjemmekonfigurasjon og fysisk vinkelgeometri.",
    scope: "Egen utledning fra QUT-figurene. Assessment 1.3 bruker L3=30 mm og et signert vertikalt offset L4=−90 mm; dette er ikke simulatorens dimensjoner.",
    parts: [
      { id: "q1", title: "Q1: forward_kinematics_q med fire modellvinkler", content: String.raw`
### 1. Les hjemmekonfigurasjonen

Fra [uke 4](/egb339/uker/uke-4): basen roterer om z, de tre øvrige modellleddene om lokal y. Ved nullvinkler peker $L_1$ opp langs z, $L_2$ og $L_3$ langs x, og det signerte $L_4=-90$ mm ned langs z. Bruk $L_0=138,L_1=135,L_2=147,L_3=30$ mm.

### 2. Skriv én transformasjon per geometrisk trinn

La $T_x(a),T_z(a)$ være translasjoner og $R_y,R_z$ være **4×4 homogene** rotasjoner. Da er kjeden fra QUT-figurens base til verktøy

$$
{}^0T_E=R_z(q_1)T_z(L_0)R_y(q_2)T_z(L_1)
R_y(q_3)T_x(L_2)R_y(q_4)T_x(L_3)T_z(L_4).
$$

Gang i denne rekkefølgen med **@**. Hvert trinn er uttrykt i rammen som de foregående faktorene har etablert. Derfor kan du ikke flytte translasjonene vilkårlig foran rotasjonene.

En enkel translasjonsbygger er **T = np.eye(4); T[:3,3] = [dx,dy,dz]**. For rotasjoner setter du SO(3)-matrisen fra Assessment 1.2 i **T[:3,:3]**. Returner **T[:3,3]**, en 1D-array med tre posisjonsverdier i millimeter.

### 3. Utled en uavhengig kontrollformel

Sett $a=q_2+q_3$ og $b=q_2+q_3+q_4$. En y-rotasjon sender $(0,0,L)$ til $(L\sin q,0,L\cos q)$ og $(L,0,0)$ til $(L\cos q,0,-L\sin q)$. Derfor blir radialkomponenten

$$r=L_1\sin q_2+L_2\cos a+L_3\cos b+L_4\sin b,$$

og høyden

$$z=L_0+L_1\cos q_2-L_2\sin a-L_3\sin b+L_4\cos b.$$

Til slutt er $x=r\cos q_1$, $y=r\sin q_1$. Dette gir en kontroll av matriseproduktet, men Q1 ber om implementasjon som produkt av SE(3)-matriser.

### Kontroll

Ved $q=(0,0,0,0)$ er $r=147+30=177$ og $z=138+135-90=183$, altså $(177,0,183)$ mm. Ved $q_1=\pi/2$ alene blir svaret $(0,177,183)$. Test også uavhengige $q_3,q_4$: i Q1 skal de kunne variere fritt, og du skal ikke tvinge verktøyet vertikalt før vinkelkoblingen i Q2.
` },
      { id: "q2", title: "Q2: utled joint_mapping(theta)", content: String.raw`
### 1. Skill fysisk vinkel fra relativ leddvinkel

De tre fysiske vinklene er $\theta_1$ for basen, $\theta_2$ for overarmen fra vertikalen og $\theta_3$ for underarmen ned fra horisontalen. De fire $q$-vinklene i Q1 er rotasjoner mellom etterfølgende rammer.

Basen er uendret: $q_1=\theta_1$. Overarmens rotasjon fra vertikalen gir $q_2=\theta_2$.

### 2. Bruk den absolutte underarmsretningen

I matriseproduktet er underarmens samlede y-rotasjon $q_2+q_3$. QUT-figuren måler samme helning som $\theta_3$, så $q_2+q_3=\theta_3$. Isoler den relative albuevinkelen:

$$q_3=\theta_3-\theta_2.$$

### 3. Hold verktøyet vertikalt

Parallellkoblingen holder siste verktøyramme uten helning i armplanet, så $q_2+q_3+q_4=0$. Derfor $q_4=-\theta_3$:

~~~python
def joint_mapping(theta):
    theta1, theta2, theta3 = theta
    return np.array([theta1, theta2, theta3-theta2, -theta3], dtype=float)
~~~

Eksempel: $\theta=(0.2,0.3,0.4)$ gir $q=(0.2,0.3,0.1,-0.4)$. Kontroll: $q_2+q_3=0.4=\theta_3$ og $q_2+q_3+q_4=0$. Dette er geometrien bak [vinkelkoblingen](/egb339/temaer/joint-angle-mapping), ikke en ekstra motor du skal kommandere.
` },
      { id: "q3", title: "Q3: kombiner mapping og FK", content: String.raw`
### Komponer de to tidligere funksjonene

~~~python
def forward_kinematics(theta):
    return forward_kinematics_q(joint_mapping(theta))
~~~

Dermed gjenbrukes Q1s geometri og Q2s mekaniske kobling. Etter innsetting av $q_2+q_3=\theta_3$ og $q_2+q_3+q_4=0$ forenkles kontrollformelen til

$$r=135\sin\theta_2+147\cos\theta_3+30,$$

$$p=\begin{bmatrix}r\cos\theta_1\\r\sin\theta_1\\138+135\cos\theta_2-147\sin\theta_3-90\end{bmatrix}\ \text{mm}.$$

Kontroller matrisekoden mot dette uttrykket for flere ulike vinkelsett, ikke bare nullstillingen. Ved $\theta=(0,\pi/6,0)$ blir $r=67.5+147+30=244.5$ og $z=138+135\sqrt3/2-90\approx164.9134$ mm.

### Enheter og fortegn

Her betyr **L4=−90** allerede «nedover». I matriseproduktet brukes **Tz(L4)**, og i forenklet høyde brukes **+L4**. Å trekke fra L4 én gang til ville lagt verktøyet over håndleddet. Ikke bruk practicalens $L_3=60,L_4=80$ eller Assessment 1.4s mål i denne oppgaven.
` },
    ],
  },
  "assessment-1-4-robot-inverse-kinematics": {
    weeks: [4, 5],
    source: "EGB339 Assessment 1.4 – Robot inverse kinematics, PDF-side 1–4; startfil og offentlige returtype-tester i assessment1-4.zip.",
    scope: "Egen numerisk og geometrisk utledning. L0=138, L1=135, L2=147, L3=50 og nedoverlengde L4=120 mm. Offentlige tester kontrollerer blant annet form/type, men gir ingen komplett numerisk fasit eller garanti for private IK-grener.",
    parts: [
      { id: "q1", title: "Q1: FK, avstand og kostfunksjon", content: String.raw`
### 1. Bruk riktig verktøygeometri

Gjenbruk tankegangen fra [Assessment 1.3](/egb339/vurderinger/assessment-1-3-dobot-forward-kinematics), men **ikke de gamle lengdene**. Her beskriver $L_4=120$ en nedoverlengde:

$$r=135\sin\theta_2+147\cos\theta_3+50,$$

$$FK(\theta)=(r\cos\theta_1,r\sin\theta_1,138+135\cos\theta_2-147\sin\theta_3-120).$$

### 2. Fra feilvektor til én skalar

Sett $e=FK(\theta)-p^*$. Euklidisk avstand er $c(\theta,p^*)=\sqrt{e_x^2+e_y^2+e_z^2}$. Den blir null ved målpunktet og kan aldri være negativ.

~~~python
import numpy as np

def forwardKinematics(theta):
    t1, t2, t3 = theta
    r = 135*np.sin(t2) + 147*np.cos(t3) + 50
    z = 138 + 135*np.cos(t2) - 147*np.sin(t3) - 120
    return np.array([r*np.cos(t1), r*np.sin(t1), z], dtype=float)

def distance(a, b):
    return np.linalg.norm(np.asarray(a, dtype=float)-np.asarray(b, dtype=float))

def cost(theta, pstar):
    return distance(forwardKinematics(theta), pstar)
~~~

### Kontroll med QUTs offentlige eksempelinput

Ved $\theta=(0,0,0)$ er FK $(197,0,153)$ mm. For $p^*=(150,150,100)$ er feilen $(47,-150,53)$ og kostnaden $\sqrt{47^2+150^2+53^2}=\sqrt{27518}\approx165.8855$ mm. Dette tallet er vår utregning; den offentlige testen sjekker bare at kostnaden er en ikke-negativ NumPy-flyttallsskalar.

Ikke returner selve feilvektoren eller kvadrert norm når oppgaven ber om avstand. Test også **cost(theta, forwardKinematics(theta))**, som skal være null.
` },
      { id: "q2", title: "Q2: numerisk IK med fmin", content: String.raw`
### 1. La optimereren variere vinklene

Du kjenner målpunktet, men ikke vinklene. **fmin** starter fra et vinkelanslag og prøver andre vinkler for å redusere kostnaden. Metoden krever ikke at du utleder Jacobianen.

~~~python
from scipy.optimize import fmin

def inverse_kinematics(pstar):
    initial = np.array([np.arctan2(pstar[1], pstar[0]), 0.0, 0.0])
    theta, residual, iterations, calls, warning = fmin(
        cost, initial, args=(pstar,), xtol=1e-9, ftol=1e-9,
        maxiter=5000, maxfun=10000, full_output=True, disp=False,
    )
    if warning != 0 or residual > 1e-5:
        raise ValueError("IK konvergerte ikke til målet; sjekk arbeidsrom/startanslag")
    return np.asarray(theta, dtype=np.float64)
~~~

### 2. Tolk resultatet, ikke bare returverdien

Målpunktet er et fast ekstraargument **args=(pstar,)**, mens optimereren endrer **theta**. Kommaet lager en ett-elements tuple. **full_output=True** lar deg sjekke både restfeil og stoppårsak. Toleransene over er egne kontrollvalg og må ikke forveksles med QUTs private testkrav.

For $p^*=(150,150,100)$ finnes en vanlig fremovervendt løsning nær $(0.785398,0.180188,0.352959)$ rad. Ulike startanslag kan gi andre geometriske grener eller vinkler som skiller seg med $2\pi$; sammenlign derfor **FK-posisjoner**, ikke bare vinkelverdier.

### 3. Kontroller ytelse og begrensninger

Mål tiden rundt funksjonskallet med **time.perf_counter()**, uten utskrift eller simulatorbevegelse i måleintervallet. Gjenta for flere tilgjengelige mål og rapporter tid sammen med restfeil. QUT presiserer at denne tidsmålingen ikke vurderes.

Vanlig **fmin** håndhever ikke leddgrenser eller kollisjonssikkerhet. Et lite numerisk minimum er ikke bevis for en fysisk tillatt stilling. Sjekk arbeidsrom og leddgrenser særskilt; en ikke-konvergert løsning skal ikke ukritisk sendes til en robot.
` },
      { id: "q3", title: "Q3: geometrisk IK med utregning og grener", content: String.raw`
### 1. Løs toppvisningen

Bruk [atan2](/egb339/temaer/atan2-and-inverse-trigonometry): $\theta_1=\operatorname{atan2}(y,x)$ og $r=\sqrt{x^2+y^2}$. Vi utleder den vanlige fremovervendte armen med ikke-negativ radius. Ved $r=0$ er baseretningen ikke bestemt av x og y alene.

### 2. Fjern verktøyoffsettet i armplanet

Håndleddet ligger 50 mm nærmere basen og 120 mm over spissen. Målet relativt til skulderen blir

$$u=r-L_3,\qquad h=z+L_4-L_0,\qquad d=\sqrt{u^2+h^2}.$$

I QUT-figuren tilsvarer $u$ den horisontale avstanden BE og $d$ avstanden CE; bruk signert høyde $h$ slik at metoden også fungerer når målet er over skulderen. For $(150,150,100)$: $r=212.132034$, $u=162.132034$, $h=82$ mm.

### 3. Løs 2R-trekanten

La $a$ være overarmens vinkel fra horisontalen og $\delta$ vinkelen fra overarm til underarm. Dette er hjelpevinkler, ikke robotens fysiske vinkler. Fra cosinussetningen:

$$c_\delta=\frac{u^2+h^2-L_1^2-L_2^2}{2L_1L_2},\quad \delta=\pm\arccos c_\delta,$$

$$a=\operatorname{atan2}(h,u)-\operatorname{atan2}(L_2\sin\delta,L_1+L_2\cos\delta).$$

Fysisk måles skulderen fra vertikalen og underarmen ned fra horisontalen. Derfor

$$\theta_2=\pi/2-a,\qquad \theta_3=-(a+\delta).$$

For eksempelinputet er $c_\delta\approx-0.171912$, $\delta=-1.743567$ og $a=1.390608$. Negativ $\delta$ gir dermed $(\theta_1,\theta_2,\theta_3)\approx(0.785398,0.180188,0.352959)$ rad. Positiv $\delta$ gir den andre matematiske løsningen $(0.785398,2.024913,-1.289450)$; begge må vurderes mot fysiske leddgrenser før bruk.

### 4. Implementer med arbeidsromskontroll

~~~python
def inverse_kinematics_geom(pstar):
    x, y, z = np.asarray(pstar, dtype=float)
    r = np.hypot(x, y)
    u, h = r-50, z+120-138
    c = (u*u+h*h-135**2-147**2)/(2*135*147)
    if not np.isfinite(c) or abs(c) > 1+1e-10:
        raise ValueError("Målet ligger utenfor det geometriske arbeidsrommet")
    delta = -np.arccos(np.clip(c, -1, 1))
    a = np.arctan2(h, u)-np.arctan2(147*np.sin(delta), 135+147*np.cos(delta))
    return np.array([np.arctan2(y, x), np.pi/2-a, -(a+delta)], dtype=np.float64)
~~~

### Kontroll

Avstanden må oppfylle $|147-135|=12\le d\le282$ mm. Klipping er bare for små flyttallsavvik, ikke for å gjøre utilgjengelige mål «gyldige». Test **forwardKinematics(inverse_kinematics_geom(pstar))** mot målet ved flere punkter og sammenlign med numerisk IK. Offentlige tester avklarer returform **(3,)** og **float64**, men dokumenterer ikke hvilken gren alle private tester forventer. Geometrisk kontroll alene beviser heller ikke kollisjonssikkerhet.
` },
    ],
  },
  "assessment-1-5-warehouse-automation": {
    weeks: [8],
    source: "EGB339 Assessment 1.5 – Warehouse Automation, PDF-side 1–2; offentlig test i assessment1-5.zip.",
    scope: "Kobles til bilderepresentasjon i uke 8 og formbeskrivelser i uke 8–9. Egen matematisk klassifikator; den offentlige testen bekrefter bare tillatte svarstrenger, ikke klassifikasjonsnøyaktighet.",
    parts: [
      { id: "shape-classification", title: "Areal og omkrets → formklasse", content: String.raw`
### 1. Bruk dataene oppgaven faktisk gir

Segmentering er allerede utført. Du får areal $A$ i piksler² og omkrets $P$ i piksler, ikke et bilde du skal segmentere. [Formbeskrivelser](/egb339/temaer/shape-descriptors-from-area-and-perimeter) gjør dette til en dimensjonsløs sammenligning.

### 2. Utled en skaleringsuavhengig størrelse

For en sirkel er $A=\pi r^2$ og $P=2\pi r$. Sirkulariteten blir

$$C=\frac{4\pi A}{P^2}=\frac{4\pi^2r^2}{4\pi^2r^2}=1.$$

For et kvadrat med side $s$ er $A=s^2$, $P=4s$, så $C=4\pi s^2/(16s^2)=\pi/4\approx0.785398$. Ved skalering med faktor $k$ får vi $A'=k^2A$ og $P'=kP$, og $C$ forblir uendret. Derfor virker regelen på flere objektstørrelser.

### 3. Velg og begrunn toleransen

QUT antyder 0.1 som nyttig toleranse uten å angi én bestemt formel. Her bruker vi den på **absolutt feil i C**. Et annet mål ville krevd en annen tolkning av toleransen. Sirkelintervallet er $[0.9,1.1]$, kvadratintervallet omtrent $[0.685398,0.885398]$; de overlapper ikke.

~~~python
import numpy as np

def shape_classification(area, perimeter):
    if not np.isfinite([area, perimeter]).all() or area <= 0 or perimeter <= 0:
        return "other"
    circularity = 4*np.pi*area/(perimeter*perimeter)
    if abs(circularity-1) <= 0.1:
        return "circle"
    if abs(circularity-np.pi/4) <= 0.1:
        return "square"
    return "other"
~~~

### 4. Regn ut kontrolltilfeller

| Form / måling | $A$ | $P$ | $C$ | Denne regelen gir |
|---|---|---|---|---|
| Sirkel, $r=10$ | $100\pi$ | $20\pi$ | 1 | circle |
| Kvadrat, $s=10$ | 100 | 40 | $\pi/4$ | square |
| Rektangel 40 × 10 | 400 | 100 | $0.16\pi\approx0.502655$ | other |
| QUTs offentlige eksempel | 120 | 87 | $480\pi/7569\approx0.199229$ | other |

Test også flere skaleringer av de ideelle formene, nullomkrets og verdier på hver side av tersklene. Den offentlige testen for $(120,87)$ godtar hvilken som helst av de tre riktige **strengtypene**; «other» i tabellen er derfor vår utledning, ikke en oppgitt QUT-fasit.

### Begrensninger du bør kunne forklare

Areal og omkrets alene bestemmer ikke en vilkårlig form entydig. En litt avlang figur kan havne innenfor kvadrattoleransen, og pikselisering påvirker omkretsen. Dette er en heuristisk klassifikator for oppgavens formfamilier, ikke et matematisk bevis for at konturen er et kvadrat. Ikke lov perfekt gjenkjenning av alle tenkelige former fra to skalarer.
` },
    ],
  },
  "assessment-1-6-vision-fundamentals-part-1": {
    weeks: [8],
    source: "EGB339 Assessment 1.6 – Vision Fundamentals Part 1, PDF-side 1–2; sample_image.png og test_code.py i assessment1-6.zip.",
    scope: "Senere vurdering (uke 11), inkludert fordi den bygger på uke 8s bildearrayer og intensitet. Algoritmen er egen; resultatet (42, 34, 52) er kontrollert på QUTs offentlige eksempelbilde, ikke på private tester.",
    parts: [
      { id: "colour", title: "Skill farge fra intensitet", content: String.raw`
### 1. Hvorfor absolutte RGB-terskler svikter

Samme røde objekt kan være $(180,30,15)$ i sterkt lys og $(60,10,5)$ i svakere lys. Kravet «R større enn 100» ville miste det mørke objektet. Under den enkle lysmodellen $(R',G',B')=k(R,G,B)$ er forholdet mellom kanalene derimot bevart.

### 2. Normaliser med total intensitet

Fra [kromatisitet](/egb339/temaer/colour-normalization-and-chromaticity):

$$r=\frac{R}{R+G+B},\qquad g=\frac{G}{R+G+B},\qquad b=\frac{B}{R+G+B}.$$

Begge eksempeltripplene gir $(r,g,b)=(0.8,0.133333,0.066667)$, fordi skaleringsfaktoren kanselleres. For svarte piksler er summen null; disse må maskeres før divisjon. Konverter til flyttall før kanalsummering for å unngå uint8-overflow.

### 3. Lag én maske per dominerende farge

En piksel er rød når $r>g$ og $r>b$, tilsvarende for grønn og blå. Nøytral bakgrunn har like kanaler og avvises. Normaliseringen forklarer intensitetsuavhengigheten; for ren kanalrangering ville også de rå kanalene gitt samme rekkefølge, så lenge de ikke er klippet eller støypåvirket.

Gamma-korreksjon er ikke nødvendig ifølge oppgaveteksten. Vilkårlig farget belysning, sensorklipping og svært mørk støy er ikke dekket av den enkle felles-skaleringsmodellen.
` },
      { id: "count", title: "Tell sammenhengende objekter, ikke piksler", content: String.raw`
### 1. Segmenter og merk regioner

En fargemaske er en boolsk array. Antall sanne piksler er **areal**, ikke antall kvadrater. Merk sammenhengende regioner i hver maske og tell regionene:

~~~python
import numpy as np
from scipy.ndimage import label

def coloured_objects(img):
    rgb = np.asarray(img.array, dtype=float)
    if rgb.ndim != 3 or rgb.shape[2] != 3:
        raise ValueError("Forventer et RGB-bilde med tre kanaler")
    total = rgb.sum(axis=2, keepdims=True)
    chroma = np.divide(rgb, total, out=np.zeros_like(rgb), where=total > 0)
    counts = []
    for channel in range(3):
        other = [i for i in range(3) if i != channel]
        mask = ((chroma[:, :, channel] > chroma[:, :, other[0]])
                & (chroma[:, :, channel] > chroma[:, :, other[1]]))
        _, count = label(mask)  # 4-naboskap; bakgrunnen teller ikke
        counts.append(int(count))
    return tuple(counts)
~~~

### 2. Følg antall gjennom et lite eksempel

To adskilte røde 3×3-kvadrater gir 18 røde piksler, men **to** røde regioner. Ett grønt og ett blått kvadrat gir derfor svaret **(2,1,1)**, uavhengig av at kvadratene har forskjellige lysstyrker. Returrekkefølgen er alltid rød, grønn, blå.

### 3. Kontroller på QUT-bildet

Den offentlige testen leser **sample_image.png** med OpenCV og snur BGR til RGB før den oppretter **mvt.Image**. Den oppgitte referansen er **(42,34,52)**. Metoden over er kontrollert mot bildet og gir nøyaktig disse tallene, totalt $42+34+52=128$ objekter.

Test i tillegg et tomt bakgrunnsbilde, én av hver farge, flere lysstyrker og rene svarte piksler. Hvis du leser med OpenCV, må **img_cv[..., ::-1]** brukes før RGB-tolkning; ikke snu kanalene på et bilde som allerede er RGB.

### Begrensninger

Metoden forutsetter adskilte kvadrater og nøytral bakgrunn som i det offentlige eksemplet. To sammenhengende kvadrater av samme farge blir én region; nøytral bakgrunn med fargestøy kan gi falske småregioner. Eventuell metningsterskel, størrelsesfiltrering eller deling av berørende objekter må begrunnes og testes, ikke velges for å hardkode antallet i eksempelbildet. Det offentlige resultatet dokumenterer ikke alle private tilfeller.
` },
    ],
  },
  "assessment-1-7-vision-fundamentals-part-2": {
    weeks: [3, 8],
    source: "EGB339 Assessment 1.7 – Vision Fundamentals Part 2, PDF-side 1–2; eksempel-H og returformer i assessment1-7.zip/test_code.py.",
    scope: "Senere vurdering (uke 13), med kobling til homogene koordinater fra uke 3 og bildekoordinater fra uke 8. Gjennomgangen er egen. De offentlige testene sjekker form/type, ikke de beregnede tallene nedenfor.",
    parts: [
      { id: "q1", title: "Del 1: trekantareal på arbeidsflaten", content: String.raw`
### 1. Velg riktig transformasjonsretning

Kilden definerer $\bar p\sim H\bar q$: H sender arbeidsflatekoordinater til bildekoordinater. Oppgaven gir bildehjørnene $(650,640)$, $(580,810)$ og $(530,640)$, så vi må gå **motsatt vei** med $H^{-1}$. Homogene resultater må deretter normaliseres.

### 2. Regn ut punktene for QUT-testens eksempel-H

$$H=\begin{bmatrix}-0.8&0&0\\0&0.8&800\\0&0&2\end{bmatrix}.$$

Dette betyr $u=-0.4q_x$ og $v=0.4q_y+400$. Dermed $q_x=-2.5u$ og $q_y=2.5(v-400)$. Hjørnene på arbeidsflaten blir $(-1625,600)$, $(-1450,1025)$ og $(-1325,600)$.

Basen mellom første og tredje punkt er 300, høyden er $1025-600=425$, så arealet blir $\tfrac12\cdot300\cdot425=63\,750$ i arbeidsflatens kvadrerte lengdeenhet. Bildearealet $\tfrac12\cdot120\cdot170=10\,200$ er **ikke** arealet på arbeidsflaten.

### 3. Bruk en generell algoritme for vilkårlig H

Løs $H Q=P$ for de tre homogene punktkolonnene. Del hver kolonne med **sin egen** tredje koordinat. En generell homografi kan ha forskjellig skalafaktor ved hvert hjørne; én felles bildeskalering er derfor ikke tilstrekkelig.

~~~python
import numpy as np

def normalize_homography(H):
    H = np.asarray(H, dtype=float)
    if H.shape != (3, 3) or not np.isfinite(H).all():
        raise ValueError("H må være en endelig 3x3-matrise")
    scale = np.max(np.abs(H))
    if scale == 0:
        raise ValueError("Nullmatrisen er ikke en homografi")
    return H/scale

def dehomogenize(points):
    weights = points[2:3, :]
    relative_scale = np.max(np.abs(points), axis=0, keepdims=True)
    if np.any(np.abs(weights) <= 1e-12*relative_scale):
        raise ValueError("Et punkt ligger ved eller svært nær uendelig")
    return points[:2, :]/weights

def calculate_surface_area(H):
    pixels = np.array([[650, 580, 530], [640, 810, 640], [1, 1, 1]], dtype=float)
    q = dehomogenize(np.linalg.solve(normalize_homography(H), pixels))
    edge1, edge2 = q[:, 1]-q[:, 0], q[:, 2]-q[:, 0]
    return float(abs(edge1[0]*edge2[1]-edge1[1]*edge2[0])/2)
~~~

### Kontroll

Determinantuttrykket er trekantens areal: halvparten av parallellogrammet spent ut av to kanter. Absoluttverdien gjør at speilingen i eksempel-H ikke gir negativt areal. Ved $H=I$ får du 10 200; ved eksempel-H får du 63 750. **H** og **7H** beskriver samme homografi og skal gi samme svar. En singulær H skal avvises av løsningen, ikke gi et oppdiktet areal.
` },
      { id: "q2", title: "Del 2: fra arbeidsflatepunkt til bildepiksel", content: String.raw`
### 1. Utvid, transformer og normaliser

Her går vi i H sin direkte retning. For $q=(q_x,q_y)^T$ lager vi $\bar q=(q_x,q_y,1)^T$, beregner $w=H\bar q$, og returnerer $p=(w_1/w_3,w_2/w_3)^T$.

~~~python
def get_image_coordinates(H, q):
    q = np.asarray(q, dtype=float)
    if q.shape != (2, 1):
        raise ValueError("q skal ha form (2,1)")
    q_h = np.vstack((q, [[1.0]]))
    return dehomogenize(normalize_homography(H) @ q_h)
~~~

Hjelpefunksjonene er definert i del 1. Med QUT-testens $q=(320,250)^T$ og samme H er det u-normaliserte produktet $(-256,1000,2)^T$. Del på 2: $p=(-128,500)^T$.

### Kontroll og tolkning

Returformen skal være **(2,1)**, ikke **(2,)**, og koordinatene skal ikke rundes til heltall. Negativ u betyr at projeksjonen ligger utenfor bildets venstre kant; det er ikke grunn til å klippe til 0 i en matematisk koordinattransformasjon. Transformer punktet tilbake og sjekk at du får $(320,250)$. En homogen skaleringskomponent nær null må behandles som et degenerert tilfelle. Se [homografier](/egb339/temaer/planar-homographies) for forskjellen fra en rigid SE(3)-transformasjon.
` },
    ],
  },
  "assessment-2-1-simulation-and-oral-demonstration": {
    weeks: [3, 4, 5, 6, 7, 8],
    source: "EGB339 Assessment 2.1 – Simulation and Oral Demonstration (2026-09-07), PDF-side 1–5; Week 4 Prac (2026-09-07), side 2–3; utdelt keyboard.jpeg.",
    scope: "Vurderes i uke 9, men bruker pensum fra uke 3–8. Dette er en egen full metodegjennomgang, ikke en ferdig innmålt løsning for enhver scene. Scenepose, presstrykk og faktisk bevegelse må kontrolleres i CoppeliaSim; ingen simulator- eller fysisk robotkjøring er utført som del av nettstedskontrollen.",
    parts: [
      { id: "keyboard", title: "1. Fra bildepiksler til tastposisjoner i millimeter", content: String.raw`
### Definer en tastaturramme før du måler

Velg K-origo i tastaturets nederste venstre hjørne, $x_K$ mot høyre og $y_K$ oppover. Bildet har derimot origo øverst til venstre, med v nedover. Mål tastenes **sentrum**, ikke hjørner eller bokstavens plassering. Dette kobler [bildekoordinater fra uke 8](/egb339/uker/uke-8) til [referanserammer](/egb339/temaer/reference-frames).

QUT oppgir 290 mm bredde og 120 mm høyde. Hvis den innmålte bildeutstrekningen er W × H og $(u,v)$ måles kontinuerlig fra øvre venstre bildekant, blir

$$x_K=290\frac{u}{W},\qquad y_K=120\left(1-\frac{v}{H}\right).$$

Den utdelte **keyboard.jpeg** er 487 × 201 piksler. For et avlest A-sentrum omtrent $(76,110)$ blir $x_K=290(76/487)\approx45.26$ mm og $y_K=120(1-110/201)\approx54.33$ mm. Dette er en egen bildeavlesning, ikke en eksakt QUT-koordinatfasit.

### Registrer alle bokstavene, men test ett ord om gangen

En praktisk datastruktur er en ordbok **key_pixels[letter] = (u,v)**. Gå systematisk gjennom radene **QWERTYUIOP**, **ASDFGHJKL** og **ZXCVBNM**; radene har forskjellige horisontale offsetter. Behold målingene i piksler separat fra skalaen. Da kan tastaturet senere skaleres uten å måle alt på nytt.

For **APPLE** slår du opp A, P, P, L, E i denne rekkefølgen. Den gjentatte P-en må gi to separate ned–opp-trykk. QUT tillater høyst én bokstav som forekommer to ganger; LEVEL oppfyller ikke dette kravet.

### Kontroll

Marker de målte sentrene på referansebildet og sjekk at alle ligger godt innenfor tastene. Kontroller én venstre, én midtre og én høyre tast før du beregner hele ordet. Bruk faktisk bildeutstrekning hvis bildet er beskåret; 487 × 201 gjelder bare den utdelte filen.
` },
      { id: "frames", title: "2. Tastaturramme → robotbase", content: String.raw`
### Finn posen som knytter rammene sammen

QUT ber deg lese tastaturets posisjon og orientering i CoppeliaSim, enten i scenen eller for objektet **Plane**. Hvis simulatoren gir tastatur og robotbase relativt til verden W, er riktig transformasjon

$$ {}^BT_K=({}^WT_B)^{-1}{}^WT_K.$$

Produktet går K → W → B. Kontroller at K-origo er ditt valgte tastaturhjørne, ikke automatisk objektets sentrum. Hvis Plane-origo er i midten og aksene allerede passer, er hjørnet forskjøvet med $(-145,-60,0)$ mm i Plane-rammen. Rotasjoner eller andre aksevalg må tas med før dette offsettet brukes.

### Transformer hvert målpunkt

Legg til homogen koordinat 1: $\;{}^B\bar p={}^BT_K(x_K,y_K,z_K,1)^T$. For en vannrett tastaturflate er trykkhøyden fast, og en tilnærmingsposisjon lages høyere opp. Simulatorverdier oppgitt i meter må omregnes til millimeter før de blandes med robotlengdene.

Som **eget kontrollregnestykke**, ikke innmålt scenepose, sett $R=R_z(\pi/2)$, $t=(200,-50,20)$ mm og $p_K=(40,30,0)$ mm. Da er $Rp_K=(-30,40,0)$ og $p_B=(170,-10,20)$ mm. Dette tester både rotasjon og translasjon.

### Kontroll

K-origo skal gå til den innmålte posisjonen til det samme hjørnet i B. Transformer også en liten positiv forskyvning langs hver K-akse og kontroller retningen i scenen. En vanlig feil er riktig punktregning med feil objektorigo eller feil tolkning av simulatorens Euler-vinkelrekkefølge; ikke anta en rekkefølge uten å kontrollere scenens konvensjon.
` },
      { id: "ik", title: "3. Geometrisk IK med simulatorens lengder", content: String.raw`
### Gjenbruk metoden, bytt miljødata

Fra [uke 5](/egb339/uker/uke-5) og [Assessment 1.4](/egb339/vurderinger/assessment-1-4-robot-inverse-kinematics): bruk $L_0=138,L_1=135,L_2=147,L_3=60,L_4=80$ mm. Her er L4 en positiv **nedoverlengde**, slik at

$$r=135\sin\theta_2+147\cos\theta_3+60,\qquad z=138+135\cos\theta_2-147\sin\theta_3-80.$$

For målet $(x,y,z)$ i robotbasen setter du $\theta_1=\operatorname{atan2}(y,x)$, $u=\sqrt{x^2+y^2}-60$ og $h=z+80-138$. Deretter

$$c=\frac{u^2+h^2-135^2-147^2}{2(135)(147)},\quad \delta=-\arccos c,$$

$$
a=\operatorname{atan2}(h,u)-\operatorname{atan2}(147\sin\delta,135+147\cos\delta),\quad
\theta_2=\pi/2-a,\quad\theta_3=-(a+\delta).
$$

Samme grenkontroll og arbeidsromssjekk som i Assessment 1.4 gjelder. Ikke kopier dens $L_3=50,L_4=120$ inn i simulatoren.

### Håndregnet nullstillingskontroll

Ved fysiske nullvinkler er spissen $(207,0,193)$ mm. Omvendt gir målet $u=207-60=147$ og $h=193+80-138=135$. Da er $c=0$, $\delta=-\pi/2$, $a=\pi/2$ og alle fysiske vinkler null. Dette er en enkel kontroll av både offsett, fortegn og vinkelmapping.

### Kontroller hvert trykkmål og hvert løftemål

Beregn $\|FK(IK(p))-p\|$ før du sender en bevegelse. Velg en konsistent, fysisk tillatt albuegren og kontroller leddgrenser. Et godt sluttpunkt beviser ikke at banen mellom to stillinger er trygg. Simulatorens API-posisjon kan brukes som kontroll under practicalen, men skal ikke erstatte din egen FK/IK i vurderingsløsningen.
` },
      { id: "motion", title: "4. Planlegg hele trykksekvensen", content: String.raw`
### Skill bevegelse mellom taster fra selve tastetrykket

For hver bokstav trengs en posisjon over tasten, en trykkposisjon og en retur til posisjonen over tasten. Velg en kontrollert høyde over tastaturet og bekreft trykkhøyden i scenen; ikke la stylusen flyttes sideveis mens den er nede.

Sekvensen er:

1. Start i en kjent, kontrollert høy stilling.
2. Flytt over første tast, og vent til simulatorbevegelsen er ferdig.
3. Gå ned til trykkhøyden; vent på at trykket er utført.
4. Gå opp igjen før videre sideveis bevegelse.
5. Gjenta for neste bokstav, også når den er lik forrige bokstav.

Hold funksjonssignaturen **wordTypingRobot(robotObj, word)**. Bruk robotobjektet som sendes inn; ikke opprett en ekstra forbindelse inne i funksjonen. Slå opp hvert tegn i tastordboken og send vinklene som tre skalarer med **robotObj.move_arm(*theta)**. Simulatoren trenger at kommandoenes fullføring koordineres; practicalen viser ventetid mellom kommandoer.

### Forhåndskontroll før bevegelse

Bygg hele listen av kartesiske mål først, kontroller tastnavn, arbeidsrom, leddgrenser og FK-restfeil, og beregn så kommandoene. Dette fanger en ugyldig tast eller et utilgjengelig punkt før roboten har skrevet et halvt ord.

Bruk en lokal falsk robot som bare registrerer kommandoene til å teste rekkefølgen. For fem bokstaver skal det finnes fem separate ned–opp-trykk. Denne oppgaven krever A–Z; Enter er uttrykkelig påkrevd først i den fysiske oppgaven. Offline-testing kontrollerer algoritmen, men erstatter ikke demonstrasjon av faktisk kontakt i CoppeliaSim.
` },
      { id: "interpolation", title: "5. Ledd- og kartesisk interpolasjon", content: String.raw`
### To metoder for samme endepunkter

Fra [uke 7](/egb339/uker/uke-7): velg $s_i=i/(N-1)$ for N punkter. Ved leddinterpolasjon beregner du $q_i=(1-s_i)q_0+s_iq_f$ og bruker FK til å undersøke spissbanen. Ved kartesisk interpolasjon beregner du $p_i=(1-s_i)p_0+s_ip_f$ og løser IK for hvert punkt, med konsistent gren.

Eget eksempel: $q_0=(0,0.2,0.1)$ og $q_f=(0.4,0.6,0.3)$ gir midtpunktet $(0.2,0.4,0.2)$ i leddrom. Dette betyr ikke at FK-posisjonen er midt mellom de kartesiske endepunktene. For en kartesisk transport fra $(200,-20,30)$ til $(200,20,30)$ er derimot midtpunktet nøyaktig $(200,0,30)$.

### Fra veipunkter til tid

Parametriser $s(t)$ med kontrollert fart; lineære posisjonssteg alene sier ikke hvor raskt de sendes. En trapesprofil fra uke 7 gir akselerasjon, konstant fart og bremsing. [Jacobianen fra uke 6](/egb339/uker/uke-6) forklarer hvorfor samme leddhastighet gir ulik spisshastighet i ulike konfigurasjoner.

### Kontroll og avgrensning

Kontroller FK langs hele leddbanen, ikke bare endepunktene: leddinterpolasjon kan senke spissen under ønsket høyde. For kartesisk interpolasjon må også alle mellomliggende mål være tilgjengelige. Begrens vinkelhopp over $\pm\pi$ med fysisk gyldig vinkelkontinuitet, ikke ved å bytte gren tilfeldig.

QUT ber om at begge interpolasjonsformer kan demonstreres for høyeste funksjonsnivå i **simuleringen**. De skal **ikke** flyttes med over til Assessment 2.2, som uttrykkelig forbyr dem.
` },
      { id: "oral", title: "6. Forklar og kontroller løsningen før demonstrasjonen", content: String.raw`
### Forbered begrunnede svar, ikke bare kode

Du bør kunne forklare FK-kjeden og vinkelmappingen, trekantene i IK, hvorfor homogene koordinater har en ekstra 1, og hvordan du kontrollerte riktige rammer. Bruk egne tester: nullstillingen, en venstre og høyre tast, gjentatt bokstav, utilgjengelig mål og FK→IK→FK.

Hvis tastaturet krympes til 75 % mens origo står fast, skaleres **de lokale** tastkoordinatene: $p'_K=0.75p_K$ for koordinatene i planet. Robotpunktet blir $Rp'_K+t$, ikke $0.75(Rp_K+t)$; det siste ville også flyttet origo. Eksempel $p_K=(40,30,0)$ blir $(30,22.5,0)$, mens t er uendret.

En utvidet optimeringskostnad kan kombinere posisjonsfeil med straff for overskredne leddgrenser og liten hindringsklaring, for eksempel

$$f=\|FK(q)-p^*\|^2+\lambda\sum_i\bigl[\max(0,q_i-q_{i,\max})^2+\max(0,q_{i,\min}-q_i)^2\bigr].$$

Vektene må ha meningsfull skala, og straffeledd er ikke harde sikkerhetsgarantier. For faktiske begrensninger bør en egnet begrenset optimerer og etterkontroller brukes. Avstand til robotlenker kan begrunnes med [uke 7s segmentmetode](/egb339/uker/uke-7#w7-robot-clearance).

Mål IK-tid separat fra simulatorens ventetid, og diskuter nøyaktighet, hastighet og begrensninger. Eksempelspørsmålene i PDF-en er øvingsstøtte, ikke en garanti for hvilke spørsmål du får. GenAI kan brukes i forberedelsen etter de oppgitte kilde-/erkjennelseskravene, men ikke under den personlige muntlige vurderingen.
` },
    ],
  },
  "assessment-2-2-physical-robot-submission": {
    weeks: [3, 4, 5, 7],
    source: "EGB339 Assessment 2.2 – Robotics Applied Project: Physical Robot Submission, PDF-side 1, inkludert tastaturfoto og målsatt diagram.",
    scope: "Vurdering i uke 9 med grunnlag fra uke 3–7. Egen utledning fra den lokale QUT-kilden. Fysiske målinger og sikker utførelse må bekreftes i godkjent laboppsett; nettstedets tester kommanderer aldri en fysisk robot.",
    parts: [
      { id: "geometry", title: "1. Utled koordinater for alle bokstaver og Enter", content: String.raw`
### 1. Ikke bruk simulatorens QWERTY-tastatur

QUT-fotoet viser alfabetiske rader: **abcdefghi**, **jklmnopqr**, **stuvwxyz** og Enter. Diagrammet plasserer de to øverste radene 5.2 mm til høyre for K-origo. Bokstavtastene er 16.2 mm brede og 11.5 mm høye; Enter er 19 mm bred.

Velg $x_K$ mot høyre og $y_K$ oppover fra nederste venstre tastaturhjørne. Sentrum i nederste, midtre og øverste rad ligger henholdsvis ved $y_K=5.75,17.25,28.75$ mm.

For en bokstav med kolonneindeks $i=0,1,\ldots$ blir $x_K=o+(i+1/2)16.2$, der offsettet o er 5.2 for de to øverste radene og 0 for den nederste. Enter ligger etter åtte bokstaver: $x_K=8(16.2)+19/2=139.1$ mm, $y_K=5.75$ mm.

~~~python
def keyboard_positions_mm():
    keys = {}
    rows = [("abcdefghi", 5.2, 28.75),
            ("jklmnopqr", 5.2, 17.25),
            ("stuvwxyz", 0.0, 5.75)]
    for letters, offset, y in rows:
        for i, letter in enumerate(letters):
            keys[letter] = (offset+(i+0.5)*16.2, y)
    keys["enter"] = (8*16.2+19/2, 5.75)
    return keys
~~~

### 2. Kontroller diagrammet og radene

A-sentrum er $(13.3,28.75)$, J-sentrum $(13.3,17.25)$ og S-sentrum $(8.1,5.75)$ mm. Sammenlign disse med QUT-diagrammets 5.2 mm forskyvning før du utleder resten. Dette er beregnede sentre basert på kildens mål, ikke koordinater hentet fra studentkode. Kontroller hele layouten mot det gjeldende godkjente tastaturet før fysisk bruk.
` },
      { id: "transform", title: "2. Tastposisjoner i robotens referanseramme", content: String.raw`
### Bruk den oppgitte 90°-rotasjonen

K-origo ligger i $(248,-77.25)$ mm i robotbasen. Positiv $x_K$ peker langs robotens positive y, og positiv $y_K$ langs robotens negative x. Derfor

$$ {}^BT_K=\begin{bmatrix}0&-1&0&248\\1&0&0&-77.25\\0&0&1&0\\0&0&0&1\end{bmatrix}.$$

For et punkt på høyde z over trykkplanet gir dette

$$x_B=248-y_K,\qquad y_B=-77.25+x_K,\qquad z_B=z.$$

| Tast | Lokalt sentrum | Trykkpunkt i robotbasen (mm) |
|---|---|---|
| a | $(13.3,28.75)$ | $(219.25,-63.95,0)$ |
| j | $(13.3,17.25)$ | $(230.75,-63.95,0)$ |
| s | $(8.1,5.75)$ | $(242.25,-69.15,0)$ |
| enter | $(139.1,5.75)$ | $(242.25,61.85,0)$ |

Kontroller retningen: en rad opp øker $y_K$ med 11.5 og skal derfor **redusere x_B** med 11.5. En kolonne til høyre øker **y_B** med 16.2. Ikke bytt om x og y bare fordi diagrammet er tegnet fra en annen kameravinkel.
` },
      { id: "physical-ik", title: "3. Fysisk verktøyoffset og IK", content: String.raw`
### Tolk L4 som signert offset i denne kilden

Fysisk oppgave angir $L_0=138,L_1=135,L_2=147,L_3=60,L_4=-70$ mm. Bruk den signerte høydeforskyvningen **+L4**:

$$r=135\sin\theta_2+147\cos\theta_3+60,\qquad z=138+135\cos\theta_2-147\sin\theta_3-70.$$

Ved nullvinkler er FK $(207,0,203)$ mm. Hvis du får 343 mm i høyde, har du trukket fra en allerede negativ L4. Hvis du får 193 mm, har du fortsatt simulatorens verktøylengde.

### Tilpass den geometriske IK-en

For et robotmål $(x,y,z)$ er $u=\sqrt{x^2+y^2}-60$ og $h=z-138-(-70)=z-68$. Bruk så 2R-utledningen fra [Assessment 1.4](/egb339/vurderinger/assessment-1-4-robot-inverse-kinematics#solution-q3) med $L_1=135,L_2=147$. Basen er $\operatorname{atan2}(y,x)$, og de fysiske vinklene fås fra $\theta_2=\pi/2-a$, $\theta_3=-(a+\delta)$.

For A-trykket er høyden i armplanet $h=-68$ mm. Ved løft til z=10 er den $h=-58$ mm. Det er altså to forskjellige IK-mål selv om x og y er like.

### Kontroll før kjøring

Test alle 27 taster ved både trykk- og transporthøyde: arbeidsrom, fysiske leddgrenser og $FK(IK(p))\approx p$. Bruk samme tillatte albuegren. En matrise-/FK-test kan ikke alene bekrefte sikker bevegelse, kalibrering eller faktisk kontakt med skjermen.
` },
      { id: "sequence", title: "4. Seks tastetrykk med riktig API og løft", content: String.raw`
### 1. Planlegg før første kommando

Funksjonen må hete **wordTypingRobot(robotObj, word)**. Argumentrekkefølgen er eksplisitt angitt i kildens innleveringsavsnitt. Kontroller fem små bokstaver, og legg til **enter** som det sjette tegnet. Ikke kopier simulatorens begrensning på gjentatte bokstaver inn i den fysiske inputvalideringen; her skal det leverte fem-bokstavsordet skrives.

Bygg alle posisjoner og IK-løsninger på forhånd. Avvis ugyldige tegn og utilgjengelige eller ikke-tillatte leddstillinger **før** kommandoer sendes. Startforutsetningen må være en kjent, godkjent høy stilling; ikke finn på ukjente startkoordinater eller spør forbudte getters. Bruk oppsettets avklarte homing/startprosedyre.

### 2. Bruk opp–over–ned–opp-sekvensen

For hver av de seks tastene: flytt over sentrum med $z\ge10$ mm, gå ned til $z=0$, og løft vertikalt tilbake til minst 10 mm før neste sideveis bevegelse. For gjentatte bokstaver må du fortsatt løfte mellom trykkene. Etter Enter løftes stylusen igjen.

QUTs **move_arm(j1,j2,j3)** er blokkerende på fysisk robot: neste kommando skal komme etter at den forrige er fullført. **time.sleep()** skal fjernes. **get_joint_config()**, **get_end_effector_pose()**, simulatorimporter og både ledd-/kartesisk interpolasjon skal ikke brukes.

### 3. Skill målsekvens fra sikkerhetsgaranti

Ved å kontrollere kommanderte posisjoner kan du oppdage et mål under $z=-5$ mm eller sideveis transport før løft. Dette erstatter ikke oppsettets sikkerhetskontroll av faktisk bevegelse mellom leddmål. Ikke forsøk å omgå serverens avbruddsregler. Fysisk kjøring må skje gjennom den godkjente prosedyren.

### Offline-test uten å bruke et innleveringsforsøk

La en falsk robot registrere vinkelkommandoene. Beregn dem tilbake med egen FK og kontroller seks trykk ved z=0, løft etter hvert trykk, korrekt tegnrekkefølge og ingen forbudte API-kall. Test alle bokstaver og gjentakelser. Kildens maksimumstid er ett minutt; faktisk bevegelsestid kan ikke bevises av en rask offline-test, så timing må kontrolleres i det godkjente oppsettet.
` },
      { id: "score", title: "5. Regn på score og kontroller leveransen", content: String.raw`
### Sett inn antall riktige tegn og forsøk

Kilden gir $S=\max(0,\frac{10}{6}C-\min(5,\max(0.5(N-1),0)))$, der C er antall riktige tegn i rekkefølge, **inkludert Enter**, og N er antall forsøk.

Ved seks riktige tegn og første forsøk: $S=10-0=10$. Ved seks riktige og fjerde forsøk: straff $0.5(4-1)=1.5$, så $S=8.5$. Ved fem riktige og andre forsøk: $S=50/6-0.5\approx7.8333$. Ved elleve forsøk har straffen nådd taket 5, så seks riktige gir høyst 5 poeng.

### Sjekk filen før opplasting

Lever bare **wordTypingRobot.py**, uten simulatoravhengigheter, sleeps, forbudte getters eller interpolasjon. Kontroller at tastgeometri og verktøydata er for den fysiske oppgaven. Les serverens logger/video før et nytt forsøk; avbrutte kjøringer teller også som forsøk. Dette er forklaring av den lokale QUT-kilden, ikke en ny kontroll av eventuelle senere Canvas-endringer.
` },
    ],
  },
  "assessment-1-problem-solving-task-overview": {
    weeks: [2, 3, 4, 5, 6, 7, 8],
    source: "EGB339 Assessment 1 – Problem Solving Task: Details, PDF-side 1–2, og deloppgavenes lokale QUT-beskrivelser.",
    scope: "Dette er en oversikt, ikke en separat regneoppgave. Gjennomgangen knytter hele problemserien til uke 2–8 og viser hvordan løsningsforslagene brukes og kontrolleres. Senere vision-deler er tydelig merket som senere vurderinger.",
    parts: [
      { id: "learning-path", title: "Pensum → vurdering → kontroll", content: String.raw`
### Følg avhengighetene mellom oppgavene

| Pensum | Vurdering med gjennomgang | Hva du skal kunne kontrollere |
|---|---|---|
| Uke 2: Python og lineær algebra | [Warmup Q1–Q7](/egb339/vurderinger/assessment-1-0-warmup-to-gradescope#solution-q1) | Betingelser, løkker og returverdier |
| Uke 2: SO(2)/SE(2) | [Assessment 1.1](/egb339/vurderinger/assessment-1-1-position-and-orientation-in-2d#losningsforslag) | Ortonormalitet og transformasjon frem og tilbake |
| Uke 3: NumPy og 3D-pose | [Warmup Q8–Q15](/egb339/vurderinger/assessment-1-0-warmup-to-gradescope#solution-q8), [Assessment 1.2](/egb339/vurderinger/assessment-1-2-position-and-orientation-in-3d#losningsforslag) | Form, dtype, rotasjonsrekkefølge og invers pose |
| Uke 4: FK og fysisk vinkelmapping | [Assessment 1.3](/egb339/vurderinger/assessment-1-3-dobot-forward-kinematics#losningsforslag) | Matriser mot uavhengig geometrisk FK |
| Uke 5: IK | [Assessment 1.4](/egb339/vurderinger/assessment-1-4-robot-inverse-kinematics#losningsforslag) | Arbeidsrom, grener og FK-restfeil |
| Uke 6–7: Jacobian og bevegelse | [Assessment 2.1](/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration#losningsforslag) | Lokal hastighet, interpolasjon og bevegelsesgrenser |
| Uke 8: bildearrayer og intensitet | [Assessment 1.5](/egb339/vurderinger/assessment-1-5-warehouse-automation#losningsforslag) | Skaleringsuavhengig formmål fra areal/omkrets |
| Videre vision, uke 11 og 13 | [Assessment 1.6](/egb339/vurderinger/assessment-1-6-vision-fundamentals-part-1#losningsforslag), [Assessment 1.7](/egb339/vurderinger/assessment-1-7-vision-fundamentals-part-2#losningsforslag) | Intensitetsuavhengig farge og homografier |

Uke 6 og 7 har egne tutorialoppgaver selv om de ikke har hver sin nummererte Assessment 1-del. Ikke tolk nummeret etter punktum som et ukenummer.

### Arbeid fra kontrakt til kontroll

Les inputform, enhet og returkrav i startfilen. Utled formelen på papir, regn et lite eksempel, implementer generelt og test så med nye input. Eksempelvis bør en rotasjon kontrolleres med $R^TR=I$ og et kjent aksepunkt, ikke bare med én fasitmatrise.

Behold funksjonsnavn og tillatte importer. En offentlig test som bare sjekker **shape** eller at resultatet er en lovlig streng er ikke en faglig verifikasjon av algoritmen. De nye gjennomgangene skiller derfor mellom kildens krav, QUTs faktiske referansetall og egne beregninger. Warmupens manglende docstring-detaljer er markert på den aktuelle siden.
` },
      { id: "submission", title: "Bruk tester før et innleveringsforsøk", content: String.raw`
### Regn på den oppgitte forsøksmodellen

Oversiktskilden angir fem forsøk uten redusert poengtak. Fra forsøk 6 reduseres taket med 20 prosentpoeng per ekstra forsøk, ned til et gulv på 20 %. Dermed er takene ved forsøk 5, 6, 7, 8 og 9 henholdsvis **100, 80, 60, 40 og 20 %**. Dette er et tak på mulig resultat, ikke et bevis for hva din kode scorer.

### Lokal kontrolliste

1. Importer filen uten at simulator, GUI eller innleveringskjøring starter som sideeffekt.
2. Kjør offentlige tester i det utdelte miljøet.
3. Kontroller tallene uavhengig: FK mot geometri, IK mot FK eller matriser mot håndregning.
4. Test grenser og andre gyldige input, inkludert returform og dtype.
5. Les tilbakemelding før nytt forsøk; ikke bruk Gradescope som eneste feilsøkingsverktøy.

Behold individuelle arbeids- og kildekrav fra vurderingsbeskrivelsen. Gjennomgangene er studiestøtte; GenAI-bruk må vurderes kritisk og erkjennes etter de oppgitte QUT-reglene. Forsøksreglene er gjengitt fra den lokale kilden, ikke kontrollert mot eventuelle nyere Canvas-endringer.
` },
    ],
  },
  "assessment-2-applied-project-overview": {
    weeks: [3, 4, 5, 6, 7, 8],
    source: "EGB339 Assessment 2 – Applied Project Details (2026-09-07), PDF-side 1–4, samt detaljerte lokale beskrivelser av Assessment 2.1 og 2.2.",
    scope: "Full metodeoversikt for robotikkdelen som bygger på uke 3–8. Del 2.3 og 2.4 er senere vision-prosjekter; bare titler/vekter finnes i denne oversiktskilden, så det konstrueres ikke oppdiktede oppgavespesifikke fasiter for dem.",
    parts: [
      { id: "pipeline", title: "Fra pensum til et fungerende robotprosjekt", content: String.raw`
### Følg hele beregningskjeden

Tastens bildepiksel blir en lokal posisjon i millimeter, deretter et punkt i robotbasen, en IK-løsning og til slutt en kontrollert bevegelse. Hvert ledd har sin egen feilkilde:

| Trinn | Pensum | Uavhengig kontroll |
|---|---|---|
| Mål tastesentrum | Uke 8: bildekoordinater | Marker målingen på bildet |
| Skaler til mm | Uke 2: regning/arrayer | Kontroller kjent bredde og høyde |
| Transformer til robotbase | Uke 3: SE(3) | Kontroller origo, akser og invers transformasjon |
| Finn leddvinkler | Uke 4–5: FK/IK | Sett IK-vinklene tilbake i FK |
| Planlegg bevegelse | Uke 6–7: hastighet, interpolasjon, klaring | Undersøk hele banen og målsekvensen |
| Kontroller utførelsen | Practical/prosjekt | Vis faktiske tastetrykk i riktig miljø |

Se den trinnvise [simulatorgjennomgangen](/egb339/vurderinger/assessment-2-1-simulation-and-oral-demonstration#losningsforslag) og den separate [fysiske gjennomgangen](/egb339/vurderinger/assessment-2-2-physical-robot-submission#losningsforslag). En feil i tastaturmålingen kan ikke repareres ved å justere en korrekt IK-formel tilfeldig.

### Hold miljøkonfigurasjonen eksplisitt

Samle tastaturgeometri, rammetransformasjon, verktøyoffset og API-egenskaper som bevisste miljøvalg. Simuleringen har QWERTY-bilde, positiv nedoverlengde L4=80 og interpolasjonsdemonstrasjon. Fysisk oppgave har et annet tastatur, signert L4=−70, blokkerende bevegelser, Enter-krav og forbud mot interpolasjon/getters.

Begge kan beskrives med en felles **signert** vertikalforskyvning $d_z$: $z=138+135\cos\theta_2-147\sin\theta_3+d_z$. Da er $d_z=-80$ i simuleringen og $d_z=-70$ fysisk. Dette hindrer dobbel fortegnsendring, men endrer ikke QUTs oppgitte parameterkonvensjoner.
` },
      { id: "validation", title: "Validering, demonstrasjon og avgrensning", content: String.raw`
### Bygg opp verifikasjonen i nivåer

Start med håndregnet nullstilling og enhetstester av matematikk. Test så hele tekst→tast→punkt→vinkel-kjeden med en falsk robot som bare logger kommandoer. Kontroller deretter faktisk simulering. Overfør til fysisk robot bare med den separate oppgavens geometri og godkjente sikkerhetsprosedyre.

En fullført nettleser-/kodekontroll beviser ikke fysisk kalibrering eller at roboten treffer skjermen. Derfor holdes beregningstester, simulatorobservasjoner og fysisk kjøring som separate verifikasjonsnivåer.

### Vekter og innhold

Oversikten oppgir 12.5 % for 2.1, 10 % for 2.2, 12.5 % for 2.3 og 10 % for 2.4: totalt $12.5+10+12.5+10=45$ %. Robotikkhalvdelen utgjør 22.5 prosentpoeng, og vision-halvdelen like mye.

De detaljerte lokale oppgavebeskrivelsene for 2.1 og 2.2 gjennomgås her. For 2.3 og 2.4 finnes bare prosjektoversiktens beskrivelse av senere vision-guided pick-and-place; uke 8 og vision-assessmentene gir grunnlag, men ikke tilstrekkelig kilde til en full oppgavespesifikk løsningskode. Individuell muntlig demonstrasjon må forberedes med egen forståelse; GenAI skal ikke brukes under selve muntligkomponenten.
` },
    ],
  },
};

export function getEgb339AssessmentSolution(slug: string): Egb339AssessmentSolution | undefined {
  return solutions[slug];
}

export function getEgb339AssessmentSolutions() {
  return solutions;
}
