import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AITutor from "@/components/AITutor";

export const metadata: Metadata = {
  title: "Eksamensøving — Semester 4",
  description: "Skreddersydd eksamensøving for ING164 Fysikk, DAT110 og DAT109",
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
        <AITutor>
          <Navigation />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </AITutor>
      </body>
    </html>
  );
}
