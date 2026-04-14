"use client";

import Link from "next/link";
import { useState } from "react";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

// Interaktiv NAT-tabell simulator
function NATSimulator() {
  const initialEntries = [
    { privateIP: "10.0.0.1", privatePort: 3345, publicPort: 5001, destIP: "128.119.40.186", destPort: 80 },
    { privateIP: "10.0.0.1", privatePort: 3346, publicPort: 5002, destIP: "128.119.40.186", destPort: 80 },
    { privateIP: "10.0.0.2", privatePort: 4000, publicPort: 5003, destIP: "8.8.8.8", destPort: 53 },
    { privateIP: "10.0.0.3", privatePort: 8080, publicPort: 5004, destIP: "93.184.216.34", destPort: 443 },
  ];

  const [selected, setSelected] = useState<number | null>(null);
  const publicIP = "138.76.29.7";

  return (
    <div className="max-w-5xl space-y-4">
      <div className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] p-5">
        <h3 className="font-bold text-lg text-network-700 dark:text-network-300 mb-2">
          NAT-ruter: <span className="font-mono">{publicIP}</span> (én offentlig IP)
        </h3>
        <p className="text-sm text-[var(--muted)] mb-4">Klikk på en rad i NAT-oversettingstabellen for å se hva som skjer med pakken</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Innside */}
          <div>
            <p className="text-xs font-bold text-[var(--muted)] mb-2">PRIVAT SIDE (10.0.0.0/24)</p>
            <div className="space-y-2">
              {["10.0.0.1", "10.0.0.2", "10.0.0.3"].map(ip => (
                <div key={ip} className="flex items-center gap-2">
                  <div className="bg-green-100 dark:bg-green-900 border border-green-400 rounded-lg px-3 py-2 text-xs font-mono font-bold text-green-700 dark:text-green-300">
                    {ip}
                  </div>
                  <div className="text-[var(--muted)] text-xs">→</div>
                </div>
              ))}
            </div>
          </div>
          {/* Utside */}
          <div>
            <p className="text-xs font-bold text-[var(--muted)] mb-2">OFFENTLIG SIDE (Internett)</p>
            <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-400 rounded-xl px-4 py-3">
              <p className="text-sm font-bold text-blue-700 dark:text-blue-300 font-mono">{publicIP}</p>
              <p className="text-xs text-[var(--muted)]">Én offentlig IP-adresse</p>
              <p className="text-xs text-[var(--muted)]">Porter 5001–65535 tilgjengelig</p>
            </div>
          </div>
        </div>
      </div>

      {/* NAT-tabell */}
      <div className="overflow-x-auto">
        <p className="text-sm font-bold text-[var(--foreground)] mb-2">NAT-oversettingstabell:</p>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-network-100 dark:bg-network-900">
              <th className="border border-[var(--card-border)] p-2">Privat IP</th>
              <th className="border border-[var(--card-border)] p-2">Privat port</th>
              <th className="border border-[var(--card-border)] p-2 text-network-600 dark:text-network-300">→ Offentlig IP</th>
              <th className="border border-[var(--card-border)] p-2 text-network-600 dark:text-network-300">Offentlig port</th>
              <th className="border border-[var(--card-border)] p-2">Destinasjon</th>
            </tr>
          </thead>
          <tbody>
            {initialEntries.map((e, i) => (
              <tr
                key={i}
                onClick={() => setSelected(i === selected ? null : i)}
                className={`cursor-pointer hover:bg-network-50 dark:hover:bg-network-900 ${selected === i ? "bg-network-100 dark:bg-network-800" : ""}`}
              >
                <td className="border border-[var(--card-border)] p-2 font-mono">{e.privateIP}</td>
                <td className="border border-[var(--card-border)] p-2 text-center font-mono">{e.privatePort}</td>
                <td className="border border-[var(--card-border)] p-2 text-center font-mono text-network-600 dark:text-network-300 font-bold">{publicIP}</td>
                <td className="border border-[var(--card-border)] p-2 text-center font-mono text-network-600 dark:text-network-300 font-bold">{e.publicPort}</td>
                <td className="border border-[var(--card-border)] p-2 font-mono text-xs">{e.destIP}:{e.destPort}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected !== null && (
        <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-5 space-y-3">
          <h4 className="font-bold text-network-700 dark:text-network-300">Hva skjer med pakken (rad {selected + 1})?</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-bold text-green-600 dark:text-green-400">Utgående pakke (privat → Internett):</p>
              <p>Fra: <span className="font-mono">{initialEntries[selected].privateIP}:{initialEntries[selected].privatePort}</span></p>
              <p className="text-[var(--muted)]">NAT oversetter source-IP og source-port:</p>
              <p>Til: <span className="font-mono text-network-600 dark:text-network-300 font-bold">{publicIP}:{initialEntries[selected].publicPort}</span></p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-blue-600 dark:text-blue-400">Innkommende svar (Internett → privat):</p>
              <p>Svaret ankommer til: <span className="font-mono">{publicIP}:{initialEntries[selected].publicPort}</span></p>
              <p className="text-[var(--muted)]">NAT slår opp i tabell og oversetter:</p>
              <p>Leveres til: <span className="font-mono text-green-600 dark:text-green-400 font-bold">{initialEntries[selected].privateIP}:{initialEntries[selected].privatePort}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CN4_3Page() {
  const [showProblemer, setShowProblemer] = useState(false);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.3 NAT — Network Address Translation</span>
      </div>

      <h1 className="text-3xl font-bold">4.3 NAT — Network Address Translation</h1>
      <p className="text-[var(--muted)] max-w-3xl text-lg">
        NAT er teknologien som gjør at millioner av hjemmerutere kan dele én offentlig IP-adresse mellom alle enheter på nettverket. Uten NAT hadde IPv4-adresserommet kollapset for lenge siden.
      </p>

      {/* Motivasjon */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Hvorfor trengs NAT?</h2>
        <p className="text-[var(--foreground)] max-w-3xl">
          IPv4 har kun 2³² ≈ 4,3 milliarder adresser. Med milliardvis av Internett-tilkoblede enheter er det umulig å gi hver enhet en unik offentlig IP-adresse. NAT er løsningen: et helt hjemmenett (med hundrevis av enheter) kan dele <strong>én enkelt offentlig IP-adresse</strong>.
        </p>
        <div className="rounded-xl border border-amber-400 bg-amber-50 dark:bg-amber-950 p-4 max-w-3xl">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-1">Analogi: Firmaresepsjon</p>
          <p className="text-sm text-[var(--foreground)]">
            Tenk på et firma med 500 ansatte men bare ett eksternt telefonnummer. Resepsjonisten (NAT-ruteren) tar imot alle innkommende samtaler og sender dem videre internt. For omverdenen finnes bare ett nummer — resepsjonen holder oversikt over hvem som snakker med hvem.
          </p>
        </div>
      </section>

      {/* Slik fungerer NAT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Slik fungerer NAT</h2>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <div className="text-3xl font-bold text-network-600 dark:text-network-300 mb-2">1</div>
            <h3 className="font-bold mb-2">Utgående pakke</h3>
            <p className="text-sm text-[var(--muted)]">En intern vert sender en pakke. NAT-ruteren <strong>erstatter source-IP og source-port</strong> med sin offentlige IP og en ledig port. Oversettelsen lagres i NAT-tabellen.</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <div className="text-3xl font-bold text-network-600 dark:text-network-300 mb-2">2</div>
            <h3 className="font-bold mb-2">NAT-tabell</h3>
            <p className="text-sm text-[var(--muted)]">Ruteren holder en <strong>oversettingstabell</strong> med mapping: (privat IP, privat port) ↔ (offentlig IP, offentlig port). Typisk kan 65 535 portnummer brukes.</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <div className="text-3xl font-bold text-network-600 dark:text-network-300 mb-2">3</div>
            <h3 className="font-bold mb-2">Innkommende svar</h3>
            <p className="text-sm text-[var(--muted)]">Svarpakken ankommer til den offentlige porten. NAT slår opp i tabellen og <strong>oversetter destination-IP og destination-port</strong> til den private vertsadressen.</p>
          </div>
        </div>
      </section>

      {/* Interaktiv NAT-simulator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Interaktiv NAT-oversettingstabell</h2>
        <NATSimulator />
      </section>

      {/* Fordeler og ulemper */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Fordeler og ulemper med NAT</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          <div className="rounded-xl border-2 border-green-400 bg-green-50 dark:bg-green-950 p-5">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">Fordeler</h3>
            <ul className="text-sm space-y-2 text-[var(--foreground)]">
              <li><strong>Adressesparing:</strong> Mange enheter deler én offentlig IP — avgjørende for IPv4</li>
              <li><strong>Sikkerhet:</strong> Interne adresser er skjult for omverdenen. Uoppfordrede innkommende forbindelser blokkeres automatisk</li>
              <li><strong>Fleksibilitet:</strong> ISP kan endre offentlig IP uten å påvirke det interne nettverket</li>
              <li><strong>Enkelt å sette opp:</strong> Hjemmerutere gjør dette automatisk</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950 p-5">
            <h3 className="font-bold text-red-700 dark:text-red-300 mb-3">Ulemper</h3>
            <ul className="text-sm space-y-2 text-[var(--foreground)]">
              <li><strong>Bryter end-to-end-prinsippet:</strong> Rutere skal ikke endre på pakkens innhold (IP-adresser/porter)</li>
              <li><strong>NAT traversal-problem:</strong> Vanskelig å etablere forbindelser <em>inn</em> til et NAT-nettverk (peer-to-peer, spill, VoIP)</li>
              <li><strong>Portoverbelastning:</strong> Maks 65 535 samtidige forbindelser per offentlig IP</li>
              <li><strong>Skjuler protokollproblemer:</strong> Brukes som unnskyldning for å ikke migrere til IPv6</li>
            </ul>
          </div>
        </div>
      </section>

      {/* NAT traversal */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">NAT Traversal-problemet</h2>
        <p className="text-[var(--foreground)] max-w-3xl">
          Problemet oppstår når en ekstern klient ønsker å koble til en server som er bak NAT. NAT-ruteren har ingen inngang i oversettingstabellen for denne forbindelsen, og blokkerer pakken.
        </p>
        <button
          onClick={() => setShowProblemer(!showProblemer)}
          className="bg-network-600 hover:bg-network-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          {showProblemer ? "Skjul" : "Vis"} løsninger på NAT traversal
        </button>

        {showProblemer && (
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl">
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
              <h3 className="font-bold text-network-600 dark:text-network-300 mb-2">Statisk port-forwarding</h3>
              <p className="text-sm text-[var(--muted)]">Ruteren konfigureres manuelt til å alltid sende innkommende pakker på port X til en spesifikk intern vert. Vanlig for gaming-servere og hjemme-NAS.</p>
            </div>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
              <h3 className="font-bold text-network-600 dark:text-network-300 mb-2">UPnP / NAT-PMP</h3>
              <p className="text-sm text-[var(--muted)]">Protokoller der applikasjoner dynamisk kan be NAT-ruteren om å åpne porter. Brukes av mange applikasjoner og spill automatisk.</p>
            </div>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
              <h3 className="font-bold text-network-600 dark:text-network-300 mb-2">STUN / TURN (ICE)</h3>
              <p className="text-sm text-[var(--muted)]">Brukt i WebRTC, VoIP og spill. STUN-server hjelper klienter bak NAT å oppdage sin offentlige IP/port. TURN er relay-server som videresender trafikk når direkte forbindelse ikke fungerer.</p>
            </div>
          </div>
        )}
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-6 max-w-3xl">
        <h2 className="text-xl font-bold text-network-700 dark:text-network-300 mb-3">Hva du MÅ kunne til eksamen</h2>
        <ul className="space-y-2 text-sm text-[var(--foreground)]">
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare hva NAT er og hvorfor det trengs</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Beskrive hva som skjer med en pakke (utgående og innkommende) i NAT</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Lese/tolke en NAT-oversettingstabell</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Nevne de tre private adresseblokker (10/8, 172.16/12, 192.168/16)</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare NAT traversal-problemet og minst én løsning</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Kritisere NAT (bryter end-to-end-prinsippet)</li>
        </ul>
      </section>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-4/teori/4-2" className="hover:text-[var(--accent)] text-sm">
          ← 4.2 IPv4: datagram, adressering og CIDR
        </Link>
        <Link href="/dat110/cn-4/teori/4-5" className="hover:text-[var(--accent)] text-sm">
          4.5 Rutealgoritmer →
        </Link>
      </div>
    </div>
  );
}
