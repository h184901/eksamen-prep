"use client";

import Link from "next/link";

const subChapters = [
  { id: "8.1", slug: "8-1", title: "Hva er nettverkssikkerhet?", desc: "Konfidensialitet, autentisering, meldingsintegritet og tilgjengelighet" },
  { id: "8.2", slug: "8-2", title: "Symmetrisk kryptering", desc: "Block ciphers (AES, DES), CBC-modus og nøkkelfordeling" },
  { id: "8.3", slug: "8-3", title: "Offentlig-nøkkel kryptering (RSA)", desc: "RSA-nøkkelgenerering, kryptering/dekryptering" },
  { id: "8.4", slug: "8-4", title: "Autentisering", desc: "Autentiseringsprotokoller, nonce, Kerberos-prinsippet" },
  { id: "8.5", slug: "8-5", title: "Meldingsintegritet og signaturer", desc: "Hash (SHA), MAC, digitale signaturer, sertifikater og CA" },
  { id: "8.6", slug: "8-6", title: "TLS/SSL-handshake", desc: "SSL/TLS-protokollen steg for steg, sertifikatvalidering" },
  { id: "8.9", slug: "8-9", title: "Brannmur og IDS", desc: "Pakkefiltrering, stateful inspection, IDS vs IPS" },
  { id: "DS 9", slug: "ds-9", title: "Sikkerhet i distribuerte systemer", desc: "DS 9.1–9.3: Sikre kanaler, tilgangskontroll og sikkerhetspolitikk" },
];

export default function CN8TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Sikkerhet</h2>
        <p className="text-[var(--muted)] text-sm">CN 8 + DS 9 — Kryptering, autentisering, TLS, signaturer og nettverkssikkerhet</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/cn-8/teori/${ch.slug}`}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-network-400/60 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-xs font-bold text-network-600 dark:text-network-400 mb-1">{ch.id}</p>
            <p className="font-semibold text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">{ch.title}</p>
            <p className="text-xs text-[var(--muted)]">{ch.desc}</p>
          </Link>
        ))}
      </div>

      <div className="text-sm text-[var(--muted)] flex items-center gap-2">
        <span>Se også:</span>
        <Link href="/dat110/cn-8/formler" className="text-network-600 dark:text-network-400 hover:underline">Formler</Link>
      </div>
    </div>
  );
}
