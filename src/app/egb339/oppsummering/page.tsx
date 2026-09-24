"use client";

import Link from "next/link";
import FormulaBox from "@/components/egb339/pilot/Egb339Formula";
import { useEgb339Lang } from "@/lib/egb339-language/store";

type FormulaStrings = {
  title: string;
  description: string;
  conceptExplanation?: string;
  whenToUse: string;
  commonMistakes: string[];
};

const content = {
  no: {
    title: "Formler, NumPy og kontrollspørsmål",
    intro:
      "Et kompakt kart over kjernen i uke 1–8. Bruk det til repetisjon, og åpne temasiden når du trenger begrunnelsen bak en formel.",
    so2: {
      title: "SO(2): rotasjon i planet",
      description: "Kolonnene er de roterte basisvektorene uttrykt i den opprinnelige rammen.",
      conceptExplanation: "En ren rotasjon bevarer lengder og vinkler. Derfor er kolonnene ortonormale.",
      whenToUse: "Når et punkt eller en retning skal roteres i 2D uten translasjon.",
      commonMistakes: ["Bruke grader direkte i NumPy", "Bytte fortegn i sinusleddene", "Bruke * i stedet for @"],
    } satisfies FormulaStrings,
    se3: {
      title: "SE(3): full 3D-pose",
      description: "Homogene koordinater gjør rotasjon og translasjon til én matriseoperasjon.",
      whenToUse: "Når rammer har både ulik orientering og ulikt origo.",
      commonMistakes: ["Glemme den homogene 1-eren", "Bruke -t i inversen i stedet for -Rᵀt"],
    } satisfies FormulaStrings,
    fk: {
      title: "Forward kinematics",
      description: "Produktet følger den fysiske kjeden fra base til end-effektor.",
      conceptExplanation:
        "Hver faktor flytter beskrivelsen ett rammetrinn. Naboparene i notasjonen viser om kjeden henger sammen.",
      whenToUse: "Når leddverdiene er kjent og du skal finne end-effektorens pose eller posisjon.",
      commonMistakes: [
        "Multiplisere i motsatt rekkefølge",
        "Blande modellens q-vinkler med fysiske θ-vinkler",
        "Blande millimeter og meter",
      ],
    } satisfies FormulaStrings,
    diffKin: {
      title: "Differensiell kinematikk",
      description: "Jacobianen er den lokale lineære modellen av forward kinematics.",
      whenToUse: "For hastigheter og små endringer rundt den aktuelle robotkonfigurasjonen.",
      commonMistakes: [
        "Evaluere J i feil konfigurasjon",
        "Invertere en singulær eller ikke-kvadratisk Jacobian ukritisk",
      ],
    } satisfies FormulaStrings,
    visionHeading: "Fra piksel til robotens arbeidsflate",
    visionIntro:
      "Følg samme kjede hver gang: forstå arrayet → lag en maske → mål objektet → transformer koordinatet. Kontroller koordinatrekkefølge og datatype i hvert trinn.",
    pixelIndex: {
      title: "Bildekoordinat mot NumPy-indeks",
      description: "u øker mot høyre, v øker nedover; NumPy skriver rad før kolonne.",
      conceptExplanation: "Et bilde har origo øverst til venstre. Derfor er v radindeksen og u kolonneindeksen.",
      whenToUse: "Ved uthenting av piksler, cropping og når bildepunkter skal kobles til en homografi.",
      commonMistakes: ["Bruke image[u, v]", "Anta at første indeks er x", "Blande bildehøyde og bildebredde"],
    } satisfies FormulaStrings,
    thresholding: {
      title: "Terskling",
      description: "Histogrammet hjelper deg å velge terskelen; masken må alltid inspiseres.",
      conceptExplanation:
        "Terskling gjør intensitetsdata om til en binær segmenteringsmaske. Ett globalt skille kan feile ved ujevn belysning eller overlappende fordelinger.",
      whenToUse: "Når forgrunn og bakgrunn kan skilles med intensitet eller én bearbeidet kanal.",
      commonMistakes: [
        "Velge terskel uten å se masken",
        "Ignorere ujevn belysning",
        "Bruke pikselvise Python-løkker i stedet for array-operasjoner",
      ],
    } satisfies FormulaStrings,
    shapeMeasures: {
      title: "Formmål fra areal og omkrets",
      description: "Skaleringsuavhengige mål med idealverdi 1 for henholdsvis sirkel og kvadrat.",
      conceptExplanation:
        "Dette er generelle geometriske mål utledet fra idealformene. Assessment 1.5 krever en robust relasjon mellom areal og omkrets, men foreskriver ikke akkurat disse normaliseringene.",
      whenToUse: "Som én mulig, generell strategi for å skille sirkel, kvadrat og andre former.",
      commonMistakes: ["Dele på null ved degenerert omkrets", "Kreve eksakt idealverdi", "Tilpasse terskelen til bare ett eksempel"],
    } satisfies FormulaStrings,
    normalizedRgb: {
      title: "Normalisert RGB",
      description: "Fargeforholdene endres mindre når alle kanalene skaleres av samme lysstyrke.",
      conceptExplanation:
        "Normalisert kromatisitet er én egnet strategi når farge skal skilles fra total intensitet; det er ikke den eneste tillatte løsningen i Assessment 1.6.",
      whenToUse: "Når røde, grønne og blå objekter skal gjenkjennes ved varierende lysstyrke.",
      commonMistakes: ["Dele når s = 0", "Glemme at OpenCV vanligvis leser BGR", "Bruke absolutte kanalgrenser alene"],
    } satisfies FormulaStrings,
    homography: {
      title: "Plan homografi",
      description: "I emnets konvensjon går H fra arbeidsflaten q til bildepunktet p.",
      conceptExplanation:
        "Homogene punkter er definert opp til en ikke-null skala. Etter multiplikasjon må du derfor dele på siste komponent.",
      whenToUse: "For å gå mellom bildepiksler og fysiske punkter på en plan arbeidsflate.",
      commonMistakes: ["Bruke H i feil retning", "Glemme homogen koordinat", "Glemme normalisering etter multiplikasjon"],
    } satisfies FormulaStrings,
    visionCheckHeading: "Fire kontrollspørsmål før du leverer vision-kode",
    visionChecks: [
      "Er kanalrekkefølge, shape og dtype eksplisitt kontrollert?",
      "Viser både histogrammet og masken at segmenteringen virker?",
      "Tåler regelen endret størrelse, lysstyrke og nye gyldige input?",
      "Er retningen på homografien skrevet ned før du inverterer?",
    ],
    visionNavAria: "Fordypning i robot vision",
    visionLinks: ["Bildeløypen", "Formmål", "Fargenormalisering", "Homografier"],
    numpyHeading: "NumPy: operatøren må matche matematikken",
    tablePurpose: "Hensikt",
    tablePython: "Python",
    tableWhy: "Hvorfor",
    numpyPatterns: [
      ["Matrisemultiplikasjon", "A @ B", "Komponerer transformasjoner eller anvender en matrise på en vektor."],
      ["Elementvis produkt", "A * B", "Multipliserer verdier på tilsvarende posisjoner; er ikke matriseprodukt."],
      ["Transponat", "R.T", "For en rotasjonsmatrise er dette også inversen."],
      ["Numerisk sammenligning", "np.allclose(A, B)", "Bruk toleranse når flyttall skal sammenlignes."],
      ["Formkontroll", "matrix.shape == (n, n)", "Kontroller før du indekserer blokker i matrisen."],
    ],
    checklist: [
      ["Rammer", "Hvilken ramme er punktet uttrykt i, og hvilken ramme skal svaret uttrykkes i?"],
      ["Form", "Har input og returverdi nøyaktig formen docstringen krever?"],
      ["Gyldighet", "Er målet innenfor arbeidsrommet, og er matrisen faktisk i SO/SE-gruppen?"],
      ["Verifikasjon", "Kan svaret sendes tilbake gjennom den motsatte beregningen og gjenskape input?"],
    ],
    labLink: "Åpne 2R-laboratoriet med ledd, rammer og matriser",
    footerNavAria: "Videre fra hurtigarket",
    footerLinks: ["Alle temaer", "Vurderingskrav"],
  },
  en: {
    title: "Formulas, NumPy and control questions",
    intro:
      "A compact map of the core of weeks 1–8. Use it for revision, and open the topic page when you need the reasoning behind a formula.",
    so2: {
      title: "SO(2): rotation in the plane",
      description: "The columns are the rotated basis vectors expressed in the original frame.",
      conceptExplanation: "A pure rotation preserves lengths and angles. Therefore the columns are orthonormal.",
      whenToUse: "When a point or a direction is to be rotated in 2D without translation.",
      commonMistakes: ["Using degrees directly in NumPy", "Swapping the signs of the sine terms", "Using * instead of @"],
    } satisfies FormulaStrings,
    se3: {
      title: "SE(3): full 3D pose",
      description: "Homogeneous coordinates make rotation and translation a single matrix operation.",
      whenToUse: "When frames have both a different orientation and a different origin.",
      commonMistakes: ["Forgetting the homogeneous 1", "Using -t in the inverse instead of -Rᵀt"],
    } satisfies FormulaStrings,
    fk: {
      title: "Forward kinematics",
      description: "The product follows the physical chain from base to end effector.",
      conceptExplanation:
        "Each factor moves the description one frame step. The neighbouring pairs in the notation show whether the chain is connected.",
      whenToUse: "When the joint values are known and you need the end effector's pose or position.",
      commonMistakes: [
        "Multiplying in the wrong order",
        "Mixing the model's q angles with physical θ angles",
        "Mixing millimetres and metres",
      ],
    } satisfies FormulaStrings,
    diffKin: {
      title: "Differential kinematics",
      description: "The Jacobian is the local linear model of forward kinematics.",
      whenToUse: "For velocities and small changes around the current robot configuration.",
      commonMistakes: [
        "Evaluating J at the wrong configuration",
        "Uncritically inverting a singular or non-square Jacobian",
      ],
    } satisfies FormulaStrings,
    visionHeading: "From pixel to the robot's work surface",
    visionIntro:
      "Follow the same chain every time: understand the array → create a mask → measure the object → transform the coordinate. Check coordinate order and data type at every step.",
    pixelIndex: {
      title: "Image coordinate vs NumPy index",
      description: "u increases to the right, v increases downwards; NumPy writes row before column.",
      conceptExplanation: "An image has its origin at the top left. Therefore v is the row index and u the column index.",
      whenToUse: "When extracting pixels, cropping, and when image points are to be linked to a homography.",
      commonMistakes: ["Using image[u, v]", "Assuming the first index is x", "Mixing image height and image width"],
    } satisfies FormulaStrings,
    thresholding: {
      title: "Thresholding",
      description: "The histogram helps you choose the threshold; the mask must always be inspected.",
      conceptExplanation:
        "Thresholding turns intensity data into a binary segmentation mask. A single global cut can fail with uneven illumination or overlapping distributions.",
      whenToUse: "When foreground and background can be separated by intensity or a single processed channel.",
      commonMistakes: [
        "Choosing the threshold without looking at the mask",
        "Ignoring uneven illumination",
        "Using pixel-wise Python loops instead of array operations",
      ],
    } satisfies FormulaStrings,
    shapeMeasures: {
      title: "Shape measures from area and perimeter",
      description: "Scale-invariant measures with ideal value 1 for circle and square respectively.",
      conceptExplanation:
        "These are general geometric measures derived from the ideal shapes. Assessment 1.5 requires a robust relation between area and perimeter, but does not prescribe exactly these normalisations.",
      whenToUse: "As one possible, general strategy for distinguishing circles, squares and other shapes.",
      commonMistakes: [
        "Dividing by zero for a degenerate perimeter",
        "Requiring the exact ideal value",
        "Tuning the threshold to only one example",
      ],
    } satisfies FormulaStrings,
    normalizedRgb: {
      title: "Normalised RGB",
      description: "The colour ratios change less when all channels are scaled by the same brightness.",
      conceptExplanation:
        "Normalised chromaticity is one suitable strategy when colour is to be separated from total intensity; it is not the only allowed solution in Assessment 1.6.",
      whenToUse: "When red, green and blue objects are to be recognised under varying brightness.",
      commonMistakes: [
        "Dividing when s = 0",
        "Forgetting that OpenCV usually reads BGR",
        "Using absolute channel limits alone",
      ],
    } satisfies FormulaStrings,
    homography: {
      title: "Planar homography",
      description: "In the course's convention, H goes from the work surface q to the image point p.",
      conceptExplanation:
        "Homogeneous points are defined up to a non-zero scale. After multiplication you must therefore divide by the last component.",
      whenToUse: "To go between image pixels and physical points on a planar work surface.",
      commonMistakes: [
        "Using H in the wrong direction",
        "Forgetting the homogeneous coordinate",
        "Forgetting normalisation after multiplication",
      ],
    } satisfies FormulaStrings,
    visionCheckHeading: "Four control questions before you submit vision code",
    visionChecks: [
      "Are channel order, shape and dtype explicitly checked?",
      "Do both the histogram and the mask show that the segmentation works?",
      "Does the rule tolerate changed size, brightness and new valid inputs?",
      "Is the direction of the homography written down before you invert?",
    ],
    visionNavAria: "Deeper into robot vision",
    visionLinks: ["The image track", "Shape measures", "Colour normalisation", "Homographies"],
    numpyHeading: "NumPy: the operator must match the mathematics",
    tablePurpose: "Purpose",
    tablePython: "Python",
    tableWhy: "Why",
    numpyPatterns: [
      ["Matrix product", "A @ B", "Composes transformations or applies a matrix to a vector."],
      ["Element-wise product", "A * B", "Multiplies values at corresponding positions; it is not a matrix product."],
      ["Transpose", "R.T", "For a rotation matrix this is also the inverse."],
      ["Numerical comparison", "np.allclose(A, B)", "Use a tolerance when comparing floating-point numbers."],
      ["Shape check", "matrix.shape == (n, n)", "Check before indexing blocks in the matrix."],
    ],
    checklist: [
      ["Frames", "Which frame is the point expressed in, and which frame should the answer be expressed in?"],
      ["Shape", "Do the input and return value have exactly the shape the docstring requires?"],
      ["Validity", "Is the target within the workspace, and is the matrix actually in the SO/SE group?"],
      ["Verification", "Can the answer be sent back through the inverse calculation and reproduce the input?"],
    ],
    labLink: "Open the 2R lab with joints, frames and matrices",
    footerNavAria: "Onwards from the cheat sheet",
    footerLinks: ["All topics", "Assessment requirements"],
  },
} as const;

export default function Egb339SummaryPage() {
  const { lang } = useEgb339Lang();
  const c = content[lang];
  return (
    <article className="egb-pilot-article egb-pilot-prose egb-study-reference">
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">{c.title}</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">{c.intro}</p>

      <section className="mt-9 egb-study-formula-list">
        <div className="min-w-0">
          <FormulaBox
            title={c.so2.title}
            latex={String.raw`R(\theta)=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}`}
            description={c.so2.description}
            conceptExplanation={c.so2.conceptExplanation}
            whenToUse={c.so2.whenToUse}
            commonMistakes={c.so2.commonMistakes}
          />
          <FormulaBox
            title={c.se3.title}
            variant="blue"
            latex={String.raw`T=\begin{bmatrix}R&t\\0\;0\;0&1\end{bmatrix},\qquad T^{-1}=\begin{bmatrix}R^T&-R^Tt\\0\;0\;0&1\end{bmatrix}`}
            description={c.se3.description}
            whenToUse={c.se3.whenToUse}
            commonMistakes={c.se3.commonMistakes}
          />
        </div>
        <div className="min-w-0">
          <FormulaBox
            title={c.fk.title}
            latex={String.raw`{}^{0}T_E={}^0T_1\,{}^1T_2\cdots{}^nT_E`}
            description={c.fk.description}
            conceptExplanation={c.fk.conceptExplanation}
            whenToUse={c.fk.whenToUse}
            commonMistakes={c.fk.commonMistakes}
          />
          <FormulaBox
            title={c.diffKin.title}
            variant="blue"
            latex={String.raw`\dot p=J(q)\dot q,\qquad \Delta p\approx J(q)\Delta q`}
            description={c.diffKin.description}
            whenToUse={c.diffKin.whenToUse}
            commonMistakes={c.diffKin.commonMistakes}
          />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="vision-summary-heading">
        <h2 id="vision-summary-heading" className="mt-1 text-2xl font-bold text-neutral-950 dark:text-white">
          {c.visionHeading}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{c.visionIntro}</p>

        <div className="mt-5 egb-study-formula-list">
          <div className="min-w-0">
            <FormulaBox
              title={c.pixelIndex.title}
              variant="blue"
              latex={String.raw`\text{pixel }(u,v)\longleftrightarrow I[v,u]`}
              description={c.pixelIndex.description}
              conceptExplanation={c.pixelIndex.conceptExplanation}
              whenToUse={c.pixelIndex.whenToUse}
              commonMistakes={c.pixelIndex.commonMistakes}
            />
            <FormulaBox
              title={c.thresholding.title}
              latex={String.raw`M(v,u)=\begin{cases}1,&I(v,u)>\tau\\0,&\text{ellers}\end{cases}`}
              description={c.thresholding.description}
              conceptExplanation={c.thresholding.conceptExplanation}
              whenToUse={c.thresholding.whenToUse}
              commonMistakes={c.thresholding.commonMistakes}
            />
            <FormulaBox
              title={c.shapeMeasures.title}
              variant="blue"
              latex={String.raw`C=\frac{4\pi A}{P^2},\qquad S=\frac{16A}{P^2}`}
              description={c.shapeMeasures.description}
              conceptExplanation={c.shapeMeasures.conceptExplanation}
              whenToUse={c.shapeMeasures.whenToUse}
              commonMistakes={c.shapeMeasures.commonMistakes}
            />
          </div>
          <div className="min-w-0">
            <FormulaBox
              title={c.normalizedRgb.title}
              latex={String.raw`s=R+G+B,\qquad (r,g,b)=\frac{1}{s}(R,G,B)`}
              description={c.normalizedRgb.description}
              conceptExplanation={c.normalizedRgb.conceptExplanation}
              whenToUse={c.normalizedRgb.whenToUse}
              commonMistakes={c.normalizedRgb.commonMistakes}
            />
            <FormulaBox
              title={c.homography.title}
              variant="blue"
              latex={String.raw`\tilde p\sim H\tilde q,\qquad \tilde q\sim H^{-1}\tilde p`}
              description={c.homography.description}
              conceptExplanation={c.homography.conceptExplanation}
              whenToUse={c.homography.whenToUse}
              commonMistakes={c.homography.commonMistakes}
            />
            <div className="egb-study-check">
              <h3 className="font-bold text-neutral-950 dark:text-white">{c.visionCheckHeading}</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-neutral-700 dark:text-neutral-200">
                {c.visionChecks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <nav aria-label={c.visionNavAria} className="egb-study-inline-links">
          <Link href="/egb339/temaer/image-representation-and-processing">{c.visionLinks[0]}</Link>
          <Link href="/egb339/temaer/shape-descriptors-from-area-and-perimeter">{c.visionLinks[1]}</Link>
          <Link href="/egb339/temaer/colour-normalization-and-chromaticity">{c.visionLinks[2]}</Link>
          <Link href="/egb339/temaer/planar-homographies">{c.visionLinks[3]}</Link>
        </nav>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">{c.numpyHeading}</h2>
        <div className="egb-study-table">
          <table>
            <thead>
              <tr>
                <th className="px-4 py-3 text-left">{c.tablePurpose}</th>
                <th className="px-4 py-3 text-left">{c.tablePython}</th>
                <th className="px-4 py-3 text-left">{c.tableWhy}</th>
              </tr>
            </thead>
            <tbody>
              {c.numpyPatterns.map(([purpose, code, reason]) => (
                <tr key={purpose} className="border-t border-[var(--card-border)]">
                  <td className="px-4 py-3 font-semibold text-neutral-900 dark:text-neutral-100">{purpose}</td>
                  <td><code>{code}</code></td>
                  <td className="px-4 py-3 leading-6 text-neutral-700 dark:text-neutral-200">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="egb-study-checklist">
        {c.checklist.map(([title, body]) => (
          <div key={title} className="egb-study-check">
            <h3 className="font-bold text-neutral-950 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-200">{body}</p>
          </div>
        ))}
      </section>

      <p><Link href="/egb339/temaer/forward-kinematics#laboratorium">{c.labLink}</Link></p>

      <nav aria-label={c.footerNavAria} className="egb-study-inline-links">
        <Link href="/egb339/temaer">{c.footerLinks[0]}</Link>
        <Link href="/egb339/vurderinger">{c.footerLinks[1]}</Link>
      </nav>
    </article>
  );
}