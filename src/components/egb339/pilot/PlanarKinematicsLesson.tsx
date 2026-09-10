import Link from "next/link";
import MathText from "./Egb339Math";
import PlanarArmExplorer from "../PlanarArmExplorer";

/** Original worked explanations using the QUT Week 5 two-link model.
 * Week 4's different RPR/Dobot models remain in their original exercises.
 */
export default function PlanarKinematicsLesson({ mode }: { mode: "fk" | "ik" }) {
  return <>
    <section className="egb-pilot-prose" id="planar-modell">
      <h2>En plan 2R-modell</h2>
      <p>Begge ledd roterer om z-aksen. q₁ måles fra verdens x-akse; q₂ måles fra fortsettelsen av lenke 1. Derfor peker lenke 2 i retningen q₁ + q₂, ikke bare q₂.</p>
      <MathText>{String.raw`x=L_1\cos q_1+L_2\cos(q_1+q_2),\qquad y=L_1\sin q_1+L_2\sin(q_1+q_2)`}</MathText>
      <p>Matrisefaktorene følger samme geometri: roter ved leddet, transler langs den roterte x-aksen. Vi grupperer hvert par i én lenketransformasjon.</p>
      <MathText>{String.raw`{}^0T_1=R(q_1)T_x(L_1),\quad{}^1T_2=R(q_2)T_x(L_2),\quad{}^0T_E={}^0T_1{}^1T_2`}</MathText>
      {mode === "ik" && <><p>Lukk trekanten fra base via albue til mål. Cosinussetningen eliminerer q₁ og gir først q₂:</p>
        <MathText>{String.raw`r^2=x^2+y^2=L_1^2+L_2^2+2L_1L_2\cos q_2`}</MathText>
        <p>Vi trenger begge fortegnene i arccos. Deretter finner atan2 skuldervinkelen i riktig kvadrant. Dette løser målposisjonen; en vilkårlig orientering kan ikke samtidig påtvinges en 2R-arm.</p></>}
    </section>
    <section id="laboratorium"><PlanarArmExplorer initialMode={mode} /></section>
    {mode === "fk" ? <section className="egb-pilot-prose" id="regneeksempel">
      <h2>Regneeksempel: fra leddvinkler til (5, 7)</h2>
      <p className="egb-pilot-source">FK-kontroll av QUT Week 5, tutorial PDF-side 17, mål a. Lenker 5 og 7, leddvinkler 0 og π/2. Mellomregningen er utledet her og kontrollert med Robotics Toolbox.</p>
      <h3>1. Bygg transformasjonen til albuen</h3>
      <p>q₁ = 0 gir ingen rotasjon. Vi flytter fem enheter langs verdens x-akse, så albuen får koordinatene (5, 0).</p>
      <MathText>{String.raw`{}^0T_1=\begin{bmatrix}1&0&5\\0&1&0\\0&0&1\end{bmatrix}`}</MathText>
      <h3>2. Bygg transformasjonen langs lenke 2</h3>
      <p>Roter først 90° i ramme 1. Den lokale translasjonen langs x₂ blir da (0, 7) uttrykt i ramme 1 — ikke (7, 0).</p>
      <MathText>{String.raw`{}^1T_2=\underbrace{\begin{bmatrix}0&-1&0\\1&0&0\\0&0&1\end{bmatrix}}_{R(\pi/2)}\underbrace{\begin{bmatrix}1&0&7\\0&1&0\\0&0&1\end{bmatrix}}_{T_x(7)}=\begin{bmatrix}0&-1&0\\1&0&7\\0&0&1\end{bmatrix}`}</MathText>
      <h3>3. Multipliser og les av posisjonen</h3>
      <MathText>{String.raw`{}^0T_E=\begin{bmatrix}1&0&5\\0&1&0\\0&0&1\end{bmatrix}\begin{bmatrix}0&-1&0\\1&0&7\\0&0&1\end{bmatrix}=\begin{bmatrix}0&-1&5\\1&0&7\\0&0&1\end{bmatrix}`}</MathText>
      <p>Siste kolonne gir p_E = (5, 7). Rotasjonsblokken forteller at enderammen er rotert 90°. Kontroller samme resultat med trigonometrien:</p>
      <MathText>{String.raw`x=5\cos0+7\cos(\pi/2)=5,\qquad y=5\sin0+7\sin(\pi/2)=7`}</MathText>
    </section> : <section className="egb-pilot-prose" id="regneeksempel">
      <h2>Regneeksempel: to løsninger for (5, 7)</h2>
      <p className="egb-pilot-source">QUT Week 5, tutorial PDF-side 17, mål a. L₁ = 5 og L₂ = 7. Ingen separat offisiell uke 5-fasit er tilgjengelig lokalt; begge grener kontrolleres numerisk ved å sette dem tilbake i FK.</p>
      <h3>1. Kontroller rekkevidden</h3>
      <p>Avstanden til målet må ligge mellom forskjellen og summen av lenkelengdene.</p>
      <MathText>{String.raw`r=\sqrt{5^2+7^2}=\sqrt{74}\approx8.6023,\qquad |5-7|=2\le r\le12`}</MathText>
      <p>Målet er innenfor den ringformede arbeidsflaten. Det er ikke nok bare å kontrollere den ytre radiusen.</p>
      <h3>2. Finn begge albuevinklene</h3>
      <MathText>{String.raw`c_2=\frac{25+49-25-49}{2\cdot5\cdot7}=0,\qquad q_2=\pm\arccos0=\pm\frac\pi2`}</MathText>
      <h3>3. Finn tilhørende skuldervinkel</h3>
      <p>Målretningen er φ. Vinkelen β er mellom lenke 1 og målretningen, og skifter fortegn sammen med q₂.</p>
      <MathText>{String.raw`\phi=\operatorname{atan2}(7,5)\approx0.950547`}</MathText>
      <MathText>{String.raw`\beta=\operatorname{atan2}(7\sin q_2,5+7\cos q_2),\qquad q_1=\phi-\beta`}</MathText>
      <MathText>{String.raw`q_2=+\pi/2:\quad q_1=0.950547-0.950547=0`}</MathText>
      <MathText>{String.raw`q_2=-\pi/2:\quad q_1=0.950547-(-0.950547)=1.901094`}</MathText>
      <h3>4. Sett begge løsningene tilbake i FK</h3>
      <MathText>{String.raw`q^{(+)}=(0,\pi/2):\quad p=(5+0,\;0+7)=(5,7)`}</MathText>
      <p>For den andre grenen summerer vi de to lenkebidragene i verdensrammen:</p>
      <MathText>{String.raw`q^{(-)}\approx(1.901094,-1.570796):\quad p\approx(-1.6216,4.7297)+(6.6216,2.2703)=(5,7)`}</MathText>
      <p>Samme posisjon, men ulik albue og ulik enderammeorientering: henholdsvis 90° og omtrent 18.925°. Rundt grensepunktene sammenfaller grenene; ved like lenker helt foldet til origo er skuldervinkelen fri.</p>
    </section>}
    <section className="egb-pilot-prose" id="prov-selv">
      <h2>Prøv selv</h2>
      <p>{mode === "fk" ? "Behold L₁ = 5 og L₂ = 7. Hvor ender armen ved q₁ = 90° og q₂ = −90°? Regn først, og kontroller i laben." : "Behold QUT-lengdene. Har målene (13, 0), (1, 0) og (12, 0) noen løsning? Bruk radiusgrensene før du prøver i laben."}</p>
      <details className="egb-pilot-solution"><summary>Vis løsning og kontroll</summary>
        {mode === "fk" ? <><MathText>{String.raw`q_1+q_2=0,\quad x=5\cos(\pi/2)+7\cos0=7,\quad y=5\sin(\pi/2)+7\sin0=5`}</MathText><p>Lenke 1 peker opp og lenke 2 mot høyre. Enderammen er ikke rotert i forhold til verden.</p></> : <p>(13, 0) er utenfor ytre radius 12. (1, 0) ligger i hullet innenfor radius 2. Ingen av dem har reell IK. (12, 0) nås med q₁ = q₂ = 0: en singulær, rett arm hvor de to grenene sammenfaller.</p>}
      </details>
    </section>
    <section className="egb-pilot-prose" id="modell-assessment">
      <h2>Fra 2R-modellen til kursoppgavene</h2>
      <p><Link href="/egb339/uker/uke-4#w4-planar-chain">Uke 4s kinematiske kjede</Link> har andre lenker og et prismatisk ledd. Prinsippet om ordnede transformasjoner er det samme, men faktorene må følge akkurat den roboten.</p>
      <p><Link href="/egb339/uker/uke-5#w5-two-link-targets">Uke 5s tre målpunkt</Link> bruker modellen i laben. Alle tre kan lastes inn i IK-modus.</p>
      <p><Link href={mode === "fk" ? "/egb339/vurderinger/assessment-1-3-dobot-forward-kinematics#losningsforslag" : "/egb339/vurderinger/assessment-1-4-robot-inverse-kinematics#losningsforslag"}>Assessment {mode === "fk" ? "1.3: Dobot forward kinematics" : "1.4: robot inverse kinematics"}</Link> bruker Dobot-geometri. Overfør fremgangsmåten, ikke lenkelengdene eller leddkonvensjonen fra denne 2R-armen.</p>
      <p className="egb-pilot-source">Faglig referanse: Corke, <cite>Robotics, Vision and Control</cite>, kap. 7.1.1, figur 7.4 og s. 257–259; kap. 7.2.1, s. 278–281. Boka bruker q₀, q₁; laben bruker QUTs q₁, q₂. RTB: ET2/ETS2, Planar2 (DH og ETS), DHRobot.fkine/fkine_all.</p>
    </section>
  </>;
}
