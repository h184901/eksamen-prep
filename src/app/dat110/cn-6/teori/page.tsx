"use client";

export default function CN6TeoriPage() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-network-300 dark:border-network-700 p-12 text-center">
        <p className="text-lg font-semibold text-[var(--muted)] mb-2">
          Innhold kommer snart
        </p>
        <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
          Her vil du finne teori om MAC-adresser og ARP-protokollen,
          Ethernet-rammeformat, CSMA/CD, switch-læringsalgoritmen,
          sammenligning av switch og ruter, VLAN og DHCP.
        </p>
      </div>
    </div>
  );
}
