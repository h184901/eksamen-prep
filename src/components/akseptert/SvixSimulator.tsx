"use client";

import { useCallback, useEffect, useState } from "react";

const INITIAL_PAYLOAD = JSON.stringify(
  {
    type: "email.received",
    data: {
      email_id: "em_abc123",
      from: "kunde@eksempel.no",
      to: ["snekker-as@leads.akseptert.no"],
      subject: "Totalrenovering av bad",
    },
  },
  null,
  2,
);

const INITIAL_SECRET = "whsec_supersemmelig123";
const INITIAL_TIMESTAMP = "1732800000"; // fast for konsistens
const MESSAGE_ID = "msg_01HZX3...";

async function hmacSha256Base64(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const keyBytes = enc.encode(secret);
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes as unknown as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data) as unknown as ArrayBuffer);
  const bytes = new Uint8Array(sig);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export default function SvixSimulator() {
  const [payload, setPayload] = useState(INITIAL_PAYLOAD);
  const [secret, setSecret] = useState(INITIAL_SECRET);
  const [showSecret, setShowSecret] = useState(false);

  // Signaturen Resend (server-siden) lager. Fryses ved submit.
  const [submitted, setSubmitted] = useState<{
    payload: string;
    timestamp: string;
    signature: string;
  } | null>(null);

  // Signaturen som beregnes live mens brukeren endrer ting.
  const [liveSignature, setLiveSignature] = useState<string>("…");

  // Verifikasjonsresultat.
  const [verifyResult, setVerifyResult] = useState<{
    recomputed: string;
    matches: boolean;
  } | null>(null);

  const computeSig = useCallback(
    async (p: string, ts: string, sec: string): Promise<string> => {
      const signedContent = `${MESSAGE_ID}.${ts}.${p}`;
      const sig = await hmacSha256Base64(sec, signedContent);
      return `v1,${sig}`;
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;
    computeSig(payload, INITIAL_TIMESTAMP, secret).then((sig) => {
      if (!cancelled) setLiveSignature(sig);
    });
    return () => {
      cancelled = true;
    };
  }, [payload, secret, computeSig]);

  async function simulateSend() {
    const sig = await computeSig(payload, INITIAL_TIMESTAMP, secret);
    setSubmitted({ payload, timestamp: INITIAL_TIMESTAMP, signature: sig });
    setVerifyResult(null);
  }

  async function tamperPayload() {
    if (!submitted) return;
    // Erstatt et ord for å simulere at en angriper endrer body-en
    const tampered = payload.replace(
      "Totalrenovering av bad",
      "GRATIS abonnement til meg",
    );
    setPayload(tampered);
  }

  async function runVerify() {
    if (!submitted) return;
    // Server-siden kjører HMAC på dagens payload (som kan være tuklet med),
    // og sammenligner mot signaturen submitted hadde med seg.
    const recomputed = await computeSig(payload, submitted.timestamp, secret);
    setVerifyResult({
      recomputed,
      matches: recomputed === submitted.signature,
    });
  }

  return (
    <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] overflow-hidden">
      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--card-border)]">
        {/* Klient-sted: Resend signerer */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300">
              SENDERSIDEN
            </span>
            <p className="text-xs font-semibold">Resend bygger en signert request</p>
          </div>

          <label className="block text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
            Delt hemmelighet (webhook secret)
          </label>
          <div className="flex gap-1 mb-3">
            <input
              type={showSecret ? "text" : "password"}
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="flex-1 text-[11px] font-mono px-2 py-1.5 rounded border border-[var(--card-border)] bg-[var(--background)]"
            />
            <button
              type="button"
              onClick={() => setShowSecret((v) => !v)}
              className="text-[11px] px-2 py-1.5 rounded border border-[var(--card-border)] hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {showSecret ? "skjul" : "vis"}
            </button>
          </div>

          <label className="block text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
            Payload (body-en som sendes)
          </label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            rows={10}
            className="w-full text-[11px] font-mono px-2 py-1.5 rounded border border-[var(--card-border)] bg-[var(--background)] mb-3"
          />

          <label className="block text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
            Live signatur (beregnes mens du skriver)
          </label>
          <code className="block bg-neutral-950 text-emerald-300 rounded-lg p-2 text-[11px] font-mono break-all">
            {liveSignature}
          </code>

          <button
            type="button"
            onClick={simulateSend}
            className="mt-3 w-full text-xs font-semibold px-3 py-2 rounded-lg bg-akseptert-500 hover:bg-akseptert-600 text-white"
          >
            → Send til /api/webhooks/resend-inbound
          </button>
        </div>

        {/* Server-siden: vår route.ts */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-akseptert-500/20 text-akseptert-700 dark:text-akseptert-300">
              MOTTAKERSIDEN
            </span>
            <p className="text-xs font-semibold">route.ts verifiserer</p>
          </div>

          {!submitted ? (
            <div className="rounded-lg border border-dashed border-[var(--card-border)] p-6 text-center text-xs text-[var(--muted)]">
              Ingen request ennå. Trykk «Send» på venstre side for å simulere
              at Resend leverer.
            </div>
          ) : (
            <>
              <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 mb-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
                  Headers vi mottok
                </p>
                <pre className="text-[11px] font-mono whitespace-pre-wrap">
                  <code>
                    svix-id: {MESSAGE_ID}
                    {"\n"}svix-timestamp: {submitted.timestamp}
                    {"\n"}svix-signature: {submitted.signature}
                  </code>
                </pre>
              </div>

              <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 mb-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] mb-1">
                  Body vi mottok
                </p>
                <pre className="text-[11px] font-mono whitespace-pre max-h-[140px] overflow-y-auto">
                  <code>{payload}</code>
                </pre>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  type="button"
                  onClick={tamperPayload}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                >
                  ☠ Tamper body
                </button>
                <button
                  type="button"
                  onClick={runVerify}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-akseptert-500 hover:bg-akseptert-600 text-white"
                >
                  ✓ Verifisér signatur
                </button>
              </div>

              {verifyResult && (
                <div
                  className={`rounded-lg border-2 p-3 ${
                    verifyResult.matches
                      ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30"
                      : "border-red-500 bg-red-50/70 dark:bg-red-950/30"
                  }`}
                >
                  <p
                    className={`text-sm font-bold mb-1 ${
                      verifyResult.matches
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {verifyResult.matches ? "✓ Gyldig — prosesserer" : "✗ AVVIST (401 Unauthorized)"}
                  </p>
                  <div className="text-[11px] font-mono space-y-1">
                    <div>
                      <span className="text-[var(--muted)]">Header sig: </span>
                      <span className="break-all">{submitted.signature}</span>
                    </div>
                    <div>
                      <span className="text-[var(--muted)]">Beregnet:  </span>
                      <span className="break-all">{verifyResult.recomputed}</span>
                    </div>
                  </div>
                  {!verifyResult.matches && (
                    <p className="text-xs text-red-700 dark:text-red-300 mt-2">
                      HMAC-signaturen er knyttet til body-innholdet. Endrer
                      noen ett eneste tegn etter signering, matcher ikke
                      signaturen lenger. Requesten blir avvist før vi
                      rører databasen.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
