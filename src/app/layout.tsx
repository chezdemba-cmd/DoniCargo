import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PWARegister } from "@/components/pwa-register";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DoniCargo - Marketplace & Suivi Logistique pour l'Afrique",
  description: "La première plateforme de mise en relation sécurisée entre commerçants et transitaires. Suivi GPS en temps réel, paiement Escrow et sécurisation de documents pour le corridor Abidjan-Bamako.",
  keywords: ["Logistique", "Afrique", "Transitaire", "Importation", "Exportation", "Abidjan", "Bamako", "Suivi GPS", "Fret", "Escrow", "DoniCargo"],
  authors: [{ name: "Cabinet Diallo & Fils" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://donicargo.com",
    siteName: "DoniCargo",
    title: "DoniCargo - Révolutionnez vos imports de l'Océan à Bamako",
    description: "Trouvez un transitaire de confiance, sécurisez vos fonds et suivez vos conteneurs en temps réel.",
    images: [
      {
        url: "/og-image.jpg", // Make sure this exists later or use a generic one
        width: 1200,
        height: 630,
        alt: "DoniCargo Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DoniCargo - Logistique Sécurisée en Afrique",
    description: "La marketplace logistique avec suivi GPS en temps réel et paiement sécurisé.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DoniCargo",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${jbMono.variable} h-full antialiased text-[16px] md:text-[17px] scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-orange-500/30">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
