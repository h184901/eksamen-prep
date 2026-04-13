export interface Chapter {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: "bevegelse" | "mekanikk" | "rotasjon" | "em";
  sectionCount?: number;
}

export const SECTIONS_PER_CHAPTER = 7;

export const chapters: Chapter[] = [
  {
    id: 2,
    slug: "kapittel-2",
    title: "Rettlinjet bevegelse",
    description: "Posisjon, hastighet, akselerasjon og bevegelse i én dimensjon",
    category: "bevegelse",
    sectionCount: 4,
  },
  {
    id: 3,
    slug: "kapittel-3",
    title: "Bevegelse i 2D og 3D",
    description: "Vektorer, prosjektilbevegelse og sirkelbevegelse",
    category: "bevegelse",
    sectionCount: 4,
  },
  {
    id: 4,
    slug: "kapittel-4",
    title: "Newtons lover",
    description: "Kraft, masse, tyngdekraft og Newtons tre lover",
    category: "mekanikk",
    sectionCount: 4,
  },
  {
    id: 5,
    slug: "kapittel-5",
    title: "Anvendelse av Newtons lover",
    description: "Friksjon, skråplan, sirkelbevegelse og drag",
    category: "mekanikk",
    sectionCount: 4,
  },
  {
    id: 6,
    slug: "kapittel-6",
    title: "Arbeid og kinetisk energi",
    description: "Arbeid, kinetisk energi og arbeid-energi-teoremet",
    category: "mekanikk",
    sectionCount: 4,
  },
  {
    id: 7,
    slug: "kapittel-7",
    title: "Potensiell energi og energibevaring",
    description: "Gravitasjonell og elastisk potensiell energi, konservative krefter",
    category: "mekanikk",
    sectionCount: 4,
  },
  {
    id: 8,
    slug: "kapittel-8",
    title: "Bevegelsesmengde og kollisjoner",
    description: "Impuls, bevegelsesmengde, elastiske og uelastiske kollisjoner",
    category: "mekanikk",
    sectionCount: 4,
  },
  {
    id: 9,
    slug: "kapittel-9",
    title: "Rotasjon av stive legemer",
    description: "Vinkelhastighet, vinkelakselerasjon og treghetsmoment",
    category: "rotasjon",
    sectionCount: 4,
  },
  {
    id: 10,
    slug: "kapittel-10",
    title: "Dynamikk i rotasjonsbevegelse",
    description: "Dreiemoment, spinn og rotasjonsenergi",
    category: "rotasjon",
    sectionCount: 4,
  },
  {
    id: 21,
    slug: "kapittel-21",
    title: "Elektrisk ladning og felt",
    description: "Coulombs lov, elektrisk felt og feltlinjer",
    category: "em",
    sectionCount: 4,
  },
  {
    id: 23,
    slug: "kapittel-23",
    title: "Elektrisk potensial",
    description: "Spenning, potensialenergi og ekvipotensialflater",
    category: "em",
    sectionCount: 4,
  },
  {
    id: 24,
    slug: "kapittel-24",
    title: "Kapasitans og dielektrika",
    description: "Kondensatorer, kapasitans og energilagring",
    category: "em",
    sectionCount: 4,
  },
  {
    id: 27,
    slug: "kapittel-27",
    title: "Magnetisk felt og krefter",
    description: "Magnetfelt, Lorentz-kraft og bevegelse i magnetfelt",
    category: "em",
    sectionCount: 4,
  },
  {
    id: 28,
    slug: "kapittel-28",
    title: "Kilder til magnetfelt",
    description: "Biot-Savarts lov, Ampères lov og solenoider",
    category: "em",
    sectionCount: 4,
  },
  {
    id: 29,
    slug: "kapittel-29",
    title: "Elektromagnetisk induksjon",
    description: "Faradays lov, Lenz' lov og induktans",
    category: "em",
    sectionCount: 4,
  },
];

export const categoryLabels: Record<Chapter["category"], string> = {
  bevegelse: "Bevegelse",
  mekanikk: "Mekanikk",
  rotasjon: "Rotasjon",
  em: "Elektrisitet & Magnetisme",
};

export const categoryColors: Record<Chapter["category"], string> = {
  bevegelse: "physics",
  mekanikk: "physics",
  rotasjon: "physics",
  em: "network",
};

export const categoryDescriptions: Record<Chapter["category"], string> = {
  bevegelse:
    "Kinematikk i én og flere dimensjoner — posisjon, hastighet, akselerasjon, prosjektilbevegelse og sirkelbevegelse.",
  mekanikk:
    "Newtons lover, friksjon, arbeid, energi, bevegelsesmengde og kollisjoner — kreftene som styrer bevegelse.",
  rotasjon:
    "Rotasjonskinematikk og -dynamikk — vinkelhastighet, treghetsmoment, dreiemoment og spinn.",
  em: "Elektriske felt og potensial, kapasitans, magnetisme, Faradays lov og elektromagnetisk induksjon.",
};
