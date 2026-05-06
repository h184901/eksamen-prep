"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function SmidigGrunnlagPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.utviklingsmetode} pages={utviklingsmetodePages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/utviklingsmetode" className="hover:text-[var(--accent)]">Utviklingsmetode</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Smidig grunnlag</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Smidig grunnlag</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        Sammenligning av smidig og fossefall, og det agile manifestet med dets 4 verdier
        og 12 prinsipper. Grunnlaget for alle smidige metoder (Scrum, XP, Kanban, AUP).
      </p>

      {/* ============================================================ */}
      {/*  2. SMIDIG VS FOSSEFALL                                     */}
      {/* ============================================================ */}
      <section id="smidig-vs-fossefall" className="scroll-mt-32">
        <TheorySummary
          title="Smidig vs Fossefall (Vannfall)"
          mustKnow={[
            "Fossefall er sekvensielt — hver fase må fullføres før neste starter",
            "Smidig er iterativt — lever fungerende programvare i korte sykluser",
            "Smidige metoder håndterer endringer bedre enn fossefall",
            "Fossefall kan passe for prosjekter med faste, uforanderlige krav",
          ]}
        >
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Fossefallsmodellen (Waterfall)</p>
            <p className="text-sm mb-3">
              En <strong>lineær, sekvensiell</strong> prosess der man gjør alle krav ferdig,
              deretter all analyse, all design, all koding, all testing, og til slutt utrulling.
              Hver fase må fullføres helt før neste kan starte.
            </p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
              {["Krav", "Analyse", "Design", "Koding", "Testing", "Utrulling"].map((phase, i) => (
                <span key={phase} className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                    {phase}
                  </span>
                  {i < 5 && <span className="text-blue-400">→</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Smidig modell (Agile)</p>
            <p className="text-sm mb-3">
              En <strong>iterativ, inkrementell</strong> prosess der man leverer fungerende
              programvare i korte sykluser (1–4 uker). Kunden ser resultater tidlig og kan
              gi tilbakemeldinger som former neste iterasjon.
            </p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
              {["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4", "..."].map((phase, i) => (
                <span key={phase} className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">
                    {phase}
                  </span>
                  {i < 4 && <span className="text-green-400">→</span>}
                </span>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">
              Hver sprint inneholder planlegging, design, koding, testing og demo — alt i én kort syklus.
            </p>
          </div>

          <ComparisonTable
            headers={["Egenskap", "Fossefall", "Smidig"]}
            rows={[
              ["Prosess", "Sekvensiell, lineær", "Iterativ, inkrementell"],
              ["Krav", "Låst i starten", "Kan endres underveis"],
              ["Leveranse", "Alt på slutten", "Fungerende inkrement etter hver sprint"],
              ["Kundeinvolvering", "Kun i starten og slutten", "Kontinuerlig gjennom prosjektet"],
              ["Risiko", "Oppdages sent", "Oppdages tidlig (korte sykluser)"],
              ["Endringskostnad", "Høy — alt må gjøres om", "Lav — bare neste sprint påvirkes"],
              ["Testing", "Etter all koding er ferdig", "Kontinuerlig i hver sprint"],
              ["Dokumentasjon", "Tung, omfattende", "Lettere — fokus på fungerende kode"],
              ["Teamstruktur", "Spesialiserte roller i faser", "Tverrfunksjonelle, selvstyrte team"],
              ["Passer for", "Faste krav, regulerte miljøer", "Endringspregede prosjekter, innovasjon"],
            ]}
          />

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig eksamensfelle</p>
            <p className="text-sm">
              Smidige metoder sier <em>ikke</em> at dokumentasjon er verdiløst — de sier at
              <strong> fungerende programvare verdsettes høyere</strong> enn dokumentasjon.
              Alternativ som sier &ldquo;planlegging og design er de mest kritiske fasene&rdquo;
              er fossefalls-tenkning og <strong>IKKE</strong> et smidig prinsipp.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  3. DET AGILE MANIFESTET                                    */}
      {/* ============================================================ */}
      <section id="manifestet" className="scroll-mt-32">
        <TheorySummary
          title="Det agile manifestet (2001)"
          mustKnow={[
            "De 4 verdiene — ordrett (testet HVERT år på eksamen)",
            "'Fremfor' betyr ikke at høyre side er verdiløs — venstre side verdsettes høyere",
            "De 12 prinsippene — kjenn hovedessensen",
            "Vanlig felle: 'Strukturert planlegging foran tilpasset planlegging' er IKKE en agile-verdi",
          ]}
        >
          <p>
            I 2001 møttes 17 erfarne programvareutviklere og formulerte det agile manifestet.
            Det er grunnlaget for <em>alle</em> smidige metoder (Scrum, XP, Kanban, AUP, osv.).
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-5 rounded-lg">
            <p className="font-bold text-amber-700 dark:text-amber-400 mb-3 text-lg">De 4 verdiene</p>
            <div className="space-y-3">
              {[
                { left: "Personer og samspill", right: "prosesser og verktøy" },
                { left: "Programvare som virker", right: "omfattende dokumentasjon" },
                { left: "Samarbeid med kunden", right: "kontraktsforhandlinger" },
                { left: "Å reagere på endringer", right: "å følge en plan" },
              ].map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-green-600 dark:text-green-400 min-w-[180px]">{v.left}</span>
                  <span className="text-[var(--muted)] italic">fremfor</span>
                  <span className="text-[var(--muted)]">{v.right}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-3 italic">
              &ldquo;Selv om det er verdi i elementene til høyre, verdsetter vi elementene til venstre høyere.&rdquo;
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">De viktigste av de 12 prinsippene</p>
            <ul className="list-disc list-inside text-sm space-y-1.5">
              <li>Høyeste prioritet er å <strong>tilfredsstille kunden gjennom tidlige og kontinuerlige leveranser</strong></li>
              <li>Lever <strong>fungerende programvare hyppig</strong> — jo oftere, jo bedre</li>
              <li><strong>Fungerende programvare</strong> er det primære målet på fremdrift</li>
              <li>Ønsk <strong>endringer velkommen</strong>, selv sent i utviklingen</li>
              <li>Den mest effektive kommunikasjonen er <strong>ansikt til ansikt</strong></li>
              <li>De beste løsningene kommer fra <strong>selvstyrte team</strong></li>
              <li>Teamet skal <strong>reflektere med jevne mellomrom</strong> over hvordan det kan bli bedre</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Eksamensfeller</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>2023:</strong> &ldquo;Strukturert planlegging foran tilpasset planlegging&rdquo; er IKKE en agile-verdi — det er det stikk motsatte</li>
              <li><strong>2024:</strong> &ldquo;Planlegging og design er de mest kritiske fasene&rdquo; er IKKE et smidig prinsipp — det er fossefalls-tenkning</li>
            </ul>
          </div>
        </TheorySummary>
      </section>
    </div>
  );
}
