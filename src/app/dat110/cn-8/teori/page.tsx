"use client";

import { useState } from "react";

const subChapters = [
  { id: "8.1", title: "Hva er nettverkssikkerhet?", desc: "Konfidensialitet, autentisering, meldingsintegritet og tilgjengelighet — de fire pilarene" },
  { id: "8.2", title: "Symmetrisk kryptering", desc: "Block ciphers (AES, DES), CBC-modus, noddelfordeling og sesjonsnokler" },
  { id: "8.3", title: "Offentlig-nokkel kryptering (RSA)", desc: "RSA-nokkelgenerering, kryptering/dekryptering, hvorfor faktorisering er vanskelig" },
  { id: "8.4", title: "Autentisering og nokkelfordeling", desc: "Autentiseringsprotokoller, nonce, Needham-Schroeder, Kerberos-prinsippet" },
  { id: "8.5", title: "Meldingsintegritet og digitale signaturer", desc: "Hash-funksjoner (SHA), MAC, digitale signaturer med RSA, sertifikater og CA" },
  { id: "8.6", title: "TLS/SSL-handshake", desc: "SSL/TLS-protokollen steg for steg, sertifikatvalidering, symmetrisk sesjonsnokkel" },
  { id: "8.9", title: "Brannmur og IDS", desc: "Pakkefiltrering, stateful inspection, application gateway, IDS vs IPS" },
  { id: "DS 9", title: "Sikkerhet i distribuerte systemer", desc: "DS 9.1–9.3: Sikre kanaler, tilgangskontroll, sikkerhetspolitikk i distribuerte systemer" },
];

export default function CN8TeoriPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Sikkerhet</h2>
        <p className="text-[var(--muted)] text-sm mb-6">CN 8 + DS 9 — Kryptering, autentisering, TLS, signaturer og nettverkssikkerhet</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {subChapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActive(active === ch.id ? null : ch.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              active === ch.id
                ? "bg-network-600 text-white border-network-600 shadow-sm"
                : "bg-[var(--card)] border-[var(--card-border)] hover:border-network-400 text-[var(--foreground)]"
            }`}
          >
            {ch.id}
          </button>
        ))}
      </div>

      {active === null ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {subChapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActive(ch.id)}
              className="text-left rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-network-400/60 transition-all hover:shadow-sm"
            >
              <p className="text-xs font-bold text-network-600 dark:text-network-400 mb-1">{ch.id}</p>
              <p className="font-semibold text-sm mb-1">{ch.title}</p>
              <p className="text-xs text-[var(--muted)]">{ch.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        subChapters.map((ch) =>
          active === ch.id ? (
            <div key={ch.id} className="rounded-xl border-2 border-network-400/40 bg-[var(--card)] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-network-600 dark:text-network-400">{ch.id}</p>
                  <h3 className="text-lg font-bold">{ch.title}</h3>
                </div>
                <button onClick={() => setActive(null)} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  Alle delkapitler
                </button>
              </div>
              <p className="text-sm text-[var(--muted)] mb-4">{ch.desc}</p>
              <div className="rounded-lg border-2 border-dashed border-[var(--card-border)] p-8 text-center">
                <p className="text-[var(--muted)] font-medium">Innhold kommer snart</p>
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
}
