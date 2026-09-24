import Link from "next/link";
import { EGB339_PILOT, egb339LessonNeighbours } from "@/lib/egb339-course";
import { getEgb339Concept } from "@/lib/egb339-vault/loader";
import { PilotBreadcrumb, PilotEntryNav } from "./Egb339PilotShell";
import Egb339PilotProgress, { PilotStatus } from "./Egb339PilotProgress";
import MathText from "./Egb339Math";
import SE2Explorer from "./SE2Explorer";
import { T } from "../T";
import LangBlock from "../LangBlock";
import { ui } from "@/lib/egb339-language/ui";

const slug = "se-2-homogeneous-transformations";
const key = `egb339/tema/${slug}`;

export default function SE2Lesson() {
  const adjacent = egb339LessonNeighbours(slug);
  const link = (entrySlug: string | null) => {
    const entry = entrySlug ? getEgb339Concept(entrySlug) : null;
    return entry ? { href: entry.route, title: entry.title, pageKey: `egb339/tema/${entry.slug}` } : null;
  };
  return <>
    <PilotBreadcrumb title="SE(2)" week={2} />
    <article className="egb-pilot-article">
      <header className="egb-pilot-lesson-header">
        <h1><T no="SE(2): rotasjon og translasjon" en="SE(2): rotation and translation" /></h1>
        <p><T no="Uttrykk samme punkt i to koordinatrammer med én homogen transformasjon." en="Express the same point in two coordinate frames with one homogeneous transformation." /></p>
        <PilotStatus pageKey={key} />
        <LangBlock
          no={<nav aria-label={ui("no", "inThisLesson")}><a href="#utforsk">Figur og matrise</a><a href="#regneeksempel">Regneeksempel</a><a href="#prov-selv">Prøv selv</a><a href="#assessment">Assessment 1.1</a></nav>}
          en={<nav aria-label={ui("en", "inThisLesson")}><a href="#utforsk">Figure and matrix</a><a href="#regneeksempel">Worked example</a><a href="#prov-selv">Try it yourself</a><a href="#assessment">Assessment 1.1</a></nav>}
        />
      </header>

      <SE2LessonContent />
      <div className="egb-pilot-prose"><Egb339PilotProgress pageKey={key} /><PilotEntryNav previous={link(adjacent.previous)} next={link(adjacent.next)} /></div>
    </article>
  </>;
}

/** Shared, source-checked lesson body: the week page does not copy its mathematics. */
export function SE2LessonContent({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? "h3" : "h2";
  const Subheading = embedded ? "h4" : "h3";
  return <>
      <section className="egb-pilot-prose" id="teori">
        <Heading><T no="Et punkt, to koordinatrammer" en="One point, two coordinate frames" /></Heading>
        <p><LangBlock
          no={<>La A være verdensrammen og B den lokale rammen. <MathText inline>{String.raw`{}^AT_B`}</MathText> beskriver B i A og sender derfor koordinater <strong>fra B til A</strong>. Punktet flytter seg ikke fysisk når vi uttrykker det i en annen ramme.</>}
          en={<>Let A be the world frame and B the local frame. <MathText inline>{String.raw`{}^AT_B`}</MathText> describes B in A and therefore maps coordinates <strong>from B to A</strong>. The point does not physically move when we express it in another frame.</>}
        /></p>
        <MathText>{String.raw`{}^Ap = {}^AR_B\,{}^Bp + {}^At_B`}</MathText>
        <p><T no="Rotasjonen R uttrykker B-aksene i A. Translasjonen t er posisjonen til origo B målt i A. Vi bruker kolonnevektorer og positiv rotasjon mot klokken." en="The rotation R expresses the B axes in A. The translation t is the position of the B origin measured in A. We use column vectors and positive rotation counterclockwise." /></p>
      </section>

      <section id="utforsk" className="egb-pilot-wide">
        <Heading><T no="Se hva matrisen gjør" en="See what the matrix does" /></Heading>
        <p className="egb-pilot-prose"><T no="Velg bare rotasjon, og legg så til translasjonen. Endre vinkelen eller punktet: figur, matrise og regning oppdateres sammen." en="Choose rotation only, then add the translation. Change the angle or the point: figure, matrix and calculation update together." /></p>
        <SE2Explorer />
      </section>

      <section className="egb-pilot-prose" id="homogene-koordinater">
        <Heading><T no="Hvorfor matrisen har en tredje rad" en="Why the matrix has a third row" /></Heading>
        <p><T no="En 2 × 2-matrise kan rotere, men den kan ikke flytte origo. Ved å legge til koordinaten 1 lar vi translasjonen bli en del av samme multiplikasjon:" en="A 2 × 2 matrix can rotate, but it cannot move the origin. By adding the coordinate 1 we let the translation become part of the same multiplication:" /></p>
        <MathText>{String.raw`{}^AT_B=\begin{bmatrix}\cos\theta&-\sin\theta&t_x\\\sin\theta&\cos\theta&t_y\\0&0&1\end{bmatrix},\qquad {}^A\tilde p={}^AT_B\,{}^B\tilde p`}</MathText>
        <MathText>{String.raw`\begin{bmatrix}R&t\\0&1\end{bmatrix}\begin{bmatrix}p\\1\end{bmatrix}=\begin{bmatrix}Rp+t\\1\end{bmatrix}`}</MathText>
        <p><LangBlock
          no={<>For en ren retningsvektor setter vi siste koordinat til 0. Da blir resultatet Rv: en retning roteres, men transleres ikke. I SE(2) må R tilhøre <Link href="/egb339/temaer/so-2-rotation-matrices">SO(2)</Link>, altså ha ortogonale enhetskolonner og determinant +1.</>}
          en={<>For a pure direction vector we set the last coordinate to 0. The result is then Rv: a direction is rotated, but not translated. In SE(2), R must belong to <Link href="/egb339/temaer/so-2-rotation-matrices">SO(2)</Link>, that is, have orthonormal unit columns and determinant +1.</>}
        /></p>
      </section>

      <section className="egb-pilot-prose" id="regneeksempel">
        <Heading><T no="Regneeksempel: fra B til A" en="Worked example: from B to A" /></Heading>
        <p className="egb-pilot-source"><T no="QUT Week 2 tutorial, PDF-side 17. Tallene er de samme som figurens startinnstilling." en="QUT Week 2 tutorial, PDF page 17. The numbers are the same as the figure's initial setting." /></p>
        <p><LangBlock
          no={<>Vi kjenner <MathText inline>{String.raw`{}^Bp=(2,3)^T`}</MathText>, <MathText inline>{String.raw`\theta=\pi/4=45^\circ`}</MathText> og <MathText inline>{String.raw`t=(1,2)^T`}</MathText>. Finn koordinatene i A.</>}
          en={<>We know <MathText inline>{String.raw`{}^Bp=(2,3)^T`}</MathText>, <MathText inline>{String.raw`\theta=\pi/4=45^\circ`}</MathText> and <MathText inline>{String.raw`t=(1,2)^T`}</MathText>. Find the coordinates in A.</>}
        /></p>
        <Subheading><T no="Sett inn rotasjonen" en="Insert the rotation" /></Subheading>
        <p><LangBlock
          no={<>For <MathText inline>{String.raw`45^\circ`}</MathText> er både sinus og cosinus <MathText inline>{String.raw`1/\sqrt2`}</MathText>. Vi bygger R før vi legger til translasjonen:</>}
          en={<>At <MathText inline>{String.raw`45^\circ`}</MathText> both the sine and the cosine are <MathText inline>{String.raw`1/\sqrt2`}</MathText>. We build R before adding the translation:</>}
        /></p>
        <MathText>{String.raw`R=\begin{bmatrix}1/\sqrt2&-1/\sqrt2\\1/\sqrt2&1/\sqrt2\end{bmatrix}`}</MathText>
        <Subheading><T no="Regn rad for rad" en="Compute row by row" /></Subheading>
        <p><T no="Hver rad gir én koordinat målt langs A-aksene." en="Each row gives one coordinate measured along the A axes." /></p>
        <MathText>{String.raw`R\,{}^Bp=\begin{bmatrix}(2-3)/\sqrt2\\(2+3)/\sqrt2\end{bmatrix}=\begin{bmatrix}-0.7071\\3.5355\end{bmatrix}`}</MathText>
        <Subheading><T no="Legg til posisjonen til origo B" en="Add the position of the B origin" /></Subheading>
        <p><T no="Den roterte vektoren starter ved B. Derfor legger vi til (1, 2):" en="The rotated vector starts at B. We therefore add (1, 2):" /></p>
        <MathText>{String.raw`{}^Ap=\begin{bmatrix}-0.7071\\3.5355\end{bmatrix}+\begin{bmatrix}1\\2\end{bmatrix}=\boxed{\begin{bmatrix}0.2929\\5.5355\end{bmatrix}}`}</MathText>
        <p><T no="Geometrisk ligger punktet litt til høyre for y-aksen i A. Den negative x-komponenten etter rotasjon blir forskjøvet én enhet mot høyre." en="Geometrically, the point lies slightly to the right of the y-axis in A. The negative x-component after rotation is shifted one unit to the right." /></p>
      </section>

      <section className="egb-pilot-prose" id="invers">
        <Heading><T no="Tilbake fra A til B" en="Back from A to B" /></Heading>
        <p><T no="Nå kjenner vi A-koordinatene og ønsker B-koordinatene. Vi må først trekke fra translasjonen, så rotere tilbake. Rekkefølgen er motsatt:" en="Now we know the A coordinates and want the B coordinates. We must first subtract the translation, then rotate back. The order is reversed:" /></p>
        <MathText>{String.raw`{}^Bp=R^T({}^Ap-t),\qquad ({}^AT_B)^{-1}=\begin{bmatrix}R^T&-R^Tt\\0&1\end{bmatrix}`}</MathText>
        <MathText>{String.raw`R^T\begin{bmatrix}-1/\sqrt2\\5/\sqrt2\end{bmatrix}=\begin{bmatrix}(-1+5)/2\\(1+5)/2\end{bmatrix}=\begin{bmatrix}2\\3\end{bmatrix}`}</MathText>
        <p><LangBlock
          no={<>Vi får tilbake startpunktet. Legg merke til <MathText inline>{String.raw`-R^Tt`}</MathText> i inversen, ikke bare <MathText inline>{String.raw`-t`}</MathText>.</>}
          en={<>We get the starting point back. Note the <MathText inline>{String.raw`-R^Tt`}</MathText> in the inverse, not just <MathText inline>{String.raw`-t`}</MathText>.</>}
        /></p>
      </section>

      <section className="egb-pilot-prose" id="komposisjon">
        <Heading><T no="Fra én transformasjon til en kjede" en="From one transformation to a chain" /></Heading>
        <p><T no="Når en tredje ramme C kommer til, kobler vi sammen transformasjonene. På punktet virker faktoren til høyre først:" en="When a third frame C is added, we chain the transformations together. On the point, the rightmost factor acts first:" /></p>
        <MathText>{String.raw`{}^A\tilde p=\underbrace{{}^AT_B}_{B\to A}\underbrace{{}^BT_C}_{C\to B}{}^C\tilde p,\qquad {}^AT_C={}^AT_B\,{}^BT_C`}</MathText>
        <MathText>{String.raw`\begin{bmatrix}R_1&t_1\\0&1\end{bmatrix}\begin{bmatrix}R_2&t_2\\0&1\end{bmatrix}=\begin{bmatrix}R_1R_2&t_1+R_1t_2\\0&1\end{bmatrix}`}</MathText>
        <p><LangBlock
          no={<>Translasjonen <MathText inline>{String.raw`t_2`}</MathText> er gitt i B og må roteres før den kan legges til <MathText inline>{String.raw`t_1`}</MathText> i A. Derfor kan vi ikke generelt bytte om faktorene. Dette er grunnlaget for <Link href="/egb339/temaer/pose-graphs">posegrafer</Link> og senere kinematiske kjeder.</>}
          en={<>The translation <MathText inline>{String.raw`t_2`}</MathText> is given in B and must be rotated before it can be added to <MathText inline>{String.raw`t_1`}</MathText> in A. We therefore cannot, in general, swap the factors. This is the basis for <Link href="/egb339/temaer/pose-graphs">pose graphs</Link> and later kinematic chains.</>}
        /></p>
      </section>

      <section className="egb-pilot-prose" id="prov-selv">
        <Heading><T no="Prøv selv" en="Try it yourself" /></Heading>
        <p><LangBlock
          no={<>Behold punktet (2, 3) og translasjonen (1, 2), men sett <MathText inline>{String.raw`\theta=90^\circ`}</MathText>. Forutsi A-koordinatene før du endrer vinkelen i <a href="#utforsk">figuren</a>. Dette er et eget kontrolleksempel med samme utgangspunkt.</>}
          en={<>Keep the point (2, 3) and the translation (1, 2), but set <MathText inline>{String.raw`\theta=90^\circ`}</MathText>. Predict the A coordinates before you change the angle in the <a href="#utforsk">figure</a>. This is a separate check example with the same starting point.</>}
        /></p>
        <details className="egb-pilot-solution"><summary><T no="Vis løsning og kontroll" en="Show solution and check" /></summary>
          <MathText>{String.raw`R(90^\circ)=\begin{bmatrix}0&-1\\1&0\end{bmatrix},\quad Rp=\begin{bmatrix}-3\\2\end{bmatrix},\quad {}^Ap=\begin{bmatrix}-3+1\\2+2\end{bmatrix}=\begin{bmatrix}-2\\4\end{bmatrix}`}</MathText>
          <p><LangBlock
            no={<>Inverskontroll: trekk fra (1, 2), og roter <MathText inline>{String.raw`(-3,\,2)`}</MathText> med <MathText inline>{String.raw`-90^\circ`}</MathText>. Da får du tilbake (2, 3). Punktet flyttes ikke av at du skifter hvilke koordinater du oppgir.</>}
            en={<>Inverse check: subtract (1, 2), and rotate <MathText inline>{String.raw`(-3,\,2)`}</MathText> by <MathText inline>{String.raw`-90^\circ`}</MathText>. You then get (2, 3) back. The point is not moved by your changing which coordinates you quote.</>}
          /></p>
        </details>
      </section>

      <section className="egb-pilot-prose" id={embedded ? "se2-assessment" : "assessment"}>
        <Heading><T no="Bruk dette i Assessment 1.1" en="Use this in Assessment 1.1" /></Heading>
        <p><LangBlock
          no={<><Link href={`${EGB339_PILOT.assessment}#solution-q4`}>Q4: bygg en SE(2)-matrise</Link> bruker blokkformen over. <Link href={`${EGB339_PILOT.assessment}#solution-q5`}>Q5: transformer tilbake til den lokale rammen</Link> bruker inversen. Før du regner, skriv hvilken ramme punktet er gitt i og hvilken ramme svaret skal uttrykkes i.</>}
          en={<><Link href={`${EGB339_PILOT.assessment}#solution-q4`}>Q4: build an SE(2) matrix</Link> uses the block form above. <Link href={`${EGB339_PILOT.assessment}#solution-q5`}>Q5: transform back to the local frame</Link> uses the inverse. Before computing, write down which frame the point is given in and which frame the answer should be expressed in.</>}
        /></p>
        <p><T no="Assessmenten krever generelle funksjoner. Figurens tall er ikke verdiene til alle testene." en="The assessment requires general functions. The figure's numbers are not the values of all the tests." /></p>
      </section>

      <section className="egb-pilot-prose egb-pilot-sources" id={embedded ? "se2-kilder" : "kilder"}>
        <Heading><T no="Kilder og videre lesning" en="Sources and further reading" /></Heading>
        <ul><li><LangBlock
              no={<><Link href="/egb339/uker/uke-2">QUT uke 2: tutorial, fasit og øvrige oppgaver</Link>, tutorial PDF-side 17.</>}
              en={<><Link href="/egb339/uker/uke-2">QUT week 2: tutorial, answer key and the remaining exercises</Link>, tutorial PDF page 17.</>}
            /></li>
          <li><LangBlock
            no={<>Corke, <cite>Robotics, Vision and Control</cite>, 3. utgave (2023), kapittel 2.2, særlig trykt side 37 (PDF-side 61).</>}
            en={<>Corke, <cite>Robotics, Vision and Control</cite>, 3rd edition (2023), chapter 2.2, especially printed page 37 (PDF page 61).</>}
          /></li>
          <li><LangBlock
            no={<><Link href={EGB339_PILOT.assessment}>Assessment 1.1</Link>, Q4–Q5. <Link href="/egb339/temaer/se-3-homogeneous-transformations">SE(3)</Link> utvider samme struktur til tre dimensjoner.</>}
            en={<><Link href={EGB339_PILOT.assessment}>Assessment 1.1</Link>, Q4–Q5. <Link href="/egb339/temaer/se-3-homogeneous-transformations">SE(3)</Link> extends the same structure to three dimensions.</>}
          /></li></ul>
      </section>
  </>;
}
