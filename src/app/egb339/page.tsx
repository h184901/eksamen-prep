import Link from "next/link";
import { Egb339Syllabus } from "@/components/egb339/pilot/Egb339CourseNavigation";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { EGB339_TRACKS } from "@/lib/egb339";

export default function Egb339Page() {
  return <article className="egb-pilot-article egb-pilot-prose">
    <header className="egb-pilot-lesson-header">
      <h1>EGB339 Introduction to Robotics</h1>
      <p>QUT · Semester 2 · 12 cp. Fra koordinatrammer til robotbevegelse og robot vision.</p>
      <nav aria-label="Kursoversikt"><a href="#kursplan">Ukeplan</a><Link href="/egb339/vurderinger">Assessments</Link><Link href="/egb339/oppsummering">Hurtigark</Link></nav>
    </header>
    <section id="kursplan"><h2>Uke for uke</h2>
      <p>Åpne en uke for å se leksjoner, oppgaver og assessments som bruker stoffet. Fullføringsmerkene følger deg mellom kursplanen og lesesidene.</p>
      <Egb339Syllabus weeks={getEgb339Course()} />
    </section>
    <section id="tracks-heading"><h2>Faglige sammenhenger</h2>
      <p>Bruk fagsporene når du vil slå opp et begrep på tvers av ukene.</p>
      <ul className="egb-study-track-list">{EGB339_TRACKS.map((track) => <li key={track.id} data-track={track.id}><Link href={"/egb339/temaer#" + track.id}>{track.label}</Link><p>{track.description}</p></li>)}</ul>
    </section>
    <section><h2>Laboratorier og praktisk arbeid</h2>
      <p><Link href="/egb339/temaer/se-2-homogeneous-transformations#utforsk">Koordinatrammer og SE(2)</Link> knytter figur til matrise. <Link href="/egb339/temaer/forward-kinematics#laboratorium">2R-roboten</Link> viser hvordan leddene bestemmer endepunktet.</p>
      <p><Link href="/egb339/ressurser">Simulator, oppsett og praktiske guider</Link> holder robotspesifikke parametere atskilt fra den generelle matematikken.</p>
    </section>
  </article>;
}
