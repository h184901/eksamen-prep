"use client";

import { useState } from "react";
import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-network-700 dark:text-network-300">{title}</h2>
      {children}
    </section>
  );
}

function Card({ color, children, title }: { color: "gold" | "blue" | "network" | "green" | "red"; children: React.ReactNode; title?: string }) {
  const colors = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
  };
  return (
    <div className={`rounded-xl border-2 p-4 my-3 ${colors[color]}`}>
      {title && <div className="font-bold mb-2 text-sm uppercase tracking-wide opacity-70">{title}</div>}
      {children}
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-3 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
      >
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm text-amber-900 dark:text-amber-200 my-2">
      <span className="font-bold">Vanlig feil: </span>{children}
    </div>
  );
}

function ExamTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-network-50 dark:bg-network-950/20 border border-network-300 dark:border-network-700 px-4 py-3 text-sm text-network-900 dark:text-network-200 my-2">
      <span className="font-bold">Eksamenstips: </span>{children}
    </div>
  );
}

function CodeBlock({ children, lang = "java" }: { children: string; lang?: string }) {
  return (
    <pre className="bg-neutral-900 text-green-300 rounded-lg p-4 text-xs overflow-x-auto font-mono leading-relaxed my-3">
      <code>{children}</code>
    </pre>
  );
}

export default function Page27() {
  const [activeTab, setActiveTab] = useState<"udp" | "tcp">("tcp");

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/dat110/cn-2/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">2.7 Socket-programmering</span>
      </div>

      <h1 className="text-2xl font-bold mb-1 text-network-700 dark:text-network-300">2.7 Socket-programmering</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">UDP og TCP sockets — klient-server-programmering i Java</p>

      {/* --- INTRO --- */}
      <Section title="Hva er socket-programmering?">
        <p className="text-sm mb-3 leading-relaxed">
          Socket-programmering er hvordan du som applikasjonsutvikler bruker transportlagstjenestene (TCP/UDP) i din kode.
          En <strong>socket</strong> er et kommunikasjonsendepunkt — grensesnittet mellom applikasjonslaget og transportlaget.
          Du oppretter en socket, og operativsystemet tar seg av resten av nettverksstacken.
        </p>

        <Card color="network" title="Socket-API — hva det gir deg">
          <ul className="text-sm space-y-1">
            <li>Sockets opprettes og lukkes av applikasjonen/prosessen</li>
            <li>Sockets kontrolleres av operativsystemet (underliggende transport)</li>
            <li>Socket-API-et muliggjør kommunikasjon mellom applikasjoner implementert i ulike språk</li>
            <li>Socket-API-et muliggjør kommunikasjon mellom applikasjoner som kjører på ulike plattformer</li>
            <li>I Java: pakken <code className="bg-black/10 dark:bg-white/10 px-1 rounded">java.net</code> (se docs.oracle.com/javase/11)</li>
          </ul>
        </Card>

        <p className="text-sm mt-3 leading-relaxed">
          DNS er nødvendig for å bruke socket-API-et: når du angir en vertsnavn (f.eks. <code>www.example.com</code>),
          bruker socket-API-et DNS internt for å oversette til IP-adresse.
        </p>
      </Section>

      {/* --- FIRE SOCKET-TYPER I JAVA --- */}
      <Section title="Fire socket-klasser i Java (java.net)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900/30">
                <th className="border border-network-200 dark:border-network-700 px-3 py-2">Klasse</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-left">Brukes til</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-center">Protokoll</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Socket", "TCP klient-socket — koble til en remote host", "TCP"],
                ["ServerSocket", "TCP server-socket — akseptere innkommende tilkoblinger", "TCP"],
                ["DatagramSocket", "UDP-endepunkt — sende og motta datagrampakker", "UDP"],
                ["MulticastSocket", "UDP multicast-grupper (subklasse av DatagramSocket)", "UDP"],
              ].map(([k, b, p]) => (
                <tr key={k} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 font-mono font-bold text-network-700 dark:text-network-300">{k}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-xs">{b}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-center font-bold">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* --- TCP VS UDP SOCKETS --- */}
      <Section title="TCP vs UDP sockets — nøkkelforskjeller">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card color="blue" title="TCP sockets">
            <ul className="text-xs space-y-1">
              <li><strong>Tilkoblingsorientert</strong> — må etablere tilkobling før data sendes (3-veis handshake)</li>
              <li>Pålitelig byte-strøm — garantert levering i rekkefølge</li>
              <li>Server bruker <strong>ServerSocket</strong> (velkomstsocket) + <strong>Socket</strong> (tilkoblingssocket)</li>
              <li>Klient bruker <strong>Socket</strong></li>
              <li>Bruker InputStream/OutputStream for datautveksling</li>
              <li>Mer overhead, men garantert levering</li>
            </ul>
          </Card>
          <Card color="red" title="UDP sockets">
            <ul className="text-xs space-y-1">
              <li><strong>Tilkoblingsløs</strong> — ingen forberedelse før sending</li>
              <li>Upålitelig datagrammer — kan mistes, komme i feil rekkefølge</li>
              <li>Eksplisitt destinasjonsadresse på hvert datagram</li>
              <li>Både klient og server bruker <strong>DatagramSocket</strong></li>
              <li>Bruker DatagramPacket for datautveksling</li>
              <li>Lavere overhead, lavere forsinkelse</li>
            </ul>
          </Card>
        </div>

        <Card color="gold">
          <p className="text-sm"><strong>Analogi:</strong> UDP er som å sende et postkort — du skriver adressen på hvert kort og sender det av gårde uten å vet om det kommer frem. TCP er som en telefonsamtale — du etablerer forbindelsen først, snakker, og legger på til slutt.</p>
        </Card>
      </Section>

      {/* --- SEKVENSDIAGRAMMER --- */}
      <Section title="Programmeringsmodeller — interaktivt diagram">

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setActiveTab("tcp")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === "tcp" ? "bg-blue-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"}`}
          >
            TCP
          </button>
          <button
            onClick={() => setActiveTab("udp")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === "udp" ? "bg-red-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:border-red-400"}`}
          >
            UDP
          </button>
        </div>

        {activeTab === "tcp" && (
          <div>
            <p className="text-sm mb-3">TCP har to typer sockets på serversiden: <strong>velkomstsocket</strong> og <strong>tilkoblingssocket</strong>.</p>

            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 overflow-x-auto mb-4">
              <svg viewBox="0 0 540 400" className="w-full" aria-label="TCP socket programmeringsmodell">
                {/* Columns */}
                <text x="130" y="20" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Server (hostid)</text>
                <text x="410" y="20" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Klient</text>
                <line x1="130" y1="25" x2="130" y2="390" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3"/>
                <line x1="410" y1="25" x2="410" y2="390" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3"/>

                {/* Server steps */}
                {[
                  { x: 30, y: 40, w: 200, text: "welcomeSocket =", text2: "new ServerSocket(port)", color: "#6366f1" },
                  { x: 30, y: 120, w: 200, text: "connectionSocket =", text2: "welcomeSocket.accept()", color: "#6366f1" },
                  { x: 30, y: 250, w: 200, text: "Les fra connectionSocket", text2: "(inFromClient.readLine())", color: "#10b981" },
                  { x: 30, y: 310, w: 200, text: "Skriv til connectionSocket", text2: "(outToClient.writeBytes(...))", color: "#10b981" },
                  { x: 30, y: 360, w: 200, text: "connectionSocket.close()", text2: "", color: "#ef4444" },
                ].map(({ x, y, w, text, text2, color }) => (
                  <g key={text}>
                    <rect x={x} y={y} width={w} height={text2 ? 45 : 30} rx="5" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
                    <text x={x + w / 2} y={y + 17} textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">{text}</text>
                    {text2 && <text x={x + w / 2} y={y + 32} textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">{text2}</text>}
                  </g>
                ))}

                {/* Client steps */}
                {[
                  { x: 310, y: 40, w: 200, text: "clientSocket =", text2: "new Socket(host, port)", color: "#0ea5e9" },
                  { x: 310, y: 190, w: 200, text: "Skriv til clientSocket", text2: "(outToServer.writeBytes(...))", color: "#10b981" },
                  { x: 310, y: 250, w: 200, text: "Les fra clientSocket", text2: "(inFromServer.readLine())", color: "#10b981" },
                  { x: 310, y: 360, w: 200, text: "clientSocket.close()", text2: "", color: "#ef4444" },
                ].map(({ x, y, w, text, text2, color }) => (
                  <g key={text + "c"}>
                    <rect x={x} y={y} width={w} height={text2 ? 45 : 30} rx="5" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
                    <text x={x + w / 2} y={y + 17} textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">{text}</text>
                    {text2 && <text x={x + w / 2} y={y + 32} textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">{text2}</text>}
                  </g>
                ))}

                {/* TCP Handshake arrow */}
                <line x1="310" y1="62" x2="240" y2="132" stroke="#6366f1" strokeWidth="2" markerEnd="url(#tcpA)"/>
                <text x="272" y="92" textAnchor="middle" fill="#6366f1" fontSize="9" fontWeight="bold">TCP tilkobling</text>
                <text x="272" y="104" textAnchor="middle" fill="#6366f1" fontSize="9">(3-veis handshake)</text>

                {/* Request arrow */}
                <line x1="310" y1="200" x2="230" y2="255" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#tcpB)"/>
                <text x="270" y="222" textAnchor="middle" fill="#10b981" fontSize="9">forespørsel</text>

                {/* Response arrow */}
                <line x1="230" y1="320" x2="310" y2="260" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#tcpC)"/>
                <text x="270" y="310" textAnchor="middle" fill="#10b981" fontSize="9">svar</text>

                <defs>
                  <marker id="tcpA" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#6366f1"/></marker>
                  <marker id="tcpB" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#10b981"/></marker>
                  <marker id="tcpC" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#10b981"/></marker>
                </defs>
              </svg>
              <p className="text-xs text-center text-[var(--muted)] mt-1">TCP: server har <em>velkomstsocket</em> (lytter) og <em>tilkoblingssocket</em> (per klient)</p>
            </div>
          </div>
        )}

        {activeTab === "udp" && (
          <div>
            <p className="text-sm mb-3">UDP er tilkoblingsløst — ingen håndtrykk. Hvert datagram har eksplisitt destinasjonsadresse.</p>

            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 overflow-x-auto mb-4">
              <svg viewBox="0 0 540 360" className="w-full" aria-label="UDP socket programmeringsmodell">
                <text x="130" y="20" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Server (hostid, port=x)</text>
                <text x="410" y="20" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Klient</text>
                <line x1="130" y1="25" x2="130" y2="350" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3"/>
                <line x1="410" y1="25" x2="410" y2="350" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3"/>

                {/* Server steps */}
                {[
                  { x: 30, y: 40, w: 200, text: "serverSocket =", text2: "new DatagramSocket(port)", color: "#ef4444" },
                  { x: 30, y: 160, w: 200, text: "serverSocket.receive(request)", text2: "(blokkerende)", color: "#10b981" },
                  { x: 30, y: 270, w: 200, text: "serverSocket.send(response)", text2: "(med klientadresse)", color: "#10b981" },
                ].map(({ x, y, w, text, text2, color }) => (
                  <g key={text}>
                    <rect x={x} y={y} width={w} height={45} rx="5" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
                    <text x={x + w / 2} y={y + 17} textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">{text}</text>
                    <text x={x + w / 2} y={y + 32} textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">{text2}</text>
                  </g>
                ))}

                {/* Client steps */}
                {[
                  { x: 310, y: 40, w: 200, text: "clientSocket =", text2: "new DatagramSocket()", color: "#0ea5e9" },
                  { x: 310, y: 100, w: 200, text: "Lag DatagramPacket", text2: "(data, len, ipaddr, port)", color: "#0ea5e9" },
                  { x: 310, y: 160, w: 200, text: "clientSocket.send(request)", text2: "(send til server)", color: "#10b981" },
                  { x: 310, y: 230, w: 200, text: "clientSocket.receive(response)", text2: "(blokkerende)", color: "#10b981" },
                  { x: 310, y: 310, w: 200, text: "clientSocket.close()", text2: "", color: "#ef4444" },
                ].map(({ x, y, w, text, text2, color }) => (
                  <g key={text + "c"}>
                    <rect x={x} y={y} width={w} height={text2 ? 45 : 30} rx="5" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
                    <text x={x + w / 2} y={y + 17} textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">{text}</text>
                    {text2 && <text x={x + w / 2} y={y + 32} textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">{text2}</text>}
                  </g>
                ))}

                {/* Request arrow */}
                <line x1="310" y1="182" x2="230" y2="175" stroke="#10b981" strokeWidth="2" markerEnd="url(#udpA)"/>
                <text x="270" y="170" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">datagram (send)</text>

                {/* Response arrow */}
                <line x1="230" y1="285" x2="310" y2="248" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#udpB)"/>
                <text x="270" y="278" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">datagram (receive)</text>

                <defs>
                  <marker id="udpA" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#10b981"/></marker>
                  <marker id="udpB" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#f59e0b"/></marker>
                </defs>
              </svg>
              <p className="text-xs text-center text-[var(--muted)] mt-1">UDP: ingen tilkoblingsetablering — hvert datagram har eksplisitt destinasjonsadresse</p>
            </div>
          </div>
        )}
      </Section>

      {/* --- JAVA KODEEKSEMPLER --- */}
      <Section title="Java-kodeeksempler">

        <Collapsible title="TCP EchoServer — serversiden" defaultOpen={true}>
          <CodeBlock>{`import java.net.*;
import java.io.*;

public class TCPEchoServer {
    public static void main(String[] args) throws Exception {
        int serverPort = 9090;

        // 1. Opprett velkomstsocket (lytter etter tilkoblinger)
        ServerSocket welcomeSocket = new ServerSocket(serverPort);
        System.out.println("Server lytter på port " + serverPort);

        while (true) {
            // 2. Aksepter innkommende tilkobling → ny tilkoblingssocket
            Socket connectionSocket = welcomeSocket.accept();

            // 3. Sett opp strømmer for lesing og skriving
            BufferedReader inFromClient = new BufferedReader(
                new InputStreamReader(connectionSocket.getInputStream()));
            DataOutputStream outToClient =
                new DataOutputStream(connectionSocket.getOutputStream());

            // 4. Les forespørsel fra klient
            String request = inFromClient.readLine();
            System.out.println("Mottok: " + request);

            // 5. Send svar tilbake (echo)
            outToClient.writeBytes("ECHO: " + request + "\\r\\n");

            // 6. Lukk tilkoblingssocketen
            connectionSocket.close();
        }
    }
}`}</CodeBlock>
        </Collapsible>

        <Collapsible title="TCP EchoClient — klientsiden">
          <CodeBlock>{`import java.net.*;
import java.io.*;

public class TCPEchoClient {
    public static void main(String[] args) throws Exception {
        String serverHost = "localhost";
        int serverPort = 9090;
        String message = "Hei, server!";

        // 1. Opprett klient-socket og koble til server
        //    TCP 3-veis handshake skjer her!
        Socket clientSocket = new Socket(serverHost, serverPort);

        // 2. Sett opp strømmer
        DataOutputStream outToServer =
            new DataOutputStream(clientSocket.getOutputStream());
        BufferedReader inFromServer = new BufferedReader(
            new InputStreamReader(clientSocket.getInputStream()));

        // 3. Send melding til server
        outToServer.writeBytes(message + "\\r\\n");

        // 4. Les svar fra server
        String reply = inFromServer.readLine();
        System.out.println("Mottok fra server: " + reply);

        // 5. Lukk socket (avslutter tilkoblingen)
        clientSocket.close();
    }
}`}</CodeBlock>
        </Collapsible>

        <Collapsible title="UDP EchoServer — serversiden">
          <CodeBlock>{`import java.net.*;

public class UDPEchoServer {
    public static void main(String[] args) throws Exception {
        int serverPort = 9091;

        // 1. Opprett DatagramSocket på en spesifikk port
        DatagramSocket serverSocket = new DatagramSocket(serverPort);
        byte[] recvbuf = new byte[1024];

        System.out.println("UDP-server lytter på port " + serverPort);

        while (true) {
            // 2. Lag mottakspakke og vent (blokkerende)
            DatagramPacket request =
                new DatagramPacket(recvbuf, recvbuf.length);
            serverSocket.receive(request);  // blokkerer til pakke mottas

            // 3. Hent klientadresse og port fra pakken
            InetAddress clientAddr = request.getAddress();
            int clientPort = request.getPort();
            String received = new String(request.getData(),
                                         0, request.getLength());
            System.out.println("Mottok: " + received);

            // 4. Send svar tilbake til klienten
            String responseStr = "ECHO: " + received;
            byte[] sendData = responseStr.getBytes();
            DatagramPacket response = new DatagramPacket(
                sendData, sendData.length, clientAddr, clientPort);
            serverSocket.send(response);
        }
    }
}`}</CodeBlock>
        </Collapsible>

        <Collapsible title="UDP EchoClient — klientsiden">
          <CodeBlock>{`import java.net.*;

public class UDPEchoClient {
    public static void main(String[] args) throws Exception {
        String serverHost = "localhost";
        int serverPort = 9091;
        String message = "Hei via UDP!";

        // 1. Opprett DatagramSocket (ingen tilkobling!)
        DatagramSocket clientSocket = new DatagramSocket();

        // 2. Slå opp serverens IP-adresse
        InetAddress ipaddr = InetAddress.getByName(serverHost);

        // 3. Lag og send datagrampakke
        byte[] sendData = message.getBytes();
        DatagramPacket request = new DatagramPacket(
            sendData, sendData.length, ipaddr, serverPort);
        clientSocket.send(request);

        // 4. Lag mottakspakke og vent på svar
        byte[] recvbuf = new byte[1024];
        DatagramPacket response =
            new DatagramPacket(recvbuf, recvbuf.length);
        clientSocket.receive(response);  // blokkerer

        // 5. Vis svar
        String reply = new String(response.getData(),
                                   0, response.getLength());
        System.out.println("Mottok: " + reply);

        // 6. Lukk socket
        clientSocket.close();
    }
}`}</CodeBlock>
        </Collapsible>
      </Section>

      {/* --- IOT EKSEMPEL --- */}
      <Section title="IoT-systemeksempel fra forelesningen">
        <p className="text-sm mb-3 leading-relaxed">
          Professoren brukte et IoT-temperaturmålingssystem som eksempel i forelesningen.
          Dette er et godt eksempel på socket-programmering i praksis.
        </p>

        <Card color="gold" title="Systemarkitektur">
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5">UDP-klient</span>
              <p><strong>TemperatureDevice:</strong> Leser temperatur fra sensor og sender UDP-datagram til DisplayDevice</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5">UDP-server</span>
              <p><strong>DisplayDevice:</strong> Mottar UDP-datagram og viser temperatur på dashboard</p>
            </div>
          </div>
        </Card>

        <Card color="network">
          <p className="text-sm"><strong>Felles for obligen:</strong> Prosjekt 1 bruker TCP socket-programmering i Java for å implementere
          et distribuert IoT-system med protokollag. Eksamensspørsmål om obligen fokuserer på:
          hvilke protokollag ble implementert, hva er de første 8 bitene i meldinger til (type/metode-felt),
          og hvilke to elementer identifiserer en socket.</p>
        </Card>

        <ExamTip>Eksamen 2025 Oppgave 2 handler om socket-programmering og obligen. Du MÅ vite: (1) TCP socket-API bruker IP-adresse + port for identifikasjon, (2) ServerSocket.accept() returnerer en ny tilkoblingssocket per klient, (3) UDP bruker DatagramPacket med eksplisitt destinasjonsadresse.</ExamTip>
      </Section>

      {/* --- SAMMENLIGNINGSTABELL --- */}
      <Section title="Komplett sammenligning TCP vs UDP socket-programmering">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900/30">
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-left">Aspekt</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-center text-blue-700 dark:text-blue-300">TCP</th>
                <th className="border border-network-200 dark:border-network-700 px-3 py-2 text-center text-red-700 dark:text-red-300">UDP</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Tilkoblingstype", "Tilkoblingsorientert", "Tilkoblingsløs"],
                ["Server socket-klasse", "ServerSocket + Socket", "DatagramSocket"],
                ["Klient socket-klasse", "Socket", "DatagramSocket"],
                ["Dataoverføring", "Byte-strøm (InputStream/OutputStream)", "DatagramPacket"],
                ["Destinasjonsadresse", "Én gang ved oppkobling", "Hvert datagram"],
                ["Pålitelighet", "Garantert (TCP håndterer)", "Ingen garanti"],
                ["Rekkefølge", "Garantert", "Ikke garantert"],
                ["Tilkoblingsetablering", "3-veis handshake (SYN/SYN-ACK/ACK)", "Ingen"],
                ["Lukking av tilkobling", "Begge retninger (close())", "Kun socket-lukking"],
                ["Typiske applikasjoner", "HTTP, SSH, FTP, oblig proj. 1", "DNS, VoIP, streaming"],
              ].map(([asp, tcp, udp], i) => (
                <tr key={i} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 font-medium">{asp}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-center text-xs text-blue-700 dark:text-blue-300">{tcp}</td>
                  <td className="border border-network-200 dark:border-network-700 px-3 py-2 text-center text-xs text-red-700 dark:text-red-300">{udp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* --- VANLIGE FEIL --- */}
      <Section title="Vanlige feil og misforståelser">
        <Warn>Med TCP-sockets er det to ulike sockets på serveren: <strong>ServerSocket</strong> (velkomstsocket som lytter) og <strong>Socket</strong> (tilkoblingssocket per klient). DatagramSocket er kun for UDP.</Warn>
        <Warn>UDP sender <em>datagrammer</em> (avgrensede pakker), TCP sender en <em>byte-strøm</em>. Med UDP vet mottakeren alltid grensene mellom meldingene. Med TCP må applikasjonen selv implementere meldingsgrenser.</Warn>
        <Warn>UDP er tilkoblingsløs, men DatagramSocket-objektet opprettes likevel. Forskjellen er at det ikke sendes noen nettverksmeldinger (SYN/SYN-ACK) ved opprettelsen.</Warn>
        <Warn>ServerSocket.accept() er <strong>blokkerende</strong> — den venter til en klient kobler seg til. Dette er standard i enkel server-implementasjon; for flerklient-servere brukes tråder.</Warn>
      </Section>

      {/* --- EKSAMEN --- */}
      <Section title="Typiske eksamensspørsmål">
        <Collapsible title="Spørsmål: Hvilke to elementer identifiserer en socket ved transportlaget?">
          <Card color="green">
            <p className="text-sm font-bold">Svar: IP-adresse og portnummer.</p>
            <p className="text-sm mt-1">Eksamen 2025 Oppgave 2c: «What two elements are being used to identify a socket (communication endpoint) at the transport layer?»</p>
          </Card>
        </Collapsible>
        <Collapsible title="Spørsmål: Hva er forskjellen mellom ServerSocket og Socket i Java TCP-programmering?">
          <Card color="green">
            <p className="text-sm"><strong>ServerSocket</strong> (velkomstsocket): lytter etter innkommende tilkoblinger på en bestemt port. Kalles én gang for serveren.<br/>
            <strong>Socket</strong> (tilkoblingssocket): returneres av <code>welcomeSocket.accept()</code>. En ny tilkoblingssocket opprettes for HVER klient. Brukes til å lese/skrive data med én spesifikk klient.</p>
          </Card>
        </Collapsible>
        <Collapsible title="Spørsmål: Forklar UDP vs TCP socket-programmeringsmodell">
          <Card color="green">
            <p className="text-sm">
              <strong>TCP:</strong> Server oppretter ServerSocket → venter med accept() → Socket returneres → les/skriv via InputStream/OutputStream → close(). Klient: new Socket(host, port) → les/skriv → close(). Tilkobling etableres automatisk.<br/><br/>
              <strong>UDP:</strong> Server: new DatagramSocket(port) → receive(packet) → send(response). Klient: new DatagramSocket() → send(packet til serveradresse) → receive(response). Ingen tilkoblingsetablering — destinasjonsadresse angis på hvert datagram.
            </p>
          </Card>
        </Collapsible>
      </Section>

      {/* Nav */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-2/teori/2-4" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">← 2.4 DNS</Link>
        <Link href="/dat110/cn-2/teori" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">Alle delkapitler →</Link>
      </div>
    </div>
  );
}
