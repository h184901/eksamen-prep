"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { SkraplanSimulator, FriksjonVisualiser, SirkelbevegelsSimulator } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-6">Teorisammendrag</h2>

      {/* ------------------------------------------------------------------ */}
      {/* 5.1 Partikler i likevekt */}
      {/* ------------------------------------------------------------------ */}
      <TheorySummary
        title="5.1 Anvendelse av N1L: Partikler i likevekt"
        mustKnow={[
          "ΣF = 0 betyr konstant fart — ikke nødvendigvis stille!",
          "Sett opp ΣFx = 0 og ΣFy = 0 for å finne ukjente krefter",
          "Strategi: figur → FBD → koordinatsystem → likninger → løs → vurder",
          "Velg koordinatakser langs de fleste kreftene for å minimere komponenter",
          "I et masseløst tau er snordraget likt overalt",
        ]}
      >
        <p>
          Newtons 1. lov sier at et legeme <em>uten nettokraft</em> beveger seg med konstant fart
          — det kan altså være både i ro og i jevn bevegelse. Likevektsanalyse handler om å
          utnytte dette: <strong>vi kjenner ikke alle kreftene, men vi vet at summen er null</strong>.
          Dermed kan vi finne de ukjente.
        </p>

        <FormulaBox
          latex="\sum\vec{F} = 0 \;\Longleftrightarrow\; \vec{v} = \text{konstant}"
          title="Likevektsbetingelsen"
          variant="gold"
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er likevekt så nyttig?</p>
          <p className="text-sm">
            Forestill deg et bilde som henger i to skrå vaiere. Du vet ikke snordraget i noen av
            dem — men du vet at bildet henger stille. Det betyr <InlineLatex latex="\sum F = 0" />.
            Den betingelsen gir deg to likninger (x og y) og du kan løse for begge snordragene.
            Uten likevektsideen ville du ikke hatt nok informasjon.
          </p>
          <p className="text-sm mt-2">
            <strong>Nøkkelinsikt:</strong> Likevekt gir deg gratis relasjoner mellom krefter du
            ellers ikke kjenner.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: Bildet i vaieren</p>
          <p className="text-sm">
            Ta et bilde på 20 N som henger i to vaiere med vinkel 30° fra taket. Vaierene justerer
            seg automatisk slik at nettokraften er null. Snordraget i hver vaier er ikke 20 N, men
            avhenger av vinkelen. Jo brattere vinkel (nærmere loddrett), desto mindre snordrag.
            Jo flatere vinkel, desto <em>mer</em> snordrag — prøv å strekke en vaier helt horisontalt
            og du trenger uendelig kraft for å bære vekten.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse: «likevekt = i ro»</p>
          <p className="text-sm">
            Mange tror likevekt betyr at legemet <em>ikke beveger seg</em>. Feil. Likevekt betyr at
            akselerasjonen er null, altså at <em>farten er konstant</em>. Et tog som kjører med
            100 km/t uten å akselerere er i dynamisk likevekt — trekkraften balanserer luftmotstand
            og friksjon. Et stillestående legeme er et spesialtilfelle (v = 0 = konstant).
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Løsningsstrategi (6 steg)</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Tegn figur av situasjonen</li>
            <li>Tegn <strong>fritt-legeme-diagram</strong> for hvert legeme separat</li>
            <li>Tegn inn <em>alle</em> krefter med piler fra legemets massesentrum</li>
            <li>Velg koordinatsystem — plasser en akse langs de fleste kreftene</li>
            <li>Anvend N1L: <InlineLatex latex="\sum F_x = 0" /> og <InlineLatex latex="\sum F_y = 0" /></li>
            <li>Løs likningene og <em>vurder svaret</em> (enhet, fortegn, størrelsesorden)</li>
          </ol>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: valg av koordinatsystem</p>
          <p className="text-sm">
            Velg aksene slik at <em>flest mulig krefter</em> faller langs aksene. På et skråplan:
            legg x-aksen langs planet og y-aksen normalt på det. Da slipper du å dekomponere
            normalkraften og friksjonen — bare tyngden får komponenter. Dette sparer tid og
            reduserer regnefeil.
          </p>
        </div>

        <p className="mt-3">
          <strong>Snordrag i masseløst tau:</strong> I et masseløst tau er snordraget identisk i
          begge ender. Dersom tauet har masse, øker snordraget fra det frie endepunktet og opp mot
          festepunktet, fordi tauet selv må bæres opp av snordraget.
        </p>

        {/* SVG: Bilde som henger i to vaiere */}
        <div className="my-4">
          <p className="text-sm mb-2 font-semibold">Eksempel: bilde som henger i to vaiere</p>
          <div className="flex justify-center">
            <svg viewBox="0 0 400 260" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
              {/* Tak */}
              <line x1="50" y1="30" x2="350" y2="30" stroke="currentColor" strokeWidth="2" />
              <g stroke="currentColor" strokeWidth="1" opacity="0.5">
                <line x1="60" y1="30" x2="50" y2="20" />
                <line x1="100" y1="30" x2="90" y2="20" />
                <line x1="140" y1="30" x2="130" y2="20" />
                <line x1="180" y1="30" x2="170" y2="20" />
                <line x1="220" y1="30" x2="210" y2="20" />
                <line x1="260" y1="30" x2="250" y2="20" />
                <line x1="300" y1="30" x2="290" y2="20" />
                <line x1="340" y1="30" x2="330" y2="20" />
              </g>
              {/* Vaiere */}
              <line x1="120" y1="30" x2="200" y2="150" stroke="#3b82f6" strokeWidth="2" />
              <line x1="280" y1="30" x2="200" y2="150" stroke="#3b82f6" strokeWidth="2" />
              {/* Bilde */}
              <rect x="160" y="150" width="80" height="60" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
              <text x="200" y="185" textAnchor="middle" className="fill-current text-xs">Bilde</text>
              {/* Tyngde */}
              <line x1="200" y1="210" x2="200" y2="245" stroke="#ef4444" strokeWidth="3" />
              <polygon points="200,245 196,236 204,236" fill="#ef4444" />
              <text x="208" y="235" className="fill-current text-xs" style={{ fill: "#ef4444" }}>G = mg</text>
              {/* T1 */}
              <line x1="190" y1="155" x2="145" y2="85" stroke="#10b981" strokeWidth="3" />
              <polygon points="145,85 154,89 149,95" fill="#10b981" />
              <text x="110" y="100" className="fill-current text-xs" style={{ fill: "#10b981" }}>T₁</text>
              {/* T2 */}
              <line x1="210" y1="155" x2="255" y2="85" stroke="#10b981" strokeWidth="3" />
              <polygon points="255,85 246,89 251,95" fill="#10b981" />
              <text x="265" y="100" className="fill-current text-xs" style={{ fill: "#10b981" }}>T₂</text>
              {/* Vinkler */}
              <text x="170" y="145" className="fill-current text-xs" style={{ fill: "#f59e0b" }}>θ₁</text>
              <text x="225" y="145" className="fill-current text-xs" style={{ fill: "#f59e0b" }}>θ₂</text>
            </svg>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Løsning av bildeeksempelet</p>
          <p className="text-sm">
            Med likevekt <InlineLatex latex="\sum F_x = 0" /> og <InlineLatex latex="\sum F_y = 0" /> får vi:
          </p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li><InlineLatex latex="T_1 \sin\theta_1 = T_2 \sin\theta_2" /> (x-retning)</li>
            <li><InlineLatex latex="T_1 \cos\theta_1 + T_2 \cos\theta_2 = mg" /> (y-retning)</li>
          </ul>
          <p className="text-sm mt-2">
            To likninger, to ukjente (<InlineLatex latex="T_1, T_2" />). Løs som vanlig lineært system.
          </p>
        </div>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 my-4">
          <p className="font-semibold text-sm mb-2">Videre lesning</p>
          <ul className="text-sm space-y-1">
            <li>• <a href="https://www.khanacademy.org/science/physics/forces-newtons-laws/tension-tutorial" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Khan Academy — Tension</a></li>
            <li>• <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/mincl.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">HyperPhysics — Inclined planes and equilibrium</a></li>
          </ul>
        </div>
      </TheorySummary>

      {/* ------------------------------------------------------------------ */}
      {/* 5.2 Partikkeldynamikk */}
      {/* ------------------------------------------------------------------ */}
      <TheorySummary
        title="5.2 Anvendelse av N2L: Partikkeldynamikk"
        mustKnow={[
          "ΣF = ma brukes når legemet akselererer",
          "Samme FBD-strategi som likevekt, men sett ΣF = ma",
          "Kombiner med kinematikk (kap. 2) for å finne v, x, t",
          "Koblede systemer: hvert legeme får eget FBD, men de deler akselerasjon |a|",
          "Snordrag T er en ukjent som går igjen i begge ligningene for koblet system",
        ]}
      >
        <p>
          Når kraftsummen ikke er null, akselererer legemet. Newtons 2. lov gir oss akselerasjonen,
          og kinematikken fra kapittel 2 gir oss deretter fart og posisjon. De to fagområdene henger
          uløselig sammen.
        </p>

        <FormulaBox
          latex="\sum\vec{F} = m\vec{a} \;\Longrightarrow\; \vec{a} = \frac{\sum\vec{F}}{m}"
          title="Newtons 2. lov — dynamikklikningen"
          variant="gold"
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor kombinere N2L med kinematikk?</p>
          <p className="text-sm">
            Kreftene forteller oss <em>akselerasjonen</em>. Men vi er som regel interessert i noe
            mer håndfast: Hvor fort går bilen etter 5 s? Hvor langt sklir kassen? Da trenger vi
            kinematikken. Flyten er alltid:{" "}
            <strong>krefter → N2L → akselerasjon → kinematikk → fart/posisjon</strong>.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kapittel 2 (kinematikk)</p>
          <p className="text-sm">
            Når du har funnet <InlineLatex latex="a" /> fra N2L, bruker du de kjente likningene:
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li><InlineLatex latex="v = v_0 + at" /></li>
            <li><InlineLatex latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" /></li>
            <li><InlineLatex latex="v^2 = v_0^2 + 2a(x - x_0)" /></li>
          </ul>
          <p className="text-sm mt-2">
            Disse fire størrelsene (x, v, a, t) henger sammen — finn to ukjente gitt at du kjenner
            de andre.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Koblede systemer: Atwood-maskinen og blokker på bord</p>
          <p className="text-sm">
            To blokker koblet med et tau over en trinse er et klassisk eksamenseksempel. Nøkkelinsikten:
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li>Blokkene har <em>samme akselerasjon</em> i størrelse (tauet er uelastisk)</li>
            <li>Snordraget T er den <em>samme</em> i hele tauet (masseløst tau)</li>
            <li>Tegn <strong>separat FBD for hvert legeme</strong> — ikke prøv å slå dem sammen</li>
            <li>Sett opp N2L for hvert legeme, og løs for T og a som to ukjente</li>
          </ul>
          <p className="text-sm mt-2">
            For blokk 1 (henger): <InlineLatex latex="m_1 g - T = m_1 a" />. For blokk 2
            (bord, friksjon <InlineLatex latex="\mu_k" />):{" "}
            <InlineLatex latex="T - \mu_k m_2 g = m_2 a" />. Legg likningene
            sammen og løs for <InlineLatex latex="a" />.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig feil: feil fortegn på akselerasjon i koblet system</p>
          <p className="text-sm">
            Velg en positiv retning <em>konsekvent gjennom hele systemet</em> før du setter opp
            likningene. Vanlig feil: man velger «ned» som positivt for den hengede blokken, men
            glemmer å snu fortegnet for blokken på bordet. Definer én positiv retning for hele
            systemet (f.eks. stramretningen i tauet), og hold deg til det.
          </p>
        </div>

        <p className="mt-3">
          <strong>Variabel kraft:</strong> Hvis kraften varierer med tid eller posisjon, varierer
          også akselerasjonen. Da kan vi ikke bruke de konstante kinematikklikningene direkte.
          Vi bruker <InlineLatex latex="a(t) = F(t)/m" /> og integrerer for å finne fart og posisjon.
        </p>

        {/* SVG: Atwood-maskinen */}
        <div className="my-4">
          <p className="text-sm mb-2 font-semibold">Eksempel: Atwood-maskinen</p>
          <div className="flex justify-center">
            <svg viewBox="0 0 400 300" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
              {/* Tak */}
              <line x1="120" y1="30" x2="280" y2="30" stroke="currentColor" strokeWidth="2" />
              <g stroke="currentColor" strokeWidth="1" opacity="0.5">
                <line x1="130" y1="30" x2="120" y2="20" />
                <line x1="160" y1="30" x2="150" y2="20" />
                <line x1="190" y1="30" x2="180" y2="20" />
                <line x1="220" y1="30" x2="210" y2="20" />
                <line x1="250" y1="30" x2="240" y2="20" />
                <line x1="270" y1="30" x2="260" y2="20" />
              </g>
              {/* Trinse */}
              <circle cx="200" cy="60" r="25" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="200" cy="60" r="3" fill="currentColor" />
              <line x1="200" y1="35" x2="200" y2="30" stroke="currentColor" strokeWidth="2" />
              {/* Tau venstre */}
              <line x1="175" y1="60" x2="175" y2="180" stroke="#10b981" strokeWidth="2" />
              {/* Tau høyre */}
              <line x1="225" y1="60" x2="225" y2="140" stroke="#10b981" strokeWidth="2" />
              {/* Kloss m1 (tyngre) */}
              <rect x="150" y="180" width="50" height="50" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
              <text x="175" y="210" textAnchor="middle" className="fill-current text-xs font-semibold">m₁</text>
              {/* Kloss m2 (lettere) */}
              <rect x="205" y="140" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
              <text x="225" y="163" textAnchor="middle" className="fill-current text-xs font-semibold">m₂</text>
              {/* a pil ned for m1 */}
              <line x1="125" y1="200" x2="125" y2="225" stroke="#ef4444" strokeWidth="3" />
              <polygon points="125,225 121,217 129,217" fill="#ef4444" />
              <text x="100" y="220" className="fill-current text-xs" style={{ fill: "#ef4444" }}>a</text>
              {/* a pil opp for m2 */}
              <line x1="260" y1="175" x2="260" y2="150" stroke="#ef4444" strokeWidth="3" />
              <polygon points="260,150 256,158 264,158" fill="#ef4444" />
              <text x="265" y="170" className="fill-current text-xs" style={{ fill: "#ef4444" }}>a</text>
              {/* Tekst */}
              <text x="200" y="275" textAnchor="middle" className="fill-current text-xs">Samme tau → samme T, samme |a|</text>
              <text x="200" y="290" textAnchor="middle" className="fill-current text-xs font-semibold">a = (m₁ − m₂)g / (m₁ + m₂)</text>
            </svg>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hvorfor er Atwood-akselerasjonen <em>ikke</em> bare g?</p>
          <p className="text-sm">
            Naiv tanke: &laquo;tyngde trekker ned, så den tunge blokken akselererer med g.&raquo; Feil —
            den tunge blokken må <em>også</em> dra opp den lette blokken via tauet. Det koster kraft
            og reduserer akselerasjonen.
          </p>
          <p className="text-sm mt-2">
            <strong>Utledning:</strong> Sett opp N2L for hver blokk (positiv retning = tauets bevegelsesretning):
          </p>
          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
            <li>Tung blokk (<InlineLatex latex="m_1" />, faller): <InlineLatex latex="m_1 g - T = m_1 a" /></li>
            <li>Lett blokk (<InlineLatex latex="m_2" />, stiger): <InlineLatex latex="T - m_2 g = m_2 a" /></li>
          </ul>
          <p className="text-sm mt-2">
            Legg sammen: <InlineLatex latex="(m_1 - m_2)g = (m_1 + m_2)a" />, som gir:
          </p>
          <div className="mt-2">
            <FormulaBox
              latex="a = \frac{(m_1 - m_2)g}{m_1 + m_2}, \qquad T = \frac{2 m_1 m_2 g}{m_1 + m_2}"
              title="Atwood-maskin"
              variant="blue"
              description="Samme a for begge, samme T i hele tauet."
            />
          </div>
          <p className="text-sm mt-2">
            <strong>Sjekk:</strong> Hvis <InlineLatex latex="m_1 = m_2" />, så <InlineLatex latex="a = 0" /> (likevekt).
            Hvis <InlineLatex latex="m_2 \to 0" />, så <InlineLatex latex="a \to g" /> (fritt fall for m₁).
            Fornuftig!
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Sammenheng: effektiv masse og treghet</p>
          <p className="text-sm">
            Atwood-formelen viser et generelt prinsipp: når to masser er koblet, akselereres systemet som om
            det hadde en &laquo;effektiv treghet&raquo; <InlineLatex latex="m_1 + m_2" />, drevet av en &laquo;effektiv kraft&raquo;{" "}
            <InlineLatex latex="(m_1 - m_2)g" />. Det samme mønsteret ser du igjen i redusert masse ved
            to-legemes-problemer og i kollisjoner (kap. 8).
          </p>
        </div>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 my-4">
          <p className="font-semibold text-sm mb-2">Videre lesning</p>
          <ul className="text-sm space-y-1">
            <li>• <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/atwd.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">HyperPhysics — The Atwood Machine</a></li>
            <li>• <a href="https://www.khanacademy.org/science/physics/forces-newtons-laws/tension-tutorial/v/tension-in-an-accelerating-system-and-pie-in-the-face" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Khan Academy — Tension in accelerating systems</a></li>
          </ul>
        </div>
      </TheorySummary>

      {/* ------------------------------------------------------------------ */}
      {/* 5.3 Friksjonskrefter */}
      {/* ------------------------------------------------------------------ */}
      <TheorySummary
        title="5.3 Friksjonskrefter"
        mustKnow={[
          "Glidefriksjon: R = μk·N (konstant under glidning)",
          "Hvilefriksjon: R ≤ μs·N (tilpasser seg — sjekk om objektet glir!)",
          "Alltid μs > μk — statisk er alltid høyere enn kinetisk",
          "Friksjon virker motsatt relativ bevegelse — ikke nødvendigvis motsatt absolutt bevegelse",
          "Friksjon avhenger IKKE av kontaktarealet (Coulombs enkle modell)",
          "Terminalfart: når luftmotstand balanserer tyngden",
        ]}
      >
        <p>
          Friksjon oppstår mellom alle flater i kontakt. Den virker alltid <strong>mot relativ
          bevegelse</strong> — altså mot den retningen ett legeme ville glidd i forhold til det
          andre. Friksjon er ikke bare en hindring: den er det som gjør det mulig å gå!
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor eksisterer friksjon?</p>
          <p className="text-sm">
            Selv «glatte» flater er ruglete på mikroskopisk nivå. Når to flater presses mot
            hverandre, haker topper og daler seg fast i hverandre — som en rekke mikroskopiske
            sveisepunkter. For å bevege flatene relativt til hverandre må disse forbindelsene brytes.
            Jo større normalkraft, desto mer kontakt, desto mer friksjon. Kontaktarealet spiller
            derimot <em>liten rolle</em> i Coulombs enkle modell, fordi økt areal gir lavere
            trykk per enhet areal — effektene utjevner hverandre.
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er μs &gt; μk?</p>
          <p className="text-sm">
            Når flatene er i ro, rekker de mikroskopiske forbindelsene å «sette seg» og bli sterkere.
            Når flatene glir, er kontakttiden kortere og forbindelsene svakere. Derfor krever det
            mer kraft å <em>starte</em> bevegelsen enn å <em>opprettholde</em> den. Typisk er
            μs ≈ 20–30 % høyere enn μk for samme flatepar.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: den tunge kassen</p>
          <p className="text-sm">
            Du prøver å skyve en tung kasse over gulvet. I starten trengs det mye kraft — det er
            den statiske friksjonen som holder. Når kassen løsner og begynner å gli, trengs det
            <em>litt mindre</em> kraft for å holde den i bevegelse — det er kinetisk friksjon.
            Du merker dette tydelig: et lite «rykk» ved starten, og deretter smidigere glidning.
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">To typer friksjon</p>
          <p className="text-sm">
            <strong>Hvilefriksjon (statisk):</strong> Når legemet er i ro relativt til underlaget.
            Tilpasser seg den påførte kraften opp til en maksverdi:{" "}
            <InlineLatex latex="R \leq \mu_s N" />. Har legemet ikke begynt å gli, er R = F_påført.
          </p>
          <p className="text-sm mt-2">
            <strong>Glidefriksjon (kinetisk):</strong> Når legemet glir. Konstant verdi:{" "}
            <InlineLatex latex="R = \mu_k N" />. Uavhengig av glidehastigheten (i enkel modell).
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <FormulaBox
            latex="R = \mu_k N"
            title="Glidefriksjon"
            variant="gold"
            description="Konstant under bevegelse. R er alltid positiv, retning settes av FBD."
          />
          <FormulaBox
            latex="R \leq \mu_s N"
            title="Hvilefriksjon (maks)"
            variant="gold"
            description="Tilpasser seg inntil maks. Sjekk alltid om det faktisk glir!"
          />
        </div>

        <FormulaBox
          latex="\mu = \frac{R}{N}"
          title="Friksjonskoeffisient"
          variant="blue"
          description="Dimensjonsløst tall. Typisk: μs ≈ 0,3–0,8 for vanlige materialer."
        />

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser om friksjon</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li>
              <strong>«Friksjon motvirker alltid bevegelsen»:</strong> Nei — friksjon motvirker
              <em>relativ</em> bevegelse. Friksjonen på foten din peker <em>fremover</em> når du
              går. Uten friksjon ville du ikke klart å gå i det hele tatt. Friksjonen fra gulvet
              er det som driver deg fremover!
            </li>
            <li>
              <strong>«Større kontaktflate → mer friksjon»:</strong> Nei — i Coulombs enkle modell
              er <InlineLatex latex="R = \mu N" />, som ikke avhenger av arealet. Et bredt dekk
              og et smalt dekk med samme normalkraft gir samme friksjonskraft (i Coulombs modell).
            </li>
            <li>
              <strong>«Glidefriksjon er null når man nesten ikke beveger seg»:</strong> Nei —
              glidefriksjon er konstant <InlineLatex latex="\mu_k N" /> uansett glidehastighet
              (i enkel modell). Enten glir du, eller så gjør du ikke.
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips: glir det eller ikke?</p>
          <p className="text-sm">
            Alltid avgjør dette <strong>før</strong> du velger μs eller μk:
          </p>
          <ol className="text-sm mt-2 space-y-1 list-decimal list-inside">
            <li>Anta først at legemet <em>ikke glir</em>. Beregn nødvendig statisk friksjon R.</li>
            <li>Sjekk om <InlineLatex latex="R \leq \mu_s N" />.</li>
            <li>Hvis ja: antagelsen holder, og R er den verdien du fant.</li>
            <li>Hvis nei: legemet glir, og du bruker <InlineLatex latex="R = \mu_k N" /> i stedet.</li>
          </ol>
        </div>

        <p className="mt-3">
          <strong>Rullefriksjon:</strong> Hjul som ruller gir også motstand (rullefriksjon <InlineLatex latex="\mu_r" />),
          men denne er typisk 10–100 ganger mindre enn glidefriksjon. Derfor er hjul så nyttige.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Luftmotstand og terminalfart</p>
          <p className="text-sm">
            Legemer i bevegelse i luft eller vann møter motstand som virker mot fartsretningen.
            Motstanden øker med farten:
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li>Lav hastighet: <InlineLatex latex="L \approx kv" /> (lineær — f.eks. sandkorn i luft)</li>
            <li>Høy hastighet: <InlineLatex latex="L \approx Dv^2" /> (kvadratisk — f.eks. bil, sykkelrytter)</li>
          </ul>
          <p className="text-sm mt-2">
            <strong>Terminalfart</strong> nås når luftmotstanden balanserer tyngden (<InlineLatex latex="\sum F = 0" />):
          </p>
          <p className="text-sm mt-1 font-mono">
            <InlineLatex latex="kv_T = mg \;\Rightarrow\; v_T = \frac{mg}{k}" />
          </p>
          <p className="text-sm mt-2">
            En fallskjermhopper uten fallskjerm har terminalfart ≈ 55 m/s. Med åpen fallskjerm
            faller den til ≈ 5 m/s — D øker drastisk.
          </p>
        </div>

        {/* Friksjon-visualisering inline i teorien */}
        <FriksjonVisualiser />
      </TheorySummary>

      {/* Skråplan-simulator: naturlig sted etter N2L og friksjon er introdusert */}
      <div className="my-6">
        <p className="text-sm text-[var(--muted)] mb-2">
          Bruk simulatoren under for å se hvordan kreftene på skråplanet endrer seg:
        </p>
        <SkraplanSimulator />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5.4 Dynamikk i sirkelbevegelse */}
      {/* ------------------------------------------------------------------ */}
      <TheorySummary
        title="5.4 Dynamikk i sirkelbevegelse"
        mustKnow={[
          "Sentripetalakselerasjon: a⊥ = v²/R (peker alltid inn mot sentrum)",
          "ΣF_inn = mv²/R — nettokraften inn mot sentrum gir sirkelbevegelse",
          "«Sentrifugalkraft» eksisterer ikke i et treghetssystem — det er tregheten din",
          "I topp av loop: N og G peker begge ned; i bunn: N opp, G ned",
          "Minimum fart i topp av loop: v_min = √(gR) (krever N = 0)",
          "Dossert sving: ideell fart v = √(gr·tanβ) — ingen friksjon nødvendig",
        ]}
      >
        <p>
          For et legeme i sirkelbevegelse med konstant banefart er akselerasjonen rettet inn mot
          sentrum (sentripetalakselerasjon). Newtons 2. lov gir da at nettokraften også peker inn
          mot sentrum. Det er <em>ikke</em> en ny type kraft — det er summen av de vanlige kreftene
          (tyngde, normalkraft, spenning, friksjon) som til enhver tid peker mot sentrum.
        </p>

        <FormulaBox
          latex="a_\perp = \frac{v^2}{R}, \qquad \sum F_{\text{inn}} = m\frac{v^2}{R}"
          title="Sentripetalakselerasjon og nettokraft"
          variant="gold"
          description="R = radius, v = banefart. Nettokraften peker ALLTID inn mot sentrum — ellers er bevegelsen ikke sirkulær."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor «sentrifugalkraft» er feil</p>
          <p className="text-sm">
            I en bil som svinger til venstre, opplever du at du «presses mot høyre dør». Det er
            fristende å kalle dette en «sentrifugalkraft» ut fra sentrum. Men i et treghetssystem
            (utenfor bilen) ser vi sannheten: <strong>du vil gå rett frem</strong> (Newtons 1. lov),
            mens bilen svinger. Bilen treffer deg, ikke omvendt. «Sentrifugalkraften» er en
            fiktiv kraft som dukker opp i et roterende referansesystem — nyttig i noen beregninger,
            men feil å bruke i et treghetssystem.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi: steinen i snoren</p>
          <p className="text-sm">
            Svinger du en stein i en snor over hodet, trekker snoren inn mot sentrum — det er
            snordragkraften som gir sentripetalakselerasjonen. Hva skjer hvis snoren ryker?
            Steinen fortsetter <em>rett frem</em> i tangensiell retning — ikke «ut fra sentrum»
            som mange tror. Den gjør det fordi ingen kraft lenger virker på den. Dette illustrerer
            Newtons 1. lov og viser at «sentrifugalkraften» er en illusjon.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Vertikal sirkelbevegelse — topp og bunn av loop</p>
          <p className="text-sm">
            Hva varierer fra topp til bunn er fortegnet til normalkraften relativt til tyngden:
          </p>
          <div className="mt-2 space-y-2 text-sm">
            <div>
              <strong>Topp:</strong> Begge N og G peker <em>ned</em> (mot sentrum).
              <div className="ml-4 mt-1">
                <InlineLatex latex="mg + N = \frac{mv^2}{R} \;\Rightarrow\; N = m\!\left(\frac{v^2}{R} - g\right)" />
              </div>
              <p className="ml-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                Merk: N kan ikke bli negativ (banen kan ikke dra). Minste fart når N = 0.
              </p>
            </div>
            <div>
              <strong>Bunn:</strong> N peker <em>opp</em> (mot sentrum), G ned.
              <div className="ml-4 mt-1">
                <InlineLatex latex="N - mg = \frac{mv^2}{R} \;\Rightarrow\; N = m\!\left(\frac{v^2}{R} + g\right)" />
              </div>
              <p className="ml-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                N &gt; mg alltid i bunn — det er derfor du kjennes tyngre i bunnen av en tur i berg-og-dalbane.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor finnes det en minimumsfart i toppen av en loop?</p>
          <p className="text-sm">
            Normalkraften kan <em>bare</em> dytte, aldri dra. I toppen av loopen er maks
            sentripetalakselerasjon begrenset av N ≥ 0. Setter vi N = 0 (minste mulige N) og
            løser for v, finner vi den <em>minste</em> farten for å opprettholde kontakt med banen:
          </p>
          <div className="mt-2">
            <FormulaBox
              latex="v_{\min,\text{topp}} = \sqrt{gR}"
              title="Minimumsfart i topp av loop"
              variant="blue"
              description="Tyngdekraften alene gir akkurat nok sentripetalakselerasjon når N = 0."
            />
          </div>
          <p className="text-sm mt-1">
            Er farten lavere enn dette, mister loopen kontakt med legemet (som da faller).
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <FormulaBox
            latex="v = \frac{2\pi R}{T}"
            title="Banefart og omløpstid"
            variant="blue"
            description="T = omløpstid (tid for én full runde)"
          />
          <FormulaBox
            latex="v_{\min,\text{topp}} = \sqrt{gR}"
            title="Min. fart i topp av loop"
            variant="blue"
            description="For å opprettholde kontakt (N = 0)"
          />
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Dossert sving (banked curve)</p>
          <p className="text-sm">
            En dossert vei heller innover i en sving med vinkel β. Normalkraftens horisontale
            komponent <InlineLatex latex="N\sin\beta" /> bidrar da til sentripetalkraften, slik at
            friksjonen ikke trenger å gjøre all jobben. Ved en bestemt «ideell» fart er
            friksjonskraften nøyaktig null:
          </p>
          <div className="mt-2">
            <FormulaBox
              latex="v_{\text{ideal}} = \sqrt{gR\tan\beta}"
              title="Ideell fart i dossert sving"
              variant="blue"
              description="Normalkraften alene gir sentripetalkraften — ingen friksjon nødvendig."
            />
          </div>
          <p className="text-sm mt-1">
            Motorveikryss er gjerne konstruert rundt denne ideen: doseringsvinkel og radius er
            dimensjonert for fartsgrensen. Kjører du fortere, sklir du ut; kjører du saktere,
            sklir du inn — frksjon kompenserer for avvik.
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor hjelper dossering?</p>
          <p className="text-sm">
            Uten dosering er normalkraften loddrett og kan ikke bidra til sentripetalkraften —
            all sentripetalkraft må da komme fra friksjon. Med dosering har normalkraften en
            horisontal komponent som peker mot sentrum. Jo brattere vinkel, desto mer bidrar
            normalkraften, og desto mindre trenger friksjonen å gjøre.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kapittel 9 og 10 (rotasjon)</p>
          <p className="text-sm">
            Sirkelbevegelse i dette kapittelet handler om <em>lineær</em> dynamikk langs en sirkulær
            bane. I kap. 9–10 møter du rotasjonskinematikk og -dynamikk der <em>dreiemomentet</em>{" "}
            spiller rollen til kraften. Broforbindelsen:{" "}
            <InlineLatex latex="a_\perp = \omega^2 R = v^2/R" />, der <InlineLatex latex="\omega" />{" "}
            er vinkelhastigheten. Alt du lærer om sentripetalakselerasjon her, bruker du direkte i
            rotasjonskapitlene.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig feil: sentrifugalkraft i FBD</p>
          <p className="text-sm">
            Aldri tegn «sentrifugalkraft» ut fra sentrum i et FBD i et treghetssystem. Legg bare
            inn de fysiske kreftene (tyngde, normalkraft, snordrag, friksjon), sett nettokraften
            inn mot sentrum lik <InlineLatex latex="mv^2/R" />, og løs. Tegner du en ekstra pil
            ut fra sentrum, teller du den to ganger og får feil svar.
          </p>
        </div>

        {/* Sirkel-simulator inline */}
        <SirkelbevegelsSimulator />
      </TheorySummary>
    </div>
  );
}
