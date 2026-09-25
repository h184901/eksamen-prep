/** Week-specific practical direction, grounded in the supplied QUT material. */
export interface Egb339WeekLearning {
  purpose: string;
  practical: string;
  sources: string[];
  purposeEn: string;
  practicalEn: string;
  sourcesEn: string[];
}
export const EGB339_WEEK_LEARNING: Record<number, Egb339WeekLearning> = {
  2: {
    purpose: "Fra vektorer og matriseprodukter til et punkt uttrykt i to koordinatrammer.",
    practical: "QUT bruker Prac – Python Refresher. Side 9 peker til warmup Q1–Q7: funksjoner, løkker, betingelser og samlinger. Kjør i kursets separate Python-miljø og test også grenseverdier. NumPy-oppgavene fortsetter i uke 3.",
    sources: ["QUT: Tutorial – Linear Algebra and 2D Pose, PDF s. 3–17; tutorial-fasit; Prac – Python Refresher, s. 2–9.", "Corke, Robotics, Vision and Control, 3. Python-utgave: kap. 2.2.1–2.2.2, trykt s. 33–38 (PDF s. 57–62).", "Robotics Toolbox / SpatialMath: SO2, SE2 og ET2/ETS2. Eksisterende SE(2)-motor og validerte eksempler gjenbrukes."],
    purposeEn: "From vectors and matrix products to a point expressed in two coordinate frames.",
    practicalEn: "QUT uses Prac – Python Refresher. Page 9 points to warmup Q1–Q7: functions, loops, conditionals and collections. Run in the course's separate Python environment and test boundary values too. The NumPy exercises continue in Week 3.",
    sourcesEn: ["QUT: Tutorial – Linear Algebra and 2D Pose, PDF pp. 3–17; tutorial answer key; Prac – Python Refresher, pp. 2–9.", "Corke, Robotics, Vision and Control, 3rd Python edition: ch. 2.2.1–2.2.2, print pp. 33–38 (PDF pp. 57–62).", "Robotics Toolbox / SpatialMath: SO2, SE2 and ET2/ETS2. The existing SE(2) engine and validated examples are reused."],
  },
  3: {
    purpose: "Les en 3D-ramme fra matrisekolonnene, velg riktig rotasjonsorden og følg en posegraf.",
    practical: "QUT Prac – Numpy Basics trener array-oppretting, dtype, indeksering, reshape og broadcasting. Side 10 ber deg fullføre warmupen; Q8–Q15 er NumPy-delen. Kontroller shape før og etter hver operasjon: (3,), (3, 1) og (1, 3) er forskjellige former. Bruk `@` for matriseprodukter, og `np.allclose` for flyttallskontroll.",
    sources: ["QUT: Tutorial – 3D Pose, s. 2–15, særlig lokale/globale akser s. 5 og posegraf s. 15; tilhørende tutorial-fasit. Prac – Numpy Basics, s. 2–10.", "Corke: kap. 2.1.3 (posegrafer), 2.3.1.1 (SO(3), trykt s. 45–48) og 2.3.2.1 (SE(3), s. 61–62). Markdown og original PDF er brukt sammen.", "SpatialMath SO3.Rx/Ry og SE3; RTB-dokumentasjonens transforms3d.png. Det interaktive 90°-eksemplet er Corkes eksempel, ikke et nytt QUT-fasitpunkt."],
    purposeEn: "Read a 3D frame from the matrix columns, choose the right rotation order and follow a pose graph.",
    practicalEn: "QUT Prac – Numpy Basics trains array creation, dtype, indexing, reshape and broadcasting. Page 10 asks you to finish the warmup; Q8–Q15 are the NumPy part. Check the shape before and after every operation: (3,), (3, 1) and (1, 3) are different shapes. Use `@` for matrix products, and `np.allclose` for floating-point checks.",
    sourcesEn: ["QUT: Tutorial – 3D Pose, pp. 2–15, especially local/global axes p. 5 and the pose graph p. 15; corresponding tutorial answer key. Prac – Numpy Basics, pp. 2–10.", "Corke: ch. 2.1.3 (pose graphs), 2.3.1.1 (SO(3), print pp. 45–48) and 2.3.2.1 (SE(3), pp. 61–62). Markdown and original PDF were used together.", "SpatialMath SO3.Rx/Ry and SE3; the RTB documentation's transforms3d.png. The interactive 90° example is Corke's example, not a new QUT answer point."],
  },
  4: {
    purpose: "Bygg robotens pose fra en ordnet kjede. Se hvordan ett ledd flytter alle rammene etter seg.",
    practical: "Uke 4-øvelsen kobler Python til Dobot i CoppeliaSim. Følg oppsettet nedenfor, tegn kjeden før du programmerer FK og bruk simulatorens posisjon som kontroll — ikke som erstatning for egen beregning.",
    sources: ["QUT: Tutorial – Forward Kinematics (1), s. 2–9; Week 4 Prac: Forward kinematics (7. september 2026), s. 1–3.", "Corke: kap. 7.1.1, s. 257–259, særlig figur 7.4 og ETS2-kjeden. Boka bruker $q_0$/$q_1$ der QUT-laben bruker $q_1$/$q_2$.", "Robotics Toolbox: `models/ETS/Planar2.py`, ET2/ETS2 og `DHRobot.fkine`. Den eksisterende 2R-laben gjenbruker validerte transformasjoner."],
    purposeEn: "Build the robot's pose from an ordered chain. Watch how one joint moves every frame after it.",
    practicalEn: "The Week 4 practical connects Python to Dobot in CoppeliaSim. Follow the setup below, draw the chain before you program FK, and use the simulator's position as a check — not as a substitute for your own calculation.",
    sourcesEn: ["QUT: Tutorial – Forward Kinematics (1), pp. 2–9; Week 4 Prac: Forward kinematics (7 September 2026), pp. 1–3.", "Corke: ch. 7.1.1, pp. 257–259, especially figure 7.4 and the ETS2 chain. The book uses $q_0$/$q_1$ where the QUT lab uses $q_1$/$q_2$.", "Robotics Toolbox: `models/ETS/Planar2.py`, ET2/ETS2 and `DHRobot.fkine`. The existing 2R lab reuses validated transformations."],
  },
  5: {
    purpose: "Finn leddvinkler fra et målpunkt. Skill mellom to løsninger, én grenseløsning og et mål som ikke kan nås.",
    practical: "Arbeid først med QUTs tolenkearm: $L_1 = 5$ og $L_2 = 7$. Last inn alle tre tutorialmål i IK-laben og kontroller begge grener med FK. Overfør deretter trekantmetoden til Dobots armplan og leddkonvensjon i Assessment 1.4; det er en annen robotmodell.",
    sources: ["QUT: Tutorial – Inverse Kinematics, s. 2–18, mål og lenkelengder s. 17; Lecture Week 5 notes (armplan og toppriss); `EGB339-LectureWeek5.py`. Ingen separat offisiell tutorial-fasit er tilgjengelig lokalt.", "Corke: kap. 7.2.1.1–7.2.1.2, s. 278–281: to analytiske grener, numerisk posisjonsfeil og FK-kontroll.", "Robotics Toolbox: ETS2.fkine og Planar2. Alle eksisterende lab- og assessmentberegninger er beholdt."],
    purposeEn: "Find joint angles from a target point. Tell apart two solutions, one boundary solution and a target that cannot be reached.",
    practicalEn: "Work first with QUT's two-link arm: $L_1 = 5$ and $L_2 = 7$. Load all three tutorial targets into the IK lab and check both branches with FK. Then transfer the triangle method to Dobot's arm plane and joint convention in Assessment 1.4; that is a different robot model.",
    sourcesEn: ["QUT: Tutorial – Inverse Kinematics, pp. 2–18, targets and link lengths p. 17; Lecture Week 5 notes (arm plane and top view); `EGB339-LectureWeek5.py`. No separate official tutorial answer key is available locally.", "Corke: ch. 7.2.1.1–7.2.1.2, pp. 278–281: two analytic branches, numerical position error and FK check.", "Robotics Toolbox: ETS2.fkine and Planar2. All existing lab and assessment calculations are kept."],
  },
  6: {
    purpose: "Gå fra posisjon til hastighet. Les hver Jacobian-kolonne som et geometrisk bidrag fra ett ledd.",
    practical: "Tutorialen bygger Jacobianen for hånd og med SymPy. Bruk $q = (\pi/4, \pi/4)$, $L_1 = 5$ og $L_2 = 7$, og sammenlign den lokale posisjonsoppdateringen med full FK etter et tidssteg. De dokumenterte feilene i QUT-fasiten står ved oppgaven og er ikke kopiert inn i modellen.",
    sources: ["QUT: Week 6 Tutorial – Robot Jacobian, s. 4–11; tutorial-fasit; Week 6 Board og EGB339 – Lecture Week 6-1.py.", "Corke: kap. 8.1.1, s. 308–310, særlig figur 8.1 og kolonnefortolkningen; kap. 8.3.1 om singularitet.", "Robotics Toolbox: `ets/ETS2.py`, `jacob0`. De to første radene er verdensrammens posisjonshastighet; den tredje er plan vinkelhastighet."],
    purposeEn: "Move from position to velocity. Read each Jacobian column as the geometric contribution of one joint.",
    practicalEn: "The tutorial builds the Jacobian by hand and with SymPy. Use $q = (\pi/4, \pi/4)$, $L_1 = 5$ and $L_2 = 7$, and compare the local position update with full FK after a time step. The documented errors in the QUT answer key are noted at the exercise and are not copied into the model.",
    sourcesEn: ["QUT: Week 6 Tutorial – Robot Jacobian, pp. 4–11; tutorial answer key; Week 6 Board and EGB339 – Lecture Week 6-1.py.", "Corke: ch. 8.1.1, pp. 308–310, especially figure 8.1 and the column interpretation; ch. 8.3.1 on singularity.", "Robotics Toolbox: `ets/ETS2.py`, `jacob0`. The first two rows are the world-frame position velocity; the third is the planar angular velocity."],
  },
  7: {
    purpose: "Skill hvor roboten går fra hvor fort den går. Sammenlign baner, les hastighetsprofiler og kontroller klaring.",
    practical: "Tutorialen bruker fem samples mellom $(0.75, 0.5)$ og $(0.75, -0.5)$, med lenker $2$ og $1.5$. Beregn begge banene før du legger på tidsprofil. Utvid deretter punkt–segment-testen til hver lenke ved hver robotkonfigurasjon. Få samples er ikke et bevis på kollisjonsfri bevegelse mellom dem.",
    sources: ["QUT: Week 7 Tutorial – Motion Planning, s. 3–13, og tilhørende fasit s. 1–2; Week 7 Board og EGB339 – Lecture Week 7.py.", "Corke: kap. 3.3.1–3.3.2, særlig s. 100–101 om trapezprofil og flerakset bevegelse; s. 106 skiller kartesisk bane fra tidsprofil.", "Robotics Toolbox: `tools/trajectory.py`, `trapezoidal`, `trapezoidal_func` og `jtraj`. QUTs lineære leddinterpolasjon er ikke `jtraj`-funksjonens femtegradspolynom."],
    purposeEn: "Separate where the robot goes from how fast it goes. Compare paths, read velocity profiles and check clearance.",
    practicalEn: "The tutorial uses five samples between $(0.75, 0.5)$ and $(0.75, -0.5)$, with links $2$ and $1.5$. Compute both paths before adding the time profile. Then extend the point-to-segment test to every link at every robot configuration. Few samples are not proof of a collision-free motion between them.",
    sourcesEn: ["QUT: Week 7 Tutorial – Motion Planning, pp. 3–13, and corresponding answer key pp. 1–2; Week 7 Board and EGB339 – Lecture Week 7.py.", "Corke: ch. 3.3.1–3.3.2, especially pp. 100–101 on the trapezoidal profile and multi-axis motion; p. 106 separates the Cartesian path from the time profile.", "Robotics Toolbox: `tools/trajectory.py`, `trapezoidal`, `trapezoidal_func` and `jtraj`. QUT's linear joint interpolation is not the `jtraj` function's fifth-order polynomial."],
  },
  8: {
    purpose: "Se bildet som data: koordinater, intensiteter og operasjoner. Knytt pikselmålinger til form, farge og arbeidsflate.",
    practical: "Bruk kursets `pixi.toml` i en separat `week_8_prac`-mappe og legg `highway.jpg` i `images/`. Øvelsen bruker gråtonebilder. Følg oppgavene fra bildestørrelse og histogram til rad-/kolonneprofiler, beskjæring, dtype og syntetiske bilder. Farge og homografi nedenfor knytter grunnlaget til senere vurderinger; de er ikke påstått å være hele forelesningen i uke 8.",
    sources: ["QUT: EGB339 – 2026 – Lecture Week 8, s. 4–16; Week 8 Prac – Working with images in Python, s. 1–3. Assessment 1.5–1.7 og deres eksisterende, kildekontrollerte gjennomganger.", "Corke: kap. 11.1.1 (bildekoordinater), 11.2 (histogram), 11.3–11.4 (pikseloperasjoner), 10.2.5 (kromatisitet), 12.1.3 (regionbeskrivelser) og 14.8.1 (perspektivkorreksjon). Markdown og original PDF er kontrollert sammen.", "Figurer: originale QUT-utdrag med kildeangivelse. Highway: Mapillary-bruker vagrant42, CC BY-SA 4.0, som oppgitt i QUT-practicalen. Ingen ny vision-dependency er lagt til."],
    purposeEn: "See the image as data: coordinates, intensities and operations. Connect pixel measurements to shape, colour and the work plane.",
    practicalEn: "Use the course's `pixi.toml` in a separate `week_8_prac` folder and place `highway.jpg` in `images/`. The practical uses greyscale images. Follow the exercises from image size and histogram to row/column profiles, cropping, dtype and synthetic images. Colour and homography below connect the foundation to later assessments; they are not claimed to be the whole Week 8 lecture.",
    sourcesEn: ["QUT: EGB339 – 2026 – Lecture Week 8, pp. 4–16; Week 8 Prac – Working with images in Python, pp. 1–3. Assessment 1.5–1.7 and their existing, source-checked walkthroughs.", "Corke: ch. 11.1.1 (image coordinates), 11.2 (histogram), 11.3–11.4 (point operations), 10.2.5 (chromaticity), 12.1.3 (region descriptors) and 14.8.1 (perspective correction). Markdown and original PDF were checked together.", "Figures: original QUT excerpts with attribution. Highway: Mapillary user vagrant42, CC BY-SA 4.0, as credited in the QUT practical. No new vision dependency has been added."],
  },
};
