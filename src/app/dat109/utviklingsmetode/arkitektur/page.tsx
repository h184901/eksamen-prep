"use client";
import PlaceholderPage from "@/components/dat109/PlaceholderPage";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function ArkitekturPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.utviklingsmetode} pages={utviklingsmetodePages} />
      <PlaceholderPage
        breadcrumb={[
          { label: "Hjem", href: "/" },
          { label: "DAT109", href: "/dat109" },
          { label: "Utviklingsmetode", href: "/dat109/utviklingsmetode" },
          { label: "Arkitektur" },
        ]}
        title="Software arkitektur"
        description="Sommerville kapittel 4 — kvalitetsattributter, lagdelt arkitektur, distribusjonsmønstre, og teknologivalg. Helt nytt tema på nettsiden, men sannsynlig eksamenspoeng."
        examWeight="Pensum (Sommerville kap 4)"
        badge="NY"
        todoItems={[
          { label: "Hvorfor er arkitektur viktig?", hint: "Påvirker ikke-funksjonelle krav: ytelse, sikkerhet, vedlikeholdbarhet" },
          { label: "Quality attributes", hint: "Responsiveness, reliability, availability, security, usability, maintainability, resilience" },
          { label: "Trade-offs", hint: "Sikkerhet vs usability, vedlikehold vs ytelse, tilgjengelighet vs kostnad" },
          { label: "System decomposition", hint: "Separation of concerns, implement once, stable interfaces" },
          { label: "Layered architecture", hint: "5-lags eksempel for web-app: UI / Auth / AppLogic / Services / DB" },
          { label: "Distribution patterns", hint: "Client-server (MVC), multi-tier, service-oriented (microservices)" },
          { label: "Database: SQL vs NoSQL", hint: "Når bruker man hva? Hybrid med PostgreSQL JSON?" },
          { label: "Cloud vs on-premise", hint: "AWS/Azure vs egne servere — hvilke krav driver valget?" },
          { label: "Open source — lisensiering", hint: "GPL er restriktiv, MIT/Apache er friere" },
        ]}
        pensumKilder={[
          "Sommerville: Engineering Software Products kapittel 4",
          "Tidligereoppsummeringer (oppsummeringavagileosv.txt har et utkast)",
        ]}
      />
    </div>
  );
}
