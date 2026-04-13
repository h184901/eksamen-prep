"use client";

import Link from "next/link";

export default function KommunikasjonPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Kommunikasjon i DS</span>
      </div>

      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400 mb-2 inline-block">
          Oppg 7–8 (~15%)
        </span>
        <h1 className="text-3xl font-bold mb-2">Kommunikasjon i distribuerte systemer</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          RPC, MQTT, publish-subscribe, applikasjonslags-multicast, overlay-nettverk,
          RDP-beregning, prosesser og tråder.
        </p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her kommer teori om RPC (synkron/asynkron/deferred), MQTT og QoS-nivåer,
          overlay-nettverk med RDP-beregning, ALM multicast, gossip-protokoller,
          prosesser/tråder, server-design og distribusjonstransparens.
        </p>
      </div>
    </div>
  );
}
