"use client";

import { useState } from "react";

function CollapsibleYear({ year, children }: { year: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
      >
        <span className="font-bold">{year}</span>
        <span className="text-[var(--muted)] text-lg">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="px-5 pb-5 border-t border-[var(--card-border)]">{children}</div>}
    </div>
  );
}

function QA({ q, a }: { q: string; a: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold mb-2">{q}</p>
      <button
        onClick={() => setShow((s) => !s)}
        className="text-xs text-blue-600 dark:text-blue-400 underline mb-2"
      >
        {show ? "Skjul svar" : "Vis svar"}
      </button>
      {show && (
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 p-3 text-sm text-[var(--muted)] leading-relaxed space-y-2">
          {a}
        </div>
      )}
    </div>
  );
}

function VectorClockTable({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto mt-3">
      <table className="text-xs w-full min-w-[400px]">
        <thead>
          <tr className="text-[var(--muted)] border-b border-[var(--card-border)]">
            <th className="text-left pb-1 pr-4">Prosess</th>
            <th className="text-left pb-1 pr-4">Hendelse</th>
            <th className="text-left pb-1 pr-4">Regel</th>
            <th className="text-left pb-1">VC etter</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {rows.map(([p, h, r, vc], i) => (
            <tr key={i} className="border-b border-[var(--card-border)]/30">
              <td className="py-1 pr-4 text-blue-600 dark:text-blue-400">{p}</td>
              <td className="py-1 pr-4 font-sans text-[var(--muted)]">{h}</td>
              <td className="py-1 pr-4 font-sans text-xs text-[var(--muted)]">{r}</td>
              <td className="py-1 font-bold text-green-600 dark:text-green-400">{vc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Oppg9TidligerePage() {
  return (
    <div>
      <p className="text-sm text-[var(--muted)] mb-6">
        Oppgave 9 kombinerer alltid teori (feiltolerante grupper, RPC-feil, replikering)
        med en beregningsoppgave med vektorklokker. Lær reglene utenat — oppgaven er mekanisk.
      </p>

      {/* Januar 2025 */}
      <CollapsibleYear year="Januar 2025">
        <div className="mt-4 space-y-2">
          <QA
            q="a) Forklar to måter å organisere feiltolerante prosessgrupper på."
            a={
              <>
                <p>
                  <strong>Flat gruppe:</strong> Alle prosesser er likestilte — ingen har spesiell rolle.
                  Beslutninger tas ved konsensus (f.eks. majoritetsavstemning). Svikt hos én prosess
                  stopper ikke gruppen. Mer robust, men koordinering er kompleks fordi alle må
                  kommunisere med alle.
                </p>
                <p>
                  <strong>Hierarkisk gruppe:</strong> Én koordinator (primær) leder gruppen,
                  resten er sekundærer (arbeidere). Koordinatoren mottar forespørsler og delegerer.
                  Enklere koordinering, men koordinatoren er et single point of failure —
                  krasjer koordinatoren, må ny velges (ledervalg).
                </p>
              </>
            }
          />
          <QA
            q="b) En klient sender en RPC-forespørsel. Serveren mottar den, men krasjer før den sender svar. Hva ser klienten? Hvilke tiltak finnes?"
            a={
              <>
                <p>
                  Klienten venter til timeout og vet ikke om operasjonen ble utført (delvis, helt, eller
                  ikke i det hele tatt). Dette er <strong>klasse 3-feil</strong> (server krasjer etter mottak).
                </p>
                <p>
                  <strong>Tiltak:</strong> Bruk idempotente operasjoner slik at det er trygt å retransmittere.
                  For ikke-idempotente operasjoner: <em>at-most-once semantikk</em> — server lagrer
                  request-ID og unngår dobbel utførelse.
                </p>
              </>
            }
          />
          <QA
            q="c) Beregn vektorklokker for P1–P4. Hendelser: P1: a→lokal, sender m1 til P2; P2: b→lokal, mottar m1, c→lokal; P3: d→lokal; P4: e→lokal, mottar m2 fra P2 (P2 sender m2 etter c)."
            a={
              <VectorClockTable
                rows={[
                  ["P1", "a (lokal)", "VC[1]++", "[1,0,0,0]"],
                  ["P2", "b (lokal)", "VC[2]++", "[0,1,0,0]"],
                  ["P3", "d (lokal)", "VC[3]++", "[0,0,1,0]"],
                  ["P1", "send m1 til P2", "VC[1]++", "[2,0,0,0]"],
                  ["P2", "mottar m1 fra P1", "max([0,1,0,0],[2,0,0,0])+1 for P2", "[2,2,0,0]"],
                  ["P2", "c (lokal)", "VC[2]++", "[2,3,0,0]"],
                  ["P4", "e (lokal)", "VC[4]++", "[0,0,0,1]"],
                  ["P2", "send m2 til P4", "VC[2]++", "[2,4,0,0]"],
                  ["P4", "mottar m2 fra P2", "max([0,0,0,1],[2,4,0,0])+1 for P4", "[2,4,0,2]"],
                ]}
              />
            }
          />
        </div>
      </CollapsibleYear>

      {/* Mai 2024 */}
      <CollapsibleYear year="Mai 2024">
        <div className="mt-4 space-y-2">
          <QA
            q="a) Beskriv to design for asynkron RPC."
            a={
              <>
                <p>
                  <strong>ACK-kun (one-way):</strong> Server sender kun en bekreftelse (ACK) tilbake.
                  Klienten fortsetter umiddelbart uten å vente på resultatet. Brukes når resultatet
                  ikke er nødvendig (f.eks. logging).
                </p>
                <p>
                  <strong>Utsatt synkron:</strong> Server sender ACK umiddelbart. Klienten fortsetter.
                  Når resultatet er klart, sender serveren det tilbake til klienten via en separat
                  enveis-RPC (callback/interrupt).
                </p>
              </>
            }
          />
          <QA
            q="b) Nevn tre grunner til at systemer bruker replikering."
            a={
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Feiltoleranse:</strong> Replika tar over ved krasj — ingen datatap eller nedetid.</li>
                <li><strong>Ytelse:</strong> Data plasseres nær brukere — reduserer latens (CDN-prinsippet).</li>
                <li><strong>Tilgjengelighet:</strong> Systemet holder seg oppe selv om noen noder faller ut.</li>
              </ul>
            }
          />
          <QA
            q="c) Hva er flat vs. hierarkisk feiltolerante grupper? Fordeler/ulemper."
            a={
              <>
                <p>
                  <strong>Flat:</strong> Alle prosesser likestilte — krasj av én rammer ikke de andre.
                  Robust, men alle-til-alle kommunikasjon er kostbart og beslutninger er kompliserte.
                </p>
                <p>
                  <strong>Hierarkisk:</strong> Koordinator + arbeidere. Koordinatoren er single point
                  of failure, men koordinering er enkel og effektiv. Koordinatorkrasj krever ledervalg.
                </p>
              </>
            }
          />
          <QA
            q="d) Vektorklokker for P1–P3. P1: a→lokal, send m1 til P2; P2: mottar m1, b→lokal, send m2 til P3; P3: mottar m2, c→lokal."
            a={
              <VectorClockTable
                rows={[
                  ["P1", "a (lokal)", "VC[1]++", "[1,0,0]"],
                  ["P1", "send m1 til P2", "VC[1]++", "[2,0,0]"],
                  ["P2", "mottar m1 fra P1", "max([0,0,0],[2,0,0])+1 for P2", "[2,1,0]"],
                  ["P2", "b (lokal)", "VC[2]++", "[2,2,0]"],
                  ["P2", "send m2 til P3", "VC[2]++", "[2,3,0]"],
                  ["P3", "mottar m2 fra P2", "max([0,0,0],[2,3,0])+1 for P3", "[2,3,1]"],
                  ["P3", "c (lokal)", "VC[3]++", "[2,3,2]"],
                ]}
              />
            }
          />
        </div>
      </CollapsibleYear>

      {/* Januar 2024 */}
      <CollapsibleYear year="Januar 2024">
        <div className="mt-4 space-y-2">
          <QA
            q="a) Hva er multithreading i en server og hvorfor brukes det?"
            a={
              <>
                <p>
                  Multithreading betyr at serveren oppretter (eller gjenbruker fra et trådpøl) en ny
                  tråd for hver innkommende klientforespørsel. En dispatcher-tråd mottar forespørsler
                  og tildeler dem til worker-tråder.
                </p>
                <p>
                  Fordel: høy gjennomstrømning — én treg klient blokkerer ikke andre.
                  Ulempe: race conditions og behov for synkronisering (mutex) for delte ressurser.
                </p>
              </>
            }
          />
          <QA
            q="b) Hva er access transparency i distribuerte systemer?"
            a={
              <p>
                Access transparency betyr at tilgang til lokale og remote ressurser ser identisk ut
                for programmereren. I RPC realiseres dette gjennom stubs som skjuler marshalling,
                nettverkskommunikasjon og unmarshalling. Programmereren kaller prosedyrer med vanlig
                syntaks uten å tenke på om de kjøres lokalt eller på en fjern maskin.
              </p>
            }
          />
          <QA
            q="c) Vektorklokker for P1–P4. P1: a→lokal; P2: b→lokal; P1 sender m1 til P3; P3: mottar m1, c→lokal; P2 sender m2 til P4; P4: mottar m2."
            a={
              <VectorClockTable
                rows={[
                  ["P1", "a (lokal)", "VC[1]++", "[1,0,0,0]"],
                  ["P2", "b (lokal)", "VC[2]++", "[0,1,0,0]"],
                  ["P1", "send m1 til P3", "VC[1]++", "[2,0,0,0]"],
                  ["P3", "mottar m1 fra P1", "max([0,0,0,0],[2,0,0,0])+1 for P3", "[2,0,1,0]"],
                  ["P3", "c (lokal)", "VC[3]++", "[2,0,2,0]"],
                  ["P2", "send m2 til P4", "VC[2]++", "[0,2,0,0]"],
                  ["P4", "mottar m2 fra P2", "max([0,0,0,0],[0,2,0,0])+1 for P4", "[0,2,0,1]"],
                ]}
              />
            }
          />
        </div>
      </CollapsibleYear>

      <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/20 p-4 mt-2">
        <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">Eksamenstips</p>
        <ul className="text-xs text-blue-900 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Vektorklokker: start alle på [0,0,...,0]. Gå gjennom hendelsene i rekkefølge.</li>
          <li>Vis max-beregningen eksplisitt ved mottak — delpoeng gis.</li>
          <li>Teoridel: definer → konsekvens → fordel/ulempe (3 setninger).</li>
          <li>Flat vs. hierarkisk: husk «single point of failure» for hierarkisk.</li>
        </ul>
      </div>
    </div>
  );
}
