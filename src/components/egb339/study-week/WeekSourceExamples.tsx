"use client";

import StudyFigure from "./StudyFigure";
import MathText from "../pilot/Egb339Math";
import WeekOneDisclosure from "../week-one/WeekOneDisclosure";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { tp } from "../T";

const provenance = "/egb339/study-figures/provenance.json";

export function MotionProfileExample() {
  const { lang } = useEgb339Lang();
  return <div className="egb-week-figure-explanation">
    <StudyFigure src="/egb339/study-figures/qut-week7-velocity-profile.png" width={692} height={405} alt={lang === "en" ? "QUT's velocity profile: 0 to 3 m/s from 0 to 2 s, constant until 5 s, then 0 m/s at 8 s." : "QUTs hastighetsprofil: 0 til 3 m/s fra 0 til 2 s, konstant til 5 s, deretter 0 m/s ved 8 s."} source={lang === "en" ? "QUT Week 7 tutorial, p. 9. Original figure excerpt." : "QUT Week 7 tutorial, s. 9. Originalt figurutdrag."} sourceHref={provenance}>{lang === "en" ? "Read area for distance and slope for acceleration. The y-axis is velocity, not position." : "Les areal for strekning og stigningstall for akselerasjon. Y-aksen er hastighet, ikke posisjon."}</StudyFigure>
    <div><h3>{lang === "en" ? "Three areas give the whole distance" : "Tre arealer gir hele strekningen"}</h3><p>{lang === "en" ? "Acceleration: triangle. Constant velocity: rectangle. Braking: triangle. All areas have the unit (m/s) · s = m." : "Akselerasjon: trekant. Konstant hastighet: rektangel. Bremsing: trekant. Alle arealene har enheten (m/s) · s = m."}</p>
      <MathText>{String.raw`s(8)=\tfrac12(2)(3)+(3)(3)+\tfrac12(3)(3)=16.5\;\mathrm m`}</MathText>
      <p>{lang === "en" ? "Try t = 6 s. Only the first part of the braking triangle has been passed." : "Prøv t = 6 s. Bare den første delen av bremsetrekanten er passert."}</p>
      <WeekOneDisclosure id="motion-profile-six-seconds" title={tp(lang, { no: "Strekningen etter seks sekunder", en: "Distance after six seconds" })}>
        <p>{lang === "en" ? "At 5 s the robot has travelled 12 m. From 5 to 6 s the velocity falls from 3 to 2 m/s, so the average is 2.5 m/s." : "Ved 5 s har roboten gått 12 m. Fra 5 til 6 s faller hastigheten fra 3 til 2 m/s, så gjennomsnittet er 2.5 m/s."}</p>
        <MathText>{String.raw`s(6)=12+\tfrac12(3+2)\cdot1=14.5\;\mathrm m`}</MathText>
        <p>{lang === "en" ? <>The acceleration is <MathText inline>{String.raw`1.5,\ 0,\ -1\ \mathrm{m/s^2}`}</MathText> in the three open time intervals. It has jumps at 2 and 5 s.</> : <>Akselerasjonen er <MathText inline>{String.raw`1.5,\ 0,\ -1\ \mathrm{m/s^2}`}</MathText> i de tre åpne tidsintervallene. Den har sprang ved 2 og 5 s.</>}</p>
      </WeekOneDisclosure>
      <p className="egb-pilot-source">{lang === "en" ? "The values match the QUT answer key. Corke ch. 3.3.1 explains the same area and derivative relationship; the book's standard profile has symmetric acceleration and braking, unlike this exercise." : "Verdiene stemmer med QUT-fasiten. Corke kap. 3.3.1 forklarer samme areal- og derivatforhold; bokens standardprofil har symmetrisk akselerasjon og bremsing, i motsetning til denne oppgaven."}</p>
    </div>
  </div>;
}

export function HighwayFigure() {
  const { lang } = useEgb339Lang();
  return <div className="egb-week-figure-explanation">
    <StudyFigure src="/egb339/week8/highway.jpg" width={2048} height={1536} alt={lang === "en" ? "QUT practical's Highway image with road, cars, lamp posts and a Margaret Street sign." : "QUT-practicalens Highway-bilde med vei, biler, lyktestolper og Margaret Street-skilt."} source={lang === "en" ? "Mapillary / vagrant42, CC BY-SA 4.0. Original image supplied in QUT Week 8." : "Mapillary / vagrant42, CC BY-SA 4.0. Originalbildet levert i QUT Week 8."} sourceHref="https://creativecommons.org/licenses/by-sa/4.0/">{lang === "en" ? "The image is reused unchanged. Pixel (u, v) has u to the right and v downwards from the top-left corner." : "Bildet gjenbrukes uendret. Piksel (u, v) har u mot høyre og v nedover fra øvre venstre hjørne."}</StudyFigure>
    <div><h3>{lang === "en" ? "An image is also an array" : "Et bilde er også en array"}</h3><p>{lang === "en" ? <>The practical's image has width 2048 and height 1536. A grayscale version therefore has <code>shape = (1536, 2048)</code>.</> : <>Practicalens bilde har bredde 2048 og høyde 1536. En gråtoneversjon har derfor <code>shape = (1536, 2048)</code>.</>}</p><p>{lang === "en" ? <>Column 1155 is <code>image[:, 1155]</code>. Row 1280 is <code>image[1280, :]</code>. The first plot follows v; the second follows u.</> : <>Kolonne 1155 er <code>image[:, 1155]</code>. Rad 1280 er <code>image[1280, :]</code>. Det første plottet følger v; det andre følger u.</>}</p><p>{lang === "en" ? "A peak in intensity is not automatically a new object. Go back to the same row or column in the image and find what the pixels belong to." : "En topp i intensiteten er ikke automatisk et nytt objekt. Gå tilbake til samme rad eller kolonne i bildet og finn hva pikslene tilhører."}</p><p><a href="#oppgaver">{lang === "en" ? "Work further with the practical tasks" : "Arbeid videre med practical-oppgavene"}</a></p></div>
  </div>;
}

export function HistogramFigure() {
  const { lang } = useEgb339Lang();
  return <section className="egb-week-learning-block">
    <h3>{lang === "en" ? "Link the histogram to the image" : "Knytt histogrammet til bildet"}</h3>
    <div className="egb-week-wide-figure"><StudyFigure src="/egb339/study-figures/qut-week8-spatula-histogram.png" width={1340} height={487} alt={lang === "en" ? "QUT's dark spatula on a lighter background, together with the intensity histogram. A small dark peak sits around 25 and larger background peaks around 100." : "QUTs mørke stekespade på lysere underlag, sammen med intensitetshistogrammet. En liten mørk topp ligger rundt 25 og større bakgrunnstopper rundt 100."} source={lang === "en" ? "QUT Lecture Week 8, p. 10, figure excerpt." : "QUT Lecture Week 8, s. 10, figurutdrag."} sourceHref={provenance}>{lang === "en" ? "Left: the pixels in space. Right: how often each intensity occurs. The histogram keeps the frequencies, but not where in the image the pixels were." : "Venstre: pikslene i rommet. Høyre: hvor ofte hver intensitet forekommer. Histogrammet beholder frekvensene, men ikke hvor i bildet pikslene lå."}</StudyFigure></div>
    <div className="egb-pilot-prose"><p>{lang === "en" ? <>On pp. 11–12 the lecture chooses threshold 50. The dark peak is separated from most of the background with <code>mask = img &lt; 50</code>. This is a property of this image, not a universal threshold for spatulas.</> : <>På s. 11–12 velger forelesningen terskel 50. Den mørke toppen skilles fra mesteparten av bakgrunnen med <code>mask = img &lt; 50</code>. Dette er en egenskap ved dette bildet, ikke en universell terskel for stekespader.</>}</p><p>{lang === "en" ? "The mask's true pixels mean 'selected by the criterion', not 'proven correct object'. Seams, shadows and other dark areas can also be included." : "Maskens sanne piksler betyr «valgt av kriteriet», ikke «bevist korrekt objekt». Skjøter, skygger og andre mørke områder kan også komme med."}</p></div>
  </section>;
}

export function ImageSubtractionFigure() {
  const { lang } = useEgb339Lang();
  return <section className="egb-week-learning-block">
    <h3>{lang === "en" ? "Two images in, one difference out" : "To bilder inn, én forskjell ut"}</h3>
    <div className="egb-week-wide-figure"><StudyFigure src="/egb339/study-figures/qut-week8-image-subtraction.png" width={1325} height={495} alt={lang === "en" ? "Two QUT images of the same board, one empty and one with objects, and a difference image that highlights the changes." : "To QUT-bilder av samme brett, ett tomt og ett med gjenstander, og et differansebilde som fremhever endringene."} source={lang === "en" ? "QUT Lecture Week 8, p. 15, figure excerpt." : "QUT Lecture Week 8, s. 15, figurutdrag."} sourceHref={provenance}>{lang === "en" ? "Compare corresponding pixels. The background becomes dark where the images are alike. The camera must stay in the same position for a simple difference to be meaningful." : "Sammenlign tilsvarende piksler. Bakgrunnen blir mørk der bildene er like. Kameraet må stå i samme posisjon for at en enkel differanse skal være meningsfull."}</StudyFigure></div>
    <div className="egb-pilot-prose"><p>{lang === "en" ? "Convert before the subtraction. Corke's example with the uint8 values 100 and 200 shows why:" : "Konverter før subtraksjonen. Corkes eksempel med uint8-verdiene 100 og 200 viser hvorfor:"}</p>
      <MathText>{String.raw`100-200=-100,\qquad (-100)\bmod256=156`}</MathText>
      <p>{lang === "en" ? "A negative difference signal becomes a positive number on wraparound. A subsequent absolute value cannot repair the information that is already lost." : "Et negativt differansesignal blir et positivt tall ved wraparound. En etterfølgende absoluttverdi kan ikke reparere informasjonen som allerede er tapt."}</p>
      <MathText>{String.raw`D(u,v)=|\operatorname{float}(I_1(u,v))-\operatorname{float}(I_2(u,v))|`}</MathText>
      <p className="egb-pilot-source">{lang === "en" ? "QUT quiz on p. 16, option c, and Corke ch. 11.4, pp. 435–436. Clarify whether the conversion keeps the 0–255 scale or normalizes to 0–1 before thresholds are used." : "QUT-quizen på s. 16, alternativ c, og Corke kap. 11.4, s. 435–436. Avklar om konverteringen beholder skala 0–255 eller normaliserer til 0–1 før terskler brukes."}</p>
    </div>
  </section>;
}

export function HomographyExample() {
  const { lang } = useEgb339Lang();
  return <section className="egb-pilot-prose egb-week-worked-example">
    <h3>{lang === "en" ? "Follow one point through H" : "Følg ett punkt gjennom H"}</h3>
    <p>{lang === "en" ? "Assessment 1.7's public test uses q = (320, 250). H goes from the work surface to the image. We reuse the existing walkthrough's example, not a new camera calibration." : "Assessment 1.7s offentlige test bruker q = (320, 250). H går fra arbeidsflaten til bildet. Vi gjenbruker den eksisterende gjennomgangens eksempel, ikke en ny kamerakalibrering."}</p>
    <MathText>{String.raw`\underbrace{\begin{bmatrix}-0.8&0&0\\0&0.8&800\\0&0&2\end{bmatrix}}_H\underbrace{\begin{bmatrix}320\\250\\1\end{bmatrix}}_{\bar q}=\underbrace{\begin{bmatrix}-256\\1000\\2\end{bmatrix}}_{\tilde p}`}</MathText>
    <p>{lang === "en" ? "The third coordinate is 2, not 1. Therefore divide the first two components by 2:" : "Den tredje koordinaten er 2, ikke 1. Del derfor de to første komponentene på 2:"}</p>
    <MathText>{String.raw`(u,v)=(-256/2,1000/2)=(-128,500)`}</MathText>
    <p>{lang === "en" ? "Negative u is a valid geometric result, but lies outside an image that starts at u = 0. Do not clip the coordinate before you have considered what the exercise asks for." : "Negativ u er et gyldig geometrisk resultat, men ligger utenfor et bilde som starter ved u = 0. Ikke klipp koordinaten før du har vurdert hva oppgaven ber om."}</p>
    <p><a href="#assessment-1-7-vision-fundamentals-part-2">{lang === "en" ? "Go to the full Assessment 1.7, including inverse mapping and triangle area" : "Gå til hele Assessment 1.7, inkludert invers mapping og trekantareal"}</a></p>
  </section>;
}