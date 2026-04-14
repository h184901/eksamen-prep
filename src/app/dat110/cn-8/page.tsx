"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "cn-8")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/cn-8/teori",
    title: "Teori",
    description:
      "Symmetrisk og asymmetrisk kryptering, RSA, meldingsintegritet og hash, digitale signaturer, sertifikater og CA, SSL/TLS handshake, brannmurer og nettverksangrep.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/dat110/cn-8/formler",
    title: "Formler",
    description:
      "RSA kryptering/dekryptering, hash-funksjoner og meldingsdigest, MAC-beregning, nøkkelutveksling og sertifikatstruktur (X.509).",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/cn-8/oppgaver",
    title: "Oppgaver",
    description:
      "Krypteringsoppgaver med RSA, beskriv SSL/TLS-handshake steg for steg, analyser angrepsscenariene og flervalgsoppgaver fra eksamen.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/cn-8/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv SSL/TLS handshake-animasjon, RSA-kryptering med steg-for-steg, og angrepskart som viser man-in-the-middle og replay-angrep.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "8.1 Hva er nettverkssikkerhet? — konfidensialitet, integritet, autentisering",
  "8.2 Kryptografiske prinsipper — symmetrisk (AES/DES) og asymmetrisk (RSA)",
  "8.2 RSA — nøkkelgenerering, kryptering og dekryptering",
  "8.3 Meldingsintegritet — hash-funksjoner (SHA, MD5) og MAC",
  "8.4 Digitale signaturer — signering med privat nøkkel, verifisering med offentlig nøkkel",
  "8.5 Nøkkelsertifikater og CA (Certificate Authority)",
  "8.6 SSL/TLS — handshake, sertifikatverifisering og sesjonsnøkler",
  "8.7 Nettverkssikkerhet i praksis — IPsec, VPN",
  "8.8 Brannmurer — pakkefilter, stateful inspection",
  "DS 9 — Sikkerhet i distribuerte systemer (oversikt)",
];

export default function CN8Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Sikkerhet handler om å beskytte kommunikasjon mot avlytting, endring og
        forfalskning. Her lærer du grunnprinsippene i kryptografi — fra{" "}
        <strong>symmetrisk</strong> til <strong>asymmetrisk kryptering</strong>{" "}
        med RSA — og hvordan <strong>SSL/TLS</strong> bygger en sikker kanal
        over et upålitelig nettverk.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {subPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`block rounded-xl border-2 ${page.color} bg-[var(--card)] p-5 hover:shadow-md transition-all hover:-translate-y-0.5`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{page.icon}</span>
              <h2 className="font-bold text-lg">{page.title}</h2>
            </div>
            <p className="text-sm text-[var(--muted)]">{page.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">Temaer i dette kapittelet</h2>
        <ul className="space-y-2">
          {temaer.map((tema) => (
            <li key={tema} className="flex items-start gap-2 text-sm">
              <span className="text-network-500 mt-0.5 shrink-0">▸</span>
              <span>{tema}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
          Eksamenstips for CN-8
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ RSA: krypter med mottakerens offentlige nøkkel, signér med din private nøkkel</li>
          <li>▸ Digitale signaturer = kryptering av hash med avsenders private nøkkel</li>
          <li>▸ CA-kjedens rolle: forklar hvordan tilliten etableres fra rot-CA til endesertifikat</li>
          <li>▸ SSL/TLS handshake — kjenn de fire fasene og hvilke nøkler som brukes når</li>
          <li>▸ Sikkerhet er hyppig flervalg i oppgave 1 — les definisjonene nøye</li>
        </ul>
      </div>
    </div>
  );
}
