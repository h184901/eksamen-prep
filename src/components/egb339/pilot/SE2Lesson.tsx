import Link from "next/link";
import { EGB339_PILOT, egb339LessonNeighbours } from "@/lib/egb339-course";
import { getEgb339Concept } from "@/lib/egb339-vault/loader";
import { PilotBreadcrumb, PilotEntryNav } from "./Egb339PilotShell";
import Egb339PilotProgress, { PilotStatus } from "./Egb339PilotProgress";
import MathText from "./Egb339Math";
import SE2Explorer from "./SE2Explorer";

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
        <h1>SE(2): rotasjon og translasjon</h1>
        <p>Uttrykk samme punkt i to koordinatrammer med én homogen transformasjon.</p>
        <PilotStatus pageKey={key} />
        <nav aria-label="I denne leksjonen"><a href="#utforsk">Figur og matrise</a><a href="#regneeksempel">Regneeksempel</a><a href="#prov-selv">Prøv selv</a><a href="#assessment">Assessment 1.1</a></nav>
      </header>

      <section className="egb-pilot-prose" id="teori">
        <h2>Et punkt, to koordinatrammer</h2>
        <p>La A være verdensrammen og B den lokale rammen. <MathText inline>{String.raw`{}^AT_B`}</MathText> beskriver B i A og sender derfor koordinater <strong>fra B til A</strong>. Punktet flytter seg ikke fysisk når vi uttrykker det i en annen ramme.</p>
        <MathText>{String.raw`{}^Ap = {}^AR_B\,{}^Bp + {}^At_B`}</MathText>
        <p>Rotasjonen R uttrykker B-aksene i A. Translasjonen t er posisjonen til origo B målt i A. Vi bruker kolonnevektorer og positiv rotasjon mot klokken.</p>
      </section>

      <section id="utforsk" className="egb-pilot-wide">
        <h2>Se hva matrisen gjør</h2>
        <p className="egb-pilot-prose">Velg bare rotasjon, og legg så til translasjonen. Endre vinkelen eller punktet: figur, matrise og regning oppdateres sammen.</p>
        <SE2Explorer />
      </section>

      <section className="egb-pilot-prose" id="homogene-koordinater">
        <h2>Hvorfor matrisen har en tredje rad</h2>
        <p>En 2 × 2-matrise kan rotere, men den kan ikke flytte origo. Ved å legge til koordinaten 1 lar vi translasjonen bli en del av samme multiplikasjon:</p>
        <MathText>{String.raw`{}^AT_B=\begin{bmatrix}\cos\theta&-\sin\theta&t_x\\\sin\theta&\cos\theta&t_y\\0&0&1\end{bmatrix},\qquad {}^A\tilde p={}^AT_B\,{}^B\tilde p`}</MathText>
        <MathText>{String.raw`\begin{bmatrix}R&t\\0&1\end{bmatrix}\begin{bmatrix}p\\1\end{bmatrix}=\begin{bmatrix}Rp+t\\1\end{bmatrix}`}</MathText>
        <p>For en ren retningsvektor setter vi siste koordinat til 0. Da blir resultatet Rv: en retning roteres, men transleres ikke. I SE(2) må R tilhøre <Link href="/egb339/temaer/so-2-rotation-matrices">SO(2)</Link>, altså ha ortogonale enhetskolonner og determinant +1.</p>
      </section>

      <section className="egb-pilot-prose" id="regneeksempel">
        <h2>Regneeksempel: fra B til A</h2>
        <p className="egb-pilot-source">QUT Week 2 tutorial, PDF-side 17. Tallene er de samme som figurens startinnstilling.</p>
        <p>Vi kjenner <MathText inline>{String.raw`{}^Bp=(2,3)^T`}</MathText>, <MathText inline>{String.raw`\theta=\pi/4=45^\circ`}</MathText> og <MathText inline>{String.raw`t=(1,2)^T`}</MathText>. Finn koordinatene i A.</p>
        <h3>Sett inn rotasjonen</h3>
        <p>For 45° er både sinus og cosinus <MathText inline>{String.raw`1/\sqrt2`}</MathText>. Vi bygger R før vi legger til translasjonen:</p>
        <MathText>{String.raw`R=\begin{bmatrix}1/\sqrt2&-1/\sqrt2\\1/\sqrt2&1/\sqrt2\end{bmatrix}`}</MathText>
        <h3>Regn rad for rad</h3>
        <p>Hver rad gir én koordinat målt langs A-aksene.</p>
        <MathText>{String.raw`R\,{}^Bp=\begin{bmatrix}(2-3)/\sqrt2\\(2+3)/\sqrt2\end{bmatrix}=\begin{bmatrix}-0.7071\\3.5355\end{bmatrix}`}</MathText>
        <h3>Legg til posisjonen til origo B</h3>
        <p>Den roterte vektoren starter ved B. Derfor legger vi til (1, 2):</p>
        <MathText>{String.raw`{}^Ap=\begin{bmatrix}-0.7071\\3.5355\end{bmatrix}+\begin{bmatrix}1\\2\end{bmatrix}=\boxed{\begin{bmatrix}0.2929\\5.5355\end{bmatrix}}`}</MathText>
        <p>Geometrisk ligger punktet litt til høyre for y-aksen i A. Den negative x-komponenten etter rotasjon blir forskjøvet én enhet mot høyre.</p>
      </section>

      <section className="egb-pilot-prose" id="invers">
        <h2>Tilbake fra A til B</h2>
        <p>Nå kjenner vi A-koordinatene og ønsker B-koordinatene. Vi må først trekke fra translasjonen, så rotere tilbake. Rekkefølgen er motsatt:</p>
        <MathText>{String.raw`{}^Bp=R^T({}^Ap-t),\qquad ({}^AT_B)^{-1}=\begin{bmatrix}R^T&-R^Tt\\0&1\end{bmatrix}`}</MathText>
        <MathText>{String.raw`R^T\begin{bmatrix}-1/\sqrt2\\5/\sqrt2\end{bmatrix}=\begin{bmatrix}(-1+5)/2\\(1+5)/2\end{bmatrix}=\begin{bmatrix}2\\3\end{bmatrix}`}</MathText>
        <p>Vi får tilbake startpunktet. Legg merke til <MathText inline>{String.raw`-R^Tt`}</MathText> i inversen, ikke bare −t.</p>
      </section>

      <section className="egb-pilot-prose" id="komposisjon">
        <h2>Fra én transformasjon til en kjede</h2>
        <p>Når en tredje ramme C kommer til, kobler vi sammen transformasjonene. På punktet virker faktoren til høyre først:</p>
        <MathText>{String.raw`{}^A\tilde p=\underbrace{{}^AT_B}_{B\to A}\underbrace{{}^BT_C}_{C\to B}{}^C\tilde p,\qquad {}^AT_C={}^AT_B\,{}^BT_C`}</MathText>
        <MathText>{String.raw`\begin{bmatrix}R_1&t_1\\0&1\end{bmatrix}\begin{bmatrix}R_2&t_2\\0&1\end{bmatrix}=\begin{bmatrix}R_1R_2&t_1+R_1t_2\\0&1\end{bmatrix}`}</MathText>
        <p>Translasjonen t₂ er gitt i B og må roteres før den kan legges til t₁ i A. Derfor kan vi ikke generelt bytte om faktorene. Dette er grunnlaget for <Link href="/egb339/temaer/pose-graphs">posegrafer</Link> og senere kinematiske kjeder.</p>
      </section>

      <section className="egb-pilot-prose" id="prov-selv">
        <h2>Prøv selv</h2>
        <p>Behold punktet (2, 3) og translasjonen (1, 2), men sett θ = 90°. Forutsi A-koordinatene før du endrer vinkelen i <a href="#utforsk">figuren</a>. Dette er et eget kontrolleksempel med samme utgangspunkt.</p>
        <details className="egb-pilot-solution"><summary>Vis løsning og kontroll</summary>
          <MathText>{String.raw`R(90^\circ)=\begin{bmatrix}0&-1\\1&0\end{bmatrix},\quad Rp=\begin{bmatrix}-3\\2\end{bmatrix},\quad {}^Ap=\begin{bmatrix}-3+1\\2+2\end{bmatrix}=\begin{bmatrix}-2\\4\end{bmatrix}`}</MathText>
          <p>Inverskontroll: trekk fra (1, 2), og roter (−3, 2) med −90°. Da får du tilbake (2, 3). Punktet flyttes ikke av at du skifter hvilke koordinater du oppgir.</p>
        </details>
      </section>

      <section className="egb-pilot-prose" id="assessment">
        <h2>Bruk dette i Assessment 1.1</h2>
        <p><Link href={`${EGB339_PILOT.assessment}#solution-q4`}>Q4: bygg en SE(2)-matrise</Link> bruker blokkformen over. <Link href={`${EGB339_PILOT.assessment}#solution-q5`}>Q5: transformer tilbake til den lokale rammen</Link> bruker inversen. Før du regner, skriv hvilken ramme punktet er gitt i og hvilken ramme svaret skal uttrykkes i.</p>
        <p>Assessmenten krever generelle funksjoner. Figurens tall er ikke verdiene til alle testene.</p>
      </section>

      <section className="egb-pilot-prose egb-pilot-sources" id="kilder">
        <h2>Kilder og videre lesning</h2>
        <ul><li><Link href="/egb339/uker/uke-2">QUT uke 2: tutorial, fasit og øvrige oppgaver</Link>, tutorial PDF-side 17.</li>
          <li>Corke, <cite>Robotics, Vision and Control</cite>, 3. utgave (2023), kapittel 2.2, særlig trykt side 37 (PDF-side 61).</li>
          <li><Link href={EGB339_PILOT.assessment}>Assessment 1.1</Link>, Q4–Q5. <Link href="/egb339/temaer/se-3-homogeneous-transformations">SE(3)</Link> utvider samme struktur til tre dimensjoner.</li></ul>
      </section>
      <div className="egb-pilot-prose"><Egb339PilotProgress pageKey={key} /><PilotEntryNav previous={link(adjacent.previous)} next={link(adjacent.next)} /></div>
    </article>
  </>;
}
