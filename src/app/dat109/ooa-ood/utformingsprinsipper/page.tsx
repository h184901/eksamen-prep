"use client";

import PlaceholderPage from "@/components/dat109/PlaceholderPage";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ooaOodPages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function UtformingsprinsipperPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.ooaOod} pages={ooaOodPages} />
      <PlaceholderPage
        breadcrumb={[
          { label: "Hjem", href: "/" },
          { label: "DAT109", href: "/dat109" },
          { label: "OOA og OOD", href: "/dat109/ooa-ood" },
          { label: "Utformingsprinsipper" },
        ]}
        title="Utformingsprinsipper utover SOLID og GRASP"
        description="KISS, YAGNI, komposisjon vs aggregering, arv vs komposisjon, og tilstandshierarki. Disse er nevnt i F06 og F15 og er viktig for å forsvare designvalg på eksamen."
        examWeight="Del av oppgave 2 og 4"
        badge="NY"
        todoItems={[
          {
            label: "KISS — Keep It Simple, Stupid",
            hint: "F16 slide 17. Definisjon, eksempler, hvorfor enkelhet er ofte bedre enn smartness.",
          },
          {
            label: "YAGNI — You Aren't Gonna Need It",
            hint: "F16 slide 18. Ikke implementer funksjonalitet før du faktisk trenger den. Kobling til iterativ utvikling og MVP.",
          },
          {
            label: "Komposisjon vs aggregering",
            hint: "F06 slides 123–126. Når bruker man fylt diamant (komposisjon) vs åpen diamant (aggregering)? Levetid, fysisk del, propagering. Brett ◆— Rute (komposisjon) vs Spill ◇— Spiller (aggregering).",
          },
          {
            label: "Arv vs komposisjon ('favor composition over inheritance')",
            hint: "Klassisk OOP-regel. Når er arv riktig (er-en relasjon med polymorfi)? Når er komposisjon bedre (har-en relasjon, mer fleksibel)? Eksempel fra Monopol og Stigespill.",
          },
          {
            label: "Tilstandshierarki som alternativ til subklasser-for-tilstand",
            hint: "F06 slide 116, F08. Ikke bruk subklasser for å modellere ulike tilstander. Definer i stedet et tilstandshierarki eller modeller med tilstandsdiagram.",
          },
          {
            label: "Kobling til SOLID/GRASP",
            hint: "Vis hvordan disse 'småprinsippene' støtter SOLID og GRASP. F.eks. KISS støtter SRP, YAGNI støtter OCP.",
          },
          {
            label: "Resultater av gode prinsipper (F06, F15)",
            hint: "Mer forståelig kode, mer fleksibel kode, mer vedlikeholdbar kode, mer testbar kode. Dette er målet med ALLE design-prinsipper.",
          },
        ]}
        pensumKilder={[
          "F06 — Utformingsprinsipper og UML (129 slides, slides 70–126 om hovedegenskaper og komposisjon)",
          "F15 — AUP, overføring og testing og mer om utformingsprinsipper (70 slides)",
          "F16 — Oppsummering og eksamen (slides 13, 17, 18)",
        ]}
        relatedLinks={[
          { label: "SOLID-prinsippene", href: "/dat109/ooa-ood/solid" },
          { label: "GRASP-mønstrene", href: "/dat109/ooa-ood/grasp" },
          { label: "OOP-fundamenter", href: "/dat109/ooa-ood/oop-fundamenter" },
        ]}
      />
    </div>
  );
}
