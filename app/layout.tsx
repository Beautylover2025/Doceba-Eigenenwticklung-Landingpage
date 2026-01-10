import type { Metadata } from "next";
import "./globals.css";
import { clsx } from "clsx";
import FacebookPixel from "@/components/FacebookPixel";
import { Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Exklusive Kosmetik Entwicklung | GMP Zertifiziert",
  description: "Entwicklung ab 5.000 €. Private Label Kosmetik für Unternehmer und Marken. Made in Germany.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={clsx(
          "antialiased bg-white text-[#111111] selection:bg-[#E5E7EB]"
        )}
      >
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
