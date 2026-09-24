"use client";

import StudyFigure from "./StudyFigure";
import { WeekOneMatrixExplorer } from "../week-one/WeekOneExplorers";
import { useEgb339Lang } from "@/lib/egb339-language/store";

/** Figure + explanation for the reference-frames topic (Week 2). */
export function FrameExplanation2d() {
  const { lang } = useEgb339Lang();
  return <div className="egb-week-figure-explanation">
    <StudyFigure src="/egb339/study-figures/rtb-transforms2d.png" width={640} height={480} alt={lang === "en" ? "Robotics Toolbox shows frames A, B and C with different origins; C is also rotated." : "Robotics Toolbox viser rammene A, B og C med ulike origoer; C er også rotert."} source="Robotics Toolbox, transforms2d.png (MIT)" sourceHref="/egb339/study-figures/robotics-toolbox-LICENSE.txt">{lang === "en" ? "Read where each origin sits first, then which way the axes point. The original plot has its own axis colours; they do not mean right or wrong." : "Les først hvor hvert origo ligger, så hvilken vei aksene peker. Originalplottet har egne aksefarger; de betyr ikke riktig eller feil."}</StudyFigure>
    <div><h3>{lang === "en" ? "One origin and two directions" : "Et origo og to retninger"}</h3>
      <p>{lang === "en" ? "A and B have parallel axes but different origins. C has both a different origin and a different orientation. Position alone therefore does not describe a frame." : "A og B har parallelle akser, men ulike origoer. C har både et annet origo og en annen orientering. Posisjon alene beskriver derfor ikke en ramme."}</p>
      <p>{lang === "en" ? <>In the lab below, <span className="egb-week-frame-a">blue A</span> and <span className="egb-week-frame-b">purple B</span> are used consistently. The letters decide which frame we mean.</> : <>I laben nedenfor brukes <span className="egb-week-frame-a">blå A</span> og <span className="egb-week-frame-b">lilla B</span> konsekvent. Bokstavene avgjør hvilken ramme vi mener.</>}</p>
    </div>
  </div>;
}

/** Figure + explanation for the SE(3) topic (Week 3). */
export function FrameExplanation3d() {
  const { lang } = useEgb339Lang();
  return <div className="egb-week-figure-explanation">
    <StudyFigure src="/egb339/study-figures/rtb-transforms3d.png" width={640} height={480} alt={lang === "en" ? "Three-dimensional coordinate frames A, B and C drawn with the Robotics Toolbox." : "Tre tredimensjonale koordinatrammer A, B og C tegnet med Robotics Toolbox."} source="Robotics Toolbox, transforms3d.png (MIT)" sourceHref="/egb339/study-figures/robotics-toolbox-LICENSE.txt">{lang === "en" ? "A pose has both an origin and three basis directions. The original figure's axis colours are not status markers." : "En pose har både et origo og tre basisretninger. Originalfigurens aksefarger er ikke statusmarkeringer."}</StudyFigure>
    <div><h3>{lang === "en" ? "Three columns and one origin" : "Tre kolonner og ett origo"}</h3>
      <p>{lang === "en" ? "The rotation block gives the three axes. The last column gives the origin's position in the reference frame. Both must be read in the same reference before a point is transformed." : "Rotasjonsblokken angir de tre aksene. Siste kolonne angir origoets posisjon i referanserammen. Begge må tolkes i samme referanse før et punkt transformeres."}</p>
      <p>{lang === "en" ? "The frames in this documentation figure are illustrations. Use the given QUT transformations when you solve the tutorial." : "Rammene i denne dokumentasjonsfiguren er illustrasjoner. Bruk oppgitte QUT-transformasjoner når du løser tutorialen."}</p>
    </div>
  </div>;
}

/** Note under the point-to-segment visual (Week 7). */
export function PointSegmentNote() {
  const { lang } = useEgb339Lang();
  return <p>{lang === "en"
    ? "The projection C can lie outside the segment. In that case the nearest endpoint is the answer. For a link with zero length the distance is computed directly to the endpoint."
    : "Projeksjonen C kan ligge utenfor segmentet. Da er nærmeste endepunkt løsningen. For en lenke med null lengde beregnes avstanden direkte til endepunktet."}</p>;
}

/** Intro text above the Week 2 matrix explorer. */
export function MatrixExplorerIntro() {
  const { lang } = useEgb339Lang();
  return <div className="egb-pilot-prose">
    <h3>{lang === "en" ? "Follow one row–column product" : "Følg ett rad–kolonne-produkt"}</h3>
    <p>{lang === "en" ? "Q15 from the warmup connects four dot products to one matrix. Pick a result element and follow row A and column B." : "Q15 fra warmupen knytter fire skalarprodukter til én matrise. Velg et resultatelement og følg rad A og kolonne B."}</p>
    <WeekOneMatrixExplorer />
  </div>;
}
