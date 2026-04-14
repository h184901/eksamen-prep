"use client";

import Link from "next/link";

const subChapters = [
  { id: "2.1", slug: "2-1", title: "Applikasjonsarkitektur", desc: "Klient-server vs P2P, prosesser og sockets, adressering (IP + port), transportlagstjenester" },
  { id: "2.2", slug: "2-2", title: "HTTP og webben", desc: "HTTP request/response, GET/POST, persistent vs non-persistent, cookies, web caching, HTTP/2" },
  { id: "2.4", slug: "2-4", title: "DNS — domenenavnsystemet", desc: "Hierarkisk navnerom, iterativ vs rekursiv oppslag, DNS-records (A, CNAME, MX, NS), caching" },
  { id: "2.7", slug: "2-7", title: "Socket-programmering", desc: "UDP vs TCP sockets, klient-server socket-programmering, socket API" },
];

export default function CN2TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Applikasjonslaget</h2>
        <p className="text-[var(--muted)] text-sm">CN 2.1–2.7 — HTTP, DNS, e-post, P2P og socket-programmering</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/cn-2/teori/${ch.slug}`}
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
        <Link href="/dat110/eksamenoving/oppg-4" className="text-network-600 dark:text-network-400 hover:underline">Oppg 4 — Protokoller</Link>
        <span>·</span>
        <Link href="/dat110/cn-2/formler" className="text-network-600 dark:text-network-400 hover:underline">Formler</Link>
      </div>
    </div>
  );
}
