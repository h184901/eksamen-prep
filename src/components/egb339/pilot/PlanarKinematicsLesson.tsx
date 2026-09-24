"use client";

import Link from "next/link";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import MathText from "./Egb339Math";
import WeekOneDisclosure from "../week-one/WeekOneDisclosure";
import PlanarArmExplorer from "../PlanarArmExplorer";

function TrySolution({ mode, embedded, children }: { mode: "fk" | "ik"; embedded: boolean; children: React.ReactNode }) {
  const { lang } = useEgb339Lang();
  if (embedded) return <WeekOneDisclosure id={`planar-${mode}-try-solution`} title={lang === "en" ? "Checking the 2R model" : "Kontroll av 2R-modellen"}>{children}</WeekOneDisclosure>;
  return <details className="egb-pilot-solution"><summary>{lang === "en" ? "Show solution and check" : "Vis løsning og kontroll"}</summary>{children}</details>;
}

/** Original worked explanations using the QUT Week 5 two-link model.
 * Week 4's different RPR/Dobot models remain in their original exercises.
 */
export default function PlanarKinematicsLesson({ mode, embedded = false }: { mode: "fk" | "ik"; embedded?: boolean }) {
  const { lang } = useEgb339Lang();
  const en = lang === "en";
  const Heading = embedded ? "h3" : "h2";
  const Subheading = embedded ? "h4" : "h3";
  return <>
    <section className="egb-pilot-prose" id="planar-modell">
      <Heading>{en ? "A planar 2R model" : "En plan 2R-modell"}</Heading>
      <p>{en
        ? <>Both joints rotate about the z-axis. <MathText inline>{String.raw`q_1`}</MathText> is measured from the world x-axis; <MathText inline>{String.raw`q_2`}</MathText> from the extension of link 1. Link 2 therefore points in the direction <MathText inline>{String.raw`q_1+q_2`}</MathText>, not just <MathText inline>{String.raw`q_2`}</MathText>.</>
        : <>Begge ledd roterer om z-aksen. <MathText inline>{String.raw`q_1`}</MathText> måles fra verdens x-akse; <MathText inline>{String.raw`q_2`}</MathText> måles fra fortsettelsen av lenke 1. Derfor peker lenke 2 i retningen <MathText inline>{String.raw`q_1+q_2`}</MathText>, ikke bare <MathText inline>{String.raw`q_2`}</MathText>.</>}</p>
      <MathText>{String.raw`x=L_1\cos q_1+L_2\cos(q_1+q_2),\qquad y=L_1\sin q_1+L_2\sin(q_1+q_2)`}</MathText>
      <p>{en ? "The matrix factors follow the same geometry: rotate about the joint, translate along the rotated x-axis. We group each pair into one link transformation." : "Matrisefaktorene følger samme geometri: roter ved leddet, transler langs den roterte x-aksen. Vi grupperer hvert par i én lenketransformasjon."}</p>
      <MathText>{String.raw`{}^0T_1=R(q_1)T_x(L_1),\quad{}^1T_2=R(q_2)T_x(L_2),\quad{}^0T_E={}^0T_1{}^1T_2`}</MathText>
      {mode === "ik" && <><p>{en
        ? <>Close the triangle from base via the elbow to the target. The law of cosines eliminates <MathText inline>{String.raw`q_1`}</MathText> and gives <MathText inline>{String.raw`q_2`}</MathText> first:</>
        : <>Lukk trekanten fra base via albue til mål. Cosinussetningen eliminerer <MathText inline>{String.raw`q_1`}</MathText> og gir først <MathText inline>{String.raw`q_2`}</MathText>:</>}</p>
        <MathText>{String.raw`r^2=x^2+y^2=L_1^2+L_2^2+2L_1L_2\cos q_2`}</MathText>
        <p>{en ? "We need both signs in arccos. Then atan2 finds the shoulder angle in the correct quadrant. This solves the target position; an arbitrary orientation cannot be imposed on a 2R arm at the same time." : "Vi trenger begge fortegnene i arccos. Deretter finner atan2 skuldervinkelen i riktig kvadrant. Dette løser målposisjonen; en vilkårlig orientering kan ikke samtidig påtvinges en 2R-arm."}</p></>}
    </section>
    <section id="laboratorium"><PlanarArmExplorer initialMode={mode} /></section>
    {mode === "fk" ? <section className="egb-pilot-prose" id="regneeksempel">
      <Heading>{en ? "Worked example: from joint angles to (5, 7)" : "Regneeksempel: fra leddvinkler til (5, 7)"}</Heading>
      <p className="egb-pilot-source">{en
        ? <>FK check of QUT Week 5, tutorial PDF page 17, target a. Links 5 and 7, joint angles 0 and <MathText inline>{String.raw`\pi/2`}</MathText>. The intermediate steps are derived here and checked with the Robotics Toolbox.</>
        : <>FK-kontroll av QUT Week 5, tutorial PDF-side 17, mål a. Lenker 5 og 7, leddvinkler 0 og <MathText inline>{String.raw`\pi/2`}</MathText>. Mellomregningen er utledet her og kontrollert med Robotics Toolbox.</>}</p>
      <Subheading>{en ? "1. Build the transformation to the elbow" : "1. Bygg transformasjonen til albuen"}</Subheading>
      <p>{en
        ? <><MathText inline>{String.raw`q_1=0`}</MathText> gives no rotation. We move five units along the world x-axis, so the elbow gets coordinates (5, 0).</>
        : <><MathText inline>{String.raw`q_1=0`}</MathText> gir ingen rotasjon. Vi flytter fem enheter langs verdens x-akse, så albuen får koordinatene (5, 0).</>}</p>
      <MathText>{String.raw`{}^0T_1=\begin{bmatrix}1&0&5\\0&1&0\\0&0&1\end{bmatrix}`}</MathText>
      <Subheading>{en ? "2. Build the transformation along link 2" : "2. Bygg transformasjonen langs lenke 2"}</Subheading>
      <p>{en
        ? <>First rotate <MathText inline>{String.raw`90^\circ`}</MathText> in frame 1. The local translation along <MathText inline>{String.raw`x_2`}</MathText> then becomes (0, 7) expressed in frame 1 — not (7, 0).</>
        : <>Roter først <MathText inline>{String.raw`90^\circ`}</MathText> i ramme 1. Den lokale translasjonen langs <MathText inline>{String.raw`x_2`}</MathText> blir da (0, 7) uttrykt i ramme 1 — ikke (7, 0).</>}</p>
      <MathText>{String.raw`{}^1T_2=\underbrace{\begin{bmatrix}0&-1&0\\1&0&0\\0&0&1\end{bmatrix}}_{R(\pi/2)}\underbrace{\begin{bmatrix}1&0&7\\0&1&0\\0&0&1\end{bmatrix}}_{T_x(7)}=\begin{bmatrix}0&-1&0\\1&0&7\\0&0&1\end{bmatrix}`}</MathText>
      <Subheading>{en ? "3. Multiply and read off the position" : "3. Multipliser og les av posisjonen"}</Subheading>
      <MathText>{String.raw`{}^0T_E=\begin{bmatrix}1&0&5\\0&1&0\\0&0&1\end{bmatrix}\begin{bmatrix}0&-1&0\\1&0&7\\0&0&1\end{bmatrix}=\begin{bmatrix}0&-1&5\\1&0&7\\0&0&1\end{bmatrix}`}</MathText>
      <p>{en
        ? <>The last column gives p_E = (5, 7). The rotation block says the end-effector frame is rotated <MathText inline>{String.raw`90^\circ`}</MathText>. Check the same result with the trigonometry:</>
        : <>Siste kolonne gir p_E = (5, 7). Rotasjonsblokken forteller at enderammen er rotert <MathText inline>{String.raw`90^\circ`}</MathText>. Kontroller samme resultat med trigonometrien:</>}</p>
      <MathText>{String.raw`x=5\cos0+7\cos(\pi/2)=5,\qquad y=5\sin0+7\sin(\pi/2)=7`}</MathText>
    </section> : <section className="egb-pilot-prose" id="regneeksempel">
      <Heading>{en ? "Worked example: two solutions for (5, 7)" : "Regneeksempel: to løsninger for (5, 7)"}</Heading>
      <p className="egb-pilot-source">{en
        ? <>QUT Week 5, tutorial PDF page 17, target a. <MathText inline>{String.raw`L_1=5`}</MathText> and <MathText inline>{String.raw`L_2=7`}</MathText>. No separate official week 5 answer key is available locally; both branches are checked numerically by substituting them back into FK.</>
        : <>QUT Week 5, tutorial PDF-side 17, mål a. <MathText inline>{String.raw`L_1=5`}</MathText> og <MathText inline>{String.raw`L_2=7`}</MathText>. Ingen separat offisiell uke 5-fasit er tilgjengelig lokalt; begge grener kontrolleres numerisk ved å sette dem tilbake i FK.</>}</p>
      <Subheading>{en ? "1. Check the reach" : "1. Kontroller rekkevidden"}</Subheading>
      <p>{en ? "The distance to the target must lie between the difference and the sum of the link lengths." : "Avstanden til målet må ligge mellom forskjellen og summen av lenkelengdene."}</p>
      <MathText>{String.raw`r=\sqrt{5^2+7^2}=\sqrt{74}\approx8.6023,\qquad |5-7|=2\le r\le12`}</MathText>
      <p>{en ? "The target lies inside the annular workspace. Checking only the outer radius is not enough." : "Målet er innenfor den ringformede arbeidsflaten. Det er ikke nok bare å kontrollere den ytre radiusen."}</p>
      <Subheading>{en ? "2. Find both elbow angles" : "2. Finn begge albuevinklene"}</Subheading>
      <MathText>{String.raw`c_2=\frac{25+49-25-49}{2\cdot5\cdot7}=0,\qquad q_2=\pm\arccos0=\pm\frac\pi2`}</MathText>
      <Subheading>{en ? "3. Find the corresponding shoulder angle" : "3. Finn tilhørende skuldervinkel"}</Subheading>
      <p>{en
        ? <>The target direction is <MathText inline>{String.raw`\phi`}</MathText>. The angle <MathText inline>{String.raw`\beta`}</MathText> lies between link 1 and the target direction, and changes sign together with <MathText inline>{String.raw`q_2`}</MathText>.</>
        : <>Målretningen er <MathText inline>{String.raw`\phi`}</MathText>. Vinkelen <MathText inline>{String.raw`\beta`}</MathText> er mellom lenke 1 og målretningen, og skifter fortegn sammen med <MathText inline>{String.raw`q_2`}</MathText>.</>}</p>
      <MathText>{String.raw`\phi=\operatorname{atan2}(7,5)\approx0.950547`}</MathText>
      <MathText>{String.raw`\beta=\operatorname{atan2}(7\sin q_2,5+7\cos q_2),\qquad q_1=\phi-\beta`}</MathText>
      <MathText>{String.raw`q_2=+\pi/2:\quad q_1=0.950547-0.950547=0`}</MathText>
      <MathText>{String.raw`q_2=-\pi/2:\quad q_1=0.950547-(-0.950547)=1.901094`}</MathText>
      <Subheading>{en ? "4. Substitute both solutions back into FK" : "4. Sett begge løsningene tilbake i FK"}</Subheading>
      <MathText>{String.raw`q^{(+)}=(0,\pi/2):\quad p=(5+0,\;0+7)=(5,7)`}</MathText>
      <p>{en ? "For the second branch we add the two link contributions in the world frame:" : "For den andre grenen summerer vi de to lenkebidragene i verdensrammen:"}</p>
      <MathText>{String.raw`q^{(-)}\approx(1.901094,-1.570796):\quad p\approx(-1.6216,4.7297)+(6.6216,2.2703)=(5,7)`}</MathText>
      <p>{en
        ? <>Same position, but a different elbow and a different end-effector frame orientation: <MathText inline>{String.raw`90^\circ`}</MathText> and about <MathText inline>{String.raw`18.925^\circ`}</MathText> respectively. Near the boundary points the branches coincide; with equal links fully folded to the origin, the shoulder angle is free.</>
        : <>Samme posisjon, men ulik albue og ulik enderammeorientering: henholdsvis <MathText inline>{String.raw`90^\circ`}</MathText> og omtrent <MathText inline>{String.raw`18.925^\circ`}</MathText>. Rundt grensepunktene sammenfaller grenene; ved like lenker helt foldet til origo er skuldervinkelen fri.</>}</p>
    </section>}
    <section className="egb-pilot-prose" id="prov-selv">
      <Heading>{en ? "Try it yourself" : "Prøv selv"}</Heading>
      <p>{mode === "fk" ? (en
        ? <>Keep <MathText inline>{String.raw`L_1=5`}</MathText> and <MathText inline>{String.raw`L_2=7`}</MathText>. Where does the arm end up at <MathText inline>{String.raw`q_1=90^\circ`}</MathText> and <MathText inline>{String.raw`q_2=-90^\circ`}</MathText>? Compute first, and check in the lab.</>
        : <>Behold <MathText inline>{String.raw`L_1=5`}</MathText> og <MathText inline>{String.raw`L_2=7`}</MathText>. Hvor ender armen ved <MathText inline>{String.raw`q_1=90^\circ`}</MathText> og <MathText inline>{String.raw`q_2=-90^\circ`}</MathText>? Regn først, og kontroller i laben.</>) : (en
        ? "Keep the QUT lengths. Do the targets (13, 0), (1, 0) and (12, 0) have any solution? Use the radius limits before you try in the lab."
        : "Behold QUT-lengdene. Har målene (13, 0), (1, 0) og (12, 0) noen løsning? Bruk radiusgrensene før du prøver i laben.")}</p>
      <TrySolution mode={mode} embedded={embedded}>
        {mode === "fk" ? <><MathText>{String.raw`q_1+q_2=0,\quad x=5\cos(\pi/2)+7\cos0=7,\quad y=5\sin(\pi/2)+7\sin0=5`}</MathText><p>{en ? "Link 1 points up and link 2 to the right. The end-effector frame is not rotated relative to the world." : "Lenke 1 peker opp og lenke 2 mot høyre. Enderammen er ikke rotert i forhold til verden."}</p></> : <p>{en
          ? <>(13, 0) is outside the outer radius 12. (1, 0) lies in the hole inside radius 2. Neither has a real IK. (12, 0) is reached with <MathText inline>{String.raw`q_1=q_2=0`}</MathText>: a singular, straight arm where the two branches coincide.</>
          : <>(13, 0) er utenfor ytre radius 12. (1, 0) ligger i hullet innenfor radius 2. Ingen av dem har reell IK. (12, 0) nås med <MathText inline>{String.raw`q_1=q_2=0`}</MathText>: en singulær, rett arm hvor de to grenene sammenfaller.</>}</p>}
      </TrySolution>
    </section>
    <section className="egb-pilot-prose" id="modell-assessment">
      <Heading>{en ? "From the 2R model to the course exercises" : "Fra 2R-modellen til kursoppgavene"}</Heading>
      <p>{en
        ? <><Link href="/egb339/uker/uke-4#w4-planar-chain">Week 4's kinematic chain</Link> has different links and a prismatic joint. The principle of ordered transformations is the same, but the factors must follow that exact robot.</>
        : <><Link href="/egb339/uker/uke-4#w4-planar-chain">Uke 4s kinematiske kjede</Link> har andre lenker og et prismatisk ledd. Prinsippet om ordnede transformasjoner er det samme, men faktorene må følge akkurat den roboten.</>}</p>
      <p>{en
        ? <><Link href="/egb339/uker/uke-5#w5-two-link-targets">Week 5's three target points</Link> use the model in the lab. All three can be loaded in IK mode.</>
        : <><Link href="/egb339/uker/uke-5#w5-two-link-targets">Uke 5s tre målpunkt</Link> bruker modellen i laben. Alle tre kan lastes inn i IK-modus.</>}</p>
      <p>{en
        ? <><Link href={mode === "fk" ? "/egb339/vurderinger/assessment-1-3-dobot-forward-kinematics#losningsforslag" : "/egb339/vurderinger/assessment-1-4-robot-inverse-kinematics#losningsforslag"}>Assessment {mode === "fk" ? "1.3: Dobot forward kinematics" : "1.4: robot inverse kinematics"}</Link> uses Dobot geometry. Transfer the method, not the link lengths or joint convention from this 2R arm.</>
        : <><Link href={mode === "fk" ? "/egb339/vurderinger/assessment-1-3-dobot-forward-kinematics#losningsforslag" : "/egb339/vurderinger/assessment-1-4-robot-inverse-kinematics#losningsforslag"}>Assessment {mode === "fk" ? "1.3: Dobot forward kinematics" : "1.4: robot inverse kinematics"}</Link> bruker Dobot-geometri. Overfør fremgangsmåten, ikke lenkelengdene eller leddkonvensjonen fra denne 2R-armen.</>}</p>
      <p className="egb-pilot-source">{en
        ? <>Academic reference: Corke, <cite>Robotics, Vision and Control</cite>, ch. 7.1.1, fig. 7.4 and pp. 257–259; ch. 7.2.1, pp. 278–281. The book uses <MathText inline>{String.raw`q_0, q_1`}</MathText>; the lab uses QUT's <MathText inline>{String.raw`q_1, q_2`}</MathText>. RTB: ET2/ETS2, Planar2 (DH and ETS), DHRobot.fkine/fkine_all.</>
        : <>Faglig referanse: Corke, <cite>Robotics, Vision and Control</cite>, kap. 7.1.1, figur 7.4 og s. 257–259; kap. 7.2.1, s. 278–281. Boka bruker <MathText inline>{String.raw`q_0, q_1`}</MathText>; laben bruker QUTs <MathText inline>{String.raw`q_1, q_2`}</MathText>. RTB: ET2/ETS2, Planar2 (DH og ETS), DHRobot.fkine/fkine_all.</>}</p>
    </section>
  </>;
}
