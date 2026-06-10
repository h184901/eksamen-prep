import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AITutor from "@/components/AITutor";
import { ProgressProvider } from "@/components/ProgressProvider";

export const metadata: Metadata = {
  title: "Eksamensøving — Dataingeniør HVL",
  description:
    "Eksamensøving for dataingeniør ved HVL Bergen, organisert etter studieløpet — DAT102, DAT107, DAT109, DAT110 og ING164.",
  appleWebApp: {
    title: "Eksamensøving",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ProgressProvider>
          <AITutor>
            <Navigation />
            <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
          </AITutor>
        </ProgressProvider>
      </body>
    </html>
  );
}
