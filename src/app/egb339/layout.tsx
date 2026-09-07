import type { Metadata } from "next";
import Egb339Nav from "@/components/egb339/Egb339Nav";

export const metadata: Metadata = {
  title: "EGB339 Introduction to Robotics",
  description:
    "Ukeplan, kinematikk, Python, robot vision og vurderingsstøtte for EGB339 ved QUT.",
};

export default function Egb339Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Egb339Nav />
      {children}
    </div>
  );
}
