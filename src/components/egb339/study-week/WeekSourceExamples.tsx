import StudyFigure from "./StudyFigure";
import MathText from "../pilot/Egb339Math";
import WeekOneDisclosure from "../week-one/WeekOneDisclosure";

const provenance = "/egb339/study-figures/provenance.json";

export function MotionProfileExample() {
  return <div className="egb-week-figure-explanation">
    <StudyFigure src="/egb339/study-figures/qut-week7-velocity-profile.png" width={692} height={405} alt="QUTs hastighetsprofil: 0 til 3 m/s fra 0 til 2 s, konstant til 5 s, deretter 0 m/s ved 8 s." source="QUT Week 7 tutorial, s. 9. Originalt figurutdrag." sourceHref={provenance}>Les areal for strekning og stigningstall for akselerasjon. Y-aksen er hastighet, ikke posisjon.</StudyFigure>
    <div><h3>Tre arealer gir hele strekningen</h3><p>Akselerasjon: trekant. Konstant hastighet: rektangel. Bremsing: trekant. Alle arealene har enheten (m/s) · s = m.</p>
      <MathText>{String.raw`s(8)=\tfrac12(2)(3)+(3)(3)+\tfrac12(3)(3)=16.5\;\mathrm m`}</MathText>
      <p>Prøv t = 6 s. Bare den første delen av bremsetrekanten er passert.</p>
      <WeekOneDisclosure id="motion-profile-six-seconds" title="Strekningen etter seks sekunder">
        <p>Ved 5 s har roboten gått 12 m. Fra 5 til 6 s faller hastigheten fra 3 til 2 m/s, så gjennomsnittet er 2.5 m/s.</p>
        <MathText>{String.raw`s(6)=12+\tfrac12(3+2)\cdot1=14.5\;\mathrm m`}</MathText>
        <p>Akselerasjonen er 1.5, 0 og −1 m/s² i de tre åpne tidsintervallene. Den har sprang ved 2 og 5 s.</p>
      </WeekOneDisclosure>
      <p className="egb-pilot-source">Verdiene stemmer med QUT-fasiten. Corke kap. 3.3.1 forklarer samme areal- og derivatforhold; bokens standardprofil har symmetrisk akselerasjon og bremsing, i motsetning til denne oppgaven.</p>
    </div>
  </div>;
}

export function HighwayFigure() {
  return <div className="egb-week-figure-explanation">
    <StudyFigure src="/egb339/week8/highway.jpg" width={2048} height={1536} alt="QUT-practicalens Highway-bilde med vei, biler, lyktestolper og Margaret Street-skilt." source="Mapillary / vagrant42, CC BY-SA 4.0. Originalbildet levert i QUT Week 8." sourceHref="https://creativecommons.org/licenses/by-sa/4.0/">Bildet gjenbrukes uendret. Piksel (u, v) har u mot høyre og v nedover fra øvre venstre hjørne.</StudyFigure>
    <div><h3>Et bilde er også en array</h3><p>Practicalens bilde har bredde 2048 og høyde 1536. En gråtoneversjon har derfor <code>shape = (1536, 2048)</code>.</p><p>Kolonne 1155 er <code>image[:, 1155]</code>. Rad 1280 er <code>image[1280, :]</code>. Det første plottet følger v; det andre følger u.</p><p>En topp i intensiteten er ikke automatisk et nytt objekt. Gå tilbake til samme rad eller kolonne i bildet og finn hva pikslene tilhører.</p><p><a href="#oppgaver">Arbeid videre med practical-oppgavene</a></p></div>
  </div>;
}

export function HistogramFigure() {
  return <section className="egb-week-learning-block">
    <h3>Knytt histogrammet til bildet</h3>
    <div className="egb-week-wide-figure"><StudyFigure src="/egb339/study-figures/qut-week8-spatula-histogram.png" width={1340} height={487} alt="QUTs mørke stekespade på lysere underlag, sammen med intensitetshistogrammet. En liten mørk topp ligger rundt 25 og større bakgrunnstopper rundt 100." source="QUT Lecture Week 8, s. 10, figurutdrag." sourceHref={provenance}>Venstre: pikslene i rommet. Høyre: hvor ofte hver intensitet forekommer. Histogrammet beholder frekvensene, men ikke hvor i bildet pikslene lå.</StudyFigure></div>
    <div className="egb-pilot-prose"><p>På s. 11–12 velger forelesningen terskel 50. Den mørke toppen skilles fra mesteparten av bakgrunnen med <code>mask = img &lt; 50</code>. Dette er en egenskap ved dette bildet, ikke en universell terskel for stekespader.</p><p>Maskens sanne piksler betyr «valgt av kriteriet», ikke «bevist korrekt objekt». Skjøter, skygger og andre mørke områder kan også komme med.</p></div>
  </section>;
}

export function ImageSubtractionFigure() {
  return <section className="egb-week-learning-block">
    <h3>To bilder inn, én forskjell ut</h3>
    <div className="egb-week-wide-figure"><StudyFigure src="/egb339/study-figures/qut-week8-image-subtraction.png" width={1325} height={495} alt="To QUT-bilder av samme brett, ett tomt og ett med gjenstander, og et differansebilde som fremhever endringene." source="QUT Lecture Week 8, s. 15, figurutdrag." sourceHref={provenance}>Sammenlign tilsvarende piksler. Bakgrunnen blir mørk der bildene er like. Kameraet må stå i samme posisjon for at en enkel differanse skal være meningsfull.</StudyFigure></div>
    <div className="egb-pilot-prose"><p>Konverter før subtraksjonen. Corkes eksempel med uint8-verdiene 100 og 200 viser hvorfor:</p>
      <MathText>{String.raw`100-200=-100,\qquad (-100)\bmod256=156`}</MathText>
      <p>Et negativt differansesignal blir et positivt tall ved wraparound. En etterfølgende absoluttverdi kan ikke reparere informasjonen som allerede er tapt.</p>
      <MathText>{String.raw`D(u,v)=|\operatorname{float}(I_1(u,v))-\operatorname{float}(I_2(u,v))|`}</MathText>
      <p className="egb-pilot-source">QUT-quizen på s. 16, alternativ c, og Corke kap. 11.4, s. 435–436. Avklar om konverteringen beholder skala 0–255 eller normaliserer til 0–1 før terskler brukes.</p>
    </div>
  </section>;
}

export function HomographyExample() {
  return <section className="egb-pilot-prose egb-week-worked-example">
    <h3>Følg ett punkt gjennom H</h3>
    <p>Assessment 1.7s offentlige test bruker q = (320, 250). H går fra arbeidsflaten til bildet. Vi gjenbruker den eksisterende gjennomgangens eksempel, ikke en ny kamerakalibrering.</p>
    <MathText>{String.raw`\underbrace{\begin{bmatrix}-0.8&0&0\\0&0.8&800\\0&0&2\end{bmatrix}}_H\underbrace{\begin{bmatrix}320\\250\\1\end{bmatrix}}_{\bar q}=\underbrace{\begin{bmatrix}-256\\1000\\2\end{bmatrix}}_{\tilde p}`}</MathText>
    <p>Den tredje koordinaten er 2, ikke 1. Del derfor de to første komponentene på 2:</p>
    <MathText>{String.raw`(u,v)=(-256/2,1000/2)=(-128,500)`}</MathText>
    <p>Negativ u er et gyldig geometrisk resultat, men ligger utenfor et bilde som starter ved u = 0. Ikke klipp koordinaten før du har vurdert hva oppgaven ber om.</p>
    <p><a href="#assessment-1-7-vision-fundamentals-part-2">Gå til hele Assessment 1.7, inkludert invers mapping og trekantareal</a></p>
  </section>;
}
