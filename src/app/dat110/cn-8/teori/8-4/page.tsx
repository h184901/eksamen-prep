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

type APStep = {
  id: string;
  name: string;
  description: string;
  protocol: Array<{ from: string; to: string; msg: string; detail?: string }>;
  vulnerability?: string;
  fix?: string;
  color: string;
};

const AP_STEPS: APStep[] = [
  {
    id: "ap1",
    name: "ap1.0 — Send bare navn",
    description: "Alice sender bare 'Jeg er Alice' til Bob.",
    protocol: [
      { from: "Alice", to: "Bob", msg: "Jeg er Alice", detail: "" },
    ],
    vulnerability: "Hvem som helst kan sende 'Jeg er Alice' — inkludert Trudy. Ingen verifisering av identitet.",
    color: "red",
  },
  {
    id: "ap2",
    name: "ap2.0 — Send IP-adresse",
    description: "Alice sender sin IP-adresse som bevis på identitet.",
    protocol: [
      { from: "Alice", to: "Bob", msg: "Jeg er Alice", detail: "Fra IP: 192.168.1.5" },
    ],
    vulnerability: "IP-spoofing: Trudy kan enkelt forfalske avsender-IP-adressen. Fortsatt ingenting hindrer Trudy.",
    color: "red",
  },
  {
    id: "ap3",
    name: "ap3.0 — Hemmelig passord",
    description: "Alice sender et forhåndsavtalt hemmelig passord.",
    protocol: [
      { from: "Alice", to: "Bob", msg: "Jeg er Alice + passord 'abc123'", detail: "Passordet sendes i klartekst" },
    ],
    vulnerability: "Replay-angrep: Trudy avlytter passordet og bruker det selv. Selv kryptert passord er sårbart for replay.",
    color: "red",
  },
  {
    id: "ap3a",
    name: "ap3.1 — Kryptert passord (fortsatt sårbart)",
    description: "Alice sender kryptert passord med delt nøkkel.",
    protocol: [
      { from: "Alice", to: "Bob", msg: "K_AB(passord)", detail: "Kryptert passord" },
    ],
    vulnerability: "Fortsatt sårbar for replay! Trudy kan ta opp den krypterte meldingen og spille den av på nytt. Bob kan ikke skille mellom Alice og Trudy som replayer.",
    color: "red",
  },
  {
    id: "ap4",
    name: "ap4.0 — Nonce + symmetrisk nøkkel",
    description: "Bob sender en nonce R (tilfeldig tall). Alice krypterer den med delt nøkkel.",
    protocol: [
      { from: "Alice", to: "Bob", msg: "Jeg er Alice" },
      { from: "Bob", to: "Alice", msg: "Nonce: R", detail: "Tilfeldig tall, brukes kun én gang" },
      { from: "Alice", to: "Bob", msg: "K_AB(R)", detail: "Alice krypterer nonce med delt nøkkel" },
    ],
    vulnerability: "Krever forhåndsdelt nøkkel K_AB. Skalerer ikke til internett-skala.",
    fix: "Forsvar: Trudy kan ikke forfalske K_AB(R) uten nøkkelen. Replay-angrep blokkert fordi R er ny hver gang.",
    color: "green",
  },
  {
    id: "ap5",
    name: "ap5.0 — Nonce + offentlig nøkkel (RSA)",
    description: "Som ap4.0, men Alice signerer nonce med sin private RSA-nøkkel.",
    protocol: [
      { from: "Alice", to: "Bob", msg: "Jeg er Alice" },
      { from: "Bob", to: "Alice", msg: "Nonce: R" },
      { from: "Alice", to: "Bob", msg: "K_A⁻(R)", detail: "Alice signerer med privat nøkkel" },
    ],
    fix: "Bob verifiserer: K_A⁺(K_A⁻(R)) = R. Ingen forhåndsdelt nøkkel nødvendig! Men: Man-in-the-middle kan sette inn falsk offentlig nøkkel → trenger sertifikater (8.5).",
    color: "green",
  },
];

function AuthProtocol() {
  const [selected, setSelected] = useState(0);
  const ap = AP_STEPS[selected];

  return (
    <div className="rounded-xl border-2 border-blue-400/60 bg-blue-50 dark:bg-blue-950/20 p-4">
      <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-3">Autentiseringsprotokoller: ap1.0 → ap5.0</h4>

      {/* Protokollvelger */}
      <div className="flex flex-wrap gap-2 mb-4">
        {AP_STEPS.map((a, i) => (
          <button
            key={a.id}
            onClick={() => setSelected(i)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${selected === i ? "bg-blue-600 text-white" : "bg-white dark:bg-neutral-800 border border-[var(--card-border)] hover:bg-blue-100 dark:hover:bg-blue-900/30"}`}
          >
            {a.id.replace("ap", "ap").replace("3a", "3.1")}
          </button>
        ))}
      </div>

      {/* Protokollvisning */}
      <div>
        <h5 className="font-bold mb-1">{ap.name}</h5>
        <p className="text-sm text-[var(--muted)] mb-3">{ap.description}</p>

        {/* Sekvensdiagram */}
        <div className="rounded-lg border border-[var(--card-border)] bg-white dark:bg-neutral-800 p-3 mb-3">
          <div className="grid grid-cols-3 text-center mb-2">
            <div className="font-bold text-sm text-blue-600 dark:text-blue-400">Alice</div>
            <div className="text-xs text-[var(--muted)]"></div>
            <div className="font-bold text-sm text-green-600 dark:text-green-400">Bob</div>
          </div>
          {ap.protocol.map((step, i) => (
            <div key={i} className="flex items-center my-2">
              {step.from === "Alice" ? (
                <>
                  <div className="w-1/3 text-right">
                    <div className="inline-block border rounded px-2 py-1 text-xs border-blue-300 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 max-w-full">
                      <p className="font-bold">{step.msg}</p>
                      {step.detail && <p className="text-[var(--muted)] font-normal">{step.detail}</p>}
                    </div>
                  </div>
                  <div className="w-1/3 px-2">
                    <div className="w-full flex items-center">
                      <div className="flex-1 h-0.5 bg-blue-400"></div>
                      <div className="border-r-4 border-y-2 border-y-transparent border-r-blue-400"></div>
                    </div>
                  </div>
                  <div className="w-1/3"></div>
                </>
              ) : (
                <>
                  <div className="w-1/3"></div>
                  <div className="w-1/3 px-2">
                    <div className="w-full flex items-center">
                      <div className="border-l-4 border-y-2 border-y-transparent border-l-green-400"></div>
                      <div className="flex-1 h-0.5 bg-green-400"></div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="inline-block border rounded px-2 py-1 text-xs border-green-300 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 max-w-full">
                      <p className="font-bold">{step.msg}</p>
                      {step.detail && <p className="text-[var(--muted)] font-normal">{step.detail}</p>}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {ap.vulnerability && (
          <div className="rounded-lg border border-red-300 bg-red-50 dark:bg-red-950/20 p-3 mb-2">
            <p className="text-xs font-bold text-red-700 dark:text-red-400 uppercase mb-1">Sårbarhet</p>
            <p className="text-sm">{ap.vulnerability}</p>
          </div>
        )}
        {ap.fix && (
          <div className="rounded-lg border border-green-300 bg-green-50 dark:bg-green-950/20 p-3">
            <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase mb-1">Forsvar / Forbedring</p>
            <p className="text-sm">{ap.fix}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CN8_4Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">8.4 Autentisering</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 8.4</p>
        <h1 className="text-2xl font-bold mb-2">Autentisering</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Autentisering besvarer spørsmålet: "Er du virkelig den du sier du er?"
          Kurose/Ross presenterer en progressiv utvikling fra naive protokoller (ap1.0) til robuste
          nonce-baserte protokoller (ap4.0/ap5.0) som tåler replay-angrep og man-in-the-middle.
        </p>
      </div>

      <MustKnow items={[
        "ap1.0-ap3.0: Naive protokoller som er sårbare for replay-angrep og IP-spoofing",
        "Replay-angrep: Trudy tar opp meldingen og sender den på nytt — Bobs ser ikke forskjell",
        "Nonce: et tilfeldig tall brukt BARE ÉN GANG — hindrer replay ved å gjøre hvert 'utfordring' unikt",
        "ap4.0: Bob sender nonce R, Alice returnerer K_AB(R) — kryptert med delt nøkkel",
        "ap5.0: Bruker RSA signatur på nonce — ingen forhåndsdelt nøkkel nødvendig",
        "Man-in-the-Middle: selv god kryptografi hjelper ikke uten autentiserte nøkler (sertifikater)",
      ]} />

      <Section title="1. Autentisering vs Kryptering vs Integritet" defaultOpen={true}>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card color="purple">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-1">Autentisering</h4>
            <p className="text-sm">Bekreft <strong>identiteten</strong> til avsenderen. "Er dette virkelig Alice?"</p>
            <p className="text-xs text-[var(--muted)] mt-1">Verktøy: nonces, signaturer, passord</p>
          </Card>
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Kryptering</h4>
            <p className="text-sm">Gjør innholdet uleselig for Trudy. Gir <strong>konfidensialitet</strong>.</p>
            <p className="text-xs text-[var(--muted)] mt-1">Verktøy: AES, RSA</p>
          </Card>
          <Card color="green">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-1">Integritet</h4>
            <p className="text-sm">Sikrer at meldingen ikke er <strong>endret</strong> underveis.</p>
            <p className="text-xs text-[var(--muted)] mt-1">Verktøy: MAC, hash, signaturer</p>
          </Card>
        </div>
        <Card color="gold">
          <h4 className="font-bold mb-1">Vanlig misforståelse</h4>
          <p className="text-sm">Kryptering gir ikke autentisering! Trudy kan sende krypterte meldinger også. Autentisering er en <em>separat</em> egenskap som krever egne mekanismer.</p>
        </Card>
      </Section>

      <Section title="2. Progressive autentiseringsprotokoller — ap1.0 til ap5.0">
        <p className="text-sm text-[var(--muted)] mb-3">
          Kurose/Ross viser en gradvis utvikling der vi legger til mekanismer for å tette sårbarhetene i hver versjon.
          Velg en protokoll for å se meldingsutvekslingen og dens svakhet:
        </p>
        <AuthProtocol />
      </Section>

      <Section title="3. Replay-angrep — forstå trusselen i detalj">
        <p className="text-sm text-[var(--muted)] mb-3">Replay-angrep er den sentrale trusselen autentiseringsprotokoller beskytter mot.</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">Scenario: ap3.0 med passord</h4>
          <div className="space-y-2">
            {[
              { actor: "Alice", msg: "K_AB(passord) → Bob", color: "blue", time: "t=0", note: "Alice logger inn" },
              { actor: "Trudy", msg: "Avlytter og lagrer K_AB(passord)", color: "red", time: "t=0", note: "Trudy tar opptak" },
              { actor: "Trudy", msg: "K_AB(passord) → Bob", color: "red", time: "t=100", note: "Trudy replayer meldingen!" },
              { actor: "Bob", msg: "Godkjenner — tror det er Alice", color: "green", time: "t=100", note: "Bob kan ikke se forskjell" },
            ].map(({ actor, msg, color, time, note }) => (
              <div key={time + actor} className={`flex items-start gap-3 rounded-lg p-2 ${color === "red" ? "bg-red-50 dark:bg-red-950/20" : color === "blue" ? "bg-blue-50 dark:bg-blue-950/20" : "bg-green-50 dark:bg-green-950/20"}`}>
                <span className="font-mono text-xs text-[var(--muted)] w-10 shrink-0 mt-0.5">{time}</span>
                <span className={`font-bold text-sm w-14 shrink-0 ${color === "red" ? "text-red-600 dark:text-red-400" : color === "blue" ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"}`}>{actor}</span>
                <div>
                  <p className="text-sm font-mono">{msg}</p>
                  <p className="text-xs text-[var(--muted)]">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card color="green">
          <h4 className="font-bold mb-2">Nonce-løsningen forklart</h4>
          <p className="text-sm mb-2">Nonce = Number used ONCE. En <strong>tilfeldig utfordring</strong> som Bob genererer ny for hvert innloggingsforsøk:</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Bob sender R = random nonce til Alice</li>
            <li>Alice returnerer K_AB(R) — bevis på at hun kjenner K_AB</li>
            <li>Hvis Trudy replayer K_AB(R) fra forrige sesjon, vil Bob sende en <em>annen</em> nonce R'</li>
            <li>Trudy kan ikke produsere K_AB(R') uten nøkkelen</li>
          </ul>
        </Card>
      </Section>

      <Section title="4. Man-in-the-Middle (MitM) angrep">
        <p className="text-sm text-[var(--muted)] mb-3">Selv ap5.0 med RSA-signaturer er sårbar for MitM hvis offentlige nøkler ikke er autentiserte:</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
          <div className="min-w-[500px] space-y-2 text-xs">
            <div className="grid grid-cols-5 text-center font-bold">
              <span className="text-blue-600 dark:text-blue-400">Alice</span>
              <span></span>
              <span className="text-red-600 dark:text-red-400">Trudy (MitM)</span>
              <span></span>
              <span className="text-green-600 dark:text-green-400">Bob</span>
            </div>

            {[
              { from: 2, to: 4, msg: "K_Bob⁺ (Bobs offentlige nøkkel)" },
              { from: 2, to: 0, msg: "K_Trudy⁺ (Trudys nøkkel — men utgir seg for Bob!)" },
              { from: 0, to: 2, msg: "K_Trudy⁺(m) — kryptert med Trudys nøkkel" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className={`w-1/5 text-center font-bold ${step.from === 0 ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"}`}>{step.from === 0 ? "Alice" : "Trudy"}</span>
                <div className="flex-1 flex items-center gap-1">
                  <div className="flex-1 h-px bg-[var(--card-border)]"></div>
                  <span className="text-[var(--muted)] text-center px-1">{step.msg}</span>
                  <div className="flex-1 h-px bg-[var(--card-border)]"></div>
                </div>
                <span className={`w-1/5 text-center font-bold ${step.to === 4 ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`}>{step.to === 4 ? "Bob" : "Alice"}</span>
              </div>
            ))}
          </div>
        </div>

        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Problemet</h4>
          <p className="text-sm">Trudy avskjærer Bobs offentlige nøkkel og sender sin egen. Alice krypterer med Trudys nøkkel og tror det er Bobs. Trudy dekrypterer, leser, krypterer på nytt med Bobs ekte nøkkel og videresender.</p>
        </Card>

        <Card color="green">
          <h4 className="font-bold mb-2">Løsningen: Sertifikater og CA</h4>
          <p className="text-sm">En <strong>Certificate Authority (CA)</strong> signerer digitalt Bobs offentlige nøkkel og attesterer at "K⁺ tilhører Bob". Alice sjekker CAs signatur og vet at nøkkelen er ekte. Dekkes i 8.5.</p>
        </Card>
      </Section>

      <Section title="5. Sammendrag — autentiseringsprotokoller">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/30">
                <th className="border border-[var(--card-border)] px-2 py-2">Protokoll</th>
                <th className="border border-[var(--card-border)] px-2 py-2">Mekanisme</th>
                <th className="border border-[var(--card-border)] px-2 py-2">Sårbar for</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ap1.0", "Send bare navn", "Alt! Impersonation"],
                ["ap2.0", "IP-adresse", "IP-spoofing"],
                ["ap3.0", "Passord i klartekst", "Avlytting + replay"],
                ["ap3.1", "Kryptert passord", "Replay-angrep"],
                ["ap4.0", "Nonce + symmetrisk nøkkel", "Trenger forhåndsdelt nøkkel"],
                ["ap5.0", "Nonce + RSA-signatur", "MitM uten sertifikater"],
              ].map(([proto, mech, vuln]) => (
                <tr key={proto} className={`${proto.startsWith("ap4") || proto.startsWith("ap5") ? "bg-green-50 dark:bg-green-950/20" : "even:bg-neutral-50 dark:even:bg-neutral-900/30"}`}>
                  <td className="border border-[var(--card-border)] px-2 py-2 font-bold font-mono">{proto}</td>
                  <td className="border border-[var(--card-border)] px-2 py-2">{mech}</td>
                  <td className="border border-[var(--card-border)] px-2 py-2 text-red-600 dark:text-red-400">{vuln}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Card color="red">
        <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamenstips — 8.4</h4>
        <ul className="text-sm space-y-1">
          <li>• Nonce = Number used ONCE — kan ikke gjenbrukes til replay fordi Bob sender ny nonce hver gang</li>
          <li>• ap4.0 krever FORHÅNDSDELT nøkkel — skalerer ikke. ap5.0 bruker RSA — skalerer bedre</li>
          <li>• Skille mellom: autentisering (hvem er du?) vs autorisasjon (hva har du lov til?)</li>
          <li>• MitM løses IKKE av kryptering alene — trenger sertifikater som binder nøkkel til identitet</li>
        </ul>
      </Card>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-8/teori/8-3" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 8.3 Offentlig-nøkkel kryptering (RSA)
        </Link>
        <Link href="/dat110/cn-8/teori/8-5" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          8.5 Meldingsintegritet og signaturer →
        </Link>
      </div>
    </div>
  );
}
