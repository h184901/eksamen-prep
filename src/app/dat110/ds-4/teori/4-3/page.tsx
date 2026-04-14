"use client";
import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

type QosLevel = 0 | 1 | 2;

const qosData = {
  0: {
    name: "At-most-once",
    tagline: "Fire and Forget",
    color: "amber",
    desc: "Meldingen leveres 0 eller 1 gang. Ingen ACK, ingen re-sending. Brukes der noen tapte meldinger er OK.",
    flow: [
      { from: "Sender", to: "Broker", msg: "PUBLISH (QoS 0)" },
      { from: "Broker", to: "Mottaker", msg: "PUBLISH (QoS 0)" },
    ],
    useCase: "Sensoravlesninger der det er OK å miste noen datapunkter (temperatur hvert sekund)",
    overhead: "Ingen",
    guarantee: "Ingen — kan tapes",
  },
  1: {
    name: "At-least-once",
    tagline: "Bekreft mottak",
    color: "blue",
    desc: "Meldingen leveres minst 1 gang. Sender holder meldingen til den får PUBACK. Kan gi duplikater.",
    flow: [
      { from: "Sender", to: "Broker", msg: "PUBLISH (QoS 1)" },
      { from: "Broker", to: "Sender", msg: "PUBACK" },
      { from: "Broker", to: "Mottaker", msg: "PUBLISH (QoS 1)" },
      { from: "Mottaker", to: "Broker", msg: "PUBACK" },
    ],
    useCase: "Kommandoer til en IoT-enhet — viktig at kommandoen mottas, duplikat er OK å håndtere",
    overhead: "1 ACK (PUBACK) per melding",
    guarantee: "Minst 1 levering — mulig duplikat",
  },
  2: {
    name: "Exactly-once",
    tagline: "4-veis handshake",
    color: "green",
    desc: "Meldingen leveres nøyaktig 1 gang. 4-veis handshake: PUBLISH → PUBREC → PUBREL → PUBCOMP. Høy overhead men garantert.",
    flow: [
      { from: "Sender", to: "Broker", msg: "PUBLISH (QoS 2)" },
      { from: "Broker", to: "Sender", msg: "PUBREC (mottatt)" },
      { from: "Sender", to: "Broker", msg: "PUBREL (gi slipp)" },
      { from: "Broker", to: "Sender", msg: "PUBCOMP (fullført)" },
      { from: "Broker", to: "Mottaker", msg: "PUBLISH (QoS 2)" },
      { from: "Mottaker", to: "Broker", msg: "PUBREC + PUBREL + PUBCOMP" },
    ],
    useCase: "Finanstransaksjoner, kritiske kontrollkommandoer der duplikat er uakseptabelt",
    overhead: "4 meldinger per publish",
    guarantee: "Nøyaktig 1 levering — ingen tap, ingen duplikat",
  },
};

export default function DS4_3Page() {
  const [activeQos, setActiveQos] = useState<QosLevel>(0);
  const [showRetain, setShowRetain] = useState(false);
  const [showLwt, setShowLwt] = useState(false);
  const [showWildcard, setShowWildcard] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showSubTypes, setShowSubTypes] = useState(false);

  const qos = qosData[activeQos];
  const qosColorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
    amber: {
      border: "border-amber-300 dark:border-amber-700",
      bg: "bg-amber-50 dark:bg-amber-950/20",
      text: "text-amber-700 dark:text-amber-400",
      badge: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300",
    },
    blue: {
      border: "border-blue-300 dark:border-blue-700",
      bg: "bg-blue-50 dark:bg-blue-950/20",
      text: "text-blue-700 dark:text-blue-400",
      badge: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    },
    green: {
      border: "border-green-300 dark:border-green-700",
      bg: "bg-green-50 dark:bg-green-950/20",
      text: "text-green-700 dark:text-green-400",
      badge: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    },
  };
  const qosColors = qosColorMap[qos.color];

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.3 MQTT og meldingsorientert kommunikasjon</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold">4.3 MQTT og meldingsorientert kommunikasjon</h1>
        <p className="text-[var(--muted)] max-w-2xl mt-2">
          MQTT (MQ Telemetry Transport) er en lettvekts publish-subscribe-protokoll for IoT og M2M.
          Kjører over TCP, designet for ressursbegrensede enheter og ustabile nettverk.
        </p>
      </div>

      {/* 1. MOM-MODELLEN */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">1. MOM — Message-Oriented Middleware</h2>

        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
          <p className="text-sm text-[var(--muted)]">
            MOM er persistent, asynkron kommunikasjon via meldingskøer.
            Sender og mottaker er løst koblet i tid — de trenger ikke kjøre samtidig.
            Mellomliggende kø-system (broker/middleware) lagrer meldinger til mottakeren er klar.
          </p>

          {/* MOM-diagram */}
          <div className="overflow-x-auto">
            <svg viewBox="0 0 580 130" className="w-full max-w-xl mx-auto">
              {/* Produsent */}
              <rect x="10" y="45" width="100" height="40" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
              <text x="60" y="68" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">Produsent</text>
              <text x="60" y="80" textAnchor="middle" fontSize="8" fill="#3b82f6">(Publisher)</text>

              {/* Pil til kø */}
              <path d="M110 65 L190 65" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arr-mom)"/>
              <text x="150" y="58" textAnchor="middle" fontSize="8" fill="#6b7280">put()</text>

              {/* Kø */}
              <rect x="190" y="30" width="200" height="70" rx="6" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5"/>
              <text x="290" y="55" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">Meldingskø</text>
              <text x="290" y="68" textAnchor="middle" fontSize="8" fill="#6b7280">Middleware / Broker</text>
              {/* Meldinger i kø */}
              <rect x="205" y="75" width="30" height="18" rx="2" fill="#fbbf24"/>
              <rect x="242" y="75" width="30" height="18" rx="2" fill="#fbbf24"/>
              <rect x="279" y="75" width="30" height="18" rx="2" fill="#fbbf24"/>
              <text x="220" y="87" textAnchor="middle" fontSize="7" fill="#92400e">msg</text>
              <text x="257" y="87" textAnchor="middle" fontSize="7" fill="#92400e">msg</text>
              <text x="294" y="87" textAnchor="middle" fontSize="7" fill="#92400e">msg</text>

              {/* Pil til konsument */}
              <path d="M390 65 L470 65" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arr-mom-g)"/>
              <text x="430" y="58" textAnchor="middle" fontSize="8" fill="#6b7280">get()</text>

              {/* Konsument */}
              <rect x="470" y="45" width="100" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
              <text x="520" y="68" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="bold">Konsument</text>
              <text x="520" y="80" textAnchor="middle" fontSize="8" fill="#16a34a">(Subscriber)</text>

              {/* Labels under */}
              <text x="290" y="115" textAnchor="middle" fontSize="8" fill="#6b7280">Persistent lagring — meldinger venter til konsument er klar</text>

              <defs>
                <marker id="arr-mom" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6"/>
                </marker>
                <marker id="arr-mom-g" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a"/>
                </marker>
              </defs>
            </svg>
          </div>

          <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
            MOM gir <strong>persistent + asynkron</strong> kommunikasjon. Produsenten kan legge meldinger i køen selv om konsumenten er nede.
            Konsumenten henter dem når den kommer online igjen.
          </div>
        </div>
      </section>

      {/* 2. MQTT-MODELLEN */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">2. MQTT-modellen</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
            <div className="font-semibold text-blue-600 dark:text-blue-400">Komponenter</div>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <div className="flex gap-2">
                <span className="shrink-0 font-medium text-blue-600 dark:text-blue-400">Client:</span>
                <span>Enhver enhet som kobler til en broker. Kan publisere (publisher), abonnere (subscriber), eller begge deler.</span>
              </div>
              <div className="flex gap-2">
                <span className="shrink-0 font-medium text-blue-600 dark:text-blue-400">Broker (Server):</span>
                <span>Sentral node som mottar alle meldinger, filtrerer basert på topics, og videresender til abonnenter. F.eks. Mosquitto, HiveMQ.</span>
              </div>
              <div className="flex gap-2">
                <span className="shrink-0 font-medium text-blue-600 dark:text-blue-400">Topic:</span>
                <span>Hierarkisk meldingskø identifisert av en streng. Strukturert med skråstrek: <code>home/livingroom/temperature</code></span>
              </div>
              <div className="flex gap-2">
                <span className="shrink-0 font-medium text-blue-600 dark:text-blue-400">Session:</span>
                <span>Tilstandsinformasjon mellom client og broker. Clean session = start frisk, durable = behold state ved reconnect.</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
            <div className="font-semibold text-blue-600 dark:text-blue-400">MQTT-fakta</div>
            <ul className="text-sm text-[var(--muted)] space-y-2 list-disc list-inside">
              <li>Utviklet av IBM og Eurotech for satellitt-SCADA (1999)</li>
              <li>Standardisert av OASIS</li>
              <li>Kjører over <strong>TCP</strong> (pålitelig transport)</li>
              <li>Port 1883 (ukryptert), Port 8883 (TLS)</li>
              <li><strong>2-byte</strong> fast header — ekstremt kompakt</li>
              <li>Designet for ressursbegrensede enheter (IoT, WSN, M2M)</li>
              <li>Publish-subscribe mønster — ikke request-response</li>
            </ul>
          </div>
        </div>

        {/* Pub-Sub diagram */}
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
          <div className="font-semibold mb-3 text-sm">Publish-Subscribe via Broker</div>
          <svg viewBox="0 0 580 180" className="w-full max-w-xl mx-auto">
            {/* Publisher */}
            <rect x="10" y="70" width="100" height="40" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="60" y="88" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="bold">Temp-sensor</text>
            <text x="60" y="100" textAnchor="middle" fontSize="8" fill="#3b82f6">Publisher</text>

            {/* Broker */}
            <rect x="220" y="20" width="140" height="140" rx="8" fill="#f9fafb" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4"/>
            <text x="290" y="45" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">MQTT Broker</text>
            <rect x="240" y="55" width="100" height="20" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
            <text x="290" y="68" textAnchor="middle" fontSize="8" fill="#92400e">home/temp</text>
            <rect x="240" y="80" width="100" height="20" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1"/>
            <text x="290" y="93" textAnchor="middle" fontSize="8" fill="#1d4ed8">home/light</text>
            <text x="290" y="120" textAnchor="middle" fontSize="8" fill="#6b7280">Topics (køer)</text>

            {/* Publisher 2 */}
            <rect x="10" y="130" width="100" height="40" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="60" y="148" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="bold">Lys-sensor</text>
            <text x="60" y="160" textAnchor="middle" fontSize="8" fill="#3b82f6">Publisher</text>

            {/* Subscribers */}
            <rect x="470" y="30" width="100" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
            <text x="520" y="48" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="bold">Dashboard</text>
            <text x="520" y="60" textAnchor="middle" fontSize="8" fill="#16a34a">Sub: home/#</text>

            <rect x="470" y="90" width="100" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
            <text x="520" y="108" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="bold">Varsel-app</text>
            <text x="520" y="120" textAnchor="middle" fontSize="8" fill="#16a34a">Sub: home/temp</text>

            <rect x="470" y="150" width="100" height="25" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
            <text x="520" y="166" textAnchor="middle" fontSize="9" fill="#166534">Logger</text>

            {/* Piler publish */}
            <path d="M110 90 L220 65" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arr-ps-b)" strokeDasharray="3"/>
            <path d="M110 150 L220 90" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arr-ps-b)" strokeDasharray="3"/>

            {/* Piler subscribe */}
            <path d="M360 65 L470 50" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arr-ps-g)"/>
            <path d="M360 90 L470 110" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arr-ps-g)"/>
            <path d="M360 90 L470 163" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arr-ps-g)"/>

            <defs>
              <marker id="arr-ps-b" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#3b82f6"/>
              </marker>
              <marker id="arr-ps-g" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#16a34a"/>
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 3. QoS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">3. QoS — Quality of Service (3 nivåer)</h2>

        <div className="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm">
          <div className="font-bold text-red-700 dark:text-red-400">Eksamensgarantert!</div>
          <p className="text-red-700 dark:text-red-400">QoS 2 handshake-sekvens (PUBREC/PUBREL/PUBCOMP) er et typisk eksamenstema.</p>
        </div>

        {/* QoS-velger */}
        <div className="flex gap-2">
          {([0, 1, 2] as QosLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => setActiveQos(level)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                activeQos === level
                  ? level === 0 ? "bg-amber-500 text-white" : level === 1 ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                  : "border border-[var(--card-border)] text-[var(--muted)] hover:border-blue-400"
              }`}
            >
              QoS {level}
            </button>
          ))}
        </div>

        {/* QoS-innhold */}
        <div className={`rounded-lg border ${qosColors.border} ${qosColors.bg} p-4 space-y-4`}>
          <div>
            <div className={`font-bold text-lg ${qosColors.text}`}>QoS {activeQos} — {qos.name}</div>
            <div className={`text-sm font-medium ${qosColors.text}`}>{qos.tagline}</div>
          </div>

          <p className={`text-sm ${qosColors.text}`}>{qos.desc}</p>

          {/* Meldingsflyt */}
          <div>
            <div className={`text-xs font-medium mb-2 ${qosColors.text}`}>Meldingsflyt:</div>
            <div className="space-y-1">
              {qos.flow.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold shrink-0 ${qosColors.badge}`}>
                    {i + 1}
                  </span>
                  <span className={`font-medium ${qosColors.text}`}>{f.from}</span>
                  <span className="text-[var(--muted)]">→</span>
                  <span className={`font-medium ${qosColors.text}`}>{f.to}</span>
                  <span className="text-[var(--muted)]">:</span>
                  <code className={`${qosColors.badge} px-1.5 py-0.5 rounded text-xs font-mono`}>{f.msg}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <div>
              <div className={`font-medium ${qosColors.text}`}>Overhead</div>
              <div className="text-[var(--muted)]">{qos.overhead}</div>
            </div>
            <div>
              <div className={`font-medium ${qosColors.text}`}>Garanti</div>
              <div className="text-[var(--muted)]">{qos.guarantee}</div>
            </div>
            <div>
              <div className={`font-medium ${qosColors.text}`}>Brukstilfelle</div>
              <div className="text-[var(--muted)]">{qos.useCase}</div>
            </div>
          </div>
        </div>

        {/* QoS sammendragstabell */}
        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">QoS</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Navn</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Meldinger</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Duplikat?</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Tap?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--card-border)] px-3 py-2 font-bold text-amber-600 dark:text-amber-400">0</td>
                <td className="border border-[var(--card-border)] px-3 py-2">At-most-once</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">PUBLISH</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">Nei</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-red-600 dark:text-red-400">Ja — mulig</td>
              </tr>
              <tr className="bg-[var(--card)]">
                <td className="border border-[var(--card-border)] px-3 py-2 font-bold text-blue-600 dark:text-blue-400">1</td>
                <td className="border border-[var(--card-border)] px-3 py-2">At-least-once</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">PUBLISH + PUBACK</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-red-600 dark:text-red-400">Ja — mulig</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">Nei</td>
              </tr>
              <tr>
                <td className="border border-[var(--card-border)] px-3 py-2 font-bold text-green-600 dark:text-green-400">2</td>
                <td className="border border-[var(--card-border)] px-3 py-2">Exactly-once</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">PUBLISH+PUBREC+PUBREL+PUBCOMP</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">Nei</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">Nei</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. VIKTIGE EGENSKAPER */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">4. Viktige MQTT-egenskaper</h2>

        <div className="space-y-3">
          {/* RETAIN */}
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)]">
            <button
              onClick={() => setShowRetain(!showRetain)}
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[var(--background)] rounded-lg"
            >
              <div>
                <span className="font-semibold">RETAIN-flagget</span>
                <span className="ml-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">Viktig</span>
              </div>
              <span className="text-[var(--muted)] text-sm">{showRetain ? "▲" : "▼"}</span>
            </button>
            {showRetain && (
              <div className="px-4 pb-4 space-y-2 text-sm text-[var(--muted)]">
                <p>
                  Når RETAIN = 1 i en PUBLISH-melding, <strong>lagrer brokeren den siste meldingen</strong> for hvert topic.
                  Nye abonnenter mottar umiddelbart den siste lagrede meldingen uten å måtte vente på neste publish.
                </p>
                <div className="rounded bg-[var(--background)] border border-[var(--card-border)] p-3 text-xs font-mono">
                  Sensor publiserer temp=22°C med RETAIN=1<br/>
                  → Broker lagrer "temp=22°C" for topic home/temp<br/>
                  → Ny subscriber kobler til home/temp<br/>
                  → Broker sender umiddelbart "temp=22°C" til ny subscriber
                </div>
                <p className="text-xs">
                  Brukstilfelle: IoT-sensorer som sjelden publiserer (solarcellepanel, doerstate).
                  Ny abonnent får siste kjente status umiddelbart.
                </p>
              </div>
            )}
          </div>

          {/* LWT */}
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)]">
            <button
              onClick={() => setShowLwt(!showLwt)}
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[var(--background)] rounded-lg"
            >
              <div>
                <span className="font-semibold">LWT — Last Will Testament</span>
                <span className="ml-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded-full">Unikt for MQTT</span>
              </div>
              <span className="text-[var(--muted)] text-sm">{showLwt ? "▲" : "▼"}</span>
            </button>
            {showLwt && (
              <div className="px-4 pb-4 space-y-2 text-sm text-[var(--muted)]">
                <p>
                  Klienten definerer en "siste vilje"-melding i CONNECT-pakken.
                  Hvis klienten <strong>kobler fra uventet</strong> (uten DISCONNECT),
                  publiserer brokeren automatisk LWT-meldingen på vegne av klienten.
                </p>
                <div className="rounded bg-[var(--background)] border border-[var(--card-border)] p-3 text-xs font-mono">
                  CONNECT &#123;<br/>
                  {"  "}will_topic: "home/sensor/status",<br/>
                  {"  "}will_message: "OFFLINE",<br/>
                  {"  "}will_qos: 1<br/>
                  &#125;<br/>
                  → Klient krasjer (ingen DISCONNECT)<br/>
                  → Broker publiserer "OFFLINE" til "home/sensor/status"
                </div>
                <p className="text-xs">
                  Brukstilfelle: monitorering — andre enheter/systemer vet umiddelbart at en enhet er offline.
                </p>
              </div>
            )}
          </div>

          {/* Wildcards */}
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)]">
            <button
              onClick={() => setShowWildcard(!showWildcard)}
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[var(--background)] rounded-lg"
            >
              <span className="font-semibold">Topic Wildcards: + og #</span>
              <span className="text-[var(--muted)] text-sm">{showWildcard ? "▲" : "▼"}</span>
            </button>
            {showWildcard && (
              <div className="px-4 pb-4 space-y-3 text-sm text-[var(--muted)]">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/10 p-3">
                    <div className="font-mono font-bold text-blue-700 dark:text-blue-400 text-base mb-2">+</div>
                    <div className="font-medium text-blue-700 dark:text-blue-400 mb-1">Enkelt-nivå wildcard</div>
                    <p className="text-xs">Matcher nøyaktig ett nivå i topic-hierarkiet.</p>
                    <div className="mt-2 space-y-1 text-xs font-mono">
                      <div><span className="text-blue-600">home/+/temperature</span></div>
                      <div className="text-green-600">✓ home/livingroom/temperature</div>
                      <div className="text-green-600">✓ home/bedroom/temperature</div>
                      <div className="text-red-600">✗ home/floor1/room/temperature</div>
                    </div>
                  </div>
                  <div className="rounded border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/10 p-3">
                    <div className="font-mono font-bold text-purple-700 dark:text-purple-400 text-base mb-2">#</div>
                    <div className="font-medium text-purple-700 dark:text-purple-400 mb-1">Multi-nivå wildcard</div>
                    <p className="text-xs">Matcher ett eller flere nivåer. Må stå til slutt.</p>
                    <div className="mt-2 space-y-1 text-xs font-mono">
                      <div><span className="text-purple-600">home/#</span></div>
                      <div className="text-green-600">✓ home/livingroom/temperature</div>
                      <div className="text-green-600">✓ home/floor1/room/light</div>
                      <div className="text-green-600">✓ home/sensor</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fast header */}
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)]">
            <button
              onClick={() => setShowHeader(!showHeader)}
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[var(--background)] rounded-lg"
            >
              <span className="font-semibold">Fast header — 2 byte</span>
              <span className="text-[var(--muted)] text-sm">{showHeader ? "▲" : "▼"}</span>
            </button>
            {showHeader && (
              <div className="px-4 pb-4 space-y-3">
                <p className="text-sm text-[var(--muted)]">
                  MQTT er designet for minimal overhead. Den faste headeren er kun 2 bytes:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse font-mono">
                    <thead>
                      <tr className="bg-[var(--background)]">
                        <th className="border border-[var(--card-border)] px-2 py-1">Bit 7</th>
                        <th className="border border-[var(--card-border)] px-2 py-1">Bit 6</th>
                        <th className="border border-[var(--card-border)] px-2 py-1">Bit 5</th>
                        <th className="border border-[var(--card-border)] px-2 py-1">Bit 4</th>
                        <th className="border border-[var(--card-border)] px-2 py-1">Bit 3</th>
                        <th className="border border-[var(--card-border)] px-2 py-1">Bit 2</th>
                        <th className="border border-[var(--card-border)] px-2 py-1">Bit 1</th>
                        <th className="border border-[var(--card-border)] px-2 py-1">Bit 0</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={4} className="border border-[var(--card-border)] px-2 py-1 text-center text-blue-600 dark:text-blue-400">Message Type (4 bit)</td>
                        <td className="border border-[var(--card-border)] px-2 py-1 text-center text-red-600 dark:text-red-400">DUP</td>
                        <td colSpan={2} className="border border-[var(--card-border)] px-2 py-1 text-center text-green-600 dark:text-green-400">QoS Level (2 bit)</td>
                        <td className="border border-[var(--card-border)] px-2 py-1 text-center text-amber-600 dark:text-amber-400">RETAIN</td>
                      </tr>
                      <tr className="bg-[var(--card)]">
                        <td colSpan={8} className="border border-[var(--card-border)] px-2 py-1 text-center text-[var(--muted)]">Byte 2: Remaining Length (variable encoding)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
                  <li><span className="text-blue-600 dark:text-blue-400">Message Type</span>: CONNECT=1, PUBLISH=3, SUBSCRIBE=8, PINGREQ=12, etc.</li>
                  <li><span className="text-red-600 dark:text-red-400">DUP</span>: 1 = dette er en re-levering av en tidligere melding</li>
                  <li><span className="text-green-600 dark:text-green-400">QoS Level</span>: 00=0, 01=1, 10=2</li>
                  <li><span className="text-amber-600 dark:text-amber-400">RETAIN</span>: 1 = broker skal lagre denne meldingen</li>
                </ul>
              </div>
            )}
          </div>

          {/* Subscription types */}
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)]">
            <button
              onClick={() => setShowSubTypes(!showSubTypes)}
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[var(--background)] rounded-lg"
            >
              <span className="font-semibold">Transiente vs Durable subscriptions</span>
              <span className="text-[var(--muted)] text-sm">{showSubTypes ? "▲" : "▼"}</span>
            </button>
            {showSubTypes && (
              <div className="px-4 pb-4 grid md:grid-cols-2 gap-3 text-sm text-[var(--muted)]">
                <div className="rounded border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/10 p-3">
                  <div className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Transient subscription</div>
                  <p className="text-xs">Clean session = 1 (default). Abonnementet opphører når klienten kobler fra. Meldinger publisert mens klienten er offline går tapt.</p>
                </div>
                <div className="rounded border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/10 p-3">
                  <div className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Durable subscription</div>
                  <p className="text-xs">Clean session = 0. Broker husker abonnementet. Meldinger (med QoS {">"} 0) lagres og leveres når klienten reconnectер.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. EKSAMENSSAMMENDRAG */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">5. Eksamenssammendrag</h2>

        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-4">
          <div className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva du MÅ huske om MQTT</div>
          <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1 list-disc list-inside">
            <li>QoS 0: at-most-once (brannmur og glem), QoS 1: at-least-once (PUBACK), QoS 2: exactly-once (PUBREC→PUBREL→PUBCOMP)</li>
            <li>RETAIN: broker lagrer siste melding, ny subscriber får den umiddelbart</li>
            <li>LWT: broker publiserer "testament" ved uventet frakobling</li>
            <li>+: enkelt-nivå wildcard, #: multi-nivå wildcard (slutter alltid topic-strengen)</li>
            <li>Kjører over TCP (pålitelig transport), 2-byte fast header, publish-subscribe</li>
            <li>MOM = persistent-asynkron kommunikasjon (motsetning til RPC = transient-synkron)</li>
          </ul>
        </div>
      </section>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-4/teori/4-2" className="hover:text-[var(--accent)] text-sm">
          ← 4.2 RPC — Remote Procedure Call
        </Link>
        <Link href="/dat110/ds-4/teori/4-4" className="hover:text-[var(--accent)] text-sm">
          4.4 Multicast og overlay-nettverk →
        </Link>
      </div>
    </div>
  );
}
