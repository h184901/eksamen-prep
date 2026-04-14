"use client";

import { useState } from "react";
import Link from "next/link";

function Card({ color = "blue", children }: { color?: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-cyan-400/60 bg-cyan-50 dark:bg-cyan-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
    purple: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
  };
  return <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>{children}</div>;
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function MustKnow({ items }: { items: string[] }) {
  return (
    <Card color="gold">
      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MÅ kunne</h3>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-amber-500 mt-0.5 shrink-0">★</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

type KerberosStep = {
  id: number;
  title: string;
  from: string;
  to: string;
  message: string;
  explanation: string;
};

const KERBEROS_STEPS: KerberosStep[] = [
  {
    id: 1,
    title: "AS-Request",
    from: "Alice",
    to: "Authentication Server (AS)",
    message: "Alice sender: bruker-ID + tjenesteforespørsel",
    explanation: "Alice ber om å autentisere seg. Sender sitt brukernavn i klartekst (ikke passord!). AS sjekker om brukernavn finnes i databasen.",
  },
  {
    id: 2,
    title: "AS-Response (TGT)",
    from: "Authentication Server (AS)",
    to: "Alice",
    message: "K_Alice(session_key_TGS) + TGT = {Alice, K_TGS(session_key_TGS, Alice, tid)}",
    explanation: "AS svarer med to deler: (1) Session-nøkkel kryptert med Alices passord-hash — kun Alice kan dekryptere. (2) Ticket Granting Ticket (TGT) kryptert med TGS sin nøkkel — ugjennomtrengelig for Alice. Alice dekrypterer del 1 med passordet sitt.",
  },
  {
    id: 3,
    title: "TGS-Request",
    from: "Alice",
    to: "Ticket Granting Server (TGS)",
    message: "TGT + Authenticator = K_session(Alice, tidsstempel)",
    explanation: "Alice vil ha tilgang til en spesifikk tjeneste (f.eks. filserver). Sender TGT + en Authenticator (tidsstempel kryptert med session-nøkkelen). TGS dekrypterer TGT og verifiserer at Authenticator matcher.",
  },
  {
    id: 4,
    title: "TGS-Response (Service Ticket)",
    from: "Ticket Granting Server (TGS)",
    to: "Alice",
    message: "K_session(service_session_key) + Service Ticket = K_service(Alice, service_session_key, tid)",
    explanation: "TGS utsteder en Service Ticket kryptert med tjenesteserverens nøkkel. Alice kan ikke lese innholdet, men sender det til tjenesten. Også ny service-sesjon-nøkkel kryptert med Alices session-nøkkel.",
  },
  {
    id: 5,
    title: "Service Request",
    from: "Alice",
    to: "Filserver / Tjeneste",
    message: "Service Ticket + Authenticator = K_service_session(Alice, tidsstempel)",
    explanation: "Alice presenterer Service Ticket + ny Authenticator til filserveren. Filserveren dekrypterer Service Ticket og verifiserer Authenticator. Ingen passord sendes til tjenesten!",
  },
  {
    id: 6,
    title: "Service Granted",
    from: "Filserver / Tjeneste",
    to: "Alice",
    message: "Tilgang innvilget (valgfritt: gjensidig autentisering)",
    explanation: "Tjenesten gir Alice tilgang. Valgfritt: serveren kan sende tilbake en respons kryptert med service_session_key for å bevise at den er den ekte serveren (gjensidig autentisering). Sesjonskommunikasjon krypteres med service_session_key.",
  },
];

function KerberosViz() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const colors = ["blue", "green", "blue", "green", "blue", "green"];
  const borderColors = ["border-blue-300", "border-green-300", "border-blue-300", "border-green-300", "border-blue-300", "border-green-300"];
  const bgColors = ["bg-blue-50 dark:bg-blue-950/20", "bg-green-50 dark:bg-green-950/20", "bg-blue-50 dark:bg-blue-950/20", "bg-green-50 dark:bg-green-950/20", "bg-blue-50 dark:bg-blue-950/20", "bg-green-50 dark:bg-green-950/20"];

  return (
    <div className="rounded-xl border-2 border-purple-400/60 bg-purple-50 dark:bg-purple-950/20 p-4">
      <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-3">Kerberos — billettsystem for autentisering</h4>

      {/* Aktører */}
      <div className="grid grid-cols-4 gap-2 mb-4 text-center text-xs">
        {[
          { name: "Alice", icon: "👩", sub: "Klient" },
          { name: "AS", icon: "🏛️", sub: "Auth Server" },
          { name: "TGS", icon: "🎫", sub: "Ticket Server" },
          { name: "Filserver", icon: "🖥️", sub: "Tjeneste" },
        ].map(({ name, icon, sub }) => (
          <div key={name} className="rounded-lg border border-purple-300 bg-white dark:bg-neutral-800 p-2">
            <p className="text-xl">{icon}</p>
            <p className="font-bold text-purple-700 dark:text-purple-400">{name}</p>
            <p className="text-[var(--muted)]">{sub}</p>
          </div>
        ))}
      </div>

      {/* Steg-liste */}
      <div className="space-y-1 mb-4">
        {KERBEROS_STEPS.map(step => (
          <button
            key={step.id}
            onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
            className={`w-full text-left rounded-lg border p-2 text-xs transition-colors ${activeStep === step.id ? `${borderColors[step.id - 1]} ${bgColors[step.id - 1]} font-bold` : "border-[var(--card-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800/50"}`}
          >
            <span className={`font-bold mr-2 ${colors[step.id - 1] === "blue" ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"}`}>
              Steg {step.id}:
            </span>
            <span className="font-bold">{step.title}</span>
            <span className="text-[var(--muted)] ml-2">{step.from} → {step.to}</span>
          </button>
        ))}
      </div>

      {/* Detaljpanel */}
      {activeStep !== null && (() => {
        const step = KERBEROS_STEPS.find(s => s.id === activeStep);
        if (!step) return null;
        const isClientToServer = step.id % 2 === 1;
        return (
          <div className={`rounded-xl border-2 ${borderColors[step.id - 1]} ${bgColors[step.id - 1]} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold">Steg {step.id}: {step.title}</span>
              <span className="text-xs text-[var(--muted)]">({step.from} → {step.to})</span>
            </div>
            <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-2 mb-3 break-all">
              {step.message}
            </div>
            <p className="text-sm">{step.explanation}</p>
          </div>
        );
      })()}

      <p className="text-xs text-[var(--muted)] mt-3">NB: AS og TGS er begge deler av Key Distribution Center (KDC). Passordet forlater aldri Alice sin maskin!</p>
    </div>
  );
}

export default function DS9Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">DS 9 Sikkerhet i distribuerte systemer</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">DS Kapittel 9</p>
        <h1 className="text-2xl font-bold mb-2">Sikkerhet i distribuerte systemer</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          DS-boken (Tanenbaum &amp; Van Steen) bygger videre på CN-konseptene og anvender dem på distribuerte systemer.
          Her møter vi sikre kanaler, tilgangskontroll med ACL og capabilities, og Kerberos —
          den viktigste autentiseringsprotokollen for distribuerte systemer.
        </p>
      </div>

      <Card color="purple">
        <h4 className="font-bold mb-2">Forbindelsen mellom CN og DS</h4>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="font-bold text-blue-600 dark:text-blue-400 mb-1">CN gir grunnlaget:</p>
            <ul className="list-disc list-inside space-y-0.5 text-[var(--muted)]">
              <li>Symmetrisk kryptering (AES)</li>
              <li>Asymmetrisk kryptering (RSA)</li>
              <li>Hash-funksjoner og MAC</li>
              <li>Digitale signaturer og sertifikater</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-purple-600 dark:text-purple-400 mb-1">DS anvender dem på:</p>
            <ul className="list-disc list-inside space-y-0.5 text-[var(--muted)]">
              <li>Sikre kanaler mellom prosesser</li>
              <li>Tilgangskontroll (ACL, capabilities)</li>
              <li>Nøkkelforvaltning (KDC, Kerberos)</li>
              <li>Distribuert autentisering</li>
            </ul>
          </div>
        </div>
      </Card>

      <MustKnow items={[
        "Sikker kanal gir autentisering + konfidensialitet + integritet — alle tre er nødvendige",
        "Tilgangskontrollmatrise: rader = subjekter, kolonner = objekter, celler = rettigheter",
        "ACL (Access Control List): lagre tilgangskontrollmatrisen per objekt (kolonnevis)",
        "Capability: lagre tilgangskontrollmatrisen per subjekt (radvise) — billett som beviser rettigheter",
        "Kerberos: sentralisert autentisering med billetter. KDC = AS + TGS. Ingen passord sendes over nettet",
        "KDC er single point of failure — Kerberos krever høy tilgjengelighet og tidssynkronisering",
      ]} />

      <Section title="1. Distribuert sikkerhet — nye utfordringer" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">
          I et distribuert system kommuniserer prosesser på tvers av maskiner og nettverk.
          Angrepsvektorer er annerledes enn i et sentralisert system:
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="red">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Distribuerte trusler</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Meldinger kan avlyttes mellom noder</li>
              <li>En kompromittert node kan sende falske meldinger til andre noder</li>
              <li>Ingen fysisk sikring mellom komponentene</li>
              <li>Identitet er vanskeligere å verifisere i et nett</li>
              <li>Replay-angrep mellom tjenester</li>
            </ul>
          </Card>
          <Card color="green">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">Sentralisert vs distribuert sikkerhet</h4>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-bold">Sentralisert:</p>
                <p className="text-[var(--muted)]">Én OS kontrollerer all tilgang. Enkelt å håndheve policy. Eksempel: Unix brukertillatelser.</p>
              </div>
              <div>
                <p className="font-bold">Distribuert:</p>
                <p className="text-[var(--muted)]">Ingen sentral autoritet. Krever protokoller for å etablere tillit mellom systemer. Eksempel: Kerberos, TLS.</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="2. Sikre kanaler">
        <p className="text-sm text-[var(--muted)] mb-3">
          En <strong>sikker kanal</strong> er en kommunikasjonskanal som garanterer tre egenskaper:
        </p>

        <div className="grid sm:grid-cols-3 gap-3">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">1. Autentisering</h4>
            <p className="text-sm">Begge parter kan bekrefte hverandres identitet. Ingen impersonation.</p>
            <p className="text-xs text-[var(--muted)] mt-1">Verktøy: Sertifikater, nonces, Kerberos</p>
          </Card>
          <Card color="green">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-1">2. Konfidensialitet</h4>
            <p className="text-sm">Meldingsinnhold er uleselig for tredjeparter.</p>
            <p className="text-xs text-[var(--muted)] mt-1">Verktøy: Symmetrisk kryptering (AES)</p>
          </Card>
          <Card color="purple">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-1">3. Integritet</h4>
            <p className="text-sm">Meldingen er ikke endret i transitt.</p>
            <p className="text-xs text-[var(--muted)] mt-1">Verktøy: MAC, digitale signaturer</p>
          </Card>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Etablering av sikker kanal i DS</h4>
          <p className="text-sm mb-2">Typisk prosess (minner om TLS):</p>
          <ol className="text-sm list-decimal list-inside space-y-1">
            <li>Autentiser begge parter (f.eks. med Kerberos-billetter eller sertifikater)</li>
            <li>Etabler en delt sesjonsnøkkel (DH eller via KDC)</li>
            <li>Bruk sesjonsnøkkelen til kryptering og MAC for all videre kommunikasjon</li>
          </ol>
        </Card>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">Sikker kanal med gjensidig autentisering:</h4>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold w-12">Alice</span>
              <span className="flex-1 text-center border-t border-blue-300 relative"><span className="bg-[var(--card)] px-1 text-[var(--muted)]">→ K_B+(session_key) →</span></span>
              <span className="text-green-600 dark:text-green-400 font-bold w-12">Bob</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold w-12">Alice</span>
              <span className="flex-1 text-center border-t border-green-300 relative"><span className="bg-[var(--card)] px-1 text-[var(--muted)]">← K_A+(bekreftelse) ←</span></span>
              <span className="text-green-600 dark:text-green-400 font-bold w-12">Bob</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold w-12">Alice</span>
              <span className="flex-1 text-center border-t border-amber-300 relative"><span className="bg-[var(--card)] px-1 text-[var(--muted)]">↔ AES(session_key, data) + MAC ↔</span></span>
              <span className="text-green-600 dark:text-green-400 font-bold w-12">Bob</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="3. Tilgangskontroll — Access Control Matrix">
        <p className="text-sm text-[var(--muted)] mb-3">
          Tilgangskontroll bestemmer hvem som har lov til å gjøre hva med hvilke ressurser.
          Den grunnleggende modellen er <strong>tilgangskontrollmatrisen</strong>:
        </p>

        {/* Tilgangskontrollmatrise */}
        <div className="overflow-x-auto">
          <table className="border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-[var(--card-border)] bg-purple-50 dark:bg-purple-950/30 px-3 py-2 text-left">Subjekt / Objekt</th>
                <th className="border border-[var(--card-border)] bg-purple-50 dark:bg-purple-950/30 px-3 py-2 text-center">Fil A</th>
                <th className="border border-[var(--card-border)] bg-purple-50 dark:bg-purple-950/30 px-3 py-2 text-center">Fil B</th>
                <th className="border border-[var(--card-border)] bg-purple-50 dark:bg-purple-950/30 px-3 py-2 text-center">Printer</th>
                <th className="border border-[var(--card-border)] bg-purple-50 dark:bg-purple-950/30 px-3 py-2 text-center">Database</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Alice", "read, write, own", "read", "print", "read, write"],
                ["Bob", "read", "read, write, own", "print", "read"],
                ["Carol", "–", "–", "–", "read, write, own"],
                ["Prosess P1", "read", "–", "print", "–"],
              ].map(([subj, ...rights]) => (
                <tr key={subj} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold">{subj}</td>
                  {rights.map((r, i) => (
                    <td key={i} className={`border border-[var(--card-border)] px-3 py-2 text-center text-xs font-mono ${r === "–" ? "text-[var(--muted)]" : "text-green-700 dark:text-green-400"}`}>{r}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-3">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">ACL — Access Control List</h4>
            <p className="text-sm mb-2">Lagre matrisen <strong>kolonnevis</strong> — per objekt. Hvert objekt har en liste over hvem som har tilgang:</p>
            <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-2 space-y-1">
              <p className="text-blue-600 dark:text-blue-400">Fil A:</p>
              <p className="pl-2">Alice: read, write, own</p>
              <p className="pl-2">Bob: read</p>
            </div>
            <div className="mt-2 text-xs text-[var(--muted)] space-y-1">
              <p><span className="text-green-600 dark:text-green-400">+</span> Enkelt å se hvem som har tilgang til et objekt</p>
              <p><span className="text-green-600 dark:text-green-400">+</span> Enkel å tilbakekalle tilgang</p>
              <p><span className="text-red-500">–</span> Vanskelig å se alle tilganger for én bruker</p>
              <p><span className="text-red-500">–</span> Stor overhead for mange brukere</p>
            </div>
            <p className="text-xs font-bold mt-2">Eksempel: Unix fil-tillatelser (-rwxr-xr--)</p>
          </Card>
          <Card color="purple">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Capabilities</h4>
            <p className="text-sm mb-2">Lagre matrisen <strong>radvise</strong> — per subjekt. Hvert subjekt har en "billett" (token) som beviser rettighetene:</p>
            <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-2 space-y-1">
              <p className="text-purple-600 dark:text-purple-400">Alice sine capabilities:</p>
              <p className="pl-2">cap(Fil_A, read|write|own)</p>
              <p className="pl-2">cap(Printer, print)</p>
            </div>
            <div className="mt-2 text-xs text-[var(--muted)] space-y-1">
              <p><span className="text-green-600 dark:text-green-400">+</span> Rask tilgangskontroll (presenter billett)</p>
              <p><span className="text-green-600 dark:text-green-400">+</span> Delegering er enkelt</p>
              <p><span className="text-red-500">–</span> Vanskelig å tilbakekalle (billett er allerede utstedt)</p>
              <p><span className="text-red-500">–</span> Capabilities kan kopieres/stjeles</p>
            </div>
            <p className="text-xs font-bold mt-2">Eksempel: Kerberos-billett, OAuth access tokens</p>
          </Card>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-purple-50 dark:bg-purple-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2">Egenskap</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-blue-600 dark:text-blue-400">ACL</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-purple-600 dark:text-purple-400">Capability</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Lagring", "Ved objektet", "Ved subjektet"],
                ["Se alle tilganger for objekt", "Enkelt", "Vanskelig"],
                ["Se alle tilganger for bruker", "Vanskelig", "Enkelt"],
                ["Tilbakekall tilgang", "Enkelt", "Vanskelig"],
                ["Delegering", "Vanskelig", "Enkelt"],
                ["Eksempler", "Unix, Windows NTFS, filsystem", "Kerberos, OAuth tokens, POSIX capabilities"],
              ].map(([prop, acl, cap]) => (
                <tr key={prop} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold">{prop}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2">{acl}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2">{cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Sikkerhetspolitikk — prinsipper">
        <p className="text-sm text-[var(--muted)] mb-3">En <strong>sikkerhetspolitikk</strong> definerer reglene for hva som er tillatt og ikke. Noen grunnleggende prinsipper:</p>

        <div className="space-y-3">
          <Card color="green">
            <h4 className="font-bold mb-1">Prinsippet om minste privileg (Least Privilege)</h4>
            <p className="text-sm">En prosess eller bruker skal kun ha de rettighetene som er nødvendige for å utføre sin oppgave — og ingenting mer. Reduserer skaden ved kompromittering.</p>
            <p className="text-xs text-[var(--muted)] mt-1">Eksempel: Webserveren kjører ikke som root — den trenger bare port 80/443.</p>
          </Card>
          <Card color="blue">
            <h4 className="font-bold mb-1">Separation of Duty (Separasjon av plikter)</h4>
            <p className="text-sm">Ingen enkeltperson skal ha nok makt til å misbruke systemet alene. Krever samarbeid for sensitive operasjoner.</p>
            <p className="text-xs text-[var(--muted)] mt-1">Eksempel: Banktransaksjoner over en terskel krever godkjenning fra to separate ansatte.</p>
          </Card>
          <Card color="purple">
            <h4 className="font-bold mb-1">Defence in Depth (Forsvar i dybden)</h4>
            <p className="text-sm">Ikke stol på ett enkelt sikkerhetsmekanisme. Bruk lag: brannmur + IDS + kryptering + autentisering + overvåking.</p>
            <p className="text-xs text-[var(--muted)] mt-1">Eksempel: Selv om en angriper passerer brannmuren, stopper IDS angrepet.</p>
          </Card>
          <Card color="gold">
            <h4 className="font-bold mb-1">Fail-safe defaults</h4>
            <p className="text-sm">Standardtilstanden er å nekte tilgang. Tillatelse gis eksplisitt, ikke ved unntak.</p>
            <p className="text-xs text-[var(--muted)] mt-1">Eksempel: Brannmur blokkerer alt som standard — bare åpne det du trenger.</p>
          </Card>
        </div>
      </Section>

      <Section title="5. Kerberos — distribuert autentisering">
        <p className="text-sm text-[var(--muted)] mb-3">
          Kerberos er en autentiseringsprotokoll designet for åpne, distribuerte systemer.
          Navn fra gresk mytologi: trebenet vaktbikkje i Hades (tre hoveder = AS, TGS, bruker).
          Utviklet ved MIT som del av Project Athena på 1980-tallet.
        </p>

        <Card color="gold">
          <h4 className="font-bold mb-2">Problemet Kerberos løser</h4>
          <p className="text-sm">I et distribuert system med 100 tjenester: skal hver tjeneste kjenne passordet til alle brukere? Nei! Kerberos sentraliserer autentisering i en <strong>Key Distribution Center (KDC)</strong>. Tjenestene stoler på KDC — ikke på brukernes passord direkte.</p>
        </Card>

        <div className="grid sm:grid-cols-3 gap-3">
          <Card color="purple">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-1">Authentication Server (AS)</h4>
            <p className="text-xs">Verifiserer brukerens identitet med passord-hash. Utsteder Ticket Granting Ticket (TGT).</p>
          </Card>
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Ticket Granting Server (TGS)</h4>
            <p className="text-xs">Bytter TGT mot Service Tickets for spesifikke tjenester. Bruker presenterer TGT — ikke passord.</p>
          </Card>
          <Card color="green">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-1">Service Ticket</h4>
            <p className="text-xs">Billett som beviser at KDC har autentisert brukeren. Presenteres til tjenester for tilgang.</p>
          </Card>
        </div>

        <KerberosViz />

        <Card color="gold">
          <h4 className="font-bold mb-2">Nøkkelbegreper i Kerberos</h4>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { term: "TGT", def: "Ticket Granting Ticket — 'billett for å få billetter'. Utstedt av AS. Kryptert med TGS sin nøkkel." },
              { term: "Service Ticket", def: "Tilgangsbevis for en spesifikk tjeneste. Kryptert med tjenesteserveren sin nøkkel." },
              { term: "Authenticator", def: "Tidsstempel kryptert med sesjonsnøkkel — beviser at du holder billetten, hindrer replay." },
              { term: "KDC", def: "Key Distribution Center = AS + TGS. Single point of trust i Kerberos." },
              { term: "Realm", def: "Administrativt domene (f.eks. HVL.NO). Kryssrealm-autentisering mulig." },
              { term: "Ticket lifetime", def: "Billetter har begrenset levetid (typisk 8 timer). Etter utløp må ny billett hentes." },
            ].map(({ term, def }) => (
              <div key={term} className="rounded bg-white dark:bg-neutral-800 border border-[var(--card-border)] p-2">
                <p className="font-bold font-mono text-amber-600 dark:text-amber-400 text-xs">{term}</p>
                <p className="text-xs text-[var(--muted)]">{def}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Kerberos svakheter</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Single point of failure:</strong> KDC nede = ingenting fungerer. Løsning: replikerte KDC-er.</li>
            <li><strong>Tidssynkronisering:</strong> Kerberos krever at alle klokker er synkroniserte (typisk ±5 min). Bruk NTP.</li>
            <li><strong>Passordbasert:</strong> Svake passord er sårbare for offline ordbokangrep på TGT.</li>
            <li><strong>KDC-kompromittering:</strong> Hvis KDC er hacket, er alle brukere kompromittert (alle nøkler lagres der).</li>
          </ul>
        </Card>
      </Section>

      <Section title="6. Kerberos vs TLS — sammenligning">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2">Egenskap</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-purple-600 dark:text-purple-400">Kerberos</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-blue-600 dark:text-blue-400">TLS</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Autentiseringsgrunnlag", "Passord (hemmelig nøkkel fra passord)", "Sertifikater (offentlig nøkkel)"],
                ["Tredjepartsmyndighet", "KDC (sentralisert)", "CA (hierarkisk)"],
                ["Klientautentisering", "Alltid begge veier", "Vanligvis bare server"],
                ["Skalering", "Innen en organisasjon (realm)", "Hele internett"],
                ["Enkel bruk", "Kompleks oppsett", "Mer transparent"],
                ["Single Point of Failure", "KDC er kritisk", "Distribuerbare CA-er"],
                ["Typisk bruk", "Windows AD, interne tjenester", "HTTPS, alle nettjenester"],
              ].map(([prop, kerb, tls]) => (
                <tr key={prop} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold">{prop}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2">{kerb}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2">{tls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="7. Sikkerhet i praksis — DS-perspektiv">
        <Card color="network">
          <h4 className="font-bold mb-2">Zero Trust Architecture</h4>
          <p className="text-sm">Tradisjonell sikkerhet: "Stol på alt innenfor perimeteren" (brannmur). Zero Trust: "Stol aldri, verifiser alltid". Hver forespørsel autentiseres og autoriseres uavhengig — selv fra interne noder. Aktuelt i mikrotjeneste-arkitekturer.</p>
        </Card>

        <Card color="blue">
          <h4 className="font-bold mb-2">OAuth 2.0 og JWT — moderne capabilities</h4>
          <p className="text-sm">OAuth 2.0 er det moderne capability-systemet for web. En Authorization Server utsteder access tokens (JWT — JSON Web Tokens) som klienter presenterer til ressursservere. Ligner mye på Kerberos-billetter, men bruker RSA-signaturer i stedet for symmetrisk kryptering.</p>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="green">
            <h4 className="font-bold mb-1">Mikrotjeneste-sikkerhet</h4>
            <p className="text-xs text-[var(--muted)]">Hver tjeneste autentiserer hverandre med mTLS (mutual TLS). Service mesh (Istio, Linkerd) håndterer sertifikater automatisk.</p>
          </Card>
          <Card color="purple">
            <h4 className="font-bold mb-1">End-to-End kryptering</h4>
            <p className="text-xs text-[var(--muted)]">Signal-protokollen gir E2E-kryptering der ikke engang tjenesteoperatøren kan lese meldinger. Bruker Double Ratchet-algoritmen.</p>
          </Card>
        </div>
      </Section>

      <Card color="red">
        <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamenstips — DS 9</h4>
        <ul className="text-sm space-y-1">
          <li>• Kerberos 6-stegs prosess: AS-Request → TGT → TGS-Request → Service Ticket → Service Request → Tilgang</li>
          <li>• KDC = AS + TGS. Passord forlater aldri klienten (bare brukes til å dekryptere TGT-svaret)</li>
          <li>• ACL vs Capability: ACL lagres ved objektet (enkelt å se tilganger), Capability ved subjektet (enkelt å delegere)</li>
          <li>• Sikker kanal = autentisering + konfidensialitet + integritet (alle tre!)</li>
          <li>• Kerberos krever tidssynkronisering — uten dette virker ikke Authenticator (replay-beskyttelse)</li>
          <li>• Least privilege, separation of duty og fail-safe defaults er fundamentale sikkerhetsprinsipper</li>
        </ul>
      </Card>

      <Card color="network">
        <h4 className="font-bold mb-2">Lenker til relatert innhold</h4>
        <div className="flex flex-wrap gap-2">
          <Link href="/dat110/eksamenoving/oppg-1" className="rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-3 py-1.5 transition-colors">
            Eksamensøving Oppgave 1 (flervalg)
          </Link>
          <Link href="/dat110/cn-8/formler" className="rounded-lg border border-cyan-400 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-xs px-3 py-1.5 transition-colors">
            CN-8 Formler
          </Link>
          <Link href="/dat110/cn-8/teori/8-3" className="rounded-lg border border-purple-400 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 text-xs px-3 py-1.5 transition-colors">
            RSA (8.3)
          </Link>
          <Link href="/dat110/cn-8/teori/8-5" className="rounded-lg border border-green-400 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 text-xs px-3 py-1.5 transition-colors">
            Digitale signaturer (8.5)
          </Link>
        </div>
      </Card>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-8/teori/8-9" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 8.9 Brannmur og IDS
        </Link>
        <Link href="/dat110/cn-8/teori" className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-sm font-medium transition-colors">
          Tilbake til alle delkapitler
        </Link>
      </div>
    </div>
  );
}
