import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import PlanarArmExplorer from "@/components/egb339/PlanarArmExplorer";

const numpyPatterns = [
  ["Matrisemultiplikasjon", "A @ B", "Komponerer transformasjoner eller anvender en matrise på en vektor."],
  ["Elementvis produkt", "A * B", "Multipliserer verdier på tilsvarende posisjoner; er ikke matriseprodukt."],
  ["Transponat", "R.T", "For en rotasjonsmatrise er dette også inversen."],
  ["Numerisk sammenligning", "np.allclose(A, B)", "Bruk toleranse når flyttall skal sammenlignes."],
  ["Formkontroll", "matrix.shape == (n, n)", "Kontroller før du indekserer blokker i matrisen."],
];

export default function Egb339SummaryPage() {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">Hurtigark</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">Formler, NumPy og kontrollspørsmål</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">
        Et kompakt kart over kjernen i uke 1–8. Bruk det til repetisjon, og åpne temasiden når du trenger begrunnelsen bak en formel.
      </p>

      <section className="mt-9 grid gap-5 lg:grid-cols-2">
        <div className="min-w-0">
          <FormulaBox
            title="SO(2): rotasjon i planet"
            latex={String.raw`R(\theta)=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}`}
            description="Kolonnene er de roterte basisvektorene uttrykt i den opprinnelige rammen."
            conceptExplanation="En ren rotasjon bevarer lengder og vinkler. Derfor er kolonnene ortonormale."
            whenToUse="Når et punkt eller en retning skal roteres i 2D uten translasjon."
            commonMistakes={["Bruke grader direkte i NumPy", "Bytte fortegn i sinusleddene", "Bruke * i stedet for @"]}
          />
          <FormulaBox
            title="SE(3): full 3D-pose"
            variant="blue"
            latex={String.raw`T=\begin{bmatrix}R&t\\0\;0\;0&1\end{bmatrix},\qquad T^{-1}=\begin{bmatrix}R^T&-R^Tt\\0\;0\;0&1\end{bmatrix}`}
            description="Homogene koordinater gjør rotasjon og translasjon til én matriseoperasjon."
            whenToUse="Når rammer har både ulik orientering og ulikt origo."
            commonMistakes={["Glemme den homogene 1-eren", "Bruke -t i inversen i stedet for -Rᵀt"]}
          />
        </div>
        <div className="min-w-0">
          <FormulaBox
            title="Forward kinematics"
            latex={String.raw`{}^{0}T_E={}^0T_1\,{}^1T_2\cdots{}^nT_E`}
            description="Produktet følger den fysiske kjeden fra base til end-effektor."
            conceptExplanation="Hver faktor flytter beskrivelsen ett rammetrinn. Naboparene i notasjonen viser om kjeden henger sammen."
            whenToUse="Når leddverdiene er kjent og du skal finne end-effektorens pose eller posisjon."
            commonMistakes={["Multiplisere i motsatt rekkefølge", "Blande modellens q-vinkler med fysiske θ-vinkler", "Blande millimeter og meter"]}
          />
          <FormulaBox
            title="Differensiell kinematikk"
            variant="blue"
            latex={String.raw`\dot p=J(q)\dot q,\qquad \Delta p\approx J(q)\Delta q`}
            description="Jacobianen er den lokale lineære modellen av forward kinematics."
            whenToUse="For hastigheter og små endringer rundt den aktuelle robotkonfigurasjonen."
            commonMistakes={["Evaluere J i feil konfigurasjon", "Invertere en singulær eller ikke-kvadratisk Jacobian ukritisk"]}
          />
        </div>
      </section>

      <section className="mt-12" aria-labelledby="vision-summary-heading">
        <p className="text-sm font-bold uppercase tracking-wide text-fuchsia-700 dark:text-fuchsia-300">Robot vision</p>
        <h2 id="vision-summary-heading" className="mt-1 text-2xl font-bold text-neutral-950 dark:text-white">
          Fra piksel til robotens arbeidsflate
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
          Følg samme kjede hver gang: forstå arrayet → lag en maske → mål objektet → transformer koordinatet. Kontroller koordinatrekkefølge og datatype i hvert trinn.
        </p>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="min-w-0">
            <FormulaBox
              title="Bildekoordinat mot NumPy-indeks"
              variant="blue"
              latex={String.raw`\text{pixel }(u,v)\longleftrightarrow I[v,u]`}
              description="u øker mot høyre, v øker nedover; NumPy skriver rad før kolonne."
              conceptExplanation="Et bilde har origo øverst til venstre. Derfor er v radindeksen og u kolonneindeksen."
              whenToUse="Ved uthenting av piksler, cropping og når bildepunkter skal kobles til en homografi."
              commonMistakes={["Bruke image[u, v]", "Anta at første indeks er x", "Blande bildehøyde og bildebredde"]}
            />
            <FormulaBox
              title="Terskling"
              latex={String.raw`M(v,u)=\begin{cases}1,&I(v,u)>\tau\\0,&\text{ellers}\end{cases}`}
              description="Histogrammet hjelper deg å velge terskelen; masken må alltid inspiseres."
              conceptExplanation="Terskling gjør intensitetsdata om til en binær segmenteringsmaske. Ett globalt skille kan feile ved ujevn belysning eller overlappende fordelinger."
              whenToUse="Når forgrunn og bakgrunn kan skilles med intensitet eller én bearbeidet kanal."
              commonMistakes={["Velge terskel uten å se masken", "Ignorere ujevn belysning", "Bruke pikselvise Python-løkker i stedet for array-operasjoner"]}
            />
            <FormulaBox
              title="Formmål fra areal og omkrets"
              variant="blue"
              latex={String.raw`C=\frac{4\pi A}{P^2},\qquad S=\frac{16A}{P^2}`}
              description="Skaleringsuavhengige mål med idealverdi 1 for henholdsvis sirkel og kvadrat."
              conceptExplanation="Dette er generelle geometriske mål utledet fra idealformene. Assessment 1.5 krever en robust relasjon mellom areal og omkrets, men foreskriver ikke akkurat disse normaliseringene."
              whenToUse="Som én mulig, generell strategi for å skille sirkel, kvadrat og andre former."
              commonMistakes={["Dele på null ved degenerert omkrets", "Kreve eksakt idealverdi", "Tilpasse terskelen til bare ett eksempel"]}
            />
          </div>
          <div className="min-w-0">
            <FormulaBox
              title="Normalisert RGB"
              latex={String.raw`s=R+G+B,\qquad (r,g,b)=\frac{1}{s}(R,G,B)`}
              description="Fargeforholdene endres mindre når alle kanalene skaleres av samme lysstyrke."
              conceptExplanation="Normalisert kromatisitet er én egnet strategi når farge skal skilles fra total intensitet; det er ikke den eneste tillatte løsningen i Assessment 1.6."
              whenToUse="Når røde, grønne og blå objekter skal gjenkjennes ved varierende lysstyrke."
              commonMistakes={["Dele når s = 0", "Glemme at OpenCV vanligvis leser BGR", "Bruke absolutte kanalgrenser alene"]}
            />
            <FormulaBox
              title="Plan homografi"
              variant="blue"
              latex={String.raw`\tilde p\sim H\tilde q,\qquad \tilde q\sim H^{-1}\tilde p`}
              description="I emnets konvensjon går H fra arbeidsflaten q til bildepunktet p."
              conceptExplanation="Homogene punkter er definert opp til en ikke-null skala. Etter multiplikasjon må du derfor dele på siste komponent."
              whenToUse="For å gå mellom bildepiksler og fysiske punkter på en plan arbeidsflate."
              commonMistakes={["Bruke H i feil retning", "Glemme homogen koordinat", "Glemme normalisering etter multiplikasjon"]}
            />
            <div className="my-4 rounded-xl border border-fuchsia-300/60 bg-fuchsia-50/60 p-5 dark:border-fuchsia-800 dark:bg-fuchsia-950/25">
              <h3 className="font-bold text-neutral-950 dark:text-white">Fire kontrollspørsmål før du leverer vision-kode</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-neutral-700 dark:text-neutral-200">
                <li>Er kanalrekkefølge, shape og dtype eksplisitt kontrollert?</li>
                <li>Viser både histogrammet og masken at segmenteringen virker?</li>
                <li>Tåler regelen endret størrelse, lysstyrke og nye gyldige input?</li>
                <li>Er retningen på homografien skrevet ned før du inverterer?</li>
              </ol>
            </div>
          </div>
        </div>

        <nav aria-label="Fordypning i robot vision" className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/egb339/temaer/image-representation-and-processing" className="text-fuchsia-700 hover:underline dark:text-fuchsia-300">Bildeløypen →</Link>
          <Link href="/egb339/temaer/shape-descriptors-from-area-and-perimeter" className="text-fuchsia-700 hover:underline dark:text-fuchsia-300">Formmål →</Link>
          <Link href="/egb339/temaer/colour-normalization-and-chromaticity" className="text-fuchsia-700 hover:underline dark:text-fuchsia-300">Fargenormalisering →</Link>
          <Link href="/egb339/temaer/planar-homographies" className="text-fuchsia-700 hover:underline dark:text-fuchsia-300">Homografier →</Link>
        </nav>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">NumPy: operatøren må matche matematikken</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="min-w-full text-sm">
            <thead className="bg-robotics-50 dark:bg-robotics-950/40">
              <tr>
                <th className="px-4 py-3 text-left">Hensikt</th>
                <th className="px-4 py-3 text-left">Python</th>
                <th className="px-4 py-3 text-left">Hvorfor</th>
              </tr>
            </thead>
            <tbody>
              {numpyPatterns.map(([purpose, code, reason]) => (
                <tr key={purpose} className="border-t border-[var(--card-border)]">
                  <td className="px-4 py-3 font-semibold text-neutral-900 dark:text-neutral-100">{purpose}</td>
                  <td className="px-4 py-3"><code className="rounded bg-neutral-100 px-2 py-1 font-mono text-robotics-900 dark:bg-neutral-900 dark:text-robotics-100">{code}</code></td>
                  <td className="px-4 py-3 leading-6 text-neutral-700 dark:text-neutral-200">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Rammer", "Hvilken ramme er punktet uttrykt i, og hvilken ramme skal svaret uttrykkes i?"],
          ["Form", "Har input og returverdi nøyaktig formen docstringen krever?"],
          ["Gyldighet", "Er målet innenfor arbeidsrommet, og er matrisen faktisk i SO/SE-gruppen?"],
          ["Verifikasjon", "Kan svaret sendes tilbake gjennom den motsatte beregningen og gjenskape input?"],
        ].map(([title, body]) => (
          <div key={title} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h3 className="font-bold text-neutral-950 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-200">{body}</p>
          </div>
        ))}
      </section>

      <div className="mt-12"><PlanarArmExplorer /></div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/egb339/temaer" className="rounded-lg bg-robotics-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-robotics-800 dark:bg-robotics-400 dark:text-robotics-950 dark:hover:bg-robotics-300">Gå til alle temaer</Link>
        <Link href="/egb339/vurderinger" className="rounded-lg border border-robotics-300 px-4 py-2.5 text-sm font-semibold text-robotics-800 hover:bg-robotics-50 dark:border-robotics-800 dark:text-robotics-200 dark:hover:bg-robotics-950/40">Se vurderingskrav</Link>
      </div>
    </div>
  );
}
