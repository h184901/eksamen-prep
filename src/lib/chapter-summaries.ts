// Korte konsept- og formel-sammendrag for hvert kapittel/emne.
// Sendes som kontekst til tutoren så den vet hva studenten ser på.
// Hold hver oppføring på ~1000-2000 tegn for å spare tokens.

export const ing164Summaries: Record<string, string> = {
  "2": `Kapittel 2 — Rettlinjet bevegelse (1D kinematikk).
Nøkkelbegrep: posisjon x, gjennomsnittsfart v_avg = Δx/Δt, momentan fart v = dx/dt, akselerasjon a = dv/dt = d²x/dt².
Konstant akselerasjon: v = v₀ + at, x = x₀ + v₀t + ½at², v² = v₀² + 2a(x-x₀).
Fritt fall: a = -g = -9,81 m/s² (y positiv oppover).
Grafisk: v(t) er dx/dt = stigningstallet; arealet under a(t) gir Δv; arealet under v(t) gir Δx.
Vanlige feil: forveksle gjennomsnittsfart med momentan; bruke konstant-a-formler på ikke-konstant a.`,

  "3": `Kapittel 3 — Bevegelse i 2D/3D.
Vektorer: r(t), v = dr/dt, a = dv/dt. Komponenter separeres (x og y uavhengige).
Prosjektilbevegelse: a_x = 0, a_y = -g. vx = v₀cosθ, vy = v₀sinθ - gt. Rekkevidde R = v₀²sin(2θ)/g ved likt start/slutt-nivå.
Sirkelbevegelse: uniform — a_rad = v²/r rettet mot sentrum. Ikke-uniform har også a_tan = dv/dt langs bane.
Relativ bevegelse: v_A/C = v_A/B + v_B/C.
Vanlige feil: bruke farten direkte i stedet for komponenter; glemme at g virker bare i y.`,

  "4": `Kapittel 4 — Newtons lover.
1. lov: Legeme i ro eller konstant fart om ΣF = 0 (treghetsprinsippet).
2. lov: ΣF = ma (vektorlikning — gjelder per komponent).
3. lov: F_AB = -F_BA (aksjon/reaksjon — virker på ULIKE objekter).
Masse m er treghetsmålet (skalar, invariant). Vekt w = mg er kraften fra gravitasjon.
Frilegmediagram (FBD): tegn ALLE krefter på ETT legeme. Dekomponerer langs praktiske akser.
Vanlige feil: kalle ma en kraft; inkludere F-reaksjon på FBD-et; glemme normalkraft; blande masse og vekt.`,

  "5": `Kapittel 5 — Anvendelse av Newtons lover.
Friksjon: statisk f_s ≤ μ_s N, kinetisk f_k = μ_k N (alltid motsatt bevegelsen). Typisk μ_s > μ_k.
Skråplan med vinkel θ: tyngdekomponenter mg sinθ (langs) og mg cosθ (normalt). N = mg cosθ ved glatt.
Sirkelbevegelse: netto radial kraft ΣF_r = mv²/r mot sentrum. Konisk pendel, svingdør i bil, banking-vinkel: tan θ = v²/(gr).
Drag: F_drag ∝ v (lav fart) eller ∝ v² (høy fart). Terminalfart når drag + oppdrift = tyngde.
Vanlige feil: anta f = μ_s N i stedet for ≤; glemme at f_s kan være null; blande radial/tangential.`,

  "6": `Kapittel 6 — Arbeid og kinetisk energi.
Arbeid: W = ∫F·dl. Konstant kraft, rett linje: W = Fd cosθ = F·d (dot-produkt).
Kinetisk energi: K = ½mv² (skalar, ≥0). Arbeid-energi-teoremet: W_net = ΔK = K_f - K_i.
Fjær: F = -kx (Hookes lov). Arbeid for å strekke fra 0 til x: W = ½kx².
Effekt: P = dW/dt = F·v. Gjennomsnittseffekt: P_avg = ΔW/Δt.
Variabel kraft: W = ∫F(x)dx langs banen. Grafisk: arealet under F(x) = arbeid.
Vanlige feil: glemme cosθ (komponenten langs bevegelsen); ta med potensiell energi (det er kap 7); blande W og P.`,

  "7": `Kapittel 7 — Potensiell energi og energibevaring.
Gravitasjons-PE (nær jorda): U_grav = mgy. Fjær-PE: U_fjær = ½kx².
Konservativ kraft: F = -dU/dx. Mekanisk energi: E = K + U bevart om kun konservative krefter virker.
Med friksjon/drag: ΔE = W_ikke-kons (gjerne negativ, blir varme).
Strategi: velg nullpunkt for U; skriv E_i = E_f + |W_friksjon|; løs.
Konservativ vs ikke-konservativ: konservativ ⇔ arbeid uavhengig av vei (closed-loop = 0).
Vanlige feil: doble opp (inkludere tyngde både som kraft og PE); glemme friksjonstap; feil nullpunkt.`,

  "8": `Kapittel 8 — Bevegelsesmengde, impuls, kollisjoner.
Bevegelsesmengde: p = mv (vektor). Impuls: J = ∫F dt = Δp.
Newton 2 reformulert: F_net = dp/dt.
Bevaring: Hvis ΣF_ext = 0 er p_total bevart (ALLTID i kollisjoner siden støtkrefter er indre).
Elastisk kollisjon: både p og K bevart. Uelastisk: bare p bevart. Perfekt uelastisk: objektene henger sammen etterpå.
1D elastisk: v_1' = ((m₁-m₂)v₁ + 2m₂v₂)/(m₁+m₂).
Massesentrum: r_cm = Σm_i r_i / M. Beveger seg med konstant fart om ΣF_ext = 0.
Vanlige feil: bruke energibevaring i uelastisk kollisjon; glemme at p er vektor (fortegn!).`,

  "9": `Kapittel 9 — Rotasjon av stive legemer.
Vinkelstørrelser: θ (rad), ω = dθ/dt, α = dω/dt. Lineær-rotasjon-kobling: v = rω, a_tan = rα, a_rad = rω².
Konstant α: ω = ω₀ + αt, θ = θ₀ + ω₀t + ½αt², ω² = ω₀² + 2α(θ-θ₀) (analog til 1D kinematikk).
Rotasjons-KE: K = ½Iω². Treghetsmoment I = Σm_i r_i² = ∫r² dm.
Standard I: stav om sentrum ML²/12, om ende ML²/3; sylinder om akse ½MR²; kule 2/5 MR².
Parallell-akse: I = I_cm + Md².
Vanlige feil: bruke grader i stedet for radianer; blande v og ω; feil I for geometrien.`,

  "10": `Kapittel 10 — Dynamikk i rotasjon.
Dreiemoment: τ = r × F, |τ| = rF sinθ = F·r_⊥. Newton 2 for rotasjon: Στ = Iα (om fast akse).
Arbeid i rotasjon: W = ∫τ dθ. Effekt: P = τω.
Spinn (angular momentum): L = Iω (stift legeme om fast akse), generelt L = r × p.
Bevaring: ΣΤ_ext = 0 ⇒ L bevart (skøyteløper-effekten).
Ren rulling uten slipp: v_cm = Rω, a_cm = Rα. Statisk friksjon ved kontaktpunkt (friksjon gjør ingen arbeid).
Vanlige feil: forveksle τ og F; gløm r × F = 0 når r parallell med F; bruke vanlig Newton 2 når akse akselererer.`,

  "21": `Kapittel 21 — Elektrisk ladning og felt.
Ladningskvantifisering: q = ne, e = 1,60×10⁻¹⁹ C. Ladning bevares.
Coulombs lov: F = kq₁q₂/r² med k = 8,99×10⁹ N·m²/C². Attraherer motsatte, frastøter like.
Elektrisk felt: E = F/q_test. Fra punktladning: E = kQ/r² r̂.
Superposisjon: E_total = Σ E_i (vektorielt). Kontinuerlig: E = ∫dE, dE = k dq / r² r̂.
Feltlinjer: fra + til -, aldri krysse, tetthet ∝ |E|.
Dipolmoment p = qd. I ytre felt: τ = p × E, U = -p·E.
Vanlige feil: glemme at E er vektor (komponenter!); signfeil; bruke k uten ε₀-omregning.`,

  "23": `Kapittel 23 — Elektrisk potensial.
Potensial: V = U/q. Fra punktladning: V = kQ/r (skalar, uendelig som referanse).
Potensiell energi: U = kq₁q₂/r.
Relasjon E–V: V_a - V_b = ∫_a^b E·dl. Omvendt: E = -∇V (E peker mot lavere V, vinkelrett på ekvipotensialflater).
Ekvipotensialflater: konstant V, alltid ⊥ E-linjer. Ingen arbeid å flytte ladning langs dem.
Ledere i elektrostatisk likevekt: hele lederen er ekvipotensial, E = 0 inni.
Vanlige feil: blande V (skalar) og E (vektor); bruke V = kQ/r for ikke-punktkilder.`,

  "24": `Kapittel 24 — Kapasitans og dielektrika.
Kapasitans: C = Q/V (Q per volt). Enhet: F (farad).
Parallellplatekondensator: C = ε₀A/d (vakuum).
Kombinasjoner: serie 1/C = 1/C₁ + 1/C₂ (motsatt av motstander); parallell C = C₁ + C₂.
Lagret energi: U = ½CV² = Q²/(2C) = ½QV. Energitetthet: u = ½ε₀E².
Dielektrikum: C → κC, E → E/κ inne i isolatoren. κ > 1.
Vanlige feil: bytte om serie/parallell (motsatt av motstander!); glemme at V er konstant med spenningskilde men Q kan endres.`,

  "27": `Kapittel 27 — Magnetisk felt og krefter.
Magnetkraft på ladning: F = qv × B. Alltid ⊥ v, gjør ikke arbeid.
I uniformt B: ladning går i sirkel med r = mv/(|q|B), ω = |q|B/m (syklotron).
Kraft på strømfører: F = IL × B. For buet leder: dF = I dl × B.
Dreiemoment på sløyfe: τ = m × B med magnetisk moment m = IA (retning fra høyrehåndsregel).
Hall-effekt: E⊥ bygges opp til qE = qvB balanse; polaritet avslører ladningens fortegn.
Vanlige feil: tenke at B gjør arbeid (nei — kun endring av retning); forveksle v × B med B × v; glemme |q| gir fart-størrelse.`,

  "28": `Kapittel 28 — Kilder til magnetfelt.
Biot-Savart: dB = (μ₀/4π) · (I dl × r̂)/r². μ₀ = 4π×10⁻⁷ T·m/A.
Rett, lang leder: B = μ₀I/(2πr).
Sirkulær sløyfe, sentrum: B = μ₀I/(2R). På akse, avstand x: B = μ₀IR²/(2(R²+x²)^{3/2}).
Solenoide (lang): B = μ₀nI inni, ≈0 utenfor. Toroid: B = μ₀NI/(2πr) innenfor kjernen.
Ampères lov: ∮B·dl = μ₀I_innslutt. Brukes ved symmetri (tråd, solenoide, koaks, plate).
Parallelle ledere: samme retning → attraktiv F/L = μ₀I₁I₂/(2πd).
Vanlige feil: blande retning av kryssprodukt; gløm at Ampère krever valg av smart løkke.`,

  "29": `Kapittel 29 — Elektromagnetisk induksjon.
Magnetisk fluks: Φ_B = ∫B·dA. For uniformt B vinkelrett på plan areal: Φ = BA.
Faradays lov: ε = -dΦ/dt. For N vindinger: ε = -N dΦ/dt. Lenz' lov = minus-tegnet (indusert strøm motsetter endringen).
Bevegelses-EMF: ε = BLv (stav lengde L beveger seg med v vinkelrett på B).
Selvinduktans: ε = -L dI/dt. For solenoide L = μ₀N²A/ℓ.
Energi i induktor: U = ½LI². Energitetthet i B-felt: u = B²/(2μ₀).
RL-krets: I(t) = (ε/R)(1 - e^(-t/τ)) ved påslag, τ = L/R.
Vanlige feil: glemme fortegn (Lenz); anta at konstant B i dreiende sløyfe gir null EMF (det gjør ikke — vinkelen endres).`,
};

export const dat109Summaries: Record<string, string> = {
  modellering: `Modellering (~40% av eksamen).
Brukstilfellemodell (use-case): aktører + ellipser for mål. IKKE et flytdiagram. Viser hvem som gjør hva.
Brukstilfellebeskrivelse: hoved-scenario (happy path) + alternativer. Nummerert handlinger.
Domenemodell: begrepsmodell av virkeligheten. Klasser/begreper, assosiasjoner med multiplisiteter (1, 0..1, 0..*). ALDRI metoder eller attributter med primitive datatyper — det er klassediagram.
Sekvensdiagram: tidslinje nedover, meldingspiler horisontalt, life-lines per objekt. Skal stemme overens med brukstilfelleflyten.
Vanlige feil: flytpiler i brukstilfelle (bruk inkluder/utvider); metoder i domenemodell; sekvens uten tilsvarende beskrivelse.`,

  "ooa-ood": `OOA og OOD (~20% av eksamen).
SOLID-prinsippene: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
GRASP-mønstrene (Larman): Information Expert, Creator, Controller, Low Coupling, High Cohesion, Polymorphism, Pure Fabrication, Indirection, Protected Variations.
Typisk eksamen: identifiser hvilket prinsipp/mønster som er brukt eller brutt i gitt kode/UML. Forklar konsekvensen.
Pass på: Information Expert vs Creator — hvem har informasjonen vs hvem lager objektet.
Controller er gjerne use-case-controller, ikke en MVC-controller.`,

  utviklingsmetode: `Utviklingsmetode (~20% av eksamen).
Smidig manifest: individer og samhandling, fungerende programvare, kundesamarbeid, respons på endring.
Scrum: sprintlengde 2-4 uker, roller (Product Owner, Scrum Master, Team), møter (sprint planning, daily, review, retro), artefakter (product backlog, sprint backlog, increment).
XP: parprogrammering, TDD, continuous integration, refaktorering, enkelt design, kollektiv kodeeie.
TDD: Red-Green-Refactor. Skriv test først (rød), få den grønn med minste kode, refaktorer.
CI/CD: automatisk bygg og test ved commit; CD = deploy til staging/prod automatisk.
AUP (Agile Unified Process): smidig versjon av UP med faser Inception-Elaboration-Construction-Transition.`,

  oop: `OOP — Java fra UML (~20% av eksamen).
Fra klassediagram til Java: klasse + felter + konstruktør + getters/settere. Arv: extends. Grensesnitt: implements.
Assosiasjon (1 til *): List<B> i A. Bidireksjonal: husk begge sider.
Aggregat (tom diamant): svak eierskap, deles ofte. Komposisjon (fylt diamant): sterk — del dør med helhet.
Fra sekvensdiagram: rekkefølge av metodekall matcher meldinger. Returverdier stemmer.
Grensesnitt vs abstrakt klasse: grensesnitt kun signaturer (pre-Java 8) eller default-metoder; abstrakt kan ha felter og implementert kode.
Vanlige feil: glemme this. i settere; bytte om extends/implements; ikke håndtere null i assosiasjoner.`,
};

export const dat110Summaries: Record<string, string> = {
  "cn-1": `DAT110 — Nettverksintroduksjon (CN 1).
OSI (7 lag) vs TCP/IP (4-5 lag). Protokollstakken: applikasjon, transport, nettverk, lenke, fysisk.
Forsinkelser: prosesserings (d_proc), kø (d_queue), transmisjon (d_trans = L/R), forplantning (d_prop = d/s). Total = sum over hopp.
Trafikkintensitet: La/R der L=pakkestørrelse, a=pakkerate, R=båndbredde. Intensitet → 1 ⇒ køen vokser ubundet.
Gjennomstrømning: min av lenke-rater på stien (flaskehals).
Pakkesvitsjing vs kretssvitsjing: pakkesv. deler lenke effektivt men har kø-forsinkelse.`,

  "cn-2": `DAT110 — Applikasjonslaget (CN 2).
HTTP: tilstandsløs, request-response. Metoder GET/POST/PUT/DELETE. Persistent vs ikke-persistent forbindelse. Cookies gir state.
DNS: hierarkisk (root → TLD → autoritativ). Rekursiv vs iterativ spørring. Caching på lokal resolver.
FTP: to forbindelser (kontroll + data). SMTP: push-protokoll mellom servere. POP3/IMAP: klient henter mail.
Socket-programmering: TCP (tilkoblingsorientert, stream) vs UDP (tilkoblingsløs, datagram).
P2P: distribuert, skalerer bedre enn klient-server for filnedlasting (BitTorrent).`,

  "cn-3": `DAT110 — Transportlaget (CN 3).
UDP: tilkoblingsløs, best-effort, liten header. Brukes til DNS, streaming, spill.
TCP: tilkoblingsorientert, pålitelig, flytkontroll, metningskontroll.
Pålitelig dataoverføring: ACK + sekvensnummer + timeout + retransmisjon. Go-Back-N vs Selective Repeat.
3-veis handshake: SYN → SYN-ACK → ACK. Lukking: FIN → ACK → FIN → ACK.
Flytkontroll: mottakervindu (rwnd). Metningskontroll: cwnd, slow-start, congestion avoidance, fast retransmit.
RTT-estimering: EWMA av sampleRTT; timeout = estimatedRTT + 4×devRTT.`,

  "cn-4": `DAT110 — Nettverkslaget (CN 4-5).
IP-adressering: IPv4 32-bit, CIDR (a.b.c.d/n). Subnet-maske skiller nett og vert.
Longest prefix match ved ruting. NAT: mange private IP-er bak én offentlig (oversettelse i gateway).
IP-datagram: header + payload. Fragmentering ved MTU.
Ruting: avstandsvektor (RIP, Bellman-Ford) — utveksle distanse-tabeller. Link-state (OSPF, Dijkstra) — utveksle hele topologien.
Intra-AS vs inter-AS: BGP mellom autonome systemer.
ICMP: diagnostiske meldinger (ping, traceroute).`,

  "cn-5": `DAT110 — Lenkelaget (CN 6).
Feildeteksjon: paritetsbit, CRC (polynomdivisjon).
Multiple access: TDMA/FDMA/CDMA (kanalisering), ALOHA (random access), CSMA/CD (Ethernet lytter før + avslutter ved kollisjon), CSMA/CA (WiFi unngår).
Ethernet: MAC-adresse 48-bit. Switch lærer MAC-adresser gjennom self-learning. Ingen kollisjoner på moderne switched Ethernet (full-duplex).
ARP: oversetter IP til MAC på lokalt nett. Broadcast "who has X?" → target svarer.
VLAN: logisk oppdeling av switch-porter uten fysisk segregering.`,

  "ds-1": `DAT110 — Distribuerte systemer (DS).
Definisjon: samling selvstendige datamaskiner som fremstår som ett system. Kommunikasjon via meldinger.
Transparens: tilgang, lokasjon, migrasjon, replikering, feil.
Feilhåndtering: partial failure er hovedutfordringen — noder kan feile uten at andre vet.
Klokker: Lamport (logisk klokke for "happens-before"), vektorklokker for kausalitet.
Mutual exclusion: sentralisert, distribuert (Ricart-Agrawala), token ring.
Konsensus: FLP-umulighet (ikke deterministisk konsensus i asynkront system med feil). Paxos, Raft.
CAP-teoremet: kan velge kun 2 av Consistency, Availability, Partition-tolerance. Partisjon tvinger valg mellom C og A.`,
};

export function getSummary(subject: string, chapterId: string | null): string | null {
  if (!chapterId) return null;
  if (subject === "ing164") return ing164Summaries[chapterId] ?? null;
  if (subject === "dat109") return dat109Summaries[chapterId] ?? null;
  if (subject === "dat110") return dat110Summaries[chapterId] ?? null;
  return null;
}
