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

function QA({ q, a }: { q: string; a: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold mb-2">{q}</p>
      <button
        onClick={() => setShow((s) => !s)}
        className="text-xs text-blue-600 dark:text-blue-400 underline mb-2"
      >
        {show ? "Skjul svar" : "Vis svar"}
      </button>
      {show && (
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 p-3 text-sm text-[var(--muted)] leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Oppg7TidligerePage() {
  return (
    <div>
      <p className="text-sm text-[var(--muted)] mb-6">
        Oppgave 7 er alltid en kort teoridel med to delspørsmål. Svar med 2–3 presise setninger.
        Eksakt begrepsbruk fra boka belønnes.
      </p>

      {/* Januar 2025 */}
      <CollapsibleYear year="Januar 2025">
        <div className="mt-4 space-y-2">
          <QA
            q="a) Forklar forskjellen mellom en stateful og en stateless server."
            a="En stateful server husker tilstanden til hver klient mellom forespørsler — for eksempel holde styr på hvilke filer en klient har åpne. En stateless server husker ingenting mellom kall: hvert kall er fullstendig selvstendig og inneholder all nødvendig informasjon. Stateless servere er enklere å gjøre feiltolerante fordi det ikke finnes noen tilstand som må gjenopprettes etter en krasj."
          />
          <QA
            q="b) Forklar forskjellen mellom synkron og asynkron kommunikasjon i distribuerte systemer."
            a="Ved synkron kommunikasjon blokkerer avsender og venter til mottaker har mottatt og behandlet meldingen — sender og mottaker er synkroniserte i tid. Ved asynkron kommunikasjon fortsetter avsenderen umiddelbart etter å ha sendt meldingen, uten å vente på svar. Asynkron gir høyere ytelse og unngår blokkering, men krever at svaret håndteres via callbacks eller meldingskøer."
          />
        </div>
      </CollapsibleYear>

      {/* Mai 2024 */}
      <CollapsibleYear year="Mai 2024">
        <div className="mt-4 space-y-2">
          <QA
            q="a) Forklar to måter å implementere en RPC-server som håndterer mange klienter samtidig: multithreading og asynkrone (callback-baserte) servere."
            a="En multithreaded server bruker en dispatcher-tråd som mottar innkommende forespørsler og tildeler dem til worker-tråder fra et trådpøl. Dette gir høy parallellitet, men krever synkronisering for delte ressurser. En asynkron (callback-basert) server bruker én enkelt tråd med ikke-blokkerende I/O og event-loop: når en operasjon er ferdig, kalles en registrert callback-funksjon. Dette unngår overhead fra trådadministrasjon og er effektivt for I/O-intensive oppgaver."
          />
          <QA
            q="b) Hva menes med failure transparency i distribuerte systemer?"
            a="Failure transparency betyr at systemet skjuler feil og gjenopprettingsprosesser fra brukere og applikasjoner — de merker ikke at komponenter har feilet. Dette oppnås gjennom replikering, automatisk failover og re-sending av forespørsler. Failure transparency er den vanskeligste formen for transparens å oppnå fordi det er umulig å skille mellom en veldig treg komponent og en som har krasjet."
          />
        </div>
      </CollapsibleYear>

      {/* Januar 2024 */}
      <CollapsibleYear year="Januar 2024">
        <div className="mt-4 space-y-2">
          <QA
            q="a) Forklar hva multithreading i en server betyr og hvilke fordeler det gir."
            a="Multithreading i en server betyr at serveren oppretter (eller gjenbruker fra pool) en separat tråd for hver innkommende klientforespørsel. Fordelene er høy gjennomstrømning og responsivitet — én treg klient blokkerer ikke andre. Ulemper inkluderer overhead fra kontekstbytter og behovet for synkronisering (mutex/semaforer) for å beskytte delte datastrukturer mot race conditions."
          />
          <QA
            q="b) Hva er access transparency i distribuerte systemer?"
            a="Access transparency betyr at lokale og remote ressurser nås på nøyaktig samme måte fra programmererperspektiv — det er usynlig om en operasjon utføres lokalt eller på en fjern maskin. I RPC realiseres dette gjennom klient- og server-stubs som skjuler marshalling, nettverkskommunikasjon og unmarshalling. Programmereren kaller prosedyrer som om de er lokale."
          />
        </div>
      </CollapsibleYear>

      <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/20 p-4 mt-6">
        <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">Eksamenstips</p>
        <ul className="text-xs text-blue-900 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Bruk begreper fra pensum — ikke bare hverdagsord</li>
          <li>Alltid: 1) definer, 2) forklar konsekvens, 3) nevn fordel/ulempe</li>
          <li>Unngå bare å si «det er raskere» — forklar HVORFOR</li>
          <li>2–3 setninger er nok — ikke skriv et essay</li>
        </ul>
      </div>
    </div>
  );
}
